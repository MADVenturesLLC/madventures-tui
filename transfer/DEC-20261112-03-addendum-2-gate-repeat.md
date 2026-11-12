DEC-20261112-03 ADDENDUM 2: the repeat of H2's gates

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** how the load rule of `DEC-20261102-02` B4 applies to the repeated gates of H2
> **Read with:** `DEC-20261112-03` and its Addendum 1; `DEC-20261108-04` B9, Part D and its Addendum 1 B4; `DEC-20261108-03` Addenda 5 and 8; `DEC-20261112-01` B6; `DEC-20261102-02` B4; `DEC-20261023-01` Part B

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The halt.** After Addendum 1 and my third resume message, H2's builder session, in the record of Addendum 1 A1, ran the break of Addendum 1 A3, restored it, and made the third commit `b0463c0d239af0e600423e4958721f0b11c25014`, with parent `9cc055c3c4d643672fefe2b4c5d0ef78eb2572bd`. Its gates, the runtime check, `bunx tsc --noEmit`, `bun test packages/protocol`, `bun test packages/storage`, `bun test test/phase3a/evidence-pipeline.test.ts` and `bun test test/phase3a`, passed. Bare `bun test`, log 187, SHA-256 `131824f50b8fb71f613fe0e270f405d7de63706ad44c707de33437c9854537b2`, started at a first load average of 5.88 and ended with 1944 pass and 1 fail, 24055 `expect()` calls, across 142 files, of 1945 tests: the test "an unrecordable interruption is completed by next-start reconciliation" of `test/phase3a/adversarial/ledger-failure.test.ts` failed at line 50, where it expected no live process and found two. Its counts rose over the baseline's 1914 tests and 140 files by the 18 protocol and 13 storage tests and the two test files that H2 adds. The builder let the run finish, did not rerun it, and halted with the tree clean at the third commit. Its halt report is `pr/h2-gate-halt-report.md`, SHA-256 `40fab2d685edd793f2400d29bb2244aa5949d12eb88d7142d369bfe861b74e55`, and its log manifest `pr/h2-gate-halt-log-manifest.sha256`, SHA-256 `404d8e26bcb5d394f3bab3ce3e2f091ef40a6e91ae19a578b663ee3a9cf303a4`.

A2. **The test.** H2 changes neither that test nor the harness. Line 50 requires that, once the fixture's fault has recorded the time of death, no process the harness started is still alive. The harness gives preflight each fixture's capability record from memory, at line 445 of `test/phase3a/runtime-harness.ts`, so the test runs neither the store nor the freshness evaluation that H2 changes. In the same session, at the same head, `bun test test/phase3a`, which runs that file, passed. Two other tests of process timing have each failed once on macOS: `packages/broker/test/pty-host-supervisor.test.ts:631`, carried by `DEC-20261112-01` B6 item 3, and `test/phase3a/adversarial/supervisor-death.test.ts:115`, carried by my merge authorization of pull request 237. Why this one failed here is not established.

A3. **The host.** After the halt, my count-only command found shells left running by the tests of another project, in `/Users/michaeldaley/madv-harness`, and Hermes processes, with load averages 5.96, 7.06 and 7.33.

A4. **The load rule.** `DEC-20261102-02` B4 has the builder record the load before every test run and not pause for it. The gates run back to back, so each run starts under the load the run before it raised. `DEC-20261108-03` Addendum 8 met the same case in H1 with a wait for the load.

A5. **The drafting assistant.** A Claude Code session read the builder's report and the test, and drafted this addendum. None of that is an independent review.

## Part B: Founder rulings

B1. **The failure.** The failed run of A1 is recorded as it is. Its log stays unchanged. It is not a known failure and not a verdict.

B2. **The repeat.** The session resumes at `b0463c0d239af0e600423e4958721f0b11c25014`, under a resume message I sign that names this addendum. It repeats, each once, in order and with new logs, every gate of its builder prompt's THE GATES from the runtime check to bare `bun test`. It then completes the build log, makes the fourth commit, runs the last gates and makes its deliverables, as its builder prompt says.

B3. **The wait for the load.** Before each of the six commands of B2 from `bunx tsc --noEmit` to bare `bun test`, the builder runs a logged wait: it reads the one-minute load every 30 seconds and starts that command only once a reading is below 2.0. For these runs this replaces "does not pause for the load" of `DEC-20261102-02` B4. If no reading is below 2.0 within 20 minutes, the builder stops and asks me to quiet the MacBook; that is not a halt, and it waits again when I answer.

B4. **The host.** Before I send the resume message, no shell of `/Users/michaeldaley/madv-harness` runs. Until the last gate of B2 and my run on the MacBook under `DEC-20261108-04` B9 are done, no other agent session runs tests or builds on the MacBook.

B5. **Halts.** Any failure in the runs of B2, at any load, halts H2 for my ruling.

B6. **The test carried.** `test/phase3a/adversarial/ledger-failure.test.ts:50` is carried, with the items of `DEC-20261112-01` B6 and `supervisor-death.test.ts:115`, to the hardening act I issue before M6. That act names the cause of its failure, or a ruling on it.

B7. **The record.** The completion of the build log also records A1 to A3 in short, the failed run with its log SHA-256 and summary lines, this addendum by its SHA-256 in `prompt/SHA256.txt`, and the first load reading of each run of B2 with the log of its wait. The pull request description says the same.

B8. **Counting and filing.** A halt is not a verdict and adds no round. These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it and is filed unchanged with the act that records H2's merge, with Addendum 1. Nothing else in `DEC-20261112-03` or its Addendum 1 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-12

Actor-Id: founder
