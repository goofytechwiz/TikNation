# TikNation Authentication and Launch Verification

Checked: 2026-11-16  
Repository: `goofytechwiz/TikNation`  
Production project: `mekzfezaefcimxncklfj`  
Scope: current GitHub source, deployed Supabase Edge Function source/metadata, read-only production SQL checks, and launch-plan review. No account passwords, reset links, auth tokens, or secret values were accessed.

## Executive result

**Email and username sign-in are both implemented in the existing account experience, but neither has been tested end-to-end with a real user account in this review. Do not mark username login launch-ready yet.**

The current public entry point redirects from `index.html` to `next/`. The new `next/` experience is a preview and does not contain Supabase Auth sign-in/signup code. The existing authentication UI is still in `legacy.html`. To keep that working account path discoverable without rewriting it, the new home page now includes a **Sign in / Join** link to `../legacy.html`. The GitHub change is saved; public Pages deployment still needs a browser check.

## 1. Current account creation and sign-in

### Signup

In `legacy.html`:

- Signup uses Supabase Auth `signUp` with an email address and password.
- The chosen username, display name, and self-reported date of birth are placed in signup user metadata.
- The form validates usernames as 3–24 characters using letters, numbers, periods, or underscores.
- A case-insensitive availability check runs before signup.
- After a signed-in session is available, `ensureProfile` creates the matching `profiles` row from the authenticated user's metadata when one does not already exist.
- Email confirmation may be required by the project's Auth settings; the confirmation flow was not exercised in this review.
- Phone signup remains disabled/coming soon; no paid SMS provider was added.

### Sign-in

The same sign-in field is labelled **Email or username**. The browser invokes the deployed `tiknation-username-login` Edge Function with `identifier` and `password`.

The deployed function:

1. Treats an identifier containing `@` as an email and authenticates it with Supabase Auth `signInWithPassword`.
2. Otherwise validates the username format, performs a case-insensitive lookup in `public.profiles`, resolves the account email through the Admin Auth API, and then uses the same Supabase email/password authentication.
3. Returns the same generic invalid-credentials message for unknown usernames and incorrect passwords.
4. Applies rate limits to the normalized identifier, identifier-plus-network, and network hashes.
5. Records hashed security-event identifiers and returns the session tokens to the browser, which calls `setSession` and completes MFA/age-assurance checks.

**Meaning:** username login is a username-to-account-email lookup followed by normal password authentication. It is not a separate password store or separate authentication provider.

### Production checks completed

Read-only SQL against the current Supabase production database confirmed:

- The case-insensitive unique index exists: `profiles_username_lower_unique ON public.profiles (lower(username)) WHERE username IS NOT NULL`.
- There are **zero** case-insensitive duplicate username groups and **zero** blank/null username rows in the checked profile set.
- `public.tiknation_check_login_rate_limit(text, integer, integer)` exists.
- The rate-limit function is `SECURITY DEFINER` with an empty search path and schema-qualified table references.
- `anon` and `authenticated` cannot execute the rate-limit RPC; `service_role` can. This matches the Edge Function's service-role use.
- The deployed `tiknation-username-login` function is ACTIVE, version 9, with platform JWT verification disabled because it is a pre-authentication endpoint that performs credential verification internally.

The deployed username lookup escapes backslash, percent, and underscore before its case-insensitive `ilike` query. The database unique index prevents case-only duplicate usernames.

### Deployed/source drift to resolve carefully

The current GitHub copy of `supabase/functions/tiknation-username-login/index.ts` includes newer fallback handling for Supabase publishable/secret key environment-variable names. The deployed version 9 source still reads the legacy `SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` names only. The deployed function is active and its authentication logic supports both identifier types, but the two source copies are not identical.

Do **not** redeploy blindly: first confirm the required environment variables are present without exposing their values, then plan a controlled deployment and regression test. This review did not read secret values or change the deployed login function.

## 2. Password reset and username reminder

### Password reset

