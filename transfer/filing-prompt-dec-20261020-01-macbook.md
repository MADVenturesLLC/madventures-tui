STEP: file DEC-20261020-01 (Phase 3A order and records) and append six entries to the rounds log. Paste this as the first message of a new Claude Code session started on the Founder's MacBook, after loading the agent environment file the launcher uses, from inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261020-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act and six rounds-log entries in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261020-01-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261020-01-filing. If it is not, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else; do not work in another directory.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261020-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261020-PHASE-3A-ORDER-AND-RECORDS (DEC-20261020-01) on 2026-10-20. It orders the M20 corrections build, then Tasks 24 and 25, before Task 49; records that the Task 48 act authorized a preflight caller early; rules envelope repository binding and plan question (iii); ratifies the merges made without a posted merge authorization; and, in B7 and C1, directs one docs-only pull request that files it and appends rounds-log entries for the verdicts of Tasks 46, 47, 48 and 56 and the reviews of pull requests 172 and 177. The Founder has posted the final verdicts on pull requests 155 and 157 as comments 6294194476 and 6294195487.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the transfer inputs after git fetch origin claude/awesome-cray-vqrzbt:
  git show e90a27d33c8a3b6f45375e31a6122e45c4bc1f93:transfer/DEC-20261020-01-phase-3a-order-and-records.md
  the file transfer/rounds-log-20261020-entries.md at the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- transfer/rounds-log-20261020-entries.md; report that commit
Read the act in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 1bd41aeb58a12acfc0aae583ffecab80cd7eb0ea or a descendant whose changes since that commit touch neither docs/verification/phase-3a-correction-rounds.md nor docs/decisions/. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261020-01-filing must not exist on origin.
2. The transfer inputs have these values; if any differs, stop:
   - DEC-20261020-01: SHA-256 6490b51692dcf5ab231c9ec0c629f9dd71ae9cc719c51623a064882079b077e7, 68 lines, 8,199 bytes.
   - The rounds-log entries: SHA-256 c22ddd4380c827003d1d04c5b0136552902c141a0a1031406b5cf2c95f8887c6, 79 lines, 5,277 bytes.
3. The act has Status ISSUED and the signature (Michael Daley, a Date, and the founder Actor-Id line); no square bracket, no bare three-hyphen line, no run of underscores, none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed", and the word DRAFT nowhere in capitals. The entries have no square bracket and no bare three-hyphen line. Report each result.
4. On origin/main the new decision file does not exist; docs/verification/phase-3a-correction-rounds.md has SHA-256 7204074b23d3ba24176d11af503d4c33e831676e2dcdf86d73332643fee88bf5, 1,201 lines, 116,724 bytes; and under docs/ the identifier DEC-20261020-01 appears nowhere. Report every use you find. Any use is a stop.
5. Check the facts the act and the entries cite, and quote what you rely on; stop if any is false:
   - DEC-20261018-02 B1 says the harness consumes runPurePreflight, and test/phase3a/runtime-harness.ts on origin/main calls runPurePreflightWithDependencies;
   - packages/supervisor/src/preflight.ts on origin/main does not contain the string independence;
   - neither packages/broker/src/publish-legality.ts nor packages/broker/test/incident-atomicity.test.ts exists on origin/main;
   - gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq "[.merged,.head.sha,.merge_commit_sha]|@tsv" for N in 155, 157, 167, 172, 174 and 177 gives the heads and merge commits the entries name, each merged;
   - gh api repos/MADVenturesLLC/madventures-tui/issues/comments/ID --jq .user.login for ID in 6294194476, 6294195487, 6251538502, 6257337808, 6258827316 and 6278664190 succeeds, and the first two print decivantiq.
6. gh api user --jq .login prints daley40-lab, with GH_TOKEN set as the session provides it. Do not run gh auth status, and never print a token or any part of one. Run gh normally. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. If this session has no agent identity, stop and report before any commit.

ALLOWED SCOPE
One commit, exactly two paths:
  docs/decisions/DEC-20261020-01-phase-3a-order-and-records.md (new, byte for byte from its transfer blob)
  docs/verification/phase-3a-correction-rounds.md (changed only by appending the entries file byte for byte at its end; the result must have SHA-256 965cc47a3c9a705d5a1a86feb07b1d3d61c55369bd1be04d947b7dda7299e872, 1,280 lines, 122,001 bytes)
Before committing, git status --porcelain must list only those two paths.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting an act's signature or an entry's Actor-Id. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261020-01 and record six verdicts. The body says the Founder signed the act on 2026-10-20; that it orders the M20 corrections build and Tasks 24 and 25 before Task 49, rules envelope repository binding and plan question (iii), and ratifies the merges made without a posted merge authorization; that six verdict entries are appended to the rounds log under its B7; that the texts come from the transfer commits named above; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against its transfer blob, and report that the bytes match. Report the resulting SHA-256, line count and byte count of the rounds log.
- Push the branch with git push -u origin docs/dec-20261020-01-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp. The Founder will push the branch and then tell you to continue.
- Open a draft pull request against main. Read the body of PR 156 with gh api repos/MADVenturesLLC/madventures-tui/pulls/156 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261020-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, a hash, line count or byte count differs, a transfer commit or blob is missing, main has moved outside precondition 1, the decision identifier is already used under docs/, any fact in precondition 5 is false, any path other than the two would change, the rounds log does not reach the SHA-256 above, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, and the preconditions, each result with full SHAs, hashes, line and byte counts, and the host from uname -s, which must be Darwin.
2. The commit: full 40-character SHA, the two paths, the diff stat, the cmp result and the rounds log's resulting SHA-256.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, and the count of square brackets in the body.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
