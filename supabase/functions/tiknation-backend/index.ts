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

function field(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);

  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return json({ error: "Please sign in to submit a verification application." }, 401);
  }

  try {
    const url = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !anonKey || !serviceKey) {
      return json({ error: "Server configuration is incomplete." }, 500);
    }

    const token = authorization.slice("Bearer ".length).trim();
    const authClient = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: authData, error: authError } = await authClient.auth.getUser(token);
    const user = authData?.user;
    if (authError || !user) {
      return json({ error: "Your session is invalid or expired. Please sign in again." }, 401);
    }

    let body: Record<string, unknown>;
    try {
      const parsed = await req.json();
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return json({ error: "Invalid application." }, 400);
      }
      body = parsed as Record<string, unknown>;
    } catch {
      return json({ error: "Invalid application." }, 400);
    }

    const username = field(body.username, 24);
    const category = field(body.category, 80);
    const presence = field(body.presence, 500);
    const reason = field(body.reason, 2000);
    const supportingLinks = typeof body.supporting_links === "string"
      ? body.supporting_links.trim()
      : "";
    if (!username || !category || !presence || !reason || supportingLinks.length > 2000) {
      return json({ error: "Please complete the required fields and check their length limits." }, 400);
    }

    const adminClient = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await adminClient
      .from("verification_applications")
      .insert({
        user_id: user.id,
        username,
        category,
        presence,
        reason,
        supporting_links: supportingLinks,
        status: "pending",
      })
      .select("id,status")
      .single();

    if (error || !data) {
      console.error("Verification application insert failed:", error?.code ?? "unknown");
      return json({ error: "We couldn't submit your application. Please try again." }, 500);
    }

    return json({ success: true, application: data }, 201);
  } catch {
    return json({ error: "Invalid request. Please try again." }, 400);
  }
});
