FOUNDER-ACT-20261008-TASK35-THIRD-CORRECTION: Task 35 third correction, reassignment, technical assessment and re-review

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Pull request:** #119, branch `build/m15-task35-r1`, a draft
> **Correction base (PR head):** `de8854340a2ef649e4afb0904dcd2a42dd314241`
> **Task 35 binding base (unchanged):** `1f07d4db5fbac1a8854d967f2bd0bc610450bc11`
> **`origin/main` when drafted:** `b1ed48a9c9c50d34277f74c2743abc49607d66f6`
> **Read with:** `DEC-20261007-03` (SHA-256 `4d8b92adc0a70003af584e2e30fcc7a1c904423c2187219ae6d7b57a5a5a4868`), `DEC-20261007-02` (SHA-256 `73681d3111c65753927547cd7e5af6c68985beb8faa99d55190db773d6d7b046`), `DEC-20261007-01` (SHA-256 `2f51def55ee9313afb12aa9768efc62ef3a76c969784ccb42ad4f7f41690232b`), `DEC-20261006-01`, `DEC-20261005-01`, `DEC-20261004-03`, spec sections 6.7, 7.1, 7.6 and 7.7, plan sections 11.3 and 11.4

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The re-review failed.** The re-review required by `DEC-20261007-01` Part F inspected the exact head `de8854340a2ef649e4afb0904dcd2a42dd314241` under reviewer id `codex` and returned FAIL. The reviewer reports its model as the GPT-6 family with the exact variant unproven, and states that it did not author, plan or direct the work and was given no earlier Task 35 packet. It executed on macOS 27.0.1, build 26A434, arm64, with Bun 1.4.2: `tsc` exit 0, the focused file 12 pass with 1,117 assertions, the protocol suite 146 pass in 11 files, the full suite 1,571 pass and 0 fail in 96 files, the architecture tests 49 pass, `git diff --check` clean, exactly the two correction paths against `0528f788142e107a436266cf42005a1bf50f9bc7`, and exactly the three Task 35 paths against `origin/main`. Every required break failed test 7 alone, and each deliberate break of tests 1 to 4 failed exactly that test. Its verdict text has SHA-256 `2dff1c64c66dc1d256d1aa9d44bd217fd8b59ec73a5319c5ced846ad7a8a5a5e`, from my saved copy `/Users/michaeldaley/verdicts/m15-task35-codex-r3.md`.

A2. **Finding 1, substantive.** The correction tracks the parser's own rejection in a module variable that every exported function sets. Input code can therefore obtain a genuine rejection from another exported function and have the parser pass it through as its own. In the reviewer's input, a `Proxy` over one of the three arrays has a `length` trap that replaces `Array.prototype.push`; the replacement restores the original, calls `evaluateCapabilityFreshness` with an invalid `now`, catches the rejection, sets its message to a value of the record and rethrows it. The caller receives that same error, kind `invalid_now`, field `now`, with the record's content as its message. The same happens for `role_eligibility`, `limitations` and `redaction_rules_applied`, and with a rejection obtained from `capabilityRecordFilename`. All twelve tests pass with this behavior. It breaches `DEC-20261007-01` B3 and `DEC-20261005-01` B3 as `DEC-20261006-01` B1 reads it.

A3. **The same defect after a claimed correction.** Each of the three earlier verdicts found that an exception raised while the parser inspects its input reaches the caller with content the input chose. Each correction was made to close that defect, and the re-review finds it again, by the same description, through a path the correction left open. Spec section 7.6 requires reassignment when the same substantive defect recurs after a claimed correction.

A4. **What the head got right.** The 33 escapes of the second verdict are contained at the head. The reviewer's 282-case matrix gives 177 contained, 105 unused and 0 escaped. All 390 ordinary cases of its 574-case ledger have identical results at both heads, and accepted results are deeply frozen, share nothing with their input and leave it unchanged.

A5. **Findings 2 and 3, advisory.** Finding 2 is the filename defect that `DEC-20261006-01` B2 disposes of, unchanged. Finding 3: three further implementations pass all twelve tests: removing the clearing in `probe()`, moving the length comparison back outside `probe()`, and removing the validation of `requested_model`. The first two are the routes of finding 1 and are pinned by B6 below. The third is a coverage gap no act requires closing.

A6. **The builders.** `session:claude-code/m15-task35-r1` reported Claude Opus 5.5, `session:claude-code/m15-task35-r2` Claude Opus 5, and `session:claude-code/m15-task35-r3-opus` Claude Opus 5.5. All three are Claude models, and all three rounds failed on the same class of defect.

