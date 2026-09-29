FOUNDER-ACT-20260929-TASK22-CORRECTION-A1: Task 22 correction round 1, second commit

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Pull request:** #102, branch `build/m10-task22-r1`
> **Correction base (PR head):** `84afef0a89bf55fce554ce438126ddc8bce65c32`
> **Uncorrected head, for reference:** `ae1cb8fc66901717a47285a0756221479ec97826`
> **Task 22 binding base (unchanged):** `b38be8a8662b437d510b30f4477bcee3d7961999`
> **Amends:** `DEC-20260929-01-task22-correction-authorization.md` (F3, D1(a), B1 item 4, E1, E2)
> **`origin/main` when drafted:** `193d39d6c71632a85335005985d238ed67c3f7ef`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The correction landed.** Commit `84afef0a89bf55fce554ce438126ddc8bce65c32` is the one correction commit that `DEC-20260929-01` F3 allowed. The PR is still a draft. The independent re-review under Part E of that act has not been requested.

A2. **A further defect was found before the re-review.** A Codex stop-time check, run inside the builder session after the push, reported that the in-process client shares one mutable completion result. Reading `packages/broker/src/in-process-client.ts` at `84afef0a89bf55fce554ce438126ddc8bce65c32` confirms the mechanism:

- `ITERATION_DONE` is declared once at module scope and is not frozen.
- Every finished `next()`, every `return()`, and the settlement of pending waiters in `close()` hand that one object to callers.
- A caller that sets `done = false` on a result it received changes what every later finished iterator reports, in every client in the process. A `for await` over such an iterator would then never end.

The builder reproduced this at runtime with a temporary test, then deleted the test. The builder did not fix it, because F3 allows one commit.

A3. **It is the class B1 item 4 covers.** B1 item 4 of `DEC-20260929-01` requires that no writable internal state be reachable at runtime. The first correction checked the client object and not the objects the client hands out. A shared, unfrozen result object is writable state reachable through a returned value.

A4. **The authority is missing.** F3 allows exactly one new commit, and D1(a) expects the head to be `ae1cb8fc66901717a47285a0756221479ec97826`. A second commit needs this act.

A5. **Two behaviors are not ruled elsewhere.**

- After `close()`, `getSnapshot()` still returns `connected: true`. `DEC-20260926-01` B1 says only that `connected` is true before closure.
- `snapshots()` yields as soon as it is pulled and never waits, so a `for await` consumer never pauses.

B3 and B5 below rule on them, so the re-review does not return AMBIGUOUS on either.

A6. **Round count.** `DEC-20260929-01` B4 counts two milestone-7 rounds: the M9 static review, and the B5 review of `ae1cb8fc66901717a47285a0756221479ec97826`. No independent review verdict exists yet on `84afef0a89bf55fce554ce438126ddc8bce65c32`.

A7. This act governs the Task 22 correction where its terms conflict with `DEC-20260929-01` or `DEC-20260926-01`. Every clause of those acts not changed here stands. This act does not close `PLAN-OPEN-7` and does not authorize any later task.

## Part B: Founder rulings

B1. **Second correction commit.** One further commit on `build/m10-task22-r1`, on top of `84afef0a89bf55fce554ce438126ddc8bce65c32`, is authorized. `DEC-20260929-01` F3 applies to it, with "one new commit on top of `84afef0a89bf55fce554ce438126ddc8bce65c32`" in place of "on top of `ae1cb8fc66901717a47285a0756221479ec97826`". Pushed as a fast-forward. No amend, rebase, force-push, empty commit or merge of `main`.

B2. **B1 item 4 covers every object the client returns.** Every object the client hands to a caller is either created fresh for that delivery or deeply immutable. This covers:

- iterator results, including every `done: true` result from `next()`, from `return()`, and from the settlement of waiters in `close()`;
- output frames;
- snapshots and their nested values;
- `BrokerResult` objects;
- the `bytes` of an ingested frame.

No object a caller can reach is shared with another client, with another delivery, or with the client's own internal state. Changing any returned object leaves later deliveries, this client and every other client unchanged. The bytes an ingest seam is given are copied on ingest, so the delivered frame's `bytes` is not the array the test passed in.

The builder makes one sweep of `in-process-client.ts` and of `snapshotProjectionInput()` for every such surface and every module-scope object, array, `Map` or `Set` that a caller could reach, and reports what it checked. Fixing only the `ITERATION_DONE` case does not satisfy this ruling.

B3. **Behavior after `close()`.** After `close()`, `getSnapshot()` still resolves a `StampedBrokerSnapshot`, with `connected: false`, and the per-client counter continues. `snapshots()` ends. `request()` after `close()` is not ruled by this act and stays as it is.

B4. **Correction rounds.** The stop-time finding in A2 is not a plan §11.3 verdict. It came from an in-session check on the builder's own work, not from an independent review under B5. It is recorded here. Rubric milestone 7 stays at 2 of 2. If the Part E re-review returns any substantive finding, that verdict is round 3 and reassignment of the Task 22 implementer is required before any further correction.

B5. **`snapshots()` pacing.** Out of scope for this act. It stays as it is, and the re-review reports it as advisory only.

