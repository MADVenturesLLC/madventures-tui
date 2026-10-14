// DEC-20261013-01 B3 and DEC-20261014-02 B2. Probe output is local to
// this invocation and never leaves the metadata-only result boundary.
export const IDENTITY_PROBE_INPUT = '{"type":"user","message":{"role":"user","content":"Report session initialization."}}\n';

export interface ProbeRequest {
  executablePath: string;
  arguments: readonly string[];
  environment: Readonly<Record<string, string>>;
  stdin: string;
  signal: AbortSignal;
  kind: "identity" | "auth";
  model: string;
  supportedVersions: readonly string[];
}

export interface ProbeProcess {
  readonly stdout: ReadableStream<Uint8Array>;
  readonly stderr: ReadableStream<Uint8Array>;
  readonly exited: Promise<number>;
  readonly signalCode?: string | number | null;
  kill(signal: "SIGTERM" | "SIGKILL"): void;
}

// Module-level dependency seam for deterministic tests. Not exposed by the
// package index, and never supplied by a preflight caller.
export interface ProbeRuntime {
  spawn(request: ProbeRequest): ProbeProcess;
  now(): number;
  parseAuth(output: string): boolean;
}

export interface ProbeDiagnostic {
  readonly result: "pass" | "auth_not_ready" | "identity_mismatch";
  readonly primitive: "auth status" | "system/init";
  readonly exitCode: number | null;
  readonly signal: string | number | null;
  readonly stdoutBytes: number;
  readonly stderrBytes: number;
}
export interface ProbeResult { readonly ok: boolean; readonly diagnostic: ProbeDiagnostic }

const EXECUTION_MS = 5_000;
const CLEANUP_MS = 1_000;
const GRACE_MS = 500;
const STREAM_LIMIT = 65_536;

export function parseAuthReadiness(output: string): boolean {
  try {
    const v: unknown = JSON.parse(output);
    if (v === null || typeof v !== "object" || Array.isArray(v)) return false;
    const p = v as Record<string, unknown>;
    return p.loggedIn === true && p.authMethod === "claude.ai"
      && p.apiProvider === "firstParty" && p.subscriptionType === "max";
  } catch { return false; }
}

function firstInit(output: string): Record<string, unknown> | undefined {
  for (const line of output.split("\n")) {
    if (line.trim() === "") continue;
    try {
      const event = JSON.parse(line);
      if (event?.type === "system" && event?.subtype === "init") return event;
    } catch { /* A non-init line is not identity evidence. */ }
  }
  return undefined;
}

export function parseIdentity(output: string, model: string, versions: readonly string[]): boolean {
  const event = firstInit(output);
  return event !== undefined && event.model === model
    && typeof event.claude_code_version === "string"
    && versions.includes(event.claude_code_version);
}

const runtime: ProbeRuntime = {
  now: () => performance.now(),
  parseAuth: parseAuthReadiness,
  spawn: req => Bun.spawn([req.executablePath, ...req.arguments], {
    env: req.environment, stdin: new Blob([req.stdin]), stdout: "pipe", stderr: "pipe",
  }),
};

export async function runBoundedProbe(request: ProbeRequest, overrides: Partial<ProbeRuntime> = {}): Promise<ProbeResult> {
  const rt = { ...runtime, ...overrides };
  const started = rt.now();
  let stdoutBytes = 0, stderrBytes = 0;
  let exitCode: number | null = null;
  let signal: string | number | null = null;
  let output = "";
  let process: ProbeProcess | undefined;
  let exitObserved = false;
  let streamFailure = false;
  let oversized = false;
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const readers: { cancel(): Promise<void> }[] = [];
  let wake!: (reason: "cancel" | "overflow" | "identity") => void;
  const interrupted = new Promise<"cancel" | "overflow" | "identity">(resolve => { wake = resolve; });
  const abort = () => wake("cancel");
  function result(ok: boolean): ProbeResult {
    return Object.freeze({ ok, diagnostic: Object.freeze({
      result: ok ? "pass" : request.kind === "identity" ? "identity_mismatch" : "auth_not_ready",
      primitive: request.kind === "identity" ? "system/init" : "auth status",
      exitCode, signal, stdoutBytes, stderrBytes,
    }) });
  }
  function deadline<T>(promise: Promise<T>, end: number): Promise<T | "deadline"> {
    return new Promise(resolve => {
      const timer = setTimeout(() => { timers.delete(timer); resolve("deadline"); }, Math.max(0, end - rt.now()));
      timers.add(timer);
      promise.then(value => { clearTimeout(timer); timers.delete(timer); resolve(value); }, () => {
        clearTimeout(timer); timers.delete(timer); streamFailure = true; resolve("deadline");
      });
    });
  }
  async function consume(stream: ReadableStream<Uint8Array>, name: "stdout" | "stderr") {
    const reader = stream.getReader(); readers.push(reader);
    const decoder = new TextDecoder();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (name === "stdout") stdoutBytes += value.byteLength; else stderrBytes += value.byteLength;
        const count = name === "stdout" ? stdoutBytes : stderrBytes;
        if (count > STREAM_LIMIT) { oversized = true; wake("overflow"); continue; }
        if (name === "stdout") {
          output += decoder.decode(value, { stream: true });
          // Detect only the event boundary while streaming. Identity field
          // validation, like auth parsing, happens after exit and reaping.
          if (request.kind === "identity" && firstInit(output) !== undefined) wake("identity");
        }
      }
      if (name === "stdout") output += decoder.decode();
    } catch { streamFailure = true; wake("overflow"); }
    finally { reader.releaseLock(); }
  }
  try {
    if (request.signal.aborted) return result(false);
    request.signal.addEventListener("abort", abort, { once: true });
    if (request.signal.aborted) return result(false);
    try { process = rt.spawn(request); } catch { return result(false); }
    const observedExit = process.exited.then(code => {
      exitObserved = true; exitCode = code; signal = process?.signalCode ?? null;
    });
    const reaped = Promise.all([observedExit, consume(process.stdout, "stdout"), consume(process.stderr, "stderr")]).then(() => "reaped" as const);
    const reason = await deadline(Promise.race([reaped, interrupted]), started + EXECUTION_MS);
    let clean = reason === "reaped" && rt.now() - started <= EXECUTION_MS;
    if (reason !== "reaped") {
      const cleanupStart = rt.now();
      const end = Math.min(cleanupStart + CLEANUP_MS, started + EXECUTION_MS + CLEANUP_MS);
      if (!exitObserved) { try { process.kill("SIGTERM"); } catch { streamFailure = true; } }
      let completion = await deadline(reaped, Math.min(cleanupStart + GRACE_MS, end));
      if (completion !== "reaped") {
        if (!exitObserved) { try { process.kill("SIGKILL"); } catch { streamFailure = true; } }
        completion = await deadline(reaped, end);
      }
      clean = reason === "identity" && completion === "reaped" && rt.now() <= end;
    }
    if (!clean || request.signal.aborted || streamFailure || oversized || !exitObserved || exitCode !== 0 || signal !== null) return result(false);
    // No output parser is reached before the subprocess's exit promise and
    // both stream drains have settled inside the relevant monotonic budget.
    const accepted = request.kind === "identity"
      ? parseIdentity(output, request.model, request.supportedVersions)
      : rt.parseAuth(output);
    return result(accepted);
  } catch { return result(false); }
  finally {
    request.signal.removeEventListener("abort", abort);
    for (const timer of timers) clearTimeout(timer);
    for (const reader of readers) { try { await reader.cancel(); } catch { /* released reader */ } }
  }
}
