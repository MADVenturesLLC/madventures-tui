STEP: Task 45 review. Launch as the first message of a new agy session running any Gemini model on the Founder's Ubuntu PC, started in the fresh clone /home/michaeldaley/madventures-tui-m20-task45-gemini-r1, detached at b3e6b885dcac855ef7c63eac673e0d3cac7f61ed.

You are the independent reviewer for Phase 3A M20 Task 45 in MADVenturesLLC/madventures-tui.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: gemini-antigravity
You are a Gemini model in an Antigravity session on the Founder's Ubuntu PC. State your surface and your model id exactly as your session reports them, and nothing you cannot verify. Do not invent a session id, an actor id or a model id. You did not write, plan or direct any part of this work, and this session has seen no Task 45 material before this message. If either is untrue, stop and say so. You review one exact head and nothing else.
Do not read the builder's clone /home/michaeldaley/madventures-tui-m20-task45-r1, the folder /home/michaeldaley/task45-r1-pr, the folder /home/michaeldaley/task45-host-facts, any file whose name starts with founder-baseline, or any earlier review notes. If you have seen any of them, stop and say so. Read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine or ~/.claude-madventures-v5, and run no command that prints an environment variable, a token or a key, or lists processes.

SESSION SKILLS AND SANDBOX (Founder rulings made in advance)
- If your session requires you to load skills or instruction files that live outside the clone, you may read those files read-only. This prompt and the acts take precedence over them; where a skill asks for something this prompt does not allow, follow this prompt. Report the full path and SHA-256 of every such file you read.
- On this PC, bun install must run outside any sandbox to build the native pty module, and the test suite needs local sockets. If your harness runs commands in a sandbox and a command fails for a sandbox reason (for example a local socket listen denied with EPERM, or a read-only file system), you may ask the Founder's approval to rerun that exact command outside the sandbox. Report both runs. Do not rerun a command outside the sandbox for any other reason.
- Run every test command once, one at a time, in the foreground, and wait for it to exit. Do not run two test commands at once.

TARGET
Pull request 151, draft, branch build/m20-task45-r1.
Head under review: b3e6b885dcac855ef7c63eac673e0d3cac7f61ed (two commits)
First commit: 55970568fd96a46015d906a84eaf85500bd00585, the Task 45 build
Second commit: b3e6b885dcac855ef7c63eac673e0d3cac7f61ed, the correction of DEC-20261015-01
Binding base: 09340bfac348c9e0c03d7839d2bf45ba221f83c4, the merge that put DEC-20261013-05 on main, which B4 of that act makes the binding base of DEC-20261013-01. Where DEC-20261013-01 D4 names 435dfe7c05db4fa0db4f9d9b011db6d0cd39b3d2, use 09340bfac348c9e0c03d7839d2bf45ba221f83c4.
Verify that pwd is /home/michaeldaley/madventures-tui-m20-task45-gemini-r1, that git rev-parse HEAD there equals the head under review, that git rev-list --count 09340bfac348c9e0c03d7839d2bf45ba221f83c4..HEAD is 2, and that git status is empty, before you read anything. If any differs, stop and report.

AUTHORITY (read from origin/main, in full, before the code; run git fetch origin main first)
1. FOUNDER-ACT-20261013-TASK45-EXECUTION-AUTHORIZATION, docs/decisions/DEC-20261013-01-task45-execution-authorization.md, SHA-256 fd6d9ad9cc014f2bead775929e3d133583113283b41b669099c18e17eba25d1d. Its Part E5 defines this review.
2. FOUNDER-ACT-20261014-TASK45-ASYNC-PREFLIGHT, docs/decisions/DEC-20261014-02-task45-async-preflight.md, SHA-256 2f84abda77be4e15143a09c47e0b75f0a4693b856937f3a8079e39ff34425927. It makes runPurePreflight return a Promise.
3. One further ruling by the Founder, made in the merge authorization of pull request 148, which filed DEC-20261014-02, and made part of that act as if written there. Here is the ruling, verbatim: "in B5, "no caller of runPurePreflight is added or changed" means no caller outside the eight paths of DEC-20261013-01 C1. The tests in packages/supervisor/test/preflight.test.ts and packages/supervisor/test/attestation.test.ts call runPurePreflight and await it as B4 requires." You make no GitHub calls, so report the cross-check of this text against GitHub as not run.
4. FOUNDER-ACT-20261015-TASK45-MACOS-CORRECTION, docs/decisions/DEC-20261015-01-task45-macos-correction.md, SHA-256 ebcf6dcc02e5e053a8e4494a7d2a9154452196c5112098fe6809d427441e95da. It authorizes the second commit and limits it.
5. FOUNDER-ACT-20261015-CLAUDE-CODE-VERSION-RANGE, docs/decisions/DEC-20261015-02-claude-code-version-range.md, SHA-256 47c43dee1196e69dc5a74d6162af35bbd6d4815f9251f65685434595bd0b70aa. Read its B4.
6. DEC-20261013-05, docs/decisions/DEC-20261013-05-claude-code-2-1-296.md, SHA-256 314b3fc57e7f6d8ff2ebf281429760a7461729c01d3aa2e0e4465b513795431e, for the binding base and the supported version.
7. The known-failure set and the Linux runtime: DEC-20261011-02 (SHA-256 0d163c6aa931d0d52a94bd3f5ad4df3cdf3925caef6d80f2429415d03328fafd) A2 and B2; DEC-20261012-02 (SHA-256 c1383d518b54b9cb7e885dd649df39ac82740d973196ba8c89fce834fffa3660) B1; DEC-20261013-03 (SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7) B2, B4 and B6.
If any act is missing, has another SHA-256 or lacks Status ISSUED, stop and report. Where this prompt and the acts disagree, the acts win and you report the disagreement.

