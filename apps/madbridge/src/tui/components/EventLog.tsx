// apps/madbridge/src/tui/components/EventLog.tsx
// Displays hash-chained ledger entries from the broker.
// Read-only projection — no authority decisions.

import { TextAttributes } from "@opentui/core";
import type { LedgerEntryProjection } from "../types";

interface Props {
  entries: readonly LedgerEntryProjection[];
}

export function EventLog({ entries }: Props) {
  const recent = entries.slice(-20).reverse();

  return (
    <box
      flexGrow={1}
      border={true}
      borderStyle="single"
      borderColor="gray"
      flexDirection="column"
      paddingLeft={1}
      paddingRight={1}
    >
      <text attributes={TextAttributes.UNDERLINE}>Event Log (hash-chained ledger)</text>
      {recent.map((entry) => (
        <box key={entry.seq} flexDirection="row">
          <text fg="gray">#{entry.seq}</text>
          <text> </text>
          <text fg={entry.type === "interrupt" ? "red" : entry.type.includes("transfer") ? "cyan" : "white"}>
            {entry.type}
          </text>
          <text> </text>
          <text fg="magenta">{entry.actor}</text>
          <text> </text>
          <text fg="blue">tok:{entry.fencingToken}</text>
          <text> </text>
          <text attributes={TextAttributes.DIM}>
            {entry.hash.slice(0, 12)}
          </text>
        </box>
      ))}
      {recent.length === 0 && (
        <text attributes={TextAttributes.DIM}>No events yet</text>
      )}
    </box>
  );
}
