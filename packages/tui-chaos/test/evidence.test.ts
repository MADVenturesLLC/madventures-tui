// packages/tui-chaos/test/evidence.test.ts
// REP-v1-tui evidence packet contract tests.

import { describe, expect, test } from "bun:test";
import { buildEvidencePacket, makeRunId, REP_LABEL, REP_SCHEMA } from "../src/evidence";
import { invariant, type ScenarioResult } from "../src/scenario/types";

function scenario(name: string, pass: boolean): ScenarioResult {
  return {
    name,
    pass,
    durationMs: 10,
    invariants: [
      invariant("inv-ok", "sample invariant", pass, "detail"),
    ],
    artifacts: [],
    finalGrid: "row",
    finalHash: "f".repeat(64),
  };
}

describe("REP-v1-tui evidence packet", () => {
  const packet = buildEvidencePacket({
    runId: makeRunId(),
    gitSha: "a".repeat(40),
    startedAt: "2026-09-05T00:00:00.000Z",
    finishedAt: "2026-09-05T00:01:00.000Z",
    entrypoint: "apps/madbridge/src/tui/main.tsx --fixture",
    fixtureFlags: ["MADV_TUI_FIXTURE=1"],
    cols: 120,
    rows: 40,
    scenarioResults: [scenario("s1", true), scenario("s2", false)],
    reportPath: "/tmp/report.json",
    asciinemaPath: null,
  });

  test("carries the schema and the mandatory label", () => {
    expect(packet.schema).toBe(REP_SCHEMA);
    expect(REP_SCHEMA).toBe("REP-v1-tui");
    expect(packet.label).toBe("TUI_ACCEPTANCE — NOT PHASE_0 — NOT OCCUPANCY_PROOF");
    expect(REP_LABEL).toContain("NOT PHASE_0");
    expect(REP_LABEL).toContain("NOT OCCUPANCY_PROOF");
  });

  test("run_id matches the harness id shape", () => {
    expect(packet.run_id).toMatch(/^tui-chaos-[0-9]{14}-[0-9a-f]{6}$/);
  });

  test("summary counts and exit_ok reflect scenario results", () => {
    expect(packet.summary.total).toBe(2);
    expect(packet.summary.passed).toBe(1);
    expect(packet.summary.failed).toBe(1);
    expect(packet.summary.exit_ok).toBe(false);
  });

  test("scenario blocks keep full invariants and 64-hex grid hashes", () => {
    for (const s of packet.scenarios) {
      expect(s.final_grid_sha256).toMatch(/^[0-9a-f]{64}$/);
      expect(s.invariants.length).toBeGreaterThan(0);
    }
  });
});
