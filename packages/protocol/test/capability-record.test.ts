// packages/protocol/test/capability-record.test.ts
// Tests for the capability record (Task 35): a dated observation with explicit
// staleness rules, never a live authorization. Rulings: act
// FOUNDER-ACT-20261004-TASK35-EXECUTION-AUTHORIZATION Part B and PLAN-OPEN-3,
// with B3 to B5 of act FOUNDER-ACT-20261005-TASK35-CORRECTION
// (docs/decisions/DEC-20261005-01-task35-correction-authorization.md) and B5
// and B6 of act FOUNDER-ACT-20261007-TASK35-SECOND-CORRECTION
// (docs/decisions/DEC-20261007-01-task35-second-correction-authorization.md)
// pinned inside "a passing record is not a live authorization".
// Registry-derived fixture values are read from ADAPTER_REGISTRY, never
// restated here.

import { expect, test } from "bun:test";
import * as capabilityRecordModule from "../src/capability-record";
import {
  CapabilityRecordError,
  capabilityRecordFilename,
  evaluateCapabilityFreshness,
  parseCapabilityRecord,
  type CapabilityRecordV1,
  type ObservedSurfaceFacts,
  type StalenessReason,
} from "../src/capability-record";
import * as protocolIndex from "../src";
import { ADAPTER_REGISTRY, type AdapterRegistrationV1 } from "../src/adapter-registry";
import type { SurfaceId } from "../src/surface-id";
import { KNOWN_ROLES } from "../src/task-envelope";

// ─── Fixture ───

// PLAN-OPEN-3: exactly 30 × 24 × 60 × 60 × 1000 milliseconds, written out
// independently of the implementation.
const THIRTY_DAYS_MS = 2_592_000_000;
const EVALUATED_AT = "2026-09-01T00:00:00.000Z";
const EXPIRES_AT = "2026-10-01T00:00:00.000Z";
const NOW_IN_HORIZON = "2026-09-15T12:00:00.000Z";
const BINARY_SHA256 = "0123456789abcdef".repeat(4);
const OTHER_BINARY_SHA256 = "fedcba9876543210".repeat(4);
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

function registrations(): readonly AdapterRegistrationV1[] {
  const all = [...ADAPTER_REGISTRY.values()];
  if (all.length === 0) {
    throw new Error("ADAPTER_REGISTRY has no registration to build a fixture from");
  }
  return all;
}

const REGISTRATION = registrations()[0]!;

function rawRecord(registration: AdapterRegistrationV1 = REGISTRATION): Record<string, unknown> {
  const cliVersion = registration.supported_versions[0];
  if (cliVersion === undefined) {
    throw new Error("registration has no supported version to build a fixture from");
  }
  return {
    surface: registration.surface,
    provider: registration.provider,
    requested_model: "example-model-1",
    role_eligibility: [...KNOWN_ROLES],
    independence_domain: registration.independence_domain,
    organization_id: registration.organization_id,
    cli_version: cliVersion,
    binary_path: `/opt/example/bin/${registration.executable_name}`,
    binary_sha256: BINARY_SHA256,
    evaluated_at: EVALUATED_AT,
    expires_at: EXPIRES_AT,
    host: {
      arch: "arm64",
      macos_version: "15.0",
      macos_build: "24A335",
      bun_version: "1.3.11",
      bun_path: "/opt/example/bin/bun",
      bun_sha256: "ab".repeat(32),
      term: "xterm-256color",
      shell: "/bin/zsh",
    },
    identity_attestation: { result: "pass", primitive: "example-identity-probe", sanitized_facts: "" },
    auth_readiness:
      registration.auth_readiness_probe === null
        ? { result: "no_primitive", primitive: null }
        : { result: "pass", primitive: registration.auth_readiness_probe.argv.join(" ") },
    pty: { result: "pass", observed_ms: { spawn: 12, first_output: 40 } },
    independent_review_eligible: true,
    limitations: [...registration.limitations],
    overall: "pass",
    redaction_rules_applied: ["example-redaction-rule"],
  };
}

function rawWith(
  overrides: Record<string, unknown>,
  registration: AdapterRegistrationV1 = REGISTRATION,
): Record<string, unknown> {
  return { ...rawRecord(registration), ...overrides };
}

