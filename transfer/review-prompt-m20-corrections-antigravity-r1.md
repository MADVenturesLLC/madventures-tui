STEP: review of the M20 corrections, pull request 183. Paste this as the first message of a new Antigravity session running a Gemini 4 model on the Founder's MacBook, whose only workspace is the fresh clone /Users/michaeldaley/madventures-tui-m20-corrections-review-r1, detached at b7cbce50f3494f2b9bae1e3de9844a558af86360.

You are the independent Tier-2 reviewer of the M20 corrections in MADVenturesLLC/madventures-tui.

ASSIGNED ROLE
Role-Id: reviewer
Reviewer-Id: antigravity
FIRST, before you read any file: report exactly as your harness shows them the harness name, the model, every active workspace, your working directory (pwd) and git rev-parse HEAD. Run pwd and git rev-parse HEAD to do so; those two commands are part of this report. If a field is not shown, say "not shown"; that alone is not a stop. Stop and report only if the harness is not Antigravity, the model is not a Gemini 4 model, any other workspace is active, or either path or the SHA differs.
You did not write, plan or direct any part of this work, and this session has seen no M20 corrections material before this message. If either is untrue, stop and say so. Do not invent a session id, an actor id or a model id. You review one exact head and nothing else.
Do not read any other clone of this repository, including /Users/michaeldaley/madventures-tui-m20-corrections-r1; the folder /Users/michaeldaley/m20-corrections-r1-pr; anything under /tmp whose name contains m20-corrections; or any earlier review notes. If you have seen any of them, stop and say so. Read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine or ~/.claude-madventures-v5, and run no command that prints an environment variable, a token or a key, or lists processes.

TARGET
Pull request 183, draft, branch build/m20-corrections-r1.
Head under review: b7cbce50f3494f2b9bae1e3de9844a558af86360, one commit.
Binding base: 86604e95617d9a925220f7affce5b6cdad92c9da, the merge of pull request 182.
Verify that git rev-parse HEAD^ equals the binding base and that git status is empty before you read anything else. If either differs, stop and report.

AUTHORITY
Run git fetch origin main claude/awesome-cray-vqrzbt first. Read in full, before the code:
1. From origin/main: docs/decisions/DEC-20261016-01-m20-corrections.md, SHA-256 9b0039d3600de58c1e556458a14c8e28a5d533bdfbfe8f3ba16b1b931f44ecb6. Its E3 defines this review.
2. From origin/main: docs/decisions/DEC-20261020-01-phase-3a-order-and-records.md, SHA-256 e5299202a83ad37e11fd619231422b41fc43779308531b62ae6a5cf06ee3c6b7. Its B3 adds envelope repository binding, and its B4 names this review and extends DEC-20261016-01 B4.
3. The Founder's rulings for this build, signed and kept on the transfer branch. Read each with git show and confirm its SHA-256:
   - 6c4378555cdd955988d40bccd652c0889a89ef4d:transfer/builder-prompt-m20-corrections-codex-macbook.md, SHA-256 d0049c80caf57250f230dc231ce368d91ed45e5392eb846965bcfc6f08f1eed6. Read its RULINGS MADE HERE, rulings 1 to 4, which are part of the acts they name. The rest of that text instructed the builder; it is context, not a claim about what the builder did.
   - 3407f3c0a122b8cefc3015273cacfb92b297cf04:transfer/builder-addendum-m20-2-baseline-timing.md, SHA-256 e78aaabe1fc5ea5a4b3dd52f3e614c6b5a082760b00e51ee3b41d4c9ab8dafb4.
   - 880bf69fdcfded0c5a73df36861d1e0f7f12be11:transfer/builder-addendum-m20-3-cleanup-budget-assertion.md, SHA-256 e3953e9e300622aaaffc25fad8f1e6ebb54782cbe70b71ef4e5aaa2a8de7fe02. It allows one added assertion in "cleanup budget exhaustion fails closed".
