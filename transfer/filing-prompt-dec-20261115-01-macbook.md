STEP: file DEC-20261115-01 and its packet, and enter the madv-surface 0.1.1 review in the correction-round log. Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261115-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act and its evidence packet in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261115-01-filing and open one draft pull request. You build no slice, and you change nothing in any other repository.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261115-01-filing. Then run gh api user --jq .login. It must print daley40-lab. Then run git config user.name and git config user.email; they must print daley40-lab and 293512385+daley40-lab@users.noreply.github.com. Then run git remote get-url origin; it must be an https URL, not an SSH one. If any differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. Run no process-listing command. Use no MCP server and start no other agent. Read nothing outside your own clone other than what this prompt names, fetch no web page, and run no test.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261115-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261115-MADV-SURFACE-0.1.1-RECORDS (DEC-20261115-01) on 2026-11-15, with its packet. It is the records act of B9 of DEC-20261114-01. It records the madv-surface 0.1.1 follow-up build in MADVenturesLLC/madventures-surface, the Founder's runs on both certification hosts, the Tier-2 review the Founder accepts for it, its release commit 91bfb38549bcab37740d2c4564c371ee390a63e7 tagged v0.1.1, and its two release builds by SHA-256. It rules on what the review found and carries three test limits to the act of any later madv-surface build. B13 of DEC-20261115-01 has one docs-only pull request, made by a Claude Code filing session, do three things and change nothing else: add the act under docs/decisions/ unchanged, add the packet of its B10 under docs/verification/ unchanged, and append the entry of its C1 to the correction-round log. The act authorizes no build and no live call, and starts no slice.

AUTHORITY
Read AGENTS.md first, including its merge bullet as DEC-20261031-01 amended it, and B8 of docs/decisions/DEC-20261102-02-hardening-builds.md, which lets a filing session the Founder names push its branch and open its draft pull request as daley40-lab. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. After git fetch origin claude/awesome-cray-vqrzbt, read each text from the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- PATH, and report each commit. Each must be the transfer commit named here; if one differs, stop:
- DEC-20261115-01: transfer/DEC-20261115-01-madv-surface-0.1.1-records.md, at transfer commit 62e5505b35640de242598857f298b534d446272c
- the packet: transfer/2026-11-15-madv-surface-0.1.1-release.md, at transfer commit 62e5505b35640de242598857f298b534d446272c
Read both in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 8e078562d81b098cba012135cd4b9606f497cc99, the merge of pull request 240, or a descendant whose changes since that commit touch no path under docs/decisions/ or docs/verification/. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261115-01-filing must not exist on origin.
2. Each text has this SHA-256, line count and byte count; if any value differs, stop:
   DEC-20261115-01: 5bf1d2353fa44fd4c346ce0207286eaba0726e42fb4314af4c2fb2aa5fe5ccd6, 172 lines, 22,399 bytes.
   The packet: c59d0fccc68a4b850aaed9498c320ff8f50ad537e6e1c5193d29028772db4ae0, 254 lines, 20,779 bytes.
   Confirm that B10 of DEC-20261115-01 gives the packet's file name, SHA-256, line count and byte count as these, and quote B10.
3. Check each text with grep, not by eye, and report each count.
   a. DEC-20261115-01: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero bare three-hyphen lines; zero lines ending in a space; zero square brackets; zero runs of two or more underscores; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals. It holds seven section signs (U+00A7) and one em dash (U+2014), before the name in its signature, and no other character outside ASCII; keep each as that one character.
   b. The packet: zero bare three-hyphen lines; zero lines ending in a space; zero runs of two or more underscores; no line that begins with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. It holds square brackets on exactly four lines: one line with two regular expressions, and three test summary lines quoted from logs; keep them. It holds one section sign and no other character outside ASCII.
