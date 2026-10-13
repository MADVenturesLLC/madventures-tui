FOUNDER-ACT-20261013-F1F2-TEST-TIMEOUT: an explicit timeout for the three F1/F2 real-run tests

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `3f9b414c0ffcaf6955873f757cb55b97b2de77a1`
> **Ratifies:** the patch with SHA-256 `ea8c2c955e16c6012e41edb82f9460fd87bd572d1c4369ace89f311634cee866` (1,027 bytes) against `packages/tui-chaos/test/review-corrections.test.ts`
> **Read with:** `DEC-20261011-02` A2, `DEC-20261012-02` B1, `DEC-20261012-04`, `DEC-20261013-01`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What failed.** On pull request 143, which adds only `docs/decisions/DEC-20261013-01-task45-execution-authorization.md`, the required check Verify (macOS) failed twice on the `macos-15` runner, at 01:41:32Z and, after one re-run, at 01:46:06Z on 2026-10-13. Both times the failing test was `F1/F2: real run — mixed selection (governance_focus + ansi_flood) > packet records the flags the run actually used and references existing casts`, test 1 of `DEC-20261011-02` A2. The log records that it "timed out after 5000ms", and the assertion at line 174 then saw a null exit code from the harness subprocess the timeout ended. The same test passed on `macos-15` on pull request 142 earlier that day at the same code.

A2. **Why.** The three F1/F2 tests each run the real `tui-chaos` harness in a subprocess, and none sets its own timeout, so Bun's default of 5,000 milliseconds applies. In the drafting assistant's own Linux container, running each test alone took 4,993 milliseconds of wall time for the mixed-selection test, 3,512 for the excluding-governance-focus test and 1,275 for the fixture-only test, including Bun's start-up, and each passed. The first runs at the edge of the default, so a slower runner fails it while the code is correct. Every pull request runs Verify (macOS), a required check, so this blocks merges that have nothing to do with the test.

A3. **The change.** The patch in the header gives each of the three F1/F2 tests an explicit timeout of `30_000` milliseconds, by changing its closing `});` to `}, 30_000);`. It changes nothing else: no assertion, no harness argument, no other test and no other file. The file's SHA-256 changes from `dce69aa2b9b7fb779201350433290f89a567cd2b0aba7e3aa975291dbf32b3a5` to `e6de132ffc4bcb4ffc97b3bd9b0a4a4a98d7e8c61bd43e5320ffb93acc77eac3`. With the patch, all eight tests of the file passed in that container.

A4. **What is not affected.** The three tests are not tests 4 to 6 of `DEC-20261012-03`, whose Part D forbids changing their assertions and timeouts. `DEC-20261012-02` B1 closed tests 1 to 3 as known failures on the Ubuntu PC, and this act does not reopen them.

A5. **The drafting assistant.** It read the failing check's annotations, the test file and the log lines the Founder retrieved, built the patch and ran the file in its own container. Its container is not a certification host, and none of that is an independent review.

## Part B: Founder rulings

B1. **Ratification.** I ratify the patch in the header. It takes effect when it is on `main` together with this act.

B2. **The timeout is a bound, not a waiver.** Each of the three tests must still pass every assertion. A run that exceeds 30,000 milliseconds fails, and is a finding to report, not a reason to raise the bound again.

B3. **Pull request 143.** After this act and its patch are on `main`, the branch of pull request 143 may be updated with `main` by one merge commit and no other change, so that its checks run against the fixed test. A ready-for-review authorization for it then names the new head.

B4. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. Rubric milestone 1 stays at **5**, rubric milestone 4 at **3**, and rubric milestone 6 at **0**.

## Part C: Filing

C1. One pull request files this act, applies the patch to `packages/tui-chaos/test/review-corrections.test.ts`, and changes nothing else. Its own checks run with the patch, and it merges only when every required check succeeds, under my separate merge authorization.

## Part D: Not authorized

- Any change to an assertion, to the harness, to any other test, or to any other file.
- Any change to a workflow, the plan, a spec or a decision record other than adding this act.
- Any change to tests 4 to 6 of `DEC-20261012-03`, and the ruling owed under its B6.
- Task 45 and every later task.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-13

Actor-Id: founder
