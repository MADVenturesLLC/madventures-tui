// apps/madv-agent/test/tools-shell-env.test.ts
// BITE PROOF: the shell's child environment must be the agent's environment
// (so `go vet`, `cargo`, `npm` work) minus every name the scrub drops.
// On d604ae3 the child got PATH alone, which broke `go vet ./...` with a
// missing GOMODCACHE — the agent could not run the gates it was asked to run.
//
// This asserts through the TOOL, not a helper, so reverting the call site to
// `env: { PATH }` fails it.

import { describe, expect, test } from "bun:test";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { shellTool } from "../src/tools";

describe("shell child environment", () => {
  test("BITE: a child sees HOME and toolchain homes, and never a secret", () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-env-"));
    const saved = {
      GOMODCACHE: process.env.GOMODCACHE,
      OLLAMA_API_KEY: process.env.OLLAMA_API_KEY,
      GH_TOKEN: process.env.GH_TOKEN,
    };
    process.env.GOMODCACHE = "/probe/go/pkg/mod";
    process.env.OLLAMA_API_KEY = "probe-secret-value";
    process.env.GH_TOKEN = "probe-gh-token";

    try {
      const res = shellTool.run({ argv: ["env"] }, { projectDir: dir });
      const out = res.output ?? "";

      // Toolchain paths the agent legitimately needs.
      expect(out).toContain("HOME=");
      expect(out).toContain("PATH=");
      expect(out).toContain("GOMODCACHE=/probe/go/pkg/mod");

      // Secrets are dropped by name even though the parent has them.
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
