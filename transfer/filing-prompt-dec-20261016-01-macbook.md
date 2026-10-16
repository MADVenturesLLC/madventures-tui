STEP: file DEC-20261016-01 (M20 corrections). Paste this as the first message of a new Claude Code session started on the Founder's MacBook, after loading the agent environment file the launcher uses, from inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261016-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261016-01-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261016-01-filing. If it is not, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else; do not work in another directory.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261016-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261016-M20-CORRECTIONS (DEC-20261016-01) on 2026-10-16. It authorizes one build that adds the independence-domain check to preflight with its test, adds a fingerprint-freeze test, and hardens the Task 45 probe timing tests, built by Gemini 4 on Antigravity on the Ubuntu PC. Under B3 of DEC-20261015-05, one docs-only pull request files it byte for byte and changes nothing else.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read the transfer inputs after git fetch origin claude/awesome-cray-vqrzbt:
  git show f1def83591bcd947b18a06cae69e722d8ab19e5c:transfer/DEC-20261016-01-m20-corrections.md
Read the act in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be be996b1fd7ccbc1f5fdee914b1e9de31020b8461, the merge of pull request 154, or a descendant whose changes since that commit touch only paths under docs/. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261016-01-filing must not exist on origin.
2. The transfer input has these values; if any differs, stop:
   - DEC-20261016-01: SHA-256 9b0039d3600de58c1e556458a14c8e28a5d533bdfbfe8f3ba16b1b931f44ecb6, 82 lines, 8,115 bytes.
3. The act has Status ISSUED and the signature (Michael Daley, a Date, and the founder Actor-Id line); no square bracket, no bare three-hyphen line, no run of underscores, none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed", and the word DRAFT nowhere in capitals. Report each result.
4. On origin/main the new decision file does not exist, and under docs/ the identifier DEC-20261016-01 appears nowhere. Report every use you find. Any use is a stop.
5. Check the facts the act cites, and quote what you rely on; stop if any is false:
   - every decision record named in the act's header exists on origin/main with the SHA-256 the header gives;
   - DEC-20261015-03 B5 item 2 carries item 3a of the merge authorization of pull request 151 and requires the independence-domain change before any act authorizes a caller of runPurePreflight;
   - spec section 9.1 says the envelope provider and independence domain MUST equal the registered values, with a mismatch being identity_mismatch;
   - packages/supervisor/src/preflight.ts on origin/main compares each execution's provider with its registration and does not compare independence_domain;
   - packages/supervisor/test/attestation.test.ts on origin/main contains a test named "forced cleanup accounts for grace escalation and reaping" that aborts on a 100 ms timer.
6. gh api user --jq .login prints daley40-lab, with GH_TOKEN set as the session provides it. Do not run gh auth status, and never print a token or any part of one. Run gh normally. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. If this session has no agent identity, stop and report before any commit.

ALLOWED SCOPE
One commit, exactly one path, new and byte for byte from its transfer blob:
  docs/decisions/DEC-20261016-01-m20-corrections.md
Before committing, git status --porcelain must list only that path.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting an act's signature or the attribution block of DEC-20261016-01 E1. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261016-01. The body says the Founder signed the act on 2026-10-16; that it authorizes the independence-domain check, the fingerprint-freeze test and the Task 45 timing-test fix as one build on the Ubuntu PC; that the text comes from transfer commit f1def83591bcd947b18a06cae69e722d8ab19e5c; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261016-01-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp. The Founder will push the branch and then tell you to continue.
- Open a draft pull request against main. Read the body of PR 154 with gh api repos/MADVenturesLLC/madventures-tui/pulls/154 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261016-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, a hash, line count or byte count differs, a transfer commit or blob is missing, main has moved outside precondition 1, the decision identifier is already used under docs/, any fact in precondition 5 is false, any path other than the one would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, and the preconditions, each result with full SHAs, hashes, line and byte counts, and the host from uname -s, which must be Darwin.
2. The commit: full 40-character SHA, the path, the diff stat and the cmp result.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, and the count of square brackets in the body.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
