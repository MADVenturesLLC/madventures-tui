STEP: Phase 3A Task 46, the ordered transactional build of M21. Paste this as the first message of a new Antigravity session running Gemini 4 on the Founder's MacBook, started from inside the fresh full clone /Users/michaeldaley/madventures-tui-m21-task46-r1 on the new branch build/m21-task46-r1, which the Founder's clone command created at the binding base 1ee5a1d5c37fb2c1a77f8b9bf952179c3530f438.

You are the Task 46 builder for MADVenturesLLC/madventures-tui. You work in an Antigravity session on the Founder's MacBook. You implement plan Task 46 exactly as the governing acts rule, land it as one commit on build/m21-task46-r1, and stop with a report. You make no GitHub call: the Founder pushes the branch and opens the draft pull request.

FIRST: YOUR IDENTITY REPORT (DEC-20261014-01 B7), BEFORE ANY OTHER STEP
In your first reply, before you read any file or run anything else, report exactly as your harness shows them: the harness name, the model identifier, your working directory (pwd), and your branch (git branch --show-current). Then run the macOS runtime check of THE TEST RUNTIME below and report its output. The working directory must be /Users/michaeldaley/madventures-tui-m21-task46-r1 and the branch build/m21-task46-r1. If the harness is not Antigravity, the model is not a Gemini 4 model, either path differs, or anything here cannot be shown, stop and report FOUNDER_DECISION_REQUIRED.

ASSIGNED ROLE AND ATTRIBUTION (act E1)
Role-Id: builder
Actor-Id: session:antigravity/m21-task46-r1
Execution-Surface: antigravity

AUTHORITY
These documents on origin/main govern this work, in this order. Read all of them in full before your first edit:
1. docs/decisions/DEC-20261014-03-task46-execution-authorization.md, FOUNDER-ACT-20261014-TASK46-EXECUTION-AUTHORIZATION, SHA-256 494386cd2f946f2399e610a2b10b7d9f340f18edda4b38e75468a20afa0ce8e3. It rules on every gap the plan leaves, fixes the scope in Part C, the verification in Part D and your binding in Part E.
2. docs/decisions/DEC-20261014-01-builder-reassignment.md, FOUNDER-ACT-20261014-BUILDER-REASSIGNMENT, SHA-256 f1f2bd610b444103bb16c3c2ce48f15be186b428bdb6c5e1e56c1b98f55338cd. Its B1 and B7 bind you.
3. docs/decisions/DEC-20261015-03-m20-checkpoint-closure.md, FOUNDER-ACT-20261015-M20-CHECKPOINT-CLOSURE, SHA-256 e4148fde243d15508513fbf22b58584c519d1d842ca7fefb016d266bf6f08f61, the act that closes the M20 review checkpoint. Its B3 makes DEC-20261014-03 the first execution authorization under DEC-20261014-01 B1. Its B4 rules that Task 46 does not retain execution identities or launch facts in broker state. Its B5 item 2 bars any caller of runPurePreflight until a later act.
4. The two Founder rulings quoted in RULINGS THAT ARE PART OF DEC-20261014-03 below.
5. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, B2 item 1: the macOS test runtime.
6. docs/decisions/DEC-20261015-02-claude-code-version-range.md, B4: the exact supported-version check is not a defect of Task 46.
7. Plan Task 46 and Task 47 in docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md; spec docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md sections 2.1, 2.2, 9.5, 9.6 and 9.13; docs/decisions/PLAN-OPEN-1-identity-authentication.md; docs/decisions/PLAN-OPEN-2-environment-allowlists.md; DEC-20261013-01 and DEC-20261014-02, for the LaunchPlan you consume.
8. AGENTS.md.
The acts decide what you may change. Apart from the rulings in the next section, this prompt only tells you how to work and what to report. If this prompt and an act disagree, the act wins; stop and report the disagreement. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256.

