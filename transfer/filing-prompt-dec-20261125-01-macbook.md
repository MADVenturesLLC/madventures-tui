STEP: file DEC-20261125-01 and the three addenda of DEC-20261123-01, and enter M1's two verdicts and merge in the correction-round log. Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261125-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act and the three addenda it files, in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261125-01-filing and open one draft pull request. You build no slice, and you change nothing in any other repository. This is a fresh session: do not look for, read or resume any earlier session, transcript or memory.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261125-01-filing. Then run gh api user --jq .login. It must print daley40-lab. Then run git config user.name and git config user.email; they must print daley40-lab and 293512385+daley40-lab@users.noreply.github.com. Then run git remote get-url origin; it must be an https URL, not an SSH one. If any differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. Run no process-listing command. Use no MCP server and start no other agent. Read nothing outside your own clone other than what this prompt names, fetch no web page, and run no test.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261125-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261125-M1-RECORDS-AND-M2 (DEC-20261125-01) on 2026-11-25. It is the act that records the merge of Phase 3B slice M1, pull request 254, under B25 of DEC-20261123-01. It enters M1's two Tier-2 verdicts, FAIL and then PASS, and its merge in the correction-round log under rubric milestone 6 with one correction round, rules on the findings of both reviews and on the two threads of Copilot's review, rules what happens when a governed child exits or its PTY host dies after activation, confirms item 4 of B4 of DEC-20261108-04 for M2, and commissions Phase 3B slice M2. Addenda 1 and 2 of DEC-20261123-01 were signed on 2026-11-23 and 2026-11-24 and Addendum 3 on 2026-11-25; each says it is filed unchanged with the act that records M1's merge. B25 of DEC-20261125-01 has one docs-only pull request, made by a Claude Code filing session under a filing prompt the Founder signs, do three things and change nothing else: add the three addenda under docs/decisions/ with their file names, unchanged; add the act as docs/decisions/DEC-20261125-01-m1-records-and-m2.md, unchanged; and append the entry of its C1 to the correction-round log. Under its B13 the merge commit of this pull request is M2's binding base, and M2's builder session starts only after it. None of the four texts authorizes a live call, and this pull request starts no slice.

AUTHORITY
Read AGENTS.md first, including its merge bullet as DEC-20261031-01 amended it, and B8 of docs/decisions/DEC-20261102-02-hardening-builds.md, which lets a filing session the Founder names push its branch and open its draft pull request as daley40-lab. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. After git fetch origin claude/awesome-cray-vqrzbt, read each text from the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- PATH, and report each commit. Each latest commit must be the transfer commit named here; if one differs, stop. Each path is transfer/ followed by the file name:
- DEC-20261125-01: DEC-20261125-01-m1-records-and-m2.md, at transfer commit b6ed0adbd159a8c57d1f427c8ab85c700a4deb96
- Addendum 1: DEC-20261123-01-addendum-1-environment-values-in-logs.md, at transfer commit a98c575b086fb302405f15418ef0e987c44f4a92
- Addendum 2: DEC-20261123-01-addendum-2-pty-echo.md, at transfer commit 5648e3e1c7de0de73d79a5bb53403b17de864cf6
- Addendum 3: DEC-20261123-01-addendum-3-first-verdict.md, at transfer commit d3c6cb034619c88d7b4c74e9cc6bb0caa5ad0e5e
Read all four in full before you write anything, and read docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be b091b668af7db6142c5afeff16a628080885f63b, the merge of pull request 254, exactly: under B10 and B13 of DEC-20261125-01 this pull request's merge commit is M2's binding base and may differ from that commit only under docs/decisions/ and docs/verification/. If origin/main is any other commit, report every path changed since b091b668af7db6142c5afeff16a628080885f63b and stop. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261125-01-filing must not exist on origin.
2. Each text has this SHA-256, line count and byte count; if any value differs, stop:
   DEC-20261125-01: 3a6259589ad33fd82f207560ca81b138516b4ce967e38523ec592b35c4cce3ac, 210 lines, 51,381 bytes.
   Addendum 1: 5cd930a3f2dbb8f3a85c63cfba5ed95f8088418ee132e89872d57e63fad75666, 40 lines, 5,412 bytes.
   Addendum 2: f524cb055c363c57dbcaf25dc037645989d453a942f3ce120c7083735e6cc52c, 49 lines, 8,364 bytes.
   Addendum 3: b7ff8171407289c4b4db9be9c76dfa049fdd8b0fe4f80076613f9aa6b48e43f7, 96 lines, 16,591 bytes.
   Confirm that A2 of DEC-20261125-01 gives each addendum's file name, SHA-256, line count, byte count and transfer commit as these, and that its B25 gives the act's file name as above; quote both.
