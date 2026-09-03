# DEC-20260903-01 — Task 26 M10 Review Precondition Waiver

**Status:** RATIFIED (Founder, 2026-09-03)
**Repository:** `MADVenturesLLC/madventures-tui`
**Ruling head at time of issuance:** `main` @ `3b684aad3ccce4abff193c8a5d9f0002687ac121` (tree `47cf6f7fb946e63b12db3308dd7ec0e7fb5a7905`)
**Provenance:** Delivered directly by the Founder (Michael Daley) as a written
ruling in a Claude Code session on 2026-09-03, titled "Founder Authorization —
Task 26 M10 review precondition waiver and decision-record transcription
(docs-only)". Part A of that act is transcribed verbatim below. This file exists
because Part B item 7 of the same act authorized it, following the pattern
established by [`DEC-20260831-01`](DEC-20260831-01-phase-3a-authority-drift-reconciliation.md)
for the 2026-08-31 ruling. It is not a PR- or issue-based artifact; no such
artifact existed for this ruling at time of writing.

---

## ⚠ Not precedent

Clause 3 of this ruling limits the record itself. It is reproduced here without
softening, ahead of the transcription, so that no later reader can cite this
decision as a general interpretive rule:

> This is not a general rule for interpreting, waiving, or superseding any other
> milestone or task precondition. Any future dependency conflict requires its own
> Founder ruling.

This record waives one precondition of one task. It resolves nothing else.

---

## Ruling (verbatim)

> ### Part A — Ruling: Task 26’s M10 review precondition
>
> 1. The Phase 3A plan records M11 as depending on M1 in its milestone dependency table, while Task 26 separately states “M10 reviewed.” This act resolves that conflict for Task 26 only.
>
> 2. I waive Task 26’s “M10 reviewed” precondition. M11 may begin from M1, subject to every other Task 26–28 requirement and checkpoint remaining in force.
>
> 3. This is not a general rule for interpreting, waiving, or superseding any other milestone or task precondition. Any future dependency conflict requires its own Founder ruling.
>
> 4. Task 29’s “M11 reviewed” precondition is not waived. Task 29 consumes M11’s storage interfaces and remains blocked until M11 has completed its review checkpoint.
>
> 5. No stub, placeholder, temporary, test-only, or relaxed storage-root validator is authorized. Task 27 must implement the single production validator and confirm that no relaxed test branch exists.

Clause numbers 1-5 were added for citation when the act was recorded. No wording
was changed.

---

## The conflict this ruling resolves

Both statements below are in the approved implementation plan
`docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`, which has
SHA-256 `14e913fa1833753b7c92031b5c7f44d2e0b54b63d8f879d8859c2858a2e267f8` at the
head named above, unchanged from the base of the Founder act of 2026-09-02.

| Plan location | Text |
| --- | --- |
| Line 321, milestone dependency table | `\| M11 \| Storage-root resolution, validation, permissions, rollback, retention \| 4 \| M1 \| One validator, no relaxed test path \|` |
| Line 1275, Task 26 Preconditions | `- M10 reviewed. \`packages/storage\` does not yet exist.` |

A Builder reaching Task 26 must halt on this under stop condition 1, which
reserves authority-bearing ambiguity touching storage to the Founder. Clause 2
resolves it for Task 26 and for no other task.

**This ruling does not amend plan text.** The plan file is not edited by the act
that authorized this record, and its digest above is the version the conflict was
found in.

---

## Independent verification

Performed against the live repository before this file was authored:

| Claim | Method | Result |
| --- | --- | --- |
| Ruling head and tree | `git rev-parse origin/main` / `origin/main^{tree}` | `3b684aa…` / `47cf6f7…`, matching the act's item 6 base at branch time |
| Plan digest | `git show 3b684aa:<plan> \| shasum -a 256` | `14e913fa…e267f8`, identical to the digest cited inside the 2026-09-02 act |
| Plan line 321 | `sed -n '321p'` | records M11 as depending on M1, as clause 1 states |
| Plan line 1275 | `sed -n '1275p'` | states "M10 reviewed", as clause 1 states |
| `packages/storage` is unbuilt | `git ls-tree origin/main packages/`; `git log --all -- packages/storage` | absent; zero commits on all fetched refs |
| Identifier `DEC-20260903-01` free | five-source search per `DEC-20260715-13` §13 against freshly fetched remotes, 55 refs here and 202 in FounderOS | zero hits in every source, both repositories, by path and by content |

---

## Status of dependent work

| Item | State under this ruling |
| --- | --- |
| M11 Tasks 26, 27, 28 | Unblocked as to the M10 precondition only. Each still requires its own Founder execution authorization at an exact base SHA. |
| M11 review checkpoint | **In force.** Plan Step 8 of Tasks 26, 27, and 28 stands as written. |
| Task 29 / M12 | **Blocked.** Clause 4. Task 29 consumes M11's storage interfaces and waits for the M11 review checkpoint. |
| Storage-root validator | Clause 5. One production validator, no stub, placeholder, temporary, test-only, or relaxed path, per plan §5.2 and Task 27 Step 6. |

Nothing in this ruling revokes or supersedes
[`DEC-20260812-01`](DEC-20260812-01-phase-3a-runtime-foundation-supersession.md),
[`DEC-20260831-01`](DEC-20260831-01-phase-3a-authority-drift-reconciliation.md),
[`DEC-20260903-02`](DEC-20260903-02-m13-task30-34-waiver-and-execution-authorization.md),
or any `PLAN-OPEN-*` ruling.
