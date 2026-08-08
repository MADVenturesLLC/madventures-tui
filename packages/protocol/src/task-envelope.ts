// packages/protocol/src/task-envelope.ts
// Task envelope V1 — the sole authority source for a session.

import { sha256Canonical } from "./canonical-json";

export const PROTOCOL_VERSION = "madbridge-protocol/v1" as const;

export type CliSurface = "claude-code" | "antigravity";

export type ExecutionRole = "builder" | "reviewer" | "observer";

export type DataClass = "public" | "internal" | "confidential" | "restricted";

export type CommandCategory = "read" | "write" | "build" | "test" | "git" | "shell" | "network";

export type ArtifactCategory = "code" | "diff" | "document" | "report" | "test-result";

export type Effort = "low" | "medium" | "high";

export const KNOWN_ROLES: readonly ExecutionRole[] = ["builder", "reviewer", "observer"];
export const KNOWN_SURFACES: readonly CliSurface[] = ["claude-code", "antigravity"];
export const KNOWN_DATA_CLASSES: readonly DataClass[] = ["public", "internal", "confidential", "restricted"];
export const KNOWN_COMMAND_CATEGORIES: readonly CommandCategory[] = ["read", "write", "build", "test", "git", "shell", "network"];

export interface ExecutionIdentity {
  readonly executionId: string;
  readonly role: ExecutionRole;
  readonly surface: CliSurface;
  readonly model: string;        // exact model, not "auto"
  readonly provider: string;     // e.g. "anthropic", "google"
  readonly effort: Effort;
}

export interface RepositoryFingerprint {
  readonly kind: "commit" | "working_tree";
  readonly sha256: string;
  readonly git_sha: string;
  readonly base_git_sha?: string; // only for working_tree
}

export interface TaskScope {
  readonly allowedReadPaths: readonly string[];
  readonly allowedWritePaths: readonly string[];
  readonly allowedCommandCategories: readonly CommandCategory[];
  readonly allowedArtifactCategories: readonly ArtifactCategory[];
  readonly maxArtifactSizeBytes: number;
  readonly dataClass: DataClass;
  readonly allowedEgressDestinations: readonly string[];
}

export interface TaskEnvelopeV1 {
  readonly protocol_version: typeof PROTOCOL_VERSION;
  readonly task_id: string;
  readonly authorization_reference: string;
  readonly repository: string;
  readonly branch: string;
  readonly worktree: string;
  readonly repository_fingerprint: RepositoryFingerprint;
  readonly executions: readonly ExecutionIdentity[];
  readonly initial_writer: string; // executionId
  readonly scope: TaskScope;
  readonly expires_at: string; // ISO 8601
  readonly created_at: string;
  readonly envelope_hash: string;
}

const KNOWN_TOP_LEVEL_KEYS = new Set([
  "protocol_version", "task_id", "authorization_reference",
  "repository", "branch", "worktree", "repository_fingerprint",
  "executions", "initial_writer", "scope", "expires_at",
  "created_at", "envelope_hash",
]);

const SCOPE_KEYS = new Set([
  "allowedReadPaths", "allowedWritePaths", "allowedCommandCategories",
  "allowedArtifactCategories", "maxArtifactSizeBytes", "dataClass",
  "allowedEgressDestinations",
]);

export function parseTaskEnvelope(raw: Record<string, unknown>): TaskEnvelopeV1 {
  // Check for unknown top-level keys
  for (const key of Object.keys(raw)) {
    if (!KNOWN_TOP_LEVEL_KEYS.has(key)) {
      throw new Error(`unknown field: ${key}`);
    }
  }

  // Protocol version
  if (raw["protocol_version"] !== PROTOCOL_VERSION) {
    throw new Error(`unsupported protocol_version: ${String(raw["protocol_version"])}`);
  }

  // Authorization reference — must be present and non-empty
  const authRef = raw["authorization_reference"];
  if (typeof authRef !== "string" || authRef.length === 0) {
    throw new Error("missing authorization_reference");
  }

  // Expiration — must be present
  const expiresAt = raw["expires_at"];
  if (typeof expiresAt !== "string" || expiresAt.length === 0) {
    throw new Error("missing expiration");
  }

  // Repository/worktree — must not be ambiguous
  const repository = raw["repository"];
  const worktree = raw["worktree"];
  if (typeof repository !== "string" || repository.length === 0) {
    throw new Error("missing repository");
  }
  if (typeof worktree !== "string" || worktree.length === 0) {
    throw new Error("missing worktree");
  }
  if (repository === worktree) {
    throw new Error("ambiguous repository/worktree");
  }

  // Executions — validate each
  const executions = raw["executions"];
  if (!Array.isArray(executions) || executions.length === 0) {
    throw new Error("missing executions");
  }
  for (const exec of executions) {
    if (typeof exec !== "object" || exec === null) {
      throw new Error("invalid execution entry");
    }
    const e = exec as Record<string, unknown>;
    if (!KNOWN_ROLES.includes(e["role"] as ExecutionRole)) {
      throw new Error(`unknown role: ${String(e["role"])}`);
    }
    if (!KNOWN_SURFACES.includes(e["surface"] as CliSurface)) {
      throw new Error(`unknown surface: ${String(e["surface"])}`);
    }
    if (typeof e["model"] !== "string" || e["model"] === "auto" || e["model"].length === 0) {
      throw new Error("automatic model selection is prohibited");
    }
    if (typeof e["provider"] !== "string" || e["provider"].length === 0) {
      throw new Error(`unknown provider: ${String(e["provider"])}`);
    }
  }

  // Scope — must have non-empty permitted paths and non-unrestricted commands
  const scope = raw["scope"];
  if (typeof scope !== "object" || scope === null) {
    throw new Error("missing scope");
  }
  const s = scope as Record<string, unknown>;
  for (const key of Object.keys(s)) {
    if (!SCOPE_KEYS.has(key)) {
      throw new Error(`unknown scope field: ${key}`);
    }
  }
  if (!Array.isArray(s["allowedWritePaths"]) || s["allowedWritePaths"].length === 0) {
    throw new Error("empty permitted paths");
  }
  if (!Array.isArray(s["allowedCommandCategories"]) || s["allowedCommandCategories"].length === 0) {
    throw new Error("unrestricted command patterns");
  }
  if (!KNOWN_DATA_CLASSES.includes(s["dataClass"] as DataClass)) {
    throw new Error(`unknown data class: ${String(s["dataClass"])}`);
  }

  return raw as unknown as TaskEnvelopeV1;
}