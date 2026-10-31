import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://goofytechwiz.github.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);
  const header = req.headers.get("Authorization");
  if (!header?.startsWith("Bearer ")) return json({ error: "Sign in to review security events." }, 401);

  const url = Deno.env.get("SUPABASE_URL");
  const anon = Deno.env.get("SUPABASE_ANON_KEY");
  const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !anon || !service) return json({ error: "Security event service is not configured." }, 503);

  const token = header.slice(7).trim();
  const auth = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: userData, error: userError } = await auth.auth.getUser(token);
  const user = userData?.user;
  if (userError || !user) return json({ error: "Your session is invalid or expired." }, 401);

  const { data: claimsData, error: claimsError } = await auth.auth.getClaims(token);
  if (claimsError || claimsData?.claims?.aal !== "aal2") {
    return json({ error: "Complete authenticator verification before reviewing security events." }, 403);
  }
  if ((user.email ?? "").trim().toLowerCase() !== "tiknationstudio@gmail.com") {
    return json({ error: "Only the Founder can review security events." }, 403);
  }

  const admin = createClient(url, service, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await admin.from("tiknation_security_events")
    .select("id,event_type,identifier_hash,network_hash,user_id,created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) {
    console.error("Security event lookup failed:", error.code ?? "unknown");
    return json({ error: "Could not load security events." }, 500);
  }
  return json({ events: data ?? [], limit: 100 });
});