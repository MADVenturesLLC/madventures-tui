# Phase 3B M1 build log

## Commission and seat

The local main reference and the binding base under B14 were `75aec139d503cbe1d34d0c6f3ac5bd514339570e`. The branch is `build/3b-m1-r1`. The commission is DEC-20261123-01, SHA-256 `e0f08199567641f47eba567ac0653bfc8f1ed9315b3ddfca8074d535b294cb8e`. The builder prompt has SHA-256 `683951e9534f1517f68b690ceec554a3908a8dd6cebd2bd97f8791e56e6e4733`.

The harness identified itself as Codex, based on GPT-6 by OpenAI, primary agent /root, Default collaboration mode. A more specific model identifier, reasoning effort, service tier, session ID and approvals reviewer were not shown. The sandbox was workspace-write with network access restricted. The Founder identified the approval setting as on-request and confirmed no loaded MCP server. The setting was not separately displayed. The Founder's session-record check follows the build.

The functions namespace showed wait, request_user_input, request_user_input_async, send_message_to_user_async and exec. Inside exec the callable inventory included apply_patch, exec_command, write_stdin and clock__curr_time. Clock showed sleep. Collaboration also showed followup_task, interrupt_agent, list_agents, send_message and wait_agent. The remaining identifiers, including the deferred namespace, are the six names of Addendum 2 B4. The Founder recorded the additional functions tool send_message_to_user_async in resume item 2.

The working directory was `/Users/michaeldaley/builds/m1-r1`, the shell zsh and the timezone America/New_York. Git identity was daley40-lab with 293512385+daley40-lab@users.noreply.github.com. Attribution is builder, session:codex/3b-m1-r1 and codex.

The governed executable reported

```text
WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0
```

## Runtime halt and resumption

Runtime check 007 found Bun 1.4.2, revision `744846f844374847c902b5e7fd59b4342a51ef99`, binary SHA-256 `35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5`. In check 042 the outer command set PATH, then started a nested zsh. The helper ran the barred Homebrew Bun 1.4.5, revision `826ef2a6f067f917560ef49cd12125f12f3dd0ad`, binary SHA-256 `d6056bfd39a0e1fac3ebbfa0842bddd389a8aaa237614a52239bb17472f63377`. The session halted before any test. The Founder upheld the halt and retained `pr/m1-halt-1-report.md`, SHA-256 `eed8bc988d68dc9e1b601cba8ee3e0e3fecc80bd92fadfa45059027d5714f730`.

Resume message 1, SHA-256 `c4436aa4cb445bb00682982b1dd38355bb822cfce2a9f15371b1c53d7a62bc9c`, invalidated the frozen install in 033, the typecheck in 040 and runtime check 042. None counts. The last passing runtime check before them was 007. The prompt manifest, governed CLI, branch, base, clean tree, empty stash, retained halt report, offending log and empty evidence directory matched in 045–052. Command 053 removed all node_modules folders inside the clone and verified clean status. For every subsequent Bun command the invoking shell sets PATH and checks both absolute resolutions and the binary digest before executing Bun. No further shell is started between those checks and the Bun command.

## Preconditions

1. The first parent of the base and verified ancestor is `60faaf8e35cf7f85078bccad73d563262736117b`. The four changed paths are docs/decisions/DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md, docs/decisions/DEC-20261121-02-addendum-2-registry-digest.md, docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md and docs/verification/phase-3a-correction-rounds.md. The checkout and stash were clean and no M1 remote-tracking branch was listed. All five proposed M1 paths were absent. The initial output directories were empty apart from this session's command logs by the time of listing.
2. All 42 authority files matched their specified SHA-256 at HEAD. The 37 DEC acts and addenda showed ISSUED and the Founder's signature. PLAN-OPEN-2 showed APPROVED. Both prompt files passed the resumed manifest.
3. Numbered base-source excerpts follow. They are taken from the listed command outputs. Blank lines between numbered source lines retain their source numbers. Quoted lines have trailing whitespace removed.
4. Imports of the internal seams occur in packages/supervisor/test/build-rollback.test.ts at 23, packages/supervisor/test/madv-preflight-support.ts at 6, packages/supervisor/test/preflight.test.ts at 7, and test/phase3a/runtime-harness.ts at 14 and 15. None occurs under apps. The separation pin at line 30 and the base build.ts both have SHA-256 `6008c0bab23f1bde66af3744c4731203f509f2890015b853ea6e50d6c4f4c44a`.
5. uname -sm reported Darwin arm64.
6. The resumed baseline passed as recorded below.

apps/madbridge/src/tui/main.tsx — `logs/020-entry.log`, SHA-256 `008751903d3aeadaf88be63c4650a406f915b17d2ab5a0e5a52b3d5cff5d156d`

```text
   143	async function main(): Promise<void> {
   144	  const isFixture = process.argv.includes("--fixture");
   145
   146	  const renderer = await createCliRenderer();
   147	  const root = createRoot(renderer);
   148
   149	  if (isFixture) {
   150	    // Fixture mode — render with demo data, no live broker connection.
   151	    // The fixture banner is permanently visible inside App via the fixture prop.
   152	    const base = makeFixtureSnapshot();
   153	    const fixtureSnapshot = withHarnessApprovalQueue(base);
   154	    const fixtureSubscribe = isHarnessStreamEnabled()
   155	      ? makeStreamingFixtureSubscribe(fixtureSnapshot)
   156	      : (listener: (snapshot: BrokerSnapshot) => void): (() => void) => {
   157	          listener(fixtureSnapshot);
   158	          return () => {};
   159	        };
   160
   161	    root.render(
   162	      <App
   163	        subscribe={fixtureSubscribe}
   164	        fixture={true}
   165	      /> as ReactNode,
   166	    );
   167	  } else {
   168	    // Live mode — no broker wiring in Phase 0.
   169	    // App renders with no subscription (shows NOT CONNECTED).
   170	    root.render(<App /> as ReactNode);
   171	  }
   172	}
   173
   174	main().catch((err) => {
   175	  console.error("Fatal:", err);
   176	  process.exit(1);
   177	});
```

packages/supervisor/src/build.ts — `logs/022-build-base.log`, SHA-256 `ded0e75dda5acdbedfc1ce218944194f01a0f219a2fbc03d7d11bd45384405a2`

