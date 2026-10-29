import { existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import type { Subprocess } from "bun";
import { userInfo } from "node:os";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ADAPTER_REGISTRY, PROTOCOL_VERSION, parseSurfaceId, parseTaskEnvelope, sha256CanonicalSync,
  type AdapterRegistrationV1, type InterruptionReasonCodeV1, type SurfaceId,
} from "@madventures/protocol";
import { validateStorageRoot, type SessionStorage } from "@madventures/storage";
import { runPurePreflightWithDependencies } from "../../packages/supervisor/src/preflight";
import { BUILD_STEPS, rollbackBuild, runTransactionalBuildWithDependencies,
  type BuildFailureCode, type BuildStep, type PartialBuildState } from "../../packages/supervisor/src/build";
import type { BrokerClient, BrokerSnapshot } from "../../packages/broker/src/client";
import { unsafeTestOnlyIngestOutputFrame } from "../../packages/broker/src/in-process-client";
import { escalateWedgedHost, spawnPtyHost } from "../../packages/broker/src/pty-host-supervisor";
import { HOST_DEADLINES_MS } from "../../packages/pty-host/src/signals";
import { fixtureCapabilityRecord, fixtureExecutableSource } from "./fixture-adapters";

const REPOSITORY = realpathSync(join(dirname(fileURLToPath(import.meta.url)), "../.."));
const hash = (value: string | Uint8Array): string => new Bun.CryptoHasher("sha256").update(value).digest("hex");

function freeze<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const child of Object.values(value)) freeze(child);
    Object.freeze(value);
  }
  return value;
}

export const FIXTURE_SURFACE_IDS: readonly SurfaceId[] = Object.freeze([
  parseSurfaceId("fixture-builder"), parseSurfaceId("fixture-reviewer"),
]);

const identities = freeze(FIXTURE_SURFACE_IDS.map((surface, index) => ({
  surface, execution_id: index === 0 ? "builder" : "reviewer",
  role: index === 0 ? "builder" as const : "independent-reviewer" as const,
  model: `fixture-model-${index}`, provider: `fixture-provider-${index}`,
  independence_domain: `fixture-domain-${index}`, effort: "high" as const,
})));

const fixtureEntries = new Map<SurfaceId, AdapterRegistrationV1>(identities.map(identity => [identity.surface, freeze({
  surface: identity.surface, executable_name: identity.surface,
  provider: identity.provider, independence_domain: identity.independence_domain,
  organization_id: identity.provider, supported_versions: ["1.0.0"],
  identity_probe: { argv: [], parse: "json" as const },
  auth_readiness_probe: { argv: ["--fixture-auth"], parse: "json" as const },
  non_interactive_flags: ["--fixture-run"], environment_allowlist_ref: "antigravity-v1",
  auth_failure_detection: [], limitations: ["Controlled fixture only."],
})]));

// Object.freeze(Map) leaves set/delete usable; expose the same read-only facade pattern as production.
export const FIXTURE_REGISTRY: ReadonlyMap<SurfaceId, AdapterRegistrationV1> = Object.freeze({
  get: (key: SurfaceId) => fixtureEntries.get(key), has: (key: SurfaceId) => fixtureEntries.has(key),
  entries: () => fixtureEntries.entries(), keys: () => fixtureEntries.keys(), values: () => fixtureEntries.values(),
  get size() { return fixtureEntries.size; },
  [Symbol.iterator]: () => fixtureEntries[Symbol.iterator](),
  forEach(callback: (value: AdapterRegistrationV1, key: SurfaceId, map: ReadonlyMap<SurfaceId, AdapterRegistrationV1>) => void, thisArg?: unknown) {
    fixtureEntries.forEach((value, key) => callback.call(thisArg, value, key, FIXTURE_REGISTRY));
  },
});

export interface HarnessOptions {
  readonly surfaces?: readonly SurfaceId[];
  readonly injectFailureAt?: BuildStep;
  readonly retainStorage?: boolean;
  readonly processScenario?: ProcessScenario;
}
export interface HarnessSession {
  readonly client: BrokerClient;
  readonly storage: SessionStorage;
  interrupt(reason: InterruptionReasonCodeV1): Promise<void>;
  close(): Promise<void>;
}

