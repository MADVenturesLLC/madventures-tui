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

Fixture mode is the default (`MADV_PROJECTOR_FIXTURE=1` or unset). Setting
`MADV_PROJECTOR_FIXTURE=0` shows an intentional "live mode not available in
v0" state — there is no live backend, and the app does not pretend otherwise.

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
