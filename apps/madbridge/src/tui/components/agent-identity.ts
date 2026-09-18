// apps/madbridge/src/tui/components/agent-identity.ts
// Pure helpers for deriving truthful agent identity from the broker snapshot.
//
// These helpers NEVER invent a model, role, liveness state, or writer. If a
// value is unavailable in the snapshot, they return an explicit unavailable
// word so that the UI never fabricates a status.
//
// Presentation only — no authority decisions, no broker imports.

import type { CliSurface } from "@madventures/protocol";
import type { BrokerSnapshot, SeatId, SeatMode, FocusTarget } from "../types";
import { SEATS } from "../types";

export type AgentSurface = CliSurface; // "claude-code" | "antigravity"

// ─── Seat resolution (LOCAL UI posture — no authority semantics) ───
//
// The seat contract is fixed in types.ts SEATS. These helpers surface the
// facts the bars and router need. They are total lookups over a closed
// union: an unknown seat id cannot exist at the type level, so there is no
// "UNKNOWN" branch to invent.

/** The seat's fixed honest mode: builder→APPLY, architect→PLAN, operator→READ. */
export function seatMode(seat: SeatId): SeatMode {
  return SEATS.find((s) => s.id === seat)!.mode;
}

/** The pane a seat focuses when selected. */
export function seatDefaultFocus(seat: SeatId): FocusTarget {
  return SEATS.find((s) => s.id === seat)!.focus;
}

/** The seat's uppercase display label. */
export function seatLabel(seat: SeatId): string {
  return SEATS.find((s) => s.id === seat)!.label;
}

/** Header label shown at the top of an agent pane or dock strip. */
export function agentHeaderLabel(surface: AgentSurface): string {
  return surface === "claude-code" ? "CLAUDE CODE" : "ANTIGRAVITY";
}

/**
 * Resolve the execution identity for a given surface from the snapshot.
 * Returns null if no matching identity exists — the caller MUST render an
 * honest unavailable word in that case.
 */
export function resolveIdentity(
  state: BrokerSnapshot | null,
  surface: AgentSurface,
) {
  if (!state) return null;
  const found = state.executions?.find((e) => e.surface === surface);
  return found ?? null;
}

/** The exact role from the matching execution identity, or "UNKNOWN". */
export function resolveRole(state: BrokerSnapshot | null, surface: AgentSurface): string {
  const id = resolveIdentity(state, surface);
  if (!id) return "UNKNOWN";
  return id.role;
}

/** The exact model from the matching execution identity, or "UNKNOWN". */
export function resolveModel(state: BrokerSnapshot | null, surface: AgentSurface): string {
  const id = resolveIdentity(state, surface);
  if (!id) return "UNKNOWN";
  return id.model;
}

/** The exact execution_id, or "UNKNOWN". */
export function resolveExecutionId(state: BrokerSnapshot | null, surface: AgentSurface): string {
  const id = resolveIdentity(state, surface);
  if (!id) return "UNKNOWN";
  return id.execution_id;
}

/**
 * Determine whether the agent on `surface` is the CURRENT active writer.
 *
 * Uses the snapshot's activeWriter (the execution_id) — never focus.
 *
 * Truthfulness: a writer claim is only valid while the session is connected
 * AND not interrupted AND no incident is active.
 *   - `connected === false` → no current writer (retained data is historical)
 *   - `sessionState === "interrupted"` → writing is frozen; the retained
 *     token is incident evidence, not live authority
 *   - `incident !== null` → an incident takes precedence; no writer claim
 *
 * The caller should render a `STREAM ENDED` / `WRITING FROZEN` /
 * `SESSION INTERRUPTED` word instead. The retained token may still be
 * displayed as incident evidence — just not as an active writer badge.
 */
export function isActiveWriter(
  state: BrokerSnapshot | null,
  surface: AgentSurface,
): boolean {
  if (!state) return false;
  if (!state.connected) return false;
  if (state.sessionState === "interrupted") return false;
  if (state.incident !== null) return false;
  const id = resolveIdentity(state, surface);
  if (!id) return false;
  return state.activeWriter === id.execution_id;
}

/**
 * The fencing token from the snapshot. Returned only when the surface's
 * identity is the active writer; otherwise null (no fabricated token).
 */
export function writerToken(state: BrokerSnapshot | null, surface: AgentSurface): number | null {
  if (!isActiveWriter(state, surface)) return null;
  return state!.fencingToken;
}

/**
 * A truthful liveness word derived from the snapshot state.
 *
 * - connected AND active AND no incident → "LIVE"
 * - sessionState === "interrupted"       → "WRITING FROZEN"
 * - incident !== null                    → "WRITING FROZEN"
 * - connected === false                  → "STREAM ENDED"
 * - state === null                       → "STREAM ENDED"
 *
 * This is text, never a color claim. The caller may still display real
 * buffered PTY output alongside this word. The retained fencing token
 * may be shown as incident evidence — just not as a live writer badge.
 */
export function livenessWord(state: BrokerSnapshot | null): string {
  if (!state) return "STREAM ENDED";
  if (!state.connected) return "STREAM ENDED";
  if (state.sessionState === "interrupted") return "WRITING FROZEN";
  if (state.incident !== null) return "WRITING FROZEN";
  return "LIVE";
}

