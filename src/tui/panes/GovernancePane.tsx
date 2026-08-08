// src/tui/panes/GovernancePane.tsx
import { TextAttributes } from "@opentui/core";
import type { BrokerState, LeaseState } from "../../shared/types";
import type { FocusTarget } from "../App";

interface Props {
  active: boolean;
  state: BrokerState | null;
  onKey: (key: string) => void;
}

function describeLease(lease: LeaseState | undefined): string {
  if (!lease) return "No broker connection";
  switch (lease.status) {
    case "free": return "Lease: FREE";
    case "held": return `Lease: HELD by ${lease.holder}${lease.attested ? " (attested)" : " (unattested)"}`;
    case "paused": return `Lease: PAUSED — ${lease.holder} disconnected, awaiting re-attestation`;
    case "transferring": return `Lease: TRANSFERRING ${lease.from} → ${lease.to}`;
  }
}

export function GovernancePane({ active, state }: Props) {
  const lease = state?.owner;
  const pending = state?.pendingTransfer;
  const entries = state?.eventLog ?? [];

  return (
    <box
      flexGrow={1}
      borderStyle={active ? "double" : "single"}
      borderColor={active ? "yellow" : "gray"}
      flexDirection="column"
      paddingLeft={1}
      paddingRight={1}
    >
      <box paddingBottom={1}>
        <text fg="yellow" attributes={TextAttributes.BOLD}>
          Governance / Ownership
        </text>
      </box>

      {/* Lease state */}
      <box paddingBottom={1}>
        <text>{describeLease(lease)}</text>
      </box>

      {/* Pending transfer */}
      {pending ? (
        <box paddingBottom={1}>
          <text fg="cyan">
            Pending transfer: {pending.from} → {pending.to}
          </text>
          <text attributes={TextAttributes.DIM}>  {pending.reason}</text>
        </box>
      ) : (
        <box paddingBottom={1}>
          <text attributes={TextAttributes.DIM}>No pending transfers</text>
        </box>
      )}

      {/* Queue depth */}
      <box paddingBottom={1}>
        <text attributes={TextAttributes.DIM}>
          Queue depth: {state?.queueDepth ?? 0}
        </text>
      </box>

      {/* Recent ledger entries */}
      <box flexGrow={1} flexDirection="column">
        <text attributes={TextAttributes.UNDERLINE}>Recent Ledger</text>
        {entries.slice(-5).reverse().map((entry, i) => (
          <box key={i}>
            <text fg="gray">#{entry.seq} </text>
            <text fg="white">{entry.type} </text>
            <text attributes={TextAttributes.DIM}>{entry.actor}</text>
          </box>
        ))}
        {entries.length === 0 && (
          <text attributes={TextAttributes.DIM}>No ledger entries yet</text>
        )}
      </box>
    </box>
  );
}
