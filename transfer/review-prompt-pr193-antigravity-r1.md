STEP: review of Task 25, the atomic published-incident pair, pull request 193. Paste this as the first message of a new Antigravity session running a Gemini 4 model on the Founder's MacBook, whose only workspace is the fresh clone /Users/michaeldaley/madventures-tui-m10-task25-review-r1, detached at 899b73c8aa9e07425b8da1a92978eb020c67ddee.

You are the independent Tier-2 reviewer of Phase 3A Task 25 in MADVenturesLLC/madventures-tui.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: antigravity
FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, every active workspace, your working directory (pwd) and git rev-parse HEAD. Run pwd and git rev-parse HEAD to do so; those two commands are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini 4 model, any other workspace is active, or either path or the SHA differs.
You did not write, plan or direct any part of this work, and this session has seen no Task 25 material before this message. If either is untrue, stop and say so. Do not invent a session id, an actor id or a model id. You review one exact head and nothing else.
Do not read any other clone of this repository, including /Users/michaeldaley/madventures-tui-m10-task25-r1; the folder /Users/michaeldaley/m10-task25-r1-pr or anything in it; any file under /Users/michaeldaley whose name contains review-r1 or review-r2, other than the report this prompt tells you to write; anything under /tmp whose name contains t25, task25 or m10; or any earlier review notes, memory, transcript or session of any tool. If you have seen any of them, stop and say so. Read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine, ~/.claude-madventures-v5 or ~/.hermes, use no MCP server, and run no command that prints an environment variable, a token or a key, or lists processes. Never run /Users/michaeldaley/bun-displaced-1.4.4.

TARGET
Pull request 193, draft, branch build/m10-task25-r1.
Head under review: 899b73c8aa9e07425b8da1a92978eb020c67ddee, one commit.
Binding base: 7e4572c95d90c19b5403c07c8d4cd146c6d37d98, the merge of pull request 188, as the Task 25 builder prompt and DEC-20261024-02 name it.
Verify that git rev-parse HEAD^ equals the binding base and that git status is empty before you read anything else. If either differs, stop and report.

AUTHORITY
Run git fetch origin main first. Read in full, before the code, from origin/main:
1. docs/decisions/DEC-20261022-01-tasks-24-25-execution-authorization.md, SHA-256 1022b96143b0e5f27c5c3b755657267c111498edd292bea7c264bb2d090df168. B7 and B9 rule Task 25, C2 its paths, D its verification, and E3 defines this review; B3 and B6 bear on it.
2. docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5. Part B binds how you work; C2 amends DEC-20261022-01 B3; C7 rules Task 25's test count.
3. docs/decisions/DEC-20261024-01-separation-pin-rule.md, SHA-256 fa0d114dbe3a37db38a7538e9a5c33da42755a47250d7ae4069233043c6ac85e: B1 and B2's review of a pin change.
4. docs/decisions/DEC-20261024-02-task25-delegate-forwarding.md, SHA-256 1ddfa8acc4453af8af23f05c32e02aa4afc7d04270aaecb3cbb0093d6aac798f, which amends DEC-20261022-01 C2 and Part D for Task 25.
5. docs/decisions/DEC-20261025-01-task25-fencing-batch-count.md, SHA-256 09cc8288cc484422d6e4ae4496d69954d954d8aee59af7d6f54e8265589bddc4, which amends DEC-20261024-02 B4.
6. docs/decisions/DEC-20260926-01-task22-execution-authorization.md, SHA-256 ddbc147ae3bbb6efd4ba4265e961c3652ed174e8d3eaf779bfacdf5a0fac0e44, C4, read with DEC-20261022-01 B6.
7. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7, B2 item 1: the macOS certification runtime.
8. docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md, SHA-256 c09fe4849a4a61bf3e1494b77267020e00bd1d7b3015e3b2332ec5d71b07f769, sections 9.3 and 9.6.
9. docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2, Task 25 and section 11.3.
If any text is missing or has another SHA-256, stop and report. Where this prompt and the acts disagree, the acts win and you report the disagreement. You make no GitHub call, so report any cross-check against GitHub as not run.

PACKET (read every item)
1. The texts above.
2. At the binding base: packages/broker/src/in-process-client.ts, packages/broker/src/runtime-broker.ts, packages/broker/src/publish-legality.ts, packages/broker/src/snapshot.ts, packages/broker/src/fencing.ts, packages/protocol/src/events.ts, packages/protocol/src/lifecycle-events.ts, packages/ledger/src/ledger.ts, packages/ledger/src/rebuild.ts and packages/supervisor/src/build.ts.
3. The diff from the binding base to the head.
4. At the head, with line numbers: every file of the eight paths of DEC-20261025-01 B3.
The commit message is a claim. Do the review items from the code and your own runs before you read it, and state when you read it. You do not read the pull request description, which is on GitHub.

