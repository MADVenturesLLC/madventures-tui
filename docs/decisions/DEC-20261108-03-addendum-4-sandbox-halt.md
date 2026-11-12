FOUNDER-ACT-20261108-PHASE-3B-H1 ADDENDUM 4: the sandbox halt of H1's fourth session, and its resumption

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261108-03` B6 item 3, B9 item 5 and Part D, as below
> **Read with:** `DEC-20261108-03` B5, B6, B8 to B10 and Part D; its Addenda 1 to 3; `DEC-20261023-01` Part B

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The fourth session.** H1's builder session under the fourth-session builder prompt, SHA-256 `80051c42bd4aaaf1b2446aa22bb55eb67978f4ba5f01d3a4a0de923160b8f085`, ran on `codex-cli 0.167.0`, checked every authority file, passed the baseline with 1914 pass and 0 fail across 140 files, and committed item 6 as `f4aefe1e89f566a0f4a76d7cc18c209f70d719e8` and item 7 as `8e5b471aed5330dd1b620f2a040540871b6fd047`. Each of item 7's five breaks failed as intended.

A2. **The sandbox.** The session's sandbox lets it write only under its writable roots. Before the baseline, `bun install --frozen-lockfile` failed in the sandbox with `EPERM` on Bun's temporary directory, log 039, and its retry, escalated with my approval, succeeded, log 040, with `bun.lock` byte-identical.

A3. **The halt.** Item 8's first break run, log 089, first load average 2.62, failed before its test reached any assertion, with `EPERM: operation not permitted, mkdtemp '/Users/michaeldaley/.madbridge-task48-Xn1ngv'`. The harness's own instructions to the builder direct an escalated retry after a sandbox refusal. With my approval, the builder retried it escalated, log 090, first load average 1.37, and the test failed as the break intends, reporting `openLedgers` 2 where 0 was expected. The builder restored the break byte for byte, saved its unfinished item 8 change as `pr/unfinished-item8.patch`, SHA-256 `78a8afc0a52f4230d91e1436b384b0d5e87923058d3138b6ca1a676ddad663d6`, restored the harness, and halted under `DEC-20261108-03` B9 item 5 with the tree clean at `8e5b471aed5330dd1b620f2a040540871b6fd047`. Its halt report is `pr/h1-halt-report.md`, SHA-256 `ae1c0b17539f7b5321061c46a6fb292c3536f24caebd0db39f9289f73a2b0828`, and its log manifest `pr/h1-halt-log-manifest.sha256`, SHA-256 `6bc3580edf356e901d836da03fc6318bf776a542cfa83725c9e779c5304b51e2`.

A4. **The drafting assistant.** A Claude Code session read an excerpt of the halt report that I copied to it, and drafted this addendum. That is not an independent review.

## Part B: Founder rulings

B1. **A sandbox refusal is not a test result.** A run that the sandbox refuses with `EPERM` on a path outside the session's writable roots, before the test reaches its first assertion, is not a failure under `DEC-20261108-03` B9 item 5 and is not a failed run under its Part D. The builder runs it once more, escalated with my approval for that command, and records both runs. Every other failure stays under B9 item 5 and Part D as written.

B2. **The two retries.** The escalated install of log 040 and the escalated break run of log 090 are accepted under B1. Log 090 is item 8's break run, if the item 8 change the builder commits is the change in `pr/unfinished-item8.patch` unchanged. If it differs, the builder makes and runs a new break of it.

B3. **Escalation from the first run.** From the resumption, every remaining command that runs Bun is run escalated from its first run, with my approval for that command alone, so that the sandbox refuses none of them. `DEC-20261108-03` B6 item 3 is read so. The load rule of `DEC-20261102-02` B4 applies to every such run.

B4. **The conflict.** Where the harness's own instructions and `DEC-20261108-03` or its addenda differ, the act and its addenda govern, and the builder stops and reports instead of following the harness. The retry of A3 is accepted under B1 and B2 and is not repeated as precedent.

B5. **Resumption.** H1 resumes in the same session, from `8e5b471aed5330dd1b620f2a040540871b6fd047`, under a resume message I sign that names this addendum: item 8 with its tests and commit, items 9 to 11, the gates in the order of Addendum 1, the build log, the pull request files and the attribution checks, as the fourth-session builder prompt says. The build log records A1 to A3, the two retries and this addendum, and keeps the log numbering the session has used. If that session cannot continue, a new session resumes the same way under a builder prompt I sign.

B6. **Counting and filing.** A halt is not a verdict and adds no round. These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it and is filed unchanged with the act that records H1's merge, with Addenda 1 to 3. Nothing else in `DEC-20261108-03` or its Addenda 1 to 3 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-09

Actor-Id: founder
