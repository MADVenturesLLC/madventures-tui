FOUNDER-ACT-20261104-PHASE-3A-M25-CLOSURE: Task 57's verdict entered and M25 closed, Hardening E's verdict and the hunt at its merge entered, DEC-20261103-03 corrected, carried items recorded, and the merge of Task 57 reconciled with DEC-20261015-05 B1

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `fef6e64048c30e8df0ba9f44437fc077d8dcaf1e` (the merge of pull request 221)
> **Governs:** `docs/verification/phase-3a-correction-rounds.md`; plan milestone M25; the hunt of `DEC-20261103-01` B5 as `DEC-20261103-03` B3 amended it; `DEC-20261015-05` B1 as it applies to pull request 219; the filing of `DEC-20261103-02` Addendum 1 and of `DEC-20261102-03`
> **Read with:** `DEC-20261103-02` and its Addendum 1; `DEC-20261103-03` A2, B2, B3 and B5; `DEC-20261103-01` B4 and B5; `DEC-20261102-03`; `DEC-20261102-02` B7; `DEC-20261015-05` B1 and B5; `DEC-20261020-01` B8; `DEC-20261023-01` Part B; plan §4 and §11.3

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What earlier acts leave to this act.**
1. `DEC-20261103-02` E7: the next act I sign after Task 57's verdict is posted enters that verdict under plan milestone M25 and rubric milestone 1; that review is the review of the M25 checkpoint; and M25 closes by an act of mine after that entry is on `main`.
2. `DEC-20261103-03` B5: the next act I sign after Hardening E's verdict is posted enters that verdict.
3. Item 3 of my merge authorization of pull request 220 promised the corrections of B6 below.
4. My note on the Copilot review of pull request 219, comment 6623244436, and the header of the posted verdict on that pull request carried findings to this act.
5. Addendum 1 to `DEC-20261103-02`, B9: the docs-only pull request that files the next act I sign files that addendum unchanged.
6. `DEC-20261103-03` B3: the hunt of `DEC-20261103-01` A4 runs on both certification hosts at the merge of Hardening E, before Task 58's candidate commit is fixed.

A2. **Task 57, pull request 219.**
1. **The build.** Built on `build/m25-task57-r1` from the binding base `c11afdc7ce399aaac71766884c4036bb4b77bddd` by `session:codex/m25-task57-r1`, a governed Codex session on my MacBook. Its first run of B4 halted under B12 item 4. Addendum 1, SHA-256 `4655511c35d25e9c60c10ca8e5aea312e88a08659706a90f05da88c954f7d91d`, at transfer commit `0e0181923dfd71213deee721c3c46fdda5f1e9f8`, ruled the halt, recorded the three changes I made to the governed configuration, and authorized one second run. One commit, `df2baba9130f121c8fbc5c83d0406f9b5e8f5202`, changed the two paths of C1.
2. **The investigation's result.** The report, SHA-256 `c4262667e234ac0e69c7c46a0fafd82b44fa10e475ee6d9a1414a04be944ef4b`, records:
   - the first clause of spec §2.2 not established and the second met, through the per-response metadata of items 10 and 11, which name `claude-fable-5-1` with provider label `firstParty`;
   - auth readiness `pass`, and `overall` `pass`;
   - version 2.1.314, which the registration does not support.

   The stored record, SHA-256 `ea79da9420c08ad9a4286d1aa2b5a590a869c96d2a23074466495157cdf449c0`, was evaluated at `2026-11-04T01:05:48.052Z` and expires at `2026-12-04T01:05:48.052Z`. Before I pushed, my guarded command checked that hash, the SHA-256 `2da01c9de7202a90e51ced9d2b7715a7e9c247453e5b438db0045a5fd0bf0c10` of the governed `settings.json`, and the launcher's SHA-256.
3. **The review.** Reviewer `antigravity`, a fresh session on Antigravity on my MacBook, in the conversation that began at 21:14 on 2026-11-03, with Gemini 4 Argon selected in the harness's settings. The harness did not show its model to the session, and the conversation's transcript records no model field.
   - Its verdict at `df2baba9130f121c8fbc5c83d0406f9b5e8f5202` was PASS, with no substantive finding and three advisory findings.
   - Report SHA-256 `c699805e751301fb2a4520143f4b066483ec59eb4fe905ce8cc651ddc23834a1`, 65,087 bytes, 1,190 lines, saved at `/Users/michaeldaley/builds/review-pr219-r1.md`, from the review prompt with SHA-256 `6891a09f473813d2a02800651da947a9bf26710b40d8d245d90d3ddb2d4dd36d`.
   - It was posted as comments 6621443632 and 6621443978. Their header records that items 2 and 8 of the review cite two sections of the report under the wrong numbers and lines and speak of two configuration changes where the report records three, and that the review calls the record block section 7.
