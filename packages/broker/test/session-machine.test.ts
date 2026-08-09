// packages/broker/test/session-machine.test.ts
// Complete transition-table tests for the session state machine.

import { expect, test } from "bun:test";
import { transitionSession } from "../src/session-machine";
import type { SessionState } from "../src/session-machine";

test("interrupted cannot return directly to active", () => {
  expect(() => transitionSession({ kind: "interrupted" }, { type: "resume" })).toThrow("reconciliation_required");
});

test("starting transitions to active", () => {
  const result = transitionSession({ kind: "starting" }, { type: "start" });
  expect(result.kind).toBe("active");
});

test("active transitions to paused", () => {
  const result = transitionSession({ kind: "active" }, { type: "pause" });
  expect(result.kind).toBe("paused");
});

test("paused transitions to active", () => {
  const result = transitionSession({ kind: "paused" }, { type: "resume" });
  expect(result.kind).toBe("active");
});

test("active transitions to interrupted", () => {
  const result = transitionSession({ kind: "active" }, { type: "interrupt" });
  expect(result.kind).toBe("interrupted");
});

test("interrupted transitions to reconciling", () => {
  const result = transitionSession({ kind: "interrupted" }, { type: "reconcile" });
  expect(result.kind).toBe("reconciling");
});

test("reconciling transitions to active", () => {
  const result = transitionSession({ kind: "reconciling" }, { type: "resume" });
  expect(result.kind).toBe("active");
});

test("active transitions to closing", () => {
  const result = transitionSession({ kind: "active" }, { type: "close" });
  expect(result.kind).toBe("closing");
});

test("closing transitions to closed", () => {
  const result = transitionSession({ kind: "closing" }, { type: "complete" });
  expect(result.kind).toBe("closed");
});

test("starting cannot directly transition to paused", () => {
  expect(() => transitionSession({ kind: "starting" }, { type: "pause" })).toThrow();
});

test("paused transitions to interrupted", () => {
  const result = transitionSession({ kind: "paused" }, { type: "interrupt" });
  expect(result.kind).toBe("interrupted");
});

test("closed cannot transition to anything", () => {
  expect(() => transitionSession({ kind: "closed" }, { type: "start" })).toThrow();
  expect(() => transitionSession({ kind: "closed" }, { type: "pause" })).toThrow();
  expect(() => transitionSession({ kind: "closed" }, { type: "resume" })).toThrow();
});

test("closed cannot transition to interrupted", () => {
  expect(() => transitionSession({ kind: "closed" }, { type: "interrupt" })).toThrow("invalid transition: closed -> interrupt");
});

test("closing cannot transition to interrupted", () => {
  expect(() => transitionSession({ kind: "closing" }, { type: "interrupt" })).toThrow();
});

test("reconciling cannot directly transition to paused", () => {
  expect(() => transitionSession({ kind: "reconciling" }, { type: "pause" })).toThrow();
});