```text
   104	export interface LiveReattestationInput {
   105	  readonly executionId: string;
   106	  readonly model: string;
   107	  readonly provider: string;
   108	  readonly execution: LaunchExecution;
   109	  readonly registration: BuildSurfaceRegistration;
   110	  readonly host: BuildHostResource;
   111	  readonly child: BuildChildResource;
   112	}
   113
   114	export type LiveReattestationResult =
   115	  | {
   116	      readonly ok: true;
   117	      readonly evidenceKind: "actual_session";
   118	      readonly provider: string;
   119	      readonly model: string;
   120	      readonly cliVersion?: string;
   121	    }
   122	  | {
   123	      readonly ok: false;
   124	      readonly reason: string;
   125	      readonly evidenceKind?: "actual_session" | "configuration_only" | "unverified";
   126	      readonly provider?: string;
   127	      readonly model?: string;
   128	    };
   129
   130	export type LiveSurfaceAttester = (
   131	  input: LiveReattestationInput,
   132	) => Promise<LiveReattestationResult> | LiveReattestationResult;
   133
   134	export interface BuildSurfaceRegistration extends AdapterRegistrationV1 {
   135	  readonly live_attester?: LiveSurfaceAttester | null;
   136	}
(lines omitted)
   298	      for await (const fact of host.handle.facts()) {
(lines omitted)
   441	  const iterator = host.handle.facts()[Symbol.asyncIterator]();
(lines omitted)
   534	export async function runTransactionalBuild(input: BuildInput): Promise<BuildResult> {
   535	  const safeInput: BuildInput =
   536	    input !== null && typeof input === "object"
   537	      ? {
   538	          sessionId: input.sessionId,
   539	          envelope: input.envelope,
   540	          plan: input.plan,
   541	          ...(input.injectFailureAt !== undefined ? { injectFailureAt: input.injectFailureAt } : {}),
   542	        }
   543	      : ({} as BuildInput);
   544	  return runTransactionalBuildWithDependencies(safeInput);
   545	}
(lines omitted)
   920	        case "reattest": {
   921	          for (let i = 0; i < plan.executions.length; i += 1) {
   922	            const execution = plan.executions[i]!;
   923	            const envelopeExecution = envelope.executions[i];
   924	            const host = hosts[i];
   925	            const child = children[i];
   926	            const execId = envelopeExecution?.execution_id;
   927	            currentExecutionIds = typeof execId === "string" && execId.length > 0 ? [execId] : [];
   928	            if (
   929	              envelopeExecution === undefined ||
   930	              host === undefined ||
   931	              child === undefined ||
   932	              child.childPid === null ||
   933	              child.pgid === null
   934	            ) {
   935	              return failAt(step, "reattestation_failed", currentExecutionIds);
   936	            }
   937	            if (execution.surface !== envelopeExecution.surface) {
   938	              return failAt(step, "reattestation_failed", currentExecutionIds);
   939	            }
   940	            const reg = resolveRegistration(execution.surface);
   941	            if (reg === undefined || typeof reg.live_attester !== "function") {
   942	              return failAt(step, "reattestation_failed", currentExecutionIds);
   943	            }
   944	            const verdict = await reg.live_attester({
   945	              executionId: envelopeExecution.execution_id,
   946	              model: envelopeExecution.model,
   947	              provider: envelopeExecution.provider,
   948	              execution,
   949	              registration: reg,
   950	              host,
   951	              child,
   952	            });
   953	            if (!verdict.ok) {
   954	              return failAt(step, "reattestation_failed", currentExecutionIds);
   955	            }
   956	            if (verdict.evidenceKind !== "actual_session") {
   957	              return failAt(step, "reattestation_failed", currentExecutionIds);
   958	            }
   959	            if (verdict.provider !== envelopeExecution.provider || verdict.provider !== reg.provider) {
   960	              return failAt(step, "reattestation_failed", currentExecutionIds);
   961	            }
   962	            if (verdict.model !== envelopeExecution.model) {
   963	              return failAt(step, "reattestation_failed", currentExecutionIds);
   964	            }
   965	            const record: LiveReattestationRecord = Object.freeze({
   966	              executionId: envelopeExecution.execution_id,
   967	              surface: execution.surface,
   968	              provider: verdict.provider,
   969	              model: verdict.model,
   970	              evidenceKind: "actual_session",
   971	              cliVersion: verdict.cliVersion ?? null,
   972	            });
   973	            reattestations.push(record);
   974	            resources.push(Object.freeze({ step: "reattest", reattestation: record }));
   975	          }
   976	          currentExecutionIds = [];
   977	          break;
   978	        }
```

packages/supervisor/src/index.ts — `logs/014-index.log`, SHA-256 `854f55c986c162eb491654c480c64e6c33e501e2258ac7a10677d06e1dc3cfab`

```text
     1	export type { EnvironmentAllowlistV1 } from "./environment";
     2	export {
     3	  buildAllowlistedEnvironment,
     4	  redact,
     5	  MissingRequiredVariableError,
     6	  UnknownEnvironmentAllowlistError,
     7	} from "./environment";
     8
     9	export { runPurePreflight } from "./preflight";
    10	export type { PreflightInput, PreflightFailure, PreflightOk, PreflightResult, LaunchPlan, LaunchExecution } from "./preflight";
    11
    12	export { BUILD_STEPS, runTransactionalBuild, rollbackBuild } from "./build";
    13	export type {
    14	  BuildAdapterHandle,
    15	  BuildChildResource,
    16	  BuildFailureCode,
    17	  BuildHostResource,
    18	  BuildInput,
    19	  BuildLifelineResource,
    20	  BuildResult,
    21	  BuildStep,
    22	  CreatedBuildResource,
    23	  LiveReattestationRecord,
    24	  LiveReattestationResult,
    25	  PartialBuildState,
    26	  RollbackOutcome,
    27	} from "./build";
```

packages/supervisor/src/preflight.ts — `logs/019-preflight-lines.log`, SHA-256 `9978975f1f09e77ce23add965ad099742ae5e582ee93013f3a6f8ae965e84dfd`

```text
    83	function validateEnvironment(input: PreflightInput, registrations: readonly AdapterRegistrationV1[], d: PreflightDependencies): boolean {
    84	  const u = userInfo(); const p = input.installation; const env = input.ambient;
    85	  if (u.uid !== p.installation_uid || u.homedir !== p.passwd_home || env.SHELL !== u.shell || !env.TERM) return false;
    86	  if (env.PATH !== p.approved_path || !p.approved_path) return false;
    87	  for (const entry of p.approved_path.split(":")) {
    88	    if (!entry || !isAbsolute(entry)) return false;
    89	    const stat = d.stat(d.realpath(entry) as string);
    90	    if (!stat.isDirectory() || (stat.uid !== 0 && stat.uid !== p.installation_uid) || (stat.mode & 0o022) !== 0) return false;
    91	  }
    92	  const temp = env.TMPDIR;
    93	  if (!temp || !isAbsolute(temp)) return false;
    94	  const canonical = d.realpath(temp) as string, info = d.stat(canonical);
    95	  if (!info.isDirectory() || info.uid !== p.installation_uid || (info.mode & 0o7777) !== 0o700) return false;
    96	  for (const root of ["/tmp", "/var/tmp"]) if (inside(canonical, d.realpath(root) as string)) return false;
    97	  if (registrations.some(r => r.environment_allowlist_ref === "claude-code-v1")) {
    98	    if (p.claude_config_dir !== join(p.passwd_home, ".claude-madventures-v5") || env.CLAUDE_CONFIG_DIR !== p.claude_config_dir) return false;
    99	    if (input.invocationArguments.some(arg => arg === "--settings" || arg.startsWith("--settings="))) return false;
   100	    const allowed = new Set(["HOME", "PATH", "SHELL", "TERM", "TMPDIR", "CLAUDE_CONFIG_DIR", "LANG", "LC_ALL", "LC_CTYPE", "USER"]);
   101	    for (const path of input.settingsSources) {
   102	      if (!isAbsolute(path) || !["settings.json", "settings.local.json", "managed-settings.json"].includes(basename(path))) return false;
   103	      let text: string;
   104	      try { text = readFileSync(path, "utf8"); } catch (error) {
   105	        if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
   106	        return false;
   107	      }
   108	      const settings = JSON.parse(text);
   109	      if (!settings || typeof settings !== "object" || Array.isArray(settings)) return false;
   110	      // Fail closed on unknown settings controls: a future provider/endpoint
   111	      // selector cannot silently become authorized by an old validator.
   112	      for (const key of Object.keys(settings)) if (key !== "env") return false;
   113	      if (settings.env !== undefined) {
   114	        if (!settings.env || typeof settings.env !== "object" || Array.isArray(settings.env)) return false;
   115	        for (const [key, value] of Object.entries(settings.env)) {
   116	          if (!allowed.has(key) || typeof value !== "string" || env[key] !== value) return false;
   117	        }
   118	      }
   119	    }
   120	  }
   121	  return true;
   122	}
(lines omitted)
   124	export async function runPurePreflight(input: PreflightInput): Promise<PreflightResult> {
   125	  return runPurePreflightWithDependencies(input, {});
   126	}
(lines omitted)
   155	  try { if (!validateEnvironment(input, admitted, d)) return fail("auth_not_ready"); }
```

