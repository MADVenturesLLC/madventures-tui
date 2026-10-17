# DEC-20261017-01 — Review correction and authorization for Round 4 of Antigravity surface investigation

Act identifier: `FOUNDER-ACT-20261017-TASK56-R4-CORRECTION`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The Round 3 review stop under `DEC-20261016-06`.** Under `DEC-20261016-06`, candidate commit `2736998a9bff5ff88f3f55b20e93587716d65316` on `build/m25-task56-r1` was reviewed by Codex in `/Users/michaeldaley/madventures-tui-m25-task56-codex-r2`. The review report was saved at `/Users/michaeldaley/task56-r2-input/codex-review-r3.md` (SHA-256 `108b0e559a25a6c5a2cfad31221ddab201ea3cfef50e9a7ca153f2e49da0540c`, 28885 bytes, 282 lines). Codex reported `FAIL — FOUNDER_DECISION_REQUIRED` on two findings:
- Finding 1 (Blocking verification stop outside timing exception): The full test suite failed at `packages/supervisor/test/attestation.test.ts:50:79` (`post-spawn cancellation reaps within the cleanup budget`) with observed signals `SIGTERM` instead of `SIGTERM, SIGKILL`. Line 50 sets a 100 ms timeout to abort an `AbortController`, matching the mechanism of line 71. Because `DEC-20261016-06` B2 textually named line 71, Codex strictly halted without executing isolated reruns.
- Finding 2 (Substantive source defect): In `test/phase3a/evidence-pipeline.test.ts`, `assertNoUnacceptedIdentityClaim` corrected the internal period split for `init.model`, but its regex logic allowed an acceptance claim if preceded by an unrelated negation word without one of the specific conjunctions (`and`, `but`, `while`, `whereas`, `yet`, `however`), as demonstrated by the counterexample: `No provider metadata is present so init.model is accepted as identity evidence.`.
- Finding 3 (Non-counting documentary gap): In `docs/verification/2026-08-12-antigravity-surface-investigation.md` §4.93, minor explanations of skipped commands exceeded cited evidence.

A2. **Attestation timing race on macOS under Bun.** The path `packages/supervisor/test/attestation.test.ts` is unchanged against `be996b1fd7ccbc1f5fdee914b1e9de31020b8461` and is entirely outside Task 56 scope. Both line 49 (`post-spawn cancellation reaps within the cleanup budget`) and line 70 (`forced cleanup accounts for grace escalation and reaping`) rely on `setTimeout(() => c.abort(), 100)`. Under Bun on macOS during multi-file suite runs under CPU load, timer jitter causes child process exit after SIGTERM before SIGKILL is recorded. Conditioning whole-task verification on line 71 alone without line 50 was an incomplete specification in `DEC-20261016-06` B2.

A3. **Integrity of probe captures and capability record.** Candidate commit `2736998a9bff5ff88f3f55b20e93587716d65316` preserves all 92 probe captures against `agy 1.4.0` (`a4502aaf310b2fd6eb657fcfec2fcc31a690fbbd0c2d14c8eefbb556409024ce`). The capability record `/Users/michaeldaley/Library/Application Support/MADVentures/madventures-tui/capability/antigravity/2026-10-16T20:43:50.078Z-a4502aaf310b.json` (SHA-256 `0b7e9d47a31d4e9439ad1846f949f57518defcebfe3ef6ab0dbbfa98673ee983`, 2868 bytes) was parsed and verified by Codex. The superseded record `/Users/michaeldaley/Library/Application Support/MADVentures/madventures-tui/capability/antigravity/2026-10-16T03:11:04.805Z-827ba22b4aa3.json` remains untouched at SHA-256 `704f23d9b6d82834bc23bd84e3ee4a58dcb7732e200ce5b74a3ad24a19982cbb`. Items 1 to 6 of the review returned PASS. The probe outputs, report markdown, and capability records require no re-execution or modification.

