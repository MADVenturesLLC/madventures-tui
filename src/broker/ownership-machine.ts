// broker/ownership-machine.ts
// Ownership lifecycle state machine (F3: separated from session).
//
// free → owned → transfer-requested → sender-released → receiver-validating → owned/rejected
//
// Fencing tokens: monotonically increasing. Each acquire/transfer grants a new token.
// Stale owners presenting an old token are rejected.

import type { CliId, OwnershipState, FencingToken, Attestation } from "../shared/types";

export class OwnershipMachine {
  private state: OwnershipState = {
    status: "free",
    holder: null,
    fencingToken: 0,
    heldSince: null,
    attested: false,
    transferFrom: null,
    transferTo: null,
    transferReason: null,
    transferRequestedAt: null,
    rejectionReason: null,
  };

  private listeners: Array<(state: OwnershipState) => void> = [];

  get current(): OwnershipState {
    return { ...this.state };
  }

  get token(): FencingToken {
    return this.state.fencingToken;
  }

  onChange(fn: (state: OwnershipState) => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private transition(next: OwnershipState): void {
    this.state = next;
    for (const fn of this.listeners) fn(this.current);
  }

  /**
   * Acquire ownership. Only succeeds if currently free.
   * Returns the new fencing token, or null if denied.
   */
  acquire(holder: CliId, attested: boolean): FencingToken | null {
    if (this.state.status !== "free") return null;
    const token = this.state.fencingToken + 1;
    this.transition({
      status: "owned",
      holder,
      fencingToken: token,
      heldSince: Date.now(),
      attested,
      transferFrom: null,
      transferTo: null,
      transferReason: null,
      transferRequestedAt: null,
      rejectionReason: null,
    });
    return token;
  }

  /**
   * Release ownership voluntarily. Must present the current fencing token.
   * Stale tokens are rejected.
   */
  release(token: FencingToken): boolean {
    if (this.state.status !== "owned") return false;
    if (this.state.fencingToken !== token) return false;
    this.transition({
      status: "free",
      holder: null,
      fencingToken: this.state.fencingToken + 1,
      heldSince: null,
      attested: false,
      transferFrom: null,
      transferTo: null,
      transferReason: null,
      transferRequestedAt: null,
      rejectionReason: null,
    });
    return true;
  }

  /**
   * Request transfer from current holder to another CLI.
   * Must present the current fencing token.
   */
  requestTransfer(to: CliId, reason: string, token: FencingToken): boolean {
    if (this.state.status !== "owned") return false;
    if (this.state.fencingToken !== token) return false;
    this.transition({
      ...this.state,
      status: "transfer-requested",
      transferFrom: this.state.holder,
      transferTo: to,
      transferReason: reason,
      transferRequestedAt: Date.now(),
    });
    return true;
  }

  /**
   * Sender confirms release of code state after transfer requested.
   * Moves to sender-released. Writing is now locked.
   */
  senderRelease(token: FencingToken): boolean {
    if (this.state.status !== "transfer-requested") return false;
    if (this.state.fencingToken !== token) return false;
    this.transition({ ...this.state, status: "sender-released" });
    return true;
  }

  /**
   * Receiver validates the code state and accepts ownership.
   * Requires attestation. Grants a new fencing token.
   */
  receiverAccept(attestation: Attestation): FencingToken | null {
    if (this.state.status !== "sender-released") return null;
    if (this.state.transferTo !== attestation.actor.cli) return null;
    const token = this.state.fencingToken + 1;
    this.transition({
      status: "owned",
      holder: this.state.transferTo,
      fencingToken: token,
      heldSince: Date.now(),
      attested: true,
      transferFrom: null,
      transferTo: null,
      transferReason: null,
      transferRequestedAt: null,
      rejectionReason: null,
    });
    return token;
  }

  /**
   * Receiver rejects the transfer. Ownership returns to free
   * (sender must re-acquire and re-attest).
   */
  receiverReject(reason: string): boolean {
    if (this.state.status !== "sender-released") return false;
    this.transition({
      status: "rejected",
      holder: null,
      fencingToken: this.state.fencingToken + 1,
      heldSince: null,
      attested: false,
      transferFrom: null,
      transferTo: null,
      transferReason: null,
      transferRequestedAt: null,
      rejectionReason: reason,
    });
    // Immediately transition to free so re-acquisition is possible
    this.transition({
      ...this.state,
      status: "free",
      rejectionReason: null,
    });
    return true;
  }

  /**
   * Validate a fencing token against the current state.
   * Used by permission engine to reject stale owners.
   */
  validateToken(token: FencingToken): boolean {
    return token === this.state.fencingToken;
  }
}
