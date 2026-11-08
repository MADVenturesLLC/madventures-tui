FOUNDER-ACT-20261106-PHASE-3A-TASK-59: the filing of pull request 226 recorded, the carried point on `export-evidence --session` closed, and Task 59 authorized as the last plan task of Phase 3A

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `a2f0b7e4afc36100205ea571d1c0a91b7c319480` (the merge of pull request 226)
> **Governs:** plan Task 59; `test/phase3a/architecture-phase3a.test.ts`; `docs/verification/2026-08-12-phase-3a-merge-gate.md`; the final merge review of plan Task 59 Step 8
> **Read with:** `DEC-20261105-02` B3 and B6; `DEC-20261104-02` B5, B6, B7, B10, B11 and B12, and its Addenda 3 and 4; `DEC-20261104-01` B9 and B10; `DEC-20261102-04` B2 and B4; `DEC-20261102-02` B4 to B9; `DEC-20261102-01` B2 to B6; `DEC-20261023-01` Part B; `DEC-20261013-04` B2 and B4; `DEC-20261013-03` B2 to B4; plan Task 59, §0A, §3, §8.3, §11.3 and §12; spec §4.2, §6.8 and §6.9

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What earlier acts leave to this act.** `DEC-20261102-01` B4 item 4 puts Task 59 under its own act, on top of Task 58, with its Step 5 run on both certification hosts. Its B5 says that act relies on its rulings, confirms that every build of its B1 has merged, and records the limitations of its B2 and B3 in the Task 59 evidence. `DEC-20261102-04` B2 item 4 carries to this act, unverified, a point Copilot made without a comment: that `export-evidence --session` does not validate the session's ledger subdirectory before opening it. `DEC-20261105-02` B3 leaves M26 open for Task 59. This is that act.

A2. **Pull request 226.** It merged by merge commit at `a2f0b7e4afc36100205ea571d1c0a91b7c319480` on 2026-11-05, with parents `8095767f51c2ca3dc098f5bfc9ccf519a85a2369` and, second, `822702fce1b53d12994bdac6cbc37a18fb4cbbcc`, under my authorization posted as comment 6672984339, which named that head. It filed `DEC-20261105-01`, `DEC-20261105-02` and Addenda 1 to 4 to `DEC-20261104-02`, and appended their two entries to the correction-round log. Push run 42135237903 of the attribution-shape check at the merge succeeded.

A3. **`main` since the candidate commit.** Task 58's candidate commit is `ffcecaf9dbb6b2de3b406e475825137ddfe726b7` under `DEC-20261104-02` B5. Between it and `a2f0b7e4afc36100205ea571d1c0a91b7c319480` ten paths changed: the two host reports and `test/phase3a/evidence-pipeline.test.ts` in pull request 225, Task 58's own commit, and seven paths under `docs/` in pull request 226. No production file changed.

A4. **Task 59 as the plan writes it.**
1. Its Files are `test/phase3a/architecture-phase3a.test.ts` and, under Create, the correction-round log, which `DEC-20261102-01` B6 reads as already existing. Its Interfaces say it produces one `describe("Phase 3A merge gate")` block whose assertions correspond one to one with the machine-checkable items of spec §6.8: items 1, 2, 6, 7, 8, 9, 12, 13, 14, 15 and 16. Its Step 1 names six tests, for items 12, 13, 14, 15, 16 and 1. Its Step 3 declares `PHASE_2_FLOOR = { tests: 714, expects: 2606, files: 35 }`.
2. Step 5 runs bare `bun test`, `bunx tsc --noEmit`, `git diff --check "$SOURCE_BASELINE_SHA"`, `git status -sb` and `git ls-files --others --exclude-standard` "on all three hosts". Under `DEC-20261013-04` B2 and B4 these are the MacBook and the Ubuntu PC. Step 6 inspects the complete diff against `SOURCE_BASELINE_SHA`, `aa16032c56fdf6c7105e99b1765ed9365d605bf4`, and verifies that every changed file appears in §3. Step 7 names the commit message. Step 8 stops for the final Founder merge review, and says not to merge and not to remove the start gate.
3. Spec §6.8 item 16 asks that no residual child, descendant, PTY host, descriptor, open session record or valid fencing token remain after tests. The test "no child, descendant, host, descriptor, open ledger session, or live fencing token remains after the adversarial suite" in `test/phase3a/adversarial/cleanup-residuals.test.ts` runs its own cohort of fixture sessions because, as its comment says, Bun's file discovery order is not a post-suite barrier. Plan §8.3 steps 6 and 7 add the negative control and a count of `madv-pty-host` processes.

