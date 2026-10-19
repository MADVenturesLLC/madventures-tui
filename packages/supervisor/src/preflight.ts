import { accessSync, constants, readFileSync, realpathSync, statSync, type Stats } from "node:fs";
import { userInfo } from "node:os";
import { basename, isAbsolute, join, resolve, sep } from "node:path";
import {
  ADAPTER_REGISTRY, CardinalityError, assertActiveSurfaceCardinality,
  parseTaskEnvelope,
  type AdapterRegistrationV1, type CapabilityRecordV1, type ObservedSurfaceFacts,
  type SurfaceId,
} from "@madventures/protocol";
import { evaluatePairEligibilityWithDependencies } from "../../protocol/src/pair-constraints";
import { latestFreshRecord, proposeStorageRoot, validateStorageRoot } from "@madventures/storage";
import { buildAllowlistedEnvironment, MissingRequiredVariableError } from "./environment";
import { IDENTITY_PROBE_INPUT, runBoundedProbe } from "./attestation";

export type PreflightFailure =
  | "envelope_invalid" | "cardinality" | "repository_fingerprint" | "executable_unresolved"
  | "identity_mismatch" | "auth_not_ready" | "pair_ineligible" | "storage_root_invalid"
  | "host_capability_missing" | "capability_record_stale" | "home_mismatch";
export interface PreflightInput {
  envelope: Record<string, unknown>;
  repositoryRoot: string;
  worktree: string;
  ambient: Record<string, string | undefined>;
  installation: { installation_uid: number; passwd_home: string; approved_path: string; claude_config_dir?: string };
  invocationArguments: readonly string[];
  settingsSources: readonly string[];
  storageRootOverride?: string;
  hostCapabilities: { pty: boolean; processGroups: boolean; termination: boolean; timing: boolean };
  observedHostFacts: Readonly<Partial<Record<SurfaceId, ObservedSurfaceFacts>>>;
  now: string;
  signal: AbortSignal;
}
export interface LaunchExecution {
  readonly surface: SurfaceId;
  readonly executablePath: string;
  readonly artifactSha256: string;
  readonly arguments: readonly string[];
  readonly environment: Readonly<Record<string, string>>;
}
export interface LaunchPlan {
  readonly executions: readonly LaunchExecution[];
  readonly repositoryFingerprint: { readonly root: string; readonly worktree: string; readonly head: string; readonly statusSha256: string };
  readonly storageRoot: string;
}
export interface PreflightOk { readonly ok: true; readonly plan: LaunchPlan }
export type PreflightResult = PreflightOk | { readonly ok: false; readonly failure: PreflightFailure; readonly detail: string };

// Deterministic module-only test seam; production callers cannot replace the
// closed registry, filesystem view, environment constructor, or probes.
export interface PreflightDependencies {
  realpath(path: string): string;
  stat(path: string): Stats;
  registration(surface: SurfaceId): AdapterRegistrationV1 | undefined;
  buildEnvironment: typeof buildAllowlistedEnvironment;
  probe: typeof runBoundedProbe;
  freshRecord: typeof latestFreshRecord;
}
const dependencies: PreflightDependencies = {
  realpath: realpathSync, stat: statSync, registration: s => ADAPTER_REGISTRY.get(s),
  buildEnvironment: buildAllowlistedEnvironment, probe: runBoundedProbe, freshRecord: latestFreshRecord,
};
const fail = (failure: PreflightFailure): PreflightResult => ({ ok: false, failure, detail: failure });
const hash = (bytes: string | Uint8Array) => new Bun.CryptoHasher("sha256").update(bytes).digest("hex");
const inside = (path: string, root: string) => path === root || path.startsWith(root.endsWith(sep) ? root : root + sep);

