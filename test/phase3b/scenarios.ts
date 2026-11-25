import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Ledger } from "@madventures/ledger";
import { composeLiveSession, createStartAttesters } from "../../apps/madbridge/src/tui/live/composition";
import { runPurePreflight, runLiveTransactionalBuild } from "../../packages/supervisor/src/index";
import { closeOfflineBuild, offlineStart } from "./offline";
import { offlinePreflight } from "./preflight-input";

type Scenario = "healthy" | "barrier" | "attestation" | "fallback" | "madv-auth" | "cancel" | "user" | "managed" | "project" | "local";
function prepare(mode: Scenario) {
  const f = offlineStart();
  try {
    const source = readFileSync(new URL("./stand-in.ts", import.meta.url), "utf8");
    const interpreter = "'" + process.execPath.replaceAll("'", "'\\''") + "'";
    const bootstrap = ["#!/bin/sh", 'cd "${0%/*}/../work" || exit 2',
      'if [ -t 0 ]; then printf "%s\\n" "$$" > "$0.pid" || exit 2; fi',
      'exec ' + interpreter + ' --no-env-file "$0.ts" "$@"', ""].join("\n");
    for (const child of f.plan.executions) {
      writeFileSync(child.executablePath + ".ts", source);
      writeFileSync(child.executablePath, bootstrap);
    }
    writeFileSync(join(f.root, "scenario"), mode);
    const path = join(f.root, "trace");
    writeFileSync(path, "");
    return { ...f, input: offlinePreflight(f), trace: () => readFileSync(path, "utf8"),
      note: (text: string) => appendFileSync(path, text + "\n") };
  } catch (error) { f.dispose(); throw error; }
}

async function until(predicate: () => boolean | Promise<boolean>): Promise<void> {
  const deadline = performance.now() + 5000;
  while (!(await predicate())) {
    if (performance.now() >= deadline) throw new Error("offline observation deadline");
    await Bun.sleep(5);
  }
}

export async function runOfflineScenario(mode: Scenario) {
  const f = prepare(mode);
  const controller = new AbortController();
  let finished = false;
  try {
    if (mode === "barrier") writeFileSync(join(f.storageRootOverride, "sessions"), "synthetic obstruction");
    if (mode === "user" || mode === "managed" || mode === "project" || mode === "local") {
      const projectFolder = join(f.work, ".claude");
      mkdirSync(projectFolder);
      const files = {
        user: join(f.config, "settings.json"), managed: join(f.managed, "managed-settings.json"),
        project: join(projectFolder, "settings.json"), local: join(projectFolder, "settings.local.json"),
      };
      writeFileSync(files[mode], '{"unlisted":true}');
    }
    const cancel = mode === "cancel" ? until(() => finished || f.trace().includes("claude-code attestation write"))
      .then(() => { if (!finished) controller.abort(); }) : Promise.resolve();
    let reason = "", presented = false, activated = false;
    let outcome;
    try {
      outcome = await composeLiveSession({ envelope: f.envelope, preflight: { ...f.input, signal: controller.signal },
        workingDirectory: f.work, configFolder: f.config, managedFolder: f.managed, present: async client => {
          const snapshot = await client.getSnapshot();
          presented = true;
          activated = snapshot.phase === "active" && snapshot.executions?.length === 2 &&
            snapshot.executions.every(e => e.state === "ready") && snapshot.eventLog.some(e => e.type === "session_activated");
          f.note("present " + snapshot.phase);
          if (mode === "fallback" || mode === "madv-auth") {
            writeFileSync(join(f.root, "release-monitor"), "");
            await until(async () => (await client.getSnapshot()).phase === "closed");
            const ledger = new Ledger(join(f.storageRootOverride, "sessions", snapshot.sessionId, "ledger", "ledger.sqlite3"));
            try {
              const row = ledger.readAfter(0).map(r => JSON.parse(r.event_json)).find(event => event.event_type === "session_interrupted");
              reason = row?.reason_code ?? "";
              f.note("session_interrupted " + reason);
            } finally { ledger.close(); }
          }
        } });
    } finally { finished = true; await cancel; }
    if (outcome.exitCode === 0) await outcome.close();
    const component = outcome.exitCode === 1 ? outcome.component : "";
    const detail = outcome.exitCode === 1 ? outcome.detail : "";
    f.note("exit " + outcome.exitCode + (component ? " " + component + " " + detail : ""));
    const groupEnded = (surface: string) => {
      const file = join(f.bin, (surface === "claude-code" ? "madbridge-claude-v5" : "madv-surface") + ".pid");
      if (!existsSync(file)) return false;
      const pid = Number(readFileSync(file, "utf8"));
      if (!Number.isSafeInteger(pid) || pid <= 1) throw new Error("invalid stand-in pid");
      try { process.kill(-pid, 0); return false; } catch (e) { return (e as NodeJS.ErrnoException).code === "ESRCH"; }
    };
    return { trace: f.trace(), code: outcome.exitCode, component, detail, presented, activated, reason,
      groupsEnded: groupEnded("claude-code") && groupEnded("madv-surface") };
  } finally { f.dispose(); }
}

