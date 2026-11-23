import { expect, jest, test } from "bun:test";
import { ADAPTER_REGISTRY, parseSurfaceId } from "@madventures/protocol";
import { runBoundedProbe } from "../src/attestation";

for (const kind of ["identity", "auth"] as const) {
  test("madv-surface " + kind + " keeps 500 ms grace and 1000 ms cleanup", async () => {
    const registration = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;
    const abort = new AbortController();
    const signals: Array<[string, number]> = [];
    let cleanupAt: number | undefined;
    let onTerm!: () => void;
    const terminated = new Promise<void>(resolve => { onTerm = resolve; });

    jest.useFakeTimers();
    try {
      const started = Date.now();
      const now = () => Date.now() - started;
      const probe = runBoundedProbe({
        kind, registration, signal: abort.signal, executablePath: "/synthetic/madv-surface",
        arguments: [], environment: {}, stdin: "", model: "MiniMax-M3.1-Flash",
        supportedVersions: registration.supported_versions,
      }, {
        now,
        spawn() {
          abort.abort();
          return {
            stdout: new ReadableStream<Uint8Array>({ cancel() { cleanupAt = now(); } }),
            stderr: new ReadableStream<Uint8Array>(),
            exited: new Promise<number>(() => {}),
            kill(signal) {
              signals.push([signal, now()]);
              if (signal === "SIGTERM") onTerm();
            },
          };
        },
      });
      await terminated;
      // Allow the probe's promise continuation to observe each side of
      // both deadlines before advancing the clock to the next boundary.
      for (const delta of [499, 1, 499, 1]) {
        jest.advanceTimersByTime(delta);
        await Promise.resolve();
      }
      expect(signals).toEqual([["SIGTERM", 0], ["SIGKILL", 500]]);
      expect(cleanupAt).toBe(1000);
      expect((await probe).ok).toBe(false);
    } finally {
      jest.useRealTimers();
    }
  });
}
