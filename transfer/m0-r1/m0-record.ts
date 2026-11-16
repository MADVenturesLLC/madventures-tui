// DEC-20261115-02 B10 and B15 item 3. Founder-run capture reader.
// No surface is executed. Only --write can call the capability store.
import { readFileSync, realpathSync, lstatSync } from "node:fs";
import { isAbsolute, join, relative, basename } from "node:path";
import { arch, platform, release, userInfo } from "node:os";
import { pathToFileURL } from "node:url";

type Json = Record<string, any>;
type Capture = { argv: Array<string>; stdin: string; stdout: string; stderr: string; exit: number; signal: string | null; timedOut: boolean };
const checks = new Array<{ check: string; pass: boolean }>();
const initFacts = new Array<Json>();
const toolCounts = new Array<Json>();
const hash = (bytes: string | Uint8Array) => new Bun.CryptoHasher("sha256").update(bytes).digest("hex");
const markers = new Array("sk-cp-", "sk-ant-");
function reject(reason: string): never { throw new Error(reason); }
function safe(bytes: string | Uint8Array, label: string): void {
  const text = typeof bytes === "string" ? bytes : new TextDecoder().decode(bytes);
  if (markers.some(marker => text.includes(marker))) reject("forbidden marker: " + label);
}
function check(name: string, pass: boolean): boolean { checks.push({ check: name, pass }); return pass; }
function requireCheck(name: string, pass: boolean): void { if (!check(name, pass)) reject(name); }
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const lines = (text: string) => text.replace(/\n$/, "").split("\n");
const object = (value: unknown): value is Json => value !== null && typeof value === "object" && !Array.isArray(value);

