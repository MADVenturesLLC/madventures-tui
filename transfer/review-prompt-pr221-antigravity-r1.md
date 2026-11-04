STEP: Tier-2 review of Hardening E, pull request 221. Paste this as the first message of a new Antigravity session running a Gemini 4 model on the Founder's MacBook, opened from the fresh clone /Users/michaeldaley/builds/madventures-tui-review-pr221-r1, detached at 4d752aa805f4a41e5c17c4b1e5c8f1144890ed9c. A read-only copy of this prompt is in /Users/michaeldaley/builds/review-pr221-r1-prompt/.

You are the independent Tier-2 reviewer of Hardening E of DEC-20261103-03 B2, in MADVenturesLLC/madventures-tui: how the Phase 3A test harness's fixture publishes its descendant record and how the harness waits for that record.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: antigravity
FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, and every active workspace. This harness may also attach /Users/michaeldaley and /Users/michaeldaley/MADVenturesOPs and start its commands in /Users/michaeldaley; that is expected. Begin every command with cd /Users/michaeldaley/builds/madventures-tui-review-pr221-r1 && and run it from there. Run pwd and git rev-parse HEAD that way; they are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini 4 model, /Users/michaeldaley/builds/madventures-tui-review-pr221-r1 is not an active workspace, pwd does not print that path, or HEAD is not 4d752aa805f4a41e5c17c4b1e5c8f1144890ed9c.
The workspaces /Users/michaeldaley and /Users/michaeldaley/MADVenturesOPs are outside this review: read nothing in them other than what this prompt names. Their AGENTS.md files do not apply; this prompt governs, and the AGENTS.md of the review clone is part of the repository you review.
You did not write, plan or direct any part of this work, and this session has seen no material of this build before this message. If either is untrue, stop and say so. Do not invent a session id, an actor id or a model id.
Do not read any other clone of this repository, including /Users/michaeldaley/builds/madventures-tui-hardening-e-r1 and every other clone under /Users/michaeldaley/builds; the folder /Users/michaeldaley/builds/hardening-e-r1-pr and every other build folder; any earlier review report, prompt folder or log folder under /Users/michaeldaley/builds; anything under /private/tmp or /tmp that you did not create; any harness transcript; or any memory or notes of any tool. Read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine, ~/.codex, ~/.codex-governed, ~/.claude, ~/.claude-madventures-v5, ~/.gemini or ~/.hermes, other than the prompt folder named above. Use no MCP server, start no other agent, and run no command that prints an environment variable, a token or a key, or lists processes. Never run /Users/michaeldaley/bun-displaced-1.4.4.

IF THE HARNESS COMPACTS THIS SESSION
Before your next step: run shasum -a 256 on /Users/michaeldaley/builds/review-pr221-r1-prompt/review-prompt-pr221-antigravity-r1.md with the command prefix above and log the output; it must equal the value in SHA256.txt in that folder; read that file in full; and continue from the step your logs show you last completed. If the value differs or the file is missing, stop and report. Record each re-read in report section 4.

TARGET
Pull request 221, draft, branch build/hardening-e-r1.
Head under review: 4d752aa805f4a41e5c17c4b1e5c8f1144890ed9c, one commit, whose parent is the binding base e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8, the merge of pull request 220, which filed DEC-20261103-03.
Verify that git rev-list e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8..HEAD lists exactly that one commit with no merge, and that git status is empty, before you read anything else. If either differs, stop and report.

AUTHORITY
Run git fetch origin main first. Read in full, before the code, from origin/main:
1. docs/decisions/DEC-20261103-03-hardening-d-records-and-hardening-e.md, SHA-256 44a7c8edc466b7186749f92f78b8b979152e2db2fc00036791d04891e955e794: A4, B2, B3 and Part D.
2. docs/decisions/DEC-20261102-02-hardening-builds.md, SHA-256 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550: B3 and B4, which DEC-20261103-03 B2 applies.
3. docs/decisions/DEC-20261103-01-hardening-c-records-and-hardening-d.md, SHA-256 43dc423e060b0e7ae04a0e7a0c302a5e38497cc212d704a5a37421d78aa1dd3a: B4.
4. docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5, Part B, which binds how you work.
5. The plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2, section 11.3.
If any text is missing or has another SHA-256, stop and report.
The Founder's standing rulings that bound the builder:
R1. bun install sets the executable bit on packages/founder-act/src/main.ts; restoring it with git checkout and recording it is not a finding.
R2. The load halt applies only when a test fails unexpectedly in a run whose first load average was 2.0 or more; the intended failures of a deliberate break or of a run against the code before a change are not a halt.
Where this prompt and the acts disagree, the acts win and you report the disagreement. You make no GitHub call, so report any cross-check against GitHub as not run.

