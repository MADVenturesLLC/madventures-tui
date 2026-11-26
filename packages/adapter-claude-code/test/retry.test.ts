import { expect, test } from "bun:test";
import { ADAPTER_REGISTRY, parseSurfaceId } from "@madventures/protocol";
import { attestClaudeSession } from "../src/live";
import { attestationEvents } from "../../../test/phase3b/end-stand-in";
import { wireFacts } from "../../../test/phase3b/wire-facts";

for (const stage of ["attestation", "active monitor"] as const) {
  test("an unregistered api_retry error preserves the " + stage, async () => {
    const registration = ADAPTER_REGISTRY.get(parseSurfaceId("claude-code"))!;
    const wire = wireFacts();
    const model = "claude-fable-5-2";
    const [init, ...rest] = attestationEvents("claude-code", model);
    const retry = { type: "system", subtype: "api_retry", session_id: "offline-wire", error: "synthetic_unregistered_retry" };
    expect(registration.auth_failure_detection).not.toContain("system/api_retry.error:" + retry.error);
    const result = attestClaudeSession({ ...wire, registration, model });
    try {
      wire.events(init);
      if (stage === "attestation") wire.events(retry);
      wire.events(...rest);
      expect((await result).ok).toBe(true);
      if (stage === "active monitor") wire.events(retry);
      // A subsequent registered failure proves the monitor consumed the retry
      // and remained active long enough to classify the next event.
      wire.events({ type: "system", subtype: "model_refusal_fallback", session_id: "offline-wire" });
      wire.end();
      while (!wire.closed) await Bun.sleep(1);
      expect(wire.failures).toEqual(["identity_mismatch"]);
    } finally { wire.end(); }
  });
}
