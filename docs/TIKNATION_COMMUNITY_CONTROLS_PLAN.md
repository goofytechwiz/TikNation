# TikNation Community Controls — Implementation Plan

## Visual direction
Create a distinct TikNation magical interface: midnight-indigo surfaces, cyan energy accents, violet portal glows, subtle constellation particles, luminous borders, and clear readable controls. Keep the design responsive for phone-first use, keyboard accessible, and respectful of reduced-motion preferences. Effects must never obscure safety labels or actions.

## Scope

### 1. Follow / unfollow
- Profile action toggles between Follow and Following, with an explicit Unfollow confirmation.
- Persist the relationship in the database with unique (follower_id, followed_id), no self-follow, authenticated ownership, and server/database-enforced access rules.
- Keep follower/following counts consistent and avoid duplicate notifications on repeated taps.
- Following a creator must not automatically opt the user into every push alert.

### 2. Block / mute
- Block: persist an account-to-account restriction; hide each other's profile content and posts where practical; prevent follow, chat, and other supported interactions; remove existing follow relationships both ways.
- Mute: offer separate choices for muting a creator's posts and muting their notifications; do not tell the muted creator.
- Provide a manageable Blocked Accounts and Muted Accounts list with an unblock/unmute action.
- Enforce restrictions on backend writes and reads where possible; UI hiding alone is not security.

### 3. Live moderation — streamer-configurable
- Each streamer can configure moderation defaults and change them during a broadcast.
- Actions: mute a participant in chat, remove from the current Live, timed timeout, block from the creator's future Lives, and report to TikNation.
- Suggested timeout choices: 1, 5, 10, 15, or 30 minutes; repeat disruption can escalate to 10/30/60 minutes or a manual block.
- Timeouts expire automatically; the backend, not the browser, determines whether a participant may join, publish, or chat.
- Creator/moderator permissions must be checked server-side. Never trust a client-supplied host/moderator flag.
- Platform-wide safety policy still applies; creators cannot disable reporting or override serious abuse enforcement. Report review remains a separate authorized staff workflow.

### 4. Notifications
- In-app notification center for new followers, followed creators going Live, and followed creators posting.
- Per-creator alert preferences: Live alerts and post alerts independently configurable.
- Global preferences for in-app alerts, push alerts, comments/follows, security notices, and quiet hours.
- Start with in-app notifications; phone push requires a separately implemented and tested push-delivery setup plus user permission.
- Avoid duplicate events, noisy defaults, and notifications for blocked/muted accounts according to the user's preferences.

## Safe implementation sequence
1. Inspect current profile/follow, settings, notification, and Live code plus deployed database schema.
2. Add database migrations with constraints, indexes, RLS policies, and server-side enforcement.
3. Implement and test follow/block/mute APIs before wiring profile controls.
4. Add Live moderation actions and durable timeout/block state to the backend, then wire the magical creator controls.
5. Add in-app notifications and per-creator preferences; implement push only after its delivery path is verified.
6. Test with two accounts on PC and phone, including authorization failures, expired timeouts, block bypass attempts, and notification opt-outs.
7. Keep all changes on this feature branch until review and testing are complete. Do not disturb the currently working Live broadcast path.

## Release checklist
- [ ] Confirm actual existing schema and avoid duplicate tables or conflicting policies.
- [ ] Verify account ownership and authorization for every write.
- [ ] Test two-account follow/unfollow, block/mute, Live timeout/rejoin, and notifications.
- [ ] Check mobile layout, focus states, screen-reader labels, and reduced-motion mode.
- [ ] Merge/deploy only after successful end-to-end tests.

## Implementation status — 2026-10-15

- [x] Added the magical community-controls preview at `community-controls.html`.
- [x] Merged community controls to `main` in PR #2.
- [x] Applied the additive community-controls migration to the TikNation Supabase project. The live schema now includes `user_mutes`, `creator_notification_preferences`, `live_moderation_actions`, and `creator_notification_deliveries`.
- [x] Production migration preflight: the current `public.follows` table had zero duplicate follower/following pairs.
- [x] Added separate Mute posts and Mute notifications actions, Watch-feed filtering, and a muted-creators manager with independent unmute controls.
- [x] Added per-creator Live and post alert preferences.
- [x] Deployed `tiknation-community-notifications` Edge Function version 2 for authenticated, server-side post-alert delivery with mute/block checks, duplicate-delivery protection, and support for current Supabase key-map environment variables.
- [x] Deployed `tiknation-live` version 8, preserving the deployed environment-key fallback and LiveKit error handling while adding mutual-block checks on join/chat/refresh, streamer moderation, timeout enforcement, and opted-in Live-start alerts.
- [x] GitHub Actions passed Deno type checks for both Edge Functions and browser inline JavaScript syntax checks before merge. The deployed Live function source passed type checks; notification function version 2 was successfully deployed after adding matching key-map compatibility.
- [ ] Complete real two-account end-to-end tests for follow/unfollow, mute/unmute, alert opt-in/out, timeout expiry, Live removal/rejoin, and mobile behavior. These require authenticated test accounts and a real Live session.
- [ ] Verify GitHub Pages has finished publishing the merged `main` branch and check the live site on phone and desktop.
- [ ] Confirm actual notification delivery in the app. CI validates syntax/types and deployment; it does not simulate signed-in accounts or a real broadcast.
- [ ] Review Supabase security-advisor findings. The current project has pre-existing RLS warnings for several service-only tables and a disabled leaked-password protection setting; these are documented for follow-up rather than changed as part of this release.

**Deployment note:** The migration and two Edge Functions are deployed. The website code is merged to `main`; public GitHub Pages publication and signed-in end-to-end behavior still need a final smoke test.

PR: https://github.com/goofytechwiz/TikNation/pull/2