B6. **Threads.** The three Copilot threads stay resolved. They were resolved after the first correction push, each with a reply naming `84afef0a89bf55fce554ce438126ddc8bce65c32`, as `DEC-20260929-01` B5 required. This act does not change what any of those replies said. The builder posts no new thread reply.

## Part C: Authorized scope

C1. The same four paths as `DEC-20260926-01` C1, and no others:

- `packages/broker/src/in-process-client.ts`
- `packages/broker/src/index.ts`
- `packages/broker/src/runtime-broker.ts` (only `snapshotProjectionInput()` may change)
- `packages/broker/test/in-process-client.test.ts`

C2. Task 22 keeps exactly the five named tests. Each new defect is pinned by an assertion added inside one of them. No test is added, renamed, split or deleted.

C3. `DEC-20260926-01` C3 and C4 stand. `client.ts`, `snapshot.ts`, `command-legality.ts` and `ownership-machine.ts` stay byte-identical to `b38be8a8662b437d510b30f4477bcee3d7961999`.

## Part D: Verification

D1. **Before the first edit,** re-fetch and stop and report unless all of these hold:

- (a) PR #102's head is `84afef0a89bf55fce554ce438126ddc8bce65c32`, and the branch has exactly two commits after `b38be8a8662b437d510b30f4477bcee3d7961999`, in this order: `ae1cb8fc66901717a47285a0756221479ec97826`, then `84afef0a89bf55fce554ce438126ddc8bce65c32`;
- (b) every path changed between `b38be8a8662b437d510b30f4477bcee3d7961999` and `origin/main` is under `docs/decisions/` or is `docs/verification/phase-3a-correction-rounds.md`;
- (c) this act is present on `origin/main` with status ISSUED;
- (d) the PR is still a draft.

D2. **RED proof.** Write the new assertions first and run them against the `84afef0a89bf55fce554ce438126ddc8bce65c32` sources. Record each failure verbatim. For any assertion that cannot fail on that code, say which one and why.

D3. **After implementation:**

```bash
bunx tsc --noEmit
bun test packages/broker/test/in-process-client.test.ts
bun test packages/broker
bun test
git diff --check
git diff --name-only b38be8a8662b437d510b30f4477bcee3d7961999
```

`tsc` exits 0. The focused suite shows exactly 5 passing. The broker suite shows `257 pass`, `0 fail`, `14 files`. The full suite shows `0 fail`. `git diff --check` is clean. The changed-path list is exactly the four C1 paths.

D4. The PR description gets one new section for the second commit: a table that maps each item in B2 and B3 to the assertion or check that pins it and to the fixing commit. B5 changes no code, so it has no row. The existing sections stay as they are. Edit the description once, after the push.

## Part E: Re-review

E1. Before PR #102 leaves draft, an independent non-authoring Codex review inspects the exact head after the second commit. The packet contains this act, `DEC-20260929-01`, `DEC-20260926-01`, the full diff from `b38be8a8662b437d510b30f4477bcee3d7961999` to that head, and the following findings: the five in `DEC-20260929-01` A1, the three Copilot threads, and the shared-result finding in A2 above.

E2. The six items in `DEC-20260929-01` E2 stand. Two changes:

- Item 4 (closure isolation) also covers the behavior ruled in B3 above.
- A seventh item is added: **no returned object is shared or reachable across clients, deliveries or internal state (B2 above)**. The verdict is PASS only if all seven pass.

E3. The verdict is recorded on PR #102 with the reviewer id `chatgpt-5.6-sol` and the exact head SHA. It is also entered in `docs/verification/phase-3a-correction-rounds.md` when it occurs, under B4.

## Part F: Builder binding and delivery

F1. Assign:

```text
Role-Id: builder
Actor-Id: session:claude-code/m10-task22-fix-r1-c2
Execution-Surface: claude-code
```

F2. Work in a clean, isolated worktree created for this act at `84afef0a89bf55fce554ce438126ddc8bce65c32`. Do not reuse the worktree of the first attempt or any retained worktree.

F3. Commit subject:

```text
fix(broker): stop the in-process client sharing objects it hands out
```

The commit and the PR description end with the F1 trailers, each line 72 characters or shorter.

F4. The builder reports the commit SHA, the RED proof verbatim, the D3 results, the D4 table, the B2 sweep list with what was checked, the required-check state, and the thread state. It states that the re-review is pending the Founder.

## Part G: Filing

G1. This act lands in one docs-only pull request that changes only this file and `docs/verification/phase-3a-correction-rounds.md`. The round-log entry records the stop-time finding in A2 and the B4 ruling on it.

## Part H: Not authorized

- Leaving draft, the M10 review checkpoint, and merging PR #102: each needs a separate Founder act naming the exact head.
- Task 23 and any later task.
- A production `OutputFrame` producer.
- The M14 review and Task 35.
- Any edit to a spec, plan or other decision record.
- Any path outside C1 and G1.
- Running the Codex re-review.

## Part I: Signature

Signed:

— Michael Daley

Date: 2026-09-29

Actor-Id: founder
