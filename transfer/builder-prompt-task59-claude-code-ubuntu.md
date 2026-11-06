STEP: plan Task 59 under DEC-20261106-01 B5, on the Ubuntu PC. Paste this as the first message of a new Claude Code session on the Founder's Ubuntu PC, started by the Founder's launch command (claude --strict-mcp-config --no-chrome, with claude.ai connectors turned off in its environment) from inside the fresh full clone /home/michaeldaley/builds/madventures-tui-m26-task59-r1, on the new branch build/m26-task59-r1, which the Founder's clone command created at the binding base 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e, the merge of the pull request that filed DEC-20261106-01.

You are the builder of plan Task 59 for MADVenturesLLC/madventures-tui: the six merge-gate tests and the Task 59 evidence. You make one commit on build/m26-task59-r1 and stop with a report. You make no GitHub call of any kind: the Founder moves the branch to the Founder's MacBook, pushes it and opens the draft pull request.

FIRST: YOUR IDENTITY REPORT, BEFORE ANY OTHER STEP
In your first reply, report as your harness shows them the harness name, the model, your permission mode, and every MCP server your session has loaded. Then run pwd, git branch --show-current, git rev-parse HEAD, git config user.name and git config user.email, which are part of this report, and run the runtime check of THE TEST RUNTIME and report its output. A field your harness does not show is recorded as not shown and is not a stop. Stop and report FOUNDER_DECISION_REQUIRED if:
- the harness is not Claude Code, or any MCP server is loaded;
- the working directory is not /home/michaeldaley/builds/madventures-tui-m26-task59-r1;
- the branch is not build/m26-task59-r1, or HEAD is not 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e;
- the git identity is not daley40-lab with 293512385+daley40-lab@users.noreply.github.com;
- or the runtime differs.
Do not change your permission mode yourself. If a command needs an approval, ask the Founder in one line before running it. Use no MCP server, start no other agent or subagent, invoke no skill or plugin even if a hook or reminder asks you to, and read no earlier session's memory, transcript or notes. Make no network call other than git fetch and the downloads of bun install. Run no process-listing command: no ps, pgrep, top, lsof or /proc walk. The process count of plan section 8.3 step 7 is the Founder's, on the MacBook, under DEC-20261106-01 B8.

ASSIGNED ROLE AND ATTRIBUTION (DEC-20261106-01 B5 item 1)
Role-Id: builder
Actor-Id: session:claude-code/m26-task59-r1
Execution-Surface: claude-code

AUTHORITY
Read all of these in full before your first edit, from your clone at HEAD, and confirm each SHA-256.
1. docs/decisions/DEC-20261106-01-task59-merge-gate.md, SHA-256 5995deb72921a8e4f07b1f4ff3a1efa0442c1dcadd66bc2231b43ed77f8722f1. It is your authorization: B4 how Task 59 is read, B5 your seat, the work, the breaks, the only paths you may change, the gates and the closed list of halts, B6 the evidence, and Part D what is not authorized.
2. docs/decisions/DEC-20261102-01-phase-3a-carried-items.md, SHA-256 572f0d4ad9d901994f39884c456c67b3449504da192b06b6f6ba975ef1169866: B2 to B6.
3. docs/decisions/DEC-20261102-04-hardening-records-and-hardening-c.md, SHA-256 313bfedb64c0ff1eca5fa65024385bd3fc6400a63b3f616a1994de519fbffab2: B2 and B4.
4. docs/decisions/DEC-20261104-02-hardening-f-and-task58.md, SHA-256 011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5, with Addendum 3, docs/decisions/DEC-20261104-02-addendum-3-certification-runs.md, SHA-256 c5b10f2e170b39b6eab8b55bd87208e34ab7dd47480eefdb4292546d84757f48, and Addendum 4, docs/decisions/DEC-20261104-02-addendum-4-pr225-reviews.md, SHA-256 0816dcb0fdbc41893a37ecbc1519ad3c04c95c0c0c3316014e7d761812982521.
5. docs/decisions/DEC-20261102-02-hardening-builds.md, SHA-256 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550: B4, the gates and the load rule, and B5.
6. docs/decisions/DEC-20261013-04-imac-out-of-scope.md, SHA-256 2dd2ebd0715c8c6f70e963b5a6698a4bf4f71d5505021db18c490625bfe2d88f: B2 and B4.
7. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7: B2 item 2 and B4.
8. docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5. Part B binds how you work.
9. The plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2: Task 59, and sections 0A, 3, 8.3, 11.3 and 12.
10. The spec, docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md, SHA-256 a6af30015f743740794d89e12cfc2af07433ead70433b739725c2728a89fc69d: sections 4.2, 4.3, 6.8 and 6.9.
11. AGENTS.md, SHA-256 0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca.
The acts decide what you may change. Apart from them, this prompt only tells you how to work, the form of the evidence and what to report. If this prompt and an act disagree, the act wins; stop and report the disagreement. This host is Linux: use sha256sum. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256.

