FOUNDER-ACT-20260930-TASK23-EXECUTION-AUTHORIZATION: Phase 3A M10 Task 23, sequence invariants as typed interruptions

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Binding base:** `ed853080a4bea377c2f5cf274c90f740ab1c9cac` (`origin/main` when drafted)
> **Governs:** plan `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`, Task 23
> **Read with:** `DEC-20260926-01`, `DEC-20260929-01`, `DEC-20260929-02`, `DEC-20260930-01`, `DEC-20260924-03`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **Task 22 is merged.** PR #102 merged at `84f247c61116a47e5c575c963002f245465063b5`. `DEC-20260930-01` clarified B3. The M10 checkpoint stays open for Tasks 23 to 25. `DEC-20260924-03` B3 moves Tasks 24 and 25 after M21.

A2. **The plan.** Task 23 modifies `packages/broker/src/in-process-client.ts` and its test. It adds `SequenceInvariantError` (`kind`: `session_mismatch`, `duplicate`, `regression`, `gap`; `stream`: `snapshot`, `output`) and, on any violation, calls `RuntimeBroker.interrupt` with `snapshot_sequence_invariant_failed` or `output_sequence_invariant_failed` before the offending frame is delivered. It has four named tests and expects 9 passing in the focused file.

A3. **`snapshotSeq` is a number.** `DEC-20260924-03` B2 has Task 22 stamp it. Task 23 never sees null.

A4. **Three gaps in the plan text, ruled in Part B.** Read against `main` at the binding base:

- The only output ingest path, `unsafeTestOnlyIngestOutputFrame(client, executionId, bytes)`, stamps `sessionId` and `outputSeq` itself. A test cannot inject a gap, a duplicate or a foreign `sessionId` through it. The client also stamps `snapshotSeq` from its own counter, so a regression cannot occur without an injection path.
- `RuntimeBroker.interrupt(reason, detail, severity, incidentId, sourceEventId, reportedBy)` is async and needs an `incidentId`. The plan names no source for it.
- The plan says the violation is raised and the interruption recorded "before the frame is delivered". The existing ingest path is synchronous.

A5. **Rounds.** Rubric milestone 7 stands at 2 of 2 (`DEC-20260930-01` B1). The correction-rounds log records that the next substantive independent verdict is round 3 and requires reassigning the implementer.

## Part B: Founder rulings

B1. **Two validators, no new state elsewhere.** `in-process-client.ts` keeps, inside the client closure, the last accepted `snapshotSeq` (the existing `deliveredSeq`) and the last accepted `outputSeq` per execution (the existing `outputSeqs`). One check per stream compares an offered sequence with the last accepted one:

- offered equals last: `duplicate`;
- offered is below last: `regression`;
- offered is above last plus one: `gap`;
- offered equals last plus one: accepted, and it becomes the last accepted.

The last accepted sequence is 0 before anything is accepted, on the snapshot stream and on each execution's output stream. The first offered sequence must therefore be 1: an offered 0 is a `duplicate` and a negative value is a `regression`.

B2. **Session mismatch.** An output frame whose `sessionId` differs from `broker.snapshotProjectionInput().lifecycle.sessionId` raises `session_mismatch` on stream `output`. The snapshot stream raises `duplicate`, `regression` and `gap` only.

B3. **Reason code follows the stream.** Every `kind` on stream `output` interrupts with `output_sequence_invariant_failed`. Every `kind` on stream `snapshot` interrupts with `snapshot_sequence_invariant_failed`.

B4. **The interrupt call.** `interrupt(reason, detail, "high", incidentId, null, null)`. `detail` names the stream, the kind, the last accepted sequence and the offered sequence, and never includes frame bytes. `sourceEventId` and `reportedBy` are null because the client detected the violation and no execution reported it.

`incidentId` is `incident-` followed by `crypto.randomUUID()`, created fresh for each violation. It needs no shared counter and no second authority. Tests assert the value is a non-empty string that is the same on the `session_interrupted`, `fencing_token_invalidated`, `session_closing` and `session_closed` rows, and never assert the value itself.

B5. **Order and delivery.** On a violation the client calls `interrupt` first, awaits it, then rejects with `SequenceInvariantError`. The offending frame is never queued, never delivered to a pending `next()`, and never becomes the last accepted sequence. The Task 22 production paths (`getSnapshot()`, `snapshots()`) feed the same check with the client's own counter, which cannot violate it, and must not change any observable timing or result in the five Task 22 tests.

