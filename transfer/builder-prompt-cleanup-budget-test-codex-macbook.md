STEP: the cleanup-budget test correction of DEC-20261022-02. Paste this as the first message of a new Codex CLI session on the Founder's MacBook, started from inside the fresh full clone /Users/michaeldaley/madventures-tui-cleanup-budget-test-r1 on the new branch build/cleanup-budget-test-r1, which the Founder's clone command created at the binding base e78f963240d23fa8851bc0b9b3769eaa3108a59c.

You are the builder of the cleanup-budget test correction for MADVenturesLLC/madventures-tui. You work in a Codex CLI session on the Founder's MacBook. You make the correction exactly as DEC-20261022-02 rules, land it as one commit on build/cleanup-budget-test-r1, and stop with a report. You make no GitHub call: the Founder pushes the branch and opens the draft pull request.

FIRST: YOUR IDENTITY REPORT, BEFORE ANY OTHER STEP
In your first reply, report as your harness shows them the harness name, the model, and your sandbox and approval settings; run pwd and git branch --show-current, which are part of this report; then run the runtime check of THE TEST RUNTIME and report its output. A field your harness does not show is recorded as not shown and is not a stop. Stop and report FOUNDER_DECISION_REQUIRED only if the harness is not Codex, the working directory is not /Users/michaeldaley/madventures-tui-cleanup-budget-test-r1, the branch is not build/cleanup-budget-test-r1, or the runtime differs. Do not change your sandbox or approval settings yourself. If they block a command this prompt requires, stop and name it. If a command needs an approval or an escalation, ask the Founder in one line before running it.

ASSIGNED ROLE AND ATTRIBUTION (DEC-20261022-02 B2 and E1)
Role-Id: builder
Actor-Id: session:codex/cleanup-budget-test-r1
Execution-Surface: codex

AUTHORITY
Read all of these on origin/main in full before your first edit:
1. docs/decisions/DEC-20261022-02-cleanup-budget-test-correction.md, FOUNDER-ACT-20261022-CLEANUP-BUDGET-TEST-CORRECTION, SHA-256 db89d209eb1e5c3ca5a5a592074755c6483281a04c36f062449415bd2f7a4be4. Its Part B rules the correction, Part C fixes your one path, Part D your verification, and Part E your binding.
2. docs/decisions/DEC-20261022-01-tasks-24-25-execution-authorization.md, B10, D1 to D3 and E3.
3. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, B2 item 1 and B4: the macOS runtime.
4. AGENTS.md.
The act decides what you may change. Apart from it, this prompt only tells you how to work and what to report. If this prompt and the act disagree, the act wins; stop and report the disagreement. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256.

THE TEST RUNTIME (DEC-20261013-03 B2 item 1, DEC-20261022-02 B2)
The macOS certification runtime on this host is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. /opt/homebrew/bin comes before it on this host's PATH, and a child zsh resets PATH through /etc/zprofile. So begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Change no system PATH, shell profile, Homebrew or host setting. Under that PATH, report: command -v bun; command -v bunx; shasum -a 256 of the file command -v bun prints; bun --version; and bun -e 'process.stdout.write(Bun.revision)'. Any difference from the values above is a stop. If bunx does not resolve inside /Users/michaeldaley/.bun/bin, use bun x wherever this prompt says bunx, and report it. On the MacBook no known-failure set and no timing exception applies, except at D1 as DEC-20261022-02 D1 says.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. origin/main is e78f963240d23fa8851bc0b9b3769eaa3108a59c or a descendant whose changes since it touch no path under packages/supervisor/. Report the SHA and every changed path. HEAD is e78f963240d23fa8851bc0b9b3769eaa3108a59c on the new branch build/cleanup-budget-test-r1, and the tree is clean.
2. The binding base is the merge of pull request 186: its parents are f201ced6d2339ae50dcd9a5608a2b92eae4d5165 and 494f7aab30ec37c6bb770c047ac48e84cba7976c. DEC-20261022-02 on it has the SHA-256 in AUTHORITY, Status ISSUED and the founder signature.
3. At the binding base, in packages/supervisor/test/attestation.test.ts, the test "cleanup budget exhaustion fails closed" wraps c.abort to record readiness, spawns through wrappedSpawn with a 700 ms delay and afterHandlerReady, takes its start time with performance.now() before runBoundedProbe, and asserts the elapsed time is less than 1150; and packages/supervisor/src/attestation.ts has CLEANUP_MS 1_000 and GRACE_MS 500. Quote what you rely on.
4. uname -sm prints Darwin arm64, and the runtime matches THE TEST RUNTIME.
5. Ask the Founder in one line to confirm that nothing else is running on this MacBook beyond this session, and record the answer.

TEST OUTPUT
For every test run in this prompt, pipe its full output through tee into a log file under /Users/michaeldaley/cleanup-budget-test-r1-pr/logs/, one file per run, named for the step and run, and report each log's SHA-256. Do not truncate, compress or encode a log. Your report quotes from the logs; it does not need to repeat them in full.

