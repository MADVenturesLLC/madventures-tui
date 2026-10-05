FOUNDER-ACT-20261005-TASK35-CORRECTION: Task 35 correction, reassignment and re-review

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Pull request:** #119, branch `build/m15-task35-r1`
> **Correction base (PR head):** `16e2f1f9ab3a8984576a934823eb88dbde8522a2`
> **Task 35 binding base (unchanged):** `1f07d4db5fbac1a8854d967f2bd0bc610450bc11`
> **`origin/main` when drafted:** `3a576dcd8b377668f6eb926397fb9a6cd88c1411`
> **Read with:** `DEC-20261004-03` (the Task 35 execution authorization, SHA-256 `a891f892e13a4fec8ef8bab7968ec9ba1b8aacfbe74150d0a768df21059f7cbe`), `PLAN-OPEN-3`, plan sections 4, 11.3 and 11.4

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The independent review failed.** The Part E review required by `DEC-20261004-03` inspected the exact head `16e2f1f9ab3a8984576a934823eb88dbde8522a2` under reviewer id `codex` and returned FAIL. The reviewer reports its model as the GPT-6 family with the exact variant unproven, and states that it did not author, plan or direct the work. It executed the D4 commands on macOS 27.0.1, arm64, with Bun 1.4.2: `tsc` exit 0, the focused file 12 pass, the protocol suite 146 pass in 11 files, the full suite 1571 pass and 0 fail, and a deliberate break for each of tests 1 to 4 that failed exactly that test.

- Items 1, 3, 4 and 5 returned PASS.
- Item 2 returned FAIL on finding 1.
- Items 6 and 7 returned FAIL because the literal command in `DEC-20261004-03` D4 lists four paths against the binding base, not three. The reviewer states that this is a conflict in the act's text and not a defect of the builder's. Against the PR base `3a576dcd8b377668f6eb926397fb9a6cd88c1411` the changed paths are exactly the three C1 paths.

A2. **Finding 1, substantive.** `parseCapabilityRecord` lets exceptions other than `CapabilityRecordError` escape while it inspects its input, against `DEC-20261004-03` B3, which requires every input that is not exactly the record shape to be rejected by throwing `CapabilityRecordError`:

- a revoked `Proxy` passed as the whole input escapes as a `TypeError`;
- a `Proxy` in `host` whose `getPrototypeOf` trap throws escapes as that trap's own error, so text the trap chose, in the reviewer's probe a copy of `identity_attestation.sanitized_facts`, reaches the caller in the error message, against the intent of B5.

All twelve tests pass at the head with this behavior. The drafter reproduced both cases at the head on Linux with Bun 1.3.11, and also an escaping plain `Error` from a `Proxy` in `pty` whose `ownKeys` trap throws.

A3. **Findings 2 and 3, advisory.** The reviewer showed that an implementation that drops the `provider` equality check, or the role membership and uniqueness checks, or the finiteness and non-negativity checks on `pty.observed_ms`, still passes all twelve tests. The head enforces all three correctly. `DEC-20261004-03` D5 makes the missing `provider` test advisory. The reviewer classified the other two as advisory because no C2 or D5 test requires them.

A4. **The builder.** The Task 35 implementer was `session:claude-code/m15-task35-r1`. Its pull request body states that it ran on Claude Opus 5.5 (`claude-opus-5-5`). That is the session's own report.

A5. **Rounds.** `DEC-20261004-03` B10 counts a substantive finding on Task 35 under both rubric milestones 4 and 1. Before this verdict the log recorded rubric milestone 1 at 2 of 2 and no round under rubric milestone 4. Plan section 11.3 requires reassigning the implementer at more than two rounds on one rubric milestone.

A6. This act governs the Task 35 correction where its terms conflict with `DEC-20261004-03`. Every clause of `DEC-20261004-03` not changed here stands. This act does not authorize Task 36 or any later task.

## Part B: Founder rulings

