// packages/protocol/test/lifecycle-events.test.ts
// The closed Phase 3A lifecycle vocabulary and its payload validator.

import { expect, test } from "bun:test";
import {
  INTERRUPTION_REASON_CODES,
  LifecycleValidationError,
  parseSessionLifecycleEvent,
  SESSION_LIFECYCLE_EVENT_TYPES,
  type LifecycleContext,
} from "../src/lifecycle-events";
import { PROTOCOL_VERSION } from "../src";

// ─── Task 10: the closed vocabulary ───

test("the lifecycle event type union has exactly twelve members", () => {
  // Arrange — the specification section 9.6 list, in its declared order.
  const expected = [
    "session_open",
    "session_abort",
    "session_unclean_closure",
    "session_activated",
    "session_paused",
    "session_resumed",
    "session_closing",
    "session_closed",
    "session_interrupted",
    "approval_resolved",
    "fencing_token_issued",
    "fencing_token_invalidated",
  ];

  // Act / Assert — the vocabulary is closed, enumerable at runtime, and ordered.
  // The tuple is widened to readonly string[] so this stays a runtime content
  // check rather than a tautology over its own literal type.
  const actual: readonly string[] = SESSION_LIFECYCLE_EVENT_TYPES;
  expect(actual).toHaveLength(12);
  expect(actual).toEqual(expected);
});

test("the interruption reason union has exactly twelve members", () => {
  // Arrange — the specification section 9.6 list, in its declared order.
  const expected = [
    "child_failure",
    "adapter_failure",
    "pty_host_failure",
    "host_command_deadline_expired",
    "authentication_expired",
    "identity_mismatch",
    "output_sequence_invariant_failed",
    "snapshot_sequence_invariant_failed",
    "ledger_write_failed",
    "broker_invariant_failed",
    "containment_failed",
    "execution_reported_incident",
  ];

  // Act / Assert
  const actual: readonly string[] = INTERRUPTION_REASON_CODES;
  expect(actual).toHaveLength(12);
  expect(actual).toEqual(expected);
});

// ─── Task 11: deterministic payload validation ───

const ENVELOPE_EXECUTION_IDS = ["exec-builder", "exec-reviewer"] as const;

function context(overrides: Partial<LifecycleContext> = {}): LifecycleContext {
  return {
    envelopeExecutionIds: [...ENVELOPE_EXECUTION_IDS],
    openIncidentId: "incident-1",
    openReasonCode: "child_failure",
    ...overrides,
  };
}

/** A well-formed lifecycle record; each test perturbs exactly one thing. */
function lifecycleRecord(
  eventType: string,
  payload: unknown,
  overrides: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    protocol_version: PROTOCOL_VERSION,
    event_id: "evt-1",
    session_id: "ses-1",
    event_type: eventType,
    actor: "madbridge",
    task_envelope_hash: "a".repeat(64),
    repository_fingerprint: {
      kind: "commit",
      sha256: "a".repeat(64),
      git_sha: "b".repeat(40),
    },
    fencing_token: 1,
    reason_code: null,
    created_at: "2026-09-04T00:00:00.000Z",
    previous_event_hash: "c".repeat(64),
    payload,
    ...overrides,
  };
}

function interruptedPayload(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    incident_id: "incident-1",
    reason: "child exited non-zero",
    severity: "high",
    source_event_id: null,
    reported_by_execution_id: null,
    ...overrides,
  };
}

function failureOf(run: () => unknown): string {
  try {
    run();
    return "<accepted>";
  } catch (error) {
    return error instanceof LifecycleValidationError ? error.failure : `<${String(error)}>`;
  }
}

test("session_interrupted without a reason code fails with missing_reason_code", () => {
  const record = lifecycleRecord("session_interrupted", interruptedPayload(), {
    reason_code: null,
  });
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe(
    "missing_reason_code",
  );
});

