STEP: root-cause build for tests 4 to 6 under DEC-20261012-03 B3. Paste this as the first message of a new Claude Code session started with claude-agent on the Ubuntu PC, in the fresh clone /home/michaeldaley/madventures-tui-b3-root-cause, detached at origin/main (03dda124e9d6faa59abda6a3817410bcdf1765f8).

You are the root-cause builder for tests 4, 5 and 6 of MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's Ubuntu PC, in the clone you were launched in. Your job is first to find the cause of each failure and report it with evidence. You fix only if the act's narrow conditions hold.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-tests-4-6-root-cause
Execution-Surface: claude-code
If you commit, use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line your tooling adds, with a blank line before them and no bare three-hyphen line anywhere in either.

FIRST: YOUR HARNESS AND MODEL
State, exactly as your harness shows them, the harness name and the model identifier. If the harness is not Claude Code, stop now and report FOUNDER_DECISION_REQUIRED.

AUTHORITY
One act governs this work: FOUNDER-ACT-20261012-TESTS-4-6-CAUSE-AND-FIX, docs/decisions/DEC-20261012-03-tests-4-6-cause-and-fix.md on origin/main, SHA-256 e91b25f4fbb0f23101f96793afe3a85951372efbc83148602e38ccb2a873c4f1. Read it in full first, especially A2 to A4, B3 and Part D. Then read the investigation report it accepts, docs/verification/2026-10-12-tests-4-6-investigation-ubuntu.md, and DEC-20261011-02 A2 and A3 for the earlier observations and leads. Spec §1.5 states the Linux host profile. The act decides what you may change. This prompt only tells you how to work. If they disagree, the act wins and you report the disagreement.

THE THREE TESTS
- Test 4: "governed-child environment forwarding: exact key-set equality with the launch-frame env, ambient canary absent (C7 evidence 7)", in packages/broker/test/pty-host-supervisor.test.ts.
- Test 5: "natural child exit without a terminate command publishes an exact marker, drained, and exited exactly once", in packages/pty-host/test/main-guard.test.ts.
- Test 6: "early child output cannot precede launched and ready, and is required, not merely allowed", in packages/pty-host/test/main-guard.test.ts.
Run a test alone with: <bun> test <file> -t '<the test name, regex-escaped>'.

WHAT IS ALREADY KNOWN (from the report and the act; do not re-argue it, test it)
- On this PC all three fail, three of three, under both the stock Bun 1.4.2 and the custodied CI build (Bun 1.4.1, revision 69cb78c9097cebd3bdb832d9fff8b7d23abce09e). Test 4 fails in about 20 ms. Tests 5 and 6 time out at about 4.01 s.
- CI Verify on ubuntu-24.04 passes all three with the custodied build. So a factor of this PC, its OS, its kernel or the session the tests ran in contributes. The Founder's earlier runs were from his own terminal (Ghostty); your shell may differ.
- Upstream oven-sh/bun pull request 40304, "spawn: fire the Terminal exit callback when a detached child of an existing terminal exits", is open and not merged. Neither the Bun 1.4.2 release nor the stock revision contains it.
- Test 4 passed with Bun 1.3.11 in the drafting assistant's own Linux container (Ubuntu 24.04, kernel 6.18); tests 5 and 6 failed there.

THE TWO RUNTIMES
- Stock: the bun on PATH. Record its absolute path (realpath), --version, Bun.revision and SHA-256. It must report 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 a83d263767d839e4d2649ca8e35d07159c7afc99afdc96d731ced29e056dda0c.
- Custodied: /home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun. Before you run anything with it, confirm its SHA-256 is 0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb, --version is 1.4.1 and Bun.revision is 69cb78c9097cebd3bdb832d9fff8b7d23abce09e. Call it by that full path only. Do not put it on PATH, copy it, move it, or change anything in /home/michaeldaley/ubuntu-b7-custody. Do not fetch anything from MADVenturesLLC/os-governed-artifacts.
Bun.revision is read with: <bun> -e 'process.stdout.write(Bun.revision)'.

