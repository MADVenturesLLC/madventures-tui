# DEC-20260903-02 — M13 Task 30→34 Precondition Waiver and Execution Authorization (2026-09-02 act)

**Status:** RATIFIED (Founder, 2026-09-02); recorded here 2026-09-03
**Repository:** `MADVenturesLLC/madventures-tui`
**Base named in the act:** `136aeacd1d31a390ef3bee8ff5d6526b59d2c30e` (tree `31ef7cde8ae75707c06d2790c39a258efc760d19`)
**Recording head:** `main` @ `3b684aad3ccce4abff193c8a5d9f0002687ac121`

**Provenance:** The Founder (Michael Daley) delivered this act as a written ruling
in a Claude Code session on 2026-09-02, titled "Founder Authorization — Phase 3A
precondition waiver for the Task 30→34 chain and execution authorization for M13
Tasks 30–32". It was transcribed by the Builder into
[PR #39 comment `5510270186`](https://github.com/MADVenturesLLC/madventures-tui/pull/39#issuecomment-5510270186)
(2026-09-02T13:26:06Z) and **countersigned by the Founder** in
[PR #39 comment `5516046063`](https://github.com/MADVenturesLLC/madventures-tui/pull/39#issuecomment-5516046063)
(2026-09-02T20:36:38Z). This file exists because Part B item 7 of the Founder's
docs-only act of 2026-09-03 authorized it; Part C item 13 of the act recorded
below had forbidden the Builder from creating it.

---

## Why this record exists, stated accurately

The act below carries live authority that until now lived only in a PR comment:
the Task 30 and Task 33 precondition waivers for the named chain, the `docs/**`
and merge prohibitions, and the rule that measured suite baselines govern over
stale plan-text counts. Repository-local citability is the reason for this file.

**One correction to the authorizing act.** Part B item 7 of the 2026-09-03
docs-only act described the 2026-09-02 act as existing "only as a builder-attested
PR comment." That characterization was incomplete and is corrected here on the
evidence. The act's own caveat, reproduced verbatim below, named two stronger
provenance forms and stated that neither was available at the time it was written.
One of them, Founder countersignature on the PR, was supplied later the same day
in comment `5516046063`. The other, a `docs/decisions/DEC-*.md` transcription, is
this file. The caveat was accurate when written and was subsequently overtaken by
events; it is preserved unedited rather than amended.

### Founder countersignature (verbatim)

> I, Michael Daley, Founder of MAD Ventures / Founder OS, confirm that [comment 5510270186](https://github.com/MADVenturesLLC/madventures-tui/pull/39#issuecomment-5510270186) is a complete and verbatim record of my 2026-09-02 Founder act.
>
> I adopt Part A item 3 as the authority record waiving the “M12 reviewed” precondition for the named Task 30 → 34 chain. This clears independent Tier-2 review of PR #39 at exact head `52a4e47d88cbc4342bd088cfc4fb001ff86d5ec8` only.
>
> This does not mark the PR ready, authorize a merge, resolve review threads, or amend the separate future merge-act requirement.

---

## The transcribing comment's attestation caveat (verbatim, unedited)

### Provenance and its limits

This act was delivered by the Founder (Michael Daley) as a written ruling in a Claude Code session on 2026-09-02, titled *"Founder Authorization — Phase 3A precondition waiver for the Task 30→34 chain and execution authorization for M13 Tasks 30–32."* It is not a pre-existing repository artifact.

**Attestation caveat, so no reviewer overweights this comment:** the transcription below is *builder-attested*. A comment authored by the builder is not, on its own, immutable provenance for the builder's own authority. Two stronger forms exist and neither is available under this act:

- The repository's established pattern is a verbatim `docs/decisions/DEC-*.md` transcription with provenance and independent verification, exactly as [`DEC-20260831-01`](../blob/main/docs/decisions/DEC-20260831-01-phase-3a-authority-drift-reconciliation.md) did for the 2026-08-31 ruling. **Part C item 13 of this very act forbids me from editing `docs/**`,** so that record requires a separate, docs-only Founder authorization.
- Founder countersignature on this PR.

---

## Independent verification

| Claim | Method | Result |
| --- | --- | --- |
| Comment identity | `gh api repos/MADVenturesLLC/madventures-tui/issues/comments/5510270186` | author `decivantiq`, created 2026-09-02T13:26:06Z |
| The act's self-asserted digest | SHA-256 over the fenced transcription plus its single trailing newline | `923a1dbc4ed1448c4830849d50de7f07e5fd883ffd6e9dcf288002daa812cd72`, 9,153 bytes — **matches the value asserted in the comment** |
| Countersignature | PR #39 comment `5516046063`, author `decivantiq`, 2026-09-02T20:36:38Z | present, quoted verbatim above |
| Chain outcome | `git log origin/main` | PR #39 merged as `3b684aad3ccce4abff193c8a5d9f0002687ac121`, 2026-09-03T06:55:03Z, under a separate Founder merge authorization as Part C item 13 required |

The eight repository digests the act asserts over content at
`136aeacd1d31a390ef3bee8ff5d6526b59d2c30e` were re-derived and confirmed by the
Builder at transcription time on 2026-09-02, and that verification table is part
of the comment reproduced in the caveat section above.

---

## The act, verbatim

SHA-256 of the fenced content below, plus one trailing newline:
`923a1dbc4ed1448c4830849d50de7f07e5fd883ffd6e9dcf288002daa812cd72` (9,153 bytes).

~~~text
Founder Authorization — Phase 3A precondition waiver for the Task 30→34 chain and execution authorization for M13 Tasks 30–32

Repository: MADVenturesLLC/madventures-tui
Date: 2026-09-02

I, Michael Daley, Founder of MAD Ventures and Founder OS, issue the following ruling and authorization.

## Part A — Ruling: precondition waiver for a named chain

1. The implementation plan (`docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`, SHA-256 `14e913fa1833753b7c92031b5c7f44d2e0b54b63d8f879d8859c2858a2e267f8` at the base named in Part B) states the precondition "M12 reviewed" for Task 30, "Task 30 committed" for Task 31, "Task 31 committed" for Task 32, "M13 reviewed" for Task 33, and "Task 33 committed" plus written PLAN-OPEN-4 and PLAN-OPEN-6 rulings for Task 34.

2. Milestones M3 through M12 have not been implemented on `main`. M17–M19 landed ahead of them under task-specific authorizations that DEC-20260831-01 item 1 (`docs/decisions/DEC-20260831-01-phase-3a-authority-drift-reconciliation.md`, SHA-256 `692a30d8fd1644c7eefce584f7e72530c8a2c92ded0bdec16447c7a1bc598209`) confirms as valid. DEC-20260831-01 item 3 requires Task 34 to be completed before M20 or Phase 4 and does not require M13 or M14 review as a prerequisite.

3. Ruling. For the named chain Task 30 → Task 31 → Task 32 → Task 33 → Task 34, executed in that order and no other, the milestone-review preconditions "M12 reviewed" (Task 30) and "M13 reviewed" (Task 33) are waived. The intra-chain preconditions ("Task N committed") are not waived. The PLAN-OPEN-4 and PLAN-OPEN-6 preconditions on Task 34 are not waived; both rulings stand as written (`docs/decisions/PLAN-OPEN-4-node-pty-removal.md` SHA-256 `e662936c0a2f91b25c4f9f38d791bb59182b22cc4ed19ce577afa81e34eeb460`; `docs/decisions/PLAN-OPEN-6-root-scripts.md` SHA-256 `26270a7af4c932dd122bfd6ed3383e845bb655886a8d7efe8e152939ce7a957f`).

4. This waiver applies to the five named tasks only. It does not authorize, schedule, or imply any task in M3–M12, M14 beyond Tasks 33 and 34, M15–M16, M20 or later, or Phase 4. It does not amend plan text; the plan file and its section identities remain as recorded. Where the plan text cites suite counts (for example "714/2606/35" in Task 33 Step 5), the Builder measures the live baseline at the authorized base and reports the measured numbers; plan-text counts are not cited as evidence.

5. This ruling is not implementation authority. Each task in the chain executes only under its own written authorization naming an exact base SHA and file scope. Part B is the first such authorization. Task 33 and Task 34 each require a separate authorization from me naming the exact `main` SHA current at that time; Task 34 additionally requires the report enumerated in DEC-20260831-01 (clean main SHA, full-plan SHA-256, Task 34 section SHA-256, comparison against ratified Revision 5.12, exact proposed file scope) before I issue it.

## Part B — Execution authorization: M13 Tasks 30, 31, 32

6. Base. Branch from a clean `origin/main` at exactly `136aeacd1d31a390ef3bee8ff5d6526b59d2c30e` (tree `31ef7cde8ae75707c06d2790c39a258efc760d19`). If `origin/main` is any other SHA at branch time, stop and report; this authorization does not carry to a different base.

7. Governing text. Plan section identities at this base:
   - Task 30 (plan lines 1394–1422, 2,932 bytes): SHA-256 `325531848daae9a281b899e8398f3a540d8cae1d5af8bf965264b90050bb452a`
   - Task 31 (plan lines 1423–1451, 3,170 bytes): SHA-256 `2bd0ae3f9b4d598e099f213d2dda077126f2991decdf74cbde6dbbcb6e0dec0a`
   - Task 32 (plan lines 1452–1485, 2,729 bytes): SHA-256 `b216449bb99d3b265988a87d508d11e2eb6b56eb9a42325fbb12091bc111b4bb`
   - Milestone M13 section (heading through the M14 heading line inclusive, lines 1392–1488, 8,991 bytes): SHA-256 `007d9f89a8dcaba25db06adf4990ea98bdd47190114edda05aa3b2e8050f5a02`
   The Builder re-derives these hashes at the base before the first edit and stops on any mismatch.

8. Scope. Exactly these nine files and no other path:
   - `apps/madbridge/src/commands/start.ts` (modify — Task 30)
   - `apps/madbridge/src/commands/status.ts` (modify — Task 31)
   - `apps/madbridge/src/commands/pause.ts` (modify — Task 31)
   - `apps/madbridge/src/commands/resume.ts` (modify — Task 31)
   - `apps/madbridge/src/commands/close.ts` (modify — Task 31)
   - `apps/madbridge/src/cli.ts` (modify — Task 32; `HELP_TEXT` command lines only; `COMMANDS` and the dispatch table unchanged)
   - `apps/madbridge/test/cli-gate.test.ts` (create — Task 30; extend — Task 32)
   - `apps/madbridge/test/cli-placeholders.test.ts` (create — Task 31)
   - `apps/madbridge/test/cli.test.ts` (modify — Tasks 30 and 31; replace the `start command — preflight validation` block at lines 126–154 and the `session commands — exit codes` block at lines 156–186 as the plan directs)
   No file under `apps/madbridge/src/tui/**`, `.github/**`, `docs/**`, `packages/**`, or any manifest or lockfile is in scope. Plan checkboxes are not to be edited.

9. Method. Follow each task's Steps 1–7 in plan order, test-first: write the named failing tests, capture the RED run output verbatim, implement the minimum authorized behavior, capture GREEN. Produce exactly three commits on one branch, in this order, with these exact subjects:
   1. `feat(cli)!: gate production start with live_runtime_not_certified`
   2. `feat(cli)!: replace external-control commands with truthful placeholders`
   3. `docs(cli): make help text match the Phase 3A gate and placeholders`
   Each commit contains only that task's listed files. Do not squash, amend a reported commit, or interleave.

10. Required outcomes at the final commit:
   - `bunx tsc --noEmit` exits 0.
   - `bun test apps/madbridge/test/cli-gate.test.ts`: 8 pass (5 after Task 30, 8 after Task 32).
   - `bun test apps/madbridge/test/cli-placeholders.test.ts`: 11 pass.
   - `bun test` (full): 0 fail; pass count not below the measured baseline at the base, which is 844 pass / 3,865 expect() calls / 48 files (measured 2026-09-02 on Bun 1.3.x, macOS).
   - `git diff --check` clean.
   - `start.ts` imports only `./types`; `status.ts`, `pause.ts`, `resume.ts`, `close.ts` each import only `./types`; `cli.ts` `COMMANDS` still holds exactly the nine names.
   - `start --json` stdout, ignoring exactly one trailing newline, is byte-equal to `{"ok":false,"error":"live_runtime_not_certified","hint":"Phase 3A runtime foundation is present; live startup requires Phase 3B certification."}` with exit 78; the four placeholders exit 69 with the exact strings in the Task 31 Interfaces block.

11. Delivery. Push the branch as `build/m13-tasks30-32-r1` and open a DRAFT pull request against `main`. Plan Step 8 ("Stop for the M13 review checkpoint") is satisfied by stopping after the draft PR is open. Report: the three full 40-character commit SHAs and their subjects, the PR number, the measured counts from item 10, and the verbatim RED output from each task's Step 2. Then stop.

12. Builder binding and attribution. I authorize `session:claude-code/m13-tasks30-32-r1` on registered execution surface `claude-code` (FounderOS `04-agents/execution-surface-registry.md`), launched through the `madbridge-claude-v5` gateway from a fresh checkout of the base in item 6, to perform Part B as `Role-Id: builder`. Hermes remains the neutral orchestrator: it may dispatch, monitor, independently verify, and report this work, and may not author any implementation commit. Commits and the PR body carry exactly:
    ```
    Role-Id: builder
    Actor-Id: session:claude-code/m13-tasks30-32-r1
    Execution-Surface: claude-code
    ```
    Tier-2 review of the resulting head is performed by a non-Anthropic seat (Codex or Gemini), named in the later merge-review act.

## Part C — Not authorized by this act

13. This act does not authorize: Task 33 or Task 34 execution; any merge (merge authorization is a separate act naming the exact head SHA after `Verify`, `Verify (macOS)`, and `code-review` are green and review threads are resolved); marking the PR ready for review; resolving review threads; editing `docs/**`, CI, branch protection, rulesets, or CODEOWNERS; any change to `apps/madbridge/src/tui/**`; any dependency, lockfile, or manifest change; modifying, moving, deleting, ignoring, or committing the six known untracked working-tree paths (the clean-untracked precondition remains waived for exactly those paths and nothing else); closing issue #18; beginning M20 or Phase 4.

14. Stop conditions. Return `FOUNDER_DECISION_REQUIRED` and make no further change if: the base SHA does not match item 6; any hash in item 7 does not re-derive; a plan step requires a file outside item 8; a RED step does not fail for the reason the plan states; a governing text conflicts with this act; or any required tool, seat, or environment cannot be verified.

15. Void clause. Any change to the base, the scope, the commit sequence, or the governing-text identities voids this authorization in its entirety; a fresh act is required.

— Michael Daley, Founder, MAD Ventures / Founder OS
~~~

---

Nothing in this record revokes or supersedes
[`DEC-20260812-01`](DEC-20260812-01-phase-3a-runtime-foundation-supersession.md),
[`DEC-20260831-01`](DEC-20260831-01-phase-3a-authority-drift-reconciliation.md),
[`DEC-20260903-01`](DEC-20260903-01-task26-m10-precondition-waiver.md),
or any `PLAN-OPEN-*` ruling.
