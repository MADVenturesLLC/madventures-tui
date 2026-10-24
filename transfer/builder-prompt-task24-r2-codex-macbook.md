STEP: the Task 24 correction of DEC-20261023-01 Part C, on pull request 188. Paste this as the first message of a new Codex CLI session on the Founder's MacBook, started from inside the fresh full clone /Users/michaeldaley/madventures-tui-m10-task24-r2, on the branch build/m10-task24-r1 at c201cde18077b789b8aefe7c5f88db61d44649e5, which the Founder's clone command checked out.

You are the Task 24 correction builder for MADVenturesLLC/madventures-tui. You work in a Codex CLI session on the Founder's MacBook. You make the correction exactly as DEC-20261023-01 Part C rules, land it as one new commit on build/m10-task24-r1 on top of c201cde18077b789b8aefe7c5f88db61d44649e5, and stop with a report. You make no GitHub call: the Founder pushes the commit and replaces the pull request description.

FIRST: YOUR IDENTITY REPORT, BEFORE ANY OTHER STEP
In your first reply, report as your harness shows them the harness name, the model, and your sandbox and approval settings; run pwd, git branch --show-current and git rev-parse HEAD, which are part of this report; then run the runtime check of THE TEST RUNTIME and report its output. A field your harness does not show is recorded as not shown and is not a stop. Stop and report FOUNDER_DECISION_REQUIRED only if the harness is not Codex, the working directory is not /Users/michaeldaley/madventures-tui-m10-task24-r2, the branch is not build/m10-task24-r1, HEAD is not c201cde18077b789b8aefe7c5f88db61d44649e5, or the runtime differs. Do not change your sandbox or approval settings yourself. If they block a command this prompt requires, stop and name it. If a command needs an approval or an escalation, ask the Founder in one line before running it.

ASSIGNED ROLE AND ATTRIBUTION (DEC-20261023-01 C6)
Role-Id: builder
Actor-Id: session:codex/m10-task24-r2
Execution-Surface: codex

AUTHORITY
Read all of these on origin/main in full before your first edit:
1. docs/decisions/DEC-20261023-01-standing-build-rules.md, FOUNDER-ACT-20261023-STANDING-BUILD-RULES, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5. Part B binds how you work; Part C rules this correction, its paths, its tests, its verification and its binding.
2. docs/decisions/DEC-20261022-01-tasks-24-25-execution-authorization.md, SHA-256 1022b96143b0e5f27c5c3b755657267c111498edd292bea7c264bb2d090df168, as DEC-20261023-01 Part C amends it: B2 to B6, B8, C1, D1 to D3 and E1.
3. docs/decisions/DEC-20261022-02-cleanup-budget-test-correction.md, B5.
4. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, B2 item 1: the macOS runtime.
5. Spec docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md sections 9.3 and 9.6; plan docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md Task 24.
6. AGENTS.md.
The acts decide what you may change. Apart from them, this prompt only tells you how to work and what to report. If this prompt and an act disagree, the act wins; stop and report the disagreement. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256.

