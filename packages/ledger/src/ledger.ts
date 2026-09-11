// packages/ledger/src/ledger.ts
// SQLite-backed append-only hash-chained ledger.
// Uses bun:sqlite for atomic transactions.

import { Database } from "bun:sqlite";
import type { LedgerEventV1 } from "@madventures/protocol";
import { canonicalJson } from "@madventures/protocol";
import { computeEventHash, GENESIS_HASH } from "./hash-chain";
import { SCHEMA_SQL } from "./schema";

export interface LedgerRow {
  sequence: number;
  event_id: string;
  event_json: string;
  previous_hash: string;
  event_hash: string;
  created_at: string;
}

export interface VerifyResult {
  valid: boolean;
  count: number;
  head: string;
  brokenSequence?: number;
}

export class Ledger {
  private db: Database;

  constructor(dbPath: string) {
    this.db = new Database(dbPath);
    this.db.run(SCHEMA_SQL);
  }

  append(event: LedgerEventV1): LedgerRow {
    // A single append is a batch of one. There is one chain algorithm.
    const [row] = this.appendMany([event]);
    if (row === undefined) {
      throw new Error("append: the one-event batch produced no row");
    }
    return row;
  }

  /**
   * Append every event in one transaction, in order, or none of them.
   *
   * The incident pair (an original BridgeEventV1 plus its derived
   * session_interrupted lifecycle record) must be indivisible: one
   * BEGIN IMMEDIATE, ordered inserts that chain within the batch, one final
   * chain_head update, and a complete ROLLBACK on any failure. No snapshot or
   * callback can observe a partially written batch. Returned rows preserve
   * input order.
   */
  appendMany(events: readonly LedgerEventV1[]): readonly LedgerRow[] {
    if (events.length === 0) return [];

    const rows: LedgerRow[] = [];
    this.db.run("BEGIN IMMEDIATE");
    try {
      // Read the committed head inside the transaction so the first record in
      // the batch chains from it and nothing can advance the head in between.
      let prevHash = this.getHeadHash();
      let sequence = this.getNextSequence();

      for (const event of events) {
        const eventJson = canonicalJson(event);
        const eventHash = computeEventHash(prevHash, eventJson);
        const createdAt = event.created_at;
        this.db.run(
          `INSERT INTO events (sequence, event_id, event_json, previous_hash, event_hash, created_at)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [sequence, event.event_id, eventJson, prevHash, eventHash, createdAt],
        );
        rows.push({ sequence, event_id: event.event_id, event_json: eventJson, previous_hash: prevHash, event_hash: eventHash, created_at: createdAt });
        prevHash = eventHash;
        sequence += 1;
      }

      // One chain_head update: the last record's sequence and hash.
      this.db.run(
        `UPDATE chain_head SET sequence = ?, hash = ? WHERE id = 1`,
        [sequence - 1, prevHash],
      );
      this.db.run("COMMIT");
    } catch (err) {
      this.db.run("ROLLBACK");
      throw err;
    }

    return rows;
  }

  verify(): VerifyResult {
    const rows = this.db
      .query("SELECT sequence, event_id, event_json, previous_hash, event_hash, created_at FROM events ORDER BY sequence ASC")
      .all() as Array<LedgerRow>;

    let expectedPrev = GENESIS_HASH;

    for (const row of rows) {
      if (row.previous_hash !== expectedPrev) {
        return { valid: false, count: rows.length, head: expectedPrev, brokenSequence: row.sequence };
      }
      const recomputed = computeEventHash(row.previous_hash, row.event_json);
      if (recomputed !== row.event_hash) {
        return { valid: false, count: rows.length, head: expectedPrev, brokenSequence: row.sequence };
      }
      expectedPrev = row.event_hash;
    }

    return { valid: true, count: rows.length, head: expectedPrev };
  }

  readAfter(sequence: number): Array<LedgerRow> {
    return this.db
      .query("SELECT sequence, event_id, event_json, previous_hash, event_hash, created_at FROM events WHERE sequence > ? ORDER BY sequence ASC")
      .all(sequence) as Array<LedgerRow>;
  }

  close(): void {
    this.db.close();
  }

  /**
   * UNSAFE: Test-only method to mutate a payload for tamper detection tests.
   * This intentionally breaks the hash chain.
   */
  unsafeTestOnlyMutatePayload(sequence: number, newJson: string): void {
    this.db.run(
      "UPDATE events SET event_json = ? WHERE sequence = ?",
      [newJson, sequence],
    );
  }

  private getHeadHash(): string {
    const row = this.db.query("SELECT hash FROM chain_head WHERE id = 1").get() as { hash: string } | null;
    return row?.hash ?? GENESIS_HASH;
  }

  private getNextSequence(): number {
    const row = this.db.query("SELECT sequence FROM chain_head WHERE id = 1").get() as { sequence: number } | null;
    return (row?.sequence ?? 0) + 1;
  }
}