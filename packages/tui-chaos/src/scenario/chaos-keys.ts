// packages/tui-chaos/src/scenario/chaos-keys.ts
// chaos_keys scenario — rapid key sequences while switching focus.
//
// Storm the TUI with interleaved focus-toggle alt keys, printable chars that
// route to the PTY-write path, and the no-op quit chord, then assert the app
// is still alive and responsive (a late focus change repaints) — i.e. the
// keyboard router + reducer did not deadlock or wedge under rapid input.

import {
  MARKERS,
  altKey,
  gridHas,
  invariant,
  withTimeout,
  waitGrid,
  type ScenarioFn,
} from "./types";

const FOCUS_CYCLE = ["1", "2", "3", "4"] as const;
const PRINTABLE = "abcdefg0123456789 ";

export const chaosKeys: ScenarioFn = async (ctx) => {
  const started = Date.now();
  const invariants = [];

  // Baseline render.
  await waitGrid(
    ctx,
    (s) => gridHas(s, MARKERS.fixtureBanner),
    15000,
    "initial render",
  );

  // ── The storm ──
  // ~3s of rapid interleaved input: focus toggles every ~25ms, printable
  // characters burst between toggles, one alt+q (guarded quit path) per lap.
  const stormMs = 3000;
  const stormStart = Date.now();
  let keyCount = 0;
  let lap = 0;
  while (Date.now() - stormStart < stormMs) {
    ctx.session.write(altKey(FOCUS_CYCLE[lap % FOCUS_CYCLE.length]!));
    keyCount++;
    for (let i = 0; i < 8; i++) {
      const ch = PRINTABLE[(lap * 8 + i) % PRINTABLE.length]!;
      ctx.session.write(ch);
      keyCount++;
    }
    if (lap % 5 === 0) {
      ctx.session.write(altKey("q"));
      keyCount++;
    }
    lap++;
    await new Promise<void>((r) => setTimeout(r, 25));
  }
  ctx.log(`chaos storm: ${keyCount} key events over ${Date.now() - stormStart}ms`);

  // ── Deadlock check: the UI must still repaint on a focus change. ──
  ctx.session.write(altKey("3"));
  let responsive = false;
  try {
    await withTimeout(
      waitGrid(
        ctx,
        (s) => gridHas(s, "F:GOVERNANCE") || gridHas(s, "focus GOVERNANCE"),
        6000,
        "post-storm governance focus repaint",
      ),
      8000,
      "post-storm responsiveness check",
    );
    responsive = true;
  } catch (err) {
    invariants.push(invariant("no-deadlock", (err as Error).message, false));
  }
  if (responsive) {
    invariants.push(
      invariant(
        "no-deadlock",
        `focus change repaints after ${keyCount} rapid key events (no deadlock)`,
        true,
      ),
    );
  }

  // ── Process alive and clean ──
  const fullText = ctx.screen.gridText();
  invariants.push(
    invariant(
      "no-crash-after-storm",
      "no unhandled exception text after the storm",
      !fullText.includes("Unhandled") && !fullText.includes("ReconcilerError"),
    ),
  );

  const final = ctx.screen.snapshot();
  return {
    name: "chaos_keys",
    pass: invariants.every((i) => i.pass),
    durationMs: Date.now() - started,
    invariants,
    artifacts: [ctx.recordArtifact("chaos-keys-final-grid.txt", final.lines.join("\n"))],
    finalGrid: final.lines.join("\n"),
    finalHash: final.hash,
  };
};
