# @mad/founder-act

Sealed, content-addressed Founder authorization objects. A `FounderAct` is a
small JSON file that is the ONLY artifact builders, projector, and preflight
may treat as Founder authorization for: **merge, commission, hold, freeze,
reopen, authorize_review** (spend-ceiling changes go through the
`other_named` allowlist). The enum is closed.

**A chat message is not authorization. The CLI is the only writer of act
files.**

```bash
bun run founder-act seal   --kind merge --subject "repo:build/branch" \
    --head-sha <40hex> --scope "packages/demo" --reason-code WHY \
    --founder-confirm          # human Founder authorizing this act, now
bun run founder-act verify <path|64-hex-sha>
bun run founder-act show   <path|64-hex-sha>
```

## What this is NOT

- **Not a cryptographic signature.** v0 is an integrity seal: a sha256 over
  a canonical serialization. `verify` proves a file is intact — it does NOT
  prove the Founder actually authorized it. Ed25519 / Keychain signing is a
  later wave (pairs with Open-Inspect git-sign). Do not represent v0 as
  non-repudiable.
- **Not Gateway attestation.** Not OCCUPANCY_PROOF, not GATEWAY_HONESTY,
  not ROOM_RUNTIME, not AE-01.
- **Not Phase 0.** Off-roadmap v0 build, Founder-commissioned.
- **Not a merge.** A `merge` act names a head SHA; the human Founder still
  performs the merge. This includes this package: merging founder-act
  itself requires a Founder-authorized commit, never an auto-merge.

## Identity pipeline

```
draft fields → canonicalize → sha256 identity → verify shape → status
```

Two hashes, both recomputed on every verify:

- `body_sha256` = sha256 of the canonical JSON of all payload fields except
  the two hash fields (the semantic content).
- `act_sha256` = sha256 of the canonical JSON of the payload minus
  `act_sha256` itself (the content-addressed identity; it binds
  `body_sha256` into the act).

Canonical JSON: recursive lexicographic key sort, no whitespace, `undefined`
entries dropped, arrays keep order. Two payloads that differ only in key
order hash identically — a test fails if that invariant breaks.

Acts are written as `<out>/<act_sha256>.json` (content-addressed; a re-seal
of identical fields is idempotent). Default output dir: `<cwd>/.mad/founder-acts/`
(gitignored). Test fixtures live in `fixtures/`.

## Statuses

| Status | Meaning | verify exit |
| --- | --- | --- |
| `VALID` | shape ok, hashes intact, not revoked, not expired | 0 |
| `INVALID` | shape violation or hash mismatch (tampering) | 1 |
| `EXPIRED` | `expires_at` is in the past | 1 |
| `REVOKED_REF` | sibling `<sha>.json.revoked` marker exists | 1 |

Precedence: shape/hash failures are `INVALID`; a revoked act reports
`REVOKED_REF` even if also expired. Revoke an act with
`touch <sha>.json.revoked` — no CLI writer for revocation in v0.

## The IR (closed)

Required unless marked optional: `schema` (`"founder_act_v0"` literal),
`id` (UUIDv4 or ULID), `kind`, `subject` (≤512 chars), `scope` (string[]),
`actor`, `issued_at` (ISO-8601), `reason_code`, `evidence_refs`
(`{kind, ref}[]`, may be empty for hold), plus the two hash fields.

Rules enforced by both `seal` and `verify`:

- `kind` ∈ merge | commission | hold | freeze | reopen | authorize_review |
  other_named — nothing else, ever.
- `actor` ∈ founder | demo. `demo` acts verify `VALID` (integrity) but are
  **not** Founder authority — callers must check `isFounderAct()`.
- `merge` acts require `head_sha` (40-hex). `base_sha`, when present, is 40-hex.
- `commission` acts require a non-empty `scope`. `scope: ["*"]` is allowed
  only for hold/freeze.
- `other_named` requires `kind_name` from `kind-name-allowlist.json`
  (currently `["spend_ceiling_change"]`). Prefer the closed kinds.
- Unknown fields are `INVALID` — the field set is closed.

## Actor gating

`seal` refuses `actor: founder` without `--founder-confirm`, which asserts
the human Founder is authorizing THIS act right now. Agents must never pass
that flag on the Founder's behalf; agents sealing test fixtures use
`--actor demo --demo-fixture`. The two flags are mutually exclusive.

## Layout

```
src/act.ts        types, closed enums, shape validation, seal + hash core
src/canonical.ts  canonical JSON + sha256 (key-order independent)
src/verify.ts     verify pipeline, token resolution with dir containment
src/show.ts       human summary
src/cli.ts        parseArgs + runCli (seal/verify/show)
src/main.ts       bin bootstrap
test/             roundtrip, tamper, expiry, revocation, gating, fixtures
fixtures/         2 demo acts (merge + commission), actor "demo", synthetic
```

No dependencies. No network calls. Reads are contained to the acts dir or
the working directory; path tokens must end in `.json` and contain no `..`.