4. On origin/main neither docs/decisions/DEC-20261115-01-madv-surface-0.1.1-records.md nor docs/verification/2026-11-15-madv-surface-0.1.1-release.md exists, and under docs/ neither of the strings DEC-20261115-01 and FOUNDER-ACT-20261115 appears. Any use is a stop. docs/verification/phase-3a-correction-rounds.md on origin/main has SHA-256 73e9c357d511584a4092b976bdcf687253f45ad3c820e67c286a77c911eb0027, 1,817 lines and 161,192 bytes, ends with exactly one newline, and contains neither of the strings madv-surface and DEC-20261115-01. Its last heading, which you quote with its line number, 1777, is ## H2 review verdict PASS and H2 merged (rubric milestone 4, no round, count 0).
5. Check the facts Part A of DEC-20261115-01 cites, and stop if any is false. Read-only, with git and gh api. Run every git command of this item with GIT_CONFIG_GLOBAL=/dev/null and GIT_CONFIG_NOSYSTEM=1 set for that command. In MADVenturesLLC/madventures-surface use gh api only: clone nothing from it and change nothing there. If gh api returns 404 or 403 for that repository, stop and report the status.
   a. The release, in MADVenturesLLC/madventures-surface. Pull request 2 is merged, at 2026-11-15T03:31:36Z, by decivantiq, with merge commit 91bfb38549bcab37740d2c4564c371ee390a63e7. gh api repos/MADVenturesLLC/madventures-surface/git/commits/91bfb38549bcab37740d2c4564c371ee390a63e7 shows the tree edb3bcd26bae4f95fe9db39c234200921534f18e and the parents d259cb5f9797101868391a0e4e81fc3a40ad3ea4 and, second, a249da6dbeab879b2d68b97975e8a9a42db07437. The same call for a249da6dbeab879b2d68b97975e8a9a42db07437 shows the same tree. gh api repos/MADVenturesLLC/madventures-surface/compare/d259cb5f9797101868391a0e4e81fc3a40ad3ea4...91bfb38549bcab37740d2c4564c371ee390a63e7 --jq '[.files[].filename]|sort' lists exactly README.md, docs/build-log-0.1.1.md, docs/registration-proposal.md, docs/samples/README.md, package.json, src/domain.ts, test/claude-ids.test.ts, test/local-redaction-order.test.ts, test/new-profiles.test.ts and test/tls.test.ts. gh api repos/MADVenturesLLC/madventures-surface/tags lists exactly one tag, v0.1.1, at 91bfb38549bcab37740d2c4564c371ee390a63e7, and gh api repos/MADVenturesLLC/madventures-surface/git/ref/tags/v0.1.1 names an object of type commit, that SHA.
   b. The build. gh api repos/MADVenturesLLC/madventures-surface/compare/d259cb5f9797101868391a0e4e81fc3a40ad3ea4...a249da6dbeab879b2d68b97975e8a9a42db07437 lists exactly six commits, in this order: 2ff0e007da08767c6aaf3e243af0c75da4c1bf94, 4f999089bc6661bf7a96a61ff4b0411bd4d70bb1, b2af319b2852118edc3e864806e53f9420173f01, edc50e9163c688e9b696f9c9bb16e4e5b159f66b, 88d39fced21b0c7e580153d83c3f6d750c6a6939 and a249da6dbeab879b2d68b97975e8a9a42db07437. Each has one parent, author and committer login daley40-lab, and the three trailers Role-Id: builder, Actor-Id: session:codex/surface-0.1.1-r1 and Execution-Surface: codex in its message.
   c. The comments. Issue comments 6885297945, 6888455782, 6888455972 and 6888592205 are on pull request 2 of MADVenturesLLC/madventures-surface, read with gh api repos/MADVenturesLLC/madventures-surface/issues/comments/ID, each posted by decivantiq. Their first lines begin, in order, Founder check of the madv-surface 0.1.1 builder session record, TIER-2 REVIEW VERDICT, ROUND 1: MADVenturesLLC/madventures-surface#2, TIER-2 REVIEW VERDICT, CONTINUED: MADVenturesLLC/madventures-surface#2 and MERGE AUTHORIZATION: MADVenturesLLC/madventures-surface#2. Confirm that 6885297945 holds the strings rollout-2026-11-13T23-58-14-01a1d86b-a064-7da3-90ac-3d93acbaf401.jsonl and CHECK_OK. For 6888455782, quote the Head reviewed, Verdict and Report SHA-256 lines, and confirm that the head, the SHA-256, the line count, the byte count and the saved path each equal those of THE LOG ENTRY. For 6888592205, confirm that its body, with carriage returns removed and trailing newlines dropped, equals, with trailing newlines dropped, transfer/surface-pr2-merge-authorization.md at the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, 738a4a3765c5c9789cdaef50c3cf2223ddfae3d1. Quote nothing else from any comment.
   d. Ready, Copilot and the merge. Pull request 2 was created by decivantiq at 2026-11-14T22:37:38Z. Its timeline, read with gh api repos/MADVenturesLLC/madventures-surface/issues/2/timeline, has one ready_for_review event, by decivantiq at 2026-11-15T03:31:07Z, after comment 6888455972; one review_requested event, at 2026-11-15T03:31:09Z, whose requested reviewer is Copilot; and comment 6888592205 at 2026-11-15T03:31:32Z, before the merge. gh api repos/MADVenturesLLC/madventures-surface/pulls/2/reviews shows one review, 5908857167, by a login that begins copilot-pull-request-reviewer, state COMMENTED, at commit a249da6dbeab879b2d68b97975e8a9a42db07437, submitted at 2026-11-15T03:33:45Z, after the merge. gh api repos/MADVenturesLLC/madventures-surface/pulls/2/comments prints an empty list.
   e. The lines A7 cites. Read with gh api -H "Accept: application/vnd.github.raw" "repos/MADVenturesLLC/madventures-surface/contents/PATH?ref=SHA", and quote with line numbers: at 91bfb38549bcab37740d2c4564c371ee390a63e7, lines 19, 28, 31 and 54 of src/domain.ts, lines 72 and 73 of src/profiles.ts and line 3 of package.json; and at d259cb5f9797101868391a0e4e81fc3a40ad3ea4, line 19 of src/domain.ts.
   f. The signed texts. For each of these, find the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, and confirm the commit and the SHA-256 of the file at that commit: transfer/builder-prompt-surface-0.1.1-codex-macbook.md at a1387df9989a595e7433751d0f6cd05f1e513df2, 084f7a3a7af6692a03fdb5d653ba8bdb3de4e27b7dd4ff25a045ce8899a7c77f; transfer/resume-surface-0.1.1-1-commit-width.md at f942e464b351e238f52e9bbae8a4cf87121da07e, 15da73708241a0c78f77ee13e7d68264e647c6958e3175fe17c51d9f2c8468f9; transfer/review-prompt-surface-0.1.1-antigravity-r1.md at f05506f073e22ac0b618fb01da09caf10d5ee549, f739865f8bf6e0d1db60f862bab0f929836ad1f39bb095948fcad620da4e331f; transfer/founder-message-1-load.md at 2193ad323e84aed8b8a69ac6d3c090658bdeafa2, 29fc9757f324c87afadf6f7f288e61b67bd7fba1d0ad285859bcaa8a1a7d324b; transfer/surface-pr2-merge-authorization.md at 738a4a3765c5c9789cdaef50c3cf2223ddfae3d1, 72e149a30e1888eafbe8f007bbac3f5e65773eb492b988b058d607fa7d0548e4; and transfer/h2-record-check.mjs at 730df3014bf31d2dc0770cb4d30a4a4a79e30afe, c1834dcc689e94cf57fb123a09a0600225d8e97b428c648f14276136e3dd383f.
   g. In this repository, at 8e078562d81b098cba012135cd4b9606f497cc99, quote with line numbers: B5 (line 45), B7 (line 49) and B9 (line 53) of docs/decisions/DEC-20261114-01-madv-surface-release.md; B6 (line 78) of docs/decisions/DEC-20261113-01-h2-records-and-merge.md; B3 (line 40) and B5 (line 44) of docs/decisions/DEC-20261114-02-minimax-plan-terms.md; and lines 88 to 90 of docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md, which put new Phase 3B evidence in docs/verification/ as sanitized packets.
   The facts that rest on the Founder's MacBook or Ubuntu PC, which are the builder session and its session record of A2 to A4, the Founder's runs of A5, the reviewer's report and its section 5 of A6, the release builds of A9 and the evidence of A10, together with the drafting session's probe of A11, rest on the Founder's own checks and on reports to the Founder; read none of them, and report them as not checked.

