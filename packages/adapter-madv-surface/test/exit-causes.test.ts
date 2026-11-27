import { expect, test } from "bun:test";
import { attestClaudeSession } from "../../adapter-claude-code/src/live";
import { closeOfflineBuild } from "../../../test/phase3b/offline";
import { prepareM2 } from "../../../test/phase3b/m2-offline";
import { attestationEvents } from "../../../test/phase3b/end-stand-in";
import { wireFacts } from "../../../test/phase3b/wire-facts";
import { runLiveTransactionalBuild, runPurePreflight } from "../../supervisor/src/index";
import { attestMadvSession } from "../src/live";

const exits = [
  { code: 0, reason: "child_exited" },
  { code: 1, reason: "provider_error" },
  { code: 3, reason: "identity_unavailable" },
  { code: 4, reason: "identity_mismatch" },
  { code: 5, reason: "auth_failed" },
  { code: 6, reason: "endpoint_refused" },
  { code: 7, reason: "model_refused" },
  { code: 42, reason: "provider_error" },
  { code: null, reason: "provider_error" },
] as const;

for (const { code, reason } of exits) {
  for (const stage of ["before", "after"] as const) {
    const cause = code === 0 && stage === "before" ? "identity_unavailable" : reason;
    const name = code === null ? "signal" : "code " + code;
    test("madv " + name + " gives " + cause + " " + stage + " activation", async () => {
      const f = prepareM2("madv-surface", false, "Founder close");
      const wire = wireFacts();
      const exit = { kind: "exited", code, signal: code === null ? "SIGTERM" : null };
      const reported: string[] = [];
      try {
        const preflight = await runPurePreflight(f.input);
        if (!preflight.ok) throw new Error("offline preflight failed");
        const build = await runLiveTransactionalBuild({ sessionId: "offline-exit-cause", envelope: f.envelope,
          plan: preflight.plan, signal: f.input.signal, attesterFor: surface => {
            if (surface === "claude-code") return input => attestClaudeSession(input);
            if (surface !== "madv-surface") return undefined;
            return input => {
              const verdict = attestMadvSession({ ...input, host: wire.host, reportFailure(actual) {
                reported.push(actual);
                input.reportFailure(actual);
                wire.end();
              } });
              const events = attestationEvents("madv-surface", input.model);
              if (stage === "after") wire.events(...events);
              else { wire.events(events[0]); wire.push(exit); }
              return verdict;
            };
          } });
        try {
          if (stage === "after") {
            expect(build.ok).toBe(true);
            if (!build.ok) throw new Error("active build required");
            const client = build.state.client!;
            expect((await client.getSnapshot()).phase).toBe("active");
            expect(reported).toEqual([]);
            wire.push(exit);
            const deadline = performance.now() + 5000;
            while ((await client.getSnapshot()).phase !== "closed") {
              if (performance.now() >= deadline) throw new Error("offline close deadline");
              await Bun.sleep(5);
            }
          } else {
            expect(build.ok).toBe(false);
            if (build.ok) throw new Error("failed build required");
            expect(build.failure).toBe("reattestation_failed");
            expect(build.detail).toBe("step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=" + cause);
          }
          expect(reported).toEqual([cause]);
        } finally { wire.end(); await closeOfflineBuild(build); }
      } finally { wire.end(); f.dispose(); }
    }, 20_000);
  }
}
