STEP: file DEC-20261014-02 (Task 45 async preflight). Paste this as the first message of a new Claude Code session started on the Founder's MacBook, after loading the agent environment file the launcher uses, from inside the fresh clone /Users/michaeldaley/madventures-tui-async-preflight-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for the Task 45 async preflight act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/task45-async-preflight and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY
Run pwd. It must be /Users/michaeldaley/madventures-tui-async-preflight-filing. If it is not, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else; do not work in another directory.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-async-preflight-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261014-TASK45-ASYNC-PREFLIGHT on 2026-10-14. It amends DEC-20261013-01 so that runPurePreflight returns a Promise of the result the plan names, because PLAN-OPEN-2 requires the auth-readiness probe to honor cancellation after spawn and to escalate from SIGTERM to SIGKILL within fixed budgets, which a synchronous function cannot do. It changes nothing else in Task 45, edits no plan or spec, and adds no round. Its part C1 says one docs-only pull request files the act and changes nothing else.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the transfer input:
  git fetch origin claude/awesome-cray-vqrzbt
  git show 29448cb32e84ebf71cb0bcff300fcb1e122fcc31:transfer/DEC-20261014-02-task45-async-preflight.md
Read the act in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be b5662096d0f03929602c90a0d8c2c5cfaa8ad24d, the merge of DEC-20261013-04, or a descendant whose changes since that commit touch only paths under docs/decisions/. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/task45-async-preflight must not exist on origin.
2. At transfer commit 29448cb32e84ebf71cb0bcff300fcb1e122fcc31, transfer/DEC-20261014-02-task45-async-preflight.md has SHA-256 2f84abda77be4e15143a09c47e0b75f0a4693b856937f3a8079e39ff34425927, 54 lines, 5,092 bytes. If any differs, stop.
3. The act has Status ISSUED, an Amends line naming DEC-20261013-01 with SHA-256 fd6d9ad9cc014f2bead775929e3d133583113283b41b669099c18e17eba25d1d, and the signature (Michael Daley, Date 2026-10-14, Actor-Id: founder); no square bracket, no bare three-hyphen line, no run of underscores, none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed", and the word DRAFT nowhere in capitals. Report each result.
4. On origin/main: docs/decisions/DEC-20261013-01-task45-execution-authorization.md has SHA-256 fd6d9ad9cc014f2bead775929e3d133583113283b41b669099c18e17eba25d1d; docs/decisions/DEC-20261014-02-task45-async-preflight.md does not exist; and the identifier DEC-20261014-02 appears nowhere under docs/. Any use is a stop.
5. Check the facts the act cites. Stop and report if any is false: plan Task 45 in docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md declares export function runPurePreflight(input: PreflightInput) with a return type that is not a Promise; docs/decisions/PLAN-OPEN-2-environment-allowlists.md, in its section Bounded auth-probe execution, requires the probe to accept the preflight cancellation signal, and says cancellation after spawn sends SIGTERM, waits no more than 500 milliseconds, then sends SIGKILL within a 1,000-millisecond cleanup budget; and neither packages/supervisor/src/preflight.ts nor packages/supervisor/src/attestation.ts exists on origin/main. Quote the lines you rely on.
6. gh api user --jq .login prints daley40-lab, with GH_TOKEN set as the session provides it. Do not run gh auth status, and never print a token or any part of one. Run gh normally. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. If this session has no agent identity, stop and report before any commit.

ALLOWED SCOPE
One commit, exactly one path:
  docs/decisions/DEC-20261014-02-task45-async-preflight.md (new, byte for byte from the transfer blob of precondition 2)
Before committing, git status --porcelain must list only that path.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting the act's signature. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261014-02, Task 45 async preflight. The body says the Founder signed DEC-20261014-02 on 2026-10-14; that it amends DEC-20261013-01 so that runPurePreflight returns a Promise of the result the plan names; why, in one sentence on PLAN-OPEN-2's post-spawn cancellation; that nothing else in Task 45 changes and no caller is added; that the plan, the specs and PLAN-OPEN-2 are not edited; that it adds no round; and that the act comes from transfer commit 29448cb32e84ebf71cb0bcff300fcb1e122fcc31. Docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against the transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/task45-async-preflight. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp. The Founder will push the branch and then tell you to continue.
- Open a draft pull request against main. Read the body of PR 147 with gh api repos/MADVenturesLLC/madventures-tui/pulls/147 --jq .body and mirror its structure: what and why, the path changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/task45-async-preflight -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, a hash, line count or byte count differs, the transfer commit or the blob is missing, main has moved outside precondition 1, the decision identifier is already used, any fact in precondition 5 is false, any path other than the one would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, and the preconditions, each result with full SHAs, hashes, line and byte counts, and the host from uname -s, which must be Darwin.
2. The commit: full 40-character SHA, the path, the diff stat and the cmp result.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, and the count of square brackets in the body.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready under a separate authorization naming its head.
