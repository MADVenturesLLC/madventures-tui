// packages/protocol/test/lifecycle-events.test.ts
// The closed Phase 3A lifecycle vocabulary and its payload validator.

import { expect, test } from "bun:test";
import {
  INTERRUPTION_REASON_CODES,
  SESSION_LIFECYCLE_EVENT_TYPES,
} from "../src/lifecycle-events";

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
