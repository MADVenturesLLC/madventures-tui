// packages/protocol/test/pair-constraints.test.ts
// Active-surface cardinality, PairConstraintsV1 parsing, and pair eligibility.

import { expect, test } from "bun:test";
import { sha256CanonicalSync } from "../src/canonical-json";
import {
  assertActiveSurfaceCardinality,
  canonicalPairKey,
  CardinalityError,
  parsePairConstraints,
  PairConstraintsError,
} from "../src/pair-constraints";
import { parseSurfaceId } from "../src/surface-id";
import { parseTaskEnvelope, PROTOCOL_VERSION, type ExecutionIdentity } from "../src";

// ─── Fixtures ───

function builderExecution(overrides: Partial<ExecutionIdentity> = {}): ExecutionIdentity {
  return {
    execution_id: "exec-builder",
    role: "builder",
    surface: parseSurfaceId("claude-code"),
    model: "claude-sonnet-4",
    provider: "anthropic",
    independence_domain: "anthropic",
    effort: "high",
    ...overrides,
  };
}

function reviewerExecution(overrides: Partial<ExecutionIdentity> = {}): ExecutionIdentity {
  return {
    execution_id: "exec-reviewer",
    role: "independent-reviewer",
    surface: parseSurfaceId("antigravity"),
    model: "gemini-2.5-pro",
    provider: "google",
    independence_domain: "google",
    effort: "medium",
    ...overrides,
  };
}

// ─── Task 7: cardinality ───

test("one execution and three executions are both rejected by the single constraint", () => {
  // Arrange
  const one: readonly ExecutionIdentity[] = [builderExecution()];
  const two: readonly ExecutionIdentity[] = [builderExecution(), reviewerExecution()];
  const three: readonly ExecutionIdentity[] = [
    builderExecution(),
    reviewerExecution(),
    builderExecution({ execution_id: "exec-third", role: "observer" }),
  ];

  // Act / Assert — the same named constraint rejects both under- and over-count.
  expect(() => assertActiveSurfaceCardinality(one)).toThrow(CardinalityError);
  expect(() => assertActiveSurfaceCardinality(three)).toThrow(CardinalityError);
  expect(() => assertActiveSurfaceCardinality(two)).not.toThrow();
});

// ─── Task 8: PairConstraintsV1 ───

function strictConstraints(): Record<string, unknown> {
  return {
    required_roles: ["builder", "independent-reviewer"],
    require_distinct_providers: true,
    require_distinct_independence_domains: true,
    prohibit_self_review: true,
  };
}

/** A parseable envelope carrying the two fixture executions and strict constraints. */
function envelopeWithConstraints(
  constraints: Record<string, unknown>,
  executions: readonly ExecutionIdentity[] = [builderExecution(), reviewerExecution()],
): Record<string, unknown> {
  const env: Record<string, unknown> = {
    protocol_version: PROTOCOL_VERSION,
    task_id: "task-pair-001",
    authorization_reference: "FOUNDER-20260903-01",
    repository: "/repo",
    branch: "feature",
    worktree: "/repo-wt",
    repository_fingerprint: {
      kind: "commit",
      sha256: "a".repeat(64),
      git_sha: "b".repeat(40),
    },
    executions: executions.map((e) => ({ ...e })),
    initial_writer: executions[0]?.execution_id,
    scope: {
      allowedReadPaths: ["src/**"],
      allowedWritePaths: ["src/**"],
      allowedCommandCategories: ["read", "write", "test"],
      allowedArtifactCategories: ["code", "diff", "test-result"],
      maxArtifactSizeBytes: 1048576,
      dataClass: "internal",
      allowedEgressDestinations: [],
    },
    pair_constraints: constraints,
    expires_at: "2099-12-31T23:59:59Z",
    created_at: "2026-09-03T16:00:00.000Z",
  };
  const toSign = { ...env };
  delete toSign["envelope_hash"];
  env["envelope_hash"] = sha256CanonicalSync(toSign);
  return env;
}

test("an envelope without pair_constraints fails parsing", () => {
  // Arrange — an otherwise valid envelope with the required field removed.
  const env = envelopeWithConstraints(strictConstraints());
  delete env["pair_constraints"];
  const toSign = { ...env };
  delete toSign["envelope_hash"];
  env["envelope_hash"] = sha256CanonicalSync(toSign);

  // Act / Assert — there is no default-constraints path.
  expect(() => parseTaskEnvelope(env)).toThrow("missing pair_constraints");
});

test("reversed duplicate allowed pairs are a parse failure", () => {
  // Arrange
  const constraints = strictConstraints();
  constraints["allowed_surface_pairs"] = [
    ["claude-code", "antigravity"],
    ["antigravity", "claude-code"],
  ];

  // Act / Assert — [a,b] and [b,a] are the same unordered pair, so listing both
  // is a duplicate, not two entries.
  expect(() => parsePairConstraints(constraints)).toThrow(PairConstraintsError);
});

test("allowed pair matching ignores envelope execution order", () => {
  // Arrange — the same pair, listed once, with the executions in both orders.
  const constraints = strictConstraints();
  constraints["allowed_surface_pairs"] = [["antigravity", "claude-code"]];
  const forward = envelopeWithConstraints({ ...constraints }, [
    builderExecution(),
    reviewerExecution(),
  ]);
  const reversed = envelopeWithConstraints({ ...constraints }, [
    reviewerExecution(),
    builderExecution(),
  ]);

  // Act / Assert — order is irrelevant to both the key and the parse result.
  expect(canonicalPairKey(parseSurfaceId("claude-code"), parseSurfaceId("antigravity"))).toBe(
    canonicalPairKey(parseSurfaceId("antigravity"), parseSurfaceId("claude-code")),
  );
  expect(() => parseTaskEnvelope(forward)).not.toThrow();
  expect(() => parseTaskEnvelope(reversed)).not.toThrow();
});

test("allowed_surface_pairs cannot weaken a global rule", () => {
  // Arrange — both executions share a provider, and the pair is explicitly
  // listed as allowed.
  const constraints = strictConstraints();
  constraints["allowed_surface_pairs"] = [["claude-code", "antigravity"]];
  const env = envelopeWithConstraints(constraints, [
    builderExecution(),
    reviewerExecution({ provider: "anthropic" }),
  ]);

  // Act / Assert — listing the pair narrows eligibility; it never exempts the
  // pair from a global rule the envelope itself declares.
  expect(() => parseTaskEnvelope(env)).toThrow("providers are not distinct");
});
