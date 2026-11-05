STEP: file DEC-20261105-01, DEC-20261105-02 and Addenda 1 to 4 to DEC-20261104-02. Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261105-02-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for two Founder acts and four addenda in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261105-02-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261105-02-filing. Then run gh api user --jq .login. It must print daley40-lab. Then run git config user.name and git config user.email; they must print daley40-lab and 293512385+daley40-lab@users.noreply.github.com. If any differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. Run no process-listing command. Use no MCP server and start no other agent. Read nothing outside your own clone other than what this prompt names, and run no test.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261105-02-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261105-PHASE-3A-HARDENING-F-RECORDS (DEC-20261105-01) on 2026-11-05, after pull request 224 merged Hardening F. It enters Hardening F's Tier-2 verdict, records Task 58's candidate commit and the revocation of the token of DEC-20261104-01 A10, and applies DEC-20261104-02 B12 on both certification hosts. It was not filed. The Founder then signed FOUNDER-ACT-20261105-PHASE-3A-TASK58-RECORDS (DEC-20261105-02) on 2026-11-05, after pull request 225 merged Task 58. It enters Task 58's Tier-2 verdict and records the merge. Its B4 amends C1 of DEC-20261105-01 so that this one pull request files both acts and Addenda 1, 2, 3 and 4 to DEC-20261104-02, which the Founder signed on 2026-11-05, unchanged, and appends two entries to the correction-round log, the entry of DEC-20261105-01 and then the entry of DEC-20261105-02. The filing prompt signed with DEC-20261105-01 is not used.

AUTHORITY
Read AGENTS.md first, including its merge bullet as DEC-20261031-01 amended it, and B8 of docs/decisions/DEC-20261102-02-hardening-builds.md, which lets a filing session the Founder names push its branch and open its draft pull request as daley40-lab. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. After git fetch origin claude/awesome-cray-vqrzbt, read each text from the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- PATH, and report each commit:
- DEC-20261105-01: transfer/DEC-20261105-01-hardening-f-records-and-addenda.md, at transfer commit 77dc3bcc7382a11bf40386f314143e131fde87ce
- DEC-20261105-02: transfer/DEC-20261105-02-task58-records-and-filing.md
- Addendum 1: transfer/DEC-20261104-02-addendum-1-grace-interval.md, at transfer commit 9521b35a0721e84af296a1c6df46536b7da6b30f
- Addendum 2: transfer/DEC-20261104-02-addendum-2-fact-arrival-times.md, at transfer commit f72d26403173ffb3c0de51233dbb38c6eb9526d0
- Addendum 3: transfer/DEC-20261104-02-addendum-3-certification-runs.md, at transfer commit cfbd6b2e574b41e13d420a1aa5ed33554c75075a
- Addendum 4: transfer/DEC-20261104-02-addendum-4-pr225-reviews.md, at transfer commit 5275213fe732b923bd2f839aef898bf5d9e63373
Read all six in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 8095767f51c2ca3dc098f5bfc9ccf519a85a2369, the merge of pull request 225, or a descendant whose changes since that commit touch no path under docs/decisions/ and not docs/verification/phase-3a-correction-rounds.md. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261105-02-filing must not exist on origin.
2. Each text has this SHA-256, line count and byte count; if any value differs, stop:
   DEC-20261105-01: 06fa9a6afe767e32e0c2bbfacd134bb3f361c438b06df5d3c7ab7e4528182e8b, 69 lines, 7,339 bytes.
   DEC-20261105-02: 6a3df4997745091442a5c95b18dcb2d5912a7d1d39b72c268015792b5371a818, 68 lines, 7,405 bytes.
   Addendum 1: eb5bee7bf4c0c6564b0653ab89029fa32a1c7adc2566137ccf8a92835c965723, 42 lines, 3,884 bytes.
   Addendum 2: 74ef54bc717567793eaee09bfddd059d1eca27db04e387cd325f67df93ae86e0, 51 lines, 5,315 bytes.
   Addendum 3: c5b10f2e170b39b6eab8b55bd87208e34ab7dd47480eefdb4292546d84757f48, 49 lines, 4,659 bytes.
   Addendum 4: 0816dcb0fdbc41893a37ecbc1519ad3c04c95c0c0c3316014e7d761812982521, 45 lines, 4,703 bytes.
