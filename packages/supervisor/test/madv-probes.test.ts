import { expect, test } from "bun:test";
import { ADAPTER_REGISTRY, parseSurfaceId, type AdapterRegistrationV1 } from "@madventures/protocol";
import { encodeUserInput } from "@madventures/adapter-madv-surface";
import { IDENTITY_PROBE_INPUT, runBoundedProbe, type ProbeRequest, type ProbeRuntime, type ProbeProcess } from "../src/attestation";

const model = "MiniMax-M3.1-Flash";
const auth = { loggedIn: true, authMethod: "plan_key", profile: "minimax", provider: "minimax", endpointHost: "api.minimax.io", verified: true, verifyMethod: "read_only_endpoint" };
const stamp = { session_id: "wire", ts: "2026-11-15T00:00:00.000Z" };
const init = { ...stamp, type: "system", subtype: "init", surface: "madv-surface", surface_version: "0.1.1", binary_sha256: "a".repeat(64), role: "reviewer", tools: [], profile: "minimax", provider: "minimax", endpoint_host: "api.minimax.io", requested_model: model };
const response = { ...stamp, type: "model_response", response_model: model, response_id: "synthetic-response", response_independence_domain: "minimax", tls_verified_host: "api.minimax.io", profile: "minimax", provider: "minimax", endpoint_host: "api.minimax.io" };
const wire = (...values: unknown[]) => values.map(value => JSON.stringify(value)).join("\n") + "\n";
function request(kind: "identity" | "auth" = "identity", surface = "madv-surface"): ProbeRequest {
  const registration = ADAPTER_REGISTRY.get(parseSurfaceId(surface))!;
  return { executablePath: "/controlled-not-run", arguments: kind === "identity" ? [...registration.identity_probe.argv, "--model", model] : registration.auth_readiness_probe!.argv,
    environment: Object.freeze({}), stdin: kind === "auth" ? "" : surface === "madv-surface" ? encodeUserInput("Reply with your model identifier and nothing else.") : IDENTITY_PROBE_INPUT,
    signal: new AbortController().signal, kind, model, supportedVersions: registration.supported_versions, registration };
}
function stream(text: string): ReadableStream<Uint8Array> {
  return new ReadableStream({ start(controller) { if (text) controller.enqueue(new TextEncoder().encode(text)); controller.close(); } });
}
function complete(output: string, options: { elapsed?: number; exit?: number; signal?: string | null; stderr?: string } = {}): Partial<ProbeRuntime> {
  let clock = 0;
  return { now: () => clock, spawn: () => {
    clock = options.elapsed ?? 0;
    return { stdout: stream(output), stderr: stream(options.stderr ?? ""), exited: Promise.resolve(options.exit ?? 0), signalCode: options.signal ?? null, kill() {} };
  } };
}
test("dispatch keeps Claude probes and input unchanged", async () => {
  const req = request("identity", "claude-code");
  expect(req.stdin).toBe(IDENTITY_PROBE_INPUT);
  const good = wire({ type: "system", subtype: "init", model, claude_code_version: "2.1.325" });
  const result = await runBoundedProbe(req, complete(good));
  expect(result.ok).toBe(true); expect(result.diagnostic.primitive).toBe("system/init");
  expect((await runBoundedProbe(request("auth", "claude-code"), complete(JSON.stringify(auth)))).ok).toBe(false);
  expect((await runBoundedProbe(request("auth", "claude-code"), complete(JSON.stringify({ loggedIn: true, authMethod: "claude.ai", apiProvider: "firstParty", subscriptionType: "max" })))).ok).toBe(true);
});
test("madv-surface identity continues beyond init to natural exit", async () => {
  const killed: string[] = [];
  const spawn: ProbeRuntime["spawn"] = () => {
    let output!: ReadableStreamDefaultController<Uint8Array>;
    let errors!: ReadableStreamDefaultController<Uint8Array>;
    let resolve!: (exit: number) => void;
    const exited = new Promise<number>(r => { resolve = r; });
    const stdout = new ReadableStream<Uint8Array>({ start(c) { output = c; c.enqueue(new TextEncoder().encode(wire(init))); } });
    const stderr = new ReadableStream<Uint8Array>({ start(c) { errors = c; } });
    const timer = setTimeout(() => { output.enqueue(new TextEncoder().encode(wire(response))); output.close(); errors.close(); resolve(0); }, 10);
    return { stdout, stderr, exited, kill(signal) { killed.push(signal); clearTimeout(timer); output.close(); errors.close(); resolve(0); } };
  };
  const result = await runBoundedProbe(request(), { spawn });
  expect(result.ok).toBe(true); expect(killed).toEqual([]);
  expect(result.diagnostic.primitive).toBe("model_response");
});
test("registration chooses 30 seconds beside Claude's 5 seconds", async () => {
  const madv = wire(init, response);
  // Auth runs to exit; Claude identity deliberately wakes at its first init.
  const claude = JSON.stringify({ loggedIn: true, authMethod: "claude.ai", apiProvider: "firstParty", subscriptionType: "max" });
  expect((await runBoundedProbe(request(), complete(madv, { elapsed: 6_000 }))).ok).toBe(true);
  expect((await runBoundedProbe(request("auth", "claude-code"), complete(claude, { elapsed: 4_999 }))).ok).toBe(true);
  expect((await runBoundedProbe(request("auth", "claude-code"), complete(claude, { elapsed: 6_000 }))).ok).toBe(false);
  expect((await runBoundedProbe(request(), complete(madv, { elapsed: 29_999 }))).ok).toBe(true);
  expect((await runBoundedProbe(request(), complete(madv, { elapsed: 30_001 }))).ok).toBe(false);
  expect((await runBoundedProbe(request("auth"), complete(JSON.stringify(auth), { elapsed: 29_999 }))).ok).toBe(true);
  expect((await runBoundedProbe(request("auth"), complete(JSON.stringify(auth), { elapsed: 30_001 }))).ok).toBe(false);
});
test("madv-surface identity failures map to identity_mismatch", async () => {
  const outputs = [wire(init), "not-json", wire(response), wire(init, response, init)];
  for (const field of ["surface", "surface_version", "profile", "provider", "endpoint_host", "requested_model"]) outputs.push(wire({ ...init, [field]: "wrong" }, response));
  for (const field of ["response_model", "response_independence_domain", "tls_verified_host"]) outputs.push(wire(init, { ...response, [field]: field === "response_model" ? "MiniMax-other" : "wrong" }));
  for (const subtype of ["auth_failed", "endpoint_refused", "provider_error", "identity_unavailable", "model_refused", "domain_unresolved", "identity_mismatch"]) outputs.push(wire(init, response, { ...stamp, type: "system", subtype, exit_code: 1 }));
  for (const output of outputs) {
    const result = await runBoundedProbe(request(), complete(output));
    expect(result.ok).toBe(false); expect(result.diagnostic.result).toBe("identity_mismatch");
    expect(Object.keys(result.diagnostic).sort()).toEqual(["exitCode", "primitive", "result", "signal", "stderrBytes", "stdoutBytes"]);
  }
  for (const exit of [1, 3, 4, 5, 6, 7]) expect((await runBoundedProbe(request(), complete(wire(init, response), { exit }))).ok).toBe(false);
  expect((await runBoundedProbe(request(), complete(wire(init, response), { signal: "SIGTERM" }))).ok).toBe(false);
});
test("madv-surface auth failures map to auth_not_ready", async () => {
  const outputs = ["", "null", "[]", "{}", "bad-json"];
  for (const field of Object.keys(auth)) outputs.push(JSON.stringify({ ...auth, [field]: "wrong" }));
  for (const output of outputs) {
    const result = await runBoundedProbe(request("auth"), { ...complete(output), parseAuth: () => true });
    expect(result.ok).toBe(false); expect(result.diagnostic.result).toBe("auth_not_ready");
  }
  expect((await runBoundedProbe(request("auth"), complete(JSON.stringify(auth), { exit: 1 }))).ok).toBe(false);
  expect((await runBoundedProbe(request("auth"), complete(JSON.stringify(auth), { signal: "SIGTERM" }))).ok).toBe(false);
});
test("madv-surface keeps both raw stream limits and metadata-only diagnostics", async () => {
  const valid = wire(init, response);
  for (const limit of [65_536, 65_537]) {
    const stdout = valid + " ".repeat(limit - new TextEncoder().encode(valid).byteLength);
    const result = await runBoundedProbe(request(), complete(stdout));
    expect(result.ok).toBe(limit === 65_536); expect(result.diagnostic.stdoutBytes).toBe(limit);
    const errorResult = await runBoundedProbe(request(), complete(valid, { stderr: "S".repeat(limit) }));
    expect(errorResult.ok).toBe(limit === 65_536); expect(errorResult.diagnostic.stderrBytes).toBe(limit);
    expect(JSON.stringify(errorResult)).not.toContain("SSSS");
  }
});
test("madv-surface pre-spawn cancellation and spawn failure fail closed", async () => {
  const req = request(); const controller = new AbortController(); controller.abort(); req.signal = controller.signal;
  let spawned = false;
  expect((await runBoundedProbe(req, { spawn() { spawned = true; throw new Error("not reached"); } })).ok).toBe(false);
  expect(spawned).toBe(false);
  expect((await runBoundedProbe(request(), { spawn() { throw new Error("synthetic spawn failure"); } })).ok).toBe(false);
});
test("madv-surface cancellation retains bounded cleanup and reaping", async () => {
  const req = request(), controller = new AbortController(); req.signal = controller.signal;
  const signals: string[] = [];
  const spawn: ProbeRuntime["spawn"] = () => {
    let out!: ReadableStreamDefaultController<Uint8Array>, err!: ReadableStreamDefaultController<Uint8Array>;
    let resolve!: (code: number) => void;
    const stdout = new ReadableStream<Uint8Array>({ start(c) { out = c; } });
    const stderr = new ReadableStream<Uint8Array>({ start(c) { err = c; } });
    const exited = new Promise<number>(r => { resolve = r; });
    queueMicrotask(() => controller.abort());
    return { stdout, stderr, exited, kill(signal) { signals.push(signal); if (signal === "SIGKILL") { out.close(); err.close(); resolve(0); } } } satisfies ProbeProcess;
  };
  const result = await runBoundedProbe(req, { spawn });
  expect(result.ok).toBe(false); expect(result.diagnostic.result).toBe("identity_mismatch");
  expect(signals).toEqual(["SIGTERM", "SIGKILL"]);
});
