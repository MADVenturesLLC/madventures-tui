STEP: Tier-2 review of Hardening D, pull request 217. Paste this as the first message of a new Antigravity session running a Gemini 4 model on the Founder's MacBook, opened from the fresh clone /Users/michaeldaley/builds/madventures-tui-review-pr217-r1, detached at de72c2e18a437301a081253376c6ad36d55ce87f. A read-only copy of this prompt is in /Users/michaeldaley/builds/review-pr217-r1-prompt/.

You are the independent Tier-2 reviewer of Hardening D of DEC-20261103-01 B6, in MADVenturesLLC/madventures-tui: the Linux oracle of the environment-forwarding test, the ordering of the refused-input test, the acknowledgement-deadline test, and the lifeline-EOF timer of the PTY host.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: antigravity
FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, and every active workspace. This harness may also attach /Users/michaeldaley and /Users/michaeldaley/MADVenturesOPs and start its commands in /Users/michaeldaley; that is expected. Begin every command with cd /Users/michaeldaley/builds/madventures-tui-review-pr217-r1 && and run it from there. Run pwd and git rev-parse HEAD that way; they are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini 4 model, /Users/michaeldaley/builds/madventures-tui-review-pr217-r1 is not an active workspace, pwd does not print that path, or HEAD is not de72c2e18a437301a081253376c6ad36d55ce87f.
The workspaces /Users/michaeldaley and /Users/michaeldaley/MADVenturesOPs are outside this review: read nothing in them other than what this prompt names. Their AGENTS.md files do not apply; this prompt governs, and the AGENTS.md of the review clone is part of the repository you review.
You did not write, plan or direct any part of this work, and this session has seen no material of this build before this message. If either is untrue, stop and say so. Do not invent a session id, an actor id or a model id.
Do not read any other clone of this repository, including /Users/michaeldaley/builds/madventures-tui-hardening-d-r1 and every other clone under /Users/michaeldaley/builds; the folder /Users/michaeldaley/builds/hardening-d-r1-pr and every other build folder; any earlier review report, prompt folder or log folder under /Users/michaeldaley/builds; any harness transcript; or any memory or notes of any tool. Read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine, ~/.codex, ~/.codex-governed, ~/.claude, ~/.claude-madventures-v5, ~/.gemini or ~/.hermes, other than the prompt folder named above. Use no MCP server, start no other agent, and run no command that prints an environment variable, a token or a key, or lists processes. Never run /Users/michaeldaley/bun-displaced-1.4.4.

IF THE HARNESS COMPACTS THIS SESSION
Before your next step: run shasum -a 256 on /Users/michaeldaley/builds/review-pr217-r1-prompt/review-prompt-pr217-antigravity-r1.md with the command prefix above and log the output; it must equal the value in SHA256.txt in that folder; read that file in full; and continue from the step your logs show you last completed. If the value differs or the file is missing, stop and report. Record each re-read in report section 4.

TARGET
Pull request 217, draft, branch build/hardening-d-r1.
Head under review: de72c2e18a437301a081253376c6ad36d55ce87f, four commits:
  8b4d10475b4d7dcc295357757f9dd1dcfeeea836 item 1, the environment-forwarding test's Linux oracle and spec section 1.5 row 4
  2abb5fa1db17a2ce8f75597e25366a1e754158b2 item 2, the ordering of the refused-input test
  6afeab9e9706e386e40c9d8c807e00098a46d89a item 3, the acknowledgement-deadline test
  de72c2e18a437301a081253376c6ad36d55ce87f item 4, the lifeline-EOF timer
Binding base: 6010de734d82ddebfc68ba0d75c8d4b65ec0e095, the merge of pull request 216, which filed DEC-20261103-01.
Verify that git rev-list --reverse 6010de734d82ddebfc68ba0d75c8d4b65ec0e095..HEAD lists exactly those four commits in that order with no merge, and that git status is empty, before you read anything else. If either differs, stop and report.

AUTHORITY
Run git fetch origin main first. Read in full, before the code, from origin/main:
1. docs/decisions/DEC-20261103-01-hardening-c-records-and-hardening-d.md, SHA-256 43dc423e060b0e7ae04a0e7a0c302a5e38497cc212d704a5a37421d78aa1dd3a: A2 items 1 and 4, A4, B2, B4, B5, B6 and Part D.
2. docs/decisions/DEC-20261102-02-hardening-builds.md, SHA-256 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550: B3 and B4, which DEC-20261103-01 B6 applies.
3. docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5, Part B, which binds how you work.
4. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7, for test 4.
5. The plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2, section 11.3, and the spec, docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md, SHA-256 c09fe4849a4a61bf3e1494b77267020e00bd1d7b3015e3b2332ec5d71b07f769 on origin/main, sections 1.5 and 9.8.
If any text is missing or has another SHA-256, stop and report.
The Founder's standing rulings that bound the builder:
R1. bun install sets the executable bit on packages/founder-act/src/main.ts; restoring it with git checkout and recording it is not a finding.
R2. The load halt applies only when a test fails unexpectedly in a run whose first load average was 2.0 or more; the intended failures of a deliberate break or of a run against the code before a change are not a halt.
Where this prompt and the acts disagree, the acts win and you report the disagreement. You make no GitHub call, so report any cross-check against GitHub as not run.

