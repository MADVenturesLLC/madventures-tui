# Phase 3B — Live TUI Integration and Certification: Implementation Plan

Status: **DRAFT — awaiting Founder approval of BOTH this plan and the design
spec** (`docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md`).
Per the 3A design §8, no implementation is authorized by the spec alone, and
nothing in this plan executes before the Founder approves both documents.

Obeys: the 3B design (same date), the 3A design (§4.2, §4.3, §6.9, §7), and
the §6.9 gate-removal evidence list. Scope of record = the §6.9 list; this
plan adds no scope.

## Plan provenance and verified baseline facts

- Baseline: `main` at `ea079827a585f8fd6d628f5f65faaea03af6df99` plus #86
  (`a0cbecbefe31a470008acf4e22dec49f750e3261`); suite 1385 pass / 0 fail
  across 84 files; `bunx tsc --noEmit` clean.
- The TUI console (seats, ModelBar/ModelPicker, Poseidon HUD, decision
  surfaces) is merged and live in fixture mode.
- The runtime foundation is Phase 3A-complete behind the `start` gate
  (`apps/madbridge/src/commands/start.ts` exits 78
  `live_runtime_not_certified`).
- `BrokerClient` boundary verified at `packages/broker/src/client.ts`
  (snapshot/output/request/publish/close; closed command and error sets).

### Source rebind (reviewed 2026-09-21)

The following sources were checked at
`a0cbecbefe31a470008acf4e22dec49f750e3261`, a direct descendant of
`ea079827a585f8fd6d628f5f65faaea03af6df99`. They remain in their owning
locations; this plan references them and does not duplicate code or historical
evidence into the plan directory.

| Source | Bound location | Rebound finding |
| --- | --- | --- |
| Phase 3A design | `docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md` | Governs the Phase 3B boundary and §6.9 evidence list. |
| Broker client contract | `packages/broker/src/client.ts` | Defines the closed snapshot/output/request/publish/close boundary. |
| TUI projection type | `apps/madbridge/src/tui/types.ts` | Is a distinct presentation projection; it is not the broker contract. |
| Production start gate | `apps/madbridge/src/commands/start.ts` | Returns exit 78 with `live_runtime_not_certified`; only M6 may change it. |
| Historical dual-host records | `docs/verification/2026-08-22-m17-step8-dualhost-imac.md` and `docs/verification/2026-08-22-m17-step8-dualhost-macbook.md` | M17 evidence only, not the required 3A M26 reports; Track 0 remains outstanding. |
| FounderOS surface registry | External host source `FounderOS/04-agents/execution-surface-registry.md` (SHA-256 `4054e58dd0f5e053436cfacfa09ed779a668a822cfe435f4a4038cd16417b060`) | ZCode CLI is not registered; that registration remains a Founder item. |

New Phase 3B evidence belongs in `docs/verification/` as sanitized,
human-readable packets. Raw run artifacts remain external and are cited by run
identifier; they are not copied into this repository.

## 0A. Execution base semantics

All work happens on Founder-authorized branches off updated `origin/main`.
The Mimosa gate blocks agent-side commits/pushes: the Founder lands each
slice from his terminal (established working pattern). CI must be green per
slice before the next slice begins.

## 0B. Founder ratification (2026-09-19, verbatim) and plan consequences

> "For Phase 3B: authorize the written design spec and implementation plan
> only, drafted by the GLM build, no wiring and no gate edits. The plan must
> name exact base SHAs per slice, include the M26 dual-host reports as the
> first evidence track, define the suite-count floor and where it's proven,
> carry the §7.7/§7.8 qualification record for GLM, and end at the exact-SHA
> Tier-2 verdict plus my authorization. Present it for my approval before any
> execution."

Consequences integrated below: Evidence Track 0 (§2A) executes 3A M26 (the
dual-host Phase 3A reports do not exist yet — verified); per-slice exact base
SHAs (§2A table); suite-count floor and proof location (§2B); the §7.7/§7.8
qualification record for GLM (§2C); terminal conditions restated in §3.

## 1. Global constraints

1. File scope per milestone is exactly the disposition map in §2; anything outside
   requires a Founder amendment to this plan.
