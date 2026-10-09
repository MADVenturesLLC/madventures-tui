FOUNDER-ACT-20261009-TASK36-EXECUTION-AUTHORIZATION: Phase 3A M15 Task 36, capability-record storage, with the filename fix

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Binding base:** `e649e10ffb72cfdc0cf3ff832650e487a91a3353` (`origin/main` when drafted, the PR #119 merge commit)
> **Governs:** plan `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` (SHA-256 `bdd91837de5eba742e9a2f61553db74c164b58bae9d6fa1b8f96ee748ef18ed8` at the binding base), Task 36
> **Read with:** `DEC-20261004-03`, `DEC-20261006-01` B2, `DEC-20261008-02`, `DEC-20261008-03`, spec sections 5.1, 5.5 and 9.6, plan sections 11.3 and 11.4

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **Task 35 is committed.** PR #119 merged as `e649e10ffb72cfdc0cf3ff832650e487a91a3353` after the re-review PASS that `DEC-20261008-03` accepts. That meets Task 36's only plan precondition. M15 is not closed: the plan puts Tasks 35 and 36 in M15, and its review checkpoint covers both.

A2. **The plan.** Task 36 creates `packages/storage/src/capability-store.ts` and its test, modifies `packages/storage/src/index.ts`, produces `writeCapabilityRecord`, `readCapabilityRecords` and `latestFreshRecord`, and names seven tests. It consumes `validateStorageRoot`, `CapabilityRecordV1`, `capabilityRecordFilename` and `parseSurfaceId`.

A3. **The owed filename fix.** `DEC-20261006-01` B2 rules that the filename defect in `capabilityRecordFilename` is real, and that its fix is owed before any caller of that function outside tests is authorized. `writeCapabilityRecord` is such a caller. This act authorizes the fix in the same commit as Task 36.

A4. **Gaps in the plan text, ruled in Part B.** `validateStorageRoot` needs the repository root and the worktree, which the plan's three signatures do not carry. The plan does not say what the read path does with an entry that is not a canonical record file, whether `latestFreshRecord` returns the newest record or the newest fresh one, what error type the store uses, or how `packages/storage` comes to depend on `packages/protocol`, which it does not today.

A5. **Rounds.** Plan section 4 maps M15 to rubric milestones 4 and 1. The log stands at round 5 under rubric milestone 1 and round 3 under rubric milestone 4. Both exceed the budget of two in plan section 11.3.

## Part B: Founder rulings

B1. **Signatures.** Each function takes the repository root and the worktree after `root`, as `createSessionStorage` does:

```ts
writeCapabilityRecord(root: string, repositoryRoot: string, worktree: string, record: CapabilityRecordV1): string
readCapabilityRecords(root: string, repositoryRoot: string, worktree: string, surface: SurfaceId): ReadonlyArray<CapabilityRecordV1>
latestFreshRecord(root: string, repositoryRoot: string, worktree: string, surface: SurfaceId, now: string, observed: ObservedSurfaceFacts): CapabilityRecordV1 | null
```

B2. **Writing.** `writeCapabilityRecord` first passes the record through `parseCapabilityRecord` and uses only the parsed copy from then on. The directory is `<root>/capability/<surface>`, with the surface taken from the parsed copy. The path is validated with `validateStorageRoot` before anything is created, the directories are created with mode `0700`, and the path is validated again after creation. The file is `capabilityRecordFilename` of the parsed copy, created in one exclusive create with mode `0600` and the JSON of the parsed copy followed by one newline. If the file exists, the call throws and changes nothing. There is no temporary file, no rename, no overwrite and no check-then-write. It returns the absolute path.

B3. **Reading.** `readCapabilityRecords` passes `surface` through `parseSurfaceId` before any path join, validates the root, and returns an empty list if `<root>/capability/<surface>` does not exist. It fails closed: it throws, naming the entry and nothing of its content, for any entry that is not a regular file, any name that is not a canonical record filename, any content that `parseCapabilityRecord` rejects, any record whose `surface` differs from the directory, and any record whose `capabilityRecordFilename` differs from its file name. It returns the parsed records ordered by `evaluated_at` descending, with equal values ordered by file name descending.

B4. **The latest fresh record.** `latestFreshRecord` takes the first record in the B3 order and returns it if `evaluateCapabilityFreshness` says it is fresh, and `null` otherwise. It never falls back to an older record: the newest observation governs. It returns a failing record when that record is the newest and fresh, because a failing record is evidence too.

B5. **The error type.** `CapabilityStoreError` extends `Error` and carries `kind`, one of `invalid_root`, `exists`, `unsafe_entry`, `malformed_record`, `surface_mismatch` and `filename_mismatch`, and `entry`, the file or directory name concerned. It never carries record content. A rejection by `parseCapabilityRecord` during a write propagates unchanged.

B6. **No deletion and no clock.** `capability-store.ts` contains no call that removes, renames or truncates a file or directory. It reads no clock; `now` is always the caller's. Records survive session rollback because nothing under `capability/` is touched by it.

B7. **The filename fix.** In `capabilityRecordFilename`, read `evaluated_at` and `binary_sha256` exactly once each, validate those values, and build the name from the same values. Nothing else in `packages/protocol` changes. The fix is pinned by new assertions inside the existing test `the capability filename is derived from the normalized surface and binary hash, never a display name`: for a record not built by the parser whose two fields are accessor properties, each accessor is read exactly once, and the result is either a rejection or a name built from the values that were validated. Every existing assertion stays. This discharges `DEC-20261006-01` B2.

B8. **The dependency.** `packages/storage/package.json` gains `"dependencies": { "@madventures/protocol": "workspace:*" }`, as `packages/policy` and `packages/ledger` declare it. `bun.lock` changes only by the lines `bun install` writes for that edge.

B9. **The reviewer and the count.** The re-review in Part E is made under reviewer id `gemini-antigravity`, a Tier-2 reviewer plan section 11.3 counts, because the builder in E1 runs on the Codex surface. A substantive finding there counts under rubric milestones 4 and 1, as `DEC-20261004-03` B10 rules for M15: round 6 under rubric milestone 1 and round 4 under rubric milestone 4. It requires reassignment, and I rule before anything else is done. Under `DEC-20261008-03` B3, the reviewer is sent no correction that states expected results.

## Part C: Authorized scope

C1. One commit that changes exactly these paths:

- `packages/storage/src/capability-store.ts` (new)
- `packages/storage/src/index.ts` (exports for the three functions and `CapabilityStoreError`, and nothing else)
- `packages/storage/test/capability-store.test.ts` (new)
- `packages/storage/package.json` (B8 only)
- `bun.lock` (B8 only)
- `packages/protocol/src/capability-record.ts` (B7 only)
- `packages/protocol/test/capability-record.test.ts` (B7 only)

C2. The new test file contains exactly the seven tests the plan names, with these names:

1. `a record is written under capability/<surface>/ with mode 0700 directories and 0600 file`
2. `a surface id containing a path separator is rejected before path construction`
3. `capability records survive session rollback`
4. `a failing record is persisted, not discarded`
5. `the runtime never writes into the repository`
6. `equal evaluated_at values select deterministically by descending canonical filename`
7. `an existing canonical filename is rejected (exclusive-create collision)`

Test 2 also asserts that nothing is created under `capability/`. Test 6 also asserts each B3 rejection and the B4 rule. Test 7 asserts kind `exists` and that the existing file's bytes are unchanged. The protocol test file keeps exactly its twelve tests.

C3. Every other path stays byte-identical to the binding base. No other dependency, no new registry, no producer of records, no investigation tooling and no caller of the store outside tests.

## Part D: Verification

D1. **Before the first edit,** stop and report unless: `origin/main` contains the binding base and every path changed since it is under `docs/`; this act is on `origin/main` with Status ISSUED and a signed Part G; and the plan has the SHA-256 in the header.

D2. **Baseline,** recorded verbatim: `bunx tsc --noEmit`, `bun test packages/storage`, `bun test packages/protocol` and bare `bun test`. The drafter measured `tsc` exit 0 and the protocol suite at 146 pass in 11 files on Linux with Bun 1.3.11. Its storage suite showed 3 of 23 tests failing because it ran as root, which the ownership checks reject; on macOS as the Founder's user they are expected to pass. The builder reports its own host, Bun version and every difference.

D3. **RED proof.** Write the seven tests and the B7 assertions first. Run the focused storage file with no implementation and record the failure verbatim; the plan expects `Cannot find module "../src/capability-store"`. Run the protocol test file against the unmodified `capabilityRecordFilename` and record that the B7 assertions fail. After the implementation passes, record one deliberate break per storage test that makes that test fail, and these breaks: join the path before validating the surface; write with an overwriting flag; skip the post-creation validation; fall back to an older record in `latestFreshRecord`; and read each filename field twice. Restore after each, confirm the file's SHA-256, and commit none of them.

D4. **After implementation:**

```bash
bunx tsc --noEmit
bun test packages/storage/test/capability-store.test.ts
bun test packages/storage packages/protocol
bun test
git diff --check
git diff --name-only e649e10ffb72cfdc0cf3ff832650e487a91a3353
```

`tsc` exits 0. The focused file shows exactly 7 passing. The protocol suite still shows 146 pass in 11 files, and the storage suite shows the baseline plus 7 passing and one more file, with `0 fail`. The full suite shows `0 fail`. `git diff --check` is clean. The changed-path list is exactly C1.

D5. The PR description gets a table that maps each of B1 to B8 to the assertion or check that pins it and to the commit SHA.

## Part E: Builder binding and review

E1. Assign:

```text
Role-Id: builder
Actor-Id: session:codex/m15-task36-r1
Execution-Surface: codex
```

The session reports its harness and model exactly as the harness shows them. If the harness is not Codex, it stops before any other command.

E2. Work in a fresh, full clone at `/Users/michaeldaley/madventures-tui-m15-task36-r1`, detached at the binding base or at `origin/main` if D1 allows it, on a new branch `build/m15-task36-r1`.

E3. Commit subject:

```text
feat(storage): persist capability records under the validated root
```

The body names the B7 fix. The commit and the PR description end with the E1 trailers, each line 72 characters or shorter. One commit.

E4. The builder makes no GitHub calls. It commits, saves the PR title and description outside the clone, and stops with its report: the commit SHA, the D2 baseline, the D3 RED proof and breaks, the D4 results and the D5 table. I then push the branch and open the draft pull request with that description, and that is not a deviation.

E5. **Re-review.** Before the PR leaves draft, a fresh `gemini-antigravity` session that has seen no Task 36 material reviews the exact head in its own worktree, writes its full report to a file in one pass, and gets no guidance during the review. PASS only if all of these pass:

1. The seven tests exist with the C2 names and assertions, the protocol file keeps its twelve tests, and the B7 assertions sit inside the filename test.
2. Writing follows B2: parse first, validate before and after creation, `0700` and `0600`, one exclusive create, no overwrite.
3. Reading follows B3, and `latestFreshRecord` follows B4.
4. Errors follow B5 and carry no record content.
5. B6 holds: no deletion call and no clock read in the module.
6. The filename fix follows B7, and nothing else in `packages/protocol` changed.
7. The changed paths are exactly C1, the dependency change is only B8, and the architecture tests are green.
8. The reviewer reproduces the D4 results and at least three of the D3 breaks.

E6. The verdict is recorded on the PR with the reviewer id and the exact head SHA, and entered in `docs/verification/phase-3a-correction-rounds.md` under plan milestone M15 and rubric milestones 4 and 1.

E7. The Part E review is a task-level review. The M15 review checkpoint covers Tasks 35 and 36 and closes only by a separate Founder act.

## Part F: Not authorized

- Leaving draft and merging: each needs a separate Founder act naming the exact head.
- M15 closure, M16, and every later task.
- Any caller of the store or of `capabilityRecordFilename` outside tests, and any producer of records or investigation tooling.
- Any change to `parseCapabilityRecord`, `evaluateCapabilityFreshness` or any other part of `packages/protocol` beyond B7.
- Any change to `PLAN-OPEN-3`, the plan, a spec or a decision record.
- Running the review.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-09

Actor-Id: founder
