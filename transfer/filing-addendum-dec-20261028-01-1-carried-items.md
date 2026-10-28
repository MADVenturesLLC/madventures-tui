ADDENDUM 1 TO THE DEC-20261028-01 FILING PROMPT: the carried items in the closure entry. Paste this into the Claude Code session that opened pull request 203, or, if that session has ended, as the first message of a new Claude Code session started by the Founder's launch command in the same clone, /Users/michaeldaley/madventures-tui-dec-20261028-01-filing. It is signed by the Founder and is part of the filing prompt, whose rules on identity, attribution-shaped lines, the secret scan, pushing and posting stand unchanged.

1. Why. DEC-20261028-01 C1 says the fourth log entry records the items of its B4. The entry as filed only points to B4, and Copilot's comment 4400927375 on pull request 203 says so. The closure entry of M20 names each carried item. The entry must too.
2. Identity and state. Run pwd, which must be /Users/michaeldaley/madventures-tui-dec-20261028-01-filing, and gh api user --jq .login, which must print daley40-lab. Run git fetch origin docs/dec-20261028-01-filing main. The branch docs/dec-20261028-01-filing must be checked out at 2c32cb42cb5afa50c1a9f262706b834750085d66, equal to its origin, with a clean tree, and origin/main must be 2b47fea87a766c345ab295ffb3342d6be445c231 or a descendant whose changes touch no path under docs/verification/ and add no file whose name begins DEC-20261028-01. If any of this differs, stop.
3. The change. In docs/verification/phase-3a-correction-rounds.md, replace exactly this one line, which must occur exactly once:
- **Carried forward:** the items of `DEC-20261028-01` B4, for later acts.
with exactly these six lines:
- **Carried forward (act B4):** the PTY host's loading of a `.env` file from the repository root, and
  the production routing of `pty_input` and `pty_resize`, both in `packages/broker`; tests of a failing
  duplicate lookup in `publish` and `publishIncident`, and of a refused duplicate that builds no record;
  a `packages/pty-host` test of the child's environment when the host's holds more; `test/phase3a` tests
  of refused input and resize, a clean exit on SIGINT, the returned session by `Reflect.ownKeys`, and a
  refused command in the third environment test; and the items of `DEC-20261027-01` B9, unchanged.
- **Limitations stated:** the PTY host environment capture is what the build hands the host; no session
  path exercises the redaction of a secret-marked value; the Task 49 fixture uses Bun's `_refreshSize`.
Change nothing else in that file or in any other file. Show git diff, which must replace one line with eight and touch nothing else.
4. Commit and push. One new commit on top of 2c32cb42cb5afa50c1a9f262706b834750085d66, with the subject docs: list the M22 carried items in the closure entry, a body that says it answers Copilot's comment 4400927375 under this addendum, and the same three trailers as the first commit. Do not amend, rebase or squash. Run the secret scan over the staged diff, then push with git push origin docs/dec-20261028-01-filing, without force.
5. The description. Update the pull request body with gh api -X PATCH repos/MADVenturesLLC/madventures-tui/pulls/203 -F body=@file, adding one sentence before the trailers that says a second commit lists the carried items of B4 in the closure entry, answering Copilot's comment, under this addendum. Keep zero square brackets and zero bare three-hyphen lines, and keep the three trailers as the final paragraph. Run attribution-shape-check.sh in pr mode on the branch, which must examine both commits, and in prbody mode on the new body.
6. Do not mark anything ready or draft, resolve or reply to the thread, post any comment, merge, re-run any job or touch any other pull request.
7. Report. The new commit's full SHA, its parent, the git diff of the log file, the secret-scan hits, both attribution-shape-check results, the new head of pull request 203, and the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/203 --jq .body | shasum -a 256. Then stop.
