// packages/broker/test/snapshot.test.ts
// Phase 3A M10 Task 21b: the BrokerSnapshot production projection
// (specification section 9.4; plan Task 21b; Founder Decision D10-R1 Part D).
// Eight named tests in the D1 order. Titles 1-5 are the plan's, verbatim;
// 6-8 are D10-R1's. The import of projectSnapshot below is a runtime (value)
// import, so the D2 RED proof (`Cannot find module "../src/snapshot"`) is
// genuine rather than an elided type-only import.

import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  projectSnapshot,
  SnapshotProjectionRefused,
  SNAPSHOT_PROJECTION_REFUSAL_REASONS,
} from "../src/snapshot";
import type { SnapshotProjectionInput, SnapshotProjectionRefusalReason } from "../src/snapshot";
import type { BrokerSnapshot } from "../src/client";
import type { LedgerRow, LifecycleState } from "@madventures/ledger";
import { PROTOCOL_VERSION } from "@madventures/protocol";
import type { RepositoryFingerprint } from "@madventures/protocol";

// ─── Fixtures ───
//
// Every row below is a plain JSON encoding of one of the two closed ledger
// vocabularies: a SessionLifecycleEventV1 (actor "madbridge", carries an
// envelope fencing_token) or a BridgeEventV1 (carries sender_execution_id,
// no token). The rows are the ledger's readAfter(0) shape, in ascending
// sequence order, exactly as D10-R1 B1 defines the input.

const SESSION_ID = "ses-snapshot-001";
const WRITER_A = "exec-snapshot-a";
const WRITER_B = "exec-snapshot-b";
const TASK_ENVELOPE_HASH = "d".repeat(64);

const REPOSITORY_FINGERPRINT: RepositoryFingerprint = {
  kind: "commit",
  sha256: "a".repeat(64),
  git_sha: "b".repeat(40),
};

function lifecycleEvent(
  eventType: string,
  fencingToken: number | null,
  payload: Record<string, unknown>,
  createdAt: string,
): Record<string, unknown> {
  return {
    protocol_version: PROTOCOL_VERSION,
    event_id: `evt-${eventType}-${createdAt}`,
    session_id: SESSION_ID,
    event_type: eventType,
    actor: "madbridge",
    task_envelope_hash: TASK_ENVELOPE_HASH,
    repository_fingerprint: REPOSITORY_FINGERPRINT,
    fencing_token: fencingToken,
    reason_code: null,
    created_at: createdAt,
    previous_event_hash: "0".repeat(64),
    payload,
  };
}

function bridgeEvent(
  eventType: string,
  senderExecutionId: string,
  createdAt: string,
): Record<string, unknown> {
  return {
    protocol_version: PROTOCOL_VERSION,
    event_id: `evt-${eventType}-${createdAt}`,
    session_id: SESSION_ID,
    parent_event_id: null,
    sender_execution_id: senderExecutionId,
    receiver_execution_id: WRITER_B,
    sender_role: "builder",
    sender_surface: "claude-code",
    sender_model: "model-snapshot",
    sender_provider: "provider-snapshot",
    task_envelope_hash: TASK_ENVELOPE_HASH,
    repository_fingerprint: REPOSITORY_FINGERPRINT,
    event_type: eventType,
    payload_hash: "e".repeat(64),
    payload: { text: "hello" },
    created_at: createdAt,
    previous_event_hash: "0".repeat(64),
  };
}

function row(sequence: number, event: unknown, createdAt: string): LedgerRow {
  return {
    sequence,
    event_id: `row-${sequence}`,
    event_json: typeof event === "string" ? event : JSON.stringify(event),
    previous_hash: "0".repeat(64),
    event_hash: `${sequence}`.padStart(64, "0"),
    created_at: createdAt,
  };
}

/**
 * A four-row chain: open, token 1 issued to WRITER_A, token 2 issued to
 * WRITER_B, then one ordinary BridgeEventV1 from WRITER_B. Token 2 is the
 * current token in the base lifecycle below, so WRITER_B is the recoverable
 * active writer and WRITER_A is the stale issuance that must not win.
 */
