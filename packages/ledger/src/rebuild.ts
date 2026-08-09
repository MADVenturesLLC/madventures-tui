// packages/ledger/src/rebuild.ts
// Deterministic state reconstruction from verified ledger events.

import type { LedgerRow } from "./ledger";
import type { RepositoryFingerprint } from "@madventures/protocol";

export interface RebuiltState {
  count: number;
  lastEventHash: string;
  events: LedgerRow[];
}

export interface RebuiltBrokerState {
  count: number;
  lastEventHash: string;
  events: LedgerRow[];
  sessionState:
    | "starting"
    | "active"
    | "paused"
    | "interrupted"
    | "reconciling"
    | "closing"
    | "closed";
  currentFencingToken: number | null;
  lastFingerprint: RepositoryFingerprint | null;
  hasIncident: boolean;
  tokenUsable: boolean;
}

export function rebuildState(rows: Array<LedgerRow>): RebuiltState {
  if (rows.length === 0) {
    return { count: 0, lastEventHash: "0".repeat(64), events: [] };
  }
  const last = rows[rows.length - 1];
  return { count: rows.length, lastEventHash: last?.event_hash ?? "0".repeat(64), events: rows };
}

/**
 * Deterministically reconstruct broker state from verified ledger events.
 * Replays the event stream to derive session state, fencing token,
 * last known repository fingerprint, and token usability.
 */
export function rebuildBrokerState(rows: readonly LedgerRow[]): RebuiltBrokerState {
  if (rows.length === 0) {
    return {
      count: 0,
      lastEventHash: "0".repeat(64),
      events: [],
      sessionState: "starting",
      currentFencingToken: null,
      lastFingerprint: null,
      hasIncident: false,
      tokenUsable: false,
    };
  }

  let sessionState: RebuiltBrokerState["sessionState"] = "starting";
  let fencingToken: number | null = null;
  let lastFingerprint: RepositoryFingerprint | null = null;
  let hasIncident = false;
  let tokenUsable = true;

  for (const row of rows) {
    let event: { event_type?: string; repository_fingerprint?: RepositoryFingerprint };
    try {
      event = JSON.parse(row.event_json);
    } catch {
      continue;
    }

    if (event.repository_fingerprint) {
      lastFingerprint = event.repository_fingerprint;
    }

    const eventType = event.event_type;
    if (!eventType) continue;

    switch (eventType) {
      case "message":
      case "action_request":
      case "action_accept":
      case "action_reject":
      case "artifact_publish":
      case "ownership_request":
      case "ownership_release":
      case "ownership_accept":
      case "ownership_reject":
      case "verification_result":
      case "review_verdict":
        // Normal activity — no state transition
        if (sessionState === "starting") {
          sessionState = "active";
        }
        break;

      case "pause":
        if (sessionState === "active") {
          sessionState = "paused";
        }
        break;

      case "resume":
        if (sessionState === "paused" || sessionState === "interrupted") {
          // Paused or interrupted → reconciling → active on resume
          sessionState = "active";
          fencingToken = (fencingToken ?? 0) + 1;
          tokenUsable = true;
        } else {
          // Already active or other state — resume is a no-op
        }
        break;

      case "incident":
        hasIncident = true;
        tokenUsable = false;
        sessionState = "interrupted";
        break;

      case "session_close":
        if (sessionState === "active") {
          sessionState = "closing";
          sessionState = "closed";
        }
        break;

      default:
        break;
    }
  }

  const last = rows[rows.length - 1]!;
  return {
    count: rows.length,
    lastEventHash: last.event_hash,
    events: [...rows],
    sessionState,
    currentFencingToken: fencingToken,
    lastFingerprint,
    hasIncident,
    tokenUsable,
  };
}