packages/supervisor/src/environment.ts — `logs/024-related.log`, SHA-256 `13e3c84c168a0f18f4f2a393c66142c6841711f3621684b6a034769faa2a6956`

```text
    15	  "madv-surface-v1": Object.freeze({
    16	    ref: "madv-surface-v1",
    17	    variables: Object.freeze([
    18	      { name: "HOME", required: true, secret: false },
    19	      { name: "PATH", required: true, secret: false },
    20	      { name: "SHELL", required: true, secret: false },
    21	      { name: "TERM", required: true, secret: false },
    22	      { name: "TMPDIR", required: true, secret: false },
    23	      { name: "MINIMAX_API_KEY", required: true, secret: true },
    24	      { name: "LANG", required: false, secret: false },
    25	      { name: "LC_ALL", required: false, secret: false },
    26	      { name: "LC_CTYPE", required: false, secret: false },
    27	      { name: "USER", required: false, secret: false },
    28	    ].map(variable => Object.freeze(variable))),
    29	  }),
```

packages/adapter-madv-surface/src/index.ts — `logs/023-adapters.log`, SHA-256 `3e2c77d9c132322c85cdca322e1baaa70fb5be66c758570b85d47c09100b4214`

```text
    35	export const EVIDENCE_DEADLINE_MS = 30_000;
    36	const precedence: readonly MadvFailureCause[] = [
    37	  "auth_failed", "endpoint_refused", "provider_error", "identity_unavailable",
    38	  "model_refused", "domain_unresolved", "identity_mismatch",
    39	];
(lines omitted)
    51	export function encodeUserInput(text: string): string {
    52	  return JSON.stringify({ type: "user", message: { role: "user", content: text } }) + "\n";
    53	}
(lines omitted)
    71	export class MadvSurfaceParser {
    72	  private readonly context: MadvContext;
    73	  private readonly events: BoundMadvEvent[] = [];
    74	  private readonly decoder = new TextDecoder("utf-8", { fatal: true });
    75	  private buffer = "";
    76	  private wireSession: string | undefined;
    77	  private state: "init" | "waiting" | "response" | "tools" | "between" = "init";
    78	  private readonly tools = new Map<string, string>();
    79	  private readonly usedToolIds = new Set<string>();
    80	  private assistantSeen = false;
    81	  private responses = 0;
    82	  private waitingForEvidence = true;
    83	  private sentAt: number;
    84	  private failed: MadvFailure | undefined;
    85	  private finished = false;
    86
    87	  constructor(context: MadvContext, private readonly now: () => number = () => performance.now()) {
    88	    this.context = Object.freeze({ ...context, supportedVersions: Object.freeze([...context.supportedVersions]) });
    89	    this.sentAt = now();
    90	  }
(lines omitted)
   108	  push(chunk: string | Uint8Array): MadvResult {
   109	    if (this.finished) { this.fail("identity_mismatch", "event_after_exit"); return this.snapshot(); }
   110	    this.checkDeadline();
   111	    try {
   112	      this.buffer += typeof chunk === "string" ? chunk : this.decoder.decode(chunk, { stream: true });
   113	      let newline: number;
   114	      while ((newline = this.buffer.indexOf("\n")) >= 0) {
   115	        const line = this.buffer.slice(0, newline); this.buffer = this.buffer.slice(newline + 1);
   116	        if (line.trim()) this.line(line);
   117	      }
   118	      // The largest release tool-result event is capped at 100 KB.
   119	      if (this.buffer.length > 262_144) this.fail("identity_mismatch", "oversized_event");
   120	    } catch { this.fail("identity_mismatch", "malformed_stream"); }
   121	    return this.snapshot();
   122	  }
(lines omitted)
   185	  finish(exitCode: number, signal: string | number | null = null): MadvResult {
   186	    if (!this.finished) {
   187	      try { this.buffer += this.decoder.decode(); } catch { this.fail("identity_mismatch", "malformed_stream"); }
   188	      if (this.buffer.trim()) this.line(this.buffer);
   189	      this.buffer = ""; this.checkDeadline(); this.finished = true;
   190	      if (signal !== null) this.fail("provider_error", "signal");
   191	      switch (exitCode) {
   192	        case 0: break;
   193	        case 5: this.fail("auth_failed", "exit"); break;
   194	        case 6: this.fail("endpoint_refused", "exit"); break;
   195	        case 1: this.fail("provider_error", "exit"); break;
   196	        case 3: this.fail("identity_unavailable", "exit"); break;
   197	        case 7: if (this.failed?.cause !== "domain_unresolved") this.fail("model_refused", "exit"); break;
   198	        case 4: this.fail("identity_mismatch", "exit"); break;
   199	        default: this.fail("provider_error", "unknown_exit");
   200	      }
   201	      if (!this.failed && (this.responses === 0 || this.waitingForEvidence)) this.fail("identity_unavailable", "model_response_missing");
   202	      if (!this.failed && this.tools.size !== 0) this.fail("identity_mismatch", "event_order");
   203	    }
   204	    return this.snapshot();
   205	  }
```

packages/adapter-claude-code/src/index.ts — `logs/023-adapters.log`, SHA-256 `3e2c77d9c132322c85cdca322e1baaa70fb5be66c758570b85d47c09100b4214`

```text
     1	// packages/adapter-claude-code/src/index.ts
     2	export { ClaudeCodeAdapter } from "./adapter";
     3	export type {
     4	  AdapterV1,
     5	  ConfigChangeSet,
     6	  LaunchInput,
     7	  ManagedExecution,
     8	  ExecutionIdentity,
     9	} from "./adapter";
    10	export { attestClaudeCode, ModelIdentityUnverifiable } from "./attestation";
    11	export { realShell, fakeShell, resolveExecutable } from "./shell";
    12	export type { Shell, ShellResult } from "./shell";
```

packages/supervisor/src/attestation.ts — `logs/024-related.log`, SHA-256 `13e3c84c168a0f18f4f2a393c66142c6841711f3621684b6a034769faa2a6956`

```text
     6	export const IDENTITY_PROBE_INPUT = '{"type":"user","message":{"role":"user","content":"Report session initialization."}}\n';
(lines omitted)
    62	function firstInit(output: string): Record<string, unknown> | undefined {
    63	  for (const line of output.split("\n")) {
    64	    if (line.trim() === "") continue;
    65	    try {
    66	      const event = JSON.parse(line);
    67	      if (event?.type === "system" && event?.subtype === "init") return event;
    68	    } catch { /* A non-init line is not identity evidence. */ }
    69	  }
    70	  return undefined;
    71	}
    72
    73	export function parseIdentity(output: string, model: string, versions: readonly string[]): boolean {
    74	  const event = firstInit(output);
    75	  return event !== undefined && event.model === model
    76	    && typeof event.claude_code_version === "string"
    77	    && versions.includes(event.claude_code_version);
    78	}
```

packages/broker/src/pty-host-supervisor.ts — `logs/024-related.log`, SHA-256 `13e3c84c168a0f18f4f2a393c66142c6841711f3621684b6a034769faa2a6956`

