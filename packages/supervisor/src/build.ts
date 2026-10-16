import { join } from "node:path";
import {
  GENESIS_HASH,
  INITIAL_LIFECYCLE_STATE,
  Ledger,
  reduceLedgerEvent,
  type LedgerRow,
  type LifecyclePhase,
  type LifecycleState,
} from "@madventures/ledger";
import {
  ADAPTER_REGISTRY,
  PROTOCOL_VERSION,
  type AdapterRegistrationV1,
  type SessionLifecycleEventV1,
  type SurfaceId,
  type TaskEnvelopeV1,
} from "@madventures/protocol";
import { createSessionStorage, type SessionStorage } from "@madventures/storage";
import { issueInitialToken } from "../../broker/src/fencing";
import {
  createInProcessBrokerClient,
  type InProcessBrokerClient,
  type StampedBrokerSnapshot,
} from "../../broker/src/in-process-client";
import {
  spawnPtyHost,
  type HostLaunchDescriptor,
  type PtyHostHandle,
} from "../../broker/src/pty-host-supervisor";
import {
  RuntimeBroker,
  type GovernedProcessTerminator,
  type LifecycleObservation,
  type RuntimeBrokerDeps,
  type RuntimeBrokerSources,
} from "../../broker/src/runtime-broker";
import type { LaunchExecution, LaunchPlan } from "./preflight";

/**
 * The twelve ordered build steps of Phase 3A Milestone M21 Task 46
 * (DEC-20261014-03 B1; specification section 2.1 steps 1 to 9).
 * No TUI step exists in Phase 3A.
 */
export const BUILD_STEPS = Object.freeze([
  "storage",
  "ledger_open",
  "session_open",
  "broker",
  "client",
  "lifelines",
  "hosts",
  "children",
  "reattest",
  "adapters",
  "issue_token",
  "activate",
] as const);

export type BuildStep = (typeof BUILD_STEPS)[number];

export type BuildFailureCode =
  | "injected_failure"
  | "storage_failed"
  | "ledger_open_failed"
  | "session_open_failed"
  | "broker_failed"
  | "client_failed"
  | "lifeline_failed"
  | "host_spawn_failed"
  | "child_launch_failed"
  | "reattestation_failed"
  | "adapter_failed"
  | "issue_token_failed"
  | "activation_failed";

export interface BuildLifelineResource {
  readonly executionId: string;
  readonly descriptor: HostLaunchDescriptor;
  readonly close: () => void;
}

export interface BuildHostResource {
  readonly executionId: string;
  readonly hostPid: number;
  readonly handle: PtyHostHandle;
}

export interface BuildChildResource {
  readonly executionId: string;
  readonly hostPid: number;
  readonly childPid: number;
  readonly pgid: number;
  readonly killPgid: () => void;
}

export interface LiveReattestationInput {
  readonly executionId: string;
  readonly model: string;
  readonly provider: string;
  readonly execution: LaunchExecution;
  readonly registration: BuildSurfaceRegistration;
  readonly host: BuildHostResource;
  readonly child: BuildChildResource;
}

export type LiveReattestationResult =
  | {
      readonly ok: true;
      readonly evidenceKind: "actual_session";
      readonly provider: string;
      readonly model: string;
      readonly cliVersion?: string;
    }
  | {
      readonly ok: false;
      readonly reason: string;
      readonly evidenceKind?: "actual_session" | "configuration_only" | "unverified";
      readonly provider?: string;
      readonly model?: string;
    };

export type LiveSurfaceAttester = (
  input: LiveReattestationInput,
) => Promise<LiveReattestationResult> | LiveReattestationResult;

export interface BuildSurfaceRegistration extends AdapterRegistrationV1 {
  readonly live_attester?: LiveSurfaceAttester | null;
}

export interface LiveReattestationRecord {
  readonly executionId: string;
  readonly surface: SurfaceId;
  readonly provider: string;
  readonly model: string;
  readonly evidenceKind: "actual_session";
  readonly cliVersion: string | null;
}

