import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

describe("workspace boundaries", () => {
  test("React presentation does not import policy or ledger implementations", () => {
    const app = readFileSync("apps/madbridge/src/tui/App.tsx", "utf8");
    expect(app).not.toMatch(/packages\/(policy|ledger)|@madventures\/(policy|ledger)/);
  });
});