import { afterEach, expect, test } from "bun:test";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  ADAPTER_REGISTRY,
  PROTOCOL_VERSION,
  parseSurfaceId,
  parseTaskEnvelope,
  sha256CanonicalSync,
  type SurfaceId,
  type TaskEnvelopeV1,
} from "@madventures/protocol";
import type { LaunchPlan } from "../src/preflight";
import {
  BUILD_STEPS,
  runTransactionalBuild,
  type BuildInput,
  type BuildResult,
  type BuildStep,
  type BuildStepObservation,
  type BuildSurfaceRegistration,
  type LiveSurfaceAttester,
  type PartialBuildState,
} from "../src/build";

const roots: string[] = [];
const statesToClean: PartialBuildState[] = [];

async function cleanupPartialState(state: PartialBuildState): Promise<void> {
  for (const adapter of state.adapters) {
    try {
      await adapter.disconnect();
    } catch {}
  }
  if (state.client !== null) {
    try {
      await state.client.close();
    } catch {}
  }
  for (const lifeline of state.lifelines) {
    try {
      lifeline.close();
    } catch {}
  }
  for (const host of state.hosts) {
    try {
      host.handle.closeStdin();
    } catch {}
    try {
      process.kill(host.hostPid, "SIGKILL");
    } catch {}
    try {
      host.handle.killPgid();
    } catch {}
  }
  for (const child of state.children) {
    try {
      child.killPgid();
    } catch {}
  }
  if (state.ledger !== null) {
    try {
      state.ledger.close();
    } catch {}
  }
}

