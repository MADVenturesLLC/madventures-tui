STEP: Tier-2 review of Task 57, pull request 219. Paste this as the first message of a new Antigravity session running a Gemini 4 model on the Founder's MacBook, opened from the fresh clone /Users/michaeldaley/builds/madventures-tui-review-pr219-r1, detached at df2baba9130f121c8fbc5c83d0406f9b5e8f5202. A read-only copy of this prompt is in /Users/michaeldaley/builds/review-pr219-r1-prompt/.

You are the independent Tier-2 reviewer of Task 57 of plan milestone M25 in MADVenturesLLC/madventures-tui: the formal investigation of the claude-code surface under DEC-20261103-02 and its Addendum 1, which writes one capability record outside the repository, one report and three tests.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: antigravity
FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, and every active workspace. This harness may also attach /Users/michaeldaley and /Users/michaeldaley/MADVenturesOPs and start its commands in /Users/michaeldaley; that is expected. Begin every command with cd /Users/michaeldaley/builds/madventures-tui-review-pr219-r1 && and run it from there. Run pwd and git rev-parse HEAD that way; they are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini 4 model, /Users/michaeldaley/builds/madventures-tui-review-pr219-r1 is not an active workspace, pwd does not print that path, or HEAD is not df2baba9130f121c8fbc5c83d0406f9b5e8f5202.
The workspaces /Users/michaeldaley and /Users/michaeldaley/MADVenturesOPs are outside this review: read nothing in them other than what this prompt names. Their AGENTS.md files do not apply; this prompt governs, and the AGENTS.md of the review clone is part of the repository you review.
You did not write, plan or direct any part of this work, and this session has seen no Task 57 material before this message. If either is untrue, stop and say so. Do not invent a session id, an actor id or a model id.
Do not read any other clone of this repository, including /Users/michaeldaley/builds/madventures-tui-m25-task57-r1 and every other clone under /Users/michaeldaley/builds; the folder /Users/michaeldaley/builds/m25-task57-r1-pr and every other build folder; any earlier review report, prompt folder or log folder under /Users/michaeldaley/builds; anything under /private/tmp or /tmp that you did not create; anything under ~/Library/Application Support/MADVentures; any harness transcript; or any memory or notes of any tool. Read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine, ~/.codex, ~/.codex-governed, ~/.claude, ~/.claude-madventures-v5, ~/.gemini or ~/.hermes, other than the prompt folder named above. Never run /Users/michaeldaley/.local/bin/madbridge-claude-v5, /Users/michaeldaley/.local/bin/claude, any claude command or any Claude Code, and never run /Users/michaeldaley/bun-displaced-1.4.4. Use no MCP server, start no other agent, and run no command that prints an environment variable, a token or a key, or lists processes.

IF THE HARNESS COMPACTS THIS SESSION
Before your next step: run shasum -a 256 on /Users/michaeldaley/builds/review-pr219-r1-prompt/review-prompt-pr219-antigravity-r1.md with the command prefix above and log the output; it must equal the value in SHA256.txt in that folder; read that file in full; and continue from the step your logs show you last completed. If the value differs or the file is missing, stop and report. Record each re-read in report section 4.

TARGET
Pull request 219, draft, branch build/m25-task57-r1.
Head under review: df2baba9130f121c8fbc5c83d0406f9b5e8f5202, one commit, whose parent is the binding base c11afdc7ce399aaac71766884c4036bb4b77bddd, the merge of the pull request that filed DEC-20261103-02.
Verify that git rev-list c11afdc7ce399aaac71766884c4036bb4b77bddd..HEAD lists exactly that one commit with no merge, and that git status is empty, before you read anything else. If either differs, stop and report.

