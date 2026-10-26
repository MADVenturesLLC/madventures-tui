STEP: file DEC-20261026-01 (the S0 test joins the stabilization build). Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261026-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261026-01-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261026-01-filing. Then run gh api user --jq .login. It must print daley40-lab. If either differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261026-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261026-STABILIZATION-S0-TEST (DEC-20261026-01) on 2026-10-26. On the first attempt of Verify (macOS) for pull request 193, the test S0: a dead host with a stdin-inheriting descendant still triggers mandatory child-PGID containment failed once in the non-UTC step and passed on rerun. The act adds that test to the stabilization build of DEC-20261023-01 Part D: the builder establishes the cause first, removes it from the test's own setup without weakening any assertion, and runs the test five times in a row in UTC and in America/New_York. The stabilization build starts only after this act is on main.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the act after git fetch origin claude/awesome-cray-vqrzbt, from the latest commit of origin/claude/awesome-cray-vqrzbt that touches transfer/DEC-20261026-01-stabilization-s0-test.md, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- transfer/DEC-20261026-01-stabilization-s0-test.md; report that commit. Read it in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 418a0269b5d360690e3c5cd7c83663f022d1eba7, the merge of pull request 193, or a descendant whose changes since that commit touch no path under docs/decisions/, packages/broker/ or .github/workflows/. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261026-01-filing must not exist on origin.
2. The act has SHA-256 4e8819f18ac07fe419ee2873835865497fc26e8f68d30bd9b9834f910b1290e6, 51 lines, 4,071 bytes. If any value differs, stop.
3. Check the act with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero square brackets; zero bare three-hyphen lines; zero runs of two or more underscores; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals.
4. On origin/main the file docs/decisions/DEC-20261026-01-stabilization-s0-test.md does not exist, and under docs/ the identifier DEC-20261026-01 appears nowhere. Any use is a stop.
5. Check the facts the act's A2 and A3 cite on origin/main, quote what you rely on, and stop if any is false:
   - packages/broker/test/pty-host-supervisor.test.ts holds the test S0: a dead host with a stdin-inheriting descendant still triggers mandatory child-PGID containment (C7 evidence 3); its fixture is written to /tmp/t44-stdin-inheritor.sh as a shell loop that traps TERM only; and line 1079 asserts that groupExternallyAlive of the fixture's process group is true after the host is killed;
   - .github/workflows/verify.yml has a step named Test (non-UTC timezone) that runs bun test with TZ set to America/New_York;
   - packages/broker/src/pty-host-supervisor.ts exports escalateWedgedHost;
   - docs/decisions/DEC-20261023-01-standing-build-rules.md D1 lists the paths of the stabilization build, and packages/broker/test/pty-host-supervisor.test.ts is not among them.

ALLOWED SCOPE
One commit, exactly one path:
  docs/decisions/DEC-20261026-01-stabilization-s0-test.md (new, byte for byte from its transfer blob)
Before committing, git status --porcelain must list only that path.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting the act's signature or its trailer block. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261026-01, S0 test in stabilization. The body says the Founder signed the act on 2026-10-26 after the S0 dead-host containment test failed once on macOS CI for pull request 193 and passed on rerun; that it adds that test to the stabilization build of DEC-20261023-01 Part D, requiring its cause to be established first and removed from the test's own setup with every assertion kept, and five passing runs in a row in UTC and in America/New_York; that the text comes from the transfer commit you reported; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261026-01-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 192 with gh api repos/MADVenturesLLC/madventures-tui/pulls/192 --jq .body and mirror its structure: what and why, the path changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261026-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
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
