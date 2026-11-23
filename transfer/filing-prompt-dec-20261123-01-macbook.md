STEP: file DEC-20261123-01 and the two addenda of DEC-20261121-02, and enter the admission build's verdict and merge in the correction-round log. Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261123-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act and the two addenda it files, in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261123-01-filing and open one draft pull request. You build no slice, and you change nothing in any other repository. This is a fresh session: do not look for, read or resume any earlier session, transcript or memory.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261123-01-filing. Then run gh api user --jq .login. It must print daley40-lab. Then run git config user.name and git config user.email; they must print daley40-lab and 293512385+daley40-lab@users.noreply.github.com. Then run git remote get-url origin; it must be an https URL, not an SSH one. If any differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. Run no process-listing command. Use no MCP server and start no other agent. Read nothing outside your own clone other than what this prompt names, fetch no web page, and run no test.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261123-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261123-MADV-SURFACE-ADMISSION-RECORDS-AND-M1 (DEC-20261123-01) on 2026-11-23. It is the act that records the merge of the admission build of DEC-20261121-02, pull request 252, which admitted madv-surface on its 0.1.2 release. It enters that build's review verdict, PASS, and its merge in the correction-round log under rubric milestones 1 and 3 with no round, rules on the reviewer's three ADVISORY findings and on the review's timing, rules item 3 of B4 of DEC-20261108-04 met, closes the items carried to B13 of DEC-20261121-02, and commissions Phase 3B slice M1. Addendum 1 of DEC-20261121-02 was signed on 2026-11-21 and Addendum 2 on 2026-11-22; each says it is filed unchanged with the act that records the admission build's merge. B27 of DEC-20261123-01 has one docs-only pull request, made by a Claude Code filing session under a filing prompt the Founder signs, do three things and change nothing else: add the two addenda under docs/decisions/ with their file names, unchanged; add the act as docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md, unchanged; and append the entry of its C1 to the correction-round log. Under its B14 the merge commit of this pull request is M1's binding base, and M1's builder session starts only after it. None of the three texts authorizes a live call, and this pull request starts no slice.

AUTHORITY
Read AGENTS.md first, including its merge bullet as DEC-20261031-01 amended it, and B8 of docs/decisions/DEC-20261102-02-hardening-builds.md, which lets a filing session the Founder names push its branch and open its draft pull request as daley40-lab. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. After git fetch origin claude/awesome-cray-vqrzbt, read each text from the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- PATH, and report each commit. Each latest commit must be the transfer commit named here; if one differs, stop. Each path is transfer/ followed by the file name:
- DEC-20261123-01: DEC-20261123-01-madv-surface-admission-records-and-m1.md, at transfer commit 4c13f98d5e571a244a609c68b73e7c42bebd1f61
- Addendum 1: DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md, at transfer commit cc5c45a03b10cbaa8fe285e60b76d971a9bc1691
- Addendum 2: DEC-20261121-02-addendum-2-registry-digest.md, at transfer commit e2e59cb347d23120dcf25347cc55e9c458e0618e
Read all three in full before you write anything, and read docs/decisions/DEC-20261121-02-madv-surface-admission.md. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 60faaf8e35cf7f85078bccad73d563262736117b, the merge of pull request 252, exactly: under B9 and B14 of DEC-20261123-01 this pull request's merge commit is M1's binding base and may differ from that commit only under docs/decisions/ and docs/verification/. If origin/main is any other commit, report every path changed since 60faaf8e35cf7f85078bccad73d563262736117b and stop. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261123-01-filing must not exist on origin.
2. Each text has this SHA-256, line count and byte count; if any value differs, stop:
   DEC-20261123-01: e0f08199567641f47eba567ac0653bfc8f1ed9315b3ddfca8074d535b294cb8e, 203 lines, 61,190 bytes.
   Addendum 1: b6b9563ed1a2e154b4ef3b4d9ffe7666e6fd9870d82b87486f772d65f7f167aa, 48 lines, 4,210 bytes.
   Addendum 2: 5dc0fddf411f8abce1e20df834ce21d0676b1fcd538fe12ad3d49a34ffa8be81, 38 lines, 4,770 bytes.
   Confirm that A2 of DEC-20261123-01 gives each addendum's file name, SHA-256, line count, byte count and transfer commit as these, and that its B27 gives the act's file name as above; quote both.
