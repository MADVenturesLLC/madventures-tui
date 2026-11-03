STEP: Task 57 of plan milestone M25 under DEC-20261103-02: the Claude Code surface investigation on the Founder's MacBook. Paste this as the first message of a new governed Codex session, started by the Founder with /Users/michaeldaley/builds/codex-governed from inside the fresh full clone /Users/michaeldaley/builds/madventures-tui-m25-task57-r1, on the new branch build/m25-task57-r1, which the Founder's clone command created at the binding base c11afdc7ce399aaac71766884c4036bb4b77bddd, the merge of the pull request that filed DEC-20261103-02. The Founder has confirmed in this session that /mcp lists no MCP server.

You are the builder of Task 57 for MADVenturesLLC/madventures-tui. You investigate one surface, claude-code, exactly as DEC-20261103-02 rules; you write one capability record outside the repository and one report and three tests inside it, in one commit on build/m25-task57-r1; and you stop with a report. You make no GitHub call: the Founder pushes the branch and opens the draft pull request.

FIRST: YOUR IDENTITY REPORT, BEFORE ANY OTHER STEP
In your first reply, report as your harness shows them the harness name, the model, your sandbox and approval settings, and every MCP server your session has loaded; run pwd, git branch --show-current, git rev-parse HEAD, git config user.name and git config user.email, which are part of this report; then run the runtime check of THE TEST RUNTIME and report its output. A field your harness does not show is recorded as not shown and is not a stop. Stop and report FOUNDER_DECISION_REQUIRED if the harness is not Codex CLI, any MCP server is loaded, the working directory is not /Users/michaeldaley/builds/madventures-tui-m25-task57-r1, the branch is not build/m25-task57-r1, HEAD is not c11afdc7ce399aaac71766884c4036bb4b77bddd, the git identity is not daley40-lab with 293512385+daley40-lab@users.noreply.github.com, or the runtime differs. Do not change your sandbox or approval settings yourself. When a command needs an approval or an escalation, ask the Founder in one line naming that command, as DEC-20261103-02 B10 requires, and ask for nothing else. Use no MCP server, start no other agent, run no memory lookup, and read no earlier session's memory, transcript or notes.

ASSIGNED ROLE AND ATTRIBUTION (DEC-20261103-02 B10 and E1)
Role-Id: builder
Actor-Id: session:codex/m25-task57-r1
Execution-Surface: codex

