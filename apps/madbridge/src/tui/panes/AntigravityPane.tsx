import React from "react";
import type { BrokerSnapshot } from "../types";

export interface AntigravityPaneProps {
  active: boolean;
  state: BrokerSnapshot | null;
  ptyOutput: string;
}

export function AntigravityPane({ active, state, ptyOutput }: AntigravityPaneProps) {
  return (
    <box flexGrow={1} flexDirection="column" borderStyle="single" borderColor={active ? "cyan" : "white"}>
      <box border>
        <text><strong>Antigravity</strong></text>
      </box>
      <box flexGrow={1} overflow="hidden">
        <text>{ptyOutput || "Waiting for launch..."}</text>
      </box>
    </box>
  );
}
