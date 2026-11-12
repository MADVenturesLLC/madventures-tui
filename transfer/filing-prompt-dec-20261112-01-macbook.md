STEP: file DEC-20261112-01 and Addenda 1 to 10 to DEC-20261108-03, and enter H1's three verdicts in the correction-round log. Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261112-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for eleven Founder texts in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261112-01-filing and open one draft pull request. You build no slice.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261112-01-filing. Then run gh api user --jq .login. It must print daley40-lab. Then run git config user.name and git config user.email; they must print daley40-lab and 293512385+daley40-lab@users.noreply.github.com. Then run git remote get-url origin; it must be an https URL, not an SSH one. If any differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. Run no process-listing command. Use no MCP server and start no other agent. Read nothing outside your own clone other than what this prompt names, and run no test.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261112-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261112-PHASE-3B-H1-RECORDS (DEC-20261112-01) on 2026-11-12. It records Phase 3B slice H1, which merged as pull request 234 at a7251235f94dcc4a3149b638a1acdac69236a26d: it enters H1's three Tier-2 verdicts with their rulings, records H1's builder sessions, session records, harness and model, closes H1's correction-round count at one, places three carried items with a hardening act issued before M6, and rules that the Cursor check on the pull request is not a check, review or gate. Addenda 1 to 10 to DEC-20261108-03, the act of slice H1, were signed from 2026-11-08 to 2026-11-11; each says it is filed unchanged with the act that records H1's merge. B10 of DEC-20261112-01 has one docs-only pull request, made by a Claude Code filing session, add the ten addenda and that act under docs/decisions/, each unchanged, and append the three entries of its C1 to the correction-round log, and change nothing else. None of the eleven texts authorizes a build or a live call. H2 starts only after this pull request merges (DEC-20261112-01 B9).

AUTHORITY
Read AGENTS.md first, including its merge bullet as DEC-20261031-01 amended it, and B8 of docs/decisions/DEC-20261102-02-hardening-builds.md, which lets a filing session the Founder names push its branch and open its draft pull request as daley40-lab. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. After git fetch origin claude/awesome-cray-vqrzbt, read each text from the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- PATH, and report each commit. Each latest commit must be the transfer commit named here; if one differs, stop:
- DEC-20261112-01: transfer/DEC-20261112-01-h1-records-and-merge.md, at transfer commit 6ef843594c54ca89d0fd6f78e27f21d0287d3740
- Addendum 1: transfer/DEC-20261108-03-addendum-1-gate-order.md, at transfer commit 8c5d14ed160ca2f58b537fd051b0242d784dc042
- Addendum 2: transfer/DEC-20261108-03-addendum-2-codex-harness.md, at transfer commit 155764b955dba5a6cdbed7479c002183794a5e9e
- Addendum 3: transfer/DEC-20261108-03-addendum-3-image-tool.md, at transfer commit 62d0dcd7b79e14f084612a3a5d81f4316ace5ed4
- Addendum 4: transfer/DEC-20261108-03-addendum-4-sandbox-halt.md, at transfer commit 6f606bd032372e77992ecc8aa21187a7c5f4185d
- Addendum 5: transfer/DEC-20261108-03-addendum-5-own-work.md, at transfer commit 4e42a904a02bc6467b01b85729a58ba9f31452b6
- Addendum 6: transfer/DEC-20261108-03-addendum-6-names-in-text.md, at transfer commit 925cfdb2f7ecbfca6d694318df1e0101a6711044
- Addendum 7: transfer/DEC-20261108-03-addendum-7-quarantine-limit.md, at transfer commit d6af0063c3170c282deb7335916ad9587ed675d7
- Addendum 8: transfer/DEC-20261108-03-addendum-8-gate-repeat.md, at transfer commit f515510aa6606d3e0ae65026acdb3f90ac90d017
- Addendum 9: transfer/DEC-20261108-03-addendum-9-first-verdict.md, at transfer commit 36d581a5069cf0fd6fe4fbef543c99ba0cf6a77e
- Addendum 10: transfer/DEC-20261108-03-addendum-10-second-verdict.md, at transfer commit 3bf273846ba9dc7cf9b272a3736254341a78ee85
Read all eleven in full before you write anything, and read docs/decisions/DEC-20261108-03-phase-3b-h1.md. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be a7251235f94dcc4a3149b638a1acdac69236a26d, the merge of pull request 234, or a descendant whose changes since that commit touch no path under docs/decisions/ and not docs/verification/phase-3a-correction-rounds.md. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261112-01-filing must not exist on origin.
2. Each text has this SHA-256, line count and byte count; if any value differs, stop:
   DEC-20261112-01: bc32595bc609e22fdff2712b3fb6e4744840e5f1330a38d3955ce684ea7bea49, 125 lines, 16,047 bytes.
   Addendum 1: ee5edbe2e3b377c11afd63a3b60775a802498d6be093f0dba619283569bd31fd, 38 lines, 3,016 bytes.
   Addendum 2: e04b54065b0f0bb465b2d14e14a39f3b31f9cb34a874f6f8210a7d7e74a8c1c1, 44 lines, 5,476 bytes.
   Addendum 3: f2a0ef1063379902935760d9517b68d532cabf6e24699cdebb789681f78ce15e, 36 lines, 2,827 bytes.
   Addendum 4: e817470aea6be2c176d4ae75856fd793ef982bd28c9eb793df9c9038a5c1dfbc, 42 lines, 4,835 bytes.
   Addendum 5: e86e94a62c7067e4656114afe1713c1478814ffe446d1ffcc8b788accfc3ff3d, 42 lines, 5,768 bytes.
   Addendum 6: 24cef0ed5c968aa80ada586e473526d0f4f0b1de1331eba1d5a35051b1254ac9, 48 lines, 4,642 bytes.
   Addendum 7: cd15d604dacb0bad4f27a18bda7936799076f3f8743301cb893bf3079c270361, 52 lines, 6,387 bytes.
   Addendum 8: aca83d3bfcddc137687e0d2339ee409d937a2117342c9ffa6cdb10dc3da40c78, 46 lines, 6,152 bytes.
   Addendum 9: 2381ba7b2b3778d4548b64120fe8198e3076e3c25fe28ce64965bf1c8fb902a0, 69 lines, 11,952 bytes.
   Addendum 10: d90d48718bc4ea6056af6f011f797a78eddcfd14e7111f15f823085c4388bca0, 79 lines, 13,739 bytes.
   Each addendum's SHA-256 also equals the one the table of A2 of DEC-20261112-01 gives for it, and each transfer commit equals the one that table gives; report that comparison.