export class FixtureStartupFailure extends Error {
  readonly hostPids: readonly number[];
  readonly childPids: readonly number[];
  readonly processGroups: readonly number[];
  constructor(readonly failedStep: BuildStep, readonly failure: BuildFailureCode,
    state: PartialBuildState, readonly fixtureRoot: string) {
    super(`FixtureBuildFailed:${failedStep}:${failure}`);
    this.name = "FixtureStartupFailure";
    this.hostPids = Object.freeze(state.hosts.map(host => host.hostPid));
    this.childPids = Object.freeze(state.children.flatMap(child => child.childPid === null ? [] : [child.childPid]));
    this.processGroups = Object.freeze(state.children.flatMap(child => child.pgid === null ? [] : [child.pgid]));
    Object.freeze(this);
  }
}

export class RealSurfaceRejected extends Error {
  constructor() { super("RealSurfaceRejected"); this.name = "RealSurfaceRejected"; }
}

function requestedSurfaces(options: HarnessOptions): readonly SurfaceId[] {
  if (options === null || typeof options !== "object" || Object.getPrototypeOf(options) !== Object.prototype
    || Reflect.ownKeys(options).some(key => !["surfaces", "injectFailureAt", "retainStorage", "processScenario"].includes(String(key)))) throw new Error("InvalidHarnessOptions");
  const scenario = Object.getOwnPropertyDescriptor(options, "processScenario");
  if (scenario !== undefined && (!("value" in scenario) || !PROCESS_SCENARIOS.includes(scenario.value))) throw new Error("InvalidHarnessOptions");
  const retain = Object.getOwnPropertyDescriptor(options, "retainStorage");
  if (retain !== undefined && (!("value" in retain) || typeof retain.value !== "boolean")) throw new Error("InvalidHarnessOptions");
  const injection = Object.getOwnPropertyDescriptor(options, "injectFailureAt");
  if (injection !== undefined && (!("value" in injection) || !BUILD_STEPS.includes(injection.value))) {
    throw new Error("InvalidHarnessOptions");
  }
  const descriptor = Object.getOwnPropertyDescriptor(options, "surfaces");
  if (descriptor !== undefined && !("value" in descriptor)) throw new Error("InvalidHarnessOptions");
  const surfaces: unknown = descriptor === undefined ? FIXTURE_SURFACE_IDS : descriptor.value;
  if (!Array.isArray(surfaces)) throw new Error("InvalidHarnessOptions");
  const copy: SurfaceId[] = [];
  for (let i = 0; i < surfaces.length; i++) {
    const item = Object.getOwnPropertyDescriptor(surfaces, String(i));
    if (item === undefined || !("value" in item)) throw new Error("InvalidHarnessOptions");
    if (!FIXTURE_SURFACE_IDS.includes(item.value)) throw new RealSurfaceRejected();
    copy.push(item.value);
  }
  if (copy.length !== 2 || new Set(copy).size !== 2) throw new Error("FixturePairRequired");
  return copy;
}

function git(args: readonly string[]): Buffer {
  const result = Bun.spawnSync(["git", "--no-optional-locks", "-C", REPOSITORY, ...args], {
    stdout: "pipe", stderr: "pipe", timeout: 2000,
  });
  if (result.exitCode !== 0) throw new Error("FixtureRepositoryUnavailable");
  return result.stdout;
}

function alive(pid: number): boolean {
  try { process.kill(pid, 0); return true; }
  catch (error) { if ((error as NodeJS.ErrnoException).code === "ESRCH") return false; throw error; }
}

