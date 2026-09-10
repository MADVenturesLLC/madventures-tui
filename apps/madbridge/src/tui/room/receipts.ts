// apps/madbridge/src/tui/room/receipts.ts
// Room Runtime Phase 1 — evidence receipt honesty (capability L).
//
// @mad/claim-boundary = READ-ONLY-CONSUME (Commission Final r3 §9). This
// module ONLY imports and consumes the library's existing honesty contract;
// it modifies nothing there and invents no competing evidence ladder.
//
// Every Gateway ReceiptRef that the TUI turns into a durable/displayable
// receipt is bound to a claim boundary DERIVED BY THE LIBRARY from the
// receipt's rung — not_evidence_of is forced, never hand-written. A receipt
// whose rung is outside the closed set, or whose stated boundary fails
// validation, is refused fail-closed: the TUI does not default a legacy or
// malformed receipt to a presumed-safe rung (r1 §9: legacy handling fails
// closed where an authoritative boundary cannot be derived without inventing
// historical evidence).
//
// The lie this closes for the Room Runtime surfaces: "exit 0" / "executed"
// / "fixture ran" being readable as verification, review, CI, merge,
// occupancy proof, or activation. Fixture receipts arrive at or below
// `executed` (the Gateway's fixture ceiling); their forced boundary already
// excludes every claim above that rung.

import {
  EVIDENCE_RUNGS,
  makeClaimBoundary,
  validateClaimBoundary,
  type ClaimBoundary,
  type EvidenceRung,
} from "@mad/claim-boundary";
import type { RoomReceiptRef } from "@madventures/protocol";

/** A TUI-side durable receipt projection: Gateway facts + forced boundary. */
export interface BoundedRoomReceipt {
  readonly receipt_id: string;
  readonly kind: string;
  readonly rung: EvidenceRung;
  readonly room_seq: number;
  readonly facts: Record<string, unknown>;
  /** Derived by @mad/claim-boundary from the rung — never hand-authored. */
  readonly claim_boundary: ClaimBoundary;
  /** Phase 1 qualifier: fixture-only surfaces state it on every receipt. */
  readonly fixture_occupancy_only: true;
}

export class RoomReceiptError extends Error {
  readonly code: "UNKNOWN_RUNG" | "BOUNDARY_INVALID" | "RUNG_ABOVE_FIXTURE_CEILING";
  constructor(code: RoomReceiptError["code"], message: string) {
    super(message);
    this.name = "RoomReceiptError";
    this.code = code;
  }
}

/** The rung ceiling a Phase 1 fixture surface may honestly carry. */
export const FIXTURE_RUNG_CEILING: EvidenceRung = "executed";

function isRung(value: unknown): value is EvidenceRung {
  return typeof value === "string" && (EVIDENCE_RUNGS as readonly string[]).includes(value);
}

/**
 * Bind a Gateway ReceiptRef to its forced claim boundary. Fails closed on an
 * unknown rung, on a boundary the library refuses, and on any fixture receipt
 * claiming a rung above `executed` (a fixture cannot evidence attestation or
 * anything higher — surfacing such a receipt would be evidence promotion).
 */
export function bindRoomReceipt(ref: RoomReceiptRef): BoundedRoomReceipt {
  if (!isRung(ref.rung)) {
    throw new RoomReceiptError(
      "UNKNOWN_RUNG",
      `receipt ${ref.receipt_id} carries rung ${JSON.stringify(ref.rung)} outside the closed ladder — refusing to invent a boundary`,
    );
  }
  if (EVIDENCE_RUNGS.indexOf(ref.rung) > EVIDENCE_RUNGS.indexOf(FIXTURE_RUNG_CEILING)) {
    throw new RoomReceiptError(
      "RUNG_ABOVE_FIXTURE_CEILING",
      `receipt ${ref.receipt_id} claims rung "${ref.rung}" above the Phase 1 fixture ceiling "${FIXTURE_RUNG_CEILING}" — a fixture surface cannot carry that evidence`,
    );
  }
  const boundary = makeClaimBoundary(ref.rung, `room-runtime phase1 fixture receipt: ${ref.kind}`);
  const issues = validateClaimBoundary(boundary);
  if (issues.length > 0) {
    throw new RoomReceiptError(
      "BOUNDARY_INVALID",
      `receipt ${ref.receipt_id}: derived boundary failed validation: ${issues.map((i) => i.code).join(", ")}`,
    );
  }
  return {
    receipt_id: ref.receipt_id,
    kind: ref.kind,
    rung: ref.rung,
    room_seq: ref.room_seq,
    facts: ref.facts,
    claim_boundary: boundary,
    fixture_occupancy_only: true,
  };
}

/**
 * Validate a stored/legacy receipt object without inventing evidence: the
 * stored claim_boundary must be present and library-valid for its rung.
 * Returns the defect list (empty = honest).
 */
export function validateStoredRoomReceipt(value: unknown): string[] {
  if (typeof value !== "object" || value === null) return ["receipt is not an object"];
  const rec = value as Record<string, unknown>;
  const problems: string[] = [];
  if (!isRung(rec["rung"])) problems.push("rung is outside the closed ladder");
  if (!("claim_boundary" in rec)) {
    problems.push("claim_boundary missing — legacy receipt without a boundary fails closed");
    return problems;
  }
  const issues = validateClaimBoundary(rec["claim_boundary"]);
  for (const issue of issues) problems.push(`${issue.code}${issue.path ? `@${issue.path}` : ""}`);
  if (isRung(rec["rung"]) && issues.length === 0) {
    const boundary = rec["claim_boundary"] as ClaimBoundary;
    if (boundary.rung !== rec["rung"]) {
      problems.push(`claim_boundary.rung "${boundary.rung}" does not match receipt rung "${String(rec["rung"])}"`);
    }
  }
  if (rec["fixture_occupancy_only"] !== true) {
    problems.push("fixture_occupancy_only qualifier missing — a Phase 1 receipt must state it");
  }
  return problems;
}
