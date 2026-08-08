// broker/transfer.ts
// Ownership transfer protocol with re-attestation requirement (F3+F5).
// Uses OwnershipMachine states and fencing tokens.

import type { CliId, TransferRequest, Attestation, ActorIdentity, TaskEnvelope } from "../shared/types";
import type { OwnershipMachine } from "./ownership-machine";
import type { SessionMachine } from "./session-machine";

export class TransferManager {
  private pending: TransferRequest | null = null;

  constructor(
    private ownership: OwnershipMachine,
    private sessions: SessionMachine,
  ) {}

  get current(): TransferRequest | null {
    return this.pending ? { ...this.pending } : null;
  }

  get isPending(): boolean {
    return this.pending !== null;
  }

  /**
   * Initiate a transfer. Ownership machine must be in "owned" state.
   * Caller must present a valid fencing token.
   */
  request(
    from: ActorIdentity,
    to: CliId,
    reason: string,
    task: TaskEnvelope,
  ): TransferRequest | null {
    const token = this.ownership.token;
    if (!this.ownership.requestTransfer(to, reason, token)) {
      return null;
    }

    // Pause the sender's session
    const lastCode = this.sessions.get(from.cli).lastVerifiedCode ?? "";
    this.sessions.pause(from.cli, lastCode);

    this.pending = {
      id: crypto.randomUUID(),
      from,
      to,
      reason,
      fencingToken: token,
      lastVerifiedCode: lastCode,
      task,
      timestamp: Date.now(),
      status: "pending",
    };
    return this.pending;
  }

  /**
   * Sender releases the code state. Moves ownership to "sender-released".
   */
  senderRelease(actor: ActorIdentity): boolean {
    if (!this.pending || this.pending.from.cli !== actor.cli) return false;
    return this.ownership.senderRelease(this.pending.fencingToken);
  }

  /**
   * Receiver accepts and attests. Ownership moves to receiver with new fencing token.
   */
  accept(attestation: Attestation): { ok: boolean; newToken?: number; error?: string } {
    if (!this.pending) {
      return { ok: false, error: "No pending transfer" };
    }
    if (attestation.actor.cli !== this.pending.to) {
      return { ok: false, error: "Attestation from wrong actor" };
    }

    const newToken = this.ownership.receiverAccept(attestation);
    if (newToken === null) {
      return { ok: false, error: "Ownership machine rejected acceptance" };
    }

    // Start receiver session
    this.sessions.reconcile(this.pending.to);

    this.pending.status = "accepted";
    this.pending = null;
    return { ok: true, newToken };
  }

  /**
   * Receiver rejects. Ownership returns to free.
   */
  reject(reason: string): boolean {
    if (!this.pending) return false;
    this.ownership.receiverReject(reason);
    this.pending.status = "rejected";
    this.pending = null;
    return true;
  }
}
