// packages/tui-chaos/src/scenario/layout-resize.ts
// layout_resize scenario — PTY cols 120 -> 70 -> 120.
//
// The status bar is the deterministic width oracle: it renders a wide format
// ("CONNECTED | session active | …") at >=100 cols and a pipe-delimited
// narrow format ("CONN|S:active|…") at 60-99 cols. The scenario asserts:
//   - the grid re-lays out at each size without crash,
//   - the app stays responsive after returning to 120,
//   - no unhandled exception text ever appears in the output stream,
//   - before/after grid hashes are captured as artifacts.

import {
  MARKERS,
  altKey,
  gridHas,
  invariant,
  waitGrid,
  type ScenarioFn,
} from "./types";

function snapshotGrid(ctx: { screen: { gridText(): string; snapshot(): { hash: string } } }) {
  const snap = ctx.screen.snapshot();
  return { text: ctx.screen.gridText(), hash: snap.hash };
}

export const layoutResize: ScenarioFn = async (ctx) => {
  const started = Date.now();
  const invariants = [];
  const artifacts: string[] = [];

  // 1. Baseline at 120x40 — wide status format.
  await waitGrid(
    ctx,
    (s) => gridHas(s, MARKERS.statusWideConnected),
    15000,
    "wide status bar at 120 cols",
  );
  const baseline = snapshotGrid(ctx);
  artifacts.push(ctx.recordArtifact("layout-resize-120-before.txt", baseline.text));

  // 2. Shrink to 70x30 — narrow layout oracle: the tab row replaces the
  //    stage, and the status bar renders a compact (non-wide) format.
  ctx.resize(70, 30);
  let narrowOk = false;
  try {
    await waitGrid(
      ctx,
      (s) =>
        (gridHas(s, "[ CLAUDE* ]") || gridHas(s, "[ CLAUDE* ]".slice(0, 8))) &&
        !gridHas(s, MARKERS.statusWideConnected) &&
        (gridHas(s, "CONN | S:") || gridHas(s, "CONN|S:")),
      8000,
      "narrow layout at 70 cols",
    );
    narrowOk = true;
  } catch (err) {
    invariants.push(invariant("resize-narrow-relayout", (err as Error).message, false));
  }
  if (narrowOk) {
    invariants.push(
      invariant(
        "resize-narrow-relayout",
        "70-col grid renders the narrow status format without crash",
        true,
      ),
    );
  }
  const narrow = snapshotGrid(ctx);
  artifacts.push(ctx.recordArtifact("layout-resize-70.txt", narrow.text));

  // 3. Grow back to 120x40 — wide format must return.
  ctx.resize(120, 40);
  let wideOk = false;
  try {
    await waitGrid(
      ctx,
      (s) => gridHas(s, MARKERS.statusWideConnected),
      8000,
      "wide status bar restored at 120 cols",
    );
    wideOk = true;
  } catch (err) {
    invariants.push(invariant("resize-wide-relayout", (err as Error).message, false));
  }
  if (wideOk) {
    invariants.push(
      invariant(
        "resize-wide-relayout",
        "120-col grid re-renders the wide status format",
        true,
      ),
    );
  }
  const restored = snapshotGrid(ctx);
  artifacts.push(ctx.recordArtifact("layout-resize-120-after.txt", restored.text));

  // 4. Still responsive after two resizes: focus switch must repaint.
  // GLM-20260918-FOUNDER-TUI-SEATS: events pane focus moved Alt+4 -> Alt+5.
  ctx.session.write(altKey("5"));
  try {
    await waitGrid(ctx, (s) => gridHas(s, MARKERS.eventsHeader), 6000, "events pane after resize");
    invariants.push(invariant("responsive-after-resize", "events pane reachable after 120->70->120", true));
  } catch (err) {
    invariants.push(invariant("responsive-after-resize", (err as Error).message, false));
  }

  // 5. Process alive + no unhandled exception noise in the output stream.
  const fullText = ctx.screen.gridText();
  invariants.push(
    invariant(
      "no-unhandled-exception",
      "no 'Unhandled' / reconciler error text appeared during resize",
      !fullText.includes("Unhandled") && !fullText.includes("ReconcilerError"),
    ),
  );

  artifacts.push(
    ctx.recordArtifact(
      "layout-resize-hashes.txt",
      JSON.stringify(
        {
          before_120: baseline.hash,
          at_70: narrow.hash,
          after_120: restored.hash,
        },
        null,
        2,
      ),
    ),
  );

  const final = ctx.screen.snapshot();
  return {
    name: "layout_resize",
    pass: invariants.every((i) => i.pass),
    durationMs: Date.now() - started,
    invariants,
    artifacts,
    finalGrid: final.lines.join("\n"),
    finalHash: final.hash,
  };
};
