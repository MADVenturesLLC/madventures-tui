STEP: file DEC-20261012-04 (macOS runner migration) and apply its patch. Paste this as the first message of a new Claude Code session started with claude-agent on the MacBook, in the fresh clone /Users/michaeldaley/madventures-tui-runner-act-filing, detached at origin/main (03dda124e9d6faa59abda6a3817410bcdf1765f8).

You are the filing session for the macOS runner migration in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook, in the clone you were launched in. Land the change as one commit on a branch named ci/macos-runner-migration and open one DRAFT pull request.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-runner-act-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261012-MACOS-RUNNER-MIGRATION on 2026-10-12. It ratifies an exact patch that moves the two macOS CI jobs, Verify (macOS) and tui-chaos (macOS), from the macos-14 runner to macos-15, keeps their names and every step unchanged, and updates one comment and one sentence of CONTRIBUTING.md to match. Its part C1 says one pull request files the act, applies the patch to the three files, and changes nothing else. There is no rounds-log entry.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read both transfer inputs:
  git fetch origin claude/awesome-cray-vqrzbt
  git show 6a2eccefd9ccb63bafd9651d64ddc1cfd005103f:transfer/DEC-20261012-04-macos-runner-migration.md
  git show 6a2eccefd9ccb63bafd9651d64ddc1cfd005103f:transfer/macos-runner-migration.patch
Read the act in full before you write anything. Run no test, no install and no workflow. Install nothing.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. origin/main must be 03dda124e9d6faa59abda6a3817410bcdf1765f8, or a descendant that changed only paths under docs/ since that commit. If it moved, report the changed paths. Your branch starts from origin/main with a clean working tree. The branch ci/macos-runner-migration must not exist on origin.
2. At transfer commit 6a2eccefd9ccb63bafd9651d64ddc1cfd005103f, transfer/DEC-20261012-04-macos-runner-migration.md has SHA-256 ea9dafb0e2909e78d8eced8126992a40f346b7918cceb018aec6ed876a826cf3, 71 lines, 5,681 bytes, and transfer/macos-runner-migration.patch has SHA-256 73fc8f1532a41f7a2802790ea8bf0628db035ee961b39f9794d30ecfab647be5, 1,815 bytes. If either differs, stop.
3. The act has Status ISSUED and the signature (Michael Daley, Date 2026-10-12, Actor-Id: founder), no square bracket, no bare three-hyphen line, no run of underscores, none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed", and the word DRAFT nowhere in capitals. Report each result.
4. On origin/main the three files have these SHA-256 values, the act's "before" column:
   .github/workflows/verify.yml 0ab7899bc29b188dbfe65266416100dabf9a2e4813656f169d87996c3c731053
   .github/workflows/tui-chaos.yml 175ccf02e3371bfdb39cdad1a8365aab548333a8f3dc0455fb8dc95343064f9e
   CONTRIBUTING.md 0076434efea3a125903f65dc5c46a70f18ca7e27d7e47f2490ecb8fc0ccf8db0
5. docs/decisions/DEC-20261012-04-macos-runner-migration.md does not exist on origin/main, and the identifier DEC-20261012-04 is not used by any file under docs/ on origin/main.
6. Check the facts the act cites. Stop and report if any is false.
   - On origin/main, the job named Verify (macOS) in .github/workflows/verify.yml and the job named tui-chaos (macOS) in .github/workflows/tui-chaos.yml each have runs-on: macos-14, and no other workflow names macos-14.
   - .github/actions/setup-qualified-bun/action.yml on origin/main selects an archive only for Linux-x86_64 and Darwin-arm64, and exits with an error on any other platform.
   - CONTRIBUTING.md and AGENTS.md on origin/main name Verify (macOS) among the required checks.
7. gh auth status shows the agent identity daley40-lab through GH_TOKEN. Run gh normally. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring, and never print a token. If this session has no agent identity, stop and report before any commit.

ALLOWED SCOPE
One commit, exactly four paths:
  docs/decisions/DEC-20261012-04-macos-runner-migration.md (new, byte for byte from the transfer blob)
  .github/workflows/verify.yml, .github/workflows/tui-chaos.yml and CONTRIBUTING.md, changed only by the patch

APPLYING THE PATCH
Extract the patch to a temporary file outside the clone. Run git apply --check on it, then git apply. Do not edit any hunk and do not regenerate the patch. Afterwards the three files must have exactly these SHA-256 values, the act's "after" column:
   .github/workflows/verify.yml 7709f6011ecf77ef569983b868b513d788f57d026af38f47cbbdd9273c90a37c
   .github/workflows/tui-chaos.yml 91d2eb433926d50e27bf3922ff329ab37f36ff60c7d20bdcf9a081b11b72ac8f
   CONTRIBUTING.md f13e024d24cfcf2f0f4aaba39bd6b11b18bdee389fcbcf15f3e3ad78becd9781
Then confirm that no file under .github/, nor CONTRIBUTING.md or AGENTS.md, contains macos-14, and that git diff --check is clean. If git apply fails or any value differs, stop.

COMMIT AND PULL REQUEST
- Commit subject: ci: move the macOS jobs to macos-15 and file the runner migration act. The body says the Founder signed DEC-20261012-04 on 2026-10-12; that it ratifies the patch with SHA-256 73fc8f1532a41f7a2802790ea8bf0628db035ee961b39f9794d30ecfab647be5, which changes runs-on from macos-14 to macos-15 for the Verify (macOS) and tui-chaos (macOS) jobs, updates the comment in verify.yml that names the runner, and updates the CI sentence of CONTRIBUTING.md; that job ids, job names, steps, timeouts, pins and the Bun setup are unchanged; that the Intel lane stays undecided; that it adds no round and leaves the counts at 5 and 3; that the act and patch come from transfer commit 6a2eccefd9ccb63bafd9651d64ddc1cfd005103f; and that no other path changes. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit.
- cmp the committed act against the transfer blob, and report that the bytes match. Report the three files' new SHA-256 values.
- Push the branch with git push -u origin ci/macos-runner-migration. Do not force-push. This push changes workflow files, which GitHub may refuse for a token without workflow permission. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp. The Founder will push the branch and then tell you to continue.
- Open a DRAFT pull request against main. Read the body of PR 138 with gh pr view 138 --json body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- After the pull request is open, read its workflow runs with gh api, and for the Verify (macOS) and tui-chaos (macOS) jobs report each job's runner labels and its status at that moment. You need not wait for them to finish.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not resolve threads, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when a hash, line count or byte count differs, the transfer commit or a blob is missing, git apply fails, macos-14 remains in a checked file, the decision identifier is already used, any fact in precondition 6 is false, any path other than the four would change, git diff --check flags any line, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Preconditions, each result with full SHAs, hashes, line and byte counts, and the host from uname -sm.
2. The commit: full 40-character SHA, the four paths, the diff stat, the cmp result, and the three files' new hashes.
3. attribution-shape-check results in pr and prbody modes.
4. The PR number, its head SHA and state, the checks that have started, the runner labels and status of both macOS jobs, and the count of square brackets in the body.
5. Deviations from this prompt, or the word none.
6. The single next decision for the Founder: marking the PR ready under a separate authorization naming its head.
