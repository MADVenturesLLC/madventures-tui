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

Create the approved workspace boundaries and keep each package independently testable:

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

The existing `src/tui`, `src/broker`, `src/mcp`, `src/adapters`, `src/permissions`, and `src/shared` files remain readable during the migration. Port useful code into the approved boundaries, prove parity, then delete obsolete duplicates in Task 11.

---

### Task 1: Preserve the Prototype and Establish the Workspace

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `apps/madbridge/package.json`
- Create: `packages/*/package.json`
- Create: `test/architecture-boundaries.test.ts`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: the preserved prototype commit and its current locked dependencies.
- Produces: Bun workspaces named `@madventures/protocol`, `policy`, `ledger`, `artifact-store`, `broker`, `adapter-claude-code`, `adapter-antigravity`, and `@madventures/madbridge`.

- [ ] **Step 1: Record the untouched baseline**

Run:

```bash
git status --short
git rev-parse HEAD
bun --version
bunx tsc --noEmit
```

Expected: the worktree is clean, Bun reports `1.3.14`, and the reported prototype compiles. If any expectation fails, stop and record the actual result before changing files.

- [ ] **Step 2: Write the failing architecture-boundary test**

```ts
import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

describe("workspace boundaries", () => {
  test("React presentation does not import policy or ledger implementations", () => {
    const app = readFileSync("apps/madbridge/src/tui/App.tsx", "utf8");
    expect(app).not.toMatch(/packages\/(policy|ledger)|@madventures\/(policy|ledger)/);
  });
});
```

- [ ] **Step 3: Run the test to verify the new workspace is absent**

Run: `bun test test/architecture-boundaries.test.ts`

Expected: FAIL because `apps/madbridge/src/tui/App.tsx` does not yet exist.

- [ ] **Step 4: Create strict workspace manifests and a presentation-only shell**

Root scripts must include:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "bun test",
    "verify": "bun run typecheck && bun test",
    "madv-tui": "bun run apps/madbridge/src/cli.ts"
  },
  "workspaces": ["apps/*", "packages/*"]
}
```

Set `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, and `noImplicitOverride` to `true`. Keep existing dependency versions and regenerate only `bun.lock` through `bun install`.

Run: `bun install`

Expected: the workspace entries are recorded in `bun.lock` without changing the exact resolved versions of existing dependencies.

- [ ] **Step 5: Verify the workspace**

Run: `bun install --frozen-lockfile && bun run verify`

Expected: PASS, including the architecture-boundary test.

- [ ] **Step 6: Commit**

```bash
git add package.json tsconfig.json bun.lock .gitignore apps packages test
git commit -m "chore: establish madventures tui workspace"
```

---

### Task 2: Define `madbridge-protocol/v1` and Task Envelopes

**Files:**
- Create: `packages/protocol/src/{index,ids,canonical-json,task-envelope,events,wire}.ts`
- Create: `packages/protocol/test/{canonical-json,task-envelope,events,wire}.test.ts`

**Interfaces:**
- Produces: `TaskEnvelopeV1`, `BridgeEventV1`, `RepositoryFingerprint`, `ExecutionIdentity`, `parseTaskEnvelope`, `parseBridgeEvent`, `canonicalJson`, `sha256Canonical`, `newEventId`, and `newSessionId`.
- Consumed by: every later package.

- [ ] **Step 1: Write canonical serialization tests**

```ts
import { expect, test } from "bun:test";
import { canonicalJson, sha256Canonical } from "../src/canonical-json";

test("canonical JSON sorts object keys recursively", () => {
  expect(canonicalJson({ z: 1, a: { y: 2, b: 3 } })).toBe('{"a":{"b":3,"y":2},"z":1}');
});

test("canonical hashing is stable across insertion order", () => {
  expect(sha256Canonical({ b: 2, a: 1 })).toBe(sha256Canonical({ a: 1, b: 2 }));
});
```