async function terminateFixtures(state: PartialBuildState): Promise<void> {
  const results = await Promise.allSettled(state.hosts.map(async host => {
    const child = state.children.find(entry => entry.executionId === host.executionId);
    if (child?.childPid == null || child.pgid == null) throw new Error("FixtureChildIdentityMissing");
    let settled = false;
    let streamError: unknown;
    const drained = (async () => { for await (const _ of host.handle.facts()) { /* drain facts */ } })()
      .catch(error => { streamError = error; }).finally(() => { settled = true; });
    let escalationError: unknown;
    try { await escalateWedgedHost(host.handle, child.pgid, host.hostPid); }
    catch (error) { escalationError = error; }
    finally { host.handle.closeStdin(); }
    const gone = () => settled && !alive(host.hostPid) && !alive(child.childPid!) && !alive(-child.pgid!);
    const deadline = performance.now() + HOST_DEADLINES_MS.outerBound;
    while (!gone() && performance.now() < deadline) await Bun.sleep(10);
    if (!gone()) {
      await escalateWedgedHost(host.handle, child.pgid, host.hostPid);
      const finalDeadline = performance.now() + HOST_DEADLINES_MS.terminationStarted;
      while (!gone() && performance.now() < finalDeadline) await Bun.sleep(10);
    }
    if (!gone()) throw new Error("FixtureContainmentIncomplete");
    await drained;
    if (streamError !== undefined) throw streamError;
    if (escalationError !== undefined) throw escalationError;
  }));
  const errors = results.filter(result => result.status === "rejected").map(result => result.reason);
  if (errors.length) throw new AggregateError(errors, "FixtureTerminationFailed");
}

