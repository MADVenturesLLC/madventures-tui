FOUNDER-ACT-20261108-PHASE-3B-H1 ADDENDUM 9: H1's first Tier-2 verdict, and the correction of its build log

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261108-03` B8 item 2, B10 item 3 and B13 item 1, and Addendum 7 B4, as read below
> **Read with:** `DEC-20261108-03` B10, B12 to B15; its Addenda 1 to 8; `DEC-20261108-01` B9 item 2; `DEC-20261008-03` B3; Phase 3A design §7.3 and §7.6; Phase 3A plan §11.3; Phase 3B plan §2C

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The review.** Under `DEC-20261108-03` B13, after Verify, Verify (macOS) and code-review passed at H1's head `8c7afeae7e3209be8033ad6315b4be313f907713` and my run of its B12 passed there, a Gemini session in Antigravity, reviewer id `antigravity`, reviewed that head under the review prompt I signed, transfer commit `68c6568790751255a3b67be3ed676280553cf18b`, SHA-256 `47aa83bbb8427a340feaaafb6bab54cfba1cfacd78939e8f3c9b29164ae53653`. It wrote its report to `/Users/michaeldaley/builds/review-h1-r1.md`, SHA-256 `d625d2372a5d444e4983742d6ca4c950ac87c9f5bc0f003ce7d331da7b1553bf`. The report records the model as not shown.

A2. **The format of the report.** My check of plan §2C, which reads a fenced block as markdown does, found five fenced blocks in that report with no Source line: quoted git diffs of the certification reports hold lines of three backticks, which ended their blocks early. The rest of the check passed. I then sent the same session a message that asked for a change of format only and stated no result. It wrote `/Users/michaeldaley/builds/review-h1-r1-r2.md`, SHA-256 `6a20836e8fd506720caaf17cffb86c32704fad3c4203a0e29e853c7d440fefed`, which my check shows differs from the first report only in 76 fence lines, each with two more backticks. On that report the check passed: 38 quoted blocks, each in the source it names; every file of the reviewer's logs and scripts listed with a matching SHA-256; eight re-reads after compaction, each showing the prompt's SHA-256; the review clone at the head and clean; and the prompt, the description and the three evidence folders unchanged.

A3. **The verdict.** FAIL. Its items 1 to 9 and 11 to 13 pass. Its items 10 and 14 fail on its Finding 1, which it classifies SUBSTANTIVE. Its Findings 2 and 3 are ADVISORY.

A4. **Finding 1.** In `docs/verification/phase-3b-h1-build-log.md` at `8c7afeae7e3209be8033ad6315b4be313f907713`:
1. The command register of the "Sixth session" section gives, at line 4269, `13:10  up 16 days,  5:19, 1 user, load averages: 4.80 6.26 6.72` as the reading before `225-write-session6-halt-report.log`. That reading is quoted inside the command of log 225 and is the first reading of log 223. The reading log 225 holds between its command and its output is `13:16  1 user, load averages: 4.88 6.52 6.81`.
2. The block that quotes the command of log 225, at lines 4691 to 4839, holds 147 lines and ends at the line `The bare run began at:`. The report gives that command as 212 lines.

The reviewer traces both to the sixth session's generator, which took the first line that looked like a reading, inside the command. The sixth session's pull request description discloses the error as an erratum and says the raw log is unchanged; the build log does not. Of 1,492 values and blocks of the build log and the description that the reviewer checked, no other was missing from the log it names. The drafting assistant confirmed lines 4269 and 4691 to 4839 at that head.

A5. **Findings 2 and 3.** Under Finding 2, a module that `apps/madbridge/src/cli.ts` loads, calling `createRequire` of `node:module` to load a file under `packages/pty-host/`, passes the walk of item 9. Under Finding 3, a lazy `import()` of `packages/broker/src/socket.ts` in `test/phase3a/runtime-harness.ts` passes the importer check of item 10. The reviewer finds that neither breaches a ruling.

A6. **The disagreement the report records.** Seven blocks of the build log quote log lines with their trailing spaces or tabs removed. The reviewer reads `DEC-20261108-03` B8 item 4, under which `git diff --check` prints nothing, as governing the "verbatim" of B10 item 3, and makes no finding of it.

A7. **The rules.** Phase 3A design §7.3, which plan §11.3 applies verbatim, defines a correction round as one verdict that identifies substantive defects "requiring implementation or required-test changes", and does not count "editorial clarification that does not change behavior or required evidence". Design §7.6 requires reassignment at more than two correction rounds on one milestone, or on a disqualifier, among them "fabricated, suppressed, selectively omitted, or weakened evidence" and "the same substantive defect recurs after a claimed correction". `DEC-20261108-03` B13 item 3 halts H1 for my ruling before any correction.

A8. **The drafting assistant.** A Claude Code session drafted the review prompt, its setup and check commands, my message of A2 and this addendum. It changed my check's reading of fences after it saw the report, and confirmed A4 at the head. None of that is an independent review.

## Part B: Founder rulings

B1. **The report.** H1's first Tier-2 verdict is the report of A2 with SHA-256 `6a20836e8fd506720caaf17cffb86c32704fad3c4203a0e29e853c7d440fefed`. My message of A2 asked for a change of format only and stated no expected result. It is not a correction under `DEC-20261008-03` B3 and adds no round. It is recorded as a deviation from the review prompt, under which I answered only permission prompts and the question of the load. My command posts that report verbatim on pull request 234, with a note on A2, before the seventh session of B4 starts.

B2. **Finding 1.** It is substantive and is corrected. The build log is H1's required evidence under `DEC-20261108-03` B10, so its correction is not editorial clarification. The verdict counts as one correction round of H1, its first, under rubric milestone 10. The act that records H1's merge enters it in the correction-round log.

B3. **Not a disqualifier.** The error of Finding 1 came from the builder's generator taking the wrong line. The builder disclosed it in its description before the review, log 225 is unchanged and the build log gives its SHA-256, and no other value was found missing. It is not fabricated, suppressed, selectively omitted or weakened evidence under design §7.6. If the defect of Finding 1 remains after the correction of B4, that is a recurrence under §7.6.

B4. **The correction.** A seventh builder session, keeping the Actor-Id, branch, clone and folders of `DEC-20261108-03` B6 item 1, under a builder prompt I sign that names this addendum, makes one more commit, the eighth, with parent `8c7afeae7e3209be8033ad6315b4be313f907713`, touching only `docs/verification/phase-3b-h1-build-log.md`. It:
1. replaces, in the row of log 225 of the sixth session's command register, the reading with the one log 225 holds between its command and its output, and changes nothing else on that line;
2. adds to the block that quotes the command of log 225 the lines of that command the block lacks, copied from the log, so that the block holds the whole command as the log holds it, with trailing spaces and tabs removed as B6 reads it; no line already in the block changes;
3. appends a section headed "Seventh session", which records this addendum by name and SHA-256, Finding 1 and the two corrections with their line numbers, the identity comparison of Addendum 7 B3, the preconditions, and each of its commands with its reading, exit status and log SHA-256, what it did not run and every deviation.

The eighth commit removes exactly one line of the build log, the old row of log 225. Before it commits, the session checks every reading, exit status and log SHA-256 of the sixth session's command register, and every block of the sixth session's commands as logged, against the logs they name, taking each reading from the log's own reading before the run and not from text inside a command. If any value other than those of items 1 and 2 differs, or a line already in the block of log 225 differs from the log other than by trailing spaces or tabs, it halts for my ruling and commits nothing.

B5. **What the seventh session runs.** It starts no Bun process: no test, no install and no type check. After the eighth commit it runs the last four gates of `DEC-20261108-03` B8 item 4, each once and in the order of Addendum 1 B1, and records their results in its final report and the description, as Addendum 1 B2 says. It replaces `pr/pr-body.md` with a description that keeps the sixth session's, corrected where this addendum changes it, with its erratum replaced by the correction, and runs both attribution checks. `DEC-20261108-03` B8 item 2 is read as eight commits, the last this one. Any halt under its B9 or under B4, and any failure of the last four gates, halts H1 for my ruling. Addendum 7 B4 binds the session as it bound the sixth: it writes none of the six names of Addendum 2 B4.

B6. **Trailing spaces.** In a committed file, a verbatim quote under `DEC-20261108-03` B10 item 3 keeps every character of each line except trailing spaces and tabs, which are removed so that `git diff --check` prints nothing, as B8 item 4 requires. This is how B10 item 3 is read for H1 and every later slice. The disagreement of A6 is so resolved and is not a finding.

B7. **The check of Addendum 2 B4.** My push command runs it as Addendum 6 B2 and Addendum 7 B4 read it, and goes on only if it finds exactly the four records of Addendum 6 A2, each with exactly its occurrences; the sixth session's record, `rollout-2026-11-10T12-39-58-01a1c68b-94bb-7a13-8bf8-654f3e111cf4.jsonl`; and one more record started in `/Users/michaeldaley/builds/h1-r1`; with no top-level call outside those Addendum 2 B4 allows, and no occurrence of the six names inside `exec` in either of the last two records. Anything else halts H1 for my ruling.

B8. **The push, CI and my run.** My push command moves `build/h1-r1` forward from `8c7afeae7e3209be8033ad6315b4be313f907713` to the eighth commit without a force push and replaces the description of pull request 234 with the seventh session's. The pull request stays a draft. Verify, Verify (macOS) and code-review then run at the new head, and my run of `DEC-20261108-03` B12 runs again there, in a fresh clone, with its floor.

B9. **The second review.** `DEC-20261108-03` B13 item 1 is read so for H1's second review. After B13 item 2 is met at the new head, a fresh Gemini session on Antigravity, reviewer id `antigravity`, under a review prompt I sign, reviews: that the eighth commit is the only commit after `8c7afeae7e3209be8033ad6315b4be313f907713`, touches only the build log, and has its subject, author and trailers as item 1 of the first review checked them; that its changes are exactly those of B4, and that each value it corrects, adds or records is in the log it names; the seventh session's logs, gates and halts; the check of B7; my run of B12 at the new head; and the new description and its deviations. For every path the eighth commit does not change, items 1 to 9 and 11 to 13 of the first verdict stand and are not reviewed again. The report counts only after it passes the checks of plan §2C. Its verdict counts under B13 item 3, and a FAIL with a substantive finding halts H1 for my ruling.

B10. **Findings 2 and 3.** They are not corrected in H1. The act that records H1's merge lists them as carried items and names the act or slice that takes them.

B11. **Counting and filing.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it and is filed unchanged with the act that records H1's merge, with Addenda 1 to 8. Nothing else in `DEC-20261108-03` or its Addenda 1 to 8 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-11

Actor-Id: founder