PRECONDITIONS (verify each, and report each result)
1. The clone's origin is MADVenturesLLC/madventures-tui, HEAD is detached, and the working tree is clean. git fetch origin main. origin/main must be 03dda124e9d6faa59abda6a3817410bcdf1765f8, or a descendant that changed only paths under docs/ since that commit; report the changed paths if it moved. HEAD must be 03dda124e9d6faa59abda6a3817410bcdf1765f8.
2. At HEAD these files have these SHA-256 values:
   docs/decisions/DEC-20261012-03-tests-4-6-cause-and-fix.md e91b25f4fbb0f23101f96793afe3a85951372efbc83148602e38ccb2a873c4f1
   docs/verification/2026-10-12-tests-4-6-investigation-ubuntu.md ec6c39229959f4d3dd0c55ff948caa7d8a98cda1b915ddb2ddc3bf81a68de79b
   packages/broker/test/pty-host-supervisor.test.ts dc284625464eac90b16161b6c204a2e68f03b7a7133de0296cf569b16fde4a9b
   packages/pty-host/test/main-guard.test.ts 1880dc7b75f611c68b756ea2f7b00ac1c813ad241d859ea71033154dd2bcc6c0
   bun.lock bf598164168443359793854df69a7789e360fc2c8ca4d9fe68eeaf60faa9f939
3. Both runtimes match THE TWO RUNTIMES above. node is on PATH; record its path and version.
4. bun install --frozen-lockfile with the stock Bun succeeds and leaves bun.lock byte-identical. If it turns packages/founder-act/src/main.ts to mode 100755 with no content change, restore 100644 and report it (DEC-20261011-02 B4 item 2). Any other change to the tree is a stop.
5. Record uname -srm, the PRETTY_NAME line of /etc/os-release, id -un, the TERM value, and whether your shell's standard input is a terminal (test -t 0).
6. gh auth status shows the agent identity daley40-lab through GH_TOKEN. Run gh normally. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring, and never print a token.

WHAT MAY LEAVE THIS MACHINE, AND WHAT YOU MAY READ
- Your inference, git fetch and, only if you fix, the push of your branch; gh calls to open the draft pull request and read its checks; and read-only gh api calls for the public diff and files of oven-sh/bun pull request 40304.
- Read no file outside your clone except /etc/os-release, files you create under /tmp for this task, and the custodied binary, which you only execute and hash. Read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures or ~/.madmik3-quarantine, and nothing else in /home/michaeldaley/ubuntu-b7-evidence or /home/michaeldaley/ubuntu-b7-custody.
- Run no command that prints the environment: no env, printenv, set or export -p. A temporary diagnostic may print environment variable names, never values.
- Run no process-listing command: no ps, pgrep, pkill, top or htop, and do not list or read /proc entries of processes. A temporary diagnostic inside the code under test may log what that code itself reads.
- Install nothing, change no host configuration, kernel parameter, package or installed Bun, and use no sudo.
- Start no subagent. Use no web search or web fetch beyond the gh api reads above. Post no comment or review.

HOW TO WORK
1. Reproduce (act B3 item 4). Run each of tests 4, 5 and 6 alone, three times with the stock Bun and three times with the custodied binary, from your session as it is. Record exit code, pass and fail counts, duration, and the failure output verbatim for the first run of each. Note any difference from the report. If any test passes in your session where it failed in the Founder's run, that difference is itself a finding: record it, and test under conditions closer to his run (for example, running the test under a pseudo-terminal with script -qec '<command>' /dev/null) before going further.
2. Root-cause each test (act B3 item 4). Form one hypothesis at a time, test it, and record the result, whether it confirms or refutes. You may:
   - add temporary diagnostics anywhere in your clone, such as logging in the test or in the code under test;
   - vary the conditions the tests run under: environment variables you set for the test command, the working directory, whether a terminal is attached, and which of the two runtimes runs them;
   - read any source in the clone.
   Revert every diagnostic before any commit, and show git status --porcelain empty after reverting. Stop investigating a test once the evidence identifies its cause, or once you have tested every hypothesis you can form within these limits.
