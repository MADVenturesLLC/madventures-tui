STEP: file DEC-20261012-03 (tests 4 to 6: findings, runtime held open, root-cause build and MacBook check authorized) and the tests 4 to 6 investigation report. Paste this as the first message of a new Claude Code session started with claude-agent on the Ubuntu PC, in the fresh clone /home/michaeldaley/madventures-tui-b4-act-filing, detached at origin/main (95783dade386d3042f1209b051e8eea1504516dc).

You are the filing session for the tests 4 to 6 cause-and-fix act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's Ubuntu PC, in the clone you were launched in. This is a docs-only change. Land it as one commit on a branch named docs/b4-cause-and-fix-act-filing and open one DRAFT pull request.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-b4-cause-and-fix-act-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261012-TESTS-4-6-CAUSE-AND-FIX on 2026-10-12. It records the findings of the Founder's investigation run of DEC-20261012-02, keeps Bun 1.4.2 as the provisional certification runtime, authorizes a later root-cause build on the Ubuntu PC and a later Founder-run check on the MacBook, and accepts the investigation report. It adds no round. Its part C1 says one docs-only pull request files the act and the report of its B5, and changes nothing else. There is no rounds-log entry.

AUTHORITY
Read AGENTS.md first. This host is Linux: use sha256sum. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the act from the transfer branch:
  git fetch origin claude/awesome-cray-vqrzbt
  git show cedbabcb4fe77793dfa9ebba4a557da84bf2f98d:transfer/DEC-20261012-03-tests-4-6-cause-and-fix.md
Read the act in full before you write anything. The report is not on the transfer branch. It exists only on this PC, at /home/michaeldaley/ubuntu-b7-evidence/report/2026-10-12-tests-4-6-investigation-ubuntu.md. Read that one file and nothing else in /home/michaeldaley/ubuntu-b7-evidence or /home/michaeldaley/ubuntu-b7-custody. The act authorizes a build and a check that happen later. You run none of it: no test, no Bun binary, no fetch from MADVenturesLLC/os-governed-artifacts, no diagnostic command and no installation.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. origin/main must be 95783dade386d3042f1209b051e8eea1504516dc, or a descendant that changed only paths under docs/ since that commit. If it moved, report the changed paths. Your branch starts from origin/main with a clean working tree. The branch docs/b4-cause-and-fix-act-filing must not exist on origin.
2. At transfer commit cedbabcb4fe77793dfa9ebba4a557da84bf2f98d, transfer/DEC-20261012-03-tests-4-6-cause-and-fix.md has SHA-256 e91b25f4fbb0f23101f96793afe3a85951372efbc83148602e38ccb2a873c4f1, 102 lines, 10,569 bytes. If it differs, stop.
3. The act has Status ISSUED and the signature (Michael Daley, Date 2026-10-12, Actor-Id: founder), no square bracket, no bare three-hyphen line, no run of underscores, none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed", and the word DRAFT nowhere in capitals. Report each result.
4. docs/decisions/DEC-20261012-03-tests-4-6-cause-and-fix.md and docs/verification/2026-10-12-tests-4-6-investigation-ubuntu.md do not exist on origin/main, and the identifier DEC-20261012-03 is not used by any file under docs/ on origin/main.
5. The report at /home/michaeldaley/ubuntu-b7-evidence/report/2026-10-12-tests-4-6-investigation-ubuntu.md has SHA-256 ec6c39229959f4d3dd0c55ff948caa7d8a98cda1b915ddb2ddc3bf81a68de79b and 120 lines; the SHA-256 of every line before its final "Report SHA-256:" line is 3c3c5b89d4a180787aff6f41783931aa3e1dc1acd14d9fd3e85e65a21653e449, and that final line names the same value.
6. Check the facts the act cites. Stop and report if any is false.
   - On origin/main, DEC-20261012-02 has SHA-256 c1383d518b54b9cb7e885dd649df39ac82740d973196ba8c89fce834fffa3660, DEC-20261011-02 has 0d163c6aa931d0d52a94bd3f5ad4df3cdf3925caef6d80f2429415d03328fafd, and DEC-20261012-01 has ed3443e7c88af827dfc2d9792a1ef994568f8a8e6184b4aa76569bfefd584d83.
   - Comment 6121676180 on PR 139 is by decivantiq and its first line is "MERGE AUTHORIZATION: MADVenturesLLC/madventures-tui#139".
   - PR 139 is merged as 95783dade386d3042f1209b051e8eea1504516dc.
   - The report names Candidate SHA 95783dade386d3042f1209b051e8eea1504516dc and the run script SHA-256 ab868ad7c35dc5af03e0f9e09ba0d0626b60cec847c7a3b5c0e69f15ca21d86f, and its runtime table and upstream facts match the act's A2: stock 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 a83d263767d839e4d2649ca8e35d07159c7afc99afdc96d731ced29e056dda0c; custodied 1.4.1, revision 69cb78c9097cebd3bdb832d9fff8b7d23abce09e, SHA-256 0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb; pull request 40304 open and not merged; release bun-v1.4.2 published 2026-09-05T05:55:48Z at 744846f844374847c902b5e7fd59b4342a51ef99; release_contains_anchor no and stock_revision_contains_anchor no.
   - The report shows tests 4, 5 and 6 failing in all 18 runs, the custodied phase3a run at 60 pass and 0 fail, and the custodied full suite at 1580 pass and 3 fail.
   - Both test files the act's B3 item 6 names exist on origin/main, and the three test names of DEC-20261011-02 A2 tests 4, 5 and 6 occur in them.