test("interruption-kind session_closed carrying a different incident id fails with incident_id_mismatch", () => {
  const record = lifecycleRecord(
    "session_closed",
    {
      closure_kind: "interruption",
      incident_id: "incident-OTHER",
      reason_code: "child_failure",
    },
    { reason_code: "child_failure" },
  );
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe(
    "incident_id_mismatch",
  );
});

test("session_activated with a partial execution set fails with execution_set_mismatch", () => {
  const record = lifecycleRecord("session_activated", {
    execution_ids: ["exec-builder"],
    readiness_snapshot_seq: 7,
  });
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe(
    "execution_set_mismatch",
  );
});

test("session_activated with a duplicated execution id fails with duplicate_execution_id", () => {
  const record = lifecycleRecord("session_activated", {
    execution_ids: ["exec-builder", "exec-builder"],
    readiness_snapshot_seq: 7,
  });
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe(
    "duplicate_execution_id",
  );
});

test("a lifecycle record with actor other than madbridge fails with actor_not_madbridge", () => {
  const record = lifecycleRecord("session_paused", {
    command_id: "cmd-1",
    authorized_by: "founder",
  }, { actor: "exec-builder" });
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe(
    "actor_not_madbridge",
  );
});

test("an unknown lifecycle type fails with unknown_event_type and not a default branch", () => {
  const record = lifecycleRecord("session_teleported", { anything: true });
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe(
    "unknown_event_type",
  );
});

test("validation precedence prefers unknown_event_type over payload_shape", () => {
  // Both defects are present. The fixed precedence decides which is reported.
  const record = lifecycleRecord("session_teleported", "not-an-object-at-all");
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe(
    "unknown_event_type",
  );
});

// ─── Correction: base-record structural validation ───

function founderTerminalPayload(): Record<string, unknown> {
  return {
    command_id: "cmd-1",
    authorized_by: "founder",
    closure_kind: "founder",
    incident_id: null,
  };
}

test("a lifecycle record missing required base fields is not returned as valid", () => {
  // Arrange — a valid event type, actor, and payload, and nothing else. Every
  // required SessionLifecycleEventBaseV1 field is absent.
  const skeletal: Record<string, unknown> = {
    event_type: "session_paused",
    actor: "madbridge",
    payload: { command_id: "cmd-1", authorized_by: "founder" },
  };

  // Act / Assert — a record is exactly well-formed or a typed failure.
  expect(failureOf(() => parseSessionLifecycleEvent(skeletal, context()))).toBe(
    "base_record_shape",
  );
});

test("an incorrect protocol_version fails with base_record_shape", () => {
  const record = lifecycleRecord("session_paused", {
    command_id: "cmd-1",
    authorized_by: "founder",
  }, { protocol_version: "madbridge-protocol/v999" });
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe(
    "base_record_shape",
  );
});

test("malformed required base-field types fail with base_record_shape", () => {
  const payload = { command_id: "cmd-1", authorized_by: "founder" };
  const malformations: readonly Record<string, unknown>[] = [
    { event_id: 42 },
    { session_id: null },
    { task_envelope_hash: false },
    { repository_fingerprint: "not-an-object" },
    { repository_fingerprint: { kind: "invented", sha256: "a", git_sha: "b" } },
    { fencing_token: "1" },
    { created_at: 0 },
    { previous_event_hash: [] },
  ];

  for (const malformation of malformations) {
    const record = lifecycleRecord("session_paused", payload, malformation);
    expect(
      failureOf(() => parseSessionLifecycleEvent(record, context())),
    ).toBe("base_record_shape");
  }
});

test("validation precedence prefers unknown_event_type over every later defect", () => {
  // Unknown type, absent base fields, wrong actor, and a junk payload at once.
  const record: Record<string, unknown> = {
    event_type: "session_teleported",
    actor: "exec-builder",
    payload: "not-an-object-at-all",
  };
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe(
    "unknown_event_type",
  );
});

