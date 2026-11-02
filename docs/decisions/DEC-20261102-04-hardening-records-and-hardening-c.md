FOUNDER-ACT-20261102-PHASE-3A-HARDENING-RECORDS: the verdicts of Hardening A and B entered, item 18 closed, the carried findings ruled, and Hardening C authorized for the acknowledgement deadline

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `cb0bc264b0224b2943250e138570aa43f17efbae` (the merge of pull request 213)
> **Governs:** `docs/verification/phase-3a-correction-rounds.md`; the hardening builds of `DEC-20261102-01` B1; `escalateWedgedHost` in `packages/broker/src/pty-host-supervisor.ts`
> **Read with:** `DEC-20261102-02`; `DEC-20261102-01` A3, B1, B4 and B5; `DEC-20261101-01` B5 and B6; `DEC-20261023-01` Part B; plan §4 and §11.3; spec §9.8

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What `DEC-20261102-02` B10 leaves to this act.** It rules that the next act I sign files the verdict entries of both hardening builds in the correction-round log. This is that act.

A2. **Hardening A, pull request 211.** Built on `build/hardening-a-r1` from the binding base `68959cf27ee2652d4f9c3287cec4a5ee03798a7a` by `session:codex/hardening-a-r1`, seven commits ending at `7e1d094ca53797fb88d591d1f05cab677b4332f4`, for items 1, 3, 4, 7, 8, 9 and 10.
1. During the build I ruled that restoring the mode `bun install` sets on `packages/founder-act/src/main.ts` is not a finding; that the load halt of `DEC-20261102-02` B9 applies only to a test that fails unexpectedly, not to the intended failures of a deliberate break or a failing first run; and that the one memory lookup the builder ran against its prompt, which found nothing, is a process fact.
2. Reviewer `antigravity`, a fresh session on Antigravity on my MacBook, which did not show its model; I confirmed Gemini 4 to it before it read any file. Verdict at `7e1d094ca53797fb88d591d1f05cab677b4332f4`: PASS, no findings. Report SHA-256 `c165b71b57cbd7a65eaec2779f03895e8e2bc8b7ca5f49d71f60ac758a22c54e`, 82,221 bytes, 1,029 lines, saved at `/Users/michaeldaley/builds/review-pr211-r1.md`, comments 6583571337 and 6583572134.
3. Copilot then posted three findings, comments 4445549038, 4445549118 and 4445549174: that a governed child built on Bun can load a `.env` file from its own working directory; that the `.env` test writes at the repository root; and that a recursive watch on Linux may miss a directory created after it starts. The `.env` test writes with `wx` and removes only a file it created, and the watcher calibration passed on ubuntu-24.04 at that head in Verify.
4. Merged by merge commit at `e051ed90802f754495d3f3374192b304e29a6218` on 2026-11-02 under `DEC-20261102-02` B7.

A3. **Hardening B, pull request 213.** Built on `build/hardening-b-r1` from the same binding base by `session:claude-code/hardening-b-r1`, four commits ending at `0a80144047b64fffdc684d437b49adbe5f0fac9f`, for items 13, 12, 17 and 5.
1. During the build I ruled that item 18 is not built, because at the base no code computes a `manifest_hash`; that the load halt reads as in A2 item 1; and that restoring the mode of `packages/founder-act/src/main.ts` is not a finding. Item 18 came from an advisory finding of the first review of pull request 205, which `DEC-20261101-01` carried forward and the drafting assistant carried into `DEC-20261102-01` without checking it against the code.
2. Round 1, reviewer `antigravity`, a fresh Gemini 4 session on Antigravity on my MacBook that did not show its model. Verdict at `0a80144047b64fffdc684d437b49adbe5f0fac9f`: PASS, four advisory findings: no test injects a failure between the two renames of the publish step; no test covers removal of the staging directory on an exception; the non-JSON error branches are untested; and `sequence` is not asserted in `ledger-sanitized.json`. Report SHA-256 `177315d22be33b77ad4d81181b9f3051450958c178669bd4cf4b499183148f6d`, 59,593 bytes, 680 lines, saved at `/Users/michaeldaley/builds/review-pr213-r1.md`, comments 6583234970 and 6583235767. Since that verdict is a PASS, its review item that no `manifest_hash` exists at the base passed.
3. Copilot then found, in comment 4445385788, that the guard on an explicit `--output` checked only entry names, so a directory or symbolic link named as a package file passed it and was then removed with the rest of the directory. I ruled one correction commit under Hardening B builder addendum 1, signed at transfer commit `e9a815bfb774c0f1fca3364b065a77624c0e1eb6` with SHA-256 `eb177f628cc0f841b9718a7d893e5a4c06386d465a11ec2b1c7ae7b798d92b32`: an existing explicit output is replaced only when every entry is a regular file named as a package file. The commit is `7a23f9cd085e12ea6ad29ab5e3d8957de1e1baed`. Copilot's overview also reported, without a comment, that `export-evidence --session` does not validate the session's ledger subdirectory before opening it; that is outside the diff of pull request 213 and has not been verified.
4. Round 2, reviewer `antigravity`, a fresh session on Antigravity on my MacBook showing the model Gemini 4 Argon (High). Verdict at `7a23f9cd085e12ea6ad29ab5e3d8957de1e1baed`: PASS, two findings classed as not counting under plan §11.3, each an attempt to defeat the tests that the tests did not catch and that production at the head does not contain: a guard narrowed to directories and symbolic links, which would admit a FIFO; and a guard that exempts one package name from the type check. Report SHA-256 `1c5ec2de4362ea97ccd482f96b16e8715c12be5c8688def97f0b5bde64570234`, 43,905 bytes, 627 lines, saved at `/Users/michaeldaley/builds/review-pr213-r2.md`, comment 6586956420.
5. Merged by merge commit at `cb0bc264b0224b2943250e138570aa43f17efbae` on 2026-11-02 under `DEC-20261102-02` B7.