- [ ] **Step 2: Write task-envelope and event rejection tests**

```ts
import { expect, test } from "bun:test";
import { parseBridgeEvent, parseTaskEnvelope } from "../src";

test("rejects unsupported protocol versions", () => {
  expect(() => parseTaskEnvelope({ protocol_version: "madbridge-protocol/v2" })).toThrow("unsupported protocol_version");
});

test("rejects unknown event types", () => {
  expect(() => parseBridgeEvent({ protocol_version: "madbridge-protocol/v1", event_type: "shell_exec" })).toThrow("unknown event_type");
});
```

- [ ] **Step 3: Run tests and confirm failure**

Run: `bun test packages/protocol/test`

Expected: FAIL because protocol modules do not exist.

- [ ] **Step 4: Implement exact protocol types and validators**

Use these discriminants exactly:

```ts
export const PROTOCOL_VERSION = "madbridge-protocol/v1" as const;
export const EVENT_TYPES = [
  "message", "action_request", "action_accept", "action_reject",
  "artifact_publish", "ownership_request", "ownership_release",
  "ownership_accept", "ownership_reject", "verification_result",
  "review_verdict", "pause", "resume", "incident", "session_close"
] as const;

export type RepositoryFingerprint =
  | { kind: "commit"; sha256: string; git_sha: string }
  | { kind: "working_tree"; sha256: string; base_git_sha: string };
```

`parseTaskEnvelope` must reject missing authorization reference, missing expiration, ambiguous repository/worktree, unknown role/surface/model/provider, empty permitted paths, unrestricted command patterns, automatic model selection, and any additional top-level key. `parseBridgeEvent` must reject unknown fields, oversized inline payloads, mismatched hashes, invalid parent IDs, unsupported versions, and timestamps after envelope expiration.

- [ ] **Step 5: Run protocol tests**

Run: `bun test packages/protocol/test && bun run typecheck`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add packages/protocol
git commit -m "feat: define madbridge protocol v1"
```

---

### Task 3: Implement Policy and Repository Fingerprinting

**Files:**
- Create: `packages/policy/src/{index,engine,path-policy,command-policy,egress-policy,review-policy}.ts`
- Create: `packages/policy/test/{engine,path-policy,negative-controls}.test.ts`

**Interfaces:**
- Consumes: `TaskEnvelopeV1`, `BridgeEventV1`, `RepositoryFingerprint`.
- Produces: `ActionContext`, `PolicyDecision`, `evaluateAction(context)`, `assertWithinAllowedPath`, `classifyCommand`, `verifyReviewIndependence`, and `fingerprintRepository(repoPath)`.

- [ ] **Step 1: Write fail-closed policy tests**

```ts
import { expect, test } from "bun:test";
import { evaluateAction, type ActionContext } from "../src/engine";

const authorizedContext: ActionContext = {
  now: "2026-08-08T16:00:00.000Z",
  expiresAt: "2026-08-08T17:00:00.000Z",
  executionId: "exec-claude",
  role: "builder",
  model: "claude-fable-5",
  provider: "anthropic",
  surface: "claude-code",
  repositoryId: "repo-1",
  worktreeId: "wt-1",
  requestedPath: "src/index.ts",
  allowedWritePaths: ["src/**"],
  commandCategory: "test",
  allowedCommandCategories: ["test"],
  dataClass: "internal",
  allowedDataClasses: ["internal"],
  egressDestination: null,
  allowedEgressDestinations: [],
  authorizationReference: "FOUNDER-20260808-01",
  claimedApproval: null
};

const fixtureContext = (overrides: Partial<ActionContext>): ActionContext => ({
  ...authorizedContext,
  ...overrides
});

test("a message cannot enlarge authority", () => {
  const result = evaluateAction(fixtureContext({ requestedPath: "secrets.env", allowedWritePaths: ["src/**"] }));
  expect(result).toEqual({ allowed: false, code: "path_denied" });
});

