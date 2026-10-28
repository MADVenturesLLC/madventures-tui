STEP: file DEC-20261028-02 (M23 and M24 as one build, and pull request 200 withdrawn). Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261028-02-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261028-02-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261028-02-filing. Then run gh api user --jq .login. It must print daley40-lab. If either differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261028-02-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261028-M23-M24-SINGLE-BUILD (DEC-20261028-02) on 2026-10-28. It withdraws the act carried by pull request 200, authorizes plan Tasks 51 to 55 as one build with one Tier-2 review, and, under its C2, adds two lines to AGENTS.md that tell FounderOS DEC-20261027-01 apart from this repository's DEC-20261027-01. Its C1 says this filing changes nothing else.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the act after git fetch origin claude/awesome-cray-vqrzbt, from the latest commit of origin/claude/awesome-cray-vqrzbt that touches transfer/DEC-20261028-02-m23-m24-single-build.md, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- transfer/DEC-20261028-02-m23-m24-single-build.md; report that commit. Read it in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 6a2d16506be3efa179d97be82df7f9d3036c911b, the merge of pull request 203, or a descendant whose changes since that commit touch neither AGENTS.md nor any path under docs/decisions/, packages/, apps/ or test/. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261028-02-filing must not exist on origin.
2. The act has SHA-256 0eedf3e448fd999694a082267fbf5990083ad00afbe6dfb91ec9e823b5f26c82, 177 lines, 13,165 bytes. If any value differs, stop.
3. Check the act with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero square brackets; zero bare three-hyphen lines; zero runs of two or more underscores; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals.
4. On origin/main the file docs/decisions/DEC-20261028-02-m23-m24-single-build.md does not exist, and under docs/ the identifier DEC-20261028-02 appears nowhere. Any use is a stop.
5. In AGENTS.md on origin/main, the line below, without the marker lines, occurs exactly once as a whole line; check it with grep -c -F -x and report the count and its line number. It begins with two spaces.
BEGIN ANCHOR LINE
  milestone authorization under FounderOS `DEC-20261027-01` naming that head.
END ANCHOR LINE
6. Check the facts the act's Part A cites, and stop if any is false. With gh api, read-only: pull request 200 has head bc615df755c1fbf5fd06ed9e4f057193f4aecf28, was opened by daley40-lab, is not merged, and adds exactly the one file docs/decisions/ISSUED-FOUNDER-ACT-20261027-M23-M26-ONE-SHOT-BUILD.md; issue comment 6451963146 exists on it; pull request 157 is merged; and pull request 203 is merged with merge commit 6a2d16506be3efa179d97be82df7f9d3036c911b. Report pull request 200's state and closed_at as you find them; its state is not a stop.

ALLOWED SCOPE
One commit, exactly two paths:
  docs/decisions/DEC-20261028-02-m23-m24-single-build.md (new, byte for byte from its transfer blob)
  AGENTS.md (modified only by inserting the two lines of THE AGENTS.MD LINES immediately after the anchor line of precondition 5)
Before committing, git status --porcelain must list only those two paths.

THE AGENTS.MD LINES
Insert the two lines between the marker lines below, without the marker lines, immediately after the anchor line. Each begins with two spaces and ends with a newline. Change no other byte of the file. Then show git diff of AGENTS.md and confirm that it adds exactly two lines, removes none, and that the lines before and after them are unchanged.
BEGIN AGENTS.MD LINES
  That FounderOS act is not this repository's `DEC-20261027-01`; a milestone
  authorization here is a Founder act filed under `docs/decisions/`.
END AGENTS.MD LINES

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting the act's signature or its trailer rule in B3. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261028-02, M23 and M24 single build. The body says the Founder signed the act on 2026-10-28; that it withdraws the act carried by pull request 200 and authorizes plan Tasks 51 to 55 as one build with one Tier-2 review; that it adds two lines to AGENTS.md under its C2, distinguishing FounderOS DEC-20261027-01 from this repository's; that the act's text comes from the transfer commit you reported; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261028-02-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 203 with gh api repos/MADVenturesLLC/madventures-tui/pulls/203 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. State that AGENTS.md is a governance path, so this pull request merges only on a merge authorization the Founder signs. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261028-02-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, including pull request 200, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, gh is not daley40-lab, a hash, line count or byte count differs, the transfer commit or blob is missing, main has moved outside precondition 1, the identifier is already used under docs/, the anchor line does not occur exactly once, any fact in precondition 6 is false, AGENTS.md would change other than by the two inserted lines, any path other than the two would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, and the preconditions, each result with full SHAs, hashes, line and byte counts.
2. The commit: full 40-character SHA, the two paths, the diff stat, the cmp result, and the git diff of AGENTS.md.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
