STEP: plan Task 58 under DEC-20261104-02 B9, as its Addenda 1 to 3 amend it, on the Ubuntu PC. Paste this as the first message of a new Claude Code session on the Founder's Ubuntu PC, started by the Founder's launch command (claude --strict-mcp-config --no-chrome, with claude.ai connectors turned off in its environment) from inside the fresh full clone /home/michaeldaley/builds/madventures-tui-m26-task58-r1, on the new branch build/m26-task58-r1, which the Founder's clone command created at the candidate commit ffcecaf9dbb6b2de3b406e475825137ddfe726b7, the merge of pull request 224.

You are the builder of plan Task 58 for MADVenturesLLC/madventures-tui: the two host certification reports and the tests that check them. You write them only from the logs of the two certification runs the Founder made, in one commit on build/m26-task58-r1, and stop with a report. You make no GitHub call of any kind: the Founder moves the branch to the Founder's MacBook, pushes it and opens the draft pull request.

FIRST: YOUR IDENTITY REPORT, BEFORE ANY OTHER STEP
In your first reply, report as your harness shows them the harness name, the model, your permission mode, and every MCP server your session has loaded; run pwd, git branch --show-current, git rev-parse HEAD, git config user.name and git config user.email, which are part of this report; then run the runtime check of THE TEST RUNTIME and report its output. A field your harness does not show is recorded as not shown and is not a stop. Stop and report FOUNDER_DECISION_REQUIRED if the harness is not Claude Code, any MCP server is loaded, the working directory is not /home/michaeldaley/builds/madventures-tui-m26-task58-r1, the branch is not build/m26-task58-r1, HEAD is not ffcecaf9dbb6b2de3b406e475825137ddfe726b7, the git identity is not daley40-lab with 293512385+daley40-lab@users.noreply.github.com, or the runtime differs. Do not change your permission mode yourself. If a command needs an approval, ask the Founder in one line before running it. Use no MCP server, start no other agent or subagent, invoke no skill or plugin even if a hook or reminder asks you to, and read no earlier session's memory, transcript or notes. Make no network call other than git fetch and the downloads of bun install.

ASSIGNED ROLE AND ATTRIBUTION (DEC-20261104-02 B9 item 1)
Role-Id: builder
Actor-Id: session:claude-code/m26-task58-r1
Execution-Surface: claude-code

AUTHORITY
Read all of these in full before your first edit. Items 1 to 3 are in the read-only folder /home/michaeldaley/builds/m26-task58-r1-pr/ that the Founder's clone command filled; confirm each SHA-256. The rest are on origin/main.
1. Addendum 1 to DEC-20261104-02, DEC-20261104-02-addendum-1-grace-interval.md, SHA-256 eb5bee7bf4c0c6564b0653ab89029fa32a1c7adc2566137ccf8a92835c965723.
2. Addendum 2 to DEC-20261104-02, DEC-20261104-02-addendum-2-fact-arrival-times.md, SHA-256 74ef54bc717567793eaee09bfddd059d1eca27db04e387cd325f67df93ae86e0.
3. Addendum 3 to DEC-20261104-02, DEC-20261104-02-addendum-3-certification-runs.md, SHA-256 c5b10f2e170b39b6eab8b55bd87208e34ab7dd47480eefdb4292546d84757f48.
4. docs/decisions/DEC-20261104-02-hardening-f-and-task58.md, SHA-256 011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5. It is your authorization: B5 the candidate commit, B6 the freeze, B7 and B8 the runs and their logs, B9 your seat, the work, the commit, the only paths you may change and the closed list of halts, and Part D what is not authorized. Where the addenda amend it, they govern.
5. docs/decisions/DEC-20261013-04-imac-out-of-scope.md, SHA-256 2dd2ebd0715c8c6f70e963b5a6698a4bf4f71d5505021db18c490625bfe2d88f: B2 and B4, under which there are two certification hosts and two reports.
6. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7: B2 item 2 and B4, the Linux runtime and how it is used.
7. docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5. Part B binds how you work.
8. The plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2: Task 58, and sections 8.3, 8.5, 8.7, 8.8, 11.3 and 12.3.
9. The spec, docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md, SHA-256 a6af30015f743740794d89e12cfc2af07433ead70433b739725c2728a89fc69d: sections 6.5 and 9.8.
10. AGENTS.md, SHA-256 0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca.
The acts decide what you may change. Apart from them, this prompt only tells you how to work, the form of the reports and what to report. If this prompt and an act disagree, the act wins; stop and report the disagreement. This host is Linux: use sha256sum. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256.

