STEP: file DEC-20261022-02 (the cleanup-budget test correction). Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261022-02-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261022-02-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261022-02-filing. Then run gh api user --jq .login. It must print daley40-lab. If either differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261022-02-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261022-CLEANUP-BUDGET-TEST-CORRECTION (DEC-20261022-02) on 2026-10-22, after the Task 24 builder's D3 full suite failed only the test "cleanup budget exhaustion fails closed" in packages/supervisor/test/attestation.test.ts on its elapsed-time bound. The act authorizes a one-file correction of that test, built by a Codex session and reviewed by a Gemini session on Antigravity on the MacBook, and lets a signed addendum move Task 24 to the merge of that correction as its binding base. The correction starts only from a builder prompt naming a binding base that contains this act, so the act must be on main first.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the act after git fetch origin claude/awesome-cray-vqrzbt:
  git show e96f63b03872e15c709b441cbebaced5532082e0:transfer/DEC-20261022-02-cleanup-budget-test-correction.md
Read it in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be f201ced6d2339ae50dcd9a5608a2b92eae4d5165, the merge of pull request 185, or a descendant whose changes since that commit touch no path under docs/decisions/ and none under packages/supervisor/. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261022-02-filing must not exist on origin.
2. The act has SHA-256 db89d209eb1e5c3ca5a5a592074755c6483281a04c36f062449415bd2f7a4be4, 87 lines, 7,145 bytes. If any value differs, stop.
3. Check the act with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero square brackets; zero bare three-hyphen lines; zero runs of two or more underscores; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals.
4. On origin/main the file docs/decisions/DEC-20261022-02-cleanup-budget-test-correction.md does not exist, and under docs/ the identifier DEC-20261022-02 appears nowhere. Any use is a stop.
5. Check the facts the act's A2 and A3 cite on origin/main, quote what you rely on, and stop if any is false:
   - packages/supervisor/src/attestation.ts: EXECUTION_MS is 5_000, CLEANUP_MS is 1_000 and GRACE_MS is 500;
   - packages/supervisor/test/attestation.test.ts, test "cleanup budget exhaustion fails closed": it wraps c.abort to record readiness at the abort; it spawns through wrappedSpawn with a 700 ms delay and afterHandlerReady; it sets its start time with performance.now() before calling runBoundedProbe, and it asserts the elapsed time is less than 1150;
   - b7cbce50f3494f2b9bae1e3de9844a558af86360 is an ancestor of origin/main, and its subject begins fix(supervisor): check the independence domain in preflight.

ALLOWED SCOPE
One commit, exactly one path:
  docs/decisions/DEC-20261022-02-cleanup-budget-test-correction.md (new, byte for byte from its transfer blob)
Before committing, git status --porcelain must list only that path.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting the act's signature or its trailer block. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261022-02, cleanup-budget test correction. The body says the Founder signed the act on 2026-10-22 after the Task 24 builder's D3 full suite failed only that test on its elapsed-time bound; that it authorizes a correction of packages/supervisor/test/attestation.test.ts alone, measuring the bound from the abort, and reads the binding base of DEC-20261022-01 to let a signed addendum move Task 24 to that correction's merge; that the text comes from transfer commit e96f63b03872e15c709b441cbebaced5532082e0; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261022-02-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 185 with gh api repos/MADVenturesLLC/madventures-tui/pulls/185 --jq .body and mirror its structure: what and why, the path changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261022-02-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, gh is not daley40-lab, a hash, line count or byte count differs, the transfer commit or blob is missing, main has moved outside precondition 1, the identifier is already used under docs/, any fact in precondition 5 is false, any path other than the one would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, and the preconditions, each result with full SHAs, hashes, line and byte counts.
2. The commit: full 40-character SHA, the one path, the diff stat, and the cmp result.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
