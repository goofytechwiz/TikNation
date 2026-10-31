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

const ADMIN_EMAIL = "tiknationstudio@gmail.com";

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);

  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return json({ error: "Sign in with the TikNation administrator account." }, 401);
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

    // Verify the access-token claims and require a completed second factor for
    // every Command Center action, including moderator actions.
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
    if (claimsError || claimsData?.claims?.aal !== "aal2") {
      return json({ error: "For security, complete authenticator verification before using the Command Center." }, 403);
    }

    // Roles are determined only from the verified Auth user and server-side role table.
    const isAdmin = (user.email ?? "").trim().toLowerCase() === ADMIN_EMAIL;

    let body: Record<string, unknown>;
    try {
      const parsed = await req.json();
      if (!isRecord(parsed)) return json({ error: "Invalid request." }, 400);
      body = parsed;
    } catch {
      return json({ error: "Invalid request." }, 400);
    }

    const adminClient = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const action = body.action;
    const { data: moderatorRole, error: roleError } = await adminClient
      .from("moderator_roles")
      .select("user_id")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .maybeSingle();
    if (roleError) {
      console.error("Moderator role lookup failed:", roleError.code ?? "unknown");
      return json({ error: "Permissions could not be checked. Please try again." }, 500);
    }
    const isModerator = !!moderatorRole;
    if (!isAdmin && !isModerator) return json({ error: "Moderator or administrator access required." }, 403);

    if (action === "list") {
      const [applicationsResult, reportsResult, liveReportsResult, feedbackResult] = await Promise.all([
        isAdmin
          ? adminClient.from("verification_applications")
              .select("id,created_at,username,category,presence,reason,supporting_links,status")
              .order("created_at", { ascending: false }).limit(100)
          : Promise.resolve({ data: [], error: null }),
        adminClient.from("content_reports")
          .select("id,created_at,reporter_id,target_type,target_id,target_user_id,reason,details,status")
          .order("created_at", { ascending: false }).limit(200),
        adminClient.from("live_stream_reports")
          .select("id,session_id,reporter_id,reason,details,status,created_at,reviewed_by,reviewed_at")
          .order("created_at", { ascending: false }).limit(200),
        isAdmin
          ? adminClient.from("beta_feedback")
              .select("id,created_at,user_id,feedback_type,message")
              .order("created_at", { ascending: false }).limit(200)
          : Promise.resolve({ data: [], error: null }),
      ]);

      if (applicationsResult.error || reportsResult.error || liveReportsResult.error || feedbackResult.error) {
        console.error("Command Center list failed:", applicationsResult.error?.code ?? reportsResult.error?.code ?? liveReportsResult.error?.code ?? feedbackResult.error?.code ?? "unknown");
        return json({ error: "Command Center data could not be loaded. Please try again." }, 500);
      }
      const combinedReports = [
        ...(reportsResult.data ?? []).map((report) => ({ ...report, report_source: "content" })),
        ...(liveReportsResult.data ?? []).map((report) => ({
          id: report.id, created_at: report.created_at, reporter_id: report.reporter_id,
          target_type: "livestream", target_id: report.session_id, target_user_id: null,
          reason: report.reason, details: report.details, status: report.status, report_source: "live",
        })),
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      return json({
        success: true,
        role: isAdmin ? "admin" : "moderator",
        applications: applicationsResult.data ?? [],
        reports: combinedReports,
        feedback: feedbackResult.data ?? [],
      });
    }

    if (action === "review_verification") {
      if (!isAdmin) return json({ error: "Only the Founder can review verification applications." }, 403);
      const applicationId = typeof body.application_id === "string" ? body.application_id.trim() : "";
      const status = body.status;
      if (!applicationId || !["verified", "rejected"].includes(String(status))) {
        return json({ error: "Invalid verification review request." }, 400);
      }

      const { data, error } = await adminClient
        .from("verification_applications")
        .update({ status })
        .eq("id", applicationId)
        .eq("status", "pending")
        .select("id,status")
        .maybeSingle();

      if (error) {
        console.error("Verification review failed:", error.code ?? "unknown");
        return json({ error: "The application could not be updated. Please try again." }, 500);
      }
      if (!data) return json({ error: "This application is no longer pending. Refresh the list and try again." }, 409);
      return json({ success: true, application: data });
    }

    if (action === "review_report") {
      const reportId = typeof body.report_id === "string" ? body.report_id.trim() : "";
      const status = body.status;
      const source = body.report_source === "live" ? "live" : "content";
      if (!reportId || !["pending", "reviewed", "dismissed", "action_taken"].includes(String(status))) {
        return json({ error: "Invalid report review request." }, 400);
      }

      const table = source === "live" ? "live_stream_reports" : "content_reports";
      const selectColumns = source === "live" ? "id,session_id,reason,details" : "id,target_id,reason,details";
      const { data: existing, error: existingError } = await adminClient
        .from(table).select(selectColumns).eq("id", reportId).maybeSingle();
      if (existingError) {
        console.error("Report lookup failed:", existingError.code ?? "unknown");
        return json({ error: "The report could not be loaded. Please try again." }, 500);
      }
      if (!existing) return json({ error: "This report could not be found." }, 404);

      const targetId = "session_id" in existing ? existing.session_id : existing.target_id;
      const testRecord = String(targetId ?? "").toUpperCase().startsWith("ADMIN-TEST-")
        || String(existing.reason ?? "").toUpperCase().includes("TEST ONLY")
        || String(existing.details ?? "").toUpperCase().includes("TEST ONLY");
      if (testRecord) return json({ error: "Test records cannot receive moderation actions." }, 400);

      const { data, error } = await adminClient.from(table)
        .update({ status, reviewed_by: user.id, reviewed_at: new Date().toISOString() })
        .eq("id", reportId).select("id,status").maybeSingle();
      if (error) {
        console.error("Report review failed:", error.code ?? "unknown");
        return json({ error: "The report could not be updated. Please try again." }, 500);
      }
      if (!data) return json({ error: "This report could not be updated. Refresh the list and try again." }, 409);
      const { error: auditError } = await adminClient.from("moderation_audit").insert({
        actor_id: user.id, action: "report_status_changed",
        target_type: source === "live" ? "livestream_report" : "content_report",
        target_id: reportId, details: { status, reason: existing.reason, target_id: targetId },
      });
      if (auditError) {
        console.error("Moderation audit write failed:", auditError.code ?? "unknown");
        return json({ error: "The report was updated, but the audit record failed. Please contact the Founder." }, 500);
      }
      return json({ success: true, report: data });
    }

    if (action === "set_moderator") {
      if (!isAdmin) return json({ error: "Only the Founder can manage moderators." }, 403);
      const moderatorEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
      const active = body.active;
      if (!moderatorEmail || !moderatorEmail.includes("@") || typeof active !== "boolean") {
        return json({ error: "Provide a valid account email and an active true/false value." }, 400);
      }
      const { data: userPage, error: usersError } = await adminClient.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (usersError) return json({ error: "TikNation accounts could not be searched right now." }, 500);
      const targetUser = userPage.users.find((candidate) => (candidate.email ?? "").trim().toLowerCase() === moderatorEmail);
      if (!targetUser || targetUser.id === user.id) return json({ error: "That account could not be found, or cannot be assigned this role." }, 404);
      const moderatorUserId = targetUser.id;
      let result;
      if (active) {
        result = await adminClient.from("moderator_roles").upsert({
          user_id: moderatorUserId, role: "moderator", is_active: true,
          created_by: user.id, disabled_at: null,
        }, { onConflict: "user_id" }).select("user_id,role,is_active,created_at").single();
      } else {
        result = await adminClient.from("moderator_roles").update({
          is_active: false, disabled_at: new Date().toISOString(),
        }).eq("user_id", moderatorUserId).select("user_id,role,is_active,created_at").maybeSingle();
      }
      if (result.error) {
        console.error("Moderator role update failed:", result.error.code ?? "unknown");
        return json({ error: "The moderator role could not be updated." }, 500);
      }
      const { error: auditError } = await adminClient.from("moderation_audit").insert({
        actor_id: user.id, action: active ? "moderator_added" : "moderator_removed",
        target_type: "user", target_id: moderatorUserId, details: { active },
      });
      if (auditError) {
        console.error("Moderator audit write failed:", auditError.code ?? "unknown");
        return json({ error: "The role changed, but its audit record failed. Please contact the Founder." }, 500);
      }
      return json({ success: true, moderator: result.data ?? { user_id: moderatorUserId, is_active: false } });
    }


    if (action === "recovery_search") {
      if (!isAdmin) return json({ error: "Only the Founder can use Account Recovery." }, 403);
      const query = typeof body.query === "string" ? body.query.trim().replace(/^@/, "") : "";
      if (query.length < 2 || query.length > 120) return json({ error: "Enter at least 2 characters to search." }, 400);
      const { data: page, error: usersError } = await adminClient.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (usersError) return json({ error: "Accounts could not be searched right now." }, 500);
      const q = query.toLowerCase();
      const matches = page.users.filter((candidate) =>
        (candidate.email ?? "").toLowerCase().includes(q)
        || (candidate.user_metadata?.username ?? "").toString().toLowerCase().includes(q)
        || candidate.id.toLowerCase() === q
      ).slice(0, 25);
      const ids = matches.map((candidate) => candidate.id);
      const profilesResult = ids.length
        ? await adminClient.from("profiles").select("id,username,display_name,deactivated_at").in("id", ids)
        : { data: [], error: null };
      if (profilesResult.error) return json({ error: "Account profile details could not be loaded." }, 500);
      const profiles = new Map((profilesResult.data ?? []).map((p) => [p.id, p]));
      return json({ success: true, accounts: matches.map((candidate) => {
        const p = profiles.get(candidate.id);
        return { id: candidate.id, email: candidate.email ?? "", username: p?.username ?? candidate.user_metadata?.username ?? "",
          display_name: p?.display_name ?? "", deactivated_at: p?.deactivated_at ?? null,
          banned_until: candidate.banned_until ?? null, created_at: candidate.created_at ?? null,
          last_sign_in_at: candidate.last_sign_in_at ?? null };
      }) });
    }

    if (action === "list_appeals") {
      if (!isAdmin) return json({ error: "Only the Founder can review account appeals." }, 403);
      const { data, error } = await adminClient.from("account_appeals")
        .select("id,user_id,username,contact_email,appeal_type,reason,status,founder_notes,created_at,reviewed_at")
        .order("created_at", { ascending: false }).limit(100);
      if (error) {
        console.error("Appeal list failed:", error.code ?? "unknown");
        return json({ error: "Account appeals could not be loaded." }, 500);
      }
      return json({ success: true, appeals: data ?? [] });
    }

    if (action === "review_appeal") {
      if (!isAdmin) return json({ error: "Only the Founder can review account appeals." }, 403);
      const appealId = typeof body.appeal_id === "string" ? body.appeal_id.trim() : "";
      const status = body.status;
      const notes = typeof body.founder_notes === "string" ? body.founder_notes.trim().slice(0, 2000) : "";
      if (!appealId || !["approved", "denied", "needs_information"].includes(String(status))) {
        return json({ error: "Choose a valid appeal decision." }, 400);
      }
      const { data, error } = await adminClient.from("account_appeals").update({
        status, founder_notes: notes || null, reviewed_by: user.id, reviewed_at: new Date().toISOString()
      }).eq("id", appealId).eq("status", "pending")
        .select("id,user_id,status,appeal_type").maybeSingle();
      if (error) return json({ error: "The appeal decision could not be saved." }, 500);
      if (!data) return json({ error: "This appeal is no longer pending. Refresh the list." }, 409);
      const { error: auditError } = await adminClient.from("moderation_audit").insert({
        actor_id: user.id, action: "account_appeal_reviewed", target_type: "account_appeal",
        target_id: appealId, details: { status, appeal_type: data.appeal_type, user_id: data.user_id }
      });
      if (auditError) return json({ error: "Decision saved, but audit logging failed. Contact the Founder before proceeding further." }, 500);
      return json({ success: true, appeal: data });
    }


    if (action === "reactivate_account") {
      if (!isAdmin) return json({ error: "Only the Founder can reactivate another account." }, 403);
      const targetId = typeof body.user_id === "string" ? body.user_id.trim() : "";
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(targetId)) {
        return json({ error: "Choose a valid account." }, 400);
      }
      const { data: target, error: targetError } = await adminClient.auth.admin.getUserById(targetId);
      if (targetError || !target.user) return json({ error: "Account not found. Permanently deleted accounts cannot be restored here." }, 404);
      const { data: profile, error: profileError } = await adminClient.from("profiles")
        .update({ deactivated_at: null }).eq("id", targetId).not("deactivated_at", "is", null)
        .select("id").maybeSingle();
      if (profileError) return json({ error: "The account could not be reactivated." }, 500);
      if (!profile) return json({ error: "This account is not marked as deactivated, or it has no profile to restore." }, 409);
      const { error: auditError } = await adminClient.from("moderation_audit").insert({
        actor_id: user.id, action: "account_reactivated_by_founder", target_type: "user",
        target_id: targetId, details: { email: target.user.email ?? null }
      });
      if (auditError) return json({ error: "Account reactivated, but audit logging failed. Contact the Founder." }, 500);
      return json({ success: true, message: "Account reactivated. The creator can sign in again." });
    }

    return json({ error: "Unsupported Command Center action." }, 400);
  } catch {
    return json({ error: "The request could not be completed. Please try again." }, 400);
  }
});