3. Check each text with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero bare three-hyphen lines; zero lines ending in a space; zero runs of two or more underscores; zero tabs and zero carriage returns; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM, PENDING in capitals, or "to be completed"; and the word DRAFT nowhere in capitals. The three addenda hold zero square brackets and zero instances of the lowercase word pending. DEC-20261125-01 holds the lowercase string pending on eight lines, ten times in all, which is allowed: five times as the word pending, on lines 93, 152 (twice), 157 and 166, and five times inside the identifiers pendingTransfers (four) and pendingApprovals (one); it also holds four square brackets, on its lines 29 and 48, both inside its one fenced block, which opens on line 19 with three backticks and the word diff and closes on line 54, and which quotes code; it holds no other square bracket. Each text holds one em dash (U+2014), before the name in its signature. The section signs (U+00A7) are: DEC-20261125-01, 37; Addendum 1, 1; Addendum 2, 4; Addendum 3, 15. No text holds any other character outside ASCII. Keep each character outside ASCII as that one character.
4. On origin/main none of the four file names of ALLOWED SCOPE exists, and under docs/ neither of the strings DEC-20261125-01 and FOUNDER-ACT-20261125 appears. Any use is a stop. docs/verification/phase-3a-correction-rounds.md on origin/main has SHA-256 17d5154b0a04e4397dd1d2725752abf681509bd1563b2e7a2ff225fd66305933, 2,054 lines and 181,573 bytes, ends with exactly one newline, and contains none of the strings M1 review verdicts, DEC-20261125-01 and PR #254. Its last heading, which you quote with its line number, 1984, is ## madv-surface admission review verdict PASS and admission build merged (rubric milestones 1 and 3, no round, count 0).
5. Check the facts Part A of DEC-20261125-01 cites, and stop if any is false. Read-only, with git and gh api, in this repository only. Run every git command of this item with GIT_CONFIG_GLOBAL=/dev/null and GIT_CONFIG_NOSYSTEM=1 set for that command.
   a. The merge (A3 and A9). gh api repos/MADVenturesLLC/madventures-tui/pulls/254 shows: created by decivantiq at 2026-11-24T15:54:45Z; merged at 2026-11-25T21:07:53Z by decivantiq; head ref build/3b-m1-r1 at 2fb92148c361ab7434d1e62e87cdeb9e59842b3f; base sha 75aec139d503cbe1d34d0c6f3ac5bd514339570e; 15 commits and 36 changed files. git cat-file -p b091b668af7db6142c5afeff16a628080885f63b shows the tree d44b23695abf7d3641bd3a099e7ff20f785e47b4 and the parents 75aec139d503cbe1d34d0c6f3ac5bd514339570e and, second, 2fb92148c361ab7434d1e62e87cdeb9e59842b3f, and 2fb92148c361ab7434d1e62e87cdeb9e59842b3f has the same tree. git diff --name-status 75aec139d503cbe1d34d0c6f3ac5bd514339570e b091b668af7db6142c5afeff16a628080885f63b lists 36 paths, 26 added and 10 modified. git rev-list --reverse 75aec139d503cbe1d34d0c6f3ac5bd514339570e..2fb92148c361ab7434d1e62e87cdeb9e59842b3f lists exactly fifteen commits, in this order: 0cb595500c5775d6d77a64fe01fd723100b1bf1f, 9542eb4b27f0ce009a389feb50d8eff68e7f0878, dd19008a74a2ffbd85703f9dbb031a23e8571702, 0b85d3a2403527eb08182f96843b97b58db5d9c4, 54eee8cdcb6703d7c1addf6b643ad0eefec75811, 16a11409c10787f7413d0b99493b0938567e5eee, 68ac32c85278d27eb76541ea9d7f18a0a12f87ed, d5d40d6dcd90a930c106cec55ea836c5cc4400ce, f1fdd9e646ee1c4aa0ddad136a19da13db2600ec, aedcdc025219a6ad4147d01d9ead8a5fd73575ea, 2f89e2e4b5ac7abeaa936cb68aa996e52795c664, bbaa5e4149c8067bff81e77ad467671c170ee56b, 4630152f763baca0259d84c0d5817d0cea501145, d8818704410a72e277fc05a3a40535528b5da710 and 2fb92148c361ab7434d1e62e87cdeb9e59842b3f. Each has one parent, author and committer name daley40-lab, and the three trailers Role-Id: builder, Actor-Id: session:codex/3b-m1-r1 and Execution-Surface: codex in its message. At b091b668af7db6142c5afeff16a628080885f63b, docs/verification/phase-3b-m1-build-log.md has SHA-256 6875e61781cba21806929e72ef1431c633003c466d01099cbf4530f5a1acdee9 and docs/verification/phase-3b-m1-evidence.md has SHA-256 3dc677145aabdfb10446d3b505575d6690ca3b08fa07057dd108c4343b7f5d28. git diff --stat 75aec139d503cbe1d34d0c6f3ac5bd514339570e b091b668af7db6142c5afeff16a628080885f63b -- packages/pty-host/src/terminal.ts packages/pty-host/test/main-guard.test.ts shows one insertion in the first and two insertions and two deletions in the second, and git diff of those two files equals the diff A2 item 2 of DEC-20261125-01 quotes, once trailing whitespace is removed from both.
   b. The comments (A7 to A9). gh api repos/MADVenturesLLC/madventures-tui/issues/254/comments lists exactly six comments: 7136942805 by github-actions with the suffix of a bot, at 2026-11-24T15:59:25Z; 7152608903 by decivantiq at 2026-11-25T04:11:10Z, whose first line begins TIER-2 REVIEW VERDICT: MADVenturesLLC/madventures-tui; 7152609315 by decivantiq at 2026-11-25T04:11:11Z, whose first line begins TIER-2 REVIEW VERDICT, CONTINUED: MADVenturesLLC/madventures-tui; 7170917360 by decivantiq at 2026-11-25T18:26:46Z, whose first line begins TIER-2 REVIEW VERDICT: MADVenturesLLC/madventures-tui; 7174298371 by decivantiq at 2026-11-25T20:52:10Z, whose first line begins FOUNDER NOTE ON THE COPILOT REVIEW: MADVenturesLLC/madventures-tui; and 7174648832 by decivantiq at 2026-11-25T21:07:42Z, whose first line begins MERGE AUTHORIZATION: MADVenturesLLC/madventures-tui. For 7152608903 and 7170917360, quote each one's Reviewer id, Head reviewed, Verdict and Report SHA-256 lines, and confirm that each head, SHA-256, line count, byte count and saved path equals that of THE LOG ENTRY for the first and the second verdict. For 7174298371 and 7174648832, confirm that each body, with carriage returns removed and trailing newlines dropped, equals, with trailing newlines dropped, transfer/pr254-copilot-note.md and transfer/pr254-merge-authorization.md, each at the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, cb9fc1ce56aaa58e9d6a2ea52a568f411e6191d2, whose SHA-256 are f4d5ab0c7f6ee6471297fae2f709845081dfa8fc45e56d9d4888153896b3dc18 and 652873058530601b8ad79c5f05576a5dbc9e3bdfa29911a5e6261e2e7ba6ef79. Quote nothing else from any comment.
   c. Ready, Copilot and the merge (A9). gh api repos/MADVenturesLLC/madventures-tui/pulls/254/reviews shows exactly one review, 6063305332, by a login that begins copilot-pull-request-reviewer, state COMMENTED, at commit 2fb92148c361ab7434d1e62e87cdeb9e59842b3f, submitted at 2026-11-25T18:59:18Z. gh api repos/MADVenturesLLC/madventures-tui/pulls/254/comments lists exactly two review comments, 4699513340 on packages/adapter-claude-code/src/live.ts and 4699513419 on packages/adapter-madv-surface/src/live.ts, each with pull_request_review_id 6063305332. gh api graphql on the review threads of pull request 254 shows exactly two threads, each resolved. The timeline, read with gh api "repos/MADVenturesLLC/madventures-tui/issues/254/timeline?per_page=100" --paginate, has one ready_for_review event by decivantiq within two seconds of 2026-11-25T18:55:24Z, before the reviewed event of review 6063305332, and one merged event at 2026-11-25T21:07:53Z.
   d. The runs (A6 and A9). gh api repos/MADVenturesLLC/madventures-tui/actions/runs/ID shows, for each of 45701474360, 45701472201 and 45701472557, status completed, conclusion success and head_sha b091b668af7db6142c5afeff16a628080885f63b; report each one's name. For each of 45680670453, 45680669094 and 45680670177, it shows name code-review, status completed, conclusion success, run_attempt 2 and head_sha 2fb92148c361ab7434d1e62e87cdeb9e59842b3f. gh api repos/MADVenturesLLC/madventures-tui/check-runs/ID shows check run 139437921331 named copilot-pull-request-reviewer with conclusion success, and check runs 139420909280, 139437813551 and 139504005629 each named Cursor Security Agent: Security Reviewer, from the app with the slug cursor, with conclusion success; each at head_sha 2fb92148c361ab7434d1e62e87cdeb9e59842b3f.
   e. The signed texts (A2 to A4, A7 to A9). For each of these, find the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, and confirm the commit and the SHA-256 of the file at that commit: transfer/builder-prompt-m1-codex-macbook.md at dffb73cc5df2fdcfd43ead6e22f3c5dabc983846, 683951e9534f1517f68b690ceec554a3908a8dd6cebd2bd97f8791e56e6e4733; transfer/resume-m1-1-runtime.md at 7005e1092442c30fb5b0ac9a5e329da48f027884, c4436aa4cb445bb00682982b1dd38355bb822cfce2a9f15371b1c53d7a62bc9c; transfer/resume-m1-2-test-output.md at a98c575b086fb302405f15418ef0e987c44f4a92, 611e62f080409fe686392d45455622d509732bea2875e4a754cdb4c00f5263e5; transfer/resume-m1-3-pty-echo.md at 5648e3e1c7de0de73d79a5bb53403b17de864cf6, 7176750c77c97b52bb9a0f0e16f5d6ea68f7be8ed27b5f209a0940e7bff9f1ea; transfer/resume-m1-4-correction-round-1.md at d3c6cb034619c88d7b4c74e9cc6bb0caa5ad0e5e, 3a05d0983a06b908afcae236f0e57a0816d0a31c99b4f935319dab11e41961fa; transfer/review-prompt-m1-antigravity-r1.md at 652c29030b09a188ea803bf47e882ccf02cbaea5, 9a5c4f50358fe8646af345327dfbc3a6576a4f27eb244dc551721c1c99f4254a; transfer/review-prompt-m1-antigravity-r2.md at e01af0bdf8bd790fa19b68e157010dcf393b2ca7, 574991a7ee72772dee80f9b3b2293f19802b7f54b998a2107a04b9720f6bd173; transfer/pr254-copilot-note.md and transfer/pr254-merge-authorization.md at cb9fc1ce56aaa58e9d6a2ea52a568f411e6191d2, with the SHA-256 of item b; transfer/h2-record-check.mjs at 730df3014bf31d2dc0770cb4d30a4a4a79e30afe, c1834dcc689e94cf57fb123a09a0600225d8e97b428c648f14276136e3dd383f; transfer/m1/delivery/record-check.txt at ed82ac53a6bed3e65912985ff3ba3a8290fe19a7, c2d6505eb1d5c1ed8e1435e50370d93b27819e19f00c9d6bf4b5f2421a38d576; and transfer/m1/delivery-r1/record-check.txt at 343755cd4c87665d60c750779e0863a55f29f2e7, 19b892b62883e76f99c8c17f0c36cc8372bd90aa746290e873d3c2bd69424eb9.
   f. Preflight (A10). With git rev-parse, test/phase3a/runtime-harness.ts is blob 8e63d73f723c3fa7eea2e300c3e378e107957b0b at both 75aec139d503cbe1d34d0c6f3ac5bd514339570e and b091b668af7db6142c5afeff16a628080885f63b; packages/supervisor/src/preflight.ts is blob 43619191f47e3f9cdaefd8aa45cd436770690160 at the first and 2edb02c049dea7b65e5d546bdac35b0933eeb95b at the second; and packages/supervisor/test/preflight.test.ts is blob f8f117aaf90d8b3218fbec4f0331563b036eae05 at the first and 67f95abdcf8fa75f8c296bc8cbf4fb5e378ce214 at the second.
   g. In this repository, at b091b668af7db6142c5afeff16a628080885f63b, quote with line numbers: B15 (line 101), B17 (line 117), B22 (line 165) and B25 (line 171) of docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md; the first line of B2 (line 70), of B4 (line 90) and of C3 (line 162) of docs/decisions/DEC-20261108-04-phase-3b-standing-commission.md; item 2 of B9 (line 54) and B11 (line 58) of docs/decisions/DEC-20261108-01-phase-3b-approval.md; B7 (line 36) of docs/decisions/DEC-20261108-04-addendum-1-corrections.md; B3 (line 32) of docs/decisions/DEC-20261015-05-phase-3a-process.md; lines 437 and 438 of docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md; and, for A11 of DEC-20261125-01, lines 35 to 37 and line 768 of packages/broker/src/pty-host-supervisor.ts, lines 490 and 491 of packages/supervisor/src/build.ts, lines 682 to 690 of test/phase3a/runtime-harness.ts, lines 37 and 39 of packages/protocol/src/lifecycle-events.ts, lines 162 to 167 of packages/adapter-claude-code/src/live.ts and lines 74 to 84 of packages/adapter-madv-surface/src/live.ts.
   The facts that rest on the Founder's MacBook or Ubuntu PC, which are the builder session, its halts and reports and its session record of A3 and A4, the Founder's runs of A5, the CI facts of A6 that this item does not name, the reviewers' reports and the Founder's checks of them of A7 and A8, the evidence of A12, and the drafting session's account of A13, rest on the Founder's own checks and on reports to the Founder; read none of them, and report them as not checked. Report every other fact of Part A that this item does not name as not checked, and do not stop on it.

