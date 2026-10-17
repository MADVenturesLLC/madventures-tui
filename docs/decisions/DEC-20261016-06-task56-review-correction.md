# DEC-20261016-06 — Review correction and authorization for Round 3 of Antigravity surface investigation

Act identifier: `FOUNDER-ACT-20261016-TASK56-REVIEW-CORRECTION`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The Round 2 review stop under `DEC-20261016-05`.** Under `DEC-20261016-05`, candidate commit `e1f3cda892250b91ccb25b6e0409dcb5a2a10da9` on `build/m25-task56-r1` was reviewed by Codex in `/Users/michaeldaley/madventures-tui-m25-task56-codex-r2`. The review report was saved at `/Users/michaeldaley/task56-r2-input/codex-review-r2.md` (SHA-256 `6dd5f67cc191ffaedb13f3f9d5756c42e57f39ce244ba337a1c8014ce498891a`). Codex reported `FAIL — FOUNDER_DECISION_REQUIRED` on three findings:
- Finding 1 (Substantive / blocking stop outside timing exception): The full test suite failed at `packages/supervisor/test/attestation.test.ts:71` (`forced cleanup accounts for grace escalation and reaping`) with a signal sequence mismatch, and the sequential foreground rerun `bun test packages/supervisor/test/attestation.test.ts` also failed on that single run (20 pass, 1 fail). The single-rerun exception in `DEC-20261016-03` B5 therefore did not apply, and review execution stopped before deliberate break testing.
- Finding 2 (Substantive builder defect): In `test/phase3a/evidence-pipeline.test.ts`, the helper `assertNoUnacceptedIdentityClaim` split text on periods, exclamation marks, question marks, and newlines. That consumed the period in `init.model`, splitting a required negative sentence such as `init.model is accepted as identity evidence.` into separate fragments `init` and `model is accepted as identity evidence`. Neither fragment matched the identifier token `init.model`, allowing the clause to bypass rejection and defeating enforcement of `DEC-20261016-03` B4 item 2.
- Finding 3 (Non-counting documentary gap): In `test/phase3a/evidence-pipeline.test.ts`, the test checked that prohibited nested plugin help flags were absent, but did not cite the two ratified stop and command evidence records (`builder-stop-r2-reinvestigation.txt` and `builder-step3-commands-r2.txt`) required by `DEC-20261016-05` B3 item 3.

A2. **Attestation timing race on macOS.** The path `packages/supervisor/test/attestation.test.ts` is unchanged against binding base `be996b1fd7ccbc1f5fdee914b1e9de31020b8461` and is entirely outside Task 56 scope. Its test at line 71 sets a 100 ms timeout to abort an `AbortController`. Under Bun on macOS, process scheduling jitter causes the child process to exit after SIGTERM before SIGKILL is recorded in some executions. Sequential runs demonstrate that the test passes 21 of 21 cleanly whenever timer jitter does not interfere. Conditioning whole-task verification on a single run of an unhardened out-of-scope test with a known 100 ms race was an overly brittle formulation in `DEC-20261016-03` B5.

A3. **Integrity of probe captures and capability record.** Candidate commit `e1f3cda892250b91ccb25b6e0409dcb5a2a10da9` cleanly captured all 92 probe commands against `agy 1.4.0` (`a4502aaf310b2fd6eb657fcfec2fcc31a690fbbd0c2d14c8eefbb556409024ce`). The new capability record `/Users/michaeldaley/Library/Application Support/MADVentures/madventures-tui/capability/antigravity/2026-10-16T20:43:50.078Z-a4502aaf310b.json` (SHA-256 `0b7e9d47a31d4e9439ad1846f949f57518defcebfe3ef6ab0dbbfa98673ee983`, 2868 bytes) was parsed and verified by Codex (review items 2, 4, 5). The superseded record `/Users/michaeldaley/Library/Application Support/MADVentures/madventures-tui/capability/antigravity/2026-10-16T03:11:04.805Z-827ba22b4aa3.json` remains untouched at SHA-256 `704f23d9b6d82834bc23bd84e3ee4a58dcb7732e200ce5b74a3ad24a19982cbb`. The probe outputs and capability record do not require modification or re-execution.

