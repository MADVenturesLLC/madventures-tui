FOUNDER-ACT-20261031-TUI-AGENTS-MERGE-RULE: bring madventures-tui's AGENTS.md merge rule into line with FounderOS DEC-20261027-01

> **Status:** ISSUED
> **Identifier:** `DEC-20261031-01`
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `189c2c12fb0147909f0b8fdc550affca92e70156`
> **Act SHA-256:** `062141c4df99515495d0008399600fd8f457f46273a7c43de80ca90c8eeb2000`
> **Signed:** in builder session `session_0154gbo6f46n7Zx22FjZTwv2`, which received the signature at 2026-10-31T21:38:10Z by its clock; the signature line is reproduced verbatim below the act
> **Extraction:** the act's text is every line strictly between the line `<!-- BEGIN ACT TEXT -->` and the line `<!-- END ACT TEXT -->`, each line with its trailing newline; those bytes hash to the SHA-256 above

<!-- BEGIN ACT TEXT -->
FOUNDER-ACT-20261031-TUI-AGENTS-MERGE-RULE: bring madventures-tui's AGENTS.md merge rule into line with FounderOS DEC-20261027-01
Repository: MADVenturesLLC/madventures-tui, main at 189c2c12fb0147909f0b8fdc550affca92e70156 when this act was drafted.
Acts under: FounderOS DEC-20261027-01 clause 8, as corrected by FOUNDER-RULING-20261027-MILESTONE-AUTH-CORRECTION (SHA-256 29550ffe84132f9a67bf1db31a107d59ee83eb6bf97ac4a1b8961f6eb1462299) and merged on FounderOS main as d46737c218b2cc61a1b759645c46312d3764dbb8; this repository's DEC-20261015-05 B3 and B4.
Assigned to: the builder role, on claude-code, in a builder session other than session_0154gbo6f46n7Zx22FjZTwv2, which drafted this act.
I, Michael Daley, Founder of MAD Ventures, direct as follows. This act takes effect when I sign it in the builder's session.

Part A: Basis
A1. FounderOS DEC-20261027-01 clause 8 narrows this repository's per-PR merge act to the DEC-20260718-04 clause 1 trigger set, read against this repository's governance paths. It takes effect only when a pull request amending this repository's AGENTS.md to match clause 8 merges.
A2. The AGENTS.md merge bullet on main at 189c2c12fb0147909f0b8fdc550affca92e70156 came from pull request 199 (merged as 1b000cf) and from C2 of this repository's DEC-20261028-02 (filed in pull request 204). It does not match clause 8:
  1. It lists "which no milestone authorization names" as a stop condition, which cancels the narrowing its next sentence states.
  2. It lets a milestone authorization cover a governance-path pull request, which clause 4 forbids.
  3. It says a milestone authorization here is a Founder act filed under docs/decisions/, where clause 7 makes it a comment on a milestone carrier issue.
  4. It omits clause 8's "any other governance instrument of that repository".
A3. I merged pull request 199 myself on 2026-10-27. This act records that its authorization was not posted on the pull request, as DEC-20260718-04 clause 4 requires, and replaces its text.
A4. The two lines that DEC-20261028-02 C2 inserted into AGENTS.md are part of the text this act replaces. To that extent this act supersedes DEC-20261028-02 C2. Nothing else in DEC-20261028-02 changes.

Part B: The change
B1. In AGENTS.md, under "Approval gates — stop", the bullet that begins "- Merging a pull request that touches a governance path" is replaced, through and including the line ending "merges on those checks with no per-PR Founder act.", by exactly the text between the BEGIN and END lines below, which are not part of it:
BEGIN
- Merging a pull request that touches a governance path of this
  repository — `docs/decisions/`, `AGENTS.md`, `SECURITY.md`,
  `CONTRIBUTING.md`, `.github/`, `packages/founder-act/`, or any other
  governance instrument of this repository — or whose thread carries a
  canonical deferral ("requires founder ruling", "awaiting founder
  authorization" or "founder-gated"), or which an open `HO-*` handoff
  references, or which carries a `needs-founder-auth` label. Each such pull
  request needs its own Founder act naming its exact head SHA. A milestone
  authorization under FounderOS `DEC-20261027-01` never covers it (that
  decision's clause 4). FounderOS `DEC-20261027-01` is not this
  repository's `DEC-20261027-01`. Where it is unclear whether a pull
  request falls under this bullet, it does.

  Any other pull request needs no per-PR Founder authorization act. Once
  the required checks on `main` (`Verify`, `Verify (macOS)` and
  `code-review`) pass at its head, the Founder may merge it on them
  (FounderOS `DEC-20261027-01` clause 8). Agents still never merge.
END
B2. No other line of AGENTS.md changes.
B3. The same pull request files this act under DEC-20261015-05 B3, verbatim and with my signature line and its time, under the identifier and header this repository's most recent issued act uses. Extracting the act's text from the filed record reproduces its SHA-256.

Part C: The work
C1. One docs-only pull request, from a new branch off main, makes the change of B1 and the filing of B3, and changes nothing else.
C2. File writes go through local git, never a GitHub API file-write tool. Every commit carries Role-Id: builder, the session's Actor-Id and Execution-Surface: claude-code, each trailer line at 72 characters or fewer.
C3. The pull request is opened as a draft and leaves draft only under DEC-20261015-05 B4. The required checks pass at its final head.
C4. The pull request body is set last, after the review bots finish. It states A2's four mismatches, A3 and A4, B1 as applied, and the Attribution block.
C5. The builder prepares a Tier-2 review prompt for the final head under this repository's own Tier-2 practice, on a surface other than claude-code, for me to run. The builder does not run, dispatch or simulate the review.

Part D: Stop and report, without working around it
- The bullet on main differs from the text A2 describes.
- Another line of AGENTS.md states the merge rule in a way B1 would contradict.
- The identifier for B3 is unclear under this repository's rules, or it is already taken.
- A required check fails for a reason the two changed paths cannot fix.

Part E: Not authorized
- Merging.
- Any change in FounderOS or founder-os-build-room.
- Any change to required checks, rulesets, CODEOWNERS or security posture.
- Any other change to DEC-20261028-02 or to any other decision record.
- Posting any authorization or verdict, or anything as me.
This pull request touches AGENTS.md and docs/decisions/. It needs its own Tier-2 review and my individual authorization naming its exact head, in the form this repository uses. The narrowing takes effect only when it merges.

Part F: Report
The final head SHA; each commit; the identifier B3 used; check results with run ids; the Tier-2 prompt's path.

Part G: Signature
Signed: Michael Daley
Date: 2026-10-31 (UTC)
Actor-Id: founder
<!-- END ACT TEXT -->

FOUNDER SIGNATURE LINE, verbatim, received 2026-10-31T21:38:10Z:

I sign FOUNDER-ACT-20261031-TUI-AGENTS-MERGE-RULE as the builder delivered it in this session (SHA-256 062141c4df99515495d0008399600fd8f457f46273a7c43de80ca90c8eeb2000).
