# AGENTS.md — apps/projector-mc (blast radius)

## Allowed
- `apps/projector-mc/**` — app code, tokens, fixtures, tests, docs.
- Importing `@mad/build-memory`, `@mad/single-verdict`, `@mad/claim-boundary`.
- Regenerating `fixtures/demo.json` via `fixtures/generate-demo.ts` only.

## Forbidden
- Touching `apps/madbridge/**` (MadBridge frozen), Room Runtime, Phase 0
  proofs, GatewayDaemon, broker/pty-host production paths. This app is a
  display surface only.
- Any network call from the app. v0 is fixture-only; there is no live backend.
- Rendering any status/verdict that did not come through
  `evaluateMemoryStatus` / `assertDisplayable`. No hardcoded chips, no
  "pretty green", no decorative spinners that imply work.
- Giving the founder-act stubs real effect. They emit typed intent events to
  the console/session log only. Never wire them to GitHub, merges, or the
  Gateway.
- Hand-editing `fixtures/demo.json` (the seal fails by design; regenerate).
- Claiming `PHASE_0`, `OCCUPANCY_PROOF`, `GATEWAY_HONESTY`, `ROOM_RUNTIME`,
  or `PRODUCTION_MERGE_AUTHORITY`.

## Build gates
- `bunx tsc --noEmit -p apps/projector-mc` (included in root `verify`).
- The app is excluded from the root tsconfig (browser JSX runtime + DOM lib);
  do not remove that exclusion to "simplify" tooling.
- `bun test apps/projector-mc` must stay green, especially the
  SHIP-with-STALE gate-breach regression.
