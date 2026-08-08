// src/tui/components/ApprovalDialog.tsx
// F2: Displays approval EVENTS from the broker — does not create authority.
// Accept/reject sends a resolution to the broker, which records a ledger entry.

import { TextAttributes } from "@opentui/core";
import type { ApprovalEvent } from "../../shared/types";

interface Props {
  approval: ApprovalEvent;
  onAccept: () => void;
  onReject: () => void;
}

export function ApprovalDialog({ approval }: Props) {
  return (
    <box
      position="absolute"
      top="30%"
      left="20%"
      width="60%"
      borderStyle="double"
      borderColor="yellow"
      flexDirection="column"
      paddingLeft={2}
      paddingRight={2}
      paddingTop={1}
      paddingBottom={1}
    >
      <text fg="yellow" attributes={TextAttributes.BOLD}>
        Approval Required: {approval.type.toUpperCase()}
      </text>
      <box paddingTop={1} paddingBottom={1}>
        <text>Task: {approval.task.title}</text>
      </box>
      <box paddingBottom={1}>
        <text fg="gray">Requested by: {approval.actor.cli} ({approval.actor.model})</text>
      </box>
      <box paddingBottom={1}>
        <text fg="gray">Repo fingerprint: {approval.repoFingerprint.slice(0, 24)}</text>
      </box>
      <box paddingBottom={1}>
        <text fg="gray">Scope: {approval.scope.commandCategories.join(", ")}</text>
      </box>
      <box paddingBottom={1}>
        <text fg="gray">Event ID: {approval.id}</text>
      </box>
      <box paddingTop={1}>
        <text fg="green">[Ctrl+Y] Accept</text>
        <text>  </text>
        <text fg="red">[Ctrl+N] Reject</text>
      </box>
      <box paddingTop={1}>
        <text attributes={TextAttributes.DIM}>
          Resolution is recorded as an immutable ledger entry.
        </text>
      </box>
    </box>
  );
}