A4. **Drafting record (`DEC-20261015-05` B7).** These rulings were checked against `DEC-20261015-04` Parts B to F, `DEC-20261016-03` Parts B to F, `DEC-20261016-04` Parts B to G, `DEC-20261016-05` Parts B to G, `DEC-20261016-06` Parts B to G, `DEC-20261014-01` B1, B2, B4 and B7, `DEC-20261015-05` B3, B4 and B7, `DEC-20261016-01` A3 and B4, `DEC-20261016-02` B9, `DEC-20261013-03` B2 item 1, plan Task 56 and sections 9.3, 9.4 and 11.3, spec §§2.2, 5.1, 5.2, 5.6, 6.6, 7.6 and 9.13, the Codex review report at `/Users/michaeldaley/task56-r2-input/codex-review-r3.md`, and host file metadata read without running the binary. None of that is an independent review.

## Part B: Founder rulings

B1. **Round accounting under Plan §11.3.**
The builder in Round 3 executed verbatim the instructions of `DEC-20261016-06` B3: it preserved dotted identifiers in clause splitting, passed the mandatory negative mutation `init.model is accepted as identity evidence.`, and passed all deliberate breaks. The static vulnerability identified by Codex arose because B3 did not prohibit all conjunction-free compound constructions. Furthermore, full dynamic verification was halted by the out-of-scope harness race in Finding 1 before deliberate breaks could run. Under Plan §11.3, this gap is resolved by specifying the exact robust assertion in this act. Rubric milestone 1 stays at Round 2 for the new builder, recorded in `docs/verification/phase-3a-correction-rounds.md`. If any substantive defect is found in Round 4 review, reassignment under Spec §7.6 is immediate.

B2. **Supervisor attestation timing race rule on macOS (modifying `DEC-20261016-06` B2).**
The timing race exception of `DEC-20261016-06` B2 applies to any 100 ms `AbortController` cancellation test in `packages/supervisor/test/attestation.test.ts` (specifically line 50 `post-spawn cancellation reaps within the cleanup budget` and line 71 `forced cleanup accounts for grace escalation and reaping`). If either test fails during `bun test` with the signal sequence mismatch (observed `SIGTERM` instead of `SIGTERM, SIGKILL`), verification of the full suite is satisfied if running `bun test packages/supervisor/test/attestation.test.ts` alone in foreground achieves at least one clean pass (21 pass, 0 fail) in up to three sequential attempts. If it fails all three attempts or fails on any other assertion or file, the stop rule applies.

B3. **Exact correction of `assertNoUnacceptedIdentityClaim`.**
The builder shall rewrite `assertNoUnacceptedIdentityClaim(text)` in `test/phase3a/evidence-pipeline.test.ts` so that:
1. It splits text on sentence or clause boundaries without breaking dotted identifiers: `text.split(/(?:(?:\.|\!|\?)(?=\s|$)\s*|\n+)/)`.
2. It detects any mention of the disallowed primitives: `/(?:^|\W)(?:config get model|init\.model|--model|requested-model echo)\b/i`.
3. If a clause mentions any disallowed primitive AND contains any acceptance verb (`pass`, `accept`, `qualif`, `satisf`, `valid`, `sufficient`):
   - It must contain an explicit rejection term: `/\b(?:no|not|never|neither|nor|none|cannot|fails?|failing|failed|ineligible|rejected|omits?|omitted|absent|unaccepted)\b/i`.
   - It must not contain any affirmative acceptance phrase where the disallowed primitive is asserted as accepted, passing, valid, or sufficient, regardless of preceding clauses or conjunctions.
4. The helper must reject the Codex counterexample:
   `No provider metadata is present so init.model is accepted as identity evidence.`
   as well as `init.model is accepted as identity evidence.` and all variants, while continuing to accept legitimate report sentences such as `Under spec §2.2, neither \`--model\` nor \`init.model\` is accepted as identity evidence`.

B4. **Preservation of probe captures and capability records.**
The 92 probe captures and capability record `2026-10-16T20:43:50.078Z-a4502aaf310b.json` (SHA-256 `0b7e9d47a31d4e9439ad1846f949f57518defcebfe3ef6ab0dbbfa98673ee983`) remain unchanged. No `agy` probes are re-run.

B5. **Authorization for Round 4 builder session.**
A fresh builder session (`session:antigravity/m25-task56-r4`) is authorized on `build/m25-task56-r1` in `/Users/michaeldaley/madventures-tui-m25-task56-r1` on top of `2736998a9bff5ff88f3f55b20e93587716d65316`. It shall apply the correction of B3, verify deliberate breaks including both negative mutations, run typecheck and test suites under B2, and prepare the pull request description at `/Users/michaeldaley/task56-r1-pr/pr-body-r4.md`.