3. Check each text with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero bare three-hyphen lines; zero lines ending in a space; zero square brackets; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals. Runs of two or more underscores: zero in DEC-20261112-01 and in Addenda 1, 4, 5, 7, 8, 9 and 10. In Addenda 2, 3 and 6 every such run is part of a tool name: grep -o '[A-Za-z0-9_]*__[A-Za-z0-9_]*' FILE | sort | uniq -c must print only mcp__codex_tui, 10 times in Addendum 2, 2 times in Addendum 3 and 2 times in Addendum 6, and clock__curr_time, once in Addendum 2. Report that output for each of the three.
4. On origin/main none of the eleven file names of ALLOWED SCOPE under docs/decisions/ exists, and under docs/ neither of the strings DEC-20261112-01 and FOUNDER-ACT-20261112 appears. Any use is a stop. docs/verification/phase-3a-correction-rounds.md on origin/main has SHA-256 0f620185fa292915055140569576023e281e0914b67a1874c2f96e807eff3eb0, 1,692 lines and 150,856 bytes, ends with exactly one newline, contains none of the strings PR #234, DEC-20261108-03 and DEC-20261112-01, and its last heading, which you quote with its line number, is ## M26 review checkpoint closed and Phase 3A merged (rubric milestones 2 and 10, count unchanged).
5. Check the facts Part A of DEC-20261112-01 cites, and stop if any is false. Read-only, with gh api, git and shasum. Run every git command of this item with GIT_CONFIG_GLOBAL=/dev/null and GIT_CONFIG_NOSYSTEM=1 set for that command:
   a. Pull request 234 is merged, at 2026-11-12T01:04:43Z, with merge commit a7251235f94dcc4a3149b638a1acdac69236a26d, whose parents, read with gh api repos/MADVenturesLLC/madventures-tui/git/commits/SHA, are aeca237eea1062c31b2c4a63f487349f2fc8f633 and, second, 915dd0c4431e8f51458556c9f7ee64f6d8c303c6. git diff --name-only aeca237eea1062c31b2c4a63f487349f2fc8f633 a7251235f94dcc4a3149b638a1acdac69236a26d lists exactly apps/madv-agent/src/proxy.ts, docs/verification/phase-3b-h1-build-log.md, test/phase3a/architecture-phase3a.test.ts, test/phase3a/evidence-pipeline.test.ts and test/phase3a/runtime-harness.ts, which are the paths of B7 of docs/decisions/DEC-20261108-03-phase-3b-h1.md.
   b. git log --reverse --format='%H %P %an %cn' 1678f1839c600cacd38fd426f755afae021861bf..915dd0c4431e8f51458556c9f7ee64f6d8c303c6 lists exactly eight commits, each with one parent, in this order: f4aefe1e89f566a0f4a76d7cc18c209f70d719e8, 8e5b471aed5330dd1b620f2a040540871b6fd047, 56775934aa653daefa9bb40f8c42a26e9f8e732a, 21e12ad56d7e821e7c8a49c6a2a3c688ab15eed6, d09712a67db06fc6a7cee9bf0674ac8b509a8200, 5279efd8a07f0f9545b70519fef76f22e68112f3, 8c7afeae7e3209be8033ad6315b4be313f907713 and 915dd0c4431e8f51458556c9f7ee64f6d8c303c6. Each has author and committer daley40-lab, and the final paragraph of each message holds the three trailers Role-Id: builder, Actor-Id: session:codex/h1-r1 and Execution-Surface: codex.
   c. Issue comments 6800079155, 6800079742, 6808073618, 6811012944 and 6811281202 are on pull request 234, read with gh api repos/MADVenturesLLC/madventures-tui/issues/comments/ID, each posted by decivantiq. Their first lines begin, in order, TIER-2 REVIEW VERDICT: MADVenturesLLC/madventures-tui#234, TIER-2 REVIEW VERDICT, CONTINUED: MADVenturesLLC/madventures-tui#234, TIER-2 REVIEW VERDICT, ROUND 2: MADVenturesLLC/madventures-tui#234, TIER-2 REVIEW VERDICT, ROUND 3: MADVenturesLLC/madventures-tui#234 and MERGE AUTHORIZATION: MADVenturesLLC/madventures-tui#234. For 6800079155, 6808073618 and 6811012944, quote the Head reviewed, Verdict and Report SHA-256 lines, and confirm that the head, the SHA-256, the line count, the byte count and the saved path each equal those of LOG ENTRY 1, 2 and 3 in turn. For 6811281202, confirm that it holds the line Authorized head: 915dd0c4431e8f51458556c9f7ee64f6d8c303c6, and that its body, with carriage returns removed and trailing newlines dropped, equals transfer/pr234-merge-authorization.md at the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, 31cd21a8d0a17f99a47c3b25991850795f9da133, with trailing newlines dropped; that transfer file has SHA-256 93b3f1bfc230973fb90e0b2c168a25f2422e471569a5b04047f74ed892f9209d. Quote nothing else from any comment.
   d. Review 5867422948 on pull request 234 was submitted by the Copilot reviewer, whose login begins copilot-pull-request-reviewer, at commit 915dd0c4431e8f51458556c9f7ee64f6d8c303c6. gh api repos/MADVenturesLLC/madventures-tui/pulls/234/comments --jq length prints 0.
   e. Pull request 234 was created by decivantiq at 2026-11-10T04:20:27Z. Its timeline, read with gh api repos/MADVenturesLLC/madventures-tui/issues/234/timeline, has one ready_for_review event, by decivantiq at 2026-11-12T00:55:35Z, after comment 6811012944, which was posted at 2026-11-12T00:48:20Z.
   f. Runs 43131944565, 43131943757 and 43131944006 each have head_sha a7251235f94dcc4a3149b638a1acdac69236a26d and conclusion success; report each run's name. Jobs 130694824207 and 130704966691, read with gh api repos/MADVenturesLLC/madventures-tui/actions/jobs/ID, are each named Verify (macOS), with run_id 43069953573 and head_sha 915dd0c4431e8f51458556c9f7ee64f6d8c303c6; the first has run_attempt 1 and conclusion failure, the second run_attempt 2 and conclusion success.
   g. At a7251235f94dcc4a3149b638a1acdac69236a26d: quote line 631 of packages/broker/test/pty-host-supervisor.test.ts with its line number, and report that apps/madbridge/src/cli.ts, packages/broker/src/socket.ts and test/phase3a/runtime-harness.ts exist. Quote with line numbers item 2 of B9 of docs/decisions/DEC-20261108-01-phase-3b-approval.md, which places H1 under rubric milestone 10, and B15 of docs/decisions/DEC-20261108-03-phase-3b-h1.md, which says the act that records H1's merge enters its verdicts in the correction-round log.
   The facts that rest on the Founder's MacBook outside your clone, which are the builder sessions and session records of A3 and A4, the Codex versions of B4, the Founder's run of A6, the Cursor automation of A8 and the evidence of A9, and the reviewer and model of each verdict, rest on the Founder's own checks and on reports to the Founder; read none of them, and report them as not checked.

