FOUNDER-ACT-20261102-TUI-CONTRIBUTING-MERGE-RULE: bring madventures-tui's CONTRIBUTING.md merge step into line with DEC-20261031-01, and rule how DEC-20261015-05 A3 reads

> **Status:** ISSUED
> **Identifier:** `DEC-20261102-03`
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `0df8cf115279e6d79b415aaa39350e3379ebb49f`
> **Act SHA-256:** `535985b421272841e346d5ac2213383f70cfdc6480f5bcb0ffd82bdacf15005b`
> **Signed:** in builder session `session_013myvS1HZ2LyVFRfx7jy3x6`, which received the signature at 2026-11-02T09:45:14Z by its clock; the signature line is reproduced verbatim below the act
> **Extraction:** the act's text is every line strictly between the line `<!-- BEGIN ACT TEXT -->` and the line `<!-- END ACT TEXT -->`, each line with its trailing newline; those bytes hash to the SHA-256 above

<!-- BEGIN ACT TEXT -->
FOUNDER-ACT-20261102-TUI-CONTRIBUTING-MERGE-RULE: bring madventures-tui's CONTRIBUTING.md merge step into line with DEC-20261031-01, and rule how DEC-20261015-05 A3 reads
Repository: MADVenturesLLC/madventures-tui, main at 0df8cf115279e6d79b415aaa39350e3379ebb49f when this act was drafted.
Acts under: this repository's DEC-20261031-01, merged as 0df8cf115279e6d79b415aaa39350e3379ebb49f; item 6 of my merge authorization of pull request 207, comment 6566913787; this repository's DEC-20261015-05 B3 and B4.
Assigned to: the builder role, on claude-code, in a builder session other than session_013myvS1HZ2LyVFRfx7jy3x6, which drafted this act.
I, Michael Daley, Founder of MAD Ventures, direct as follows. This act takes effect when I sign it in the builder's session.

Part A: Basis
A1. DEC-20261031-01 merged on 2026-11-02 as 0df8cf115279e6d79b415aaa39350e3379ebb49f. The merge bullet of AGENTS.md now requires a Founder act naming the exact head for a pull request that touches a governance path, carries a canonical deferral, is referenced by an open HO-* handoff or carries a needs-founder-auth label, and lets the Founder merge any other pull request on its required checks with no per-PR act.
A2. Step 6 of "How work enters this repository" in CONTRIBUTING.md, at 0df8cf115279e6d79b415aaa39350e3379ebb49f (file SHA-256 f13e024d24cfcf2f0f4aaba39bd6b11b18bdee389fcbcf15f3e3ad78becd9781), still says that every merge happens only after a Founder-authored authorization naming the exact head. The Tier-2 review of pull request 207 recorded this as advisory F2, and Copilot's thread r4437452542 on that pull request recorded it as a conflict.
A3. DEC-20261015-05 B1 requires each Phase 3A task to land as its own pull request with its own merge authorization, and its B5 sets that authorization's form. Its A3, first bullet, describes the approval gates of AGENTS.md as requiring a separate authorization naming the exact head for each merge. DEC-20261031-01 did not amend DEC-20261015-05.
A4. Item 6 of my merge authorization of pull request 207 ruled how these texts read together until a later act, and directed that the next act touching CONTRIBUTING.md or DEC-20261015-05 align CONTRIBUTING.md step 6 and DEC-20261015-05 A3 with that reading. This is that act.

