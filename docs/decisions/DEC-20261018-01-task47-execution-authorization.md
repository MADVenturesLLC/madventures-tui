# DEC-20261018-01 — Task 47 execution authorization: mandatory rollback after every build step

Act identifier: `FOUNDER-ACT-20261018-TASK47-EXECUTION-AUTHORIZATION`

> **Status:** ISSUED (ratified by Founder 2026-10-18)
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Binding base:** `911d44aa18a7ba5b332d469683faae22d29e3b73` (origin/main)
> **Target milestone:** M21 (completion)
> **Target branch:** `build/m21-task47-r1`
> **Read with:** plan Task 47; spec §§2.1, 6.3, 9.6; `DEC-20261014-03`; `DEC-20261017-02` B7; `DEC-20261017-03` B7

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **Plan alignment.** Phase 3A plan §5 Task 47 implements mandatory rollback after any build step failure, completing Milestone M21. Task 46 established `PartialBuildState` recording every created resource in forward creation order; Task 47 implements `rollbackBuild` to consume this state in reverse order and guarantee that no partial session, orphaned process, leaked descriptor, or valid fencing token survives a failed build.

A2. **Preconditions satisfied.**
- Task 46 (ordered transactional build) merged to `main` at `fda8cfb67daca8faa5c589711d8c1f34f82178c7` (PR #155).
- Task 56 (Antigravity surface investigation) merged to `main` at `911d44aa18a7ba5b332d469683faae22d29e3b73` (PR #157).
- Working tree is clean at the binding base.

A3. **The builder and reviewer seats.**
- Builder: Successor builder Codex CLI on the Founder's MacBook (`session:codex/m21-task47-r1`).
- Tier-2 Reviewer: Independent fresh Gemini Antigravity session on the MacBook (`antigravity`), under the reviewer cross-assignment doctrine established in `DEC-20261017-02` B7 and `DEC-20261017-03` B7.

## Part B: Founder rulings

B1. **The rollback contract.**
`rollbackBuild(state: PartialBuildState): Promise<RollbackOutcome>` is the sole unwinding entry.
It unwinds in exact reverse creation order:
1. **Adapters & Tokens**: If `issue_token` completed, the token is invalidated; if `session_open` is durable, `session_abort` and `fencing_token_invalidated` are appended as an atomic `appendMany` pair in SQLite ledger (the reducer-legal order ratified for Task 19; invalidation is illegal from `starting`).
2. **Descendant & Child Processes**: Every recorded child PID is terminated through the termination ladder (SIGTERM → responsive grace → SIGKILL escalation).
3. **Pty Hosts & Lifelines**: Every recorded host process and lifeline pipe is closed and reaped.
4. **Broker & Client**: Broker state and client streams are closed fail-closed.
5. **Storage Unwinding**: If failure occurs before `session_open`, the session directory under `root/sessions/<sessionId>` is removed; capability records are never deleted.

B2. **The outcome structure.**
`RollbackOutcome` is a typed record containing:
```ts
export interface RollbackOutcome {
  readonly sessionId: string;
  readonly completedSteps: readonly BuildStep[];
  readonly hostsKilled: number;
  readonly childrenKilled: number;
  readonly descriptorsClosed: number;
  readonly sessionDirRemoved: boolean;
  readonly abortAppended: boolean;
}
```

B3. **Containment reuse.**
`rollbackBuild` reuses the existing live containment pathways (`escalateWedgedHost`, `rollbackSessionStorage`, `invalidateToken`) rather than implementing ad-hoc process killing.

B4. **Zero residual invariant.**
Under §2.1 and §6.3, tests must assert:
- Zero surviving host or child processes.
- Zero open descriptors beyond baseline.
- Zero valid live fencing tokens.
- Exactly one `session_abort` record if and only if failure occurred at or after `session_open`.
- Capability records remain intact and are never deleted by startup rollback.

B5. **Supervisor attestation test timing race rule.**
The timing race exception of `DEC-20261017-01` B2, `DEC-20261017-02` B5, and `DEC-20261017-03` B5 applies to `packages/supervisor/test/attestation.test.ts` (specifically line 50, line 71, and line 84) during full suite runs under multi-process load on macOS.

## Part C: Scope

C1. Exactly three paths change:
- `packages/supervisor/src/build.ts` (implements `rollbackBuild`)
- `packages/supervisor/src/index.ts` (exports `rollbackBuild` and `RollbackOutcome`)
- `packages/supervisor/test/build-rollback.test.ts` (rollback tests across all 12 build step failure points)

C2. Every other path stays byte-identical to the binding base `911d44aa18a7ba5b332d469683faae22d29e3b73`. No production live startup gate is modified.

## Part D: Verification

D1. **Baseline**: `bun install --frozen-lockfile`, `bunx tsc --noEmit`, `bun test packages/supervisor packages/broker`, and `bun test`.
D2. **Failing tests (RED)**: Tests written first in `build-rollback.test.ts` asserting failure before `rollbackBuild` is wired.
D3. **Deliberate breaks**: At least three deliberate breaks (e.g. omitting process termination, omitting `session_abort` append, failing session directory removal), each verified to fail and restored cleanly.
D4. **Final suite (GREEN)**: Typecheck exits 0, all rollback tests pass, full suite passes, `git diff --check` clean.

## Part E: Attribution and review

E1. Attribution trailers:
```text
Role-Id: builder
Actor-Id: session:codex/m21-task47-r1
Execution-Surface: codex
```

E2. Commit message:
`feat(supervisor): add mandatory rollback with no partial session at any build step`

E3. Independent Tier-2 review by fresh Gemini Antigravity session on the MacBook before draft PR exit.

## Part F: Not authorized

- Milestone M22 and any later milestone or task.
- Any live attester for a real surface, any change to `PLAN-OPEN-1` or `PLAN-OPEN-2`, or any capability-record write.
- Any change to production `start` gate, or any TUI files under `apps/madbridge/src/tui/**`.
- Running a real provider executable (`madbridge-claude-v5`, `claude`, `agy`), installing or updating anything on any host, or any sign-in by an agent.
- Leaving draft or merging pull request before independent Tier-2 review passes.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-18

Actor-Id: founder
