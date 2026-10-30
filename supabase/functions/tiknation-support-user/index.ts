import { createClient } from "npm:@supabase/supabase-js@2";
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://goofytechwiz.github.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS", "Vary": "Origin",
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
function record(v: unknown): v is Record<string, unknown> { return !!v && typeof v === "object" && !Array.isArray(v); }
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);
  const auth = req.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return json({ error: "Sign in first." }, 401);
  try {
    const url = Deno.env.get("SUPABASE_URL"), anon = Deno.env.get("SUPABASE_ANON_KEY"), key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !anon || !key) return json({ error: "Support service is not configured." }, 500);
    const token = auth.slice(7).trim();
    const client = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: authData, error: authError } = await client.auth.getUser(token);
    const user = authData?.user;
    if (authError || !user) return json({ error: "Session expired. Sign in again." }, 401);
    let body: Record<string, unknown>;
    try { const parsed = await req.json(); if (!record(parsed)) return json({ error: "Invalid request." }, 400); body = parsed; }
    catch { return json({ error: "Invalid request." }, 400); }
    const service = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    if (body.action === "list") {
      const { data, error } = await service.from("support_tickets")
        .select("id,ticket_number,category,summary,priority,status,created_at,updated_at,resolved_at")
        .eq("user_id", user.id).order("created_at", { ascending: false }).limit(50);
      if (error) return json({ error: "Your tickets could not be loaded." }, 500);
      return json({ success: true, tickets: data ?? [] });
    }
    const id = typeof body.ticket_id === "string" ? body.ticket_id.trim() : "";
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return json({ error: "Choose a valid ticket." }, 400);
    const { data: ticket, error: ticketError } = await service.from("support_tickets")
      .select("id,user_id,status").eq("id", id).eq("user_id", user.id).maybeSingle();
    if (ticketError || !ticket) return json({ error: "Ticket not found." }, 404);
    if (body.action === "messages") {
      const { data, error } = await service.from("support_messages")
        .select("id,sender_role,message,created_at").eq("ticket_id", id).eq("is_internal", false)
        .order("created_at", { ascending: true }).limit(100);
      if (error) return json({ error: "Conversation unavailable." }, 500);
      return json({ success: true, messages: data ?? [] });
    }
    if (body.action === "reply") {
      const message = typeof body.message === "string" ? body.message.trim() : "";
      if (message.length < 1 || message.length > 2000) return json({ error: "Replies must be 1–2000 characters." }, 400);
      if (["resolved", "closed"].includes(ticket.status)) return json({ error: "This ticket is closed. Create a new ticket if you still need help." }, 409);
      const { data, error } = await service.from("support_messages").insert({
        ticket_id: id, sender_id: user.id, sender_role: "user", message, is_internal: false
      }).select("id,sender_role,message,created_at").single();
      if (error || !data) return json({ error: "Your reply could not be saved." }, 500);
      await service.from("support_tickets").update({ status: "open", updated_at: new Date().toISOString() }).eq("id", id);
      const { error: auditError } = await service.from("support_audit").insert({
        ticket_id: id, actor_id: user.id, action: "user_reply_sent", details: { message_length: message.length }
      });
      if (auditError) return json({ error: "Reply saved, but activity logging failed. Contact support." }, 500);
      return json({ success: true, message: data });
    }
    return json({ error: "Unsupported action." }, 400);
  } catch { return json({ error: "Support request could not be completed." }, 500); }
});