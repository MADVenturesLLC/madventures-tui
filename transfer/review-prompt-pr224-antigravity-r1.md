STEP: Tier-2 review of Hardening F, pull request 224. Paste this as the first message of a new Antigravity session running a Gemini 4 model on the Founder's MacBook, opened from the fresh clone /Users/michaeldaley/builds/madventures-tui-review-pr224-r1, detached at d8c91a25978fe8c3b748dd06ac3f87b01e835817. A read-only copy of this prompt, and of Addendum 1 and Addendum 2 to DEC-20261104-02, is in /Users/michaeldaley/builds/review-pr224-r1-prompt/.

You are the independent Tier-2 reviewer of Hardening F of DEC-20261104-02 B3, as its Addenda 1 and 2 amend it, in MADVenturesLLC/madventures-tui: two lines that packages/pty-host/test/signals.test.ts prints, so that the deadlines of plan section 8.5 that this file records have observed values in a passing run.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: antigravity
FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, and every active workspace. This harness may also attach /Users/michaeldaley and /Users/michaeldaley/MADVenturesOPs and start its commands in /Users/michaeldaley; that is expected. Begin every command with cd /Users/michaeldaley/builds/madventures-tui-review-pr224-r1 && and run it from there. Run pwd and git rev-parse HEAD that way; they are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini 4 model, /Users/michaeldaley/builds/madventures-tui-review-pr224-r1 is not an active workspace, pwd does not print that path, or HEAD is not d8c91a25978fe8c3b748dd06ac3f87b01e835817.
The workspaces /Users/michaeldaley and /Users/michaeldaley/MADVenturesOPs are outside this review: read nothing in them other than what this prompt names. Their AGENTS.md files do not apply; this prompt governs, and the AGENTS.md of the review clone is part of the repository you review.
You did not write, plan or direct any part of this work, and this session has seen no material of this build before this message. If either is untrue, stop and say so. Do not invent a session id, an actor id or a model id.
Do not read any other clone of this repository, including /Users/michaeldaley/builds/madventures-tui-hardening-f-r1 and every other clone under /Users/michaeldaley/builds; the folder /Users/michaeldaley/builds/hardening-f-r1-pr and every other build folder; any earlier review report, prompt folder or log folder under /Users/michaeldaley/builds; anything under /private/tmp or /tmp that you did not create; any harness transcript; or any memory or notes of any tool. Read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine, ~/.codex, ~/.codex-governed, ~/.claude, ~/.claude-madventures-v5, ~/.gemini or ~/.hermes, other than the prompt folder named above. Use no MCP server, start no other agent, and run no command that prints an environment variable, a token or a key, or lists processes. Never run /Users/michaeldaley/bun-displaced-1.4.4.

IF THE HARNESS COMPACTS THIS SESSION
Before your next step: run shasum -a 256 on /Users/michaeldaley/builds/review-pr224-r1-prompt/review-prompt-pr224-antigravity-r1.md with the command prefix above and log the output; it must equal the value in SHA256.txt in that folder; read that file in full; and continue from the step your logs show you last completed. If the value differs or the file is missing, stop and report. Record each re-read in report section 4.

TARGET
Pull request 224, draft, branch build/hardening-f-r1.
Head under review: d8c91a25978fe8c3b748dd06ac3f87b01e835817. Its parent is 9b9ca51ed17b407cc676ac099694c6c0d9537a63, whose parent is the binding base 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6, the merge of pull request 223, which filed DEC-20261104-02.
Verify that git rev-list --reverse 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6..HEAD lists exactly those two commits in that order with no merge, and that git status is empty, before you read anything else. If either differs, stop and report.