THE WORK
Follow DEC-20261022-02 in full: B1 for the correction, C1 for the path, D1 to D3 for the verification, E1 for the commit. In particular:
- D1 first: bun install --frozen-lockfile, then bunx tsc --noEmit, bun test packages/supervisor and bare bun test, each once, one at a time, in the foreground, with uptime recorded before each test run, each recorded with the host from uname -srm, the Bun version and revision, and the user from id -un. A failure of "cleanup budget exhaustion fails closed" on its elapsed-time bound, or of "doctor: read-only invariant > no files created in cwd" by its timeout, is recorded and is not a stop. Any other failure or error is a stop. bun.lock must stay byte-identical, with only the mode restore of packages/founder-act/src/main.ts to 100644 allowed and reported.
- Make B1's correction: in that test only, record performance.now() inside the test's existing wrapper of c.abort, at the moment the abort fires, and measure the elapsed time from that value to the return of runBoundedProbe, with the bound still less than 1150. Keep the test's name, fixture, 700 ms exit delay and every other assertion as they are. Change no other line of the file.
- D2: make each break of DEC-20261022-02 D2 in turn, run bun test packages/supervisor/test/attestation.test.ts, confirm the corrected test fails and name the failing assertion, restore, and confirm the file's SHA-256 matches its value before the break. Commit none of them. If a break leaves the corrected test passing, stop.
- D3, in this order: bunx tsc --noEmit exits 0; bun test packages/supervisor/test/attestation.test.ts passes five times in a row, each run separately in the foreground; bun test packages/supervisor shows 0 fail; then run uptime, and if its first load average is 2.0 or more, ask the Founder in one line to quiet the host, wait for the answer and run uptime again; then bare bun test once, which must show 0 fail; git diff --check is clean; the changed path against the binding base is exactly packages/supervisor/test/attestation.test.ts. Any failure or error in D3 is a stop: do not rerun it.

DO NOT (DEC-20261022-02 Part F, B2, and this host)
- Make any GitHub call, push, open or comment on a pull request. git fetch and the bun install of D1 are the only network commands you run yourself. Use no web search, web fetch, or other model or service, and start no subagent.
- Read anything outside the clone other than the Bun runtime and Bun's install cache; read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine or ~/.claude-madventures-v5, and none of the Founder's other clones or folders. Run no command of your own that prints the value of an environment variable, a token, a credential or a key, and none that lists processes. The existing tests run as they are, including whatever they start; change, skip or filter none of them.
- Write anything outside the clone other than the files under /Users/michaeldaley/cleanup-budget-test-r1-pr/ that DELIVERABLES and TEST OUTPUT name, the disposable mkdtemp roots the tests create, and Bun's install cache.
- Run madbridge-claude-v5, claude, agy, codex as a child process yourself, or any real provider executable.
- Install, upgrade or remove anything on the host, or change the system PATH, a shell profile or any host setting.
- Change packages/supervisor/src/attestation.ts or any source file outside a D2 break, the bound's value, any other test, or any other path, including the plan, the spec and every decision record.

ATTRIBUTION-SHAPED LINES
The pull request description becomes the merge commit message on main, where the attribution check reads every line. In your commit message and in the description, no line other than the three trailers in the final paragraph may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. Check both with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm the only matches are the three trailers. Rewrap any other match before you commit. Add no Co-authored-by or other line after the three trailers.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when: the identity report shows a harness other than Codex or a wrong directory or branch; your sandbox blocks a required command; a precondition fails; the runtime differs; bun install changes the tree beyond the mode restore; a D1 failure other than the two the act names; a break leaves the corrected test passing; any D3 check fails or errors; any path other than C1's would change; a command's output would breach the limits of DO NOT; or the act and this prompt disagree. State what passed, what failed, what is unchanged, and the single next decision.

DELIVERABLES
- One commit on build/cleanup-budget-test-r1 with the subject test(supervisor): measure the cleanup-budget bound from the abort, ending with the three trailers of ASSIGNED ROLE AND ATTRIBUTION as its final paragraph, each line 72 characters or shorter.
- The pull request title and description saved under /Users/michaeldaley/cleanup-budget-test-r1-pr/ as pr-title.txt and pr-body.md. The description is plain readable text with no compressed, encoded or packed content. It carries what and why; the one path and the diff; for D1, D2 and D3 the commands, the uptime readings, and the summary and failure lines of each run with its log's SHA-256; a table that maps B1 and each break of D2 to the test or check that pins it; not-run items; deviations; and the three trailers as its final paragraph. It has zero square brackets and zero bare three-hyphen lines.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch, which must examine your commit, and in prbody mode on pr-body.md, and report both results.

FINAL REPORT (in this order)
1. Harness, model, sandbox and approval settings as your harness shows them, and the runtime check.
2. Working directory, branch, and the preconditions, each result with full SHAs and hashes, and the Founder's one-line answer to precondition 5.
3. The D1 baseline: host, Bun version and revision, user, the uptime before each test run, and each run's summary and failure lines, with its log's SHA-256.
4. The correction as a diff, then each break: what you changed, the assertion that failed, and the restored file's SHA-256.
5. The D3 results: tsc; the five attestation runs; packages/supervisor; the uptime readings and the full suite; git diff --check; and the changed-path list against the binding base, each with its log's SHA-256.
6. The commit: full SHA, parent, diff stat, and the attribution-shaped-line check on the message and the description.
7. The SHA-256 of pr-title.txt and pr-body.md, and both attribution-shape-check results.
8. Deviations from this prompt, or the word none.
9. The single next decision for the Founder: push build/cleanup-budget-test-r1 and open the draft pull request with the saved title and description.
