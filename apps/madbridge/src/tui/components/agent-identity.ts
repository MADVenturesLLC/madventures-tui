// apps/madbridge/src/tui/components/agent-identity.ts
// Pure helpers for deriving truthful agent identity from the broker snapshot.
//
// These helpers NEVER invent a model, role, liveness state, or writer. If a
// value is unavailable in the snapshot, they return an explicit unavailable
// word so that the UI never fabricates a status.
//
// Presentation only — no authority decisions, no broker imports.

import type { CliSurface } from "@madventures/protocol";
import type { BrokerSnapshot } from "../types";

export type AgentSurface = CliSurface; // "claude-code" | "antigravity"

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
 * Truthfulness: a writer claim is only valid while the session is connected.
 * When `connected === false`, no agent is the current writer, even if the
 * snapshot still carries a retained `activeWriter`/`fencingToken`. The
 * caller should render a `STREAM ENDED` / `DISCONNECTED` word instead.
 */
export function isActiveWriter(
  state: BrokerSnapshot | null,
  surface: AgentSurface,
): boolean {
  if (!state) return false;
  if (!state.connected) return false;
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
 * A truthful liveness word derived from the snapshot connection state.
 *
 * - connected === true  → "LIVE"
 * - connected === false → "STREAM ENDED" (the stream is no longer live; any
 *   retained writer/identity is historical, not current)
 * - state === null      → "STREAM ENDED"
 *
 * This is text, never a color claim. The caller may still display real
 * buffered PTY output alongside this word.
 */
export function livenessWord(state: BrokerSnapshot | null): string {
  if (state && state.connected) return "LIVE";
  return "STREAM ENDED";
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
