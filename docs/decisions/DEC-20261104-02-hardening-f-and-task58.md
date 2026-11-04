FOUNDER-ACT-20261104-PHASE-3A-TASK-58: M25's closing merge recorded, Hardening F authorized for the two deadline timings no test prints, and Task 58 ruled at the merge of Hardening F

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `27d8e83ceca252be753d7994872a3dca50494782` (the merge of pull request 222)
> **Governs:** `docs/verification/phase-3a-correction-rounds.md`; `packages/pty-host/test/signals.test.ts`; plan Task 58 and its candidate commit; `DEC-20261102-01` B4 as it applies to Task 58
> **Read with:** `DEC-20261104-01` B2, B8, B9 and B10; `DEC-20261103-03` B2 and B3; `DEC-20261102-04` B4; `DEC-20261102-02` B4 to B8; `DEC-20261102-01` A2, B1 and B4; `DEC-20261028-02` A2; `DEC-20261023-01` Part B; `DEC-20261015-05` B1 and B5; `DEC-20261013-04` B2 and B4; `DEC-20261013-03` B2 to B4; plan Task 58, §8, §11.3 and §12; spec §6.5 and §9.8

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What earlier acts leave to this act.** `DEC-20261104-01` B2 closes M25 at the merge that puts its entry on `main`, and item 3 of my authorization of pull request 222 says my next act records that merge's SHA. Its B8 says the hunt meets the condition for fixing Task 58's candidate commit and that Task 58 needs its own act. `DEC-20261102-04` B4 says every item of `DEC-20261102-01` B1 other than item 18, which it closed, has merged in pull request 211 or 213. This is that act.

A2. **Pull request 222.** It merged by merge commit at `27d8e83ceca252be753d7994872a3dca50494782` on 2026-11-04, with parents `fef6e64048c30e8df0ba9f44437fc077d8dcaf1e` and, second, `1b84355fc18e814a74aa94714dc88a48963423b5`, under my authorization posted as comment 6642878999. Push run 41918839211 of the attribution-shape check at that merge succeeded; it is the only workflow that runs on a push to `main`. Copilot's review 5774848438 at the head opened no inline comment. The filing session ran once. A second session, started later in the same clone with the same prompt, stopped at its first precondition and changed nothing.

A3. **Task 58 as the plan writes it.**
1. Its Files are a certification report per host, named `docs/verification/2026-08-12-phase-3a-host-certification-<host>.md`, and `test/phase3a/evidence-pipeline.test.ts`, which exists at `27d8e83ceca252be753d7994872a3dca50494782` with tests of its own. Step 1 names six tests, each beginning "all three". Step 3 runs the §12 command set on each host at one candidate commit, with the Linux forms of §8.3 on the Ubuntu PC, and writes each report from that host's actual output. Steps 4 and 5 run the focused tests, the full suite and the typecheck on every host. Step 7 names the commit message.
2. Under `DEC-20261013-04` B2 and B4, the certification hosts are my MacBook and my Ubuntu PC, M26 produces two reports, and each reference to three hosts or three reports is read as two.
3. `DEC-20261028-02` A2 item 2 records that Task 58 needs one commit run on each host, which no builder session can do alone.

A4. **Two deadlines no test prints.**
1. Plan §8.5 lists six measurements, each with its bound and the test that records it. §8.7 item 6 puts the measured timings in each report, §8.8 fails a report on a missing observed timing, and §8.9 says a deadline is not weakened.
2. At `27d8e83ceca252be753d7994872a3dca50494782`, in `packages/pty-host/test/signals.test.ts`, the test "termination_started is emitted within 500 ms" measures `elapsed` at line 203 and asserts it at line 205. The test "a child ignoring SIGTERM is SIGKILLed after the 2 s grace" measures `total` at line 229 and asserts it at lines 241 and 242. Neither test prints either value. §8.5 names this file for the `termination_started` row and the responsive-host child grace row.
3. The spike computes `responsive_grace_given_ms` and `escalation_start_ms` in the detail of its `measured_timing` criterion, at lines 1629 and 1630 of `test/phase3a/spike/bun-terminal-spike.ts`. `test/phase3a/spike/bun-terminal-spike.test.ts` prints a criterion's detail only when that criterion fails, at lines 108 to 115. A passing run prints only each criterion's own duration.
4. A passing run prints an observed value for each of the other four rows: the spike's `exact_binary_io` for the acknowledgement, the `host_fault` lines of `test/phase3a/adversarial/wedged-host.test.ts` for escalation and the stopped host, and the `final_death_ms` lines of `test/phase3a/adversarial/cleanup-residuals.test.ts` for the outer bound.
5. Bun prints each test's whole duration after its name. For the two tests of item 2, that duration includes starting the host and waiting for the child, so it is not the measured interval.
6. The drafting assistant found this by reading the code at that commit. Nothing was run.

