# MADVentures TUI Experience — Governed Claude Code and Antigravity Bridge

**Status:** Founder-approved design sections; pending final written-spec review  
**Date:** 2026-08-08  
**Product/interface:** MADVentures TUI Experience  
**Repository:** `madventures-tui`  
**Founder command:** `madv-tui`  
**Neutral service:** `madbridge`  
**Protocol:** `madbridge-protocol/v1`

## 1. Goal

Build a local-first, live, bidirectional and governed collaboration tool for
Claude Code CLI and Google Antigravity CLI (`agy`). The two CLIs operate as
replaceable execution surfaces around a neutral broker. Neither CLI governs the
other, and neither can create or expand authority.

Version 1 must let the Founder approve one bounded task envelope, assign a
registered role and exact model to each CLI, observe both live sessions in one
terminal experience, exchange typed messages and artifacts, request bounded
actions, and transfer exclusive worktree ownership without concurrent writers.

## 2. Locked product decisions

1. Collaboration is live and bidirectional, not a static file export.
2. The control plane is a neutral governed broker.
3. Deployment is local-first on the Founder's Mac and gateway-ready.
4. One Founder-approved task envelope permits bounded collaboration.
5. Messages and selected artifacts flow; raw transcripts, secrets and
   unrestricted directories do not.
6. Evidence is recorded locally in SQLite using an append-only hash chain.
7. The broker launches and attests both CLIs.
8. The user experience is a single three-pane OpenTUI application.
9. Roles are selected per task. Exactly one execution owns each deliverable.
10. Version 1 ships two adapters behind an extensible protocol.
11. Cross-surface work uses typed action requests, never raw command injection.
12. Any CLI, adapter or broker disconnect fails closed and requires repository
    reconciliation before resumption.
13. The TUI uses the OpenTUI `react` template with Bun and strict TypeScript.

## 3. Core architecture

### 3.1 Components

```text
Claude Code CLI                        Antigravity CLI (`agy`)
       |                                        |
Claude adapter                         Antigravity adapter
       |                                        |
       +---------- MAD Bridge broker -----------+
                            |
             task, policy and ownership engine
                            |
             SQLite ledger + artifact store
                            |
                MADVentures React TUI
```

The broker is authoritative for session mechanics, validation, routing,
ownership and evidence. Roles and permissions originate only in the approved
task envelope. The React TUI is a projection of broker state and never becomes
an authority source.

### 3.2 Project boundaries

```text
apps/
  madbridge/                 Founder command and OpenTUI React application

packages/
  protocol/                  Versioned schemas and canonical event types
  broker/                    Session lifecycle and typed routing
  policy/                    Role, path, command, data and egress validation
  ledger/                    SQLite event store and hash-chain verification
  artifact-store/            Content-addressed local artifacts
  adapter-claude-code/       Claude MCP, hooks and process attestation
  adapter-antigravity/       AGY MCP, hooks and process attestation
```

React code may subscribe to broker state and submit typed Founder actions. It
must not implement permission checks, writer leases, authorization decisions,
hashing, evidence acceptance or recovery transitions.

## 4. Task envelope and session startup

A session starts with:

```bash
madv-tui start --task <task-envelope> --repo <repository>
```

The task envelope contains:

- durable task ID and authorization reference;
- repository, branch/worktree and initial SHA or uncommitted diff fingerprint;
- each execution's stable role, surface, exact model/provider and effort;
- initial writer;
- allowed read and write paths;
- allowed command categories;
- allowed artifact categories and size limits;
- data classification and egress boundary;
- expiration and completion boundary;
- protocol version and envelope hash.

Before any child process launches, the broker verifies the envelope, repository
state, binary identities, model-selection visibility, protocol compatibility,
runtime directories and absence of conflicting writer ownership. Any missing,
ambiguous, stale or mismatched value fails closed.

The broker launches Claude Code and `agy` with separate short-lived session
credentials and configures the matching MCP adapter and hooks. A CLI cannot
attach to a session by merely claiming its identity.

## 5. Typed collaboration protocol

### 5.1 Event envelope

Every event includes:

- `protocol_version`;
- `event_id`, `session_id` and optional `parent_event_id`;
- sender and intended receiver execution IDs;
- sender role, surface, exact model and provider;
- task-envelope hash;
- repository fingerprint;
- event type;
- payload hash and content-addressed artifact references;
- creation time;
- previous-ledger-event hash.

Unknown protocol versions, event types, required fields or schema extensions
are rejected. Messages and inline payloads are size-bounded. Large approved
artifacts are stored outside SQLite by content hash.

### 5.2 Event types

```text
message
action_request
action_accept
action_reject
artifact_publish
ownership_request
ownership_release
ownership_accept
ownership_reject
verification_result
review_verdict
pause
resume
incident
session_close
```

