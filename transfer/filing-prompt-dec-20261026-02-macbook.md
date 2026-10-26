STEP: file DEC-20261026-02 (the preflight override-isolation test joins the stabilization build). Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261026-02-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261026-02-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261026-02-filing. Then run gh api user --jq .login. It must print daley40-lab. If either differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261026-02-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261026-STABILIZATION-PREFLIGHT-ISOLATION-TEST (DEC-20261026-02) on 2026-10-26. During the stabilization build's restarted D3, the unchanged test fixture preflight keeps pair policy and registration overrides local to each call failed once on its 5,000 ms limit; the builder's diagnosis showed it runs twelve child probes in sequence within that limit. The act lets the build give that test deterministic probe results through the probe dependency its fixture already supplies, keeping every assertion and the timeout. The stabilization builder continues only after this act is on main.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the act after git fetch origin claude/awesome-cray-vqrzbt, from the latest commit of origin/claude/awesome-cray-vqrzbt that touches transfer/DEC-20261026-02-stabilization-preflight-isolation-test.md, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- transfer/DEC-20261026-02-stabilization-preflight-isolation-test.md; report that commit. Read it in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 40b91f57168a1897eb50cc44baff9adc441ee6a3, the merge of pull request 194, or a descendant whose changes since that commit touch no path under docs/decisions/, packages/supervisor/ or apps/. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261026-02-filing must not exist on origin.
2. The act has SHA-256 12250e4724b375476aadcd58177c036707bc416ec78996c1291e352adf684d09, 49 lines, 3,712 bytes. If any value differs, stop.
3. Check the act with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero square brackets; zero bare three-hyphen lines; zero runs of two or more underscores; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals.
4. On origin/main the file docs/decisions/DEC-20261026-02-stabilization-preflight-isolation-test.md does not exist, and under docs/ the identifier DEC-20261026-02 appears nowhere. Any use is a stop.
5. Check the facts the act's A1 and B1 rely on, on origin/main, quote what you rely on, and stop if any is false:
   - packages/supervisor/test/preflight.test.ts holds the test fixture preflight keeps pair policy and registration overrides local to each call, and its line 202 asserts that a preflight call returns ok;
   - the fixture of that file supplies a probe dependency to preflight, through which other tests of the file already pass their own probe function;
   - docs/decisions/DEC-20261023-01-standing-build-rules.md D2 item 2 rules only the test preflight creates nothing in that file.

ALLOWED SCOPE
One commit, exactly one path:
  docs/decisions/DEC-20261026-02-stabilization-preflight-isolation-test.md (new, byte for byte from its transfer blob)
Before committing, git status --porcelain must list only that path.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting the act's signature or its trailer block. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261026-02, preflight isolation test. The body says the Founder signed the act on 2026-10-26 after the unchanged preflight override-isolation test failed once on its 5,000 ms limit during the stabilization build's D3, and the builder's diagnosis showed twelve sequential child probes inside that limit; that it lets the build give that test deterministic probe results through its fixture's existing probe dependency, with every assertion and the timeout kept and no production change; that the text comes from the transfer commit you reported; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261026-02-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 194 with gh api repos/MADVenturesLLC/madventures-tui/pulls/194 --jq .body and mirror its structure: what and why, the path changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261026-02-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
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