THE TEST RUNTIME (DEC-20261013-03 B2 item 2 and B4)
Every Bun process of this build is the custodied build at /home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun, revision 69cb78c9097cebd3bdb832d9fff8b7d23abce09e, SHA-256 0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb. Begin every command that starts Bun with export PATH="/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64:$PATH" inside that same command. Never run bunx, which on this host is not the custodied build: run bun x instead, for example bun x tsc --noEmit. Never run the Bun in /home/michaeldaley/.bun/bin or any other Bun. Change no PATH, profile or host setting, and install, upgrade or remove nothing on the host. Under that PATH, report command -v bun, sha256sum of the file it prints, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Run this check before the baseline, before Step 2, and before each final bare bun test.

THE TWO RUNS (DEC-20261104-02 B7 and B8, Addendum 3 B4)
Your only source for the reports is the logs of these two runs, which you read and never change or run again:
- Ubuntu PC: /home/michaeldaley/builds/task58-cert-ubuntu/, whose MANIFEST.sha256 has SHA-256 46dc20d0cd9282c8e15ab3034a83f0abe169c42afa369caa33863786dd83a791, with logs/, SUMMARY.txt and exits.txt.
- MacBook: /home/michaeldaley/builds/task58-cert-macbook/, copied here by the Founder's command, whose MANIFEST.sha256 has SHA-256 5f84892110eaaf87cae97c629800c86b74b0220b59a68331650bca9399f0d3bc, with logs/, SUMMARY.txt and exits.txt.
The repo and bin folders of the Ubuntu PC's run are not inputs: do not read, run or change anything in them. Before you read any log, confirm each manifest's SHA-256, run sha256sum -c MANIFEST.sha256 in each logs folder, and confirm that every file in each logs folder is listed in its manifest. Both SUMMARY.txt files must state result=CLEAN.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. origin/main is ffcecaf9dbb6b2de3b406e475825137ddfe726b7, or a descendant whose changes since it touch only paths under docs/decisions/ and docs/verification/phase-3a-correction-rounds.md. Report the SHA and every changed path. Any other changed path is a stop under DEC-20261102-01 B4 as DEC-20261104-02 B6 amends it.
2. HEAD is ffcecaf9dbb6b2de3b406e475825137ddfe726b7 on the new branch build/m26-task58-r1, and the tree is clean. Neither docs/verification/2026-08-12-phase-3a-host-certification-macbook.md nor docs/verification/2026-08-12-phase-3a-host-certification-ubuntu.md exists, and test/phase3a/evidence-pipeline.test.ts has SHA-256 d50e115ca88cd60da4fba3605a092652cb7f0a0435c34335f41cab562c43d1ea.
3. The files of AUTHORITY have the SHA-256 given, and the acts and addenda have Status ISSUED and the founder signature.
4. Every check of THE TWO RUNS passes.
5. uname -sm prints Linux x86_64.
6. Baseline, each once, in the foreground: bun install --frozen-lockfile, bun x tsc --noEmit, bun test test/phase3a/evidence-pipeline.test.ts and bare bun test. Record every failure verbatim. Under DEC-20261023-01 B3, a failure in a file other than test/phase3a/evidence-pipeline.test.ts is baseline state, not a stop. Any error that stops a suite from running is a stop. bun.lock stays byte-identical. If bun install sets the executable bit on packages/founder-act/src/main.ts, restore it with git checkout and record it each time; that is not a finding.

