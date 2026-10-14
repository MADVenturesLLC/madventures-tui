STEP: file DEC-20261014-04 r2 (records cleanup) and apply its approval-record patch r63b. Paste this as the first message of a new Claude Code session started on the Founder's MacBook, after loading the agent environment file the launcher uses, from inside the fresh clone /Users/michaeldaley/madventures-tui-records-cleanup-r2-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for the records cleanup act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/records-cleanup-r2 and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY
Run pwd. It must be /Users/michaeldaley/madventures-tui-records-cleanup-r2-filing. If it is not, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else; do not work in another directory.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-records-cleanup-r2-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261014-RECORDS-CLEANUP on 2026-10-14. It ratifies Revision 6.3 of docs/decisions/PLAN-OPEN-approval-record.md, which records the PLAN-OPEN-1 and PLAN-OPEN-2 contents that DEC-20261013-05 ratified; it rules that the failed Attribution Shape Check push run on main for b5662096d0f03929602c90a0d8c2c5cfaa8ad24d is a false positive from a wrapped line of prose; it requires the attribution-shaped-line check in every prompt; and it keeps the ready-for-review record of pull request 148. Its part C1 says one docs-only pull request files the act and applies the patch, and changes nothing else. There is no rounds-log entry. This is the r2 text: it replaces the first signed text, SHA-256 4fa904cc1632b5658433986c050da2e385e9c8973a3a6e85eab6dac895291704, and its patch, because the first patch did not add a Revision 6.3 row to the record's Approval lineage table. The first text was filed in pull request 149, which the Founder closes unmerged; do not touch pull request 149 or the branch docs/records-cleanup, and do not file the first text.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read both transfer inputs:
  git fetch origin claude/awesome-cray-vqrzbt
  git show fd012b8b1961c3e6443ad7503d3268b85523f190:transfer/DEC-20261014-04-records-cleanup-r2.md
  git show fd012b8b1961c3e6443ad7503d3268b85523f190:transfer/approval-record-r63b.patch
Read the act in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be cc8d286eb07da598dcb4b10855b395183f61173e, the merge of DEC-20261014-02, or a descendant whose changes since that commit touch only paths under docs/decisions/ other than docs/decisions/PLAN-OPEN-approval-record.md. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/records-cleanup-r2 must not exist on origin.
2. At transfer commit fd012b8b1961c3e6443ad7503d3268b85523f190, transfer/DEC-20261014-04-records-cleanup-r2.md has SHA-256 d4b5680669be2c4efd04d5f7c06f4fa64fe4043b436d78b1eb8673e41d75a532, 59 lines, 6,751 bytes, and transfer/approval-record-r63b.patch has SHA-256 5ee0eae877a6a83f078f3ea745a091ed1e7b5ad3a9b93ba2c7d4f986d43da662, 3,784 bytes. If any differs, stop.
3. The act has Status ISSUED, a Ratifies line naming the patch hash above, a Replaces line naming 4fa904cc1632b5658433986c050da2e385e9c8973a3a6e85eab6dac895291704 and c9bf5ccc8450974c6f3db8a0f414f80018bae5afdb3ca36dbddc55960b4eba3f, and the signature (Michael Daley, Date 2026-10-14, Actor-Id: founder); no square bracket, no bare three-hyphen line, no run of underscores, none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed", and the word DRAFT nowhere in capitals. Report each result.
4. On origin/main: docs/decisions/PLAN-OPEN-approval-record.md has SHA-256 14e79fd47697fb2251b2e04008cd0245801a486fbb745728ce7fb8819fd216eb; docs/decisions/PLAN-OPEN-1-identity-authentication.md has d40682beb5a5c3f617638b1775f3777e25c66e12787b9269141164dcc3d9bc42 and docs/decisions/PLAN-OPEN-2-environment-allowlists.md has b60676aa47b216c36d9080c884650943cdac93dd12109d2864ebcf0eb6887d8c; docs/decisions/DEC-20261014-04-records-cleanup.md does not exist; and the identifier DEC-20261014-04 appears nowhere under docs/. Any use is a stop.
5. Check the facts the act cites. Stop and report if any is false: the approval record on origin/main lists 196b91b8c9ffbda3d4319c4a8abc96c20ffe16950ba23864eb8780de356f5aee for PLAN-OPEN-1 and 7ceb367c48adb1954e107ed7cdfd5578277f88c1acadb21561e043d24a95417f for PLAN-OPEN-2; the commit b5662096d0f03929602c90a0d8c2c5cfaa8ad24d message contains a line beginning with Actor-Id: founder outside its final paragraph, and its final paragraph is the three trailers Role-Id: builder, Actor-Id: session:claude-code/tui-imac-scope-filing and Execution-Surface: claude-code; and bash .github/scripts/attribution-shape-check.sh main b5662096d0f03929602c90a0d8c2c5cfaa8ad24d fails. Quote what you rely on.
6. gh api user --jq .login prints daley40-lab, with GH_TOKEN set as the session provides it. Do not run gh auth status, and never print a token or any part of one. Run gh normally. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. If this session has no agent identity, stop and report before any commit.

