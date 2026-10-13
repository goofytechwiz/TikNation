# TikNation Live — beta verification plan

This checklist applies to the feature branch only. Do not deploy the function or apply the migration to production until the blockers below are addressed and the tests pass.

## Release blockers to resolve

- [ ] Exercise the new 7-minute token-renewal action in real browser sessions for both broadcasters and viewers; verify the stream survives beyond 10 minutes and a revoked creator cannot renew a publishing token.
- [ ] Simulate camera permission denial and LiveKit connection failures; verify the startup error path ends the database session and attempts to delete the LiveKit room.
- [ ] Add rate limiting/abuse controls for chat and reports. The unique report constraint prevents repeat reports by the same account per stream, but it is not general throttling.
- [ ] Add a moderator-only report review workflow and an operational response process before inviting real creators.
- [ ] Add stale-session recovery for browser crashes, network loss, and function/room cleanup failures.
- [ ] Verify the actual published GitHub Pages origin and any custom domain; update the exact CORS allowlist only if needed.
- [ ] Confirm database grants as well as RLS policies for all four new tables. Do not rely on a SQL comment as proof of grants/revokes.
- [ ] Confirm that function deployment keeps JWT verification enabled and that service-role credentials remain server-side.
- [ ] Validate LiveKit server URL and SDK compatibility in the target Supabase Edge Runtime before deployment.

## Browser implementation status

- [x] Add the Live page with live discovery, creator start/end controls, viewer media playback, chat, and stream reporting.
- [x] Add desktop and mobile navigation entries in `index.html` on the feature branch.
- [x] Add a server-validated token-renewal action and client-side renewal timer.
- [x] Add best-effort LiveKit room cleanup if startup fails.
- [ ] Deploy the function and apply the migration only after LiveKit secrets are configured and the remaining release blockers are addressed.

## Database and authorization tests

- [ ] Migration runs on a disposable/staging Supabase project and can be safely re-run where intended.
- [ ] Anonymous requests cannot read sessions or chat through the Supabase Data API.
- [ ] Signed-in users can read only active sessions and chat attached to active sessions.
- [ ] Clients cannot directly insert/update creator access, session lifecycle, or reports.
- [ ] A non-approved account receives 403 from `start`, even if it submits an approval flag in JSON.
- [ ] An approved creator can start at most one live session; concurrent start attempts cannot create two active sessions.
- [ ] A viewer token has `canPublish: false`; test that attempting to publish audio/video is rejected by LiveKit.
- [ ] A creator cannot end another creator's session.
- [ ] Chat and report writes require a valid authenticated user and an existing session; malformed IDs and over-limit fields are rejected.
- [ ] A second report from the same user for the same session is rejected.
- [ ] No API response or log exposes the service-role key or LiveKit API secret.

## Browser/device tests

- [ ] Android Chrome: camera/microphone permissions granted, denied, and revoked during use.
- [ ] Desktop Chrome and Firefox; Safari if supported by the chosen LiveKit SDK/configuration.
- [ ] Start, join, leave, end, reconnect, rotate phone, background/foreground app, and switch networks.
- [ ] Viewer sees a clear ended/unavailable state when the creator ends the stream.
- [ ] Chat loading, empty state, long messages, rapid submissions, and connection loss.
- [ ] Report confirmation, duplicate-report feedback, and clear privacy/moderation copy.
- [ ] Keyboard accessibility, visible focus, screen-reader labels, loading states, and error messages.
- [ ] Confirm the existing TikNation home, sign-in, sign-up, profile, and feed flows are unchanged.

## Private beta launch gates

1. Complete all release blockers and authorization tests in staging.
2. Configure `LIVEKIT_URL`, `LIVEKIT_API_KEY`, and `LIVEKIT_API_SECRET` as Supabase Edge Function secrets; never place them in client code or GitHub.
3. Deploy only to staging first and verify logs, room cleanup, and cost limits.
4. Invite a small test group (5–20 creators) only after explicit approval and moderation coverage are ready.
5. Keep a rollback plan: disable the Live function, stop issuing tokens, and clean up active LiveKit rooms if a critical issue appears.
6. Do not merge/deploy solely because the draft PR exists; require human review and passing tests.

## Current known limitations

The draft backend currently issues 10-minute tokens without a renewal action. If token creation fails after room/session creation, the catch path marks the session ended but may leave a LiveKit room behind. Chat/report rate limiting, moderation tooling, stale-session recovery, and browser UI are not implemented yet. This plan is not evidence that any test has passed.
