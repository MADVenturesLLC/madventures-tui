STEP: Hardening B of DEC-20261102-02, items 5, 12, 13, 17 and 18 of DEC-20261102-01. Paste this as the first message of a new Claude Code session on the Founder's MacBook, started by the Founder's launch command (claude --strict-mcp-config, as daley40-lab) from inside the fresh full clone /Users/michaeldaley/builds/madventures-tui-hardening-b-r1, on the new branch build/hardening-b-r1, which the Founder's clone command created at the binding base 68959cf27ee2652d4f9c3287cec4a5ee03798a7a, the merge of pull request 210.

You are the builder of Hardening B for MADVenturesLLC/madventures-tui. You make the changes DEC-20261102-02 authorizes for items 5, 12, 13, 17 and 18 of DEC-20261102-01, one commit per item in the order of THE WORK, on build/hardening-b-r1, and stop with a report. You make no GitHub call: the Founder pushes the branch and opens the draft pull request.

FIRST: YOUR IDENTITY REPORT, BEFORE ANY OTHER STEP
In your first reply, report as your harness shows them the harness name, the model, your sandbox and approval settings, and every MCP server your session has loaded; run pwd, git branch --show-current, git rev-parse HEAD, git config user.name and git config user.email, which are part of this report; then run the runtime check of THE TEST RUNTIME and report its output. A field your harness does not show is recorded as not shown and is not a stop. Stop and report FOUNDER_DECISION_REQUIRED if the harness is not Claude Code, any MCP server is loaded, the working directory is not /Users/michaeldaley/builds/madventures-tui-hardening-b-r1, the branch is not build/hardening-b-r1, HEAD is not 68959cf27ee2652d4f9c3287cec4a5ee03798a7a, the git identity is not daley40-lab with 293512385+daley40-lab@users.noreply.github.com, or the runtime differs. Do not change your sandbox or approval settings yourself. If a command needs an approval or an escalation, ask the Founder in one line before running it. Use no MCP server, start no other agent, and read no earlier session's memory, transcript or notes.

ASSIGNED ROLE AND ATTRIBUTION (DEC-20261102-02 B1)
Role-Id: builder
Actor-Id: session:claude-code/hardening-b-r1
Execution-Surface: claude-code

AUTHORITY
Read all of these on origin/main in full before your first edit:
1. docs/decisions/DEC-20261102-02-hardening-builds.md, SHA-256 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550. It is your authorization: B1 your seat and items, B2 the only paths you may change, B3 what each item needs, B4 the gates, B5 Hermes, B9 the closed list of halts, and Part D what is not authorized.
2. docs/decisions/DEC-20261102-01-phase-3a-carried-items.md, SHA-256 572f0d4ad9d901994f39884c456c67b3449504da192b06b6f6ba975ef1169866: A3 states each item, and B1 how each is met.
3. docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5. Part B binds how you work.
4. The plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2, section 11.3 and Task 55.
5. docs/decisions/DEC-20261027-01-m22-execution-authorization.md, SHA-256 86f1374492a833ce87ebdf81293c59e8805c547d8bc29e1aa682b17a769bcd8b, B5 item 3: the harness never returns to tests the broker, the build's broker delegate, the ledger, or any function that publishes, appends or calls publish or publishIncident. It binds runtime-harness.ts.
6. docs/decisions/DEC-20261024-01-separation-pin-rule.md, SHA-256 fa0d114dbe3a37db38a7538e9a5c33da42755a47250d7ae4069233043c6ac85e, if you change a file with an entry in the EXCEPTIONS table of test/phase3a/harness-separation.test.ts.
7. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7, B2 item 1: the macOS runtime.
8. AGENTS.md, SHA-256 0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca, and the spec, docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md, SHA-256 c09fe4849a4a61bf3e1494b77267020e00bd1d7b3015e3b2332ec5d71b07f769, for the sections your items name.
The acts decide what you may change. Apart from them, this prompt only tells you how to work and what to report. If this prompt and an act disagree, the act wins; stop and report the disagreement. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256.

