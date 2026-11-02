import { expect, spyOn, test } from "bun:test";
import { mkdtempSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnPtyHost } from "../src/pty-host-supervisor";

test("a stray repository .env contributes no synthetic values to the real PTY host", async () => {
  const root = mkdtempSync(join(tmpdir(), "hardening-a-host-env-"));
  const dotenv = resolve(import.meta.dir, "../../..", ".env");
  const preload = join(root, "observe-host.ts");
  const report = join(root, "host-observation.json");
  const seeded = {
    MADV_HARDENING_DOTENV_ONE: "hardening-a-synthetic-one",
    MADV_HARDENING_DOTENV_TWO: "hardening-a-synthetic-two",
  };
  // Observe only our synthetic keys inside the actual host, never ambient values.
  writeFileSync(preload, `import { writeFileSync } from "node:fs";
const seeded = ${JSON.stringify(seeded)};
writeFileSync(${JSON.stringify(report)}, JSON.stringify({
  pid: process.pid,
  leaked: Object.entries(seeded).filter(([key, value]) => process.env[key] === value).map(([key]) => key),
}));
`);
  const originalSpawn = Bun.spawn;
  let host: Bun.Subprocess | undefined;
  let handle: ReturnType<typeof spawnPtyHost> | undefined;
  let spy: ReturnType<typeof spyOn<typeof Bun, "spawn">> | undefined;
  let ownsDotenv = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    writeFileSync(dotenv, Object.entries(seeded).map(([key, value]) => `${key}=${value}\n`).join(""), { flag: "wx" });
    ownsDotenv = true;
    spy = spyOn(Bun, "spawn").mockImplementation(((cmd: string[], options: any) => {
      expect(cmd).toContain("packages/pty-host/src/main.ts");
      // Add observation without changing the production cwd, env or other flags.
      host = originalSpawn([cmd[0]!, "--preload", preload, ...cmd.slice(1)], options);
      return host;
    }) as typeof Bun.spawn);
    handle = spawnPtyHost({
      path: "/bin/cat",
      sha256: new Bun.CryptoHasher("sha256").update(readFileSync("/bin/cat")).digest("hex"),
      argv: [], env: {}, executionId: "hardening-a-dotenv",
    });
    const first = await Promise.race([
      handle.facts()[Symbol.asyncIterator]().next(),
      new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error("host did not launch")), 4000); }),
    ]);
    expect(first.value).toMatchObject({ kind: "launched", hostPid: handle.hostPid });
    const observed = JSON.parse(readFileSync(report, "utf8"));
    expect(observed.pid).toBe(handle.hostPid);
    expect(observed.leaked).toEqual([]);
  } finally {
    clearTimeout(timer);
    spy?.mockRestore();
    handle?.killPgid();
    if (host) {
      try { host.kill("SIGKILL"); } catch { /* already exited */ }
      await host.exited;
    }
    if (ownsDotenv) unlinkSync(dotenv);
    rmSync(root, { recursive: true, force: true });
  }
});
