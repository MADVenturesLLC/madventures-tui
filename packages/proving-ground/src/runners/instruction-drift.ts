// packages/proving-ground/src/runners/instruction-drift.ts
// Challenge (audit A5 class): shipped instructions must not contradict shipped
// code. Pins pairs of (symbol, code probe, stale instruction fragment); when a
// symbol EXISTS in code, the instruction file must no longer claim its absence.
//
// Pure core is injectable for tests; the real probe globs repo source. Every
// filesystem read is contained: repo-relative walk paths are resolved against
// the repo root and each resolved absolute path is re-checked with an explicit
// root-prefix guard immediately before use.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { repoRoot, resolveWithin } from "../paths";
import type { CaseRecord, ChallengeResult } from "../types";

export interface DriftPin {
  pinId: string;
  /** Symbol whose existence flips the pin. */
  symbol: string;
  /** Directory (relative to repo root) recursively probed for the symbol. */
  probeDir: string;
  /** Instruction-file fragments that are STALE once the symbol exists. */
  staleFragments: string[];
}

export interface DriftPinInput {
  pin: DriftPin;
  symbolExists: boolean;
  instructionText: string;
}

export interface DriftPinVerdict {
  pinId: string;
  applicable: boolean;
  pass: boolean;
  detail: string;
}

/** Pure pin evaluation — inject everything so tests need no filesystem. */
export function evaluateDriftPin(input: DriftPinInput): DriftPinVerdict {
  const { pin, symbolExists, instructionText } = input;
  if (!symbolExists) {
    return {
      pinId: pin.pinId,
      applicable: false,
      pass: true,
      detail: `symbol '${pin.symbol}' absent from ${pin.probeDir} — staleness claim not applicable`,
    };
  }
  const hits = pin.staleFragments.filter((f) => instructionText.includes(f));
  if (hits.length > 0) {
    return {
      pinId: pin.pinId,
      applicable: true,
      pass: false,
      detail: `code has '${pin.symbol}' but instructions still claim staleness via: ${hits.map((h) => JSON.stringify(h.slice(0, 60))).join(", ")}`,
    };
  }
  return {
    pinId: pin.pinId,
    applicable: true,
    pass: true,
    detail: `code has '${pin.symbol}' and instructions no longer claim otherwise`,
  };
}

export const DRIFT_PINS: readonly DriftPin[] = [
  {
    pinId: "pin-reduceLedgerEvent",
    symbol: "reduceLedgerEvent",
    probeDir: "packages/ledger/src",
    staleFragments: [
      "is not yet implemented under that name",
    ],
  },
  {
    pinId: "pin-live_runtime_not_certified",
    symbol: "live_runtime_not_certified",
    probeDir: "apps/madbridge/src",
    staleFragments: [
      "does not exist in source yet",
    ],
  },
  {
    pinId: "pin-collective-preamble",
    // Fires when ANY audited symbol exists — the collective "none exist" claim.
    symbol: "reduceLedgerEvent",
    probeDir: "packages/ledger/src",
    staleFragments: [
      "none of these symbols exist in",
    ],
  },
];

/** Containment guard, inline at every sink so the boundary is locally visible. */
function requireInsideRoot(root: string, candidate: string): string {
  const resolved = path.resolve(root, candidate);
  if (resolved !== root && !resolved.startsWith(root + path.sep)) {
    throw new Error(`path escapes repo root: ${candidate}`);
  }
  return resolved;
}

function dirContainsSymbol(root: string, probeRelDir: string, symbol: string): boolean {
  const probeDir = requireInsideRoot(root, probeRelDir);
  if (!existsSync(probeDir)) return false;
  const relStack: string[] = [probeRelDir];
  while (relStack.length > 0) {
    const rel = relStack.pop() as string;
    const absDir = requireInsideRoot(root, rel);
    for (const entry of readdirSync(absDir, { withFileTypes: true })) {
      const relFull = path.join(rel, entry.name);
      if (entry.isDirectory()) {
        relStack.push(relFull);
        continue;
      }
      if (!entry.name.endsWith(".ts") && !entry.name.endsWith(".tsx")) continue;
      if (readFileSync(requireInsideRoot(root, relFull), "utf8").includes(symbol)) return true;
    }
  }
  return false;
}

export function runInstructionDrift(
  seed: number,
  instructionRelPath: string,
): Omit<ChallengeResult, "durationMs"> {
  const root = repoRoot();
  const id = "pg-agents-drift";
  const base = {
    id,
    kind: "static_instruction_drift" as const,
    title: "AGENTS.md matches shipped reality (audit A5 class)",
    oracle: "drift pins (symbol-existence ⇒ no staleness claim)",
    seed,
    citations: [] as string[],
  };

  const instructionPath = requireInsideRoot(root, instructionRelPath);
  if (!existsSync(instructionPath)) {
    return {
      ...base,
      outcome: "unsupported",
      unsupportedReason: `instruction file not found: ${instructionRelPath}`,
      cases: [],
      artifacts: [],
    };
  }
  const instructionText = readFileSync(instructionPath, "utf8");
  const cases: CaseRecord[] = [];
  for (const pin of DRIFT_PINS) {
    const exists = dirContainsSymbol(root, pin.probeDir, pin.symbol);
    const verdict = evaluateDriftPin({ pin, symbolExists: exists, instructionText });
    cases.push({
      caseId: verdict.pinId,
      origin: "pin",
      input: { symbol: pin.symbol, probeDir: pin.probeDir, symbolExists: exists },
      expected: verdict.applicable ? "staleness fragments absent from instructions" : "not applicable",
      actual: verdict.detail,
      pass: verdict.pass,
    });
  }
  const failed = cases.filter((c) => !c.pass);
  return {
    ...base,
    outcome: failed.length === 0 ? "pass" : "fail",
    cases,
    artifacts: [],
  };
}
