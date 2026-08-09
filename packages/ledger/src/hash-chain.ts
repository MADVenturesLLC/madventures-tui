// packages/ledger/src/hash-chain.ts
// SHA-256 hash chain computation for ledger events.

import { sha256Hex } from "@madventures/protocol";

export const GENESIS_HASH = "0".repeat(64);

export function computeEventHash(previousHash: string, eventJson: string): string {
  const input = previousHash + eventJson;
  return sha256Hex(input);
}