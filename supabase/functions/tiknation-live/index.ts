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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return json({ error: "Sign in to use TikNation Live." }, 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const livekitUrl = Deno.env.get("LIVEKIT_URL");
  const livekitApiKey = Deno.env.get("LIVEKIT_API_KEY");
  const livekitApiSecret = Deno.env.get("LIVEKIT_API_SECRET");

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

  const action = String(body.action ?? "");
  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const livekitHttpUrl = livekitUrl.replace(/^wss:/i, "https:").replace(/^ws:/i, "http:");
  const rooms = new RoomServiceClient(livekitHttpUrl, livekitApiKey, livekitApiSecret);

  // The database function serializes checks per actor/action to prevent parallel requests bypassing limits.
  async function isRateLimited(actionName: "chat" | "report", limit: number, windowMs: number) {
    const { data, error } = await admin.rpc("tiknation_live_consume_rate_limit", {
      p_actor_id: user.id,
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
    const { data: profile } = await admin.from("profiles").select("username,display_name").eq("id", user.id).maybeSingle();
    const identity = user.id;
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
        .insert({ id: sessionId, creator_id: user.id, room_name: roomName, title, status: "live" })
        .select("id,title,status,started_at").single();
      if (insertError || !session) {
        await rooms.deleteRoom(roomName).catch(() => {});
        if (insertError?.code === "23505") return json({ error: "A live broadcast is already active for this creator." }, 409);
        return json({ error: "Could not start the broadcast." }, 500);
      }
      const credentials = await issueToken(roomName, true, true);
      return json({ session, ...credentials });
    } catch (error) {
      console.error("TikNation Live start failed:", error);
      await admin.from("live_sessions").update({ status: "ended", ended_at: new Date().toISOString() }).eq("id", sessionId).eq("status", "live");
      try {
        await rooms.deleteRoom(roomName);
      } catch (cleanupError) {
        console.error("Live room cleanup after start failure failed:", cleanupError);
      }
      return json({ error: "The broadcast could not be started. Please try again." }, 502);
    }
  }

  if (action === "join") {
    const sessionId = String(body.session_id ?? "");
    if (!/^[0-9a-f-]{36}$/i.test(sessionId)) return json({ error: "Invalid live session." }, 400);
    const { data: session, error } = await admin.from("live_sessions")
      .select("id,title,room_name,status,started_at,creator_id").eq("id", sessionId).eq("status", "live").maybeSingle();
    if (error) return json({ error: "Could not load the live broadcast." }, 500);
    if (!session) return json({ error: "This broadcast has ended or is unavailable." }, 404);
    const credentials = await issueToken(session.room_name, false, true);
    return json({ session: { id: session.id, title: session.title, status: session.status, started_at: session.started_at, creator_id: session.creator_id }, ...credentials });
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
    const { data: session } = await admin.from("live_sessions").select("id").eq("id", sessionId).eq("status", "live").maybeSingle();
    if (!session) return json({ error: "This broadcast has ended." }, 404);
    if (await isRateLimited("chat", 8, 60_000)) {
      return json({ error: "You're sending messages too quickly. Please wait a minute and try again." }, 429);
    }
    const { data: saved, error } = await admin.from("live_chat_messages")
      .insert({ session_id: sessionId, user_id: user.id, message })
      .select("id,session_id,user_id,message,created_at").single();
    if (error || !saved) return json({ error: "Could not send the chat message." }, 500);
    return json({ message: saved });
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
      .select("id,creator_id,title,status,started_at,room_name")
      .eq("status", "live").order("started_at", { ascending: false }).limit(50);
    if (error) return json({ error: "Could not load live broadcasts." }, 500);

    // Opportunistic stale-session recovery: only mark rooms missing from a
    // successful LiveKit room listing as ended. Never infer this from API failure.
    let liveRooms;
    try {
      liveRooms = await rooms.listRooms();
    } catch (recoveryError) {
      console.error("Live stale-session check failed:", recoveryError);
      return json({ error: "Live broadcasts are temporarily unavailable. Please refresh shortly." }, 503);
    }
    const roomNames = new Set(liveRooms.map((r) => r.name));
    const stale = (data ?? []).filter((s) => !roomNames.has(s.room_name));
    if (stale.length) {
      const staleIds = stale.map((s) => s.id);
      const { error: cleanupError } = await admin.from("live_sessions")
        .update({ status: "ended", ended_at: new Date().toISOString() })
        .in("id", staleIds).eq("status", "live");
      if (cleanupError) console.error("Stale Live session database cleanup failed:", cleanupError);
    }
    return json({ sessions: (data ?? []).filter((s) => roomNames.has(s.room_name)).map(({ room_name, ...s }) => s) });
  }

  return json({ error: "Unknown action." }, 400);
});
