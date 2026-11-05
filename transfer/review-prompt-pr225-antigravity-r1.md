STEP: Tier-2 review of plan Task 58, pull request 225. Paste this as the first message of a new Antigravity session running a Gemini 4 model on the Founder's MacBook, opened from the fresh clone /Users/michaeldaley/builds/madventures-tui-review-pr225-r1, detached at b40223570e9483559068fd6d2739e83203ccb4be. A read-only copy of this prompt is in /Users/michaeldaley/builds/review-pr225-r1-prompt/, with the signed texts that are not yet on main and the pull request's description.

You are the independent Tier-2 reviewer of plan Task 58 in MADVenturesLLC/madventures-tui, under DEC-20261104-02 B9 and B11 item 1 as its Addenda 1 to 3 amend them: the two host certification reports, one for the MacBook and one for the Ubuntu PC, and the six tests that check them. You check the head against both hosts' logs.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: antigravity
FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, and every active workspace. This harness may also attach /Users/michaeldaley and /Users/michaeldaley/MADVenturesOPs and start its commands in /Users/michaeldaley; that is expected. Begin every command with cd /Users/michaeldaley/builds/madventures-tui-review-pr225-r1 && and run it from there. Run pwd and git rev-parse HEAD that way; they are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini 4 model, /Users/michaeldaley/builds/madventures-tui-review-pr225-r1 is not an active workspace, pwd does not print that path, or HEAD is not b40223570e9483559068fd6d2739e83203ccb4be.
The workspaces /Users/michaeldaley and /Users/michaeldaley/MADVenturesOPs are outside this review: read nothing in them other than what this prompt names. Their AGENTS.md files do not apply; this prompt governs, and the AGENTS.md of the review clone is part of the repository you review.
You did not write, plan or direct any part of this work, and this session has seen no material of this build before this message. If either is untrue, stop and say so. Do not invent a session id, an actor id or a model id.
Read only these folders outside the clone, and only the files named: the prompt folder above; the three evidence folders of THE EVIDENCE; and the log and scratch folders of TEST OUTPUT AND QUOTES. Do not read any other clone of this repository, including every repo/ folder inside an evidence folder, /Users/michaeldaley/builds/madventures-tui-m26-task58-r1 and every other clone under /Users/michaeldaley/builds; the folder /Users/michaeldaley/builds/m26-task58-r1-pr or any other build folder; any earlier review report, prompt folder or log folder; anything under /private/tmp or /tmp that you did not create; any harness transcript; or any memory or notes of any tool. Read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine, ~/.codex, ~/.codex-governed, ~/.claude, ~/.claude-madventures-v5, ~/.gemini or ~/.hermes. Use no MCP server, start no other agent, and run no command that prints an environment variable, a token or a key, or lists processes. Never run /Users/michaeldaley/bun-displaced-1.4.4.

IF THE HARNESS COMPACTS THIS SESSION
Before your next step: run shasum -a 256 on /Users/michaeldaley/builds/review-pr225-r1-prompt/review-prompt-pr225-antigravity-r1.md with the command prefix above and log the output; it must equal the value in SHA256.txt in that folder; read that file in full; and continue from the step your logs show you last completed. If the value differs or the file is missing, stop and report. Record each re-read in report section 4.

TARGET
Pull request 225, draft, branch build/m26-task58-r1.
Head under review: b40223570e9483559068fd6d2739e83203ccb4be. Its parent is the candidate commit ffcecaf9dbb6b2de3b406e475825137ddfe726b7, the merge of pull request 224, fixed under DEC-20261104-02 B5.
Verify that git rev-list ffcecaf9dbb6b2de3b406e475825137ddfe726b7..HEAD lists exactly that one commit, that it is not a merge, and that git status is empty, before you read anything else. If any differs, stop and report.

