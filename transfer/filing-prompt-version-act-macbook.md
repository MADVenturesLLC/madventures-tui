STEP: file DEC-20261013-05 (Claude Code 2.1.296) and apply its patch. Paste this as the first message of a new Claude Code session started on the Founder's MacBook, after loading the agent environment file the launcher uses, from inside the fresh clone /Users/michaeldaley/madventures-tui-version-act-filing, detached at the origin/main commit the Founder's clone command recorded.

You are the filing session for the Claude Code version act in MADVenturesLLC/madventures-tui. You work in a Claude Code session on the Founder's MacBook. Land the change as one commit on a branch named registry/claude-code-2-1-296 and open one DRAFT pull request.

FIRST: YOUR WORKING DIRECTORY
Run pwd. It must be /Users/michaeldaley/madventures-tui-version-act-filing. If it is not, stop now and report FOUNDER_DECISION_REQUIRED without doing anything else; do not work in another directory.

ASSIGNED ROLE AND ATTRIBUTION
Role-Id: builder
Actor-Id: session:claude-code/tui-version-act-filing
Execution-Surface: claude-code
Use exactly these three trailers as the final paragraph of your commit message and of the pull request body, after any Co-Authored-By line, with a blank line before them and no bare three-hyphen line anywhere in either.

WHY
The Founder signed FOUNDER-ACT-20261013-CLAUDE-CODE-2-1-296 on 2026-10-13. The Task 45 host-facts check found Claude Code 2.1.296 on both certification hosts, while the registry and PLAN-OPEN-1 support only 2.1.233. The act ratifies an exact patch that makes 2.1.296 the one supported version in the Claude Code registration, its test, PLAN-OPEN-1's table and PLAN-OPEN-2's auth note, and changes nothing else. It also records the host facts and the Founder's own installation on the Ubuntu PC, and moves the Task 45 binding base to the merge of this act. Its part C1 says one pull request files the act, applies the patch and changes nothing else. There is no rounds-log entry.

AUTHORITY
Read AGENTS.md first. This host is macOS: use shasum -a 256. Name every commit by its full 40-character SHA and every artifact by its full 64-character SHA-256. Read both transfer inputs:
  git fetch origin claude/awesome-cray-vqrzbt
  git show 8a8765c3846157cde6ee6d47e99c85ae433e3d53:transfer/DEC-20261013-05-claude-code-2-1-296.md
  git show 8a8765c3846157cde6ee6d47e99c85ae433e3d53:transfer/claude-code-2.1.296.patch
Read the act in full before you write anything. Install nothing beyond bun install --frozen-lockfile in this clone, and run no test other than those named below. Do not run madbridge-claude-v5, claude or any provider executable.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main. Report its SHA. It must be 4b1bbebc9db1dfe8e3176bcccd30ba9cf2106491, or a descendant whose changes since that commit touch only paths under docs/ other than docs/decisions/PLAN-OPEN-1-identity-authentication.md and docs/decisions/PLAN-OPEN-2-environment-allowlists.md. Report every changed path. HEAD equals origin/main and the working tree is clean. The branch registry/claude-code-2-1-296 must not exist on origin.
2. At transfer commit 8a8765c3846157cde6ee6d47e99c85ae433e3d53: transfer/DEC-20261013-05-claude-code-2-1-296.md has SHA-256 314b3fc57e7f6d8ff2ebf281429760a7461729c01d3aa2e0e4465b513795431e, 66 lines, 7,088 bytes; transfer/claude-code-2.1.296.patch has SHA-256 13d2c0836f627e3675ab8c83b677f593f534d5099da4e69cc3ef6984478856ae, 3,018 bytes. If either differs, stop.
3. The act has Status ISSUED and the signature (Michael Daley, Date 2026-10-13, Actor-Id: founder), no square bracket, no bare three-hyphen line, no run of underscores, none of the strings FOUNDER CHOICE, FOUNDER CONFIRM or "to be completed", and the word DRAFT nowhere in capitals. Report each result.
4. On origin/main these files have these SHA-256 values: packages/protocol/src/adapter-registry.ts 7d8b4ecb5c743434f23f1f387d27286aadd0e20c97a64746b96c8b67ec8bd976; packages/protocol/test/adapter-registry.test.ts e48f8398cd657644cc0ada386e2a5bd5648f8fb3b7760a5da6720bb44f7316e4; docs/decisions/PLAN-OPEN-1-identity-authentication.md 196b91b8c9ffbda3d4319c4a8abc96c20ffe16950ba23864eb8780de356f5aee; docs/decisions/PLAN-OPEN-2-environment-allowlists.md 7ceb367c48adb1954e107ed7cdfd5578277f88c1acadb21561e043d24a95417f.
5. docs/decisions/DEC-20261013-05-claude-code-2-1-296.md does not exist on origin/main, and the identifier DEC-20261013-05 is not used by any file under docs/ on origin/main.
6. Check the facts the act cites. Stop and report if any is false: on origin/main, the Claude Code entry of the registry and of its test each has a supported_versions list holding exactly one version, 2.1.233, written once; PLAN-OPEN-1's table row for supported_versions holds exactly 2.1.233; PLAN-OPEN-2 says "The verified `claude auth status` output for Claude Code 2.1.233 is:"; DEC-20261013-01 on origin/main names the binding base 435dfe7c05db4fa0db4f9d9b011db6d0cd39b3d2 and its D1 checks the plan and both rulings against header values; and at transfer commit 2610f02bdc62d91cb3f5e3d4f1ef02eb38b7491d, transfer/task45-host-facts.py has SHA-256 505a1443f5140c2c78e3bb7f5fa0ff6c89c62828e933c42b6f3f5797f388bae9.
7. gh api user --jq .login prints daley40-lab, with GH_TOKEN set as the session provides it. Do not run gh auth status, and never print a token or any part of one. Run gh normally. On any 401, stop and report. Never use env -u GH_TOKEN or the keyring. If this session has no agent identity, stop and report before any commit.

