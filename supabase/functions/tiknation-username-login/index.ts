import { createClient } from "npm:@supabase/supabase-js@2";

const allowedOrigin = "https://goofytechwiz.github.io";
const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.headers.get("origin") !== allowedOrigin) return json({ error: "Request not allowed." }, 403);
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);

  try {
    const url = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !anonKey || !serviceKey) {
      console.error("Username login server configuration is incomplete.");
      return json({ error: "Username sign-in is temporarily unavailable. Please use your email to sign in." }, 503);
    }

    let body: Record<string, unknown>;
    try {
      const parsed = await req.json();
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return json({ error: "Enter your username and password." }, 400);
      }
      body = parsed as Record<string, unknown>;
    } catch {
      return json({ error: "Enter your username and password." }, 400);
    }

    const username = typeof body.username === "string" ? body.username.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!/^[A-Za-z0-9_.]{3,24}$/.test(username) || !password || password.length > 256) {
      return json({ error: "Invalid username or password." }, 401);
    }

    const admin = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const publicAuth = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const forwardedIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const clientIp = req.headers.get("cf-connecting-ip")?.trim() || forwardedIp || "unknown";
    const hashKey = async (value: string) => {
      const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
      return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
    };
    const identifierHash = await hashKey("username:" + username.toLowerCase());
    const networkHash = await hashKey("ip:" + clientIp);
    const usernameIpHash = await hashKey("username-ip:" + username.toLowerCase() + ":" + clientIp);

    async function recordSecurityEvent(
      eventType: "username_login_failed" | "username_login_succeeded" | "username_login_throttled",
      userId: string | null = null,
    ) {
      try {
        const { error } = await admin.from("tiknation_security_events").insert({
          event_type: eventType,
          identifier_hash: identifierHash,
          network_hash: networkHash,
          user_id: userId,
        });
        if (error) console.error("TikNation security event could not be recorded:", error.code ?? "unknown");
      } catch {
        console.error("TikNation security event could not be recorded.");
      }
    }

    // Limit attempts by username, by username+network address, and by network address.
    // The username-only limit makes rotating IP addresses less effective; the combined
    // limits reduce the chance that one attacker can exhaust the global username budget.
    const rateChecks = await Promise.all([
      admin.rpc("tiknation_check_login_rate_limit", {
        p_key_hash: identifierHash,
        p_max_attempts: 25,
        p_window_seconds: 1800,
      }),
      admin.rpc("tiknation_check_login_rate_limit", {
        p_key_hash: usernameIpHash,
        p_max_attempts: 8,
        p_window_seconds: 900,
      }),
      admin.rpc("tiknation_check_login_rate_limit", {
        p_key_hash: networkHash,
        p_max_attempts: 60,
        p_window_seconds: 900,
      }),
    ]);

    if (rateChecks.some((result) => result.error)) {
      console.error("Username login rate-limit check failed.");
      return json({ error: "Username sign-in is temporarily unavailable. Please try again shortly." }, 503);
    }
    if (rateChecks.some((result) => result.data?.[0]?.allowed !== true)) {
      await recordSecurityEvent("username_login_throttled");
      return json({ error: "Too many sign-in attempts. Please wait before trying again." }, 429);
    }

    // Escape SQL ILIKE wildcards so usernames containing "_" match literally.
    // The format check above already excludes "%" and "\\", but keep escaping all pattern metacharacters.
    const exactUsernamePattern = username.replace(/([\\%_])/g, "\\$1");
    const { data: profile, error: profileError } = await admin
      .from("profiles")
      .select("id")
      .ilike("username", exactUsernamePattern)
      .maybeSingle();

    if (profileError || !profile?.id) {
      await recordSecurityEvent("username_login_failed");
      return json({ error: "Invalid username or password. You can also sign in with your email." }, 401);
    }

    const { data: account, error: accountError } = await admin.auth.admin.getUserById(profile.id);
    const email = account?.user?.email;
    if (accountError || !email) {
      await recordSecurityEvent("username_login_failed");
      return json({ error: "Invalid username or password. You can also sign in with your email." }, 401);
    }

    const { data: signedIn, error: signInError } = await publicAuth.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !signedIn.session) {
      await recordSecurityEvent("username_login_failed");
      return json({ error: "Invalid username or password. You can also sign in with your email." }, 401);
    }

    await recordSecurityEvent("username_login_succeeded", profile.id);

    return json({
      session: {
        access_token: signedIn.session.access_token,
        refresh_token: signedIn.session.refresh_token,
      },
    });
  } catch (error) {
    console.error("Username sign-in failed:", error instanceof Error ? error.message : "unknown error");
    return json({ error: "We couldn't sign you in right now. Please try again or use your email." }, 500);
  }
});