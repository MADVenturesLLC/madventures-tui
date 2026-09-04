# Room Runtime Phase 0 — proof record (madventures-tui)

Repository: `MADVenturesLLC/madventures-tui`
Branch: `builder/room-runtime-phase0`
Base: HEAD `a6dd0bfe1068736b2259f9d555bb307972766335`, tree
`dff04ceeeda796718679c576b34795808360e908` (authorized base; the
checkout was behind origin/main at authorization — an ancestor, not
drift; branched locally from the base per the act §2).
Candidate identities: in the handoff readback accompanying this record.

Scope: the TUI half of the confirmed 20-path Phase 0 manifest — isolated
spike fixtures, phase0 proofs, the Prerequisite-C load spike, and this
proof record. Production packages untouched; `packages/pty-host`
untouched; no package.json/lockfile/tsconfig/CI change.

## Changed paths (this repository — 10 of 20)

| # | Path | Class |
|---|---|---|
| 11 | `test/phase0/spike/phase0-lib.ts` | isolated spike/fixture |
| 12 | `test/phase0/spike/gateway-child.ts` | isolated spike/fixture |
| 13 | `test/phase0/spike/pty-host-child.ts` | isolated spike/fixture |
| 14 | `test/phase0/parent-death.test.ts` | test |
| 15 | `test/phase0/viewer-death.test.ts` | test |
| 16 | `test/phase0/viewer-id.test.ts` | test |
| 17 | `test/phase0/pty-pressure.test.ts` | test |
| 18 | `test/phase0/recovery-mode.test.ts` | test |
| 19 | `test/phase0/spike/prerequisite-c-load.mjs` | isolated spike/fixture |
| 20 | `docs/verification/2026-09-04-room-runtime-phase0.md` | documentation/evidence |

## Test results (2026-09-04, this host, Bun 1.3.14)

- `bun test test/phase0/` — 12 tests, 12 pass, 0 fail (68 expect()).
- Full suite `bun test` — 910 tests, 910 pass, 0 fail (4096 expect()).
- `bunx tsc --noEmit` — clean.

## Parent-death, grandchild reap, control-FD scrub (AT-R4-02/03/36)

Real process tree: test → gateway-child (holds the control-FIFO write end)
→ pty-host-child (opens the read end; spawns the agent detached, session
leader) → agent `/bin/sh -c 'sleep 300 & wait'` with a grandchild.

Observed (fact transcript from the proof run):

- agent PGID == agent PID ≠ host PGID (real session isolation, verified
  via `ps -o pgid=`);
- the agent's fd inventory (lsof audit) contained no control-pipe, lock,
  or ipc.sock descriptor — 0 leak lines (r4.1 §6.1);
- SIGKILL of the gateway closed the kernel-held FIFO write end → the
  pty-host's blocking read returned EOF → M19 ladder ran → the agent
  process group (shell + grandchild) was reaped within bound → the
  pty-host self-reaped (exited) — full transcript in the run;
- no member of the dead tree survived; nothing was adopted.

## Viewer-death survival (AT-R4-01)

Killing a real attached viewer process: occupancy stayed `OCCUPIED`, both
slot processes alive, receipts continued appending before and after the
kill. No occupancy transition fired.

## Gateway-minted viewer_id (AT-R4-35)

