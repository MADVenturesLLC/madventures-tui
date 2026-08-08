// broker/approval.ts
// F2: Approval as typed immutable event.
// UI state cannot create authority. Approvals are ledger-bound events
// with actor, task envelope, repo fingerprint, scope, and timestamp.

import type {
  ApprovalEvent,
  ApprovalType,
  ActorIdentity,
  TaskEnvelope,
  CliId,
  LedgerEntryType,
} from "../shared/types";

export class ApprovalManager {
  private pending = new Map<string, ApprovalEvent>();
  private resolved = new Map<string, ApprovalEvent>();
  private listeners: Array<(event: ApprovalEvent) => void> = [];

  constructor(private chain: { append: (type: import("../shared/types").LedgerEntryType, actor: import("../shared/types").CliId, payload: Record<string, unknown>) => Promise<{ hash: string }> }) {}

  get pendingList(): ApprovalEvent[] {
    return Array.from(this.pending.values());
  }

  get hasPending(): boolean {
    return this.pending.size > 0;
  }

  onChange(fn: (event: ApprovalEvent) => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  /**
   * Create an approval request. This is an immutable event — once created,
   * the request fields cannot change. Only the resolution can be set.
   * The event hash is recorded in the ledger.
   */
  async request(
    type: ApprovalType,
    actor: ActorIdentity,
    task: TaskEnvelope,
  ): Promise<ApprovalEvent> {
    const event: ApprovalEvent = {
      id: crypto.randomUUID(),
      type,
      actor,
      task,
      repoFingerprint: task.repoFingerprint,
      scope: task.scope,
      timestamp: Date.now(),
      resolution: null,
      resolvedBy: null,
      resolvedAt: null,
      rejectionReason: null,
      hash: null,
    };

    // Record in ledger — this makes the request immutable and auditable
    const entry = await this.chain.append("approval", actor.cli, {
      approvalId: event.id,
      type: event.type,
      taskId: task.id,
      repoFingerprint: event.repoFingerprint,
      timestamp: event.timestamp,
    });
    event.hash = entry.hash;

    this.pending.set(event.id, event);
    this.listeners.forEach((fn) => fn(event));
    return event;
  }

  /**
   * Resolve an approval. Only the authorized resolver can do this.
   * The resolution is itself a ledger event.
   */
  async resolve(
    approvalId: string,
    decision: "approved" | "rejected",
    resolvedBy: ActorIdentity,
    rejectionReason?: string,
  ): Promise<ApprovalEvent | null> {
    const event = this.pending.get(approvalId);
    if (!event) return null;

    // Create resolved copy — original fields are immutable
    const resolved: ApprovalEvent = {
      ...event,
      resolution: decision,
      resolvedBy,
      resolvedAt: Date.now(),
      rejectionReason: rejectionReason ?? null,
    };

    // Record resolution in ledger
    await this.chain.append("approval", resolvedBy.cli, {
      approvalId: resolved.id,
      resolution: decision,
      resolvedBy: resolvedBy.cli,
      resolvedAt: resolved.resolvedAt,
      rejectionReason: resolved.rejectionReason,
    });

    this.pending.delete(approvalId);
    this.resolved.set(approvalId, resolved);
    this.listeners.forEach((fn) => fn(resolved));
    return resolved;
  }

  getPending(type?: ApprovalType): ApprovalEvent[] {
    const all = Array.from(this.pending.values());
    return type ? all.filter((e) => e.type === type) : all;
  }

  getResolved(approvalId: string): ApprovalEvent | null {
    return this.resolved.get(approvalId) ?? null;
  }
}
