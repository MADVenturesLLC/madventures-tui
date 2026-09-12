// packages/single-verdict/test/single-verdict.test.ts
// Pins the three gates (memory, claim rung, schema), the closed vocabularies,
// and byte-stable serialization against the committed goldens.

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, test } from "bun:test";

import {
  ALLOWED_REASONS,
  assertDisplayable,
  makeVerdict,
  parseVerdict,
  serializeVerdict,
  VERDICTS,
  VERDICT_CLAIM,
  VERDICT_TONE,
  VerdictDisplayError,
  VerdictError,
  VerdictRefusal,
  validateVerdict,
  type EvidenceLink,
  type VerdictRecord,
} from "../src/index";
import { makeClaimBoundary } from "@mad/claim-boundary";

const SHA = "a".repeat(40);
const REF = { path: "docs/verification/example.md", sha256: "c".repeat(64), kind: "log" } as const;

function link(rung?: Parameters<typeof makeClaimBoundary>[0]): EvidenceLink {
  return rung === undefined ? { ref: { ...REF } } : { ref: { ...REF }, boundary: makeClaimBoundary(rung) };
}

function base(overrides: Partial<Parameters<typeof makeVerdict>[0]> = {}): Parameters<typeof makeVerdict>[0] {
  return {
    verdict: "HOLD",
    subject: { name: "@madventures/ledger", sha: SHA },
    reason_code: "FOUNDER_HOLD",
    produced_by: "builder:test",
    produced_at: "2026-09-12T00:00:00.000Z",
    evidence_refs: [link()],
    ...overrides,
  };
}

// ─── Factory happy paths ─────────────────────────────────────────────────────

describe("makeVerdict", () => {
  test("SHIP with merged-rung evidence and VALID memory", () => {
    const v = makeVerdict(base({
      verdict: "SHIP",
      reason_code: "EVIDENCE_FRESH",
      evidence_refs: [link("merged")],
      memory: { subject: "@madventures/ledger", status: "VALID" },
    }));
    expect(v.verdict).toBe("SHIP");
    expect(validateVerdict(v)).toEqual([]);
  });

  test("VERIFY_PASS with verified-rung evidence and VALID memory", () => {
    const v = makeVerdict(base({
      verdict: "VERIFY_PASS",
      reason_code: "EVIDENCE_FRESH",
      evidence_refs: [link("verified")],
      memory: { subject: "@madventures/ledger", status: "VALID" },
    }));
    expect(VERDICT_CLAIM[v.verdict]).toBe("verification");
  });

  test("negative verdicts need no memory evidence", () => {
    for (const verdict of ["HOLD", "VERIFY_FAIL", "BLOCKED", "STALE_EVIDENCE", "SPEC_ONLY"] as const) {
      expect(() => makeVerdict(base({ verdict, reason_code: ALLOWED_REASONS[verdict][0]! }))).not.toThrow();
    }
  });
});

// ─── Gate 1: memory (no SHIP/VERIFY_PASS* on stale evidence) ─────────────────

describe("memory gate", () => {
  test("positive verdict without memory evidence is refused", () => {
    expect(() => makeVerdict(base({ verdict: "SHIP", reason_code: "EVIDENCE_FRESH" }))).toThrow(VerdictRefusal);
  });

  test("STALE memory refuses SHIP — re-bind required", () => {
    expect(() =>
      makeVerdict(base({
        verdict: "SHIP",
        reason_code: "EVIDENCE_FRESH",
        memory: { subject: "@madventures/ledger", status: "STALE" },
      })),
    ).toThrow(/re-bind a fresh record first/);
  });

  test("UNKNOWN memory refuses VERIFY_PASS_WITH_FINDINGS", () => {
    expect(() =>
      makeVerdict(base({
        verdict: "VERIFY_PASS_WITH_FINDINGS",
        reason_code: "EVIDENCE_FRESH",
        findings: [{ code: "MINOR_GAP", message: "one golden pending" }],
        memory: { subject: "@madventures/ledger", status: "UNKNOWN" },
      })),
    ).toThrow(VerdictRefusal);
  });

  test("memory subject must match the verdict subject", () => {
    expect(() =>
      makeVerdict(base({
        verdict: "SHIP",
        reason_code: "EVIDENCE_FRESH",
        memory: { subject: "other/package", status: "VALID" },
      })),
    ).toThrow(/subjects must match/);
  });
});

// ─── Gate 2: claim rung (a forbidding rung blocks the claim) ─────────────────

describe("claim gate", () => {
  test("SHIP refused when evidence rung is ci (merge forbidden)", () => {
    expect(() =>
      makeVerdict(base({
        verdict: "SHIP",
        reason_code: "EVIDENCE_FRESH",
        evidence_refs: [link("ci")],
        memory: { subject: "@madventures/ledger", status: "VALID" },
      })),
    ).toThrow(/CLAIM_FORBIDDEN_BY_RUNG/);
  });

  test("VERIFY_PASS refused at executed rung (verification forbidden)", () => {
    expect(() =>
      makeVerdict(base({
        verdict: "VERIFY_PASS",
        reason_code: "EVIDENCE_FRESH",
        evidence_refs: [link("executed")],
        memory: { subject: "@madventures/ledger", status: "VALID" },
      })),
    ).toThrow(/CLAIM_FORBIDDEN_BY_RUNG/);
  });

  test("merged-rung evidence proves merge — SHIP passes the gate", () => {
    expect(() =>
      makeVerdict(base({
        verdict: "SHIP",
        reason_code: "EVIDENCE_FRESH",
        evidence_refs: [link("merged")],
        memory: { subject: "@madventures/ledger", status: "VALID" },
      })),
    ).not.toThrow();
  });
});

