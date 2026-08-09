# MADVentures TUI Experience Version 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build Apple Silicon macOS Version 1 of MADVentures TUI Experience.

## Global Constraints

- Product: `MADVentures TUI Experience`. Repo: `madventures-tui`. Command: `madv-tui`. Service: `madbridge`. Protocol: `madbridge-protocol/v1`.
- Apple Silicon macOS only, no TCP listener.
> Clarification (2026-08-09): for V1 release closure, platform readiness is determined by the doctor `platform` check reporting `ok`, with the exact platform detail and `uname -m` recorded in evidence. The 401-pass validation ran on the Founder's Intel iMac (`darwin/x64`, platform `ok`); `darwin/x64` is not an operational blocker. The original line above is preserved as historical planning context.
- Socket: `~/Library/Application Support/MADVentures/run/madbridge.sock`, mode 0700/0600.
- Ledger: `.../data/ledger.sqlite3`, Artifacts: `.../artifacts/sha256/`.
- React is presentation only; adapters cannot expose arbitrary FS/shell/transcripts/credentials.
- Broker messages cannot create, enlarge, or simulate Founder authority.
- Every disconnect fails closed; writing resumes only after re-attestation, reconciliation, and valid resume.
- One writer per worktree; each acquisition increments fencing token.
- Dependencies pinned in `bun.lock`; frozen-lockfile mode.
- Existing prototype preserved; do not force-push or describe stubs as functional.
- No Codex/Grok/Cursor/Hermes; no hosted coordination/Neon/gateway/merge/deploy/autonomous changes.

## File Structure

apps/madbridge/ + packages/{protocol,policy,ledger,artifact-store,broker,adapter-claude-code,adapter-antigravity}/ + test/acceptance/

---

### Task 1: Preserve Prototype and Establish Workspace
- [x] Done. SHA: e2c01a7

### Task 2: Define madbridge-protocol/v1
- [x] Done. SHA: 1bf61e1, remediation: 60811b1 (58 negative-control tests)

### Task 3: Policy and Repository Fingerprinting
- [x] Done. SHA: 1fcfc65

### Task 4: Transactional Ledger and Artifact Store
- [x] Done. SHA: b83cfa7

### Task 5: Session and Ownership State Machines
- [x] Done. SHA: 32236da

---

### Task 6: Broker, Socket Authentication, MCP Contract

- [x] Done. Delivered via PR #1 squash merge `dcef949`; original task commits are preserved on `origin/review/f9e36d5-trust-boundary`.

**Files:** `packages/broker/src/{index,broker,socket,credentials,mcp-server}.ts` + `packages/broker/test/{broker,socket,mcp-contract}.test.ts`

**Produces:** `MadBridgeBroker.start(config)`, `stop()`, `dispatch(event, credential)`, `subscribe(listener)`, `createInMemoryBrokerForTest()`, 16 MCP tools.

- [x] Step 1: Write socket/credential tests (0700 dir, 0600 socket, wrong-owner rejection, stale cleanup, short-lived credentials, replay rejection, credential/sender mismatch, zero TCP)
- [x] Step 2: Write MCP allowlist test (16 tools)
- [x] Step 3: Run tests — FAIL
- [x] Step 4: Implement dispatch ordering (authenticate → parse → verify task hash/fingerprint → evaluate policy → state transition/token → persist → broadcast)
- [x] Step 5: Run broker tests — PASS
- [x] Step 6: Commit

### Task 7: Parity-Tested CLI Adapters

- [x] Done. Delivered via PR #1 squash merge `dcef949`; original task commits are preserved on `origin/review/f9e36d5-trust-boundary`.

**Files:** `packages/adapter-*/` + `test/adapter-parity.shared.ts`