B1. **Round count.** The FAIL in A1 is a substantive finding on a conforming Part E review. One verdict adds at most one round to each rubric milestone it affects. It is round 3 under rubric milestone 1 and round 1 under rubric milestone 4. Items 2, 6 and 7 are part of one verdict and count once. The failures of items 6 and 7 rest on the act's own D4 text, which B7 corrects, and are not a builder defect. Findings 2 and 3 are advisory and are not a round. Rubric milestone 1 stands at 3. Rubric milestone 4 stands at 1.

B2. **Reassignment.** The implementer of Task 35, `session:claude-code/m15-task35-r1`, is reassigned. The correction is made by a new session with Actor-Id `session:claude-code/m15-task35-r2`, running on Claude Opus 5, the model plan section 11.4 names as the provisional primary implementer. The Founder makes this choice knowing that Claude Opus 5 implemented the Task 60 correction round 1 under rubric milestone 1 before the Founder reassigned that correction author to Hermes. Plan section 11.4 applies the section 7 rubric in full to it. The new session has done no work on Task 35 or Task 60 and does not reuse the worktree of any earlier session. It reports the model its harness shows. If that is not Claude Opus 5, it stops before its first edit and reports.

B3. **Containment.** `parseCapabilityRecord` never lets any exception other than `CapabilityRecordError` escape, for any input. Any exception raised while it inspects its input or any value reachable from it, including a prototype lookup, an array test, a key enumeration, a property read and any `Proxy` trap, is rejected as `CapabilityRecordError` of kind `schema`. Its `field` is the schema name of the container being inspected when the exception was raised: `record` for the input itself, otherwise that container's path, such as `host`, `pty`, `pty.observed_ms` or `role_eligibility`. The original exception is not attached as `cause` or as any other property, and no part of its message appears in the new error. Nothing else changes: every input the correction base accepts is still accepted with an identical result, and every input it rejects with `CapabilityRecordError` is still rejected with the same kind and field.

B4. **How containment is pinned.** `DEC-20261004-03` C2 stands: exactly twelve tests with the same names, and no other test. The correction is pinned by assertions added inside test 7, `a passing record is not a live authorization`, and nowhere else:

- a revoked `Proxy` as the whole input is rejected as kind `schema`, field `record`;
- a record whose `host` is a `Proxy` with a throwing `getPrototypeOf` trap is rejected as kind `schema`, field `host`, and the trap's error text, set to a value of the record, appears in neither the error's message, its stack nor any own property;
- a record whose `pty` is a `Proxy` with a throwing `ownKeys` trap is rejected as kind `schema`, field `pty`;
- a record whose `role_eligibility` is a revoked `Proxy` is rejected as kind `schema`, field `role_eligibility`.

B5. **Coverage for findings 2 and 3.** Assertions are also added inside test 7 for behavior the correction base already enforces:

- for every registration, a record whose `provider` differs from the registration's is rejected as kind `registration_mismatch`, field `provider`;
- a record with a repeated role, and one with a role outside `KNOWN_ROLES`, are each rejected as kind `schema`, field `role_eligibility`;
- a record with a negative, a `NaN` and an infinite `pty.observed_ms` value are each rejected as kind `schema`, field `pty.observed_ms`.

These close the gaps the reviewer demonstrated. Findings 2 and 3 stay advisory and add no round, because plan section 11.3 does not count a supplementary test that confirms behavior already correct.

B6. The twelve tests keep their names and every existing assertion. `evaluateCapabilityFreshness`, `capabilityRecordFilename` and `packages/protocol/src/index.ts` do not change.

B7. **Reading of `DEC-20261004-03` D4.** The changed-path check in D4 and review items 6 and 7 are read against `origin/main`, not against the binding base. Decision records and the rounds log that reach `main` after the binding base, as D1(b) allows, are not part of the builder's change. For this correction the checks are the two in D4 below.

B8. Any other defect found while correcting is reported, not fixed.

## Part C: Authorized scope

C1. One new commit on top of `16e2f1f9ab3a8984576a934823eb88dbde8522a2`, on `build/m15-task35-r1`, pushed as a fast-forward. No amend, rebase, force-push, empty commit or merge of `main`. It changes exactly these two paths and no others:

- `packages/protocol/src/capability-record.ts`
- `packages/protocol/test/capability-record.test.ts`