// ─── Gate 3: schema (fail-closed, closed enums) ──────────────────────────────

describe("schema gate", () => {
  test("unknown verdict is structurally invalid", () => {
    const bad = JSON.parse(serializeVerdict(makeVerdict(base()))) as Record<string, unknown>;
    bad["verdict"] = "SHIP_MAYBE";
    expect(validateVerdict(bad).map((i) => i.code)).toContain("UNKNOWN_VERDICT");
  });

  test("unknown field is structurally invalid", () => {
    const bad = JSON.parse(serializeVerdict(makeVerdict(base()))) as Record<string, unknown>;
    bad["confidence"] = 0.99;
    expect(validateVerdict(bad).map((i) => i.code)).toContain("UNKNOWN_FIELD");
  });

  test("reason code not allowed for the verdict is invalid", () => {
    const bad = JSON.parse(serializeVerdict(makeVerdict(base()))) as Record<string, unknown>;
    bad["reason_code"] = "EVIDENCE_FRESH"; // HOLD may not claim fresh evidence
    expect(validateVerdict(bad).map((i) => i.code)).toContain("REASON_NOT_ALLOWED_FOR_VERDICT");
  });

  test("bad subject SHA is invalid", () => {
    const bad = JSON.parse(serializeVerdict(makeVerdict(base()))) as Record<string, unknown>;
    (bad["subject"] as Record<string, unknown>)["sha"] = "main";
    expect(validateVerdict(bad).map((i) => i.code)).toContain("BAD_SUBJECT_SHA");
  });

  test("incomplete claim boundary on an evidence link is invalid", () => {
    const bad = JSON.parse(serializeVerdict(makeVerdict(base()))) as Record<string, unknown>;
    const refs = bad["evidence_refs"] as Record<string, unknown>[];
    refs[0]!["boundary"] = { rung: "merged", not_evidence_of: ["merge"] };
    expect(validateVerdict(bad).map((i) => i.code)).toContain("BAD_BOUNDARY");
  });

  test("totality: every verdict has tone, claim, and allowed reasons", () => {
    for (const v of VERDICTS) {
      expect(VERDICT_TONE[v]).toBeTruthy();
      expect(VERDICT_CLAIM[v] !== undefined).toBe(true);
      expect(ALLOWED_REASONS[v].length).toBeGreaterThan(0);
    }
  });
});

// ─── Serialization: byte-stable, golden-pinned ───────────────────────────────

describe("serializer + goldens", () => {
  const goldens: Array<[string, VerdictRecord]> = [
    ["ship.golden.json", makeVerdict(base({
      verdict: "SHIP",
      reason_code: "EVIDENCE_FRESH",
      evidence_refs: [link("merged")],
      memory: { subject: "@madventures/ledger", status: "VALID" },
    }))],
    ["verify-pass-with-findings.golden.json", makeVerdict(base({
      verdict: "VERIFY_PASS_WITH_FINDINGS",
      reason_code: "EVIDENCE_FRESH",
      evidence_refs: [link("verified")],
      findings: [{ code: "MINOR_GAP", message: "one golden pending" }],
      memory: { subject: "@madventures/ledger", status: "VALID" },
    }))],
    ["stale-evidence.golden.json", makeVerdict(base({ verdict: "STALE_EVIDENCE", reason_code: "EVIDENCE_STALE" }))],
    ["spec-only.golden.json", makeVerdict(base({ verdict: "SPEC_ONLY", reason_code: "SPEC_ONLY_NO_IMPLEMENTATION" }))],
  ];

  for (const [name, record] of goldens) {
    test(`${name} round-trips byte-stable`, () => {
      const golden = readFileSync(join(import.meta.dir, "goldens", name), "utf8").replace(/\n$/, "");
      expect(serializeVerdict(record)).toBe(golden);
      const parsed = parseVerdict(JSON.parse(golden) as unknown);
      expect(serializeVerdict(parsed)).toBe(golden);
    });
  }
});

// ─── assertDisplayable: the only door a UI gets through ──────────────────────

describe("assertDisplayable", () => {
  test("returns a canonical record for valid input", () => {
    const v = base({ verdict: "HOLD" });
    const shown = assertDisplayable(makeVerdict(v));
    expect(shown.verdict).toBe("HOLD");
  });

  test("throws VerdictDisplayError — the UI must not invent", () => {
    expect(() => assertDisplayable({ verdict: "SHIP" })).toThrow(VerdictDisplayError);
    expect(() => assertDisplayable(null)).toThrow(VerdictDisplayError);
    expect(() => assertDisplayable("SHIP")).toThrow(VerdictDisplayError);
  });
});
