// packages/proving-ground/src/runners/spec-card.ts
// Challenge kind for defects this repo must NOT fix here (owner lives on
// another track/repo — e.g. audit A1 in the Build Room C2 worker supervisor).
// The deliverable is a durable spec card: defect, law-oracle sketch, owner,
// forbidden paths. The runner validates the card against its schema so the
// handoff cannot silently rot; outcome is "spec_only", never "pass" — a
// documented deferral is not a green test.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { repoRoot } from "../paths";
import type { CaseRecord, ChallengeResult } from "../types";

export interface SpecCardCheck {
  ok: boolean;
  requirement: string;
  detail: string;
}

/** Minimal structural validation — no schema library dependency. */
export function validateSpecCard(cardText: string, requiredSections: readonly string[]): SpecCardCheck[] {
  const checks: SpecCardCheck[] = [];
  for (const section of requiredSections) {
    const header = `## ${section}`;
    const present = cardText.includes(header);
    checks.push({
      ok: present,
      requirement: `card has section '${section}'`,
      detail: present ? `found '${header}'` : `missing '${header}'`,
    });
  }
  // The card must name its owner track and its forbidden paths explicitly.
  const hasOwner = /Owner:\s*\S/i.test(cardText);
  checks.push({ ok: hasOwner, requirement: "card names an Owner", detail: hasOwner ? "Owner line present" : "no 'Owner:' line" });
  const hasForbidden = /FORBIDDEN here/i.test(cardText);
  checks.push({
    ok: hasForbidden,
    requirement: "card lists FORBIDDEN-here paths (blast-radius honesty)",
    detail: hasForbidden ? "FORBIDDEN here section present" : "missing 'FORBIDDEN here'",
  });
  return checks;
}

export function runSpecCard(
  seed: number,
  cardPath: string,
  requiredSections: readonly string[],
): Omit<ChallengeResult, "durationMs"> {
  const root = repoRoot();
  const id = "pg-a1-spec";
  const base = {
    id,
    kind: "spec_card" as const,
    title: "A1 reserve-before-spawn race — durable spec card (fix owned elsewhere)",
    oracle: "spec card structural validation",
    seed,
    citations: [] as string[],
  };

  if (!existsSync(cardPath)) {
    return {
      ...base,
      outcome: "unsupported",
      unsupportedReason: `spec card not found: ${path.relative(root, cardPath)}`,
      cases: [],
      artifacts: [],
    };
  }
  const cardText = readFileSync(cardPath, "utf8");
  const checks = validateSpecCard(cardText, requiredSections);
  const cases: CaseRecord[] = checks.map((c) => ({
    caseId: `card-${c.requirement.replace(/[^a-z0-9]+/gi, "-").toLowerCase().slice(0, 48)}`,
    origin: "check" as const,
    input: { requirement: c.requirement },
    expected: "card satisfies requirement",
    actual: c.detail,
    pass: c.ok,
  }));
  const allOk = checks.every((c) => c.ok);
  return {
    ...base,
    outcome: allOk ? "spec_only" : "fail",
    cases,
    artifacts: [cardPath],
  };
}
