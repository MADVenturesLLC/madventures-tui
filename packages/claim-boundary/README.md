# @mad/claim-boundary

> A pure honesty library for MADVentures receipts.
> **LIBRARY — NOT PHASE_0 — NOT OCCUPANCY — NO GATEWAY — NO FAKE ROOM.**
>
> Every durable receipt must declare what it is NOT evidence of. This package
> turns that prose discipline into a **closed enum set forced by rung** — a
> boundary that lies by omission, contradicts its own rung, or speaks outside
> the vocabulary is structurally invalid, not merely ill-advised.
>
> No Gateway. No Phase 0. No occupancy. No fake room. Zero dependencies.

## The guarantee

`not_evidence_of(rung)` is exactly the set of claims **strictly above** the
rung on the evidence ladder. The ladder is cumulative: a receipt at rung R is
evidence of every claim at or below R (each rung presupposes the ones before
it) and is **not** evidence of anything above R. Because the forced set is a
pure function of the rung, two valid boundaries for the same rung are always
semantically identical — the `gloss` never matters.

The lie this closes: **exit code 0** and **"done"** being readable as
verification, review, CI, or merge. That invariant is pinned as
`EXIT_CODE_0_MUST_NOT_PROVE` and enforced by tests, so a future ladder
reorder cannot quietly reopen it.

## The ladder (normative — declaration order IS the ordering)

| Rung | Proves (cumulative) | `not_evidence_of` (forced) |
| --- | --- | --- |
| `prepared` | preparation | dispatch, execution, attestation, verification, review, ci, merge |
| `dispatched` | preparation, dispatch | execution, attestation, verification, review, ci, merge |
| `executed` | …execution | attestation, verification, review, ci, merge |
| `attested` | …attestation | verification, review, ci, merge |
| `verified` | …verification | review, ci, merge |
| `reviewed` | …review | ci, merge |
| `ci` | …ci | merge |
| `merged` | …merge | — (nothing left to disclaim) |

Do not reorder without a Founder ruling: every derived boundary, every stored
receipt, and every cross-surface comparison inherits its meaning from this
order. Reordering is a breaking change to every durable receipt ever written.

## Usage

```ts
import {
  makeClaimBoundary,      // derive the canonical boundary for a rung
  validateClaimBoundary,  // validate a durable receipt field (returns issues[])
  parseClaimBoundary,     // validate + return canonical form (throws typed)
  isClaimBoundary,        // type guard
  canonicalClaimBoundary, // rebuild in ladder order
  provenClaims,
  forcedNotEvidenceOf,
  EXIT_CODE_0_MUST_NOT_PROVE,
} from "@mad/claim-boundary";

// 1. Issuing a receipt: derive — never hand-write — the boundary.
const boundary = makeClaimBoundary("executed", "harness run finished, exit 0");
// → { rung: "executed",
//     not_evidence_of: ["attestation","verification","review","ci","merge"],
//     gloss: "harness run finished, exit 0" }

// 2. Reading a durable receipt: validate before trusting.
const issues = validateClaimBoundary(receipt.claim_boundary);
if (issues.length > 0) {
  // Refuse the receipt. Issue codes:
  //   MISSING_RUNG / UNKNOWN_RUNG          rung not in the closed set
  //   MISSING_NOT_EVIDENCE_OF / NOT_ARRAY  the declaration itself is absent
  //   UNKNOWN_CLAIM / DUPLICATE_CLAIM      vocabulary violations
  //   INCOMPLETE_NOT_EVIDENCE_OF           lie by omission — forced claims missing
  //   OVERBROAD_NOT_EVIDENCE_OF            contradiction — proven claims disclaimed
  //   GLOSS_NOT_STRING                     gloss must be a string (and is never semantic)
  //   UNKNOWN_FIELD                        fail-closed against stowaway data
}

// 3. Or parse: canonical form or a typed ClaimBoundaryError.
const canonical = parseClaimBoundary(JSON.parse(raw));
```

### Integration rule for every surface

Embed the boundary as a **field** on your receipt and validate that field —
never the whole receipt object:

```ts
const receipt = {
  /* custody, artifacts, hashes… */
  claim_boundary: makeClaimBoundary("attested"),
};
const issues = validateClaimBoundary(receipt.claim_boundary);
```

TUI, BR, FounderOS, and later Gateway all import this same package, so one
ladder — one vocabulary — governs every durable claim made anywhere.

## Design constraints (enforced by tests)

- **Closed enums only.** `EvidenceRung` and `EvidenceClaim` are const tuples;
  the types derive from them, and `RUNG_TO_CLAIM` is `satisfies`-checked so a
  rung cannot exist without its claim (or vice versa).
- **Forced by rung.** `not_evidence_of` must exactly equal the claims above
  the rung. Omission and contradiction are distinct, typed errors.
- **Gloss is never semantic.** A receipt claiming "fully verified and merged"
  in its gloss at rung `prepared` validates — as a `prepared` boundary — and
  proves exactly `preparation`. Enums are authoritative; prose is decoration.
- **Fail closed on ladder corruption.** Derivation and validation re-check the
  ladder's internal invariants and refuse to operate if it is broken.
- **Isolation.** Zero dependencies; source never imports broker, pty-host,
  adapters, or gateway-daemon (statically scanned).

## Commands

```bash
bun test packages/claim-boundary   # this package only
bun test                           # full repo suite (includes these tests)
bunx tsc --noEmit                  # typecheck (repo-wide hard gate)
```
