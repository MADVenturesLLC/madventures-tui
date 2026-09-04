// packages/protocol/test/pair-constraints.test.ts
// Active-surface cardinality, PairConstraintsV1 parsing, and pair eligibility.

import { expect, test } from "bun:test";
import { assertActiveSurfaceCardinality, CardinalityError } from "../src/pair-constraints";
import { parseSurfaceId } from "../src/surface-id";
import type { ExecutionIdentity } from "../src/task-envelope";

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
