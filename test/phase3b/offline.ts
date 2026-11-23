import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { userInfo } from "node:os";
import { join } from "node:path";
import { ADAPTER_REGISTRY, parseSurfaceId, parseTaskEnvelope, sha256CanonicalSync } from "@madventures/protocol";
import { rollbackBuild, type BuildResult, type LaunchPlan } from "../../packages/supervisor/src/index";

export function offlineStart() {
  const user = userInfo();
  const root = realpathSync(mkdtempSync(join(realpathSync(user.homedir), ".madbridge-m1-")));
  const dispose = () => rmSync(root, { recursive: true, force: true });
  try {
    const folder = (name: string) => {
      const path = join(root, name);
      mkdirSync(path, { mode: 0o700 });
      return path;
    };
    const work = folder("work"), bin = folder("bin"), temp = folder("temp"), storageRootOverride = folder("storage");
    const config = folder("config"), managed = folder("managed");
    const git = (...args: string[]) => {
      const result = Bun.spawnSync(["/usr/bin/git", "-C", work, ...args], {
        cwd: work, env: { HOME: root, GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: "/dev/null" },
        stdout: "pipe", stderr: "pipe",
      });
      if (result.exitCode !== 0) throw new Error("offline git setup failed");
      return result.stdout;
    };
    git("init", "--template=", "-q", "-b", "offline");
    git("-c", "user.name=Offline", "-c", "user.email=offline@example.invalid", "commit", "-qm", "offline", "--allow-empty");
    const head = git("rev-parse", "HEAD").toString().trim();
    const hash = (bytes: Uint8Array) => new Bun.CryptoHasher("sha256").update(bytes).digest("hex");
    const statusSha256 = hash(git("status", "--porcelain=v1", "-z"));
    const claude = ADAPTER_REGISTRY.get(parseSurfaceId("claude-code"))!;
    const madv = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;
    const now = "2026-11-23T00:00:00.000Z";
    const unsigned = {
      protocol_version: "madbridge-protocol/v1", task_id: "offline-m1", authorization_reference: "OFFLINE-M1",
      repository: join(work, ".git"), worktree: work, branch: "offline",
      repository_fingerprint: { kind: "commit", git_sha: head, sha256: statusSha256 },
      executions: [
        { execution_id: "builder", role: "builder", surface: claude.surface, model: "claude-fable-5-2",
          provider: claude.provider, independence_domain: claude.independence_domain, effort: "high" },
        { execution_id: "reviewer", role: "independent-reviewer", surface: madv.surface, model: "MiniMax-M3.1-Flash",
          provider: madv.provider, independence_domain: madv.independence_domain, effort: "high" },
      ],
      initial_writer: "builder",
      scope: { allowedReadPaths: ["src/**"], allowedWritePaths: ["src/**"], allowedCommandCategories: ["test"],
        allowedArtifactCategories: ["test-result"], maxArtifactSizeBytes: 1024, dataClass: "internal", allowedEgressDestinations: [] },
      pair_constraints: { required_roles: ["builder", "independent-reviewer"], require_distinct_providers: true,
        require_distinct_independence_domains: true, prohibit_self_review: true },
      created_at: now, expires_at: "2026-11-24T00:00:00.000Z",
    };
    const envelope = parseTaskEnvelope({ ...unsigned, envelope_hash: sha256CanonicalSync(unsigned) });
    const plan: LaunchPlan = {
      storageRoot: storageRootOverride,
      repositoryFingerprint: { root: work, worktree: work, head, statusSha256 },
      executions: envelope.executions.map(execution => {
        const registration = ADAPTER_REGISTRY.get(execution.surface)!;
        const executablePath = join(bin, registration.executable_name);
        writeFileSync(executablePath, '#!/bin/sh\ncd "${0%/*}/../work" || exit 2\nwhile IFS= read -r line; do :; done\n', { mode: 0o700 });
        return { surface: execution.surface, executablePath, artifactSha256: hash(readFileSync(executablePath)),
          arguments: [], environment: { HOME: root, TMPDIR: temp, PATH: bin, TERM: "xterm-256color" } };
      }),
    };
    return { root, work, bin, temp, storageRootOverride, config, managed, user, now, envelope, plan, dispose };
  } catch (error) {
    dispose();
    throw error;
  }
}

export async function closeOfflineBuild(result: BuildResult): Promise<void> {
  if (!result.ok) {
    await rollbackBuild(result.partialState);
    return;
  }
  const state = result.state;
  if ((await state.client!.getSnapshot()).phase !== "closed") await state.broker!.founderClose("offline-close");
  for (const host of state.hosts) {
    // Drain to host exit before deleting the disposable files.
    for await (const _ of host.handle.facts()) { }
  }
  for (const adapter of state.adapters) await adapter.disconnect();
  await state.client!.close();
  state.ledger!.close();
}
