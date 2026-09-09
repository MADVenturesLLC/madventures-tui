// packages/proving-ground/test/shrink.test.ts
import { describe, expect, test } from "bun:test";
import { shrinkClaimVector } from "../src/shrink";
import { makeClaimBoundary } from "@mad/claim-boundary";

describe("claim-boundary vector shrinker", () => {
  test("a non-failing vector is returned untouched", () => {
    const canonical = makeClaimBoundary("ci");
    const result = shrinkClaimVector(canonical);
    expect(result.preservedCode).toBe("(not failing)");
    expect(result.steps).toEqual([]);
  });

  test("overbroad vector shrinks to the minimal contradiction", () => {
    // executed + every claim disclaimed (one overbroad among them) — the
    // shrinker must strip everything that does not preserve OVERBROAD.
    const bloated = {
      rung: "executed",
      gloss: "irrelevant prose",
      not_evidence_of: [
        "attestation", "verification", "review", "ci", "merge", "execution",
      ],
    };
    const result = shrinkClaimVector(bloated);
    expect(result.preservedCode).toBe("OVERBROAD_NOT_EVIDENCE_OF");
    const minimal = result.minimal as { gloss?: string; not_evidence_of: string[] };
    expect(minimal.gloss).toBeUndefined();
    expect(minimal.not_evidence_of).toEqual(["execution"]);
  });

  test("incomplete vector keeps the omission it was caught for", () => {
    const bloated = {
      rung: "executed",
      gloss: "prose",
      not_evidence_of: ["attestation"], // missing verification, review, ci, merge
    };
    const result = shrinkClaimVector(bloated);
    expect(result.preservedCode).toBe("INCOMPLETE_NOT_EVIDENCE_OF");
    const minimal = result.minimal as { not_evidence_of: string[] };
    expect(minimal.not_evidence_of.length).toBe(1);
  });

  test("shrink never turns a failing vector into a passing one", () => {
    const vector = { rung: "prepared", not_evidence_of: ["merge"], gloss: "x" };
    const result = shrinkClaimVector(vector);
    const { judge } = require("../src/law") as typeof import("../src/law");
    const verdict = judge(result.minimal);
    if (verdict.verdict !== "reject") {
      throw new Error(`shrink turned a failing vector into an accepted one: ${JSON.stringify(result.minimal)}`);
    }
    expect(verdict.codes).toContain(result.preservedCode);
  });
});
