STEP: file DEC-20261024-02 (the build delegate for Task 25). Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261024-02-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261024-02-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261024-02-filing. Then run gh api user --jq .login. It must print daley40-lab. If either differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261024-02-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261024-TASK25-DELEGATE-FORWARDING (DEC-20261024-02) on 2026-10-24. The Task 25 builder stopped before any edit because the broker delegate in packages/supervisor/src/build.ts, which every client the build constructs is bound to, forwards publish but not publishIncident, so the atomic incident path of DEC-20261022-01 B7 would fail through those clients, and build.ts is not among Task 25's paths. The act authorizes that forwarding, one regression test in packages/supervisor/test/build.test.ts and the build.ts separation pin, which makes seven Task 25 paths. The builder resumes only after this act is on main.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the act after git fetch origin claude/awesome-cray-vqrzbt, from the latest commit of origin/claude/awesome-cray-vqrzbt that touches transfer/DEC-20261024-02-task25-delegate-forwarding.md, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- transfer/DEC-20261024-02-task25-delegate-forwarding.md; report that commit. Read it in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 7e4572c95d90c19b5403c07c8d4cd146c6d37d98, the merge of pull request 188, or a descendant whose changes since that commit touch no path under docs/decisions/, packages/broker/, packages/supervisor/ or test/phase3a/. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261024-02-filing must not exist on origin.
2. The act has SHA-256 1ddfa8acc4453af8af23f05c32e02aa4afc7d04270aaecb3cbb0093d6aac798f, 57 lines, 5,272 bytes. If any value differs, stop.
3. Check the act with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero square brackets; zero bare three-hyphen lines; zero runs of two or more underscores; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals.
4. On origin/main the file docs/decisions/DEC-20261024-02-task25-delegate-forwarding.md does not exist, and under docs/ the identifier DEC-20261024-02 appears nowhere. Any use is a stop.
5. Check the facts the act's A1 and A2 cite on origin/main, quote what you rely on, and stop if any is false:
   - packages/supervisor/src/build.ts, at line 744, makes the broker delegate with Object.create(RuntimeBroker.prototype); its forwarding table forwards publish to openBroker().publish(event), at line 761, and has no publishIncident anywhere in the file; and the clients at lines 799 and 990 are made with createInProcessBrokerClient(brokerHandle, ...), where brokerHandle is that delegate;
   - packages/broker/src/in-process-client.ts returns invariant_failure with detail incident publication not wired for a published incident, and packages/broker/src/runtime-broker.ts has a publish method and no publishIncident;
   - packages/supervisor/test/build.test.ts holds the test an adapter client from the build publishes an accepted event through its broker delegate;
   - test/phase3a/harness-separation.test.ts has an EXCEPTIONS entry for packages/supervisor/src/build.ts with sha256 bf1fd94b76043c6e8b4d0e2afddde8805c0cac5d361d0c4ea1fd7c2db2679368, and build.ts on origin/main has that SHA-256;
   - docs/decisions/DEC-20261022-01-tasks-24-25-execution-authorization.md C2 lists exactly four Task 25 paths, none of them under packages/supervisor/.

ALLOWED SCOPE
One commit, exactly one path:
  docs/decisions/DEC-20261024-02-task25-delegate-forwarding.md (new, byte for byte from its transfer blob)
Before committing, git status --porcelain must list only that path.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting the act's signature or its trailer block. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261024-02, Task 25 build delegate. The body says the Founder signed the act on 2026-10-24 after the Task 25 builder stopped before any edit, because the build's broker delegate forwards publish but not publishIncident and packages/supervisor/src/build.ts is not among Task 25's paths; that it authorizes the forwarding of publishIncident in build.ts, one regression test in packages/supervisor/test/build.test.ts and the build.ts separation pin, making seven Task 25 paths; that the text comes from the transfer commit you reported; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261024-02-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 190 with gh api repos/MADVenturesLLC/madventures-tui/pulls/190 --jq .body and mirror its structure: what and why, the path changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261024-02-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, gh is not daley40-lab, a hash, line count or byte count differs, the transfer commit or blob is missing, main has moved outside precondition 1, the identifier is already used under docs/, any fact in precondition 5 is false, any path other than the one would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, and the preconditions, each result with full SHAs, hashes, line and byte counts.
2. The commit: full 40-character SHA, the one path, the diff stat, and the cmp result.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
