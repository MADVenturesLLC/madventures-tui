import React from "react";
import type { BrokerSnapshot } from "../types";

export interface ClaudePaneProps {
  active: boolean;
  state: BrokerSnapshot | null;
  ptyOutput: string;
}

export function ClaudePane({ active, state, ptyOutput }: ClaudePaneProps) {
  return (
    <box flexGrow={1} flexDirection="column" borderStyle="single" borderColor={active ? "cyan" : "white"}>
      <box borderStyle="single">
        <text><strong>Claude Code</strong></text>
      </box>
      <box flexGrow={1} overflow="hidden">
        <text>{ptyOutput || "Waiting for launch..."}</text>
      </box>
    </box>
  );
}
