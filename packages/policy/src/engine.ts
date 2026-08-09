// packages/policy/src/engine.ts
// Policy engine: evaluates actions against task envelope constraints.
// Fail-closed: any missing or mismatched constraint denies the action.

import { assertWithinAllowedPath } from "./path-policy";
import { isEgressAllowed } from "./egress-policy";
import { verifyReviewIndependence as checkReview, type ReviewContext, type ReviewDecision } from "./review-policy";

export interface ActionContext {
  now: string;
  expiresAt: string;
  executionId: string;
  role: string;
  model: string;
  provider: string;
  surface: string;
  repositoryId: string;
  worktreeId: string;
  expectedWorktreeId: string;
  // Trusted repository/worktree root from the task envelope / policy input.
  // Never derived from process.cwd().
  repositoryRoot: string;
  requestedPath: string;
  allowedWritePaths: readonly string[];
  commandCategory: string;
  allowedCommandCategories: readonly string[];
  dataClass: string;
  allowedDataClasses: readonly string[];
  egressDestination: string | null;
  allowedEgressDestinations: readonly string[];
  authorizationReference: string | null;
  claimedApproval: string | null;
}

export type PolicyDecision =
  | { allowed: true; code: "allowed" }
  | { allowed: false; code: "authorization_missing" | "expired" | "role_denied" | "model_denied" | "surface_denied" | "repository_denied" | "path_denied" | "command_denied" | "data_class_denied" | "egress_denied" | "self_review_denied" };

const KNOWN_SURFACES = new Set(["claude-code", "antigravity"]);
const KNOWN_ROLES = new Set(["builder", "reviewer", "observer"]);

// Known models per surface — used for model validation
const SURFACE_MODELS: Record<string, Set<string>> = {
  "claude-code": new Set([
    "claude-sonnet-4", "claude-opus-4", "claude-fable-5",
    "claude-3.5-sonnet", "claude-3.5-haiku",
  ]),
  "antigravity": new Set([
    "gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash",
  ]),
};

export function evaluateAction(context: ActionContext): PolicyDecision {
  // 1. Authorization reference — must be present
  if (context.authorizationReference === null || context.authorizationReference.length === 0) {
    return { allowed: false, code: "authorization_missing" };
  }

  // claimedApproval is inert — it cannot create authority

  // 2. Expiration
  if (new Date(context.now).getTime() > new Date(context.expiresAt).getTime()) {
    return { allowed: false, code: "expired" };
  }

  // 3. Surface validation
  if (!KNOWN_SURFACES.has(context.surface)) {
    return { allowed: false, code: "surface_denied" };
  }

  // 4. Role validation
  if (!KNOWN_ROLES.has(context.role)) {
    return { allowed: false, code: "role_denied" };
  }

  // 5. Worktree validation — must match expected worktree
  if (context.worktreeId !== context.expectedWorktreeId) {
    return { allowed: false, code: "repository_denied" };
  }

  // 6. Path validation — root comes from the task envelope / policy input,
  //    never from process.cwd(). Missing root fails closed.
  if (context.repositoryRoot.length === 0) {
    return { allowed: false, code: "path_denied" };
  }
  try {
    assertWithinAllowedPath(context.requestedPath, context.allowedWritePaths, context.repositoryRoot);
  } catch {
    return { allowed: false, code: "path_denied" };
  }

  // 7. Command category validation
  if (!context.allowedCommandCategories.includes(context.commandCategory)) {
    return { allowed: false, code: "command_denied" };
  }

  // 8. Data class validation
  if (!context.allowedDataClasses.includes(context.dataClass)) {
    return { allowed: false, code: "data_class_denied" };
  }

  // 9. Egress validation
  if (!isEgressAllowed(context.egressDestination, context.allowedEgressDestinations)) {
    return { allowed: false, code: "egress_denied" };
  }

  // 10. Model validation — model must be non-empty, not "auto",
  //     and must be a known model for the surface
  if (context.model.length === 0 || context.model === "auto") {
    return { allowed: false, code: "model_denied" };
  }
  const surfaceModels = SURFACE_MODELS[context.surface];
  if (surfaceModels && !surfaceModels.has(context.model)) {
    return { allowed: false, code: "model_denied" };
  }

  return { allowed: true, code: "allowed" };
}

// Re-export for convenience
export { verifyReviewIndependence } from "./review-policy";
export type { ReviewContext, ReviewDecision } from "./review-policy";
export { assertWithinAllowedPath } from "./path-policy";
export { classifyCommand } from "./command-policy";
export { isEgressAllowed } from "./egress-policy";