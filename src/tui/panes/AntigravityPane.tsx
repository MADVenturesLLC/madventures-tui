// src/tui/panes/AntigravityPane.tsx
import { TextAttributes } from "@opentui/core";
import type { BrokerState } from "../../shared/types";
import type { FocusTarget } from "../../shared/ui-types";

interface Props {
  active: boolean;
  state: BrokerState | null;
  onKey: (key: string) => void;
}

export function AntigravityPane({ active, state }: Props) {
  const session = state?.sessions.antigravity;
  const ownership = state?.ownership;
  const isOwner = ownership?.holder === "antigravity" && ownership.status === "owned";
  const isPaused = session?.status === "paused" || session?.status === "reconciling";
  const inbox = state?.inboxes.antigravity ?? [];
  const unacked = inbox.filter((m) => !m.acknowledged).length;

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
        {isPaused && <text fg="yellow"> [{session?.status?.toUpperCase()}]</text>}
      </box>

      {/* F8: PTY output area */}
      <box flexGrow={1}>
        <text attributes={TextAttributes.DIM}>
          {session?.status === "active" ? "PTY stream active..." : "Awaiting session start..."}
        </text>
      </box>

      <box border={true} borderColor="gray">
        <text attributes={TextAttributes.DIM}>
          Inbox: {unacked} unread / {inbox.length} total
        </text>
      </box>
    </box>
  );
}
