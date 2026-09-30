// packages/broker/test/in-process-client.test.ts
// Phase 3A M10 Task 22: the in-process BrokerClient (specification sections
// 9.3-9.4; plan Task 22; Founder Decision DEC-20260926-01 Part D). Exactly
// five named tests, run over a real bun:sqlite Ledger and a real
// RuntimeBroker — no fake ledger, no wrapper, no callback, no seam.
// Phase 3A M10 Task 23 (plan Task 23; Founder Decision DEC-20260930-02 Parts
// B to D) appends four named tests for the sequence invariants, nine in all.

import { expect, test } from "bun:test";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as barrel from "../src/index";
import type { InProcessBrokerClient as BarrelInProcessBrokerClient, StampedBrokerSnapshot as BarrelStampedBrokerSnapshot } from "../src/index";
import { createInProcessBrokerClient, unsafeTestOnlyIngestOutputFrame } from "../src/in-process-client";
import type { InProcessBrokerClient, StampedBrokerSnapshot } from "../src/in-process-client";
// DEC-20260930-02 D3: the Task 23 helpers and error are read as properties of
// a namespace import, so a missing export fails only the tests that use it.
import * as inProcess from "../src/in-process-client";
import { RuntimeBroker } from "../src/runtime-broker";
import type { RuntimeBrokerDeps, RuntimeBrokerProvenance } from "../src/runtime-broker";
import type { BrokerCommand, ClientPrincipal, OutputFrame } from "../src/client";
import { GENESIS_HASH, Ledger } from "@madventures/ledger";
import { PROTOCOL_VERSION } from "@madventures/protocol";
import type { RepositoryFingerprint, SessionLifecycleEventV1 } from "@madventures/protocol";

// ─── Fixtures ───

const SESSION_ID = "ses-inprocess-022";
const WRITER_A = "exec-claude-22";
const WRITER_B = "exec-agy-22";
const EXECUTION_IDS: readonly string[] = [WRITER_A, WRITER_B];
const ENVELOPE_HASH = "a".repeat(64);

const FINGERPRINT: RepositoryFingerprint = {
  kind: "commit",
  sha256: "b".repeat(64),
  git_sha: "c".repeat(40),
};

const PROVENANCE: RuntimeBrokerProvenance = {
  taskEnvelopeHash: ENVELOPE_HASH,
  repositoryFingerprint: FINGERPRINT,
};

const FOUNDER_PRINCIPAL: ClientPrincipal = { kind: "founder_tui" };

function openLedger(): Ledger {
  const dir = mkdtempSync(join(tmpdir(), "madv-in-process-client-"));
  return new Ledger(join(dir, "ledger.sqlite3"));
}

function sessionOpen(sessionId = SESSION_ID, eventId = "evt-open-22"): SessionLifecycleEventV1 {
  return {
    protocol_version: PROTOCOL_VERSION,
    event_id: eventId,
    session_id: sessionId,
    event_type: "session_open",
    actor: "madbridge",
    task_envelope_hash: ENVELOPE_HASH,
    repository_fingerprint: FINGERPRINT,
    fencing_token: null,
    reason_code: null,
    created_at: "2026-09-26T00:00:00.000Z",
    previous_event_hash: GENESIS_HASH,
    payload: { authorization_reference: "ACT-inprocess-22", execution_ids: [...EXECUTION_IDS] },
  };
}

function makeBroker(ledger: Ledger): RuntimeBroker {
  let tick = 0;
  let generated = 0;
  const deps: RuntimeBrokerDeps = {
    ledger,
    provenance: PROVENANCE,
    sources: {
      now: () => {
        tick += 1;
        return `2026-09-26T00:00:${String(tick).padStart(2, "0")}.000Z`;
      },
      nextEventId: () => `evt-22-${(generated += 1)}`,
    },
    terminateGovernedProcesses: async () => {},
    observe: () => {},
  };
  return new RuntimeBroker(deps);
}

async function activeBroker(): Promise<{ ledger: Ledger; broker: RuntimeBroker }> {
  const ledger = openLedger();
  ledger.append(sessionOpen());
  const broker = makeBroker(ledger);
  await broker.activate(WRITER_A, EXECUTION_IDS);
  return { ledger, broker };
}

