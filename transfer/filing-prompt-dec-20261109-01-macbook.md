STEP: file DEC-20261109-01, its Addendum 1, and Addendum 1 to DEC-20261108-04. Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261109-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for three Founder texts in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261109-01-filing and open one draft pull request. You build no slice.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261109-01-filing. Then run gh api user --jq .login. It must print daley40-lab. Then run git config user.name and git config user.email; they must print daley40-lab and 293512385+daley40-lab@users.noreply.github.com. Then run git remote get-url origin; it must be an https URL, not an SSH one. If any differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. Run no process-listing command. Use no MCP server and start no other agent. Read nothing outside your own clone other than what this prompt names, and run no test.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261109-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261109-HERMES-IN-REPOSITORY (DEC-20261109-01) and its Addendum 1, and Addendum 1 to DEC-20261108-04, on 2026-11-09. DEC-20261109-01 with its Addendum 1 limits Hermes in this repository to drafts, keeps the Founder's decivantiq identity his own, drops the Hermes check of his guarded commands, and rules on the filing of pull request 232. Addendum 1 to DEC-20261108-04 corrects the Phase 3B standing commission. B8 of that addendum has one docs-only pull request, filed by a Claude Code filing session, file all three texts, each unchanged, and change nothing else, before H2 starts. None of the three authorizes a build or a live call.

AUTHORITY
Read AGENTS.md first, including its merge bullet as DEC-20261031-01 amended it, and B8 of docs/decisions/DEC-20261102-02-hardening-builds.md, which lets a filing session the Founder names push its branch and open its draft pull request as daley40-lab. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. After git fetch origin claude/awesome-cray-vqrzbt, read each text from the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- PATH, and report each commit:
- DEC-20261109-01: transfer/DEC-20261109-01-hermes-in-repository.md, at transfer commit 0a2794238c28490540532cdf8da024cfaac7690e
- its Addendum 1: transfer/DEC-20261109-01-addendum-1-corrections.md, at transfer commit edbf2c34a71b8442853a2246117253b3333985d7
- Addendum 1 to DEC-20261108-04: transfer/DEC-20261108-04-addendum-1-corrections.md, at transfer commit edbf2c34a71b8442853a2246117253b3333985d7
Read all three in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be a3d1590bb97b258e2f8d40affa33b9b54a1817e6, the merge of pull request 232, or a descendant whose changes since that commit touch no path under docs/decisions/. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261109-01-filing must not exist on origin.
2. Each text has this SHA-256, line count and byte count; if any value differs, stop:
   DEC-20261109-01: 756802b945f373056cc5ad6f5f78ae0fa673c8e8bf39fada0cce2b566e49af84, 48 lines, 4,762 bytes.
   Its Addendum 1: 12e1bb28e0d241993cfe0b919c3b7021540b8780a83bc0035565bf7c0e9cbd62, 38 lines, 3,108 bytes.
   Addendum 1 to DEC-20261108-04: 90e2f541fd0a232390ca0554067a2de8b37f15c933016eafe40ebde2cd2eff17, 48 lines, 4,646 bytes.