export async function startFixtureSession(options: HarnessOptions = {}): Promise<HarnessSession> {
  const surfaces = requestedSurfaces(options);
  const injectFailureAt: BuildStep | undefined = Object.getOwnPropertyDescriptor(options, "injectFailureAt")?.value;
  for (const surface of FIXTURE_SURFACE_IDS) if (ADAPTER_REGISTRY.has(surface)) throw new Error("FixtureRegistryCollision");
  // The approved test seams run the production algorithms with closed fixture inputs.
  const registry = new Map([...ADAPTER_REGISTRY, ...FIXTURE_REGISTRY]);
  const executions = surfaces.map(surface => identities.find(identity => identity.surface === surface)!);
  for (const execution of executions) {
    const registration = registry.get(execution.surface)!;
    if (execution.provider !== registration.provider || execution.independence_domain !== registration.independence_domain) {
      throw new Error("FixtureIdentityMismatch");
    }
  }
  const head = git(["rev-parse", "--verify", "HEAD"]).toString().trim();
  const statusHash = hash(git(["status", "--porcelain=v1", "-z"]));
  const branch = git(["rev-parse", "--abbrev-ref", "HEAD"]).toString().trim();
  // The Git repository identity is distinct from its examined working tree, including in a standalone clone.
  const repository = realpathSync(git(["rev-parse", "--path-format=absolute", "--git-common-dir"]).toString().trim());
  const user = userInfo();
  if (user.shell === null) throw new Error("FixtureHostUnsupported");
  // A private disposable home child also satisfies the shared-/tmp exclusion on Linux.
  const root = mkdtempSync(join(realpathSync(user.homedir), ".madbridge-task48-"));
  let state: PartialBuildState | undefined;
  let termination: Promise<void> | undefined;
  let fixtureAdapter: Subprocess<"pipe", "ignore", "ignore"> | undefined;
  const descendants: number[] = [];
  let faultTimer: ReturnType<typeof setTimeout> | undefined;
  let faultWork = Promise.resolve();
  let faultError: unknown;
  const terminate = () => termination ??= state === undefined
    ? Promise.reject(new Error("FixtureStateUnavailable")) : (async () => {
      try { await terminateFixtures(state!); }
      finally {
        if (fixtureAdapter !== undefined) {
          if (fixtureAdapter.exitCode === null && fixtureAdapter.signalCode === null) fixtureAdapter.kill("SIGKILL");
          await fixtureAdapter.exited;
          fixtureAdapter.stdin.end();
        }
      }
    })();
  let closing: Promise<void> | undefined;
  let finalSnapshot: BrokerSnapshot | undefined;
  const pumps: Promise<void>[] = [];
  const pumpErrors: unknown[] = [];
  const close = (): Promise<void> => closing ??= (async () => {
    if (state === undefined) throw new Error("FixtureStateUnavailable");
    const completed = state;
    const errors: unknown[] = [];
    const attempt = async (action: () => void | Promise<void>) => { try { await action(); } catch (error) { errors.push(error); } };
    clearTimeout(faultTimer);
    await attempt(async () => {
      if ((await completed.client!.getSnapshot()).phase !== "closed") {
        await completed.broker!.founderClose(`fixture-close-${crypto.randomUUID()}`);
      }
    });
    await attempt(terminate);
    await attempt(async () => { await faultWork; if (faultError !== undefined) throw faultError; });
    await attempt(async () => {
      for (const pid of descendants) if (alive(pid)) process.kill(pid, "SIGKILL");
      const deadline = performance.now() + HOST_DEADLINES_MS.outerBound;
      while (descendants.some(alive) && performance.now() < deadline) await Bun.sleep(10);
      if (descendants.some(alive)) throw new Error("FixtureDescendantCleanupFailed");
    });
    await attempt(async () => {
      await Promise.all(pumps);
      if (pumpErrors.length) throw new AggregateError(pumpErrors, "FixtureOutputFailed");
    });
    for (const adapter of completed.adapters) await attempt(() => adapter.disconnect());
    await attempt(async () => {
      await completed.client!.close();
      finalSnapshot = await completed.client!.getSnapshot();
    });
    await attempt(() => completed.ledger!.close());
    if (errors.length) throw new AggregateError(errors, "FixtureCloseFailed");
    if (!options.retainStorage) rmSync(root, { recursive: true });
  })();
  try {
    const bin = join(root, "bin"), temp = join(root, "tmp"), storageRoot = join(root, "storage");
    for (const path of [bin, temp, storageRoot]) mkdirSync(path, { mode: 0o700 });
    if (!validateStorageRoot(storageRoot, REPOSITORY, REPOSITORY).ok) throw new Error("FixtureStorageRejected");
    const now = new Date().toISOString();
    const records = new Map(executions.map(execution => {
      const registration = registry.get(execution.surface)!;
      const path = join(bin, registration.executable_name);
      let source = fixtureExecutableSource(execution.model);
      if (execution.execution_id === "builder") {
        if (options.processScenario === "ignore-term") source = source.replace('process.on("SIGTERM", finish);', 'process.on("SIGTERM", () => {});');
        if (options.processScenario === "grandchild" || options.processScenario === "setsid") {
          const marker = 'if (process.argv.includes("--fixture-run")) {';
          if (!source.includes(marker)) throw new Error("FixtureSourceMarkerMissing");
          const detached = options.processScenario === "setsid";
          const childSource = 'process.on("SIGTERM", () => process.exit(0)); setInterval(() => {}, 1000);';
          source = source.replace(marker, marker + `
  const descendant = Bun.spawn([process.execPath, "-e", ${JSON.stringify(childSource)}], {
    detached: ${detached}, env: process.env, stdin: "ignore", stdout: "ignore", stderr: "ignore",
  });
  writeFileSync(join(dirname(dirname(process.argv[1])), "descendant.json"), JSON.stringify({ pid: descendant.pid }));`);
        }
      }
      writeFileSync(path, source, { mode: 0o700 });
      return [execution.surface, fixtureCapabilityRecord(registration, execution.model, path, hash(readFileSync(path)), now)];
    }));
    const unsigned = {
      protocol_version: PROTOCOL_VERSION, task_id: "task48-fixture", authorization_reference: "TASK48-FIXTURE-ONLY",
      repository, worktree: REPOSITORY, branch,
      repository_fingerprint: { kind: "commit" as const, git_sha: head, sha256: statusHash },
      executions, initial_writer: "builder",
      scope: { allowedReadPaths: ["test/**"], allowedWritePaths: [storageRoot], allowedCommandCategories: ["test"],
        allowedArtifactCategories: ["test-result"], maxArtifactSizeBytes: 65536, dataClass: "internal" as const, allowedEgressDestinations: [] },
      pair_constraints: { required_roles: ["builder", "independent-reviewer"], require_distinct_providers: true,
        require_distinct_independence_domains: true, prohibit_self_review: true },
      created_at: now, expires_at: new Date(Date.parse(now) + 60000).toISOString(),
    };
    const raw = { ...unsigned, envelope_hash: sha256CanonicalSync(unsigned) };
    const envelope = parseTaskEnvelope(structuredClone(raw));
    const preflight = await runPurePreflightWithDependencies({
      envelope: raw, repositoryRoot: REPOSITORY, worktree: REPOSITORY,
      ambient: { HOME: user.homedir, SHELL: user.shell, PATH: bin, TERM: "xterm-256color", TMPDIR: temp },
      installation: { installation_uid: user.uid, passwd_home: user.homedir, approved_path: bin },
      invocationArguments: [], settingsSources: [], storageRootOverride: storageRoot,
      hostCapabilities: { pty: true, processGroups: true, termination: true, timing: true },
      observedHostFacts: {}, now, signal: new AbortController().signal,
    }, { registration: surface => registry.get(surface), freshRecord: (_root, _repo, _worktree, surface) => records.get(surface) ?? null });
    if (!preflight.ok) throw new Error(`FixturePreflightFailed:${preflight.failure}`);
    const fingerprint = preflight.plan.repositoryFingerprint;
    if (fingerprint.root !== REPOSITORY || fingerprint.worktree !== REPOSITORY || fingerprint.head !== head || fingerprint.statusSha256 !== statusHash) {
      throw new Error("FixtureRepositoryDrift");
    }
    const result = await runTransactionalBuildWithDependencies({ sessionId: `fixture-${crypto.randomUUID()}`, envelope,
      plan: preflight.plan, ...(injectFailureAt === undefined ? {} : { injectFailureAt }) }, {
      registration: surface => {
        const registration = FIXTURE_REGISTRY.get(surface);
        return registration === undefined ? undefined : { ...registration, live_attester: ({ model }) => ({
          ok: true, evidenceKind: "actual_session", model, provider: registration.provider, cliVersion: "1.0.0",
        }) };
      },
      spawnHost: descriptor => {
        writeFileSync(join(root, `${basename(descriptor.path)}.host.environment.json`), JSON.stringify(descriptor.env), { mode: 0o600 });
        return spawnPtyHost(descriptor);
      },
      terminateGovernedProcesses: terminate,
    });
    state = result.ok ? result.state : result.partialState;
    if (!result.ok) throw new FixtureStartupFailure(result.failedStep, result.failure, state, root);
    if (state.storage === null || state.client === null || state.broker === null || state.ledger === null) throw new Error("FixtureBuildIncomplete");
    const underlying = state.client;
    if (options.processScenario !== undefined) {
      fixtureAdapter = Bun.spawn([process.execPath, "-e", "process.stdin.resume();"], {
        env: { ...preflight.plan.executions[0]!.environment }, stdin: "pipe", stdout: "ignore", stderr: "ignore",
      });
      if (options.processScenario === "grandchild" || options.processScenario === "setsid") {
        const record = join(root, "descendant.json");
        const deadline = performance.now() + HOST_DEADLINES_MS.outerBound;
        while (!existsSync(record) && performance.now() < deadline) await Bun.sleep(10);
        const pid: unknown = JSON.parse(readFileSync(record, "utf8")).pid;
        if (typeof pid !== "number" || !Number.isSafeInteger(pid) || pid <= 1) throw new Error("FixtureDescendantIdentityMissing");
        descendants.push(pid);
      }
    }
    for (const host of state.hosts) {
      pumps.push((async () => {
        for await (const fact of host.handle.facts()) {
          if (fact.kind === "output") unsafeTestOnlyIngestOutputFrame(underlying, host.executionId, fact.bytes);
        }
      })().catch(error => { pumpErrors.push(error); }));
    }
    const interrupt = async (reason: InterruptionReasonCodeV1): Promise<void> => {
      await state!.broker!.interrupt(reason, "Fixture typed interruption", "high", crypto.randomUUID(), null, null);
      await Promise.all(pumps);
      await underlying.close();
    };
    let closedSequence = 0;
    const client: BrokerClient = Object.create(underlying);
    Object.defineProperty(client, "getSnapshot", {
      value: async (): Promise<BrokerSnapshot> => {
        if (finalSnapshot !== undefined) {
          const seq = (finalSnapshot.snapshotSeq ?? 0) + closedSequence++;
          return { ...finalSnapshot, snapshotSeq: seq };
        }
        return underlying.getSnapshot();
      },
      writable: true,
      configurable: true,
      enumerable: true,
    });
    Object.defineProperty(client, "request", {
      value: async (command: Parameters<BrokerClient["request"]>[0]) => {
        const captured = { ...command };
        if (captured.kind === "pty_input" && captured.bytes instanceof Uint8Array) captured.bytes = captured.bytes.slice();
        const accepted = await underlying.request(captured);
        if (!accepted.ok) return accepted;
        if (captured.kind === "pty_input" || captured.kind === "pty_resize") {
          const host = state!.hosts.find(host => host.executionId === captured.executionId);
          if (host === undefined) throw new Error("FixtureWriterHostMissing");
          host.handle.send(captured.kind === "pty_input" ? { kind: "input", bytes: captured.bytes }
            : { kind: "resize", cols: captured.cols, rows: captured.rows });
        } else if (captured.kind === "session_close") {
          await Promise.all(pumps);
          await underlying.close();
        }
        return accepted;
      },
    });
    Object.freeze(client);
    const session = Object.freeze({ client, storage: state.storage, close, interrupt });
    if (options.processScenario !== undefined) {
      processReports.set(session, {
        supervisorPid: process.pid, adapterPid: fixtureAdapter!.pid,
        hostPids: state.hosts.map(host => host.hostPid), childPids: state.children.map(child => child.childPid!),
        processGroups: state.children.map(child => child.pgid!), descendantPids: [...descendants],
        residuals: options.processScenario === "setsid" ? descendants.map(pid => ({ kind: "setsid_escape", pid })) : [],
      });
      if (options.processScenario === "lifeline-eof" || options.processScenario === "host-exit") {
        if (options.processScenario === "host-exit") {
          faultWork = (async () => {
            for await (const _ of state!.hosts[0]!.handle.facts()) { /* observe the actual host stream ending */ }
            clearTimeout(faultTimer);
            if (closing === undefined) await interrupt("pty_host_failure");
          })();
          void faultWork.catch(() => {}); // close propagates monitoring failures after cleanup.
        }
        faultTimer = setTimeout(() => {
          try {
            if (options.processScenario === "lifeline-eof") state!.hosts[0]!.handle.closeStdin();
            else process.kill(state!.hosts[0]!.hostPid, "SIGKILL");
          } catch (error) { faultError = error; }
        }, 150);
      }
    }
    return session;
  } catch (error) {
    try {
      if (state !== undefined && state.sessionActivatedRow !== null) await close();
      else {
        if (state !== undefined) await rollbackBuild(state);
        rmSync(root, { recursive: true });
      }
    } catch (cleanupError) {
      throw new AggregateError([error, cleanupError], "FixtureStartupCleanupFailed");
    }
    throw error;
  }
}

