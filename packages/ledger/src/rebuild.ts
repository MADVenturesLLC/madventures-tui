// packages/ledger/src/rebuild.ts
// Deterministic state reconstruction from verified ledger events.
//
// One function decides every lifecycle transition: reduceLedgerEvent, the
// canonical reducer named by specification section 9.6. Live apply and replay
// are single-sourced through it; nothing infers phase from ordinary traffic.
//
// Ordinary BridgeEventV1 records are lifecycle-inert. They never change phase,
// incident, or fencing state. Legacy execution-authored `pause`, `resume`, and
// `session_close` remain historical data only. Typed SessionLifecycleEventV1
// records are the sole source of lifecycle change.
//
// `"reconciling"` is not a Phase 3A phase (section 9.4). The broker's legacy
// session machine still carries it; that divergence is accepted under this
// milestone's sequencing and is not reconciled here.

import type { LedgerRow } from "./ledger";
import type {
  InterruptionReasonCodeV1,
  LedgerEventV1,
  RepositoryFingerprint,
  SessionLifecycleEventTypeV1,
} from "@madventures/protocol";
import { SESSION_LIFECYCLE_EVENT_TYPES } from "@madventures/protocol";

export interface RebuiltState {
  count: number;
  lastEventHash: string;
  events: LedgerRow[];
}

// ─── Lifecycle projection (specification section 9.6) ───

export type LifecyclePhase =
  | "starting"
  | "active"
  | "paused"
  | "interrupted"
  | "closing"
  | "closed";

export type TokenState = "not_issued" | "valid" | "invalidated";

/**
 * The broker-facing state kind. Aliased to LifecyclePhase so the two cannot
 * drift: `"reconciling"` is gone from both by construction rather than by two
 * separately maintained unions.
 */
export type SessionStateKind = LifecyclePhase;

export interface LifecycleState {
  readonly sessionId: string | null;
  readonly phase: LifecyclePhase;
  readonly fencingToken: number | null;
  readonly tokenState: TokenState;
  readonly tokenUsable: boolean;
  readonly incident: {
    readonly id: string;
    readonly reason: string;
    readonly timestamp: string;
    readonly severity: "low" | "medium" | "high";
  } | null;
  readonly reasonCode: InterruptionReasonCodeV1 | null;
  readonly readyExecutionIds: readonly string[];
  readonly closureKind: "founder" | "interruption" | "abort" | "unclean" | null;
}

export const INITIAL_LIFECYCLE_STATE: LifecycleState = {
  sessionId: null,
  phase: "starting",
  fencingToken: null,
  tokenState: "not_issued",
  tokenUsable: false,
  incident: null,
  reasonCode: null,
  readyExecutionIds: [],
  closureKind: null,
};

export class ReducerError extends Error {
  constructor(
    public readonly kind:
      | "unknown_lifecycle_type"
      | "impossible_order"
      | "incident_id_mismatch"
      | "invalid_phase_precondition",
    message?: string,
  ) {
    super(message ?? kind);
    this.name = "ReducerError";
  }
}

const LIFECYCLE_TYPE_SET: ReadonlySet<string> = new Set(SESSION_LIFECYCLE_EVENT_TYPES);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requirePhase(
  state: LifecycleState,
  allowed: readonly LifecyclePhase[],
  eventType: string,
): void {
  if (!allowed.includes(state.phase)) {
    throw new ReducerError(
      "invalid_phase_precondition",
      `${eventType} requires phase ${allowed.join(" or ")}, found ${state.phase}`,
    );
  }
}

/**
 * The canonical lifecycle reducer. Applies one ledger event to the projection
 * and returns the next state, or throws a typed ReducerError.
 *
 * Ordinary BridgeEventV1 records return the state unchanged. Only the twelve
 * typed lifecycle records in the section 9.6 table can move the projection, and
 * each row's precondition is enforced rather than assumed.
 */
