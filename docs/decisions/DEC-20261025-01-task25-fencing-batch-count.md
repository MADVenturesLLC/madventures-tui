FOUNDER-ACT-20261025-TASK25-FENCING-BATCH-COUNT: the atomic-batch count of the Task 19 module-discipline test

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `6d7870de660f2eee00b91ce01410a7f7573723fe`
> **Binding base:** for Task 25, `7e4572c95d90c19b5403c07c8d4cd146c6d37d98`, as its builder prompt names it
> **Read with:** `AGENTS.md`; `DEC-20261022-01` Parts B to E; `DEC-20261023-01` Part B; `DEC-20261024-02`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What was checked.** The drafting assistant read, at the binding base, `packages/broker/test/fencing.test.ts` lines 1466 to 1504, the call sites of `appendMany` in `packages/broker/src/runtime-broker.ts`, every test file under `packages/` and `test/` that reads `runtime-broker.ts`, `in-process-client.ts` or `build.ts` as source, every test that asserts the detail `incident publication not wired`, and the stop report of the Task 25 builder as I relayed it. It ran no test.

A2. **The stop.** The Task 25 builder, `session:codex/m10-task25-r1`, under addendum 1 of its builder prompt, completed D1's install, `tsc`, and broker, ledger and supervisor runs with 0 failures, and stopped before D1's bare `bun test` and before any edit. The test `the runtime broker performs no ambient discovery, holds no process authority, and batches only the compensation`, in `packages/broker/test/fencing.test.ts`, reads `runtime-broker.ts` as text and asserts, at line 1495, that `appendMany(` occurs in it exactly once, the failed-activation compensation at line 366. `DEC-20261022-01` B7 requires `publishIncident` to call `Ledger.appendMany` exactly once, which makes two call sites. `fencing.test.ts` is not among the paths of `DEC-20261024-02` B4, so the builder stopped. The facts it quoted match the code at the binding base.

A3. **Nothing else found.** Apart from that test, the only test that reads any of those three files as source is the digest pin of `build.ts` in `test/phase3a/harness-separation.test.ts`, which `DEC-20261024-02` B3 already covers. The only test that asserts `incident publication not wired` is the one `DEC-20261022-01` B9 replaces.

A4. **The omission.** The drafting assistant drafted `DEC-20261022-01`, `DEC-20261024-02` and the Task 25 builder prompt and its addendum, and did not find this assertion. The builder found it, as its prompt required, before any edit.

A5. **The drafting assistant.** It drafted this act and the acts it amends. None of that is an independent review.

## Part B: Founder rulings

B1. **The count.** In `packages/broker/test/fencing.test.ts`, Task 25 changes only the assertion at line 1495, from one occurrence of `appendMany(` in `runtime-broker.ts` to exactly two, and the comment on the line before it, to say that exactly two atomic batches exist: the failed-activation compensation and the published-incident pair. Nothing else in that file changes, including that test's other assertions and its list of value imports.

B2. **The imports.** `publishIncident` and what `DEC-20261022-01` B7 requires of it add no value import to `runtime-broker.ts`. If the work needs one, the builder stops.

B3. **Paths.** `DEC-20261024-02` B4 is amended so: Task 25 is one commit that changes exactly its seven paths and `packages/broker/test/fencing.test.ts`, the last only as B1 allows.

B4. **Verification.** `DEC-20261022-01` Part D, as `DEC-20261024-02` B5 amends it, stands, except that D3's changed-path check lists the eight paths of B3. D3's check that the incident path has exactly one `appendMany` call site stands. The completed D1 runs stand and are not rerun; the builder runs D1's bare `bun test` at the binding base before its first edit.

B5. **The builder.** `session:codex/m10-task25-r1` continues in the same session and clone, under an addendum I sign, only after this act merges.

B6. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. It adds no round.

## Part C: Filing

C1. One docs-only pull request files this act under `DEC-20261015-05` B3.

## Part D: Not authorized

- Any change to `fencing.test.ts` other than the assertion and comment of B1.
- Any value import added to `runtime-broker.ts`.
- Any change to the plan, the spec or any decision record other than this filing.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-25

Actor-Id: founder
