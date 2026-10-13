STEP: file DEC-20261013-01 (Task 45 execution authorization). Paste this as the first message of a new Claude Code session started with claude-agent on the Ubuntu PC, in the fresh clone /home/michaeldaley/madventures-tui-task45-act-filing, detached at origin/main (3f9b414c0ffcaf6955873f757cb55b97b2de77a1).

You are the filing session for the Task 45 execution authorization in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's Ubuntu PC, in the clone you were launched in. This is a docs-only change. Land it as one commit on a branch named docs/task45-act-filing and open one DRAFT pull request.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-task45-act-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261013-TASK45-EXECUTION-AUTHORIZATION on 2026-10-13. It authorizes plan Task 45, the nine pure-preflight steps of M20, and rules on the gaps the plan, PLAN-OPEN-1 and PLAN-OPEN-2 leave. Its Part C names what the later build may change; this filing changes none of it. One docs-only pull request files the act and changes nothing else. There is no rounds-log entry.

AUTHORITY
Read AGENTS.md first. This host is Linux: use sha256sum. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the act from the transfer branch:
  git fetch origin claude/awesome-cray-vqrzbt
  git show f977f27098627493767f6775689a657e78c53cf3:transfer/DEC-20261013-01-task45-execution-authorization.md
Read the act in full before you write anything. It authorizes a build, a host check and a review that happen later. You run none of them: no test, no install, no probe, no provider executable, and no diagnostic command.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. origin/main must be 3f9b414c0ffcaf6955873f757cb55b97b2de77a1, or a descendant that changed only paths under docs/ since that commit. If it moved, report the changed paths. Your branch starts from origin/main with a clean working tree. The branch docs/task45-act-filing must not exist on origin.
2. At transfer commit f977f27098627493767f6775689a657e78c53cf3, transfer/DEC-20261013-01-task45-execution-authorization.md has SHA-256 fe08ae7e3829c5fe44c2df0fae66d938598aba03f9980f57b246c77c0f05afd6, 156 lines, 16,975 bytes. If it differs, stop.
3. The act has Status ISSUED and the signature (Michael Daley, Date 2026-10-13, Actor-Id: founder), no square bracket, no bare three-hyphen line, no run of underscores, none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed", and the word DRAFT nowhere in capitals. Report each result.
4. docs/decisions/DEC-20261013-01-task45-execution-authorization.md does not exist on origin/main, and the identifier DEC-20261013-01 is not used by any file under docs/ on origin/main.
5. Check the facts the act cites. Stop and report if any is false.
   - On origin/main these files have these SHA-256 values: docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md 400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2; docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md 7a5ada083f5e29af397099eb307282242bc1d241ad091d75b8b010065debd286; docs/decisions/PLAN-OPEN-1-identity-authentication.md 196b91b8c9ffbda3d4319c4a8abc96c20ffe16950ba23864eb8780de356f5aee; docs/decisions/PLAN-OPEN-2-environment-allowlists.md 7ceb367c48adb1954e107ed7cdfd5578277f88c1acadb21561e043d24a95417f.
   - PR 142 is merged as 3f9b414c0ffcaf6955873f757cb55b97b2de77a1.
   - The plan's Task 45 heading reads "Task 45: Implement the nine pure-preflight steps", names the five files the act's Part C lists as new or modified under packages/supervisor, and its section 4 table maps M20 to rubric milestone 6 with dependencies M3, M11, M15 and M16.
   - packages/supervisor/src/preflight.ts and packages/supervisor/src/attestation.ts do not exist on origin/main.
   - packages/protocol/src/pair-constraints.ts defines assertActiveSurfaceCardinality and evaluatePairEligibility, and packages/protocol/src/index.ts does not export either.
   - packages/storage/src/index.ts exports proposeStorageRoot, validateStorageRoot and latestFreshRecord, and packages/supervisor/package.json depends only on @madventures/protocol.
   - docs/verification/phase-3a-correction-rounds.md contains no entry under rubric milestone 6.
6. gh auth status shows the agent identity daley40-lab through GH_TOKEN. Run gh normally. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring, and never print a token. If this session has no agent identity, stop and report before any commit.

ALLOWED SCOPE
One commit, exactly one path:
  docs/decisions/DEC-20261013-01-task45-execution-authorization.md (new, byte for byte from the transfer blob)

COMMIT AND PULL REQUEST
- Commit subject: docs(decisions): file the Task 45 execution authorization. The body says the Founder signed DEC-20261013-01 on 2026-10-13; that it authorizes plan Task 45, the nine pure-preflight steps of M20, with a Codex builder on the Ubuntu PC, a Founder-run host-facts check on all three hosts, and a gemini-antigravity review; that it rules on the gaps the plan and PLAN-OPEN-1 and PLAN-OPEN-2 leave without changing them; that it adds no round, and M20 counts under rubric milestone 6; that it changes no code, test, workflow, plan or spec; that the file is copied without editing from transfer commit f977f27098627493767f6775689a657e78c53cf3; and that no other path changes. Docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit.
- cmp the committed act against the transfer blob (use git show into a temporary file outside the clone), and report that the bytes match.
- Push the branch with git push -u origin docs/task45-act-filing. Do not force-push. If the harness blocks the push, do not retry or work around it: stop, report the commit SHA, and save the prepared PR body to a file outside the clone.
- Open a DRAFT pull request against main. Read the body of PR 140 with gh pr view 140 --json body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not resolve threads, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when a hash, line count or byte count differs, the transfer commit or the blob is missing, the decision identifier is already used, any fact in precondition 5 is false, any path other than the one would change, the branch exists on origin, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Preconditions, each result with full SHAs, hashes, line and byte counts, and the host from uname -s.
2. The commit: full 40-character SHA, path, diff stat and the cmp result.
3. attribution-shape-check results in pr and prbody modes.
4. The PR number, its head SHA and state, the checks that have started, and the count of square brackets in the body.
5. Deviations from this prompt, or the word none.
6. The single next decision for the Founder: marking the PR ready under a separate authorization naming its head.
