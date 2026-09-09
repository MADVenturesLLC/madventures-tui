// packages/proving-ground/test/runners.test.ts
// Pure-runner tests (no TUI, no live repo state where avoidable).

import { describe, expect, test } from "bun:test";
import { runMalformedAuthority } from "../src/runners/malformed-authority";
import { evaluateDriftPin, DRIFT_PINS } from "../src/runners/instruction-drift";
import { validateSpecCard } from "../src/runners/spec-card";
import { buildPacket, makeRunId } from "../src/packet";
import { challengeDeclarations, DEFAULT_SEED } from "../src/challenges";
import { PACKET_LABEL, PACKET_SCHEMA } from "../src/types";

describe("malformed_authority runner", () => {
  test("all authored + seeded cases pass the law oracle at the default seed", () => {
    const result = runMalformedAuthority(DEFAULT_SEED);
    expect(result.id).toBe("pg-cb-lies");
    expect(result.outcome).toBe("pass");
    const authored = result.cases.filter((c) => c.origin === "authored");
    const fuzz = result.cases.filter((c) => c.origin === "fuzz");
    expect(authored.length).toBeGreaterThanOrEqual(14);
    expect(fuzz.length).toBe(64);
    const failed = result.cases.filter((c) => !c.pass);
    expect(failed).toEqual([]);
  });

  test("same seed reproduces identical verdicts (determinism)", () => {
    const a = runMalformedAuthority(777);
    const b = runMalformedAuthority(777);
    expect(a.cases.map((c) => [c.caseId, c.pass, c.actual])).toEqual(
      b.cases.map((c) => [c.caseId, c.pass, c.actual]),
    );
  });

  test("different seed changes the fuzz set but the law still holds", () => {
    const result = runMalformedAuthority(778);
    expect(result.outcome).toBe("pass");
  });
});

describe("instruction-drift pins (pure core)", () => {
  const pin = DRIFT_PINS[0];

  test("symbol absent ⇒ pin not applicable, pass", () => {
    const v = evaluateDriftPin({ pin: pin as NonNullable<typeof pin>, symbolExists: false, instructionText: "is not yet implemented under that name" });
    expect(v.applicable).toBe(false);
    expect(v.pass).toBe(true);
  });

  test("symbol present + stale fragment ⇒ FAIL with the fragment named", () => {
    const v = evaluateDriftPin({ pin: pin as NonNullable<typeof pin>, symbolExists: true, instructionText: "the reducer (`reduceLedgerEvent`) is not yet implemented under that name." });
    expect(v.applicable).toBe(true);
    expect(v.pass).toBe(false);
    expect(v.detail).toContain("is not yet implemented");
  });

  test("symbol present + corrected instructions ⇒ pass", () => {
    const v = evaluateDriftPin({ pin: pin as NonNullable<typeof pin>, symbolExists: true, instructionText: "the plan's named reducer exists as `reduceLedgerEvent` today." });
    expect(v.pass).toBe(true);
  });
});

describe("spec card validation", () => {
  test("a complete card validates; a gutted card fails", () => {
    const good = [
      "# card",
      "## Defect (observed)", "race",
      "## Why this repo must not fix it", "owner elsewhere",
      "## Law-oracle sketch", "oracle",
      "## Owner", "Owner: phase 0 integrate track",
      "FORBIDDEN here: packages/pty-host/**",
    ].join("\n");
    expect(validateSpecCard(good, ["Defect (observed)", "Why this repo must not fix it", "Law-oracle sketch", "Owner"]).every((c) => c.ok)).toBe(true);

    const bad = "# card\nnothing useful";
    const results = validateSpecCard(bad, ["Defect (observed)", "Owner"]);
    expect(results.every((c) => c.ok)).toBe(false);
  });
});

describe("REP-v1-pg packet", () => {
  test("label is exact and summary math is consistent", () => {
    expect(PACKET_LABEL).toBe("PROVING_GROUND — NOT PHASE_0 — NOT OCCUPANCY_PROOF");
    expect(PACKET_SCHEMA).toBe("REP-v1-pg");

    const runId = makeRunId();
    expect(runId).toMatch(/^pg-[0-9]{14}-[0-9a-f]{6}$/);

    const packet = buildPacket({
      runId,
      gitSha: "a".repeat(40),
      seed: 1,
      startedAt: "2026-09-09T00:00:00.000Z",
      finishedAt: "2026-09-09T00:00:01.000Z",
      results: [
        { id: "a", kind: "malformed_authority", title: "a", outcome: "pass", oracle: "o", seed: 1, durationMs: 1, cases: [], artifacts: [], citations: [] },
        { id: "b", kind: "static_instruction_drift", title: "b", outcome: "fail", oracle: "o", seed: 1, durationMs: 1, cases: [], artifacts: [], citations: [] },
        { id: "c", kind: "tui_governance", title: "c", outcome: "unsupported", oracle: "o", seed: 1, durationMs: 1, cases: [], artifacts: [], citations: [], unsupportedReason: "no node" },
        { id: "d", kind: "spec_card", title: "d", outcome: "spec_only", oracle: "o", seed: 1, durationMs: 1, cases: [], artifacts: [], citations: [] },
      ],
      promotedRegressions: [],
      artifactsDir: "/tmp/x",
    });
    expect(packet.summary.total).toBe(4);
    expect(packet.summary.passed).toBe(1);
    expect(packet.summary.failed).toBe(1);
    expect(packet.summary.unsupported).toBe(1);
    expect(packet.summary.spec_only).toBe(1);
    expect(packet.summary.exit_ok).toBe(false);
  });

  test("registry declares the v0 suite with stable ids", () => {
    const ids = challengeDeclarations().map((c) => c.id);
    expect(ids).toEqual(["pg-cb-lies", "pg-tui-governance", "pg-agents-drift", "pg-a1-spec"]);
  });
});