AUTHORITY
Run git fetch origin main first. Read in full, before the code:
1. From origin/main, docs/decisions/DEC-20261104-02-hardening-f-and-task58.md, SHA-256 011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5: A4, B2, B3, B7 item 6, B9 item 2 and Part D.
2. From the prompt folder, Addendum 1 to DEC-20261104-02, DEC-20261104-02-addendum-1-grace-interval.md, SHA-256 eb5bee7bf4c0c6564b0653ab89029fa32a1c7adc2566137ccf8a92835c965723. It is signed and in force but not yet on main.
3. From the prompt folder, Addendum 2 to DEC-20261104-02, DEC-20261104-02-addendum-2-fact-arrival-times.md, SHA-256 74ef54bc717567793eaee09bfddd059d1eca27db04e387cd325f67df93ae86e0. It is signed and in force but not yet on main.
4. From origin/main, docs/decisions/DEC-20261102-02-hardening-builds.md, SHA-256 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550: B4, which DEC-20261104-02 B3 item 4 applies.
5. From origin/main, docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5, Part B, which binds how you work.
6. From origin/main, the plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2, sections 8.5, 8.8 and 11.3.
If any text is missing or has another SHA-256, stop and report.
The Founder's standing rulings that bound the builder:
R1. bun install sets the executable bit on packages/founder-act/src/main.ts; restoring it with git checkout and recording it is not a finding.
R2. The load halt applies only when a test fails unexpectedly in a run whose first load average was 2.0 or more; the intended failures of a deliberate break are not a halt.
R3. DEC-20261104-02 B3 item 2 requires no new test for this build. The absence of a test that checks the printed lines is not a finding.
Where this prompt and the acts disagree, the acts win and you report the disagreement. You make no GitHub call, so report any cross-check against GitHub as not run.

THE FOUNDER'S EVIDENCE
Before this review began, the Founder's setup command confirmed that Verify on ubuntu-24.04, Verify (macOS) and code-review succeeded at this head. This is the Founder's evidence for the Linux runs, which this MacBook cannot make. It is not a substitute for your own runs.

PACKET (read every item)
1. The texts above.
2. The diff from the binding base to the head, and each commit's own diff.
3. At the head, with line numbers: packages/pty-host/test/signals.test.ts in full; packages/pty-host/src/signals.ts, terminateChildGroup in full; and docs/verification/hardening-f-build-log.md. At the base, the same test file.
The commit messages and the build log are claims. Do the review items from the code and your own runs before you read them, and state when you read them.

REVIEW ITEMS (PASS only if all pass)
1. The printed lines (B3 item 2, Addendum 1 B2, Addendum 2 B1): whether "termination_started is emitted within 500 ms" prints exactly one line of the form signals termination_started_ms= and a number with two decimals; whether "a child ignoring SIGTERM is SIGKILLed after the 2 s grace" prints exactly one line of the form signals sigterm_ignored termination_started_ms= then exited_ms= then grace_ms=, each with two decimals, with grace_ms equal to exited_ms less termination_started_ms; whether every printed value is the time at which the test's reader decoded the fact, measured from t0; and whether each line is printed before the assertions on the values it reports.
2. Nothing else (B3 item 2, Addendum 2 B1): whether any assertion, timeout, wait, re-check or value an assertion uses changed between the base and the head; whether the decode-time record can change any test's outcome other than by the error thrown for a fact the session did not decode; and whether that error can be reached by either test.
3. The measure (Addendum 2 A2 and A3): from packages/pty-host/src/signals.ts, whether the host emits termination_started before it sends SIGTERM and emits exited after the group is gone; whether grace_ms can be below 2000 while the host waited its full grace, other than by differences in when the two facts reach the reader; and whether the decode time removes the delay of the waiters' re-check that A2 describes.
4. Scope (B3 item 3): the changed paths against B3 item 3; no production file, bun.lock or manifest changed; both commits authored by daley40-lab, each ending with Role-Id builder, Actor-Id session:claude-code/hardening-f-r1 and Execution-Surface claude-code, with no line after them.
5. The build log: the fields DEC-20261102-02 B4 requires, a section on each commit, and whether its statements, quoted lines and counts match the commits and your own runs where they overlap.
6. You run the gates, the breaks and the probes, and look for a way the printed values misreport, as WHAT YOU MUST EXECUTE says.

THE TEST RUNTIME
The macOS certification runtime is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Report command -v bun, its SHA-256, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Change no host setting and install nothing outside a disposable copy.

TEST OUTPUT AND QUOTES
Your log folder is /Users/michaeldaley/builds/review-pr224-r1-logs/. Create it and write every log there and nowhere else. Pipe every test run, probe and quoted command through tee into its own log file, and report each log's SHA-256. Do not truncate, compress or encode a log. Quote output only from its log, naming the log, and copy every quote byte for byte. Do not state a hash, name, line number or value you did not copy from a log or a file you read in this clone. Seed only synthetic values. If a run's output contains, or would contain, a real token, credential or key, stop at once: do not open, quote, hash or copy that log, and report only its path and the test.

