#!/usr/bin/env bun
// packages/preflight/src/cli.ts
// `mad-preflight` — local fail-on-machine-before-push bug catcher.
//
// Pure argument parsing and orchestration. All heavy lifting lives in
// src/runner.ts (execution choke point) and src/checks.ts (pure evaluators).
// Makes no network requests of any kind. Exits 0 = all enabled checks
// passed (SKIPs allowed), 1 = one or more failures, 2 = preflight tooling
// error (a check could not start).

import {
  CHECK_NAMES,
  renderHuman,
  renderJson,
  type CheckName,
  type PreflightReport,
} from "./index";
import { PreflightConfigError, runPreflight } from "./runner";

const USAGE = `mad-preflight — local fail-on-machine-before-push bug catcher (v0)

usage:
  bun run preflight [--only <name>]... [--json] [--json-only] [--bail]
                    [--subjects <a,b,c>] [--cwd <path>]

checks (deterministic order): ${CHECK_NAMES.join(", ")}

flags:
  --only <name>     run a subset; repeatable, comma-separated accepted
  --json            print the machine summary as the LAST stdout line
  --json-only       suppress the human summary; JSON only
  --bail            stop at the first FAIL (default: run all, aggregate)
  --subjects <list> build-memory subjects to gate on (comma-separated)
  --cwd <path>      repo root (default: current working directory)
  --help            this text

exit codes: 0 = all enabled checks passed (SKIPs allowed)
            1 = one or more checks failed
            2 = preflight tooling error (a check could not start)

claim: PREFLIGHT_LOCAL_V0 — not evidence of PHASE_0, OCCUPANCY_PROOF,
GATEWAY_HONESTY, ROOM_RUNTIME. Not a merge authority.`;

type ParsedArgs = {
  only: CheckName[];
  json: boolean;
  jsonOnly: boolean;
  bail: boolean;
  subjects: string[];
  cwd?: string;
  help: boolean;
};

export function parseArgs(argv: readonly string[]): { args: ParsedArgs; error?: string } {
  const args: ParsedArgs = { only: [], json: false, jsonOnly: false, bail: false, subjects: [], help: false };
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    if (flag === undefined) break;
    switch (flag) {
      case "--only": {
        const value = argv[++i];
        if (value === undefined) return { args, error: "--only requires a check name" };
        for (const part of value.split(",")) {
          const name = part.trim();
          if (name.length === 0) continue;
          if (!(CHECK_NAMES as readonly string[]).includes(name)) {
            return { args, error: `unknown check name "${name}" (known: ${CHECK_NAMES.join(", ")})` };
          }
          args.only.push(name as CheckName);
        }
        break;
      }
      case "--json":
        args.json = true;
        break;
      case "--json-only":
        args.jsonOnly = true;
        args.json = true;
        break;
      case "--bail":
        args.bail = true;
        break;
      case "--subjects": {
        const value = argv[++i];
        if (value === undefined) return { args, error: "--subjects requires a comma-separated list" };
        for (const part of value.split(",")) {
          const subject = part.trim();
          if (subject.length > 0) args.subjects.push(subject);
        }
        break;
      }
      case "--cwd": {
        const value = argv[++i];
        if (value === undefined) return { args, error: "--cwd requires a path" };
        args.cwd = value;
        break;
      }
      case "--help":
      case "-h":
        args.help = true;
        return { args };
      default:
        return { args, error: `unknown flag: ${flag} (see --help)` };
    }
  }
  return { args };
}

async function main(): Promise<number> {
  const parsed = parseArgs(process.argv.slice(2));
  if (parsed.error !== undefined) {
    process.stderr.write(`error: ${parsed.error}\n\n${USAGE}\n`);
    return 2;
  }
  const args = parsed.args;
  if (args.help) {
    process.stdout.write(`${USAGE}\n`);
    return 0;
  }

  // Honesty section via @mad/claim-boundary when resolvable; the hardcoded
  // v0 strings in the report remain the boundary either way.
  let claimBoundaryModule: unknown = null;
  try {
    claimBoundaryModule = await import("@mad/claim-boundary");
  } catch {
    claimBoundaryModule = null;
  }

  let report: PreflightReport;
  try {
    report = await runPreflight({
      repoRoot: args.cwd ?? process.cwd(),
      only: args.only,
      bail: args.bail,
      subjects: args.subjects,
      claimBoundaryModule,
    });
  } catch (err) {
    if (err instanceof PreflightConfigError) {
      process.stderr.write(`error: ${err.message}\n`);
      return 2;
    }
    process.stderr.write(`error: preflight tooling error: ${err instanceof Error ? err.message : String(err)}\n`);
    return 2;
  }

  if (!args.jsonOnly) {
    process.stdout.write(`${renderHuman(report)}\n`);
  }
  if (args.json) {
    process.stdout.write(`${renderJson(report)}\n`);
  } else {
    process.stdout.write(`report: .mad/preflight/${report.run_id}/report.json\n`);
  }
  return report.exit_code;
}

process.exitCode = await main();
