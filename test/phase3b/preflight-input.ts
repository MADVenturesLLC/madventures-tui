import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ADAPTER_REGISTRY, type ObservedSurfaceFacts } from "@madventures/protocol";
import { writeCapabilityRecord } from "@madventures/storage";
import type { PreflightInput } from "../../packages/supervisor/src/index";
import type { offlineStart } from "./offline";

// Write only records for the disposable executables installed for this start.
export function offlinePreflight(f: ReturnType<typeof offlineStart>): PreflightInput {
  const observed: Record<string, ObservedSurfaceFacts> = {};
  for (const execution of f.envelope.executions) {
    const registration = ADAPTER_REGISTRY.get(execution.surface)!;
    const binary = join(f.bin, registration.executable_name);
    const cli_version = registration.supported_versions[0]!;
    const binary_sha256 = new Bun.CryptoHasher("sha256").update(readFileSync(binary)).digest("hex");
    const host = { os_name: "Linux", os_version: "synthetic", kernel_release: "synthetic",
      reported_model: execution.model, adapter_registration: execution.surface };
    writeCapabilityRecord(f.storageRootOverride, f.work, f.work, {
      surface: execution.surface, provider: registration.provider, requested_model: execution.model,
      role_eligibility: [execution.role], independence_domain: registration.independence_domain,
      organization_id: registration.organization_id, cli_version, binary_path: binary, binary_sha256,
      evaluated_at: f.now, expires_at: new Date(Date.parse(f.now) + 30 * 86400000).toISOString(), host,
      identity_attestation: { result: "pass", primitive: "offline stream", sanitized_facts: "synthetic identity" },
      auth_readiness: { result: "pass", primitive: "offline status" }, pty: { result: "pass", observed_ms: {} },
      independent_review_eligible: execution.role === "independent-reviewer", limitations: ["offline stand-in"],
      overall: "pass", redaction_rules_applied: [],
    });
    observed[execution.surface] = { cli_version, binary_sha256, host };
  }
  const config = join(f.user.homedir, ".claude-madventures-v5");
  return {
    envelope: { ...f.envelope }, repositoryRoot: f.work, worktree: f.work,
    ambient: { HOME: f.user.homedir, SHELL: f.user.shell ?? "", TERM: "xterm-256color",
      PATH: f.bin, TMPDIR: f.temp, CLAUDE_CONFIG_DIR: config, MINIMAX_API_KEY: "M1-SYNTHETIC-CANARY" },
    installation: { installation_uid: f.user.uid, passwd_home: f.user.homedir, approved_path: f.bin, claude_config_dir: config },
    invocationArguments: [], settingsSources: [], storageRootOverride: f.storageRootOverride,
    hostCapabilities: { pty: true, processGroups: true, termination: true, timing: true },
    observedHostFacts: observed, now: f.now, signal: new AbortController().signal,
  };
}
