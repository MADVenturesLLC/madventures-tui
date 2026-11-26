import { expect, test } from "bun:test";
import { ADAPTER_REGISTRY, parseSurfaceId } from "@madventures/protocol";
import { attestClaudeSession } from "../../packages/adapter-claude-code/src/live";
import { attestMadvSession } from "../../packages/adapter-madv-surface/src/index";
import { activeCases, observeChildEnd, surfaces } from "./child-end";
import { attestationEvents } from "./end-stand-in";
import { wireFacts } from "./wire-facts";

for (const surface of surfaces) {
  for (const [end, cause] of [["clean exit", "child_exited"], ["host end", "host_exited"]] as const) {
    test(surface + " before activation reports " + cause, async () => {
      const seen = await observeChildEnd(surface, true, end);
      const execution = surface === "claude-code" ? "builder" : "reviewer";
      expect(seen.phase).toBe("");
      expect(seen.component).toBe("reattest");
      expect(seen.detail).toBe("step=reattest execution=" + execution +
        " failure=reattestation_failed surface=" + surface + " cause=" + cause);
    }, 20_000);
  }
  test(surface + " drained alone leaves the monitor active", async () => {
    const wire = wireFacts();
    const model = surface === "claude-code" ? "claude-fable-5-2" : "MiniMax-M3.1-Flash";
    const registration = ADAPTER_REGISTRY.get(parseSurfaceId(surface))!;
    const input = { ...wire, model, registration, executionId: "offline-execution", sessionId: "offline-session" };
    const result = surface === "claude-code" ? attestClaudeSession(input) : attestMadvSession(input);
    wire.events(...attestationEvents(surface, model));
    expect((await result).ok).toBe(true);
    wire.push({ kind: "drained" });
    // Yield across a full turn so the already-parked monitor consumes the fact.
    await Bun.sleep(1);
    expect(wire.failures).toEqual([]);
    expect(wire.closed).toBe(0);
    wire.push({ kind: "exited", code: 0 });
    wire.end();
    while (!wire.closed) await Bun.sleep(1);
    expect(wire.failures).toEqual(["child_exited"]);
  });
}

for (const [surface, end, cause, reason] of activeCases) {
  test(surface + " " + end + " records " + reason, async () => {
    const seen = await observeChildEnd(surface, false, end);
    expect(seen.component).toBe("");
    expect(seen.phase).toBe("active");
    expect(seen.interrupted).toEqual([{ reason, detail: surface + ": " + cause }]);
    expect(seen.closed).toBe("interruption");
  }, 20_000);
}

test("Founder close on the active composition records no interruption", async () => {
  const seen = await observeChildEnd("claude-code", false, "Founder close");
  expect(seen.component).toBe("");
  expect(seen.phase).toBe("active");
  expect(seen.closed).toBe("founder");
  expect(seen.interrupted).toEqual([]);
}, 20_000);