```text
    74	export interface PtyHostHandle {
    75	  readonly hostPid: number;
    76	  send(f: HostCommandFrame): void;
    77	  facts(): AsyncIterable<HostFactFrame>;
    78	  closeStdin(): void;
    79	  killPgid(): void;
```

packages/protocol/src/lifecycle-events.ts — `logs/024-related.log`, SHA-256 `13e3c84c168a0f18f4f2a393c66142c6841711f3621684b6a034769faa2a6956`

```text
    36	export const INTERRUPTION_REASON_CODES = [
    37	  "child_failure",
    38	  "adapter_failure",
    39	  "pty_host_failure",
    40	  "host_command_deadline_expired",
    41	  "authentication_expired",
    42	  "identity_mismatch",
    43	  "output_sequence_invariant_failed",
    44	  "snapshot_sequence_invariant_failed",
    45	  "ledger_write_failed",
    46	  "broker_invariant_failed",
    47	  "containment_failed",
    48	  "execution_reported_incident",
    49	] as const;
```

test/phase3a/harness-separation.test.ts — `logs/024-related.log`, SHA-256 `13e3c84c168a0f18f4f2a393c66142c6841711f3621684b6a034769faa2a6956`

```text
    20	// Drift requires review; these are expression exceptions, never file exclusions.
    21	const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> = {
    22	  [ROUTER_IMPORTER]: { sha256: "2faefe54d7c9be2051bce621629203072515263d58bc69b31bd2fe927faedb01" },
    23	  "packages/protocol/src/adapter-registry.ts": {
    24	    sha256: "6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4", call: "source[Symbol.iterator]()",
    25	  },
    26	  "packages/protocol/src/lifecycle-events.ts": {
    27	    sha256: "9210012a505848a7379ab7b9cf9d840f33197de58f85b23c359653760479c603", call: "PAYLOAD_SHAPE[knownType](payload)",
    28	  },
    29	  "packages/supervisor/src/build.ts": {
    30	    sha256: "6008c0bab23f1bde66af3744c4731203f509f2890015b853ea6e50d6c4f4c44a", call: "host.handle.facts()[Symbol.asyncIterator]()",
    31	  },
    32	};
```

test/phase3a/architecture-phase3a.test.ts — `logs/025-architecture.log`, SHA-256 `84fcc971829e543ae44f586a7fa5ef36411a10c83dcc0b550371d4de4d245767`

```text
   541	function findRegisteredSurfaceCollectionsInSource(sourceText: string, fileName: string): number[] {
   542	  const sourceFile = ts.createSourceFile(
   543	    fileName,
   544	    sourceText,
   545	    ts.ScriptTarget.Latest,
   546	    /* setParentNodes */ true,
   547	    scriptKindFor(fileName),
   548	  );
   549	  const lineNumbers: number[] = [];
   550
   551	  const visit = (node: ts.Node): void => {
   552	    const elements =
   553	      mapInitializerKeyElements(node) ??
   554	      collectionInitializerElements(node) ??
   555	      mutableCollectionWriteArguments(node);
   556	    if (elements) {
   557	      const carriesRegisteredSurface = elements.some((el) => {
   558	        const unwrapped = unwrapTransparentExpression(el);
   559	        return (
   560	          ts.isStringLiteralLike(unwrapped) &&
(lines omitted)
  1783	  test("launching every production entry point in bounded isolated processes creates no broker.sock", async () => {
  1784	    // ── CLI path: `start --json` must fail closed with the exact gate body.
  1785	    await runEntryPath({
  1786	      args: ["apps/madbridge/src/cli.ts", "start", "--json"],
  1787	      assertOutcome: assertCliOutcome,
  1788	    });
  1789
  1790	    // ── TUI path (default production form, no --fixture): readiness is the
  1791	    // StatusBar's honest disconnected word. DEVIATION FROM PLAN LITERAL
  1792	    // (disclosed): Step 1 names wide-form "NOT CONNECTED"; at this base the
  1793	    // piped renderer emits the medium-format token "NOCONN" (same fact,
  1794	    // same buildStatusLine path), empirically probed at the task base.
  1795	    // The TUI is terminated by the runner (SIGTERM/SIGKILL discipline);
  1796	    // those are expected cleanup outcomes, not unexpected signals.
  1797	    await runEntryPath({
  1798	      args: ["apps/madbridge/src/tui/main.tsx"],
  1799	      readiness: (out) => out.includes("NOCONN"),
  1800	      assertOutcome: (r) => expect(tuiPathFailures(r)).toEqual([]),
  1801	    });
(lines omitted)
  2567	    // Both production entry points, in bounded isolated processes, create no
  2568	    // broker.sock at the legacy path or under MADV_RUNTIME_DIR.
  2569	    await runEntryPath({ args: [CLI_ENTRY, "start", "--json"], assertOutcome: assertCliOutcome });
  2570	    await runEntryPath({
  2571	      args: ["apps/madbridge/src/tui/main.tsx"],
  2572	      readiness: TUI_READY,
  2573	      assertOutcome: (r) => expect(tuiPathFailures(r)).toEqual([]),
  2574	    });
  2575
```

apps/madbridge/test/tui-writers-stage.test.tsx — `logs/025-architecture.log`, SHA-256 `84fcc971829e543ae44f586a7fa5ef36411a10c83dcc0b550371d4de4d245767`

```text
   983	  test("no setTimeout/setInterval/requestAnimationFrame/spinner imports", () => {
   984	    const tuiDir = join(process.cwd(), "apps/madbridge/src/tui");
   985	    const files = listSourceFiles(tuiDir);
   986	    expect(files.length).toBeGreaterThan(0);
   987
   988	    const forbidden = [
   989	      /\bsetTimeout\b/,
   990	      /\bsetInterval\b/,
   991	      /\brequestAnimationFrame\b/,
   992	      /\bclearTimeout\b/,
   993	      /\bclearInterval\b/,
   994	      // Animation/spinner libraries
   995	      /from\s+["'].*spinner/i,
   996	      /from\s+["'].*animate/i,
   997	      /from\s+["'].*marquee/i,
   998	    ];
   999
  1000	    for (const file of files) {
  1001	      const source = readFileSync(file, "utf8");
  1002	      for (const pattern of forbidden) {
  1003	        if (pattern.test(source)) {
  1004	          // tslint:disable-next-line: no-console
  1005	          throw new Error(`Forbidden pattern ${String(pattern)} found in ${file}`);
  1006	        }
  1007	      }
  1008	    }
```

test/phase3a/evidence-pipeline.test.ts — `logs/025-architecture.log`, SHA-256 `84fcc971829e543ae44f586a7fa5ef36411a10c83dcc0b550371d4de4d245767`