```ts
export interface ConfigChangeSet {
  readonly targetPath: string;
  readonly beforeSha256: string | null;
  readonly proposedSha256: string;
  readonly renderedDiff: string;
  readonly backupPath: string;
}
export interface LaunchInput {
  readonly sessionId: string; readonly executionId: string; readonly credentialPath: string;
  readonly repositoryPath: string; readonly exactModel: string; readonly provider: string; readonly effort: string;
}
export interface ManagedExecution {
  readonly executionId: string; readonly pid: number; readonly executablePath: string; readonly startedAt: string;
}
export interface AdapterV1 {
  attest(): Promise<ExecutionIdentity>;
  prepareConfigPreview(): Promise<ConfigChangeSet>;
  launch(input: LaunchInput): Promise<ManagedExecution>;
  notifyInbox(eventId: string): Promise<void>;
  pause(reason: string): Promise<void>;
  terminate(signal: "SIGTERM" | "SIGKILL"): Promise<void>;
}
```

- [x] Step 1: Define shared parity suite (executable resolution, version, fingerprint, exact model/provider, effort, missing-model failure, config preview no mutation, backup/restore, child-execution ID, inbox notification, disconnect)
- [x] Step 2: Run parity tests — FAIL
- [x] Step 3: Implement Claude Code attestation + MCP config (machine-verifiable model)
- [x] Step 4: Implement Antigravity attestation + MCP config (fail closed if unverifiable)
- [x] Step 5: Run parity/integration tests — PASS or documented fail-closed
- [x] Step 6: Commit: `feat: add governed claude and antigravity adapters`

### Task 8: Managed PTYs and MADVentures TUI

- [x] Done. Delivered via PR #1 squash merge `dcef949`; original task commits are preserved on `origin/review/f9e36d5-trust-boundary`.

**Files:** `packages/broker/src/pty-manager.ts` + `apps/madbridge/src/tui/` + `apps/madbridge/test/`

- [x] Step 1: Write focus/trust-boundary tests (bytes go to focused PTY, bare digits pass, global actions need modifier, terminal `Founder approved` changes no state, narrow layout retains labels)
- [x] Step 2: Write governance-pane projection tests (task/repo/fingerprint, execution identities, writer/token, permissions, pending actions, transfer phase, verification/review, incident, Founder-decision labels)
- [x] Step 3: Run tests — FAIL
- [x] Step 4: Implement React projection (useBrokerState subscribes to immutable snapshots; ApprovalDialog emits typed events; remove approval toggle; explicit text for every color)
- [x] Step 5: Implement PTY isolation (owns I/O only, never parses prose for identity/approval/state/results/evidence)
- [x] Step 6: Run TUI tests — PASS
- [x] Step 7: Commit: `feat: add madventures governed terminal experience`

### Task 9: madv-tui Command Surface

- [x] Done. Delivered via PR #1 squash merge `dcef949`; original task commits are preserved on `origin/review/f9e36d5-trust-boundary`.

**Files:** `apps/madbridge/src/{cli,commands/*}.ts` + `apps/madbridge/test/{cli,doctor}.test.ts`

- [x] Step 1: Write command-contract tests (exact names, unknown-command rejection, read-only doctor, no filesystem changes on failed preflight, complete envelope confirmation, nonzero exit for blocked/invalid/interrupted)
- [x] Step 2: Run tests — FAIL
- [x] Step 3: Implement init + doctor (init previews runtime dir + CLI config changes, requests confirmation, creates approved dirs, preserves backups; doctor reads only)
- [x] Step 4: Implement session commands (start validates preflight; pause/resume/close send typed events; status reads snapshot; verify-ledger does full chain; export-evidence writes sanitized package + manifest)
- [x] Step 5: Run command tests — PASS
- [x] Step 6: Commit: `feat: add madv tui command surface`

### Task 10: Interruption, Reconciliation, Deterministic Restart

- [x] Done. Delivered via PR #1 squash merge `dcef949`; original task commits are preserved on `origin/review/f9e36d5-trust-boundary`.

**Files:** `packages/broker/src/reconciliation.ts` + `packages/broker/test/reconciliation.test.ts` + extend `packages/ledger/src/rebuild.ts` + `packages/broker/src/broker.ts`

