# DEC-20261017-04 — Amendment 2: B7 authorship — a ratified design note, not an architect's spec

Act identifier: `FOUNDER-ACT-20261018-DEC-20261017-04-AMENDMENT-2`

**Status:** ISSUED — filed 2026-10-18
**Repository:** `MADVenturesLLC/madventures-tui`
**Amends:** `DEC-20261017-04` (`FOUNDER-ACT-20261017-NATIVE-AGENT-V0`), merged on `main` as
`227ae15a205b5197a95ca605e0f1cd97d0f345ac` — **clause B7 only**.
**Provenance:** the Founder's signed instrument is the custody file
`decisions/DRAFT-AMENDMENT-2-DEC-20261017-04-b7-design-authorship-2026-10-18.md` (sha256 `10c47b595ea25707e423985490f601c848177058611a721f8ff8f2f558b8c475`),
filed on the Founder's instruction of 2026-10-18.

I, Michael Daley, Founder of MAD Ventures, rule as follows.

======================================================================
AUTHORITY AND SUBJECT
======================================================================

Amends:    `DEC-20261017-04` (act `FOUNDER-ACT-20261017-NATIVE-AGENT-V0`), merged on
           `MADVenturesLLC/madventures-tui` `main` as `227ae15a205b5197a95ca605e0f1cd97d0f345ac`
           (PR #165). **Clause B7 only.**
Basis:     the Founder's ruling of 2026-10-18, taken on the orchestrator's stated recommendation (option A).
Effect:    on filing, B7 reads as amended below. No other clause changes.

======================================================================
WHY
======================================================================

B7 required the specification and implementation plan to be *"authored by this repository's architect
role under its own process."* Two facts made that unexecutable as written:

  1. **This repository has no architect seat.** Its process is: the Founder authorizes, a builder agent
     CLI implements, a Tier-2 reviewer checks. No role authors plans in it.
  2. **The Build Room is not that role.** Its `br-architect` governs a different product; the
     orchestrator's attempt to use it was wrong and was stopped before it wrote anything (Amendment 1,
     A3).

Rather than invent a seat to satisfy a sentence, this amendment changes the sentence.

======================================================================
CLAUSE B7 AMENDED
======================================================================

**B7. Design authorship and ratification.** Before stage N1 is authorized, a **one-page surface design**
for the native agent is **authored by the orchestrator and ratified by the Founder**. It must state: the
interaction surface, the session and persistence model, the turn loop, the four tools with the policy
check and ledger record each produces, the approval boundary, the credential path, and v0's acceptance in
a form a third party could check.

  - **The spec-plus-implementation-plan cycle is not required for v0.** If a later stage needs a full
    specification — for instance if the credential path or the permission model is reworked — that stage
    carries one, and B7 as amended here applies to it again.
  - **Independent verification applies to N1's code, not to the design note.** The note is one page,
    the direction it implements is already the Founder's, and spending a seat plus a review cycle on it
    would be ceremony without a defect to catch.
  - **B7's prohibition stands.** The orchestrator does not implement. The builder implements; the
    orchestrator's authorship is confined to the note, and to filings the Founder authorizes.
  - **Ratification is the Founder's act.** A drafted note authorizes nothing until he ratifies it, and
    the ratification is recorded against the note's sha256.

======================================================================
ISSUANCE
======================================================================

Filed by the Founder, Michael Daley, on ____________________.
Drafted by `cos-orchestrator` on 2026-10-18. Drafting this text authorizes and signs nothing.