function eventTypesOf(broker: RuntimeBroker): string[] {
  return broker
    .snapshotProjectionInput()
    .ledgerRows.map((row) => (JSON.parse(row.event_json) as { event_type: string }).event_type);
}

// ─── Helpers for the DEC-20260929-01 correction assertions ───

const PAUSE_COMMAND: BrokerCommand = {
  kind: "session_pause",
  commandId: "cmd-pause-22",
  sessionId: SESSION_ID,
  reason: "test",
};

/** True when the promise has not settled within a short window; a settled promise resolves in a microtask. */
async function isPending(promise: Promise<unknown>): Promise<boolean> {
  const marker = Symbol("pending");
  return (await Promise.race([promise, Bun.sleep(25).then(() => marker)])) === marker;
}

function frameOf(result: IteratorResult<OutputFrame>): OutputFrame {
  if (result.done === true) {
    throw new Error("expected an output frame, the iterator was done");
  }
  return result.value;
}

function withoutSeq(snapshot: StampedBrokerSnapshot): Omit<StampedBrokerSnapshot, "snapshotSeq"> {
  const { snapshotSeq, ...rest } = snapshot;
  void snapshotSeq;
  return rest;
}

/** Every non-function object reachable from root by property reads and prototype links. */
function reachableObjects(root: object): Set<object> {
  const seen = new Set<object>();
  const stack: unknown[] = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    if (typeof current !== "object" || current === null || seen.has(current) || current === Object.prototype) {
      continue;
    }
    seen.add(current);
    stack.push(Object.getPrototypeOf(current));
    for (const key of Reflect.ownKeys(current)) {
      const descriptor = Object.getOwnPropertyDescriptor(current, key);
      stack.push(descriptor?.value, descriptor?.get, descriptor?.set);
    }
  }
  return seen;
}

/** A refused write is as good as a silent one: the outcome the caller then observes is what each test asserts. */
function attempt(write: () => void): void {
  try {
    write();
  } catch {
    // intentionally ignored
  }
}

interface TamperableProjectionInput {
  lifecycle: {
    phase: string;
    tokenState: string;
    fencingToken: number | null;
    readyExecutionIds: string[];
    incident: unknown;
  };
  provenance: { taskEnvelopeHash: string; repositoryFingerprint: { sha256: string } };
  ledgerRows: unknown[];
}

// ─── 1 ───

test("the bound principal cannot be changed by the caller", async () => {
  const { broker } = await activeBroker();
  const original: ClientPrincipal = { kind: "execution", executionId: WRITER_A };
  const client = createInProcessBrokerClient(broker, original);

  // Mutating the caller's original object after construction must not reach the bound principal.
  (original as { executionId: string }).executionId = "exec-attacker";
  expect(client.principal).toEqual({ kind: "execution", executionId: WRITER_A });

  // The bound principal itself is deep-frozen: an attempted mutation throws and changes nothing.
  expect(Object.isFrozen(client.principal)).toBe(true);
  expect(() => {
    (client.principal as { executionId: string }).executionId = "exec-attacker-2";
  }).toThrow();
  expect(client.principal).toEqual({ kind: "execution", executionId: WRITER_A });

  // DEC-20260929-01 B1 item 3: the principal is fixed at runtime, not only in
  // TypeScript. No route changes the principal request() evaluates under: an
  // execution principal still may not issue a governance command afterward.
  const founder: ClientPrincipal = { kind: "founder_tui" };
  const routes: Record<string, (target: InProcessBrokerClient) => void> = {
    assignment: (target) => {
      (target as { principal: ClientPrincipal }).principal = founder;
    },
    defineProperty: (target) => {
      Object.defineProperty(target, "principal", { value: founder, writable: true, configurable: true });
    },
    deletion: (target) => {
      delete (target as { principal?: ClientPrincipal }).principal;
    },
    prototype: (target) => {
      Object.setPrototypeOf(target, { principal: founder });
    },
    deletionThenPrototype: (target) => {
      attempt(() => {
        delete (target as { principal?: ClientPrincipal }).principal;
      });
      Object.setPrototypeOf(target, { principal: founder });
    },
    nestedAssignment: (target) => {
      (target.principal as { kind: string }).kind = "founder_tui";
    },
    nestedDefineProperty: (target) => {
      Object.defineProperty(target.principal, "kind", { value: "founder_tui" });
    },
    nestedPrototype: (target) => {
      Object.setPrototypeOf(target.principal, founder);
    },
  };
  const outcomes: Record<string, string> = {};
  for (const [name, route] of Object.entries(routes)) {
    const target = createInProcessBrokerClient(broker, { kind: "execution", executionId: WRITER_A });
    attempt(() => route(target));
    outcomes[name] = await Promise.resolve()
      .then(() => target.request(PAUSE_COMMAND))
      .then(
      (result) => (result.ok ? "accepted" : result.error),
      () => "threw",
    );
    await Promise.resolve()
      .then(() => target.close())
      .catch(() => undefined);
  }
  expect(outcomes).toEqual(Object.fromEntries(Object.keys(routes).map((name) => [name, "unauthorized"])));
});