3. Check each text with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero bare three-hyphen lines; zero lines ending in a space; zero square brackets; zero runs of two or more underscores; zero tabs and zero carriage returns; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM, PENDING in capitals, or "to be completed" (A9 item 1 of DEC-20261123-01 holds the lowercase word pending once, which is allowed); and the word DRAFT nowhere in capitals. Each holds one em dash (U+2014), before the name in its signature. The section signs (U+00A7) are: DEC-20261123-01, 35; Addendum 1, 2; Addendum 2, 1. No text holds any other character outside ASCII. Keep each character outside ASCII as that one character.
4. On origin/main none of the three file names of ALLOWED SCOPE exists, and under docs/ neither of the strings DEC-20261123-01 and FOUNDER-ACT-20261123 appears. Any use is a stop. docs/verification/phase-3a-correction-rounds.md on origin/main has SHA-256 52958a2325cf3c1e0ef34c79e49c1842247f6291444db38c407d6e5366d3d778, 1,982 lines and 175,221 bytes, ends with exactly one newline, and contains none of the strings madv-surface admission review verdict, DEC-20261123-01 and PR #252. Its last heading, which you quote with its line number, 1926, is ## madv-surface 0.1.2 review verdict PASS and release (no rubric milestone, no round).
5. Check the facts Part A of DEC-20261123-01 cites, and stop if any is false. Read-only, with git and gh api, in this repository only. Run every git command of this item with GIT_CONFIG_GLOBAL=/dev/null and GIT_CONFIG_NOSYSTEM=1 set for that command.
   a. The merge (A3 and A9). gh api repos/MADVenturesLLC/madventures-tui/pulls/252 shows: created by decivantiq at 2026-11-22T20:12:33Z; merged at 2026-11-23T02:41:49Z by decivantiq; head ref build/3b-m0-admission-r1 at 68d78a60338d9ff27ffab7b275aa3395e2a1c9bd; base sha 0678bd4412d5aaed963ae20f101959bd92f79811; 10 commits and 44 changed files. git cat-file -p 60faaf8e35cf7f85078bccad73d563262736117b shows the tree 0b28fcb03ecefd3b1eeb41c5c4ca4b6050d0ce23 and the parents 0678bd4412d5aaed963ae20f101959bd92f79811 and, second, 68d78a60338d9ff27ffab7b275aa3395e2a1c9bd, and 68d78a60338d9ff27ffab7b275aa3395e2a1c9bd has the same tree. git diff --name-status 0678bd4412d5aaed963ae20f101959bd92f79811 60faaf8e35cf7f85078bccad73d563262736117b lists 44 paths, 37 added and 7 modified. git rev-list --reverse 0678bd4412d5aaed963ae20f101959bd92f79811..68d78a60338d9ff27ffab7b275aa3395e2a1c9bd lists exactly ten commits, in this order: 0d13ae88aeda22601cf19c6c81759b4e1d5b03a2, 6b45f9e7291f8a968c31b2748cd7a25cc71fecce, 548acd1c9073bd0aa35b6adadaac30a39691b865, 9cd6709f1616c06411b9f90c3fb4bfc88c377b11, f73b5649afff86b558978cb76d09132bc0a7396a, 6ebfc3060be33279fa3567563b6b0c8d48122b1c, 664c5678e516197fa1a14da3487e27821753ff48, ce2c2ce81349f7b1360229ff6ab0cd602fa2c7a6, 330cbba13c430c526a03cd1be4a993ec9e067a12 and 68d78a60338d9ff27ffab7b275aa3395e2a1c9bd. Each has one parent, author and committer name daley40-lab, and the three trailers Role-Id: builder, Actor-Id: session:codex/3b-m0-admission-r1 and Execution-Surface: codex in its message. At 60faaf8e35cf7f85078bccad73d563262736117b, docs/verification/phase-3b-m0-admission-build-log.md has SHA-256 e8a76754c360dd99c597e1594cdbf926850e264c5d502ea564bf2515e53c7933 and docs/verification/phase-3b-m0-admission-investigation.md has SHA-256 3e8b7547fafd5e83acc84166f61cff12115f829c9dfd5bbf1b5c5effc7bfc563.
   b. The comments (A8 and A9). gh api repos/MADVenturesLLC/madventures-tui/issues/252/comments lists exactly three comments: 7085091237 by github-actions with the suffix of a bot, at 2026-11-22T20:15:42Z; 7089533924 by decivantiq at 2026-11-23T01:56:27Z, whose first line begins TIER-2 REVIEW VERDICT, ROUND 1: MADVenturesLLC/madventures-tui; and 7090138257 by decivantiq at 2026-11-23T02:41:40Z, whose first line begins MERGE AUTHORIZATION: MADVenturesLLC/madventures-tui. For 7089533924, quote its Reviewer id, Head reviewed, Verdict and Report SHA-256 lines, and confirm that the head, the SHA-256, the line count, the byte count and the saved path each equal those of THE LOG ENTRY. For 7090138257, confirm that its body, with carriage returns removed and trailing newlines dropped, equals, with trailing newlines dropped, transfer/pr252-merge-authorization.md at the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, d1eb14cd98ae512393b828c647a9c032e579f77c, whose SHA-256 is f32875a17fcaee142966da5dd870ed00de9e8c1f5c09b951a82c89625aa1b2ee. Quote nothing else from any comment.
   c. Ready, Copilot and the merge (A9). The timeline of pull request 252, read with gh api "repos/MADVenturesLLC/madventures-tui/issues/252/timeline?per_page=100" --paginate, has, in this order among its other events: comment 7089533924 at 2026-11-23T01:56:27Z; one ready_for_review event, by decivantiq at 2026-11-23T02:02:57Z; one review_requested event at 2026-11-23T02:02:58Z, whose requested team has the slug owners; one review_requested event at 2026-11-23T02:02:59Z, whose requested reviewer is Copilot; one reviewed event at 2026-11-23T02:15:30Z; comment 7090138257 at 2026-11-23T02:41:40Z; and one merged event at 2026-11-23T02:41:49Z. gh api repos/MADVenturesLLC/madventures-tui/pulls/252/reviews shows exactly one review, 6015855571, by a login that begins copilot-pull-request-reviewer, state COMMENTED, at commit 68d78a60338d9ff27ffab7b275aa3395e2a1c9bd, submitted at 2026-11-23T02:15:30Z, and gh api repos/MADVenturesLLC/madventures-tui/pulls/252/comments lists no comment.
   d. The checks (A7 and A9). gh api repos/MADVenturesLLC/madventures-tui/check-runs/137339434137 shows conclusion failure and gh api repos/MADVenturesLLC/madventures-tui/check-runs/137340096594 shows conclusion success, each named attribution-shape and at head_sha 68d78a60338d9ff27ffab7b275aa3395e2a1c9bd. gh api repos/MADVenturesLLC/madventures-tui/actions/runs/ID shows, for each of 45101679048, 45101678265 and 45101678772, status completed, conclusion success and head_sha 60faaf8e35cf7f85078bccad73d563262736117b; report each one's name.
   e. The signed texts (A2 to A4, A8 and A9). For each of these, find the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, and confirm the commit and the SHA-256 of the file at that commit: transfer/builder-prompt-m0-admission-codex-macbook.md at 7c90de1501453f359a688be8439efd327abb3302, abf0766764f3587d9dd3de096749c2aa6249fc55cd455c3563e22c4744f300d2; transfer/resume-m0-admission-1-runtime.md at 95c1b72b94ca677c5c7bc219ec94f3ee19727a45, be1771c3d03b5dfa225b808c21591d0bac519d08073cdc80b5d0dbe41ffd41e5; transfer/resume-m0-admission-2-registry-digest.md at e2e59cb347d23120dcf25347cc55e9c458e0618e, eab2fbf86a415032716dd0cf56f01c9179994756f67f8b8bb8e21612e21534d7; transfer/resume-m0-admission-3-phase-2.md at e79ef7e8f6bb4f75b057c52b1f0d2f296999c3e8, 0e54e70e354dd478ad43f40e47136cab7d6b6a136c990759831fbbc909d2a1a4; transfer/review-prompt-m0-admission-antigravity-r1.md at 84b8ce2d5526370507fc6dd8b347e791fb0c928e, b5ae6dffc2459bfa03c45a622eccb7fd325aa4c729cf7429ade27105b874e30c; transfer/founder-message-1-m0-admission-report.md at 2026ba19efe6475f948426afb65b39de639090b0, 086fa7a7cbdd4bfab99c38020e4ca647221d41504090e64efe3edcc6a319e5c3; transfer/pr252-merge-authorization.md at d1eb14cd98ae512393b828c647a9c032e579f77c, f32875a17fcaee142966da5dd870ed00de9e8c1f5c09b951a82c89625aa1b2ee; transfer/h2-record-check.mjs at 730df3014bf31d2dc0770cb4d30a4a4a79e30afe, c1834dcc689e94cf57fb123a09a0600225d8e97b428c648f14276136e3dd383f; transfer/m0-adm/phase1/m0-admission-record.ts at 9ac370892f90acb8b81e249755664df7ceadc4d0, c6d927b3b87e3ab10fa56709786fedd1f71ad5449bf2a5a037a137d94aece825; transfer/m0-adm/phase1/record-check-phase1.txt at f6d88c6d2cb3a9fa831394941209bdf61f6eaec8, af6cc57923affa9eefaf0a27d3eed223748c284fde3de87980d5b7bffc1e4ce3; and transfer/m0-adm/phase2/record-check-phase2.txt at 481b511e1da5d66988f082637ad7e029000ba46a, 3dd6065c2dc7a470118191a3c2ca30b570dfbb156613a4e421488c0e0e574c16.
   f. Preflight (A10). With git rev-parse, at both 60faaf8e35cf7f85078bccad73d563262736117b and 453229b168ef60735973074aaadd100e435455df, test/phase3a/runtime-harness.ts is blob 8e63d73f723c3fa7eea2e300c3e378e107957b0b, packages/supervisor/src/preflight.ts is blob 43619191f47e3f9cdaefd8aa45cd436770690160 and packages/supervisor/test/preflight.test.ts is blob f8f117aaf90d8b3218fbec4f0331563b036eae05.
   g. In this repository, at 60faaf8e35cf7f85078bccad73d563262736117b, quote with line numbers: B11 (line 88), B13 (line 92) and B14 (line 94) of docs/decisions/DEC-20261121-02-madv-surface-admission.md; the first line of B4 (line 90) and of C2 (line 157) of docs/decisions/DEC-20261108-04-phase-3b-standing-commission.md; B8 (line 78) and B11 (line 84) of docs/decisions/DEC-20261119-01-m0-records-and-merge.md; B7 (line 36) of docs/decisions/DEC-20261108-04-addendum-1-corrections.md; and B3 (line 32) of docs/decisions/DEC-20261015-05-phase-3a-process.md.
   The facts that rest on the Founder's MacBook or Ubuntu PC, which are the builder session, its halts and reports and its session record of A3 and A4, the Founder's investigation, records and command faults of A5 and A6, the Founder's runs of A7, the reviewer's two reports, the Founder's checks and comparison of them, Founder message 1's delivery and the reviewer's log times of A8, the evidence of A11, the Founder's checks of A13 and A14, and the drafting session's account of A12, rest on the Founder's own checks and on reports to the Founder; read none of them, and report them as not checked. Report every other fact of Part A that this item does not name as not checked, and do not stop on it.

