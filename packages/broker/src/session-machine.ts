// packages/broker/src/session-machine.ts
// Session lifecycle state machine.
// starting -> active -> paused -> active -> closing -> closed
//                 \-> interrupted -> reconciling -> active
//
// Unlisted transitions throw InvalidTransitionError. No default branch coerces unknown state.

import type { RepositoryFingerprint } from "@madventures/protocol";

export type SessionState =
  | { kind: "starting" }
  | { kind: "active" }
  | { kind: "paused" }
  | { kind: "interrupted" }
  | { kind: "reconciling" }
  | { kind: "closing" }
  | { kind: "closed" };

export type SessionEvent =
  | { type: "start" }
  | { type: "pause" }
  | { type: "resume" }
  | { type: "interrupt" }
  | { type: "reconcile" }
  | { type: "close" }
  | { type: "complete" };

export class InvalidTransitionError extends Error {
  constructor(from: string, to: string) {
    super(`invalid transition: ${from} -> ${to}`);
    this.name = "InvalidTransitionError";
  }
}

const TRANSITIONS: Record<string, Set<string>> = {
  starting: new Set(["start", "interrupt"]),
  active: new Set(["pause", "interrupt", "close"]),
  paused: new Set(["resume"]),
  interrupted: new Set(["reconcile"]),
  reconciling: new Set(["resume", "interrupt"]),
  closing: new Set(["complete"]),
  closed: new Set(),
};

export function transitionSession(state: SessionState, event: SessionEvent): SessionState {
  const fromKind = state.kind;
  const allowed = TRANSITIONS[fromKind];

  if (!allowed || !allowed.has(event.type)) {
    if (state.kind === "interrupted" && event.type === "resume") {
      throw new Error("reconciliation_required");
    }
    throw new InvalidTransitionError(fromKind, event.type);
  }

  switch (event.type) {
    case "start":
      if (state.kind === "starting") return { kind: "active" };
      break;
    case "pause":
      if (state.kind === "active") return { kind: "paused" };
      break;
    case "resume":
      if (state.kind === "paused") return { kind: "active" };
      if (state.kind === "reconciling") return { kind: "active" };
      break;
    case "interrupt":
      if (state.kind === "active" || state.kind === "paused" || state.kind === "starting" || state.kind === "reconciling") return { kind: "interrupted" };
      break;
    case "reconcile":
      if (state.kind === "interrupted") return { kind: "reconciling" };
      break;
    case "close":
      if (state.kind === "active") return { kind: "closing" };
      break;
    case "complete":
      if (state.kind === "closing") return { kind: "closed" };
      break;
  }

  throw new InvalidTransitionError(fromKind, event.type);
}