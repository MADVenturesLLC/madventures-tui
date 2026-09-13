#!/usr/bin/env bun
// packages/honesty-compiler/src/cli.ts
// `mad-honesty-compile` — honesty IR + compiler gate (v0).
//
// One command: parse the claims input into closed ClaimIR[], rung-typecheck
// against @mad/claim-boundary, bind every required evidence ref, emit ONE
// @mad/single-verdict verdict — or fail closed. Makes no network calls,
// invents no evidence, and claims no authority.
//
// Exits 0 only if every declared claim is rung-legal AND evidence-bound.
// Exits 1 if any claim is over-claim, unbound, STALE memory, or forbidden
// token (the verdict is FAIL). Exits 2 only for tooling errors — the
// compiler could not run honestly at all.

import { resolve } from "node:path";

import { compileClaims, renderHuman, renderJsonLine, type CompileMode } from "./index";

const USAGE = `mad-honesty-compile — honesty IR + compiler gate (v0)

usage:
  bun run honesty-compile [--input <path>] [--cwd <path>] [--fixture]
                          [--store <path>] [--fixture-store <path>]
                          [--json-only] [--now <iso8601>] [--help]

input (v0, closed shapes only):
  honesty/claims.json                       primary machine input
  <handoff>.md                              optional: a section titled
                                            "Declared claims" whose first
                                            fenced block is the same JSON
Free prose is never scraped into claims. Under-claiming beats hallucination.

modes:
  live      default. build-memory store .mad/build-memory.json; claimed
            headSha must equal the working git HEAD.
  fixture   --fixture or MADV_HONESTY_FIXTURE=1. Sealed package fixtures;
            no live Argus, no git. CI-friendly.

flags:
  --input <path>        claims input (default: honesty/claims.json)
  --cwd <path>          repo root (default: current working directory)
  --fixture             force sealed fixture mode
  --store <path>        live build-memory store override
  --fixture-store <path>  sealed fixture store override
  --json-only           suppress the human summary; JSON only
  --now <iso8601>       pin produced_at (deterministic goldens/CI)
  --help                this text

exit codes: 0 = every declared claim rung-legal AND evidence-bound
            1 = verdict FAIL (over-claim, unbound, STALE memory, forbidden
                token, unknown field, refusal)
            2 = tooling error — the compiler could not run honestly

claim: HONESTY_COMPILER_V0 — not evidence of PHASE_0, OCCUPANCY_PROOF,
GATEWAY_HONESTY, ROOM_RUNTIME, AE01_FIX, PRODUCTION_MERGE_AUTHORITY, merge.
Not merge authority. Not Phase 0. Not Gateway honesty.`;

type ParsedArgs = {
  input: string;
  cwd?: string;
  fixture: boolean;
  store?: string;
  fixtureStore?: string;
  jsonOnly: boolean;
  now?: string;
  help: boolean;
};

export function parseArgs(argv: readonly string[]): { args: ParsedArgs; error?: string } {
  const args: ParsedArgs = { input: "honesty/claims.json", fixture: false, jsonOnly: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    if (flag === undefined) break;
    switch (flag) {
      case "--input": {
        const value = argv[++i];
        if (value === undefined) return { args, error: "--input requires a path" };
        args.input = value;
        break;
      }
      case "--cwd": {
        const value = argv[++i];
        if (value === undefined) return { args, error: "--cwd requires a path" };
        args.cwd = value;
        break;
      }
      case "--fixture":
        args.fixture = true;
        break;
      case "--store": {
        const value = argv[++i];
        if (value === undefined) return { args, error: "--store requires a path" };
        args.store = value;
        break;
      }
      case "--fixture-store": {
        const value = argv[++i];
        if (value === undefined) return { args, error: "--fixture-store requires a path" };
        args.fixtureStore = value;
        break;
      }
      case "--json-only":
        args.jsonOnly = true;
        break;
      case "--now": {
        const value = argv[++i];
        if (value === undefined) return { args, error: "--now requires an ISO-8601 timestamp" };
        if (Number.isNaN(Date.parse(value))) return { args, error: `--now must be ISO-8601, got ${value}` };
        args.now = value;
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

  const rootDir = resolve(args.cwd ?? process.cwd());
  const mode: CompileMode = args.fixture || process.env["MADV_HONESTY_FIXTURE"] === "1" ? "fixture" : "live";
  const inputPath = resolve(rootDir, args.input);
  let claimsText: string;
  try {
    claimsText = await Bun.file(inputPath).text();
  } catch {
    process.stderr.write(`error: cannot read claims input ${inputPath}\n`);
    return 2;
  }

  const outcome = await compileClaims({
    mode,
    rootDir,
    sourceLabel: args.input,
    inputDir: resolve(inputPath, ".."),
    claimsText,
    ...(args.store !== undefined ? { storePath: args.store } : {}),
    ...(args.fixtureStore !== undefined ? { fixtureStorePath: args.fixtureStore } : {}),
    ...(args.now !== undefined ? { now: args.now } : {}),
  });
  if (!outcome.ok) {
    process.stderr.write(`error: honesty-compiler tooling error: ${outcome.issue.message}\n`);
    return 2;
  }

  const result = outcome.result;
  if (!args.jsonOnly) {
    process.stdout.write(`${renderHuman(result)}\n`);
  }
  process.stdout.write(`${renderJsonLine(result)}\n`);
  return result.exit_code;
}

process.exitCode = await main();