ALLOWED SCOPE
One commit, exactly four paths. Three are new, each byte for byte from its transfer blob and with the file name the AUTHORITY list gives:
  docs/decisions/DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md
  docs/decisions/DEC-20261121-02-addendum-2-registry-digest.md
  docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md
The fourth is docs/verification/phase-3a-correction-rounds.md, modified only by appending the entry of THE LOG ENTRY at its end. Before committing, git status --porcelain must list only those four paths. Do not change any other file.

THE LOG ENTRY
A pasted copy of this prompt can lose its line breaks and formatting, so take the text between the marker lines from this prompt's copy on the transfer branch, transfer/filing-prompt-dec-20261123-01-macbook.md at the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, and report that commit. Append to the end of docs/verification/phase-3a-correction-rounds.md, after its present last line: exactly one blank line, then the text of THE LOG ENTRY without its marker lines, ending with exactly one newline. Change no other byte of the file. Then show git diff of that file and confirm that every changed line is an added line at its end. Report the entry's line count, byte count and SHA-256 as appended, without its leading blank line: it has 71 lines, 6,351 bytes and SHA-256 06fe20d73b662c19f9e8417f4ca65f89bf3b3fed5e776964e3cded5ecd0f1e54. The file then has SHA-256 17d5154b0a04e4397dd1d2725752abf681509bd1563b2e7a2ff225fd66305933, 2,054 lines and 181,573 bytes, and its new heading is on line 1984. The entry is ASCII only.
BEGIN LOG ENTRY
## madv-surface admission review verdict PASS and admission build merged (rubric milestones 1 and 3, no round, count 0)

