STEP: Hardening F of DEC-20261104-02 B3, as Addendum 1 to DEC-20261104-02 amends it, on the Ubuntu PC. Paste this as the first message of a new Claude Code session on the Founder's Ubuntu PC, started by the Founder's launch command (claude --strict-mcp-config --no-chrome, with claude.ai connectors turned off in its environment) from inside the fresh full clone /home/michaeldaley/builds/madventures-tui-hardening-f-r1, on the new branch build/hardening-f-r1, which the Founder's clone command created at the binding base 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6, the merge of pull request 223, which filed DEC-20261104-02.

You are the builder of Hardening F for MADVenturesLLC/madventures-tui. You make the one change DEC-20261104-02 B3 authorizes, as its Addendum 1 amends it, in one commit on build/hardening-f-r1, and stop with a report. You make no GitHub call of any kind: the Founder moves the branch to the Founder's MacBook, pushes it and opens the draft pull request.

FIRST: YOUR IDENTITY REPORT, BEFORE ANY OTHER STEP
In your first reply, report as your harness shows them the harness name, the model, your permission mode, and every MCP server your session has loaded; run pwd, git branch --show-current, git rev-parse HEAD, git config user.name and git config user.email, which are part of this report; then run the runtime check of THE TEST RUNTIME and report its output. A field your harness does not show is recorded as not shown and is not a stop. Stop and report FOUNDER_DECISION_REQUIRED if the harness is not Claude Code, any MCP server is loaded, the working directory is not /home/michaeldaley/builds/madventures-tui-hardening-f-r1, the branch is not build/hardening-f-r1, HEAD is not 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6, the git identity is not daley40-lab with 293512385+daley40-lab@users.noreply.github.com, or the runtime differs. Do not change your permission mode yourself. If a command needs an approval, ask the Founder in one line before running it. Use no MCP server, start no other agent or subagent, invoke no skill or plugin even if a hook or reminder asks you to, and read no earlier session's memory, transcript or notes. Make no network call other than git fetch and the downloads of bun install.

ASSIGNED ROLE AND ATTRIBUTION (DEC-20261104-02 B3 item 1)
Role-Id: builder
Actor-Id: session:claude-code/hardening-f-r1
Execution-Surface: claude-code

AUTHORITY
Read all of these in full before your first edit. Items 2 to 9 are on origin/main.
1. Addendum 1 to DEC-20261104-02, SHA-256 eb5bee7bf4c0c6564b0653ab89029fa32a1c7adc2566137ccf8a92835c965723. It is signed and in force but not yet on main. Read it from the read-only copy the Founder's clone command saved at /home/michaeldaley/builds/hardening-f-r1-pr/DEC-20261104-02-addendum-1-grace-interval.md, and confirm its SHA-256. Its B2 sets the exact line the second test prints, and its B3 adds a halt.
2. docs/decisions/DEC-20261104-02-hardening-f-and-task58.md, SHA-256 011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5. It is your authorization: A4 the gap, B2 why it is closed this way, B3 your seat, the item, the only paths you may change, the gates and the closed list of halts, and Part D what is not authorized. Where Addendum 1 amends B3 item 2, the addendum governs.
3. docs/decisions/DEC-20261104-01-m25-records-and-hardening-e-records.md, SHA-256 db58159e4802a1839e126a0fbffbbc1a53c1db73faddcb3e1efb982bc23e0240: B7, under which no failure is a known failure.
4. docs/decisions/DEC-20261103-01-hardening-c-records-and-hardening-d.md, SHA-256 43dc423e060b0e7ae04a0e7a0c302a5e38497cc212d704a5a37421d78aa1dd3a: B4, the closed known-failure set, which is empty.
5. docs/decisions/DEC-20261102-02-hardening-builds.md, SHA-256 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550: B4, the gates and the load rule.
6. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7: B2 item 2 and B4, the Linux runtime and how it is used.
7. docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5. Part B binds how you work.
8. The plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2, sections 8.5, 8.8 and 11.3.
9. AGENTS.md, SHA-256 0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca.
The acts decide what you may change. Apart from them, this prompt only tells you how to work and what to report. If this prompt and an act disagree, the act wins; stop and report the disagreement. This host is Linux: use sha256sum. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256.