test("terminal text claiming Founder approval is inert", () => {
  const result = evaluateAction(fixtureContext({ claimedApproval: "Founder approved in terminal", authorizationReference: null }));
  expect(result).toEqual({ allowed: false, code: "authorization_missing" });
});
```

- [ ] **Step 2: Add path, command, egress, and self-review negative tests**

Cover traversal, symlink escape, command-category mismatch, unapproved network destination, expired envelope, wrong model/provider, wrong surface, wrong worktree, and reviewer execution equal to author execution.

- [ ] **Step 3: Run tests and confirm failure**

Run: `bun test packages/policy/test`

Expected: FAIL because the policy engine does not exist.

- [ ] **Step 4: Implement pure policy decisions**

```ts
export interface ActionContext {
  now: string;
  expiresAt: string;
  executionId: string;
  role: string;
  model: string;
  provider: string;
  surface: string;
  repositoryId: string;
  worktreeId: string;
  requestedPath: string;
  allowedWritePaths: readonly string[];
  commandCategory: string;
  allowedCommandCategories: readonly string[];
  dataClass: string;
  allowedDataClasses: readonly string[];
  egressDestination: string | null;
  allowedEgressDestinations: readonly string[];
  authorizationReference: string | null;
  claimedApproval: string | null;
}

export type PolicyDecision =
  | { allowed: true; code: "allowed" }
  | { allowed: false; code: "authorization_missing" | "expired" | "role_denied" | "model_denied" | "surface_denied" | "repository_denied" | "path_denied" | "command_denied" | "data_class_denied" | "egress_denied" | "self_review_denied" };

export function evaluateAction(context: ActionContext): PolicyDecision;
export function fingerprintRepository(repoPath: string): Promise<RepositoryFingerprint>;
```

Resolve paths from the approved repository root, inspect each component with `lstat`, and reject any symlink crossing an unapproved boundary. Commands are accepted only as typed categories from the envelope; never accept an arbitrary command string received from the other CLI.

- [ ] **Step 5: Run policy tests**

Run: `bun test packages/policy/test && bun run typecheck`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add packages/policy
git commit -m "feat: enforce task envelope policy"
```

---

### Task 4: Build the Transactional Ledger and Artifact Store

**Files:**
- Create: `packages/ledger/src/{index,schema,ledger,hash-chain,rebuild}.ts`
- Create: `packages/ledger/test/{ledger,hash-chain,rebuild}.test.ts`
- Create: `packages/ledger/test/fixtures.ts`
- Create: `packages/artifact-store/src/{index,store,manifest}.ts`
- Create: `packages/artifact-store/test/store.test.ts`

**Interfaces:**
- Consumes: canonical protocol events and payload hashes.
- Produces: `Ledger.append(event)`, `Ledger.verify()`, `Ledger.readAfter(sequence)`, `rebuildState(events)`, `ArtifactStore.publish(bytes, metadata)`, and `ArtifactStore.inspect(hash)`.

- [ ] **Step 1: Write ledger atomicity and tamper tests**

```ts
import { expect, test } from "bun:test";
import { testLedger, validEvent } from "./fixtures";

test("append advances event and chain head in one transaction", () => {
  const ledger = testLedger();
  const row = ledger.append(validEvent());
  expect(ledger.verify()).toEqual({ valid: true, count: 1, head: row.event_hash });
});

test("modified payload breaks complete-chain verification", () => {
  const ledger = testLedger();
  ledger.append(validEvent());
  ledger.unsafeTestOnlyMutatePayload(1, '{"changed":true}');
  expect(ledger.verify()).toMatchObject({ valid: false, brokenSequence: 1 });
});
```

Define `fixtures.ts` with `testLedger()` opening a unique temporary SQLite database and `validEvent()` returning a fully valid `BridgeEventV1` whose task hash, repository fingerprint, payload hash, sender identity, receiver identity, creation time, and prior-event hash are internally consistent.

