M0 Phase 1 record-script fix report

1. Scope and settings
Second signed resume b110bb1d5e00680befe239a24b21cd96f3a1948f7f9a4477f55f9057f4f77fb2. Before any command, the harness showed sandbox workspace-write and approval on-request; these were reported and unchanged. This task changes only the two record-script behaviors ruled by Addendum 4 B2. It makes no commit and does not start Phase 2.

2. Call discipline
Addendum 3 B4 applies from this resume. No code was stored or loaded from a harness store, no code string was executed, and no dynamic code constructor was used. Every nested tool call was written directly in its exec input. No barred tool or MCP server was used, and no exec input contained one of the six names of Addendum 2 B4. Scratch scripts were ordinary files in the session's existing single disposable directory.

3. Prompt and authority checks
All seven lines of prompt/SHA256.txt passed; prompt held exactly the builder prompt, four addenda, two signed resume messages and SHA256.txt. Addenda 3 and 4 were read in full, both ISSUED and signed Michael Daley, 2026-11-16.
Addendum 3 SHA-256 24f76dbb631d6058e81ccff93d3c9fecb11521b5a876c687ec0da1ee0f9e0a23.
Addendum 4 SHA-256 45131b839e0365a83462b3ee297007789ffe11cefc1a545a96784b85a1012bf4.
logs/262-resume-2-prompt-manifest.log; SHA-256 aebc9e6604b2ac0d055bd198fc545c0a5f41426ae55f4a843db31cbc7571f593
logs/263-resume-2-prompt-files.log; SHA-256 9ec5f6b229fd04193ef71901c9ac24102d4423e1f72c0e1133f58de65e3c23cb
logs/264-resume-2-addendum-3.log; SHA-256 a996891e54946e59018e0c774410330d2857d022f9c075fdcd2ebb4aafe3e6b2
logs/265-resume-2-addendum-4.log; SHA-256 0aa5b6c6344536c49a50210521bcb351bf7520297ab6070fbbe6c8477e765dd7
logs/266-resume-2-authority-hashes.log; SHA-256 e1f93103b528577af2215c0ba12e1c014a81bd395d72e136f17c2b8691e0ea4e

4. State and runtime checks
Governed build output, verbatim:
WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0
logs/267-resume-2-governed-version.log; SHA-256 3cdc3c172db84d1f1348a7f5fbf687c1bb202fab3e48faad38787ab1c905492b
HEAD 7f94c272a4fd7fc3b4ab1d18920b80ac95c677d3 on build/3b-m0-r1. Status and stash were empty. pr initially held exactly m0-phase1-halt-1-report.md and m0-phase1-report.md, with SHA-256 4fef47b6a4f9c26e142347967f4e01b80758162e4fd0f6e6f2e3f79a36f44be4 and d7149838cd7efc497c5010ca9bd2edbe020faeb6ade2f2e3bc25c9c1bd28fa84. record held exactly m0-record.ts, original SHA-256 de3ea7cc7ded52c5ab14eed40280d420ce375e9c56b12cfd838cf2010a5550dd.
logs/268-resume-2-head.log; SHA-256 974b500e43b0c1f2002a63d2fd46f216fce97f62e32a9f49a64f77985e35ad7b
logs/269-resume-2-branch.log; SHA-256 59784e0e9dccd423394e9625e7099f2483e7e3788c6f143b496e5618eab0038d
logs/270-resume-2-status.log; SHA-256 269a6cd8f1ccc51e4122838f0858f2e1dba4eb1d15895f2c0c1956e983b493e2
logs/271-resume-2-stash.log; SHA-256 f6d193235606118796e7fe8b1db6813139fe0a4d4e90f41c946cdd03dc12db4a
logs/272-resume-2-pr-files.log; SHA-256 a732506c3b8936447093cd345d413861081909c0bb6c036218ef1d0daf48d2c3
logs/273-resume-2-pr-hashes.log; SHA-256 1393c0328d1da1edc9b261d3d83905f3d4b3d9f9e2b7ee1281783e258d021e6d
logs/274-resume-2-record-files.log; SHA-256 c2c5481960047e84cf6191fbbb6d327be34100ba5ec21dccf96496bba468bcc4
logs/275-resume-2-record-hash.log; SHA-256 2a65eeceec94db9c355abf3aeb92bc326938e82c6a1585523a1bd5af1bf08ee7
Pinned runtime passed; full output:
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
logs/276-resume-2-runtime.log; SHA-256 84293c28e2842fd803ea357b5f29f81f9588e0425446c8bd00c01781cdf5c993