function observedMatching(record: CapabilityRecordV1): ObservedSurfaceFacts {
  return { cli_version: record.cli_version, binary_sha256: record.binary_sha256, host: { ...record.host } };
}

function shiftedIso(iso: string, deltaMs: number): string {
  return new Date(Date.parse(iso) + deltaMs).toISOString();
}

function stale(reason: StalenessReason): { readonly fresh: false; readonly reason: StalenessReason } {
  return { fresh: false, reason };
}

/** Strings that parse to the same instant as `iso` but are not its canonical form. */
function noncanonicalFormsOf(iso: string): string[] {
  const ms = Date.parse(iso);
  const forms = [
    iso.replace(/\.\d{3}Z$/, "Z"),
    iso.replace(/Z$/, "+00:00"),
    new Date(ms + 2 * 3_600_000).toISOString().replace(/Z$/, "+02:00"),
    new Date(ms).toUTCString(),
  ];
  if (iso.endsWith("T00:00:00.000Z")) forms.push(iso.slice(0, 10));
  for (const form of forms) {
    expect(form).not.toBe(iso);
    expect(Date.parse(form)).toBe(ms);
  }
  return forms;
}

/** Runs `run`, requires a CapabilityRecordError of `kind` naming `field`, and returns it. */
function expectRejected(
  run: () => unknown,
  kind: CapabilityRecordError["kind"],
  field: string,
): CapabilityRecordError {
  let caught: unknown;
  try {
    run();
  } catch (error) {
    caught = error;
  }
  expect(caught).toBeInstanceOf(CapabilityRecordError);
  const error = caught as CapabilityRecordError;
  expect(error.kind).toBe(kind);
  expect(error.field).toBe(field);
  return error;
}

/** B5: a rejection carries no record content in its message, stack or any own property. */
function expectNoContent(error: CapabilityRecordError, content: string): void {
  expect(error.message).not.toContain(content);
  expect(String(error.stack)).not.toContain(content);
  for (const key of Reflect.ownKeys(error)) {
    expect(String(Object.getOwnPropertyDescriptor(error, key)?.value)).not.toContain(content);
  }
}

function objectsIn(value: unknown, found: Set<object> = new Set()): Set<object> {
  if (typeof value === "object" && value !== null) {
    found.add(value);
    for (const nested of Object.values(value)) objectsIn(nested, found);
  }
  return found;
}

// ─── Freshness: fixed order and exact boundary (B2) ───

test("capability freshness fails on binary_hash_changed", () => {
  const record = parseCapabilityRecord(rawRecord());
  const matching = observedMatching(record);
  expect(evaluateCapabilityFreshness(record, NOW_IN_HORIZON, matching)).toStrictEqual({ fresh: true });

  const hashOnly: ObservedSurfaceFacts = { ...matching, binary_sha256: OTHER_BINARY_SHA256 };
  expect(evaluateCapabilityFreshness(record, NOW_IN_HORIZON, hashOnly)).toStrictEqual(stale("binary_hash_changed"));

  // Hash, CLI version, host and expiry all fail: the hash is reported first.
  const everythingChanged: ObservedSurfaceFacts = {
    binary_sha256: OTHER_BINARY_SHA256,
    cli_version: `${record.cli_version}-changed`,
    host: { ...record.host, arch: `${record.host.arch}-changed` },
  };
  const pastExpiry = shiftedIso(record.expires_at, 1);
  expect(evaluateCapabilityFreshness(record, pastExpiry, everythingChanged)).toStrictEqual(
    stale("binary_hash_changed"),
  );
});

test("capability freshness fails on cli_version_changed", () => {
  const record = parseCapabilityRecord(rawRecord());
  const matching = observedMatching(record);

  const cliOnly: ObservedSurfaceFacts = { ...matching, cli_version: `${record.cli_version}-changed` };
  expect(evaluateCapabilityFreshness(record, NOW_IN_HORIZON, cliOnly)).toStrictEqual(stale("cli_version_changed"));

  // CLI version, host and expiry fail: the CLI version is reported first.
  const cliHostAndExpiry: ObservedSurfaceFacts = {
    ...matching,
    cli_version: `${record.cli_version}-changed`,
    host: { ...record.host, shell: `${record.host.shell}-changed` },
  };
  const pastExpiry = shiftedIso(record.expires_at, 1);
  expect(evaluateCapabilityFreshness(record, pastExpiry, cliHostAndExpiry)).toStrictEqual(
    stale("cli_version_changed"),
  );
});

