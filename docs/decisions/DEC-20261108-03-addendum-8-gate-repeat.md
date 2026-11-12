FOUNDER-ACT-20261108-PHASE-3B-H1 ADDENDUM 8: the failed bare-suite gate of H1's sixth session, and the repeat of its gates at a quiet load

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** Addendum 7 B2 and B3, and `DEC-20261102-02` B4 for the runs of B2 below, as read below
> **Read with:** `DEC-20261108-03` B8, B9 and B12; its Addenda 1 to 7; `DEC-20261102-02` B4; `DEC-20261023-01` Part B

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The halt.** H1's sixth session, whose record is `rollout-2026-11-10T12-39-58-01a1c68b-94bb-7a13-8bf8-654f3e111cf4.jsonl` under the governed launcher, made the sixth commit `5279efd8a07f0f9545b70519fef76f22e68112f3`, with parent `d09712a67db06fc6a7cee9bf0674ac8b509a8200`, changing only the closing line of the test of Addendum 7 A2. Its gates `bunx tsc --noEmit`, the architecture file, the evidence file and `bun test test/phase3a` passed. Bare `bun test`, log 223, SHA-256 `d61a5ca945f2839abf0ddb36b48fc3351e821ec164292c1fb8d5c6994f33c2a5`, started at load averages 4.80 6.26 6.72 and ended with 1912 pass and 2 fail across 140 files, exit status 1: the tests "doctor: read-only invariant > no files created in cwd" and "doctor: read-only invariant > no files created in home .madv-runtime" of `apps/madbridge/test/doctor.test.ts` timed out after 5000 ms, at 5004.44 and 5003.07 ms. In that run the test of Addendum 7 A2 passed in 1589.79 ms. The builder let the failed run finish, did not rerun it, and halted under Addendum 7 B2 with the tree clean at the sixth commit. Its halt report is `pr/h1-session6-halt-report.md`, SHA-256 `98f8237e92d0e4961549e743b84dfa7275845c818f98b95e1b0de86f0b1bd83f`, and its log manifest `pr/h1-session6-halt-log-manifest.sha256`, SHA-256 `0e8e1890539aa8f87f11d908c1e4b3ea4619dcb551c15e68c97a209392093865`; the report lists its deviations. Every run of the session started at a first load average of 4.80 or more, up to 10.56.

A2. **The two tests.** H1 changes neither `apps/madbridge/src/commands/doctor.ts` nor its test. Each call of that command in the test file writes stand-in scripts for `bun`, `claude` and `agy` into a new temporary folder and starts them as child processes through a shell. In the seven Verify (macOS) jobs the drafting assistant read, the two tests took from 22 to 61 ms; on Linux, from 4 to 7 ms; and they passed in the fifth session's bare `bun test` on this MacBook. In log 223, Bun printed "killed 1 dangling process" before each of the two failures, and the ten other tests of that file took from 212 to 2974 ms, where they took from 23 to 53 ms in the first run of each of the three latest Verify (macOS) jobs. Why those child processes were so slow here is not established.

A3. **The host.** During the sixth session the MacBook also carried orphaned shell processes left by the tests of another project, in `/Users/michaeldaley/madv-harness`: 28 when first counted, each idle in its own process group at about 2% of a CPU, started from 2026-11-09 08:25 to 2026-11-10 12:47 local time, and 32 when I stopped them all after the halt. None came from `/Users/michaeldaley/builds/h1-r1`. Hermes also ran during the session; I stopped it after the halt. After the halt, the macOS trust service `trustd` used about 20% of a CPU.

A4. **The load rule.** `DEC-20261102-02` B4 has the builder record the load before every test run and not pause for it. The gates run back to back, so each run starts under the load the run before it raised.

A5. **The drafting assistant.** A Claude Code session read the halt report and the job logs, found the shells of A3 through read-only commands I ran, and drafted this addendum. None of that is an independent review.

## Part B: Founder rulings

B1. **The failure.** The failed run of A1 is recorded as it is. It is not a known failure, its log stays unchanged, and it is not a verdict.

B2. **The repeat.** The sixth session resumes at `5279efd8a07f0f9545b70519fef76f22e68112f3`, under a resume message I sign that names this addendum. It repeats, each once, in order and with new logs, the runtime check, the five gates of `DEC-20261108-03` B8 item 4 from `bunx tsc --noEmit` to bare `bun test`, and the New York run of Addendum 7 B2 item 2. It then writes the build log, makes the seventh commit and runs the last four gates, as Addendum 7 B2 items 3 and 4 say.

B3. **The wait for the load.** Before each of the six commands of B2 that start Bun, the builder runs a logged wait: it reads the one-minute load every 30 seconds and starts that command only once a reading is below 2.0. For these runs this replaces "does not pause for the load" of `DEC-20261102-02` B4, and Addendum 7 B2 item 2's "at once" is read as "as soon as this wait allows". If no reading is below 2.0 within 20 minutes, the builder stops and asks me to quiet the MacBook; that is not a halt, and it waits again when I answer.

B4. **The host.** Before I send the resume message, no orphaned shell of `/Users/michaeldaley/madv-harness` runs. Until the last gate of B2 and my run of `DEC-20261108-03` B12 are done, no other agent session runs tests or builds on the MacBook.

B5. **Halts.** Any failure in the runs of B2, at any load, halts H1 for my ruling, as Addendum 7 B2 says. Addendum 7 B4 is unchanged: the sixth session stays the one record beyond the four of Addendum 6 A2, and it writes none of the six names.

B6. **The record.** The build log's "Sixth session" section of Addendum 7 B3 also records A1 to A3 in short, the failed run with its log SHA-256 and summary lines, this addendum by name and SHA-256, and the first load reading of each run of B2 with the log of its wait. The pull request description says the same.

B7. **Counting and filing.** A halt is not a verdict and adds no round. These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it and is filed unchanged with the act that records H1's merge, with Addenda 1 to 7. Nothing else in `DEC-20261108-03` or its Addenda 1 to 7 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-10

Actor-Id: founder
