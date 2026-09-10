// packages/tui-chaos/src/asciinema.ts
// Optional asciinema v2 (.cast) recording assembled from the raw PTY byte
// stream with wall-clock timestamps. Purely observational — the evidence
// packet never derives pass/fail from the recording.

export interface CastWriter {
  onBytes(data: string): void;
  finish(): string;
}

export function startCast(header: { width: number; height: number }, filePath: string): CastWriter {
  const startMs = Date.now();
  const lines: string[] = [
    JSON.stringify({
      version: 2,
      width: header.width,
      height: header.height,
      timestamp: Math.floor(startMs / 1000),
      env: { SHELL: "/bin/sh", TERM: "xterm-256color" },
    }),
  ];

  return {
    onBytes(data: string) {
      const t = Number(((Date.now() - startMs) / 1000).toFixed(6));
      lines.push(JSON.stringify([t, "o", data]));
    },
    finish(): string {
      const { writeFileSync, mkdirSync } = require("node:fs") as typeof import("node:fs");
      const { dirname } = require("node:path") as typeof import("node:path");
      mkdirSync(dirname(filePath), { recursive: true });
      writeFileSync(filePath, lines.join("\n") + "\n", "utf8");
      return filePath;
    },
  };
}