AUTHORITY
Run git fetch origin main first. Read in full, before the reports:
1. From origin/main, docs/decisions/DEC-20261104-02-hardening-f-and-task58.md, SHA-256 011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5: Parts A and B, above all B5, B7, B8, B9, B10, B11 item 1 and B12.
2. From the prompt folder, Addenda 1, 2 and 3 to DEC-20261104-02: DEC-20261104-02-addendum-1-grace-interval.md, SHA-256 eb5bee7bf4c0c6564b0653ab89029fa32a1c7adc2566137ccf8a92835c965723; DEC-20261104-02-addendum-2-fact-arrival-times.md, SHA-256 74ef54bc717567793eaee09bfddd059d1eca27db04e387cd325f67df93ae86e0; DEC-20261104-02-addendum-3-certification-runs.md, SHA-256 c5b10f2e170b39b6eab8b55bd87208e34ab7dd47480eefdb4292546d84757f48. Each is signed and in force but not yet on main.
3. From the prompt folder, DEC-20261105-01-hardening-f-records-and-addenda.md, SHA-256 06fa9a6afe767e32e0c2bbfacd134bb3f361c438b06df5d3c7ab7e4528182e8b: B2 and B4. It is signed and in force but not yet on main.
4. From origin/main, docs/decisions/DEC-20261013-04-imac-out-of-scope.md, SHA-256 2dd2ebd0715c8c6f70e963b5a6698a4bf4f71d5505021db18c490625bfe2d88f: B1, B2 and B4.
5. From origin/main, docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7: B2 and B4.
6. From origin/main, docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5, Part B, which binds how you work.
7. From origin/main, the plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2: Task 58, sections 8.2 to 8.9, 11.3 and 12.
8. From origin/main, the spec, docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md, SHA-256 a6af30015f743740794d89e12cfc2af07433ead70433b739725c2728a89fc69d: sections 1.5, 6.5, 6.8 and 9.8.
If any text is missing or has another SHA-256, stop and report.
Where this prompt and the acts disagree, the acts win and you report the disagreement. You make no GitHub call, so report any cross-check against GitHub as not run.

THE EVIDENCE (read-only)
Before you use a folder, check its MANIFEST.sha256 against the SHA-256 given here, run shasum -a 256 -c on it from its logs/ folder, and confirm that every file in logs/ is listed. Log each check. If any check fails, stop and report. Read only the files named; never a repo/ folder.
- E1, the MacBook's certification run of DEC-20261104-02 B7: /Users/michaeldaley/builds/task58-cert-macbook, MANIFEST.sha256 with SHA-256 5f84892110eaaf87cae97c629800c86b74b0220b59a68331650bca9399f0d3bc; its logs/, SUMMARY.txt and exits.txt.
- E2, the Ubuntu PC's certification run of B7, as the Founder's command of B8 copied it to the MacBook: /Users/michaeldaley/builds/task58-cert-ubuntu, MANIFEST.sha256 with SHA-256 46dc20d0cd9282c8e15ab3034a83f0abe169c42afa369caa33863786dd83a791; its logs/, SUMMARY.txt and exits.txt.
- E3, the Founder's run of B10 on the MacBook at this head: /Users/michaeldaley/builds/task58-b10-macbook, MANIFEST.sha256 with SHA-256 334e5993d01ec44c5a2f61dbb800c66649e7c51992c7ec84ca1508a0c0ccfaf3; its logs/. Its logs do not print the commit; the Founder's command checked out b40223570e9483559068fd6d2739e83203ccb4be before its commands, and that is the Founder's evidence.
The Founder's setup command for this review confirmed that Verify, Verify (macOS) and code-review succeeded at this head. Under B7 item 2, that Verify run is the expiry guard that the Ubuntu PC's run depends on. This is the Founder's evidence, which you cannot reproduce.

PACKET (read every item)
1. The texts above.
2. The diff from ffcecaf9dbb6b2de3b406e475825137ddfe726b7 to the head, and the commit's message.
3. At the head, with line numbers: both reports in full, and test/phase3a/evidence-pipeline.test.ts from the start of the six tests' helpers to its end.
4. From the prompt folder, pr-225-description.md, the pull request's description. It lists the builder's readings of the report form.
The commit message and the description are claims. Do review items 1 to 3 from the reports and the evidence before you read the description, and state when you read it.

