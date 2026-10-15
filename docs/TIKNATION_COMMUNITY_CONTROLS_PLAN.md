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
