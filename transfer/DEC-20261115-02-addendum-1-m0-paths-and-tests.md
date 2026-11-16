DEC-20261115-02 ADDENDUM 1: M0's paths, existing tests and parser

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261115-02` B7 item 3 and B14, and where M0 places madv-surface's parsers
> **Read with:** `DEC-20261115-02`; Phase 3B plan §2, §2D item 5 and §3 M0; `DEC-20261108-01` B12; `DEC-20261113-01` A10; `DEC-20261023-01` Part B

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The trial.** To prepare M0's builder prompt, the drafting assistant applied to a scratch copy of the binding base `0825a1e349ca5ea6427eea5f2de79dff234dc8f7` the registration of `DEC-20261115-02` B2, with placeholder limitations, the allowlist of its B6 and the version of its B15 item 1, and ran bare `bun test` under Bun 1.4.4 in its own Linux container. That is not a certification runtime, and the trial is no evidence for M0: it shows only which tests of the base those changes make fail. In that container the unchanged base failed 8 of its 1945 tests, on storage-root ownership and process timing. The changes failed 11 more, and targeted runs of each change alone placed them:
1. **The version alone, already allowed.** In `packages/protocol/test/adapter-registry.test.ts`, "claude-code registration matches the PLAN-OPEN-1 ruling field for field", which pins `2.1.296` at line 18; in `packages/supervisor/test/preflight.test.ts`, "preflight fails with pair_ineligible" and "a surface without an actual-session identity primitive is ineligible", whose fixture pins `2.1.296` at lines 32 and 85. `DEC-20261115-02` B7 item 3 lets these change for that value.
2. **The version alone.** In `test/phase3a/evidence-pipeline.test.ts`, "every investigated surface has both a capability record and a committed report": lines 840 to 843 require the committed Task 57 record, whose `cli_version` is `2.1.314`, to name in its limitations every version the `claude-code` registration supports now. The record names `2.1.296`, the version in force when it was made.
3. **The registration alone.** In `packages/protocol/test/adapter-registry.test.ts`, "the registry contains exactly the two Founder-ratified surfaces", lines 64 to 69, and "registry membership cannot be mutated at runtime", lines 124 to 126, which pin the registry's size at two and its keys at `antigravity` and `claude-code`.
4. **The registration alone.** In `packages/supervisor/test/environment.test.ts`, "no ambient variable outside the allowlist survives", which pins two registrations at line 46, and "the same registration produces byte-identical environments on repeated calls". The helpers at lines 22 to 28 give each registration only the common required variables, and `CLAUDE_CONFIG_DIR` for `claude-code-v1`, so for `madv-surface-v1` the required `MINIMAX_API_KEY` is missing.
5. **Either change.** In `test/phase3a/harness-separation.test.ts`, "no file under apps/ or packages/*/src statically imports, command-dispatches to, or argument-gates runtime-harness", "no production file uses a dynamic import or environment-gated route to the test tree" and "no production file constructs a filesystem path into the test tree" fail with `exception-drift`. Line 24 pins the SHA-256 of `packages/protocol/src/adapter-registry.ts`, `3129d3cead6312e4cb90eb6832e6a46597f3d352254021d5929b82ec651f4566`, as the exact-byte exception the Task 48 supplement approved for the one call of `Symbol.iterator` on `source` in that file, so any change to that file is drift.
`DEC-20261115-02` B7 item 3 lets an existing test change only where it pins `2.1.296`, or where an architecture test must admit the new entry. Items 2 to 5 are not clearly either, so under its B14 the build would halt on them.

A2. **The parser.** Plan §3 M0 places in `packages/adapter-madv-surface` the one parser of madv-surface's events that serves the identity probe, the startup attestation and the checks of every later response, and has the probe parsers dispatched by registration in `attestation.ts` and `preflight.ts`. At the base, `packages/supervisor/package.json` declares only `@madventures/protocol` and `@madventures/storage`, and `tsconfig.json` maps each workspace package by one `paths` line. Neither file, nor the line of `bun.lock` that lists the supervisor's dependencies, is a path of B7 item 3, so the supervisor cannot import the adapter's parser by a declared dependency; an import across packages by relative path is what plan §2D item 5 records as a defect. In the same scratch copy, with the supervisor declaring the new package as a workspace dependency and one `paths` line added to `tsconfig.json`, `bun install` wrote to `bun.lock` only the new workspace's block, its package entry and one line in the supervisor's block; `bunx tsc --noEmit` printed nothing; and `test/architecture-boundaries.test.ts`, `test/phase3a/architecture-phase3a.test.ts`, `test/phase3a/harness-separation.test.ts` and the tests of `packages/supervisor`, `packages/preflight` and `packages/claim-boundary` failed only as A1 items 4 and 5 say. Without the `paths` line, neither `tsc` nor Bun resolved the import.

A3. **The drafting assistant.** A Claude Code session drafted `DEC-20261115-02` and wrote its B7 item 3 without running the base's suite against the change; the gaps of A1 and A2 are its errors. It ran the trial of A1 and A2 and drafted this addendum. That is not an independent review.

## Part B: Founder rulings

B1. **Paths.** `DEC-20261115-02` B7 item 3 also allows, and no more:
1. `packages/supervisor/package.json`, only to declare `@madventures/adapter-madv-surface` as `workspace:*`;
2. `tsconfig.json`, only to add one `paths` line for `@madventures/adapter-madv-surface`, in the form of the others;
3. `bun.lock`, only for what the new workspace and that declaration need.
The new package declares no dependency on `@madventures/supervisor`, and no external dependency is added.

B2. **The parser.** The parsers built for madv-surface alone under `DEC-20261115-02` B3 item 4 and B4, and the input encoder of plan §3 M0, live in `packages/adapter-madv-surface`. `attestation.ts` and `preflight.ts` dispatch madv-surface's probes to them by registration, and the one bounded runner of `attestation.ts` runs every probe, with the limits of B3 item 5 and B4. Claude Code's parsers, its probe input and its limits stay as they are.

B3. **Existing tests.** Beyond `DEC-20261115-02` B7 item 3, exactly these existing tests may change, each only as stated. Every other existing test stays byte-identical.
1. The two tests of A1 item 3, only so that they admit the `madv-surface` registration as they admit the other two. The first test's name may say three in place of two.
2. The two tests of A1 item 4, only so that they hold for `madv-surface-v1` as they hold for the other two allowlists: the count of line 46 admits the third registration, and the helpers at lines 22 to 28 give `madv-surface-v1`'s required `MINIMAX_API_KEY` a synthetic canary value, never a real key.
3. The SHA-256 at line 24 of `test/phase3a/harness-separation.test.ts` becomes that of `packages/protocol/src/adapter-registry.ts` at the head, and nothing else in that file changes. I approve the file's exact bytes at the head as the exception the Task 48 supplement approved, on two conditions: its diff against the binding base adds only the `madv-surface` registration and its line in `ENTRIES` and changes only the `claude-code` supported version; and the test's analysis of the file at the head finds the same expressions as at the base, apart from the drift itself.
4. In the test of A1 item 2, lines 840 to 843 compare the committed Task 57 record with the version the `claude-code` registration supported when that record was made, `2.1.296`, written as that value, in place of the registration's current versions. Nothing else in that test changes.

B4. **Halts.** `DEC-20261115-02` B14 is read with these paths and these tests. Any other path, or any other change to an existing test, still halts.

B5. **The record.** M0's build log and its pull request description name this addendum by its SHA-256, and each change it allows by file, test name and lines.

B6. **Filing and counting.** This addendum takes effect when I sign it. M0's builder receives it in its prompt folder with its SHA-256, and it is filed unchanged with the act that records M0's merge. These are new Founder rulings, which Phase 3A plan §11.3 does not count. Nothing else in `DEC-20261115-02` changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-16

Actor-Id: founder
