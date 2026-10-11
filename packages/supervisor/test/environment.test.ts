import { expect, test } from "bun:test";
import { ADAPTER_REGISTRY, type AdapterRegistrationV1 } from "@madventures/protocol";
import {
  buildAllowlistedEnvironment,
  buildEnvironmentFromAllowlist,
  redact,
  redactWithAllowlist,
  MissingRequiredVariableError,
  UnknownEnvironmentAllowlistError,
  type EnvironmentAllowlistV1,
} from "../src/environment";

const registrations = [...ADAPTER_REGISTRY.values()];
const commonRequired = ["HOME", "PATH", "SHELL", "TERM", "TMPDIR"];
const optional = ["LANG", "LC_ALL", "LC_CTYPE", "USER"];
const excluded = [
  "ANTHROPIC_API_KEY", "ANTHROPIC_AUTH_TOKEN", "ANTHROPIC_BASE_URL",
  "CLAUDE_CODE_OAUTH_TOKEN", "ANTHROPIC_MODEL", "CLAUDE_CODE_SUBAGENT_MODEL",
  "GH_TOKEN", "GITHUB_TOKEN", "SSH_AUTH_SOCK", "MADV_STORAGE_DIR",
  "MADV_SESSION_ID", "MADV_EXECUTION_ID", "MADV_RUNTIME_DIR", "MADV_SOCKET_PATH",
];
function requiredNames(registration: AdapterRegistrationV1): string[] {
  return registration.environment_allowlist_ref === "claude-code-v1"
    ? [...commonRequired, "CLAUDE_CONFIG_DIR"] : [...commonRequired];
}
function ambientFor(registration: AdapterRegistrationV1): Record<string, string> {
  return Object.fromEntries(requiredNames(registration).map(name => [name, `fixture:${name}`]));
}
const secretFixture: EnvironmentAllowlistV1 = {
  ref: "test-only",
  variables: [
    { name: "SHORT", required: true, secret: true },
    { name: "LONG", required: true, secret: true },
    { name: "UNMATCHED", required: false, secret: true },
    { name: "EMPTY", required: false, secret: true },
    { name: "ABSENT", required: false, secret: true },
    { name: "VISIBLE", required: false, secret: false },
  ],
};
const secretEnvironment = {
  SHORT: "abc", LONG: "prefix-abc-suffix", UNMATCHED: "unseen-value",
  EMPTY: "", VISIBLE: "public-text",
};

test("no ambient variable outside the allowlist survives", () => {
  expect(registrations).toHaveLength(2);
  for (const registration of registrations) {
    const ambient = ambientFor(registration);
    for (const name of [...excluded, "MADV_SECRET_LEAK"]) ambient[name] = "1";
    // Ambient insertion order differs from allowlist order.
    const reversed = Object.fromEntries(Object.entries({ ...ambient, USER: "fixture-user", LANG: "fixture-lang" }).reverse());
    const result = buildAllowlistedEnvironment(registration, reversed);
    expect(result).toEqual({ ...ambientFor(registration), LANG: "fixture-lang", USER: "fixture-user" });
    for (const name of [...excluded, "MADV_SECRET_LEAK"]) expect(Object.hasOwn(result, name)).toBe(false);
    expect(result.LANG).toBe("fixture-lang");
    expect(Object.hasOwn(result, "LC_ALL")).toBe(false);
    expect(Object.hasOwn(result, "LC_CTYPE")).toBe(false);
    expect(Object.keys(result)).toEqual([...requiredNames(registration), "LANG", "USER"]);
    const allOptional = { ...ambientFor(registration), ...Object.fromEntries(optional.map(name => [name, name])) };
    expect(Object.keys(buildAllowlistedEnvironment(registration, allOptional))).toEqual([...requiredNames(registration), ...optional]);
    let reads = 0;
    Object.defineProperty(allOptional, "HOME", { get: () => { reads++; return "read-once"; } });
    expect(buildAllowlistedEnvironment(registration, allOptional).HOME).toBe("read-once");
    expect(reads).toBe(1);
    const other = registrations.find(entry => entry !== registration)!;
    const referenceOnly = { ...registration, environment_allowlist_ref: other.environment_allowlist_ref };
    expect(buildAllowlistedEnvironment(referenceOnly, ambientFor(other))).toEqual(ambientFor(other));
  }
});

