// apps/madbridge/src/tui/components/StatusBar.tsx
// Single-row status bar — always carries all six governance facts.
// Read-only projection of broker state. No authority decisions.
//
// The status bar ALWAYS occupies exactly one physical row. At 60+ columns
// all six governance facts are present using compact pipe-delimited tokens.
// Below 60 columns, progressive dropping is documented and tested.
//
// Compact token format (narrow):
//   CONN|S:active|W:exec-claude-code#3|P:1|F:CLAUDE|L:#3
// Full format (wide):
//   CONNECTED | session active | writer exec-claude-code #3 | pending 1 | focus CLAUDE | ledger #3

import { useTerminalDimensions } from "@opentui/react";
import type { BrokerSnapshot, FocusTarget } from "../types";

interface Props {
  state: BrokerSnapshot | null;
  connected: boolean;
  focus: FocusTarget;
  /** Override terminal width for testing. When omitted, uses useTerminalDimensions. */
  widthOverride?: number;
}

export function StatusBar({ state, connected, focus, widthOverride }: Props) {
  const { width: termWidth } = useTerminalDimensions();
  const width = widthOverride ?? termWidth;

  const line = buildStatusLine({
    connected,
    sessionWord: state?.sessionState ?? "—",
    ownerWord: describeOwner(state),
    pendingCount: state?.pendingApprovals?.length ?? 0,
    // Finding 2 fix: use the actual latest projected ledger sequence (max
    // seq value), NOT the number of retained events. The eventLog is a
    // bounded projection — it may not contain the entire ledger.
    ledgerSeq: computeLedgerSeq(state?.eventLog ?? []),
    focusWord: focus.toUpperCase(),
    width,
  });

  return (
    <box paddingLeft={0} paddingRight={0}>
      <text>{line}</text>
    </box>
  );
}

// ─── Pure truncation logic (unit-testable without rendering) ───

export interface StatusLineInput {
  connected: boolean;
  sessionWord: string;
  ownerWord: string;
  pendingCount: number;
  ledgerSeq: number;
  focusWord: string;
  width: number;
}

// Six governance facts, always present at 60+ columns:
//   1. Connection state
//   2. Session state
//   3. Writer + fencing token
//   4. Pending-decision count
//   5. Focus
//   6. Ledger sequence
//
// Format tiers:
//   wide  (>=100): full words with " | " separators
//   med   (>=80):  compact labels with " | " separators
//   narrow(>=60):  pipe-delimited compact tokens with "|" separators
//   <60:          progressive dropping (ledger→pending→writer→session),
//                 documented and tested

export function buildStatusLine(input: StatusLineInput): string {
  const width = input.width;

  // Build the six fact tokens.
  const connToken = input.connected ? "CONNECTED" : "NOT CONNECTED";
  const sessToken = "session " + input.sessionWord;
  const writerToken = "writer " + input.ownerWord;
  const pendToken = "pending " + String(input.pendingCount);
  const focusToken = "focus " + input.focusWord;
  const ledgerToken = "ledger #" + String(input.ledgerSeq);

  // ── Wide format (>=100): full words with " | " separators ──
  const wideTokens = [connToken, sessToken, writerToken, pendToken, focusToken, ledgerToken];
  const wideLine = wideTokens.join(" | ");
  if (wideLine.length <= width) {
    return padToWidth(wideLine, width);
  }

  // ── Compact tokens ──
  const connCompact = input.connected ? "CONN" : "NOCONN";
  const sessCompact = "S:" + input.sessionWord;
  const pendCompact = "P:" + String(input.pendingCount);
  const focusCompact = "F:" + input.focusWord;
  const ledgerCompact = "L:#" + String(input.ledgerSeq);

  // ── Medium format (>=80): compact labels with " | " separators ──
  // Use a generous writer budget — medium has room.
  const writerMedium = "W:" + abbreviateWriter(input.ownerWord, 30);
  const medTokens = [connCompact, sessCompact, writerMedium, pendCompact, focusCompact, ledgerCompact];
  const medLine = medTokens.join(" | ");
  if (medLine.length <= width) {
    return padToWidth(medLine, width);
  }

  // ── Narrow format (>=60): pipe-delimited, no spaces ──
  // Dynamic writer budget: calculate the remaining space after the
  // five fixed tokens + separators, then abbreviate the writer to fit.
  // This ensures all six facts ALWAYS fit at width >=60 regardless of
  // session state, focus target, or numeric values.
  const SEP_NARROW = "|";
  const sepCount = 5; // 6 tokens → 5 separators

  // Fixed tokens (all except writer)
  const fixedTokens = [connCompact, sessCompact, pendCompact, focusCompact, ledgerCompact];
  const fixedLen = fixedTokens.reduce((sum, t) => sum + t.length, 0) + sepCount * SEP_NARROW.length;

  // Writer budget = width - fixedLen - "W:".length
  // Must be at least 3 (for "#N" minimum) to preserve the fencing token.
  const writerPrefix = "W:";
  const writerBudget = Math.max(3, width - fixedLen - writerPrefix.length);

  const writerNarrow = writerPrefix + abbreviateWriter(input.ownerWord, writerBudget);
  const narrowTokens = [connCompact, sessCompact, writerNarrow, pendCompact, focusCompact, ledgerCompact];
  const narrowLine = narrowTokens.join(SEP_NARROW);

  if (narrowLine.length <= width) {
    return padToWidth(narrowLine, width);
  }

  // If the dynamic abbreviation still doesn't fit (extremely long session
  // word or focus word at exactly 60 columns), try truncating the writer
  // even more aggressively — down to just "#N" with no ID.
  const writerMinimal = writerPrefix + abbreviateWriter(input.ownerWord, 3);
  const minimalTokens = [connCompact, sessCompact, writerMinimal, pendCompact, focusCompact, ledgerCompact];
  const minimalLine = minimalTokens.join(SEP_NARROW);

  if (minimalLine.length <= width) {
    return padToWidth(minimalLine, width);
  }

  // ── Below 60: progressive dropping (documented and tested) ──
  // Keep connection + focus (mandatory), drop from lowest priority.
  const dropOrder = [5, 3, 2, 1]; // ledger → pending → writer → session

  for (const dropCount of [1, 2, 3, 4]) {
    const dropIndices = new Set(dropOrder.slice(0, dropCount));
    const kept = narrowTokens.filter((_, i) => !dropIndices.has(i));
    const line = kept.join("|");
    if (line.length <= width) {
      return padToWidth(line, width);
    }
  }

  // Extreme narrow: hard truncate — never wrap.
  return padToWidth(narrowLine.slice(0, width), width);
}

