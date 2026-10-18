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

  if (action === "refresh") {
    const sessionId = String(body.session_id ?? "");
    if (!/^[0-9a-f-]{36}$/i.test(sessionId)) return json({ error: "Invalid live session." }, 400);
    const { data: session, error } = await admin.from("live_sessions")
      .select("id,room_name,status,creator_id").eq("id", sessionId).eq("status", "live").maybeSingle();
    if (error) return json({ error: "Could not refresh the broadcast connection." }, 500);
    if (!session) return json({ error: "This broadcast has ended or is unavailable." }, 404);
    const isCreator = session.creator_id === user.id;
    if (!isCreator) {
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
    const credentials = await issueToken(session.room_name, isCreator, true);
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