afterEach(async () => {
  for (const state of statesToClean.splice(0)) {
    await cleanupPartialState(state);
  }
  for (const root of roots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

function trackResult(result: BuildResult): BuildResult {
  statesToClean.push(result.ok ? result.state : result.partialState);
  return result;
}

function makeBuildFixture(sessionId = "ses-task46-001") {
  const root = realpathSync(mkdtempSync(join(tmpdir(), "task46-build-")));
  roots.push(root);
  chmodSync(root, 0o700);

  const repoRoot = join(root, "repo");
  const worktreeRoot = join(root, "worktree");
  const storageRoot = join(root, "storage");
  mkdirSync(repoRoot, { recursive: true, mode: 0o700 });
  mkdirSync(worktreeRoot, { recursive: true, mode: 0o700 });
  mkdirSync(storageRoot, { recursive: true, mode: 0o700 });

  const binDir = join(root, "bin");
  mkdirSync(binDir, { mode: 0o700 });
  const homeDir = join(root, "home");
  mkdirSync(homeDir, { mode: 0o700 });
  const privateTmpDir = join(root, "tmp");
  mkdirSync(privateTmpDir, { mode: 0o700 });

  const childScript = `#!${process.execPath}\nprocess.on("SIGTERM", () => process.exit(0));\nprocess.on("SIGINT", () => process.exit(0));\nsetInterval(() => {}, 1000);\n`;
  const builderExecPath = join(binDir, "fixture-claude");
  const reviewerExecPath = join(binDir, "fixture-agy");
  writeFileSync(builderExecPath, childScript, { mode: 0o700 });
  writeFileSync(reviewerExecPath, childScript, { mode: 0o700 });

  const builderSha256 = new Bun.CryptoHasher("sha256").update(readFileSync(builderExecPath)).digest("hex");
  const reviewerSha256 = new Bun.CryptoHasher("sha256").update(readFileSync(reviewerExecPath)).digest("hex");

  const claudeSurface = parseSurfaceId("claude-code");
  const agySurface = parseSurfaceId("antigravity");
  const builderModel = "fixture-claude-model-v1";
  const reviewerModel = "fixture-agy-model-v1";

  const unsignedEnvelope = {
    protocol_version: PROTOCOL_VERSION,
    task_id: "task-46-fixture",
    authorization_reference: "FOUNDER-ACT-20261014-TASK46-FIXTURE",
    repository: repoRoot,
    worktree: worktreeRoot,
    branch: "build/m21-task46-r1",
    repository_fingerprint: {
      kind: "commit" as const,
      git_sha: "a".repeat(40),
      sha256: "b".repeat(64),
    },
    executions: [
      {
        execution_id: "builder",
        role: "builder" as const,
        surface: claudeSurface,
        model: builderModel,
        provider: "anthropic",
        independence_domain: "anthropic",
        effort: "high" as const,
      },
      {
        execution_id: "reviewer",
        role: "independent-reviewer" as const,
        surface: agySurface,
        model: reviewerModel,
        provider: "google",
        independence_domain: "google",
        effort: "high" as const,
      },
    ],
    initial_writer: "builder",
    scope: {
      allowedReadPaths: ["packages/**"],
      allowedWritePaths: ["packages/**"],
      allowedCommandCategories: ["test"],
      allowedArtifactCategories: ["test-result"],
      maxArtifactSizeBytes: 1024,
      dataClass: "internal" as const,
      allowedEgressDestinations: [],
    },
    pair_constraints: {
      required_roles: ["builder", "independent-reviewer"] as const,
      require_distinct_providers: true,
      require_distinct_independence_domains: true,
      prohibit_self_review: true,
    },
    expires_at: "2099-01-01T00:00:00.000Z",
    created_at: "2026-10-14T00:00:00.000Z",
  };
  const envelopeHash = sha256CanonicalSync(unsignedEnvelope);
  const envelope: TaskEnvelopeV1 = Object.freeze(
    parseTaskEnvelope({
      ...unsignedEnvelope,
      envelope_hash: envelopeHash,
    }),
  );

  const env = Object.freeze({
    HOME: homeDir,
    PATH: binDir,
    TERM: "xterm-256color",
    TMPDIR: privateTmpDir,
  });

  const plan: LaunchPlan = Object.freeze({
    storageRoot,
    repositoryFingerprint: Object.freeze({
      root: repoRoot,
      worktree: worktreeRoot,
      head: "a".repeat(40),
      statusSha256: "0".repeat(64),
    }),
    executions: Object.freeze([
      Object.freeze({
        surface: claudeSurface,
        executablePath: builderExecPath,
        artifactSha256: builderSha256,
        arguments: Object.freeze([] as readonly string[]),
        environment: env,
      }),
      Object.freeze({
        surface: agySurface,
        executablePath: reviewerExecPath,
        artifactSha256: reviewerSha256,
        arguments: Object.freeze([] as readonly string[]),
        environment: env,
      }),
    ]),
  });

  const passingAttester: LiveSurfaceAttester = ({ model, registration }) => ({
    ok: true,
    evidenceKind: "actual_session",
    provider: registration.provider,
    model,
    cliVersion: registration.supported_versions[0] ?? "1.0.0",
  });

  const registration = (surface: SurfaceId): BuildSurfaceRegistration | undefined => {
    const base = ADAPTER_REGISTRY.get(surface);
    if (!base) return undefined;
    return {
      ...base,
      live_attester: passingAttester,
    };
  };

  let tick = 0;
  let eventSeq = 0;
  const sources = {
    now: () => {
      tick += 1;
      return `2026-10-14T00:00:${String(tick).padStart(2, "0")}.000Z`;
    },
    nextEventId: () => `evt-task46-${(eventSeq += 1)}`,
  };

  const run = async (overrides: Partial<BuildInput> = {}): Promise<BuildResult> =>
    trackResult(
      await runTransactionalBuild({
        sessionId,
        envelope,
        plan,
        registration,
        sources,
        ...overrides,
      }),
    );

  return {
    root,
    sessionId,
    envelope,
    plan,
    registration,
    sources,
    run,
  };
}

test("the build executes the twelve steps in the specified order", async () => {
  expect(BUILD_STEPS).toEqual([
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
  ]);

  const f = makeBuildFixture("ses-task46-order");
  const observedSteps: BuildStep[] = [];
  const result = await f.run({
    onStep: (obs) => {
      observedSteps.push(obs.step);
    },
  });

  expect(result.ok).toBe(true);
  expect(observedSteps).toEqual([...BUILD_STEPS]);
  if (result.ok) {
    expect(result.steps).toEqual([...BUILD_STEPS]);
    expect(result.state.completedSteps).toEqual([...BUILD_STEPS]);
    const resourceSteps: BuildStep[] = [];
    for (const r of result.state.resources) {
      if (resourceSteps[resourceSteps.length - 1] !== r.step) {
        resourceSteps.push(r.step);
      }
    }
    expect(resourceSteps).toEqual([...BUILD_STEPS]);
  }

  // Verify injectFailureAt stops at the injected step and records partial state in creation order.
  const fInjected = makeBuildFixture("ses-task46-inject-hosts");
  const failedAtHosts = await fInjected.run({
    injectFailureAt: "hosts",
  });
  expect(failedAtHosts.ok).toBe(false);
  if (!failedAtHosts.ok) {
    expect(failedAtHosts.failedStep).toBe("hosts");
    expect(failedAtHosts.partialState.completedSteps).toEqual([
      "storage",
      "ledger_open",
      "session_open",
      "broker",
      "client",
      "lifelines",
    ]);
    expect(failedAtHosts.partialState.hosts).toHaveLength(0);
    expect(failedAtHosts.partialState.fencingTokenIssued).toBe(false);
  }
});

test("no active snapshot is exposed before both startup records are durable", async () => {
  const f = makeBuildFixture("ses-task46-barrier");
  const observations: BuildStepObservation[] = [];

  const result = await f.run({
    onStep: (obs) => {
      observations.push(obs);
    },
  });

  expect(result.ok).toBe(true);
  expect(observations).toHaveLength(12);

  // For the first 11 steps (including issue_token), activeSnapshotExposed must be false
  // and phase must never be "active".
  for (const obs of observations.slice(0, 11)) {
    expect(obs.activeSnapshotExposed).toBe(false);
    expect(obs.phase).not.toBe("active");
  }

  const issueTokenObs = observations.find((o) => o.step === "issue_token")!;
  expect(issueTokenObs.ledgerEventTypes).toEqual(["session_open", "fencing_token_issued"]);
  expect(issueTokenObs.phase).toBe("starting");
  expect(issueTokenObs.activeSnapshotExposed).toBe(false);

  const activateObs = observations.find((o) => o.step === "activate")!;
  expect(activateObs.ledgerEventTypes).toEqual([
    "session_open",
    "fencing_token_issued",
    "session_activated",
  ]);
  expect(activateObs.phase).toBe("active");
  expect(activateObs.activeSnapshotExposed).toBe(true);

  if (result.ok) {
    expect(result.snapshot.phase).toBe("active");
    expect(result.snapshot.fencingToken).toBe(1);
    expect(result.snapshot.tokenState).toBe("valid");
    expect(result.snapshot.activeWriterExecutionId).toBe("builder");
    expect(result.snapshot.ledgerSeq).toBe(3);
    expect(result.snapshot.eventLog.map((e) => e.type)).toEqual([
      "session_open",
      "fencing_token_issued",
      "session_activated",
    ]);
  }

  // Also verify that if failure is injected at activate (after issue_token succeeded),
  // fencing_token_issued stays in the ledger, recorded in PartialBuildState,
  // session_activated is not appended, no unwind occurs, and no active snapshot is exposed.
  const fFailActivate = makeBuildFixture("ses-task46-fail-activate");
  const failedActivate = await fFailActivate.run({
    injectFailureAt: "activate",
  });
  expect(failedActivate.ok).toBe(false);
  if (!failedActivate.ok) {
    expect(failedActivate.failedStep).toBe("activate");
    expect(failedActivate.partialState.fencingTokenIssued).toBe(true);
    expect(failedActivate.partialState.fencingToken).toBe(1);
    const rows = failedActivate.partialState.ledger!.readAfter(0);
    const eventTypes = rows.map((r) => (JSON.parse(r.event_json) as { event_type: string }).event_type);
    expect(eventTypes).toEqual(["session_open", "fencing_token_issued"]);
    const snap = await failedActivate.partialState.client!.getSnapshot();
    expect(snap.phase).toBe("starting");
  }
});

test("the build exposes no TUI step in Phase 3A", async () => {
  expect(BUILD_STEPS).toHaveLength(12);
  expect((BUILD_STEPS as readonly string[]).includes("tui")).toBe(false);
  for (const step of BUILD_STEPS) {
    expect(step.toLowerCase()).not.toContain("tui");
  }

  const f = makeBuildFixture("ses-task46-no-tui");
  const result = await f.run();
  expect(result.ok).toBe(true);
  if (result.ok) {
    expect((result.steps as readonly string[]).includes("tui")).toBe(false);
    expect((result.state.completedSteps as readonly string[]).includes("tui")).toBe(false);
    expect(result.state.resources.some((r) => (r.step as string) === "tui")).toBe(false);
  }
});

test("re-attestation failure before activation prevents any active snapshot", async () => {
  // Case 1: Default ADAPTER_REGISTRY registrations have no live_attester in Phase 3A (B4),
  // so reattest must fail closed under spec section 9.13.
  const fDefault = makeBuildFixture("ses-task46-reattest-default");
  const defaultResult = trackResult(
    await runTransactionalBuild({
      sessionId: fDefault.sessionId,
      envelope: fDefault.envelope,
      plan: fDefault.plan,
      sources: fDefault.sources,
    }),
  );
  expect(defaultResult.ok).toBe(false);
  if (!defaultResult.ok) {
    expect(defaultResult.failedStep).toBe("reattest");
    expect(defaultResult.failure).toBe("reattestation_failed");
    expect(defaultResult.partialState.completedSteps).toEqual([
      "storage",
      "ledger_open",
      "session_open",
      "broker",
      "client",
      "lifelines",
      "hosts",
      "children",
    ]);
    expect(defaultResult.partialState.fencingTokenIssued).toBe(false);
    expect(defaultResult.partialState.fencingToken).toBeNull();
    const rows = defaultResult.partialState.ledger!.readAfter(0);
    const eventTypes = rows.map((r) => (JSON.parse(r.event_json) as { event_type: string }).event_type);
    expect(eventTypes).toEqual(["session_open"]);
    const snap = await defaultResult.partialState.client!.getSnapshot();
    expect(snap.phase).toBe("starting");
  }

  // Case 2: Fixture live_attester returns a model mismatch on the second execution.
  const fMismatch = makeBuildFixture("ses-task46-reattest-mismatch");
  const mismatchResult = await fMismatch.run({
    registration: (surface) => {
      const base = ADAPTER_REGISTRY.get(surface);
      if (!base) return undefined;
      return {
        ...base,
        live_attester: ({ executionId, model, registration }) =>
          executionId === "reviewer"
            ? {
                ok: true,
                evidenceKind: "actual_session",
                provider: registration.provider,
                model: "wrong-live-model",
              }
            : {
                ok: true,
                evidenceKind: "actual_session",
                provider: registration.provider,
                model,
              },
      };
    },
  });
  expect(mismatchResult.ok).toBe(false);
  if (!mismatchResult.ok) {
    expect(mismatchResult.failedStep).toBe("reattest");
    expect(mismatchResult.failure).toBe("reattestation_failed");
    expect(mismatchResult.partialState.fencingTokenIssued).toBe(false);
    expect(mismatchResult.partialState.fencingToken).toBeNull();
    const rows = mismatchResult.partialState.ledger!.readAfter(0);
    const eventTypes = rows.map((r) => (JSON.parse(r.event_json) as { event_type: string }).event_type);
    expect(eventTypes).toEqual(["session_open"]);
    const snap = await mismatchResult.partialState.client!.getSnapshot();
    expect(snap.phase).toBe("starting");
  }
});