```text
   877	  const modules: Record<string, unknown> = {
   878	    "node:fs": { constants: { X_OK: 1 }, accessSync() {}, statSync: stat,
   879	      realpathSync: (path: string) => path, readFileSync: () => Buffer.from("synthetic executable") },
   880	    "node:os": { userInfo: () => ({ uid: 42, homedir: "/fixture-home", shell: "/bin/zsh" }) },
   881	    "node:path": { basename: (path: string) => path.split("/").at(-1), isAbsolute: (path: string) => path.startsWith("/"),
   882	      join: (...parts: string[]) => parts.join("/"), resolve: (path: string) => path, sep: "/" },
   883	    "@madventures/protocol": { ...task57Protocol, parseTaskEnvelope: (value: unknown) => value },
   884	    "../../protocol/src/pair-constraints": { evaluatePairEligibilityWithDependencies: () => ({ ok: true }) },
   885	    "@madventures/storage": { proposeStorageRoot: () => "/fixture-storage", validateStorageRoot: () => ({ ok: true }),
   886	      latestFreshRecord: () => { calls.push("record"); return record; } },
   887	    "./environment": { buildAllowlistedEnvironment: () => ({}), MissingRequiredVariableError: class extends Error {} },
   888	    "./attestation": { IDENTITY_PROBE_INPUT: "synthetic input", runBoundedProbe: probe },
   889	  };
   890	  const module = { exports: {} as { runPurePreflight(input: unknown): Promise<{ ok: boolean; failure?: string; detail?: string }> } };
   891	  new Function("require", "module", "exports", "Bun", javascript)((name: string) => {
   892	    expect(Object.hasOwn(modules, name), `unexpected preflight dependency ${name}`).toBe(true);
   893	    return modules[name];
```

packages/supervisor/test/build-rollback.test.ts — `logs/013-rollback.log`, SHA-256 `55f47ac4f11a3e1bc56a594d1e53f95d5d8b0e93836d66ec28d79e7a2505b5dd`

```text
   593	  // B3 & D3: Package index exports BUILD_STEPS and runTransactionalBuild(input) with only
   594	  // { sessionId, envelope, plan, injectFailureAt? }, and exports no dependency-injection function.
   595	  const indexKeys = Object.keys(supervisorIndex);
   596	  expect(indexKeys).toContain("BUILD_STEPS");
   597	  expect(indexKeys).toContain("runTransactionalBuild");
   598	  expect(indexKeys).not.toContain("runTransactionalBuildWithDependencies");
   599	  expect(indexKeys).not.toContain("runPurePreflightWithDependencies");
   600	  for (const key of indexKeys) {
   601	    expect(key).not.toMatch(/WithDependencies/);
   602	  }
   603
   604	  const f = makeBuildFixture("ses-task46-no-tui");
   605	  const result = await f.run();
   606	  expect(result.ok).toBe(true);
   607	  if (result.ok) {
   608	    expect((result.steps as readonly string[]).includes("tui")).toBe(false);
   609	    expect((result.state.completedSteps as readonly string[]).includes("tui")).toBe(false);
   610	    expect(result.state.resources.some((r) => (r.step as string) === "tui")).toBe(false);
   611	  }
   612
   613	  // B3: Production runTransactionalBuild ignores extra test-seam properties if passed at runtime.
   614	  const fProd = makeBuildFixture("ses-task46-prod-boundary");
   615	  let stepObserverCalled = false;
   616	  const prodResult = trackResult(
   617	    await supervisorIndex.runTransactionalBuild({
   618	      sessionId: fProd.sessionId,
   619	      envelope: fProd.envelope,
   620	      plan: fProd.plan,
   621	      registration: fProd.registration,
   622	      onStep: () => {
   623	        stepObserverCalled = true;
   624	      },
   625	    } as unknown as BuildInput),
   626	  );
   627	  expect(stepObserverCalled).toBe(false);
   628	  expect(prodResult.ok).toBe(false);
   629	  if (!prodResult.ok) {
   630	    expect(prodResult.failedStep).toBe("reattest");
   631	  }
   632	});
   633
   634	test("re-attestation failure before activation prevents any active snapshot", async () => {
   635	  // Case 1: Default ADAPTER_REGISTRY registrations have no live_attester in Phase 3A (B4),
   636	  // so reattest must fail closed under spec section 9.13 via production runTransactionalBuild.
   637	  const fDefault = makeBuildFixture("ses-task46-reattest-default");
   638	  const defaultResult = trackResult(
   639	    await runTransactionalBuild({
   640	      sessionId: fDefault.sessionId,
   641	      envelope: fDefault.envelope,
   642	      plan: fDefault.plan,
   643	    }),
   644	  );
   645	  expect(defaultResult.ok).toBe(false);
   646	  if (!defaultResult.ok) {
   647	    expect(defaultResult.failedStep).toBe("reattest");
   648	    expect(defaultResult.failure).toBe("reattestation_failed");
   649	    expect(defaultResult.detail).toBe("step=reattest execution=builder failure=reattestation_failed");
   650	    expect(defaultResult.partialState.completedSteps).toEqual([
   651	      "storage",
```

packages/supervisor/test/preflight.test.ts — `logs/024-related.log`, SHA-256 `13e3c84c168a0f18f4f2a393c66142c6841711f3621684b6a034769faa2a6956`

```text
   191	test("preflight fails with auth_not_ready", async () => {
   192	  const f = fixture();
   193	  for (const content of ['{"apiKeyHelper":"never-run"}', '{"apiProvider":"firstParty"}', '{"customApiUrl":"fixture"}', '{"env":{"ANTHROPIC_BASE_URL":"fixture"}}', '{"env":{"TERM":"different"}}', '{"env":{"LANG":"unexpected"}}', 'malformed']) {
   194	    writeFileSync(f.settings, content); await failure(f, "auth_not_ready");
   195	  }
   196	  writeFileSync(f.settings, '{}');
   197	  f.input.settingsSources = [join(f.root, '.credentials.json')]; await failure(f, 'auth_not_ready'); f.input.settingsSources = [f.settings];
   198	  f.input.invocationArguments = ["--settings=fixture"]; await failure(f, "auth_not_ready"); f.input.invocationArguments = [];
   199	  const sharedTemporaryRoot = realpathSync(mkdtempSync(join("/tmp", "task45-shared-temp-")));
   200	  roots.push(sharedTemporaryRoot);
   201	  f.input.ambient.TMPDIR = sharedTemporaryRoot; await failure(f, "auth_not_ready"); // Shared /tmp descendant, despite private ownership/mode.
   202	  f.input.ambient.TMPDIR = f.temp;
   203	  for (const key of ["SHELL", "PATH", "CLAUDE_CONFIG_DIR"]) {
   204	    const old = f.input.ambient[key]; f.input.ambient[key] = "different"; await failure(f, "auth_not_ready"); f.input.ambient[key] = old;
   205	  }
   206	  f.input.installation.installation_uid++; await failure(f, "auth_not_ready");
   207	});
```

apps/madbridge/src/commands/export-evidence.ts — `logs/024-related.log`, SHA-256 `13e3c84c168a0f18f4f2a393c66142c6841711f3621684b6a034769faa2a6956`

```text
    12	import { redact, redactWithAllowlist, type EnvironmentAllowlistV1 } from "../../../../packages/supervisor/src/environment";
```

## Baseline at the binding base

| Command | UTC on 2026-11-23 | Initial load | Exit | Log |
| --- | --- | --- | --- | --- |
| Runtime check | 12:08:22–12:08:23 | 4.43 | 0 | `logs/054-resumed-runtime.log`, SHA-256 `2bd25b6d63f9a058365dd2b0e919b9868570df2830498b983bb63a417312cfab` |
| bun install --frozen-lockfile | 12:09:53–12:09:54 | 2.46 | 0 | `logs/056-resumed-install.log`, SHA-256 `09b5a9a3ba849cebafa110420637e38aacd6890b7dfca3798c3c5469c12a5c5f` |
| bunx tsc --noEmit | 12:20:54–12:20:57 | 1.41 | 0 | `logs/061-resumed-types.log`, SHA-256 `3f8cc32a57c932b5baddc273d433e84eea652723b8f8d7ee5068249ace09a1ea` |
| Pre-suite runtime check | 12:26:25–12:26:26 | 1.89 | 0 | `logs/062-pre-suite-runtime.log`, SHA-256 `92f37cbfadb4c7210dd30023509e955e06cb0f9f34c0754e20280287991e2daf` |
| Logged wait | immediately before 064 | 1.96 | 0 | `logs/063-baseline-load.log`, SHA-256 `14220fedef8d3344da065f1ca8456def2ffbf5dfbb690ea7ba74d416c6f19c2a` |
| bun test | 12:27:21–12:30:43 | 1.96 | 0 | `logs/064-resumed-baseline.log`, SHA-256 `36590a0c31beb1f2f612d9aeb2d712783ffb63f63d5bb6fe470a817a5ceabfdf` |

