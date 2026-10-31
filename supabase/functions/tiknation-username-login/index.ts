import { createClient } from "npm:@supabase/supabase-js@2";

const allowedOrigin = "https://goofytechwiz.github.io";
const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
});

type LoginKind = "username" | "email";
type EventKind = "username_login_failed" | "username_login_succeeded" | "username_login_throttled"
  | "email_login_failed" | "email_login_succeeded" | "email_login_throttled";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.headers.get("origin") !== allowedOrigin) return json({ error: "Request not allowed." }, 403);
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);

  try {
    const url = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !anonKey || !serviceKey) {
      console.error("TikNation login server configuration is incomplete.");
      return json({ error: "Sign-in is temporarily unavailable. Please try again later." }, 503);
    }

    let body: Record<string, unknown>;
    try {
      const parsed = await req.json();
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return json({ error: "Enter your email or username and password." }, 400);
      }
      body = parsed as Record<string, unknown>;
    } catch {
      return json({ error: "Enter your email or username and password." }, 400);
    }

    const rawIdentifier = typeof body.identifier === "string" ? body.identifier
      : typeof body.username === "string" ? body.username : "";
    const identifier = rawIdentifier.trim();
    const password = typeof body.password === "string" ? body.password : "";
    const isEmail = identifier.includes("@");
    const kind: LoginKind = isEmail ? "email" : "username";
    const normalized = isEmail ? identifier.toLowerCase() : identifier.toLowerCase();

    if (!identifier || identifier.length > 254 || !password || password.length > 256 ||
        (isEmail ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier) : !/^[A-Za-z0-9_.]{3,24}$/.test(identifier))) {
      return json({ error: "Invalid email/username or password." }, 401);
    }

    const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const publicAuth = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });

    const forwardedIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const clientIp = req.headers.get("cf-connecting-ip")?.trim() || forwardedIp || "unknown";
    const hashKey = async (value: string) => {
      const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
      return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
    };
    const identifierHash = await hashKey(kind + ":" + normalized);
    const networkHash = await hashKey("ip:" + clientIp);
    const identifierIpHash = await hashKey(kind + "-ip:" + normalized + ":" + clientIp);

    async function recordSecurityEvent(eventType: EventKind, userId: string | null = null) {
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

    const failedEvent: EventKind = kind === "email" ? "email_login_failed" : "username_login_failed";
    const throttledEvent: EventKind = kind === "email" ? "email_login_throttled" : "username_login_throttled";
    const successEvent: EventKind = kind === "email" ? "email_login_succeeded" : "username_login_succeeded";

    const rateChecks = await Promise.all([
      admin.rpc("tiknation_check_login_rate_limit", {
        p_key_hash: identifierHash,
        p_max_attempts: 25,
        p_window_seconds: 1800,
      }),
      admin.rpc("tiknation_check_login_rate_limit", {
        p_key_hash: identifierIpHash,
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
      console.error("TikNation login rate-limit check failed.");
      return json({ error: "Sign-in is temporarily unavailable. Please try again shortly." }, 503);
    }
    if (rateChecks.some((result) => result.data?.[0]?.allowed !== true)) {
      await recordSecurityEvent(throttledEvent);
      return json({ error: "Too many sign-in attempts. Please wait before trying again." }, 429);
    }

    let email = identifier;
    let userId: string | null = null;
    if (kind === "username") {
      const exactUsernamePattern = identifier.replace(/([\\%_])/g, "\\$1");
      const { data: profile, error: profileError } = await admin
        .from("profiles")
        .select("id")
        .ilike("username", exactUsernamePattern)
        .maybeSingle();

      if (profileError || !profile?.id) {
        await recordSecurityEvent(failedEvent);
        return json({ error: "Invalid email/username or password." }, 401);
      }
      userId = profile.id;
      const { data: account, error: accountError } = await admin.auth.admin.getUserById(profile.id);
      if (accountError || !account?.user?.email) {
        await recordSecurityEvent(failedEvent);
        return json({ error: "Invalid email/username or password." }, 401);
      }
      email = account.user.email;
    }

    const { data: signedIn, error: signInError } = await publicAuth.auth.signInWithPassword({ email, password });
    if (signInError || !signedIn.session) {
      await recordSecurityEvent(failedEvent);
      return json({ error: "Invalid email/username or password." }, 401);
    }

    userId = signedIn.user?.id ?? userId;
    await recordSecurityEvent(successEvent, userId);

    return json({
      session: {
        access_token: signedIn.session.access_token,
        refresh_token: signedIn.session.refresh_token,
      },
    });
  } catch (error) {
    console.error("TikNation sign-in failed:", error instanceof Error ? error.message : "unknown error");
    return json({ error: "We couldn't sign you in right now. Please try again." }, 500);
  }
});
