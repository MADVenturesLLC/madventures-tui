# MADVentures TUI Experience Version 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Apple Silicon macOS Version 1 of MADVentures TUI Experience: a local, governed, live bridge between Claude Code CLI and Antigravity CLI with exclusive writer ownership, typed collaboration, recoverable evidence, and a three-pane terminal interface.

**Architecture:** A framework-independent `madbridge` broker owns validation, session lifecycle, writer fencing, typed routing, SQLite evidence, and content-addressed artifacts. Thin Claude Code and Antigravity adapters communicate through `madbridge-protocol/v1`; the OpenTUI React app launches managed PTYs and projects broker state without treating terminal prose as authority. Every state-changing action is validated against one Founder-approved task envelope and recorded transactionally.

**Tech Stack:** Bun 1.3.14, strict TypeScript, React 19, OpenTUI 0.5.1, `bun:sqlite`, `bun:test`, Unix-domain sockets, Node-compatible cryptography and process APIs, and MCP over stdio.

## Global Constraints

- Product/interface name: `MADVentures TUI Experience`.
- Repository name: `madventures-tui`.
- Founder command: `madv-tui`; neutral service: `madbridge`; protocol: `madbridge-protocol/v1`.
- Version 1 supports Apple Silicon macOS only and opens no TCP listener.
- Runtime socket: `~/Library/Application Support/MADVentures/run/madbridge.sock`; directory mode `0700`, socket mode `0600`.
- SQLite ledger: `~/Library/Application Support/MADVentures/madventures-tui/data/ledger.sqlite3`.
- Artifacts: `~/Library/Application Support/MADVentures/madventures-tui/artifacts/sha256/`.
- React is presentation only; it cannot decide authority, permissions, ownership, evidence acceptance, hashing, or recovery.
- Neither adapter exposes arbitrary filesystem reads, arbitrary shell execution, raw transcript synchronization, credentials, or unrestricted environment variables.
- Broker messages cannot create, enlarge, or simulate Founder authority.
- Every disconnect fails closed; writing resumes only after re-attestation, repository reconciliation, and a valid resume event.
- Exactly one execution may own a worktree at a time; each acquisition increments the fencing token.
- Dependencies remain exactly pinned in `bun.lock`; install and CI use frozen-lockfile mode.
- Use the existing prototype as preserved input. Do not force-push, rewrite its initial commit, or describe adapter stubs as functional.
- Do not implement Codex, Grok, Cursor, or Hermes adapters; hosted coordination; Neon projection; a central gateway; merge/deploy automation; or autonomous authority changes.

---

## File Structure

```text
apps/madbridge/
  package.json
  src/cli.ts
  src/commands/{init,doctor,start,status,pause,resume,verify-ledger,export-evidence,close}.ts
  src/tui/App.tsx
  src/tui/components/{ApprovalDialog,EventLog,StatusBar}.tsx
  src/tui/panes/{ClaudePane,GovernancePane,AntigravityPane}.tsx
  src/tui/hooks/{useBrokerState,useKeyboard}.ts
  test/{cli,doctor,tui-projection,pty-focus}.test.tsx

packages/protocol/
  src/{index,ids,canonical-json,task-envelope,events,wire}.ts
  test/{canonical-json,task-envelope,events,wire}.test.ts

packages/policy/
  src/{index,engine,path-policy,command-policy,egress-policy,review-policy}.ts
  test/{engine,path-policy,negative-controls}.test.ts

packages/ledger/
  src/{index,schema,ledger,hash-chain,rebuild}.ts
  test/{ledger,hash-chain,rebuild}.test.ts

packages/artifact-store/
  src/{index,store,manifest}.ts
  test/store.test.ts

packages/broker/
  src/{index,broker,session-machine,ownership-machine,reconciliation,socket,credentials,mcp-server,pty-manager}.ts
  test/{broker,session-machine,ownership-machine,socket,reconciliation,mcp-contract}.test.ts

packages/adapter-claude-code/
  src/{index,adapter,attestation,hooks,mcp-config}.ts
  test/{attestation,parity,integration}.test.ts

packages/adapter-antigravity/
  src/{index,adapter,attestation,hooks,mcp-config}.ts
  test/{attestation,parity,integration}.test.ts

test/acceptance/
  disposable-repo.ts
  two-way-collaboration.test.ts
  ownership-transfer.test.ts
  interruption-recovery.test.ts
  evidence-manifest.test.ts
```

---

### Task 1: Preserve the Prototype and Establish the Workspace

- [x] Step 1: Record baseline — HEAD d49b912, Bun 1.3.14, tsc clean
- [x] Step 2: Write failing architecture-boundary test
- [x] Step 3: Confirm failure (ENOENT on App.tsx)
- [x] Step 4: Create workspace manifests, package.json files, App.tsx shell
- [x] Step 5: Verify — `bun install --frozen-lockfile && bun run verify` PASS
- [x] Step 6: Commit SHA e2c01a7

### Task 2: Define madbridge-protocol/v1 and Task Envelopes

- [x] Step 1-6: Initial implementation, commit 1bf61e1
- [x] Remediation: 58 negative-control tests, sha256Canonical documented as Promise<string>, known-vector determinism test, payload hash verification + timestamp-after-expiration added to parseBridgeEvent, commit 60811b1

### Task 3: Implement Policy and Repository Fingerprinting

**Files:**
- Create: `packages/policy/src/{index,engine,path-policy,command-policy,egress-policy,review-policy}.ts`
- Create: `packages/policy/test/{engine,path-policy,negative-controls}.test.ts`

