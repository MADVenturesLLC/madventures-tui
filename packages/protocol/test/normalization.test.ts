// packages/protocol/test/normalization.test.ts
// Pins independence-domain and identifier normalization.

import { expect, test } from "bun:test";
import {
  NormalizationError,
  normalizeIdentifier,
  normalizeIndependenceDomain,
} from "../src/normalization";

test("independence domain collapses non-alphanumeric runs to a single hyphen", () => {
  expect(normalizeIndependenceDomain("Anthropic  __ Research")).toBe(
    "anthropic-research",
  );
});

test("identifier normalization does not collapse separators", () => {
  expect(normalizeIdentifier("Anthropic.Inc_1")).toBe("anthropic.inc_1");
});

test("identifier normalization rejects a leading hyphen", () => {
  expect(() => normalizeIdentifier("-anthropic")).toThrow(NormalizationError);
});
