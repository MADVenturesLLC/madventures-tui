// packages/broker/test/session-machine.test.ts
// Complete transition-table tests for the Phase 3A session state machine
// (spec §2.5, §9.4, §9.10; plan Task 17).
//
// Invariant under test: no path returns an interrupted session to `active`.
// `interrupted` is terminal-bound (only `close` is legal), `"reconciling"` is
// not a phase, `"reconcile"` is not an event, `resume` is legal only from
// `paused`, and `starting + abort -> closed`.

import { describe, expect, test } from "bun:test";
import { InvalidTransitionError, transitionSession } from "../src/session-machine";
import type { SessionEvent, SessionState } from "../src/session-machine";

type Kind = SessionState["kind"];
type EventType = SessionEvent["type"];

const KINDS: readonly Kind[] = ["starting", "active", "paused", "interrupted", "closing", "closed"];
const EVENTS: readonly EventType[] = ["start", "pause", "resume", "interrupt", "abort", "close", "complete"];

// The complete legal table. Every (state, event) pair absent from this table
// must be rejected with InvalidTransitionError.
const LEGAL: ReadonlyArray<readonly [Kind, EventType, Kind]> = [
  ["starting", "start", "active"],
  ["starting", "interrupt", "interrupted"],
  ["starting", "abort", "closed"],
  ["active", "pause", "paused"],
  ["active", "interrupt", "interrupted"],
  ["active", "close", "closing"],
  ["paused", "resume", "active"],
  ["paused", "interrupt", "interrupted"],
  ["interrupted", "close", "closing"],
  ["closing", "complete", "closed"],
];

function legalTarget(from: Kind, event: EventType): Kind | undefined {
  return LEGAL.find(([f, e]) => f === from && e === event)?.[2];
}

// TEST-LOCAL CASTS — invalid inputs the public types no longer admit.
// `"reconcile"` is not a SessionEvent and `"reconciling"` is not a SessionState
// in Phase 3A; these casts exist only so the runtime rejection can be asserted.
// They must never be copied into production code and never disguise a
// valid-input type error.
const REMOVED_RECONCILE_EVENT = { type: "reconcile" } as unknown as SessionEvent;
const REMOVED_RECONCILING_STATE = { kind: "reconciling" } as unknown as SessionState;

function captureThrow(state: SessionState, event: SessionEvent): unknown {
  try {
    transitionSession(state, event);
  } catch (err) {
    return err;
  }
  return undefined;
}

function expectInvalid(state: SessionState, event: SessionEvent): void {
  const caught = captureThrow(state, event);
  expect(caught).toBeInstanceOf(InvalidTransitionError);
  expect((caught as Error).name).toBe("InvalidTransitionError");
  expect((caught as Error).message).toBe(`invalid transition: ${state.kind} -> ${event.type}`);
}

describe("interrupted is terminal-bound", () => {
  test("interrupted cannot transition to reconciling", () => {
    // RED against the pre-Task-17 machine: `interrupted + reconcile` returned
    // `{ kind: "reconciling" }`. Phase 3A has no such phase or event.
    expectInvalid({ kind: "interrupted" }, REMOVED_RECONCILE_EVENT);
  });

  test("interrupted can only transition to closing", () => {
    expect(transitionSession({ kind: "interrupted" }, { type: "close" })).toEqual({ kind: "closing" });
    for (const event of EVENTS) {
      if (event === "close") continue;
      expectInvalid({ kind: "interrupted" }, { type: event } as SessionEvent);
    }
    expectInvalid({ kind: "interrupted" }, REMOVED_RECONCILE_EVENT);
  });

  test("interrupted cannot return directly to active", () => {
    const caught = captureThrow({ kind: "interrupted" }, { type: "resume" });
    expect(caught).toBeInstanceOf(InvalidTransitionError);
    expect((caught as Error).message).toBe("invalid transition: interrupted -> resume");
    // The pre-Task-17 `reconciliation_required` sentinel is gone.
    expect((caught as Error).message).not.toContain("reconciliation_required");
  });

  test("no sequence of events reaches active from interrupted", () => {
    // Exhaustive reachability over the real machine from `interrupted`.
    const reachable = new Set<Kind>(["interrupted"]);
    const frontier: Kind[] = ["interrupted"];
    for (;;) {
      const from = frontier.pop();
      if (from === undefined) break;
      for (const event of EVENTS) {
        let next: SessionState;
        try {
          next = transitionSession({ kind: from }, { type: event } as SessionEvent);
        } catch {
          continue;
        }
        if (!reachable.has(next.kind)) {
          reachable.add(next.kind);
          frontier.push(next.kind);
        }
      }
    }
    expect(reachable.has("active")).toBe(false);
    expect(reachable.has("paused")).toBe(false);
    expect([...reachable].sort()).toEqual(["closed", "closing", "interrupted"]);
  });
});

