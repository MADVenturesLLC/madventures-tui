import { expect, test } from "bun:test";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { decodeFact, encodeCommand } from "../src/frames";

test("the governed child receives exactly the launch frame environment despite a host-only variable", async () => {
  const root = mkdtempSync(join(tmpdir(), "hardening-a-child-env-"));
  const hostEnvironment = { MADV_HOST_ONLY: "synthetic-host-only" };
  const launchEnvironment = { MADV_CHILD_ONE: "synthetic-child-one", MADV_CHILD_TWO: "synthetic-child-two" };
  const host = Bun.spawn([process.execPath, "--no-env-file", resolve(import.meta.dir, "../src/main.ts")], {
    cwd: root, env: hostEnvironment, stdin: "pipe", stdout: "pipe", stderr: "pipe",
  });
  // Even a broken merge can report only synthetic values from this clean host.
  const stderr = new Response(host.stderr).text();
  const output: Uint8Array[] = [];
  let launched = false;
  let pgid: number | undefined;
  const pumped = (async () => {
    let bytes = new Uint8Array(0);
    let terminating = false;
    for await (const chunk of host.stdout) {
      const combined = new Uint8Array(bytes.length + chunk.length);
      combined.set(bytes); combined.set(chunk, bytes.length); bytes = combined;
      for (;;) {
        const decoded = decodeFact(bytes);
        if (!decoded) break;
        bytes = bytes.subarray(decoded.consumed);
        if (decoded.frame.kind === "launched") { launched = true; pgid = decoded.frame.pgid; }
        if (decoded.frame.kind === "output") output.push(decoded.frame.bytes);
        if (!terminating && Buffer.concat(output).includes(10)) {
          terminating = true;
          host.stdin.write(encodeCommand({ kind: "terminate" }));
          host.stdin.flush();
        }
      }
    }
    expect(bytes.length).toBe(0);
  })();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    host.stdin.write(encodeCommand({
      kind: "launch", path: process.execPath,
      sha256: new Bun.CryptoHasher("sha256").update(readFileSync(process.execPath)).digest("hex"),
      argv: ["--no-env-file", "-e", "console.log(JSON.stringify(process.env)); setInterval(() => {}, 1000)"],
      env: launchEnvironment, executionId: "hardening-a-child-environment",
    }));
    host.stdin.flush();
    const code = await Promise.race([
      host.exited,
      new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error("host did not exit")), 4000); }),
    ]);
    await pumped;
    expect({ code, stderr: await stderr }).toEqual({ code: 0, stderr: "" });
    expect(launched).toBe(true);
    expect(JSON.parse(Buffer.concat(output).toString().trim())).toEqual(launchEnvironment);
  } finally {
    clearTimeout(timer);
    if (pgid !== undefined) { try { process.kill(-pgid, "SIGKILL"); } catch { /* already exited */ } }
    try { host.kill("SIGKILL"); } catch { /* already exited */ }
    await host.exited;
    await pumped;
    rmSync(root, { recursive: true, force: true });
  }
});
