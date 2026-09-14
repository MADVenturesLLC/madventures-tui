// packages/broker/test/fencing.test.ts
// Phase 3A M8 Task 18: deterministic fencing-token issuance, transfer,
// invalidation, and composite token identity (specification section 9.5;
// plan Task 18 with the 2026-09-13 Founder event-construction context ruling).
//
// Invariants under test: the token value is derived, never random; the first
// token of every session is exactly 1; a transfer is current + 1; pause neither
// invalidates nor increments; interruption is a one-way door; every carried
// record value originates with the caller through FencingRecordContext.
//
// Phase 3A M8 Task 19 (RuntimeBroker over the real Ledger) is appended after
// the Task 18 sections; the Task 18 tests are unchanged.

import { describe, expect, test } from "bun:test";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  FencingError,
  INITIAL_FENCING_TOKEN,
  invalidateToken,
  issueInitialToken,
  issueTransferToken,
  tokenKey,
} from "../src/fencing";
import type { FencingRecordContext } from "../src/fencing";
import { RuntimeBroker, RuntimeBrokerError } from "../src/runtime-broker";
import type { LifecycleObservation, RuntimeBrokerDeps, RuntimeBrokerProvenance } from "../src/runtime-broker";
import { GENESIS_HASH, INITIAL_LIFECYCLE_STATE, Ledger, ReducerError, reduceLedgerEvent } from "@madventures/ledger";
import type { LedgerRow, LifecycleState } from "@madventures/ledger";
import { PROTOCOL_VERSION } from "@madventures/protocol";
import type { LedgerEventV1, RepositoryFingerprint, SessionLifecycleEventV1 } from "@madventures/protocol";
import { parseSessionLifecycleEvent } from "../../protocol/src/lifecycle-events";
import type { LifecycleContext } from "../../protocol/src/lifecycle-events";

// ─── Fixtures ───

const SESSION_ID = "ses-fencing-001";
const SUCCESSOR_SESSION_ID = "ses-fencing-002";
const WRITER_A = "exec-writer-a";
const WRITER_B = "exec-writer-b";
const INCIDENT_ID = "incident-fencing-9";
const NUL = String.fromCharCode(0);
const FINGERPRINT: RepositoryFingerprint = {
  kind: "commit",
  sha256: "b".repeat(64),
  git_sha: "c".repeat(40),
};

const CTX: FencingRecordContext = {
  taskEnvelopeHash: "a".repeat(64),
  repositoryFingerprint: FINGERPRINT,
  previousEventHash: "d".repeat(64),
  createdAt: "2026-09-13T12:00:00.000Z",
  eventId: "evt-fencing-0001",
};

function ctx(overrides: Partial<FencingRecordContext> = {}): FencingRecordContext {
  return { ...CTX, ...overrides };
}

const PARSE_CONTEXT: LifecycleContext = {
  envelopeExecutionIds: [WRITER_A, WRITER_B],
  openIncidentId: null,
  openReasonCode: null,
};

function state(overrides: Partial<LifecycleState>): LifecycleState {
  return { ...INITIAL_LIFECYCLE_STATE, sessionId: SESSION_ID, ...overrides };
}

const openNotIssued = () =>
  state({ phase: "starting", fencingToken: null, tokenState: "not_issued", tokenUsable: false });
const issuedStarting = () =>
  state({ phase: "starting", fencingToken: 1, tokenState: "valid", tokenUsable: true });
const active = (token = 1) =>
  state({ phase: "active", fencingToken: token, tokenState: "valid", tokenUsable: true });
const paused = (token = 1) =>
  state({ phase: "paused", fencingToken: token, tokenState: "valid", tokenUsable: true });
const interruptedValid = (token = 1) =>
  state({
    phase: "interrupted",
    fencingToken: token,
    tokenState: "valid",
    tokenUsable: false,
    incident: { id: INCIDENT_ID, reason: "child exited non-zero", timestamp: CTX.createdAt, severity: "high" },
    reasonCode: "child_failure",
  });
const interruptedInvalidated = (token = 1) =>
  state({ ...interruptedValid(token), tokenState: "invalidated", tokenUsable: false });
const closingFounder = (token = 1) =>
  state({ phase: "closing", fencingToken: token, tokenState: "valid", tokenUsable: false, closureKind: "founder" });
const closedAbort = (token = 1) =>
  state({ phase: "closed", fencingToken: token, tokenState: "valid", tokenUsable: false, closureKind: "abort" });

let fixtureSequence = 0;
function lifecycle(eventType: string, payload: unknown, overrides: Record<string, unknown> = {}): LedgerEventV1 {
  fixtureSequence += 1;
  return {
    protocol_version: PROTOCOL_VERSION,
    event_id: `fixture-${eventType}-${fixtureSequence}`,
    session_id: SESSION_ID,
    event_type: eventType,
    actor: "madbridge",
    task_envelope_hash: CTX.taskEnvelopeHash,
    repository_fingerprint: FINGERPRINT,
    fencing_token: null,
    reason_code: null,
    created_at: CTX.createdAt,
    previous_event_hash: CTX.previousEventHash,
    payload,
    ...overrides,
  } as unknown as LedgerEventV1;
}

const asLedgerEvent = (event: SessionLifecycleEventV1): LedgerEventV1 => event as unknown as LedgerEventV1;
const asRaw = (event: SessionLifecycleEventV1): Record<string, unknown> =>
  event as unknown as Record<string, unknown>;

function captureFencingError(fn: () => unknown): FencingError {
  let caught: unknown;
  try {
    fn();
  } catch (err) {
    caught = err;
  }
  expect(caught).toBeInstanceOf(FencingError);
  return caught as FencingError;
}

// ─── Plan-named tests ───

describe("Task 18 named tests", () => {
  test("the initial token is exactly 1", () => {
    expect(INITIAL_FENCING_TOKEN).toBe(1);
    const event = issueInitialToken(SESSION_ID, WRITER_A, CTX);
    expect(event.event_type).toBe("fencing_token_issued");
    expect(event.fencing_token).toBe(1);
    expect(event.session_id).toBe(SESSION_ID);
    expect(event.payload).toEqual({ writer_execution_id: WRITER_A });
  });

  test("pause neither invalidates nor increments the token", () => {
    // Replay through the canonical reducer: open, issue, activate, pause.
    let s = reduceLedgerEvent(
      INITIAL_LIFECYCLE_STATE,
      lifecycle("session_open", {
        authorization_reference: "FOUNDER-20260913-18",
        execution_ids: [WRITER_A, WRITER_B],
      }),
    );
    s = reduceLedgerEvent(s, asLedgerEvent(issueInitialToken(SESSION_ID, WRITER_A, CTX)));
    s = reduceLedgerEvent(
      s,
      lifecycle(
        "session_activated",
        { execution_ids: [WRITER_A, WRITER_B], readiness_snapshot_seq: 1 },
        { fencing_token: 1 },
      ),
    );
    const before = s;
    s = reduceLedgerEvent(
      s,
      lifecycle("session_paused", { command_id: "cmd-pause-1", authorized_by: "founder" }, { fencing_token: 1 }),
    );
    expect(s.phase).toBe("paused");
    expect(s.fencingToken).toBe(before.fencingToken);
    expect(s.fencingToken).toBe(1);
    expect(s.tokenState).toBe("valid");
    expect(s.tokenUsable).toBe(true);
    // Task 18 emits nothing for a pause: no fencing helper is involved, and a
    // transfer attempted while paused is rejected rather than incrementing.
    const err = captureFencingError(() => issueTransferToken(s, WRITER_B, CTX));
    expect(err.kind).toBe("invalid_phase");
  });

  test("an ownership transfer increments the token and appends fencing_token_issued", () => {
    const current = active(1);
    const event = issueTransferToken(current, WRITER_B, ctx({ eventId: "evt-transfer-1" }));
    expect(event.event_type).toBe("fencing_token_issued");
    expect(event.fencing_token).toBe(2);
    expect(event.session_id).toBe(SESSION_ID);
    expect(event.payload).toEqual({ writer_execution_id: WRITER_B });
    // The canonical reducer accepts the appended record and advances the token.
    const next = reduceLedgerEvent(current, asLedgerEvent(event));
    expect(next.fencingToken).toBe(2);
    expect(next.tokenState).toBe("valid");
    expect(next.phase).toBe("active");
  });

  test("no token can be re-issued after interruption", () => {
    for (const s of [interruptedValid(1), interruptedInvalidated(1)]) {
      const err = captureFencingError(() => issueTransferToken(s, WRITER_B, CTX));
      expect(err.kind).toBe("invalid_phase");
      expect(err.name).toBe("FencingError");
    }
  });

  test("a successor session begins again at 1", () => {
    const priorSession = active(5);
    const transferred = issueTransferToken(priorSession, WRITER_B, CTX);
    expect(transferred.fencing_token).toBe(6);
    const successor = issueInitialToken(SUCCESSOR_SESSION_ID, WRITER_A, ctx({ eventId: "evt-successor-1" }));
    expect(successor.fencing_token).toBe(1);
    expect(successor.session_id).toBe(SUCCESSOR_SESSION_ID);
    // No cross-session monotonicity: the successor's 1 is below the prior 6.
    expect(successor.fencing_token).toBeLessThan(transferred.fencing_token as number);
  });
});