function baseRows(): LedgerRow[] {
  return [
    row(
      1,
      lifecycleEvent(
        "session_open",
        null,
        { authorization_reference: "ACT-snapshot-001", execution_ids: [WRITER_A, WRITER_B] },
        "2026-09-24T00:00:01Z",
      ),
      "2026-09-24T00:00:01Z",
    ),
    row(
      2,
      lifecycleEvent("fencing_token_issued", 1, { writer_execution_id: WRITER_A }, "2026-09-24T00:00:02Z"),
      "2026-09-24T00:00:02Z",
    ),
    row(
      3,
      lifecycleEvent("fencing_token_issued", 2, { writer_execution_id: WRITER_B }, "2026-09-24T00:00:03Z"),
      "2026-09-24T00:00:03Z",
    ),
    row(4, bridgeEvent("message", WRITER_B, "2026-09-24T00:00:04Z"), "2026-09-24T00:00:04Z"),
  ];
}

function baseLifecycle(overrides: Partial<LifecycleState> = {}): LifecycleState {
  return {
    sessionId: SESSION_ID,
    phase: "active",
    fencingToken: 2,
    tokenState: "valid",
    tokenUsable: true,
    incident: null,
    reasonCode: null,
    readyExecutionIds: [WRITER_A, WRITER_B],
    closureKind: null,
    ...overrides,
  };
}

function baseInput(overrides: Partial<SnapshotProjectionInput> = {}): SnapshotProjectionInput {
  return {
    lifecycle: baseLifecycle(),
    ledgerRows: baseRows(),
    provenance: {
      taskEnvelopeHash: TASK_ENVELOPE_HASH,
      repositoryFingerprint: REPOSITORY_FINGERPRINT,
    },
    ...overrides,
  };
}

/** Recursively freeze so any attempted mutation by the projector throws in strict mode. */
function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const key of Object.keys(value as object)) {
      deepFreeze((value as Record<string, unknown>)[key]);
    }
  }
  return value;
}

function refusalReason(fn: () => unknown): SnapshotProjectionRefusalReason {
  try {
    fn();
  } catch (error) {
    expect(error).toBeInstanceOf(SnapshotProjectionRefused);
    expect(error).toBeInstanceOf(Error);
    expect((error as SnapshotProjectionRefused).name).toBe("SnapshotProjectionRefused");
    return (error as SnapshotProjectionRefused).reason;
  }
  throw new Error("expected projectSnapshot to refuse, but it returned a value");
}

const D9_NULL_MEMBERS = [
  "snapshotSeq",
  "connected",
  "task",
  "permissionSummary",
  "executions",
  "ownershipState",
  "queueDepth",
  "pendingTransfers",
  "verification",
  "review",
] as const;

// ─── 1 ───

test("the projection module exists and exports the projection function", () => {
  expect(typeof projectSnapshot).toBe("function");
  expect(projectSnapshot.name).toBe("projectSnapshot");
  expect(typeof SnapshotProjectionRefused).toBe("function");
  expect(SNAPSHOT_PROJECTION_REFUSAL_REASONS).toEqual([
    "session_id_unavailable",
    "ledger_rows_empty",
    "ledger_sequence_discontiguous",
    "ledger_row_malformed",
  ]);
});

// ─── 2 ───

test("the projection is pure: repeated projection of equal input is deep-equal and mutates nothing", () => {
  const input = deepFreeze(baseInput());
  const before = structuredClone(input);

  const first = projectSnapshot(input);
  const second = projectSnapshot(input);
  const fromEqualInput = projectSnapshot(deepFreeze(baseInput()));

  expect(first).toEqual(second);
  expect(first).toEqual(fromEqualInput);
  // Nothing about the input moved: not the lifecycle, not a row, not the provenance.
  expect(input).toEqual(before);
  // No shared mutable result: each call builds its own snapshot and collections,
  // so no cache or retained object can carry state between calls.
  expect(first).not.toBe(second);
  expect(first.eventLog).not.toBe(second.eventLog);
  expect(first.pendingApprovals).not.toBe(second.pendingApprovals);
});

// ─── 3 ───

