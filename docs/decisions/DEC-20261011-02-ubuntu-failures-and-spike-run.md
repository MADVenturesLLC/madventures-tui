FOUNDER-ACT-20261011-UBUNTU-FAILURES-AND-SPIKE-RUN: the six Ubuntu host failures taken up, and the Ubuntu PC spike run authorized

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `70221e5e63a6ae0678154c871b2482a0c52fc6c7`
> **Governs:** `DEC-20261011-01` B2 item 2, `DEC-20261010-04` B4, and the spike run of `DEC-20261010-02` B2
> **Read with:** `DEC-20261010-02` (SHA-256 `cae5ac6b59618507f6ff3ef0f4d2cd5bca1909f328023248db8d234c4098b5a1`), `DEC-20261010-04` (SHA-256 `9cec4d8826d67cfa0bb64269b83ce5cc035a17e114aef30470fefd4ce6313272`) and its A2 item 4, `DEC-20261011-01` (SHA-256 `3182e026f21417ad85cb601a89201d447daee41f986d5c33512d6e17cb61b60f`), plan sections 8 and 11.3

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What this act takes up.** `DEC-20261011-01` B2 item 2 requires a separate act to take up the six full-suite failures on my Ubuntu PC before the Ubuntu spike run of `DEC-20261010-02` B2. Part D of `DEC-20261010-02` left that spike run unauthorized. This act does both.

A2. **The six failures as observed.** At base `acab0dfadc4e4650ddeaadb836bc516156766848`, with Bun 1.4.2 on the Ubuntu PC:

1. `F1/F2: real run — mixed selection (governance_focus + ansi_flood) > packet records the flags the run actually used and references existing casts`
2. `F1/F2: real run — excluding governance_focus > single ansi_flood run references its own cast, never a nonexistent one`
3. `F1/F2: real run — ordinary fixture-only scenario > layout_resize-only run records only the base fixture flag`
4. `governed-child environment forwarding: exact key-set equality with the launch-frame env, ambient canary absent (C7 evidence 7)`
5. `natural child exit without a terminate command publishes an exact marker, drained, and exited exactly once`
6. `early child output cannot precede launched and ready, and is required, not merely allowed`

Tests 1 to 3 expected the harness subprocess to exit 0 and saw 1, after about 95 ms each. Test 4's child environment lacked `MADV_FIXTURE_MARKER`. Tests 5 and 6 timed out at 4,000 ms. The builder's run outside its sandbox and my own terminal each showed 1,572 pass and 6 fail in 1,578 tests across 97 files; my log has SHA-256 `43215130d8fb658abce637b2143a6fd08610a0b8790e9337f8118c0984d989e5`. The `gemini-antigravity` review session on the same PC saw only tests 4 to 6 fail, at both the base and the Task 37 head. Tests 1 to 3 passed there.

A3. **What the drafting assistant found by reading the code.** These are leads, not causes. None has been confirmed on the Ubuntu PC.

1. *Tests 1 to 3.* The harness's PTY transport needs a `node` binary on `PATH`. `findNodeRuntime` in `packages/tui-chaos/src/pty/session.ts` throws without one, and the harness then exits 1. The tests capture only standard output, so the reason is not printed. On 2026-10-10 the PC had `git`, `gh`, `agy` and `claude` installed (`DEC-20261010-02` A2), and Node.js was not among them. A missing `node` would explain why tests 1 to 3 failed in my terminal and the builder's session but passed in the review session, if the review surface supplies one.
2. *Test 4.* On Linux this fixture reads `/proc/self/environ` with `/usr/bin/awk`, splitting records on NUL (spec §1.5 row 4 in the Linux amendment draft). The assistant ran the same program in its own Linux container, with `mawk 1.3.4 20240123` as `/usr/bin/awk`, and it printed every variable name. The awk explanation is therefore not supported for that version. The cause on the Ubuntu PC is unknown.
3. *Tests 5 and 6.* Both launch a `/bin/sh` child that exits on its own and wait for the natural-exit lifecycle. That path depends on the production child-liveness probe, which on Linux reads `/proc/<pid>/stat` (spec §1.5 row 1 in the Linux amendment draft). A builder's earlier stop report from a macOS run inside a sandbox that denied `ps` showed the same two tests timing out at 4,000 ms (SHA-256 `a1fe30ba1fff10ce956407cb1fbeebdf594d464a52a080431e401aefb3ca132b`). Both tests pass in CI on `ubuntu-24.04`.

A4. **Why they matter.** Plan §8.8 requires zero failures on every certification host. Tests 5 and 6 concern production PTY-host behavior on the Linux profile Phase 3A will support. Tests 1 to 3 may only need a host prerequisite.

A5. **The spike run.** M17 passed on both Macs on 2026-08-22, each in a detached worktree at the candidate, with `bun install --frozen-lockfile`, three consecutive runs of `bun test test/phase3a` and `bunx tsc --noEmit`. Each report was generated on its host from that host's retained evidence by a generator that stops on any shortfall. The Ubuntu run mirrors that, at a then-current `main` commit.

A6. **The drafting assistant.** It drafted this act, read the code in A3 and ran the one container test in A3 item 2. None of that is runtime evidence from the Ubuntu PC, and none of it is an independent review. Its draft 1 of the Linux amendment (patch SHA-256 `610bae626c715878ae2219e934156349f20ef2e0dccc7a5446b2b9b2c2dcd1ba`) is neither ratified nor filed by this act.

## Part B: Founder rulings

