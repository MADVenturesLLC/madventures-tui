import { expect, test } from "bun:test";
import { ADAPTER_REGISTRY, parseSurfaceId } from "@madventures/protocol";
import { buildAllowlistedEnvironment, redact } from "../src/environment";

test("madv-surface-v1 selects exactly the B6 variable set", () => {
  const registration = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;
  expect(registration.environment_allowlist_ref).toBe("madv-surface-v1");
  // Supply a synthetic value even for a name introduced after this test.
  const ambient = new Proxy({}, { get: () => "fixture" });
  const approved = ["HOME", "PATH", "SHELL", "TERM", "TMPDIR", "MINIMAX_API_KEY", "LANG", "LC_ALL", "LC_CTYPE", "USER"];
  expect(Object.keys(buildAllowlistedEnvironment(registration, ambient)).sort()).toEqual(approved.sort());
});

test("madv allowlist pins the required and secret attribute of every variable", () => {
  const registration = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;
  const required = ["HOME", "PATH", "SHELL", "TERM", "TMPDIR", "MINIMAX_API_KEY"];
  const optional = ["LANG", "LC_ALL", "LC_CTYPE", "USER"];
  const names = [...required, ...optional];
  const synthetic = Object.fromEntries(names.map(name => [name, "offline-value-" + name + "."]));

  for (const name of names) {
    const remaining = { ...synthetic };
    delete remaining[name];
    if (required.includes(name)) {
      expect(() => buildAllowlistedEnvironment(registration, remaining))
        .toThrow("Missing required environment variable " + name + " for madv-surface-v1");
    } else {
      expect(buildAllowlistedEnvironment(registration, remaining)).toEqual(remaining);
    }
  }
  const redacted = redact(names.map(name => synthetic[name]).join(" "), synthetic, registration);
  expect(redacted.rulesApplied).toEqual(["secret-value:MINIMAX_API_KEY"]);
  expect(redacted.text).toBe(names.map(name =>
    name === "MINIMAX_API_KEY" ? "<redacted:MINIMAX_API_KEY>" : synthetic[name]).join(" "));
});