- **Recorded:** 2026-11-23, under `DEC-20261123-01` B1 to B15 and C1.
- **Plan milestone:** the admission build of Phase 3B slice M0, which admits madv-surface on its 0.1.2
  release (`DEC-20261121-02`). **Rubric milestones:** 1 and 3 (`DEC-20261108-01` B9 item 2, as
  `DEC-20261121-02` B1 item 4 places it).
- **Head reviewed:** `68d78a60338d9ff27ffab7b275aa3395e2a1c9bd` on PR #252 (`build/3b-m0-admission-r1`),
  built by `session:codex/3b-m0-admission-r1` from `0678bd4412d5aaed963ae20f101959bd92f79811` under
  `DEC-20261121-02` and its Addenda 1 and 2, SHA-256
  `b6b9563ed1a2e154b4ef3b4d9ffe7666e6fd9870d82b87486f772d65f7f167aa` and
  `5dc0fddf411f8abce1e20df834ce21d0676b1fcd538fe12ad3d49a34ffa8be81`, the builder prompt with SHA-256
  `abf0766764f3587d9dd3de096749c2aa6249fc55cd455c3563e22c4744f300d2` and three resume messages, the last
  with SHA-256 `0e54e70e354dd478ad43f40e47136cab7d6b6a136c990759831fbbc909d2a1a4`. Phase 1 ends at
  `664c5678e516197fa1a14da3487e27821753ff48`. In Phase 1 the session halted twice, each with a report:
  when the Founder's installation of other tools replaced the runtime during the session, and when its
  full run failed three tests of `test/phase3a/harness-separation.test.ts`, whose line 24 pins the
  registry digest, which Addendum 2 then let change (`DEC-20261123-01` A3 and B1).