ALLOWED SCOPE
One commit, exactly two paths:
  docs/decisions/DEC-20261014-04-records-cleanup.md (new, byte for byte from transfer/DEC-20261014-04-records-cleanup-r2.md of precondition 2)
  docs/decisions/PLAN-OPEN-approval-record.md (changed only by the patch)

APPLYING THE PATCH
Extract the patch to a temporary file outside the clone. Run git apply --check on it, then git apply. Do not edit any hunk and do not regenerate the patch. Afterwards the approval record must have SHA-256 33600a809828000efb2b40ecce1dcb49a0b4d65a42032809aef7b2b1b33f0c3e, its Approval lineage table must end with a Revision 6.3 row, and git diff --check must be clean. If git apply fails or the value differs, stop. Before committing, git status --porcelain must list only the two allowed paths.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting the act's signature. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261014-04 and bring the approval record current. The body says the Founder signed DEC-20261014-04 on 2026-10-14; that it ratifies Revision 6.3 of the approval record, with the patch SHA-256 5ee0eae877a6a83f078f3ea745a091ed1e7b5ad3a9b93ba2c7d4f986d43da662, recording the PLAN-OPEN-1 and PLAN-OPEN-2 contents DEC-20261013-05 ratified; that it rules the failed attribution push run on b5662096d0f03929602c90a0d8c2c5cfaa8ad24d a false positive and leaves main as it is; that it changes no code, test, workflow, plan or spec; that it adds no round; that this is the r2 text, which adds the Revision 6.3 row to the Approval lineage table that the first text missed and replaces the first text filed in pull request 149; and that the act and the patch come from transfer commit fd012b8b1961c3e6443ad7503d3268b85523f190. Docs only. When you name the commit b5662096d0f03929602c90a0d8c2c5cfaa8ad24d or its trailers, write them inside a sentence, never at the start of a line. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against the transfer blob, and report that the bytes match. Report the approval record's new SHA-256.
- Push the branch with git push -u origin docs/records-cleanup-r2. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp. The Founder will push the branch and then tell you to continue.
- Open a draft pull request against main. Read the body of PR 148 with gh api repos/MADVenturesLLC/madventures-tui/pulls/148 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/records-cleanup-r2 -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, a hash, line count or byte count differs, the transfer commit or the blob is missing, main has moved outside precondition 1, the decision identifier is already used, any fact in precondition 5 is false, git apply fails, any path other than the two would change, git diff --check flags any line, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, and the preconditions, each result with full SHAs, hashes, line and byte counts, and the host from uname -s, which must be Darwin.
2. The commit: full 40-character SHA, the two paths, the diff stat, the cmp result and the approval record's new SHA-256.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, and the count of square brackets in the body.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready under a separate authorization naming its head.
