import { expect, spyOn, test } from "bun:test";
import { readFileSync } from "node:fs";
import { MadvSurfaceParser, parseMadvAuthReadiness, parseMadvIdentity } from "../src/index";

// These are the Founder's sanitized recorded bytes, not synthetic streams.
// SANITIZE.txt replaced UUID-shaped session_id values only: MacBook stdout
// 04/05/06/07 has 4/4/4/7 replacements; Ubuntu has 4/7/4/4.
// Capture 03, every stderr and every status has zero replacements.
// No replaced UUID is recovered, and no fixture is normalized for admission.
const model = "MiniMax-M3.1-Flash";
const retired = "MiniMax-M3.1-Flash-Preview";
function fixture(host: string, capture: string) {
  const root = new URL("./fixtures/recorded/" + host + "/", import.meta.url);
  const read = (suffix: string) => readFileSync(new URL(capture + "." + suffix, root), "utf8");
  const fields = new Map(read("status").trimEnd().split("\n").map(line => {
    const equals = line.indexOf("=");
    return [line.slice(0, equals), line.slice(equals + 1)];
  }));
  expect(fields.get("timed_out")).toBe("no");
  expect(read("stderr")).toBe("");
  const exit = Number(fields.get("exit"));
  const signal = fields.get("signal") === "none" ? null : fields.get("signal")!;
  return { output: read("stdout"), exit, signal };
}

for (const host of ["macbook", "ubuntu"]) {
  test(host + " 03 recorded auth-readiness passes", () => {
    const f = fixture(host, "03");
    expect(parseMadvAuthReadiness(f.output, f.exit, f.signal).ok).toBe(true);
  });
}
for (const [host, capture] of [
  ["macbook", "04"], ["macbook", "05"], ["macbook", "06"],
  ["ubuntu", "04"], ["ubuntu", "06"],
]) {
  test(host + " " + capture + " recorded tools fail probe identity and pass a governed launch", () => {
    const f = fixture(host!, capture!);
    expect(parseMadvIdentity(f.output, model, ["0.1.1"], f.exit, f.signal)).toMatchObject({
      ok: false, cause: "identity_mismatch", reason: "init_tools",
    });
    const launch = new MadvSurfaceParser({
      executionId: "recorded-launch", sessionId: "recorded-session", model,
      supportedVersions: ["0.1.1"], provider: "minimax", independenceDomain: "minimax",
    });
    launch.push(f.output);
    expect(launch.finish(f.exit, f.signal).ok).toBe(true);
  });
}
test("ubuntu 05 recorded identity fails closed with provider_error", () => {
  const f = fixture("ubuntu", "05");
  const result = parseMadvIdentity(f.output, model, ["0.1.1"], f.exit, f.signal);
  expect(result.ok).toBe(false);
  if (result.ok) throw new Error("failed identity was admitted");
  expect(result.cause).toBe("provider_error");
  expect(result.interrupt).toBe("whole_session");
  expect(result.retry).toBe(false);
});

for (const host of ["macbook", "ubuntu"]) {
  for (const requested of [retired, model]) {
    const cause = host === "macbook" ? "provider_error" : "identity_mismatch";
    test(host + " 07 fails closed with " + cause + " for " + requested + " while reporting MiniMax-M3.1-Flash", () => {
      const f = fixture(host, "07");
      const observed = new Array<string>();
      const originalParse = JSON.parse;
      // Failure results intentionally expose no event payload. Observe the
      // values decoded by the adapter without changing or accepting them.
      // Restore this observation seam even when an assertion fails.
      const observer = spyOn(JSON, "parse").mockImplementation((...args: Parameters<typeof JSON.parse>) => {
        const event = originalParse(...args);
        if (event?.type === "model_response") observed.push(event.response_model);
        return event;
      });
      let result: ReturnType<typeof parseMadvIdentity>;
      try {
        result = parseMadvIdentity(f.output, requested, ["0.1.1"], f.exit, f.signal);
      } finally {
        observer.mockRestore();
      }
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error("retired-id stream was admitted");
      expect(result.cause).toBe(cause);
      expect(result.interrupt).toBe("whole_session");
      expect(result.retry).toBe(false);
      expect(observed).toEqual([model]);
    });
  }
}
