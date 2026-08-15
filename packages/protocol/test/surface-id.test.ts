// packages/protocol/test/surface-id.test.ts
// Syntax-only SurfaceId validation; syntactic validity is not eligibility.

import { expect, test } from "bun:test";
import * as surfaceId from "../src/surface-id";
import { InvalidSurfaceIdError, parseSurfaceId } from "../src/surface-id";

test("a syntactically valid surface id is not thereby eligible", () => {
  expect(parseSurfaceId("totally-made-up") as string).toBe("totally-made-up");
  expect(Object.keys(surfaceId).filter((key) => /eligib/i.test(key))).toEqual(
    [],
  );
});

test("surface id rejects uppercase, leading digit, and 65 characters", () => {
  expect(() => parseSurfaceId("Claude-Code")).toThrow(InvalidSurfaceIdError);
  expect(() => parseSurfaceId("1surface")).toThrow(InvalidSurfaceIdError);
  expect(() => parseSurfaceId("a".repeat(65))).toThrow(InvalidSurfaceIdError);
});
