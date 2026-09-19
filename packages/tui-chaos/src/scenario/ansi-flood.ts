// packages/tui-chaos/src/scenario/ansi-flood.ts
// ansi_flood scenario — high-volume colorized output into fixture buffers.
//
// Driven by the in-process fixture stream (MADV_TUI_FIXTURE_STREAM=1): the
// TUI's own fixture subscribe emits a growing, colored event-log projection.
// This is an in-process fixture stream — NOT a live Gateway and NOT broker
// traffic. The scenario asserts the UI keeps draining the stream and remains
// responsive (focus change repaints within the timeout) while the stream is
// running.

import {
  MARKERS,
  altKey,
  gridHas,
  invariant,
  withTimeout,
  waitGrid,
  type ScenarioFn,
} from "./types";

export const ansiFlood: ScenarioFn = async (ctx) => {
  const started = Date.now();
  const invariants = [];

  // 1. Initial render under the stream.
  await waitGrid(
    ctx,
    (s) => gridHas(s, MARKERS.fixtureBanner),
    15000,
    "initial render under fixture stream",
  );

  // 2. Let the colorized stream run for ~2.5s.
  await new Promise<void>((r) => setTimeout(r, 2500));

  // 3. Switch to the Events pane — the pane the stream fills — and confirm
  //    it paints with ledger rows that include stream-generated types.
  // GLM-20260918-FOUNDER-TUI-SEATS: events pane focus moved Alt+4 -> Alt+5.
  ctx.session.write(altKey("5"));
  try {
    await withTimeout(
      waitGrid(
        ctx,
        (s) => gridHas(s, MARKERS.eventsHeader),
        8000,
        "events pane paints during flood",
      ),
      10000,
      "events pane during flood",
    );
    invariants.push(
      invariant("responsive-under-flood", "events pane paints while fixture stream is flooding", true),
    );
  } catch (err) {
    invariants.push(invariant("responsive-under-flood", (err as Error).message, false));
  }

  // 4. The ledger projection actually received streamed entries: the status
  //    bar ledger sequence exceeds the three seed events (#3).
  let streamed = false;
  try {
    await withTimeout(
      waitGrid(
        ctx,
        (s) =>
          s.lines.some((l) => {
            const m = /L:#(\d+)/.exec(l) ?? /ledger #(\d+)/.exec(l);
            return m !== null && Number(m[1]) > 3;
          }),
        8000,
        "ledger sequence advances under stream",
      ),
      10000,
      "ledger sequence advance",
    );
    streamed = true;
  } catch (err) {
    invariants.push(invariant("stream-delivered-events", (err as Error).message, false));
  }
  if (streamed) {
    invariants.push(
      invariant(
        "stream-delivered-events",
        "fixture stream advanced the projected ledger sequence past the seed events",
        true,
      ),
    );
  }

  // 5. Focus switch still repaints while the flood continues.
  ctx.session.write(altKey("1"));
  try {
    await withTimeout(
      waitGrid(
        ctx,
        (s) => gridHas(s, "F:CLAUDE") || gridHas(s, "focus CLAUDE"),
        8000,
        "claude focus repaint during flood",
      ),
      10000,
      "focus repaint during flood",
    );
    invariants.push(invariant("focus-repaint-under-flood", "focus change repaints during flood", true));
  } catch (err) {
    invariants.push(invariant("focus-repaint-under-flood", (err as Error).message, false));
  }

  // 6. Clean output stream.
  const fullText = ctx.screen.gridText();
  invariants.push(
    invariant(
      "no-crash-under-flood",
      "no unhandled exception text under sustained colorized flood",
      !fullText.includes("Unhandled") && !fullText.includes("ReconcilerError"),
    ),
  );

  const final = ctx.screen.snapshot();
  return {
    name: "ansi_flood",
    pass: invariants.every((i) => i.pass),
    durationMs: Date.now() - started,
    invariants,
    artifacts: [ctx.recordArtifact("ansi-flood-final-grid.txt", final.lines.join("\n"))],
    finalGrid: final.lines.join("\n"),
    finalHash: final.hash,
  };
};
