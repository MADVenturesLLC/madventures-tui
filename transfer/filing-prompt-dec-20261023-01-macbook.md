STEP: file DEC-20261023-01 (standing build rules, the Task 24 correction and the stabilization build) and amend AGENTS.md. Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261023-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261023-01-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261023-01-filing. Then run gh api user --jq .login. It must print daley40-lab. If either differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261023-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261023-STANDING-BUILD-RULES (DEC-20261023-01) on 2026-10-23. It sets standing rules for builder and reviewer sessions for the rest of Phase 3A; authorizes a correction of Task 24 on pull request 188 after a Copilot finding that the supervisor's broker delegate does not forward publish and a Cursor finding that a duplicate event_id interrupts the session; authorizes a stabilization build of three fragile tests after Task 25; and amends one bullet of AGENTS.md. Its Part E requires this filing, and the correction starts only after it merges.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the act after git fetch origin claude/awesome-cray-vqrzbt:
  git show 115b2a5c8b577b948b4ba112e4f537ef3c9cfd6f:transfer/DEC-20261023-01-standing-build-rules.md
Read it in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 942c225bb3d4c772ad68c9cac2a7d494655758b9, the merge of pull request 187, or a descendant whose changes since that commit touch no path under docs/decisions/, AGENTS.md, packages/supervisor/, packages/ledger/, packages/broker/ or apps/madbridge/. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261023-01-filing must not exist on origin.
2. The act has SHA-256 71f8d898ea7eaea1a29403306473c7baed6cf6794a76cf92ef1ea58a2956c574, 122 lines, 17,198 bytes. If any value differs, stop.
3. Check the act with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero square brackets; zero bare three-hyphen lines; zero runs of two or more underscores; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals.
4. On origin/main the file docs/decisions/DEC-20261023-01-standing-build-rules.md does not exist, and under docs/ the identifier DEC-20261023-01 appears nowhere. AGENTS.md has SHA-256 844adbbf80936cc60ef334bad049433949be957859a45cde3117b88974b13424, 236 lines, 12,801 bytes, and exactly one line beginning with the bullet "- **A session relaunched after a stop must have a valid `GH_TOKEN` before it runs**". Any other result is a stop.
5. Check the facts the act's A4 and A5 cite on origin/main, quote what you rely on, and stop if any is false:
   - packages/supervisor/src/build.ts: a delegate is made with Object.create(RuntimeBroker.prototype) and given properties with Object.defineProperties, among them snapshotProjectionInput, activate, pause, resume, interrupt and founderClose, and none named publish; and the file creates an execution-bound client with createInProcessBrokerClient for each adapter;
   - packages/ledger/src/schema.ts: the events table declares event_id TEXT UNIQUE NOT NULL;
   - apps/madbridge/src/commands/doctor.ts: execSync runs the name it is given with --version and timeout 5000, for claude and for agy;
   - packages/supervisor/test/preflight.test.ts: the test "preflight creates nothing" compares readdirSync(tmpdir()) before and after preflight;
   - packages/supervisor/test/build-rollback.test.ts: descriptorCount returns readdirSync("/dev/fd").length.

ALLOWED SCOPE
One commit, exactly two paths:
  docs/decisions/DEC-20261023-01-standing-build-rules.md (new, byte for byte from its transfer blob)
  AGENTS.md (the one bullet of precondition 4 replaced by exactly the two bullets in the text block of the act's E2, and nothing else)
After the edit, AGENTS.md must have SHA-256 1e8690d73fd817f2679b949568aaf749a25f22ebcd5c8e640767e9bc09a703d4, 237 lines and 13,109 bytes, and git diff AGENTS.md must show exactly one line removed and two lines added. If any value differs, do not commit: stop and report. Before committing, git status --porcelain must list only those two paths.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting the act's signature or a trailer the act names. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261023-01, standing build rules. The body says the Founder signed the act on 2026-10-23; that it sets standing rules for builder and reviewer sessions, authorizes the Task 24 correction on pull request 188 and a stabilization build of three fragile tests, and amends the last bullet of the GitHub credentials section of AGENTS.md as its E2 rules; that the act's text comes from transfer commit 115b2a5c8b577b948b4ba112e4f537ef3c9cfd6f; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against its transfer blob, and report that the bytes match. Report the SHA-256 of the committed AGENTS.md.
- Push the branch with git push -u origin docs/dec-20261023-01-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 186 with gh api repos/MADVenturesLLC/madventures-tui/pulls/186 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Quote the AGENTS.md diff in the body. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261023-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, including pull request 188, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, gh is not daley40-lab, a hash, line count or byte count differs, the transfer commit or blob is missing, main has moved outside precondition 1, the identifier is already used under docs/, any fact in precondition 5 is false, any path other than the two would change, the AGENTS.md result differs from ALLOWED SCOPE, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, and the preconditions, each result with full SHAs, hashes, line and byte counts.
2. The commit: full 40-character SHA, the two paths, the diff stat, the cmp result, the AGENTS.md diff and its new SHA-256.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
