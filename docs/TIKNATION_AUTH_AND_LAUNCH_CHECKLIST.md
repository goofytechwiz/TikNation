# TikNation Authentication and Launch Verification

Checked: 2026-11-09  
Repository: `goofytechwiz/TikNation`  
Production project: `mekzfezaefcimxncklfj`  
Scope: current GitHub source, deployed Supabase Edge Function source/metadata, read-only production SQL checks, and launch-plan review. No account passwords, reset links, auth tokens, or secret values were accessed.

## Executive result

**Email and username sign-in are both implemented in the existing account experience, but neither has been tested end-to-end with a real user account in this review. Do not mark username login launch-ready yet.**

The current public entry point redirects from `index.html` to `next/`. The new `next/` experience is a preview and does not contain Supabase Auth sign-in/signup code. The existing authentication UI is still in `legacy.html`. To keep that working account path discoverable without rewriting it, the new home page now includes a **Sign in or Create Account** link to `../legacy.html`. The GitHub change is saved; public Pages deployment still needs a browser check.

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
