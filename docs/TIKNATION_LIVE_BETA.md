# TikNation Live beta — implementation notes

This is a draft foundation on a feature branch. It is not deployed and does not change the live website or production database.

## Planned beta behavior
- Approved, invited creator accounts can start one broadcast at a time.
- Authenticated viewers receive subscribe-only LiveKit tokens.
- Creator tokens can publish and subscribe.
- Stream lifecycle, chat writes, and reports pass through the authenticated Supabase Edge Function.
- Reported broadcasts are recorded in `public.live_stream_reports`.
- No gifts, monetization, co-hosting, or anonymous viewing in this first version.

## Before deployment
1. Review the migration and function.
2. Choose a LiveKit Cloud plan and create a project.
3. Configure these Edge Function secrets in Supabase: `LIVEKIT_URL` (the LiveKit WebSocket URL, usually starts with `wss://`), `LIVEKIT_API_KEY`, and `LIVEKIT_API_SECRET`. Never put the API secret in `index.html` or source control.
4. Apply the migration to the intended Supabase project.
5. Deploy `supabase/functions/tiknation-live/index.ts` with JWT verification enabled.
6. Add approved creator UUIDs to `live_creator_access` using an administrator-only process.
7. Build the browser UI and test camera/microphone permission flows on Android Chrome and desktop browsers.
8. Add admin moderation controls for `live_stream_reports`, room cleanup for disconnected sessions, and rate limiting before public beta.

## Function actions
POST JSON actions: `start` (title), `join` (session_id), `end` (session_id), `chat` (session_id, message), `report` (session_id, reason, optional details), and `list`.

## Security notes
- Client-side code must never receive LiveKit API secrets.
- Creator access is read by the server from `live_creator_access`; a browser-supplied role or approval flag is ignored.
- Viewer token grants set `canPublish: false`.
- Access-grant, session lifecycle, and report tables intentionally have no direct client write policies.
- Chat read access is restricted to signed-in users and currently live sessions. Writes use the Edge Function so server-side validation is applied.
- This is a draft foundation, not a complete production-ready streaming feature. Moderation workflow, abuse throttling, stale-session recovery, accessibility, and cross-browser/device tests remain required.
