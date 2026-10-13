# TikNation Live — browser UI specification

## Fit with the current site

The current `index.html` is a single-page app with `.page` sections, `showPage(pageId, button)`, a desktop `.sidebar`, and a five-item `.mobile-nav`. The existing theme is a dark background with purple/cyan accents, rounded cards, and responsive layouts. The Live UI should reuse these conventions instead of redesigning the app shell.

**Implementation guardrail:** build this on the feature branch, and do not replace or broadly refactor the current home, authentication, profile, watch, or creator studio sections.

## Navigation and entry points

- Add a `Live` navigation destination with a broadcast icon to desktop and mobile navigation.
- Add a page section with a stable ID such as `live` and use the existing `showPage('live', this)` routing convention.
- If signed out, show a friendly sign-in prompt for chat and reporting. Do not create anonymous Supabase access as a shortcut.
- Do not show a broadcast-start control as available unless the signed-in creator is approved by the server. UI visibility is convenience only; the Edge Function remains the authority.

## Live discovery page

1. Heading: `TikNation Live` with a short “Live now” explanation.
2. Refresh/list state, loading state, empty state, and retryable error state.
3. Responsive stream cards showing a LIVE marker, stream title, creator identity, and start time.
4. Selecting a card opens the viewer experience for that session.
5. Use text labels as well as color/icons so live status is not communicated by color alone.

## Viewer experience

- Video player container with a clear loading/connecting state, reconnect state, and ended/offline state.
- Stream title and creator identity; a report action available from a clearly labelled menu/button.
- Chat list with an empty state, scroll area, and message input capped at 500 characters.
- Send button disabled during empty submissions and clear status/error feedback for failed sends.
- Provide a leave/back action; leaving as a viewer must not end the creator's session.
- Viewer token must be issued by the Edge Function with publishing disabled. Never allow the client to choose its own grant.

## Creator broadcast experience

- A `Go Live` setup panel with title field (1–100 characters), preview area, and explicit camera/microphone permission explanation.
- Ask for camera/microphone access only after the creator presses a clear start/preview action. Handle permission denied, missing device, device busy, and unsupported browser states.
- Show a local camera preview before the broadcast starts where supported.
- Start action is available only after the server confirms approval; always treat the server response as authoritative.
- During broadcast: preview, title, connection status, and a clearly separated `End Live` action.
- Confirm before ending; after server confirmation, stop local tracks and disconnect from LiveKit.
- If start fails, stop local tracks, show a human-readable error, and do not leave the user on a fake “LIVE” state.

## Reporting and safety

- Report form uses a controlled reason list (for example: harassment, hate or threats, sexual content, violence, dangerous activity, spam/scam, other) and optional details capped at 1,000 characters.
- Explain that reports are reviewed under TikNation's moderation process; never promise an immediate response.
- Prevent duplicate report submission in the UI, but enforce uniqueness and authorization on the server too.
- The report workflow must not reveal the reporter's identity to the reported creator.
- A moderator-only report review screen is a launch requirement, not part of the public viewer page.

## Data/API integration

- All live lifecycle actions, token issuance, chat writes, and report writes go through `supabase/functions/tiknation-live`.
- Use the existing signed-in Supabase session's access token for Authorization. Never use the service-role key in browser code.
- The current draft uses 10-minute LiveKit tokens and has no renewal action. Do not ship until token renewal/reconnect behavior is implemented and tested.
- Use LiveKit's browser client SDK for media connection and publishing/subscribing; do not try to display a stream using only the server token response.
- The current draft CORS allowlist is `https://goofytechwiz.github.io`; confirm the deployed origin/custom domain before integration.

## Responsive and accessibility requirements

- Mobile-first; viewer video should use available width without horizontal scrolling. Chat controls should remain usable on a narrow screen and mobile keyboard.
- Use semantic headings, explicit labels, visible focus, accessible button names, and `aria-live` for connection/error messages.
- Respect the existing reduced-motion preference class.
- Keep controls large enough for touch and do not rely on hover-only interactions.

## Definition of done for the UI

- [ ] Live discovery, loading, empty, and error states work.
- [ ] Approved creator can preview, start, and end a stream from Android Chrome and a desktop browser.
- [ ] Unapproved creator cannot start a stream even when calling the backend directly.
- [ ] Signed-in viewer can watch and chat; publishing is denied to viewer token.
- [ ] Ending a stream immediately makes the viewer UI show an ended state and prevents new joins.
- [ ] Reporting works and gives clear success/duplicate/error feedback.
- [ ] Existing site navigation and major flows remain unchanged.
- [ ] Token renewal/reconnect, rate limiting, moderator review, and cleanup tests pass before beta.