// ─── 2 ───

test("snapshotSeq is strictly increasing by one", async () => {
  const { broker } = await activeBroker();
  const client = createInProcessBrokerClient(broker, FOUNDER_PRINCIPAL);

  const iterator = client.snapshots()[Symbol.asyncIterator]();
  const first = (await iterator.next()).value as StampedBrokerSnapshot;
  const second = (await iterator.next()).value as StampedBrokerSnapshot;
  const third = (await iterator.next()).value as StampedBrokerSnapshot;

  expect(first.snapshotSeq).toBe(1);
  expect(second.snapshotSeq).toBe(2);
  expect(third.snapshotSeq).toBe(3);
  expect(first.connected).toBe(true);
  expect(second.connected).toBe(true);
  expect(third.connected).toBe(true);

  // DEC-20260926-01 B3: the accessor supplies the complete ledger chain
  // starting at sequence 1, not a suffix, and every row follows contiguously.
  const input = broker.snapshotProjectionInput();
  expect(input.ledgerRows.length).toBeGreaterThan(0);
  expect(input.ledgerRows[0]?.sequence).toBe(1);
  for (let index = 1; index < input.ledgerRows.length; index += 1) {
    expect(input.ledgerRows[index]?.sequence).toBe(input.ledgerRows[index - 1]!.sequence + 1);
  }

  // DEC-20260929-01 B1 item 1: getSnapshot() is typed as StampedBrokerSnapshot
  // (this assignment fails `tsc --noEmit` otherwise) and shares the one
  // per-client counter with snapshots().
  const oneShot: StampedBrokerSnapshot = await client.getSnapshot();
  const fifth = (await iterator.next()).value as StampedBrokerSnapshot;
  const sixth: BarrelStampedBrokerSnapshot = await client.getSnapshot();
  expect([oneShot.snapshotSeq, fifth.snapshotSeq, sixth.snapshotSeq]).toEqual([4, 5, 6]);
  expect(oneShot.connected).toBe(true);
  const fresh = createInProcessBrokerClient(broker, FOUNDER_PRINCIPAL);
  expect((await fresh.getSnapshot()).snapshotSeq).toBe(1);
  await fresh.close();

  // DEC-20260929-01 B1 item 2: the accessor hands out no reference into
  // broker state. Rewriting every part of a returned input leaves the broker's
  // later inputs, later snapshots and later request() results unchanged.
  const observer = createInProcessBrokerClient(broker, FOUNDER_PRINCIPAL);
  const pristine = structuredClone(broker.snapshotProjectionInput());
  const snapshotBefore = withoutSeq(await observer.getSnapshot());
  const resultBefore = await observer.request(PAUSE_COMMAND);
  expect(resultBefore.ok).toBe(true);
  const tampered = broker.snapshotProjectionInput() as unknown as TamperableProjectionInput;
  tampered.lifecycle.phase = "closed";
  tampered.lifecycle.tokenState = "invalidated";
  tampered.lifecycle.fencingToken = 999;
  tampered.lifecycle.readyExecutionIds.push("exec-injected");
  tampered.lifecycle.incident = { id: "inc-injected", reason: "injected", timestamp: "t", severity: "high" };
  tampered.provenance.taskEnvelopeHash = "f".repeat(64);
  tampered.provenance.repositoryFingerprint.sha256 = "f".repeat(64);
  tampered.ledgerRows.length = 0;
  expect(broker.snapshotProjectionInput()).toEqual(pristine);
  expect(await observer.request(PAUSE_COMMAND)).toEqual(resultBefore);
  expect(withoutSeq(await observer.getSnapshot())).toEqual(snapshotBefore);
  await observer.close();

  // DEC-20260929-02 B2: every snapshot is built fresh for its delivery.
  // Rewriting a delivered snapshot, nested values included, changes no later
  // delivery on this client and none on another client.
  const witness = createInProcessBrokerClient(broker, FOUNDER_PRINCIPAL);
  const reference = withoutSeq(await witness.getSnapshot());
  const handed = await client.getSnapshot();
  attempt(() => {
    const target = handed as unknown as {
      phase: string;
      eventLog: { hash: string }[];
      pendingApprovals: unknown[];
      repositoryFingerprint: { sha256: string };
    };
    target.phase = "closed";
    target.eventLog[0]!.hash = "forged";
    target.eventLog.length = 0;
    target.pendingApprovals.push({ id: "forged" });
    target.repositoryFingerprint.sha256 = "f".repeat(64);
  });
  expect(withoutSeq(await client.getSnapshot())).toEqual(reference);
  expect(withoutSeq(await witness.getSnapshot())).toEqual(reference);
  await witness.close();

  await client.close();
});

