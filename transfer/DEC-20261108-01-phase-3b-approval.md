FOUNDER-ACT-20261108-PHASE-3B-APPROVAL: the Phase 3B design and plan approved at revision 5, the first Phase 3B act's dispositions, and the open items it rules

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `ae8b3325dcdbc1730ab8f7b9712071ba5e4324d5` (the merge of pull request 212)
> **Governs:** Phase 3B; `docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md`; `docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md`
> **Read with:** Phase 3A design §2.1, §2.2, §3.6, §4.2, §6.9, §7 and §8; `DEC-20261107-01` B3 and B4; `DEC-20261106-02` B2, B5 and B8; `DEC-20261104-02` Addenda 3 B5 and 4 B3; `DEC-20261104-01` A2, B4, B10 and B11; `DEC-20261102-04` B2; `DEC-20261102-02` B5; `DEC-20261102-01` B2 and B3; `DEC-20261027-01` A3; `DEC-20261022-01` B4; `DEC-20261020-01` B2 and B5; `DEC-20261016-01` B1 and B3; `DEC-20261015-03` B5; `DEC-20261013-01` B5; `DEC-20261010-02` B5

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What this act approves.** Phase 3A design §8 authorizes no implementation from a document alone. The Phase 3B plan says implementation begins only after I approve the design and the plan by a signed act that names the SHA-256 of each, and that this approval act is the first Phase 3B act (plan §2D). This is that act.
1. The design, revision 5: `docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md`, 469 lines, SHA-256 `da8f4c8c35f617898368b340d710188686c9dc9faf2b23c4a6b284c1bb4d93fc`.
2. The plan, revision 5: `docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md`, 651 lines, SHA-256 `a48bf5457bf17cf5d554e541c5bb3609efacf6ad170ad6e56950b829a4269ccc`.
3. Both are at transfer commit `f7b2d1f6e7b30dabba1f89eea109d908894268b0`. Revision 1 of each is at the same path on `main`.

A2. **The reviews.** Each was a fresh Codex session on my MacBook, started with my governed launcher, on a review folder whose copies of this repository and of `MADVenturesLLC/madventures-surface` were pinned at `5be1a586b4a4bb7cc09dfc6239b66b518cf9a23c` and `270981400324c684abc1a5c0e837c8d8a3b20cf7` with no remote. Each reported its model as GPT-6, as its harness showed it, and reported that it used no MCP server. For each report that is not void, my command checked its quoted blocks against their files and its logs against their hashes.
1. Revision 2: CHANGES REQUIRED, nine blocking and five advisory findings; report SHA-256 `e0be01385fa25b19a5b3903aa282f3983c593aab4f58858fdbe8a3bc095de3dc`, 1,128 lines, saved at `/Users/michaeldaley/builds/3b-refresh-review-r1.md`. Its 65 quoted blocks and 120 logs passed my check.
2. Revision 3: CHANGES REQUIRED, four blocking and two advisory findings; report SHA-256 `b139a50a1f986da62b768d1d99cff01469425cfa31a85ae822c874e8d701819f`. The reviewer declared it void, because one command's output escaped its log. It is not a verdict, and my command did not check it.
3. Revision 4: CHANGES REQUIRED, two blocking and three advisory findings; report SHA-256 `2cb169a93bc0946ef5cf9a143ad13e35c25587670ff977594367a53b8a2ef52b`, saved at `/Users/michaeldaley/builds/3b-refresh-review-r3.md`. Its quoted blocks and 57 logs passed my check.
4. Revision 5, a fix-verification review of the change from revision 4: APPROVE, no blocking finding and one advisory finding, N1; report SHA-256 `5fc2a8d4b28f4c74ea9e446db0b55341c61f921181495d46c6a8a125c2bb1a93`, 605 lines, 35,390 bytes, saved at `/Users/michaeldaley/builds/3b-refresh-review-r4.md`. Its 43 quoted blocks and 47 logs passed my check.

