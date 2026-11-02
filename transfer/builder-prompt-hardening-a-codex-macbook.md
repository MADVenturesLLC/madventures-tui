STEP: Hardening A of DEC-20261102-02, items 1, 3, 4, 7, 8, 9 and 10 of DEC-20261102-01. Paste this as the first message of a new Codex CLI session on the Founder's MacBook, started by the Founder's launch command (codex with -c mcp_servers.hermes.enabled=false) from inside the fresh full clone /Users/michaeldaley/builds/madventures-tui-hardening-a-r1, on the new branch build/hardening-a-r1, which the Founder's clone command created at the binding base 68959cf27ee2652d4f9c3287cec4a5ee03798a7a, the merge of pull request 210.

You are the builder of Hardening A for MADVenturesLLC/madventures-tui. You make the changes DEC-20261102-02 authorizes for items 1, 3, 4, 7, 8, 9 and 10 of DEC-20261102-01, one commit per item in the order of THE WORK, on build/hardening-a-r1, and stop with a report. You make no GitHub call: the Founder pushes the branch and opens the draft pull request.

FIRST: YOUR IDENTITY REPORT, BEFORE ANY OTHER STEP
In your first reply, report as your harness shows them the harness name, the model, your sandbox and approval settings, and every MCP server your session has loaded; run pwd, git branch --show-current, git rev-parse HEAD, git config user.name and git config user.email, which are part of this report; then run the runtime check of THE TEST RUNTIME and report its output. A field your harness does not show is recorded as not shown and is not a stop. Stop and report FOUNDER_DECISION_REQUIRED if the harness is not Codex CLI, the hermes MCP server is loaded, the working directory is not /Users/michaeldaley/builds/madventures-tui-hardening-a-r1, the branch is not build/hardening-a-r1, HEAD is not 68959cf27ee2652d4f9c3287cec4a5ee03798a7a, the git identity is not daley40-lab with 293512385+daley40-lab@users.noreply.github.com, or the runtime differs. Do not change your sandbox or approval settings yourself. If a command needs an approval or an escalation, ask the Founder in one line before running it. Use no MCP server, start no other agent, and read no earlier session's memory, transcript or notes.

ASSIGNED ROLE AND ATTRIBUTION (DEC-20261102-02 B1)
Role-Id: builder
Actor-Id: session:codex/hardening-a-r1
Execution-Surface: codex

AUTHORITY
Read all of these on origin/main in full before your first edit:
1. docs/decisions/DEC-20261102-02-hardening-builds.md, SHA-256 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550. It is your authorization: B1 your seat and items, B2 the only paths you may change, B3 what each item needs, B4 the gates, B5 Hermes, B9 the closed list of halts, and Part D what is not authorized.
2. docs/decisions/DEC-20261102-01-phase-3a-carried-items.md, SHA-256 572f0d4ad9d901994f39884c456c67b3449504da192b06b6f6ba975ef1169866: A3 states each item, and B1 how each is met.
3. docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5. Part B binds how you work.
4. The plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2, section 11.3.
5. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7, B2 item 1: the macOS runtime.
6. AGENTS.md, SHA-256 0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca, and the spec, docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md, SHA-256 c09fe4849a4a61bf3e1494b77267020e00bd1d7b3015e3b2332ec5d71b07f769, for the sections your items name.
The acts decide what you may change. Apart from them, this prompt only tells you how to work and what to report. If this prompt and an act disagree, the act wins; stop and report the disagreement. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256.

