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

const genericSuccess = () => json({
  message: "If an account matches that email, username recovery instructions will be sent.",
});

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "POST requests only." }, 405);

  const origin = req.headers.get("origin");
  if (origin && origin !== "https://goofytechwiz.github.io") {
    return json({ error: "This origin is not allowed." }, 403);
  }

  try {
    const body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return json({ error: "Invalid recovery request." }, 400);
    }

    const action = typeof body.action === "string" ? body.action : "";
    if (action === "login") {
      return json({ error: "Use the protected sign-in service for account access." }, 410);
    }
    if (action !== "forgot_username") return json({ error: "Unknown recovery action." }, 400);

    const identifier = typeof body.identifier === "string" ? body.identifier.trim() : "";
    if (!identifier || identifier.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
      return json({ error: "Enter the email address registered to your TikNation account." }, 400);
    }

    const url = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = Deno.env.get("RECOVERY_FROM_EMAIL");
    if (!url || !serviceKey) return json({ error: "Recovery is temporarily unavailable." }, 503);
    if (!resendKey || !fromEmail) {
      return json({ error: "Username recovery email is not configured yet. Please contact TikNation Support." }, 503);
    }

    const normalizedEmail = identifier.toLowerCase();
    const clientIp = req.headers.get("cf-connecting-ip")?.trim()
      || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || "unknown";
    const admin = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const emailHash = await sha256("username-recovery-email:" + normalizedEmail);
    const ipHash = await sha256("username-recovery-ip:" + clientIp);
    const [emailLimit, ipLimit] = await Promise.all([
      admin.rpc("tiknation_check_login_rate_limit", {
        p_key_hash: emailHash,
        p_max_attempts: 4,
        p_window_seconds: 1800,
      }),
      admin.rpc("tiknation_check_login_rate_limit", {
        p_key_hash: ipHash,
        p_max_attempts: 15,
        p_window_seconds: 900,
      }),
    ]);

    if (emailLimit.error || ipLimit.error) {
      console.error("Username recovery rate limit could not be checked.");
      return json({ error: "Recovery is temporarily unavailable. Please try again later." }, 503);
    }
    if (emailLimit.data?.[0]?.allowed !== true || ipLimit.data?.[0]?.allowed !== true) {
      return json({ error: "Too many recovery requests. Please wait before trying again." }, 429);
    }

    let matchedUser: { id: string; email?: string } | null = null;
    for (let page = 1; page <= 100; page++) {
      const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
      if (error) {
        console.error("Username recovery account lookup failed:", error.message);
        return json({ error: "Recovery is temporarily unavailable. Please try again later." }, 503);
      }
      matchedUser = data.users.find(
        (user) => user.email?.toLowerCase() === normalizedEmail,
      ) ?? null;
      if (matchedUser || data.users.length < 1000) break;
    }

    if (!matchedUser?.email) return genericSuccess();

    const { data: profile, error: profileError } = await admin
      .from("profiles")
      .select("username")
      .eq("id", matchedUser.id)
      .maybeSingle();

    if (profileError || !profile?.username) {
      if (profileError) console.error("Username recovery profile lookup failed:", profileError.message);
      return genericSuccess();
    }

    const mailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [matchedUser.email],
        subject: "Your TikNation username reminder",
        text: `You requested a reminder of your TikNation username. Your username is @${profile.username}. If you did not request this, you can ignore this email.`,
      }),
    });

    if (!mailResponse.ok) {
      const details = await mailResponse.text().catch(() => "");
      console.error("TikNation username recovery email failed:", mailResponse.status, details.slice(0, 300));
      return json({ error: "We couldn't send the recovery email right now. Please try again later." }, 503);
    }

    return genericSuccess();
  } catch (error) {
    console.error("TikNation username recovery failed:", error instanceof Error ? error.message : "unknown error");
    return json({ error: "Recovery is temporarily unavailable. Please try again later." }, 500);
  }
});