export function reduceLedgerEvent(state: LifecycleState, event: LedgerEventV1): LifecycleState {
  const raw = event as unknown as Record<string, unknown>;

  // Authorship decides whether this is a lifecycle record at all. Ordinary
  // bridge traffic is lifecycle-inert whatever its event_type says.
  if (raw["actor"] !== "madbridge") {
    return state;
  }

  // The lifecycle vocabulary is closed. A madbridge-authored record outside the
  // twelve types is a typed reconciliation failure, never a silent acceptance.
  const eventType = raw["event_type"];
  if (typeof eventType !== "string" || !LIFECYCLE_TYPE_SET.has(eventType)) {
    throw new ReducerError(
      "unknown_lifecycle_type",
      `unknown lifecycle event type: ${String(eventType)}`,
    );
  }

  const type = eventType as SessionLifecycleEventTypeV1;
  const payload = isRecord(raw["payload"]) ? raw["payload"] : {};

  switch (type) {
    // create session; phase starting; token not_issued/null
    //
    // Creation is total. A new session inherits nothing session-scoped from
    // whatever the projection last held, so the fresh fields come from the
    // canonical initial state rather than a hand-picked list of resets: a field
    // added to LifecycleState later cannot start leaking across a session
    // boundary. The row names no phase precondition, and none is added here.
    case "session_open":
      return {
        ...INITIAL_LIFECYCLE_STATE,
        sessionId: typeof raw["session_id"] === "string" ? raw["session_id"] : state.sessionId,
      };

    // require starting or active ownership transfer; token valid; phase unchanged
    case "fencing_token_issued": {
      requirePhase(state, ["starting", "active"], type);
      const token = raw["fencing_token"];
      return {
        ...state,
        fencingToken: typeof token === "number" ? token : (state.fencingToken ?? 0) + 1,
        tokenState: "valid",
        tokenUsable: true,
      };
    }

    // require starting, valid token, complete ready execution set; phase active
    case "session_activated": {
      requirePhase(state, ["starting"], type);
      if (state.tokenState !== "valid") {
        throw new ReducerError(
          "invalid_phase_precondition",
          "session_activated requires a valid fencing token",
        );
      }
      const ids = payload["execution_ids"];
      const readyExecutionIds =
        Array.isArray(ids) && ids.every((id) => typeof id === "string")
          ? (ids as readonly string[])
          : [];
      if (readyExecutionIds.length === 0) {
        throw new ReducerError(
          "invalid_phase_precondition",
          "session_activated requires a complete ready execution set",
        );
      }
      return { ...state, phase: "active", readyExecutionIds };
    }

    // require active; phase paused; token unchanged
    case "session_paused":
      requirePhase(state, ["active"], type);
      return { ...state, phase: "paused" };

    // require paused; phase active; token unchanged
    case "session_resumed":
      requirePhase(state, ["paused"], type);
      return { ...state, phase: "active" };

    // require active; record resolution; phase unchanged
    case "approval_resolved":
      requirePhase(state, ["active"], type);
      return state;

    // require active or paused; populate incident; phase interrupted; token unusable
    case "session_interrupted": {
      requirePhase(state, ["active", "paused"], type);
      const incidentId = payload["incident_id"];
      const reason = payload["reason"];
      const severity = payload["severity"];
      if (
        typeof incidentId !== "string" ||
        typeof reason !== "string" ||
        (severity !== "low" && severity !== "medium" && severity !== "high")
      ) {
        throw new ReducerError(
          "invalid_phase_precondition",
          "session_interrupted requires a well-formed incident payload",
        );
      }
      const reasonCode = raw["reason_code"];
      return {
        ...state,
        phase: "interrupted",
        incident: {
          id: incidentId,
          reason,
          timestamp: typeof raw["created_at"] === "string" ? raw["created_at"] : "",
          severity,
        },
        reasonCode: (reasonCode as InterruptionReasonCodeV1 | null) ?? null,
        tokenUsable: false,
      };
    }

    // require recognized rollback/interrupt/close prefix; token invalidated and
    // unusable; do not infer phase
    case "fencing_token_invalidated":
      requirePhase(state, ["interrupted", "closing", "closed"], type);
      return { ...state, tokenState: "invalidated", tokenUsable: false };

    // require active for founder close or interrupted for interruption;
    // phase closing; token unusable
    case "session_closing": {
      const closureKind = payload["closure_kind"];
      if (closureKind === "founder") {
        requirePhase(state, ["active"], type);
      } else if (closureKind === "interruption") {
        requirePhase(state, ["interrupted"], type);
        if (payload["incident_id"] !== state.incident?.id) {
          throw new ReducerError(
            "incident_id_mismatch",
            "session_closing incident_id does not match the open incident",
          );
        }
      } else {
        throw new ReducerError(
          "invalid_phase_precondition",
          `session_closing has an unrecognized closure_kind: ${String(closureKind)}`,
        );
      }
      return {
        ...state,
        phase: "closing",
        closureKind: closureKind === "founder" ? "founder" : "interruption",
        tokenUsable: false,
      };
    }

    // require incomplete starting; phase closed (aborted); token unusable
    case "session_abort":
      requirePhase(state, ["starting"], type);
      return { ...state, phase: "closed", closureKind: "abort", tokenUsable: false };

    // require closing and matching closure kind/incident id; phase closed
    case "session_closed": {
      if (state.phase !== "closing") {
        throw new ReducerError(
          "impossible_order",
          `session_closed requires phase closing, found ${state.phase}`,
        );
      }
      const closureKind = payload["closure_kind"];
      if (closureKind !== state.closureKind) {
        throw new ReducerError(
          "invalid_phase_precondition",
          "session_closed closure_kind does not match session_closing",
        );
      }
      if (closureKind === "interruption" && payload["incident_id"] !== state.incident?.id) {
        throw new ReducerError(
          "incident_id_mismatch",
          "session_closed incident_id does not match the open incident",
        );
      }
      return { ...state, phase: "closed", tokenUsable: false };
    }

    // require next-start detection with no typed terminal prefix;
    // phase closed (unclean); token unusable
    case "session_unclean_closure":
      if (state.phase === "closed") {
        throw new ReducerError(
          "impossible_order",
          "session_unclean_closure requires no typed terminal prefix",
        );
      }
      return { ...state, phase: "closed", closureKind: "unclean", tokenUsable: false };

    default: {
      // Compile-time exhaustiveness over the closed lifecycle union. An
      // unrecognized type is already rejected above, so reaching this branch
      // would mean the union grew without a matching row.
      const unreachable: never = type;
      throw new ReducerError(
        "unknown_lifecycle_type",
        `unknown lifecycle event type: ${String(unreachable)}`,
      );
    }
  }
}

