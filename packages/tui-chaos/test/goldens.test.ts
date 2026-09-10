// packages/tui-chaos/test/goldens.test.ts
// Golden fixture round-trip and diff-reporting tests (filesystem isolated to
// a temp repo root).

import { describe, expect, test } from "bun:test";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { compareGolden, updateGolden } from "../src/goldens";

describe("golden grids", () => {
  test("update then compare round-trips; mismatch reports row diffs", () => {
    const repo = mkdtempSync(path.join(tmpdir(), "tui-chaos-goldens-"));
    const grid = ["row one", "row two"].join("\n");

    // Missing golden is a failure with an actionable message.
    const missing = compareGolden(repo, "demo", grid);
    expect(missing.pass).toBe(false);
    expect(missing.detail).toContain("golden missing");

    updateGolden(repo, "demo", grid);
    const match = compareGolden(repo, "demo", grid);
    expect(match.pass).toBe(true);

    const changed = compareGolden(repo, "demo", "row one\nrow TWO");
    expect(changed.pass).toBe(false);
    expect(changed.detail).toContain("row 2:");
  });
});