THE TEST RUNTIME (DEC-20261013-03 B2 item 2 and B4)
Every Bun process of this build is the custodied build at /home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun, revision 69cb78c9097cebd3bdb832d9fff8b7d23abce09e, SHA-256 0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb. Begin every command that starts Bun with export PATH="/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64:$PATH" inside that same command. Never run bunx, which on this host is not the custodied build: run bun x instead, for example bun x tsc --noEmit. Never run the Bun in /home/michaeldaley/.bun/bin or any other Bun. Change no PATH, profile or host setting, and install, upgrade or remove nothing on the host. Under that PATH, report command -v bun, sha256sum of the file it prints, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Run this check before the baseline, before the first run of the changed test file, and before each final bare bun test.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. origin/main is 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6, or a descendant whose changes since it touch neither packages/pty-host/test/signals.test.ts nor docs/verification/hardening-f-build-log.md. Report the SHA and every changed path. HEAD is 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6 on the new branch build/hardening-f-r1, and the tree is clean. docs/verification/hardening-f-build-log.md does not exist.
2. The files of AUTHORITY have the SHA-256 given, and the acts and the addendum have Status ISSUED and the founder signature.
3. At HEAD, quote with file and line: in packages/pty-host/test/signals.test.ts, the whole of the test "termination_started is emitted within 500 ms" and the whole of the test "a child ignoring SIGTERM is SIGKILLed after the 2 s grace", and report the count of console. in that file, which must be 0. In packages/pty-host/src/signals.ts, which you read and do not change, quote the lines of terminateChildGroup that emit termination_started, send SIGTERM, and set graceWaited.
4. uname -sm prints Linux x86_64.
5. Baseline, each once, in the foreground: bun install --frozen-lockfile, bun x tsc --noEmit, bun test packages/pty-host, and bare bun test. Record every failure verbatim. Under DEC-20261023-01 B3, a failure of a test whose file is outside the paths of DEC-20261104-02 B3 item 3 is baseline state, not a stop. Any error that stops a suite from running is a stop. bun.lock stays byte-identical. If bun install sets the executable bit on packages/founder-act/src/main.ts, restore it with git checkout and record it each time; that is not a finding.

TEST OUTPUT (DEC-20261023-01 B6)
Pipe every test run's full output through tee into its own log file under /home/michaeldaley/builds/hardening-f-r1-pr/logs/, named for the step and run so that no log is overwritten, and report each log's SHA-256. Do not truncate, compress or encode a log. Seed only synthetic values, restore every variable you seed after its test, and never read or print the real value of GITHUB_TOKEN, GH_TOKEN or any other credential. If a run's output contains, or would contain, a real token, credential, key or value from your own process environment, stop at once: do not open, quote, hash or copy that log; report only its path and the test.

THE LOAD (DEC-20261102-02 B4)
Record uptime before every test run. Do not pause for the load and do not ask the Founder about it. If a test fails unexpectedly in a run whose first load average was 2.0 or more, do not rerun it: halt with that reading. The baseline runs of precondition 5 are not such a failure. Never rerun a failed run unchanged to obtain a pass.

THE WORK (DEC-20261104-02 B3 item 2, as Addendum 1 B2 amends it)
In packages/pty-host/test/signals.test.ts only:
1. In "termination_started is emitted within 500 ms", after elapsed is measured and before the assertions on it, print one line with console.log: signals termination_started_ms= followed by elapsed with two decimals, using toFixed(2).
2. In "a child ignoring SIGTERM is SIGKILLed after the 2 s grace", record the time from t0 to the moment its existing wait for termination_started returns, as a new constant measured with performance.now(), the clock the test already uses. After total is measured and before the assertions on total, print one line with console.log: signals sigterm_ignored termination_started_ms= followed by that time, then a space and exited_ms= followed by total, then a space and grace_ms= followed by total less that time, each with two decimals, using toFixed(2).
3. No assertion, timeout, wait or other behavior changes, and nothing else in the file changes. Do not use the host's graceWaited, as Addendum 1 B1 rules. No new test is required: the change adds output and changes no assertion, as DEC-20261104-02 B3 item 2 says.
4. Then run the gates of FINAL GATES.
If the item cannot be met without changing an assertion, a timeout or a production file, or a change to any path outside DEC-20261104-02 B3 item 3, halt.