/**
 * Count the logical lines represented by PTY output.
 *
 * Deterministic rules (per the Phase 1 spec):
 *   - empty output → 0
 *   - `\n`, `\r\n`, and `\r` are line terminators
 *   - a non-empty unterminated tail counts as a real buffered line
 *   - a blank line between two terminators is a real buffered line
 *
 * Only the CRLF pair is normalized (to a single `\n`); it must never be
 * double-counted. Standalone `\n` and standalone `\r` are DISTINCT
 * terminators — consecutive terminators are NOT collapsed, so blank lines are
 * preserved. After normalization, count the resulting `\n`-separated segments
 * and exclude only the single trailing empty segment that exists when the
 * input ends with a terminator.
 *
 * Required behavior:
 *   ""            → 0
 *   "hello"       → 1
 *   "a\nb"        → 2
 *   "a\nb\n"      → 2
 *   "a\r\nb"      → 2
 *   "a\rb"        → 2
 *   "a\n\nb"      → 3   (line, blank, line)
 *   "\n\n"        → 2   (two blank lines)
 *   "a\r\rb"      → 3
 *   "a\r\n\r\nb"  → 3
 *   "a\n\rb"      → 3   (\n and standalone \r are distinct terminators)
 */
export function countBufferedLines(output: string): number {
  if (output.length === 0) return 0;

  // Normalize ONLY the CRLF pair to \n so it is not double-counted, then
  // normalize any remaining standalone \r to \n. Do NOT collapse runs of \n:
  // consecutive terminators represent real blank buffered lines.
  const normalized = output
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");

  // Count logical segments separated by \n. A trailing partial line (no
  // terminator) is included; a genuine empty buffered line ("a\n\n") keeps
  // its middle empty segment.
  const segments = normalized.split("\n");
  // split() of a normalized string that ends in \n produces a trailing "" —
  // that empty trailing segment is NOT a buffered line, so drop exactly one
  // trailing empty segment that exists only because the input ended in a
  // terminator.
  let count = segments.length;
  if (segments[count - 1] === "") {
    count--;
  }
  return count;
}

/**
 * Measure the terminal display width of a string in columns.
 *
 * Uses Intl.Segmenter for grapheme-cluster segmentation, then assigns each
 * cluster a width of 2 (CJK/full-width/emoji) or 1 (all others). Combining
 * marks attach to their base and do not inflate the width. This matches
 * terminal rendering where CJK and emoji occupy two cells.
 */
export function displayWidth(text: string): number {
  const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
  let width = 0;
  for (const { segment } of segmenter.segment(text)) {
    const cp = segment.codePointAt(0)!;
    if (
      (cp >= 0x1100 && cp <= 0x115f) ||
      (cp >= 0x2329 && cp <= 0x232a) ||
      (cp >= 0x2e80 && cp <= 0xa4cf && cp !== 0x303f) ||
      (cp >= 0xac00 && cp <= 0xd7a3) ||
      (cp >= 0xf900 && cp <= 0xfaff) ||
      (cp >= 0xfe30 && cp <= 0xfe4f) ||
      (cp >= 0xff00 && cp <= 0xff60) ||
      (cp >= 0xffe0 && cp <= 0xffe6) ||
      (cp >= 0x1f000 && cp <= 0x1f02f) ||
      (cp >= 0x1f300 && cp <= 0x1faff) ||
      (cp >= 0x20000 && cp <= 0x3fffd)
    ) {
      width += 2;
    } else {
      width += 1;
    }
  }
  return width;
}

/**
 * Slice a string to fit within `maxDisplayWidth` terminal display columns,
 * respecting grapheme-cluster boundaries. Returns the substring (by grapheme
 * segments) whose display width is <= maxDisplayWidth.
 */
export function sliceByDisplayWidth(text: string, maxDisplayWidth: number): string {
  if (maxDisplayWidth <= 0) return "";
  const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
  let width = 0;
  let result = "";
  for (const { segment } of segmenter.segment(text)) {
    const segWidth = displayWidth(segment);
    if (width + segWidth > maxDisplayWidth) break;
    width += segWidth;
    result += segment;
  }
  return result;
}

/**
 * Truncate a string to fit within `maxWidth` DISPLAY columns, appending a
 * visible truncation marker (`…`) if truncation occurs. Returns the original
 * string unchanged if it already fits.
 *
 * Budgets by terminal display cells (CJK = 2, ASCII = 1), not UTF-16 code
 * units. Never splits grapheme clusters, surrogate pairs, or combining marks.
 * The result's display width never exceeds `maxWidth`.
 */
export function truncateToWidth(text: string, maxWidth: number): string {
  if (displayWidth(text) <= maxWidth) return text;
  if (maxWidth <= 0) return "";
  const MARKER = "…";
  if (maxWidth <= displayWidth(MARKER)) return sliceByDisplayWidth(text, maxWidth);
  const budget = maxWidth - displayWidth(MARKER);
  return sliceByDisplayWidth(text, budget) + MARKER;
}
