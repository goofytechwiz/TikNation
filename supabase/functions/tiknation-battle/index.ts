import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json"
};
const respond = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: cors });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return respond({ error: "Use POST." }, 405);
  const url = Deno.env.get("SUPABASE_URL");
  const anon = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !anon || !serviceKey) return respond({ error: "Battle service is not configured." }, 500);
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) return respond({ error: "Sign in to play online." }, 401);
  const userClient = createClient(url, anon, { auth: { persistSession: false }, global: { headers: { Authorization: "Bearer " + token } } });
  const { data: userData, error: userError } = await userClient.auth.getUser(token);
  if (userError || !userData.user) return respond({ error: "Your session is invalid. Please sign in again." }, 401);
  const user = userData.user;
  const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return respond({ error: "Invalid JSON body." }, 400); }
  const action = body.action;

  if (action === "queue") {
    const mode = body.mode === "strategy" ? "strategy" : "quick";
    const { data: active } = await admin.from("battle_matches").select("*").eq("status", "active").or("player_one_id.eq." + user.id + ",player_two_id.eq." + user.id).order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (active) return respond({ status: "matched", match: active });
    const { data: profile } = await admin.from("battle_profiles").select("username").eq("user_id", user.id).maybeSingle();
    const username = profile?.username || ("player_" + user.id.replaceAll("-", "").slice(0, 10));
    await admin.from("battle_queue").delete().eq("user_id", user.id);
    const { data: opponent } = await admin.from("battle_queue").select("user_id,username,mode,queued_at").eq("mode", mode).neq("user_id", user.id).order("queued_at", { ascending: true }).limit(1).maybeSingle();
    if (opponent) {
      await admin.from("battle_queue").delete().eq("user_id", opponent.user_id);
      const first = Math.random() < 0.5 ? opponent.user_id : user.id;
      const second = first === user.id ? opponent.user_id : user.id;
      const { data: match, error } = await admin.from("battle_matches").insert({ player_one_id: first, player_two_id: second, mode, current_turn: first, last_action: "Match found! " + (profile?.username || username) + " vs " + opponent.username }).select("*").single();
      if (error) return respond({ error: "Could not create match. Please rejoin the queue." }, 500);
      return respond({ status: "matched", match });
    }
    const { error } = await admin.from("battle_queue").insert({ user_id: user.id, username, mode });
    if (error) return respond({ error: "Could not join the queue: " + error.message }, 500);
    return respond({ status: "queued", mode, message: "You're in the queue. Keep this page open while we look for an opponent." });
  }

  if (action === "leave") {
    const { error } = await admin.from("battle_queue").delete().eq("user_id", user.id);
    if (error) return respond({ error: "Could not leave queue." }, 500);
    return respond({ status: "left" });
  }

  if (action === "move") {
    const matchId = String(body.match_id || "");
    const move = String(body.move || "");
    if (!["attack", "defend", "dodge", "special"].includes(move)) return respond({ error: "Choose a valid battle move." }, 400);
    const { data: match, error } = await admin.from("battle_matches").select("*").eq("id", matchId).maybeSingle();
    if (error || !match) return respond({ error: "Match not found." }, 404);
    if (match.status !== "active") return respond({ error: "This match has ended." }, 409);
    if (match.player_one_id !== user.id && match.player_two_id !== user.id) return respond({ error: "You are not a player in this match." }, 403);
    if (match.current_turn !== user.id) return respond({ error: "It's the other player's turn." }, 409);
    const isOne = match.player_one_id === user.id;
    const myHpKey = isOne ? "player_one_hp" : "player_two_hp";
    const theirHpKey = isOne ? "player_two_hp" : "player_one_hp";
    const myGuardKey = isOne ? "player_one_guard" : "player_two_guard";
    const theirGuardKey = isOne ? "player_two_guard" : "player_one_guard";
    const otherId = isOne ? match.player_two_id : match.player_one_id;
    const update: Record<string, unknown> = { turn_number: match.turn_number + 1, updated_at: new Date().toISOString() };
    let description = "";
    if (move === "defend" || move === "dodge") {
      update[myGuardKey] = true;
      description = move === "defend" ? "🛡️ Player guards against the next hit." : "💨 Player prepares an evasive move.";
    } else {
      let damage = move === "special" ? 20 + Math.floor(Math.random() * 9) : 10 + Math.floor(Math.random() * 9);
      if (match[theirGuardKey]) {
        damage = Math.max(3, Math.floor(damage * 0.4));
        update[theirGuardKey] = false;
      }
      if (move === "attack" && match.mode === "strategy") damage += 2;
      const hp = Math.max(0, Number(match[theirHpKey]) - damage);
      update[theirHpKey] = hp;
      description = (move === "special" ? "✨ Special move" : "⚔️ Attack") + " dealt " + damage + " damage.";
      if (hp <= 0) {
        update.status = "completed";
        update.winner_id = user.id;
        update.last_action = description + " Match won!";
        const { data: updated, error: updateError } = await admin.from("battle_matches").update(update).eq("id", matchId).eq("status", "active").eq("current_turn", user.id).select("*").maybeSingle();
        if (updateError || !updated) return respond({ error: "The match changed. Refresh and try again." }, 409);
        const { data: winnerStats } = await admin.from("battle_stats").select("wins,xp").eq("user_id", user.id).maybeSingle();
        if (winnerStats) await admin.from("battle_stats").update({ wins: winnerStats.wins + 1, xp: winnerStats.xp + 50, updated_at: new Date().toISOString() }).eq("user_id", user.id);
        else await admin.from("battle_stats").insert({ user_id: user.id, wins: 1, xp: 50 });
        const { data: loserStats } = await admin.from("battle_stats").select("losses").eq("user_id", otherId).maybeSingle();
        if (loserStats) await admin.from("battle_stats").update({ losses: loserStats.losses + 1, updated_at: new Date().toISOString() }).eq("user_id", otherId);
        else await admin.from("battle_stats").insert({ user_id: otherId, losses: 1 });
        return respond({ status: "completed", match: updated });
      }
    }
    update.current_turn = otherId;
    update.last_action = description;
    const { data: updated, error: updateError } = await admin.from("battle_matches").update(update).eq("id", matchId).eq("status", "active").eq("current_turn", user.id).select("*").maybeSingle();
    if (updateError || !updated) return respond({ error: "The match changed. Refresh and try again." }, 409);
    return respond({ status: "active", match: updated });
  }
  return respond({ error: "Unknown action." }, 400);
});