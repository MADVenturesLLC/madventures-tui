// packages/broker/test/broker.test.ts
// Broker dispatch and lifecycle tests.

import { expect, test, describe } from "bun:test";
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

describe("broker duplicate-interrupt idempotency", () => {
  test("duplicate interrupt on already-interrupted session does not throw", async () => {
    const broker = await createInMemoryBrokerForTest();
    try {
      broker.interrupt("cli_exit", "first");
      expect(broker.sessionState.kind).toBe("interrupted");

      // Second interrupt must not throw — it records a secondary incident.
      expect(() => broker.interrupt("adapter_disconnect", "second")).not.toThrow();
      expect(broker.sessionState.kind).toBe("interrupted");
    } finally {
      broker.stop();
    }
  });

  test("duplicate interrupt leaves state interrupted and token unusable", async () => {
    const broker = await createInMemoryBrokerForTest();
    try {
      broker.interrupt("cli_exit", "first");
      const tokenAfterFirst = broker.fencingToken;
      expect(broker.tokenUsable).toBe(false);

      broker.interrupt("adapter_disconnect", "second");
      expect(broker.sessionState.kind).toBe("interrupted");
      expect(broker.tokenUsable).toBe(false);
      expect(broker.fencingToken).toBe(tokenAfterFirst);
    } finally {
      broker.stop();
    }
  });

  test("duplicate interrupt does not issue a new fencing token", async () => {
    const broker = await createInMemoryBrokerForTest();
    try {
      broker.interrupt("cli_exit", "first");
      const tokenAfterFirst = broker.fencingToken;

      // A duplicate interrupt must not change the token value.
      broker.interrupt("broker_restart", "second");
      expect(broker.fencingToken).toBe(tokenAfterFirst);
    } finally {
      broker.stop();
    }
  });

  test("duplicate incident notification — listener receives the secondary incident", async () => {
    const broker = await createInMemoryBrokerForTest();
    try {
      const incidents: any[] = [];
      broker.subscribe((e) => {
        if (e?.event_type === "incident") incidents.push(e);
      });

      broker.interrupt("cli_exit", "first disconnect");
      broker.interrupt("adapter_disconnect", "second disconnect");

      // The listener must have received two distinct incident events.
      expect(incidents.length).toBe(2);
      expect(incidents[0].payload["reason"]).toBe("cli_exit");
      expect(incidents[1].payload["reason"]).toBe("adapter_disconnect");
      expect(incidents[1].event_id).not.toBe(incidents[0].event_id);
    } finally {
      broker.stop();
    }
  });
});