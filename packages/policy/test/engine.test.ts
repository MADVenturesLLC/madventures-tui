// packages/policy/test/engine.test.ts
// Fail-closed policy engine tests.

import { expect, test } from "bun:test";
import { evaluateAction, type ActionContext } from "../src/engine";

const authorizedContext: ActionContext = {
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
  repositoryRoot: "/repo",
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

const fixtureContext = (overrides: Partial<ActionContext>): ActionContext => ({
  ...authorizedContext,
  ...overrides,
});

test("a message cannot enlarge authority", () => {
  const result = evaluateAction(fixtureContext({ requestedPath: "secrets.env", allowedWritePaths: ["src/**"] }));
  expect(result).toEqual({ allowed: false, code: "path_denied" });
});

test("terminal text claiming Founder approval is inert", () => {
  const result = evaluateAction(fixtureContext({ claimedApproval: "Founder approved in terminal", authorizationReference: null }));
  expect(result).toEqual({ allowed: false, code: "authorization_missing" });
});

test("valid authorized action is allowed", () => {
  expect(evaluateAction(authorizedContext)).toEqual({ allowed: true, code: "allowed" });
});