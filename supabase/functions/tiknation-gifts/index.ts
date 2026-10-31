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
    if (body.action === "send_live") {
      const sessionId = body.session_id;
      const giftCode = body.gift_code;
      const requestId = body.request_id;
      const allowedGifts = ["heart_pulse", "magic_spark", "creator_crown", "infinity_crystal", "melody_note", "heartbeat_beat", "symphony", "mystic_portal", "dragon_spirit", "galaxy_gift", "thunder_clap", "prism_wave", "mystery_reveal", "dragon_ball", "changing_face", "clouds_of_mystery", "hammer_of_pain", "thunder_ass", "storm_of_the_world", "lightning_bolts_of_doom", "book_of_death", "dream_makers", "phoenix_rebirth", "treasure_explosion", "meteor_mayhem", "disco_raccoon", "portal_party", "blast_from_my_ass", "asshole_of_death", "golden_throne", "chicken_of_doom", "cheesepocalypse", "skeleton_disco", "dragons_revenge", "stinky_fart_or_death", "madafaka_rattle", "toxic_cloud", "bone_breaker", "knockout", "cant_breathe", "toxic_cloud", "bone_breaker", "knockout", "cant_breathe", "toxic_cloud", "bone_breaker", "knockout", "cant_breathe", "toxic_cloud", "bone_breaker", "knockout", "cant_breathe"];
      if (!isUuid(sessionId) || !isUuid(requestId) || !allowedGifts.includes(String(giftCode))) return json({ error: "Choose a valid gift and active livestream." }, 400);
      const requestedRecipient = isUuid(body.recipient_id) ? String(body.recipient_id) : null;
      const { data: liveSession, error: sessionError } = await admin.from("live_sessions").select("id,creator_id,status").eq("id", sessionId).eq("status", "live").maybeSingle();
      if (sessionError || !liveSession) return json({ error: "This livestream has ended or is unavailable." }, 404);
      let recipientId = liveSession.creator_id;
      if (requestedRecipient && requestedRecipient !== liveSession.creator_id) {
        const { data: activeBattle, error: battleError } = await admin.from("live_battle_invites")
          .select("id,host_id,opponent_id,decided_at,round_seconds")
          .eq("session_id", liveSession.id).eq("status", "accepted").order("decided_at", { ascending: false }).limit(1).maybeSingle();
        if (battleError) return json({ error: "Could not verify the active Live Battle." }, 500);
        const endsAt = activeBattle?.decided_at
          ? new Date(new Date(activeBattle.decided_at).getTime() + Math.max(30, Math.min(600, Number(activeBattle.round_seconds) || 180)) * 1000)
          : new Date(0);
        if (!activeBattle || endsAt.getTime() <= Date.now() ||
            ![activeBattle.host_id, activeBattle.opponent_id].includes(requestedRecipient)) {
          return json({ error: "You can only send a battle gift to one of the two active players." }, 403);
        }
        recipientId = requestedRecipient;
      }
      if (recipientId === user.id) return json({ error: "You can't send a gift to your own livestream or battle position." }, 400);
      const { data, error } = await admin.rpc("send_test_gift", { p_sender_id: user.id, p_recipient_id: recipientId, p_gift_code: giftCode, p_request_id: requestId });
      if (error) {
        const messages: Record<string, string> = { cannot_gift_self: "You can't send a gift to your own livestream.", recipient_profile_not_found: "That creator profile could not be found.", gifting_unavailable: "Gifting isn't available between these accounts.", invalid_gift: "That gift isn't available yet.", insufficient_test_coins: "You don't have enough test coins for that gift.", invalid_user: "Please sign in again before sending a gift." };
        const key = Object.keys(messages).find((item) => error.message?.includes(item));
        if (key) return json({ error: messages[key] }, 400);
        console.error("Live gift send failed:", error.code ?? "unknown");
        return json({ error: "We couldn't send that live gift. Please try again." }, 500);
      }
      if (data?.gift_id) {
        const { error: eventError } = await admin.from("live_gift_events").upsert({ session_id: liveSession.id, transaction_id: data.gift_id, sender_id: user.id, recipient_id: recipientId, gift_code: data.gift_code || giftCode, coin_cost: data.coin_cost }, { onConflict: "transaction_id", ignoreDuplicates: true });
        if (eventError) console.error("Live gift announcement failed:", eventError.code ?? "unknown");
      }
      return json({ ...data, session_id: liveSession.id, live_gift: true });
    }

    if (body.action === "live_events") {
      const sessionId = body.session_id;
      if (!isUuid(sessionId)) return json({ error: "Invalid livestream." }, 400);
      const { data: liveSession, error: sessionError } = await admin.from("live_sessions").select("id,status").eq("id", sessionId).eq("status", "live").maybeSingle();
      if (sessionError || !liveSession) return json({ error: "This livestream has ended or is unavailable." }, 404);
      const after = typeof body.after === "string" && !Number.isNaN(Date.parse(body.after)) ? new Date(body.after).toISOString() : new Date(Date.now() - 10000).toISOString();
      const { data: events, error: eventsError } = await admin.from("live_gift_events").select("id,session_id,sender_id,recipient_id,gift_code,coin_cost,created_at").eq("session_id", sessionId).gt("created_at", after).order("created_at", { ascending: true }).limit(30);
      if (eventsError) { console.error("Live gift feed failed:", eventsError.code ?? "unknown"); return json({ error: "Live gifts could not be refreshed." }, 500); }
      const senderIds = [...new Set((events ?? []).map((event) => event.sender_id))];
      const { data: profiles } = senderIds.length ? await admin.from("profiles").select("id,username,display_name").in("id", senderIds) : { data: [] };
      const profileMap = new Map((profiles ?? []).map((profile) => [profile.id, profile]));
      const { data: activeBattle } = await admin.from("live_battle_invites")
        .select("id,host_id,opponent_id,decided_at,round_seconds")
        .eq("session_id", sessionId).eq("status", "accepted").order("decided_at", { ascending: false }).limit(1).maybeSingle();
      let battle = null;
      if (activeBattle?.decided_at) {
        const endsAt = new Date(new Date(activeBattle.decided_at).getTime() + Math.max(30, Math.min(600, Number(activeBattle.round_seconds) || 180)) * 1000);
        if (endsAt.getTime() > Date.now()) {
          const { data: players } = await admin.from("profiles").select("id,username,display_name").in("id", [activeBattle.host_id, activeBattle.opponent_id]);
          const playerMap = new Map((players ?? []).map((profile) => [profile.id, profile]));
          battle = { id: activeBattle.id, host_id: activeBattle.host_id, opponent_id: activeBattle.opponent_id,
            host_name: playerMap.get(activeBattle.host_id)?.display_name || playerMap.get(activeBattle.host_id)?.username || "Host",
            opponent_name: playerMap.get(activeBattle.opponent_id)?.display_name || playerMap.get(activeBattle.opponent_id)?.username || "Opponent" };
        }
      }
      return json({ success: true, battle, events: (events ?? []).map((event) => ({ ...event, sender_name: profileMap.get(event.sender_id)?.display_name || profileMap.get(event.sender_id)?.username || "TikNation member" })) });
    }

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
          !["heart_pulse", "magic_spark", "creator_crown", "infinity_crystal", "melody_note", "heartbeat_beat", "symphony", "mystic_portal", "dragon_spirit", "galaxy_gift", "thunder_clap", "prism_wave", "mystery_reveal", "dragon_ball", "changing_face", "clouds_of_mystery", "hammer_of_pain", "thunder_ass", "storm_of_the_world", "lightning_bolts_of_doom", "book_of_death", "dream_makers", "phoenix_rebirth", "treasure_explosion", "meteor_mayhem", "disco_raccoon", "portal_party", "blast_from_my_ass", "asshole_of_death", "golden_throne", "chicken_of_doom", "cheesepocalypse", "skeleton_disco", "dragons_revenge", "stinky_fart_or_death", "madafaka_rattle", "toxic_cloud", "bone_breaker", "knockout", "cant_breathe", "toxic_cloud", "bone_breaker", "knockout", "cant_breathe", "toxic_cloud", "bone_breaker", "knockout", "cant_breathe", "toxic_cloud", "bone_breaker", "knockout", "cant_breathe"].includes(String(giftCode))) {
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