function fingerprint(root: string, worktree: string, d: PreflightDependencies): LaunchPlan["repositoryFingerprint"] {
  const canonicalRoot = d.realpath(root) as string;
  const canonicalWorktree = d.realpath(worktree) as string;
  function git(args: string[]): Buffer {
    const p = Bun.spawnSync(["git", "--no-optional-locks", "-C", canonicalWorktree, ...args], { stdout: "pipe", stderr: "pipe" });
    if (p.exitCode !== 0) throw new Error("git failure");
    return p.stdout;
  }
  if (git(["rev-parse", "--is-inside-work-tree"]).toString().trim() !== "true") throw new Error("not worktree");
  const head = git(["rev-parse", "--verify", "HEAD"]).toString().trim();
  if (!/^[0-9a-f]{40}$/.test(head)) throw new Error("unresolved HEAD");
  // Also establish that the supplied repository root names a git tree.
  const check = Bun.spawnSync(["git", "--no-optional-locks", "-C", canonicalRoot, "rev-parse", "--is-inside-work-tree"], { stdout: "pipe", stderr: "pipe" });
  if (check.exitCode !== 0 || check.stdout.toString().trim() !== "true") throw new Error("not repository");
  return Object.freeze({ root: canonicalRoot, worktree: canonicalWorktree, head, statusSha256: hash(git(["status", "--porcelain=v1", "-z"])) });
}

function validateEnvironment(input: PreflightInput, registrations: readonly AdapterRegistrationV1[], d: PreflightDependencies): boolean {
  const u = userInfo(); const p = input.installation; const env = input.ambient;
  if (u.uid !== p.installation_uid || u.homedir !== p.passwd_home || env.SHELL !== u.shell || !env.TERM) return false;
  if (env.PATH !== p.approved_path || !p.approved_path) return false;
  for (const entry of p.approved_path.split(":")) {
    if (!entry || !isAbsolute(entry)) return false;
    const stat = d.stat(d.realpath(entry) as string);
    if (!stat.isDirectory() || (stat.uid !== 0 && stat.uid !== p.installation_uid) || (stat.mode & 0o022) !== 0) return false;
  }
  const temp = env.TMPDIR;
  if (!temp || !isAbsolute(temp)) return false;
  const canonical = d.realpath(temp) as string, info = d.stat(canonical);
  if (!info.isDirectory() || info.uid !== p.installation_uid || (info.mode & 0o7777) !== 0o700) return false;
  for (const root of ["/tmp", "/var/tmp"]) if (inside(canonical, d.realpath(root) as string)) return false;
  if (registrations.some(r => r.environment_allowlist_ref === "claude-code-v1")) {
    if (p.claude_config_dir !== join(p.passwd_home, ".claude-madventures-v5") || env.CLAUDE_CONFIG_DIR !== p.claude_config_dir) return false;
    if (input.invocationArguments.some(arg => arg === "--settings" || arg.startsWith("--settings="))) return false;
    const allowed = new Set(["HOME", "PATH", "SHELL", "TERM", "TMPDIR", "CLAUDE_CONFIG_DIR", "LANG", "LC_ALL", "LC_CTYPE", "USER"]);
    for (const path of input.settingsSources) {
      if (!isAbsolute(path) || !["settings.json", "settings.local.json", "managed-settings.json"].includes(basename(path))) return false;
      let text: string;
      try { text = readFileSync(path, "utf8"); } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
        return false;
      }
      const settings = JSON.parse(text);
      if (!settings || typeof settings !== "object" || Array.isArray(settings)) return false;
      // Fail closed on unknown settings controls: a future provider/endpoint
      // selector cannot silently become authorized by an old validator.
      for (const key of Object.keys(settings)) if (key !== "env") return false;
      if (settings.env !== undefined) {
        if (!settings.env || typeof settings.env !== "object" || Array.isArray(settings.env)) return false;
        for (const [key, value] of Object.entries(settings.env)) {
          if (!allowed.has(key) || typeof value !== "string" || env[key] !== value) return false;
        }
      }
    }
  }
  return true;
}

export async function runPurePreflight(input: PreflightInput): Promise<PreflightResult> {
  return runPurePreflightWithDependencies(input, {});
}

