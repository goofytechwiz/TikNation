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

function decodeClaims(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=")));
  } catch {
    return null;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "POST requests only." }, 405);

  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return json({ error: "Please sign in again before deleting your account." }, 401);
  }

  try {
    const url = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !anonKey || !serviceKey) {
      return json({ error: "Account deletion is not configured yet. No account was deleted." }, 500);
    }

    const token = authorization.slice("Bearer ".length).trim();
    const publicClient = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: authData, error: authError } = await publicClient.auth.getUser(token);
    const user = authData?.user;
    if (authError || !user?.id || !user.email) {
      return json({ error: "Your session is invalid or expired. Sign in again and retry." }, 401);
    }

    let body: Record<string, unknown>;
    try {
      const parsed = await req.json();
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return json({ error: "Invalid deletion request." }, 400);
      }
      body = parsed as Record<string, unknown>;
    } catch {
      return json({ error: "Invalid deletion request." }, 400);
    }

    const password = typeof body.password === "string" ? body.password : "";
    if (body.confirmation !== "DELETE" || password.length < 1 || password.length > 1024) {
      return json({ error: "Type DELETE and enter your current password to confirm." }, 400);
    }

    const claims = decodeClaims(token);
    const verifiedFactors = (user.factors ?? []).filter((factor) => factor.status === "verified");
    if (verifiedFactors.length > 0 && claims?.aal !== "aal2") {
      return json({ error: "This account has two-factor authentication. Complete your authenticator check first, then retry account deletion." }, 403);
    }

    const { error: passwordError } = await publicClient.auth.signInWithPassword({
      email: user.email,
      password,
    });
    if (passwordError) {
      return json({ error: "The password was not accepted. Your account has not been deleted." }, 401);
    }

    const admin = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: profile } = await admin
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .maybeSingle();

    // Remove user-owned Storage objects first; Supabase Auth refuses to delete
    // users who still own Storage objects. If cleanup fails, stop before deleting Auth.
    const ownedObjects: { bucket_id: string; name: string }[] = [];
    for (let start = 0; ; start += 500) {
      const { data, error } = await admin
        .schema("storage")
        .from("objects")
        .select("bucket_id,name")
        .eq("owner_id", user.id)
        .range(start, start + 499);
      if (error) {
        console.error("Account deletion storage lookup failed:", error.code);
        return json({ error: "We couldn't safely prepare your uploaded files for deletion. No account was deleted; please contact TikNation support." }, 500);
      }
      ownedObjects.push(...(data ?? []));
      if (!data || data.length < 500) break;
    }

    const grouped = new Map<string, string[]>();
    for (const object of ownedObjects) {
      if (!object.bucket_id || !object.name) continue;
      const names = grouped.get(object.bucket_id) ?? [];
      names.push(object.name);
      grouped.set(object.bucket_id, names);
    }
    for (const [bucket, names] of grouped) {
      for (let start = 0; start < names.length; start += 100) {
        const { error } = await admin.storage.from(bucket).remove(names.slice(start, start + 100));
        if (error) {
          console.error("Account deletion storage removal failed:", error.name);
          return json({ error: "We couldn't safely remove all of your uploaded files. Your account has not been deleted; please try again later." }, 500);
        }
      }
    }

    // Clear restrictive optional references before Auth deletion.
    await admin.from("battle_matches").update({ current_turn: null }).eq("current_turn", user.id);
    await admin.from("battle_matches").update({ winner_id: null }).eq("winner_id", user.id);

    const { error: deleteError } = await admin.auth.admin.deleteUser(user.id);
    if (deleteError) {
      console.error("Account deletion failed:", deleteError.code ?? deleteError.name);
      return json({ error: "TikNation couldn't complete account deletion. Your sign-in account is still present; please contact support before retrying." }, 500);
    }

    // These older content tables intentionally do not have Auth foreign keys.
    await admin.from("creator_posts").delete().eq("user_id", user.id);
    await admin.from("profiles").delete().eq("id", user.id);
    if (profile?.username) {
      await admin.from("public_verified_creators").delete().eq("username", profile.username);
    }

    return json({ success: true, message: "Your TikNation account and associated account data have been deleted." });
  } catch (error) {
    console.error("Unexpected account deletion error:", error instanceof Error ? error.name : "unknown");
    return json({ error: "Something went wrong while deleting your account. Please try again or contact TikNation support." }, 500);
  }
});