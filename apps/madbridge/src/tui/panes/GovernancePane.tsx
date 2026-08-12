// apps/madbridge/src/tui/panes/GovernancePane.tsx
// Governance stage pane — projects actual scope, verification provenance,
// review provenance, and transfer facts from the broker snapshot.
//
// Phase 2 redesign:
//   - Connected pane has an explicit GOVERNANCE title.
//   - Disconnected shows "GOVERNANCE | NOT CONNECTED" and does not project
//     retained governance fields as current facts.
//   - "Permissions: Active" is deleted — real permission data is rendered.
//   - Verification and review provenance are rendered with attribution;
//     absent fields use explicit "—".
//   - Transfer, verification, and review provenance timestamps are rendered
//     on their own labelled rows ("Transfer at:", "Verified at:",
//     "Reviewed at:") so the label survives narrow-width truncation.
//
// Width-aware: each text row is truncated to the available inner width so
// that long values never overflow into adjacent rows (no interleaving).
// Truncation is marked with `…`.
//
// Presentation only — no authority decisions.

import { useTerminalDimensions } from "@opentui/react";
import type { BrokerSnapshot } from "../types";
import { truncateToWidth } from "../components/agent-identity";

export interface GovernancePaneProps {
  active: boolean;
  state: BrokerSnapshot | null;
}

// Border edges take 2 columns (left + right).
const BORDER_OVERHEAD = 2;

/**
 * Render a provenance timestamp honestly. A missing or empty timestamp is
 * never fabricated — it becomes an explicit "—".
 */
function stamp(value: string | null | undefined): string {
  return value && value.length > 0 ? value : "—";
}

export function GovernancePane({ active, state }: GovernancePaneProps) {
  const { width: termWidth } = useTerminalDimensions();
  // Inner content width available for text inside the bordered box.
  const innerWidth = Math.max(0, termWidth - BORDER_OVERHEAD);

  // Helper: truncate a row to fit inside the box.
  const fit = (text: string) => truncateToWidth(text, innerWidth);

  if (!state || !state.connected) {
    return (
      <box flexGrow={1} flexDirection="column" borderStyle="single" borderColor={active ? "cyan" : "white"} overflow="hidden">
        <text>{fit("GOVERNANCE | NOT CONNECTED")}</text>
        <text>{fit("No current permissions, verification, or review.")}</text>
      </box>
    );
  }

  // Safe accessors — resolve identities by surface.
  const cl = state.executions?.find((e) => e.surface === "claude-code");
  const agy = state.executions?.find((e) => e.surface === "antigravity");
  const perms = state.permissionSummary;
  const verification = state.verificationStatus;
  const review = state.reviewStatus;
  const transfer = state.pendingTransfers?.[0] ?? null;

  // Render empty allowed lists as "none", not healthy/active/unknown.
  const readPaths = perms?.allowedReadPaths?.length ? perms.allowedReadPaths.join(", ") : "none";
  const writePaths = perms?.allowedWritePaths?.length ? perms.allowedWritePaths.join(", ") : "none";
  const cmdCats = perms?.allowedCommandCategories?.length ? perms.allowedCommandCategories.join(", ") : "none";
  const egress = perms?.allowedEgressDestinations?.length ? perms.allowedEgressDestinations.join(", ") : "none";
  const dataClass = perms?.dataClass ?? "—";

  // Build all rows as plain strings — each will be truncated to fit.
  const rows: string[] = [];
  rows.push("GOVERNANCE");
  rows.push("Task ID: " + (state.task?.task_id ?? "—") + " | Repo: " + (state.task?.repository ?? "—"));
  rows.push("Fingerprint: " + (state.repositoryFingerprint ? state.repositoryFingerprint.git_sha.slice(0, 12) : "—"));
  rows.push("Claude: " + (cl?.execution_id ?? "—"));
  rows.push("Antigravity: " + (agy?.execution_id ?? "—"));
  rows.push("Writer: " + (state.activeWriter ?? "—") + " | Token: " + String(state.fencingToken) + " | Ownership: " + state.ownershipState);
  rows.push("Read: " + readPaths + " | Write: " + writePaths);
  rows.push("Commands: " + cmdCats + " | Egress: " + egress + " | Data class: " + dataClass);
  rows.push("Transfer phase: " + (state.transferPhase ?? "none") + " | Pending transfers: " + String(state.pendingTransfers?.length ?? 0));
  if (transfer) {
    rows.push("Transfer: " + transfer.from + " → " + transfer.to + " | tok#" + String(transfer.fencingToken) + " | " + transfer.reason);
    // Provenance timestamp on its own row so the label survives narrow-width
    // truncation instead of being cut off behind a long reason.
    rows.push("Transfer at: " + stamp(transfer.timestamp));
  }
  if (verification) {
    rows.push("Verification: " + verification.result + " — " + verification.detail + " (by " + verification.verifiedBy + ")");
    rows.push("Verified at: " + stamp(verification.timestamp));
  } else {
    rows.push("Verification: —");
  }
  if (review) {
    rows.push("Review: " + review.decision + " — " + review.comments + " (by " + review.reviewedBy + ")");
    rows.push("Reviewed at: " + stamp(review.timestamp));
  } else {
    rows.push("Review: —");
  }
  if (state.incident) {
    rows.push("Incident: " + state.incident.reason + " | " + state.incident.severity + " | " + state.incident.id);
  }

  return (
    <box flexGrow={1} flexDirection="column" borderStyle="single" borderColor={active ? "cyan" : "white"} overflow="hidden">
      {rows.map((row, i) => (
        <text key={i}>{fit(row)}</text>
      ))}
    </box>
  );
}
