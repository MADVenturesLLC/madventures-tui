// packages/artifact-store/test/store.test.ts
// Content-addressed artifact store tests.

import { expect, test } from "bun:test";
import { ArtifactStore } from "../src/store";
import { mkdtempSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

let counter = 0;

function testStore(): ArtifactStore {
  const dir = mkdtempSync(join(tmpdir(), `madv-art-${counter++}`));
  return new ArtifactStore(dir);
}

test("publish stores content and returns hash", () => {
  const store = testStore();
  const data = new TextEncoder().encode("hello world");
  const meta = store.publish(data, {
    task_id: "task-001",
    type: "document",
    repo_fingerprint: "abc123",
  });
  expect(meta.sha256).toMatch(/^[0-9a-f]{64}$/);
  expect(meta.size_bytes).toBe(data.length);
});

test("publish deduplicates identical content", () => {
  const store = testStore();
  const data = new TextEncoder().encode("same content");
  const m1 = store.publish(data, { task_id: "task-001", type: "code", repo_fingerprint: "abc" });
  const m2 = store.publish(data, { task_id: "task-001", type: "code", repo_fingerprint: "abc" });
  expect(m1.sha256).toBe(m2.sha256);
});

test("inspect returns metadata without bytes", () => {
  const store = testStore();
  const data = new TextEncoder().encode("inspectable");
  const published = store.publish(data, { task_id: "task-001", type: "report", repo_fingerprint: "abc" });
  const inspected = store.inspect(published.sha256);
  expect(inspected).not.toBeNull();
  expect(inspected!.sha256).toBe(published.sha256);
  expect(inspected!.size_bytes).toBe(data.length);
});

test("inspect returns null for non-existent hash", () => {
  const store = testStore();
  const result = store.inspect("nonexistent");
  expect(result).toBeNull();
});

test("publish rejects mismatched declared hash", () => {
  const store = testStore();
  const data = new TextEncoder().encode("content");
  expect(() => store.publish(data, {
    task_id: "task-001",
    type: "code",
    repo_fingerprint: "abc",
    declared_hash: "wronghash",
  })).toThrow("hash mismatch");
});