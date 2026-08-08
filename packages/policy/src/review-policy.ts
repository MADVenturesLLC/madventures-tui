// packages/policy/src/review-policy.ts
// Review independence verification: reviewer must not be the author.

export interface ReviewContext {
  readonly authorExecutionId: string;
  readonly reviewerExecutionId: string;
}

export type ReviewDecision =
  | { allowed: true }
  | { allowed: false; code: "self_review_denied" };

export function verifyReviewIndependence(ctx: ReviewContext): ReviewDecision {
  if (ctx.authorExecutionId === ctx.reviewerExecutionId) {
    return { allowed: false, code: "self_review_denied" };
  }
  return { allowed: true };
}