4. **Copilot.** Review 5762676488 opened three comments. My note, comment 6623244436, closed them with no change: the first was wrong, the third misread the words of `DEC-20261103-02` B9, and the second is carried by A4.
5. **The merge.** Merged by merge commit at `5d86f42cc396a5fa06b299bd166dc6fd4d3f79f9` on 2026-11-04, under `DEC-20261103-02` E6, with no merge authorization.

A3. **What Task 57 showed beyond its verdict.**
1. **Model fallback.** In item 13, the session's `system/init.model` was `claude-fable-5-1`, a `system/model_refusal_fallback` event then switched it, and the response and its usage metadata name `claude-opus-4-8`. Preflight accepts a session on the first `system/init.model`, and `PLAN-OPEN-1` names that field as Claude Code's evidence for live attestation. That field alone does not establish which model answered.
2. **Safety stops.** In items 11 and 13, a safety classifier stopped responses to the probes. In item 11 the session wrote a Bash call as text with no tool available, and the notice states that it did not run.

A4. **Findings carried.**
1. The three advisory findings of the review of pull request 219: test 1 does not require a `system/init` event in items 9 and 11, nor check the model and provider of item 10's responses; test 3's label check misses some ways of writing the labels; and test 2 gives no partial role list.
2. Copilot's comment 4463136336: test 1 does not check the exit status of items 6, 7 and 9 to 13.
3. The further suggestions in the overview of review 5762676488: assert each capture's metadata, item 13's fallback, and the identity metadata of items 10 and 11.

A5. **Hardening E, pull request 221.**
1. **The build.** Built on `build/hardening-e-r1` from the binding base `e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8`, the merge of pull request 220, by `session:claude-code/hardening-e-r1`, a Claude Code session on the Ubuntu PC with no MCP server loaded, from the builder prompt I signed, SHA-256 `017a29071372ac4109669461e2a953142e490a13f6b4a1ca5ebdca97360c2055`, at transfer commit `9566dbe884279456753b34af2426ffec7f6f357b`. One commit, `4d752aa805f4a41e5c17c4b1e5c8f1144890ed9c`, changed exactly the three paths of `DEC-20261103-03` B2 item 4. The build log has SHA-256 `11edc14c004cc4e1d784446440d034b48f377445d7393d3177d95d314fd3ffc1`. My guarded command pushed the branch and opened the draft pull request from my MacBook.
2. **Checks.** At the head, Verify and Verify (macOS) in run 41831055300, attribution-shape in run 41831055290 and code-review in run 41831055668 succeeded on their first attempt. Every other check succeeded or was skipped, except Cursor's Security Reviewer, which ended neutral.
3. **The review.** Reviewer `antigravity`, a fresh session on Antigravity on my MacBook, with Gemini 4 Argon at the high setting selected in the harness. The report shows its model as not shown.
   - Its verdict at `4d752aa805f4a41e5c17c4b1e5c8f1144890ed9c` was PASS, with no substantive finding and three advisory findings: no test catches the wait accepting a pid of 1 or any number; no test catches the fixture writing the record directly under its final name; and no test catches the wait accepting a partly written record or outliving its deadline.
   - Report SHA-256 `0bac54a4696001b5f80d657df793f47cc7125d3324eec136d6d1862387f29a91`, 66,892 bytes, 1,152 lines, saved at `/Users/michaeldaley/builds/review-pr221-r1.md`, from the review prompt with SHA-256 `655dc47272b9181c3c09b16a1bc4d5e5428f912f5b3d925fee355c42db6d6266` at transfer commit `65f5d52bae041cb02a6ef3e9277335335859f01f`.
   - It was posted as comments 6636729420 and 6636730124.
4. **What the review misquoted.** Section 4 of the report gives, as the output of three logs, text those logs do not hold: a test excerpt that is not the test at the head; harness lines that are in neither the base nor the head; and four search hits in a 528-line file, three of them past its end. A check of the logs, which the drafting assistant wrote and I ran on my MacBook, found that those three logs hold real output, including a search whose hits include `test/phase3a/runtime-harness.ts` line 209, `test/phase3a/adversarial/supervisor-death.test.ts` line 67 and `test/phase3a/environment-equality.test.ts` line 43. Every other quoted result it checked is in its log as quoted: the gates, the twenty runs of the new test, the four breaks, the probes and the three attempts to defeat the test. The header of the posted verdict records this.
5. **Copilot.** Review 5772424572, at the head, opened no inline comment and named no issue. Its overview said the pull request needed a closer look because macOS verification, the GitHub checks and the Tier-2 review were outstanding, as the description said when the pull request was opened. All three were done before the merge.
6. **Ready and merge.** After the PASS was posted, my guarded commands marked the pull request ready and merged it by merge commit at `fef6e64048c30e8df0ba9f44437fc077d8dcaf1e` on 2026-11-04, under `DEC-20261103-03` B2 item 7. Its parents are `e53ef3dc5fa0f2eebb5fecb8fe2761bb334cd5a8` and `4d752aa805f4a41e5c17c4b1e5c8f1144890ed9c`, and it changes exactly the three paths.

