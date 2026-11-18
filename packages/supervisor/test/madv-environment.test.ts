import { expect, test } from "bun:test";
import { buildAllowlistedEnvironment, MissingRequiredVariableError, redact } from "../src/environment";
import { CANARY, madvRegistration } from "./madv-preflight-support";

const required = ["HOME", "PATH", "SHELL", "TERM", "TMPDIR", "MINIMAX_API_KEY"];
const optional = ["LANG", "LC_ALL", "LC_CTYPE", "USER"];
const ambient = () => Object.fromEntries([...required, ...optional].map(name => [name, name === "MINIMAX_API_KEY" ? CANARY : "fixture:" + name]));

test("madv-surface-v1 has exactly the approved variables", () => {
  const values = ambient();
  expect(Object.keys(buildAllowlistedEnvironment(madvRegistration(), values))).toEqual([...required, ...optional]);
  for (const name of optional) {
    const absent = { ...values }; delete absent[name];
    expect(buildAllowlistedEnvironment(madvRegistration(), absent)).not.toHaveProperty(name);
  }
  expect(Object.isFrozen(buildAllowlistedEnvironment(madvRegistration(), values))).toBe(true);
});
test("madv-surface-v1 requires exactly the six required variables", () => {
  for (const name of required) {
    const values = ambient(); delete values[name];
    let caught: unknown;
    try { buildAllowlistedEnvironment(madvRegistration(), values); } catch (error) { caught = error; }
    expect(caught).toBeInstanceOf(MissingRequiredVariableError);
    expect((caught as MissingRequiredVariableError).variableName).toBe(name);
    expect((caught as MissingRequiredVariableError).ref).toBe("madv-surface-v1");
    expect(JSON.stringify(caught)).not.toContain(CANARY);
  }
});
test("madv-surface-v1 drops state, overrides and unlisted variables", () => {
  const values = { ...ambient(), XDG_STATE_HOME: "state", MADV_SURFACE_TEST_ENDPOINT: "endpoint", MADV_SURFACE_TEST_CA: "ca", UNLISTED: "extra" };
  const result = buildAllowlistedEnvironment(madvRegistration(), values);
  expect(result).toEqual(ambient());
  for (const name of ["XDG_STATE_HOME", "MADV_SURFACE_TEST_ENDPOINT", "MADV_SURFACE_TEST_CA", "UNLISTED"]) expect(result).not.toHaveProperty(name);
});
test("madv-surface redacts its synthetic canary", () => {
  const result = redact("before " + CANARY + " / " + CANARY + " after", buildAllowlistedEnvironment(madvRegistration(), ambient()), madvRegistration());
  expect(result.text).toBe("before <redacted:MINIMAX_API_KEY> / <redacted:MINIMAX_API_KEY> after");
  expect(result.rulesApplied).toEqual(["secret-value:MINIMAX_API_KEY"]);
  expect(JSON.stringify(result)).not.toContain(CANARY);
});
