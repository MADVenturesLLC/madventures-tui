// packages/broker/test/mcp-contract.test.ts
// MCP allowlist test: exactly the 16 approved bridge tools.

import { expect, test } from "bun:test";
import { createInMemoryBrokerForTest } from "../src/broker";

test("MCP exposes only the approved bridge tools", async () => {
  const broker = await createInMemoryBrokerForTest();
  expect(broker.mcpTools.map(t => t.name).sort()).toEqual([
    "bridge.action.request", "bridge.action.respond", "bridge.artifact.inspect",
    "bridge.artifact.publish", "bridge.inbox.acknowledge", "bridge.inbox.list",
    "bridge.message.send", "bridge.ownership.accept", "bridge.ownership.reject",
    "bridge.ownership.release", "bridge.ownership.request", "bridge.review.record",
    "bridge.session.close", "bridge.session.pause", "bridge.session.status",
    "bridge.verification.record",
  ]);
});