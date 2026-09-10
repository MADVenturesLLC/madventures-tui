// packages/tui-chaos/src/evidence.ts
// REP-v1-tui evidence packet.
//
// Schema (minimal, self-describing):
//   schema: "REP-v1-tui"
//   label:  "TUI_ACCEPTANCE — NOT PHASE_0 — NOT OCCUPANCY_PROOF"
//           (mandatory on every packet; the harness measures the TUI process
//            only and makes no Room Runtime / occupancy / Gateway claims)
//
// The field set is a superset of a Lab REP-v1 core (run_id, git_sha,
// scenarios[], pass/fail, artifacts) so it can be mapped losslessly.

import { randomBytes } from "node:crypto";

import type { ScenarioResult } from "./scenario/types";

export const REP_LABEL = "TUI_ACCEPTANCE — NOT PHASE_0 — NOT OCCUPANCY_PROOF";
export const REP_SCHEMA = "REP-v1-tui";

export interface EvidencePacket {
  schema: "REP-v1-tui";
  label: string;
  run_id: string;
  git_sha: string;
  started_at: string;
  finished_at: string;
  environment: {
    platform: string;
    bun_version: string;
    node_version: string | null;
  };
  subject: {
    entrypoint: string;
    fixture_flags: string[];
    cols: number;
    rows: number;
  };
  scenarios: Array<{
    name: string;
    pass: boolean;
    duration_ms: number;
    invariants: Array<{ id: string; description: string; pass: boolean; detail: string }>;
    artifacts: string[];
    final_grid_sha256: string;
  }>;
  summary: {
    total: number;
    passed: number;
    failed: number;
    exit_ok: boolean;
  };
  artifacts: {
    report: string;
    asciinema: string | null;
  };
}

export function makeRunId(now = new Date()): string {
  const stamp = now.toISOString().replace(/[-:T]/g, "").slice(0, 14);
  const rand = randomBytes(3).toString("hex");
  return `tui-chaos-${stamp}-${rand}`;
}

export function buildEvidencePacket(input: {
  runId: string;
  gitSha: string;
  startedAt: string;
  finishedAt: string;
  entrypoint: string;
  fixtureFlags: string[];
  cols: number;
  rows: number;
  scenarioResults: ScenarioResult[];
  reportPath: string;
  asciinemaPath: string | null;
}): EvidencePacket {
  const scenarioBlocks = input.scenarioResults.map((s) => ({
    name: s.name,
    pass: s.pass,
    duration_ms: s.durationMs,
    invariants: s.invariants.map((i) => ({
      id: i.id,
      description: i.description,
      pass: i.pass,
      detail: i.detail,
    })),
    artifacts: s.artifacts,
    final_grid_sha256: s.finalHash,
  }));
  const passed = scenarioBlocks.filter((s) => s.pass).length;
  return {
    schema: REP_SCHEMA,
    label: REP_LABEL,
    run_id: input.runId,
    git_sha: input.gitSha,
    started_at: input.startedAt,
    finished_at: input.finishedAt,
    environment: {
      platform: `${process.platform}-${process.arch}`,
      bun_version: typeof Bun !== "undefined" ? Bun.version : "n/a",
      node_version: process.versions?.node ?? null,
    },
    subject: {
      entrypoint: input.entrypoint,
      fixture_flags: input.fixtureFlags,
      cols: input.cols,
      rows: input.rows,
    },
    scenarios: scenarioBlocks,
    summary: {
      total: scenarioBlocks.length,
      passed,
      failed: scenarioBlocks.length - passed,
      exit_ok: passed === scenarioBlocks.length,
    },
    artifacts: {
      report: input.reportPath,
      asciinema: input.asciinemaPath,
    },
  };
}