C2. `DEC-20261004-03` C3 and C4 stand. `packages/protocol/src/index.ts` and every other path stay byte-identical to the correction base. No new dependency, export, registry, storage, I/O, clock read or second authority.

## Part D: Verification

D1. **Before the first edit,** re-fetch and stop and report unless all of these hold:

- (a) PR #119's head is `16e2f1f9ab3a8984576a934823eb88dbde8522a2`, and the branch has exactly one commit after `3a576dcd8b377668f6eb926397fb9a6cd88c1411`;
- (b) every path changed between `1f07d4db5fbac1a8854d967f2bd0bc610450bc11` and `origin/main` is under `docs/decisions/`, is `docs/verification/phase-3a-correction-rounds.md`, or is `AGENTS.md`;
- (c) this act is on `origin/main` with its status line reading ISSUED, a signed Part I, and no bracketed placeholder or blank signature line left in it;
- (d) the PR is still a draft, and the verdict in A1 is posted on it as G2 requires;
- (e) `docs/decisions/DEC-20261004-03-task35-execution-authorization.md` on `origin/main` has SHA-256 `a891f892e13a4fec8ef8bab7968ec9ba1b8aacfbe74150d0a768df21059f7cbe`;
- (f) at the correction base, `packages/protocol/src/capability-record.ts` has SHA-256 `3a914893372e08b99f19bddbca4f8ca88a1961cabedd49f5551be92e590288e2` and `packages/protocol/test/capability-record.test.ts` has SHA-256 `92d488e463db7bbc65a110ade99d6a598983718b72e02e5bb3f45b2773a0dc65`.

D2. **Baseline at the correction base,** recorded verbatim: `bunx tsc --noEmit`, `bun test packages/protocol/test/capability-record.test.ts`, `bun test packages/protocol` and bare `bun test`. Expected: `tsc` exits 0, 12 passing in the focused file, `146 pass`, `0 fail`, 11 files in the protocol suite, and on macOS `0 fail` in the full suite. The builder reports its host, Bun version and any difference.

D3. **RED proof.** Write the B4 and B5 assertions first. Run the focused file against the unmodified source at the correction base and record the output verbatim. Each B4 assertion must fail there. The B5 assertions are expected to pass there, because the behavior is already correct; for each, the builder says so. Then, after the correction passes, the builder records these deliberate breaks of the implementation, each restored afterwards with the file's SHA-256 checked, and none committed:

- remove the containment, so a `Proxy` exception escapes: test 7 fails;
- remove the `provider` equality check: test 7 fails;
- remove the role membership check, and separately the role uniqueness check: test 7 fails each time;
- remove the finiteness check, and separately the non-negativity check, on `pty.observed_ms`: test 7 fails each time.

D4. **After implementation:**

```bash
bunx tsc --noEmit
bun test packages/protocol/test/capability-record.test.ts
bun test packages/protocol
bun test
git diff --check
git diff --name-only 16e2f1f9ab3a8984576a934823eb88dbde8522a2
git diff --name-only origin/main...HEAD
```

`tsc` exits 0. The focused file shows exactly 12 passing. The protocol suite shows `146 pass`, `0 fail`, 11 files. The full suite shows `0 fail`, including the architecture tests. `git diff --check` is clean. The first changed-path list is exactly the two C1 paths. The second is exactly the three paths of `DEC-20261004-03` C1.

D5. The PR description is edited once, after the push. It keeps all existing content. It gains one section, "Correction round 3", with a table that maps finding 1 and each of B3, B4 and B5 to the assertion or check that pins it and to the new commit SHA. Each edit or comment on the PR re-triggers the code-review check, so the builder makes this one edit, posts no comment, changes no thread, and reports the check states without re-running anything.

D6. Before committing, the builder re-reads its own diff: whether any inspection of the input can still raise an exception that escapes, whether any input's result changed other than by B3, whether the new error carries any part of the original exception, and whether the twelve tests keep their names and existing assertions.

## Part E: Builder binding and delivery

E1. Assign:

```text
Role-Id: builder
Actor-Id: session:claude-code/m15-task35-r2
Execution-Surface: claude-code
```