THE TEST RUNTIME (DEC-20261013-03 B2 item 1, DEC-20261023-01 B8)
The macOS certification runtime on this host is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. /opt/homebrew/bin comes before it on this host's PATH, and a child zsh resets PATH through /etc/zprofile. So begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun or /Users/michaeldaley/bun-displaced-1.4.4. Change no system PATH, shell profile, Homebrew or host setting, and install, upgrade or remove nothing on the host. Under that PATH, report: command -v bun; command -v bunx; ls -l of /Users/michaeldaley/.bun/bin/bunx, which must be a symbolic link to bun; shasum -a 256 of the file command -v bun prints; bun --version; and bun -e 'process.stdout.write(Bun.revision)'. Any difference from the values above is a stop. Run this check before D1 and again immediately before D3's bare bun test, as DEC-20261023-01 B8 requires.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main build/m10-task24-r1. origin/main is 3fa9c3f7ea2d4ee39815cffb0daa53b06b550497, the merge of pull request 189, or a descendant of it. git diff --name-only 942c225bb3d4c772ad68c9cac2a7d494655758b9 origin/main lists no path under packages/ or apps/ and none of the seven paths of DEC-20261023-01 C4; report every path it lists. origin/build/m10-task24-r1 is c201cde18077b789b8aefe7c5f88db61d44649e5, HEAD equals it, its parent is 942c225bb3d4c772ad68c9cac2a7d494655758b9, and the tree is clean.
2. On origin/main, DEC-20261023-01 has the SHA-256 in AUTHORITY, Status ISSUED and the founder signature.
3. At HEAD: the broker delegate in packages/supervisor/src/build.ts is made with Object.create(RuntimeBroker.prototype) and defines no property named publish; Ledger in packages/ledger/src/ledger.ts has no hasEventId; RuntimeBroker.publish in packages/broker/src/runtime-broker.ts appends without any duplicate check; packages/broker/test/publish-legality.test.ts holds exactly 19 tests; packages/supervisor/test/build.test.ts holds exactly 2 tests. Quote what you rely on.
4. uname -sm prints Darwin arm64, and the runtime matches THE TEST RUNTIME.
5. Ask the Founder in one line to confirm that nothing else is running on this MacBook beyond this session, and record the answer.

TEST OUTPUT (DEC-20261023-01 B6)
For every test run, pipe its full output through tee into a log file under /Users/michaeldaley/m10-task24-r2-pr/logs/, one file per run, named for the step and run, and report each log's SHA-256. Do not truncate, compress or encode a log. If a run's output contains, or you see it would contain, the value of an environment variable, a token, a credential or a key, stop at once: do not open, quote, hash or copy that log, and report only its path and the test that produced it.

THE WORK
Follow DEC-20261023-01 Part C in full, under Part B. In particular:
- D1 at HEAD: bun install --frozen-lockfile, then bunx tsc --noEmit, bun test packages/broker, bun test packages/ledger, bun test packages/supervisor and bare bun test, each once, one at a time, in the foreground, with uptime recorded before each test run, and the host from uname -srm, the Bun version and revision, and the user from id -un. Under B3, a failure in a file outside the seven paths of C4 is recorded and is not a stop. bun.lock must stay byte-identical, with only the mode restore of packages/founder-act/src/main.ts to 100644 allowed and reported.
- Write the four tests of C3 first, with exactly those names. Run each alone with bun test and -t, and record each result verbatim before any implementation exists. The duplicate test and the build-delegate test must fail at this point; the two ordering tests pin behavior HEAD already has and may pass. Report which.
- Implement C1 and C2 exactly: the delegate forwards publish as it forwards pause; Ledger.hasEventId is a read-only query of the events table; RuntimeBroker.publish refuses a durable event_id before its append with invalid_command and detail publish: duplicate event_id, appending nothing, publishing no observation and interrupting nothing; every other append failure still interrupts as before.
- D2: make each of the four breaks of C5 in turn, run the test file it targets, name the test that fails and quote its assertion, restore, and confirm the file's SHA-256 matches its value before the break. Commit none of them. If a break leaves every test passing, stop.
- D3, in this order: bunx tsc --noEmit exits 0; publish-legality.test.ts shows exactly 22 passing; bun test packages/supervisor/test/build.test.ts passes; bun test packages/broker, bun test packages/ledger and bun test packages/supervisor each show 0 fail; the runtime check again; uptime, and if its first load average is 2.0 or more, ask the Founder in one line to quiet the host and wait for the answer; bare bun test once, which must show 0 fail; git diff --check is clean; and git diff --name-only 942c225bb3d4c772ad68c9cac2a7d494655758b9 lists exactly the seven paths of C4. B4 and B5 of DEC-20261023-01 govern any failure.

