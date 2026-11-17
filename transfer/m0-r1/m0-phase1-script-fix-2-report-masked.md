M0 Phase 1 record-script fix 2 report

1. Settings, authority and scope
Before any command the harness showed sandbox workspace-write and approval on-request, which were reported. Those settings remain unchanged. This is the third signed resume, SHA-256 9bcbf64fda0bfa4956d1dc5f10cff94a39b5c9e0a1995387a1254abc3002b21c, under Addenda 1-5. It does not start Phase 2. Only Addendum 5 B4 items 1 and 2 were implemented in record/m0-record.ts; no commit was made and nothing under tui was changed.

2. Call discipline
Addendum 3 B4 remains binding. No code was stored in or loaded from a harness store; no code string was executed and no dynamic code constructor was used. Every nested tool call was written directly in its exec input. No barred tool was called and no exec input contained one of the six names of Addendum 2 B4. All scratch files remain in the existing single disposable directory. Every new log filename avoids the prohibited three-character sequence.

3. Prompt and Addendum 5 checks
All nine entries of prompt/SHA256.txt passed. The folder held exactly the builder prompt, five addenda, three signed resume messages and SHA256.txt. Addendum 5 was read in full; Status ISSUED, signed Michael Daley, 2026-11-17. Its SHA-256 matches 666a82b2229272111f4d01b79c6ffba401a53f5236ae50f7f7c6a4b3651cd9ac.
logs/315-resume-3-prompt-manifest.log; SHA-256 0312b8524d9d3a666c757b4bd21bafe124fb955b99ab5b9f2cbce0116489ab81
logs/316-resume-3-prompt-files.log; SHA-256 1f35e5c70c08ae0465d586d8c44060036f6354215c4fd92f92dde819184ff4ae
logs/317-resume-3-addendum-5.log; SHA-256 2d1b5ec8d4cf0f5bb9326937772d6a1ac7d37838266c5a4a20c976ba73a0aa08
logs/318-resume-3-authority-hashes.log; SHA-256 4367e9cdb7ba56c030979d925572f7d0872470e0f9bda08213eadad6e8fa5d31

4. Phase 1 state and runtime
Governed build output, verbatim:
WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0
logs/319-resume-3-governed-version.log; SHA-256 d931c32f1fa854587a6ea20f4ed8300cd6494bea7114852c80f379a912eae250
HEAD 7f94c272a4fd7fc3b4ab1d18920b80ac95c677d3 on build/3b-m0-r1. Status and stash were empty. pr initially held exactly the three required reports, with SHA-256:
m0-phase1-halt-1-report.md 4fef47b6a4f9c26e142347967f4e01b80758162e4fd0f6e6f2e3f79a36f44be4
m0-phase1-report.md d7149838cd7efc497c5010ca9bd2edbe020faeb6ade2f2e3bc25c9c1bd28fa84
m0-phase1-script-fix-report.md 3cbc5e41d6252da93dd4cb20dab3a199bd32cb83b00d1b6a7d26c6a0a6666e51
record held exactly m0-record.ts with accepted SHA-256 07e578dc1e416269854f4199b6dc6a445e4b941be3a39157fd364f1d0fedac56.
logs/320-resume-3-head.log; SHA-256 81cb17e4d79ee52b8c9f39a1b9291fc41fc1214a6034ffb496e1f4bfb018a8ee
logs/321-resume-3-branch.log; SHA-256 bc82a8c83fca789f7552b77d603c41618e1c2860f1a4377233e90f0230786f5b
logs/322-resume-3-status.log; SHA-256 7763c65e9edf9f991934e30bd12bc308ee9552bc0f479b5ce3187c8f9b799e61
logs/323-resume-3-stash.log; SHA-256 bb72454ffc8ba92a6ae0f11158c09819734244723340008e19f9a2792b343dca
logs/324-resume-3-pr-files.log; SHA-256 813aff1bc41dc4659fb1b44ab00bea185856724be363757f49727f684bbfb3c8
logs/325-resume-3-pr-hashes.log; SHA-256 c903868738e84d606704e1d829696f1796d4ed77e61cee46c39523806f230aba
logs/326-resume-3-record-files.log; SHA-256 07d00615b3546469009eec6de07063ebe36349c75e038e593020074596ea0a7c
logs/327-resume-3-record-hash.log; SHA-256 f39929de1265296a223e0a0ff850a818fb89262e9e7c39792896143e0985b733
Pinned runtime passed; complete check output:
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
logs/328-resume-3-runtime.log; SHA-256 2d8af790f84007c15f50d326d00ff7bd8e699e4b0c7a7d437e09f18d3ffd1a7f