describe("legal transitions", () => {
  for (const [from, event, to] of LEGAL) {
    test(`${from} + ${event} -> ${to}`, () => {
      expect(transitionSession({ kind: from }, { type: event } as SessionEvent)).toEqual({ kind: to });
    });
  }

  test("starting transitions to active", () => {
    expect(transitionSession({ kind: "starting" }, { type: "start" }).kind).toBe("active");
  });

  test("startup abort closes the session from starting", () => {
    expect(transitionSession({ kind: "starting" }, { type: "abort" })).toEqual({ kind: "closed" });
  });

  test("paused transitions to active on resume", () => {
    expect(transitionSession({ kind: "paused" }, { type: "resume" })).toEqual({ kind: "active" });
  });

  test("starting, active, and paused all interrupt to interrupted", () => {
    for (const from of ["starting", "active", "paused"] as const) {
      expect(transitionSession({ kind: from }, { type: "interrupt" })).toEqual({ kind: "interrupted" });
    }
  });

  test("transitionSession returns a new state object and does not mutate its input", () => {
    const input: SessionState = { kind: "active" };
    const output = transitionSession(input, { type: "close" });
    expect(output).not.toBe(input);
    expect(input).toEqual({ kind: "active" });
  });
});

describe("rejected transitions", () => {
  test("the legal table has exactly ten entries and closed permits no event", () => {
    expect(LEGAL).toHaveLength(10);
    expect(LEGAL.filter(([from]) => from === "closed")).toHaveLength(0);
  });

  for (const from of KINDS) {
    test(`${from} rejects every event outside the legal table`, () => {
      const rejected: EventType[] = [];
      for (const event of EVENTS) {
        if (legalTarget(from, event) !== undefined) continue;
        expectInvalid({ kind: from }, { type: event } as SessionEvent);
        rejected.push(event);
      }
      const legalCount = LEGAL.filter(([f]) => f === from).length;
      expect(rejected).toHaveLength(EVENTS.length - legalCount);
    });
  }

  test("resume is legal only from paused", () => {
    for (const from of KINDS) {
      if (from === "paused") continue;
      expectInvalid({ kind: from }, { type: "resume" });
    }
  });

  test("abort is legal only from starting", () => {
    for (const from of KINDS) {
      if (from === "starting") continue;
      expectInvalid({ kind: from }, { type: "abort" });
    }
  });

  test("paused cannot close directly", () => {
    expectInvalid({ kind: "paused" }, { type: "close" });
  });

  test("starting cannot directly transition to paused", () => {
    expectInvalid({ kind: "starting" }, { type: "pause" });
  });

  test("closing cannot transition to interrupted", () => {
    expectInvalid({ kind: "closing" }, { type: "interrupt" });
  });

  test("closed cannot transition to anything", () => {
    for (const event of EVENTS) {
      expectInvalid({ kind: "closed" }, { type: event } as SessionEvent);
    }
    expect(() => transitionSession({ kind: "closed" }, { type: "interrupt" })).toThrow(
      "invalid transition: closed -> interrupt",
    );
  });

  test("reconcile is not an event from any state", () => {
    for (const from of KINDS) {
      expectInvalid({ kind: from }, REMOVED_RECONCILE_EVENT);
    }
  });

  test("reconciling is not a state: every event from it is rejected", () => {
    for (const event of EVENTS) {
      expectInvalid(REMOVED_RECONCILING_STATE, { type: event } as SessionEvent);
    }
    expectInvalid(REMOVED_RECONCILING_STATE, REMOVED_RECONCILE_EVENT);
  });

  test("InvalidTransitionError is an Error with a stable name and message shape", () => {
    const err = new InvalidTransitionError("interrupted", "resume");
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("InvalidTransitionError");
    expect(err.message).toBe("invalid transition: interrupted -> resume");
  });
});
