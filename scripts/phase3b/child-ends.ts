import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { activeCases, observeChildEnd, surfaces } from "../../test/phase3b/child-end";

if (import.meta.main) {
  const directory = process.argv[2];
  if (!directory) throw new Error("An evidence directory is required.");
  const write = (name: string, observation: Awaited<ReturnType<typeof observeChildEnd>>) => {
    writeFileSync(join(directory, name), "Offline M2 | end-stand-in.ts\n" + JSON.stringify(observation, null, 2) + "\n",
      { mode: 0o600, flag: "wx" });
    console.log(name);
  };
  for (const surface of surfaces) {
    for (const [end, cause] of [["clean exit", "child_exited"], ["host end", "host_exited"]] as const) {
      const seen = await observeChildEnd(surface, true, end);
      if (seen.phase || seen.component !== "reattest" || !seen.detail.endsWith("failure=reattestation_failed surface=" + surface + " cause=" + cause)) {
        throw new Error("offline pre-activation observation differs");
      }
      write(surface + "-before-" + cause + ".txt", seen);
    }
  }
  for (const [surface, end, cause, reason] of activeCases) {
    const seen = await observeChildEnd(surface, false, end);
    if (seen.phase !== "active" || seen.closed !== "interruption" || seen.interrupted.length !== 1 ||
      seen.interrupted[0]?.reason !== reason || seen.interrupted[0]?.detail !== surface + ": " + cause) {
      throw new Error("offline interruption observation differs");
    }
    write(surface + "-active-" + end.replaceAll(" ", "-") + ".txt", seen);
  }
  const seen = await observeChildEnd("claude-code", false, "Founder close");
  if (seen.phase !== "active" || seen.closed !== "founder" || seen.interrupted.length) throw new Error("offline Founder close differs");
  write("founder-close.txt", seen);
}