// ─── Initial issuance ───

describe("initial issuance", () => {
  test("initial issuance is deterministic and returns a protocol-valid record", () => {
    const first = issueInitialToken(SESSION_ID, WRITER_A, CTX);
    const second = issueInitialToken(SESSION_ID, WRITER_A, CTX);
    expect(second).toEqual(first);
    expect(parseSessionLifecycleEvent(asRaw(first), PARSE_CONTEXT)).toEqual(first);
    expect(first.protocol_version).toBe(PROTOCOL_VERSION);
    expect(first.actor).toBe("madbridge");
    expect(first.reason_code).toBeNull();
  });

  test("initial issuance is legal only before activation in the canonical reducer", () => {
    const opened = reduceLedgerEvent(
      INITIAL_LIFECYCLE_STATE,
      lifecycle("session_open", {
        authorization_reference: "FOUNDER-20260913-18",
        execution_ids: [WRITER_A, WRITER_B],
      }),
    );
    expect(opened.phase).toBe("starting");
    expect(opened.fencingToken).toBeNull();
    expect(opened.tokenState).toBe("not_issued");
    // Activation without issuance is rejected: issuance precedes activation.
    expect(() =>
      reduceLedgerEvent(
        opened,
        lifecycle("session_activated", { execution_ids: [WRITER_A, WRITER_B], readiness_snapshot_seq: 1 }),
      ),
    ).toThrow(ReducerError);
    const issued = reduceLedgerEvent(opened, asLedgerEvent(issueInitialToken(SESSION_ID, WRITER_A, CTX)));
    expect(issued.phase).toBe("starting");
    expect(issued.fencingToken).toBe(1);
    expect(issued.tokenState).toBe("valid");
    expect(issued.tokenUsable).toBe(true);
  });

  test("no token exists during preflight or initial starting until issuance", () => {
    expect(INITIAL_LIFECYCLE_STATE.fencingToken).toBeNull();
    expect(INITIAL_LIFECYCLE_STATE.tokenState).toBe("not_issued");
    const err = captureFencingError(() => issueTransferToken(openNotIssued(), WRITER_B, CTX));
    expect(err.kind).toBe("missing_fencing_token");
  });

  test("the initial token value is independent of session, writer, and context values", () => {
    const variants = [
      issueInitialToken("ses-x", "exec-9", ctx({ createdAt: "2030-01-01T00:00:00.000Z" })),
      issueInitialToken("ses-y", "exec-1", ctx({ eventId: "evt-other", previousEventHash: "e".repeat(64) })),
      issueInitialToken(SESSION_ID, WRITER_B, ctx({ taskEnvelopeHash: "f".repeat(64) })),
    ];
    for (const v of variants) expect(v.fencing_token).toBe(INITIAL_FENCING_TOKEN);
  });
});

// ─── FencingRecordContext: mechanical carrier, no ambient discovery ───