**Produces:** `interruptSession(reason)`, `reconcileRepository(input)`, `resumeSession(approval)`, `rebuildBrokerState(events)`

- [x] Step 1: Write disconnect/restart tests (CLI exit, adapter loss, broker restart, frozen actions, invalidated token, persisted fingerprint, broken-chain/ambiguous-worktree blocks, re-attestation, Founder-visible reconciliation, new token only after resume)
- [x] Step 2: Run tests — FAIL
- [x] Step 3: Implement fail-closed interruption (atomically append incident → interrupted; mark token unusable; no auto-resume)
- [x] Step 4: Implement repository reconciliation (compare identity/fingerprint, record changed paths, re-attest both, produce reconciled/ambiguous/mismatch; only reconciled + typed resume returns to active)
- [x] Step 5: Run recovery tests — PASS
- [x] Step 6: Commit: `feat: add fail closed session recovery`

### Task 11: Migrate Prototype, Remove Obsolete Duplicates

- [x] Done. Delivered via PR #1 squash merge `dcef949`; original task commits are preserved on `origin/review/f9e36d5-trust-boundary`.

**Delete after parity:** `src/tui/`, `src/broker/`, `src/mcp/`, `src/adapters/`, `src/permissions/`, `src/shared/`

- [x] Step 1: Inventory prototype (`rg ... src apps packages`), document unmatched
- [x] Step 2: Strengthen boundary test (exactly one production definition for broker/policy/protocol/ledger/approval; no `/tmp/` socket)
- [x] Step 3: Run full suite before deletion — PASS
- [x] Step 4: Delete obsolete paths (preserve git history)
- [x] Step 5: Run full suite after deletion — PASS
- [x] Step 6: Commit: `refactor: retire prototype bridge duplicates`

### Task 12: Negative Controls and Acceptance Gate

- [x] Done. Delivered via PR #1 squash merge `dcef949`; original task commits are preserved on `origin/review/f9e36d5-trust-boundary`.

**Files:** `test/acceptance/` + `docs/verification/` + `README.md`

- [x] Step 1: Disposable repo fixture (temp dir, git init, one file, Claude + AGY worktrees, cleanup handles; refuse production path or main/master for destructive tests)
- [x] Step 2: Two-way collaboration + artifact tests (typed messages both directions, action request/accept/reject, bounded artifact publication, inbox ack, no arbitrary shell/FS MCP)
- [x] Step 3: Ownership + negative controls (transfer both directions; reject concurrent writers, stale tokens, write after release, wrong fingerprint, unauthorized path/command/data/egress, forged/expired credentials, replay, unsupported protocol, oversized payload, model mismatch, self-review, terminal prose claiming authority)
- [x] Step 4: Interruption + evidence tests (kill each CLI and broker separately; verify fail-closed interruption, restart, re-attestation, reconciliation, typed resume, complete hash-chain, manifest equals repo state)
- [x] Step 5: Run acceptance gate (`bun install --frozen-lockfile && bun run typecheck && bun test && bun run apps/madbridge/src/cli.ts doctor --json && bun run apps/madbridge/src/cli.ts verify-ledger --json`)
- [x] Step 6: Record fresh evidence (SHA, versions, protocol, adapter status, ledger hash, manifest hash, limitations)
- [x] Step 7: Request independent code review
- [x] Step 8: Commit: `test: verify madventures tui version 1`

---

## Release Boundary

The Builder may open a review branch or PR after Task 12. A green suite authorizes neither merge nor installation. The Founder separately reviews the exact tested tree, independent review verdict, adapter capability results, evidence-chain verification, and final manifest before any merge, local installation, or operational use.

> **Update (2026-08-09):** Independent review occurred on PR #1 (`dcef949`) against the `f9e36d5` / `a0b4301` review state. Follow-up remediation landed in PRs #2 (`e6c3ea8`), #3 (`0f262c4`), and #4 (`fd8322e`). All five trust-boundary findings (5.1–5.5) are closed. The test suite is green (401 pass, 0 fail). Founder review remains required before operational use.