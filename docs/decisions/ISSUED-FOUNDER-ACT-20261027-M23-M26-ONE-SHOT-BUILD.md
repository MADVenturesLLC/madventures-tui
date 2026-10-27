FOUNDER-ACT-20261027-M23-M26-ONE-SHOT-BUILD: the M23 to M26 single-run build

> **Status:** ISSUED — signed by the Founder 2026-10-27. See `## Founder Signature`.
> **Supersedes:** `FOUNDER-ACT-20261027-M23-M26-STANDING-COMMISSION-FOR-SIGNATURE.md`
> (same range, per-task halts removed but a per-milestone PR retained). That draft
> is retained unedited as history; this act replaces its delivery unit.
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `1b000cf0569abbe54ced3ca725c980914d015841`
> **Binding base:** the `origin/main` commit the builder prompt names, which must contain this act
> **Read with:** `AGENTS.md`; plan §4, §5 execution rules, §10, §11.3, and the task files for M23, M24, M25 and M26; `FOUNDER-ACT-20261027-M22-EXECUTION-AUTHORIZATION`; `DEC-20261022-01` D1–D3; `DEC-20261023-01` Part B; FounderOS `DEC-20261027-01`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The two rules this act changes.** Plan §5 states verbatim:

> Step 8 halts. Do not begin the next task until the Founder authorizes it. Per-task authorization is deliberate Founder policy for Phase 3A — stricter than rubric §7.2's per-milestone minimum — and is not a plan error.

And `FOUNDER-ACT-20261027-M22-EXECUTION-AUTHORIZATION` B1 states, verbatim, that each build "lands as its own pull request with its own Tier-2 review and merge authorization."

Together those produce one founder act and one review per task, and one PR per build. This act replaces both **inside M23 to M26 only**.

A2. **Why the range can carry it.** The remaining range is four milestones whose deliverables, files, tests and RED runs are already written down in plan §4 and §5 by someone other than the agent that will execute them. The stop condition is therefore not the Founder's judgment; it is a checklist.

A3. **What was checked.** The drafting assistant read, at the commit in the header: plan §4 milestone table, §5 execution rules, §10 stop conditions, §11.3, the M23, M24, M25 and M26 task files, `AGENTS.md`, and the M22 act. It ran no test.

A4. **The drafting assistant.** It drafted this act. That is not an independent review.

## Part B: Founder rulings

B1. **One run, one branch, one pull request.** This act authorizes M23, M24, M25 and M26, in that dependency order, as **one continuous build** on branch `build/m23-m26`, delivered as **one pull request**, reviewed once at its final head. The per-task authorization rule of plan §5 does not apply inside this range. It continues to apply to every task outside it.

B2. **The draft PR opens on day one.** The operator opens the pull request in draft immediately after the branch's first commit, so CI runs on every subsequent push. A draft pull request is not an authorization to merge and nothing in this act permits undrafting it before the review of B6.

B3. **Who pushes.** The builder may push **only** to `build/m23-m26`. It may not push to `main`, open or merge a pull request, post a comment, or run any `gh` command — `DEC-20261023-01` B7 otherwise stands unchanged. Opening the draft pull request and posting the final review are the operator's acts.

B4. **Machine gates run inside the loop and are never escalated.** Each task's focused test, its RED run failing for the named reason, the break that proves it, `bunx tsc --noEmit`, the forbidden-import scan and the relevant package suite run as the task proceeds. A red gate stops that task, not the build. The Founder is not asked about a red gate.

B5. **What must still stop.** This list is closed and exhaustive. The build halts and returns to the Founder when, and only when:

1. **Governing text conflicts** and plan §5's precedence order does not resolve it, or the work would contradict a ratified decision.
2. **A plan §10 stop condition fires.**
3. **Scope would expand** beyond the milestone's task file — a file outside its Files list other than one its Deviations rule permits, a new dependency, a weakened start gate, or any touch of `docs/superpowers/specs/**` or `docs/decisions/**`.
4. **A credential, spend, provisioning, deployment or security-posture act is required.**
5. **A required surface is unavailable** and no declared fallback is standing.
6. **A Tier-2 verdict is FAIL** and the finding cannot be remedied inside the single correction round of B7.