THE BUILD LOG
Create docs/verification/hardening-f-build-log.md in the commit: the item; the commit it built on; the files changed; each command with its exit status and its log's SHA-256; from each of the five runs of the changed test file in FINAL GATES, both printed lines quoted from its log, with the grace_ms value of each run listed; the final gates; deviations; and any halt. It holds no environment value, token, credential or key.

FINAL GATES (DEC-20261104-02 B3 item 4, with Addendum 1 B3)
After the change, each once, in order, in the foreground: the runtime check; bun x tsc --noEmit; bun test packages/pty-host/test/signals.test.ts five times in a row, each run printing both lines; bun test packages/pty-host; bun test test/phase3a; the runtime check again; bare bun test three times in a row; git diff --check 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6; and git diff --name-only 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6, which lists only the paths of DEC-20261104-02 B3 item 3. Each test run ends with zero failures. A run of the changed file that does not print both lines, or whose grace_ms is below 2000, is a halt. A failure here in a file outside those paths is a stop under DEC-20261023-01 B4 and B5: record it verbatim and halt; do not fix it.

ATTRIBUTION AND COMMITS
One commit, with parent 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6 and the subject test(pty-host): print the observed termination and grace timings. Its body names DEC-20261104-02 B3 and Addendum 1 B2 and the files changed, and ends with the three trailers of ASSIGNED ROLE AND ATTRIBUTION as its final paragraph; every line is 72 characters or shorter. In the commit message and in the description, no line other than the three trailers in the final paragraph may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:; check each with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):'. Add no Co-authored-by or other line after the three trailers, even if your tooling would add one. Do not amend, rebase or squash.

DELIVERABLES
- The commit on build/hardening-f-r1.
- The pull request title, Hardening F: print the observed termination and grace timings in the PTY host signal tests, and description, saved under /home/michaeldaley/builds/hardening-f-r1-pr/ as pr-title.txt and pr-body.md. The description is plain text under 60,000 bytes: what and why; the gap of DEC-20261104-02 A4 and the finding Addendum 1 answers; the change; the five runs of the changed test file with both printed lines and each log's SHA-256; the final gates with each log's SHA-256; limitations; not-run items, including that this host does not run the macOS branch of any test and Verify (macOS) does; deviations; a pointer to the build log; and the three trailers as its final paragraph. It has zero square brackets and zero bare three-hyphen lines.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on pr-body.md, and report both results.

HALTS (DEC-20261104-02 B3 item 7, with Addendum 1 B3, closed)
Stop and report FOUNDER_DECISION_REQUIRED only when: a path outside DEC-20261104-02 B3 item 3 would change; the item cannot be met without changing an assertion, a timeout or a production file; a test fails unexpectedly in a run whose first load average was 2.0 or more, which you do not rerun; your session loads any MCP server; the runtime is not the custodied build; the binding base differs from this prompt; or a grace_ms below 2000 is printed in any of the five runs of FINAL GATES. Every other failure is handled under DEC-20261023-01 Part B, and anything Part B makes a stop stays a stop.

FINAL REPORT (in this order)
1. Harness, model, permission mode, loaded MCP servers, git identity, and every runtime check.
2. Working directory, branch, HEAD, and the preconditions, each result with full SHAs and hashes.
3. The baseline, with the uptime before each run, each run's summary lines and every failure verbatim, and each log's SHA-256.
4. The change, and the five runs of the changed test file with both printed lines quoted from each log and the grace_ms of each run.
5. The final gates, with the uptime readings, each log's SHA-256 and the changed-path list.
6. The commit's full SHA and parent, the diff stat against 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6, the full diff of every changed file, and the attribution-shaped-line check on the message and the description.
7. The SHA-256 of pr-title.txt, pr-body.md and the build log, and both attribution-shape-check results.
8. Deviations, or the word none.
9. The single next decision for the Founder: move build/hardening-f-r1 to the MacBook, push it and open the draft pull request with the saved title and description.