test("a missing required allowlisted variable is a typed failure", () => {
  for (const registration of registrations) {
    for (const name of requiredNames(registration)) {
      for (const missing of [undefined, null, 42, { sentinel: "private-value" }]) {
        const planted = Object.fromEntries(requiredNames(registration).map(key => [key, `distinctive-ambient-${key}-8f41c2`]));
        const ambient = { ...planted, [name]: missing } as NodeJS.ProcessEnv;
        let caught: unknown;
        try { buildAllowlistedEnvironment(registration, ambient); } catch (error) { caught = error; }
        expect(caught).toBeInstanceOf(MissingRequiredVariableError);
        const error = caught as MissingRequiredVariableError;
        expect(error.variableName).toBe(name);
        expect(error.ref).toBe(registration.environment_allowlist_ref);
        expect(error.message).toContain(name);
        expect(Object.keys(error).sort()).toEqual(["name", "ref", "variableName"]);
        const representations = [
          ...Reflect.ownKeys(error).map(key => {
            const value = Reflect.get(error, key);
            return `${String(value)} ${JSON.stringify(value)}`;
          }),
          error.message, error.stack ?? "", String(error), JSON.stringify(error),
        ];
        for (const value of [...Object.values(planted), "private-value"]) {
          for (const representation of representations) expect(representation).not.toContain(value);
        }
      }
    }
    const unknown = { ...registration, environment_allowlist_ref: "unknown-reference" };
    const planted = Object.fromEntries(requiredNames(registration).map(key => [key, `distinctive-ambient-${key}-8f41c2`]));
    for (const invoke of [
      () => buildAllowlistedEnvironment(unknown, planted),
      () => redact("diagnostic", planted, unknown),
    ]) {
      let caught: unknown;
      try { invoke(); } catch (error) { caught = error; }
      expect(caught).toBeInstanceOf(UnknownEnvironmentAllowlistError);
      const error = caught as UnknownEnvironmentAllowlistError;
      expect(error.ref).toBe("unknown-reference");
      expect(Object.keys(error).sort()).toEqual(["name", "ref"]);
      const representations = [
        ...Reflect.ownKeys(error).map(key => {
          const value = Reflect.get(error, key);
          return `${String(value)} ${JSON.stringify(value)}`;
        }),
        error.message, error.stack ?? "", String(error), JSON.stringify(error),
      ];
      for (const value of Object.values(planted)) {
        for (const representation of representations) expect(representation).not.toContain(value);
      }
    }
  }
});

test("secret-marked values are redacted from diagnostics while their names are retained", () => {
  const environment = buildEnvironmentFromAllowlist(secretFixture, secretEnvironment);
  const text = "prefix-abc-suffix / abc / prefix-abc-suffix / abc / public-text";
  const result = redactWithAllowlist(text, environment, secretFixture);
  expect(result.text).toBe("<redacted:LONG> / <redacted:SHORT> / <redacted:LONG> / <redacted:SHORT> / public-text");
  for (const fragment of ["abc", "prefix-", "-suffix"]) expect(result.text).not.toContain(fragment);
  expect(Object.keys(result).sort()).toEqual(["rulesApplied", "text"]);
  expect(JSON.stringify(result)).not.toContain("unseen-value");
});

test("redaction reports which rules ran", () => {
  const expected = ["secret-value:SHORT", "secret-value:LONG", "secret-value:UNMATCHED"];
  expect(redactWithAllowlist("prefix-abc-suffix abc", secretEnvironment, secretFixture).rulesApplied).toEqual(expected);
  expect(redactWithAllowlist("no match here", secretEnvironment, secretFixture)).toEqual({ text: "no match here", rulesApplied: expected });
  for (const registration of registrations) {
    expect(redact("fixture:HOME", ambientFor(registration), registration)).toEqual({ text: "fixture:HOME", rulesApplied: [] });
  }
});

test("the same registration produces byte-identical environments on repeated calls", () => {
  for (const registration of registrations) {
    const ambient = { ...ambientFor(registration), LANG: "fixture-lang", MADV_SECRET_LEAK: "1" };
    const before = JSON.stringify(ambient);
    const first = buildAllowlistedEnvironment(registration, ambient);
    const second = buildAllowlistedEnvironment(registration, ambient);
    expect(JSON.stringify(first)).toBe(JSON.stringify(second));
    expect(first).not.toBe(second);
    expect(first).not.toBe(ambient);
    expect(JSON.stringify(ambient)).toBe(before);
    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(second)).toBe(true);
  }
});
