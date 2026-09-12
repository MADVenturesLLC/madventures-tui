# @mad/build-memory

> Verified Build Memory v0 — durable, SHA-hard memory of what was verified
> and what is stale.
>
> **LIBRARY — NOT PHASE_0 — NOT OCCUPANCY — NOT LEDGER — NOT MISSION CONTROL.**
>
> Zero dependencies. The browser-safe entry imports nothing from node; the
> fs-backed store and CLI git access live behind the `./node` subpath.

## The one rule: HARD INVALIDATION

A record binds a subject (package | app | claim-id) to the git HEAD SHA (and
optionally a content-tree hash) at which it was verified. Status is a pure
function of (recorded, current):

| Situation | Status | Reason code |
| --- | --- | --- |
| exact SHA (and tree, when both present) match | `VALID` | `SHA_MATCH` |
| recorded SHA ≠ current SHA | `STALE` | `SHA_MISMATCH` (or `SHA_AND_TREE_MISMATCH`) |
| same SHA, recorded tree ≠ current tree | `STALE` | `TREE_MISMATCH` |
| no record for the subject | `UNKNOWN` | `RECORD_MISSING` |
| operator retraction | `INVALIDATED` | `INVALIDATED_BY_OPERATOR` |

A moved head is `STALE` — never silently "still pass". `UNKNOWN` is never
treated as passing. `evaluateMemoryStatus` throws on malformed input rather
than answer a quiet wrong question.

## Evidence is structured or it is not evidence

Every `evidence_ref` is `{ path, sha256, kind }` with `kind` closed to
`argus_packet | claim | golden | log`. Free-text-only "proof" is
unrepresentable. Records are validated fail-closed: unknown fields, bad SHA
formats, and unknown kinds are structurally invalid (claim-boundary idiom).

## Sealed fixtures (no live git)

`sealFixture(rows)` produces `{ format, sealed_sha256, records }` where the
seal is `sha256(canonicalJson(rows))`. `FixtureMemoryStore.load` re-verifies
the seal — a hand-edited "still green" demo row fails to load. This is what
the projector demo runs on; it is read-only by construction.

## CLI

```bash
bun packages/build-memory/src/cli.ts status <subject>              # exit 0 only on VALID
bun packages/build-memory/src/cli.ts record <subject> --head <sha40> \
  --evidence argus_packet:docs/verification/run.json:<sha64>
bun packages/build-memory/src/cli.ts invalidate <subject> --reason "..."
bun packages/build-memory/src/cli.ts list
bun packages/build-memory/src/cli.ts seal --records-in store.json --out fixture.json
```

The bin is also exposed as `mad-build-memory`. All operator-supplied paths
are confined to the working directory before any read or write; the tool
makes no network requests.

## What this is NOT

- **NOT Phase 0.** No occupancy, no Gateway honesty claim, no room runtime.
- **NOT a ledger.** The JSON store is v0 durability — human-readable,
  diffable, rewritable by its owner. Append-only evidence chains live in
  `packages/ledger`.
- **NOT Mission Control.** Display belongs to `apps/projector-mc`, which may
  only render statuses computed through this library and verdicts from
  `@mad/single-verdict`.

Claim vocabulary: `BUILD_MEMORY_V0`. Nothing here proves `TUI_ACCEPTANCE`,
`PHASE_0`, `OCCUPANCY_PROOF`, or `GATEWAY_HONESTY`.
