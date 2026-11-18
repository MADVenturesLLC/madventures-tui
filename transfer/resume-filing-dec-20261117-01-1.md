STEP: resume the filing of DEC-20261117-01 under its Addendum 1. This is the Founder's signed resume message 1 for this filing session.

Your stop report was correct. The workflows load the Bun setup action from the pinned commit d057994a6663a7b56f5603f109b33d79bef333ef, so the patch on your branch reached no job. On 2026-11-18 the Founder signed DEC-20261117-01 Addendum 1. Its B1 authorizes one further commit on docs/dec-20261117-01-filing: repin the five Setup Bun lines to 07f9620159b44a62669aa191d572adc21501672b, your first commit, which holds the patched action, and add the addendum. Every rule of your filing prompt stays in force, except where this message changes it. Read the addendum in full before you write anything.

FIRST
Run the identity checks of your filing prompt again: pwd, gh api user --jq .login, git config user.name and user.email, and the origin remote's scheme. Any difference is a stop. Confirm counts with /usr/bin/grep, as before.

PRECONDITIONS (verify each, and report each result)
1. git fetch origin main docs/dec-20261117-01-filing claude/awesome-cray-vqrzbt. You are on branch docs/dec-20261117-01-filing. HEAD and origin/docs/dec-20261117-01-filing both equal 07f9620159b44a62669aa191d572adc21501672b, and the working tree is clean. Report origin/main. It must be cec21d0f98688b71bef43b3f350fbd14d6606030, or a descendant whose changes since that commit touch no path under docs/decisions/ or .github/. Report every changed path.
2. The latest commit of origin/claude/awesome-cray-vqrzbt that touches transfer/DEC-20261117-01-addendum-1-workflow-pin.md is a9829e42bd353ec6dfaf19b345b440ecfc7cdcd0. There the file has SHA-256 99d2b240ad2ec0527ae0628f2b512d85e309904649731bbab806992f73d71e73, 43 lines, 4,574 bytes and git blob ID 3c7722c1f682fb01d69c96187ba49c448e97fc7d.
3. Check the addendum with grep, and report each count: Status ISSUED; the signature (Michael Daley, the Date 2026-11-18, and the founder Actor-Id line); zero bare three-hyphen lines; zero lines ending in a space; zero square brackets; zero runs of two or more underscores; and the word DRAFT nowhere in capitals. Its one character outside ASCII is the em dash (U+2014) before the name in its signature.
4. On origin/main, docs/decisions/DEC-20261117-01-addendum-1-workflow-pin.md does not exist.
5. At 07f9620159b44a62669aa191d572adc21501672b:
   a. .github/actions/setup-qualified-bun/action.yml has SHA-256 37cb25ba17eca50633bd08d54359921ddc0363b2e612c9d6d4da5b716eabd4c8 and git blob ID 83b9303dc6966aca29a54b04337d7d3ee7d500ce.
   b. Exactly five lines under .github/ name setup-qualified-bun@d057994a6663a7b56f5603f109b33d79bef333ef: verify.yml lines 27 and 79, tui-chaos.yml lines 41 and 77, and code-review.yml line 63, all under .github/workflows/. Quote them with line numbers.
   c. Those three files have SHA-256 values 7709f6011ecf77ef569983b868b513d788f57d026af38f47cbbdd9273c90a37c (verify.yml), 91d2eb433926d50e27bf3922ff329ab37f36ff60c7d20bdcf9a081b11b72ac8f (tui-chaos.yml) and 9c2121d0dcb9249a0486c161c0d8a7de78713f0b8a35d052cd6037b9a992852f (code-review.yml).

ALLOWED SCOPE
One new commit, whose parent is 07f9620159b44a62669aa191d572adc21501672b, with exactly four paths:
  docs/decisions/DEC-20261117-01-addendum-1-workflow-pin.md (new, byte for byte from its transfer blob)
  .github/workflows/verify.yml
  .github/workflows/tui-chaos.yml
  .github/workflows/code-review.yml
Before committing, git status --porcelain must list only those four paths.

THE REPIN
Run exactly this, from the clone's top folder:
/usr/bin/sed -i '' 's/setup-qualified-bun@d057994a6663a7b56f5603f109b33d79bef333ef/setup-qualified-bun@07f9620159b44a62669aa191d572adc21501672b/' .github/workflows/verify.yml .github/workflows/tui-chaos.yml .github/workflows/code-review.yml
Afterwards:
- The SHA-256 values are 39fb44de0e2d5d121f51b49907a215a1684b9c9c1ba938133e5c9ff594b1425a (verify.yml, 105 lines), 7283070ca82c6d598e4e69d0b26f33e8433e6f4f95573f772ce064d05f1fddba (tui-chaos.yml, 96 lines) and b78324a5b7f60b07291bfc3fe40f8bb06b359ca3376be16fab056ae086717e36 (code-review.yml, 244 lines).
- The string d057994a6663a7b56f5603f109b33d79bef333ef appears nowhere under .github/.
- git diff of the three files shows five lines removed and five added, each pair differing only in that commit SHA. Show that diff in full.
If any value differs, stop.

