// packages/broker/src/snapshot.ts
// Phase 3A M10 Task 21b: the pure, read-only production projection of
// authoritative broker state into the Task 20 BrokerSnapshot contract
// declared in ./client (specification section 9.4; plan Task 21b; Founder
// Decision D10-R1 Parts B and C, discharging D8 Projection Contract
// Requirement items 1-7).
//
// Projection authority is not state authority. This module owns no
// lifecycle, ownership, fencing, ledger-mutation, command, PTY, durable-
// storage, or independent mutable state. It reads nothing on its own: no
// clock, cache, registry, randomness, handle, ambient read, or process
// state. The caller (Task 22) supplies the whole input; the projector never
// reads broker state itself.
//
// Imports (D10-R1 B2): value imports are limited to ./client, and this
// module needs none. Type-only imports are LifecycleState and LedgerRow from
// @madventures/ledger and RepositoryFingerprint from @madventures/protocol.
// BrokerSnapshot is consumed from ./client and never redeclared. Nothing
// from ./runtime-broker, ./ownership-machine, ./command-legality, or apps/**,
// and the legacy TUI type of the same name is never imported, aliased, or
// treated as authoritative.

import type { BrokerSnapshot, IncidentSnapshot, LedgerEntrySnapshot } from "./client";
import type { LedgerRow, LifecycleState } from "@madventures/ledger";
import type { RepositoryFingerprint } from "@madventures/protocol";

/**
 * The production projection input (D10-R1 B1). `ledgerRows` is the ledger's
 * `readAfter(0)` output in ascending sequence order. There is no other input.
 */
export interface SnapshotProjectionInput {
  readonly lifecycle: LifecycleState;
  readonly ledgerRows: readonly LedgerRow[];
  readonly provenance: {
    readonly taskEnvelopeHash: string;
    readonly repositoryFingerprint: RepositoryFingerprint;
  };
}

/**
 * The closed set of refusal reasons (D10-R1 B5), in the order the projector
 * evaluates them. Runtime tuple so the closure is assertable.
 */
export const SNAPSHOT_PROJECTION_REFUSAL_REASONS = [
  "session_id_unavailable",
  "ledger_rows_empty",
  "ledger_sequence_discontiguous",
  "ledger_row_malformed",
] as const;

export type SnapshotProjectionRefusalReason = (typeof SNAPSHOT_PROJECTION_REFUSAL_REASONS)[number];

/**
 * Thrown when required authoritative state is unavailable (D10-R1 B5). The
 * projector refuses rather than emitting a partial or synthesized snapshot.
 *
 * - `session_id_unavailable`: `lifecycle.sessionId` is null. The contract
 *   types `sessionId` as `string`, and a null is a projection failure, never
 *   a `sessionId: null` snapshot (D9).
 * - `ledger_rows_empty`: no rows were supplied, so there is no `ledgerSeq`
 *   and no event log to project.
 * - `ledger_sequence_discontiguous`: row sequences are not safe integers
 *   strictly ascending by exactly one from the first row.
 * - `ledger_row_malformed`: a row's `event_json` does not parse to an object
 *   carrying an `event_type` string, or does not carry the field the
 *   projection reads for that row's actor (`sender_execution_id` on a
 *   non-lifecycle row) or token (`fencing_token` as number or null on a
 *   lifecycle row). Refusal is the only alternative to fabricating those
 *   values, and the projector never fabricates.
 */
export class SnapshotProjectionRefused extends Error {
  constructor(
    public readonly reason: SnapshotProjectionRefusalReason,
    message?: string,
  ) {
    super(message ?? reason);
    this.name = "SnapshotProjectionRefused";
  }
}

