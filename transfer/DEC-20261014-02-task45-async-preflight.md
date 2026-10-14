FOUNDER-ACT-20261014-TASK45-ASYNC-PREFLIGHT: runPurePreflight returns a Promise

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `b5662096d0f03929602c90a0d8c2c5cfaa8ad24d`
> **Amends:** `DEC-20261013-01` (`FOUNDER-ACT-20261013-TASK45-EXECUTION-AUTHORIZATION`, SHA-256 `fd6d9ad9cc014f2bead775929e3d133583113283b41b669099c18e17eba25d1d`)
> **Read with:** plan Task 45, its Interfaces; `PLAN-OPEN-2`, Bounded auth-probe execution; `DEC-20261013-01` A2, B1, B3, B6 and C2

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The stop.** The Task 45 builder session that started under the builder prompt with SHA-256 `e4045d2790e7ce833bd7133050b3997f25f41fee5dc180a5dc3b136a0c1be066` and the resumption note with SHA-256 `ddc35d9ee661f1a251522bcdd14768905f2eaca942f82ef3e75e0bae6430e85e` passed D2 under B9: typecheck and the supervisor tests passed, and its one full-suite run gave 1,582 pass and 1 fail, test 4, with tests 5 and 6 passing. It then stopped before any edit and reported `FOUNDER_DECISION_REQUIRED`. Its report is `/home/michaeldaley/task45-r1-pr/task45-r3-stop-report.md`, SHA-256 `d6cfc4e4596e72c19f3ef207b9957ebbf75750e3540c4f2d601a3738e28142b4`. The tree stayed clean at `09340bfac348c9e0c03d7839d2bf45ba221f83c4`.

A2. **The conflict.** Plan Task 45 gives `runPurePreflight` a synchronous return type. `PLAN-OPEN-2` requires the bounded probe runner to accept the preflight cancellation signal after spawn, and on cancellation, timeout or oversized output to send `SIGTERM`, wait no more than 500 milliseconds, send `SIGKILL` if the probe is still alive, and reap it within the 1,000-millisecond cleanup budget, with deterministic tests for post-spawn cancellation and that escalation. While a synchronous call runs, no abort event and no timer can be handled, so a synchronous `runPurePreflight` cannot meet those rules. `DEC-20261013-01` A2 left the plan's interface unchanged.

A3. **The drafting assistant.** It drafted this act after reading the plan's Task 45 interface and `PLAN-OPEN-2`'s bounded-execution section at the commit in the header. It has not read the stop report. None of that is an independent review.

## Part B: Founder rulings

B1. **The return type.** `runPurePreflight` returns a `Promise` of the result the plan's interface names: `Promise<PreflightOk | { readonly ok: false; readonly failure: PreflightFailure; readonly detail: string }>`. The function may be declared `async`. `PreflightInput`, `PreflightOk`, `LaunchPlan`, the eleven `PreflightFailure` members, the order and failure codes of `DEC-20261013-01` B2, and every other ruling of that act are unchanged.

B2. **The probe runner.** The bounded runner of `DEC-20261013-01` B3 may be asynchronous, and it must meet every rule of `PLAN-OPEN-2`'s bounded auth-probe execution, including pre-spawn and post-spawn cancellation through the `AbortSignal` of `DEC-20261013-01` B1.

B3. **Purity is unchanged.** Being asynchronous changes nothing that preflight may create or read. It still creates nothing in governed storage, the repository, the ledger or session state, and `preflight.ts` still reads no `process.env` and holds no operating-system branch.

B4. **Tests.** The twenty-two tests of `DEC-20261013-01` B6 keep their names and their number. A test that calls `runPurePreflight` awaits it. `test("a cached attestation is not reused across sessions")` awaits each of its two preflights in turn.

B5. **The plan is not edited.** The plan's Interfaces line for Task 45 is read with the return type of B1. `DEC-20261013-01` C2 stands: no caller of `runPurePreflight` is added or changed.

B6. **The baseline and the resumption.** The D2 baseline of A1 stands for the session that recorded it. If that session is still open, it continues from D3 after `git fetch origin main` shows this act on `origin/main`, under the builder prompt and the resumption note of A1. If it is not, a new session starts under that prompt and that note and records its own D2. Either way, the session's first message after this act is on `main` is: "DEC-20261014-02 is on origin/main. Read it in full, confirm its SHA-256, then continue Task 45 under it, the builder prompt and the resumption note."

B7. **Counting.** This is a new Founder ruling made before the implementation, which plan §11.3 does not count. It adds no round. Rubric milestone 6 stays at **0**.

## Part C: Filing

C1. One docs-only pull request files this act and changes nothing else. It merges only when every required check succeeds, under my separate merge authorization. A change under `docs/` only meets precondition 1 of the builder prompt.

## Part D: Not authorized

- Any other change to the interface of plan Task 45, to `PreflightInput`, `LaunchPlan` or the failure codes.
- Adding or changing a caller of `runPurePreflight`.
- Any change to `PLAN-OPEN-2`'s bounds, to the plan, a spec or another decision record.
- Task 46 and every later task.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-14

Actor-Id: founder
