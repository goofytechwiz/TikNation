# TikNation Live beta — implementation notes

This is a development implementation on a feature branch. It is not deployed and does not change the live website or production database.

## Planned beta behavior
- Approved, invited creator accounts can start one broadcast at a time.
- Authenticated viewers receive subscribe-only LiveKit tokens.
- Creator tokens can publish and subscribe.
- Stream lifecycle, chat writes, and reports pass through the authenticated Supabase Edge Function.
- Reported broadcasts are recorded in `public.live_stream_reports`.
- No gifts, monetization, co-hosting, or anonymous viewing in this first version.
- `live.html` now contains the browser Live experience: stream discovery, creator start/end controls, LiveKit media connection, viewer chat, and stream reporting.
- `index.html` has a Live navigation entry on desktop and mobile; the link is only part of this feature branch until the pull request is reviewed and merged.

## Before deployment
1. Review the migration and function.
2. Confirm the LiveKit Cloud project is operational and keep the API secret private.
3. The project owner has reported adding `LIVEKIT_URL`, `LIVEKIT_API_KEY`, and `LIVEKIT_API_SECRET` as Supabase Edge Function secrets. Their values are not read back or stored in source control. Never put the API secret in `index.html` or GitHub.
4. Apply the migration to the intended Supabase project.
5. Deploy `supabase/functions/tiknation-live/index.ts` with JWT verification enabled.
6. Add approved creator UUIDs to `live_creator_access` using an administrator-only process.
7. Test camera/microphone permission flows on Android Chrome and desktop browsers, including permission denial, device switching, reconnects, and host cleanup if media setup fails.
8. Verify token renewal in real browser sessions; add moderator-only review controls for `live_stream_reports` and stale/disconnected-room recovery before inviting beta creators. Basic server-side chat/report throttling now exists on the feature branch and still needs testing.

## Function actions
POST JSON actions: `start` (title), `join` (session_id), `end` (session_id), `chat` (session_id, message), `report` (session_id, reason, optional details), and `list`.

## Security notes
- Client-side code must never receive LiveKit API secrets.
- Creator access is read by the server from `live_creator_access`; a browser-supplied role or approval flag is ignored.
- Viewer token grants set `canPublish: false`.
- Access-grant, session lifecycle, and report tables intentionally have no direct client write policies.
- Chat read access is restricted to signed-in users and currently live sessions. Writes use the Edge Function so server-side validation is applied.
- The browser interface is implemented on the feature branch, but the complete feature is not yet operational: the Edge Function has not been deployed and the migration has not been applied to production. The project owner reports the LiveKit secrets are configured in Supabase, but this has not been independently verified. LiveKit's built-in token refresh is expected to handle active-session reconnects, but it has not yet been runtime-tested. Moderator review workflow, stale-session recovery, accessibility review, and cross-browser/device tests remain required. Basic chat/report throttling is implemented but not yet tested.