ALLOWED SCOPE
One commit, exactly five paths. Four are new, each byte for byte from its transfer blob and with the file name the AUTHORITY list gives:
  docs/decisions/DEC-20261123-01-addendum-1-environment-values-in-logs.md
  docs/decisions/DEC-20261123-01-addendum-2-pty-echo.md
  docs/decisions/DEC-20261123-01-addendum-3-first-verdict.md
  docs/decisions/DEC-20261125-01-m1-records-and-m2.md
The fifth is docs/verification/phase-3a-correction-rounds.md, modified only by appending the entry of THE LOG ENTRY at its end. Before committing, git status --porcelain must list only those five paths. Do not change any other file.

THE LOG ENTRY
A pasted copy of this prompt can lose its line breaks and formatting, so take the text between the marker lines from this prompt's copy on the transfer branch, transfer/filing-prompt-dec-20261125-01-macbook.md at the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, and report that commit. Append to the end of docs/verification/phase-3a-correction-rounds.md, after its present last line: exactly one blank line, then the text of THE LOG ENTRY without its marker lines, ending with exactly one newline. Change no other byte of the file. Then show git diff of that file and confirm that every changed line is an added line at its end. Report the entry's line count, byte count and SHA-256 as appended, without its leading blank line: it has 82 lines, 7,141 bytes and SHA-256 ada5a078129a642eb1b787810ee180f3e6c46ff8e6706d6eccaf5e2d0a3de761. The file then has SHA-256 9177579362d4c14da10fd7da4ad9428886439ece640735f56807e3a929ef8edc, 2,137 lines and 188,715 bytes, and its new heading is on line 2056. The entry is ASCII only.
BEGIN LOG ENTRY
## M1 review verdicts FAIL and PASS and M1 merged (rubric milestone 6, one round, count 1)