5. Original, two changes, full diff and changed script
Original copy: /private/tmp/m0-r1.devPEJ/m0-record-resume-3-original.ts
Original SHA-256 07e578dc1e416269854f4199b6dc6a445e4b941be3a39157fd364f1d0fedac56
logs/329-resume-3-save-original.log; SHA-256 8913fc7364b39dc878d5656860fb837f118071420a5cb45dfd3ae39ab71b11c1
Changed script: /Users/michaeldaley/builds/m0-r1/record/m0-record.ts
Changed SHA-256 b9ba9bdadf0ca0b5e792ad78fc46f9212d763ad7455fb122343756be2e6fb593
Change 1 accepts capture 07's second form only with exit 1, no signal or timeout, empty stderr, one first init and response carrying the existing checked fields, one or more consecutive matched read-only tool-use/result pairs, then the exact one-turn error result and no other event. Only read_file, list_dir and search are allowed; paired names and identifiers match. The required limitation is added only when that form resolves. Exit-zero capture 07 keeps the prior judgment.
Change 2 accepts one JSON array only when every element is an object and retains its order. The existing Claude plugin, permission, MCP, tool and tool-call safety checks remain unchanged.
Complete diff, verbatim; exit 1 means differences were found:
--- /private/tmp/m0-r1.devPEJ/m0-record-resume-3-original.ts	2026-11-16 21:09:17
+++ record/m0-record.ts	2026-11-16 21:09:17
@@ -151,6 +151,7 @@
     try {
       const value = JSON.parse(output);
       if (object(value)) return new Array(value);
+      if (Array.isArray(value) && value.every(object)) return value;
     } catch { /* A stream has one JSON object per nonblank line. */ }
     try {
       const values = output.split("\n").filter(line => line.trim()).map(line => JSON.parse(line));
@@ -176,11 +177,22 @@
     argv(7, new Array(binaryPath, ...registration.identity_probe.argv.filter((flag: string) => flag !== "--require-model"), "--model", "MiniMax-M3.1-Flash-Preview"));
     requireCheck("capture 07 identity stdin", get(7).stdin === input);
     const retired = events(7), first = retired.at(0), responses = retired.filter(event => event.type === "model_response");
-    const resolved = check("capture 07 retired id resolves to current served model", clean(7)
+    const tools = retired.slice(2, -1), last = retired.at(-1);
+    const turnLimit = get(7).exit === 1 && get(7).signal === null && !get(7).timedOut && get(7).stderr === ""
+      && retired.at(1)?.type === "model_response" && tools.length >= 2 && tools.length % 2 === 0
+      && tools.every((event, index) => {
+        if (index % 2 === 0) return event.type === "tool_use" && new Array("read_file", "list_dir", "search").includes(event.name);
+        const use = tools.at(index - 1)!;
+        return event.type === "tool_result" && event.name === use.name
+          && typeof use.tool_use_id === "string" && use.tool_use_id.length > 0 && event.tool_use_id === use.tool_use_id;
+      })
+      && last?.type === "result" && last.subtype === "error_max_turns" && last.is_error === true && last.num_turns === 1;
+    const resolved = check("capture 07 retired id resolves to current served model", (clean(7) || turnLimit)
       && first?.type === "system" && first.subtype === "init" && first.surface === surface && first.surface_version === version
       && first.requested_model === "MiniMax-M3.1-Flash-Preview" && first.profile === "minimax" && first.provider === registration.provider && first.endpoint_host === "api.minimax.io"
       && responses.length > 0 && responses.every(event => event.response_model === model && event.response_independence_domain === registration.independence_domain && event.provider === registration.provider && event.profile === "minimax" && event.tls_verified_host === "api.minimax.io" && event.endpoint_host === "api.minimax.io")
       && retired.every(event => event.session_id === first.session_id && !(event.type === "system" && event.subtype !== "init")));
+    if (resolved && turnLimit) limitations.push("Capture 07 ended at the one-turn limit after read-only tool calls; its model_response is the resolution evidence.");
     identity = repeated && resolved;
     const observed = events(4).find(event => event.type === "model_response");
     if (typeof observed?.response_model === "string" && observed.response_model) reportedModel = observed.response_model;
logs/330-resume-3-script-diff.log; SHA-256 2fddc6e6c1b70ae53bf984500019a8257d0102873d93931d992a25f38f221c6d
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
      if (Array.isArray(value) && value.every(object)) return value;
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
    const tools = retired.slice(2, -1), last = retired.at(-1);
    const turnLimit = get(7).exit === 1 && get(7).signal === null && !get(7).timedOut && get(7).stderr === ""
      && retired.at(1)?.type === "model_response" && tools.length >= 2 && tools.length % 2 === 0
      && tools.every((event, index) => {
        if (index % 2 === 0) return event.type === "tool_use" && new Array("read_file", "list_dir", "search").includes(event.name);
        const use = tools.at(index - 1)!;
        return event.type === "tool_result" && event.name === use.name
          && typeof use.tool_use_id === "string" && use.tool_use_id.length > 0 && event.tool_use_id === use.tool_use_id;
      })
      && last?.type === "result" && last.subtype === "error_max_turns" && last.is_error === true && last.num_turns === 1;
    const resolved = check("capture 07 retired id resolves to current served model", (clean(7) || turnLimit)
      && first?.type === "system" && first.subtype === "init" && first.surface === surface && first.surface_version === version
      && first.requested_model === "MiniMax-M3.1-Flash-Preview" && first.profile === "minimax" && first.provider === registration.provider && first.endpoint_host === "api.minimax.io"
      && responses.length > 0 && responses.every(event => event.response_model === model && event.response_independence_domain === registration.independence_domain && event.provider === registration.provider && event.profile === "minimax" && event.tls_verified_host === "api.minimax.io" && event.endpoint_host === "api.minimax.io")
      && retired.every(event => event.session_id === first.session_id && !(event.type === "system" && event.subtype !== "init")));
    if (resolved && turnLimit) limitations.push("Capture 07 ended at the one-turn limit after read-only tool calls; its model_response is the resolution evidence.");
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

logs/331-resume-3-changed-script.log; SHA-256 8c8629ae625990bc15630125e2915fc34dd19c63f7afa8d1137ae6efe888cbe7
logs/332-resume-3-changed-script-hash.log; SHA-256 19ba9308c838346f2e870f52ea6046c918199c831fbfc3f95e83e51622153cab

6. Synthetic runs
All twenty runs omitted --write and used --clone /Users/michaeldaley/builds/m0-r1/tui at its unchanged head. The non-work-tree refusal scopes GIT_DIR to the empty scratch directory so the Git work-tree query fails while the clone argument remains fixed. No persistent environment or clone content changes.
The prior fourteen cases were repeated, followed by the six required Addendum 5 cases. Every one of the 51 synthetic MiniMax init events carries the exact 169-byte Addendum 4 billing_guard text, SHA-256 a7597387d81419de8c2d89f84615cc8115a7f41eaa0b50983f5e7823f5e7451c. Preparation and byte comparison: logs/333-resume-3-prepare-fixtures.log; SHA-256 2b8b4c9f94b9c05e89c425e0379ace2416511b27909034a6de7609249adf2f38.
Every exit, record verdict and required limitation was checked. Eleven schema-accepted records were printed: six pass and five intended identity failures. Nine intended refusals printed no record. The one-turn case passes with its limitation; all three changed one-turn forms fail identity; the Claude array case passes; the plugin case is refused. No unexpected failure or self-fix occurred.

Run 1: madv-pass
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/madv-pass
Change from passing case: Passing MiniMax captures; exact Addendum 4 A1 billing_guard added to every init.
Expected and observed: schema accepted; identity pass; auth pass; overall pass; exit 0
Wait: logs/334-resume-3-madv-pass-wait.log; SHA-256 030de6211d062e92a25920b07480979b11bd7cdca0425d61a4a9ff19b536f0e2
Run: logs/335-resume-3-madv-pass.log; SHA-256 ffb7d58ba9146e8a87f92632de4a9019927863799721e0cef4d582a2b44432ac
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.57 1.90 1.93
Full output:
The complete output is cited by the run log and SHA-256 above under the builder prompt's square-bracket output rule. It was shown in the session and remains complete in the unchanged log.

Run 2: madv-echo
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/madv-echo
Change from passing case: MiniMax capture 07 echoes the retired id; manifest updated.
Expected and observed: schema accepted; identity fail; auth pass; overall fail; exit 0
Wait: logs/336-resume-3-madv-echo-wait.log; SHA-256 c386ae396542bb3bb6218de3bb2ac43aee0ed5af91c01aa5f5f82d9a851a6b15
Run: logs/337-resume-3-madv-echo.log; SHA-256 19725095888872607ff7a0f45b96a2b8eaf968b7f6156f9ea374b469d495f4a0
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.85 1.95 1.94
Full output:
The complete output is cited by the run log and SHA-256 above under the builder prompt's square-bracket output rule. It was shown in the session and remains complete in the unchanged log.

Run 3: claude-pass
Surface: claude-code
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/claude-pass
Change from passing case: Passing Claude captures unchanged.
Expected and observed: schema accepted; identity pass; auth pass; overall pass; exit 0
Wait: logs/338-resume-3-claude-pass-wait.log; SHA-256 ba00436792738082f038b5811b7f89d2245d8a6d224cff9a468fa6b819f1ea3e
Run: logs/339-resume-3-claude-pass.log; SHA-256 a84c926df87e0158615dc388cc329d7542d53e44a5bcfbfa5d667fdb9a0119ac
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.85 1.95 1.94
Full output:
The complete output is cited by the run log and SHA-256 above under the builder prompt's square-bracket output rule. It was shown in the session and remains complete in the unchanged log.

Run 4: claude-wrong-model
Surface: claude-code
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/claude-wrong-model
Change from passing case: Claude capture 10 serves another model; manifest updated.
Expected and observed: schema accepted; identity fail; auth pass; overall fail; exit 0
Wait: logs/340-resume-3-claude-wrong-model-wait.log; SHA-256 ba00436792738082f038b5811b7f89d2245d8a6d224cff9a468fa6b819f1ea3e
Run: logs/341-resume-3-claude-wrong-model.log; SHA-256 90b5370bb2c40ba413c3da5c4ff7f8b9388380d4100cdca0b7eab01766979785
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.85 1.95 1.94
Full output:
The complete output is cited by the run log and SHA-256 above under the builder prompt's square-bracket output rule. It was shown in the session and remains complete in the unchanged log.

Run 5: key-set
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/madv-pass
Change from passing case: Passing MiniMax folder; invocation sets MINIMAX_API_KEY to a synthetic presence canary.
Expected and observed: REFUSED MINIMAX_API_KEY is set; exit 1
Wait: logs/342-resume-3-key-set-wait.log; SHA-256 ba00436792738082f038b5811b7f89d2245d8a6d224cff9a468fa6b819f1ea3e
Run: logs/343-resume-3-key-set.log; SHA-256 c63c1f07efd58d243da8e9986acfc2eeee0a026a21ce64ab4087ac6d5ba13a87
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.86 1.95 1.94
Full output:
REFUSED MINIMAX_API_KEY is set

Run 6: storage-set
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/madv-pass
Change from passing case: Passing MiniMax folder; invocation sets MADV_STORAGE_DIR to an unused scratch path.
Expected and observed: REFUSED MADV_STORAGE_DIR is set; exit 1
Wait: logs/344-resume-3-storage-set-wait.log; SHA-256 624392bbf69f3a1352b5f3b438e487258ca9678eaacbb66b7143524fa1bc95b9
Run: logs/345-resume-3-storage-set.log; SHA-256 561222dea314582bf795f47a42e71af581dc5ef9103d143f9f1355ad38cf8840
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.86 1.95 1.94
Full output:
REFUSED MADV_STORAGE_DIR is set

Run 7: missing-file
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/missing-file
Change from passing case: Remove capture 04 stdout; retain manifest entry.
Expected and observed: REFUSED missing or unsafe file: madv-surface/04.stdout; exit 1
Wait: logs/346-resume-3-missing-file-wait.log; SHA-256 624392bbf69f3a1352b5f3b438e487258ca9678eaacbb66b7143524fa1bc95b9
Run: logs/347-resume-3-missing-file.log; SHA-256 843a76040b2be91747249bda66c387c9175a3b762ff675743f31d92e6750297a
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.86 1.95 1.94
Full output:
REFUSED missing or unsafe file: madv-surface/04.stdout

Run 8: uncovered-file
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/uncovered-file
Change from passing case: Remove capture 04 stdout manifest entry; retain file.
Expected and observed: REFUSED file not covered by manifest: madv-surface/04.stdout; exit 1
Wait: logs/348-resume-3-uncovered-file-wait.log; SHA-256 624392bbf69f3a1352b5f3b438e487258ca9678eaacbb66b7143524fa1bc95b9
Run: logs/349-resume-3-uncovered-file.log; SHA-256 1e4ad2a0009c8ceccbe73184ce07df89fa603d2b6042e32e99a8387ec2e64490
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.86 1.95 1.94
Full output:
REFUSED file not covered by manifest: madv-surface/04.stdout

Run 9: changed-file
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/changed-file
Change from passing case: Append one newline to capture 04 stdout after manifest creation.
Expected and observed: REFUSED manifest hash mismatch: madv-surface/04.stdout; exit 1
Wait: logs/350-resume-3-changed-file-wait.log; SHA-256 624392bbf69f3a1352b5f3b438e487258ca9678eaacbb66b7143524fa1bc95b9
Run: logs/351-resume-3-changed-file.log; SHA-256 3e01e653fb9b74564c6e9b79783d988bd028433ffadcd6eb94ee06bfa5afc6c9
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.86 1.95 1.94
Full output:
REFUSED manifest hash mismatch: madv-surface/04.stdout

Run 10: marker-file
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/marker-file
Change from passing case: Capture 03 stderr contains the original bare six-character prefix. Addendum 4 makes it allowable; manifest updated.
Expected and observed: schema accepted; identity pass; auth pass; overall pass; exit 0
Wait: logs/352-resume-3-marker-file-wait.log; SHA-256 624392bbf69f3a1352b5f3b438e487258ca9678eaacbb66b7143524fa1bc95b9
Run: logs/353-resume-3-marker-file.log; SHA-256 e1ff64298c15c4cb2b5893662d23b161c796fe8456eaf99d4a092d24a0f7cabb
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.86 1.95 1.94
Full output:
The complete output is cited by the run log and SHA-256 above under the builder prompt's square-bracket output rule. It was shown in the session and remains complete in the unchanged log.

Run 11: non-work-tree
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/madv-pass
Change from passing case: Passing MiniMax folder and fixed --clone; invocation scopes GIT_DIR to the empty not-a-repository directory so the Git work-tree query fails.
Expected and observed: REFUSED ROOT is not a git work tree; exit 1
Wait: logs/354-resume-3-non-work-tree-wait.log; SHA-256 624392bbf69f3a1352b5f3b438e487258ca9678eaacbb66b7143524fa1bc95b9
Run: logs/355-resume-3-non-work-tree.log; SHA-256 396e56f8c1cc5dea01337b7fd0dd564ec8157f6687841ad081501de02ece085b
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.79 1.94 1.94
Full output:
REFUSED ROOT is not a git work tree

Run 12: missing-manifest
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/missing-manifest
Change from passing case: Remove MANIFEST.sha256.
Expected and observed: REFUSED missing MANIFEST.sha256; exit 1
Wait: logs/356-resume-3-missing-manifest-wait.log; SHA-256 c0b5b5ef5cf57ba5e83b03065b09ee21510976666db0ea2ae55f07fefd585ac1
Run: logs/357-resume-3-missing-manifest.log; SHA-256 b3f57b0d01bb846384d2075acdd717c4b7f4f8046bda5d21a2cafedcfde5484a
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.79 1.94 1.94
Full output:
REFUSED missing MANIFEST.sha256

Run 13: synthetic-key-pattern
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/synthetic-key-pattern
Change from passing case: Capture 03 stderr contains one plainly synthetic full key-pattern string; manifest updated.
Expected and observed: REFUSED forbidden marker: madv-surface/03.stderr; exit 1
Wait: logs/358-resume-3-synthetic-key-pattern-wait.log; SHA-256 c0b5b5ef5cf57ba5e83b03065b09ee21510976666db0ea2ae55f07fefd585ac1
Run: logs/359-resume-3-synthetic-key-pattern.log; SHA-256 0c20fe51cb7dacbc5b3aac92c1e2b98edb856e655abe142dfedabb92967e4908
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.73 1.92 1.93
Full output:
REFUSED forbidden marker: madv-surface/03.stderr

Run 14: embedded-word
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/embedded-word
Change from passing case: Capture 03 stderr contains task-management-options, with no key and no word boundary before sk-; manifest updated.
Expected and observed: schema accepted; identity pass; auth pass; overall pass; exit 0
Wait: logs/360-resume-3-embedded-word-wait.log; SHA-256 f4134efb3bdb95e620ebc50c159cc29e7d8b2b2c05a4aa467b6af7fab46a6ad9
Run: logs/361-resume-3-embedded-word.log; SHA-256 7fa4bfa1e9fd32723da62c057ef874aad95f1184d1de4e6935dc3f4e119cbdfa
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.73 1.92 1.93
Full output:
The complete output is cited by the run log and SHA-256 above under the builder prompt's square-bracket output rule. It was shown in the session and remains complete in the unchanged log.

Run 15: turn-limit
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/turn-limit
Change from passing case: From MiniMax pass: capture 07 has exactly init, response, search/list_dir use-result pairs and error_max_turns result; exit 1, no signal/timeout, empty stderr.
Expected and observed: schema accepted; identity pass; auth pass; overall pass; required one-turn limitation present; exit 0
Wait: logs/362-resume-3-turn-limit-wait.log; SHA-256 f4134efb3bdb95e620ebc50c159cc29e7d8b2b2c05a4aa467b6af7fab46a6ad9
Run: logs/363-resume-3-turn-limit.log; SHA-256 3ab682f6595daf1751ece9a818af386bd38b89c11974ac2ab5b6cd0217a8a164
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.73 1.92 1.93
Full output:
The complete output is cited by the run log and SHA-256 above under the builder prompt's square-bracket output rule. It was shown in the session and remains complete in the unchanged log.

Run 16: turn-other-tool
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/turn-other-tool
Change from passing case: From the one-turn form: replace the search use/result pair name with run_shell; no tool is executed.
Expected and observed: schema accepted; identity fail; auth pass; overall fail; exit 0
Wait: logs/364-resume-3-turn-other-tool-wait.log; SHA-256 f4134efb3bdb95e620ebc50c159cc29e7d8b2b2c05a4aa467b6af7fab46a6ad9
Run: logs/365-resume-3-turn-other-tool.log; SHA-256 a83e931706bbc89bb3a4487f4ccc1b4c8f358481988cb6ae818de9439716ecab
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.73 1.92 1.93
Full output:
The complete output is cited by the run log and SHA-256 above under the builder prompt's square-bracket output rule. It was shown in the session and remains complete in the unchanged log.

Run 17: turn-other-event
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/turn-other-event
Change from passing case: From the one-turn form: insert system/synthetic_notice after model_response.
Expected and observed: schema accepted; identity fail; auth pass; overall fail; exit 0
Wait: logs/366-resume-3-turn-other-event-wait.log; SHA-256 f4134efb3bdb95e620ebc50c159cc29e7d8b2b2c05a4aa467b6af7fab46a6ad9
Run: logs/367-resume-3-turn-other-event.log; SHA-256 a3bcaacb3321e5f9e37fc9e9abdf5f8706545e9c40bd476c2eac443c6a93c295
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.73 1.92 1.93
Full output:
The complete output is cited by the run log and SHA-256 above under the builder prompt's square-bracket output rule. It was shown in the session and remains complete in the unchanged log.

Run 18: turn-other-result
Surface: madv-surface
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/turn-other-result
Change from passing case: From the one-turn form: change only the result subtype to success.
Expected and observed: schema accepted; identity fail; auth pass; overall fail; exit 0
Wait: logs/368-resume-3-turn-other-result-wait.log; SHA-256 f4134efb3bdb95e620ebc50c159cc29e7d8b2b2c05a4aa467b6af7fab46a6ad9
Run: logs/369-resume-3-turn-other-result.log; SHA-256 f7444004c5f2ebe9db690e1200a2dacdaa4fc856dd702d893ddb966ef9405ab2
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.73 1.92 1.93
Full output:
The complete output is cited by the run log and SHA-256 above under the builder prompt's square-bracket output rule. It was shown in the session and remains complete in the unchanged log.

Run 19: claude-array
Surface: claude-code
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/claude-array
Change from passing case: From Claude pass: captures 12 and 13 each become one formatted JSON array of init, assistant, rate_limit_event and result/success objects.
Expected and observed: schema accepted; identity pass; auth pass; overall pass; exit 0
Wait: logs/370-resume-3-claude-array-wait.log; SHA-256 f4134efb3bdb95e620ebc50c159cc29e7d8b2b2c05a4aa467b6af7fab46a6ad9
Run: logs/371-resume-3-claude-array.log; SHA-256 1c94cc96afc32177739df6dfed502e66246bbb1ab02f170337db2ba156b5d184
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.99 1.97 1.95
Full output:
The complete output is cited by the run log and SHA-256 above under the builder prompt's square-bracket output rule. It was shown in the session and remains complete in the unchanged log.

Run 20: claude-plugin
Surface: claude-code
Folder: /private/tmp/m0-r1.devPEJ/record-script-fix-2-fixtures/claude-plugin
Change from passing case: From Claude pass: capture 10 system/init lists cc-plugin-privacy from builtin.
Expected and observed: REFUSED Claude investigation safety conditions; exit 1
Wait: logs/372-resume-3-claude-plugin-wait.log; SHA-256 7f6370b4974f845fe6a818be55fc7b6c92488e034aa0ab1043bc0e778997ef59
Run: logs/373-resume-3-claude-plugin.log; SHA-256 52f8c9b7ef38ef5db9b67e2d57891c9ae663e205c9f3f1ef4d79f425d5767ad6
Uptime before invocation: 21:13  up 21:44, 2 users, load averages: 1.99 1.97 1.95
Full output:
REFUSED Claude investigation safety conditions

7. Preservation, declarations and deviations
logs/374-resume-3-unchanged-clone-proof.log; SHA-256 f245f6d0b2cc59ed98bfc60b738b7a7abb5abd6c50310c577e5c218efa55f78c
The clone remains clean with no stash at 7f94c272a4fd7fc3b4ab1d18920b80ac95c677d3 on build/3b-m0-r1. No commit was made and nothing under tui was changed. All three earlier reports retain their specified hashes. The build log remains SHA-256 5a3d38c0df555f26f969f79b8029b9750af5449ea9163be7ec8486d793f460b3.
No surface, live call, real key, capability-store write, network call or Linux run occurred. Only synthetic streams were used; the Founder's investigation folders were not read. Phase 2 remains unopened.

Command evidence and SHA-256 index
Every log starts with its command and uptime and ends with its exit status. Hashes were gathered with shasum -a 256 in logs/375-resume-3-log-hashes.log and verified during report assembly. Logs were not overwritten, truncated, compressed or encoded; tool-display truncation does not alter the complete files.
logs/315-resume-3-prompt-manifest.log | 20:37  2 users, load averages: 2.44 3.15 3.12 | exit 0 | SHA-256 0312b8524d9d3a666c757b4bd21bafe124fb955b99ab5b9f2cbce0116489ab81
logs/316-resume-3-prompt-files.log | 20:37  2 users, load averages: 2.44 3.15 3.12 | exit 0 | SHA-256 1f35e5c70c08ae0465d586d8c44060036f6354215c4fd92f92dde819184ff4ae
logs/317-resume-3-addendum-5.log | 20:37  2 users, load averages: 2.44 3.15 3.12 | exit 0 | SHA-256 2d1b5ec8d4cf0f5bb9326937772d6a1ac7d37838266c5a4a20c976ba73a0aa08
logs/318-resume-3-authority-hashes.log | 20:37  2 users, load averages: 2.44 3.15 3.12 | exit 0 | SHA-256 4367e9cdb7ba56c030979d925572f7d0872470e0f9bda08213eadad6e8fa5d31
logs/319-resume-3-governed-version.log | 20:38  2 users, load averages: 2.12 2.99 3.06 | exit 0 | SHA-256 d931c32f1fa854587a6ea20f4ed8300cd6494bea7114852c80f379a912eae250
logs/320-resume-3-head.log | 20:38  2 users, load averages: 2.12 2.99 3.06 | exit 0 | SHA-256 81cb17e4d79ee52b8c9f39a1b9291fc41fc1214a6034ffb496e1f4bfb018a8ee
logs/321-resume-3-branch.log | 20:38  2 users, load averages: 2.12 2.99 3.06 | exit 0 | SHA-256 bc82a8c83fca789f7552b77d603c41618e1c2860f1a4377233e90f0230786f5b
logs/322-resume-3-status.log | 20:38  2 users, load averages: 2.12 2.99 3.06 | exit 0 | SHA-256 7763c65e9edf9f991934e30bd12bc308ee9552bc0f479b5ce3187c8f9b799e61
logs/323-resume-3-stash.log | 20:38  2 users, load averages: 2.03 2.96 3.05 | exit 0 | SHA-256 bb72454ffc8ba92a6ae0f11158c09819734244723340008e19f9a2792b343dca
logs/324-resume-3-pr-files.log | 20:38  2 users, load averages: 2.03 2.96 3.05 | exit 0 | SHA-256 813aff1bc41dc4659fb1b44ab00bea185856724be363757f49727f684bbfb3c8
logs/325-resume-3-pr-hashes.log | 20:38  2 users, load averages: 2.03 2.96 3.05 | exit 0 | SHA-256 c903868738e84d606704e1d829696f1796d4ed77e61cee46c39523806f230aba
logs/326-resume-3-record-files.log | 20:38  2 users, load averages: 2.03 2.96 3.05 | exit 0 | SHA-256 07d00615b3546469009eec6de07063ebe36349c75e038e593020074596ea0a7c
logs/327-resume-3-record-hash.log | 20:38  2 users, load averages: 2.03 2.96 3.05 | exit 0 | SHA-256 f39929de1265296a223e0a0ff850a818fb89262e9e7c39792896143e0985b733
logs/328-resume-3-runtime.log | 21:08  up 21:38, 2 users, load averages: 1.58 1.83 1.90 | exit 0 | SHA-256 2d8af790f84007c15f50d326d00ff7bd8e699e4b0c7a7d437e09f18d3ffd1a7f
logs/329-resume-3-save-original.log | 21:09  2 users, load averages: 1.85 1.87 1.91 | exit 0 | SHA-256 8913fc7364b39dc878d5656860fb837f118071420a5cb45dfd3ae39ab71b11c1
logs/330-resume-3-script-diff.log | 21:09  2 users, load averages: 1.85 1.87 1.91 | exit 1 | SHA-256 2fddc6e6c1b70ae53bf984500019a8257d0102873d93931d992a25f38f221c6d
logs/331-resume-3-changed-script.log | 21:09  2 users, load averages: 1.85 1.87 1.91 | exit 0 | SHA-256 8c8629ae625990bc15630125e2915fc34dd19c63f7afa8d1137ae6efe888cbe7
logs/332-resume-3-changed-script-hash.log | 21:09  2 users, load averages: 1.85 1.87 1.91 | exit 0 | SHA-256 19ba9308c838346f2e870f52ea6046c918199c831fbfc3f95e83e51622153cab
logs/333-resume-3-prepare-fixtures.log | 21:11  up 21:42, 2 users, load averages: 2.31 2.12 2.00 | exit 0 | SHA-256 2b8b4c9f94b9c05e89c425e0379ace2416511b27909034a6de7609249adf2f38
logs/334-resume-3-madv-pass-wait.log | 21:13  2 users, load averages: 1.41 1.88 1.92 | exit 0 | SHA-256 030de6211d062e92a25920b07480979b11bd7cdca0425d61a4a9ff19b536f0e2
logs/335-resume-3-madv-pass.log | 21:13  up 21:44, 2 users, load averages: 1.57 1.90 1.93 | exit 0 | SHA-256 ffb7d58ba9146e8a87f92632de4a9019927863799721e0cef4d582a2b44432ac
logs/336-resume-3-madv-echo-wait.log | 21:13  2 users, load averages: 1.57 1.90 1.93 | exit 0 | SHA-256 c386ae396542bb3bb6218de3bb2ac43aee0ed5af91c01aa5f5f82d9a851a6b15
logs/337-resume-3-madv-echo.log | 21:13  up 21:44, 2 users, load averages: 1.85 1.95 1.94 | exit 0 | SHA-256 19725095888872607ff7a0f45b96a2b8eaf968b7f6156f9ea374b469d495f4a0
logs/338-resume-3-claude-pass-wait.log | 21:13  2 users, load averages: 1.85 1.95 1.94 | exit 0 | SHA-256 ba00436792738082f038b5811b7f89d2245d8a6d224cff9a468fa6b819f1ea3e
logs/339-resume-3-claude-pass.log | 21:13  up 21:44, 2 users, load averages: 1.85 1.95 1.94 | exit 0 | SHA-256 a84c926df87e0158615dc388cc329d7542d53e44a5bcfbfa5d667fdb9a0119ac
logs/340-resume-3-claude-wrong-model-wait.log | 21:13  2 users, load averages: 1.85 1.95 1.94 | exit 0 | SHA-256 ba00436792738082f038b5811b7f89d2245d8a6d224cff9a468fa6b819f1ea3e
logs/341-resume-3-claude-wrong-model.log | 21:13  up 21:44, 2 users, load averages: 1.85 1.95 1.94 | exit 0 | SHA-256 90b5370bb2c40ba413c3da5c4ff7f8b9388380d4100cdca0b7eab01766979785
logs/342-resume-3-key-set-wait.log | 21:13  2 users, load averages: 1.85 1.95 1.94 | exit 0 | SHA-256 ba00436792738082f038b5811b7f89d2245d8a6d224cff9a468fa6b819f1ea3e
logs/343-resume-3-key-set.log | 21:13  up 21:44, 2 users, load averages: 1.86 1.95 1.94 | exit 1 | SHA-256 c63c1f07efd58d243da8e9986acfc2eeee0a026a21ce64ab4087ac6d5ba13a87
logs/344-resume-3-storage-set-wait.log | 21:13  2 users, load averages: 1.86 1.95 1.94 | exit 0 | SHA-256 624392bbf69f3a1352b5f3b438e487258ca9678eaacbb66b7143524fa1bc95b9
logs/345-resume-3-storage-set.log | 21:13  up 21:44, 2 users, load averages: 1.86 1.95 1.94 | exit 1 | SHA-256 561222dea314582bf795f47a42e71af581dc5ef9103d143f9f1355ad38cf8840
logs/346-resume-3-missing-file-wait.log | 21:13  2 users, load averages: 1.86 1.95 1.94 | exit 0 | SHA-256 624392bbf69f3a1352b5f3b438e487258ca9678eaacbb66b7143524fa1bc95b9
logs/347-resume-3-missing-file.log | 21:13  up 21:44, 2 users, load averages: 1.86 1.95 1.94 | exit 1 | SHA-256 843a76040b2be91747249bda66c387c9175a3b762ff675743f31d92e6750297a
logs/348-resume-3-uncovered-file-wait.log | 21:13  2 users, load averages: 1.86 1.95 1.94 | exit 0 | SHA-256 624392bbf69f3a1352b5f3b438e487258ca9678eaacbb66b7143524fa1bc95b9
logs/349-resume-3-uncovered-file.log | 21:13  up 21:44, 2 users, load averages: 1.86 1.95 1.94 | exit 1 | SHA-256 1e4ad2a0009c8ceccbe73184ce07df89fa603d2b6042e32e99a8387ec2e64490
logs/350-resume-3-changed-file-wait.log | 21:13  2 users, load averages: 1.86 1.95 1.94 | exit 0 | SHA-256 624392bbf69f3a1352b5f3b438e487258ca9678eaacbb66b7143524fa1bc95b9
logs/351-resume-3-changed-file.log | 21:13  up 21:44, 2 users, load averages: 1.86 1.95 1.94 | exit 1 | SHA-256 3e01e653fb9b74564c6e9b79783d988bd028433ffadcd6eb94ee06bfa5afc6c9
logs/352-resume-3-marker-file-wait.log | 21:13  2 users, load averages: 1.86 1.95 1.94 | exit 0 | SHA-256 624392bbf69f3a1352b5f3b438e487258ca9678eaacbb66b7143524fa1bc95b9
logs/353-resume-3-marker-file.log | 21:13  up 21:44, 2 users, load averages: 1.86 1.95 1.94 | exit 0 | SHA-256 e1ff64298c15c4cb2b5893662d23b161c796fe8456eaf99d4a092d24a0f7cabb
logs/354-resume-3-non-work-tree-wait.log | 21:13  2 users, load averages: 1.86 1.95 1.94 | exit 0 | SHA-256 624392bbf69f3a1352b5f3b438e487258ca9678eaacbb66b7143524fa1bc95b9
logs/355-resume-3-non-work-tree.log | 21:13  up 21:44, 2 users, load averages: 1.79 1.94 1.94 | exit 1 | SHA-256 396e56f8c1cc5dea01337b7fd0dd564ec8157f6687841ad081501de02ece085b
logs/356-resume-3-missing-manifest-wait.log | 21:13  2 users, load averages: 1.79 1.94 1.94 | exit 0 | SHA-256 c0b5b5ef5cf57ba5e83b03065b09ee21510976666db0ea2ae55f07fefd585ac1
logs/357-resume-3-missing-manifest.log | 21:13  up 21:44, 2 users, load averages: 1.79 1.94 1.94 | exit 1 | SHA-256 b3f57b0d01bb846384d2075acdd717c4b7f4f8046bda5d21a2cafedcfde5484a
logs/358-resume-3-synthetic-key-pattern-wait.log | 21:13  2 users, load averages: 1.79 1.94 1.94 | exit 0 | SHA-256 c0b5b5ef5cf57ba5e83b03065b09ee21510976666db0ea2ae55f07fefd585ac1
logs/359-resume-3-synthetic-key-pattern.log | 21:13  up 21:44, 2 users, load averages: 1.73 1.92 1.93 | exit 1 | SHA-256 0c20fe51cb7dacbc5b3aac92c1e2b98edb856e655abe142dfedabb92967e4908
logs/360-resume-3-embedded-word-wait.log | 21:13  2 users, load averages: 1.73 1.92 1.93 | exit 0 | SHA-256 f4134efb3bdb95e620ebc50c159cc29e7d8b2b2c05a4aa467b6af7fab46a6ad9
logs/361-resume-3-embedded-word.log | 21:13  up 21:44, 2 users, load averages: 1.73 1.92 1.93 | exit 0 | SHA-256 7fa4bfa1e9fd32723da62c057ef874aad95f1184d1de4e6935dc3f4e119cbdfa
logs/362-resume-3-turn-limit-wait.log | 21:13  2 users, load averages: 1.73 1.92 1.93 | exit 0 | SHA-256 f4134efb3bdb95e620ebc50c159cc29e7d8b2b2c05a4aa467b6af7fab46a6ad9
logs/363-resume-3-turn-limit.log | 21:13  up 21:44, 2 users, load averages: 1.73 1.92 1.93 | exit 0 | SHA-256 3ab682f6595daf1751ece9a818af386bd38b89c11974ac2ab5b6cd0217a8a164
logs/364-resume-3-turn-other-tool-wait.log | 21:13  2 users, load averages: 1.73 1.92 1.93 | exit 0 | SHA-256 f4134efb3bdb95e620ebc50c159cc29e7d8b2b2c05a4aa467b6af7fab46a6ad9
logs/365-resume-3-turn-other-tool.log | 21:13  up 21:44, 2 users, load averages: 1.73 1.92 1.93 | exit 0 | SHA-256 a83e931706bbc89bb3a4487f4ccc1b4c8f358481988cb6ae818de9439716ecab
logs/366-resume-3-turn-other-event-wait.log | 21:13  2 users, load averages: 1.73 1.92 1.93 | exit 0 | SHA-256 f4134efb3bdb95e620ebc50c159cc29e7d8b2b2c05a4aa467b6af7fab46a6ad9
logs/367-resume-3-turn-other-event.log | 21:13  up 21:44, 2 users, load averages: 1.73 1.92 1.93 | exit 0 | SHA-256 a3bcaacb3321e5f9e37fc9e9abdf5f8706545e9c40bd476c2eac443c6a93c295
logs/368-resume-3-turn-other-result-wait.log | 21:13  2 users, load averages: 1.73 1.92 1.93 | exit 0 | SHA-256 f4134efb3bdb95e620ebc50c159cc29e7d8b2b2c05a4aa467b6af7fab46a6ad9
logs/369-resume-3-turn-other-result.log | 21:13  up 21:44, 2 users, load averages: 1.73 1.92 1.93 | exit 0 | SHA-256 f7444004c5f2ebe9db690e1200a2dacdaa4fc856dd702d893ddb966ef9405ab2
logs/370-resume-3-claude-array-wait.log | 21:13  2 users, load averages: 1.73 1.92 1.93 | exit 0 | SHA-256 f4134efb3bdb95e620ebc50c159cc29e7d8b2b2c05a4aa467b6af7fab46a6ad9
logs/371-resume-3-claude-array.log | 21:13  up 21:44, 2 users, load averages: 1.99 1.97 1.95 | exit 0 | SHA-256 1c94cc96afc32177739df6dfed502e66246bbb1ab02f170337db2ba156b5d184
logs/372-resume-3-claude-plugin-wait.log | 21:13  2 users, load averages: 1.99 1.97 1.95 | exit 0 | SHA-256 7f6370b4974f845fe6a818be55fc7b6c92488e034aa0ab1043bc0e778997ef59
logs/373-resume-3-claude-plugin.log | 21:13  up 21:44, 2 users, load averages: 1.99 1.97 1.95 | exit 1 | SHA-256 52f8c9b7ef38ef5db9b67e2d57891c9ae663e205c9f3f1ef4d79f425d5767ad6
logs/374-resume-3-unchanged-clone-proof.log | 21:14  2 users, load averages: 1.33 1.79 1.88 | exit 0 | SHA-256 f245f6d0b2cc59ed98bfc60b738b7a7abb5abd6c50310c577e5c218efa55f78c

Deviations: none.

Single next decision: the Founder's check of the changed record script.
