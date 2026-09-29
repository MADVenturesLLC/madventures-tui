FOUNDER-ACT-20260929-TASK22-CORRECTION: Task 22 correction round 1 authorization

> **Status:** ISSUED  
> **Repository:** `MADVenturesLLC/madventures-tui`  
> **Pull request:** #102, branch `build/m10-task22-r1`  
> **Correction base (PR head):** `ae1cb8fc66901717a47285a0756221479ec97826`  
> **Task 22 binding base (unchanged):** `b38be8a8662b437d510b30f4477bcee3d7961999`  
> **`origin/main` when drafted:** `e5d4697d0de61305ac6bf6b91e5c6d75507624c8`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A — Basis

A1. **The independent review failed.** The B5 review required by `DEC-20260926-01` inspected the exact head `ae1cb8f` and returned FAIL. It is recorded on PR #102 in comment `5868915240` (2026-09-28T11:26:00Z), with custody file `verification/tier2-m10task22-ae1cb8f-codex-FAIL.txt`, SHA-256 `4a123303fcf2211e76f0bf96a30b2b25cd370c095a73731f68bbf4408d63176b`. Its findings:

1. B1 stamped-type boundary: `getSnapshot()` is still typed as the nullable `BrokerSnapshot`.
2. B4 no-new-authority: `snapshotProjectionInput()` returns the broker's live `state` and `provenance` by reference.
3. Immutable principal: `principal` is an ordinary writable property at runtime, and `request()` trusts it.
4. Closure isolation, partial:
   - the test-only ingest helper is exported from the production barrel (`index.ts`);
   - the output iterator's end-condition needs a ruling.
5. Sequence: foreign-session refusal passes, but there is no sequence or duplicate refusal in `request()`.

A2. **Review threads.** Copilot's review of 2026-09-28T11:19Z opened three threads on the same head. Two are marked resolved, with no reply and no change to the head:

- `in-process-client.ts:54`, which matches finding 1;
- `runtime-broker.ts:183`, which matches finding 2.

The third, `index.ts:56`, is open and matches finding 4. Named check: the review threads were read through the GitHub API on 2026-09-29T09:20Z. This act does not say who resolved the two threads.

A3. **`DEC-20260926-01` D1 can no longer be met.** Filing that act moved `origin/main` from `b38be8a` to `e5d4697`. The diff between them changes only `docs/decisions/DEC-20260926-01-task22-execution-authorization.md`. The same happens whenever an act is filed on `main`, so this act checks base drift by what changed, not by SHA.

A4. **Finding 5 has support in the text.** Plan Task 22's requirement coverage quotes the §4.1 sentence "Session mismatch, duplicate, regression, or gap is a typed invariant failure … an unexplained gap interrupts the session". B5 item 5 names "sequence and foreign-session refusal". Yet plan Task 23 exists to implement exactly that sentence: it defines `SequenceInvariantError` and its four named tests. B3 held Task 22 to five named tests, none of which is a gap test. A re-review against the unchanged text could fail the same way. B2 below settles it.

A5. **The output end-condition is unspecified.** §9.4 defines the `OutputFrame` shape and says nothing about when `output()` ends. §4.1 requires that the in-process client "remain replaceable later with a socket-backed client without changing TUI code".

A6. **Correction rounds.** Plan §4 maps M9 and M10 to the same rubric §7.2 milestone, 7. Two review verdicts on implemented milestone-7 work exist:

- the independent static M9 review (Codex, 2026-09-24 17:13 UTC, FAIL (STATIC), F1–F4; `DEC-20260924-05` A1);
- the B5 review in A1.

Neither is recorded in `docs/verification/phase-3a-correction-rounds.md`, although plan §11.3 requires the count to be recorded "when the verdict occurs". Named check: that file was read at `origin/main` `e5d4697` on 2026-09-29T09:20Z.

A7. **One defect beyond the review.** Reading `ae1cb8f` while preparing this act found a further defect, in the class plan Task 22 Step 6 names. `broker` is declared TypeScript-`private`, which is not private at runtime. The bound `RuntimeBroker` can therefore be read from the client object. The same holds for the closed flag, the snapshot counter and the output buffers, which are also writable. B1 item 4 corrects this.

