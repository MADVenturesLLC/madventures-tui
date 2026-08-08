// src/tui/components/StatusBar.tsx
import { TextAttributes } from "@opentui/core";
import type { BrokerState } from "../../shared/types";
import type { FocusTarget } from "../App";

interface Props {
  state: BrokerState | null;
  connected: boolean;
  focus: FocusTarget;
}

export function StatusBar({ state, connected, focus }: Props) {
  const ownerLabel = (() => {
    if (!state) return "no broker";
    switch (state.owner.status) {
      case "free": return "free";
      case "held": return `${state.owner.holder} (writing)`;
      case "paused": return `${state.owner.holder} (paused)`;
      case "transferring": return `${state.owner.from}→${state.owner.to}`;
    }
  })();

  return (
    <box border={true} borderColor="gray" paddingLeft={1} paddingRight={1}>
      <text fg={connected ? "green" : "red"}>
        {connected ? "●" : "○"} broker
      </text>
      <text>  |  owner: </text>
      <text fg="cyan">{ownerLabel}</text>
      <text>  |  queue: {state?.queueDepth ?? 0}</text>
      <text>  |  focus: </text>
      <text fg="yellow">{focus}</text>
      <text attributes={TextAttributes.DIM}>
        {"  |  [1] Claude  [2] Antigravity  [3] Gov  [4] Events  [A] Approve"}
      </text>
    </box>
  );
}