Both runtime checks matched the paths, version, revision and digest from check 007. The frozen install reported 51 packages installed and bun.lock stayed at SHA-256 `a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830`. The install changed the mode of packages/founder-act/src/main.ts from 100644 to 100755. The authorized checkout restored it, and git status printed nothing. The compiler printed nothing.

```text
 2048 pass
 0 fail
 27582 expect() calls
Ran 2048 tests across 151 files. [201.43s]
```

All 2048 result lines were present. The list records file, full name and result without duration in `logs/075-base-list.log`, SHA-256 `501aae2c5064e2f3e0b761685485ede9a89d75c35db6946dc94ff95d6c243a63`. The checkout was clean after the suite.

## Task detail before implementation

Each requirement has one commit. The two surfaces use fixed per-surface comparisons. Every test that needs files uses a private realpath under a disposable home child, its own storage override and stand-in executable directory. Pure parser tests receive synthetic facts. Transcripts identify their stand-ins. Fixture programs consume only controlled arguments, files and input frames.

### R1 — production attester port

In packages/supervisor/src/build.ts share the private implementation of the twelve steps between the existing public entry, the internal dependency seam and a new runLiveTransactionalBuild entry. Copy only the public build arguments. Select the attester by surface through an explicit input function. Pass session id, cancellation and a monitor-failure callback. Derive safe cause names from closed, surface-specific values, retain the first failure, and decide startup failure versus broker interruption at durable activation. Cancel siblings and unwind incomplete startup. Preserve legacy failure detail, including absence of an attester. Export the entry and its input types through src/index.ts. Update the existing separation digest. Tests in packages/supervisor/test/live-port.test.ts use disposable real hosts and stand-ins, with support in test/phase3b/offline.ts. Test names and breaks:

- “the live port passes the session and signal and rejects untrusted failure detail” — break cause selection to accept an unknown reason. B17 and B21.3.
- “a continuous failure before activation fails reattestation for its surface” — suppress the pre-activation failure record. B21.4.

### R2 — Claude Code

Add the input encoder and event reader under packages/adapter-claude-code/src, with exports for attestation, monitoring and input encoding. Subscribe before writing. Maintain one fatal UTF-8 decoder, partial line and consumer loop through the handover. On success retain the subscription. Require matching init, assistant and successful result with positive nonempty usage evidence. Enforce the registration version, firstParty provider, session binding and allowed event types. Count num_turns plus retries and reject tool content or denials. Permit repeated assistant content blocks for the same id and model. Apply fallback, provider and model checks after success. Use monotonic time from the write through the result, with one cancellable timer, and close on failure. Test synthetic transport in test/phase3b/wire-facts.ts with cases in packages/adapter-claude-code/test/live.test.ts:

- “Claude encodes one stream-json user line” — change the encoder terminator. B21.5.
- “Claude subscribes first and accepts only complete firstParty identity evidence” — accept a provider other than firstParty. B21.3.
- “Claude rejects malformed, missing, duplicate and echoed events” — accept echoed input. B21.3.
- “Claude rejects a tool call or a third round-trip” — raise the turn limit to three. B21.3.
- “Claude keeps the result deadline and closes on cancellation” — end the deadline on the first assistant. B21.3.
- “Claude hands a partial line to its monitor and interrupts on fallback or model drift” — discard the partial line or ignore the fallback. B21.4.

### R3 — madv-surface

Add a distinct encodeAttestationInput export. Leave encodeUserInput in place. Add an opt-in launch-attestation mode to MadvSurfaceParser. Only that mode requires one assistant and result, rejects any attestation tool event including unexpected_tool_call, and gives a second model_response the bounded-round-trips cause. Preserve the existing probe and launch behavior for all existing calls. Keep one parser across handover and retain partial UTF-8 and line state. Re-arm the normal request state for later messages. The attester owns the result deadline and cancellation. Cases in packages/adapter-madv-surface/test/live.test.ts:

- “madv encodes no_tools only on the attestation message” — remove no_tools on the attestation write. B21.4 and B21.5.
- “madv requires init, model response, assistant and success in order” — accept a result without an assistant. B21.3.
- “madv rejects attestation tools and extra round-trips by their typed cause” — allow a second response. B21.3.
- “madv waits for result through its deadline and closes on cancellation” — stop the deadline at model_response. B21.3.
- “madv preserves a later partial event and checks later responses” — drop the partial later line. B21.4.

### R4 — detectors

Use registration auth_failure_detection to select auth status, event and exit detectors by surface. Include the madv parser's typed identity and exit outcomes. Produce a surface and cause, mapping auth to authentication_expired, endpoint and provider to adapter_failure and identity failures to identity_mismatch. Keep status-probe exit values separate from governed child exit values. Implement alongside each adapter, wire the live readers through the detectors, and check in test/phase3b/detectors.test.ts with “registration detectors identify auth expiry and attestation failures by surface”. Break recognition of a registered authentication error. B21.6.

### R5 — settings sources and managed settings

Add apps/madbridge/src/tui/live/managed-settings.ts and settings-sources.ts. The pure managedSettingsDirectory(platform) selects the published platform folder. The caller checks platform first, then managed fragments and managed-mcp.json, then the remote copy under the supplied governed configuration directory. Refuse ambiguous filesystem errors. Build user, managed, project and local paths from the supplied folders. The production caller passes process.platform, while tests compare the real platform's result as a string only. Cases in test/phase3b/settings-sources.test.ts:

- “managed settings selects the platform folder and refuses an unsupported platform” — map darwin to the Linux folder. B21.8.
- “managed settings refuses unvalidated files and the governed remote copy” — omit remote-settings.json. B21.8.
- “settings sources include the supplied user, managed, project and local directories” — omit the local path. B21.7.

### R6 — settings keys

Extend validateEnvironment in packages/supervisor/src/preflight.ts with local shape checks and the envelope's Claude model. Keep the existing env key/value equality for other variables and make only the specified DISABLE_AUTOUPDATER exception. Require both named permissions members with their exact types, closed object shapes, the specified effort values, string theme length and alphabet, booleans, editor modes and matching model. Empty plugin and skill maps are valid. Every unknown member fails closed. Add cases to packages/supervisor/test/preflight.test.ts using disposable sources:

- “preflight accepts the governed settings and each allowed setting value” — reject an admitted effort or the updater exception. B21.9.
- “preflight rejects every unlisted settings control and invalid value shape” — allow an unlisted key. B21.9.

### R7 — composition and offline integration

Add apps/madbridge/src/tui/live/composition.ts. Prepare settings and pass them to public preflight. Use the returned plan and actual envelope in the new production build entry. Select each attester by direct surface comparison. One per-start budget reserves the two probes for each surface and guards the write before sending. Forward startup cancellation from the caller and SIGINT/SIGTERM, remove listeners on every outcome, and call present only after a successful active build. Name the failing component and return a nonzero status on failure. Route monitor failures after activation to the broker. Keep process and storage ownership explicit for close. Use relative imports where B16 requires them. main.tsx and cli.ts have no composition call.

