STEP: file DEC-20261106-01. Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261106-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261106-01-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261106-01-filing. Then run gh api user --jq .login. It must print daley40-lab. Then run git config user.name and git config user.email; they must print daley40-lab and 293512385+daley40-lab@users.noreply.github.com. If any differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. Run no process-listing command. Use no MCP server and start no other agent. Read nothing outside your own clone other than what this prompt names, and run no test.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261106-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261106-PHASE-3A-TASK-59 (DEC-20261106-01) on 2026-11-06. It records the merge of pull request 226, closes with no change the point on export-evidence --session that DEC-20261102-04 B2 item 4 carried to it, and authorizes plan Task 59, reading its plan text for two hosts and for main as it is. Its C1 has one docs-only pull request file the act and change nothing else. Its C2 lets Task 59's build start only after that pull request's merge is on main.

AUTHORITY
Read AGENTS.md first, including its merge bullet as DEC-20261031-01 amended it, and B8 of docs/decisions/DEC-20261102-02-hardening-builds.md, which lets a filing session the Founder names push its branch and open its draft pull request as daley40-lab. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. After git fetch origin claude/awesome-cray-vqrzbt, read the act from the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- PATH, and report that commit:
- DEC-20261106-01: transfer/DEC-20261106-01-task59-merge-gate.md, at transfer commit 2d1e50f6c2aa7cf6c97ff453e230059fb16ebb23
Read it in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be a2f0b7e4afc36100205ea571d1c0a91b7c319480, the merge of pull request 226, or a descendant whose changes since that commit touch no path under docs/decisions/. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261106-01-filing must not exist on origin.
2. The act has SHA-256 5995deb72921a8e4f07b1f4ff3a1efa0442c1dcadd66bc2231b43ed77f8722f1, 168 lines and 17,977 bytes. If any value differs, stop.
3. Check the act with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero bare three-hyphen lines; zero runs of two or more underscores; zero lines ending in a space; zero square brackets; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals.
4. On origin/main the target path of ALLOWED SCOPE does not exist, and under docs/ the string DEC-20261106-01 appears nowhere. Any use is a stop.
5. Check the facts the act's Part A cites, and stop if any is false. With gh api and git, read-only. Run every git command of this item with GIT_CONFIG_GLOBAL=/dev/null and GIT_CONFIG_NOSYSTEM=1 set for that command:
   a. Pull request 226 is merged with merge commit a2f0b7e4afc36100205ea571d1c0a91b7c319480, whose parents, read with gh api repos/MADVenturesLLC/madventures-tui/git/commits/SHA, are 8095767f51c2ca3dc098f5bfc9ccf519a85a2369 and, second, 822702fce1b53d12994bdac6cbc37a18fb4cbbcc. Issue comment 6672984339 exists on it, was posted by decivantiq, and its first line is MERGE AUTHORIZATION: MADVenturesLLC/madventures-tui#226.
   b. Run 42135237903 has head_sha a2f0b7e4afc36100205ea571d1c0a91b7c319480, event push and conclusion success.
   c. git diff --name-only ffcecaf9dbb6b2de3b406e475825137ddfe726b7 a2f0b7e4afc36100205ea571d1c0a91b7c319480 lists exactly these ten paths, and no other: the six files docs/decisions/DEC-20261104-02-addendum-1-grace-interval.md, docs/decisions/DEC-20261104-02-addendum-2-fact-arrival-times.md, docs/decisions/DEC-20261104-02-addendum-3-certification-runs.md, docs/decisions/DEC-20261104-02-addendum-4-pr225-reviews.md, docs/decisions/DEC-20261105-01-hardening-f-records-and-addenda.md and docs/decisions/DEC-20261105-02-task58-records-and-filing.md; docs/verification/2026-08-12-phase-3a-host-certification-macbook.md; docs/verification/2026-08-12-phase-3a-host-certification-ubuntu.md; docs/verification/phase-3a-correction-rounds.md; and test/phase3a/evidence-pipeline.test.ts.
   d. git diff --check aa16032c56fdf6c7105e99b1765ed9365d605bf4 a2f0b7e4afc36100205ea571d1c0a91b7c319480, with its output written to a file under /tmp, exits 2, and that file has 33 lines and SHA-256 fe33892c34b87319d59b7f0562373aa2d188cc2a5565a0e0e2daed19f72d6438. Report the exit status, the line count, the byte count and the SHA-256, and do not quote the lines.
   e. git diff --name-only aa16032c56fdf6c7105e99b1765ed9365d605bf4 a2f0b7e4afc36100205ea571d1c0a91b7c319480 lists 578 paths, among them at least one under each of packages/honesty-compiler/, apps/seal-studio/ and apps/projector-mc/.
   f. At a2f0b7e4afc36100205ea571d1c0a91b7c319480, read with git show and quoted with line numbers: line 69 of apps/madbridge/src/commands/export-evidence.ts calls resolveEvidencePaths; line 114 of that file opens the ledger with new Ledger(ledgerPath); lines 38 to 41 of apps/madbridge/src/commands/verify-ledger.ts call validateStorageRoot on dirname(ledgerPath) when sessionDir is defined and flags ledger is not a string; and lines 731 to 734 of test/phase3a/evidence-pipeline.test.ts loop over export-evidence with the ledger subdirectory and over the faults group-accessible and symbolic link, and name each test with the template that yields export-evidence --session rejects a group-accessible ledger subdirectory and export-evidence --session rejects a symbolic link ledger subdirectory.
   g. In each of docs/verification/2026-08-12-phase-3a-host-certification-macbook.md and docs/verification/2026-08-12-phase-3a-host-certification-ubuntu.md at a2f0b7e4afc36100205ea571d1c0a91b7c319480, quote the table row whose command cell is bun test alone. The MacBook's row records 1902 pass, 0 fail, 20141 expect() calls and Ran 1902 tests across 140 files; the Ubuntu PC's records 1902 pass, 0 fail, 20148 expect() calls and Ran 1902 tests across 140 files.
   h. In docs/decisions/DEC-20261102-04-hardening-records-and-hardening-c.md, quote B4, which closes item 18 with no build and says every other item of DEC-20261102-01 B1 has merged in pull request 211 or 213; and quote B2 item 4, which carries the point on export-evidence --session to the act that authorizes Task 59.

ALLOWED SCOPE
One commit, exactly one path:
  docs/decisions/DEC-20261106-01-task59-merge-gate.md (new, byte for byte from its transfer blob)
Before committing, git status --porcelain must list only that path. Do not change docs/verification/phase-3a-correction-rounds.md or any other file.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting the act's signature or its trailer block. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261106-01, the Task 59 act. The body says the Founder signed the act on 2026-11-06; that it records the merge of pull request 226, closes the carried point on export-evidence --session with no change, and authorizes plan Task 59; that under its C2 Task 59's build starts only after this pull request's merge is on main; that the text comes from the transfer commit you reported; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed text against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261106-01-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 226 with gh api repos/MADVenturesLLC/madventures-tui/pulls/226 --jq .body and mirror its structure: what and why, the path changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261106-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link, and do not write the Copilot reviewer's login in the body.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results. If you edit the body after a prbody check, run the check again on the edited body and report both runs.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, gh is not daley40-lab, the git identity differs, a hash, line count or byte count differs, the transfer commit or blob is missing, main has moved outside precondition 1, the identifier or file name is already used under docs/, any fact in precondition 5 is false, any path other than the one of ALLOWED SCOPE would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, the git identity, and the preconditions, each result with full SHAs, hashes, line and byte counts, and every quoted line.
2. The commit: full 40-character SHA, the path, the diff stat, and the cmp result.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
