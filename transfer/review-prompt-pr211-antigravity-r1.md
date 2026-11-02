STEP: Tier-2 review of Hardening A, pull request 211. Paste this as the first message of a new Antigravity session running a Gemini 4 model on the Founder's MacBook, opened from the fresh clone /Users/michaeldaley/builds/madventures-tui-review-pr211-r1, detached at 7e1d094ca53797fb88d591d1f05cab677b4332f4. A read-only copy of this prompt is in /Users/michaeldaley/builds/review-pr211-r1-prompt/.

You are the independent Tier-2 reviewer of Hardening A of DEC-20261102-02, items 1, 3, 4, 7, 8, 9 and 10 of DEC-20261102-01, in MADVenturesLLC/madventures-tui.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: antigravity
FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, and every active workspace. This harness also attaches /Users/michaeldaley and /Users/michaeldaley/MADVenturesOPs and starts its commands in /Users/michaeldaley; that is expected. Begin every command with cd /Users/michaeldaley/builds/madventures-tui-review-pr211-r1 && and run it from there. Run pwd and git rev-parse HEAD that way; they are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini 4 model, /Users/michaeldaley/builds/madventures-tui-review-pr211-r1 is not an active workspace, pwd does not print that path, or HEAD is not 7e1d094ca53797fb88d591d1f05cab677b4332f4.
The workspaces /Users/michaeldaley and /Users/michaeldaley/MADVenturesOPs are outside this review: read nothing in them other than what this prompt names. Their AGENTS.md files do not apply; this prompt governs, and the AGENTS.md of the review clone is part of the repository you review.
You did not write, plan or direct any part of this work, and this session has seen no material of this build before this message. If either is untrue, stop and say so. Do not invent a session id, an actor id or a model id.
Do not read any other clone of this repository, including /Users/michaeldaley/builds/madventures-tui-hardening-a-r1 and /Users/michaeldaley/builds/madventures-tui-hardening-b-r1; the folders /Users/michaeldaley/builds/hardening-a-r1-pr and /Users/michaeldaley/builds/hardening-b-r1-pr; any earlier review report, prompt folder or log folder under /Users/michaeldaley/builds; any harness transcript; or any memory or notes of any tool. Read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine, ~/.codex, ~/.gemini or ~/.hermes, other than the prompt folder named above. Use no MCP server, start no other agent, and run no command that prints an environment variable, a token or a key, or lists processes. Never run /Users/michaeldaley/bun-displaced-1.4.4.

IF THE HARNESS COMPACTS THIS SESSION
Before your next step: run shasum -a 256 on /Users/michaeldaley/builds/review-pr211-r1-prompt/review-prompt-pr211-antigravity-r1.md with the command prefix above and log the output; it must equal the value in SHA256.txt in that folder; read that file in full; and continue from the step your logs show you last completed. If the value differs or the file is missing, stop and report. Record each re-read in report section 4.

TARGET
Pull request 211, draft, branch build/hardening-a-r1.
Head under review: 7e1d094ca53797fb88d591d1f05cab677b4332f4, seven commits, one per item:
  5ae6c3d0305b5d6ef97901f085311b94c6e7e38c item 1
  dcf5fb874c116ce2f075e8f067fc611cef702cd4 item 3
  cf91f0d0e9db1bff93cc21000ea3c40442db6a99 item 4
  f527c00aaf5a9cfe0d98fd17276613911803781c item 7
  458fba01e63081009f5e02699588a409d684ca08 item 8
  b7c70ac142344b1bb239d644fd7c14a8b629736f item 9
  7e1d094ca53797fb88d591d1f05cab677b4332f4 item 10
Binding base: 68959cf27ee2652d4f9c3287cec4a5ee03798a7a, the merge of pull request 210, which filed DEC-20261102-02.
Verify that git rev-list --reverse 68959cf27ee2652d4f9c3287cec4a5ee03798a7a..HEAD lists exactly those seven commits in that order with no merge, and that git status is empty, before you read anything else. If either differs, stop and report.