Forged capability (P1's viewer_id, wrong nonce): rejected; the claimer
received a NEW minted id; P1's capability still validates. Foreign-occupancy
and expired capabilities rejected. No victim lease/history was taken.

## Recovery-mode rehydration (AT-R4-37)

Admissible `CheckpointCommit` (seq 10, watermark 14, digest verified) +
committed suffix 11..14: the rejoin 0x02 stream is exactly checkpoint +
4 patches (pre-crash canonical grid at N=14); banner `RECONSTRUCTION`,
never `LIVE`. Digest-unverified, ahead-of-watermark, and absent
checkpoints all yield `checkpoint_unavailable` with zero frames — never
invented cells, never a fake screen. No exit receipt is invented for the
dead generation (`ExitUnknown` vocabulary per r4.1 §6.2).

## PTY pressure / two-slot fail-closed (AT-R4-38, r4.4 replacement)

Slot A floods with Gateway holding reads; the bounded raw spool (r4.3 §2)
never drops an unsent record; without a durable covering commit the
outcome is `PrivateTransportExhausted` → Slot A
`ExecutionState=FAILED_CLOSED`. The real Slot B process stayed alive
(verified via kill(pid,0)); occupancy remained `OCCUPIED`; no
`PrivateTransportGap` was emitted for unpersisted bytes; Slot A's banner
is never `LIVE` across the hole; the projector wire carries VT patches
only (raw-PTY frame is a protocol violation by construction);
`checkpoint_seq ≤ durable_committed_seq` held on the exhausted path.

## Prerequisite C — Node 22 inventory/load (r4 §9 stop-gate)

Proof runtime: nvm Node **v22.23.2**
(`/Users/michaeldaley/.nvm/versions/node/v22.23.2/bin/node`), the
Founder-confirmed proof target (boundary 2). Host default is v26.x — NOT
used for this proof.

Recorded verdict (2026-09-04, this host), from the spike:

- `bun_detected: false` in the Node process (recorded, not assumed).
- REAL-ENTRY LOAD, ledger (`packages/ledger/src/index.ts`): FAILED —
  failure class `resolution` (Node's ESM resolver cannot resolve the
  workspace's Bun-first module graph: extensionless relative imports,
  main-less workspace symlinks, tsconfig path aliases). The load did NOT
  reach the ledger's `bun:sqlite` import through the workspace graph.
- REAL-ENTRY LOAD, broker (`packages/broker/src/index.ts`): FAILED —
  failure class `resolution` (same boundary, first hit at
  `./credentials`).
- DIRECT `bun:sqlite` PROBE under Node 22: **NOT loadable** — Node
  cannot import `bun:sqlite` (bun:sqlite is a Bun-only module). This is
  the definitive storage-engine answer, independent of resolution
  strategy.
- SOCKET SIDE EFFECTS on load: none (no `broker.sock`, no `ipc.sock`
  created/bound as a side effect of the load attempts).

Honest reading (per r4 §9 Prerequisite C): the broker+ledger subset
**cannot load under Node 22 as-is**. Two independent causes are recorded:
(1) a module-resolution boundary (fixable without touching product code:
extensionless imports and workspace resolution are resolvable by a
Node-compatible entry strategy — an option for the Founder, not adopted
here), and (2) the ledger's hard dependency on `bun:sqlite`, which Node
cannot load at all (the substantive Prerequisite C failure). Per r4 §9:
on fail, STOP before Phase 1 and return decision-ready options —
(1) isolate a runtime-neutral broker/ledger core inside the Node
Gateway; (2) supervise a socketless Bun worker with framed private
transport; (3) another evidence-supported minimal boundary. r4
recommends (1) if the isolation is small, (2) if ledger/broker are
inseparable from Bun. **No option is adopted by this tranche.**

## Filesystem-enforcement boundary (item 18, BR-side statement cross-ref)

The BR-side proof records the statement; the TUI spike honors the same
boundary: no fixture claims sandboxing, and the pty-host fixture's lease
vocabulary never asserts syscall containment.

## Environment-gated coverage (item 19)

- The Node 22 proof runtime requires nvm Node 22 on the host; the spike
  records an honest skip if absent (not exercised here — it ran).
- macOS-specific facts (lsof, FIFO semantics, ps lstart) ran on this
  darwin host; TUI CI's macOS arm64 lane will exercise the same tests.

## Residuals (item 20)

- Prerequisite C FAILED as measured; routes to the Founder with the r4
  §9 options (above). Phase 1 is not begun (act §13; r4 §9 stop-gate).
- The M19 ladder's production 3 s SIGTERM wait is a named measurement
  input; the fixture uses a shorter bound with the ladder's shape intact.
- The spike uses Node 22's `--experimental-strip-types` flag to load the
  TS entry sources — a runtime flag on the proof binary only, inside the
  Founder's confirmed boundary 2 (no dependency, engine, package,
  lockfile, or toolchain-file change).

## No-prohibited-content and untracked-material confirmations (items 21–22)

The diff contains only the 10 confirmed TUI paths. No prohibited Phase 0
capability (act §9 list) appears. The pre-existing untracked material
(`.claude-backups/`, `.claude/`, `.mimosa/`, `IMACTASK39.txt`,
`MACBOOKTASK39.txt`, `iMacTest2.txt`) was never staged, modified,
depended upon, or cited as evidence; all proof artifacts were created
under `os.tmpdir()` and removed.