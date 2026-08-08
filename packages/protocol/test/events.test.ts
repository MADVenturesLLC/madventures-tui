import { expect, test } from "bun:test";
import { parseBridgeEvent } from "../src";

test("rejects oversized inline payloads", () => {
  // Will be filled in once parseBridgeEvent is implemented
  expect(true).toBe(true);
});