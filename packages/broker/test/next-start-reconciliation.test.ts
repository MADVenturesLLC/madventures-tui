// packages/broker/test/next-start-reconciliation.test.ts
// Phase 3A M7 Task 16: the section 9.5 next-start durable-prefix completion
// table. Every recognized durable prefix has exactly one deterministic
// completion, and closure kinds are never doubled.
//
// Lifecycle legality is decided only by the canonical reduceLedgerEvent. The
// table decides which missing records a prefix needs; the reducer decides the
// order those records may legally take.

import { describe, expect, test } from "bun:test";
import {
  classifyDurablePrefix,
  planPrefixCompletion,
  replayDurablePrefix,
  ReconciliationOrderError,
} from "../src/next-start-reconciliation";
import type { PrefixContext, PrefixKind } from "../src/next-start-reconciliation";
import {
  Ledger,
  INITIAL_LIFECYCLE_STATE,
  computeEventHash,
  reduceLedgerEvent,
} from "@madventures/ledger";
import type { LedgerRow, LifecycleState } from "@madventures/ledger";
import { PROTOCOL_VERSION, canonicalJson } from "@madventures/protocol";
import type {
  LedgerEventV1,
  RepositoryFingerprint,
  SessionLifecycleEventV1,
} from "@madventures/protocol";
import { parseSessionLifecycleEvent } from "../../protocol/src/lifecycle-events";
import type { LifecycleContext } from "../../protocol/src/lifecycle-events";

// ─── Durable-history fixtures ───

const SESSION_ID = "ses-next-start-001";
const EXECUTION_IDS = ["exec-builder", "exec-reviewer"] as const;
const INCIDENT_ID = "incident-7";
const REASON_CODE = "child_failure" as const;
const FOUNDER_COMMAND_ID = "cmd-founder-close-3";
const TASK_ENVELOPE_HASH = "a".repeat(64);
const FINGERPRINT: RepositoryFingerprint = {
  kind: "commit",
  sha256: "b".repeat(64),
  git_sha: "c".repeat(40),
};

let fixtureSequence = 0;

function lifecycle(
  eventType: string,
  payload: unknown,
  overrides: Record<string, unknown> = {},
): LedgerEventV1 {
  fixtureSequence += 1;
  return {
    protocol_version: PROTOCOL_VERSION,
    event_id: `durable-${eventType}-${fixtureSequence}`,
    session_id: SESSION_ID,
    event_type: eventType,
    actor: "madbridge",
    task_envelope_hash: TASK_ENVELOPE_HASH,
    repository_fingerprint: FINGERPRINT,
    fencing_token: null,
    reason_code: null,
    created_at: "2026-09-11T00:00:00.000Z",
    previous_event_hash: "d".repeat(64),
    payload,
    ...overrides,
  } as unknown as LedgerEventV1;
}

const open = () =>
  lifecycle("session_open", {
    authorization_reference: "FOUNDER-20260911-16",
    execution_ids: [...EXECUTION_IDS],
  });
const tokenIssued = () =>
  lifecycle("fencing_token_issued", { writer_execution_id: "exec-builder" }, { fencing_token: 1 });
const activated = () =>
  lifecycle("session_activated", { execution_ids: [...EXECUTION_IDS], readiness_snapshot_seq: 3 });
const paused = () => lifecycle("session_paused", { command_id: "cmd-pause-1", authorized_by: "founder" });
const interrupted = () =>
  lifecycle(
    "session_interrupted",
    {
      incident_id: INCIDENT_ID,
      reason: "child exited non-zero",
      severity: "high",
      source_event_id: null,
      reported_by_execution_id: null,
    },
    { reason_code: REASON_CODE, fencing_token: 1 },
  );
const invalidatedByInterruption = () =>
  lifecycle(
    "fencing_token_invalidated",
    { invalidation_reason: "interruption", incident_id: INCIDENT_ID },
    { fencing_token: 1 },
  );
const interruptionClosing = () =>
  lifecycle(
    "session_closing",
    { closure_kind: "interruption", incident_id: INCIDENT_ID, reason_code: REASON_CODE },
    { reason_code: REASON_CODE, fencing_token: 1 },
  );
