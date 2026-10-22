FOUNDER-ACT-20261022-CLEANUP-BUDGET-TEST-CORRECTION: the elapsed-time bound of the cleanup-budget test, and the Task 24 base

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `f201ced6d2339ae50dcd9a5608a2b92eae4d5165`
> **Binding base:** the `origin/main` commit the builder prompt of this correction names, which must contain this act
> **Read with:** `AGENTS.md`; `DEC-20261013-03` B2 item 1; `DEC-20261015-05` B1 to B7; `DEC-20261021-01` B3; `DEC-20261022-01` B1, B10, C1, D1 to D3 and E3

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What was checked.** The drafting assistant read, at the commit in the header, `packages/supervisor/test/attestation.test.ts` in full, `packages/supervisor/src/attestation.ts` lines 42 to 44 and 140 to 160, `apps/madbridge/test/doctor.test.ts` lines 1 to 45, and the acts in the header. It read the Task 24 builder's two stop reports and the M20 corrections build report as the Founder relayed them. It ran no test.

A2. **The test.** `cleanup budget exhaustion fails closed` takes its start time before the fixture is spawned. It aborts only after the fixture writes its readiness marker. The fixture ignores SIGTERM, and the test delays its exit promise by 700 ms, so the probe escalates to SIGKILL after the 500 ms grace and returns when its 1,000 ms cleanup budget ends. The measured time is therefore the fixture's startup, plus the cleanup budget, plus scheduling. The bound of less than 1,150 ms leaves about 150 ms for a Bun process to start and write its marker. It measures the host as much as the probe.

A3. **The measurements.** On the MacBook, with the certification runtime: 1,104.99 ms and 1,107.93 ms in the M20 corrections build, which merged as `b7cbce50f3494f2b9bae1e3de9844a558af86360` within `3dc42f8b687fbd41cca45456f127e66114ce212c`; 1,290.455 ms at the Task 24 D1 baseline, on the unchanged binding base, with load averages near 2.1 to 2.5; and 1,220.565 ms at the Task 24 D3 full suite, at a load of 1.48, after `bun test packages/broker` had passed 290 of 290. No Task 24 path is in `packages/supervisor`.

A4. **Why it blocks.** `DEC-20261022-01` B10 allows no known-failure set and no timing exception on the MacBook, D3 requires bare `bun test` to show 0 fail, and E3 requires each reviewer to reproduce D3. Tasks 24 and 25, and both reviews, depend on this test passing on the MacBook.

A5. **What stays open.** `doctor: read-only invariant > no files created in cwd` failed by its 5,000 ms timeout at the Task 24 D1 baseline and passed at D3. Its cause has not been found. It is not ruled here. Nor are the other items of `DEC-20261022-01` A4.

A6. **The drafting assistant.** It drafted the M20 corrections builder prompt and the addenda that hardened this test, and this act. None of that is an independent review.

## Part B: Founder rulings

B1. **The correction.** In `cleanup budget exhaustion fails closed`, the elapsed time is measured from the moment the test's abort fires, taken inside the test's own wrapper of `c.abort`, to the return of `runBoundedProbe`. The bound stays less than 1,150 ms: the 1,000 ms cleanup budget plus 150 ms. The test's name, its fixture, its 700 ms exit delay and its other assertions (`ok` false, signals `SIGTERM` then `SIGKILL`, and readiness at the abort) stay as they are. No other test changes. No source file changes.

B2. **Builder.** A fresh Codex CLI session on my MacBook, with Actor-Id `session:codex/cleanup-budget-test-r1`, in its own clone at the binding base, under the macOS certification runtime of `DEC-20261013-03` B2 item 1 and the PATH rule of the M20 corrections builder prompt. It makes no GitHub call.

B3. **Reviewer.** A fresh Gemini 4 session on the Antigravity surface on my MacBook, reviewer id `antigravity`, which has seen no material of this correction. PASS only if B1 holds, the changed path is exactly C1's, and the reviewer reproduces D3 and both breaks of D2 and tries to defeat the test.

B4. **Host.** No known-failure set and no timing exception applies on the MacBook, except at this correction's D1, as D1 says.

B5. **The Task 24 base.** I read the binding base of `DEC-20261022-01`, the `origin/main` commit its builder prompt names, as allowing an addendum I sign to that prompt to name a later base. After this correction merges, such an addendum may name the merge as Task 24's new binding base, if it contains `f201ced6d2339ae50dcd9a5608a2b92eae4d5165` and changes no path under `packages/broker/`, `packages/ledger/` or `packages/protocol/` since it. The builder then fast-forwards its branch to that base without committing, keeps the uncommitted candidate of C1, runs D1 again on the new base, and runs D3 in full. Its RED run and D2 breaks stand.

B6. **Counting.** This ruling adds no round and counts no finding. Whether this defect counts against the M20 corrections build is left to the act that closes that checkpoint.

## Part C: Scope

C1. One commit that changes exactly `packages/supervisor/test/attestation.test.ts`. Every other path stays byte-identical, including `bun.lock` and every manifest.

## Part D: Verification

D1. **Baseline:** `bun install --frozen-lockfile`, `bunx tsc --noEmit`, `bun test packages/supervisor` and bare `bun test`, each once, in the foreground, with `uptime` recorded before each test run, all verbatim. A failure of `cleanup budget exhaustion fails closed` on its elapsed-time bound, or of `no files created in cwd` by its timeout, is recorded and is not a stop. Any other failure is a stop.

D2. **Breaks:** each fails the corrected test, is restored, and has its file's SHA-256 confirmed. None is committed.

1. In `attestation.ts`, the second wait of the cleanup path awaits `reaped` with no deadline.
2. In the test, the abort fires at spawn, before the readiness marker exists.

D3. **Final:**

- `tsc` exits 0;
- `bun test packages/supervisor/test/attestation.test.ts` passes five times in a row, each run separately in the foreground;
- `bun test packages/supervisor` shows 0 fail;
- bare `bun test` shows 0 fail, run once after `uptime` shows a first load average under 2.0;
- `git diff --check` is clean;
- the changed path is exactly C1's.

## Part E: Binding

E1. **Commit.** Subject `test(supervisor): measure the cleanup-budget bound from the abort`. Its message and the pull request description end with these three trailers, and no line after them:

```text
Role-Id: builder
Actor-Id: session:codex/cleanup-budget-test-r1
Execution-Surface: codex
```

E2. **Merge.** Its own Tier-2 review at its exact head and its own merge authorization, under `DEC-20261015-05` B4 and B5, by merge commit only, under `DEC-20261021-01` B3.

## Part F: Not authorized

- Any change to `attestation.ts` or any source file, to the bound's value, or to any other test, including `doctor.test.ts`.
- Any change to Task 24's candidate, or any path of `DEC-20261022-01` C1 or C2.
- Any caller of preflight, any change to the plan, the spec or any decision record.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-22

Actor-Id: founder
