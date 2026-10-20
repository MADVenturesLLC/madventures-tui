STEP: correct DEC-20261020-01 on pull request 182 after review. Paste this as the first message of a new Claude Code session started on the Founder's MacBook, after loading the agent environment file the launcher uses, from inside the clone /Users/michaeldaley/madventures-tui-dec-20261020-01-filing that filed pull request 182.

You are the correction session for pull request 182 in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one new commit on the existing branch docs/dec-20261020-01-filing, on top of its current head, and replace the pull request description.

FIRST: YOUR WORKING DIRECTORY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261020-01-filing. If it is not, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else; do not work in another directory.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261020-01-filing-r2
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the new pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
Copilot reviewed head f695d05349b47ec25cddb935b190cc1bd05e7a8e of pull request 182 and left two comments on docs/decisions/DEC-20261020-01-phase-3a-order-and-records.md. Comment 4330863517 says A4 abbreviates the merge commit of pull request 177, which AGENTS.md forbids. Comment 4330863465 says the first sentence of A5 names pull requests 155 and 157 as inside a range, 162 through 179, that cannot contain them. Both are correct. The Founder has signed a corrected text of the act that changes only those two sentences; its Status, rulings, date and signature are otherwise unchanged. The rounds-log entries are not changed.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the corrected act after git fetch origin claude/awesome-cray-vqrzbt, from the latest commit of origin/claude/awesome-cray-vqrzbt that touches transfer/DEC-20261020-01-phase-3a-order-and-records.md, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- transfer/DEC-20261020-01-phase-3a-order-and-records.md; report that commit. Read the act in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main docs/dec-20261020-01-filing. origin/main is 1bd41aeb58a12acfc0aae583ffecab80cd7eb0ea. origin/docs/dec-20261020-01-filing is f695d05349b47ec25cddb935b190cc1bd05e7a8e. gh api repos/MADVenturesLLC/madventures-tui/pulls/182 --jq "[.state,.draft,.head.sha]|@tsv" prints open, false and that head. Check out the branch at that head; the working tree is clean.
2. The corrected act has SHA-256 e5299202a83ad37e11fd619231422b41fc43779308531b62ae6a5cf06ee3c6b7, 68 lines, 8,250 bytes. If any value differs, stop.
3. The corrected act has Status ISSUED and the signature (Michael Daley, a Date, and the founder Actor-Id line); no square bracket, no bare three-hyphen line, no run of underscores, none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed", and the word DRAFT nowhere in capitals.
4. On the branch head, docs/decisions/DEC-20261020-01-phase-3a-order-and-records.md has SHA-256 6490b51692dcf5ab231c9ec0c629f9dd71ae9cc719c51623a064882079b077e7, and docs/verification/phase-3a-correction-rounds.md has SHA-256 965cc47a3c9a705d5a1a86feb07b1d3d61c55369bd1be04d947b7dda7299e872.
5. git diff --no-index between the committed act and the corrected act changes exactly two lines, 18 and 20: in line 18 the only change is the merge commit of pull request 177 written out in full; line 20 changes only in its first two sentences. Quote the diff. Then check the facts the corrected lines state, and stop if any is false:
   - gh api repos/MADVenturesLLC/madventures-tui/pulls/177 --jq .merge_commit_sha prints 93ad948429671b17b581f5a3887120bbcde8e379;
   - for N in 155, 157 and 162 through 179, gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .merged prints true.
6. gh api user --jq .login prints daley40-lab, with GH_TOKEN set as the session provides it. Do not run gh auth status, and never print a token or any part of one. Run gh normally. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. If this session has no agent identity, stop and report before any commit.

ALLOWED SCOPE
One new commit on top of f695d05349b47ec25cddb935b190cc1bd05e7a8e that changes exactly one path:
  docs/decisions/DEC-20261020-01-phase-3a-order-and-records.md (replaced byte for byte by the corrected act)
Do not amend or rebase the existing commit. Before committing, git status --porcelain must list only that path. The rounds log stays byte-identical.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the new pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or update the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: correct DEC-20261020-01 A4 and A5 after review. The body says that the Founder signed a corrected text of the act on 2026-10-20 after Copilot review comments 4330863517 and 4330863465; that A4 now names the merge commit of pull request 177 in full and that A5 now states the pull requests without a posted merge authorization as 155, 157 and 162 through 179; that the text comes from the transfer commit you reported; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against its transfer blob, and report that the bytes match.
- Push with git push origin docs/dec-20261020-01-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared body to a file under /tmp.
- Write a new pull request body covering both commits. Start from the current body, read with gh api repos/MADVenturesLLC/madventures-tui/pulls/182 --jq .body, and keep its structure. Change only what the correction makes false or adds: the act's SHA-256, line and byte counts and transfer commit; the commit list, which now names both commits by full SHA, the diff stat against 1bd41aeb58a12acfc0aae583ffecab80cd7eb0ea, and the paths; the sentence in precondition 5 about the merge commit of pull request 177, which now says the act names it in full; and under Deviations, one entry recording the two Copilot comments by id, what each said, and that the Founder signed the corrected text. Keep the three trailers as the final paragraph, with your Actor-Id. Check that the body has zero bare three-hyphen lines and zero square brackets. Replace the body with gh api -X PATCH repos/MADVenturesLLC/madventures-tui/pulls/182 -F body=@file. Then fetch it back and report its SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/182 --jq .body | shasum -a 256.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the new body, and report both results.
- Do not change the draft state, do not merge, do not re-run any job, do not touch any other pull request, do not resolve or reply to any review thread, do not post any authorization, and post no comment of your own.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, a hash, line count or byte count differs, the transfer commit or blob is missing, main or the branch has moved, the diff of precondition 5 is not exactly as stated, a fact in precondition 5 is false, any path other than the one would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, and the preconditions, each result with full SHAs, hashes, line and byte counts, and the quoted diff.
2. The commit: full 40-character SHA, its parent, the one path, the cmp result, and the diff stat of the branch against 1bd41aeb58a12acfc0aae583ffecab80cd7eb0ea.
3. The attribution-shaped-line check on the commit message and on the new body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. Pull request 182: its head SHA, state, draft flag, the checks that have started, the count of square brackets in the body, and the body's SHA-256 fetched back.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: the merge authorization for the new head.