const PROCESS_SCENARIOS = ["descriptors", "grandchild", "ignore-term", "lifeline-eof", "host-exit", "setsid"] as const;
export type ProcessScenario = typeof PROCESS_SCENARIOS[number];
export interface FixtureProcessReport {
  readonly supervisorPid: number;
  readonly adapterPid: number | null;
  readonly hostPids: readonly number[];
  readonly childPids: readonly number[];
  readonly processGroups: readonly number[];
  readonly descendantPids: readonly number[];
  readonly residuals: readonly { readonly kind: string; readonly pid: number }[];
}
const processReports = new WeakMap<HarnessSession, FixtureProcessReport>();
export function fixtureProcessReport(session: HarnessSession): FixtureProcessReport {
  const report = processReports.get(session);
  if (report === undefined) throw new Error("FixtureProcessReportUnavailable");
  return freeze(structuredClone(report));
}
export function startProcessScenario(processScenario: ProcessScenario): Promise<HarnessSession> {
  return startFixtureSession({ processScenario });
}

export interface ChildFixtureSession {
  readonly supervisorPid: number;
  readonly hostPids: readonly number[];
  readonly childPids: readonly number[];
  readonly processGroups: readonly number[];
  readonly storage: SessionStorage;
  readonly initialSnapshot: BrokerSnapshot;
  exit(mode: "clean" | "SIGTERM" | "crash" | "SIGKILL"): Promise<{ exitCode: number | null; signalCode: string | null }>;
  dispose(): Promise<void>;
}

