DEC-20261115-02 ADDENDUM 2: line 138 of the environment test and the version lines of the preflight test

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261115-02` Addendum 1 B3 item 2; reads `DEC-20261115-02` B7 item 3 for `packages/supervisor/test/preflight.test.ts`
> **Read with:** `DEC-20261115-02` and its Addendum 1; M0's builder prompt; `DEC-20261023-01` Part B

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The halt.** M0's builder session, `session:codex/3b-m0-r1`, started in `/Users/michaeldaley/builds/m0-r1` under the builder prompt with SHA-256 `286664ccb06fc164d7c939dba2f3fa3498793bdb84e0ee9ea51f986855f88824`, reported that its checks of the harness, the governed build, the runtime, the git identity, the branch and the base passed, and halted with `FOUNDER_DECISION_REQUIRED` before its baseline. It reported that once the helpers of Addendum 1 B3 item 2 give `MINIMAX_API_KEY` a canary, the test "redaction reports which rules ran" of `packages/supervisor/test/environment.test.ts` fails at line 138, which expects an empty list of rules for every registration, while `redact` correctly reports `secret-value:MINIMAX_API_KEY` for `madv-surface-v1`; that Addendum 1 B3 does not let that line change; and that its B4 requires a halt. It reported no commit, no test run and no live or network call, and the clone clean at the binding base. Its halt report is `pr/m0-phase1-report.md`, with SHA-256 `4fef47b6a4f9c26e142347967f4e01b80758162e4fd0f6e6f2e3f79a36f44be4` as it reported it.

A2. **The cause.** Line 138 calls `redact` for each registration on the ambient the helpers build, and `redact` reports a rule for each secret variable of the allowlist that the environment holds, whether or not the text contains its value. The halt is correct. The trial of Addendum 1 A1 did not apply the change of the helpers, so it did not show this.

A3. **A second trial.** The drafting assistant then applied, in a scratch copy of the binding base, the registration and the allowlist with placeholder values, the version of `DEC-20261115-02` B15 item 1, every change Addendum 1 B3 allows, line 138 as B1 rules and the version lines as B2 rules, and ran bare `bun test` under Bun 1.4.4 in its Linux container. It ended with 1937 pass and 8 fail, the same 8 tests that fail there at the unchanged base, and no other. On the way it found:
1. In `packages/supervisor/test/preflight.test.ts`, `2.1.296` is the version the fixture's executable reports at line 32, the version the fixture's registration resolver gives at line 67, the version the registrations of `fixtureWithUnregisteredSurfaces` give at line 85, and the version the executable of `hang()` reports at line 327. With lines 32 and 85 changed, 12 tests of that file fail; with lines 32, 67 and 85, three tests that use `hang()` fail; with all four, the file passes. Line 176 holds `2.1.296` in a test of `identity_mismatch` and passes unchanged.
2. M0's builder prompt names lines 32 and 85 and says that line 67 stays byte-identical. That is the drafting assistant's error, and it would have halted the build again.
The trial holds no dispatch or adapter code, so it shows only what the registration, the allowlist, the version and these test changes do to the tests of the base.

A4. **The drafting assistant.** A Claude Code session drafted Addendum 1, the builder prompt and this addendum. The errors of A2 and A3 item 2 are its own. That is not an independent review.

## Part B: Founder rulings

B1. **Line 138.** Addendum 1 B3 item 2 also lets line 138 of `packages/supervisor/test/environment.test.ts` change, only so that the rules it expects for each registration are those its allowlist's secret variables give on the ambient the helpers build: `secret-value:MINIMAX_API_KEY` for `madv-surface-v1`, and none for `claude-code-v1` and `antigravity-v1`, as before. Nothing else in that test changes.

B2. **The version lines of the preflight test.** Lines 32, 67, 85 and 327 of `packages/supervisor/test/preflight.test.ts` pin the `claude-code` supported version `2.1.296` under `DEC-20261115-02` B7 item 3, and each changes, for that value alone, to `2.1.325`. Line 176 and every other line of that file stay as they are, and the line that `DEC-20261113-01` A10 cites keeps its bytes. Where M0's builder prompt says otherwise, this rules.

B3. **Halts.** Addendum 1 B4 is read with B1 and B2. Any other change to an existing test still halts.

B4. **The record.** M0's build log and its pull request description name this addendum by its SHA-256, the halt of A1 with its report's SHA-256, and each change B1 and B2 allow, by file, test name and line.

B5. **Filing and counting.** This addendum takes effect when I sign it. The builder receives it in its prompt folder with my resume message, and it is filed unchanged with the act that records M0's merge, with Addendum 1. The halt is not a verdict and adds no round. These are new Founder rulings, which Phase 3A plan §11.3 does not count. Nothing else in `DEC-20261115-02` or its Addendum 1 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-16

Actor-Id: founder
