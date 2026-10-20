// apps/madv-agent/src/tools/index.ts
// The four v0 tools (design §5) and the wire protocol the model uses to call
// them. Every tool reaches the project ONLY through policy.ts, at use time.
//
// `shell` takes an argv array and refuses to invoke a SHELL INTERPRETER (a
// name-based rule: sh/bash/zsh/…, plus `-c`). That is a guard-rail, NOT a
// sandbox — `bun -e`, `node -e`, `awk 'BEGIN{system(...)}'` and any program
// that spawns children are still expressible. `shell` runs with the user's
// authority, so it can write anywhere the user can, including the session
// stream and .git; the hard write-deny in policy.ts is a write_file rule and
// does not constrain a child process. The control for `shell` is the per-call
// approval carrying the exact argv. Confinement is a separate design stage.

import { spawnSync } from "node:child_process";
import {
  closeSync,
  constants as fsConstants,
  existsSync,
  fstatSync,
  lstatSync,
  mkdirSync,
  openSync,
  readFileSync,
  readdirSync,
  realpathSync,
  writeFileSync,
} from "node:fs";
import { dirname, isAbsolute, join, relative } from "node:path";
import { assertArgv, assertPathAtUse, PolicyRefusal } from "../policy";
import { scrubEnvironment } from "../scrub";

/**
 * The environment a child process may see: everything the agent itself has,
 * minus every name the scrub drops. `shell` is approved arbitrary execution, so
 * this is not a security boundary — it is the difference between a toolchain
 * that works and one that fails on a missing HOME. Secrets stay out because the
 * agent's own environment no longer has them and the scrub is re-applied.
 */
export function childEnvironment(
  env: Record<string, string | undefined>,
): Record<string, string> {
  // Toolchain homes are PATHS, not capabilities: without them `go`, `cargo`,
  // `npm` and `mvn` cannot find their caches and every gate the agent is asked
  // to run fails for a reason that has nothing to do with its work. They are
  // added on top of the scrubbed set, and anything that looks like a credential
  // is still refused even if a name slips into this list.
  const TOOLCHAIN = [
    "GOPATH",
    "GOMODCACHE",
    "GOCACHE",
    "GOFLAGS",
    "GOROOT",
    "CARGO_HOME",
    "RUSTUP_HOME",
    "NPM_CONFIG_CACHE",
    "NODE_PATH",
    "JAVA_HOME",
    "CC",
    "CFLAGS",
    "LDFLAGS",
  ];
  const { kept } = scrubEnvironment(env);
  const child: Record<string, string> = { ...kept };
  const secretish = /KEY|TOKEN|SECRET|PASSWORD|CREDENTIAL|AUTH/i;
  for (const name of TOOLCHAIN) {
    if (secretish.test(name)) continue;
    const value = env[name];
    if (typeof value === "string" && value.length > 0) child[name] = value;
  }
  return child;
}

export type ToolKind = "read" | "write" | "execute";

export interface ToolContext {
  projectDir: string;
}

export interface ToolOutcome {
  ok: boolean;
  /** One line for the transcript and the event stream. */
  summary: string;
  /** Bounded output returned to the model. */
  output?: string;
}

export interface ToolDef {
  name: string;
  kind: ToolKind;
  /** True when the call must be approved by a human before it runs. */
  needsApproval: boolean;
  /** One line shown in the approval dialog. */
  describe: (args: Record<string, unknown>) => string;
  run: (args: Record<string, unknown>, ctx: ToolContext) => ToolOutcome;
}

const { O_NOFOLLOW, O_RDONLY, O_WRONLY, O_CREAT, O_TRUNC } = fsConstants;
const READ_CAP = 200_000;
const OUTPUT_CAP = 16_000;
const SHELL_TIMEOUT_MS = 20_000;

function str(args: Record<string, unknown>, key: string): string {
  const v = args[key];
  if (typeof v !== "string") throw new PolicyRefusal(`refused: \`${key}\` must be a string`);
  return v;
}

