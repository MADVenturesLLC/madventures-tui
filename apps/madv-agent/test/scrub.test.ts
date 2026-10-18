// apps/madv-agent/test/scrub.test.ts
// BITE PROOF (b): launched from a shell exporting GH_TOKEN and a decoy
// OPENAI_API_KEY, the process environment contains neither after the scrub,
// and the client's request carries no provider key.
// Remove the scrub and every assertion here fails.

import { describe, expect, test } from "bun:test";
import { scrubEnvironment, scrubProcessEnvironment, ENV_ALLOWLIST, isMandatedDrop } from "../src/scrub";
import { buildChatRequest } from "../src/model-client";

describe("environment scrub (design §6)", () => {
  test("drops GH_TOKEN and a decoy OPENAI_API_KEY by name, keeping values out of the result", () => {
    const env = {
      PATH: "/usr/bin:/bin",
      HOME: "/home/founder",
      TERM: "xterm-256color",
      GH_TOKEN: "ghp_decoy",
      GITHUB_TOKEN: "github_pat_decoy",
      OPENAI_API_KEY: "sk-decoy",
      ANTHROPIC_API_KEY: "ak-decoy",
      HTTPS_PROXY: "http://10.0.0.1:8080",
      https_proxy: "http://10.0.0.1:8080",
      SOME_RANDOM_VAR: "whatever",
    };
    const { kept, dropped } = scrubEnvironment(env);
    expect(Object.keys(kept).sort()).toEqual(["HOME", "PATH", "TERM"]);
    expect(dropped).toEqual([
      "ANTHROPIC_API_KEY",
      "GH_TOKEN",
      "GITHUB_TOKEN",
      "HTTPS_PROXY",
      "OPENAI_API_KEY",
      "SOME_RANDOM_VAR",
      "https_proxy",
    ]);
    // No dropped VALUE anywhere in the kept environment.
    for (const value of Object.values(kept)) {
      expect(value).not.toContain("decoy");
    }
  });

  test("scrubbing the live process environment removes GH_TOKEN and OPENAI_API_KEY", () => {
    const fakeProcessEnv: Record<string, string | undefined> = {
      ...Object.fromEntries(ENV_ALLOWLIST.map((n) => [n, "x"])),
      GH_TOKEN: "ghp_live_decoy",
      OPENAI_API_KEY: "sk_live_decoy",
    };
    const result = scrubProcessEnvironment(fakeProcessEnv);
    expect(fakeProcessEnv["GH_TOKEN"]).toBeUndefined();
    expect(fakeProcessEnv["OPENAI_API_KEY"]).toBeUndefined();
    expect(result.dropped).toContain("GH_TOKEN");
    expect(result.dropped).toContain("OPENAI_API_KEY");
  });

  test("mandated drops hold even if a name were added to the allowlist", () => {
    expect(isMandatedDrop("OPENAI_API_KEY")).toBe(true);
    expect(isMandatedDrop("GH_TOKEN")).toBe(true);
    expect(isMandatedDrop("GITHUB_TOKEN")).toBe(true);
    expect(isMandatedDrop("HTTPS_PROXY")).toBe(true);
    expect(isMandatedDrop("PATH")).toBe(false);
  });

  test("the model client's request carries no Authorization header and no key material", () => {
    const { url, init } = buildChatRequest("http://127.0.0.1:14933", [
      { role: "user", content: "hello" },
    ]);
    expect(url).toBe("http://127.0.0.1:14933/v1/chat/completions");
    const headers = init.headers as Record<string, string>;
    expect(headers["Authorization"]).toBeUndefined();
    expect(headers["authorization"]).toBeUndefined();
    expect(String(init.body)).not.toMatch(/api[_-]?key|token|bearer/i);
  });
});