A5. **The order of `DEC-20261102-01` B4.** Its last sentence lets no code or test change merge between the fixing of Task 58's candidate commit and the final merge review, other than Task 59's own commit. Task 58's own commit adds tests to `test/phase3a/evidence-pipeline.test.ts`, and that sentence does not name it.

A6. **The runtimes.** `DEC-20261013-03` B2 fixes Bun 1.4.2, revision `744846f844374847c902b5e7fd59b4342a51ef99`, on macOS, and the custodied build of revision `69cb78c9097cebd3bdb832d9fff8b7d23abce09e`, SHA-256 `0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb`, on Linux. Its B3 ends the custodied build's standing on the day the expiry guard of `.github/actions/setup-qualified-bun` reports EXPIRED, and its B4 says how the binary is used. The §12 commands start `bunx` through `bun run typecheck` and §8.3 step 2.

A7. **The drafting assistant.** It drafted this act and proposed each ruling, and it found the gap of A4. None of that is an independent review.

## Part B: Founder rulings

B1. **M25's closing merge.** M25 closed at `27d8e83ceca252be753d7994872a3dca50494782`, the merge of pull request 222, under `DEC-20261104-01` B2.

B2. **The gap of A4.** It is a gap in the evidence the plan requires, not a missed deadline. It is closed before the candidate commit is fixed, by the build of B3. A test's whole duration is not read as its measured interval, and no script outside the repository measures in place of the named tests.

B3. **Hardening F.** I authorize one hardening build:
1. **Builder and branch.** A fresh Claude Code session on the Ubuntu PC, started with `claude --strict-mcp-config --no-chrome`, with claude.ai connectors turned off, and loading no MCP server.
   - Actor-Id `session:claude-code/hardening-f-r1`, on `build/hardening-f-r1`.
   - It builds from a binding base on `main` that contains the merge of this act's filing, named in its builder prompt I sign.
   - Every Bun process of the build is the custodied build, used as `DEC-20261013-03` B4 requires.
   - The clone's git identity is `daley40-lab` and its no-reply address. The builder makes no GitHub call.
   - Under `DEC-20261104-01` B9, the token of its A10 is revoked before the build's setup command runs, and that command checks that `gh` on the Ubuntu PC is not logged in as `decivantiq`.
2. **The item.** In `packages/pty-host/test/signals.test.ts` only:
   - "termination_started is emitted within 500 ms" prints one line, `signals termination_started_ms=<elapsed>`;
   - "a child ignoring SIGTERM is SIGKILLed after the 2 s grace" also measures the time from the terminate command to `termination_started`, and prints one line, `signals sigterm_ignored termination_started_ms=<started> exited_ms=<total>`, where `<started>` is that time;
   - each value is in milliseconds with two decimals, and each line is printed before the assertions on its values;
   - no assertion, timeout or other behavior changes.

   No new test is required: the change adds output and changes no assertion. The build log quotes both lines from each gate run.
3. **Paths.** Only `packages/pty-host/test/signals.test.ts` and `docs/verification/hardening-f-build-log.md`. No production file, `bun.lock`, manifest, `AGENTS.md` or decision record changes.
4. **Gates.** As `DEC-20261102-02` B4, with its load rule, on the Ubuntu PC. Each run below ends with zero failures:
   - `bun x tsc --noEmit`;
   - `bun test packages/pty-host/test/signals.test.ts` five times in a row, each printing both lines;
   - `bun test packages/pty-host`;
   - `bun test test/phase3a`;
   - bare `bun test` three times in a row.

   The build is reviewed only after Verify, Verify (macOS) and code-review pass at its head on GitHub.
