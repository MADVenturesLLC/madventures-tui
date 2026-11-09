DEC-20261108-04 — Phase 3B standing commission: one act for slices H2, M1, M2, M3, M4, M5 and M6

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `1678f18` (2026-11-08, the merge of pull request 231)
> **Governs:** Phase 3B slices H2, M1, M2, M3, M4, M5 and M6; the plan §0A item 1
> requirement for those slices; plan §5 items 8, 11 and 12 as they bear on them
> **Read with:** `DEC-20261108-01` B1, B2, B3, B8, B9, B11, B12, B13 and C1;
> `DEC-20261108-02` B2, B4, B6 and C1; `DEC-20261108-03`; Phase 3B
> plan §0A, §1, §2, §2A to §2D, §3 H2 and M1 to M6, §4, §5 items 7 to 14, §6;
> Phase 3B design §2, §2.2, §2.3, §2.6, §3, §4 and §5; Phase 3A design §1.5,
> §2.1 to §2.3, §4.2, §6.9, §7 and §8; `DEC-20261104-01` B4 and B10 item 3;
> `DEC-20261104-02` Addenda 3 B5 and 4 B3; `DEC-20261102-02` B4 and B5;
> `DEC-20261031-01`; `DEC-20261027-01` A3; `DEC-20261023-01` Part B;
> `DEC-20261015-03` B5 items 2 and 3; `DEC-20261020-01` B2; the Founder's merge
> authorization of pull request 183 item 4a and of pull request 151 item 3a
> (comment 6202101854); `DEC-20261013-03` B2 item 1

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The text this act replaces.** Phase 3B plan §0A item 1 reads, verbatim:

> **One act per slice.** Each slice starts on a Founder act that names its
> binding base (the merge commit of the prior slice, except M7, which works at
> the M6 candidate's head), its builder and branch, the only paths it may
> change, its gates, its closed list of halts, its review, and how its
> verdicts count.

`DEC-20261108-01` B1 item 1 reads, verbatim:

> No slice starts on this act. Each slice starts only on its own act, as plan
> §0A item 1 says.

This act replaces both **for the slices named in Part C only**. M0's act and
M7's act are unaffected and still issue individually. Every other requirement
of §0A and of `DEC-20261108-01` stands.

A2. **Why one act for seven slices.** Measured on this repository on
2026-11-08 across its last 100 merged pull requests: the median interval
between one code pull request merging and the next one being opened is 9.1
hours; with nothing queued for a Founder act that interval is 1.3 hours, and
with three items queued it is 16.3 hours. Nine Phase 3B slice acts remain, each
a separate round trip. This act converts seven of them into one.

A3. **What this act does not touch.** It authorizes no live provider call. It
changes no gate, no merge rule, no attribution requirement, and no path of the
repository outside the slices it names. It rules no plan §5 item that
`DEC-20261108-01` B13 assigns to M0's act or M7's act. It is not a merge
authorization: every slice pull request still merges only on the Founder's
authorization naming its exact head (`DEC-20261104-01` B10 item 3), and every
pull request touching `docs/decisions/` still merges only on a Founder act
naming its exact head (`DEC-20261031-01`).

A4. **The drafting assistant.** A Hermes agent session (Socrates; model
`deepseek-v4.1-flash` on `ollama-cloud`; on the MacBook) drafted this act and
proposed each ruling below, including B5, B6 and B7. None of that is an
independent review, and my adoption of a proposed ruling is a Founder ruling
only because this act, signed, says so.

## Part B: Founder rulings

B1. **The replacement.** For the slices of Part C, the terms §0A item 1
requires are those stated in Part C. The slice starts when the Founder's merge
of the preceding slice has landed at `main`, its own preconditions in B4 are
satisfied, and none of the stop conditions in Part D has fired. No further
Founder act issues to start it.

B2. **Binding bases.** Each slice's binding base is the merge commit of the
preceding slice, as plan §2A states in its table. `main` when work begins, and
its SHA, are recorded in the slice's build log before the first commit; the
base never moves. A re-base is a Founder-approved amendment and is not made by
this act.

B3. **Builder, branch and reviewer.**
1. The builder is Codex, the only Phase 3B builder qualified by
   `DEC-20261108-02` B2, in a fresh session with no MCP server, the git
   identity `daley40-lab`, and no GitHub call, as plan §0A item 2 requires.
2. The branch is `build/3b-<slice>-r1`, with the slice name in lower case, and
   is recorded in the slice's build log before work begins. It does not change.
3. The Tier-2 reviewer of every slice in Part C is a Gemini session on
   Antigravity, because each of these slices is built by Codex and
   `DEC-20261108-01` B8 requires a surface other than the builder's. The checks
   of plan §2C apply to every report; a report that fails them is not posted
   and is not a verdict.
4. Verdicts count against the rubric milestones `DEC-20261108-01` B9 item 2
   assigns to each slice, and no other.

B4. **Preconditions that are not waived.** A slice in Part C starts only when
each item below that names it is in hand. If it is not, the slice stops and
returns to the Founder; it does not start.
1. **H2.** The ruling of plan §5 item 8 in B5 below.
2. **M1.** A Founder act amending the Phase 3A design §1.5 table to add the
   managed-settings branch of plan §5 item 14, which `DEC-20261108-01` B13 item
   6 requires before M1's act. This act does not supply it.
3. **M1 to M6.** M0's merge at `main`, with an admitted `madv-surface`
   registration and its capability records filed. If M0 halts, every slice
   from M1 onward returns to the Founder.
4. **Every slice.** The preflight-caller citations of plan §2D item 13:
   `DEC-20261015-03` B5 items 2 and 3; item 3a of the Founder's merge
   authorization of pull request 151 (comment 6202101854); `DEC-20261020-01`
   B2; and item 4a of the Founder's merge authorization of pull request 183,
   as `DEC-20261027-01` A3 states it. The slice's act of record confirms, for
   its own binding base, that the changes those rulings require are present.

B5. **Plan §5 item 8 — the Linux capability-record shape (H2).**
The host fields of a capability record are: operating-system name and version; kernel release; the surface
executable's SHA-256 and its version; the model reported; the date and time of
the observation with its zone; and the adapter registration the record was
written under. Freshness compares operating-system name and version, kernel
release and executable SHA-256; a record whose four values differ from the
current host is stale and is not used. The store keeps one record per
(host, surface, executable SHA-256), keeps every superseded record, and appends
rather than overwrites. macOS records keep their existing fields and stay
valid; no macOS field is filled with a Linux placeholder. The tests prove that
a stale record is refused, that a superseded record is retained, and that a
macOS record written before this act still validates.

B6. **Plan §5 item 11 — the attestation prompts and the live-call budget.**
Each surface's attestation prompt is the fixed text `Reply with your model identifier and nothing else.`
Its deadline is 30 seconds from send. It may cause at most 2 provider
round-trips and 0 tool calls; exceeding either interrupts the session before
activation. Every start makes, per surface, exactly one attestation call and
no other live call except the auth-readiness probe already registered; a start
whose budget is exhausted fails closed and names the component. M1 enforces
the budget and proves it with a controlled stand-in that exceeds it.

B7. **Plan §5 item 12 — the identity probe's live-call status.** For `madv-surface` the identity probe is a live
call and is counted in B6's per-start budget; it is one request, its argv is
the profile-pinned `auth status --profile minimax` form the registration
names, and its parser is the one M0 builds for this surface alone.

B8. **Task-level detail.** Plan §4 says task-level detail is written at slice
start so that it reflects the code that exists. This act keeps that placement
and rules that the detail is written by the builder in the slice's build
packet, not by a further Founder act, subject to Part D. Where §4 and §0A item
1 could be read to require a Founder-written path list per slice, this act
governs.

B9. **Floors.** The suite floor is 1914 pass and 0 fail across 140 files on
both certification hosts (`DEC-20261108-01` B3). It ratchets as plan §2B
states and never lowers. A slice that lands below the floor does not land.

## Part C: The commission

Each slice below starts on the rule of B1. Its deliverable is the plan §3 entry
named, and it may change only the paths that entry names together with the
tests that prove it, and never a path plan §2 preserves.

**C1. H2 — the capability record for Linux.** Base: the merge of H1. Evidence:
build log. Ruling carried: B5. No live call; no capability record is written in
this slice. If a platform-specific installation input needs a branch, the build
packet states the 3A design §1.5 amendment that allows it and the slice stops
for the Founder, because this act does not amend that table.

**C2. M1 — live composition, health barrier and live attesters.** Base: the
merge of M0. Preconditions: B4 items 2 and 3, and B6 and B7. Deliverable and
evidence: plan §3 M1. Offline; its evidence comes from controlled stand-in
executables and is labelled offline.

**C3. M2 — snapshot projection.** Base: the merge of M1. Deliverable and
evidence: plan §3 M2. Offline. The null-token requirement of
`DEC-20261108-01` B11 is part of this slice: a null `fencingToken`,
including that of the `session_open` row, renders as absence and never as a
number.

**C4. M3 — ordered output frames, input ownership and encoding.** Base: the
merge of M2. Deliverable and evidence: plan §3 M3, including production
`pty_input`/`pty_resize` routing (§2D item 1) and the malformed-frame test
(§2D item 2). Offline.

**C5. M4 — session controls.** Base: the merge of M3. Deliverable and
evidence: plan §3 M4. Offline.

**C6. M5 — negative controls.** Base: the merge of M4. Deliverable and
evidence: plan §3 M5, including the evidence of §2D items 2, 3 and 12. No
production `start` run in this slice. Offline.

**C7. M6 — the certification candidate.** Base: a branch from the merge of
M5. Deliverable and evidence: plan §3 M6. The pull request stays a draft and is
not merged in this slice. M7 does not start on this act.

## Part D: The closed stop list

A slice in Part C stops and returns to the Founder, with what passed, what
failed and the single next decision, when any of the following holds:

1. a path it needs is outside those its plan §3 entry names, or is a path plan
   §2 preserves;
2. its binding base is not the merge commit of the preceding slice at `main`;
3. the suite floor of B9 is not met on either certification host, or the floor
   would lower;
4. a test that proves a claim would have to be weakened, skipped or changed to
   stay green;
5. a dependency, file, live call, credential or scope outside Part C is
   needed;
6. a governing document conflicts with another and no superior text settles it,
   or a required seat, model or environment cannot be verified.

Nothing else stops a slice. A finding, a warning, a failing advisory check or a
Tier-2 advisory does not stop it.

## Part E: Not authorized

- Execution of M0 or of M7. Each needs its own act.
- Any live provider call outside a slice act that names it.
- Any merge, including any merge of a slice pull request.
- Any change to madv-surface's own repository, to a gate, or to a path plan §2
  preserves.
- Any amendment of the Phase 3A design §1.5 table. B4 item 2 requires a
  separate act for it.

## Part F: Filing

F1. One docs-only pull request files this act and changes nothing else. It
touches `docs/decisions/`, so it merges only on a Founder act naming its exact
head.

F2. This act takes effect when I sign it. Its rulings bind from that moment;
B1 binds the slices of Part C whether or not the pull request of F1 has merged.

F3. **Signature.** I signed this act in session on 2026-11-08, having read it.
The instruction I gave, verbatim: "sign". A Hermes session recorded the act
and its rulings as drafted; that recording is not a signature and does not
substitute for one. `origin/main` at signature was
`1678f18` (the merge of pull request 231), re-read at the signature.

F4. **The date on the signature line.** The line I supplied carried the date
2026-11-09. Shown that the machine clock read 2026-11-08 22:13 EST, I chose
2026-11-08, the date of the instruction, and the line is dated accordingly.
No other line of this act changed for it.

## Signature

Executed by the Founder in session on 2026-11-08.

    — Michael Daley, Date: 2026-11-08

    Instruction given, verbatim: "sign"
    Recorded by: Hermes agent session (Socrates). The record is not a signature.
