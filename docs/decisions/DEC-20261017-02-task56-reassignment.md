# DEC-20261017-02 — Task 56 builder reassignment and test correction authorization

Act identifier: `FOUNDER-ACT-20261017-TASK56-REASSIGNMENT`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The Round 4 review stop under `DEC-20261017-01`.** Under `DEC-20261017-01`, candidate commit `ae1bc8178c6ce78f750925443c54422d359a2ff7` on `build/m25-task56-r1` was reviewed by Codex in `/Users/michaeldaley/madventures-tui-m25-task56-codex-r2`. The review report was saved at `/Users/michaeldaley/task56-r2-input/codex-review-r4.md` (SHA-256 `c89a4050d0af828c92eff2610ab8528a5cd68d9d0e204a7383ae7437c45eb6ed`, 34862 bytes, 326 lines). Codex reported `FAIL — FOUNDER_DECISION_REQUIRED` on Finding 1:
- Finding 1 (Substantive test-guard defect): In `test/phase3a/evidence-pipeline.test.ts`, `assertNoUnacceptedIdentityClaim` hardened clause splitting for dotted identifiers and passed both specifically prescribed negative mutations, but still permitted affirmative identity-acceptance claims when separated from the primitive by parenthetical punctuation, demonstrated by the reproduced counterexample: `No provider metadata is present; init.model, however, is accepted as identity evidence.`.

A2. **Verification and timing race closure under `DEC-20261017-01` B2.** The full test suite run failed only the line 50 cancellation test in `packages/supervisor/test/attestation.test.ts`. Isolated rerun attempt 1 failed line 71, and isolated rerun attempt 2 passed 21 pass, 0 fail, satisfying the verification requirement under `DEC-20261017-01` B2. The timing race is no longer a blocker.

A3. **Reassignment requirement under Spec §7.6 and `DEC-20261017-01` B1.** Because a substantive defect in `assertNoUnacceptedIdentityClaim` recurred after a claimed correction, and rubric milestone 1 exceeds the two-round correction budget for the current builder, reassignment of the builder role is mandatory under Spec §7.6, Plan §11.3, and `DEC-20261017-01` B1 and B7.

A4. **Preservation of sound code under Plan §11.4.** Candidate commit `ae1bc8178c6ce78f750925443c54422d359a2ff7` preserves all 92 probe captures against `agy 1.4.0` (`a4502aaf310b2fd6eb657fcfec2fcc31a690fbbd0c2d14c8eefbb556409024ce`). The capability record `/Users/michaeldaley/Library/Application Support/MADVentures/madventures-tui/capability/antigravity/2026-10-16T20:43:50.078Z-a4502aaf310b.json` (SHA-256 `0b7e9d47a31d4e9439ad1846f949f57518defcebfe3ef6ab0dbbfa98673ee983`, 2868 bytes) was parsed and verified by Codex. The superseded record `/Users/michaeldaley/Library/Application Support/MADVentures/madventures-tui/capability/antigravity/2026-10-16T03:11:04.805Z-827ba22b4aa3.json` remains untouched at SHA-256 `704f23d9b6d82834bc23bd84e3ee4a58dcb7732e200ce5b74a3ad24a19982cbb`. Items 1 to 6 of the review returned PASS. Under Plan §11.4, sound code is preserved and not discarded when reassignment occurs.

A5. **Drafting record (`DEC-20261015-05` B7).** These rulings were checked against `DEC-20261015-04` Parts B to F, `DEC-20261016-03` Parts B to F, `DEC-20261016-04` Parts B to G, `DEC-20261016-05` Parts B to G, `DEC-20261016-06` Parts B to G, `DEC-20261017-01` Parts B to G, `DEC-20261014-01` B1, B2, B4 and B7, `DEC-20261015-05` B3, B4 and B7, `DEC-20261016-01` A3 and B4, `DEC-20261016-02` B9, `DEC-20261013-03` B2 item 1, plan Task 56 and sections 9.3, 9.4, 11.3 and 11.4, spec §§2.2, 5.1, 5.2, 5.6, 6.6, 7.6 and 9.13, the Codex review report at `/Users/michaeldaley/task56-r2-input/codex-review-r4.md`, and host file metadata read without running the binary. None of that is an independent review.

