import { expect, test } from "bun:test";
import { attestClaudeSession, encodeUserInput } from "../src/live";
import { wireFacts } from "../../../test/phase3b/wire-facts";

const model = "offline-model";
const id = "offline-session";
const init = { type: "system", subtype: "init", session_id: id, model, claude_code_version: "supported" };
const assistant = { type: "assistant", session_id: id, parent_tool_use_id: null,
  message: { id: "offline-message", model, content: [{ type: "text", text: "offline" }] } };
const usage = { [model]: { canonicalModel: model, provider: "firstParty" } };
const result = { type: "result", session_id: id, subtype: "success", is_error: false, num_turns: 1,
  modelUsage: usage, model_usage_since_last_result: usage, permission_denials: [] };
const fallback = { type: "system", subtype: "model_refusal_fallback", session_id: id };
function start() {
  const wire = wireFacts();
  const verdict = attestClaudeSession({ ...wire, model,
    registration: { supported_versions: ["supported"], auth_failure_detection: ["system/api_retry.error:authentication_failed"] } });
  return { wire, verdict };
}
async function rejects(events: unknown[], expected: string) {
  const { wire, verdict } = start();
  wire.events(...events);
  wire.end();
  const value = await verdict;
  if (!value.ok) {
    expect(value.surface).toBe("claude-code");
    expect(value.cause).toBe(expected);
  } else throw new Error("unexpected successful attestation");
  expect(wire.closed).toBe(1);
}

test("Claude encodes one stream-json user line", () => {
  expect(encodeUserInput('say "hi"\n')).toBe('{"type":"user","message":{"role":"user","content":"say \\"hi\\"\\n"}}\n');
});

test("Claude subscribes first and accepts only complete firstParty identity evidence", async () => {
  const { wire, verdict } = start();
  expect(wire.opened).toBe(1);
  expect(wire.writes).toEqual([encodeUserInput("Reply with your model identifier and nothing else.")]);
  wire.events(init, ...["thinking_tokens", "informational", "commands_changed", "api_retry"].map(subtype =>
    ({ type: "system", subtype, session_id: id })), { type: "rate_limit_event", session_id: id }, assistant, assistant, result);
  expect(await verdict).toEqual({ ok: true, provider: "anthropic", model, evidenceKind: "actual_session", cliVersion: "supported" });
  expect(wire.closed).toBe(0);
  wire.end();
  await rejects([{ ...init, model: "other" }], "identity_mismatch");
  await rejects([{ ...init, claude_code_version: "other" }], "identity_mismatch");
  await rejects([init, { ...assistant, message: { ...assistant.message, model: "other" } }], "identity_mismatch");
  for (const change of [
    { modelUsage: { [model]: { canonicalModel: model, provider: "other" } } },
    { modelUsage: { other: usage[model] } }, { modelUsage: { [model]: { canonicalModel: "other", provider: "firstParty" } } },
    { model_usage_since_last_result: { other: usage[model] } }, { modelUsage: {} }, { subtype: "error" }, { is_error: true },
  ]) await rejects([init, assistant, { ...result, ...change }], "identity_mismatch");
});

test("Claude rejects malformed, missing, duplicate and echoed events", async () => {
  await rejects([init], "attestation_missing");
  await rejects([init, assistant], "attestation_missing");
  await rejects([init, result], "attestation_missing");
  await rejects([JSON.parse(encodeUserInput("offline echo"))], "attestation_malformed");
  for (const event of [null, [], {}, { type: "assistant" }, { session_id: id }, { type: "unknown", session_id: id }]) {
    await rejects([init, event], "attestation_malformed");
  }
  for (const bytes of [new Uint8Array([255]), new TextEncoder().encode("not json\n")]) {
    const { wire, verdict } = start();
    wire.push({ kind: "output", bytes }); wire.end();
    const value = await verdict;
    expect(value.ok ? "success" : value.cause).toBe("attestation_malformed");
  }
  await rejects([init, { ...assistant, session_id: "other" }], "attestation_duplicate");
  await rejects([init, assistant, { ...assistant, message: { ...assistant.message, model: "changed" } }], "attestation_duplicate");
  await rejects([init, fallback], "identity_mismatch");
  const { wire, verdict } = start();
  wire.events(init, assistant, result, result);
  await verdict;
  expect(wire.failures).toEqual(["attestation_duplicate"]);
});

test("Claude rejects a tool call or a third round-trip", async () => {
  await rejects([init, { ...assistant, message: { ...assistant.message, content: [{ type: "tool_use" }] } }], "attestation_tool_call");
  await rejects([init, { ...assistant, parent_tool_use_id: "offline" }], "attestation_tool_call");
  await rejects([init, assistant, { ...result, permission_denials: [{}] }], "attestation_tool_call");
  await rejects([init, { type: "system", subtype: "api_retry", session_id: id }, assistant,
    { ...result, num_turns: 2 }], "attestation_round_trips");
});

test("Claude keeps the result deadline and closes on cancellation", async () => {
  const cancelled = start();
  cancelled.wire.controller.abort();
  const first = await cancelled.verdict;
  expect(first.ok ? "success" : first.cause).toBe("attestation_cancelled");
  expect(cancelled.wire.closed).toBe(1);
  const late = start();
  late.wire.events(init, assistant);
  const timer = setTimeout(() => late.wire.events(result), 30_100);
  try {
    const second = await late.verdict;
    expect(second.ok ? "success" : second.cause).toBe("attestation_deadline");
    expect(late.wire.closed).toBe(1);
    expect(cancelled.wire.failures).toEqual(["attestation_cancelled"]);
  } finally { clearTimeout(timer); late.wire.end(); }
}, 40_000);

test("Claude hands a partial line to its monitor and interrupts on fallback or model drift", async () => {
  for (const event of [fallback, { ...assistant, message: { ...assistant.message, id: "next", model: "other" } },
    { ...result, modelUsage: { [model]: { canonicalModel: model, provider: "other" } } }]) {
    const { wire, verdict } = start();
    const later = JSON.stringify(event);
    wire.events(init, assistant);
    const nextAssistant = event.type === "result" ? JSON.stringify(assistant) + "\n" : "";
    wire.text(JSON.stringify(result) + "\r\n" + nextAssistant + later.slice(0, 7));
    expect((await verdict).ok).toBe(true);
    wire.text(later.slice(7) + "\n");
    wire.end();
    while (!wire.closed) await Bun.sleep(1);
    expect(wire.failures).toEqual(["identity_mismatch"]);
    expect(wire.opened).toBe(1);
  }
});