ALLOWED SCOPE
One commit, exactly twelve paths. Eleven are new, each byte for byte from its transfer blob, under the file name the table of A2 of DEC-20261112-01 gives:
  docs/decisions/DEC-20261108-03-addendum-1-gate-order.md
  docs/decisions/DEC-20261108-03-addendum-2-codex-harness.md
  docs/decisions/DEC-20261108-03-addendum-3-image-tool.md
  docs/decisions/DEC-20261108-03-addendum-4-sandbox-halt.md
  docs/decisions/DEC-20261108-03-addendum-5-own-work.md
  docs/decisions/DEC-20261108-03-addendum-6-names-in-text.md
  docs/decisions/DEC-20261108-03-addendum-7-quarantine-limit.md
  docs/decisions/DEC-20261108-03-addendum-8-gate-repeat.md
  docs/decisions/DEC-20261108-03-addendum-9-first-verdict.md
  docs/decisions/DEC-20261108-03-addendum-10-second-verdict.md
  docs/decisions/DEC-20261112-01-h1-records-and-merge.md
The twelfth is docs/verification/phase-3a-correction-rounds.md, modified only by appending the three entries of THE LOG ENTRIES at its end. Before committing, git status --porcelain must list only those twelve paths. Do not change docs/decisions/DEC-20261108-03-phase-3b-h1.md, docs/verification/phase-3b-h1-build-log.md or any other file.