An action request never executes merely because the sender requested it. The
broker validates the action against the receiver's role and task permissions;
the receiver then explicitly accepts or rejects it. Cross-CLI shell-command
injection is prohibited.

### 5.3 MCP surface

```text
bridge.session.status
bridge.inbox.list
bridge.inbox.acknowledge
bridge.message.send
bridge.action.request
bridge.action.respond
bridge.artifact.publish
bridge.artifact.inspect
bridge.ownership.request
bridge.ownership.release
bridge.ownership.accept
bridge.ownership.reject
bridge.verification.record
bridge.review.record
bridge.session.pause
bridge.session.close
```

The MCP server exposes no arbitrary filesystem-read or shell-execution tool.
Read-only resources may expose the current task envelope, sanitized event
history and artifact metadata. Hooks notify the TUI and agents that inbox work
exists but do not inject commands or manufacture acceptance.

Both adapters consume the same protocol package and must pass identical
adapter-parity tests. The protocol version is independent of the application
version so future adapters or a gateway can negotiate compatibility.

## 6. Ownership and lifecycle state machines

Session lifecycle and writer ownership are separate state machines.

### 6.1 Session lifecycle

```text
starting -> active -> paused -> active -> closing -> closed
                    \-> interrupted -> reconciling -> active
```

No `interrupted` session may return directly to writing. Re-attestation and
repository reconciliation are mandatory.

### 6.2 Ownership lifecycle

```text
free
  -> owned-by-sender
  -> transfer-requested
  -> sender-released
  -> receiver-validating
  -> owned-by-receiver
```

`receiver-validating` may transition to `transfer-rejected`, which leaves the
worktree stopped until a corrected transfer or explicit reassignment. Every
ownership acquisition increments a fencing token. Write authorization requires
the current execution ID, worktree identity and fencing token. A stale owner
cannot resume writing after transfer, disconnect or recovery.

Before acceptance, the receiver verifies:

- repository and worktree identity;
- current SHA or uncommitted diff fingerprint;
- sender release;
- receiver role and permission scope;
- artifact and context manifest;
- equal-or-narrower authority;
- current fencing token and session status.

## 7. Security and authority boundaries

### 7.1 Local transport and storage

Version 1 opens no TCP listener. It uses a Unix-domain socket under:

```text
~/Library/Application Support/MADVentures/run/madbridge.sock
```

The runtime directory is Founder-owned with mode `0700`; the socket uses mode
`0600`. Stale socket cleanup requires `lstat`, owner verification and proof that
no broker process is serving the path. The database, configuration and artifact
directories are also restricted to the Founder account.

### 7.2 Execution attestation

Before admission the broker records the resolved executable path, CLI version,
executable or package fingerprint, process identity, adapter version, exact
model/provider, effort and assigned role. If the exact active model cannot be
verified, the execution does not enter `active`. Auto selection, silent model
switching and unrecorded fallback are prohibited.

### 7.3 Permission enforcement

The policy engine validates role, model, surface, repository, worktree, read and
write paths, command category, artifact type, data classification, egress,
expiration and authorization reference. A message has no power to modify these
values. Claims of Founder approval are ignored unless the approval already
exists in the task envelope.

The bridge never transfers credentials, API keys, authentication tokens,
unrestricted environment variables, complete raw transcripts, private
reasoning, files outside approved paths or unapproved external payloads.

The vendor CLIs retain their own tool-permission systems. Broker validation is
an additional narrowing layer, not a replacement or expansion.

### 7.4 Authority exclusions

The broker cannot ratify decisions, assign itself a role, expand permissions,
approve merges, authorize deployments, waive review or manufacture Founder
approval. Neither CLI controls the other.

## 8. Evidence and artifact storage

SQLite stores canonical structured events and their hash-chain linkage. Event
creation and chain advancement occur in one transaction. The ledger is called
tamper-evident, never tamper-proof.

Approved artifact bytes live in a content-addressed store. SQLite records the
hash, size, media type, producer, task, repository fingerprint and sanitized
locator. Raw transcripts and secrets are not artifacts.

Default local locations:

```text
~/Library/Application Support/MADVentures/madventures-tui/config/
~/Library/Application Support/MADVentures/madventures-tui/data/ledger.sqlite3
~/Library/Application Support/MADVentures/madventures-tui/artifacts/sha256/
```

Version 1 can export a sanitized evidence package and final session manifest.
Neon projection is deferred. A future projection must preserve the local event
identity and must not broaden the data permitted to leave the Mac.

## 9. MADVentures TUI Experience

The OpenTUI React application hosts three panes:

```text
Claude Code managed PTY | Governance and Handoff | Antigravity managed PTY
```

The outer panes display real broker-launched CLI processes. Keyboard input goes
only to the focused PTY. The broker and policy engine never parse terminal prose
as identity, approval, repository state or evidence. Trusted state arrives
through the adapters and broker.

The center pane shows:

- task, repository, branch and fingerprint;
- role, exact model and connection status for both executions;
- active writer and fencing state;
- allowed paths, commands, data class and egress;
- typed action requests and artifact metadata;
- ownership-transfer progress;
- verification and review events;
- incidents and Founder-required decisions.

Startup presents the complete task envelope for confirmation. Approval is a
typed event bound to the actor, task, scope, repository fingerprint and time;
it is never a mutable UI toggle.

Global shortcuts use a configurable prefix or modifiers so ordinary characters,
including digits, remain usable inside both CLIs. On narrow terminals the UI
shows one active pane with persistent status and pane tabs. Every color-coded
state also has an explicit text label.

## 10. Commands and installation behavior

```bash
madv-tui init
madv-tui doctor
madv-tui start --task <task-envelope> --repo <path>
madv-tui status
madv-tui pause
madv-tui resume
madv-tui verify-ledger
madv-tui export-evidence
madv-tui close
```

`doctor` is read-only. It verifies Claude Code, `agy`, Bun, OpenTUI native
dependencies, model-selection visibility, permissions, runtime directories and
adapter compatibility.

Installation may not silently replace Claude Code or Antigravity configuration.
Proposed MCP or hook changes require a preview, Founder confirmation and a
restorable backup. Dependencies are exactly pinned in the lockfile.

Version 1 supports Apple Silicon macOS. Other systems and architectures require
their own explicit verification package.

## 11. Reliability and recovery

When a CLI, adapter or broker disconnects:

1. the session enters `interrupted`;
2. writing stops and the current fencing token becomes unusable;
3. pending actions and transfers freeze;
4. the last verified repository fingerprint persists;
5. both executions are re-attested;
6. actual repository state is reconciled against the ledger;
7. the Founder sees the reconciliation result;
8. a valid resume event restores `active` and issues current ownership state.

Broker restart reconstructs state from the verified ledger. A broken hash chain,
ambiguous repository state or unavailable execution leaves the session blocked.

## 12. Verification requirements

### 12.1 Unit verification

- schema and protocol-version rejection;
- canonical event serialization and hash-chain calculation;
- task-envelope permission decisions;
- session and ownership transitions;
- fencing-token behavior;
- artifact hashing and size limits;
- expiration and replay rejection.

### 12.2 Integration verification

- Unix-socket authentication and process identity;
- SQLite append-only behavior and complete-chain verification;
- broker restart and deterministic state reconstruction;
- adapter parity;
- bounded artifact publication and retrieval;
- accurate React projection of broker state;
- real managed PTY focus without terminal-text trust.

### 12.3 Mandatory negative controls

The suite must prove rejection of simultaneous writers, stale fencing tokens,
writes after sender release, wrong-fingerprint transfer acceptance, unauthorized
paths or commands, disallowed data or egress, forged or expired credentials,
replayed events, unsupported protocol versions, oversized payloads, model
identity mismatch, self-review and terminal prose claiming Founder authority.

### 12.4 Version 1 acceptance gate

Against a disposable repository, the completed system must demonstrate:

- live typed Claude-to-Antigravity and Antigravity-to-Claude collaboration;
- approved artifact exchange;
- successful writer transfer in both directions;
- rejection of a concurrent writer;
- disconnect, re-attestation, reconciliation and recovery;
- a complete verifiable local evidence chain;
- a final manifest matching the actual resulting repository state.

No destructive or negative-control test may target a production branch.

## 13. Explicit Version 1 deferrals

Version 1 does not include:

- Codex, Grok, Cursor or Hermes adapters;
- hosted coordination or multi-device sessions;
- Neon evidence projection;
- the central governance gateway;
- automated merge, deployment or production operations;
- raw transcript synchronization;
- autonomous authority changes.

Hermes may serve as the separately authorized Builder for Version 1. That does
not make Hermes a Version 1 bridge adapter or grant it runtime authority inside
the resulting product.

## 14. Existing prototype disposition

The local scaffold reported at `/Users/michaeldaley/founder-tui` is useful
exploratory work but is not evidence that this specification is implemented.
Before it can become the implementation baseline it must, at minimum:

- replace bare digit focus shortcuts with configurable modified shortcuts;
- remove approval-toggle authority semantics;
- separate session and ownership state machines;
- add fencing tokens and complete transfer/rejection/interruption states;
- move the socket from `/tmp` into the protected runtime directory;
- implement the full versioned MCP contract;
- expand the permission engine to every task-envelope dimension;
- replace adapter stubs with real, parity-tested adapters;
- provide executable negative-control and recovery evidence.

The existing commit should remain preserved locally until reviewed. It must not
be represented as a functional bridge while either adapter remains a stub.

## 15. Implementation authority boundary

This document is a design specification, not implementation authorization. A
Builder works only under the Founder's exact bounded assignment. Completion
requires fresh verification of the final implementation and an independent
review bound to the resulting code state.
