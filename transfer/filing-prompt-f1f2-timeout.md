STEP: file DEC-20261013-02 (F1/F2 test timeout) and apply its patch. Paste this as the first message of a new Claude Code session started with claude-agent on the Ubuntu PC from inside the fresh clone /home/michaeldaley/madventures-tui-f1f2-timeout-filing, detached at origin/main (3f9b414c0ffcaf6955873f757cb55b97b2de77a1).

You are the filing session for the F1/F2 test timeout in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's Ubuntu PC. Land the change as one commit on a branch named test/f1f2-timeout and open one DRAFT pull request.

FIRST: YOUR WORKING DIRECTORY
Run pwd. It must be /home/michaeldaley/madventures-tui-f1f2-timeout-filing. If it is not, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else; do not work in another directory.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-f1f2-timeout-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261013-F1F2-TEST-TIMEOUT on 2026-10-13. The required check Verify (macOS) failed twice on pull request 143 because the F1/F2 mixed-selection test runs at the edge of Bun's default 5,000 ms per-test timeout. The act ratifies an exact patch that gives each of the three F1/F2 real-run tests in packages/tui-chaos/test/review-corrections.test.ts an explicit 30_000 ms timeout and changes nothing else. Its part C1 says one pull request files the act, applies the patch and changes nothing else. There is no rounds-log entry.

AUTHORITY
Read AGENTS.md first. This host is Linux: use sha256sum. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read both transfer inputs:
  git fetch origin claude/awesome-cray-vqrzbt
  git show 3370a1d2a00c8cc1e405bcf54c52454e37ed6c74:transfer/DEC-20261013-02-f1f2-test-timeout.md
  git show 3370a1d2a00c8cc1e405bcf54c52454e37ed6c74:transfer/f1f2-timeout.patch
Read the act in full before you write anything. Install nothing beyond bun install --frozen-lockfile in this clone, and run no test other than the one file named below.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. origin/main must be 3f9b414c0ffcaf6955873f757cb55b97b2de77a1, or a descendant that changed only paths under docs/ since that commit. If it moved, report the changed paths. Your branch starts from origin/main with a clean working tree. The branch test/f1f2-timeout must not exist on origin.
2. At transfer commit 3370a1d2a00c8cc1e405bcf54c52454e37ed6c74, transfer/DEC-20261013-02-f1f2-test-timeout.md has SHA-256 c8bc56bf1c716711e12ed38d6a7590108a80d0fb1f655d71d4b77f02b12acf26, 52 lines, 4,543 bytes, and transfer/f1f2-timeout.patch has SHA-256 ea8c2c955e16c6012e41edb82f9460fd87bd572d1c4369ace89f311634cee866, 1,027 bytes. If either differs, stop.
3. The act has Status ISSUED and the signature (Michael Daley, Date 2026-10-13, Actor-Id: founder), no square bracket, no bare three-hyphen line, no run of underscores, none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed", and the word DRAFT nowhere in capitals. Report each result.
4. On origin/main, packages/tui-chaos/test/review-corrections.test.ts has SHA-256 dce69aa2b9b7fb779201350433290f89a567cd2b0aba7e3aa975291dbf32b3a5.
5. docs/decisions/DEC-20261013-02-f1f2-test-timeout.md does not exist on origin/main, and the identifier DEC-20261013-02 is not used by any file under docs/ on origin/main.
6. Check the facts the act cites. Stop and report if any is false: with gh api, the check run named Verify (macOS) on PR 143's head 537a2b0a7437d3313946b39d8b4b6017dfcee047 has conclusion failure, and its annotations include a failure at packages/tui-chaos/test/review-corrections.test.ts line 174; and the three F1/F2 tests in that file on origin/main each end with a bare closing that sets no timeout.
7. gh auth status shows the agent identity daley40-lab through GH_TOKEN. Run gh normally. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring, and never print a token. If this session has no agent identity, stop and report before any commit.

ALLOWED SCOPE
One commit, exactly two paths:
  docs/decisions/DEC-20261013-02-f1f2-test-timeout.md (new, byte for byte from the transfer blob)
  packages/tui-chaos/test/review-corrections.test.ts (changed only by the patch)

APPLYING THE PATCH
Extract the patch to a temporary file outside the clone. Run git apply --check on it, then git apply. Do not edit any hunk and do not regenerate the patch. Afterwards the test file must have SHA-256 e6de132ffc4bcb4ffc97b3bd9b0a4a4a98d7e8c61bd43e5320ffb93acc77eac3, and git diff --check must be clean. If git apply fails or the value differs, stop.

LOCAL CHECK
Run bun install --frozen-lockfile; it must leave bun.lock byte-identical. If it turns packages/founder-act/src/main.ts to mode 100755 with no content change, restore 100644 and report it. Then run bun test packages/tui-chaos/test/review-corrections.test.ts once and report the pass and fail counts and the duration. All eight tests must pass; any failure is a stop. Before committing, git status --porcelain must list only the two allowed paths.

COMMIT AND PULL REQUEST
- Commit subject: test: give the F1/F2 real-run tests an explicit timeout and file DEC-20261013-02. The body says the Founder signed DEC-20261013-02 on 2026-10-13; that Verify (macOS) failed twice on pull request 143 because the F1/F2 mixed-selection test exceeded Bun's default 5,000 ms per-test timeout; that the act ratifies the patch with SHA-256 ea8c2c955e16c6012e41edb82f9460fd87bd572d1c4369ace89f311634cee866, which gives each of the three F1/F2 real-run tests an explicit 30_000 ms timeout and changes no assertion; that tests 4 to 6 of DEC-20261012-03 are untouched; that it adds no round; that the act and patch come from transfer commit 3370a1d2a00c8cc1e405bcf54c52454e37ed6c74; and that no other path changes. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit.
- cmp the committed act against the transfer blob, and report that the bytes match. Report the test file's new SHA-256.
- Push the branch with git push -u origin test/f1f2-timeout. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp. The Founder will push the branch and then tell you to continue.
- Open a DRAFT pull request against main. Read the body of PR 142 with gh pr view 142 --json body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch pull request 143, do not resolve threads, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, a hash, line count or byte count differs, the transfer commit or a blob is missing, git apply fails, bun install changes the tree beyond the mode restore, any of the eight tests fails, the decision identifier is already used, any fact in precondition 6 is false, any path other than the two would change, git diff --check flags any line, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, and the preconditions, each result with full SHAs, hashes, line and byte counts, and the host from uname -s.
2. The commit: full 40-character SHA, the two paths, the diff stat, the cmp result, and the test file's new hash.
3. The local check: bun install result, any mode restore, and the test file's pass and fail counts and duration.
4. attribution-shape-check results in pr and prbody modes.
5. The PR number, its head SHA and state, the checks that have started, and the count of square brackets in the body.
6. Deviations from this prompt, or the word none.
7. The single next decision for the Founder: marking the PR ready under a separate authorization naming its head.
