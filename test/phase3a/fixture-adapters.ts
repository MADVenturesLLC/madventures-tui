// test/phase3a/fixture-adapters.ts
// Task 33's byte router remains import-safe. Task 48 helpers produce only
// synthetic fixture data; runtime-harness owns registration and startup.

import type { AdapterRegistrationV1, CapabilityRecordV1 } from "@madventures/protocol";

export function createFakeByteRouter(): {
  write(id: string, bytes: Uint8Array): void;
  onData(id: string, cb: (b: Uint8Array) => void): void;
} {
  const receivers = new Map<string, (b: Uint8Array) => void>();

  return {
    write(id: string, bytes: Uint8Array): void {
      const cb = receivers.get(id);
      if (cb) cb(bytes);
    },
    onData(id: string, cb: (b: Uint8Array) => void): void {
      receivers.set(id, cb);
    },
  };
}

export function fixtureExecutableSource(model: string): string {
  return `#!${process.execPath}
process.on("SIGTERM", () => process.exit(0));
process.on("SIGINT", () => process.exit(0));
if (process.argv.includes("--fixture-run")) {
  setInterval(() => {}, 1000);
} else if (process.argv.includes("--fixture-auth")) {
  console.log(JSON.stringify({ loggedIn: true, authMethod: "claude.ai", apiProvider: "firstParty", subscriptionType: "max" }));
} else {
  console.log(JSON.stringify({ type: "system", subtype: "init", model: ${JSON.stringify(model)}, claude_code_version: "1.0.0" }));
}
`;
}

// In-memory evidence for controlled fixtures only; never persisted as a capability record.
export function fixtureCapabilityRecord(
  registration: AdapterRegistrationV1,
  model: string,
  executablePath: string,
  binaryHash: string,
  now: string,
): CapabilityRecordV1 {
  return {
    surface: registration.surface,
    provider: registration.provider,
    requested_model: model,
    role_eligibility: ["builder", "independent-reviewer"],
    independence_domain: registration.independence_domain,
    organization_id: registration.organization_id,
    cli_version: "1.0.0",
    binary_path: executablePath,
    binary_sha256: binaryHash,
    evaluated_at: now,
    expires_at: new Date(Date.parse(now) + 30 * 86400000).toISOString(),
    host: {
      arch: process.arch, macos_version: "fixture", macos_build: "fixture",
      bun_version: Bun.version, bun_path: process.execPath, bun_sha256: "0".repeat(64),
      term: "xterm-256color", shell: "fixture",
    },
    identity_attestation: { result: "pass", primitive: "fixture-only", sanitized_facts: "synthetic fixture identity" },
    auth_readiness: { result: "pass", primitive: "fixture-only" },
    pty: { result: "pass", observed_ms: {} },
    independent_review_eligible: true,
    limitations: ["Synthetic fixture evidence; not live-surface certification."],
    overall: "pass",
    redaction_rules_applied: [],
  };
}
