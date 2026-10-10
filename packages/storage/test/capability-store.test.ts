import { expect, spyOn, test } from "bun:test";
import * as fs from "node:fs";
import { basename, join, sep } from "node:path";
import * as protocol from "@madventures/protocol";
import {
  ADAPTER_REGISTRY,
  CapabilityRecordError,
  capabilityRecordFilename,
  parseCapabilityRecord,
  type CapabilityRecordV1,
  type ObservedSurfaceFacts,
  type SurfaceId,
} from "@madventures/protocol";
import { InvalidSurfaceIdError } from "../../protocol/src/surface-id";
import * as store from "../src/capability-store";
import {
  CapabilityStoreError,
  latestFreshRecord,
  readCapabilityRecords,
  writeCapabilityRecord,
} from "../src/capability-store";
import * as storageIndex from "../src";
import { createSessionStorage, rollbackSessionStorage } from "../src/session-storage";

const REPO = "/repo";
const WORKTREE = "/worktree";
const REGISTRATIONS = [...ADAPTER_REGISTRY.values()];
const REGISTRATION = REGISTRATIONS[0]!;
const NOW = "2026-09-03T00:00:00.000Z";
const PRIVATE_FACT = "task36-private-record-content";

function tempRoot(): string {
  return fs.realpathSync(fs.mkdtempSync("/tmp/m15-task36-r1-test-"));
}

function rawRecord(overrides: Record<string, unknown> = {}, registration = REGISTRATION): Record<string, unknown> {
  return {
    surface: registration.surface,
    provider: registration.provider,
    requested_model: "example-model-1",
    role_eligibility: ["builder"],
    independence_domain: registration.independence_domain,
    organization_id: registration.organization_id,
    cli_version: registration.supported_versions[0]!,
    binary_path: `/opt/example/bin/${registration.executable_name}`,
    binary_sha256: "a".repeat(64),
    evaluated_at: "2026-09-01T00:00:00.000Z",
    expires_at: "2026-10-01T00:00:00.000Z",
    host: {
      arch: "arm64", macos_version: "15.0", macos_build: "24A335",
      bun_version: "1.4.2", bun_path: "/opt/example/bin/bun",
      bun_sha256: "b".repeat(64), term: "xterm-256color", shell: "/bin/zsh",
    },
    identity_attestation: { result: "pass", primitive: "example-probe", sanitized_facts: PRIVATE_FACT },
    auth_readiness: { result: "no_primitive", primitive: null },
    pty: { result: "pass", observed_ms: { spawn: 12 } },
    independent_review_eligible: true,
    limitations: [], overall: "pass", redaction_rules_applied: ["example-redaction-rule"],
    ...overrides,
  };
}

function observed(record: CapabilityRecordV1): ObservedSurfaceFacts {
  return { cli_version: record.cli_version, binary_sha256: record.binary_sha256, host: record.host };
}

function caught(run: () => unknown): unknown {
  try {
    run();
  } catch (error) {
    return error;
  }
  throw new Error("expected rejection");
}

function expectStoreError(run: () => unknown, kind: CapabilityStoreError["kind"], entry: string): void {
  const error = caught(run);
  expect(error).toBeInstanceOf(CapabilityStoreError);
  const rejection = error as CapabilityStoreError;
  expect(rejection.kind).toBe(kind);
  expect(rejection.entry).toBe(entry);
  expect(rejection.message).toBe(`capability store rejected: ${kind} (${entry})`);
  const errorKeys = Reflect.ownKeys(new Error("baseline"));
  expect(Reflect.ownKeys(rejection).filter((key) => !errorKeys.includes(key)).sort()).toEqual(["entry", "kind", "name"]);
  const rendered = `${String(rejection)} ${JSON.stringify(rejection)} ${rejection.stack}`;
  expect(rendered).not.toContain(PRIVATE_FACT);
  expect(rendered).not.toContain("capability record rejected:");
}