THE FOUNDER'S HUNT (DEC-20261103-01 B6 item 7, quoted verbatim)
On the Ubuntu PC, at this head, under the custodied Linux runtime, the Founder ran the full suite and test:phase3a five times each. Its summary:
host: Linux 7.0.0-42-generic x86_64; bun: /home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun 1.4.1 revision 69cb78c9097cebd3bdb832d9fff8b7d23abce09e sha256 0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb
clone at de72c2e18a437301a081253376c6ad36d55ce87f
run 1 full exit=0:  1898 pass  0 fail | load 0.01, 0.02, 0.00
run 1 phase3a exit=0:  152 pass  0 fail | load 0.53, 0.17, 0.05
run 2 full exit=0:  1898 pass  0 fail | load 0.44, 0.18, 0.06
run 2 phase3a exit=0:  152 pass  0 fail | load 0.20, 0.21, 0.09
run 3 full exit=0:  1898 pass  0 fail | load 0.49, 0.29, 0.12
run 3 phase3a exit=0:  152 pass  0 fail | load 0.21, 0.24, 0.12
run 4 full exit=0:  1898 pass  0 fail | load 0.35, 0.28, 0.13
run 4 phase3a exit=0:  152 pass  0 fail | load 0.26, 0.25, 0.14
run 5 full exit=0:  1898 pass  0 fail | load 0.43, 0.30, 0.16
run 5 phase3a exit=0:  152 pass  0 fail | load 0.55, 0.36, 0.20
TREE CLEAN AFTER RUNS
This is the Founder's evidence for the Linux branch, which this MacBook cannot run. It is not a substitute for your own runs.

PACKET (read every item)
1. The texts above.
2. The diff from the binding base to the head, and each commit's own diff.
3. At the head, with line numbers, every changed file, including docs/verification/hardening-d-build-log.md; the drained report and the code around packages/pty-host/src/main.ts lines 479 to 490 and 662; HOST_DEADLINES_MS; the acknowledgement window of escalateWedgedHost in packages/broker/src/pty-host-supervisor.ts; and the fixture the refused-input test drives. At the base, the same code and spec section 1.5 row 4.
The commit messages and the build log are claims. Do the review items from the code and your own runs before you read them, and state when you read them.

REVIEW ITEMS (PASS only if all pass)
1. Item 1, test 4 (B6 item 2): whether the Linux branch's new oracle gives exactly the key set of the child's environment when its standard output is a terminal, under a POSIX cut, and emits variable names only, never a value; whether it starts no shell; whether reading the key list when the host reports drained, rather than at a marker, can miss or truncate any output of the child; whether every assertion and timeout of the test and its macOS branch are as at the base; and whether spec section 1.5 row 4 now names the new oracle exactly and no other byte of the spec changed.
2. Item 2, the ordering (B6 item 3): whether the test now reads until both the echo of the accepted input and the accepted resize report have arrived, within its existing timeout; whether every assertion that nothing refused reaches the child is kept; and whether it fails when output arrives in the order that broke it at the base.
3. Item 3, the deadline test (B6 item 4): whether it forces at least two consecutive early firings of the acknowledgement timer; whether it measures elapsed time itself, from just before the call to the classification; whether the further test shows that when the host acknowledges after an early firing no acknowledgement timer remains live; whether the tests fail under a re-arm that happens only once and under a re-armed timer left uncleared; and whether any production file changed for this item.
4. Item 4, the lifeline-EOF timer (B6 item 5): whether the timer at packages/pty-host/src/main.ts line 662 now ends its wait only once the monotonic clock has reached HOST_DEADLINES_MS.outerBound after it was armed, a timer that fires earlier waiting out the remainder; whether nothing else in the file changed; whether the new test under packages/pty-host/test/ fails against the code at the base; and whether its replacement of the global setTimeout is restored on every path and can affect no other test.
5. Scope (B6 item 6): the changed paths against B6 item 6; the only production change in packages/pty-host/src/main.ts and only that timer; the spec changed only in section 1.5 row 4; bun.lock and every manifest byte-identical to the base; all four commits authored by daley40-lab and ending with Role-Id builder, Actor-Id session:claude-code/hardening-d-r1 and Execution-Surface claude-code.
6. The build log: a section per item with the fields DEC-20261102-02 B4 requires, and whether its statements and counts match the commits and your own runs where they overlap.
7. You reproduce the final gates, the breaks and the probes, and try to defeat the tests, as WHAT YOU MUST EXECUTE says.

THE TEST RUNTIME
The macOS certification runtime is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Report command -v bun, its SHA-256, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Change no host setting and install nothing outside a disposable copy.

