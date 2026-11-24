import { expect, test } from "bun:test";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnPtyHost } from "../../packages/broker/src/pty-host-supervisor";
import { offlineStart } from "./offline";

test("the PTY host does not echo a line written before the child reads it", async () => {
  const fixture = offlineStart();
  try {
    const path = join(fixture.bin, "reader.js");
    const source = [
      "#!" + process.execPath + " --no-env-file",
      'import { existsSync, readSync, writeSync } from "node:fs";',
      "process.chdir(process.argv[2]);",
      'while (!existsSync("permit-read")) await Bun.sleep(5);',
      "const bytes = Buffer.alloc(64);",
      "const count = readSync(0, bytes, 0, bytes.length, null);",
      'if (bytes.toString("utf8", 0, count) !== "synthetic input\\n") process.exit(2);',
      'process.on("SIGTERM", () => process.exit(0));',
      'writeSync(1, "received\\n");',
      "await Bun.sleep(10000);",
      "",
    ].join("\n");
    writeFileSync(path, source, { mode: 0o700 });
    const host = spawnPtyHost({
      path, sha256: new Bun.CryptoHasher("sha256").update(source).digest("hex"),
      executionId: "offline-echo", argv: [fixture.work],
      env: { HOME: fixture.root, TMPDIR: fixture.temp, PATH: fixture.bin },
    });
    const deadline = setTimeout(() => host.closeStdin(), 5000);
    try {
      let output = "";
      let exitCode: number | null = null;
      for await (const fact of host.facts()) {
        if (fact.kind === "ready") {
          host.send({ kind: "input", bytes: new TextEncoder().encode("synthetic input\n") });
        } else if (fact.kind === "ack" && fact.ofKind === "input") {
          writeFileSync(join(fixture.work, "permit-read"), "");
        } else if (fact.kind === "output") {
          output += Buffer.from(fact.bytes).toString("ascii");
          if (output.endsWith("received\r\n")) host.send({ kind: "terminate" });
        } else if (fact.kind === "exited") {
          exitCode = fact.code;
          host.closeStdin();
        }
      }
      expect(output).toBe("received\r\n");
      expect(exitCode).toBe(0);
    } finally {
      clearTimeout(deadline);
      host.closeStdin();
    }
  } finally {
    fixture.dispose();
  }
}, 12000);
