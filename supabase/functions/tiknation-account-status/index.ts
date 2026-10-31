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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "POST requests only." }, 405);

  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return json({ error: "Please sign in to manage your account status." }, 401);
  }

  try {
    const url = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !anonKey || !serviceKey) {
      return json({ error: "Account status management is not configured. No change was made." }, 500);
    }

    const token = authorization.slice("Bearer ".length).trim();
    const publicClient = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: authData, error: authError } = await publicClient.auth.getUser(token);
    const user = authData?.user;
    if (authError || !user?.id) {
      return json({ error: "Your session has expired. Please sign in again." }, 401);
    }

    let body: { action?: string };
    try { body = await req.json(); } catch { return json({ error: "Invalid request." }, 400); }
    if (body.action !== "deactivate" && body.action !== "reactivate") {
      return json({ error: "Choose deactivate or reactivate." }, 400);
    }

    const admin = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const deactivatedAt = body.action === "deactivate" ? new Date().toISOString() : null;
    const { data, error } = await admin
      .from("profiles")
      .update({ deactivated_at: deactivatedAt })
      .eq("id", user.id)
      .select("id,deactivated_at")
      .maybeSingle();

    if (error) {
      console.error("Could not update account status:", error.message);
      return json({ error: "TikNation could not update your account status. Please try again." }, 500);
    }
    if (!data) {
      return json({ error: "Your profile could not be found. Please contact TikNation support before trying again." }, 404);
    }

    return json({
      success: true,
      deactivated: data.deactivated_at !== null,
      message: data.deactivated_at
        ? "Your account is deactivated. Your profile and published posts are hidden from public discovery."
        : "Your account is active again. Your profile and published posts can appear publicly.",
    });
  } catch (error) {
    console.error("Account status request failed:", error);
    return json({ error: "Something went wrong. No account status change was confirmed." }, 500);
  }
});