AUTHORITY
Read all of these at HEAD in full before your first edit, and confirm each SHA-256:
1. docs/decisions/DEC-20261103-02-task57-claude-code-investigation.md, SHA-256 387a6604ecba3b84d06d40586875f8d005876a89eb6a6f7a03beb4fccc3d1442. It is your authorization. Part B rules everything you do: B1 the one surface, B3 the rubric and how it is read, B4 the exact commands and their environment, B5 the models, B6 the record, B7 the report, B8 the tests, B9 that either verdict is a result, B10 your seat, B11 what may leave the MacBook and what you may read, B12 the closed list of halts. Part C is your only paths, Part D your checks, Part E your attribution and hand-off, Part G what is not authorized.
2. docs/decisions/DEC-20261015-04-task56-antigravity-investigation.md, SHA-256 1c9b9ca5ebdac214494d0ea7e5e2c0b9f493c53dfbc6ca7ff28e329dc95c2602, and docs/verification/2026-08-12-antigravity-surface-investigation.md, SHA-256 843ec841002370d033947ac45c1b2891da12ff059fea706732eda02a4f5c4d2c: the form of a formal investigation, its capture blocks and its Capability record section, which DEC-20261103-02 B7 refers to.
3. test/phase3a/evidence-pipeline.test.ts, SHA-256 85adc08e483e697351a3c423f341727103a1033f1ec5d74b2b57b2c03c70d20b at the base. Every existing byte stays; you append.
4. The plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2, Task 57 and sections 9 and 11.3; the spec, docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md, SHA-256 c09fe4849a4a61bf3e1494b77267020e00bd1d7b3015e3b2332ec5d71b07f769, sections 2.2 to 2.4, 4.2, 5.1, 5.2, 5.4 to 5.6, 6.6 and 9.13.
5. docs/decisions/PLAN-OPEN-1-identity-authentication.md, SHA-256 d40682beb5a5c3f617638b1775f3777e25c66e12787b9269141164dcc3d9bc42; docs/decisions/PLAN-OPEN-2-environment-allowlists.md, SHA-256 b60676aa47b216c36d9080c884650943cdac93dd12109d2864ebcf0eb6887d8c; docs/decisions/PLAN-OPEN-3-capability-horizon.md, SHA-256 cca3061b91ffc9eb231003f5e5d7c20230f47cf8c2378f6f1241d57309618562.
6. packages/supervisor/src/attestation.ts, SHA-256 3980e88cf5b92378a4f73636f490a3327a889993cb42d66d31ab4a3f86d16d38, for IDENTITY_PROBE_INPUT and parseAuthReadiness; packages/protocol/src/adapter-registry.ts, packages/protocol/src/capability-record.ts, packages/storage/src/capability-store.ts and packages/supervisor/src/preflight.ts at HEAD.
7. docs/decisions/DEC-20261023-01-standing-build-rules.md, SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5, Part B; docs/decisions/DEC-20261102-02-hardening-builds.md, SHA-256 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550, B4, the load rule; docs/decisions/DEC-20261103-01-hardening-c-records-and-hardening-d.md, SHA-256 43dc423e060b0e7ae04a0e7a0c302a5e38497cc212d704a5a37421d78aa1dd3a, B3 and B4; docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7, B2 item 1, the macOS runtime.
8. AGENTS.md, SHA-256 0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca.
The act decides what you may do. Apart from it, this prompt only tells you how to work and what to report. If this prompt and the act disagree, the act wins; stop and report the disagreement. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256.

THE TEST RUNTIME (DEC-20261013-03 B2 item 1, DEC-20261103-02 B10)
The macOS certification runtime on this host is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun or /Users/michaeldaley/bun-displaced-1.4.4. Change no PATH, profile or host setting, and install, upgrade or remove nothing on the host. Under that PATH, report command -v bun, command -v bunx, shasum -a 256 of the file command -v bun prints, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. Run this check before the baseline, before the investigation, and before the final bare bun test.

THE FOUNDER'S PRE-CHECK (DEC-20261103-02 D1 item 1, quoted verbatim)
Run by the Founder on 2026-11-03 on this MacBook:
=== launcher
-rwxr-xr-x@ 1 michaeldaley  staff  3869 Oct  8 06:24 /Users/michaeldaley/.local/bin/madbridge-claude-v5
realpath: /Users/michaeldaley/.local/bin/madbridge-claude-v5
/Users/michaeldaley/.local/bin/madbridge-claude-v5: POSIX shell script text executable, Unicode text, UTF-8 text
sha256: 6cb4ba9225161ffe303dd42f40d796752c200135a171052cbfa0a8934cc1cbb4
claude realpath: /Users/michaeldaley/.local/share/claude/versions/2.1.314
launcher is not the same file as ~/.local/bin/claude
claude program sha256: 21d6e7b9a6f07b4cfcb7df13760b3b72aa25e084e13a5354413382987ba832ed
passwd shell: /bin/zsh
account name: michaeldaley
=== in the seven-variable environment of DEC-20261103-02 B4
version: 2.1.314 (Claude Code)
{"loggedIn":true,"authMethod":"claude.ai","apiProvider":"firstParty","subscriptionType":"max","configDirectory":"/Users/michaeldaley/.claude-madventures-v5"}
Auto-updates: disabled (set by env: DISABLE_AUTOUPDATER)
Auto-update channel: latest
=== everyday install
Auto-updates: disabled (set by env: DISABLE_AUTOUPDATER)
Auto-update channel: latest
PRECHECK_DONE
The values above bind DEC-20261103-02 B12 item 2: L is /Users/michaeldaley/.local/bin/madbridge-claude-v5; R is /Users/michaeldaley/.local/bin/madbridge-claude-v5, its SHA-256 is 6cb4ba9225161ffe303dd42f40d796752c200135a171052cbfa0a8934cc1cbb4, and the version is 2.1.314 (Claude Code). The program line of the pre-check is the Founder's evidence only: under B11 you read nothing outside the clone but L, R and the paths B11 lists, so you do not hash or read that program. The SHELL of B4 is the passwd shell above, and USER is the account name above.

