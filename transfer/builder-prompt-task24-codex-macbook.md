STEP: Phase 3A Task 24, publish legality with ingestion of accepted events. Paste this as the first message of a new Codex CLI session on the Founder's MacBook, started from inside the fresh full clone /Users/michaeldaley/madventures-tui-m10-task24-r1 on the new branch build/m10-task24-r1, which the Founder's clone command created at the binding base f201ced6d2339ae50dcd9a5608a2b92eae4d5165.

You are the Task 24 builder for MADVenturesLLC/madventures-tui. You work in a Codex CLI session on the Founder's MacBook. You implement Task 24 exactly as DEC-20261022-01 rules, land it as one commit on build/m10-task24-r1, and stop with a report. You make no GitHub call: the Founder pushes the branch and opens the draft pull request.

FIRST: YOUR IDENTITY REPORT, BEFORE ANY OTHER STEP
In your first reply, report as your harness shows them the harness name, the model, and your sandbox and approval settings; run pwd and git branch --show-current, which are part of this report; then run the runtime check of THE TEST RUNTIME and report its output. A field your harness does not show is recorded as not shown and is not a stop. Stop and report FOUNDER_DECISION_REQUIRED only if the harness is not Codex, the working directory is not /Users/michaeldaley/madventures-tui-m10-task24-r1, the branch is not build/m10-task24-r1, or the runtime differs. Do not change your sandbox or approval settings yourself. If they block a command this prompt requires, stop and name it. If a command needs an approval or an escalation, ask the Founder in one line before running it.

ASSIGNED ROLE AND ATTRIBUTION (DEC-20261022-01 B10 and E1)
Role-Id: builder
Actor-Id: session:codex/m10-task24-r1
Execution-Surface: codex

AUTHORITY
Read all of these on origin/main in full before your first edit:
1. docs/decisions/DEC-20261022-01-tasks-24-25-execution-authorization.md, FOUNDER-ACT-20261022-TASKS-24-25-EXECUTION-AUTHORIZATION, SHA-256 1022b96143b0e5f27c5c3b755657267c111498edd292bea7c264bb2d090df168. Its Part B rules Task 24, Part C1 fixes your paths, Part D your verification, and Part E your binding.
2. docs/decisions/DEC-20261015-05-phase-3a-process.md, B1 to B4.
3. docs/decisions/DEC-20260926-01-task22-execution-authorization.md, C4, read with DEC-20261022-01 B6.
4. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, B2 item 1 and B4: the macOS runtime.
5. Spec docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md §§9.3, 9.4 and 9.6; plan docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md Task 24, Task 25 and the M10 questions after Task 25.
6. AGENTS.md.
The act decides what you may change. Apart from it, this prompt only tells you how to work and what to report. If this prompt and the act disagree, the act wins; stop and report the disagreement. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256.

THE TEST RUNTIME (DEC-20261013-03 B2 item 1, DEC-20261022-01 B10)
The macOS certification runtime on this host is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. /opt/homebrew/bin comes before it on this host's PATH, and a child zsh resets PATH through /etc/zprofile. So begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Change no system PATH, shell profile, Homebrew or host setting. Under that PATH, report: command -v bun; command -v bunx; shasum -a 256 of the file command -v bun prints; bun --version; and bun -e 'process.stdout.write(Bun.revision)'. Any difference from the values above is a stop. If bunx does not resolve inside /Users/michaeldaley/.bun/bin, use bun x wherever this prompt says bunx, and report it. On the MacBook no known-failure set and no timing exception applies: every failure or error is a stop.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. origin/main is f201ced6d2339ae50dcd9a5608a2b92eae4d5165 or a descendant whose changes since it touch no path under packages/broker/, packages/ledger/ or packages/protocol/. Report the SHA and every changed path. HEAD is f201ced6d2339ae50dcd9a5608a2b92eae4d5165 on the new branch build/m10-task24-r1, and the tree is clean.
2. The binding base is the merge of pull request 185: its parents are a4e3c4dc7183a9f8b6ca74928ca530d23c1f2567 and c8c2b55e6c316d5388e45d93c3ae1f3bf077b94e. DEC-20261022-01 on it has the SHA-256 in AUTHORITY, Status ISSUED and the founder signature.
3. At the binding base: packages/broker/src/publish-legality.ts and packages/broker/test/publish-legality.test.ts do not exist; InProcessBrokerClient.publish() in packages/broker/src/in-process-client.ts returns unauthorized for every event; RuntimeBroker in packages/broker/src/runtime-broker.ts has no publish method. Quote what you rely on.
4. uname -sm prints Darwin arm64, and the runtime matches THE TEST RUNTIME.
5. Ask the Founder in one line to confirm that nothing else is running on this MacBook beyond this session, and record the answer.

