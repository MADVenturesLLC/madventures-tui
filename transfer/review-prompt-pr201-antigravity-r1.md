STEP: review of Task 49, pull request 201. Paste this as the first message of a new Antigravity session running a Gemini 4 model on the Founder's MacBook, whose only workspace is the fresh clone /Users/michaeldaley/builds/madventures-tui-m22-task49-review-r1, detached at 06fa371bae8195afa6524da6a02b35448fe8e8bb.

You are the independent Tier-2 reviewer of Task 49 of DEC-20261027-01 B5 in MADVenturesLLC/madventures-tui.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: antigravity
FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, every active workspace, your working directory (pwd) and git rev-parse HEAD. Run pwd and git rev-parse HEAD to do so; those two commands are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini 4 model, any other workspace is active, or either path or the SHA differs.
You did not write, plan or direct any part of this work, and this session has seen no material of this build before this message. If either is untrue, stop and say so. Do not invent a session id, an actor id or a model id. You review one exact head and nothing else.
Do not read any other clone of this repository, including /Users/michaeldaley/builds/madventures-tui-m22-task49-r1; the folder /Users/michaeldaley/builds/m22-task49-r1-pr or anything in it; any earlier review report or log folder under /Users/michaeldaley or /Users/michaeldaley/builds; anything under /tmp whose name contains m22 or task49; or any earlier review notes, memory, transcript or session of any tool. If you have seen any of them, stop and say so. Read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine, ~/.claude-madventures-v5 or ~/.hermes, use no MCP server, and run no command that prints an environment variable, a token or a key, or lists processes. Search source with file names and line numbers, and do not print lines that assign values to token, key, secret or password variables. Never run /Users/michaeldaley/bun-displaced-1.4.4.

TARGET
Pull request 201, draft, branch build/m22-task49-r1.
Head under review: 06fa371bae8195afa6524da6a02b35448fe8e8bb, one commit.
Binding base: ce4b276aa49bb36c7736c82136de24db88360903, the merge of the M22 corrections build.
Verify that git rev-parse HEAD^ equals the binding base and that git status is empty, before you read anything else. If either differs, stop and report.

AUTHORITY
Run git fetch origin main first. Read in full, before the code, from origin/main:
1. docs/decisions/DEC-20261027-01-m22-execution-authorization.md, SHA-256 86f1374492a833ce87ebdf81293c59e8805c547d8bc29e1aa682b17a769bcd8b. B5 rules Task 49; B8 binds how you quote.
2. docs/decisions/DEC-20261018-03-task49-execution-authorization.md, SHA-256 b1f84cbb0a993d41c4b8a8acc579f826864567d3467374ff94341b66f59cb544. Only its B1 to B4, C1 and C2, D1 to D4 and E1 to E3 bind, and only as DEC-20261027-01 B5 changes them. In his merge authorization of pull request 197, which you cannot read on GitHub, the Founder ruled that DEC-20261018-03 has no force of its own, that its Part A is basis only, that its B5 is revoked, that its Part F is replaced by Part D of DEC-20261027-01, and that its binding base is replaced by the one DEC-20261027-01 B1 names.
3. The plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, section 5, Task 49.
4. docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5, Part B, which binds how you work, with B8 of the first act added to it.
5. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7, B2 item 1: the macOS certification runtime.
If any text is missing or has another SHA-256, stop and report.
The Founder's builder prompt, which you cannot read, read the grant of DEC-20261018-03 B4 as covering exactly these changes to test/phase3a/runtime-harness.ts: (a) the injectFailureAt option, validated as the surfaces option is, and passed to the build; (b) routing pty_input and pty_resize, after the client has accepted the command, to the active writer's PTY host; (c) pumping that host's output facts into the client with unsafeTestOnlyIngestOutputFrame; (d) the returned surface of DEC-20261027-01 B5 item 3, which may include a founder-bound client and one function that interrupts the session through the broker's own typed interruption, and nothing that returns the broker, the build's broker delegate or the ledger, or that lets a caller publish or append; (e) what close and the fixture termination need so that close completes after a session was interrupted or closed through the client; and (f) a typed startup failure that carries the failed step, the typed failure, the host and child PIDs and process groups the partial build recorded, and the fixture root, and no handle.
Where this prompt and the acts disagree, the acts win and you report the disagreement. You make no GitHub call, so report any cross-check against GitHub as not run.