AUTHORITY
Run git fetch origin main first. Read in full, before the code, from origin/main:
1. docs/decisions/DEC-20261102-02-hardening-builds.md, SHA-256 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550: B1 to B4, B6, B9 and Part D.
2. docs/decisions/DEC-20261102-01-phase-3a-carried-items.md, SHA-256 572f0d4ad9d901994f39884c456c67b3449504da192b06b6f6ba975ef1169866: A3 states each item, B1 how each is met.
3. docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5, Part B, which binds how you work.
4. The plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2, section 11.3, and the spec, docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md, SHA-256 c09fe4849a4a61bf3e1494b77267020e00bd1d7b3015e3b2332ec5d71b07f769, for the sections the items touch.
If any text is missing or has another SHA-256, stop and report.
The Founder gave the builder these rulings during the build, which you cannot read and which bound it:
R1. bun install sets the executable bit on packages/founder-act/src/main.ts; the builder restores it with git checkout and records it each time. That is not a finding.
R2. The B9 load halt applies only when a test fails unexpectedly in a run whose first load average was 2.0 or more; the intended failures of a deliberate-break or RED run are not a halt.
R3. The builder ran one memory lookup that found nothing, against its prompt, and recorded it. That is a process fact for the Founder, not a review item.
Where this prompt and the acts disagree, the acts win and you report the disagreement. You make no GitHub call, so report any cross-check against GitHub as not run.

PACKET (read every item)
1. The texts above.
2. The diff from the binding base to the head, and each commit's own diff.
3. At the head, with line numbers, every changed file, including docs/verification/hardening-a-build-log.md, and at the base the code each test exercises: spawnPtyHost in packages/broker/src/pty-host-supervisor.ts; the duplicate lookups reached by publish and publishIncident; the launch path in packages/pty-host; the doctor command; and preflight in packages/supervisor/src/preflight.ts.
The commit messages and the build log are claims. Do the review items from the code and your own runs before you read them, and state when you read them.

REVIEW ITEMS (PASS only if all pass)
1. Item 1: whether no .env file in the PTY host's working directory reaches the host's environment in production, whether the test would fail without the change, and whether the change alters any other behavior of spawnPtyHost.
2. Item 3: whether the tests show that a failing duplicate lookup in publish and in publishIncident refuses the command and appends nothing, and that a refused duplicate builds no record and consumes no event id; and whether each fails under a break of that behavior.
3. Item 4: whether the test shows the governed child's environment is exactly the launch frame's when the host's own environment holds more, and fails under a break.
4. Item 7: whether each value-import check now catches a value import at any indentation, with a test or assertion showing it.
5. Item 8: whether the doctor tests assert each check's expected status and that the doctor creates nothing in the home directory or the working directory.
6. Item 9: whether the test of preflight creates nothing now sees a path created and removed within the call, without a production change.
7. Item 10: whether the test of a worktree named through a symbolic link asserts the result the spec and the same-repository check define.
8. Scope: the changed paths against DEC-20261102-02 B2 item 1; the only production change in packages/broker/src/pty-host-supervisor.ts and only for item 1; bun.lock and every manifest byte-identical to the base; every commit authored by daley40-lab and ending with Role-Id builder, Actor-Id session:codex/hardening-a-r1 and Execution-Surface codex.
9. The build log: a section per item with the fields DEC-20261102-02 requires, and whether its counts match your own runs where they overlap.
10. You reproduce the final gates, the breaks and the probes, and try to defeat the tests, as WHAT YOU MUST EXECUTE says.

THE TEST RUNTIME
The macOS certification runtime is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Report command -v bun, its SHA-256, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Change no host setting and install nothing outside a disposable copy.

TEST OUTPUT AND QUOTES
Your log folder is /Users/michaeldaley/builds/review-pr211-r1-logs/. Create it and write every log there and nowhere else. Pipe every test run, probe and quoted command through tee into its own log file, and report each log's SHA-256. Do not truncate, compress or encode a log. Quote output only from its log, naming the log. Do not state a hash, name, line number or value you did not copy from a log or a file you read in this clone. Seed only synthetic values; run every probe that seeds a variable under env -i with only HOME, PATH set to /Users/michaeldaley/.bun/bin:/usr/bin:/bin, and the synthetic variables you choose. If a run's output contains, or would contain, a real token, credential or key, stop at once: do not open, quote, hash or copy that log, and report only its path and the test.

