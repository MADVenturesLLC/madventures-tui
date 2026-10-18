# DEC-20261018-02 — Task 48 execution authorization: test-only runtime harness and structural separation guards

Act identifier: `FOUNDER-ACT-20261018-TASK48-EXECUTION-AUTHORIZATION`

> **Status:** ISSUED (ratified by Founder 2026-10-18)
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Binding base:** `0da8119820b2ad6d8111c725250dd20e840a7b82` (origin/main)
> **Target milestone:** M22 (Task 48)
> **Target branch:** `build/m22-task48-r1`
> **Read with:** plan Task 48; spec §§4.2, 9.1, 9.11; `DEC-20261017-02` B7; `DEC-20261017-03` B7; `DEC-20261018-01`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **Plan alignment.** Phase 3A plan §5 Task 48 establishes Milestone M22 (Structurally test-only runtime harness and fixture adapters). Milestone M21 successfully closed with the merge of Task 46 and Task 47, delivering verified pure-preflight, transactional build, and mandatory fail-closed rollback. Task 48 creates `test/phase3a/runtime-harness.ts` as the sole Phase 3A runtime harness entry point and enforces by syntax-aware AST analysis that no production source under `apps/` or `packages/*/src/` can reach it through any static import, dynamic import, path construction, command dispatch, environment switch, or control-flow gate.

A2. **Preconditions satisfied.**
- Milestone M21 (ordered transactional build & rollback) merged to `main` at `0da8119820b2ad6d8111c725250dd20e840a7b82` (PR #167).
- Working tree is clean at the binding base.

A3. **The builder and reviewer seats.**
- Builder: Successor builder Codex CLI on the Founder's MacBook (`session:codex/m22-task48-r1`).
- Tier-2 Reviewer: Independent fresh Gemini Antigravity session on the MacBook (`antigravity`), under the reviewer cross-assignment doctrine established in `DEC-20261017-02` B7 and `DEC-20261017-03` B7.

## Part B: Founder rulings

B1. **Sole harness entry point (§9.11).**
`test/phase3a/runtime-harness.ts` is the single authorized runtime harness entry for Phase 3A:
- It consumes `runPurePreflight`, `runTransactionalBuild`, `createInProcessBrokerClient`, `createSessionStorage`, and `ADAPTER_REGISTRY`.
- It produces:
  ```ts
  export const FIXTURE_SURFACE_IDS: readonly SurfaceId[];
  export const FIXTURE_REGISTRY: ReadonlyMap<SurfaceId, AdapterRegistrationV1>;
  export interface HarnessSession {
    readonly client: BrokerClient;
    readonly storage: SessionStorage;
    close(): Promise<void>;
  }
  export async function startFixtureSession(options: HarnessOptions): Promise<HarnessSession>;
  ```
- It throws `RealSurfaceRejected` if any requested surface is not in `FIXTURE_SURFACE_IDS`.
- It exposes no function, flag, or mechanism that alters the production `start` gate (`apps/madbridge/src/commands/start.ts` exit 78 `live_runtime_not_certified`).

B2. **Fail-closed structural separation analyzer (§9.11).**
`test/phase3a/harness-separation.test.ts` implements a fail-closed AST analyzer using the TypeScript Compiler API (`import * as ts from "typescript"`) scanning every `.ts` and `.tsx` file under `apps/` and `packages/*/src/` for all six §9.11 reachability forms:
1. **Static imports (a):** String literals in `import` / `export ... from` matching `runtime-harness`, `phase3a`, or `test/phase3a`.
2. **Dynamic imports (b):** `import(...)` and `require(...)` targeting test-tree markers; unresolvable dynamic expressions flag as `dynamic-import-unresolvable`.
3. **Filesystem path construction (c):** `path.join`, `path.resolve`, aliased imports, method aliases, computed property accesses, string concatenation (`+`), and template expressions.
4. **Command dispatch (d):** `child_process` methods (`spawn`, `exec`, etc.), `Bun.spawn`, `Bun.spawnSync`, and Bun Shell (`$`) tagged templates.
5. **Environment-gated routes (e):** `process.env` branches or destructured env switches guarding test-tree access.
6. **Control-flow gates (f):** `if`, ternary, `switch`, and standalone logical operators (`&&`, `||`, `??`) guarding test-tree access.

B3. **Process-isolated zero-socket invariant (§9.11).**
An isolated child process executing `startFixtureSession` under a disposable `MADV_RUNTIME_DIR`:
- Verifies `<MADV_RUNTIME_DIR>/broker.sock` and `/tmp/madv-broker-runtime/broker.sock` are absent before launch, during active session (`HARNESS_STARTED_NO_SOCKET`), and after clean close (`HARNESS_CLOSED_NO_SOCKET`).
- Exits 0 and leaves no residual socket file.

B4. **Supervisor attestation test timing race rule.**
The timing race exception of `DEC-20261017-01` B2, `DEC-20261017-02` B5, `DEC-20261017-03` B5, and `DEC-20261018-01` B5 applies to `packages/supervisor/test/attestation.test.ts` (specifically line 50, line 71, and line 84) during full suite runs under multi-process load on macOS.

## Part C: Scope

C1. Exactly three paths change:
- `test/phase3a/runtime-harness.ts` (Created)
- `test/phase3a/fixture-adapters.ts` (Modified)
- `test/phase3a/harness-separation.test.ts` (Created)

C2. Every other path stays byte-identical to the binding base `0da8119820b2ad6d8111c725250dd20e840a7b82`. No production code under `apps/` or `packages/*/src/` is modified.

## Part D: Verification

D1. **Baseline**: `bun install --frozen-lockfile`, `bunx tsc --noEmit`, `bun test packages/supervisor packages/broker`, and `bun test`.
D2. **Failing tests (RED)**: Run `bun test test/phase3a/harness-separation.test.ts -t "the harness rejects a real registered surface"` expecting RED (`Cannot find module "./runtime-harness"`).
D3. **Deliberate breaks**: At least three deliberate breaks (e.g. omitting `RealSurfaceRejected` guard, omitting dynamic import analyzer rule, permitting path-construction evasion), each verified to fail and restored cleanly.
D4. **Final suite (GREEN)**: Typecheck exits 0, all 7 harness separation tests pass, full suite passes (accounting for dispositioned attestation timing lines), `git diff --check` clean.

## Part E: Attribution and review

E1. Attribution trailers:
```text
Role-Id: builder
Actor-Id: session:codex/m22-task48-r1
Execution-Surface: codex
```

E2. Commit message:
`test(phase3a): add the sole test-only runtime harness with structural separation guards`

E3. Independent Tier-2 review by fresh Gemini Antigravity session on the MacBook before draft PR exit.

## Part F: Not authorized

- Milestone M23 and any later milestone or task.
- Any modification to production files under `apps/` or `packages/*/src/`.
- Any change to production `start` gate (`apps/madbridge/src/commands/start.ts`).
- Any live attester for a real surface or executing real provider binaries (`madbridge-claude-v5`, `claude`, `agy`).
- Leaving draft or merging pull request before independent Tier-2 review passes.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-18

Actor-Id: founder
