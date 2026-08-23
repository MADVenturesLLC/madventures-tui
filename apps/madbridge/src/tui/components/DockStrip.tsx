// apps/madbridge/src/tui/components/DockStrip.tsx
// Compact dock strip — the non-focused agent's home in wide mode.
//
// The dock is a PROJECTION of the snapshot and the current PTY output. It
// never invents an identity, role, model, liveness state, or writer badge.
// It does NOT claim the process is running, thinking, or active — only the
// buffered-line count, which is derived deterministically from real PTY
// output.
//
// Width-aware: the dock always renders EXACTLY one physical row at widths
// >= 80 (the wide-mode threshold). When the natural line would exceed the
// available width, lower-priority fields are truncated in priority order,
// and truncation is marked with an explicit `…` so the row is never
// silently corrupted.
//
// Presentation only — no authority decisions, no broker imports.

import { useTerminalDimensions } from "@opentui/react";
import type { BrokerSnapshot } from "../types";
import {
  type AgentSurface,
  agentHeaderLabel,
  resolveRole,
  resolveModel,
  isActiveWriter,
  writerToken,
  countBufferedLines,
  displayWidth,
  truncateToWidth,
  livenessWord,
} from "./agent-identity";

// Re-export so tests and consumers import countBufferedLines from DockStrip.
export { countBufferedLines };

export interface DockStripProps {
  /** Which agent surface this dock represents. */
  surface: AgentSurface;
  /** Immutable broker snapshot (read-only). */
  state: BrokerSnapshot | null;
  /** Raw PTY output for the docked agent — used to derive buffered lines. */
  ptyOutput: string;
}

// Field priorities (high → low). When truncating to fit a width, drop from
// the bottom of this list upward.
//
//   1. agent identity            (ANTIGRAVITY / CLAUDE CODE)
//   2. docked                    (the role-in-layout word)
//   3. WRITER tok#N              (only when the docked agent is the writer)
//   4. role                      (builder / reviewer / UNKNOWN)
//   5. model                     (exact model / UNKNOWN)
//   6. real buffered-line count  (N buffered lines / N lines)
//
// Liveness is special-cased: when the stream is ended, a `STREAM ENDED`
// marker REPLACES the WRITER badge (there is no current writer while
// disconnected) and is rendered at priority 3 so the user always sees the
// disconnected word before role/model.

const TRUNC_MARKER = "…";
const SEP = " | ";

export function buildDockLine(
  surface: AgentSurface,
  state: BrokerSnapshot | null,
  ptyOutput: string,
  width: number,
): string {
  const label = agentHeaderLabel(surface);
  const role = resolveRole(state, surface);
  const model = resolveModel(state, surface);
  const lines = countBufferedLines(ptyOutput);
  const live = livenessWord(state);

  // Build the priority-ordered field list. WRITER badge is only emitted
  // while live AND the docked agent is the current writer.
  const fields: string[] = [label, "docked"];

  if (live !== "LIVE") {
    // No current-writer claim while not live (disconnected, interrupted,
    // or incident). Show the truthful liveness word in the WRITER slot's
    // priority position.
    fields.push(live);
  } else if (isActiveWriter(state, surface)) {
    const tok = writerToken(state, surface);
    fields.push("WRITER tok#" + String(tok));
  }

  fields.push(role);
  fields.push(model);
  fields.push(String(lines) + " buffered");

  // Try the full natural line first.
  const natural = fields.join(SEP);
  if (displayWidth(natural) <= width) return natural;

  // Progressive truncation: drop the lowest-priority field one at a time
  // (count, then model, then role) until it fits, replacing the dropped
  // tail with a single truncation marker.
  const droppedMarker = SEP + TRUNC_MARKER;
  for (let dropCount = 1; dropCount < fields.length - 1; dropCount++) {
    const kept = fields.slice(0, fields.length - dropCount);
    const candidate = kept.join(SEP) + droppedMarker;
    if (displayWidth(candidate) <= width) return candidate;
  }

  // Hard truncate the leading field(s) — identity is always preserved as a
  // prefix, but truncated to the remaining display width with a marker.
  // Budgets by terminal display cells (CJK/emoji = 2) and never splits a
  // grapheme cluster. The marker is forced because fields were dropped.
  return truncateToWidth(label + TRUNC_MARKER, width);
}

export function DockStrip({ surface, state, ptyOutput }: DockStripProps) {
  const { width } = useTerminalDimensions();
  const line = buildDockLine(surface, state, ptyOutput, width);

  return (
    <box paddingLeft={0} paddingRight={0}>
      <text>{line}</text>
    </box>
  );
}