## Part B: Founder rulings

B1. **Reassignment of primary implementer.**
Under Spec §7.6 and `DEC-20261017-01` B1 and B7, Gemini 4 on Antigravity is reassigned from the primary implementer role for Task 56. Rubric milestone 1 stands at 3 of 2 for Gemini Antigravity, recorded in `docs/verification/phase-3a-correction-rounds.md`.

B2. **Preservation of sound code (`Plan §11.4`).**
Candidate commit `ae1bc8178c6ce78f750925443c54422d359a2ff7`, the report `docs/verification/2026-08-12-antigravity-surface-investigation.md`, the 92 probe captures, and both capability records under `/Users/michaeldaley/Library/Application Support/MADVentures/madventures-tui/capability/antigravity/` remain preserved and frozen. No `agy` probes are re-run.

B3. **Successor builder assignment.**
Codex CLI on my MacBook is authorized as the successor builder for Task 56 (`session:codex/m25-task56-r5`) in workspace `/Users/michaeldaley/madventures-tui-m25-task56-codex-r2` on branch `build/m25-task56-r1` on top of `ae1bc8178c6ce78f750925443c54422d359a2ff7`.

B4. **Exact correction of `assertNoUnacceptedIdentityClaim`.**
The successor builder shall rewrite `assertNoUnacceptedIdentityClaim(text)` in `test/phase3a/evidence-pipeline.test.ts` so that:
1. It splits text on clause delimiters including semicolons and newlines: `text.split(/(?:(?:\.|\!|\?)(?=\s|$)\s*|(?:;|\n)+)/)`.
2. It detects any mention of the disallowed primitives: `/(?:^|\W)(?:config get model|init\.model|--model|requested-model echo)\b/i`.
3. If a clause mentions any disallowed primitive AND contains any acceptance verb (`pass`, `accept`, `qualif`, `satisf`, `valid`, `sufficient`):
   - It must contain an explicit rejection term: `/\b(?:no|not|never|neither|nor|none|cannot|fails?|failing|failed|ineligible|rejected|omits?|omitted|absent|unaccepted)\b/i`.
   - It must not contain any affirmative acceptance phrase where the disallowed primitive is asserted as accepted, passing, valid, or sufficient, regardless of preceding clauses, conjunctions, or intervening parenthetical words or punctuation.
4. The helper must reject:
   - `init.model is accepted as identity evidence.`
   - `No provider metadata is present so init.model is accepted as identity evidence.`
   - `No provider metadata is present; init.model, however, is accepted as identity evidence.`
   and all variants, while continuing to accept legitimate report sentences such as `Under spec §2.2, neither \`--model\` nor \`init.model\` is accepted as identity evidence`.

B5. **Supervisor attestation timing race rule on macOS.**
The timing race exception of `DEC-20261017-01` B2 applies to any 100 ms `AbortController` cancellation test in `packages/supervisor/test/attestation.test.ts` (specifically line 50 and line 71). If either test fails during `bun test` with the signal sequence mismatch (observed `SIGTERM` instead of `SIGTERM, SIGKILL`), verification of the full suite is satisfied if running `bun test packages/supervisor/test/attestation.test.ts` alone in foreground achieves at least one clean pass (21 pass, 0 fail) in up to three sequential attempts. If it fails all three attempts or fails on any other assertion or file, the stop rule applies.

B6. **Successor builder host, runtime, and limits.**
The successor builder is a fresh Codex session on my MacBook, with Actor-Id `session:codex/m25-task56-r5`, whose only active workspace and command working directory is `/Users/michaeldaley/madventures-tui-m25-task56-codex-r2`, on branch `build/m25-task56-r1` at `ae1bc8178c6ce78f750925443c54422d359a2ff7`. It runs every test with the macOS certification runtime of `DEC-20261013-03` B2 item 1 (`/Users/michaeldaley/.bun/bin/bun`, version `1.4.2`, revision `744846f844374847c902b5e7fd59b4342a51ef99`, SHA-256 `35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5`). All limits and egress rules of `DEC-20261016-04` B8 apply in full. No `agy` command is executed.

