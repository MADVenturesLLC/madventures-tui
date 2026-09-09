// packages/proving-ground/test/rng.test.ts
import { describe, expect, test } from "bun:test";
import { intBetween, mulberry32, pick } from "../src/rng";

describe("deterministic RNG", () => {
  test("same seed reproduces the identical sequence", () => {
    const a = mulberry32(20260906);
    const b = mulberry32(20260906);
    const seqA = Array.from({ length: 32 }, () => a());
    const seqB = Array.from({ length: 32 }, () => b());
    expect(seqA).toEqual(seqB);
  });

  test("different seeds diverge", () => {
    const a = mulberry32(1);
    const b = mulberry32(2);
    const seqA = Array.from({ length: 8 }, () => a());
    const seqB = Array.from({ length: 8 }, () => b());
    expect(seqA).not.toEqual(seqB);
  });

  test("pick and intBetween respect their domains", () => {
    const rng = mulberry32(42);
    for (let i = 0; i < 100; i++) {
      expect(pick(rng, ["x", "y", "z"])).toMatch(/^[xyz]$/);
      const n = intBetween(rng, 3, 7);
      expect(n).toBeGreaterThanOrEqual(3);
      expect(n).toBeLessThanOrEqual(7);
    }
  });
});
