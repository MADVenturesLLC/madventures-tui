// packages/broker/test/mcp-contract.test.ts
// MCP allowlist test: exactly the 16 approved bridge tools.
// Sanctioned harness exception (Task 33, act item 5(a) path 9 / item 8(f)):
// imports MCP_TOOLS/McpServer directly from ../src/mcp-server rather than
// through the broker's InMemoryBroker, which no longer carries mcpTools.

import { expect, test } from "bun:test";
import { MCP_TOOLS, McpServer } from "../src/mcp-server";

test("MCP exposes only the approved bridge tools", () => {
  expect(MCP_TOOLS.map((t) => t.name).sort()).toEqual([
    "bridge.action.request", "bridge.action.respond", "bridge.artifact.inspect",
    "bridge.artifact.publish", "bridge.inbox.acknowledge", "bridge.inbox.list",
    "bridge.message.send", "bridge.ownership.accept", "bridge.ownership.reject",
    "bridge.ownership.release", "bridge.ownership.request", "bridge.review.record",
    "bridge.session.close", "bridge.session.pause", "bridge.session.status",
    "bridge.verification.record",
  ]);
});