3. Check each of the six texts with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero bare three-hyphen lines; zero runs of two or more underscores; zero lines ending in a space; zero square brackets; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals.
4. On origin/main none of the six target paths of ALLOWED SCOPE exists, and under docs/ neither DEC-20261105-01 nor DEC-20261105-02 appears anywhere. Any use is a stop.
5. Check the facts the two acts' Parts A cite, and stop if any is false. With gh api and git, read-only:
   a. Pull request 223 is merged with merge commit 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6, whose parents, read with gh api repos/MADVenturesLLC/madventures-tui/git/commits/SHA, are 27d8e83ceca252be753d7994872a3dca50494782 and, second, 13016aeebafde7170e4265757627372d46807751. Issue comment 6648167161 exists on it, was posted by decivantiq, and its first line is MERGE AUTHORIZATION: MADVenturesLLC/madventures-tui#223.
   b. Review 5778382955 on pull request 223 was submitted by the Copilot reviewer, whose login begins copilot-pull-request-reviewer. Pull request 223 has exactly one review comment, 4475411465, and its thread is resolved; read the thread state with gh api graphql.
   c. Run 41957256609 has head_sha 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6, event push and conclusion success.
   d. Pull request 224 is merged with merge commit ffcecaf9dbb6b2de3b406e475825137ddfe726b7, whose parents are 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6 and, second, d8c91a25978fe8c3b748dd06ac3f87b01e835817, and its changed paths against the first parent are exactly docs/verification/hardening-f-build-log.md and packages/pty-host/test/signals.test.ts. The parent of d8c91a25978fe8c3b748dd06ac3f87b01e835817 is 9b9ca51ed17b407cc676ac099694c6c0d9537a63, whose parent is 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6.
   e. Issue comment 6658119243 exists on pull request 224, was posted by decivantiq, and its first line is TIER-2 REVIEW VERDICT: MADVenturesLLC/madventures-tui#224. Report its Head reviewed, Verdict and Report SHA-256 lines, and confirm that the head, the SHA-256, the 812 lines and the 52041 bytes equal those LOG ENTRY 1 gives.
   f. Review 5785226434 on pull request 224 was submitted by the Copilot reviewer, and pull request 224 has no review comment.
   g. Run 42020248744 has head_sha d8c91a25978fe8c3b748dd06ac3f87b01e835817, run_attempt 1 and conclusion success. Run 42031042009 has head_sha ffcecaf9dbb6b2de3b406e475825137ddfe726b7, event push and conclusion success.
   h. Pull request 225 is merged with merge commit 8095767f51c2ca3dc098f5bfc9ccf519a85a2369, whose parents are ffcecaf9dbb6b2de3b406e475825137ddfe726b7 and, second, b40223570e9483559068fd6d2739e83203ccb4be, and its changed paths against the first parent are exactly docs/verification/2026-08-12-phase-3a-host-certification-macbook.md, docs/verification/2026-08-12-phase-3a-host-certification-ubuntu.md and test/phase3a/evidence-pipeline.test.ts. The parent of b40223570e9483559068fd6d2739e83203ccb4be is ffcecaf9dbb6b2de3b406e475825137ddfe726b7.
   i. Issue comments 6670880450 and 6670880905 exist on pull request 225 and were posted by decivantiq; the first line of 6670880450 begins TIER-2 REVIEW VERDICT: MADVenturesLLC/madventures-tui#225. Report its Head reviewed, Verdict and Report SHA-256 lines, and confirm that the head, the SHA-256, the 859 lines and the 68881 bytes equal those LOG ENTRY 2 gives. Issue comment 6671443446 exists on pull request 225, was posted by decivantiq, and its first line is MERGE AUTHORIZATION: MADVenturesLLC/madventures-tui#225.
   j. Review 5792930993 on pull request 225 was submitted by the Copilot reviewer. Pull request 225 has exactly two review comments, 4486725048 and 4486725131, and both threads are resolved; read the thread state with gh api graphql.
   k. Run 42068109225 has head_sha b40223570e9483559068fd6d2739e83203ccb4be, run_attempt 2 and conclusion success. Runs 42120136631, 42120137308 and 42120138013 have that head_sha and conclusion success. Run 42125176904 has head_sha 8095767f51c2ca3dc098f5bfc9ccf519a85a2369, event push and conclusion success.
   l. In docs/verification/phase-3a-correction-rounds.md on origin/main, quote the heading of its last entry, which must be ## M25 closing merge recorded (rubric milestone 1, count unchanged), and report that the file contains none of the strings PR #224, PR #225, DEC-20261105-01 and DEC-20261105-02.

