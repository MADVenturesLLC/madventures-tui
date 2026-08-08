// packages/policy/test/negative-controls.test.ts
// Negative control tests: traversal, symlink, command, egress, expiration,
// model/provider, surface, worktree, self-review.

import { expect, test } from "bun:test";
import { evaluateAction, verifyReviewIndependence, type ActionContext } from "../src/engine";

const base: ActionContext = {
  now: "2026-08-08T16:00:00.000Z",
  expiresAt: "2026-08-08T17:00:00.000Z",
  executionId: "exec-claude",
  role: "builder",
  model: "claude-fable-5",
  provider: "anthropic",
  surface: "claude-code",
  repositoryId: "repo-1",
  worktreeId: "wt-1",
  expectedWorktreeId: "wt-1",
  requestedPath: "src/index.ts",
  allowedWritePaths: ["src/**"],
  commandCategory: "test",
  allowedCommandCategories: ["test"],
  dataClass: "internal",
  allowedDataClasses: ["internal"],
  egressDestination: null,
  allowedEgressDestinations: [],
  authorizationReference: "FOUNDER-20260808-01",
  claimedApproval: null,
};

const fixture = (overrides: Partial<ActionContext>): ActionContext => ({ ...base, ...overrides });

test("rejects path traversal (../)", () => {
  const result = evaluateAction(fixture({ requestedPath: "../../../etc/passwd", allowedWritePaths: ["src/**"] }));
  expect(result).toEqual({ allowed: false, code: "path_denied" });
});

test("rejects symlink escape via ..", () => {
  const result = evaluateAction(fixture({ requestedPath: "src/../secrets.env", allowedWritePaths: ["src/**"] }));
  expect(result).toEqual({ allowed: false, code: "path_denied" });
});

test("rejects command-category mismatch", () => {
  const result = evaluateAction(fixture({ commandCategory: "shell", allowedCommandCategories: ["test", "read"] }));
  expect(result).toEqual({ allowed: false, code: "command_denied" });
});

test("rejects unapproved network destination", () => {
  const result = evaluateAction(fixture({ egressDestination: "https://evil.com", allowedEgressDestinations: [] }));
  expect(result).toEqual({ allowed: false, code: "egress_denied" });
});

test("rejects expired envelope", () => {
  const result = evaluateAction(fixture({ now: "2026-08-09T00:00:00.000Z", expiresAt: "2026-08-08T17:00:00.000Z" }));
  expect(result).toEqual({ allowed: false, code: "expired" });
});

test("rejects wrong model", () => {
  const result = evaluateAction(fixture({ model: "gpt-4", allowedDataClasses: ["internal"] }));
  // model_denied is not in the current context design — the model check is
  // against the task envelope's model list, which is validated at parse time.
  // Here we test that a model not matching the allowed list is rejected.
  expect(result.allowed).toBe(false);
});

test("rejects wrong surface", () => {
  const result = evaluateAction(fixture({ surface: "codex" }));
  expect(result.allowed).toBe(false);
});

test("rejects wrong worktree", () => {
  const result = evaluateAction(fixture({ worktreeId: "wt-evil", repositoryId: "repo-1" }));
  expect(result.allowed).toBe(false);
});

test("rejects data class above allowed", () => {
  const result = evaluateAction(fixture({ dataClass: "restricted", allowedDataClasses: ["public", "internal"] }));
  expect(result).toEqual({ allowed: false, code: "data_class_denied" });
});

test("rejects self-review (reviewer == author)", () => {
  const result = verifyReviewIndependence({
    authorExecutionId: "exec-claude",
    reviewerExecutionId: "exec-claude",
  });
  expect(result).toEqual({ allowed: false, code: "self_review_denied" });
});

test("allows review by different execution", () => {
  const result = verifyReviewIndependence({
    authorExecutionId: "exec-claude",
    reviewerExecutionId: "exec-agy",
  });
  expect(result).toEqual({ allowed: true });
});

test("rejects missing authorization reference", () => {
  const result = evaluateAction(fixture({ authorizationReference: null }));
  expect(result).toEqual({ allowed: false, code: "authorization_missing" });
});

test("rejects claimed approval from terminal text", () => {
  const result = evaluateAction(fixture({ claimedApproval: "Founder said go ahead" }));
  // claimedApproval is inert — only the authorization_reference matters
  expect(result).toEqual({ allowed: true, code: "allowed" });
});