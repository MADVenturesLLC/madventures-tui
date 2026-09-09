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

// ─── F1/F2: fixture flags and artifact references must be truthful ───

describe("evidence packet fixture flags and artifact references (F1/F2)", () => {
  function build(fixtureFlags: string[], asciinemaPath: string | null) {
    return buildEvidencePacket({
      runId: makeRunId(),
      gitSha: "a".repeat(40),
      startedAt: "2026-09-09T00:00:00.000Z",
      finishedAt: "2026-09-09T00:01:00.000Z",
      entrypoint: "apps/madbridge/src/tui/main.tsx --fixture",
      fixtureFlags,
      cols: 120,
      rows: 40,
      scenarioResults: [scenario("s1", true)],
      reportPath: "/tmp/report.json",
      asciinemaPath,
    });
  }

  test("F1: fixture flags are carried through verbatim, never re-derived", () => {
    // The evidence layer must record exactly the flags the run used — for
    // an ansi_flood-including run that is both gates, not a hard-coded one.
    const stream = build(["MADV_TUI_FIXTURE=1", "MADV_TUI_FIXTURE_STREAM=1"], null);
    expect(stream.subject.fixture_flags).toEqual([
      "MADV_TUI_FIXTURE=1",
      "MADV_TUI_FIXTURE_STREAM=1",
    ]);
    const ordinary = build(["MADV_TUI_FIXTURE=1"], null);
    expect(ordinary.subject.fixture_flags).toEqual(["MADV_TUI_FIXTURE=1"]);
  });

  test("F2: a null asciinema reference stays explicitly null", () => {
    const packet = build(["MADV_TUI_FIXTURE=1"], null);
    expect(packet.artifacts.asciinema).toBeNull();
  });

  test("F2: a single canonical cast is referenced exactly as given", () => {
    const packet = build(["MADV_TUI_FIXTURE=1"], "/tmp/runs/x/governance_focus.cast");
    expect(packet.artifacts.asciinema).toBe("/tmp/runs/x/governance_focus.cast");
  });

  test("F2: scenario blocks may carry their own cast artifacts", () => {
    const withCast = scenario("governance_focus", true);
    withCast.artifacts.push("/tmp/runs/x/governance_focus.cast");
    const packet = buildEvidencePacket({
      runId: makeRunId(),
      gitSha: "a".repeat(40),
      startedAt: "2026-09-09T00:00:00.000Z",
      finishedAt: "2026-09-09T00:01:00.000Z",
      entrypoint: "apps/madbridge/src/tui/main.tsx --fixture",
      fixtureFlags: ["MADV_TUI_FIXTURE=1"],
      cols: 120,
      rows: 40,
      scenarioResults: [withCast],
      reportPath: "/tmp/report.json",
      // Multi-cast run: no single canonical cast to name at subject level.
      asciinemaPath: null,
    });
    expect(packet.artifacts.asciinema).toBeNull();
    expect(packet.scenarios[0]!.artifacts).toContain("/tmp/runs/x/governance_focus.cast");
  });
});
