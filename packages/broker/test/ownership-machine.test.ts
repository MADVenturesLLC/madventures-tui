// packages/broker/test/ownership-machine.test.ts
// Complete transition-table and fencing token tests for the ownership state machine.

import { expect, test } from "bun:test";
import { transitionOwnership, assertCurrentWriter } from "../src/ownership-machine";
import type { OwnershipState } from "../src/ownership-machine";

const FINGERPRINT = {
  kind: "commit" as const,
  sha256: "b".repeat(64),
  git_sha: "a".repeat(40),
};

const ownedBy = (executionId: string, fencingToken: number): OwnershipState => ({
  kind: "owned",
  executionId,
  worktreeId: "wt-1",
  fencingToken,
  repositoryFingerprint: FINGERPRINT,
});

test("sender cannot write after release", () => {
  const released = transitionOwnership(ownedBy("claude", 4), {
    type: "release",
    executionId: "claude",
    fencingToken: 4,
  });
  expect(() => assertCurrentWriter(released, "claude", "wt-1", 4)).toThrow("writer_not_owned");
});

test("free transitions to owned on acquire", () => {
  const result = transitionOwnership({ kind: "free" }, {
    type: "acquire",
    executionId: "claude",
    worktreeId: "wt-1",
    repositoryFingerprint: FINGERPRINT,
  });
  expect(result.kind).toBe("owned");
  if (result.kind === "owned") {
    expect(result.executionId).toBe("claude");
    expect(result.fencingToken).toBe(1);
  }
});

test("owned transitions to transfer-requested", () => {
  const result = transitionOwnership(ownedBy("claude", 2), {
    type: "request_transfer",
    executionId: "claude",
    fencingToken: 2,
    to: "antigravity",
  });
  expect(result.kind).toBe("transfer-requested");
});

test("transfer-requested transitions to sender-released", () => {
  const result = transitionOwnership(
    { kind: "transfer-requested", executionId: "claude", worktreeId: "wt-1", fencingToken: 2, transferTo: "antigravity", repositoryFingerprint: FINGERPRINT },
    { type: "sender_release", executionId: "claude", fencingToken: 2 },
  );
  expect(result.kind).toBe("sender-released");
});

test("sender-released transitions to owned by receiver on accept", () => {
  const result = transitionOwnership(
    { kind: "sender-released", executionId: "claude", worktreeId: "wt-1", fencingToken: 2, transferTo: "antigravity", repositoryFingerprint: FINGERPRINT },
    { type: "receiver_accept", executionId: "antigravity", worktreeId: "wt-1", repositoryFingerprint: FINGERPRINT },
  );
  expect(result.kind).toBe("owned");
  if (result.kind === "owned") {
    expect(result.executionId).toBe("antigravity");
    expect(result.fencingToken).toBe(3);
  }
});

test("sender-released transitions to rejected on reject", () => {
  const result = transitionOwnership(
    { kind: "sender-released", executionId: "claude", worktreeId: "wt-1", fencingToken: 2, transferTo: "antigravity", repositoryFingerprint: FINGERPRINT },
    { type: "receiver_reject", reason: "fingerprint mismatch" },
  );
  expect(result.kind).toBe("free");
});

test("stale fencing token is rejected", () => {
  expect(() => assertCurrentWriter(ownedBy("claude", 5), "claude", "wt-1", 4)).toThrow("stale_token");
});

test("wrong executionId is rejected", () => {
  expect(() => assertCurrentWriter(ownedBy("claude", 5), "antigravity", "wt-1", 5)).toThrow("writer_not_owned");
});

test("wrong worktree is rejected", () => {
  expect(() => assertCurrentWriter(ownedBy("claude", 5), "claude", "wt-evil", 5)).toThrow("worktree_mismatch");
});

test("cannot acquire when already owned", () => {
  expect(() => transitionOwnership(ownedBy("claude", 1), {
    type: "acquire",
    executionId: "antigravity",
    worktreeId: "wt-1",
    repositoryFingerprint: FINGERPRINT,
  })).toThrow();
});

test("cannot request transfer with stale token", () => {
  expect(() => transitionOwnership(ownedBy("claude", 3), {
    type: "request_transfer",
    executionId: "claude",
    fencingToken: 2, // stale
    to: "antigravity",
  })).toThrow("stale_token");
});

test("cannot accept transfer before sender release", () => {
  expect(() => transitionOwnership(
    { kind: "transfer-requested", executionId: "claude", worktreeId: "wt-1", fencingToken: 2, transferTo: "antigravity", repositoryFingerprint: FINGERPRINT },
    { type: "receiver_accept", executionId: "antigravity", worktreeId: "wt-1", repositoryFingerprint: FINGERPRINT },
  )).toThrow();
});

test("transfer request records the intended receiver", () => {
  const result = transitionOwnership(ownedBy("claude", 2), {
    type: "request_transfer",
    executionId: "claude",
    fencingToken: 2,
    to: "antigravity",
  });
  expect(result.kind).toBe("transfer-requested");
  if (result.kind === "transfer-requested") {
    expect(result.transferTo).toBe("antigravity");
  }
});

test("non-intended receiver with matching fingerprint is rejected", () => {
  // The transfer was assigned to "antigravity". A third execution presenting
  // the correct fingerprint must not be able to accept it.
  expect(() => transitionOwnership(
    { kind: "sender-released", executionId: "claude", worktreeId: "wt-1", fencingToken: 2, transferTo: "antigravity", repositoryFingerprint: FINGERPRINT },
    { type: "receiver_accept", executionId: "intruder", worktreeId: "wt-1", repositoryFingerprint: FINGERPRINT },
  )).toThrow("receiver_not_intended");

  // The original sender cannot accept its own released transfer either.
  expect(() => transitionOwnership(
    { kind: "sender-released", executionId: "claude", worktreeId: "wt-1", fencingToken: 2, transferTo: "antigravity", repositoryFingerprint: FINGERPRINT },
    { type: "receiver_accept", executionId: "claude", worktreeId: "wt-1", repositoryFingerprint: FINGERPRINT },
  )).toThrow("receiver_not_intended");
});

test("intended receiver with wrong worktree is rejected", () => {
  expect(() => transitionOwnership(
    { kind: "sender-released", executionId: "claude", worktreeId: "wt-1", fencingToken: 2, transferTo: "antigravity", repositoryFingerprint: FINGERPRINT },
    { type: "receiver_accept", executionId: "antigravity", worktreeId: "wt-evil", repositoryFingerprint: FINGERPRINT },
  )).toThrow("worktree_mismatch");
});

test("receiver with wrong fingerprint is rejected", () => {
  const wrongFp = { kind: "commit" as const, sha256: "x".repeat(64), git_sha: "y".repeat(40) };
  expect(() => transitionOwnership(
    { kind: "sender-released", executionId: "claude", worktreeId: "wt-1", fencingToken: 2, transferTo: "antigravity", repositoryFingerprint: FINGERPRINT },
    { type: "receiver_accept", executionId: "antigravity", worktreeId: "wt-1", repositoryFingerprint: wrongFp },
  )).toThrow("fingerprint_mismatch");
});

test("release with stale token is rejected", () => {
  expect(() => transitionOwnership(ownedBy("claude", 5), {
    type: "release",
    executionId: "claude",
    fencingToken: 4, // stale
  })).toThrow("stale_token");
});

test("free state has no current writer", () => {
  expect(() => assertCurrentWriter({ kind: "free" }, "claude", "wt-1", 1)).toThrow("writer_not_owned");
});