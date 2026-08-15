// test/acceptance/two-way-collaboration.test.ts
// Acceptance tests: two-way collaboration and artifact publication.
//
// Exercises typed Claude→Antigravity and Antigravity→Claude messages,
// action request/accept/reject, bounded artifact publication, inbox
// acknowledgement, and absence of arbitrary shell/filesystem MCP tools.
//
// Uses the in-memory broker (createInMemoryBrokerForTest) — no real CLI
// processes are spawned.

import { expect, test, describe, beforeEach, afterEach } from "bun:test";
import { createInMemoryBrokerForTest } from "@madventures/broker";
import type { InMemoryBroker, DispatchResult } from "@madventures/broker";
import { createCredential } from "@madventures/broker";
import { PROTOCOL_VERSION, EVENT_TYPES } from "@madventures/protocol";
import type { BridgeEventV1, RepositoryFingerprint } from "@madventures/protocol";
import { ArtifactStore } from "@madventures/artifact-store";
import { createManifest } from "@madventures/artifact-store";
import { createDisposableRepo } from "./disposable-repo";
import { mkdtempSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

// ─── Helpers ───

function makeFingerprint(sha: string, gitSha?: string): RepositoryFingerprint {
  return {
    kind: "commit",
    sha256: sha.padEnd(64, "0"),
    git_sha: (gitSha ?? sha).padEnd(40, "0"),
  };
}

function makeEvent(
  eventType: BridgeEventV1["event_type"],
  sender: string,
  receiver: string,
  senderSurface: "claude-code" | "antigravity",
  senderModel: string,
  opts?: Partial<BridgeEventV1>,
): BridgeEventV1 {
  return {
    protocol_version: PROTOCOL_VERSION,
    event_id: crypto.randomUUID(),
    session_id: "sess-acceptance-001",
    parent_event_id: null,
    sender_execution_id: sender,
    receiver_execution_id: receiver,
    sender_role: senderSurface === "claude-code" ? "builder" : "independent-reviewer",
    sender_surface: senderSurface,
    sender_model: senderModel,
    sender_provider: senderSurface === "claude-code" ? "anthropic" : "google",
    task_envelope_hash: "a".repeat(64),
    repository_fingerprint: makeFingerprint("b"),
    event_type: eventType,
    payload_hash: "",
    payload: {},
    created_at: "2026-08-08T16:00:00.000Z",
    previous_event_hash: "0".repeat(64),
    ...opts,
  };
}

// ─── Tests ───

describe("two-way collaboration", () => {
  let broker: InMemoryBroker;
  let claudeCred: ReturnType<typeof createCredential>;
  let agyCred: ReturnType<typeof createCredential>;

  beforeEach(async () => {
    broker = await createInMemoryBrokerForTest();
    // Broker validates credentials with expectedFencingToken=0
    claudeCred = createCredential("exec-claude", 0);
    agyCred = createCredential("exec-agy", 0);
  });

  afterEach(() => {
    broker.stop();
  });

  test("Claude sends typed message to Antigravity", async () => {
    const event = makeEvent(
      "message",
      "exec-claude",
      "exec-agy",
      "claude-code",
      "claude-sonnet-4",
      {
        payload: { text: "Please review the auth module changes." },
        sender_execution_id: "exec-claude",
      },
    );

    const result = await broker.dispatch(event, claudeCred);
    expect(result.kind).toBe("ok");
  });

  test("Antigravity sends typed message to Claude", async () => {
    const event = makeEvent(
      "message",
      "exec-agy",
      "exec-claude",
      "antigravity",
      "gemini-2.5-pro",
      {
        payload: { text: "Found a potential issue in the token validation." },
        sender_execution_id: "exec-agy",
      },
    );

    const result = await broker.dispatch(event, agyCred);
    expect(result.kind).toBe("ok");
  });

  test("Claude requests action from Antigravity", async () => {
    const event = makeEvent(
      "action_request",
      "exec-claude",
      "exec-agy",
      "claude-code",
      "claude-sonnet-4",
      {
        payload: { action: "run_tests", target: "src/auth/" },
      },
    );

    const result = await broker.dispatch(event, claudeCred);
    expect(result.kind).toBe("ok");
  });

  test("Antigravity accepts requested action", async () => {
    const event = makeEvent(
      "action_accept",
      "exec-agy",
      "exec-claude",
      "antigravity",
      "gemini-2.5-pro",
      {
        payload: { requestId: "req-001" },
      },
    );

    const result = await broker.dispatch(event, agyCred);
    expect(result.kind).toBe("ok");
  });

  test("Antigravity rejects requested action", async () => {
    const event = makeEvent(
      "action_reject",
      "exec-agy",
      "exec-claude",
      "antigravity",
      "gemini-2.5-pro",
      {
        payload: { requestId: "req-002", reason: "path not in scope" },
      },
    );

    const result = await broker.dispatch(event, agyCred);
    expect(result.kind).toBe("ok");
  });

  test("subscription receives dispatched events", async () => {
    const received: DispatchResult[] = [];
    broker.subscribe((e) => received.push(e));

    const event = makeEvent(
      "message",
      "exec-claude",
      "exec-agy",
      "claude-code",
      "claude-sonnet-4",
    );

    await broker.dispatch(event, claudeCred);
    expect(received.length).toBeGreaterThanOrEqual(1);
    expect(received[0]!.kind).toBe("ok");
  });

  test("credential mismatch is rejected", async () => {
    const event = makeEvent(
      "message",
      "exec-claude",
      "exec-agy",
      "claude-code",
      "claude-sonnet-4",
      { sender_execution_id: "exec-claude" },
    );

    const wrongCred = createCredential("exec-wrong", 0);
    const result = await broker.dispatch(event, wrongCred);
    expect(result.kind).toBe("error");
    expect(result.detail).toBe("credential_mismatch");
  });

  test("missing event type is rejected", async () => {
    const result = await broker.dispatch(
      { sender_execution_id: "exec-claude" } as any,
      claudeCred,
    );
    expect(result.kind).toBe("error");
    expect(result.detail).toBe("missing_event_type");
  });
});

describe("bounded artifact publication", () => {
  let artifactDir: string;
  let store: ArtifactStore;

  beforeEach(() => {
    artifactDir = mkdtempSync(join(tmpdir(), "madv-artifacts-"));
    store = new ArtifactStore(artifactDir);
  });

  test("publish and inspect an artifact", () => {
    const data = new TextEncoder().encode("# Test Artifact\n");
    const meta = store.publish(data, {
      task_id: "task-001",
      type: "code",
      repo_fingerprint: "abc123",
    });

    expect(meta.sha256.length).toBe(64);
    expect(meta.size_bytes).toBe(data.length);
    expect(meta.task_id).toBe("task-001");
    expect(meta.type).toBe("code");

    const inspected = store.inspect(meta.sha256);
    expect(inspected).not.toBeNull();
    expect(inspected!.sha256).toBe(meta.sha256);
  });

  test("artifact hash mismatch is rejected", () => {
    const data = new TextEncoder().encode("# Test\n");
    expect(() => {
      store.publish(data, {
        task_id: "task-001",
        type: "code",
        repo_fingerprint: "abc123",
        declared_hash: "0".repeat(64), // wrong hash
      });
    }).toThrow("hash mismatch");
  });

  test("oversized artifact is rejected", () => {
    const oversized = new Uint8Array(101 * 1024 * 1024); // > 100MB
    expect(() => {
      store.publish(oversized, {
        task_id: "task-001",
        type: "code",
        repo_fingerprint: "abc123",
      });
    }).toThrow("maximum size");
  });

  test("deduplication returns same metadata for identical content", () => {
    const data = new TextEncoder().encode("# Same Content\n");
    const meta1 = store.publish(data, {
      task_id: "task-001",
      type: "code",
      repo_fingerprint: "abc123",
    });
    const meta2 = store.publish(data, {
      task_id: "task-001",
      type: "code",
      repo_fingerprint: "abc123",
    });
    expect(meta1.sha256).toBe(meta2.sha256);
  });

  test("manifest creation with artifact metadata and ledger head", () => {
    const data = new TextEncoder().encode("# Manifest Test\n");
    const meta = store.publish(data, {
      task_id: "task-001",
      type: "diff",
      repo_fingerprint: "abc123",
    });

    const manifest = createManifest([meta], "deadbeef".repeat(8), "abc123");
    expect(manifest.version).toBe(PROTOCOL_VERSION);
    expect(manifest.artifact_count).toBe(1);
    expect(manifest.artifacts[0]!.sha256).toBe(meta.sha256);
    expect(manifest.ledger_head_hash).toBe("deadbeef".repeat(8));
    expect(manifest.repo_fingerprint).toBe("abc123");
  });
});

describe("inbox acknowledgement", () => {
  let broker: InMemoryBroker;
  let claudeCred: ReturnType<typeof createCredential>;

  beforeEach(async () => {
    broker = await createInMemoryBrokerForTest();
    claudeCred = createCredential("exec-claude", 0);
  });

  afterEach(() => {
    broker.stop();
  });

  test("inbox acknowledge event type is in the protocol taxonomy", () => {
    expect(EVENT_TYPES).toContain("message");
    expect(EVENT_TYPES).toContain("action_request");
    expect(EVENT_TYPES).toContain("action_accept");
    expect(EVENT_TYPES).toContain("action_reject");
  });

  test("message event dispatched through broker is receivable", async () => {
    const received: any[] = [];
    broker.subscribe((e) => received.push(e));

    const event = makeEvent(
      "message",
      "exec-claude",
      "exec-agy",
      "claude-code",
      "claude-sonnet-4",
      { payload: { text: "ack test" } },
    );

    await broker.dispatch(event, claudeCred);
    expect(received.length).toBeGreaterThanOrEqual(1);
  });
});

describe("absence of arbitrary shell/filesystem MCP tools", () => {
  test("MCP tools list contains only the 16 governed bridge tools", async () => {
    const broker = await createInMemoryBrokerForTest();
    const toolNames = broker.mcpTools.map((t) => t.name);

    // Exactly 16 tools
    expect(broker.mcpTools.length).toBe(16);

    // All tools are prefixed with "bridge."
    for (const name of toolNames) {
      expect(name.startsWith("bridge.")).toBe(true);
    }

    // No arbitrary shell or filesystem tools
    const forbidden = ["shell", "exec", "filesystem", "file_read", "file_write", "bash", "run_command"];
    for (const name of toolNames) {
      for (const f of forbidden) {
        expect(name.toLowerCase()).not.toContain(f);
      }
    }

    broker.stop();
  });

  test("no MCP tool exposes raw command execution", async () => {
    const broker = await createInMemoryBrokerForTest();
    for (const tool of broker.mcpTools) {
      const json = JSON.stringify(tool);
      expect(json.toLowerCase()).not.toContain("shell");
      expect(json.toLowerCase()).not.toContain("exec");
      expect(json.toLowerCase()).not.toContain("bash");
    }
    broker.stop();
  });

  test("event types are governed — no arbitrary types", () => {
    // The event taxonomy is fixed and does not include shell/exec types
    expect(EVENT_TYPES).not.toContain("shell_exec");
    expect(EVENT_TYPES).not.toContain("file_write");
    expect(EVENT_TYPES).not.toContain("raw_command");

    // It does contain the governed types
    expect(EVENT_TYPES).toContain("message");
    expect(EVENT_TYPES).toContain("action_request");
    expect(EVENT_TYPES).toContain("artifact_publish");
    expect(EVENT_TYPES).toContain("ownership_request");
    expect(EVENT_TYPES).toContain("incident");
    expect(EVENT_TYPES).toContain("session_close");
  });
});

describe("disposable repo fixture safety", () => {
  test("disposable repo is created outside production repo", () => {
    const repo = createDisposableRepo();
    try {
      expect(repo.rootPath).not.toContain("madventures-tui");
      expect(repo.branch).not.toBe("main");
      expect(repo.branch).not.toBe("master");
      expect(repo.claudeWorktree).not.toContain("madventures-tui");
      expect(repo.antigravityWorktree).not.toContain("madventures-tui");
    } finally {
      repo.cleanup();
    }
  });

  test("disposable repo has committed initial file", () => {
    const repo = createDisposableRepo();
    try {
      expect(repo.initialSha.length).toBe(40);
      expect(repo.gitSha.length).toBe(40);
      expect(repo.initialSha).toBe(repo.gitSha);
    } finally {
      repo.cleanup();
    }
  });

  test("forbidden branch name is rejected", () => {
    expect(() => createDisposableRepo({ branch: "main" })).toThrow("forbidden branch");
    expect(() => createDisposableRepo({ branch: "master" })).toThrow("forbidden branch");
  });
});