const interruptionClosed = () =>
  lifecycle(
    "session_closed",
    { closure_kind: "interruption", incident_id: INCIDENT_ID, reason_code: REASON_CODE },
    { reason_code: REASON_CODE, fencing_token: 1 },
  );
const founderClosing = () =>
  lifecycle(
    "session_closing",
    { command_id: FOUNDER_COMMAND_ID, authorized_by: "founder", closure_kind: "founder", incident_id: null },
    { fencing_token: 1 },
  );
const founderClosed = () =>
  lifecycle(
    "session_closed",
    { command_id: FOUNDER_COMMAND_ID, authorized_by: "founder", closure_kind: "founder", incident_id: null },
    { fencing_token: 1 },
  );
const invalidatedByFounderClose = () =>
  lifecycle(
    "fencing_token_invalidated",
    { invalidation_reason: "founder_close", incident_id: null },
    { fencing_token: 1 },
  );
const aborted = () => lifecycle("session_abort", { abort_reason: "startup rollback" });

/** Durable histories keyed by the section 9.5 row they leave behind. */
const HISTORIES = {
  open_no_activation: () => [open(), tokenIssued()],
  open_no_activation_no_token: () => [open()],
  interrupted_only: () => [open(), tokenIssued(), activated(), interrupted()],
  interrupted_invalidated: () => [open(), tokenIssued(), activated(), interrupted(), invalidatedByInterruption()],
  interruption_through_closing: () => [
    open(), tokenIssued(), activated(), interrupted(), invalidatedByInterruption(), interruptionClosing(),
  ],
  founder_close_at_closing: () => [open(), tokenIssued(), activated(), founderClosing()],
  no_typed_terminal: () => [open(), tokenIssued(), activated()],
  no_typed_terminal_paused: () => [open(), tokenIssued(), activated(), paused()],
  complete_interruption: () => [
    open(), tokenIssued(), activated(), interrupted(), invalidatedByInterruption(), interruptionClosing(), interruptionClosed(),
  ],
  complete_founder: () => [open(), tokenIssued(), activated(), founderClosing(), invalidatedByFounderClose(), founderClosed()],
  complete_abort: () => [open(), aborted()],
} as const;

function rowsOf(events: readonly LedgerEventV1[]): LedgerRow[] {
  return events.map((event, index) => ({
    sequence: index + 1,
    event_id: (event as { event_id: string }).event_id,
    event_json: JSON.stringify(event),
    previous_hash: "d".repeat(64),
    event_hash: `${index + 1}`.padStart(64, "e"),
    created_at: (event as { created_at: string }).created_at,
  }));
}

function stateOf(events: readonly LedgerEventV1[]): LifecycleState {
  return events.reduce<LifecycleState>((state, event) => reduceLedgerEvent(state, event), INITIAL_LIFECYCLE_STATE);
}

const DURABLE_HEAD = "f".repeat(64);

function contextFor(overrides: Partial<PrefixContext> = {}): PrefixContext {
  return {
    taskEnvelopeHash: TASK_ENVELOPE_HASH,
    repositoryFingerprint: FINGERPRINT,
    previousEventHash: DURABLE_HEAD,
    lastDurableEventId: "durable-last",
    createdAt: "2026-09-11T01:00:00.000Z",
    eventIds: ["planned-1", "planned-2", "planned-3"],
    governedProcessesGone: true,
    founderCommandId: null,
    ...overrides,
  };
}

function typesOf(plan: readonly SessionLifecycleEventV1[]): string[] {
  return plan.map((event) => event.event_type);
}

function payloadOf(event: SessionLifecycleEventV1): Record<string, unknown> {
  return event.payload as unknown as Record<string, unknown>;
}

const VALIDATION_CONTEXT: LifecycleContext = {
  envelopeExecutionIds: [...EXECUTION_IDS],
  openIncidentId: INCIDENT_ID,
  openReasonCode: REASON_CODE,
};

// ─── The six rows ───