THE LOAD
Record uptime before every test run. Do not pause for the load and do not ask the Founder about it. If a test fails unexpectedly in a run whose first load average was 2.0 or more, do not rerun it: report it verbatim with that reading and mark the item it bears on INCONCLUSIVE, not FAIL, unless you can show the failure does not depend on load. The intended failures of a deliberate break are not such a failure.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
If you cannot run Bun in this clone or a disposable copy, return INCONCLUSIVE, name the checks you could not run, and stop.
- bun install --frozen-lockfile, then record uname -srm and id -un. Restoring the mode of packages/founder-act/src/main.ts is not a finding; any other tracked change is.
- The gates at the head, each once, one at a time, in the foreground: the runtime check; bunx tsc --noEmit; bun test packages/pty-host/test/signals.test.ts five times in a row, quoting both printed lines from each run; bun test packages/pty-host; bun test test/phase3a; the runtime check again; bare bun test; git diff --check 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6; git diff --name-only 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6. Do not rerun a failed command.
- At least four deliberate breaks, each made, shown with git diff before the run, run over the whole of packages/pty-host/test/signals.test.ts with no -t filter, reported with which tests fail or that none does and with the printed lines of that run, restored, and confirmed by the restored file's SHA-256 equal to the head's: the host's responsive grace in packages/pty-host/src/signals.ts reduced from 2000 to 1000 ms; the emit of termination_started in packages/pty-host/src/signals.ts delayed by 600 ms; the printed values taken from the moments the waits return instead of the decode times; and the decode-time record removed for every fact.
- Probes of your own, in a disposable copy outside the clone, with synthetic values only: run packages/pty-host/test/signals.test.ts five times while bun test test/phase3a runs at the same time in a second disposable copy, and report every printed line and the uptime before each run, and any failure in either copy verbatim; a failure in the second copy is not a finding against this pull request unless it is in packages/pty-host/test/signals.test.ts. Report the smallest grace_ms you observe in all your runs, gates and probes together.
- Look for a way, at the head, in which a printed value can misreport the interval it names while every test still passes and both lines are printed, for example a fact whose decode time is recorded late or a fact object the record does not hold. Report each attempt and its result.
Keep every probe and scratch file outside the repository, and leave the clone as you found it.

KNOWN ITEMS ALREADY RULED (assess, do not relitigate)
- The gap of DEC-20261104-02 A4, Copilot's finding answered by Addendum 1, and the cause of Addendum 2 A2 are ruled; the question here is whether this build carries out those rulings.
- The rulings R1 to R3 above.
- The builder's build log records that a decode time still includes the time the host's output takes to reach the reader and the reader's own scheduling, both of which can grow under load. Measure it in your probes; it is a finding only if you show a printed value at this head that misreports by more than that.

BOUNDARIES
You are read-only toward GitHub and the repository. Make no GitHub call of any kind; git fetch is the only network command you run, apart from the downloads of bun install. Edit no file you leave behind. The Founder posts the verdict.

HOW TO CLASSIFY EVERY FINDING
Number each finding. Give file and line, the ruling it breaches, a concrete failing input or scenario, the item it belongs to, and one of:
- SUBSTANTIVE: a breach of a ruling, a path outside scope, or behavior you can show is wrong.
- ADVISORY: an improvement the acts do not require.
- NOT COUNTING: a point plan section 11.3 lists as not counting. Quote the line.
Classify every break and every attempt that shows a printed value misreporting. A SUBSTANTIVE finding means FAIL; the Founder rules how it counts. Do not inflate an advisory, and do not downgrade a real defect.

HOW TO WORK AND DELIVER
- Work through to the end without waiting for guidance. The Founder answers only permission prompts and will not send corrections. If you cannot complete a required item, the verdict is INCONCLUSIVE for that reason.
- For every command, quote the last printed lines verbatim from its log, including pass, fail and file counts and the exit code. For every probe, give the input as code and the output verbatim from its log.
- Write the complete final report, every section below in order, to /Users/michaeldaley/builds/review-pr224-r1.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: reviewer id antigravity, the SHA you reviewed, the SHA in your checkout, harness and model as shown, every active workspace as shown, the host, that you did not author or direct the work, and when you read the commit messages and the build log.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS, FAIL or INCONCLUSIVE line for each of items 1 to 6 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with counts, exit codes and the uptime before each test run, any re-read of this prompt after a compaction, and what you only read.
5. The breaks, the probes and the attempts, each with its result and the smallest grace_ms observed.
6. Every log in your log folder, by file name and SHA-256.
7. Anything you could not run or verify, and why.
8. Disagreements between this prompt and the acts, or the word none.
