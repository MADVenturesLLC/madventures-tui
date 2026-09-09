#!/usr/bin/env bun
// packages/proving-ground/src/cli.ts
// proving-ground — Adversarial Proving Ground v0.
//
//   PROVING_GROUND — NOT PHASE_0 — NOT OCCUPANCY_PROOF
//
// Commands:
//   init      Scaffold testdata/proving-ground directories (idempotent)
//   list      Print the challenge registry
//   run       Execute a challenge or --suite v0; emit REP-v1-pg packet
//   minimize  Shrink a failing claim-boundary case while the verdict survives
//   promote   Copy a proven case into durable regressions + loader test
//
// No broker, no Gateway, no Phase 0, no occupancy claims. Deterministic
// seeds; explicit skips; zero silently-green outcomes.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { challengeDeclarations } from "./challenges";
import { authoredLawCases } from "./law";
import { provingGroundDir, repoRoot, resolveWithin, runsDir } from "./paths";
import { runSuite } from "./suite";
import { shrinkClaimVector } from "./shrink";
import { readFixtureIds, writeClaimBoundaryFixture } from "./promote";
import { PACKET_LABEL } from "./types";
import type { SuiteOptions } from "./suite";

const HELP = `proving-ground — Adversarial Proving Ground v0
${PACKET_LABEL}

Usage: bun packages/proving-ground/src/cli.ts <command> [options]

Commands:
  init        Scaffold testdata/proving-ground directories (idempotent)
  list        Print the challenge registry
  run         --challenge <id> | --suite v0   [--seed N] [--out DIR] [--include-flaky] [--json]
  minimize    --challenge pg-cb-lies --case <caseId> [--out DIR]
  promote     --challenge pg-cb-lies --case <caseId> --reason "..." [--out DIR]

All runs are seeded (default 20260906) and deterministic. Skips are recorded
as "unsupported" with a reason — a skip never counts as a pass.
`;

function parseFlags(argv: string[]): Record<string, string | boolean> {
  const flags: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i] as string;
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith("--")) {
        flags[key] = next;
        i += 1;
      } else {
        flags[key] = true;
      }
    }
  }
  return flags;
}

function cmdInit(): number {
  const root = repoRoot();
  const base = provingGroundDir(root);
  for (const sub of ["challenges", "regressions", "regressions/claim-boundary", "runs", "evidence"]) {
    mkdirSync(path.join(base, sub), { recursive: true });
  }
  console.log(`[proving-ground] scaffolded ${path.relative(root, base)}`);
  return 0;
}

function cmdList(): number {
  console.log(`label: ${PACKET_LABEL}`);
  for (const decl of challengeDeclarations()) {
    const flaky = decl.flaky === true ? " [FLAKY-QUARANTINE]" : "";
    console.log(`  ${decl.id.padEnd(22)} ${decl.kind.padEnd(26)} ${decl.title}${flaky}`);
    console.log(`    ${" ".repeat(22)} oracle: ${decl.oracle}`);
  }
  return 0;
}

async function cmdRun(argv: string[]): Promise<number> {
  const flags = parseFlags(argv);
  const challengeId = typeof flags["challenge"] === "string" ? flags["challenge"] : undefined;
  const suite = flags["suite"] === "v0" || flags["suite"] === true;
  if (challengeId === undefined && !suite) {
    console.error("run needs --challenge <id> or --suite v0");
    return 2;
  }
  const seed = typeof flags["seed"] === "string" && /^\d+$/.test(flags["seed"]) ? Number(flags["seed"]) : undefined;
  const outDir =
    typeof flags["out"] === "string" ? resolveWithin(runsDir(repoRoot()), flags["out"]) : undefined;

  const options: SuiteOptions = { includeFlaky: flags["include-flaky"] === true };
  if (challengeId !== undefined) options.challengeId = challengeId;
  if (seed !== undefined) options.seed = seed;
  if (outDir !== undefined) options.outDir = outDir;

  const { packet, packetPath, exitOk } = await runSuite(options);

  if (flags["json"] === true) {
    console.log(JSON.stringify(packet, null, 2));
  } else {
    for (const c of packet.challenges) {
      const mark =
        c.outcome === "pass" ? "✔ PASS" : c.outcome === "fail" ? "✘ FAIL" : c.outcome === "spec_only" ? "◇ SPEC" : "◌ SKIP";
      console.log(`${mark}  ${c.id.padEnd(22)} ${c.outcome.padEnd(11)} ${String(c.durationMs).padStart(6)}ms  seed=${c.seed}`);
      for (const failed of c.cases.filter((x) => !x.pass)) {
        console.log(`      [${failed.caseId}] expected: ${failed.expected}`);
        console.log(`                  actual:   ${failed.actual}`);
      }
      if (c.outcome === "unsupported" && c.unsupportedReason !== undefined) {
        console.log(`      reason: ${c.unsupportedReason}`);
      }
    }
    console.log("");
    console.log(
      `summary: ${packet.summary.passed} pass / ${packet.summary.failed} fail / ` +
        `${packet.summary.unsupported} unsupported / ${packet.summary.spec_only} spec-only`,
    );
    console.log(`label:   ${PACKET_LABEL}`);
    console.log(`packet:  ${packetPath}`);
  }
  return exitOk ? 0 : 1;
}