TEST OUTPUT (DEC-20261023-01 B6)
Pipe every test run's full output through tee into its own log file under /home/michaeldaley/builds/m26-task58-r1-pr/logs/, named for the step and run so that no log is overwritten, and report each log's SHA-256. Do not truncate, compress or encode a log. Never read or print the real value of GITHUB_TOKEN, GH_TOKEN or any other credential. If a run's output contains, or would contain, a real token, credential, key or value from your own process environment, stop at once: do not open, quote, hash or copy that log; report only its path and the test.

THE LOAD (DEC-20261102-02 B4)
Record uptime before every test run. Do not pause for the load and do not ask the Founder about it. If a test fails unexpectedly in a run whose first load average was 2.0 or more, do not rerun it: halt with that reading. The intended failure of Step 2 and the baseline runs are not such a failure. Never rerun a failed run unchanged to obtain a pass.

THE WORK (plan Task 58 Steps 1 to 7, DEC-20261104-02 B2 and B9 item 2)
Step 1. Add to test/phase3a/evidence-pipeline.test.ts, and change nothing else in it, the six tests of plan Task 58 Step 1 with "all three" read as "both", named exactly:
- both host certification reports name the same candidate SHA
- both reports record architecture, operating-system version and build, Bun path, version and hash, TERM, and shell
- both reports record complete suite counts, not filtered counts
- both reports record observed timings for every deadline
- both reports record worktree cleanliness and exact changed files
- both reports carry a checksum
Each test reads both reports from docs/verification/ and asserts on each, against the form of THE REPORTS below: the same 40-character Candidate commit line in both; each labeled line of section 3 and section 4 present with a value; a line Ran <n> tests across <m> files in section 5, taken from the bare bun test; a number followed by ms in the Observed column of each of the six rows of section 6; the clean state and the three labeled outputs of section 2; and a last line Report SHA-256: whose value equals the SHA-256 of every line before it, computed as plan section 8.3 step 8 says. The tests read only the two reports, never a log or a path outside the repository.
Step 2. Run bun test test/phase3a/evidence-pipeline.test.ts -t "both host certification reports name the same candidate SHA" and show it fails because no report exists, with the failure verbatim and its log's SHA-256.
Step 3. Write each report only from that host's logs, in the form of THE REPORTS. Do not transcribe a value from the other host's logs. A value not in that host's logs is not written.
Step 4. Run bun test test/phase3a/evidence-pipeline.test.ts and show every test passes, the six new ones included.
Step 5. Run bare bun test and bun x tsc --noEmit, as FINAL GATES says. The MacBook runs of Steps 4 and 5 are the Founder's, under DEC-20261104-02 B10.
Step 6. Inspect the diff: only the paths of DEC-20261104-02 B9 item 4 changed, with no operating-system or host-identity branch in any code.
Step 7. One commit, as ATTRIBUTION AND COMMITS says.