export async function repeatInstalledAttester(target: string) {
  const f = prepare("healthy");
  try {
    const preflight = await runPurePreflight(f.input);
    if (!preflight.ok) throw new Error("offline probe failure " + preflight.failure);
    const installed = createStartAttesters();
    const build = await runLiveTransactionalBuild({ sessionId: "offline-budget", envelope: f.envelope,
      plan: preflight.plan, signal: f.input.signal, attesterFor: surface => {
        const attest = installed(surface);
        if (!attest || surface !== target) return attest;
        return async input => {
          const first = await attest(input);
          if (!first.ok) return first;
          return attest(input);
        };
      } });
    try { return { detail: build.ok ? "unexpected success" : build.detail, trace: f.trace() }; }
    finally { await closeOfflineBuild(build); }
  } finally { f.dispose(); }
}

export async function runStartupSignal(signal: "SIGINT" | "SIGTERM") {
  const f = prepare("cancel");
  const controller = new AbortController();
  const listenerCounts = () => ({
    SIGINT: process.listenerCount("SIGINT"),
    SIGTERM: process.listenerCount("SIGTERM"),
  });
  const before = listenerCounts();
  let presented = false;
  try {
    const starting = composeLiveSession({
      envelope: f.envelope, preflight: { ...f.input, signal: controller.signal },
      workingDirectory: f.work, configFolder: f.config, managedFolder: f.managed,
      present() { presented = true; },
    });
    // Composition installs its once listener synchronously before preflight.
    const installed = process.listeners(signal);
    let countAtRaise = 0, soleCompositionListener = false, emitted = false;
    let outcome;
    try {
      await until(() => f.trace().includes("claude-code attestation write"));
      const listeners = process.listeners(signal);
      countAtRaise = listeners.length;
      soleCompositionListener = before[signal] === 0 && installed.length === 1 &&
        countAtRaise === 1 && listeners[0] === installed[0];
      if (soleCompositionListener) emitted = process.emit(signal, signal);
    } finally {
      // A missing or foreign listener must not receive a synthetic signal.
      if (!emitted) controller.abort();
      outcome = await starting;
      if (outcome.exitCode === 0) await outcome.close();
    }
    const after = listenerCounts();
    const groupsEnded = ["madbridge-claude-v5", "madv-surface"].every(executable => {
      const file = join(f.bin, executable + ".pid");
      if (!existsSync(file)) return false;
      const pid = Number(readFileSync(file, "utf8"));
      if (!Number.isSafeInteger(pid) || pid <= 1) throw new Error("invalid stand-in pid");
      try { process.kill(-pid, 0); return false; }
      catch (error) { return (error as NodeJS.ErrnoException).code === "ESRCH"; }
    });
    return { before, countAtRaise, soleCompositionListener, emitted, after, presented, groupsEnded,
      code: outcome.exitCode, detail: outcome.exitCode === 1 ? outcome.detail : "" };
  } finally { f.dispose(); }
}