- **Reviewer:** `antigravity`, a fresh session in Antigravity on the Founder's MacBook, with a Gemini
  model the report shows as Gemini 4 Hydrogen (Medium). Review prompt SHA-256
  `b5ae6dffc2459bfa03c45a622eccb7fd325aa4c729cf7429ade27105b874e30c`. The Founder's check of Phase 3B
  plan section 2C failed on the first report, SHA-256
  `17287543e21c8e51e48bce7cd298548a6cc0c7998a8442606be35016dbcb9073`, which was not posted and is not a
  verdict. Founder message 1, SHA-256
  `086fa7a7cbdd4bfab99c38020e4ca647221d41504090e64efe3edcc6a319e5c3`, named the three points that failed
  without stating any value, and the corrected report passed the check (`DEC-20261123-01` A8 and B5).
- **Verdict text SHA-256:** `c58d5779ee3251e0c2efd745dfe47adccf94628f069d0efdd9cbe8b32075fee4`, 40,965
  bytes, 440 lines, saved at `/Users/michaeldaley/builds/review-m0-admission-r1.md`, posted on PR #252
  as comment 7089533924 by `decivantiq`.
- **Result:** PASS, items 1 to 13, no SUBSTANTIVE or NOT COUNTING finding, and three findings the
  reviewer classifies ADVISORY, each from an attempt that kept every test it ran passing: no test pins
  that `model_refused` and `domain_unresolved` come before the `response_id` check (item 3);
  `packages/supervisor/test/madv-allowlist.test.ts` holds the names of `madv-surface-v1` but not their
  `required` and `secret` attributes (item 4); and `recorded-0.1.2.test.ts` leaves to
  `fixture-integrity.test.ts` the bytes it does not assert (item 5). The Founder rules all three limits
  of the tests, not defects: M1 answers the first two with tests, and the third is closed with no change
  (`DEC-20261123-01` B12). The reviewer started its four Bun check scripts while its own foreground
  `bun test` ran, and ran its mutations and attempts through one script under one load reading; no
  result turned on either, and later Tier-2 review prompts ask for each gate run's start and end times
  and a load reading before each Bun test run (`DEC-20261123-01` A8 item 4 and B5). **Counted:** no
  round. The builder's halts, the first report and Founder message 1 add no round. The admission build's
  count closes at **0**.
