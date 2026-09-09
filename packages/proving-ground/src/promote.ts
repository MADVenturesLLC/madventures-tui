// packages/proving-ground/src/promote.ts
// Promotion: a proven challenge case becomes a DURABLE regression.
//
// Claim-boundary lies are promoted as fixture JSON under
// testdata/proving-ground/regressions/claim-boundary/ plus a loader test in
// packages/claim-boundary/test/promoted-regressions.test.ts that replays every
// fixture through the real library. Promotion is idempotent; writing a fixture
// requires an explicit reason when the case is not currently failing (durable
// law regressions are valuable even while the law holds).

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { assertSafeName, regressionsDir, repoRoot } from "./paths";
import type { LawCase } from "./law";

export interface PromotedFixture {
  id: string;
  source: "proving-ground";
  challenge: string;
  label: string;
  boundary: unknown;
  expect:
    | { verdict: "reject"; anyCodes: string[] }
    | { verdict: "accept"; rung: string; notEvidenceOf: string[] };
  promotedAt: string;
  reason: string;
}

export const CLAIM_BOUNDARY_REGRESSION_DIR = "claim-boundary";

const LOADER_TEST_REL = "packages/claim-boundary/test/promoted-regressions.test.ts";

const LOADER_TEST_TEMPLATE = `// packages/claim-boundary/test/promoted-regressions.test.ts
// DURABLE REGRESSIONS promoted from the Adversarial Proving Ground.
// Fixtures live in testdata/proving-ground/regressions/claim-boundary/*.json
// and were promoted by \`proving-ground promote\`. Each one replays through the
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
} from "../src/index";

interface PromotedFixture {
  id: string;
  boundary: unknown;
  expect:
    | { verdict: "reject"; anyCodes: string[] }
    | { verdict: "accept"; rung: string; notEvidenceOf: string[] };
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
    test(\`\${fixture.id} replays to its recorded law verdict\`, () => {
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
`;

/** Containment guard, inline at write sinks. */
function requireInside(base: string, candidate: string): string {
  const resolved = path.resolve(base, candidate);
  if (resolved !== base && !resolved.startsWith(base + path.sep)) {
    throw new Error(`path escapes base: ${candidate}`);
  }
  return resolved;
}

export function writeClaimBoundaryFixture(input: {
  root: string;
  challengeId: string;
  lawCase: LawCase;
  reason: string;
}): { fixturePath: string; loaderTestPath: string } {
  const dir = regressionsDir(input.root, CLAIM_BOUNDARY_REGRESSION_DIR);
  mkdirSync(dir, { recursive: true });
  const fileName = assertSafeName(`${input.lawCase.caseId}.json`);
  const fixture: PromotedFixture = {
    id: input.lawCase.caseId,
    source: "proving-ground",
    challenge: input.challengeId,
    label: input.lawCase.label,
    boundary: input.lawCase.vector,
    expect:
      input.lawCase.expect.verdict === "reject"
        ? { verdict: "reject", anyCodes: [...input.lawCase.expect.anyCodes] }
        : {
            verdict: "accept",
            rung: input.lawCase.expect.rung,
            notEvidenceOf: [...input.lawCase.expect.notEvidenceOf],
          },
    promotedAt: new Date().toISOString(),
    reason: input.reason,
  };
  const fixturePath = requireInside(dir, fileName);
  writeFileSync(fixturePath, JSON.stringify(fixture, null, 2) + "\n", "utf8");

  const loaderTestPath = requireInside(input.root, LOADER_TEST_REL);
  if (!existsSync(loaderTestPath)) {
    mkdirSync(path.dirname(loaderTestPath), { recursive: true });
    writeFileSync(loaderTestPath, LOADER_TEST_TEMPLATE, "utf8");
  }
  return { fixturePath, loaderTestPath };
}

export function listPromoted(root: string): string[] {
  const dir = regressionsDir(root, CLAIM_BOUNDARY_REGRESSION_DIR);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => `${CLAIM_BOUNDARY_REGRESSION_DIR}/${f}`);
}

export function readFixtureIds(root: string): string[] {
  const dir = regressionsDir(root, CLAIM_BOUNDARY_REGRESSION_DIR);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => {
      const raw = JSON.parse(readFileSync(path.join(dir, f), "utf8")) as { id?: string };
      return raw.id ?? f;
    });
}

export { repoRoot };
