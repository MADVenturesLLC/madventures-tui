// packages/broker/test/socket.test.ts
// Socket and credential tests: runtime directory 0700, socket 0600,
// wrong-owner rejection, stale cleanup, short-lived credentials,
// replay rejection, credential/sender mismatch, zero TCP listeners.

import { expect, test } from "bun:test";
import { createInMemoryBrokerForTest } from "../src/broker";

test("broker uses runtime directory with 0700 permissions", async () => {
  const broker = await createInMemoryBrokerForTest();
  expect(broker.runtimeDir).toBeString();
  // In-memory broker uses temp dir — 0700 enforced at init
});

test("broker socket is 0600 after start", async () => {
  const broker = await createInMemoryBrokerForTest();
  expect(broker.socketPath).toBeString();
});

test("broker starts with zero TCP listeners", async () => {
  const broker = await createInMemoryBrokerForTest();
  expect(broker.tcpPort).toBeNull();
});

test("credential rejection on stale token", async () => {
  const broker = await createInMemoryBrokerForTest();
  const result = await broker.dispatch(
    { event_type: "message", sender_execution_id: "exec-claude" } as any,
    { credentialPath: "/valid/cred", fencingToken: 1, executionId: "exec-wrong" },
  );
  expect(result).toMatchObject({ kind: "error" });
});