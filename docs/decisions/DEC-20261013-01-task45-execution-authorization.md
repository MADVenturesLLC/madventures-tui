FOUNDER-ACT-20261013-TASK45-EXECUTION-AUTHORIZATION: Phase 3A M20 Task 45, the nine pure-preflight steps

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Binding base:** `3f9b414c0ffcaf6955873f757cb55b97b2de77a1` (`origin/main` when drafted, the PR #142 merge commit)
> **Governs:** plan `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` (SHA-256 `400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2` at the binding base), Task 45
> **Read with:** spec `docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md` (SHA-256 `7a5ada083f5e29af397099eb307282242bc1d241ad091d75b8b010065debd286`) §§1.5, 2.1, 2.2, 5.1, 5.2, 5.5 and 9.13; `PLAN-OPEN-1-identity-authentication.md` (SHA-256 `196b91b8c9ffbda3d4319c4a8abc96c20ffe16950ba23864eb8780de356f5aee`); `PLAN-OPEN-2-environment-allowlists.md` (SHA-256 `7ceb367c48adb1954e107ed7cdfd5578277f88c1acadb21561e043d24a95417f`); `DEC-20261010-02` B4 and B5; `DEC-20261011-02` B2; `DEC-20261012-03` B6

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The preconditions.** `DEC-20261011-01` B4 and `DEC-20261012-01` B8 require the Linux amendment on `main` before Task 45 is authorized, and it is. Plan Task 45 names "M16 and M19 reviewed". `DEC-20261011-01` closed the M16 review checkpoint. M19's three tasks were reviewed and merged under their own authorizations, as `DEC-20260831-01` item 1 and `DEC-20261010-02` A5 confirm. The plan section 4 table lists M20's dependencies as M3, M11, M15 and M16, all reviewed. `DEC-20261012-02` B5 and `DEC-20261012-03` B7 say Task 45 does not wait for the tests 4 to 6 work.

A2. **What already rules Task 45.** Plan Task 45 names five files, the `runPurePreflight` interface, eleven `PreflightFailure` members and twenty-two tests. Spec §2.1 fixes the nine steps and that preflight creates nothing. `PLAN-OPEN-1` fixes the identity probes and the `--model` argument. `PLAN-OPEN-2` fixes the installation-identity, `SHELL`, `PATH`, `HOME`, `CLAUDE_CONFIG_DIR` and `TMPDIR` rules, the settings-source and provider-routing invariants, the auth-readiness predicate, the bounded auth-probe execution, the enforcement ownership and the four-way equality. This act does not restate or change any of them.

A3. **Gaps the plan and rulings leave, ruled in Part B.** The plan does not define `PreflightInput` or `LaunchPlan`; place the environment checks among the nine steps; map every step to its failure code; bound the identity probe; say how the repository is fingerprinted without writing to it; say what `attestation.test.ts` holds; or list `packages/supervisor/package.json`, `bun.lock` and the protocol index among the changed paths, though the work needs the storage package and two protocol functions the protocol index does not export. Claude Code's managed-settings file sits at a different path on each operating system, which spec §1.5 does not list as a permitted branch. Capability-record freshness needs observed host facts that include macOS fields, and spec §5.5 and `DEC-20261010-02` B5 bar capability records on Linux.

A4. **Host facts owed.** `PLAN-OPEN-2` requires Task 45 to establish that the `TMPDIR` rules hold on both Macs and that `XDG_RUNTIME_DIR` meets them on the Ubuntu PC, and on the Ubuntu PC where Claude Code keeps its sign-in material and what its `auth status` probe reports. A difference stops Task 45 for my ruling.

A5. **Rounds.** Plan section 4 maps M20 to rubric milestone 6. No round is logged under rubric milestone 6. The budget is two.

A6. **The drafting assistant.** It drafted this act after reading the plan, the spec sections, both rulings and the code Task 45 consumes. It ran nothing. None of that is an independent review.

## Part B: Founder rulings

B1. **Inputs and outputs.** `PreflightInput` carries everything preflight reads, so that `preflight.ts` reads no `process.env` and holds no operating-system branch: the raw task envelope; the repository root and worktree; the ambient environment as a plain record; the per-user installation profile of `PLAN-OPEN-2`; the governed invocation's arguments, for the `--settings` check; the absolute paths of every effective settings source; the storage-root override, if any; the observed host facts that capability freshness compares; the time used for freshness; and an `AbortSignal` for cancellation. Preflight may call `os.userInfo()` as `PLAN-OPEN-2` provides. `LaunchPlan` is a deeply frozen object holding, for each of the two executions, its surface, the absolute executable path, the artifact SHA-256, the argument list and the one constructed environment object; plus the repository fingerprint and the validated storage-root path. It holds no probe output, no credential and no settings content.

B2. **Order and failure codes.** Preflight runs in this order and returns at the first failure:

| Step | Work | Failure |
| --- | --- | --- |
| 1 | parse and validate the envelope | `envelope_invalid` |
| 2 | exactly two declared executions | `cardinality` |
| 3 | fingerprint the repository and worktree | `repository_fingerprint` |
| 4a | `HOME` against the recorded `passwd_home` | `home_mismatch` |
| 4b | the rest of `PLAN-OPEN-2`'s environment-independent checks, including `TERM`, `TMPDIR`, settings sources, `apiKeyHelper` and `--settings` | `auth_not_ready` |
| 4c | resolve each executable against the validated `approved_path`, take its `realpath`, require a regular executable file, and hash it with `Bun.CryptoHasher` | `executable_unresolved` |
| 5a | a surface whose registration has no actual-session identity primitive or no auth-readiness probe | `pair_ineligible`, without running any probe for it |
| 5b | build the allowlisted environment once; a caught `MissingRequiredVariableError` | `auth_not_ready` |
| 5c | the identity probe | `identity_mismatch` |
| 5d | the auth-readiness probe | `auth_not_ready` |
| 6 | provider and exact model against the envelope | `identity_mismatch` |
| 7 | pair eligibility | `pair_ineligible` |
| 8 | propose and validate the storage root without creating it | `storage_root_invalid` |
| 9 | host and platform capabilities for the pair, then capability-record freshness | `host_capability_missing`, then `capability_record_stale` |

At the Phase 3A baseline the Antigravity registration has no actual-session identity primitive and no auth-readiness probe, so every pair that includes it fails at step 5a, as spec §9.13 requires.

B3. **The identity probe.** It runs through the same bounded runner as the auth-readiness probe, with the same execution deadline, cleanup budget, output limits, cancellation and reaping rules `PLAN-OPEN-2` sets. Its stdin is one fixed stream-JSON user message, a constant in `attestation.ts` that carries no repository, user or envelope content. The parser reads only the first `system/init` event: its `model` must equal the envelope's model exactly, and its reported CLI version must be one of the registration's `supported_versions`; a missing event, field or match is `identity_mismatch`. Once that event is read, the runner ends the probe through the cleanup path, and a clean result is still required. Diagnostics follow `PLAN-OPEN-2`'s metadata-only rule for both probes.

B4. **The repository fingerprint.** It is the `realpath` of the repository root, the `HEAD` commit, and the SHA-256 of the output of `git --no-optional-locks status --porcelain=v1 -z`, read with git commands that do not write. A path that is not a git work tree, an unresolved `HEAD`, or a non-zero git exit is `repository_fingerprint`.

B5. **No operating-system branch.** Task 45 adds none. The settings-source paths and the observed host facts are inputs, not computed in `preflight.ts`. The code that will supply the managed-settings path for each operating system is not part of Task 45; before it is built, a Founder act adds that branch to the spec §1.5 table. No capability record exists on Linux under `DEC-20261010-02` B5, so preflight there fails at step 9 as `capability_record_stale`, and that is the intended fail-closed result.

B6. **Tests.** `preflight.test.ts` holds exactly the twenty-two tests plan Task 45 names, with those names: eleven named `preflight fails with ` followed by one failure code each, and the eleven others. `attestation.test.ts` holds the probe-runner and identity-parser tests: one for each behavior `PLAN-OPEN-2` lists for deterministic testing that is not already among the twenty-two; an identity test each for an exact match, a model mismatch, a missing `system/init` event and an unsupported version; and a test that diagnostics hold only metadata on success and on every failure. Every probe test uses fixture executables written under a disposable `mkdtemp` root, as spec §5.2 allows. No test runs a real `madbridge-claude-v5` or `agy`, uses the network, or asserts that code cannot read `process.env`.

B7. **The package, the protocol index and the lock file.** `packages/supervisor/package.json` adds only `"@madventures/storage": "workspace:*"` to its dependencies. `packages/protocol/src/index.ts` adds only the exports of `assertActiveSurfaceCardinality`, `evaluatePairEligibility` and the types their signatures need. `bun.lock` differs from the base only by the lines `bun install` writes for that dependency edge; any other changed line is restored, and `bun install --frozen-lockfile` then leaves it byte-identical. `tsconfig.json` is unchanged.

B8. **The host-facts check.** I run a check myself on each of the three hosts, from a script the drafting assistant drafts after this act is on `main`, and I read it before I run it. It records, without printing any secret, email, organization or raw probe output: whether ambient `TMPDIR` meets each of the five `PLAN-OPEN-2` rules, and on the Ubuntu PC whether `XDG_RUNTIME_DIR` does; whether `madbridge-claude-v5` is on the approved `PATH`, and its version; and on the Ubuntu PC whether a credentials file exists inside the recorded `claude_config_dir`, with its owner and mode only, the four predicate fields `auth status` reports, and whether a `system/init` event from the identity probe carries a model and a CLI version, without their other content. Each report is written outside the clone with the SHA-256 of each evidence file. A fact that differs from `PLAN-OPEN-2`, or a missing installation, stops Task 45 for my ruling. The builder may start before the check, but the pull request does not leave draft until all three reports are in and show no difference.

B9. **The builder.** The builder is a Codex session on the Ubuntu PC, started after the root-cause build of `DEC-20261012-03` B3 has ended, so the two do not run at once. On that host the three tests of `DEC-20261011-02` B2's known-failure set, tests 4, 5 and 6, are expected to fail exactly as at the base, and every other failure or error is a stop.

B10. **The reviewer and the count.** The Part E review is made by a fresh `gemini-antigravity` session that has seen no Task 45 material, a Tier-2 reviewer plan section 11.3 counts. A substantive finding is round 1 under rubric milestone 6. Under `DEC-20261008-03` B3, the reviewer is sent no correction that states expected results.

## Part C: Authorized scope

C1. One commit that changes exactly these paths:

- `packages/supervisor/src/preflight.ts` (new)
- `packages/supervisor/src/attestation.ts` (new)
- `packages/supervisor/src/index.ts` (adds the Task 45 exports)
- `packages/supervisor/test/preflight.test.ts` (new)
- `packages/supervisor/test/attestation.test.ts` (new)
- `packages/supervisor/package.json` (B7 only)
- `packages/protocol/src/index.ts` (B7 only)
- `bun.lock` (B7 only)

C2. Every other path stays byte-identical to the binding base. No caller of `runPurePreflight`, no launcher, no transactional build, no live re-attestation, no capability-record write and no change to any adapter package.

## Part D: Verification

D1. **Before the first edit,** stop and report unless: `origin/main` contains the binding base and every path changed since it is under `docs/`; this act is on `origin/main` with Status ISSUED and signed; the plan, the spec and both rulings have the SHA-256 values in the header; and neither `preflight.ts` nor `attestation.ts` exists at the binding base.

D2. **Baseline,** recorded verbatim with the host, Bun version, user and sandbox settings: `bunx tsc --noEmit`, `bun test packages/supervisor` and bare `bun test`. B9 applies.

D3. **RED proof.** Write the tests first, run `bun test packages/supervisor/test/preflight.test.ts -t "preflight creates nothing"` with no implementation and record the failure verbatim; the plan expects `Cannot find module "../src/preflight"`. After the implementation passes, record one deliberate break per test file that makes at least one test fail, and these named breaks, each with the test that failed: create a directory during preflight; reuse an attestation across two preflights; build the environment twice or pass a different object to a probe; accept a `TMPDIR` inside `/tmp`; skip the `SIGKILL` escalation; put raw probe output into a diagnostic; parse probe output before reaping; time a deadline with `Date.now()`; and accept a model that is not an exact match. Restore after each, confirm each file's SHA-256, and commit none of them. A break that leaves every test passing means a vacuous assertion: fix the assertion, not the report.

D4. **After implementation:**

```bash
bunx tsc --noEmit
bun test packages/supervisor
bun test packages/protocol packages/storage test/phase3a/architecture-phase3a.test.ts
bun test
git diff --check
git diff --name-only 3f9b414c0ffcaf6955873f757cb55b97b2de77a1
```

`tsc` exits 0. `preflight.test.ts` shows exactly 22 passing, and `attestation.test.ts` passes in full. The protocol, storage and architecture tests pass. The full suite shows `0 fail` apart from exactly the three tests B9 names. `git diff --check` is clean. The changed-path list is exactly C1. `preflight.ts` contains no `mkdirSync`, `writeFileSync` or `new Ledger(`, and neither new source file reads `process.env` or `Date.now()`.

D5. The PR description gets a table that maps each of B1 to B7 to the assertion or check that pins it and to the commit SHA.

## Part E: Builder binding and review

E1. Assign:

```text
Role-Id: builder
Actor-Id: session:codex/m20-task45-r1
Execution-Surface: codex
```

E2. Work in a fresh, full clone named `madventures-tui-m20-task45-r1` in the Ubuntu PC home directory, on a new branch `build/m20-task45-r1` at the binding base.

E3. Commit subject:

```text
feat(supervisor): implement pure preflight with no governed side effects
```

The commit and the PR description end with the E1 trailers, each line 72 characters or shorter. One commit.

E4. The builder makes no GitHub calls. It commits, saves the PR title and description outside the clone, and stops with its report: the commit SHA, the D2 baseline, the D3 RED proof and breaks, the D4 results and the D5 table. I then push the branch and open the draft pull request with that description, and that is not a deviation.

E5. **Review.** Before the PR leaves draft, the reviewer of B10 reviews the exact head in its own clone on the Ubuntu PC, writes its full report to a file in one pass, and gets no guidance during the review. PASS only if all of these pass:

1. The steps, their order and their failure codes follow B2, and each failure code has a test.
2. Preflight creates nothing, reads no `process.env`, and holds no operating-system branch, under B1 and B5.
3. One environment object is built once and reused byte-for-byte across both probes and the `LaunchPlan`.
4. Both probes follow `PLAN-OPEN-2`'s bounds and B3, including the cleanup path and metadata-only diagnostics.
5. The fingerprint follows B4, and no git command writes.
6. The tests follow B6, and the changed paths are exactly C1 under B7.
7. The reviewer reproduces the D4 results and at least four of the D3 breaks.

E6. The verdict is recorded on the PR with the reviewer id and the exact head SHA, and entered in `docs/verification/phase-3a-correction-rounds.md` under plan milestone M20 and rubric milestone 6.

E7. Task 45 is the only task in M20. The M20 review checkpoint closes only by a separate Founder act, after the reports of B8.

## Part F: Not authorized

- Leaving draft and merging: each needs a separate Founder act naming the exact head.
- M20 closure, Task 46 and every later task.
- Any caller of the new functions, any launcher, and the code that supplies settings-source paths or observed host facts.
- Any operating-system branch, any change to the spec §1.5 table, any capability record on Linux, and any change to `PLAN-OPEN-1`, `PLAN-OPEN-2`, the plan, a spec or a decision record.
- Running a real provider executable in a test, installing anything on a host, and running the review.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-13

Actor-Id: founder
