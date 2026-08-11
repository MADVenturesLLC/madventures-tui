// apps/madbridge/src/tui/panes/AntigravityPane.tsx
// Antigravity stage pane — projects the Antigravity execution surface.
//
// The header truthfully derives from the snapshot:
//   - "ANTIGRAVITY" label
//   - "FOCUSED" only when this pane is focused (active prop)
//   - "WRITER tok#N" only when Antigravity's execution_id === state.activeWriter
//   - exact role and model from the matching execution identity
// If an identity, role, model, writer, or token is unavailable, an explicit
// honest word is rendered. Never invented.
//
// Border: borderStyle="single" consistently (matches ClaudePane — removes
// the prior inconsistency where Claude used borderStyle="single" and
// Antigravity used border={true}).
// Presentation only — no authority decisions.

import type { BrokerSnapshot } from "../types";
import {
  resolveRole,
  resolveModel,
  isActiveWriter,
  writerToken,
  livenessWord,
} from "../components/agent-identity";

export interface AntigravityPaneProps {
  active: boolean;
  state: BrokerSnapshot | null;
  ptyOutput: string;
}

export function AntigravityPane({ active, state, ptyOutput }: AntigravityPaneProps) {
  const surface = "antigravity" as const;
  const role = resolveRole(state, surface);
  const model = resolveModel(state, surface);
  const writer = isActiveWriter(state, surface);
  const tok = writerToken(state, surface);
  const live = livenessWord(state);
  const disconnected = live !== "LIVE";

  const headerParts: string[] = ["ANTIGRAVITY"];
  if (active) headerParts.push("FOCUSED");
  if (writer && tok !== null) {
    headerParts.push("WRITER tok#" + String(tok));
  } else if (disconnected) {
    // No current-writer claim while disconnected — show an explicit ended
    // word. Real buffered PTY output below is still preserved.
    headerParts.push("STREAM ENDED");
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
