STEP: review of the M22 corrections build, pull request 198. Paste this as the first message of a new Antigravity session running a Gemini 4 model on the Founder's MacBook, whose only workspace is the fresh clone /Users/michaeldaley/builds/madventures-tui-m22-corrections-review-r1, detached at 5ef992f6ad6e53d18db493ed051d2fa59d5d2c5f.

You are the independent Tier-2 reviewer of the M22 corrections build of DEC-20261027-01 B2 to B4 in MADVenturesLLC/madventures-tui.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: antigravity
FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, every active workspace, your working directory (pwd) and git rev-parse HEAD. Run pwd and git rev-parse HEAD to do so; those two commands are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini 4 model, any other workspace is active, or either path or the SHA differs.
You did not write, plan or direct any part of this work, and this session has seen no material of this build before this message. If either is untrue, stop and say so. Do not invent a session id, an actor id or a model id. You review one exact head and nothing else.
Do not read any other clone of this repository, including /Users/michaeldaley/builds/madventures-tui-m22-corrections-r1; the folder /Users/michaeldaley/builds/m22-corrections-r1-pr or anything in it; any earlier review report or log folder under /Users/michaeldaley or /Users/michaeldaley/builds; anything under /tmp whose name contains m22; or any earlier review notes, memory, transcript or session of any tool. If you have seen any of them, stop and say so. Read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine, ~/.claude-madventures-v5 or ~/.hermes, use no MCP server, and run no command that prints an environment variable, a token or a key, or lists processes. Never run /Users/michaeldaley/bun-displaced-1.4.4.

TARGET
Pull request 198, draft, branch build/m22-corrections-r1.
Head under review: 5ef992f6ad6e53d18db493ed051d2fa59d5d2c5f, one commit.
Binding base: 98a32a9f9a4cbb73c795e8c9f83325cfd2827f59, the merge of pull request 197, which filed DEC-20261027-01.
Verify that git rev-parse HEAD^ equals the binding base and that git status is empty, before you read anything else. If either differs, stop and report.

AUTHORITY
Run git fetch origin main first. Read in full, before the code, from origin/main:
1. docs/decisions/DEC-20261027-01-m22-execution-authorization.md, SHA-256 86f1374492a833ce87ebdf81293c59e8805c547d8bc29e1aa682b17a769bcd8b. Part A states the basis; B2, B3 and B4 rule this build; B8 binds how you quote.
2. docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5, Part B, which binds how you work, with B8 of the act above added to it.
3. docs/decisions/DEC-20261022-01-tasks-24-25-execution-authorization.md, SHA-256 1022b96143b0e5f27c5c3b755657267c111498edd292bea7c264bb2d090df168: B7 and B9, which B3 of the act above amends, and D1 to D3, which B4 applies.
4. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7, B2 item 1: the macOS certification runtime.
If any text is missing or has another SHA-256, stop and report.
Two of the Founder's merge authorizations, which DEC-20261027-01 cites and which you cannot read on GitHub, say:
- Pull request 183, item 4a: before any act authorizes a caller of runPurePreflight or runPurePreflightWithDependencies, a change must make preflight fail with repository_fingerprint when the git common directory of the examined repository root differs from that of the examined worktree, with a test that fails without it.
- Pull request 193, item 4: "I require it of the act that authorizes M22: publishIncident refuses an already-durable event_id as publish does, with a test."
Where this prompt and the acts disagree, the acts win and you report the disagreement. You make no GitHub call, so report any cross-check against GitHub as not run.

PACKET (read every item)
1. The texts above.
2. At the binding base: packages/supervisor/src/preflight.ts, packages/supervisor/test/preflight.test.ts, packages/broker/src/runtime-broker.ts, packages/broker/src/in-process-client.ts, packages/broker/test/incident-atomicity.test.ts and packages/ledger/src/ledger.ts.
3. The diff from the binding base to the head.
4. At the head, with line numbers: every changed file.
The commit message is a claim. Do the review items from the code and your own runs before you read it, and state when you read it. You do not read the pull request description, which is on GitHub.

