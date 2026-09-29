// packages/broker/src/in-process-client.ts
// Phase 3A M10 Task 22: the in-process BrokerClient (specification sections
// 9.3-9.4; plan Task 22; Founder Decisions DEC-20260926-01 Parts B and C and
// DEC-20260929-01 Part B).
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
// Runtime isolation: `private` in TypeScript is not private at runtime, so
// this client keeps no state on the object it returns. The bound broker, the
// principal that request() evaluates under, the closed flag, the snapshot
// counter and the output buffers are closure variables. The returned object
// is frozen and holds only the six contract methods plus a separate, frozen
// copy of the principal for callers to read. Nothing a caller can assign,
// redefine, delete or re-prototype changes what request() evaluates.
//
// Output delivery: until a separately authorized production OutputFrame
// producer exists, nothing in this module inserts a frame into a client's
// output buffer during ordinary operation. output(executionId) waits for the
// next frame and ends only when this client closes. The single exception to
// "no insertion" is `unsafeTestOnlyIngestOutputFrame`, an explicitly
// test-only, non-authority helper that inserts a supplied frame into one
// client's own buffer. It reaches that client through a module-private
// WeakMap, not through any property of the client. It writes no ledger row,
// calls no RuntimeBroker mutator, and invokes no process; it is not a
// production delivery API and is not exported from ./index.ts.

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

/**
 * The in-process client surface: the closed BrokerClient contract, plus the
 * bound, deep-frozen principal. Both snapshot methods deliver the stamped type
 * and share one per-client counter (DEC-20260929-01 B1 item 1).
 */
