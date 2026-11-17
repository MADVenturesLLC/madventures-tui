STEP: file DEC-20261117-01, the Linux certification runtime after Bun pull request 40304 closed as stale, with the patch it ratifies. Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261117-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. The change files the act and applies one ratified patch to one CI action file. Land it as one commit on a branch named docs/dec-20261117-01-filing and open one draft pull request. You build no slice, and you change nothing in any other repository.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261117-01-filing. Then run gh api user --jq .login. It must print daley40-lab. Then run git config user.name and git config user.email; they must print daley40-lab and 293512385+daley40-lab@users.noreply.github.com. Then run git remote get-url origin; it must be an https URL, not an SSH one. If any differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. Run no process-listing command. Use no MCP server and start no other agent. Read nothing outside your own clone other than what this prompt names, fetch no web page, and run no test.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261117-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed DEC-20261117-01 on 2026-11-17. Bun pull request 40304, whose fix the custodied Linux Bun of DEC-20261013-03 carries, was closed unmerged as stale on 2026-11-17, and the expiry guard of .github/actions/setup-qualified-bun now fails every run of Verify, Verify (macOS), tui-chaos and code-review with EXPIRED. The act records that the expiry was correct, restores the custodied build as the Linux certification runtime from its signature, ends it again only if an official Bun release contains its revision, the guard cannot establish that, or the artifact fails its custody checks, rules that M0's Ubuntu Claude Code record stands, and ratifies a patch so that the guard's closed-unmerged case records a notice and continues instead of failing. Its B7 has one pull request, made by a Claude Code filing session, add the act unchanged and apply the patch, and change nothing else.

AUTHORITY
Read AGENTS.md first, including its merge bullet as DEC-20261031-01 amended it, and B8 of docs/decisions/DEC-20261102-02-hardening-builds.md, which lets a filing session the Founder names push its branch and open its draft pull request as daley40-lab. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. After git fetch origin claude/awesome-cray-vqrzbt, read each file below from the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- PATH, and report that commit. It must be the transfer commit named here; if it differs, stop:
- transfer/DEC-20261117-01-linux-runtime-after-pr40304.md, at transfer commit 0dc93dc41b71e80b67b6fed5ce2a279cee02c77d
- transfer/setup-qualified-bun-closed-stale.patch, at transfer commit 0dc93dc41b71e80b67b6fed5ce2a279cee02c77d
Read the act in full before you write anything. Install nothing and run no test: the change touches no code a test runs.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be cec21d0f98688b71bef43b3f350fbd14d6606030, the merge of pull request 244, or a descendant whose changes since that commit touch no path under docs/decisions/ or .github/. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261117-01-filing must not exist on origin.
2. The act has SHA-256 252afc6bf85fb92a43e9b33cbbf718103a3c6060bdd04ffab9e2885b43d8c721, 57 lines and 7,955 bytes. The patch has SHA-256 86c16c8c7d0f9e2868aca441b82815a33303eb8a03c0cf134105f0e59a7457cc and 908 bytes. If any value differs, stop.
3. Check the act with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, the Date 2026-11-17, and the founder Actor-Id line); zero bare three-hyphen lines; zero lines ending in a space; zero square brackets; zero runs of two or more underscores; none of the strings FOUNDER CHOICE, PENDING or "to be completed"; and the word DRAFT nowhere in capitals. It holds one section sign (U+00A7) and one em dash (U+2014), before the name in its signature, and no other character outside ASCII; keep each as that one character.
4. On origin/main docs/decisions/DEC-20261117-01-linux-runtime-after-pr40304.md does not exist, and the string DEC-20261117-01 appears nowhere under docs/ or .github/. Any use is a stop.
5. Check the facts Part A of the act cites, and stop if any is false. Read-only, with git and gh api. Run every git command of this item with GIT_CONFIG_GLOBAL=/dev/null and GIT_CONFIG_NOSYSTEM=1 set for that command.
   a. At cec21d0f98688b71bef43b3f350fbd14d6606030, quote with line numbers lines 99 to 103 and 108 to 119 of .github/actions/setup-qualified-bun/action.yml: the fetch of pull request 40304 and the case whose closed-unmerged branch prints EXPIRED and exits 1 (A1).
   b. At the same commit, quote with line numbers B2 item 2, B3, B4 and B6 of docs/decisions/DEC-20261013-03-tests-4-6-ruling.md (A1).
   c. gh api repos/oven-sh/bun/pulls/40304 --jq "{state, merged, closed_at}" prints state closed, merged false and closed_at 2026-11-17T07:49:13Z (A2). This is a public repository; read nothing else of it.
   d. gh api "repos/MADVenturesLLC/madventures-tui/commits/6da70bc5892f6d2ab27475afdc348b32835b3f7e/check-runs?per_page=100" --jq ".check_runs[] | {name, conclusion}" lists Verify, Verify (macOS), tui-chaos (ubuntu-24.04), tui-chaos (macOS) and code-review with conclusion failure; and the log of the Verify job, read with gh api repos/MADVenturesLLC/madventures-tui/actions/jobs/JOB_ID/logs and searched with grep, holds the line "EXPIRED: PR 40304 closed unmerged" (A3). Quote that line only.
   The facts that rest on the Founder's hosts, which are everything A4 records of the Founder's Ubuntu PC and the record run of A6, rest on the Founder's own checks; read none of them and report them as not checked.

