// apps/madbridge/src/tui/components/IncidentBand.tsx
// Full-width incident/interruption surface — takes visual and interaction
// precedence over a pending decision.
//
// Border vocabulary: heavy red border — the ONLY surface that uses a heavy
// border. Decisions use a double border.
//
// Rendered when EITHER:
//   state.sessionState === "interrupted"
//   state.incident !== null
//
// When IncidentBand is active:
//   - It replaces DecisionStrip (App composition ensures only one renders).
//   - Pending approval shortcuts are inert (validateApprovalResolution
//     fails closed on interrupted/incident).
//   - No hidden approval may be accepted behind the incident surface.
//
// No retry/resume action is offered. Recovery remains broker-governed.
// Every state is explicit text; color is supplementary.
//
// Width-aware: each text row is truncated to the available inner width so
// that long reasons never overflow into adjacent rows (no interleaving).
// Truncation is marked with `…`.

import { useTerminalDimensions } from "@opentui/react";
import { TextAttributes } from "@opentui/core";
import type { BrokerSnapshot } from "../types";
import { truncateToWidth } from "./agent-identity";

export interface IncidentBandProps {
  state: BrokerSnapshot | null;
}

// Heavy border edges take 2 columns; paddingLeft/right add 2 more.
const BORDER_OVERHEAD = 4;

export function IncidentBand({ state }: IncidentBandProps) {
  const { width: termWidth } = useTerminalDimensions();
  const innerWidth = Math.max(0, termWidth - BORDER_OVERHEAD);
  const fit = (text: string) => truncateToWidth(text, innerWidth);

  const incident = state?.incident ?? null;
  const reason = incident?.reason ?? "—";
  const severity = incident?.severity ?? "—";
  const incidentId = incident?.id ?? "—";
  const timestamp = incident?.timestamp ?? "—";
  // The retained fencing token is historical, NOT live authority.
  const token = state?.fencingToken ?? 0;

  // Truth boundary: a fencing token is only real evidence when one was
  // actually issued (tokens are 1-based). A missing/zero token must never be
  // presented as an issued token that was invalidated — that would fabricate
  // authority history. Render an honest fallback instead.
  const tokenClause = token > 0
    ? "token #" + String(token) + " invalidated"
    : "no issued token to invalidate";

  // Fail-closed consequence wording — writing is frozen and any retained
  // token is invalidated (not live authority).
  const headline = "SESSION INTERRUPTED — " + reason + " — writing frozen; " + tokenClause;

  return (
    <box
      borderStyle="heavy"
      borderColor="red"
      flexDirection="column"
      paddingLeft={1}
      paddingRight={1}
    >
      <text fg="red" attributes={TextAttributes.BOLD}>{fit(headline)}</text>
      <text attributes={TextAttributes.DIM}>
        {fit("Severity: " + severity + " | Incident ID: " + incidentId + " | Timestamp: " + timestamp)}
      </text>
      <text attributes={TextAttributes.DIM}>
        {fit("Recovery is broker-governed; no local retry or resume action.")}
      </text>
    </box>
  );
}

/**
 * Pure helper: determine whether the IncidentBand should be active.
 * True when sessionState is "interrupted" OR an incident record exists.
 */
export function incidentActive(state: BrokerSnapshot | null): boolean {
  if (!state) return false;
  return state.sessionState === "interrupted" || state.incident !== null;
}
