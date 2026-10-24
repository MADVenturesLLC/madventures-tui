FOUNDER-ACT-20261024-TASK25-DELEGATE-FORWARDING: the build delegate for the atomic incident path

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `7e4572c95d90c19b5403c07c8d4cd146c6d37d98`
> **Binding base:** for Task 25, `7e4572c95d90c19b5403c07c8d4cd146c6d37d98`, as its builder prompt names it
> **Read with:** `AGENTS.md`; `DEC-20261022-01` Parts B to E; `DEC-20261023-01` Parts B and C; `DEC-20261024-01`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What was checked.** The drafting assistant read, at the commit in the header, `packages/supervisor/src/build.ts` lines 735 to 790 and 980 to 1000, `packages/broker/src/in-process-client.ts` lines 360 to 400, the test `an adapter client from the build publishes an accepted event through its broker delegate` in `packages/supervisor/test/build.test.ts`, the `build.ts` entry of the `EXCEPTIONS` table in `test/phase3a/harness-separation.test.ts`, and the stop report of the Task 25 builder as I relayed it. It ran no test.

A2. **The stop.** The Task 25 builder, `session:codex/m10-task25-r1`, stopped before D1 and before any edit. It reported that the broker handle the build gives every client it constructs is a delegate made with `Object.create(RuntimeBroker.prototype)` that forwards a fixed set of methods to the open broker, `publish` among them since `DEC-20261023-01` C1, and that `publishIncident` is not among them. A method added to `RuntimeBroker` and not forwarded is inherited by the delegate and runs on an object without the broker's state, the defect `DEC-20261023-01` A4 recorded for `publish`. So the route `DEC-20261022-01` B7 requires would fail through every client the supervisor constructs, the only clients through which `DEC-20261022-01` B6 lets `publishIncident` be reached. `packages/supervisor/src/build.ts` is not among the paths of `DEC-20261022-01` C2, so the builder stopped. The facts it quoted match the code at the commit in the header.

A3. **The omission.** The drafting assistant drafted `DEC-20261022-01`, the Task 24 correction of `DEC-20261023-01` Part C and the Task 25 builder prompt, and did not carry the forwarding of `DEC-20261023-01` C1 forward to `publishIncident`. The builder found it, as its prompt required, before writing any code.

A4. **The drafting assistant.** It drafted this act and the acts it amends. None of that is an independent review.

## Part B: Founder rulings

B1. **The forwarding.** In `packages/supervisor/src/build.ts`, the broker delegate forwards `publishIncident` to the open broker exactly as it forwards `publish`. Nothing else in that file changes.

B2. **The regression test.** `packages/supervisor/test/build.test.ts` gains one test, `an adapter client from the build publishes a legal incident through its broker delegate`. From a fixture build, it publishes through an adapter's client an incident that passes `DEC-20261022-01` B2 steps 1 to 4, and asserts `ok: true`, that the two new durable rows are, in order, that incident and a `session_interrupted` record whose `source_event_id` is the incident's `event_id`, and that the ledger verifies. Nothing else in that file changes.

B3. **The pin.** Under `DEC-20261024-01` B1, Task 25 may change `test/phase3a/harness-separation.test.ts` only to set the `sha256` of the `build.ts` entry to the SHA-256 of `build.ts` as Task 25 commits it, and `DEC-20261024-01` B2 binds the builder and the review.

B4. **Paths.** `DEC-20261022-01` C2 is amended so: Task 25 is one commit that changes exactly its four paths and `packages/supervisor/src/build.ts`, `packages/supervisor/test/build.test.ts` and `test/phase3a/harness-separation.test.ts`, each only as B1 to B3 allow. `DEC-20261022-01` B9 and `DEC-20261023-01` C7 stand.

B5. **Verification.** `DEC-20261022-01` Part D is amended for Task 25 so: D1 adds `bun test packages/supervisor`; D2 adds the break of the delegate without `publishIncident`, which must fail the test of B2; and D3 adds `bun test packages/supervisor` with 0 fail, and reads the changed paths as the seven of B4. The test of B2 is written with the six tests of `DEC-20261022-01` B9, before any implementation exists.

B6. **The builder.** `session:codex/m10-task25-r1` resumes in its own clone at the binding base above, under an addendum I sign, only after this act merges. Its precondition checks stand.

B7. **The M22 advisory.** The advisory of my merge authorization of pull request 188, item 4, now covers `publishIncident` as well as `publish`: when the build result reaches more code, expose a supervisor handle without either.

B8. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. It adds no round.

## Part C: Filing

C1. One docs-only pull request files this act under `DEC-20261015-05` B3.

## Part D: Not authorized

- Any change to `build.ts` other than the forwarding of B1, including any other method added to the delegate or any change to how the delegate is made.
- Any change to `test/phase3a/harness-separation.test.ts` other than the pin of B3.
- Any change to the plan, the spec or any decision record other than this filing.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-24

Actor-Id: founder
