STEP: review of Task 50, pull request 202. Paste this as the first message of a new Antigravity session running a Gemini 4 model on the Founder's MacBook, whose only workspace is the fresh clone /Users/michaeldaley/builds/madventures-tui-m22-task50-review-r1, detached at c7eabf0ec8ad676e2d3ecc63075eedae9bfc3535.

You are the independent Tier-2 reviewer of Task 50 of DEC-20261027-01 B6 in MADVenturesLLC/madventures-tui.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: antigravity
FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, every active workspace, your working directory (pwd) and git rev-parse HEAD. Run pwd and git rev-parse HEAD to do so; those two commands are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini 4 model, any other workspace is active, or either path or the SHA differs.
You did not write, plan or direct any part of this work, and this session has seen no material of this build before this message. If either is untrue, stop and say so. Do not invent a session id, an actor id or a model id. You review one exact head and nothing else.
Do not read any other clone of this repository, including /Users/michaeldaley/builds/madventures-tui-m22-task50-r1; the folder /Users/michaeldaley/builds/m22-task50-r1-pr or anything in it; any earlier review report or log folder under /Users/michaeldaley or /Users/michaeldaley/builds; anything under /tmp whose name contains m22 or task50; or any earlier review notes, memory, transcript or session of any tool. If you have seen any of them, stop and say so. Read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine, ~/.claude-madventures-v5 or ~/.hermes, use no MCP server, and run no command that prints an environment variable, a token or a key, or lists processes. Search source with file names and line numbers, and do not print lines that assign values to token, key, secret or password variables. Never run /Users/michaeldaley/bun-displaced-1.4.4.

TARGET
Pull request 202, draft, branch build/m22-task50-r1.
Head under review: c7eabf0ec8ad676e2d3ecc63075eedae9bfc3535, one commit.
Binding base: 2e62ebbb173d9649de999e5ef22c48812f36e6d0, the merge of Task 49.
Verify that git rev-parse HEAD^ equals the binding base and that git status is empty, before you read anything else. If either differs, stop and report.

AUTHORITY
Run git fetch origin main first. Read in full, before the code, from origin/main:
1. docs/decisions/DEC-20261027-01-m22-execution-authorization.md, SHA-256 86f1374492a833ce87ebdf81293c59e8805c547d8bc29e1aa682b17a769bcd8b. B6 rules Task 50; B8 binds how you quote.
2. The plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, section 5, Task 50.
3. docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5, Part B, which binds how you work, with B8 of the first act added to it.
4. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7, B2 item 1: the macOS certification runtime.
If any text is missing or has another SHA-256, stop and report.
The Founder's builder prompt, which you cannot read, gave these readings of B6, which bound the builder:
R1. The four consumers. For each of the two fixture executions, the four environments are: the identity probe and the auth probe, which preflight runs as the fixture executable; the PTY host, whose environment is exactly the environment the build hands spawnPtyHost, since spawnPtyHost spawns the host with that environment and nothing else; and the governed child, the fixture executable under --fixture-run. The fixture executable captures its own process.env in each of its three modes. The PTY host is production code and cannot capture its own environment, so the host capture cannot be made in fixture-adapters.ts, and B6 permits exactly this change to test/phase3a/runtime-harness.ts: pass the build a spawnHost dependency that records the descriptor's environment and then calls spawnPtyHost with the descriptor unchanged. Nothing else in runtime-harness.ts changes, and the session object it returns keeps exactly its present members. Record this change under Deviations as B6 requires.
R2. Where captures go. No capture may add a variable to any environment, so no capture location is passed through the environment. Captures are written as files under the fixture root that startFixtureSession creates, which the fixture executable can locate from its own path and a test can locate as the parent of session.storage.root, and they are removed with that root.
R3. The third test. No environment allowlist a fixture registration can name marks any variable secret, in packages/supervisor/src/environment.ts at this base, and B6 permits no production change. The third test therefore seeds a synthetic marker value into the test process's environment under a name outside the allowlist, runs a full session to close, and asserts that the value appears in no error message, ledger row, file under the fixture root, output frame, snapshot or environment capture the session produced. The pull request description states under Limitations that no session path at this base exercises the redaction of a secret-marked allowlisted value, and that a later act rules on it.
Where this prompt and the acts disagree, the acts win and you report the disagreement. You make no GitHub call, so report any cross-check against GitHub as not run.

