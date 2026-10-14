import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://goofytechwiz.github.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
const isUuid = (value: unknown): value is string =>
  typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);
  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return json({ error: "Please sign in to use Gifts." }, 401);

  try {
    const url = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !anonKey || !serviceKey) return json({ error: "Gifts are not configured yet." }, 503);

    const token = authorization.slice(7).trim();
    const authClient = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: authData, error: authError } = await authClient.auth.getUser(token);
    const user = authData?.user;
    if (authError || !user || user.is_anonymous) return json({ error: "Your session is invalid. Please sign in again." }, 401);

    let body: Record<string, unknown>;
    try {
      const parsed = await req.json();
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return json({ error: "Invalid request." }, 400);
      body = parsed as Record<string, unknown>;
    } catch {
      return json({ error: "Invalid request." }, 400);
    }

    const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    if (body.action === "balance") {
      const { data, error } = await admin.rpc("ensure_test_gift_wallet", { p_user_id: user.id });
      if (error) {
        console.error("Gift balance failed:", error.code ?? "unknown");
        return json({ error: "We couldn't load your test coin balance." }, 500);
      }
      return json({ success: true, currency: "TEST", balance: data, cash_value: 0 });
    }

    if (body.action === "send") {
      const recipientId = body.recipient_id;
      const giftCode = body.gift_code;
      const requestId = body.request_id;
      if (!isUuid(recipientId) || !isUuid(requestId) ||
          !["heart_pulse", "magic_spark", "creator_crown", "infinity_crystal", "melody_note", "heartbeat_beat", "symphony", "mystic_portal", "dragon_spirit", "galaxy_gift"].includes(String(giftCode))) {
        return json({ error: "Choose a valid gift and creator profile." }, 400);
      }
      const { data, error } = await admin.rpc("send_test_gift", {
        p_sender_id: user.id, p_recipient_id: recipientId,
        p_gift_code: giftCode, p_request_id: requestId,
      });
      if (error) {
        const messages: Record<string, string> = {
          cannot_gift_self: "You can't send a gift to your own profile.",
          recipient_profile_not_found: "That creator profile could not be found.",
          gifting_unavailable: "Gifting isn't available between these accounts.",
          invalid_gift: "That gift isn't available yet.",
          insufficient_test_coins: "You don't have enough test coins for that gift.",
          invalid_user: "Please sign in again before sending a gift.",
        };
        const key = Object.keys(messages).find((item) => error.message?.includes(item));
        if (key) return json({ error: messages[key] }, 400);
        console.error("Gift send failed:", error.code ?? "unknown");
        return json({ error: "We couldn't send that gift. Please try again." }, 500);
      }
      return json(data);
    }

    if (body.action === "history") {
      const { data: rows, error } = await admin.from("gift_transactions")
        .select("id,sender_id,recipient_id,gift_code,coin_cost,created_at")
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order("created_at", { ascending: false }).limit(50);
      if (error) {
        console.error("Gift history failed:", error.code ?? "unknown");
        return json({ error: "We couldn't load your gift history." }, 500);
      }
      const ids = [...new Set((rows ?? []).flatMap((row) => [row.sender_id, row.recipient_id]))];
      const { data: profiles } = ids.length
        ? await admin.from("profiles").select("id,username,display_name,avatar_url").in("id", ids)
        : { data: [] };
      const profileMap = new Map((profiles ?? []).map((profile) => [profile.id, profile]));
      const history = (rows ?? []).map((row) => ({
        ...row, direction: row.sender_id === user.id ? "sent" : "received",
        other_user: profileMap.get(row.sender_id === user.id ? row.recipient_id : row.sender_id) ?? null,
      }));
      const received = history.filter((item) => item.direction === "received");
      return json({
        success: true, currency: "TEST", history,
        received_count: received.length,
        received_test_coins: received.reduce((sum, item) => sum + item.coin_cost, 0),
      });
    }
    return json({ error: "Unknown Gifts action." }, 400);
  } catch {
    return json({ error: "Something went wrong. Please try again." }, 400);
  }
});
