import { startFixtureSession } from "../runtime-harness";

const session = await startFixtureSession({ retainStorage: true });
process.once("SIGTERM", () => { void session.close().then(() => process.exit(0)); });
process.stdin.setEncoding("utf8");
process.stdin.on("data", (data: string) => {
  if (data.trim() === "clean") void session.close().then(() => process.exit(0));
  else if (data.trim() === "crash") throw new Error("Synthetic supervisor crash");
});
process.stdout.write(JSON.stringify({ storage: session.storage, snapshot: await session.client.getSnapshot() }) + "\n");
