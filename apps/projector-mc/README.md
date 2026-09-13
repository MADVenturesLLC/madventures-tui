# @mad/projector-mc — Founder Mission Control (projector)

> Thin-client laptop projector for Founder Mission Control. Premium,
> interactive, and honest: every pixel binds to a build-memory status or a
> single-verdict record. **Decorative "fake green" is a ship-blocker.**
>
> **APP — NOT PHASE_0 — NOT ROOM RUNTIME — NOT GATEWAY — NO MERGE AUTHORITY.**
> Claim vocabulary: `PROJECTOR_FIXTURE`, `BUILD_MEMORY_V0`, `SINGLE_VERDICT_V0`.

## Run it (one command)

```bash
bun run projector        # from the repo root → http://localhost:5180
```

Vite binds all interfaces, so a laptop on the same network can point at the
host (`http://<host-ip>:5180`) as a thin client. Production-static variant:

```bash
bun run projector:build  # → apps/projector-mc/dist, serve with any static server
```

Fixture mode is the default (`MADV_PROJECTOR_FIXTURE=1` or unset): the app
renders the sealed `fixtures/demo.json` demo. Setting `MADV_PROJECTOR_FIXTURE=0`
switches to **live bind** mode (below).

## Live bind (v0.1) — real evidence, no invented green

Live mode reads the local snapshot `apps/projector-mc/public/live-state.json`
(gitignored), written by the bind script from the REAL `@mad/build-memory`
store. The browser never reads the store directly and never makes a network
call — the snapshot is the only live data path.

```bash
# first bind on a fresh store (one CLI record creates it):
bun packages/build-memory/src/cli.ts record "@mad/build-memory" \
  --evidence "argus_packet:/abs/path/to/argus-packet.md:<sha256-of-packet>"

# bind the spine subjects and write the snapshot:
MADV_ARGUS_PACKET=/abs/path/to/argus-packet.md \
MADV_ARGUS_SHA256=<sha256-of-packet> \
bun run projector:bind-demo

# later: re-snapshot only (after a head move), never fabricating:
bun run projector:bind-demo --refresh
```

Rules the bind path enforces:

- A missing packet, missing sha, or **sha mismatch exits 1** — nothing is
  recorded, nothing is fabricated.
- Statuses shown in live mode are computed by `evaluateMemoryStatus`
  (build-memory) at snapshot time and displayed verbatim, stamped with
  `generated_at` and the evaluated HEAD.
- Verdicts come only from a **local verdicts file** (`.mad/projector/verdicts.json`),
  and only records bound to the **current HEAD** are displayed — a verdict at
  an older head is stale evidence and renders as `NO VERDICT` with the memory
  row telling the truth.
- `makeVerdict`'s factory gate still governs anything positive: a positive
  verdict on non-VALID memory is refused at the factory and, if a file ever
  carried one, the UI renders `GATE_BREACH` — never a clean SHIP.
- An empty store or a missing snapshot renders the **honest empty state**
  ("No bound memory — run bind or use fixture"), never a fake ledger row.

Claim vocabulary for live mode: `PROJECTOR_V0_1`, `BUILD_MEMORY_BIND`.
Not evidence of: `PHASE_0`, `OCCUPANCY_PROOF`, `GATEWAY_HONESTY`,
`ROOM_RUNTIME`, `PRODUCTION_MERGE_AUTHORITY`.

## Honesty contract (enforced, not aspirational)

- **Status color only from the tone maps.** Verdict chips use
  `VERDICT_TONE` from `@mad/single-verdict`; memory chips use `MEMORY_TONE`
  (`VALID=emerald, STALE=amber, UNKNOWN=zinc, INVALIDATED=rose`). No color
  exists without one of those objects behind it.
- **Memory statuses are computed, never stored display values.** The UI calls
  `evaluateMemoryStatus` against the simulated current head in the fixture.
- **Verdicts pass `assertDisplayable` before anything renders.** A fixture
  verdict that cannot parse produces an error state, not a guess.
- **The fixture is sealed.** `fixtures/demo.json` carries a sha256 seal over
  its memory rows (via `sealFixture`); any hand-edit after sealing fails the
  load. Regenerate — never hand-edit:
  `bun apps/projector-mc/fixtures/generate-demo.ts`.
- **GATE_BREACH is surfaced, never hidden.** If a positive verdict would
  display while memory is not VALID, the render model marks it and the UI
  shows a rose `GATE_BREACH` chip. The committed fixture cannot trigger this
  (all verdicts were produced through `makeVerdict`), and a regression test
  pins it.
- **Founder-act stubs emit typed intent events only** — JSON to the console
  and the session intent log. No GitHub, no merge, no Gateway.

## Interaction

`j/k` or `↑/↓` move between subjects · `Enter` opens the evidence drawer ·
`Esc` closes · `f` cycles the verdict filter · `c` copies the SHA · `?` help.
Buttons are ≥44px; motion is 160ms opacity/translate only.

## Stack choice (documented per commission)

No web surface existed in this monorepo (MadBridge TUI is OpenTUI). The
commission prefers a small Vite/React fullscreen app for the premium
projector, so this app adds `vite` + `react-dom` — the only new runtime
dependencies — with hand-rolled CSS tokens (no Tailwind, no component
library). The app is excluded from the root tsconfig (different JSX runtime
and DOM lib) and typechecks via `bunx tsc --noEmit -p apps/projector-mc`,
which the root `verify` script runs.

## Layout

```text
fixtures/demo.json            sealed demo dataset (generated, do not hand-edit)
fixtures/generate-demo.ts     regenerates it through the real factories
src/lib/render-model.ts       pure model: statuses, gate check, filters (bun-tested)
src/lib/fixture.ts            load + verify sealed fixture → render model
src/lib/intent.ts             typed founder-intent events (console only)
src/components/               RoomRail, HeroVerdict, EvidenceDrawer, StatusBar, HelpOverlay
src/tokens.css                design tokens: dark glass, 8pt grid, tone maps
test/render-model.test.ts     honesty regressions incl. SHIP-with-STALE guard
```