A5. **What the drafting assistant found at `a2f0b7e4afc36100205ea571d1c0a91b7c319480`.** It read the code and ran git only.
1. `git diff --check aa16032c56fdf6c7105e99b1765ed9365d605bf4 a2f0b7e4afc36100205ea571d1c0a91b7c319480`, with no git configuration of its own, exits 2 and prints output with SHA-256 `fe33892c34b87319d59b7f0562373aa2d188cc2a5565a0e0e2daed19f72d6438`, the 33 lines of Addendum 3 A1 to `DEC-20261104-02`, as at the candidate commit.
2. Against `aa16032c56fdf6c7105e99b1765ed9365d605bf4` the tree changes 578 paths. They include work merged to `main` outside Phase 3A, such as `packages/honesty-compiler/`, `apps/seal-studio/` and `apps/projector-mc/`, and decision records and verification documents. §3 names its paths partly by pattern, and many of the 578 are not among them.
3. The point of `DEC-20261102-04` B2 item 4 does not hold. `exportEvidenceCommand` resolves its paths through `resolveEvidencePaths` at line 69 of `apps/madbridge/src/commands/export-evidence.ts`. For `--session` without `--ledger`, that function validates the ledger subdirectory with `validateStorageRoot` at lines 38 to 41 of `apps/madbridge/src/commands/verify-ledger.ts`, before `export-evidence` opens the ledger at line 114. The tests `export-evidence --session rejects a group-accessible ledger subdirectory` and `export-evidence --session rejects a symbolic link ledger subdirectory`, made at lines 731 to 734 of `test/phase3a/evidence-pipeline.test.ts` and added by Hardening B for item 12, run that path.
4. Each certification report's row for bare `bun test` records 1902 pass, 0 fail and 140 files, with 20141 `expect()` calls on the MacBook and 20148 on the Ubuntu PC.

A6. **The builds of `DEC-20261102-01` B1.** `DEC-20261102-04` B4 closes item 18 with no build and records that every other item of B1 merged in pull request 211 or 213.

A7. **The drafting assistant.** It drafted this act and proposed each ruling, and it found A5. None of that is an independent review.

## Part B: Founder rulings

B1. **Pull request 226.** Its merge of A2 is recorded. It changed only paths under `docs/` and does not move the candidate commit.

B2. **The builds of `DEC-20261102-01` B1.** Under its B5, and on the record of A6, every build of its B1 has merged.

B3. **The point on `export-evidence --session`.** It is closed with no change, on the reading of A5 item 3, and adds no round. Task 59's reviewer checks that reading.

B4. **How Task 59 is read.**
1. Each reference to three hosts reads as the MacBook and the Ubuntu PC.
2. Step 3's creation of the correction-round log reads as `DEC-20261102-01` B6 says. Task 59 does not change the log.
3. The six tests of Step 1, in one `describe("Phase 3A merge gate")` block, are the only tests Task 59 adds. A test cannot observe the result of the run it is part of. Items 2, 6, 7, 8 and 9 of spec §6.8 are therefore checked by the runs of B5 and B8 and by tests already in the suite, and the evidence of B6 names the check for each.
4. The test for item 1 reads from each certification report the counts recorded for its bare `bun test`. It asserts at least 714 tests, 2606 `expect()` calls and 35 files against `PHASE_2_FLOOR`, and no failure.
5. The test for item 16 runs fixture sessions of its own through the test-only harness and closes them. It then asserts that the harness's residual report shows none of item 16's residuals. It does not rely on the order in which Bun runs files, and it does not see processes that other files start. The evidence states that limit. After the whole run, the negative control of §8.3 step 6 runs on both hosts, in B5 and B8, and the process count of §8.3 step 7 runs on the MacBook in B8.
6. Each of the six tests checks its item through production code or the guards M1, M14 and M22 built, and fails when its item is broken. A test that only checks that another test exists does not meet Step 1.
7. Step 5's `git diff --check` counts as clean when it exits 2 and prints the 33 lines of A5 item 1, byte for byte, as Addendum 3 B1 to `DEC-20261104-02` ruled for Task 58.
8. Step 6 has two parts.
   - Task 59's commit, against its base, changes only the paths of B5 item 4. This is checked.
   - The complete diff against `SOURCE_BASELINE_SHA` is listed, not checked. The evidence lists every path in it that §3 does not name, counting a pattern of §3 as naming each path it matches, grouped by top-level directory with a count for each. That list is not a halt, and the final merge review rules on it.
