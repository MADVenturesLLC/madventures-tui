// packages/proving-ground/src/runners/tui-governance.ts
// Challenge: the governed Founder decision surface stays governed in a real
// headless TUI. THIN WRAPPER — invokes the existing tui-chaos CLI
// (governance_focus scenario); this runner implements no PTY stack of its own.
//
// Security posture: the child is spawned as an ARGUMENT LIST (never a shell
// string) from explicitly resolved binaries. Secrets never reach the TUI under
// test because the tui-chaos CLI constructs the TUI child's environment from
// its own explicit allowlist (see packages/tui-chaos/src/tui-session.ts) —
// this wrapper deliberately adds no environment of its own.
//
// Environment gating is explicit: if tui-chaos or the `node` bridge runtime is
// absent, the outcome is "unsupported" with the reason recorded — a skip is
// never silently a pass.

import path from "node:path";
import { existsSync, readdirSync } from "node:fs";
import { spawn as bunSpawn } from "bun";
import { resolveWithin, repoRoot } from "../paths";
import type { CaseRecord, ChallengeResult } from "../types";

const TUI_CHAOS_CLI = "packages/tui-chaos/src/cli.ts";
const SCENARIO = "governance_focus";
const TIMEOUT_MS = 150_000;

export interface TuiPrereqs {
  tuiChaosCliPath: string | null;
  nodePath: string | null;
  bunPath: string | null;
}

export function checkTuiPrereqs(root = repoRoot()): TuiPrereqs {
  const cli = path.join(root, TUI_CHAOS_CLI);
  return {
    tuiChaosCliPath: existsSync(cli) ? cli : null,
    nodePath: Bun.which("node"),
    bunPath: Bun.which("bun"),
  };
}

interface TuiScenarioReport {
  scenarios: Array<{ name: string; pass: boolean }>;
}

function findReportJson(dir: string): string | null {
  if (!existsSync(dir)) return null;
  const runs = readdirSync(dir).filter((d) => d.startsWith("tui-chaos-")).sort();
  for (let i = runs.length - 1; i >= 0; i--) {
    const candidate = path.join(dir, runs[i] as string, "report.json");
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

export async function runTuiGovernance(
  seed: number,
  artifactsDir: string,
): Promise<Omit<ChallengeResult, "durationMs">> {
  const root = repoRoot();
  const prereqs = checkTuiPrereqs(root);
  const id = "pg-tui-governance";
  const base = {
    id,
    kind: "tui_governance" as const,
    title: "Founder decision surface stays governed in a live headless TUI",
    oracle: `tui-chaos ${SCENARIO} scenario (exit 0 + scenario pass)`,
    seed,
    cases: [] as CaseRecord[],
    citations: [] as string[],
  };

  const unsupported = (reason: string): Omit<ChallengeResult, "durationMs"> => ({
    ...base,
    outcome: "unsupported",
    unsupportedReason: reason,
    artifacts: [],
  });

  if (prereqs.tuiChaosCliPath === null) {
    return unsupported(`tui-chaos CLI not present at ${TUI_CHAOS_CLI} — skip is explicit, not a pass`);
  }
  if (prereqs.nodePath === null) {
    return unsupported(
      "no `node` binary on PATH — the tui-chaos PTY bridge (node-pty) requires Node; skip is explicit, not a pass",
    );
  }
  if (prereqs.bunPath === null) {
    return unsupported("no `bun` binary on PATH — cannot launch the tui-chaos CLI; skip is explicit, not a pass");
  }

  const outDir = resolveWithin(artifactsDir, "tui-governance");
  // Argument-list spawn only — never a shell string.
  const bunBin: string = prereqs.bunPath;
  const cliPath: string = prereqs.tuiChaosCliPath;
  const child = bunSpawn(
    [bunBin, cliPath, "run", "--scenarios", SCENARIO, "--no-asciinema", "--out", outDir],
    { cwd: root, stdout: "pipe", stderr: "pipe" },
  );
  const timer = setTimeout(() => child.kill(), TIMEOUT_MS);
  const exitCode = await child.exited;
  clearTimeout(timer);

  const reportPath = findReportJson(outDir);
  const artifacts = reportPath ? [reportPath] : [];

  if (exitCode !== 0) {
    const stderrTail = await new Response(child.stderr).text();
    return {
      ...base,
      outcome: "fail",
      cases: [
        {
          caseId: "tui-governance-focus",
          origin: "check",
          input: { scenario: SCENARIO, seedNote: "tui-chaos is internally deterministic; seed recorded but unused" },
          expected: "exit 0 and scenario pass=true",
          actual: `exit ${exitCode}${stderrTail.trim().length > 0 ? `; stderr: ${stderrTail.trim().slice(0, 300)}` : ""}`,
          pass: false,
        },
      ],
      artifacts,
    };
  }

  if (reportPath === null) {
    return {
      ...base,
      outcome: "fail",
      cases: [
        {
          caseId: "tui-governance-focus",
          origin: "check",
          input: { scenario: SCENARIO },
          expected: "REP packet with scenario pass=true",
          actual: "exit 0 but no report.json found under artifact dir",
          pass: false,
        },
      ],
      artifacts,
    };
  }

  const report = JSON.parse(await Bun.file(reportPath).text()) as TuiScenarioReport;
  const scenario = report.scenarios.find((s) => s.name === SCENARIO);
  const pass = scenario !== undefined && scenario.pass === true;
  return {
    ...base,
    outcome: pass ? "pass" : "fail",
    cases: [
      {
        caseId: "tui-governance-focus",
        origin: "check",
        input: { scenario: SCENARIO, report: reportPath },
        expected: "scenario pass=true in tui-chaos REP packet",
        actual: pass ? "pass=true in tui-chaos REP packet" : `pass=${String(scenario?.pass)}`,
        pass,
      },
    ],
    artifacts,
  };
}