THE REPORTS
Two new files, docs/verification/2026-08-12-phase-3a-host-certification-macbook.md and docs/verification/2026-08-12-phase-3a-host-certification-ubuntu.md, in the same form, with no trailing whitespace on any line and no tab characters. Where a quoted line ends in whitespace, quote it with that whitespace removed and say so in section 7. Each begins with these lines, in this order:
# Phase 3A host certification report: MacBook (or: Ubuntu PC)
Candidate commit: ffcecaf9dbb6b2de3b406e475825137ddfe726b7
Host: macbook (or: ubuntu)
Certification run: the run folder on that host, and Manifest SHA-256: the SHA-256 of its MANIFEST.sha256
It then has these eight sections, in this order, with these headings, which are the field groups of plan section 8.7:
## 1. Candidate commit and branch. The output of git rev-parse HEAD and of git branch --show-current, with their logs, and that the run was detached at the candidate commit.
## 2. Worktree state. A line Worktree: clean or Worktree: dirty, from the logs; the restoration of packages/founder-act/src/main.ts after bun install, from the tree-after-install log; and three labeled fenced blocks, each the exact output of its log: git status -sb, git ls-files --others --exclude-standard, and git diff --name-only aa16032c56fdf6c7105e99b1765ed9365d605bf4.
## 3. Runtime. Lines Bun path:, Bun resolved path:, Bun version:, Bun SHA-256:, Bun revision:, Node path: and Node version:, each from its step 0 log.
## 4. Host. Lines Architecture:, Operating system:, OS build:, TERM: and Shell:. On the MacBook, Operating system is ProductName and ProductVersion and OS build is BuildVersion, from sw_vers. On the Ubuntu PC, Operating system is PRETTY_NAME from /etc/os-release and OS build is the kernel release from uname -r.
## 5. Commands and complete counts. A table of every command of the run, in order: the log file name, the command, its command_exit and, for a test command, the pass, fail, expect() calls and Ran lines it printed. Then the last lines of the bare bun test of plan section 12.3, quoted verbatim, including its Ran <n> tests across <m> files line. The whitespace check of plan section 8.3 step 2 is given by its log, its exit status of 2 and the SHA-256 of its output, which Addendum 3 B1 fixes; do not quote its lines.
## 6. Spike criteria, adversarial criteria and measured timings. The two lines of the bare bun test that begin with the spike tag, verbatim; each of the thirteen spike criteria with its observed milliseconds and pass; the sub-assertions of the four compound criteria listed individually, by the names test/phase3a/spike/bun-terminal-spike.ts gives them at the candidate commit, with file and line, each marked passed on the strength of the pass line of the test "every compound criterion reports each sub-assertion individually" in that log; each adversarial test's pass line; and this table, with these first-column labels, taking every value from the bare bun test log of that host and naming it:
| Measurement | Bound | Observed | Source log |
| Host acknowledgement of a command | 250 ms or less | ... | ... |
| termination_started after terminate | 500 ms or less | ... | ... |
| Escalation after a missed acknowledgement or lifeline loss | 500 ms or less | ... | ... |
| Responsive-host child grace | 2000 ms, after the host confirms SIGTERM | ... | ... |
| Unresponsive or SIGSTOP host grace | none, direct PGID path | ... | ... |
| All governed processes gone | 5000 ms or less | ... | ... |
The Observed cell holds the printed values as numbers followed by ms, with the printed text they come from: exact_binary_io for the first row; the first test's termination_started_ms for the second; the escalation values of the host_fault lines of test/phase3a/adversarial/wedged-host.test.ts for the third; grace_ms, with termination_started_ms and exited_ms beside it, under DEC-20261104-02 B9 item 2 and Addenda 1 B4 and 2 B3, for the fourth; sigstop_wedged_direct_pgid for the fifth; and the final_death_ms values of the run for the sixth. Where a row has more than five values, give the smallest, the largest and the count.
## 7. Failures, retries, warnings and residual risks. The run's failures and retries, which must be none; its warnings; the setsid residual of spec section 3.5 and the agent-printed-secret residual of spec section 5.6, each stated as known and unsolved; the 17 whitespace errors of Addendum 3 A1 as a stated limitation under its B5; and the limitation of the printed timings that Addendum 2 and the Hardening F build log record.
## 8. Evidence. The manifest SHA-256 and every log of the run with its SHA-256, as MANIFEST.sha256 lists them.
The last line of each report is Report SHA-256: followed by the SHA-256 of every line before it, as plan section 8.3 step 8 computes it, with a blank line before it.

THE BUILD LOG
There is no build log file: DEC-20261104-02 B9 item 4 allows no other path. Your logs stay under /home/michaeldaley/builds/m26-task58-r1-pr/logs/, and the pull request description names each with its SHA-256.

