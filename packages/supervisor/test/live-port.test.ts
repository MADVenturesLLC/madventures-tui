import { expect, test } from "bun:test";
import { runLiveTransactionalBuild, type LiveReattestationInput } from "../src/index";
import { closeOfflineBuild, offlineStart } from "../../../test/phase3b/offline";

test("the live port passes the session and signal and rejects untrusted failure detail", async () => {
  const fixture = offlineStart();
  const controller = new AbortController();
  const seen: LiveReattestationInput[] = [];
  try {
    const result = await runLiveTransactionalBuild({
      ...fixture, sessionId: "offline-port", signal: controller.signal,
      attesterFor: () => input => {
        seen.push(input);
        return { ok: false, reason: "untrusted child diagnostic" };
      },
    });
    try {
      expect(seen.length).toBe(1);
      expect(seen[0]!.sessionId).toBe("offline-port");
      expect(seen[0]!.signal).toBeInstanceOf(AbortSignal);
      expect(result).toMatchObject({ ok: false, failedStep: "reattest", failure: "reattestation_failed",
        detail: "step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=attestation_malformed" });
    } finally { await closeOfflineBuild(result); }
  } finally { fixture.dispose(); }
});

test("a continuous failure before activation fails reattestation for its surface", async () => {
  const fixture = offlineStart();
  let monitorFailure: ((reason: string) => void) | undefined;
  try {
    const result = await runLiveTransactionalBuild({
      ...fixture, sessionId: "offline-monitor", signal: new AbortController().signal,
      attesterFor: surface => input => {
        if (surface === "claude-code") monitorFailure = input.reportFailure;
        else monitorFailure!("identity_mismatch");
        return { ok: true, evidenceKind: "actual_session", model: input.model, provider: input.provider };
      },
    });
    try {
      expect(result).toMatchObject({ ok: false, failedStep: "reattest", failure: "reattestation_failed",
        detail: "step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=identity_mismatch" });
      if (!result.ok) expect(result.partialState.sessionActivatedRow).toBeNull();
    } finally { await closeOfflineBuild(result); }
  } finally { fixture.dispose(); }
});
