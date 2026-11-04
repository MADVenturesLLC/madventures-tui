STEP: file DEC-20261104-02 (M25's closing merge, Hardening F and the Task 58 rulings). Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261104-02-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261104-02-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261104-02-filing. Then run gh api user --jq .login. It must print daley40-lab. Then run git config user.name and git config user.email; they must print daley40-lab and 293512385+daley40-lab@users.noreply.github.com. If any differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. Run no process-listing command. Use no MCP server and start no other agent. Read nothing outside your own clone other than what this prompt names, and run no test.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261104-02-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261104-PHASE-3A-TASK-58 (DEC-20261104-02) on 2026-11-04, after pull request 222 merged. It records the merge at which M25 closed, finds that two deadlines of plan section 8.5 print no observed time, authorizes Hardening F to print them, and rules how Task 58 runs at the merge of Hardening F. Its C1 requires this filing to file it unchanged and to append one entry to the correction-round log.

AUTHORITY
Read AGENTS.md first, including its merge bullet as DEC-20261031-01 amended it, and B8 of docs/decisions/DEC-20261102-02-hardening-builds.md, which lets a filing session the Founder names push its branch and open its draft pull request as daley40-lab. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. After git fetch origin claude/awesome-cray-vqrzbt, read the act from the latest commit of origin/claude/awesome-cray-vqrzbt that touches transfer/DEC-20261104-02-hardening-f-and-task58.md, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- that path, and report that commit. Read it in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 27d8e83ceca252be753d7994872a3dca50494782, the merge of pull request 222, or a descendant whose changes since that commit touch no path under docs/decisions/, not docs/verification/phase-3a-correction-rounds.md, and not packages/pty-host/test/signals.test.ts. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261104-02-filing must not exist on origin.
2. The act has SHA-256 011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5, 132 lines, 17,262 bytes. If any value differs, stop.
3. Check the act with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero bare three-hyphen lines; zero runs of two or more underscores; zero lines ending in a space; zero square brackets; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals.
4. On origin/main docs/decisions/DEC-20261104-02-hardening-f-and-task58.md does not exist, and under docs/ the identifier DEC-20261104-02 appears nowhere. Any use is a stop.
5. Check the facts the act's Part A cites, and stop if any is false. With gh api and git, read-only:
   a. Pull request 222 is merged with merge commit 27d8e83ceca252be753d7994872a3dca50494782, whose parents, read with gh api repos/MADVenturesLLC/madventures-tui/git/commits/SHA, are fef6e64048c30e8df0ba9f44437fc077d8dcaf1e and, second, 1b84355fc18e814a74aa94714dc88a48963423b5.
   b. Issue comment 6642878999 exists on pull request 222, was posted by decivantiq, and its first line is MERGE AUTHORIZATION: MADVenturesLLC/madventures-tui#222. Quote its item 3.
   c. Review 5774848438 on pull request 222 was submitted by the Copilot reviewer, whose login begins copilot-pull-request-reviewer, and pull request 222 has no review comment.
   d. Run 41918839211 has head_sha 27d8e83ceca252be753d7994872a3dca50494782, event push, run_attempt 1 and conclusion success. Read the on block of each workflow in .github/workflows/ at that commit, and report which run on a push to main; the act says only the attribution-shape check does, so any other is a stop.
   e. At 27d8e83ceca252be753d7994872a3dca50494782, quote with git show and sed -n: lines 196, 203, 205, 213, 229, 241 and 242 of packages/pty-host/test/signals.test.ts; lines 1629 and 1630 of test/phase3a/spike/bun-terminal-spike.ts; and lines 101 and 108 to 115 of test/phase3a/spike/bun-terminal-spike.test.ts. Report the count of console. in packages/pty-host/test/signals.test.ts, which must be 0.
   f. At that commit test/phase3a/evidence-pipeline.test.ts exists, and no path under docs/verification/ contains host-certification.
   g. Line 52 of docs/decisions/DEC-20261102-04-hardening-records-and-hardening-c.md at that commit contains the sentence: Every other item of `DEC-20261102-01` B1 has merged in pull request 211 or 213. Quote the line.
   h. In docs/verification/phase-3a-correction-rounds.md on origin/main, quote the heading of its last entry, which must be ## Hardening E review verdict PASS (no rubric milestone, no round), confirm that an entry headed "## M25 review checkpoint closed (rubric milestone 1, count unchanged)" exists, and report that the file contains neither the string DEC-20261104-02 nor the string 27d8e83c.

ALLOWED SCOPE
One commit, exactly two paths:
  docs/decisions/DEC-20261104-02-hardening-f-and-task58.md (new, byte for byte from its transfer blob)
  docs/verification/phase-3a-correction-rounds.md (modified only by appending the text of THE LOG ENTRY at its end)
Before committing, git status --porcelain must list only those two paths.

THE LOG ENTRY
A pasted copy of this prompt can lose its line breaks and formatting, so take the text between the two marker lines from this prompt's copy on the transfer branch, transfer/filing-prompt-dec-20261104-02-macbook.md at the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, and report that commit. Append that text, without the marker lines, to the end of docs/verification/phase-3a-correction-rounds.md, preceded by exactly one blank line after the file's present last line, and ending with exactly one newline. Change no other byte of the file. Then show git diff of that file and confirm that every changed line is an added line at its end, and that the appended text has 7 lines and 454 bytes and SHA-256 ebe24f65c74f3a58f46fa535b8b994a18e56b390f1f2e4171885d270eddff7b2.
BEGIN LOG ENTRY
## M25 closing merge recorded (rubric milestone 1, count unchanged)

- **Recorded:** 2026-11-04, under `DEC-20261104-02` B1 and C1.
- **Plan milestone:** M25, Tasks 56 and 57. **Rubric milestone:** 1.
- **Closing merge:** `27d8e83ceca252be753d7994872a3dca50494782`, the merge of PR #222, which filed
  `DEC-20261104-01` and put the entry headed "M25 review checkpoint closed" on `main` under its B2.
- **Count:** rubric milestone 1's count is unchanged.
END LOG ENTRY

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting an act's signature or its trailer block. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261104-02, Hardening F and Task 58 rulings. The body says the Founder signed the act on 2026-11-04; that it records the merge at which M25 closed, finds that two deadlines of plan section 8.5 print no observed time, authorizes Hardening F, amends the last sentence of DEC-20261102-01 B4 for Task 58's own commit, and rules Task 58's certification runs and build; that it appends one entry to the correction-round log under its C1; that the act comes from the transfer commit you reported; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261104-02-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 222 with gh api repos/MADVenturesLLC/madventures-tui/pulls/222 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261104-02-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link, and do not write the Copilot reviewer's login in the body.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, gh is not daley40-lab, the git identity differs, a hash, line count or byte count differs, a transfer commit or blob is missing, main has moved outside precondition 1, the identifier or file name is already used under docs/, any fact in precondition 5 is false, the log file would change anywhere but its end, any path other than the two would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, the git identity, and the preconditions, each result with full SHAs, hashes, line and byte counts, and every quoted line.
2. The commit: full 40-character SHA, the two paths, the diff stat, the cmp result, and the git diff of the log file with the appended text's line count, byte count and SHA-256.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