A4. **The acknowledgement deadline.** At `7a23f9cd085e12ea6ad29ab5e3d8957de1e1baed`, the first attempt of Verify (macOS) in run 41495322316 failed one test, "a SIGSTOPped host is cleared through the direct PGID path", because `escalateWedgedHost` ended its acknowledgement window at 248.98 ms, below the test's bound of 249 ms. One re-run of the failed job passed. `escalateWedgedHost` arms a timer for the time left until 250 ms after the terminate command and treats its firing as the deadline, without checking the monotonic clock; the timer fired about 1 ms early. Spec §9.8 sets the deadline at 250 ms. Pull request 213 did not change that code or that test's path, and no act before this one authorizes a change to it. The PTY host's own deadlines in `packages/pty-host/src/signals.ts` loop on the monotonic clock.

A5. **Copilot findings on the filings.** On pull request 209, comment 4440998614 found the description of item 17 wrong; the corrected text of `DEC-20261102-01` answered it, as my authorization in comment 6575167641 records. On pull request 210, comments 4442132727, 4442132801, 4442132871, 4442132935 and 4442132997 found five faults in the text of `DEC-20261102-02`; its corrected text and filing addendum 1 answered them, as my authorization in comment 6577923305 records.

A6. **The process record of the hardening builds.**
1. **MCP servers and hooks.** The first launch of the Hardening B builder with `claude --strict-mcp-config` still loaded the `claude-in-chrome` server; it stopped, and was relaunched with `--no-chrome`. User-level hooks of my Claude Code configuration load into governed sessions; an Octopus hook asked the Hardening B builder to invoke `octo:debug`, which it declined because its prompt allows no other agent. The `hermes` MCP server recorded in `DEC-20261102-02` A3 was turned off in Cursor.
2. **The Codex reviewer agents.** The two Codex reviewer-agent definitions were moved aside for Hardening A and restored after its review.
3. **The reviewer's harness.** Antigravity attached `/Users/michaeldaley` and `/Users/michaeldaley/MADVenturesOPs` as workspaces, as the reports of pull request 211 and of round 2 of pull request 213 show and the review prompts allowed. Two launches for pull request 211 were stopped before the review that counts: one opened from the build clone, and one given the pull request 211 prompt in the pull request 213 review clone.
4. **The drafting assistant's errors.** It carried item 18 into `DEC-20261102-01` unchecked; and it pushed transfer commit `e9a815bfb774c0f1fca3364b065a77624c0e1eb6` with the author name `decivantiq` and the address `noreply@anthropic.com`, where earlier transfer commits carry the author name `Claude`. That file's content is the text I signed.

A7. **The drafting assistant.** It drafted this act and proposed each ruling. None of that is an independent review.

## Part B: Founder rulings

B1. **The entries.** The verdicts of A2 item 2, A3 item 2 and A3 item 4 are entered. Hardening builds are not plan tasks, and no verdict had a substantive finding, so each is entered under no plan milestone and no rubric milestone and adds no round. Rubric milestone 10's total stays at **2**; the Codex sessions' count under it stays at 2 and Claude Code's at 0.

B2. **The Copilot findings.**
1. Pull request 211, comment 4445549038: carried to the first Phase 3B act, with the adapter launch work, and stated as a limitation of Phase 3A in the Task 59 evidence. What a governed child reads from its own working directory is not the environment the host gives it, which Hardening A's item 4 test proves exact.
2. Pull request 211, comments 4445549118 and 4445549174: advisory, carried. The Task 58 run on the Ubuntu PC is the next check of comment 4445549174.
3. Pull request 213, comment 4445385788: answered by the correction of A3 item 3.
4. The unposted Copilot point of A3 item 3, on the ledger subdirectory of `export-evidence --session`: carried unverified to the act that authorizes Task 59, which rules on it.

