import { runOfflineScenario } from "../../test/phase3b/scenarios";
import { writeTranscript } from "./transcript";

if (import.meta.main) {
  const directory = process.argv[2];
  if (!directory) throw new Error("An evidence output directory is required.");
  for (const surface of ["claude-code", "madv-surface"]) {
    const result = await runOfflineScenario("healthy");
    if (result.code !== 0 || !result.activated || !result.presented ||
        !result.trace.includes(surface + " result success") || !result.groupsEnded) {
      throw new Error("Offline healthy start failed for " + surface);
    }
    writeTranscript(directory, "healthy-" + surface + ".txt", result.trace);
  }
}
