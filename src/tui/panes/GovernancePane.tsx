// src/tui/panes/GovernancePane.tsx
import { TextAttributes } from "@opentui/core";
import type { BrokerState, OwnershipState } from "../../shared/types";
import type { FocusTarget } from "../../shared/ui-types";

interface Props {
  active: boolean;
  state: BrokerState | null;
  onKey: (key: string) => void;
}

function describeOwnership(o: OwnershipState | undefined): string {
  if (!o) return "No broker connection";
  switch (o.status) {
    case "free": return "Ownership: FREE";
    case "owned": return `Ownership: ${o.holder} (token #${o.fencingToken}, ${o.attested ? "attested" : "unattested"})`;
    case "transfer-requested": return `Ownership: TRANSFER ${o.transferFrom}→${o.transferTo}`;
    case "sender-released": return `Ownership: SENDER RELEASED — ${o.transferFrom}→${o.transferTo}, awaiting receiver validation`;
    case "receiver-validating": return `Ownership: RECEIVER VALIDATING — ${o.transferTo} validating code state`;
    case "rejected": return `Ownership: REJECTED — ${o.rejectionReason}`;
  }
}

export function GovernancePane({ active, state }: Props) {
  const ownership = state?.ownership;
  const pendingTransfers = state?.pendingTransfers ?? [];
  const pendingApprovals = state?.pendingApprovals ?? [];
  const entries = state?.eventLog ?? [];
  const artifacts = state?.artifacts ?? [];

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

      {/* Ownership state */}
      <box paddingBottom={1}>
        <text>{describeOwnership(ownership)}</text>
      </box>

      {/* Pending transfers */}
      <box paddingBottom={1}>
        {pendingTransfers.length > 0 ? (
          <text fg="cyan">
            Pending transfer: {pendingTransfers[0]?.from?.cli ?? "?"} → {pendingTransfers[0]?.to ?? "?"}
            {"  "}{pendingTransfers[0]?.reason ?? ""}
          </text>
        ) : (
          <text attributes={TextAttributes.DIM}>No pending transfers</text>
        )}
      </box>

      {/* Pending approvals (F2: from broker, not UI state) */}
      <box paddingBottom={1}>
        {pendingApprovals.length > 0 ? (
          <text fg="yellow">
            Pending approval: {pendingApprovals[0]?.type ?? "?"} (from {pendingApprovals[0]?.actor?.cli ?? "?"})
          </text>
        ) : (
          <text attributes={TextAttributes.DIM}>No pending approvals</text>
        )}
      </box>

      {/* Artifacts */}
      <box paddingBottom={1}>
        <text attributes={TextAttributes.DIM}>
          Artifacts: {artifacts.length} ({artifacts.filter(a => a.inspected).length} inspected)
        </text>
      </box>

      {/* Queue depth */}
      <box paddingBottom={1}>
        <text attributes={TextAttributes.DIM}>
          Queue depth: {state?.queueDepth ?? 0}  |  Fencing token: #{state?.fencingToken ?? 0}
        </text>
      </box>

      {/* Recent ledger entries */}
      <box flexGrow={1} flexDirection="column">
        <text attributes={TextAttributes.UNDERLINE}>Recent Ledger</text>
        {entries.slice(-5).reverse().map((entry, i) => (
          <box key={i}>
            <text fg="gray">#{entry.seq} </text>
            <text fg="white">{entry.type} </text>
            <text fg="magenta">{entry.actor} </text>
            <text fg="cyan">tok:{entry.fencingToken} </text>
            <text attributes={TextAttributes.DIM}>{entry.hash.slice(0, 12)}</text>
          </box>
        ))}
        {entries.length === 0 && (
          <text attributes={TextAttributes.DIM}>No ledger entries yet</text>
        )}
      </box>
    </box>
  );
}