function cap(text: string, limit = OUTPUT_CAP): string {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit)}\n…[truncated ${text.length - limit} chars]`;
}

export const readFileTool: ToolDef = {
  name: "read_file",
  kind: "read",
  needsApproval: false,
  describe: (a) => `read ${String(a.path ?? "")}`,
  run(args, ctx) {
    const abs = assertPathAtUse({ projectDir: ctx.projectDir, path: str(args, "path"), mode: "read" });
    // O_NOFOLLOW: the leaf is opened as itself or not at all. This closes the
    // gap between the use-time lstat and the open; the parent-directory race
    // remains and is documented as residual.
    let fd: number;
    try {
      fd = openSync(abs, O_RDONLY | O_NOFOLLOW);
    } catch (err) {
      const code = (err as NodeJS.ErrnoException).code;
      if (code === "ELOOP" || code === "EMLINK") {
        throw new PolicyRefusal(`refused: ${args.path} became a symlink — refusing to follow it`);
      }
      throw err;
    }
    let text: string;
    try {
      const st = fstatSync(fd);
      if (!st.isFile()) throw new PolicyRefusal(`refused: ${args.path} is not a regular file`);
      text = readFileSync(fd, "utf8").slice(0, READ_CAP);
    } finally {
      closeSync(fd);
    }
    return { ok: true, summary: `read ${relative(realpathSync(ctx.projectDir), abs)} (${text.length} chars)`, output: text };
  },
};

const SKIP_DIRS = new Set([".git", ".madv-agent", "node_modules", "dist", "build", ".next"]);

export const searchTool: ToolDef = {
  name: "search",
  kind: "read",
  needsApproval: false,
  describe: (a) => `search /${String(a.pattern ?? "")}/ in ${String(a.path ?? ".")}`,
  run(args, ctx) {
    const pattern = str(args, "pattern");
    const sub = typeof args.path === "string" ? args.path : ".";
    const root = assertPathAtUse({ projectDir: ctx.projectDir, path: sub, mode: "read" });
    let re: RegExp;
    try {
      re = new RegExp(pattern);
    } catch {
      throw new PolicyRefusal(`refused: ${pattern} is not a valid regular expression`);
    }

    const hits: string[] = [];
    let scanned = 0;
    const walk = (dir: string): void => {
      if (hits.length >= 200 || scanned >= 4000) return;
      let entries: string[];
      try {
        entries = readdirSync(dir);
      } catch {
        return;
      }
      for (const name of entries) {
        if (hits.length >= 200 || scanned >= 4000) return;
        if (SKIP_DIRS.has(name)) continue;
        const full = join(dir, name);
        let st;
        try {
          // B1: lstat, not stat — a symlinked directory or file inside the
          // root can point anywhere, so it is skipped rather than followed.
          st = lstatSync(full);
        } catch {
          continue;
        }
        if (st.isSymbolicLink()) continue;
        if (st.isDirectory()) {
          walk(full);
          continue;
        }
        if (!st.isFile() || st.size > 1_000_000) continue;
        // Belt and braces: the entry's real path must still be inside the root.
        try {
          const real = realpathSync(full);
          // R2: both sides resolved — on macOS the root is a symlinked /var.
          const relReal = relative(realpathSync(ctx.projectDir), real);
          if (relReal.startsWith("..") || isAbsolute(relReal)) continue;
        } catch {
          continue;
        }
        scanned += 1;
        let text: string;
        try {
          text = readFileSync(full, "utf8");
        } catch {
          continue;
        }
        text.split("\n").forEach((line, i) => {
          if (hits.length < 200 && re.test(line)) {
            hits.push(`${relative(realpathSync(ctx.projectDir), full)}:${i + 1}: ${line.slice(0, 200)}`);
          }
        });
      }
    };
    walk(root);

    return {
      ok: true,
      summary: `search /${pattern}/ → ${hits.length} hit(s) in ${scanned} file(s)`,
      output: hits.join("\n") || "(no matches)",
    };
  },
};

export const writeFileTool: ToolDef = {
  name: "write_file",
  kind: "write",
  needsApproval: true,
  describe: (a) => `write ${String(a.path ?? "")} (${String(a.content ?? "").length} chars)`,
  run(args, ctx) {
    const content = str(args, "content");
    if (content.length > READ_CAP) {
      throw new PolicyRefusal(`refused: content is ${content.length} chars, over the ${READ_CAP} cap`);
    }
    const abs = assertPathAtUse({ projectDir: ctx.projectDir, path: str(args, "path"), mode: "write" });
    // The parent must also be inside the root — creating it must not walk out.
    // Containment only (mode "read"): the write-deny above already ruled on the
    // target, and the project root itself is a legitimate parent.
    assertPathAtUse({ projectDir: ctx.projectDir, path: dirname(abs), mode: "read" });
    mkdirSync(dirname(abs), { recursive: true });
    // O_NOFOLLOW: never write through a symlink planted at the leaf.
    let fd: number;
    try {
      fd = openSync(abs, O_WRONLY | O_CREAT | O_TRUNC | O_NOFOLLOW, 0o644);
    } catch (err) {
      const code = (err as NodeJS.ErrnoException).code;
      if (code === "ELOOP" || code === "EMLINK") {
        throw new PolicyRefusal(`refused: ${args.path} became a symlink — refusing to write through it`);
      }
      throw err;
    }
    try {
      writeFileSync(fd, content, "utf8");
    } finally {
      closeSync(fd);
    }
    return {
      ok: true,
      summary: `wrote ${relative(realpathSync(ctx.projectDir), abs)} (${content.length} chars)`,
      output: `wrote ${relative(realpathSync(ctx.projectDir), abs)}`,
    };
  },
};

export const shellTool: ToolDef = {
  name: "shell",
  kind: "execute",
  needsApproval: true,
  describe: (a) => `run: ${Array.isArray(a.argv) ? a.argv.join(" ") : "(invalid argv)"}`,
  run(args, ctx) {
    const argv = assertArgv(args.argv, ctx.projectDir);
    const cwd = assertPathAtUse({ projectDir: ctx.projectDir, path: ".", mode: "read" });
    const [cmd, ...rest] = argv as [string, ...string[]];
    if (cmd === undefined) throw new PolicyRefusal("refused: shell requires argv[0]");
    const res = spawnSync(cmd, rest, {
      cwd,
      timeout: SHELL_TIMEOUT_MS,
      encoding: "utf8",
      maxBuffer: 256 * 1024,
      shell: false,
      // The child gets the agent's OWN environment, not PATH alone. Passing
      // PATH alone breaks every toolchain that needs HOME: `go vet` cannot find
      // GOMODCACHE, `cargo` cannot find its home, `npm` cannot find its cache —
      // the agent then cannot run the gates it is asked to run. The agent's
      // environment was already scrubbed at entry (design §6), and it is
      // scrubbed AGAIN here, so a variable that reappears is still dropped by
      // name before a child sees it.
      env: childEnvironment(process.env),
    });
    const stdout = res.stdout ?? "";
    const stderr = res.stderr ?? "";
    const timedOut = res.error !== undefined && (res.error as NodeJS.ErrnoException).code === "ETIMEDOUT";
    const code = res.status ?? -1;
    return {
      ok: !timedOut && code === 0,
      summary: timedOut
        ? `timed out after ${SHELL_TIMEOUT_MS}ms: ${argv.join(" ")}`
        : `exit ${code}: ${argv.join(" ")}`,
      output: cap(`$ ${argv.join(" ")}\n${stdout}${stderr ? `\n[stderr]\n${stderr}` : ""}`),
    };
  },
};

export const TOOLS: ReadonlyArray<ToolDef> = [readFileTool, searchTool, writeFileTool, shellTool];

export function toolByName(name: string): ToolDef | undefined {
  return TOOLS.find((t) => t.name === name);
}

/** The system prompt that teaches the model the wire protocol. */
export const TOOL_PROTOCOL_PROMPT = [
  "You are madv-agent, working inside a project directory.",
  "You may use exactly four tools: read_file, search, write_file, shell.",
  "To call one, reply with a fenced block and nothing else in it:",
  "```madv-tool",
  '{"tool":"read_file","args":{"path":"src/index.ts"}}',
  "```",
  "read_file: {path}. search: {pattern, path?}. write_file: {path, content}. shell: {argv: [cmd, ...args]}.",
  "shell takes an ARGV ARRAY and never a shell string; it will refuse `sh -c`.",
  "Every path must be inside the project root. write_file and shell require human approval.",
  "After a tool result you will be given the outcome; continue the task or answer.",
  "If you can answer without a tool, answer directly.",
].join("\n");

export interface ToolCall {
  tool: string;
  args: Record<string, unknown>;
}

/** Parse tool calls out of a model reply. Unknown shapes are ignored. */
export function parseToolCalls(content: string): ToolCall[] {
  const calls: ToolCall[] = [];
  const re = /```madv-tool\s*\n([\s\S]*?)```/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    const body = m[1]?.trim();
    if (!body) continue;
    try {
      const parsed = JSON.parse(body) as { tool?: unknown; args?: unknown };
      if (typeof parsed.tool !== "string") continue;
      const args =
        parsed.args !== null && typeof parsed.args === "object"
          ? (parsed.args as Record<string, unknown>)
          : {};
      calls.push({ tool: parsed.tool, args });
    } catch {
      // A malformed block is not a tool call; the model sees its own text and
      // can correct on the next turn.
    }
  }
  return calls;
}

export { existsSync };
