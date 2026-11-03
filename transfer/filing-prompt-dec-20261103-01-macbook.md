STEP: file DEC-20261103-01 (the Hardening C records and Hardening D). Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261103-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261103-01-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261103-01-filing. Then run gh api user --jq .login. It must print daley40-lab. Then run git config user.name and git config user.email; they must print daley40-lab and 293512385+daley40-lab@users.noreply.github.com. If any differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. Run no process-listing command. Use no MCP server and start no other agent.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261103-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261103-PHASE-3A-HARDENING-D (DEC-20261103-01) on 2026-11-03, after pull request 215 merged Hardening C. It enters the Tier-2 verdict of pull request 215 in the correction-round log, rules on its findings, fixes the launch of governed Codex sessions, closes the known-failure set on every host, and authorizes Hardening D on the Ubuntu PC. Its C1 requires this filing to append one entry to the correction-round log.

AUTHORITY
Read AGENTS.md first, including its merge bullet as DEC-20261031-01 amended it. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the act after git fetch origin claude/awesome-cray-vqrzbt, from the latest commit of origin/claude/awesome-cray-vqrzbt that touches transfer/DEC-20261103-01-hardening-c-records-and-hardening-d.md, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- transfer/DEC-20261103-01-hardening-c-records-and-hardening-d.md; report that commit. Read it in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be b0722bf0bf6ae81c78ea14443a01add32880554a, the merge of pull request 215, or a descendant whose changes since that commit touch no path under docs/verification/, packages/, apps/ or test/, and add no file whose name begins DEC-20261103-01. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261103-01-filing must not exist on origin.
2. The act has SHA-256 43dc423e060b0e7ae04a0e7a0c302a5e38497cc212d704a5a37421d78aa1dd3a, 82 lines, 15,132 bytes. If any value differs, stop.
3. Check the act with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero square brackets; zero bare three-hyphen lines; zero runs of two or more underscores; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals.
4. On origin/main the file docs/decisions/DEC-20261103-01-hardening-c-records-and-hardening-d.md does not exist, and under docs/ the identifier DEC-20261103-01 appears nowhere. Any use is a stop.
5. Check the facts the act's Part A cites, and stop if any is false. With gh api, read-only:
   a. Pull request 215 is merged with merge commit b0722bf0bf6ae81c78ea14443a01add32880554a, whose second parent, read with gh api repos/MADVenturesLLC/madventures-tui/git/commits/SHA, is 038b995de6deee7c67df90276c36d9a8fbb3526e.
   b. Issue comments 6595656310 and 6595656646 exist on pull request 215, were posted by decivantiq, and have first lines beginning TIER-2 REVIEW VERDICT and TIER-2 REVIEW VERDICT, CONTINUED.
   c. For comment 6595656310, report its Head reviewed line and its Report SHA-256 line, and confirm the head and SHA-256 equal those THE LOG ENTRIES give.
   d. Review 5747403656 on pull request 215 was submitted by copilot-pull-request-reviewer and pull request 215 has no review comment.
   e. Run 41569931179 has head_sha 038b995de6deee7c67df90276c36d9a8fbb3526e and run_attempt 2.
   f. In docs/verification/phase-3a-correction-rounds.md on origin/main, quote the heading of its last entry, and report that the file does not contain the string PR #215.

ALLOWED SCOPE
One commit, exactly two paths:
  docs/decisions/DEC-20261103-01-hardening-c-records-and-hardening-d.md (new, byte for byte from its transfer blob)
  docs/verification/phase-3a-correction-rounds.md (modified only by appending the text of THE LOG ENTRIES at its end)
Before committing, git status --porcelain must list only those two paths.

THE LOG ENTRIES
A pasted copy of this prompt can lose its line breaks and formatting, so take the text between the two marker lines from this prompt's copy on the transfer branch, transfer/filing-prompt-dec-20261103-01-macbook.md at the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, and report that commit. Append that text, without the marker lines, to the end of docs/verification/phase-3a-correction-rounds.md, preceded by exactly one blank line after the file's present last line, and ending with exactly one newline. Change no other byte of the file. Then show git diff of that file and confirm that every changed line is an added line at its end, and that the appended text has 18 lines and 1,361 bytes and SHA-256 47f04c1ba1d8711935c0698de86fae983e7d961c1d2a2126cf3e089a1929b60c.
BEGIN LOG ENTRIES
## Hardening C review verdict PASS (no rubric milestone, no round)

- **Recorded:** 2026-11-03, under `DEC-20261103-01` B1 and C1.
- **Plan milestone:** none; Hardening C of `DEC-20261102-04` B5, the acknowledgement deadline of
  `escalateWedgedHost` and the calibration of the temporary-path recorder, not a plan task.
  **Rubric milestone:** none.
- **Head reviewed:** `038b995de6deee7c67df90276c36d9a8fbb3526e` on PR #215, built by
  `session:codex/hardening-c-r1`.
- **Reviewer:** `antigravity`, a fresh session on Antigravity on the Founder's MacBook, started with
  Gemini 4. The harness did not show the model.
- **Verdict text SHA-256:** `4c1c8ed99751da227932846338388f8f28b988120665235c2f2f18043e67121f`, 62,094
  bytes, 800 lines, saved at `/Users/michaeldaley/builds/review-pr215-r1.md`, posted on PR #215 as
  comments 6595656310 and 6595656646 by `decivantiq`.
- **Result:** PASS, four advisory findings; three are taken into Hardening D and one is closed under
  `DEC-20261103-01` B2. The report's description of the deadline test and two of its quotations of
  `DEC-20261102-04` are inaccurate, as `DEC-20261103-01` A2 item 2 records; the Founder accepted the PASS
  on the runs its logs record. **Counted:** no round. Rubric milestone 10's total stays at **2**. Merged
  at `b0722bf0bf6ae81c78ea14443a01add32880554a` under `DEC-20261102-02` B7.
END LOG ENTRIES

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting the act's signature or its trailer block. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261103-01, Hardening C records and Hardening D. The body says the Founder signed the act on 2026-11-03; that it enters the Tier-2 verdict of pull request 215, rules on its findings, fixes the launch of governed Codex sessions, closes the known-failure set on every host, and authorizes Hardening D on the Ubuntu PC; that it appends one entry to the correction-round log under its C1; that the act's text comes from the transfer commit you reported; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261103-01-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 214 with gh api repos/MADVenturesLLC/madventures-tui/pulls/214 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261103-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, gh is not daley40-lab, the git identity differs, a hash, line count or byte count differs, the transfer commit or blob is missing, main has moved outside precondition 1, the identifier is already used under docs/, any fact in precondition 5 is false, the log file would change anywhere but its end, any path other than the two would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, the git identity, and the preconditions, each result with full SHAs, hashes, line and byte counts.
2. The commit: full 40-character SHA, the two paths, the diff stat, the cmp result, and the git diff of the log file with the appended text's line count, byte count and SHA-256.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