THE TEST RUNTIME (DEC-20261013-03 B2 item 2 and B4)
Every Bun process of this build is the custodied build at /home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun, revision 69cb78c9097cebd3bdb832d9fff8b7d23abce09e, SHA-256 0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb. Begin every command that starts Bun with export PATH="/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64:$PATH" inside that same command. Never run bunx, which on this host is not the custodied build: run bun x instead, for example bun x tsc --noEmit. Never run the Bun in /home/michaeldaley/.bun/bin or any other Bun. Change no PATH, profile or host setting, and install, upgrade or remove nothing on the host. Under that PATH, report command -v bun, sha256sum of the file it prints, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Run this check before the baseline, before Step 2, and before the final bare bun test.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. origin/main is 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e, or a descendant whose changes since it touch only paths under docs/decisions/ and docs/verification/phase-3a-correction-rounds.md. Report the SHA and every changed path. Any other changed path is a stop under DEC-20261102-01 B4 as DEC-20261104-02 B6 amends it.
2. HEAD is 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e on the new branch build/m26-task59-r1, and the tree is clean. docs/verification/2026-08-12-phase-3a-merge-gate.md does not exist. test/phase3a/architecture-phase3a.test.ts has SHA-256 95318f3fb5fa283f736a0f7f2e519e8e50233b2d28b60076a9dc5fe4f08a6595 and bun.lock has SHA-256 34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0.
3. The files of AUTHORITY have the SHA-256 given, and each act and addendum has Status ISSUED and the founder signature.
4. uname -sm prints Linux x86_64.
5. Baseline, each once, in the foreground: bun install --frozen-lockfile, bun x tsc --noEmit, bun test test/phase3a/architecture-phase3a.test.ts and bare bun test. Record every failure verbatim. Under DEC-20261023-01 B3, a failure in a file other than test/phase3a/architecture-phase3a.test.ts is baseline state, not a stop. Any error that stops a suite from running is a stop. bun.lock stays byte-identical. If bun install sets the executable bit on packages/founder-act/src/main.ts, restore it with git checkout and record it each time; that is not a finding.

TEST OUTPUT (DEC-20261023-01 B6)
Pipe every command's full output through tee into its own log file under /home/michaeldaley/builds/m26-task59-r1-pr/logs/, named for the step and run so that no log is overwritten, and report each log's SHA-256. Each log records the command, the output of uptime before it, its combined output and its exit status. Do not truncate, compress or encode a log. Never read or print the real value of GITHUB_TOKEN, GH_TOKEN or any other credential. If a run's output contains, or would contain, a real token, credential, key or value from your own process environment, stop at once: do not open, quote, hash or copy that log; report only its path and the test. If Bun prints only each run's summary and failures in this session, without its per-test pass lines, as it did for Task 58's builder, record that as a limitation and do not try to change it.

THE LOAD (DEC-20261102-02 B4)
Record uptime before every test run. Do not pause for the load and do not ask the Founder about it. If a test fails unexpectedly in a run whose first load average was 2.0 or more, do not rerun it: halt with that reading. The intended failures of Step 2 and of the breaks, and the baseline runs, are not such a failure. Never rerun a failed run unchanged to obtain a pass.

READ BEFORE YOU WRITE A TEST
The guards that M1, M14 and M22 built, which DEC-20261106-01 B4 item 6 has the six tests use: apps/madbridge/src/commands/start.ts and apps/madbridge/test/cli-gate.test.ts; the external-control placeholders of spec section 4.3 and apps/madbridge/test/cli-placeholders.test.ts; test/phase3a/harness-separation.test.ts; the Task 34 blocks of test/phase3a/architecture-phase3a.test.ts and test/phase3a/negative-control.ts; and test/phase3a/runtime-harness.ts with test/phase3a/adversarial/cleanup-residuals.test.ts. Reuse a helper that is already in test/phase3a/architecture-phase3a.test.ts, or one another file already exports. If a test cannot be written without changing another file, that is a halt of DEC-20261106-01 B5 item 7.