The shared offline setup in test/phase3b/offline.ts and new support for these scenarios prepares controlled stand-ins, matching fresh capability records and a disposable worktree. Each stand-in controls its own terminal mode before processing input. The integration test file is test/phase3b/composition.test.ts:

- “both stand-ins pass probes and attestation before present” — suppress present. B21.1.
- “a failed health barrier exits nonzero naming the component” — suppress the failing status. B21.2.
- “a second attester invocation refuses the fourth call before the child receives it” — allow four calls. B21.3.
- “a refused project or local settings file stops composition before launch” — omit the corresponding settings path. B21.7.
- “startup cancellation closes the subscription and ends the stand-in group” — detach the cancellation signal. B21.3.
- “monitor failures after activation durably interrupt with the registered reason” — suppress interruption. B21.4.

### R8 — advisory findings and separation test

Add packages/adapter-madv-surface/test/response-precedence.test.ts with “refused and unknown model families precede a missing response id”. Move the response_id check before both family checks for its break. B21.10. Add “madv allowlist pins the required and secret attribute of every variable” to packages/supervisor/test/madv-allowlist.test.ts. Turn off the MINIMAX_API_KEY requirement for its break. B21.11. In test/phase3b/separation.test.ts add “application code imports neither internal supervisor seam” and “the original public build still fails closed without an attester”. Plant an application import and bypass the legacy missing-attester refusal respectively. B21.12. The prior fixture-integrity coverage supplies the byte check for the third ADVISORY finding, closed by B12.

### R9 — evidence

Under scripts/phase3b run the real composition on the healthy pair, barrier failure, attestation failure and fallback using the shared offline setup. Emit separate healthy transcripts for each surface and one per failed scenario, then SHA256.txt outside the repository. Write sanitized excerpts, stand-in identifiers, offline labels and source digests in docs/verification/phase-3b-m1-evidence.md. Record the distinction between environment and child file access in its working directory, the relative import dependency and the unresolved live PTY echo behavior. The fixed stand-ins do not establish how live surfaces behave. B21.1–3, B23.

### Verification procedure

Run each changed test file with its runtime check and logged load gate. Make each chosen break against committed code, record every result from the targeted file, restore the exact bytes, and compare the status and SHA-256 with the commit. Record any declined break for the Founder. At R9 and again after the log-only closing commit, run the frozen install, typecheck, suite and list comparison. Record exact paths, diff scopes and attribution shape for delivery.

## Source log manifest through task detail