describe("section 9.5 durable-prefix completion", () => {
  test("prefix completion: open_no_activation", () => {
    const state = stateOf(HISTORIES.open_no_activation());
    expect(classifyDurablePrefix(state)).toBe("open_no_activation");

    const plan = planPrefixCompletion(state, contextFor());
    // Reducer-legal order: fencing_token_invalidated is accepted only in
    // interrupted, closing, or closed, so the abort lands first.
    expect(typesOf(plan)).toEqual(["session_abort", "fencing_token_invalidated"]);
    expect(payloadOf(plan[1]!)["invalidation_reason"]).toBe("rollback");
    expect(payloadOf(plan[1]!)["incident_id"]).toBeNull();
  });

  test("prefix completion: interrupted_only", () => {
    const state = stateOf(HISTORIES.interrupted_only());
    expect(classifyDurablePrefix(state)).toBe("interrupted_only");

    const plan = planPrefixCompletion(state, contextFor());
    expect(typesOf(plan)).toEqual(["fencing_token_invalidated", "session_closing", "session_closed"]);
    expect(payloadOf(plan[0]!)["invalidation_reason"]).toBe("interruption");
    expect(payloadOf(plan[1]!)["closure_kind"]).toBe("interruption");
    expect(payloadOf(plan[2]!)["closure_kind"]).toBe("interruption");
  });

  test("prefix completion: interrupted_invalidated", () => {
    const state = stateOf(HISTORIES.interrupted_invalidated());
    expect(classifyDurablePrefix(state)).toBe("interrupted_invalidated");

    const plan = planPrefixCompletion(state, contextFor());
    expect(typesOf(plan)).toEqual(["session_closing", "session_closed"]);
  });

  test("prefix completion: interruption_through_closing", () => {
    const state = stateOf(HISTORIES.interruption_through_closing());
    expect(classifyDurablePrefix(state)).toBe("interruption_through_closing");

    const plan = planPrefixCompletion(state, contextFor({ governedProcessesGone: true }));
    expect(typesOf(plan)).toEqual(["session_closed"]);
    expect(payloadOf(plan[0]!)["closure_kind"]).toBe("interruption");
  });

  test("prefix completion: founder_close_at_closing", () => {
    const state = stateOf(HISTORIES.founder_close_at_closing());
    expect(classifyDurablePrefix(state)).toBe("founder_close_at_closing");

    const plan = planPrefixCompletion(
      state,
      contextFor({ governedProcessesGone: true, founderCommandId: FOUNDER_COMMAND_ID }),
    );
    expect(typesOf(plan)).toEqual(["fencing_token_invalidated", "session_closed"]);
    expect(payloadOf(plan[0]!)["invalidation_reason"]).toBe("founder_close");
    expect(payloadOf(plan[1]!)).toEqual({
      command_id: FOUNDER_COMMAND_ID,
      authorized_by: "founder",
      closure_kind: "founder",
      incident_id: null,
    });
  });

  test("prefix completion: no_typed_terminal", () => {
    for (const history of [HISTORIES.no_typed_terminal(), HISTORIES.no_typed_terminal_paused()]) {
      const state = stateOf(history);
      expect(classifyDurablePrefix(state)).toBe("no_typed_terminal");

      const plan = planPrefixCompletion(state, contextFor());
      // Reducer-legal order: the unclean closure moves the phase to closed,
      // which is the only phase in which the invalidation is accepted.
      expect(typesOf(plan)).toEqual(["session_unclean_closure", "fencing_token_invalidated"]);
      expect(payloadOf(plan[0]!)).toEqual({ detected_at_startup: true, last_durable_event_id: "durable-last" });
      expect(payloadOf(plan[1]!)["invalidation_reason"]).toBe("rollback");
    }
  });
});

// ─── Named invariants ───

