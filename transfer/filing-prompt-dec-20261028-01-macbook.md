STEP: file DEC-20261028-01 (the M22 checkpoint closure). Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261028-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261028-01-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261028-01-filing. Then run gh api user --jq .login. It must print daley40-lab. If either differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261028-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261028-M22-CHECKPOINT-CLOSURE (DEC-20261028-01) on 2026-10-28, after pull request 202 merged Task 50. It accepts the Tier-2 verdicts of pull requests 198, 201 and 202, closes the M22 review checkpoint, carries the open test and hardening items forward to later acts, and bars agents from using the Founder's credentials in this repository. Its C1 requires this filing to append four entries to the correction-rounds log.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the act after git fetch origin claude/awesome-cray-vqrzbt, from the latest commit of origin/claude/awesome-cray-vqrzbt that touches transfer/DEC-20261028-01-m22-checkpoint-closure.md, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- transfer/DEC-20261028-01-m22-checkpoint-closure.md; report that commit. Read it in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 2b47fea87a766c345ab295ffb3342d6be445c231, the merge of pull request 202, or a descendant whose changes since that commit touch no path under docs/verification/, packages/, apps/ or test/, and add no file whose name begins DEC-20261028-01. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261028-01-filing must not exist on origin.
2. The act has SHA-256 6f8f705fb9ea998a4029a240560c40cafb57ebe569494c53fee52d0d82db7c04, 74 lines, 8,849 bytes. If any value differs, stop.
3. Check the act with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero square brackets; zero bare three-hyphen lines; zero runs of two or more underscores; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals.
4. On origin/main the file docs/decisions/DEC-20261028-01-m22-checkpoint-closure.md does not exist, and under docs/ the identifier DEC-20261028-01 appears nowhere. Any use is a stop.
5. Check the facts the act's Part A cites, and stop if any is false. With gh api, read-only: pull requests 198, 201 and 202 are merged, with merge commits ce4b276aa49bb36c7736c82136de24db88360903, 2e62ebbb173d9649de999e5ef22c48812f36e6d0 and 2b47fea87a766c345ab295ffb3342d6be445c231, whose second parents are 5ef992f6ad6e53d18db493ed051d2fa59d5d2c5f, 06fa371bae8195afa6524da6a02b35448fe8e8bb and c7eabf0ec8ad676e2d3ecc63075eedae9bfc3535; issue comments 6440061248, 6440061784, 6452577539, 6455139522, 6455140002, 6457665692, 6466766561, 6466767164, 6468430984 and 6468466154 exist on the pull request the act names for each; and the first line of each of the six verdict comments begins TIER-2 REVIEW VERDICT. In docs/verification/phase-3a-correction-rounds.md on origin/main, quote the three entries headed with rubric milestone 10 and confirm that none counts a round.

ALLOWED SCOPE
One commit, exactly two paths:
  docs/decisions/DEC-20261028-01-m22-checkpoint-closure.md (new, byte for byte from its transfer blob)
  docs/verification/phase-3a-correction-rounds.md (modified only by appending the text of THE LOG ENTRIES at its end)
Before committing, git status --porcelain must list only those two paths.

THE LOG ENTRIES
Append the text between the two marker lines below, without the marker lines, to the end of docs/verification/phase-3a-correction-rounds.md, preceded by exactly one blank line after the file's present last line, and ending with exactly one newline. Change no other byte of the file. Then show git diff of that file and confirm that every changed line is an added line at its end.
BEGIN LOG ENTRIES
## M22 corrections review verdict PASS (rubric milestone 10, no round)

- **Recorded:** 2026-10-28, under `DEC-20261028-01` C1.
- **Plan milestone:** M22, the corrections of `DEC-20261027-01` B2 to B4. **Rubric milestone:** 10.
- **Head reviewed:** `5ef992f6ad6e53d18db493ed051d2fa59d5d2c5f` on PR #198, built by
  `session:codex/m22-corrections-r1`.