Part B: Rulings and the change
B1. DEC-20261015-05 B1 and B5 stand unchanged. Every Phase 3A task pull request needs its own merge authorization naming its exact head, whatever paths it touches.
B2. DEC-20261015-05 A3, first bullet, describes the approval gates of AGENTS.md as they stood when I signed that act. From the merge of pull request 207 on, its words "each merge needs a separate authorization naming the exact head" apply to the pull requests that the merge bullet of AGENTS.md names, to the pull requests that DEC-20261015-05 B1 names, and to any pull request another act of mine requires it for, and to no other pull request. No text of DEC-20261015-05 changes.
B3. In CONTRIBUTING.md, under "How work enters this repository", the item that begins "6. Merge happens only after a Founder-authored authorization that names the" is replaced, through and including the line ending "Founder explicitly directs it.", by exactly the text between the BEGIN and END lines below, which are not part of it:
BEGIN
6. A merge needs a Founder-authored authorization that names the **exact**
   head SHA (full 40 characters) when the pull request falls under the
   merge bullet of "Approval gates — stop" in `AGENTS.md`, or when an act
   of the Founder requires one, as `DEC-20261015-05` B1 does for every
   Phase 3A task pull request. Where it is unclear whether one is needed,
   it is. Any other pull request may be merged by the Founder once the
   required checks above pass at its head (FounderOS `DEC-20261027-01`
   clause 8). Green CI is not merge authorization where one is needed.
   Agents never merge. Do not push to `main`. Do not use `--admin` unless
   the Founder explicitly directs it.
END
B4. No other line of CONTRIBUTING.md changes.
B5. The same pull request files this act under DEC-20261015-05 B3, verbatim and with my signature line and its time, under the identifier and header this repository's most recent issued act uses. Extracting the act's text from the filed record reproduces its SHA-256.

Part C: The work
C1. One docs-only pull request, from a new branch off main, makes the change of B3 and the filing of B5, and changes nothing else.
C2. File writes go through local git, never a GitHub API file-write tool. Every commit carries Role-Id: builder, the session's Actor-Id and Execution-Surface: claude-code, each trailer line at 72 characters or fewer.
C3. Before any GitHub operation, the builder confirms the GitHub identity its session acts as. If that identity is daley40-lab, the builder may push the branch and open the pull request as a draft. If it is any other identity, the builder makes no GitHub call, and reports the branch, its head and the pull request body for me to push and open.
C4. The pull request leaves draft only under DEC-20261015-05 B4. The required checks pass at its final head.
C5. The pull request body is set last, after the review bots finish. It states A2, A3, B1 and B2, B3 as applied, and the Attribution block.
C6. The builder prepares a Tier-2 review prompt for the final head under this repository's own Tier-2 practice, on a surface other than claude-code, for me to run. The builder does not run, dispatch or simulate the review.

Part D: Stop and report, without working around it
- Step 6 of CONTRIBUTING.md on main differs from the text A2 describes.
- Another line of CONTRIBUTING.md states the merge rule in a way B3 would contradict.
- The merge bullet of AGENTS.md on main differs from the text DEC-20261031-01 B1 set.
- The identifier for B5 is unclear under this repository's rules, or it is already taken.
- A required check fails for a reason the two changed paths cannot fix.

Part E: Not authorized
- Merging.
- Any change to AGENTS.md, to the text of DEC-20261015-05, or to any other decision record.
- Any change in FounderOS or founder-os-build-room.
- Any change to required checks, rulesets, CODEOWNERS or security posture.
- Posting any authorization or verdict, or anything as me.
This pull request touches CONTRIBUTING.md and docs/decisions/. It needs its own Tier-2 review and my individual authorization naming its exact head, in the form this repository uses.

Part F: Report
The final head SHA; each commit; the identifier B5 used; check results with run ids; the Tier-2 prompt's path.

Part G: Signature
Signed: Michael Daley
Date: 2026-11-02 (UTC)
Actor-Id: founder
<!-- END ACT TEXT -->

FOUNDER SIGNATURE LINE, verbatim, received 2026-11-02T09:45:14Z:

I sign FOUNDER-ACT-20261102-TUI-CONTRIBUTING-MERGE-RULE as the builder delivered it in this session (SHA-256 535985b421272841e346d5ac2213383f70cfdc6480f5bcb0ffd82bdacf15005b).
