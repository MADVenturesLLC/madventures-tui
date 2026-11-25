import { expect, test } from "bun:test";
import { parseMadvIdentity } from "../src/index";

test("refused and unknown model families precede a missing response id", () => {
  const model = "MiniMax-M3.1-Flash";
  const stamp = { session_id: "offline-precedence", ts: "2026-11-23T00:00:00Z" };
  const identity = { provider: "minimax", profile: "minimax", endpoint_host: "api.minimax.io" };
  const init = { ...stamp, ...identity, type: "system", subtype: "init", surface: "madv-surface",
    surface_version: "0.1.2", requested_model: model, tools: [] };
  const outcomes = ["claude-synthetic", "unknown-family"].map(response_model => {
    const response = { ...stamp, ...identity, type: "model_response", response_model,
      response_independence_domain: "minimax", tls_verified_host: "api.minimax.io" };
    const stream = JSON.stringify(init) + "\n" + JSON.stringify(response) + "\n";
    const result = parseMadvIdentity(stream, model, ["0.1.2"]);
    return result.ok ? "accepted" : result.cause;
  });
  expect(outcomes).toEqual(["model_refused", "domain_unresolved"]);
});