THE FOUNDER'S EVIDENCE
At this head, Verify on ubuntu-24.04, Verify (macOS) and code-review passed on their first attempt. This is the Founder's evidence for the Linux runs, which this MacBook cannot make. It is not a substitute for your own runs.

PACKET (read every item)
1. The texts above.
2. The diff from the binding base to the head.
3. At the head, with line numbers: test/phase3a/runtime-harness.ts in the regions the diff touches and wherever waitForDescendantRecord and the descendant record are used; test/phase3a/fixture-adapters.ts, the fixture source it builds, including its imports; test/phase3a/descendant-record-wait.test.ts; and docs/verification/hardening-e-build-log.md. At the base, the same code of runtime-harness.ts.
The commit message and the build log are claims. Do the review items from the code and your own runs before you read them, and state when you read them.

REVIEW ITEMS (PASS only if all pass)
1. The fixture's write (B2 item 2, first rule): whether the fixture writes the descendant record to a temporary name in the same directory and renames it into place, so that no reader can see it partly written; whether the way the harness gives the fixture source what that write needs can fail silently, or change any fixture scenario other than grandchild, setsid and lifeline-eof; and whether test/phase3a/fixture-adapters.ts is unchanged.
2. The wait (second rule): whether the harness accepts the record only once it parses and names a safe integer greater than 1; whether it retries within HOST_DEADLINES_MS.outerBound and no longer; and whether it throws FixtureDescendantIdentityMissing when the deadline passes, for a record that never appears, one that never completes and one that names an unusable value.
3. The test (third rule): whether test/phase3a/descendant-record-wait.test.ts shows that the wait succeeds when the record first appears empty and is written 50 ms later, whether it is not vacuous, and whether it fails against the code at the base.
4. Nothing else (fourth rule): whether anything else in the harness changes, including through moving the wait into an exported function.
5. The other reads (B2 item 3): whether the build log lists every place in test/phase3a/ that reads a file another process writes after only checking that it exists, and whether what it says orders each write before its read holds. Do your own search before you read the build log's list.
6. Scope (B2 item 4): the changed paths against B2 item 4; no production file, bun.lock or manifest changed; the one commit authored by daley40-lab and ending with Role-Id builder, Actor-Id session:claude-code/hardening-e-r1 and Execution-Surface claude-code.
7. The build log: the fields DEC-20261102-02 B4 requires, and whether its statements and counts match the commit and your own runs where they overlap.
8. You reproduce the final gates, the breaks and the probes, and try to defeat the test, as WHAT YOU MUST EXECUTE says.

THE TEST RUNTIME
The macOS certification runtime is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Report command -v bun, its SHA-256, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Change no host setting and install nothing outside a disposable copy.

TEST OUTPUT AND QUOTES
Your log folder is /Users/michaeldaley/builds/review-pr221-r1-logs/. Create it and write every log there and nowhere else. Pipe every test run, probe and quoted command through tee into its own log file, and report each log's SHA-256. Do not truncate, compress or encode a log. Quote output only from its log, naming the log. Do not state a hash, name, line number or value you did not copy from a log or a file you read in this clone. Seed only synthetic values. If a run's output contains, or would contain, a real token, credential or key, stop at once: do not open, quote, hash or copy that log, and report only its path and the test.