async function main(): Promise<void> {
  if (process.env.MINIMAX_API_KEY !== undefined) reject("MINIMAX_API_KEY is set");
  if (process.env.MADV_STORAGE_DIR !== undefined) reject("MADV_STORAGE_DIR is set");
  const options = new Map<string, string>();
  const args = process.argv.slice(2);
  let write = false;
  for (let i = 0; i < args.length; i++) {
    const name = args.at(i)!;
    if (name === "--write" && !write) { write = true; continue; }
    if (!new Array("--clone", "--surface", "--host", "--investigation").includes(name)
      || options.has(name) || args.at(i + 1) === undefined) reject("invalid arguments");
    options.set(name, args.at(++i)!);
  }
  if (options.size !== 4) reject("missing arguments");
  const root = options.get("--clone")!;
  const surface = options.get("--surface")!;
  const hostName = options.get("--host")!;
  const directory = options.get("--investigation")!;
  if (!isAbsolute(root) || !isAbsolute(directory)) reject("paths must be absolute");
  if (!new Array("madv-surface", "claude-code").includes(surface)) reject("invalid surface");
  if (!new Array("macbook", "ubuntu").includes(hostName)) reject("invalid host");
  const git = Bun.spawnSync(new Array("git", "-C", root, "rev-parse", "--is-inside-work-tree"), { stdout: "pipe", stderr: "pipe" });
  if (git.exitCode !== 0 || git.stdout.toString().trim() !== "true") reject("ROOT is not a git work tree");
  const moduleAt = (path: string) => import(pathToFileURL(join(root, path)).href);
  const protocol = await moduleAt("packages/protocol/src/index.ts");
  const adapter = await moduleAt("packages/adapter-madv-surface/src/index.ts");
  const probes = await moduleAt("packages/supervisor/src/attestation.ts");
  const environment = await moduleAt("packages/supervisor/src/environment.ts");
  const storage = await moduleAt("packages/storage/src/index.ts");
  const registration = protocol.ADAPTER_REGISTRY.get(protocol.parseSurfaceId(surface));
  if (!registration) reject("surface is not registered at ROOT");

  // MANIFEST.sha256 is the integrity index; it covers every capture read.
  // It is not itself a self-referential manifest entry.
  let manifestBytes: Buffer;
  try { manifestBytes = readFileSync(join(directory, "MANIFEST.sha256")); }
  catch { reject("missing MANIFEST.sha256"); }
  safe(manifestBytes, "manifest");
  const manifest = new Map<string, string>();
  for (const line of lines(manifestBytes.toString())) {
    const digest = line.slice(0, 64), name = line.slice(66);
    if (digest.length !== 64 || !Array.from(digest).every(char => "0123456789abcdef".includes(char))
      || line.slice(64, 66) !== "  " || !name || isAbsolute(name)
      || name.includes("\\") || name.split("/").some(part => part === ".." || part === "." || part === "")
      || manifest.has(name)) reject("invalid manifest entry");
    manifest.set(name, digest);
  }
  const realDirectory = realpathSync(directory);
  function read(name: string): string {
    const expected = manifest.get(name);
    if (!expected) reject("file not covered by manifest: " + name);
    const file = join(directory, name);
    let bytes: Buffer;
    try {
      if (!lstatSync(file).isFile() || relative(realDirectory, realpathSync(file)).startsWith("..")) reject("unsafe capture path");
      bytes = readFileSync(file);
    } catch { reject("missing or unsafe file: " + name); }
    safe(bytes, name);
    if (hash(bytes) !== expected) reject("manifest hash mismatch: " + name);
    return bytes.toString("utf8");
  }
  const captures = new Map<number, Capture>();
  const count = surface === "madv-surface" ? 9 : 18;
  for (let n = 1; n <= count; n++) {
    const stem = surface + "/" + String(n).padStart(2, "0");
    const argv = lines(read(stem + ".argv"));
    const stdin = read(stem + ".stdin"), stdout = read(stem + ".stdout"), stderr = read(stem + ".stderr");
    const status = lines(read(stem + ".status"));
    const exit = Number(status.at(0)?.slice(5));
    const signalText = status.at(1)?.slice(7);
    const timeoutText = status.at(2)?.slice(10);
    if (status.length !== 3 || !status.at(0)?.startsWith("exit=") || !Number.isInteger(exit) || exit < 0 || exit > 255
      || !status.at(1)?.startsWith("signal=") || !signalText
      || !(signalText === "none" || (signalText.startsWith("SIG") && Array.from(signalText).every(char => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".includes(char))))
      || !status.at(2)?.startsWith("timed_out=") || !new Array("yes", "no").includes(timeoutText!)) reject("invalid status: " + stem);
    if (!argv.at(0) || !isAbsolute(argv.at(0)!)) reject("invalid executable path in argv: " + stem);
    captures.set(n, { argv, stdin, stdout, stderr, exit, signal: signalText === "none" ? null : signalText, timedOut: timeoutText === "yes" });
  }
  const get = (n: number) => captures.get(n)!;
  const clean = (n: number) => get(n).exit === 0 && get(n).signal === null && !get(n).timedOut;
  const capturedEnvironment = new Map<string, string | null>();
  const secretName = surface === "madv-surface" ? "MINIMAX_API_KEY" : null;
  for (const line of lines(read(surface + "/environment.txt"))) {
    const equals = line.indexOf("="), name = equals < 0 ? line : line.slice(0, equals);
    const value = equals < 0 ? null : line.slice(equals + 1);
    if (capturedEnvironment.has(name) || (name === secretName ? value !== null : value === null)) reject("invalid captured environment names or secret form");
    capturedEnvironment.set(name, value);
  }
  const presence = Object.fromEntries(Array.from(capturedEnvironment, entry => new Array(entry.at(0), entry.at(1) === null ? "SYNTHETIC-SECRET-PRESENCE-ONLY" : entry.at(1))));
  let selected: Json;
  try { selected = environment.buildAllowlistedEnvironment(registration, presence); }
  catch { reject("missing required captured environment variable"); }
  requireCheck("captured environment equals ROOT allowlist selection", same(Object.keys(selected).sort(), Array.from(capturedEnvironment.keys()).sort()));
  const term = capturedEnvironment.get("TERM"), shell = capturedEnvironment.get("SHELL");
  requireCheck("captured TERM and SHELL are present", typeof term === "string" && term.length > 0 && typeof shell === "string" && shell.length > 0);
  requireCheck("captured HOME equals passwd home", capturedEnvironment.get("HOME") === userInfo().homedir);
  const mac = hostName === "macbook";
  requireCheck("host operating system and architecture", mac ? platform() === "darwin" && arch() === "arm64" : platform() === "linux" && arch() === "x64");
  const runtimePath = mac ? "/Users/michaeldaley/.bun/bin/bun" : "/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun";
  const runtimeHash = mac ? "35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5" : "0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb";
  const runtimeRevision = mac ? "744846f844374847c902b5e7fd59b4342a51ef99" : "69cb78c9097cebd3bdb832d9fff8b7d23abce09e";
  requireCheck("host runtime matches DEC-20261114-01 A4", realpathSync(process.execPath) === realpathSync(runtimePath)
    && hash(readFileSync(runtimePath)) === runtimeHash && Bun.version === (mac ? "1.4.2" : "1.4.1") && Bun.revision === runtimeRevision);
  const prefix = mac ? "/Users/michaeldaley" : "/home/michaeldaley";
  const madv = surface === "madv-surface";
  const binaryPath = madv ? prefix + "/builds/madv-surface-0.1.1/dist/madv-surface" : prefix + "/.local/bin/madbridge-claude-v5";
  const binaryHash = madv
    ? mac ? "daf7ffe5922a3b538d69e6408d4c14c96978b17d16aca2cdeb57e7b6f1852024" : "8dcced0bbc3b6ff3e7372977cae2d48036fa8dabae03e6aa5485efc1bc766a63"
    : mac ? "591bad397af64e89b14a52759cb628a6a1c9b0eabfbd21ae3388fe6a6103ab19" : "bd6c236585c5ba7eb7c3ee5a59a1e134ce4fc676374d97d89ff11c8de103c363";
  const model = madv ? "MiniMax-M3.1-Flash" : "claude-fable-5-2";
  const version = madv ? "0.1.1" : "2.1.325";
  function argv(n: number, expected: Array<string>): void { requireCheck("capture " + n + " argv", same(get(n).argv, expected)); }
  function command(n: number, executable: string, tail: Array<string>): void {
    requireCheck("capture " + n + " command", basename(get(n).argv.at(0)!) === executable && same(get(n).argv.slice(1), tail));
  }
  function hashCapture(n: number): void {
    command(n, mac ? "shasum" : "sha256sum", mac ? new Array("-a", "256", binaryPath) : new Array(binaryPath));
    requireCheck("capture " + n + " binary path and SHA-256 pin", clean(n) && get(n).stdout.trim() === binaryHash + "  " + binaryPath);
  }
  function versionCapture(n: number): void {
    argv(n, new Array(binaryPath, "--version"));
    requireCheck("capture " + n + " version pin", clean(n) && (madv ? get(n).stdout.trim() === "madv-surface 0.1.1" : get(n).stdout.trim().split(/\s+/).at(0) === version));
  }
  function events(n: number): Array<Json> {
    const output = get(n).stdout.trim();
    try {
      const value = JSON.parse(output);
      if (object(value)) return new Array(value);
    } catch { /* A stream has one JSON object per nonblank line. */ }
    try {
      const values = output.split("\n").filter(line => line.trim()).map(line => JSON.parse(line));
      if (values.every(object)) return values;
    } catch { /* Invalid evidence cannot pass a response check. */ }
    check("capture " + n + " structured JSON evidence", false);
    return new Array<Json>();
  }
  let identity = false, auth = false, facts = "", reportedModel = "unavailable";
  const limitations = new Array<string>("No governed session of the real binary ran because production start remains closed; PTY, process-group, termination and timing results are not established.");
  if (madv) {
    hashCapture(1); hashCapture(8); versionCapture(2); versionCapture(9);
    argv(3, new Array(binaryPath, ...registration.auth_readiness_probe.argv));
    auth = check("capture 03 auth parser", clean(3) && adapter.parseMadvAuthReadiness(get(3).stdout, get(3).exit, get(3).signal).ok);
    const input = adapter.encodeUserInput("Reply with your model identifier and nothing else.");
    let repeated = true;
    for (const n of new Array(4, 5, 6)) {
      argv(n, new Array(binaryPath, ...registration.identity_probe.argv, "--model", model));
      requireCheck("capture " + n + " identity stdin", get(n).stdin === input);
      const accepted = check("capture " + n + " identity parser", clean(n) && adapter.parseMadvIdentity(get(n).stdout, model, registration.supported_versions, get(n).exit, get(n).signal).ok);
      repeated = accepted && repeated;
    }
    argv(7, new Array(binaryPath, ...registration.identity_probe.argv.filter((flag: string) => flag !== "--require-model"), "--model", "MiniMax-M3.1-Flash-Preview"));
    requireCheck("capture 07 identity stdin", get(7).stdin === input);
    const retired = events(7), first = retired.at(0), responses = retired.filter(event => event.type === "model_response");
    const resolved = check("capture 07 retired id resolves to current served model", clean(7)
      && first?.type === "system" && first.subtype === "init" && first.surface === surface && first.surface_version === version
      && first.requested_model === "MiniMax-M3.1-Flash-Preview" && first.profile === "minimax" && first.provider === registration.provider && first.endpoint_host === "api.minimax.io"
      && responses.length > 0 && responses.every(event => event.response_model === model && event.response_independence_domain === registration.independence_domain && event.provider === registration.provider && event.profile === "minimax" && event.tls_verified_host === "api.minimax.io" && event.endpoint_host === "api.minimax.io")
      && retired.every(event => event.session_id === first.session_id && !(event.type === "system" && event.subtype !== "init")));
    identity = repeated && resolved;
    const observed = events(4).find(event => event.type === "model_response");
    if (typeof observed?.response_model === "string" && observed.response_model) reportedModel = observed.response_model;
    facts = "Phase 3A design 2.2 clause 1, a documented CLI or API primitive returning the resolved provider and exact model for the actual session: " + (identity ? "met" : "not met")
      + ". Captures 04-06: system/init.surface, surface_version, profile, provider, endpoint_host and requested_model; model_response.response_model, response_independence_domain and tls_verified_host; clean exit. Capture 07 compares actual response_model with MiniMax-M3.1-Flash to distinguish resolution from a retired-id echo; this condition is " + (resolved ? "met" : "not met") + ". "
      + "Clause 2, structured per-session or per-response metadata naming the provider and exact model actually used: " + (identity ? "met" : "not met")
      + ". The same captures' model_response.response_model, provider, response_independence_domain and tls_verified_host support this result. Configuration, requested intent, auth and banners are not passing identity evidence.";
    limitations.push(...registration.limitations);
  } else {
    for (const n of new Array(1, 14)) command(n, "ls", new Array("-l", binaryPath));
    for (const n of new Array(2, 15)) {
      command(n, "realpath", new Array(binaryPath));
      requireCheck("capture " + n + " launcher realpath pin", clean(n) && get(n).stdout.trim() === binaryPath);
    }
    for (const n of new Array(3, 16)) command(n, "file", new Array(binaryPath));
    hashCapture(4); hashCapture(17); versionCapture(5); versionCapture(18);
    argv(6, new Array(binaryPath, "--help")); argv(7, new Array(binaryPath, "auth", "--help"));
    argv(8, new Array(binaryPath, ...registration.auth_readiness_probe.argv));
    auth = check("capture 08 auth parser", clean(8) && probes.parseAuthReadiness(get(8).stdout));
    argv(9, new Array(binaryPath, ...registration.identity_probe.argv));
    argv(10, new Array(binaryPath, ...registration.identity_probe.argv, "--model", model));
    argv(11, new Array(binaryPath, ...registration.identity_probe.argv, "--model", "fable"));
    const print = new Array(binaryPath, "--print", "--output-format", "json", "--no-session-persistence");
    argv(12, new Array(...print, "Reply with the single word ok."));
    argv(13, new Array(...print, "--model", model, "Reply with the single word ok."));
    let safeSession = true;
    const parsed = new Map<number, Array<Json>>();
    for (const n of new Array(9, 10, 11, 12, 13)) {
      const values = events(n); parsed.set(n, values);
      let calls = 0;
      function visit(value: unknown): void {
        if (Array.isArray(value)) { value.forEach(visit); return; }
        if (!object(value)) return;
        if (value.type === "tool_use") calls++;
        Object.values(value).forEach(visit);
      }
      values.forEach(visit); toolCounts.push({ capture: n, tool_calls: calls });
      safeSession = check("capture " + n + " no tool call", calls === 0 && values.length > 0 && clean(n)) && safeSession;
      if (n <= 11) {
        requireCheck("capture " + n + " fixed identity stdin", get(n).stdin === probes.IDENTITY_PROBE_INPUT);
        const inits = values.filter(event => event.type === "system" && event.subtype === "init");
        let allSafe = inits.length > 0;
        for (const event of inits) {
          initFacts.push({ capture: n, permissionMode: event.permissionMode, mcp_servers: event.mcp_servers, plugins: event.plugins, tools: event.tools });
          allSafe = allSafe && event.permissionMode === "dontAsk" && new Array(event.mcp_servers, event.plugins, event.tools).every(value => Array.isArray(value) && value.length === 0);
          requireCheck("capture " + n + " init version pin", event.claude_code_version === version);
        }
        safeSession = check("capture " + n + " init safety fields", allSafe) && safeSession;
      }
    }
    requireCheck("Claude investigation safety conditions", safeSession);
    const observed = parsed.get(10)!.find(event => event.type === "assistant");
    if (typeof observed?.message?.model === "string" && observed.message.model) reportedModel = observed.message.model;
    function served(n: number): boolean {
      const values = parsed.get(n)!;
      const assistants = values.filter(event => event.type === "assistant");
      const results = values.filter(event => event.type === "result");
      return check("capture " + n + " actual canonical response model", clean(n) && assistants.length > 0
        && assistants.every(event => event.message?.model === model)
        && results.length > 0 && results.every(event => {
          const usage = object(event.modelUsage) ? Reflect.get(event.modelUsage, model) : undefined;
          return event.is_error === false && object(usage) && usage.canonicalModel === model && usage.provider === "firstParty" && typeof usage.outputTokens === "number" && usage.outputTokens > 0;
        }));
    }
    const canonical = served(10), alias = served(11);
    identity = canonical && alias && safeSession;
    facts = "Phase 3A design 2.2 clause 1, a documented CLI or API primitive returning the resolved provider and exact model for the actual session: not established. Captures 06-07 document formats and auth, not a same-session resolved-identity query. "
      + "Clause 2, structured per-session or per-response metadata naming the provider and exact model actually used: " + (identity ? "met" : "not met")
      + ". Captures 10 and 11: assistant.message.model; result.modelUsage for claude-fable-5-2, canonicalModel, provider firstParty and positive outputTokens. Capture 11 requests alias fable while those response fields must name claude-fable-5-2. Captures 09-11 init permissionMode, mcp_servers, plugins and tools and captures 09-13 structured tool-call counts must satisfy the safety conditions. No init.model, configured model, registration, flag echo, auth field or prose supplies passing identity evidence.";
    if (!get(3).stdout.includes("Mach-O")) limitations.push("binary_sha256 pins the shell launcher, not the program it starts; capture 03 does not identify R as a Mach-O executable.");
    const governedHash = mac ? "84590fefe6338be9087f5814b61f9a54c5f21524163a4c127cb5a808e31009f2" : "0dc4f4a9a165fc60746d7ae8489712e5fc352f1e7ad4eb22e7141bd0812eb0cf";
    limitations.push("DEC-20261115-02 A8 item 4 pins the governed copy " + prefix + "/builds/claude-code-governed-2.1.325/claude with SHA-256 " + governedHash + ", checked there against A8 item " + (mac ? "1" : "2") + ". Captures pin the launcher; this script does not read or execute either binary.");
    limitations.push("Emitted provider firstParty is response evidence; registration metadata anthropic is separately copied and supplies no identity proof. This dated record authorizes no live execution and does not replace M1 re-attestation.");
  }
  for (let n = 1; n <= count; n++) {
    if (!(madv ? new Array(4, 5, 6, 7) : new Array(9, 10, 11)).includes(n)) requireCheck("capture " + n + " empty stdin", get(n).stdin === "");
    if (!(madv ? new Array(3, 4, 5, 6, 7) : new Array(8, 9, 10, 11, 12, 13)).includes(n)) requireCheck("capture " + n + " successful local primitive", clean(n));
  }
  requireCheck("registered version pin", same(registration.supported_versions, new Array(version)));
  function local(command: string, tail: Array<string>): string {
    const result = Bun.spawnSync(new Array(command, ...tail), { stdout: "pipe", stderr: "pipe" });
    if (result.exitCode !== 0) reject("host fact command failed");
    return result.stdout.toString().trim();
  }
  let host: Json;
  if (mac) host = { arch: arch(), macos_version: local("/usr/bin/sw_vers", new Array("-productVersion")), macos_build: local("/usr/bin/sw_vers", new Array("-buildVersion")), bun_version: Bun.version, bun_path: runtimePath, bun_sha256: runtimeHash, term, shell };
  else {
    const osRelease = readFileSync("/etc/os-release", "utf8");
    const osFields = new Map<string, string>();
    for (const line of osRelease.split("\n").filter(line => line.includes("="))) {
      const equals = line.indexOf("=");
      osFields.set(line.slice(0, equals), line.slice(equals + 1).replace(/^"|"$/g, ""));
    }
    host = { os_name: osFields.get("NAME"), os_version: osFields.get("VERSION_ID"), kernel_release: release(), reported_model: reportedModel, adapter_registration: surface };
  }
  const overall = identity && auth;
  const evaluated = new Date();
  const record = protocol.parseCapabilityRecord({
    surface: registration.surface, provider: registration.provider, independence_domain: registration.independence_domain, organization_id: registration.organization_id,
    requested_model: model, cli_version: version, binary_path: binaryPath, binary_sha256: binaryHash,
    evaluated_at: evaluated.toISOString(), expires_at: new Date(evaluated.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(), host,
    identity_attestation: { primitive: new Array(binaryPath, ...registration.identity_probe.argv, "--model", model).join(" "), result: identity ? "pass" : "fail", sanitized_facts: facts },
    auth_readiness: { primitive: new Array(binaryPath, ...registration.auth_readiness_probe.argv).join(" "), result: auth ? "pass" : "fail" },
    pty: { result: "fail", observed_ms: {} }, overall: overall ? "pass" : "fail",
    role_eligibility: overall ? madv ? new Array("independent-reviewer") : new Array("builder", "independent-reviewer") : new Array(),
    independent_review_eligible: overall, limitations,
    redaction_rules_applied: new Array("email-addresses", "json-account-identifiers", "token-patterns"),
  });
  safe(JSON.stringify(record), "record");
  const storageRoot = storage.proposeStorageRoot({}, root, root);
  const filename = protocol.capabilityRecordFilename(record);
  for (const item of checks) console.log(JSON.stringify(item));
  for (const item of initFacts) console.log("system/init " + JSON.stringify(item));
  for (const item of toolCounts) console.log("tool calls " + JSON.stringify(item));
  console.log("record " + JSON.stringify(record));
  console.log("default storage root " + storageRoot);
  console.log("record filename " + filename);
  if (write) {
    const file = storage.writeCapabilityRecord(storageRoot, root, root, record);
    console.log("stored path " + file);
    console.log("stored SHA-256 " + hash(readFileSync(file)));
  }
}
main().catch(error => {
  console.error("REFUSED " + (error instanceof Error ? error.message : "validation failure"));
  process.exitCode = 1;
});
