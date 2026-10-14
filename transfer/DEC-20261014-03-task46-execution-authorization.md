FOUNDER-ACT-20261014-TASK46-EXECUTION-AUTHORIZATION: Task 46, the ordered transactional build, built by Gemini 4 on Antigravity

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `cc8d286eb07da598dcb4b10855b395183f61173e`
> **Binding base:** the `origin/main` commit the builder prompt names, which must contain the merge of the Task 45 pull request, `DEC-20261014-01` and the act that closes the M20 review checkpoint
> **Read with:** plan Task 46 and Task 47; spec §§2.1, 2.2, 9.5, 9.6 and 9.13; `PLAN-OPEN-1`; `PLAN-OPEN-2`; `DEC-20261013-01`; `DEC-20261013-03` B2 and B4; `DEC-20261014-01`; `DEC-20261014-02`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What Task 46 is.** Plan Task 46 creates `packages/supervisor/src/build.ts` with `BUILD_STEPS` and `runTransactionalBuild(plan, injectFailureAt?)`, exports them from `packages/supervisor/src/index.ts`, and adds four named tests in `packages/supervisor/test/build-rollback.test.ts`. Plan section 4 maps M21 to rubric milestone 6. Task 47, also in M21, adds mandatory rollback to the same file.

A2. **What already rules it.** Spec §2.1 fixes the build steps and their order, and spec §9.5 fixes token issuance and activation. `PLAN-OPEN-1` gives live re-attestation to Task 46. Spec §9.13 makes a surface without a machine-verifiable actual-session primitive ineligible for a live pair. This act does not restate or change any of them.

A3. **The gaps.** The plan calls the build "ten-step" while `BUILD_STEPS` names twelve members; it does not define `BuildResult`; it leaves to Task 47 the unwinding of what a failed build created, while one Task 46 test injects a failure; and no surface yet has a live actual-session primitive. Part B rules on each.

A4. **The builder.** This is the first task under `DEC-20261014-01`. Its builder is a Gemini 4 session on the Antigravity surface, and its reviewer is not a Gemini session.

A5. **The drafting assistant.** It drafted this act after reading plan Tasks 46 and 47, spec §§2.1, 2.2, 9.5 and 9.13 and `PLAN-OPEN-1` at the commit in the header, and checking that `createSessionStorage`, `Ledger`, `RuntimeBroker`, `createInProcessBrokerClient` and `spawnPtyHost` are exported there. None of that is an independent review.

## Part B: Founder rulings

B1. **The steps.** The twelve members of `BUILD_STEPS` are spec §2.1 build steps 1 to 9 in order: `storage` is step 1; `ledger_open` and `session_open` are step 2; `broker` and `client` are step 3; `lifelines` is step 4; `hosts` is step 5; `children` is step 6; `reattest` is step 7; `adapters` is step 8; `issue_token` and `activate` are step 9. Spec step 10 belongs to Phase 3B, and no member names it. "Ten-step" in the plan is read as the spec's count.

B2. **The result.** `BuildResult` is a discriminated union. Success carries the first `active` snapshot. Failure carries the `BUILD_STEPS` member that failed, a typed failure code, a metadata-only `detail`, and an exported `PartialBuildState` that records, in creation order, every resource the build created. Task 47's `rollbackBuild` consumes that state.

B3. **Rollback stays in Task 47.** On failure, `runTransactionalBuild` stops at the failing step, returns the result of B2, appends no `fencing_token_issued` and no `session_activated`, and exposes no `active` snapshot. It does not unwind; Task 47 does. Each Task 46 test that starts a process or opens a resource releases it in its own teardown, so that no fixture outlives its test.

B4. **Live re-attestation.** The `reattest` step calls, for each execution, the live attester that the surface's registration provides, and passes only when that attester returns a passing actual-session result whose provider and exact model equal the envelope's. Task 46 adds no live attester for a real surface. A surface without one fails the step closed under spec §9.13, so no live pair can activate in Phase 3A. Tests supply fixture attesters, passing and failing, under a disposable `mkdtemp` root.

B5. **Activation.** `issue_token` appends `fencing_token_issued` with value 1 and `activate` appends `session_activated` naming the complete ready execution set, as spec §9.5 requires. The first `active` snapshot is published only after both records are durable.

B6. **Failure injection.** `injectFailureAt` is the plan's test seam. It is optional, it takes only a `BUILD_STEPS` member, and when it is absent the build behaves as if no failure were injected.

B7. **Tests.** `build-rollback.test.ts` holds exactly the four tests plan Task 46 names, with those names. Every child is a fixture executable under a disposable `mkdtemp` root. No test runs a real `madbridge-claude-v5` or `agy`, uses the network, or asserts that code cannot read `process.env`.

