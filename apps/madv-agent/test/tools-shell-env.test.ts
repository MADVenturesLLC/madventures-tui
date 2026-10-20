// apps/madv-agent/test/tools-shell-env.test.ts
// BITE PROOFS for the shell's child environment.
//
// The first version of this test asserted a condition the product did not have:
// it set GOMODCACHE in the test process (after the entry scrub would have
// deleted it) and then checked the child saw it. The child inherits what the
// ENTRY allowlist kept, so the allowlist is what must be tested — and the tool
// is what must be tested for inheritance.

import { describe, expect, test } from "bun:test";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { shellTool } from "../src/tools";
import { scrubEnvironment } from "../src/scrub";

describe("shell child environment", () => {
  test("BITE: the entry allowlist keeps the toolchain homes and drops the secrets", () => {
    const { kept, dropped } = scrubEnvironment({
      PATH: "/usr/bin:/bin",
      HOME: "/Users/someone",
      GOPATH: "/Users/someone/go",
      GOMODCACHE: "/Users/someone/go/pkg/mod",
      GOCACHE: "/Users/someone/Library/Caches/go-build",
      GOFLAGS: "-mod=mod",
      GH_TOKEN: "ghp_secret",
      OLLAMA_API_KEY: "ollama_secret",
      OPENAI_API_KEY: "sk-secret",
      ANTHROPIC_AUTH_TOKEN: "auth_secret",
    });

    for (const name of ["PATH", "HOME", "GOPATH", "GOMODCACHE", "GOCACHE", "GOFLAGS"]) {
      expect(kept[name]).toBeDefined();
    }
    for (const name of ["GH_TOKEN", "OLLAMA_API_KEY", "OPENAI_API_KEY", "ANTHROPIC_AUTH_TOKEN"]) {
      expect(kept[name]).toBeUndefined();
      expect(dropped).toContain(name);
    }
    expect(JSON.stringify(kept)).not.toContain("secret");
  });

  test("BITE: a child inherits what the agent kept, and never a secret", () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-env-"));
    const saved = {
      GOMODCACHE: process.env.GOMODCACHE,
      GOFLAGS: process.env.GOFLAGS,
      OLLAMA_API_KEY: process.env.OLLAMA_API_KEY,
      GH_TOKEN: process.env.GH_TOKEN,
    };
    process.env.GOMODCACHE = "/probe/go/pkg/mod";
    process.env.GOFLAGS = "-mod=mod";
    process.env.OLLAMA_API_KEY = "probe-secret-value";
    process.env.GH_TOKEN = "probe-gh-token";

    try {
      const res = shellTool.run({ argv: ["env"] }, { projectDir: dir });
      const out = res.output ?? "";
      expect(out).toContain("HOME=");
      expect(out).toContain("PATH=");
      expect(out).toContain("GOMODCACHE=/probe/go/pkg/mod");
      expect(out).toContain("GOFLAGS=-mod=mod");
      expect(out).not.toContain("probe-secret-value");
      expect(out).not.toContain("probe-gh-token");
      expect(out).not.toMatch(/OLLAMA_API_KEY=/);
      expect(out).not.toMatch(/GH_TOKEN=/);
    } finally {
      for (const [k, v] of Object.entries(saved)) {
        if (v === undefined) delete process.env[k];
        else process.env[k] = v;
      }
    }
  });
});