B3. **The advisory and not-counting findings of pull request 213.** The four advisory findings of A3 item 2 are carried as advisory. The two findings of A3 item 4 stay as the reviewer classed them, need no change, and add no round.

B4. **Item 18 is closed with no build.** Its premise is false: no `manifest_hash` exists in Phase 3A. `DEC-20261102-01` B1 item 3 is withdrawn, and the act that authorizes Task 59 does not wait on a build of item 18. Item 18 adds no round. Every other item of `DEC-20261102-01` B1 has merged in pull request 211 or 213.

B5. **Hardening C.** I authorize one hardening build under `DEC-20261102-01` B1 and B4, for the deadline of A4:
1. **Builder and branch.** A fresh Codex CLI session on my MacBook, Actor-Id `session:codex/hardening-c-r1`, on `build/hardening-c-r1`, from a binding base on `main` that contains the merge of this act's filing, named in its builder prompt I sign.
2. **The change.** `escalateWedgedHost` ends its acknowledgement window at the deadline only once the monotonic clock has reached 250 ms after the terminate command; a timer that fires earlier waits out the remainder. The races with the acknowledgement and with the host's exit, every other deadline, and every other behavior stay as they are.
3. **The test.** A test makes the acknowledgement timer fire before 250 ms have passed, for a host that never acknowledges, and asserts that the window ends no earlier than 250 ms after the terminate command and that the host is classified as failed. It fails against the code before the change. If it needs a production seam, the build halts for my ruling.
4. **Paths.** `packages/broker/src/pty-host-supervisor.ts`, only within the acknowledgement window of `escalateWedgedHost`; test files under `packages/broker/test/`; and `docs/verification/hardening-c-build-log.md`. No `bun.lock`, manifest, `AGENTS.md` or decision record.
5. **Report, not change.** The builder lists every other place in production code that enforces a spec §9.8 deadline with a timer, and changes none of them.
6. **Gates.** As `DEC-20261102-02` B4, with its load rule, and also `bun test test/phase3a/adversarial` three times in a row. The build is reviewed only after Verify and Verify (macOS) pass at its head on GitHub.
7. **Review and counting.** A fresh Gemini 4 session on Antigravity on my MacBook, reviewer id `antigravity`, under a review prompt I sign. Its verdicts count under plan §11.3 under the rubric milestone of each path their substantive findings touch; `pty-host-supervisor.ts` belongs to M19, rubric milestone 5. The log does not state a total for rubric milestone 5 in its current form, and this act states none, so a FAIL with a substantive finding halts for my ruling before any correction.
8. **Pull request and merge.** As `DEC-20261102-02` B7: the builder makes no GitHub call; my guarded commands push, open the draft pull request and mark it ready after a posted Tier-2 PASS at its exact head; it merges by merge commit through my guarded command without a per-pull-request act, re-running held code-review runs one at a time under `DEC-20261101-01` B6.
9. **Halts, closed.** The build halts and reports to me only when: a path outside item 4 would change; the test needs a production seam; production outside `escalateWedgedHost` would change; a test fails unexpectedly in a run whose first load average was 2.0 or more, which it does not rerun; a governed session loads an MCP server; or the binding base differs from its prompt. Every other failure is handled under `DEC-20261023-01` Part B, and anything Part B makes a stop stays a stop.

B6. **Hermes.** `DEC-20261102-02` B5 applies to Hardening C as it applied to Hardening A and B.

B7. **Counting and records.** These are new Founder rulings, which plan §11.3 does not count. No checkpoint closes. The next act I sign enters the verdicts of Hardening C in the correction-round log.

B8. **What this does not open.** This act authorizes Hardening C and nothing else. It does not authorize Task 57, Task 58, Task 59 or any Phase 3B work, does not name my list of surfaces, does not close M10, M25 or M26, and changes no earlier ruling except as B4 states.

## Part C: Filing and recording

C1. One docs-only pull request files this act and appends three entries to the end of `docs/verification/phase-3a-correction-rounds.md`, in the form of its latest entries, and changes nothing else: one for the verdict of A2 item 2, and one for each of the verdicts of A3 items 2 and 4, each with the head, the builder session, the reviewer id, the report's SHA-256, size and path, the comments, the result, the count, and the merge. It touches `docs/decisions/`, so under `AGENTS.md` as `DEC-20261031-01` amended it, it merges only by a Founder act naming its exact head.

## Part D: Not authorized

- Any path beyond B5 item 4 for Hardening C, and any change to `bun.lock`, a manifest, the plan, the spec, `AGENTS.md` or another decision record.
- Any edit of an existing entry of the correction-round log.
- Task 57, Task 58, Task 59, any Phase 3B work, and every build other than Hardening C.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-02

Actor-Id: founder
