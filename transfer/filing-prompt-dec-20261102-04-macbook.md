STEP: file DEC-20261102-04 (the hardening records and Hardening C). Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261102-04-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261102-04-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261102-04-filing. Then run gh api user --jq .login. It must print daley40-lab. Then run git config user.name and git config user.email; they must print daley40-lab and 293512385+daley40-lab@users.noreply.github.com. If any differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. Run no process-listing command. Use no MCP server and start no other agent.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261102-04-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261102-PHASE-3A-HARDENING-RECORDS (DEC-20261102-04) on 2026-11-02, after pull requests 211 and 213 merged Hardening A and Hardening B. It enters their three Tier-2 verdicts in the correction-round log, rules on the Copilot findings that followed them, closes item 18 of DEC-20261102-01 with no build, records the process facts of the two builds, and authorizes Hardening C for the acknowledgement deadline of escalateWedgedHost. Its C1 requires this filing to append three entries to the correction-round log.

AUTHORITY
Read AGENTS.md first, including its merge bullet as DEC-20261031-01 amended it. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the act after git fetch origin claude/awesome-cray-vqrzbt, from the latest commit of origin/claude/awesome-cray-vqrzbt that touches transfer/DEC-20261102-04-hardening-records-and-hardening-c.md, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- transfer/DEC-20261102-04-hardening-records-and-hardening-c.md; report that commit. Read it in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be cb0bc264b0224b2943250e138570aa43f17efbae, the merge of pull request 213, or a descendant whose changes since that commit touch no path under docs/verification/, packages/, apps/ or test/, and add no file whose name begins DEC-20261102-04. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261102-04-filing must not exist on origin.
2. The act has SHA-256 b466829f73094ab72232d9693243e3b0b828bf10b75763f71e0a89caf0dd2083, 89 lines, 14,953 bytes. If any value differs, stop.
3. Check the act with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero square brackets; zero bare three-hyphen lines; zero runs of two or more underscores; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals.
4. On origin/main the file docs/decisions/DEC-20261102-04-hardening-records-and-hardening-c.md does not exist, and under docs/ the identifier DEC-20261102-04 appears nowhere. Any use is a stop.
5. Check the facts the act's Part A cites, and stop if any is false. With gh api, read-only:
   a. Pull requests 211 and 213 are merged with merge commits e051ed90802f754495d3f3374192b304e29a6218 and cb0bc264b0224b2943250e138570aa43f17efbae, whose second parents, read with gh api repos/MADVenturesLLC/madventures-tui/git/commits/SHA, are 7e1d094ca53797fb88d591d1f05cab677b4332f4 and 7a23f9cd085e12ea6ad29ab5e3d8957de1e1baed.
   b. Each of these issue comments exists on the pull request named, was posted by decivantiq, and has a first line beginning with the text named: on 211, 6583571337 TIER-2 REVIEW VERDICT and 6583572134 TIER-2 REVIEW VERDICT, CONTINUED; on 213, 6583234970 TIER-2 REVIEW VERDICT, 6583235767 TIER-2 REVIEW VERDICT, CONTINUED and 6586956420 TIER-2 REVIEW VERDICT.
   c. For each verdict comment that starts a verdict (6583571337, 6583234970, 6586956420), report its Head reviewed line and its Report SHA-256 line, and confirm each head and SHA-256 equals the one THE LOG ENTRIES give for it.
   d. These pull request review comments exist, each posted by Copilot, on the pull request named: on 211, 4445549038, 4445549118 and 4445549174; on 213, 4445385788. Report each one's path.
   e. git show e9a815bfb774c0f1fca3364b065a77624c0e1eb6:transfer/builder-addendum-hardening-b-1-output-entry-types.md has SHA-256 eb177f628cc0f841b9718a7d893e5a4c06386d465a11ec2b1c7ae7b798d92b32.
   f. In docs/verification/phase-3a-correction-rounds.md on origin/main, quote the heading of its last entry, and report that the file contains neither of the strings PR #211 and PR #213.

ALLOWED SCOPE
One commit, exactly two paths:
  docs/decisions/DEC-20261102-04-hardening-records-and-hardening-c.md (new, byte for byte from its transfer blob)
  docs/verification/phase-3a-correction-rounds.md (modified only by appending the text of THE LOG ENTRIES at its end)
Before committing, git status --porcelain must list only those two paths.

THE LOG ENTRIES
Append the text between the two marker lines below, without the marker lines, to the end of docs/verification/phase-3a-correction-rounds.md, preceded by exactly one blank line after the file's present last line, and ending with exactly one newline. Change no other byte of the file. Then show git diff of that file and confirm that every changed line is an added line at its end, and that the appended text has 46 lines and 3,251 bytes and SHA-256 d6ece3b4d08d1f167eeb8bfa1b6608b1dc4b4702ab2f3f6e00a2d483c159d774.
BEGIN LOG ENTRIES
## Hardening A review verdict PASS (no rubric milestone, no round)