THE LOG ENTRIES
A pasted copy of this prompt can lose its line breaks and formatting, so take the text between each pair of marker lines from this prompt's copy on the transfer branch, transfer/filing-prompt-dec-20261112-01-macbook.md at the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, and report that commit. Append to the end of docs/verification/phase-3a-correction-rounds.md, after its present last line: exactly one blank line, then the text of LOG ENTRY 1 without its marker lines, then exactly one blank line, then the text of LOG ENTRY 2 without its marker lines, then exactly one blank line, then the text of LOG ENTRY 3 without its marker lines, ending with exactly one newline. Change no other byte of the file. Then show git diff of that file and confirm that every changed line is an added line at its end. Report each entry's line count, byte count and SHA-256 as appended, each without its leading blank line: LOG ENTRY 1 has 24 lines, 2,110 bytes and SHA-256 f321fa87ab267a727df3093c076662d31b475195399799539e67e5acfd4b2dec; LOG ENTRY 2 has 26 lines, 2,165 bytes and SHA-256 52b3ac9c2441ba01775b418d672ef8db5601ec696e8cea73fc289f355833a8ed; LOG ENTRY 3 has 30 lines, 2,623 bytes and SHA-256 e03806b0cfda8939f06ec4fa50df5153a8d892a3dd8c21a8a383fae542600507. The file then has SHA-256 3cacb18c1c3b2e08a068281aaf5688d0ad6ed6396efa6f92b0514c9e3adc861b, 1,775 lines and 157,757 bytes. The entries contain the section sign (U+00A7), once in LOG ENTRY 1, three times in LOG ENTRY 2 and once in LOG ENTRY 3; keep each as that one character.
BEGIN LOG ENTRY 1
## H1 first review verdict FAIL (rubric milestone 10, round 1, recorded after the merge)

- **Recorded:** 2026-11-12, under `DEC-20261112-01` B1, B2 and C1.
- **Plan milestone:** Phase 3B slice H1, plan §2D items 6 to 11. **Rubric milestone:** 10.
- **Head reviewed:** `8c7afeae7e3209be8033ad6315b4be313f907713` on PR #234 (`build/h1-r1`), built by
  `session:codex/h1-r1` from binding base `1678f1839c600cacd38fd426f755afae021861bf` under
  `DEC-20261108-03` and its Addenda 1 to 8.
- **Reviewer:** `antigravity`, a fresh Gemini session in Antigravity on the Founder's MacBook, with
  Gemini 4 Carbon selected by the Founder; the report records the model as not shown. Review prompt
  SHA-256 `47aa83bbb8427a340feaaafb6bab54cfba1cfacd78939e8f3c9b29164ae53653`.
