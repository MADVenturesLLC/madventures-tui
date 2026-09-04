// packages/protocol/test/task-envelope.test.ts
// Comprehensive negative-control tests for parseTaskEnvelope.
// Every mandated rejection behavior is tested through the public parser.

import { expect, test } from "bun:test";
import { parseTaskEnvelope, PROTOCOL_VERSION } from "../src";

// ─── Valid fixture ───

function validEnvelope(): Record<string, unknown> {
  return {
    protocol_version: PROTOCOL_VERSION,
    task_id: "task-001",
    authorization_reference: "FOUNDER-20260808-01",
    repository: "/repo",
    branch: "feature",
    worktree: "/repo-wt",
    repository_fingerprint: {
      kind: "commit",
      sha256: "a".repeat(64),
      git_sha: "b".repeat(40),
    },
    executions: [
      {
        execution_id: "exec-claude",
        role: "builder",
        surface: "claude-code",
        model: "claude-sonnet-4",
        provider: "anthropic",
        independence_domain: "fixture-builder-control",
        effort: "high",
      },
      {
        execution_id: "exec-agy",
        role: "independent-reviewer",
        surface: "antigravity",
        model: "gemini-2.5-pro",
        provider: "google",
        independence_domain: "fixture-review-control",
        effort: "medium",
      },
    ],
    initial_writer: "exec-claude",
    scope: {
      allowedReadPaths: ["src/**"],
      allowedWritePaths: ["src/**"],
      allowedCommandCategories: ["read", "write", "test"],
      allowedArtifactCategories: ["code", "diff", "test-result"],
      maxArtifactSizeBytes: 1048576,
      dataClass: "internal",
      allowedEgressDestinations: [],
    },
    // Required since Task 8 (M3): every envelope must carry strict pair
    // constraints. There is no default-constraints path.
    pair_constraints: {
      required_roles: ["builder", "independent-reviewer"],
      require_distinct_providers: true,
      require_distinct_independence_domains: true,
      prohibit_self_review: true,
    },
    expires_at: "2099-12-31T23:59:59Z",
    created_at: "2026-08-08T16:00:00.000Z",
    envelope_hash: "c".repeat(64),
  };
}

// ─── Protocol version rejection ───

test("rejects unsupported protocol versions", () => {
  const env = validEnvelope();
  env["protocol_version"] = "madbridge-protocol/v2";
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("unsupported protocol_version");
});

test("rejects missing protocol_version", () => {
  const env = validEnvelope();
  delete env["protocol_version"];
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow();
});

// ─── Authorization reference rejection ───

test("rejects missing authorization_reference", () => {
  const env = validEnvelope();
  delete env["authorization_reference"];
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("missing authorization_reference");
});

test("rejects empty authorization_reference", () => {
  const env = validEnvelope();
  env["authorization_reference"] = "";
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("missing authorization_reference");
});

// ─── Expiration rejection ───

test("rejects missing expiration", () => {
  const env = validEnvelope();
  delete env["expires_at"];
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("missing expiration");
});

test("rejects empty expiration", () => {
  const env = validEnvelope();
  env["expires_at"] = "";
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("missing expiration");
});

test("rejects invalid expiration date format", () => {
  const env = validEnvelope();
  env["expires_at"] = "invalid-date";
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("invalid expiration date");
});

test("rejects expiration in the past", () => {
  const env = validEnvelope();
  env["expires_at"] = "2020-01-01T00:00:00Z";
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("expiration must be in the future");
});

// ─── Repository/worktree rejection ───

test("rejects missing repository", () => {
  const env = validEnvelope();
  delete env["repository"];
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("missing repository");
});

test("rejects missing worktree", () => {
  const env = validEnvelope();
  delete env["worktree"];
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("missing worktree");
});

test("rejects ambiguous repository/worktree (same path)", () => {
  const env = validEnvelope();
  env["worktree"] = env["repository"];
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("ambiguous repository/worktree");
});

