DEC-20261119-03 ADDENDUM 1: the load wait of the madv-surface 0.1.2 build

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`, for work in `MADVenturesLLC/madventures-surface`
> **Amends:** the logged wait that `DEC-20261119-03` B2 applies to the 0.1.2 builder from `DEC-20261112-03` Addendum 2 B3
> **Read with:** `DEC-20261119-03` B2, B4, B7 and B8; `DEC-20261112-03` Addendum 2 A1 and B3; `DEC-20261108-03` Addendum 5 B1, B2 and B5; `DEC-20261102-02` B4; `DEC-20261023-01` Part B

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The rule.** `DEC-20261119-03` B2 has the 0.1.2 builder run, before each command that runs tests, the logged wait of `DEC-20261112-03` Addendum 2 B3: it reads the one-minute load every 30 seconds, starts the command only once a reading is below 2.0, and, if no reading is below 2.0 within 20 minutes, stops and asks me to quiet the MacBook. Addendum 2 set that wait for the repeated gates of H2 in madventures-tui, after a test of process timing there failed in a run that began at a load of 5.88 (its A1).

A2. **The build so far.** The builder session `session:codex/surface-0.1.2-r1` passed its baseline at the base with 126 pass and 0 fail across 23 files, in a run whose wait read 1.81 and which began at a load of 2.52: log 091, SHA-256 `3847f3545775f9313b1f1df7b88bc3a150c656ca0d7cab2a1a66e403ec7cf7aa`. Bun reported 11.66 seconds for that run, under a per-test timeout of 20 seconds. Its waits before the tests of S2 (log 162) and of S3 (log 213) each ended after 20 minutes without a reading below 2.0, and each time it asked me to quiet the MacBook. Ten readings I took over five minutes on 2026-11-20, before the S2 wait was restarted, ranged from 2.00 to 3.29, with a 15-minute average between 2.50 and 2.59. The runs still to come include those of S3 to S6, the full run of the work and the gates, each after its own wait.

A3. **The drafting assistant.** A Claude Code session proposed this change and drafted this addendum. None of that is an independent review.

## Part B: Founder rulings

B1. **The wait.** For the rest of the 0.1.2 build, the logged wait that `DEC-20261119-03` B2 applies runs as `DEC-20261112-03` Addendum 2 B3 says, with 3.0 in place of 2.0: the builder reads the one-minute load every 30 seconds into the wait's own log and starts the command once a reading is below 3.0. If no reading is below 3.0 within 20 minutes, it stops and asks me to quiet the MacBook; that is not a halt, and it waits again when I answer. It records the uptime before every test run, as before.

B2. **What does not change.** In a run whose first load average was 2.0 or more, the builder still halts, and does not rerun, on a timeout or on a failure of any test or assertion it did not add or change for the current item, as `DEC-20261108-03` Addendum 5 B2 reads `DEC-20261102-02` B4. A failure of its own work in progress is still handled under Addendum 5 B1 and `DEC-20261023-01` B4. Any failure in the gates still halts at any load (`DEC-20261119-03` B8), and no failed run is rerun unchanged to obtain a pass. My runs under `DEC-20261119-03` B4 and B7 are not affected.

B3. **Delivery and record.** The builder learns of this addendum through a resume message I sign that names it by its SHA-256, and applies it from the first wait after that message. The completion of the build log records this addendum by its SHA-256 and, for each run since, the first load reading with the log of its wait; the pull request description says the same.

B4. **Counting and filing.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it and is filed unchanged with the act that records the build under `DEC-20261119-03` B9. Nothing else in `DEC-20261119-03` changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-20

Actor-Id: founder