- **Verdict text SHA-256:** `6a20836e8fd506720caaf17cffb86c32704fad3c4203a0e29e853c7d440fefed`, 79,667
  bytes, 916 lines, saved at `/Users/michaeldaley/builds/review-h1-r1-r2.md`, posted on PR #234 as
  comments 6800079155 and 6800079742 by `decivantiq`. It is the session's second report, written
  after the Founder's message asking for a change of format only (Addendum 9 A2 and B1).
- **Result:** FAIL, one substantive and two advisory findings. Finding 1: in the build log, the load
  reading given before log 225 of the sixth session is not the one that log holds, and the block
  quoting that log's command holds 147 lines where the report gives the command as 212. Findings 2
  and 3: a `createRequire` load of a file under `packages/pty-host/` by a module that
  `apps/madbridge/src/cli.ts` loads, and a lazy `import()` of `packages/broker/src/socket.ts` in
  `test/phase3a/runtime-harness.ts`, pass the checks of `DEC-20261108-03` B5 items 9 and 10.
  **Counted:** one round, H1's first, under rubric milestone 10 (Addendum 9 B2). H1's count stands at
  **1**. Phase 3A's counts are unchanged and do not carry into H1 (`DEC-20261108-01` B9 item 2).
- **Ruling:** Addendum 9 to `DEC-20261108-03`: one correction commit, of the build log alone, by a
  seventh builder session; Findings 2 and 3 carried to the act that records H1's merge.
END LOG ENTRY 1
BEGIN LOG ENTRY 2
## H1 second review verdict FAIL (rubric milestone 10, no round, recorded after the merge)

- **Recorded:** 2026-11-12, under `DEC-20261112-01` B1, B2 and C1.
- **Plan milestone:** Phase 3B slice H1, plan §2D items 6 to 11. **Rubric milestone:** 10.
- **Head reviewed:** `915dd0c4431e8f51458556c9f7ee64f6d8c303c6` on PR #234, the correction round 1
  commit, which changes only the build log, built by `session:codex/h1-r1` in its seventh session under
  Addendum 9 B4.
- **Reviewer:** `antigravity`, a fresh Gemini session in the Antigravity command-line interface on the
  Founder's MacBook, with Gemini 4 Carbon selected by the Founder; the report records the model as not
  shown. Review prompt SHA-256 `e971c6d96159cd7b1e6ff47efa265bfd2d02b9240b33754bf8fdacc50fd890c0`. An
  earlier session started for this review in Antigravity's remote environment stopped at its identity
  check and is set aside.
- **Verdict text SHA-256:** `844716e3022f284889534a662021ff8b8f932cbfe9145b110993e85245a3e1de`, 44,406
  bytes, 490 lines, saved at `/Users/michaeldaley/builds/review-h1-r2.md`, posted on PR #234 as
  comment 6808073618 by `decivantiq`.
- **Result:** FAIL, one substantive finding: the session record of the seventh session records
  `cli_version` 0.167.1, against Addendum 2 B1. Its item 8 finds Finding 1 of the first verdict
  corrected. **Counted:** no round: the finding requires no implementation or required-test change
  (design §7.3, Addendum 10 B4). H1's count stays at **1**. Not a disqualifier under design §7.6, and
  not a recurrence of the first verdict's Finding 1.
- **Ruling:** Addendum 10 to `DEC-20261108-03`: the sixth session from 2026-11-10T21:46:10Z and the
  whole seventh session ran under Codex 0.167.1 in a background app server of the governed
  configuration that updated itself; the Founder accepts that version as a material deviation, and
  the read-only sandbox of the sixth session's turn from 21:51:00Z as a change of the governed
  configuration that the Founder did not make (B2); no further commit (B3); the environment fix of B5
  before any further governed Codex session; and a third review, of item 6 alone (B7).
END LOG ENTRY 2
BEGIN LOG ENTRY 3
## H1 third review verdict PASS and H1 merged (rubric milestone 10, no round, count 1)

- **Recorded:** 2026-11-12, under `DEC-20261112-01` B1, B2, B4, B6 and C1.
- **Plan milestone:** Phase 3B slice H1, plan §2D items 6 to 11. **Rubric milestone:** 10.
- **Head reviewed:** `915dd0c4431e8f51458556c9f7ee64f6d8c303c6` on PR #234, as in the second review.
- **Reviewer:** `antigravity`, a fresh Gemini session in the Antigravity command-line interface on the
  Founder's MacBook, with Gemini 4 Carbon selected by the Founder; the report records the model as not
  shown. Review prompt SHA-256 `0cd7f0957899631dd0873decbff339c5d0ae526e0c2c15cc5f87f674b7726941`, on
  item 6 of the second review alone, under Addendum 10 B7.
