// packages/ledger/src/hash-chain.ts
// SHA-256 hash chain computation for ledger events.

export const GENESIS_HASH = "0".repeat(64);

export function computeEventHash(previousHash: string, eventJson: string): string {
  const input = previousHash + eventJson;
  return Bun.hash(input).toString(16).padStart(64, "0");
}