The existing `legacy.html` UI:

- Requests reset by **email address**, not username, using Supabase Auth `resetPasswordForEmail`.
- Sets the redirect to the current legacy page URL.
- Handles the `PASSWORD_RECOVERY` auth event and opens a new-password panel.
- Requires matching passwords of at least eight characters.
- Calls `supabaseClient.auth.updateUser({ password })`, then signs out and returns to sign-in.

The password-reset flow does not use `tiknation-account-recovery`; that Edge Function handles username reminders.

**Not verified:** actual email delivery, Supabase redirect-URL allowlisting, opening a real reset link, expired/reused token behavior, password update, and subsequent login. No real account was used.

### Username reminder

The UI invokes `tiknation-account-recovery` with `action: "forgot_username"` and an email address. The deployed function is ACTIVE, version 10, with platform JWT verification disabled for this pre-authentication request. It uses a generic success response, rate limits, and the existing Resend integration to send a username reminder to the registered address.

**Not verified:** Resend secrets/sender configuration or actual email delivery. Secret values were not read.

## 3. Mobile behavior

Static source inspection confirms:

- The legacy page has a mobile viewport declaration and responsive layout rules.
- The sign-in identifier input uses `autocomplete="username"`, no forced capitalization, and text input mode for username-or-email entry.
- The password field uses `autocomplete="current-password"`; new password fields use `autocomplete="new-password"`.
- Password visibility controls and responsive modal/form styling are present.
- The new `next/` landing page includes mobile styling and the new account-access link.

**Not verified:** real Android Chrome or iOS Safari interaction, mobile keyboard behavior, viewport/scrolling, autofill, email confirmation, or password-reset link handoff. A physical-device test is still required.

## 4. Required live authentication tests

- [ ] Existing account signs in using email + password.
- [ ] The same account signs in using username + password.
- [ ] Username lookup works case-insensitively, including usernames containing underscores or periods.
- [x] Production database has a case-insensitive unique username index and no current duplicate/blank username groups.
- [ ] Wrong password and unknown username produce the same generic public error.
- [ ] Rate limits return controlled 429 responses and do not unexpectedly block unrelated users.
- [ ] Existing account receives a password-reset email.
- [ ] Reset link opens the legacy account page in recovery mode and allows a new password.
- [ ] Expired/reused reset links fail safely.
- [ ] Username reminder returns a generic response and sends only to the registered email when the existing mail configuration is available.
- [ ] Desktop browser tests for email login, username login, signup/confirmation, and recovery.
- [ ] Android Chrome and iOS Safari tests for keyboard, viewport, focus, scrolling, autofill, login, and recovery.

Never ask a user to share passwords, reset links, or authentication tokens for these tests. A real-account test must be performed by the account owner in their own browser.

## 5. Security review

The current Supabase security advisor reports:

- **Leaked-password protection is disabled.** Enable it in Supabase Auth → Security and Protection using the [Supabase password-security guidance](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).
- **16 tables have RLS enabled but no policies.** The findings include private rate-limit/security-event, moderation, support, and age-assurance tables. Some are designed for trusted server-side access only. Review table-by-table and do not add broad client policies merely to clear the informational warning.

No broad RLS policy was added in this review.

## 6. Livestreaming status

Production metadata confirms the `tiknation-live` Edge Function is ACTIVE, version 23, with JWT verification enabled. The repository contains a Live page and LiveKit-backed server integration.

The maintained `docs/TIKNATION_LIVE_TEST_PLAN.md` still has release blockers, including real broadcaster/viewer browser tests, token refresh beyond 10 minutes, reconnect after network loss, camera-permission denial, startup cleanup, throttling, actual published-origin verification, and LiveKit runtime/SDK compatibility.

**Status: livestream infrastructure exists, but a successful end-to-end broadcast has not been verified. Keep it invite-only/experimental and do not describe it as launch-ready.**

## 7. Gifts, payouts, and creator/viewer fairness