5. Original, two changes, complete diff and complete changed script
Original copy: /private/tmp/m0-r1.devPEJ/m0-record-resume-2-original.ts
Original SHA-256 de3ea7cc7ded52c5ab14eed40280d420ce375e9c56b12cfd838cf2010a5550dd
logs/277-resume-2-save-original.log; SHA-256 5e9fd58cdabc5fc9b093c36664e649e8fdeca041a887de05d9dbca8dd754149a
Changed script: /Users/michaeldaley/builds/m0-r1/record/m0-record.ts
Changed SHA-256 07e578dc1e416269854f4199b6dc6a445e4b941be3a39157fd364f1d0fedac56
The first change uses a non-global JavaScript pattern with a word boundary, sk-, and eight or more allowed characters. JavaScript word characters supply ASCII letters, digits and underscore; the alternatives add period and hyphen, giving the exact ruled character set without a stateful global lastIndex. The second change leaves identity verdict logic intact and changes only MiniMax sanitized_facts: clause 1 is not established, and clause 2 rests on the named model_response fields of captures 04-07. Claude facts are unchanged.
Complete diff, verbatim; diff exit 1 means differences were found:
--- /private/tmp/m0-r1.devPEJ/m0-record-resume-2-original.ts	2026-11-16 17:59:32
+++ record/m0-record.ts	2026-11-16 18:00:02
@@ -11,11 +11,11 @@
 const initFacts = new Array<Json>();
 const toolCounts = new Array<Json>();
 const hash = (bytes: string | Uint8Array) => new Bun.CryptoHasher("sha256").update(bytes).digest("hex");
-const markers = new Array("sk-cp-", "sk-ant-");
+const keyPattern = /\bsk-(?:\w|\.|-){8,}/;
 function reject(reason: string): never { throw new Error(reason); }
 function safe(bytes: string | Uint8Array, label: string): void {
   const text = typeof bytes === "string" ? bytes : new TextDecoder().decode(bytes);
-  if (markers.some(marker => text.includes(marker))) reject("forbidden marker: " + label);
+  if (keyPattern.test(text)) reject("forbidden marker: " + label);
 }
 function check(name: string, pass: boolean): boolean { checks.push({ check: name, pass }); return pass; }
 function requireCheck(name: string, pass: boolean): void { if (!check(name, pass)) reject(name); }
@@ -184,10 +184,9 @@
     identity = repeated && resolved;
     const observed = events(4).find(event => event.type === "model_response");
     if (typeof observed?.response_model === "string" && observed.response_model) reportedModel = observed.response_model;
