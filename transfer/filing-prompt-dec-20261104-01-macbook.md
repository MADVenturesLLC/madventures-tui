STEP: file DEC-20261104-01 (the M25 closure and the Hardening E records) and Addendum 1 to DEC-20261103-02. Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261104-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act and one addendum in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261104-01-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261104-01-filing. Then run gh api user --jq .login. It must print daley40-lab. Then run git config user.name and git config user.email; they must print daley40-lab and 293512385+daley40-lab@users.noreply.github.com. If any differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. Run no process-listing command. Use no MCP server and start no other agent. Read nothing outside your own clone other than what this prompt names, and run no test.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261104-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261104-PHASE-3A-M25-CLOSURE (DEC-20261104-01) on 2026-11-04, after pull request 221 merged Hardening E. It enters the Tier-2 verdicts of pull requests 219 (Task 57) and 221 (Hardening E), closes plan milestone M25, records the hunt at the merge of Hardening E, corrects two statements of DEC-20261103-03, and reconciles the merge of Task 57 with DEC-20261015-05 B1. Its C1 requires this filing to file it and Addendum 1 to DEC-20261103-02, which the Founder signed on 2026-11-04, unchanged, and to append three entries to the correction-round log.

AUTHORITY
Read AGENTS.md first, including its merge bullet as DEC-20261031-01 amended it, and B8 of docs/decisions/DEC-20261102-02-hardening-builds.md, which lets a filing session the Founder names push its branch and open its draft pull request as daley40-lab. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. After git fetch origin claude/awesome-cray-vqrzbt, read each text from the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- PATH, and report each commit:
- the act: transfer/DEC-20261104-01-m25-records-and-hardening-e-records.md
- the addendum: transfer/DEC-20261103-02-addendum-1-task57-halt.md
Read both in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be fef6e64048c30e8df0ba9f44437fc077d8dcaf1e, the merge of pull request 221, or a descendant whose changes since that commit touch no path under docs/decisions/ and not docs/verification/phase-3a-correction-rounds.md. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261104-01-filing must not exist on origin.
2. The act has SHA-256 db58159e4802a1839e126a0fbffbbc1a53c1db73faddcb3e1efb982bc23e0240, 133 lines, 19,371 bytes. The addendum has SHA-256 4655511c35d25e9c60c10ca8e5aea312e88a08659706a90f05da88c954f7d91d, 125 lines, 10,923 bytes, at transfer commit 0e0181923dfd71213deee721c3c46fdda5f1e9f8. If any value differs, stop.
3. Check each text with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero bare three-hyphen lines; zero runs of two or more underscores; zero lines ending in a space; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals. The act has zero square brackets. The addendum has square brackets on exactly one line, line 109, which quotes a JSON object; quote that line.
4. On origin/main neither docs/decisions/DEC-20261104-01-m25-records-and-hardening-e-records.md nor docs/decisions/DEC-20261103-02-addendum-1-task57-halt.md exists, no file under docs/decisions/ has a name containing addendum, and under docs/ the identifier DEC-20261104-01 appears nowhere. Any use is a stop.
5. Check the facts the act's Part A cites, and stop if any is false. With gh api and git, read-only:
   a. Pull request 219 is merged with merge commit 5d86f42cc396a5fa06b299bd166dc6fd4d3f79f9, whose parents, read with gh api repos/MADVenturesLLC/madventures-tui/git/commits/SHA, are fe471b844bdfbfd43aff89841ac1f34c3201f63d and, second, df2baba9130f121c8fbc5c83d0406f9b5e8f5202.
   b. Issue comments 6621443632 and 6621443978 exist on pull request 219, were posted by decivantiq, and have first lines beginning TIER-2 REVIEW VERDICT: MADVenturesLLC/madventures-tui#219 (part 1 of 2) and TIER-2 REVIEW VERDICT, CONTINUED: MADVenturesLLC/madventures-tui#219 (part 2 of 2). For comment 6621443632, report its Head reviewed, Verdict and Report SHA-256 lines, and confirm that the head, the SHA-256, the 1190 lines and the 65087 bytes equal those THE LOG ENTRIES give.
   c. Issue comment 6623244436 exists on pull request 219 and was posted by decivantiq. Review 5762676488 on pull request 219 was submitted by copilot-pull-request-reviewer, and pull request 219 has exactly three review comments, 4463136286, 4463136336 and 4463136395.
   d. Pull request 221 is merged with merge commit fef6e64048c30e8df0ba9f44437fc077d8dcaf1e, whose parents are e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8 and, second, 4d752aa805f4a41e5c17c4b1e5c8f1144890ed9c, and its changed paths against the first parent are exactly docs/verification/hardening-e-build-log.md, test/phase3a/descendant-record-wait.test.ts and test/phase3a/runtime-harness.ts.
   e. Issue comments 6636729420 and 6636730124 exist on pull request 221, were posted by decivantiq, and have first lines beginning TIER-2 REVIEW VERDICT: MADVenturesLLC/madventures-tui#221 (part 1 of 2) and TIER-2 REVIEW VERDICT, CONTINUED: MADVenturesLLC/madventures-tui#221 (part 2 of 2). For comment 6636729420, report its Head reviewed, Verdict and Report SHA-256 lines, and confirm that the head, the SHA-256, the 1152 lines and the 66892 bytes equal those THE LOG ENTRIES give.
   f. Review 5772424572 on pull request 221 was submitted by copilot-pull-request-reviewer, and pull request 221 has no review comment.
   g. Runs 41831055300, 41831055290 and 41831055668 have head_sha 4d752aa805f4a41e5c17c4b1e5c8f1144890ed9c, run_attempt 1 and conclusion success. Run 41758043469 has head_sha 9d9c6bda00e76e5ed07710a5d318476f5f6b0dd1 and run_attempt 2.
   h. Pull request 212 is open.
   i. In docs/verification/phase-3a-correction-rounds.md on origin/main, quote the heading of its last entry, confirm that an entry headed "## Task 56 review verdict PASS" exists, and report that the file contains neither the string PR #219 nor the string PR #221.
   j. docs/verification/hardening-e-build-log.md at fef6e64048c30e8df0ba9f44437fc077d8dcaf1e has SHA-256 11edc14c004cc4e1d784446440d034b48f377445d7393d3177d95d314fd3ffc1.

