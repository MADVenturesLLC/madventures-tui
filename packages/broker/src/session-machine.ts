// packages/broker/src/session-machine.ts
// Session lifecycle state machine — Phase 3A semantics (spec §2.5, §9.4, §9.10).
//
//   starting -> active -> paused -> active -> closing -> closed
//   starting -> closed                                   (abort)
//   starting | active | paused -> interrupted -> closing -> closed
//
// `interrupted` is terminal-bound: it may proceed only to `closing`, never back
// to `active`. There is no `reconciling` phase and no `reconcile` event. `resume`
// is legal only from `paused`. Unlisted transitions throw InvalidTransitionError.
// No default branch coerces unknown state.
//
// `SessionState.kind` is the ledger's `LifecyclePhase` vocabulary by construction,
// so the pure machine and the canonical reducer cannot drift apart by naming.
// This module is not a replay authority; `reduceLedgerEvent` remains canonical.

import type { LifecyclePhase } from "@madventures/ledger";

export type SessionState = { kind: LifecyclePhase };

export type SessionEvent =
  | { type: "start" }
  | { type: "pause" }
  | { type: "resume" }
  | { type: "interrupt" }
  | { type: "abort" }
  | { type: "close" }
  | { type: "complete" };

export class InvalidTransitionError extends Error {
  constructor(from: string, to: string) {
    super(`invalid transition: ${from} -> ${to}`);
    this.name = "InvalidTransitionError";
  }
}

const TRANSITIONS: Readonly<Record<LifecyclePhase, ReadonlySet<SessionEvent["type"]>>> = {
  starting: new Set(["start", "interrupt", "abort"]),
  active: new Set(["pause", "interrupt", "close"]),
  paused: new Set(["resume", "interrupt"]),
  interrupted: new Set(["close"]),
  closing: new Set(["complete"]),
  closed: new Set(),
};

export function transitionSession(state: SessionState, event: SessionEvent): SessionState {
  const fromKind = state.kind;
  // A malformed runtime state (a kind outside LifecyclePhase) has no row and is
  // rejected below rather than coerced.
  const allowed: ReadonlySet<string> | undefined = TRANSITIONS[fromKind];

  if (!allowed || !allowed.has(event.type)) {
    throw new InvalidTransitionError(fromKind, event.type);
  }

  switch (event.type) {
    case "start":
      if (fromKind === "starting") return { kind: "active" };
      break;
    case "pause":
      if (fromKind === "active") return { kind: "paused" };
      break;
    case "resume":
      if (fromKind === "paused") return { kind: "active" };
      break;
    case "interrupt":
      if (fromKind === "starting" || fromKind === "active" || fromKind === "paused") return { kind: "interrupted" };
      break;
    case "abort":
      if (fromKind === "starting") return { kind: "closed" };
      break;
    case "close":
      if (fromKind === "active" || fromKind === "interrupted") return { kind: "closing" };
      break;
    case "complete":
      if (fromKind === "closing") return { kind: "closed" };
      break;
  }

  throw new InvalidTransitionError(fromKind, event.type);
}
