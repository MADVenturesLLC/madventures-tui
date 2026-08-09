import React from "react";
import type { BrokerSnapshot } from "../types";

export interface GovernancePaneProps {
  active: boolean;
  state: BrokerSnapshot | null;
}

export function GovernancePane({ active, state }: GovernancePaneProps) {
  if (!state) {
    return (
      <box flexGrow={1} borderStyle="single" borderColor={active ? "cyan" : "white"}>
        <text>Governance Pane - Disconnected</text>
      </box>
    );
  }

  // Safe accessor fallbacks since types could be null
  const cl = state.executions?.find(e => e.surface === "claude-code");
  const agy = state.executions?.find(e => e.surface === "antigravity");
  const pApproval = state.pendingApprovals?.[0];

  return (
    <box flexGrow={1} flexDirection="column" borderStyle="single" borderColor={active ? "cyan" : "white"} padding={1}>
      <text><span fg="green"><strong>Task:</strong></span> {state.task?.task_id || "None"}</text>
      <text><span fg="blue"><strong>Repo:</strong></span> {state.task?.repository || "None"}</text>
      <text><strong>Fingerprint:</strong> {state.repositoryFingerprint ? state.repositoryFingerprint.git_sha.substring(0,8) : "None"}</text>
      
      <box marginTop={1} flexDirection="column">
        <text><strong>Identities</strong></text>
        <text>Claude: {cl?.execution_id || "—"}</text>
        <text>Antigravity: {agy?.execution_id || "—"}</text>
      </box>

      <box marginTop={1} flexDirection="column">
        <text><strong>State</strong></text>
        <text>Writer: {state.activeWriter || "—"}</text>
        <text>Token: {state.fencingToken}</text>
        <text>Phase: {state.transferPhase || "none"}</text>
        {state.incident && <text><span fg="red">Incident: {state.incident.reason}</span></text>}
      </box>

      <box marginTop={1} flexDirection="column">
        <text><strong>Governance</strong></text>
        <text>Decision: {pApproval ? "pending" : "none"}</text>
        <text>Permissions: {state.permissionSummary ? "Active" : "None"}</text>
        <text>Pending Actions: {state.pendingApprovals?.length || 0}</text>
        <text>Verification: {state.verificationStatus?.result || "None"}</text>
      </box>
    </box>
  );
}