ALLOWED SCOPE
One commit, exactly seven paths:
  docs/decisions/DEC-20261105-01-hardening-f-records-and-addenda.md (new, byte for byte from its transfer blob)
  docs/decisions/DEC-20261105-02-task58-records-and-filing.md (new, byte for byte from its transfer blob)
  docs/decisions/DEC-20261104-02-addendum-1-grace-interval.md (new, byte for byte from its transfer blob)
  docs/decisions/DEC-20261104-02-addendum-2-fact-arrival-times.md (new, byte for byte from its transfer blob)
  docs/decisions/DEC-20261104-02-addendum-3-certification-runs.md (new, byte for byte from its transfer blob)
  docs/decisions/DEC-20261104-02-addendum-4-pr225-reviews.md (new, byte for byte from its transfer blob)
  docs/verification/phase-3a-correction-rounds.md (modified only by appending the two entries of THE LOG ENTRIES at its end)
Before committing, git status --porcelain must list only those seven paths.

THE LOG ENTRIES
A pasted copy of this prompt can lose its line breaks and formatting, so take the text between each pair of marker lines from this prompt's copy on the transfer branch, transfer/filing-prompt-dec-20261105-02-macbook.md at the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, and report that commit. Append to the end of docs/verification/phase-3a-correction-rounds.md, after its present last line: exactly one blank line, then the text of LOG ENTRY 1 without its marker lines, then exactly one blank line, then the text of LOG ENTRY 2 without its marker lines, ending with exactly one newline. Change no other byte of the file. Then show git diff of that file and confirm that every changed line is an added line at its end. Report each entry's line count, byte count and SHA-256 as appended: LOG ENTRY 1 has 17 lines, 1,258 bytes and SHA-256 b0cc33af5859ef232156651eeec7aaf5dc6c173c4128f924fc7b595370520dad; LOG ENTRY 2 has 18 lines, 1,452 bytes and SHA-256 4c6d1420bc2c6a65fabd790d48556ee9a0259beb4e0bc75e8466e6e01cb05c73. LOG ENTRY 2 contains a middle dot (U+00B7) in Gemini 4 Argon · high; keep it as that one character.
BEGIN LOG ENTRY 1
## Hardening F review verdict PASS (no rubric milestone, no round)

- **Recorded:** 2026-11-05, under `DEC-20261105-01` B1 and C1.
- **Plan milestone:** none; Hardening F of `DEC-20261104-02` B3, as its Addenda 1 and 2 amend it, the
  printed termination and grace timings of the PTY host signal tests, not a plan task. **Rubric
  milestone:** none.
- **Head reviewed:** `d8c91a25978fe8c3b748dd06ac3f87b01e835817` on PR #224, built in two commits by
  `session:claude-code/hardening-f-r1`.
- **Reviewer:** `antigravity`, a fresh session on Antigravity on the Founder's MacBook, with Gemini 4
  Argon (High) as the harness showed it.
