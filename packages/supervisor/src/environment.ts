import type { AdapterRegistrationV1 } from "@madventures/protocol";

export interface EnvironmentAllowlistV1 {
  readonly ref: string;
  readonly variables: readonly {
    readonly name: string;
    readonly secret: boolean;
    readonly required: boolean;
  }[];
}

// PLAN-OPEN-2, as bound by DEC-20261010-03 B1. No installation validation
// occurs here; the caller supplies an already eligible ambient environment.
const allowlists: Readonly<Record<string, EnvironmentAllowlistV1>> = Object.freeze({
  "claude-code-v1": Object.freeze({
    ref: "claude-code-v1",
    variables: Object.freeze([
      { name: "HOME", required: true, secret: false },
      { name: "PATH", required: true, secret: false },
      { name: "SHELL", required: true, secret: false },
      { name: "TERM", required: true, secret: false },
      { name: "TMPDIR", required: true, secret: false },
      { name: "CLAUDE_CONFIG_DIR", required: true, secret: false },
      { name: "LANG", required: false, secret: false },
      { name: "LC_ALL", required: false, secret: false },
      { name: "LC_CTYPE", required: false, secret: false },
      { name: "USER", required: false, secret: false },
    ].map(variable => Object.freeze(variable))),
  }),
  "antigravity-v1": Object.freeze({
    ref: "antigravity-v1",
    variables: Object.freeze([
      { name: "HOME", required: true, secret: false },
      { name: "PATH", required: true, secret: false },
      { name: "SHELL", required: true, secret: false },
      { name: "TERM", required: true, secret: false },
      { name: "TMPDIR", required: true, secret: false },
      { name: "LANG", required: false, secret: false },
      { name: "LC_ALL", required: false, secret: false },
      { name: "LC_CTYPE", required: false, secret: false },
      { name: "USER", required: false, secret: false },
    ].map(variable => Object.freeze(variable))),
  }),
});

export class MissingRequiredVariableError extends Error {
  constructor(readonly variableName: string, readonly ref: string) {
    super(`Missing required environment variable ${variableName} for ${ref}`);
    this.name = "MissingRequiredVariableError";
  }
}

export class UnknownEnvironmentAllowlistError extends Error {
  constructor(readonly ref: string) {
    super(`Unknown environment allowlist ${ref}`);
    this.name = "UnknownEnvironmentAllowlistError";
  }
}

function resolveAllowlist(registration: AdapterRegistrationV1): EnvironmentAllowlistV1 {
  const ref = registration.environment_allowlist_ref;
  if (!Object.hasOwn(allowlists, ref)) throw new UnknownEnvironmentAllowlistError(ref);
  return allowlists[ref]!;
}

// B5 test-only entry point. Not exported from the package index.
export function buildEnvironmentFromAllowlist(
  allowlist: EnvironmentAllowlistV1,
  ambient: NodeJS.ProcessEnv,
): Readonly<Record<string, string>> {
  const result: Record<string, string> = {};
  for (const variable of allowlist.variables) {
    const value = ambient[variable.name];
    if (typeof value === "string") {
      result[variable.name] = value;
    } else if (variable.required) {
      throw new MissingRequiredVariableError(variable.name, allowlist.ref);
    }
  }
  return Object.freeze(result);
}

// B5 test-only entry point. Values exist only in this call's local rules;
// returned diagnostics contain text and rule names, never rule values.
export function redactWithAllowlist(
  text: string,
  environment: Readonly<Record<string, string>>,
  allowlist: EnvironmentAllowlistV1,
): { readonly text: string; readonly rulesApplied: readonly string[] } {
  const rules = [];
  for (const variable of allowlist.variables) {
    if (!variable.secret) continue;
    const value = environment[variable.name];
    if (typeof value === "string" && value.length > 0) {
      rules.push({ name: variable.name, value });
    }
  }
  const rulesApplied = rules.map(rule => `secret-value:${rule.name}`);
  rules.sort((a, b) => b.value.length - a.value.length);
  for (const rule of rules) {
    text = text.split(rule.value).join(`<redacted:${rule.name}>`);
  }
  return { text, rulesApplied };
}

export function buildAllowlistedEnvironment(
  registration: AdapterRegistrationV1,
  ambient: NodeJS.ProcessEnv,
): Readonly<Record<string, string>> {
  return buildEnvironmentFromAllowlist(resolveAllowlist(registration), ambient);
}

export function redact(
  text: string,
  environment: Readonly<Record<string, string>>,
  registration: AdapterRegistrationV1,
): { readonly text: string; readonly rulesApplied: readonly string[] } {
  return redactWithAllowlist(text, environment, resolveAllowlist(registration));
}
