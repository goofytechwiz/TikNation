# TikNation Live — beta verification plan

This checklist applies to the feature branch only. Do not deploy the function or apply the migration to production until the blockers below are addressed and the tests pass.

## Release blockers to resolve

- [ ] Test LiveKit's documented server-managed token refresh/reconnect behavior in real browser sessions for broadcasters and viewers; verify a stream survives beyond 10 minutes and the creator can reconnect after network loss.
- [ ] Simulate camera permission denial and LiveKit connection failures; verify the startup error path ends the database session and attempts to delete the LiveKit room.
- [ ] Test server-side rolling-window throttles: chat is limited to 8 attempts per account per minute and reports to 3 attempts per account per hour. Confirm HTTP 429 responses, fail-closed behavior if the counter cannot be checked, and cleanup of old counter events. The unique report constraint also prevents repeat reports by the same account per stream.
- [x] Add a private moderator-only report review workflow on the feature branch; still define and verify the operational response process before inviting real creators.
- [x] Add opportunistic stale-session recovery when the Live listing can successfully enumerate LiveKit rooms; test browser crashes, network loss, API failure, and room cleanup failure.
- [ ] Verify the actual published GitHub Pages origin and any custom domain; update the exact CORS allowlist only if needed.
- [ ] Confirm database grants as well as RLS policies for all five new tables, including the server-only action-event table. The migration now explicitly revokes client privileges and grants only the intended signed-in read surfaces; verify this against the actual catalog after applying it.
- [ ] Confirm that function deployment keeps JWT verification enabled and that service-role credentials remain server-side.
- [ ] Validate LiveKit server URL and SDK compatibility in the target Supabase Edge Runtime before deployment.

## Browser implementation status

- [x] Add the Live page with live discovery, creator start/end controls, viewer media playback, chat, and stream reporting.
- [x] Add desktop and mobile navigation entries in `index.html` on the feature branch.
- [x] Keep participant tokens server-generated and rely on LiveKit's documented server-managed token refresh; no unsupported client-side refresh event is used.
- [x] Add best-effort LiveKit room cleanup if startup fails.
- [x] Add server-side rolling-window throttles for chat and reports; end-to-end abuse-throttle tests remain pending.
- [ ] Deploy the function and apply the migration only after runtime checks, moderator metadata setup, permission verification, and remaining release blockers are addressed.

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

The draft backend issues 10-minute participant tokens; the built-in LiveKit SDK refresh/reconnect behavior still needs to be verified in real sessions. Startup failure cleanup marks the database session ended and attempts to delete the LiveKit room, but cleanup can still fail and needs testing. Basic chat/report rate limiting is implemented on the feature branch but has not been load-tested or verified in a deployed function. Moderator review tooling and opportunistic stale-session recovery are implemented on the feature branch but remain untested in a deployed runtime. LiveKit's server-managed token refresh is documented by the provider and still needs verification in TikNation's actual browser flow. The browser UI is present on this feature branch but has not been deployed or end-to-end tested. This plan is not evidence that any test has passed.