-    facts = "Phase 3A design 2.2 clause 1, a documented CLI or API primitive returning the resolved provider and exact model for the actual session: " + (identity ? "met" : "not met")
-      + ". Captures 04-06: system/init.surface, surface_version, profile, provider, endpoint_host and requested_model; model_response.response_model, response_independence_domain and tls_verified_host; clean exit. Capture 07 compares actual response_model with MiniMax-M3.1-Flash to distinguish resolution from a retired-id echo; this condition is " + (resolved ? "met" : "not met") + ". "
-      + "Clause 2, structured per-session or per-response metadata naming the provider and exact model actually used: " + (identity ? "met" : "not met")
-      + ". The same captures' model_response.response_model, provider, response_independence_domain and tls_verified_host support this result. Configuration, requested intent, auth and banners are not passing identity evidence.";
+    facts = "Phase 3A design 2.2 clause 1, a documented CLI or API primitive returning the resolved provider and exact model for the actual session: not established. The probe is a process apart from the governed session. The result rests on clause 2, structured per-response metadata naming the provider and exact model actually used: " + (identity ? "met" : "not met")
+      + ". Captures 04-07: model_response.response_model, provider, profile, endpoint_host, response_independence_domain and tls_verified_host. Captures 04-06 also satisfy the B3 init predicates and clean exit. Capture 07 compares actual response_model with MiniMax-M3.1-Flash to distinguish resolution from a retired-id echo; this condition is " + (resolved ? "met" : "not met")
+      + ". Configuration, requested intent, auth and banners are not passing identity evidence.";
     limitations.push(...registration.limitations);
   } else {
     for (const n of new Array(1, 14)) command(n, "ls", new Array("-l", binaryPath));
logs/279-resume-2-script-diff.log; SHA-256 99edd889cde661e5ccf6e6aa0490bda0777fb5f4733e7d9dc0e0cfe63fc2d769
Complete changed script, verbatim:
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
const keyPattern = /\bsk-(?:\w|\.|-){8,}/;
function reject(reason: string): never { throw new Error(reason); }
function safe(bytes: string | Uint8Array, label: string): void {
  const text = typeof bytes === "string" ? bytes : new TextDecoder().decode(bytes);
  if (keyPattern.test(text)) reject("forbidden marker: " + label);
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
    facts = "Phase 3A design 2.2 clause 1, a documented CLI or API primitive returning the resolved provider and exact model for the actual session: not established. The probe is a process apart from the governed session. The result rests on clause 2, structured per-response metadata naming the provider and exact model actually used: " + (identity ? "met" : "not met")
      + ". Captures 04-07: model_response.response_model, provider, profile, endpoint_host, response_independence_domain and tls_verified_host. Captures 04-06 also satisfy the B3 init predicates and clean exit. Capture 07 compares actual response_model with MiniMax-M3.1-Flash to distinguish resolution from a retired-id echo; this condition is " + (resolved ? "met" : "not met")
      + ". Configuration, requested intent, auth and banners are not passing identity evidence.";
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

logs/280-resume-2-changed-script.log; SHA-256 7e8bdb18448a1fea300fe83d38947f9a86cd46d505df1f8d8a624e34eff0d31c
logs/281-resume-2-changed-script-hash.log; SHA-256 c62a48a4146b703e5f9392c75fd79ecc7add2d7c5617dd6d48f056acff2db4d7

6. Synthetic runs
Every run omitted --write and used --clone /Users/michaeldaley/builds/m0-r1/tui at the unchanged Phase 1 head. The non-work-tree case scopes GIT_DIR to an empty scratch directory, causing the script's Git work-tree query to fail while retaining that required clone argument. This changes no clone data or persistent environment.
All 35 MiniMax init events in the synthetic folders carry the exact 169-byte billing_guard text. Text SHA-256 a7597387d81419de8c2d89f84615cc8115a7f41eaa0b50983f5e7823f5e7451c. Preparation and byte-for-byte verification: logs/282-resume-2-prepare-fixtures.log; SHA-256 fb50659d12b32e73fbc12d0e22378fab3e1ebd091794d4e15932962406ba7c77.
Billing text:
The enforced sk-cp- key prefix keeps every request on an M Plan key; plan and pay-as-you-go keys share the host and only a pay-as-you-go key charges the account balance.
The original bare six-character prefix case now passes under the amended refusal rule; the added full-pattern case is refused. The added embedded-word case passes. Every case's exit, record verdict and MiniMax clause statement was validated. Six records were printed, including two intended failed identity records; eight refusals printed no record. No unexpected failure or self-fix occurred.

Run 1: madv-pass
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-fixtures/madv-pass
Change from passing case: Passing MiniMax captures; exact Addendum 4 A1 billing_guard added to every init.
Expected and observed: schema accepted; identity pass; auth pass; overall pass; exit 0
Wait: logs/283-resume-2-madv-pass-wait.log; SHA-256 0ec2f51a9040b2d62ec5ae74a47a3cda1dad34bd42bf8e298417c4acb47d0e07
Run: logs/284-resume-2-madv-pass.log; SHA-256 c81e3b79d0c5e720bcb899641f97d2804f6abb6b0447d0291a5688ad58ae60d7
Uptime before invocation: 18:05  up 18:36, 2 users, load averages: 0.52 0.90 1.11
Full output:
The complete output is cited by the run log and SHA-256 above under the builder prompt's square-bracket output rule. It was also shown in the session; the log is unchanged and untruncated.

Run 2: madv-echo
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-fixtures/madv-echo
Change from passing case: MiniMax capture 07 echoes the retired id; manifest updated.
Expected and observed: schema accepted; identity fail; auth pass; overall fail; exit 0
Wait: logs/285-resume-2-madv-echo-wait.log; SHA-256 b2c66b03624dccffe29401fd28d9430415028f29ca7f0394ef47e62b9f95dcb7
Run: logs/286-resume-2-madv-echo.log; SHA-256 f080c71cbab4b054435a252911c69936e1134b974ab6478146a85c687f6cdbaa
Uptime before invocation: 18:05  up 18:36, 2 users, load averages: 0.52 0.90 1.11
Full output:
The complete output is cited by the run log and SHA-256 above under the builder prompt's square-bracket output rule. It was also shown in the session; the log is unchanged and untruncated.

Run 3: claude-pass
Surface: claude-code
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-fixtures/claude-pass
Change from passing case: Passing Claude captures unchanged.
Expected and observed: schema accepted; identity pass; auth pass; overall pass; exit 0
Wait: logs/287-resume-2-claude-pass-wait.log; SHA-256 b2c66b03624dccffe29401fd28d9430415028f29ca7f0394ef47e62b9f95dcb7
Run: logs/288-resume-2-claude-pass.log; SHA-256 30d4568a12742f56d0de0b0d5315bc0fd616c3e4387abf9731b4b883cecf1c05
Uptime before invocation: 18:05  up 18:36, 2 users, load averages: 0.52 0.90 1.11
Full output:
The complete output is cited by the run log and SHA-256 above under the builder prompt's square-bracket output rule. It was also shown in the session; the log is unchanged and untruncated.

Run 4: claude-wrong-model
Surface: claude-code
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-fixtures/claude-wrong-model
Change from passing case: Claude capture 10 serves another model; manifest updated.
Expected and observed: schema accepted; identity fail; auth pass; overall fail; exit 0
Wait: logs/289-resume-2-claude-wrong-model-wait.log; SHA-256 b2c66b03624dccffe29401fd28d9430415028f29ca7f0394ef47e62b9f95dcb7
Run: logs/290-resume-2-claude-wrong-model.log; SHA-256 83faeb5cfb884beae96d34d236c89a030fdf674d1199f9ac4e23355e3fccb2e8
Uptime before invocation: 18:05  up 18:36, 2 users, load averages: 0.52 0.90 1.11
Full output:
The complete output is cited by the run log and SHA-256 above under the builder prompt's square-bracket output rule. It was also shown in the session; the log is unchanged and untruncated.

Run 5: key-set
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-fixtures/madv-pass
Change from passing case: Passing MiniMax folder; invocation sets MINIMAX_API_KEY to a synthetic presence canary.
Expected and observed: REFUSED MINIMAX_API_KEY is set; exit 1
Wait: logs/291-resume-2-key-set-wait.log; SHA-256 b2c66b03624dccffe29401fd28d9430415028f29ca7f0394ef47e62b9f95dcb7
Run: logs/292-resume-2-key-set.log; SHA-256 34432494ecfbde1ef19f34216b089fc11739c383ef84469257da3a7d3fb8134e
Uptime before invocation: 18:05  up 18:36, 2 users, load averages: 0.47 0.88 1.11
Full output:
REFUSED MINIMAX_API_KEY is set

Run 6: storage-set
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-fixtures/madv-pass
Change from passing case: Passing MiniMax folder; invocation sets MADV_STORAGE_DIR to an unused scratch path.
Expected and observed: REFUSED MADV_STORAGE_DIR is set; exit 1
Wait: logs/293-resume-2-storage-set-wait.log; SHA-256 a8d96da99cc17397fee08c0380680f102526c14769c3f79c4067a2951c155808
Run: logs/294-resume-2-storage-set.log; SHA-256 d93ae3353418f59a090e4a40b401471eb4b6ed2128c7bdd0aaffc5b13f835926
Uptime before invocation: 18:05  up 18:36, 2 users, load averages: 0.47 0.88 1.11
Full output:
REFUSED MADV_STORAGE_DIR is set

Run 7: missing-file
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-fixtures/missing-file
Change from passing case: Remove capture 04 stdout; retain manifest entry.
Expected and observed: REFUSED missing or unsafe file: madv-surface/04.stdout; exit 1
Wait: logs/295-resume-2-missing-file-wait.log; SHA-256 a8d96da99cc17397fee08c0380680f102526c14769c3f79c4067a2951c155808
Run: logs/296-resume-2-missing-file.log; SHA-256 3f1a7aa54ea45b98956d78944dd471d20aa89f89d516d9e56e481bd4b3059bab
Uptime before invocation: 18:05  up 18:36, 2 users, load averages: 0.47 0.88 1.11
Full output:
REFUSED missing or unsafe file: madv-surface/04.stdout

Run 8: uncovered-file
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-fixtures/uncovered-file
Change from passing case: Remove capture 04 stdout manifest entry; retain file.
Expected and observed: REFUSED file not covered by manifest: madv-surface/04.stdout; exit 1
Wait: logs/297-resume-2-uncovered-file-wait.log; SHA-256 a8d96da99cc17397fee08c0380680f102526c14769c3f79c4067a2951c155808
Run: logs/298-resume-2-uncovered-file.log; SHA-256 2cc470802a3b11be450b8879f041988cf80f715d268fb1056441010acf2c511d
Uptime before invocation: 18:05  up 18:36, 2 users, load averages: 0.47 0.88 1.11
Full output:
REFUSED file not covered by manifest: madv-surface/04.stdout

Run 9: changed-file
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-fixtures/changed-file
Change from passing case: Append one newline to capture 04 stdout after manifest creation.
Expected and observed: REFUSED manifest hash mismatch: madv-surface/04.stdout; exit 1
Wait: logs/299-resume-2-changed-file-wait.log; SHA-256 a8d96da99cc17397fee08c0380680f102526c14769c3f79c4067a2951c155808
Run: logs/300-resume-2-changed-file.log; SHA-256 a26aed0ccdcd80c0e3a60863bbad5e4c1936e1d8b845947ca9bc36e03589b53f
Uptime before invocation: 18:05  up 18:36, 2 users, load averages: 0.47 0.88 1.11
Full output:
REFUSED manifest hash mismatch: madv-surface/04.stdout

Run 10: marker-file
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-fixtures/marker-file
Change from passing case: Capture 03 stderr contains the original bare six-character prefix. Addendum 4 makes it allowable; manifest updated.
Expected and observed: schema accepted; identity pass; auth pass; overall pass; exit 0
Wait: logs/301-resume-2-marker-file-wait.log; SHA-256 a8d96da99cc17397fee08c0380680f102526c14769c3f79c4067a2951c155808
Run: logs/302-resume-2-marker-file.log; SHA-256 5c3bce12599ee30059b12fa2d34a4c5368c9bd7f664295fac3f6d8559d88ea86
Uptime before invocation: 18:05  up 18:36, 2 users, load averages: 0.47 0.88 1.11
Full output:
The complete output is cited by the run log and SHA-256 above under the builder prompt's square-bracket output rule. It was also shown in the session; the log is unchanged and untruncated.

Run 11: non-work-tree
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-fixtures/madv-pass
Change from passing case: Passing MiniMax folder and fixed --clone; invocation scopes GIT_DIR to the empty not-a-repository directory so the Git work-tree query fails.
Expected and observed: REFUSED ROOT is not a git work tree; exit 1
Wait: logs/303-resume-2-non-work-tree-wait.log; SHA-256 a8d96da99cc17397fee08c0380680f102526c14769c3f79c4067a2951c155808
Run: logs/304-resume-2-non-work-tree.log; SHA-256 c18ad07b0a187ef97040b5ed279d6ff45ae31c7d6bf36efc1370c808c33b58a3
Uptime before invocation: 18:05  up 18:36, 2 users, load averages: 0.44 0.87 1.10
Full output:
REFUSED ROOT is not a git work tree

Run 12: missing-manifest
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-fixtures/missing-manifest
Change from passing case: Remove MANIFEST.sha256.
Expected and observed: REFUSED missing MANIFEST.sha256; exit 1
Wait: logs/305-resume-2-missing-manifest-wait.log; SHA-256 9efa1ee71605ef6dcee8deb501758ef30ea59a9431bd3a09d8aa31f98795f17d
Run: logs/306-resume-2-missing-manifest.log; SHA-256 9294dfd6a939a4e22485a0bcfa699fc2baadefb9d55454237759c3540f625edc
Uptime before invocation: 18:05  up 18:36, 2 users, load averages: 0.44 0.87 1.10
Full output:
REFUSED missing MANIFEST.sha256

Run 13: synthetic-key-pattern
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-fixtures/synthetic-key-pattern
Change from passing case: Capture 03 stderr contains one plainly synthetic full key-pattern string; manifest updated.
Expected and observed: REFUSED forbidden marker: madv-surface/03.stderr; exit 1
Wait: logs/307-resume-2-synthetic-key-pattern-wait.log; SHA-256 9efa1ee71605ef6dcee8deb501758ef30ea59a9431bd3a09d8aa31f98795f17d
Run: logs/308-resume-2-synthetic-key-pattern.log; SHA-256 254f58b854c3abda173c98ece9fa0c77e16b0bcd3829edd1d3dca8f905d46352
Uptime before invocation: 18:06  up 18:37, 2 users, load averages: 0.72 0.90 1.10
Full output:
REFUSED forbidden marker: madv-surface/03.stderr

Run 14: embedded-sk-word
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-fixtures/embedded-sk-word
Change from passing case: Capture 03 stderr contains task-management-options, with no key and no word boundary before sk-; manifest updated.
Expected and observed: schema accepted; identity pass; auth pass; overall pass; exit 0
Wait: logs/309-resume-2-embedded-MASKED_KEY_SHAPED_STRING; SHA-256 87af6760f9a1a05933b53c1ad18356f5f7e84f8b39fb9fac27d0a7e45c0e9705
Run: logs/310-resume-2-embedded-MASKED_KEY_SHAPED_STRING; SHA-256 7713f81a3f13bd0255df070d14a80502bd279504530d831da03023e4c5611d20
Uptime before invocation: 18:06  up 18:37, 2 users, load averages: 0.72 0.90 1.10
Full output:
The complete output is cited by the run log and SHA-256 above under the builder prompt's square-bracket output rule. It was also shown in the session; the log is unchanged and untruncated.

7. Final preservation and boundaries
logs/311-resume-2-unchanged-clone-proof.log; SHA-256 32a75bcd2b2898b7feab6858f36105ba52f092c362e1b12befcc3c2231d31bf4
The clone remains clean with no stash at 7f94c272a4fd7fc3b4ab1d18920b80ac95c677d3, branch build/3b-m0-r1. Nothing under tui was changed and no commit was made. The prior two reports retain their original hashes. The build log remains SHA-256 5a3d38c0df555f26f969f79b8029b9750af5449ea9163be7ec8486d793f460b3.
No surface, live call, real key or capability-store write occurred. No network call occurred. No Linux run occurred. Phase 2 remains unopened.

Command evidence and SHA-256 index
All logs start with their command and uptime and end with their exit status. Hashes were gathered using shasum -a 256 in logs/312-resume-2-log-hashes.log and verified when this report was assembled. Full output remains in the original logs; no log was truncated, compressed, encoded or overwritten.
logs/262-resume-2-prompt-manifest.log | 17:57  2 users, load averages: 1.64 1.38 1.34 | exit 0 | SHA-256 aebc9e6604b2ac0d055bd198fc545c0a5f41426ae55f4a843db31cbc7571f593
logs/263-resume-2-prompt-files.log | 17:57  2 users, load averages: 1.57 1.37 1.34 | exit 0 | SHA-256 9ec5f6b229fd04193ef71901c9ac24102d4423e1f72c0e1133f58de65e3c23cb
logs/264-resume-2-addendum-3.log | 17:57  2 users, load averages: 1.57 1.37 1.34 | exit 0 | SHA-256 a996891e54946e59018e0c774410330d2857d022f9c075fdcd2ebb4aafe3e6b2
logs/265-resume-2-addendum-4.log | 17:57  2 users, load averages: 1.57 1.37 1.34 | exit 0 | SHA-256 0aa5b6c6344536c49a50210521bcb351bf7520297ab6070fbbe6c8477e765dd7
logs/266-resume-2-authority-hashes.log | 17:58  2 users, load averages: 1.37 1.34 1.33 | exit 0 | SHA-256 e1f93103b528577af2215c0ba12e1c014a81bd395d72e136f17c2b8691e0ea4e
logs/267-resume-2-governed-version.log | 17:58  2 users, load averages: 1.37 1.34 1.33 | exit 0 | SHA-256 3cdc3c172db84d1f1348a7f5fbf687c1bb202fab3e48faad38787ab1c905492b
logs/268-resume-2-head.log | 17:58  2 users, load averages: 1.37 1.34 1.33 | exit 0 | SHA-256 974b500e43b0c1f2002a63d2fd46f216fce97f62e32a9f49a64f77985e35ad7b
logs/269-resume-2-branch.log | 17:58  2 users, load averages: 1.37 1.34 1.33 | exit 0 | SHA-256 59784e0e9dccd423394e9625e7099f2483e7e3788c6f143b496e5618eab0038d
logs/270-resume-2-status.log | 17:58  2 users, load averages: 1.37 1.34 1.33 | exit 0 | SHA-256 269a6cd8f1ccc51e4122838f0858f2e1dba4eb1d15895f2c0c1956e983b493e2
logs/271-resume-2-stash.log | 17:58  2 users, load averages: 1.37 1.34 1.33 | exit 0 | SHA-256 f6d193235606118796e7fe8b1db6813139fe0a4d4e90f41c946cdd03dc12db4a
logs/272-resume-2-pr-files.log | 17:58  2 users, load averages: 1.66 1.40 1.35 | exit 0 | SHA-256 a732506c3b8936447093cd345d413861081909c0bb6c036218ef1d0daf48d2c3
logs/273-resume-2-pr-hashes.log | 17:58  2 users, load averages: 1.66 1.40 1.35 | exit 0 | SHA-256 1393c0328d1da1edc9b261d3d83905f3d4b3d9f9e2b7ee1281783e258d021e6d
logs/274-resume-2-record-files.log | 17:58  2 users, load averages: 1.66 1.40 1.35 | exit 0 | SHA-256 c2c5481960047e84cf6191fbbb6d327be34100ba5ec21dccf96496bba468bcc4
logs/275-resume-2-record-hash.log | 17:58  2 users, load averages: 1.66 1.40 1.35 | exit 0 | SHA-256 2a65eeceec94db9c355abf3aeb92bc326938e82c6a1585523a1bd5af1bf08ee7
logs/276-resume-2-runtime.log | 17:58  up 18:29, 2 users, load averages: 1.26 1.33 1.32 | exit 0 | SHA-256 84293c28e2842fd803ea357b5f29f81f9588e0425446c8bd00c01781cdf5c993
logs/277-resume-2-save-original.log | 17:59  2 users, load averages: 0.96 1.23 1.28 | exit 0 | SHA-256 5e9fd58cdabc5fc9b093c36664e649e8fdeca041a887de05d9dbca8dd754149a
logs/278-resume-2-script-and-pattern.log | 17:59  2 users, load averages: 0.96 1.23 1.28 | exit 0 | SHA-256 cd247306a0f09e67e80d4a63a972cf8d47ab6bf6ec70009c29ee7b8c1e23cc52
logs/279-resume-2-script-diff.log | 18:00  2 users, load averages: 0.90 1.19 1.27 | exit 1 | SHA-256 99edd889cde661e5ccf6e6aa0490bda0777fb5f4733e7d9dc0e0cfe63fc2d769
logs/280-resume-2-changed-script.log | 18:00  2 users, load averages: 0.90 1.19 1.27 | exit 0 | SHA-256 7e8bdb18448a1fea300fe83d38947f9a86cd46d505df1f8d8a624e34eff0d31c
logs/281-resume-2-changed-script-hash.log | 18:00  2 users, load averages: 0.90 1.19 1.27 | exit 0 | SHA-256 c62a48a4146b703e5f9392c75fd79ecc7add2d7c5617dd6d48f056acff2db4d7
logs/282-resume-2-prepare-fixtures.log | 18:02  up 18:33, 2 users, load averages: 1.28 1.23 1.26 | exit 0 | SHA-256 fb50659d12b32e73fbc12d0e22378fab3e1ebd091794d4e15932962406ba7c77
logs/283-resume-2-madv-pass-wait.log | 18:04  2 users, load averages: 0.84 1.08 1.20 | exit 0 | SHA-256 0ec2f51a9040b2d62ec5ae74a47a3cda1dad34bd42bf8e298417c4acb47d0e07
logs/284-resume-2-madv-pass.log | 18:05  up 18:36, 2 users, load averages: 0.52 0.90 1.11 | exit 0 | SHA-256 c81e3b79d0c5e720bcb899641f97d2804f6abb6b0447d0291a5688ad58ae60d7
logs/285-resume-2-madv-echo-wait.log | 18:05  2 users, load averages: 0.52 0.90 1.11 | exit 0 | SHA-256 b2c66b03624dccffe29401fd28d9430415028f29ca7f0394ef47e62b9f95dcb7
logs/286-resume-2-madv-echo.log | 18:05  up 18:36, 2 users, load averages: 0.52 0.90 1.11 | exit 0 | SHA-256 f080c71cbab4b054435a252911c69936e1134b974ab6478146a85c687f6cdbaa
logs/287-resume-2-claude-pass-wait.log | 18:05  2 users, load averages: 0.52 0.90 1.11 | exit 0 | SHA-256 b2c66b03624dccffe29401fd28d9430415028f29ca7f0394ef47e62b9f95dcb7
logs/288-resume-2-claude-pass.log | 18:05  up 18:36, 2 users, load averages: 0.52 0.90 1.11 | exit 0 | SHA-256 30d4568a12742f56d0de0b0d5315bc0fd616c3e4387abf9731b4b883cecf1c05
logs/289-resume-2-claude-wrong-model-wait.log | 18:05  2 users, load averages: 0.52 0.90 1.11 | exit 0 | SHA-256 b2c66b03624dccffe29401fd28d9430415028f29ca7f0394ef47e62b9f95dcb7
logs/290-resume-2-claude-wrong-model.log | 18:05  up 18:36, 2 users, load averages: 0.52 0.90 1.11 | exit 0 | SHA-256 83faeb5cfb884beae96d34d236c89a030fdf674d1199f9ac4e23355e3fccb2e8
logs/291-resume-2-key-set-wait.log | 18:05  2 users, load averages: 0.52 0.90 1.11 | exit 0 | SHA-256 b2c66b03624dccffe29401fd28d9430415028f29ca7f0394ef47e62b9f95dcb7
logs/292-resume-2-key-set.log | 18:05  up 18:36, 2 users, load averages: 0.47 0.88 1.11 | exit 1 | SHA-256 34432494ecfbde1ef19f34216b089fc11739c383ef84469257da3a7d3fb8134e
logs/293-resume-2-storage-set-wait.log | 18:05  2 users, load averages: 0.47 0.88 1.11 | exit 0 | SHA-256 a8d96da99cc17397fee08c0380680f102526c14769c3f79c4067a2951c155808
logs/294-resume-2-storage-set.log | 18:05  up 18:36, 2 users, load averages: 0.47 0.88 1.11 | exit 1 | SHA-256 d93ae3353418f59a090e4a40b401471eb4b6ed2128c7bdd0aaffc5b13f835926
logs/295-resume-2-missing-file-wait.log | 18:05  2 users, load averages: 0.47 0.88 1.11 | exit 0 | SHA-256 a8d96da99cc17397fee08c0380680f102526c14769c3f79c4067a2951c155808
logs/296-resume-2-missing-file.log | 18:05  up 18:36, 2 users, load averages: 0.47 0.88 1.11 | exit 1 | SHA-256 3f1a7aa54ea45b98956d78944dd471d20aa89f89d516d9e56e481bd4b3059bab
logs/297-resume-2-uncovered-file-wait.log | 18:05  2 users, load averages: 0.47 0.88 1.11 | exit 0 | SHA-256 a8d96da99cc17397fee08c0380680f102526c14769c3f79c4067a2951c155808
logs/298-resume-2-uncovered-file.log | 18:05  up 18:36, 2 users, load averages: 0.47 0.88 1.11 | exit 1 | SHA-256 2cc470802a3b11be450b8879f041988cf80f715d268fb1056441010acf2c511d
logs/299-resume-2-changed-file-wait.log | 18:05  2 users, load averages: 0.47 0.88 1.11 | exit 0 | SHA-256 a8d96da99cc17397fee08c0380680f102526c14769c3f79c4067a2951c155808
logs/300-resume-2-changed-file.log | 18:05  up 18:36, 2 users, load averages: 0.47 0.88 1.11 | exit 1 | SHA-256 a26aed0ccdcd80c0e3a60863bbad5e4c1936e1d8b845947ca9bc36e03589b53f
logs/301-resume-2-marker-file-wait.log | 18:05  2 users, load averages: 0.47 0.88 1.11 | exit 0 | SHA-256 a8d96da99cc17397fee08c0380680f102526c14769c3f79c4067a2951c155808
logs/302-resume-2-marker-file.log | 18:05  up 18:36, 2 users, load averages: 0.47 0.88 1.11 | exit 0 | SHA-256 5c3bce12599ee30059b12fa2d34a4c5368c9bd7f664295fac3f6d8559d88ea86
logs/303-resume-2-non-work-tree-wait.log | 18:05  2 users, load averages: 0.47 0.88 1.11 | exit 0 | SHA-256 a8d96da99cc17397fee08c0380680f102526c14769c3f79c4067a2951c155808
logs/304-resume-2-non-work-tree.log | 18:05  up 18:36, 2 users, load averages: 0.44 0.87 1.10 | exit 1 | SHA-256 c18ad07b0a187ef97040b5ed279d6ff45ae31c7d6bf36efc1370c808c33b58a3
logs/305-resume-2-missing-manifest-wait.log | 18:05  2 users, load averages: 0.44 0.87 1.10 | exit 0 | SHA-256 9efa1ee71605ef6dcee8deb501758ef30ea59a9431bd3a09d8aa31f98795f17d
logs/306-resume-2-missing-manifest.log | 18:05  up 18:36, 2 users, load averages: 0.44 0.87 1.10 | exit 1 | SHA-256 9294dfd6a939a4e22485a0bcfa699fc2baadefb9d55454237759c3540f625edc
logs/307-resume-2-synthetic-key-pattern-wait.log | 18:05  2 users, load averages: 0.44 0.87 1.10 | exit 0 | SHA-256 9efa1ee71605ef6dcee8deb501758ef30ea59a9431bd3a09d8aa31f98795f17d
logs/308-resume-2-synthetic-key-pattern.log | 18:06  up 18:37, 2 users, load averages: 0.72 0.90 1.10 | exit 1 | SHA-256 254f58b854c3abda173c98ece9fa0c77e16b0bcd3829edd1d3dca8f905d46352
logs/309-resume-2-embedded-MASKED_KEY_SHAPED_STRING | 18:06  2 users, load averages: 0.72 0.90 1.10 | exit 0 | SHA-256 87af6760f9a1a05933b53c1ad18356f5f7e84f8b39fb9fac27d0a7e45c0e9705
logs/310-resume-2-embedded-MASKED_KEY_SHAPED_STRING | 18:06  up 18:37, 2 users, load averages: 0.72 0.90 1.10 | exit 0 | SHA-256 7713f81a3f13bd0255df070d14a80502bd279504530d831da03023e4c5611d20
logs/311-resume-2-unchanged-clone-proof.log | 18:07  2 users, load averages: 1.29 1.03 1.13 | exit 0 | SHA-256 32a75bcd2b2898b7feab6858f36105ba52f092c362e1b12befcc3c2231d31bf4

Deviations: none.

Single next decision: the Founder's check of the changed record script.
