STEP: file DEC-20261106-02 and DEC-20261107-01. Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261107-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for two Founder acts in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261107-01-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261107-01-filing. Then run gh api user --jq .login. It must print daley40-lab. Then run git config user.name and git config user.email; they must print daley40-lab and 293512385+daley40-lab@users.noreply.github.com. If any differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. Run no process-listing command. Use no MCP server and start no other agent. Read nothing outside your own clone other than what this prompt names, and run no test.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261107-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261106-PHASE-3A-FINAL-MERGE-REVIEW (DEC-20261106-02) on 2026-11-06. It is the final merge review of plan Task 59: it accepted Task 59's Tier-2 verdict, gave a disposition for each of the seventeen items of spec section 6.8, carried the reviewer's advisory finding and Copilot's three findings to the first Phase 3B act, and authorized the merge of pull request 228 at 1d5438202c88f6b76b3b0e3746ac36d9416e7ad2. Pull request 228 merged under it. Its C1 files it unchanged with the act that records that merge. The Founder then signed FOUNDER-ACT-20261107-PHASE-3A-TASK59-RECORDS (DEC-20261107-01) on 2026-11-07. It enters Task 59's verdict and merge, closes M26, and records Phase 3A as merged, not certified. Its B5 has this one pull request file both acts unchanged and append two entries to the correction-round log.

AUTHORITY
Read AGENTS.md first, including its merge bullet as DEC-20261031-01 amended it, and B8 of docs/decisions/DEC-20261102-02-hardening-builds.md, which lets a filing session the Founder names push its branch and open its draft pull request as daley40-lab. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. After git fetch origin claude/awesome-cray-vqrzbt, read each text from the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- PATH, and report each commit:
- DEC-20261106-02: transfer/DEC-20261106-02-phase-3a-final-merge-review.md, at transfer commit 21d552dd2e12d59b3f252bbe53624aff0a9104a2
- DEC-20261107-01: transfer/DEC-20261107-01-task59-records-and-phase-3a-merge.md
Read both in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be a7dbc7def0cd67568b2765c894ff91894707801c, the merge of pull request 228, or a descendant whose changes since that commit touch no path under docs/decisions/ and not docs/verification/phase-3a-correction-rounds.md. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261107-01-filing must not exist on origin.
2. Each text has this SHA-256, line count and byte count; if any value differs, stop:
   DEC-20261106-02: 0f627edf90f68d93585bed5b81314b36782c797d8d940dbc7e608d191f391dfb, 107 lines, 13,835 bytes.
   DEC-20261107-01: ec96bcfb7205be972d4b78f890e8a902efd738ed8eb216645eab1babe1ebc143, 69 lines, 6,605 bytes.