test("capability freshness fails on host_changed", () => {
  const record = parseCapabilityRecord(rawRecord());
  const matching = observedMatching(record);
  expect(Object.keys(record.host).sort()).toEqual([...HOST_FIELDS].sort());
  const pastExpiry = shiftedIso(record.expires_at, 1);

  // Each of the eight host fields, compared by exact string equality, fails
  // on its own, and host is reported before expiry.
  for (const field of HOST_FIELDS) {
    for (const changed of [`${record.host[field]}-changed`, `${record.host[field]} `]) {
      const hostOnly: ObservedSurfaceFacts = { ...matching, host: { ...record.host, [field]: changed } };
      expect(evaluateCapabilityFreshness(record, NOW_IN_HORIZON, hostOnly)).toStrictEqual(stale("host_changed"));
      expect(evaluateCapabilityFreshness(record, pastExpiry, hostOnly)).toStrictEqual(stale("host_changed"));
    }
  }
});

test("capability freshness fails on horizon_expired", () => {
  const record = parseCapabilityRecord(rawRecord());
  const matching = observedMatching(record);
  expect(record.expires_at).toBe(EXPIRES_AT);

  // No grace period: fresh one millisecond before expires_at, stale at it.
  expect(evaluateCapabilityFreshness(record, shiftedIso(record.expires_at, -1), matching)).toStrictEqual({
    fresh: true,
  });
  expect(evaluateCapabilityFreshness(record, record.expires_at, matching)).toStrictEqual(stale("horizon_expired"));
  expect(evaluateCapabilityFreshness(record, shiftedIso(record.expires_at, 1), matching)).toStrictEqual(
    stale("horizon_expired"),
  );
});

// ─── Registration cross-check (B4, B5) ───

test("a record whose independence_domain disagrees with the registration fails admission", () => {
  for (const registration of registrations()) {
    expect(parseCapabilityRecord(rawRecord(registration)).independence_domain).toBe(
      registration.independence_domain,
    );
    const disagreeing = [`${registration.independence_domain}-other`, registration.independence_domain.toUpperCase()];
    for (const value of disagreeing) {
      expect(value).not.toBe(registration.independence_domain);
      const error = expectRejected(
        () => parseCapabilityRecord(rawWith({ independence_domain: value }, registration)),
        "registration_mismatch",
        "independence_domain",
      );
      expectNoContent(error, value);
    }
  }
});

test("a record whose organization_id disagrees with the registration fails admission", () => {
  for (const registration of registrations()) {
    expect(parseCapabilityRecord(rawRecord(registration)).organization_id).toBe(registration.organization_id);
    const disagreeing = [`${registration.organization_id}-other`, registration.organization_id.toUpperCase()];
    for (const value of disagreeing) {
      expect(value).not.toBe(registration.organization_id);
      const error = expectRejected(
        () => parseCapabilityRecord(rawWith({ organization_id: value }, registration)),
        "registration_mismatch",
        "organization_id",
      );
      expectNoContent(error, value);
    }
  }
});

// ─── Exports and inert records (B8, B3) ───

