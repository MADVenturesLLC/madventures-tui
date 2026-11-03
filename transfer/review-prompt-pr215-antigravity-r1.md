STEP: Tier-2 review of Hardening C, pull request 215. Paste this as the first message of a new Antigravity session running a Gemini 4 model on the Founder's MacBook, opened from the fresh clone /Users/michaeldaley/builds/madventures-tui-review-pr215-r1, detached at 038b995de6deee7c67df90276c36d9a8fbb3526e. A read-only copy of this prompt is in /Users/michaeldaley/builds/review-pr215-r1-prompt/.

You are the independent Tier-2 reviewer of Hardening C of DEC-20261102-04 B5, in MADVenturesLLC/madventures-tui: the acknowledgement deadline of escalateWedgedHost, and the calibration of the temporary-path recorder in the preflight tests.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: antigravity
FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, and every active workspace. This harness may also attach /Users/michaeldaley and /Users/michaeldaley/MADVenturesOPs and start its commands in /Users/michaeldaley; that is expected. Begin every command with cd /Users/michaeldaley/builds/madventures-tui-review-pr215-r1 && and run it from there. Run pwd and git rev-parse HEAD that way; they are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini 4 model, /Users/michaeldaley/builds/madventures-tui-review-pr215-r1 is not an active workspace, pwd does not print that path, or HEAD is not 038b995de6deee7c67df90276c36d9a8fbb3526e.
The workspaces /Users/michaeldaley and /Users/michaeldaley/MADVenturesOPs are outside this review: read nothing in them other than what this prompt names. Their AGENTS.md files do not apply; this prompt governs, and the AGENTS.md of the review clone is part of the repository you review.
You did not write, plan or direct any part of this work, and this session has seen no material of this build before this message. If either is untrue, stop and say so. Do not invent a session id, an actor id or a model id.
Do not read any other clone of this repository, including /Users/michaeldaley/builds/madventures-tui-hardening-c-r1 and every other clone under /Users/michaeldaley/builds; the folder /Users/michaeldaley/builds/hardening-c-r1-pr and every other build folder; any earlier review report, prompt folder or log folder under /Users/michaeldaley/builds; any harness transcript; or any memory or notes of any tool. Read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine, ~/.codex, ~/.codex-governed, ~/.gemini or ~/.hermes, other than the prompt folder named above. Use no MCP server, start no other agent, and run no command that prints an environment variable, a token or a key, or lists processes. Never run /Users/michaeldaley/bun-displaced-1.4.4.

IF THE HARNESS COMPACTS THIS SESSION
Before your next step: run shasum -a 256 on /Users/michaeldaley/builds/review-pr215-r1-prompt/review-prompt-pr215-antigravity-r1.md with the command prefix above and log the output; it must equal the value in SHA256.txt in that folder; read that file in full; and continue from the step your logs show you last completed. If the value differs or the file is missing, stop and report. Record each re-read in report section 4.

TARGET
Pull request 215, draft, branch build/hardening-c-r1.
Head under review: 038b995de6deee7c67df90276c36d9a8fbb3526e, two commits:
  07e79be01bf8efcbde8cb16575bc0d93180495cd the acknowledgement deadline
  038b995de6deee7c67df90276c36d9a8fbb3526e the watcher calibration
Binding base: 93e7d1c4c16d7951dd3fde23b6516e8b1e5e738b, the merge of pull request 214, which filed DEC-20261102-04.
Verify that git rev-list --reverse 93e7d1c4c16d7951dd3fde23b6516e8b1e5e738b..HEAD lists exactly those two commits in that order with no merge, and that git status is empty, before you read anything else. If either differs, stop and report.