ALLOWED SCOPE
One commit, exactly two paths:
  docs/decisions/DEC-20261117-01-linux-runtime-after-pr40304.md (new, byte for byte from its transfer blob)
  .github/actions/setup-qualified-bun/action.yml (changed only by the patch)
Before committing, git status --porcelain must list only those two paths. Do not change any other file.

APPLYING THE PATCH
Extract the patch to a temporary file outside the clone. Run git apply --check, then git apply. Do not edit any hunk and do not regenerate the patch. Afterwards .github/actions/setup-qualified-bun/action.yml has SHA-256 37cb25ba17eca50633bd08d54359921ddc0363b2e612c9d6d4da5b716eabd4c8 and 181 lines, and git diff shows only the one hunk of the patch: two lines removed and five added, in the closed-unmerged branch of the expiry guard. Show that diff in full. If git apply fails or any value differs, stop.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting the act's signature. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: ci: keep the custodied Linux Bun after its upstream fix closed stale, and file DEC-20261117-01. The body says the Founder signed DEC-20261117-01 on 2026-11-17; that Bun pull request 40304 closed unmerged as stale and the expiry guard then failed every Verify, tui-chaos and code-review run; that the act restores the custodied build as the Linux certification runtime and ratifies this patch, under which the guard's closed-unmerged case records a notice and continues its scan of official releases instead of failing; that under its B7 this one pull request files the act unchanged and applies the patch; that the act text and the patch come from the transfer commit you reported; and that nothing else changes. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against its transfer blob, and report that the bytes match and that the committed git blob ID equals the transfer blob ID. Report the committed SHA-256 of the action file.
- Push the branch with git push -u origin docs/dec-20261117-01-filing over the https remote. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 242 with gh api repos/MADVenturesLLC/madventures-tui/pulls/242 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Say in it that docs/decisions/ and .github/ are governance paths, so the pull request merges only on a Founder act naming its exact head. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261117-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link, and do not write the Copilot reviewer's login in the body. Quote no line in the body that holds a square bracket; describe it instead, and quote it in your final report.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results. If you edit the body after a prbody check, run the check again on the edited body and report both runs.
- This pull request's own jobs run with the patched action. Wait for Verify, Verify (macOS), both tui-chaos jobs and code-review to complete, checking no more often than every two minutes and for no more than 45 minutes in all, and report each name and conclusion. For Verify, read its log as in precondition 5 d and quote only the lines holding "Expiry guard passed" or "custody continues under DEC-20261117-01". If a job fails, quote its first line holding "::error::" and do nothing about it. If a job has not completed after 45 minutes, report its status.
- A check named Cursor Security Agent, from the GitHub app cursor, may start on the pull request. Under DEC-20261112-01 B7 it is not a check, review or gate. Report its name, status and conclusion, and do nothing about it.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not request any review, do not touch any other pull request or repository, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when any of these occurs. State what passed, what failed, what is unchanged, and the single next decision.
- Your working directory is not the named clone, gh is not daley40-lab, the git identity differs, or the origin remote is not https.
- A hash, line count or byte count differs, or a transfer commit or blob is missing or is not the latest commit touching its path.
- main has moved outside precondition 1, or the file name or identifier of precondition 4 is already used.
- Any fact in precondition 5 is false.
- git apply fails, or any path other than the two of ALLOWED SCOPE would change.
- An attribution-shaped line outside the final trailers cannot be rewrapped, or the secret scan finds a credential value.
- The branch exists on origin, the push is refused, or gh returns 401.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, the git identity, the origin remote's scheme, and the preconditions, each result with full SHAs, hashes, line and byte counts, and every quoted line.
2. The commit: full 40-character SHA, the two paths, the diff stat, the full diff of the action file, the cmp and blob-ID results, and the committed SHA-256 of both files.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, each job named above with its conclusion and the quoted log lines, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: the act naming this pull request's exact head that lets it merge.
