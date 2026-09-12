# AGENTS.md — @mad/build-memory (blast radius)

## Allowed
- `packages/build-memory/**` — library, CLI, tests, fixtures, docs.
- Consumers may import `@mad/build-memory` (browser-safe `.`) and
  `@mad/build-memory/node` (bun/node only) and use `evaluateMemoryStatus`,
  `FixtureMemoryStore`, and the closed vocabularies exported from `src/index.ts`.

## Forbidden
- Importing anything from `packages/broker`, `packages/pty-host`,
  `packages/room-runtime-worker`, `apps/madbridge`, or any adapter into this
  package — the dependency graph points one way: consumers → here.
- Adding runtime dependencies. This package is zero-dep by contract; the
  isomorphic sha256 is deliberate (the browser entry must stay node-free).
- Claiming `PHASE_0`, `OCCUPANCY_PROOF`, `GATEWAY_HONESTY`, `ROOM_RUNTIME`,
  or `PRODUCTION_MERGE_AUTHORITY` for anything produced with this package.
  Allowed claim vocabulary: `BUILD_MEMORY_V0`, `PROJECTOR_FIXTURE`.
- Weakening hard invalidation (e.g., treating `UNKNOWN` or `STALE` as
  passing, loosening SHA formats, or dropping fail-closed field validation).

## Invariants pinned by tests
- match = VALID, mutation = STALE, missing = UNKNOWN, retraction = INVALIDATED.
- Sealed fixtures fail closed on any row edit after sealing.
- The isomorphic sha256 agrees with node:crypto (drift guard).
