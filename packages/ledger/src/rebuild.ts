// packages/ledger/src/rebuild.ts
// Deterministic state reconstruction from verified ledger events.

import type { LedgerRow } from "./ledger";

export interface RebuiltState {
  count: number;
  lastEventHash: string;
  events: LedgerRow[];
}

export function rebuildState(rows: Array<LedgerRow>): RebuiltState {
  if (rows.length === 0) {
    return { count: 0, lastEventHash: "0".repeat(64), events: [] };
  }
  const last = rows[rows.length - 1];
  return { count: rows.length, lastEventHash: last?.event_hash ?? "0".repeat(64), events: rows };
}