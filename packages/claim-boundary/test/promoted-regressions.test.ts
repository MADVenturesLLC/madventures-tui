// packages/claim-boundary/test/promoted-regressions.test.ts
// DURABLE REGRESSIONS promoted from the Adversarial Proving Ground.
// Fixtures live in testdata/proving-ground/regressions/claim-boundary/*.json
// and were promoted by `proving-ground promote`. Each one replays through the
// real library and must match its recorded law verdict forever. A change that
// breaks any fixture is a lie the law already rejected once — fix the library,
// never the fixture (fixture edits require a Founder-visible reason).

import { describe, expect, test } from "bun:test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  ClaimBoundaryError,
  parseClaimBoundary,
  validateClaimBoundary,
  type ClaimBoundaryIssueCode,
  type EvidenceClaim,
  type EvidenceRung,
} from "../src/index";

interface PromotedFixture {
  id: string;
  boundary: unknown;
  expect:
    | { verdict: "reject"; anyCodes: ClaimBoundaryIssueCode[] }
    | { verdict: "accept"; rung: EvidenceRung; notEvidenceOf: EvidenceClaim[] };
}

const dir = join(import.meta.dir, "../../../testdata/proving-ground/regressions/claim-boundary");

describe("promoted proving-ground regressions (claim-boundary lies)", () => {
  test("regression fixture directory exists", () => {
    expect(existsSync(dir)).toBe(true);
  });

  const files = existsSync(dir)
    ? readdirSync(dir).filter((f) => f.endsWith(".json")).sort()
    : [];

  test("at least two promoted fixtures are checked in", () => {
    expect(files.length).toBeGreaterThanOrEqual(2);
  });

  for (const file of files) {
    const fixture = JSON.parse(readFileSync(join(dir, file), "utf8")) as PromotedFixture;
    test(`${fixture.id} replays to its recorded law verdict`, () => {
      const issues = validateClaimBoundary(fixture.boundary);
      if (fixture.expect.verdict === "reject") {
        expect(issues.length).toBeGreaterThan(0);
        const codes = issues.map((i) => i.code);
        for (const code of fixture.expect.anyCodes) {
          expect(codes).toContain(code);
        }
        expect(() => parseClaimBoundary(fixture.boundary)).toThrow(ClaimBoundaryError);
      } else {
        expect(issues).toEqual([]);
        const canonical = parseClaimBoundary(fixture.boundary);
        expect(canonical.rung).toBe(fixture.expect.rung);
        expect(canonical.not_evidence_of.join(",")).toBe(fixture.expect.notEvidenceOf.join(","));
      }
    });
  }
});
