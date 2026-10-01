FOUNDER-ACT-20261001-TASK23-CORRECTION: Task 23 correction, round 3 and reassignment

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Pull request:** #108, branch `build/m10-task23-r1`
> **Correction base (PR head):** `0e5a930d9ba02522030356264ec4dfa6d727bf77`
> **Task 23 binding base (unchanged):** `ed853080a4bea377c2f5cf274c90f740ab1c9cac`
> **`origin/main` when drafted:** `6327f397d95d697f2daca63e18d85fed53c20c3b`
> **Read with:** `DEC-20260930-02` (the Task 23 execution authorization), `DEC-20260930-01`, `DEC-20260929-02`, `DEC-20260929-01`, `DEC-20260926-01`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The independent review failed.** The Part E review required by `DEC-20260930-02` inspected the exact head `0e5a930d9ba02522030356264ec4dfa6d727bf77` and returned FAIL. The reviewer id is `chatgpt-5.6-sol`. The review was static and read only the packet; the reviewer executed nothing. The packet had SHA-256 `8da30e6decc2a4e4f79c89ff88638cc6ed1a9fb84d267ed4a7a2c1a02360ed02` and contained every document `DEC-20260930-02` E5 requires, each read from `main`.

- Items 1, 2, 3, 5 and 6 returned PASS.
- Items 4 and 7 returned FAIL. The reviewer states that they are two mappings of one underlying finding, not two defects.

A2. **The finding.** `unsafeTestOnlyIngestOutputFrame` is the Task 22 test-only helper. `DEC-20260930-02` B7 requires it to keep its "exact signature and behavior". At the reviewed head:

- `ingestOutputFrame` is declared `async` (`packages/broker/src/in-process-client.ts` line 252).
- The stamped seam calls it as `void ingestOutputFrame(...)` (line 378), and the helper returns nothing (lines 412 to 417).
- At the binding base the same seam did its work directly inside a synchronous function (`packages/broker/src/in-process-client.ts` at `ed853080a4bea377c2f5cf274c90f740ab1c9cac`, lines 227 to 244), so an exception raised while ingesting the frame, such as the one `new Uint8Array(bytes)` raises for a value that is not valid bytes, reached the caller as a synchronous throw.
- At the reviewed head the closed-client error and the no-session error still throw synchronously, because they come before the discarded call. Any other exception raised inside `ingestOutputFrame` becomes a rejected promise that nothing awaits. The caller sees a normal return and the failure becomes an unhandled rejection.

On the success path the frame is still queued and delivered before the helper returns. The five Task 22 tests do not exercise the exception path. Reading the source at both commits confirms the mechanism.

A3. **The packet conformed.** The review is a Part E verdict, not a review on an incomplete packet.

A4. **An advisory finding.** The reviewer reports, as advisory, that no named test exercises output regression, snapshot duplicate or snapshot gap. `DEC-20260930-02` D5 says the shared check covers them and that a reviewer reports this as advisory and not as a failure of item 1.

A5. **Rounds.** `DEC-20260930-02` B8 carries the milestone-7 round count into Task 23. Rubric milestone 7 stood at 2 of 2 (`DEC-20260930-01` B1). Plan §11.3 requires reassigning the implementer at more than two rounds.

A6. This act governs the Task 23 correction where its terms conflict with `DEC-20260930-02`. Every clause of `DEC-20260930-02` not changed here stands. This act does not authorize any later task.

## Part B: Founder rulings

B1. **Round count.** The FAIL in A1 is a substantive finding on a conforming Part E review. It is round 3 for rubric milestone 7. Items 4 and 7 are one finding and count once. The advisory finding in A4 is not a round. Rubric milestone 7 stands at 3.

B2. **Reassignment.** The implementer of Task 23, `session:claude-code/m10-task23-r1`, is reassigned. The correction is made by a new session with Actor-Id `session:claude-code/m10-task23-r2`. That session has done no work on Task 22 or Task 23 and does not reuse the worktree of any earlier session.

B3. **What "exact behavior" means in `DEC-20260930-02` B7.** `unsafeTestOnlyIngestOutputFrame` is synchronous from its call to its return. Its frame is checked, queued and delivered before it returns, as at the binding base. It creates no promise and discards none. Every exception raised while ingesting its frame propagates to its caller as a synchronous throw, as at the binding base. This clarifies B7. It does not rule on the partial state a failed ingest leaves, and no test is to assert that state.

B4. **How the correction is made.** The shared check and the queue-and-deliver step run synchronously. Only the interruption is asynchronous. The shape is the builder's choice, provided all of these hold:

- (a) the stamped helper's path creates no promise;
- (b) `unsafeTestOnlyIngestRawOutputFrame` and `unsafeTestOnlyOfferSnapshotSeq` still follow `DEC-20260930-02` B5 exactly: `interrupt` is called first and awaited, then the rejection is raised, and an offending frame is never queued, delivered or accepted;
- (c) `getSnapshot()` and `snapshots()` keep their results and their timing;
- (d) the stamped helper stamps the durable `sessionId` and the next `outputSeq` itself, so its frame cannot violate the check. If the shared check reports a violation for it anyway, which is unreachable by construction, the helper throws a plain `Error` synchronously. It does not call `interrupt` and it creates no promise.

B5. **How the correction is pinned.** `DEC-20260930-02` C2 stands: nine tests in all, the five Task 22 tests and the four named Task 23 tests, and no other test. The correction is pinned by assertions added inside one of the four Task 23 tests, and not inside a Task 22 test. The assertions are:

- a call to the stamped helper with valid bytes returns `undefined` and not a promise, and its frame is already queued when it returns;
- a call to the stamped helper whose ingest throws, for example by passing a value that makes `new Uint8Array(bytes)` throw, throws synchronously to its caller, and the test observes it with a synchronous `toThrow` and not with an awaited rejection;
- the same call leaves no unhandled rejection.

B6. The five Task 22 tests keep their names and assertions. The four Task 23 tests keep their names and their existing assertions. The namespace import for the new helpers stays.

B7. **The advisory finding.** A4 stays advisory. This act changes no test for it.

## Part C: Authorized scope

C1. One new commit, on top of `0e5a930d9ba02522030356264ec4dfa6d727bf77`, on `build/m10-task23-r1`, pushed as a fast-forward. No amend, rebase, force-push, empty commit or merge of `main`. It changes exactly these two paths and no others:

- `packages/broker/src/in-process-client.ts`
- `packages/broker/test/in-process-client.test.ts`

C2. `DEC-20260930-02` C3 and C4 stand. `client.ts`, `snapshot.ts`, `command-legality.ts`, `ownership-machine.ts`, `runtime-broker.ts`, `index.ts` and every path in `packages/protocol` and `packages/ledger` stay byte-identical to the binding base. No new dependency, socket, daemon, registry, callback, cache, timer or second authority. `index.ts` still exports nothing new.

## Part D: Verification

D1. **Before the first edit,** re-fetch and stop and report unless all of these hold:

- (a) PR #108's head is `0e5a930d9ba02522030356264ec4dfa6d727bf77`, and the branch has exactly one commit after `ed853080a4bea377c2f5cf274c90f740ab1c9cac`;
- (b) every path changed between `ed853080a4bea377c2f5cf274c90f740ab1c9cac` and `origin/main` is under `docs/decisions/` or is `docs/verification/phase-3a-correction-rounds.md`;
- (c) this act is on `origin/main` with its status line reading ISSUED, a signed Part I, and no bracketed placeholder or blank signature line left in it;
- (d) the PR is still a draft;
- (e) `docs/decisions/DEC-20260930-02-task23-execution-authorization.md` on `origin/main` has SHA-256 `cf8d1b6a6b37faddcfe764f121b196fea5fd7c4f45a841d6926896065f34b693`.

D2. **Baseline at the correction base,** recorded verbatim: `bunx tsc --noEmit`, `bun test packages/broker/test/in-process-client.test.ts` and `bun test packages/broker`. Expected: `tsc` exits 0, 9 passing in the focused file, and `261 pass`, `0 fail`, `14 files` in the broker suite. The builder reports any difference.

D3. **RED proof.** Write the B5 assertions first. Run the focused file against the unmodified sources at the correction base. Record each failure verbatim. For any assertion that cannot fail on the old code, say which one and why.

D4. **After implementation:**

```bash
bunx tsc --noEmit
bun test packages/broker/test/in-process-client.test.ts
bun test packages/broker
bun test
git diff --check
git diff --name-only ed853080a4bea377c2f5cf274c90f740ab1c9cac
git diff --name-only 0e5a930d9ba02522030356264ec4dfa6d727bf77
```

`tsc` exits 0. The focused file shows exactly 9 passing. The broker suite shows `261 pass`, `0 fail`, `14 files`. The full suite shows `0 fail`. `git diff --check` is clean. Both changed-path lists are exactly the two C1 paths.