ALLOWED SCOPE
One commit, exactly three paths:
  docs/decisions/DEC-20261104-01-m25-records-and-hardening-e-records.md (new, byte for byte from its transfer blob)
  docs/decisions/DEC-20261103-02-addendum-1-task57-halt.md (new, byte for byte from its transfer blob)
  docs/verification/phase-3a-correction-rounds.md (modified only by appending the text of THE LOG ENTRIES at its end)
Before committing, git status --porcelain must list only those three paths.

THE LOG ENTRIES
A pasted copy of this prompt can lose its line breaks and formatting, so take the text between the two marker lines from this prompt's copy on the transfer branch, transfer/filing-prompt-dec-20261104-01-macbook.md at the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, and report that commit. Append that text, without the marker lines, to the end of docs/verification/phase-3a-correction-rounds.md, preceded by exactly one blank line after the file's present last line, and ending with exactly one newline. Change no other byte of the file. Then show git diff of that file and confirm that every changed line is an added line at its end, and that the appended text has 52 lines and 3,832 bytes and SHA-256 e7a0b4e6eee3d57bbb126f1d10684e5de470a81dc7706244e4324ec678d0b217.
BEGIN LOG ENTRIES
## Task 57 review verdict PASS (rubric milestone 1, no round, recorded after the merge)

- **Recorded:** 2026-11-04, under `DEC-20261104-01` B1 and C1.
- **Plan milestone:** M25, Task 57. **Rubric milestone:** 1.
- **Head reviewed:** `df2baba9130f121c8fbc5c83d0406f9b5e8f5202` on PR #219, built by
  `session:codex/m25-task57-r1` under `DEC-20261103-02` and its Addendum 1.
- **Reviewer:** `antigravity`, a fresh session on Antigravity on the Founder's MacBook, with Gemini 4
  Argon selected in the harness's settings.
- **Verdict text SHA-256:** `c699805e751301fb2a4520143f4b066483ec59eb4fe905ce8cc651ddc23834a1`, 65,087
  bytes, 1,190 lines, saved at `/Users/michaeldaley/builds/review-pr219-r1.md`, posted on PR #219 as
  comments 6621443632 and 6621443978 by `decivantiq`.