PACKET (read every item)
1. The acts above.
2. At the binding base: the plan's Task 45 section and sections 4, 11.3 and 11.4 of docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, SHA-256 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2; spec sections 1.5, 2.1, 2.2, 5.1, 5.2, 5.5 and 9.13 of docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md, SHA-256 2045c4ec33ef12a77fa03a922c66fa6d8c9035d4c8f8dfff7c23e47337c17e6c; docs/decisions/PLAN-OPEN-1-identity-authentication.md, SHA-256 d40682beb5a5c3f617638b1775f3777e25c66e12787b9269141164dcc3d9bc42; and docs/decisions/PLAN-OPEN-2-environment-allowlists.md, SHA-256 b60676aa47b216c36d9080c884650943cdac93dd12109d2864ebcf0eb6887d8c, in full.
3. The diff from the binding base to the head, and the diff of each commit on its own.
4. At the head, with line numbers: every file under packages/supervisor, packages/protocol/src/index.ts, packages/protocol/src/adapter-registry.ts, packages/protocol/src/pair-constraints.ts, the storage-root functions under packages/storage that preflight calls, tsconfig.json and the bun.lock diff.
5. The architecture tests under test/phase3a.
The builder's commit messages are claims. Treat them as unverified until you check them against the code and your own runs. Do review items 1 to 8 from the code and your own executions before you read the commit messages, and state when you read them. You do not read the pull request description, which is on GitHub.

REVIEW ITEMS (DEC-20261013-01 E5 items 1 to 7, and item 8 from DEC-20261015-01; PASS only if all eight pass)
1. The steps, their order and their failure codes follow B2, and each failure code has a test.
2. Preflight creates nothing, reads no process.env, and holds no operating-system branch, under B1 and B5, read with DEC-20261014-02 B3.
3. One environment object is built once and reused byte-for-byte across both probes and the LaunchPlan.
4. Both probes follow PLAN-OPEN-2's bounds and B3, including the cleanup path and metadata-only diagnostics, read with DEC-20261014-02 B2.
5. The fingerprint follows B4, and no git command writes.
6. The tests follow B6, read with DEC-20261014-02 B4 and the ruling of authority item 3, and the changed paths are exactly C1 under B7.
7. You reproduce the D4 results and at least four of the D3 breaks.
8. The second commit follows DEC-20261015-01 B1 and B2: it changes only C1 paths, adds, removes and renames no test, removes and weakens no assertion, and changes a fixture or assertion only so that it tests on macOS the same property it tests on Linux.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
You must be able to run commands. If you cannot run bun in this clone or a disposable copy, return INCONCLUSIVE, name the checks you could not run, and stop. Do not guess results and do not return FAIL for that reason.
- bun install --frozen-lockfile with the Bun on PATH, outside the sandbox with approval if needed, then record bun --version, uname -srm, the PRETTY_NAME line of /etc/os-release, id -un, and the SHA-256 of the native pty.node file it built. If it changes a tracked file's mode or content, restore it and say so.
- The custodied runtime of DEC-20261013-03 B2 item 2, by its full path /home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun: confirm its SHA-256 and Bun.revision as that act's B4 requires before any test, and run every test with it.
- The D4 commands of DEC-20261013-01, exactly, at the head, with the binding base above: bunx tsc --noEmit; "$QB" test packages/supervisor; "$QB" test packages/protocol packages/storage test/phase3a/architecture-phase3a.test.ts; "$QB" test; git diff --check; git diff --name-only 09340bfac348c9e0c03d7839d2bf45ba221f83c4. Check each against act D4 and the source searches it names.
- For every test that fails or errors in the full suite: say whether it is test 4 of DEC-20261011-02 A2, and run "$QB" test in a disposable git worktree at the binding base, outside this clone, to compare. A failure that is not test 4 failing as at the base is a finding. Remove that worktree afterwards.
- At least four of the D3 breaks of DEC-20261013-01, each applied to the working file at the head and restored afterwards, including at least two of the nine named ones. Report which test or tests fail for each. Restore after each and confirm the file's SHA-256 equals the head's.
- Probes of your own, in a temporary directory outside the clone, against the functions at the head, using fixture executables only: the failure code and its position for each step of B2; a successful preflight with a fixture pair, then checking that nothing was created in the repository, the worktree or storage; that the returned plan and its parts are frozen; that both probes and the plan receive the same environment object; a hanging auth probe, timing the SIGTERM to SIGKILL escalation; cancellation through the AbortSignal before and after spawn; oversized probe output; and diagnostics on success and on each failure. Report each input as code and the printed output verbatim. Use only synthetic values.
- Try to defeat the tests: find an implementation that violates a ruling while all the tests still pass, and report any you find.
Keep every probe and scratch file outside the repository, and leave the clone as you found it. CI uses a qualified Bun revision; make no claim of parity.