- [ ] **Step 2: Write bounded artifact tests**

Assert content-addressed deduplication, SHA-256 verification, maximum-size rejection, forbidden media-type rejection, task metadata binding, and no artifact bytes inside ledger rows.

- [ ] **Step 3: Run tests and confirm failure**

Run: `bun test packages/ledger/test packages/artifact-store/test`

Expected: FAIL because stores do not exist.

- [ ] **Step 4: Implement the SQLite schema and append transaction**

Use `events(sequence INTEGER PRIMARY KEY AUTOINCREMENT, event_id TEXT UNIQUE, event_json TEXT, previous_hash TEXT, event_hash TEXT, created_at TEXT)` plus one-row `chain_head`. Compute `event_hash = SHA256(previous_hash || canonical_event_json)` and update both rows inside one `BEGIN IMMEDIATE` transaction. Expose the unsafe mutation helper only from the test build.

- [ ] **Step 5: Implement content-addressed artifacts**

Write to a same-directory temporary file, hash while bounded, `fsync`, and atomically rename to `sha256/<first-two>/<full-hash>`. Reject mismatched declared hashes and return immutable metadata.

- [ ] **Step 6: Run store tests**

Run: `bun test packages/ledger/test packages/artifact-store/test && bun run typecheck`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add packages/ledger packages/artifact-store
git commit -m "feat: add verifiable local evidence stores"
```

---

### Task 5: Implement Session and Ownership State Machines

**Files:**
- Create: `packages/broker/src/{session-machine,ownership-machine}.ts`
- Create: `packages/broker/test/{session-machine,ownership-machine}.test.ts`

**Interfaces:**
- Produces: `transitionSession(state, event)`, `transitionOwnership(state, event)`, `assertCurrentWriter(executionId, worktreeId, fencingToken)`, `SessionState`, and `OwnershipState`.

- [ ] **Step 1: Write complete transition-table tests**

```ts
const ownedBy = (executionId: string, fencingToken: number): OwnershipState => ({
  kind: "owned",
  executionId,
  worktreeId: "wt-1",
  fencingToken,
  repositoryFingerprint: { kind: "commit", git_sha: "a".repeat(40), sha256: "b".repeat(64) }
});

test("interrupted cannot return directly to active", () => {
  expect(() => transitionSession({ kind: "interrupted" }, { type: "resume" })).toThrow("reconciliation_required");
});

test("sender cannot write after release", () => {
  const released = transitionOwnership(ownedBy("claude", 4), { type: "release", executionId: "claude", fencingToken: 4 });
  expect(() => assertCurrentWriter(released, "claude", "wt-1", 4)).toThrow("writer_not_owned");
});
```

- [ ] **Step 2: Add fencing and transfer negative tests**

Test simultaneous acquisition, stale token, wrong worktree, acceptance before release, wrong fingerprint, receiver with wider authority, rejection, disconnect invalidation, and recovery issuing a new token.

- [ ] **Step 3: Run tests and confirm failure**

Run: `bun test packages/broker/test/session-machine.test.ts packages/broker/test/ownership-machine.test.ts`

Expected: FAIL because state machines do not exist.

- [ ] **Step 4: Implement closed transition maps**

Use discriminated unions. Unlisted transitions throw a typed `InvalidTransitionError`; no default branch may coerce an unknown state. `verify` accepts only `owned`, the current execution, exact worktree, active session, unexpired task, and current fencing token.

- [ ] **Step 5: Run state-machine tests**

Run: `bun test packages/broker/test/session-machine.test.ts packages/broker/test/ownership-machine.test.ts && bun run typecheck`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add packages/broker/src/session-machine.ts packages/broker/src/ownership-machine.ts packages/broker/test
git commit -m "feat: enforce session and writer lifecycles"
```

---

