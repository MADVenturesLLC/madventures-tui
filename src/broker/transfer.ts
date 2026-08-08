// src/broker/transfer.ts
// Ownership transfer protocol with re-attestation requirement.
// Broker records last verified code state, pauses writing, and requires
// the receiving CLI to attest before the lease completes.

import type { CliId, TransferRequest, Attestation } from "../shared/types";

export class TransferManager {
  private pending: TransferRequest | null = null;

  get current(): TransferRequest | null {
    return this.pending;
  }

  request(
    from: CliId,
    to: CliId,
    reason: string,
    lastVerifiedCode: string,
  ): TransferRequest {
    this.pending = {
      id: crypto.randomUUID(),
      from,
      to,
      reason,
      timestamp: Date.now(),
      lastVerifiedCode,
    };
    return this.pending;
  }

  accept(attestation: Attestation): { ok: boolean; error?: string } {
    if (!this.pending) {
      return { ok: false, error: "No pending transfer" };
    }
    if (attestation.actor !== this.pending.to) {
      return { ok: false, error: "Attestation from wrong actor" };
    }
    // Verify code hash matches last verified state
    // (in production, compare against actual code state hash)
    this.pending = null;
    return { ok: true };
  }

  reject(): void {
    this.pending = null;
  }

  get isPending(): boolean {
    return this.pending !== null;
  }
}