describe("section 9.5 invariants", () => {
  test("prefix completion reuses the original incident id and reason code", () => {
    for (const history of [HISTORIES.interrupted_only(), HISTORIES.interrupted_invalidated(), HISTORIES.interruption_through_closing()]) {
      const state = stateOf(history);
      const plan = planPrefixCompletion(state, contextFor());
      for (const event of plan) {
        const payload = payloadOf(event);
        if (event.event_type === "fencing_token_invalidated") {
          expect(payload["incident_id"]).toBe(INCIDENT_ID);
        } else {
          expect(payload["incident_id"]).toBe(INCIDENT_ID);
          expect(payload["reason_code"]).toBe(REASON_CODE);
          expect(event.reason_code).toBe(REASON_CODE);
        }
      }
    }
  });

  test("prefix completion never emits a Founder session_close", () => {
    for (const history of [HISTORIES.interrupted_only(), HISTORIES.interrupted_invalidated(), HISTORIES.interruption_through_closing()]) {
      const plan = planPrefixCompletion(stateOf(history), contextFor({ founderCommandId: FOUNDER_COMMAND_ID }));
      for (const event of plan) {
        const payload = payloadOf(event);
        expect(payload["closure_kind"]).not.toBe("founder");
        expect(payload["command_id"]).toBeUndefined();
        expect(payload["authorized_by"]).toBeUndefined();
        expect(event.event_type as string).not.toBe("session_close");
      }
    }
    // Founder-close completion reuses the durable command and mints no new one.
    const founderPlan = planPrefixCompletion(
      stateOf(HISTORIES.founder_close_at_closing()),
      contextFor({ founderCommandId: FOUNDER_COMMAND_ID }),
    );
    expect(typesOf(founderPlan)).not.toContain("session_closing");
    expect(payloadOf(founderPlan[1]!)["command_id"]).toBe(FOUNDER_COMMAND_ID);
  });

  test("session_closed preceding session_closing throws ReconciliationOrderError", () => {
    const impossible = rowsOf([open(), tokenIssued(), activated(), founderClosed()]);
    expect(() => replayDurablePrefix(impossible)).toThrow(ReconciliationOrderError);
    try {
      replayDurablePrefix(impossible);
    } catch (error) {
      expect(error).toBeInstanceOf(ReconciliationOrderError);
      expect((error as ReconciliationOrderError).kind).toBe("impossible_order");
    }
  });

  test("session_unclean_closure is not appended after a completed typed interruption sequence", () => {
    const state = stateOf(HISTORIES.complete_interruption());
    expect(classifyDurablePrefix(state)).toBe("complete");
    expect(planPrefixCompletion(state, contextFor())).toEqual([]);

    // Nor after any typed interruption/closing prefix or an abort.
    for (const history of [
      HISTORIES.interrupted_only(),
      HISTORIES.interrupted_invalidated(),
      HISTORIES.interruption_through_closing(),
      HISTORIES.founder_close_at_closing(),
      HISTORIES.complete_abort(),
      HISTORIES.complete_founder(),
    ]) {
      const plan = planPrefixCompletion(stateOf(history), contextFor({ founderCommandId: FOUNDER_COMMAND_ID }));
      expect(typesOf(plan)).not.toContain("session_unclean_closure");
    }
  });
});

// ─── Additional required coverage ───

