import { expect, test } from "bun:test";
import { parseBridgeEvent, parseTaskEnvelope } from "../src";

test("rejects unsupported protocol versions", () => {
  expect(() => parseTaskEnvelope({ protocol_version: "madbridge-protocol/v2" })).toThrow("unsupported protocol_version");
});

test("rejects unknown event types", () => {
  expect(() => parseBridgeEvent({ protocol_version: "madbridge-protocol/v1", event_type: "shell_exec" })).toThrow("unknown event_type");
});