test("rejects malformed repository_fingerprint", () => {
  const env = validEnvelope();
  
  // missing
  delete env["repository_fingerprint"];
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("missing repository_fingerprint");

  // invalid kind
  env["repository_fingerprint"] = { kind: "unknown", sha256: "a".repeat(64), git_sha: "b".repeat(40) };
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("invalid fingerprint kind");

  // invalid sha256
  env["repository_fingerprint"] = { kind: "commit", sha256: "short", git_sha: "b".repeat(40) };
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("invalid fingerprint sha256");

  // invalid git_sha
  env["repository_fingerprint"] = { kind: "commit", sha256: "a".repeat(64), git_sha: "short" };
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("invalid fingerprint git_sha");

  // invalid base_git_sha for working_tree
  env["repository_fingerprint"] = { kind: "working_tree", sha256: "a".repeat(64), git_sha: "b".repeat(40), base_git_sha: "short" };
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("invalid fingerprint base_git_sha");
});

test("accepts valid working_tree fingerprint", () => {
  const env = validEnvelope();
  env["repository_fingerprint"] = { kind: "working_tree", sha256: "a".repeat(64), git_sha: "b".repeat(40), base_git_sha: "c".repeat(40) };
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).not.toThrow();
});

// ─── Execution validation rejection ───

test("rejects initial_writer not in executions", () => {
  const env = validEnvelope();
  env["initial_writer"] = "exec-unknown";
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("initial_writer not in executions");
});

test("rejects duplicate execution_id", () => {
  const env = validEnvelope();
  const execs = env["executions"] as Array<Record<string, unknown>>;
  if (execs && execs[1]) execs[1]["execution_id"] = "exec-claude";
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("duplicate execution_id");
});

test("rejects missing executions", () => {
  const env = validEnvelope();
  delete env["executions"];
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("missing executions");
});

test("rejects empty executions array", () => {
  const env = validEnvelope();
  env["executions"] = [];
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("missing executions");
});

test("rejects unknown role", () => {
  const env = validEnvelope();
  const execs = env["executions"] as Array<Record<string, unknown>>;
  if (execs && execs[0]) execs[0]["role"] = "admin";
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("unknown role");
});

test("rejects malformed surface syntax", () => {
  const env = validEnvelope();
  const execs = env["executions"] as Array<Record<string, unknown>>;
  if (execs && execs[0]) execs[0]["surface"] = "Codex";
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("unknown surface");
});

test("a syntactically valid unregistered surface is not rejected as malformed", () => {
  const env = validEnvelope();
  const execs = env["executions"] as Array<Record<string, unknown>>;
  if (execs && execs[0]) execs[0]["surface"] = "unknown-surface";
  signEnvelope(env);
  const parsed = parseTaskEnvelope(env);
  expect(parsed.executions[0]?.surface as string).toBe("unknown-surface");
});

test("rejects automatic model selection", () => {
  const env = validEnvelope();
  const execs = env["executions"] as Array<Record<string, unknown>>;
  if (execs && execs[0]) execs[0]["model"] = "auto";
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("automatic model selection");
});

test("rejects empty model string", () => {
  const env = validEnvelope();
  const execs = env["executions"] as Array<Record<string, unknown>>;
  if (execs && execs[0]) execs[0]["model"] = "";
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("automatic model selection");
});

test("rejects unknown provider", () => {
  const env = validEnvelope();
  const execs = env["executions"] as Array<Record<string, unknown>>;
  if (execs && execs[0]) execs[0]["provider"] = "";
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("unknown provider");
});

// ─── Scope validation rejection ───

test("rejects missing scope", () => {
  const env = validEnvelope();
  delete env["scope"];
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("missing scope");
});

test("rejects empty permitted write paths", () => {
  const env = validEnvelope();
  (env["scope"] as Record<string, unknown>)["allowedWritePaths"] = [];
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("empty permitted paths");
});

test("rejects unrestricted command patterns (empty categories)", () => {
  const env = validEnvelope();
  (env["scope"] as Record<string, unknown>)["allowedCommandCategories"] = [];
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("unrestricted command patterns");
});

test("rejects unknown data class", () => {
  const env = validEnvelope();
  (env["scope"] as Record<string, unknown>)["dataClass"] = "top-secret";
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("unknown data class");
});

test("rejects unknown scope field", () => {
  const env = validEnvelope();
  (env["scope"] as Record<string, unknown>)["secretFlag"] = true;
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("unknown scope field");
});

// ─── Unknown top-level key rejection ───