test("validation precedence prefers unknown_field over base_record_shape", () => {
  // A recognized type carrying an extra top-level field, with base fields absent.
  const record: Record<string, unknown> = {
    event_type: "session_paused",
    actor: "madbridge",
    payload: { command_id: "cmd-1", authorized_by: "founder" },
    smuggled_field: true,
  };
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe(
    "unknown_field",
  );
});

test("a founder-kind terminal carrying a non-null reason code fails with reason_code_mismatch", () => {
  // Founder closures are not interruptions; their top-level reason_code is null.
  const record = lifecycleRecord("session_closed", founderTerminalPayload(), {
    reason_code: "containment_failed",
  });
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe(
    "reason_code_mismatch",
  );
});

test("a well-formed founder-kind terminal with a null reason code is accepted", () => {
  const record = lifecycleRecord("session_closed", founderTerminalPayload(), {
    reason_code: null,
  });
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe("<accepted>");
});

// ─── Correction addendum: reason_code base-shape boundary ───

test("a non-interrupted record with a numeric reason_code fails with base_record_shape", () => {
  // reason_code is part of the base contract: string | null for every type
  // other than session_interrupted.
  const record = lifecycleRecord("session_paused", {
    command_id: "cmd-1",
    authorized_by: "founder",
  }, { reason_code: 42 });
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe(
    "base_record_shape",
  );
});

test("session_interrupted with a non-string reason_code still fails with missing_reason_code", () => {
  // The base check must not consume or preempt the specific interruption
  // contract, which owns reason_code for this type at its own precedence slot.
  const record = lifecycleRecord("session_interrupted", interruptedPayload(), {
    reason_code: 42,
  });
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe(
    "missing_reason_code",
  );
});

test("session_interrupted with an out-of-vocabulary reason_code still fails with missing_reason_code", () => {
  const record = lifecycleRecord("session_interrupted", interruptedPayload(), {
    reason_code: "invented_reason",
  });
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe(
    "missing_reason_code",
  );
});

test("a founder-kind terminal with a non-string reason_code fails with base_record_shape", () => {
  // Structurally malformed, so the base check settles it before the semantic
  // founder-closure rule is reached.
  const record = lifecycleRecord("session_closed", founderTerminalPayload(), {
    reason_code: 42,
  });
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe(
    "base_record_shape",
  );
});

// ─── Correction: exact-own-key payload validation ───

test("a payload whose expected keys come only from the prototype chain fails with payload_shape", () => {
  // Arrange — own keys are entirely unexpected; the expected key names are
  // reachable only through the prototype. `key in payload` is satisfied by
  // inherited properties, so an own-key check is what actually closes this.
  const prototype = { command_id: "cmd-1", authorized_by: "founder" };
  const smuggled = Object.create(prototype) as Record<string, unknown>;
  smuggled["evil_one"] = "payload-smuggling";
  smuggled["evil_two"] = "second-unexpected-own-key";

  // Sanity: the fixture really does have the shape the defect needs.
  expect(Object.keys(smuggled)).toEqual(["evil_one", "evil_two"]);
  expect("command_id" in smuggled).toBe(true);
  expect(Object.hasOwn(smuggled, "command_id")).toBe(false);

  const record = lifecycleRecord("session_paused", smuggled);

  // Act / Assert — exact-key-set means exact OWN-key set.
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe("payload_shape");
});

test("a payload missing an own expected key fails even when the prototype supplies it", () => {
  // One expected key is a real own property; the other is inherited only.
  const prototype = { authorized_by: "founder" };
  const partial = Object.create(prototype) as Record<string, unknown>;
  partial["command_id"] = "cmd-1";

  const record = lifecycleRecord("session_paused", partial);
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe("payload_shape");
});

test("a payload carrying an extra own key is still rejected", () => {
  const record = lifecycleRecord("session_paused", {
    command_id: "cmd-1",
    authorized_by: "founder",
    extra_own_key: true,
  });
  expect(failureOf(() => parseSessionLifecycleEvent(record, context()))).toBe("payload_shape");
});
