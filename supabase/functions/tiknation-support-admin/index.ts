import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://goofytechwiz.github.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { ...corsHeaders, "Content-Type": "application/json" },
});
function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
const ADMIN_EMAIL = "tiknationstudio@gmail.com";
const statuses = ["open", "in_progress", "waiting_on_user", "resolved", "closed"];
const priorities = ["low", "normal", "high", "urgent"];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);
  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return json({ error: "Administrator sign-in required." }, 401);
  try {
    const url = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !anonKey || !serviceKey) return json({ error: "Support service is not configured." }, 500);
    const token = authorization.slice(7).trim();
    const authClient = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: authData, error: authError } = await authClient.auth.getUser(token);
    const user = authData?.user;
    if (authError || !user) return json({ error: "Your session is invalid or expired. Please sign in again." }, 401);
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
    if (claimsError || claimsData?.claims?.aal !== "aal2") return json({ error: "Complete authenticator verification before using support administration." }, 403);
    const isAdmin = (user.email ?? "").trim().toLowerCase() === ADMIN_EMAIL;
    const service = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: moderator, error: roleError } = await service.from("moderator_roles")
      .select("user_id").eq("user_id", user.id).eq("is_active", true).maybeSingle();
    if (roleError) return json({ error: "Support permissions could not be checked." }, 500);
    if (!isAdmin && !moderator) return json({ error: "Founder or active moderator access required." }, 403);
    let body: Record<string, unknown>;
    try {
      const parsed = await req.json();
      if (!isRecord(parsed)) return json({ error: "Invalid request." }, 400);
      body = parsed;
    } catch { return json({ error: "Invalid request." }, 400); }
    if (body.action === "list") {
      const limit = Math.max(1, Math.min(100, Number(body.limit) || 50));
      const { data, error } = await service.from("support_tickets")
        .select("id,ticket_number,user_id,contact_email,username_label,category,summary,priority,status,assigned_to,resolution_note,created_at,updated_at,resolved_at")
        .order("created_at", { ascending: false }).limit(limit);
      if (error) return json({ error: "Support tickets could not be loaded." }, 500);
      return json({ success: true, role: isAdmin ? "admin" : "moderator", tickets: data ?? [] });
    }
    if (body.action === "messages") {
      const id = typeof body.ticket_id === "string" ? body.ticket_id.trim() : "";
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return json({ error: "Choose a valid ticket." }, 400);
      const { data, error } = await service.from("support_messages")
        .select("id,ticket_id,sender_id,sender_role,message,is_internal,created_at")
        .eq("ticket_id", id).eq("is_internal", false).order("created_at", { ascending: true }).limit(100);
      if (error) return json({ error: "The conversation could not be loaded." }, 500);
      return json({ success: true, messages: data ?? [] });
    }
    if (body.action === "reply") {
      const id = typeof body.ticket_id === "string" ? body.ticket_id.trim() : "";
      const message = typeof body.message === "string" ? body.message.trim() : "";
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return json({ error: "Choose a valid ticket." }, 400);
      if (message.length < 1 || message.length > 2000) return json({ error: "Replies must be 1–2000 characters." }, 400);
      const { data: ticket, error: ticketError } = await service.from("support_tickets").select("id,user_id").eq("id", id).maybeSingle();
      if (ticketError || !ticket) return json({ error: "Ticket not found." }, 404);
      const { data: saved, error } = await service.from("support_messages").insert({
        ticket_id: id, sender_id: user.id, sender_role: "staff", message, is_internal: false
      }).select("id,ticket_id,sender_role,message,created_at").single();
      if (error || !saved) return json({ error: "The reply could not be saved." }, 500);
      const { error: auditError } = await service.from("support_audit").insert({
        ticket_id: id, actor_id: user.id, action: "staff_reply_sent", details: { message_length: message.length }
      });
      if (auditError) return json({ error: "Reply saved, but audit logging failed. Contact the Founder." }, 500);
      return json({ success: true, message: saved });
    }
    if (body.action === "update") {
      const id = typeof body.ticket_id === "string" ? body.ticket_id.trim() : "";
      const status = typeof body.status === "string" ? body.status : "";
      const priority = typeof body.priority === "string" ? body.priority : "";
      const note = typeof body.resolution_note === "string" ? body.resolution_note.trim().slice(0, 2000) : "";
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return json({ error: "Choose a valid ticket." }, 400);
      if (!statuses.includes(status) || !priorities.includes(priority)) return json({ error: "Choose a valid status and priority." }, 400);
      const { data: before, error: beforeError } = await service.from("support_tickets")
        .select("id,status,priority").eq("id", id).maybeSingle();
      if (beforeError) return json({ error: "The ticket could not be loaded." }, 500);
      if (!before) return json({ error: "Ticket not found." }, 404);
      const now = new Date().toISOString();
      const { data: updated, error } = await service.from("support_tickets").update({
        status, priority, resolution_note: note || null, assigned_to: user.id,
        updated_at: now, resolved_at: ["resolved", "closed"].includes(status) ? now : null,
      }).eq("id", id).select("id,ticket_number,status,priority,assigned_to,resolution_note,updated_at,resolved_at").single();
      if (error || !updated) return json({ error: "The ticket could not be updated." }, 500);
      const { error: auditError } = await service.from("support_audit").insert({
        ticket_id: id, actor_id: user.id, action: "ticket_updated",
        details: { old_status: before.status, new_status: status, old_priority: before.priority, new_priority: priority, has_resolution_note: !!note },
      });
      if (auditError) {
        console.error("Support audit write failed:", auditError.code ?? "unknown");
        return json({ error: "Ticket updated, but audit logging failed. Stop and contact the Founder." }, 500);
      }
      return json({ success: true, ticket: updated });
    }
    return json({ error: "Unsupported support action." }, 400);
  } catch {
    return json({ error: "The support request could not be completed." }, 500);
  }
});