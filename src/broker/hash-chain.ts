// src/broker/hash-chain.ts
// Hash-chained append-only ledger for attestation and recovery.
// Each entry's hash = sha256(prevHash + seq + type + actor + payload + timestamp).

import type { LedgerEntry } from "../shared/types";

const encoder = new TextEncoder();

async function sha256(data: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", encoder.encode(data));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export class HashChain {
  private entries: LedgerEntry[] = [];
  private lastHash = "0000000000000000000000000000000000000000000000000000000000000000";

  get all(): LedgerEntry[] {
    return [...this.entries];
  }

  get last(): LedgerEntry | undefined {
    return this.entries[this.entries.length - 1];
  }

  async append(
    type: LedgerEntry["type"],
    actor: LedgerEntry["actor"],
    payload: Record<string, unknown>,
  ): Promise<LedgerEntry> {
    const seq = this.entries.length + 1;
    const timestamp = Date.now();
    const prevHash = this.lastHash;

    const hashInput = `${prevHash}|${seq}|${type}|${actor}|${JSON.stringify(payload)}|${timestamp}`;
    const hash = await sha256(hashInput);

    const entry: LedgerEntry = {
      seq,
      type,
      actor,
      payload,
      prevHash,
      hash,
      timestamp,
    };

    this.entries.push(entry);
    this.lastHash = hash;
    return entry;
  }

  async verify(): Promise<boolean> {
    let expectedPrev = "0000000000000000000000000000000000000000000000000000000000000000";

    for (const entry of this.entries) {
      if (entry.prevHash !== expectedPrev) return false;
      const hashInput = `${entry.prevHash}|${entry.seq}|${entry.type}|${entry.actor}|${JSON.stringify(entry.payload)}|${entry.timestamp}`;
      const recomputed = await sha256(hashInput);
      if (recomputed !== entry.hash) return false;
      expectedPrev = entry.hash;
    }
    return true;
  }
}
