// packages/protocol/src/capability-record.ts
// Capability record V1: a dated observation of one surface's CLI, binary and
// host, never a standing authorization (spec sections 2.3, 5.5 and 9.1;
// PLAN-OPEN-3). Pure: no I/O, no clock, no record creation. The caller
// supplies `now`, and the registry is read only through lookupRegistration.
// Inspecting the input is itself untrusted work: B3 of act
// FOUNDER-ACT-20261005-TASK35-CORRECTION requires every exception raised
// while parseCapabilityRecord reads its input to leave as a
// CapabilityRecordError of kind `schema` naming the container. B3 of act
// FOUNDER-ACT-20261007-TASK35-SECOND-CORRECTION makes that hold by
// construction: the whole parse runs inside one boundary, which lets through
// only the rejection the parse raised itself, recognized by identity. B5 of
// DEC-20261008-01 confines that identity and container to the current call.

import { lookupRegistration } from "./adapter-registry";
import { parseSurfaceId, type SurfaceId } from "./surface-id";
import { KNOWN_ROLES, type ExecutionRole } from "./task-envelope";

export interface CapabilityRecordV1 {
  readonly surface: SurfaceId;
  readonly provider: string;
  readonly requested_model: string;
  readonly role_eligibility: readonly ExecutionRole[];
  readonly independence_domain: string;
  readonly organization_id: string;
  readonly cli_version: string;
  readonly binary_path: string;
  readonly binary_sha256: string;
  readonly evaluated_at: string;
  readonly expires_at: string;
  readonly host: {
    readonly arch: string;
    readonly macos_version: string;
    readonly macos_build: string;
    readonly bun_version: string;
    readonly bun_path: string;
    readonly bun_sha256: string;
    readonly term: string;
    readonly shell: string;
  };
  readonly identity_attestation: {
    readonly result: "pass" | "fail";
    readonly primitive: string;
    readonly sanitized_facts: string;
  };
  readonly auth_readiness: { readonly result: "pass" | "fail" | "no_primitive"; readonly primitive: string | null };
  readonly pty: { readonly result: "pass" | "fail"; readonly observed_ms: Record<string, number> };
  readonly independent_review_eligible: boolean;
  readonly limitations: readonly string[];
  readonly overall: "pass" | "fail";
  readonly redaction_rules_applied: readonly string[];
}

/** What a caller observed about the surface now. PLAN-OPEN-3 compares these and nothing else. */
export interface ObservedSurfaceFacts {
  readonly cli_version: string;
  readonly binary_sha256: string;
  readonly host: CapabilityRecordV1["host"];
}

export type StalenessReason = "binary_hash_changed" | "cli_version_changed" | "host_changed" | "horizon_expired";

type CapabilityRecordErrorKind = "schema" | "unregistered_surface" | "registration_mismatch" | "timestamp" | "invalid_now";

/**
 * Every rejection. It carries the kind and the offending field name only,
 * never the input or any record content. Every `field` is a name from this
 * module's schema, so an unknown key is reported by its container.
 */
export class CapabilityRecordError extends Error {
  constructor(
    public readonly kind: CapabilityRecordErrorKind,
    public readonly field: string,
  ) {
    super(`capability record rejected: ${kind} (${field})`);
    this.name = "CapabilityRecordError";
  }
}

// PLAN-OPEN-3: exactly 30 × 24 × 60 × 60 × 1000 milliseconds.
const HORIZON_MS = 30 * 24 * 60 * 60 * 1000;
const SHA256_HEX = /^[0-9a-f]{64}$/;

