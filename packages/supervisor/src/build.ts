import { existsSync, realpathSync } from "node:fs";
import { join, resolve, sep } from "node:path";
import {
  GENESIS_HASH,
  INITIAL_LIFECYCLE_STATE,
  Ledger,
  computeEventHash,
  reduceLedgerEvent,
  type LedgerRow,
  type LifecyclePhase,
  type LifecycleState,
} from "@madventures/ledger";
import {
  ADAPTER_REGISTRY,
  PROTOCOL_VERSION,
  canonicalJson,
  type AdapterRegistrationV1,
  type SessionLifecycleEventV1,
  type SurfaceId,
  type TaskEnvelopeV1,
} from "@madventures/protocol";
import { createSessionStorage, rollbackSessionStorage, type SessionStorage } from "@madventures/storage";
import { invalidateToken, issueInitialToken } from "../../broker/src/fencing";
import { HOST_DEADLINES_MS, terminateChildGroup } from "../../pty-host/src/signals";
import {
  createInProcessBrokerClient,
  type InProcessBrokerClient,
  type StampedBrokerSnapshot,
} from "../../broker/src/in-process-client";
import {
  spawnPtyHost,
  escalateWedgedHost,
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
import { projectSnapshot } from "../../broker/src/snapshot";
import type { ExecutionSnapshot } from "../../broker/src/client";
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
  readonly childPid: number | null;
  readonly pgid: number | null;
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
 * (DEC-20261014-03 B2 and B3; DEC-20261016-02 B2 and B4).
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

export interface RollbackOutcome {
  readonly sessionId: string;
  readonly completedSteps: readonly BuildStep[];
  readonly hostsKilled: number;
  readonly childrenKilled: number;
  readonly descriptorsClosed: number;
  readonly sessionDirRemoved: boolean;
  readonly abortAppended: boolean;
}

const closeBuildBroker = new WeakMap<RuntimeBroker, () => void>();
const rollbacks = new WeakMap<PartialBuildState, Promise<RollbackOutcome>>();

function rollbackProcessAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code !== "ESRCH";
  }
}

/** Roll back an incomplete startup; a durable activation is never an abort. */
export function rollbackBuild(state: PartialBuildState): Promise<RollbackOutcome> {
  const existing = rollbacks.get(state);
  if (existing !== undefined) return existing;
  const rollback = unwindBuild(state);
  rollbacks.set(state, rollback);
  return rollback;
}

