# TikNation Beta Readiness

Last reviewed: 2026-10-15

## Completed
- Added eight foreign-key lookup indexes in migration `20261015123052`.
- Reviewed current RLS policies for beta feedback, Live chat, creator access, gifts, Live reports, and verification applications.
- Left server-only Live tables without client policies closed to direct client access; do not add broad policies merely to silence warnings.

## Required before wider beta
- [ ] In Supabase Dashboard, Authentication → Security and Protection, enable leaked-password protection. The security advisor reports it is currently disabled.
- [ ] Confirm `LIVEKIT_URL` exists as a Supabase Edge Function secret. Do not expose API secrets or the service-role key in browser code or Git.
- [ ] Test Live from two devices: approved creator starts, viewer joins, chat works, report submits, reconnect works, and creator ends the stream.
- [ ] Confirm unapproved creators cannot start; viewers cannot publish or end someone else's stream; non-moderators cannot review reports.
- [ ] Test account recovery, report/block, and profile uploads on mobile and desktop.
- [ ] Confirm reduced-motion and autoplay preferences are respected.

## Current limits
Live has not been verified end-to-end on real devices. Keep it invite-only/experimental until the two-device test passes. Performance advisor warnings about RLS policy initialization and overlapping verification SELECT policies require regression testing before any policy rewrite.