THE MODELS (DEC-20261103-02 B5)
M is claude-fable-5-1. A is fable. You choose neither and run no command to list models.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. origin/main is c11afdc7ce399aaac71766884c4036bb4b77bddd or a descendant whose changes since it touch no path of DEC-20261103-02 C1 and none of packages/protocol/, packages/storage/ or packages/supervisor/src/. Report the SHA and every changed path. HEAD is c11afdc7ce399aaac71766884c4036bb4b77bddd on the new branch build/m25-task57-r1 and the tree is clean. docs/verification/2026-08-12-surface-investigation-claude-code.md does not exist, and no file under docs/verification/ has a name beginning 2026-08-12-surface-investigation-.
2. The files of AUTHORITY have the SHA-256 given. DEC-20261103-02 has Status ISSUED and the founder signature.
3. uname -sm prints Darwin arm64.
4. Quote, with file and line: the claude-code registration's identity_probe.argv and supported_versions; IDENTITY_PROBE_INPUT; parseAuthReadiness; parseCapabilityRecord's registration checks; writeCapabilityRecord; and the lines of preflight.ts where the probes run and where a record is read.
5. Baseline under DEC-20261103-02 D2, each once, in the foreground: bun install --frozen-lockfile, bunx tsc --noEmit, bun test test/phase3a packages/protocol packages/storage packages/supervisor, and bare bun test, each with 0 fail; bun.lock stays byte-identical. If bun install sets the executable bit on packages/founder-act/src/main.ts, restore it with git checkout and record it each time; that is not a finding.

TEST OUTPUT AND LOAD (DEC-20261023-01 B6; DEC-20261102-02 B4)
Create the scratch root of DEC-20261103-02 B11 before the baseline: one directory made with mktemp -d, mode 0700. Pipe every test run's full output through tee into its own log file under the logs folder of that scratch root, named so that no log is overwritten, and report each log's SHA-256. Under item 3 of the Founder's merge authorization of pull request 218, B11's limits govern your own commands: Bun's install cache, which bun install writes, and the temporary files the test suites create and remove in the system temporary directory are not your reads or writes outside the clone. Record uptime before every test run; do not pause for the load. A test that fails unexpectedly in a run whose first load average was 2.0 or more is not rerun: halt with that reading. The intended failure of the RED run or of a deliberate break is not such a failure. Never rerun a failed run unchanged to obtain a pass. No known-failure set applies (DEC-20261103-01 B4).

