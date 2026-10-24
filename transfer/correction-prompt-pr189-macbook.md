STEP: correct DEC-20261023-01 on pull request 189 after review. Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the clone /Users/michaeldaley/madventures-tui-dec-20261023-01-filing that filed pull request 189.

You are the correction session for pull request 189 in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one new commit on the existing branch docs/dec-20261023-01-filing, on top of its current head, and replace the pull request description.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261023-01-filing. Then run gh api user --jq .login. It must print daley40-lab. If either differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261023-01-filing-r2
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the new pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
Copilot reviewed head bb653a016a699dd144ab063d6f9af072311b4909 of pull request 189 in review 5635228116 and left one thread, comment 4364854314, on docs/decisions/DEC-20261023-01-standing-build-rules.md: that B6 requires every run's full output in a tee log while B2 requires a session to stop without repeating a secret, so a leaking test would leave the value in the required log. Its summary also says the stabilization build covers only one of the test files that run doctor, and reads C6 as assigning a GitHub operation to the builder. The first two points are correct: apps/madbridge/test/cli.test.ts also runs doctor. On the third, the builder only saves a file. The Founder has signed a corrected text of the act that changes only A5 item 1, B6, C6, D1, D2 item 1 and D3; its Status, other rulings, date and signature are unchanged, and AGENTS.md does not change.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the corrected act after git fetch origin claude/awesome-cray-vqrzbt, from the latest commit of origin/claude/awesome-cray-vqrzbt that touches transfer/DEC-20261023-01-standing-build-rules.md, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- transfer/DEC-20261023-01-standing-build-rules.md; report that commit. Read the act in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main docs/dec-20261023-01-filing. origin/main is 942c225bb3d4c772ad68c9cac2a7d494655758b9, or a descendant whose changes since it touch no path under docs/decisions/ and not AGENTS.md; report every changed path. origin/docs/dec-20261023-01-filing is bb653a016a699dd144ab063d6f9af072311b4909. gh api repos/MADVenturesLLC/madventures-tui/pulls/189 --jq "[.state,.draft,.head.sha]|@tsv" prints open, false and that head. Check out the branch at that head; the working tree is clean.
2. The corrected act has SHA-256 bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5, 123 lines, 17,847 bytes. If any value differs, stop.
3. Check the corrected act with grep and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero square brackets; zero bare three-hyphen lines; zero runs of two or more underscores; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals.
4. On the branch head, docs/decisions/DEC-20261023-01-standing-build-rules.md has SHA-256 71f8d898ea7eaea1a29403306473c7baed6cf6794a76cf92ef1ea58a2956c574.
5. git diff --no-index between the committed act and the corrected act changes only lines in A5 item 1, B6, C6, D1, D2 item 1 and D3. Quote the diff.

ALLOWED SCOPE
One new commit on top of bb653a016a699dd144ab063d6f9af072311b4909 that changes exactly one path:
  docs/decisions/DEC-20261023-01-standing-build-rules.md (replaced byte for byte by the corrected act)
Do not amend or rebase the existing commit. Before committing, git status --porcelain must list only that path.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the new pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. The act names trailers inside its prose; never quote one at the start of a line. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or update the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: correct DEC-20261023-01 after review. The body says that the Founder signed a corrected text of the act on 2026-10-23 after Copilot review 5635228116 and its comment 4364854314; that B6 now stops a session that sees a secret value in its output and has the Founder delete that log, that the stabilization build of Part D now also covers the doctor tests of apps/madbridge/test/cli.test.ts, and that C6 now says the builder saves its description as a file and makes no GitHub call; that the text comes from the transfer commit you reported; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against its transfer blob, and report that the bytes match.
- Push with git push origin docs/dec-20261023-01-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared body to a file under /tmp.
- Write a new pull request body covering both commits. Start from the current body, read with gh api repos/MADVenturesLLC/madventures-tui/pulls/189 --jq .body, and keep its structure. Change only what the correction makes false or adds: the act's SHA-256, line and byte counts and transfer commit; the commit list, which now names both commits by full SHA, and the diff stat against 942c225bb3d4c772ad68c9cac2a7d494655758b9; and under Deviations, one entry recording Copilot review 5635228116 and comment 4364854314, what each point said, which the Founder found correct, and that the Founder signed the corrected text. Report that AGENTS.md still has SHA-256 1e8690d73fd817f2679b949568aaf749a25f22ebcd5c8e640767e9bc09a703d4. Keep the three trailers as the final paragraph, with your Actor-Id. Check that the body has zero bare three-hyphen lines and zero square brackets. Replace the body with gh api -X PATCH repos/MADVenturesLLC/madventures-tui/pulls/189 -F body=@file. Then fetch it back and report its SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/189 --jq .body | shasum -a 256.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the new body, and report both results.
- Do not change the draft state, do not merge, do not re-run any job, do not touch any other pull request, do not resolve or reply to any review thread, do not post any authorization, and post no comment of your own.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, gh is not daley40-lab, a hash, line count or byte count differs, the transfer commit or blob is missing, main or the branch has moved, the diff of precondition 5 touches anything else, any path other than the one would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, and the preconditions, each result with full SHAs, hashes, line and byte counts, and the quoted diff.
2. The commit: full 40-character SHA, its parent, the one path, the cmp result, and the diff stat of the branch against 942c225bb3d4c772ad68c9cac2a7d494655758b9.
3. The attribution-shaped-line check on the commit message and on the new body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. Pull request 189: its head SHA, state, draft flag, the checks that have started, the count of square brackets in the body, and the body's SHA-256 fetched back.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: the merge authorization for the new head.
