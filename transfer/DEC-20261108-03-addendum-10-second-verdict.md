FOUNDER-ACT-20261108-PHASE-3B-H1 ADDENDUM 10: H1's second Tier-2 verdict, and the background Codex server

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261108-03` B13 item 1, its Addendum 2 B1 and B4, and its Addendum 9 B9, as read below
> **Read with:** `DEC-20261108-03` B6, B12 to B15; its Addenda 1 to 9; `DEC-20261108-02` B4; `DEC-20261103-01` B3; Phase 3A design §7.3 and §7.6; Phase 3A plan §11.3; Phase 3B plan §0A item 2 and §2C

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The second review.** Under Addendum 9 B9, a fresh Gemini session, Gemini 4 Carbon as I selected it, in the Antigravity command-line interface on my MacBook, reviewer id `antigravity`, reviewed H1's head `915dd0c4431e8f51458556c9f7ee64f6d8c303c6` under the review prompt I signed, transfer commit `1a0b046a8d469bdefb50138c1f9e6b9626a692df`, SHA-256 `e971c6d96159cd7b1e6ff47efa265bfd2d02b9240b33754bf8fdacc50fd890c0`. It wrote its report to `/Users/michaeldaley/builds/review-h1-r2.md`, SHA-256 `844716e3022f284889534a662021ff8b8f932cbfe9145b110993e85245a3e1de`, which records the model as not shown. An earlier session started for this review in Antigravity's remote environment stopped at its identity check before it reviewed anything; it is set aside and is not a verdict.

A2. **The checks of plan §2C.** My check passed on that report: 25 quoted blocks, each in the source it names; all 36 files of the reviewer's logs and scripts listed with a matching SHA-256; four re-reads after compaction, each showing the prompt's SHA-256; the review clone at the head and clean; the prompt, the description and the three evidence folders unchanged; and no token-shaped line.

A3. **The verdict.** FAIL. Its items 1 to 5 and 7 to 9 pass. Its item 6 fails on its one finding, Finding 1, which it classifies SUBSTANTIVE: the session record of the seventh session, `rollout-2026-11-11T10-37-11-01a1cb41-8567-7dd2-97e4-f29a7a538639.jsonl` (record 6), records `cli_version` `0.167.1`, against Addendum 2 B1, while `codex --version` inside that session printed `codex-cli 0.167.0`, as the build log at line 5243 and the description at line 329 state. Item 7 gives the floor of `DEC-20261108-03` B12 as 1,908 tests. The floor is 1914, and my run had 1914 pass, so item 7 passes either way; the error is not a finding.

A4. **CI and my run at the head.** Verify (macOS), job 130694824207 of run 43069953573, failed one test at that head in its first run of bare `bun test`: "the launched history fact feeds killPgid even when facts() is never consumed", `packages/broker/test/pty-host-supervisor.test.ts:631`, whose host was not reported dead after its 8000 ms poll, at 8324.93 ms; the same test took about 330 ms in every earlier macOS log. Outside the build log, the code is the same as at `8c7afeae7e3209be8033ad6315b4be313f907713`, where it passed. My guarded command re-ran that job once, as job 130704966691, and it passed, the test at 336.23 ms. My run of B12 then passed in a fresh clone at the head: 1914 pass, 0 fail, across 140 files.

A5. **The cause.** My diagnostics on the MacBook, read-only except the copy of A7, show:
1. My launcher `/Users/michaeldaley/builds/codex-governed` is `CODEX_HOME=$HOME/.codex-governed exec codex "$@"`. It runs the first `codex` on `PATH`, today the npm build `/Users/michaeldaley/.local/bin/codex`, `codex-cli 0.167.0`. No `codex` on `PATH` is 0.167.1.
2. Codex 0.167 can run a session in a background app server for its configuration folder; its documentation says the terminal interface attaches to such a server when one runs and that the server updates itself. `codex-governed features list` shows the feature `daemon_auto_start` on.
3. At 17:39:54Z on 2026-11-10, four seconds before the sixth session's record, `rollout-2026-11-10T12-39-58-01a1c68b-94bb-7a13-8bf8-654f3e111cf4.jsonl` (record 5), starts, a copy of the 0.167.0 build was installed as that server under `/Users/michaeldaley/.codex-governed/packages/app-server-daemon`, with an updater, process 46774, that checks for a release five minutes after it starts and hourly after that.
4. At 21:45:10Z the updater selected 0.167.1 and asked the server, process 46617, to stop. It force-stopped that server at 21:46:10Z and started a 0.167.1 server, process 34702. The 0.167.1 build was installed there at 21:45:07Z. Processes 46774 and 34702 still ran when my diagnostics ran.
5. Record 5 holds 411 lines and 57 tool calls from 21:46:10Z to its end at 22:33:36Z. Its next entry, at 21:46:12Z, applies the thread's settings again. Addendum 8's repeated gates and the commit `8c7afeae7e3209be8033ad6315b4be313f907713`, at 22:09:17Z, came after the restart. The sixth session's final report states that its sandbox "later showed read-only after the interrupted approval" and that it changed no setting.
6. Record 6 began at 15:37:11Z on 2026-11-11 in that 0.167.1 server.
7. A record writes its version once, when it starts. `codex --version` inside a session, and my launcher's `--version`, report the build on `PATH`, not the server's. Neither the stop test of Addendum 2 B1 nor my check of Addendum 2 B4 could see the server's version. Codex's documentation also says a server's sessions use the environment the server inherited when it started; the server of record 6 was started by the updater that the sixth session's launch started.
8. The first six commits of H1, the last of them `5279efd8a07f0f9545b70519fef76f22e68112f3` at 18:06:24Z on 2026-11-10, were made before the 0.167.1 build was installed. Only the seventh and eighth, `8c7afeae7e3209be8033ad6315b4be313f907713` and `915dd0c4431e8f51458556c9f7ee64f6d8c303c6`, each of the build log only, were made after it.

A6. **The turns of records 5 and 6.** Every turn of both records names the approvals reviewer `user`, approval `on-request` and the folder `/Users/michaeldaley/builds/h1-r1`. Record 5's turns from 17:40:04Z, 21:04:48Z and 21:15:19Z record sandbox `workspace-write` with network access off; its turn from 21:51:00Z records sandbox `read-only`, with a file-system policy that grants read access only. Record 6's one turn, from 15:37:53Z, records `workspace-write` with network access off. I approved each approval prompt of the sixth session myself. The seventh session's final report states that no command required approval or escalation.

A7. **The evidence kept.** Before any change, my command copied the background server's folder, the update-check file and a listing of the server's packages to `/Users/michaeldaley/builds/h1-harness-evidence-20261111`: 10 files, `MANIFEST.sha256` with SHA-256 `aaaee2f5b797c71fd360796af8453a2a1e6a4fb6d9cc862e780b4f62c38a6073`.

A8. **The model and effort.** Every turn of records 5 and 6 names the model `gpt-6.1-sol`, while each of those sessions reported its model as GPT-6 by OpenAI with its exact identifier not shown. Record 5's turns record the effort `xhigh` and record 6's the effort `ultra`. No act of mine sets the effort.

A9. **The rules.** Addendum 2 B1 rules that H1's builder runs under Codex 0.167.0 with the governed configuration. Phase 3A design §7.3, which plan §11.3 applies verbatim, counts as a correction round a verdict that identifies substantive defects "requiring implementation or required-test changes". Design §7.6 requires reassignment at more than two correction rounds on one milestone or on a disqualifier. `DEC-20261108-03` B13 item 3 halts H1 for my ruling. B14, and Phase 3B plan §0A item 2, mark a slice's pull request ready only after a posted Tier-2 PASS at its exact head.

A10. **The drafting assistant.** A Claude Code session drafted the second review prompt, its setup and check commands, the diagnostics of A5 to A7 and this addendum. Its check of Addendum 2 B4 compared no record's version: the line showing 0.167.1 was in the evidence its setup gave the reviewer, and it did not see it. None of that is an independent review.

## Part B: Founder rulings

B1. **The report.** H1's second Tier-2 verdict is the report of A1, SHA-256 `844716e3022f284889534a662021ff8b8f932cbfe9145b110993e85245a3e1de`: FAIL. My command posts it verbatim on pull request 234, with a note naming this addendum and the error of A3 in item 7, before the review of B7 starts.

B2. **The deviation.** Finding 1 is a deviation of my environment, not a defect of H1's work. The sixth session from 21:46:10Z on 2026-11-10 and the whole seventh session ran under Codex 0.167.1 in the background server of A5, and the sixth session's turn from 21:51:00Z under a read-only sandbox, in which each command that ran outside the sandbox did so with my approval for that command, as `DEC-20261108-03` B6 item 3 requires. For those two sessions alone, I accept the version as a material deviation from Addendum 2 B1, and the read-only sandbox as a change of the governed configuration that I did not make. Every other part of Addendum 2 binds them as it did.

B3. **H1's evidence.** The build log and the description record the output of `codex --version` that `DEC-20261108-02` B4 and `DEC-20261108-03` B6 item 2 require, and that output is what the command printed. They are not corrected, and no further commit is made. This addendum, and the act that records H1's merge, record the version under which each session ran.

B4. **Counting.** Finding 1 requires no implementation or required-test change, so under design §7.3 the second verdict is not a correction round. H1's count stays at one, under rubric milestone 10. It is not a disqualifier under design §7.6: no evidence was fabricated, suppressed, selectively omitted or weakened, the sixth session disclosed the change of its sandbox, and the server's version was outside what either builder session could see. It is not a recurrence of the first verdict's Finding 1, which item 8 of the second verdict finds corrected. The act that records H1's merge enters this verdict in the correction-round log with this ruling.

B5. **The governed environment.** Addendum 2 B1 is read so for every governed Codex session in this repository. Before the next one starts:
1. the governed configuration sets the feature `daemon_auto_start` to false;
2. no governed background server or updater runs: my command stops both and deletes none of their files;
3. `/Users/michaeldaley/builds/codex-governed` runs Codex by the full path of the npm build of A5 item 1, and stops unless that build's `--version` prints `codex-cli 0.167.0` and no governed background server or updater runs;
4. a probe session in `/Users/michaeldaley/builds/codex-tool-probe`, making no call, then shows that no governed server or updater runs and that its record names `cli_version` `0.167.0`.

B6. **The check of Addendum 2 B4.** For every record after record 6, my check also requires that the record names `cli_version` `0.167.0`; that every turn records approval `on-request`, the approvals reviewer `user`, sandbox `workspace-write` with network access off, and the session's folder; and that no governed background server or updater runs when the check runs. Anything else halts the slice for my ruling.

B7. **The third review.** `DEC-20261108-03` B13 item 1 and Addendum 9 B9 are read so for H1's third review. At the same head, `915dd0c4431e8f51458556c9f7ee64f6d8c303c6`, a fresh Gemini session in the Antigravity command-line interface on my MacBook, reviewer id `antigravity`, under a review prompt I sign that names this addendum, reviews item 6 of the second review alone, as this addendum reads it. My setup command gives it, beside the folders of the second review: this addendum; a read-only extract of every record my check of Addendum 2 B4 reads, giving for each record its start, `cli_version`, last entry, and the lines and tool calls from 21:46:10Z on 2026-11-10 with the first entry after that time, and for each turn its time, model, effort, approval, approvals reviewer, sandbox, network access and folder; and the updater log and package listing of A7, with the manifest of A7. It reviews:
1. the check of Addendum 9 B7, as the second review read it;
2. that A5 items 3 to 6 and A6, other than my statement of my approvals and the sessions' final reports, are as those files show them;
3. that no turn of any record departs from approval `on-request`, the approvals reviewer `user`, sandbox `workspace-write` with network access off and the folder `/Users/michaeldaley/builds/h1-r1`, except record 5's turn from 21:51:00Z as A6 states it;
4. that every record other than record 6 names `cli_version` `0.167.0`;
5. that B2 and B3 settle the lines Finding 1 names.

Items 1 to 5 and 7 to 9 of the second verdict stand and are not reviewed again. The report counts only after it passes the checks of plan §2C. Its verdict counts under B13 item 3. A PASS is the posted Tier-2 PASS at H1's exact head that B14 and Phase 3B plan §0A item 2 require. A FAIL with a substantive finding halts H1 for my ruling.

B8. **Carried items.** The test of A4 is carried: the act that records H1's merge lists it with Findings 2 and 3 of the first verdict and names the act or slice that finds its cause. That act records, from the records, the model and effort of each builder session beside what the builders reported. Whether a record's model field meets the record that `DEC-20261108-02` B4 describes is for H2's act.

B9. **Counting and filing.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it and is filed unchanged with the act that records H1's merge, with Addenda 1 to 9. Nothing else in `DEC-20261108-03` or its Addenda 1 to 9 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-11

Actor-Id: founder