RULINGS THAT ARE PART OF DEC-20261014-03
My merge authorization of pull request 153, comment 6203414147, rules on two findings in DEC-20261014-03, and each ruling is part of that act as if written there. Quoted verbatim from its item 3:
  a. Comment 4288680881, rated high, on B9: B9 lets the builder send to Google what the harness sends while it works, but unlike B4 of DEC-20261007-02 it does not bar secrets from that traffic. B9 is read to include these limits: the builder reads nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine or ~/.claude-madventures-v5; it runs no command that prints the value of an environment variable, a token, a credential or a key, or that lists processes; and it runs no real provider executable, under B7, so no raw output of a real identity or auth-readiness probe can arise. The output of fixture executables under a disposable mkdtemp root, carrying only synthetic values, may be sent. A command whose output would breach these limits is a stop for my ruling.
  b. Comment 4288680945, rated medium, on B3: B3 says a failed build appends no fencing_token_issued, but a failure injected at activate, or any failure after issue_token succeeds, follows that record. B3 is read as follows: on failure, runTransactionalBuild stops at the failing step, appends no session_activated, exposes no active snapshot, and does not unwind; it appends fencing_token_issued only when issue_token itself succeeds; and a fencing_token_issued appended before a later failure stays, recorded in PartialBuildState under B2 so that Task 47's rollback can invalidate it. Item 3 of E4 is unchanged, because reattest precedes issue_token.
And one ruling made here, which is part of DEC-20261014-03 as if written there: B9 is read to include, because D2 requires bun install --frozen-lockfile in a fresh clone, the downloads that command makes from the package registry of the packages bun.lock pins, and its reads and writes of Bun's own install cache. Nothing else is added to B9.

THE TEST RUNTIME (DEC-20261013-03 B2 item 1, DEC-20261014-03 B8)
Every test runs with Bun 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99. Confirm before the first test, and report the output of both: bun --version, which must print 1.4.2; and bun -e 'process.stdout.write(Bun.revision)', which must print 744846f844374847c902b5e7fd59b4342a51ef99. If either differs, stop. On the MacBook no known-failure set applies: every failure or error at D2 or D4 is a stop.

PRECONDITIONS (act D1; verify each, and report each result)
1. git fetch origin main. origin/main is the binding base 1ee5a1d5c37fb2c1a77f8b9bf952179c3530f438 or a descendant of it, and every path changed since that commit is under docs/. Report the SHA and every changed path. HEAD is the binding base on the new branch build/m21-task46-r1, and the tree is clean.
2. The binding base is the merge of pull request 153: its parents, from git log -1 --format=%P, are 78b6ec749f5141128e6a6159fbd97c7dd41341e4 and b5534d5ecf3c277a36342cd9874c2127b5fa0d2c. 78b6ec749f5141128e6a6159fbd97c7dd41341e4 is the merge of pull request 151, the Task 45 pull request, and its second parent is b3e6b885dcac855ef7c63eac673e0d3cac7f61ed. DEC-20261014-03, DEC-20261014-01 and DEC-20261015-03 are at the SHA-256 in AUTHORITY, each with Status ISSUED and signed.
3. packages/supervisor/src/build.ts does not exist at the binding base, and packages/supervisor/src/index.ts exports runPurePreflight and the LaunchPlan type.
4. The test runtime matches THE TEST RUNTIME.

THE WORK
Follow DEC-20261014-03 in full: B1 to B7 for the design, Part C for the paths, D2 for the baseline, D3 for the RED proof and the breaks, D4 for the final checks, D5 for the description table, E2 for the commit. In particular:
- D2: run bun install --frozen-lockfile; bun.lock must stay byte-identical, with only the mode restore of packages/founder-act/src/main.ts to 100644 allowed and reported. Then bunx tsc --noEmit, bun test packages/supervisor packages/broker and bare bun test, each once, one at a time, in the foreground, waiting for each to exit. Record each verbatim with the host from uname -srm, the Bun version and revision, the user from id -un, and your sandbox setting.
- D3: write the four tests first, with exactly the names plan Task 46 gives, and record the RED failure verbatim. After the implementation passes, record one deliberate break for each of the four tests, each with the test that failed; restore after each, confirm each file's SHA-256, and commit none of them.
- B3, as the ruling on comment 4288680945 reads it: on failure the build stops at the failing step, appends no session_activated, exposes no active snapshot and does not unwind; it appends fencing_token_issued only when issue_token succeeds; and a fencing_token_issued appended before a later failure stays, recorded in PartialBuildState.
- DEC-20261015-03 B4: retain no execution identity or launch fact in broker state, and add no source for the snapshot's executions member.
- DEC-20261015-03 B5 item 2: the changed paths contain no call of runPurePreflight. build.ts consumes a LaunchPlan, and each test constructs its LaunchPlan fixture directly. If a test cannot do that, stop.
- B4 and C2: add no live attester for a real surface. Every test that needs an attester supplies a fixture attester, passing or failing, under a disposable mkdtemp root.
- B3 and B7: every test that starts a process or opens a resource releases it in its own teardown. No test runs madbridge-claude-v5, claude or agy, uses the network, or asserts that code cannot read process.env.
- Only the three paths of C1 change, and bun.lock and every manifest stay byte-identical. One commit.