// ─── 3 ───

test("outputSeq is per execution and strictly increasing by one", async () => {
  const { broker } = await activeBroker();
  const client = createInProcessBrokerClient(broker, FOUNDER_PRINCIPAL);

  unsafeTestOnlyIngestOutputFrame(client, WRITER_A, new Uint8Array([1]));
  unsafeTestOnlyIngestOutputFrame(client, WRITER_A, new Uint8Array([2]));
  unsafeTestOnlyIngestOutputFrame(client, WRITER_B, new Uint8Array([9]));

  const iteratorA = client.output(WRITER_A)[Symbol.asyncIterator]();
  const iteratorB = client.output(WRITER_B)[Symbol.asyncIterator]();
  const framesA = [frameOf(await iteratorA.next()), frameOf(await iteratorA.next())];
  const framesB = [frameOf(await iteratorB.next())];

  expect(framesA.map((frame) => frame.outputSeq)).toEqual([1, 2]);
  expect(framesB.map((frame) => frame.outputSeq)).toEqual([1]);
  expect(framesA.every((frame) => frame.executionId === WRITER_A)).toBe(true);
  expect(framesB.every((frame) => frame.executionId === WRITER_B)).toBe(true);

  // DEC-20260929-01 B3: an empty buffer does not end output(). It waits for the
  // next frame, which continues the same per-execution sequence.
  const waiting = iteratorA.next();
  expect(await isPending(waiting)).toBe(true);
  unsafeTestOnlyIngestOutputFrame(client, WRITER_A, new Uint8Array([3]));
  expect(frameOf(await waiting).outputSeq).toBe(3);

  // DEC-20260929-02 B2: ingested bytes are copied on ingest, so the delivered
  // frame's bytes is not the array the caller passed in, and rewriting a
  // delivered frame changes nothing on another client that ingested the same array.
  const source = new Uint8Array([1, 2, 3]);
  const twin = createInProcessBrokerClient(broker, FOUNDER_PRINCIPAL);
  unsafeTestOnlyIngestOutputFrame(client, WRITER_B, source);
  unsafeTestOnlyIngestOutputFrame(twin, WRITER_B, source);
  source[0] = 99;
  const copied = frameOf(await iteratorB.next());
  expect([...copied.bytes]).toEqual([1, 2, 3]);
  expect(copied.bytes).not.toBe(source);
  attempt(() => {
    copied.bytes[1] = 77;
    (copied as { outputSeq: number }).outputSeq = 500;
    (copied as { executionId: string }).executionId = "exec-forged";
  });
  expect([...source]).toEqual([99, 2, 3]);
  const twinFrame = frameOf(await twin.output(WRITER_B)[Symbol.asyncIterator]().next());
  expect([...twinFrame.bytes]).toEqual([1, 2, 3]);
  expect([twinFrame.outputSeq, twinFrame.executionId]).toEqual([1, WRITER_B]);
  await twin.close();

  // DEC-20260929-01 B1 item 5: the barrel exports the factory and the two
  // types, never the test-only ingest helper. Tests import it from the module.
  expect(Object.keys(barrel).filter((name) => /in.?process|unsafe|ingest/i.test(name))).toEqual([
    "createInProcessBrokerClient",
  ]);
  expect("RuntimeBroker" in barrel).toBe(false);
  const typed: BarrelInProcessBrokerClient = client;
  expect(typed).toBe(client);

  await client.close();
});

