// apps/madv-agent/test/approval-keys.test.ts
// Copilot found that `settle` was defined in App.tsx and never called: the
// dialog rendered, `y` did nothing, and the turn waited forever. The handler
// tests injected a handler directly, so the keyboard route was never exercised.
// These two tests cover what that gap allowed: the decision itself, and the
// wiring that must exist for it to mean anything.

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { decideApprovalKey } from "../src/approval-keys";

describe("approval keys", () => {
  test("y grants, n and escape deny, everything else is ignored", () => {
    expect(decideApprovalKey("y")).toBe("grant");
    expect(decideApprovalKey("Y")).toBe("grant");
    expect(decideApprovalKey("n")).toBe("deny");
    expect(decideApprovalKey("escape")).toBe("deny");
    for (const other of ["", " ", "a", "enter", "tab", "1", "x", undefined]) {
      expect(decideApprovalKey(other as string | undefined)).toBe("ignore");
    }
  });

  test("BITE: App.tsx routes the keyboard through the decision and settles", () => {
    const src = readFileSync(new URL("../src/tui/App.tsx", import.meta.url), "utf8");
    // The handler must consult the pure decision…
    expect(src).toContain("decideApprovalKey(");
    // …and must actually settle the pending request on that decision.
    expect(src).toMatch(/decision === "grant"[\s\S]{0,80}settle\(true\)/);
    expect(src).toMatch(/decision === "deny"[\s\S]{0,80}settle\(false/);
    // A regression to Ctrl+C-only is what this catches.
    expect(src).not.toMatch(/useKeyboard\(\(key\) => \{\s*if \(key\.name === "c" && key\.ctrl\) \{\s*props\.onExit\(\);\s*\}\s*\}\);/);
  });
});
