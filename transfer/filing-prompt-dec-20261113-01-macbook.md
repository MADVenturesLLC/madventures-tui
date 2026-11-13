STEP: file DEC-20261113-01 and Addenda 1 and 2 to DEC-20261112-03, and enter H2's verdict in the correction-round log. Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261113-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for three Founder texts in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261113-01-filing and open one draft pull request. You build no slice.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261113-01-filing. Then run gh api user --jq .login. It must print daley40-lab. Then run git config user.name and git config user.email; they must print daley40-lab and 293512385+daley40-lab@users.noreply.github.com. Then run git remote get-url origin; it must be an https URL, not an SSH one. If any differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. Run no process-listing command. Use no MCP server and start no other agent. Read nothing outside your own clone other than what this prompt names, and run no test.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261113-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261113-PHASE-3B-H2-RECORDS (DEC-20261113-01) on 2026-11-13. It records Phase 3B slice H2, the Linux capability record, which merged as pull request 238 at 0825a1e349ca5ea6427eea5f2de79dff234dc8f7: it enters H2's one Tier-2 verdict, a PASS, rules its four findings NOT COUNTING, records H2's builder session, session record, harness and model and the results of DEC-20261108-03 Addendum 11, closes H2's correction-round count at zero, places five carried items with a hardening act issued before M6, and reads DEC-20261112-03 B2 for M1. Addenda 1 and 2 to DEC-20261112-03 were signed on 2026-11-12; each says it is filed unchanged with the act that records H2's merge. B14 of DEC-20261113-01 has one docs-only pull request, made by a Claude Code filing session, add the two addenda and that act under docs/decisions/, each unchanged, and append the entry of its C1 to the correction-round log, and change nothing else. None of the three texts authorizes a build or a live call, and none starts a slice.

AUTHORITY
Read AGENTS.md first, including its merge bullet as DEC-20261031-01 amended it, and B8 of docs/decisions/DEC-20261102-02-hardening-builds.md, which lets a filing session the Founder names push its branch and open its draft pull request as daley40-lab. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. After git fetch origin claude/awesome-cray-vqrzbt, read each text from the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- PATH, and report each commit. Each latest commit must be the transfer commit named here; if one differs, stop:
- DEC-20261113-01: transfer/DEC-20261113-01-h2-records-and-merge.md, at transfer commit 6cbadac6c934fbadf83c5041e275aadf42af1a96
- Addendum 1: transfer/DEC-20261112-03-addendum-1-resumed-session.md, at transfer commit 730df3014bf31d2dc0770cb4d30a4a4a79e30afe
- Addendum 2: transfer/DEC-20261112-03-addendum-2-gate-repeat.md, at transfer commit 424e92e30f729b6b9377709aa6804717939a9cb3
Read all three in full before you write anything, and read docs/decisions/DEC-20261112-03-h2-record.md. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 0825a1e349ca5ea6427eea5f2de79dff234dc8f7, the merge of pull request 238, or a descendant whose changes since that commit touch no path under docs/decisions/ and not docs/verification/phase-3a-correction-rounds.md. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261113-01-filing must not exist on origin.
2. Each text has this SHA-256, line count and byte count; if any value differs, stop:
   DEC-20261113-01: 41e27eafc24a2eef238c080d1374b90fbe22d609f4ef5cbb66e07cccb5b347a5, 125 lines, 21,294 bytes.
   Addendum 1: 830e3508dcdd8536f11f6549b81ab06224686374b0b785262cccdaad59c96b50, 42 lines, 5,393 bytes.
   Addendum 2: 829248f1e2557ddbcfd33d6456f7056bfce73a008791cb88caa9660a5d979d29, 48 lines, 5,810 bytes.
   Each addendum's SHA-256 also equals the one the table of A2 of DEC-20261113-01 gives for it, and each transfer commit equals the one that table gives; report that comparison.
