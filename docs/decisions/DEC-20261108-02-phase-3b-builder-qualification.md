FOUNDER-ACT-20261108-PHASE-3B-BUILDER-QUALIFICATION: Codex qualified as the Phase 3B builder, its §7.8 record, Claude Code not qualified, and the GLM record answered

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `ae8b3325dcdbc1730ab8f7b9712071ba5e4324d5` (the merge of pull request 212)
> **Governs:** which builders may build Phase 3B slices; their Phase 3A design §7.8 records
> **Read with:** Phase 3A design §7.1 to §7.8; `DEC-20261108-01` B8 and B9; `DEC-20261107-01` B3 and B4; `DEC-20261106-02` B1, B6 and B7; `DEC-20261102-02` A2 and B6; `DEC-20261014-01` B2; `DEC-20261009-02`; `DEC-20261007-02` A4; `DEC-20261007-03` B3; Phase 3A plan §11.3

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What earlier acts leave to this act.** `DEC-20261108-01` B9 item 1 says that a separate act of mine issues the Phase 3A design §7.8 record for each builder before any Phase 3B slice act names it, that no slice act names a builder whose record does not show a pass, and that the same act rules what becomes of the GLM record the Phase 3B commission named. This is that act.

A2. **The rule.** Phase 3A design §7.7 qualifies a builder for Phase 3B only if all Phase 3A milestones pass or pass after correction; no milestone exceeds two correction rounds; no disqualifier occurs; both certification hosts pass the same reviewed SHA; all findings and warnings have explicit dispositions; the Tier-2 reviewer reviews the exact candidate SHA; I explicitly qualify the builder; and the Phase 3B work does not silently drift from the design. Successful Phase 3A merge does not qualify a builder by itself.

A3. **How the log keeps counts.** `DEC-20261014-01` B2 rules that for each rubric milestone the count that applies to a new builder starts at zero. `DEC-20261102-02` B6 records that "the correction-round log has kept each builder's count after a change of builder". Counted across all builders, rubric milestones 1, 4 and 7 stand above two; counted per builder, they do not for Codex.

A4. **The Codex record.** From the correction-round log on `main` at the commit in the header, and the acts it cites:
1. Codex sessions built, among others, Task 35 from its fourth round, Tasks 36, 37 and 45, Task 46 from its third round, Tasks 47 to 50, the M22 corrections, Tasks 24 and 25, the M23 and M24 build, Task 56 from its fifth round, Task 57, and Hardening A and C.
2. Its rounds: rubric milestone 10 stands at 2 "for the Codex builder sessions" of the M23 and M24 build (log, M23 and M24 checkpoint entry). `DEC-20261102-02` A2 records "no round for Codex under rubric milestones 5, 6, 7 or 9". The log records no Codex round under any other rubric milestone, and no disqualifier against a Codex session.
3. Its model: the only model reported for a Codex builder session is the label its harness shows, GPT-6, with no further identifier exposed (`DEC-20261009-02` A2 item 1). The Codex CLI version of the builder sessions is not recorded.
4. Its last reviewed Phase 3A work: Task 57 at `df2baba9130f121c8fbc5c83d0406f9b5e8f5202`, Tier-2 PASS by `antigravity`.

A5. **The Claude Code record.** Claude Code sessions on Claude Opus 5 and Claude Opus 5.5 took rounds 3 to 5 under rubric milestone 1 and rounds 1 to 3 under rubric milestone 4 in Task 35. Round 5 was "entered against Claude Opus 5.5", and that builder was reassigned to Codex (log, Task 35 entries). Since Hardening B, Claude Code sessions built Hardening B, D, E and F and Tasks 58 and 59 with no round, and their count under rubric milestone 10 started at 0 under `DEC-20261102-02` B6. No record states which model those later sessions ran on.

A6. **GLM.** A GLM build drafted revision 1 of the Phase 3B plan, which carried a pending qualification record for GLM (`DEC-20261007-02` A4). GLM did no work on Task 35 (`DEC-20261007-03` B3), and the log records no Phase 3A milestone built by GLM.

