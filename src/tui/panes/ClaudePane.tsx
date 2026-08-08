// src/tui/panes/ClaudePane.tsx
import { TextAttributes } from "@opentui/core";
import type { BrokerState } from "../../shared/types";
import type { FocusTarget } from "../App";

interface Props {
  active: boolean;
  state: BrokerState | null;
  onKey: (key: string) => void;
}

export function ClaudePane({ active, state }: Props) {
  const isOwner =
    state?.owner.status === "held" && state.owner.holder === "claude";
  const isPaused =
    state?.owner.status === "paused" && state.owner.holder === "claude";
  const inbox = state?.inboxes.claude ?? [];

  return (
    <box
      flexGrow={1}
      borderStyle={active ? "double" : "single"}
      borderColor={active ? "cyan" : "gray"}
      flexDirection="column"
      paddingLeft={1}
      paddingRight={1}
    >
      <box paddingBottom={1}>
        <text fg={isOwner ? "green" : isPaused ? "yellow" : "white"}>
          Claude Code
        </text>
        {isOwner && <text fg="green" attributes={TextAttributes.BOLD}> [WRITING]</text>}
        {isPaused && <text fg="yellow"> [PAUSED]</text>}
      </box>

      {/* Session output placeholder — will stream from adapter */}
      <box flexGrow={1}>
        <text attributes={TextAttributes.DIM}>Awaiting Claude session...</text>
      </box>

      {/* Inbox count */}
      <box border={true} borderColor="gray">
        <text attributes={TextAttributes.DIM}>
          Inbox: {inbox.length} message{inbox.length !== 1 ? "s" : ""}
        </text>
      </box>
    </box>
  );
}
