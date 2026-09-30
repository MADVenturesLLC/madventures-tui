// packages/broker/src/in-process-client.ts
// Phase 3A M10 Task 22: the in-process BrokerClient (specification sections
// 9.3-9.4; plan Task 22; Founder Decisions DEC-20260926-01 Parts B and C and
// DEC-20260929-01 Part B and DEC-20260929-02 Part B).
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
// Nothing handed to a caller is shared (DEC-20260929-02 B2). Every iterator
// result, output frame, snapshot with its nested values, and BrokerResult is
// created fresh for the delivery that hands it out, and an ingested frame's
// bytes are copied on ingest. No module-scope object, array, Map or Set is
// ever returned or resolved to a caller, so changing anything a caller
// receives changes no later delivery, no internal state and no other client.
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
//
// Sequence invariants (plan Task 23; Founder Decision DEC-20260930-02 Part B):
// one check per stream compares each offered sequence with the last accepted
// one, which is 0 before anything is accepted. On a session mismatch,
// duplicate, regression or gap the client calls RuntimeBroker.interrupt with
// the stream's reason code, awaits it, and only then rejects with
// SequenceInvariantError; the offending frame is never queued, delivered or
// accepted, and this client stays open. The snapshot counter and both output
// seams feed the same check. The two Task 23 seams,
// `unsafeTestOnlyIngestRawOutputFrame` and `unsafeTestOnlyOfferSnapshotSeq`,
// follow the same WeakMap pattern and the same limits, except that a refused
// offer reaches RuntimeBroker.interrupt as described.

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
 * every snapshot delivered before this client closes, false for one that
 * getSnapshot() delivers after close(), DEC-20260929-02 B3). Every other field
 * is exactly the BrokerSnapshot contract, unchanged.
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

/** A fresh completion result for every delivery: a caller may rewrite what it receives. */
function iterationDone(): IteratorResult<OutputFrame> {
  return { done: true, value: undefined };
}

/**
 * The typed sequence invariant failure (plan Task 23). A caller receives one
 * only after the session interruption it caused has been awaited
 * (DEC-20260930-02 B5). It is created fresh for each violation and carries the
 * kind, the stream, a message naming the last accepted and the offered
 * sequence, and, if the interruption itself failed, that failure as `cause`
 * (B6). It holds no frame bytes, no internal state and no broker (B9).
 */
export class SequenceInvariantError extends Error {
  readonly kind: "session_mismatch" | "duplicate" | "regression" | "gap";
  readonly stream: "snapshot" | "output";

  constructor(
    kind: SequenceInvariantError["kind"],
    stream: SequenceInvariantError["stream"],
    message: string,
    options?: { cause?: unknown },
  ) {
    super(message, options);
    this.name = "SequenceInvariantError";
    this.kind = kind;
    this.stream = stream;
  }
}
// Every such error shares this class and its prototype, so neither is writable (B9).
Object.freeze(SequenceInvariantError.prototype);
Object.freeze(SequenceInvariantError);

/** One refused offer: everything the interruption detail names (DEC-20260930-02 B4). */
interface SequenceViolation {
  readonly kind: SequenceInvariantError["kind"];
  readonly stream: SequenceInvariantError["stream"];
  readonly lastAccepted: number;
  readonly offered: number;
}

/**
 * The one check both streams run (DEC-20260930-02 B1): equal to the last
 * accepted sequence is a duplicate, below it a regression, and exactly one
 * above it is accepted. Anything else is a gap, so nothing but last + 1 is
 * ever accepted.
 */
function sequenceViolation(lastAccepted: number, offered: number): "duplicate" | "regression" | "gap" | null {
  if (offered === lastAccepted) {
    return "duplicate";
  }
  if (offered < lastAccepted) {
    return "regression";
  }
  if (offered === lastAccepted + 1) {
    return null;
  }
  return "gap";
}

/** One client's test seams, reachable only through the exported test-only helpers. */
interface TestSeams {
  readonly ingestStamped: (executionId: string, bytes: Uint8Array) => void;
  readonly ingestRaw: (frame: OutputFrame) => Promise<void>;
  readonly offerSnapshotSeq: (candidate: number) => Promise<void>;
}