A7. **Phase 3A as a whole.** Phase 3A merged at `a7dbc7def0cd67568b2765c894ff91894707801c`, with its candidate SHA `1d5438202c88f6b76b3b0e3746ac36d9416e7ad2` approved by `DEC-20261106-02` B7. Both certification hosts passed it; every finding and warning has a disposition (`DEC-20261106-02` B6 item 10); and reviewer `antigravity` gave the Tier-2 PASS at that exact SHA (`DEC-20261106-02` B1). M26 closed under `DEC-20261107-01` B3.

A8. **The drafting assistant.** A Claude Code session compiled the record of A4 to A6 from the log and the acts, and drafted this act. That is not an independent review.

## Part B: Founder rulings

B1. **The reading of §7.7.** "No milestone exceeds two correction rounds" is read per builder, as the log has kept counts since `DEC-20261014-01` B2.

B2. **Codex is qualified.** Codex, in governed Codex CLI sessions on my MacBook, is qualified to build Phase 3B slices. Its §7.8 record is:

```text
Builder qualification: pass
Phase evaluated: 3A
Builder: Codex, governed Codex CLI sessions on the Founder's MacBook (Actor-Id session:codex/<slice and round>)
Exact resolved model ID: not machine-verifiable; the harness shows the label GPT-6 (material deviation of B4)
Execution surface and version: codex; the version of the Phase 3A builder sessions is not recorded (material deviation of B4)
Evaluation date: 2026-11-08
Candidate SHA: 1d5438202c88f6b76b3b0e3746ac36d9416e7ad2
Correction rounds by milestone: rubric milestone 10, 2 (the M23 and M24 build); every other rubric milestone, 0 for Codex
Material deviations: the model ID and version fields, as B4 states
Independent review: antigravity, PASS, 1d5438202c88f6b76b3b0e3746ac36d9416e7ad2; Codex's last reviewed task, Task 57, antigravity, PASS, df2baba9130f121c8fbc5c83d0406f9b5e8f5202
Founder ruling: qualified for Phase 3B, 2026-11-08, DEC-20261108-02
```

B3. **Claude Code is not qualified** to build Phase 3B slices. Under the reading of B1, the builder that ran Task 35 on Claude Opus 5.5 exceeded two rounds under rubric milestones 1 and 4 and was reassigned, and no record shows that the later Claude Code sessions ran another model. A later act of mine may rule otherwise. This ruling concerns slice builders only. It does not touch Claude Code as a surface of the live pair, or a docs-only filing session for an act of mine, which builds no slice.

B4. **The model ID and version.** The §7.8 record requires a machine-verifiable resolved model ID and an exact surface version, and none is established for a Codex builder session. I approve, as a material deviation, a record that states the model exactly as the harness shows it and says it is not machine-verifiable. From the first Phase 3B slice, every builder session reports, before its first command, its harness name, the model and every other identifier the harness shows, and the output of `codex --version`; the slice's evidence records them; and a session that shows a model not made by OpenAI, or a harness other than Codex, stops.

B5. **The GLM record.** No §7.8 record issues for GLM. GLM built no Phase 3A milestone, so there is no Phase 3A record to evaluate, and GLM builds no Phase 3B slice. This answers the commission's item on GLM's record.

B6. **Reviewers.** With Codex the only qualified builder, every Phase 3B slice's Tier-2 review comes from a Gemini session on Antigravity, under `DEC-20261108-01` B8, and every report passes the checks of plan §2C before it counts.

B7. **Counting.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. Phase 3B rounds count per slice under `DEC-20261108-01` B9 item 2.

B8. **What this does not open.** This act authorizes no slice, build or live call, and changes no earlier ruling.

## Part C: Filing

C1. This act takes effect when I sign it. It is filed unchanged by the docs-only pull request that files H1's act, and it touches no other path.

## Part D: Not authorized

- Any slice, build or live call.
- Naming Claude Code, GLM or any builder other than Codex as a Phase 3B slice builder.
- Any change to code, tests or any decision record.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-08

Actor-Id: founder