4. From origin/main: DEC-20261015-03 (SHA-256 e4148fde243d15508513fbf22b58584c519d1d842ca7fefb016d266bf6f08f61) B5 items 2 to 4; DEC-20261013-01 (SHA-256 fd6d9ad9cc014f2bead775929e3d133583113283b41b669099c18e17eba25d1d) B2, B4 and B6; DEC-20261013-03 (SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7) B2 item 1 and B4; DEC-20261017-02 (SHA-256 6162bae842aee775bb010f98ea98fa8693aa7d933b0d96f38871d7bbc50ed9db) B5; DEC-20261017-03 (SHA-256 ed99cca27ae88b552d2bc6cf61306b1dc583e0fcb2dada22813dac7648c295b3) B5 and B7.
If any text is missing or has another SHA-256, stop and report. Where this prompt and the acts or rulings disagree, they win and you report the disagreement. You make no GitHub call, so report any cross-check against GitHub as not run.

PACKET (read every item)
1. The texts above.
2. At the binding base: spec section 9.1 of docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md; packages/protocol/src/task-envelope.ts; packages/protocol/src/adapter-registry.ts; packages/supervisor/src/attestation.ts; test/phase3a/runtime-harness.ts.
3. The diff from the binding base to the head.
4. At the head, with line numbers: packages/supervisor/src/preflight.ts, packages/supervisor/test/preflight.test.ts and packages/supervisor/test/attestation.test.ts.
The commit message is a claim. Do the review items from the code and your own runs before you read it, and state when you read it. You do not read the pull request description, which is on GitHub.

REVIEW ITEMS (DEC-20261016-01 E3 as DEC-20261020-01 and the rulings amend it; PASS only if all pass)
1. B1: preflight fails with identity_mismatch when an execution's envelope independence_domain differs from its registration's, at the step and position of the provider check, and nothing else in the failure order changes. The test of B2, with the name B2 gives, fails without the check.
2. Envelope repository binding, DEC-20261020-01 B3 as ruling 2 reads it: each of 2a, 2b and 2c holds at the repository_fingerprint step; the git common directory form passes; sha256 and base_git_sha are not compared; an unresolvable path fails with repository_fingerprint; and the binding's test fails without the binding.
3. B3: the freeze test holds and is not vacuous.
4. B4 as ruling 3 and addendum 3 read it: every test that aborts a probe whose fixture installs a SIGTERM handler aborts only after the fixture signals that its handler is installed, with a bounded wait; "malformed JSON and every incorrect auth predicate fail closed" changes only by an explicit 10000 ms timeout; the one assertion addendum 3 allows is the only added assertion in "cleanup budget exhaustion fails closed" and does not depend on the exit promise, the signal list or timing; no test in attestation.test.ts is added, removed or renamed; no assertion is removed or weakened; and no timing bound an assertion checks is changed. Compare every test in that file with the base, line by line.
5. Ruling 1: preflight.test.ts holds exactly 28 tests, and the three tests pull request 172 added are unchanged in name and assertions.
6. The changed paths are exactly the three of DEC-20261016-01 C1, and bun.lock and every manifest are byte-identical to the base.
7. You reproduce D3 and the race of B4, as WHAT YOU MUST EXECUTE says.
Also report any other difference between the head and the acts and rulings above, classified as below.

THE TEST RUNTIME
The macOS certification runtime on this host is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. /opt/homebrew/bin comes before it on PATH, and a child zsh resets PATH through /etc/zprofile, so begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Under that PATH report command -v bun, command -v bunx, the SHA-256 of the file command -v bun prints, bun --version and bun -e 'process.stdout.write(Bun.revision)'. Any difference is a stop. If bunx does not resolve inside /Users/michaeldaley/.bun/bin, use bun x and say so. Change no PATH, profile or host setting.