export interface BuildAdapterHandle {
  readonly executionId: string;
  readonly surface: SurfaceId;
  readonly client: InProcessBrokerClient;
  readonly host: PtyHostHandle;
  readonly disconnect: () => Promise<void>;
}

export type CreatedBuildResource =
  | { readonly step: "storage"; readonly storage: SessionStorage }
  | { readonly step: "ledger_open"; readonly ledger: Ledger; readonly ledgerPath: string }
  | { readonly step: "session_open"; readonly row: LedgerRow }
  | { readonly step: "broker"; readonly broker: RuntimeBroker }
  | { readonly step: "client"; readonly client: InProcessBrokerClient }
  | { readonly step: "lifelines"; readonly lifeline: BuildLifelineResource }
  | { readonly step: "hosts"; readonly host: BuildHostResource }
  | { readonly step: "children"; readonly child: BuildChildResource }
  | { readonly step: "reattest"; readonly reattestation: LiveReattestationRecord }
  | { readonly step: "adapters"; readonly adapter: BuildAdapterHandle }
  | { readonly step: "issue_token"; readonly fencingToken: number; readonly row: LedgerRow }
  | { readonly step: "activate"; readonly row: LedgerRow };

/**
 * PartialBuildState records, in creation order, every resource the build
 * created so Task 47's rollbackBuild can consume it in reverse order
 * (DEC-20261014-03 B2 and B3 as ruled in PR 153 comment 6203414147).
 */
export interface PartialBuildState {
  readonly sessionId: string;
  readonly completedSteps: readonly BuildStep[];
  readonly resources: readonly CreatedBuildResource[];
  readonly storage: SessionStorage | null;
  readonly ledgerPath: string | null;
  readonly ledger: Ledger | null;
  readonly sessionOpenRow: LedgerRow | null;
  readonly broker: RuntimeBroker | null;
  readonly client: InProcessBrokerClient | null;
  readonly lifelines: readonly BuildLifelineResource[];
  readonly hosts: readonly BuildHostResource[];
  readonly children: readonly BuildChildResource[];
  readonly reattestations: readonly LiveReattestationRecord[];
  readonly adapters: readonly BuildAdapterHandle[];
  readonly fencingToken: number | null;
  readonly fencingTokenRow: LedgerRow | null;
  readonly fencingTokenIssued: boolean;
  readonly sessionActivatedRow: LedgerRow | null;
}

export interface BuildStepObservation {
  readonly step: BuildStep;
  readonly index: number;
  readonly phase: LifecyclePhase | null;
  readonly ledgerEventTypes: readonly string[];
  readonly activeSnapshotExposed: boolean;
}

export interface BuildInput {
  readonly sessionId: string;
  readonly envelope: TaskEnvelopeV1;
  readonly plan: LaunchPlan;
  readonly injectFailureAt?: (typeof BUILD_STEPS)[number];
  readonly registration?: (surface: SurfaceId) => BuildSurfaceRegistration | undefined;
  readonly spawnHost?: (descriptor: HostLaunchDescriptor) => PtyHostHandle;
  readonly sources?: RuntimeBrokerSources;
  readonly terminateGovernedProcesses?: GovernedProcessTerminator;
  readonly observeLifecycle?: (observation: LifecycleObservation) => void;
  readonly onStep?: (observation: BuildStepObservation) => void | Promise<void>;
  readonly childLaunchTimeoutMs?: number;
}

export type BuildResult =
  | {
      readonly ok: true;
      readonly snapshot: StampedBrokerSnapshot;
      readonly steps: readonly BuildStep[];
      readonly state: PartialBuildState;
    }
  | {
      readonly ok: false;
      readonly failedStep: BuildStep;
      readonly failure: BuildFailureCode;
      readonly detail: string;
      readonly partialState: PartialBuildState;
    };

const DEFAULT_CHILD_LAUNCH_TIMEOUT_MS = 5_000;
const lifelinesWithBind = new WeakMap<BuildLifelineResource, (fn: () => void) => void>();