- The gift system and Creator Wallet label balances as test coins only, with no cash value.
- The Creator Wallet is a prototype, not a real-money ledger or payout service.
- PayPal, Cash App, Venmo, bank transfer, and eligible debit card are proposed payout choices only. No payout method is connected.
- Real-money creator earnings and withdrawals are **not available**.
- Creator revenue split and final payout rules are **not finalized**.

Before real-money gifts or withdrawals are enabled, publish and enforce:

1. The viewer's actual purchase price, taxes, and fees before confirmation.
2. The creator/platform split and payment-processing deductions.
3. Supported countries, payout methods, creator eligibility, identity checks, minimum payout, and processing times.
4. Holds, refunds, chargebacks, negative balances, disputes, and appeals.
5. A transaction history and support path.
6. Clear separation of test coins from cash; test coins must never be represented as redeemable.
7. Mobile-friendly purchase confirmation and non-coercive gifting prompts.

## 8. Current beta recommendation

- Keep existing authentication code intact.
- Use the new home page's account-access link to reach the existing account system; verify the GitHub Pages deployment in a browser.
- Complete the real-account email, username, and password-recovery tests before declaring authentication ready.
- Reconcile deployed/source function drift only through a controlled deployment with rollback and regression checks.
- Keep Live experimental until its two-device and reconnect tests pass.
- Keep gifts explicitly test-only and cash-outs unavailable until real payment/payout infrastructure and fairness terms are implemented and tested.
- Continue using the current free GitHub Pages/Supabase setup where possible; do not add paid services for this review.

The original 2026-10-26 birthday launch date has passed. Use this document as a current beta-readiness checklist, not as evidence that the original birthday launch occurred or that all features are complete.


## 2026-11-16 recheck

### Current authentication path

- The root index.html still redirects to /next/. The new home page's account link now reads **Sign in / Join** and points to ../legacy.html. This is a navigation-only change; the existing authentication code was not replaced.
- The sign-in input in legacy.html is labelled **Email or username**. The browser calls tiknation-username-login with the identifier and password for either kind of identifier.
- The deployed function classifies an identifier containing @ as email; otherwise it validates a 3–24 character username, performs a case-insensitive exact lookup in profiles, resolves the Auth email by user ID, and calls Supabase signInWithPassword. Unknown usernames and wrong passwords receive the same generic error.
- Rate-limit thresholds in the deployed login function are 25 attempts per identifier/30 minutes, 8 per identifier-plus-network/15 minutes, and 60 per network/15 minutes. Identifier and network keys are SHA-256 hashed for rate limiting and security-event records.
- The deployed function is ACTIVE, version 9, with verify_jwt=false for this pre-authentication endpoint. Its handler validates credentials itself and applies rate limits. The rate-limit RPC exists in public, is SECURITY DEFINER with an empty search path, and is executable by service_role but not by anon or authenticated.

### Fresh production database checks

- auth.users: 3 accounts; public.profiles: 3 rows; all 3 account IDs match a profile; all 3 have username metadata; no account is missing a profile.
- There are zero blank usernames, zero case-insensitive duplicate groups, and zero deactivated profiles at the time of this check.
- The case-insensitive unique index remains present: profiles_username_lower_unique on lower(username) for non-null usernames.
- A read-only exact case-insensitive lookup check resolved every existing username to exactly one profile. None of the three current usernames contains an underscore or period, so those character cases were checked in source, not exercised against real account data.
- profiles RLS permits public reads of active profiles, inserts only where the authenticated user ID equals the profile ID, and updates only the user's own row. The login Edge Function uses the service role for its lookup.
- The profile row is created by the browser's ensureProfile flow after an authenticated session; there is no auth.users trigger that creates the public profile. Current production profile coverage is complete, but signup/profile creation still needs an end-to-end test.

### Password recovery and mobile checks

