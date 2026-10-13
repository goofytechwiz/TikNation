# TikNation Live beta — implementation notes

**Deployment status (2026-10-13):** The Live database migration is applied to the production Supabase project and the `tiknation-live` Edge Function is deployed with JWT verification enabled. The browser UI and navigation remain on the draft GitHub feature branch and are not yet published on the live website. The backend foundation is active, but TikNation Live is **not ready for creator beta** until runtime/device tests, credential verification, creator approval, and moderation setup are completed.

## Planned beta behavior
- Approved, invited creator accounts can start one broadcast at a time.
- Authenticated viewers receive subscribe-only LiveKit tokens.
- Creator tokens can publish and subscribe.
- Stream lifecycle, chat writes, and reports pass through the authenticated Supabase Edge Function.
- Reported broadcasts are recorded in `public.live_stream_reports`.
- No gifts, monetization, co-hosting, or anonymous viewing in this first version.
- `live.html` now contains the browser Live experience: stream discovery, creator start/end controls, LiveKit media connection, viewer chat, and stream reporting.
- `index.html` has a Live navigation entry on desktop and mobile; the link is only part of this feature branch until the pull request is reviewed and merged.

## Before inviting beta creators
1. Review the deployed migration and function; the initial production activation is complete, but end-to-end release validation remains open.
2. Confirm the LiveKit Cloud project is operational and keep the API secret private.
3. The project owner has reported adding `LIVEKIT_URL`, `LIVEKIT_API_KEY`, and `LIVEKIT_API_SECRET` as Supabase Edge Function secrets. Their values are not read back or stored in source control. Never put the API secret in `index.html` or GitHub.
4. **Completed:** applied the `tiknation_live_beta_foundation` migration and deployed `supabase/functions/tiknation-live/index.ts` with JWT verification enabled. The database grants/RLS were inspected after migration; client access is read-only for active sessions and chat, and the rate-limit RPC is executable only by `service_role`.
5. Add approved creator UUIDs to `live_creator_access` using an administrator-only process.
6. Test camera/microphone permission flows on Android Chrome and desktop browsers, including permission denial, device switching, reconnects, and host cleanup if media setup fails.
7. Verify LiveKit token-expiry refresh and reconnect behavior in real browser sessions. The feature branch now includes a private moderation console, server-side moderator checks, opportunistic stale-session recovery, and basic chat/report throttling; all require deployed runtime testing before inviting beta creators.
8. Grant moderator access only by setting server-managed Supabase Auth `app_metadata` for the chosen moderator account, e.g. `roles: ["moderator"]`, using a trusted admin process. Never use user-editable `user_metadata`, a client-side flag, or a public table to grant moderator rights.

## Function actions
POST JSON actions: `start` (title), `join` (session_id), `end` (session_id), `chat` (session_id, message), `report` (session_id, reason, optional details), `list`, `moderation_list`, and `review_report` (report_id, status). Moderator actions require server-managed Auth `app_metadata` roles.

## Security notes
- Client-side code must never receive LiveKit API secrets.
- Creator access is read by the server from `live_creator_access`; a browser-supplied role or approval flag is ignored.
- Viewer token grants set `canPublish: false`.
- Access-grant, session lifecycle, and report tables intentionally have no direct client write policies.
- Chat read access is restricted to signed-in users and currently live sessions. Writes use the Edge Function so server-side validation is applied.
- The backend foundation is deployed, but the full feature is not yet operational for creators because the Live browser UI remains on the draft feature branch. The project owner reports the LiveKit secrets are configured in Supabase, but their values have not been independently verified. A token-expiry handler now requests a fresh token from the authenticated Edge Function; this flow, moderator review, stale-session recovery, and chat/report throttling have not been runtime-tested. Accessibility review, SDK/runtime validation, and cross-browser/device tests remain required. Do not invite creators until those tests pass and creator/moderator access is configured.
