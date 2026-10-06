FOUNDER-ACT-20261006-TASK35-B3-CLARIFICATION: Task 35 correction, B3 clarification and disposition of the filename thread

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Pull request:** #119, branch `build/m15-task35-r1`, a draft
> **Correction head:** `0528f788142e107a436266cf42005a1bf50f9bc7`
> **`origin/main` when drafted:** `69800176c37b209ab37e3e22ff2aa6aa10e0aa40`
> **Read with:** `DEC-20261005-01` (the Task 35 correction act, SHA-256 `c08975c9b8c9fe834a98eb5baadb99aa761dd82c8a9e55fe0b3a3626f34c379a`), `DEC-20261004-03`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The correction is delivered.** `session:claude-code/m15-task35-r2`, which reported running on Claude Opus 5 (`claude-opus-5`), committed `0528f788142e107a436266cf42005a1bf50f9bc7` on top of `16e2f1f9ab3a8984576a934823eb88dbde8522a2` and pushed it as a fast-forward. It changes only `packages/protocol/src/capability-record.ts` and `packages/protocol/test/capability-record.test.ts`. The builder reports `tsc` exit 0, the focused file 12 pass, the protocol suite 146 pass in 11 files and the full suite 1571 pass, 0 fail, on Bun 1.4.2. The drafter reproduced `tsc` exit 0, 12 pass and 146 pass at that head on Linux with Bun 1.3.11, and ran 55 Proxy probes there with no escaping exception and no leaked text.

A2. **A conflict inside `DEC-20261005-01` B3.** Its first sentences require every exception raised while the parser inspects its input to become `CapabilityRecordError` of kind `schema`, carrying no part of the original. Its last sentence requires every input the correction base rejects with `CapabilityRecordError` to keep the same kind and field. The builder found three inputs where both apply: a `Proxy` trap in the input throws a `CapabilityRecordError` of its own, a forged one, or a `Proxy` posing as one. At the correction base that object escaped unchanged, with the kind, field and text the trap chose, including record content. At the correction head it is rejected as kind `schema` naming the container. The builder reported this as a deliberate reading.

A3. **The filename thread.** Copilot's review of the correction base opened thread `r4194854884` on `capabilityRecordFilename`, rated high. The function reads `evaluated_at` and `binary_sha256` once to check them and again to build the name, so a record built without the parser, with getter properties, can pass the check and still put a path into the name. The correction builder reproduced it with two such records. A record the parser returns is frozen plain data with no accessor properties, so it cannot do this, and `DEC-20261004-03` B6 guarantees the name only for records the parser accepts. `DEC-20261005-01` Part H forbade changing that function, and B8 required the builder to report it, not fix it. The thread is unresolved, and the required check `code-review` fails on the correction head for that reason alone.

A4. **Pull request handling.** The builder replaced the three closing attribution trailers of the PR description with its own, because act E3 requires the description to end with them and the repository's body check rejects two trailer blocks. It kept every other line. `gh pr edit` failed on the agent token's permissions without a 401, and the builder applied the same prepared body once through the REST API.

A5. **A Founder deviation.** I marked PR #119 ready for review at 2026-10-06T11:44:02Z without the act `DEC-20261005-01` Part H requires. I returned it to draft before the verdict was posted under act G2 and before the correction builder started. The head did not change.

## Part B: Founder rulings

B1. **What `DEC-20261005-01` B3 means.** Its containment sentences govern every value thrown out of code the input supplies, such as a `Proxy` trap or an accessor, whatever that value is, including a `CapabilityRecordError` or an object posing as one. Its last sentence governs rejections the parser raises itself. The builder's reading in A2 is the meaning I intended. This clarifies B3. It changes no behavior at the correction head and requires no commit.

B2. **The filename thread.** The defect in A3 is real. It is outside `DEC-20261004-03` B6, which guarantees the name only for records the parser accepts, and outside the scope of `DEC-20261005-01`. It is advisory and not a round. Its fix is not authorized here. It is owed before any caller of `capabilityRecordFilename` outside tests is authorized, and it needs its own Founder act. `DEC-20261004-03` Part F authorizes no such caller today. I reply on the thread with this disposition and resolve it. Nothing else is posted or edited on PR #119 for it.

B3. **The pull request handling in A4 is accepted.** The trailers of `session:claude-code/m15-task35-r1` remain in its commit `16e2f1f9ab3a8984576a934823eb88dbde8522a2`.

B4. **The deviation in A5 is recorded.** It authorized nothing and has no effect on the head or the rounds. The ready-for-review authorization for PR #119 will restate it.

B5. **Rounds.** This act is a Founder ruling made after the implementation, which plan section 11.3 does not count. It adds no round. Rubric milestone 1 stays at 3 and rubric milestone 4 at 1.

B6. **The re-review.** The re-review under `DEC-20261005-01` Part F proceeds at `0528f788142e107a436266cf42005a1bf50f9bc7`, after this act is on `main`. Its packet also contains this act. The reviewer applies B1 when it assesses item 2 and the eighth item, and reports the filename thread as advisory under B2.

## Part C: Filing

C1. This act lands in one docs-only pull request that changes only this file.

## Part D: Not authorized

- Any change to `capabilityRecordFilename`, and any commit on PR #119.
- Leaving draft and merging PR #119: each needs a separate Founder act naming the exact head.
- Task 36, M15 closure, and every later task.
- Running the re-review.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-06

Actor-Id: founder