Everything else proceeds. Ambiguity that is not one of the six does not halt the build.

B6. **One review at the end.** The build is reviewed once, by an independent Tier-2 reviewer on a surface other than the builder's, at the pull request's final exact head. The reviewer receives: the build log of B8, the diff by file, and the command log. It does **not** receive a summary written by the builder — a reviewer that sees only the summary approves the summary. A `FAIL` returns the build to B5 item 6.

B7. **One correction round.** Findings are folded into one new commit, checks re-run at the new head, and the review re-requested there. A second round requires B5 item 6.

B8. **The build log is the record and the resume point.** The builder appends to `docs/verification/m23-m26-build-log.md` after every task: task id, base SHA, head SHA, commands run with exit status, tests added with counts, deviations, and any halt with its B5 class. A build that dies resumes from this log rather than from zero. The log is written continuously, not at the end.

B9. **Closing.** M26 closes Phase 3A's milestone sequence. The Phase 3A completion ruling, Phase 3B certification, activation, and everything in plan §11.3 as a round are **not** authorized here.

B10. **Not authorized.** No task outside M23 to M26. No reopening of a merged milestone. No change to plan text, dependency graph or milestone sequence. No change to `AGENTS.md`, `docs/decisions/**` or `docs/superpowers/specs/**` except the build log of B8. No production routing of `pty_input` and `pty_resize` — that stays deferred under M22 B9. No spend, provisioning, deployment, credential or security-posture act. No merge.

## Part C: Stop contract

The build is complete — and only then does it report done — when all of the following hold at one head:

1. Every M23, M24, M25 and M26 deliverable in plan §4 exists and its task file's acceptance steps are met.
2. Every test the four task files name exists, and each was proven to fail for the named reason before its change and to fail again when that change is removed.
3. `bunx tsc --noEmit` exits 0; `bun test` reports 0 fail; the file counts stated in the build log match a live run.
4. No file outside the four milestones' declared scopes is modified, apart from recorded Deviations.
5. The build log is complete through M26 and its own counts match the live suite.

A build that cannot meet every line reports which line it cannot meet and stops. It does not declare completion on a subset.

## Part D: Filing

D1. One docs-only pull request files this act. The build starts only after it merges.

## Part E: Signature

Signed by the Founder, date and identity to be completed at signature. This draft carries no authority until then. The drafting assistant may not sign it, post it as signed, or treat this file as effective.

## Founder Signature (2026-10-27)

**Signed, verbatim:** "signed and approved. open PR" — the Founder's instruction
in session on 2026-10-27, given in reply to the three acts presented together: this
one, `ISSUED-FOUNDER-ACT-20261027-PHASE4-ONE-SHOT-BUILD.md`, and
`ISSUED-FOUNDER-ACT-20261027-MADMIK3-CLOSEOUT.md`.

**Bound identity.** The text signed is the draft as presented to him: file
SHA-256 `a4986e5aeace1fcd61d316a1487483c980e6bfa959d7b4489853325630b90f09`,
7527 bytes, 81 lines, `status: FOR SIGNATURE`. The file was renamed to the
`ISSUED-` prefix at signature; no clause was amended.

**What the instruction authorises.** "open PR" authorises filing this act through
its own pull request. It does not by itself start the build: the build begins only
under B1's terms, from a binding base that contains this act merged, and it is that
document — not this instruction — that authorises the run.

**Mechanism.** Conveyed in session, not as a GitHub comment. This section is the
recording act, performed by `strategist` (Hermes agent) at the Founder's direction.
**The recorder does not sign.** This section records a ruling and creates no
authority of its own.

— Drafted for signature by `strategist` (Hermes agent), `hermes-local-code`, 2026-10-27, at the Founder's direction "i want the same for the buildroom, madmik3 as well", read with the preceding "how can I get an agent just to do the whole build at once? than a review once completed?".
