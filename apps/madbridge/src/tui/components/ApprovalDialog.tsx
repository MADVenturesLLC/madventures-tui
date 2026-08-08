// apps/madbridge/src/tui/components/ApprovalDialog.tsx
// Displays pending approval events from the broker.
// Emits typed approval events bound to task, actor, scope, repository
// fingerprint, and time.
//
// There is NO approval toggle — explicit text for every color state.
// The UI does NOT create authority. It sends a resolution request to
// the broker, which records the immutable ledger entry.

import { TextAttributes } from "@opentui/core";
import type { PendingApproval, ApprovalRequestEvent } from "../types";
import type { RepositoryFingerprint } from "@madventures/protocol";

interface Props {
  approval: PendingApproval;
  onResolve: (event: ApprovalRequestEvent) => void;
}

export function ApprovalDialog({ approval, onResolve }: Props) {
  const { colorState } = approval;

  // Explicit text for every color state — no toggle
  const colorText: string = colorState.text;
  const colorFg: string =
    colorState.kind === "approved" ? "green"
    : colorState.kind === "rejected" ? "red"
    : colorState.kind === "expired" ? "gray"
    : "yellow";

  const fingerprintStr = formatFingerprint(approval.repositoryFingerprint);

  const handleAccept = () => {
    onResolve({
      taskId: approval.taskId,
      actor: approval.actor,
      scope: approval.scope,
      repositoryFingerprint: approval.repositoryFingerprint,
      timestamp: new Date().toISOString(),
      resolution: "accept",
    });
  };

  const handleReject = () => {
    onResolve({
      taskId: approval.taskId,
      actor: approval.actor,
      scope: approval.scope,
      repositoryFingerprint: approval.repositoryFingerprint,
      timestamp: new Date().toISOString(),
      resolution: "reject",
    });
  };

  return (
    <box
      position="absolute"
      top="30%"
      left="20%"
      width="60%"
      border={true}
      borderStyle="double"
      borderColor="yellow"
      flexDirection="column"
      paddingLeft={2}
      paddingRight={2}
      paddingTop={1}
      paddingBottom={1}
    >
      <text fg={colorFg} attributes={TextAttributes.BOLD}>
        {colorText}
      </text>
      <box paddingTop={1} paddingBottom={1}>
        <text>Approval Type: {approval.type}</text>
      </box>
      <box paddingBottom={1}>
        <text>Task: {approval.taskId}</text>
      </box>
      <box paddingBottom={1}>
        <text fg="gray">Actor: {approval.actor}</text>
      </box>
      <box paddingBottom={1}>
        <text fg="gray">Scope: {approval.scope}</text>
      </box>
      <box paddingBottom={1}>
        <text fg="gray">Repo fingerprint: {fingerprintStr}</text>
      </box>
      <box paddingBottom={1}>
        <text fg="gray">Requested at: {approval.timestamp}</text>
      </box>
      <box paddingBottom={1}>
        <text fg="gray">Event ID: {approval.id}</text>
      </box>
      <box paddingTop={1}>
        <text fg="green">[Ctrl+Y] Accept — sends typed accept event to broker</text>
      </box>
      <box>
        <text fg="red">[Ctrl+N] Reject — sends typed reject event to broker</text>
      </box>
      <box paddingTop={1}>
        <text attributes={TextAttributes.DIM}>
          Resolution is recorded as an immutable ledger entry by the broker.
        </text>
      </box>
    </box>
  );
}

function formatFingerprint(fp: RepositoryFingerprint): string {
  return `${fp.kind}:${fp.sha256.slice(0, 16)} (git ${fp.git_sha.slice(0, 12)})`;
}
