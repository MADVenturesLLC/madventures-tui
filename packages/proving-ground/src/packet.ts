// packages/proving-ground/src/packet.ts
// REP-v1-pg evidence packet assembly.

import { randomBytes } from "node:crypto";
import { PACKET_LABEL, PACKET_SCHEMA, type ChallengeResult, type ProvingGroundPacket } from "./types";

export function makeRunId(now = new Date()): string {
  const stamp = now.toISOString().replace(/[-:T]/g, "").slice(0, 14);
  return `pg-${stamp}-${randomBytes(3).toString("hex")}`;
}

export function buildPacket(input: {
  runId: string;
  gitSha: string;
  seed: number;
  startedAt: string;
  finishedAt: string;
  results: ChallengeResult[];
  promotedRegressions: string[];
  artifactsDir: string;
}): ProvingGroundPacket {
  const passed = input.results.filter((r) => r.outcome === "pass").length;
  const failed = input.results.filter((r) => r.outcome === "fail").length;
  const unsupported = input.results.filter((r) => r.outcome === "unsupported").length;
  const specOnly = input.results.filter((r) => r.outcome === "spec_only").length;
  return {
    schema: PACKET_SCHEMA,
    label: PACKET_LABEL,
    run_id: input.runId,
    git_sha: input.gitSha,
    seed: input.seed,
    started_at: input.startedAt,
    finished_at: input.finishedAt,
    challenges: input.results,
    promoted_regressions: input.promotedRegressions,
    summary: {
      total: input.results.length,
      passed,
      failed,
      unsupported,
      spec_only: specOnly,
      // Zero FAILs is the gate; unsupported/spec_only are explicit non-passes
      // that never masquerade as green.
      exit_ok: failed === 0,
    },
    artifacts: {
      dir: input.artifactsDir,
      packet: "packet.json",
    },
  };
}
