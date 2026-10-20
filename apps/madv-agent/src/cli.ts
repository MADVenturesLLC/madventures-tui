// apps/madv-agent/src/cli.ts
// madv-agent v0 — N1 entry point (Amendment 1: CLI entry point).
//
// Order of operations (design §6): parse args → SCRUB THE ENVIRONMENT →
// resolve the loopback proxy URL → acquire the project lock → open or resume
// the session (session_start + env_scrub events) → render the TUI or run one
// scripted prompt. The scrub happens BEFORE rendering and BEFORE any call.
//
// This agent holds no provider key. Only MADV_AGENT_PROXY_URL.

import { resolve } from "node:path";
import {
  scrubProcessEnvironment,
} from "./scrub";
import { resolveProxyUrl } from "./proxy";
import { acquireProjectLock } from "./lock";
import {
  listSessions,
  readEvents,
  reconstructTranscript,
  verifyChain,
} from "./events";
import { openNewSession, openSessionForResume } from "./session";
import { runTurn } from "./turn";
import { sanitizeStream, sanitizeForDisplay, terminalApprover, type Approver } from "./approval";
import { ProxyRefusedError, ProxyRequestError } from "./proxy-error";
import type { ProjectLock } from "./lock";
import type { TuiBootstrap } from "./bootstrap";

export interface ParsedArgs {
  projectDir?: string;
  resumeId?: string | null; // null = "--resume" alone (list sessions)
  prompt?: string;
  maxRounds?: number;
  help: boolean;
}