describe("section 9.5 completion details", () => {
  test("already complete prefix emits no records", () => {
    for (const state of [
      INITIAL_LIFECYCLE_STATE,
      stateOf(HISTORIES.complete_interruption()),
      stateOf(HISTORIES.complete_founder()),
      stateOf(HISTORIES.complete_abort()),
    ]) {
      expect(classifyDurablePrefix(state)).toBe("complete");
      expect(planPrefixCompletion(state, contextFor())).toEqual([]);
    }
  });

  test("startup with no issued token emits only session_abort", () => {
    const plan = planPrefixCompletion(stateOf(HISTORIES.open_no_activation_no_token()), contextFor());
    expect(typesOf(plan)).toEqual(["session_abort"]);
  });

  test("startup with an issued token emits the rollback invalidation with the abort, in reducer-legal order", () => {
    const plan = planPrefixCompletion(stateOf(HISTORIES.open_no_activation()), contextFor());
    expect(typesOf(plan)).toEqual(["session_abort", "fencing_token_invalidated"]);
    expect(plan[1]!.fencing_token).toBe(1);
  });

  test("interruption with valid token invalidates before closing", () => {
    const plan = planPrefixCompletion(stateOf(HISTORIES.interrupted_only()), contextFor());
    expect(typesOf(plan).indexOf("fencing_token_invalidated")).toBeLessThan(typesOf(plan).indexOf("session_closing"));
  });

  test("interrupted-invalidated does not invalidate twice", () => {
    const plan = planPrefixCompletion(stateOf(HISTORIES.interrupted_invalidated()), contextFor());
    expect(typesOf(plan).filter((type) => type === "fencing_token_invalidated")).toEqual([]);
  });

  test("closing prefixes never emit a second session_closing", () => {
    const interruption = planPrefixCompletion(stateOf(HISTORIES.interruption_through_closing()), contextFor());
    const founder = planPrefixCompletion(
      stateOf(HISTORIES.founder_close_at_closing()),
      contextFor({ founderCommandId: FOUNDER_COMMAND_ID }),
    );
    expect(typesOf(interruption)).not.toContain("session_closing");
    expect(typesOf(founder)).not.toContain("session_closing");
    expect(typesOf(interruption).filter((type) => type === "session_closed")).toHaveLength(1);
    expect(typesOf(founder).filter((type) => type === "session_closed")).toHaveLength(1);
  });

  test("Founder-close completion uses founder_close invalidation semantics", () => {
    const plan = planPrefixCompletion(
      stateOf(HISTORIES.founder_close_at_closing()),
      contextFor({ founderCommandId: FOUNDER_COMMAND_ID }),
    );
    expect(payloadOf(plan[0]!)).toEqual({ invalidation_reason: "founder_close", incident_id: null });
    expect(plan[1]!.reason_code).toBeNull();
  });

  test("interruption completion uses interruption semantics and preserves incident linkage", () => {
    const plan = planPrefixCompletion(stateOf(HISTORIES.interrupted_only()), contextFor());
    expect(payloadOf(plan[0]!)).toEqual({ invalidation_reason: "interruption", incident_id: INCIDENT_ID });
    expect(payloadOf(plan[1]!)).toEqual({ closure_kind: "interruption", incident_id: INCIDENT_ID, reason_code: REASON_CODE });
    expect(payloadOf(plan[2]!)).toEqual({ closure_kind: "interruption", incident_id: INCIDENT_ID, reason_code: REASON_CODE });
  });

  test("session_closed occurs only after affirmative governed-process-absence proof for rows requiring it", () => {
    const withoutProof = contextFor({ governedProcessesGone: null, founderCommandId: FOUNDER_COMMAND_ID });
    expect(() => planPrefixCompletion(stateOf(HISTORIES.interruption_through_closing()), withoutProof)).toThrow(
      /governed process/,
    );
    expect(() => planPrefixCompletion(stateOf(HISTORIES.founder_close_at_closing()), withoutProof)).toThrow(
      /governed process/,
    );
    // Rows that do not close from `closing` do not require the proof.
    expect(typesOf(planPrefixCompletion(stateOf(HISTORIES.interrupted_only()), contextFor({ governedProcessesGone: null })))).toEqual([
      "fencing_token_invalidated",
      "session_closing",
      "session_closed",
    ]);
  });

  test("Founder-close completion requires the durable command id and fabricates none", () => {
    expect(() =>
      planPrefixCompletion(stateOf(HISTORIES.founder_close_at_closing()), contextFor({ founderCommandId: null })),
    ).toThrow(/command_id/);
  });

  test("generated events parse as valid lifecycle records", () => {
    const cases: Array<[readonly LedgerEventV1[], Partial<PrefixContext>]> = [
      [HISTORIES.open_no_activation(), {}],
      [HISTORIES.interrupted_only(), {}],
      [HISTORIES.interrupted_invalidated(), {}],
      [HISTORIES.interruption_through_closing(), {}],
      [HISTORIES.founder_close_at_closing(), { founderCommandId: FOUNDER_COMMAND_ID }],
      [HISTORIES.no_typed_terminal(), {}],
    ];
    for (const [history, overrides] of cases) {
      const plan = planPrefixCompletion(stateOf(history), contextFor(overrides));
      expect(plan.length).toBeGreaterThan(0);
      for (const event of plan) {
        const parsed = parseSessionLifecycleEvent(
          JSON.parse(JSON.stringify(event)) as Record<string, unknown>,
          VALIDATION_CONTEXT,
        );
        expect(parsed.actor).toBe("madbridge");
        expect(parsed.session_id).toBe(SESSION_ID);
        expect(parsed.task_envelope_hash).toBe(TASK_ENVELOPE_HASH);
        expect(parsed.repository_fingerprint).toEqual(FINGERPRINT);
        expect(parsed.created_at).toBe("2026-09-11T01:00:00.000Z");
      }
    }
  });

  test("generated events replay successfully through reduceLedgerEvent", () => {
    const cases: Array<[readonly LedgerEventV1[], Partial<PrefixContext>, string]> = [
      [HISTORIES.open_no_activation(), {}, "invalidated"],
      [HISTORIES.open_no_activation_no_token(), {}, "not_issued"],
      [HISTORIES.interrupted_only(), {}, "invalidated"],
      [HISTORIES.interrupted_invalidated(), {}, "invalidated"],
      [HISTORIES.interruption_through_closing(), {}, "invalidated"],
      [HISTORIES.founder_close_at_closing(), { founderCommandId: FOUNDER_COMMAND_ID }, "invalidated"],
      [HISTORIES.no_typed_terminal(), {}, "invalidated"],
      [HISTORIES.no_typed_terminal_paused(), {}, "invalidated"],
    ];
    for (const [history, overrides, tokenState] of cases) {
      const before = stateOf(history);
      const plan = planPrefixCompletion(before, contextFor(overrides));
      const after = plan.reduce<LifecycleState>((state, event) => reduceLedgerEvent(state, event), before);
      expect(after.phase).toBe("closed");
      expect(after.tokenUsable).toBe(false);
      expect(after.tokenState).toBe(tokenState as LifecycleState["tokenState"]);
      // A completed prefix is complete: replanning emits nothing.
      expect(classifyDurablePrefix(after)).toBe("complete");
      expect(planPrefixCompletion(after, contextFor(overrides))).toEqual([]);
    }
  });

  test("returned order matches section 9.5", () => {
    const expected: Record<PrefixKind, readonly string[]> = {
      open_no_activation: ["session_abort", "fencing_token_invalidated"],
      interrupted_only: ["fencing_token_invalidated", "session_closing", "session_closed"],
      interrupted_invalidated: ["session_closing", "session_closed"],
      interruption_through_closing: ["session_closed"],
      founder_close_at_closing: ["fencing_token_invalidated", "session_closed"],
      no_typed_terminal: ["session_unclean_closure", "fencing_token_invalidated"],
    };
    for (const [kind, types] of Object.entries(expected) as Array<[PrefixKind, readonly string[]]>) {
      const state = stateOf(HISTORIES[kind]());
      expect(classifyDurablePrefix(state)).toBe(kind);
      expect(typesOf(planPrefixCompletion(state, contextFor({ founderCommandId: FOUNDER_COMMAND_ID })))).toEqual([...types]);
    }
  });

  test("event-level previous hashes chain in order from the durable head", () => {
    const plan = planPrefixCompletion(stateOf(HISTORIES.interrupted_only()), contextFor());
    expect(plan).toHaveLength(3);
    expect(plan[0]!.previous_event_hash).toBe(DURABLE_HEAD);
    let previous = DURABLE_HEAD;
    for (const event of plan) {
      expect(event.previous_event_hash).toBe(previous);
      previous = computeEventHash(previous, canonicalJson(event));
    }
    expect(plan.map((event) => event.event_id)).toEqual(["planned-1", "planned-2", "planned-3"]);
  });

  test("Ledger.appendMany(plan) persists all planned records atomically and in order", () => {
    const ledger = new Ledger(":memory:");
    try {
      const durable = ledger.appendMany(HISTORIES.interrupted_only());
      const head = durable[durable.length - 1]!;
      const state = replayDurablePrefix(ledger.readAfter(0));
      expect(classifyDurablePrefix(state)).toBe("interrupted_only");

      const plan = planPrefixCompletion(
        state,
        contextFor({ previousEventHash: head.event_hash, lastDurableEventId: head.event_id }),
      );
      const rows = ledger.appendMany(plan);

      expect(rows.map((row) => row.event_id)).toEqual(plan.map((event) => event.event_id));
      rows.forEach((row, index) => {
        expect(row.previous_hash).toBe(plan[index]!.previous_event_hash);
        expect(row.sequence).toBe(durable.length + index + 1);
      });
      const verified = ledger.verify();
      expect(verified.valid).toBe(true);
      expect(verified.count).toBe(durable.length + plan.length);
      expect(classifyDurablePrefix(replayDurablePrefix(ledger.readAfter(0)))).toBe("complete");

      // Atomicity: a batch that the chain rejects persists nothing.
      const before = ledger.verify().count;
      const duplicate = [{ ...plan[0]! }] as unknown as readonly LedgerEventV1[];
      expect(() => ledger.appendMany(duplicate)).toThrow(/UNIQUE constraint failed: events\.event_id/);
      expect(ledger.verify().count).toBe(before);
    } finally {
      ledger.close();
    }
  });
});
