STEP: file DEC-20261013-03 (tests 4 to 6 ruling), its two reports and its two patches. Paste this as the first message of a new Claude Code session started with claude-agent on the Ubuntu PC from inside the fresh clone /home/michaeldaley/madventures-tui-tests-4-6-ruling-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for the tests 4 to 6 ruling in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's Ubuntu PC. Land the change as one commit on a branch named test/tests-4-6-ruling and open one DRAFT pull request.

FIRST: YOUR WORKING DIRECTORY
Run pwd. It must be /home/michaeldaley/madventures-tui-tests-4-6-ruling-filing. If it is not, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else; do not work in another directory.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-tests-4-6-ruling-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261013-TESTS-4-6-RULING on 2026-10-13. It records the causes of tests 4 to 6 on the Ubuntu PC, fixes the certification runtime for each operating system, ratifies a test patch that starts the PTY host in main-guard.test.ts with process.execPath and a docs patch to spec §1.5 and the tui-chaos README, and authorizes a later oracle build for test 4. Its part C1 says one pull request files the act and its two reports, applies both patches and changes nothing else. Its part C2 requires one run of main-guard.test.ts with the custodied Bun before the pull request opens. There is no rounds-log entry.

AUTHORITY
Read AGENTS.md first. This host is Linux: use sha256sum. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the three transfer inputs:
  git fetch origin claude/awesome-cray-vqrzbt
  git show 2d78e9725fb762d6260a28e46723e79fba06bdd1:transfer/DEC-20261013-03-tests-4-6-ruling.md
  git show 2d78e9725fb762d6260a28e46723e79fba06bdd1:transfer/main-guard-execpath.patch
  git show 2d78e9725fb762d6260a28e46723e79fba06bdd1:transfer/b6-docs.patch
Read the act in full before you write anything, especially B4, C1, C2 and Part D. Install nothing beyond bun install --frozen-lockfile in this clone, and run no test other than the one file named below.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 3f9b414c0ffcaf6955873f757cb55b97b2de77a1, or a descendant whose changes since that commit touch only paths under docs/ and packages/tui-chaos/test/review-corrections.test.ts. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch test/tests-4-6-ruling must not exist on origin.
2. At transfer commit 2d78e9725fb762d6260a28e46723e79fba06bdd1: transfer/DEC-20261013-03-tests-4-6-ruling.md has SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7, 81 lines, 10,801 bytes; transfer/main-guard-execpath.patch has SHA-256 dca529fac018306026164aca23fa49a35c13045666ac78494e2373d2646a2fe9, 1,013 bytes; transfer/b6-docs.patch has SHA-256 d9f6ed529ce0982aecf13be11e72ac3f497d80e2286d989c81bb06b1f52140f1, 3,048 bytes. If any differs, stop.
3. The act has Status ISSUED and the signature (Michael Daley, Date 2026-10-13, Actor-Id: founder), no square bracket, no bare three-hyphen line, no run of underscores, none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed", and the word DRAFT nowhere in capitals. Report each result.
4. The two reports exist outside the clone with these values. If either differs or is missing, stop.
   /home/michaeldaley/b3-root-cause-report/b3-final-report.md: SHA-256 f9949b42f66450794d8a258704c6434ea572124d61ea06452e7c97a6f62868e0, 134 lines, 11,305 bytes.
   /home/michaeldaley/macbook-b4-evidence/report/2026-10-12-tests-4-6-check-macbook.md: SHA-256 81ce3600135ed0ecc2db5ea02ca11952c1ae37d63948db1b57e795026fcd5768. Report its line and byte counts.
5. On origin/main: packages/pty-host/test/main-guard.test.ts has SHA-256 1880dc7b75f611c68b756ea2f7b00ac1c813ad241d859ea71033154dd2bcc6c0; docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md has 7a5ada083f5e29af397099eb307282242bc1d241ad091d75b8b010065debd286; packages/tui-chaos/README.md has 84de56723b4ff5d3a2bf42a7d7eb79ad518aec9f7fa563ab6255b3f5e345fb5c.
6. None of these exists on origin/main, and the identifier DEC-20261013-03 is not used by any file under docs/ on origin/main: docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, docs/verification/2026-10-13-tests-4-6-root-cause-ubuntu.md, docs/verification/2026-10-12-tests-4-6-check-macbook.md.
7. Check the facts the act cites. Stop and report if any is false: packages/broker/src/pty-host-supervisor.ts sets its Bun executable from process.execPath; packages/pty-host/test/eof-timer.test.ts and packages/pty-host/test/signals.test.ts start the host with process.execPath; main-guard.test.ts starts it with "bun" at exactly lines 73 and 118; packages/tui-chaos/README.md line 132 and the spec's Gate runtime paragraph name macos-14; and .github/actions/setup-qualified-bun/action.yml selects archives only for Linux-x86_64 and Darwin-arm64.
8. The custodied binary at /home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun has SHA-256 0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb, and running it with -e 'process.stdout.write(Bun.revision)' prints 69cb78c9097cebd3bdb832d9fff8b7d23abce09e. Run it read-only by its full path. Do not copy it, put it on PATH, or change it.
9. gh auth status shows the agent identity daley40-lab through GH_TOKEN. Run gh normally. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring, and never print a token. If this session has no agent identity, stop and report before any commit.

