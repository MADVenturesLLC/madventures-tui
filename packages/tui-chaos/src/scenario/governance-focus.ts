// packages/tui-chaos/src/scenario/governance-focus.ts
// governance_focus scenario.
//
// Verifies the governed approval path end-to-end against the REAL TUI
// process in fixture mode:
//   1. Fixture banner proves the harness never started a live session.
//   2. Mock approval queue (MADV_TUI_FIXTURE=1) auto-arms the DecisionStrip.
//   3. Accept/reject keys are INERT while Claude is focused
//      (routeKeyEvent -> validateApprovalResolution rejects on focus).
//   4. Governance focus arms the strip; alt+y resolves approval 1 (accepted),
//      the queue rebinds to approval 2; alt+n resolves it (rejected).
//   5. The guarded path fires without crash and the app stays responsive.

import {
  MARKERS,
  altKey,
  firstLineWith,
  gridHas,
  invariant,
  waitGrid,
  type ScenarioFn,
} from "./types";

export const governanceFocus: ScenarioFn = async (ctx) => {
  const started = Date.now();
  const invariants = [];
  const artifacts: string[] = [];

  // 1. Fixture mode is visibly labeled.
  await waitGrid(
    ctx,
    (s) => gridHas(s, MARKERS.fixtureBanner),
    15000,
    "fixture banner rendered",
  );
  invariants.push(
    invariant(
      "fixture-banner-visible",
      "TUI renders the FIXTURE DATA — NOT A LIVE SESSION truth band",
      true,
    ),
  );

  // 2. Mock approval queue auto-arms the DecisionStrip (1 of 2 pending).
  await waitGrid(
    ctx,
    (s) => gridHas(s, MARKERS.founderDecision) && gridHas(s, MARKERS.focusGovToDecide),
    10000,
    "decision strip visible, unarmed",
  );
  invariants.push(
    invariant(
      "mock-approval-queued",
      "MADV_TUI_FIXTURE=1 mock approval queue renders the Founder decision surface",
      true,
    ),
  );

  // 3. Keys are inert on Claude focus: grid region must not change.
  //    S2: both compared snapshots must observe FULLY PARSED screen state —
  //    flush() before each snapshot so outstanding PTY/parser work (a late
  //    repaint still queued) cannot make the inert-key comparison read a
  //    stale grid. The 700ms wait remains the observation interval for the
  //    inert key itself; parser synchronization is flush(), not a longer sleep.
  await ctx.screen.flush();
  const beforeInert = ctx.screen.snapshot();
  ctx.session.write(altKey("y"));
  await new Promise<void>((r) => setTimeout(r, 700));
  await ctx.screen.flush();
  const afterInert = ctx.screen.snapshot();
  const decisionLineBefore = firstLineWith(beforeInert, MARKERS.founderDecision);
  const decisionLineAfter = firstLineWith(afterInert, MARKERS.founderDecision);
  invariants.push(
    invariant(
      "inert-on-claude-focus",
      "alt+y with Claude focused is rejected by routeKeyEvent (strip unchanged)",
      decisionLineBefore !== null && decisionLineAfter !== null && decisionLineBefore === decisionLineAfter,
      `before=${decisionLineBefore} after=${decisionLineAfter}`,
    ),
  );

  // 4. Focus governance: strip arms with visible accept key.
  ctx.session.write(altKey("3"));
  await waitGrid(
    ctx,
    (s) => gridHas(s, MARKERS.armedAccept),
    8000,
    "strip armed on governance focus",
  );
  invariants.push(
    invariant(
      "armed-on-governance-focus",
      "governance focus arms the decision surface ([ALT+Y] Accept visible)",
      true,
    ),
  );

  // 5. Accept approval 1 — the strip unbinds (resolvedApprovalIds), queue
  //    rebinds to approval 2 ("1 of 1"), and the app stays alive.
  ctx.session.write(altKey("y"));
  let accepted = false;
  try {
    await waitGrid(
      ctx,
      (s) => firstLineWith(s, MARKERS.founderDecision)?.includes("(1 of 1)") === true,
      8000,
      "queue rebound to approval 2 after accept",
    );
    accepted = true;
  } catch (err) {
    invariants.push(invariant("accept-resolves-approval", (err as Error).message, false));
  }
  if (accepted) {
    invariants.push(
      invariant(
        "accept-resolves-approval",
        "alt+y on governance focus resolves approval 1 and rebinds the queue",
        true,
      ),
    );
  }

  // 6. Reject approval 2 — the strip disappears entirely while the StatusBar
  //    still shows the raw pending count (snapshot unchanged, UI unbound).
  ctx.session.write(altKey("n"));
  let rejected = false;
  try {
    await waitGrid(
      ctx,
      (s) => !gridHas(s, MARKERS.founderDecision),
      8000,
      "decision strip cleared after reject",
    );
    rejected = true;
  } catch (err) {
    invariants.push(invariant("reject-resolves-approval", (err as Error).message, false));
  }
  if (rejected) {
    invariants.push(
      invariant(
        "reject-resolves-approval",
        "alt+n on governance focus resolves approval 2 (reject) and unbinds the surface",
        true,
      ),
    );
  }

  // 7. App still responsive after the full decision cycle.
  // GLM-20260918-FOUNDER-TUI-SEATS: events pane focus moved Alt+4 -> Alt+5.
  ctx.session.write(altKey("5"));
  try {
    await waitGrid(ctx, (s) => gridHas(s, MARKERS.eventsHeader), 5000, "events pane reachable");
    invariants.push(
      invariant("responsive-after-decisions", "events pane reachable after decisions", true),
    );
  } catch (err) {
    invariants.push(invariant("responsive-after-decisions", (err as Error).message, false));
  }

  artifacts.push(
    ctx.recordArtifact("governance-focus-final-grid.txt", ctx.screen.gridText()),
  );
  const final = ctx.screen.snapshot();
  return {
    name: "governance_focus",
    pass: invariants.every((i) => i.pass),
    durationMs: Date.now() - started,
    invariants,
    artifacts,
    finalGrid: final.lines.join("\n"),
    finalHash: final.hash,
  };
};