3. Pull request 40304 (act B3 item 5). Read its diff with gh api repos/oven-sh/bun/pulls/40304/files. Read the natural-exit path of the PTY host in this repository. Answer, with evidence: do tests 5 and 6 depend on that fix to pass? Is that a dependency of the tests only, or of the production natural-exit path? Say which observations support your answer and which would refute it.
4. Decide, using the act's B3 item 6 and its stop paragraph:
   - FIX: only if the cause and the fix of all three tests lie wholly in packages/broker/test/pty-host-supervisor.test.ts and packages/pty-host/test/main-guard.test.ts. The fix keeps every assertion and every timeout of tests 4 to 6 unchanged.
   - STOP AND REPORT: in every other case, including when the cause of any one test lies elsewhere (production code, a dependency, bun.lock, a workflow, the CI action, the spec, the plan, Bun, the kernel, or the PC's configuration), when the fix would change an assertion or a timeout, or when a cause stays unknown. Do not make a partial fix. If some tests could be fixed within the two files, describe that fix in your report as a proposed patch, but do not commit it.

IF, AND ONLY IF, YOU FIX
1. Test-first. Before your change, run the three tests alone with the custodied binary and record the failures verbatim. Make the change in the two files only. Run them again: each must pass, three of three, with the custodied binary. Also record the stock Bun results for the three tests; they are recorded, not required.
2. Show that each fix addresses the cause you found: for each test, revert only its part of the fix and show it fails again the way it did before, then restore it. Report each.
3. With the custodied binary, run bun test test/phase3a and the full suite: phase3a must be 60 pass and 0 fail, and the full suite 0 fail. Run bunx tsc --noEmit: clean. Run git diff --check: clean. The changed-path list against 03dda124e9d6faa59abda6a3817410bcdf1765f8 must be within the two test files.
4. Re-read your diff adversarially: no assertion or timeout of tests 4 to 6 changed, no test skipped, retried or weakened, no other test changed, and nothing outside the two files.
5. Create the branch fix/tests-4-6-ubuntu-host from HEAD and commit once. Commit subject: test: fix tests 4 to 6 on the Ubuntu certification host. The body states the cause of each test with its evidence, cites the act by its file path, states that no assertion or timeout changed, and ends with the Co-Authored-By line your tooling adds and the three trailers. Run the CONTRIBUTING.md secret scan over the staged diff before you commit.
6. Push with git push -u origin fix/tests-4-6-ubuntu-host. Do not force-push. If the harness blocks the push, do not work around it: stop, report the commit SHA, and save the prepared pull request body to a file under /tmp.
7. Open one DRAFT pull request against main. Its body has: what and why, the cause of each test with evidence, the pull request 40304 answer, the paths changed, the test-first and revert evidence, the verification you ran, what was not run, deviations, not done, then the three trailers as the final paragraph. Zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write it as plain text without a link. Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and prbody mode on the body.
8. The pull request stays a draft. Do not mark it ready, merge it, resolve threads or comment.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when: your harness is not Claude Code; any precondition fails; a runtime's identity differs; bun install changes the tree beyond the mode restore; the cause of any test lies outside the two test files, or stays unknown; a fix would change an assertion or a timeout; a fixed test does not pass three of three with the custodied binary, or the full suite is not 0 fail after the fix; you would need to read, run or change anything this prompt does not allow; or gh returns 401. A stop is a normal outcome of this work, not a failure: report everything you found. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your harness and model, exactly as your harness shows them.
2. Preconditions, each with full SHAs and hashes; the host facts of precondition 5; both runtime identities and node.
3. The reproduction table for both runtimes, and the first failure output of each test verbatim.
4. For each of tests 4, 5 and 6: the cause, or the hypotheses tested and their results if it stays unknown; where the cause lies (test file, production code, Bun, kernel, host configuration, or session conditions); the evidence; and the minimal fix you would make.
5. The pull request 40304 answer, with evidence.
6. The decision: FIX or STOP AND REPORT, and why under the act's B3.
7. If you fixed: the commit SHA, the changed paths and their new SHA-256 values, the test-first and revert evidence, the phase3a, full-suite, tsc and diff-check results, the attribution-shape-check results, and the pull request number, head SHA and checks. If you stopped: any proposed patch, as text, not committed.
8. Every diagnostic you added, and proof that each was reverted (git status --porcelain empty).
9. Executed versus only read, and anything not run.
10. Deviations, or the word none.
11. The single next decision for the Founder.
