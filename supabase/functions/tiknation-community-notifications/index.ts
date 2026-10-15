import { createClient } from "npm:@supabase/supabase-js@2";

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

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);

  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return json({ error: "Sign in first." }, 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey || !serviceKey) return json({ error: "Notification service is not configured." }, 503);

  const token = authorization.slice(7).trim();
  const auth = createClient(supabaseUrl, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: authData, error: authError } = await auth.auth.getUser(token);
  const actor = authData?.user;
  if (authError || !actor) return json({ error: "Your session is invalid or expired." }, 401);

  let body: Record<string, unknown>;
  try {
    const parsed = await req.json();
    if (!isRecord(parsed)) return json({ error: "Invalid request." }, 400);
    body = parsed;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  if (body.action !== "post_published") return json({ error: "Unsupported notification event." }, 400);
  const postId = String(body.post_id ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(postId)) return json({ error: "Invalid post." }, 400);

  const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: post, error: postError } = await admin.from("creator_posts")
    .select("id,user_id,title,status").eq("id", postId).maybeSingle();
  if (postError) return json({ error: "Could not verify the published post." }, 500);
  if (!post || post.user_id !== actor.id || post.status !== "published") {
    return json({ error: "You can only notify followers about your own published post." }, 403);
  }

  const { data: follows, error: followsError } = await admin.from("follows")
    .select("follower_id").eq("following_id", actor.id);
  if (followsError) return json({ error: "Could not load followers." }, 500);
  const followerIds = [...new Set((follows ?? []).map((row: { follower_id: string }) => row.follower_id)
    .filter((id: string) => id !== actor.id))];
  if (!followerIds.length) return json({ sent: 0 });

  const [preferencesResult, mutesResult, blocksResult] = await Promise.all([
    admin.from("creator_notification_preferences").select("user_id,post_alerts")
      .eq("creator_id", actor.id).in("user_id", followerIds),
    admin.from("user_mutes").select("muter_id,mute_notifications")
      .eq("muted_id", actor.id).in("muter_id", followerIds),
    admin.from("user_blocks").select("blocker_id,blocked_id")
      .or("blocker_id.eq." + actor.id + ",blocked_id.eq." + actor.id),
  ]);
  if (preferencesResult.error || mutesResult.error || blocksResult.error) {
    return json({ error: "Could not verify notification preferences and safety settings. No alerts were sent." }, 500);
  }

  const optedIn = new Set((preferencesResult.data ?? [])
    .filter((row: { user_id: string; post_alerts: boolean }) => row.post_alerts)
    .map((row: { user_id: string }) => row.user_id));
  const muted = new Set((mutesResult.data ?? [])
    .filter((row: { muter_id: string; mute_notifications: boolean }) => row.mute_notifications)
    .map((row: { muter_id: string }) => row.muter_id));
  const blocked = new Set<string>();
  for (const row of blocksResult.data ?? []) {
    if (row.blocker_id === actor.id) blocked.add(row.blocked_id);
    if (row.blocked_id === actor.id) blocked.add(row.blocker_id);
  }

  const recipients = followerIds.filter((id) => optedIn.has(id) && !muted.has(id) && !blocked.has(id));
  if (!recipients.length) return json({ sent: 0 });

  const title = String(post.title ?? "").trim().slice(0, 100) || "a new creation";
  const rows = recipients.map((recipient_id) => ({
    recipient_id, actor_id: actor.id, type: "creator_post", message: "Posted a new creation: " + title,
  }));
  const { error: insertError } = await admin.from("notifications").insert(rows);
  if (insertError) return json({ error: "The post was published, but alerts could not be delivered." }, 500);
  return json({ sent: recipients.length });
});
