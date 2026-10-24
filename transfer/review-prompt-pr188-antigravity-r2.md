STEP: re-review of Task 24 after its correction, pull request 188. Paste this as the first message of a new Antigravity session running a Gemini 4 model on the Founder's MacBook, whose only workspace is the fresh clone /Users/michaeldaley/madventures-tui-m10-task24-review-r2, detached at 85dbf6162b930d775d9023df9c8cb4f4bee61ac1.

You are the independent Tier-2 reviewer of Phase 3A Task 24, as corrected, in MADVenturesLLC/madventures-tui.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: antigravity
FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, every active workspace, your working directory (pwd) and git rev-parse HEAD. Run pwd and git rev-parse HEAD to do so; those two commands are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini 4 model, any other workspace is active, or either path or the SHA differs.
You did not write, plan or direct any part of this work, and this session has seen no Task 24 material before this message. If either is untrue, stop and say so. Do not invent a session id, an actor id or a model id. You review one exact head and nothing else.
Do not read any other clone of this repository, including /Users/michaeldaley/madventures-tui-m10-task24-r1, /Users/michaeldaley/madventures-tui-m10-task24-r2 and /Users/michaeldaley/madventures-tui-m10-task24-review-r1; the folders /Users/michaeldaley/m10-task24-r1-pr and /Users/michaeldaley/m10-task24-r2-pr or anything in them; any file under /Users/michaeldaley whose name contains review-r1; anything under /tmp whose name contains t24, task24 or m10; or any earlier review notes. If you have seen any of them, stop and say so. Read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine or ~/.claude-madventures-v5, and run no command that prints an environment variable, a token or a key, or lists processes. Never run /Users/michaeldaley/bun-displaced-1.4.4.

TARGET
Pull request 188, draft, branch build/m10-task24-r1.
Head under review: 85dbf6162b930d775d9023df9c8cb4f4bee61ac1, two commits: c201cde18077b789b8aefe7c5f88db61d44649e5, the original Task 24 build, and on it the correction.
Binding base: 942c225bb3d4c772ad68c9cac2a7d494655758b9, the merge of pull request 187, named under DEC-20261022-02 B5.
Verify that git rev-parse HEAD^ is c201cde18077b789b8aefe7c5f88db61d44649e5, that git rev-parse HEAD^^ equals the binding base, and that git status is empty before you read anything else. If either differs, stop and report.

AUTHORITY
Run git fetch origin main first. Read in full, before the code, from origin/main:
1. docs/decisions/DEC-20261022-01-tasks-24-25-execution-authorization.md, SHA-256 1022b96143b0e5f27c5c3b755657267c111498edd292bea7c264bb2d090df168. Part B rules Task 24, C1 its paths, D its verification, and E3 defines this review.
2. docs/decisions/DEC-20261022-02-cleanup-budget-test-correction.md, SHA-256 db89d209eb1e5c3ca5a5a592074755c6483281a04c36f062449415bd2f7a4be4, B5: the move of Task 24's binding base.
3. docs/decisions/DEC-20260926-01-task22-execution-authorization.md, SHA-256 ddbc147ae3bbb6efd4ba4265e961c3652ed174e8d3eaf779bfacdf5a0fac0e44, C4, read with DEC-20261022-01 B6.
4. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7, B2 item 1: the macOS certification runtime.
5. docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md, SHA-256 c09fe4849a4a61bf3e1494b77267020e00bd1d7b3015e3b2332ec5d71b07f769, sections 9.3, 9.4 and 9.6.
6. docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2, Task 24 and section 11.3.
7. docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5. Part B binds how you work; Part C rules the correction and amends DEC-20261022-01 B3, B8, C1 and D2 and D3.
8. docs/decisions/DEC-20261024-01-separation-pin-rule.md, SHA-256 fa0d114dbe3a37db38a7538e9a5c33da42755a47250d7ae4069233043c6ac85e, as the merge authorization of pull request 190 reads it: B1 to B3, and B2's review of a pin change.
If any text is missing or has another SHA-256, stop and report. Where this prompt and the acts disagree, the acts win and you report the disagreement. You make no GitHub call, so report any cross-check against GitHub as not run.