B6. **The client stays open.** A violation interrupts the session and leaves this client open. No pending or later `output()` iterator ends because of it, as `DEC-20260930-01` B2 rules for session end. `interrupt` is called once per violation. If `interrupt` itself throws or rejects, the rejection reaches the caller as `SequenceInvariantError` with that error as `cause`. This act adds no latch and no retry.

B7. **Test-only seams.** Two new helpers are authorized, exported from `in-process-client.ts` only and never from `packages/broker/src/index.ts`. Each is reached through the existing module-private `WeakMap` pattern, writes no ledger row itself, calls no `RuntimeBroker` mutator except `interrupt` through B5, and invokes no process.

- `unsafeTestOnlyIngestRawOutputFrame(client, frame: OutputFrame): Promise<void>`. Runs the frame through B1 to B6 as given, with the caller's `sessionId` and `outputSeq`. A valid frame is queued and delivered exactly as the existing helper delivers one, with `bytes` copied on ingest (`DEC-20260929-02` B2).
- `unsafeTestOnlyOfferSnapshotSeq(client, candidate: number): Promise<void>`. Runs the candidate through B1, B3, B4, B5 and B6. It delivers no snapshot. An accepted candidate becomes the last accepted `snapshotSeq`.

`unsafeTestOnlyIngestOutputFrame` keeps its exact signature and behavior. It stamps `sessionId` and `outputSeq` itself, and its frames pass the same check.

B8. **Reassignment.** This act's builder is a new session, not any Actor-Id that worked on Task 22. The round count carries into Task 23. Any substantive finding on the Part E review of this task is round 3 and requires reassigning the implementer before any further correction. This is the reading recorded in the correction-rounds log.

B9. **`DEC-20260929-02` B2 holds.** Every object this client hands a caller, including `SequenceInvariantError`, is created fresh for that delivery or is deeply immutable. `SequenceInvariantError` carries no reference to internal state, a frame's `bytes`, or the broker.

B10. **`DEC-20260930-01` B2 holds.** A consumer's `return()` ends that iterator only. `close()` ends every iterator of this client.

## Part C: Authorized scope

C1. Exactly these two paths, and no others:

- `packages/broker/src/in-process-client.ts`
- `packages/broker/test/in-process-client.test.ts`

C2. The Task 22 code and tests stay as they are, except where B1 to B7 add to them. The five Task 22 tests keep their names and assertions. Task 23 adds exactly the four tests the plan names, appended after them, and no other test:

1. `an output sequence gap interrupts the session with output_sequence_invariant_failed`
2. `a snapshot sequence regression interrupts the session with snapshot_sequence_invariant_failed`
3. `a duplicate output sequence is not silently dropped`
4. `an output frame carrying a foreign sessionId interrupts the session`

C3. These paths stay byte-identical to the binding base: `packages/broker/src/client.ts`, `snapshot.ts`, `command-legality.ts`, `ownership-machine.ts`, `runtime-broker.ts`, `index.ts`, and every path in `packages/protocol` and `packages/ledger`.

C4. No new dependency, socket, daemon, registry, callback, cache, timer or second authority. `SequenceInvariantError` is exported from `in-process-client.ts`. Whether `index.ts` exports it is not authorized here.

## Part D: Verification

D1. **Before the first edit,** re-fetch and stop and report unless all of these hold:

- (a) `origin/main` contains `ed853080a4bea377c2f5cf274c90f740ab1c9cac`;
- (b) every path changed between that commit and `origin/main` is under `docs/decisions/` or is `docs/verification/phase-3a-correction-rounds.md`;
- (c) this act is on `origin/main` with its status line reading ISSUED, a signed Part G, and no bracketed placeholder or blank signature line left in it;
- (d) `DEC-20260930-01` is on `origin/main` with status ISSUED.

D2. **Baseline before any edit,** recorded verbatim: `bunx tsc --noEmit`, `bun test packages/broker/test/in-process-client.test.ts` and `bun test packages/broker`. Expected: `tsc` exits 0, 5 passing in the focused file, and the broker suite as it stands on `main`. The builder reports any difference from `257 pass`, `0 fail`, `14 files`.

D3. **RED proof.** Write the four tests and the two helpers' call sites first. Run the focused file against the unmodified sources. Record each failure verbatim. The plan expects the gap to be delivered unchanged and no interruption recorded. For any test that cannot fail on the old code, say which and why. Import the two new helpers through a namespace import and call them as properties of it, so that a helper missing from the unmodified sources fails the four new tests and does not stop the file from loading. A named import of a missing export makes Bun fail the whole file with a `SyntaxError` before any test runs. Report which import form the RED proof used.

