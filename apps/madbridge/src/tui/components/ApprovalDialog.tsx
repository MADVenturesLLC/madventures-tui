// apps/madbridge/src/tui/components/ApprovalDialog.tsx
// Displays pending approval events from the broker.
// Emits typed approval events bound to task, actor, scope, repository
// fingerprint, and time.
//
// There is NO approval toggle — explicit text for every color state.
// The UI does NOT create authority. It sends a resolution request to
// the broker, which records the immutable ledger entry.
//
// The accept/reject key instructions render the actual configured bindings
// from the loaded KeyBindingMap, NOT hard-coded keys.

import { TextAttributes } from "@opentui/core";
import type { PendingApproval, ApprovalRequestEvent } from "../types";
import type { RepositoryFingerprint } from "@madventures/protocol";
import type { KeyBindingMap, KeyAction } from "../keybindings";

interface Props {
  approval: PendingApproval;
  onResolve: (event: ApprovalRequestEvent) => void;
  /** Optional separate reject handler. If provided, the reject button calls
   * this instead of onResolve with resolution="reject". This allows App.tsx
   * to route both accept and reject through the same validation guard. */
  onReject?: (event: ApprovalRequestEvent) => void;
  /** The loaded keybindings — used to display the actual configured
   * accept/reject keys. If omitted, falls back to defaults. */
  keybindings?: KeyBindingMap;
}

/**
 * Reverse-lookup: find the key string for a given action in the bindings map.
 * Returns the first match, or a fallback if not found.
 */
function findKeyForAction(action: KeyAction, bindings: KeyBindingMap | undefined): string {
  if (bindings) {
    for (const [key, act] of bindings) {
      if (act === action) return key.toUpperCase();
    }
  }
  // Fallback to default Alt bindings
  return action === "accept-approval" ? "ALT+Y" : "ALT+N";
}

export function ApprovalDialog({ approval, onResolve, onReject, keybindings }: Props) {
  const { colorState } = approval;

  const colorText: string = colorState.text;
  const colorFg: string =
    colorState.kind === "approved" ? "green"
    : colorState.kind === "rejected" ? "red"
    : colorState.kind === "expired" ? "gray"
    : "yellow";

  const fingerprintStr = formatFingerprint(approval.repositoryFingerprint);
  const acceptKey = findKeyForAction("accept-approval", keybindings);
  const rejectKey = findKeyForAction("reject-approval", keybindings);

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
    if (onReject) {
      onReject({
        taskId: approval.taskId,
        actor: approval.actor,
        scope: approval.scope,
        repositoryFingerprint: approval.repositoryFingerprint,
        timestamp: new Date().toISOString(),
        resolution: "reject",
      });
    } else {
      onResolve({
        taskId: approval.taskId,
        actor: approval.actor,
        scope: approval.scope,
        repositoryFingerprint: approval.repositoryFingerprint,
        timestamp: new Date().toISOString(),
        resolution: "reject",
      });
    }
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
        <text fg="green">[{acceptKey}] Accept — sends typed accept event to broker</text>
      </box>
      <box>
        <text fg="red">[{rejectKey}] Reject — sends typed reject event to broker</text>
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