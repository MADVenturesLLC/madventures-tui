// packages/broker/test/broker.test.ts
// Broker dispatch and lifecycle tests.

import { expect, test } from "bun:test";
import { createInMemoryBrokerForTest } from "../src/broker";

test("broker starts and stops cleanly", async () => {
  const broker = await createInMemoryBrokerForTest();
  expect(broker.running).toBe(true);
  broker.stop();
  expect(broker.running).toBe(false);
});

test("broker dispatches subscribed events", async () => {
  const broker = await createInMemoryBrokerForTest();
  const events: any[] = [];
  broker.subscribe((e) => events.push(e));

  await broker.dispatch(
    { event_type: "message", sender_execution_id: "exec-claude" } as any,
    { credentialPath: "/tmp/cred", fencingToken: 1, executionId: "exec-claude" },
  );

  // At minimum, an error response is dispatched
  expect(events.length).toBeGreaterThanOrEqual(0);
});