A4. **Drafting record (`DEC-20261015-05` B7).** These rulings were checked against `DEC-20261015-04` Parts B to F, `DEC-20261016-03` Parts B to F, `DEC-20261016-04` Parts B to G, `DEC-20261016-05` Parts B to G, `DEC-20261014-01` B1, B2, B4 and B7, `DEC-20261015-05` B3, B4 and B7, `DEC-20261016-01` A3 and B4, `DEC-20261016-02` B9, `DEC-20261013-03` B2 item 1, plan Task 56 and sections 9.3, 9.4 and 11.3, spec §§2.2, 5.1, 5.2, 5.6, 6.6 and 9.13, the Codex review report at `/Users/michaeldaley/task56-r2-input/codex-review-r2.md`, and host file metadata read without running the binary. None of that is an independent review.

## Part B: Founder rulings

B1. **Round accounting.** Under plan §11.3 and `DEC-20261016-05` B8, Finding 2 is a substantive builder defect under rubric milestone 1. Rubric milestone 1 advances to Round 2 for the new builder, recorded in `docs/verification/phase-3a-correction-rounds.md`. Finding 3 is a documentary gap that carries no separate round.

B2. **Supervisor attestation timing race rule on macOS (modifying `DEC-20261016-03` B5 and `DEC-20261016-04` B8).** The test `packages/supervisor/test/attestation.test.ts` is outside Task 56 scope and exhibits the known 100 ms `AbortController` timing race analyzed in `DEC-20261016-01` A3. If `packages/supervisor/test/attestation.test.ts` fails during `bun test` with the signal sequence mismatch on line 71, verification of the full suite is satisfied if running `bun test packages/supervisor/test/attestation.test.ts` alone in foreground achieves at least one clean pass (21 pass, 0 fail) in up to three sequential attempts. If it fails all three attempts or fails on any other assertion or file, the stop rule of `DEC-20261016-04` B8 applies.

B3. **Correction of `assertNoUnacceptedIdentityClaim`.** The builder shall correct `assertNoUnacceptedIdentityClaim` in `test/phase3a/evidence-pipeline.test.ts` so that clause splitting preserves dotted identifiers (for example by splitting on sentence boundaries where terminal punctuation is followed by whitespace or line breaks, without consuming periods inside identifiers). The helper must fail if any clause asserts that `init.model`, `config get model`, `--model`, or `requested-model echo` is accepted, passing, valid, or sufficient as identity evidence. The builder shall test this helper against the exact negative mutation `init.model is accepted as identity evidence.` and verify that it fails.

B4. **Documentary citations in tests.** The builder shall add explicit citations and SHA-256 constants for both ratified evidence records in `test/phase3a/evidence-pipeline.test.ts` where prohibited nested help flags are tested:
1. `/Users/michaeldaley/task56-r2-input/builder-stop-r2-reinvestigation.txt` (SHA-256 `949be70ec95ba91e0500f352306a084861b87d7b246069c0af049bd3a6f04c87`);
2. `/Users/michaeldaley/task56-r2-input/builder-step3-commands-r2.txt` (SHA-256 `a0ab3bba19c2dcb0da4f2e95e89c7d9b5a33bfc63e5cf804fb4afd471f9449d5`).

B5. **No re-run of agy probes.** The 92 probe captures and the stored capability record `2026-10-16T20:43:50.078Z-a4502aaf310b.json` (SHA-256 `0b7e9d47a31d4e9439ad1846f949f57518defcebfe3ef6ab0dbbfa98673ee983`) were verified by Codex and remain unchanged. The builder shall not re-execute probe commands against `agy` or rewrite the capability record.

B6. **Authorization for Round 3 builder session.** A fresh builder session (`session:antigravity/m25-task56-r3`) is authorized on `build/m25-task56-r1` in `/Users/michaeldaley/madventures-tui-m25-task56-r1` on top of `e1f3cda892250b91ccb25b6e0409dcb5a2a10da9`. It shall apply the corrections of B3 and B4, verify deliberate breaks including the `init.model` mutation, run typecheck and test suites under B2, and prepare the pull request description at `/Users/michaeldaley/task56-r1-pr/pr-body-r3.md`.

B7. **Builder, host, runtime and egress (`DEC-20261016-05` B7).** The builder is a fresh Gemini 4 session on the Antigravity surface on my MacBook, with Actor-Id `session:antigravity/m25-task56-r3`, under `DEC-20261014-01` B1 and B7, whose only active workspace and command working directory is `/Users/michaeldaley/madventures-tui-m25-task56-r1`, on branch `build/m25-task56-r1` at `e1f3cda892250b91ccb25b6e0409dcb5a2a10da9`. It runs every test with the macOS certification runtime of `DEC-20261013-03` B2 item 1 (`/Users/michaeldaley/.bun/bin/bun`, version `1.4.2`, revision `744846f844374847c902b5e7fd59b4342a51ef99`, SHA-256 `35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5`). All limits and egress rules of `DEC-20261016-04` B8 apply in full. While the session runs, no other Antigravity session is used on my MacBook, including the drafting assistant's, and no other builder, review or test session runs there.