async function unwindBuild(state: PartialBuildState): Promise<RollbackOutcome> {
  if (state.sessionActivatedRow !== null) throw new Error("rollback_requires_incomplete_startup");
  const errors: unknown[] = [];
  const attempt = async (action: () => void | Promise<void>): Promise<void> => {
    try { await action(); } catch (error) { errors.push(error); }
  };
  let abortAppended = false;
  let descriptorsClosed = 0;
  let sessionDirRemoved = false;
  const closedLifelines = new Set<BuildLifelineResource>();
  const childPids = new Set(state.children.flatMap(child => child.childPid === null ? [] : [child.childPid]));
  const hostsKilled = state.hosts.filter(host => rollbackProcessAlive(host.hostPid)).length;

  for (const adapter of [...state.adapters].reverse()) await attempt(() => adapter.disconnect());
  await attempt(() => {
    if (state.sessionOpenRow === null || state.ledger === null) return;
    const { state: lifecycle, head } = replayLedgerState(state.ledger);
    const opened = JSON.parse(state.sessionOpenRow.event_json) as SessionLifecycleEventV1;
    const sources = createDefaultSources();
    const abort: SessionLifecycleEventV1 = {
      protocol_version: PROTOCOL_VERSION,
      event_id: sources.nextEventId(),
      session_id: state.sessionId,
      event_type: "session_abort",
      actor: "madbridge",
      task_envelope_hash: opened.task_envelope_hash,
      repository_fingerprint: opened.repository_fingerprint,
      fencing_token: lifecycle.fencingToken,
      reason_code: null,
      created_at: sources.now(),
      previous_event_hash: head,
      payload: { abort_reason: "build_failed" },
    };
    const aborted = reduceLedgerEvent(lifecycle, abort);
    if (state.fencingTokenIssued) {
      const invalidation = invalidateToken(aborted, "rollback", null, {
        taskEnvelopeHash: opened.task_envelope_hash,
        repositoryFingerprint: opened.repository_fingerprint,
        previousEventHash: computeEventHash(head, canonicalJson(abort)),
        eventId: sources.nextEventId(),
        createdAt: sources.now(),
      });
      reduceLedgerEvent(aborted, invalidation);
      state.ledger.appendMany([abort, invalidation]);
    } else {
      state.ledger.append(abort);
    }
    abortAppended = true;
  });

  for (const child of [...state.children].reverse()) await attempt(async () => {
    if (child.pgid === null) return; // The host's launched fact supplies late identities below.
    await terminateChildGroup(child.pgid, () => {}, { emitStarted: false, seams: {
      signalProcessGroup: (pgid, signal) => {
        try { process.kill(-pgid, signal); } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== "ESRCH") throw error;
        }
      },
      groupIsAlive: pgid => rollbackProcessAlive(-pgid),
    } });
    if ((child.childPid !== null && rollbackProcessAlive(child.childPid)) || rollbackProcessAlive(-child.pgid)) {
      throw new Error(`rollback: surviving child PID ${child.childPid}`);
    }
  });

  for (const host of [...state.hosts].reverse()) await attempt(async () => {
    const child = state.children.find(child => child.executionId === host.executionId);
    let pgid = child?.pgid ?? 0;
    const localChildren = new Set(child?.childPid == null ? [] : [child.childPid]);
    let settled = false;
    let bypassed = false;
    const facts = (async () => {
      for await (const fact of host.handle.facts()) {
        if (fact.kind === "launched") {
          pgid = fact.pgid;
          localChildren.add(fact.childPid);
          childPids.add(fact.childPid);
          if (bypassed) host.handle.killPgid();
        }
      }
    })().catch(error => { errors.push(error); }).finally(() => { settled = true; });
    const started = performance.now();
    let delegated = false;
    await attempt(async () => {
      delegated = (await escalateWedgedHost(host.handle, pgid, host.hostPid)).state === "S1";
      bypassed = !delegated;
      if (bypassed) host.handle.killPgid();
    });
    const lifeline = state.lifelines.find(line => line.executionId === host.executionId);
    await attempt(() => {
      if (lifeline !== undefined) {
        lifeline.close(); closedLifelines.add(lifeline); descriptorsClosed += 1;
      } else host.handle.closeStdin();
    });
    const absent = () => settled && !rollbackProcessAlive(host.hostPid)
      && [...localChildren].every(pid => !rollbackProcessAlive(pid))
      && (pgid <= 1 || !rollbackProcessAlive(-pgid));
    while (!absent() && performance.now() - started < HOST_DEADLINES_MS.outerBound) await Bun.sleep(10);
    if (!absent() && delegated) {
      // S1 acknowledges delegation; only an expired completion bound permits bypass.
      await escalateWedgedHost(host.handle, pgid, host.hostPid);
      bypassed = true;
      host.handle.killPgid();
    }
    const finalDeadline = performance.now() + HOST_DEADLINES_MS.terminationStarted;
    while (!absent() && performance.now() < finalDeadline) await Bun.sleep(10);
    host.handle.killPgid(); // Include a launched fact that arrived after initial escalation.
    if (!absent()) throw new Error(`rollback_host_containment_incomplete pid=${host.hostPid}`);
    await facts;
    descriptorsClosed += 1;
  });

  for (const lifeline of [...state.lifelines].reverse()) {
    if (!closedLifelines.has(lifeline)) await attempt(() => { lifeline.close(); descriptorsClosed += 1; });
  }
  for (const adapter of [...state.adapters].reverse()) await attempt(() => adapter.client.close());
  if (state.client !== null) await attempt(() => state.client!.close());
  if (state.broker !== null) closeBuildBroker.get(state.broker)?.();
  if (state.ledger !== null) await attempt(() => { state.ledger!.close(); descriptorsClosed += 1; });
  if (state.storage !== null && state.sessionOpenRow === null) await attempt(() => {
    const storage = state.storage!;
    const boundary = resolve(storage.root, "sessions") + sep;
    const directory = resolve(storage.sessionDir);
    if (!directory.startsWith(boundary) || directory !== resolve(boundary, state.sessionId)
      || realpathSync(directory) !== resolve(realpathSync(storage.root), "sessions", state.sessionId)) {
      throw new Error("rollback_session_directory_outside_boundary");
    }
    sessionDirRemoved = rollbackSessionStorage({ ...storage, sessionDir: directory }, false) === "removed";
  });
  if (errors.length > 0) throw new AggregateError(errors, "rollback_failed");
  return Object.freeze({ sessionId: state.sessionId, completedSteps: state.completedSteps,
    hostsKilled, childrenKilled: childPids.size, descriptorsClosed, sessionDirRemoved, abortAppended });
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
  readonly injectFailureAt?: BuildStep;
}

