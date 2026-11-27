import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { createInterface } from "node:readline";

export type Surface = "claude-code" | "madv-surface";
export type End = "clean exit" | "host end" | "nonzero exit" | "signalled exit" |
  "malformed partial line" | "pending request" | "open tool" | "Founder close";

export function attestationEvents(surface: Surface, model: string) {
  const stamp = { session_id: "offline-wire", ts: "2026-11-23T00:00:00.000Z" };
  const result = { ...stamp, type: "result", subtype: "success", is_error: false };
  if (surface === "claude-code") return [
    { ...stamp, type: "system", subtype: "init", model, claude_code_version: "2.1.325" },
    { ...stamp, type: "assistant", message: { id: "offline-message", model, content: [{ type: "text", text: model }] } },
    { ...result, num_turns: 1, modelUsage: { [model]: { canonicalModel: model, provider: "firstParty" } } },
  ];
  const identity = { provider: "minimax", profile: "minimax", endpoint_host: "api.minimax.io" };
  return [
    { ...stamp, ...identity, type: "system", subtype: "init", surface, surface_version: "0.1.2", requested_model: model },
    { ...stamp, ...identity, type: "model_response", response_model: model, response_id: "offline-response",
      response_independence_domain: "minimax", tls_verified_host: "api.minimax.io" },
    { ...stamp, type: "assistant", response_model: model }, result,
  ];
}

async function run() {
  const executable = process.argv[1]!.replace(/\.launch\.ts$/, "");
  const root = dirname(dirname(executable));
  // Only the private TTY launch takes a fault. All probes use the M1 stand-in.
  if (!process.stdin.isTTY || process.cwd() !== join(root, "work") || !existsSync(join(root, "m2-case.json"))) {
    throw new Error("expected private offline launch");
  }
  const surface: Surface = basename(executable) === "madbridge-claude-v5" ? "claude-code" : "madv-surface";
  const scenario: { surface: Surface; before: boolean; end: End } =
    JSON.parse(readFileSync(join(root, "m2-case.json"), "utf8"));
  const model = process.argv[process.argv.indexOf("--model") + 1]!;
  const events = attestationEvents(surface, model);
  const emit = (...items: unknown[]) => writeFileSync(1, items.map(e => JSON.stringify(e) + "\n").join(""));
  const release = join(root, "release-end");
  const parent = process.ppid;
  process.on("SIGTERM", () => process.exit(0));

  let attested = false;
  for await (const line of createInterface({ input: process.stdin })) {
    const frame = JSON.parse(line);
    if (attested) continue;
    if (frame.message.content !== "Reply with your model identifier and nothing else." ||
      (surface === "madv-surface" ? frame.no_tools !== true : frame.no_tools !== undefined)) process.exit(2);
    if (scenario.before && scenario.surface === "claude-code" && surface === "madv-surface") {
      // The second attestation supplies a window after the first handover.
      writeFileSync(release, "");
      await Bun.sleep(1200);
    }
    emit(...events);
    attested = true;
    if (surface !== scenario.surface || scenario.end === "Founder close") continue;
    while (!existsSync(release)) await Bun.sleep(5);
    if (scenario.end !== "host end") {
      // The macOS host queries the state of its one child through PATH.
      // Establish a kernel-parentage witness before taking the fault.
      Bun.spawn([process.execPath, "--no-env-file", process.argv[1]!, "--witness", String(process.pid)], {
        cwd: join(root, "work"), detached: true, stdin: "ignore", stdout: "ignore", stderr: "ignore",
        env: { HOME: root, TMPDIR: join(root, "temp"), PATH: join(root, "bin") },
      }).unref();
      const deadline = performance.now() + 2000;
      while (!existsSync(join(root, "watching-" + process.pid))) {
        if (performance.now() >= deadline) throw new Error("offline exit witness unavailable");
        await Bun.sleep(5);
      }
    }
    switch (scenario.end) {
      case "host end":
        // This stand-in is the exec'd child of its private PTY host. Never
        // signal an adopted parent or a parent that changed since launch.
        if (parent <= 1 || process.ppid !== parent) throw new Error("offline host identity changed");
        process.kill(parent, "SIGKILL");
        break;
      case "nonzero exit": process.exit(1);
      case "signalled exit": process.kill(process.pid, "SIGKILL"); break;
      case "malformed partial line": writeFileSync(1, '{"type":'); break;
      case "open tool":
        emit(events[1], { session_id: "offline-wire", ts: "2026-11-23T00:00:00.000Z",
          type: "tool_use", tool_use_id: "offline-tool", name: "synthetic" });
        break;
    }
    process.exit(0);
  }
}

if (import.meta.main) {
  const root = dirname(dirname(process.argv[1]!));
  if (process.argv[2] === "--witness") {
    const owner = Number(process.argv[3]);
    if (!Number.isSafeInteger(owner) || owner <= 1 || process.ppid !== owner) process.exit(1);
    writeFileSync(join(root, "watching-" + owner), "");
    const deadline = performance.now() + 3000;
    while (process.ppid === owner) {
      if (performance.now() >= deadline) process.exit(1);
      await Bun.sleep(5);
    }
    writeFileSync(join(root, "ended-" + owner), "");
  } else if (basename(process.argv[1]!) === "ps.ts") {
    // A reparented witness proves its original parent is no longer running.
    // Report only that property for a known child. Never enumerate processes.
    const [format, field, selector, pid, ...rest] = process.argv.slice(2);
    if (format !== "-o" || field !== "state=" || selector !== "-p" || rest.length ||
      !pid || !/^[1-9][0-9]*$/.test(pid) || !existsSync(join(root, "watching-" + pid))) process.exit(1);
    const deadline = performance.now() + 1500;
    while (!existsSync(join(root, "ended-" + pid))) {
      if (performance.now() >= deadline) process.exit(1);
      await Bun.sleep(5);
    }
    writeFileSync(1, "Z\n");
  } else await run();
}