A6. **A failure on the macOS runner.** The first attempt of Verify (macOS) in run 41758043469, on pull request 220, failed one test outside that pull request: "no child, descendant, host, descriptor, open ledger session, or live fencing token remains after the adversarial suite" in `test/phase3a/adversarial/cleanup-residuals.test.ts`, with `FixtureSupervisorStartupTimeout` at `test/phase3a/runtime-harness.ts` line 774. Its one re-run passed. It had not been seen before, and it is not the defect Hardening E fixes.

A7. **Errors in `DEC-20261103-03`.** Its A2 item 1 says the four commits of Hardening D were "one for each item of `DEC-20261103-01` B6"; they answer items 2 to 5 of that B6. Its A2 item 6 says Copilot's review 5760156193 "opened no comment"; it opened no inline comment, but its body said that approval should wait for the Verify and Verify (macOS) results at the exact head, and that the build log lacks the final-gate results the description of pull request 217 claims. `docs/verification/hardening-d-build-log.md` has no section for the final gates.

A8. **The merge rule.**
1. `DEC-20261015-05` B1 says each Phase 3A task lands as its own pull request with its own Tier-2 review and its own merge authorization. `DEC-20261102-03` B1, which took effect when I signed it at 2026-11-02T09:45:14Z and whose filing, pull request 212, is still open, restates that for every Phase 3A task pull request.
2. Hardening A to E are not plan tasks: the correction-round log records Hardening A, B, C and D each as not a plan task, and `DEC-20261103-03` authorizes Hardening E as a hardening build. `DEC-20261102-02` B7 and the acts that authorized Hardening C, D and E let their pull requests merge without an act of their own, and neither B1 reaches them.
3. Task 57 is a plan task. `DEC-20261103-02` E6, signed after `DEC-20261102-03`, said its pull request needs no act of its own, and pull request 219 merged without a merge authorization. No act said that E6 departs from those B1s.

A9. **The hunt at the merge of Hardening E.** At `fef6e64048c30e8df0ba9f44437fc077d8dcaf1e`, the full suite and `test:phase3a` ran ten times each on each certification host, under that host's certification runtime, as measurement only. Every run passed.
1. **Ubuntu PC.** The custodied Bun 1.4.1, revision `69cb78c9097cebd3bdb832d9fff8b7d23abce09e`, SHA-256 `0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb`. Twenty of twenty runs passed, 1,902 and 156 tests each, at first load averages of at most 0.63. The output's SHA-256, as the drafting assistant saved it, is `8f302cb083d77321876e3566153f67e2455792d68b4eba23c0c5f9059e01dbf9`. The logs are in `/home/michaeldaley/builds/flake-hunt-fef6e640-linux-logs`.
2. **MacBook.** Bun 1.4.2, revision `744846f844374847c902b5e7fd59b4342a51ef99`, SHA-256 `35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5`, with no Hermes process. Twenty of twenty runs passed, 1,902 and 156 tests each, at first load averages from 1.40 to 9.28. The output's SHA-256, as the drafting assistant saved it, is `2472268dfe9c1522bbf1c39d940e1fce348af2f96f08e63a3d38064186696ea1`. The logs are in `/Users/michaeldaley/builds/flake-hunt-fef6e640-darwin-logs`.
3. No run on either host showed `FixtureSupervisorStartupTimeout`, and both clones were unchanged after their runs.

A10. **My GitHub login on the Ubuntu PC.** On 2026-11-04, `gh` on the Ubuntu PC was logged in as `decivantiq` with a fine-grained token, although I keep that login off that PC. How long it had been there is not known. Any builder session on that PC while it was there could have reached GitHub as me by unsetting `GH_TOKEN`; Hardening E was built there earlier that day. Hardening E's builder prompt forbade any GitHub call, and its pull request was pushed and opened from my MacBook; nothing further was checked. The same day I used the login once to clone a repository outside this project, then logged it out. Afterwards `gh` on that PC reported no login, git had no credential helper, and there was no `~/.git-credentials`. Logging out does not revoke the token.

A11. **The drafting assistant.** It drafted this act and proposed each ruling. It also drafted Addendum 1, the review prompts of pull requests 219 and 221, the note in the header of the verdict posted on pull request 221, the check of A5 item 4, and the commands of A2, A5 and A9. None of that is an independent review.

## Part B: Founder rulings

B1. **Task 57's entry.** The verdict of A2 item 3 is entered under plan milestone M25 and rubric milestone 1. It adds no round, and rubric milestone 1's count is unchanged. The facts of A2 items 3 and 4 are recorded with it.

