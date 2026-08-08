// src/tui/panes/AntigravityPane.tsx
import { TextAttributes } from "@opentui/core";
import type { BrokerState } from "../../shared/types";
import type { FocusTarget } from "../App";

interface Props {
  active: boolean;
  state: BrokerState | null;
  onKey: (key: string) => void;
}

export function AntigravityPane({ active, state }: Props) {
  const isOwner =
    state?.owner.status === "held" && state.owner.holder === "antigravity";
  const isPaused =
    state?.owner.status === "paused" && state.owner.holder === "antigravity";
  const inbox = state?.inboxes.antigravity ?? [];

  return (
    <box
      flexGrow={1}
      borderStyle={active ? "double" : "single"}
      borderColor={active ? "magenta" : "gray"}
      flexDirection="column"
      paddingLeft={1}
      paddingRight={1}
    >
      <box paddingBottom={1}>
        <text fg={isOwner ? "green" : isPaused ? "yellow" : "white"}>
          Antigravity
        </text>
        {isOwner && <text fg="green" attributes={TextAttributes.BOLD}> [WRITING]</text>}
        {isPaused && <text fg="yellow"> [PAUSED]</text>}
      </box>

      <box flexGrow={1}>
        <text attributes={TextAttributes.DIM}>Awaiting Antigravity session...</text>
      </box>

      <box border={true} borderColor="gray">
        <text attributes={TextAttributes.DIM}>
          Inbox: {inbox.length} message{inbox.length !== 1 ? "s" : ""}
        </text>
      </box>
    </box>
  );
}
