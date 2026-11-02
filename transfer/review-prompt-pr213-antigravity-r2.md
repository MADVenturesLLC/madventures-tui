STEP: Tier-2 review of the Hardening B correction commit, pull request 213, round 2. Paste this as the first message of a new Antigravity session running a Gemini 4 model on the Founder's MacBook, opened from the fresh clone /Users/michaeldaley/builds/madventures-tui-review-pr213-r2, detached at 7a23f9cd085e12ea6ad29ab5e3d8957de1e1baed. A read-only copy of this prompt is in /Users/michaeldaley/builds/review-pr213-r2-prompt/.

You are the independent Tier-2 reviewer of one correction commit to Hardening B of DEC-20261102-02, in MADVenturesLLC/madventures-tui. The four earlier commits of this pull request were reviewed at 0a80144047b64fffdc684d437b49adbe5f0fac9f with a PASS. You review only what changed since that head, and confirm that nothing else did.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: antigravity
FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, and every active workspace. This harness may also attach /Users/michaeldaley and /Users/michaeldaley/MADVenturesOPs and start its commands in /Users/michaeldaley; that is expected. Begin every command with cd /Users/michaeldaley/builds/madventures-tui-review-pr213-r2 && and run it from there. Run pwd and git rev-parse HEAD that way; they are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini 4 model, /Users/michaeldaley/builds/madventures-tui-review-pr213-r2 is not an active workspace, pwd does not print that path, or HEAD is not 7a23f9cd085e12ea6ad29ab5e3d8957de1e1baed.
The workspaces /Users/michaeldaley and /Users/michaeldaley/MADVenturesOPs are outside this review: read nothing in them other than what this prompt names. Their AGENTS.md files do not apply; this prompt governs, and the AGENTS.md of the review clone is part of the repository you review.
You did not write, plan or direct any part of this work, and this session has seen no material of this build before this message. If either is untrue, stop and say so. Do not invent a session id, an actor id or a model id.
Do not read any other clone of this repository, including /Users/michaeldaley/builds/madventures-tui-hardening-a-r1, /Users/michaeldaley/builds/madventures-tui-hardening-b-r1, /Users/michaeldaley/builds/madventures-tui-review-pr211-r1 and /Users/michaeldaley/builds/madventures-tui-review-pr213-r1; the folders /Users/michaeldaley/builds/hardening-a-r1-pr and /Users/michaeldaley/builds/hardening-b-r1-pr; any earlier review report, prompt folder or log folder under /Users/michaeldaley/builds; any harness transcript; or any memory or notes of any tool. Read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine, ~/.codex, ~/.gemini or ~/.hermes, other than the prompt folder named above. Use no MCP server, start no other agent, and run no command that prints an environment variable, a token or a key, or lists processes. Never run /Users/michaeldaley/bun-displaced-1.4.4.

IF THE HARNESS COMPACTS THIS SESSION
Before your next step: run shasum -a 256 on /Users/michaeldaley/builds/review-pr213-r2-prompt/review-prompt-pr213-antigravity-r2.md with the command prefix above and log the output; it must equal the value in SHA256.txt in that folder; read that file in full; and continue from the step your logs show you last completed. If the value differs or the file is missing, stop and report. Record each re-read in report section 4.

TARGET
Pull request 213, branch build/hardening-b-r1.
Head under review: 7a23f9cd085e12ea6ad29ab5e3d8957de1e1baed, one commit on top of 0a80144047b64fffdc684d437b49adbe5f0fac9f.
Binding base of the build: 68959cf27ee2652d4f9c3287cec4a5ee03798a7a, the merge of pull request 210.
Before you read anything else, verify that git rev-list --reverse 0a80144047b64fffdc684d437b49adbe5f0fac9f..HEAD lists exactly 7a23f9cd085e12ea6ad29ab5e3d8957de1e1baed and no merge; that git rev-list --reverse 68959cf27ee2652d4f9c3287cec4a5ee03798a7a..0a80144047b64fffdc684d437b49adbe5f0fac9f lists exactly 8c4d3d87ce8a937a4a3f1bedab281603e147442f, a366872b6e770fd1d77ddcd6bacc2824c9ba22b5, 51fc50daafd87b94487bb870d07f5629eaeebace and 0a80144047b64fffdc684d437b49adbe5f0fac9f in that order; and that git status is empty. If any differs, stop and report.

