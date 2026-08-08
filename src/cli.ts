// src/cli.ts — madv-tui CLI entry point
// Design Section 7: Primary commands
//
// madv-tui init          Initialize runtime directories, config, verify deps
// madv-tui doctor        Verify Claude Code, agy, Bun, OpenTUI deps, permissions
// madv-tui start         Start broker + TUI with a task envelope
// madv-tui status        Show current broker/ownership/session status
// madv-tui pause         Request governed pause
// madv-tui resume        Resume after pause (requires re-attestation)
// madv-tui verify-ledger Verify hash-chain integrity of the local ledger
// madv-tui export-evidence  Export ledger, artifacts, and final manifest
// madv-tui close         Governed closure of a session

import { Runtime } from "./broker/runtime";
import { Ledger } from "./broker/ledger";
import {
  APP_DATA_DIR,
  RUNTIME_DIR,
  CONFIG_DIR,
  LEDGER_DIR,
  ARTIFACT_DIR,
  SOCKET_PATH,
} from "./shared/protocol";
import { join } from "path";
import { existsSync, mkdirSync, statSync } from "fs";
import { spawnSync } from "child_process";
import { homedir } from "os";

const HELP = `MADVentures TUI — madbridge protocol v1

Commands:
  init                   Initialize runtime directories and config
  doctor                 Verify dependencies, permissions, adapter compatibility
  start --task <id>      Start broker + TUI with a task envelope
    --repo <path>        Repository path (required)
  status                 Show current broker/ownership/session status
  pause                  Request governed pause of current session
  resume                 Resume after pause (requires re-attestation)
  verify-ledger          Verify hash-chain integrity of local ledger
  export-evidence        Export ledger, artifacts, and final manifest
  close                  Governed closure of a session

Options:
  -h, --help             Show this help
  -v, --version          Show version`;

const VERSION = "0.1.0";

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === "-h" || command === "--help") {
    console.log(HELP);
    return;
  }

  if (command === "-v" || command === "--version") {
    console.log(VERSION);
    return;
  }

  switch (command) {
    case "init":
      await cmdInit();
      break;
    case "doctor":
      await cmdDoctor();
      break;
    case "start":
      await cmdStart(args.slice(1));
      break;
    case "status":
      await cmdStatus();
      break;
    case "pause":
      await cmdPause();
      break;
    case "resume":
      await cmdResume();
      break;
    case "verify-ledger":
      await cmdVerifyLedger();
      break;
    case "export-evidence":
      await cmdExportEvidence();
      break;
    case "close":
      await cmdClose();
      break;
    default:
      console.error(`Unknown command: ${command}`);
      console.log(HELP);
      process.exit(1);
  }
}

async function cmdInit() {
  console.log("[init] Initializing MADVentures TUI runtime...");

  Runtime.init();

  for (const dir of [CONFIG_DIR, LEDGER_DIR, ARTIFACT_DIR]) {
    try {
      mkdirSync(dir, { recursive: true, mode: 0o700 });
      console.log(`  ✓ ${dir}`);
    } catch {
      console.log(`  · ${dir} (exists)`);
    }
  }

  console.log(`\nRuntime directory: ${RUNTIME_DIR}`);
  console.log(`Socket path: ${SOCKET_PATH}`);
  console.log(`\nNext: run 'madv-tui doctor' to verify dependencies.`);
}

