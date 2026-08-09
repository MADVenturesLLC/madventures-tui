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
    ledgerSeq: state?.eventLog?.length ?? 0,
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

  // Compact tokens for narrow/medium.
  const connCompact = input.connected ? "CONN" : "NOCONN";
  const sessCompact = "S:" + input.sessionWord;
  const writerCompact = "W:" + input.ownerWord.replace(/\s+/g, "");
  const pendCompact = "P:" + String(input.pendingCount);
  const focusCompact = "F:" + input.focusWord;
  const ledgerCompact = "L:#" + String(input.ledgerSeq);

  // Try the widest format first, then step down.
  const formats: Array<{ sep: string; tokens: [string, string, string, string, string, string] }> = [
    // wide: full words
    { sep: " | ", tokens: [connToken, sessToken, writerToken, pendToken, focusToken, ledgerToken] },
    // medium: compact labels, spaced separator
    { sep: " | ", tokens: [connCompact, sessCompact, writerCompact, pendCompact, focusCompact, ledgerCompact] },
    // narrow: pipe-delimited, no spaces
    { sep: "|", tokens: [connCompact, sessCompact, writerCompact, pendCompact, focusCompact, ledgerCompact] },
  ];

  // Find the widest format that fits all six facts.
  for (const fmt of formats) {
    const line = fmt.tokens.join(fmt.sep);
    if (line.length <= width) {
      return padToWidth(line, width);
    }
  }

  // All six facts don't fit even in the narrowest format.
  // Progressive dropping: keep connection + focus (mandatory), drop from
  // lowest priority (ledger → pending → writer → session).
  // This only happens below 60 columns and is documented/tested.
  const narrowTokens = [connCompact, sessCompact, writerCompact, pendCompact, focusCompact, ledgerCompact];
  // Priority order: conn(0)=keep, focus(4)=keep, sess(1), writer(2), pend(3), ledger(5)
  // Drop order: ledger(5) → pend(3) → writer(2) → sess(1)
  const dropOrder = [5, 3, 2, 1];

  for (const dropCount of [1, 2, 3, 4]) {
    const dropIndices = new Set(dropOrder.slice(0, dropCount));
    const kept = narrowTokens.filter((_, i) => !dropIndices.has(i));
    const line = kept.join("|");
    if (line.length <= width) {
      return padToWidth(line, width);
    }
  }

  // Extreme narrow: hard truncate — never wrap.
  const all = narrowTokens.join("|");
  return padToWidth(all.slice(0, width), width);
}

function padToWidth(line: string, width: number): string {
  if (line.length < width) {
    return line + " ".repeat(width - line.length);
  }
  return line;
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