export interface RebuiltBrokerState {
  count: number;
  lastEventHash: string;
  events: LedgerRow[];
  sessionState: SessionStateKind;
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
 *
 * A fold of reduceLedgerEvent over the rows. Every lifecycle decision is made
 * by that one function; this wrapper only carries the row-level bookkeeping
 * (count, chain head, last fingerprint) that is not lifecycle state.
 *
 * Replay is fail-closed by rejection, not by omission: an illegal or malformed
 * lifecycle record raises the same typed ReducerError the live path raises, and
 * that error propagates to the caller. The projection is never quietly carried
 * past an event the reducer refused.
 */
export function rebuildBrokerState(rows: readonly LedgerRow[]): RebuiltBrokerState {
  let lastFingerprint: RepositoryFingerprint | null = null;
  let lifecycle: LifecycleState = INITIAL_LIFECYCLE_STATE;

  for (const row of rows) {
    let event: Record<string, unknown>;
    try {
      event = JSON.parse(row.event_json) as Record<string, unknown>;
    } catch {
      continue;
    }

    const fingerprint = event["repository_fingerprint"];
    if (fingerprint) {
      lastFingerprint = fingerprint as RepositoryFingerprint;
    }

    lifecycle = reduceLedgerEvent(lifecycle, event as unknown as LedgerEventV1);
  }

  const last = rows[rows.length - 1];
  return {
    count: rows.length,
    lastEventHash: last?.event_hash ?? "0".repeat(64),
    events: [...rows],
    sessionState: lifecycle.phase,
    currentFencingToken: lifecycle.fencingToken,
    lastFingerprint,
    hasIncident: lifecycle.incident !== null,
    tokenUsable: lifecycle.tokenUsable,
  };
}