7. gh auth status shows the agent identity daley40-lab through GH_TOKEN. Run gh normally. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring, and never print a token. If this session has no agent identity, stop and report before any commit.

ALLOWED SCOPE
One commit, exactly two paths:
  docs/decisions/DEC-20261012-03-tests-4-6-cause-and-fix.md (new, byte for byte from the transfer blob)
  docs/verification/2026-10-12-tests-4-6-investigation-ubuntu.md (new, byte for byte from the report on this PC)

COPYING THE REPORT
Copy the report with cp into docs/verification/2026-10-12-tests-4-6-investigation-ubuntu.md, then cmp it against the source and confirm the SHA-256 of precondition 5. Change no byte, including whitespace. Then run git diff --check on the staged change. If it flags any line in the act, stop. If it flags lines only in the report, do not edit the report: list the flagged lines in your final report and continue.

COMMIT AND PULL REQUEST
- Commit subject: docs: file the tests 4 to 6 cause-and-fix act and the investigation report. The body says the Founder signed DEC-20261012-03 on 2026-10-12; that it records that tests 4 to 6 fail on the Ubuntu PC under both Bun 1.4.2 and the custodied CI revision, so a host-side factor contributes, and that whether tests 5 and 6 also need upstream pull request 40304 is open; that Bun 1.4.2 stays the provisional certification runtime; that it authorizes a later root-cause build on the Ubuntu PC and a later Founder-run check on the MacBook, neither of which this commit performs; that it accepts the investigation report (SHA-256 ec6c39229959f4d3dd0c55ff948caa7d8a98cda1b915ddb2ddc3bf81a68de79b); that it adds no round and leaves the counts at 5 and 3; that it changes no code, test, workflow, plan or spec and authorizes no later task; that the act is copied without editing from transfer commit cedbabcb4fe77793dfa9ebba4a557da84bf2f98d and the report byte for byte from this PC; and that no other path changes. Docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit.
- cmp the committed act against the transfer blob (use git show into a temporary file outside the clone) and the committed report against its source, and report that the bytes match.
- Push the branch with git push -u origin docs/b4-cause-and-fix-act-filing. Do not force-push. If the harness blocks the push, do not retry or work around it: stop, report the commit SHA, and save the prepared PR body to a file outside the clone. The Founder will run the push and then tell you to continue.
- Open a DRAFT pull request against main. Read the body of PR 138 with gh pr view 138 --json body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not resolve threads, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when a hash, line count or byte count differs, the transfer commit or the blob is missing, the report is missing or differs, the decision identifier is already used, any fact in precondition 6 is false, any path other than the two would change, git diff --check flags a line in the act, the branch exists on origin, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Preconditions, each result with full SHAs, hashes, line and byte counts, and the host from uname -s.
2. The commit: full 40-character SHA, the two paths, the diff stat, the cmp results, and any git diff --check lines in the report.
3. attribution-shape-check results in pr and prbody modes.
4. The PR number, its head SHA and state, the checks that have started, and the count of square brackets in the body.
5. Deviations from this prompt, or the word none.
6. The single next decision for the Founder: marking the PR ready under a separate authorization naming its head.
