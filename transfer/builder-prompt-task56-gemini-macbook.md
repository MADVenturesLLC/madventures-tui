STEP: Phase 3A Task 56, the formal Antigravity surface investigation of M25. Paste this as the first message of a new Antigravity session running Gemini 4 on the Founder's MacBook, started from inside the fresh clone /Users/michaeldaley/madventures-tui-m25-task56-r1 on the new branch build/m25-task56-r1, which the Founder's clone command created at the binding base be996b1fd7ccbc1f5fdee914b1e9de31020b8461. Paste nothing before it.

You are the Task 56 builder for MADVenturesLLC/madventures-tui. You work in an Antigravity session on the Founder's MacBook. You investigate the Antigravity surface exactly as the governing act rules, write the capability record and the report, land one commit on build/m25-task56-r1, and stop with a report. You make no GitHub call: the Founder pushes the branch and opens the draft pull request.

FIRST: YOUR IDENTITY REPORT (DEC-20261014-01 B7), BEFORE ANY OTHER STEP
In your first reply, before you read any file or run anything else, report exactly as your harness shows them: the harness name, the model identifier, every active workspace, the command working directory, your working directory (pwd) and your branch (git branch --show-current). Then run the runtime check of THE TEST RUNTIME below and report its output. The only active workspace may be /Users/michaeldaley/madventures-tui-m25-task56-r1, the working directory must be that clone and the branch build/m25-task56-r1. If the harness is not Antigravity, the model is not a Gemini 4 model, any other workspace is listed, either path differs, or anything here cannot be shown, stop and report FOUNDER_DECISION_REQUIRED.

ASSIGNED ROLE AND ATTRIBUTION (act Part E1)
Role-Id: builder
Actor-Id: session:antigravity/m25-task56-r1
Execution-Surface: antigravity

AUTHORITY
These documents on origin/main govern this work. Read all of them in full before your first investigation command:
1. docs/decisions/DEC-20261015-04-task56-antigravity-investigation.md, FOUNDER-ACT-20261015-TASK56-EXECUTION-AUTHORIZATION, SHA-256 1c9b9ca5ebdac214494d0ea7e5e2c0b9f493c53dfbc6ca7ff28e329dc95c2602. It rules on every gap the plan leaves, fixes the scope in Part C, the verification in Part D and your binding in Part E.
2. One Founder ruling made part of that act as if written there, from item 3 of the merge authorization of pull request 154, verbatim: "a. Comment 4289574362, rated high, on DEC-20261015-04 B3 and B10: the finding is correct. B3 item 3 requires agy models, which the Task 60 report records fetching the model catalog, and B10 does not list that request. B10 is read to include the requests that the commands of B3 items 1 to 4 and item 6 make to Google to list models or to read the state of the signed-in account, carrying no repository content and no prompt. Nothing else is added to B10."
3. The limits DEC-20261015-04 B10 applies, from item 3 of the merge authorization of pull request 153, verbatim: "a. Comment 4288680881, rated high, on B9: B9 lets the builder send to Google what the harness sends while it works, but unlike B4 of DEC-20261007-02 it does not bar secrets from that traffic. B9 is read to include these limits: the builder reads nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine or ~/.claude-madventures-v5; it runs no command that prints the value of an environment variable, a token, a credential or a key, or that lists processes; and it runs no real provider executable, under B7, so no raw output of a real identity or auth-readiness probe can arise. The output of fixture executables under a disposable mkdtemp root, carrying only synthetic values, may be sent. A command whose output would breach these limits is a stop for my ruling."
4. docs/decisions/DEC-20261014-01-builder-reassignment.md, SHA-256 f1f2bd610b444103bb16c3c2ce48f15be186b428bdb6c5e1e56c1b98f55338cd. Its B1, B2 and B7 bind you.
5. docs/decisions/DEC-20261013-03-tests-4-6-ruling.md, B2 item 1: the macOS test runtime.
6. Plan Task 56 and section 9 of docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md; spec sections 2.2, 2.3, 5.1, 5.2, 5.5, 5.6, 6.6 and 9.13 of docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md; packages/protocol/src/capability-record.ts; packages/storage/src/capability-store.ts; the Antigravity registration in packages/protocol/src/adapter-registry.ts; docs/verification/phase-3a-antigravity-preliminary.md, whose attestation you do not reuse.
7. AGENTS.md.
The act decides what you may do. This prompt only tells you how to work and what to report. If this prompt and the act disagree, the act wins; stop and report the disagreement. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. You make no GitHub call, so report the cross-check of the quoted rulings against GitHub as not run.

THE TEST RUNTIME (DEC-20261013-03 B2 item 1, DEC-20261015-04 B12)
The macOS certification runtime on this host is /Users/michaeldaley/.bun/bin/bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. /opt/homebrew/bin comes before it on this host's PATH, and a child zsh resets PATH through /etc/zprofile. So begin every command that starts Bun with export PATH="/Users/michaeldaley/.bun/bin:$PATH" inside that same command, and never run /opt/homebrew/bin/bun. Change no system PATH, shell profile, Homebrew or host setting. Under that PATH, report: command -v bun; command -v bunx; shasum -a 256 of the file command -v bun prints; bun --version; and bun -e 'process.stdout.write(Bun.revision)'. Any difference from the values above is a stop. If bunx does not resolve inside /Users/michaeldaley/.bun/bin, use bun x wherever this prompt says bunx, and report it. On the MacBook no known-failure set applies: every failure or error at D2 or D4 is a stop.

THE REQUESTED MODEL (DEC-20261015-04 B5)
The requested model is gemini-4-argon-high, exactly as agy models prints it. If agy models does not list it, stop.