PACKET (read every item)
1. The texts above.
2. At the binding base: test/phase3a/runtime-harness.ts, test/phase3a/fixture-adapters.ts, test/phase3a/harness-lifecycle.test.ts, test/phase3a/harness-rollback.test.ts, packages/supervisor/src/environment.ts, packages/supervisor/src/attestation.ts, packages/supervisor/src/preflight.ts, packages/supervisor/src/build.ts, packages/broker/src/pty-host-supervisor.ts and packages/pty-host/src/terminal.ts.
3. The diff from the binding base to the head.
4. At the head, with line numbers: every changed file.
The commit message is a claim. Do the review items from the code and your own runs before you read it, and state when you read it. You do not read the pull request description, which is on GitHub.

REVIEW ITEMS (DEC-20261027-01 B6 with the readings above; PASS only if all pass)
1. Plan Step 1, first test: environment-equality.test.ts holds the three tests with exactly the plan's names. For the first, say for each of the four consumers whether its capture is produced by that consumer itself or by the harness, whether the test compares the four captures of each execution with toEqual, and whether it would detect a variable added to, removed from or changed in one consumer's environment only.
2. Plan Step 1, second test: say whether a variable seeded into the test process's environment can reach any consumer at the head other than through a fault, and for which consumers the test would detect such a fault.
3. Plan Step 1, third test, as R3 reads it: say what the test checks, whether any check in it is vacuous, and what it cannot check at this base.
4. R1 and R2: the change to runtime-harness.ts is only the spawnHost dependency R1 describes; the descriptor reaches spawnPtyHost unchanged; the returned session keeps exactly its members at the base; no capture adds a variable to any environment or passes a location through one; and every capture is removed with the fixture root. Say whether the host can receive an environment different from the one recorded, reading spawnPtyHost.
5. B6 paths: the changed paths against the binding base are exactly test/phase3a/environment-equality.test.ts, test/phase3a/fixture-adapters.ts and test/phase3a/runtime-harness.ts; every production file and every existing test is byte-identical to the base; createFakeByteRouter and every behavior Task 49 added to the fixture are unchanged in effect; bun.lock and every manifest are byte-identical; the commit subject is test(phase3a): assert four-way environment equality and ambient isolation.
6. Plan Step 2: the RED run shows the first test failing because a capture does not exist at the binding base's fixture.
7. You reproduce D3 and the breaks, run the probes, and try to defeat the tests, as WHAT YOU MUST EXECUTE says.
Also report any other difference between the head and the acts above, classified as below.

THE TEST RUNTIME
The macOS certification runtime on this host is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. /opt/homebrew/bin comes before it on PATH, and a child zsh resets PATH through /etc/zprofile, so begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Under that PATH report command -v bun, command -v bunx, the SHA-256 of the file command -v bun prints, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. If bunx does not resolve inside /Users/michaeldaley/.bun/bin, use bun x and say so. Change no PATH, profile or host setting, and install, upgrade or remove nothing on the host. No known-failure set and no timing exception applies on the MacBook.

TEST OUTPUT AND QUOTES (DEC-20261023-01 B6, DEC-20261027-01 B8)
Your log folder is /Users/michaeldaley/builds/m22-task50-review-r1-logs/. Create it, and write every log there and nowhere else. For every test run, every probe and every command whose output you quote, pipe its full output through tee into its own file in that folder, named for the step and run, and report each log's SHA-256. Do not truncate, compress or encode a log. Quote a command's output only by copying it from its log, and name that log beside the quote. Every SHA-256 you give of a repository file must be the output of a shasum command in a log. Do not state any hash, name, line number or value that you did not copy from a log or from a file you read in this clone. If you use bun test -t, escape every regular-expression metacharacter of the name and confirm from the summary how many tests ran; a run that reports zero tests is a failed check.
The values the harness builds for the fixture environment, which are HOME, SHELL, PATH, TERM and TMPDIR as the harness sets them, and synthetic values you seed, are fixture data: a log that shows them is not a breach. If a run's output contains, or you see it would contain, any other value from your own process environment, or any real token, credential or key, stop at once: do not open, quote, hash or copy that log, and report only its path and the test that produced it. Run every break that merges process.env into an environment, and every probe that seeds a variable, under env -i with only HOME, PATH set to /Users/michaeldaley/.bun/bin:/usr/bin:/bin, and the synthetic variables you choose, so that no real value of yours can reach a log. Seed only synthetic values, and in probes report variable names, not values.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
If you cannot run Bun in this clone or a disposable copy, return INCONCLUSIVE, name the checks you could not run, and stop. Do not guess results and do not return FAIL for that reason.
- Before any test, ask the Founder in one line what else is running on this MacBook beyond this session, and record the answer verbatim. Record the output of uptime before every test run.
- bun install --frozen-lockfile, then record uname -srm and id -un. Restoring the mode of packages/founder-act/src/main.ts is not a finding; any other tracked change is.
- D3 at the head, each command once, one at a time, in the foreground: bunx tsc --noEmit; bun test test/phase3a/environment-equality.test.ts three times in a row; bun test test/phase3a and bun test packages/supervisor; then run the runtime check of THE TEST RUNTIME again, and if uptime shows a first load average of 2.0 or more, ask the Founder in one line to quiet the host and wait for the answer; bare bun test; git diff --check; git diff --name-only 2e62ebbb173d9649de999e5ef22c48812f36e6d0. Do not rerun a failed command. If the full suite fails only on a test outside the changed paths, and your evidence shows this head does not cause it, item 7 is INCONCLUSIVE, not FAIL; report the failure with the uptime before it and your evidence under report section 5.
- At least four deliberate breaks, each made, shown with git diff before the run, run over the whole of environment-equality.test.ts with no -t filter, reported with which tests fail or that none does and the assertion of any failing test, restored, and confirmed by the file's SHA-256 equal to the head's: process.env merged into the probe spawn's environment in packages/supervisor/src/attestation.ts; process.env merged into the host spawn's environment in spawnPtyHost; process.env merged into the child spawn's environment in packages/pty-host/src/terminal.ts; and one variable removed from the child's own capture in fixture-adapters.ts.
- Probes of your own, in a scratch copy outside the clone, with synthetic values only: the names of the variables in each of the eight captures of one session; the same with one synthetic variable seeded into the test process's environment; the names of any capture files left anywhere after close; and, after a startup failure injected at children, whether any capture file outlives the fixture root. Report each input as code and the printed output verbatim.
- Try to defeat the tests: find a change to fixture-adapters.ts, runtime-harness.ts or a production environment path that breaks four-way equality or ambient isolation while every test at the head still passes. Report each attempt and its result.
Keep every probe and scratch file outside the repository, and leave the clone as you found it.

