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

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function isValidDateOnly(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T00:00:00.000Z");
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function ageAtUtcToday(dateOnly: string): number {
  const dob = new Date(dateOnly + "T00:00:00.000Z");
  const today = new Date();
  let age = today.getUTCFullYear() - dob.getUTCFullYear();
  const birthdayHasNotOccurred =
    today.getUTCMonth() < dob.getUTCMonth() ||
    (today.getUTCMonth() === dob.getUTCMonth() && today.getUTCDate() < dob.getUTCDate());
  if (birthdayHasNotOccurred) age--;
  return age;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);

  const origin = req.headers.get("Origin");
  if (origin && origin !== "https://goofytechwiz.github.io") return json({ error: "Origin not allowed." }, 403);

  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return json({ error: "Sign in to complete the age check." }, 401);

  const url = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !anonKey || !serviceKey) return json({ error: "Age-check service is not configured." }, 503);

  try {
    const token = authorization.slice("Bearer ".length).trim();
    const authClient = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: authData, error: authError } = await authClient.auth.getUser(token);
    const user = authData?.user;
    if (authError || !user) return json({ error: "Your session is invalid or expired." }, 401);

    let body: Record<string, unknown>;
    try {
      const parsed = await req.json();
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return json({ error: "Invalid request." }, 400);
      body = parsed as Record<string, unknown>;
    } catch {
      return json({ error: "Invalid request." }, 400);
    }

    const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: existing, error: lookupError } = await admin
      .from("tiknation_age_assurance")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (lookupError) {
      console.error("Age-assurance lookup failed:", lookupError.code ?? "unknown");
      return json({ error: "We couldn't verify your age status. Please try again." }, 500);
    }

    if (body.action === "status") return json({ age_check_complete: !!existing });
    if (body.action !== "submit") return json({ error: "Unknown age-check action." }, 400);
    if (existing) return json({ age_check_complete: true, message: "Your age check is already complete." });

    const dob = body.date_of_birth;
    if (!isValidDateOnly(dob)) return json({ error: "Enter a valid date of birth." }, 400);
    if (dob > new Date().toISOString().slice(0, 10)) return json({ error: "Enter a valid date of birth." }, 400);

    const age = ageAtUtcToday(dob);
    if (age < 13) {
      return json({
        error: "TikNation is for people aged 13 and older. This account cannot continue without meeting the minimum age requirement.",
        under_minimum_age: true,
      }, 403);
    }

    const rateKey = await sha256("tiknation-age-check:" + user.id);
    const { data: rateData, error: rateError } = await admin.rpc("tiknation_check_login_rate_limit", {
      p_key_hash: rateKey,
      p_max_attempts: 5,
      p_window_seconds: 1800,
    });
    if (rateError || !rateData) {
      console.error("Age-check rate limit failed:", rateError?.code ?? "unknown");
      return json({ error: "We couldn't complete the age check safely. Please try again later." }, 503);
    }

    // Postgres table-returning RPCs commonly return an array of rows.
    // Normalize the result before checking the limiter's allowed flag.
    const rateRow = Array.isArray(rateData) ? rateData[0] : rateData;
    if (rateRow?.allowed !== true) {
      return json({ error: "Too many age-check attempts. Please wait before trying again." }, 429);
    }

    const { error: insertError } = await admin
      .from("tiknation_age_assurance")
      .insert({ user_id: user.id, date_of_birth: dob });

    if (insertError) {
      if (insertError.code === "23505") return json({ age_check_complete: true });
      console.error("Age-assurance insert failed:", insertError.code ?? "unknown");
      return json({ error: "We couldn't save your age check. Please try again." }, 500);
    }

    return json({ age_check_complete: true });
  } catch {
    return json({ error: "We couldn't complete the age check. Please try again." }, 400);
  }
});