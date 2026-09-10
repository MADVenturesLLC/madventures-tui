#!/usr/bin/env bun
// packages/tui-chaos/src/cli.ts
// tui-chaos — headless TUI acceptance & chaos harness for the MadBridge
// Founder TUI (madv-tui). TERMINAL QA of the TUI process.
//
//   TUI_ACCEPTANCE — NOT PHASE_0 — NOT OCCUPANCY_PROOF
//
// Commands:
//   start   Launch the real TUI in a headless PTY (fixture mode) and stay
//           attached until Ctrl-C. Useful for eyeballing what scenarios see.
//   run     Run acceptance/chaos scenarios and emit a REP-v1-tui evidence
//           packet. Nonzero exit on any failed invariant.
//   report  Print a summary of an existing evidence packet.
//
// The harness NEVER stands up a broker, socket, or daemon. It always drives
// the TUI's fixture path (MADV_TUI_FIXTURE=1). See README.md.

import path from "node:path";
import { mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";

import { launchTuiFixtureSession, defaultRepoRoot, type TuiFixtureSession } from "./tui-session";
import { startCast } from "./asciinema";
import { buildEvidencePacket, makeRunId, REP_LABEL, type EvidencePacket } from "./evidence";
import { compareGolden, updateGolden, GOLDEN_SCENARIOS } from "./goldens";
import { governanceFocus } from "./scenario/governance-focus";
import { layoutResize } from "./scenario/layout-resize";
import { chaosKeys } from "./scenario/chaos-keys";
import { ansiFlood } from "./scenario/ansi-flood";
import type { RunContext, ScenarioFn, ScenarioResult } from "./scenario/types";

const SCENARIOS: Record<string, ScenarioFn> = {
  governance_focus: governanceFocus,
  layout_resize: layoutResize,
  chaos_keys: chaosKeys,
  ansi_flood: ansiFlood,
};

const HELP = `tui-chaos — headless TUI acceptance & chaos harness
${REP_LABEL}

Usage: bun packages/tui-chaos/src/cli.ts <command> [options]

Commands:
  start     Launch the real TUI (fixture mode) in a headless PTY; attach until Ctrl-C
  run       Run scenarios, emit REP-v1-tui evidence packet, exit nonzero on failure
  report    Summarize an evidence packet (--packet PATH or --latest)

run options:
  --scenarios governance_focus,layout_resize,chaos_keys,ansi_flood   (default: all)
  --out DIR            artifact root (default: <repo>/testdata/tui-chaos/runs)
  --repo PATH          repo root (default: auto-detected)
  --cols N --rows N    initial PTY size (default 120x40)
  --no-asciinema       skip .cast recording
  --update-goldens     (re)record golden grids for governance_focus + layout_resize
  --json               print the full evidence packet to stdout

start options:
  --cols N --rows N    PTY size (default 120x40)
  --stream             enable MADV_TUI_FIXTURE_STREAM=1 (colorized fixture stream)
  --repo PATH          repo root (default: auto-detected)

Fixture gates (documented contract):
  MADV_TUI_FIXTURE=1            mock approval queue inside the TUI fixture
  MADV_TUI_FIXTURE_STREAM=1     colorized in-process fixture event stream
The harness never stands up a broker/socket/daemon and never touches a live
Gateway. If a live start would return no_broker_available, the fixture path
is the answer — not a workaround.
`;

function parseFlags(argv: string[]): Record<string, string | boolean> {
  const flags: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!;
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith("--")) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    }
  }
  return flags;
}

function flagNum(flags: Record<string, string | boolean>, key: string, fallback: number): number {
  const v = flags[key];
  if (typeof v === "string" && /^\d+$/.test(v)) return Number(v);
  return fallback;
}

/** Resolve `candidate` and require it to stay inside `base` (no traversal). */
function resolveWithin(base: string, candidate: string): string {
  const resolved = path.resolve(base, candidate);
  if (resolved !== base && !resolved.startsWith(base + path.sep)) {
    throw new Error(`path escapes artifact root: ${candidate}`);
  }
  return resolved;
}

/** Artifact file names are harness-controlled identifiers. */
function assertSafeArtifactName(name: string): string {
  if (!/^[A-Za-z0-9._-]+$/.test(name)) {
    throw new Error(`unsafe artifact name: ${name}`);
  }
  return name;
}

