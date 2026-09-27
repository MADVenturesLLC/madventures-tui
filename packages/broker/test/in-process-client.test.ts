// packages/broker/test/in-process-client.test.ts
// Phase 3A M10 Task 22: the in-process BrokerClient (specification sections
// 9.3-9.4; plan Task 22; Founder Decision DEC-20260926-01 Part D). Exactly
// five named tests, run over a real bun:sqlite Ledger and a real
// RuntimeBroker — no fake ledger, no wrapper, no callback, no seam.

import { expect, test } from "bun:test";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createInProcessBrokerClient, unsafeTestOnlyIngestOutputFrame } from "../src/in-process-client";
import type { StampedBrokerSnapshot } from "../src/in-process-client";
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

  await client.close();
});

// ─── 3 ───

test("outputSeq is per execution and strictly increasing by one", async () => {
  const { broker } = await activeBroker();
  const client = createInProcessBrokerClient(broker, FOUNDER_PRINCIPAL);

  unsafeTestOnlyIngestOutputFrame(client, WRITER_A, new Uint8Array([1]));
  unsafeTestOnlyIngestOutputFrame(client, WRITER_A, new Uint8Array([2]));
  unsafeTestOnlyIngestOutputFrame(client, WRITER_B, new Uint8Array([9]));

  const framesA: OutputFrame[] = [];
  for await (const frame of client.output(WRITER_A)) {
    framesA.push(frame);
  }
  const framesB: OutputFrame[] = [];
  for await (const frame of client.output(WRITER_B)) {
    framesB.push(frame);
  }

  expect(framesA.map((frame) => frame.outputSeq)).toEqual([1, 2]);
  expect(framesB.map((frame) => frame.outputSeq)).toEqual([1]);
  expect(framesA.every((frame) => frame.executionId === WRITER_A)).toBe(true);
  expect(framesB.every((frame) => frame.executionId === WRITER_B)).toBe(true);

  await client.close();
});

// ─── 4 ───

test("close releases only this client and does not terminate the session", async () => {
  const { broker } = await activeBroker();
  const clientA = createInProcessBrokerClient(broker, FOUNDER_PRINCIPAL);
  const clientB = createInProcessBrokerClient(broker, FOUNDER_PRINCIPAL);

  const beforeClose = await clientA.getSnapshot();
  expect(beforeClose.phase).toBe("active");

  await clientA.close();

  // clientA's own iteration stops immediately.
  const iterator = clientA.snapshots()[Symbol.asyncIterator]();
  const result = await iterator.next();
  expect(result.done).toBe(true);

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