E2. Work in a clean, isolated worktree created for this act at `16e2f1f9ab3a8984576a934823eb88dbde8522a2`. Do not reuse `/Users/michaeldaley/madventures-tui-m15-task35` or any other earlier worktree.

E3. Commit subject:

```text
fix(protocol): reject capability input whose inspection throws
```

The commit and the PR description end with the E1 trailers, each line 72 characters or shorter.

E4. The builder reports its model as its harness shows it, the commit SHA, the D2 baseline, the D3 RED proof and breaks, the D4 results, the D5 table, the D6 findings, the required-check state, and that the re-review is pending the Founder. It stops there.

## Part F: Re-review

F1. Before PR #119 leaves draft, a non-authoring review under reviewer id `codex` inspects the exact head after the correction commit. It runs in a session that has not been given a prior packet for Task 35. The packet contains this act, `DEC-20261004-03`, `PLAN-OPEN-3` and `docs/decisions/PLAN-OPEN-approval-record.md`, all read from `main`, the plan's Task 35 section and sections 4, 11.3 and 11.4, spec sections 2.3, 5.1, 5.5 and 9.1, and:

- the full diff from `1f07d4db5fbac1a8854d967f2bd0bc610450bc11` to that head, and from `3a576dcd8b377668f6eb926397fb9a6cd88c1411` to that head;
- the diff of the correction commit alone, from `16e2f1f9ab3a8984576a934823eb88dbde8522a2` to that head;
- the three files of `DEC-20261004-03` C1 at that head, with line numbers;
- `adapter-registry.ts`, `normalization.ts`, `surface-id.ts` and the `KNOWN_ROLES` definition in `task-envelope.ts` at that head;
- the admission-list scan in `test/phase3a/architecture-phase3a.test.ts`;
- the verdict text in A1, verbatim.

The person assembling the packet confirms every governing act above is on `main` first.

F2. The seven items of `DEC-20261004-03` E6 stand, with items 6 and 7 read as B7 rules, and an eighth: **every exception raised while the parser inspects its input is rejected as B3 rules, B4 and B5 are pinned inside test 7, and the reviewer reruns the probes of finding 1 and the three test-defeating variants of findings 2 and 3, each of which must now fail a test.** The verdict is PASS only if all eight pass.

F3. The reviewer states what it executed and what it only read. The verdict is recorded on PR #119 with the reviewer id and the exact head SHA, and entered in `docs/verification/phase-3a-correction-rounds.md` under plan milestone M15 and rubric milestones 4 and 1.

F4. If the re-review returns any substantive finding, that verdict is round 4 under rubric milestone 1 and round 2 under rubric milestone 4. Reassignment of the implementer is required again before any further correction, and the Founder rules before anything else is done.

## Part G: Filing and recording

G1. This act lands in one docs-only pull request that changes only this file and `docs/verification/phase-3a-correction-rounds.md`. The round-log entry records the verdict: the reviewer id and its self-reported model, the target head, the SHA-256 of the verdict's text from the Founder's saved copy, the finding, that it counts as round 3 under rubric milestone 1 and round 1 under rubric milestone 4 under B1, that items 6 and 7 rest on the act's D4 text, the reassignment in B2, and that findings 2 and 3 are advisory and not a round.

G2. The verdict in A1 is posted verbatim on PR #119 as one comment, with the head SHA and the SHA-256 of its text, by a session the Founder directs, once G1's pull request is merged and before the correction builder starts. It is posted alone, and nothing else is posted or edited on PR #119 around it.

## Part H: Not authorized

- Leaving draft and merging PR #119: each needs a separate Founder act naming the exact head.
- Any correction by the session `session:claude-code/m15-task35-r1`.
- Any change beyond B3 to B5, and any change to `evaluateCapabilityFreshness`, `capabilityRecordFilename` or `index.ts`.
- Any test beyond the twelve in `DEC-20261004-03` C2.
- Task 36, M15 closure, and every later task.
- Any edit to a spec, the plan, `PLAN-OPEN-3` or any decision record other than filing this act.
- Running the re-review.

## Part I: Signature

Signed:

— Michael Daley

Date: 2026-10-05

Actor-Id: founder