// ─── 4 ───

test("close releases only this client and does not terminate the session", async () => {
  const { broker } = await activeBroker();
  const clientA = createInProcessBrokerClient(broker, FOUNDER_PRINCIPAL);
  const clientB = createInProcessBrokerClient(broker, FOUNDER_PRINCIPAL);

  const beforeClose = await clientA.getSnapshot();
  expect(beforeClose.phase).toBe("active");

  // DEC-20260929-01 B3: pending iterators wait, and only close() ends them.
  const pendingOutput = clientA.output(WRITER_A)[Symbol.asyncIterator]();
  const pendingNext = pendingOutput.next();
  const returnedOutput = clientA.output(WRITER_B)[Symbol.asyncIterator]();
  const returnedNext = returnedOutput.next();
  const openSnapshots = clientA.snapshots()[Symbol.asyncIterator]();
  expect((await openSnapshots.next()).done).toBe(false);
  const otherClientNext = clientB.output(WRITER_A)[Symbol.asyncIterator]().next();
  expect(await isPending(pendingNext)).toBe(true);
  expect(await isPending(returnedNext)).toBe(true);
  const returnResult = await returnedOutput.return?.();
  expect(returnResult?.done).toBe(true);
  const returnedSettled = await returnedNext;
  expect(returnedSettled.done).toBe(true);

  await clientA.close();

  // clientA's own iteration stops immediately.
  const iterator = clientA.snapshots()[Symbol.asyncIterator]();
  const result = await iterator.next();
  expect(result.done).toBe(true);
  const settledByClose = await pendingNext;
  expect(settledByClose.done).toBe(true);
  expect((await openSnapshots.next()).done).toBe(true);
  const doneFromNext = await clientA.output(WRITER_A)[Symbol.asyncIterator]().next();
  expect(doneFromNext.done).toBe(true);

  // DEC-20260929-02 B3: after close(), getSnapshot() still resolves a stamped
  // snapshot, now with connected false, and the per-client counter continues
  // (two snapshots were delivered before the close).
  const afterClose = await clientA.getSnapshot();
  expect(afterClose.connected).toBe(false);
  expect(afterClose.snapshotSeq).toBe(3);
  expect((await clientA.getSnapshot()).snapshotSeq).toBe(4);

  // DEC-20260929-02 B2: every done result is fresh for its delivery. Rewriting
  // each one that was handed out (from next(), from return() and from the
  // settlement of waiters in close()) changes no later iterator on this client
  // and none on another client.
  for (const handed of [returnResult, returnedSettled, settledByClose, doneFromNext]) {
    attempt(() => {
      const target = handed as { done: boolean; value: unknown };
      target.done = false;
      target.value = "corrupt";
    });
  }
  const later = await clientA.output(WRITER_A)[Symbol.asyncIterator]().next();
  expect([later.done, later.value]).toEqual([true, undefined]);
  const spare = await clientB.output(WRITER_B)[Symbol.asyncIterator]().return?.();
  expect([spare?.done, spare?.value]).toEqual([true, undefined]);

  // Releasing clientA releases only clientA: clientB's pending output keeps waiting.
  expect(await isPending(otherClientNext)).toBe(true);

  // DEC-20260929-01 B1 item 4: no handle is reachable at runtime. The bound
  // broker, the closed flag, the snapshot counter and the output buffers are
  // not properties of the client, and nothing reachable from it is writable.
  for (const client of [clientA, clientB]) {
    expect(Reflect.ownKeys(client).map(String).sort()).toEqual([
      "close",
      "getSnapshot",
      "output",
      "principal",
      "publish",
      "request",
      "snapshots",
    ]);
    const reachable = reachableObjects(client);
    expect(reachable.has(broker)).toBe(false);
    expect([...reachable].every((object) => Object.isFrozen(object))).toBe(true);
  }
  for (const name of ["broker", "closed", "deliveredSeq", "outputBuffers"]) {
    expect(name in clientA).toBe(false);
  }
  // Writing the internals by name changes nothing: clientA stays closed and
  // clientB's counter continues from its own last delivery.
  attempt(() => {
    (clientA as unknown as { closed: boolean }).closed = false;
  });
  expect((await clientA.snapshots()[Symbol.asyncIterator]().next()).done).toBe(true);
  attempt(() => {
    (clientB as unknown as { deliveredSeq: number }).deliveredSeq = 100;
  });
  expect((await clientB.getSnapshot()).snapshotSeq).toBe(1);

  // clientB, bound to the same broker, is wholly unaffected.
  const stillActive = await clientB.getSnapshot();
  expect(stillActive.phase).toBe("active");
  expect(stillActive.sessionId).toBe(SESSION_ID);

  // The broker's own durable session is untouched: closing clientA appended
  // no session_closing or session_closed record.
  const types = eventTypesOf(broker);
  expect(types).not.toContain("session_closing");
  expect(types).not.toContain("session_closed");

  await clientB.close();
  const settledOther = await otherClientNext;
  expect([settledOther.done, settledOther.value]).toEqual([true, undefined]);
});