// Not exported from the package index. Uses the identical production steps.
export async function runPurePreflightWithDependencies(input: PreflightInput, overrides: Partial<PreflightDependencies>): Promise<PreflightResult> {
  const d = { ...dependencies, ...overrides };
  let envelope;
  try { envelope = parseTaskEnvelope(structuredClone(input.envelope)); }
  catch (error) { return fail(error instanceof CardinalityError ? "cardinality" : "envelope_invalid"); }
  try { assertActiveSurfaceCardinality(envelope.executions); } catch { return fail("cardinality"); }
  let repo;
  try { repo = fingerprint(input.repositoryRoot, input.worktree, d); } catch { return fail("repository_fingerprint"); }
  if (input.ambient.HOME === undefined || input.ambient.HOME !== input.installation.passwd_home) return fail("home_mismatch");
  const registrations = envelope.executions.map(e => d.registration(e.surface));
  // Unknown registrations cannot supply an approved executable or environment.
  if (registrations.some(r => r === undefined)) return fail("executable_unresolved");
  const admitted = registrations as AdapterRegistrationV1[];
  try { if (!validateEnvironment(input, admitted, d)) return fail("auth_not_ready"); }
  catch { return fail("auth_not_ready"); }
  const resolved: { path: string; sha256: string }[] = [];
  try {
    for (const reg of admitted) {
      let found: string | undefined;
      for (const entry of input.installation.approved_path.split(":")) {
        const candidate = join(entry, reg.executable_name);
        try {
          const path = d.realpath(candidate) as string;
          if (!isAbsolute(path) || !d.stat(path).isFile()) continue;
          accessSync(path, constants.X_OK); found = path; break;
        } catch { /* Search only the approved PATH. */ }
      }
      if (found === undefined) return fail("executable_unresolved");
      resolved.push({ path: found, sha256: hash(readFileSync(found)) });
    }
  } catch { return fail("executable_unresolved"); }
  const launches: LaunchExecution[] = [];
  for (const [index, execution] of envelope.executions.entries()) {
    const registration = admitted[index]!;
    if (registration.identity_probe.parse !== "json" || registration.auth_readiness_probe === null) return fail("pair_ineligible");
    let environment;
    try { environment = d.buildEnvironment(registration, input.ambient); }
    catch (error) {
      if (error instanceof MissingRequiredVariableError) return fail("auth_not_ready");
      return fail("auth_not_ready");
    }
    const executable = resolved[index]!;
    const request = { executablePath: executable.path, environment, model: execution.model, supportedVersions: registration.supported_versions, signal: input.signal };
    try {
      if (!(await d.probe({ ...request, arguments: [...registration.identity_probe.argv, "--model", execution.model], stdin: IDENTITY_PROBE_INPUT, kind: "identity" })).ok) return fail("identity_mismatch");
    } catch { return fail("identity_mismatch"); }
    try {
      if (!(await d.probe({ ...request, arguments: registration.auth_readiness_probe.argv, stdin: "", kind: "auth" })).ok) return fail("auth_not_ready");
    } catch { return fail("auth_not_ready"); }
    launches.push(Object.freeze({ surface: execution.surface, executablePath: executable.path, artifactSha256: executable.sha256,
      arguments: Object.freeze([...registration.non_interactive_flags, "--model", execution.model]), environment }));
  }
  for (const [index, execution] of envelope.executions.entries()) {
    if (execution.provider !== admitted[index]!.provider) return fail("identity_mismatch");
  }
  const organizations = new Map(admitted.map(r => [r.surface, r.organization_id] as const));
  if (!evaluatePairEligibilityWithDependencies(envelope.executions, envelope.pair_constraints, organizations, {
    registration: d.registration,
  }).ok) return fail("pair_ineligible");
  let storageRoot: string;
  try {
    storageRoot = proposeStorageRoot(input.storageRootOverride === undefined ? {} : { MADV_STORAGE_DIR: input.storageRootOverride }, repo.root, repo.worktree);
    if (!isAbsolute(storageRoot) || resolve(storageRoot) !== storageRoot) return fail("storage_root_invalid");
    if (!validateStorageRoot(storageRoot, repo.root, repo.worktree).ok) return fail("storage_root_invalid");
  } catch { return fail("storage_root_invalid"); }
  if (!input.hostCapabilities.pty || !input.hostCapabilities.processGroups || !input.hostCapabilities.termination || !input.hostCapabilities.timing) return fail("host_capability_missing");
  try {
    for (const [index, execution] of envelope.executions.entries()) {
      const supplied = input.observedHostFacts[execution.surface];
      const observed = supplied === undefined ? undefined : { ...supplied, binary_sha256: resolved[index]!.sha256 };
      const record: CapabilityRecordV1 | null = d.freshRecord(storageRoot, repo.root, repo.worktree, execution.surface, input.now, observed!);
      if (record === null || record.overall !== "pass" || record.requested_model !== execution.model || !record.role_eligibility.includes(execution.role)
        || (execution.role === "independent-reviewer" && !record.independent_review_eligible)) return fail("capability_record_stale");
    }
  } catch { return fail("capability_record_stale"); }
  return { ok: true, plan: Object.freeze({ executions: Object.freeze(launches), repositoryFingerprint: repo, storageRoot }) };
}