3. Check each text with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero bare three-hyphen lines; zero lines ending in a space; zero square brackets; zero runs of two or more underscores; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals.
4. On origin/main none of the three file names of ALLOWED SCOPE under docs/decisions/ exists, and under docs/ neither of the strings DEC-20261113-01 and FOUNDER-ACT-20261113 appears. Any use is a stop. docs/verification/phase-3a-correction-rounds.md on origin/main has SHA-256 3cacb18c1c3b2e08a068281aaf5688d0ad6ed6396efa6f92b0514c9e3adc861b, 1,775 lines and 157,757 bytes, ends with exactly one newline, contains none of the strings PR #238, DEC-20261112-03 and DEC-20261113-01, and its last heading, which you quote with its line number, is ## H1 third review verdict PASS and H1 merged (rubric milestone 10, no round, count 1).
5. Check the facts Part A of DEC-20261113-01 cites, and stop if any is false. Read-only, with gh api, git and shasum. Run every git command of this item with GIT_CONFIG_GLOBAL=/dev/null and GIT_CONFIG_NOSYSTEM=1 set for that command:
   a. Pull request 238 is merged, at 2026-11-13T17:10:15Z, with merge commit 0825a1e349ca5ea6427eea5f2de79dff234dc8f7, whose parents, read with gh api repos/MADVenturesLLC/madventures-tui/git/commits/SHA, are 9115b63d97cef972f6bdfb0da0c0ee5931d10bf0 and, second, ea39a3a069191f848dc9f7937985f706a8e91146. git diff --name-only 9115b63d97cef972f6bdfb0da0c0ee5931d10bf0 0825a1e349ca5ea6427eea5f2de79dff234dc8f7 lists exactly docs/verification/phase-3b-h2-build-log.md, packages/protocol/src/capability-record.ts, packages/protocol/src/index.ts, packages/protocol/test/linux-capability-record.test.ts, packages/storage/src/capability-store.ts, packages/storage/src/index.ts and packages/storage/test/linux-capability-store.test.ts, each within B3 of docs/decisions/DEC-20261112-03-h2-record.md.
   b. git log --reverse --format='%H %P %an %cn' a7251235f94dcc4a3149b638a1acdac69236a26d..ea39a3a069191f848dc9f7937985f706a8e91146 lists exactly four commits, each with one parent, in this order: 764e3df5c616ff04043bb3d4fd72682bdbd35c4d, 9cc055c3c4d643672fefe2b4c5d0ef78eb2572bd, b0463c0d239af0e600423e4958721f0b11c25014 and ea39a3a069191f848dc9f7937985f706a8e91146. Each has author and committer daley40-lab, and the final paragraph of each message holds the three trailers Role-Id: builder, Actor-Id: session:codex/3b-h2-r1 and Execution-Surface: codex.
   c. Issue comments 6840189343, 6853131015, 6853131615, 6859583757 and 6859585534 are on pull request 238, read with gh api repos/MADVenturesLLC/madventures-tui/issues/comments/ID, each posted by decivantiq. Their first lines begin, in order, Founder check of the H2 builder session record, TIER-2 REVIEW VERDICT, ROUND 1: MADVenturesLLC/madventures-tui#238, TIER-2 REVIEW VERDICT, CONTINUED: MADVenturesLLC/madventures-tui#238, FOUNDER NOTE ON THE COPILOT REVIEW: MADVenturesLLC/madventures-tui#238 and MERGE AUTHORIZATION: MADVenturesLLC/madventures-tui#238. Confirm that 6840189343 holds the strings rollout-2026-11-12T11-37-48-01a1d09f-6162-7dd1-ad17-ac8ce4e01efe.jsonl and CHECK_OK. For 6853131015, quote the Head reviewed, Verdict and Report SHA-256 lines, and confirm that the head, the SHA-256, the line count, the byte count and the saved path each equal those of THE LOG ENTRY. For 6859583757 and 6859585534, confirm that each body, with carriage returns removed and trailing newlines dropped, equals, with trailing newlines dropped, transfer/pr238-copilot-note.md and transfer/pr238-merge-authorization.md in turn, each at the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, de97d227e95b13f254ae648438db6b2df6c6b9f4; those transfer files have SHA-256 bc003f90cc48c18f6668574c8bf10c85392dc8d99e63b3b704cfb4dc06d578bd and 0ccb2ead5d1d2edf76e60ee69bb0431954cae73e9ac83585f91694ff36bd6094. Quote nothing else from any comment.
   d. Review 5891232740 on pull request 238 was submitted by the Copilot reviewer, whose login begins copilot-pull-request-reviewer, at commit ea39a3a069191f848dc9f7937985f706a8e91146. gh api repos/MADVenturesLLC/madventures-tui/pulls/238/comments --jq '[.[].id]' prints the one ID 4563404681. gh api graphql -f query='{repository(owner:"MADVenturesLLC",name:"madventures-tui"){pullRequest(number:238){reviewThreads(first:10){nodes{isResolved comments(first:1){nodes{databaseId}}}}}}}' shows exactly one thread, whose first comment is 4563404681 and which is resolved.
   e. Pull request 238 was created by decivantiq at 2026-11-13T00:36:40Z. Its timeline, read with gh api repos/MADVenturesLLC/madventures-tui/issues/238/timeline, has one ready_for_review event, by decivantiq at 2026-11-13T12:41:40Z, after comment 6853131615, which was posted at 2026-11-13T12:37:55Z.
   f. Runs 43470103822, 43470102655 and 43470102495 each have head_sha 0825a1e349ca5ea6427eea5f2de79dff234dc8f7 and conclusion success; report each run's name. Runs 43427851357 and 43427852941 are each named code-review, with head_sha ea39a3a069191f848dc9f7937985f706a8e91146, run_attempt 2 and conclusion success.
   g. At 0825a1e349ca5ea6427eea5f2de79dff234dc8f7, git rev-parse of COMMIT:PATH gives ced2364d85c0117563533e6dc419575f06a09161 for packages/supervisor/src/preflight.ts, 182285abde26fae13f9403dba676349608a61265 for packages/supervisor/test/preflight.test.ts and 8e63d73f723c3fa7eea2e300c3e378e107957b0b for test/phase3a/runtime-harness.ts, and the last also at a7251235f94dcc4a3149b638a1acdac69236a26d. Quote with line numbers, at 0825a1e349ca5ea6427eea5f2de79dff234dc8f7: line 50 of test/phase3a/adversarial/ledger-failure.test.ts; line 423 of packages/protocol/src/capability-record.ts; item 2 of B9 of docs/decisions/DEC-20261108-01-phase-3b-approval.md, which places H2 under rubric milestone 4; C2 of docs/decisions/DEC-20261108-04-phase-3b-standing-commission.md, which names M1's base; B2 of docs/decisions/DEC-20261112-03-h2-record.md; and B5 of docs/decisions/DEC-20261108-03-addendum-11-governed-build.md, which says the act that records H2's merge enters its facts and results.
   The facts that rest on the Founder's MacBook or Ubuntu PC outside your clone, which are the builder session and its session record of A3 and A4, the host of A5, the Founder's runs of A6, the governed build of A9 and the evidence of A11, and the reviewer and model of the verdict, rest on the Founder's own checks and on reports to the Founder; read none of them, and report them as not checked.