export function parseArgs(argv: string[]): ParsedArgs {
  const parsed: ParsedArgs = { help: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i] ?? "";
    const value = (): string => {
      const v = argv[i + 1];
      i += 1;
      if (v === undefined) throw new Error(`${arg} requires a value`);
      return v;
    };
    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else if (arg === "--project") {
      parsed.projectDir = value();
    } else if (arg.startsWith("--project=")) {
      parsed.projectDir = arg.slice("--project=".length);
    } else if (arg === "--resume") {
      const next = argv[i + 1];
      // "--resume" alone lists sessions; "--resume <id>" resumes.
      if (next === undefined || next.startsWith("--")) {
        parsed.resumeId = null;
      } else {
        parsed.resumeId = next;
        i += 1;
      }
    } else if (arg.startsWith("--resume=")) {
      parsed.resumeId = arg.slice("--resume=".length);
    } else if (arg === "--max-rounds") {
      const raw = value();
      // F2: strict. `parseInt("12abc")` is 12, and parseInt("0x10") is 16 —
      // a range check on the parsed value would accept both. Only digits.
      if (!/^[0-9]+$/.test(raw)) {
        throw new Error(`--max-rounds must be a whole number 1..200 (got ${raw})`);
      }
      const n = Number.parseInt(raw, 10);
      if (!Number.isSafeInteger(n) || n < 1 || n > 200) {
        throw new Error(`--max-rounds must be a whole number 1..200 (got ${raw})`);
      }
      parsed.maxRounds = n;
    } else if (arg === "--prompt") {
      parsed.prompt = value();
    } else if (arg.startsWith("--prompt=")) {
      parsed.prompt = arg.slice("--prompt=".length);
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return parsed;
}

export interface CliIo {
  env: NodeJS.ProcessEnv;
  cwd: string;
  argv: string[];
  stdout: (text: string) => void;
  stderr: (text: string) => void;
  /** Mutate the live process environment during the scrub. */
  deleteEnv: (name: string) => void;
  /**
   * D3 test seam: where exit/signal handlers are registered, so tests can
   * prove the lock is released on every TUI exit path. Defaults to the real
   * process.
   */
  processHooks?: ProcessHooks;
  /** D3 test seam: the TUI implementation. Defaults to ./tui/main. */
  tui?: (bootstrap: TuiBootstrap) => Promise<void>;
  /**
   * N3: the approval gate. Defaults to the terminal approver, which blocks and
   * fails closed on anything that is not an explicit yes. Tests inject one.
   */
  approver?: Approver;
}

export interface ProcessHooks {
  onExit: (cb: () => void) => void;
  onSignal: (cb: () => void) => void;
  /** How the signal handler terminates the process (injectable for tests). */
  exit: (code: number) => void;
}

export const REAL_PROCESS_HOOKS: ProcessHooks = {
  onExit: (cb) => {
    process.on("exit", cb);
  },
  onSignal: (cb) => {
    process.on("SIGINT", cb);
    process.on("SIGTERM", cb);
  },
  exit: (code) => {
    process.exit(code);
  },
};

/**
 * D3: the lock is released on EVERY exit path — normal return, process.exit,
 * SIGINT, SIGTERM. (A SIGKILL leaves a stale lock; the dead-holder reclaim
 * handles that.) Previously only --prompt and listing paths released.
 */
export function wireLockRelease(lock: ProjectLock, hooks: ProcessHooks): void {
  hooks.onExit(() => lock.release());
  hooks.onSignal(() => {
    lock.release();
    hooks.exit(130);
  });
}

export const HELP_TEXT = `madv-agent v0 (stage N1) — model client, streaming, credential path

usage:
  madv-agent [--project <dir>]                full-screen TUI session
  madv-agent --prompt <text> [--project <dir>]  one scripted turn (headless)
  madv-agent --resume <id> [--project <dir>]  resume a session from its events
  madv-agent --resume [--project <dir>]       list this project's sessions

options:
  --project <dir>   project directory (default: current directory)
  --resume <id>     resume session <id>; the transcript is rebuilt from
                    .madv-agent/sessions/<id>/events.jsonl alone
  --resume          list the project's sessions
  --prompt <text>   run one scripted turn against the madmik3 proxy and exit
  --help            show this text

credential path:
  The agent holds ONLY the proxy base URL (MADV_AGENT_PROXY_URL, default
  http://127.0.0.1:14933). The environment is scrubbed to an allowlist at
  entry; provider keys, GitHub tokens, and proxy variables are dropped by
  name, and the dropped names are recorded as a session event. The proxy
  holds the provider key; if it is unreachable the agent refuses — never a
  fallback, never a silent degrade.`;

export interface CliExit {
  code: number;
}

/** Run the CLI. Returns the process exit code. */
export async function runCli(io: CliIo): Promise<CliExit> {
  let parsed: ParsedArgs;
  try {
    parsed = parseArgs(io.argv);
  } catch (err) {
    io.stderr(`madv-agent: ${err instanceof Error ? err.message : String(err)}`);
    io.stderr(HELP_TEXT);
    return { code: 2 };
  }
  if (parsed.help) {
    io.stdout(HELP_TEXT);
    return { code: 0 };
  }

  // ── Environment scrub: BEFORE rendering or any call (design §6). ──
  const scrub = scrubProcessEnvironment(io.env);
  for (const name of scrub.dropped) io.deleteEnv(name);

  const projectDir = resolve(io.cwd, parsed.projectDir ?? ".");
  const projectName = projectDir.split("/").pop() ?? projectDir;

  // ── Proxy URL: loopback only, resolved before anything else touches it. ──
  let proxyUrl: string;
  try {
    proxyUrl = resolveProxyUrl(scrub.kept);
  } catch (err) {
    io.stderr(`madv-agent: ${err instanceof Error ? err.message : String(err)}`);
    return { code: 2 };
  }

  // ── One active session per project. ──
  let lock;
  try {
    lock = acquireProjectLock(projectDir);
  } catch (err) {
    io.stderr(`madv-agent: ${err instanceof Error ? err.message : String(err)}`);
    return { code: 3 };
  }

  try {
    // ── --resume alone: list sessions and exit. ──
    if (parsed.resumeId === null) {
      const sessions = listSessions(projectDir);
      if (sessions.length === 0) {
        io.stdout(`no sessions in ${projectDir}`);
      } else {
        io.stdout(`sessions in ${projectDir}:`);
        for (const s of sessions) {
          const integrity = s.chainOk ? "ok" : "BROKEN CHAIN";
          io.stdout(
            `  ${s.id}  events=${s.eventCount}  tail=${s.lastHash.slice(0, 12)}  chain=${integrity}` +
              (s.lastTs ? `  last=${s.lastTs}` : ""),
          );
        }
      }
      return { code: 0 };
    }

    // ── Open or resume. ──
    let sessionId: string;
    let initialTranscript: ReturnType<typeof reconstructTranscript>;
    let writer: ReturnType<typeof openNewSession>["writer"];
    if (parsed.resumeId !== undefined) {
      let resumed;
      try {
        resumed = openSessionForResume(projectDir, parsed.resumeId);
      } catch (err) {
        io.stderr(`madv-agent: ${err instanceof Error ? err.message : String(err)}`);
        // F2: release the lock on failed resume before returning
        lock.release();
        return { code: 4 };
      }
      sessionId = resumed.id;
      initialTranscript = reconstructTranscript(resumed.preexisting);
      writer = resumed.writer;
    } else {
      const opened = openNewSession(projectDir, scrub, {
        pid: process.pid,
        argv: io.argv,
      });
      sessionId = opened.id;
      initialTranscript = [];
      writer = opened.writer;
    }

    // ── --prompt <text>: one scripted headless turn (bite-proof path). ──
    if (parsed.prompt !== undefined) {
      io.stdout(`session ${sessionId} · project ${projectName} · proxy ${proxyUrl}`);
      io.stdout(`scrubbed ${scrub.dropped.length} environment variable(s): ${scrub.dropped.join(", ") || "(none)"}`);
      try {
        const result = await runTurn(writer, parsed.prompt, {
          proxyUrl,
          projectDir,
          ...(parsed.maxRounds === undefined ? {} : { maxRounds: parsed.maxRounds }),
          // N3: the CLI path asks on the terminal, one invocation at a time,
          // unless a caller injected an approver (tests do).
          approver: io.approver ?? terminalApprover(),
          onDelta: (delta) => {
            // Live: deltas go out as they arrive, sanitised — model output is
            // not a trusted source for terminal control sequences (N4).
            io.stdout(sanitizeStream(delta));
          },
          onToolEvent: (e) => {
            const verdict = e.granted === undefined ? "" : e.granted ? " [approved]" : " [DENIED]";
            // N4: the summary carries model-authored argument text.
            io.stderr(`\n· ${sanitizeForDisplay(e.type, 40)} ${sanitizeForDisplay(e.tool, 60)}: ${sanitizeForDisplay(e.summary)}${verdict}\n`);
          },
        });
        io.stdout(""); // newline after the streamed deltas
        io.stdout(`[assistant · model ${result.model ?? "unknown"} · ${result.content.length} chars · event seq ${result.assistantEvent.seq}]`);
        io.stdout(`tail ${writer.tailHash()}`);
        return { code: 0 };
      } catch (err) {
        if (err instanceof ProxyRefusedError) {
          io.stderr(`madv-agent: REFUSED — ${err.message}`);
          return { code: 5 };
        }
        if (err instanceof ProxyRequestError) {
          // D4: a mid-stream failure (e.g. a malformed SSE frame) is an
          // explicit error — recorded as a stream_error event by runTurn and
          // surfaced here. Never a silent partial success.
          io.stderr(`madv-agent: STREAM ERROR — ${err.message}`);
          return { code: 6 };
        }
        throw err;
      }
    }

    // ── Full-screen TUI. Imported lazily so headless modes never load it. ──
    // D3: the lock is released on EVERY exit path — normal TUI return,
    // process.exit from onExit, SIGINT/SIGTERM — via the exit wiring below.
    // The finally above deliberately does NOT release on this path: when
    // runCli returns here the TUI is (or may still be) live.
    wireLockRelease(lock, io.processHooks ?? REAL_PROCESS_HOOKS);
    const lines = initialTranscript.map((m) => ({
      kind: m.role,
      text: m.content,
    }));
    const bootstrap: TuiBootstrap = {
      projectDirName: projectName,
      sessionId,
      initialLines: lines,
      initialTailHash: writer.tailHash(),
      scrubCount: scrub.dropped.length,
      runTurn: (userText, onDelta) =>
        runTurn(writer, userText, {
          proxyUrl,
          projectDir,
          // N3: reads work in the TUI; anything needing approval is refused
          // until the interactive dialog lands (N4). No silent auto-approve.
          ...(io.approver === undefined ? {} : { approver: io.approver }),
          onDelta,
        }),
      onExit: () => {
        // The exit wiring (registered above) releases the lock; exiting
        // runs it. This branch covers both the Ctrl+C route and a renderer
        // that finishes on its own.
        process.exit(0);
      },
    };
    if (io.tui !== undefined) {
      await io.tui(bootstrap);
    } else {
      const { runTui } = await import("./tui/main");
      await runTui(bootstrap);
    }
    return { code: 0 };
  } finally {
    // Headless paths (--prompt, listing) release here. The TUI path is
    // covered by wireLockRelease on every exit path instead.
    // F2: also release on failed resume path (when resumeId !== undefined but failed)
    if (parsed.prompt !== undefined || parsed.resumeId === null) {
      lock.release();
    }
  }
}

// Re-verified event read is available to tests through this module.
export { verifyChain, readEvents };

if (import.meta.main) {
  runCli({
    env: process.env,
    cwd: process.cwd(),
    argv: process.argv.slice(2),
    stdout: (t) => process.stdout.write(t + "\n"),
    stderr: (t) => process.stderr.write(t + "\n"),
    deleteEnv: (name) => {
      delete process.env[name];
    },
  })
    .then(({ code }) => {
      if (code !== 0) process.exitCode = code;
    })
    .catch((err: unknown) => {
      process.stderr.write(`madv-agent: fatal: ${err instanceof Error ? err.message : String(err)}\n`);
      process.exit(1);
    });
}
