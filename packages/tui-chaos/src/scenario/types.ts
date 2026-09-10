// packages/tui-chaos/src/scenario/types.ts
// Scenario contracts for the tui-chaos harness.
// Every scenario receives a live PTY session hosting the real TUI in
// fixture mode and asserts invariants against the observed screen grid.

import type { PtySession } from "../pty/session";
import type { Screen, ScreenSnapshot } from "../screen";

/** Sentinel strings rendered by the TUI that scenarios key on. */
export const MARKERS = {
  fixtureBanner: "FIXTURE DATA — NOT A LIVE SESSION",
  founderDecision: "FOUNDER DECISION (",
  focusGovToDecide: "FOCUS GOV TO DECIDE",
  armedAccept: "] Accept   [",
  eventsHeader: "Event Log (hash-chained ledger)",
  statusWideConnected: "CONNECTED | session active",
  statusNarrowConn: "CONN|S:",
} as const;

export interface RunContext {
  session: PtySession;
  screen: Screen;
  /** Record an artifact (grid dump, hash list) under the run's artifact dir. */
  recordArtifact(name: string, content: string): string;
  log(msg: string): void;
  /** Terminal size helpers — the harness resizes the PTY + screen together. */
  resize(cols: number, rows: number): void;
}

export interface Invariant {
  id: string;
  description: string;
  pass: boolean;
  detail: string;
}

export interface ScenarioResult {
  name: string;
  pass: boolean;
  durationMs: number;
  invariants: Invariant[];
  artifacts: string[];
  /** Final grid text captured at scenario end (for debugging + goldens). */
  finalGrid: string;
  finalHash: string;
}

export type ScenarioFn = (ctx: RunContext) => Promise<ScenarioResult>;

// ─── Small assertion helpers shared by scenarios ───

export function invariant(
  id: string,
  description: string,
  pass: boolean,
  detail = "",
): Invariant {
  return { id, description, pass, detail };
}

export function gridHas(snap: ScreenSnapshot, needle: string): boolean {
  return snap.lines.some((l) => l.includes(needle));
}

export function firstLineWith(snap: ScreenSnapshot, needle: string): string | null {
  for (const l of snap.lines) {
    if (l.includes(needle)) return l;
  }
  return null;
}

/** Send a keypress as a raw PTY byte sequence (alt combos = ESC + char). */
export function altKey(ch: string): string {
  return `\x1b${ch}`;
}

/** Run an async fn with a hard timeout — deadlock detection primitive. */
export async function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, rej) => {
    timer = setTimeout(() => rej(new Error(`timeout after ${ms}ms: ${label}`)), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/** Wait for a grid predicate; throws with the last grid attached on timeout. */
export async function waitGrid(
  ctx: RunContext,
  predicate: (snap: ScreenSnapshot) => boolean,
  timeoutMs: number,
  label: string,
): Promise<ScreenSnapshot> {
  const { waitFor } = await import("../screen");
  const ok = await waitFor(ctx.screen, predicate, timeoutMs);
  const snap = ctx.screen.snapshot();
  if (!ok) {
    throw new Error(
      `grid wait failed (${label}) after ${timeoutMs}ms\n--- last grid ---\n${snap.lines.join("\n")}`,
    );
  }
  return snap;
}