A7. **Deviations in the last round, recorded.** (a) The builder session's first turn ran on `claude-sonnet-5-5`. It stopped before running any command, and I switched the same session to Claude Opus 5.5, which did the work. (b) Claude Code's permission check blocked the builder's push, and I ran the push myself. (c) I marked PR #119 ready for review at 2026-10-08T09:52:57Z without a ready-for-review act and returned it to draft at 09:55:39Z. (d) My approval review `5440139473` on `0528f788142e107a436266cf42005a1bf50f9bc7`, at 2026-10-07T09:12:46Z, was given before that head's re-review. The push of `de8854340a2ef649e4afb0904dcd2a42dd314241` dismissed it. (e) The builder made read-only GitHub API calls and one fetch beyond `DEC-20261007-03` B4. None of these changed the head under review or authorized anything.

A8. **The drafter.** The drafting assistant is a Claude Code session. The builder prompt it wrote for the last round suggested a module-wide record of the parser's own rejections, which shares the weakness of finding 1. It is not the reviewer, and nothing it checked is an independent review.

A9. This act governs the third correction where its terms conflict with `DEC-20261007-03`, `DEC-20261007-02`, `DEC-20261007-01`, `DEC-20261006-01`, `DEC-20261005-01` or `DEC-20261004-03`. Every clause of those acts not changed here stands. This act does not authorize Task 36 or any later task.

## Part B: Founder rulings

B1. **Round count.** The FAIL in A1 is a substantive finding on a conforming re-review. Under `DEC-20261007-01` B10 it is round 5 under rubric milestone 1 and round 3 under rubric milestone 4. Findings 2 and 3 are advisory and are not a round. Rubric milestone 1 stands at 5. Rubric milestone 4 stands at 3. Under `DEC-20261007-03` B3 this round is entered against Claude Opus 5.5 in any qualification record for it.

B2. **Reassignment.** `session:claude-code/m15-task35-r3-opus` is reassigned, on the round count in B1 and on the recurrence in A3. The third correction is made by a new Codex session with Actor-Id `session:codex/m15-task35-r4`, on the execution surface `codex`, running the GPT model the Codex harness serves. Its model family is none of the three earlier implementers'. The session has done no work on Task 35 and has not taken part in any of its reviews. It reports its harness and model exactly as the harness shows them, and the strings it reports are the record of what ran. If the harness is not Codex, or the model is not a GPT model, it stops before any other command and reports. Plan section 11.4 applies the section 7 rubric to it in full from this assignment. The rounds in B1 were found against other builders' commits and are not attributed to it.

B3. **Technical assessment (spec section 7.1).** The code at the correction base is sound apart from finding 1. The re-review passed items 1, 3, 4, 5, 6 and 7, and finding 1 is confined to how the parser recognizes its own rejections. That code is preserved, and the correction replaces no more of it than B5 needs.

B4. **Reviewer.** The re-review in Part F is made by a Gemini model in an Antigravity session under reviewer id `gemini-antigravity`, the independent Tier-2 reviewer spec section 6.7 names. The reviewer is of a family that built no part of Task 35.

B5. **The correction.** Each call of `parseCapabilityRecord` decides whether a thrown value is a rejection it raised itself from state created for that call alone, reachable from nothing outside that call. A thrown value passes unchanged only if that call raised it. A rejection raised by any other call, of `evaluateCapabilityFreshness`, of `capabilityRecordFilename`, of another `parseCapabilityRecord`, nested or earlier, is replaced as `DEC-20261007-01` B3 rules: kind `schema`, naming the container being inspected, with no part of it attached or quoted. No module-level variable may take part in that decision. Every other requirement of `DEC-20261007-01` B3 stands. The bodies of `evaluateCapabilityFreshness` and `capabilityRecordFilename` do not change, and each returns and throws exactly what it does at the correction base.

B6. **How the correction is pinned.** `DEC-20261004-03` C2 stands: exactly twelve tests with the same names. New assertions go inside test 7 and nowhere else, and every existing assertion stays:

- (a) for each of `role_eligibility`, `limitations` and `redaction_rules_applied`, a record whose value there is a `Proxy` over a valid array whose `length` trap replaces `Array.prototype.push` with a function that restores the original, obtains a rejection from `evaluateCapabilityFreshness` with an invalid `now`, sets its message to a value of the record and throws it; and separately the same with a rejection obtained from `capabilityRecordFilename`. Each is rejected as kind `schema`, field that array's name, the error is not the thrown value, and the record value appears in neither its message, its stack nor any own property. The test restores `Array.prototype.push` whatever the outcome;
- (b) for one of the three arrays, a `length` whose `valueOf` throws, in turn, a rejection obtained from `evaluateCapabilityFreshness`, one from `capabilityRecordFilename`, one captured from an earlier call of `parseCapabilityRecord`, and one from a `parseCapabilityRecord` call made inside the conversion. Each is rejected the same way.

`DEC-20261007-01` Part H is amended to permit exactly these assertions.

