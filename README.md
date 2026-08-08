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
```

251 tests across 28 files cover protocol parsing, policy enforcement, ledger
integrity, ownership transitions, session reconciliation, adapter attestation,
CLI commands, and TUI projection.