export async function startFixtureSessionInChildProcess(): Promise<ChildFixtureSession> {
  const proc = Bun.spawn([process.execPath, join(REPOSITORY, "test/phase3a/adversarial/supervisor-entry.ts")], {
    cwd: REPOSITORY, env: { PATH: `${dirname(process.execPath)}:/usr/bin:/bin` },
    stdin: "pipe", stdout: "pipe", stderr: "pipe",
  });
  const stderr = new Response(proc.stderr).text();
  const reader = proc.stdout.getReader();
  let timer: ReturnType<typeof setTimeout> | undefined;
  let fixture: { storage: SessionStorage; snapshot: BrokerSnapshot };
  try {
    fixture = await Promise.race([
      (async () => {
        let text = "";
        while (!text.includes("\n")) {
          const chunk = await reader.read();
          if (chunk.done) throw new Error("FixtureSupervisorExitedBeforeReady");
          text += new TextDecoder().decode(chunk.value);
          if (text.length > 65536) throw new Error("FixtureSupervisorReportTooLarge");
        }
        return JSON.parse(text.trim()) as typeof fixture;
      })(),
      new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error("FixtureSupervisorStartupTimeout")), 5000); }),
    ]);
  } catch (error) {
    proc.kill("SIGKILL");
    await proc.exited;
    await stderr;
    throw error;
  } finally { clearTimeout(timer); reader.releaseLock(); }
  const executions = fixture.snapshot.executions ?? [];
  const hostPids = executions.map(execution => execution.hostPid!);
  const childPids = executions.map(execution => execution.childPid!);
  const processGroups = executions.map(execution => execution.processGroupId!);
  if (executions.length !== FIXTURE_SURFACE_IDS.length || [...hostPids, ...childPids, ...processGroups]
    .some(pid => !Number.isSafeInteger(pid) || pid <= 1)) {
    proc.kill("SIGKILL");
    await proc.exited;
    throw new Error("FixtureSupervisorIdentityMissing");
  }
  const exit = async (mode: "clean" | "SIGTERM" | "crash" | "SIGKILL") => {
    if (mode === "SIGTERM" || mode === "SIGKILL") proc.kill(mode);
    else { proc.stdin.write(`${mode}\n`); proc.stdin.flush(); }
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([proc.exited, new Promise<never>((_, reject) => {
        exitTimer = setTimeout(() => reject(new Error("FixtureSupervisorExitTimeout")), HOST_DEADLINES_MS.outerBound);
      })]);
    } finally { clearTimeout(exitTimer); }
    await stderr;
    return { exitCode: proc.exitCode, signalCode: proc.signalCode };
  };
  return Object.freeze({ supervisorPid: proc.pid, hostPids: Object.freeze(hostPids), childPids: Object.freeze(childPids),
    processGroups: Object.freeze(processGroups), storage: fixture.storage, initialSnapshot: fixture.snapshot, exit,
    async dispose() {
      if (proc.exitCode === null && proc.signalCode === null) await exit("SIGKILL");
      const deadline = performance.now() + HOST_DEADLINES_MS.outerBound;
      while ([...hostPids, ...childPids].some(alive) && performance.now() < deadline) await Bun.sleep(10);
      if ([...hostPids, ...childPids].some(alive)) throw new Error("FixtureSupervisorResidualProcess");
      proc.stdin.end();
      rmSync(dirname(fixture.storage.root), { recursive: true });
    },
  });
}