KNOWN ITEMS ALREADY RULED (assess, do not relitigate)
- The commit was built by a Codex session on this MacBook under a builder prompt the Founder signed, with the readings R1 to R3 above. The Founder's answers to the builder's host questions, including one that carried unfilled placeholders, are process facts for the Founder, not review items.
- The PTY host capture is the environment the build hands the host, not one the host reports, and no session path at this base exercises the redaction of a secret-marked allowlisted value; both are stated limitations, not findings. Report what your breaks and probes show about them.
- The Founder pushed the branch and opened the draft pull request. That is not a deviation.

BOUNDARIES
You are read-only toward GitHub and the repository. Make no GitHub call of any kind: no gh, no API request, no push, comment, approval, ready, resolve or merge; git fetch is the only network command you run, apart from the downloads of bun install. Edit no file you leave behind. Install nothing outside a disposable copy. Do not review anything outside this head, and do not propose changes to the acts. The Founder posts the verdict.

HOW TO CLASSIFY EVERY FINDING
Number each finding. Give file and line, the ruling it breaches (act and part), a concrete failing input or scenario, and one of:
- SUBSTANTIVE: a breach of a ruling, a missing or vacuous required test or assertion, a path outside scope, or behavior you can show is wrong.
- ADVISORY: an improvement the acts do not require.
- NOT COUNTING: a point plan section 11.3 lists as not counting. Quote the line.
Classify every successful attempt to defeat the tests, and every break that no test catches, as one of these. A SUBSTANTIVE finding means FAIL; the Founder rules how it counts. Be exact: do not inflate an advisory, and do not downgrade a real defect.

HOW TO WORK AND DELIVER
- Work through to the end without waiting for guidance. The Founder answers only your one-line host questions and permission prompts, and will not send corrections. If you cannot complete a required item, the verdict is INCONCLUSIVE for that reason.
- Items 1 to 7 are not findings; their results go only in the verdict section.
- For every command, quote the last printed lines verbatim from its log, including the pass, fail and file counts Bun prints, and the exit code. For every probe, give the input as code and the printed output verbatim from its log.
- Write the complete final report, every section below in order, to /Users/michaeldaley/builds/m22-task50-review-r1.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: reviewer id antigravity, the SHA you reviewed, the SHA in your checkout, your harness and model as shown, the host, that you did not author or direct the work and had seen none of its material, and when you read the commit message.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS, FAIL or INCONCLUSIVE line for each of items 1 to 7 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with printed counts, exit codes and the uptime before each test run, and what you only read.
5. The breaks, your probes, your attempts to defeat the tests, and any test failure outside the changed paths, each with its result.
6. Every log in your log folder, by file name and SHA-256, as one list.
7. Anything you could not run or verify, and why.
8. Disagreements between this prompt and the acts, or the word none.
