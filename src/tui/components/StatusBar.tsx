// src/tui/components/StatusBar.tsx
import { TextAttributes } from "@opentui/core";
import type { BrokerState } from "../../shared/types";
import type { FocusTarget } from "../../shared/ui-types";

interface Props {
  state: BrokerState | null;
  connected: boolean;
  focus: FocusTarget;
}

export function StatusBar({ state, connected, focus }: Props) {
  const ownerLabel = (() => {
    const o = state?.ownership;
    if (!o) return "no broker";
    switch (o.status) {
      case "free": return "free";
      case "owned": return `${o.holder} (writing, tok #${o.fencingToken})`;
      case "transfer-requested": return `${o.transferFrom}→${o.transferTo} (requested)`;
      case "sender-released": return `${o.transferFrom}→${o.transferTo} (released)`;
      case "receiver-validating": return `validating ${o.transferTo}`;
      case "rejected": return `rejected`;
    }
  })();

  const claudeStatus = state?.sessions.claude?.status ?? "—";
  const agyStatus = state?.sessions.antigravity?.status ?? "—";

  return (
    <box border={true} borderColor="gray" paddingLeft={1} paddingRight={1}>
      <text fg={connected ? "green" : "red"}>
        {connected ? "●" : "○"} broker
      </text>
      <text>  |  owner: </text>
      <text fg="cyan">{ownerLabel}</text>
      <text>  |  claude: {claudeStatus}  agy: {agyStatus}</text>
      <text>  |  queue: {state?.queueDepth ?? 0}</text>
      <text>  |  focus: </text>
      <text fg="yellow">{focus}</text>
      <text attributes={TextAttributes.DIM}>
        {"  |  ^1 Claude  ^2 AGY  ^3 Gov  ^4 Events  ^A Approve  ^Q Quit"}
      </text>
    </box>
  );
}