3. Check each of the two texts with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero bare three-hyphen lines; zero runs of two or more underscores; zero lines ending in a space; zero square brackets; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals.
4. On origin/main neither of the two new target paths of ALLOWED SCOPE exists, and under docs/ neither DEC-20261106-02 nor DEC-20261107-01 appears anywhere. Any use is a stop.
5. Check the facts the two acts' Parts A cite, and stop if any is false. With gh api and git, read-only:
   a. Pull request 228 is merged with merge commit a7dbc7def0cd67568b2765c894ff91894707801c, whose parents, read with gh api repos/MADVenturesLLC/madventures-tui/git/commits/SHA, are 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e and, second, 1d5438202c88f6b76b3b0e3746ac36d9416e7ad2, and its changed paths against the first parent are exactly docs/verification/2026-08-12-phase-3a-merge-gate.md and test/phase3a/architecture-phase3a.test.ts. The parent of 1d5438202c88f6b76b3b0e3746ac36d9416e7ad2 is 9b377bb365c6ba416c5b5fd9b504a6f9a194a74e.
   b. Issue comment 6695108029 exists on pull request 228, was posted by decivantiq, and its first line is TIER-2 REVIEW VERDICT: MADVenturesLLC/madventures-tui#228. Report its Head reviewed, Verdict and Report SHA-256 lines, and confirm that the head, the SHA-256, the 806 lines and the 52233 bytes equal those LOG ENTRY 1 gives.
   c. Issue comment 6700667496 exists on pull request 228, was posted by decivantiq, and its first line is MERGE AUTHORIZATION: MADVenturesLLC/madventures-tui#228. Confirm that it contains the line Governing act: DEC-20261106-02, the final merge review of Phase 3A, SHA-256 0f627edf90f68d93585bed5b81314b36782c797d8d940dbc7e608d191f391dfb.
   d. Review 5806819018 on pull request 228 was submitted by the Copilot reviewer, whose login begins copilot-pull-request-reviewer, at commit 1d5438202c88f6b76b3b0e3746ac36d9416e7ad2. Pull request 228 has exactly three review comments, 4497468572, 4497468630 and 4497468674, and all three threads are resolved; read the thread state with gh api graphql.
   e. Runs 42292059967, 42292060601, 42292061379 and 42292061446 each have head_sha 1d5438202c88f6b76b3b0e3746ac36d9416e7ad2, run_attempt 2 and conclusion success. Run 42327890659 has head_sha a7dbc7def0cd67568b2765c894ff91894707801c, event push and conclusion success. Runs 42327889855 and 42327889958 have that head_sha and conclusion success.
   f. In docs/verification/phase-3a-correction-rounds.md on origin/main, quote the heading of its last entry, which must be ## Task 58 review verdict PASS (rubric milestones 2 and 10, no round, recorded after the merge), and report that the file contains none of the strings PR #228, DEC-20261106-02 and DEC-20261107-01.

ALLOWED SCOPE
One commit, exactly three paths:
  docs/decisions/DEC-20261106-02-phase-3a-final-merge-review.md (new, byte for byte from its transfer blob)
  docs/decisions/DEC-20261107-01-task59-records-and-phase-3a-merge.md (new, byte for byte from its transfer blob)
  docs/verification/phase-3a-correction-rounds.md (modified only by appending the two entries of THE LOG ENTRIES at its end)
Before committing, git status --porcelain must list only those three paths.

THE LOG ENTRIES
A pasted copy of this prompt can lose its line breaks and formatting, so take the text between each pair of marker lines from this prompt's copy on the transfer branch, transfer/filing-prompt-dec-20261107-01-macbook.md at the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, and report that commit. Append to the end of docs/verification/phase-3a-correction-rounds.md, after its present last line: exactly one blank line, then the text of LOG ENTRY 1 without its marker lines, then exactly one blank line, then the text of LOG ENTRY 2 without its marker lines, ending with exactly one newline. Change no other byte of the file. Then show git diff of that file and confirm that every changed line is an added line at its end. Report each entry's line count, byte count and SHA-256 as appended: LOG ENTRY 1 has 18 lines, 1,405 bytes and SHA-256 f2d3e6ffd2137cfc5163d78f056b578b6c2bf361c0707b59457d9d4f14941739; LOG ENTRY 2 has 17 lines, 1,240 bytes and SHA-256 9e1b3638af47d0f14c17e09fc288b880e3c4103ee4fd85eca332412f5386b7b6. LOG ENTRY 1 contains a middle dot (U+00B7) in Gemini 4 Argon · high, and LOG ENTRY 2 contains two section signs (U+00A7); keep each as that one character.
BEGIN LOG ENTRY 1
## Task 59 review verdict PASS (rubric milestones 2 and 10, no round, recorded after the merge)

- **Recorded:** 2026-11-07, under `DEC-20261107-01` B1, B2 and C1.
- **Plan milestone:** M26, Task 59. **Rubric milestones:** 2 and 10.
- **Head reviewed:** `1d5438202c88f6b76b3b0e3746ac36d9416e7ad2` on PR #228, built by
  `session:claude-code/m26-task59-r1` under `DEC-20261106-01` B5.