9. Step 8's "do not merge" means the builder does not merge. Task 59's pull request merges only under B11.

B5. **Task 59's build.**
1. **Builder.** A fresh Claude Code session on the Ubuntu PC, started with `claude --strict-mcp-config --no-chrome`, with claude.ai connectors turned off and loading no MCP server.
   - Actor-Id `session:claude-code/m26-task59-r1`, on `build/m26-task59-r1`, from a binding base on `main` that contains the merge of this act's filing, named in its builder prompt I sign.
   - Every Bun process is the custodied build, used as `DEC-20261013-03` B4 requires.
   - The clone's git identity is `daley40-lab` and its no-reply address. The builder makes no GitHub call.
   - Its setup command checks that `gh` on the Ubuntu PC is not logged in as `decivantiq`, as `DEC-20261104-01` B9 requires.
2. **The work.** Plan Task 59 Steps 1 to 7, as B4 reads them, after a baseline at the binding base of the install, the typecheck, the architecture test file and bare `bun test`, each once.
3. **Breaks.** For each of the six tests, one deliberate break of the item it checks:
   - shown by `git diff`;
   - then a run of that test alone, which fails;
   - then the break restored, and an empty `git status` for the broken path.

   A break may touch a production file or the harness only for that run. A test that does not fail under its break is corrected within the paths of item 4 before the final gates.
4. **Paths.** Only `test/phase3a/architecture-phase3a.test.ts` and `docs/verification/2026-08-12-phase-3a-merge-gate.md`.
5. **The commit.** One commit, with the message of Step 7.
6. **Gates.** As `DEC-20261102-02` B4, with its load rule, on the Ubuntu PC, after the last change, each once and in order:
   - `bun x tsc --noEmit`;
   - `bun test test/phase3a/architecture-phase3a.test.ts`;
   - `bun test test/phase3a`;
   - bare `bun test`;
   - `bun test/phase3a/negative-control.ts`, which is §8.3 step 6;
   - `git diff --check aa16032c56fdf6c7105e99b1765ed9365d605bf4`, read as B4 item 7;
   - `git diff --name-only` against the binding base;
   - `git status -sb`;
   - `git ls-files --others --exclude-standard`.

   Each test run ends with zero failures. Each log records the command, the output of `uptime` before it, its output and its exit status. The build is reviewed only after Verify, Verify (macOS) and code-review pass at its head on GitHub.
7. **Halts, closed.** The build halts and reports to me only when:
   - a path outside item 4 would change, including where a test of Step 1 cannot be written without changing another path;
   - a test of Step 1 that checks its item as B4 reads it fails against production code;
   - the output of `git diff --check` is not the 33 lines of A5 item 1;
   - a test fails in a run whose first load average was 2.0 or more, which the builder does not rerun;
   - the session loads any MCP server;
   - the runtime is not the custodied build;
   - or the binding base differs from its prompt.

   Every other failure is handled under `DEC-20261023-01` Part B, and anything Part B makes a stop stays a stop.

B6. **The Task 59 evidence.** `docs/verification/2026-08-12-phase-3a-merge-gate.md` is the Task 59 evidence that `DEC-20261102-01` B2, B3 and B5, `DEC-20261102-04` B2 item 1 and Addendum 3 B5 to `DEC-20261104-02` name. The builder writes it from its logs and from files at the head, and writes no other value. It holds:
1. the binding base, the head's parent and the runtime;
2. for each of the 17 items of spec §6.8, how it is checked and where its result is: a test of Step 1 by name, a command of B5 item 6 and its log, or an existing test by file and name. For items 3, 4, 5, 10, 11 and 17 it names the report, review or act that decides the item, and gives no verdict of its own;
3. every command it ran, with its load, exit status and log SHA-256, the summary lines of each bare `bun test` quoted verbatim, and the six breaks of B5 item 3;
4. the stated limitations, each quoted verbatim with its act and clause: `DEC-20261102-01` B2 and B3 items 1 and 4, `DEC-20261102-04` B2 item 1, and Addendum 3 B5 to `DEC-20261104-02`. It also states the limit of B4 item 5;
5. the items carried to the first Phase 3B act, each quoted verbatim with its act and clause: `DEC-20261102-01` B2 and B3 item 2, `DEC-20261102-04` B2 item 1, and Addenda 3 B5 and 4 B3 to `DEC-20261104-02`;
6. the list of B4 item 8;
7. what it did not run, and any deviation.

B7. **Hermes.** `DEC-20261102-02` B5 applies to Task 59's builder session. Hermes is stopped while my guarded commands and the run of B8 run.