async function gitSha(repoRoot: string): Promise<string> {
  const proc = Bun.spawnSync(["git", "-C", repoRoot, "rev-parse", "HEAD"]);
  const out = proc.stdout.toString().trim();
  return /^[0-9a-f]{40}$/.test(out) ? out : "unknown";
}

function runDir(repoRoot: string, outFlag: string | boolean | undefined, runId: string): string {
  if (typeof outFlag === "string") {
    // Explicit --out is user input: contain it inside itself once resolved,
    // then contain per-run subdirs inside it.
    const base = path.resolve(outFlag);
    const dir = resolveWithin(base, runId);
    mkdirSync(dir, { recursive: true });
    return dir;
  }
  const base = path.join(repoRoot, "testdata", "tui-chaos", "runs");
  const dir = resolveWithin(base, runId);
  mkdirSync(dir, { recursive: true });
  return dir;
}

function makeRunContext(
  tui: TuiFixtureSession,
  artifactsDir: string,
  log: (msg: string) => void,
): RunContext {
  return {
    session: tui.session,
    screen: tui.screen,
    log,
    recordArtifact(name: string, content: string): string {
      const file = path.join(artifactsDir, assertSafeArtifactName(name));
      writeFileSync(file, content, "utf8");
      return file;
    },
    resize(cols: number, rows: number) {
      tui.session.resize(cols, rows);
      tui.screen.resize(cols, rows);
    },
  };
}

async function runScenarioFresh(
  name: string,
  fn: ScenarioFn,
  opts: {
    repoRoot: string;
    cols: number;
    rows: number;
    artifactsDir: string;
    asciinema: boolean;
    log: (msg: string) => void;
  },
): Promise<{ result: ScenarioResult; fixtureFlags: string[]; castPath: string | null }> {
  const cast = opts.asciinema
    ? startCast(
        { width: opts.cols, height: opts.rows },
        path.join(opts.artifactsDir, assertSafeArtifactName(`${name}.cast`)),
      )
    : null;
  const tui = await launchTuiFixtureSession({
    repoRoot: opts.repoRoot,
    cols: opts.cols,
    rows: opts.rows,
    stream: name === "ansi_flood",
    cast,
  });
  const ctx = makeRunContext(tui, opts.artifactsDir, opts.log);
  let castPath: string | null = null;
  try {
    const result = await fn(ctx);
    if (cast) {
      // F2: finish the recording and record the ACTUAL artifact path on the
      // scenario's own artifact list — never an invented filename.
      castPath = cast.finish();
      result.artifacts.push(castPath);
    }
    // F1: fixtureFlags come from the session that actually ran (built beside
    // the child env in tui-session.ts), not from a duplicate list here.
    return { result, fixtureFlags: tui.fixtureFlags, castPath };
  } finally {
    if (cast && !castPath) cast.finish();
    await tui.close();
  }
}

// ─── Command: run ───