D4. **After implementation:**

```bash
bunx tsc --noEmit
bun test packages/broker/test/in-process-client.test.ts
bun test packages/broker
bun test
git diff --check
git diff --name-only ed853080a4bea377c2f5cf274c90f740ab1c9cac
```

`tsc` exits 0. The focused file shows exactly 9 passing. The broker suite shows the D2 baseline plus 4 passing, `0 fail`, `14 files`. The full suite shows `0 fail`. `git diff --check` is clean. The changed-path list is exactly the C1 paths.

D5. **What the four tests assert.** Each reads the durable ledger rows through `snapshotProjectionInput()`.

- Tests 1, 2 and 4: a `session_interrupted` row exists whose `reason_code` is the B3 code, followed by `fencing_token_invalidated`, `session_closing` and `session_closed`; the rejection is a `SequenceInvariantError` with the expected `kind` and `stream`; a pending `next()` on the same execution stays pending and receives no frame.
- Test 3: an offered `outputSeq` equal to the last accepted one is rejected as `duplicate`, is not dropped without a trace, and produces the interruption row.
- The test for a gap offers an `outputSeq` more than one above the last accepted one, for example 2 as the first frame of an execution.
- Every test also asserts the incident id is identical across the four rows that carry it.
- The four tests are the whole authorized test set (C2). The kinds that no named test exercises (output regression, snapshot duplicate, snapshot gap) are exercised only through the shared check in B1. A reviewer reports that as advisory. It is not a failure of review item 1.

D6. The PR description gets a table that maps each of B1 to B10 to the assertion or check that pins it and to the commit SHA.

## Part E: Builder binding and independent review

E1. Assign:

```text
Role-Id: builder
Actor-Id: session:claude-code/m10-task23-r1
Execution-Surface: claude-code
```

E2. Work in a clean, isolated worktree created for this act at the binding base, or at `origin/main` if D1(b) allows it. Do not reuse any earlier worktree.

E3. Commit subject:

```text
feat(broker): interrupt the session on snapshot and output sequence violations
```

The commit and the PR description end with the E1 trailers, each line 72 characters or shorter. One commit. Open a draft pull request from a new branch. No amend, rebase, force-push or empty commit after the push.

E4. The builder reports the commit SHA, the D2 baseline, the RED proof, the D4 results, the D6 table, the required-check state, and that the review is pending the Founder. It stops there.

E5. **Independent review.** Before the PR leaves draft, a non-authoring review under reviewer id `chatgpt-5.6-sol` inspects the exact head. The packet contains this act and `DEC-20260926-01`, `DEC-20260929-01`, `DEC-20260929-02`, `DEC-20260930-01` and `DEC-20260924-03`, all read from `main`, and:

- the full diff from the binding base to the head;
- `in-process-client.ts` and its test at the head, with line numbers;
- `client.ts`, `snapshot.ts`, `command-legality.ts` and `runtime-broker.ts` at the head;
- the ledger source that defines `Ledger.readAfter()`;
- `packages/protocol/src/lifecycle-events.ts`.

The person assembling the packet confirms every governing act above is on `main` first.

E6. **Review items.** PASS only if all seven pass.

1. The four named tests exist with the exact plan names and assert D5.
2. Each violation kind on each stream interrupts with the B3 reason code, and the frame is neither delivered nor accepted (B5).
3. `SequenceInvariantError` has the plan's shape, and no returned object shares internal state (B9).
4. The Task 22 behavior is unchanged: B2 isolation, `DEC-20260930-01` B2, the five tests and their assertions.
5. The changed paths are exactly C1, and C3 paths are byte-identical.
6. No new authority: the only broker call added is `RuntimeBroker.interrupt`, and there is no new dependency, timer or state outside the client closure (C4).
7. The two test-only helpers are absent from `index.ts` and B7 holds.

E7. The reviewer states what it executed and what it only read. The verdict is recorded on the PR with the reviewer id and the exact head SHA, and entered in `docs/verification/phase-3a-correction-rounds.md`.

## Part F: Not authorized

- Leaving draft and merging: each needs a separate Founder act naming the exact head.
- Tasks 24 and 25, and any later task.
- A production `OutputFrame` producer, and any caller of the two test-only helpers outside tests.
- Any change to a C3 path, a spec, the plan or any decision record.
- Running the independent review.
- Closing the M10 checkpoint.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-09-30

Actor-Id: founder
