STEP: Task 46 review. Launch as the first message of a new Codex session on the Founder's Ubuntu PC, started in the fresh clone /home/michaeldaley/madventures-tui-m21-task46-codex-r1, detached at 2acdab6ab0930ecb5e280088a957157da904ee22.

You are the independent Tier-2 reviewer for Phase 3A M21 Task 46 in MADVenturesLLC/madventures-tui.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: codex
You are a Codex session on the Founder's Ubuntu PC. State your surface and your model id exactly as your session reports them, and nothing you cannot verify. Do not invent a session id, an actor id or a model id. You did not write, plan or direct any part of this work, and this session has seen no Task 46 material before this message. If either is untrue, stop and say so. You review one exact head and nothing else.
Do not read any other clone of this repository, the folders /home/michaeldaley/m20-task45-review and /home/michaeldaley/test4-oracle-report, any file whose name starts with founder-baseline, or any earlier review notes. If you have seen any of them, stop and say so. Read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine or ~/.claude-madventures-v5, and run no command that prints an environment variable, a token or a key, or lists processes.

SESSION SKILLS AND SANDBOX (Founder rulings made in advance)
- If your session requires you to load skills or instruction files that live outside the clone, you may read those files read-only. This prompt and the acts take precedence over them. Report the full path and SHA-256 of every such file you read.
- On this PC, bun install must run outside any sandbox to build the native pty module, and the test suite needs local sockets. If a command fails for a sandbox reason (for example a local socket listen denied with EPERM, or a read-only file system), you may ask the Founder's approval to rerun that exact command outside the sandbox. Report both runs. Do not rerun a command outside the sandbox for any other reason.
- Run every test command once, one at a time, in the foreground, and wait for it to exit, except where WHAT YOU MUST EXECUTE names a second run. Do not run two test commands at once.

TARGET
Pull request 155, draft, branch build/m21-task46-r1.
Head under review: 2acdab6ab0930ecb5e280088a957157da904ee22, one commit.
Binding base: 1ee5a1d5c37fb2c1a77f8b9bf952179c3530f438, the merge of pull request 153.
Verify that pwd is /home/michaeldaley/madventures-tui-m21-task46-codex-r1, that git rev-parse HEAD equals the head under review, that git rev-parse HEAD^ equals the binding base, and that git status is empty, before you read anything. If any differs, stop and report.

AUTHORITY (read from origin/main, in full, before the code; run git fetch origin main first)
1. FOUNDER-ACT-20261014-TASK46-EXECUTION-AUTHORIZATION, docs/decisions/DEC-20261014-03-task46-execution-authorization.md, SHA-256 494386cd2f946f2399e610a2b10b7d9f340f18edda4b38e75468a20afa0ce8e3. Its Part E4 defines this review.
2. Two Founder rulings made part of that act as if written there. You make no GitHub calls, so report the cross-check of these texts against GitHub as not run. Verbatim:
   From the merge authorization of pull request 153, item 3: "b. Comment 4288680945, rated medium, on B3: B3 says a failed build appends no fencing_token_issued, but a failure injected at activate, or any failure after issue_token succeeds, follows that record. B3 is read as follows: on failure, runTransactionalBuild stops at the failing step, appends no session_activated, exposes no active snapshot, and does not unwind; it appends fencing_token_issued only when issue_token itself succeeds; and a fencing_token_issued appended before a later failure stays, recorded in PartialBuildState under B2 so that Task 47's rollback can invalidate it. Item 3 of E4 is unchanged, because reattest precedes issue_token."
   From the merge authorization of pull request 154, item 3: "b. On the reproduction the reviewer makes: E4 item 7 of DEC-20261015-04 and E4 item 6 of DEC-20261014-03 require the reviewer on the Ubuntu PC to reproduce the D4 results, while the same E4 applies the known-failure set of DEC-20261013-01 B9 on that host, where test 4 fails. Each is read as: the reviewer reproduces the D4 results with that set applied, so test 4 failing exactly as at the base is expected, a test of that set that passes is recorded, and every other failure or error is a finding."