REVIEW ITEMS (PASS only if all pass)
1. Every value from its host's logs (B9 item 2): whether each value in each report is in that host's evidence, copied exactly. This covers the header lines, every labeled line of sections 1 to 4, every quoted block, every row of section 5's table with its command, exit status and counts, every line and Observed cell of section 6, every statement of fact in section 7, and every log name and SHA-256 in section 8. A quoted block must appear byte for byte, as contiguous lines, in the log it names. Check by scripts of your own, keep each script in your scratch folder, and say which parts you checked by script and which by reading. List every value you cannot find in that host's evidence, with the report's line.
2. One host per report (B9 item 2; plan Task 58 Step 3): whether either report carries a value from the other host's evidence.
3. Form and pass criteria (plan §8.7, §8.8 and §8.3 step 8; spec §9.8; Addendum 1 B4; Addendum 3 B1 and B5): the eight field groups of §8.7 in order; the Report SHA-256 computed as §8.3 step 8 says; and, from each report's own values, every pass criterion of §8.8 as the acts read it, with each §8.5 measurement given as its log prints it and within its §9.8 bound.
4. The six tests (B9 item 2; plan Task 58 Steps 1 and 6): their names; whether each asserts on both reports; whether each fails on a report that shows the defect its name states; whether a report change can leave all six passing while a report lacks what one test's name says it records; that they read nothing but the two reports; and that no operating-system or host-identity branch was added.
5. Scope and attribution (B9 items 3 and 4): exactly the three paths; one commit; the subject docs(verification): publish two-host Phase 3A certification reports; author daley40-lab; the message ending with Role-Id builder, Actor-Id session:claude-code/m26-task58-r1 and Execution-Surface claude-code, with no line after them.
6. Steps 4 and 5 (B9 item 2; B10): whether E3's logs show the focused test file passing with the six tests named, the bare bun test passing, and bunx tsc --noEmit exiting 0 with no output; and what the description claims for the Ubuntu PC's runs of Steps 4 and 5, whose logs you do not have.
7. The builder's readings: assess each reading the description lists against the acts. A reading the acts do not support is a finding.
8. You run the gates and the mutations, and look for a misreported value, as WHAT YOU MUST EXECUTE says.

THE TEST RUNTIME
The macOS certification runtime is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Report command -v bun, its SHA-256, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Change no host setting and install nothing outside a disposable copy.

TEST OUTPUT AND QUOTES
Your log folder is /Users/michaeldaley/builds/review-pr225-r1-logs/ and your scratch folder is /Users/michaeldaley/builds/review-pr225-r1-scratch/. Create both. Write every log in the log folder and every script and scratch file in the scratch folder, and nowhere else. Pipe every test run, check and script through tee into its own log file, and report each log's SHA-256. Do not truncate, compress or encode a log. Quote output only from its log, naming the log, and copy every quote byte for byte. Do not state a hash, name, line number or value you did not copy from a log or a file you read. Seed only synthetic values. If a run's output contains, or would contain, a real token, credential or key, stop at once: do not open, quote, hash or copy that log, and report only its path and the test.