PACKET (read every item)
1. The texts above.
2. At the binding base: test/phase3a/runtime-harness.ts, test/phase3a/fixture-adapters.ts, test/phase3a/harness-separation.test.ts, packages/supervisor/test/build.test.ts, packages/supervisor/src/build.ts, packages/broker/src/in-process-client.ts, packages/broker/src/runtime-broker.ts and packages/broker/src/pty-host-supervisor.ts.
3. The diff from the binding base to the head.
4. At the head, with line numbers: every changed file.
The commit message is a claim. Do the review items from the code and your own runs before you read it, and state when you read it. You do not read the pull request description, which is on GitHub.

REVIEW ITEMS (DEC-20261027-01 B5 and the incorporated clauses of DEC-20261018-03; PASS only if all pass)
1. DEC-20261018-03 B1 and plan Step 1: harness-lifecycle.test.ts holds the six tests with exactly the plan's names, and each asserts what its item of B1 requires through BrokerClient. For the echo test, say whether a frame other than the echo could satisfy it; for the resize test, whether the child's observation of the exact cols and rows is what it checks; for pause and resume, whether the fencing token is compared byte for byte; for close, whether the order of closing, invalidation and closed is checked from the ledger and every process is reaped; for interruption, whether the client's output streams are shown to end.
2. DEC-20261018-03 B2: harness-rollback.test.ts holds twelve tests, one per entry of BUILD_STEPS, generated from BUILD_STEPS; each asserts the typed failure at its step, that no host PID, child PID or process group survives, and that no session directory or ledger handle leaks. Say how each of these is checked, and whether a step that records no process still checks something.
3. DEC-20261018-03 B3: under --fixture-run the fixture echoes raw stdin bytes, including 0x00, 0x1b and 0xFF, reports the terminal size it observes after a resize, and exits cleanly on SIGTERM, SIGINT or end of input. Say how it detects a resize and what it depends on to do so.
4. DEC-20261018-03 B4 and DEC-20261027-01 B5 item 3: every change to runtime-harness.ts falls within (a) to (f); input and resize reach the host only after the client accepts the command; and nothing returned to tests is or exposes the broker, the build's broker delegate or the ledger, or lets a caller publish or append. Say what each returned member can do, and whether closing the client's streams inside interrupt and after session_close can hide output a test should see.
5. DEC-20261018-03 C1 and C2 with DEC-20261027-01 B5 item 1: the changed paths against the binding base are exactly test/phase3a/fixture-adapters.ts, test/phase3a/runtime-harness.ts, test/phase3a/harness-lifecycle.test.ts and test/phase3a/harness-rollback.test.ts; every other path, every production file and every existing test is byte-identical to the base; createFakeByteRouter is byte-identical; bun.lock and every manifest are byte-identical; the commit subject is test(phase3a): exercise the full fixture lifecycle through BrokerClient.
6. DEC-20261018-03 D2: the RED run of plan Step 2 shows the echo test failing because the fixture has no echo behavior. Say whether, at the binding base's fixture, the echo test fails before or after its write, and whether that RED run therefore shows the absence of echo.
7. You reproduce D4 and the breaks, run the probes, and try to defeat the tests, as WHAT YOU MUST EXECUTE says.
Also report any other difference between the head and the acts above, classified as below.

THE TEST RUNTIME
The macOS certification runtime on this host is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. /opt/homebrew/bin comes before it on PATH, and a child zsh resets PATH through /etc/zprofile, so begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Under that PATH report command -v bun, command -v bunx, the SHA-256 of the file command -v bun prints, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. If bunx does not resolve inside /Users/michaeldaley/.bun/bin, use bun x and say so. Change no PATH, profile or host setting, and install, upgrade or remove nothing on the host. No known-failure set and no timing exception applies on the MacBook.

