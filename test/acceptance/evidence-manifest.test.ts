// test/acceptance/evidence-manifest.test.ts
// Acceptance tests: evidence manifest equality and final state verification.
//
// Verifies that the final manifest matches the actual repository state,
// that the evidence export is sanitized (no secrets or raw transcripts),
// and that the ledger head hash is consistent across operations.
//
// Uses the in-memory broker — no real CLI processes are spawned.

import { expect, test, describe } from "bun:test";
import { PROTOCOL_VERSION } from "@madventures/protocol";
import type { BridgeEventV1, RepositoryFingerprint } from "@madventures/protocol";
import { Ledger } from "@madventures/ledger";
import type { LedgerRow } from "@madventures/ledger";
import { ArtifactStore, createManifest } from "@madventures/artifact-store";
import type { ArtifactMetadata } from "@madventures/artifact-store";
import { mkdtempSync, rmSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { runCli } from "../../apps/madbridge/src/cli";

// ─── Fixtures ───

function makeFingerprint(sha: string): RepositoryFingerprint {
  return {
    kind: "commit",
    sha256: sha.padEnd(64, "0"),
    git_sha: sha.padEnd(40, "0"),
  };
}

function makeEvent(
  eventType: BridgeEventV1["event_type"],
  opts?: Partial<BridgeEventV1>,
): BridgeEventV1 {
  return {
    protocol_version: PROTOCOL_VERSION,
    event_id: crypto.randomUUID(),
    session_id: "sess-evidence-001",
    parent_event_id: null,
    sender_execution_id: "exec-claude",
    receiver_execution_id: "exec-agy",
    sender_role: "builder",
    sender_surface: "claude-code",
    sender_model: "claude-sonnet-4",
    sender_provider: "anthropic",
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

// ─── Manifest equality tests ───

describe("evidence manifest equality", () => {
  test("manifest matches actual artifact store contents", () => {
    const artifactDir = mkdtempSync(join(tmpdir(), "madv-art-manifest-"));
    try {
      const store = new ArtifactStore(artifactDir);

      const data1 = new TextEncoder().encode("# Artifact 1\n");
      const data2 = new TextEncoder().encode("# Artifact 2\n");

      const meta1 = store.publish(data1, { task_id: "t1", type: "code", repo_fingerprint: "fp1" });
      const meta2 = store.publish(data2, { task_id: "t2", type: "diff", repo_fingerprint: "fp1" });

      // Create manifest from actual artifacts
      const ledgerHead = "abc".repeat(22).padEnd(64, "0").slice(0, 64);
      const manifest = createManifest([meta1, meta2], ledgerHead, "fp1");

      // Verify manifest matches actual state
      expect(manifest.artifact_count).toBe(2);
      expect(manifest.artifacts.length).toBe(2);
      expect(manifest.artifacts[0]!.sha256).toBe(meta1.sha256);
      expect(manifest.artifacts[1]!.sha256).toBe(meta2.sha256);
      expect(manifest.ledger_head_hash).toBe(ledgerHead);
      expect(manifest.repo_fingerprint).toBe("fp1");
      expect(manifest.version).toBe(PROTOCOL_VERSION);

      // Verify artifacts are actually inspectable
      const insp1 = store.inspect(meta1.sha256);
      const insp2 = store.inspect(meta2.sha256);
      expect(insp1).not.toBeNull();
      expect(insp2).not.toBeNull();
    } finally {
      rmSync(artifactDir, { recursive: true, force: true });
    }
  });

  test("empty manifest with zero artifacts is valid", () => {
    const manifest = createManifest([], "0".repeat(64), "empty-fp");
    expect(manifest.artifact_count).toBe(0);
    expect(manifest.artifacts).toEqual([]);
    expect(manifest.version).toBe(PROTOCOL_VERSION);
  });

  test("manifest ledger head hash matches ledger verify head", () => {
    const ledgerDir = mkdtempSync(join(tmpdir(), "madv-ledger-manifest-"));
    try {
      const ledgerPath = join(ledgerDir, "test.db");
      const ledger = new Ledger(ledgerPath);

      ledger.append(makeEvent("message"));
      ledger.append(makeEvent("action_request"));

      const verifyResult = ledger.verify();
      expect(verifyResult.valid).toBe(true);

      const manifest = createManifest([], verifyResult.head, "fp1");
      expect(manifest.ledger_head_hash).toBe(verifyResult.head);

      ledger.close();
    } finally {
      rmSync(ledgerDir, { recursive: true, force: true });
    }
  });
});

// ─── Sanitization tests ───

describe("evidence sanitization — no secrets or raw transcripts", () => {
  test("export-evidence command produces sanitized output", async () => {
    const testDir = mkdtempSync(join(tmpdir(), "madv-export-test-"));
    try {
      const ledgerDir = join(testDir, ".madv-runtime", "ledger");
      const artifactsDir = join(testDir, ".madv-runtime", "artifacts");
      const outputDir = join(testDir, "evidence-export");
      const ledgerPath = join(ledgerDir, "ledger.db");

      // Create ledger with events
      const { mkdirSync } = require("fs");
      mkdirSync(ledgerDir, { recursive: true });
      const ledger = new Ledger(ledgerPath);
      ledger.append(makeEvent("message", {
        payload: { text: "normal message without secrets" },
      }));
      ledger.close();

      // Run export-evidence
      const result = await runCli(
        ["export-evidence", "--json", "--output", outputDir],
        { stdin: "", cwd: testDir },
      );

      expect(result.exitCode).toBe(0);
      const output = JSON.parse(result.stdout);
      expect(output.ok).toBe(true);
      expect(output.eventCount).toBe(1);

      // Verify output files exist
      expect(existsSync(join(outputDir, "manifest.json"))).toBe(true);
      expect(existsSync(join(outputDir, "ledger-sanitized.json"))).toBe(true);
      expect(existsSync(join(outputDir, "README.txt"))).toBe(true);

      // Verify no secrets in output
      const sanitizedContent = readFileSync(join(outputDir, "ledger-sanitized.json"), "utf-8");
      expect(sanitizedContent).not.toMatch(/sk-[a-zA-Z0-9]{20,}/);
      expect(sanitizedContent).not.toMatch(/ghp_[a-zA-Z0-9]{36,}/);
      expect(sanitizedContent).not.toMatch(/Bearer\s+[a-zA-Z0-9._-]+/);
    } finally {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  test("export-evidence redacts API key patterns", async () => {
    const testDir = mkdtempSync(join(tmpdir(), "madv-export-redact-"));
    try {
      const ledgerDir = join(testDir, ".madv-runtime", "ledger");
      const outputDir = join(testDir, "evidence-export");
      const ledgerPath = join(ledgerDir, "ledger.db");

      const { mkdirSync } = require("fs");
      mkdirSync(ledgerDir, { recursive: true });
      const ledger = new Ledger(ledgerPath);
      // Event with a secret-like string in the payload
      ledger.append(makeEvent("message", {
        payload: { text: "my key is sk-abcdefghijklmnopqrstuvwxyz123456" },
      }));
      ledger.close();

      const result = await runCli(
        ["export-evidence", "--json", "--output", outputDir],
        { stdin: "", cwd: testDir },
      );

      expect(result.exitCode).toBe(0);

      const sanitizedContent = readFileSync(join(outputDir, "ledger-sanitized.json"), "utf-8");
      expect(sanitizedContent).not.toContain("sk-abcdefghijklmnopqrstuvwxyz123456");
      expect(sanitizedContent).toContain("[REDACTED]");
    } finally {
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});

// ─── CLI verification tests ───

describe("CLI verify-ledger on real ledger", () => {
  test("verify-ledger reports valid chain for clean ledger", async () => {
    const testDir = mkdtempSync(join(tmpdir(), "madv-verify-ledger-"));
    try {
      const ledgerDir = join(testDir, ".madv-runtime", "ledger");
      const ledgerPath = join(ledgerDir, "ledger.db");

      const { mkdirSync } = require("fs");
      mkdirSync(ledgerDir, { recursive: true });
      const ledger = new Ledger(ledgerPath);
      ledger.append(makeEvent("message"));
      ledger.append(makeEvent("action_request"));
      ledger.close();

      const result = await runCli(
        ["verify-ledger", "--json"],
        { stdin: "", cwd: testDir },
      );

      expect(result.exitCode).toBe(0);
      const output = JSON.parse(result.stdout);
      expect(output.ok).toBe(true);
      expect(output.valid).toBe(true);
      expect(output.count).toBe(2);
      expect(output.head.length).toBe(64);
    } finally {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  test("verify-ledger fails on missing ledger", async () => {
    const testDir = mkdtempSync(join(tmpdir(), "madv-verify-missing-"));
    try {
      const result = await runCli(
        ["verify-ledger", "--json"],
        { stdin: "", cwd: testDir },
      );

      expect(result.exitCode).toBe(1);
      const output = JSON.parse(result.stdout);
      expect(output.ok).toBe(false);
      expect(output.error).toBe("ledger_not_found");
    } finally {
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});

// ─── Protocol version consistency ───

describe("protocol version consistency", () => {
  test("all events use the same protocol version", () => {
    const event = makeEvent("message");
    expect(event.protocol_version).toBe(PROTOCOL_VERSION);
  });

  test("manifest version matches protocol version", () => {
    const manifest = createManifest([], "0".repeat(64), "fp");
    expect(manifest.version).toBe(PROTOCOL_VERSION);
  });
});
