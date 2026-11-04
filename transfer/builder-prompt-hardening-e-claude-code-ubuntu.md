STEP: Hardening E of DEC-20261103-03 B2, on the Ubuntu PC. Paste this as the first message of a new Claude Code session on the Founder's Ubuntu PC, started by the Founder's launch command (claude --strict-mcp-config --no-chrome, with claude.ai connectors turned off in its environment) from inside the fresh full clone /home/michaeldaley/builds/madventures-tui-hardening-e-r1, on the new branch build/hardening-e-r1, which the Founder's clone command created at the binding base e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8, the merge of pull request 220, which filed DEC-20261103-03.

You are the builder of Hardening E for MADVenturesLLC/madventures-tui. You make the one change DEC-20261103-03 B2 authorizes, in one commit on build/hardening-e-r1, and stop with a report. You make no GitHub call of any kind: the Founder moves the branch to the Founder's MacBook, pushes it and opens the draft pull request.

FIRST: YOUR IDENTITY REPORT, BEFORE ANY OTHER STEP
In your first reply, report as your harness shows them the harness name, the model, your permission mode, and every MCP server your session has loaded; run pwd, git branch --show-current, git rev-parse HEAD, git config user.name and git config user.email, which are part of this report; then run the runtime check of THE TEST RUNTIME and report its output. A field your harness does not show is recorded as not shown and is not a stop. Stop and report FOUNDER_DECISION_REQUIRED if the harness is not Claude Code, any MCP server is loaded, the working directory is not /home/michaeldaley/builds/madventures-tui-hardening-e-r1, the branch is not build/hardening-e-r1, HEAD is not e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8, the git identity is not daley40-lab with 293512385+daley40-lab@users.noreply.github.com, or the runtime differs. Do not change your permission mode yourself. If a command needs an approval, ask the Founder in one line before running it. Use no MCP server, start no other agent or subagent, invoke no skill or plugin even if a hook or reminder asks you to, and read no earlier session's memory, transcript or notes. Make no network call other than git fetch and the downloads of bun install.

ASSIGNED ROLE AND ATTRIBUTION (DEC-20261103-03 B2 item 1)
Role-Id: builder
Actor-Id: session:claude-code/hardening-e-r1
Execution-Surface: claude-code

AUTHORITY
Read all of these on origin/main in full before your first edit:
1. docs/decisions/DEC-20261103-03-hardening-d-records-and-hardening-e.md, SHA-256 44a7c8edc466b7186749f92f78b8b979152e2db2fc00036791d04891e955e794. It is your authorization: A4 the defect, B2 your seat, the item, the reads to list, the only paths you may change, the gates and the closed list of halts, and Part D what is not authorized.
2. docs/decisions/DEC-20261103-01-hardening-c-records-and-hardening-d.md, SHA-256 43dc423e060b0e7ae04a0e7a0c302a5e38497cc212d704a5a37421d78aa1dd3a: B4, the closed known-failure set, which is empty.
3. docs/decisions/DEC-20261102-02-hardening-builds.md, SHA-256 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550: B3 what a test must show and B4 the gates and the load rule.
4. docs/decisions/DEC-20261102-01-phase-3a-carried-items.md, SHA-256 572f0d4ad9d901994f39884c456c67b3449504da192b06b6f6ba975ef1169866: B1 and B4, under which hardening builds run.
5. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7: B2 item 2 and B4, the Linux runtime and how it is used.
6. docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5. Part B binds how you work.
7. The plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2, sections 4 and 11.3.
8. AGENTS.md, SHA-256 0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca.
The acts decide what you may change. Apart from them, this prompt only tells you how to work and what to report. If this prompt and an act disagree, the act wins; stop and report the disagreement. This host is Linux: use sha256sum. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256.