async function cmdDoctor() {
  console.log("[doctor] Verifying dependencies...\n");

  let allOk = true;

  // Bun
  const bunVersion = Bun.version;
  console.log(`  ${bunVersion ? "✓" : "✗"} Bun: ${bunVersion ?? "not found"}`);
  if (!bunVersion) allOk = false;

  // TypeScript
  try {
    const result = spawnSync("bunx", ["tsc", "--version"], { encoding: "utf-8" });
    console.log(`  ${result.status === 0 ? "✓" : "✗"} TypeScript: ${result.stdout?.trim() ?? "not found"}`);
  } catch {
    console.log("  ✗ TypeScript: not found");
    allOk = false;
  }

  // OpenTUI
  try {
    await import("@opentui/core");
    console.log(`  ✓ @opentui/core: available`);
  } catch {
    console.log("  ✗ @opentui/core: not installed");
    allOk = false;
  }

  // Claude Code
  const claudeResult = spawnSync("which", ["claude"], { encoding: "utf-8" });
  console.log(`  ${claudeResult.status === 0 ? "✓" : "✗"} Claude Code: ${claudeResult.stdout?.trim() ?? "not found"}`);
  if (claudeResult.status !== 0) allOk = false;

  // Antigravity (agy)
  const agyResult = spawnSync("which", ["agy"], { encoding: "utf-8" });
  console.log(`  ${agyResult.status === 0 ? "✓" : "✗"} Antigravity (agy): ${agyResult.stdout?.trim() ?? "not found"}`);
  if (agyResult.status !== 0) allOk = false;

  // Runtime directory
  Runtime.init();
  console.log(`  ✓ Runtime directory: ${RUNTIME_DIR}`);

  // MCP config locations
  const agyMcpPath = join(homedir(), ".gemini", "config", "mcp_config.json");
  const claudeMcpPath = join(homedir(), ".claude", "mcp_config.json");

  console.log(`  ${existsSync(agyMcpPath) ? "✓" : "·"} Antigravity MCP config: ${agyMcpPath}`);
  console.log(`  ${existsSync(claudeMcpPath) ? "✓" : "·"} Claude Code MCP config: ${claudeMcpPath}`);

  // Per Section 7: doctor does NOT change anything
  console.log(`\n${allOk ? "All required dependencies verified." : "Some dependencies are missing — see above."}`);
  console.log("Note: doctor does not modify any configuration.");
}

async function cmdStart(args: string[]) {
  let taskId: string | null = null;
  let repoPath: string | null = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--task" && args[i + 1]) {
      taskId = args[++i] ?? null;
    } else if (args[i] === "--repo" && args[i + 1]) {
      repoPath = args[++i] ?? null;
    }
  }

  if (!taskId) {
    console.error("Error: --task <task-id> is required");
    process.exit(1);
  }
  if (!repoPath) {
    console.error("Error: --repo <path> is required");
    process.exit(1);
  }

  console.log(`[start] Task: ${taskId}`);
  console.log(`[start] Repo: ${repoPath}`);
  console.log("[start] Starting broker daemon...");

  // Start broker in background
  const { Broker } = await import("./broker/index");
  const broker = new Broker();
  await broker.start();

  console.log(`[start] Broker listening on ${SOCKET_PATH}`);
  console.log("[start] Launching TUI...");

  // The TUI will be launched by importing the renderer
  // For now, the broker runs and the TUI connects
  console.log("[start] TUI entry point: src/index.tsx (run with: bun run src/index.tsx)");
}

async function cmdStatus() {
  console.log("[status] Checking broker...");
  const { existsSync } = await import("fs");
  if (!existsSync(SOCKET_PATH)) {
    console.log("  Broker not running (no socket found).");
    console.log(`  Expected socket: ${SOCKET_PATH}`);
    return;
  }
  console.log(`  ✓ Broker socket: ${SOCKET_PATH}`);
  // TODO: connect to socket and query full state
}

async function cmdPause() {
  console.log("[pause] Requesting governed pause...");
  // TODO: send pause request to broker over socket
}

async function cmdResume() {
  console.log("[resume] Requesting resume (requires re-attestation)...");
  // TODO: send resume request to broker, broker will require attestation
}

async function cmdVerifyLedger() {
  console.log("[verify-ledger] Verifying hash-chain integrity...");
  const ledger = new Ledger(join(LEDGER_DIR, "ledger.db"));
  const valid = await ledger.verify();
  console.log(valid ? "  ✓ Ledger verified — hash chain intact." : "  ✗ Ledger verification FAILED — tampering detected.");
  ledger.close();
}

async function cmdExportEvidence() {
  console.log("[export-evidence] Exporting ledger, artifacts, and manifest...");
  const ledger = new Ledger(join(LEDGER_DIR, "ledger.db"));
  const entries = ledger.recent(10000);
  console.log(`  Ledger entries: ${entries.length}`);
  console.log(`  Exporting to: ${ARTIFACT_DIR}/evidence-manifest.json`);
  // TODO: write full manifest with artifacts
  ledger.close();
}

async function cmdClose() {
  console.log("[close] Requesting governed closure...");
  // TODO: verify all artifacts reviewed, ledger consistent, ownership released
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