ALLOWED SCOPE
One commit, exactly four paths. Three are new, each byte for byte from its transfer blob, under the file name the table of A2 and B14 of DEC-20261113-01 give:
  docs/decisions/DEC-20261112-03-addendum-1-resumed-session.md
  docs/decisions/DEC-20261112-03-addendum-2-gate-repeat.md
  docs/decisions/DEC-20261113-01-h2-records-and-merge.md
The fourth is docs/verification/phase-3a-correction-rounds.md, modified only by appending the entry of THE LOG ENTRY at its end. Before committing, git status --porcelain must list only those four paths. Do not change docs/decisions/DEC-20261112-03-h2-record.md, docs/verification/phase-3b-h2-build-log.md or any other file.

THE LOG ENTRY
A pasted copy of this prompt can lose its line breaks and formatting, so take the text between the marker lines from this prompt's copy on the transfer branch, transfer/filing-prompt-dec-20261113-01-macbook.md at the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, and report that commit. Append to the end of docs/verification/phase-3a-correction-rounds.md, after its present last line: exactly one blank line, then the text of THE LOG ENTRY without its marker lines, ending with exactly one newline. Change no other byte of the file. Then show git diff of that file and confirm that every changed line is an added line at its end. Report the entry's line count, byte count and SHA-256 as appended, without its leading blank line: it has 41 lines, 3,434 bytes and SHA-256 391faa848f564e582dce08d734de1c70164f24073d9e51b4020872341477a6a2. The file then has SHA-256 73e9c357d511584a4092b976bdcf687253f45ad3c820e67c286a77c911eb0027, 1,817 lines and 161,192 bytes. The entry contains the section sign (U+00A7) twice; keep each as that one character.
BEGIN LOG ENTRY
## H2 review verdict PASS and H2 merged (rubric milestone 4, no round, count 0)

- **Recorded:** 2026-11-13, under `DEC-20261113-01` B1 to B3, B5, B9 and C1.
- **Plan milestone:** Phase 3B slice H2, the Linux capability record (plan §3 H2, `DEC-20261108-04`
  B5 and C1). **Rubric milestone:** 4.
- **Head reviewed:** `ea39a3a069191f848dc9f7937985f706a8e91146` on PR #238 (`build/3b-h2-r1`), built by
  `session:codex/3b-h2-r1` from binding base `a7251235f94dcc4a3149b638a1acdac69236a26d` under
  `DEC-20261108-04`, `DEC-20261112-03` and its Addenda 1 and 2.
- **Reviewer:** `antigravity`, a fresh Gemini session in the Antigravity command-line interface on the
  Founder's MacBook, with Gemini 4 Carbon selected by the Founder; the report records the model as not
  shown. Review prompt SHA-256 `67f5c25aff7177153285b4a95ad7bdc51f65a2f2c812ddadd7b6b6dbe257de54`.
- **Verdict text SHA-256:** `daf9a325a111b7553dac2fe8546199c673ae3d4d394133ce1cc14d38b6a1bee7`, 58,025
  bytes, 611 lines, saved at `/Users/michaeldaley/builds/review-h2-r1.md`, posted on PR #238 as
  comments 6853131015 and 6853131615 by `decivantiq`.
