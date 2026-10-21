STEP: file DEC-20261021-01 (merge records and the M20 rulings). Paste this as the first message of a new Claude Code session started on the Founder's MacBook with the agent identity loaded, from inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261021-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261021-01-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261021-01-filing. If it is not, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else; do not work in another directory.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261021-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261021-MERGE-RECORDS-AND-M20-RULINGS (DEC-20261021-01) on 2026-10-21. It records thirteen squash merges whose messages fail the attribution check on main, and the merges of pull requests 180 and 181; leaves main's history as it is; ratifies the merges of 180 and 181; rules that every pull request merges with the merge-commit method, only from the Founder's account and under DEC-20261020-01 B6 and DEC-20261015-05 B4; and files the rulings of the M20 corrections builder prompt and its addendum 1. Its C1 directs one docs-only pull request that files it and changes nothing else.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the act after git fetch origin claude/awesome-cray-vqrzbt:
  git show 4c27933bbd55dfa3a5110c42f393b394fc99aa26:transfer/DEC-20261021-01-merge-records-and-m20-rulings.md
Read it in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 86604e95617d9a925220f7affce5b6cdad92c9da or a descendant whose changes since that commit touch neither docs/decisions/ nor any of packages/supervisor/src/preflight.ts, packages/supervisor/test/preflight.test.ts and packages/supervisor/test/attestation.test.ts. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261021-01-filing must not exist on origin.
2. The act has SHA-256 1da36426da4fcb1eac7052096a1eaa6d99d57e4e50c8cf187a4e928f040d36df, 84 lines, 9,951 bytes. If any value differs, stop.
3. The act has Status ISSUED and the signature (Michael Daley, a Date, and the founder Actor-Id line); no square bracket, no bare three-hyphen line, no run of underscores, none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed", and the word DRAFT nowhere in capitals.
4. On origin/main the file docs/decisions/DEC-20261021-01-merge-records-and-m20-rulings.md does not exist, and under docs/ the identifier DEC-20261021-01 appears nowhere. Any use is a stop.
5. Check the facts the act cites, quote what you rely on, and stop if any is false:
   - for each pull request in the table of A2, gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq "[.merged,.merge_commit_sha,.merged_by.login]|@tsv" prints true, the merge commit and the account the table gives; that commit has exactly one parent; git log -1 --format=%B on it contains the Actor-Id and Execution-Surface lines the table gives; and .github/scripts/attribution-shape-check.sh main on it fails;
   - .github/scripts/attribution-shape-check.sh main passes on the merge commits of pull requests 168, 173 and 182;
   - comment 6304280822 on pull request 180 contains 7d10bb314041625e0f5204c7f8a5cc52575b10fb, and pull request 180's head is 29467b717c1d315c5cd6406e7d2cc777c0b3cf9c;
   - no comment on pull request 181 contains the string MERGE AUTHORIZATION or the string Approved merge, and its head is f71fbe022b0e54e9a210b21d6c6ac010ced9d6b8;
   - packages/supervisor/test/preflight.test.ts on origin/main holds twenty-five top-level test calls, and test/phase3a/runtime-harness.ts on origin/main sets the envelope's repository from git rev-parse --path-format=absolute --git-common-dir.
6. gh api user --jq .login prints daley40-lab, with GH_TOKEN set as the session provides it. Do not run gh auth status, and never print a token or any part of one. Run gh normally. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. If this session has no agent identity, stop and report before any gh call.

ALLOWED SCOPE
One commit, exactly one path:
  docs/decisions/DEC-20261021-01-merge-records-and-m20-rulings.md (new, byte for byte from its transfer blob)
Before committing, git status --porcelain must list only that path.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting the act's signature or an Actor-Id from its table. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261021-01, merge records and the M20 rulings. The body says the Founder signed the act on 2026-10-21; that it records thirteen squash merges failing attribution on main and the merges of pull requests 180 and 181, leaves main's history unchanged, rules the merge-commit method and who merges, and files the rulings of the M20 corrections builder prompt; that the text comes from transfer commit 4c27933bbd55dfa3a5110c42f393b394fc99aa26; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261021-01-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 182 with gh api repos/MADVenturesLLC/madventures-tui/pulls/182 --jq .body and mirror its structure: what and why, the path changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261021-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not change any repository setting or ruleset, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, a hash, line count or byte count differs, the transfer commit or blob is missing, main has moved outside precondition 1, the identifier is already used under docs/, any fact in precondition 5 is false, any path other than the one would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, and the preconditions, each result with full SHAs, hashes, line and byte counts.
2. The commit: full 40-character SHA, the one path, the diff stat, and the cmp result.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
