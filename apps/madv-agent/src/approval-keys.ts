// apps/madv-agent/src/approval-keys.ts
// The keyboard contract for the approval dialog, as a pure function.
//
// It exists because the first version of the pane defined `settle` and never
// called it: the dialog rendered, `y` did nothing, and the turn waited forever.
// The tests injected a handler directly, so they never touched the keyboard
// route at all. A pure function can be tested; a closure buried in a component
// cannot — and App.tsx is asserted to route through it.

export type ApprovalKeyDecision = "grant" | "deny" | "ignore";

/** `y` grants, `n`/escape deny, everything else is ignored (never a yes). */
export function decideApprovalKey(name: string | undefined): ApprovalKeyDecision {
  switch ((name ?? "").toLowerCase()) {
    case "y":
      return "grant";
    case "n":
    case "escape":
      return "deny";
    default:
      // Deliberately not "deny": a stray key must not change the answer, and a
      // keypress that lands while the operator is reading must not resolve the
      // gate either way. Only an explicit y or n decides.
      return "ignore";
  }
}