THE WORK
Follow DEC-20261022-01 in full for Task 24: B2 to B6 for the behavior, B8 for the tests, C1 for the paths, D1 to D3 for the verification, E1 for the commit. In particular:
- D1 first: bun install --frozen-lockfile, then bunx tsc --noEmit, bun test packages/broker and bare bun test, each once, one at a time, in the foreground, with uptime recorded before each test run, each recorded verbatim with the host from uname -srm, the Bun version and revision, and the user from id -un. bun.lock must stay byte-identical, with only the mode restore of packages/founder-act/src/main.ts to 100644 allowed and reported.
- Write the nineteen tests of B8 first, with exactly those names, and run plan Task 24 Step 2's command verbatim: bun test packages/broker/test/publish-legality.test.ts -t "a malformed incident in a closed session is invalid_command, not session_not_writable". Record its RED failure verbatim before any implementation exists.
- Implement B2's five steps in that order and no other, including the complete BridgeEventV1 shape check of step 1 inside publish-legality.ts; B3's RuntimeBroker.publish with exactly one Ledger.append, one fold and one published observation, the ledger_write_failed interruption on a failed append, and acceptedSnapshotSeq stamped by the in-process client as request() stamps it; B4's two reference limbs; B5's fail-closed incident limb; and the in-process client wiring of B3 and B6. In runtime-broker.ts add only the publish method of B3.
- D2: one deliberate break for each step of B2's order, including the shape check, for B3's single append, for B3's interruption on a failed append, for each limb of B4 and for B5. Each must fail a named test. Restore after each and confirm the file's SHA-256. Commit none of them. If a break leaves every test passing, stop.
- D3: bunx tsc --noEmit exits 0; publish-legality.test.ts shows exactly 19 passing; bun test packages/broker shows 0 fail; bare bun test shows 0 fail; git diff --check is clean; the changed paths against the binding base are exactly the four of C1.
- Every existing broker test passes unchanged; no other test file changes.

DO NOT (DEC-20261022-01 Part F, B10, and this host)
- Make any GitHub call, push, open or comment on a pull request. git fetch and the bun install of D1 are the only network commands you run yourself. Use no web search, web fetch, or other model or service, and start no subagent.
- Read anything outside the clone other than the Bun runtime, Bun's install cache and the disposable mkdtemp roots your tests create; read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine or ~/.claude-madventures-v5, and none of the Founder's other clones or folders. Run no command that prints the value of an environment variable, a token, a credential or a key, and none that lists processes. Every executable a test starts is a fixture under a disposable mkdtemp root that emits only synthetic values.
- Write anything outside the clone other than the two files of DELIVERABLES, the disposable mkdtemp roots your tests create, and Bun's install cache.
- Run madbridge-claude-v5, claude, agy, codex as a child process, or any real provider executable.
- Install, upgrade or remove anything on the host, or change the system PATH, a shell profile or any host setting.
- Fold verification, review, pendingTransfers or pendingApprovals; add a snapshot member; add publishIncident or any Task 25 work; add any path to publish other than the in-process client; or change anything outside C1, including the plan, the spec and every decision record.

ATTRIBUTION-SHAPED LINES
The pull request description becomes the merge commit message on main, where the attribution check reads every line. In your commit message and in the description, no line other than the three trailers in the final paragraph may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. Check both with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm the only matches are the three trailers. Rewrap any other match before you commit. Add no Co-authored-by or other line after the three trailers.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when: the identity report shows a harness other than Codex or a wrong directory or branch; your sandbox blocks a required command; a precondition fails; the runtime differs; bun install changes the tree beyond the mode restore; any baseline or final test fails or errors; the RED run passes; a break leaves every test passing; any path outside C1 would change; an existing broker test would have to change; a command's output would breach the limits of DO NOT; the design needs anything the act does not authorize; or the act and this prompt disagree. State what passed, what failed, what is unchanged, and the single next decision.

DELIVERABLES
- One commit on build/m10-task24-r1 with the subject plan Task 24 Step 7 gives, feat(broker): enforce publish legality with fixed validation precedence, ending with the three trailers of ASSIGNED ROLE AND ATTRIBUTION as its final paragraph, each line 72 characters or shorter.
- The pull request title and description saved outside the clone, under /Users/michaeldaley/m10-task24-r1-pr/, as pr-title.txt and pr-body.md. The description carries what and why; the four paths; the D1, D2 and D3 results; a table that maps each of B2 steps 1 to 5, B3 including its failed-append interruption and client stamping, B4, B5, B6 and B8 to the test or check that pins it; not-run items; deviations; and the three trailers as its final paragraph. It has zero square brackets and zero bare three-hyphen lines.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on pr-body.md, and report both results.

FINAL REPORT (in this order)
1. Harness, model, sandbox and approval settings as your harness shows them, and the runtime check.
2. Working directory, branch, and the preconditions, each result with full SHAs and hashes, and the Founder's one-line answer to precondition 5.
3. The D1 baseline, verbatim, with host, Bun version and revision, user, and the uptime before each test run.
4. The RED run verbatim, then each break: what you changed, the test that failed, and the restored file's SHA-256.
5. The D3 results: tsc; publish-legality.test.ts with exactly 19 passing; packages/broker; the full suite; git diff --check; and the changed-path list against the binding base.
6. The commit: full SHA, parent, diff stat, and the attribution-shaped-line check on the message and the description.
7. The SHA-256 of pr-title.txt and pr-body.md, and both attribution-shape-check results.
8. Deviations from this prompt, or the word none.
9. The single next decision for the Founder: push build/m10-task24-r1 and open the draft pull request with the saved title and description.