### Task 6: Build the Local Broker, Socket Authentication, and MCP Contract

**Files:**
- Create: `packages/broker/src/{index,broker,socket,credentials,mcp-server}.ts`
- Create: `packages/broker/test/{broker,socket,mcp-contract}.test.ts`

**Interfaces:**
- Consumes: protocol, policy, ledger, artifact store, and state machines.
- Produces: `MadBridgeBroker.start(config)`, `stop()`, `dispatch(event, credential)`, `subscribe(listener)`, `createInMemoryBrokerForTest()`, and the 16 approved MCP tools.

- [ ] **Step 1: Write socket and credential tests**

Test runtime directory `0700`, socket `0600`, rejection of wrong owner, safe stale-socket cleanup, short-lived per-execution credentials, replay rejection, credential/sender mismatch, and zero TCP listeners.

- [ ] **Step 2: Write the MCP allowlist test**

```ts
test("MCP exposes only the approved bridge tools", async () => {
  const broker = await createInMemoryBrokerForTest();
  expect((await broker.mcpServer.listTools()).map(t => t.name).sort()).toEqual([
    "bridge.action.request", "bridge.action.respond", "bridge.artifact.inspect",
    "bridge.artifact.publish", "bridge.inbox.acknowledge", "bridge.inbox.list",
    "bridge.message.send", "bridge.ownership.accept", "bridge.ownership.reject",
    "bridge.ownership.release", "bridge.ownership.request", "bridge.review.record",
    "bridge.session.close", "bridge.session.pause", "bridge.session.status",
    "bridge.verification.record"
  ]);
});
```

- [ ] **Step 3: Run tests and confirm failure**

Run: `bun test packages/broker/test/broker.test.ts packages/broker/test/socket.test.ts packages/broker/test/mcp-contract.test.ts`

Expected: FAIL because broker services do not exist.

- [ ] **Step 4: Implement dispatch ordering**

For every request: authenticate credential, parse schema, verify task hash and repository fingerprint, evaluate policy, verify state transition or writer token, persist the event, then broadcast the committed event. Never broadcast uncommitted state. Reject any method outside the fixed MCP tool map.

- [ ] **Step 5: Run broker tests**

Run: `bun test packages/broker/test && bun run typecheck`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add packages/broker
git commit -m "feat: add authenticated madbridge broker"
```

---

### Task 7: Implement and Parity-Test Both CLI Adapters

**Files:**
- Create: `packages/adapter-claude-code/src/{index,adapter,attestation,hooks,mcp-config}.ts`
- Create: `packages/adapter-claude-code/test/{attestation,parity,integration}.test.ts`
- Create: `packages/adapter-antigravity/src/{index,adapter,attestation,hooks,mcp-config}.ts`
- Create: `packages/adapter-antigravity/test/{attestation,parity,integration}.test.ts`
- Create: `test/adapter-parity.shared.ts`

**Interfaces:**
- Consumes: `AdapterV1` from protocol and authenticated broker connection details.
- Produces: `ExecutionIdentity`, `ConfigChangeSet`, `LaunchInput`, `ManagedExecution`, `ClaudeCodeAdapter`, and `AntigravityAdapter`, with both adapters implementing `attest`, `prepareConfigPreview`, `launch`, `notifyInbox`, `pause`, and `terminate`.

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

- [ ] **Step 1: Define the shared parity suite**

Both adapters must pass identical tests for: attestation producing a machine-verifiable `ExecutionIdentity`, config preview producing a restorable `ConfigChangeSet` with backup, launch producing a `ManagedExecution` with resolved executable path and PID, inbox notification without command injection, pause forwarding, and clean termination.

- [ ] **Step 2: Write adapter-specific attestation tests**

Claude Code: verify `claude` binary path, version, model selection flag, and MCP config path (`~/.claude/mcp_config.json`). Antigravity: verify `agy` binary path, version, model selection flag, and MCP config path (`~/.gemini/config/mcp_config.json` — NOT `~/.gemini/settings.json`).

- [ ] **Step 3: Run tests and confirm failure**

Run: `bun test packages/adapter-claude-code/test packages/adapter-antigravity/test`

Expected: FAIL because adapters do not exist.

- [ ] **Step 4: Implement both adapters**

Both adapters implement the same `AdapterV1` interface. Config changes produce a preview with backup, require Founder confirmation, and are restorable. Neither adapter exposes arbitrary filesystem reads or shell execution. Model identity must be machine-verifiable; if it cannot be verified, fail closed.

- [ ] **Step 5: Run parity tests**

Run: `bun test packages/adapter-claude-code/test packages/adapter-antigravity/test test/adapter-parity.shared.ts && bun run typecheck`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add packages/adapter-claude-code packages/adapter-antigravity test/adapter-parity.shared.ts
git commit -m "feat: add governed claude and antigravity adapters"
```