test("the module imports nothing beyond ./client", () => {
  // D10-R1 B2: value (runtime) imports are limited to ./client; type-only
  // imports are limited to LifecycleState and LedgerRow from
  // @madventures/ledger and RepositoryFingerprint (plus event-vocabulary
  // types) from @madventures/protocol. Nothing from ./runtime-broker,
  // ./ownership-machine, ./command-legality, or apps/**. BrokerSnapshot is
  // consumed from ./client and never redeclared.
  const source = readFileSync(join(import.meta.dir, "..", "src", "snapshot.ts"), "utf8");

  const importStatements = [...source.matchAll(/^import\s+([\s\S]*?)\s+from\s+"([^"]+)";?$/gm)];
  expect(importStatements.length).toBeGreaterThan(0);

  const valueSpecifiers: string[] = [];
  const typeImports: Array<{ specifier: string; names: string[] }> = [];
  for (const match of importStatements) {
    const clause = match[1] ?? "";
    const specifier = match[2] ?? "";
    if (/^type\s/.test(clause)) {
      const names = (clause.match(/\{([\s\S]*)\}/)?.[1] ?? "")
        .split(",")
        .map((name) => name.trim().replace(/^type\s+/, "").split(/\s+as\s+/)[0] ?? "")
        .filter((name) => name.length > 0);
      typeImports.push({ specifier, names });
    } else {
      // A mixed clause with inline `type` markers still counts as a value import.
      valueSpecifiers.push(specifier);
    }
  }

  // Runtime imports: only ./client may appear.
  for (const specifier of valueSpecifiers) {
    expect(specifier).toBe("./client");
  }
  // No side-effect import, dynamic import, require, or re-export.
  expect(source).not.toMatch(/^import\s+"[^"]+";?$/m);
  expect(source).not.toMatch(/\bimport\s*\(/);
  expect(source).not.toMatch(/\brequire\s*\(/);
  expect(source).not.toMatch(/^export\s+(?:\*|\{[^}]*\})\s+from\s+/m);

  // Type-only imports: only the three B2 sources, with the named types B2 lists.
  const allowedTypeNames: Record<string, ReadonlySet<string>> = {
    "./client": new Set([
      "BrokerSnapshot",
      "ExecutionSnapshot",
      "PendingApprovalSnapshot",
      "PendingTransferSnapshot",
      "PermissionSummarySnapshot",
      "VerificationSnapshot",
      "ReviewSnapshot",
      "IncidentSnapshot",
      "LedgerEntrySnapshot",
    ]),
    "@madventures/ledger": new Set(["LifecycleState", "LedgerRow"]),
    "@madventures/protocol": new Set([
      "RepositoryFingerprint",
      "BridgeEventV1",
      "EventType",
      "LedgerEventV1",
      "SessionLifecycleEventV1",
      "SessionLifecycleEventTypeV1",
    ]),
  };
  for (const { specifier, names } of typeImports) {
    const allowed = allowedTypeNames[specifier];
    expect(allowed).toBeDefined();
    for (const name of names) {
      expect(allowed?.has(name)).toBe(true);
    }
  }

  // The forbidden sources never appear in code, in any form. Comments are
  // stripped first: the module's header may name them while documenting the
  // rule, but no import, require, or identifier may reach them.
  const code = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^[ \t]*\/\/.*$/gm, "");
  expect(code).not.toMatch(/runtime-broker/);
  expect(code).not.toMatch(/ownership-machine/);
  expect(code).not.toMatch(/command-legality/);
  expect(code).not.toMatch(/apps\//);
  expect(code).not.toMatch(/tui\/types/);

  // BrokerSnapshot is consumed from ./client, never redeclared.
  expect(source).toMatch(/^import type \{[^}]*\bBrokerSnapshot\b[^}]*\} from "\.\/client";$/m);
  expect(source).not.toMatch(/^export (?:type|interface) BrokerSnapshot\b/m);
  expect(source).not.toMatch(/\binterface BrokerSnapshot\b/);
  expect(source).not.toMatch(/\btype BrokerSnapshot\s*=/);
});

// ─── 4 ───

