# TikNation Authentication and Launch Verification

Checked: 2026-11-02  
Repository: `goofytechwiz/TikNation`  
Scope: source review and static checks only; no real account credentials or production secrets were used.

## Authentication findings

### Email and username sign-in

- The sign-in form accepts one identifier labelled **Email or username**.
- The browser calls the `tiknation-username-login` Edge Function for both identifier types.
- The function treats identifiers containing `@` as email addresses and passes them to Supabase Auth `signInWithPassword`.
- Other identifiers are validated against the 3–24 character username format, looked up case-insensitively in `public.profiles`, mapped to the account email, and then authenticated with Supabase Auth `signInWithPassword`.
- Invalid email/username and password responses are intentionally generic.
- The function applies identifier, identifier-plus-network, and network rate limits, and stores hashed security-event identifiers.
- The login and username-recovery functions now accept the legacy Supabase key environment variables or the newer publishable/secret key variables and `default` key maps, matching the compatibility pattern already used by the Live function.
- Its CORS allowlist is the GitHub Pages origin `https://goofytechwiz.github.io`.
- The login function calls `tiknation_check_login_rate_limit`; no definition for that RPC was found in the tracked migrations. It may exist from a dashboard/manual setup, but production availability and its counter semantics were not verified. The function fails closed with a 503 if the RPC call errors.

**Status:** Both paths are implemented in the checked-in source. Neither path has been verified with a real account in a browser during this check. Do not advertise username sign-in as launch-ready until both email and username sign-in pass live tests.

### Username uniqueness and lookup

- Signup performs a case-insensitive availability pre-check and validates allowed characters.
- Sign-in escapes SQL LIKE wildcard characters before using a case-insensitive username lookup.
- The checked-in migration history does not contain a database-level unique index on `lower(profiles.username)`. A signup pre-check alone cannot prevent two simultaneous signups from claiming case variants of the same username.
- Production database state was not queried during this check. Verify whether an equivalent unique index/constraint already exists before applying a migration; first inspect and resolve any existing case-insensitive duplicates.

**Status:** Lookup protections are present in source; database-enforced uniqueness remains unverified.

### Password recovery

- The sign-in page requests a reset email with Supabase Auth `resetPasswordForEmail`.
- The page handles the `PASSWORD_RECOVERY` auth event and shows a new-password form.
- The new password must be at least eight characters and match the confirmation field; the page then calls `updateUser({ password })`.
- The code requests reset instructions by email, not username.

**Status:** The browser flow is present and passed static JavaScript syntax checks. Actual email delivery, reset-link opening, token validation, password update, and subsequent sign-in have not been tested.

### Username reminder

- The page invokes `tiknation-account-recovery` before the user is signed in.
- The function uses a generic response to reduce account enumeration, applies rate limits, and sends the username reminder through the existing Resend integration.
- It requires the existing `RESEND_API_KEY` and `RECOVERY_FROM_EMAIL` secrets to be configured.
- Supabase Edge Functions require a valid JWT by default. This pre-authentication recovery endpoint therefore needs explicit JWT verification configuration. This repository's `supabase/config.toml` was updated on 2026-11-02 to set `verify_jwt = false` for this function. The setting is not confirmed deployed to the Supabase project.

**Status:** Source/config corrected in GitHub; deployment, email configuration, and delivery remain unverified. No new paid service was added.

## Static checks completed

- Extracted and parsed all seven inline JavaScript blocks in the current `index.html`; all passed syntax parsing.
- Confirmed the sign-in form uses username autocomplete and the current-password autocomplete hint.
- Confirmed the narrow-phone CSS rules are present, including a max-width 480px layout.
- These checks do not simulate a real browser, email provider, Supabase session, or physical phone.

## Required live authentication tests

- [ ] Existing account signs in with its email and password.
- [ ] The same account signs in with its username and password.
- [ ] Username lookup is case-insensitive and does not treat `_` or `%` as wildcard characters.
- [ ] Case-only duplicate usernames are rejected by a database-level unique constraint, including concurrent signup attempts.
- [ ] Wrong credentials and unknown identifiers return the same generic error.
- [ ] Login throttles return a controlled 429 and do not lock out unrelated users.
- [ ] Password-reset email arrives, link opens TikNation in recovery mode, and the new password can be used to sign in.
- [ ] Expired/reused reset links fail safely.
- [ ] Username reminder returns the generic response and sends only to the account's registered email when the existing email configuration is available.
- [ ] Android Chrome and iOS Safari: keyboard, viewport, focus, scrolling, autocomplete, sign-in, and reset-link handoff.
- [ ] Desktop browser: email, username, and password-recovery flows.

Do not ask anyone to share passwords, reset links, or authentication tokens for these tests.

## Launch-readiness and fairness

### Livestreaming

The repository contains a Live page and a LiveKit-backed Edge Function. The maintained Live test plan still lists real browser/device verification, reconnect/token refresh, permissions, moderation, authorization, and deployment checks as outstanding. It explicitly says no successful broadcast has been confirmed.

**Status: not verified for public launch.** Keep livestreaming labelled beta/testing or unavailable until the end-to-end checks pass.

### Gifts and creator earnings

- The gift UI explicitly labels gifts as **test coins only** and says test gifts have no cash value.
- The current Creator Wallet is a prototype, not a real funds ledger or payout system.
- PayPal, Cash App, Venmo, bank transfer, and eligible debit card are proposed choices only; none is a connected payout method.

**Status: real-money earnings and withdrawals are not available.**

### Creator/viewer fairness still to finalize before real-money gifts

- Show the viewer's actual purchase price and any taxes/fees before confirmation.
- Publish the creator/platform revenue split and payment-processing deductions before creators earn cash.
- Publish minimum payout, supported countries/methods, eligibility, verification, processing times, holds, refunds, chargebacks, and dispute/appeal rules.
- Keep test coins clearly separate from cash balances; never imply that test coins have a cash conversion value.
- Avoid pressure tactics and make gift prices and purchase confirmation understandable on mobile.

### Safety and operations

Complete moderator onboarding and response coverage, report escalation, account recovery support, privacy/retention review, and mobile accessibility checks before widening access.

## Date note

The original birthday launch target of 2026-10-26 has passed. As of this check (2026-11-02), use this document as a beta-readiness checklist rather than describing the original birthday launch as still upcoming.
