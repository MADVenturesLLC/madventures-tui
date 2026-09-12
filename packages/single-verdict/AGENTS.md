# AGENTS.md — @mad/single-verdict (blast radius)

## Allowed
- `packages/single-verdict/**` — library, tests, goldens, docs.
- Consumers import `@mad/single-verdict` and use `makeVerdict`,
  `assertDisplayable`, `VERDICT_TONE`, and the closed vocabularies.

## Forbidden
- Importing anything from `packages/broker`, `packages/pty-host`,
  `packages/room-runtime-worker`, `apps/madbridge`, or any adapter. The only
  runtime imports are `@mad/build-memory` and `@mad/claim-boundary`.
- Weakening @mad/claim-boundary: the rung ladder is imported, never
  re-implemented, reordered, or filtered.
- Adding an override/bypass to the memory or claim gate. `VerdictRefusal` is
  the designed outcome; the re-bind path is fresh build-memory evidence.
- Expanding the enum, reason codes, or schema fields without updating the
  goldens via `test/generate-goldens.ts` and stating the change in the PR.
- Claiming `PHASE_0`, `OCCUPANCY_PROOF`, `GATEWAY_HONESTY`, `ROOM_RUNTIME`,
  or `PRODUCTION_MERGE_AUTHORITY`. Allowed: `SINGLE_VERDICT_V0`,
  `PROJECTOR_FIXTURE`.

## Invariants pinned by tests
- STALE/UNKNOWN memory ⇒ no SHIP/VERIFY_PASS* (re-bind required).
- A forbidding claim-boundary rung ⇒ no SHIP/VERIFY_PASS* for that claim.
- Goldens are byte-stable serializer output.
- `assertDisplayable` refuses anything the validator refuses.