test("a passing record is not a live authorization", () => {
  // B8: the runtime exports are one class and three functions, and no
  // exported function is an authorization, certification or admission.
  const exported = Object.entries(capabilityRecordModule);
  expect(exported.map(([name]) => name).sort()).toEqual([
    "CapabilityRecordError",
    "capabilityRecordFilename",
    "evaluateCapabilityFreshness",
    "parseCapabilityRecord",
  ]);
  for (const [name, value] of exported) {
    expect(typeof value).toBe("function");
    expect(name).not.toMatch(/authoriz|certif|admit/i);
  }
  const indexExports = new Map<string, unknown>(Object.entries(protocolIndex));
  for (const [name, value] of exported) {
    expect(indexExports.get(name)).toBe(value);
  }

  // A passing record is inert data: a deeply frozen copy that shares nothing
  // with its input, leaves the input unchanged, and cannot carry an
  // authorization key.
  const raw = rawRecord();
  const before = structuredClone(raw);
  const record = parseCapabilityRecord(raw);
  expect(record.overall).toBe("pass");
  expect(raw).toStrictEqual(before);
  expect(record).toStrictEqual(before as unknown as CapabilityRecordV1);
  const rawObjects = objectsIn(raw);
  const recordObjects = objectsIn(record);
  expect(recordObjects.size).toBe(rawObjects.size);
  for (const object of recordObjects) {
    expect(Object.isFrozen(object)).toBe(true);
    expect(rawObjects.has(object)).toBe(false);
  }
  expect(() => {
    (record as { overall: string }).overall = "fail";
  }).toThrow(TypeError);
  expect(evaluateCapabilityFreshness(record, NOW_IN_HORIZON, observedMatching(record))).toStrictEqual({ fresh: true });

  expectRejected(() => parseCapabilityRecord(rawWith({ authorized: true })), "schema", "record");
  const pty = rawRecord()["pty"] as Record<string, unknown>;
  expectRejected(() => parseCapabilityRecord(rawWith({ pty: { ...pty, admitted: true } })), "schema", "pty");

  // ── Correction act B3 and B4: inspecting the input can itself throw ──
  // A revoked handle, a throwing trap or a getter makes an ordinary inspection
  // raise. None of that escapes: each is a schema rejection naming the
  // container being inspected, and nothing of the original exception is kept.

  const revokedInput = Proxy.revocable({}, {});
  revokedInput.revoke();
  expectRejected(() => parseCapabilityRecord(revokedInput.proxy as Record<string, unknown>), "schema", "record");

  // The trap chooses its own error text, so it is set here to a value this
  // record carries. That text must reach neither the rejection's message, its
  // stack nor any of its own properties.
  const leaked = "example-sanitized-fact-never-in-a-rejection";
  const identityWithFact = {
    ...(rawRecord()["identity_attestation"] as Record<string, unknown>),
    sanitized_facts: leaked,
  };
  const carrying = parseCapabilityRecord(rawWith({ identity_attestation: identityWithFact }));
  expect(carrying.identity_attestation.sanitized_facts).toBe(leaked);

  const throwingPrototype = new Proxy(
    {},
    {
      getPrototypeOf(): never {
        throw new Error(leaked);
      },
    },
  );
  expectNoContent(
    expectRejected(
      () => parseCapabilityRecord(rawWith({ host: throwingPrototype, identity_attestation: identityWithFact })),
      "schema",
      "host",
    ),
    leaked,
  );

  const throwingOwnKeys = new Proxy(
    {},
    {
      ownKeys(): never {
        throw new Error(leaked);
      },
    },
  );
  expectNoContent(
    expectRejected(
      () => parseCapabilityRecord(rawWith({ pty: throwingOwnKeys, identity_attestation: identityWithFact })),
      "schema",
      "pty",
    ),
    leaked,
  );

  const revokedRoles = Proxy.revocable([] as unknown[], {});
  revokedRoles.revoke();
  expectRejected(
    () => parseCapabilityRecord(rawWith({ role_eligibility: revokedRoles.proxy })),
    "schema",
    "role_eligibility",
  );

  // ── Correction act B5: checks the correction base already enforces ──

  // Spec section 9.1 copies provider from the registration, so a differing
  // provider fails admission for every registration, not just the first.
  for (const registration of registrations()) {
    for (const value of [`${registration.provider}-other`, registration.provider.toUpperCase()]) {
      expect(value).not.toBe(registration.provider);
      expectNoContent(
        expectRejected(
          () => parseCapabilityRecord(rawWith({ provider: value }, registration)),
          "registration_mismatch",
          "provider",
        ),
        value,
      );
    }
  }

  // role_eligibility entries are each one of KNOWN_ROLES and never repeated.
  const firstRole = KNOWN_ROLES[0]!;
  expectRejected(
    () => parseCapabilityRecord(rawWith({ role_eligibility: [firstRole, firstRole] })),
    "schema",
    "role_eligibility",
  );
  for (const unknown of ["founder", `${firstRole}-other`, firstRole.toUpperCase()]) {
    expect(KNOWN_ROLES).not.toContain(unknown);
    expectRejected(
      () => parseCapabilityRecord(rawWith({ role_eligibility: [unknown] })),
      "schema",
      "role_eligibility",
    );
  }

  // Every pty.observed_ms value is finite and not negative. -1 is caught only
  // by the non-negativity check, NaN and Infinity only by the finiteness one.
  for (const ms of [-1, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
    expectRejected(
      () => parseCapabilityRecord(rawWith({ pty: { ...pty, observed_ms: { spawn: ms } } })),
      "schema",
      "pty.observed_ms",
    );
  }

  // ── Second correction act B5: containment by construction ──
  // Comparing an index with an array's length converts whatever the length
  // read returned, which runs code the input supplies. Whatever that code
  // throws, even a rejection of this module's own class or a value posing as
  // one, is replaced by a fresh schema rejection naming the array.
  const thrownValues = (): unknown[] => {
    const revokedValue = Proxy.revocable({}, {});
    revokedValue.revoke();
    const constructed = new CapabilityRecordError("registration_mismatch", "provider");
    constructed.message = leaked;
    const posing = { name: "CapabilityRecordError", kind: "registration_mismatch", field: "provider", message: leaked };
    const proxied = new Proxy(new CapabilityRecordError("registration_mismatch", "provider"), {});
    return [new Error(leaked), revokedValue.proxy, constructed, posing, proxied];
  };
  const withLength = (array: readonly unknown[], length: unknown): unknown =>
    new Proxy([...array], {
      get: (target, key, receiver) => (key === "length" ? length : Reflect.get(target, key, receiver)),
    });
  for (const name of ["role_eligibility", "limitations", "redaction_rules_applied"]) {
    const valid = rawRecord()[name] as readonly unknown[];
    for (const hook of [Symbol.toPrimitive, "valueOf"]) {
      for (const thrown of thrownValues()) {
        const length = {
          [hook]: (): never => {
            throw thrown;
          },
        };
        const error = expectRejected(
          () =>
            parseCapabilityRecord(rawWith({ [name]: withLength(valid, length), identity_attestation: identityWithFact })),
          "schema",
          name,
        );
        expect(error).not.toBe(thrown);
        expectNoContent(error, leaked);
      }
    }
    const revokedLength = Proxy.revocable({}, {});
    revokedLength.revoke();
    expectRejected(
      () => parseCapabilityRecord(rawWith({ [name]: withLength(valid, revokedLength.proxy) })),
      "schema",
      name,
    );
  }

  // ── Second correction act B6: every host field is a string ──
  const host = rawRecord()["host"] as Record<string, unknown>;
  for (const field of HOST_FIELDS) {
    expectRejected(() => parseCapabilityRecord(rawWith({ host: { ...host, [field]: 17 } })), "schema", `host.${field}`);
  }

  // DEC-20261008-01 B6(a): genuine exported rejections still belong to another call.
  const exportedRejections = [
    () => evaluateCapabilityFreshness(carrying, "invalid-now", observedMatching(carrying)),
    () => capabilityRecordFilename({ ...carrying, evaluated_at: "invalid-timestamp" }),
  ];
  for (const name of ["role_eligibility", "limitations", "redaction_rules_applied"]) {
    for (const obtain of exportedRejections) {
      const originalPush = Array.prototype.push;
      let thrown: unknown;
      const valid = name === "role_eligibility" ? [KNOWN_ROLES[0]!] : ["example-array-value"];
      const array = new Proxy(valid, {
        get(target, key, receiver) {
          if (key === "length") {
            Array.prototype.push = function (): never {
              Array.prototype.push = originalPush;
              try {
                obtain();
              } catch (error) {
                thrown = error;
                (error as CapabilityRecordError).message = leaked;
                throw error;
              }
              throw new Error("expected an exported rejection");
            };
          }
          return Reflect.get(target, key, receiver);
        },
      });
      try {
        const error = expectRejected(
          () => parseCapabilityRecord(rawWith({ [name]: array, identity_attestation: identityWithFact })),
          "schema",
          name,
        );
        expect(error).not.toBe(thrown);
        expectNoContent(error, leaked);
      } finally {
        Array.prototype.push = originalPush;
      }
    }
  }

  // DEC-20261008-01 B6(b): earlier and nested parses have their own state.
  let earlier: unknown;
  try {
    parseCapabilityRecord(rawWith({ overall: 17 }));
  } catch (error) {
    earlier = error;
  }
  const conversionRejections = [
    ...exportedRejections,
    () => { throw earlier; },
    () => parseCapabilityRecord(rawWith({ overall: 17 })),
  ];
  for (const obtain of conversionRejections) {
    let thrown: unknown;
    const length = {
      valueOf(): never {
        try {
          obtain();
        } catch (error) {
          thrown = error;
          (error as CapabilityRecordError).message = leaked;
          throw error;
        }
        throw new Error("expected a conversion rejection");
      },
    };
    const error = expectRejected(
      () => parseCapabilityRecord(rawWith({
        role_eligibility: withLength(rawRecord()["role_eligibility"] as readonly unknown[], length),
        identity_attestation: identityWithFact,
      })),
      "schema",
      "role_eligibility",
    );
    expect(error).not.toBe(thrown);
    expectNoContent(error, leaked);
  }
});

// ─── Filename (B6) ───

test("the capability filename is derived from the normalized surface and binary hash, never a display name", () => {
  const record = parseCapabilityRecord(rawRecord());
  const name = capabilityRecordFilename(record);
  expect(name).toBe("2026-09-01T00:00:00.000Z-0123456789ab.json");
  expect(name).toBe(`${record.evaluated_at}-${record.binary_sha256.slice(0, 12)}.json`);
  expect(name).not.toContain("/");
  expect(name).not.toContain("\\");
  expect(name).not.toContain("\0");

  // Display text in requested_model or limitations never reaches the name:
  // records that differ only there, alone or together, share it.
  const displayModel = { requested_model: "Example Model / Display Name" };
  const displayLimitations = { limitations: ["a display name ../../elsewhere"] };
  for (const overrides of [displayModel, displayLimitations, { ...displayModel, ...displayLimitations }]) {
    const displayed = parseCapabilityRecord(rawWith(overrides));
    expect(displayed).not.toStrictEqual(record);
    expect(capabilityRecordFilename(displayed)).toBe(name);
  }

  // The surface names the directory (spec section 5.1), so only the
  // normalized, registered identifier is accepted, never a display form.
  for (const display of [
    REGISTRATION.surface.toUpperCase(),
    `${REGISTRATION.surface} display`,
    `../${REGISTRATION.surface}`,
  ]) {
    expectRejected(() => parseCapabilityRecord(rawWith({ surface: display })), "schema", "surface");
  }
  const unregistered = "unregistered-example-surface";
  expect(ADAPTER_REGISTRY.has(unregistered as SurfaceId)).toBe(false);
  expectRejected(() => parseCapabilityRecord(rawWith({ surface: unregistered })), "unregistered_surface", "surface");

  // Only 64 lowercase hexadecimal characters reach the name, and a timestamp
  // with a separator never does.
  for (const badHash of [
    BINARY_SHA256.toUpperCase(),
    BINARY_SHA256.slice(1),
    `${BINARY_SHA256}0`,
    `../${BINARY_SHA256.slice(3)}`,
  ]) {
    expectRejected(() => parseCapabilityRecord(rawWith({ binary_sha256: badHash })), "schema", "binary_sha256");
  }
  expectRejected(
    () => parseCapabilityRecord(rawWith({ evaluated_at: "2026/09/01 00:00:00" })),
    "timestamp",
    "evaluated_at",
  );

  // A record built without the parser is refused rather than named.
  expectRejected(
    () => capabilityRecordFilename({ ...record, binary_sha256: `../${BINARY_SHA256.slice(3)}` }),
    "schema",
    "binary_sha256",
  );
  expectRejected(() => capabilityRecordFilename({ ...record, evaluated_at: "../../x" }), "timestamp", "evaluated_at");
});

// ─── Stored timestamps (B3, PLAN-OPEN-3) ───

test("parseCapabilityRecord rejects a malformed or nonfinite evaluated_at or expires_at", () => {
  expect(parseCapabilityRecord(rawRecord()).evaluated_at).toBe(EVALUATED_AT);

  const malformed = ["not-a-timestamp", "", "2026-13-01T00:00:00.000Z"];
  for (const value of malformed) expect(Number.isNaN(Date.parse(value))).toBe(true);
  // Well formed, but one millisecond past the largest time value, so the
  // parsed value is not finite and toISOString() would throw.
  const beyondRange = "+275760-09-13T00:00:00.001Z";
  expect(Number.isFinite(Date.parse(beyondRange))).toBe(false);
  const nonfinite: unknown[] = [beyondRange, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
  const notStrings: unknown[] = [Date.parse(EVALUATED_AT), null, true];

  for (const field of ["evaluated_at", "expires_at"]) {
    for (const value of [...malformed, ...nonfinite, ...notStrings]) {
      expectRejected(() => parseCapabilityRecord(rawWith({ [field]: value })), "timestamp", field);
    }
  }
});

test("parseCapabilityRecord requires exact canonical UTC toISOString() round-trip equality", () => {
  // Every form below parses to the same instant as the canonical value, so
  // only the round-trip comparison can reject it.
  for (const value of noncanonicalFormsOf(EVALUATED_AT)) {
    expectRejected(() => parseCapabilityRecord(rawWith({ evaluated_at: value })), "timestamp", "evaluated_at");
  }
  for (const value of noncanonicalFormsOf(EXPIRES_AT)) {
    expectRejected(() => parseCapabilityRecord(rawWith({ expires_at: value })), "timestamp", "expires_at");
  }
  const record = parseCapabilityRecord(rawRecord());
  expect(record.evaluated_at).toBe(EVALUATED_AT);
  expect(record.expires_at).toBe(EXPIRES_AT);
});

test("expires_at must equal evaluated_at plus exactly 30 days", () => {
  expect(THIRTY_DAYS_MS).toBe(30 * 24 * 60 * 60 * 1000);
  expect(Date.parse(EXPIRES_AT) - Date.parse(EVALUATED_AT)).toBe(THIRTY_DAYS_MS);
  expect(parseCapabilityRecord(rawRecord()).expires_at).toBe(EXPIRES_AT);

  const otherEvaluatedAt = "2026-02-15T08:30:00.123Z";
  const otherExpiresAt = shiftedIso(otherEvaluatedAt, THIRTY_DAYS_MS);
  expect(
    parseCapabilityRecord(rawWith({ evaluated_at: otherEvaluatedAt, expires_at: otherExpiresAt })).expires_at,
  ).toBe(otherExpiresAt);

  const dayMs = 24 * 60 * 60 * 1000;
  for (const delta of [THIRTY_DAYS_MS - 1, THIRTY_DAYS_MS + 1, THIRTY_DAYS_MS - dayMs, THIRTY_DAYS_MS + dayMs, 0, -THIRTY_DAYS_MS]) {
    expectRejected(
      () => parseCapabilityRecord(rawWith({ expires_at: shiftedIso(EVALUATED_AT, delta) })),
      "timestamp",
      "expires_at",
    );
  }
});

// ─── Caller-supplied now (B2) ───

test("evaluateCapabilityFreshness rejects an invalid now value", () => {
  const record = parseCapabilityRecord(rawRecord());
  const matching = observedMatching(record);
  expect(evaluateCapabilityFreshness(record, NOW_IN_HORIZON, matching)).toStrictEqual({ fresh: true });

  const invalidNow: unknown[] = [
    "not-a-time",
    "",
    "+275760-09-13T00:00:00.001Z",
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Date.parse(NOW_IN_HORIZON),
    null,
    ...noncanonicalFormsOf(NOW_IN_HORIZON),
  ];
  // now is validated before anything else, so a changed hash cannot mask it.
  const hashChanged: ObservedSurfaceFacts = { ...matching, binary_sha256: OTHER_BINARY_SHA256 };
  for (const now of invalidNow) {
    expectRejected(() => evaluateCapabilityFreshness(record, now as string, matching), "invalid_now", "now");
    expectRejected(() => evaluateCapabilityFreshness(record, now as string, hashChanged), "invalid_now", "now");
  }
});