- **Recorded:** 2026-11-25, under `DEC-20261125-01` B1 to B14 and C1, and `DEC-20261123-01` Addendum 3
  B2.
- **Plan milestone:** Phase 3B slice M1, live composition, health barrier and live attesters, offline
  (`DEC-20261123-01` B13 to B26). **Rubric milestone:** 6 (`DEC-20261108-01` B9 item 2), in M1's own
  count (`DEC-20261123-01` B15 item 3).
- **Heads reviewed:** `4630152f763baca0259d84c0d5817d0cea501145`, then
  `2fb92148c361ab7434d1e62e87cdeb9e59842b3f`, on PR #254 (`build/3b-m1-r1`), built by
  `session:codex/3b-m1-r1` from binding base `75aec139d503cbe1d34d0c6f3ac5bd514339570e` under
  `DEC-20261123-01` and its Addenda 1 to 3, SHA-256
  `5cd930a3f2dbb8f3a85c63cfba5ed95f8088418ee132e89872d57e63fad75666`,
  `f524cb055c363c57dbcaf25dc037645989d453a942f3ce120c7083735e6cc52c` and
  `b7ff8171407289c4b4db9be9c76dfa049fdd8b0fe4f80076613f9aa6b48e43f7`, the builder prompt with SHA-256
  `683951e9534f1517f68b690ceec554a3908a8dd6cebd2bd97f8791e56e6e4733` and four resume messages, the last
  with SHA-256 `3a05d0983a06b908afcae236f0e57a0816d0a31c99b4f935319dab11e41961fa`. Before the first
  review the session halted three times: when its runtime check ran a barred Bun; when a break wrote
  values of its environment to log 124, which the Founder deleted under Addendum 1; and when the PTY
  host echoed the prompt before the stand-in read it, which Addendum 2 resolved by clearing the echo bit
  (`DEC-20261125-01` A3 and B1).
