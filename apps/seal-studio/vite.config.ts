// apps/seal-studio/vite.config.ts
// Seal Studio dev server. Port 5183 so it never collides with the projector
// (:5180), the cockpit (:5181), or the Focus Stage (:5182).
//
// Two dev-only endpoints:
//   GET  /api/head  → { head_sha } read straight from .git — never guessed.
//   POST /api/seal  → the single door from UI to disk (src/lib/seal-bridge).
// Both exist ONLY in `vite` dev (configureServer); `vite build` / `vite
// preview` ship no seal endpoint at all.

import { existsSync, readFileSync, statSync } from "node:fs";
import { isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig, type Plugin } from "vite";

const repoRoot = fileURLToPath(new URL("../..", import.meta.url));
const MAX_BODY_BYTES = 64 * 1024;

type SealToDisk = typeof import("./src/lib/seal-bridge")["sealToDisk"];

/**
 * Resolve the real git dir. In a linked worktree, <repoRoot>/.git is a file
 * ("gitdir: …"); branch refs live in the COMMON dir, not the worktree's own.
 */
function resolveGitDirs(): { gitDir: string; commonDir: string } | null {
  const dotGit = join(repoRoot, ".git");
  try {
    if (statSync(dotGit).isDirectory()) return { gitDir: dotGit, commonDir: dotGit };
    const text = readFileSync(dotGit, "utf8").trim();
    if (!text.startsWith("gitdir: ")) return null;
    const pointer = text.slice("gitdir: ".length).trim();
    const gitDir = isAbsolute(pointer) ? pointer : join(repoRoot, pointer);
    let commonDir = gitDir;
    const commondirPath = join(gitDir, "commondir");
    if (existsSync(commondirPath)) {
      const rel = readFileSync(commondirPath, "utf8").trim();
      commonDir = isAbsolute(rel) ? rel : join(gitDir, rel);
    }
    return { gitDir, commonDir };
  } catch {
    return null;
  }
}

/** Read the repo's current HEAD without spawning git. Null → the UI fails closed. */
function readHeadSha(): string | null {
  const dirs = resolveGitDirs();
  if (dirs === null) return null;
  try {
    const head = readFileSync(join(dirs.gitDir, "HEAD"), "utf8").trim();
    if (/^[0-9a-f]{40}$/.test(head)) return head;
    const refPath = head.startsWith("ref: ") ? head.slice("ref: ".length).trim() : null;
    if (refPath === null) return null;
    for (const dir of [dirs.gitDir, dirs.commonDir]) {
      const loose = join(dir, refPath);
      if (existsSync(loose)) {
        const sha = readFileSync(loose, "utf8").trim();
        if (/^[0-9a-f]{40}$/.test(sha)) return sha;
      }
    }
    for (const dir of [dirs.gitDir, dirs.commonDir]) {
      const packed = join(dir, "packed-refs");
      if (!existsSync(packed)) continue;
      for (const line of readFileSync(packed, "utf8").split("\n")) {
        if (line.startsWith("#") || line.trim() === "") continue;
        const [sha, ref] = line.trim().split(/\s+/);
        if (ref === refPath && sha !== undefined && /^[0-9a-f]{40}$/.test(sha)) return sha;
      }
    }
    return null;
  } catch {
    return null;
  }
}

function sealApi(): Plugin {
  return {
    name: "seal-studio-api",
    configureServer(server) {
      const send = (res: import("node:http").ServerResponse, status: number, body: unknown): void => {
        res.statusCode = status;
        res.setHeader("content-type", "application/json");
        res.setHeader("cache-control", "no-store");
        res.end(JSON.stringify(body));
      };

      server.middlewares.use("/api/head", (req, res) => {
        if (req.method !== "GET") {
          send(res, 405, { error: "GET only" });
          return;
        }
        send(res, 200, { head_sha: readHeadSha() });
      });

      server.middlewares.use("/api/seal", (req, res) => {
        if (req.method !== "POST") {
          send(res, 405, { ok: false, errors: ["POST only"] });
          return;
        }
        const chunks: Buffer[] = [];
        let size = 0;
        let aborted = false;
        req.on("data", (chunk: Buffer) => {
          size += chunk.length;
          if (size > MAX_BODY_BYTES) {
            aborted = true;
            send(res, 413, { ok: false, errors: ["seal request body too large"] });
            req.destroy();
            return;
          }
          chunks.push(chunk);
        });
        req.on("end", () => {
          if (aborted) return;
          let parsed: unknown;
          try {
            parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"));
          } catch {
            send(res, 400, { ok: false, errors: ["seal request is not valid JSON"] });
            return;
          }
          // Loaded at request time inside the running dev server, not at
          // config-load time — keeps this TS import chain out of vite's
          // config bundler entirely.
          void (async () => {
            const sealMod = (await import("./src/lib/seal-bridge")) as { sealToDisk: SealToDisk };
            sealMod
              .sealToDisk(parsed, { repoRoot })
              .then(
                (result) => send(res, result.ok ? 200 : result.status, result),
                (err: unknown) => send(res, 500, { ok: false, errors: [err instanceof Error ? err.message : String(err)] }),
              );
          })().catch((err: unknown) =>
            send(res, 500, { ok: false, errors: [err instanceof Error ? err.message : String(err)] }),
          );
        });
      });
    },
  };
}

export default defineConfig({
  esbuild: { jsx: "automatic" },
  envPrefix: "MADV_",
  resolve: {
    alias: {
      "@mad/founder-act": new URL("../../packages/founder-act/src/index.ts", import.meta.url).pathname,
    },
  },
  plugins: [sealApi()],
  server: { host: true, port: 5183, strictPort: true },
  preview: { host: true, port: 5183, strictPort: true },
  build: { outDir: "dist" },
});