export interface InProcessBrokerClient extends BrokerClient {
  readonly principal: ClientPrincipal;
  getSnapshot(): Promise<StampedBrokerSnapshot>;
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

/** A pending next() of one output iterator, waiting for a frame of one execution. */
interface OutputWaiter {
  readonly executionId: string;
  readonly settle: (result: IteratorResult<OutputFrame>) => void;
}

const ITERATION_DONE: IteratorResult<OutputFrame> = { done: true, value: undefined };

/** The test seam: each client's ingest function, reachable only through the exported test-only helper. */
const testIngestSeams = new WeakMap<InProcessBrokerClient, (executionId: string, bytes: Uint8Array) => void>();

/** Create a client-local BrokerClient bound to one principal over one RuntimeBroker. Creates no second authority. */
export function createInProcessBrokerClient(
  broker: RuntimeBroker,
  principal: ClientPrincipal,
): InProcessBrokerClient {
  // The principal request() evaluates under never leaves this closure; the
  // one callers can read is a separate frozen copy.
  const evaluatedPrincipal = bindPrincipal(principal);
  const readablePrincipal = bindPrincipal(evaluatedPrincipal);

  let closed = false;
  let deliveredSeq = 0;
  // One FIFO queue and one outputSeq per execution. outputSeq starts at 1 and
  // increases by exactly one per frame.
  const outputQueues = new Map<string, OutputFrame[]>();
  const outputSeqs = new Map<string, number>();
  const outputWaiters = new Set<OutputWaiter>();

  function nextStampedSnapshot(): StampedBrokerSnapshot {
    const projected = projectSnapshot(broker.snapshotProjectionInput());
    deliveredSeq += 1;
    return { ...projected, snapshotSeq: deliveredSeq, connected: true };
  }

  async function getSnapshot(): Promise<StampedBrokerSnapshot> {
    return nextStampedSnapshot();
  }

  async function* snapshots(): AsyncGenerator<StampedBrokerSnapshot> {
    while (!closed) {
      yield nextStampedSnapshot();
    }
  }

  // output(executionId) does not end when its buffer is empty: it waits for the
  // next frame and ends only when this client closes (DEC-20260929-01 B3).
  function output(executionId: string): AsyncIterable<OutputFrame> {
    return {
      [Symbol.asyncIterator](): AsyncIterator<OutputFrame> {
        const own = new Set<OutputWaiter>();
        let finished = false;
        return {
          next(): Promise<IteratorResult<OutputFrame>> {
            if (finished || closed) {
              return Promise.resolve(ITERATION_DONE);
            }
            const queued = outputQueues.get(executionId)?.shift();
            if (queued !== undefined) {
              return Promise.resolve({ done: false, value: queued });
            }
            return new Promise((resolve) => {
              const waiter: OutputWaiter = {
                executionId,
                settle: (result) => {
                  outputWaiters.delete(waiter);
                  own.delete(waiter);
                  resolve(result);
                },
              };
              outputWaiters.add(waiter);
              own.add(waiter);
            });
          },
          return(): Promise<IteratorResult<OutputFrame>> {
            finished = true;
            for (const waiter of [...own]) {
              waiter.settle(ITERATION_DONE);
            }
            return Promise.resolve(ITERATION_DONE);
          },
        };
      },
    };
  }

  async function request(command: BrokerCommand): Promise<BrokerResult> {
    const snapshot = projectSnapshot(broker.snapshotProjectionInput());
    const legality = evaluateCommandLegality(command, snapshot, evaluatedPrincipal);
    if (!legality.ok) {
      return { ok: false, commandId: command.commandId, error: legality.error, detail: legality.detail };
    }
    return { ok: true, commandId: command.commandId, acceptedSnapshotSeq: deliveredSeq };
  }

  async function publish(event: BridgeEventV1): Promise<BrokerResult> {
    // No production delivery seam is authorized for this client (DEC-20260926-01 C4).
    return {
      ok: false,
      commandId: event.event_id,
      error: "unauthorized",
      detail: "publish is not authorized on the in-process client",
    };
  }

  async function close(): Promise<void> {
    // Releases only this client's own iterators and buffers. The bound
    // RuntimeBroker, its ledger, and its session are never touched here.
    closed = true;
    outputQueues.clear();
    outputSeqs.clear();
    for (const waiter of [...outputWaiters]) {
      waiter.settle(ITERATION_DONE);
    }
  }

  const client: InProcessBrokerClient = Object.freeze({
    principal: readablePrincipal,
    getSnapshot,
    snapshots,
    output,
    request,
    publish,
    close,
  });

  testIngestSeams.set(client, (executionId, bytes) => {
    if (closed) {
      throw new Error("in-process-client test ingest: this client is closed");
    }
    const sessionId = broker.snapshotProjectionInput().lifecycle.sessionId;
    if (sessionId === null) {
      throw new Error("in-process-client test ingest: no durable sessionId is available");
    }
    const outputSeq = (outputSeqs.get(executionId) ?? 0) + 1;
    outputSeqs.set(executionId, outputSeq);
    const queue = outputQueues.get(executionId) ?? [];
    outputQueues.set(executionId, queue);
    queue.push({ sessionId, executionId, outputSeq, bytes });
    for (const waiter of [...outputWaiters]) {
      const frame = waiter.executionId === executionId ? queue.shift() : undefined;
      if (frame !== undefined) {
        waiter.settle({ done: false, value: frame });
      }
    }
  });

  return client;
}

/**
 * Test-only, non-authority helper (DEC-20260926-01 B4): insert one supplied
 * output frame into one client's own output buffer. Writes no ledger row,
 * calls no RuntimeBroker mutator, invokes no process, and is never a
 * production delivery API. Exported from this module only, never from ./index.ts
 * (DEC-20260929-01 B1 item 5).
 */
export function unsafeTestOnlyIngestOutputFrame(
  client: InProcessBrokerClient,
  executionId: string,
  bytes: Uint8Array,
): void {
  const ingest = testIngestSeams.get(client);
  if (ingest === undefined) {
    throw new Error("in-process-client test ingest: not a client created by createInProcessBrokerClient");
  }
  ingest(executionId, bytes);
}