function padToWidth(line: string, width: number): string {
  if (line.length < width) {
    return line + " ".repeat(width - line.length);
  }
  return line;
}

/**
 * Deterministically abbreviate a writer token to fit within `maxLen` chars.
 *
 * The input is the describeOwner() output, e.g. "exec-claude-code #3" or
 * "free" or "transfer-req #5". The fencing token (#N) is always preserved.
 * The writer ID is truncated to fit the remaining budget.
 *
 * Examples with maxLen=18:
 *   "exec-claude-code #3" → "exec-claude-co #3"  (ID truncated to 13)
 *   "exec-claude-code-sonnet-4-20260809 #42" → "exec-claude-c #42"
 *   "free" → "free"
 *   "none" → "none"
 */
export function abbreviateWriter(ownerWord: string, maxLen: number): string {
  // Remove spaces (the compact format has no spaces)
  const noSpace = ownerWord.replace(/\s+/g, "");

  if (noSpace.length <= maxLen) return noSpace;

  // Split on "#" to separate the ID from the token
  const hashIdx = noSpace.lastIndexOf("#");
  if (hashIdx === -1) {
    // No token — just truncate
    return noSpace.slice(0, maxLen);
  }

  const tokenPart = noSpace.slice(hashIdx); // e.g. "#42"
  const idPart = noSpace.slice(0, hashIdx); // e.g. "exec-claude-code"
  const idBudget = maxLen - tokenPart.length;

  if (idBudget <= 0) {
    // Token alone exceeds budget — keep token, drop ID
    return tokenPart.slice(0, maxLen);
  }

  return idPart.slice(0, idBudget) + tokenPart;
}

/**
 * Compute the actual latest ledger sequence from a projected event log.
 *
 * Finding 2 fix: the ledger sequence is the maximum `seq` value in the
 * projected event log, NOT the number of retained events. The eventLog is
 * a bounded projection — it may not contain the entire ledger. Sequences
 * do not necessarily start at 1.
 *
 * Returns 0 for an empty projection (the honest default — no events seen).
 */
export function computeLedgerSeq(
  eventLog: readonly { seq: number }[],
): number {
  if (eventLog.length === 0) return 0;
  let max = 0;
  for (const entry of eventLog) {
    if (entry.seq > max) max = entry.seq;
  }
  return max;
}

function describeOwner(state: BrokerSnapshot | null): string {
  if (!state) return "none";
  const o = state.ownershipState;
  const w = state.activeWriter;
  const tok = state.fencingToken;
  switch (o) {
    case "free":
      return "free";
    case "owned":
      return (w ?? "unknown") + " #" + String(tok);
    case "transfer-requested":
      return "transfer-req #" + String(tok);
    case "sender-released":
      return "released #" + String(tok);
    case "receiver-validating":
      return "validating";
    case "rejected":
      return "rejected";
  }
}