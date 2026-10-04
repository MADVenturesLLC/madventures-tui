FOUNDER-ACT-20261004-TASK35-EXECUTION-AUTHORIZATION: Phase 3A M15 Task 35, the capability record and its staleness rules

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Binding base:** `1f07d4db5fbac1a8854d967f2bd0bc610450bc11` (`origin/main` when drafted, the PR #117 merge commit)
> **Governs:** plan `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` (SHA-256 `bdd91837de5eba742e9a2f61553db74c164b58bae9d6fa1b8f96ee748ef18ed8` at the binding base), Task 35
> **Read with:** `PLAN-OPEN-3` (`docs/decisions/PLAN-OPEN-3-capability-horizon.md`, SHA-256 `cca3061b91ffc9eb231003f5e5d7c20230f47cf8c2378f6f1241d57309618562`), `docs/decisions/PLAN-OPEN-approval-record.md`, `DEC-20261004-02`, spec sections 2.3, 5.5 and 9.1

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **M14 is reviewed.** `DEC-20261004-02` B9 closed the M14 review checkpoint at `f6cecd671810e4f68e2760abfc3d3a8758e5e8eb` and stated that the M14 half of the Task 35 precondition is met. It did not authorize Task 35. PR #117 filed that act as merge commit `1f07d4db5fbac1a8854d967f2bd0bc610450bc11`, and both push runs on that commit, `Attribution Shape Check` and `CodeQL`, succeeded.

A2. **`PLAN-OPEN-3` is ruled.** The Founder approved it on 2026-08-15, and the approval record lists its SHA-256 as `cca3061b91ffc9eb231003f5e5d7c20230f47cf8c2378f6f1241d57309618562`, which is the hash of the file on `main` at the binding base. The plan's M15 precondition, a Founder ruling on `PLAN-OPEN-3` before Task 35, is therefore met by that approval. `DEC-20261004-02` F1 left the horizon outside that act. This act relies on `PLAN-OPEN-3` as approved, rules nothing new on the horizon, and does not reopen it.

A3. **The plan.** Task 35 creates `packages/protocol/src/capability-record.ts` and its test, and modifies `packages/protocol/src/index.ts`. It defines `CapabilityRecordV1`, `parseCapabilityRecord`, `StalenessReason`, `evaluateCapabilityFreshness` and `capabilityRecordFilename`. It names twelve tests and expects 12 passing in the focused file. Step 8 stops for the M15 review checkpoint. Task 36 needs Task 35 committed and is not authorized here.

A4. **Rounds, and why this task is tight.** Plan section 4 maps M15 to rubric milestones 4 and 1. The correction-rounds log records rubric milestone 1 at 2 of 2 (Task 60, two rounds, with the correction author reassigned from Opus 5 to Hermes). The log records no round under rubric milestone 4. Plan section 11.3 requires reassignment at more than two rounds, and one verdict that finds substantive defects in more than one rubric milestone adds one round to each. The next independent verdict on M15 work that identifies a substantive defect is therefore round 3 under rubric milestone 1 and round 1 under rubric milestone 4. It requires reassigning the implementer before any further correction.

A5. **Gaps in the plan text, ruled in Part B.** Read against `main` at the binding base:

- `ObservedSurfaceFacts` appears in the signatures of Task 35 and Task 36 and is defined nowhere in the plan, the spec or the code.
- The plan says a record whose `independence_domain` or `organization_id` disagrees with the registration "fails admission", and it says the module exports no function matching `/authoriz|certif|admit/i`. It names no function that performs the cross-check, and spec section 9.1 also requires the `provider` to be copied from the registration.
- The plan names no error type, and says only that an invalid `now` is rejected, while the return type of `evaluateCapabilityFreshness` has no error case.
- The filename template is `evaluated_at`, a hyphen, the first 12 characters of `binary_sha256`, and `.json`. It has no surface component, but the plan's test title says the name is derived from the normalized surface and the binary hash. `binary_sha256` has no stated format, and the filename is built from it.
- The plan does not say whether the parser rejects unknown keys or returns a copy.
- Task 35's four freshness tests do not pin the fixed check order or the exact expiry boundary that `PLAN-OPEN-3` requires.

## Part B: Founder rulings

B1. **`ObservedSurfaceFacts`.** `capability-record.ts` exports this type with exactly three fields: `cli_version` (string), `binary_sha256` (string) and `host` (the same shape as the `host` field of `CapabilityRecordV1`, eight string fields). `PLAN-OPEN-3` compares the CLI version, the binary hash and the host, and nothing else. `binary_path` is not compared. Task 36 consumes this same type. This act does not authorize Task 36.

B2. **Freshness evaluation.** `evaluateCapabilityFreshness(record, now, observed)` validates `now` first, then checks in this fixed order and returns the first failure reached, with no fifth reason:

1. `record.binary_sha256` differs from `observed.binary_sha256`: `binary_hash_changed`.
2. `record.cli_version` differs from `observed.cli_version`: `cli_version_changed`.
3. Any of the eight `host` fields differs by exact string equality: `host_changed`.
4. The epoch milliseconds of `now` are greater than or equal to those of `expires_at`: `horizon_expired`. There is no grace period.
5. Otherwise `{ fresh: true }`.

`now` is valid only when it is a string that parses to a finite value and round-trips through `toISOString()` to the identical canonical UTC string, the same rule `PLAN-OPEN-3` applies to stored timestamps. An invalid `now` throws `CapabilityRecordError` of kind `invalid_now` and never returns `fresh: true`.

B3. **The parser.** `parseCapabilityRecord(raw)` rejects, by throwing `CapabilityRecordError`, any input that is not exactly the shape of `CapabilityRecordV1`:

- the key set at the top level and in `host`, `identity_attestation`, `auth_readiness` and `pty` is closed, so an unknown or missing key is rejected;
- every field has the type the plan's interface gives, every string is non-empty except `sanitized_facts`, `result` values are exactly the plan's enumerations, and the numbers in `pty.observed_ms` are finite and not negative;
- `surface` goes through `parseSurfaceId` and must be a key of `ADAPTER_REGISTRY`, read through `lookupRegistration`, so an unregistered surface is rejected;
- `role_eligibility` entries are each one of `KNOWN_ROLES` and are not repeated;
- `binary_sha256` is exactly 64 lowercase hexadecimal characters;
- `evaluated_at` and `expires_at` follow `PLAN-OPEN-3` as approved: finite, exact canonical UTC round trip, and `expires_at` equal to `evaluated_at` plus exactly 30 days, all checked before anything else about them.

It returns a new object that is deeply frozen and shares nothing with `raw`, and it never changes `raw`.

B4. **Registration cross-check.** For a registered surface, `parseCapabilityRecord` requires `provider`, `organization_id` and `independence_domain` each to equal the registration's value exactly, as spec section 9.1 requires. A mismatch throws `CapabilityRecordError` of kind `registration_mismatch`. This is what the plan's phrase "fails admission" means in the two named tests. The module reads the registry only through `lookupRegistration` and contains no surface identifier of its own, so the architecture test's admission-list scan stays green.

B5. **The error type.** `CapabilityRecordError` extends `Error`. It carries `kind`, one of `schema`, `unregistered_surface`, `registration_mismatch`, `timestamp` and `invalid_now`, and `field`, the name of the offending field. It never carries the raw input, any sanitized fact, or any other record content, so a rejection cannot leak what the record held. It is exported from `capability-record.ts` and added to `index.ts`.

B6. **The filename.** `capabilityRecordFilename(record)` returns exactly `evaluated_at`, a hyphen, the first 12 characters of `binary_sha256`, and `.json`. It has no surface component, because the surface is the directory under spec section 5.1. Because the parser guarantees a canonical timestamp and a hexadecimal hash, the result contains no path separator and no character outside the timestamp and hash alphabets. The plan's test titled "the capability filename is derived from the normalized surface and binary hash, never a display name" is pinned as follows: the result equals that template for a parsed record, it contains no slash or NUL, and two records that differ only in `requested_model`, `provider` or `limitations` produce the same name.

B7. **Purity.** `capability-record.ts` performs no I/O, reads no clock, and creates no record. It never calls `Date.now()` and never constructs a date without an argument. `now` is always the caller's. The only runtime imports are other modules of `packages/protocol/src`.

B8. **Exports.** `capability-record.ts` exports exactly: the types `CapabilityRecordV1`, `ObservedSurfaceFacts` and `StalenessReason`, the class `CapabilityRecordError`, and the functions `parseCapabilityRecord`, `evaluateCapabilityFreshness` and `capabilityRecordFilename`. The test "a passing record is not a live authorization" enumerates the module's exports and asserts that no function name matches `/authoriz|certif|admit/i`. `index.ts` adds exports for those names and nothing else.

B9. **Reassignment.** This act's builder is a new session and not any Actor-Id that worked on Task 60. Any substantive finding in the Part E review of this task is round 3 under rubric milestone 1 and requires reassigning the implementer before any further correction, as A4 states.

## Part C: Authorized scope

C1. Exactly these three paths, and no others:

- `packages/protocol/src/capability-record.ts` (new)
- `packages/protocol/src/index.ts` (the exports in B8 only)
- `packages/protocol/test/capability-record.test.ts` (new)

C2. The test file contains exactly the twelve tests the plan names, with these exact names, and no other test:

1. `capability freshness fails on binary_hash_changed`
2. `capability freshness fails on cli_version_changed`
3. `capability freshness fails on host_changed`
4. `capability freshness fails on horizon_expired`
5. `a record whose independence_domain disagrees with the registration fails admission`
6. `a record whose organization_id disagrees with the registration fails admission`
7. `a passing record is not a live authorization`
8. `the capability filename is derived from the normalized surface and binary hash, never a display name`
9. `parseCapabilityRecord rejects a malformed or nonfinite evaluated_at or expires_at`
10. `parseCapabilityRecord requires exact canonical UTC toISOString() round-trip equality`
11. `expires_at must equal evaluated_at plus exactly 30 days`
12. `evaluateCapabilityFreshness rejects an invalid now value`

C3. Every other path stays byte-identical to the binding base, including every other file in `packages/protocol`, `packages/storage`, `bun.lock` and every manifest.

C4. No new dependency, no storage, no file or network access, no timer, no registry, no producer of records and no second authority. Task 36 and the investigation tooling are outside this act.

## Part D: Verification

D1. **Before the first edit,** re-fetch and stop and report unless all of these hold:

- (a) `origin/main` contains `1f07d4db5fbac1a8854d967f2bd0bc610450bc11`;
- (b) every path changed between that commit and `origin/main` is under `docs/decisions/`, is `docs/verification/phase-3a-correction-rounds.md`, or is `AGENTS.md`;
- (c) this act is on `origin/main` with its status line reading ISSUED, a signed Part G, and no bracketed placeholder or blank signature line left in it;
- (d) `docs/decisions/PLAN-OPEN-3-capability-horizon.md` on `origin/main` has SHA-256 `cca3061b91ffc9eb231003f5e5d7c20230f47cf8c2378f6f1241d57309618562`.

D2. **Baseline before any edit,** recorded verbatim: `bunx tsc --noEmit`, `bun test packages/protocol` and bare `bun test`. The drafter measured `tsc` exit 0 and `bun test packages/protocol` at `134 pass`, `0 fail`, 10 files, on Linux with Bun 1.3.11. The builder reports its own host, Bun version and every difference.

D3. **RED proof.** Write the twelve tests first. Run the focused file with no implementation, and record the failure verbatim. The plan expects `Cannot find module "../src/capability-record"`. That load failure shows that no individual test could pass, but not that each test can fail on its own. After the implementation passes, the builder therefore records, for each of the twelve tests, one deliberate break of the implementation that makes that test fail, restores the file after each, and reports the twelve results. These breaks are not committed.

D4. **After implementation:**

```bash
bunx tsc --noEmit
bun test packages/protocol/test/capability-record.test.ts
bun test packages/protocol
bun test
git diff --check
git diff --name-only 1f07d4db5fbac1a8854d967f2bd0bc610450bc11
```

`tsc` exits 0. The focused file shows exactly 12 passing. The protocol suite shows the D2 baseline plus 12 passing, `0 fail`, and one more file. The full suite shows `0 fail`, including the architecture tests. `git diff --check` is clean. The changed-path list is exactly the C1 paths.

D5. **What the tests assert.**

- Tests 1 to 4 each build one parsed record and one observed set. Test 1 changes the hash, the CLI version, the host and moves `now` past expiry, and expects `binary_hash_changed`. Test 2 changes the CLI version, the host and expiry, and expects `cli_version_changed`. Test 3 changes the host and expiry, and expects `host_changed`. Test 4 changes only expiry: it expects `fresh: true` at one millisecond before `expires_at`, and `horizon_expired` at exactly `expires_at`. Together they pin the fixed order and the boundary.
- Tests 5 and 6 assert `CapabilityRecordError` of kind `registration_mismatch` and the offending field name. The `provider` check in B4 has no named test. A reviewer reports that as advisory and not as a failure of review item 1.
- Test 7 asserts the B8 export rule.
- Test 8 asserts the B6 pins.
- Tests 9 to 11 assert `CapabilityRecordError` of kind `timestamp`, for a malformed value, a nonfinite value, a noncanonical value that parses, and an `expires_at` that is 30 days plus or minus one millisecond.
- Test 12 asserts kind `invalid_now` for a malformed, a nonfinite and a noncanonical `now`.
- The record fixtures use the registry's own values, read from `ADAPTER_REGISTRY` in the test, and no test file hard-codes a second source of truth for them.

D6. The PR description gets a table that maps each of B1 to B9 to the assertion or check that pins it and to the commit SHA.

## Part E: Builder binding and independent review

E1. Assign:

```text
Role-Id: builder
Actor-Id: session:claude-code/m15-task35-r1
Execution-Surface: claude-code
```

E2. Work in a clean, isolated worktree created for this act at the binding base, or at `origin/main` if D1(b) allows it. Do not reuse any earlier worktree.

E3. Commit subject:

```text
feat(protocol): define dated capability records with explicit staleness rules
```

The commit and the PR description end with the E1 trailers, each line 72 characters or shorter. One commit. Open a draft pull request from a new branch. No amend, rebase, force-push or empty commit after the push.

E4. The builder reports the commit SHA, the D2 baseline, the D3 RED proof and twelve breaks, the D4 results, the D6 table, the required-check state, and that the review is pending the Founder. It stops there.

E5. **Independent review.** Before the PR leaves draft, a non-authoring review under reviewer id `codex` inspects the exact head, as the plan's M15 checkpoint names Plato/Codex. The packet contains this act, `PLAN-OPEN-3` and the approval record, all read from `main`, the plan's Task 35 section, spec sections 2.3, 5.5 and 9.1, and:

- the full diff from the binding base to the head;
- the three changed files at the head, with line numbers;
- `adapter-registry.ts`, `normalization.ts`, `surface-id.ts` and the `KNOWN_ROLES` definition in `task-envelope.ts` at the head;
- the admission-list scan in `test/phase3a/architecture-phase3a.test.ts`.

The person assembling the packet confirms every governing act above is on `main` first.

E6. **Review items.** PASS only if all seven pass.

1. The twelve named tests exist with the exact names in C2 and assert D5.
2. The parser enforces B3 and B4, returns a frozen copy, and every rejection is a `CapabilityRecordError` carrying no record content (B5).
3. The evaluator follows B2: the fixed order, the exact boundary, an invalid `now` rejected, no fifth reason.
4. The filename follows B6 and is safe for every record the parser accepts.
5. The exports are exactly B8, and `index.ts` adds nothing else.
6. The changed paths are exactly C1, every other path is byte-identical (C3), and the architecture tests are green with no surface identifier in the new module.
7. The module is pure (B7), and the reviewer reproduces the D4 results and at least the break for each of tests 1 to 4.

E7. The reviewer states what it executed and what it only read. The verdict is recorded on the PR with the reviewer id and the exact head SHA, and entered in `docs/verification/phase-3a-correction-rounds.md` under both plan milestone M15 and rubric milestones 4 and 1.

E8. The Part E review is a task-level review under this act. It is not the M15 review checkpoint, which covers Task 36 as well and closes only by a separate Founder act.

## Part F: Not authorized

- Leaving draft and merging: each needs a separate Founder act naming the exact head.
- Task 36, M15 closure, and every later task. Each needs its own Founder act under the per-task rule.
- Any producer of capability records, any storage, any investigation tooling, and any caller of the new module outside tests.
- Any change to `PLAN-OPEN-3`, the plan, a spec or a decision record.
- A rule that ties `overall` to the results of the identity, authentication and PTY fields. This act does not decide how `overall` is derived. The parser checks only that it is `pass` or `fail`.
- Running the independent review.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-04

Actor-Id: founder