describe("FencingRecordContext is copied exactly and never generated", () => {
  test("every carried value in an issued record equals the caller-supplied context", () => {
    const c = ctx({
      taskEnvelopeHash: "1".repeat(64),
      previousEventHash: "2".repeat(64),
      createdAt: "2027-05-05T05:05:05.000Z",
      eventId: "evt-exact-copy",
    });
    const event = issueInitialToken(SESSION_ID, WRITER_A, c);
    expect(event.task_envelope_hash).toBe(c.taskEnvelopeHash);
    expect(event.previous_event_hash).toBe(c.previousEventHash);
    expect(event.created_at).toBe(c.createdAt);
    expect(event.event_id).toBe(c.eventId);
    expect(event.repository_fingerprint).toEqual(c.repositoryFingerprint);
  });

  test("every carried value in transfer and invalidation records equals the caller-supplied context", () => {
    const c = ctx({ eventId: "evt-ctx-2", createdAt: "2028-01-02T03:04:05.000Z", previousEventHash: "3".repeat(64) });
    const transfer = issueTransferToken(active(3), WRITER_B, c);
    const invalidation = invalidateToken(interruptedValid(3), "interruption", INCIDENT_ID, c);
    for (const event of [transfer, invalidation]) {
      expect(event.event_id).toBe(c.eventId);
      expect(event.created_at).toBe(c.createdAt);
      expect(event.previous_event_hash).toBe(c.previousEventHash);
      expect(event.task_envelope_hash).toBe(c.taskEnvelopeHash);
      expect(event.repository_fingerprint).toEqual(c.repositoryFingerprint);
    }
  });

  test("no ambient timestamp or event id: identical inputs always yield identical records", () => {
    const a = issueTransferToken(active(1), WRITER_B, CTX);
    const b = issueTransferToken(active(1), WRITER_B, CTX);
    expect(b).toEqual(a);
    const x = invalidateToken(closingFounder(2), "founder_close", null, CTX);
    const y = invalidateToken(closingFounder(2), "founder_close", null, CTX);
    expect(y).toEqual(x);
  });

  test("the production module performs no clock, random, filesystem, environment, or ledger discovery", () => {
    const source = readFileSync(join(import.meta.dir, "..", "src", "fencing.ts"), "utf8");
    const forbidden = [
      /new Date\b/,
      /Date\.now\b/,
      /performance\.now\b/,
      /hrtime\b/,
      /randomUUID\b/,
      /getRandomValues\b/,
      /Math\.random\b/,
      /\bcrypto\b/,
      /process\.env\b/,
      /\bBun\.file\b/,
      /readFileSync|readdirSync|node:fs\b|from "fs"/,
      /child_process|node:child_process/,
      /\bLedger\b|readAfter|bun:sqlite/,
      /computeEventHash|canonicalJson/,
      /fingerprintRepository|repositoryFingerprint\(/,
    ];
    for (const pattern of forbidden) {
      expect(source).not.toMatch(pattern);
    }
    // The only value import is the protocol version constant; every other
    // workspace import is type-only, so no value import can carry discovery.
    const valueImports = source.split("\n").filter((l) => /^import\s+(?!type\b)/.test(l));
    expect(valueImports).toEqual(['import { PROTOCOL_VERSION } from "@madventures/protocol";']);
  });
});

// ─── Ownership transfer ───

describe("ownership transfer", () => {
  test("a transfer preserves the session identity and records the new writer", () => {
    const event = issueTransferToken(active(4), WRITER_B, CTX);
    expect(event.session_id).toBe(SESSION_ID);
    expect(event.payload).toEqual({ writer_execution_id: WRITER_B });
    expect(parseSessionLifecycleEvent(asRaw(event), PARSE_CONTEXT)).toEqual(event);
  });

  test("a transfer increments by exactly one, never more, across a long chain", () => {
    let s = active(1);
    for (let expected = 2; expected <= 25; expected += 1) {
      const event = issueTransferToken(
        s,
        expected % 2 === 0 ? WRITER_B : WRITER_A,
        ctx({ eventId: `evt-chain-${expected}` }),
      );
      expect(event.fencing_token).toBe(expected);
      s = reduceLedgerEvent(s, asLedgerEvent(event));
      expect(s.fencingToken).toBe(expected);
    }
  });

  test("a transfer is legal while the issued session is still starting and does not change phase", () => {
    const event = issueTransferToken(issuedStarting(), WRITER_B, CTX);
    expect(event.fencing_token).toBe(2);
    const next = reduceLedgerEvent(issuedStarting(), asLedgerEvent(event));
    expect(next.phase).toBe("starting");
    expect(next.fencingToken).toBe(2);
  });

  test("a transfer never issues token 1 while a current token exists", () => {
    const event = issueTransferToken(active(1), WRITER_B, CTX);
    expect(event.fencing_token).not.toBe(INITIAL_FENCING_TOKEN);
    expect(event.fencing_token).toBe(2);
  });

  test("transfer with a null session fails closed with missing_session_id and substitutes nothing", () => {
    for (const s of [INITIAL_LIFECYCLE_STATE, { ...active(1), sessionId: null }]) {
      const err = captureFencingError(() => issueTransferToken(s, WRITER_B, CTX));
      expect(err.kind).toBe("missing_session_id");
    }
  });

  test("transfer fails closed on every phase outside starting and active", () => {
    for (const s of [paused(1), interruptedValid(1), closingFounder(1), closedAbort(1)]) {
      const err = captureFencingError(() => issueTransferToken(s, WRITER_B, CTX));
      expect(err.kind).toBe("invalid_phase");
    }
  });

  test("transfer fails closed when no current token has been issued", () => {
    const err = captureFencingError(() => issueTransferToken(openNotIssued(), WRITER_B, CTX));
    expect(err.kind).toBe("missing_fencing_token");
  });

  test("transfer fails closed on an invalidated, unusable, or malformed token state", () => {
    const cases: LifecycleState[] = [
      state({ phase: "active", fencingToken: 1, tokenState: "invalidated", tokenUsable: false }),
      state({ phase: "active", fencingToken: 1, tokenState: "valid", tokenUsable: false }),
      state({ phase: "active", fencingToken: 0, tokenState: "valid", tokenUsable: true }),
      state({ phase: "active", fencingToken: -1, tokenState: "valid", tokenUsable: true }),
      state({ phase: "active", fencingToken: 1.5, tokenState: "valid", tokenUsable: true }),
      state({ phase: "active", fencingToken: Number.NaN, tokenState: "valid", tokenUsable: true }),
      state({ phase: "active", fencingToken: null, tokenState: "valid", tokenUsable: true }),
    ];
    for (const s of cases) {
      const err = captureFencingError(() => issueTransferToken(s, WRITER_B, CTX));
      expect(err.kind).toBe("invalid_token_state");
    }
  });
});

// ─── Invalidation ───

describe("invalidation", () => {
  test("interruption invalidates the current token and carries the incident id", () => {
    const s = interruptedValid(3);
    const event = invalidateToken(s, "interruption", INCIDENT_ID, CTX);
    expect(event.event_type).toBe("fencing_token_invalidated");
    expect(event.fencing_token).toBe(3);
    expect(event.session_id).toBe(SESSION_ID);
    expect(event.payload).toEqual({ invalidation_reason: "interruption", incident_id: INCIDENT_ID });
    const next = reduceLedgerEvent(s, asLedgerEvent(event));
    expect(next.tokenState).toBe("invalidated");
    expect(next.tokenUsable).toBe(false);
    expect(next.fencingToken).toBe(3);
    expect(
      parseSessionLifecycleEvent(asRaw(event), {
        ...PARSE_CONTEXT,
        openIncidentId: INCIDENT_ID,
        openReasonCode: "child_failure",
      }),
    ).toEqual(event);
  });

  test("Founder close invalidates the current token at closing with a null incident", () => {
    const s = closingFounder(2);
    const event = invalidateToken(s, "founder_close", null, CTX);
    expect(event.payload).toEqual({ invalidation_reason: "founder_close", incident_id: null });
    expect(event.fencing_token).toBe(2);
    const next = reduceLedgerEvent(s, asLedgerEvent(event));
    expect(next.tokenState).toBe("invalidated");
    expect(parseSessionLifecycleEvent(asRaw(event), PARSE_CONTEXT)).toEqual(event);
  });

  test("rollback invalidates the current token at closed with a null incident", () => {
    const s = closedAbort(1);
    const event = invalidateToken(s, "rollback", null, CTX);
    expect(event.payload).toEqual({ invalidation_reason: "rollback", incident_id: null });
    const next = reduceLedgerEvent(s, asLedgerEvent(event));
    expect(next.tokenState).toBe("invalidated");
    expect(next.phase).toBe("closed");
  });

  test("invalidation never mints a replacement token", () => {
    for (const [s, reason] of [
      [interruptedValid(7), "interruption"],
      [closingFounder(7), "founder_close"],
      [closedAbort(7), "rollback"],
    ] as const) {
      const event = invalidateToken(s, reason, reason === "interruption" ? INCIDENT_ID : null, CTX);
      expect(event.fencing_token).toBe(7);
      expect(event.event_type).toBe("fencing_token_invalidated");
    }
  });

  test("the incident id is preserved exactly, including a caller-supplied null", () => {
    expect(invalidateToken(interruptedValid(1), "interruption", "incident-custom-42", CTX).payload).toEqual({
      invalidation_reason: "interruption",
      incident_id: "incident-custom-42",
    });
    expect(invalidateToken(interruptedValid(1), "interruption", null, CTX).payload).toEqual({
      invalidation_reason: "interruption",
      incident_id: null,
    });
  });

  test("invalidation with a null session fails closed with missing_session_id", () => {
    for (const s of [INITIAL_LIFECYCLE_STATE, { ...interruptedValid(1), sessionId: null }]) {
      const err = captureFencingError(() => invalidateToken(s, "interruption", INCIDENT_ID, CTX));
      expect(err.kind).toBe("missing_session_id");
    }
  });

  test("invalidation fails closed in starting, active, and paused", () => {
    for (const s of [issuedStarting(), active(1), paused(1)]) {
      const err = captureFencingError(() => invalidateToken(s, "rollback", null, CTX));
      expect(err.kind).toBe("invalid_phase");
    }
  });

  test("invalidation fails closed when no token was issued or the token is already invalidated", () => {
    const none = captureFencingError(() =>
      invalidateToken(
        state({ phase: "closed", fencingToken: null, tokenState: "not_issued", tokenUsable: false, closureKind: "abort" }),
        "rollback",
        null,
        CTX,
      ),
    );
    expect(none.kind).toBe("missing_fencing_token");
    const again = captureFencingError(() => invalidateToken(interruptedInvalidated(1), "interruption", INCIDENT_ID, CTX));
    expect(again.kind).toBe("invalid_token_state");
  });

  test("after interruption and invalidation the canonical reducer forbids any further issuance in-session", () => {
    const s = reduceLedgerEvent(
      interruptedValid(1),
      asLedgerEvent(invalidateToken(interruptedValid(1), "interruption", INCIDENT_ID, CTX)),
    );
    expect(s.tokenState).toBe("invalidated");
    // Task 18 refuses first; the reducer would also reject the record.
    expect(captureFencingError(() => issueTransferToken(s, WRITER_B, CTX)).kind).toBe("invalid_phase");
    expect(() => reduceLedgerEvent(s, asLedgerEvent(issueInitialToken(SESSION_ID, WRITER_B, CTX)))).toThrow(
      ReducerError,
    );
  });
});

// ─── Error contract ───

describe("FencingError", () => {
  test("is an Error with a stable name and one of the four approved kinds", () => {
    const err = new FencingError("invalid_phase", "phase closed does not permit transfer");
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("FencingError");
    expect(err.kind).toBe("invalid_phase");
    expect(err.message).toBe("phase closed does not permit transfer");
    const kinds = ["missing_session_id", "invalid_phase", "missing_fencing_token", "invalid_token_state"] as const;
    for (const k of kinds) expect(new FencingError(k).kind).toBe(k);
  });

  test("a null session is reported before any phase or token defect", () => {
    const s: LifecycleState = {
      ...INITIAL_LIFECYCLE_STATE,
      sessionId: null,
      phase: "closed",
      fencingToken: null,
      tokenState: "invalidated",
    };
    expect(captureFencingError(() => issueTransferToken(s, WRITER_B, CTX)).kind).toBe("missing_session_id");
    expect(captureFencingError(() => invalidateToken(s, "rollback", null, CTX)).kind).toBe("missing_session_id");
  });
});

// ─── Token key ───

describe("tokenKey", () => {
  test("joins session id and token with exactly one real NUL byte", () => {
    const key = tokenKey("ses-1", 7);
    expect(key.length).toBe("ses-1".length + 1 + 1);
    expect(key.charCodeAt("ses-1".length)).toBe(0);
    expect(key).toBe("ses-1" + NUL + "7");
    expect([...key].filter((ch) => ch === NUL)).toHaveLength(1);
    // The six literal characters backslash-u-0-0-0-0 must not appear.
    expect(key).not.toContain("\\u0000");
    expect(key).not.toContain("\\x00");
    expect(key).not.toMatch(/[:|/\n]/);
  });

  test("distinct (session_id, token) pairs produce distinct keys at digit boundaries", () => {
    expect(tokenKey("s1", 12)).not.toBe(tokenKey("s11", 2));
    expect(tokenKey("ab", 1)).not.toBe(tokenKey("a", 11));
    expect(tokenKey(SESSION_ID, 1)).not.toBe(tokenKey(SESSION_ID, 2));
    expect(tokenKey(SESSION_ID, 1)).not.toBe(tokenKey(SUCCESSOR_SESSION_ID, 1));
    expect(tokenKey(SESSION_ID, 3)).toBe(tokenKey(SESSION_ID, 3));
  });

  test("the key matches the identity carried by issued records", () => {
    const event = issueTransferToken(active(9), WRITER_B, CTX);
    expect(tokenKey(event.session_id, event.fencing_token as number)).toBe(SESSION_ID + NUL + "10");
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Phase 3A M8 Task 19: pin the two durable lifecycle orders and the activation
// barrier (specification sections 2.5 and 9.5; plan Task 19 with the
// 2026-09-13 Founder RuntimeBroker dependency, ordering, and failure-injection
// rulings).
//
// Every test below drives RuntimeBroker over the REAL bun:sqlite Ledger. The
// only failure-injection mechanism is the approved one: a deterministic
// `sources.nextEventId()` that hands an already-durable event_id to the record
// that must be rejected, so the real `events.event_id` UNIQUE constraint does
// the rejecting. No fake ledger, no wrapper, no callback, no seam.
//
// Invariant under test: durable order is the observable order, and no `active`
// state is ever visible before it is durable.
// ═══════════════════════════════════════════════════════════════════════════

const T19_SESSION_ID = "ses-runtime-019";
const T19_WRITER = "exec-claude-19";
const T19_EXECUTION_IDS: readonly string[] = [T19_WRITER, "exec-agy-19"];
const T19_ENVELOPE_HASH = "9".repeat(64);
const T19_FINGERPRINT: RepositoryFingerprint = {
  kind: "working_tree",
  sha256: "e".repeat(64),
  git_sha: "f".repeat(40),
  base_git_sha: "1".repeat(40),
};
const T19_INCIDENT_ID = "incident-runtime-19";
const T19_COMMAND_ID = "cmd-founder-close-19";
const T19_ABORT_REASON = "next_start_open_without_activation";
const T19_PROVENANCE: RuntimeBrokerProvenance = {
  taskEnvelopeHash: T19_ENVELOPE_HASH,
  repositoryFingerprint: T19_FINGERPRINT,
};
const UNIQUE_REJECTION = /UNIQUE constraint failed: events\.event_id/;

/** An observation plus the durable rows the real Ledger held at the instant it was published. */
type Observed = LifecycleObservation & { readonly durable: readonly LedgerRow[] };

interface Harness {
  readonly ledger: Ledger;
  readonly deps: RuntimeBrokerDeps;
  readonly observations: Observed[];
  /** The durable rows the real Ledger held at each terminator invocation. */
  readonly terminatorCalls: (readonly LedgerRow[])[];
  readonly issuedEventIds: string[];
}

interface HarnessOptions {
  readonly eventIds?: readonly string[];
  readonly terminator?: () => Promise<void>;
}

function openLedger(): Ledger {
  const dir = mkdtempSync(join(tmpdir(), "madv-runtime-broker-"));
  return new Ledger(join(dir, "ledger.sqlite3"));
}

function sessionOpen(sessionId = T19_SESSION_ID, eventId = "evt-open-19"): SessionLifecycleEventV1 {
  return {
    protocol_version: PROTOCOL_VERSION,
    event_id: eventId,
    session_id: sessionId,
    event_type: "session_open",
    actor: "madbridge",
    task_envelope_hash: T19_ENVELOPE_HASH,
    repository_fingerprint: T19_FINGERPRINT,
    fencing_token: null,
    reason_code: null,
    created_at: "2026-09-14T00:00:00.000Z",
    previous_event_hash: GENESIS_HASH,
    payload: { authorization_reference: "FOUNDER-20260914-19", execution_ids: [...T19_EXECUTION_IDS] },
  };
}

function harness(ledger: Ledger, options: HarnessOptions = {}): Harness {
  const queue = options.eventIds === undefined ? null : [...options.eventIds];
  let generated = 0;
  let tick = 0;
  const observations: Observed[] = [];
  const terminatorCalls: (readonly LedgerRow[])[] = [];
  const issuedEventIds: string[] = [];
  const deps: RuntimeBrokerDeps = {
    ledger,
    provenance: T19_PROVENANCE,
    sources: {
      now: () => {
        tick += 1;
        return `2026-09-14T00:00:${String(tick).padStart(2, "0")}.000Z`;
      },
      nextEventId: () => {
        const id = queue === null ? `evt-19-${(generated += 1)}` : queue.shift();
        if (id === undefined) throw new Error("test harness: the deterministic event id queue is exhausted");
        issuedEventIds.push(id);
        return id;
      },
    },
    terminateGovernedProcesses: async () => {
      terminatorCalls.push(ledger.readAfter(0));
      if (options.terminator !== undefined) await options.terminator();
    },
    observe: (observation) => {
      observations.push({ ...observation, durable: ledger.readAfter(0) });
    },
  };
  return { ledger, deps, observations, terminatorCalls, issuedEventIds };
}

interface DurableLifecycle {
  readonly row: LedgerRow;
  readonly event: SessionLifecycleEventV1;
}

function durable(ledger: Ledger): DurableLifecycle[] {
  return ledger.readAfter(0).map((row) => ({ row, event: JSON.parse(row.event_json) as SessionLifecycleEventV1 }));
}

const typesOf = (entries: readonly DurableLifecycle[]): string[] => entries.map((e) => e.event.event_type);
const rowTypes = (rows: readonly LedgerRow[]): string[] =>
  rows.map((row) => (JSON.parse(row.event_json) as SessionLifecycleEventV1).event_type);

function replay(rows: readonly LedgerRow[]): LifecycleState {
  return rows.reduce<LifecycleState>(
    (s, row) => reduceLedgerEvent(s, JSON.parse(row.event_json) as LedgerEventV1),
    INITIAL_LIFECYCLE_STATE,
  );
}

async function rejection(fn: () => Promise<unknown>): Promise<unknown> {
  let caught: unknown;
  let rejected = false;
  try {
    await fn();
  } catch (error) {
    caught = error;
    rejected = true;
  }
  expect(rejected).toBe(true);
  return caught;
}

function thrown(fn: () => unknown): unknown {
  let caught: unknown;
  let threw = false;
  try {
    fn();
  } catch (error) {
    caught = error;
    threw = true;
  }
  expect(threw).toBe(true);
  return caught;
}

const messageOf = (error: unknown): string => (error instanceof Error ? error.message : String(error));

async function activatedBroker(options: HarnessOptions = {}): Promise<{ h: Harness; broker: RuntimeBroker }> {
  const ledger = openLedger();
  ledger.append(sessionOpen());
  const h = harness(ledger, options);
  const broker = new RuntimeBroker(h.deps);
  await broker.activate(T19_WRITER, T19_EXECUTION_IDS);
  return { h, broker };
}

/** Every appended record's own previous_event_hash names the preceding durable row's event_hash. */
function expectEventLevelChain(entries: readonly DurableLifecycle[]): void {
  entries.forEach((entry, index) => {
    const previous = index === 0 ? GENESIS_HASH : entries[index - 1]!.row.event_hash;
    expect(entry.event.previous_event_hash).toBe(previous);
    expect(entry.row.previous_hash).toBe(previous);
  });
}

// ─── Task 19 plan-named tests ───

describe("Task 19 named tests", () => {
  test("startup appends fencing_token_issued then session_activated in that order", async () => {
    const { h } = await activatedBroker();
    const entries = durable(h.ledger);
    expect(typesOf(entries)).toEqual(["session_open", "fencing_token_issued", "session_activated"]);
    expect(entries.map((e) => e.row.sequence)).toEqual([1, 2, 3]);

    const issued = entries[1]!;
    expect(issued.event.fencing_token).toBe(1);
    expect(issued.event.payload).toEqual({ writer_execution_id: T19_WRITER });
    expect(issued.event.session_id).toBe(T19_SESSION_ID);

    const activated = entries[2]!;
    expect(activated.event.fencing_token).toBe(1);
    expect(activated.event.reason_code).toBeNull();
    expect(activated.event.payload).toEqual({
      execution_ids: [...T19_EXECUTION_IDS],
      readiness_snapshot_seq: h.observations[0]!.snapshotSeq,
    });

    expectEventLevelChain(entries);
    expect(h.ledger.verify()).toEqual({ valid: true, count: 3, head: activated.row.event_hash });
    const final = replay(h.ledger.readAfter(0));
    expect(final.phase).toBe("active");
    expect(final.fencingToken).toBe(1);
    expect(final.tokenState).toBe("valid");
    expect(final.readyExecutionIds).toEqual([...T19_EXECUTION_IDS]);
  });

  test("no active snapshot is exposed until both startup records are durable", async () => {
    const { h } = await activatedBroker();
    const activationRow = h.ledger.readAfter(0).find((row) => rowTypes([row])[0] === "session_activated")!;
    expect(activationRow).toBeDefined();

    // The observed snapshot sequence contains no active entry whose ledgerSeq
    // precedes the activation row.
    const early = h.observations.filter((o) => o.phase === "active" && o.ledgerSeq < activationRow.sequence);
    expect(early).toEqual([]);

    const firstActive = h.observations.find((o) => o.phase === "active")!;
    expect(firstActive).toBeDefined();
    expect(firstActive.ledgerSeq).toBe(activationRow.sequence);
    // At the instant the active observation was published, the real Ledger
    // already held the activation row, and every earlier observation was
    // published while the Ledger held no activation row at all.
    expect(rowTypes(firstActive.durable)).toContain("session_activated");
    expect(firstActive.durable[firstActive.durable.length - 1]!.event_hash).toBe(activationRow.event_hash);
    for (const before of h.observations.filter((o) => o.snapshotSeq < firstActive.snapshotSeq)) {
      expect(before.phase).toBe("starting");
      expect(rowTypes(before.durable)).not.toContain("session_activated");
    }
    expect(h.observations.map((o) => o.phase)).toEqual(["starting", "active"]);
  });

  test("interruption appends the four records in the specified order", async () => {
    const { h, broker } = await activatedBroker();
    await broker.interrupt("child_failure", "child exited with status 137", "high", T19_INCIDENT_ID, "evt-source-19", T19_WRITER);

    const entries = durable(h.ledger);
    expect(typesOf(entries).slice(3)).toEqual([
      "session_interrupted",
      "fencing_token_invalidated",
      "session_closing",
      "session_closed",
    ]);
    const [interrupted, invalidated, closing, closed] = entries.slice(3) as [
      DurableLifecycle,
      DurableLifecycle,
      DurableLifecycle,
      DurableLifecycle,
    ];
    expect(interrupted.event.reason_code).toBe("child_failure");
    expect(interrupted.event.payload).toEqual({
      incident_id: T19_INCIDENT_ID,
      reason: "child exited with status 137",
      severity: "high",
      source_event_id: "evt-source-19",
      reported_by_execution_id: T19_WRITER,
    });
    expect(invalidated.event.fencing_token).toBe(1);
    expect(invalidated.event.payload).toEqual({ invalidation_reason: "interruption", incident_id: T19_INCIDENT_ID });
    const terminal = { closure_kind: "interruption", incident_id: T19_INCIDENT_ID, reason_code: "child_failure" } as const;
    expect(closing.event.payload).toEqual(terminal);
    expect(closing.event.reason_code).toBe("child_failure");
    expect(closed.event.payload).toEqual(terminal);
    expect(closed.event.reason_code).toBe("child_failure");

    // Governed processes are terminated after durable session_closing and
    // before session_closed exists anywhere.
    expect(h.terminatorCalls).toHaveLength(1);
    const atTermination = rowTypes(h.terminatorCalls[0]!);
    expect(atTermination[atTermination.length - 1]).toBe("session_closing");
    expect(atTermination).not.toContain("session_closed");
    expect(closed.row.sequence).toBeGreaterThan(h.terminatorCalls[0]![h.terminatorCalls[0]!.length - 1]!.sequence);

    expect(h.observations.map((o) => o.phase)).toEqual([
      "starting",
      "active",
      "interrupted",
      "interrupted",
      "closing",
      "closed",
    ]);
    expectEventLevelChain(entries);
    expect(h.ledger.verify().valid).toBe(true);
    const final = replay(h.ledger.readAfter(0));
    expect(final.phase).toBe("closed");
    expect(final.closureKind).toBe("interruption");
    expect(final.tokenState).toBe("invalidated");
    expect(final.tokenUsable).toBe(false);
    expect(final.incident?.id).toBe(T19_INCIDENT_ID);
  });

  test("Founder close appends closing, invalidation, then closed", async () => {
    const { h, broker } = await activatedBroker();
    await broker.founderClose(T19_COMMAND_ID);

    const entries = durable(h.ledger);
    expect(typesOf(entries).slice(3)).toEqual(["session_closing", "fencing_token_invalidated", "session_closed"]);
    const [closing, invalidated, closed] = entries.slice(3) as [DurableLifecycle, DurableLifecycle, DurableLifecycle];
    const terminal = { command_id: T19_COMMAND_ID, authorized_by: "founder", closure_kind: "founder", incident_id: null } as const;
    expect(closing.event.payload).toEqual(terminal);
    expect(closing.event.reason_code).toBeNull();
    expect(invalidated.event.fencing_token).toBe(1);
    expect(invalidated.event.payload).toEqual({ invalidation_reason: "founder_close", incident_id: null });
    expect(closed.event.payload).toEqual(terminal);
    expect(closed.event.reason_code).toBeNull();

    expect(h.terminatorCalls).toHaveLength(1);
    const atTermination = rowTypes(h.terminatorCalls[0]!);
    expect(atTermination.slice(-2)).toEqual(["session_closing", "fencing_token_invalidated"]);
    expect(atTermination).not.toContain("session_closed");

    expect(h.observations.map((o) => o.phase)).toEqual(["starting", "active", "closing", "closing", "closed"]);
    expectEventLevelChain(entries);
    expect(h.ledger.verify().valid).toBe(true);
    const final = replay(h.ledger.readAfter(0));
    expect(final.phase).toBe("closed");
    expect(final.closureKind).toBe("founder");
    expect(final.tokenState).toBe("invalidated");
    expect(final.incident).toBeNull();
  });

  test("a failed activation append compensates atomically with session_abort then fencing_token_invalidated and never publishes active", async () => {
    const ledger = openLedger();
    ledger.append(sessionOpen());
    // Approved mechanism: issuance takes a fresh id; activation is handed the
    // SAME id, which is already durable, so the real UNIQUE constraint rejects
    // the activation append. The compensation records take fresh ids.
    const h = harness(ledger, { eventIds: ["evt-issue-19", "evt-issue-19", "evt-abort-19", "evt-invalidate-19"] });
    const broker = new RuntimeBroker(h.deps);

    const error = await rejection(() => broker.activate(T19_WRITER, T19_EXECUTION_IDS));
    expect(error).toBeInstanceOf(RuntimeBrokerError);
    expect((error as RuntimeBrokerError).kind).toBe("activation_failed");
    expect(messageOf((error as RuntimeBrokerError).cause)).toMatch(UNIQUE_REJECTION);

    const entries = durable(ledger);
    expect(typesOf(entries)).toEqual(["session_open", "fencing_token_issued", "session_abort", "fencing_token_invalidated"]);
    // The failed activation consumed no durable position: the compensation
    // chains directly onto the issuance row with no gap in sequence.
    expect(entries.map((e) => e.row.sequence)).toEqual([1, 2, 3, 4]);
    const [, issued, abort, invalidated] = entries as [DurableLifecycle, DurableLifecycle, DurableLifecycle, DurableLifecycle];
    expect(issued.event.event_id).toBe("evt-issue-19");
    expect(issued.event.fencing_token).toBe(1);
    expect(abort.row.previous_hash).toBe(issued.row.event_hash);
    expect(abort.event.payload).toEqual({ abort_reason: T19_ABORT_REASON });
    expect(abort.event.reason_code).toBeNull();
    expect(invalidated.event.payload).toEqual({ invalidation_reason: "rollback", incident_id: null });
    expect(invalidated.event.fencing_token).toBe(1);
    expectEventLevelChain(entries);

    const final = replay(ledger.readAfter(0));
    expect(final.phase).toBe("closed");
    expect(final.closureKind).toBe("abort");
    expect(final.tokenState).toBe("invalidated");
    expect(final.tokenUsable).toBe(false);
    expect(final.readyExecutionIds).toEqual([]);
    expect(ledger.verify()).toEqual({ valid: true, count: 4, head: invalidated.row.event_hash });

    expect(h.observations.some((o) => o.phase === "active")).toBe(false);
    expect(h.observations.map((o) => o.phase)).toEqual(["starting", "closed", "closed"]);
    expect(h.terminatorCalls).toHaveLength(0);
    expect(broker.snapshotSeq).toBe(3);
  });
});

// ─── Construction derives projection, head, and identity from the Ledger ───

describe("Task 19 construction derives everything from the durable ledger", () => {
  test("construction fails closed when replay yields no session identity and substitutes nothing", () => {
    const empty = openLedger();
    const h = harness(empty);
    const error = thrown(() => new RuntimeBroker(h.deps));
    expect(error).toBeInstanceOf(RuntimeBrokerError);
    expect((error as RuntimeBrokerError).kind).toBe("missing_session_id");
    expect(empty.readAfter(0)).toEqual([]);
    expect(h.observations).toEqual([]);
    expect(h.issuedEventIds).toEqual([]);

    // Lifecycle-inert bridge traffic never establishes a session either.
    const inert = openLedger();
    inert.append(lifecycle("message", { text: "hello" }, { actor: "exec-claude-19", session_id: T19_SESSION_ID }));
    const again = thrown(() => new RuntimeBroker(harness(inert).deps));
    expect((again as RuntimeBrokerError).kind).toBe("missing_session_id");
  });

  test("construction propagates an impossible durable order instead of normalizing it", () => {
    const ledger = openLedger();
    const open = ledger.append(sessionOpen());
    // session_activated without a prior issuance is refused by the canonical reducer.
    ledger.append({
      ...sessionOpen(T19_SESSION_ID, "evt-illegal-activation"),
      event_type: "session_activated",
      previous_event_hash: open.event_hash,
      payload: { execution_ids: [...T19_EXECUTION_IDS], readiness_snapshot_seq: 1 },
    } as unknown as SessionLifecycleEventV1);
    const error = thrown(() => new RuntimeBroker(harness(ledger).deps));
    expect(error).toBeInstanceOf(ReducerError);
  });

  test("the projection and the durable head are derived from existing rows: the first append chains from the last durable row", async () => {
    const ledger = openLedger();
    const open = ledger.append(sessionOpen());
    const issued = ledger.append(issueInitialToken(T19_SESSION_ID, T19_WRITER, {
      taskEnvelopeHash: T19_ENVELOPE_HASH,
      repositoryFingerprint: T19_FINGERPRINT,
      previousEventHash: open.event_hash,
      createdAt: "2026-09-14T00:00:01.000Z",
      eventId: "evt-prior-issue",
    }));
    const activated = ledger.append({
      ...sessionOpen(T19_SESSION_ID, "evt-prior-activate"),
      event_type: "session_activated",
      fencing_token: 1,
      previous_event_hash: issued.event_hash,
      payload: { execution_ids: [...T19_EXECUTION_IDS], readiness_snapshot_seq: 1 },
    } as unknown as SessionLifecycleEventV1);

    const h = harness(ledger);
    const broker = new RuntimeBroker(h.deps);
    expect(broker.snapshotSeq).toBe(0);
    expect(h.observations).toEqual([]);
    // The replayed projection is active: activation is refused, Founder close proceeds.
    const refused = await rejection(() => broker.activate(T19_WRITER, T19_EXECUTION_IDS));
    expect((refused as RuntimeBrokerError).kind).toBe("invalid_phase");
    expect(ledger.readAfter(0)).toHaveLength(3);
    await broker.founderClose(T19_COMMAND_ID);
    const closing = durable(ledger)[3]!;
    expect(closing.event.event_type).toBe("session_closing");
    expect(closing.event.previous_event_hash).toBe(activated.event_hash);
    expect(closing.event.fencing_token).toBe(1);
    expect(closing.event.session_id).toBe(T19_SESSION_ID);
  });

  test("session identity is derived from the durable session_open, never from provenance or a generated value", async () => {
    const ledger = openLedger();
    ledger.append(sessionOpen("ses-derived-from-ledger-42"));
    const h = harness(ledger);
    const broker = new RuntimeBroker(h.deps);
    await broker.activate(T19_WRITER, T19_EXECUTION_IDS);
    await broker.founderClose(T19_COMMAND_ID);
    const appended = durable(ledger).slice(1);
    expect(appended).toHaveLength(5);
    for (const entry of appended) expect(entry.event.session_id).toBe("ses-derived-from-ledger-42");
    expect(JSON.stringify(T19_PROVENANCE)).not.toContain("ses-derived-from-ledger-42");
  });

  test("the head advances only from returned rows: every record chains from the preceding durable row across a full lifecycle", async () => {
    const { h, broker } = await activatedBroker();
    await broker.interrupt("adapter_failure", "adapter stream closed", "medium", T19_INCIDENT_ID, null, null);
    const entries = durable(h.ledger);
    expect(entries).toHaveLength(7);
    expectEventLevelChain(entries);
    expect(h.ledger.verify().head).toBe(entries[6]!.row.event_hash);
  });
});

// ─── Activation preconditions ───

describe("Task 19 activation preconditions", () => {
  test("activate fails closed before any write on an empty or duplicated readiness set", async () => {
    for (const ids of [[], [T19_WRITER, T19_WRITER]] as const) {
      const ledger = openLedger();
      ledger.append(sessionOpen());
      const h = harness(ledger);
      const broker = new RuntimeBroker(h.deps);
      const error = await rejection(() => broker.activate(T19_WRITER, ids));
      expect(error).toBeInstanceOf(RuntimeBrokerError);
      expect((error as RuntimeBrokerError).kind).toBe("invalid_readiness_set");
      expect(ledger.readAfter(0)).toHaveLength(1);
      expect(h.observations).toEqual([]);
      expect(h.issuedEventIds).toEqual([]);
      expect(broker.snapshotSeq).toBe(0);
    }
  });

  test("activate is refused after activation and after a durable issuance that never activated", async () => {
    const { h, broker } = await activatedBroker();
    const twice = await rejection(() => broker.activate(T19_WRITER, T19_EXECUTION_IDS));
    expect((twice as RuntimeBrokerError).kind).toBe("invalid_phase");
    expect(h.ledger.readAfter(0)).toHaveLength(3);
    expect(h.observations).toHaveLength(2);

    const ledger = openLedger();
    const open = ledger.append(sessionOpen());
    ledger.append(issueInitialToken(T19_SESSION_ID, T19_WRITER, {
      taskEnvelopeHash: T19_ENVELOPE_HASH,
      repositoryFingerprint: T19_FINGERPRINT,
      previousEventHash: open.event_hash,
      createdAt: "2026-09-14T00:00:01.000Z",
      eventId: "evt-orphan-issue",
    }));
    const orphan = new RuntimeBroker(harness(ledger).deps);
    const refused = await rejection(() => orphan.activate(T19_WRITER, T19_EXECUTION_IDS));
    expect((refused as RuntimeBrokerError).kind).toBe("invalid_phase");
    expect(ledger.readAfter(0)).toHaveLength(2);
  });

  test("interrupt and Founder close are refused before activation and write nothing", async () => {
    const ledger = openLedger();
    ledger.append(sessionOpen());
    const h = harness(ledger);
    const broker = new RuntimeBroker(h.deps);
    const interrupt = await rejection(() =>
      broker.interrupt("child_failure", "too early", "low", T19_INCIDENT_ID, null, null),
    );
    expect(interrupt).toBeInstanceOf(ReducerError);
    const close = await rejection(() => broker.founderClose(T19_COMMAND_ID));
    expect(close).toBeInstanceOf(ReducerError);
    expect(ledger.readAfter(0)).toHaveLength(1);
    expect(h.observations).toEqual([]);
    expect(h.terminatorCalls).toEqual([]);
  });

  test("a terminal session refuses every further transition and writes nothing", async () => {
    const { h, broker } = await activatedBroker();
    await broker.founderClose(T19_COMMAND_ID);
    const before = h.ledger.readAfter(0).length;
    expect((await rejection(() => broker.founderClose("cmd-again"))) instanceof ReducerError).toBe(true);
    expect((await rejection(() => broker.interrupt("child_failure", "late", "low", "inc-late", null, null))) instanceof ReducerError).toBe(true);
    expect(((await rejection(() => broker.activate(T19_WRITER, T19_EXECUTION_IDS))) as RuntimeBrokerError).kind).toBe("invalid_phase");
    expect(h.ledger.readAfter(0)).toHaveLength(before);
    expect(h.terminatorCalls).toHaveLength(1);
  });
});

// ─── Observation and the M8-local snapshotSeq ───

describe("Task 19 observation and snapshotSeq", () => {
  test("snapshotSeq starts at 0, increments by exactly one per published observation, and equals the last published value", async () => {
    const ledger = openLedger();
    ledger.append(sessionOpen());
    const h = harness(ledger);
    const broker = new RuntimeBroker(h.deps);
    expect(broker.snapshotSeq).toBe(0);
    await broker.activate(T19_WRITER, T19_EXECUTION_IDS);
    expect(broker.snapshotSeq).toBe(2);
    expect(h.observations.map((o) => o.snapshotSeq)).toEqual([1, 2]);
    await broker.interrupt("pty_host_failure", "host died", "high", T19_INCIDENT_ID, null, null);
    expect(broker.snapshotSeq).toBe(6);
    expect(h.observations.map((o) => o.snapshotSeq)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(h.observations[h.observations.length - 1]!.snapshotSeq).toBe(broker.snapshotSeq);
  });

  test("every observation is published only after its row is durable and folded: the phase equals the canonical replay through that row", async () => {
    const { h, broker } = await activatedBroker();
    await broker.interrupt("identity_mismatch", "attestation changed", "high", T19_INCIDENT_ID, null, null);
    const rows = h.ledger.readAfter(0);
    for (const observation of h.observations) {
      const upTo = rows.filter((row) => row.sequence <= observation.ledgerSeq);
      expect(upTo[upTo.length - 1]!.sequence).toBe(observation.ledgerSeq);
      expect(observation.phase).toBe(replay(upTo).phase);
      // The real Ledger held the observed row at publication time.
      expect(observation.durable.some((row) => row.sequence === observation.ledgerSeq)).toBe(true);
    }
  });

  test("observation order equals durable order", async () => {
    const { h, broker } = await activatedBroker();
    await broker.founderClose(T19_COMMAND_ID);
    const appended = h.ledger.readAfter(1).map((row) => row.sequence);
    expect(h.observations.map((o) => o.ledgerSeq)).toEqual(appended);
    for (let i = 1; i < h.observations.length; i += 1) {
      expect(h.observations[i]!.ledgerSeq).toBeGreaterThan(h.observations[i - 1]!.ledgerSeq);
      expect(h.observations[i]!.snapshotSeq).toBe(h.observations[i - 1]!.snapshotSeq + 1);
    }
  });

  test("the activation record's readiness_snapshot_seq is the broker-owned local sequence current at construction", async () => {
    const { h } = await activatedBroker();
    const activated = durable(h.ledger)[2]!;
    expect(activated.event.event_type).toBe("session_activated");
    const issuanceObservation = h.observations[0]!;
    expect(issuanceObservation.ledgerSeq).toBe(2);
    expect(activated.event.payload).toEqual({
      execution_ids: [...T19_EXECUTION_IDS],
      readiness_snapshot_seq: issuanceObservation.snapshotSeq,
    });
  });
});

// ─── FencingRecordContext ownership ───

describe("Task 19 fencing context ownership", () => {
  test("issued and invalidated records carry the injected provenance and the deterministic sources in call order", async () => {
    const ledger = openLedger();
    ledger.append(sessionOpen());
    const h = harness(ledger, { eventIds: ["evt-a", "evt-b", "evt-c", "evt-d", "evt-e"] });
    const broker = new RuntimeBroker(h.deps);
    await broker.activate(T19_WRITER, T19_EXECUTION_IDS);
    await broker.founderClose(T19_COMMAND_ID);
    const appended = durable(ledger).slice(1);
    expect(appended.map((e) => e.event.event_id)).toEqual(["evt-a", "evt-b", "evt-c", "evt-d", "evt-e"]);
    expect(appended.map((e) => e.event.created_at)).toEqual([
      "2026-09-14T00:00:01.000Z",
      "2026-09-14T00:00:02.000Z",
      "2026-09-14T00:00:03.000Z",
      "2026-09-14T00:00:04.000Z",
      "2026-09-14T00:00:05.000Z",
    ]);
    for (const entry of appended) {
      expect(entry.event.task_envelope_hash).toBe(T19_ENVELOPE_HASH);
      expect(entry.event.repository_fingerprint).toEqual(T19_FINGERPRINT);
      expect(entry.event.actor).toBe("madbridge");
      expect(entry.event.protocol_version).toBe(PROTOCOL_VERSION);
    }
    expectEventLevelChain(durable(ledger));
  });

  test("no projection, session identity, durable head, or pre-built fencing context can be injected", () => {
    const ledger = openLedger();
    ledger.append(sessionOpen());
    const { deps } = harness(ledger);
    // Excess-property rejection is a compile-time proof under `bunx tsc
    // --noEmit`; the runtime assertion only records the accepted surface.
    // @ts-expect-error a lifecycle projection is derived, never injected
    const withState: RuntimeBrokerDeps = { ...deps, initialState: INITIAL_LIFECYCLE_STATE };
    // @ts-expect-error the session identity is derived, never injected
    const withSession: RuntimeBrokerDeps = { ...deps, sessionId: T19_SESSION_ID };
    // @ts-expect-error the durable head is derived, never injected
    const withHead: RuntimeBrokerDeps = { ...deps, previousEventHash: GENESIS_HASH };
    // @ts-expect-error fencing contexts are built internally, never injected
    const withContext: RuntimeBrokerDeps = { ...deps, fencingContext: CTX };
    expect([withState, withSession, withHead, withContext]).toHaveLength(4);
    expect(Object.keys(deps).sort()).toEqual(["ledger", "observe", "provenance", "sources", "terminateGovernedProcesses"]);
  });
});

// ─── Durable prefixes are separate transactions ───

describe("Task 19 durable prefixes are separate transactions", () => {
  test("interruption prefixes are durable separately: a rejected session_closing leaves session_interrupted and fencing_token_invalidated durable", async () => {
    const { h, broker } = await activatedBroker({
      eventIds: ["evt-issue", "evt-activate", "evt-interrupt", "evt-invalidate", "evt-issue"],
    });
    const error = await rejection(() => broker.interrupt("child_failure", "exit 1", "high", T19_INCIDENT_ID, null, null));
    expect(messageOf(error)).toMatch(UNIQUE_REJECTION);
    expect(typesOf(durable(h.ledger)).slice(3)).toEqual(["session_interrupted", "fencing_token_invalidated"]);
    expect(h.terminatorCalls).toHaveLength(0);
    expect(h.observations.map((o) => o.phase)).toEqual(["starting", "active", "interrupted", "interrupted"]);
    const final = replay(h.ledger.readAfter(0));
    expect(final.phase).toBe("interrupted");
    expect(final.tokenState).toBe("invalidated");
    expect(h.ledger.verify().valid).toBe(true);
  });

  test("a rejected fencing_token_invalidated leaves session_interrupted alone durable", async () => {
    const { h, broker } = await activatedBroker({ eventIds: ["evt-issue", "evt-activate", "evt-interrupt", "evt-issue"] });
    const error = await rejection(() => broker.interrupt("child_failure", "exit 1", "high", T19_INCIDENT_ID, null, null));
    expect(messageOf(error)).toMatch(UNIQUE_REJECTION);
    expect(typesOf(durable(h.ledger)).slice(3)).toEqual(["session_interrupted"]);
    expect(h.terminatorCalls).toHaveLength(0);
    const final = replay(h.ledger.readAfter(0));
    expect(final.phase).toBe("interrupted");
    expect(final.tokenState).toBe("valid");
    expect(final.tokenUsable).toBe(false);
  });

  test("Founder-close prefixes are durable separately: a rejected invalidation leaves session_closing durable and terminates nothing", async () => {
    const { h, broker } = await activatedBroker({ eventIds: ["evt-issue", "evt-activate", "evt-closing", "evt-issue"] });
    const error = await rejection(() => broker.founderClose(T19_COMMAND_ID));
    expect(messageOf(error)).toMatch(UNIQUE_REJECTION);
    expect(typesOf(durable(h.ledger)).slice(3)).toEqual(["session_closing"]);
    expect(h.terminatorCalls).toHaveLength(0);
    expect(h.observations.map((o) => o.phase)).toEqual(["starting", "active", "closing"]);
    const final = replay(h.ledger.readAfter(0));
    expect(final.phase).toBe("closing");
    expect(final.closureKind).toBe("founder");
    expect(final.tokenState).toBe("valid");
  });

  test("compensation is all-or-nothing: a rejected invalidation record leaves no session_abort behind", async () => {
    const ledger = openLedger();
    ledger.append(sessionOpen());
    // Activation is rejected (duplicate of the issuance id); the compensation's
    // second record is ALSO handed the issuance id, so the atomic batch fails.
    const h = harness(ledger, { eventIds: ["evt-issue", "evt-issue", "evt-abort", "evt-issue"] });
    const broker = new RuntimeBroker(h.deps);
    const error = await rejection(() => broker.activate(T19_WRITER, T19_EXECUTION_IDS));
    expect(messageOf(error)).toMatch(UNIQUE_REJECTION);
    expect(typesOf(durable(ledger))).toEqual(["session_open", "fencing_token_issued"]);
    const final = replay(ledger.readAfter(0));
    expect(final.phase).toBe("starting");
    expect(final.tokenState).toBe("valid");
    expect(h.observations.map((o) => o.phase)).toEqual(["starting"]);
    expect(ledger.verify()).toEqual({ valid: true, count: 2, head: ledger.readAfter(1)[0]!.event_hash });
  });
});

// ─── Governed-process termination ───

describe("Task 19 governed-process termination", () => {
  test("a rejecting terminator leaves an interruption at durable closing with no session_closed and no closed observation", async () => {
    const failure = new Error("pty host did not exit");
    const { h, broker } = await activatedBroker({ terminator: () => Promise.reject(failure) });
    const error = await rejection(() =>
      broker.interrupt("containment_failed", "escape detected", "high", T19_INCIDENT_ID, null, null),
    );
    expect(error).toBe(failure);
    expect(typesOf(durable(h.ledger)).slice(3)).toEqual(["session_interrupted", "fencing_token_invalidated", "session_closing"]);
    expect(h.terminatorCalls).toHaveLength(1);
    expect(h.observations.map((o) => o.phase)).toEqual(["starting", "active", "interrupted", "interrupted", "closing"]);
    expect(h.observations.some((o) => o.phase === "closed")).toBe(false);
    const final = replay(h.ledger.readAfter(0));
    expect(final.phase).toBe("closing");
    expect(final.closureKind).toBe("interruption");
    expect(h.ledger.verify().valid).toBe(true);
  });

  test("a rejecting terminator leaves a Founder close at durable closing with the token invalidated and no session_closed", async () => {
    const failure = new Error("governed process group still alive");
    const { h, broker } = await activatedBroker({ terminator: () => Promise.reject(failure) });
    const error = await rejection(() => broker.founderClose(T19_COMMAND_ID));
    expect(error).toBe(failure);
    expect(typesOf(durable(h.ledger)).slice(3)).toEqual(["session_closing", "fencing_token_invalidated"]);
    expect(h.observations.some((o) => o.phase === "closed")).toBe(false);
    const final = replay(h.ledger.readAfter(0));
    expect(final.phase).toBe("closing");
    expect(final.closureKind).toBe("founder");
    expect(final.tokenState).toBe("invalidated");
  });

  test("session_closed is appended only after the terminator resolves", async () => {
    let released: () => void = () => undefined;
    const gate = new Promise<void>((resolve) => {
      released = resolve;
    });
    const { h, broker } = await activatedBroker({ terminator: () => gate });
    const closing = broker.founderClose(T19_COMMAND_ID);
    await Promise.resolve();
    await Promise.resolve();
    // The terminator is pending: closing and invalidation are durable, closed is not.
    expect(typesOf(durable(h.ledger)).slice(3)).toEqual(["session_closing", "fencing_token_invalidated"]);
    expect(h.terminatorCalls).toHaveLength(1);
    released();
    await closing;
    expect(typesOf(durable(h.ledger)).slice(3)).toEqual(["session_closing", "fencing_token_invalidated", "session_closed"]);
    expect(h.observations[h.observations.length - 1]!.phase).toBe("closed");
  });

  test("the terminator is never invoked by activation, by a failed activation, or by a refused transition", async () => {
    const { h, broker } = await activatedBroker();
    expect(h.terminatorCalls).toHaveLength(0);
    await rejection(() => broker.activate(T19_WRITER, T19_EXECUTION_IDS));
    expect(h.terminatorCalls).toHaveLength(0);

    const ledger = openLedger();
    ledger.append(sessionOpen());
    const failed = harness(ledger, { eventIds: ["evt-issue", "evt-issue", "evt-abort", "evt-invalidate"] });
    await rejection(() => new RuntimeBroker(failed.deps).activate(T19_WRITER, T19_EXECUTION_IDS));
    expect(failed.terminatorCalls).toHaveLength(0);
  });
});

// ─── Module discipline ───

describe("Task 19 module discipline", () => {
  test("the runtime broker performs no ambient discovery, holds no process authority, and batches only the compensation", () => {
    const source = readFileSync(join(import.meta.dir, "..", "src", "runtime-broker.ts"), "utf8");
    const forbidden = [
      /new Date\b/,
      /Date\.now\b/,
      /performance\.now\b/,
      /hrtime\b/,
      /randomUUID\b/,
      /getRandomValues\b/,
      /Math\.random\b/,
      /\bcrypto\b/,
      /process\.env\b/,
      /process\.kill\b/,
      /killpg|\.pid\b/,
      /node-pty|spawnPtyHost|PtyManager|PtyHostHandle/,
      /child_process|\bBun\.(file|spawn)\b/,
      /readFileSync|readdirSync|node:fs\b|from "fs"/,
      /bun:sqlite/,
      /ledger\.close\(/,
      /:\s*any\b|<any[,>]|as any\b/,
      /globalThis|initialState/,
    ];
    for (const pattern of forbidden) {
      expect(source).not.toMatch(pattern);
    }
    // Exactly one atomic batch exists: the failed-activation compensation.
    expect(source.match(/appendMany\(/g)).toHaveLength(1);
    // No module-level mutable binding: no hidden registry or singleton.
    expect(source.split("\n").filter((l) => /^(let|var)\s/.test(l))).toEqual([]);
    const valueImports = source.split("\n").filter((l) => /^import\s+(?!type\b)/.test(l));
    expect(valueImports).toEqual([
      'import { GENESIS_HASH, INITIAL_LIFECYCLE_STATE, computeEventHash, reduceLedgerEvent } from "@madventures/ledger";',
      'import { PROTOCOL_VERSION, canonicalJson } from "@madventures/protocol";',
      'import { invalidateToken, issueInitialToken } from "./fencing";',
    ]);
  });

  test("the broker index does not export RuntimeBroker; this test imports it directly", () => {
    const index = readFileSync(join(import.meta.dir, "..", "src", "index.ts"), "utf8");
    expect(index).not.toContain("runtime-broker");
    expect(index).not.toContain("RuntimeBroker");
  });
});