---

### Task 8: Add Managed PTYs and the MADVentures TUI Experience

**Files:**
- Create: `packages/broker/src/pty-manager.ts`
- Create: `apps/madbridge/src/tui/App.tsx`
- Create: `apps/madbridge/src/tui/components/{ApprovalDialog,EventLog,StatusBar}.tsx`
- Create: `apps/madbridge/src/tui/panes/{ClaudePane,GovernancePane,AntigravityPane}.tsx`
- Create: `apps/madbridge/src/tui/hooks/{useBrokerState,useKeyboard}.ts`
- Create: `apps/madbridge/test/{tui-projection,pty-focus}.test.tsx`

**Interfaces:**
- Consumes: broker subscription snapshots and typed Founder actions.
- Produces: three-pane OpenTUI React UI and `PtyManager.launch/resize/focus/write/terminate`.

- [ ] **Step 1: Write focus and trust-boundary tests**

Test that keyboard bytes go only to the focused PTY, bare digits pass through unchanged, global actions require a configured modifier/prefix, terminal output containing `Founder approved` changes no broker state, and narrow layouts retain persistent status labels.

- [ ] **Step 2: Write governance-pane projection tests**

Render a broker snapshot and assert task/repository/fingerprint, both execution identities, active writer/token, permission summaries, pending actions, transfer phase, verification/review, incident, and Founder-decision labels are visible.

- [ ] **Step 3: Run tests and confirm failure**

Run: `bun test apps/madbridge/test/tui-projection.test.tsx apps/madbridge/test/pty-focus.test.tsx`

Expected: FAIL because the production TUI does not exist.

- [ ] **Step 4: Implement the React projection**

`useBrokerState` subscribes to immutable broker snapshots; `ApprovalDialog` emits typed approval events bound to task, actor, scope, repository fingerprint, and time. Remove the prototype's approval toggle. Use explicit text for every color state.

- [ ] **Step 5: Implement managed PTY isolation**

`PtyManager` launches managed CLI processes with PTY allocation, handles resize, routes keyboard input only to the focused PTY, and supports clean termination. No arbitrary process spawning — only the two approved CLI executables.

