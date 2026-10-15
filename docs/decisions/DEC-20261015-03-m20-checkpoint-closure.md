FOUNDER-ACT-20261015-M20-CHECKPOINT-CLOSURE: the Task 45 review accepted, the M20 review checkpoint closed, and the builder reassignment and Task 46 acts brought onto main

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Closed at:** `78b6ec749f5141128e6a6159fbd97c7dd41341e4` (`origin/main` when drafted, the PR #151 merge commit)
> **Governs:** plan `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`, milestone M20, Task 45
> **Read with:** `DEC-20261013-01` (SHA-256 `fd6d9ad9cc014f2bead775929e3d133583113283b41b669099c18e17eba25d1d`) and its E5 to E7; `DEC-20261014-02` (SHA-256 `2f84abda77be4e15143a09c47e0b75f0a4693b856937f3a8079e39ff34425927`); `DEC-20261015-01` (SHA-256 `ebcf6dcc02e5e053a8e4494a7d2a9154452196c5112098fe6809d427441e95da`); `DEC-20261015-02` (SHA-256 `47c43dee1196e69dc5a74d6162af35bbd6d4815f9251f65685434595bd0b70aa`); `DEC-20261014-01`, the transfer blob at commit `9327deb15163b36ded3cd3a8382c99be4f0c8093`, SHA-256 `f1f2bd610b444103bb16c3c2ce48f15be186b428bdb6c5e1e56c1b98f55338cd`; `DEC-20261014-03`, the transfer blob at commit `6e960563f084b28aabaadfcc4c1d626ff4904078`, SHA-256 `494386cd2f946f2399e610a2b10b7d9f340f18edda4b38e75468a20afa0ce8e3`; plan sections 4 and 11.3

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What remains open.** Plan Task 45 ends by stopping for the M20 review checkpoint. `DEC-20261013-01` E7 rules that Task 45 is the only task in M20 and that the checkpoint closes only by a separate Founder act after the reports of its B8. `DEC-20261013-05` B3 found B8 met, and `DEC-20261015-02` B3 found the report of 2026-10-15 shows no difference that stops Task 45. This is that act.

A2. **The build.** `session:codex/m20-task45-r1` committed `55970568fd96a46015d906a84eaf85500bd00585` on the binding base `09340bfac348c9e0c03d7839d2bf45ba221f83c4`, on my Ubuntu PC with the custodied runtime. The required check Verify (macOS) failed on that head, because two test fixtures assumed Linux temporary paths. Under `DEC-20261015-01` the same session added `b3e6b885dcac855ef7c63eac673e0d3cac7f61ed`, which changes only `packages/supervisor/test/preflight.test.ts`, with no test added, removed or renamed and no assertion changed. Every check succeeded on that head, including Verify (macOS).

A3. **The review.** Under `DEC-20261013-01` E5, a fresh session under reviewer id `gemini-antigravity`, reporting its surface as Antigravity (agy) and its model as Gemini 4 Argon (Medium), reviewed `b3e6b885dcac855ef7c63eac673e0d3cac7f61ed` in its own clone on my Ubuntu PC from the review prompt with SHA-256 `058bf83d9f08f615bec4674857c84f5b58741b7d57aeca82061e3d741f160ccf`, and received no guidance during its work. It returned PASS on all eight items, with one finding, which it classified as not counting under plan section 11.3: no test asserts that the plan's `repositoryFingerprint` is frozen, although the code freezes it. Its report, SHA-256 `d94042d1fdf99189bf840ee8e74e041597cd0e523554e9367c9ba277fdcecf8a`, is posted on pull request 151 as comment 6200725068 with the reviewer id and the head SHA, as E6 requires. My ready-for-review authorization, comment 6201498606, records its gaps: it ran its first base-worktree suite in the background and removed that worktree before the run ended, then ran a clean base suite to completion, where the prompt required each test command once in the foreground; it gave its finding two labels where the prompt asked for one; and the copy of its report into my evidence folder was made by a command run in its session after its verdict was delivered.

A4. **The merge.** Pull request 151 merged as `78b6ec749f5141128e6a6159fbd97c7dd41341e4` on 2026-10-15 at 21:06:10Z. Its parents are `aac4760df25d2bf78cdb217fb3dd49480eeec088` and the reviewed head, it changes exactly the eight paths of `DEC-20261013-01` C1, its trailers parse, `attribution-shape-check.sh main` passes on it, and its push runs succeeded.

A5. **Why no further review.** M20 has one task. It was reviewed independently at its exact head, and the code on `main` is the code reviewed. A further milestone review would re-examine the same eight files. I close on the task review, as I did for M15 and M16.

A6. **Two gaps in the acts that govern Task 46.**

1. `DEC-20261014-01` B1 makes Gemini 4 on Antigravity the primary implementer from the first execution authorization I sign after that act is on `main`. I signed `DEC-20261014-03`, the Task 46 act, on the same day, before `DEC-20261014-01` was filed, so read literally B1 does not reach it.
2. Plan question (iii) of the M10 rulings table, still marked FOUNDER-RATIFICATION-REQUIRED, asks whether Task 46 retains execution identities and launch facts so that the snapshot's `executions` member has a source. `DEC-20261014-03` does not answer it.

A7. **The drafting assistant.** It drafted this act and the acts, prompts and authorizations of M20, and found both gaps in A6. None of that is an independent review.

## Part B: Founder rulings

B1. **The verdict.** I accept the PASS verdict of A3 at `b3e6b885dcac855ef7c63eac673e0d3cac7f61ed`. It adds no round.

B2. **The M20 review checkpoint is closed** at `78b6ec749f5141128e6a6159fbd97c7dd41341e4`, on the accepted verdict and the merge in A4. Rubric milestone 1 stays at **5**, rubric milestone 4 at **3**, and rubric milestone 6 at **0**.

B3. **The builder of Task 46.** `DEC-20261014-03` is the first execution authorization under `DEC-20261014-01` B1. Its rulings take effect when both acts are on `main`. Nothing else in either act changes.

B4. **Retention.** Task 46 does not retain execution identities or launch facts in broker state. Plan question (iii) stays open, and a later act rules on it before any task projects the `executions` member. `DEC-20261014-03` C2 is unchanged.

B5. **Advisories carried forward.** Each stays open for a later act, and no code changes under this act:

1. The change that implements the supported-version range of `DEC-20261015-02` B1, under its B5.
2. **Independence domain, binding.** Item 3a of my merge authorization of pull request 151, comment 6202101854: before any act authorizes a caller of `runPurePreflight`, a change must make preflight fail with `identity_mismatch` when an execution's `independence_domain` differs from its registration, as spec section 9.1 requires, with a test that fails without that check. That act must cite this item and item 3a, and may not issue until that change is on `main`.
3. **Envelope repository binding, open.** Item 3b of the same authorization: a later act rules on whether and how preflight binds the envelope's `repository`, `worktree` and `repository_fingerprint` to the checkout it examines, before any act authorizes a caller of `runPurePreflight`.
4. **The fingerprint freeze assertion.** The finding of A3: a test asserting that the plan's `repositoryFingerprint` is frozen may be added with the change of item 2.
5. The advisories of `DEC-20261011-01` B2 stay open, unchanged.

B6. **What this does not open.** Closing M20 meets the M20 dependency of M21 in the plan section 4 table, and authorizes nothing. Task 46 starts only from a builder prompt I sign that names, as its binding base, the merge of the pull request of C1.

## Part C: Filing and recording

C1. One docs-only pull request files this act, files `DEC-20261014-01` byte for byte from its transfer blob and applies its ratified patch to the spec, files `DEC-20261014-03` byte for byte from its transfer blob, and appends two entries to `docs/verification/phase-3a-correction-rounds.md`, and changes nothing else. `DEC-20261014-01` C1 is read to allow it. The first entry records the Task 45 verdict under plan milestone M20 and rubric milestone 6 as `DEC-20261013-01` E6 requires: the reviewer id, the head, the report's SHA-256, the comment on pull request 151, and no round added. The second records the closure at the commit in B2, the counts unchanged, and the advisories in B5.

## Part D: Not authorized

- Taking up any advisory in B5.
- Any change to code, tests, `bun.lock`, a manifest, the plan, or any spec other than by the patch `DEC-20261014-01` ratifies.
- Task 46 before the pull request of C1 has merged, Task 47 and every later task.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-15

Actor-Id: founder