// ─── 5 ───

test("a command carrying a foreign sessionId fails with session_mismatch", async () => {
  const { broker } = await activeBroker();
  const client = createInProcessBrokerClient(broker, { kind: "execution", executionId: WRITER_A });

  const command: BrokerCommand = {
    kind: "pty_terminate",
    commandId: "cmd-foreign-22",
    sessionId: "ses-foreign-999",
    executionId: WRITER_A,
    reason: "founder_request",
  };

  const result = await client.request(command);
  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.error).toBe("session_mismatch");
  }

  // DEC-20260929-02 B2: BrokerResult objects, publish() results included, are
  // fresh for every call. Rewriting one changes no later result on this client
  // and none on another client.
  const expected = structuredClone(result);
  const rival = createInProcessBrokerClient(broker, { kind: "execution", executionId: WRITER_A });
  attempt(() => {
    const target = result as { ok: boolean; error: string; detail: string };
    target.ok = true;
    target.error = "invariant_failure";
    target.detail = "forged";
  });
  expect(await client.request(command)).toEqual(expected);
  expect(await rival.request(command)).toEqual(expected);
  const founderClient = createInProcessBrokerClient(broker, FOUNDER_PRINCIPAL);
  const accepted = await founderClient.request(PAUSE_COMMAND);
  const acceptedCopy = structuredClone(accepted);
  expect(acceptedCopy.ok).toBe(true);
  attempt(() => {
    (accepted as { acceptedSnapshotSeq: number }).acceptedSnapshotSeq = 999;
    (accepted as { commandId: string }).commandId = "forged";
  });
  expect(await founderClient.request(PAUSE_COMMAND)).toEqual(acceptedCopy);
  const event = { event_id: "evt-publish-22" } as never;
  const published = await founderClient.publish(event);
  const publishedCopy = structuredClone(published);
  expect(publishedCopy.commandId).toBe("evt-publish-22");
  attempt(() => {
    (published as { error: string }).error = "forged";
    (published as { detail: string }).detail = "forged";
  });
  expect(await rival.publish(event)).toEqual(publishedCopy);
  await rival.close();
  await founderClient.close();

  await client.close();
});

// ─── Helpers for the DEC-20260930-02 sequence-invariant tests ───

/** The rejection a promise settles with; a promise that resolves fails the test. */
async function rejectionOf(promise: Promise<unknown>): Promise<unknown> {
  return promise.then(
    () => {
      throw new Error("expected a rejection, the promise resolved");
    },
    (error: unknown) => error,
  );
}

function expectSequenceError(error: unknown, kind: string, stream: string): void {
  expect(error).toBeInstanceOf(inProcess.SequenceInvariantError);
  const typed = error as { name: unknown; kind: unknown; stream: unknown };
  expect([typed.name, typed.kind, typed.stream]).toEqual(["SequenceInvariantError", kind, stream]);
}

/**
 * DEC-20260930-02 D5, read durably through snapshotProjectionInput(): one
 * session_interrupted row with the B3 reason code and the B4 payload, followed
 * by fencing_token_invalidated, session_closing and session_closed, all four
 * carrying the same incident id. The id's value is never asserted (B4).
 */
