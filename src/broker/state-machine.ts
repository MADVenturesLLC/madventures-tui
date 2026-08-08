// src/broker/state-machine.ts
// Writer lease state machine — the core ownership protocol.
// Framework-independent: no React, no OpenTUI.

import type { CliId, LeaseState } from "../shared/types";

export class StateMachine {
  private lease: LeaseState = { status: "free" };
  private listeners: Array<(lease: LeaseState) => void> = [];

  get current(): LeaseState {
    return this.lease;
  }

  onChange(fn: (lease: LeaseState) => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private transition(next: LeaseState): void {
    this.lease = next;
    for (const fn of this.listeners) fn(next);
  }

  acquire(holder: CliId, attested: boolean): boolean {
    if (this.lease.status !== "free") return false;
    this.transition({ status: "held", holder, since: Date.now(), attested });
    return true;
  }

  release(): void {
    this.transition({ status: "free" });
  }

  pause(lastVerifiedCode: string): void {
    if (this.lease.status !== "held") return;
    this.transition({
      status: "paused",
      holder: this.lease.holder,
      lastVerifiedCode,
      interrupted: Date.now(),
    });
  }

  requestTransfer(to: CliId): boolean {
    if (this.lease.status !== "held") return false;
    this.transition({
      status: "transferring",
      from: this.lease.holder,
      to,
      requested: Date.now(),
    });
    return true;
  }

  completeTransfer(attested: boolean): void {
    if (this.lease.status !== "transferring") return;
    this.transition({
      status: "held",
      holder: this.lease.to,
      since: Date.now(),
      attested,
    });
  }

  resume(attested: boolean): boolean {
    if (this.lease.status !== "paused") return false;
    this.transition({
      status: "held",
      holder: this.lease.holder,
      since: Date.now(),
      attested,
    });
    return true;
  }
}