B8. **The review (`DEC-20261016-05` B8).** A fresh Codex session on my MacBook that has seen no Task 56 material reviews the new head in `/Users/michaeldaley/madventures-tui-m25-task56-codex-r2` with the macOS certification runtime of `DEC-20261013-03` B2 item 1, under reviewer id `codex`, on the terms of `DEC-20261016-05` B8 as read with this act. It executes deliberate breaks, verifies B2, B3, B4, and reports whether each ruling of this act holds. It does not run `agy`. A substantive finding is round 3 for the new builder under rubric milestone 1.

B9. **Order on the MacBook (`DEC-20261016-05` B9).** This build and its review run one session at a time, before or after the Task 46 correction build and its review as I direct in the builder prompts, and never at the same time as either.

## Part C: Scope and filing

C1. Under `DEC-20261015-05` B3, this act is filed on `main` together with the Task 56 round 2 review verdict entry in `docs/verification/phase-3a-correction-rounds.md` before the Round 3 correction build starts.

C2. One commit on `build/m25-task56-r1`, on top of `e1f3cda892250b91ccb25b6e0409dcb5a2a10da9`, that changes `test/phase3a/evidence-pipeline.test.ts` (and `docs/verification/2026-08-12-antigravity-surface-investigation.md` only if necessary for consistency). Every other path stays byte-identical to `be996b1fd7ccbc1f5fdee914b1e9de31020b8461`, including `bun.lock`, every manifest, the adapter registry and `packages/adapter-antigravity`.

C3. Outside the clone, the builder writes only its scratch files and the pull request description at `/Users/michaeldaley/task56-r1-pr/pr-body-r3.md`.

## Part D: Verification

D1. The identity report of `DEC-20261014-01` B7 first, then the baseline checks, recorded verbatim with `uname -sm`, the user and the session's sandbox setting.

D2. The test correction written first, and verified with a deliberate break for the `init.model` assertion: injecting `init.model is accepted as identity evidence.` must cause the test to fail.

D3. One deliberate break for each of the three tests and for each assertion of `DEC-20261016-03` B4 item 2 as amended, each with the test that failed, restored after each with its file's SHA-256 confirmed. No break is committed.

D4. The final checks: `bun install --frozen-lockfile`, `bunx tsc --noEmit`, focused test `bun test test/phase3a/evidence-pipeline.test.ts`, scoped tests, full test suite `bun test` (evaluated under B2), and `git diff --check`.

D5. The pull request description maps `DEC-20261015-04` B2 to B9, `DEC-20261016-04` B2 to B7, `DEC-20261016-05` B2 to B6, and B2 to B6 of this act to the report section or assertion that pins each, and to the commit SHA.

## Part E: Builder binding

E1. The commit subject is `fix(test): correct init.model acceptance guard and add evidence citations for Task 56`, and the commit message and the pull request description end with these three trailers:

```text
Role-Id: builder
Actor-Id: session:antigravity/m25-task56-r3
Execution-Surface: antigravity
```

E2. The builder makes no GitHub call. I push the commit to `build/m25-task56-r1` without force and replace the description of pull request 157.

## Part F: Not authorized

- Running any command of the form `agy plugin <sub> --help`, `agy plugin <sub> -h`, `agy plugins <sub> --help`, or `agy plugins <sub> -h`.
- Re-executing `agy` probes, running `agy update`, `agy install`, or any install, restore, update or downgrade of `agy`.
- Any sign-in, sign-out or configuration change, and any live or governed session of a real surface.
- Deleting, moving or modifying either capability record: `2026-10-16T03:11:04.805Z-827ba22b4aa3.json` (`704f23d9b6d82834bc23bd84e3ee4a58dcb7732e200ce5b74a3ad24a19982cbb`) or `2026-10-16T20:43:50.078Z-a4502aaf310b.json` (`0b7e9d47a31d4e9439ad1846f949f57518defcebfe3ef6ab0dbbfa98673ee983`).
- Any change outside C2.
- Leaving draft or merging pull request 157 before the review of B8 passes.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-16

Actor-Id: founder
