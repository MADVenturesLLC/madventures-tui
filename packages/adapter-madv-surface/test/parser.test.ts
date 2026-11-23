import { expect, test } from "bun:test";
import { encodeUserInput, MadvSurfaceParser, parseMadvIdentity, parseMadvAuthReadiness, type MadvFailureCause } from "../src/index";

const model = "MiniMax-M3.1-Flash";
const context = { executionId: "execution", sessionId: "governed-session", model, supportedVersions: ["0.1.1"], provider: "minimax", independenceDomain: "minimax" };
const stamp = { session_id: "wire-session", ts: "2026-11-15T00:00:00.000Z" };
const init = (change: Record<string, unknown> = {}) => ({ ...stamp, type: "system", subtype: "init", surface: "madv-surface", surface_version: "0.1.1", binary_sha256: "a".repeat(64), profile: "minimax", provider: "minimax", endpoint_host: "api.minimax.io", requested_model: model, role: "reviewer", tools: [], ...change });
const response = (change: Record<string, unknown> = {}) => ({ ...stamp, type: "model_response", profile: "minimax", provider: "minimax", endpoint_host: "api.minimax.io", response_model: model, response_maker: "minimax", response_independence_domain: "minimax", tls_verified_host: "api.minimax.io", response_id: "response", ...change });
const event = (type: string, change: Record<string, unknown> = {}) => ({ ...stamp, type, ...change });
const wire = (...events: unknown[]) => events.map(value => JSON.stringify(value)).join("\n") + "\n";
const auth = { loggedIn: true, authMethod: "plan_key", profile: "minimax", provider: "minimax", endpointHost: "api.minimax.io", verified: true, verifyMethod: "read_only_endpoint" };