B2. **M25 closes.** The review of A2 item 3 is the review of the M25 checkpoint. M25, Tasks 56 and 57, closes at the merge that puts the entry of B1 on `main`, with the findings of A4 carried forward.

B3. **The findings of A4.** They are carried, not fixed now. A later act of mine decides when they are built. None of them changes the verdict of A2.

B4. **The fallback of A3 item 1.** It is carried to Phase 3B as a requirement on live attestation for `claude-code`: before any governed Claude Code session runs live, attestation must check the model of every response, and a fallback to another model must end the session as an identity mismatch. This act changes no code and no `PLAN-OPEN-1`.

B5. **Hardening E's entry.** The verdict of A5 item 3 is entered with no rubric milestone and no round, as the verdicts of Hardening C and D were. The PASS counts: the misquotes of A5 item 4 are in what the review reports it read, not in what it ran, and the code lines its verdict cites match the head. Its three advisory findings are carried with those of A4 under B3. The facts of A5 items 3 to 5 are recorded with the entry.

B6. **Corrections of `DEC-20261103-03`.**
1. In its A2 item 1, the words "one for each item of `DEC-20261103-01` B6" are corrected to "one for each of items 2 to 5 of `DEC-20261103-01` B6".
2. In its A2 item 6, the sentence "Copilot's review 5760156193 opened no comment." is corrected to: "Copilot's review 5760156193 opened no inline comment. Its body said that approval should wait for the Verify and Verify (macOS) results at the exact head, which both passed before the merge, and that the build log lacks the final-gate results the description of pull request 217 claims, which is so."
3. Hardening D's build log is not corrected.

B7. **The failure of A6.** It did not occur in the hunt of A9. It is not a known failure, and `DEC-20261103-01` B4's set stays empty. If it occurs again in a run that an act of mine counts, it is reported verbatim and that run is not rerun to obtain a pass.

B8. **The hunt.** The hunt of A9 meets the condition of `DEC-20261103-01` B5, as `DEC-20261103-03` B3 amended it, for fixing Task 58's candidate commit. It authorizes no Task 58 work, which needs its own act.

B9. **My login on the Ubuntu PC.** My GitHub login stays off the Ubuntu PC, and builds of this repository there act as `daley40-lab` only. The setup command of each such build checks that `gh` on that PC is not logged in as `decivantiq`. The token of A10 is revoked before the next such build.

B10. **The merge rule.**
1. `DEC-20261015-05` B1, as `DEC-20261102-03` B1 restates it, governs plan tasks. Hardening builds are not plan tasks, and the acts that authorized them govern how they merge.
2. `DEC-20261103-02` E6 was a ruling for pull request 219 alone, made after `DEC-20261102-03`. Pull request 219 merged validly under it.
3. From this act on, every plan task's pull request needs its own merge authorization naming its exact head, unless an act of mine says otherwise for that pull request and names the B1 it departs from.
4. `DEC-20261102-03` stands as I signed it, and its text for `CONTRIBUTING.md` agrees with this rule. Pull request 212 proceeds under its C4 to C6: its Tier-2 review at its exact head, on a surface other than Claude Code, and my merge authorization naming that head.

B11. **Automatic updates.** The record of `DEC-20261103-02` B6 is written, which ends the freeze of Addendum 1 B2. `DISABLE_AUTOUPDATER` stays set in the governed configuration and in my everyday installation until I rule otherwise, because the launcher starts my everyday installation and an update would move the program behind the record.

B12. **Counting and records.** These are new Founder rulings, which plan §11.3 does not count. Apart from M25 under B2, no checkpoint closes.

B13. **What this does not open.** This act authorizes no build. It does not authorize Task 58, Task 59 or any Phase 3B work, and it changes no earlier ruling except as B6 and B10 state.

## Part C: Filing and recording

C1. One docs-only pull request files this act and Addendum 1 to `DEC-20261103-02` unchanged, and changes nothing else except three entries appended to the end of `docs/verification/phase-3a-correction-rounds.md`, in the form of the log's latest entries:
- Task 57's review verdict under B1;
- the M25 review checkpoint closed under B2, with the carried findings of A4;
- Hardening E's review verdict under B5.

The pull request touches `docs/decisions/`, so under `AGENTS.md`, as `DEC-20261031-01` amended it, it merges only by a Founder act naming its exact head.

## Part D: Not authorized

- Any change to code, tests, `bun.lock`, a manifest, the plan, the spec, `AGENTS.md`, `PLAN-OPEN-1` or another decision record, except the filings of C1.
- Any edit of an existing entry of the correction-round log.
- Merging pull request 212 except under B10 item 4.
- Task 58, Task 59, any Phase 3B work, and any build.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-04

Actor-Id: founder