TEST OUTPUT AND QUOTES (DEC-20261023-01 B6, DEC-20261027-01 B8)
Your log folder is /Users/michaeldaley/builds/m22-task49-review-r1-logs/. Create it, and write every log there and nowhere else. For every test run, every probe and every command whose output you quote, pipe its full output through tee into its own file in that folder, named for the step and run, and report each log's SHA-256. Do not truncate, compress or encode a log. Quote a command's output only by copying it from its log, and name that log beside the quote. Every SHA-256 you give of a repository file must be the output of a shasum command in a log. Do not state any hash, name, line number or value that you did not copy from a log or from a file you read in this clone. If you use bun test -t, escape every regular-expression metacharacter of the name and confirm from the summary how many tests ran; a run that reports zero tests is a failed check. If a run's output contains, or you see it would contain, the value of an environment variable, a token, a credential or a key, stop at once: do not open, quote, hash or copy that log, and report only its path and the test that produced it.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
If you cannot run Bun in this clone or a disposable copy, return INCONCLUSIVE, name the checks you could not run, and stop. Do not guess results and do not return FAIL for that reason.
- Before any test, ask the Founder in one line what else is running on this MacBook beyond this session, and record the answer verbatim. Record the output of uptime before every test run.
- bun install --frozen-lockfile, then record uname -srm and id -un. Restoring the mode of packages/founder-act/src/main.ts is not a finding; any other tracked change is.
- D4 at the head, each command once, one at a time, in the foreground: bunx tsc --noEmit; bun test test/phase3a/harness-lifecycle.test.ts three times in a row; bun test test/phase3a/harness-rollback.test.ts three times in a row; bun test test/phase3a and bun test packages/supervisor; then run the runtime check of THE TEST RUNTIME again, and if uptime shows a first load average of 2.0 or more, ask the Founder in one line to quiet the host and wait for the answer; bare bun test; git diff --check; git diff --name-only ce4b276aa49bb36c7736c82136de24db88360903. Do not rerun a failed command. If the full suite fails only on a test outside the changed paths, and your evidence shows this head does not cause it, item 7 is INCONCLUSIVE, not FAIL; report the failure with the uptime before it and your evidence under report section 5.
- At least four deliberate breaks: the fixture's echo removed; the fixture's resize report inverted; the termination of one recorded process skipped on rollback; and pty_input delivered to the host even when the client refuses the command. For each, make it, show git diff before the run, run the whole test file that should catch it with no -t filter, report which tests fail or that none does, quote the assertion of any failing test, restore, and confirm the file's SHA-256 equals the head's.
- Probes of your own, in a scratch copy outside the clone, with synthetic values only: a pty_input written while the session is paused, recording whether the bytes reach the child; an interrupt followed by close, recording whether close completes and whether any recorded process survives; a session_close through the client followed by close; the keys and values of the startup failure for one step at or after children, recording whether any is a handle; the fixture root and session directory after a failure at each of storage, hosts and activate; and the resize report after two resizes in quick succession. Report each input as code and the printed output verbatim.
- Try to defeat the tests: find a change to runtime-harness.ts or fixture-adapters.ts that breaks what DEC-20261018-03 B1 to B4 or DEC-20261027-01 B5 item 3 requires while every test at the head still passes. Report each attempt and its result.
Keep every probe and scratch file outside the repository, and leave the clone as you found it.

KNOWN ITEMS ALREADY RULED (assess, do not relitigate)
- The commit was built by a Codex session on this MacBook under a builder prompt and one addendum the Founder signed. Its stop, the addendum that answered it, and the builder's self-fixes under DEC-20261023-01 B4 are process facts for the Founder, not review items.
- DEC-20261027-01 B5 item 4: pty_input and pty_resize reach the PTY host through the harness, not through InProcessBrokerClient; that is a stated limitation, not a finding.
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
- Write the complete final report, every section below in order, to /Users/michaeldaley/builds/m22-task49-review-r1.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: reviewer id antigravity, the SHA you reviewed, the SHA in your checkout, your harness and model as shown, the host, that you did not author or direct the work and had seen none of its material, and when you read the commit message.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS, FAIL or INCONCLUSIVE line for each of items 1 to 7 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with printed counts, exit codes and the uptime before each test run, and what you only read.
5. The breaks, your probes, your attempts to defeat the tests, and any test failure outside the changed paths, each with its result.
6. Every log in your log folder, by file name and SHA-256, as one list.
7. Anything you could not run or verify, and why.
8. Disagreements between this prompt and the acts, or the word none.