B7. Any other defect found while correcting, including the coverage gap for `requested_model` in A5, is reported, not fixed.

B8. **Pushing and the description edit.** If the harness blocks the builder's push or the agent identity for `gh` is unavailable, the builder stops after its commit and reports, with the PR description it prepared saved outside the repository. I may then run the push and apply that description myself, and that is not a deviation. The builder never works around a block.

B9. **Deviations in A7.** I record them. They authorized nothing and change no round. I will not again mark PR #119 ready or approve it without a separate act naming its exact head.

B10. **The next finding.** If the re-review in Part F returns any substantive finding, that verdict is round 6 under rubric milestone 1 and round 4 under rubric milestone 4. Reassignment is required under both, and I rule before anything else is done.

## Part C: Authorized scope

C1. One new commit on top of `de8854340a2ef649e4afb0904dcd2a42dd314241`, on `build/m15-task35-r1`, pushed as a fast-forward. No amend, rebase, force-push, empty commit or merge of `main`. It changes exactly these two paths and no others:

- `packages/protocol/src/capability-record.ts`
- `packages/protocol/test/capability-record.test.ts`

C2. `DEC-20261004-03` C3 and C4 stand. `packages/protocol/src/index.ts` and every other path stay byte-identical to the correction base. No new dependency, export, registry, storage, I/O, clock read or second authority.

## Part D: Verification

D1. **Before the first edit,** re-fetch and stop and report unless all of these hold:

- (a) PR #119's head is `de8854340a2ef649e4afb0904dcd2a42dd314241`, and the branch has exactly three commits after `3a576dcd8b377668f6eb926397fb9a6cd88c1411`;
- (b) every path changed between `1f07d4db5fbac1a8854d967f2bd0bc610450bc11` and `origin/main` is under `docs/decisions/`, is `docs/verification/phase-3a-correction-rounds.md`, or is `AGENTS.md`;
- (c) this act is on `origin/main` with its status line reading ISSUED, a signed Part I, and no bracketed marker or blank signature line left in it;
- (d) the PR is still a draft, and the verdict in A1 is posted on it as G2 requires;
- (e) on `origin/main`, `DEC-20261007-03`, `DEC-20261007-02` and `DEC-20261007-01` have the SHA-256 values in this act's header;
- (f) at the correction base, `packages/protocol/src/capability-record.ts` has SHA-256 `38fc1808c96e5772808970beb42b36b988a42d178bc55f2feffd178271373b77` and `packages/protocol/test/capability-record.test.ts` has SHA-256 `bbe907a8d26867182ab6a5489e6326ad3a382757cc18e8cf45db8a9b2cffdd3d`.

D2. **Baseline at the correction base,** recorded verbatim: `bunx tsc --noEmit`, `bun test packages/protocol/test/capability-record.test.ts`, `bun test packages/protocol` and bare `bun test`. Expected: `tsc` exits 0, 12 passing in the focused file, `146 pass`, `0 fail`, 11 files in the protocol suite, and on macOS `0 fail` in the full suite. The builder reports its host, Bun version and any difference.

D3. **RED proof.** Write the B6 assertions first. Run the focused file against the unmodified source at the correction base and record the output verbatim. Each B6(a) assertion must fail there, and the builder proves each separately with an uncommitted probe. The B6(b) assertions may pass there; for each, the builder says which. After the correction passes, the builder records these deliberate breaks, each restored afterwards with the file's SHA-256 checked, and none committed: return to one module-level record of the parser's own rejection, shared with the other exported functions: test 7 fails; recognize the parser's own rejections by class: test 7 fails; remove the containment boundary: test 7 fails; and each break of `DEC-20261007-01` D3 again: test 7 fails each time.

D4. **After implementation:**

```bash
bunx tsc --noEmit
bun test packages/protocol/test/capability-record.test.ts
bun test packages/protocol
bun test
git diff --check
git diff --name-only de8854340a2ef649e4afb0904dcd2a42dd314241
git diff --name-only origin/main...HEAD
```

`tsc` exits 0. The focused file shows exactly 12 passing. The protocol suite shows `146 pass`, `0 fail`, 11 files. The full suite shows `0 fail`, including the architecture tests. `git diff --check` is clean. The first changed-path list is exactly the two C1 paths. The second is exactly the three paths of `DEC-20261004-03` C1.

D5. **Probe matrix.** The builder runs, at the correction base and at its own head, the 282-case matrix and the additional cases of the second verdict, the cases of finding 1 of the verdict in A1, and cases of its own for every route by which input code can obtain or replay a rejection of this module, and reports both. Every case the correction base contains or accepts has the same result at the new head. Each case of finding 1 is a `schema` rejection naming its container, with no part of the thrown value in the error.