A3. **N1.** The plan's M2 lists the snapshot members the runtime leaves null but does not name the fencing tokens. The broker contract allows a null `fencingToken` on the snapshot and on each ledger row, the TUI projection requires a number in both, and startup writes the `session_open` row with a null token.

A4. **My choices in the drafting conversation.** On 2026-11-06 I chose the live pair Claude Code plus madv-surface. On 2026-11-07 I chose the `minimax` profile, a separate early slice that amends the capability record for Linux, and no approval workflow in Phase 3B. On 2026-11-08 I chose the model, the plan-terms timing, the Tier-2 reviewers, the Claude Code version route, the qualification route and the retention cap ruled below. Each becomes a ruling by this act.

A5. **Preflight callers.** The plan's §2D item 13 requires this act and every Phase 3B slice act to cite the rulings that govern callers of preflight. At the binding base of B2, preflight returns `identity_mismatch` when an execution's independence domain differs from its registration, as `DEC-20261016-01` B1 requires; the test of `DEC-20261016-01` B3 is in `packages/supervisor/test/preflight.test.ts`; and preflight returns `repository_fingerprint` when the git common directory of the repository root differs from that of the worktree.

A6. **The drafting assistant.** A Claude Code session drafted revisions 2 to 5 of both documents, the four review briefs, the commands that checked the reports, and this act. None of that is an independent review.

## Part B: Founder rulings

B1. **Approval.** I approve the design and the plan of A1 at those SHA-256 values. They bind Phase 3B as written, with the rulings below.
1. No slice starts on this act. Each slice starts only on its own act, as plan §0A item 1 says.
2. Where this act and either document differ, this act governs.

B2. **The binding base of Phase 3B** is `ae8b3325dcdbc1730ab8f7b9712071ba5e4324d5`, the merge of pull request 212. Its changes since Phase 3A's final merge at `a7dbc7def0cd67568b2765c894ff91894707801c` are docs only: `DEC-20261106-02`, `DEC-20261107-01` and the correction-round log entries filed by pull request 229, and `DEC-20261102-03` with its change to `CONTRIBUTING.md` filed by pull request 212. The reviews of A2 read the code at `5be1a586b4a4bb7cc09dfc6239b66b518cf9a23c`, the merge of pull request 229, which has the same code.

B3. **The suite floor** is 1914 pass and 0 fail across 140 files on both certification hosts, as `DEC-20261106-02` B6 item 1 records at Task 59's head. It ratchets as plan §2B says.

B4. **Pair and scope.** The live pair is Claude Code plus madv-surface. madv-surface is admitted only through the `minimax` profile. H2 amends the capability record for Linux before any Linux record is written, as `DEC-20261010-02` B5 requires. Phase 3B adds no approval workflow; plan §5 item 10 is ruled so.

B5. **The madv-surface registration (plan §5 item 1).** Profile `minimax`; model `MiniMax-M3.1-Flash`; role `independent-reviewer`, mapped to madv-surface's `--role reviewer`; provider `minimax`, independence domain `minimax` and `organization_id` `minimax`, as single static values. All of it is provisional on M0's investigation, as design §2.6 item 1 says.

B6. **Plan terms (plan §5 item 2).** I rule on whether governed sessions fit the MiniMax M Plan's terms, from MiniMax's own pages, by an act that issues before M0's act. M0's act cites that ruling. No M0 act issues before it.

B7. **The retention cap (plan §5 item 4).** Each surface pane's ring buffer keeps at most 10,000 lines or 2,097,152 bytes of output, whichever limit is reached first, and drops the oldest first, as design §2.3 says.

B8. **Tier-2 reviewers (plan §5 item 7).** The Tier-2 review of each slice comes from a surface other than its builder's: a Codex session reviews a slice built by Claude Code, and a Gemini session on Antigravity reviews a slice built by Codex. The checks of plan §2C apply to every report, and a report that fails them is not posted and is not a verdict.