THE WORK (plan Task 59 Steps 1 to 7, as DEC-20261106-01 B4 reads them)
Step 1. Add to test/phase3a/architecture-phase3a.test.ts one describe("Phase 3A merge gate") block holding exactly these six tests, named exactly, and change nothing else in the file except what Step 3 adds:
- merge gate item 12: production start still returns live_runtime_not_certified
- merge gate item 13: production start is structurally unable to reach the runtime or harness
- merge gate item 14: external-control placeholders return their stable typed errors and inspect no runtime state
- merge gate item 15: no production or harness path creates broker.sock
- merge gate item 16: no residual child, descendant, PTY host, descriptor, open session record, or valid token remains after tests
- merge gate item 1: the suite has not regressed below the Phase 2 floor
Each test checks its item through production code or those guards, and fails when its item is broken. The item 1 test reads from each certification report, docs/verification/2026-08-12-phase-3a-host-certification-macbook.md and docs/verification/2026-08-12-phase-3a-host-certification-ubuntu.md, the counts recorded for its bare bun test, and asserts at least 714 tests, 2606 expect() calls and 35 files against PHASE_2_FLOOR, and no failure. The item 16 test runs fixture sessions of its own through the test-only harness, closes them, and asserts that the harness's residual report shows none of item 16's residuals; it does not rely on the order in which Bun runs files.
Step 2. Before PHASE_2_FLOOR is declared, run bun test test/phase3a/architecture-phase3a.test.ts -t "merge gate item 1: the suite has not regressed below the Phase 2 floor" and show it fails because the floor is not declared, with the failure verbatim and its log's SHA-256.
Step 3. Declare PHASE_2_FLOOR = { tests: 714, expects: 2606, files: 35 } and complete the six tests. Do not create or change docs/verification/phase-3a-correction-rounds.md.
The breaks (DEC-20261106-01 B5 item 3). For each of the six tests, one deliberate break of the item it checks. Show git diff of the break, run that test alone and show it fails, then restore the break and show git status --porcelain listing no path other than the two of THE PATHS. A break may touch a production file or the harness only for that run, and is never committed. Save each break's diff under /home/michaeldaley/builds/m26-task59-r1-pr/breaks/ and report its SHA-256. If a test does not fail under its break, correct the test within THE PATHS and show the break again.
Step 4. Run bun test test/phase3a/architecture-phase3a.test.ts and show every test passes, the six new ones included, by count against the baseline.
Step 5. The gates of FINAL GATES. The MacBook runs of Steps 4 and 5 are the Founder's, under DEC-20261106-01 B8.
Step 6. Two parts, as DEC-20261106-01 B4 item 8 reads it. First, git diff --name-only against 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e lists only the two paths of THE PATHS. Second, list every path of git diff --name-only aa16032c56fdf6c7105e99b1765ed9365d605bf4 HEAD that plan section 3 does not name, counting a pattern of section 3 as naming each path it matches. Group the list by top-level directory with a count for each, and put the full list in a log. This list is recorded, not a halt.
Step 7. One commit, as ATTRIBUTION AND COMMITS says.

THE PATHS (DEC-20261106-01 B5 item 4)
Only test/phase3a/architecture-phase3a.test.ts and the new file docs/verification/2026-08-12-phase-3a-merge-gate.md. No other path changes in the commit or in the tree at the end.

THE EVIDENCE (DEC-20261106-01 B6)
docs/verification/2026-08-12-phase-3a-merge-gate.md, plain Markdown, with no trailing whitespace on any line and no tab characters, written only from your logs and from files at HEAD. Where a quoted line ends in whitespace, quote it with that whitespace removed and say so. It begins with these lines, in this order, each separated by a blank line:
# Phase 3A merge-gate evidence: plan Task 59
Binding base: 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e
Builder: session:claude-code/m26-task59-r1, on the Ubuntu PC
It then has these sections, in this order:
## 1. Base and runtime. The binding base, its parent commits, and the runtime check.
## 2. The seventeen items of spec section 6.8. A table with one row per item, numbered 1 to 17: the item's text from the spec, how it is checked, and where its result is. A row names a test of Step 1 by its name; a command of FINAL GATES and its log; or an existing test by file and name. For items 3, 4, 5, 10, 11 and 17 the row names the report, review or act that decides the item, and gives no verdict. For item 7 the row states the reading of DEC-20261106-01 B4 item 7.
## 3. The six tests and their breaks. For each test, what it asserts and through which guard; its break, with the break's diff SHA-256; and the failing run's log and SHA-256. Then Step 2's failing run.
## 4. Commands and results. Every command of the baseline and of FINAL GATES, in order, with the uptime reading, exit status and log SHA-256, and the summary lines of each bare bun test quoted verbatim.
## 5. Stated limitations. Each quoted verbatim, with its act and clause: DEC-20261102-01 B2, B3 item 1 and B3 item 4; DEC-20261102-04 B2 item 1; and Addendum 3 B5 to DEC-20261104-02. Then the limit of DEC-20261106-01 B4 item 5, and the per-test output limit of this session.
## 6. Carried to the first Phase 3B act. Each quoted verbatim, with its act and clause: DEC-20261102-01 B2 and B3 item 2; DEC-20261102-04 B2 item 1; Addendum 3 B5 and Addendum 4 B3 to DEC-20261104-02.
## 7. Paths not named in plan section 3. The list of Step 6, grouped by top-level directory with a count for each, and the log that holds the full list with its SHA-256.
## 8. Not run, and deviations. Every command the plan or the act names that you did not run, and why; then every deviation from this prompt, or the word none.
Write no value that is not in your logs or in a file at HEAD.