- **First reviewer:** `antigravity`, a fresh Gemini session in Antigravity on the Founder's MacBook; the
  report records the model as not shown. Review prompt SHA-256
  `9a5c4f50358fe8646af345327dfbc3a6576a4f27eb244dc551721c1c99f4254a`.
- **First verdict text SHA-256:** `882bb886a52bdfc6064af8fba96c7e986f6eaa4f778e266c076613bca2fecfae`,
  83,621 bytes, 854 lines, saved at `/Users/michaeldaley/builds/review-m1-r1.md`, posted on PR #254 as
  comments 7152608903 and 7152609315 by `decivantiq`.
- **First result:** FAIL, two SUBSTANTIVE and three ADVISORY findings. Findings 1 and 2: no test gave
  the attesters the `claude-code` cause `auth_failed`, or `madv-surface`'s causes from its events and
  exit codes, which `DEC-20261123-01` B17 item 4 and B21 item 3 require. Findings 3 to 5: log numbers
  the build log did not account for, a `skillOverrides` test that accepted `"on"`, and a cancellation
  test without SIGINT and SIGTERM. **Counted:** one round, M1's first, under rubric milestone 6, and not
  a disqualifier (`DEC-20261123-01` Addendum 3 B2 and B3).
- **Correction round 1:** in the same builder session, under Addendum 3 B4 and the fourth resume
  message: one commit, `d8818704410a72e277fc05a3a40535528b5da710`, adding 11 tests to four test files,
  each shown failing on its prescribed break, and one scenario to the helper
  `test/phase3b/scenarios.ts`; and one commit appending the round to the build log, the head. No
  production file changed.
