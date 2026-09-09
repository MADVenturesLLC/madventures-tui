// packages/proving-ground/src/suite.ts
// Suite execution: runs challenge runners by kind, records durations, writes
// the REP-v1-pg packet. Suite v0 = every declared non-flaky challenge.

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { challengeDeclarations, DEFAULT_SEED, REQUIRED_SPEC_SECTIONS } from "./challenges";
import { runMalformedAuthority } from "./runners/malformed-authority";
import { runTuiGovernance } from "./runners/tui-governance";
import { runInstructionDrift } from "./runners/instruction-drift";
import { runSpecCard } from "./runners/spec-card";
import { listPromoted } from "./promote";
import { runsDir, repoRoot } from "./paths";
import { buildPacket, makeRunId } from "./packet";
import { PACKET_LABEL, type ChallengeResult, type ProvingGroundPacket } from "./types";

export interface SuiteOptions {
  /** Run a single challenge by id instead of the whole suite. */
  challengeId?: string;
  seed?: number;
  includeFlaky?: boolean;
  /** Where the packet + artifacts go; defaults to testdata/proving-ground/runs. */
  outDir?: string;
}

async function runDeclaration(
  decl: ReturnType<typeof challengeDeclarations>[number],
  seed: number,
  artifactsDir: string,
): Promise<ChallengeResult> {
  const started = Date.now();
  let partial: Omit<ChallengeResult, "durationMs">;
  switch (decl.kind) {
    case "malformed_authority":
      partial = runMalformedAuthority(seed);
      break;
    case "tui_governance":
      partial = await runTuiGovernance(seed, artifactsDir);
      break;
    case "static_instruction_drift":
      partial = runInstructionDrift(seed, "AGENTS.md");
      break;
    case "spec_card":
      partial = runSpecCard(seed, decl.specCardPath ?? "", REQUIRED_SPEC_SECTIONS);
      break;
  }
  return { ...partial, durationMs: Date.now() - started };
}

export async function runSuite(
  options: SuiteOptions = {},
): Promise<{ packet: ProvingGroundPacket; packetPath: string; exitOk: boolean }> {
  const root = repoRoot();
  const seed = options.seed ?? DEFAULT_SEED;
  const decls = challengeDeclarations().filter((d) => {
    if (options.challengeId !== undefined) return d.id === options.challengeId;
    return options.includeFlaky === true || d.flaky !== true;
  });
  if (decls.length === 0) {
    throw new Error(`no challenge matched: ${options.challengeId ?? "(suite)"}`);
  }

  const runId = makeRunId();
  const artifactsDir = options.outDir ?? path.join(runsDir(root), runId);
  mkdirSync(artifactsDir, { recursive: true });

  const startedAt = new Date().toISOString();
  const results: ChallengeResult[] = [];
  for (const decl of decls) {
    results.push(await runDeclaration(decl, seed, artifactsDir));
  }
  const finishedAt = new Date().toISOString();

  const packet = buildPacket({
    runId,
    gitSha: await gitSha(root),
    seed,
    startedAt,
    finishedAt,
    results,
    promotedRegressions: listPromoted(root),
    artifactsDir,
  });
  const packetPath = path.join(artifactsDir, "packet.json");
  writeFileSync(packetPath, JSON.stringify(packet, null, 2) + "\n", "utf8");
  writeFileSync(path.join(artifactsDir, "label.txt"), PACKET_LABEL + "\n", "utf8");
  return { packet, packetPath, exitOk: packet.summary.exit_ok };
}

async function gitSha(root: string): Promise<string> {
  const proc = Bun.spawnSync(["git", "-C", root, "rev-parse", "HEAD"]);
  const out = proc.stdout.toString().trim();
  return /^[0-9a-f]{40}$/.test(out) ? out : "unknown";
}
