STEP: file DEC-20261103-02 (Task 57, the Claude Code investigation). Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261103-02-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261103-02-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261103-02-filing. Then run gh api user --jq .login. It must print daley40-lab. Then run git config user.name and git config user.email; they must print daley40-lab and 293512385+daley40-lab@users.noreply.github.com. If any differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. Run no process-listing command. Use no MCP server and start no other agent.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261103-02-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261103-TASK57-CLAUDE-CODE-INVESTIGATION (DEC-20261103-02) on 2026-11-03. It names the Founder's list of surfaces for plan Task 57 as claude-code alone, rules on the Claude Code version on the Founder's MacBook under DEC-20261013-05 B2, fixes how overall is composed in every capability record, authorizes Task 57 on the MacBook, and corrects A2 item 2 and amends B8 of DEC-20261103-01. Its F1 requires one docs-only pull request that files the act and changes nothing else.

AUTHORITY
Read AGENTS.md first, including its merge bullet as DEC-20261031-01 amended it. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the act after git fetch origin claude/awesome-cray-vqrzbt, from the latest commit of origin/claude/awesome-cray-vqrzbt that touches transfer/DEC-20261103-02-task57-claude-code-investigation.md, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- transfer/DEC-20261103-02-task57-claude-code-investigation.md; report that commit. Read it in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 6010de734d82ddebfc68ba0d75c8d4b65ec0e095, the merge of pull request 216, or a descendant whose changes since that commit touch no path under docs/decisions/, docs/verification/2026-08-12-surface-investigation-, packages/protocol/ or test/phase3a/evidence-pipeline.test.ts, and add no file whose name begins DEC-20261103-02. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261103-02-filing must not exist on origin.
2. The act has SHA-256 387a6604ecba3b84d06d40586875f8d005876a89eb6a6f7a03beb4fccc3d1442, 350 lines, 32,650 bytes. If any value differs, stop.
3. Check the act with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); exactly 8 square-bracket characters, all on lines 122, 146 and 220 and each inside a backtick code span; zero bare three-hyphen lines; zero runs of two or more underscores; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals.
4. On origin/main the file docs/decisions/DEC-20261103-02-task57-claude-code-investigation.md does not exist, and under docs/ the identifier DEC-20261103-02 appears nowhere. Any use is a stop.
5. Check the facts the act's Part A and B14 cite, and stop if any is false. With gh api and git, read-only:
   a. Pull request 157 is merged with merge commit 911d44aa18a7ba5b332d469683faae22d29e3b73, whose second parent, read with gh api repos/MADVenturesLLC/madventures-tui/git/commits/SHA, is d4a1d679f64464523b24a54deae3baa1bd7b0500.
   b. Pull request 216 is merged with merge commit 6010de734d82ddebfc68ba0d75c8d4b65ec0e095, whose second parent is ea706c669f14046eecda02d41125179a3cd6d032.
   c. Issue comment 6604818148 exists on pull request 216, was posted by decivantiq, has a first line that begins MERGE AUTHORIZATION, and contains the words "the next act I sign corrects its words".
   d. Issue comment 6595656310 exists on pull request 215, was posted by decivantiq, and contains the strings requestedDelayMs, [200, 250] and elapsedMs >= 250 (as gh api prints the body, the characters may appear escaped).
   e. Read packages/broker/test/acknowledgement-deadline.test.ts at commit 6010de734d82ddebfc68ba0d75c8d4b65ec0e095 with git show, not from the working tree. Report lines 42, 43 and 47; they must contain toBeGreaterThan(0), toBeLessThanOrEqual(250) and expect(firedMs).toBeLessThan(250). Report the count of lines containing elapsedMs, requestedDelayMs or 200; it must be 0.
   f. In packages/protocol/src/adapter-registry.ts on origin/main, quote the supported_versions line of the claude-code registration; it must be supported_versions: ["2.1.296"],
   g. On origin/main no file under docs/verification/ has a name that begins 2026-08-12-surface-investigation-.

ALLOWED SCOPE
One commit, exactly one path:
  docs/decisions/DEC-20261103-02-task57-claude-code-investigation.md (new, byte for byte from its transfer blob)
Before committing, git status --porcelain must list only that path.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting the act's signature or its trailer block in E1. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261103-02, Task 57 Claude Code investigation. The body says the Founder signed the act on 2026-11-03; that it names claude-code as the Founder's only surface for Task 57, rules on the Claude Code version on the MacBook, fixes how overall is composed in every capability record, authorizes Task 57 on the MacBook, and corrects A2 item 2 and amends B8 of DEC-20261103-01; that the act's text comes from the transfer commit you reported; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261103-02-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 216 with gh api repos/MADVenturesLLC/madventures-tui/pulls/216 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261103-02-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link, and describe the act's JSON values in words rather than quoting them.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, gh is not daley40-lab, the git identity differs, a hash, line count or byte count differs, the transfer commit or blob is missing, main has moved outside precondition 1, the identifier is already used under docs/, any fact in precondition 5 is false, any path other than the one would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, the git identity, and the preconditions, each result with full SHAs, hashes, line and byte counts.
2. The commit: full 40-character SHA, the one path, the diff stat and the cmp result.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