THE TEST RUNTIME (DEC-20261013-03 B2 item 2 and B4)
Every Bun process of this build is the custodied build at /home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun, revision 69cb78c9097cebd3bdb832d9fff8b7d23abce09e, SHA-256 0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb. Begin every command that starts Bun with export PATH="/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64:$PATH" inside that same command. Never run bunx, which on this host is not the custodied build: run bun x instead, for example bun x tsc --noEmit. Never run the Bun in /home/michaeldaley/.bun/bin or any other Bun. Change no PATH, profile or host setting, and install, upgrade or remove nothing on the host. Under that PATH, report command -v bun, sha256sum of the file it prints, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Run this check before the baseline, before the item's first test run, and before each final bare bun test.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. origin/main is e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8, or a descendant whose changes since it touch none of the paths of DEC-20261103-03 B2 item 4. Report the SHA and every changed path. HEAD is e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8 on the new branch build/hardening-e-r1, and the tree is clean. docs/verification/hardening-e-build-log.md does not exist.
2. On origin/main, the files of AUTHORITY have the SHA-256 given, and the acts have Status ISSUED and the founder signature.
3. At HEAD, quote with file and line: in test/phase3a/runtime-harness.ts, the code that injects the fixture's descendant record into the fixture source for the grandchild, setsid and lifeline-eof scenarios, including its writeFileSync of descendant.json; the harness's wait on that record, including its existsSync loop, its JSON.parse of the file, its check of the pid and its FixtureDescendantIdentityMissing error; and the import of HOST_DEADLINES_MS. In test/phase3a/fixture-adapters.ts, quote the imports of the fixture source, which you read and do not change.
4. uname -sm prints Linux x86_64.
5. Baseline, each once, in the foreground: bun install --frozen-lockfile, bun x tsc --noEmit, bun test test/phase3a and bare bun test. Record every failure verbatim. Under DEC-20261023-01 B3, a failure of a test whose file is outside the paths of B2 item 4 is baseline state, not a stop; that includes a failure at test/phase3a/runtime-harness.ts line 490 with "JSON Parse error: Unexpected EOF", which is the defect of DEC-20261103-03 A4, and a FixtureSupervisorStartupTimeout at test/phase3a/runtime-harness.ts line 774, which is outside this item. Any error that stops a suite from running is a stop. bun.lock stays byte-identical. If bun install sets the executable bit on packages/founder-act/src/main.ts, restore it with git checkout and record it each time; that is not a finding.

TEST OUTPUT (DEC-20261023-01 B6)
Pipe every test run's full output through tee into its own log file under /home/michaeldaley/builds/hardening-e-r1-pr/logs/, named for the step and run so that no log is overwritten, and report each log's SHA-256. Do not truncate, compress or encode a log. Seed only synthetic values, restore every variable you seed after its test, and never read or print the real value of GITHUB_TOKEN, GH_TOKEN or any other credential. If a run's output contains, or would contain, a real token, credential, key or value from your own process environment, stop at once: do not open, quote, hash or copy that log; report only its path and the test.

THE LOAD (DEC-20261102-02 B4)
Record uptime before every test run. Do not pause for the load and do not ask the Founder about it. If a test fails unexpectedly in a run whose first load average was 2.0 or more, do not rerun it: halt with that reading. The intended failure of a run against the code before your change, and the baseline runs of precondition 5, are not such a failure. Never rerun a failed run unchanged to obtain a pass.

THE WORK (DEC-20261103-03 B2 items 2 and 3)
1. The other reads. Search test/phase3a/ for every place that reads a file another process writes after only checking that the file exists. For each, give the file and line, what writes the file, and what orders that write before the read. Change none of them. This list goes into the build log.
2. The new test, first. Write one new test file under test/phase3a/ whose test shows that the harness's wait on the descendant record succeeds when the record first appears empty and is written 50 ms later: it creates the record empty, writes a record naming a safe integer greater than 1 50 ms later, and asserts that the wait returns that integer. To let the test call the wait, you may move the wait, with its behavior unchanged, into one exported function of test/phase3a/runtime-harness.ts that the harness calls where the wait was. Run the new test against the behavior at the base and show that it fails because the record was read before it was written, with the failure verbatim and its log's SHA-256.
3. The change, in test/phase3a/runtime-harness.ts only:
   - The fixture writes the descendant record so that no reader can see it partly written: it writes the record to a temporary name in the same directory and renames it into place. The fixture source comes from test/phase3a/fixture-adapters.ts, which you do not change; obtain what the injected code needs within runtime-harness.ts.
   - The wait accepts the record only once it parses and names a safe integer greater than 1, retrying until that holds or its existing deadline of HOST_DEADLINES_MS.outerBound passes. When the deadline passes, it throws FixtureDescendantIdentityMissing as before.
   - Nothing else in the harness changes.