test("projection is deterministic: the same input yields the same verdict on every call", () => {
  const input = deepFreeze(baseInput());
  const expected: BrokerSnapshot = {
    sessionId: SESSION_ID,
    snapshotSeq: null,
    connected: null,
    phase: "active",
    taskEnvelopeHash: TASK_ENVELOPE_HASH,
    task: null,
    repositoryFingerprint: REPOSITORY_FINGERPRINT,
    executions: null,
    activeWriterExecutionId: WRITER_B,
    fencingToken: 2,
    tokenState: "valid",
    pendingApprovals: [],
    pendingTransfers: null,
    permissionSummary: null,
    ownershipState: null,
    verification: null,
    review: null,
    incident: null,
    eventLog: [
      {
        seq: 1,
        type: "session_open",
        actor: "madbridge",
        fencingToken: null,
        hash: "1".padStart(64, "0"),
        timestamp: "2026-09-24T00:00:01Z",
      },
      {
        seq: 2,
        type: "fencing_token_issued",
        actor: "madbridge",
        fencingToken: 1,
        hash: "2".padStart(64, "0"),
        timestamp: "2026-09-24T00:00:02Z",
      },
      {
        seq: 3,
        type: "fencing_token_issued",
        actor: "madbridge",
        fencingToken: 2,
        hash: "3".padStart(64, "0"),
        timestamp: "2026-09-24T00:00:03Z",
      },
      {
        // A BridgeEventV1 row: actor is its sender_execution_id and it carries no token.
        seq: 4,
        type: "message",
        actor: WRITER_B,
        fencingToken: null,
        hash: "4".padStart(64, "0"),
        timestamp: "2026-09-24T00:00:04Z",
      },
    ],
    queueDepth: null,
    ledgerSeq: 4,
  };

  for (let call = 0; call < 3; call += 1) {
    expect(projectSnapshot(input)).toEqual(expected);
  }

  // A refusing input refuses the same way on every call.
  const refusing = deepFreeze(baseInput({ lifecycle: baseLifecycle({ sessionId: null }) }));
  for (let call = 0; call < 3; call += 1) {
    expect(refusalReason(() => projectSnapshot(refusing))).toBe("session_id_unavailable");
  }
});

// ─── 5 ───

test("projection fails closed when required authoritative state is unavailable", () => {
  // D10-R1 B5: each case throws SnapshotProjectionRefused with its reason and
  // never returns a partial or synthesized snapshot.

  // sessionId null.
  expect(refusalReason(() => projectSnapshot(baseInput({ lifecycle: baseLifecycle({ sessionId: null }) })))).toBe(
    "session_id_unavailable",
  );

  // ledgerRows empty.
  expect(refusalReason(() => projectSnapshot(baseInput({ ledgerRows: [] })))).toBe("ledger_rows_empty");

  // Sequences not strictly contiguous and ascending: a gap, a regression, a duplicate, a non-integer.
  const [r1, r2, r3, r4] = baseRows() as [LedgerRow, LedgerRow, LedgerRow, LedgerRow];
  const discontiguous: ReadonlyArray<readonly LedgerRow[]> = [
    [r1, r2, r4],
    [r2, r1],
    [r1, { ...r2, sequence: 1 }],
    [r1, { ...r2, sequence: 2.5 }, { ...r3, sequence: 3.5 }],
  ];
  for (const rows of discontiguous) {
    expect(refusalReason(() => projectSnapshot(baseInput({ ledgerRows: rows })))).toBe(
      "ledger_sequence_discontiguous",
    );
  }

  // event_json that does not parse to an object with an event_type string.
  const malformed: ReadonlyArray<LedgerRow> = [
    row(4, "not json", "2026-09-24T00:00:04Z"),
    row(4, "[1,2,3]", "2026-09-24T00:00:04Z"),
    row(4, "null", "2026-09-24T00:00:04Z"),
    row(4, { actor: "madbridge" }, "2026-09-24T00:00:04Z"),
    row(4, { actor: "madbridge", event_type: 7 }, "2026-09-24T00:00:04Z"),
  ];
  for (const bad of malformed) {
    expect(refusalReason(() => projectSnapshot(baseInput({ ledgerRows: [r1, r2, r3, bad] })))).toBe(
      "ledger_row_malformed",
    );
  }

  // The closed reason union is exactly the four B5 cases.
  expect(new Set(SNAPSHOT_PROJECTION_REFUSAL_REASONS).size).toBe(4);
});