ALLOWED SCOPE
One commit, exactly three paths. Two are new, each byte for byte from its transfer blob:
  docs/decisions/DEC-20261115-01-madv-surface-0.1.1-records.md
  docs/verification/2026-11-15-madv-surface-0.1.1-release.md
The third is docs/verification/phase-3a-correction-rounds.md, modified only by appending the entry of THE LOG ENTRY at its end. Before committing, git status --porcelain must list only those three paths. Do not change any other file.

THE LOG ENTRY
A pasted copy of this prompt can lose its line breaks and formatting, so take the text between the marker lines from this prompt's copy on the transfer branch, transfer/filing-prompt-dec-20261115-01-macbook.md at the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, and report that commit. Append to the end of docs/verification/phase-3a-correction-rounds.md, after its present last line: exactly one blank line, then the text of THE LOG ENTRY without its marker lines, ending with exactly one newline. Change no other byte of the file. Then show git diff of that file and confirm that every changed line is an added line at its end. Report the entry's line count, byte count and SHA-256 as appended, without its leading blank line: it has 45 lines, 3,911 bytes and SHA-256 bff2f875a94ed20f946722e3686ef976d14e81eaa1d628aab533d9d76649cf15. The file then has SHA-256 be628c3fd578b346824c84e3c82c3d26fc14179e55cef9743bba571c87bbc68b, 1,863 lines and 165,104 bytes. The entry is ASCII only.
BEGIN LOG ENTRY
## madv-surface 0.1.1 review verdict PASS and release (no rubric milestone, no round)

