import { expect, spyOn, test } from "bun:test";
import { readFileSync } from "node:fs";
import { ADAPTER_REGISTRY, parseSurfaceId } from "@madventures/protocol";
import { parseMadvAuthReadiness, parseMadvIdentity } from "../src/index";

const current = "MiniMax-M3.1-Flash";
const retired = "MiniMax-M3.1-Flash-Preview";
const { supported_versions: supportedVersions } = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;

// Both hosts' captures 04 through 07 have four UUID replacements each, all in
// session_id. Capture 03, stderr and status are copied without replacements.
function fixture(host: string, number: string) {
  const root = new URL("./fixtures/recorded-0.1.2/" + host + "/", import.meta.url);
  const read = (ext: string) => readFileSync(new URL(number + "." + ext, root), "utf8");
  const status = /^exit=(\d+)\nsignal=(none|SIG[A-Z0-9]+)\ntimed_out=no\n$/.exec(read("status"));
  if (!status) throw new Error("Unexpected status for " + host + " " + number);
  expect(read("stderr")).toBe("");
  return { output: read("stdout"), exit: Number(status[1]), signal: status[2] === "none" ? null : status[2]! };
}

function observeIdentity(host: string, number: string, requested: string) {
  const { output, exit, signal } = fixture(host, number);
  const events: Record<string, unknown>[] = [];
  const decode = JSON.parse;
  const observer = spyOn(JSON, "parse").mockImplementation((...args: Parameters<typeof JSON.parse>) => {
    const event = decode(...args);
    events.push(event);
    return event;
  });
  let result: ReturnType<typeof parseMadvIdentity>;
  try {
    result = parseMadvIdentity(output, requested, supportedVersions, exit, signal);
  } finally {
    observer.mockRestore();
  }
  expect(events[0]).toMatchObject({ type: "system", subtype: "init", surface_version: "0.1.2", tools: [] });
  expect(events[0]?.tools).toEqual([]);
  const responses = events.filter(event => event.type === "model_response");
  expect(responses.length).toBeGreaterThan(0);
  for (const response of responses) {
    expect(typeof response.response_id).toBe("string");
    expect(response.response_id).not.toBe("");
  }
  return { result, responses };
}

for (const host of ["macbook", "ubuntu"]) {
  test(host + " 0.1.2 capture 03 passes auth readiness", () => {
    const { output, exit, signal } = fixture(host, "03");
    expect(parseMadvAuthReadiness(output, exit, signal).ok).toBe(true);
  });

  for (const number of ["04", "05", "06"]) {
    test(host + " 0.1.2 capture " + number + " passes tool-free identity with response IDs for " + current, () => {
      expect(observeIdentity(host, number, current).result.ok).toBe(true);
    });
  }

  for (const [requested, reason] of [[retired, "response_predicate"], [current, "init_predicate"]] as const) {
    test(host + " 0.1.2 capture 07 returns identity_mismatch (" + reason + ") for " + requested + " while reporting " + current, () => {
      const { result, responses } = observeIdentity(host, "07", requested);
      expect(result).toMatchObject({ ok: false, cause: "identity_mismatch", reason, interrupt: "whole_session", retry: false });
      for (const response of responses) expect(response.response_model).toBe(current);
    });
  }
}
