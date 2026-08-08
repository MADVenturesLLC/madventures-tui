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
        executionId: "exec-claude",
        role: "builder",
        surface: "claude-code",
        model: "claude-sonnet-4",
        provider: "anthropic",
        effort: "high",
      },
      {
        executionId: "exec-agy",
        role: "reviewer",
        surface: "antigravity",
        model: "gemini-2.5-pro",
        provider: "google",
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
    expires_at: "2026-08-08T17:00:00.000Z",
    created_at: "2026-08-08T16:00:00.000Z",
    envelope_hash: "c".repeat(64),
  };
}

// ─── Protocol version rejection ───

test("rejects unsupported protocol versions", () => {
  const env = validEnvelope();
  env["protocol_version"] = "madbridge-protocol/v2";
  expect(() => parseTaskEnvelope(env)).toThrow("unsupported protocol_version");
});

test("rejects missing protocol_version", () => {
  const env = validEnvelope();
  delete env["protocol_version"];
  expect(() => parseTaskEnvelope(env)).toThrow();
});

// ─── Authorization reference rejection ───

test("rejects missing authorization_reference", () => {
  const env = validEnvelope();
  delete env["authorization_reference"];
  expect(() => parseTaskEnvelope(env)).toThrow("missing authorization_reference");
});

test("rejects empty authorization_reference", () => {
  const env = validEnvelope();
  env["authorization_reference"] = "";
  expect(() => parseTaskEnvelope(env)).toThrow("missing authorization_reference");
});

// ─── Expiration rejection ───

test("rejects missing expiration", () => {
  const env = validEnvelope();
  delete env["expires_at"];
  expect(() => parseTaskEnvelope(env)).toThrow("missing expiration");
});

test("rejects empty expiration", () => {
  const env = validEnvelope();
  env["expires_at"] = "";
  expect(() => parseTaskEnvelope(env)).toThrow("missing expiration");
});

// ─── Repository/worktree rejection ───

test("rejects missing repository", () => {
  const env = validEnvelope();
  delete env["repository"];
  expect(() => parseTaskEnvelope(env)).toThrow("missing repository");
});

test("rejects missing worktree", () => {
  const env = validEnvelope();
  delete env["worktree"];
  expect(() => parseTaskEnvelope(env)).toThrow("missing worktree");
});

test("rejects ambiguous repository/worktree (same path)", () => {
  const env = validEnvelope();
  env["worktree"] = env["repository"];
  expect(() => parseTaskEnvelope(env)).toThrow("ambiguous repository/worktree");
});

// ─── Execution validation rejection ───

test("rejects missing executions", () => {
  const env = validEnvelope();
  delete env["executions"];
  expect(() => parseTaskEnvelope(env)).toThrow("missing executions");
});

test("rejects empty executions array", () => {
  const env = validEnvelope();
  env["executions"] = [];
  expect(() => parseTaskEnvelope(env)).toThrow("missing executions");
});

test("rejects unknown role", () => {
  const env = validEnvelope();
  const execs = env["executions"] as Array<Record<string, unknown>>;
  if (execs[0] !== undefined) execs[0]["role"] = "admin";
  expect(() => parseTaskEnvelope(env)).toThrow("unknown role");
});

test("rejects unknown surface", () => {
  const env = validEnvelope();
  const execs = env["executions"] as Array<Record<string, unknown>>;
  if (execs[0] !== undefined) execs[0]["surface"] = "codex";
  expect(() => parseTaskEnvelope(env)).toThrow("unknown surface");
});

test("rejects automatic model selection", () => {
  const env = validEnvelope();
  const execs = env["executions"] as Array<Record<string, unknown>>;
  if (execs[0] !== undefined) execs[0]["model"] = "auto";
  expect(() => parseTaskEnvelope(env)).toThrow("automatic model selection");
});

test("rejects empty model string", () => {
  const env = validEnvelope();
  const execs = env["executions"] as Array<Record<string, unknown>>;
  if (execs[0] !== undefined) execs[0]["model"] = "";
  expect(() => parseTaskEnvelope(env)).toThrow("automatic model selection");
});

test("rejects unknown provider", () => {
  const env = validEnvelope();
  const execs = env["executions"] as Array<Record<string, unknown>>;
  if (execs[0] !== undefined) execs[0]["provider"] = "";
  expect(() => parseTaskEnvelope(env)).toThrow("unknown provider");
});

// ─── Scope validation rejection ───

test("rejects missing scope", () => {
  const env = validEnvelope();
  delete env["scope"];
  expect(() => parseTaskEnvelope(env)).toThrow("missing scope");
});

test("rejects empty permitted write paths", () => {
  const env = validEnvelope();
  (env["scope"] as Record<string, unknown>)["allowedWritePaths"] = [];
  expect(() => parseTaskEnvelope(env)).toThrow("empty permitted paths");
});

test("rejects unrestricted command patterns (empty categories)", () => {
  const env = validEnvelope();
  (env["scope"] as Record<string, unknown>)["allowedCommandCategories"] = [];
  expect(() => parseTaskEnvelope(env)).toThrow("unrestricted command patterns");
});

test("rejects unknown data class", () => {
  const env = validEnvelope();
  (env["scope"] as Record<string, unknown>)["dataClass"] = "top-secret";
  expect(() => parseTaskEnvelope(env)).toThrow("unknown data class");
});

test("rejects unknown scope field", () => {
  const env = validEnvelope();
  (env["scope"] as Record<string, unknown>)["secretFlag"] = true;
  expect(() => parseTaskEnvelope(env)).toThrow("unknown scope field");
});

// ─── Unknown top-level key rejection ───

test("rejects additional top-level key", () => {
  const env = validEnvelope();
  env["extra_field"] = "malicious";
  expect(() => parseTaskEnvelope(env)).toThrow("unknown field");
});

// ─── Valid envelope acceptance ───

test("accepts a valid envelope without throwing", () => {
  const env = validEnvelope();
  expect(() => parseTaskEnvelope(env)).not.toThrow();
});