AUTHORITY
Run git fetch origin main first. Read in full, before the code, from origin/main:
1. docs/decisions/DEC-20261102-02-hardening-builds.md, SHA-256 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550: B2 to B4, B6, B9 and Part D.
2. docs/decisions/DEC-20261102-01-phase-3a-carried-items.md, SHA-256 572f0d4ad9d901994f39884c456c67b3449504da192b06b6f6ba975ef1169866: item 13 in A3 and B1.
3. docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5, Part B, which binds how you work.
4. The plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2, section 11.3.
If any text is missing or has another SHA-256, stop and report. origin/main may be ahead of the binding base; that is not a finding.
The Founder's ruling for this commit, which bound the builder:
R4. After the review at 0a80144047b64fffdc684d437b49adbe5f0fac9f, an automated reviewer found that the guard on an explicit --output in apps/madbridge/src/commands/export-evidence.ts checked only the names of its entries, so a directory or symbolic link named README.txt, manifest.json or ledger-sanitized.json passed it, and the whole output directory was then renamed aside and removed recursively. The Founder authorized one commit, as part of item 13: an explicit --output that exists is replaced only when every entry in it is a regular file whose name is one of those three; otherwise the command refuses with the same output_not_empty result, in both the JSON and the text form; a symbolic link is not a regular file; nothing else in the file changes, and the --session path, the staging, the renames and the restore stay as they were. Two tests are added to test/phase3a/evidence-pipeline.test.ts: one that the command refuses an explicit output holding a directory named README.txt, and one holding a symbolic link named manifest.json, each leaving the directory, the link and their content intact; and one that an explicit output holding only an earlier package is still replaced. The commit changes only export-evidence.ts, evidence-pipeline.test.ts and docs/verification/hardening-b-build-log.md.
The earlier rulings R1 to R3 of round 1 still bind: item 18 is not built; the B9 load halt applies only to unexpected failures; restoring the mode bun install sets on packages/founder-act/src/main.ts is not a finding.
Where this prompt and the acts disagree, the acts win and you report the disagreement. You make no GitHub call, so report any cross-check against GitHub as not run.

PACKET (read every item)
1. The texts above.
2. git diff 0a80144047b64fffdc684d437b49adbe5f0fac9f HEAD, and the commit's own message.
3. At the head, with line numbers: apps/madbridge/src/commands/export-evidence.ts in full; the tests of test/phase3a/evidence-pipeline.test.ts that concern export-evidence output directories; and the section of docs/verification/hardening-b-build-log.md this commit adds.
The commit message and the build log are claims. Do the review items from the code and your own runs before you read them, and state when you read them.

REVIEW ITEMS (PASS only if all pass)
1. The change: whether an existing explicit --output is replaced only when every entry is a regular file named README.txt, manifest.json or ledger-sanitized.json; whether a directory, a symbolic link, or any other entry type with one of those names is refused with output_not_empty in both the JSON and the text form; whether the refusal leaves the output directory and everything in it untouched; whether the --session path, the staging, the renames and the restore are byte-identical to 0a80144047b64fffdc684d437b49adbe5f0fac9f; and whether any other behavior of the command changed.
2. The tests: whether the refusal test covers a directory named README.txt and a symbolic link named manifest.json, each in its own fixture, asserting exit code 1, the output_not_empty JSON result, the unchanged listing, the entry types by lstat, the unchanged content and the unchanged parent; whether it fails against the code at 0a80144047b64fffdc684d437b49adbe5f0fac9f; and whether the replacement test exports twice to one explicit --output, asserts exactly the three package files and an unchanged parent, and fails under a guard that refuses every non-empty explicit output.
3. Scope: git diff --name-only 0a80144047b64fffdc684d437b49adbe5f0fac9f HEAD lists exactly the three paths of R4; git diff --name-only 68959cf27ee2652d4f9c3287cec4a5ee03798a7a HEAD lists only paths of DEC-20261102-02 B2 item 2; bun.lock and every manifest are byte-identical to the binding base; the commit is authored by daley40-lab and ends with Role-Id builder, Actor-Id session:claude-code/hardening-b-r1 and Execution-Surface claude-code.
4. The build log: whether the new section records the defect, the change, the failing run, the break, each command with its exit status and log SHA-256, and whether its counts match your own runs where they overlap.
5. You reproduce the gates, the breaks and the probes, and try to defeat the tests, as WHAT YOU MUST EXECUTE says.