ALLOWED SCOPE
One commit, exactly six paths:
  docs/decisions/DEC-20261013-03-tests-4-6-ruling.md (new, byte for byte from the transfer blob)
  docs/verification/2026-10-13-tests-4-6-root-cause-ubuntu.md (new, byte for byte from /home/michaeldaley/b3-root-cause-report/b3-final-report.md)
  docs/verification/2026-10-12-tests-4-6-check-macbook.md (new, byte for byte from /home/michaeldaley/macbook-b4-evidence/report/2026-10-12-tests-4-6-check-macbook.md)
  packages/pty-host/test/main-guard.test.ts (changed only by main-guard-execpath.patch)
  docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md (changed only by b6-docs.patch)
  packages/tui-chaos/README.md (changed only by b6-docs.patch)

APPLYING THE PATCHES
Extract both patches to temporary files outside the clone. Run git apply --check on each, then git apply. Do not edit any hunk and do not regenerate either patch. Afterwards: main-guard.test.ts has SHA-256 9a91079bc4805e4898df2b4db8d382913d88468d4a9cd055534413b41879e118; the spec has 2045c4ec33ef12a77fa03a922c66fa6d8c9035d4c8f8dfff7c23e47337c17e6c; the README has 91b95df781d35afdd49fab08eeaa038b3503013468198e12a52185448322daa2; and git diff --check is clean. If git apply fails or any value differs, stop.

LOCAL CHECK (act C2)
Run bun install --frozen-lockfile with the bun on PATH; it must leave bun.lock byte-identical. If it turns packages/founder-act/src/main.ts to mode 100755 with no content change, restore 100644 and report it. Then, with the patch applied, run once:
  /home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun test packages/pty-host/test/main-guard.test.ts
Report the pass and fail counts and the duration. Every test in the file must pass; any failure is a stop. Before committing, git status --porcelain must list only the six allowed paths.

COMMIT AND PULL REQUEST
- Commit subject: test: start the PTY host on the test's own Bun and file DEC-20261013-03 with its reports. The body says the Founder signed DEC-20261013-03 on 2026-10-13; that it records test 4's cause as its Linux oracle under mawk with terminal output, and the cause of tests 5 and 6 as stock Bun 1.4.2 lacking the fix of upstream Bun pull request 40304, on which the production natural-exit path depends on Linux; that it fixes the certification runtime as stock Bun 1.4.2 on macOS and the custodied build of revision 69cb78c9097cebd3bdb832d9fff8b7d23abce09e on Linux; that it ratifies the patch with SHA-256 dca529fac018306026164aca23fa49a35c13045666ac78494e2373d2646a2fe9, which starts the host in main-guard.test.ts with process.execPath and changes no assertion or timeout, and the patch with SHA-256 d9f6ed529ce0982aecf13be11e72ac3f497d80e2286d989c81bb06b1f52140f1, which restates the spec's gate runtime and replaces two stale macos-14 names; that tests 5 and 6 leave the known-failure set and test 4 stays in it; that it files the root-cause report and the MacBook check report byte-identically; that it adds no round; that the act and patches come from transfer commit 2d78e9725fb762d6260a28e46723e79fba06bdd1; and that no other path changes. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. Report each hit and its classification. A hit that is an actual credential value is a stop.
- cmp each of the three filed files against its source, and report that the bytes match. Report the new SHA-256 of each patched file.
- Push the branch with git push -u origin test/tests-4-6-ruling. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp. The Founder will push the branch and then tell you to continue.
- Open a DRAFT pull request against main. Read the body of PR 142 with gh pr view 142 --json body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, a hash, line count or byte count differs, the transfer commit, a blob or a report is missing, the custodied binary's identity differs, git apply fails, bun install changes the tree beyond the mode restore, any test in main-guard.test.ts fails, the decision identifier or a target path is already used, any fact in precondition 7 is false, any path other than the six would change, git diff --check flags any line, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, and the preconditions, each result with full SHAs, hashes, line and byte counts, and the host from uname -s.
2. The commit: full 40-character SHA, the six paths, the diff stat, the three cmp results, and the new hash of each patched file.
3. The local check: bun install result, any mode restore, the custodied binary's identity, and main-guard.test.ts pass and fail counts and duration.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, and the count of square brackets in the body.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready under a separate authorization naming its head.
