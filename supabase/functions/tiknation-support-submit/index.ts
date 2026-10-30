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
const categories = ["Messages", "Gifts & coins", "Login & verification", "Live & creator tools", "Safety report", "Other"];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);
  const auth = req.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return json({ error: "Sign in to submit a support request." }, 401);
  try {
    const url = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !anonKey || !serviceKey) return json({ error: "Support service is not configured." }, 500);
    const token = auth.slice(7).trim();
    const userClient = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: authData, error: authError } = await userClient.auth.getUser(token);
    const user = authData?.user;
    if (authError || !user) return json({ error: "Your session is invalid or expired. Please sign in again." }, 401);
    let body: Record<string, unknown>;
    try {
      const parsed = await req.json();
      if (!isRecord(parsed)) return json({ error: "Invalid request." }, 400);
      body = parsed;
    } catch { return json({ error: "Invalid request." }, 400); }
    const category = typeof body.category === "string" ? body.category.trim() : "";
    const summary = typeof body.summary === "string" ? body.summary.trim() : "";
    const username = typeof body.username === "string" ? body.username.trim().slice(0, 40) : "";
    if (!categories.includes(category)) return json({ error: "Choose a valid support category." }, 400);
    if (summary.length < 5 || summary.length > 2000) return json({ error: "Describe the issue in 5–2000 characters." }, 400);
    const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: ticket, error } = await admin.from("support_tickets").insert({
      user_id: user.id, contact_email: user.email ?? null, username_label: username || null,
      category, summary, priority: category === "Safety report" ? "high" : "normal",
    }).select("id,ticket_number,category,status,created_at").single();
    if (error || !ticket) {
      console.error("Support ticket creation failed:", error?.code ?? "unknown");
      return json({ error: "Your ticket could not be created right now. Please try again." }, 500);
    }
    const { error: auditError } = await admin.from("support_audit").insert({
      ticket_id: ticket.id, actor_id: user.id, action: "ticket_created",
      details: { category, source: "user_portal" },
    });
    if (auditError) {
      console.error("Support audit write failed:", auditError.code ?? "unknown");
      return json({ error: "Ticket created, but confirmation logging failed. Contact support before submitting again.", ticket: { ticket_number: ticket.ticket_number } }, 500);
    }
    return json({ success: true, ticket });
  } catch {
    return json({ error: "The support request could not be completed." }, 500);
  }
});