B8. **The builder and its host.** The builder is a fresh Gemini 4 session on the Antigravity surface on the Founder's MacBook, in a fresh clone at the binding base, under `DEC-20261014-01` B1 and B7. It runs every test with the macOS certification runtime of `DEC-20261013-03` B2 item 1. On the MacBook no known-failure set applies, so every failure or error at D2 or D4 is a stop.

B9. **External transmission.** For this task only, the builder may send to Google, through the Antigravity surface, for inference, what the harness sends while it works: the builder prompt, this act, the files it reads in its clone, and the output of the commands it runs. Beyond that, only `git fetch` leaves the Founder's host. The builder reads nothing outside its clone other than the macOS test runtime.

B10. **The reviewer and the count.** The Part E review is made by a fresh Codex session on the Ubuntu PC that has seen no Task 46 material, under reviewer id `codex`, a Tier-2 reviewer under `DEC-20261014-01` B4. A substantive finding is round 1 for the new builder under rubric milestone 6, under `DEC-20261014-01` B2. Under `DEC-20261008-03` B3, the reviewer is sent no correction that states expected results.

## Part C: Scope

C1. Exactly three paths change: `packages/supervisor/src/build.ts`, new; `packages/supervisor/src/index.ts`, which adds the exports of Task 46; and `packages/supervisor/test/build-rollback.test.ts`, new. One commit.

C2. Every other path stays byte-identical to the binding base, including `bun.lock` and every manifest. No caller of `runTransactionalBuild`, no rollback, no live attester for a real surface, no TUI and no change to any adapter package.

## Part D: Verification

D1. **Preconditions.** The binding base contains the merge of the Task 45 pull request, `DEC-20261014-01`, this act, and the act closing the M20 review checkpoint, each at the SHA-256 the builder prompt names. `packages/supervisor/src/build.ts` does not exist there. The session's identity report of `DEC-20261014-01` B7 comes first.

D2. **Baseline,** recorded verbatim with the host, the Bun version, the user and the session's sandbox setting: `bun install --frozen-lockfile`, `bunx tsc --noEmit`, `bun test packages/supervisor packages/broker` and bare `bun test`, each run once, one at a time, in the foreground.

D3. **RED and breaks.** The tests are written first and the RED failure recorded verbatim. After the implementation passes, the builder records one deliberate break for each of the four tests, each with the test that failed, restores after each, and confirms each file's SHA-256. No break is committed.

D4. **Final checks.** `tsc` exits 0. `build-rollback.test.ts` shows exactly 4 passing. `bun test packages/supervisor packages/broker` and bare `bun test` show 0 fail. `git diff --check` is clean. The changed-path list against the binding base is exactly C1.

D5. **The description table.** The pull request description maps B1 to B7 to the assertion or check that pins each, and to the commit SHA.

## Part E: Builder binding and review

E1. The builder's attribution, as the final paragraph of its commit message and of the pull request description:

```text
Role-Id: builder
Actor-Id: session:antigravity/m21-task46-r1
Execution-Surface: antigravity
```

E2. The commit subject is the plan's: `feat(supervisor): implement the ordered transactional build`.

E3. The builder makes no GitHub call. It commits, saves the pull request title and description outside the clone, and stops with its report. I push the branch and open the draft pull request.

E4. **Review.** Before the pull request leaves draft, the reviewer of B10 reviews the exact head in its own clone on the Ubuntu PC with the custodied runtime of `DEC-20261013-03` B2 item 2, writes its full report to a file in one pass, and gets no guidance during the review. On that host the known-failure set of `DEC-20261013-01` B9 applies. PASS only if all of these pass:

1. The steps and their order follow B1 and spec §2.1, and no member names a TUI step.
2. No `active` snapshot is exposed before both startup records are durable, under B5.
3. A failed `reattest` exposes no `active` snapshot and appends neither startup record, under B3 and B4.
4. No live attester for a real surface is added, and a surface without one fails closed.
5. The tests follow B7, and the changed paths are exactly C1.
6. The reviewer reproduces the D4 results and at least two of the D3 breaks.

E5. The verdict is recorded on the pull request with the reviewer id and the exact head SHA, and entered in `docs/verification/phase-3a-correction-rounds.md` under plan milestone M21 and rubric milestone 6.

## Part F: Not authorized

- Task 47, rollback of any kind, and every later task.
- Any live attester for a real surface, any change to `PLAN-OPEN-1` or `PLAN-OPEN-2`, or any capability-record write.
- Any caller of `runTransactionalBuild`, any change to production `start`, or any TUI.
- Running a real provider executable, installing or updating anything on any host, or any sign-in by an agent.
- Starting the build before every precondition of D1 holds.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-14

Actor-Id: founder
