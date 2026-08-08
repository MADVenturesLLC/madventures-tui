// broker/hash-chain.ts
// Hash-chained append-only ledger for attestation and recovery.
// Each entry's hash = sha256(prevHash + seq + type + actor + fencingToken + payload + timestamp).

import type { LedgerEntry, LedgerEntryType, CliId, FencingToken, TaskEnvelope } from "../shared/types";

const encoder = new TextEncoder();

async function sha256(data: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", encoder.encode(data));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const GENESIS_HASH = "0".repeat(64);

export class HashChain {
  private entries: LedgerEntry[] = [];
  private lastHash = GENESIS_HASH;

  get all(): LedgerEntry[] {
    return [...this.entries];
  }

  get last(): LedgerEntry | undefined {
    return this.entries[this.entries.length - 1];
  }

  async append(
    type: LedgerEntryType,
    actor: CliId,
    payload: Record<string, unknown>,
    fencingToken: FencingToken = 0,
    task: TaskEnvelope | null = null,
  ): Promise<LedgerEntry> {
    const seq = this.entries.length + 1;
    const timestamp = Date.now();
    const prevHash = this.lastHash;

    const hashInput = `${prevHash}|${seq}|${type}|${actor}|${fencingToken}|${JSON.stringify(payload)}|${timestamp}`;
    const hash = await sha256(hashInput);

    const entry: LedgerEntry = {
      seq,
      type,
      actor,
      fencingToken,
      task,
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
    let expectedPrev = GENESIS_HASH;

    for (const entry of this.entries) {
      if (entry.prevHash !== expectedPrev) return false;
      const hashInput = `${entry.prevHash}|${entry.seq}|${entry.type}|${entry.actor}|${entry.fencingToken}|${JSON.stringify(entry.payload)}|${entry.timestamp}`;
      const recomputed = await sha256(hashInput);
      if (recomputed !== entry.hash) return false;
      expectedPrev = entry.hash;
    }
    return true;
  }
}