DO NOT (act Parts C2 and F, B9 as ruled above, and this host)
- Make any GitHub call, push, open or comment on a pull request. git fetch and the bun install of D2 are the only network commands you run yourself. Use no web search, web fetch, or other model or service, and start no subagent.
- Read anything outside the clone other than the Bun runtime, the disposable mkdtemp roots your tests create and, under the ruling made above, Bun's install cache, including the Founder's other clones and folders, ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine and ~/.claude-madventures-v5; run a command that prints the value of an environment variable, a token, a credential or a key; or run a command that lists processes. Every executable a test starts is a fixture under a disposable mkdtemp root that emits only synthetic values.
- Write anything outside the clone other than the two files of DELIVERABLES, the disposable mkdtemp roots your tests create, and Bun's install cache.
- Run madbridge-claude-v5, claude, agy or any real provider executable, in a test or otherwise.
- Install, upgrade or remove anything on the host, or change the system PATH, a shell profile or any host setting.
- Write Task 47 rollback, a caller of runTransactionalBuild, a live attester for a real surface, a capability-record write, a TUI step, or any change outside C1, including the plan, a spec, PLAN-OPEN-1, PLAN-OPEN-2 and every decision record.

ATTRIBUTION-SHAPED LINES (DEC-20261014-04 B4)
The pull request description becomes the merge commit message on main, where the attribution check reads every line. In your commit message and in the description, no line other than the three trailers in the final paragraph may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. Check both with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm the only matches are the three trailers. Rewrap any other match before you commit.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when: the identity report cannot be made or differs; your working directory or branch is wrong; a precondition fails; the runtime differs; bun install changes the tree beyond the mode restore; any baseline or final test fails or errors; a break leaves every test passing; any path outside C1 would change; a command's output would breach the limits of the ruling on comment 4288680881; the design needs anything an act does not authorize; or an act and this prompt disagree. State what passed, what failed, what is unchanged, and the single next decision.

DELIVERABLES (act E3)
- One commit on build/m21-task46-r1 with the subject of E2, ending with the three E1 trailers as its final paragraph, each line 72 characters or shorter.
- The pull request title and description saved outside the clone, under /Users/michaeldaley/task46-r1-pr/, as pr-title.txt and pr-body.md. The description carries what and why; the three paths; the D2, D3 and D4 results; the D5 table that maps B1 to B7 to the assertion or check that pins each and to the commit SHA; not-run items; deviations; and the three E1 trailers as its final paragraph. It has zero square brackets and zero bare three-hyphen lines.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on pr-body.md, and report both results.

FINAL REPORT (in this order)
1. Harness and model, as your harness shows them, and the runtime check.
2. Working directory, branch, and the preconditions, each result with full SHAs and hashes, and the host from uname -s, which must be Darwin.
3. The D2 baseline, verbatim, with host, Bun version and revision, user and sandbox setting.
4. The D3 RED failure verbatim, then each break: what you changed, the test that failed, and the restored file's SHA-256.
5. The D4 results: tsc, build-rollback.test.ts with exactly 4 passing, the supervisor and broker tests, the full suite, git diff --check, and the changed-path list against the binding base.
6. The commit: full SHA, parent, diff stat, and the attribution-shaped-line check on the message and the description.
7. The SHA-256 of pr-title.txt and pr-body.md, and both attribution-shape-check results.
8. Deviations from this prompt, or the word none.
9. The single next decision for the Founder: push build/m21-task46-r1 and open the draft pull request with the saved title and description.
