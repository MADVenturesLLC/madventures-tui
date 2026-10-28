import { expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { userInfo } from "node:os";
import { basename, dirname, join } from "node:path";
import type { BrokerSnapshot, OutputFrame } from "../../packages/broker/src/client";
import { buildAllowlistedEnvironment } from "../../packages/supervisor/src/environment";
import { FIXTURE_REGISTRY, startFixtureSession, type HarnessSession } from "./runtime-harness";

const consumers = ["identity", "auth", "host", "child"] as const;

async function ready(output: AsyncIterator<OutputFrame>, frames: OutputFrame[] = []): Promise<void> {
  let text = "";
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      (async () => {
        while (!text.includes("FIXTURE_READY\r\n")) {
          const frame = await output.next();
          expect(frame.done).toBe(false);
          frames.push(frame.value!);
          text += new TextDecoder().decode(frame.value!.bytes);
        }
      })(),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("Fixture readiness output missing")), 2_000);
      }),
    ]);
  } finally { clearTimeout(timer); }
}

async function captures(session: HarnessSession) {
  const snapshot = await session.client.getSnapshot();
  expect(snapshot.executions).toHaveLength(2);
  const root = dirname(session.storage.root);
  return Promise.all(snapshot.executions!.map(async execution => {
    const output = session.client.output(execution.identity.execution_id)[Symbol.asyncIterator]();
    try { await ready(output); } finally { await output.return?.(); }
    return {
      execution,
      environments: consumers.map(consumer => {
        const path = join(root, `${basename(execution.executablePath)}.${consumer}.environment.json`);
        return existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) as Record<string, string> : undefined;
      }),
    };
  }));
}

async function seeded(values: Readonly<Record<string, string>>, run: () => Promise<void>): Promise<void> {
  const previous = Object.keys(values).map(name => [name, process.env[name]] as const);
  try {
    for (const [name, value] of Object.entries(values)) process.env[name] = value;
    await run();
  } finally {
    for (const [name, value] of previous) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
}

function filesUnder(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap(entry => {
    const path = join(root, entry.name);
    return entry.isDirectory() ? filesUnder(path) : [path];
  });
}

test("the identity probe, auth probe, PTY host, and governed child receive byte-identical environments", async () => {
  const session = await startFixtureSession();
  try {
    const root = dirname(session.storage.root), user = userInfo();
    for (const { execution, environments } of await captures(session)) {
      const expected = buildAllowlistedEnvironment(FIXTURE_REGISTRY.get(execution.identity.surface)!, {
        HOME: user.homedir, SHELL: user.shell!, PATH: join(root, "bin"), TERM: "xterm-256color", TMPDIR: join(root, "tmp"),
      });
      for (const environment of environments) expect(environment).toEqual(expected);
    }
  } finally { await session.close(); }
}, 15_000);

test("no ambient variable outside the allowlist reaches any of the four", async () => {
  const names = ["MADV_AMBIENT_LEAK", "AWS_SECRET_ACCESS_KEY", "GITHUB_TOKEN"];
  await seeded(Object.fromEntries(names.map(name => [name, `task50-synthetic-${name}`])), async () => {
    const session = await startFixtureSession();
    try {
      for (const { environments } of await captures(session)) {
        for (const environment of environments) {
          expect(environment).toBeDefined();
          for (const name of names) expect(Object.keys(environment!)).not.toContain(name);
        }
      }
    } finally { await session.close(); }
  });
}, 15_000);

test("a secret-marked value never appears in any diagnostic, error, or evidence artifact produced by the session", async () => {
  // No fixture allowlist marks a value secret at this base; R3 pins ambient marker isolation.
  const marker = "task50-synthetic-secret-marker";
  await seeded({ MADV_SECRET_MARKER: marker }, async () => {
    let session: HarnessSession | undefined;
    try {
      session = await startFixtureSession();
      const root = dirname(session.storage.root);
      const snapshots: BrokerSnapshot[] = [await session.client.getSnapshot()];
      expect(snapshots[0]!.phase).toBe("active");
      const streams = snapshots[0]!.executions!.map(execution => ({
        output: session!.client.output(execution.identity.execution_id)[Symbol.asyncIterator](), frames: [] as OutputFrame[],
      }));
      await Promise.all(streams.map(({ output, frames }) => ready(output, frames)));
      const drains = streams.map(async ({ output, frames }) => {
        for (;;) {
          const frame = await output.next();
          if (frame.done) break;
          frames.push(frame.value);
        }
      });
      const result = await session.client.request({ kind: "session_close", commandId: crypto.randomUUID(),
        sessionId: snapshots[0]!.sessionId, reason: "Task 50 fixture close" });
      expect(result.ok).toBe(true);
      await Promise.all(drains);
      snapshots.push(await session.client.getSnapshot());
      expect(snapshots[1]!.phase).toBe("closed");
      expect(JSON.stringify({ snapshots, result })).not.toContain(marker);
      for (const { frames } of streams) {
        expect(frames.length).toBeGreaterThan(0);
        expect(JSON.stringify(frames)).not.toContain(marker);
        expect(Buffer.concat(frames.map(frame => Buffer.from(frame.bytes))).includes(Buffer.from(marker))).toBe(false);
      }
      const database = new Database(join(session.storage.ledgerDir, "ledger.sqlite3"), { readonly: true });
      try {
        const rows = database.query("SELECT * FROM events ORDER BY sequence").all();
        expect(rows.length).toBeGreaterThan(0);
        expect(JSON.stringify(rows)).not.toContain(marker);
      } finally { database.close(); }
      const files = filesUnder(root);
      expect(files.filter(path => path.endsWith(".environment.json"))).toHaveLength(8);
      for (const path of files) {
        expect(path).not.toContain(marker);
        expect(readFileSync(path).includes(Buffer.from(marker))).toBe(false);
      }
      await session.close();
      expect(JSON.stringify(await session.client.getSnapshot())).not.toContain(marker);
      expect(existsSync(root)).toBe(false);
    } catch (error) {
      expect(Bun.inspect(error)).not.toContain(marker);
      throw error;
    } finally { await session?.close(); }
  });
}, 15_000);
