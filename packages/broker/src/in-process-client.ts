// packages/broker/src/in-process-client.ts
// Phase 3A M10 Task 22: the in-process BrokerClient (specification sections
// 9.3-9.4; plan Task 22; Founder Decision DEC-20260926-01 Parts B and C).
//
// This module creates a client-local, in-process implementation of the
// Task 20 BrokerClient contract (./client.ts, byte-identical, never
// modified). It is not a socket, not a daemon, not a broker subscriber
// registry, not a cache, and not a second authority: every snapshot is
// produced on demand from RuntimeBroker.snapshotProjectionInput() through
// the existing pure projector (./snapshot.ts), and every command is judged
// by the existing pure legality matrix (./command-legality.ts). RuntimeBroker
// itself is never exported from this module or from ./index.ts.
//
// The client principal is bound at construction and deep-frozen: neither the
// caller's original object nor the bound copy can be mutated afterward.
//
// Output delivery: until a separately authorized production OutputFrame
// producer exists, nothing in this module inserts a frame into a client's
// output buffer during ordinary operation. The single exception is
// `unsafeTestOnlyIngestOutputFrame`, an explicitly test-only, non-authority
// helper that inserts a supplied frame into one client's own buffer. It
// writes no ledger row, calls no RuntimeBroker mutator, and invokes no
// process; it is not a production delivery API.

import type {
  BrokerClient,
  BrokerCommand,
  BrokerResult,
  BrokerSnapshot,
  ClientPrincipal,
  OutputFrame,
} from "./client";
import { evaluateCommandLegality } from "./command-legality";
import { projectSnapshot } from "./snapshot";
import type { RuntimeBroker } from "./runtime-broker";
import type { BridgeEventV1 } from "@madventures/protocol";

/**
 * The Task 22 stamped snapshot type (DEC-20260926-01 B1). It narrows only the
 * two fields the in-process client itself is authoritative for: `snapshotSeq`
 * (this client's own monotonic delivery sequence) and `connected` (true for
 * every snapshot delivered before this client closes). Every other field is
 * exactly the BrokerSnapshot contract, unchanged.
 */
export type StampedBrokerSnapshot = Omit<BrokerSnapshot, "snapshotSeq" | "connected"> & {
  readonly snapshotSeq: number;
  readonly connected: boolean;
};

/** The in-process client surface: the closed BrokerClient contract, plus the bound, deep-frozen principal. */
export interface InProcessBrokerClient extends BrokerClient {
  readonly principal: ClientPrincipal;
  snapshots(): AsyncIterable<StampedBrokerSnapshot>;
}

/** Recursively freeze a value so no nested field can be reassigned after binding. */
function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const key of Object.keys(value as object)) {
      deepFreeze((value as Record<string, unknown>)[key]);
    }
  }
  return value;
}

/** Defensively copy and deep-freeze a ClientPrincipal so the caller's own object can never reach the bound value. */
function bindPrincipal(principal: ClientPrincipal): ClientPrincipal {
  const copy: ClientPrincipal =
    principal.kind === "founder_tui"
      ? { kind: "founder_tui" }
      : { kind: "execution", executionId: principal.executionId };
  return deepFreeze(copy);
}

/** One client-local, per-execution FIFO output buffer. outputSeq starts at 1 and increases by one per frame. */
interface OutputBuffer {
  seq: number;
  readonly queue: OutputFrame[];
}

class InProcessBrokerClientImpl implements InProcessBrokerClient {
  private readonly broker: RuntimeBroker;
  readonly principal: ClientPrincipal;
  private closed = false;
  private deliveredSeq = 0;
  private readonly outputBuffers = new Map<string, OutputBuffer>();

  constructor(broker: RuntimeBroker, principal: ClientPrincipal) {
    this.broker = broker;
    this.principal = bindPrincipal(principal);
  }

  async getSnapshot(): Promise<BrokerSnapshot> {
    return this.nextStampedSnapshot();
  }

  async *snapshots(): AsyncIterable<StampedBrokerSnapshot> {
    while (!this.closed) {
      yield this.nextStampedSnapshot();
    }
  }

  async *output(executionId: string): AsyncIterable<OutputFrame> {
    while (!this.closed) {
      const buffer = this.outputBuffers.get(executionId);
      if (buffer === undefined || buffer.queue.length === 0) {
        return;
      }
      const frame = buffer.queue.shift();
      if (frame !== undefined) {
        yield frame;
      }
    }
  }

  async request(command: BrokerCommand): Promise<BrokerResult> {
    const snapshot = projectSnapshot(this.broker.snapshotProjectionInput());
    const legality = evaluateCommandLegality(command, snapshot, this.principal);
    if (!legality.ok) {
      return { ok: false, commandId: command.commandId, error: legality.error, detail: legality.detail };
    }
    return { ok: true, commandId: command.commandId, acceptedSnapshotSeq: this.deliveredSeq };
  }

  async publish(event: BridgeEventV1): Promise<BrokerResult> {
    // No production delivery seam is authorized for this client (DEC-20260926-01 C4).
    return {
      ok: false,
      commandId: event.event_id,
      error: "unauthorized",
      detail: "publish is not authorized on the in-process client",
    };
  }

  async close(): Promise<void> {
    // Releases only this client's own subscriptions and buffers. The bound
    // RuntimeBroker, its ledger, and its session are never touched here.
    this.closed = true;
    this.outputBuffers.clear();
  }

  private nextStampedSnapshot(): StampedBrokerSnapshot {
    const projected = projectSnapshot(this.broker.snapshotProjectionInput());
    this.deliveredSeq += 1;
    return { ...projected, snapshotSeq: this.deliveredSeq, connected: true };
  }

  /** Test-only: insert one supplied frame into this client's own output buffer for one execution. */
  __unsafeTestOnlyIngestOutputFrame(executionId: string, bytes: Uint8Array): void {
    const sessionId = this.broker.snapshotProjectionInput().lifecycle.sessionId;
    if (sessionId === null) {
      throw new Error("in-process-client test ingest: no durable sessionId is available");
    }
    let buffer = this.outputBuffers.get(executionId);
    if (buffer === undefined) {
      buffer = { seq: 0, queue: [] };
      this.outputBuffers.set(executionId, buffer);
    }
    buffer.seq += 1;
    buffer.queue.push({ sessionId, executionId, outputSeq: buffer.seq, bytes });
  }
}

/** Create a client-local BrokerClient bound to one principal over one RuntimeBroker. Creates no second authority. */
export function createInProcessBrokerClient(
  broker: RuntimeBroker,
  principal: ClientPrincipal,
): InProcessBrokerClient {
  return new InProcessBrokerClientImpl(broker, principal);
}

/**
 * Test-only, non-authority helper (DEC-20260926-01 B4): insert one supplied
 * output frame into one client's own output buffer. Writes no ledger row,
 * calls no RuntimeBroker mutator, invokes no process, and is never a
 * production delivery API.
 */
export function unsafeTestOnlyIngestOutputFrame(
  client: InProcessBrokerClient,
  executionId: string,
  bytes: Uint8Array,
): void {
  (client as InProcessBrokerClientImpl).__unsafeTestOnlyIngestOutputFrame(executionId, bytes);
}