B7. **Independent review.**
A fresh Gemini Antigravity session on my MacBook that has seen no Task 56 correction material reviews the candidate commit produced by Codex in `/Users/michaeldaley/madventures-tui-m25-task56-r1` with the macOS certification runtime of `DEC-20261013-03` B2 item 1, under reviewer id `antigravity`, on the terms of this act. It executes deliberate breaks, verifies B2, B4, B5, and reports whether each ruling of this act holds. It does not run `agy`.

B8. **Order on the MacBook.**
This build and its review run one session at a time, before or after the Task 46 correction build and its review as I direct in the builder prompts, and never at the same time as either.

## Part C: Scope and filing

C1. Under `DEC-20261015-05` B3, this act is filed on `main` together with the Task 56 round 4 review verdict entry in `docs/verification/phase-3a-correction-rounds.md` before the Round 5 correction build starts.

C2. One commit on `build/m25-task56-r1`, on top of `ae1bc8178c6ce78f750925443c54422d359a2ff7`, that changes only `test/phase3a/evidence-pipeline.test.ts`. Every other path stays byte-identical to `be996b1fd7ccbc1f5fdee914b1e9de31020b8461`, including `bun.lock`, every manifest, the adapter registry and `packages/adapter-antigravity`.

C3. Outside the clone, the builder writes only its scratch files and the pull request description at `/Users/michaeldaley/task56-r1-pr/pr-body-r5.md`.

## Part D: Verification

D1. The identity report first, then baseline checks recorded verbatim with `uname -sm`, the user and the session sandbox setting.

D2. The test correction written first, and verified with deliberate breaks for all three negative mutations:
1. `init.model is accepted as identity evidence.` must fail.
2. `No provider metadata is present so init.model is accepted as identity evidence.` must fail.
3. `No provider metadata is present; init.model, however, is accepted as identity evidence.` must fail.

D3. Deliberate breaks for each of the three tests and each assertion of `DEC-20261016-03` B4 item 2 as amended, restored after each with its file SHA-256 confirmed. No break is committed.

D4. The final checks: `bun install --frozen-lockfile`, `bunx tsc --noEmit`, focused test `bun test test/phase3a/evidence-pipeline.test.ts`, scoped tests, full test suite `bun test` (evaluated under B5), and `git diff --check`.

D5. The pull request description maps all governing decisions to the report section or assertion that pins each, and to the commit SHA.

## Part E: Successor builder binding

E1. The commit subject is `fix(test): harden unaccepted identity claim guard against parenthetical clauses`, and the commit message and the pull request description end with these three trailers:

```text
Role-Id: builder
Actor-Id: session:codex/m25-task56-r5
Execution-Surface: codex
```

E2. The builder makes no GitHub call. I push the commit to `build/m25-task56-r1` without force and replace the description of pull request 157.

## Part F: Not authorized

- Running any command of the form `agy plugin <sub> --help`, `agy plugin <sub> -h`, `agy plugins <sub> --help`, or `agy plugins <sub> -h`.
- Re-executing `agy` probes, running `agy update`, `agy install`, or any install, restore, update or downgrade of `agy`.
- Any sign-in, sign-out or configuration change, and any live or governed session of a real surface.
- Deleting, moving or modifying either capability record: `2026-10-16T03:11:04.805Z-827ba22b4aa3.json` (`704f23d9b6d82834bc23bd84e3ee4a58dcb7732e200ce5b74a3ad24a19982cbb`) or `2026-10-16T20:43:50.078Z-a4502aaf310b.json` (`0b7e9d47a31d4e9439ad1846f949f57518defcebfe3ef6ab0dbbfa98673ee983`).
- Any change outside C2.
- Leaving draft or merging pull request 157 before the review of B7 passes.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-17

Actor-Id: founder