- Password reset is implemented separately from username reminder: the page calls Supabase resetPasswordForEmail with the legacy page as the redirect, handles PASSWORD_RECOVERY, updates the password with updateUser, then signs out and returns to sign-in.
- Username reminder uses the separate deployed tiknation-account-recovery function (ACTIVE, version 10); it is not the password-reset endpoint.
- Static syntax check: all 7 inline JavaScript blocks in legacy.html parsed successfully. All 3 inline scripts in live.html parsed successfully when its module's top-level await was checked in an async-module wrapper. This is syntax validation, not browser execution.
- Mobile source includes a viewport declaration, responsive breakpoints, a modal sized to the available width, and username/current-password/new-password autocomplete hints. The identifier input uses inputmode=email; verify the mobile keyboard still makes underscore entry comfortable for usernames.
- **Still not tested:** a real account's email login, username login, password-reset email delivery, reset-link allowlisting and handoff, password update, wrong-password/unknown-username response, rate-limit behavior, Android Chrome, and iOS Safari. No user password, reset link, auth token, or mailbox was accessed. GitHub Pages could not be independently opened by the browser check, so the latest deployment is also unverified.

### Deployment drift and signup edge case

- The GitHub copies of tiknation-username-login and tiknation-account-recovery include newer Supabase publishable/secret-key environment-variable fallbacks that are absent from the currently deployed versions. The deployed versions still use the legacy SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY variables. No secret values were read and no Edge Function was redeployed; keep the active functions intact until their environment configuration is confirmed and a rollback/regression test is planned.
- The signup availability query runs under the public profile-read policy, which hides deactivated profiles, while the unique index continues reserving their usernames. There are currently zero deactivated profiles, so this does not affect the checked accounts. Before deactivation/re-registration becomes common, add a server-side username-availability check so signup does not miss a reserved username and then fail at profile insertion.

### Live, gifts, fairness, and launch status

- tiknation-live is ACTIVE, version 23, with JWT verification enabled. Its source uses the LiveKit server SDK and requires LIVEKIT_URL, LIVEKIT_API_KEY, and LIVEKIT_API_SECRET. The live.html client dynamically loads livekit-client@2, requests local camera/microphone tracks, and contains start/join/end, guest, chat, moderation, and report flows.
- Production currently has 55 live_sessions rows, all with status ended; there are no active sessions at the time of the query. This does not prove that media was successfully published or viewed. The new next/live-worlds page is explicitly a local visual preview, not a broadcast or connected chat. No two-device end-to-end broadcast/reconnect test has passed in this review.
- tiknation-gifts is ACTIVE, version 33. Its balance endpoint returns currency TEST and cash value 0. The Creator Wallet is a prototype; PayPal, Cash App, Venmo, bank transfer, and debit card are proposed display choices only. No payout-specific Edge Function/provider connection was found in the active function list. **Real-money creator earnings and withdrawals are not available.**
- Fairness safeguards visible in source include age assurance (13+ for Live use and 16+ to start a broadcast), optional follower-only chat while public viewing remains open, creator chat moderation, and report flows. These controls still need real-account and two-device tests. Viewer purchase pricing, creator/platform split, fees, refunds, chargebacks, withdrawal minimums, processing times, and appeals must be published before real-money gifts are enabled.
- Current security advisors still report leaked-password protection disabled and 16 RLS-enabled tables without policies. Review those tables individually; do not add broad policies to server-only tables. Performance advisors report 14 unindexed foreign keys, 29 RLS init-plan warnings, 26 unused indexes, 3 multiple-permissive-policy warnings, and 1 duplicate-index warning.
- No paid service was added during this recheck. Continue using the current GitHub Pages/Supabase setup where possible and review existing LiveKit/Resend quotas before wider release.

**Final status:** email and username sign-in are both implemented in source and the deployed pre-auth function, but neither is marked tested or launch-ready until the same real account passes both paths. Password recovery is implemented but unverified. Mobile behavior is statically responsive but not device-tested. Live remains experimental/unverified, and real-money payouts remain unavailable.