A8. This act governs the Task 22 correction where its terms conflict with the Phase 3A plan or with `DEC-20260926-01`. Every clause of `DEC-20260926-01` not changed here still stands. This act does not close `PLAN-OPEN-7` and does not authorize any later task.

## Part B — Founder rulings

B1. **In-scope defects.** Findings 1–4 and the three Copilot threads are Task 22 defects. They are corrected under this act:

1. `getSnapshot()` on the in-process client is typed and delivered as `StampedBrokerSnapshot`. It shares the one per-client counter with `snapshots()`: `snapshotSeq` starts at `1` and increases by exactly one for every snapshot delivered by either method. `client.ts` stays byte-identical.
2. **The accessor hands out no reference into broker state.** Nothing returned by `RuntimeBroker.snapshotProjectionInput()`, and nothing the client derives from it, refers to an object that the broker later reads. Changing any returned value at runtime leaves later snapshots and later `request()` results unchanged. Copying or freezing is the builder's choice, provided no other `RuntimeBroker` behaviour changes.
3. **The principal is fixed at runtime, not only in TypeScript.** No route can change the principal that `request()` evaluates under: assignment, `Object.defineProperty`, deletion, and prototype mutation are all covered.
4. **No handle is reachable at runtime.** The returned object exposes no reachable reference to the bound `RuntimeBroker` and no writable internal state. This covers the closed flag, the snapshot counter and the output buffers, and satisfies plan Task 22 Step 6.
5. **The barrel exports only these.** `index.ts` exports `createInProcessBrokerClient` and the types `StampedBrokerSnapshot` and `InProcessBrokerClient`. It does not export the test-only ingest helper. That helper stays exported from `in-process-client.ts` only, as B4 of `DEC-20260926-01` permits. Tests import it from there. Reaching it by a deep import is the test seam B4 authorized, not a defect.

B2. **Sequence scope.** Task 22 owns:

- stamping `snapshotSeq` per B1 item 1;
- stamping `outputSeq` per execution, starting at `1` and increasing by exactly one per frame;
- refusing a foreign `sessionId` with `session_mismatch`.

Task 22 does not detect, refuse or interrupt on a duplicate, regression or gap. Plan Task 23 owns that, and it discharges Task 22's requirement-coverage citation of that §4.1 sentence. `request()` has no sequence to validate: `BrokerCommand` carries none, and `client.ts` is frozen. This act does not assign duplicate-`commandId` detection to Task 22. B5 item 5 of `DEC-20260926-01` is read as "foreign-session refusal and the B2 stamping rules" and nothing more.

B3. **Output end-condition.** `output(executionId)` does not end when its buffer is empty. It waits for the next frame, and it ends only when this client closes. `close()` ends every pending `output()` and `snapshots()` iterator of this client and leaves the broker phase unchanged. Ending on an execution's or session's end waits for the separately authorized production `OutputFrame` producer.

B4. **Correction rounds.**

- The M9 static review verdict is milestone-7 round 1.
- The B5 verdict in A1 is milestone-7 round 2.
- Rubric milestone 7 therefore stands at 2 of 2.
- Plan §11.3 requires reassignment at more than two rounds. If the re-review under Part E returns any substantive finding, that verdict is round 3, and reassignment of the Task 22 implementer is required before any further correction.

B5. **The two resolved threads.** Before the correction begins, the two threads in A2 are reopened. Each of the three threads is resolved only after the commit that fixes it is pushed, with a reply naming that commit.

## Part C — Authorized scope

C1. The builder may change exactly the four paths of `DEC-20260926-01` C1:

- `packages/broker/src/in-process-client.ts`
- `packages/broker/src/index.ts`
- `packages/broker/src/runtime-broker.ts`
- `packages/broker/test/in-process-client.test.ts`

In `runtime-broker.ts`, only `snapshotProjectionInput()` may change.

C2. Task 22 keeps exactly the five named tests of `DEC-20260926-01` D3. Each defect in B1, and the B3 end-condition, is pinned in one of two ways:

- by an assertion added inside one of those five tests; or
- for a type-level defect, by `bunx tsc --noEmit`.

C3. `DEC-20260926-01` C3 and C4 stand unchanged.

## Part D — Verification

D1. **Before the first edit,** re-fetch and stop and report unless all of these hold:

- (a) PR #102's head is `ae1cb8f`, and the branch has exactly one commit after `b38be8a`;
- (b) every path changed between `b38be8a` and `origin/main` is under `docs/decisions/` or is `docs/verification/phase-3a-correction-rounds.md`;
- (c) this act is present on `origin/main` with status ISSUED;
- (d) the two threads in A2 are open.

D2. **RED proof.** Write the new assertions first, then run them against the `ae1cb8f` implementation.

- Record each failure verbatim.
- For any assertion that cannot fail on the old code, say which one and why.

D3. **After implementation:**

```bash
bunx tsc --noEmit
bun test packages/broker/test/in-process-client.test.ts
bun test packages/broker
bun test
```

- `tsc` exits 0.
- The focused suite shows exactly 5 passing.
- The broker suite shows `257 pass`, `0 fail`, `14 files`.
- The full suite shows `0 fail`.
- `git diff --check` is clean.
- The changed-path list from `b38be8a` is exactly C1's four paths.

D4. The PR description carries a table that maps each finding and each Copilot thread to the assertion or check that pins it, and to the fixing commit.

## Part E — Re-review

E1. Before PR #102 leaves draft, an independent non-authoring Codex review inspects the exact corrected head. The review packet contains:

- this act;
- `DEC-20260926-01`;
- the full diff from `b38be8a` to that head;
- the five findings in A1 and the three Copilot threads.

The reviewer confirms each finding is closed and reports any new finding.

E2. The review returns PASS, FAIL or AMBIGUOUS, with file:line evidence, for each of these:

1. B1 of `DEC-20260926-01` as corrected by B1 item 1;
2. B4 of `DEC-20260926-01` with B1 items 2 and 5;
3. the immutable principal under B1 item 3;
4. closure isolation with B3;
5. B5 item 5 as read in B2;
6. runtime reachability under B1 item 4.

The verdict is PASS only if all six pass. Any FAIL makes it FAIL. AMBIGUOUS with no FAIL is INCONCLUSIVE, which does not satisfy B5.

E3. The verdict is recorded on PR #102 with the reviewer id `chatgpt-5.6-sol` and the exact head SHA. It is also entered in `docs/verification/phase-3a-correction-rounds.md` when it occurs, under B4's count.

## Part F — Builder binding and delivery

F1. Assign:

```text
Role-Id: builder
Actor-Id: session:claude-code/m10-task22-fix-r1
Execution-Surface: claude-code
```

F2. Work in a clean, isolated worktree created for this act, checked out at `ae1cb8f`. Do not use any existing checkout or retained worktree.

F3. Make one new commit on `build/m10-task22-r1` on top of `ae1cb8f`:

```text
fix(broker): close the Task 22 independent-review findings
```

- Push it as a fast-forward.
- No amend, rebase, force-push or empty commit.
- No merge of `main`.
- The commit and the PR description end with the F1 trailers, with every trailer line 72 characters or shorter.

F4. Report:

- the commit SHA;
- the RED proof verbatim;
- the D3 results;
- the D4 table;
- the required-check state;
- the thread state;
- the re-review verdict once it is recorded.

## Part G — Filing

G1. This act and the round entries in B4 land together in one docs-only pull request. It changes only this file and `docs/verification/phase-3a-correction-rounds.md`. The round entries record that both verdicts are logged late, on the date of filing.

## Part H — Not authorized

- Leaving draft, the M10 review checkpoint, and merging PR #102: each needs a separate Founder act naming the exact head.
- Task 23 and any later task.
- A production `OutputFrame` producer.
- The M14 review and Task 35.
- Any edit to a spec, plan or other decision record.
- Any path outside C1 and G1.

## Part I — Signature

Signed:

— Michael Daley

Date: 2026-09-29

Actor-Id: founder
