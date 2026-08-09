# MadBridge

Governed terminal bridge for orchestrating Claude Code and Antigravity through a
shared MCP broker with cryptographic attestation, ownership transfer, and
hash-chained evidence.

## Package Structure

```
packages/
├── protocol/              # Wire protocol, bridge events, task envelopes, canonical JSON
├── policy/                # Policy engine: scope, path, model, review-independence checks
├── ledger/                # SQLite append-only hash-chained ledger + state rebuild
├── artifact-store/        # Content-addressed artifact storage
├── broker/                # Broker daemon: ownership, sessions, socket, MCP server, reconciliation
├── adapter-claude-code/   # Claude Code adapter: attestation, config preview, lifecycle
└── adapter-antigravity/   # Antigravity (agy) adapter: attestation, config preview, lifecycle

apps/
└── madbridge/             # CLI + TUI application
    └── src/
        ├── cli.ts         # madv-tui CLI entry — nine approved commands
        ├── commands/      # init, doctor, start, status, pause, resume, verify-ledger, export-evidence, close
        └── tui/           # @opentui/react presentation only (no policy/ledger imports)
            ├── App.tsx
            ├── components/  # ApprovalDialog, StatusBar, EventLog
            ├── hooks/       # useBrokerState, useKeyboard
            ├── panes/       # ClaudePane, AntigravityPane, GovernancePane
            ├── keybindings.ts
            └── types.ts
```

## Architecture Boundary

- **packages/protocol** — wire format, event taxonomy, task envelopes, canonical JSON hashing.
- **packages/policy** — evaluates every action against task scope, path allow-list, model identity, and review independence. Terminal text is inert.
- **packages/ledger** — append-only SQLite ledger with hash-chain integrity and deterministic state rebuild.
- **packages/artifact-store** — content-addressed store for session artifacts.
- **packages/broker** — the governance daemon: ownership state machine, session lifecycle, Unix socket, MCP server, reconciliation on resume.
- **packages/adapter-claude-code** — attests Claude Code (exact model, version, fingerprint), manages config preview, launch, notify, terminate.
- **packages/adapter-antigravity** — same adapter contract for Antigravity (agy); attestation fails closed when model is unverifiable.
- **apps/madbridge** — the CLI (`madv-tui`) and TUI. React is presentation-only: it projects broker state and routes keyboard input. It cannot decide authority, permissions, ownership, evidence acceptance, hashing, or recovery.

## Getting Started

```bash
# Install dependencies
bun install

# Run the CLI
bun run madv-tui doctor

# Start a governed session
bun run madv-tui start --task tasks/example.json

# Development (TUI)
bun run dev

# Broker daemon
bun run broker

# Verify (typecheck + tests)
bun run verify
```

## Testing

```bash
bun run verify          # typecheck + all tests
bun test                # tests only
bun test test/acceptance  # acceptance tests only
```

401 tests across 32 files cover protocol parsing, policy enforcement, ledger
integrity, ownership transitions, session reconciliation, adapter attestation,
CLI commands, TUI projection, and full acceptance-level two-way collaboration,
ownership transfer, interruption recovery, and evidence manifest verification.

## Acceptance Tests

The `test/acceptance/` directory contains end-to-end acceptance tests that
verify the complete MadBridge governance contract:

- **disposable-repo.ts** — isolated disposable Git repository fixture with
  worktrees. Refuses production repo paths and `main`/`master` branches.
- **two-way-collaboration.test.ts** — typed bidirectional messaging, action
  request/accept/reject, bounded artifact publication, inbox acknowledgement,
  and absence of arbitrary shell/filesystem MCP tools.
- **ownership-transfer.test.ts** — ownership transfer in both directions plus
  negative controls: concurrent writers, stale tokens, write after release,
  wrong fingerprint, unauthorized path/command/data/egress, forged and expired
  credentials, replay, unsupported protocol, oversized payload, model mismatch,
  self-review, and terminal prose claiming authority.
- **interruption-recovery.test.ts** — fail-closed interruption on CLI exit,
  adapter disconnect, and broker restart; reconciliation, re-attestation,
  typed resume, complete hash-chain verification, and deterministic state rebuild.
- **evidence-manifest.test.ts** — manifest equality with actual repository
  state, sanitized evidence export, CLI verify-ledger, and protocol version
  consistency.

All acceptance tests use the in-memory broker (`createInMemoryBrokerForTest`)
for safety — no real CLI processes are spawned.

## Verification

```bash
# Complete acceptance gate
bun install --frozen-lockfile
bun run typecheck
bun test
bun run apps/madbridge/src/cli.ts doctor --json
bun run apps/madbridge/src/cli.ts verify-ledger --json
```

See `docs/verification/madventures-tui-v1-evidence.md` for the latest
verification evidence record.