- **Checks at the head:** on the test merge of the head into `main`,
  `74a6c57481737317eba75d5eb1b3b31be9e0c023`, Verify and Verify (macOS) passed with 2048 pass, 0 fail,
  across 151 files, and tui-chaos on both hosts, validate-code-review, code-review, CodeQL and every
  Analyze job succeeded. The first attribution-shape run, check run 137339434137, failed in its PR-body
  mode because the description did not end with a trailer block; after the Founder's command appended
  the builder's three trailers, check run 137340096594 succeeded. The Founder's runs of
  `DEC-20261121-02` B10 passed on the MacBook under Bun 1.4.2 and on the Ubuntu PC under the custodied
  Bun 1.4.1: 2048 pass, 0 fail, across 151 files on each, log manifests SHA-256
  `c79d39a2577c54f2d8e5653bfe41660eeb2175c693d494548ad766a39df59235` and
  `7ebd2f8688666deb059e6314cd9dae2055f76cd9af7ba26315c1dc8aec0d2514`.
- **Merged:** PR #252 was marked ready at that head on 2026-11-23, after the PASS was posted, and GitHub
  then requested reviews from the owners team and from Copilot. Copilot's review 6015855571, state
  COMMENTED, opened no thread; the owners team did not review. Under the Founder's merge authorization
  in comment 7090138257, SHA-256 `f32875a17fcaee142966da5dd870ed00de9e8c1f5c09b951a82c89625aa1b2ee`, it
  merged at `60faaf8e35cf7f85078bccad73d563262736117b`, with parents
  `0678bd4412d5aaed963ae20f101959bd92f79811` and `68d78a60338d9ff27ffab7b275aa3395e2a1c9bd`, changing
  exactly 44 paths, 37 added and 7 modified. Every run on the merge commit succeeded.
- **Records (`DEC-20261121-02` B8):** the Founder's commands made the build's ten live calls, five on
  each host, and stored one madv-surface capability record on each certification host, SHA-256
  `5c0fd4fc850366d2107555a73487c734f912fc333c1590e7ec39c6bc7a3f36ea` on the MacBook and
  `4482839a8aca025d9e2f545a309fea7ff57971684d5e18f1ebdde4eacf0148a3` on the Ubuntu PC, each passing
  identity, auth readiness and overall for the role `independent-reviewer` and expiring on 2026-12-22.
  Evidence: `docs/verification/phase-3b-m0-admission-investigation.md`.