- **Second reviewer:** `antigravity`, a fresh Gemini session in Antigravity on the Founder's MacBook,
  with a model the report shows as Gemini 4 Neon (High). Review prompt SHA-256
  `574991a7ee72772dee80f9b3b2293f19802b7f54b998a2107a04b9720f6bd173`, under Addendum 3 B8.
- **Second verdict text SHA-256:** `96c697b746951c30b042a55f43ab6a6456d6faf74f7421c0a31844103f213796`,
  54,417 bytes, 436 lines, saved at `/Users/michaeldaley/builds/review-m1-r2.md`, posted on PR #254 as
  comment 7170917360 by `decivantiq`.
- **Second result:** PASS, items 1 to 9, no SUBSTANTIVE finding. Finding 1, NOT COUNTING: the build
  log's quote of one log drops a trailing space on two lines without saying so. Findings 2 and 3,
  ADVISORY: no test that a `system`/`api_retry` error the registration does not name gives no
  `auth_failed`, and none of a `madv-surface` exit code other than 1, 5 and 9 or of an exit by signal;
  M2 answers both with tests (`DEC-20261125-01` B5). **Counted:** no round. M1's count under rubric
  milestone 6 closes at **1**. No verdict of M1 is a disqualifier.
- **Checks at the heads:** on the test merges of the first head and of the head into `main`,
  `23883050ef06775975fb7331131b1115aaa62a6f` and `92bb1e328f8e9aed779396783a8cc4584c1a8420`, Verify and
  Verify (macOS) passed with 2078 and then 2089 pass, 0 fail, across 160 files, and tui-chaos on both
  hosts, validate-code-review, code-review, attribution-shape, CodeQL and every Analyze job succeeded.
  The Founder's runs of `DEC-20261123-01` B24 passed at each head on the MacBook under Bun 1.4.2 and on
  the Ubuntu PC under the custodied Bun 1.4.1; at the head, 2089 pass, 0 fail, across 160 files on each,
  log manifests SHA-256 `f1c7438ac8abc89f4a2d053f281a7e991179500f82e7a5744b6ed143b10dd5d3` and
  `3baa609394e758ad5d01455c1bcfba846ba79e83c16fe8db0b97e98f0c3b0c12`.