3. Check each text with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero bare three-hyphen lines; zero lines ending in a space; zero square brackets; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals. Runs of two or more underscores: zero in the first two texts; in Addendum 1 to DEC-20261108-04 exactly one line holds such a run, and that run is part of the tool namespace name mcp__codex_tui; report that line.
4. On origin/main none of the three file names of ALLOWED SCOPE exists, and under docs/ none of the strings DEC-20261109-01, "DEC-20261108-04 ADDENDUM 1" or "DEC-20261108-04 Addendum 1" appears. Any use is a stop.
5. Check the facts the texts' Part A cite, and stop if any is false. Read-only, with gh api, git and shasum. Run every git command of this item with GIT_CONFIG_GLOBAL=/dev/null and GIT_CONFIG_NOSYSTEM=1 set for that command:
   a. Pull request 232 is merged with merge commit a3d1590bb97b258e2f8d40affa33b9b54a1817e6, whose parents, read with gh api repos/MADVenturesLLC/madventures-tui/git/commits/SHA, are 1678f1839c600cacd38fd426f755afae021861bf and, second, 5c803a8ceeffdf318dc2f94e7ee637f2f531f0c9. git diff --name-only 1678f1839c600cacd38fd426f755afae021861bf a3d1590bb97b258e2f8d40affa33b9b54a1817e6 lists exactly docs/decisions/DEC-20261108-04-phase-3b-standing-commission.md.
   b. Commit 5c803a8ceeffdf318dc2f94e7ee637f2f531f0c9 has author and committer daley40-lab, and its message has the trailer Actor-Id: session:hermes-local-code/tui-dec-20261108-04-filing.
   c. The timeline of pull request 232, read with gh api repos/MADVenturesLLC/madventures-tui/issues/232/timeline, has a ready_for_review event by daley40-lab at 2026-11-09T03:27:48Z. Issue comment 6731549820 on it was posted by decivantiq at 2026-11-09T03:30:31Z; report only its author and time, and quote nothing else from it.
   d. At a3d1590bb97b258e2f8d40affa33b9b54a1817e6, quote with line numbers from docs/decisions/DEC-20261108-04-phase-3b-standing-commission.md: the line of A3 that says it rules no plan section 5 item that DEC-20261108-01 B13 assigns to M0's act; the first line of B7; the line of B6 that allows no other live call except the auth-readiness probe; the line of B3 item 1 that asks for a session with no MCP server; the line of B1 that says no further Founder act issues to start a slice; the line of Part D that begins Nothing else stops a slice; and the line of F2 that says B1 binds the slices whether or not the pull request of F1 has merged.
   e. Quote with line numbers: item 5 of B13 of docs/decisions/DEC-20261108-01-phase-3b-approval.md; B3 of docs/decisions/DEC-20261015-05-phase-3a-process.md, which says every act is on main before any task it governs starts; and B5 item 2 of docs/decisions/DEC-20261102-02-hardening-builds.md.
   The facts in A2 of Addendum 1 to DEC-20261109-01, and the worktree in A3 of DEC-20261109-01, rest on reports to the Founder that this repository cannot show; report them as not checked.

ALLOWED SCOPE
One commit, exactly three paths, each new and byte for byte from its transfer blob:
  docs/decisions/DEC-20261109-01-hermes-in-repository.md
  docs/decisions/DEC-20261109-01-addendum-1-corrections.md
  docs/decisions/DEC-20261108-04-addendum-1-corrections.md
Before committing, git status --porcelain must list only those three paths. Do not change docs/decisions/DEC-20261108-04-phase-3b-standing-commission.md, docs/verification/phase-3a-correction-rounds.md or any other file.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting an act's signature or the Actor-Id of the session that filed pull request 232. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261109-01, its Addendum 1, and Addendum 1 to DEC-20261108-04. The body says the Founder signed the three texts on 2026-11-09; that DEC-20261109-01 with its Addendum 1 limits Hermes in this repository to drafts, keeps the Founder's identity his own, drops the Hermes check of his guarded commands and rules on the filing of pull request 232; that Addendum 1 to DEC-20261108-04 corrects the standing commission, and under its B8 this one pull request files all three unchanged and merges before H2 starts; that the three texts come from the transfer commits you reported; that none authorizes a build or a live call; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp each of the three committed files against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261109-01-filing over the https remote. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 231 with gh api repos/MADVenturesLLC/madventures-tui/pulls/231 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261109-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link, and do not write the Copilot reviewer's login in the body.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results. If you edit the body after a prbody check, run the check again on the edited body and report both runs.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not request any review, do not touch any other pull request, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, gh is not daley40-lab, the git identity differs, the origin remote is not https, a hash, line count or byte count differs, a transfer commit or blob is missing, main has moved outside precondition 1, an identifier or file name is already used under docs/, any fact in precondition 5 is false, any path other than the three of ALLOWED SCOPE would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, the git identity, the origin remote's scheme, and the preconditions, each result with full SHAs, hashes, line and byte counts, and every quoted line.
2. The commit: full 40-character SHA, the three paths, the diff stat, and the three cmp results.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
