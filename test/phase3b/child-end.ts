import { join } from "node:path";
import type { BrokerClient } from "@madventures/broker";
import { Ledger } from "@madventures/ledger";
import { attestMadvSession } from "../../packages/adapter-madv-surface/src/index";
import { createStartAttesters, composeLiveSession } from "../../apps/madbridge/src/tui/live/composition";
import { runLiveTransactionalBuild, runPurePreflight } from "../../packages/supervisor/src/index";
import { closeOfflineBuild } from "./offline";
import { prepareM2 } from "./m2-offline";
import type { End, Surface } from "./end-stand-in";

export const surfaces = ["claude-code", "madv-surface"] as const;
export const activeCases = [
  ["claude-code", "clean exit", "child_exited", "child_failure"],
  ["claude-code", "host end", "host_exited", "pty_host_failure"],
  ["claude-code", "nonzero exit", "child_exited", "child_failure"],
  ["claude-code", "signalled exit", "child_exited", "child_failure"],
  ["claude-code", "malformed partial line", "attestation_malformed", "identity_mismatch"],
  ["madv-surface", "clean exit", "child_exited", "child_failure"],
  ["madv-surface", "host end", "host_exited", "pty_host_failure"],
  ["madv-surface", "nonzero exit", "provider_error", "adapter_failure"],
  ["madv-surface", "malformed partial line", "identity_mismatch", "identity_mismatch"],
  ["madv-surface", "pending request", "identity_unavailable", "identity_mismatch"],
  ["madv-surface", "open tool", "identity_mismatch", "identity_mismatch"],
] as const;

async function until(finished: () => boolean | Promise<boolean>) {
  const deadline = performance.now() + 5000;
  while (!await finished()) {
    if (performance.now() >= deadline) throw new Error("offline observation deadline");
    await Bun.sleep(10);
  }
}

function readClosure(root: string, id: string) {
  const ledger = new Ledger(join(root, "sessions", id, "ledger", "ledger.sqlite3"));
  try {
    const rows = ledger.readAfter(0).map(row => JSON.parse(row.event_json));
    return {
      interrupted: rows.filter(row => row.event_type === "session_interrupted")
        .map(row => ({ reason: String(row.reason_code), detail: String(row.payload.reason) })),
      closed: rows.find(row => row.event_type === "session_closed")?.payload.closure_kind ?? null,
    };
  } finally { ledger.close(); }
}

export async function observeChildEnd(surface: Surface, before: boolean, end: End) {
  const f = prepareM2(surface, before, end);
  let phase = "", id = "", component = "", detail = "";
  try {
    async function observeActive(client: BrokerClient, send?: (text: string) => boolean) {
      const active = await client.getSnapshot();
      phase = active.phase;
      id = active.sessionId;
      if (before || end === "Founder close") return;
      if (end === "pending request" || end === "open tool") {
        if (!send?.("synthetic request")) throw new Error("offline request refused");
      }
      f.release();
      await until(async () => (await client.getSnapshot()).phase === "closed");
    }

    if ((surface === "madv-surface" && before) || end === "pending request" || end === "open tool") {
      const preflight = await runPurePreflight(f.input);
      if (!preflight.ok) throw new Error("offline preflight failed");
      const installed = createStartAttesters();
      let send: ((text: string) => boolean) | undefined;
      const build = await runLiveTransactionalBuild({ sessionId: "offline-child-end", envelope: f.envelope,
        plan: preflight.plan, signal: f.input.signal, attesterFor: name => {
          if (name !== "madv-surface") return installed(name);
          return async input => {
            let reported = false;
            const verdict = await attestMadvSession({ ...input, reportFailure(cause) {
              input.reportFailure(cause);
              reported = true;
            } });
            if (verdict.ok) {
              send = verdict.sendUserInput;
              if (before) {
                f.release();
                await until(() => reported);
              }
            }
            return verdict;
          };
        } });
      try {
        if (build.ok) await observeActive(build.state.client!, send);
        else { component = build.failedStep; detail = build.detail; }
      } finally { await closeOfflineBuild(build); }
    } else {
      const built = await composeLiveSession({ ...f.start, present: client => observeActive(client) });
      if (built.exitCode === 0) await built.close();
      else { component = built.component; detail = built.detail; }
    }
    const closure = id ? readClosure(f.storageRootOverride, id) : { interrupted: [], closed: null };
    return { surface, before, end, phase, component, detail, ...closure };
  } finally { f.dispose(); }
}
