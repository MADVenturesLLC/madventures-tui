ADDENDUM 3 TO DEC-20261104-02: the whitespace check at the candidate, and the script of the certification runs

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261104-02`, filed at `03e9efec79eaeacb0ff185e2d84cf94a14aa46e6`, SHA-256 `011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5`, as Addenda 1 and 2 amended it
> **Candidate commit:** `ffcecaf9dbb6b2de3b406e475825137ddfe726b7`, the merge of pull request 224, fixed under B5
> **Read with:** `DEC-20261104-02` B5, B6, B7, B9 and Part D; Addenda 1 and 2; `DEC-20261013-03` B2 and B4; plan §8.3, §8.8 and §12

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The whitespace check.** Plan §8.3 step 2 runs `git diff --check "$SOURCE_BASELINE_SHA"`, with the source baseline `aa16032c56fdf6c7105e99b1765ed9365d605bf4`, and §8.8 requires it clean. At the candidate commit it exits 2 and prints 33 lines, 2,138 bytes, SHA-256 `fe33892c34b87319d59b7f0562373aa2d188cc2a5565a0e0e2daed19f72d6438`: 17 whitespace errors in 7 files.
1. Sixteen are trailing whitespace in four decision records, `DEC-20260812-01`, `DEC-20260926-01`, `DEC-20260929-01` and `DEC-20261103-02`, in `docs/verification/2026-09-11-m6-final-checkpoint.md`, and in `docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md`. Most are two trailing spaces that end a Markdown line.
2. One is a blank line at the end of `apps/madv-agent/src/proxy.ts`, merged in pull request 171.

A2. **Why they stay.** The decision records are signed texts that no act lets anyone edit, and B6 lets no code or test change merge after the candidate commit other than Task 58's and Task 59's own commits.

A3. **The runs.** The drafting assistant wrote the script of B4 and ran a shortened copy of it in its own workspace, with a Bun that is not a certification runtime, against a local copy of the candidate commit. That run found and fixed a fault in its log numbering, and showed that the script records each command, checks the output of A1, and turns a failed check into a halt. It certifies nothing.

A4. **The drafting assistant.** It drafted this addendum and the script, and found A1. None of that is an independent review.

## Part B: Founder rulings

B1. **The whitespace check.** On each host, the check of A1 is run and logged as §8.3 step 2 says. It counts as clean under §8.8 when it exits 2 and its output is the 33 lines of A1, byte for byte. Any other output or exit is a halt under B7 item 6.

B2. **Git configuration.** Every git command of the runs of B7 and B10 runs with `GIT_CONFIG_GLOBAL=/dev/null` and `GIT_CONFIG_NOSYSTEM=1`, so that no setting of mine changes its output.

B3. **Environment.** Before any command, the runs unset every variable whose name ends in `_TOKEN`, `_API_KEY` or `_SECRET`, and print none. Every command reads its input from `/dev/null`. Nothing else in the environment changes, and `TERM` and `SHELL` are recorded as they are.

B4. **The script.** The measurement of B7 is the script `task58-cert-run.sh`, SHA-256 `c3c8f3c8b63267b815320c2f1ab741d99fcfb46dfaa22b625f1f20cf9333bcce`, which I sign with this addendum.
1. I run it on each host from that file, in the foreground, in a terminal on that host. It takes no argument and refuses to start if its folder `~/builds/task58-cert-<host>` exists.
2. Its checks before any command: the runtime of B7 item 1, Node.js 20 or later, no Hermes process, the candidate commit and its two parents, and `bunx tsc --version` as a check that `bunx` runs under that runtime. These are not commands of B7 item 4.
3. It runs the commands of B7 item 4 in the plan's order, each once, and does not stop at a failure. It writes one log per command and `MANIFEST.sha256` over every log, and its last line names the host and the result, CLEAN or HALT.
4. Besides the halts of B7 item 6, it marks HALT when a log of a run of `packages/pty-host/test/signals.test.ts` lacks either line of Addendum 1 B2, when any `grace_ms` is below 2000, when the tree or `bun.lock` changes during the run, or when a Hermes process appears.

B5. **The limitation.** The 17 errors of A1 are a stated limitation, recorded in each report and in the Task 59 evidence. The blank line at the end of `apps/madv-agent/src/proxy.ts` is carried to the first Phase 3B act. The documents stay as signed.

B6. **Counting and filing.** These are new Founder rulings, which plan §11.3 does not count. This addendum takes effect when I sign it and is filed unchanged with my next act, with Addenda 1 and 2.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-05

Actor-Id: founder