AUTHORITY
Run git fetch origin main first. Read in full, before the code, from origin/main:
1. docs/decisions/DEC-20261102-04-hardening-records-and-hardening-c.md, SHA-256 313bfedb64c0ff1eca5fa65024385bd3fc6400a63b3f616a1994de519fbffab2: A2 item 3, A4, B5 and Part D.
2. docs/decisions/DEC-20261102-02-hardening-builds.md, SHA-256 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550: B3 and B4, which DEC-20261102-04 B5 applies.
3. docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5, Part B, which binds how you work.
4. The plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2, section 11.3, and the spec, docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md, SHA-256 c09fe4849a4a61bf3e1494b77267020e00bd1d7b3015e3b2332ec5d71b07f769, section 9.8.
If any text is missing or has another SHA-256, stop and report.
The Founder's standing rulings that bound the builder:
R1. bun install sets the executable bit on packages/founder-act/src/main.ts; restoring it with git checkout and recording it is not a finding.
R2. The load halt applies only when a test fails unexpectedly in a run whose first load average was 2.0 or more; the intended failures of a deliberate break or of a run against the code before a change are not a halt.
Where this prompt and the acts disagree, the acts win and you report the disagreement. You make no GitHub call, so report any cross-check against GitHub as not run.

PACKET (read every item)
1. The texts above.
2. The diff from the binding base to the head, and each commit's own diff.
3. At the head, with line numbers, every changed file, including docs/verification/hardening-c-build-log.md; escalateWedgedHost and the function that holds its acknowledgement window in packages/broker/src/pty-host-supervisor.ts; and recordTemporaryPaths and the tests that use it in packages/supervisor/test/preflight.test.ts. At the base, the same code.
The commit messages and the build log are claims. Do the review items from the code and your own runs before you read them, and state when you read them.

REVIEW ITEMS (PASS only if all pass)
1. The deadline change: whether the acknowledgement window now ends at the deadline only once performance.now() has reached the deadline 250 ms after the terminate command, a timer that fires earlier waiting out the remainder; whether the races with the acknowledgement and with the host's exit behave as at the base; whether the timer that is live when the race ends is the one cleared, so that no timer is left running; and whether any other behavior, deadline or path of the file changed.
2. The deadline test, packages/broker/test/acknowledgement-deadline.test.ts: whether it makes the acknowledgement timer fire before 250 ms for a host that never acknowledges and asserts that the window ends no earlier than 250 ms and that the host is classified as failed; whether it fails against the code at the base; whether its timer capture is certain to capture the acknowledgement timer and not another; and whether it leaves no process or timer behind.
3. The calibration: whether the calibration test now asserts on each host only what that host's watch reliably reports, as DEC-20261102-04 B5 item 4 requires; whether its assertions still prove the recorder works on each host; whether dropping the exact comparison lets anything slip that the recorder should catch; and whether "preflight creates nothing" still fails, on macOS and by reasoning on Linux, when preflight creates and removes a nested entry in its temporary location.
4. The report of other timers: whether the build log's list of other places in production that enforce a spec section 9.8 deadline with a timer is complete and correct, and whether any of them can end a minimum wait early in the way A4 describes. This item is report-only under B5 item 6: an unlisted timer is a finding on the report, and a timer with the same defect is a finding to carry, not to fix here.
5. Scope: the changed paths against DEC-20261102-04 B5 item 5; the only production change in packages/broker/src/pty-host-supervisor.ts and only within the acknowledgement window; no production change for the calibration; bun.lock and every manifest byte-identical to the base; both commits authored by daley40-lab and ending with Role-Id builder, Actor-Id session:codex/hardening-c-r1 and Execution-Surface codex.
6. The build log: a section per item with the fields DEC-20261102-02 B4 requires, and whether its counts match your own runs where they overlap.
7. You reproduce the final gates, the breaks and the probes, and try to defeat the tests, as WHAT YOU MUST EXECUTE says.

THE TEST RUNTIME
The macOS certification runtime is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Report command -v bun, its SHA-256, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Change no host setting and install nothing outside a disposable copy.

TEST OUTPUT AND QUOTES
Your log folder is /Users/michaeldaley/builds/review-pr215-r1-logs/. Create it and write every log there and nowhere else. Pipe every test run, probe and quoted command through tee into its own log file, and report each log's SHA-256. Do not truncate, compress or encode a log. Quote output only from its log, naming the log. Do not state a hash, name, line number or value you did not copy from a log or a file you read in this clone. Seed only synthetic values; run every probe that seeds a variable under env -i with only HOME, PATH set to /Users/michaeldaley/.bun/bin:/usr/bin:/bin, and the synthetic variables you choose. If a run's output contains, or would contain, a real token, credential or key, stop at once: do not open, quote, hash or copy that log, and report only its path and the test.