3. FOUNDER-ACT-20261014-BUILDER-REASSIGNMENT, docs/decisions/DEC-20261014-01-builder-reassignment.md, SHA-256 f1f2bd610b444103bb16c3c2ce48f15be186b428bdb6c5e1e56c1b98f55338cd.
4. FOUNDER-ACT-20261015-M20-CHECKPOINT-CLOSURE, docs/decisions/DEC-20261015-03-m20-checkpoint-closure.md, SHA-256 e4148fde243d15508513fbf22b58584c519d1d842ca7fefb016d266bf6f08f61. Read its B3, B4 and B5 item 2.
5. FOUNDER-ACT-20261015-PHASE-3A-PROCESS, docs/decisions/DEC-20261015-05-phase-3a-process.md, SHA-256 7cecc6c1d08a2a199bc12b1677e77641fd6b9757df2f17351602e58bebd19e43. Read its B4.
6. The known-failure set and the Linux runtime: DEC-20261013-01 (SHA-256 fd6d9ad9cc014f2bead775929e3d133583113283b41b669099c18e17eba25d1d) B9; DEC-20261011-02 (SHA-256 0d163c6aa931d0d52a94bd3f5ad4df3cdf3925caef6d80f2429415d03328fafd) A2 and B2; DEC-20261013-03 (SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7) B2, B4 and B6.
7. DEC-20261015-02, docs/decisions/DEC-20261015-02-claude-code-version-range.md, SHA-256 47c43dee1196e69dc5a74d6162af35bbd6d4815f9251f65685434595bd0b70aa, B4.
If any act is missing, has another SHA-256 or lacks Status ISSUED, stop and report. Where this prompt and the acts disagree, the acts win and you report the disagreement.

PACKET (read every item)
1. The acts above.
2. At the binding base: plan Task 46, Task 47 and sections 4 and 11.3 of docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2; spec sections 2.1, 2.2, 9.5, 9.6 and 9.13 of docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md, SHA-256 c09fe4849a4a61bf3e1494b77267020e00bd1d7b3015e3b2332ec5d71b07f769; docs/decisions/PLAN-OPEN-1-identity-authentication.md, SHA-256 d40682beb5a5c3f617638b1775f3777e25c66e12787b9269141164dcc3d9bc42, in full.
3. The diff from the binding base to the head.
4. At the head, with line numbers: every file under packages/supervisor, and the exports of packages/storage, packages/ledger, packages/broker and packages/pty-host that build.ts uses.
5. The architecture tests under test/phase3a.
The commit message is a claim. Treat it as unverified until you check it against the code and your own runs. Do the review items from the code and your own executions before you read the commit message, and state when you read it. You do not read the pull request description, which is on GitHub.

REVIEW ITEMS (DEC-20261014-03 E4 items 1 to 6; PASS only if all six pass)
1. The steps and their order follow B1 and spec section 2.1, and no member names a TUI step.
2. No active snapshot is exposed before both startup records are durable, under B5.
3. A failed reattest exposes no active snapshot and appends neither startup record, under B3 and B4.
4. No live attester for a real surface is added, and a surface without one fails closed.
5. The tests follow B7, and the changed paths are exactly C1.
6. You reproduce the D4 results, read with the ruling of pull request 154 quoted above, and at least two of the D3 breaks.
Also report every difference you find between what the head exports and the Interfaces of plan Task 46, and between the head and B2, B3 as ruled above, B6, DEC-20261015-03 B4 and DEC-20261015-03 B5 item 2. Classify each as below.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
You must be able to run commands. If you cannot run bun in this clone or a disposable copy, return INCONCLUSIVE, name the checks you could not run, and stop. Do not guess results and do not return FAIL for that reason.
- bun install --frozen-lockfile with the Bun on PATH, outside the sandbox with approval if needed, then record bun --version, uname -srm, the PRETTY_NAME line of /etc/os-release and id -un. If it changes a tracked file's mode or content, restore it and say so.
- The custodied runtime of DEC-20261013-03 B2 item 2, by its full path /home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun, called QB below: confirm its SHA-256 and Bun.revision as that act's B4 requires before any test, and run every test with it.
- The D4 commands of DEC-20261014-03 at the head: bunx tsc --noEmit; "$QB" test packages/supervisor/test/build-rollback.test.ts; "$QB" test packages/supervisor packages/broker; "$QB" test; git diff --check; git diff --name-only 1ee5a1d5c37fb2c1a77f8b9bf952179c3530f438.
- For every test that fails or errors in the full suite: say whether it is test 4 of DEC-20261011-02 A2. For any other failing test, run its file alone at the head with "$QB" test, and run "$QB" test once in a disposable git worktree at the binding base, outside this clone, and report both results verbatim. Remove that worktree afterwards.
- At least two of the four D3 breaks of DEC-20261014-03, each applied to the working file at the head and restored afterwards. Report which test or tests fail for each, and confirm after each that the file's SHA-256 equals the head's.
- Probes of your own, in a temporary directory outside the clone, against the functions at the head, using fixture executables and fixture attesters only: the recorded step trace of a successful build; a failure injected at each member of BUILD_STEPS, reporting for each the failed step, the failure code, which startup records were appended, whether any active snapshot was exposed, and what the returned partial state records; a failing attester at reattest; a surface with no attester; and the build's handling of any caller-supplied registration, attester or process-spawning seam. Report each input as code and the printed output verbatim. Use only synthetic values.
- Try to defeat the tests: find an implementation that violates a ruling while all four tests still pass, and report any you find.
Keep every probe and scratch file outside the repository, and leave the clone as you found it. CI uses a qualified Bun revision; make no claim of parity.