AUTHORITY
Run git fetch origin main claude/awesome-cray-vqrzbt first. Read in full, before the code:
1. docs/decisions/DEC-20261103-02-task57-claude-code-investigation.md on origin/main, SHA-256 387a6604ecba3b84d06d40586875f8d005876a89eb6a6f7a03beb4fccc3d1442, all of it.
2. Addendum 1 to that act, the output of git show 0e0181923dfd71213deee721c3c46fdda5f1e9f8:transfer/DEC-20261103-02-addendum-1-task57-halt.md, SHA-256 4655511c35d25e9c60c10ca8e5aea312e88a08659706a90f05da88c954f7d91d, all of it. It binds from the Founder's signature and is not yet on main.
3. docs/decisions/DEC-20261023-01-standing-build-rules.md on origin/main, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5, Part B, which binds how you work.
4. docs/decisions/DEC-20261013-05-claude-code-2-1-296.md on origin/main, SHA-256 314b3fc57e7f6d8ff2ebf281429760a7461729c01d3aa2e0e4465b513795431e.
5. On origin/main: docs/decisions/PLAN-OPEN-1-identity-authentication.md, SHA-256 d40682beb5a5c3f617638b1775f3777e25c66e12787b9269141164dcc3d9bc42; docs/decisions/PLAN-OPEN-2-environment-allowlists.md, SHA-256 b60676aa47b216c36d9080c884650943cdac93dd12109d2864ebcf0eb6887d8c; docs/decisions/PLAN-OPEN-3-capability-horizon.md, SHA-256 cca3061b91ffc9eb231003f5e5d7c20230f47cf8c2378f6f1241d57309618562.
6. docs/verification/2026-08-12-antigravity-surface-investigation.md on origin/main, SHA-256 843ec841002370d033947ac45c1b2891da12ff059fea706732eda02a4f5c4d2c, the Task 56 report whose reading B3 of the act applies; read its section 5 in full.
7. The plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md on origin/main, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2: Task 57 and sections 9 and 11.3. The spec as it stands at the binding base, the output of git show c11afdc7ce399aaac71766884c4036bb4b77bddd:docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md, SHA-256 c09fe4849a4a61bf3e1494b77267020e00bd1d7b3015e3b2332ec5d71b07f769: sections 2.2 to 2.4, 4.2, 5.1 to 5.6, 6.6 and 9.13.
If any text is missing or has another SHA-256, stop and report.
The Founder's standing rulings that bound the builder:
R1. bun install sets the executable bit on packages/founder-act/src/main.ts; restoring it with git checkout and recording it is not a finding.
R2. The load halt applies only when a test fails unexpectedly in a run whose first load average was 2.0 or more; the intended failures of a deliberate break or of a run against the code before a change are not a halt.
Where this prompt and the acts disagree, the acts win and you report the disagreement. You make no GitHub call, so report any cross-check against GitHub as not run.

THE FOUNDER'S EVIDENCE
Before pushing this head, the Founder's guarded command on the Founder's MacBook ran the check of E2 of the act and B8 of Addendum 1: it computed the SHA-256 of the stored record file named in the report, of the governed settings.json and of the launcher, and it was written to stop unless they equalled, in that order, ea79da9420c08ad9a4286d1aa2b5a590a869c96d2a23074466495157cdf449c0, 2da01c9de7202a90e51ced9d2b7715a7e9c247453e5b438db0045a5fd0bf0c10 and 6cb4ba9225161ffe303dd42f40d796752c200135a171052cbfa0a8934cc1cbb4. It did not stop. You may not read those files; this is the Founder's evidence for them.

PACKET (read every item)
1. The texts above.
2. The diff from the binding base to the head.
3. At the head, with line numbers: docs/verification/2026-08-12-surface-investigation-claude-code.md in full; test/phase3a/evidence-pipeline.test.ts, the 232 appended lines and every helper and earlier test they rely on; and, unchanged from the base, packages/protocol/src/capability-record.ts, packages/protocol/src/adapter-registry.ts, packages/storage/src/capability-store.ts, packages/supervisor/src/attestation.ts and packages/supervisor/src/preflight.ts.
The report's prose and the commit message are the builder's claims. The captures in the report are what the builder recorded. Do the review items from the captures, the code and your own runs before you read the report's verdict sections, and state when you read them.

