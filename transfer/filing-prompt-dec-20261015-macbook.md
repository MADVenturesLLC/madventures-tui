STEP: file DEC-20261015-01 (Task 45 macOS correction) and DEC-20261015-02 (Claude Code version range). Paste this as the first message of a new Claude Code session started on the Founder's MacBook, after loading the agent environment file the launcher uses, from inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261015-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for two Founder acts in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261015-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261015-filing. If it is not, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else; do not work in another directory.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261015-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed two acts on 2026-10-15. FOUNDER-ACT-20261015-TASK45-MACOS-CORRECTION (DEC-20261015-01) authorizes one correction commit on pull request 151, the Task 45 pull request, after its required Verify (macOS) check failed, and counts no round. FOUNDER-ACT-20261015-CLAUDE-CODE-VERSION-RANGE (DEC-20261015-02) lets the governed Claude Code launcher update automatically within a supported range from 2.1.296 to below 3.0.0, replaces B1 and B2 of DEC-20261013-05, leaves the code and PLAN-OPEN-1 unchanged until a later act, and counts no round. B6 of DEC-20261015-02 lets one docs-only pull request file both acts and change nothing else.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the transfer inputs:
  git fetch origin claude/awesome-cray-vqrzbt
  git show a55283c9305daa4c5222ba96c430117839f7c351:transfer/DEC-20261015-01-task45-macos-correction.md
  git show 6ba0cf2fd69beb16459d06d1292be4908be9857a:transfer/DEC-20261015-02-claude-code-version-range.md
Read both acts in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be cb240e69c930d97924de101e3049a3578a637252, the merge of pull request 150, or a descendant whose changes since that commit touch only paths under docs/decisions/. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261015-filing must not exist on origin.
2. At transfer commit a55283c9305daa4c5222ba96c430117839f7c351, transfer/DEC-20261015-01-task45-macos-correction.md has SHA-256 ebcf6dcc02e5e053a8e4494a7d2a9154452196c5112098fe6809d427441e95da, 54 lines, 6,384 bytes. At transfer commit 6ba0cf2fd69beb16459d06d1292be4908be9857a, transfer/DEC-20261015-02-claude-code-version-range.md has SHA-256 47c43dee1196e69dc5a74d6162af35bbd6d4815f9251f65685434595bd0b70aa, 55 lines, 6,153 bytes. If any differs, stop.
3. Each act has Status ISSUED, an Amends line, and the signature (Michael Daley, Date 2026-10-15, and the founder Actor-Id line); no square bracket, no bare three-hyphen line, no run of underscores, none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed", and the word DRAFT nowhere in capitals. Report each result for each act.
4. On origin/main: docs/decisions/DEC-20261013-01-task45-execution-authorization.md has SHA-256 fd6d9ad9cc014f2bead775929e3d133583113283b41b669099c18e17eba25d1d; docs/decisions/DEC-20261013-05-claude-code-2-1-296.md has SHA-256 314b3fc57e7f6d8ff2ebf281429760a7461729c01d3aa2e0e4465b513795431e; docs/decisions/PLAN-OPEN-1-identity-authentication.md has SHA-256 d40682beb5a5c3f617638b1775f3777e25c66e12787b9269141164dcc3d9bc42; neither new decision file exists; and the identifiers DEC-20261015-01 and DEC-20261015-02 appear nowhere under docs/. Any use is a stop.
5. Check the facts the acts cite. Stop and report if any is false, and quote the lines you rely on: plan section 11.3 in docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md lists, under Does not count, a host-specific finding impossible to observe on the builder's execution host before the required certification-host runs; B2 of DEC-20261013-05 says the Founder turns off automatic updates of Claude Code for the governed launcher; PLAN-OPEN-1's supported_versions row for Claude Code is ["2.1.296"]; packages/protocol/src/adapter-registry.ts sets supported_versions: ["2.1.296"] for Claude Code; and gh api repos/MADVenturesLLC/madventures-tui/pulls/151 --jq '[.state,.draft,.head.ref]|@tsv' shows an open draft pull request on build/m20-task45-r1.
6. gh api user --jq .login prints daley40-lab, with GH_TOKEN set as the session provides it. Do not run gh auth status, and never print a token or any part of one. Run gh normally. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. If this session has no agent identity, stop and report before any commit.

ALLOWED SCOPE
One commit, exactly two paths:
  docs/decisions/DEC-20261015-01-task45-macos-correction.md (new, byte for byte from its transfer blob)
  docs/decisions/DEC-20261015-02-claude-code-version-range.md (new, byte for byte from its transfer blob)
Before committing, git status --porcelain must list only those two paths.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting an act's signature. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261015-01 and DEC-20261015-02. The body says the Founder signed both acts on 2026-10-15; that DEC-20261015-01 authorizes one correction commit on pull request 151 after Verify (macOS) failed, and adds no round; that DEC-20261015-02 lets the governed Claude Code launcher update automatically within 2.1.296 to below 3.0.0, replaces B1 and B2 of DEC-20261013-05, leaves code and PLAN-OPEN-1 unchanged until a later act, and adds no round; that both come from the transfer commits named above; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp each committed act against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261015-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp. The Founder will push the branch and then tell you to continue.
- Open a draft pull request against main. Read the body of PR 150 with gh api repos/MADVenturesLLC/madventures-tui/pulls/150 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261015-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, a hash, line count or byte count differs, a transfer commit or blob is missing, main has moved outside precondition 1, a decision identifier is already used, any fact in precondition 5 is false, any path other than the two would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, and the preconditions, each result with full SHAs, hashes, line and byte counts, and the host from uname -s, which must be Darwin.
2. The commit: full 40-character SHA, the two paths, the diff stat and both cmp results.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, and the count of square brackets in the body.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready under a separate authorization naming its head.