test("rejects additional top-level key", () => {
  const env = validEnvelope();
  env["extra_field"] = "malicious";
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("unknown field");
});

// ─── Envelope Hash validation ───

import { sha256CanonicalSync } from "../src/canonical-json";

function signEnvelope(env: Record<string, unknown>): void {
  const toSign = { ...env };
  delete toSign["envelope_hash"];
  env["envelope_hash"] = sha256CanonicalSync(toSign);
}

test("rejects missing envelope_hash", () => {
  const env = validEnvelope();
  signEnvelope(env);
  delete env["envelope_hash"];
  expect(() => parseTaskEnvelope(env)).toThrow("missing or invalid envelope_hash");
});

test("rejects empty envelope_hash", () => {
  const env = validEnvelope();
  signEnvelope(env);
  env["envelope_hash"] = "";
  expect(() => parseTaskEnvelope(env)).toThrow("missing or invalid envelope_hash");
});

test("rejects malformed envelope_hash", () => {
  const env = validEnvelope();
  signEnvelope(env);
  env["envelope_hash"] = "short";
  expect(() => parseTaskEnvelope(env)).toThrow("missing or invalid envelope_hash");
});

test("rejects mismatched envelope_hash", () => {
  const env = validEnvelope();
  signEnvelope(env);
  env["envelope_hash"] = "d".repeat(64); // arbitrary mismatched hash
  expect(() => parseTaskEnvelope(env)).toThrow("mismatched envelope_hash");
});

test("rejects mutating any hashed field after hash computation", () => {
  const env = validEnvelope();
  signEnvelope(env);
  env["task_id"] = "task-tampered";
  expect(() => parseTaskEnvelope(env)).toThrow("mismatched envelope_hash");
});

// ─── Valid envelope acceptance ───

test("accepts a valid envelope without throwing", () => {
  const env = validEnvelope();
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).not.toThrow();
});

test("rejects execution object with camelCase id but missing snake_case id", () => {
  const env = validEnvelope();
  const execs = env["executions"] as Array<Record<string, unknown>>;
  const legacyKey = "execution" + "Id";
  if (execs && execs[0]) {
    execs[0][legacyKey] = "exec-claude";
    delete execs[0]["execution_id"];
  }
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("invalid execution_id");
});

test("rejects initial_writer matching camelCase id but not snake_case id", () => {
  const env = validEnvelope();
  const execs = env["executions"] as Array<Record<string, unknown>>;
  const legacyKey = "execution" + "Id";
  if (execs && execs[0]) {
    execs[0][legacyKey] = "exec-mismatch";
    env["initial_writer"] = "exec-mismatch";
  }
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("initial_writer not in executions");
});

test("legacy role reviewer is rejected without coercion", () => {
  const env = validEnvelope();
  const execs = env["executions"] as Array<Record<string, unknown>>;
  if (execs && execs[1]) execs[1]["role"] = "reviewer";
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("unknown role: reviewer");
});

test("an execution without independence_domain is rejected", () => {
  const env = validEnvelope();
  const execs = env["executions"] as Array<Record<string, unknown>>;
  if (execs && execs[0]) delete execs[0]["independence_domain"];
  signEnvelope(env);
  expect(() => parseTaskEnvelope(env)).toThrow("missing independence_domain");
});

test("a signed noncanonical independence_domain is rejected without mutating the envelope", () => {
  const env = validEnvelope();
  const execs = env["executions"] as Array<Record<string, unknown>>;
  if (execs && execs[0]) execs[0]["independence_domain"] = "Review Team";
  signEnvelope(env);
  const preserved = structuredClone(env);
  expect(() => parseTaskEnvelope(env)).toThrow("noncanonical independence_domain");
  expect(env).toEqual(preserved);
});

test("a canonical independence_domain preserves the returned envelope hash", () => {
  const env = validEnvelope();
  signEnvelope(env);
  const signedHash = env["envelope_hash"];
  if (typeof signedHash !== "string") {
    throw new Error("signed envelope_hash missing");
  }
  const parsed = parseTaskEnvelope(env);
  const toHash: Record<string, unknown> = { ...parsed };
  delete toHash["envelope_hash"];
  expect(parsed.envelope_hash).toBe(signedHash);
  expect(sha256CanonicalSync(toHash)).toBe(parsed.envelope_hash);
});