D6. The PR description is edited once, after the push. It keeps all existing content. It gains one section, "Correction round 5", with a table that maps finding 1 and each of B5 and B6 to the assertion or check that pins it and to the new commit SHA, and it ends with the E1 trailers in place of the previous trailer lines.

D7. Before committing, the builder re-reads its own diff: whether any value outside the current call can still be recognized as that call's own rejection; whether any operation on the input, or on any value obtained from it, runs outside the boundary; whether any input's result changed other than by B5; whether the new error carries any part of the original; and whether the twelve tests keep their names and existing assertions.

## Part E: Builder binding and delivery

E1. Assign:

```text
Role-Id: builder
Actor-Id: session:codex/m15-task35-r4
Execution-Surface: codex
```

E2. Work in `/Users/michaeldaley/madventures-tui-m15-task35-r4`, a clean, detached worktree of this repository at `de8854340a2ef649e4afb0904dcd2a42dd314241` created for this act. Reuse no earlier worktree.

E3. Commit subject:

```text
fix(protocol): scope capability parse rejections to their own call
```

The commit and the PR description end with the E1 trailers, each line 72 characters or shorter. No Co-Authored-By line names a model that did not do the work.

E4. The builder reports its harness and model as the harness shows them, the commit SHA, the D2 baseline, the D3 RED proof and breaks, the D4 results, the D5 probe results, the D6 table, the D7 findings, the required-check state, what left the machine, and that the re-review is pending the Founder. It stops there.

E5. **Transmission.** The builder's inference runs on OpenAI, the model provider of the `codex` surface. Beyond that, only the fetches D1 requires, the one push in C1 and the one description edit in D6 leave the Founder's host. The builder reads no file outside its worktree other than the three verdict files the Founder names and the probe files it creates. It reads nothing under `~/.secrets`, `~/.ssh` or `~/.madmik3-quarantine`, and runs no command that prints an environment variable, a token or a key. It starts no subagent and uses no web search, web fetch or other model or service. It posts no comment or review, changes no thread, does not review its own work, and does not merge or deploy.

## Part F: Re-review

F1. Before PR #119 leaves draft, a non-authoring review under reviewer id `gemini-antigravity` inspects the exact head after the correction commit, in a session that has not been given a prior packet for Task 35. Its packet is that of `DEC-20261007-01` F1, with `DEC-20261007-02`, `DEC-20261007-03` and this act added, the diff of the third correction commit alone from `de8854340a2ef649e4afb0904dcd2a42dd314241`, and the verdict in A1 as a third verdict file, each verdict checked against `docs/verification/phase-3a-correction-rounds.md` on `main`.

F2. The nine items of `DEC-20261007-01` F2 stand, and a tenth: **each call of the parser recognizes only its own rejections, as B5 rules; B6 is pinned inside test 7; and the reviewer reruns the cases of finding 1 of the verdict in A1 and tries every other route by which input code can obtain, replay or forge a rejection of this module, each of which must now be contained or fail a test.** The verdict is PASS only if all ten pass.

F3. The reviewer states what it executed and what it only read. The verdict is recorded on PR #119 with the reviewer id and the exact head SHA, and entered in `docs/verification/phase-3a-correction-rounds.md` under plan milestone M15 and rubric milestones 4 and 1.

## Part G: Filing and recording

G1. This act lands in one docs-only pull request that changes only this file and `docs/verification/phase-3a-correction-rounds.md`. The round-log entry records the verdict in A1: the reviewer id and its self-reported model, the target head, the SHA-256 of the verdict's text from my saved copy, the finding, that it counts as round 5 under rubric milestone 1 and round 3 under rubric milestone 4 under B1, the recurrence in A3, the reassignment in B2, the technical assessment in B3, the deviations in A7, and that findings 2 and 3 are advisory and not a round.

G2. The verdict in A1 is posted verbatim on PR #119 as one comment, with the head SHA and the SHA-256 of its text, by a session I direct, once G1's pull request is merged and before the correction builder starts. It is posted alone, and nothing else is posted or edited on PR #119 around it.

## Part H: Not authorized

- Leaving draft, approving or merging PR #119: each needs a separate Founder act naming the exact head.
- Any correction by `session:claude-code/m15-task35-r1`, `session:claude-code/m15-task35-r2` or `session:claude-code/m15-task35-r3-opus`, and any builder work by a Hermes session.
- Any change beyond B5 and B6, and any change to the bodies of `evaluateCapabilityFreshness` or `capabilityRecordFilename`, or to `index.ts`.
- Any test beyond the twelve in `DEC-20261004-03` C2.
- Any ruling on Phase 3B qualification beyond B1 and B2.
- Task 36, M15 closure, and every later task.
- Any edit to a spec, the plan, `PLAN-OPEN-3` or any decision record other than filing this act.
- Running the re-review.

## Part I: Signature

Signed:

— Michael Daley

Date: 2026-10-08

Actor-Id: founder