TEST OUTPUT AND QUOTES
Your log folder is /Users/michaeldaley/builds/review-pr217-r1-logs/. Create it and write every log there and nowhere else. Pipe every test run, probe and quoted command through tee into its own log file, and report each log's SHA-256. Do not truncate, compress or encode a log. Quote output only from its log, naming the log. Do not state a hash, name, line number or value you did not copy from a log or a file you read in this clone. Seed only synthetic values; run every probe that seeds a variable under env -i with only HOME, PATH set to /Users/michaeldaley/.bun/bin:/usr/bin:/bin, and the synthetic variables you choose. If a run's output contains, or would contain, a real token, credential or key, stop at once: do not open, quote, hash or copy that log, and report only its path and the test.

THE LOAD
Record uptime before every test run. Do not pause for the load and do not ask the Founder about it. If a test fails unexpectedly in a run whose first load average was 2.0 or more, do not rerun it: report it verbatim with that reading and mark the item it bears on INCONCLUSIVE, not FAIL, unless you can show the failure does not depend on load. The intended failures of a deliberate break are not such a failure.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
If you cannot run Bun in this clone or a disposable copy, return INCONCLUSIVE, name the checks you could not run, and stop.
- bun install --frozen-lockfile, then record uname -srm and id -un. Restoring the mode of packages/founder-act/src/main.ts is not a finding; any other tracked change is.
- The final gates at the head, each once, one at a time, in the foreground: bunx tsc --noEmit; bun test packages/broker; bun test packages/pty-host; test/phase3a/harness-lifecycle.test.ts twenty times in a row; bun test test/phase3a; the runtime check again; bare bun test; git diff --check 6010de734d82ddebfc68ba0d75c8d4b65ec0e095; git diff --name-only 6010de734d82ddebfc68ba0d75c8d4b65ec0e095. Do not rerun a failed command.
- At least seven deliberate breaks, each made, shown with git diff before the run, run over the whole of each affected test file with no -t filter, reported with which tests fail or that none does, restored, and confirmed by the restored file's SHA-256 equal to the head's: packages/pty-host/src/main.ts restored to its text at the base; the lifeline-EOF wait ended 5 ms before outerBound; the acknowledgement timer in packages/broker/src/pty-host-supervisor.ts re-armed only once; the re-armed acknowledgement timer left uncleared; a synthetic key added to the governed child's environment, run on this host's macOS branch; the refused-input fixture made to send the resize report before the echo; and a refused pty_input let through to the child.
- Probes of your own, in a scratch copy outside the clone, with synthetic values only: run packages/broker/test/acknowledgement-deadline.test.ts and packages/pty-host/test/eof-timer-early-fire.test.ts five times each and report the elapsed times they print or assert; and on this host, run the macOS branch of the environment-forwarding test with a child whose environment holds a synthetic key whose value contains an equals sign and a newline, and report the key set it sees.
- Try to defeat the tests: find a change to production or to a fixture that ends the lifeline-EOF wait or the acknowledgement window early, lets a refused input reach the child, or lets the environment oracle miss or add a key, while every test at the head still passes. Report each attempt and its result.
Keep every probe and scratch file outside the repository, and leave the clone as you found it.

KNOWN ITEMS ALREADY RULED (assess, do not relitigate)
- The verdicts, carried findings and limitations that DEC-20261103-01 rules on, and the items DEC-20261102-01 leaves to Phase 3B or to stated limitations, are not findings here unless this pull request changes them.
- The rulings R1 and R2 above.
- That this MacBook does not run the Linux branch of any test is a stated limitation; Verify and code-review on ubuntu-24.04 and the Founder's hunt above run it. Review the Linux branch by reading it and by reasoning, and say which of your conclusions rest only on reading.
- At this head, the first run of Verify on ubuntu-24.04 failed one test outside this pull request, "closing host A's stdin does not affect host B" in test/phase3a/adversarial/descriptor-hygiene.test.ts, at test/phase3a/runtime-harness.ts line 490 with "JSON Parse error: Unexpected EOF"; its one re-run passed. Neither file is part of this review. If that test fails in one of your runs, report the failure verbatim, run nothing again to obtain a pass, and do not count it against this pull request; any other failure in that run still counts.

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
- Write the complete final report, every section below in order, to /Users/michaeldaley/builds/review-pr217-r1.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: reviewer id antigravity, the SHA you reviewed, the SHA in your checkout, harness and model as shown, every active workspace as shown, the host, that you did not author or direct the work, and when you read the commit messages and the build log.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS, FAIL or INCONCLUSIVE line for each of items 1 to 7 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with counts, exit codes and the uptime before each test run, any re-read of this prompt after a compaction, and what you only read.
5. The breaks, the probes and the attempts to defeat the tests, each with its result.
6. Every log in your log folder, by file name and SHA-256.
7. Anything you could not run or verify, and why.
8. Disagreements between this prompt and the acts, or the word none.
