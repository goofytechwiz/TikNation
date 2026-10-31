import { createClient } from "npm:@supabase/supabase-js@2";
import { AccessToken, RoomServiceClient } from "npm:livekit-server-sdk@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://goofytechwiz.github.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

type BattleScore = {
  invite_id: string;
  host_score: number;
  opponent_score: number;
  winner_id: string | null;
  status: "live" | "finalized";
  ends_at?: string;
  scoring_method: string;
  result_status?: string;
  started_at?: string;
  ended_at?: string;
};

type BattleScoreCalculation =
  | { error: string; status?: number }
  | { score: BattleScore };

function record(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function liveKitFailure(error: unknown, operation: string): string {
  const message = error instanceof Error ? error.message : String(error ?? "");
  if (/unauthorized|invalid api key|401/i.test(message)) {
    return "LiveKit rejected the API credentials (401 Unauthorized).";
  }
  if (/forbidden|403/i.test(message)) {
    return "LiveKit denied this request (403 Forbidden).";
  }
  if (/enotfound|failed to fetch|network|connection refused|timed out/i.test(message)) {
    return "TikNation could not reach the LiveKit server. Check the server URL.";
  }
  return "LiveKit could not complete the " + operation + " request. The detailed error is saved in Supabase function logs.";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return json({ error: "Sign in to use TikNation Live." }, 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  // New Supabase projects expose key maps; retain support for legacy env vars.
  function keyFromMap(raw: string | undefined, keyName = "default"): string | undefined {
    if (!raw) return undefined;
    try {
      const parsed = JSON.parse(raw);
      const value = parsed && typeof parsed === "object" ? parsed[keyName] : undefined;
      return typeof value === "string" && value.trim() ? value.trim() : undefined;
    } catch {
      return undefined;
    }
  }
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ||
    keyFromMap(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS"));
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
    keyFromMap(Deno.env.get("SUPABASE_SECRET_KEYS"));
  const livekitUrl = Deno.env.get("LIVEKIT_URL");
  const livekitApiKey = Deno.env.get("LIVEKIT_API_KEY");
  const livekitApiSecret = Deno.env.get("LIVEKIT_API_SECRET");

  const missingConfig = [
    !supabaseUrl && "SUPABASE_URL",
    !anonKey && "SUPABASE_ANON_KEY or SUPABASE_PUBLISHABLE_KEYS[default]",
    !serviceKey && "SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEYS[default]",
    !livekitUrl && "LIVEKIT_URL",
    !livekitApiKey && "LIVEKIT_API_KEY",
    !livekitApiSecret && "LIVEKIT_API_SECRET",
  ].filter(Boolean);
  if (missingConfig.length) {
    console.error("TikNation Live missing configuration:", missingConfig);
    return json({
      error: "TikNation Live is not configured yet. Missing configuration: " + missingConfig.join(", "),
      missing: missingConfig,
    }, 503);
  }
  // Keep the environment values narrowed after the diagnostic missing-config array.
  if (!supabaseUrl || !anonKey || !serviceKey || !livekitUrl || !livekitApiKey || !livekitApiSecret) {
    return json({ error: "TikNation Live is not configured yet." }, 503);
  }

  const token = authHeader.slice("Bearer ".length).trim();
  const authClient = createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: authData, error: authError } = await authClient.auth.getUser(token);
  const user = authData?.user;
  if (authError || !user) return json({ error: "Your session is invalid or expired." }, 401);

  let body: Record<string, unknown>;
  try {
    const parsed = await req.json();
    if (!record(parsed)) return json({ error: "Invalid request." }, 400);
    body = parsed;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const authenticatedUser = user;
  const action = String(body.action ?? "");
  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: ageRecord, error: ageError } = await admin
    .from("tiknation_age_assurance")
    .select("date_of_birth")
    .eq("user_id", authenticatedUser.id)
    .maybeSingle();
  if (ageError) {
    console.error("TikNation Live age check failed:", ageError.code ?? "unknown");
    return json({ error: "We couldn't verify your age status. Please try again." }, 500);
  }
  if (!ageRecord?.date_of_birth) {
    return json({ error: "Complete the TikNation age check before using Live." }, 403);
  }
  const dob = new Date(String(ageRecord.date_of_birth) + "T00:00:00.000Z");
  const now = new Date();
  let accountAge = now.getUTCFullYear() - dob.getUTCFullYear();
  if (now.getUTCMonth() < dob.getUTCMonth() ||
      (now.getUTCMonth() === dob.getUTCMonth() && now.getUTCDate() < dob.getUTCDate())) accountAge--;
  if (!Number.isFinite(dob.getTime()) || accountAge < 13 || String(ageRecord.date_of_birth) > now.toISOString().slice(0, 10)) {
    return json({ error: "This account does not meet TikNation Live's age requirements." }, 403);
  }
  if (action === "start" && accountAge < 16) {
    return json({ error: "You must be at least 16 to start a TikNation Live broadcast. You can still watch eligible broadcasts." }, 403);
  }

  const livekitHttpUrl = livekitUrl.replace(/^wss:/i, "https:").replace(/^ws:/i, "http:");
  const rooms = new RoomServiceClient(livekitHttpUrl, livekitApiKey, livekitApiSecret);

  // The database function serializes checks per actor/action to prevent parallel requests bypassing limits.
  async function isRateLimited(actionName: "chat" | "report", limit: number, windowMs: number) {
    const { data, error } = await admin.rpc("tiknation_live_consume_rate_limit", {
      p_actor_id: authenticatedUser.id,
      p_action: actionName,
      p_limit: limit,
      p_window_seconds: Math.ceil(windowMs / 1000),
    });
    if (error || typeof data !== "boolean") {
      console.error("TikNation Live rate-limit check failed:", error);
      return true;
    }
    return data;
  }

  async function issueToken(roomName: string, canPublish: boolean, canSubscribe: boolean) {
    const { data: profile } = await admin.from("profiles").select("username,display_name").eq("id", authenticatedUser.id).maybeSingle();
    const identity = authenticatedUser.id;
    const participantName = String(profile?.display_name || profile?.username || "TikNation Creator").slice(0, 64);
    const access = new AccessToken(livekitApiKey, livekitApiSecret, {
      identity,
      name: participantName,
      ttl: "10m",
    });
    access.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish,
      canSubscribe,
      canPublishData: canPublish,
    });
    return { token: await access.toJwt(), serverUrl: livekitUrl };
  }

  if (action === "start") {
    const title = String(body.title ?? "").trim();
    const followerOnlyChat = body.follower_only_chat === true;
    if (title.length < 1 || title.length > 100) return json({ error: "Stream title must be 1–100 characters." }, 400);

    const { data: access, error: accessError } = await admin
      .from("live_creator_access").select("status").eq("creator_id", user.id).maybeSingle();
    if (accessError) return json({ error: "Could not verify creator access." }, 500);
    if (access?.status !== "approved") return json({ error: "TikNation Live is invite-only. Your creator account is not approved to broadcast." }, 403);

    const { data: existing } = await admin.from("live_sessions").select("id").eq("creator_id", user.id).eq("status", "live").maybeSingle();
    if (existing) return json({ error: "You already have a live broadcast. End it before starting another." }, 409);

    const sessionId = crypto.randomUUID();
    const roomName = "tiknation-live-" + sessionId;
    try {
      await rooms.createRoom({ name: roomName, emptyTimeout: 60, maxParticipants: 100 });
      const { data: session, error: insertError } = await admin.from("live_sessions")
        .insert({ id: sessionId, creator_id: user.id, room_name: roomName, title, status: "live", follower_only_chat: followerOnlyChat })
        .select("id,title,status,started_at,follower_only_chat").single();
      if (insertError || !session) {
        await rooms.deleteRoom(roomName).catch(() => {});
        if (insertError?.code === "23505") return json({ error: "A live broadcast is already active for this creator." }, 409);
        return json({ error: "Could not start the broadcast." }, 500);
      }
      const credentials = await issueToken(roomName, true, true);
      try {
        const { data: follows, error: followsError } = await admin.from("follows")
          .select("follower_id").eq("following_id", user.id);
        if (followsError) throw followsError;
        const followerIds = [...new Set((follows ?? []).map((row: { follower_id: string }) => row.follower_id)
          .filter((id: string) => id !== user.id))];
        if (followerIds.length) {
          const [preferencesResult, mutesResult, blocksResult] = await Promise.all([
            admin.from("creator_notification_preferences").select("user_id,live_alerts")
              .eq("creator_id", user.id).in("user_id", followerIds),
            admin.from("user_mutes").select("muter_id,mute_notifications")
              .eq("muted_id", user.id).in("muter_id", followerIds),
            admin.from("user_blocks").select("blocker_id,blocked_id")
              .or("blocker_id.eq." + user.id + ",blocked_id.eq." + user.id),
          ]);
          if (preferencesResult.error || mutesResult.error || blocksResult.error) {
            throw preferencesResult.error || mutesResult.error || blocksResult.error;
          }
          const optedIn = new Set((preferencesResult.data ?? [])
            .filter((row: { user_id: string; live_alerts: boolean }) => row.live_alerts)
            .map((row: { user_id: string }) => row.user_id));
          const muted = new Set((mutesResult.data ?? [])
            .filter((row: { muter_id: string; mute_notifications: boolean }) => row.mute_notifications)
            .map((row: { muter_id: string }) => row.muter_id));
          const blocked = new Set<string>();
          for (const row of blocksResult.data ?? []) {
            if (row.blocker_id === user.id) blocked.add(row.blocked_id);
            if (row.blocked_id === user.id) blocked.add(row.blocker_id);
          }
          const recipients = followerIds.filter((id) => optedIn.has(id) && !muted.has(id) && !blocked.has(id));
          if (recipients.length) {
            const { error: notifyError } = await admin.from("notifications").insert(recipients.map((recipient_id) => ({
              recipient_id, actor_id: user.id, type: "creator_live", message: "Started a Live broadcast: " + title,
            })));
            if (notifyError) throw notifyError;
          }
        }
      } catch (notificationError) {
        console.warn("Live started successfully, but follower alerts could not be delivered.", notificationError);
      }
      return json({ session, ...credentials });
    } catch (error) {
      console.error("TikNation Live start failed:", error);
      const failureMessage = liveKitFailure(error, "broadcast start");
      await admin.from("live_sessions").update({ status: "ended", ended_at: new Date().toISOString() }).eq("id", sessionId).eq("status", "live");
      try {
        await rooms.deleteRoom(roomName);
      } catch (cleanupError) {
        console.error("Live room cleanup after start failure failed:", cleanupError);
      }
      return json({ error: failureMessage }, 502);
    }
  }

  if (action === "guest_join") {
    const sessionId = String(body.session_id ?? "");
    if (!/^[0-9a-f-]{36}$/i.test(sessionId)) return json({ error: "Invalid live session." }, 400);
    if (accountAge < 16) return json({ error: "You must be at least 16 to join a creator's live stage." }, 403);
    const { data: session, error: sessionError } = await admin.from("live_sessions")
      .select("id,room_name,creator_id,status").eq("id", sessionId).eq("status", "live").maybeSingle();
    if (sessionError) return json({ error: "Could not verify this live broadcast." }, 500);
    if (!session) return json({ error: "This broadcast has ended." }, 404);
    if (session.creator_id === user.id) return json({ error: "The host cannot join their own guest stage." }, 400);
    const { data: request, error: requestError } = await admin.from("live_guest_requests")
      .select("id,session_id,requester_id,status,inviter_id")
      .eq("session_id", sessionId).eq("requester_id", user.id).eq("status", "approved")
      .maybeSingle();
    if (requestError) return json({ error: "Could not verify your approved guest request." }, 500);
    if (!request || (request.inviter_id && request.inviter_id !== session.creator_id)) {
      return json({ error: "The host must approve your guest request or invitation before you can join the stage." }, 403);
    }
    const { data: blocks, error: blockError } = await admin.from("user_blocks")
      .select("blocker_id")
      .or("and(blocker_id.eq." + user.id + ",blocked_id.eq." + session.creator_id + "),and(blocker_id.eq." + session.creator_id + ",blocked_id.eq." + user.id + ")")
      .limit(1);
    if (blockError) return json({ error: "Could not verify guest-stage access." }, 500);
    if (blocks?.length) return json({ error: "Guest-stage access is unavailable because of a block between these accounts." }, 403);
    const { data: restrictions, error: restrictionError } = await admin.from("live_moderation_actions")
      .select("id").eq("session_id", sessionId).eq("target_user_id", user.id)
      .is("revoked_at", null).in("action_type", ["remove", "creator_live_block"])
      .or("expires_at.is.null,expires_at.gt." + new Date().toISOString()).limit(1);
    if (restrictionError) return json({ error: "Could not verify guest-stage safety restrictions." }, 500);
    if (restrictions?.length) return json({ error: "The host has restricted your access to this Live." }, 403);
    const credentials = await issueToken(session.room_name, true, true);
    return json({ session_id: session.id, role: "guest", ...credentials });
  }

  async function calculateBattleScore(inviteId: string, finalize = false, voluntaryFinish = false): Promise<BattleScoreCalculation> {
    const { data: invite, error: inviteError } = await admin.from("live_battle_invites")
      .select("id,session_id,host_id,opponent_id,status,round_seconds,decided_at")
      .eq("id", inviteId).maybeSingle();
    if (inviteError || !invite || !invite.decided_at) {
      return { error: "Could not load the accepted Live Battle.", status: 404 };
    }
    const startedAt = new Date(invite.decided_at);
    const duration = Math.max(30, Math.min(600, Number(invite.round_seconds) || 180));
    const deadline = new Date(startedAt.getTime() + duration * 1000);
    const now = new Date();
    const roundEnded = now.getTime() >= deadline.getTime();
    const endAt = roundEnded ? deadline : now;
    let hostScore = 0;
    let opponentScore = 0;
    let offset = 0;
    while (true) {
      const { data: events, error: eventsError } = await admin.from("live_gift_events")
        .select("recipient_id,coin_cost")
        .eq("session_id", invite.session_id)
        .in("recipient_id", [invite.host_id, invite.opponent_id])
        .gte("created_at", startedAt.toISOString())
        .lte("created_at", endAt.toISOString())
        .order("created_at", { ascending: true })
        .order("id", { ascending: true })
        .range(offset, offset + 999);
      if (eventsError) return { error: "Could not calculate the verified battle score.", status: 500 };
      for (const event of events ?? []) {
        const points = Math.max(0, Number(event.coin_cost) || 0);
        if (event.recipient_id === invite.host_id) hostScore += points;
        if (event.recipient_id === invite.opponent_id) opponentScore += points;
      }
      if (!events || events.length < 1000) break;
      offset += 1000;
    }
    const shouldFinalize = finalize || roundEnded || invite.status === "completed";
    if (!shouldFinalize) {
      return { score: { invite_id: invite.id, host_score: hostScore, opponent_score: opponentScore, winner_id: null, status: "live", ends_at: deadline.toISOString(), scoring_method: "test_coin_gifts_v1" } };
    }
    const isVoid = voluntaryFinish && !roundEnded;
    const winnerId = isVoid || hostScore === opponentScore ? null : hostScore > opponentScore ? invite.host_id : invite.opponent_id;
    const resultStatus = isVoid ? "void" : hostScore === opponentScore ? "tie" : "finalized";
    if (invite.status === "accepted") {
      const { error: closeError } = await admin.from("live_battle_invites")
        .update({ status: "completed" }).eq("id", invite.id).eq("status", "accepted");
      if (closeError) return { error: "Could not close the Live Battle round.", status: 500 };
    }
    const resultRow = {
      invite_id: invite.id, session_id: invite.session_id, host_id: invite.host_id,
      opponent_id: invite.opponent_id, host_score: hostScore, opponent_score: opponentScore,
      winner_id: winnerId, result_status: resultStatus, scoring_method: "test_coin_gifts_v1",
      started_at: startedAt.toISOString(), ended_at: (isVoid ? now : deadline).toISOString(),
    };
    const { error: saveError } = await admin.from("live_battle_results")
      .upsert(resultRow, { onConflict: "invite_id", ignoreDuplicates: true });
    if (saveError) return { error: "Could not save the verified battle result.", status: 500 };
    const { data: saved, error: readError } = await admin.from("live_battle_results")
      .select("invite_id,host_score,opponent_score,winner_id,result_status,scoring_method,started_at,ended_at")
      .eq("invite_id", invite.id).single();
    if (readError || !saved) return { error: "Could not confirm the saved battle result.", status: 500 };
    return { score: { ...saved, status: "finalized" } };
  }

  if (action === "battle_history") {
    const { data: results, error: historyError } = await admin.from("live_battle_results")
      .select("invite_id,session_id,host_id,opponent_id,host_score,opponent_score,winner_id,result_status,scoring_method,started_at,ended_at")
      .or("host_id.eq." + user.id + ",opponent_id.eq." + user.id)
      .order("ended_at", { ascending: false }).limit(20);
    if (historyError) return json({ error: "Could not load your Live Battle history." }, 500);
    const ids = [...new Set((results ?? []).flatMap((row) => [row.host_id, row.opponent_id]))];
    const { data: profiles, error: profilesError } = ids.length
      ? await admin.from("profiles").select("id,username,display_name").in("id", ids)
      : { data: [], error: null };
    if (profilesError) return json({ error: "Could not load battle player names." }, 500);
    const names = new Map((profiles ?? []).map((p) => [p.id, p.display_name || p.username || "TikNation member"]));
    return json({ history: (results ?? []).map((row) => ({
      ...row, host_name: names.get(row.host_id) || "Host",
      opponent_name: names.get(row.opponent_id) || "Opponent",
      your_result: row.result_status === "void" ? "void" : row.result_status === "tie" ? "tie" : row.winner_id === user.id ? "win" : "loss"
    })) });
  }
  if (action === "battle_score") {
    const inviteId = String(body.invite_id ?? "");
    if (!/^[0-9a-f-]{36}$/i.test(inviteId)) return json({ error: "Invalid battle invitation." }, 400);
    const { data: invite, error: inviteError } = await admin.from("live_battle_invites")
      .select("id,host_id,opponent_id").eq("id", inviteId).maybeSingle();
    if (inviteError) return json({ error: "Could not load the battle invitation." }, 500);
    if (!invite || ![invite.host_id, invite.opponent_id].includes(user.id)) return json({ error: "You cannot view this battle score." }, 403);
    const result = await calculateBattleScore(inviteId);
    if ("error" in result) return json({ error: result.error }, result.status || 500);
    const { data: profiles } = await admin.from("profiles").select("id,username,display_name").in("id", [invite.host_id, invite.opponent_id]);
    const names = new Map((profiles ?? []).map((p) => [p.id, p.display_name || p.username || "TikNation member"]));
    return json({ score: { ...result.score, host_name: names.get(invite.host_id) || "Host", opponent_name: names.get(invite.opponent_id) || "Opponent", winner_name: names.get(result.score.winner_id) || null } });
  }

  if (action === "battle_decide") {
    const inviteId = String(body.invite_id ?? "");
    const status = String(body.status ?? "");
    if (!/^[0-9a-f-]{36}$/i.test(inviteId)) return json({ error: "Invalid battle invitation." }, 400);
    if (!["accepted", "declined"].includes(status)) return json({ error: "Invalid battle response." }, 400);
    const { data: invite, error: inviteError } = await admin.from("live_battle_invites")
      .select("id,session_id,host_id,opponent_id,status")
      .eq("id", inviteId).maybeSingle();
    if (inviteError) return json({ error: "Could not load the battle invitation." }, 500);
    if (!invite || ![invite.host_id, invite.opponent_id].includes(user.id)) return json({ error: "You cannot respond to this battle invitation." }, 403);
    if (invite.status !== "pending") return json({ error: "This battle invitation is no longer pending." }, 409);
    const { data: session, error: sessionError } = await admin.from("live_sessions")
      .select("id,status,creator_id").eq("id", invite.session_id).maybeSingle();
    if (sessionError) return json({ error: "Could not verify the live broadcast." }, 500);
    if (!session || session.status !== "live" || session.creator_id !== invite.host_id) return json({ error: "The live broadcast has ended." }, 409);
    const { data: updated, error: updateError } = await admin.from("live_battle_invites")
      .update({ status, decided_at: new Date().toISOString() }).eq("id", inviteId).eq("status", "pending")
      .select("id,session_id,host_id,opponent_id,status,round_seconds,decided_at").maybeSingle();
    if (updateError) return json({ error: "Could not save your battle response." }, 500);
    if (!updated) return json({ error: "This battle invitation was already answered." }, 409);
    return json({ invite: updated });
  }

  if (action === "battle_finish") {
    const inviteId = String(body.invite_id ?? "");
    if (!/^[0-9a-f-]{36}$/i.test(inviteId)) return json({ error: "Invalid battle invitation." }, 400);
    const { data: invite, error: inviteError } = await admin.from("live_battle_invites")
      .select("id,host_id,opponent_id,status,round_seconds,decided_at").eq("id", inviteId).maybeSingle();
    if (inviteError) return json({ error: "Could not load the battle invitation." }, 500);
    if (!invite || ![invite.host_id, invite.opponent_id].includes(user.id)) return json({ error: "You cannot end this battle." }, 403);
    if (invite.status !== "accepted" && invite.status !== "completed") return json({ status: invite.status });
    const duration = Math.max(30, Math.min(600, Number(invite.round_seconds) || 180));
    const roundEnded = !!invite.decided_at && Date.now() >= new Date(invite.decided_at).getTime() + duration * 1000;
    const result = await calculateBattleScore(inviteId, true, !roundEnded);
    if (result.error) return json({ error: result.error }, result.status || 500);
    return json({ status: "completed", score: result.score });
  }

  if (action === "battle_join") {
    const inviteId = String(body.invite_id ?? "");
    if (!/^[0-9a-f-]{36}$/i.test(inviteId)) return json({ error: "Invalid battle invitation." }, 400);
    if (accountAge < 16) return json({ error: "You must be at least 16 to join a Live Battle." }, 403);
    const { data: invite, error: inviteError } = await admin.from("live_battle_invites")
      .select("id,session_id,host_id,opponent_id,status,round_seconds,decided_at")
      .eq("id", inviteId).eq("opponent_id", user.id).eq("status", "accepted").maybeSingle();
    if (inviteError) return json({ error: "Could not verify your accepted battle invitation." }, 500);
    if (!invite) return json({ error: "The host must accept your battle challenge before you can join." }, 403);
    const { data: session, error: sessionError } = await admin.from("live_sessions")
      .select("id,title,room_name,status,started_at,creator_id,follower_only_chat")
      .eq("id", invite.session_id).eq("status", "live").maybeSingle();
    if (sessionError) return json({ error: "Could not verify the live broadcast." }, 500);
    if (!session || session.creator_id !== invite.host_id) return json({ error: "This Live Battle broadcast has ended." }, 404);
    const endsAt = new Date(new Date(invite.decided_at).getTime() + Math.max(30, Math.min(600, Number(invite.round_seconds) || 180)) * 1000);
    if (endsAt.getTime() <= Date.now()) {
      await admin.from("live_battle_invites").update({ status: "completed" }).eq("id", invite.id).eq("status", "accepted");
      return json({ error: "This Live Battle round has already ended." }, 409);
    }
    const { data: blocks, error: blockError } = await admin.from("user_blocks")
      .select("blocker_id")
      .or("and(blocker_id.eq." + user.id + ",blocked_id.eq." + invite.host_id + "),and(blocker_id.eq." + invite.host_id + ",blocked_id.eq." + user.id + ")")
      .limit(1);
    if (blockError) return json({ error: "Could not verify battle access." }, 500);
    if (blocks?.length) return json({ error: "Battle access is unavailable because of a block between these accounts." }, 403);
    const { data: restrictions, error: restrictionError } = await admin.from("live_moderation_actions")
      .select("id").eq("session_id", invite.session_id).eq("target_user_id", user.id)
      .is("revoked_at", null).in("action_type", ["remove", "creator_live_block"])
      .or("expires_at.is.null,expires_at.gt." + new Date().toISOString()).limit(1);
    if (restrictionError) return json({ error: "Could not verify battle safety restrictions." }, 500);
    if (restrictions?.length) return json({ error: "The host has restricted your access to this Live." }, 403);
    const credentials = await issueToken(session.room_name, true, true);
    return json({ session: { id: session.id, title: session.title, status: session.status, started_at: session.started_at, creator_id: session.creator_id, follower_only_chat: !!session.follower_only_chat, can_chat: true }, invite, role: "battle_opponent", ...credentials });
  }

  if (action === "refresh") {
    const sessionId = String(body.session_id ?? "");
    if (!/^[0-9a-f-]{36}$/i.test(sessionId)) return json({ error: "Invalid live session." }, 400);
    const { data: session, error } = await admin.from("live_sessions")
      .select("id,room_name,status,creator_id").eq("id", sessionId).eq("status", "live").maybeSingle();
    if (error) return json({ error: "Could not refresh the broadcast connection." }, 500);
    if (!session) return json({ error: "This broadcast has ended or is unavailable." }, 404);
    const isCreator = session.creator_id === user.id;
    let isApprovedGuest = false;
    if (!isCreator) {
      const { data: guestRequest, error: guestRequestError } = await admin.from("live_guest_requests")
        .select("id,inviter_id").eq("session_id", sessionId).eq("requester_id", user.id)
        .eq("status", "approved").maybeSingle();
      if (guestRequestError) return json({ error: "Could not verify guest-stage access. Please reconnect." }, 500);
      if (guestRequest && (!guestRequest.inviter_id || guestRequest.inviter_id === session.creator_id)) isApprovedGuest = true;
      const { data: battleInvite, error: battleInviteError } = await admin.from("live_battle_invites")
        .select("id,round_seconds,decided_at").eq("session_id", sessionId).eq("opponent_id", user.id)
        .eq("status", "accepted").maybeSingle();
      if (battleInviteError) return json({ error: "Could not verify Live Battle access. Please reconnect." }, 500);
      let isApprovedBattle = false;
      if (battleInvite?.decided_at) {
        const battleEnd = new Date(new Date(battleInvite.decided_at).getTime() + Math.max(30, Math.min(600, Number(battleInvite.round_seconds) || 180)) * 1000);
        isApprovedBattle = battleEnd.getTime() > Date.now();
      }
      const { data: blockRows, error: blockError } = await admin.from("user_blocks")
        .select("blocker_id")
        .or("and(blocker_id.eq." + user.id + ",blocked_id.eq." + session.creator_id + "),and(blocker_id.eq." + session.creator_id + ",blocked_id.eq." + user.id + ")")
        .limit(1);
      if (blockError) return json({ error: "Could not verify access to this broadcast. Please try again." }, 500);
      if (blockRows?.length) return json({ error: "This broadcast is unavailable because of a block between these accounts." }, 403);
      const { data: restrictions, error: restrictionError } = await admin.from("live_moderation_actions")
        .select("id,action_type").eq("session_id", sessionId).eq("target_user_id", user.id)
        .is("revoked_at", null).in("action_type", ["remove", "creator_live_block"])
        .or("expires_at.is.null,expires_at.gt." + new Date().toISOString()).limit(1);
      if (restrictionError) return json({ error: "Could not verify Live access. Please try again." }, 500);
      if (restrictions?.length) return json({ error: "The creator has restricted your access to this Live." }, 403);
    }
    const credentials = await issueToken(session.room_name, isCreator || isApprovedGuest || isApprovedBattle, true);
    return json(credentials);
  }

  if (action === "join") {
    const sessionId = String(body.session_id ?? "");
    if (!/^[0-9a-f-]{36}$/i.test(sessionId)) return json({ error: "Invalid live session." }, 400);
    const { data: session, error } = await admin.from("live_sessions")
      .select("id,title,room_name,status,started_at,creator_id,follower_only_chat").eq("id", sessionId).eq("status", "live").maybeSingle();
    if (error) return json({ error: "Could not load the live broadcast." }, 500);
    if (!session) return json({ error: "This broadcast has ended or is unavailable." }, 404);
    if (session.creator_id !== user.id) {
      const { data: blockRows, error: blockError } = await admin.from("user_blocks")
        .select("blocker_id")
        .or("and(blocker_id.eq." + user.id + ",blocked_id.eq." + session.creator_id + "),and(blocker_id.eq." + session.creator_id + ",blocked_id.eq." + user.id + ")")
        .limit(1);
      if (blockError) return json({ error: "Could not verify access to this broadcast. Please try again." }, 500);
      if (blockRows?.length) return json({ error: "This broadcast is unavailable because of a block between these accounts." }, 403);
      const { data: restrictions, error: restrictionError } = await admin.from("live_moderation_actions")
        .select("id,action_type").eq("session_id", sessionId).eq("target_user_id", user.id)
        .is("revoked_at", null).in("action_type", ["remove", "creator_live_block"])
        .or("expires_at.is.null,expires_at.gt." + new Date().toISOString()).limit(1);
      if (restrictionError) return json({ error: "Could not verify Live access. Please try again." }, 500);
      if (restrictions?.length) return json({ error: "The creator has restricted your access to this Live." }, 403);
    }
    let canChat = true;
    if (session.creator_id !== user.id && session.follower_only_chat) {
      const { data: follow, error: followError } = await admin.from("follows").select("follower_id")
        .eq("follower_id", user.id).eq("following_id", session.creator_id).maybeSingle();
      if (followError) return json({ error: "Could not verify whether you follow this creator." }, 500);
      canChat = !!follow;
    }
    const credentials = await issueToken(session.room_name, session.creator_id === user.id, true);
    return json({ session: { id: session.id, title: session.title, status: session.status, started_at: session.started_at, creator_id: session.creator_id, follower_only_chat: !!session.follower_only_chat, can_chat: canChat }, ...credentials });
  }

  if (action === "end") {
    const sessionId = String(body.session_id ?? "");
    if (!/^[0-9a-f-]{36}$/i.test(sessionId)) return json({ error: "Invalid live session." }, 400);
    const { data: session, error } = await admin.from("live_sessions")
      .select("id,room_name,status").eq("id", sessionId).eq("creator_id", user.id).maybeSingle();
    if (error) return json({ error: "Could not load the broadcast." }, 500);
    if (!session) return json({ error: "You cannot end this broadcast." }, 404);

    // Remove the media room before finalizing the database status. If LiveKit
    // is unavailable, keep a live session visible so the creator can retry.
    try {
      const existingRooms = await rooms.listRooms([session.room_name]);
      if (existingRooms.some((r) => r.name === session.room_name)) {
        await rooms.deleteRoom(session.room_name);
      }
    } catch (cleanupError) {
      console.error("Live room cleanup failed:", cleanupError);
      return json({ error: "LiveKit could not end the media room. Please retry in a moment." }, 502);
    }

    if (session.status === "ended") return json({ ok: true, already_ended: true });
    const { error: updateError } = await admin.from("live_sessions")
      .update({ status: "ended", ended_at: new Date().toISOString() }).eq("id", session.id).eq("creator_id", user.id).eq("status", "live");
    if (updateError) return json({ error: "The media room has ended, but the session record needs recovery. Refresh the Live list in a moment." }, 500);
    return json({ ok: true });
  }

  if (action === "chat") {
    const sessionId = String(body.session_id ?? "");
    const message = String(body.message ?? "").trim();
    if (!/^[0-9a-f-]{36}$/i.test(sessionId)) return json({ error: "Invalid live session." }, 400);
    if (message.length < 1 || message.length > 500) return json({ error: "Chat messages must be 1–500 characters." }, 400);
    const { data: session, error: sessionError } = await admin.from("live_sessions")
      .select("id,creator_id,follower_only_chat").eq("id", sessionId).eq("status", "live").maybeSingle();
    if (sessionError) return json({ error: "Could not verify this broadcast. Please try again." }, 500);
    if (!session) return json({ error: "This broadcast has ended." }, 404);
    if (session.creator_id !== user.id) {
      const { data: creatorAgeRecord, error: creatorAgeError } = await admin
        .from("tiknation_age_assurance").select("date_of_birth").eq("user_id", session.creator_id).maybeSingle();
      if (creatorAgeError) return json({ error: "Could not verify chat safety settings." }, 500);
      if (!creatorAgeRecord?.date_of_birth) {
        return json({ error: "Chat is temporarily unavailable while the creator's age status is confirmed." }, 403);
      }
      const creatorDob = new Date(String(creatorAgeRecord.date_of_birth) + "T00:00:00.000Z");
      const creatorNow = new Date();
      let creatorAge = creatorNow.getUTCFullYear() - creatorDob.getUTCFullYear();
      if (creatorNow.getUTCMonth() < creatorDob.getUTCMonth() ||
          (creatorNow.getUTCMonth() === creatorDob.getUTCMonth() && creatorNow.getUTCDate() < creatorDob.getUTCDate())) creatorAge--;
      if (!Number.isFinite(creatorDob.getTime())) return json({ error: "Could not verify chat safety settings." }, 500);
      if (creatorAge < 18 && accountAge >= 18) {
        return json({ error: "Adult accounts cannot chat in a teen creator's Live. You can continue watching." }, 403);
      }
    }
    if (session.creator_id !== user.id && session.follower_only_chat) {
      const { data: follow, error: followError } = await admin.from("follows").select("follower_id")
        .eq("follower_id", user.id).eq("following_id", session.creator_id).maybeSingle();
      if (followError) return json({ error: "Could not verify whether you follow this creator." }, 500);
      if (!follow) return json({ error: "This creator has follower-only chat enabled. You can keep watching, but you must follow the creator before chatting." }, 403);
    }
    if (session.creator_id !== user.id) {
      const { data: blockRows, error: blockError } = await admin.from("user_blocks")
        .select("blocker_id")
        .or("and(blocker_id.eq." + user.id + ",blocked_id.eq." + session.creator_id + "),and(blocker_id.eq." + session.creator_id + ",blocked_id.eq." + user.id + ")")
        .limit(1);
      if (blockError) return json({ error: "Could not verify chat access. Please try again." }, 500);
      if (blockRows?.length) return json({ error: "Chat is unavailable because of a block between these accounts." }, 403);
    }
    if (session.creator_id !== user.id) {
      const { data: restrictions, error: restrictionError } = await admin.from("live_moderation_actions")
        .select("id,action_type").eq("session_id", sessionId).eq("target_user_id", user.id)
        .is("revoked_at", null).in("action_type", ["chat_mute", "timeout", "remove", "creator_live_block"])
        .or("expires_at.is.null,expires_at.gt." + new Date().toISOString()).limit(1);
      if (restrictionError) return json({ error: "Could not verify chat permissions. Please try again." }, 500);
      if (restrictions?.length) return json({ error: "You cannot chat in this Live right now." }, 403);
    }
    if (await isRateLimited("chat", 8, 60_000)) {
      return json({ error: "You're sending messages too quickly. Please wait a minute and try again." }, 429);
    }
    const { data: saved, error } = await admin.from("live_chat_messages")
      .insert({ session_id: sessionId, user_id: user.id, message })
      .select("id,session_id,user_id,message,created_at").single();
    if (error || !saved) return json({ error: "Could not send the chat message." }, 500);
    return json({ message: saved });
  }

  if (action === "moderate") {
    const sessionId = String(body.session_id ?? "");
    const targetUserId = String(body.target_user_id ?? "");
    const actionType = String(body.action_type ?? "");
    const reason = String(body.reason ?? "").trim().slice(0, 300) || null;
    const durationMinutes = Number(body.duration_minutes ?? 5);
    const allowedTypes = ["chat_mute", "timeout", "remove", "creator_live_block"];
    if (!/^[0-9a-f-]{36}$/i.test(sessionId) || !/^[0-9a-f-]{36}$/i.test(targetUserId) ||
        !allowedTypes.includes(actionType) || targetUserId === user.id) {
      return json({ error: "Choose a valid viewer and moderation action." }, 400);
    }
    if (actionType === "timeout" && ![1, 5, 11, 30, 60, 1440].includes(durationMinutes)) {
      return json({ error: "Choose one of the available timeout durations." }, 400);
    }
    const { data: session, error: sessionError } = await admin.from("live_sessions")
      .select("id,room_name,creator_id,status").eq("id", sessionId).eq("creator_id", user.id).maybeSingle();
    if (sessionError) return json({ error: "Could not verify stream ownership." }, 500);
    if (!session || session.status !== "live") return json({ error: "Only the creator of an active Live can moderate it." }, 403);
    const expiresAt = actionType === "timeout"
      ? new Date(Date.now() + durationMinutes * 60_000).toISOString()
      : null;
    const { data: saved, error: saveError } = await admin.from("live_moderation_actions").insert({
      session_id: sessionId, creator_id: user.id, target_user_id: targetUserId,
      action_type: actionType, reason, starts_at: new Date().toISOString(), expires_at: expiresAt,
    }).select("id,action_type,target_user_id,expires_at,created_at").single();
    if (saveError || !saved) return json({ error: "Could not save the moderation action. Confirm the community-controls migration is installed." }, 500);
    if (actionType === "remove" || actionType === "creator_live_block") {
      try { await rooms.removeParticipant(session.room_name, targetUserId); }
      catch (removeError) { console.warn("Live participant removal did not complete; join/chat restrictions remain active.", removeError); }
    }
    return json({ moderation: saved });
  }

  if (action === "report") {
    const sessionId = String(body.session_id ?? "");
    const reason = String(body.reason ?? "").trim();
    const details = String(body.details ?? "").trim();
    if (!/^[0-9a-f-]{36}$/i.test(sessionId)) return json({ error: "Invalid live session." }, 400);
    if (reason.length < 2 || reason.length > 80 || details.length > 1000) return json({ error: "Please choose a valid report reason and keep details under 1,000 characters." }, 400);
    const { data: session } = await admin.from("live_sessions").select("id").eq("id", sessionId).maybeSingle();
    if (!session) return json({ error: "This broadcast could not be found." }, 404);
    if (await isRateLimited("report", 3, 60 * 60_000)) {
      return json({ error: "You've submitted several reports recently. Please try again later." }, 429);
    }
    const { data: report, error } = await admin.from("live_stream_reports").insert({
      session_id: sessionId, reporter_id: user.id, reason, details: details || null,
    }).select("id,status,created_at").single();
    if (error?.code === "23505") return json({ error: "You have already reported this broadcast." }, 409);
    if (error || !report) return json({ error: "Could not submit the report." }, 500);
    return json({ report });
  }


  if (action === "live_access_list" || action === "live_access_grant" || action === "live_access_revoke") {
    const appMeta = user.app_metadata ?? {};
    const roles = Array.isArray(appMeta.roles) ? appMeta.roles : [];
    const isAdmin = roles.includes("admin") || appMeta.role === "admin";
    if (!isAdmin) return json({ error: "TikNation founder/admin access is required to manage Live creator access." }, 403);

    if (action === "live_access_list") {
      const { data, error } = await admin.from("live_creator_access")
        .select("creator_id,status,invited_by,invited_at,approved_at,updated_at")
        .order("updated_at", { ascending: false }).limit(200);
      if (error) return json({ error: "Could not load Live creator access." }, 500);
      const rows = data ?? [];
      const ids = rows.map((r) => r.creator_id);
      let profiles: Array<{ id: string; username: string | null; display_name: string | null }> = [];
      if (ids.length) {
        const { data: found } = await admin.from("profiles")
          .select("id,username,display_name").in("id", ids);
        profiles = found ?? [];
      }
      const byId = new Map(profiles.map((p) => [p.id, p]));
      return json({ creators: rows.map((r) => ({ ...r, username: byId.get(r.creator_id)?.username ?? null, display_name: byId.get(r.creator_id)?.display_name ?? null })) });
    }

    const identifier = String(body.account ?? "").trim();
    if (identifier.length < 3 || identifier.length > 254) return json({ error: "Enter the existing creator's username or account email." }, 400);
    let target: { id: string; email?: string } | null = null;
    // Resolve existing accounts server-side; no client can submit a creator UUID to grant access.
    const normalized = identifier.replace(/^@/, "").toLowerCase();
    const { data: matchingProfiles, error: profileError } = await admin.from("profiles")
      .select("id,username,display_name").ilike("username", normalized).limit(2);
    if (profileError) return json({ error: "Could not look up that TikNation account." }, 500);
    if ((matchingProfiles ?? []).length > 1) return json({ error: "That username is not unique. Use the account email instead." }, 409);
    if ((matchingProfiles ?? []).length === 1) {
      target = { id: matchingProfiles![0].id };
    } else if (identifier.includes("@")) {
      const { data: users, error: usersError } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (usersError) return json({ error: "Could not look up that account email." }, 500);
      const match = (users.users ?? []).find((u) => String(u.email ?? "").toLowerCase() === normalized);
      if (match) target = { id: match.id, email: match.email ?? undefined };
    }
    if (!target) return json({ error: "No existing TikNation account matched. Check the username/email and try again." }, 404);

    if (action === "live_access_grant") {
      const now = new Date().toISOString();
      const { data: saved, error } = await admin.from("live_creator_access").upsert({
        creator_id: target.id, status: "approved", invited_by: user.id,
        invited_at: now, approved_at: now, updated_at: now,
      }, { onConflict: "creator_id" }).select("creator_id,status,invited_by,invited_at,approved_at,updated_at").single();
      if (error || !saved) {
        console.error("Live creator access grant failed:", error);
        return json({ error: "Could not grant Live access. No account was changed." }, 500);
      }
      return json({ success: true, access: saved });
    }

    const { data: saved, error } = await admin.from("live_creator_access").upsert({
      creator_id: target.id, status: "revoked", invited_by: user.id, updated_at: new Date().toISOString(),
    }, { onConflict: "creator_id" }).select("creator_id,status,invited_by,invited_at,approved_at,updated_at").single();
    if (error || !saved) {
      console.error("Live creator access revoke failed:", error);
      return json({ error: "Could not revoke Live access. No account was changed." }, 500);
    }
    // End any active session and remove the associated LiveKit room as a safety measure.
    const { data: sessions } = await admin.from("live_sessions").select("id,room_name").eq("creator_id", target.id).eq("status", "live");
    for (const session of sessions ?? []) {
      try { await rooms.deleteRoom(session.room_name); } catch (e) { console.error("Could not close revoked creator room:", e); }
    }
    if ((sessions ?? []).length) {
      const { error: endError } = await admin.from("live_sessions").update({ status: "ended", ended_at: new Date().toISOString() })
        .eq("creator_id", target.id).eq("status", "live");
      if (endError) console.error("Could not mark revoked creator sessions ended:", endError);
    }
    return json({ success: true, access: saved });
  }

  if (action === "moderation_list" || action === "review_report") {
    // Authorization uses server-managed Supabase app_metadata, never user-editable
    // user_metadata or a client-supplied role.
    const appMeta = user.app_metadata ?? {};
    const roles = Array.isArray(appMeta.roles) ? appMeta.roles : [];
    const isModerator = roles.includes("moderator") || roles.includes("admin") ||
      appMeta.role === "moderator" || appMeta.role === "admin";
    if (!isModerator) return json({ error: "Moderator access is required." }, 403);

    if (action === "moderation_list") {
      const { data, error } = await admin.from("live_stream_reports")
        .select("id,session_id,reporter_id,reason,details,status,created_at,reviewed_by,reviewed_at")
        .eq("status", "pending").order("created_at", { ascending: true }).limit(100);
      if (error) return json({ error: "Could not load pending reports." }, 500);
      return json({ reports: data ?? [] });
    }

    const reportId = String(body.report_id ?? "");
    const status = String(body.status ?? "");
    if (!/^[0-9a-f-]{36}$/i.test(reportId)) return json({ error: "Invalid report ID." }, 400);
    if (!["reviewed", "dismissed", "action_taken"].includes(status)) {
      return json({ error: "Choose a valid review outcome." }, 400);
    }
    const { data: updated, error } = await admin.from("live_stream_reports")
      .update({ status, reviewed_by: user.id, reviewed_at: new Date().toISOString() })
      .eq("id", reportId).eq("status", "pending")
      .select("id,status,reviewed_by,reviewed_at").maybeSingle();
    if (error) return json({ error: "Could not update the report." }, 500);
    if (!updated) return json({ error: "This report was already reviewed or no longer exists." }, 409);
    return json({ report: updated });
  }

  if (action === "list") {
    const { data, error } = await admin.from("live_sessions")
      .select("id,creator_id,title,status,started_at,room_name,follower_only_chat")
      .eq("status", "live").order("started_at", { ascending: false }).limit(50);
    if (error) return json({ error: "Could not load live broadcasts." }, 500);

    // Opportunistic stale-session recovery: only mark rooms missing from a
    // successful LiveKit room listing as ended. Allow a short startup grace
    // period so a newly-created room is not killed by an immediate list refresh.
    let liveRooms;
    try {
      liveRooms = await rooms.listRooms();
    } catch (recoveryError) {
      console.error("Live stale-session check failed:", recoveryError);
      return json({ error: liveKitFailure(recoveryError, "live list") }, 503);
    }
    const roomNames = new Set(liveRooms.map((r) => r.name));
    const now = Date.now();
    const startupGraceMs = 30_000;
    const isInStartupGrace = (s: { started_at: string; room_name: string }) =>
      now - Date.parse(s.started_at) < startupGraceMs;
    const stale = (data ?? []).filter((s) =>
      !roomNames.has(s.room_name) && !isInStartupGrace(s)
    );
    if (stale.length) {
      const staleIds = stale.map((s) => s.id);
      const { error: cleanupError } = await admin.from("live_sessions")
        .update({ status: "ended", ended_at: new Date().toISOString() })
        .in("id", staleIds).eq("status", "live");
      if (cleanupError) console.error("Stale Live session database cleanup failed:", cleanupError);
    }
    // A fresh session remains discoverable during startup, but missing rooms
    // are still cleaned up after the grace period if LiveKit never exposes them.
    return json({
      sessions: (data ?? [])
        .filter((s) => roomNames.has(s.room_name) || isInStartupGrace(s))
        .map(({ room_name, ...s }) => s),
    });
  }

  return json({ error: "Unknown action." }, 400);
});