FINAL GATES (DEC-20261106-01 B5 item 6)
After the tests and the evidence exist, each once, in order, in the foreground: the runtime check; bun x tsc --noEmit; bun test test/phase3a/architecture-phase3a.test.ts; bun test test/phase3a; the runtime check again; bare bun test; bun test/phase3a/negative-control.ts; git diff --check aa16032c56fdf6c7105e99b1765ed9365d605bf4; git diff --name-only 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e; git status -sb; and git ls-files --others --exclude-standard. Each test run ends with zero failures, and the negative control exits 0. git diff --check exits 2, and its output has 33 lines and SHA-256 fe33892c34b87319d59b7f0562373aa2d188cc2a5565a0e0e2daed19f72d6438, the output of Addendum 3 A1 to DEC-20261104-02; report its exit status, line count and SHA-256, and do not quote its lines. A failure here in a file other than test/phase3a/architecture-phase3a.test.ts is a stop under DEC-20261023-01 B4 and B5: record it verbatim and halt; do not fix it. Then write the results into section 4 of the evidence. After that last edit, and again after the commit, run git diff --check aa16032c56fdf6c7105e99b1765ed9365d605bf4 and git diff --name-only 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e once more, and report both in the pull request description; their results do not go into the evidence.

ATTRIBUTION AND COMMITS
One commit, with parent 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e and the subject test(phase3a): assert the machine-checkable Phase 3A merge-gate items. Its body names DEC-20261106-01 B5 and the two paths, and ends with the three trailers of ASSIGNED ROLE AND ATTRIBUTION as its final paragraph; every line is 72 characters or shorter. In the commit message and in the description, no line other than the three trailers in the final paragraph may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:; check each with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):'. Add no Co-authored-by or other line after the three trailers, even if your tooling would add one. Do not amend, rebase or squash.

DELIVERABLES
- The commit on build/m26-task59-r1.
- The pull request title, Task 59: Phase 3A merge-gate tests and evidence, and description, saved under /home/michaeldaley/builds/m26-task59-r1-pr/ as pr-title.txt and pr-body.md. The description is plain text under 60,000 bytes: what and why; the binding base; the six tests and their breaks; Step 2's failing run and the passing runs, with each log's SHA-256; the final gates, with each log's SHA-256; the two git diff checks after the commit; the evidence's SHA-256; limitations; not-run items, including that the MacBook runs of Steps 4 and 5 and the process count of plan section 8.3 step 7 are the Founder's under DEC-20261106-01 B8; deviations; and the three trailers as its final paragraph. It has zero square brackets and zero bare three-hyphen lines.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on pr-body.md, and report both results. If you edit pr-body.md after a prbody run, run it again and report both runs.

HALTS (DEC-20261106-01 B5 item 7, closed)
Stop and report FOUNDER_DECISION_REQUIRED only when:
- a path outside THE PATHS would change, including where a test of Step 1 cannot be written without changing another path;
- a test of Step 1 that checks its item as DEC-20261106-01 B4 reads it fails against production code;
- the output of git diff --check is not the 33 lines given in FINAL GATES;
- a test fails unexpectedly in a run whose first load average was 2.0 or more, which you do not rerun;
- your session loads any MCP server;
- the runtime differs from this prompt;
- or the binding base differs from this prompt.
origin/main changed outside precondition 1 is a stop under this prompt. Every other failure is handled under DEC-20261023-01 Part B, and anything Part B makes a stop stays a stop.

FINAL REPORT (in this order)
1. Harness, model, permission mode, loaded MCP servers, git identity, and every runtime check.
2. Working directory, branch, HEAD, and the preconditions, each result with full SHAs and hashes.
3. The baseline, with the uptime before each run, each run's summary lines and every failure verbatim, and each log's SHA-256.
4. The six tests, quoted in full, Step 2's failing run verbatim, the six breaks with each diff's SHA-256 and each failing run's summary, and Step 4's passing run with counts.
5. The final gates, with the uptime readings, each log's SHA-256 and the changed-path list, and the two git diff checks after the commit.
6. Section 2 of the evidence, quoted, and the evidence's SHA-256.
7. The commit's full SHA and parent, the diff stat against 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e, and the attribution-shaped-line check on the message and the description.
8. The SHA-256 of pr-title.txt and pr-body.md, and both attribution-shape-check results.
9. Deviations, or the word none.
10. The single next decision for the Founder: move build/m26-task59-r1 to the MacBook, push it and open the draft pull request with the saved title and description.