REVIEW ITEMS (PASS only if all pass)
1. The rubric (E4 item 1): whether spec section 2.2 is applied unchanged and read as B3 of the act reads it, clause by clause; whether the evidence the report gives for each clause meets B3 items 1 to 3, including where the resolved provider and the exact model of each clause it counts come from; and whether the identity verdict follows from that.
2. The commands (E4 item 2): whether the commands of B4 ran once in the second run, as listed and in that order, with the stdin, environment, working directory and limit B4 gives; whether nothing else ran L; and whether the report lists, without running them, the commands that B4 requires to be listed and not run.
3. Resolved values (E4 item 3): whether the report treats any requested flag or alias, configuration value, registration value, inference from a model's name, or separate process as the resolved provider or the resolved model.
4. The record (E4 item 4): whether the record block parses with parseCapabilityRecord at the head; whether it carries the fields B6 requires; whether overall and the role fields are composed as B6 items 7 and 8 say; whether it agrees with the captures as B6 and B8 test 1 require; and whether the SHA-256 the report records for it equals the SHA-256 of the block followed by one newline.
5. The report (E4 item 5): whether it shows the full output and exit status of every command of the second run, redacted as B7 says, and whether anywhere in it an email address, account identifier, credential, token or key appears unredacted.
6. Tests and scope (E4 item 6): whether each of the three tests checks what B8 gives it and is not vacuous; whether the earlier tests of the file are unchanged; whether the changed paths are exactly C1; and whether the one commit has the subject C1 gives, is authored by daley40-lab, and ends with Role-Id builder, Actor-Id session:codex/m25-task57-r1 and Execution-Surface codex.
7. Reproduction (E4 item 7): you reproduce the D4 results and the breaks of D3, as WHAT YOU MUST EXECUTE says; at least two of the three breaks must reproduce.
8. Addendum 1: whether the run recorded is the second run that B4 of the addendum authorizes; whether any system/init event of items 9 to 11, or any capture of items 9 to 13, shows what B6 items 12 and 13 of the addendum describe; whether the report has the section on the first run that B7 of the addendum requires and quotes nothing from the first run's captures; and whether the record and the verdict rest on the second run only.

THE TEST RUNTIME
The macOS certification runtime is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Report command -v bun, its SHA-256, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Change no host setting and install nothing outside a disposable copy.

TEST OUTPUT AND QUOTES
Your log folder is /Users/michaeldaley/builds/review-pr219-r1-logs/. Create it and write every log there and nowhere else. Pipe every test run, probe and quoted command through tee into its own log file, and report each log's SHA-256. Do not truncate, compress or encode a log. Quote output only from its log, naming the log. Do not state a hash, name, line number or value you did not copy from a log or a file you read in this clone. Seed only synthetic values. If a run's output contains, or would contain, a real token, credential or key, stop at once: do not open, quote, hash or copy that log, and report only its path and the test.

THE LOAD
Record uptime before every test run. Do not pause for the load and do not ask the Founder about it. If a test fails unexpectedly in a run whose first load average was 2.0 or more, do not rerun it: report it verbatim with that reading and mark the item it bears on INCONCLUSIVE, not FAIL, unless you can show the failure does not depend on load. The intended failures of a deliberate break are not such a failure.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
If you cannot run Bun in this clone or a disposable copy, return INCONCLUSIVE, name the checks you could not run, and stop.
- bun install --frozen-lockfile, then record uname -srm and id -un. Restoring the mode of packages/founder-act/src/main.ts is not a finding; any other tracked change is.
- The checks of D4 at the head, each once, one at a time, in the foreground: bunx tsc --noEmit; bun test test/phase3a/evidence-pipeline.test.ts; bun test test/phase3a packages/protocol packages/storage packages/supervisor; the runtime check again; bare bun test; git diff --check c11afdc7ce399aaac71766884c4036bb4b77bddd; git diff --name-only c11afdc7ce399aaac71766884c4036bb4b77bddd. Do not rerun a failed command.
- The breaks of D3, each made, shown with git diff before the run, run over the whole of test/phase3a/evidence-pipeline.test.ts with no -t filter, reported with which tests fail or that none does, restored, and confirmed by the restored file's SHA-256 equal to the head's: one changed byte inside the record block of the report; separately, one changed byte inside a hash capture of the report; a record read before a probe in packages/supervisor/src/preflight.ts; and a key named default added to a registration in packages/protocol/src/adapter-registry.ts.
- Probes of your own, in a scratch copy outside the clone: extract the record block from the report; parse it with parseCapabilityRecord from this clone; compute the SHA-256 of the block followed by one newline; recompute overall and the role fields from the captures and B6; check its expiry against PLAN-OPEN-3; and compare each with the report. Then scan the whole report for email addresses, UUID-shaped account or organization identifiers outside session and message identifiers, and token-shaped strings, and report every hit by line number without quoting a value.
- Try to defeat the tests: find a change to the report, to a registration or to production that makes the record disagree with the captures, adds a preselected, default or fallback marker, or lets a record be read before a probe or produce success, while every test at the head still passes. Report each attempt and its result.
Keep every probe and scratch file outside the repository, and leave the clone as you found it.