THE TEST RUNTIME (DEC-20261013-03 B2 item 1)
The macOS certification runtime on this host is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun or /Users/michaeldaley/bun-displaced-1.4.4. Change no PATH, profile or host setting, and install, upgrade or remove nothing on the host. Under that PATH, report command -v bun, command -v bunx, shasum -a 256 of the file command -v bun prints, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Run this check before the baseline, before each item's first test run, and before the final bare bun test.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. origin/main is 68959cf27ee2652d4f9c3287cec4a5ee03798a7a, or a descendant whose changes since it touch none of the paths of DEC-20261102-02 B2 item 2. Report the SHA and every changed path. HEAD is 68959cf27ee2652d4f9c3287cec4a5ee03798a7a on the new branch build/hardening-b-r1, and the tree is clean. docs/verification/hardening-b-build-log.md does not exist.
2. On origin/main, the files of AUTHORITY have the SHA-256 given, and the acts have Status ISSUED and the founder signature.
3. At HEAD, quote with file and line what each item of THE WORK relies on, as that item says.
4. uname -sm prints Darwin arm64.
5. Baseline, each once, in the foreground: bun install --frozen-lockfile, bunx tsc --noEmit, bun test test/phase3a, bun test apps/madbridge, bun test packages/artifact-store, bun test test/acceptance and bare bun test, each with 0 fail; bun.lock stays byte-identical.

TEST OUTPUT (DEC-20261023-01 B6)
Pipe every test run's full output through tee into its own log file under /Users/michaeldaley/builds/hardening-b-r1-pr/logs/, named for the item, step and run so that no log is overwritten, and report each log's SHA-256. Do not truncate, compress or encode a log. Seed only synthetic values, restore every variable you seed after its test, and never read or print the real value of GITHUB_TOKEN, GH_TOKEN or any other credential. If a run's output contains, or would contain, a real token, credential, key or value from your own process environment, stop at once: do not open, quote, hash or copy that log; report only its path and the test.

THE LOAD (DEC-20261102-02 B4)
Record uptime before every test run. Do not pause for the load and do not ask the Founder about it. If a test fails in a run whose first load average was 2.0 or more, do not rerun it: halt under B9 with that reading. Never rerun a failed run unchanged to obtain a pass.

THE WORK
For each item, in this order: quote what it relies on; write the test; run it to show it fails for the reason the item names, against the code before your change if the item has a production change, or against a deliberate break of the behavior it covers, made and shown with git diff and then restored, with the restored file's SHA-256 equal to the original's; make the smallest change the item needs, if any; run the item's tests and the suites it touches; append its section to the build log; commit.
1. Item 13, a production change: quote how apps/madbridge/src/commands/export-evidence.ts writes the package into its output directory. Change it to write a fresh package and publish it only when complete, so that no file it did not write is in the package. The test plants a synthetic file in the output directory first and asserts it is not in the published package; it fails against the code before your change. Subject: fix(madbridge): export evidence into a fresh package
2. Item 18, a production change: quote where manifest_hash is computed and where redaction_rules_applied is added. Make manifest_hash cover redaction_rules_applied, changing packages/artifact-store/src/manifest.ts only if export-evidence.ts alone cannot. The test asserts that changing the rule list changes the hash, and fails against the code before your change. Subject: fix(madbridge): cover the redaction rules in the manifest hash
3. Item 12: quote the rejection tests of test/phase3a/evidence-pipeline.test.ts that pass explicit --ledger and --output paths, and the subdirectory checks in verify-ledger.ts and export-evidence.ts. Add tests that run each command with --session only against a session whose ledger or output subdirectory is group-accessible or a symbolic link, and assert rejection; each fails when those subdirectory checks are deleted. Subject: test(phase3a): reject invalid session subdirectories in the evidence commands
4. Item 17: quote escalateWedgedHost in packages/broker/src/pty-host-supervisor.ts and the wedged-host tests in test/phase3a/adversarial/wedged-host.test.ts. Add a fault switch to test/phase3a/runtime-harness.ts that makes a host keep running but drop its acknowledgement of a command, without SIGSTOP, and a test that asserts host failure within the bounds of spec section 9.8 with the same assertions as the SIGSTOP test. Keep DEC-20261027-01 B5 item 3. If it needs a production change, or production does not detect it, halt. Subject: test(phase3a): cover a running host that drops acknowledgements
5. Item 5: in test/phase3a, add a test that a refused pty_input or pty_resize never reaches the child; a test that the fixture exits cleanly on SIGINT; a check of the returned session by Reflect.ownKeys; and a refused command in the third test of test/phase3a/environment-equality.test.ts, so that an error payload is checked against the marker. Subject: test(phase3a): cover refused input, SIGINT exit and the returned session