async function cmdRun(argv: string[]): Promise<number> {
  const flags = parseFlags(argv);
  const repoRoot = path.resolve(typeof flags["repo"] === "string" ? flags["repo"] : defaultRepoRoot());
  const cols = flagNum(flags, "cols", 120);
  const rows = flagNum(flags, "rows", 40);
  const asciinema = flags["no-asciinema"] !== true;
  const updateGoldens = flags["update-goldens"] === true;
  const jsonOut = flags["json"] === true;

  const requested =
    typeof flags["scenarios"] === "string"
      ? flags["scenarios"].split(",").map((s) => s.trim()).filter(Boolean)
      : Object.keys(SCENARIOS);
  for (const name of requested) {
    if (!SCENARIOS[name]) {
      console.error(`unknown scenario: ${name}\nknown: ${Object.keys(SCENARIOS).join(", ")}`);
      return 2;
    }
  }

  const runId = makeRunId();
  const dir = runDir(repoRoot, flags["out"], runId);
  const log = (msg: string) => console.log(`[tui-chaos] ${msg}`);
  log(`run ${runId} — git ${await gitSha(repoRoot)}`);
  log(`artifacts: ${dir}`);
  log(`label: ${REP_LABEL}`);

  const startedAt = new Date().toISOString();
  const results: ScenarioResult[] = [];
  // F1: the packet's fixture_flags must be the flags actually exercised by
  // the run — derived from session state, never re-declared here. Each
  // scenario runs in a fresh session, so collect each session's flags.
  const exercisedFixtureFlags = new Set<string>();
  // F2: every cast the run actually wrote, for a truthful packet reference.
  const castPaths: string[] = [];
  for (const name of requested) {
    log(`▶ scenario ${name} (fresh TUI session)`);
    const { result, fixtureFlags, castPath } = await runScenarioFresh(name, SCENARIOS[name]!, {
      repoRoot,
      cols,
      rows,
      artifactsDir: dir,
      asciinema,
      log,
    });
    for (const f of fixtureFlags) exercisedFixtureFlags.add(f);
    if (castPath) castPaths.push(castPath);

    // Golden grid comparison happens BEFORE the result is reported so the
    // PASS/FAIL line always reflects the complete invariant set (goldens
    // cover governance_focus + layout_resize).
    if (!updateGoldens && (GOLDEN_SCENARIOS as readonly string[]).includes(result.name)) {
      const cmp = compareGolden(repoRoot, result.name, result.finalGrid);
      result.invariants.push({
        id: `golden-grid-${result.name}`,
        description: "final grid matches the committed golden fixture",
        pass: cmp.pass,
        detail: cmp.detail,
      });
      if (!cmp.pass) result.pass = false;
    }

    const failed = result.invariants.filter((i) => !i.pass);
    log(
      `${result.pass ? "✔ PASS" : "✘ FAIL"} ${name} in ${result.durationMs}ms` +
        (failed.length > 0
          ? ` — failing invariants: ${failed.map((i) => i.id).join(", ")}`
          : ""),
    );
    for (const inv of failed) {
      console.log(`    [${inv.id}] ${inv.detail}`);
    }
    results.push(result);
  }
  const finishedAt = new Date().toISOString();

  const packet = buildEvidencePacket({
    runId,
    gitSha: await gitSha(repoRoot),
    startedAt,
    finishedAt,
    entrypoint: "apps/madbridge/src/tui/main.tsx --fixture",
    // F1: actual flags used by the run (e.g. ansi_flood also sets
    // MADV_TUI_FIXTURE_STREAM=1); sorted for determinism.
    fixtureFlags: [...exercisedFixtureFlags].sort(),
    cols,
    rows,
    scenarioResults: results,
    reportPath: path.join(dir, "report.json"),
    // F2: single truthful reference when the run wrote casts; null when it
    // wrote none (--no-asciinema). Never an invented filename.
    asciinemaPath: castPaths.length > 0 ? castPaths[0]! : null,
  });

  const reportFile = path.join(dir, "report.json");
  writeFileSync(reportFile, JSON.stringify(packet, null, 2) + "\n", "utf8");
  writeFileSync(path.join(dir, "label.txt"), REP_LABEL + "\n", "utf8");

  if (updateGoldens) {
    for (const result of results) {
      if (!(GOLDEN_SCENARIOS as readonly string[]).includes(result.name)) continue;
      const file = updateGolden(repoRoot, result.name, result.finalGrid);
      log(`golden updated: ${file}`);
    }
  }

  const allPass = results.every((r) => r.pass);
  if (jsonOut) {
    console.log(JSON.stringify(packet, null, 2));
  } else {
    console.log("");
    console.log(`summary: ${results.filter((r) => r.pass).length}/${results.length} scenarios passed`);
    for (const r of results) {
      console.log(
        `  ${r.pass ? "PASS" : "FAIL"}  ${r.name.padEnd(18)} invariants=${r.invariants.length} grid_sha256=${r.finalHash}`,
      );
    }
    console.log(`packet:  ${reportFile}`);
    console.log(`label:   ${REP_LABEL}`);
  }
  return allPass ? 0 : 1;
}

// ─── Command: start ───

async function cmdStart(argv: string[]): Promise<number> {
  const flags = parseFlags(argv);
  const repoRoot = path.resolve(typeof flags["repo"] === "string" ? flags["repo"] : defaultRepoRoot());
  const cols = flagNum(flags, "cols", 120);
  const rows = flagNum(flags, "rows", 40);
  const stream = flags["stream"] === true;
  return startAttached({ repoRoot, cols, rows, stream });
}

