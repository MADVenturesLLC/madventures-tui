DEC-20261123-01 ADDENDUM 3: M1's first Tier-2 verdict, and its first correction round

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261123-01` B15 item 1, B21, B24 and B25, for M1's first correction round alone, and the builder prompt of M1, where this addendum says otherwise
> **Read with:** `DEC-20261123-01` B15, B17, B19, B21 to B26 and B29, and its Addenda 1 and 2; `DEC-20261112-03` Addendum 1 B3; `DEC-20261108-03` Addendum 10 B6; `DEC-20261108-01` B9 item 2; `DEC-20261023-01` Part B; Phase 3A design §7.3 and §7.6; Phase 3A plan §11.3; Phase 3B plan §2C; the builder prompt of M1, SHA-256 `683951e9534f1517f68b690ceec554a3908a8dd6cebd2bd97f8791e56e6e4733`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The head and its runs.** The builder of M1, `session:codex/3b-m1-r1`, finished at `4630152f763baca0259d84c0d5817d0cea501145` and saved its final report as `pr/m1-report.md`, SHA-256 `1b2b91eb7757245b3583cfd119353617555657a11a946606e5a331e30800beb3`. Its one session record is `rollout-2026-11-23T01-45-43-01a20727-4377-78b1-8253-384942aea03c.jsonl`, which my check read before the push. The session has since been closed. My guarded command opened pull request 254 as a draft at that head. On its test merge into main, `23883050ef06775975fb7331131b1115aaa62a6f`, Verify passed with 2078 pass and 0 fail across 160 files, and Verify (macOS) ran the suite twice with the same counts. My runs of B24 at the head passed on the MacBook, manifest SHA-256 `10456ad4ad3fcfedd8804c1330da86143c57eae6433ce9089598c21eb5365a95`, and on the Ubuntu PC, manifest SHA-256 `e778bdbc507de38843e42e0124c7d345a4b9918c649e0a62464b90a9c45a2b26`.

A2. **The review.** Under B15 item 2, a Gemini session in Antigravity, reviewer id `antigravity`, reviewed that head under the review prompt I signed, transfer commit `652c29030b09a188ea803bf47e882ccf02cbaea5`, SHA-256 `9a5c4f50358fe8646af345327dfbc3a6576a4f27eb244dc551721c1c99f4254a`. It wrote `/Users/michaeldaley/builds/review-m1-r1.md`, SHA-256 `882bb886a52bdfc6064af8fba96c7e986f6eaa4f778e266c076613bca2fecfae`, 854 lines. The report records the model as not shown. My check of plan §2C passed on that report, the first the reviewer saved: 29 quoted blocks, each in the source it names; each of the 73 files of the reviewer's logs and scripts listed with a matching SHA-256; two re-reads after compaction, each showing the prompt's SHA-256; the review clone at the head and clean; and the prompt folder, its `SHA256.txt`, SHA-256 `e645e44964059910d43c68d343eec9363792682731cfb4489f3f062ba38076b0`, and the five evidence folders unchanged.

A3. **The verdict.** FAIL. Items 1, 2, 5 to 9 and 11 to 17 pass. Items 3 and 10 fail on Finding 1, and items 4 and 10 on Finding 2, each classified SUBSTANTIVE. Findings 3 to 5 are ADVISORY.

A4. **Finding 1.** B17 item 4 names `auth_failed` as a `claude-code` cause "for a failure the registration's `auth_failure_detection` names", and the registration names `system`/`api_retry` events whose `error` is `authentication_failed` or `oauth_org_not_allowed`. At the head, lines 78 and 79 of `packages/adapter-claude-code/src/live.ts` return the detector's cause for such an event. No test sends such an event to `attestClaudeSession`, during the attestation or to its continuous monitor; `test/phase3b/detectors.test.ts` tests the detector alone. With line 79 changed so that the attester ignored `auth_failed`, `packages/adapter-claude-code/test/live.test.ts` still passed, 6 pass and 0 fail.

A5. **Finding 2.** B17 item 3c takes `madv-surface`'s failures "from the surface's events, its fail-closed events and its exit codes", and B17 item 4 names them the parser's causes, each with its reason. At the head, lines 74 to 81 of `packages/adapter-madv-surface/src/live.ts` handle the child's `exited` fact. No test gives `attestMadvSession` an `exited` fact with a nonzero code, or a `system`/`auth_failed` event during the attestation; `test/phase3b/composition.test.ts` sends that event only after activation, and `test/phase3b/detectors.test.ts` tests the detector and the parser alone. With the handling of the `exited` fact removed, `packages/adapter-madv-surface/test/live.test.ts` still passed, 5 pass and 0 fail.

A6. **Findings 3 to 5.** The reviewer finds that none breaches a ruling.
1. Finding 3: the build log does not list log numbers 245, 436 to 439 and 466 as unused, though it records the 20-minute timeouts of the waits of logs 435 and 465. Log 124 is accounted for under Addendum 1 B3.
2. Finding 4: `packages/supervisor/test/preflight.test.ts` refuses `skillOverrides` values of `null` and `false`, and no string other than `"off"`, so a validator that also accepted `"on"` passed it.
3. Finding 5: `test/phase3b/composition.test.ts` cancels a start through its abort signal only, so a composition without its listeners for SIGINT and SIGTERM passed it.

A7. **The rules.** Phase 3A plan §11.3 counts "absence of a test required by the milestone or by §6" as substantive incompleteness. Phase 3A design §7.3, which plan §11.3 applies, defines a correction round as one verdict that identifies substantive defects "requiring implementation or required-test changes". Design §7.6 requires reassignment at more than two correction rounds on one milestone, or on a disqualifier, among them "fabricated, suppressed, selectively omitted, or weakened evidence" and "the same substantive defect recurs after a claimed correction". B25 returns a FAIL to me.

A8. **The drafting assistant.** A Claude Code session drafted the review prompt, its setup, my check of plan §2C, the command that posts the report, this addendum and the resume message that delivers it. It confirmed at the head the lines A4 and A5 cite and the registration's values, and an agent session it started ran a copy of the head's code under Bun 1.4.4 on Linux to check that the cases and breaks of B4 item 1 behave as B4 says. That is a drafting check, not an independent review.

## Part B: Founder rulings

B1. **The report.** M1's first Tier-2 verdict is the report of A2, SHA-256 `882bb886a52bdfc6064af8fba96c7e986f6eaa4f778e266c076613bca2fecfae`. My command posts it verbatim on pull request 254, with a note, before the resume message of B4 is delivered.

B2. **Findings 1 and 2.** Each is substantive and is corrected. B21 item 3 requires, for each surface, a test of each attestation failure of B17 item 4 with its typed failure. For `claude-code` that includes `auth_failed`; for `madv-surface` it includes the parser's causes from the events, fail-closed events and exit codes of B17 item 3c. This holds whether or not the list after the colon in B21 item 3 names them. The verdict counts as one correction round of M1, its first, under rubric milestone 6, in M1's own count of B15 item 3. The act that records M1's merge enters it in the correction-round log.

B3. **Not a disqualifier.** The code A4 and A5 name is present at the head; the tests are missing. The first verdict passes items 11 and 14, the evidence and the logs. Nothing here is fabricated, suppressed, selectively omitted or weakened evidence under design §7.6. If a defect of Findings 1 or 2 remains after the correction of B4, that is a recurrence under §7.6.

B4. **The correction.** The builder session of B15 item 1 does this round in the same record, resumed as `DEC-20261112-03` Addendum 1 B3 resumed H2's: I start it through `/Users/michaeldaley/builds/codex-governed` with `resume 01a20727-4377-78b1-8253-384942aea03c -s workspace-write -a on-request` from inside `/Users/michaeldaley/builds/m1-r1`, confirm that `/mcp` lists no MCP server, and deliver a resume message I sign. The session keeps its Actor-Id, branch, folder, clone and git identity. Before anything else, it reports what its harness shows, and stops unless the sandbox is `workspace-write`, the approval `on-request` and no MCP server is loaded. After `4630152f763baca0259d84c0d5817d0cea501145` it makes two commits:
1. One commit that adds tests and changes nothing but these files, each of which M1 already changed:
   a. `packages/adapter-claude-code/test/live.test.ts`: with a test registration of its own whose `auth_failure_detection` names both `system/api_retry.error:authentication_failed` and `system/api_retry.error:oauth_org_not_allowed`, as the registration does at lines 52 and 53 of `packages/protocol/src/adapter-registry.ts`, a test for each of those two errors that a `system`/`api_retry` event carrying it during the attestation fails it as `auth_failed`, and that the same event after the handover is reported by the continuous monitor as `auth_failed`. The registration the file's existing tests use does not change.
   b. `packages/adapter-madv-surface/test/live.test.ts`: tests that each of these, during the attestation, fails it with the cause and `parserReason` the attester gives, which the test asserts: a `system`/`auth_failed` event; an `exited` fact with code 5; with a test registration of its own whose `auth_failure_detection` names `exit_code:9` in place of `exit_code:5`, an `exited` fact with code 9; and an `exited` fact with code 1, before a `model_response`. The cause is `auth_failed` in the first three cases and `provider_error` in the last.
   c. `packages/supervisor/test/preflight.test.ts`, for B19 alone: a test that a `skillOverrides` value that is a string other than `"off"`, `"on"` among them, fails closed as `auth_not_ready`. It may be a case added to a test M1 added; no test of the binding base changes.
   d. `test/phase3b/composition.test.ts`, with one new scenario in `test/phase3b/scenarios.ts`, a helper M1 added, whose existing scenarios do not change: a test, with a timeout of at least 45 seconds, that SIGINT, and in a second case SIGTERM, raised at the point where the cancel scenario aborts, cancels the start with what lines 49 to 55 of `composition.test.ts` assert for the abort signal, and that the listener counts for both signals after the start equal those before it. The new scenario writes `cancel` to the stand-in's scenario file, since line 51 of `test/phase3b/stand-in.ts`, which does not change, holds back the Claude Code stand-in's reply only then. The signal is raised with `process.emit`, never sent to any process, and only while the composition's listener is the only listener for that signal, which the scenario records just before raising it and the test asserts. If such a test cannot be written so, the builder records why in one line and adds no such test, and the act that records M1's merge lists Finding 5 as a carried item.
   Each test is named for what it proves and follows B21's rules. Each is shown failing on a deliberate break, as the Breaks paragraph of the builder prompt says. The breaks are at least these, each shown on the cases named:
   - for a, line 79 of `packages/adapter-claude-code/src/live.ts` not returning `auth_failed`, on all four cases;
   - for b, lines 74 to 81 of `packages/adapter-madv-surface/src/live.ts` removed, on the `exited` cases; line 78 of that file not applying the registration's exit-code rule, on the code-9 case; and line 54 of that file not stopping on `auth_failed`, on the `system`/`auth_failed` case;
   - for c, line 114 of `packages/supervisor/src/preflight.ts` also accepting `"on"`;
   - for d, lines 64 and 65 of `apps/madbridge/src/tui/live/composition.ts` removed.
2. Then, after the full run of B5, one commit that appends to the build log a section headed "Correction round 1". It changes the build log alone, and the log's earlier lines do not change. The section records:
   a. this addendum and the resume message by SHA-256;
   b. Findings 1 to 5 as A4 to A6 state them;
   c. each test added, by file and name, with the finding it answers;
   d. each break, as THE BUILD LOG AND THE PACKET says;
   e. for Finding 3, each of the numbers 245, 436, 437, 438, 439 and 466, with why no log took it, from the logs, or, where no log shows why, that none does; and log 124 as Addendum 1 B3 accounts for it;
   f. every command of the round, with its times, uptime reading, wait's log, exit status and log SHA-256;
   g. the full run, with its comparison and arithmetic;
   h. every deviation.
No production file, stand-in, fixture, evidence script, transcript or evidence packet changes, and no test helper other than the scenario of item 1d. Before the first commit, a failure of an added test is corrected in the code item 1 adds for it alone. If a test, written as item 1 says, cannot pass without a change of production code, the build halts for my ruling, and the builder does not change that code. Every path the two commits change is one M1 already changed, so `git diff --name-only 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD` lists the same 36 paths it lists at `4630152f763baca0259d84c0d5817d0cea501145`.

B5. **The runs and the gates.** Each test file of B4 item 1 is run alone, under THE LOAD and THE TEST RUNTIME, after each change and for each break. At the first commit of B4, the full run of THE FULL RUN AND THE GATES runs, each step once and in order, with these readings:
1. every test of the base list and of the head list of M1's full run is present under the same file and name, and passes;
2. the Ran count is 2078 plus the number of test calls B4 adds, as Bun counts them; a case added to an existing test adds none;
3. the file count stays 160, since B4 adds no test file;
4. the floor of B24 is met.
At the second commit, the gates of B24 run as the builder prompt says. This round makes no self-fix commit: a failure in the full run or the gates halts.

B6. **What the builder delivers.** My command that delivers the resume message renames the first final report, `pr/m1-report.md`, to `pr/m1-report-1.md`, and the first description, `pr/pr-body.md`, to `pr/pr-body-1.md`, each unchanged. The builder:
1. writes a new `pr/pr-body.md`, which keeps the first description's content, corrected where this round changes it, and adds the round;
2. keeps `pr/pr-title.txt` unchanged;
3. runs both attribution checks;
4. saves its final report of the round as `pr/m1-report.md`, in the order of the builder prompt's FINAL REPORT, each item covering the round: its item 3 says that no baseline was run in the round, and its item 10 gives the diff against `4630152f763baca0259d84c0d5817d0cea501145`.
Under B15 item 1 as this addendum reads it, the session works on this round alone and halts with that report after the gates.

B7. **My checks, the push and my runs.** My check of the session record runs again over the whole record, the resumed turns included, as B15 item 1 and `DEC-20261112-02` B5 require, and I make any break the builder declined. My guarded command then moves `build/3b-m1-r1` forward from `4630152f763baca0259d84c0d5817d0cea501145` to the round's last commit without a force push, and replaces the description of pull request 254 with the new `pr/pr-body.md`. The pull request stays a draft. Verify and Verify (macOS) then run at the new head, and my runs of B24 run again there on both hosts, from fresh clones, with the floor.

B8. **The second review.** After B7, a fresh Gemini session in Antigravity, reviewer id `antigravity`, under a review prompt I sign, reviews:
1. that the two commits of B4 are the only commits after `4630152f763baca0259d84c0d5817d0cea501145`, change only the paths B4 names, and have their subjects, authors and trailers as item 1 of the first review checked them;
2. the tests and breaks of B4 item 1 against Findings 1 to 5 and B21, and items 3, 4 and 10 of the first verdict at the new head;
3. that the build log's new section holds only values from the logs it names, and that its earlier lines are unchanged;
4. the round's logs, runs and gates;
5. my checks and runs of B7;
6. the new description.
For every path the two commits do not change, the items the first verdict passed stand and are not reviewed again. The report counts only after it passes my checks of plan §2C. Its verdict counts under B15 item 3, and a FAIL, or any SUBSTANTIVE finding, returns to me under B25.

B9. **Counting and filing.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it and is filed unchanged with the act that records M1's merge, with Addenda 1 and 2. Nothing else in `DEC-20261123-01`, its Addenda 1 and 2 or the builder prompt changes; where the builder prompt says otherwise, this addendum rules.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-25

Actor-Id: founder
