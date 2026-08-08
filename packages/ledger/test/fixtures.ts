// packages/ledger/test/fixtures.ts
// Test fixtures for ledger tests.

import { Ledger } from "../src/ledger";
import { PROTOCOL_VERSION } from "@madventures/protocol";
import type { BridgeEventV1 } from "@madventures/protocol";
import { join } from "path";
import { mkdtempSync } from "fs";
import { tmpdir } from "os";

let counter = 0;

export function testLedger(): Ledger {
  const dir = mkdtempSync(join(tmpdir(), "madv-ledger-"));
  const dbPath = join(dir, `test-${counter++}.sqlite3`);
  return new Ledger(dbPath);
}

export function validEvent(): BridgeEventV1 {
  return {
    protocol_version: PROTOCOL_VERSION,
    event_id: crypto.randomUUID(),
    session_id: "sess-test-001",
    parent_event_id: null,
    sender_execution_id: "exec-claude",
    receiver_execution_id: "exec-agy",
    sender_role: "builder",
    sender_surface: "claude-code",
    sender_model: "claude-sonnet-4",
    sender_provider: "anthropic",
    task_envelope_hash: "a".repeat(64),
    repository_fingerprint: {
      kind: "commit",
      sha256: "b".repeat(64),
      git_sha: "c".repeat(40),
    },
    event_type: "message",
    payload_hash: "",
    payload: { text: "hello from claude" },
    created_at: "2026-08-08T16:00:00.000Z",
    previous_event_hash: "0".repeat(64),
  };
}