**Interfaces:**
- Consumes: `TaskEnvelopeV1`, `BridgeEventV1`, `RepositoryFingerprint`.
- Produces: `ActionContext`, `PolicyDecision`, `evaluateAction(context)`, `assertWithinAllowedPath`, `classifyCommand`, `verifyReviewIndependence`, and `fingerprintRepository(repoPath)`.

- [ ] **Step 1: Write fail-closed policy tests**
- [ ] **Step 2: Add path, command, egress, and self-review negative tests**
- [ ] **Step 3: Run tests and confirm failure**
- [ ] **Step 4: Implement pure policy decisions**
- [ ] **Step 5: Run policy tests**
- [ ] **Step 6: Commit**

### Task 4: Build the Transactional Ledger and Artifact Store

- [ ] Steps 1-7

### Task 5: Implement Session and Ownership State Machines

- [ ] Steps 1-6

### Task 6: Build the Local Broker, Socket Authentication, and MCP Contract

- [ ] Steps 1-6

### Task 7: Implement and Parity-Test Both CLI Adapters

**Interfaces:**
```ts
export interface ConfigChangeSet {
  readonly targetPath: string;
  readonly beforeSha256: string | null;
  readonly proposedSha256: string;
  readonly renderedDiff: string;
  readonly backupPath: string;
}
export interface LaunchInput {
  readonly sessionId: string;
  readonly executionId: string;
  readonly credentialPath: string;
  readonly repositoryPath: string;
  readonly exactModel: string;
  readonly provider: string;
  readonly effort: string;
}
export interface ManagedExecution {
  readonly executionId: string;
  readonly pid: number;
  readonly executablePath: string;
  readonly startedAt: string;
}
```

- [ ] Steps 1-6

### Task 8: Add Managed PTYs and the MADVentures TUI Experience

**Files:**
- Create: `packages/broker/src/pty-manager.ts`
- Create: `apps/madbridge/src/tui/App.tsx`
- Create: `apps/madbridge/src/tui/components/{ApprovalDialog,EventLog,StatusBar}.tsx`
- Create: `apps/madbridge/src/tui/panes/{ClaudePane,GovernancePane,AntigravityPane}.tsx`
- Create: `apps/madbridge/src/tui/hooks/{useBrokerState,useKeyboard}.ts`
- Create: `apps/madbridge/test/{tui-projection,pty-focus}.test.tsx`

- [ ] Step 1: Write focus and trust-boundary tests
- [ ] Step 2: Write governance-pane projection tests
- [ ] Step 3: Run tests and confirm failure
- [ ] Step 4: Implement the React projection
- [ ] Step 5: Implement managed PTY isolation
- [ ] Step 6: Run TUI tests
- [ ] Step 7: Commit

### Task 9: Implement the madv-tui Command Surface

- [ ] Step 1: Write command-contract tests
- [ ] Step 2: Run tests and confirm failure
- [ ] Step 3: Implement `init` and `doctor`
- [ ] Step 4: Implement session commands
- [ ] Step 5: Run command tests
- [ ] Step 6: Commit

### Task 10: Implement Interruption, Reconciliation, and Deterministic Restart

**Files:**
- Create: `packages/broker/src/reconciliation.ts`
- Create: `packages/broker/test/reconciliation.test.ts`
- Extend: `packages/ledger/src/rebuild.ts`
- Extend: `packages/broker/src/broker.ts`

**Interfaces:**
- Produces: `interruptSession(reason)`, `reconcileRepository(input)`, `resumeSession(approval)`, and deterministic `rebuildBrokerState(events)`.

- [ ] Step 1: Write disconnect and restart tests
- [ ] Step 2: Run tests and confirm failure
- [ ] Step 3: Implement fail-closed interruption
- [ ] Step 4: Implement repository reconciliation
- [ ] Step 5: Run recovery tests
- [ ] Step 6: Commit

### Task 11: Migrate Useful Prototype Code and Remove Obsolete Duplicates

**Files:**
- Delete after parity is proven: `src/tui/`, `src/broker/`, `src/mcp/`, `src/adapters/`, `src/permissions/`, `src/shared/`
- Modify: `README.md`
- Modify: `test/architecture-boundaries.test.ts`

- [ ] Step 1: Inventory prototype logic against the new implementation
- [ ] Step 2: Delete obsolete files after proving parity
- [ ] Step 3: Run full verification
- [ ] Step 4: Commit

### Task 12: Execute Version 1 Negative Controls and Acceptance Gate

**Files:**
- Create: `test/acceptance/disposable-repo.ts`
- Create: `test/acceptance/{two-way-collaboration,ownership-transfer,interruption-recovery,evidence-manifest}.test.ts`
- Create: `docs/verification/madventures-tui-v1-evidence.md`
- Modify: `README.md`

- [ ] Step 1: Create an isolated disposable Git repository fixture
- [ ] Step 2: Write two-way collaboration and artifact tests
- [ ] Step 3: Write ownership and negative-control tests
- [ ] Step 4: Write interruption and evidence tests
- [ ] Step 5: Run the complete acceptance gate
- [ ] Step 6: Record fresh evidence
- [ ] Step 7: Update README
- [ ] Step 8: Request independent code review
- [ ] Step 9: Commit the verification package

---

## Release Boundary

The Builder may open a review branch or the Release Boundary already exists at the end of the approved implementation plan. Preserve it exactly; do not create a replacement. Proceed to the next task only if every prior task step passed, the verification results were recorded, and the commit SHA was provided. No merge, installation, deployment, or operational activation is authorized.