- **Result:** PASS, items 1 to 14, no SUBSTANTIVE and no ADVISORY finding, and four findings the
  reviewer classifies NOT COUNTING under Phase 3A plan §11.3. Findings 1 to 3: no test pins the check
  of a Linux host's keys with `Reflect.ownKeys`, the guard at line 423 of `capability-record.ts`, or
  the comparison of the whole binary hash in `latestFreshRecord`. Finding 4: twelve quoted blocks of
  the build log join lines from different parts of a log without marking the gap. The Founder rules
  all four NOT COUNTING (`DEC-20261113-01` B3). **Counted:** no round. The builder's halts and stops
  add no round. H2's count under rubric milestone 4 closes at **0**. No verdict of H2 is a
  disqualifier.
- **Checks at the head:** Verify, Verify (macOS), tui-chaos on both hosts, attribution-shape,
  validate-code-review, code-review, CodeQL and every Analyze job succeeded on their first attempt.
  The Founder's runs of `DEC-20261108-04` B9 passed on the MacBook and on the Ubuntu PC: 1945 pass,
  0 fail, across 142 files on each.
- **Merged:** PR #238 was marked ready at that head on 2026-11-13, after the PASS was posted.
  Copilot's review 5891232740 there opened one thread, comment 4563404681, which the Founder's note in
  comment 6859583757 closed with no change. Under the Founder's merge authorization in comment
  6859585534, SHA-256 `0ccb2ead5d1d2edf76e60ee69bb0431954cae73e9ac83585f91694ff36bd6094`, it merged at
  `0825a1e349ca5ea6427eea5f2de79dff234dc8f7`, with parents `9115b63d97cef972f6bdfb0da0c0ee5931d10bf0`
  and `ea39a3a069191f848dc9f7937985f706a8e91146`, changing exactly seven paths, all within
  `DEC-20261112-03` B3. Every run on the merge commit succeeded.
- **Harness:** one builder session under Codex 0.167.0, the governed build of `DEC-20261108-03`
  Addendum 11. Every turn of its one session record names the model `gpt-6.1-sol` and the effort
  `xhigh`; one turn ran with a read-only sandbox and no call, which Addendum 1 to `DEC-20261112-03`
  accepts.
- **Carried to a hardening act issued before M6 (`DEC-20261113-01` B9):** the cause of the one failure
  of `test/phase3a/adversarial/ledger-failure.test.ts:50` in the builder's log 187; tests for Findings
  1 to 3; and the check of the Linux host values in `capabilityRecordFilename` (Copilot's comment
  4563404681).
END LOG ENTRY

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting an act's signature or the trailers of H2's commits. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261113-01 and Addenda 1 and 2 to DEC-20261112-03, and enter H2's verdict. The body says the Founder signed DEC-20261113-01 on 2026-11-13 and the two addenda on 2026-11-12; that DEC-20261113-01 records slice H2, merged as pull request 238 at 0825a1e349ca5ea6427eea5f2de79dff234dc8f7, closes H2's correction-round count at zero and places its carried items; that under its B14 this one pull request files the three texts unchanged and appends the entry of its C1 to the correction-round log; that the texts come from the transfer commits you reported; that none authorizes a build or a live call; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp each of the three committed texts against its transfer blob, and report that the bytes match and that each committed git blob ID equals its transfer blob ID. Report the SHA-256, line count and byte count of the committed log file, which must equal those THE LOG ENTRY gives.
- Push the branch with git push -u origin docs/dec-20261113-01-filing over the https remote. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 235 with gh api repos/MADVenturesLLC/madventures-tui/pulls/235 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Say in it that docs/decisions/ is a governance path, so the pull request merges only on a Founder act naming its exact head. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261113-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link, and do not write the Copilot reviewer's login in the body.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results. If you edit the body after a prbody check, run the check again on the edited body and report both runs.
- A check named Cursor Security Agent, from the GitHub app cursor, may start on the pull request. Under DEC-20261112-01 B7 it is not a check, review or gate. Report its name, status and conclusion, and do nothing about it.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not request any review, do not touch any other pull request, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, gh is not daley40-lab, the git identity differs, the origin remote is not https, a hash, line count or byte count differs, a transfer commit or blob is missing or is not the latest commit touching its path, main has moved outside precondition 1, a file name or identifier of precondition 4 is already used under docs/, any fact in precondition 5 is false, the log file would change anywhere but its end, any path other than the four of ALLOWED SCOPE would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, the git identity, the origin remote's scheme, and the preconditions, each result with full SHAs, hashes, line and byte counts, and every quoted line.
2. The commit: full 40-character SHA, the four paths, the diff stat, the three cmp and blob-ID results, and the git diff of the log file with the appended entry's line count, byte count and SHA-256 and the file's SHA-256, line count and byte count.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
