// packages/tui-chaos/src/tui-session.ts
// Launches the REAL TUI entrypoint (apps/madbridge/src/tui/main.tsx
// --fixture) inside a headless PTY and wires it to the screen model.
//
// Start mode contract (documented in README):
//   - The harness ALWAYS drives the fixture path. It sets MADV_TUI_FIXTURE=1
//     and never stands up a broker. If a live `madv-tui start` would return
//     no_broker_available, that is exactly why the fixture path exists — the
//     harness does not paper over it.
//   - The child env is an explicit allowlist (no ambient env inheritance),
//     so no secrets or host config leak into the run.
//   - The harness parents the TUI under test ONLY. It parents no agent
//     processes and creates no daemon, socket, or endpoint.

import path from "node:path";
import { fileURLToPath } from "node:url";
import { openPtySession, type PtySession } from "./pty/session";
import { Screen } from "./screen";
import type { CastWriter } from "./asciinema";

export interface TuiLaunchOptions {
  repoRoot: string;
  cols: number;
  rows: number;
  /** Enable the colorized fixture stream (MADV_TUI_FIXTURE_STREAM=1). */
  stream?: boolean;
  cast?: CastWriter | null;
  onOutput?: (data: string) => void;
}

export interface TuiFixtureSession {
  session: PtySession;
  screen: Screen;
  entrypoint: string;
  fixtureFlags: string[];
  close(): Promise<void>;
}

/**
 * Derive the repo root from a module URL using the correct URL-to-filesystem
 * conversion. `URL.pathname` is percent-encoded (spaces arrive as %20), so it
 * must never be used directly as a filesystem path; `fileURLToPath` decodes.
 * `moduleUrl` is expected to be .../packages/tui-chaos/src/<file>.
 */
export function repoRootFromModuleUrl(moduleUrl: URL): string {
  return path.resolve(fileURLToPath(new URL("../../..", moduleUrl)));
}

export function defaultRepoRoot(): string {
  // packages/tui-chaos/src -> repo root is three levels up.
  // import.meta.url is a string in TS; wrap it into a URL for the
  // fileURLToPath-based derivation.
  return repoRootFromModuleUrl(new URL(import.meta.url));
}

export async function launchTuiFixtureSession(opts: TuiLaunchOptions): Promise<TuiFixtureSession> {
  const bunExec = typeof Bun !== "undefined" ? process.execPath : null;
  if (!bunExec) {
    throw new Error(
      "tui-chaos must run under Bun (the TUI under test is a Bun program). " +
        "Run: bun packages/tui-chaos/src/cli.ts run",
    );
  }

  const entrypoint = path.join(opts.repoRoot, "apps", "madbridge", "src", "tui", "main.tsx");
  // ── Fixture gates (the ONLY env seams the harness sets) ──
  // fixtureFlags is DERIVED from the env actually constructed here — the
  // authoritative session state — so evidence packets can never drift from
  // what the run really used.
  const fixtureEnv: Record<string, string> = {
    MADV_TUI_FIXTURE: "1",
    ...(opts.stream ? { MADV_TUI_FIXTURE_STREAM: "1" } : {}),
  };
  const env: Record<string, string> = {
    PATH: process.env.PATH ?? "/usr/bin:/bin",
    HOME: process.env.HOME ?? "/tmp",
    TERM: "xterm-256color",
    LANG: process.env.LANG ?? "en_US.UTF-8",
    TMPDIR: process.env.TMPDIR ?? "/tmp",
    ...fixtureEnv,
  };
  const fixtureFlags = Object.entries(fixtureEnv).map(([k, v]) => `${k}=${v}`);

  const session = await openPtySession({
    file: bunExec,
    args: [entrypoint, "--fixture"],
    cwd: opts.repoRoot,
    env,
    cols: opts.cols,
    rows: opts.rows,
  });

  const screen = new Screen(opts.cols, opts.rows);
  session.onData((data) => {
    opts.cast?.onBytes(data);
    opts.onOutput?.(data);
    void screen.write(data);
  });

  return {
    session,
    screen,
    entrypoint,
    fixtureFlags,
    async close() {
      await session.close();
    },
  };
}
