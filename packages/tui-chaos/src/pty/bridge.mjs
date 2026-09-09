// packages/tui-chaos/src/pty/bridge.mjs
// Node-side PTY bridge for the tui-chaos harness.
//
// WHY THIS EXISTS: node-pty's native addon does not deliver data/exit events
// under the Bun runtime (verified 2026-09: spawn succeeds, events never fire).
// Under Node it works. The harness CLI runs under Bun (matching the repo
// toolchain), so the PTY transport is isolated in this small Node subprocess
// that speaks a JSON-lines protocol over stdio.
//
// This bridge parents ONLY the TUI process under test. It is not a daemon:
// it exits when its stdin closes or when it receives {"op":"close"}. It
// creates no sockets, no setsid, no PGID manipulation — it is the harness's
// own PTY, the same thing a terminal emulator would be.
//
// Protocol (one JSON object per line):
//   harness -> bridge:
//     {"op":"spawn","file":str,"args":[...],"cwd":str,"env":{...},"cols":n,"rows":n}
//     {"op":"write","data":<base64>}
//     {"op":"resize","cols":n,"rows":n}
//     {"op":"kill","signal":"SIGTERM"}
//     {"op":"close"}            // kill child if alive, then exit
//   bridge -> harness:
//     {"ev":"spawned","pid":n}
//     {"ev":"data","data":<base64>}
//     {"ev":"exit","exitCode":n|null,"signal":str|null}
//     {"ev":"error","message":str}        // spawn-time or op-time failure
//     {"ev":"closed"}                     // bridge acknowledged close op

import { spawn as nodeSpawn } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

// node-pty must be resolvable from this file's location (workspace hoists it
// to the repo-root node_modules).
let nodePty = null;
try {
  nodePty = (await import("node-pty")).default ?? (await import("node-pty"));
} catch (err) {
  process.stdout.write(
    JSON.stringify({
      ev: "error",
      message: `node-pty not loadable by bridge: ${err && err.message}`,
    }) + "\n",
  );
  process.exit(1);
}

// node-pty 1.1.0 ships its macOS spawn-helper without the executable bit
// (prebuilds/darwin-*/spawn-helper is -rw-r--r--), which makes every spawn
// fail with "posix_spawnp failed". Repair it here so the fix travels with
// the harness instead of relying on a manual chmod after install.
function repairSpawnHelper() {
  try {
    const require = createRequire(import.meta.url);
    const pkgRoot = path.join(
      path.dirname(require.resolve("node-pty/package.json")),
      "prebuilds",
    );
    const candidates = [pkgRoot];
    for (const dir of candidates) {
      if (!fs.existsSync(dir)) continue;
      for (const entry of fs.readdirSync(dir)) {
        if (!entry.startsWith("darwin-")) continue;
        const helper = path.join(dir, entry, "spawn-helper");
        if (fs.existsSync(helper)) {
          const st = fs.statSync(helper);
          if (!(st.mode & 0o111)) fs.chmodSync(helper, 0o755);
        }
      }
    }
  } catch {
    // Best effort — a failed repair surfaces as the usual spawn error below.
  }
}

let term = null;
let exited = false;

function send(obj) {
  try {
    process.stdout.write(JSON.stringify(obj) + "\n");
  } catch {
    // Harness went away; stdin close will end us.
  }
}

function killChild(signal) {
  if (term && !exited) {
    try {
      term.kill(signal ?? "SIGTERM");
    } catch {
      // Already dead.
    }
  }
}

process.stdin.setEncoding("utf8");
let buffer = "";

function handleLine(line) {
  const trimmed = line.trim();
  if (trimmed.length === 0) return;
  let msg;
  try {
    msg = JSON.parse(trimmed);
  } catch (err) {
    send({ ev: "error", message: `unparseable line: ${err && err.message}` });
    return;
  }

  switch (msg.op) {
    case "spawn": {
      repairSpawnHelper();
      const env = msg.env ?? {};
      try {
        term = nodePty.spawn(msg.file, msg.args ?? [], {
          name: msg.name ?? "xterm-256color",
          cols: msg.cols ?? 120,
          rows: msg.rows ?? 40,
          cwd: msg.cwd ?? process.cwd(),
          env,
        });
      } catch (err) {
        send({
          ev: "error",
          message: `spawn failed: ${err && err.message}`,
        });
        return;
      }
      send({ ev: "spawned", pid: term.pid });
      term.onData((data) => {
        send({ ev: "data", data: Buffer.from(data, "utf8").toString("base64") });
      });
      term.onExit(({ exitCode, signal }) => {
        exited = true;
        send({ ev: "exit", exitCode, signal });
      });
      return;
    }
    case "write": {
      if (!term || exited) {
        send({ ev: "error", message: "write before spawn or after exit" });
        return;
      }
      term.write(Buffer.from(msg.data, "base64").toString("utf8"));
      return;
    }
    case "resize": {
      if (!term || exited) return;
      try {
        term.resize(msg.cols, msg.rows);
      } catch (err) {
        send({ ev: "error", message: `resize failed: ${err && err.message}` });
      }
      return;
    }
    case "kill": {
      killChild(msg.signal);
      return;
    }
    case "close": {
      killChild("SIGKILL");
      send({ ev: "closed" });
      setTimeout(() => process.exit(0), 200);
      return;
    }
    case "ping": {
      send({ ev: "pong" });
      return;
    }
    default:
      send({ ev: "error", message: `unknown op: ${String(msg.op)}` });
  }
}

process.stdin.on("data", (chunk) => {
  buffer += chunk;
  let idx;
  while ((idx = buffer.indexOf("\n")) >= 0) {
    const line = buffer.slice(0, idx);
    buffer = buffer.slice(idx + 1);
    handleLine(line);
  }
});

process.stdin.on("end", () => {
  // Harness died or closed its pipe: fail-closed — take the TUI down with us.
  killChild("SIGKILL");
  setTimeout(() => process.exit(0), 200);
});
