# @mad/honesty-compiler

Honesty IR + compiler gate (v0). One command that turns a **declared claims**
document into a closed `ClaimIR[]`, rung-typechecks every claim against
`@mad/claim-boundary`, binds every required evidence ref, and emits **ONE**
`@mad/single-verdict` verdict — or fails closed.

**What it is NOT:** not a merge authority, not Phase 0, not occupancy proof,
not Gateway honesty, not Room Runtime. It decides nothing about who may
merge; merge remains a Founder act naming the head SHA. It makes lying
claims unrepresentable: exit 0 only if every declared claim is rung-legal
AND evidence-bound.

## Usage

```bash
bun run honesty-compile                                   # live mode, input honesty/claims.json
bun run honesty-compile --input <path/to/claims.json>     # explicit input
bun run honesty-compile --fixture --input <path>          # sealed fixture mode (CI-friendly)
bun run honesty-compile --json-only --now <iso8601>       # machine line only, deterministic
```

Exit codes: `0` = every declared claim rung-legal AND evidence-bound ·
`1` = verdict FAIL (over-claim, unbound, STALE/UNKNOWN/INVALIDATED memory,
forbidden token, unknown field, verdict refusal) · `2` = tooling error (the
compiler could not run honestly: unreadable input, tampered sealed fixture,
no git head in live mode).

Output: human summary, then exactly one machine JSON line last on stdout
(schema `honesty-compiler/v0`, claim `HONESTY_COMPILER_V0`, verdict record,
per-claim outcomes, failures, skips, and the compiler's own
`not_evidence_of`).

## Input (v0 — closed shapes only)

Primary machine input, `honesty/claims.json` by default:

```json
{
  "schema": "HONESTY_COMPILER_V0",
  "claims": [
    {
      "id": "example-verify-1",
      "text": "example-subject typechecks and its test suite passes at the recorded head.",
      "kind": "verify",
      "subject": "example-subject",
      "rung": "verified",
      "requires": [
        { "kind": "build_memory", "subject": "example-subject", "headSha": "<40-hex>" },
        { "kind": "argus_packet", "path": "../argus/packet.json", "sha256": "<64-hex>" }
      ],
      "not_evidence_of": [
        "review", "ci", "merge",
        "PHASE_0", "OCCUPANCY_PROOF", "GATEWAY_HONESTY", "ROOM_RUNTIME", "AE01_FIX", "PRODUCTION_MERGE_AUTHORITY"
      ]
    }
  ]
}
```

- `kind` (closed): `ship | verify | fixture | spec_only | not_claim`.
- Evidence `kind` (closed): `build_memory | argus_packet | proving_ground | test_suite`.
- A markdown handoff may carry the same JSON in its first fenced block under
  a heading titled **Declared claims**. Free prose is never scraped into
  claims — under-claiming beats hallucination.

## The four passes

1. **P0 Parse** — unknown fields, unknown enum values, forbidden assertion
   tokens (`PHASE_0`, `OCCUPANCY_PROOF`, `GATEWAY_HONESTY`, `ROOM_RUNTIME`,
   `AE01_FIX`, `PRODUCTION_MERGE_AUTHORITY`, cost-ceiling production
   language; underscore and spaced variants both probed) are structural
   failures.
2. **P1 Rung typecheck** — a claim's kind asserts a claim-boundary claim
   (`ship`→merge, `verify`→verification, `fixture`→execution). A rung that
   does not prove that claim is an over-claim → FAIL. The declared
   `not_evidence_of` must include the rung's forced exclusions (no lying by
   omission), must not contradict proven claims, and ship/verify must
   declare the standard forbidden set.
3. **P2 Evidence bind** — `build_memory` must be VALID for the subject at
   the claimed head (STALE/UNKNOWN/INVALIDATED → FAIL; live mode also
   requires the claimed head to equal the working git HEAD). `argus_packet`
   must exist under the root and hash to its declared sha256 (UTF-8 text
   only in v0). `proving_ground` challenge ids are checked when the package
   is present; otherwise the ref SKIPs with an explicit reason and never
   satisfies an evidence requirement. `test_suite` must declare exit code 0.
   ship/verify must bind a build_memory ref; ship/verify/fixture must bind
   at least one ref.
4. **P3 Emit** — one verdict via `@mad/single-verdict` `makeVerdict`, so the
   library's own memory and rung gates run against the real thing: SHIP and
   VERIFY_PASS* are refused on non-VALID memory, and a boundary whose rung
   forbids the asserted claim is refused. Refusals surface as FAIL findings,
   never silent downgrades. Verdict selection: any `ship` → SHIP; else any
   `verify` → VERIFY_PASS; else any `fixture` → HOLD (EVIDENCE_INSUFFICIENT);
   else SPEC_ONLY.

## Modes

- **Live** (default): reads `.mad/build-memory.json` (override `--store`) and
  the working git HEAD. No network calls.
- **Fixture** (`--fixture` or `MADV_HONESTY_FIXTURE=1`): uses the package's
  sealed build-memory fixture (`fixtures/build-memory/fixture-store.json`,
  re-seal with `bun packages/honesty-compiler/scripts/seal-fixtures.ts`) and
  the sealed argus sample under `fixtures/argus/`. The seal is verified on
  load — a hand-edited "still green" row is a tooling error, not a verdict.

## Goldens and the mutation note

`test/goldens/*.golden.json` pin `produced_at`; regenerate with
`bun packages/honesty-compiler/test/generate-goldens.ts` and review the diff —
never hand-edit. The golden set includes hard FAILs for over-claim vs rung,
STALE memory + ship, missing evidence on a ship claim, forbidden token,
unknown field, and bad argus sha; and PASSes for VALID memory + legal rung +
bound fixture argus sha, spec-only, fixture-suite HOLD, and proving-ground
skip.

**Mutation:** removing the STALE guard (the `status.status !== "VALID"`
check in `src/bind.ts`) must fail the test named
`MUTATION GUARD: STALE build-memory with kind=ship must FAIL — removing the
STALE guard in src/bind.ts must fail this test`. If it still passes, the
guard you removed was not the one doing the work.

## Known v0 constraints (recorded, not hidden)

- `test_suite` evidence is **declared, not executed**: the compiler enforces
  exit code 0 but does not run the suite, and the ref carries no
  path/sha256, so it is not emitted into verdict evidence refs.
- `proving-ground` is not on this base, so every proving_ground ref SKIPs
  with `PROVING_GROUND_PACKAGE_ABSENT` until the package lands.
- One subject per positive-verdict document: all ship/verify claims in a
  file must share one subject, and one verdict is emitted per compile.
- Evidence refs from claims whose kind is not the verdict's asserted level
  are compile-checked but not attached to the verdict (a VERIFY_PASS verdict
  does not inherit a fixture claim's executed-rung boundary).

Claim: `HONESTY_COMPILER_V0` — not evidence of `PHASE_0`, `OCCUPANCY_PROOF`,
`GATEWAY_HONESTY`, `ROOM_RUNTIME`, `AE01_FIX`, `PRODUCTION_MERGE_AUTHORITY`,
`merge`. Not merge authority.