B6. **Builder, host, runtime and egress (`DEC-20261016-05` B7).**
The builder is a fresh Gemini 4 session on the Antigravity surface on my MacBook, with Actor-Id `session:antigravity/m25-task56-r4`, under `DEC-20261014-01` B1 and B7, whose only active workspace and command working directory is `/Users/michaeldaley/madventures-tui-m25-task56-r1`, on branch `build/m25-task56-r1` at `2736998a9bff5ff88f3f55b20e93587716d65316`. It runs every test with the macOS certification runtime of `DEC-20261013-03` B2 item 1 (`/Users/michaeldaley/.bun/bin/bun`, version `1.4.2`, revision `744846f844374847c902b5e7fd59b4342a51ef99`, SHA-256 `35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5`). All limits and egress rules of `DEC-20261016-04` B8 apply in full. While the session runs, no other Antigravity session is used on my MacBook, including the drafting assistant's, and no other builder, review or test session runs there.

B7. **The review (`DEC-20261016-06` B8).**
A fresh Codex session on my MacBook that has seen no Task 56 material reviews the new head in `/Users/michaeldaley/madventures-tui-m25-task56-codex-r2` with the macOS certification runtime of `DEC-20261013-03` B2 item 1, under reviewer id `codex`, on the terms of `DEC-20261016-06` B8 as read with this act. It executes deliberate breaks, verifies B2, B3, B4, and reports whether each ruling of this act holds. It does not run `agy`. Any substantive finding requires immediate reassignment under Spec §7.6.

B8. **Order on the MacBook (`DEC-20261016-06` B9).**
This build and its review run one session at a time, before or after the Task 46 correction build and its review as I direct in the builder prompts, and never at the same time as either.

## Part C: Scope and filing

C1. Under `DEC-20261015-05` B3, this act is filed on `main` together with the Task 56 round 3 review verdict entry in `docs/verification/phase-3a-correction-rounds.md` before the Round 4 correction build starts.

C2. One commit on `build/m25-task56-r1`, on top of `2736998a9bff5ff88f3f55b20e93587716d65316`, that changes `test/phase3a/evidence-pipeline.test.ts` (and `docs/verification/2026-08-12-antigravity-surface-investigation.md` only if necessary for consistency). Every other path stays byte-identical to `be996b1fd7ccbc1f5fdee914b1e9de31020b8461`, including `bun.lock`, every manifest, the adapter registry and `packages/adapter-antigravity`.

C3. Outside the clone, the builder writes only its scratch files and the pull request description at `/Users/michaeldaley/task56-r1-pr/pr-body-r4.md`.

## Part D: Verification

D1. The identity report of `DEC-20261014-01` B7 first, then the baseline checks, recorded verbatim with `uname -sm`, the user and the session's sandbox setting.

D2. The test correction written first, and verified with deliberate breaks for both negative mutations:
1. `init.model is accepted as identity evidence.` must fail.
2. `No provider metadata is present so init.model is accepted as identity evidence.` must fail.

D3. One deliberate break for each of the three tests and for each assertion of `DEC-20261016-03` B4 item 2 as amended, each with the test that failed, restored after each with its file's SHA-256 confirmed. No break is committed.

D4. The final checks: `bun install --frozen-lockfile`, `bunx tsc --noEmit`, focused test `bun test test/phase3a/evidence-pipeline.test.ts`, scoped tests, full test suite `bun test` (evaluated under B2), and `git diff --check`.

D5. The pull request description maps `DEC-20261015-04` B2 to B9, `DEC-20261016-04` B2 to B7, `DEC-20261016-05` B2 to B6, `DEC-20261016-06` B2 to B6, and B2 to B5 of this act to the report section or assertion that pins each, and to the commit SHA.

## Part E: Builder binding

E1. The commit subject is `fix(test): harden unaccepted identity claim guard against mixed clauses`, and the commit message and the pull request description end with these three trailers:

```text
Role-Id: builder
Actor-Id: session:antigravity/m25-task56-r4
Execution-Surface: antigravity
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