function createDefaultSources(): RuntimeBrokerSources {
  let seq = 0;
  return {
    now: () => new Date().toISOString(),
    nextEventId: () => {
      seq += 1;
      return `evt-build-${seq}-${crypto.randomUUID()}`;
    },
  };
}

function replayLedgerState(ledger: Ledger): { state: LifecycleState; head: string } {
  const rows = ledger.readAfter(0);
  let state: LifecycleState = INITIAL_LIFECYCLE_STATE;
  for (const row of rows) {
    state = reduceLedgerEvent(state, JSON.parse(row.event_json));
  }
  const last = rows[rows.length - 1];
  return {
    state,
    head: last === undefined ? GENESIS_HASH : last.event_hash,
  };
}

function ledgerEventTypesOf(ledger: Ledger | null): readonly string[] {
  if (ledger === null) return Object.freeze([]);
  return Object.freeze(
    ledger
      .readAfter(0)
      .map((row) => (JSON.parse(row.event_json) as { event_type: string }).event_type),
  );
}

async function awaitChildLaunchAndReady(
  host: BuildHostResource,
  timeoutMs: number,
): Promise<{ hostPid: number; childPid: number; pgid: number }> {
  const iterator = host.handle.facts()[Symbol.asyncIterator]();
  let launchedFact: { hostPid: number; childPid: number; pgid: number } | null = null;
  let readyObserved = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const deadlinePromise = new Promise<{ kind: "timeout" }>((resolve) => {
    timer = setTimeout(() => resolve({ kind: "timeout" }), timeoutMs);
  });

  try {
    while (!readyObserved || launchedFact === null) {
      const next = await Promise.race([
        iterator.next().then((res) => ({ kind: "result" as const, res })),
        deadlinePromise,
      ]);
      if (next.kind === "timeout") {
        throw new Error(`child launch timed out for execution ${host.executionId}`);
      }
      if (next.res.done) {
        throw new Error(`host fact stream ended before ready for execution ${host.executionId}`);
      }
      const frame = next.res.value;
      if (frame.kind === "launched") {
        launchedFact = {
          hostPid: frame.hostPid,
          childPid: frame.childPid,
          pgid: frame.pgid,
        };
      } else if (frame.kind === "ready") {
        readyObserved = true;
      } else if (frame.kind === "exited") {
        throw new Error(`child exited before ready for execution ${host.executionId}`);
      }
    }
    return launchedFact;
  } finally {
    if (timer !== undefined) clearTimeout(timer);
    await iterator.return?.().catch(() => {});
  }
}

function defaultFailureCodeForStep(step: BuildStep): BuildFailureCode {
  switch (step) {
    case "storage":
      return "storage_failed";
    case "ledger_open":
      return "ledger_open_failed";
    case "session_open":
      return "session_open_failed";
    case "broker":
      return "broker_failed";
    case "client":
      return "client_failed";
    case "lifelines":
      return "lifeline_failed";
    case "hosts":
      return "host_spawn_failed";
    case "children":
      return "child_launch_failed";
    case "reattest":
      return "reattestation_failed";
    case "adapters":
      return "adapter_failed";
    case "issue_token":
      return "issue_token_failed";
    case "activate":
      return "activation_failed";
  }
}

/**
 * Execute the ordered transactional build of Phase 3A Milestone M21 Task 46.
 *
 * On failure at any step, stops immediately at that step without appending
 * session_activated, without exposing an active snapshot, and without
 * unwinding, returning PartialBuildState with every resource created in
 * creation order so Task 47's rollbackBuild can tear it down in reverse order.
 */