REVIEW ITEMS (DEC-20261027-01 B2 to B4; PASS only if all pass)
1. B2: preflight fails with repository_fingerprint when the real path of the git common directory of the examined repository root differs from that of the examined worktree, the worktree's common directory is computed the same way as the root's, and the test named in B2 fails without the check. Say what the change does when the envelope names the repository root itself, and when either git call fails, compared with the binding base.
2. B2: a worktree that git worktree add creates from the examined repository, and an envelope that names the repository's git common directory, still pass preflight wherever they passed at the binding base.
3. B3: publishIncident refuses an event whose event_id is already durable before it builds or appends any record, with invalid_command and detail publish: duplicate event_id; it appends nothing, publishes no observation and interrupts nothing; the client returns that result; and the test named in B3 asserts each of these and fails without the refusal.
4. B3 with item 4 of the merge authorization of pull request 193: publishIncident handles a failure of its duplicate lookup as publish handles a failure of its own duplicate lookup. Compare the two paths line by line and state any difference in result, interruption or teardown.
5. B2 and B3 counts: preflight.test.ts holds twenty-nine tests and incident-atomicity.test.ts seven; appendMany( occurs exactly twice in runtime-broker.ts; no existing test is removed, skipped, filtered or renamed, and no existing assertion changes.
6. B4 paths: the changed paths against the binding base are exactly packages/supervisor/src/preflight.ts, packages/supervisor/test/preflight.test.ts, packages/broker/src/runtime-broker.ts and packages/broker/test/incident-atomicity.test.ts, each changed only as B2 and B3 rule; bun.lock and every manifest are byte-identical to the base; the commit subject is fix: bind preflight to one repository and refuse duplicate incidents.
7. You reproduce D3 and the breaks, run the probes, and try to defeat the tests, as WHAT YOU MUST EXECUTE says.
Also report any other difference between the head and the acts above, classified as below.

THE TEST RUNTIME
The macOS certification runtime on this host is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. /opt/homebrew/bin comes before it on PATH, and a child zsh resets PATH through /etc/zprofile, so begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Under that PATH report command -v bun, command -v bunx, the SHA-256 of the file command -v bun prints, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. If bunx does not resolve inside /Users/michaeldaley/.bun/bin, use bun x and say so. Change no PATH, profile or host setting, and install, upgrade or remove nothing on the host. No known-failure set and no timing exception applies on the MacBook.

TEST OUTPUT AND QUOTES (DEC-20261023-01 B6, DEC-20261027-01 B8)
Your log folder is /Users/michaeldaley/builds/m22-corrections-review-r1-logs/. Create it, and write every log there and nowhere else. For every test run, every probe and every command whose output you quote, pipe its full output through tee into its own file in that folder, named for the step and run, and report each log's SHA-256. Do not truncate, compress or encode a log. Quote a command's output only by copying it from its log, and name that log beside the quote. Every SHA-256 you give of a repository file must be the output of a shasum command in a log. Do not state any hash, name, line number or value that you did not copy from a log or from a file you read in this clone. If a run's output contains, or you see it would contain, the value of an environment variable, a token, a credential or a key, stop at once: do not open, quote, hash or copy that log, and report only its path and the test that produced it.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
If you cannot run Bun in this clone or a disposable copy, return INCONCLUSIVE, name the checks you could not run, and stop. Do not guess results and do not return FAIL for that reason.
- Before any test, ask the Founder in one line what else is running on this MacBook beyond this session, and record the answer verbatim. Record the output of uptime before every test run.
- bun install --frozen-lockfile, then record uname -srm and id -un. Restoring the mode of packages/founder-act/src/main.ts is not a finding; any other tracked change is.
- D3 at the head, each command once, one at a time, in the foreground: bunx tsc --noEmit; bun test packages/supervisor/test/preflight.test.ts five times in a row; bun test packages/broker/test/incident-atomicity.test.ts five times in a row; bun test packages/supervisor and bun test packages/broker; then run the runtime check of THE TEST RUNTIME again, and if uptime shows a first load average of 2.0 or more, ask the Founder in one line to quiet the host and wait for the answer; bare bun test; grep -n "appendMany(" packages/broker/src/runtime-broker.ts; git diff --check; git diff --name-only 98a32a9f9a4cbb73c795e8c9f83325cfd2827f59. Do not rerun a failed command. If the full suite fails only on a test outside the changed paths, and your evidence shows this head does not cause it, item 7 is INCONCLUSIVE, not FAIL; report the failure with the uptime before it and your evidence under report section 5.
- At least three deliberate breaks: the common-directory comparison of B2 removed; the duplicate refusal of B3 removed from publishIncident; and the handling of a failure of publishIncident's duplicate lookup made to differ from publish's. For each, make it, show git diff before the run, run the test file that should catch it, report which tests fail or that none does, quote the assertion of any failing test, restore, and confirm the file's SHA-256 equals the head's.
- Probes of your own, in a scratch copy outside the clone, with synthetic values only: a linked worktree that git worktree add creates from the fixture repository; a worktree of a second repository; an envelope that names the git common directory instead of the root; a repository root reached through a symbolic link; a git call made to fail; and an incident publish in which the ledger's hasEventId throws. For each, record what preflight or publishIncident returns, and for the last whether the session is interrupted and its processes terminated. Report each input as code and the printed output verbatim.
- Try to defeat the tests: find a change to production code that breaks what B2 or B3 requires while every test at the head still passes. Report each attempt and its result.
Keep every probe and scratch file outside the repository, and leave the clone as you found it.

KNOWN ITEMS ALREADY RULED (assess, do not relitigate)
- The commit was built by a Codex session on this MacBook under a builder prompt and three addenda the Founder signed. Its stops, the addenda that answered them, an earlier session that was closed before D1, and the amend of an unpushed commit are process facts for the Founder, not review items.
- DEC-20261027-01 B9 defers, among others, the test of a worktree named through a symbolic link. Report what your probe of it shows, but its absence from the committed tests is not a finding.
- The Founder pushed the branch and opened the draft pull request. That is not a deviation.

BOUNDARIES
You are read-only toward GitHub and the repository. Make no GitHub call of any kind: no gh, no API request, no push, comment, approval, ready, resolve or merge; git fetch is the only network command you run, apart from the downloads of bun install. Edit no file you leave behind. Install nothing outside a disposable copy. Do not review anything outside this head, and do not propose changes to the acts. The Founder posts the verdict.

HOW TO CLASSIFY EVERY FINDING
Number each finding. Give file and line, the ruling it breaches (act and part), a concrete failing input or scenario, and one of:
- SUBSTANTIVE: a breach of a ruling, a missing or vacuous required test or assertion, a path outside scope, or behavior you can show is wrong.
- ADVISORY: an improvement the acts do not require.
- NOT COUNTING: a point plan section 11.3 lists as not counting. Quote the line.
A SUBSTANTIVE finding means FAIL; the Founder rules how it counts. Be exact: do not inflate an advisory, and do not downgrade a real defect.

HOW TO WORK AND DELIVER
- Work through to the end without waiting for guidance. The Founder answers only your one-line host questions and permission prompts, and will not send corrections. If you cannot complete a required item, the verdict is INCONCLUSIVE for that reason.
- Items 1 to 7 are not findings; their results go only in the verdict section.
- For every command, quote the last printed lines verbatim from its log, including the pass, fail and file counts Bun prints, and the exit code. For every probe, give the input as code and the printed output verbatim from its log.
- Write the complete final report, every section below in order, to /Users/michaeldaley/builds/m22-corrections-review-r1.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: reviewer id antigravity, the SHA you reviewed, the SHA in your checkout, your harness and model as shown, the host, that you did not author or direct the work and had seen none of its material, and when you read the commit message.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS, FAIL or INCONCLUSIVE line for each of items 1 to 7 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with printed counts, exit codes and the uptime before each test run, and what you only read.
5. The breaks, your probes, your attempts to defeat the tests, and any test failure outside the changed paths, each with its result.
6. Every log in your log folder, by file name and SHA-256, as one list.
7. Anything you could not run or verify, and why.
8. Disagreements between this prompt and the acts, or the word none.