- **Recorded:** 2026-11-02, under `DEC-20261102-04` B1 and C1.
- **Plan milestone:** none; Hardening A of `DEC-20261102-02`, items 1, 3, 4, 7, 8, 9 and 10 of
  `DEC-20261102-01`, not a plan task. **Rubric milestone:** none.
- **Head reviewed:** `7e1d094ca53797fb88d591d1f05cab677b4332f4` on PR #211, built by
  `session:codex/hardening-a-r1`.
- **Reviewer:** `antigravity`, a fresh session on Antigravity on the Founder's MacBook. The harness did
  not show the model; the Founder confirmed Gemini 4 to the session before it read any file.
- **Verdict text SHA-256:** `c165b71b57cbd7a65eaec2779f03895e8e2bc8b7ca5f49d71f60ac758a22c54e`, 82,221
  bytes, 1,029 lines, saved at `/Users/michaeldaley/builds/review-pr211-r1.md`, posted on PR #211 as
  comments 6583571337 and 6583572134 by `decivantiq`.
- **Result:** PASS, no findings. **Counted:** no round. Copilot's three later findings are ruled in
  `DEC-20261102-04` B2. Merged at `e051ed90802f754495d3f3374192b304e29a6218` under `DEC-20261102-02` B7.

## Hardening B review verdict PASS, round 1 (no rubric milestone, no round)

- **Recorded:** 2026-11-02, under `DEC-20261102-04` B1 and C1.
- **Plan milestone:** none; Hardening B of `DEC-20261102-02`, items 5, 12, 13 and 17 of
  `DEC-20261102-01`, not a plan task. Item 18 was not built and is closed by `DEC-20261102-04` B4.
  **Rubric milestone:** none.
- **Head reviewed:** `0a80144047b64fffdc684d437b49adbe5f0fac9f` on PR #213, built by
  `session:claude-code/hardening-b-r1`.
- **Reviewer:** `antigravity`, a fresh session on Antigravity on the Founder's MacBook, started with
  Gemini 4. The harness did not show the model.
- **Verdict text SHA-256:** `177315d22be33b77ad4d81181b9f3051450958c178669bd4cf4b499183148f6d`, 59,593
  bytes, 680 lines, saved at `/Users/michaeldaley/builds/review-pr213-r1.md`, posted on PR #213 as
  comments 6583234970 and 6583235767 by `decivantiq`.
- **Result:** PASS, four advisory findings, carried under `DEC-20261102-04` B3. **Counted:** no round.
  A later Copilot finding led to one correction commit under Hardening B builder addendum 1.

## Hardening B review verdict PASS, round 2 (no rubric milestone, no round)

- **Recorded:** 2026-11-02, under `DEC-20261102-04` B1 and C1.
- **Plan milestone:** none; the correction of Hardening B under its builder addendum 1, part of item 13
  of `DEC-20261102-01`, not a plan task. **Rubric milestone:** none.
- **Head reviewed:** `7a23f9cd085e12ea6ad29ab5e3d8957de1e1baed` on PR #213, one commit on
  `0a80144047b64fffdc684d437b49adbe5f0fac9f`, built by `session:claude-code/hardening-b-r1`.
- **Reviewer:** `antigravity`, a fresh session on Antigravity on the Founder's MacBook, showing the
  model Gemini 4 Argon (High).
- **Verdict text SHA-256:** `1c5ec2de4362ea97ccd482f96b16e8715c12be5c8688def97f0b5bde64570234`, 43,905
  bytes, 627 lines, saved at `/Users/michaeldaley/builds/review-pr213-r2.md`, posted on PR #213 as
  comment 6586956420 by `decivantiq`.
- **Result:** PASS, two findings classed as not counting under plan §11.3. **Counted:** no round.
  Rubric milestone 10's total stays at **2**. Merged at `cb0bc264b0224b2943250e138570aa43f17efbae`
  under `DEC-20261102-02` B7.
END LOG ENTRIES

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting the act's signature or its trailer block. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261102-04, hardening records and Hardening C. The body says the Founder signed the act on 2026-11-02; that it enters the Tier-2 verdicts of pull requests 211 and 213, rules on the Copilot findings that followed them, closes item 18 of DEC-20261102-01 with no build, and authorizes Hardening C for the acknowledgement deadline of escalateWedgedHost; that it appends three entries to the correction-round log under its C1; that the act's text comes from the transfer commit you reported; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261102-04-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 208 with gh api repos/MADVenturesLLC/madventures-tui/pulls/208 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261102-04-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
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
