STEP: file DEC-20261108-01 and revision 5 of the Phase 3B design and plan. Paste this as the first message of a new Claude Code session started on the Founder's MacBook by the Founder's launch command, which loads the agent identity and opens the session inside the fresh clone /Users/michaeldaley/madventures-tui-dec-20261108-01-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for one Founder act and two approved documents in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/dec-20261108-01-filing and open one draft pull request.

FIRST: YOUR WORKING DIRECTORY AND IDENTITY
Run pwd. It must be /Users/michaeldaley/madventures-tui-dec-20261108-01-filing. Then run gh api user --jq .login. It must print daley40-lab. Then run git config user.name and git config user.email; they must print daley40-lab and 293512385+daley40-lab@users.noreply.github.com. If any differs, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else. Do not inspect how gh obtains its credential: read no wrapper script, credential file or environment file, list no environment variables, and never print a token or any part of one. Do not run gh auth status. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. Run no process-listing command. Use no MCP server and start no other agent. Read nothing outside your own clone other than what this prompt names, and run no test.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-dec-20261108-01-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261108-PHASE-3B-APPROVAL (DEC-20261108-01) on 2026-11-08. It approves revision 5 of the Phase 3B design and plan at their SHA-256 values, is the first Phase 3B act, disposes of every item the plan's section 2D lists, and rules the plan's open items it names. Its C1 has one docs-only pull request file the act and replace revision 1 of both documents with the revision 5 texts, each byte for byte, and change nothing else. The act authorizes no slice, build or live call.

AUTHORITY
Read AGENTS.md first, including its merge bullet as DEC-20261031-01 amended it, and B8 of docs/decisions/DEC-20261102-02-hardening-builds.md, which lets a filing session the Founder names push its branch and open its draft pull request as daley40-lab. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. After git fetch origin claude/awesome-cray-vqrzbt, read each text from the latest commit of origin/claude/awesome-cray-vqrzbt that touches it, found with git log -1 --format=%H origin/claude/awesome-cray-vqrzbt -- PATH, and report each commit:
- DEC-20261108-01: transfer/DEC-20261108-01-phase-3b-approval.md
- the design, revision 5: transfer/3b-refresh-r5/2026-09-19-phase-3b-live-tui-integration-design.md, at transfer commit f7b2d1f6e7b30dabba1f89eea109d908894268b0
- the plan, revision 5: transfer/3b-refresh-r5/2026-09-19-phase-3b-live-tui-integration.md, at transfer commit f7b2d1f6e7b30dabba1f89eea109d908894268b0
Read all three in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be ae8b3325dcdbc1730ab8f7b9712071ba5e4324d5, the merge of pull request 212, or a descendant whose changes since that commit touch no path under docs/decisions/ and neither of the two document paths of ALLOWED SCOPE. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/dec-20261108-01-filing must not exist on origin.
2. Each text has this SHA-256, line count and byte count; if any value differs, stop:
   DEC-20261108-01: 319ba65b340696d66a655e21f648fed742a9c38bcbb1d876776abc27a27a9738, 95 lines, 12,221 bytes.
   The design, revision 5: da8f4c8c35f617898368b340d710188686c9dc9faf2b23c4a6b284c1bb4d93fc, 469 lines.
   The plan, revision 5: a48bf5457bf17cf5d554e541c5bb3609efacf6ad170ad6e56950b829a4269ccc, 651 lines.
