STEP: file DEC-20261015-03 (M20 checkpoint closure), DEC-20261014-01 with its spec patch, and DEC-20261014-03, and append the M20 entries to the rounds log. Paste this as the first message of a new Claude Code session started on the Founder's MacBook, after loading the agent environment file the launcher uses, from inside the fresh clone /Users/michaeldaley/madventures-tui-m20-closure-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for three Founder acts in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/m20-closure-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY
Run pwd. It must be /Users/michaeldaley/madventures-tui-m20-closure-filing. If it is not, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else; do not work in another directory.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-m20-closure-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261015-M20-CHECKPOINT-CLOSURE (DEC-20261015-03) on 2026-10-15. It accepts the gemini-antigravity PASS verdict on Task 45, closes the M20 review checkpoint at the pull request 151 merge commit 78b6ec749f5141128e6a6159fbd97c7dd41341e4, rules that DEC-20261014-03 is the first execution authorization under DEC-20261014-01 B1, rules that Task 46 does not retain execution identities, carries five advisories, and adds no round. Its C1 directs one docs-only pull request that files it, files DEC-20261014-01 and applies that act's ratified patch to the spec, files DEC-20261014-03, and appends two entries to the rounds log, and changes nothing else.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the transfer inputs after git fetch origin claude/awesome-cray-vqrzbt:
  git show da5f4a2821d0a9a724a039f2529ff418958fb1f9:transfer/DEC-20261015-03-m20-checkpoint-closure.md
  git show 9327deb15163b36ded3cd3a8382c99be4f0c8093:transfer/DEC-20261014-01-builder-reassignment.md
  git show 9327deb15163b36ded3cd3a8382c99be4f0c8093:transfer/builder-reassignment-spec.patch
  git show 6e960563f084b28aabaadfcc4c1d626ff4904078:transfer/DEC-20261014-03-task46-execution-authorization.md
  the file transfer/rounds-log-m20-entries.md at the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- transfer/rounds-log-m20-entries.md; report that commit
Read all three acts in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 78b6ec749f5141128e6a6159fbd97c7dd41341e4, the merge of pull request 151, or a descendant whose changes since that commit touch only paths under docs/decisions/. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/m20-closure-filing must not exist on origin.
2. The transfer inputs have these values; if any differs, stop:
   - DEC-20261015-03: SHA-256 e4148fde243d15508513fbf22b58584c519d1d842ca7fefb016d266bf6f08f61, 68 lines, 8,363 bytes.
   - DEC-20261014-01: SHA-256 f1f2bd610b444103bb16c3c2ce48f15be186b428bdb6c5e1e56c1b98f55338cd, 64 lines, 6,041 bytes.
   - The spec patch: SHA-256 dd70754cff9155debfc0a62a2b92321668a3b073ad53e0d152260cfb36855db4, 3,574 bytes.
   - DEC-20261014-03: SHA-256 494386cd2f946f2399e610a2b10b7d9f340f18edda4b38e75468a20afa0ce8e3, 104 lines, 10,047 bytes.
   - The rounds-log entries: SHA-256 12c5b5802cc78f8373dfcb8b644770e434772e5a61babb79a6a99cc290f7cc47, 50 lines, 3,764 bytes.
3. Each act has Status ISSUED and the signature (Michael Daley, a Date, and the founder Actor-Id line); no square bracket, no bare three-hyphen line, no run of underscores, none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed", and the word DRAFT nowhere in capitals. The rounds-log entries have no square bracket and no bare three-hyphen line. Report each result.
4. On origin/main: docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md has SHA-256 913a7b20b74cda89224e40a32866556d5375755dd9810d0ba9cdfbed068a5a27; docs/verification/phase-3a-correction-rounds.md has SHA-256 cf7e9d00d6e431b741c34366f8cdf07bc2fae1bb7d128f5882f4e99546384d4e, 919 lines, 92,266 bytes; none of the three new decision files exists; and under docs/ the identifiers DEC-20261014-01, DEC-20261014-03 and DEC-20261015-03 appear only in docs/decisions/DEC-20261015-02-claude-code-version-range.md. Report every use you find. Any other use is a stop.
5. Check the facts the closure act cites, and quote what you rely on; stop if any is false: gh api repos/MADVenturesLLC/madventures-tui/pulls/151 --jq '[.merged,.merge_commit_sha]|@tsv' prints true and 78b6ec749f5141128e6a6159fbd97c7dd41341e4; the plan, docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md, marks its question (iii) about Task 46 retaining execution identities FOUNDER-RATIFICATION-REQUIRED; and spec section 9.1 says the envelope provider and independence domain MUST equal the registered values, with a mismatch being the preflight failure identity_mismatch.
6. gh api user --jq .login prints daley40-lab, with GH_TOKEN set as the session provides it. Do not run gh auth status, and never print a token or any part of one. Run gh normally. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. If this session has no agent identity, stop and report before any commit.

ALLOWED SCOPE
One commit, exactly five paths:
  docs/decisions/DEC-20261015-03-m20-checkpoint-closure.md (new, byte for byte from its transfer blob)
  docs/decisions/DEC-20261014-01-builder-reassignment.md (new, byte for byte from its transfer blob)
  docs/decisions/DEC-20261014-03-task46-execution-authorization.md (new, byte for byte from its transfer blob)
  docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md (changed only by the patch: run git apply --check and then git apply, edit no hunk; the result must have SHA-256 c09fe4849a4a61bf3e1494b77267020e00bd1d7b3015e3b2332ec5d71b07f769)
  docs/verification/phase-3a-correction-rounds.md (changed only by appending the entries file byte for byte at its end; the result must have SHA-256 ef569d187e6b4809f229b4b5743d2790fae9470f16f64fab5f36e24ce31209b4, 969 lines, 96,030 bytes)
Before committing, git status --porcelain must list only those five paths.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting an act's signature. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: close M20 and file DEC-20261015-03, DEC-20261014-01 and DEC-20261014-03. The body says the Founder signed DEC-20261015-03 on 2026-10-15 and DEC-20261014-01 and DEC-20261014-03 on 2026-10-14; that DEC-20261015-03 accepts the Task 45 PASS, closes M20 at 78b6ec749f5141128e6a6159fbd97c7dd41341e4 and adds no round; that DEC-20261014-01 makes Gemini 4 on Antigravity the primary implementer and its patch changes the spec's reviewer sections; that DEC-20261014-03 authorizes Task 46; that two entries are appended to the rounds log; that the texts come from the transfer commits named above; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp each committed act against its transfer blob, and report that the bytes match. Report the resulting SHA-256 of the spec and of the rounds log.
- Push the branch with git push -u origin docs/m20-closure-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp. The Founder will push the branch and then tell you to continue.
- Open a draft pull request against main. Read the body of PR 152 with gh api repos/MADVenturesLLC/madventures-tui/pulls/152 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/m20-closure-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, a hash, line count or byte count differs, a transfer commit or blob is missing, main has moved outside precondition 1, a decision identifier is used where precondition 4 does not allow, any fact in precondition 5 is false, the patch does not apply cleanly, any path other than the five would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, and the preconditions, each result with full SHAs, hashes, line and byte counts, and the host from uname -s, which must be Darwin.
2. The commit: full 40-character SHA, the five paths, the diff stat, the three cmp results and the resulting SHA-256 of the spec and the rounds log.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, and the count of square brackets in the body.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready under a separate authorization naming its head.