KNOWN ITEMS ALREADY RULED (assess, do not relitigate)
- The builder ran on the Codex surface and reported its model as the label its harness shows, GPT-6. The builder, its model and its harness are not review items, apart from the trailers in item 6's scope check.
- The builder ran outside a sandbox with the Founder's approval. That is a process fact, not a review item.
- The required check Verify (macOS) failed on the first commit, and DEC-20261015-01 authorized the second commit. You cannot run macOS; the macOS result is the Founder's evidence, not a review item. Judge the second commit under item 8 only.
- Under DEC-20261015-02 B4, the exact supported-version check in the registry and in the attestation parser is not a defect of Task 45. Do not run a real provider executable, and do not treat the version installed on this PC as a finding.
- bun install changes the mode of packages/founder-act/src/main.ts to executable; restoring it is not a finding. Under B7, restoring an unrelated bun.lock line is not a deviation.
- The Founder pushed the branch, opened the draft pull request and replaced its description under DEC-20261013-01 E4 and DEC-20261015-01 B6. That is not a deviation.

BOUNDARIES
You are read-only toward GitHub and the repository. Make no GitHub call of any kind: no gh, no API request, no push, comment, approval, ready, resolve or merge. Edit no file you leave behind. Do not install anything outside a disposable copy. Do not review the known failure itself, any other task, the M20 checkpoint, or anything outside this head. Do not propose changes to the acts. The Founder posts the verdict.

HOW TO CLASSIFY EVERY FINDING
Number each finding. Give file and line, the ruling it breaches (act and part), a concrete failing input or scenario, and one of:
- SUBSTANTIVE: a breach of a ruling, a missing or vacuous required test or assertion, a path outside scope, or behavior you can show is wrong.
- ADVISORY: an improvement the acts do not require, or an item they rule advisory.
- NOT COUNTING: a point plan section 11.3 lists as not counting. Quote the line.
State plainly that under DEC-20261013-01 B10 a SUBSTANTIVE finding makes this verdict round 1 under rubric milestone 6. Be exact: do not inflate an advisory into a substantive finding, and do not downgrade a real defect to avoid the consequence.

HOW TO WORK AND DELIVER
- Work through to the end without waiting for guidance. The Founder answers only permission prompts during the review and will not send corrections. If you cannot complete a required item, the verdict is INCONCLUSIVE for that reason.
- Items 1 to 8 are not findings. Their results go only in the verdict section. The findings list holds only defects and advisories, each classified as above.
- For every command, quote the last printed lines verbatim, including the pass, fail and file counts Bun prints, and the exit code. For every probe, give the input as code and the printed output verbatim. Do not summarize where output is required.
- Write the complete final report, every section below in order, to /tmp/m20-task45-gemini-r1.md in one pass, then print the same text as your last message. Write nothing else outside a disposable copy.

FINAL REPORT (in this order)
1. Identity and head: reviewer id gemini-antigravity, the SHA you reviewed, the SHA you verified in your checkout, your surface and model id as your session reports them, the host, that you did not author or direct the work and had seen no Task 45 material, and when you read the commit messages.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS/FAIL line for each of items 1 to 8 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with printed counts and exit codes, the runtime you used for each, what ran outside a sandbox with approval, and what you only read.
5. The base comparison for every full-suite failure, the D3 breaks, your probes and any test-defeating implementation, each with its result.
6. Session skill files you read, with paths and SHA-256 values, or the word none.
7. Anything you could not run or verify, and why.
8. Disagreements between this prompt and the acts, or the word none.