COMMIT
- Subject: ci: pin the workflows to the patched Bun setup action, and file DEC-20261117-01 Addendum 1.
- The body says:
  - the Founder signed DEC-20261117-01 Addendum 1 on 2026-11-18;
  - the five Setup Bun steps named the action at d057994a6663a7b56f5603f109b33d79bef333ef, which holds the unpatched action, so the patch of the previous commit reached no job;
  - this commit repins them to 07f9620159b44a62669aa191d572adc21501672b, the first commit of this pull request, which holds the patched action;
  - it adds the addendum unchanged, from transfer commit a9829e42bd353ec6dfaf19b345b440ecfc7cdcd0;
  - nothing else changes.
  Then the Co-Authored-By line your tooling adds, and the three trailers of your filing prompt.
- As before:
  - run the CONTRIBUTING.md secret scan over the staged diff;
  - run the attribution-shaped-line grep on the commit message;
  - cmp the committed addendum against its transfer blob, and report that its blob ID equals 3c7722c1f682fb01d69c96187ba49c448e97fc7d;
  - run .github/scripts/attribution-shape-check.sh in pr mode on the branch, from cec21d0f98688b71bef43b3f350fbd14d6606030 to the new head.
- Push with git push origin docs/dec-20261117-01-filing. Do not force-push. If the push is refused, stop and report the commit SHA and the error text.

PULL REQUEST 246, AFTER THE PUSH
- Change the title to: ci: keep the custodied Linux Bun after its upstream fix closed stale, and file DEC-20261117-01 with its Addendum 1.
- Rewrite the body so that it describes the whole pull request:
  - both commits, with full SHAs;
  - the six paths and their committed SHA-256 values;
  - both rounds of preconditions with their results;
  - why the repin was needed, and that the addendum amends B4, B6 and B7 of the act;
  - verification, not-run items, deviations (including your first stop), not done, the governance-path sentence, then the three trailers as the final paragraph.
  Remove the sentence of the old body that said its own jobs run with the patched action without the repin. Keep the old body's other rules: zero square brackets, zero bare three-hyphen lines, the Claude Code line as plain text without a link, and no reviewer login.
- Run the attribution-shaped-line grep and attribution-shape-check in prbody mode on the new body and title before you apply them. Apply them with gh api -X PATCH repos/MADVenturesLLC/madventures-tui/pulls/246 -f title=... -F body=@file. Report the body's SHA-256 as printed by gh api repos/MADVenturesLLC/madventures-tui/pulls/246 --jq .body | shasum -a 256.

THE JOBS
- Wait for Verify, Verify (macOS), tui-chaos (ubuntu-24.04), tui-chaos (macOS), validate-code-review and code-review to complete on the new head. Check no more often than every two minutes, and for no more than 45 minutes in all. Report each name and conclusion.
- From the Verify log, quote only these lines. Skip the lines that print the step's script, which also hold these strings inside echo commands.
  - The line that downloads the action repository, which must name 07f9620159b44a62669aa191d572adc21501672b.
  - The emitted notice lines that begin, after the timestamp, with ##[notice] and hold "custody continues under DEC-20261117-01" or "Expiry guard passed".
- If a job fails, quote its first emitted ##[error] line, not a script line, and do nothing about it.
- Report the Cursor Security Agent check, if any, as before.
- The PR stays a draft. Do not re-run any job, mark it ready, merge, request a review, resolve threads, or post any comment.

STOP CONDITIONS
Return FOUNDER_DECISION_REQUIRED and do not improvise when any of these occurs. State what passed, what failed, what is unchanged, and the single next decision.
- An identity check fails, or gh returns 401.
- A precondition fails, or a hash, line count, byte count, blob ID or commit differs.
- The sed leaves a different result, or any path outside the four of ALLOWED SCOPE would change.
- An attribution-shaped line cannot be rewrapped, or the secret scan finds a credential value.
- The push is refused.

FINAL REPORT (in this order)
1. The identity checks and the preconditions, each result with full SHAs, hashes, counts and quoted lines.
2. The commit:
   - its full SHA and its parent;
   - the four paths, the diff stat, and the full diff of the three workflows;
   - the cmp and blob-ID results;
   - the committed SHA-256 of all four files.
3. The attribution-shaped-line checks, the secret scan, and attribution-shape-check in pr and prbody modes.
4. Pull request 246:
   - its head SHA, state and new title;
   - the body's SHA-256 and its count of square brackets;
   - each job with its conclusion, and the quoted log lines.
5. Deviations from this message, or the word none.
6. The single next decision for the Founder: the act naming this pull request's exact head that lets it merge.