THE WORK (one commit, in this order)
1. Tests first (B8). Append to test/phase3a/evidence-pipeline.test.ts exactly the three tests of plan Task 57 Step 1, with exactly those names, and any helpers they need, after the existing content; only the import statements may gain names. Run bun test test/phase3a/evidence-pipeline.test.ts -t "every investigated surface has both a capability record and a committed report" and record the RED verbatim: the derived surface list is empty.
2. The scratch root (B11). Keep in the scratch root you created before the baseline, and only there, the logs, the runner, the redacted captures, the TMPDIR and empty working directory of B4, and the record script. Never read, print or keep an unredacted capture.
3. The runner (B4, B7 item 2). Write it in TypeScript, run by the macOS runtime. It runs the eighteen commands of B4 exactly once and in order; it gives each command that runs L exactly the seven variables of B4 and nothing else, with the working directory of B4, stdin as B4 says, and a 120-second limit; it records exit status, signal, duration and whether it ended the command; it applies the three redaction rules of B7 item 2 in memory before writing each stream to a file, and counts redactions per rule. After B4 items 1 to 5, it compares R, the SHA-256 and the version they print with THE FOUNDER'S PRE-CHECK, and stops before B4 item 6 if any differs. Show the runner in full in the session, then ask the Founder in one line to approve running it.
4. Run it once. Then read each redacted capture and check every halt of B12 before going on. If any halt applies, stop.
5. The record (B6). Build it in the record script from the captures, with every field B6 sets, including overall as B6 item 7 composes it and the role fields as B6 item 8 sets them. Parse it with parseCapabilityRecord. Ask the Founder in one line to approve the write, then write it once with writeCapabilityRecord under the default storage root of spec section 5.1 with no MADV_STORAGE_DIR, and report the stored file's path and SHA-256.
6. The report (B7). Write docs/verification/2026-08-12-surface-investigation-claude-code.md with every field of plan section 9.3 and every item of B7, the captures in the form B7 item 1 gives, and the Capability record section of B7 item 6.
7. GREEN and breaks (D3, D4). Run the three tests and show them passing; make the three deliberate breaks of D3, each shown with git diff, failing its test, restored, with the restored file's SHA-256 equal to the original's; then run the final checks of D4.
8. Commit only the two paths of C1. Subject: docs(verification): record Founder-approved alternative surface investigations. The body names Task 57, DEC-20261103-02 and the two paths, states the overall verdict in one line, and ends with the three trailers of ASSIGNED ROLE AND ATTRIBUTION as its final paragraph; every line is 72 characters or shorter. No line other than those trailers may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:; check with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):'. Add no Co-authored-by or other line after the trailers. Do not amend, rebase or squash.

DELIVERABLES (DEC-20261103-02 D5, E3)
- The commit on build/m25-task57-r1.
- The pull request title, Task 57: Claude Code surface investigation, and description, saved under /Users/michaeldaley/builds/m25-task57-r1-pr/ as pr-title.txt and pr-body.md. The description is plain text under 60,000 bytes: what and why; the overall verdict and the clause-by-clause verdict of B7 item 3; the table of D5 mapping each of B3 to B9 to the report section or assertion that pins it; the stored record's path and SHA-256; the RED, the three breaks with restored SHA-256s, and the final checks with each log's SHA-256; limitations; not-run items; deviations; and the three trailers as its final paragraph. It has zero square brackets and zero bare three-hyphen lines.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on pr-body.md, and report both results.

HALTS (DEC-20261103-02 B12, closed)
Stop and report FOUNDER_DECISION_REQUIRED only for a halt of B12. The investigation's verdict is never a halt. Fix every other failure yourself under DEC-20261023-01 Part B and record it; anything Part B makes a stop stays a stop.

FINAL REPORT (in this order)
1. Harness, model, sandbox and approval settings, loaded MCP servers, git identity, and every runtime check.
2. Working directory, branch, HEAD, and the preconditions, each result with full SHAs, hashes and quotes.
3. The baseline, with the uptime before each run and each run's summary lines and log SHA-256.
4. The runner as run, its SHA-256, and for each of the eighteen commands its exit status, signal, duration and stream byte counts; the redaction counts per rule.
5. The verdict on each passing clause of spec section 2.2 with the items and fields it rests on, the auth-readiness result, and overall.
6. The stored record's path, filename and SHA-256.
7. The RED, the three breaks and the final checks, with each log's SHA-256.
8. The commit's full SHA and parent, the diff stat against c11afdc7ce399aaac71766884c4036bb4b77bddd, and the attribution-shaped-line check.
9. The SHA-256 of pr-title.txt, pr-body.md and the report, and both attribution-shape-check results.
10. Deviations, or the word none.
11. The single next decision for the Founder: run the record-hash check of DEC-20261103-02 E2, push build/m25-task57-r1 and open the draft pull request with the saved title and description.