- **Reviewer:** `antigravity`, a fresh Gemini Antigravity session on the Founder's MacBook.
- **Verdict text SHA-256:** `93877eb1b1b9b4cb39be64723d46303eeab164e4388a2cdc5c7db26db91ef275`, 62,662
  bytes, 961 lines, saved at `/Users/michaeldaley/builds/m22-corrections-review-r1.md`, posted on PR #198
  as comments 6440061248 and 6440061784 by `decivantiq`.
- **Result:** PASS, no findings. **Counted:** no round. Merged at
  `ce4b276aa49bb36c7736c82136de24db88360903` under the authorization in comment 6452577539.

## Task 49 review verdict PASS (rubric milestone 10, no round)

- **Recorded:** 2026-10-28, under `DEC-20261028-01` C1.
- **Plan milestone:** M22, Task 49. **Rubric milestone:** 10.
- **Head reviewed:** `06fa371bae8195afa6524da6a02b35448fe8e8bb` on PR #201, built by
  `session:codex/m22-task49-r1`.
- **Reviewer:** `antigravity`, a fresh Gemini Antigravity session on the Founder's MacBook.
- **Verdict text SHA-256:** `c2e975c544cfd7cdeec5dfbacff4c734046b3d705ed47b6c706fd2b95c70b453`, 68,047
  bytes, 824 lines, saved at `/Users/michaeldaley/builds/m22-task49-review-r1.md`, posted on PR #201 as
  comments 6455139522 and 6455140002 by `decivantiq`.
- **Result:** PASS, no findings; three unclassified results ruled advisory by the merge authorization in
  comment 6457665692. **Counted:** no round. Merged at `2e62ebbb173d9649de999e5ef22c48812f36e6d0`.

## Task 50 review verdict PASS (rubric milestone 10, no round)

- **Recorded:** 2026-10-28, under `DEC-20261028-01` C1.
- **Plan milestone:** M22, Task 50. **Rubric milestone:** 10.
- **Head reviewed:** `c7eabf0ec8ad676e2d3ecc63075eedae9bfc3535` on PR #202, built by
  `session:codex/m22-task50-r1`.
- **Reviewer:** `antigravity`, a fresh Gemini Antigravity session on the Founder's MacBook.
- **Verdict text SHA-256:** `509229fa3e48c8ba79dba517420d858e466cc931c3bccdea038170012c98d0ae`, 77,265
  bytes, 894 lines, saved at `/Users/michaeldaley/builds/m22-task50-review-r1.md`, posted on PR #202 as
  comments 6466766561 and 6466767164 by `decivantiq`.
- **Result:** PASS, three advisory findings. **Counted:** no round. Merged at
  `2b47fea87a766c345ab295ffb3342d6be445c231` under the authorization in comment 6468466154.

## M22 review checkpoint closed (rubric milestone 10, count unchanged)

- **Recorded:** 2026-10-28, under `DEC-20261028-01` B2 and C1.
- **Plan milestone:** M22, Tasks 48 to 50. **Rubric milestone:** 10.
- **Closed at:** `2b47fea87a766c345ab295ffb3342d6be445c231`, the merge of PR #202.
- **Count:** rubric milestone 10 stays at 0 correction rounds.
- **Carried forward:** the items of `DEC-20261028-01` B4, for later acts.
END LOG ENTRIES

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting the act's signature or its trailer block. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261028-01, M22 checkpoint closure. The body says the Founder signed the act on 2026-10-28; that it accepts the verdicts of pull requests 198, 201 and 202, closes the M22 review checkpoint at 2b47fea87a766c345ab295ffb3342d6be445c231, carries the open items forward and bars agents from using the Founder's credentials here; that it appends four entries to the correction-rounds log under its C1; that the act's text comes from the transfer commit you reported; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261028-01-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 197 with gh api repos/MADVenturesLLC/madventures-tui/pulls/197 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261028-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, gh is not daley40-lab, a hash, line count or byte count differs, the transfer commit or blob is missing, main has moved outside precondition 1, the identifier is already used under docs/, any fact in precondition 5 is false, the log file would change anywhere but its end, any path other than the two would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, and the preconditions, each result with full SHAs, hashes, line and byte counts.
2. The commit: full 40-character SHA, the two paths, the diff stat, the cmp result, and the git diff of the log file.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
