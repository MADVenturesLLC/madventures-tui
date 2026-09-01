# DEC-20260831-01 — Phase 3A Authority and Drift Reconciliation

**Status:** RATIFIED (Founder, 2026-08-31)
**Repository:** `MADVenturesLLC/madventures-tui`
**Ruling head at time of issuance:** `main` @ `6f2994c509fcfedc74f3784a558d06bf4a3c3ba2`
**Provenance:** Delivered directly by the Founder (Michael Daley) as a written
ruling in a Claude Code review session (title: "Founder Ruling — Phase 3A
Authority and Drift Reconciliation", dated 2026-08-31), in response to a
findings review of stale-documentation and decision-status drift on this
repository. This file transcribes that ruling verbatim into repository-local,
citable provenance, per the pattern already established by
[`PLAN-OPEN-approval-record.md`](PLAN-OPEN-approval-record.md) for the
2026-08-15/18 PLAN-OPEN rulings. It is not a PR- or issue-based artifact; no
such artifact exists for this ruling at time of writing.

---

## Ruling (verbatim)

> ### Founder Ruling — Phase 3A Authority and Drift Reconciliation
> Date: 2026-08-31
>
> 1. DEC-20260812-01 is RATIFIED and ACTIVE.
>
>    Founder approval occurred at PR #9 head
>    c23cd46d501813185087c27cbe81fd89b9ee3a33, merged as
>    aa16032c56fdf6c7105e99b1765ed9365d605bf4.
>
>    The in-file Pending/NO-GO wording is stale metadata. It does not
>    retrospectively invalidate task-specific authorizations, reviews,
>    merges, or M17-M19 solely because the header was not updated.
>
> 2. The Phase 3A specification and implementation plan are APPROVED.
>
>    The plan was approved at PR #10 head
>    1b46856a646266d3c7eb9882cc74f0c5f9f4cfb5 and merged as
>    70c6a2359feb88cc4e3cc21301e18221313f6f8e.
>
>    The historical Founder-approved IMPLEMENTATION_BASE_SHA is
>    70c6a2359feb88cc4e3cc21301e18221313f6f8e.
>
>    Plan approval is not blanket implementation authority. Each task
>    remains subject to separate Founder authorization.
>
> 3. PLAN-OPEN-4 and PLAN-OPEN-6 remain active and controlling.
>
>    They are not superseded by M17-M19. Task 34 must be completed before
>    M20 or Phase 4.
>
>    The August 15/18 documentation ratification does not itself authorize
>    Task 34 execution. A new exact-base Task 34 authorization is required.
>
> 4. Correct PR #35 append-only.
>
>    Preserve the original paragraph as an initial-head statement. Record
>    that it described eb7a02d and was no longer accurate at final head
>    8585177, which included subsequently authorized signals.ts work.
>
>    Do not amend, replace, or rewrite merged Git history.
>
> 5. Add Intel CI in a separate future PR.
>
>    Use a distinct Verify (macOS Intel) job on macos-15-intel. Preserve
>    the existing Verify and Verify (macOS) check names. Do not change
>    branch protection in the same PR.
>
> 6. Close issue #18 only after posting a final completion comment stating
>    that closure is administrative and does not revoke or supersede any
>    ratification.
>
> 7. PLAN-OPEN-5 was withdrawn.
>
>    Its settled TUI language is a Phase 3A implementation-scope boundary,
>    not a repository-wide freeze. PR #29 is treated as separately
>    authorized corrective maintenance and is not retrospectively ruled
>    out of policy.
>
> Execution order:
>
> - Complete the active Task 44 lane first.
> - Do not widen or repurpose PR #37.
> - Then prepare a docs-only authority-reconciliation change.
> - Before any Task 34 edit, report:
>   - the exact clean main SHA;
>   - the current full-plan SHA-256;
>   - the Task 34 section SHA-256;
>   - its comparison against the ratified Revision 5.12 plan content;
>   - the exact proposed file scope.
> - Stop for my exact Task 34 execution authorization.
>
> Do not execute Task 34, modify CI, close issue #18, alter PR #35,
> begin M20, or begin Phase 4 under this ruling alone.

---

## Independent verification (performed before this file was authored)

Every SHA cited in the ruling was checked directly against repository git
history and the GitHub API prior to acting on it:

- `aa16032c56fdf6c7105e99b1765ed9365d605bf4` — confirmed via `git show`: the
  real merge commit for PR #9, parents `0b942771fc07e5eb05203b1d3d641d3e8ad101f1`
  (base) and `c23cd46d501813185087c27cbe81fd89b9ee3a33` (PR #9 head).
- `70c6a2359feb88cc4e3cc21301e18221313f6f8e` — confirmed via `git show`: the
  real merge commit for PR #10, parents `aa16032c56fdf6c7105e99b1765ed9365d605bf4`
  (base) and `1b46856a646266d3c7eb9882cc74f0c5f9f4cfb5` (PR #10 head). It is an
  ancestor of `main` at the ruling's issuance head (`6f2994c`), 126 commits back.
- PR #37 (`docs: add AGENTS.md, CODEOWNERS, SECURITY.md, and CONTRIBUTING.md`)
  exists, is scoped to exactly those four files, and explicitly excludes
  README/STATUS drift repair and any Task 44 branch interaction — consistent
  with clause "Do not widen or repurpose PR #37."

## What this ruling authorizes in this PR

This decision record itself, and the following stale-metadata corrections it
licenses under clauses 1 and 2 (status text only — no decision content,
no task execution, no CI change):

- `docs/decisions/DEC-20260812-01-phase-3a-runtime-foundation-supersession.md`
  — status line updated from "Pending Founder ratification" to "RATIFIED",
  citing this record.
- `docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md`
  — status line updated to reflect Founder approval at the cited SHA.
- `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`
  — "Implementation status" and `IMPLEMENTATION_BASE_SHA` updated to reflect
  clause 2, with the "not blanket implementation authority" caveat preserved
  verbatim.

Clauses 3–7 are recorded here for provenance but are **not** executed by this
PR: no Task 34 edit, no CI change, no issue #18 closure, no PR #35 alteration,
no M20/Phase 4 work. Each remains gated exactly as the ruling states.