- **Result:** PASS, no substantive finding, three advisory findings. The investigation's overall result
  is pass: the first clause of spec section 2.2 is not established and the second is met. Copilot's
  three comments were closed by the Founder's note, comment 6623244436. **Counted:** no round. Rubric
  milestone 1's count is unchanged. Merged at `5d86f42cc396a5fa06b299bd166dc6fd4d3f79f9` under
  `DEC-20261103-02` E6.

## M25 review checkpoint closed (rubric milestone 1, count unchanged)

- **Recorded:** 2026-11-04, under `DEC-20261104-01` B2 and C1.
- **Plan milestone:** M25, Tasks 56 and 57. **Rubric milestone:** 1.
- **Closed at:** the merge of the pull request that files `DEC-20261104-01`, on the Task 56 and Task 57
  entries above.
- **Count:** rubric milestone 1's count is unchanged.
- **Carried forward (act B3):** the three advisory findings of the Task 57 review: test 1 does not
  require a `system/init` event in items 9 and 11, nor check the model and provider of item 10's
  responses; test 3's label check misses some ways of writing the labels; and test 2 gives no partial
  role list. Copilot's comment 4463136336: test 1 does not check the exit status of items 6, 7 and 9 to
  13. The suggestions in the overview of Copilot's review 5762676488: assert each capture's metadata,
  item 13's fallback, and the identity metadata of items 10 and 11.
- **Carried to Phase 3B (act B4):** live attestation for `claude-code` checks the model of every
  response, and a fallback to another model ends the session as an identity mismatch.

## Hardening E review verdict PASS (no rubric milestone, no round)

- **Recorded:** 2026-11-04, under `DEC-20261104-01` B5 and C1.
- **Plan milestone:** none; Hardening E of `DEC-20261103-03` B2, the atomic write of the fixture's
  descendant record and the retried parse of its wait, not a plan task. **Rubric milestone:** none.
- **Head reviewed:** `4d752aa805f4a41e5c17c4b1e5c8f1144890ed9c` on PR #221, built by
  `session:claude-code/hardening-e-r1`.
- **Reviewer:** `antigravity`, a fresh session on Antigravity on the Founder's MacBook, with Gemini 4
  Argon at the high setting selected in the harness.
- **Verdict text SHA-256:** `0bac54a4696001b5f80d657df793f47cc7125d3324eec136d6d1862387f29a91`, 66,892
  bytes, 1,152 lines, saved at `/Users/michaeldaley/builds/review-pr221-r1.md`, posted on PR #221 as
  comments 6636729420 and 6636730124 by `decivantiq`.
- **Result:** PASS, no substantive finding, three advisory findings: no test catches the wait
  accepting an unusable pid, the fixture writing the record directly under its final name, or the wait
  accepting a partly written record or outliving its deadline. Section 4 of the report quotes three
  logs wrongly; the logs hold real output, and every other quoted result checked is in its log, as
  `DEC-20261104-01` A5 item 4 records. **Counted:** no round. Merged at
  `fef6e64048c30e8df0ba9f44437fc077d8dcaf1e` under `DEC-20261103-03` B2 item 7. The hunt at that merge
  passed 40 of 40 runs on the two certification hosts.
END LOG ENTRIES

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting an act's signature or its trailer block. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261104-01, M25 closure and Hardening E records. The body says the Founder signed the act on 2026-11-04; that it enters the Tier-2 verdicts of pull requests 219 and 221, closes M25, records the hunt at the merge of Hardening E, corrects two statements of DEC-20261103-03, and reconciles the merge of Task 57 with DEC-20261015-05 B1; that it files Addendum 1 to DEC-20261103-02 unchanged and appends three entries to the correction-round log under its C1; that both texts come from the transfer commits you reported; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp each committed text against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261104-01-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 220 with gh api repos/MADVenturesLLC/madventures-tui/pulls/220 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261104-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link. Do not quote the addendum's line 109 in the body; describe it instead.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, gh is not daley40-lab, the git identity differs, a hash, line count or byte count differs, a transfer commit or blob is missing, main has moved outside precondition 1, an identifier or file name is already used under docs/, any fact in precondition 5 is false, the log file would change anywhere but its end, any path other than the three would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, the git identity, and the preconditions, each result with full SHAs, hashes, line and byte counts.
2. The commit: full 40-character SHA, the three paths, the diff stat, the two cmp results, and the git diff of the log file with the appended text's line count, byte count and SHA-256.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