2. The `start` placeholder is touched ONLY in milestone M6.
3. No new dependency without a ratified exception in this plan.
4. Every slice lands with tests green and its evidence recorded as a sanitized
   human-readable packet committed under `docs/verification/` (3A §5.5: the
   runtime never writes into the governed repository; source transcripts are
   retained as submitted evidence, not committed). Raw live-run artifacts stay
   outside the governed repository and are cited by run id.
5. Honest-status doctrine applies to every new surface: no invented state.

## 2. Existing-state disposition map

- Preserved untouched: broker authority modules (session-machine,
  ownership-machine, fencing, command-legality, ledger, storage), adapters,
  the 3A harnesses, the entire Phase 3A test corpus.
- Modified: `apps/madbridge/src/tui/main.tsx` (composition, M1),
  `apps/madbridge/src/tui/App.tsx` (client wiring props, M2–M4),
  `apps/madbridge/src/commands/start.ts` (M6 ONLY),
  `apps/madbridge/src/tui/keyboard-router.ts` (NONE — reused as-is; its PTY
  emit becomes the `pty_input` source),
  `apps/madbridge/src/tui/theme.ts` / TUI components (NONE expected).
- Created: `apps/madbridge/src/tui/live/` (composition + client
  adapter + projection mapper + retention buffer), evidence scripts under
  `scripts/phase3b/`, architecture tests under `test/phase3b/`, plus the
  Track 0 artifacts named in 3A plan M26 Task 58.
- Removed: nothing.

## 2A. Milestone map (base SHAs and evidence tracks)

| Slice | Deliverable | Exact base SHA | Evidence track |
| --- | --- | --- | --- |
| T0 | Execute 3A M26 Tasks 58–59: both checksummed dual-host Phase 3A reports + merge-gate verification (gate still closed) | `a0cbecbefe31a470008acf4e22dec49f750e3261` | Track 0 (first) |
| M1 | Live composition and health barrier | merge commit of T0's verified SHA (pinned at T0 close) | Track 1 |
| M2 | Snapshot projection | merge commit of M1 (pinned at M1 close) | Track 2 |
| M3 | Ordered output frames + input ownership | merge commit of M2 (pinned at M2 close) | Track 2 (continued) |
| M4 | Approvals + session controls | merge commit of M3 (pinned at M3 close) | Track 2 (continued) |
| M5 | Negative controls + single-host certification evidence | merge commit of M4 (pinned at M4 close) | Track 3 |
| M6 | Gate-removal certification commit | merge commit of M5 (pinned at M5 close) | Track 4 (the §6.9 citation commit) |
| M7 | Dual-host verification, exact-SHA Tier-2 verdict, Founder merge | certification commit SHA | Track 5 |

Rule: a slice's base SHA is pinned in its evidence header BEFORE work begins;
the table's "pinned at close" entries are filled with the exact landed SHA at
the prior slice's merge, and never re-based silently. Any re-base is a
Founder-approved amendment to this plan.

## 2B. Suite-count floor and where it is proven

- Floor at plan approval: **≥1385 pass / 0 fail, across ≥84 files** — the
  full, unfiltered root `bun test` (the 3A plan's Task 1 no-silent-skip
  guard applies).
- The floor ratchets: each slice's own tests raise it; it never lowers. A
  slice that lands with fewer passing tests than the floor does not land.
- Proven in TWO places per slice: (1) the Verify workflow (ubuntu AND
  macOS) green on the slice PR; (2) the local full-suite tail line
  (`Ran <n> tests across <m> files`) recorded in the slice's evidence
  header.
- Track 0 double-duty: 3A M26 Task 58 requires "both reports record
  complete suite counts, not filtered counts" — the same floor evidence
  feeds both hosts' reports.

## 2C. GLM qualification record (§7.7/§7.8 format)

Per §7.7, qualification is NOT self-asserted by the builder. This record is
carried in the plan and filled/finalized only by the Founder. §7.7 gates
outstanding at drafting time are listed after the record.