export interface BuildDependencies {
  readonly registration?: (surface: SurfaceId) => BuildSurfaceRegistration | undefined;
  readonly spawnHost?: (descriptor: HostLaunchDescriptor) => PtyHostHandle;
  readonly sources?: RuntimeBrokerSources;
  readonly terminateGovernedProcesses?: GovernedProcessTerminator;
  readonly observeLifecycle?: (observation: LifecycleObservation) => void;
  readonly onStep?: (observation: BuildStepObservation) => void | Promise<void>;
  readonly childLaunchTimeoutMs?: number;
}

export type BuildWithDependenciesInput = BuildInput & BuildDependencies;

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
        throw new Error("child_launch_timeout");
      }
      if (next.res.done) {
        throw new Error("host_fact_stream_ended");
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
        throw new Error("child_exited_before_ready");
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

function formatFailureDetail(
  step: BuildStep,
  failure: BuildFailureCode,
  executionIds: readonly string[] = [],
): string {
  const validIds = executionIds.filter(
    (id): id is string => typeof id === "string" && id.length > 0 && /^[A-Za-z0-9._:-]+$/.test(id),
  );
  if (validIds.length === 1) {
    return `step=${step} execution=${validIds[0]} failure=${failure}`;
  }
  if (validIds.length > 1) {
    return `step=${step} executions=${validIds.join(",")} failure=${failure}`;
  }
  return `step=${step} failure=${failure}`;
}

/**
 * Execute the ordered transactional build of Phase 3A Milestone M21 Task 46.
 *
 * Production entry point exported by the package index (DEC-20261016-02 B3):
 * uses ADAPTER_REGISTRY, spawnPtyHost, and default sources.
 */
export async function runTransactionalBuild(input: BuildInput): Promise<BuildResult> {
  const safeInput: BuildInput =
    input !== null && typeof input === "object"
      ? {
          sessionId: input.sessionId,
          envelope: input.envelope,
          plan: input.plan,
          ...(input.injectFailureAt !== undefined ? { injectFailureAt: input.injectFailureAt } : {}),
        }
      : ({} as BuildInput);
  return runTransactionalBuildWithDependencies(safeInput);
}

/**
 * Internal module-only test seam (not exported from the package index).
 * Runs the identical twelve build steps while allowing tests to supply
 * fixture registrations, host spawners, deterministic sources, terminators,
 * and observers (DEC-20261016-02 B3).
 */
export async function runTransactionalBuildWithDependencies(
  input: BuildWithDependenciesInput,
  overrides: BuildDependencies = {},
): Promise<BuildResult> {
  const rawInput = (input !== null && typeof input === "object" ? input : {}) as Partial<BuildWithDependenciesInput>;
  const sessionId = typeof rawInput.sessionId === "string" ? rawInput.sessionId : "";
  const envelope = rawInput.envelope as TaskEnvelopeV1;
  const plan = rawInput.plan as LaunchPlan;
  const injectFailureAt = rawInput.injectFailureAt;

  const sources = overrides.sources ?? rawInput.sources ?? createDefaultSources();
  const resolveRegistration: (surface: SurfaceId) => BuildSurfaceRegistration | undefined =
    overrides.registration ??
    rawInput.registration ??
    ((surface: SurfaceId) => ADAPTER_REGISTRY.get(surface));
  const spawnHost = overrides.spawnHost ?? rawInput.spawnHost ?? spawnPtyHost;
  const terminateGovernedProcesses =
    overrides.terminateGovernedProcesses ?? rawInput.terminateGovernedProcesses;
  const observeLifecycle = overrides.observeLifecycle ?? rawInput.observeLifecycle;
  const onStep = overrides.onStep ?? rawInput.onStep;
  const childLaunchTimeoutMs =
    overrides.childLaunchTimeoutMs ??
    rawInput.childLaunchTimeoutMs ??
    DEFAULT_CHILD_LAUNCH_TIMEOUT_MS;

  const completedSteps: BuildStep[] = [];
  const resources: CreatedBuildResource[] = [];
  let storage: SessionStorage | null = null;
  let ledgerPath: string | null = null;
  let ledger: Ledger | null = null;
  let sessionOpenRow: LedgerRow | null = null;
  let currentBroker: RuntimeBroker | null = null;
  let brokerHandle: RuntimeBroker | null = null;
  let client: InProcessBrokerClient | null = null;
  const preparedDescriptors: HostLaunchDescriptor[] = [];
  const lifelines: BuildLifelineResource[] = [];
  const hosts: BuildHostResource[] = [];
  const children: BuildChildResource[] = [];
  const childResourceIndices = new Map<number, number>();
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
      terminateGovernedProcesses ??
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
      observeLifecycle?.(obs);
    },
  });

  const failAt = (
    step: BuildStep,
    failure: BuildFailureCode,
    executionIds: readonly string[] = [],
  ): BuildResult =>
    Object.freeze({
      ok: false as const,
      failedStep: step,
      failure,
      detail: formatFailureDetail(step, failure, executionIds),
      partialState: snapshotPartialState(),
    });

  let activeSnapshot: StampedBrokerSnapshot | null = null;

  for (let index = 0; index < BUILD_STEPS.length; index += 1) {
    const step = BUILD_STEPS[index]!;
    let currentExecutionIds: readonly string[] = [];

    if (injectFailureAt === step) {
      return failAt(step, "injected_failure");
    }

    try {
      switch (step) {
        case "storage": {
          if (
            sessionId.length === 0 ||
            plan === undefined ||
            plan === null ||
            typeof plan.storageRoot !== "string" ||
            plan.repositoryFingerprint === undefined ||
            plan.repositoryFingerprint === null ||
            envelope === undefined ||
            envelope === null
          ) {
            return failAt(step, "storage_failed");
          }
          if (existsSync(join(plan.storageRoot, "sessions", sessionId))) {
            return failAt(step, "storage_failed");
          }
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
            return failAt(step, "ledger_open_failed");
          }
          ledgerPath = join(storage.ledgerDir, "ledger.sqlite3");
          ledger = new Ledger(ledgerPath);
          resources.push(Object.freeze({ step: "ledger_open", ledger, ledgerPath }));
          break;
        }

        case "session_open": {
          if (ledger === null || !Array.isArray(envelope.executions)) {
            return failAt(step, "session_open_failed");
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
            return failAt(step, "broker_failed");
          }
          const deps = makeBrokerDeps(ledger);
          currentBroker = new RuntimeBroker(deps);
          const openBroker = (): RuntimeBroker => {
            if (currentBroker === null) throw new Error("build_broker_closed");
            return currentBroker;
          };
          const delegate = Object.create(RuntimeBroker.prototype) as RuntimeBroker;
          Object.defineProperties(delegate, {
            snapshotSeq: {
              get: () => openBroker().snapshotSeq,
              enumerable: true,
            },
            snapshotProjectionInput: {
              value: () => openBroker().snapshotProjectionInput(),
            },
            activate: {
              value: (writer: string, readyIds: readonly string[], executions?: readonly ExecutionSnapshot[]) =>
                openBroker().activate(writer, readyIds, executions),
            },
            pause: {
              value: (commandId: string) => openBroker().pause(commandId),
            },
            resume: {
              value: (commandId: string) => openBroker().resume(commandId),
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
                openBroker().interrupt(
                  reason,
                  detail,
                  severity,
                  incidentId,
                  sourceEventId,
                  reportedBy,
                ),
            },
            founderClose: {
              value: (commandId: string) => openBroker().founderClose(commandId),
            },
          });
          const createdBroker = Object.freeze(delegate) as RuntimeBroker;
          closeBuildBroker.set(createdBroker, () => { currentBroker = null; });
          brokerHandle = createdBroker;
          resources.push(Object.freeze({ step: "broker", broker: createdBroker }));
          break;
        }

        case "client": {
          if (brokerHandle === null) {
            return failAt(step, "client_failed");
          }
          client = createInProcessBrokerClient(brokerHandle, { kind: "founder_tui" });
          resources.push(Object.freeze({ step: "client", client }));
          break;
        }

        case "lifelines": {
          if (
            !Array.isArray(plan.executions) ||
            !Array.isArray(envelope.executions) ||
            plan.executions.length === 0 ||
            plan.executions.length !== envelope.executions.length
          ) {
            return failAt(step, "lifeline_failed");
          }
          for (let i = 0; i < plan.executions.length; i += 1) {
            const execution = plan.executions[i];
            const envelopeExecution = envelope.executions[i];
            const execId = envelopeExecution?.execution_id;
            currentExecutionIds = typeof execId === "string" && execId.length > 0 ? [execId] : [];
            if (
              execution === undefined ||
              envelopeExecution === undefined ||
              typeof execId !== "string" ||
              execId.length === 0 ||
              execution.surface !== envelopeExecution.surface ||
              typeof execution.executablePath !== "string" ||
              execution.executablePath.length === 0 ||
              typeof execution.artifactSha256 !== "string" ||
              execution.artifactSha256.length === 0 ||
              !Array.isArray(execution.arguments) ||
              execution.environment === null ||
              typeof execution.environment !== "object"
            ) {
              return failAt(step, "lifeline_failed", currentExecutionIds);
            }
            const descriptor: HostLaunchDescriptor = Object.freeze({
              path: execution.executablePath,
              sha256: execution.artifactSha256,
              argv: Object.freeze([...execution.arguments]),
              env: Object.freeze({ ...execution.environment }),
              executionId: execId,
            });
            preparedDescriptors.push(descriptor);
          }
          currentExecutionIds = [];
          break;
        }

        case "hosts": {
          if (preparedDescriptors.length === 0) {
            return failAt(step, "host_spawn_failed");
          }
          for (const descriptor of preparedDescriptors) {
            currentExecutionIds = [descriptor.executionId];
            const handle = spawnHost(descriptor);
            const lifeline: BuildLifelineResource = Object.freeze({
              executionId: descriptor.executionId,
              descriptor,
              close: () => {
                handle.closeStdin();
              },
            });
            lifelines.push(lifeline);
            resources.push(Object.freeze({ step: "lifelines", lifeline }));

            const host: BuildHostResource = Object.freeze({
              executionId: descriptor.executionId,
              hostPid: handle.hostPid,
              handle,
            });
            hosts.push(host);
            resources.push(Object.freeze({ step: "hosts", host }));

            const instructedChild: BuildChildResource = Object.freeze({
              executionId: descriptor.executionId,
              hostPid: handle.hostPid,
              childPid: null,
              pgid: null,
              killPgid: () => {
                handle.killPgid();
              },
            });
            const childIdx = children.push(instructedChild) - 1;
            const resourceIdx =
              resources.push(Object.freeze({ step: "children", child: instructedChild })) - 1;
            childResourceIndices.set(childIdx, resourceIdx);
          }
          currentExecutionIds = [];
          break;
        }

        case "children": {
          if (hosts.length === 0 || hosts.length !== preparedDescriptors.length) {
            return failAt(step, "child_launch_failed");
          }
          for (let i = 0; i < hosts.length; i += 1) {
            const host = hosts[i]!;
            currentExecutionIds = [host.executionId];
            const launched = await awaitChildLaunchAndReady(host, childLaunchTimeoutMs);
            const readyChild: BuildChildResource = Object.freeze({
              executionId: host.executionId,
              hostPid: launched.hostPid,
              childPid: launched.childPid,
              pgid: launched.pgid,
              killPgid: () => {
                host.handle.killPgid();
              },
            });
            children[i] = readyChild;
            const resourceIdx = childResourceIndices.get(i);
            if (resourceIdx !== undefined) {
              resources[resourceIdx] = Object.freeze({ step: "children", child: readyChild });
            }
          }
          currentExecutionIds = [];
          break;
        }

        case "reattest": {
          for (let i = 0; i < plan.executions.length; i += 1) {
            const execution = plan.executions[i]!;
            const envelopeExecution = envelope.executions[i];
            const host = hosts[i];
            const child = children[i];
            const execId = envelopeExecution?.execution_id;
            currentExecutionIds = typeof execId === "string" && execId.length > 0 ? [execId] : [];
            if (
              envelopeExecution === undefined ||
              host === undefined ||
              child === undefined ||
              child.childPid === null ||
              child.pgid === null
            ) {
              return failAt(step, "reattestation_failed", currentExecutionIds);
            }
            if (execution.surface !== envelopeExecution.surface) {
              return failAt(step, "reattestation_failed", currentExecutionIds);
            }
            const reg = resolveRegistration(execution.surface);
            if (reg === undefined || typeof reg.live_attester !== "function") {
              return failAt(step, "reattestation_failed", currentExecutionIds);
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
              return failAt(step, "reattestation_failed", currentExecutionIds);
            }
            if (verdict.evidenceKind !== "actual_session") {
              return failAt(step, "reattestation_failed", currentExecutionIds);
            }
            if (verdict.provider !== envelopeExecution.provider || verdict.provider !== reg.provider) {
              return failAt(step, "reattestation_failed", currentExecutionIds);
            }
            if (verdict.model !== envelopeExecution.model) {
              return failAt(step, "reattestation_failed", currentExecutionIds);
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
          currentExecutionIds = [];
          break;
        }

        case "adapters": {
          if (brokerHandle === null) {
            return failAt(step, "adapter_failed");
          }
          for (let i = 0; i < plan.executions.length; i += 1) {
            const execution = plan.executions[i]!;
            const envelopeExecution = envelope.executions[i];
            const host = hosts[i];
            const execId = envelopeExecution?.execution_id;
            currentExecutionIds = typeof execId === "string" && execId.length > 0 ? [execId] : [];
            if (envelopeExecution === undefined || host === undefined) {
              return failAt(step, "adapter_failed", currentExecutionIds);
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
          currentExecutionIds = [];
          break;
        }

        case "issue_token": {
          if (ledger === null || currentBroker === null) {
            return failAt(step, "issue_token_failed");
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
          resources.push(
            Object.freeze({
              step: "issue_token",
              fencingToken: issuedEvent.fencing_token ?? 1,
              row: fencingTokenRow,
            }),
          );
          currentBroker = new RuntimeBroker(makeBrokerDeps(ledger));
          localObservationSeq += 1;
          observeLifecycle?.({
            snapshotSeq: localObservationSeq,
            phase: currentBroker.snapshotProjectionInput().lifecycle.phase,
            ledgerSeq: fencingTokenRow.sequence,
          });
          break;
        }

        case "activate": {
          if (ledger === null || currentBroker === null || client === null || fencingTokenRow === null) {
            return failAt(step, "activation_failed");
          }
          const { state: beforeState, head: beforeHead } = replayLedgerState(ledger);
          const beforeSnapshot = await client.getSnapshot();
          const readyIds = children.map((child) => child.executionId);
          const executions: readonly ExecutionSnapshot[] = envelope.executions.map((identity, index) => {
            const child = children[index]!;
            const launch = plan.executions[index]!;
            return {
              identity: structuredClone(identity), state: "ready",
              hostPid: child.hostPid, childPid: child.childPid, processGroupId: child.pgid,
              executablePath: launch.executablePath, executableSha256: launch.artifactSha256,
              exitCode: null, exitSignal: null,
            };
          });
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
          resources.push(Object.freeze({ step: "activate", row: sessionActivatedRow }));
          try {
            // The build already issued its token; replay activation without issuing it again.
            currentBroker = new RuntimeBroker({ ...makeBrokerDeps(ledger), executions });
          } catch {}
          localObservationSeq += 1;
          try {
            activeSnapshot = await client.getSnapshot();
          } catch {}
          if (activeSnapshot === null || activeSnapshot.phase !== "active") {
            const stamp: StampedBrokerSnapshot = activeSnapshot ?? beforeSnapshot;
            try {
              activeSnapshot = Object.freeze({
                ...projectSnapshot(currentBroker.snapshotProjectionInput()),
                snapshotSeq: stamp.snapshotSeq,
                connected: stamp.connected,
              });
            } catch {}
            if (activeSnapshot === null || activeSnapshot.phase !== "active") {
              // Durable activation succeeds even when every subsequent snapshot read fails.
              activeSnapshot = Object.freeze({
                ...beforeSnapshot,
                phase: "active" as const,
                executions: structuredClone(executions),
                fencingToken: beforeState.fencingToken ?? 1,
                tokenState: "valid" as const,
                activeWriterExecutionId: beforeSnapshot.activeWriterExecutionId ?? envelope.initial_writer,
                ledgerSeq: sessionActivatedRow.sequence,
                snapshotSeq: stamp.snapshotSeq,
                eventLog: Object.freeze([
                  ...beforeSnapshot.eventLog,
                  Object.freeze({
                    seq: sessionActivatedRow.sequence,
                    type: activatedEvent.event_type,
                    actor: activatedEvent.actor,
                    fencingToken: activatedEvent.fencing_token,
                    hash: sessionActivatedRow.event_hash,
                    timestamp: sessionActivatedRow.created_at,
                  }),
                ]),
              });
            }
          }
          try {
            observeLifecycle?.({
              snapshotSeq: localObservationSeq,
              phase:
                currentBroker !== null
                  ? currentBroker.snapshotProjectionInput().lifecycle.phase
                  : "active",
              ledgerSeq: sessionActivatedRow.sequence,
            });
          } catch {}
          break;
        }
      }

      if (step === "activate" && sessionActivatedRow !== null) {
        completedSteps.push(step);
        if (onStep !== undefined) {
          try {
            const currentPhase: LifecyclePhase | null =
              currentBroker !== null
                ? currentBroker.snapshotProjectionInput().lifecycle.phase
                : "active";
            await onStep(
              Object.freeze({
                step,
                index,
                phase: currentPhase,
                ledgerEventTypes: ledgerEventTypesOf(ledger),
                activeSnapshotExposed: activeSnapshot !== null && activeSnapshot.phase === "active",
              }),
            );
          } catch {}
        }
      } else {
        if (onStep !== undefined) {
          const currentPhase: LifecyclePhase | null =
            currentBroker !== null ? currentBroker.snapshotProjectionInput().lifecycle.phase : null;
          await onStep(
            Object.freeze({
              step,
              index,
              phase: currentPhase,
              ledgerEventTypes: ledgerEventTypesOf(ledger),
              activeSnapshotExposed: activeSnapshot !== null && activeSnapshot.phase === "active",
            }),
          );
        }
        completedSteps.push(step);
      }
    } catch {
      return failAt(step, defaultFailureCodeForStep(step), currentExecutionIds);
    }
  }

  if (activeSnapshot === null || activeSnapshot.phase !== "active") {
    return failAt("activate", "activation_failed");
  }

  return Object.freeze({
    ok: true as const,
    snapshot: activeSnapshot,
    steps: BUILD_STEPS,
    state: snapshotPartialState(),
  });
}