THE TEST RUNTIME (DEC-20261013-03 B2 item 1)
The macOS certification runtime on this host is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun or /Users/michaeldaley/bun-displaced-1.4.4. Change no PATH, profile or host setting, and install, upgrade or remove nothing on the host. Under that PATH, report command -v bun, command -v bunx, shasum -a 256 of the file command -v bun prints, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Run this check before the baseline, before each item's first test run, and before the final bare bun test.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. origin/main is 68959cf27ee2652d4f9c3287cec4a5ee03798a7a, or a descendant whose changes since it touch none of the paths of DEC-20261102-02 B2 item 1. Report the SHA and every changed path. HEAD is 68959cf27ee2652d4f9c3287cec4a5ee03798a7a on the new branch build/hardening-a-r1, and the tree is clean. docs/verification/hardening-a-build-log.md does not exist.
2. On origin/main, the files of AUTHORITY have the SHA-256 given, and the acts have Status ISSUED and the founder signature.
3. At HEAD, quote with file and line what each item of THE WORK relies on, as that item says.
4. uname -sm prints Darwin arm64.
5. Baseline, each once, in the foreground: bun install --frozen-lockfile, bunx tsc --noEmit, bun test packages/broker, bun test packages/pty-host, bun test packages/supervisor, bun test apps/madbridge/test/doctor.test.ts and bare bun test, each with 0 fail; bun.lock stays byte-identical.

TEST OUTPUT (DEC-20261023-01 B6)
Pipe every test run's full output through tee into its own log file under /Users/michaeldaley/builds/hardening-a-r1-pr/logs/, named for the item, step and run so that no log is overwritten, and report each log's SHA-256. Do not truncate, compress or encode a log. Seed only synthetic values, restore every variable you seed after its test, and never read or print the real value of GITHUB_TOKEN, GH_TOKEN or any other credential. If a run's output contains, or would contain, a real token, credential, key or value from your own process environment, stop at once: do not open, quote, hash or copy that log; report only its path and the test.

THE LOAD (DEC-20261102-02 B4)
Record uptime before every test run. Do not pause for the load and do not ask the Founder about it. If a test fails in a run whose first load average was 2.0 or more, do not rerun it: halt under B9 with that reading. Never rerun a failed run unchanged to obtain a pass.

THE WORK
For each item, in this order: quote what it relies on; write the test; run it to show it fails for the reason the item names, against the code before your change if the item has a production change, or against a deliberate break of the behavior it covers, made and shown with git diff and then restored, with the restored file's SHA-256 equal to the original's; make the smallest change the item needs, if any; run the item's tests and the suites it touches; append its section to the build log; commit.
1. Item 1, the only production change: spawnPtyHost in packages/broker/src/pty-host-supervisor.ts starts the PTY host with the repository root as its working directory, and Bun loads a .env file found there into the host's environment despite the explicit environment. Quote spawnPtyHost and the cwd it passes. Change it so that no .env file in the host's working directory reaches the host's environment, and keep every other behavior. The test, in packages/broker/test/pty-host-supervisor.test.ts or a new test file under packages/broker/test/, places a synthetic .env file where the host would load it, starts a host, and finds none of that file's synthetic values in the host's environment; it removes the file afterwards, and it fails against the code before your change. Subject: fix(broker): keep a stray .env file out of the PTY host environment
2. Item 3: quote the duplicate-event_id tests at packages/broker/test/publish-legality.test.ts:408 and packages/broker/test/incident-atomicity.test.ts:106 and the duplicate lookup they reach. Add a test, for publish and for publishIncident, in which the duplicate lookup itself fails, and assert the command is refused and nothing is appended; and a test that a refused duplicate builds no record and consumes no event id. Subject: test(broker): cover a failing duplicate lookup and a refused duplicate
3. Item 4: add a packages/pty-host test in which the PTY host's own environment holds a synthetic variable that the launch frame's environment does not, and assert the governed child's environment holds exactly the launch frame's environment. Subject: test(pty-host): pin the child environment to the launch frame
4. Item 7: quote the value-import checks of packages/broker/test/fencing.test.ts at lines 331 and 1498, whose pattern /^import\s+(?!type\b)/ passes an indented import. Make each check catch a value import at any indentation, with a test or assertion that an indented value import is caught. Subject: test(broker): catch indented value imports in the fencing checks
5. Item 8: quote the doctor tests of apps/madbridge/test/doctor.test.ts that check only the working directory or accept any check status. Make each assert the expected status of its check and that the doctor creates nothing in the home directory as well as the working directory. Subject: test(madbridge): assert doctor check statuses and both directories
6. Item 9: quote the test preflight creates nothing at packages/supervisor/test/preflight.test.ts:239. Make it record every path created inside the preflight's temporary location during the call, including paths removed before it returns, and assert there are none. If that cannot be done without a production change, halt. Subject: test(supervisor): see files preflight creates and removes
7. Item 10: add a test in packages/supervisor/test/preflight.test.ts in which the worktree is named through a symbolic link, and assert the result preflight gives for that case as the spec and the existing same-repository check define it. Subject: test(supervisor): cover a worktree named through a symbolic link