ALLOWED SCOPE
One commit, exactly five paths:
  docs/decisions/DEC-20261013-05-claude-code-2-1-296.md (new, byte for byte from the transfer blob)
  packages/protocol/src/adapter-registry.ts (changed only by the patch)
  packages/protocol/test/adapter-registry.test.ts (changed only by the patch)
  docs/decisions/PLAN-OPEN-1-identity-authentication.md (changed only by the patch)
  docs/decisions/PLAN-OPEN-2-environment-allowlists.md (changed only by the patch)

APPLYING THE PATCH
Extract the patch to a temporary file outside the clone. Run git apply --check on it, then git apply. Do not edit any hunk and do not regenerate the patch. Afterwards these files must have these SHA-256 values: adapter-registry.ts 3129d3cead6312e4cb90eb6832e6a46597f3d352254021d5929b82ec651f4566; adapter-registry.test.ts 979d6e7d06c64c5a19ef2fdc1bb05db72fd2002b5348638770d2e38ef1326250; PLAN-OPEN-1 d40682beb5a5c3f617638b1775f3777e25c66e12787b9269141164dcc3d9bc42; PLAN-OPEN-2 b60676aa47b216c36d9080c884650943cdac93dd12109d2864ebcf0eb6887d8c. git diff --check must be clean. If git apply fails or any value differs, stop.

LOCAL CHECK
Run bun install --frozen-lockfile with the Bun on PATH; it must leave bun.lock byte-identical. If it turns packages/founder-act/src/main.ts to mode 100755 with no content change, restore 100644 and report it. Then run bunx tsc --noEmit and bun test packages/protocol once each, and report the exit code, the pass and fail counts and the duration. tsc must exit 0 and every protocol test must pass; any failure is a stop. Before committing, git status --porcelain must list only the five allowed paths.

COMMIT AND PULL REQUEST
- Commit subject: feat(protocol): support Claude Code 2.1.296 and file DEC-20261013-05. The body says the Founder signed DEC-20261013-05 on 2026-10-13; that the Task 45 host-facts check found Claude Code 2.1.296 on both certification hosts; that the act ratifies the patch with SHA-256 13d2c0836f627e3675ab8c83b677f593f534d5099da4e69cc3ef6984478856ae, which makes 2.1.296 the one supported version in the Claude Code registration, its test, PLAN-OPEN-1's table and PLAN-OPEN-2's auth note, and changes no other field; that it records the host facts and the Founder's installation on the Ubuntu PC and moves the Task 45 binding base to the merge of this act; that it adds no round; that the act and patch come from transfer commit 8a8765c3846157cde6ee6d47e99c85ae433e3d53; and that no other path changes. Then the Co-Authored-By line your tooling adds and the three trailers.
- Run the CONTRIBUTING.md secret scan over the staged diff before you commit, and classify each hit as CONTRIBUTING.md says. A hit that is an actual credential value is a stop.
- cmp the committed act against the transfer blob, and report that the bytes match. Report the new SHA-256 of each patched file.
- Push the branch with git push -u origin registry/claude-code-2-1-296. Do not force-push. If the push is refused for any reason, do not retry or work around it: stop, report the commit SHA and the error text, and save the prepared PR title and body to files under /tmp. The Founder will push the branch and then tell you to continue.
- Open a DRAFT pull request against main. Read the body of PR 145 with gh api repos/MADVenturesLLC/madventures-tui/pulls/145 --jq .body and mirror its structure: what and why, the paths changed, the hashes, the preconditions with results, the verification you ran, not-run items, deviations, not done, then the three trailers as the final paragraph. Create it with gh api repos/MADVenturesLLC/madventures-tui/pulls -f title=... -F body=@file -f head=registry/claude-code-2-1-296 -f base=main -F draft=true, not gh pr create. Before you create it, check that the body has zero bare three-hyphen lines and zero square brackets anywhere, including the line that names Claude Code: write that line as plain text without a link.
- Run .github/scripts/attribution-shape-check.sh in pr mode on the branch and in prbody mode on the body, and report both results.
- The PR stays a draft. Do not mark it ready, do not merge, do not re-run any job, do not touch any other pull request, do not resolve threads, do not post any authorization, and post no comment of your own, on this PR or any other.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when your working directory is not the named clone, a hash, line count or byte count differs, the transfer commit or a blob is missing, git apply fails, bun install changes the tree beyond the mode restore, tsc fails or any protocol test fails, the decision identifier is already used, any fact in precondition 6 is false, any path other than the five would change, git diff --check flags any line, the secret scan finds a credential value, the branch exists on origin, the push is refused, or gh returns 401. State what passed, what failed, what is unchanged, and the single next decision.

FINAL REPORT (in this order)
1. Your working directory, and the preconditions, each result with full SHAs, hashes, line and byte counts, and the host from uname -s, which must be Darwin.
2. The commit: full 40-character SHA, the five paths, the diff stat, the cmp result, and the new hash of each patched file.
3. The local check: bun install result, any mode restore, and the tsc and protocol test results.
4. The secret-scan hits and their classification.
5. attribution-shape-check results in pr and prbody modes.
6. The PR number, its head SHA and state, the checks that have started, and the count of square brackets in the body.
7. Deviations from this prompt, or the word none.
8. The single next decision for the Founder: marking the PR ready under a separate authorization naming its head.