- [ ] **Step 6: Run TUI tests**

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add apps/madbridge/src/tui apps/madbridge/test packages/broker/src/pty-manager.ts
git commit -m "feat: add madventures governed terminal experience"
```

---

### Task 9: Implement the `madv-tui` Command Surface

**Files:**
- Create: `apps/madbridge/src/cli.ts`
- Create: `apps/madbridge/src/commands/{init,doctor,start,status,pause,resume,verify-ledger,export-evidence,close}.ts`
- Create: `apps/madbridge/test/{cli,doctor}.test.ts`

**Interfaces:**
- Consumes: adapters, broker, stores, task-envelope parser, and TUI.
- Produces: the nine approved commands with stable exit codes and JSON output when `--json` is present.

- [ ] **Step 1: Write command-contract tests**

Assert exact command names, stable exit codes, and JSON output format. `doctor` is read-only and verifies Claude Code, `agy`, Bun, OpenTUI, model-selection visibility, permissions, runtime directories, and adapter compatibility without mutation. `export-evidence` writes a sanitized package and final manifest without raw transcripts or secrets.

- [ ] **Step 2: Run tests and confirm failure**

Run: `bun test apps/madbridge/test/cli.test.ts apps/madbridge/test/doctor.test.ts`

Expected: FAIL because CLI commands do not exist.

- [ ] **Step 3: Implement `init` and `doctor`**

`init` previews runtime directory and CLI configuration changes, requests Founder confirmation, creates only approved directories, and preserves restorable backups. `doctor` performs reads only: platform/architecture, Bun, Claude Code, `agy`, OpenTUI dependencies, exact-model visibility, directory permissions, and adapter protocol compatibility.

- [ ] **Step 4: Implement session commands**

`start` validates every preflight before child launch. `pause`, `resume`, and `close` send typed session events. `status` reads a broker snapshot. `verify-ledger` performs complete-chain verification. `export-evidence` writes a sanitized package and final manifest without raw transcripts or secrets.

- [ ] **Step 5: Run command tests**

Run: `bun test apps/madbridge/test && bun run typecheck`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add apps/madbridge/src/cli.ts apps/madbridge/src/commands apps/madbridge/test
git commit -m "feat: add madv tui command surface"
```

---

### Task 10: Implement Interruption, Reconciliation, and Deterministic Restart

**Files:**
- Create: `packages/broker/src/reconciliation.ts`
- Create: `packages/broker/test/reconciliation.test.ts`
- Extend: `packages/ledger/src/rebuild.ts`
- Extend: `packages/broker/src/broker.ts`

**Interfaces:**
- Consumes: ledger events, repository state, adapter attestation.
- Produces: `interruptSession(reason)`, `reconcileRepository(input)`, `resumeSession(approval)`, and deterministic `rebuildBrokerState(events)`.

- [ ] **Step 1: Write disconnect and restart tests**

Test CLI exit, adapter loss, broker restart, frozen pending actions, invalidated fencing token, persisted last fingerprint, broken-chain block, ambiguous working tree block, re-attestation requirement, Founder-visible reconciliation, and a new token only after valid resume.

- [ ] **Step 2: Run tests and confirm failure**

Run: `bun test packages/broker/test/reconciliation.test.ts packages/ledger/test/rebuild.test.ts`

Expected: FAIL because reconciliation is incomplete.

- [ ] **Step 3: Implement fail-closed interruption**

On any monitored process or adapter disconnect, atomically append `incident` and move to `interrupted`; mark the current writer token unusable in reconstructed state. Do not auto-resume.

- [ ] **Step 4: Implement repository reconciliation**

Compare actual repository/worktree identity and fingerprint with the last committed event, record changed paths without unrestricted file contents, re-attest both executions, and produce one of `reconciled`, `ambiguous`, or `mismatch`. Only `reconciled` plus a matching typed Founder resume event returns to `active`.

- [ ] **Step 5: Run recovery tests**

