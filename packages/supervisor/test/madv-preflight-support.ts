import { afterEach } from "bun:test";
import { mkdirSync, mkdtempSync, realpathSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir, userInfo } from "node:os";
import { join } from "node:path";
import { ADAPTER_REGISTRY, parseSurfaceId, sha256CanonicalSync, type AdapterRegistrationV1 } from "@madventures/protocol";
import { runPurePreflightWithDependencies, type PreflightDependencies, type PreflightInput } from "../src/preflight";

export const CANARY = "M0-SYNTHETIC-MINIMAX-CANARY";
export const MODEL = "MiniMax-M3.1-Flash";
export function madvRegistration(): AdapterRegistrationV1 {
  return ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface")) ?? {
    ...ADAPTER_REGISTRY.get(parseSurfaceId("claude-code"))!,
    surface: parseSurfaceId("madv-surface"), executable_name: "madv-surface",
    provider: "minimax", independence_domain: "minimax", organization_id: "minimax",
    supported_versions: ["0.1.1"], environment_allowlist_ref: "madv-surface-v1",
  };
}
const roots: string[] = [];
afterEach(() => { for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true }); });

export function madvFixture() {
  const root = realpathSync(mkdtempSync(join(tmpdir(), "m0-preflight-")));
  roots.push(root);
  const repo = join(root, "repo"), bin = join(root, "bin"), temp = join(root, "private-temp");
  for (const path of [repo, bin, temp]) mkdirSync(path, { mode: 0o700 });
  const git = (...args: string[]) => {
    const p = Bun.spawnSync(["git", "-C", repo, ...args], { stdout: "pipe", stderr: "pipe" });
    if (p.exitCode !== 0) throw new Error("controlled git setup failed");
    return p.stdout.toString().trim();
  };
  git("init", "-q");
  git("-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "commit", "--allow-empty", "-qm", "fixture");
  const worktree = join(root, "worktree");
  git("worktree", "add", "--detach", "-q", worktree);
  const reg = madvRegistration(), claude = ADAPTER_REGISTRY.get(parseSurfaceId("claude-code"))!;
  // These files are hash/permission inputs only. Tests supply the probe port.
  for (const r of [claude, reg]) writeFileSync(join(bin, r.executable_name), "# controlled non-running artifact\n", { mode: 0o700 });
  const u = userInfo();
  const envelope: Record<string, any> = {
    protocol_version: "madbridge-protocol/v1", task_id: "m0-unit", authorization_reference: "OFFLINE-UNIT",
    repository: repo, worktree, branch: "fixture",
    repository_fingerprint: { kind: "commit", git_sha: git("rev-parse", "HEAD"), sha256: "a".repeat(64) },
    executions: [
      { execution_id: "builder", role: "builder", surface: claude.surface, model: "claude-fable-5-2", provider: claude.provider, independence_domain: claude.independence_domain, effort: "high" },
      { execution_id: "reviewer", role: "independent-reviewer", surface: reg.surface, model: MODEL, provider: reg.provider, independence_domain: reg.independence_domain, effort: "high" },
    ],
    initial_writer: "builder",
    scope: { allowedReadPaths: ["src/**"], allowedWritePaths: ["src/**"], allowedCommandCategories: ["test"], allowedArtifactCategories: ["test-result"], maxArtifactSizeBytes: 1000, dataClass: "internal", allowedEgressDestinations: [] },
    pair_constraints: { required_roles: ["builder", "independent-reviewer"], require_distinct_providers: true, require_distinct_independence_domains: true, prohibit_self_review: true },
    expires_at: "2099-01-01T00:00:00.000Z", created_at: "2026-11-15T00:00:00.000Z",
  };
  const sign = () => { delete envelope.envelope_hash; envelope.envelope_hash = sha256CanonicalSync(envelope); };
  sign();
  const input: PreflightInput = {
    envelope, repositoryRoot: repo, worktree,
    ambient: { HOME: u.homedir, PATH: bin, SHELL: u.shell ?? "", TERM: "fixture-term", TMPDIR: temp,
      CLAUDE_CONFIG_DIR: join(u.homedir, ".claude-madventures-v5"), MINIMAX_API_KEY: CANARY, USER: "fixture-user",
      XDG_STATE_HOME: "discard-state", MADV_SURFACE_TEST_ENDPOINT: "discard-endpoint",
      MADV_SURFACE_TEST_CA: "discard-ca", UNLISTED: "discard-extra" },
    installation: { installation_uid: u.uid, passwd_home: u.homedir, approved_path: bin, claude_config_dir: join(u.homedir, ".claude-madventures-v5") },
    invocationArguments: [], settingsSources: [], storageRootOverride: join(root, "storage"),
    hostCapabilities: { pty: true, processGroups: true, termination: true, timing: true },
    observedHostFacts: {}, now: "2026-11-15T00:00:00.000Z", signal: new AbortController().signal,
  };
  const deps: Partial<PreflightDependencies> = {
    registration: surface => surface === reg.surface ? reg : ADAPTER_REGISTRY.get(surface),
    realpath: path => path === temp ? "/fixture-private-m0" : realpathSync(path),
    stat: path => statSync(path === "/fixture-private-m0" ? temp : path),
    probe: async request => ({ ok: true, diagnostic: { result: "pass", primitive: request.kind === "identity" ? "system/init" : "auth status", exitCode: 0, signal: null, stdoutBytes: 0, stderrBytes: 0 } }),
    freshRecord: (_root, _repo, _worktree, surface) => ({
      overall: "pass", requested_model: surface === reg.surface ? MODEL : "claude-fable-5-2",
      role_eligibility: ["builder", "independent-reviewer"], independent_review_eligible: true,
    }) as any,
  };
  return { root, repo, bin, reg, claude, input, envelope, deps, sign,
    run: (overrides: Partial<PreflightDependencies> = {}) => runPurePreflightWithDependencies(input, { ...deps, ...overrides }) };
}
