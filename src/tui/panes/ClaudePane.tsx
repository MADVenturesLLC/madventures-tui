// src/tui/panes/ClaudePane.tsx
import { TextAttributes } from "@opentui/core";
import type { BrokerState } from "../../shared/types";
import type { FocusTarget } from "../../shared/ui-types";

interface Props {
  active: boolean;
  state: BrokerState | null;
  onKey: (key: string) => void;
}

export function ClaudePane({ active, state }: Props) {
  const session = state?.sessions.claude;
  const ownership = state?.ownership;
  const isOwner = ownership?.holder === "claude" && ownership.status === "owned";
  const isPaused = session?.status === "paused" || session?.status === "reconciling";
  const inbox = state?.inboxes.claude ?? [];
  const unacked = inbox.filter((m) => !m.acknowledged).length;

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
        {isPaused && <text fg="yellow"> [{session?.status?.toUpperCase()}]</text>}
        {session && <text attributes={TextAttributes.DIM}> {session.status}</text>}
      </box>

      {/* F8: PTY output area — will host real managed CLI PTY, not just status */}
      <box flexGrow={1}>
        <text attributes={TextAttributes.DIM}>
          {session?.status === "active" ? "PTY stream active..." : "Awaiting session start..."}
        </text>
      </box>

      {/* Inbox */}
      <box border={true} borderColor="gray">
        <text attributes={TextAttributes.DIM}>
          Inbox: {unacked} unread / {inbox.length} total
        </text>
      </box>
    </box>
  );
}