B8. **After the commit, on the MacBook.** My command runs, at Task 59's head, in a fresh clone and in a terminal that is not a Claude Code session:
1. **Runtime and rules.** The runtime of `DEC-20261104-02` B7 item 1, and the git and environment rules of Addendum 3 B2 and B3 to `DEC-20261104-02`.
2. **Install.** `bun install --frozen-lockfile`. If the install changes the mode of `packages/founder-act/src/main.ts`, the command restores it with `git checkout` and logs the state before and after.
3. **Commands.** Each once and logged, in this order:
   - `bun test test/phase3a/architecture-phase3a.test.ts`;
   - bare `bun test`;
   - `bunx tsc --noEmit`;
   - `git diff --check aa16032c56fdf6c7105e99b1765ed9365d605bf4`;
   - `git status -sb`;
   - `git ls-files --others --exclude-standard`;
   - §8.3 steps 6 and 7.
4. **Result.** These are Steps 4 and 5 on that host. Each must pass, with `git diff --check` read as B4 item 7, the negative control exiting 0 and the process count 0, or Task 59 halts for my ruling.

B9. **Review and counting.**
1. **Review.** A fresh Gemini 4 session on Antigravity on my MacBook, reviewer id `antigravity`, under a review prompt I sign, reviews Task 59's head. It covers:
   - the six tests and their breaks;
   - the evidence against the logs of B5 and B8;
   - the reading of A5 item 3;
   - each of the 17 items of spec §6.8.

   Its verdict at that exact head is the Tier-2 verdict of spec §6.8 item 11.
2. **Counting.** Its verdicts count under plan §11.3, under rubric milestones 2 and 10. Claude Code's count under rubric milestone 10 stands at 0, and the Codex sessions' at 2. A FAIL with a substantive finding halts for my ruling before any correction.

B10. **Pull request.** The builder makes no GitHub call. As for Task 58, my guarded commands do the rest:
1. carry the commit from the Ubuntu PC;
2. push `build/m26-task59-r1`;
3. open the draft pull request;
4. mark it ready after a posted Tier-2 PASS at its exact head.

B11. **The final merge review and the merge.**
1. Task 59's head is the candidate SHA of spec §6.8 items 11 and 17. It contains Task 58's candidate commit, which both reports name under item 5, and A3 and B5 item 4 keep every production file as it was at that commit.
2. The final merge review of plan Task 59 Step 8 is an act I sign after the verdict of B9 and the run of B8.
   - It gives a disposition for each of the 17 items of spec §6.8 at Task 59's head, and rules on the list of B4 item 8.
   - If it approves that head, it authorizes the merge of Task 59's pull request at that exact head, as `DEC-20261104-01` B10 item 3 requires.
   - It takes effect when I sign it and is filed with the act that records the merge.
3. Under `DEC-20261102-01` B4, as `DEC-20261104-02` B6 amends it, no code or test change merges before the final merge review other than Task 59's own commit.
4. The start gate stays. Its removal is a Phase 3B certification event under spec §4.2 and §6.9.

B12. **Counting and records.** These are new Founder rulings, which plan §11.3 does not count. No checkpoint closes under this act. The act that records Task 59's merge enters the verdict of B9 in the correction-round log and closes M26.

B13. **What this does not open.** This act authorizes Task 59 and the run of B8. It approves no head and authorizes no merge of Task 59's pull request. It authorizes no Phase 3B work and no other build. It leaves pull request 212 under `DEC-20261104-01` B10 item 4. It changes no earlier ruling.

## Part C: Filing

C1. One docs-only pull request files this act and changes nothing else. It touches `docs/decisions/`, so under `AGENTS.md`, as `DEC-20261031-01` amended it, it merges only by a Founder act naming its exact head. As a docs-only change it is not a code or test change under `DEC-20261102-01` B4.

C2. Task 59's build starts only after the merge of C1 is on `main`, and its builder prompt names that merge as its binding base.

## Part D: Not authorized

- Any path beyond B5 item 4. That includes any change to production code, another test file, `bun.lock`, a manifest, the plan, the spec, `AGENTS.md`, a decision record or the correction-round log, except the filing of C1.
- Any change to the `start` gate or the external-control placeholders, other than a break of B5 item 3 that is restored.
- Any rerun of a test that failed in a run whose first load average was 2.0 or more, and any rerun of a single command of B8.
- Any Phase 3B work, and every build other than Task 59.
- Any merge of Task 59's pull request except under B11 item 2.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-06

Actor-Id: founder