// ─── 6 ───

test("activeWriterExecutionId is recovered only from the latest fencing_token_issued matching a valid token", () => {
  // Current token 2, valid: the latest issuance carrying token 2 names WRITER_B.
  expect(projectSnapshot(baseInput()).activeWriterExecutionId).toBe(WRITER_B);

  // Current token 1, valid: the matching issuance is the earlier one, so WRITER_A —
  // the match is by token equality, not by "the most recent issuance of any token".
  expect(
    projectSnapshot(baseInput({ lifecycle: baseLifecycle({ fencingToken: 1 }) })).activeWriterExecutionId,
  ).toBe(WRITER_A);

  // Two issuances carrying the same token: the latest one wins.
  const reissued = [
    ...baseRows(),
    row(
      5,
      lifecycleEvent("fencing_token_issued", 2, { writer_execution_id: WRITER_A }, "2026-09-24T00:00:05Z"),
      "2026-09-24T00:00:05Z",
    ),
  ];
  expect(projectSnapshot(baseInput({ ledgerRows: reissued })).activeWriterExecutionId).toBe(WRITER_A);
});

// ─── 7 ───

test("activeWriterExecutionId is null when the token is invalidated or no matching issuance exists", () => {
  // Token invalidated: the matching issuance is still on the chain, and it still yields null.
  expect(
    projectSnapshot(baseInput({ lifecycle: baseLifecycle({ tokenState: "invalidated", tokenUsable: false }) }))
      .activeWriterExecutionId,
  ).toBeNull();

  // Token not issued.
  expect(
    projectSnapshot(
      baseInput({ lifecycle: baseLifecycle({ tokenState: "not_issued", fencingToken: null, tokenUsable: false }) }),
    ).activeWriterExecutionId,
  ).toBeNull();

  // Valid token with no issuance carrying it.
  expect(
    projectSnapshot(baseInput({ lifecycle: baseLifecycle({ fencingToken: 9 }) })).activeWriterExecutionId,
  ).toBeNull();

  // Valid state but a null token: nothing can match, so nothing is inferred.
  expect(
    projectSnapshot(baseInput({ lifecycle: baseLifecycle({ fencingToken: null }) })).activeWriterExecutionId,
  ).toBeNull();

  // The matching issuance carries no string writer_execution_id: never inferred from elsewhere.
  const unnamed = [
    ...baseRows().slice(0, 2),
    row(3, lifecycleEvent("fencing_token_issued", 2, {}, "2026-09-24T00:00:03Z"), "2026-09-24T00:00:03Z"),
  ];
  expect(projectSnapshot(baseInput({ ledgerRows: unnamed })).activeWriterExecutionId).toBeNull();

  // A non-lifecycle row that merely spells fencing_token_issued is not an issuance.
  const impostor = [
    ...baseRows().slice(0, 2),
    row(
      3,
      { ...bridgeEvent("fencing_token_issued", WRITER_B, "2026-09-24T00:00:03Z"), fencing_token: 2 },
      "2026-09-24T00:00:03Z",
    ),
  ];
  expect(projectSnapshot(baseInput({ ledgerRows: impostor })).activeWriterExecutionId).toBeNull();
});

// ─── 8 ───

test("pendingApprovals projects the empty collection and every D9-null member projects null", () => {
  const snapshot = projectSnapshot(baseInput());
  expect(snapshot.pendingApprovals).toEqual([]);
  expect(Array.isArray(snapshot.pendingApprovals)).toBe(true);
  for (const member of D9_NULL_MEMBERS) {
    expect(snapshot[member]).toBeNull();
  }
  // The null members are produced as null, not omitted.
  for (const member of D9_NULL_MEMBERS) {
    expect(Object.hasOwn(snapshot, member)).toBe(true);
  }
});
