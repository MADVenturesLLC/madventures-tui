import { afterAll, expect, test } from "bun:test";
import { readdirSync, readlinkSync } from "node:fs";
import { startProcessScenario as start, fixtureProcessReport as report, fixtureLivenessEpermCount } from "../runtime-harness";
interface Descriptor { fd: number; type: string; device?: string; inode?: string; peer?: string }

let livenessEpermCount = 0;
afterAll(() => console.log(`descriptor-hygiene alive EPERM count=${livenessEpermCount}; runtime-harness alive EPERM count=${fixtureLivenessEpermCount()}`));

function alive(pid: number): boolean {
  try { process.kill(pid, 0); return true; }
  catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "EPERM") { livenessEpermCount += 1; return false; }
    if (code === "ESRCH") return false;
    throw error;
  }
}
function descriptors(pid: number, recorded: readonly number[]): Descriptor[] {
  expect(recorded.includes(pid)).toBe(true);
  if (process.platform === "linux") {
    let closedDuringListing = 0;
    try {
      return readdirSync(`/proc/${pid}/fd`).flatMap(fd => {
        if (!/^\d+$/.test(fd)) return [];
        let target: string;
        try { target = readlinkSync(`/proc/${pid}/fd/${fd}`); }
        catch (error) {
          if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
          closedDuringListing += 1;
          return [];
        }
        const match = /^pipe:\[(\d+)\]$/.exec(target);
        return match ? [{ fd: Number(fd), type: "PIPE", inode: match[1]! }] : [];
      });
    } finally {
      console.log(`descriptor_listing pid=${pid} closed_ENOENT_count=${closedDuringListing}`);
    }
  }
  expect(process.platform).toBe("darwin");
  const result = Bun.spawnSync(["lsof", "-nP", "-a", "-p", String(pid), "-FftdDin"], { stdout: "pipe", stderr: "pipe" });
  expect(result.exitCode).toBe(0);
  const inventory: Descriptor[] = [];
  let entry: Descriptor | undefined;
  for (const raw of result.stdout.toString().split(/[\n\0]/)) {
    const field = raw.trim();
    const fd = /^f(\d+)/.exec(field);
    if (fd) { entry = { fd: Number(fd[1]), type: "" }; inventory.push(entry); }
    else if (/^f/.test(field)) entry = undefined;
    else if (entry && /^t[A-Za-z0-9_]+$/.test(field)) entry.type = field.slice(1).toUpperCase();
    else if (entry && /^[dD](?:0x)?[0-9a-f]+$/i.test(field)) entry.device = field.slice(1);
    else if (entry && /^i(?:0x)?[0-9a-f]+$/i.test(field)) entry.inode = field.slice(1);
    else if (entry?.type === "PIPE" || entry?.type === "UNIX") {
      const peer = /^n->(0x[0-9a-f]+)$/i.exec(field);
      if (peer) entry.peer = peer[1]!;
    }
  }
  return inventory;
}

test("with two PTY hosts and an adapter, no process holds a sibling's lifeline write end", async () => {
  const session = await start("descriptors");
  try {
    const data = await report(session);
    expect(data.hostPids).toHaveLength(2);
    expect(data.adapterPid, "the harness has no concurrent fixture adapter process").not.toBeNull();
    const recorded = [data.supervisorPid, ...data.hostPids, ...data.childPids, data.adapterPid!];
    for (const pid of recorded) expect(alive(pid)).toBe(true);
    const inventories = new Map(recorded.map(pid => [pid, descriptors(pid, recorded)]));
    const writeEnds = data.hostPids.map(pid => {
      const stdin = inventories.get(pid)!.find(fd => fd.fd === 0)!;
      expect(["PIPE", "UNIX"]).toContain(stdin?.type);
      const id = process.platform === "darwin" ? stdin.peer : stdin.inode;
      expect(id).toBeDefined();
      const matches = (fd: Descriptor) => ["PIPE", "UNIX"].includes(fd.type) && (process.platform === "darwin" ? fd.device : fd.inode) === id;
      expect(inventories.get(data.supervisorPid)!.filter(matches).length).toBeGreaterThan(0);
      for (const other of [...data.hostPids, ...data.childPids, data.adapterPid!]) {
        if (process.platform === "linux" && other === pid) continue;
        expect(inventories.get(other)!.filter(matches)).toEqual([]);
      }
      return id;
    });
    expect(new Set(writeEnds).size).toBe(2);
  } finally { await session.close(); }
}, 15_000);

test("closing host A's stdin does not affect host B", async () => {
  const session = await start("lifeline-eof");
  try {
    const data = await report(session);
    const deadline = performance.now() + 5000;
    while (alive(data.hostPids[0]!) && performance.now() < deadline) await Bun.sleep(10);
    expect(alive(data.hostPids[0]!)).toBe(false);
    expect(alive(data.childPids[0]!)).toBe(false);
    expect(alive(data.hostPids[1]!)).toBe(true);
    expect(alive(data.childPids[1]!)).toBe(true);
    expect(data.adapterPid).not.toBeNull();
    expect(alive(data.adapterPid!)).toBe(true);
  } finally { await session.close(); }
}, 15_000);
