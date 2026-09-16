# HANDOFF — Projector RoomStatus surface v0 (Superlogical→MAD Session Operability v0, Lane 3)

- **Act:** FOUNDER ACT — Commission Superlogical→MAD Session Operability v0 — Lane 3 (2026-09-15; turns the parent act's default-SKIP Lane 3 ON)
- **Repo:** MADVenturesLLC/madventures-tui
- **Branch:** `build/projector-room-status-v0`
- **Act-start `origin/main`:** `2dea251a332214977175fc2f6c323aab2a451569`
- **Source role:** `builder` (founder-directed task assignment, this act)
- **Receiving role:** `independent-reviewer` (review), then Founder (merge = separate Founder act naming the exact head SHA)
- **Status:** implement + commit + push on the named branch only. No merge, no live bind.

## Lane 1 dependency — exact SHAs

- **Lane 1 (`build/room-status-ir-v0`) is PUSHED**: head `81d1203e6c0c5382bcf2773d61eed5f0dde4f8ee` (verified via `git ls-remote origin` of founder-os-build-room during this act). Lane 2 head for the record: `cc004d7c640aa8c94f03e46e6fbd557677749b14`.
- **Consumption decision:** despite Lane 1 being pushed, it is NOT importable from the tui monorepo — `packages/room-status` lives in a sibling repository, and crossing repos requires a packaging choice the act itself routes through `FOUNDER_DECISION_REQUIRED` (workspace member vs published tarball vs git dependency vs stay fixture-only). The act pre-authorizes the fallback used here: **fixture-only vendored adapter**, live bind marked as the follow-up decision (see Open decision).

## What shipped

The projector Mission Control surface (`apps/projector-mc`, Vite + React 19, the repo's existing projector path) renders MAD RoomStatus only — every widget is bound to a validated RoomStatus record:

1. **Vendored IR mirror** — `apps/projector-mc/src/lib/room-status.ts`: closed vocabulary copied from Lane 1 (provenance in the file header: source branch + full 40-char head SHA), `parseRoomStatus` mirroring Lane 1's non-strict invariants (closed enums; block_reason only with blocked; closed room never active), plus the Lane 3 honesty render model `renderRoomStatus` and the tone maps (`PHASE_TONE`, `OCCUPANCY_TONE`).
2. **Drift pin** — `apps/projector-mc/fixtures/room-status-vocabulary.pin.json`: the canonical arrays + provenance, captured at the Lane 1 head above. A test fails if the vendored arrays and the pin disagree; a conscious vocabulary update must re-pin from a new Lane 1 head. (True cross-repo drift detection is not possible in tui CI — documented honestly.)
3. **Fixture replay** — `apps/projector-mc/fixtures/room-status-fixture.json` (schema `mad.roomstatus-fixture/v0`, provenance `mode: fixture-only`) + `apps/projector-mc/src/lib/room-status-fixture.ts` loader: every scenario is validated through the parser and pre-rendered; a non-fixture roomId or a tampered schema fails the load. Eight scenarios cover the honest spectrum, including one **deliberately illegal** record (completed with no evidence_refs).
4. **Panel** — `apps/projector-mc/src/components/RoomStatusPanel.tsx`: `fixture replay` banner chip (never claims a live Gateway), roomId, occupancy chip, phase chip, `block: <code>` chip only when blocked, evidence chips (short SHA = first 10 chars; full value in the tooltip), and a rose dashed `IR_FAULT` banner when the record was illegal — the displayed phase is the DOWNGRADED phase (`verifying (downgraded)`), so success is never painted.
5. **Wiring** — `App.tsx` (fixture-mode load, `r` key cycles scenarios, error state renders the rejection instead of a guess) and `HelpOverlay.tsx` (key row + honesty note extended). CSS appended to `tokens.css` under the existing discipline: color only via the declared tone maps — no new ad-hoc color, no new dependencies.

## Evolved-from-Superlogical vs invented

| Mechanism | Provenance |
| --- | --- |
| Multi-participant session visibility rendered for an operator | **Evolved from Superlogical** durable shared sessions; here it renders MAD RoomStatus facts, not Superlogical state |
| Tone-mapped status chips (zinc/amber/rose/violet/emerald via maps) | **In-repo convention** (VERDICT_TONE / MEMORY_TONE discipline) extended with PHASE_TONE / OCCUPANCY_TONE |
| completed-requires-evidence with downgrade+fault display | **Invented (MAD, Lane 3)** — mirrors Lane 1's strict rule at the display layer |
| Fixture player with FIXTURE banner and synthetic-only room ids | **Invented (MAD, Lane 3)** — follows the app's existing sealed-fixture-first pattern |
| Vendored mirror + drift pin | **Invented (MAD, Lane 3)** — forced by the cross-repo packaging boundary, stated openly |

## Files changed (exact)

- `apps/projector-mc/src/lib/room-status.ts` — NEW (vendored IR + render model)
- `apps/projector-mc/src/lib/room-status-fixture.ts` — NEW (loader)
- `apps/projector-mc/fixtures/room-status-vocabulary.pin.json` — NEW (drift pin)
- `apps/projector-mc/fixtures/room-status-fixture.json` — NEW (8 scenarios, synthetic)
- `apps/projector-mc/src/components/RoomStatusPanel.tsx` — NEW (panel)
- `apps/projector-mc/src/App.tsx` — modified (fixture load, `r` key, panel render, error state)
- `apps/projector-mc/src/components/HelpOverlay.tsx` — modified (key row + honesty note)
- `apps/projector-mc/src/tokens.css` — modified (`.roomstatus-*` styles appended)
- `apps/projector-mc/test/room-status.test.ts` — NEW (19 tests)
- `HANDOFF-projector-room-status-v0-20260915.md` — NEW (this file; placed at repo root per this repo's handoff convention — there is no `docs/planning/` tree here)

## Verification

- `bunx tsc --noEmit -p apps/projector-mc` clean; root `bunx tsc --noEmit` clean
- Focused: `bun test apps/projector-mc/test/room-status.test.ts` → **19/19 pass** (vocabulary pin, parser rejections, no-fake-green contract incl. the illegal-completed downgrade regression, fixture hygiene)
- Full gate: `bun run verify` → **1315 pass, 0 fail** (both tsconfigs + entire bun suite; measured live, not cited from docs)
- Secret scan (CONTRIBUTING pattern) over the branch diff: clean (only match is the literal word "tokens" in the css filename header — not a credential); `git diff --check` clean
- **Manual dogfood** (dev server on :5180, exercised via browser): scenario 4/8 `blocked-completion-gap` renders rose `blocked` + `block: completion_gap` code + evidence chips (path + short SHA `81d1203e6c`); scenario 7/8 `completed-no-evidence-FAULT` renders amber `verifying (downgraded)` + the rose IR_FAULT banner — no green on any illegal record; tests pin that `completed-evidenced` is the only emerald scenario in the deck. Screenshots kept as evidence at `~/MADVenturesOPs/lane3-blocked-scenario.png` and `~/MADVenturesOPs/lane3-fault-scenario.png` (outside the repo; not committed).

## Blast radius

Additive and confined to `apps/projector-mc` (the projector's own app tree). No changes to `apps/madbridge/**` (the Phase 3A-restricted TUI path is untouched), no broker/policy/protocol/ledger package changes (architecture-boundaries test stays green), no new dependencies, no lockfile change, no daemon/socket/endpoint of any kind. The panel renders only in fixture mode and is labeled as replay everywhere it appears.

## Open decision (FOUNDER_DECISION_REQUIRED — live IR bind)

The act marks live binding as the follow-up decision. Options for consuming the real Lane 1 IR when the Founder wants it:

1. **Workspace package / vendored sync** — move or mirror `packages/room-status` into this monorepo; drift handled by the pin (current fallback, generalized).
2. **Published tarball** — publish the IR from founder-os-build-room to a private registry; tui depends on it like any package (needs registry + provenance decisions).
3. **Git dependency** — bun supports git deps; ties the lockfile to a moving branch (pin by SHA) — simplest true-import path without a registry.
4. **Stay fixture-only** — current state; the projector displays replayed truth only.

Recommendation when this is taken up: (3) pinned by exact SHA for a v0.1 live-bind act, with the vendored mirror deleted in the same change; the render model (`renderRoomStatus` + tone maps) is the part designed to survive any option.

## Explicitly confirmed out of scope (untouched)

Gateway/IPC implementation in the TUI; Lane 2 `ipc.ts`; live share/unauthenticated multiplayer; joy animations implying health; merge to main; Phase 0/2; production/live occupancy; second daemon; Lane D interceptor; any status not backed by the RoomStatus IR.

## Next action

`independent-reviewer` review of `build/projector-room-status-v0` head; merge only via a separate Founder act naming the exact head SHA.

## Attribution

```text
Role-Id: builder
Actor-Id: GLM-20260915-SUPERLOGICAL-OP-V0
Execution-Surface: claude-code
```
