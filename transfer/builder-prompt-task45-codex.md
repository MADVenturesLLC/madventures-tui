STEP: Phase 3A Task 45, the nine pure-preflight steps of M20. Paste this as the first message of a new Codex session on the Ubuntu PC, started from inside the fresh full clone /home/michaeldaley/madventures-tui-m20-task45-r1 on the new branch build/m20-task45-r1, which the Founder's clone command created at the binding base 09340bfac348c9e0c03d7839d2bf45ba221f83c4.

You are the Task 45 builder for MADVenturesLLC/madventures-tui. You work in a Codex session on the Founder's Ubuntu PC. You implement plan Task 45 exactly as the governing acts rule, land it as one commit on build/m20-task45-r1, and stop with a report. You make no GitHub call: the Founder pushes the branch and opens the draft pull request.

FIRST: YOUR WORKING DIRECTORY
Run pwd. It must be /home/michaeldaley/madventures-tui-m20-task45-r1, and git branch --show-current must print build/m20-task45-r1. If either differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else.

ASSIGNED ROLE AND ATTRIBUTION (act E1)
Role-Id: builder
Actor-Id: session:codex/m20-task45-r1
Execution-Surface: codex
State, exactly as your harness shows them, the harness name and the model identifier. If the harness is not Codex, stop and report FOUNDER_DECISION_REQUIRED.

AUTHORITY
These documents on origin/main govern this work, in this order. Read all of them in full before your first edit:
1. docs/decisions/DEC-20261013-01-task45-execution-authorization.md, FOUNDER-ACT-20261013-TASK45-EXECUTION-AUTHORIZATION, SHA-256 fd6d9ad9cc014f2bead775929e3d133583113283b41b669099c18e17eba25d1d. It rules on every gap the plan leaves, fixes the scope in Part C, the verification in Part D, your binding in Part E and what is not authorized in Part F.
2. docs/decisions/DEC-20261013-05-claude-code-2-1-296.md, SHA-256 314b3fc57e7f6d8ff2ebf281429760a7461729c01d3aa2e0e4465b513795431e. Its B4 makes 09340bfac348c9e0c03d7839d2bf45ba221f83c4 the binding base of DEC-20261013-01, so D1 and D4 of that act use this commit. Its B1 makes Claude Code 2.1.296 the only supported version.
3. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7, B2, B4 and B6: the Linux test runtime and the known-failure set.
4. Plan Task 45 in docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md; spec docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md §§1.5, 2.1, 2.2, 5.1, 5.2, 5.5 and 9.13; docs/decisions/PLAN-OPEN-1-identity-authentication.md; and docs/decisions/PLAN-OPEN-2-environment-allowlists.md.
5. AGENTS.md.
The acts decide what you may change. This prompt only tells you how to work and what to report. If this prompt and an act disagree, the act wins; stop and report the disagreement. This host is Linux: use sha256sum. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256.

THE TEST RUNTIME (DEC-20261013-01 B9, DEC-20261013-03 B4)
Every test runs with the custodied binary at /home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun, by its full path. Call it QB below. Before the first test, confirm that sha256sum of QB is 0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb and that QB -e 'process.stdout.write(Bun.revision)' prints 69cb78c9097cebd3bdb832d9fff8b7d23abce09e. Do not copy it, put it on the system PATH or change it. bun install --frozen-lockfile and bunx tsc --noEmit use the Bun on PATH.

PRECONDITIONS (act D1; verify each, and report each result)
1. git fetch origin main. origin/main contains 09340bfac348c9e0c03d7839d2bf45ba221f83c4, and every path changed since that commit is under docs/. Report the SHA and every changed path. HEAD is 09340bfac348c9e0c03d7839d2bf45ba221f83c4 on the new branch build/m20-task45-r1, and the tree is clean.
2. DEC-20261013-01 and DEC-20261013-05 are on origin/main with the SHA-256 values above, Status ISSUED and signed.
3. At the binding base: the plan has SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2; PLAN-OPEN-1 d40682beb5a5c3f617638b1775f3777e25c66e12787b9269141164dcc3d9bc42; PLAN-OPEN-2 b60676aa47b216c36d9080c884650943cdac93dd12109d2864ebcf0eb6887d8c; the spec 2045c4ec33ef12a77fa03a922c66fa6d8c9035d4c8f8dfff7c23e47337c17e6c. On origin/main the spec may instead have 913a7b20b74cda89224e40a32866556d5375755dd9810d0ba9cdfbed068a5a27, once DEC-20261013-04 is filed; report which.
4. Neither packages/supervisor/src/preflight.ts nor packages/supervisor/src/attestation.ts exists at the binding base.
5. QB's identity matches THE TEST RUNTIME.

