// packages/broker/test/in-process-client.test.ts
// Phase 3A M10 Task 22: the in-process BrokerClient (specification sections
// 9.3-9.4; plan Task 22; Founder Decision DEC-20260926-01 Part D). Exactly
// five named tests, run over a real bun:sqlite Ledger and a real
// RuntimeBroker — no fake ledger, no wrapper, no callback, no seam.

import { expect, test } from "bun:test";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as barrel from "../src/index";
import type { InProcessBrokerClient as BarrelInProcessBrokerClient, StampedBrokerSnapshot as BarrelStampedBrokerSnapshot } from "../src/index";
import { createInProcessBrokerClient, unsafeTestOnlyIngestOutputFrame } from "../src/in-process-client";
import type { InProcessBrokerClient, StampedBrokerSnapshot } from "../src/in-process-client";
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
  expect((await returnedOutput.return?.())?.done).toBe(true);
  expect((await returnedNext).done).toBe(true);

  await clientA.close();

  // clientA's own iteration stops immediately.
  const iterator = clientA.snapshots()[Symbol.asyncIterator]();
  const result = await iterator.next();
  expect(result.done).toBe(true);
  expect((await pendingNext).done).toBe(true);
  expect((await openSnapshots.next()).done).toBe(true);
  expect((await clientA.output(WRITER_A)[Symbol.asyncIterator]().next()).done).toBe(true);

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
  expect((await otherClientNext).done).toBe(true);
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

  await client.close();
});
