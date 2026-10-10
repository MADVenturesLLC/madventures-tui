FOUNDER-ACT-20261010-M15-CHECKPOINT-CLOSURE: the M15 review checkpoint closed on the two accepted task reviews

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Closed at:** `28ce9bf9272a5ff864469081704a855a22f3027f` (`origin/main` when drafted, the PR #129 merge commit)
> **Governs:** plan `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`, milestone M15, Tasks 35 and 36
> **Read with:** `DEC-20261008-03` (SHA-256 `b71ce3d6976fd631f89ee999cb23d0c1c34ea417d4ae99da570fa2fba81d84e0`), `DEC-20261009-01` (SHA-256 `e89851d98f08d03377ea80608e066e81f6f8a701771a56ee1e9ee91f287970a1`) and its E7, `DEC-20261009-02` (SHA-256 `28bf10115f0f1e13c9ba3d4c1a1a4af5524733f6baf0721d45b57ba6d7ea467b`), plan sections 4 and 11.3

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What remains open.** Plan Tasks 35 and 36 each end by stopping for the M15 review checkpoint. `DEC-20261009-01` E7 rules that the task review of Task 36 is task-level, and that the checkpoint covers both tasks and closes only by a separate Founder act. This is that act.

A2. **Task 35.** A `gemini-antigravity` review returned PASS at `35b8b96c8e8636304df4836c85d4f534c9be579d`, verdict text SHA-256 `414d1e5b9ba9dfa0351d0b2b9308067797bb28894dcdc21200ab4eb070c67b13`. `DEC-20261008-03` accepted it, and the text is posted on PR #119 as comment 6072025028. PR #119 merged as `e649e10ffb72cfdc0cf3ff832650e487a91a3353`. Only paths under `docs/` differ between the reviewed head and that merge commit.

A3. **Task 36.** A `gemini-antigravity` review returned PASS at `64c9a7b1c5914dfae1dde8b5103963ff8b4e4518`, verdict text SHA-256 `ece8da6e31979cdb93a9a66527b01df314af65cb5280a72499f6f1937ab5a69d`. `DEC-20261009-02` accepted it, and the text is posted on PR #129 as comment 6092093313. PR #129 merged as `28ce9bf9272a5ff864469081704a855a22f3027f` on 2026-10-10 at 02:18:21Z. Its parents are `24b971126ee5bdf399904508fb34b3ea4afc109d` and the reviewed head, it changes exactly the seven paths of `DEC-20261009-01` C1, its trailers parse, `attribution-shape-check.sh main` passes on it, and its three push runs succeeded.

A4. **The code on `main` is the code reviewed.** Between `64c9a7b1c5914dfae1dde8b5103963ff8b4e4518` and `28ce9bf9272a5ff864469081704a855a22f3027f`, only three paths differ, all under `docs/`. Every other path on `main` is the tree the Task 36 reviewer checked out. That tree contains Task 35's code as merged, with only the B7 filename fix on top, which the Task 36 review covers in its item 6. The Task 36 reviewer ran the full suite on it at 1,578 pass and 0 fail in 97 files, on macOS with Bun 1.4.2.

A5. **Why no further review.** M14 closed on a fresh milestone review, because its acceptance act required one and named open questions: a merge-order question, unruled findings and an untested scan. M15 has none of those. Both tasks were reviewed independently at their exact heads, both verdicts were accepted with their gaps recorded, and the code on `main` is the code reviewed. A further review would re-examine the same code, and under `DEC-20261009-01` B9 any substantive finding in it would be round 6 under rubric milestone 1. I chose this course over a fresh review on 2026-10-10.

A6. **Process notes on the M15 pull requests.**

1. On PR #130 the merge authorization, comment 6090565987, and the thread reply, comment 4235189873, were not posted by the guarded command. The reply equals the signed text apart from Windows line endings. The authorization has the same words as the signed text, but it lost the numbers 1 to 8 of its list, joined its two header lines into one, and turned the pull request reference into a link.
2. On PR #128 and PR #129, a thread reply started the required `code-review` check twice, and one run was cancelled at once. GitHub then refused the merge. Each time I re-ran only the cancelled run, once (runs 37922419382 and 38014307907), and merged after it succeeded and the merge state was clean.

A7. **The drafting assistant.** It drafted this act and checked A2 to A4 against the repository and GitHub. It wrote the prompts for both reviews. None of that is an independent review.

## Part B: Founder rulings

B1. **The M15 review checkpoint is closed** at `28ce9bf9272a5ff864469081704a855a22f3027f`, on the two accepted PASS verdicts in A2 and A3 and the identity in A4. It adds no round. Rubric milestone 1 stays at **5** and rubric milestone 4 at **3**.

B2. **Advisories carried forward.** Each stays an advisory, no code changes under this act, and each is open for a later act to take up:

1. The setter case of `DEC-20261008-02` A1, advisory under its B3.
2. The coverage gap for the validation of `requested_model`, `DEC-20261008-01` A5.
3. No test fails if `capability-store.ts` reads the clock, `DEC-20261009-02` A3 and B4.
4. The path race on PR #129: a process running as the store's owner, or as root, can swap a directory under the storage root between validation and use. My merge authorization for PR #129, comment 6092313604, item 3, ruled it advisory and carried it here. The milestones that add process containment weigh it.

B3. **Discharged.** With Task 36 on `main`, `DEC-20261006-01` B2 is discharged and the filename advisory of `DEC-20261008-03` B4 is closed, as `DEC-20261009-02` B5 provides.

B4. **The notes in A6 are accepted.** The comment in A6 item 1 stays as posted, and it is not posted again; the signed text is the record. From here on, a Founder comment is posted only by the guarded command that checks its hash. The re-runs in A6 item 2 are not precedent for re-running any other check.

B5. **What this does not open.** M16 depends on M2 and M15. Closing M15 meets that dependency, and authorizes nothing. Task 37 and every later task each need their own Founder act. Plan section 4 maps M16 to rubric milestone 4, which stands at 3 against a budget of two. The act that authorizes Task 37 rules the builder and reviewer with that count in view.

## Part C: Filing and recording

C1. One docs-only pull request files this act and appends an entry to `docs/verification/phase-3a-correction-rounds.md`, and changes nothing else. The entry records the closure at the head in B1, the two verdicts and their SHA-256 values, no round added, the counts unchanged, the advisories in B2, the discharge in B3 and the notes in A6.

## Part D: Not authorized

- Task 37, M16 and every later task.
- Any change to code, tests, `bun.lock`, a manifest, the plan or a spec.
- Taking up any advisory in B2.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-10

Actor-Id: founder