const RECORD_FIELDS = [
  "surface",
  "provider",
  "requested_model",
  "role_eligibility",
  "independence_domain",
  "organization_id",
  "cli_version",
  "binary_path",
  "binary_sha256",
  "evaluated_at",
  "expires_at",
  "host",
  "identity_attestation",
  "auth_readiness",
  "pty",
  "independent_review_eligible",
  "limitations",
  "overall",
  "redaction_rules_applied",
] as const;
const HOST_FIELDS = [
  "arch",
  "macos_version",
  "macos_build",
  "bun_version",
  "bun_path",
  "bun_sha256",
  "term",
  "shell",
] as const;
const IDENTITY_ATTESTATION_FIELDS = ["result", "primitive", "sanitized_facts"] as const;
const AUTH_READINESS_FIELDS = ["result", "primitive"] as const;
const PTY_FIELDS = ["result", "observed_ms"] as const;
const PASS_FAIL = ["pass", "fail"] as const;
const AUTH_RESULTS = ["pass", "fail", "no_primitive"] as const;

function reject(kind: CapabilityRecordErrorKind, field: string): never {
  throw new CapabilityRecordError(kind, field);
}

/**
 * PLAN-OPEN-3 timestamp rule: a string whose parsed value is finite, checked
 * before toISOString() can throw, and whose toISOString() is the identical
 * canonical UTC string.
 */
function canonicalTimestampMs(
  value: unknown,
  kind: "timestamp" | "invalid_now",
  field: string,
  raise: typeof reject = reject,
): number {
  if (typeof value !== "string") return raise(kind, field);
  const ms = new Date(value).getTime();
  if (!Number.isFinite(ms)) raise(kind, field);
  if (new Date(ms).toISOString() !== value) raise(kind, field);
  return ms;
}

function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null) {
    for (const nested of Object.values(value)) deepFreeze(nested);
    Object.freeze(value);
  }
  return value;
}

/**
 * Accepts only the exact shape and returns a deeply frozen copy of `raw`.
 * Each call owns its rejection identity and inspected container. No input
 * callback or other exported call can reach or change that state.
 */
