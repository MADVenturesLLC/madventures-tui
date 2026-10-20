// apps/madv-agent/src/scrub.ts
// Environment scrub at entry (design §6).
//
// The agent starts from an ALLOWLIST and drops everything else — every
// *_API_KEY, GH_TOKEN, GITHUB_TOKEN, and proxy variables included — before it
// renders or calls anything. The dropped NAMES (never values) are returned so
// the session can record them as an event.

/** Environment variable names the agent keeps. Everything else is dropped. */
export const ENV_ALLOWLIST: readonly string[] = [
  // Runtime basics
  "PATH",
  "HOME",
  "SHELL",
  "USER",
  "LOGNAME",
  "PWD",
  "OLDPWD",
  "TMPDIR",
  // Terminal capabilities the TUI legitimately reads
  "TERM",
  "TERM_PROGRAM",
  "TERM_PROGRAM_VERSION",
  "COLORTERM",
  "LANG",
  "LC_ALL",
  "TZ",
  // Toolchain homes. These are PATHS the agent needs in order to run a build
  // or a test — `go vet` cannot find its module cache without GOMODCACHE, and
  // `cargo`/`npm` have the same shape. They are allowlisted HERE, at entry, so
  // the child process inherits them; a list that only re-added them later could
  // never work, because the entry scrub has already deleted them by then.
  "GOPATH",
  "GOMODCACHE",
  "GOCACHE",
  "GOFLAGS",
  "GOROOT",
  "CARGO_HOME",
  "RUSTUP_HOME",
  "NPM_CONFIG_CACHE",
  "NODE_PATH",
  "JAVA_HOME",
  "NO_COLOR",
  "DISPLAY",
  // Loopback-only auth plumbing (never a credential value)
  "SSH_AUTH_SOCK",
  "SSH_TTY",
  // XDG convention dirs
  "XDG_CONFIG_HOME",
  "XDG_DATA_HOME",
  "XDG_CACHE_HOME",
  "XDG_RUNTIME_DIR",
  // The agent's own single configuration knob: the proxy base URL.
  "MADV_AGENT_PROXY_URL",
];

/** Proxy variables are dropped by rule even if someone adds them to the list. */
const PROXY_VAR_NAMES: ReadonlySet<string> = new Set([
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "ALL_PROXY",
  "NO_PROXY",
  "http_proxy",
  "https_proxy",
  "all_proxy",
  "no_proxy",
]);

/** A name the instrument mandates dropping, whatever the allowlist says. */
export function isMandatedDrop(name: string): boolean {
  if (name === "GH_TOKEN" || name === "GITHUB_TOKEN") return true;
  if (name.endsWith("_API_KEY") || name.endsWith("_api_key")) return true;
  return PROXY_VAR_NAMES.has(name);
}

export interface ScrubResult {
  /** The kept environment (allowlisted names only). */
  kept: Record<string, string>;
  /** The dropped NAMES, sorted. Never values. */
  dropped: string[];
}

/**
 * Scrub an environment object down to the allowlist.
 * Pure: returns a new object; the input is not mutated.
 */
export function scrubEnvironment(env: Record<string, string | undefined>): ScrubResult {
  const kept: Record<string, string> = {};
  const dropped: string[] = [];
  for (const name of Object.keys(env)) {
    const value = env[name];
    if (value === undefined) continue;
    if (ENV_ALLOWLIST.includes(name) && !isMandatedDrop(name)) {
      kept[name] = value;
    } else {
      dropped.push(name);
    }
  }
  return { kept, dropped: dropped.sort() };
}

/**
 * Apply the scrub to the live process environment: every dropped name is
 * deleted from process.env before the agent renders or calls anything.
 * Returns the scrub result so the caller can record the dropped names.
 */
export function scrubProcessEnvironment(processEnv: NodeJS.ProcessEnv): ScrubResult {
  const { kept, dropped } = scrubEnvironment(processEnv);
  for (const name of Object.keys(processEnv)) {
    if (!(name in kept)) {
      delete processEnv[name];
    }
  }
  return { kept, dropped };
}
