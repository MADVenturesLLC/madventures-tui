FOUNDER-ACT-20261014-BUILDER-REASSIGNMENT: Gemini 4 on Antigravity as the primary implementer, and Grok or Codex as the Tier-2 reviewer

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `b5662096d0f03929602c90a0d8c2c5cfaa8ad24d`
> **Ratifies:** the patch with SHA-256 `dd70754cff9155debfc0a62a2b92321668a3b073ad53e0d152260cfb36855db4` (3,574 bytes) against `docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md`, which changes its SHA-256 from `913a7b20b74cda89224e40a32866556d5375755dd9810d0ba9cdfbed068a5a27` to `c09fe4849a4a61bf3e1494b77267020e00bd1d7b3015e3b2332ec5d71b07f769`
> **Read with:** spec §§6.6, 6.7, 6.8 item 11, 7.1, 7.3, 7.6 and 7.7; plan §§11.3 and 11.4; `DEC-20261013-01` B9 and B10

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The decision.** From the next task I authorize, the primary implementer of Phase 3A is a Gemini 4 session on the Antigravity surface. Its work is reviewed by a fresh Grok session or a fresh Codex session, never by a Gemini session.

A2. **Why the spec must change.** Spec §6.7 names Gemini Antigravity as the independent Tier-2 reviewer. Spec §6.8 item 11 requires an approving verdict from Gemini Antigravity on the candidate SHA, §7.3 counts its verdicts, and §7.7 requires it to review the candidate SHA before a builder qualifies for Phase 3B. With Gemini as the builder and the spec unchanged, Gemini would review its own work.

A3. **The builders so far.** Spec §6.7 and plan §11.4 name Claude Opus 5 as the provisional primary implementer. Since Task 36, each task's act has named a Codex session as its builder, and `DEC-20261013-01` B9 names a Codex session for Task 45, whose review B10 gives to a fresh `gemini-antigravity` session.

A4. **What is not established.** The exact model identifier the Antigravity harness reports for Gemini 4; whether an Antigravity session can work on the Ubuntu PC in a clone with the custodied test runtime; and the reviewer surface a Grok session would run on. B7 requires the first of these to be recorded before any Gemini build.

A5. **The drafting assistant.** It drafted this act and the patch, found the Gemini references with `grep` at the commit in the header, and checked that the patch applies cleanly and that `git diff --check` passes. None of that is an independent review.

## Part B: Founder rulings

B1. **The primary implementer.** The primary implementer is a Gemini 4 session on the Antigravity surface, from the first task whose execution authorization I sign after this act is on `main`. Each such act names the session, with an Actor-Id of the form `session:antigravity/<task and round>` and Execution-Surface `antigravity`. This is a reassignment under spec §7.1 and plan §11.4. It is my choice, not a consequence of any trigger in spec §7.6.

B2. **The rubric.** Under spec §7.1 the rubric applies to the new builder from the moment of reassignment. The correction-round log keeps every entry made before this act as it stands. For each rubric milestone, the count that applies to the new builder starts at zero, with the first verdict on work it implements.

B3. **Existing code.** Because this reassignment is not for cause, merged code needs no separate technical assessment under spec §7.1. It stays under the reviews it already passed.

B4. **The Tier-2 reviewer.** For work the new builder implements, the Tier-2 reviewer is a fresh Grok session or a fresh Codex session that has seen none of that task's material, named in the task's act, under reviewer id `grok` or `codex`. It is never a Gemini session. Its verdicts are countable under spec §7.3 and plan §11.3, and plan §11.3's second bullet is read to include it.

B5. **The candidate SHA.** Spec §6.8 item 11 and §7.7 require an approving verdict on the exact candidate SHA from the Tier-2 reviewer of §6.7 as this act leaves it. I name that reviewer in the act that authorizes the candidate review. It is not a session of the model whose qualification the verdict supports.

B6. **Reviews already authorized.** A review that an act signed before this one gives to a `gemini-antigravity` session, including the review of Task 45 under `DEC-20261013-01` B10, stays with that reviewer and keeps its count.

B7. **The first build.** Before the first Gemini build, the task's act requires the session to report, in its first message and before any edit, its harness and model exactly as the harness shows them, its working directory and branch, and the identity of the custodied test runtime. If any of these cannot be shown, the session stops for my ruling.

B8. **Documents not edited.** The plan is not edited. Plan §11.4's first bullet is read under B1, its second bullet's list of successors includes the builder of B1, and plan §11.3 is read under B4. The line of the plan that mirrors spec §6.6 is read as the patch leaves that section.

B9. **Ratification and timing.** I ratify the patch in the header. It takes effect when it is on `main` together with this act. It does not change `DEC-20261013-01`. It is filed only after the Task 45 pull request has merged, unless I rule otherwise.

B10. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. It adds no round. The counts stand as the log records them when this act is filed.

## Part C: Filing

C1. One docs-only pull request files this act and applies the patch, and changes nothing else. It merges only when every required check succeeds, under my separate merge authorization.

## Part D: Not authorized

- Any task build, including Task 46, which needs its own execution authorization.
- Any change to the builder or reviewer of Task 45.
- Any change to production code, a test, a workflow, the plan, the adapter registry or the Antigravity adapter.
- Any installation, sign-in or update of Antigravity or any other tool by an agent on any host.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-14

Actor-Id: founder