test("a record is written under capability/<surface>/ with mode 0700 directories and 0600 file", () => {
  const parent = tempRoot();
  try {
    const root = join(parent, "storage");
    const raw = rawRecord();
    const parsed = parseCapabilityRecord(raw);
    const input = new Proxy(raw, { get() { throw new Error(PRIVATE_FACT); } }) as unknown as CapabilityRecordV1;
    const writes = spyOn(fs, "writeFileSync");
    let file: string;
    try {
      file = writeCapabilityRecord(root, REPO, WORKTREE, input);
      expect(writes).toHaveBeenCalledTimes(1);
      expect(writes.mock.calls[0]![2]).toEqual({ flag: "wx", mode: 0o600 });
    } finally {
      writes.mockRestore();
    }
    const directory = join(root, "capability", parsed.surface);
    expect(file!).toBe(join(directory, capabilityRecordFilename(parsed)));
    for (const dir of [root, join(root, "capability"), directory]) {
      expect(fs.statSync(dir).mode & 0o777).toBe(0o700);
    }
    expect(fs.statSync(file!).mode & 0o777).toBe(0o600);
    expect(fs.readFileSync(file!, "utf8")).toBe(`${JSON.stringify(parsed)}\n`);
    expect(fs.readdirSync(directory)).toEqual([basename(file!)]);
    expect(Object.keys(store).sort()).toEqual([
      "CapabilityStoreError", "latestFreshRecord", "readCapabilityRecords", "writeCapabilityRecord",
    ]);
    for (const name of ["CapabilityStoreError", "latestFreshRecord", "readCapabilityRecords", "writeCapabilityRecord"] as const) {
      expect(storageIndex[name]).toBe(store[name]);
    }

    // Make creation itself produce an unsafe directory, so revalidation must reject it.
    const unsafeRoot = join(parent, "post-creation");
    const unsafeDir = join(unsafeRoot, "capability", parsed.surface);
    const mkdir = fs.mkdirSync;
    const creation = spyOn(fs, "mkdirSync").mockImplementation((path, options) => {
      const result = mkdir(path, options);
      if (String(path) === unsafeDir) fs.chmodSync(unsafeDir, 0o755);
      return result;
    });
    try {
      expectStoreError(() => writeCapabilityRecord(unsafeRoot, REPO, WORKTREE, parsed), "invalid_root", parsed.surface);
      expect(fs.existsSync(unsafeDir)).toBe(true);
      expect(fs.readdirSync(unsafeDir)).toEqual([]);
    } finally {
      creation.mockRestore();
    }
  } finally {
    fs.rmSync(parent, { recursive: true, force: true });
  }
});