THE LOAD
Record uptime before every test run. Do not pause for the load and do not ask the Founder about it. If a test fails unexpectedly in a run whose first load average was 2.0 or more, do not rerun it: report it verbatim with that reading and mark the item it bears on INCONCLUSIVE, not FAIL, unless you can show the failure does not depend on load. The intended failures of a deliberate break are not such a failure.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
If you cannot run Bun in this clone or a disposable copy, return INCONCLUSIVE, name the checks you could not run, and stop.
- bun install --frozen-lockfile, then record uname -srm and id -un. Restoring the mode of packages/founder-act/src/main.ts is not a finding; any other tracked change is.
- The final gates at the head, each once, one at a time, in the foreground: bunx tsc --noEmit; bun test packages/broker; bun test packages/supervisor three times in a row; bun test test/phase3a/adversarial three times in a row; bun test test/phase3a; the runtime check again; bare bun test; git diff --check 93e7d1c4c16d7951dd3fde23b6516e8b1e5e738b; git diff --name-only 93e7d1c4c16d7951dd3fde23b6516e8b1e5e738b. Do not rerun a failed command.
- At least six deliberate breaks, each made, shown with git diff before the run, run over the whole of each affected test file with no -t filter, reported with which tests fail or that none does, restored, and confirmed by the restored file's SHA-256 equal to the head's: packages/broker/src/pty-host-supervisor.ts restored to its text at the base; the acknowledgement window ended 5 ms before the deadline; the re-armed timer left uncleared when the acknowledgement wins; the recorder's watch made non-recursive; preflight made to create and remove a file in its temporary location; and preflight made to create and remove a nested directory and a file in it there.
- Probes of your own, in a scratch copy outside the clone, with synthetic values only: run test/phase3a/adversarial/wedged-host.test.ts five times and report every ackWindowEndedMs it prints; and on this host, start the recorder of preflight.test.ts on a scratch directory, have a child create and remove a nested directory and a file in it, and report every path the recorder sees.
- Try to defeat the tests: find a change to production or to the recorder that ends the acknowledgement window before 250 ms, or lets preflight create and remove an entry in its temporary location unseen, while every test at the head still passes. Report each attempt and its result.
Keep every probe and scratch file outside the repository, and leave the clone as you found it.

KNOWN ITEMS ALREADY RULED (assess, do not relitigate)
- The verdicts, carried findings and limitations that DEC-20261102-04 rules on, and the items DEC-20261102-01 leaves to Phase 3B or to stated limitations, are not findings here unless this pull request changes them.
- The rulings R1 and R2 above.
- The builder ran from a separate Codex configuration set up to load no MCP servers, plugins, apps, computer use, hooks or memories, after three earlier sessions stopped at their identity checks having done nothing. That is a process fact for the Founder, not a review item.
- That this MacBook does not run the Linux branch of any test is a stated limitation; Verify and code-review on ubuntu-24.04 run it, and the Founder checks them.
- At this head, the first run of Verify (macOS) failed one test outside this pull request, "a refused pty_input or pty_resize never reaches the child" in test/phase3a/harness-lifecycle.test.ts, which Hardening B added: it stops reading output at the resize report, before the echo of the accepted input had arrived. That test is not part of this review. If it fails in one of your runs, report the failure verbatim, run nothing again to obtain a pass, and do not count it against this pull request; any other failure in that run still counts.

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
- Write the complete final report, every section below in order, to /Users/michaeldaley/builds/review-pr215-r1.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: reviewer id antigravity, the SHA you reviewed, the SHA in your checkout, harness and model as shown, every active workspace as shown, the host, that you did not author or direct the work, and when you read the commit messages and the build log.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS, FAIL or INCONCLUSIVE line for each of items 1 to 7 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with counts, exit codes and the uptime before each test run, any re-read of this prompt after a compaction, and what you only read.
5. The breaks, the probes and the attempts to defeat the tests, each with its result.
6. Every log in your log folder, by file name and SHA-256.
7. Anything you could not run or verify, and why.
8. Disagreements between this prompt and the acts, or the word none.