```text
Builder qualification: <pending — ruled only after Track 0 closes 3A M26 and the 3B slices complete>
Phase evaluated: 3A → 3B transition
Builder: GLM (ZCode agent build; commission session GLM-20260918-FOUNDER-TUI-SEATS)
Exact resolved model ID: account:zai-start-plan/GLM-5.3-Flash (as reported by the execution session)
Execution surface and version: ZCode CLI (agent surface — NOT in
  FounderOS/04-agents/execution-surface-registry.md; registration is a
  Founder item)
Evaluation date: <ISO-8601, set at qualification>
Candidate SHA: <pinned per slice; final = the certification commit>
Correction rounds by milestone: <running log; ≤2 rounds per milestone per §7.7>
Material deviations: <none or exact Founder-approved deviations>
Independent review: Gemini Antigravity, reviewing the exact candidate SHA
  (§7.7 requirement)
Founder ruling: <qualification decision and date>
```

Open §7.7 gates before any qualification ruling:

1. 3A M26 dual-host reports (Track 0) — outstanding at drafting time.
2. All findings and warnings carry explicit dispositions.
3. Gemini Antigravity review of the exact candidate SHA.
4. Both Founder hosts pass the same reviewed SHA.
5. The Founder explicitly qualifies the builder.

## 3. Milestone sequence

### M1 — Live composition and health barrier (no TUI change)

- Compose the runtime foundation in one foreground process through the
  existing factory pieces; wire the existing health barrier to a
  `present` callback.
- Fail-closed: barrier failure exits nonzero naming the component.
- Evidence: startup transcript (healthy), barrier-failure transcript
  (named component, nonzero).

### M2 — Snapshot projection

- `clientSnapshotToProjection` mapper + pinned test table; `App` receives
  live snapshots via the existing `subscribe` prop; pane headers, status
  bar, decision visibility all driven by real state.
- Evidence: recorded snapshot stream → rendered frames (scripted).

### M3 — Ordered output frames and input ownership

- Per-execution `output()` → bounded pane buffers (ring; overflow-oldest,
  observable); focused-surface keyboard → `pty_input`; resize →
  `pty_resize`. Fencing results render as honest status words.
- Evidence: ordered-frame transcript; input round-trip transcript
  (typed bytes visible in the execution stream).

### M4 — Approvals and session controls

- Alt+Y/N → `approval_resolve` (unchanged guard); ledger entries appear in
  the Event Log pane; session controls (`pause/resume/close`) as confirmed
  operator verbs rendering `session_*` results honestly.
- Evidence: approval resolve transcript (accept + reject), pause/resume/
  close transcripts.

### M5 — Negative controls and single-host certification evidence

- The §4 negative-control suite from the spec, scripted, with packets.
- Full-dress single-host run: start → session → decisions → clean close,
  evidence recorded per global constraint 4 (sanitized packet under
  `docs/verification/`; raw artifacts external).

### M6 — Gate removal (certification commit)

- Replace the `start` placeholder with certified composition; the same
  commit asserts the 3A gate deliberately changed (architecture test).
- The commit message cites the complete §6.9 set with artifact paths.

### M7 — Dual-host verification, exact-SHA Tier-2 verdict, Founder authorization and merge

- M5 evidence re-run on the second Founder Mac; both reports cited (both
  hosts at the identical certification-commit SHA, per the §7.7 rule).
- Exact-SHA Tier-2 verdict on the certification commit.
- Founder authorization, then merge. These two terminal conditions are the
  plan's end state per the 2026-09-19 Founder ratification; nothing follows
  them inside Phase 3B.

## 4. Tasks

Each milestone decomposes into tasks in execution order, each with its own
acceptance test and evidence artifact. Task-level detail is written at slice
start (per the 3A planning convention) so the plan reflects the code that
actually exists, not predictions.

## 5. Open items requiring Founder ratification during execution

1. The eligible pair for the live-pair attestation.
2. The bounded-retention cap constant (line/byte budget).
3. The second-Mac verification window.
4. Any dependency or file outside the §2 file map.

## 6. Explicitly not authorized by approval of this plan

- Execution of any milestone. Each milestone starts only on a Founder "go"
  for that slice (the established per-slice pattern), and M6 executes only
  after M1–M5 evidence is complete and cited.