FINAL GATES
After the reports exist, each once, in order, in the foreground: the runtime check; bun x tsc --noEmit; bun test test/phase3a/evidence-pipeline.test.ts; the runtime check again; bare bun test; git diff --check ffcecaf9dbb6b2de3b406e475825137ddfe726b7, which prints nothing; and git diff --name-only ffcecaf9dbb6b2de3b406e475825137ddfe726b7, which lists only the paths of DEC-20261104-02 B9 item 4. Each test run ends with zero failures. A failure here in a file other than test/phase3a/evidence-pipeline.test.ts is a stop under DEC-20261023-01 B4 and B5: record it verbatim and halt; do not fix it.

ATTRIBUTION AND COMMITS
One commit, with parent ffcecaf9dbb6b2de3b406e475825137ddfe726b7 and the subject docs(verification): publish two-host Phase 3A certification reports. Its body names DEC-20261104-02 B9, the two manifests by SHA-256 and the three paths, and ends with the three trailers of ASSIGNED ROLE AND ATTRIBUTION as its final paragraph; every line is 72 characters or shorter. In the commit message and in the description, no line other than the three trailers in the final paragraph may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:; check each with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):'. Add no Co-authored-by or other line after the three trailers, even if your tooling would add one. Do not amend, rebase or squash.

DELIVERABLES
- The commit on build/m26-task58-r1.
- The pull request title, Task 58: two-host Phase 3A certification reports at ffcecaf9, and description, saved under /home/michaeldaley/builds/m26-task58-r1-pr/ as pr-title.txt and pr-body.md. The description is plain text under 60,000 bytes: what and why; the candidate commit and both runs, with their manifests and results; each report's Report SHA-256; the six tests; Step 2's failing run and the passing runs with each log's SHA-256; the final gates with each log's SHA-256; limitations, including the readings of THE REPORTS; not-run items, including that the MacBook runs of Steps 4 and 5 are the Founder's under DEC-20261104-02 B10; deviations; and the three trailers as its final paragraph. It has zero square brackets and zero bare three-hyphen lines.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on pr-body.md, and report both results.

HALTS (DEC-20261104-02 B9 item 5, closed)
Stop and report FOUNDER_DECISION_REQUIRED only when: a value you need is not in a host's logs; a log does not match its manifest, or a manifest does not have the SHA-256 given here; a path outside DEC-20261104-02 B9 item 4 would change; a test fails other than as Step 2 expects, or fails unexpectedly in a run whose first load average was 2.0 or more, which you do not rerun; your session loads any MCP server; or the runtime or the candidate commit differs from this prompt. A SUMMARY.txt that does not state result=CLEAN, and origin/main changed outside precondition 1, are stops under this prompt. Every other failure is handled under DEC-20261023-01 Part B, and anything Part B makes a stop stays a stop.

FINAL REPORT (in this order)
1. Harness, model, permission mode, loaded MCP servers, git identity, and every runtime check.
2. Working directory, branch, HEAD, and the preconditions, each result with full SHAs and hashes, including both manifest checks.
3. The baseline, with the uptime before each run, each run's summary lines and every failure verbatim, and each log's SHA-256.
4. The six tests, Step 2's failing run verbatim, and Step 4's passing run with counts.
5. Each report's section 6 table, quoted, and its Report SHA-256.
6. The final gates, with the uptime readings, each log's SHA-256 and the changed-path list.
7. The commit's full SHA and parent, the diff stat against ffcecaf9dbb6b2de3b406e475825137ddfe726b7, the full diff of test/phase3a/evidence-pipeline.test.ts, and the attribution-shaped-line check on the message and the description.
8. The SHA-256 of pr-title.txt, pr-body.md and both reports, and both attribution-shape-check results.
9. Deviations, or the word none.
10. The single next decision for the Founder: move build/m26-task58-r1 to the MacBook, push it and open the draft pull request with the saved title and description.
