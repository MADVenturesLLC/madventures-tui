import type { BrokerClient } from "@madventures/broker";
import { parseTaskEnvelope, type TaskEnvelopeV1 } from "@madventures/protocol";
import { attestClaudeSession } from "@madventures/adapter-claude-code";
import { attestMadvSession } from "../../../../../packages/adapter-madv-surface/src/index";
import { rollbackBuild, runLiveTransactionalBuild, runPurePreflight, type LiveBuildInput,
  type PartialBuildState, type PreflightInput } from "../../../../../packages/supervisor/src/index";
import { settingsSources } from "./settings-sources";

interface Start {
  envelope: TaskEnvelopeV1;
  preflight: Omit<PreflightInput, "envelope" | "settingsSources">;
  workingDirectory: string;
  configFolder: string;
  managedFolder?: string;
  present(client: BrokerClient): void | Promise<void>;
}
type Result = { exitCode: 0; close(): Promise<void> } | { exitCode: 1; component: string; detail: string };

function failed(component: string, detail: string = component): Result {
  return { exitCode: 1, component, detail };
}

// The registered identity and auth probes have both passed when the build
// asks for an attester. Count each subsequent write before sending its frame.
function writeBudget(): () => boolean {
  let calls = 2;
  return () => {
    if (calls >= 3) return false;
    calls++;
    return true;
  };
}

export function createStartAttesters(): LiveBuildInput["attesterFor"] {
  const claudeBudget = writeBudget(), madvBudget = writeBudget();
  return surface => {
    if (surface === "claude-code") return input => attestClaudeSession(input, claudeBudget);
    if (surface === "madv-surface") return input => attestMadvSession(input, madvBudget);
    return undefined;
  };
}

async function closeActive(state: PartialBuildState): Promise<void> {
  const phase = (await state.client!.getSnapshot()).phase;
  if (phase === "active" || phase === "paused") await state.broker!.founderClose(crypto.randomUUID());
  for (const host of state.hosts) {
    for await (const _ of host.handle.facts()) { /* Wait for host exit before releasing the ledger. */ }
  }
  for (const adapter of state.adapters) await adapter.disconnect();
  await state.client!.close();
  state.ledger!.close();
}

export async function composeLiveSession(start: Start): Promise<Result> {
  const sources = settingsSources(start.workingDirectory, start.configFolder, start.managedFolder, process.platform);
  if (!sources.ok) return failed(sources.cause);
  let envelope: TaskEnvelopeV1;
  try { envelope = parseTaskEnvelope(structuredClone({ ...start.envelope })); }
  catch { return failed("preflight", "envelope_invalid"); }
  const controller = new AbortController();
  const abort = () => controller.abort();
  const caller = start.preflight.signal;
  caller.addEventListener("abort", abort, { once: true });
  process.once("SIGINT", abort);
  process.once("SIGTERM", abort);
  if (caller.aborted) abort();

  try {
    const preflight = await runPurePreflight({ ...start.preflight, envelope: { ...envelope },
      settingsSources: sources.paths, signal: controller.signal });
    if (!preflight.ok) return failed("preflight", preflight.failure);
    const built = await runLiveTransactionalBuild({ sessionId: crypto.randomUUID(), envelope, plan: preflight.plan,
      signal: controller.signal, attesterFor: createStartAttesters() });
    if (!built.ok) {
      await rollbackBuild(built.partialState);
      return failed(built.failedStep, built.detail);
    }
    let closing: Promise<void> | undefined;
    const close = () => closing ??= closeActive(built.state);
    if (!built.state.client || built.snapshot.phase !== "active") {
      await close();
      return failed("activate");
    }
    try { await start.present(built.state.client); }
    catch { await close(); return failed("present"); }
    return { exitCode: 0, close };
  } finally {
    caller.removeEventListener("abort", abort);
    process.removeListener("SIGINT", abort);
    process.removeListener("SIGTERM", abort);
  }
}
