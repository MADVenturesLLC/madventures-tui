// packages/broker/test/socket.test.ts
// Isolated legacy unit test for the dormant socket module. socket.ts is
// preserved as dormant scaffolding (Task 33, plan §9.10) and is no longer
// reachable from any production or harness import graph — this file is
// its sole remaining importer, asserting path-shape only. It creates no
// socket and no longer imports createInMemoryBrokerForTest.

import { expect, test } from "bun:test";
import { MADV_RUNTIME_DIR, MADV_SOCKET_PATH } from "../src/socket";

test("MADV_RUNTIME_DIR resolves to a non-empty absolute path string", () => {
  expect(MADV_RUNTIME_DIR).toBeString();
  expect(MADV_RUNTIME_DIR.length).toBeGreaterThan(0);
  expect(MADV_RUNTIME_DIR.startsWith("/")).toBe(true);
});

test("MADV_SOCKET_PATH resolves to a path ending in broker.sock", () => {
  expect(MADV_SOCKET_PATH).toBeString();
  expect(MADV_SOCKET_PATH.length).toBeGreaterThan(0);
  expect(MADV_SOCKET_PATH.endsWith("broker.sock")).toBe(true);
});
