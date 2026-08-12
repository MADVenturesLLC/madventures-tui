// apps/madbridge/src/tui/components/DecisionStrip.tsx
// Full-width Founder decision surface — the live application decision
// surface, replacing the overlay ApprovalDialog in the App composition.
//
// Border vocabulary: double yellow border — the ONLY surface that uses a
// double border. Incidents use a heavy border.
//
// This component is PRESENTATION ONLY. It does not construct, emit, or
// resolve approval events, and it exposes no submission callback of its
// own. Approval submission is handled entirely by the governed
// keyboard-routing path:
//   routeKeyEvent()
//   validateApprovalResolution()
//   onApprovalResolve
//
// Every state is readable as explicit text. Color is supplementary.
//
// Width-aware: each text row is truncated to the available inner width so
// that long values never overflow into adjacent rows (no interleaving).
// Truncation is marked with `…`.
//
// Row layout (in priority order):
//   1. FOUNDER DECISION (N of M) — <color-state text>
//   2. Type/Task row (compact)
//   3. Actor/Scope/Event-ID row (compact labels: A: S: ID:)
//   4. Repo fingerprint
//   5. Requested at timestamp
//   6. Armed keys or FOCUS GOV TO DECIDE
//
// At narrow widths, each row truncates independently with `…` so that
// every defining label survives even when its value is cut.

import { useTerminalDimensions } from "@opentui/react";
import { TextAttributes } from "@opentui/core";
import type { PendingApproval } from "../types";
import type { RepositoryFingerprint } from "@madventures/protocol";
import type { KeyBindingMap, KeyAction } from "../keybindings";
import { truncateToWidth } from "./agent-identity";

export interface DecisionStripProps {
  /** The pending approval bound to this surface (looked up by stored ID). */
  approval: PendingApproval;
  /** 1-based position in the pending queue. */
  position: number;
  /** Total pending approvals in the queue. */
  total: number;
  /** Whether the surface is safely armed for resolution:
   * Governance is focused AND the approval is still pending AND not
   * already resolved. When false, show FOCUS GOV TO DECIDE. */
  armed: boolean;
  /** The loaded keybindings — used to display the actual configured keys. */
  keybindings: KeyBindingMap;
}

// Double border edges take 2 columns; paddingLeft/right add 2 more.
const BORDER_OVERHEAD = 4;

/**
 * Reverse-lookup: find the key string for a given action in the bindings map.
 * Returns the first match uppercased, or a fallback if not found.
 */
function findKeyForAction(action: KeyAction, bindings: KeyBindingMap): string {
  for (const [key, act] of bindings) {
    if (act === action) return key.toUpperCase();
  }
  // Honest fallback — never invent a key that isn't configured.
  return action === "accept-approval" ? "—" : "—";
}

function formatFingerprint(fp: RepositoryFingerprint): string {
  return fp.kind + ":" + fp.sha256.slice(0, 16) + " (git " + fp.git_sha.slice(0, 12) + ")";
}

export function DecisionStrip({ approval, position, total, armed, keybindings }: DecisionStripProps) {
  const { width: termWidth } = useTerminalDimensions();
  const innerWidth = Math.max(0, termWidth - BORDER_OVERHEAD);
  const fit = (text: string) => truncateToWidth(text, innerWidth);

  const { colorState } = approval;
  const colorText: string = colorState.text;
  const acceptKey = findKeyForAction("accept-approval", keybindings);
  const rejectKey = findKeyForAction("reject-approval", keybindings);
  const fpStr = formatFingerprint(approval.repositoryFingerprint);

  return (
    <box
      borderStyle="double"
      borderColor="yellow"
      flexDirection="column"
      paddingLeft={1}
      paddingRight={1}
    >
      <text attributes={TextAttributes.BOLD}>
        {fit("FOUNDER DECISION (" + position + " of " + total + ") — " + colorText)}
      </text>
      <text>{fit("Type: " + approval.type + " | Task: " + approval.taskId)}</text>
      <text>{fit("A:" + approval.actor + " | S:" + approval.scope + " | ID:" + approval.id)}</text>
      <text>{fit("Repo fingerprint: " + fpStr)}</text>
      <text attributes={TextAttributes.DIM}>{fit("Requested at: " + approval.timestamp)}</text>
      {armed ? (
        <text>{fit("[" + acceptKey + "] Accept   [" + rejectKey + "] Reject — typed event to broker")}</text>
      ) : (
        <text attributes={TextAttributes.BOLD}>{fit("FOCUS GOV TO DECIDE")}</text>
      )}
    </box>
  );
}