Run: `bun test packages/broker/test/reconciliation.test.ts packages/ledger/test/rebuild.test.ts && bun run typecheck`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add packages/broker/src packages/broker/test/reconciliation.test.ts packages/ledger/src/rebuild.ts packages/ledger/test/rebuild.test.ts
git commit -m "feat: add fail closed session recovery"
```

---

### Task 11: Migrate Useful Prototype Code and Remove Obsolete Duplicates

**Files:**
- Delete after parity is proven: `src/tui/`, `src/broker/`, `src/mcp/`, `src/adapters/`, `src/permissions/`, `src/shared/`
- Modify: `README.md`
- Modify: `test/architecture-boundaries.test.ts`

**Interfaces:**
- Consumes: all approved packages and tests.
- Produces: one unambiguous implementation with no competing broker, permission engine, protocol, or authority UI.

- [ ] **Step 1: Inventory prototype logic against the new implementation**

Run:

```bash
rg -n "approval|owner|lease|socket|send_message|request_transfer|accept_transfer|attest|get_state|get_inbox" src apps packages
```

Expected: all matches are in the new workspace boundaries, not in the old `src/` directory.

- [ ] **Step 2: Delete obsolete files after proving parity**

Remove `src/tui/`, `src/broker/`, `src/mcp/`, `src/adapters/`, `src/permissions/`, and `src/shared/` entirely. All functionality must be in `apps/` and `packages/`.

- [ ] **Step 3: Run full verification**

Run: `bun install --frozen-lockfile && bun run verify`

Expected: PASS with zero references to the old directory structure.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove obsolete prototype code after workspace parity"
```

---

### Task 12: Execute Version 1 Negative Controls and Acceptance Gate

**Files:**
- Create: `test/acceptance/disposable-repo.ts`
- Create: `test/acceptance/{two-way-collaboration,ownership-transfer,interruption-recovery,evidence-manifest}.test.ts`
- Create: `docs/verification/madventures-tui-v1-evidence.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: complete Version 1 system.
- Produces: disposable-repository acceptance evidence and a final manifest bound to the tested Git tree.

- [ ] **Step 1: Create an isolated disposable Git repository fixture**

`disposable-repo.ts` creates a temporary directory, initializes Git, commits one file, creates dedicated Claude and Antigravity worktrees, and returns cleanup handles. It must refuse any path inside the production repository or any branch named `main` or `master` for destructive controls. No acceptance test may target a production branch.

- [ ] **Step 2: Write two-way collaboration and artifact tests**

Exercise typed Claude-to-Antigravity and Antigravity-to-Claude messages, action request/accept/reject, bounded artifact publication, inbox acknowledgement, and absence of arbitrary shell/filesystem MCP tools.

- [ ] **Step 3: Write ownership and negative-control tests**

Exercise transfer in both directions and prove rejection of concurrent writers, stale tokens, write after release, wrong fingerprint, unauthorized path/command/data/egress, forged and expired credentials, replay, unsupported protocol, oversized payload, model mismatch, self-review, and terminal prose claiming authority.

- [ ] **Step 4: Write interruption and evidence tests**

Kill each managed CLI and the broker in separate cases, verify fail-closed interruption, restart, re-attestation, reconciliation, typed resume, complete hash-chain verification, and final manifest equality with the actual repository state.

- [ ] **Step 5: Run the complete acceptance gate**

Run:

```bash
bun install --frozen-lockfile
bun run typecheck
bun test
bun run apps/madbridge/src/cli.ts doctor --json
bun run apps/madbridge/src/cli.ts verify-ledger --json
```

Expected: typecheck and all tests PASS; `doctor` reports Apple Silicon macOS and both adapter capability results without mutation; ledger verification reports a complete valid chain.

- [ ] **Step 6: Record fresh evidence**

Write exact command outputs, tested Git SHA, Bun version, Claude Code version, `agy` version, protocol version, adapter capability status, ledger head hash, manifest hash, and known fail-closed capability limitations into `docs/verification/madventures-tui-v1-evidence.md`. Do not include secrets or raw transcripts.

- [ ] **Step 7: Update README**

Update `README.md` to reflect the final Version 1 product: commands, architecture, verification status, and explicit deferrals.

- [ ] **Step 8: Request independent code review**

Commission a non-authoring reviewer against the exact tested Git SHA and the approved design. Resolve every blocking finding with a new test and rerun Step 5 before presenting completion to the Founder.

- [ ] **Step 9: Commit the verification package**

```bash
git add test/acceptance docs/verification README.md
git commit -m "test: verify madventures tui version 1"
```

---

## Release Boundary