export function parseCapabilityRecord(raw: Record<string, unknown>): CapabilityRecordV1 {
  let inspecting = "record";
  let raised: CapabilityRecordError | undefined;

  function reject(kind: CapabilityRecordErrorKind, field: string): never {
    const error = new CapabilityRecordError(kind, field);
    raised = error;
    throw error;
  }

  function probe<T>(container: string, read: () => T): T {
    inspecting = container;
    return read();
  }

  function isPlainObject(value: unknown, container: string): value is object {
    if (typeof value !== "object" || value === null) return false;
    if (probe(container, () => Array.isArray(value))) return false;
    const prototype: unknown = probe(container, () => Object.getPrototypeOf(value));
    return prototype === Object.prototype || prototype === null;
  }

  /** Requires an array. Its length and elements are still read defensively. */
  function readArray(value: unknown, container: string): readonly unknown[] {
    if (!probe(container, () => Array.isArray(value))) return reject("schema", container);
    return value as readonly unknown[];
  }

  /** Reads an own data property once, so no caller getter runs and no later read can differ. */
  function ownDataValue(source: object, key: string, field: string, container: string): unknown {
    const descriptor = probe(container, () => Object.getOwnPropertyDescriptor(source, key));
    if (descriptor === undefined || !("value" in descriptor)) return reject("schema", field);
    return descriptor.value;
  }

  /** Snapshots a plain object whose own key set must be exactly `keys`. */
  function readClosed<K extends string>(
    value: unknown,
    path: string,
    keys: readonly K[],
  ): Record<K, unknown> {
    const container = path === "" ? "record" : path;
    if (!isPlainObject(value, container)) return reject("schema", container);
    const own = probe(container, () => Reflect.ownKeys(value));
    const snapshot = {} as Record<K, unknown>;
    for (const key of keys) {
      const field = path === "" ? key : `${path}.${key}`;
      if (!own.includes(key)) reject("schema", field);
      snapshot[key] = ownDataValue(value, key, field, container);
    }
    // Every expected key is present and own keys are unique, so any surplus is
    // an unknown key. It is named by its container, never by the key itself.
    if (own.length !== keys.length) reject("schema", container);
    return snapshot;
  }

  function readString(value: unknown, field: string): string {
    if (typeof value !== "string" || value.length === 0) return reject("schema", field);
    return value;
  }

  function readEnum<T extends string>(value: unknown, field: string, allowed: readonly T[]): T {
    if (typeof value !== "string" || !(allowed as readonly string[]).includes(value)) return reject("schema", field);
    return value as T;
  }

  function readStringList(value: unknown, field: string): string[] {
    const array = readArray(value, field);
    const list: string[] = [];
    for (let index = 0; probe(field, () => index < array.length); index++) {
      list.push(readString(ownDataValue(array, String(index), field, field), field));
    }
    return list;
  }

  function readRoles(value: unknown): ExecutionRole[] {
    const field = "role_eligibility";
    const array = readArray(value, field);
    const roles: ExecutionRole[] = [];
    for (let index = 0; probe(field, () => index < array.length); index++) {
      const role = readEnum(ownDataValue(array, String(index), field, field), field, KNOWN_ROLES);
      if (roles.includes(role)) reject("schema", field);
      roles.push(role);
    }
    return roles;
  }

  function readObservedMs(value: unknown): Record<string, number> {
    const field = "pty.observed_ms";
    if (!isPlainObject(value, field)) return reject("schema", field);
    const entries: [string, number][] = [];
    for (const key of probe(field, () => Reflect.ownKeys(value))) {
      if (typeof key !== "string" || key.length === 0) reject("schema", field);
      const ms = ownDataValue(value, key, field, field);
      if (typeof ms !== "number" || !Number.isFinite(ms) || ms < 0) reject("schema", field);
      entries.push([key, ms]);
    }
    // fromEntries defines own properties, so a "__proto__" key stays data.
    return Object.fromEntries(entries);
  }

  function readSurface(value: unknown): SurfaceId {
    const text = readString(value, "surface");
    try {
      return parseSurfaceId(text);
    } catch {
      return reject("schema", "surface");
    }
  }

  try {
    return readRecord(raw);
  } catch (thrown) {
    if (raised !== undefined && thrown === raised) throw thrown;
    return reject("schema", inspecting);
  }

  function readRecord(raw: Record<string, unknown>): CapabilityRecordV1 {
    const record = readClosed(raw, "", RECORD_FIELDS);

    // PLAN-OPEN-3: both stored timestamps and their exact 30-day relation are
    // settled before anything else reads them.
    const evaluatedMs = canonicalTimestampMs(record.evaluated_at, "timestamp", "evaluated_at", reject);
    const expiresMs = canonicalTimestampMs(record.expires_at, "timestamp", "expires_at", reject);
    if (expiresMs - evaluatedMs !== HORIZON_MS) reject("timestamp", "expires_at");

    const surface = readSurface(record.surface);
    const registration = lookupRegistration(surface);
    if (registration === undefined) return reject("unregistered_surface", "surface");

    // Spec section 9.1: these are copied from the registration, so they must
    // equal its values exactly.
    const provider = readString(record.provider, "provider");
    if (provider !== registration.provider) reject("registration_mismatch", "provider");
    const organizationId = readString(record.organization_id, "organization_id");
    if (organizationId !== registration.organization_id) reject("registration_mismatch", "organization_id");
    const independenceDomain = readString(record.independence_domain, "independence_domain");
    if (independenceDomain !== registration.independence_domain) {
      reject("registration_mismatch", "independence_domain");
    }

    const binarySha256 = readString(record.binary_sha256, "binary_sha256");
    if (!SHA256_HEX.test(binarySha256)) reject("schema", "binary_sha256");

    const host = readClosed(record.host, "host", HOST_FIELDS);
    const identity = readClosed(record.identity_attestation, "identity_attestation", IDENTITY_ATTESTATION_FIELDS);
    if (typeof identity.sanitized_facts !== "string") reject("schema", "identity_attestation.sanitized_facts");
    const auth = readClosed(record.auth_readiness, "auth_readiness", AUTH_READINESS_FIELDS);
    const pty = readClosed(record.pty, "pty", PTY_FIELDS);
    if (typeof record.independent_review_eligible !== "boolean") reject("schema", "independent_review_eligible");

    return deepFreeze({
      surface,
      provider,
      requested_model: readString(record.requested_model, "requested_model"),
      role_eligibility: readRoles(record.role_eligibility),
      independence_domain: independenceDomain,
      organization_id: organizationId,
      cli_version: readString(record.cli_version, "cli_version"),
      binary_path: readString(record.binary_path, "binary_path"),
      binary_sha256: binarySha256,
      evaluated_at: new Date(evaluatedMs).toISOString(),
      expires_at: new Date(expiresMs).toISOString(),
      host: {
        arch: readString(host.arch, "host.arch"),
        macos_version: readString(host.macos_version, "host.macos_version"),
        macos_build: readString(host.macos_build, "host.macos_build"),
        bun_version: readString(host.bun_version, "host.bun_version"),
        bun_path: readString(host.bun_path, "host.bun_path"),
        bun_sha256: readString(host.bun_sha256, "host.bun_sha256"),
        term: readString(host.term, "host.term"),
        shell: readString(host.shell, "host.shell"),
      },
      identity_attestation: {
        result: readEnum(identity.result, "identity_attestation.result", PASS_FAIL),
        primitive: readString(identity.primitive, "identity_attestation.primitive"),
        sanitized_facts: identity.sanitized_facts as string,
      },
      auth_readiness: {
        result: readEnum(auth.result, "auth_readiness.result", AUTH_RESULTS),
        primitive: auth.primitive === null ? null : readString(auth.primitive, "auth_readiness.primitive"),
      },
      pty: {
        result: readEnum(pty.result, "pty.result", PASS_FAIL),
        observed_ms: readObservedMs(pty.observed_ms),
      },
      independent_review_eligible: record.independent_review_eligible as boolean,
      limitations: readStringList(record.limitations, "limitations"),
      overall: readEnum(record.overall, "overall", PASS_FAIL),
      redaction_rules_applied: readStringList(record.redaction_rules_applied, "redaction_rules_applied"),
    });
  }

}