B9. **Builders and counting (plan §5 item 9).**
1. Builder qualification under Phase 3A design §7.7 applies. A separate act of mine issues the §7.8 record for each builder before any slice act names it, and no slice act names a builder whose record does not show a pass. That act also rules what becomes of the GLM record the commission named.
2. The §7 rubric and Phase 3A plan §11.3 apply to Phase 3B verdicts. Each slice is its own milestone for the two-round limit of design §7.6, and its verdicts are recorded in the correction-round log under these rubric milestones: H1, 10; H2, 4; M0, 1 and 3; M1, 6; M2, 7; M3, 5 and 7; M4, 7; M5, 10; M6, 9; M7, 2 and 10. Phase 3A's counts stay as they are and do not carry into a Phase 3B slice.

B10. **The Claude Code version (plan §5 item 13).** The `claude-code` registration's supported version is amended to the version that both certification hosts run, which must be the same, after a fresh investigation of that exact build under Phase 3A design §2.2 and §2.3 on both hosts. M0 does this, with its live calls named by M0's act, and plan §2's preserved list is amended for that value alone. No other value of the `claude-code` registration changes. My everyday installation stays as `DEC-20261104-01` B11 keeps it.

B11. **The first Phase 3B act's dispositions.** Every item of plan §2D is disposed of as the plan places it, with the acceptance it states. The act of the slice named for an item supplies its task detail and evidence. N1 of A3 is added to M2: M2's act covers the snapshot's `fencingToken` and each ledger row's `fencingToken`, allows the projection and renderer type changes they need, and requires tests showing that a null token, including that of the `session_open` row, renders as absence and never as a number.

B12. **Preflight callers.** As plan §2D item 13 requires, this act cites `DEC-20261015-03` B5 items 2 and 3; item 3a of my merge authorization of pull request 151, comment 6202101854; `DEC-20261020-01` B2; and item 4a of my merge authorization of pull request 183, as `DEC-20261027-01` A3 states it. The changes they require are in the binding base of B2, as A5 records. Every Phase 3B slice act cites the same rulings and confirms the same changes in its own binding base.

B13. **When the other open items are ruled.**
1. Plan §5 item 3, the madv-surface release: by an act before M0's act.
2. Item 5, the host order and window: in M0's act for its investigation, and in M7's act for its runs.
3. Item 6, any dependency or file outside plan §2: in the act of the slice that needs it, including the declaration of §2D item 5 in H1's act.
4. Item 8, the Linux capability-record shape: in H2's act.
5. Items 11 and 12, the attestation prompts, the per-start live-call budget and madv-surface's identity probe: item 12 in M0's act, and item 11 in M1's act, before any live run.
6. Item 14, the managed-settings path for each operating system: by an act that adds the branch to the Phase 3A design §1.5 table before M1's act.

B14. **Counting.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. The reviews of A2 reviewed documents; none is a counted verdict.

B15. **What this does not open.** This act authorizes no build, no live call and no change to the `start` gate. Production `start` keeps returning `live_runtime_not_certified` until the certification candidate merges on the route of design §5. It changes no earlier ruling except as B10 states.

## Part C: Filing

C1. One docs-only pull request files this act and replaces revision 1 of both documents with the revision 5 texts of A1, each byte for byte, and changes nothing else. It touches `docs/decisions/`, so under `AGENTS.md`, as `DEC-20261031-01` amended it, it merges only by a Founder act naming its exact head.

C2. This act takes effect when I sign it. B1 binds the documents at the SHA-256 values of A1 whether or not the pull request of C1 has merged; no slice act issues before it has.

## Part D: Not authorized

- Any slice, build or live provider call.
- Any change to code, tests, `bun.lock`, a manifest, the Phase 3A documents, `AGENTS.md` or another decision record, except the filing of C1.
- Any approval workflow, any madv-surface profile other than `minimax`, and any change to pair eligibility, constraints, fencing, ownership or legality logic.
- Any change to the `start` gate outside the certification candidate of design §5.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-08

Actor-Id: founder