PACKET (read every item)
1. The texts above.
2. At the binding base: packages/supervisor/src/build.ts, packages/supervisor/test/build.test.ts, test/phase3a/harness-separation.test.ts, packages/ledger/src/schema.ts, packages/broker/src/in-process-client.ts, packages/broker/src/runtime-broker.ts, packages/broker/src/snapshot.ts, packages/broker/src/client.ts, packages/broker/src/command-legality.ts, packages/protocol/src/events.ts, packages/protocol/src/lifecycle-events.ts, packages/ledger/src/ledger.ts and packages/ledger/src/rebuild.ts.
3. The diff from the binding base to the head, and the diff of each of the two commits.
4. At the head, with line numbers: every file of the eight paths of DEC-20261023-01 C4 as DEC-20261024-01 B3 extends it.
The commit messages are claims. Do the review items from the code and your own runs before you read it, and state when you read it. You do not read the pull request description, which is on GitHub.

REVIEW ITEMS (DEC-20261022-01 E3 for Task 24, as DEC-20261023-01 Part C and DEC-20261024-01 amend it; PASS only if all pass)
1. B2: evaluatePublishLegality decides in the order of steps 1 to 5 and no other, with the codes and details B2 names, including the complete BridgeEventV1 shape check of step 1 and the incident payload check; BrokerResult.commandId and detail behave as the paragraph after step 5 rules.
2. B3 as C2 amends it: RuntimeBroker gains only publish, which refuses an event whose event_id is already durable with invalid_command and detail publish: duplicate event_id, appending nothing, publishing no observation and interrupting nothing, whatever kind of record holds that event_id; otherwise appends with one Ledger.append, folds through reduceLedgerEvent, publishes exactly one observation and resolves only after the row is durable; the in-process client calls it only for an accepted ordinary event and stamps acceptedSnapshotSeq exactly as request() does; any other failed append publishes no observation, interrupts with reason ledger_write_failed and both source fields null, runs the teardown, and the client returns ledger_write_failed. Ledger.hasEventId is a read-only query.
3. C1: publish works through every client the supervisor's build constructs, including each adapter's execution-bound client, because the build's broker delegate forwards publish to the open broker as it forwards pause; build.ts changes nothing else.
4. B4 and B5: the two reference limbs and the fail-closed incident limb hold, and a refused incident changes nothing.
5. B6 and Part F: publish is reachable only through in-process clients the supervisor constructs with a bound principal; nothing folds verification, review, pendingTransfers or pendingApprovals; no snapshot member is added; nothing of Task 25 is present.
6. B8 and C3: publish-legality.test.ts holds exactly the twenty-two tests B8 and C3 name, and build.test.ts gains exactly the one test C3 names; each tests what its name says; no other test changes.
7. Paths and the pin: the changed paths against the binding base are exactly the eight; bun.lock and every manifest are byte-identical to the base; the only change to test/phase3a/harness-separation.test.ts is the sha256 of the build.ts entry, which equals the SHA-256 of build.ts at the head, with its call unchanged; and, as DEC-20261024-01 B2 requires, you read the build.ts diff and confirm it adds no route from production code to the test tree.
8. You reproduce D3 and the breaks, and try to defeat the tests, as WHAT YOU MUST EXECUTE says.
Also report any other difference between the head and the acts above, classified as below.

