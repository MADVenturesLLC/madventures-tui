STEP: file DEC-20261015-04 (Task 56 execution authorization) and DEC-20261015-05 (Phase 3A process). Paste this as the first message of a new Claude Code session started on the Founder's MacBook, after loading the agent environment file the launcher uses, from inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261015-04-05-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for two Founder acts in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261015-04-05-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261015-04-05-filing. If it is not, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else; do not work in another directory.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261015-04-05-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261015-TASK56-EXECUTION-AUTHORIZATION (DEC-20261015-04) and FOUNDER-ACT-20261015-PHASE-3A-PROCESS (DEC-20261015-05) on 2026-10-15. DEC-20261015-04 authorizes plan Task 56, the formal Antigravity surface investigation, on the MacBook. DEC-20261015-05 lets one act cover a milestone's tasks, folds milestone closures into the next act, lets one docs pull request file several acts, replaces the ready-for-review authorization comment with a guarded ready command, and allows parallel lanes. C1 of DEC-20261015-05 directs one docs-only pull request that files both acts byte for byte and changes nothing else.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the transfer inputs after git fetch origin claude/awesome-cray-vqrzbt:
  git show d1b9aaa63ccd0db4ba2eeda980ac64b0f35cb991:transfer/DEC-20261015-04-task56-antigravity-investigation.md
  git show d1b9aaa63ccd0db4ba2eeda980ac64b0f35cb991:transfer/DEC-20261015-05-phase-3a-process.md
Read both acts in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 1ee5a1d5c37fb2c1a77f8b9bf952179c3530f438, the merge of pull request 153, or a descendant whose changes since that commit touch only paths under docs/. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261015-04-05-filing must not exist on origin.
2. The transfer inputs have these values; if any differs, stop:
   - DEC-20261015-04: SHA-256 1c9b9ca5ebdac214494d0ea7e5e2c0b9f493c53dfbc6ca7ff28e329dc95c2602, 137 lines, 15,245 bytes.
   - DEC-20261015-05: SHA-256 7cecc6c1d08a2a199bc12b1677e77641fd6b9757df2f17351602e58bebd19e43, 72 lines, 6,529 bytes.
3. Each act has Status ISSUED and the signature (Michael Daley, a Date, and the founder Actor-Id line); no square bracket, no bare three-hyphen line, no run of underscores, none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed", and the word DRAFT nowhere in capitals. Report each result.
4. On origin/main neither new decision file exists, and under docs/ the identifiers DEC-20261015-04 and DEC-20261015-05 appear nowhere. Report every use you find. Any use is a stop.
5. Check the facts the acts cite, and quote what you rely on; stop if any is false:
   - every decision record named in either act's header exists on origin/main with the SHA-256 the header gives;
   - plan section 4 makes M25 depend on M15 and M16, and places Tasks 24 and 25 after M21 and before M22;
   - spec section 5.5 says no capability record is written on Linux under DEC-20261010-02 B5;
   - from 2026-10-01 to 1ee5a1d5c37fb2c1a77f8b9bf952179c3530f438, git log --merges --since=2026-10-01 counts 43 merge commits, of which exactly 30 change only paths under docs/ against their first parent.
6. gh api user --jq .login prints daley40-lab, with GH_TOKEN set as the session provides it. Do not run gh auth status, and never print a token or any part of one. Run gh normally. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. If this session has no agent identity, stop and report before any commit.

ALLOWED SCOPE
One commit, exactly two paths, each new and byte for byte from its transfer blob:
  docs/decisions/DEC-20261015-04-task56-antigravity-investigation.md
  docs/decisions/DEC-20261015-05-phase-3a-process.md
Before committing, git status --porcelain must list only those two paths.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting an act's signature or the attribution block of DEC-20261015-04 E1. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261015-04 and DEC-20261015-05. The body says the Founder signed both acts on 2026-10-15; that DEC-20261015-04 authorizes Task 56 on the MacBook; that DEC-20261015-05 changes how acts are filed and pull requests readied and merged; that the texts come from transfer commit d1b9aaa63ccd0db4ba2eeda980ac64b0f35cb991; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp each committed act against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261015-04-05-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp. The Founder will push the branch and then tell you to continue.
- Open a draft pull request against main. Read the body of PR 153 with gh api repos/MADVenturesLLC/madventures-tui/pulls/153 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261015-04-05-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, a hash, line count or byte count differs, a transfer commit or blob is missing, main has moved outside precondition 1, a decision identifier is already used under docs/, any fact in precondition 5 is false, any path other than the two would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, and the preconditions, each result with full SHAs, hashes, line and byte counts, and the host from uname -s, which must be Darwin.
2. The commit: full 40-character SHA, the two paths, the diff stat and the two cmp results.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, and the count of square brackets in the body.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