function expectInterruption(broker: RuntimeBroker, reasonCode: string, detail: string): void {
  const events = broker
    .snapshotProjectionInput()
    .ledgerRows.map((row) => JSON.parse(row.event_json) as SessionLifecycleEventV1);
  const tail = events.slice(events.findIndex((event) => event.event_type === "session_interrupted"));
  expect(tail.map((event) => event.event_type)).toEqual([
    "session_interrupted",
    "fencing_token_invalidated",
    "session_closing",
    "session_closed",
  ]);
  expect(tail[0]?.reason_code).toBe(reasonCode);
  expect(tail[0]?.payload).toEqual({
    incident_id: expect.any(String),
    reason: detail,
    severity: "high",
    source_event_id: null,
    reported_by_execution_id: null,
  });
  const incidentIds = tail.map((event) => (event.payload as { incident_id: unknown }).incident_id);
  expect(typeof incidentIds[0]).toBe("string");
  expect(incidentIds[0]).not.toBe("");
  expect(incidentIds).toEqual([incidentIds[0], incidentIds[0], incidentIds[0], incidentIds[0]]);
}

// ─── 6 ───

test("an output sequence gap interrupts the session with output_sequence_invariant_failed", async () => {
  const { broker } = await activeBroker();
  const client = createInProcessBrokerClient(broker, FOUNDER_PRINCIPAL);
  const pending = client.output(WRITER_A)[Symbol.asyncIterator]().next();

  // DEC-20260930-02 D5: the first frame of an execution offers outputSeq 2, not 1.
  const gap: OutputFrame = { sessionId: SESSION_ID, executionId: WRITER_A, outputSeq: 2, bytes: new Uint8Array([4, 2]) };
  const error = await rejectionOf(inProcess.unsafeTestOnlyIngestRawOutputFrame(client, gap));

  expectSequenceError(error, "gap", "output");
  expectInterruption(broker, "output_sequence_invariant_failed", "output sequence gap: last accepted 0, offered 2");

  // B5: the gap is not delivered to the pending next() and not queued for a later one.
  expect(await isPending(pending)).toBe(true);
  expect(await isPending(client.output(WRITER_A)[Symbol.asyncIterator]().next())).toBe(true);

  // B5: the gap never became the last accepted outputSeq, so the same frame is
  // a gap again, not a duplicate. The session is already closed, so the broker
  // refuses the second interruption and appends no row.
  expectSequenceError(await rejectionOf(inProcess.unsafeTestOnlyIngestRawOutputFrame(client, gap)), "gap", "output");
  expect(eventTypesOf(broker).filter((type) => type === "session_interrupted")).toHaveLength(1);
  expect(await isPending(pending)).toBe(true);

  // B9: the error carries no reference to the frame's bytes or to the broker.
  const reachable = reachableObjects(error as object);
  expect(reachable.has(gap.bytes)).toBe(false);
  expect(reachable.has(broker)).toBe(false);

  // B6 and B10: the violation left this client open, and only close() ends the
  // pending next(), which never received a frame.
  await client.close();
  const settled = await pending;
  expect([settled.done, settled.value]).toEqual([true, undefined]);
});

// ─── 7 ───

test("a snapshot sequence regression interrupts the session with snapshot_sequence_invariant_failed", async () => {
  const { broker } = await activeBroker();
  const client = createInProcessBrokerClient(broker, FOUNDER_PRINCIPAL);
  // The snapshot stream has no execution; the pending next() is WRITER_A's output.
  const pending = client.output(WRITER_A)[Symbol.asyncIterator]().next();

  expect((await client.getSnapshot()).snapshotSeq).toBe(1);
  expect((await client.getSnapshot()).snapshotSeq).toBe(2);
  // B7: an accepted candidate delivers no snapshot and becomes the last accepted snapshotSeq.
  expect(await inProcess.unsafeTestOnlyOfferSnapshotSeq(client, 3)).toBeUndefined();

  const error = await rejectionOf(inProcess.unsafeTestOnlyOfferSnapshotSeq(client, 1));

  expectSequenceError(error, "regression", "snapshot");
  expectInterruption(
    broker,
    "snapshot_sequence_invariant_failed",
    "snapshot sequence regression: last accepted 3, offered 1",
  );
  expect(await isPending(pending)).toBe(true);

  // B5 and B6: the regression was not accepted, so the client's own counter
  // continues from 3. The session has ended; this client is still connected.
  const after = await client.getSnapshot();
  expect([after.snapshotSeq, after.connected, after.phase]).toEqual([4, true, "closed"]);

  await client.close();
  const settled = await pending;
  expect([settled.done, settled.value]).toEqual([true, undefined]);
});

