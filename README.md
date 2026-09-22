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
├── pty-host/              # M19 governed PTY host: gap-free launch verification, framed
│                          # protocol, bounded termination ladder (not yet wired into the
│                          # broker session lifecycle — see Task 46/47 in the Phase 3A plan)
├── adapter-claude-code/   # Claude Code adapter: attestation, config preview, lifecycle
└── adapter-antigravity/   # Antigravity (agy) adapter: attestation, config preview, lifecycle

apps/
└── madbridge/             # CLI + TUI application
    └── src/
        ├── cli.ts         # madv-tui CLI entry — nine approved commands
        ├── commands/      # init, doctor, start, status, pause, resume, verify-ledger, export-evidence, close
        └── tui/           # @opentui/react presentation only (no policy/ledger imports)
            ├── App.tsx, main.tsx, keyboard-router.ts, keybindings.ts, types.ts
            ├── components/  # ApprovalDialog, StatusBar, EventLog, DockStrip, DecisionStrip,
            │                # IncidentBand, FixtureBanner, PaneTabs, agent-identity
            ├── hooks/       # useBrokerState, useKeyboard
            └── panes/       # ClaudePane, AntigravityPane, GovernancePane
```

## Architecture Boundary

- **packages/protocol** — wire format, event taxonomy, task envelopes, canonical JSON hashing.
- **packages/policy** — evaluates every action against task scope, path allow-list, model identity, and review independence. Terminal text is inert.
- **packages/ledger** — append-only SQLite ledger with hash-chain integrity and deterministic state rebuild.
- **packages/artifact-store** — content-addressed store for session artifacts.
- **packages/broker** — the governance daemon: ownership state machine, session lifecycle, MCP server, reconciliation on resume. The Phase 3A runtime foundation (`DEC-20260812-01`, ratified) supersedes the Unix-domain-socket transport described here in earlier revisions: forward runtime work uses one foreground supervisor with an in-process `BrokerClient` and a dormant socket, not a named daemon endpoint — see the companion spec's §7.1 table.
- **packages/pty-host** — governed PTY host process (M19): adjacent-to-exec artifact re-hash before launch, framed command/fact protocol, bounded process-group termination ladder. Currently reachable only from its own test suite — no broker lifecycle code invokes it yet; wiring it into a real session is Task 46/47 in the Phase 3A plan, not yet started.
- **packages/adapter-claude-code** — attests Claude Code (exact model, version, fingerprint), manages config preview, launch, notify, terminate.
- **packages/adapter-antigravity** — same adapter contract for Antigravity (agy); attestation fails closed when model is unverifiable.
- **apps/madbridge** — the CLI (`madv-tui`) and TUI. React is presentation-only: it projects broker state and routes keyboard input. It cannot decide authority, permissions, ownership, evidence acceptance, hashing, or recovery.

## Getting Started

```bash
# Install dependencies
bun install

# Run the CLI
bun run madv-tui doctor

# Start a governed session (flag is --envelope, not --task; no example
# envelope fixture ships in this repo yet). Phase 3A gates live start behind
# a mandatory broker socket that does not exist yet, so this currently
# returns `no_broker_available` by design (DEC-20260812-01) — see `apps/
# madbridge/src/commands/start.ts`.
bun run madv-tui start --envelope path/to/your-envelope.json

# Development (TUI)
bun run dev

# Verify (typecheck + tests)
bun run verify
```

## Testing

```bash
bun run verify          # typecheck + all tests
bun test                # tests only
bun test test/acceptance  # acceptance tests only
```

As measured at `main` `5e26c589773e0746054c1204a65a082d8896e4af` (2026-09-01,
`bun test`, Bun 1.3.11, Linux container): 844 tests across 48 files, 842 pass,
2 fail, 3885 `expect()` calls. The 2 failures are timing-sensitive PTY-process
assertions in `packages/pty-host/test/main-guard.test.ts` that are believed to
be an artifact of this sandboxed environment, not a verified regression —
re-run on the qualified-Bun/hardware CI environment before treating them as a
defect. The suite covers protocol parsing, policy enforcement, ledger
integrity, ownership transitions, session reconciliation, adapter attestation,
CLI commands, TUI projection, the M19 PTY-host launch/termination/escalation
primitives, and full acceptance-level two-way collaboration, ownership
transfer, interruption recovery, and evidence manifest verification. This
count will drift again with the next merge — treat it as a snapshot, not a
frozen fact, and re-measure with `bun test` before citing it elsewhere.

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

`docs/verification/madventures-tui-v1-evidence.md` is the V1 baseline record
(2026-08-08/09) — historical, not current. The `docs/verification/` directory
is a running log; as of this writing, `phase-3a-correction-rounds.md` is the
most recently updated record (round 12, 2026-08-29). Check the directory
listing rather than trusting any single "latest" pointer, since it will drift
again with the next round.