- **Merged:** PR #254 was marked ready at the head on 2026-11-25, after the PASS was posted, and GitHub
  then requested Copilot's review. Copilot's review 6063305332 opened two threads, on how each surface's
  monitor treats the end of its child after activation. The Founder's note on that review, comment
  7174298371, SHA-256 `f4d5ab0c7f6ee6471297fae2f709845081dfa8fc45e56d9d4888153896b3dc18`, found each
  right in substance and neither a breach of a ruling, and carried both to `DEC-20261125-01`; the
  Founder's command resolved both threads. Under the Founder's merge authorization in comment
  7174648832, SHA-256 `652873058530601b8ad79c5f05576a5dbc9e3bdfa29911a5e6261e2e7ba6ef79`, it merged at
  `b091b668af7db6142c5afeff16a628080885f63b`, with parents `75aec139d503cbe1d34d0c6f3ac5bd514339570e`
  and `2fb92148c361ab7434d1e62e87cdeb9e59842b3f`, changing exactly 36 paths, 26 added and 10 modified.
  Every run on the merge commit succeeded.
- **Harness:** one builder session under Codex 0.167.0, the governed build of `DEC-20261108-03` Addendum
  11. All twelve turns of its one session record, the two resumed turns included, name the model
  `gpt-6.2-astra` and the effort `xhigh`.