B1. **Classification.** The six failures of A2 are pre-existing failures on the Ubuntu PC. Task 37 did not cause them. They are open defects or host-setup gaps, and none is waived. None counts as a correction round.

B2. **Known-failure rule on the Ubuntu PC.** Until a later act closes a test in A2, a full-suite check on the Ubuntu PC is met only if no test fails or errors other than the open tests of A2, and each of those fails as A2 records. Any other failure, or an A2 test failing in a different way, stops for my ruling. An A2 test that passes is recorded and is not a stop. This rule binds builders, reviewers and the run in B4. It does not apply on the Macs or in CI.

B3. **Diagnostics.** In the run of B4, I capture, at the same commit and in the same worktree:

1. `command -v node`, and `node --version` if one is found;
2. the F1/F2 harness invoked once directly, `bun packages/tui-chaos/src/cli.ts run --scenarios layout_resize --out <fresh temporary directory> --json`, with its exit status and standard error;
3. `readlink -f /usr/bin/awk` and that program's version line;
4. the test 4 fixture's Linux awk program run once under `env -i` with only `PATH` and `MADV_FIXTURE_MARKER=1`, reading `/proc/self/environ`, which prints variable names only;
5. `readlink -f /bin/sh`; and
6. tests 4, 5 and 6 each run once alone by name.

These commands change nothing outside the temporary directory, print no environment value other than the marker in item 4, and list no processes.

B4. **The Ubuntu spike run is authorized.** I run it on the Ubuntu PC myself, from a run script that the drafting assistant drafts after this act is on `main`. I read the script before I run it, and the report records its SHA-256. The run:

1. creates a fresh detached worktree at the then-current `origin/main` commit and records that commit; no existing checkout is touched;
2. runs `bun install --frozen-lockfile`, with network access for that command only; `git status --porcelain` and `git diff -- bun.lock package.json` must then be empty, except that if the only change is `packages/founder-act/src/main.ts` turning to mode `100755`, as it did for both the Task 37 builder and its reviewer on this PC, the run restores mode `100644`, records that it did, and checks again;
3. records `uname -m`, `uname -r`, `PRETTY_NAME` from `/etc/os-release`, the Bun path, `bun --version`, `Bun.revision`, the Bun binary's SHA-256, `TERM` and `SHELL`; Bun must report 1.4.2 (`DEC-20261010-02` B8);
4. runs `bun test test/phase3a` three consecutive times; each run must have zero failures, with all thirteen §3.6 criteria passing and their observed timings captured;
5. runs `bunx tsc --noEmit`, which must exit 0;
6. runs one full `bun test`, judged under B2;
7. runs the diagnostics of B3; and
8. confirms `git status --porcelain` is empty at the end.

No step is retried. Any shortfall in items 2 to 6 or 8 stops the run for my ruling, with its evidence kept. Nothing in the repository is changed, and nothing is pushed.

B5. **The report.** If B4 completes, a generator in the run script writes the report on the Ubuntu PC, only from the run's retained evidence, and writes nothing if any item of B4 fell short. The report's path is `docs/verification/<UTC date the run started>-bun-terminal-spike-ubuntu.md`. It follows the Mac reports' structure and adds the distribution release, the kernel release, `Bun.revision`, the full-suite result under B2, the diagnostics of B3, the SHA-256 of each evidence file and a final `Report SHA-256:` line over the body above it. The evidence stays in `/home/michaeldaley/ubuntu-spike-evidence`. The report is filed byte-identically in the pull request that files the ratification of the Linux amendment, and that act names its SHA-256. It is not a Task 39 report, and the Task 39 report test does not change.

B6. **Tests 1 to 3.** If B3 item 1 finds no `node`, I rule that Node.js 20 or later, the minimum the harness's own error names, is a host prerequisite of the existing `tui-chaos` suite on every certification host. I may then install Node.js on the Ubuntu PC from the Ubuntu 26.04 archive myself; no agent installs software under this act. After installing it, I run `bun test packages/tui-chaos/test/review-corrections.test.ts` once in the same worktree and keep its output with the evidence. If tests 1 to 3 pass, they leave the known-failure set of B2, and the Linux amendment adds Node.js and its recorded version to the host profiles of plan §8 before it is ratified. If `node` is already present, or the tests still fail, they stay in B2 and go to the act in B7.

B7. **Tests 4 to 6.** Their root cause and fix go to a separate Founder task act, drafted after the diagnostics of B3. A change to the operating-system branches in spec §1.5 rows 1 or 4 amends that table under its own rule. The fix must be on `main` before Task 46 is authorized, because M21 is the first milestone to run PTY hosts under the supervisor, and in any case before M26.

B8. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. Rubric milestone 1 stays at **5** and rubric milestone 4 at **3**.

B9. **What this does not open.** The Linux amendment still takes effect only by its own ratifying act, after the run of B4. Task 45 and every later task each need their own act.

## Part C: Filing

C1. One docs-only pull request files this act and changes nothing else. The run of B4 starts only after it merges.

## Part D: Not authorized

- Any change to code, tests, `bun.lock`, a manifest, the plan, a spec or `PLAN-OPEN-2`, including any fix for a test in A2.
- Any retry of a step of B4, beyond the single rerun of B6.
- Software installation by any agent, or any installation other than the Node.js installation of B6.
- Filing the report other than as B5 provides, ratifying the Linux amendment, writing a capability record on Linux, and Task 45 and every later task.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-11

Actor-Id: founder