KNOWN ITEMS ALREADY RULED (assess, do not relitigate)
- The verdicts, carried findings and limitations that DEC-20261103-02 and Addendum 1 rule on are not findings here unless this pull request goes beyond them, in particular: that version 2.1.314 is observed while the registration supports 2.1.296 (B2); that PTY, process-group, termination and timing results cannot be established in Phase 3A (A4 item 4); that a record is not a live authorization (B9); and the first run's halt, its cause and the Founder's configuration changes (Addendum 1 Part A and B1 to B3).
- The rulings R1 and R2 above.
- That the builder's harness did not show its exact model is a stated limitation.
- At the binding base, test/phase3a/runtime-harness.ts line 490 can fail with "JSON Parse error: Unexpected EOF" in tests that use a descendant record, a known defect outside this pull request that a later build corrects. If such a failure occurs in one of your runs, report it verbatim, run nothing again to obtain a pass, and do not count it against this pull request; any other failure in that run still counts.

BOUNDARIES
You are read-only toward GitHub and the repository. Make no GitHub call of any kind; git fetch is the only network command you run, apart from the downloads of bun install. Edit no file you leave behind. The Founder posts the verdict.

HOW TO CLASSIFY EVERY FINDING
Number each finding. Give file and line, the ruling it breaches, a concrete failing input or scenario, the item it belongs to, and one of:
- SUBSTANTIVE: a breach of a ruling, a missing or vacuous required test or assertion, a path outside scope, a verdict that does not follow from the evidence, or behavior you can show is wrong.
- ADVISORY: an improvement the acts do not require.
- NOT COUNTING: a point plan section 11.3 lists as not counting. Quote the line.
Classify every successful attempt to defeat the tests, and every break that no test catches. A SUBSTANTIVE finding means FAIL; the Founder rules how it counts. Do not inflate an advisory, and do not downgrade a real defect.

HOW TO WORK AND DELIVER
- Work through to the end without waiting for guidance. The Founder answers only permission prompts and will not send corrections. If you cannot complete a required item, the verdict is INCONCLUSIVE for that reason.
- For every command, quote the last printed lines verbatim from its log, including pass, fail and file counts and the exit code. For every probe, give the input as code and the output verbatim from its log.
- Write the complete final report, every section below in order, to /Users/michaeldaley/builds/review-pr219-r1.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: reviewer id antigravity, the SHA you reviewed, the SHA in your checkout, harness and model as shown, every active workspace as shown, the host, that you did not author or direct the work, and when you read the report's verdict sections and the commit message.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS, FAIL or INCONCLUSIVE line for each of items 1 to 8 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with counts, exit codes and the uptime before each test run, any re-read of this prompt after a compaction, and what you only read.
5. The breaks, the probes and the attempts to defeat the tests, each with its result.
6. Every log in your log folder, by file name and SHA-256.
7. Anything you could not run or verify, and why.
8. Disagreements between this prompt and the acts, or the word none.