KNOWN ITEMS ALREADY RULED (assess, do not relitigate)
- The builder ran on the Antigravity surface on the Founder's MacBook with the macOS certification runtime, under three signed addenda to its prompt. The builder, its model, its harness and its addenda are process facts, not review items, apart from the trailers in item 5's scope check.
- You cannot run macOS; the builder's macOS results are the Founder's evidence, not a review item.
- Under DEC-20261015-02 B4, the exact supported-version check is not a defect of Task 46. Do not run a real provider executable, and do not treat the version installed on this PC as a finding.
- bun install changes the mode of packages/founder-act/src/main.ts to executable; restoring it is not a finding.
- The Founder pushed the branch and opened the draft pull request under DEC-20261014-03 E3. That is not a deviation.

BOUNDARIES
You are read-only toward GitHub and the repository. Make no GitHub call of any kind: no gh, no API request, no push, comment, approval, ready, resolve or merge. Edit no file you leave behind. Do not install anything outside a disposable copy. Do not review the known failure itself, any other task, the M21 checkpoint, or anything outside this head. Do not propose changes to the acts. The Founder posts the verdict.

HOW TO CLASSIFY EVERY FINDING
Number each finding. Give file and line, the ruling it breaches (act and part), a concrete failing input or scenario, and one of:
- SUBSTANTIVE: a breach of a ruling, a missing or vacuous required test or assertion, a path outside scope, or behavior you can show is wrong.
- ADVISORY: an improvement the acts do not require, or an item they rule advisory.
- NOT COUNTING: a point plan section 11.3 lists as not counting. Quote the line.
A failing test outside the three changed paths is a finding against this head only if your evidence shows this head causes it; otherwise report it, with that evidence, under report section 5, and not as a finding.
State plainly that under DEC-20261014-03 B10 a SUBSTANTIVE finding makes this verdict round 1 for the new builder under rubric milestone 6. Be exact: do not inflate an advisory into a substantive finding, and do not downgrade a real defect to avoid the consequence.

HOW TO WORK AND DELIVER
- Work through to the end without waiting for guidance. The Founder answers only permission prompts during the review and will not send corrections. If you cannot complete a required item, the verdict is INCONCLUSIVE for that reason.
- Items 1 to 6 are not findings. Their results go only in the verdict section. The findings list holds only defects and advisories, each classified as above.
- For every command, quote the last printed lines verbatim, including the pass, fail and file counts Bun prints, and the exit code. For every probe, give the input as code and the printed output verbatim. Do not summarize where output is required.
- Write the complete final report, every section below in order, to /tmp/m21-task46-codex-r1.md in one pass, then print the same text as your last message. Write nothing else outside a disposable copy.

FINAL REPORT (in this order)
1. Identity and head: reviewer id codex, the SHA you reviewed, the SHA you verified in your checkout, your surface and model id as your session reports them, the host, that you did not author or direct the work and had seen no Task 46 material, and when you read the commit message.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS or FAIL line for each of items 1 to 6 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with printed counts and exit codes, the runtime you used for each, what ran outside a sandbox with approval, and what you only read.
5. Every full-suite failure with its file-alone and base results, the D3 breaks, your probes and any test-defeating implementation, each with its result.
6. Session skill files you read, with paths and SHA-256 values, or the word none.
7. Anything you could not run or verify, and why.
8. Disagreements between this prompt and the acts, or the word none.