- **The end of the child after activation (`DEC-20261125-01` A11, B8 and B9):** no production path ended
  a live session when its governed child exited or its PTY host died after activation, though Phase 3A
  design section 3.3 requires it. The Founder ruled that from the handover each monitor watches its
  child, that an exit to which the parser or reader gives no cause is `child_exited` and a fact stream
  that ends with no exit is `host_exited`, and that before activation these fail the build as
  `reattestation_failed` and after it interrupt the session with `child_failure` and `pty_host_failure`.
  M2 builds it, before M3 routes input to the PTY hosts and before M4's session controls
  (`DEC-20261125-01` B9).
- **M2 (`DEC-20261125-01` B10 to B14):** `DEC-20261108-04` B4 item 4 is confirmed for M2's base.
  `DEC-20261125-01` is M2's act: M2's binding base is the merge commit of the pull request that files
  it; its builder is `session:codex/3b-m2-r1` and its reviewer `antigravity`; and its verdicts count
  under rubric milestone 7, in a count that starts at zero.
END LOG ENTRY

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting a signature or the trailers of M1's commits. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261125-01 and Addenda 1 to 3 of DEC-20261123-01, and enter M1. The body says that the Founder signed DEC-20261125-01 on 2026-11-25; that it records the merge of Phase 3B slice M1, pull request 254, at b091b668af7db6142c5afeff16a628080885f63b, rules what happens when a governed child exits or its PTY host dies after activation, confirms item 4 of B4 of DEC-20261108-04 for M2 and commissions Phase 3B slice M2; that under its B25 this one pull request files the three addenda of its A2 and the act unchanged and appends the entry of its C1 to the correction-round log; that under its B13 the merge commit of this pull request is M2's binding base; that the texts come from the transfer commits you reported; that none of them authorizes a live call; and that the change is docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. The texts hold many SHA-256 values and git SHAs; a hit that is an actual credential value is a stop.
- cmp each of the four new files against its transfer blob, and report that the bytes match and that each committed git blob ID equals its transfer blob ID. Report the SHA-256, line count and byte count of the committed log file, which must equal those THE LOG ENTRY gives.
- Push the branch with git push -u origin docs/dec-20261125-01-filing over the https remote. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 253 with gh api repos/MADVenturesLLC/madventures-tui/pulls/253 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Say in it that docs/decisions/ is a governance path, so the pull request merges only on a Founder act naming its exact head, and that its merge commit is M2's binding base under B13 of DEC-20261125-01. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261125-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link, and do not write the login of the Copilot reviewer or of the github-actions bot in the body, each of which ends in a bracketed suffix; describe each as Copilot's reviewer account and the github-actions bot.
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
- The log file would change anywhere but its end, or any path other than the five of ALLOWED SCOPE would change.
- An attribution-shaped line outside the final trailers cannot be rewrapped, or the secret scan finds a credential value.
- The branch exists on origin, the push is refused, or gh returns 401.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, the git identity, the origin remote's scheme, and the preconditions, each result with full SHAs, hashes, line and byte counts, and every quoted line.
2. The commit: full 40-character SHA, the five paths, the diff stat, the four cmp and blob-ID results, and the git diff of the log file with the appended entry's line count, byte count and SHA-256 and the file's SHA-256, line count and byte count.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4, before the act naming its exact head that lets it merge.