THE LOAD
Record uptime before every test run. Do not pause for the load and do not ask the Founder about it. If a test fails unexpectedly in a run whose first load average was 2.0 or more, do not rerun it: report it verbatim with that reading and mark the item it bears on INCONCLUSIVE, not FAIL, unless you can show the failure does not depend on load. The intended failures of a deliberate break are not such a failure.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
If you cannot run Bun in this clone or a disposable copy, return INCONCLUSIVE, name the checks you could not run, and stop.
- bun install --frozen-lockfile, then record uname -srm and id -un. Restoring the mode of packages/founder-act/src/main.ts is not a finding; any other tracked change is.
- The final gates at the head, each once, one at a time, in the foreground: bunx tsc --noEmit; bun test packages/broker; bun test packages/pty-host; bun test packages/supervisor; bun test apps/madbridge; bun test test/phase3a; the runtime check again; bare bun test; git diff --check 68959cf27ee2652d4f9c3287cec4a5ee03798a7a; git diff --name-only 68959cf27ee2652d4f9c3287cec4a5ee03798a7a. Do not rerun a failed command.
- At least nine deliberate breaks, each made, shown with git diff before the run, run over the whole of each affected test file with no -t filter, reported with which tests fail or that none does, restored, and confirmed by the restored file's SHA-256 equal to the head's: item 1's change reverted; item 3's duplicate lookup made to fail open; item 3's refused duplicate made to consume an event id; item 4's child given the host's environment; item 7's checks given the old pattern; item 8's doctor made to write a file into the home directory; item 9's preflight made to create and remove a file in its temporary location; item 10's same-repository check skipped for a symbolic link; and one break of your own choosing per item where the above does not apply.
- Probes of your own, in a scratch copy outside the clone, with synthetic values only: start a PTY host through spawnPtyHost with a synthetic .env file in its working directory and report whether any of its values reaches the host's environment; and run doctor in a scratch HOME and working directory and report every file it creates.
- Try to defeat the tests: find a change to production that breaks an item while every test at the head still passes. Report each attempt and its result.
Keep every probe and scratch file outside the repository, and leave the clone as you found it.

KNOWN ITEMS ALREADY RULED (assess, do not relitigate)
- Items 2, 11, 14 and 15 are Phase 3B and items 6, 16, 19 and 20 are stated limitations under DEC-20261102-01; items 5, 12, 13 and 17 are Hardening B's. None is a finding here.
- The rulings R1 to R3 above.
- That this MacBook does not run the Linux branch of any test is a stated limitation; the Founder checks Verify on ubuntu-24.04.

BOUNDARIES
You are read-only toward GitHub and the repository. Make no GitHub call of any kind; git fetch is the only network command you run, apart from the downloads of bun install. Edit no file you leave behind. The Founder posts the verdict.

HOW TO CLASSIFY EVERY FINDING
Number each finding. Give file and line, the ruling it breaches, a concrete failing input or scenario, the item it belongs to, and one of:
- SUBSTANTIVE: a breach of a ruling, a missing or vacuous required test or assertion, a path outside scope, or behavior you can show is wrong.
- ADVISORY: an improvement the acts do not require.
- NOT COUNTING: a point plan section 11.3 lists as not counting. Quote the line.
Classify every successful attempt to defeat the tests, and every break that no test catches. A SUBSTANTIVE finding means FAIL; the Founder rules how it counts. Do not inflate an advisory, and do not downgrade a real defect.

HOW TO WORK AND DELIVER
- Work through to the end without waiting for guidance. The Founder answers only permission prompts and will not send corrections. If you cannot complete a required item, the verdict is INCONCLUSIVE for that reason.
- For every command, quote the last printed lines verbatim from its log, including pass, fail and file counts and the exit code. For every probe, give the input as code and the output verbatim from its log.
- Write the complete final report, every section below in order, to /Users/michaeldaley/builds/review-pr211-r1.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: reviewer id antigravity, the SHA you reviewed, the SHA in your checkout, harness and model as shown, every active workspace as shown, the host, that you did not author or direct the work, and when you read the commit messages and the build log.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS, FAIL or INCONCLUSIVE line for each of items 1 to 10 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with counts, exit codes and the uptime before each test run, any re-read of this prompt after a compaction, and what you only read.
5. The breaks, the probes and the attempts to defeat the tests, each with its result.
6. Every log in your log folder, by file name and SHA-256.
7. Anything you could not run or verify, and why.
8. Disagreements between this prompt and the acts, or the word none.