- **Verdict text SHA-256:** `9427abda1f715fa62f7ec185e3c1441cde89a5c86392b826a40839d182254cb2`, 52,041
  bytes, 812 lines, saved at `/Users/michaeldaley/builds/review-pr224-r1.md`, posted on PR #224 as
  comment 6658119243 by `decivantiq`.
- **Result:** PASS, no findings. The smallest `grace_ms` in an unmodified run was 2004.90; a probe that
  blocked the test's event loop for 50 ms printed 1956.79, the limitation the build log records.
  **Counted:** no round. Merged at `ffcecaf9dbb6b2de3b406e475825137ddfe726b7` under `DEC-20261104-02` B3
  item 6. That merge is Task 58's candidate commit under `DEC-20261104-02` B5.
END LOG ENTRY 1
BEGIN LOG ENTRY 2
## Task 58 review verdict PASS (rubric milestones 2 and 10, no round, recorded after the merge)

- **Recorded:** 2026-11-05, under `DEC-20261105-02` B1, B2 and C1.
- **Plan milestone:** M26, Task 58. **Rubric milestones:** 2 and 10.
- **Head reviewed:** `b40223570e9483559068fd6d2739e83203ccb4be` on PR #225, built by
  `session:claude-code/m26-task58-r1` under `DEC-20261104-02` B9 and its Addenda 1 to 3.
- **Reviewer:** `antigravity`, a fresh session on Antigravity on the Founder's MacBook, with Gemini 4
  Argon · high selected in the harness.
- **Verdict text SHA-256:** `980e66538ac90e8324652b0b913a8299f854b2346318367004bc02ced35cc4f9`, 68,881
  bytes, 859 lines, saved at `/Users/michaeldaley/builds/review-pr225-r1.md`, posted on PR #225 as
  comments 6670880450 and 6670880905 by `decivantiq`.
- **Result:** PASS, no substantive finding, four advisory findings: no test requires an
  operating-system version, a complete rather than filtered suite count, the grace row's `grace_ms`,
  or the same changed-file list in both reports. Copilot's comments 4486725048 and 4486725131 were
  answered by Addendum 4 to `DEC-20261104-02`. **Counted:** no round. Rubric milestone 2's count is
  unchanged, and Claude Code's count under rubric milestone 10 stays at 0. Merged at
  `8095767f51c2ca3dc098f5bfc9ccf519a85a2369` under `DEC-20261104-01` B10 item 3. The tightening of the
  six tests is carried to the first Phase 3B act under Addendum 4 B3.
END LOG ENTRY 2

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting an act's signature or its trailer block. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261105-01, DEC-20261105-02 and Addenda 1 to 4 to DEC-20261104-02. The body says the Founder signed both acts and the four addenda on 2026-11-05; that DEC-20261105-01 enters Hardening F's Tier-2 verdict, records Task 58's candidate commit and the revocation of the token of DEC-20261104-01 A10, and applies DEC-20261104-02 B12 on both certification hosts; that DEC-20261105-02 enters Task 58's Tier-2 verdict, records its merge, and under its B4 has this one pull request file both acts and the four addenda unchanged and append the two log entries; that the six texts come from the transfer commits you reported; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp each committed text against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261105-02-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 223 with gh api repos/MADVenturesLLC/madventures-tui/pulls/223 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261105-02-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link, and do not write the Copilot reviewer's login in the body.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, gh is not daley40-lab, the git identity differs, a hash, line count or byte count differs, a transfer commit or blob is missing, main has moved outside precondition 1, an identifier or file name is already used under docs/, any fact in precondition 5 is false, the log file would change anywhere but its end, any path other than the seven would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, the git identity, and the preconditions, each result with full SHAs, hashes, line and byte counts, and every quoted line.
2. The commit: full 40-character SHA, the seven paths, the diff stat, the six cmp results, and the git diff of the log file with each appended entry's line count, byte count and SHA-256.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
