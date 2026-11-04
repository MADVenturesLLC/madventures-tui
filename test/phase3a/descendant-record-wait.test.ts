import { expect, test } from "bun:test";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { waitForDescendantRecord } from "./runtime-harness";

// DEC-20261103-03 B2: the fixture's descendant record can be seen after it is
// created and before its content is written, so the wait must not accept it then.
test("the descendant-record wait returns the pid when the record first appears empty and is written 50 ms later", async () => {
  const root = mkdtempSync(join(tmpdir(), "madv-descendant-record-"));
  let writer: ReturnType<typeof setTimeout> | undefined;
  try {
    const record = join(root, "descendant.json");
    const pid = 424242;
    writeFileSync(record, "");
    expect(readFileSync(record, "utf8")).toBe("");
    writer = setTimeout(() => writeFileSync(record, JSON.stringify({ pid })), 50);
    expect(await waitForDescendantRecord(record)).toBe(pid);
  } finally {
    clearTimeout(writer);
    rmSync(root, { recursive: true, force: true });
  }
}, 10_000);