/** One row after its event_json has been parsed and classified. */
interface ParsedRow {
  readonly sequence: number;
  readonly eventHash: string;
  readonly createdAt: string;
  readonly eventType: string;
  /** true for a SessionLifecycleEventV1 record, false for a BridgeEventV1 record. */
  readonly lifecycle: boolean;
  readonly actor: string;
  readonly fencingToken: number | null;
  readonly payload: Record<string, unknown> | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function refuse(reason: SnapshotProjectionRefusalReason, message: string): never {
  throw new SnapshotProjectionRefused(reason, message);
}

/**
 * Parse and classify one row, or refuse.
 *
 * Classification follows the canonical reducer's authorship rule
 * (`packages/ledger/src/rebuild.ts`, specification section 9.6): a record
 * whose `actor` is `"madbridge"` is a lifecycle record; anything else is
 * ordinary BridgeEventV1 traffic. Per D10-R1 B3, a lifecycle row projects
 * `actor` from its `actor` and `fencingToken` from its envelope
 * `fencing_token`; a BridgeEventV1 row projects `actor` from
 * `sender_execution_id` and `fencingToken` as null, because a BridgeEventV1
 * carries no token.
 */
function parseRow(row: LedgerRow): ParsedRow {
  let event: unknown;
  try {
    event = JSON.parse(row.event_json);
  } catch {
    refuse("ledger_row_malformed", `row ${row.sequence}: event_json is not valid JSON`);
  }
  if (!isRecord(event)) {
    refuse("ledger_row_malformed", `row ${row.sequence}: event_json is not an object`);
  }
  const eventType = event["event_type"];
  if (typeof eventType !== "string") {
    refuse("ledger_row_malformed", `row ${row.sequence}: event_type is not a string`);
  }

  const payload = isRecord(event["payload"]) ? event["payload"] : null;

  if (event["actor"] === "madbridge") {
    const token = event["fencing_token"];
    if (token !== null && typeof token !== "number") {
      refuse("ledger_row_malformed", `row ${row.sequence}: lifecycle fencing_token is neither number nor null`);
    }
    return {
      sequence: row.sequence,
      eventHash: row.event_hash,
      createdAt: row.created_at,
      eventType,
      lifecycle: true,
      actor: "madbridge",
      fencingToken: token,
      payload,
    };
  }

  const sender = event["sender_execution_id"];
  if (typeof sender !== "string") {
    refuse("ledger_row_malformed", `row ${row.sequence}: sender_execution_id is not a string`);
  }
  return {
    sequence: row.sequence,
    eventHash: row.event_hash,
    createdAt: row.created_at,
    eventType,
    lifecycle: false,
    actor: sender,
    fencingToken: null,
    payload,
  };
}

/**
 * Recover the active writer from the chain (D10-R1 B3): the
 * `payload.writer_execution_id` of the latest `fencing_token_issued` row
 * whose envelope `fencing_token` equals `lifecycle.fencingToken`, and only
 * when `lifecycle.tokenState` is `"valid"`. In every other case, null. It is
 * never inferred from any other source.
 */
function recoverActiveWriterExecutionId(lifecycle: LifecycleState, rows: readonly ParsedRow[]): string | null {
  if (lifecycle.tokenState !== "valid") {
    return null;
  }
  const currentToken = lifecycle.fencingToken;
  if (typeof currentToken !== "number") {
    return null;
  }
  for (let index = rows.length - 1; index >= 0; index -= 1) {
    const row = rows[index];
    if (
      row !== undefined &&
      row.lifecycle &&
      row.eventType === "fencing_token_issued" &&
      row.fencingToken === currentToken
    ) {
      const writer = row.payload?.["writer_execution_id"];
      return typeof writer === "string" ? writer : null;
    }
  }
  return null;
}

function toLedgerEntrySnapshot(row: ParsedRow): LedgerEntrySnapshot {
  return {
    seq: row.sequence,
    type: row.eventType,
    actor: row.actor,
    fencingToken: row.fencingToken,
    hash: row.eventHash,
    timestamp: row.createdAt,
  };
}

function toIncidentSnapshot(incident: LifecycleState["incident"]): IncidentSnapshot | null {
  if (incident === null) {
    return null;
  }
  return {
    id: incident.id,
    reason: incident.reason,
    timestamp: incident.timestamp,
    severity: incident.severity,
  };
}

/**
 * Project authoritative broker state into a BrokerSnapshot, or refuse.
 *
 * Field sources (D10-R1 B3, as ruled by D9, D9-A1, D9-A2, and D9.2):
 * - `phase`, `fencingToken`, `tokenState`, `incident`, `sessionId` from
 *   `lifecycle`.
 * - `taskEnvelopeHash`, `repositoryFingerprint` from `provenance`.
 * - `ledgerSeq` is the `sequence` of the last row; `eventLog` is one
 *   LedgerEntrySnapshot per row, in order.
 * - `activeWriterExecutionId` is recovered from the chain, or null.
 * - `snapshotSeq` is null: the M9 per-published-snapshot sequence belongs
 *   to Task 22, and the projector never manufactures one (B4).
 * - `connected`, `task`, `permissionSummary`, `executions`,
 *   `ownershipState`, `queueDepth`, `pendingTransfers`, `verification`,
 *   `review` are null, meaning "not produced": no authoritative source
 *   exists at this base, and null is never a default or a placeholder.
 * - `pendingApprovals` is the empty collection: no event in either closed
 *   vocabulary can create a pending approval (D9.2 / FIELD-SOURCE row 17),
 *   so `[]` is the truthful projection, not a default.
 *
 * Equal input projected twice is deep-equal and mutates nothing; the same
 * input gives the same result or refusal on every call (B6).
 */
export function projectSnapshot(input: SnapshotProjectionInput): BrokerSnapshot {
  const { lifecycle, ledgerRows, provenance } = input;

  // B5, in order: sessionId, emptiness, contiguity, then per-row shape.
  const sessionId = lifecycle.sessionId;
  if (sessionId === null) {
    refuse("session_id_unavailable", "lifecycle.sessionId is null");
  }
  if (ledgerRows.length === 0) {
    refuse("ledger_rows_empty", "ledgerRows is empty");
  }
  let previousSequence: number | null = null;
  for (const row of ledgerRows) {
    if (!Number.isSafeInteger(row.sequence)) {
      refuse("ledger_sequence_discontiguous", `row sequence ${String(row.sequence)} is not a safe integer`);
    }
    if (previousSequence !== null && row.sequence !== previousSequence + 1) {
      refuse(
        "ledger_sequence_discontiguous",
        `row sequence ${row.sequence} does not follow ${previousSequence}`,
      );
    }
    previousSequence = row.sequence;
  }

  // Every row is parsed before anything is built, so a malformed row refuses
  // the whole projection rather than truncating the event log.
  const parsedRows = ledgerRows.map(parseRow);
  const lastRow = parsedRows[parsedRows.length - 1];
  if (lastRow === undefined) {
    refuse("ledger_rows_empty", "ledgerRows is empty");
  }

  const fingerprint = provenance.repositoryFingerprint;
  const repositoryFingerprint: RepositoryFingerprint =
    fingerprint.base_git_sha === undefined
      ? { kind: fingerprint.kind, sha256: fingerprint.sha256, git_sha: fingerprint.git_sha }
      : {
          kind: fingerprint.kind,
          sha256: fingerprint.sha256,
          git_sha: fingerprint.git_sha,
          base_git_sha: fingerprint.base_git_sha,
        };

  return {
    sessionId,
    snapshotSeq: null,
    connected: null,
    phase: lifecycle.phase,
    taskEnvelopeHash: provenance.taskEnvelopeHash,
    task: null,
    repositoryFingerprint,
    executions: null,
    activeWriterExecutionId: recoverActiveWriterExecutionId(lifecycle, parsedRows),
    fencingToken: lifecycle.fencingToken,
    tokenState: lifecycle.tokenState,
    pendingApprovals: [],
    pendingTransfers: null,
    permissionSummary: null,
    ownershipState: null,
    verification: null,
    review: null,
    incident: toIncidentSnapshot(lifecycle.incident),
    eventLog: parsedRows.map(toLedgerEntrySnapshot),
    queueDepth: null,
    ledgerSeq: lastRow.sequence,
  };
}