- **Verdict text SHA-256:** `08cc87d596734223b6051c4b5a512e68d87f61481fedeb0c3037ed10fb59a7c7`, 46,619
  bytes, 535 lines, saved at `/Users/michaeldaley/builds/review-h1-r3.md`, posted on PR #234 as
  comment 6811012944 by `decivantiq`.
- **Result:** PASS, no finding. **Counted:** no round. H1's count under rubric milestone 10 closes at
  **1**. No verdict of H1 is a disqualifier.
- **Checks at the head:** Verify, code-review, tui-chaos on both hosts, attribution-shape,
  validate-code-review, CodeQL and every Analyze job succeeded, and Verify (macOS) succeeded on one
  re-run, job 130704966691, after its first attempt, job 130694824207, failed the test carried below.
  The Founder's run of `DEC-20261108-03` B12 passed: 1914 pass, 0 fail, across 140 files.
- **Merged:** PR #234 was marked ready at that head on 2026-11-12, after the PASS was posted, and
  Copilot's review 5867422948 there opened no thread. Under the Founder's merge authorization in
  comment 6811281202, SHA-256 `93b3f1bfc230973fb90e0b2c168a25f2422e471569a5b04047f74ed892f9209d`, it
  merged at `a7251235f94dcc4a3149b638a1acdac69236a26d`, with parents
  `aeca237eea1062c31b2c4a63f487349f2fc8f633` and `915dd0c4431e8f51458556c9f7ee64f6d8c303c6`, changing
  exactly the five paths of `DEC-20261108-03` B7. Every run on the merge commit succeeded.
- **Harness:** the first to fifth builder sessions ran under Codex 0.167.0, the sixth under 0.167.0
  and then 0.167.1, and the seventh under 0.167.1. Every turn of the six session records names the
  model `gpt-6.1-sol`; the effort is `xhigh` in records 1 to 5 and `ultra` in record 6.
- **Carried to a hardening act issued before M6 (`DEC-20261112-01` B6):** Finding 2 of the first
  verdict (`createRequire`); Finding 3 of the first verdict (lazy `import()`); and the cause of the one
  failure of `packages/broker/test/pty-host-supervisor.test.ts:631` on Verify (macOS).
END LOG ENTRY 3

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting an act's signature or the trailers of H1's commits. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261112-01 and Addenda 1 to 10 to DEC-20261108-03, and enter H1's verdicts. The body says the Founder signed DEC-20261112-01 on 2026-11-12 and the ten addenda from 2026-11-08 to 2026-11-11; that DEC-20261112-01 records slice H1, merged as pull request 234 at a7251235f94dcc4a3149b638a1acdac69236a26d, closes H1's correction-round count at one and places its carried items; that under its B10 this one pull request files the eleven texts unchanged and appends the three entries of its C1 to the correction-round log; that the texts come from the transfer commits you reported; that none authorizes a build or a live call; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp each of the eleven committed texts against its transfer blob, and report that the bytes match. Report the SHA-256, line count and byte count of the committed log file, which must equal those THE LOG ENTRIES gives.
- Push the branch with git push -u origin docs/dec-20261112-01-filing over the https remote. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 233 with gh api repos/MADVenturesLLC/madventures-tui/pulls/233 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Say in it that docs/decisions/ is a governance path, so the pull request merges only on a Founder act naming its exact head. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261112-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link, and do not write the Copilot reviewer's login in the body.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results. If you edit the body after a prbody check, run the check again on the edited body and report both runs.
- A check named Cursor Security Agent, from the GitHub app cursor, may start on the pull request. Under DEC-20261112-01 B7 it is not a check, review or gate. Report its name, status and conclusion, and do nothing about it.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not request any review, do not touch any other pull request, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, gh is not daley40-lab, the git identity differs, the origin remote is not https, a hash, line count or byte count differs, a transfer commit or blob is missing or is not the latest commit touching its path, main has moved outside precondition 1, an identifier or file name is already used under docs/, any fact in precondition 5 is false, the log file would change anywhere but its end, any path other than the twelve of ALLOWED SCOPE would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, the git identity, the origin remote's scheme, and the preconditions, each result with full SHAs, hashes, line and byte counts, and every quoted line.
2. The commit: full 40-character SHA, the twelve paths, the diff stat, the eleven cmp results, and the git diff of the log file with each appended entry's line count, byte count and SHA-256 and the file's SHA-256, line count and byte count.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
