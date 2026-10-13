STEP: file DEC-20261013-04 (iMac out of scope) and apply its spec patch. Paste this as the first message of a new Claude Code session started on the Founder's MacBook, after loading the agent environment file the launcher uses, from inside the fresh clone /Users/michaeldaley/madventures-tui-imac-scope-filing-r3, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for the iMac scope act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. This is a docs-only change. Land it as one commit on a branch named docs/imac-out-of-scope and open one DRAFT pull request.

FIRST: YOUR WORKING DIRECTORY
Run pwd. It must be /Users/michaeldaley/madventures-tui-imac-scope-filing-r3. If it is not, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else; do not work in another directory.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-imac-scope-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261013-IMAC-OUT-OF-SCOPE on 2026-10-13. It removes the Founder's iMac from Phase 3A, so the certification hosts are the MacBook and the Ubuntu PC and macOS on x86_64 is no longer a supported host profile. It ratifies one patch to the Phase 3A spec, and rules that the plan, the Phase 3B documents and docs/STATUS.md are read under it without being edited. Its part C1 says one docs-only pull request files the act and applies the patch, after DEC-20261013-03 is on main. There is no rounds-log entry.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read both transfer inputs:
  git fetch origin claude/awesome-cray-vqrzbt
  git show origin/claude/awesome-cray-vqrzbt:transfer/DEC-20261013-04-imac-out-of-scope-r3.md
  git show d10ec135d19b02def835233d95def16149e9d8a5:transfer/imac-scope-spec.patch
The act is the r3 text. Two earlier signed texts of the same act, transfer/DEC-20261013-04-imac-out-of-scope.md (SHA-256 89533d5540de10f78fd8f0f70a828ca2287e2fe4416ff4ee0b5bc47bf31f6360) and transfer/DEC-20261013-04-imac-out-of-scope-r2.md (SHA-256 411a0456d5afd0e11cbc68175e8f139035f54ba7382a5ef62ff2fc56b0f9b75f), are replaced and must not be filed.
Read the act in full before you write anything. Install nothing and run no test: this change touches no code.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 4b1bbebc9db1dfe8e3176bcccd30ba9cf2106491, or a descendant whose changes since that commit touch only paths under docs/decisions/. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch docs/imac-out-of-scope must not exist on origin.
2. On origin/claude/awesome-cray-vqrzbt, transfer/DEC-20261013-04-imac-out-of-scope-r3.md has SHA-256 2dd2ebd0715c8c6f70e963b5a6698a4bf4f71d5505021db18c490625bfe2d88f, 64 lines, 5,431 bytes. Report the transfer commit that last changed it. At transfer commit d10ec135d19b02def835233d95def16149e9d8a5, transfer/imac-scope-spec.patch has SHA-256 7ec602b353cb3b3013dcfc48f75ab2ab45075d59ba5fe740f9a0dbead2e9c28a, 6,579 bytes. If either differs, stop.
3. The act has Status ISSUED, a Replaces line naming both 89533d5540de10f78fd8f0f70a828ca2287e2fe4416ff4ee0b5bc47bf31f6360 and 411a0456d5afd0e11cbc68175e8f139035f54ba7382a5ef62ff2fc56b0f9b75f, and the signature (Michael Daley, Date 2026-10-13, Actor-Id: founder), no square bracket, no bare three-hyphen line, no run of underscores, none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed", and the word DRAFT nowhere in capitals. Report each result.
4. DEC-20261013-03 is on origin/main at docs/decisions/DEC-20261013-03-tests-4-6-ruling.md with SHA-256 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7, and docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md on origin/main has SHA-256 2045c4ec33ef12a77fa03a922c66fa6d8c9035d4c8f8dfff7c23e47337c17e6c.
5. docs/decisions/DEC-20261013-04-imac-out-of-scope.md does not exist on origin/main. Under docs/ on origin/main, the identifier DEC-20261013-04 appears only in docs/decisions/DEC-20261013-01-task45-execution-authorization.md, where every use refers forward to this act; report each line. Any other use is a stop.
6. Check the facts the act cites. Stop and report if any is false: .github/actions/setup-qualified-bun/action.yml selects archives only for Linux-x86_64 and Darwin-arm64; the spec's §3.6 table records the iMac at macOS 13.7.8; the comment above the verify-macos job in .github/workflows/verify.yml names an Intel lane, macos-15-intel, as the next Founder decision; checkPlatform in apps/madbridge/src/commands/doctor.ts reports ok for any darwin platform; and B8 of DEC-20261013-01, as filed on origin/main, runs the host-facts check on two hosts, the MacBook and the Ubuntu PC.
7. gh api user --jq .login prints daley40-lab, with GH_TOKEN set as the session provides it. Do not run gh auth status, and never print a token or any part of one. Run gh normally. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. If this session has no agent identity, stop and report before any commit.

ALLOWED SCOPE
One commit, exactly two paths:
  docs/decisions/DEC-20261013-04-imac-out-of-scope.md (new, byte for byte from transfer/DEC-20261013-04-imac-out-of-scope-r3.md)
  docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md (changed only by the patch)

APPLYING THE PATCH
Extract the patch to a temporary file outside the clone. Run git apply --check on it, then git apply. Do not edit any hunk and do not regenerate the patch. Afterwards the spec must have SHA-256 913a7b20b74cda89224e40a32866556d5375755dd9810d0ba9cdfbed068a5a27, and git diff --check must be clean. If git apply fails or the value differs, stop. Before committing, git status --porcelain must list only the two allowed paths.

COMMIT AND PULL REQUEST
- Commit subject: docs: remove the iMac from Phase 3A and file DEC-20261013-04. The body says the Founder signed DEC-20261013-04 on 2026-10-13; that it removes the iMac as a certification host and macOS on x86_64 as a supported host profile, leaving macOS on arm64 and Ubuntu 26.04 LTS on x86_64, certified on the MacBook and the Ubuntu PC; that it ratifies the spec patch with SHA-256 7ec602b353cb3b3013dcfc48f75ab2ab45075d59ba5fe740f9a0dbead2e9c28a; that the plan, the Phase 3B documents and docs/STATUS.md are read under it and not edited; that it changes no code, test or workflow; that it adds no round; that the act is the r3 text, which replaces two earlier signed texts that were never filed, and the patch comes from transfer commit d10ec135d19b02def835233d95def16149e9d8a5; and that no other path changes. Docs only. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against the r3 transfer blob, and report that the bytes match. Report the spec's new SHA-256.
- Push the branch with git push -u origin docs/imac-out-of-scope. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp. The Founder will push the branch and then tell you to continue.
- Open a DRAFT pull request against main. Read the body of PR 142 with gh api repos/MADVenturesLLC/madventures-tui/pulls/142 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=docs/imac-out-of-scope -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, a hash, line count or byte count differs, the transfer commit or a blob is missing, DEC-20261013-03 is not on main as precondition 4 states, git apply fails, the decision identifier is used anywhere precondition 5 does not allow, any fact in precondition 6 is false, any path other than the two would change, git diff --check flags any line, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, and the preconditions, each result with full SHAs, hashes, line and byte counts, and the host from uname -s, which must be Darwin.
2. The commit: full 40-character SHA, the two paths, the diff stat, the cmp result, and the spec's new hash.
3. The secret-scan hits and their classification.
4. attribution-shape-check results in pr and prbody modes.
5. The PR number, its head SHA and state, the checks that have started, and the count of square brackets in the body.
6. Deviations from this prompt, or the word none.
7. The single next decision for the Founder: marking the PR ready under a separate authorization naming its head.
