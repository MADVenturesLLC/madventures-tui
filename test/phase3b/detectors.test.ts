import { expect, test } from "bun:test";
import { ADAPTER_REGISTRY, parseSurfaceId } from "@madventures/protocol";
import { detectClaudeFailure } from "../../packages/adapter-claude-code/src/detectors";
import { MadvSurfaceParser, detectMadvFailure } from "../../packages/adapter-madv-surface/src";

test("registration detectors identify auth expiry and attestation failures by surface", () => {
  const claude = ADAPTER_REGISTRY.get(parseSurfaceId("claude-code"))!.auth_failure_detection;
  const madv = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!.auth_failure_detection;
  const status = { kind: "auth_status", exitCode: 1 } as const;
  expect(detectClaudeFailure(claude, status)).toEqual({ surface: "claude-code", cause: "auth_failed" });
  expect(detectClaudeFailure([], status)).toBeUndefined();
  for (const error of ["authentication_failed", "oauth_org_not_allowed"]) {
    const obs = { kind: "event", event: { type: "system", subtype: "api_retry", error } } as const;
    expect(detectClaudeFailure(claude, obs)?.cause).toBe("auth_failed");
    expect(detectClaudeFailure([], obs)).toBeUndefined();
  }
  expect(detectClaudeFailure(claude, { kind: "event", event: { type: "system", subtype: "model_refusal_fallback" } }))
    .toEqual({ surface: "claude-code", cause: "identity_mismatch" });
  for (const observation of [status, { kind: "auth_status", exitCode: 0, verified: false },
    { kind: "child_exit", exitCode: 5 }, { kind: "event", type: "system", subtype: "auth_failed" }] as const) {
    const failure = detectMadvFailure(madv, observation);
    expect(failure?.surface).toBe("madv-surface");
    expect(failure?.cause).toBe("auth_failed");
    expect(detectMadvFailure([], observation)).toBeUndefined();
  }
  expect(detectMadvFailure(madv, { kind: "child_exit", exitCode: 1 })).toBeUndefined();
  for (const [code, expected] of [[1, "provider_error"], [3, "identity_unavailable"], [4, "identity_mismatch"],
    [5, "auth_failed"], [6, "endpoint_refused"], [7, "model_refused"]] as const) {
    const parser = new MadvSurfaceParser({ executionId: "offline", sessionId: "offline", supportedVersions: ["0.1.2"],
      provider: "minimax", independenceDomain: "minimax", model: "MiniMax-offline" });
    const failure = detectMadvFailure(madv, { kind: "parsed", result: parser.finish(code) });
    expect(failure?.surface).toBe("madv-surface");
    expect(failure?.cause).toBe(expected);
    expect(failure?.reason).toBe("exit");
  }
  for (const subtype of ["domain_unresolved", "model_refused", "identity_mismatch"] as const) {
    const parser = new MadvSurfaceParser({ executionId: "offline", sessionId: "offline", supportedVersions: ["0.1.2"],
      provider: "minimax", independenceDomain: "minimax", model: "MiniMax-offline" });
    const result = parser.push(JSON.stringify({ type: "system", subtype }) + "\n");
    expect(detectMadvFailure(madv, { kind: "parsed", result })?.cause).toBe(subtype);
  }
});
