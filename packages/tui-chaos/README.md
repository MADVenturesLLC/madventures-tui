# tui-chaos — Headless TUI Acceptance & Chaos Explorer

> **TUI_ACCEPTANCE — NOT PHASE_0 — NOT OCCUPANCY_PROOF**

`tui-chaos` is automated TERMINAL QA for the MadBridge Founder TUI. It spawns
the **real TUI entrypoint** (`apps/madbridge/src/tui/main.tsx --fixture`)
inside a headless PTY, parses the raw ANSI stream into a cell grid, and
asserts governance + layout invariants against what the TUI actually renders.

It is **not** a Gateway, not Phase 0, not occupancy proof, and not a Room
Runtime. Every evidence packet it emits carries the label above. The harness
parents the TUI under test only — it parents no agent processes.

## One command (clean machine)

```bash
bun install --frozen-lockfile   # node-pty compiles from source on Linux (no linux prebuilds)
bun run test:tui-chaos          # governance + resize + chaos + flood -> REP-v1-tui packet
```

Exit code is nonzero if any invariant fails. Artifacts land in
`testdata/tui-chaos/runs/<run_id>/` (report.json, per-scenario grids,
asciinema `.cast` recordings).

## Start mode — how the TUI runs WITHOUT production broker/Gateway

The harness **always** drives the TUI's fixture path. It never stands up a
broker, never creates `broker.sock`, and never starts a daemon:

```bash
bun packages/tui-chaos/src/cli.ts start          # attach to the fixture TUI, Ctrl-C to exit
bun packages/tui-chaos/src/cli.ts start --stream # same, with the colorized fixture stream
```

- The TUI is spawned as `bun apps/madbridge/src/tui/main.tsx --fixture`.
- The harness sets `MADV_TUI_FIXTURE=1`, which enables a **mock approval
  queue** (two pending approvals) inside the TUI's existing fixture snapshot.
- `MADV_TUI_FIXTURE_STREAM=1` enables an **in-process colorized event
  stream** used by the `ansi_flood` scenario. In-process fixture data only —
  not a Gateway feed.
- If a live `madv-tui start` would return `no_broker_available`, that is
  precisely why the fixture path exists. The harness does not paper over it
  by standing up broker IPC.

Both seams live in `apps/madbridge/src/tui/main.tsx` (the smallest possible
diff), are dead unless the env gate is set, and change nothing for normal
users or the existing `bun test` suite.

## Commands

```
bun packages/tui-chaos/src/cli.ts start    [--cols N --rows N] [--stream] [--repo PATH]
bun packages/tui-chaos/src/cli.ts run      [--scenarios a,b,...] [--out DIR] [--no-asciinema]
                                           [--update-goldens] [--json] [--cols N --rows N]
bun packages/tui-chaos/src/cli.ts report   [--packet PATH | --latest]
```

## Scenarios

| Scenario | What it proves |
| --- | --- |
| `governance_focus` | Mock approval auto-arms the Founder decision surface; **alt+y is inert on Claude focus** (routeKeyEvent → validateApprovalResolution rejects on focus); governance focus arms it; alt+y accepts approval 1, the queue rebinds to approval 2; alt+n rejects it; app stays responsive. |
| `layout_resize` | PTY cols 120 → 70 → 120: status bar re-formats (wide ↔ compact), tab-row layout appears below 80 cols, no crash, no unhandled exception, focus switch still repaints. Before/after grids + hashes captured. |
| `chaos_keys` | ~1000 rapid interleaved key events (focus toggles, printable chars, guarded quit chord). The UI must still repaint afterward — no deadlock, no crash. |
| `ansi_flood` | Sustained colorized output into the fixture event buffer (in-process stream, NOT a live Gateway). The Events pane must paint and focus must still repaint while the flood continues; the projected ledger sequence must advance. |

## Evidence packet (REP-v1-tui)

`report.json`:

```json
{
  "schema": "REP-v1-tui",
  "label": "TUI_ACCEPTANCE — NOT PHASE_0 — NOT OCCUPANCY_PROOF",
  "run_id": "tui-chaos-20260906042327-8cf41e",
  "git_sha": "<full 40-char HEAD SHA>",
  "scenarios": [ { "name": "...", "pass": true, "invariants": [ ... ], "final_grid_sha256": "<64 hex>" } ],
  "summary": { "total": 4, "passed": 4, "failed": 0, "exit_ok": true },
  "artifacts": { "report": "...", "asciinema": "..." }
}
```

Field set is a superset of a Lab REP-v1 core (run_id, git_sha, scenarios,
pass/fail, artifact paths) so it maps losslessly if a Lab REP-v1 consumer
appears. Label enum value: `TUI_ACCEPTANCE`.

## Golden grid fixtures

`testdata/tui-chaos/goldens/{governance_focus,layout_resize}.grid.txt` pin the
exact final rendered grid of each scenario. Comparison is automatic on every
run; a mismatch fails the scenario with a row-level diff. Update deliberately:

```bash
bun packages/tui-chaos/src/cli.ts run --scenarios governance_focus,layout_resize --update-goldens
```

Grid hashes are deterministic across runs (verified: identical sha256 on
repeated runs of the same HEAD).

## Example: failing, then passing

With a deliberately corrupted golden row, the harness fails deterministically
and points at the differing row:

```
[tui-chaos] ✘ FAIL governance_focus in 1164ms — failing invariants: golden-grid-governance_focus
    [golden-grid-governance_focus] grid differs from golden .../goldens/governance_focus.grid.txt
row 2:
  golden: "│ Event Log (hash-chained LEDGER)   ... │"
  actual: "│ Event Log (hash-chained ledger)   ... │"
summary: 0/1 scenarios passed
HARNESS_EXIT=1
```

After restoring the golden (the normal case on every commit):

```
[tui-chaos] ✔ PASS governance_focus in 1152ms
summary: 1/1 scenarios passed
HARNESS_EXIT=0
```

An invariant-level failure looks the same: the failing invariant id, its
detail, and the last captured grid are in the run's artifacts for debugging.

## CI

`.github/workflows/tui-chaos.yml` runs `bun run test:tui-chaos` on
`ubuntu-24.04` and `macos-14` and uploads the evidence packet on every PR to
`main`. Nonzero exit fails the job.

## Architecture notes

- **Screen model** — `src/screen.ts` uses the public `@xterm/headless`
  Terminal as the ANSI parser/buffer (no private OpenTUI hacks). It exposes
  the text grid, per-row color signatures, cursor position, and a stable
  grid sha256. No `@opentui/react` test seams were needed: the TUI's own
  `--fixture` mode plus the two env gates provide all required data, so
  zero seams were added to render internals.
- **PTY transport** — node-pty's native addon does not deliver data/exit
  events under the Bun runtime (verified: spawn succeeds, events never
  fire). The harness therefore runs a small Node subprocess
  (`src/pty/bridge.mjs`) that hosts node-pty and speaks JSON lines over
  stdio. It is not a daemon: it exits when the harness's stdin closes and
  fail-closed kills the TUI child. No setsid/PGID manipulation, no sockets.
- **Determinism** — the child env is an explicit allowlist (no ambient env
  inheritance, so no secrets leak into the run), fixture timestamps are
  fixed strings, and stream hashes are deterministic counters.
- **Known cosmetic finding** — when the terminal shrinks, the OpenTUI
  renderer does not clear to end-of-line, so stale glyphs can remain right
  of the new width until the next full repaint. Recorded here as an
  observation; the resize scenario asserts responsiveness and absence of
  crashes, not pixel-perfect clears.

## Requirements

- Bun 1.3.x (harness + TUI runtime)
- Node.js ≥ 20 on PATH (PTY bridge only — node-pty does not deliver events
  under Bun; the harness errors with this message if `node` is missing)
- Linux: python3 + make + g++ for the node-pty source build (no linux
  prebuilds ship in node-pty 1.1.0)