test("input encoder preserves one text in one newline-terminated user message", () => {
  for (const text of ["", "hello\nworld", '"\\\r\t雪🙂', "Reply with your model identifier and nothing else."]) {
    const encoded = encodeUserInput(text);
    expect(encoded.endsWith("\n")).toBe(true); expect(encoded.split("\n")).toHaveLength(2);
    expect(JSON.parse(encoded)).toEqual({ type: "user", message: { role: "user", content: text } });
  }
});
test("valid identity evidence binds execution and session", () => {
  const parser = new MadvSurfaceParser(context);
  parser.push(wire(init(), response(), event("assistant", { message: { role: "assistant", content: "ok" }, response_model: model }), event("result", { subtype: "success", is_error: false })));
  const result = parser.finish(0);
  expect(result.ok).toBe(true);
  if (result.ok) {
    expect(result.modelResponses).toBe(1);
    for (const bound of result.events) { expect(bound.executionId).toBe(context.executionId); expect(bound.sessionId).toBe(context.sessionId); expect(Object.isFrozen(bound.event)).toBe(true); }
  }
});
const failures: Array<{ name: string; cause: MadvFailureCause; exit: number; events: unknown[] }> = [
  { name: "HTTP 401", cause: "auth_failed", exit: 5, events: [event("system", { subtype: "auth_failed", code: "http_401", exit_code: 5 })] },
  { name: "HTTP 403", cause: "auth_failed", exit: 5, events: [event("system", { subtype: "auth_failed", code: "http_403", exit_code: 5 })] },
  { name: "redirect", cause: "endpoint_refused", exit: 6, events: [event("system", { subtype: "endpoint_refused", code: "redirect", exit_code: 6 })] },
  { name: "HTTP error", cause: "provider_error", exit: 1, events: [event("system", { subtype: "provider_error", code: "http_503", exit_code: 1 }), event("result", { subtype: "error", is_error: true })] },
  { name: "invalid body", cause: "provider_error", exit: 1, events: [event("system", { subtype: "provider_error", code: "invalid_json", exit_code: 1 })] },
  { name: "absent model", cause: "identity_unavailable", exit: 3, events: [event("system", { subtype: "identity_unavailable", code: "model_field_absent", exit_code: 3 })] },
  { name: "Anthropic model", cause: "model_refused", exit: 7, events: [response({ response_model: "claude-fable-5-2", response_maker: "anthropic", response_independence_domain: "anthropic" }), event("system", { subtype: "model_refused", code: "anthropic_model", exit_code: 7 })] },
  { name: "unnamed family", cause: "domain_unresolved", exit: 7, events: [response({ response_model: "unknown-model", response_maker: null, response_independence_domain: null }), event("system", { subtype: "domain_unresolved", code: "unknown_family", exit_code: 7 })] },
  { name: "model mismatch", cause: "identity_mismatch", exit: 4, events: [response({ response_model: "MiniMax-other" })] },
  { name: "domain mismatch", cause: "identity_mismatch", exit: 4, events: [response({ response_independence_domain: "another-domain" })] },
];
for (const example of failures) test("failure precedence: " + example.name, () => {
  const parser = new MadvSurfaceParser(context); parser.push(wire(init(), ...example.events));
  const result = parser.finish(example.exit);
  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.cause).toBe(example.cause); expect(result.interrupt).toBe("whole_session"); expect(result.retry).toBe(false);
    expect(result.executionId).toBe(context.executionId); expect(result.sessionId).toBe(context.sessionId);
  }
});
for (const field of ["surface", "surface_version", "profile", "provider", "endpoint_host", "requested_model"]) {
  test("identity rejects init " + field, () => {
    for (const value of [undefined, null, 42, "wrong"]) expect(parseMadvIdentity(wire(init({ [field]: value }), response()), model, ["0.1.1"]).ok).toBe(false);
  });
}
for (const field of ["response_model", "response_independence_domain", "tls_verified_host", "provider", "profile", "endpoint_host"]) {
  test("identity rejects response " + field, () => {
    for (const value of [undefined, null, 42, field === "response_model" ? "MiniMax-other" : "wrong"]) expect(parseMadvIdentity(wire(init(), response({ [field]: value })), model, ["0.1.1"]).ok).toBe(false);
  });
}
for (const field of Object.keys(auth)) test("auth rejects " + field, () => {
  for (const value of [undefined, null, false, 42, "wrong"]) expect(parseMadvAuthReadiness(JSON.stringify({ ...auth, [field]: value })).ok).toBe(false);
});
test("auth accepts exactly the passing predicate and ignores additive metadata", () => {
  expect(parseMadvAuthReadiness(JSON.stringify({ ...auth, extra: "not-evidence" })).ok).toBe(true);
});
test("auth rejects malformed shape, nonzero exit and signal", () => {
  for (const text of ["", "null", "[]", "{}", "not-json", JSON.stringify(auth) + "\n" + JSON.stringify(auth)]) expect(parseMadvAuthReadiness(text).ok).toBe(false);
  expect(parseMadvAuthReadiness(JSON.stringify(auth), 1).ok).toBe(false);
  expect(parseMadvAuthReadiness(JSON.stringify(auth), 0, "SIGTERM").ok).toBe(false);
});
test("identity requires a model response and clean zero exit", () => {
  expect(parseMadvIdentity(wire(init()), model, ["0.1.1"]).ok).toBe(false);
  expect(parseMadvIdentity(wire(init(), response()), model, ["0.1.1"], 1).ok).toBe(false);
  expect(parseMadvIdentity(wire(init(), response()), model, ["0.1.1"], 0, "SIGTERM").ok).toBe(false);
  expect(parseMadvIdentity(wire(init(), response()), model, ["0.1.1"]).ok).toBe(true);
});
test("missing evidence fails at the 30-second deadline", () => {
  let now = 0; const parser = new MadvSurfaceParser(context, () => now);
  parser.push(wire(init())); now = 29_999; expect(parser.checkDeadline().ok).toBe(true);
  now = 30_000; const result = parser.checkDeadline();
  expect(result.ok).toBe(false);
  if (!result.ok) { expect(result.cause).toBe("identity_unavailable"); expect(result.reason).toBe("evidence_deadline"); expect(result.interrupt).toBe("whole_session"); expect(result.retry).toBe(false); }
});
test("a new request starts its own evidence deadline without a second parser", () => {
  let now = 0; const parser = new MadvSurfaceParser(context, () => now);
  parser.push(wire(init(), response(), event("result", { subtype: "success", is_error: false })));
  now = 50_000; expect(parser.checkDeadline().ok).toBe(true); parser.beginRequest();
  now = 80_000; expect(parser.checkDeadline().ok).toBe(false);
});
test("exit without evidence for a later request fails closed", () => {
  const parser = new MadvSurfaceParser(context);
  parser.push(wire(init(), response(), event("result", { subtype: "success", is_error: false })));
  parser.beginRequest();
  const result = parser.finish(0);
  expect(result.ok).toBe(false);
  if (!result.ok) expect(result.cause).toBe("identity_unavailable");
});
const orderCases: Array<{ name: string; events: unknown[] }> = [
  { name: "missing init", events: [response()] },
  { name: "duplicate init", events: [init(), response(), init()] },
  { name: "out-of-session event", events: [init(), response({ session_id: "other" })] },
  { name: "assistant before response", events: [init(), event("assistant", { message: { role: "assistant", content: "early" } }), response()] },
  { name: "tool before response", events: [init(), event("tool_use", { tool_use_id: "t", name: "read_file" }), response()] },
  { name: "unmatched tool result", events: [init(), response(), event("tool_result", { tool_use_id: "t", name: "read_file" })] },
  { name: "response before pending tool result", events: [init(), response(), event("tool_use", { tool_use_id: "t", name: "read_file" }), response()] },
  { name: "duplicate tool id", events: [init(), response(), event("tool_use", { tool_use_id: "t", name: "read_file" }), event("tool_use", { tool_use_id: "t", name: "read_file" })] },
  { name: "result before response", events: [init(), event("result", { subtype: "success", is_error: false }), response()] },
];
for (const example of orderCases) test("event order rejects " + example.name, () => {
  expect(parseMadvIdentity(wire(...example.events), model, ["0.1.1"]).ok).toBe(false);
});
test("a fail-closed event after valid evidence still interrupts", () => {
  const parser = new MadvSurfaceParser(context);
  parser.push(wire(init(), response(), event("system", { subtype: "auth_failed", exit_code: 5, code: "expired" })));
  const result = parser.finish(0); expect(result.ok).toBe(false);
  if (!result.ok) expect(result.cause).toBe("auth_failed");
});
test("every later response is checked before its tools", () => {
  const parser = new MadvSurfaceParser(context);
  parser.push(wire(init(), response(), event("tool_use", { tool_use_id: "t", name: "read_file" }), event("tool_result", { tool_use_id: "t", name: "read_file" }), response({ response_model: "MiniMax-other" }), event("tool_use", { tool_use_id: "unsafe", name: "read_file" }), event("tool_result", { tool_use_id: "unsafe", name: "read_file" }), event("result", { subtype: "success", is_error: false })));
  const result = parser.finish(0); expect(result.ok).toBe(false);
  if (!result.ok) expect(result.cause).toBe("identity_mismatch");
});
test("stream chunks preserve UTF-8 and malformed JSON fails closed", () => {
  const parser = new MadvSurfaceParser(context);
  const bytes = new TextEncoder().encode(wire(init(), response(), event("assistant", { response_model: model, message: { role: "assistant", content: "雪🙂" } })));
  for (const byte of bytes) parser.push(new Uint8Array([byte]));
  expect(parser.finish(0).ok).toBe(true);
  expect(parseMadvIdentity(wire(init(), response()) + "{broken\n", model, ["0.1.1"]).ok).toBe(false);
});
test("exit precedence fails closed without relying on an emitted event", () => {
  for (const [exit, cause] of [[5, "auth_failed"], [6, "endpoint_refused"], [1, "provider_error"], [3, "identity_unavailable"], [7, "model_refused"], [4, "identity_mismatch"]] as const) {
    const result = parseMadvIdentity(wire(init(), response()), model, ["0.1.1"], exit);
    expect(result.ok).toBe(false); if (!result.ok) expect(result.cause).toBe(cause);
  }
});