5. **Review and counting.** A fresh Gemini 4 session on Antigravity on my MacBook, reviewer id `antigravity`, under a review prompt I sign. Its verdicts count under plan §11.3, under the rubric milestone of each path their substantive findings touch. A FAIL with a substantive finding halts for my ruling before any correction.
6. **Pull request and merge.** As `DEC-20261102-02` B7. My guarded commands push the branch, open the draft pull request, mark it ready after a posted Tier-2 PASS at its exact head, and merge it by merge commit without a per-pull-request act.
7. **Halts, closed.** The build halts and reports to me only when a path outside item 3 would change; the item cannot be met without changing an assertion, a timeout or a production file; a test fails unexpectedly in a run whose first load average was 2.0 or more, which it does not rerun; the session loads any MCP server; the runtime is not the custodied build; or the binding base differs from its prompt. Every other failure is handled under `DEC-20261023-01` Part B, and anything Part B makes a stop stays a stop.

B4. **The hunt.** It is not repeated. Hardening F adds output only, `DEC-20261104-01` B8 stands, and the runs of B7 run the full suite on both hosts at the candidate commit.

B5. **The candidate commit.** Task 58's candidate commit is the merge commit of Hardening F's pull request on `main`. It is fixed when that merge lands and its push run succeeds, and a later docs-only merge does not move it. My guarded command for B7 names it by SHA.

B6. **`DEC-20261102-01` B4 amended.** In its last sentence, "other than Task 59's own commit" reads "other than Task 58's and Task 59's own commits". Task 58's own commit changes only the paths of B9 item 4.

B7. **The certification runs.** On each certification host, I run Task 58's measurement myself, by a script I sign as a text on the transfer branch, and not in a builder session.
1. **Runtime.** On the MacBook, every Bun process is `/Users/michaeldaley/.bun/bin/bun`, version 1.4.2, revision `744846f844374847c902b5e7fd59b4342a51ef99`, SHA-256 `35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5`. On the Ubuntu PC, every Bun process is the custodied build, checked by its SHA-256 and revision before the run. A directory created for the run, holding only links named `bun` and `bunx` to it, is first on `PATH` in that run's environment alone, which `DEC-20261013-03` B4 permits. Node.js 20 or later is on `PATH`, as plan §8 requires.
2. **Expiry.** The Ubuntu PC's run counts only if the expiry guard passes in the Verify job of Task 58's pull request. That job runs after the run, and I accept its pass as covering the run. If that guard reports EXPIRED, Task 58 halts for my ruling.
3. **Clone.** A fresh clone from GitHub, detached at the candidate commit, then `bun install --frozen-lockfile`. If the install changes the mode of `packages/founder-act/src/main.ts`, the script restores it with `git checkout` and logs the state before and after. The tree is then clean.
4. **Commands.** §8.3 steps 0 to 7 in order, with the Linux forms on the Ubuntu PC, then every command of §12.2 in its listed order, each exactly once, including those that repeat a command of §8.3. Every command of §12.1 is among those of §8.3. Step 0 also records the resolved path of `bun` and its `Bun.revision`. No Hermes process runs on the host from the start of its run to the end.
5. **Logs.** Each command writes its own log in that run's log folder: the command, the output of `uptime` before it, its combined output, and its exit status. A manifest lists every log's SHA-256. No log is edited, truncated or rerun.
6. **Halts.** The run on a host is not used, and comes to me, if a check of item 1 or 3 fails, any test fails, a command exits other than as the plan expects (78 for `start`, 69 for the four placeholders, 0 for every other command), a printed timing is outside its §9.8 bound, or a §8.5 measurement has no printed value. I rule whether that host's whole run is repeated. No single command is rerun. The load is recorded and never waited on.

B8. **The logs move.** My command copies the MacBook's log folder and manifest to the Ubuntu PC and the Ubuntu PC's to the MacBook, and checks every log against its manifest on both sides.

