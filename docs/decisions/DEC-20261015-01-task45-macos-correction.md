FOUNDER-ACT-20261015-TASK45-MACOS-CORRECTION: one correction commit to make the Task 45 tests hold on macOS

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `cb240e69c930d97924de101e3049a3578a637252`
> **Amends:** `DEC-20261013-01` (SHA-256 `fd6d9ad9cc014f2bead775929e3d133583113283b41b669099c18e17eba25d1d`), C1 and E3 only, for pull request 151
> **Read with:** `DEC-20261014-02` (SHA-256 `2f84abda77be4e15143a09c47e0b75f0a4693b856937f3a8079e39ff34425927`); plan §11.3 (plan SHA-256 `400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2`); `DEC-20261013-03` B2; check run 116195372963 of pull request 151

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The pull request.** The Task 45 builder, `session:codex/m20-task45-r1`, committed `55970568fd96a46015d906a84eaf85500bd00585` on `build/m20-task45-r1` at the binding base `09340bfac348c9e0c03d7839d2bf45ba221f83c4`, and I opened it as draft pull request 151. It changes exactly the eight paths of `DEC-20261013-01` C1. Its builder ran every test on the Ubuntu PC, and it reports D4 passing there.

A2. **The failure.** On that head, the required check Verify (macOS), job 116195372963 of run 38665177801 on `macos-15`, failed at its Test step. Its annotations name seven failures in `packages/supervisor/test/preflight.test.ts`: at line 77, from lines 93, 102 and 103, `storage_root_invalid` was received where `auth_not_ready`, `host_capability_missing` and `capability_record_stale` were expected; and at lines 115, 122, 125 and 134, a value expected true was false. Verify on `ubuntu-24.04` succeeded on the same head. The failures are assertion failures, not an infrastructure error, so a re-run does not apply.

A3. **The drafting assistant's reading.** It read the head and did not run it. On macOS, `os.tmpdir()` lies under `/var`, which is a symbolic link, and `validateStorageRoot` rejects a storage root with a symbolic-link component; the fixture's storage root and its "/tmp descendant" case appear to rest on Linux paths. This reading is a lead, not a finding. The builder establishes the cause and records it.

A4. **What stays owed.** The host-facts check of `DEC-20261013-01` B8 and the review of its E5 are still owed. This act changes neither.

## Part B: Founder rulings

B1. **The correction.** I authorize one further commit on `build/m20-task45-r1`, on top of `55970568fd96a46015d906a84eaf85500bd00585`, whose only purpose is to make Verify (macOS) succeed without changing what any test proves. It changes only paths listed in `DEC-20261013-01` C1. After it, the branch holds exactly two commits on the binding base, and the changed paths against the binding base are still exactly that C1. In `DEC-20261013-01`, C1 and E3 read "two commits: the first and the correction of `DEC-20261015-01`" in place of "One commit". Nothing is amended, rebased, squashed or force-pushed.

B2. **What may change.** A test fixture or assertion may change only so that it tests on macOS the same property it tests on Linux. No test is added, removed or renamed, and no assertion is removed or weakened. `preflight.ts` or `attestation.ts` changes only if the builder shows the cause is there, and then only as far as the cause requires. Every rule of `DEC-20261013-01`, `DEC-20261014-02`, `PLAN-OPEN-1` and `PLAN-OPEN-2` stands: no operating-system branch, no read of `process.env`, the `TMPDIR` rules, and the storage-root rules of `packages/storage`, including the rejection of a symbolic-link component.

B3. **The builder.** The correction is made by the session that made the first commit, if it is still open. If it is not, a fresh Codex session on the Ubuntu PC makes it under Actor-Id `session:codex/m20-task45-r1-c1`, after reading `DEC-20261013-01`, `DEC-20261014-02`, this act and the final report of the first session. It works in the existing clone `madventures-tui-m20-task45-r1`, with the custodied binary and the known-failure set of `DEC-20261013-01` B9, and makes no GitHub call.

B4. **Verification on the Ubuntu PC.** The builder records the cause, with the lines it relies on; reruns the whole of `DEC-20261013-01` D4 on the corrected head; and reruns every D3 break whose failing test lies in a file the correction changes, each restored and confirmed by SHA-256. For each changed assertion or fixture, the report shows the text before and after and says why the property tested is unchanged.

B5. **Verification on macOS.** The PC cannot run the macOS lane, so the macOS evidence is Verify (macOS) on the corrected head. I push the correction as a fast-forward of `build/m20-task45-r1`. If Verify (macOS) or Verify fails on the corrected head, no further commit is made without my ruling.

B6. **The commit and the description.** The commit subject is `fix(supervisor): make the Task 45 preflight tests hold on macOS`. The commit message and the pull request description end with the builder's trailers: those of `DEC-20261013-01` E1 for the first session, or the same with the Actor-Id of B3 for a fresh one. The builder saves a full replacement description outside the clone: the first description's content kept, the D5 table naming both commit SHAs, and a Correction section with the cause and the evidence of B4. I replace the description of pull request 151 with it.

B7. **Counting.** No review verdict has been made on Task 45, and plan §11.3 counts rounds only from review verdicts. The finding is also one §11.3 excludes: a host-specific finding impossible to observe on the builder's execution host before the required certification-host runs. It adds no round. Rubric milestone 6 stays at **0**.

B8. **Effect and filing.** This act takes effect when I sign it, for the work of B1 to B6. One docs-only pull request files it and changes nothing else, and it merges before pull request 151 leaves draft.

## Part C: Not authorized

- Any path outside `DEC-20261013-01` C1, any third commit, and any history rewrite.
- Any change to a rule that the tests check, to `packages/storage`, to a workflow, or to a plan, spec or other decision record.
- Leaving draft, the review of `DEC-20261013-01` E5 before Verify (macOS) succeeds on the corrected head, and merging.
- Task 46 and every later task.

## Part D: Signature

Signed:

— Michael Daley

Date: 2026-10-15

Actor-Id: founder