- `001-governed-version.log` — `bd97fb5e9acacee1240d03514f2f90f685dc3dbcadc4c8f606f93c7bbc6c3726`
- `002-pwd.log` — `13f5012f6f160992bb0bb3e07f8527aec38947e3a19895c9e1e3778db445c518`
- `003-branch.log` — `0c16249f3da892cb59011e146830bfa07eb3a44c12c687542d7c90569d54e04c`
- `004-head.log` — `b89f2fbe80edb107eb7f075b85f453a47186a7341348f811184728ee06373831`
- `005-git-name.log` — `6bf075debdf4ac483edaa3a5a9bcb42702fc9b4b82df9b3ef10d09ac6cc8b563`
- `006-git-email.log` — `1949dc61a8d4a04d133aa6ec94ea10079583731f9000cd7131bcf27ab98474e6`
- `007-runtime.log` — `3e2d7aeb52c6505240911f9dc8bfa9beec6234b9d6920d2cce4d11d819fb7672`
- `008-commission.log` — `f5b7f38e0d1a192495225ed9371a9fb528fee16cbb40b419e629ee7d0065a58d`
- `009-base-state.log` — `7c5fcc9647c0ca16960e10d7e3088a17f80b9a3b3547a873e5f715627b81596b`
- `010-folders.log` — `532d5e41e5b725857a3af814b492dd446494aaccf72997114785b524b5985402`
- `011-prompt.log` — `2b01579eca5c79768745d2aacf9c4a830f01ec77530c856c09f0e91419ff4556`
- `012-deliverable.log` — `2cda3feadd038411b23a2cbfd431a00c398a653441fc803857c3b34819333891`
- `013-rollback.log` — `55f47ac4f11a3e1bc56a594d1e53f95d5d8b0e93836d66ec28d79e7a2505b5dd`
- `014-index.log` — `854f55c986c162eb491654c480c64e6c33e501e2258ac7a10677d06e1dc3cfab`
- `015-authority-verification.log` — `5e5ba47cf35c413c3762da6fa678cbdca4233cb5a1a596140ed45685466f0eaa`
- `016-project-instructions.log` — `de195f314f695101eaac77c2456dcfc689d9d7b0cfb97651a17b491172acb8bb`
- `017-standing-rules.log` — `7a0de1b0b6480e47411ae7bc9d5dd7fd4982d0bf2955e03997cd28ef7da4f28e`
- `018-grounds.log` — `fdad9878fac813e931a2fdad4e8be211013b281c795f3c7335b6abd9af8d1eb5`
- `019-preflight-lines.log` — `9978975f1f09e77ce23add965ad099742ae5e582ee93013f3a6f8ae965e84dfd`
- `020-entry.log` — `008751903d3aeadaf88be63c4650a406f915b17d2ab5a0e5a52b3d5cff5d156d`
- `021-scratch.log` — `65b97314405e2b94224d88945988e7efabb3049699abdb78c952b99505e7a64e`
- `022-build-base.log` — `ded0e75dda5acdbedfc1ce218944194f01a0f219a2fbc03d7d11bd45384405a2`
- `023-adapters.log` — `3e2c77d9c132322c85cdca322e1baaa70fb5be66c758570b85d47c09100b4214`
- `024-related.log` — `13e3c84c168a0f18f4f2a393c66142c6841711f3621684b6a034769faa2a6956`
- `025-architecture.log` — `84fcc971829e543ae44f586a7fa5ef36411a10c83dcc0b550371d4de4d245767`
- `026-seam-references.log` — `fcd1e5eb1cdb2085e625e3c2d01818e030a3016c483fc17b31d2707513f4624a`
- `027-tui-and-host.log` — `33c12dbcbf1c2ac5a623a6a70d50e33f2a0bb1e647b24f02359619600bbefeca`
- `028-precondition-imports.log` — `3e78833181bc2de7e7ad0118ab9c99e34f12b24c2a66fc025180de65d23a1460`
- `029-host-and-model.log` — `de6d64f773c350542ed164111cf2821ddf548d25bc40ec8d7a2b2ccabce2c9d5`
- `030-transport.log` — `0ed979596af47edda57a191bdd83594b3f8f4d3c9b3381a9faa31dbb1f605910`
- `031-baseline-hash.log` — `5cf60ab3d73bbb8cb63e5044a68a646562aa25dae1b4a8b3bb2da26d5608e2bf`
- `032-logging-helper.log` — `c42844d6cfc2eba5c38a0190597331a1415aa948a6fd629e56b51451beb2fd09`
- `033-baseline-install.log` — `bf687d4eb8d9b4c274e3f996634138159c9dd257f64745394f470eaf47a6bc1d`
- `034-locked.log` — `19d0635cdcf92c1ebbd1d45faca8850e897d7f0fc922e4757416888e6c6f3c9a`
- `035-install-state.log` — `e7543581bf53d3e7c44ba31e2c26e3f0679b8c1cb66f370a19b5d5b81e8118e0`
- `036-import-lines.log` — `f82f393a636c5baaef0684c7f77039a1997939e8202a730058d3a20d93d026dd`
- `037-transport-context.log` — `50af301a28640b7016298d454d90d635309242f86ad746f5f2b6fd79ddb050a8`
- `038-restore-install-mode.log` — `a4417523cf79033b3e961c3446fb7bb383fa228870baa0e5a48dc09186464db7`
- `039-restored-state.log` — `56d14390a9bbd5ac1864e55a11becd34f9dd081ba1af9273e0d56323f039c1da`
- `040-baseline-types.log` — `ebb983ada6c3506848665278b73aae6a29526a6b162178b370ed20eee419cb79`
- `041-check-helpers.log` — `8e3275661d08198ecd02a8d266a3bd9116a75a2ca4455bf4632e38817970413b`
- `042-baseline-runtime.log` — `7c0650151550ee7d95b47cad5368cb780c9176dc58e7523d8a9c0b80ce0f232a`
- `043-report-source.log` — `61b2eeda335c0bca0f76dd60f7c66c16af1ba6a1d87b4bd3e68ed9caa214b606`
- `044-halt-report.log` — `7267a09736585fc1a1adc440620f254a748ca76fd08f1e33c99b584dc4bbfab5`
- `045-prompt-check.log` — `9ed42e211957366efdc8f21a2e34ac6760700af4a823da6cc001921a45f70de2`
- `046-prompt-files.log` — `adfb111ccba802e6dcff076b8ac1babd158cac6d1d1d3b72a901753d5b68e3e9`
- `047-governed-version.log` — `6802d9eb279e0bcc65208e89fa607672b53e3e02d516e9578022362d1022e982`
- `048-head.log` — `21e52fa18f32feeadb67be3cce89e71014e082d240ee6be6abb9b0492eea4151`
- `049-clean.log` — `01032923767dfd3b1fc9f7f1f1774cfda4f55af4e957f172901b83726aa21d3f`
- `050-halt-report.log` — `99160327d8cc9f1a998611b604d1174da9bfc82c27f8b5d151feec30f08a0d4e`
- `051-runtime-log.log` — `0df01e8576c5a3aa062e2520377676dd061ff45c6a50f2e818faeb3cf298f7ee`
- `052-evidence-dir.log` — `d56bb882cddd92b3592a4f2bb5d1ec79694959055e24ebb3f77041d54bf3958c`
- `053-remove-dependencies.log` — `d5813af0add60eec52e802b30638f3e647b9fad164df5e6f942392916abafd15`
- `054-resumed-runtime.log` — `2bd25b6d63f9a058365dd2b0e919b9868570df2830498b983bb63a417312cfab`
- `055-lock-before.log` — `4595768440915a16a4602a5fdadd099dbad0a28944ff1bac6575f18a00f79586`
- `056-resumed-install.log` — `09b5a9a3ba849cebafa110420637e38aacd6890b7dfca3798c3c5469c12a5c5f`
- `057-lock-after.log` — `ce260707f5b2dff20a9fe067055fbe42e23f20cc9afa349d5506cc3f90b1ff7e`
- `058-install-diff.log` — `e4c06320f1961b541ff27d6360116bc01cf2e9df512aacc117bf2418c963423b`
- `059-restore-mode.log` — `0a1492b7e5f4da264247eb8d1a717b19cc2b95f6af8a8704f326ae9d6f86fca2`
- `060-clean.log` — `252a444c81b6098f9399fed1f6986e2415eda1b9cc061b15c9c755ff3523df28`
- `061-resumed-types.log` — `3f8cc32a57c932b5baddc273d433e84eea652723b8f8d7ee5068249ace09a1ea`
- `062-pre-suite-runtime.log` — `92f37cbfadb4c7210dd30023509e955e06cb0f9f34c0754e20280287991e2daf`
- `063-baseline-load.log` — `14220fedef8d3344da065f1ca8456def2ffbf5dfbb690ea7ba74d416c6f19c2a`
- `064-resumed-baseline.log` — `36590a0c31beb1f2f612d9aeb2d712783ffb63f63d5bb6fe470a817a5ceabfdf`
- `065-health.log` — `10eef9b47c7484a6b3be6f3dd60ef65462fc3fc0b0cb6509bd2025da96d661c3`
- `066-m1-design.log` — `0c73b79a30ea51c34d301c61e3a2d8ba248e14703b98679ddc6cd7d03854fdaf`
- `067-host-protocol.log` — `437ad8139fa349e2dfce7e02f1bc3f3e1d38f9f760c098548726076a1662f4f8`
- `068-file-layout.log` — `b5c7dc168e901378980636b24ebc2037bb3480d7cf175a7da653675896ae307a`
- `069-settings.log` — `0375b3823a0f1acc631d81a8441273764160e2b0edca12d01c444c84a06ac3a4`
- `070-detector-registration.log` — `bbdab59651f1da041609ec99a4abc6cab8be5b67968415790c9345548b9b2458`
- `071-barrier.log` — `d70052975e83ae72d262f1ea1f8bcfbd75a089cbf0d54ee22cba3ffa24121980`
- `072-spec-section.log` — `e380a540389dec0786165a6cffbdfe9a76ac89d6184ebb7baae320740abc8946`
- `073-registration-and-launch.log` — `90f9b5710d840d169d261dc5b9bc137ca913687882eb47bab363aa9a8402ce55`
- `074-budget-and-git.log` — `1c47e685ec7acb60cccc8f41979b286c9757edb3bd0d6a5875cdfe5d8e26a50c`
- `075-base-list.log` — `501aae2c5064e2f3e0b761685485ede9a89d75c35db6946dc94ff95d6c243a63`
- `076-base-receipt.log` — `9f01d4a3c031798e18eae4a93191dab19aa282899255651b1561d8df1be60e5c`
- `077-settings-and-cwd.log` — `1cec5131a551f1fe7b68c1d5e83d60f51dd1f4f9a390fb99a119f60c993f5a4b`
- `078-input-guards.log` — `5923bfb5137b9f3ff5d63b995eb60691c182c9c5039f02033ff0f03db8429909`
- `079-broker-and-barrier.log` — `cb8f1ae9b71d537cbd8f8e1a3bbe0061daf5f41488c9b0d55e89e0f2984bfc93`
- `080-storage-limits.log` — `06a2e3d142e82e40a733ced32f8240cfb411ef1d93332216e558cbdeb44e4fdf`
- `081-composition-import-rules.log` — `d7b694796816d53e6b9b663a08e60e28947a2f82f431e17f93a31f2e4caec11f`
- `082-record-fixtures.log` — `9b13b4922d0df6f32aeb9d9502a9c135e82c49b817416a7e394ca2255c83975d`
- `083-spec-constraints.log` — `f9aa0b1b90a5a96b9447cfa8b2bfc9d4b26655a28b6073e907f27ea25ad7bea4`
- `084-probe-path.log` — `6c4b755aeb8349f8c20f8b7d829ac7393b7432838b6c0ff536d7b6eaa97ba7ee`
- `085-allowlist.log` — `5a9d814dee933d4e8ad6a0f2b14babb4272645dacb5036713516bed19677b1ae`
- `086-storage-files.log` — `e9420f0484c69a34a877e159a5307d25951d264baa893ef191adc9370fc5fe6c`
- `087-base-preflight-import.log` — `a5f2f4752716d6a7c1b4c3c3bf2a1c7946fb3f90bd2941363a20051eed6d23f1`