- **Recorded:** 2026-11-15, under `DEC-20261115-01` B1 to B5 and C1.
- **What it reviews:** the madv-surface 0.1.1 follow-up build of `DEC-20261114-01`, in
  `MADVenturesLLC/madventures-surface`; not a Phase 3B slice. **Rubric milestone:** none
  (`DEC-20261114-01` B5).
- **Head reviewed:** `a249da6dbeab879b2d68b97975e8a9a42db07437` on pull request 2 of
  `MADVenturesLLC/madventures-surface` (`build/v0.1.1`), built by `session:codex/surface-0.1.1-r1` from
  `d259cb5f9797101868391a0e4e81fc3a40ad3ea4` under builder prompt SHA-256
  `084f7a3a7af6692a03fdb5d653ba8bdb3de4e27b7dd4ff25a045ce8899a7c77f` and one resume message, SHA-256
  `15da73708241a0c78f77ee13e7d68264e647c6958e3175fe17c51d9f2c8468f9`, after one halt on the width of a
  commit message line.
- **Reviewer:** `antigravity`, a fresh session in Antigravity on the Founder's MacBook, with a Gemini
  model the Founder selected; the report records the model as not shown. Review prompt SHA-256
  `f739865f8bf6e0d1db60f862bab0f929836ad1f39bb095948fcad620da4e331f`; the Founder's message 1, SHA-256
  `29fc9757f324c87afadf6f7f288e61b67bd7fba1d0ad285859bcaa8a1a7d324b`, replaced its load rule with that
  of `DEC-20261102-02` B4.
- **Verdict text SHA-256:** `fee768e75b957363ba2eb12465039f7599bb57ba912b7242c3fe0eef274f23ce`, 61,230
  bytes, 654 lines, saved at `/Users/michaeldaley/builds/review-surface-0.1.1-r1.md`, posted on pull
  request 2 of `MADVenturesLLC/madventures-surface` as comments 6888455782 and 6888455972 by
  `decivantiq`.
- **Result:** PASS, items 1 to 12, no finding. The report records three attempts that keep every test it
  ran passing: a cut before redaction at the cap plus 25 characters, a rule written to the ten listed
  Claude ids, and a fixed `localhost` in place of the recorded host. The Founder rules them, and the
  Claude ids the rule does not match, limits of the tests and not defects, carried to the act of any
  later build of madv-surface (`DEC-20261115-01` B4). One mutation run, log 033, started after a wait
  that ended without a reading below 2.0; it is recorded and does not change item 2 (`DEC-20261115-01`
  B3). **Counted:** no round, under no rubric milestone. The builder's halt adds no round.
- **Checks at the head:** the repository has no CI. Every gate of `DEC-20261114-01` B3 passed in the
  build: 126 pass, 0 fail, across 23 files. The Founder's runs of `DEC-20261114-01` B4 passed on the
  MacBook under Bun 1.4.2 and on the Ubuntu PC under the custodied Bun 1.4.1: 126 pass, 0 fail, across
  23 files on each, with the TLS test's assertion on a reused connection run on both.
