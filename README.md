# Founder TUI

Three-pane live terminal UI for orchestrating Claude Code and Antigravity through a shared MCP broker.

## Architecture Boundary

```
src/
├── index.tsx                  # TUI entry — creates renderer, mounts React
├── tui/                       # @opentui/react presentation only
│   ├── App.tsx                # Root layout, keyboard handler, focus routing
│   ├── panes/
│   │   ├── ClaudePane.tsx     # Claude Code session state, streaming output
│   │   ├── AntigravityPane.tsx# Antigravity (Gemini CLI) session state
│   │   └── GovernancePane.tsx # Ownership state, lease transfers, attestation
│   ├── components/
│   │   ├── ApprovalDialog.tsx # Accept/reject transfer + attestation prompts
│   │   ├── StatusBar.tsx      # Active owner, lease status, queue depth
│   │   └── EventLog.tsx       # Rolling event feed from broker
│   └── hooks/
│       ├── useBrokerState.ts  # Subscribe to broker state over Unix socket
│       └── useKeyboard.ts     # Focus management, pane switching, approval keys
│
├── broker/                    # Framework-independent TypeScript
│   ├── index.ts               # Daemon entry point
│   ├── state-machine.ts       # Writer lease, ownership transitions, paused states
│   ├── ledger.ts              # SQLite-backed append-only event ledger
│   ├── hash-chain.ts          # Hash-chained attestation + recovery logic
│   ├── inbox.ts               # Per-CLI message inboxes, event-driven
│   ├── transfer.ts            # Ownership transfer protocol, re-attestation
│   └── socket.ts              # Unix-domain socket server
│
├── mcp/                       # MCP server (exposes broker to both CLIs)
│   ├── server.ts              # MCP stdio server entry
│   └── tools.ts               # Tool contract: send_message, request_transfer,
│   │                           #   accept_transfer, attest, get_state, get_inbox
│
├── adapters/                  # CLI adapters (sidecars that connect to broker)
│   ├── claude-adapter.ts      # Claude Code hook/plugin → broker socket
│   └── antigravity-adapter.ts # Antigravity MCP config → broker socket
│
├── permissions/               # Permission engine
│   └── engine.ts              # Who can write, when, under what attestation
│
└── shared/                    # Shared types and contracts
    ├── types.ts               # BrokerState, Message, Transfer, Attestation
    └── protocol.ts            # Socket message protocol, tool contract schemas
```

## Getting Started

```bash
# TUI (development)
bun run dev

# Broker daemon
bun run broker

# MCP server (launched by CLIs on-demand)
bun run mcp
```