function stale(reason: StalenessReason): { readonly fresh: false; readonly reason: StalenessReason } {
  return Object.freeze({ fresh: false, reason } as const);
}

/**
 * The sole staleness evaluator. `now` is validated first; then the first
 * failure in PLAN-OPEN-3's fixed order is returned. There is no fifth reason.
 */
export function evaluateCapabilityFreshness(
  record: CapabilityRecordV1,
  now: string,
  observed: ObservedSurfaceFacts,
): { readonly fresh: true } | { readonly fresh: false; readonly reason: StalenessReason } {
  const nowMs = canonicalTimestampMs(now, "invalid_now", "now");
  if (record.binary_sha256 !== observed.binary_sha256) return stale("binary_hash_changed");
  if (record.cli_version !== observed.cli_version) return stale("cli_version_changed");
  for (const field of HOST_FIELDS) {
    if (record.host[field] !== observed.host[field]) return stale("host_changed");
  }
  // Stale when now >= expires_at, with no grace period. Written as "not
  // strictly before" so a record built without the parser whose expires_at
  // does not parse reads as expired, never fresh.
  if (!(nowMs < new Date(record.expires_at).getTime())) return stale("horizon_expired");
  return Object.freeze({ fresh: true } as const);
}

/**
 * `${evaluated_at}-${binary_sha256.slice(0, 12)}.json`. The surface is the
 * directory (spec section 5.1), not part of the name.
 */
export function capabilityRecordFilename(record: CapabilityRecordV1): string {
  // The parser already guarantees both. They are checked again so a record
  // built without the parser can never put a path separator into the name.
  const evaluatedAt = record.evaluated_at;
  const binarySha256 = record.binary_sha256;
  canonicalTimestampMs(evaluatedAt, "timestamp", "evaluated_at");
  if (typeof binarySha256 !== "string" || !SHA256_HEX.test(binarySha256)) {
    reject("schema", "binary_sha256");
  }
  return `${evaluatedAt}-${binarySha256.slice(0, 12)}.json`;
}
