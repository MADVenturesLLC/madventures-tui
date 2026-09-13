// packages/broker/test/fencing.test.ts
// Phase 3A M8 Task 18: deterministic fencing-token issuance, transfer,
// invalidation, and composite token identity (specification section 9.5;
// plan Task 18 with the 2026-09-13 Founder event-construction context ruling).
//
// Invariants under test: the token value is derived, never random; the first
// token of every session is exactly 1; a transfer is current + 1; pause neither
// invalidates nor increments; interruption is a one-way door; every carried
// record value originates with the caller through FencingRecordContext.

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
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
import { INITIAL_LIFECYCLE_STATE, ReducerError, reduceLedgerEvent } from "@madventures/ledger";
import type { LifecycleState } from "@madventures/ledger";
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