THE WORK
Follow DEC-20261013-01 in full: B1 to B7 for the design, Part C for the paths, D2 for the baseline, D3 for the RED proof and the breaks, D4 for the final checks, D5 for the description table, E3 for the commit. In particular:
- D2: run bun install --frozen-lockfile; bun.lock must stay byte-identical, with only the mode restore of packages/founder-act/src/main.ts to 100644 allowed and reported. Then bunx tsc --noEmit, QB test packages/supervisor and QB test. Record each verbatim with the host, both Bun versions, the user and your sandbox settings. Under B9, test 4 of the known-failure set is expected to fail as at the base, tests 5 and 6 must pass, a test of that set that passes is recorded, and every other failure or error is a stop.
- D3: write the tests first and record the RED failure verbatim. After the implementation passes, record one break per test file and, in addition, each of the nine named breaks, each with the test that failed; restore after each, confirm each file's SHA-256, and commit none of them.
- B7: bun.lock may change only by the lines bun install writes for the one new dependency edge; restore any other changed line.
- Only the eight paths of C1 change. One commit.

DO NOT (act Part F and this host)
- Make any GitHub call, push, open or comment on a pull request. git fetch is allowed.
- Run madbridge-claude-v5, claude, agy or any real provider executable, in a test or otherwise. Every probe test uses fixture executables under a disposable mkdtemp root.
- Install, upgrade or remove anything on the host, or change the system PATH, a shell profile or any host setting.
- Read anything under ~/.secrets, ~/.ssh, ~/.config/madventures or ~/.claude-madventures-v5, print any environment variable's value or any token, or run a command that lists processes.
- Change any path outside C1, any operating-system branch or the spec §1.5 table, PLAN-OPEN-1, PLAN-OPEN-2, the plan, a spec or a decision record.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when: your working directory or branch is wrong; your harness is not Codex; a precondition fails; QB's identity differs; bun install changes the tree beyond the mode restore and the B7 lock lines; a baseline or final failure falls outside B9; a deliberate break leaves every test passing and you cannot fix the assertion within C1; you would need to change a path outside C1 or do anything DO NOT forbids; or this prompt and an act disagree. A stop is a normal outcome. State what passed, what failed, what is unchanged, and the single next decision.

DELIVERABLES (act E4)
- One commit on build/m20-task45-r1 with the E3 subject, ending with the three E1 trailers, each line 72 characters or shorter.
- The PR title and description saved outside the clone, under /home/michaeldaley/task45-r1-pr/, as pr-title.txt and pr-body.md. The description carries the D5 table that maps B1 to B7 to the assertion or check that pins each and to the commit SHA; what and why; the eight paths; the D2, D3 and D4 results; not-run items; deviations; and the three trailers as its final paragraph. It has zero square brackets and zero bare three-hyphen lines, including the line that names your harness, which is plain text with no link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on pr-body.md, and report both results.

FINAL REPORT (in this order)
1. Harness and model, as your harness shows them.
2. Working directory, branch, and the preconditions, each result with full SHAs and hashes, and the host from uname -s.
3. The D2 baseline, verbatim, with host, both Bun versions, user and sandbox settings.
4. The D3 RED failure verbatim, then each break: what you changed, the test that failed, and the restored file's SHA-256.
5. The D4 results: tsc, the supervisor tests with exactly 22 in preflight.test.ts, attestation.test.ts, the protocol, storage and architecture tests, the full suite under B9, git diff --check, the changed-path list against 09340bfac348c9e0c03d7839d2bf45ba221f83c4, and the grep checks for mkdirSync, writeFileSync, new Ledger(, process.env and Date.now().
6. The commit: full SHA, the eight paths with their SHA-256 values, and the diff stat.
7. The bun.lock lines that changed, verbatim.
8. The D5 table.
9. The two files under /home/michaeldaley/task45-r1-pr/ with their SHA-256 values, and both attribution-shape-check results.
10. Deviations from this prompt or the acts, or the word none.
11. The single next decision for the Founder: pushing the branch and opening the draft pull request with your description.