DO NOT (DEC-20261023-01 Parts B and F)
- Make any GitHub call, run any gh command, including gh auth status, or load, request or check any GH_TOKEN. git fetch and the bun install of D1 are your only network commands. Use no web search, web fetch, or other model or service, and start no subagent.
- Read anything outside the clone other than the Bun runtime and Bun's install cache; read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine or ~/.claude-madventures-v5; read no memory, transcript or notes of any earlier session; and read none of the Founder's other clones or folders, including /Users/michaeldaley/madventures-tui-m10-task24-r1 and /Users/michaeldaley/m10-task24-r1-pr. Run no command of your own that prints the value of an environment variable, a token, a credential or a key, and none that lists processes.
- Write anything outside the clone other than the files under /Users/michaeldaley/m10-task24-r2-pr/ that DELIVERABLES and TEST OUTPUT name, the disposable mkdtemp roots the tests create, and Bun's install cache.
- Run madbridge-claude-v5, claude, agy, codex as a child process yourself, or any real provider executable. Existing tests run as DEC-20261023-01 B2 says.
- Change any path outside the seven of C4, or any line of them beyond what Part C rules, including the plan, the spec and every decision record; change or remove any of the nineteen existing tests of publish-legality.test.ts or the two of build.test.ts; or add anything of Task 25.

ATTRIBUTION-SHAPED LINES
The pull request description becomes the merge commit message on main, where the attribution check reads every line. In your commit message and in the description, no line other than the three trailers in the final paragraph may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. The description covers two commits; name the first commit's Actor-Id in prose, never at the start of a line. Check both with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm the only matches are the three trailers. Rewrap any other match before you commit. Add no Co-authored-by or other line after the three trailers.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when: the identity report shows a harness other than Codex or a wrong directory, branch or HEAD; your sandbox blocks a required command; a precondition fails; the runtime differs at either check; bun install changes the tree beyond the mode restore; a D1 failure falls inside the seven paths, or an error stops a suite; the duplicate test or the build-delegate test passes before implementation; a break leaves every test passing; any D3 check fails in a way B4 does not let you fix; any path outside C4 would change; an existing test would have to change; a command's output would breach the limits of DO NOT; the design needs anything the acts do not authorize; or this prompt and an act disagree. State what passed, what failed, what is unchanged, and the single next decision.

DELIVERABLES
- One commit on build/m10-task24-r1, whose parent is c201cde18077b789b8aefe7c5f88db61d44649e5, with the subject fix(broker): route publish through the build delegate and refuse duplicate event ids, ending with the three trailers of ASSIGNED ROLE AND ATTRIBUTION as its final paragraph, each line 72 characters or shorter.
- A new pull request description saved under /Users/michaeldaley/m10-task24-r2-pr/ as pr-body.md, covering both commits of the branch. It is plain readable text with no compressed, encoded or packed content. It carries what and why for each commit; the Copilot and Cursor findings by comment id and how C1 and C2 answer them; the seven paths; this correction's D1, RED, D2 and D3 results with each log's SHA-256; a table that maps C1, C2 and each test of C3 to the test or check that pins it; not-run items; deviations, including every self-fix under B4; and the three trailers as its final paragraph. It has zero square brackets and zero bare three-hyphen lines. The pull request title stays as it is.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch against 942c225bb3d4c772ad68c9cac2a7d494655758b9, which must examine both commits, and in prbody mode on pr-body.md, and report both results.

FINAL REPORT (in this order)
1. Harness, model, sandbox and approval settings as your harness shows them, and the runtime check.
2. Working directory, branch, HEAD, and the preconditions, each result with full SHAs and hashes, and the Founder's one-line answer to precondition 5.
3. The D1 baseline: host, Bun version and revision, user, the uptime before each test run, and each run's summary and failure lines with its log's SHA-256.
4. The RED runs, then each break: what you changed, the test that failed, its assertion, and the restored file's SHA-256.
5. The D3 results in order, with both runtime checks, the uptime readings, each log's SHA-256 and the changed-path list.
6. The commit: full SHA, parent, diff stat, and the attribution-shaped-line check on the message and the description.
7. The SHA-256 of pr-body.md, and both attribution-shape-check results.
8. Deviations from this prompt, including every self-fix under DEC-20261023-01 B4, or the word none.
9. The single next decision for the Founder: push the commit to build/m10-task24-r1 and replace the description of pull request 188.
