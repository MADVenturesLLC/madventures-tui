import { afterEach, expect, test } from "bun:test";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir, userInfo } from "node:os";
import { join } from "node:path";
import { ADAPTER_REGISTRY, parseSurfaceId, sha256CanonicalSync, type AdapterRegistrationV1, type ExecutionIdentity, type SurfaceId } from "@madventures/protocol";
import { MissingRequiredVariableError, buildAllowlistedEnvironment } from "../src/environment";
import { runPurePreflight, runPurePreflightWithDependencies, type PreflightInput, type PreflightDependencies, type PreflightFailure } from "../src/preflight";
import { runBoundedProbe } from "../src/attestation";

const roots: string[] = [];
const children: Bun.Subprocess<"pipe", "pipe", "pipe">[] = [];
afterEach(async () => { for (const child of children.splice(0)) { try { child.kill("SIGKILL"); } catch {} await child.exited; } for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true }); });

function fixture() {
  const root = realpathSync(mkdtempSync(join(tmpdir(), "task45-preflight-")));
  roots.push(root);
  chmodSync(root, 0o700);
  const repo = join(root, "repo");
  mkdirSync(repo, { mode: 0o700 });
  const git = (args: string[]) => {
    const p = Bun.spawnSync(["git", "--no-optional-locks", "-C", repo, ...args], { stdout: "pipe", stderr: "pipe" });
    expect(p.exitCode).toBe(0);
    return p.stdout.toString().trim();
  };
  git(["init", "-q"]);
  git(["-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "commit", "--allow-empty", "-qm", "fixture"]);
  git(["worktree", "add", "--detach", "-q", join(root, "worktree")]);
  const bin = join(root, "bin"); mkdirSync(bin, { mode: 0o700 });
  const temp = join(root, "private-temp"); mkdirSync(temp, { mode: 0o700 });
  const settings = join(root, "settings.json"); writeFileSync(settings, "{}");
  const model = "fixture-exact-model";
  const source = `#!${process.execPath}\nprocess.on('SIGTERM',()=>process.exit(0));if (process.argv.includes('auth')) console.log(JSON.stringify({loggedIn:true,authMethod:'claude.ai',apiProvider:'firstParty',subscriptionType:'max',email:'PRIVATE-PROBE-CANARY'})); else console.log(JSON.stringify({type:'system',subtype:'init',model:${JSON.stringify(model)},claude_code_version:'2.1.296'}));\n`;
  for (const name of ["madbridge-claude-v5", "agy"]) writeFileSync(join(bin, name), source, { mode: 0o700 });
  const u = userInfo();
  const envelope: Record<string, unknown> = {
    protocol_version: "madbridge-protocol/v1", task_id: "fixture", authorization_reference: "FIXTURE-ONLY",
    repository: repo, worktree: join(root, "worktree"), branch: "fixture",
    repository_fingerprint: { kind: "commit", git_sha: git(["rev-parse", "--verify", "HEAD"]), sha256: "b".repeat(64) },
    executions: [
      { execution_id: "builder", role: "builder", surface: "claude-code", model, provider: "anthropic", independence_domain: "anthropic", effort: "high" },
      { execution_id: "reviewer", role: "independent-reviewer", surface: "antigravity", model, provider: "google", independence_domain: "google", effort: "high" },
    ],
    initial_writer: "builder", scope: { allowedReadPaths: ["src/**"], allowedWritePaths: ["src/**"], allowedCommandCategories: ["test"], allowedArtifactCategories: ["test-result"], maxArtifactSizeBytes: 1000, dataClass: "internal", allowedEgressDestinations: [] },
    pair_constraints: { required_roles: ["builder", "independent-reviewer"], require_distinct_providers: true, require_distinct_independence_domains: true, prohibit_self_review: true },
    expires_at: "2099-01-01T00:00:00.000Z", created_at: "2026-10-14T00:00:00.000Z",
  };
  const sign = () => { delete envelope.envelope_hash; envelope.envelope_hash = sha256CanonicalSync(envelope); };
  sign();
  const input: PreflightInput = {
    envelope, repositoryRoot: repo, worktree: join(root, "worktree"),
    ambient: { HOME: u.homedir, SHELL: u.shell ?? "", PATH: bin, TERM: "xterm-256color", TMPDIR: temp, CLAUDE_CONFIG_DIR: join(u.homedir, ".claude-madventures-v5"), GH_TOKEN: "DISCARD-CANARY" },
    installation: { installation_uid: u.uid, passwd_home: u.homedir, approved_path: bin, claude_config_dir: join(u.homedir, ".claude-madventures-v5") },
    invocationArguments: [], settingsSources: [settings], storageRootOverride: join(root, "storage"),
    hostCapabilities: { pty: true, processGroups: true, termination: true, timing: true },
    observedHostFacts: {}, now: "2026-10-14T00:00:00.000Z", signal: new AbortController().signal,
  };
  // Model an OS-provided private temporary directory in the filesystem view.
  // Actual fixture files stay under os.tmpdir(); every production TMPDIR rule
  // still runs, including the shared-root exclusion and the real mode/UID.
  const privateName = "/fixture-private-temp";
  const deps: Partial<PreflightDependencies> = {
    probe: req => runBoundedProbe(req, {spawn: request => { const p=Bun.spawn([request.executablePath,...request.arguments], {env:request.environment,stdin:new Blob([request.stdin]),stdout:"pipe",stderr:"pipe"}); children.push(p as any); return p; }}),
    realpath: path => path === temp ? privateName : require("node:fs").realpathSync(path),
    stat: path => statSync(path === privateName ? temp : path),
    registration: surface => {
      const r = ADAPTER_REGISTRY.get(surface)!;
      return { ...r, identity_probe: { argv: [], parse: "json" }, auth_readiness_probe: { argv: ["auth", "status"], parse: "json" }, non_interactive_flags: [], supported_versions: ["2.1.296"] } as AdapterRegistrationV1;
    },
    freshRecord: () => ({ overall: "pass", requested_model: model, role_eligibility: ["builder", "independent-reviewer"], independent_review_eligible: true }) as any,
  };
  return { root, repo, git, bin, temp, settings, model, input, envelope, sign, deps,
    run: (extra: Partial<PreflightDependencies> = {}) => runPurePreflightWithDependencies(input, { ...deps, ...extra }) };
}

function fixtureWithUnregisteredSurfaces() {
  const f = fixture();
  const executions: ExecutionIdentity[] = ["builder", "reviewer"].map((name, index) => ({
    execution_id: name, role: index === 0 ? "builder" : "independent-reviewer",
    surface: parseSurfaceId(`pair-seam-${name}`), model: f.model,
    provider: `fixture-${name}-provider`, independence_domain: `fixture-${name}-domain`, effort: "high",
  }));
  const registrations = new Map<SurfaceId, AdapterRegistrationV1>(executions.map(execution => [execution.surface, {
    surface: execution.surface, executable_name: execution.surface,
    provider: execution.provider, independence_domain: execution.independence_domain,
    organization_id: execution.provider, supported_versions: ["2.1.296"],
    identity_probe: { argv: [], parse: "json" }, auth_readiness_probe: { argv: ["auth", "status"], parse: "json" },
    non_interactive_flags: [], environment_allowlist_ref: "antigravity-v1",
    auth_failure_detection: [], limitations: ["Controlled pair-admission regression."],
  }]));
  const executable = readFileSync(join(f.bin, "madbridge-claude-v5"));
  for (const registration of registrations.values()) {
    writeFileSync(join(f.bin, registration.executable_name), executable, { mode: 0o700 });
    expect(ADAPTER_REGISTRY.has(registration.surface)).toBe(false);
  }
  f.envelope.executions = executions;
  f.sign();
  f.deps.registration = surface => registrations.get(surface);
  return { ...f, registrations, executions };
}

async function failure(f: ReturnType<typeof fixture>, code: PreflightFailure, extra: Partial<PreflightDependencies> = {}) {
  const r = await f.run(extra);
  expect(r.ok).toBe(false);
  if (!r.ok) { expect(r.failure).toBe(code); expect(r.detail).not.toContain("PRIVATE-PROBE-CANARY"); }
}

test("preflight fails with envelope_invalid", async () => { const f = fixture(); f.envelope.envelope_hash = "0".repeat(64); await failure(f, "envelope_invalid"); });
test("preflight fails with cardinality", async () => { const f = fixture(); (f.envelope.executions as unknown[]).pop(); f.sign(); await failure(f, "cardinality"); });
test("preflight fails with repository_fingerprint", async () => { const f = fixture(); f.input.repositoryRoot = f.root; await failure(f, "repository_fingerprint"); });
test("preflight fails with repository_fingerprint when the envelope names another checkout or commit", async () => {
  const f = fixture(), other = fixture();
  const head = f.git(["rev-parse", "--verify", "HEAD"]);
  const common = realpathSync(f.git(["rev-parse", "--path-format=absolute", "--git-common-dir"]));
  expect(head).not.toBe("a".repeat(40));
  for (const kind of ["commit", "working_tree"]) {
    f.envelope.repository_fingerprint = { kind, git_sha: head, sha256: "b".repeat(64), ...(kind === "working_tree" ? { base_git_sha: "c".repeat(40) } : {}) };
    for (const repository of [f.repo, common]) {
      f.envelope.repository = repository;
      f.sign();
      expect((await f.run()).ok).toBe(true);
    }
    for (const repository of [other.repo, join(f.root, "missing-repository")]) {
      f.envelope.repository = repository;
      f.sign();
      await failure(f, "repository_fingerprint");
    }
    f.envelope.repository = f.repo;
    for (const worktree of [other.input.worktree, join(f.root, "missing-worktree")]) {
      f.envelope.worktree = worktree;
      f.sign();
      await failure(f, "repository_fingerprint");
    }
    f.envelope.worktree = f.input.worktree;
    const fingerprint = f.envelope.repository_fingerprint as Record<string, unknown>;
    fingerprint.git_sha = "a".repeat(40);
    f.sign();
    await failure(f, "repository_fingerprint");
    fingerprint.git_sha = head;
    f.envelope.repository = other.repo;
    f.input.ambient.HOME = f.root;
    f.sign();
    await failure(f, "repository_fingerprint");
    f.input.ambient.HOME = f.input.installation.passwd_home;
  }
});
test("preflight fails with executable_unresolved", async () => { const f = fixture(); rmSync(join(f.bin, "agy")); await failure(f, "executable_unresolved"); chmodSync(join(f.bin, "madbridge-claude-v5"), 0o600); await failure(f, "executable_unresolved"); });
test("preflight fails with identity_mismatch", async () => { const f = fixture(); writeFileSync(join(f.bin, "madbridge-claude-v5"), `#!${process.execPath}\nconsole.log('{"type":"system","subtype":"init","model":"other","claude_code_version":"2.1.296"}');\n`); await failure(f, "identity_mismatch"); });
test("preflight fails with identity_mismatch when the independence domain differs from the registration", async () => {
  for (const index of [0, 1]) {
    const f = fixture();
    (f.envelope.executions as Record<string, unknown>[])[index]!.independence_domain = "unexpected-domain";
    f.sign();
    let probes = 0, records = 0;
    await failure(f, "identity_mismatch", {
      probe: async req => { probes++; return f.deps.probe!(req); },
      freshRecord: (...args) => { records++; return f.deps.freshRecord!(...args); },
    });
    expect(probes).toBe(4);
    expect(records).toBe(0);
  }
});
test("preflight fails with auth_not_ready", async () => {
  const f = fixture();
  for (const content of ['{"apiKeyHelper":"never-run"}', '{"apiProvider":"firstParty"}', '{"customApiUrl":"fixture"}', '{"env":{"ANTHROPIC_BASE_URL":"fixture"}}', '{"env":{"TERM":"different"}}', '{"env":{"LANG":"unexpected"}}', 'malformed']) {
    writeFileSync(f.settings, content); await failure(f, "auth_not_ready");
  }
  writeFileSync(f.settings, '{}');
  f.input.settingsSources = [join(f.root, '.credentials.json')]; await failure(f, 'auth_not_ready'); f.input.settingsSources = [f.settings];
  f.input.invocationArguments = ["--settings=fixture"]; await failure(f, "auth_not_ready"); f.input.invocationArguments = [];
  const sharedTemporaryRoot = realpathSync(mkdtempSync(join("/tmp", "task45-shared-temp-")));
  roots.push(sharedTemporaryRoot);
  f.input.ambient.TMPDIR = sharedTemporaryRoot; await failure(f, "auth_not_ready"); // Shared /tmp descendant, despite private ownership/mode.
  f.input.ambient.TMPDIR = f.temp;
  for (const key of ["SHELL", "PATH", "CLAUDE_CONFIG_DIR"]) {
    const old = f.input.ambient[key]; f.input.ambient[key] = "different"; await failure(f, "auth_not_ready"); f.input.ambient[key] = old;
  }
  f.input.installation.installation_uid++; await failure(f, "auth_not_ready");
});
test("preflight fails with pair_ineligible", async () => { const f = fixture(); await failure(f, "pair_ineligible", { registration: s => ADAPTER_REGISTRY.get(s) }); });
test("preflight threads its fixture registration resolver through pair eligibility", async () => {
  const f = fixtureWithUnregisteredSurfaces();
  const result = await f.run();
  expect(result).toMatchObject({ ok: true });
  if (result.ok) expect(result.plan.executions.map(execution => execution.surface)).toEqual(f.executions.map(execution => execution.surface));
});
test("public preflight rejects fixture dependencies before and after a test-seam call", async () => {
  const f = fixtureWithUnregisteredSurfaces(), before = [...ADAPTER_REGISTRY];
  const denied = { ok: false, failure: "executable_unresolved", detail: "executable_unresolved" } as const;
  expect(await runPurePreflight(f.input)).toEqual(denied);
  expect((await f.run()).ok).toBe(true);
  let calls = 0;
  const overrides = { ...f.deps, registration: (surface: SurfaceId) => { calls++; return f.registrations.get(surface); } };
  expect(await Reflect.apply(runPurePreflight, undefined, [f.input, overrides])).toEqual(denied);
  expect(await runPurePreflight({ ...f.input, ...overrides })).toEqual(denied);
  expect(await runPurePreflight(f.input)).toEqual(denied);
  expect(calls).toBe(0);
  expect([...ADAPTER_REGISTRY]).toEqual(before);
});
test("fixture preflight keeps pair policy and registration overrides local to each call", async () => {
  const f = fixtureWithUnregisteredSurfaces();
  await failure(f, "executable_unresolved", { registration: () => undefined });
  expect((await f.run()).ok).toBe(true);
  const [builder, reviewer] = f.executions;
  const original = f.registrations.get(reviewer!.surface)!;
  f.registrations.set(reviewer!.surface, { ...original, organization_id: builder!.provider });
  await failure(f, "pair_ineligible");
  f.registrations.set(reviewer!.surface, original);
  expect((await f.run()).ok).toBe(true);
});
test("preflight fails with storage_root_invalid", async () => { const f = fixture(); f.input.storageRootOverride = join(f.repo, "storage"); await failure(f, "storage_root_invalid"); });
test("preflight fails with host_capability_missing", async () => { const f = fixture(); f.input.hostCapabilities.pty = false; await failure(f, "host_capability_missing"); });
test("preflight fails with capability_record_stale", async () => { const f = fixture(); await failure(f, "capability_record_stale", { freshRecord: () => null }); });
test("preflight fails with home_mismatch", async () => { const f = fixture(); f.input.ambient.HOME = f.root; await failure(f, "home_mismatch"); delete f.input.ambient.HOME; await failure(f, "home_mismatch"); });

function listing(root: string): unknown {
  return readdirSync(root, { withFileTypes: true }).sort((a,b) => a.name.localeCompare(b.name)).map(e => [e.name, e.isDirectory() ? listing(join(root,e.name)) : e.isFile() ? new Bun.CryptoHasher("sha256").update(readFileSync(join(root,e.name))).digest("hex") : "other"]);
}
test("the returned plan's repository fingerprint is frozen", async () => {
  const result = await fixture().run();
  expect(result.ok).toBe(true);
  if (result.ok) expect(Object.isFrozen(result.plan.repositoryFingerprint)).toBe(true);
});
test("preflight creates nothing", async () => {
  const f = fixture();
  writeFileSync(join(f.input.worktree,"dirty-fixture"),"fixture dirty status");
  const status=Bun.spawnSync(["git","--no-optional-locks","-C",f.input.worktree,"status","--porcelain=v1","-z"],{stdout:"pipe",stderr:"pipe"});
  expect(status.exitCode).toBe(0);
  const before = listing(f.root); const temporary = readdirSync(tmpdir()).sort();
  const r = await f.run(); expect(r.ok).toBe(true);
  expect(listing(f.root)).toEqual(before); expect(readdirSync(tmpdir()).sort()).toEqual(temporary);
  if (r.ok) { expect(r.plan.repositoryFingerprint.statusSha256).toBe(new Bun.CryptoHasher("sha256").update(status.stdout).digest("hex")); expect(Object.isFrozen(r.plan)).toBe(true); expect(Object.isFrozen(r.plan.executions)).toBe(true); for (const e of r.plan.executions) { expect(Object.isFrozen(e)).toBe(true); expect(Object.isFrozen(e.arguments)).toBe(true); expect(Object.isFrozen(e.environment)).toBe(true); expect(e.artifactSha256).toBe(new Bun.CryptoHasher("sha256").update(readFileSync(e.executablePath)).digest("hex")); } }
});
test("probe environment equals launch environment", async () => {
  const f = fixture(); let builds = 0; const seen: Readonly<Record<string,string>>[] = [];
  const r = await f.run({ buildEnvironment: (reg,env) => { builds++; return buildAllowlistedEnvironment(reg,env); }, probe: async req => { seen.push(req.environment); return runBoundedProbe(req); } });
  expect(r.ok).toBe(true); expect(builds).toBe((f.envelope.executions as unknown[]).length);
  if (r.ok) for (let i=0;i<r.plan.executions.length;i++) { const env=r.plan.executions[i]!.environment; expect(seen[i*2]).toBe(env); expect(seen[i*2+1]).toBe(env); expect(env).not.toHaveProperty("GH_TOKEN"); }
});
test("a cached attestation is not reused across sessions", async () => { const f = fixture(); let count=0; const probe: PreflightDependencies["probe"] = async req => { count++; return runBoundedProbe(req); }; expect((await f.run({probe})).ok).toBe(true); const first=count; expect(first).toBe(4); expect((await f.run({probe})).ok).toBe(true); expect(count).toBe(first*2); });
test("a surface without an actual-session identity primitive is ineligible", async () => { const f = fixture(); let count=0; await failure(f,"pair_ineligible",{registration:s=>ADAPTER_REGISTRY.get(s),probe:async req=>{count++;return runBoundedProbe(req);}}); expect(count).toBe(2); expect((await runPurePreflight(f.input)).ok).toBe(false); });
test("missing TERM fails preflight as auth_not_ready", async () => {const f=fixture();delete f.input.ambient.TERM;await failure(f,"auth_not_ready");});
test("missing TMPDIR fails preflight as auth_not_ready", async () => {const f=fixture();delete f.input.ambient.TMPDIR;await failure(f,"auth_not_ready");});
test("a caught MissingRequiredVariableError maps to auth_not_ready", async () => {const f=fixture();await failure(f,"auth_not_ready",{buildEnvironment:()=>{throw new MissingRequiredVariableError("TERM","claude-code-v1");}});});

function hang(f: ReturnType<typeof fixture>) { writeFileSync(join(f.bin,"madbridge-claude-v5"), `#!${process.execPath}\nif(process.argv.includes('auth')){process.on('SIGTERM',()=>{});setInterval(()=>{},100);}else {process.on('SIGTERM',()=>process.exit(0));console.log(JSON.stringify({type:'system',subtype:'init',model:${JSON.stringify(f.model)},claude_code_version:'2.1.296'}));}\n`); }
test("the auth probe enforces the 5,000 ms execution deadline", async () => { const f=fixture();hang(f);const start=performance.now();await failure(f,"auth_not_ready");const elapsed=performance.now()-start;expect(elapsed).toBeGreaterThanOrEqual(5000);expect(elapsed).toBeLessThan(6500); },10000);
test("the auth probe escalates SIGTERM to SIGKILL within the forced-cleanup budget", async () => {const f=fixture();hang(f);const signals:string[]=[];await failure(f,"auth_not_ready",{probe:req=>runBoundedProbe(req,{spawn:request=>{const p=Bun.spawn([request.executablePath,...request.arguments],{env:request.environment,stdin:new Blob([request.stdin]),stdout:"pipe",stderr:"pipe"});children.push(p as any);return {...p,stdout:p.stdout,stderr:p.stderr,exited:p.exited,kill:s=>{if(request.kind==="auth")signals.push(s);p.kill(s as any);}};}})});expect(signals).toEqual(["SIGTERM","SIGKILL"]);},10000);
test("the auth probe reaps the child successfully", async () => {const f=fixture();let reaped=0;const r=await f.run({probe:req=>runBoundedProbe(req,{spawn:request=>{const p=Bun.spawn([request.executablePath,...request.arguments],{env:request.environment,stdin:new Blob([request.stdin]),stdout:"pipe",stderr:"pipe"});children.push(p as any);return {stdout:p.stdout,stderr:p.stderr,exited:p.exited.then(code=>{reaped++;return code;}),kill:s=>p.kill(s as any)};}})});expect(r.ok).toBe(true);expect(reaped).toBe(4);});
test("cleanup-budget exhaustion fails closed as auth_not_ready", async () => {const f=fixture();hang(f);await failure(f,"auth_not_ready",{probe:req=>runBoundedProbe(req,{spawn:request=>{const p=Bun.spawn([request.executablePath,...request.arguments],{env:request.environment,stdin:new Blob([request.stdin]),stdout:"pipe",stderr:"pipe"});children.push(p as any);return {stdout:p.stdout,stderr:p.stderr,exited:request.arguments.includes("auth")?p.exited.then(async code=>{await Bun.sleep(700);return code;}):p.exited,kill:s=>p.kill(s as any)};}})});},10000);
