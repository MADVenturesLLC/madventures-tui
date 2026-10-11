FOUNDER-ACT-20261011-M16-CHECKPOINT-CLOSURE: the M16 review checkpoint closed on the accepted Task 37 review

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Closed at:** `6ef0f18408e39e9d1aa14137afb76d9c09580e16` (`origin/main` when drafted, the PR #134 merge commit)
> **Governs:** plan `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`, milestone M16, Task 37
> **Read with:** `DEC-20261010-03` (SHA-256 `b3af3e9b98381651aee31260759a886c0e1b232389ad5162f826608b4d8aef4c`) and its E7, `DEC-20261010-04` (SHA-256 `9cec4d8826d67cfa0bb64269b83ce5cc035a17e114aef30470fefd4ce6313272`), `DEC-20261010-02` (SHA-256 `cae5ac6b59618507f6ff3ef0f4d2cd5bca1909f328023248db8d234c4098b5a1`), `DEC-20261010-01` (SHA-256 `13e8f01c68ccbaadb614ef5a579487018cd03f4407fbb3ef228bda4a6e585432`) and its B2, plan sections 4 and 11.3

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What remains open.** Plan Task 37 ends by stopping for the M16 review checkpoint. `DEC-20261010-03` E7 rules that the task review of Task 37 is task-level, that Task 37 is the only task in M16, and that the checkpoint closes only by a separate Founder act. This is that act.

A2. **Task 37.** A `gemini-antigravity` review returned PASS at `6af09a91bd9f1d4a2b8129a51eb142a3991b6b48`, verdict text SHA-256 `3841221592796c3b573e308404de07667946154f4203f28092b9fb873d307f32`. `DEC-20261010-04` accepted it with its gaps recorded, and the text is posted on PR #134 as comment 6104947005. PR #134 merged as `6ef0f18408e39e9d1aa14137afb76d9c09580e16` on 2026-10-11 at 14:48:06Z. Its parents are `5d0d24bb57724574976b04486abafb7462d7ea6e` and the reviewed head, it changes exactly the six paths of `DEC-20261010-03` C1, its trailers parse, `attribution-shape-check.sh main` passes on it, and its three push runs succeeded.

A3. **The code on `main` is the code reviewed.** Between `6af09a91bd9f1d4a2b8129a51eb142a3991b6b48` and `6ef0f18408e39e9d1aa14137afb76d9c09580e16`, only four paths differ, all under `docs/`. Each of the six Task 37 files on `main` has the SHA-256 it has at the reviewed head.

A4. **The finding after the review.** After the review, Copilot's review of PR #134 found that `redact` replaces secret values one after another in text it has already changed, so a later secret value can match inside a `<redacted:NAME>` marker inserted for an earlier rule and then appear in the output. The drafting assistant confirmed the mechanism. In my merge authorization for PR #134, comment 6110189285, item 3, I ruled it a binding advisory, not fixed in that pull request, because both production allowlists have zero `secret: true` variables and no production call reaches that code. I replied on the thread, comment 4241977352, and resolved it. Copilot is not a reviewer that plan section 11.3 counts, and the Tier-2 review did not find it.

A5. **Why no further review.** M16 has one task. It was reviewed independently at its exact head, the verdict was accepted, and the code on `main` is the code reviewed. The finding in A4 is ruled and bound to a later trigger. A further milestone review would re-examine the same six files, and under `DEC-20261010-03` B10 any substantive finding in it would be round 4 under rubric milestone 4. I chose to close on the task review, as I did for M15 under `DEC-20261010-01` A5.

A6. **Process notes on PR #134.**

1. The guarded merge command was first run before the command that posts the merge authorization, replies and resolves the thread. It checked the run states, read the merge state as blocked, and stopped without posting or merging anything. The two commands then ran in their intended order.
2. My reply on the thread cancelled code-review run 38148347543 on its first attempt. It was re-run once under item 4 of my merge authorization and succeeded. Code-review runs 38142623930 and 38142624075, held for approval after Copilot's review, were never approved or run, as item 4 provides.

A7. **The drafting assistant.** It drafted this act and checked A2 and A3 against the repository and GitHub. It drafted the acts, prompts and authorizations of M16, and it confirmed the mechanism in A4. None of that is an independent review.

## Part B: Founder rulings

B1. **The M16 review checkpoint is closed** at `6ef0f18408e39e9d1aa14137afb76d9c09580e16`, on the accepted PASS verdict in A2 and the identity in A3. It adds no round. Rubric milestone 1 stays at **5** and rubric milestone 4 at **3**.

B2. **Advisories carried forward.** Each stays open for a later act to take up, and no code changes under this act:

1. **Redaction collision, binding.** Before any allowlist gains a `secret: true` variable, `redact` must replace in one pass over the original text, or be made collision-safe in another way, with a regression test in which a secret value equals another rule's name. The act that adds such a variable must cite this item and item 3 of comment 6110189285, and may not issue until that change is on `main`.
2. **Six Ubuntu host failures.** The six full-suite failures at the base on my Ubuntu PC, recorded under `DEC-20261010-04` B4, are taken up by a separate act before the Ubuntu spike run of `DEC-20261010-02` B2.
3. **The four advisories of `DEC-20261010-01` B2** stay open, unchanged.

B3. **The notes in A6 are accepted.** The first run in A6 item 1 changed nothing. The re-run in A6 item 2 is the one item 4 of my merge authorization provides, and is not precedent for any other pull request.

B4. **What this does not open.** Closing M16 meets the M16 dependency of M20 and M25 in the plan section 4 table, and authorizes nothing. Under `DEC-20261010-02` B6, the amendment of the spec, the plan and `PLAN-OPEN-2` for Linux, ratified by its own act, must be on `main` before Task 45 is authorized. Task 45 and every later task each need their own Founder act.

## Part C: Filing and recording

C1. One docs-only pull request files this act and appends an entry to `docs/verification/phase-3a-correction-rounds.md`, and changes nothing else. The entry records the closure at the head in B1, the verdict and its SHA-256, no round added, the counts unchanged, the advisories in B2 and the notes in A6.

## Part D: Not authorized

- Taking up any advisory in B2, including the change in B2 item 1.
- Any change to code, tests, `bun.lock`, a manifest, the plan, a spec or `PLAN-OPEN-2`.
- The Linux amendment of `DEC-20261010-02` B6, the Ubuntu spike run, Task 45 and every later task.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-11

Actor-Id: founder