async function startAttached(opts: {
  repoRoot: string;
  cols: number;
  rows: number;
  stream: boolean;
}): Promise<number> {
  const { cols, rows } = opts;
  const tui = await launchTuiFixtureSession(opts);
  console.log(`[tui-chaos] TUI under test pid=${tui.session.pid} (fixture mode, ${cols}x${rows})`);
  console.log(`[tui-chaos] entrypoint: ${tui.entrypoint}`);
  console.log(`[tui-chaos] label: ${REP_LABEL}`);
  console.log("[tui-chaos] attach mode: rendering PTY output. Ctrl-C to end.");

  tui.session.onData((data) => process.stdout.write(data));
  const exit = await tui.session.exit;
  console.log(`\n[tui-chaos] TUI exited (code=${exit.exitCode}, signal=${exit.signal})`);
  return exit.exitCode === 0 || exit.exitCode === null ? 0 : 1;
}

// ─── Command: report ───

function latestPacket(repoRoot: string): string | null {
  const runsDir = path.join(repoRoot, "testdata", "tui-chaos", "runs");
  if (!existsSync(runsDir)) return null;
  // Run ids are harness-generated (tui-chaos-<stamp>-<hex>); still filter to
  // that shape so no arbitrary path can be smuggled through the runs dir.
  const runs = readdirSync(runsDir)
    .filter((d) => /^tui-chaos-[0-9]{14}-[0-9a-f]{6}$/.test(d))
    .sort();
  for (let i = runs.length - 1; i >= 0; i--) {
    const candidate = path.join(runsDir, runs[i]!, "report.json");
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

async function cmdReport(argv: string[]): Promise<number> {
  const flags = parseFlags(argv);
  const repoRoot = path.resolve(typeof flags["repo"] === "string" ? flags["repo"] : defaultRepoRoot());
  const packetPath =
    typeof flags["packet"] === "string"
      ? path.resolve(flags["packet"])
      : flags["latest"] === true
        ? latestPacket(repoRoot)
        : null;
  if (!packetPath || !existsSync(packetPath)) {
    console.error("no evidence packet found — pass --packet PATH or run `tui-chaos run` first");
    return 2;
  }

  const packet = JSON.parse(readFileSync(packetPath, "utf8")) as EvidencePacket;
  console.log(`REP packet : ${packet.schema}`);
  console.log(`label      : ${packet.label}`);
  console.log(`run_id     : ${packet.run_id}`);
  console.log(`git_sha    : ${packet.git_sha}`);
  console.log(`subject    : ${packet.subject.entrypoint} at ${packet.subject.cols}x${packet.subject.rows}`);
  for (const s of packet.scenarios) {
    console.log(
      `  ${s.pass ? "PASS" : "FAIL"}  ${s.name} (${s.duration_ms}ms, grid sha256 ${s.final_grid_sha256})`,
    );
    for (const inv of s.invariants) {
      console.log(
        `      ${inv.pass ? "✔" : "✘"} ${inv.id}${inv.detail ? ` — ${inv.detail.split("\n")[0]}` : ""}`,
      );
    }
  }
  console.log(`summary    : ${packet.summary.passed}/${packet.summary.total} passed`);
  console.log(`report     : ${packet.artifacts.report}`);
  return packet.summary.exit_ok ? 0 : 1;
}

// ─── Main ───

async function main(): Promise<number> {
  const [command, ...rest] = process.argv.slice(2);
  if (!command || command === "--help" || command === "-h") {
    console.log(HELP);
    return command ? 0 : 1;
  }
  switch (command) {
    case "start":
      return cmdStart(rest);
    case "run":
      return cmdRun(rest);
    case "report":
      return cmdReport(rest);
    default:
      console.error(`unknown command: ${command}\n\n${HELP}`);
      return 2;
  }
}

process.exitCode = 1;
main()
  .then((code) => {
    process.exitCode = code;
  })
  .catch((err) => {
    console.error(`[tui-chaos] fatal: ${err instanceof Error ? err.message : String(err)}`);
    process.exitCode = 1;
  });