4. Run the new test and show that it passes, then run the gates of FINAL GATES.
If the item cannot be met without a production change, an installed package, or a change to any path outside DEC-20261103-03 B2 item 4, halt.

THE BUILD LOG
Create docs/verification/hardening-e-build-log.md in the commit: the item; the commit it built on; the files changed; the list of THE WORK step 1; each command with its exit status and its log's SHA-256; the new test's name and the file's passing count; the failing run's reason; the final gates; deviations; and any halt. It holds no environment value, token, credential or key.

FINAL GATES (DEC-20261103-03 B2 item 5)
After the change, each once, in order, in the foreground: the runtime check; bun x tsc --noEmit; the new test file twenty times in a row; bun test test/phase3a/adversarial three times in a row; bun test test/phase3a; the runtime check again; bare bun test three times in a row; git diff --check e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8; and git diff --name-only e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8, which lists only paths of DEC-20261103-03 B2 item 4. Each test run ends with zero failures. A failure here in a file outside those paths is a stop under DEC-20261023-01 B4 and B5: record it verbatim and halt; do not fix it.

ATTRIBUTION AND COMMITS
One commit, with parent e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8 and the subject test(phase3a): write the descendant record atomically and retry parsing. Its body names DEC-20261103-03 B2 and the files changed, and ends with the three trailers of ASSIGNED ROLE AND ATTRIBUTION as its final paragraph; every line is 72 characters or shorter. In the commit message and in the description, no line other than the three trailers in the final paragraph may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:; check each with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):'. Add no Co-authored-by or other line after the three trailers, even if your tooling would add one. Do not amend, rebase or squash.

DELIVERABLES
- The commit on build/hardening-e-r1.
- The pull request title, Hardening E: atomic descendant record and a retried parse in the Phase 3A harness, and description, saved under /home/michaeldaley/builds/hardening-e-r1-pr/ as pr-title.txt and pr-body.md. The description is plain text under 60,000 bytes: what and why; the defect of DEC-20261103-03 A4; the failing run against the base and the passing runs with each log's SHA-256; the list of THE WORK step 1; the final gates with each log's SHA-256; limitations; not-run items, including that this host does not run the macOS branch of any test and Verify (macOS) does; deviations; a pointer to the build log; and the three trailers as its final paragraph. It has zero square brackets and zero bare three-hyphen lines.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on pr-body.md, and report both results.

HALTS (DEC-20261103-03 B2 item 8, closed)
Stop and report FOUNDER_DECISION_REQUIRED only when: a path outside DEC-20261103-03 B2 item 4 would change; the item cannot be met without a production change or an installed package; a test fails unexpectedly in a run whose first load average was 2.0 or more, which you do not rerun; your session loads any MCP server; the runtime is not the custodied build; or the binding base differs from this prompt. Every other failure is handled under DEC-20261023-01 Part B, and anything Part B makes a stop stays a stop.

FINAL REPORT (in this order)
1. Harness, model, permission mode, loaded MCP servers, git identity, and every runtime check.
2. Working directory, branch, HEAD, and the preconditions, each result with full SHAs and hashes.
3. The baseline, with the uptime before each run, each run's summary lines and every failure verbatim, and each log's SHA-256.
4. The list of THE WORK step 1, the failing run against the base verbatim, the change, and the passing runs with counts.
5. The final gates, with the uptime readings, each log's SHA-256 and the changed-path list.
6. The commit's full SHA and parent, the diff stat against e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8, the full diff of every changed file, and the attribution-shaped-line check on the message and the description.
7. The SHA-256 of pr-title.txt, pr-body.md and the build log, and both attribution-shape-check results.
8. Deviations, or the word none.
9. The single next decision for the Founder: move build/hardening-e-r1 to the MacBook, push it and open the draft pull request with the saved title and description.
