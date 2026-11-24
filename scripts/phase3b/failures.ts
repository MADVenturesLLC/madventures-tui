import { runOfflineScenario } from "../../test/phase3b/scenarios";
import { writeTranscript } from "./transcript";

if (import.meta.main) {
  const directory = process.argv[2];
  if (!directory) throw new Error("An evidence output directory is required.");

  const barrier = await runOfflineScenario("barrier");
  if (barrier.code !== 1 || barrier.component !== "storage" || barrier.presented) {
    throw new Error("Offline storage barrier failed to stop presentation.");
  }
  writeTranscript(directory, "barrier-failure.txt", barrier.trace);

  const attestation = await runOfflineScenario("attestation");
  if (attestation.code !== 1 || attestation.presented || attestation.component !== "reattest" ||
      !attestation.detail.includes("surface=claude-code cause=identity_mismatch")) {
    throw new Error("Offline wrong-model attestation failed to stop presentation.");
  }
  writeTranscript(directory, "attestation-failure.txt", attestation.trace);

  const fallback = await runOfflineScenario("fallback");
  if (!fallback.activated || fallback.code !== 0 || fallback.reason !== "identity_mismatch" || !fallback.groupsEnded) {
    throw new Error("Offline fallback failed to interrupt the active session.");
  }
  writeTranscript(directory, "fallback.txt", fallback.trace);
}