THE TEST RUNTIME
The macOS certification runtime is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Report command -v bun, its SHA-256, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Change no host setting and install nothing outside a disposable copy.

TEST OUTPUT AND QUOTES
Your log folder is /Users/michaeldaley/builds/review-pr213-r2-logs/. Create it and write every log there and nowhere else. Pipe every test run, probe and quoted command through tee into its own log file, and report each log's SHA-256. Do not truncate, compress or encode a log. Quote output only from its log, naming the log. Do not state a hash, name, line number or value you did not copy from a log or a file you read in this clone. Seed only synthetic values; run every probe that seeds a variable under env -i with only HOME, PATH set to /Users/michaeldaley/.bun/bin:/usr/bin:/bin, and the synthetic variables you choose. If a run's output contains, or would contain, a real token, credential or key, stop at once: do not open, quote, hash or copy that log, and report only its path and the test.

THE LOAD
Record uptime before every test run. Do not pause for the load and do not ask the Founder about it. If a test fails unexpectedly in a run whose first load average was 2.0 or more, do not rerun it: report it verbatim with that reading and mark the item it bears on INCONCLUSIVE, not FAIL, unless you can show the failure does not depend on load. The intended failures of a deliberate break are not such a failure.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
If you cannot run Bun in this clone or a disposable copy, return INCONCLUSIVE, name the checks you could not run, and stop.
- bun install --frozen-lockfile, then record uname -srm and id -un. Restoring the mode of packages/founder-act/src/main.ts is not a finding; any other tracked change is.
- The gates at the head, each once, one at a time, in the foreground: bunx tsc --noEmit; bun test test/phase3a/evidence-pipeline.test.ts; bun test test/phase3a; bun test apps/madbridge; the runtime check again; bare bun test; git diff --check 68959cf27ee2652d4f9c3287cec4a5ee03798a7a; git diff --name-only 0a80144047b64fffdc684d437b49adbe5f0fac9f; git diff --name-only 68959cf27ee2652d4f9c3287cec4a5ee03798a7a. Do not rerun a failed command.
- At least four deliberate breaks, each made, shown with git diff before the run, run over the whole of test/phase3a/evidence-pipeline.test.ts with no -t filter, reported with which tests fail or that none does, restored, and confirmed by the restored file's SHA-256 equal to the head's: export-evidence.ts restored to its text at 0a80144047b64fffdc684d437b49adbe5f0fac9f; the guard rejecting directories but accepting symbolic links; the guard refusing every non-empty explicit output; and one break of your own choosing.
- Probes of your own, in a scratch copy outside the clone, with synthetic values only, each with an explicit --output: one holding a directory named README.txt with a synthetic file inside; one holding a symbolic link named manifest.json to a synthetic file outside it; one holding a special file, such as a FIFO made with mkfifo, named ledger-sanitized.json; and one holding only an earlier package. For each, report the exit code, the output, and what is on disk afterward.
- Try to defeat the tests: find a change to export-evidence.ts that lets a non-file entry with a package name be removed, or that refuses an output holding only an earlier package, while every test at the head still passes. Report each attempt and its result.
Keep every probe and scratch file outside the repository, and leave the clone as you found it.

KNOWN ITEMS ALREADY RULED (assess, do not relitigate)
- Round 1 at 0a80144047b64fffdc684d437b49adbe5f0fac9f was a PASS with four advisory findings, already recorded: no test injects a failure between the two renames; no test of staging cleanup on an exception; the non-JSON error branches are untested; and sequence is not asserted in ledger-sanitized.json. Raise them again only if this commit changes them.
- The rulings R1 to R4 above.
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
- Write the complete final report, every section below in order, to /Users/michaeldaley/builds/review-pr213-r2.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: reviewer id antigravity, the SHA you reviewed, the SHA in your checkout, harness and model as shown, every active workspace as shown, the host, that you did not author or direct the work, and when you read the commit message and the build log.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS, FAIL or INCONCLUSIVE line for each of items 1 to 5 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with counts, exit codes and the uptime before each test run, any re-read of this prompt after a compaction, and what you only read.
5. The breaks, the probes and the attempts to defeat the tests, each with its result.
6. Every log in your log folder, by file name and SHA-256.
7. Anything you could not run or verify, and why.
8. Disagreements between this prompt and the acts, or the word none.
