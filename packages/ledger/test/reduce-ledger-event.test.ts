// packages/ledger/test/reduce-ledger-event.test.ts
// The single lifecycle reducer (specification section 9.6).
//
// One function decides every lifecycle transition. Ordinary BridgeEventV1
// traffic is lifecycle-inert: it never changes phase, incident, or fencing
// state. Typed SessionLifecycleEventV1 records are the only source of change.

import { expect, test } from "bun:test";
import {
  INITIAL_LIFECYCLE_STATE,
  reduceLedgerEvent,
  ReducerError,
  type LifecycleState,
} from "../src/rebuild";
import type { LedgerEventV1 } from "@madventures/protocol";

// ─── Fixtures ───

const FINGERPRINT = {
  kind: "commit" as const,
  sha256: "a".repeat(64),
  git_sha: "b".repeat(40),
};

/** A typed lifecycle record. Only the fields the reducer reads are varied. */
function lifecycle(
  eventType: string,
  payload: unknown,
  overrides: Record<string, unknown> = {},
): LedgerEventV1 {
  return {
    protocol_version: "madbridge-protocol/v1",
    event_id: `evt-${eventType}`,
    session_id: "ses-1",
    event_type: eventType,
    actor: "madbridge",
    task_envelope_hash: "a".repeat(64),
    repository_fingerprint: FINGERPRINT,
    fencing_token: null,
    reason_code: null,
    created_at: "2026-09-04T00:00:00.000Z",
    previous_event_hash: "c".repeat(64),
    payload,
    ...overrides,
  } as unknown as LedgerEventV1;
}

/** An ordinary execution-authored bridge event. */
function bridge(eventType: string): LedgerEventV1 {
  return {
    protocol_version: "madbridge-protocol/v1",
    event_id: `bridge-${eventType}`,
    session_id: "ses-1",
    parent_event_id: null,
    sender_execution_id: "exec-builder",
    receiver_execution_id: "exec-reviewer",
    sender_role: "builder",
    sender_surface: "claude-code",
    sender_model: "claude-sonnet-4",
    sender_provider: "anthropic",
    task_envelope_hash: "a".repeat(64),
    repository_fingerprint: FINGERPRINT,
    event_type: eventType,
    payload_hash: "d".repeat(64),
    payload: {},
    created_at: "2026-09-04T00:00:00.000Z",
    previous_event_hash: "c".repeat(64),
  } as unknown as LedgerEventV1;
}

const OPEN = lifecycle("session_open", {
  authorization_reference: "FOUNDER-20260904-01",
  execution_ids: ["exec-builder", "exec-reviewer"],
});

const TOKEN_ISSUED = lifecycle(
  "fencing_token_issued",
  { writer_execution_id: "exec-builder" },
  { fencing_token: 1 },
);

const ACTIVATED = lifecycle("session_activated", {
  execution_ids: ["exec-builder", "exec-reviewer"],
  readiness_snapshot_seq: 7,
});

const PAUSED = lifecycle("session_paused", {
  command_id: "cmd-1",
  authorized_by: "founder",
});

const RESUMED = lifecycle("session_resumed", {
  command_id: "cmd-2",
  authorized_by: "founder",
});

const INTERRUPTED = lifecycle(
  "session_interrupted",
  {
    incident_id: "incident-1",
    reason: "child exited non-zero",
    severity: "high",
    source_event_id: null,
    reported_by_execution_id: null,
  },
  { reason_code: "child_failure" },
);

/** Fold a sequence of events from the initial state. */
function fold(...events: readonly LedgerEventV1[]): LifecycleState {
  return events.reduce(reduceLedgerEvent, INITIAL_LIFECYCLE_STATE);
}

function failureOf(run: () => unknown): string {
  try {
    run();
    return "<accepted>";
  } catch (error) {
    return error instanceof ReducerError ? error.kind : `<${String(error)}>`;
  }
}

// ─── The twelve normative section 9.6 rows ───

test("reducer row: session_open", () => {
  // create session; phase starting; token not_issued/null
  const state = fold(OPEN);
  expect(state.sessionId).toBe("ses-1");
  expect(state.phase).toBe("starting");
  expect(state.tokenState).toBe("not_issued");
  expect(state.fencingToken).toBeNull();
});

test("reducer row: fencing_token_issued", () => {
  // require starting; set token valid; do not change phase
  const state = fold(OPEN, TOKEN_ISSUED);
  expect(state.phase).toBe("starting");
  expect(state.tokenState).toBe("valid");
  expect(state.fencingToken).toBe(1);
  expect(state.tokenUsable).toBe(true);
});

test("reducer row: session_activated", () => {
  // require starting, valid token, complete ready execution set; phase active
  const state = fold(OPEN, TOKEN_ISSUED, ACTIVATED);
  expect(state.phase).toBe("active");
  expect([...state.readyExecutionIds].sort()).toEqual(["exec-builder", "exec-reviewer"]);
});

test("reducer row: session_paused", () => {
  // require active; phase paused; token unchanged
  const state = fold(OPEN, TOKEN_ISSUED, ACTIVATED, PAUSED);
  expect(state.phase).toBe("paused");
  expect(state.fencingToken).toBe(1);
  expect(state.tokenState).toBe("valid");
});

test("reducer row: session_resumed", () => {
  // require paused; phase active; token unchanged
  const state = fold(OPEN, TOKEN_ISSUED, ACTIVATED, PAUSED, RESUMED);
  expect(state.phase).toBe("active");
  expect(state.fencingToken).toBe(1);
  expect(state.tokenState).toBe("valid");
});

