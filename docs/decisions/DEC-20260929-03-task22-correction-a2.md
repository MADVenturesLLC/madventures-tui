FOUNDER-ACT-20260929-TASK22-CORRECTION-A2: Task 22 second re-review outcome, B3 clarification and third review

> **Status:** DRAFT, NOT ISSUED. It becomes an act only when the Founder signs Part H and it is filed on `main` with Status ISSUED.
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Pull request:** #102, branch `build/m10-task22-r1`
> **Reviewed head (unchanged by this act):** `c6777cb51aa5cdb17ac7ff751484c463b0111738`
> **Task 22 binding base (unchanged):** `b38be8a8662b437d510b30f4477bcee3d7961999`
> **Amends:** `DEC-20260929-01-task22-correction-authorization.md` (B3, B4, E1, E2, E3) and `DEC-20260929-02-task22-correction-a1.md` (E1, E2)

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The head.** Commit `c6777cb51aa5cdb17ac7ff751484c463b0111738` is the second correction commit authorized by `DEC-20260929-02`. The branch has three commits after the binding base. The PR is a draft.

A2. **Two independent reviews returned FAIL.** Both reviewed the exact head, from the same packet.

- One reviewer, under the id `codex`, returned FAIL.
- One reviewer, under the id `chatgpt-5.6-sol`, returned FAIL.

Both passed items 1, 3 and 5, both failed item 4, and both returned AMBIGUOUS on items 2 and 6.

A3. **The item 4 finding.** Both reviewers report that the output iterator's `return()` in `packages/broker/src/in-process-client.ts` marks that iterator finished and settles its own pending waiters as done while the client stays open. Both read `DEC-20260929-01` B3, "it ends only when this client closes", as forbidding that. The tests at the reviewed head assert this behavior.

A4. **The packet was incomplete.** It omitted `DEC-20260929-02`, `packages/broker/src/snapshot.ts` and the ledger source that defines `Ledger.readAfter()`. Both reviewers returned AMBIGUOUS on items 2 and 6 for that reason, and both flagged the absence of `DEC-20260929-02` as a governance conflict. Those findings come from the packet, and this act does not treat them as defects in the code.

A5. **Item 4 does not depend on the omissions.** It turns on what B3 means. The reviewers applied the text as written.

A6. **The round rule.** `DEC-20260929-01` B4 makes any substantive finding on the Part E re-review round 3, and requires reassigning the implementer before any further correction.

A7. This act governs the Task 22 correction where its terms conflict with `DEC-20260929-01` or `DEC-20260929-02`. Every clause of those acts not changed here stands. This act does not authorize any later task.

## Part B: Founder rulings

B1. **Round count.** The FAIL returned under `chatgpt-5.6-sol`, the id named in `DEC-20260929-01` E3, is a substantive finding on the Part E re-review. It is round 3 for rubric milestone 7. Round 1 was the M9 static review, and round 2 was the B5 review of `ae1cb8fc66901717a47285a0756221479ec97826`. The verdict returned under `codex` on the same head, from the same packet, on the same finding, is recorded and not counted separately. Rubric milestone 7 stands at 3.

B2. **B3 clarified.** The sentence in `DEC-20260929-01` B3 "it ends only when this client closes" governs which events end an `output()` iterator from the source side. I rule that:

- An empty buffer, the end of an execution, and the end of the session do not end an `output()` iterator.
- `close()` ends every pending `output()` and `snapshots()` iterator of this client.
- A consumer's own early exit through an iterator's `return()`, which `for await` performs on `break`, ends that iterator only. It leaves the client open. It does not end any other iterator of this client or of any other client, and it changes no phase.

The `return()` behavior at the reviewed head conforms to B3 as clarified. The rest of B3 stands.

B3. **This is a ruling made after two FAIL verdicts.** It is a ruling on the meaning of B3 made after both reviewers read B3 literally. It is recorded as that. It does not find that either reviewer was wrong.

B4. **Reassignment.** `DEC-20260929-01` B4 requires reassignment of the implementer before any further correction. This act authorizes no correction and no change to any path, so reassignment is not required by this act. It becomes required, before any change to any path on this branch, if the re-review in Part D returns any substantive finding, or if a correction on this head is later authorized.

B5. **Reviewer identities.** The re-review in Part D is returned under `chatgpt-5.6-sol`. The verdict returned under `codex` is recorded under that id, as a second opinion on the same head. It is not the Part E verdict.

B6. **Recording.** Both verdicts are recorded verbatim on PR #102, each with the head SHA and the SHA-256 of its text, by a session the Founder directs. The rounds log records round 3 and this act.

## Part C: Authorized scope

C1. This act authorizes no change to `packages/broker/src/in-process-client.ts`, `packages/broker/src/index.ts`, `packages/broker/src/runtime-broker.ts` or `packages/broker/test/in-process-client.test.ts`, and no other path in the repository except those in E1.

C2. This act authorizes no builder session on PR #102.

## Part D: Third review

D1. Before PR #102 leaves draft, an independent non-authoring review inspects the same head `c6777cb51aa5cdb17ac7ff751484c463b0111738`. It is returned under `chatgpt-5.6-sol`, in a session that has not been given a prior packet for this head.

D2. The packet contains this act, `DEC-20260929-01`, `DEC-20260929-02` and `DEC-20260926-01`, all read from `main`. It also contains:

- the full diff from `b38be8a8662b437d510b30f4477bcee3d7961999` to that head;
- the four Task 22 source files and the test file at the head, with line numbers;
- `packages/broker/src/client.ts`, `packages/broker/src/command-legality.ts` and `packages/broker/src/snapshot.ts` at the head;
- the ledger source that defines `Ledger.readAfter()`;
- the five findings and three review threads named in `DEC-20260929-01`, the shared-result finding in `DEC-20260929-02`, and the item 4 finding and B2 above.

The person assembling the packet confirms that every governing act named above is on `main` before building it.

D3. The seven items in `DEC-20260929-02` E2 stand, with one change. Item 4 is judged under B3 as clarified in B2 above. A consumer's `return()` ending that iterator only is not a failure of item 4. An iterator ending because a buffer is empty, or an execution or session ends, is a failure.

D4. The reviewer states what it executed and what it only read. The verdict is recorded on PR #102 with the reviewer id and the exact head SHA, and entered in `docs/verification/phase-3a-correction-rounds.md`.

D5. If the re-review returns any substantive finding, B4 applies: the implementer is reassigned before any change to any path.

## Part E: Filing

E1. This act lands in one docs-only pull request that changes only this file and `docs/verification/phase-3a-correction-rounds.md`. The round-log entry records the round 3 verdict, the ruling on it in B1, and B2.

## Part F: Not authorized

- Leaving draft, the M10 review checkpoint, and merging PR #102: each needs a separate Founder act naming the exact head.
- Any correction commit, and any change to any code path.
- Task 23 and any later task.
- A production `OutputFrame` producer.
- The M14 review and Task 35.
- Any edit to a spec, plan or other decision record.

## Part G: Not decided here

G1. Items 2 and 6 of the two reviews are AMBIGUOUS because of the packet. This act does not decide them. The Part D review does.

## Part H: Signature

Signed:

— ______________________

Date: ______________

Actor-Id: founder