- **Merged and tagged:** pull request 2 was marked ready at that head on 2026-11-15, after the PASS was
  posted. Under the Founder's merge authorization in comment 6888592205, SHA-256
  `72e149a30e1888eafbe8f007bbac3f5e65773eb492b988b058d607fa7d0548e4`, it merged at
  `91bfb38549bcab37740d2c4564c371ee390a63e7`, with parents `d259cb5f9797101868391a0e4e81fc3a40ad3ea4`
  and `a249da6dbeab879b2d68b97975e8a9a42db07437` and the head's tree, changing exactly the ten paths of
  `DEC-20261114-01` B1, and was tagged `v0.1.1`, the release commit. Copilot's review 5908857167 came
  after the merge, opened no thread and changes nothing (`DEC-20261115-01` B7).
- **Release builds (`DEC-20261114-01` B7):** MacBook, Bun 1.4.2, SHA-256
  `daf7ffe5922a3b538d69e6408d4c14c96978b17d16aca2cdeb57e7b6f1852024`, 62,292,978 bytes; Ubuntu PC, the
  custodied Bun 1.4.1, SHA-256 `8dcced0bbc3b6ff3e7372977cae2d48036fa8dabae03e6aa5485efc1bc766a63`,
  80,573,976 bytes. Evidence: `docs/verification/2026-11-15-madv-surface-0.1.1-release.md`.
- **Harness:** one builder session under Codex 0.167.0, the governed build of `DEC-20261108-03` Addendum
  11. Both turns of its one session record name the model `gpt-6.1-sol` and the effort `xhigh`.
END LOG ENTRY

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting the act's signature or the trailers of the madv-surface commits. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261115-01 and its packet, and enter the madv-surface 0.1.1 review. The body says that the Founder signed DEC-20261115-01 and its packet on 2026-11-15; that it is the records act of B9 of DEC-20261114-01 for madv-surface 0.1.1, whose release commit is 91bfb38549bcab37740d2c4564c371ee390a63e7 of MADVenturesLLC/madventures-surface, tagged v0.1.1; that under its B13 this one pull request files the act and the packet unchanged and appends the entry of its C1 to the correction-round log; that both texts come from the transfer commit you reported; that the act authorizes no build or live call; and that the change is docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. The packet holds many SHA-256 values and git SHAs; a hit that is an actual credential value is a stop.
- cmp each of the two new files against its transfer blob, and report that the bytes match and that each committed git blob ID equals its transfer blob ID. Report the SHA-256, line count and byte count of the committed log file, which must equal those THE LOG ENTRY gives.
- Push the branch with git push -u origin docs/dec-20261115-01-filing over the https remote. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 240 with gh api repos/MADVenturesLLC/madventures-tui/pulls/240 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Say in it that docs/decisions/ is a governance path, so the pull request merges only on a Founder act naming its exact head. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261115-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link, and do not write the Copilot reviewer's login in the body.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results. If you edit the body after a prbody check, run the check again on the edited body and report both runs.
- A check named Cursor Security Agent, from the GitHub app cursor, may start on the pull request. Under DEC-20261112-01 B7 it is not a check, review or gate. Report its name, status and conclusion, and do nothing about it.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not request any review, do not touch any other pull request, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when any of these occurs. State what passed, what failed, what is unchanged, and the single next decision.
- Your working directory is not the named clone, gh is not daley40-lab, the git identity differs, or the origin remote is not https.
- A hash, line count or byte count differs, or a transfer commit or blob is missing or is not the latest commit touching its path.
- main has moved outside precondition 1, or a file name or identifier of precondition 4 is already used under docs/.
- Any fact in precondition 5 is false, or gh api returns 404 or 403 for MADVenturesLLC/madventures-surface.
- The log file would change anywhere but its end, or any path other than the three of ALLOWED SCOPE would change.
- An attribution-shaped line outside the final trailers cannot be rewrapped, or the secret scan finds a credential value.
- The branch exists on origin, the push is refused, or gh returns 401.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, the git identity, the origin remote's scheme, and the preconditions, each result with full SHAs, hashes, line and byte counts, and every quoted line.
2. The commit: full 40-character SHA, the three paths, the diff stat, the two cmp and blob-ID results, and the git diff of the log file with the appended entry's line count, byte count and SHA-256 and the file's SHA-256, line count and byte count.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