test("a surface id containing a path separator is rejected before path construction", () => {
  const root = tempRoot();
  try {
    for (const surface of ["a/../../b", "a/b", "../escape", "a\\b"]) {
      const input = rawRecord({ surface }) as unknown as CapabilityRecordV1;
      const rejection = caught(() => writeCapabilityRecord(root, REPO, WORKTREE, input));
      expect(rejection).toBeInstanceOf(CapabilityRecordError);
      expect((rejection as CapabilityRecordError).kind).toBe("schema");
      expect((rejection as CapabilityRecordError).field).toBe("surface");
      expect(() => readCapabilityRecords(root, REPO, WORKTREE, surface as SurfaceId)).toThrow(InvalidSurfaceIdError);
      expect(() => latestFreshRecord(root, REPO, WORKTREE, surface as SurfaceId, NOW, observed(parseCapabilityRecord(rawRecord())))).toThrow(InvalidSurfaceIdError);
      // A path join with this root would throw TypeError instead of the surface rejection.
      expect(() => readCapabilityRecords(null as unknown as string, REPO, WORKTREE, surface as SurfaceId)).toThrow(InvalidSurfaceIdError);
      expect(() => writeCapabilityRecord(null as unknown as string, REPO, WORKTREE, input)).toThrow(CapabilityRecordError);
      expect(fs.existsSync(join(root, "capability"))).toBe(false);
      expect(fs.readdirSync(root)).toEqual([]);
    }
    const parse = protocol.parseCapabilityRecord;
    let parserError: unknown;
    const parsing = spyOn(protocol, "parseCapabilityRecord").mockImplementation((raw) => {
      try { return parse(raw); } catch (error) { parserError = error; throw error; }
    });
    try {
      const error = caught(() => writeCapabilityRecord(root, REPO, WORKTREE, rawRecord({ overall: PRIVATE_FACT }) as unknown as CapabilityRecordV1));
      expect(parsing).toHaveBeenCalledTimes(1);
      expect(error).toBe(parserError);
      expect(error).toBeInstanceOf(CapabilityRecordError);
      expect(String(error)).not.toContain(PRIVATE_FACT);
      expect(fs.existsSync(join(root, "capability"))).toBe(false);
    } finally {
      parsing.mockRestore();
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("capability records survive session rollback", () => {
  const root = tempRoot();
  try {
    const record = parseCapabilityRecord(rawRecord());
    const file = writeCapabilityRecord(root, REPO, WORKTREE, record);
    const bytes = fs.readFileSync(file);
    const session = createSessionStorage(root, "task36-session", REPO, WORKTREE);
    expect(rollbackSessionStorage(session, false)).toBe("removed");
    expect(fs.existsSync(session.sessionDir)).toBe(false);
    expect(fs.readFileSync(file)).toEqual(bytes);
    expect(readCapabilityRecords(root, REPO, WORKTREE, record.surface)).toEqual([record]);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("a failing record is persisted, not discarded", () => {
  const root = tempRoot();
  try {
    const record = parseCapabilityRecord(rawRecord({ overall: "fail" }));
    const file = writeCapabilityRecord(root, REPO, WORKTREE, record);
    expect(fs.existsSync(file)).toBe(true);
    expect(JSON.parse(fs.readFileSync(file, "utf8"))).toEqual(record);
    expect(readCapabilityRecords(root, REPO, WORKTREE, record.surface)).toEqual([record]);
    expect(latestFreshRecord(root, REPO, WORKTREE, record.surface, NOW, observed(record))).toEqual(record);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("the runtime never writes into the repository", () => {
  const parent = tempRoot();
  try {
    const repository = join(parent, "repository");
    const worktree = join(parent, "worktree");
    for (const dir of [repository, worktree]) fs.mkdirSync(dir, { mode: 0o700 });
    const record = parseCapabilityRecord(rawRecord());
    const root = join(parent, "storage");
    const file = writeCapabilityRecord(root, repository, worktree, record);
    expect(file.startsWith(repository + sep)).toBe(false);
    expect(file.startsWith(worktree + sep)).toBe(false);
    for (const boundary of [repository, worktree]) {
      const forbiddenRoot = join(boundary, "forbidden-storage");
      expectStoreError(() => writeCapabilityRecord(forbiddenRoot, repository, worktree, record), "invalid_root", basename(forbiddenRoot));
      expectStoreError(() => readCapabilityRecords(forbiddenRoot, repository, worktree, record.surface), "invalid_root", basename(forbiddenRoot));
      expect(fs.readdirSync(boundary)).toEqual([]);
    }
    expectStoreError(() => writeCapabilityRecord("relative-root", repository, worktree, record), "invalid_root", "relative-root");
  } finally {
    fs.rmSync(parent, { recursive: true, force: true });
  }
});

test("equal evaluated_at values select deterministically by descending canonical filename", () => {
  const root = tempRoot();
  try {
    const older = parseCapabilityRecord(rawRecord({ binary_sha256: "a".repeat(64) }));
    const low = parseCapabilityRecord(rawRecord({ evaluated_at: "2026-09-02T00:00:00.000Z", expires_at: "2026-10-02T00:00:00.000Z" }));
    const high = parseCapabilityRecord(rawRecord({ evaluated_at: low.evaluated_at, expires_at: low.expires_at, binary_sha256: "f".repeat(64), overall: "fail" }));
    expect(readCapabilityRecords(root, REPO, WORKTREE, high.surface)).toEqual([]);
    expect(latestFreshRecord(root, REPO, WORKTREE, high.surface, NOW, observed(high))).toBeNull();
    expect(fs.existsSync(join(root, "capability"))).toBe(false);
    for (const record of [high, older, low]) writeCapabilityRecord(root, REPO, WORKTREE, record);
    expect(readCapabilityRecords(root, REPO, WORKTREE, high.surface)).toEqual([high, low, older]);
    expect(latestFreshRecord(root, REPO, WORKTREE, high.surface, NOW, observed(high))).toEqual(high);
    expect(latestFreshRecord(root, REPO, WORKTREE, high.surface, NOW, observed(low))).toBeNull();
    expect(latestFreshRecord(root, REPO, WORKTREE, high.surface, high.expires_at, observed(high))).toBeNull();
    expect(() => latestFreshRecord(root, REPO, WORKTREE, high.surface, "invalid-now", observed(high))).toThrow(CapabilityRecordError);

    const directory = join(root, "capability", high.surface);
    const read = () => readCapabilityRecords(root, REPO, WORKTREE, high.surface);
    for (const entry of ["not-canonical.json", "2026-02-30T00:00:00.000Z-aaaaaaaaaaaa.json", "2026-09-04T00:00:00.000Z-AAAAAAAAAAAA.json"]) {
      const file = join(directory, entry);
      fs.writeFileSync(file, PRIVATE_FACT, { mode: 0o600 });
      try { expectStoreError(read, "unsafe_entry", entry); } finally { fs.unlinkSync(file); }
    }
    const unsafeName = "2026-09-04T00:00:00.000Z-aaaaaaaaaaaa.json";
    const unsafePath = join(directory, unsafeName);
    fs.mkdirSync(unsafePath, { mode: 0o700 });
    try { expectStoreError(read, "unsafe_entry", unsafeName); } finally { fs.rmdirSync(unsafePath); }
    fs.symlinkSync(join(directory, capabilityRecordFilename(high)), unsafePath);
    try { expectStoreError(read, "unsafe_entry", unsafeName); } finally { fs.unlinkSync(unsafePath); }
    for (const content of [`{${PRIVATE_FACT}`, JSON.stringify(rawRecord({ overall: PRIVATE_FACT }))]) {
      fs.writeFileSync(unsafePath, content, { mode: 0o600 });
      try { expectStoreError(read, "malformed_record", unsafeName); } finally { fs.unlinkSync(unsafePath); }
    }
    const other = REGISTRATIONS.find((registration) => registration.surface !== high.surface)!;
    expect(other).toBeDefined();
    fs.writeFileSync(unsafePath, JSON.stringify(parseCapabilityRecord(rawRecord({}, other))), { mode: 0o600 });
    try { expectStoreError(read, "surface_mismatch", unsafeName); } finally { fs.unlinkSync(unsafePath); }
    fs.writeFileSync(unsafePath, JSON.stringify(high), { mode: 0o600 });
    try { expectStoreError(read, "filename_mismatch", unsafeName); } finally { fs.unlinkSync(unsafePath); }
    expect(read()).toEqual([high, low, older]);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("an existing canonical filename is rejected (exclusive-create collision)", () => {
  const root = tempRoot();
  try {
    const record = parseCapabilityRecord(rawRecord());
    const file = writeCapabilityRecord(root, REPO, WORKTREE, record);
    const bytes = fs.readFileSync(file);
    const changed = parseCapabilityRecord(rawRecord({ overall: "fail", limitations: ["different content"] }));
    expectStoreError(() => writeCapabilityRecord(root, REPO, WORKTREE, changed), "exists", basename(file));
    expect(fs.readFileSync(file)).toEqual(bytes);
    expect(fs.readdirSync(join(root, "capability", record.surface))).toEqual([basename(file)]);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