- **Reviewer:** `antigravity`, a fresh session in the Antigravity command line on the Founder's
  MacBook, with Gemini 4 Argon · high selected in the harness.
- **Verdict text SHA-256:** `5baf1774da6d769c0ea054f0c7227d89dd67e189d654050ecb3c1bea79dfe091`, 52,233
  bytes, 806 lines, saved at `/Users/michaeldaley/builds/review-pr228-r1.md`, posted on PR #228 as
  comment 6695108029 by `decivantiq`.
- **Result:** PASS, no substantive finding, one advisory finding: if the test-only harness skips
  closing a fixture session's ledger, all six tests still pass. Copilot's comments 4497468572,
  4497468630 and 4497468674 were answered by `DEC-20261106-02` B5. **Counted:** no round. Rubric
  milestone 2's count is unchanged, and Claude Code's count under rubric milestone 10 stays at 0.
  Approved under `DEC-20261106-02` B7, the final merge review, and merged at
  `a7dbc7def0cd67568b2765c894ff91894707801c`. The advisory finding and Copilot's three findings are
  carried to the first Phase 3B act under its B2 and B5.
END LOG ENTRY 1
BEGIN LOG ENTRY 2
## M26 review checkpoint closed and Phase 3A merged (rubric milestones 2 and 10, count unchanged)

- **Recorded:** 2026-11-07, under `DEC-20261107-01` B3, B4 and C1.
- **Plan milestone:** M26, Tasks 58 and 59. **Rubric milestones:** 2 and 10.
- **Closed at:** the merge of the pull request that files `DEC-20261107-01`, on the Task 58 and Task 59
  entries above.
- **Count:** rubric milestones 2 and 10 keep their counts.
- **Phase 3A merged:** at `a7dbc7def0cd67568b2765c894ff91894707801c`, the merge of PR #228, with
  `1d5438202c88f6b76b3b0e3746ac36d9416e7ad2` approved as the candidate SHA by `DEC-20261106-02` B7.
  This records a merge, not a certification: production `start` still returns
  `live_runtime_not_certified`, and removing the gate is a Phase 3B certification event under spec
  §4.2 and §6.9.
- **Carried to Phase 3B (act B3):** the items quoted in section 6 of the Task 59 evidence; the
  residual census detects a fixture ledger left open before its storage is removed (`DEC-20261106-02`
  B2); item 13's check covers the whole module set the shipped entry point loads for `start`; item
  15's importer check resolves each specifier; and item 15's test fails when a sweep reports an error
  (`DEC-20261106-02` B5).
END LOG ENTRY 2

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting an act's signature or its trailer block. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261106-02 and DEC-20261107-01, the Phase 3A final merge review and records. The body says the Founder signed DEC-20261106-02 on 2026-11-06 and DEC-20261107-01 on 2026-11-07; that DEC-20261106-02 is the final merge review of plan Task 59, which authorized the merge of pull request 228 at 1d5438202c88f6b76b3b0e3746ac36d9416e7ad2; that DEC-20261107-01 enters Task 59's verdict and merge, closes M26, records Phase 3A as merged and not certified, and under its B5 has this one pull request file both acts unchanged and append the two log entries; that the two texts come from the transfer commits you reported; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp each committed act against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261107-01-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 226 with gh api repos/MADVenturesLLC/madventures-tui/pulls/226 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261107-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link, and do not write the Copilot reviewer's login in the body.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, gh is not daley40-lab, the git identity differs, a hash, line count or byte count differs, a transfer commit or blob is missing, main has moved outside precondition 1, an identifier or file name is already used under docs/, any fact in precondition 5 is false, the log file would change anywhere but its end, any path other than the three would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, the git identity, and the preconditions, each result with full SHAs, hashes, line and byte counts, and every quoted line.
2. The commit: full 40-character SHA, the three paths, the diff stat, the two cmp results, and the git diff of the log file with each appended entry's line count, byte count and SHA-256.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
