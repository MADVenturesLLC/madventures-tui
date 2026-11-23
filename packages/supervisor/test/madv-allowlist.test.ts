import { expect, test } from "bun:test";
import { ADAPTER_REGISTRY, parseSurfaceId } from "@madventures/protocol";
import { buildAllowlistedEnvironment } from "../src/environment";

test("madv-surface-v1 selects exactly the B6 variable set", () => {
  const registration = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;
  expect(registration.environment_allowlist_ref).toBe("madv-surface-v1");
  // Supply a synthetic value even for a name introduced after this test.
  const ambient = new Proxy({}, { get: () => "fixture" });
  const approved = ["HOME", "PATH", "SHELL", "TERM", "TMPDIR", "MINIMAX_API_KEY", "LANG", "LC_ALL", "LC_CTYPE", "USER"];
  expect(Object.keys(buildAllowlistedEnvironment(registration, ambient)).sort()).toEqual(approved.sort());
});
