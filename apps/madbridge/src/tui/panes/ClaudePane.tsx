// apps/madbridge/src/tui/panes/ClaudePane.tsx
// Claude Code stage pane — projects the Claude Code execution surface.
//
// The header truthfully derives from the snapshot:
//   - "CLAUDE CODE" label
//   - "FOCUSED" only when this pane is focused (active prop)
//   - "WRITER tok#N" only when Claude's execution_id === state.activeWriter
//   - exact role and model from the matching execution identity
// If an identity, role, model, writer, or token is unavailable, an explicit
// honest word is rendered. Never invented.
//
// Border: borderStyle="single" consistently (matches AntigravityPane).
// Presentation only — no authority decisions.

import type { BrokerSnapshot } from "../types";
import {
  resolveRole,
  resolveModel,
  isActiveWriter,
  writerToken,
  livenessWord,
} from "../components/agent-identity";

export interface ClaudePaneProps {
  active: boolean;
  state: BrokerSnapshot | null;
  ptyOutput: string;
}

export function ClaudePane({ active, state, ptyOutput }: ClaudePaneProps) {
  const surface = "claude-code" as const;
  const role = resolveRole(state, surface);
  const model = resolveModel(state, surface);
  const writer = isActiveWriter(state, surface);
  const tok = writerToken(state, surface);
  const live = livenessWord(state);

  // Build the header line truthfully.
  const headerParts: string[] = ["CLAUDE CODE"];
  if (active) headerParts.push("FOCUSED");
  if (writer && tok !== null) {
    headerParts.push("WRITER tok#" + String(tok));
  } else if (live !== "LIVE") {
    // No current-writer claim while not live (disconnected, interrupted,
    // or incident). Show the truthful liveness word instead. Real buffered
    // PTY output below is still preserved.
    headerParts.push(live);
  }
  headerParts.push(role);
  headerParts.push(model);
  const header = headerParts.join(" | ");

  return (
    <box flexGrow={1} flexDirection="column" borderStyle="single" borderColor={active ? "cyan" : "white"}>
      <box>
        <text><strong>{header}</strong></text>
      </box>
      <box flexGrow={1} overflow="hidden">
        <text>{ptyOutput || "Waiting for launch..."}</text>
      </box>
    </box>
  );
}
