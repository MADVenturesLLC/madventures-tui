# DEC-20261017-03 — Task 46 builder reassignment and snapshot fallback correction authorization

Act identifier: `FOUNDER-ACT-20261017-TASK46-REASSIGNMENT`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The Round 2 review stop under `DEC-20261016-02`.** Under `DEC-20261016-02`, candidate commit `eb36c0a391e1d9113a612c72279d2b685cfeb07c` on `build/m21-task46-r1` was reviewed by Codex in `/Users/michaeldaley/madventures-tui-m21-task46-codex-r2`. The review report was saved at `/Users/michaeldaley/task46-r2-input/codex-review-r2.md` (SHA-256 `d91ea907898b053ffb4afc50d16bf81e4c2d7fe60c1a8a79a9f8ed548017c107`, 26,031 bytes, 261 lines). Codex reported `FAIL — FOUNDER_DECISION_REQUIRED` on two findings:
- Finding 1 (Substantive source defect): In `packages/supervisor/src/build.ts:878-885` and line 941, if `activeSnapshot = await client.getSnapshot()` rejects or throws after `session_activated` is committed to SQLite, `build.ts` catches and leaves `activeSnapshot = null`, which falls through to `if (activeSnapshot === null || activeSnapshot.phase !== "active") return failAt("activate", "activation_failed")`, returning a failure result after a durable activation and valid startup token, breaching `DEC-20261016-02` B4 and Addendum 3 Reading B item 2.
- Finding 2 (Verification stop): In `packages/supervisor/test/attestation.test.ts:84`, `malformed JSON and every incorrect auth predicate fail closed` timed out at 5011.63 ms (exceeding Bun's 5000 ms timeout) during the 18-file scoped test run (`packages/supervisor packages/broker`) due to macOS process-scheduling latency across sequential subprocess spawns under concurrent suite load, outside the narrow signal-sequence exception of `DEC-20261017-02` B5.

A2. **Reassignment requirement under Spec §7.6.** Because returning a failure result after durable activation recurred after a claimed correction, and rubric milestone 6 reaches the two-round correction budget for the current builder (2 of 2), reassignment of the builder role is mandatory under Spec §7.6 and Plan §11.3.

A3. **Preservation of sound code under Plan §11.4.** Candidate commit `eb36c0a391e1d9113a612c72279d2b685cfeb07c` preserves all sound corrections from Round 2:
- B2: `lifelines` validates launch descriptors and records zero resources in `PartialBuildState`; `hosts` calls `spawnPtyHost` once per execution and records `lifeline`, `host`, and instructed `child` launch in `PartialBuildState` in exact creation order; `children` awaits launched and ready facts and updates child PIDs and process groups in place.
- B3: `BuildInput` exported from `packages/supervisor/src/index.ts` accepts only `{ sessionId, envelope, plan, injectFailureAt? }`; `runTransactionalBuild` copies only those four fields; `runTransactionalBuildWithDependencies` is unexported from `index.ts`.
- B4: `fencing_token_issued` and `session_activated` are recorded in `resources` immediately upon SQLite commit before calling `observeLifecycle` or `onStep`; pre-activation observer exceptions fail closed with `{ ok: false }` and full `partialState`; post-activation observer exceptions are suppressed.
- B5: Metadata-only failure detail formatting (`step=<step> [execution=<id>] failure=<failure>`) with zero raw exception messages or attester reason text.
- B6: `reattest` verifies `verdict.provider === envelopeExecution.provider && verdict.provider === reg.provider`.
Items 1, 2, 3, 4, and 5 of the review returned PASS. Under Plan §11.4, sound code is preserved and not discarded when reassignment occurs.

A4. **Reviewer independence and rule amendment.** Spec §6.7 requires the Tier-2 reviewer to never be a session of the builder's own model; thus, a Codex session cannot review work implemented by Codex. With Codex now assigned as successor builder under B3, an explicit Founder ruling is required in B7 to amend `DEC-20261014-01` B4 so that an independent, fresh Gemini Antigravity session can serve as the Tier-2 reviewer for Codex's candidate build.

A5. **Drafting record (`DEC-20261015-05` B7).** These rulings were checked against `DEC-20261014-03` Parts B to F, `DEC-20261016-02` Parts B to F, `DEC-20261017-02` Parts B to G, `DEC-20261014-01` B1, B2, B4 and B7, `DEC-20261015-05` B3, B4 and B7, `DEC-20261016-01` A3, `DEC-20261013-03` B2 item 1, plan Task 46 and sections 9.1, 9.3, 9.5, 11.3 and 11.4, spec §§2.1, 5.1, 6.7, 7.6, 9.5 and 9.13, and the Codex review report at `/Users/michaeldaley/task46-r2-input/codex-review-r2.md`. None of that is an independent review.

## Part B: Founder rulings

B1. **Reassignment of primary implementer.**
Under Spec §7.6 and Plan §11.3, Gemini 4 on Antigravity is reassigned from the primary implementer role for Task 46. Rubric milestone 6 stands at round 2 of 2 for Gemini Antigravity, recorded in `docs/verification/phase-3a-correction-rounds.md`.

B2. **Preservation of sound code (`Plan §11.4`).**
Candidate commit `eb36c0a391e1d9113a612c72279d2b685cfeb07c` on `build/m21-task46-r1` and all passing implementations of B2, B3, B5, and B6 remain preserved.

B3. **Successor builder assignment.**
Codex CLI on my MacBook is authorized as the successor builder for Task 46 (`session:codex/m21-task46-r3`) in workspace `/Users/michaeldaley/madventures-tui-m21-task46-codex-r2` on branch `build/m21-task46-r1` on top of `eb36c0a391e1d9113a612c72279d2b685cfeb07c`.

B4. **Durable-activation success guarantee and snapshot fallback.**
The successor builder shall correct `packages/supervisor/src/build.ts` so that:
1. Once `sessionActivatedRow = ledger.append(activatedEvent)` commits in SQLite, the build is a durable success and MUST NEVER return a failure result (`ok: false`).
2. If `client.getSnapshot()` rejects, throws, or returns a snapshot with `phase !== "active"`:
   - The exception is caught and suppressed.
   - The build constructs or falls back to an active snapshot derived directly from the durable activation and token records:
     ```ts
     activeSnapshot = Object.freeze({
       phase: "active" as const,
       fencingToken: fencingToken ?? 1,
       tokenState: "valid" as const,
       activeWriterExecutionId: envelope.initial_writer,
       ledgerSeq: sessionActivatedRow.sequence,
       eventLog: replayLedgerState(ledger).state.eventLog,
     });
     ```
   - The build returns `{ ok: true, snapshot: activeSnapshot, steps: BUILD_STEPS, state: snapshotPartialState() }`.
3. In `packages/supervisor/test/build-rollback.test.ts`, extend the test suite with an assertion verifying that when `client.getSnapshot()` throws after `session_activated` is committed, `runTransactionalBuild` still returns `ok: true` with an active snapshot and complete partial state, pinning this invariant.

B5. **Supervisor attestation test timing exception on macOS.**
The timing exception of `DEC-20261017-02` B5 applies to any 100 ms `AbortController` cancellation test in `packages/supervisor/test/attestation.test.ts` (specifically line 50 and line 71) AND to process-scheduling load timeouts on line 84 (`malformed JSON and every incorrect auth predicate fail closed`). If line 50 or line 71 fails with signal sequence mismatch, or line 84 times out during a multi-file run (`bun test packages/supervisor packages/broker` or full `bun test`) on the MacBook, verification is satisfied if running `bun test packages/supervisor/test/attestation.test.ts` alone in foreground achieves at least one clean pass (21 pass, 0 fail) in up to three sequential attempts. If it fails all three attempts or fails on any other assertion or file, the stop rule applies.

B6. **Successor builder host, runtime, and limits.**
The successor builder is a fresh Codex session on my MacBook, with Actor-Id `session:codex/m21-task46-r3`, whose only active workspace and command working directory is `/Users/michaeldaley/madventures-tui-m21-task46-codex-r2`, on branch `build/m21-task46-r1` at `eb36c0a391e1d9113a612c72279d2b685cfeb07c`. It runs every test with the macOS certification runtime of `DEC-20261013-03` B2 item 1 (`/Users/michaeldaley/.bun/bin/bun`, version `1.4.2`, revision `744846f844374847c902b5e7fd59b4342a51ef99`, SHA-256 `35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5`). All limits and egress rules of `DEC-20261016-04` B8 apply in full. No live provider binary (`madbridge-claude-v5`, `claude`, `agy`) is executed.

B7. **Independent review and reviewer rule amendment.**
Under Spec §6.7, the Tier-2 reviewer is never a session of the builder's own model; thus, a Codex session cannot review work implemented by Codex. Because B1 reassigns the builder role to Codex (`session:codex/m21-task46-r3`), I rule that the prohibition in `DEC-20261014-01` B4 against a Gemini session serving as Tier-2 reviewer applied to work implemented by Gemini as primary implementer. For work implemented by Codex under B3, I amend `DEC-20261014-01` B4 and authorize a fresh Gemini Antigravity session on my MacBook that has seen no Task 46 Round 3 correction material to review the candidate commit produced by Codex in `/Users/michaeldaley/madventures-tui-m21-task46-r1` with the macOS certification runtime of `DEC-20261013-03` B2 item 1, under reviewer id `antigravity`, on the terms of this act. It executes deliberate breaks, verifies B2, B4, B5, and reports whether each ruling of this act holds. It does not run live provider binaries.

B8. **Order on the MacBook.**
This build and its review run one session at a time, before or after Task 56 Round 5 and its review as I direct, and never at the same time as either.

## Part C: Scope and filing

C1. Under `DEC-20261015-05` B3, this act is filed on `main` together with the Task 46 Round 2 review verdict entry in `docs/verification/phase-3a-correction-rounds.md` before the Round 3 correction build starts.

C2. One commit on `build/m21-task46-r1`, on top of `eb36c0a391e1d9113a612c72279d2b685cfeb07c`, that changes only `packages/supervisor/src/build.ts` and `packages/supervisor/test/build-rollback.test.ts`. `packages/supervisor/src/index.ts` remains byte-identical to `38c7dec24855e228f7649bca3e412b0f10133ab7a99904aa161b4d678d720ce0`. Every other path stays byte-identical to `1ee5a1d5c37fb2c1a77f8b9bf952179c3530f438`, including `bun.lock` and every manifest.

C3. Outside the clone, the builder writes only its scratch files and the pull request description at `/Users/michaeldaley/task46-r1-pr/pr-body-r3.md`.

## Part D: Verification

D1. The identity report first, then baseline checks recorded verbatim with `uname -sm`, the user and the session sandbox setting.

D2. The correction written first, and verified with a deliberate break for B4: simulate failing snapshot collection returning failure or unhandled exception, verify test failure in `build-rollback.test.ts`, restore, and confirm file SHA-256. No break is committed.

D3. The final checks: `bun install --frozen-lockfile`, `bunx tsc --noEmit`, focused test `bun test packages/supervisor/test/build-rollback.test.ts` (must pass 4 of 4), scoped tests `bun test packages/supervisor packages/broker` (evaluated under B5), full test suite `bun test` (evaluated under B5), and `git diff --check`.

D4. The pull request description maps all governing decisions to the assertion or check that pins each, and to the commit SHA.

## Part E: Successor builder binding

E1. The commit subject is `fix(supervisor): guarantee durable activation success on snapshot fallback`, and the commit message and the pull request description end with these three trailers:

```text
Role-Id: builder
Actor-Id: session:codex/m21-task46-r3
Execution-Surface: codex
```

E2. The builder makes no GitHub call. I push the commit to `build/m21-task46-r1` and replace the description of pull request 155.

## Part F: Not authorized

- Task 47, rollback of any kind, and every later task.
- Any live attester for a real surface, any change to `PLAN-OPEN-1` or `PLAN-OPEN-2`, or any capability-record write.
- Any caller of `runTransactionalBuild`, any change to production `start`, or any TUI.
- Running a real provider executable (`madbridge-claude-v5`, `claude`, `agy`), installing or updating anything on any host, or any sign-in by an agent.
- Any change outside C2.
- Leaving draft or merging pull request 155 before the review of B7 passes.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-17