REVIEW ITEMS (DEC-20261022-01 E3 for Task 25, as DEC-20261024-02 and DEC-20261025-01 amend it; PASS only if all pass)
1. B7: publishIncident builds the derived session_interrupted record as B7 rules; calls Ledger.appendMany exactly once, with the event and then the derived record; folds both rows; publishes exactly one snapshot afterwards, in phase interrupted; then runs the existing invalidation, closing and closed sequence; and resolves only after the session_interrupted row is durable and the published phase is interrupted. No snapshot with phase active and a non-null incident can be observed.
2. B7's failure limb, read with DEC-20261022-01 B3 as DEC-20261023-01 C2 amends it: a failed appendMany appends nothing and publishes no observation of the pair, the broker interrupts with reason ledger_write_failed and both source fields null, and the client returns ledger_write_failed. Supervisor-originated interruptions keep both source fields null.
3. B3 and B7 routing: InProcessBrokerClient.publish routes an incident that passes B2 steps 1 to 4 to publishIncident and stamps acceptedSnapshotSeq as B3 says; ordinary events still take publish.
4. B6, Part F and DEC-20261024-02 B1: publishIncident is reachable only through an in-process client the supervisor constructs with a bound principal; the build delegate forwards publishIncident exactly as it forwards publish, and nothing else in build.ts changes; nothing folds verification, review, pendingTransfers or pendingApprovals; no snapshot member is added.
5. B9 and DEC-20261024-02 B2: incident-atomicity.test.ts holds exactly the six tests B9 names; publish-legality.test.ts holds twenty-two, with only the one test B9 names replaced; build.test.ts gains only the test DEC-20261024-02 B2 names; each test tests what its name says.
6. DEC-20261025-01 B1 and B2: in fencing.test.ts only the appendMany count and the comment before it change, and runtime-broker.ts gains no value import.
7. Paths and the pin: the changed paths against the binding base are exactly the eight of DEC-20261025-01 B3; bun.lock and every manifest are byte-identical to the base; the only change to test/phase3a/harness-separation.test.ts is the sha256 of the build.ts entry, which equals the SHA-256 of build.ts at the head, with its call unchanged; and, as DEC-20261024-01 B2 requires, you read the build.ts diff and confirm it adds no route from production code to the test tree.
8. You reproduce D3 and the breaks, and try to defeat the tests, as WHAT YOU MUST EXECUTE says.
Also report any other difference between the head and the acts above, classified as below.

THE TEST RUNTIME
The macOS certification runtime on this host is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. /opt/homebrew/bin comes before it on PATH, and a child zsh resets PATH through /etc/zprofile, so begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Under that PATH report command -v bun, command -v bunx, the SHA-256 of the file command -v bun prints, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. If bunx does not resolve inside /Users/michaeldaley/.bun/bin, use bun x and say so. Change no PATH, profile or host setting, and install, upgrade or remove nothing on the host. No known-failure set and no timing exception applies on the MacBook.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
If you cannot run Bun in this clone or a disposable copy, return INCONCLUSIVE, name the checks you could not run, and stop. Do not guess results and do not return FAIL for that reason.
- Before any test, ask the Founder in one line what else is running on this MacBook beyond this session, and record the answer verbatim. Record the output of uptime before every test run.
- bun install --frozen-lockfile, then record uname -srm and id -un. Restoring the mode of packages/founder-act/src/main.ts is not a finding; any other tracked change is.
- D3 at the head, each command once, one at a time, in the foreground: bunx tsc --noEmit; bun test packages/broker/test/incident-atomicity.test.ts; bun test packages/broker/test/publish-legality.test.ts; bun test packages/broker; bun test packages/ledger; bun test packages/supervisor; bun test test/phase3a/harness-separation.test.ts; then run the runtime check of THE TEST RUNTIME again, and if uptime shows a first load average of 2.0 or more, ask the Founder in one line to quiet the host and wait for the answer; bare bun test; git diff --check; git diff --name-only 7e4572c95d90c19b5403c07c8d4cd146c6d37d98. Do not rerun a failed command. If the full suite fails only on a test outside the eight changed paths, and your evidence shows this head does not cause it, item 8 is INCONCLUSIVE, not FAIL; report the failure with the uptime before it and your evidence under report section 5.
- At least four deliberate breaks from the list in DEC-20261022-01 D2 for Task 25, as DEC-20261024-02 B5 extends it: one that splits the pair into two append calls, one that publishes a snapshot between the two rows, the removal of the delegate's forwarding of publishIncident, and at least one more of your choice. For each, make it, run the test file that should catch it, name the test that fails and quote its assertion, restore, and confirm the file's SHA-256 equals the head's.
- Probes of your own, in a scratch copy outside the clone, with synthetic values only: a legal incident in each phase the matrix of spec section 9.3 permits, recording every observation in order with its phase, incident and ledger sequence; incidents the matrix refuses, with what each changes; an appendMany that throws, recording rows, observations, interruptions and the client's result; an incident whose event_id is already durable in the ledger; an incident whose payload carries extra keys or getters; and an incident published through an adapter client of a fixture build. Report each input as code and the printed output verbatim.
- Try to defeat the tests: find an implementation that breaks a ruling of B7, B9, DEC-20261024-02 B1 or DEC-20261025-01 B1 or B2 while every test at the head still passes. Report each attempt and its result.
Keep every probe and scratch file outside the repository, and leave the clone as you found it.

KNOWN ITEMS ALREADY RULED (assess, do not relitigate)
- The commit was built by Codex sessions on this MacBook, under a builder prompt and addenda the Founder signed. Their stops, the acts and addenda that answered them, the relaunch after a restart, the logs and load readings, and how each addendum reached the session are process facts for the Founder, not review items.
- That the build delegate exposes publish and publishIncident to any holder of the build result is ruled in the Founder's merge authorization of pull request 188, item 4, and DEC-20261024-02 B7, and is carried to the act for M22.
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
- Write the complete final report, every section below in order, to /Users/michaeldaley/m10-task25-review-r1.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: reviewer id antigravity, the SHA you reviewed, the SHA in your checkout, your harness and model as shown, the host, that you did not author or direct the work and had seen none of its material, and when you read the commit message.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS, FAIL or INCONCLUSIVE line for each of items 1 to 8 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with printed counts, exit codes and the uptime before each test run, and what you only read.
5. The breaks, your probes, your attempts to defeat the tests, and any test failure outside the changed paths, each with its result.
6. Anything you could not run or verify, and why.
7. Disagreements between this prompt and the acts, or the word none.