const testSeams = new WeakMap<InProcessBrokerClient, TestSeams>();

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
  // The last accepted snapshotSeq (DEC-20260930-02 B1).
  let deliveredSeq = 0;
  // One FIFO queue and one outputSeq per execution. outputSeq starts at 1 and
  // increases by exactly one per frame; outputSeqs holds the last accepted one.
  const outputQueues = new Map<string, OutputFrame[]>();
  const outputSeqs = new Map<string, number>();
  const outputWaiters = new Set<OutputWaiter>();

  /**
   * B3 to B6: interrupt the session with the stream's reason code, await it,
   * then reject with a fresh SequenceInvariantError. The detail names the
   * stream, the kind and both sequences, never frame bytes. If the
   * interruption fails, that failure is the error's cause; there is no latch
   * and no retry.
   */
  async function raise(violation: SequenceViolation): Promise<never> {
    const { kind, stream, lastAccepted, offered } = violation;
    const detail = `${stream} sequence ${kind}: last accepted ${lastAccepted}, offered ${offered}`;
    const reason = stream === "output" ? "output_sequence_invariant_failed" : "snapshot_sequence_invariant_failed";
    try {
      await broker.interrupt(reason, detail, "high", `incident-${crypto.randomUUID()}`, null, null);
    } catch (cause) {
      throw new SequenceInvariantError(kind, stream, detail, { cause });
    }
    throw new SequenceInvariantError(kind, stream, detail);
  }

  /** B1 on the snapshot stream: accept the candidate as the last accepted snapshotSeq, or return the violation. */
  function admitSnapshotSeq(candidate: number): SequenceViolation | null {
    const kind = sequenceViolation(deliveredSeq, candidate);
    if (kind !== null) {
      return { kind, stream: "snapshot", lastAccepted: deliveredSeq, offered: candidate };
    }
    deliveredSeq = candidate;
    return null;
  }

  // The client's own counter always offers last + 1, which the check accepts,
  // so the snapshot is returned synchronously exactly as before (B5).
  function nextStampedSnapshot(): StampedBrokerSnapshot | Promise<never> {
    const projected = projectSnapshot(broker.snapshotProjectionInput());
    const violation = admitSnapshotSeq(deliveredSeq + 1);
    if (violation !== null) {
      return raise(violation);
    }
    return { ...projected, snapshotSeq: deliveredSeq, connected: !closed };
  }

  /**
   * B1, B2 and B5 on the output stream; both output seams feed every frame
   * through here. A frame of this session offering its execution's last
   * accepted outputSeq plus one is queued and delivered, with its bytes copied
   * on ingest. Any other frame interrupts the session and is never queued,
   * delivered or accepted. The frame is read once, so nothing it holds can
   * change between the check and the delivery.
   */
  async function ingestOutputFrame(frame: OutputFrame): Promise<void> {
    const { sessionId, executionId, outputSeq, bytes } = frame;
    const lastAccepted = outputSeqs.get(executionId) ?? 0;
    const kind =
      sessionId === broker.snapshotProjectionInput().lifecycle.sessionId
        ? sequenceViolation(lastAccepted, outputSeq)
        : "session_mismatch";
    if (kind !== null) {
      return raise({ kind, stream: "output", lastAccepted, offered: outputSeq });
    }
    outputSeqs.set(executionId, outputSeq);
    const queue = outputQueues.get(executionId) ?? [];
    outputQueues.set(executionId, queue);
    // Copied on ingest: the delivered frame's bytes is never the caller's array.
    queue.push({ sessionId, executionId, outputSeq, bytes: new Uint8Array(bytes) });
    for (const waiter of [...outputWaiters]) {
      const delivered = waiter.executionId === executionId ? queue.shift() : undefined;
      if (delivered !== undefined) {
        waiter.settle({ done: false, value: delivered });
      }
    }
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
              return Promise.resolve(iterationDone());
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
              waiter.settle(iterationDone());
            }
            return Promise.resolve(iterationDone());
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
      waiter.settle(iterationDone());
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

  testSeams.set(client, {
    ingestStamped(executionId, bytes) {
      if (closed) {
        throw new Error("in-process-client test ingest: this client is closed");
      }
      const sessionId = broker.snapshotProjectionInput().lifecycle.sessionId;
      if (sessionId === null) {
        throw new Error("in-process-client test ingest: no durable sessionId is available");
      }
      // This seam stamps the durable sessionId and the next outputSeq itself, so
      // its frame always passes the shared check and is queued and delivered
      // before this returns (DEC-20260930-02 B7).
      void ingestOutputFrame({ sessionId, executionId, outputSeq: (outputSeqs.get(executionId) ?? 0) + 1, bytes });
    },
    async ingestRaw(frame) {
      if (closed) {
        throw new Error("in-process-client test ingest: this client is closed");
      }
      return ingestOutputFrame(frame);
    },
    async offerSnapshotSeq(candidate) {
      const violation = admitSnapshotSeq(candidate);
      if (violation !== null) {
        return raise(violation);
      }
    },
  });

  return client;
}

function seamsOf(client: InProcessBrokerClient): TestSeams {
  const seams = testSeams.get(client);
  if (seams === undefined) {
    throw new Error("in-process-client test ingest: not a client created by createInProcessBrokerClient");
  }
  return seams;
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
  seamsOf(client).ingestStamped(executionId, bytes);
}

/**
 * Test-only, non-authority helper (DEC-20260930-02 B7): offer one output frame
 * to one client exactly as given, with the caller's sessionId and outputSeq. A
 * valid frame is queued and delivered as unsafeTestOnlyIngestOutputFrame
 * delivers one; any other frame interrupts the session through
 * RuntimeBroker.interrupt and rejects with SequenceInvariantError. Writes no
 * ledger row itself, invokes no process, and is never a production delivery
 * API. Exported from this module only, never from ./index.ts.
 */
export async function unsafeTestOnlyIngestRawOutputFrame(
  client: InProcessBrokerClient,
  frame: OutputFrame,
): Promise<void> {
  return seamsOf(client).ingestRaw(frame);
}

/**
 * Test-only, non-authority helper (DEC-20260930-02 B7): offer one snapshotSeq
 * candidate to one client's snapshot sequence check. An accepted candidate
 * becomes the last accepted snapshotSeq and no snapshot is delivered; a refused
 * one interrupts the session through RuntimeBroker.interrupt and rejects with
 * SequenceInvariantError. Writes no ledger row itself and invokes no process.
 * Exported from this module only, never from ./index.ts.
 */
export async function unsafeTestOnlyOfferSnapshotSeq(
  client: InProcessBrokerClient,
  candidate: number,
): Promise<void> {
  return seamsOf(client).offerSnapshotSeq(candidate);
}