3. Check the act with grep, not by eye, and report each count: Status ISSUED; the signature (Michael Daley, a Date, and the founder Actor-Id line); zero bare three-hyphen lines; zero runs of two or more underscores; zero lines ending in a space; zero square brackets; none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed"; and the word DRAFT nowhere in capitals. Check the two documents for zero square brackets and zero lines ending in a space, and report both counts.
4. On origin/main the path docs/decisions/DEC-20261108-01-phase-3b-approval.md does not exist, and under docs/ the string DEC-20261108-01 appears nowhere. Any use is a stop. On origin/main the two document paths of ALLOWED SCOPE hold revision 1: the design has SHA-256 770482a197650928b37ee77c79e5e41550b3689dc390e9bbeae511534e599b4d and 204 lines, and the plan has SHA-256 e63a1f8bd7614cfa666518494cdaafa8edc69e6f95b61d32983c71942f794461 and 236 lines. If either differs, stop.
5. Check the facts the act's Part A cites, and stop if any is false. Read-only, with gh api, git and shasum. Run every git command of this item with GIT_CONFIG_GLOBAL=/dev/null and GIT_CONFIG_NOSYSTEM=1 set for that command:
   a. Pull request 229 is merged with merge commit 5be1a586b4a4bb7cc09dfc6239b66b518cf9a23c, whose parents, read with gh api repos/MADVenturesLLC/madventures-tui/git/commits/SHA, are a7dbc7def0cd67568b2765c894ff91894707801c and, second, b3981da8dc95542de894c7fe15f20b4747c62439. Pull request 212 is merged with merge commit ae8b3325dcdbc1730ab8f7b9712071ba5e4324d5, whose parents are 5be1a586b4a4bb7cc09dfc6239b66b518cf9a23c and, second, d6767dc912cbe65560dc5070e468cb399f4311c0. git diff --name-only a7dbc7def0cd67568b2765c894ff91894707801c ae8b3325dcdbc1730ab8f7b9712071ba5e4324d5 lists exactly these five paths: CONTRIBUTING.md, docs/decisions/DEC-20261102-03-contributing-merge-rule.md, docs/decisions/DEC-20261106-02-phase-3a-final-merge-review.md, docs/decisions/DEC-20261107-01-task59-records-and-phase-3a-merge.md and docs/verification/phase-3a-correction-rounds.md.
   b. These four review reports exist on this MacBook with these SHA-256 values; read each only with shasum -a 256 and wc -l, and quote nothing from them: /Users/michaeldaley/builds/3b-refresh-review-r1.md e0be01385fa25b19a5b3903aa282f3983c593aab4f58858fdbe8a3bc095de3dc, 1128 lines; /Users/michaeldaley/builds/3b-refresh-review-r2.md b139a50a1f986da62b768d1d99cff01469425cfa31a85ae822c874e8d701819f; /Users/michaeldaley/builds/3b-refresh-review-r3.md 2cb169a93bc0946ef5cf9a143ad13e35c25587670ff977594367a53b8a2ef52b; /Users/michaeldaley/builds/3b-refresh-review-r4.md 5fc2a8d4b28f4c74ea9e446db0b55341c61f921181495d46c6a8a125c2bb1a93, 605 lines.
   c. At ae8b3325dcdbc1730ab8f7b9712071ba5e4324d5, read with git show and quoted with line numbers: in packages/supervisor/src/preflight.ts, the line that returns identity_mismatch when an execution's independence_domain differs from its admitted registration, and the line that returns repository_fingerprint when the git common directory of the repository root differs from that of the worktree; in packages/supervisor/test/preflight.test.ts, the line that names the test the returned plan's repository fingerprint is frozen.
   d. At ae8b3325dcdbc1730ab8f7b9712071ba5e4324d5, quote with line numbers: line 123 of packages/broker/src/client.ts, which declares the snapshot's fencingToken as number or null; line 111 of apps/madbridge/src/tui/types.ts, which declares fencingToken as number; and the lines of packages/supervisor/src/build.ts that write the session_open row with fencing_token null.

ALLOWED SCOPE
One commit, exactly three paths:
  docs/decisions/DEC-20261108-01-phase-3b-approval.md (new, byte for byte from its transfer blob)
  docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md (replaced in full, byte for byte, by the revision 5 transfer blob)
  docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md (replaced in full, byte for byte, by the revision 5 transfer blob)
Before committing, git status --porcelain must list only those three paths. Do not change docs/verification/phase-3a-correction-rounds.md or any other file.

ATTRIBUTION-SHAPED LINES
The pull request body becomes the merge commit message on main, where the attribution check reads every line. In the commit message and in the pull request body, no line other than the three trailers in the final paragraph, and the Co-Authored-By line, may begin with Role-Id:, Role-Id-Secondary:, Actor-Id: or Execution-Surface:. That includes a wrapped line in your prose, such as one quoting the act's signature or its trailer block. Check both texts with grep -nE '^(Role-Id|Role-Id-Secondary|Actor-Id|Execution-Surface):' and confirm that the only matches are the three trailers. Rewrap any other match before you commit or create the pull request.

COMMIT AND PULL REQUEST
- Commit subject: docs: file DEC-20261108-01 and approve the Phase 3B design and plan at revision 5. The body says the Founder signed the act on 2026-11-08; that it approves both documents at their SHA-256 values, is the first Phase 3B act and disposes of the carried items; that under its C1 this one pull request files the act and replaces revision 1 of both documents with revision 5, byte for byte; that the three texts come from the transfer commits you reported; that it authorizes no slice, build or live call; and docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp each of the three committed files against its transfer blob, and report that the bytes match.
- Push the branch with git push -u origin docs/dec-20261108-01-filing. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp.
- Open a draft pull request against main. Read the body of pull request 229 with gh api repos/MADVenturesLLC/madventures-tui/pulls/229 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/dec-20261108-01-filing -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link, and do not write the Copilot reviewer's login in the body.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results. If you edit the body after a prbody check, run the check again on the edited body and report both runs.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not change any repository setting, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, gh is not daley40-lab, the git identity differs, a hash, line count or byte count differs, a transfer commit or blob is missing, main has moved outside precondition 1, the act's identifier or file name is already used under docs/, either document on main is not revision 1, any fact in precondition 5 is false, any path other than the three of ALLOWED SCOPE would change, an attribution-shaped line outside the final trailers cannot be rewrapped, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, the host from uname -s, which must be Darwin, the gh login, the git identity, and the preconditions, each result with full SHAs, hashes, line and byte counts, and every quoted line.
2. The commit: full 40-character SHA, the three paths, the diff stat, and the three cmp results.
3. The attribution-shaped-line check on the commit message and on the body, with every match.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, the count of square brackets in the body, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/N --jq .body | shasum -a 256.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready with the guarded command of DEC-20261015-05 B4.