THE TEST RUNTIME
The macOS certification runtime on this host is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. /opt/homebrew/bin comes before it on PATH, and a child zsh resets PATH through /etc/zprofile, so begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Under that PATH report command -v bun, command -v bunx, the SHA-256 of the file command -v bun prints, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. If bunx does not resolve inside /Users/michaeldaley/.bun/bin, use bun x and say so. Change no PATH, profile or host setting, and install, upgrade or remove nothing on the host. No known-failure set and no timing exception applies on the MacBook.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
If you cannot run Bun in this clone or a disposable copy, return INCONCLUSIVE, name the checks you could not run, and stop. Do not guess results and do not return FAIL for that reason.
- Before any test, ask the Founder in one line to confirm that nothing else is running on this MacBook beyond this session, and record the answer. Record the output of uptime before every test run.
- bun install --frozen-lockfile, then record uname -srm and id -un. Restoring the mode of packages/founder-act/src/main.ts is not a finding; any other tracked change is.
- D3 at the head, each command once, one at a time, in the foreground: bunx tsc --noEmit; bun test packages/broker/test/publish-legality.test.ts; bun test packages/supervisor/test/build.test.ts; bun test test/phase3a/harness-separation.test.ts; bun test packages/broker; bun test packages/ledger; bun test packages/supervisor; then run the runtime check of THE TEST RUNTIME again, and if uptime shows a first load average of 2.0 or more, ask the Founder in one line to quiet the host and wait for the answer; bare bun test; git diff --check; git diff --name-only 942c225bb3d4c772ad68c9cac2a7d494655758b9. Do not rerun a failed command. If the full suite fails only on a test outside the eight changed paths, and your evidence shows this head does not cause it, item 8 is INCONCLUSIVE, not FAIL; report the failure with the uptime before it and your evidence under report section 5.
- At least four deliberate breaks: the build delegate without publish; the duplicate check removed; one that removes B3's interruption on a failed append; and one more of your choice from DEC-20261022-01 D2 or DEC-20261023-01 C5. For each, make it, run the test file it targets, name the test that fails and quote its assertion, restore, and confirm the file's SHA-256 equals the head's.
- Probes of your own, in a scratch copy outside the clone, with synthetic values only: for each adjacent pair of B2's steps, an event that fails both, showing which code is returned; events whose event_id is missing, not a string, or unreadable; an event with getters or extra properties; the detail of every failure, checked for event content; a publish through an adapter's client from a fixture build, of an accepted ordinary event and then of the same event again; and a publish whose event_id equals that of a lifecycle record already in the ledger. Report each input as code and the printed output verbatim.
- Try to defeat the tests: find an implementation that breaks a ruling of B2 to B6 or of DEC-20261023-01 C1 or C2 while the twenty-two tests of publish-legality.test.ts and the three of build.test.ts still pass. Report each attempt and its result.
Keep every probe and scratch file outside the repository, and leave the clone as you found it.
- Logs, under DEC-20261023-01 B6: pipe the full output of every test run through tee into a log file under /Users/michaeldaley/m10-task24-review-r2-logs/, one file per run, and report each log's SHA-256. If a run's output contains, or you see it would contain, the value of an environment variable, a token, a credential or a key, stop at once, do not open, quote, hash or copy that log, and report only its path and the test that produced it.

KNOWN ITEMS ALREADY RULED (assess, do not relitigate)
- Both commits were built by Codex sessions on this MacBook, under builder prompts and addenda the Founder signed. Their stops, addenda, relaunch and carried-forward results, the move of the first commit's base under DEC-20261022-02 B5, and the restoration of the runtime are process facts for the Founder, not review items.
- An earlier Tier-2 verdict on c201cde18077b789b8aefe7c5f88db61d44649e5 exists. It does not cover this head, and you do not read it.
- No test in this build runs a real provider executable; do not run one.
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
- Items 1 to 8 are not findings; their results go only in the verdict section.
- For every command, quote the last printed lines verbatim, including the pass, fail and file counts Bun prints, and the exit code. For every probe, give the input as code and the printed output verbatim.
- Write the complete final report, every section below in order, to /Users/michaeldaley/m10-task24-review-r2.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: reviewer id antigravity, the SHA you reviewed, the SHA in your checkout, your harness and model as shown, the host, that you did not author or direct the work and had seen none of its material, and when you read the commit message.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS, FAIL or INCONCLUSIVE line for each of items 1 to 8 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with printed counts, exit codes and the uptime before each test run, and what you only read.
5. The breaks, your probes, your attempts to defeat the tests, and any test failure outside the changed paths, each with its result.
6. Anything you could not run or verify, and why.
7. Disagreements between this prompt and the acts, or the word none.
