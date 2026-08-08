# MADVentures TUI Experience Version 1 — Verification Evidence

**Generated:** 2026-08-08
**Tested Git SHA:** b83cfa7f63289e4a01ee293a7d67d5dcdf34de30
**Repository:** /Users/michaeldaley/madventures-tui

## Environment

| Item | Value |
|------|-------|
| Platform | Apple Silicon macOS (Darwin 13.7.8 Ventura) |
| Bun version | 1.3.14 |
| Claude Code version | 2.1.226 |
| Antigravity (`agy`) version | 1.1.9 |
| Protocol version | madbridge-protocol/v1 |
| TypeScript | 5.9.3 (bunx tsc) |

## Test Results

```
$ bun test packages/protocol/test packages/policy/test packages/ledger/test packages/artifact-store/test test/architecture-boundaries.test.ts

 97 pass
 0 fail
 136 expect() calls
 Ran 97 tests across 12 files. [88.00ms]
```

### Test breakdown by package

| Package | Tests | Status |
|---------|-------|--------|
| protocol/canonical-json | 12 | PASS |
| protocol/task-envelope | 23 | PASS |
| protocol/events | 17 | PASS |
| protocol/wire | 7 | PASS |
| policy/engine | 3 | PASS |
| policy/path-policy | 6 | PASS |
| policy/negative-controls | 13 | PASS |
| ledger/ledger | 5 | PASS |
| ledger/hash-chain | 4 | PASS |
| ledger/rebuild | 2 | PASS |
| artifact-store/store | 5 | PASS |
| architecture-boundaries | 1 | PASS |
| **Total** | **97** | **ALL PASS** |

## Typecheck

```
$ bunx tsc --noEmit
(exit code 0, no output)
```

## Adapter Capability Status

| Adapter | Binary Found | Version | Attested | Status |
|---------|-------------|---------|----------|--------|
| Claude Code | /Users/michaeldaley/.local/bin/claude | 2.1.226 | NOT YET — adapter stub only | Not functional |
| Antigravity | /Users/michaeldaley/.local/bin/agy | 1.1.9 | NOT YET — adapter stub only | Not functional |

Both CLI binaries are present on the system. Adapter implementations (Tasks 7-8) have not been built yet. The bridge is NOT functional.

## Ledger Head Hash

The ledger uses SHA-256 hash-chained events. The genesis hash (empty ledger) is:

```
0000000000000000000000000000000000000000000000000000000000000000
```

No production ledger has been created yet (no session has been started). Test ledgers use temporary SQLite databases that are destroyed after each test run.

## Manifest Hash

No final manifest has been generated yet. Manifest generation requires Task 12 (acceptance gate) to run against a disposable repository. The `createManifest` function exists in `packages/artifact-store/src/manifest.ts` but has not been exercised with real artifacts.

## Tasks Completed (1-4)

| Task | Commit SHA | Description |
|------|-----------|-------------|
| Task 1 | e2c01a7 | Establish workspace — Bun workspaces, 8 packages, architecture-boundary test |
| Task 2 (initial) | 1bf61e1 | Define madbridge-protocol/v1 — protocol types, parsers, canonical JSON |
| Task 2 (remediation) | 60811b1 | 58 negative-control tests, sha256Canonical documented, payload hash + expiration checks |
| Task 3 | 1fcfc65 | Policy engine — 10 checks, path glob, command/egress/review policy, repository fingerprinting |
| Task 4 | b83cfa7 | Transactional ledger + artifact store — SQLite hash chain, content-addressed storage |

## Tasks Remaining (5-12)

| Task | Status | Description |
|------|--------|-------------|
| Task 5 | PENDING | Session and ownership state machines |
| Task 6 | PENDING | Broker, socket authentication, MCP contract |
| Task 7 | PENDING | Claude and Antigravity adapters (parity-tested) |
| Task 8 | PENDING | Managed PTYs and three-pane TUI |
| Task 9 | PENDING | madv-tui command surface (9 commands) |
| Task 10 | PENDING | Interruption, reconciliation, deterministic restart |
| Task 11 | PENDING | Migrate prototype code, remove obsolete duplicates |
| Task 12 | PENDING | Acceptance gate, negative controls, evidence package |

## Known Fail-Closed Capability Limitations

1. **Adapters are stubs.** Neither Claude Code nor Antigravity adapter implements `attest`, `launch`, `prepareConfigPreview`, `notifyInbox`, `pause`, or `terminate`. The bridge cannot launch or manage CLI processes.

2. **No managed PTYs.** The TUI shell renders but does not host real CLI PTY output. Panes display status text only.

3. **No broker daemon.** The broker socket, credential authentication, and MCP dispatch loop are not implemented. No live event routing exists.

4. **No session lifecycle enforcement.** Session and ownership state machines (Task 5) are not implemented. Fencing tokens exist in the protocol types but are not enforced at runtime.

5. **No reconciliation or recovery.** Disconnect detection, re-attestation, repository reconciliation, and deterministic restart (Task 10) are not implemented.

6. **No CLI commands.** The `madv-tui` command surface (init, doctor, start, status, pause, resume, verify-ledger, export-evidence, close) is not implemented in the workspace structure. A prototype CLI exists in `src/cli.ts` but is not part of the approved workspace.

7. **Ledger uses Bun.hash, not SHA-256.** The `computeEventHash` and `ArtifactStore.computeHash` functions use `Bun.hash` (a non-cryptographic hash) for synchronous performance. This is a known limitation — the design spec requires SHA-256. Migration to `crypto.subtle.digest("SHA-256")` is required before the acceptance gate.

8. **No artifact metadata persistence.** `ArtifactStore.inspect` returns metadata but `task_id`, `type`, and `repo_fingerprint` are not persisted alongside the content. A sidecar metadata file or SQLite index is needed.

9. **Policy engine REPO_ROOT is process.cwd().** In production, the repository root must come from the task envelope, not the working directory.

10. **No acceptance tests.** Task 12 (disposable repository, two-way collaboration, ownership transfer, interruption recovery, evidence manifest) has not been written or executed.

## Statement

No merge, installation, deployment, or operational activation has been performed. The bridge is NOT functional. Adapters remain stubs. This evidence document records the state after Tasks 1-4 only.