THE BUILD LOG
Create docs/verification/hardening-b-build-log.md in the first item's commit and append one section in each item's commit, before that commit is made: the item; the commit it built on; the files changed; each command with its exit status and its log's SHA-256; the tests added with their names and the file's passing count; the failing run's reason and the break, if any; deviations; and any halt with its class under B9. It holds no environment value, token, credential or key.

FINAL GATES
After the last item, each once, in order, in the foreground: the runtime check; bunx tsc --noEmit; bun test test/phase3a/adversarial three times in a row, bun test apps/madbridge, bun test packages/artifact-store and bun test test/acceptance; bun test test/phase3a; bare bun test; git diff --check 68959cf27ee2652d4f9c3287cec4a5ee03798a7a; and git diff --name-only 68959cf27ee2652d4f9c3287cec4a5ee03798a7a, which lists only paths of DEC-20261102-02 B2 item 2. Each test run ends with 0 fail.

ATTRIBUTION AND COMMITS
One commit per item, in the order of THE WORK, the first with parent 68959cf27ee2652d4f9c3287cec4a5ee03798a7a. Each subject is the one THE WORK gives. Each body names the item, DEC-20261102-01 and DEC-20261102-02 and the files changed, and ends with the three trailers of ASSIGNED ROLE AND ATTRIBUTION as its final paragraph; every line is 72 characters or shorter. In every commit message and in the description, no line other than the three trailers in the final paragraph may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:; check each with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):'. Add no Co-authored-by or other line after the three trailers. Do not amend, rebase or squash.

DELIVERABLES
- The commits on build/hardening-b-r1.
- The pull request title, Hardening B: fresh evidence packages, manifest coverage, and harness and evidence test hardening, and description, saved under /Users/michaeldaley/builds/hardening-b-r1-pr/ as pr-title.txt and pr-body.md. The description is plain text under 60,000 bytes: what and why for each item and path; for each item, the failing run, the break if any, and the gate results with each log's SHA-256; the final gates with each log's SHA-256; a table mapping each test to its item; limitations; not-run items, including that this MacBook does not run the Linux branch of any test and Verify on ubuntu-24.04 does; deviations; a pointer to the build log; and the three trailers as its final paragraph. It has zero square brackets and zero bare three-hyphen lines.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch, which must examine every commit, and in prbody mode on pr-body.md, and report both results.

HALTS (DEC-20261102-02 B9, closed)
Stop and report FOUNDER_DECISION_REQUIRED only when: a path outside B2 item 2 would change; item 17 needs a production change or production does not detect the dropped acknowledgement; item 18 needs a production change beyond export-evidence.ts and packages/artifact-store/src/manifest.ts; a test fails in a run whose first load average was 2.0 or more; your session has loaded any MCP server; or the binding base differs. Fix every other failure yourself under DEC-20261023-01 B4 and record it.

FINAL REPORT (in this order)
1. Harness, model, sandbox and approval settings, loaded MCP servers, git identity, and every runtime check.
2. Working directory, branch, HEAD, and the preconditions, each result with full SHAs and hashes.
3. The baseline, with the uptime before each run and each run's summary lines and log SHA-256.
4. For each item: what it relies on, the failing run verbatim, the break and restored SHA-256 if any, the change, the tests and counts, and the commit's full SHA and parent.
5. The final gates, with the uptime readings, each log's SHA-256 and the changed-path list.
6. The diff stat against 68959cf27ee2652d4f9c3287cec4a5ee03798a7a, the full diff of every production file, and the attribution-shaped-line check on each message and the description.
7. The SHA-256 of pr-title.txt, pr-body.md and the build log, and both attribution-shape-check results.
8. Deviations, or the word none.
9. The single next decision for the Founder: push build/hardening-b-r1 and open the draft pull request with the saved title and description.
