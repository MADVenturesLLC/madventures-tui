// apps/madbridge/src/tui/components/StatusBar.tsx
// Persistent status bar — always visible, even in narrow layouts.
// Read-only projection of broker state. No authority decisions.

import { TextAttributes } from "@opentui/core";
import type { BrokerSnapshot, FocusTarget } from "../types";

interface Props {
  state: BrokerSnapshot | null;
  connected: boolean;
  focus: FocusTarget;
}

export function StatusBar({ state, connected, focus }: Props) {
  const ownerLabel = describeOwner(state);
  const sessionLabel = state?.sessionState ?? "—";
  const queueLabel = state?.queueDepth ?? 0;

  return (
    <box border={true} borderColor="gray" paddingLeft={1} paddingRight={1}>
      <text fg={connected ? "green" : "red"}>
        {connected ? "●" : "○"} broker
      </text>
      <text> | session: </text>
      <text fg="cyan">{sessionLabel}</text>
      <text> | owner: </text>
      <text fg="cyan">{ownerLabel}</text>
      <text> | queue: {queueLabel}</text>
      <text> | focus: </text>
      <text fg="yellow">{focus}</text>
      <text attributes={TextAttributes.DIM}>
        {" | ^1 Claude ^2 AGY ^3 Gov ^4 Events ^Y Accept ^N Reject ^Q Quit"}
      </text>
    </box>
  );
}

function describeOwner(state: BrokerSnapshot | null): string {
  if (!state) return "no broker";
  const o = state.ownershipState;
  const w = state.activeWriter;
  const tok = state.fencingToken;
  switch (o) {
    case "free":
      return "free";
    case "owned":
      return `${w ?? "unknown"} (writing, tok #${tok})`;
    case "transfer-requested":
      return `transfer requested (tok #${tok})`;
    case "sender-released":
      return `sender released (tok #${tok})`;
    case "receiver-validating":
      return `validating receiver`;
    case "rejected":
      return `rejected`;
  }
}