WHAT YOU MUST EXECUTE (do not substitute reading for these)
If you cannot run Bun in this clone or a disposable copy, return INCONCLUSIVE, name the checks you could not run, and stop. Do not guess results and do not return FAIL for that reason.
- Before any test, ask the Founder in one line to confirm that nothing else is running on this MacBook beyond this session, and record the answer. Before every run of attestation.test.ts, alone or in a larger run, record the output of uptime.
- bun install --frozen-lockfile, then record uname -srm and id -un. Restoring the mode of packages/founder-act/src/main.ts is not a finding; any other tracked change is.
- D3 at the head, each command once, one at a time, in the foreground: bunx tsc --noEmit; bun test packages/supervisor/test/preflight.test.ts; bun test packages/supervisor/test/attestation.test.ts five times in a row, each run alone; bun test packages/supervisor; bun test test/phase3a; bare bun test; git diff --check; git diff --name-only 86604e95617d9a925220f7affce5b6cdad92c9da. The five attestation runs must each pass all 21 tests with no exception applied. In the multi-file runs, a failure of exactly a test the timing exceptions of DEC-20261017-02 B5 and DEC-20261017-03 B5 name is handled as those acts say; report it with the uptime before it.
- The race of B4: in a scratch copy outside the clone, show that a fixed startup delay in the fixture makes the base's version of a changed test fail and the head's version pass. Delete the scratch copy afterwards.
- The RED proofs: remove the independence-domain check from preflight.ts and show the B2 test failing; remove the binding and show its test failing; restore each and confirm the file's SHA-256 equals the head's.
- At least two further deliberate breaks of your own choosing among the changed tests, including the break addendum 3 names: restore the fixed 100 ms abort in "cleanup budget exhaustion fails closed" with a 250 ms startup delay, and show its added assertion failing. Restore after each and confirm the SHA-256.
- Probes of your own, in a temporary directory outside the clone, with fixture executables and synthetic values only: envelopes naming the repository by root, by git common directory, by another repository and by a missing path; a worktree that differs only through a symlink; a git_sha that is not HEAD for each fingerprint kind; and an independence_domain mismatch on each execution. Report each input as code and the printed output verbatim.
- Try to defeat the tests: find an implementation that breaks a ruling while every test still passes, and report any you find.
Keep every probe and scratch file outside the repository, and leave the clone as you found it.

KNOWN ITEMS ALREADY RULED (assess, do not relitigate)
- The builder was a Codex session on this MacBook, under the builder prompt and three signed addenda. Its model, harness, sandbox and addenda are process facts, not review items.
- The timing exceptions of DEC-20261017-02 B5 and DEC-20261017-03 B5 stay in force until this pull request merges, under DEC-20261020-01 B4.
- No test in this build runs a real provider executable; do not run one.
- The Founder pushed the branch and opened the draft pull request. That is not a deviation.

BOUNDARIES
You are read-only toward GitHub and the repository. Make no GitHub call of any kind: no gh, no API request, no push, comment, approval, ready, resolve or merge; git fetch is the only network command you run, apart from the downloads of bun install. Edit no file you leave behind. Install nothing outside a disposable copy. Do not review anything outside this head, and do not propose changes to the acts. The Founder posts the verdict.

HOW TO CLASSIFY EVERY FINDING
Number each finding. Give file and line, the ruling it breaches (act and part, or ruling or addendum number), a concrete failing input or scenario, and one of:
- SUBSTANTIVE: a breach of a ruling, a missing or vacuous required test or assertion, a path outside scope, or behavior you can show is wrong.
- ADVISORY: an improvement the acts do not require.
- NOT COUNTING: a point plan section 11.3 lists as not counting. Quote the line.
A failing test outside the three changed paths is a finding against this head only if your evidence shows this head causes it; otherwise report it, with that evidence, under report section 5. A SUBSTANTIVE finding means FAIL; the Founder rules how it counts. Be exact: do not inflate an advisory, and do not downgrade a real defect.

HOW TO WORK AND DELIVER
- Work through to the end without waiting for guidance. The Founder answers only your one-line host question and permission prompts, and will not send corrections. If you cannot complete a required item, the verdict is INCONCLUSIVE for that reason.
- Items 1 to 7 are not findings; their results go only in the verdict section.
- For every command, quote the last printed lines verbatim, including the pass, fail and file counts Bun prints, and the exit code. For every probe, give the input as code and the printed output verbatim.
- Write the complete final report, every section below in order, to /Users/michaeldaley/m20-corrections-review-r1.md in one pass, then print the same text as your last message, followed by that file's SHA-256 from shasum -a 256.

FINAL REPORT (in this order)
1. Identity and head: reviewer id antigravity, the SHA you reviewed, the SHA in your checkout, your harness and model as shown, the host, that you did not author or direct the work and had seen none of its material, and when you read the commit message.
2. Verdict: PASS, FAIL or INCONCLUSIVE, then a PASS or FAIL line for each of items 1 to 7 with the reason.
3. Findings, each classified as above, or the word none.
4. What you executed, with printed counts, exit codes and the uptime before each attestation run, and what you only read.
5. The race, the RED proofs, the breaks, your probes and any test-defeating implementation, each with its result.
6. Anything you could not run or verify, and why.
7. Disagreements between this prompt and the acts or rulings, or the word none.
