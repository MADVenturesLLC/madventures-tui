// apps/madv-agent/test/launcher-and-limits.test.ts
// Defects from the first real run by the Founder (2026-10-20):
//   D1 the launcher cd-ed into the repo, so `--project .` meant the repo
//   D2 the shell timeout was a hard 20s, and a cold `go test` needs minutes
//   D3 an approval answer with escape/paste residue was read as a denial

import { describe, expect, test } from "bun:test";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseArgs } from "../src/cli";
import { normaliseApprovalAnswer } from "../src/approval";
import { shellTool } from "../src/tools";

describe("D2 — shell timeout", () => {
  test("is whole seconds, 5..600, and nothing else", () => {
    expect(parseArgs(["--shell-timeout", "90"]).shellTimeoutMs).toBe(90_000);
    expect(parseArgs(["--shell-timeout", "5"]).shellTimeoutMs).toBe(5_000);
    expect(parseArgs(["--shell-timeout", "600"]).shellTimeoutMs).toBe(600_000);
    for (const bad of ["4", "601", "0", "-1", "90s", "1e3", "12abc", ""]) {
      expect(() => parseArgs(["--shell-timeout", bad])).toThrow();
    }
    expect(parseArgs([]).shellTimeoutMs).toBeUndefined();
  });

  test("BITE: the tool honours the context value and says which one it used", () => {
    const dir = mkdtempSync(join(tmpdir(), "madv-timeout-"));
    const started = Date.now();
    const res = shellTool.run({ argv: ["sleep", "2"] }, { projectDir: dir, shellTimeoutMs: 300 });
    const elapsed = Date.now() - started;
    expect(res.ok).toBe(false);
    expect(res.summary).toContain("300ms");
    expect(elapsed).toBeLessThan(1900);
  });

  test("default is 120s, not 20s", () => {
    const src = readFileSync(new URL("../src/tools/index.ts", import.meta.url), "utf8");
    expect(src).toContain("const SHELL_TIMEOUT_MS = 120_000;");
  });
});

describe("D3 — the approval answer normalises residue", () => {
  test("accepts a yes that arrived with residue", () => {
    for (const raw of ["y", "Y", " y ", "]y", "y]", "\u001b[200~y\u001b[201~", "\u001b[1;1Ry"]) {
      expect(normaliseApprovalAnswer(raw).answer).toBe("y");
    }
    // "yes" stays "yes" — both are affirmative, and the word is not truncated.
    expect(normaliseApprovalAnswer("yes").answer).toBe("yes");
    expect(normaliseApprovalAnswer("yes ").answer).toBe("yes");
  });

  test("still refuses everything that is not that word", () => {
    for (const raw of ["", " ", "n", "no", "yess", "ny", "ya", "maybe"]) {
      const { answer } = normaliseApprovalAnswer(raw);
      expect(answer === "y" || answer === "yes").toBe(false);
    }
  });

  test("records that residue was ignored, so a yes is auditable", () => {
    expect(normaliseApprovalAnswer("]y").residue).toBe(true);
    expect(normaliseApprovalAnswer("y").residue).toBe(false);
  });
});

describe("review findings on the approval gate and the timeout", () => {
  test("an OSC terminated by ST does not leak its payload into the answer", () => {
    // ESC ] 0 ; t i t l e ST y  -> the human typed "y" after a terminal title set
    const { answer, residue } = normaliseApprovalAnswer("\u001b]0;title\u001b\\y");
    expect(answer).toBe("y");
    expect(residue).toBe(true);
    // an unterminated OSC must not leave its body behind either
    expect(normaliseApprovalAnswer("\u001b]0;noise").answer).toBe("");
  });

  test("BITE: the audit records the RAW answer, not a normalised copy", () => {
    // The line reader used to lowercase and trim before the approver saw the
    // text, so every reason claimed to quote the human and quoted a copy.
    const src = readFileSync(new URL("../src/approval.tsx", import.meta.url), "utf8");
    expect(src).not.toMatch(/queue\.push\(line\.trim\(\)\.toLowerCase\(\)\)/);
    expect(src).not.toMatch(/waiter\(line\.trim\(\)\.toLowerCase\(\)\)/);
  });

  test("the help text names --shell-timeout", () => {
    const src = readFileSync(new URL("../src/cli.ts", import.meta.url), "utf8");
    expect(src).toContain("--shell-timeout <s>");
  });
});

describe("D1 — the launcher must not change the caller's directory", () => {
  const launcher = readFileSync(new URL("../bin/madv", import.meta.url), "utf8");

  test("BITE: no cd into the repository before exec", () => {
    expect(launcher).not.toMatch(/^\s*cd\s+"?\$REPO/m);
    expect(launcher).not.toContain('cd "$REPO"');
  });

  test("invokes the entry point by absolute path", () => {
    expect(launcher).toContain('ENTRY="$APP_DIR/src/cli.ts"');
    expect(launcher).toMatch(/bun "\$ENTRY" "\$@"/);
  });

  test("starts the proxy portably (ss, then lsof, then nc)", () => {
    expect(launcher).toContain("command -v ss");
    expect(launcher).toContain("command -v lsof");
    expect(launcher).toContain("command -v nc");
  });
});