THE LOAD
Record uptime before every test run. Do not pause for the load and do not ask the Founder about it. If a test fails unexpectedly in a run whose first load average was 2.0 or more, do not rerun it: report it verbatim with that reading and mark the item it bears on INCONCLUSIVE, not FAIL, unless you can show the failure does not depend on load. The intended failures of a deliberate mutation are not such a failure.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
If you cannot run Bun in this clone, return INCONCLUSIVE, name the checks you could not run, and stop.
- The evidence checks of THE EVIDENCE.
- bun install --frozen-lockfile, then record uname -srm and id -un. Restoring the mode of packages/founder-act/src/main.ts is not a finding; any other tracked change is.
- The gates at the head, each once, one at a time, in the foreground: the runtime check; bunx tsc --noEmit; bun test test/phase3a/evidence-pipeline.test.ts; the runtime check again; bare bun test; git diff --check ffcecaf9dbb6b2de3b406e475825137ddfe726b7; git diff --name-only ffcecaf9dbb6b2de3b406e475825137ddfe726b7; and, for each report, the computation of plan §8.3 step 8. Do not rerun a failed command.
- Your cross-checks of items 1 and 2, as scripts in your scratch folder, each run through tee into its own log.
- At least six deliberate mutations, at least one for each of the six tests, each a change to one report in the clone that shows the defect the test's name states. Show each with git diff before the run, run bun test test/phase3a/evidence-pipeline.test.ts with no -t filter, report which tests fail or that none does, restore the report, and confirm the restored file's SHA-256 equals the head's.
- Look for a report change that leaves all six tests passing while a report lacks what one test's name says it records. Report each attempt and its result, then restore and confirm as above.
Leave the clone as you found it.

KNOWN ITEMS ALREADY RULED (assess, do not relitigate)
- Two certification hosts and two reports; every reference to three hosts or "all three" is read as two and "both" (DEC-20261013-04 B2 and B4; DEC-20261104-02 B9 item 2).
- The certification runtime is Bun 1.4.2 on macOS and the custodied build on Linux, whose bun --version is 1.4.1 (DEC-20261013-03 B2; DEC-20261104-02 B7 item 1). Plan §8.8's "Bun 1.4.2 on every host" is read under that.
- The whitespace check of §8.3 step 2 and its 17 errors (Addendum 3 B1 and B5).
- The printed timings and their limitation (Addenda 1 and 2).
- bun install sets the executable bit on packages/founder-act/src/main.ts; restoring it with git checkout and recording it is not a finding.
- The load is recorded and never waited on (DEC-20261104-02 B7 item 6).

BOUNDARIES
You are read-only toward GitHub and the repository. Make no GitHub call of any kind; git fetch is the only network command you run, apart from the downloads of bun install. Edit no file you leave behind. The Founder posts the verdict.

HOW TO CLASSIFY EVERY FINDING
Number each finding. Give file and line, the ruling it breaches, a concrete failing input or scenario, the item it belongs to, and one of:
- SUBSTANTIVE: a breach of a ruling, a path outside scope, a value not in its host's evidence, or behavior you can show is wrong.
- ADVISORY: an improvement the acts do not require.
- NOT COUNTING: a point plan section 11.3 lists as not counting. Quote the line.
Classify every mutation that no test catches and every attempt of the last executed item that succeeds. A SUBSTANTIVE finding means FAIL; the Founder rules how it counts. Do not inflate an advisory, and do not downgrade a real defect.

HOW TO WORK AND DELIVER
- Work through to the end without waiting for guidance. The Founder answers only permission prompts and will not send corrections. If you cannot complete a required item, the verdict is INCONCLUSIVE for that reason.
- For every command, quote the last printed lines verbatim from its log, including pass, fail and file counts and the exit code. For every mutation and attempt, give the change as code and the output verbatim from its log.
- Write the complete final report, every section below in order, to /Users/michaeldaley/builds/review-pr225-r1.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: reviewer id antigravity, the SHA you reviewed, the SHA in your checkout, harness and model as shown, every active workspace as shown, the host, that you did not author or direct the work, and when you read the commit message and the description.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS, FAIL or INCONCLUSIVE line for each of items 1 to 8 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with counts, exit codes and the uptime before each test run, any re-read of this prompt after a compaction, and what you only read.
5. The cross-checks of items 1 and 2: what each script checked, how many values it checked per report, and every value it could not find.
6. The mutations and the attempts, each with its result.
7. Every log in your log folder and every script in your scratch folder, by file name and SHA-256.
8. Anything you could not run or verify, and why.
9. Disagreements between this prompt and the acts, or the word none.