// ─── 8 ───

test("a duplicate output sequence is not silently dropped", async () => {
  const { broker } = await activeBroker();
  const client = createInProcessBrokerClient(broker, FOUNDER_PRINCIPAL);
  const iterator = client.output(WRITER_A)[Symbol.asyncIterator]();

  // B7: a valid raw frame is queued and delivered as the existing helper
  // delivers one, with its bytes copied on ingest.
  const first: OutputFrame = { sessionId: SESSION_ID, executionId: WRITER_A, outputSeq: 1, bytes: new Uint8Array([1]) };
  expect(await inProcess.unsafeTestOnlyIngestRawOutputFrame(client, first)).toBeUndefined();
  const delivered = frameOf(await iterator.next());
  expect(delivered).toEqual(first);
  expect(delivered).not.toBe(first);
  expect(delivered.bytes).not.toBe(first.bytes);

  const pending = iterator.next();
  const duplicate: OutputFrame = { ...first, bytes: new Uint8Array([1]) };
  const error = await rejectionOf(inProcess.unsafeTestOnlyIngestRawOutputFrame(client, duplicate));

  expectSequenceError(error, "duplicate", "output");
  expectInterruption(broker, "output_sequence_invariant_failed", "output sequence duplicate: last accepted 1, offered 1");
  expect(await isPending(pending)).toBe(true);

  // B6: no latch. The same duplicate offered again is refused again, in a
  // fresh error. interrupt is called again, the closed session refuses it, and
  // that refusal is the cause. No second interruption row is written.
  attempt(() => {
    (error as { kind: string }).kind = "gap";
  });
  const again = await rejectionOf(inProcess.unsafeTestOnlyIngestRawOutputFrame(client, duplicate));
  expectSequenceError(again, "duplicate", "output");
  expect(again).not.toBe(error);
  expect((again as Error).cause).toBeInstanceOf(Error);
  expect(eventTypesOf(broker).filter((type) => type === "session_interrupted")).toHaveLength(1);
  expect(await isPending(pending)).toBe(true);

  // B6 and B7: the client is still open. The existing helper stamps outputSeq
  // itself, its frame passes the same check, and the pending next() receives it.
  unsafeTestOnlyIngestOutputFrame(client, WRITER_A, new Uint8Array([2]));
  expect(frameOf(await pending)).toEqual({
    sessionId: SESSION_ID,
    executionId: WRITER_A,
    outputSeq: 2,
    bytes: new Uint8Array([2]),
  });

  await client.close();
});

// ─── 9 ───

test("an output frame carrying a foreign sessionId interrupts the session", async () => {
  const { broker } = await activeBroker();
  const client = createInProcessBrokerClient(broker, FOUNDER_PRINCIPAL);
  const pending = client.output(WRITER_A)[Symbol.asyncIterator]().next();

  // B2: outputSeq 1 is the next expected sequence, so only the sessionId is wrong.
  const foreign: OutputFrame = {
    sessionId: "ses-foreign-999",
    executionId: WRITER_A,
    outputSeq: 1,
    bytes: new Uint8Array([9]),
  };
  const error = await rejectionOf(inProcess.unsafeTestOnlyIngestRawOutputFrame(client, foreign));

  expectSequenceError(error, "session_mismatch", "output");
  expectInterruption(
    broker,
    "output_sequence_invariant_failed",
    "output sequence session_mismatch: last accepted 0, offered 1",
  );
  expect(await isPending(pending)).toBe(true);

  // B5: the foreign frame never became the last accepted outputSeq, so a frame
  // of this session offering 2 is a gap, and it is not delivered either.
  const next: OutputFrame = { ...foreign, sessionId: SESSION_ID, outputSeq: 2 };
  expectSequenceError(await rejectionOf(inProcess.unsafeTestOnlyIngestRawOutputFrame(client, next)), "gap", "output");
  expect(await isPending(pending)).toBe(true);

  await client.close();
  const settled = await pending;
  expect([settled.done, settled.value]).toEqual([true, undefined]);
});
