FOUNDER-ACT-20261016-M20-CORRECTIONS: the independence-domain check, the fingerprint-freeze test and the Task 45 timing tests, built by Gemini 4 on Antigravity on the Ubuntu PC

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `be996b1fd7ccbc1f5fdee914b1e9de31020b8461`
> **Binding base:** the `origin/main` commit the builder prompt names, which must contain this act
> **Read with:** `DEC-20261013-01` (SHA-256 `fd6d9ad9cc014f2bead775929e3d133583113283b41b669099c18e17eba25d1d`) B2, B4, B6 and B9; `DEC-20261014-02` (SHA-256 `2f84abda77be4e15143a09c47e0b75f0a4693b856937f3a8079e39ff34425927`); `DEC-20261015-03` (SHA-256 `e4148fde243d15508513fbf22b58584c519d1d842ca7fefb016d266bf6f08f61`) B5; `DEC-20261014-01` (SHA-256 `f1f2bd610b444103bb16c3c2ce48f15be186b428bdb6c5e1e56c1b98f55338cd`); `DEC-20261013-03` (SHA-256 `249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7`) B2 and B4; `DEC-20261015-05` (SHA-256 `7cecc6c1d08a2a199bc12b1677e77641fd6b9757df2f17351602e58bebd19e43`); spec §9.1; item 3a of my merge authorization of pull request 151, comment 6202101854

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The binding advisory.** `DEC-20261015-03` B5 item 2 carries item 3a of my merge authorization of pull request 151: before any act authorizes a caller of `runPurePreflight`, a change must make preflight fail with `identity_mismatch` when an execution's `independence_domain` differs from its registration, as spec §9.1 requires, with a test that fails without that check. Plan Task 48 calls `runPurePreflight`, so this change comes before M22. This act authorizes that change and cites that item and item 3a.

A2. **The fingerprint freeze.** `DEC-20261015-03` B5 item 4 allows a test asserting that the plan's `repositoryFingerprint` is frozen to be added with the change of A1.

A3. **The Task 45 timing tests.** During the Task 46 build on the MacBook, the full suite failed twice in `packages/supervisor/test/attestation.test.ts` on "forced cleanup accounts for grace escalation and reaping": the test expected SIGTERM followed by SIGKILL and received only SIGTERM. The file passed 21 of 21 when run alone, and the required checks on pull request 155 passed on GitHub's macOS runner. The fixture installs its SIGTERM handler only when it starts running, and the test aborts on a fixed 100 ms timer, so under load the abort can come first. Other tests in that file abort the same fixture on the same timer.

A4. **What stays open.** Item 3 of `DEC-20261015-03` B5, envelope repository binding, is not ruled here. It still must be ruled before any act authorizes a caller of `runPurePreflight`.

A5. **The drafting assistant.** It drafted this act after reading `packages/supervisor/src/preflight.ts`, `packages/supervisor/test/preflight.test.ts`, `packages/supervisor/test/attestation.test.ts`, spec §9.1 and the acts in the header at the commit in the header, and the Task 46 builder's reports. None of that is an independent review.

## Part B: Founder rulings

B1. **The independence-domain check.** Preflight returns `identity_mismatch` when any execution's envelope `independence_domain` differs from its registration's `independence_domain`. The check sits at the same step as the existing provider check of `DEC-20261013-01` B2 and fails at the same position. Nothing else in the order or the failure codes of B2 changes.

B2. **Its test.** `preflight.test.ts` gains exactly one test, named `preflight fails with identity_mismatch when the independence domain differs from the registration`. It fails without the check of B1 and passes with it. The builder proves both.

B3. **The freeze test.** `preflight.test.ts` gains exactly one more test, named `the returned plan's repository fingerprint is frozen`, asserting that the plan's `repositoryFingerprint` object is frozen. If the code does not freeze it, the builder stops for my ruling.

B4. **The timing tests.** In `attestation.test.ts`, every test that aborts a probe whose fixture installs a SIGTERM handler aborts only after that fixture has signalled that its handler is installed, with a bounded wait so that no test can hang. The signal may be a marker file under the test's own `mkdtemp` root or a line the fixture writes. No test is added, removed or renamed in that file, no assertion is removed or weakened, and the timing bounds the assertions check are unchanged. The builder shows the race deterministically: in a scratch copy, a fixed startup delay in the fixture makes the unchanged test fail and the changed test pass. The delay is not committed.

B5. **The test count.** `DEC-20261013-01` B6 is read to allow the two tests of B2 and B3 in `preflight.test.ts`, which then holds twenty-four tests.

B6. **The builder and its host.** The builder is a fresh Gemini 4 session on the Antigravity surface on my Ubuntu PC, in a fresh clone at the binding base, under `DEC-20261014-01` B1 and B7, with Actor-Id `session:antigravity/m20-corrections-r1`. Its only active workspace is that clone. It runs every test with the custodied runtime of `DEC-20261013-03` B2 item 2, under that act's B4. On that host the known-failure set of `DEC-20261013-01` B9 applies, read as item 3b of my merge authorization of pull request 154 reads it.

B7. **External transmission.** As item 3a of my merge authorization of pull request 153 limits `DEC-20261014-03` B9, on the same terms: the builder may send to Google, through the Antigravity surface, what the harness sends while it works; beyond that, only `git fetch` and the package downloads of `bun install --frozen-lockfile` leave my host.

B8. **The reviewer and the count.** A fresh Codex session on my Ubuntu PC that has seen none of this material reviews the exact head, under reviewer id `codex`. A substantive finding counts under rubric milestone 6 for the new builder, as plan §11.3 and `DEC-20261014-01` B2 provide.

B9. **Order on the PC.** The build starts only after the Codex review of pull request 155 has ended, and no other test session runs on the PC during the build or the review.

## Part C: Scope

C1. One commit that changes exactly `packages/supervisor/src/preflight.ts`, `packages/supervisor/test/preflight.test.ts` and `packages/supervisor/test/attestation.test.ts`. Every other path stays byte-identical to the binding base, including `bun.lock` and every manifest.

## Part D: Verification

D1. **Baseline:** `bun install --frozen-lockfile`, `bunx tsc --noEmit`, `test packages/supervisor` and bare `test` with the custodied runtime, each once, in the foreground, recorded verbatim.

D2. **RED and breaks:** the test of B2 failing without the check, recorded verbatim; the deterministic race of B4; and one deliberate break per changed test, each restored with its file's SHA-256 confirmed.

D3. **Final checks:** `tsc` exits 0; `test packages/supervisor` shows 0 fail; bare `test` shows 0 fail apart from the known-failure set; `test packages/supervisor/test/attestation.test.ts` passes five times in a row; `git diff --check` is clean; the changed paths are exactly C1.

## Part E: Builder binding and review

E1. The commit subject is `fix(supervisor): check the independence domain in preflight and harden the probe timing tests`, and the commit message and the pull request description end with these three trailers:

```text
Role-Id: builder
Actor-Id: session:antigravity/m20-corrections-r1
Execution-Surface: antigravity
```

E2. The builder makes no GitHub call. I push the branch and open the draft pull request.

E3. **Review.** PASS only if: B1 holds and the test of B2 fails without it; the test of B3 holds; B4 holds with no assertion weakened and no bound changed; the changed paths are exactly C1; and the reviewer reproduces D3 and the race of B4.

## Part F: Not authorized

- Any caller of `runPurePreflight`, any ruling on envelope repository binding, and Task 48.
- Any change outside C1, including the plan, the spec and every other test file.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-16

Actor-Id: founder
