# DEC-20261018-03 — Task 49 execution authorization: full fixture lifecycle and failure rollback through BrokerClient

Act identifier: `FOUNDER-ACT-20261018-TASK49-EXECUTION-AUTHORIZATION`

> **Status:** ISSUED (ratified by Founder 2026-10-19)
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Binding base:** `337f551a6b57a078d5aa2f958c31915b746dc9dc` (origin/main)
> **Target milestone:** M22 (Task 49)
> **Target branch:** `build/m22-task49-r1`
> **Read with:** plan Task 49; spec §§4.2, 6.3, 9.1, 9.3, 9.4, 9.11; `DEC-20261017-02` B7; `DEC-20261017-03` B7; `DEC-20261018-01`; `DEC-20261018-02`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **Plan alignment.** Phase 3A plan §5 Task 49 continues Milestone M22 (Structurally test-only runtime harness and fixture adapters). Milestone M22 opened with Task 48 (PR #174 merged at `337f551a6b57a078d5aa2f958c31915b746dc9dc`), establishing `test/phase3a/runtime-harness.ts` as the sole Phase 3A runtime harness entry point with verified AST structural separation guards and zero socket creation. Task 49 exercises the full governed lifecycle through `BrokerClient` with controlled deterministic fixture adapters, proving:
- Pure preflight creates no governed state;
- Transactional build produces an active session with valid initial fencing token and two ready executions (`"builder"` and `"reviewer"`);
- Exact bytes written through `pty_input` (including binary sequences `0x00`, `0x1b`, and `0xFF`) are echoed on the client output stream;
- `pty_resize` propagates exact terminal dimensions (`cols`, `rows`) to the child;
- `session_pause` followed by `session_resume` transitions to paused and returns to active without altering the fencing token;
- Founder `session_close` transitions through `closing`, invalidates token, and settles at `closed`;
- A typed interruption ends the session and closes client streams fail-closed;
- Deterministic injected failure across every step of `BUILD_STEPS` triggers transactional rollback and leaves zero residual processes, descriptors, or open session records.

A2. **Preconditions satisfied.**
- Task 48 merged to `main` at `337f551a6b57a078d5aa2f958c31915b746dc9dc` (PR #174).
- Full test suite baseline passes cleanly (1,661 tests, 103 files).
- Working tree is clean at the binding base.

A3. **The builder and reviewer seats.**
- Builder: Successor builder Codex CLI on the Founder's MacBook (`session:codex/m22-task49-r1`).
- Tier-2 Reviewer: Independent fresh Gemini Antigravity session on the MacBook (`antigravity`), under the reviewer cross-assignment doctrine established in `DEC-20261017-02` B7, `DEC-20261017-03` B7, and `DEC-20261018-02`.

## Part B: Founder rulings

B1. **Full governed lifecycle through `BrokerClient` (§6.3, §9.3, §9.4).**
`test/phase3a/harness-lifecycle.test.ts` executes a complete deterministic session through `BrokerClient`:
1. **Active session reachability:** Verifies `startFixtureSession` produces a session where `client.getSnapshot()` reports `phase: "active"`, `tokenState: "valid"`, a positive safe integer `fencingToken`, and two ready executions (`builder` and `reviewer`).
2. **Exact binary I/O echo:** Writing a byte buffer containing binary values `0x00`, `0x1b`, and `0xFF` via `client.request({ kind: "pty_input", ... })` results in byte-identical frames received on `client.output("builder")`.
3. **Dimensional resize propagation:** Issuing `client.request({ kind: "pty_resize", cols, rows, ... })` propagates exact cols and rows to the child process and is observable.
4. **Token-invariant pause and resume:** Issuing `client.request({ kind: "session_pause", ... })` transitions phase to `"paused"`, followed by `client.request({ kind: "session_resume", ... })` returning to `"active"` with byte-identical `fencingToken` preserved.
5. **Ordered clean closure:** Founder `client.request({ kind: "session_close", ... })` produces ordered ledger lifecycle records (`session_closing`, token invalidation, `session_closed`), reaps all child processes and PTY hosts, and cleans up temporary storage.
6. **Fail-closed interruption:** A typed interruption terminates the session into `interrupted`, terminates child processes, and closes client output streams.

B2. **Parameterized transactional rollback across all `BUILD_STEPS` (§6.3).**
`test/phase3a/harness-rollback.test.ts` parameterizes injected failure across all twelve ordered steps in `BUILD_STEPS` (`storage`, `ledger_open`, `session_open`, `broker`, `client`, `lifelines`, `hosts`, `children`, `reattest`, `adapters`, `issue_token`, `activate`):
- Asserts that for every step, when failure is injected at that step, `startFixtureSession({ injectFailureAt: step })` fails closed with the expected typed failure;
- Executes transactional rollback;
- Proves no orphaned PTY host PID, child PID, or process group survives (`alive(pid)` is false);
- Proves no partially constructed session directory or unclosed SQLite ledger handle leaks.

B3. **Deterministic fixture adapter behaviors in `test/phase3a/fixture-adapters.ts`.**
`fixtureExecutableSource` is updated to implement deterministic non-interactive behaviors under `--fixture-run`:
- Stdin echo: Reads bytes from stdin and immediately writes them to stdout (preserving raw binary sequences including `0x00`, `0x1b`, and `0xFF`);
- Resize reporting: On terminal resize (SIGWINCH or terminal dimensions), reports observed cols and rows;
- Controlled exit: On signal (SIGTERM/SIGINT) or EOF, cleanly flushes and exits 0.

B4. **Test harness wiring in `test/phase3a/runtime-harness.ts`.**
`test/phase3a/runtime-harness.ts` is authorized for bounded updates necessary to support Task 49:
- `HarnessOptions` accepts `injectFailureAt?: BuildStep` and passes it to `runTransactionalBuildWithDependencies` with proper validation;
- Wires `client.request` for `pty_input` and `pty_resize` to the active writer's PTY host handle (`host.send({ kind: "input", bytes })` and `host.send({ kind: "resize", cols, rows })`);
- Pumps host output frames (`fact.kind === "output"`) into `InProcessBrokerClient` via `unsafeTestOnlyIngestOutputFrame`.

B5. **Multi-process test timing race rule.**
The timing race exception of `DEC-20261017-01` B2, `DEC-20261017-02` B5, `DEC-20261017-03` B5, `DEC-20261018-01` B5, and `DEC-20261018-02` B4 applies to `packages/supervisor/test/attestation.test.ts` (specifically line 50, line 71, and line 84), as well as host lock race in `apps/madv-agent/test/lock.test.ts` under multi-process load on macOS.

## Part C: Scope

C1. Exactly four paths change:
- `test/phase3a/fixture-adapters.ts` (Modified: deterministic echo, resize-report, controlled-exit behaviors)
- `test/phase3a/runtime-harness.ts` (Modified: options validation for `injectFailureAt`, PTY input/resize wiring, and output frame pumping)
- `test/phase3a/harness-lifecycle.test.ts` (Created: 6 lifecycle tests)
- `test/phase3a/harness-rollback.test.ts` (Created: 12 rollback tests parameterized over `BUILD_STEPS`)

C2. Every other path stays byte-identical to the binding base `337f551a6b57a078d5aa2f958c31915b746dc9dc`. No production code under `apps/` or `packages/*/src/` is modified.

## Part D: Verification

D1. **Baseline**: `bun install --frozen-lockfile`, `bunx tsc --noEmit`, `bun test test/phase3a/harness-separation.test.ts`, and `bun test`.
D2. **Failing tests (RED)**: Run `bun test test/phase3a/harness-lifecycle.test.ts -t "exact bytes written through pty_input are echoed on the output stream"` expecting RED (output stream yields nothing and test times out on its first frame).
D3. **Deliberate breaks**: At least three deliberate breaks (e.g. disabling byte echo, inverting resize dimension report, omitting rollback process termination), each verified to fail and restored cleanly.
D4. **Final suite (GREEN)**: Typecheck exits 0, all 6 lifecycle tests pass, all 12 rollback tests pass (18 new tests total), full suite passes (accounting for dispositioned attestation timing lines), `git diff --check` clean.

## Part E: Attribution and review

E1. Attribution trailers:
```text
Role-Id: builder
Actor-Id: session:codex/m22-task49-r1
Execution-Surface: codex
```

E2. Commit message:
`test(phase3a): exercise the full fixture lifecycle through BrokerClient`

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

Date: 2026-10-19

Actor-Id: founder