THE LOAD
Record uptime before every test run. Do not pause for the load and do not ask the Founder about it. If a test fails unexpectedly in a run whose first load average was 2.0 or more, do not rerun it: report it verbatim with that reading and mark the item it bears on INCONCLUSIVE, not FAIL, unless you can show the failure does not depend on load. The intended failures of a deliberate break are not such a failure.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
If you cannot run Bun in this clone or a disposable copy, return INCONCLUSIVE, name the checks you could not run, and stop.
- bun install --frozen-lockfile, then record uname -srm and id -un. Restoring the mode of packages/founder-act/src/main.ts is not a finding; any other tracked change is.
- The final gates at the head, each once, one at a time, in the foreground: bunx tsc --noEmit; test/phase3a/descendant-record-wait.test.ts twenty times in a row; bun test test/phase3a/adversarial three times in a row; bun test test/phase3a; the runtime check again; bare bun test; git diff --check e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8; git diff --name-only e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8. Do not rerun a failed command.
- At least four deliberate breaks, each made, shown with git diff before the run, run over the whole of each affected test file with no -t filter and, for a break in the fixture's write, over bun test test/phase3a/adversarial, reported with which tests fail or that none does, restored, and confirmed by the restored file's SHA-256 equal to the head's: the wait restored to its behavior at the base; the wait parsing once and throwing on the first parse failure; the wait accepting a pid of 1; and the fixture writing the record directly under its final name.
- Probes of your own, in a scratch copy outside the clone, with synthetic values only: run test/phase3a/descendant-record-wait.test.ts five times and report the elapsed times; call waitForDescendantRecord on a path that never appears, on a record that stays empty and on a record naming 1, each with the time until it throws; and run the fixture's write of the record, as the harness injects it, two hundred times while a reader polls the path, and report whether the reader ever parsed a partial record.
- Try to defeat the test: find a change to the wait or to the fixture's write that lets a partly written record be accepted, lets the wait outlive its deadline, or lets an unusable pid through, while every test at the head still passes. Report each attempt and its result.
Keep every probe and scratch file outside the repository, and leave the clone as you found it.

KNOWN ITEMS ALREADY RULED (assess, do not relitigate)
- The verdicts, carried findings and limitations that DEC-20261103-03 rules on are not findings here unless this pull request changes them.
- The rulings R1 and R2 above.
- At the binding base, test/phase3a/runtime-harness.ts line 774 can fail with FixtureSupervisorStartupTimeout in "no child, descendant, host, descriptor, open ledger session, or live fencing token remains after the adversarial suite", a failure seen once on the macOS runner outside the scope of this build. If it occurs in one of your runs, report it verbatim, run nothing again to obtain a pass, and do not count it against this pull request; any other failure in that run still counts.

BOUNDARIES
You are read-only toward GitHub and the repository. Make no GitHub call of any kind; git fetch is the only network command you run, apart from the downloads of bun install. Edit no file you leave behind. The Founder posts the verdict.

HOW TO CLASSIFY EVERY FINDING
Number each finding. Give file and line, the ruling it breaches, a concrete failing input or scenario, the item it belongs to, and one of:
- SUBSTANTIVE: a breach of a ruling, a missing or vacuous required test or assertion, a path outside scope, or behavior you can show is wrong.
- ADVISORY: an improvement the acts do not require.
- NOT COUNTING: a point plan section 11.3 lists as not counting. Quote the line.
Classify every successful attempt to defeat the test, and every break that no test catches. A SUBSTANTIVE finding means FAIL; the Founder rules how it counts. Do not inflate an advisory, and do not downgrade a real defect.

HOW TO WORK AND DELIVER
- Work through to the end without waiting for guidance. The Founder answers only permission prompts and will not send corrections. If you cannot complete a required item, the verdict is INCONCLUSIVE for that reason.
- For every command, quote the last printed lines verbatim from its log, including pass, fail and file counts and the exit code. For every probe, give the input as code and the output verbatim from its log.
- Write the complete final report, every section below in order, to /Users/michaeldaley/builds/review-pr221-r1.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: reviewer id antigravity, the SHA you reviewed, the SHA in your checkout, harness and model as shown, every active workspace as shown, the host, that you did not author or direct the work, and when you read the commit message and the build log.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS, FAIL or INCONCLUSIVE line for each of items 1 to 8 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with counts, exit codes and the uptime before each test run, any re-read of this prompt after a compaction, and what you only read.
5. The breaks, the probes and the attempts to defeat the test, each with its result.
6. Every log in your log folder, by file name and SHA-256.
7. Anything you could not run or verify, and why.
8. Disagreements between this prompt and the acts, or the word none.
