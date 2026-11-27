import { expect, test } from "bun:test";
import { attestMadvSession, encodeAttestationInput, encodeUserInput } from "../src";
import { wireFacts } from "../../../test/phase3b/wire-facts";

const model = "MiniMax-M3.1-Flash";
const registration = { auth_failure_detection: ["system/auth_failed", "exit_code:5"], supported_versions: ["0.1.2"], provider: "minimax", independence_domain: "minimax" };
const stamp = { session_id: "synthetic-wire", ts: "2026-11-15T00:00:00Z" };
const init = { ...stamp, type: "system", subtype: "init", surface: "madv-surface", surface_version: "0.1.2",
  requested_model: model, provider: "minimax", profile: "minimax", endpoint_host: "api.minimax.io" };
const response = { ...stamp, type: "model_response", response_model: model, response_id: "synthetic-response",
  provider: "minimax", profile: "minimax", response_independence_domain: "minimax",
  endpoint_host: "api.minimax.io", tls_verified_host: "api.minimax.io" };
const assistant = { ...stamp, type: "assistant", response_model: model };
const result = { ...stamp, type: "result", subtype: "success", is_error: false };
const approved = [init, response, assistant, result];
function start() {
  const wire = wireFacts();
  const verdict = attestMadvSession({ ...wire, model, registration, executionId: "synthetic-execution",
    sessionId: "synthetic-session" });
  return { wire, verdict };
}
type ExpectedCause = Extract<Awaited<ReturnType<typeof attestMadvSession>>, { ok: false }>["cause"];
async function rejects(events: readonly unknown[], cause: ExpectedCause, reason?: string) {
  const { wire, verdict } = start();
  wire.events(...events);
  wire.end();
  const answer = await verdict;
  expect(answer.ok).toBe(false);
  if (!answer.ok) {
    expect(answer.surface).toBe("madv-surface");
    expect(answer.cause).toBe(cause);
    if (reason) expect(answer.parserReason).toBe(reason);
  }
  expect(wire.closed).toBe(1);
}

test("madv encodes no_tools only on the attestation message", async () => {
  const message = "synthetic";
  expect(encodeUserInput(message)).toBe('{"type":"user","message":{"role":"user","content":"synthetic"}}\n');
  expect(encodeAttestationInput(message)).toBe('{"type":"user","message":{"role":"user","content":"synthetic"},"no_tools":true}\n');
  const { wire, verdict } = start();
  expect(wire.opened).toBe(1);
  expect(wire.writes).toEqual(['{"type":"user","message":{"role":"user","content":"Reply with your model identifier and nothing else."},"no_tools":true}\n']);
  wire.events(...approved);
  const answer = await verdict;
  expect(answer.ok).toBe(true);
  if (answer.ok) expect(answer.sendUserInput(message)).toBe(true);
  expect(wire.writes[1]).toBe(encodeUserInput(message));
  wire.events(response, assistant, result);
  wire.end();
  while (!wire.closed) await Bun.sleep(1);
  expect(wire.failures).toEqual(["host_exited"]);
});

test("madv requires init, model response, assistant and success in order", async () => {
  await rejects([init], "identity_unavailable", "model_response_missing");
  await rejects([init, response, result], "identity_mismatch", "assistant_missing");
  await rejects([init, response, assistant], "identity_unavailable", "result_missing");
  await rejects([init, response, assistant, assistant], "identity_mismatch", "event_order");
  await rejects([init, response, assistant, { ...result, is_error: true }], "provider_error", "result_error");
  await rejects([init, { ...response, response_model: "MiniMax-other" }], "identity_mismatch", "response_predicate");
  await rejects([init, { ...response, response_model: "claude-other" }], "model_refused", "anthropic_model");
  await rejects([init, { ...response, response_model: "other-family" }], "domain_unresolved", "unknown_family");
  await rejects([init, { ...assistant, session_id: "duplicate" }], "identity_mismatch", "event_binding");
  await rejects([JSON.parse(encodeAttestationInput("synthetic"))], "identity_mismatch", "event_binding");
  await rejects([{ ...stamp, type: "system", subtype: "endpoint_refused" }], "endpoint_refused", "surface_fail_closed");
  const { wire, verdict } = start();
  wire.text("{broken}\n"); wire.end();
  const malformed = await verdict;
  expect(malformed.ok ? "unexpected success" : malformed.parserReason).toBe("malformed_stream");
});

test("madv rejects attestation tools and extra round-trips by their typed cause", async () => {
  for (const type of ["tool_use", "tool_result"]) await rejects([init, response, { ...stamp, type }], "attestation_tool_call");
  await rejects([init, { ...stamp, type: "system", subtype: "provider_error", code: "unexpected_tool_call" }], "attestation_tool_call");
  await rejects([init, response, response], "attestation_round_trips");
});

test("madv waits for result through its deadline and closes on cancellation", async () => {
  const cancelled = start(); cancelled.wire.controller.abort();
  const abort = await cancelled.verdict;
  expect(abort.ok ? "unexpected success" : abort.cause).toBe("attestation_cancelled");
  expect(cancelled.wire.closed).toBe(1);
  const late = start(); late.wire.events(init, response, assistant);
  const cleanup = setTimeout(late.wire.end, 31_000);
  try {
    const timeout = await late.verdict;
    expect(timeout.ok ? "unexpected success" : timeout.cause).toBe("attestation_deadline");
    expect(late.wire.closed).toBe(1);
  } finally { clearTimeout(cleanup); }
}, 34_000);

test("madv preserves a later partial event and checks later responses", async () => {
  const { wire, verdict } = start();
  wire.events(init, response, assistant);
  const later = JSON.stringify({ ...response, response_model: "claude-synthetic" });
  wire.text(JSON.stringify(result) + "\r\n" + later.slice(0, 7));
  const answer = await verdict;
  expect(answer.ok).toBe(true);
  if (answer.ok) expect(answer.sendUserInput("another synthetic request")).toBe(true);
  wire.text(later.slice(7) + "\n");
  wire.end();
  while (!wire.closed) await Bun.sleep(1);
  expect(wire.opened).toBe(1);
  expect(wire.failures).toEqual(["model_refused"]);
});

test("madv attestation reports auth_failed from the surface's system/auth_failed event", async () => {
  await rejects([init, { ...stamp, type: "system", subtype: "auth_failed" }], "auth_failed", "surface_fail_closed");
});

const registrationWithExitNine = { ...registration, auth_failure_detection: ["system/auth_failed", "exit_code:9"] };
for (const sample of [
  { code: 5, cause: "auth_failed", registration },
  { code: 9, cause: "auth_failed", registration: registrationWithExitNine },
  { code: 1, cause: "provider_error", registration },
] as const) {
  test(`madv attestation reports ${sample.cause} for exit code ${sample.code} before model_response`, async () => {
    const wire = wireFacts();
    const verdict = attestMadvSession({
      ...wire, model, registration: sample.registration, executionId: "synthetic-execution", sessionId: "synthetic-session",
    });
    wire.events(init);
    wire.push({ kind: "exited", code: sample.code, signal: null });
    wire.end();
    expect(await verdict).toEqual({
      ok: false, surface: "madv-surface", cause: sample.cause, reason: sample.cause, parserReason: "exit",
    });
  });
}