THE BUILD LOG
Create docs/verification/hardening-a-build-log.md in the first item's commit and append one section in each item's commit, before that commit is made: the item; the commit it built on; the files changed; each command with its exit status and its log's SHA-256; the tests added with their names and the file's passing count; the failing run's reason and the break, if any; deviations; and any halt with its class under B9. It holds no environment value, token, credential or key.

FINAL GATES
After the last item, each once, in order, in the foreground: the runtime check; bunx tsc --noEmit; bun test packages/broker, bun test packages/pty-host, bun test packages/supervisor and bun test apps/madbridge; bun test test/phase3a; bare bun test; git diff --check 68959cf27ee2652d4f9c3287cec4a5ee03798a7a; and git diff --name-only 68959cf27ee2652d4f9c3287cec4a5ee03798a7a, which lists only paths of DEC-20261102-02 B2 item 1. Each test run ends with 0 fail.

ATTRIBUTION AND COMMITS
One commit per item, in the order of THE WORK, the first with parent 68959cf27ee2652d4f9c3287cec4a5ee03798a7a. Each subject is the one THE WORK gives. Each body names the item, DEC-20261102-01 and DEC-20261102-02 and the files changed, and ends with the three trailers of ASSIGNED ROLE AND ATTRIBUTION as its final paragraph; every line is 72 characters or shorter. In every commit message and in the description, no line other than the three trailers in the final paragraph may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:; check each with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):'. Add no Co-authored-by or other line after the three trailers. Do not amend, rebase or squash.

DELIVERABLES
- The commits on build/hardening-a-r1.
- The pull request title, Hardening A: PTY host .env isolation and broker, pty-host, supervisor and doctor test hardening, and description, saved under /Users/michaeldaley/builds/hardening-a-r1-pr/ as pr-title.txt and pr-body.md. The description is plain text under 60,000 bytes: what and why for each item and path; for each item, the failing run, the break if any, and the gate results with each log's SHA-256; the final gates with each log's SHA-256; a table mapping each test to its item; limitations; not-run items, including that this MacBook does not run the Linux branch of any test and Verify on ubuntu-24.04 does; deviations; a pointer to the build log; and the three trailers as its final paragraph. It has zero square brackets and zero bare three-hyphen lines.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch, which must examine every commit, and in prbody mode on pr-body.md, and report both results.

HALTS (DEC-20261102-02 B9, closed)
Stop and report FOUNDER_DECISION_REQUIRED only when: a path outside B2 item 1 would change; item 9 needs a production change; item 1 needs a production change outside packages/broker/src/pty-host-supervisor.ts; a test fails in a run whose first load average was 2.0 or more; your session has loaded the hermes MCP server; or the binding base differs. Fix every other failure yourself under DEC-20261023-01 B4 and record it.

FINAL REPORT (in this order)
1. Harness, model, sandbox and approval settings, loaded MCP servers, git identity, and every runtime check.
2. Working directory, branch, HEAD, and the preconditions, each result with full SHAs and hashes.
3. The baseline, with the uptime before each run and each run's summary lines and log SHA-256.
4. For each item: what it relies on, the failing run verbatim, the break and restored SHA-256 if any, the change, the tests and counts, and the commit's full SHA and parent.
5. The final gates, with the uptime readings, each log's SHA-256 and the changed-path list.
6. The diff stat against 68959cf27ee2652d4f9c3287cec4a5ee03798a7a, the full diff of every production file, and the attribution-shaped-line check on each message and the description.
7. The SHA-256 of pr-title.txt, pr-body.md and the build log, and both attribution-shape-check results.
8. Deviations, or the word none.
9. The single next decision for the Founder: push build/hardening-a-r1 and open the draft pull request with the saved title and description.