function findLawCase(caseId: string) {
  return authoredLawCases().find((c) => c.caseId === caseId) ?? null;
}

function cmdMinimize(argv: string[]): number {
  const flags = parseFlags(argv);
  const caseId = typeof flags["case"] === "string" ? flags["case"] : null;
  if (caseId === null) {
    console.error("minimize needs --case <caseId> (see `run` output / law catalog)");
    return 2;
  }
  const lawCase = findLawCase(caseId);
  if (lawCase === null) {
    console.error(`unknown case: ${caseId}`);
    return 2;
  }
  const result = shrinkClaimVector(lawCase.vector);
  if (result.preservedCode === "(not failing)") {
    console.log(`case ${caseId} does not fail — nothing to minimize (the law holds)`);
    return 0;
  }
  const outDir = path.join(runsDir(repoRoot()), `minimize-${caseId}`);
  mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "minimal.json");
  writeFileSync(
    outPath,
    JSON.stringify({ caseId, preservedCode: result.preservedCode, minimal: result.minimal, steps: result.steps }, null, 2) + "\n",
    "utf8",
  );
  console.log(`minimized ${caseId}: preserved ${result.preservedCode} through ${result.steps.length} shrink steps`);
  console.log(`minimal vector: ${JSON.stringify(result.minimal)}`);
  console.log(`artifact: ${outPath}`);
  return 0;
}

function cmdPromote(argv: string[]): number {
  const flags = parseFlags(argv);
  const caseId = typeof flags["case"] === "string" ? flags["case"] : null;
  const reason = typeof flags["reason"] === "string" ? flags["reason"] : null;
  if (caseId === null || reason === null) {
    console.error('promote needs --case <caseId> and --reason "why this becomes durable"');
    return 2;
  }
  const lawCase = findLawCase(caseId);
  if (lawCase === null) {
    console.error(`unknown case: ${caseId}`);
    return 2;
  }
  const { fixturePath, loaderTestPath } = writeClaimBoundaryFixture({
    root: repoRoot(),
    challengeId: "pg-cb-lies",
    lawCase,
    reason,
  });
  console.log(`promoted: ${fixturePath}`);
  console.log(`loader:   ${loaderTestPath}`);
  console.log(`fixtures now: ${readFixtureIds(repoRoot()).join(", ")}`);
  return 0;
}

async function main(): Promise<number> {
  const [command, ...rest] = process.argv.slice(2);
  if (command === undefined || command === "--help" || command === "-h") {
    console.log(HELP);
    return command === undefined ? 1 : 0;
  }
  switch (command) {
    case "init":
      return cmdInit();
    case "list":
      return cmdList();
    case "run":
      return await cmdRun(rest);
    case "minimize":
      return cmdMinimize(rest);
    case "promote":
      return cmdPromote(rest);
    default:
      console.error(`unknown command: ${command}`);
      console.log(HELP);
      return 2;
  }
}

process.exitCode = 1;
main()
  .then((code) => {
    process.exitCode = code;
  })
  .catch((err) => {
    console.error(`[proving-ground] fatal: ${err instanceof Error ? err.message : String(err)}`);
    process.exitCode = 1;
  });
