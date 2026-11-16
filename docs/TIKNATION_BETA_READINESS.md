# TikNation Beta Readiness

Last reviewed: 2026-11-16

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


## 2026-11-16 recheck

- The new home account link now says **Sign in / Join** and still routes to the existing legacy auth page. No auth implementation was replaced.
- Production read-only checks found 3 Auth users and 3 matching profile rows, with no missing profiles, blank usernames, duplicate case-insensitive usernames, or deactivated profiles.
- The database's lower(username) unique index is present. The login rate-limit RPC is service-role-only and uses SECURITY DEFINER with an empty search path.
- Both email and username login are implemented through the deployed username-login endpoint, but no real-account login test was performed. Keep both methods **unverified** until the same account succeeds with each.
- All 7 inline scripts in legacy.html passed static syntax parsing. All 3 live.html inline scripts passed module-aware syntax parsing. This does not replace browser tests.
- Password reset is wired through Supabase Auth, but email delivery, redirect allowlisting, reset-link handoff, and password update have not been exercised.
- Mobile styles and autocomplete are present; Android Chrome and iOS Safari still require physical-device testing. The sign-in field uses an email-mode keyboard for both email and username; check underscore entry on mobile.
- The deployed username-login function is ACTIVE version 9 and account-recovery is ACTIVE version 10. Their deployed source differs from the newer GitHub copies in Supabase key-environment fallbacks. Do not redeploy until secret configuration is confirmed and a rollback/regression plan exists.
- Live backend is ACTIVE version 23 and includes LiveKit server/client code, but no end-to-end broadcast was verified. Production has 55 ended session rows and zero active sessions at this check. The new LIVE Worlds page is a visual preview, not a connected broadcast.
- Gifts remain TEST currency with cash_value 0. The wallet and PayPal/Cash App/Venmo choices are prototypes only. No real-money payout integration exists.
- Creator/viewer safeguards visible in source include age gates, optional follower-only chat without restricting public viewing, moderation, and reporting. Test them with real accounts before wider beta. Final purchase prices, creator split, fees, refunds, chargebacks, withdrawal rules, and appeals remain unfinished.
- Security advisors still report leaked-password protection disabled and 16 RLS-enabled/no-policy tables. Performance advisors also report 14 unindexed foreign keys, 29 RLS init-plan warnings, 26 unused indexes, 3 multiple permissive policy warnings, and 1 duplicate index. Review individually; do not add broad policies.
- No new paid service was introduced. Continue on the existing free-service approach where feasible and check current provider quotas before expanding Live or email use.

**Current release gate:** authentication is implemented but not real-account-tested; password recovery is unverified; mobile is source-reviewed but not device-tested; Live is experimental; real-money payouts are unavailable. Do not advertise these as fully ready.


### Additional sign-in evidence

- Supabase Auth records at least one historical successful sign-in for each of the 3 existing accounts; the latest was 2026-10-31 02:06:18 UTC. The records do not identify whether those sessions used email or username.
- The custom login security-events table is currently empty, so there is no method-specific telemetry proving that username and email login have both succeeded in production.