B9. **Task 58's build.**
1. **Builder.** A fresh Claude Code session on the Ubuntu PC, started as B3 item 1 says, Actor-Id `session:claude-code/m26-task58-r1`, on `build/m26-task58-r1` from the candidate commit, under the custodied build, with the git identity and the setup check of B3 item 1. It makes no GitHub call. Its builder prompt I sign names both manifests by SHA-256.
2. **The work.** Plan Task 58 Steps 1 to 7:
   - the six tests of Step 1 in `test/phase3a/evidence-pipeline.test.ts`, with "all three" read as "both", each asserting on the MacBook's and the Ubuntu PC's reports;
   - Step 2's run, failing because no report exists;
   - each report written only from that host's logs, in the eight field groups of plan §8.7. It quotes the bare `bun test` lines verbatim, gives each §8.5 measurement as the value its log prints with the log's name, and lists the manifest's SHA-256 values. A value not in that host's logs is not written;
   - the trailing `Report SHA-256:` line over the body, computed as §8.3 step 8 says;
   - Steps 4 and 5 on the Ubuntu PC, and Step 6.
3. **The commit.** One commit, with the message `docs(verification): publish two-host Phase 3A certification reports`.
4. **Paths.** Only `docs/verification/2026-08-12-phase-3a-host-certification-macbook.md`, `docs/verification/2026-08-12-phase-3a-host-certification-ubuntu.md` and `test/phase3a/evidence-pipeline.test.ts`.
5. **Halts.** The build halts and reports to me when a value it needs is not in a host's logs, a log does not match its manifest, a path outside item 4 would change, a test fails other than as Step 2 expects, the session loads any MCP server, or the runtime or candidate commit differs from its prompt.

B10. **After the commit.** My command runs, on the MacBook at Task 58's head, the focused test file, bare `bun test` and `bunx tsc --noEmit`, each once and logged. These are Steps 4 and 5 on that host. Each must pass, or Task 58 halts for my ruling.

B11. **Review, counting and merge.**
1. **Review.** A fresh Gemini 4 session on Antigravity on my MacBook, reviewer id `antigravity`, under a review prompt I sign, checks Task 58's head against both hosts' logs.
2. **Counting.** Its verdicts count under plan §11.3, under rubric milestones 2 and 10, to which M26 maps. Under `DEC-20261102-02` B6, Claude Code's count under rubric milestone 10 starts at 0, and the Codex sessions' stays at 2.
3. **Merge.** Task 58 is a plan task. Under `DEC-20261104-01` B10 item 3, its pull request merges only by my merge authorization naming its exact head.

B12. **Hermes.** `DEC-20261102-02` B5 applies to the builder sessions of Hardening F and Task 58. The runs of B7 and B10 are my guarded commands, and Hermes is stopped while they run.

B13. **Counting and records.** These are new Founder rulings, which plan §11.3 does not count. No checkpoint closes under this act. The first act I sign after Hardening F's verdict is posted enters that verdict in the correction-round log.

B14. **What this does not open.** This act authorizes Hardening F, the runs of B7 and B10, and Task 58. It does not authorize Task 59 or any Phase 3B work, does not close M26, and changes no earlier ruling except as B6 states.

## Part C: Filing and recording

C1. One docs-only pull request files this act and changes nothing else except one entry appended to the end of `docs/verification/phase-3a-correction-rounds.md`, in the form of the log's latest entries, that records the commit of B1. The pull request touches `docs/decisions/`, so under `AGENTS.md`, as `DEC-20261031-01` amended it, it merges only by a Founder act naming its exact head.

C2. The runs of B7 may start only when the candidate commit of B5 is fixed. Task 58's pull request merges only after this act is on `main`.

## Part D: Not authorized

- Any path beyond B3 item 3 for Hardening F or B9 item 4 for Task 58, and any change to `bun.lock`, a manifest, the plan, the spec, `AGENTS.md` or another decision record, except the filing of C1.
- Any edit of an existing entry of the correction-round log.
- Any change to the Ubuntu PC's installed Bun, shell profile or system `PATH`.
- Any rerun of a single command of B7, and any report value not taken from its host's logs.
- Task 59, any Phase 3B work, and every build other than Hardening F and Task 58.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-04

Actor-Id: founder