PRECONDITIONS (act D1; verify each, and report each result)
1. git fetch origin main. origin/main is be996b1fd7ccbc1f5fdee914b1e9de31020b8461 or a descendant whose changes since that commit touch only paths under docs/. Report the SHA and every changed path. HEAD is be996b1fd7ccbc1f5fdee914b1e9de31020b8461 on the new branch build/m25-task56-r1, and the tree is clean.
2. The binding base contains DEC-20261015-04 with the SHA-256 in AUTHORITY, and docs/decisions/DEC-20261010-01-m15-checkpoint-closure.md with SHA-256 13e8f01c68ccbaadb614ef5a579487018cd03f4407fbb3ef228bda4a6e585432 and docs/decisions/DEC-20261011-01-m16-checkpoint-closure.md with SHA-256 3182e026f21417ad85cb601a89201d447daee41f986d5c33512d6e17cb61b60f, each with Status ISSUED and signed.
3. Neither path of C1 exists at the binding base.
4. uname -sm prints Darwin arm64, and the runtime matches THE TEST RUNTIME.
5. No other Antigravity session is open on this host, under B11. Ask the Founder to confirm it in one line, and record the answer.

THE WORK
Follow DEC-20261015-04 in full: B2 to B10 for the investigation, the record and the report, Part C for the paths, D2 for the baseline, D3 for the RED proof and the breaks, D4 for the final checks, D5 for the description table, and E1 for the commit. In particular:
- D2 first: bun install --frozen-lockfile, then bunx tsc --noEmit, bun test test/phase3a packages/protocol packages/storage and bare bun test, each once, one at a time, in the foreground. bun.lock must stay byte-identical, with only the mode restore of packages/founder-act/src/main.ts to 100644 allowed and reported.
- D3: write the three tests first, with exactly the names plan Task 56 gives, and record the RED failure verbatim before the report exists.
- B3: keep every command's stdout, stderr and exit status in separate files under one disposable mkdtemp root, outside the clone. Hash the binary and record its --version before the first primitive and after the last.
- B9: if any observation meets the passing evidence of spec section 2.2, write no record and no report, commit nothing, and stop.
- B6 and B7: write the record once with writeCapabilityRecord through a scratch script under the same mkdtemp root, then put its exact bytes in the report's Capability record block with the stored file's name and SHA-256.
- Only the two paths of C1 change. One commit.

DO NOT (act Parts C2 and F, B4, B10, and this host)
- Make any GitHub call, push, open or comment on a pull request.
- Read anything outside the clone other than the binary under investigation, the Bun runtime, Bun's install cache, the storage root of B6 and your own mkdtemp root; read nothing under ~/.secrets, ~/.ssh, ~/.config/madventures, ~/.madmik3-quarantine or ~/.claude-madventures-v5; run no command that prints the value of an environment variable, a token, a credential or a key, or that lists processes.
- Sign in or out of anything, change agy's configuration, or use any agy flag that continues, resumes or names a conversation, selects an agent, or skips permission prompts.
- Install, upgrade or remove anything on the host.
- Change the adapter registry, packages/adapter-antigravity, the rubric, the plan, the spec or any decision record, or investigate any surface other than antigravity.

ATTRIBUTION-SHAPED LINES (DEC-20261014-04 B4)
The pull request description becomes the merge commit message on main, where the attribution check reads every line. In your commit message and in the description, no line other than the three trailers in the final paragraph may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. Check both with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm the only matches are the three trailers. Rewrap any other match before you commit.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when: the identity report cannot be made or differs; a precondition fails; the runtime differs; bun install changes the tree beyond the mode restore; any baseline or final test fails or errors; a break leaves every test passing; the binary's hash or version changes during the investigation; the requested model is not listed; any observation meets the passing evidence; the parser rejects the record; a command's output would breach the limits of AUTHORITY item 3; any path outside C1 would change; or the act and this prompt disagree. State what passed, what failed, what is unchanged, and the single next decision.

DELIVERABLES (act E3)
- One commit on build/m25-task56-r1 with the subject of C1, ending with the three E1 trailers as its final paragraph, each line 72 characters or shorter.
- The pull request title and description saved outside the clone, under /Users/michaeldaley/task56-r1-pr/, as pr-title.txt and pr-body.md. The description carries what and why; the two paths; the D2, D3 and D4 results; the D5 table; the stored record's path and SHA-256; not-run items; deviations; and the three E1 trailers as its final paragraph. It has zero square brackets and zero bare three-hyphen lines.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on pr-body.md, and report both results.

FINAL REPORT (in this order)
1. Harness, model, workspaces and the runtime check.
2. Working directory, branch, and the preconditions, each result with full SHAs and hashes.
3. The D2 baseline, verbatim.
4. The D3 RED failure verbatim, then each break: what you changed, the test that failed, and the restored file's SHA-256.
5. The investigation: the binary's path, SHA-256 and version before and after; every primitive with its exit status; the rubric clause each meets or fails; the auth-readiness result; and the overall verdict.
6. The stored record's full path and SHA-256, and the bytes of the record.
7. The D4 results: tsc, evidence-pipeline.test.ts with exactly 3 passing, the test/phase3a, protocol and storage tests, the full suite, git diff --check, and the changed-path list against the binding base.
8. The commit: full SHA, parent, diff stat, and the attribution-shaped-line check on the message and the description.
9. The SHA-256 of pr-title.txt and pr-body.md, and both attribution-shape-check results.
10. Deviations from this prompt, or the word none.
11. The single next decision for the Founder: the record hash check of E2, then pushing build/m25-task56-r1 and opening the draft pull request.
