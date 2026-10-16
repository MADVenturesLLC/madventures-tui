FOUNDER-ACT-20261015-PHASE-3A-PROCESS: milestone authorizations, folded closures, batched filing, the ready step and parallel lanes

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `1ee5a1d5c37fb2c1a77f8b9bf952179c3530f438`
> **Governs:** how Phase 3A acts are filed and pull requests readied and merged from the day this act is signed, and how tasks from Task 24 and M22 onward are authorized
> **Read with:** `AGENTS.md`, its approval gates; spec §§6.7, 7.2 and 7.3; plan sections 4 and 11.3; `DEC-20260924-03` (SHA-256 `653d2b226cefd5c198486b49c0c9c1779fa3c57da41be4e3684dd68b43e5ff1c`) B3; `DEC-20261013-02` (SHA-256 `c8bc56bf1c716711e12ed38d6a7590108a80d0fb1f655d71d4b77f02b12acf26`) B3; `DEC-20261014-01` (SHA-256 `f1f2bd610b444103bb16c3c2ce48f15be186b428bdb6c5e1e56c1b98f55338cd`)

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The pace.** From 2026-10-01 to the commit in the header, `main` took 43 merge commits. Thirty changed only paths under `docs/`, and thirteen changed code, tests or workflows. Five plan tasks reached `main` in that time: Tasks 34, 35, 36, 37 and 45. Each act, each milestone closure and each task's pull request needed its own pull request and its own ready and merge comments.

A2. **What is left.** Sixteen plan tasks remain: Tasks 24 and 25, which `DEC-20260924-03` B3 placed after M21 and before M22, and Tasks 46 to 59.

A3. **What does not change.** These stay in force:

- the approval gates of `AGENTS.md`: each task starts only from a written authorization naming its base SHA and scope, and each merge needs a separate authorization naming the exact head;
- spec §6.7: one primary implementer owns a milestone, and every review verdict pins an exact SHA;
- spec §7.3 and plan §11.3: round counting;
- every task's independent Tier-2 review at its exact head, before its pull request leaves draft.

A4. **The drafting assistant.** It drafted this act after counting the merges of A1 with `git log` and reading the documents in the header at the commit in the header. None of that is an independent review.

## Part B: Founder rulings

B1. **Milestone authorizations.** From Task 24 and M22 on, one execution authorization may cover every task of a milestone, and the one for M22 may also cover Tasks 24 and 25. It rules on each task's gaps, paths, verification and review as a single-task act does now. Each task still starts only from a builder prompt I sign that names its binding base and that act; the act and the prompt together are the task's written authorization under `AGENTS.md`. Each task lands as its own pull request, with its own Tier-2 review at its exact head and its own merge authorization. A finding on one task does not reopen another, and rounds are counted per verdict as spec §7.3 says.

B2. **Folded closures.** A milestone review checkpoint may be closed by a ruling inside the next act I sign, rather than by an act of its own. That ruling names the accepted verdicts, the merge commit it closes at, the counts and the advisories it carries, as a closure act does now. The rounds-log entries it directs are appended in the pull request that files it.

B3. **Batched filing.** One docs-only pull request may file every act I have signed since the last filing, with the rounds-log entries they direct. Its filing prompt names each act and each entry by transfer commit and SHA-256. Every act is on `main` before any task it governs starts.

B4. **The ready step.** No ready-for-review authorization comment is posted. A pull request leaves draft only by my guarded command, which marks it ready only when all of these hold, and stops otherwise:

1. its head is the head the filing or builder report named;
2. every required check, and the attribution-shape check, succeeded on that head;
3. GitHub reports it mergeable with no conflict;
4. where its act requires a review before it leaves draft, the verdict comment naming that reviewer id and that head is posted.

The merge authorization records everything a ready-for-review authorization recorded, and every gap or deviation in the work.

B5. **The merge authorization.** It still names the exact head and is posted before the merge. It may cite the pull request body and the verdict comment by id and head instead of restating them. It rules on every review finding, records the checks on the head, and states its effect and what it does not authorize.

B6. **Parallel lanes.** Milestones whose dependencies in plan section 4 are met may run at the same time, each from its own act, on different hosts or in different clones. When `main` moves after a pull request's checks ran, the pull request is brought up to date by one merge commit of `main` and no other change, made through GitHub's update-branch call with the expected head, and its checks run again on the new head, as `DEC-20261013-02` B3 allowed for pull request 143. The Tier-2 verdict on the reviewed head stands for the new head only if that merge commit changes no path in the task's scope; the merge authorization names both heads and records that check.

B7. **Drafting record.** Every act the drafting assistant drafts states, in its basis, the spec, plan and act sections its rulings were checked against, and every ruling that changes how an earlier act is read names that act and clause.

B8. **When each ruling applies.** B1 applies from Task 24 and M22 on. B2 to B7 apply from the day I sign this act, to the pull request of C1 and to every pull request open or opened after it, including those of Task 46 and Task 56.

B9. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. It adds no round, and every count stands as the rounds log records it.

## Part C: Filing

C1. One docs-only pull request files this act and `DEC-20261015-04`, each byte for byte from its transfer blob, and changes nothing else. Under B8 it leaves draft by the guarded command of B4, and merges under my separate merge authorization naming its exact head.

## Part D: Not authorized

- Any change to `AGENTS.md`, the spec, the plan, a workflow or any earlier act's text.
- Dropping or shortening any Tier-2 review, any check or any merge authorization.
- Starting any task, including Task 24, Task 25 and every task of M22, before its own act and builder prompt.
- Squash, rebase or auto merges, or any merge that is not pinned to its head.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-15

Actor-Id: founder