- **Harness:** one builder session under Codex 0.167.0, the governed build of `DEC-20261108-03` Addendum
  11. All five turns of its one session record name the model `gpt-6.2-astra` and the effort `xhigh`.
- **M1 (`DEC-20261123-01` B8 to B15):** `DEC-20261108-04` B4 item 3 is met, and stays met. The items
  carried to `DEC-20261121-02` B13 are closed. `DEC-20261123-01` is M1's act: M1's binding base is the
  merge commit of the pull request that files it; its builder is `session:codex/3b-m1-r1` and its
  reviewer `antigravity`; and its verdicts count under rubric milestone 6, in a count that starts at
  zero.
END LOG ENTRY

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting a signature or the trailers of the admission build's commits. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261123-01 and Addenda 1 and 2 of DEC-20261121-02, and enter the admission build. The body says that the Founder signed DEC-20261123-01 on 2026-11-23; that it records the merge of the admission build of DEC-20261121-02, pull request 252, at 60faaf8e35cf7f85078bccad73d563262736117b, rules item 3 of B4 of DEC-20261108-04 met and commissions Phase 3B slice M1; that under its B27 this one pull request files the two addenda of its A2 and the act unchanged and appends the entry of its C1 to the correction-round log; that under its B14 the merge commit of this pull request is M1's binding base; that the texts come from the transfer commits you reported; that none of them authorizes a live call; and that the change is docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. The texts hold many SHA-256 values and git SHAs; a hit that is an actual credential value is a stop.
- cmp each of the three new files against its transfer blob, and report that the bytes match and that each committed git blob ID equals its transfer blob ID. Report the SHA-256, line count and byte count of the committed log file, which must equal those THE LOG ENTRY gives.
- Push the branch with git push -u origin docs/dec-20261123-01-filing over the https remote. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 250 with gh api repos/MADVenturesLLC/madventures-tui/pulls/250 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Say in it that docs/decisions/ is a governance path, so the pull request merges only on a Founder act naming its exact head, and that its merge commit is M1's binding base under B14 of DEC-20261123-01. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261123-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link, and do not write the login of the Copilot reviewer or of the github-actions bot in the body, each of which ends in a bracketed suffix; describe each as Copilot's reviewer account and the github-actions bot.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results. If you edit the body after a prbody check, run the check again on the edited body and report both runs.
- Report the checks that have started on the pull request, each with its name and status, once, after you create it. Do not wait for them to complete.
- A check named Cursor Security Agent, from the GitHub app cursor, may start on the pull request. Under DEC-20261112-01 B7 it is not a check, review or gate. Report its name, status and conclusion, and do nothing about it.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not request any review, do not touch any other pull request or repository, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when any of these occurs. State what passed, what failed, what is unchanged, and the single next decision.
- Your working directory is not the named clone, gh is not daley40-lab, the git identity differs, or the origin remote is not https.
- A hash, line count or byte count differs, or a transfer commit or blob is missing or is not the latest commit touching its path.
- main has moved outside precondition 1, or a file name or identifier of precondition 4 is already used under docs/.
- Any fact in precondition 5 is false.
- The log file would change anywhere but its end, or any path other than the four of ALLOWED SCOPE would change.
- An attribution-shaped line outside the final trailers cannot be rewrapped, or the secret scan finds a credential value.
- The branch exists on origin, the push is refused, or gh returns 401.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, the git identity, the origin remote's scheme, and the preconditions, each result with full SHAs, hashes, line and byte counts, and every quoted line.
2. The commit: full 40-character SHA, the four paths, the diff stat, the three cmp and blob-ID results, and the git diff of the log file with the appended entry's line count, byte count and SHA-256 and the file's SHA-256, line count and byte count.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4, before the act naming its exact head that lets it merge.