test("identity requires an empty tool array while a governed launch accepts tools", () => {
  for (const tools of [["read_file"], undefined, null, "", {}]) {
    const output = wire(init({ tools }), response());
    expect(parseMadvIdentity(output, model, context.supportedVersions)).toMatchObject({
      ok: false, cause: "identity_mismatch", reason: "init_tools",
    });
  }
  expect(parseMadvIdentity(wire(init({ tools: [] }), response()), model, context.supportedVersions).ok).toBe(true);
  const launch = new MadvSurfaceParser(context);
  launch.push(wire(init({ tools: ["read_file"] }), response()));
  expect(launch.finish(0).ok).toBe(true);
});

test("probe and launch require a non-empty string response_id on every response", () => {
  for (const response_id of [undefined, "", null, 42]) {
    const invalid = response({ response_id });
    const output = wire(init(), invalid);
    const mismatch = { ok: false, cause: "identity_mismatch", reason: "response_predicate" };
    expect(parseMadvIdentity(output, model, context.supportedVersions)).toMatchObject(mismatch);
    const launch = new MadvSurfaceParser(context);
    launch.push(output);
    expect(launch.finish(0)).toMatchObject(mismatch);

    const continued = new MadvSurfaceParser(context);
    continued.push(wire(init(), response(), event("result", { subtype: "success", is_error: false })));
    expect(continued.beginRequest().ok).toBe(true);
    continued.push(wire(invalid));
    expect(continued.finish(0)).toMatchObject(mismatch);
  }
});

test("Claude and Anthropic ids are refused before family resolution", () => {
  const ids = ["minimax-claude-x", "qwen-claude", "vendor_CLAUDE", "vendor+ClAuDe", "preclaudepost", "minimax-anthropic-x"];
  const causes = ids.map(id => {
    const result = parseMadvIdentity(wire(init(), response({ response_model: id })), model, context.supportedVersions);
    return { id, cause: result.ok ? "accepted" : result.cause };
  });
  expect(causes).toEqual(ids.map(id => ({ id, cause: "model_refused" })));
});