D5. The PR description is edited once, after the push. It keeps all existing content. It gains one section, "Correction round 3", with a table that maps the finding in A2 and each of B3, B4 and B5 to the assertion or check that pins it and to the new commit SHA. Each edit or comment on the PR re-triggers the code-review check, and overlapping runs cancel one another, so the builder makes this one edit, posts no comment, changes no thread, and reports the check states without re-running anything.

D6. Before committing, the builder re-reads its own diff once per surface: whether any path of the stamped helper creates or discards a promise, whether `DEC-20260930-02` B5 still holds for the two other helpers, and whether the five Task 22 tests and the four Task 23 tests keep their names and existing assertions.

## Part E: Builder binding and delivery

E1. Assign:

```text
Role-Id: builder
Actor-Id: session:claude-code/m10-task23-r2
Execution-Surface: claude-code
```

E2. Work in a clean, isolated worktree created for this act at `0e5a930d9ba02522030356264ec4dfa6d727bf77`. Do not reuse the worktree of the first attempt or any retained worktree.

E3. Commit subject:

```text
fix(broker): keep the stamped ingest helper synchronous
```

The commit and the PR description end with the E1 trailers, each line 72 characters or shorter.

E4. The builder reports the commit SHA, the D2 baseline, the RED proof verbatim, the D4 results, the D5 table, the D6 findings, the required-check state, and that the re-review is pending the Founder. It stops there.

## Part F: Re-review

F1. Before PR #108 leaves draft, a non-authoring review under reviewer id `chatgpt-5.6-sol` inspects the exact head after the correction commit. It runs in a session that has not been given a prior packet for this head. The packet contains this act, `DEC-20260930-02`, `DEC-20260926-01`, `DEC-20260929-01`, `DEC-20260929-02`, `DEC-20260930-01` and `DEC-20260924-03`, all read from `main`, and:

- the full diff from `ed853080a4bea377c2f5cf274c90f740ab1c9cac` to that head;
- the diff of the correction commit alone, from `0e5a930d9ba02522030356264ec4dfa6d727bf77` to that head;
- `in-process-client.ts` and its test at that head, with line numbers;
- `client.ts`, `snapshot.ts`, `command-legality.ts` and `runtime-broker.ts` at that head;
- the ledger source that defines `Ledger.readAfter()`, and `packages/protocol/src/lifecycle-events.ts`;
- the verdict text in A1, verbatim, and A2 to A4 above.

The person assembling the packet confirms every governing act above is on `main` first.

F2. The seven items of `DEC-20260930-02` E6 stand, with an eighth: **the stamped helper is synchronous as B3 and B4 rule: it creates no promise, its frame is queued and delivered before it returns, and an exception raised while ingesting its frame propagates synchronously.** The verdict is PASS only if all eight pass. The reviewer reports A4 as advisory again.

F3. The reviewer states what it executed and what it only read. The verdict is recorded on PR #108 with the reviewer id and the exact head SHA, and entered in `docs/verification/phase-3a-correction-rounds.md`.

F4. If the re-review returns any substantive finding, that verdict is round 4. Reassignment of the implementer is required again before any further correction, and the Founder rules before anything else is done.

## Part G: Filing and recording

G1. This act lands in one docs-only pull request that changes only this file and `docs/verification/phase-3a-correction-rounds.md`. The round-log entry records the round 3 verdict: the reviewer, the target head, the packet SHA-256, the SHA-256 of the verdict's text from the Founder's saved copy, the finding, that it counts as round 3 under B1, that rubric milestone 7 stands at 3, the reassignment in B2, and that A4 is advisory and not a round.

G2. The verdict in A1 is posted verbatim on PR #108 as one comment, with the head SHA and the SHA-256 of its text, by a session the Founder directs, once G1's pull request is merged and before the correction builder starts. It is posted alone, and nothing else is posted or edited on PR #108 around it.

## Part H: Not authorized

- Leaving draft, the M10 review checkpoint, and merging PR #108: each needs a separate Founder act naming the exact head.
- Any correction by the session `session:claude-code/m10-task23-r1`.
- Any change beyond the finding in A2: another defect found while correcting is reported, not fixed.
- Any test beyond the nine in `DEC-20260930-02` C2.
- Tasks 24 and 25, and any later task.
- A production `OutputFrame` producer, and any caller of the two test-only helpers outside tests.
- Exporting any new symbol from `index.ts`.
- Any edit to a spec, the plan or any decision record.
- Running the re-review.

## Part I: Signature

Signed:

— Michael Daley

Date: 2026-10-01

Actor-Id: founder
