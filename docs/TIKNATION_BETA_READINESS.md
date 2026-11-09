# TikNation Beta Readiness

Last reviewed: 2026-11-09

## Current entry point and account access

- The root `index.html` redirects to `/next/`.
- The `next/` experience is a preview and does not yet contain the real Supabase Auth flow.
- The existing account system remains in `legacy.html`; the new `next/` home now links to it with **Sign in or Create Account**.
- Signup uses email + password and stores the chosen username in account metadata/profile data.
- The legacy sign-in form accepts either email or username. The deployed `tiknation-username-login` Edge Function resolves usernames to their account email and then uses Supabase Auth password authentication.
- Production database checks confirmed a case-insensitive unique username index and no current duplicate or blank username groups. The rate-limit RPC exists and is executable only by `service_role`.
- Username/email login, password-reset email delivery, and mobile flows have **not** been verified end-to-end with real accounts/devices. See [the detailed authentication checklist](TIKNATION_AUTH_AND_LAUNCH_CHECKLIST.md).

## Completed infrastructure (not equivalent to launch verification)

- Supabase project is currently reported ACTIVE_HEALTHY.
- `tiknation-username-login` is active (version 9; `verify_jwt=false` for its pre-authentication credential flow).
- `tiknation-account-recovery` is active (version 10; handles username reminders, not password reset).
- `tiknation-live` is active (version 23; JWT verification enabled).
- The gifts system uses test coins only. The Creator Wallet is a prototype and clearly states that test coins have no cash value and withdrawals are unavailable.
- No new paid service was added during this review.

## Required before wider beta

- [ ] Verify GitHub Pages deployment of the new home account-access link and open `legacy.html` in a real browser.
- [ ] Test existing-account email login and username login with the same account.
- [ ] Test signup email confirmation and profile creation.
- [ ] Test password-reset email, redirect allowlist, recovery link, password update, and subsequent login.
- [ ] Test username reminder delivery using the existing mail configuration.
- [ ] Test mobile login and recovery on Android Chrome and iOS Safari.
- [ ] Reconcile the deployed username-login function with the newer GitHub source only through a controlled deployment and regression test; do not replace working auth blindly.
- [ ] In Supabase Dashboard → Authentication → Security and Protection, enable leaked-password protection using the [Supabase guidance](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).
- [ ] Review the 16 RLS-enabled/no-policy advisor findings table by table. Keep server-only tables private; do not add broad policies just to silence the advisor.
- [ ] Test Live from two devices: approved creator starts, viewer joins, chat works, report submits, reconnect/token refresh works, and creator ends the stream.
- [ ] Confirm unapproved creators cannot start; viewers cannot publish or end someone else's stream; non-moderators cannot review reports.
- [ ] Verify camera permission denial, network loss, token refresh beyond 10 minutes, room cleanup, actual Pages origin, and LiveKit SDK/runtime compatibility.
- [ ] Test report/block, account recovery, and profile uploads on mobile and desktop.
- [ ] Confirm reduced-motion and autoplay preferences are respected.

## Creator/viewer fairness before real-money features

- [ ] Display the exact viewer purchase price, taxes, and fees before gift confirmation.
- [ ] Publish the creator/platform revenue split and processing deductions before creators earn cash.
- [ ] Publish supported payout methods/countries, eligibility, verification, minimum payout, processing times, holds, refunds, chargebacks, and dispute/appeal rules.
- [ ] Keep test coins separate from cash balances and never imply they can be redeemed.
- [ ] Keep purchase prompts clear and non-coercive, especially on mobile.

## Current limits

- Livestream backend infrastructure exists, but real broadcaster/viewer and reconnect tests remain outstanding. Keep Live invite-only/experimental until the two-device test passes.
- Real-money creator earnings and withdrawals are **not available**.
- PayPal, Cash App, Venmo, bank transfer, and eligible debit card are proposed payout choices only; no provider is connected.
- Creator revenue split and final payout terms are not decided.
- Continue using free services where possible. Do not add paid hosting, SMS, payment, or streaming services without an explicit decision and cost review.

The original 2026-10-26 birthday launch date has passed. This document tracks current beta readiness and does not imply that the original launch occurred.