test("reducer row: approval_resolved", () => {
  // require active; record resolution; phase unchanged
  const approval = lifecycle("approval_resolved", {
    command_id: "cmd-3",
    authorized_by: "founder",
    approval_id: "apr-1",
    resolution: "approved",
  });
  const state = fold(OPEN, TOKEN_ISSUED, ACTIVATED, approval);
  expect(state.phase).toBe("active");
});

test("reducer row: session_interrupted", () => {
  // require active or paused; populate incident; phase interrupted; token unusable
  const state = fold(OPEN, TOKEN_ISSUED, ACTIVATED, INTERRUPTED);
  expect(state.phase).toBe("interrupted");
  expect(state.incident).toEqual({
    id: "incident-1",
    reason: "child exited non-zero",
    timestamp: "2026-09-04T00:00:00.000Z",
    severity: "high",
  });
  expect(state.reasonCode).toBe("child_failure");
  expect(state.tokenUsable).toBe(false);
});

test("reducer row: fencing_token_invalidated", () => {
  // require recognized interrupt prefix; token invalidated and unusable;
  // phase is not inferred
  const invalidated = lifecycle("fencing_token_invalidated", {
    invalidation_reason: "interruption",
    incident_id: "incident-1",
  });
  const state = fold(OPEN, TOKEN_ISSUED, ACTIVATED, INTERRUPTED, invalidated);
  expect(state.tokenState).toBe("invalidated");
  expect(state.tokenUsable).toBe(false);
  expect(state.phase).toBe("interrupted");
});

test("reducer row: session_closing", () => {
  // require active for founder close; phase closing; token unusable
  const closing = lifecycle("session_closing", {
    command_id: "cmd-4",
    authorized_by: "founder",
    closure_kind: "founder",
    incident_id: null,
  });
  const state = fold(OPEN, TOKEN_ISSUED, ACTIVATED, closing);
  expect(state.phase).toBe("closing");
  expect(state.closureKind).toBe("founder");
  expect(state.tokenUsable).toBe(false);
});

test("reducer row: session_abort", () => {
  // require incomplete starting; phase closed (aborted); token unusable
  const abort = lifecycle("session_abort", { abort_reason: "startup failed" });
  const state = fold(OPEN, abort);
  expect(state.phase).toBe("closed");
  expect(state.closureKind).toBe("abort");
  expect(state.tokenUsable).toBe(false);
});

test("reducer row: session_closed", () => {
  // require closing and matching closure kind/incident id; phase closed
  const closing = lifecycle("session_closing", {
    command_id: "cmd-4",
    authorized_by: "founder",
    closure_kind: "founder",
    incident_id: null,
  });
  const closed = lifecycle("session_closed", {
    command_id: "cmd-4",
    authorized_by: "founder",
    closure_kind: "founder",
    incident_id: null,
  });
  const state = fold(OPEN, TOKEN_ISSUED, ACTIVATED, closing, closed);
  expect(state.phase).toBe("closed");
  expect(state.closureKind).toBe("founder");
  expect(state.tokenUsable).toBe(false);
});

test("reducer row: session_unclean_closure", () => {
  // require no typed terminal prefix; phase closed (unclean); token unusable
  const unclean = lifecycle("session_unclean_closure", {
    detected_at_startup: true,
    last_durable_event_id: "evt-last",
  });
  const state = fold(OPEN, TOKEN_ISSUED, ACTIVATED, unclean);
  expect(state.phase).toBe("closed");
  expect(state.closureKind).toBe("unclean");
  expect(state.tokenUsable).toBe(false);
});

// ─── Named invariants ───

test("a normal BridgeEventV1 does not change phase, incident, or fencing state", () => {
  const before = fold(OPEN, TOKEN_ISSUED, ACTIVATED);
  const after = fold(
    OPEN,
    TOKEN_ISSUED,
    ACTIVATED,
    bridge("message"),
    bridge("artifact_publish"),
    bridge("incident"),
    bridge("pause"),
    bridge("resume"),
    bridge("session_close"),
  );
  expect(after.phase).toBe(before.phase);
  expect(after.incident).toEqual(before.incident);
  expect(after.fencingToken).toBe(before.fencingToken);
  expect(after.tokenState).toBe(before.tokenState);
  expect(after.tokenUsable).toBe(before.tokenUsable);
});

test("first activity does not synthesize active", () => {
  // Phase 2 inferred `active` from the first ordinary event. Phase 3A does not.
  const state = fold(bridge("message"), bridge("artifact_publish"));
  expect(state.phase).toBe("starting");
  expect(state.phase).not.toBe("active");
});

test("session_closed before session_closing throws impossible_order", () => {
  const closed = lifecycle("session_closed", {
    command_id: "cmd-4",
    authorized_by: "founder",
    closure_kind: "founder",
    incident_id: null,
  });
  expect(failureOf(() => fold(OPEN, TOKEN_ISSUED, ACTIVATED, closed))).toBe(
    "impossible_order",
  );
});

test("reconciling is not a reachable phase", () => {
  // The union no longer contains it, and no reachable fold produces it.
  const reachable = [
    fold(OPEN),
    fold(OPEN, TOKEN_ISSUED),
    fold(OPEN, TOKEN_ISSUED, ACTIVATED),
    fold(OPEN, TOKEN_ISSUED, ACTIVATED, PAUSED),
    fold(OPEN, TOKEN_ISSUED, ACTIVATED, PAUSED, RESUMED),
    fold(OPEN, TOKEN_ISSUED, ACTIVATED, INTERRUPTED),
  ];
  for (const state of reachable) {
    expect(String(state.phase)).not.toBe("reconciling");
  }
});