export async function runTransactionalBuild(input: BuildInput): Promise<BuildResult> {
  const { sessionId, envelope, plan } = input;
  const sources = input.sources ?? createDefaultSources();
  const resolveRegistration: (surface: SurfaceId) => BuildSurfaceRegistration | undefined =
    input.registration ?? ((surface: SurfaceId) => ADAPTER_REGISTRY.get(surface));
  const spawnHost = input.spawnHost ?? spawnPtyHost;
  const childLaunchTimeoutMs = input.childLaunchTimeoutMs ?? DEFAULT_CHILD_LAUNCH_TIMEOUT_MS;

  const completedSteps: BuildStep[] = [];
  const resources: CreatedBuildResource[] = [];
  let storage: SessionStorage | null = null;
  let ledgerPath: string | null = null;
  let ledger: Ledger | null = null;
  let sessionOpenRow: LedgerRow | null = null;
  let currentBroker: RuntimeBroker | null = null;
  let brokerHandle: RuntimeBroker | null = null;
  let client: InProcessBrokerClient | null = null;
  const lifelines: BuildLifelineResource[] = [];
  const hosts: BuildHostResource[] = [];
  const children: BuildChildResource[] = [];
  const reattestations: LiveReattestationRecord[] = [];
  const adapters: BuildAdapterHandle[] = [];
  let fencingToken: number | null = null;
  let fencingTokenRow: LedgerRow | null = null;
  let fencingTokenIssued = false;
  let sessionActivatedRow: LedgerRow | null = null;
  let localObservationSeq = 0;

  const snapshotPartialState = (): PartialBuildState =>
    Object.freeze({
      sessionId,
      completedSteps: Object.freeze([...completedSteps]),
      resources: Object.freeze([...resources]),
      storage,
      ledgerPath,
      ledger,
      sessionOpenRow,
      broker: brokerHandle,
      client,
      lifelines: Object.freeze([...lifelines]),
      hosts: Object.freeze([...hosts]),
      children: Object.freeze([...children]),
      reattestations: Object.freeze([...reattestations]),
      adapters: Object.freeze([...adapters]),
      fencingToken,
      fencingTokenRow,
      fencingTokenIssued,
      sessionActivatedRow,
    });

  const makeBrokerDeps = (ledgerInstance: Ledger): RuntimeBrokerDeps => ({
    ledger: ledgerInstance,
    provenance: {
      taskEnvelopeHash: envelope.envelope_hash,
      repositoryFingerprint: envelope.repository_fingerprint,
    },
    sources,
    terminateGovernedProcesses:
      input.terminateGovernedProcesses ??
      (async () => {
        for (const host of hosts) {
          try {
            host.handle.closeStdin();
          } catch {}
          try {
            host.handle.killPgid();
          } catch {}
        }
      }),
    observe: (obs) => {
      input.observeLifecycle?.(obs);
    },
  });

  const failAt = (
    step: BuildStep,
    failure: BuildFailureCode,
    detail: string,
  ): BuildResult =>
    Object.freeze({
      ok: false as const,
      failedStep: step,
      failure,
      detail,
      partialState: snapshotPartialState(),
    });

  let activeSnapshot: StampedBrokerSnapshot | null = null;

  for (let index = 0; index < BUILD_STEPS.length; index += 1) {
    const step = BUILD_STEPS[index]!;

    if (input.injectFailureAt === step) {
      return failAt(step, "injected_failure", `injected failure at step ${step}`);
    }

    try {
      switch (step) {
        case "storage": {
          storage = createSessionStorage(
            plan.storageRoot,
            sessionId,
            plan.repositoryFingerprint.root,
            plan.repositoryFingerprint.worktree,
          );
          resources.push(Object.freeze({ step: "storage", storage }));
          break;
        }

        case "ledger_open": {
          if (storage === null) {
            return failAt(step, "ledger_open_failed", "storage not initialized before ledger_open");
          }
          ledgerPath = join(storage.ledgerDir, "ledger.sqlite3");
          ledger = new Ledger(ledgerPath);
          resources.push(Object.freeze({ step: "ledger_open", ledger, ledgerPath }));
          break;
        }

        case "session_open": {
          if (ledger === null) {
            return failAt(step, "session_open_failed", "ledger not opened before session_open");
          }
          const sessionOpenEvent: SessionLifecycleEventV1 = {
            protocol_version: PROTOCOL_VERSION,
            event_id: sources.nextEventId(),
            session_id: sessionId,
            event_type: "session_open",
            actor: "madbridge",
            task_envelope_hash: envelope.envelope_hash,
            repository_fingerprint: envelope.repository_fingerprint,
            fencing_token: null,
            reason_code: null,
            created_at: sources.now(),
            previous_event_hash: GENESIS_HASH,
            payload: {
              authorization_reference: envelope.authorization_reference,
              execution_ids: envelope.executions.map((e) => e.execution_id),
            },
          };
          reduceLedgerEvent(INITIAL_LIFECYCLE_STATE, sessionOpenEvent);
          sessionOpenRow = ledger.append(sessionOpenEvent);
          resources.push(Object.freeze({ step: "session_open", row: sessionOpenRow }));
          break;
        }

        case "broker": {
          if (ledger === null) {
            return failAt(step, "broker_failed", "ledger not opened before broker construction");
          }
          const deps = makeBrokerDeps(ledger);
          currentBroker = new RuntimeBroker(deps);
          const delegate = Object.create(RuntimeBroker.prototype) as RuntimeBroker;
          Object.defineProperties(delegate, {
            snapshotSeq: {
              get: () => currentBroker!.snapshotSeq,
              enumerable: true,
            },
            snapshotProjectionInput: {
              value: () => currentBroker!.snapshotProjectionInput(),
            },
            activate: {
              value: (writer: string, readyIds: readonly string[]) =>
                currentBroker!.activate(writer, readyIds),
            },
            interrupt: {
              value: (
                reason: Parameters<RuntimeBroker["interrupt"]>[0],
                detail: Parameters<RuntimeBroker["interrupt"]>[1],
                severity: Parameters<RuntimeBroker["interrupt"]>[2],
                incidentId: Parameters<RuntimeBroker["interrupt"]>[3],
                sourceEventId: Parameters<RuntimeBroker["interrupt"]>[4],
                reportedBy: Parameters<RuntimeBroker["interrupt"]>[5],
              ) =>
                currentBroker!.interrupt(
                  reason,
                  detail,
                  severity,
                  incidentId,
                  sourceEventId,
                  reportedBy,
                ),
            },
            founderClose: {
              value: (commandId: string) => currentBroker!.founderClose(commandId),
            },
          });
          const createdBroker = Object.freeze(delegate) as RuntimeBroker;
          brokerHandle = createdBroker;
          resources.push(Object.freeze({ step: "broker", broker: createdBroker }));
          break;
        }

        case "client": {
          if (brokerHandle === null) {
            return failAt(step, "client_failed", "broker not constructed before client construction");
          }
          client = createInProcessBrokerClient(brokerHandle, { kind: "founder_tui" });
          resources.push(Object.freeze({ step: "client", client }));
          break;
        }

        case "lifelines": {
          if (plan.executions.length !== envelope.executions.length) {
            return failAt(step, "lifeline_failed", "launch plan execution count does not match envelope");
          }
          for (let i = 0; i < plan.executions.length; i += 1) {
            const execution = plan.executions[i]!;
            const envelopeExecution = envelope.executions[i]!;
            let closeTarget: (() => void) | null = null;
            const descriptor: HostLaunchDescriptor = Object.freeze({
              path: execution.executablePath,
              sha256: execution.artifactSha256,
              argv: Object.freeze([...execution.arguments]),
              env: Object.freeze({ ...execution.environment }),
              executionId: envelopeExecution.execution_id,
            });
            const lifeline: BuildLifelineResource = Object.freeze({
              executionId: envelopeExecution.execution_id,
              descriptor,
              close: () => {
                closeTarget?.();
              },
            });
            lifelinesWithBind.set(lifeline, (fn) => {
              closeTarget = fn;
            });
            lifelines.push(lifeline);
            resources.push(Object.freeze({ step: "lifelines", lifeline }));
          }
          break;
        }

        case "hosts": {
          for (const lifeline of lifelines) {
            const handle = spawnHost(lifeline.descriptor);
            lifelinesWithBind.get(lifeline)?.(() => {
              handle.closeStdin();
            });
            const host: BuildHostResource = Object.freeze({
              executionId: lifeline.executionId,
              hostPid: handle.hostPid,
              handle,
            });
            hosts.push(host);
            resources.push(Object.freeze({ step: "hosts", host }));
          }
          break;
        }

        case "children": {
          for (const host of hosts) {
            const launched = await awaitChildLaunchAndReady(host, childLaunchTimeoutMs);
            const child: BuildChildResource = Object.freeze({
              executionId: host.executionId,
              hostPid: launched.hostPid,
              childPid: launched.childPid,
              pgid: launched.pgid,
              killPgid: () => {
                host.handle.killPgid();
              },
            });
            children.push(child);
            resources.push(Object.freeze({ step: "children", child }));
          }
          break;
        }

        case "reattest": {
          for (let i = 0; i < plan.executions.length; i += 1) {
            const execution = plan.executions[i]!;
            const envelopeExecution = envelope.executions[i];
            const host = hosts[i];
            const child = children[i];
            if (envelopeExecution === undefined || host === undefined || child === undefined) {
              return failAt(step, "reattestation_failed", "missing execution, host, or child for re-attestation");
            }
            if (execution.surface !== envelopeExecution.surface) {
              return failAt(step, "reattestation_failed", `surface mismatch for ${envelopeExecution.execution_id}`);
            }
            const reg = resolveRegistration(execution.surface);
            if (reg === undefined || typeof reg.live_attester !== "function") {
              return failAt(
                step,
                "reattestation_failed",
                `surface ${String(execution.surface)} has no live actual-session attester`,
              );
            }
            const verdict = await reg.live_attester({
              executionId: envelopeExecution.execution_id,
              model: envelopeExecution.model,
              provider: envelopeExecution.provider,
              execution,
              registration: reg,
              host,
              child,
            });
            if (!verdict.ok) {
              return failAt(
                step,
                "reattestation_failed",
                `live re-attestation failed for ${envelopeExecution.execution_id}: ${verdict.reason}`,
              );
            }
            if (verdict.evidenceKind !== "actual_session") {
              return failAt(
                step,
                "reattestation_failed",
                `live re-attestation for ${envelopeExecution.execution_id} is not actual_session`,
              );
            }
            if (verdict.provider !== envelopeExecution.provider || verdict.provider !== reg.provider) {
              return failAt(
                step,
                "reattestation_failed",
                `live re-attestation provider mismatch for ${envelopeExecution.execution_id}`,
              );
            }
            if (verdict.model !== envelopeExecution.model) {
              return failAt(
                step,
                "reattestation_failed",
                `live re-attestation model mismatch for ${envelopeExecution.execution_id}`,
              );
            }
            const record: LiveReattestationRecord = Object.freeze({
              executionId: envelopeExecution.execution_id,
              surface: execution.surface,
              provider: verdict.provider,
              model: verdict.model,
              evidenceKind: "actual_session",
              cliVersion: verdict.cliVersion ?? null,
            });
            reattestations.push(record);
            resources.push(Object.freeze({ step: "reattest", reattestation: record }));
          }
          break;
        }

        case "adapters": {
          if (brokerHandle === null) {
            return failAt(step, "adapter_failed", "broker not constructed before adapter construction");
          }
          for (let i = 0; i < plan.executions.length; i += 1) {
            const execution = plan.executions[i]!;
            const envelopeExecution = envelope.executions[i];
            const host = hosts[i];
            if (envelopeExecution === undefined || host === undefined) {
              return failAt(step, "adapter_failed", "missing execution or host for adapter construction");
            }
            const adapterClient = createInProcessBrokerClient(brokerHandle, {
              kind: "execution",
              executionId: envelopeExecution.execution_id,
            });
            const adapter: BuildAdapterHandle = Object.freeze({
              executionId: envelopeExecution.execution_id,
              surface: execution.surface,
              client: adapterClient,
              host: host.handle,
              disconnect: async () => {
                await adapterClient.close();
              },
            });
            adapters.push(adapter);
            resources.push(Object.freeze({ step: "adapters", adapter }));
          }
          break;
        }

        case "issue_token": {
          if (ledger === null || currentBroker === null) {
            return failAt(step, "issue_token_failed", "ledger or broker not ready before issue_token");
          }
          const { state: beforeState, head: beforeHead } = replayLedgerState(ledger);
          const issuedEvent = issueInitialToken(sessionId, envelope.initial_writer, {
            taskEnvelopeHash: envelope.envelope_hash,
            repositoryFingerprint: envelope.repository_fingerprint,
            previousEventHash: beforeHead,
            eventId: sources.nextEventId(),
            createdAt: sources.now(),
          });
          reduceLedgerEvent(beforeState, issuedEvent);
          fencingTokenRow = ledger.append(issuedEvent);
          fencingToken = issuedEvent.fencing_token;
          fencingTokenIssued = true;
          currentBroker = new RuntimeBroker(makeBrokerDeps(ledger));
          localObservationSeq += 1;
          input.observeLifecycle?.({
            snapshotSeq: localObservationSeq,
            phase: currentBroker.snapshotProjectionInput().lifecycle.phase,
            ledgerSeq: fencingTokenRow.sequence,
          });
          resources.push(
            Object.freeze({
              step: "issue_token",
              fencingToken: issuedEvent.fencing_token ?? 1,
              row: fencingTokenRow,
            }),
          );
          break;
        }

        case "activate": {
          if (ledger === null || currentBroker === null || client === null || fencingTokenRow === null) {
            return failAt(step, "activation_failed", "prerequisites missing before activate");
          }
          const { state: beforeState, head: beforeHead } = replayLedgerState(ledger);
          const readyIds = children.map((child) => child.executionId);
          const activatedEvent: SessionLifecycleEventV1 = {
            protocol_version: PROTOCOL_VERSION,
            event_id: sources.nextEventId(),
            session_id: sessionId,
            event_type: "session_activated",
            actor: "madbridge",
            task_envelope_hash: envelope.envelope_hash,
            repository_fingerprint: envelope.repository_fingerprint,
            fencing_token: beforeState.fencingToken,
            reason_code: null,
            created_at: sources.now(),
            previous_event_hash: beforeHead,
            payload: {
              execution_ids: readyIds,
              readiness_snapshot_seq: localObservationSeq,
            },
          };
          reduceLedgerEvent(beforeState, activatedEvent);
          sessionActivatedRow = ledger.append(activatedEvent);
          currentBroker = new RuntimeBroker(makeBrokerDeps(ledger));
          localObservationSeq += 1;
          input.observeLifecycle?.({
            snapshotSeq: localObservationSeq,
            phase: currentBroker.snapshotProjectionInput().lifecycle.phase,
            ledgerSeq: sessionActivatedRow.sequence,
          });
          resources.push(Object.freeze({ step: "activate", row: sessionActivatedRow }));
          activeSnapshot = await client.getSnapshot();
          break;
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "step execution failed";
      return failAt(step, defaultFailureCodeForStep(step), message);
    }

    completedSteps.push(step);

    if (input.onStep !== undefined) {
      const currentPhase: LifecyclePhase | null =
        currentBroker !== null ? currentBroker.snapshotProjectionInput().lifecycle.phase : null;
      await input.onStep(
        Object.freeze({
          step,
          index,
          phase: currentPhase,
          ledgerEventTypes: ledgerEventTypesOf(ledger),
          activeSnapshotExposed: activeSnapshot !== null && activeSnapshot.phase === "active",
        }),
      );
    }
  }

  if (activeSnapshot === null || activeSnapshot.phase !== "active") {
    return failAt("activate", "activation_failed", "active snapshot was not produced");
  }

  return Object.freeze({
    ok: true as const,
    snapshot: activeSnapshot,
    steps: BUILD_STEPS,
    state: snapshotPartialState(),
  });
}
