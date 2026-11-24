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

## Closing record

Full run at bbaa5e4149c8067bff81e77ad467671c170ee56b. The opening above is preserved byte for byte.

### Changes by requirement

**R1.** In packages/supervisor/src/build.ts, runLiveTransactionalBuild supplies the surface-specific attesters to the existing transactional steps. LiveReattestationInput carries the session, signal and failure callback. The build selects the failure detail and records the first continuous failure on the appropriate side of activation. packages/supervisor/src/index.ts exports the production port and input types. test/phase3a/harness-separation.test.ts pins the new build digest. packages/supervisor/test/live-port.test.ts exercises the port using the disposable directories, repository, storage and stand-ins from test/phase3b/offline.ts.

**R2.** packages/adapter-claude-code/src/live.ts implements encodeUserInput, ClaudeReader and attestClaudeSession. A single subscription and parser span attestation and monitoring. The monotonic deadline covers the result. The adapter index exports these operations. packages/adapter-claude-code/test/live.test.ts and test/phase3b/wire-facts.ts exercise synthetic frames, cancellation, close and handover.

**R3.** packages/adapter-madv-surface/src/index.ts adds a separate encodeAttestationInput and opt-in launch context on MadvSurfaceParser. Existing probe and encoder callers retain their form. packages/adapter-madv-surface/src/live.ts runs attestMadvSession, retains the parser, and enforces the startup budget, deadline and result. packages/adapter-madv-surface/test/live.test.ts covers both encoder forms and startup and continuous identity checks.

**R4.** Each adapter's src/detectors.ts reads its registered detection rules. detectMadvFailure also handles the registered surface events and exit codes. Each adapter connects the detector through its src/index.ts and src/live.ts and exercises it through its test/live.test.ts. test/phase3b/detectors.test.ts covers the surface and cause returned.

**R5.** In apps/madbridge/src/tui/live/, managed-settings.ts supplies managedSettingsDirectory and settings-sources.ts supplies settingsSources. The caller checks the platform, managed fragments and policy files, and the remote settings copy before preflight. test/phase3b/settings-sources.test.ts exercises these stops and the four supplied locations.

**R6.** packages/supervisor/src/preflight.ts passes the envelope's Claude model into validateEnvironment. The B19 key and value rules run on preflight's existing path. packages/supervisor/test/preflight.test.ts adds acceptance and refusal cases. test/phase3b/preflight-input.ts uses a disposable storage override, synthetic identity records and the real public preflight.

**Addendum 2.** In packages/pty-host/src/terminal.ts, spawnGoverned clears only ECHO before spawn. In packages/pty-host/test/main-guard.test.ts lines 309 and 335, the expected bytes are the single line produced by cat. test/phase3b/pty-input-echo.test.ts gates the stand-in's first read on the host's acknowledgement and checks the complete output.

**R7.** apps/madbridge/src/tui/live/composition.ts wires settings, pure preflight, live build, the per-surface write budgets, present, cancellation and shutdown. test/phase3b/scenarios.ts calls the production path and checks durable interruption and group termination. test/phase3b/stand-in.ts reads and writes controlled stream-json lines. test/phase3b/offline.ts creates currently valid envelopes. test/phase3b/composition.test.ts covers the barrier and both probes and attesters, cancellation, the fourth call, the four settings sources, and interruption.

**R8.** packages/adapter-madv-surface/test/response-precedence.test.ts checks two absent-response-id cases. packages/supervisor/test/madv-allowlist.test.ts checks each variable's required and secret attributes through construction and redaction. test/phase3b/separation.test.ts inspects application source and calls the original public build without an attester.

**R9.** scripts/phase3b/healthy-starts.ts records two independent starts. scripts/phase3b/failures.ts records the barrier, wrong model and fallback. scripts/phase3b/transcript.ts publishes complete transcripts under the supplied directory. docs/verification/phase-3b-m1-evidence.md quotes them and records the limitations.

### Implementation commits and message checks

0cb595500c5775d6d77a64fe01fd723100b1bf1f  parent 75aec139d503cbe1d34d0c6f3ac5bd514339570e
docs(verification): open the M1 build log with its task detail
Width and three final trailers verified. 089-message-opening.log, SHA-256 ffb6ca115cf0a22f40a0ad2c30df24872fda18010d5ec036106277c6236fc4f0

9542eb4b27f0ce009a389feb50d8eff68e7f0878  parent 0cb595500c5775d6d77a64fe01fd723100b1bf1f
feat(supervisor): install live attesters through the production build
Width and three final trailers verified. 114-r1-message-check.log, SHA-256 d81ffe66ea31521e05886f9282a63ee1bd8586babeea32b42b79af87bb93b813

dd19008a74a2ffbd85703f9dbb031a23e8571702  parent 9542eb4b27f0ce009a389feb50d8eff68e7f0878
test(supervisor): bound live-port failure diagnostics
Width and three final trailers verified. 146-fix-trailers.log, SHA-256 2ea8b955385e07f5c84a9ddc3f30d2e0a8953b58da4728da54fc70e3d10e47e4

0b85d3a2403527eb08182f96843b97b58db5d9c4  parent dd19008a74a2ffbd85703f9dbb031a23e8571702
feat(claude-code): attest and monitor the governed response stream
Width and three final trailers verified. 176-r2-message-check.log, SHA-256 b255ee4547dcc21bb8ea9e14742dcc9ba0b0423b1de66c897947e7c002bd957f

54eee8cdcb6703d7c1addf6b643ad0eefec75811  parent 0b85d3a2403527eb08182f96843b97b58db5d9c4
feat(madv): attest the first request and monitor later responses
Width and three final trailers verified. 262-r3-trailers.log, SHA-256 b0f4c3c05fc8a0882756c681466c5d80ed1265fab15ab41c9debc0a8869d6431

16a11409c10787f7413d0b99493b0938567e5eee  parent 54eee8cdcb6703d7c1addf6b643ad0eefec75811
feat(adapters): detect registered authentication and identity failures
Width and three final trailers verified. 348-new-r4-trailers.log, SHA-256 a66b44145029e6e3da0ae1f1f07ca992aa67d5a4291c35820f064a5e9011fee6

68ac32c85278d27eb76541ea9d7f18a0a12f87ed  parent 16a11409c10787f7413d0b99493b0938567e5eee
feat(tui): check managed policy and resolve settings sources
Width and three final trailers verified. 381-r5-trailers.log, SHA-256 5597b6eb273bc46d2b38ef5ce2cc5414226122e7db56eda6bf2c4e8eedf000ba

d5d40d6dcd90a930c106cec55ea836c5cc4400ce  parent 68ac32c85278d27eb76541ea9d7f18a0a12f87ed
feat(supervisor): validate governed settings against the envelope
Width and three final trailers verified. 420-r6-trailers.log, SHA-256 ae7db96f80fb434c55237ad188e4809d5b0756ca8977727b727000de2829a386

f1fdd9e646ee1c4aa0ddad136a19da13db2600ec  parent d5d40d6dcd90a930c106cec55ea836c5cc4400ce
fix(pty-host): disable terminal input echo before spawning the child
Width and three final trailers verified. 555-verify-echo-message.log, SHA-256 57039679f67d7678b59ee018bd9507101bbf25986f06e2a5ec65c0e12faef014

aedcdc025219a6ad4147d01d9ead8a5fd73575ea  parent f1fdd9e646ee1c4aa0ddad136a19da13db2600ec
feat(tui): compose the governed foreground session behind its barrier
Width and three final trailers verified. 630-r7-commit-width-and-attribution.log, SHA-256 545f2d98710625e50fb803f7eb55a495ccab4a5e6c2daa5cd94c76299b247f45

2f89e2e4b5ac7abeaa936cb68aa996e52795c664  parent aedcdc025219a6ad4147d01d9ead8a5fd73575ea
test: cover response precedence, environment rules and seam isolation
Width and three final trailers verified. 699-check-r8-message.log, SHA-256 afcd209bbde0bd7d07de22930678b46dc645e584c168c178e893fff685bde663

bbaa5e4149c8067bff81e77ad467671c170ee56b  parent 2f89e2e4b5ac7abeaa936cb68aa996e52795c664
test(verification): record offline M1 startup and failure transcripts
Width and three final trailers verified. 754-r9-trailers.log, SHA-256 abc7361681301aad85735c7f86bbe19df629e70b126d5e914cca26ff66979583

### Tests added

| File | Test | Ruling |
| --- | --- | --- |
| packages/adapter-claude-code/test/live.test.ts | Claude encodes one stream-json user line | B21.5 |
| packages/adapter-claude-code/test/live.test.ts | Claude hands a partial line to its monitor and interrupts on fallback or model drift | B21.4 |
| packages/adapter-claude-code/test/live.test.ts | Claude keeps the result deadline and closes on cancellation | B21.3 |
| packages/adapter-claude-code/test/live.test.ts | Claude rejects a tool call or a third round-trip | B21.3 |
| packages/adapter-claude-code/test/live.test.ts | Claude rejects malformed, missing, duplicate and echoed events | B21.3 |
| packages/adapter-claude-code/test/live.test.ts | Claude subscribes first and accepts only complete firstParty identity evidence | B21.1,3 |
| packages/adapter-madv-surface/test/live.test.ts | madv encodes no_tools only on the attestation message | B21.4,5 |
| packages/adapter-madv-surface/test/live.test.ts | madv preserves a later partial event and checks later responses | B21.4 |
| packages/adapter-madv-surface/test/live.test.ts | madv rejects attestation tools and extra round-trips by their typed cause | B21.3 |
| packages/adapter-madv-surface/test/live.test.ts | madv requires init, model response, assistant and success in order | B21.1,3 |
| packages/adapter-madv-surface/test/live.test.ts | madv waits for result through its deadline and closes on cancellation | B21.3 |
| packages/adapter-madv-surface/test/response-precedence.test.ts | refused and unknown model families precede a missing response id | B21.10 |
| packages/supervisor/test/live-port.test.ts | a continuous failure before activation fails reattestation for its surface | B21.4 |
| packages/supervisor/test/live-port.test.ts | the live port passes the session and signal and rejects untrusted failure detail | B21.3 |
| packages/supervisor/test/madv-allowlist.test.ts | madv allowlist pins the required and secret attribute of every variable | B21.11 |
| packages/supervisor/test/preflight.test.ts | preflight accepts the governed settings and each allowed setting value | B21.9 |
| packages/supervisor/test/preflight.test.ts | preflight rejects every unlisted settings control and invalid value shape | B21.9 |
| test/phase3b/composition.test.ts | a failed health barrier exits nonzero naming the component | B21.2 |
| test/phase3b/composition.test.ts | a second attester invocation refuses the fourth call before the child receives it | B21.3 |
| test/phase3b/composition.test.ts | both stand-ins pass probes and attestation before present | B21.1 |
| test/phase3b/composition.test.ts | composition refuses disallowed user, managed, project and local settings before launch | B21.7 |
| test/phase3b/composition.test.ts | monitor failures after activation durably interrupt with the registered reason | B21.3,4 |
| test/phase3b/composition.test.ts | startup cancellation closes the subscription and ends the stand-in group | B21.3 |
| test/phase3b/detectors.test.ts | registration detectors identify auth expiry and attestation failures by surface | B21.6 |
| test/phase3b/pty-input-echo.test.ts | the PTY host does not echo a line written before the child reads it | Addendum 2 B3.1 |
| test/phase3b/separation.test.ts | application code imports neither internal supervisor seam | B21.12 |
| test/phase3b/separation.test.ts | the original public build still fails closed without an attester | B21.12 |
| test/phase3b/settings-sources.test.ts | managed settings refuses unvalidated files and the governed remote copy | B21.8 |
| test/phase3b/settings-sources.test.ts | managed settings selects the platform folder and refuses an unsupported platform | B21.8 |
| test/phase3b/settings-sources.test.ts | settings sources include the supplied user, managed, project and local directories | B21.7 |

### Task-detail changes and self-fixes

- R1's first fixture in log 102 used the same path for the repository and worktree. It now supplies the disposable worktree's .git path and verifies its fingerprint. The two R1 cases passed after the correction.
- R1's failure-detail test received the fixed synthetic text under Addendum 1. The deleted log is cited in Deviations. The change went in a separate commit because R1 had already been committed.
- R4's first typecheck in log 338 found four errors involving expected-cause types and exact optional properties. The adapters and test expectations now use the closed cause types, and the optional parser reason is included only when defined. The typecheck in 349 and test run in 351 passed.
- R7's first integration run in 472 used an expired fixture envelope. Its creation and expiry are now relative to the fixture's creation time. Runs 478 and 485 then exposed the independent PTY echo. Observation 488 identified the written user frame before the stand-in's startup marker and first read. The temporary observer was removed and checked in 508. The Founder amended the allowed paths in Addendum 2.
- In Addendum 2's new test, log 576 received no numeric exit code from the naturally exiting stand-in. After it acknowledges the exact input, the stand-in now waits for the host's terminate command and exits successfully on SIGTERM. Both complete output and exit code passed in 581. The patch utility's backup matched the original authored test and was moved to the builder's scratch directory, verified in logs 590 and 591. It was never committed.
- R7's settings-source test was expanded from project and local refusal to all four independent locations. The full six-case file passed in 632. The test name reflects this expanded coverage.
- The load waits 435, 465 and 553 reached 20 minutes. Testing resumed after the Founder's quiet notices and the successful repeated waits in 454, 471 and 559. Run 611 started at a first reading of 4.17 following an approval delay after its successful wait and passed all five cases. Subsequent test approvals cover a separately logged load wait immediately before the Bun command in the same foreground shell.

### Deviations

The Founder upheld three halts.

1. Runtime check 042 used the barred Homebrew Bun 1.4.5 after a nested shell changed resolution. The Founder invalidated the frozen install in 033, typecheck in 040 and check 042. After the install directories were removed the baseline was restarted under verified Bun 1.4.2. The first halt report has SHA-256 `eed8bc988d68dc9e1b601cba8ee3e0e3fecc80bd92fadfa45059027d5714f730`. 042-baseline-runtime.log, SHA-256 7c0650151550ee7d95b47cad5368cb780c9176dc58e7523d8a9c0b80ce0f232a.
2. The live-port break emitted an unsanitized diagnostic. The Founder deleted log 124, SHA-256 `7294cb12c91044601c50df986f5566f930178b53dc3fd46dcef26300f8a34044`. DEC-20261123-01 Addendum 1 has SHA-256 `5cd930a3f2dbb8f3a85c63cfba5ed95f8088418ee132e89872d57e63fad75666`; resume message 2 has SHA-256 `611e62f080409fe686392d45455622d509732bea2875e4a754cdb4c00f5263e5`. Commit dd19008a74a2ffbd85703f9dbb031a23e8571702 fed the port fixed synthetic diagnostic text. The repeated break failed its target on that text. 152-break-test.log, SHA-256 7d9d45506b5712682a1511ecc707c7ea15c1965afef67797f2f80bbbb86125af.
3. The host echoed the prompt before the stand-in could read it. The third halt report has SHA-256 `90bd5248ced3c56996588b44de5b0204efff1dbc059dae0e9b7d5d30d730479d`. DEC-20261123-01 Addendum 2, SHA-256 `f524cb055c363c57dbcaf25dc037645989d453a942f3ce120c7083735e6cc52c`, authorized the Phase 3A runtime change and two lines of its lifecycle test. Resume message 3 has SHA-256 `7176750c77c97b52bb9a0f0e16f5d6ea68f7be8ed27b5f209a0940e7bff9f1ea`. Commit f1fdd9e646ee1c4aa0ddad136a19da13db2600ec clears the echo bit before spawn. Both adapter tests still reject an input line returned as output. Their synthetic streams already supply that line. The composition stand-in no longer changes terminal mode, does a silent first read or saves the prompt in a file. Its small launcher changes to the disposable working directory, records the process-group leader and executes the stand-in implementation. Logs 607, 609 and 611 verify those decisions.

DEC-20261024-01 B2. In commit 9542eb4b27f0ce009a389feb50d8eff68e7f0878 the SHA-256 of packages/supervisor/src/build.ts changed from `6008c0bab23f1bde66af3744c4731203f509f2890015b853ea6e50d6c4f4c44a` to `50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d`. The one allowed computed call obtains the async iterator on host.handle.facts() and is unchanged. No exception was added. The quoted diff has trailing whitespace removed. 117-r1-pin.log, SHA-256 722a1e6b703c71e45bce26e6a89191eafd7790de43e3860b0bb15042d8c4d413.

```diff
diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts
index d3221df..326687a 100644
--- a/test/phase3a/harness-separation.test.ts
+++ b/test/phase3a/harness-separation.test.ts
@@ -27,7 +27,7 @@ const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> =
     sha256: "9210012a505848a7379ab7b9cf9d840f33197de58f85b23c359653760479c603", call: "PAYLOAD_SHAPE[knownType](payload)",
   },
   "packages/supervisor/src/build.ts": {
-    sha256: "6008c0bab23f1bde66af3744c4731203f509f2890015b853ea6e50d6c4f4c44a", call: "host.handle.facts()[Symbol.asyncIterator]()",
+    sha256: "50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d", call: "host.handle.facts()[Symbol.asyncIterator]()",
   },
 };
```

The Phase 3A runtime and test diffs below have trailing whitespace removed. 550-confirm-addendum-diff.log, SHA-256 ebc957d1b7eb5e0deac07553c4ce59db08ab885a927bca00b1ab2f6ec03b9593.

```diff
diff --git a/packages/pty-host/src/terminal.ts b/packages/pty-host/src/terminal.ts
index 786b29f..9009665 100644
--- a/packages/pty-host/src/terminal.ts
+++ b/packages/pty-host/src/terminal.ts
@@ -76,6 +76,7 @@ export function spawnGoverned(
       }
     },
   });
+  terminal.localFlags &= ~8; // ECHO on macOS and Linux.
   const child = Bun.spawn([path, ...argv], {
     terminal,
     detached: true,
diff --git a/packages/pty-host/test/main-guard.test.ts b/packages/pty-host/test/main-guard.test.ts
index 8e888bf..87f1dd5 100644
--- a/packages/pty-host/test/main-guard.test.ts
+++ b/packages/pty-host/test/main-guard.test.ts
@@ -306,7 +306,7 @@ test("a valid session lifecycle emits every fact in order exactly once, with no

   host.write(encodeCommand({ kind: "input", bytes: new TextEncoder().encode("ping\n") }));
   await host.waitForFact((f) => f.kind === "ack" && f.ofKind === "input");
-  await host.waitForOutputContaining("ping\r\nping\r\n"); // local echo + /bin/cat's own echo
+  await host.waitForOutputContaining("ping\r\n"); // Output of /bin/cat.

   host.write(encodeCommand({ kind: "resize", cols: 90, rows: 30 }));
   await host.waitForFact((f) => f.kind === "ack" && f.ofKind === "resize");
@@ -332,7 +332,7 @@ test("a valid session lifecycle emits every fact in order exactly once, with no

   const acks = facts.filter((f) => f.kind === "ack");
   expect(acks.map((f) => f.ofKind).sort()).toEqual(["input", "resize", "terminate"]);
-  expect(outputText(facts)).toBe("ping\r\nping\r\n");
+  expect(outputText(facts)).toBe("ping\r\n");

   const termStartedIdx = kinds.indexOf("termination_started");
   const terminateAckIdx = facts.findIndex((f) => f.kind === "ack" && f.ofKind === "terminate");
```

The retained third halt report cites the following source logs. Log 124 is cited above by the digest the Founder recorded before deleting it.

- 033-baseline-install.log, SHA-256 bf687d4eb8d9b4c274e3f996634138159c9dd257f64745394f470eaf47a6bc1d
- 040-baseline-types.log, SHA-256 ebb983ada6c3506848665278b73aae6a29526a6b162178b370ed20eee419cb79
- 042-baseline-runtime.log, SHA-256 7c0650151550ee7d95b47cad5368cb780c9176dc58e7523d8a9c0b80ce0f232a
- 064-resumed-baseline.log, SHA-256 36590a0c31beb1f2f612d9aeb2d712783ffb63f63d5bb6fe470a817a5ceabfdf
- 075-base-list.log, SHA-256 501aae2c5064e2f3e0b761685485ede9a89d75c35db6946dc94ff95d6c243a63
- 117-r1-pin.log, SHA-256 722a1e6b703c71e45bce26e6a89191eafd7790de43e3860b0bb15042d8c4d413
- 417-r6-test.log, SHA-256 bf281e116dbd14cdfa0269e131c13dd611aae49f4f695321c3f4cf3823dc8529
- 418-r6-types.log, SHA-256 0b744786f9a112a41b234c5018c8a8df095891c9bf2f8b111a3e3f3e5e4d0df6
- 454-extra-setting-load-repeat.log, SHA-256 8b83f98862e43270ef2e760b3acac906c056fac4ed50929b3e1a8a83a696271b
- 455-extra-setting-test.log, SHA-256 62c746dd2aaed6ddc04de196f18568ddbef66f2fb82b4fe37d6d0f735e69f2df
- 458-extra-setting-verified.log, SHA-256 4b9ce236c8b96ee6e35b9ce5c96bd649db9f3e41199705134f15fd8d9e562387
- 464-r7-types.log, SHA-256 a897cab47600962d3c30cd3ca75c538a3ae90ba7ebb45aeab6c989264b8d4958
- 471-r7-load-repeat.log, SHA-256 51606ce8accf78ae7294a2cfd9fc1828459f100f40281ce9517ea42ac9a70e4c
- 472-r7-composition.log, SHA-256 8c5459c2c1e09ab96f3734540b8ad1ccf99db3fe4b6d8114ef4f9ea98169a340
- 478-composition-retest.log, SHA-256 333b22d8f796847764115addaad45f820e2c21fa1641aab8146f8a178b6da4f4
- 485-bootstrap-test.log, SHA-256 fe9321c5f103632aac2c50e3ff6c7d52a5e7bb8f38f4142beef053b8abbe0c16
- 488-wire-classification.log, SHA-256 243098c8752897de10961d27818816b9f0633e75c9d252666837ef0a23b168f6
- 489-host-readiness-lines.log, SHA-256 e1496522201d4b89d1c4e28597b35a6492ff54297248ddad7f94f58b088ab8d7
- 490-pty-creation-lines.log, SHA-256 ce89e745788f560e27d51f67515b7a3f6384655af476832851b2357609a8fac6
- 492-check-transport-path.log, SHA-256 ff38c8360a60dfee864be9819a6dc8a5fa32c139398d36bdb02935477015151a
- 499-echo-rule.log, SHA-256 5870b97bf4c52a46eeefddfdbcc5a9f1d644411e874fbd5b8df1a258159e510a
- 504-wire-observation-diff.log, SHA-256 51dc314f96d7ef296cb5e6977e99808b729f927a1b6587aaa41cf6f1251a9249
- 508-verify-diagnostic-restore.log, SHA-256 19d3efcbd760706b9862bf4425f734117b6de02c92bc0302908994c6b2f65750
- 509-halt-commits.log, SHA-256 2f29d8d87ee70db1f58f1aa455e409e33bf0b0cd1594850f9fafbe627931cea1
- 510-halt-source-digests.log, SHA-256 45ad2f1a8a463abacdbcfdf99a24c0715f292ad15047a84f0c7b0f45cba91dba
- 511-verify-transport-untouched.log, SHA-256 263a62b7e480a4d5b93e7a1ec8e098dcb2388969c5f7d92452dd028c08d0d66a
- 517-check-evidence-at-halt.log, SHA-256 18082aebae09fb2ceff857cae924ec1b1bbc1398e12aca9236be7ac299f3719b
- 518-pre-halt-log-digests.log, SHA-256 5da3ccf17e8946ab7091f41a23986813af44bebec60a352de1ca88a8dce31878

### Deliberate breaks

Each subsection gives the working diff, the targeted file's actual test results and the verified restore. Quoted lines are right-trimmed. The commands and complete original bytes are in the cited logs. Addendum 2 removed one line once and ran two files against that same break. No break was declined.

### R1 closed failure detail

Diff with trailing whitespace removed. 149-repeat-break-diff.log, SHA-256 ea2a1cd4b916d95a8e4dd59701d5f4b6fc7c2ee197d27191e1d1d0c425036170

```diff
diff --git a/packages/supervisor/src/build.ts b/packages/supervisor/src/build.ts
index 94f7887..0459ff6 100644
--- a/packages/supervisor/src/build.ts
+++ b/packages/supervisor/src/build.ts
@@ -151,7 +151,7 @@ function liveFailureCause(surface: SurfaceId, reported: unknown): string {
     ? ["endpoint_refused", "provider_error", "identity_unavailable", "model_refused", "domain_unresolved"]
     : ["attestation_missing", "attestation_malformed", "attestation_duplicate"];
   return shared.find(item => item === reported) ?? specific.find(item => item === reported)
-    ?? (surface === "madv-surface" ? "identity_mismatch" : "attestation_malformed");
+    ?? String(reported);
 }

 export interface LiveReattestationRecord {
```

152-break-test.log, SHA-256 7d9d45506b5712682a1511ecc707c7ea15c1965afef67797f2f80bbbb86125af

```text
bun test v1.4.2 (744846f84)

packages/supervisor/test/live-port.test.ts:
20 |       expect(seen[0]!.signal).toBeInstanceOf(AbortSignal);
21 |       expect(result.ok).toBe(false);
22 |       if (result.ok) throw new Error("expected a failed build");
23 |       expect(result.failedStep).toBe("reattest");
24 |       expect(result.failure).toBe("reattestation_failed");
25 |       expect(result.detail).toBe("step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=attestation_malformed");
                                 ^
error: expect(received).toBe(expected)

Expected: "step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=attestation_malformed"
Received: "step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=M1 synthetic refusal"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/supervisor/test/live-port.test.ts:25:29)
(fail) the live port passes the session and signal and rejects untrusted failure detail [684.36ms]
(pass) a continuous failure before activation fails reattestation for its surface [696.75ms]

 1 pass
 1 fail
 12 expect() calls
Ran 2 tests across 1 file. [1414.00ms]
```

155-verify-repeat.log, SHA-256 4d8e9f7063a6e6b05aa86776edf3754f16f82db932974f2760b0931c0a64ae1d

```text
committed 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d packages/supervisor/src/build.ts
restored 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d packages/supervisor/src/build.ts
git status --porcelain for the restored path is empty
```

### R1 monitor failure before activation

Diff with trailing whitespace removed. 161-break-monitor-diff.log, SHA-256 d9590e77ffd7f13e56dd85a58a4994992f3493a3ba2831ac7b44122f5f274d49

```diff
diff --git a/packages/supervisor/src/build.ts b/packages/supervisor/src/build.ts
index 94f7887..bb1d7ff 100644
--- a/packages/supervisor/src/build.ts
+++ b/packages/supervisor/src/build.ts
@@ -1012,7 +1012,7 @@ async function executeBuild(
             if (reg === undefined || typeof attester !== "function") {
               return refuse(execution.surface === "madv-surface" ? "identity_unavailable" : "attestation_missing");
             }
-            const notifyFailure = (reason: string) => reportFailure(host.executionId, execution.surface, reason);
+            const notifyFailure = (_reason: string) => {};
             let verdict: LiveReattestationResult;
             try {
               if (signal.aborted) return refuse("attestation_cancelled");
```

164-monitor-test.log, SHA-256 f7704054d61a75fb801b59618fa584664ef6730554932cf0514199c06c654a12

```text
bun test v1.4.2 (744846f84)

packages/supervisor/test/live-port.test.ts:
(pass) the live port passes the session and signal and rejects untrusted failure detail [689.13ms]
38 |         else monitorFailure!("identity_mismatch");
39 |         return { ok: true, evidenceKind: "actual_session", model: input.model, provider: input.provider };
40 |       },
41 |     });
42 |     try {
43 |       expect(result.ok).toBe(false);
                             ^
error: expect(received).toBe(expected)

Expected: false
Received: true

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/supervisor/test/live-port.test.ts:43:25)
(fail) a continuous failure before activation fails reattestation for its surface [142.14ms]

 1 pass
 1 fail
 8 expect() calls
Ran 2 tests across 1 file. [857.00ms]
```

167-monitor-verified.log, SHA-256 03d25b7c4a606aa8338ca27dce3e667ec53005143b23bdbf5a88ce9e4d18050d

```text
committed 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d packages/supervisor/src/build.ts
restored 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d packages/supervisor/src/build.ts
git status --porcelain for the restored path is empty
```

### R2 input encoder

Diff with trailing whitespace removed. 182-encoder-diff.log, SHA-256 612cad54423f7cc4214c32a1dc1cf73e76427fa6de12b85fee039c90e4b65788

```diff
diff --git a/packages/adapter-claude-code/src/live.ts b/packages/adapter-claude-code/src/live.ts
index 014aa11..69a8ebc 100644
--- a/packages/adapter-claude-code/src/live.ts
+++ b/packages/adapter-claude-code/src/live.ts
@@ -2,7 +2,7 @@ const PROMPT = "Reply with your model identifier and nothing else.";
 const DEADLINE_MS = 30_000;

 export function encodeUserInput(text: string): string {
-  return JSON.stringify({ type: "user", message: { role: "user", content: text } }) + "\n";
+  return JSON.stringify({ type: "user", message: { role: "user", content: "changed" } }) + "\n";
 }

 type Cause = "attestation_missing" | "attestation_malformed" | "attestation_duplicate" |
```

185-encoder-test.log, SHA-256 7c2146f45e5e90b02be40a3693815f871cbee87f2e1a8d14e2cac8f7b7d9603f

```text
bun test v1.4.2 (744846f84)

packages/adapter-claude-code/test/live.test.ts:
28 |   } else throw new Error("unexpected successful attestation");
29 |   expect(wire.closed).toBe(1);
30 | }
31 |
32 | test("Claude encodes one stream-json user line", () => {
33 |   expect(encodeUserInput('say "hi"\n')).toBe('{"type":"user","message":{"role":"user","content":"say \\"hi\\"\\n"}}\n');
                                             ^
error: expect(received).toBe(expected)

- "{"type":"user","message":{"role":"user","content":"say \"hi\"\n"}}
+ "{"type":"user","message":{"role":"user","content":"changed"}}
  "

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:33:41)
(fail) Claude encodes one stream-json user line [1.37ms]
(pass) Claude subscribes first and accepts only complete firstParty identity evidence [3.41ms]
(pass) Claude rejects malformed, missing, duplicate and echoed events [1.04ms]
(pass) Claude rejects a tool call or a third round-trip [0.29ms]
(pass) Claude keeps the result deadline and closes on cancellation [30003.56ms]
(pass) Claude hands a partial line to its monitor and interrupts on fallback or model drift [5.95ms]

 5 pass
 1 fail
 103 expect() calls
Ran 6 tests across 1 file. [30.04s]
```

188-encoder-verified.log, SHA-256 25238bac7f38ed50210db27723267046817f99f21ea0e1208f35fcb36fe158d7

```text
committed 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
restored 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
git status --porcelain for the restored path is empty
```

### R2 first-party evidence

Diff with trailing whitespace removed. 190-provider-diff.log, SHA-256 3268b7a0e9cf34df123c9ba001ced75a5c6e275eaf9fbc97e5315bf6b9846a5f

```diff
diff --git a/packages/adapter-claude-code/src/live.ts b/packages/adapter-claude-code/src/live.ts
index 014aa11..81b07aa 100644
--- a/packages/adapter-claude-code/src/live.ts
+++ b/packages/adapter-claude-code/src/live.ts
@@ -32,7 +32,7 @@ function matchesUsage(value: unknown, model: string, requireEvidence: boolean):
   if (!object(value)) return false;
   const entries = Object.entries(value);
   return (!requireEvidence || entries.length > 0) && entries.every(([key, usage]) =>
-    key === model && object(usage) && usage.canonicalModel === model && usage.provider === "firstParty");
+    key === model && object(usage) && usage.canonicalModel === model && typeof usage.provider === "string");
 }

 class ClaudeReader {
```

193-provider-test.log, SHA-256 8fd80090fd1520948978c07407cb4920d19d776f936249c9b529f13b6ed82343

```text
bun test v1.4.2 (744846f84)

packages/adapter-claude-code/test/live.test.ts:
(pass) Claude encodes one stream-json user line [0.10ms]
23 |   wire.end();
24 |   const value = await verdict;
25 |   if (!value.ok) {
26 |     expect(value.surface).toBe("claude-code");
27 |     expect(value.cause).toBe(expected);
28 |   } else throw new Error("unexpected successful attestation");
                        ^
error: unexpected successful attestation
      at rejects (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:28:20)
      at async <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:52:12)
(fail) Claude subscribes first and accepts only complete firstParty identity evidence [2.09ms]
(pass) Claude rejects malformed, missing, duplicate and echoed events [0.62ms]
(pass) Claude rejects a tool call or a third round-trip [0.18ms]
(pass) Claude keeps the result deadline and closes on cancellation [30003.19ms]
110 |     wire.text(JSON.stringify(result) + "\r\n" + nextAssistant + later.slice(0, 7));
111 |     expect((await verdict).ok).toBe(true);
112 |     wire.text(later.slice(7) + "\n");
113 |     wire.end();
114 |     while (!wire.closed) await Bun.sleep(1);
115 |     expect(wire.failures).toEqual(["identity_mismatch"]);
                                ^
error: expect(received).toEqual(expected)

  [
-   "identity_mismatch",
+   "attestation_missing",
  ]

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:115:27)
(fail) Claude hands a partial line to its monitor and interrupts on fallback or model drift [8.68ms]

 4 pass
 2 fail
 81 expect() calls
Ran 6 tests across 1 file. [30.03s]
```

196-provider-verified.log, SHA-256 2dbaf61ce8c78a775bb9e1eea8c768eaae7be96834e5b8c0025a1000807ea617

```text
committed 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
restored 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
git status --porcelain for the restored path is empty
```

### R2 echoed input

Diff with trailing whitespace removed. 198-echo-diff.log, SHA-256 b591a4abbe04eeca870858e286d897682a1ec93ca9ca4def66119edc80ffaa94

```diff
diff --git a/packages/adapter-claude-code/src/live.ts b/packages/adapter-claude-code/src/live.ts
index 014aa11..76ef90b 100644
--- a/packages/adapter-claude-code/src/live.ts
+++ b/packages/adapter-claude-code/src/live.ts
@@ -71,6 +71,7 @@ class ClaudeReader {
     if (!object(event) || !nonempty(event.type)) return "attestation_malformed";
     if (this.complete && event.type !== "assistant" && event.type !== "result" &&
       !(event.type === "system" && (event.subtype === "model_refusal_fallback" || event.subtype === "api_retry"))) return;
+    if (event.type === "user") return;
     if (!nonempty(event.session_id)) return "attestation_malformed";
     if (this.session !== undefined && event.session_id !== this.session) return "attestation_duplicate";
     if (event.type === "system" && event.subtype === "model_refusal_fallback") return "identity_mismatch";
```

201-echo-test.log, SHA-256 c5abb6b1ca639cf363ebdecc1f9efbb304c58a378fb2d36b59bfc974b596582a

```text
bun test v1.4.2 (744846f84)

packages/adapter-claude-code/test/live.test.ts:
(pass) Claude encodes one stream-json user line [0.36ms]
(pass) Claude subscribes first and accepts only complete firstParty identity evidence [4.39ms]
22 |   wire.events(...events);
23 |   wire.end();
24 |   const value = await verdict;
25 |   if (!value.ok) {
26 |     expect(value.surface).toBe("claude-code");
27 |     expect(value.cause).toBe(expected);
                             ^
error: expect(received).toBe(expected)

Expected: "attestation_malformed"
Received: "attestation_missing"

      at rejects (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:27:25)
      at async <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:59:9)
(fail) Claude rejects malformed, missing, duplicate and echoed events [2.31ms]
(pass) Claude rejects a tool call or a third round-trip [0.37ms]
(pass) Claude keeps the result deadline and closes on cancellation [30004.44ms]
(pass) Claude hands a partial line to its monitor and interrupts on fallback or model drift [5.95ms]

 5 pass
 1 fail
 72 expect() calls
Ran 6 tests across 1 file. [30.04s]
```

204-echo-verified.log, SHA-256 ea66052a07c581ba59eaec2b09bd5061a5a16ef7a9c6850752b181cc592960d4

```text
committed 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
restored 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
git status --porcelain for the restored path is empty
```

### R2 round-trip bound

Diff with trailing whitespace removed. 206-rounds-diff.log, SHA-256 886a00f19ef033b86d7a3b7beea8515203598c539f480707571acdaa37b33522

```diff
diff --git a/packages/adapter-claude-code/src/live.ts b/packages/adapter-claude-code/src/live.ts
index 014aa11..e35e0b2 100644
--- a/packages/adapter-claude-code/src/live.ts
+++ b/packages/adapter-claude-code/src/live.ts
@@ -111,7 +111,7 @@ class ClaudeReader {
         if (typeof event.num_turns !== "number" || !Number.isSafeInteger(event.num_turns) || event.num_turns < 1) {
           return "attestation_malformed";
         }
-        if (event.num_turns + this.retries > 2) return "attestation_round_trips";
+        if (event.num_turns + this.retries > 3) return "attestation_round_trips";
       }
       if (event.subtype !== "success" || event.is_error !== false ||
         !matchesUsage(event.modelUsage, this.input.model, true) ||
```

209-rounds-test.log, SHA-256 e7331d3f4d7da841240cf28d1f53f91db79977fbeeb18d61d444edf22a9ba075

```text
bun test v1.4.2 (744846f84)

packages/adapter-claude-code/test/live.test.ts:
(pass) Claude encodes one stream-json user line [0.22ms]
(pass) Claude subscribes first and accepts only complete firstParty identity evidence [3.77ms]
(pass) Claude rejects malformed, missing, duplicate and echoed events [1.27ms]
23 |   wire.end();
24 |   const value = await verdict;
25 |   if (!value.ok) {
26 |     expect(value.surface).toBe("claude-code");
27 |     expect(value.cause).toBe(expected);
28 |   } else throw new Error("unexpected successful attestation");
                        ^
error: unexpected successful attestation
      at rejects (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:28:20)
      at async <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:82:9)
(fail) Claude rejects a tool call or a third round-trip [2.34ms]
(pass) Claude keeps the result deadline and closes on cancellation [30004.00ms]
(pass) Claude hands a partial line to its monitor and interrupts on fallback or model drift [6.81ms]

 5 pass
 1 fail
 100 expect() calls
Ran 6 tests across 1 file. [30.04s]
```

212-rounds-verified.log, SHA-256 6ba4e39424b49d6816d7a4dc474bb2657637da53e07f1114d0dc815014310b82

```text
committed 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
restored 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
git status --porcelain for the restored path is empty
```

### R2 deadline through result

Diff with trailing whitespace removed. 214-result-time-diff.log, SHA-256 f1e7a57ec1cc04cb471747a10f32e46b81fcb3b73fd25fd6e61c1695cb8e9f26

```diff
diff --git a/packages/adapter-claude-code/src/live.ts b/packages/adapter-claude-code/src/live.ts
index 014aa11..0a2fc56 100644
--- a/packages/adapter-claude-code/src/live.ts
+++ b/packages/adapter-claude-code/src/live.ts
@@ -156,6 +156,7 @@ export function attestClaudeSession(input: Input, reserveWrite: () => boolean =
         if (failed) break;
         if (!reader.complete && performance.now() >= deadline) { stop("attestation_deadline"); break; }
         if (fact.kind === "output" && fact.bytes) {
+          if (new TextDecoder().decode(fact.bytes).includes('"type":"assistant"')) { clearTimeout(timer); deadline = Infinity; }
           const cause = reader.push(fact.bytes);
           if (cause) stop(cause);
         } else if (fact.kind === "exited" || fact.kind === "drained") {
```

217-result-time-test.log, SHA-256 bc7e6a4f917a689fa6c20614fa295568c06f75083b426fcfd346322ca5f48bea

```text
bun test v1.4.2 (744846f84)

packages/adapter-claude-code/test/live.test.ts:
(pass) Claude encodes one stream-json user line [0.36ms]
(pass) Claude subscribes first and accepts only complete firstParty identity evidence [4.50ms]
(pass) Claude rejects malformed, missing, duplicate and echoed events [1.89ms]
(pass) Claude rejects a tool call or a third round-trip [0.63ms]
92 |   const late = start();
93 |   late.wire.events(init, assistant);
94 |   const timer = setTimeout(() => late.wire.events(result), 30_100);
95 |   try {
96 |     const second = await late.verdict;
97 |     expect(second.ok ? "success" : second.cause).toBe("attestation_deadline");
                                                      ^
error: expect(received).toBe(expected)

Expected: "attestation_deadline"
Received: "success"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:97:50)
(fail) Claude keeps the result deadline and closes on cancellation [30107.29ms]
(pass) Claude hands a partial line to its monitor and interrupts on fallback or model drift [6.80ms]

 5 pass
 1 fail
 101 expect() calls
Ran 6 tests across 1 file. [30.14s]
```

220-result-time-verified.log, SHA-256 3eae840a274efed4086003e34b54c78e706ab223fc6b70f17660fff44f100fe1

```text
committed 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
restored 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
git status --porcelain for the restored path is empty
```

### R2 partial line

Diff with trailing whitespace removed. 222-partial-diff.log, SHA-256 bfe6f1cadac9424d881dc58ac7f62d71f8338ecb7f10ab54fa5d62eae03c5da6

```diff
diff --git a/packages/adapter-claude-code/src/live.ts b/packages/adapter-claude-code/src/live.ts
index 014aa11..17809f1 100644
--- a/packages/adapter-claude-code/src/live.ts
+++ b/packages/adapter-claude-code/src/live.ts
@@ -120,6 +120,7 @@ class ClaudeReader {
       this.assistantSeen = false;
       if (!this.complete) {
         this.complete = true;
+        this.tail = "";
         this.passed();
       }
       return;
```

225-partial-test.log, SHA-256 7d2af7e4295b95302369441e51b731bfe4f2052a86a43893bd4c6b4cbb2758e5

```text
bun test v1.4.2 (744846f84)

packages/adapter-claude-code/test/live.test.ts:
(pass) Claude encodes one stream-json user line [0.11ms]
(pass) Claude subscribes first and accepts only complete firstParty identity evidence [2.02ms]
70 |   await rejects([init, assistant, { ...assistant, message: { ...assistant.message, model: "changed" } }], "attestation_duplicate");
71 |   await rejects([init, fallback], "identity_mismatch");
72 |   const { wire, verdict } = start();
73 |   wire.events(init, assistant, result, result);
74 |   await verdict;
75 |   expect(wire.failures).toEqual(["attestation_duplicate"]);
                             ^
error: expect(received).toEqual(expected)

- [
-   "attestation_duplicate",
- ]
+ []

- Expected  - 3
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:75:25)
(fail) Claude rejects malformed, missing, duplicate and echoed events [1.00ms]
(pass) Claude rejects a tool call or a third round-trip [0.19ms]
(pass) Claude keeps the result deadline and closes on cancellation [30001.98ms]
110 |     wire.text(JSON.stringify(result) + "\r\n" + nextAssistant + later.slice(0, 7));
111 |     expect((await verdict).ok).toBe(true);
112 |     wire.text(later.slice(7) + "\n");
113 |     wire.end();
114 |     while (!wire.closed) await Bun.sleep(1);
115 |     expect(wire.failures).toEqual(["identity_mismatch"]);
                                ^
error: expect(received).toEqual(expected)

  [
-   "identity_mismatch",
+   "attestation_malformed",
  ]

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:115:27)
(fail) Claude hands a partial line to its monitor and interrupts on fallback or model drift [4.54ms]

 4 pass
 2 fail
 96 expect() calls
Ran 6 tests across 1 file. [30.02s]
```

228-partial-verified.log, SHA-256 ce961864bd663ffcdf85465a06c2497e9bd0c07c48988e17393c5c394edca06a

```text
committed 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
restored 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
git status --porcelain for the restored path is empty
```

### R2 fallback

Diff with trailing whitespace removed. 230-fallback-diff.log, SHA-256 49724513fa4d6e27b8c1da113d9dd09c84d244227162c59a18ca45a20a3200b6

```diff
diff --git a/packages/adapter-claude-code/src/live.ts b/packages/adapter-claude-code/src/live.ts
index 014aa11..325c19d 100644
--- a/packages/adapter-claude-code/src/live.ts
+++ b/packages/adapter-claude-code/src/live.ts
@@ -73,7 +73,7 @@ class ClaudeReader {
       !(event.type === "system" && (event.subtype === "model_refusal_fallback" || event.subtype === "api_retry"))) return;
     if (!nonempty(event.session_id)) return "attestation_malformed";
     if (this.session !== undefined && event.session_id !== this.session) return "attestation_duplicate";
-    if (event.type === "system" && event.subtype === "model_refusal_fallback") return "identity_mismatch";
+    if (event.type === "system" && event.subtype === "model_refusal_fallback") return;
     if (event.type === "system" && event.subtype === "api_retry" && typeof event.error === "string" &&
       this.input.registration.auth_failure_detection.includes("system/api_retry.error:" + event.error)) return "auth_failed";
     if (!this.complete && event.parent_tool_use_id != null) return "attestation_tool_call";
```

233-fallback-test.log, SHA-256 d3f22ef7035acdfbc4e79ff2ad2853faf9ec1bd924902697efe6bbd2677657d7

```text
bun test v1.4.2 (744846f84)

packages/adapter-claude-code/test/live.test.ts:
(pass) Claude encodes one stream-json user line [0.10ms]
(pass) Claude subscribes first and accepts only complete firstParty identity evidence [1.92ms]
22 |   wire.events(...events);
23 |   wire.end();
24 |   const value = await verdict;
25 |   if (!value.ok) {
26 |     expect(value.surface).toBe("claude-code");
27 |     expect(value.cause).toBe(expected);
                             ^
error: expect(received).toBe(expected)

Expected: "identity_mismatch"
Received: "attestation_missing"

      at rejects (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:27:25)
      at async <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:71:9)
(fail) Claude rejects malformed, missing, duplicate and echoed events [0.82ms]
(pass) Claude rejects a tool call or a third round-trip [0.18ms]
(pass) Claude keeps the result deadline and closes on cancellation [30002.29ms]
110 |     wire.text(JSON.stringify(result) + "\r\n" + nextAssistant + later.slice(0, 7));
111 |     expect((await verdict).ok).toBe(true);
112 |     wire.text(later.slice(7) + "\n");
113 |     wire.end();
114 |     while (!wire.closed) await Bun.sleep(1);
115 |     expect(wire.failures).toEqual(["identity_mismatch"]);
                                ^
error: expect(received).toEqual(expected)

  [
-   "identity_mismatch",
+   "attestation_missing",
  ]

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-claude-code/test/live.test.ts:115:27)
(fail) Claude hands a partial line to its monitor and interrupts on fallback or model drift [4.29ms]

 4 pass
 2 fail
 94 expect() calls
Ran 6 tests across 1 file. [30.02s]
```

236-fallback-verified.log, SHA-256 5f7fd02465cca2f219e2eb1ff2590540d7ec554f5e0e6815239a30c287f49948

```text
committed 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
restored 9c870c6625b8db017dad7054ae04088cd67d9c8f700128d173772120a4c62990 packages/adapter-claude-code/src/live.ts
git status --porcelain for the restored path is empty
```

### R3 attestation write

Diff with trailing whitespace removed. 268-first-write-diff.log, SHA-256 b9fe77ab045ad452083918929f6177bdbaf4461d95f62979402bf3bbf4b7c3d9

```diff
diff --git a/packages/adapter-madv-surface/src/live.ts b/packages/adapter-madv-surface/src/live.ts
index 6284cbd..19aedba 100644
--- a/packages/adapter-madv-surface/src/live.ts
+++ b/packages/adapter-madv-surface/src/live.ts
@@ -92,7 +92,7 @@ export function attestMadvSession(input: Input, reserveWrite: () => boolean = ()
   else {
     deadline = performance.now() + EVIDENCE_DEADLINE_MS;
     timer = setTimeout(() => stop("attestation_deadline"), EVIDENCE_DEADLINE_MS);
-    try { write(encodeAttestationInput(PROMPT)); } catch { stop("provider_error"); }
+    try { write(encodeUserInput(PROMPT)); } catch { stop("provider_error"); }
   }
   return promise;
 }
```

271-first-write-test.log, SHA-256 1f1865b602f2af451c318d0784d4fc749c9168839cbb489690009b367adc2e57

```text
bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/live.test.ts:
37 |   const message = "synthetic";
38 |   expect(encodeUserInput(message)).toBe('{"type":"user","message":{"role":"user","content":"synthetic"}}\n');
39 |   expect(encodeAttestationInput(message)).toBe('{"type":"user","message":{"role":"user","content":"synthetic"},"no_tools":true}\n');
40 |   const { wire, verdict } = start();
41 |   expect(wire.opened).toBe(1);
42 |   expect(wire.writes).toEqual(['{"type":"user","message":{"role":"user","content":"Reply with your model identifier and nothing else."},"no_tools":true}\n']);
                           ^
error: expect(received).toEqual(expected)

  [

- "{"type":"user","message":{"role":"user","content":"Reply with your model identifier and nothing else."},"no_tools":true}
+ "{"type":"user","message":{"role":"user","content":"Reply with your model identifier and nothing else."}}
  "
  ,
  ]

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-madv-surface/test/live.test.ts:42:23)
(fail) madv encodes no_tools only on the attestation message [2.41ms]
(pass) madv requires init, model response, assistant and success in order [2.32ms]
(pass) madv rejects attestation tools and extra round-trips by their typed cause [0.25ms]
(pass) madv waits for result through its deadline and closes on cancellation [30000.57ms]
(pass) madv preserves a later partial event and checks later responses [3.27ms]

 4 pass
 1 fail
 84 expect() calls
Ran 5 tests across 1 file. [30.02s]
```

274-first-write-verified.log, SHA-256 d8d21e3d46ac052065fbf2cb941c008871fc5ba25a8c61c7f961f51b5ab70863

```text
committed 9442814dac30beae89dc1a9d21948671be66537382504b921755acf25cc249b5 packages/adapter-madv-surface/src/live.ts
restored 9442814dac30beae89dc1a9d21948671be66537382504b921755acf25cc249b5 packages/adapter-madv-surface/src/live.ts
git status --porcelain for the restored path is empty
```

### R3 required assistant

Diff with trailing whitespace removed. 276-assistant-diff.log, SHA-256 fcdcdb4202fbe813323e89954a9fabab92c957f864c6545d9df6b1b169981317

```diff
diff --git a/packages/adapter-madv-surface/src/index.ts b/packages/adapter-madv-surface/src/index.ts
index 63a6d03..bc55b84 100644
--- a/packages/adapter-madv-surface/src/index.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -199,7 +199,7 @@ export class MadvSurfaceParser {
     } else if (value.type === "result") {
       if ((this.state !== "response" && this.state !== "tools") || this.tools.size !== 0) { this.fail("identity_mismatch", "event_order"); return; }
       if (value.is_error !== false || value.subtype !== "success") { this.fail("provider_error", "result_error"); return; }
-      if (attesting && !this.assistantSeen) { this.fail("identity_mismatch", "assistant_missing"); return; }
+      if (false && attesting && !this.assistantSeen) { this.fail("identity_mismatch", "assistant_missing"); return; }
       this.state = "between";
       if (attesting) {
         this.attested = true;
```

279-assistant-test.log, SHA-256 f5a849cb736a45a89be896c534521b965864d9f0436000bf064223795f1d0961

```text
bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/live.test.ts:
(pass) madv encodes no_tools only on the attestation message [2.97ms]
22 | async function rejects(events: readonly unknown[], cause: string, reason?: string) {
23 |   const { wire, verdict } = start();
24 |   wire.events(...events);
25 |   wire.end();
26 |   const answer = await verdict;
27 |   expect(answer.ok).toBe(false);
                         ^
error: expect(received).toBe(expected)

Expected: false
Received: true

      at rejects (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-madv-surface/test/live.test.ts:27:21)
      at async <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-madv-surface/test/live.test.ts:56:9)
(fail) madv requires init, model response, assistant and success in order [0.66ms]
(pass) madv rejects attestation tools and extra round-trips by their typed cause [0.21ms]
(pass) madv waits for result through its deadline and closes on cancellation [30003.26ms]
(pass) madv preserves a later partial event and checks later responses [2.93ms]

 4 pass
 1 fail
 38 expect() calls
Ran 5 tests across 1 file. [30.02s]
```

282-assistant-verified.log, SHA-256 03a4b224117daadb72bfbe7cb38b2a16c696e20a62ed1b163b5658217b37003e

```text
committed 709381535e554e1fc54ac6ab0cd83afefbf0ed78d7265427e7d20204a2769796 packages/adapter-madv-surface/src/index.ts
restored 709381535e554e1fc54ac6ab0cd83afefbf0ed78d7265427e7d20204a2769796 packages/adapter-madv-surface/src/index.ts
git status --porcelain for the restored path is empty
```

### R3 extra response

Diff with trailing whitespace removed. 284-extra-diff.log, SHA-256 a4095aebe39b0e341fd418e14718a58907ee5980725b9e45e65fd8b7810dbcf3

```diff
diff --git a/packages/adapter-madv-surface/src/index.ts b/packages/adapter-madv-surface/src/index.ts
index 63a6d03..1a3f1c8 100644
--- a/packages/adapter-madv-surface/src/index.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -139,7 +139,7 @@ export class MadvSurfaceParser {
       this.fail("provider_error", "unexpected_tool_call");
       return;
     }
-    if (attesting && value.type === "model_response" && this.responses > 0) {
+    if (attesting && value.type === "model_response" && this.responses > 1) {
       this.policyFailure ??= "attestation_round_trips";
       this.fail("identity_mismatch", "extra_model_response");
       return;
```

287-extra-test.log, SHA-256 d357cb89491f8903f834c0438f827c9d0cbdc09723b99d6b9a7406ed9bcd29e3

```text
bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/live.test.ts:
(pass) madv encodes no_tools only on the attestation message [2.96ms]
(pass) madv requires init, model response, assistant and success in order [0.74ms]
25 |   wire.end();
26 |   const answer = await verdict;
27 |   expect(answer.ok).toBe(false);
28 |   if (!answer.ok) {
29 |     expect(answer.surface).toBe("madv-surface");
30 |     expect(answer.cause).toBe(cause);
                              ^
error: expect(received).toBe(expected)

Expected: "attestation_round_trips"
Received: "identity_mismatch"

      at rejects (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-madv-surface/test/live.test.ts:30:26)
      at async <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-madv-surface/test/live.test.ts:75:9)
(fail) madv rejects attestation tools and extra round-trips by their typed cause [0.53ms]
(pass) madv waits for result through its deadline and closes on cancellation [30003.14ms]
(pass) madv preserves a later partial event and checks later responses [2.56ms]

 4 pass
 1 fail
 87 expect() calls
Ran 5 tests across 1 file. [30.02s]
```

290-extra-verified.log, SHA-256 c2e8677d04778ec82a22b99dda1ff8ba74f09136978da991931afb9ba5224047

```text
committed 709381535e554e1fc54ac6ab0cd83afefbf0ed78d7265427e7d20204a2769796 packages/adapter-madv-surface/src/index.ts
restored 709381535e554e1fc54ac6ab0cd83afefbf0ed78d7265427e7d20204a2769796 packages/adapter-madv-surface/src/index.ts
git status --porcelain for the restored path is empty
```

### R3 deadline through result

Diff with trailing whitespace removed. 292-result-time-diff.log, SHA-256 fcbd7da7e4a1625297a9884a1c42b3756865a8092c94f0e9f0eaae40c0f41498

```diff
diff --git a/packages/adapter-madv-surface/src/live.ts b/packages/adapter-madv-surface/src/live.ts
index 6284cbd..9562c51 100644
--- a/packages/adapter-madv-surface/src/live.ts
+++ b/packages/adapter-madv-surface/src/live.ts
@@ -67,7 +67,7 @@ export function attestMadvSession(input: Input, reserveWrite: () => boolean = ()
       for await (const fact of input.host.handle.facts()) {
         if (failure) break;
         if (!ready && performance.now() >= deadline) { stop("attestation_deadline"); break; }
-        if (fact.kind === "output" && fact.bytes) inspect(parser.push(fact.bytes));
+        if (fact.kind === "output" && fact.bytes) { const result = parser.push(fact.bytes); inspect(result); if (result.ok && result.modelResponses) clearTimeout(timer); }
         if (fact.kind === "exited") {
           inspect(parser.finish(fact.code ?? 1, fact.signal ?? null));
           break;
```

295-result-time-test.log, SHA-256 9d2724a8e4e18488afb6cfd89a728670f964b9248e28cd9762ad9146f930382b

```text
bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/live.test.ts:
(pass) madv encodes no_tools only on the attestation message [2.76ms]
(pass) madv requires init, model response, assistant and success in order [0.66ms]
(pass) madv rejects attestation tools and extra round-trips by their typed cause [0.20ms]
82 |   expect(cancelled.wire.closed).toBe(1);
83 |   const late = start(); late.wire.events(init, response, assistant);
84 |   const cleanup = setTimeout(late.wire.end, 31_000);
85 |   try {
86 |     const timeout = await late.verdict;
87 |     expect(timeout.ok ? "unexpected success" : timeout.cause).toBe("attestation_deadline");
                                                                   ^
error: expect(received).toBe(expected)

Expected: "attestation_deadline"
Received: "identity_unavailable"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-madv-surface/test/live.test.ts:87:63)
(fail) madv waits for result through its deadline and closes on cancellation [31002.58ms]
(pass) madv preserves a later partial event and checks later responses [2.94ms]

 4 pass
 1 fail
 87 expect() calls
Ran 5 tests across 1 file. [31.02s]
```

298-result-time-verified.log, SHA-256 c3337b943a640d45d04918c01218c0ce49863195eeba921c28bd760bcf5f2e54

```text
committed 9442814dac30beae89dc1a9d21948671be66537382504b921755acf25cc249b5 packages/adapter-madv-surface/src/live.ts
restored 9442814dac30beae89dc1a9d21948671be66537382504b921755acf25cc249b5 packages/adapter-madv-surface/src/live.ts
git status --porcelain for the restored path is empty
```

### R3 partial line

Diff with trailing whitespace removed. 300-later-line-diff.log, SHA-256 25ae031dac4200f750fde30d2724d14890a496fca2f63ee865a72d4448d1333f

```diff
diff --git a/packages/adapter-madv-surface/src/index.ts b/packages/adapter-madv-surface/src/index.ts
index 63a6d03..48a8dd5 100644
--- a/packages/adapter-madv-surface/src/index.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -203,7 +203,7 @@ export class MadvSurfaceParser {
       this.state = "between";
       if (attesting) {
         this.attested = true;
-        this.context.onAttested?.(this.version);
+        this.buffer = ""; this.context.onAttested?.(this.version);
       }
     } else { this.fail("identity_mismatch", "event_order"); return; }
     // A live monitor consumes events in place and needs no session-long replay.
```

303-later-line-test.log, SHA-256 b7fd5b1a2f67810450c2658259082dcd1b31cec6166dd829499b0839f37f25a6

```text
bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/live.test.ts:
(pass) madv encodes no_tools only on the attestation message [5.29ms]
(pass) madv requires init, model response, assistant and success in order [0.87ms]
(pass) madv rejects attestation tools and extra round-trips by their typed cause [0.68ms]
(pass) madv waits for result through its deadline and closes on cancellation [30003.67ms]
 99 |   if (answer.ok) expect(answer.sendUserInput("another synthetic request")).toBe(true);
100 |   wire.text(later.slice(7) + "\n");
101 |   wire.end();
102 |   while (!wire.closed) await Bun.sleep(1);
103 |   expect(wire.opened).toBe(1);
104 |   expect(wire.failures).toEqual(["model_refused"]);
                              ^
error: expect(received).toEqual(expected)

  [
-   "model_refused",
+   "identity_mismatch",
  ]

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-madv-surface/test/live.test.ts:104:25)
(fail) madv preserves a later partial event and checks later responses [6.07ms]

 4 pass
 1 fail
 88 expect() calls
Ran 5 tests across 1 file. [30.04s]
```

306-later-line-verified.log, SHA-256 627761fa2797e6f39567f27931ac1e6857279ebfdf39760e4725d6cba0ca8fbf

```text
committed 709381535e554e1fc54ac6ab0cd83afefbf0ed78d7265427e7d20204a2769796 packages/adapter-madv-surface/src/index.ts
restored 709381535e554e1fc54ac6ab0cd83afefbf0ed78d7265427e7d20204a2769796 packages/adapter-madv-surface/src/index.ts
git status --porcelain for the restored path is empty
```

### R4 registered authentication error

Diff with trailing whitespace removed. 357-detector-diff.log, SHA-256 b8947d270891508313511671c5f9c0c0cf597f90a2152cf8388c823efccb887e

```diff
diff --git a/packages/adapter-claude-code/src/detectors.ts b/packages/adapter-claude-code/src/detectors.ts
index 040efda..be00124 100644
--- a/packages/adapter-claude-code/src/detectors.ts
+++ b/packages/adapter-claude-code/src/detectors.ts
@@ -12,6 +12,6 @@ export function detectClaudeFailure(rules: readonly string[], observation: Obser
       return { surface: "claude-code", cause: "identity_mismatch" };
     }
     if (event.type === "system" && event.subtype === "api_retry" && typeof event.error === "string" &&
-      rules.includes("system/api_retry.error:" + event.error)) return { surface: "claude-code", cause: "auth_failed" };
+      false && rules.includes("system/api_retry.error:" + event.error)) return { surface: "claude-code", cause: "auth_failed" };
   }
 }
```

360-detector-test.log, SHA-256 4df44e1c40002c9c379178bad59ed2b8648707c5a1b17c3e46d8f230a7e75e47

```text
bun test v1.4.2 (744846f84)

test/phase3b/detectors.test.ts:
 9 |   const status = { kind: "auth_status", exitCode: 1 } as const;
10 |   expect(detectClaudeFailure(claude, status)).toEqual({ surface: "claude-code", cause: "auth_failed" });
11 |   expect(detectClaudeFailure([], status)).toBeUndefined();
12 |   for (const error of ["authentication_failed", "oauth_org_not_allowed"]) {
13 |     const obs = { kind: "event", event: { type: "system", subtype: "api_retry", error } } as const;
14 |     expect(detectClaudeFailure(claude, obs)?.cause).toBe("auth_failed");
                                                         ^
error: expect(received).toBe(expected)

Expected: "auth_failed"
Received: undefined

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/detectors.test.ts:14:53)
(fail) registration detectors identify auth expiry and attestation failures by surface [2.03ms]

 0 pass
 1 fail
 3 expect() calls
Ran 1 test across 1 file. [32.00ms]
```

363-detector-verified.log, SHA-256 3d54384c4227845cea75b463e9457344f3d81cad286b3d32b6f89a932f8ed671

```text
committed 392e5916ec42785dc516af01234875e623c2537762fc998218869c53f92619b0 packages/adapter-claude-code/src/detectors.ts
restored 392e5916ec42785dc516af01234875e623c2537762fc998218869c53f92619b0 packages/adapter-claude-code/src/detectors.ts
git status --porcelain for the restored path is empty
```

### R5 Darwin managed folder

Diff with trailing whitespace removed. 389-darwin-map-diff.log, SHA-256 81c0f96ad9c2bc4fd4ae9f0e9b0820c4202e2f6ba7ca124c78020ba0bd4d1af0

```diff
diff --git a/apps/madbridge/src/tui/live/managed-settings.ts b/apps/madbridge/src/tui/live/managed-settings.ts
index 7719ff6..a788f01 100644
--- a/apps/madbridge/src/tui/live/managed-settings.ts
+++ b/apps/madbridge/src/tui/live/managed-settings.ts
@@ -1,4 +1,4 @@
 export function managedSettingsDirectory(platform: string): string | undefined {
-  if (platform === "darwin") return "/Library/Application Support/ClaudeCode";
+  if (platform === "darwin") return "/etc/claude-code";
   if (platform === "linux") return "/etc/claude-code";
 }
```

392-darwin-map-test.log, SHA-256 644be97f0b079dac742330fdeb5711f43dea5d668c756343334af6ee7258b842

```text
bun test v1.4.2 (744846f84)

test/phase3b/settings-sources.test.ts:
 5 | import { settingsSources } from "../../apps/madbridge/src/tui/live/settings-sources";
 6 | import { offlineStart } from "./offline";
 7 |
 8 | test("managed settings selects the platform folder and refuses an unsupported platform", () => {
 9 |   const mac = "/Library/Application Support/ClaudeCode", linux = "/etc/claude-code";
10 |   expect(managedSettingsDirectory("darwin")).toBe(mac);
                                                  ^
error: expect(received).toBe(expected)

Expected: "/Library/Application Support/ClaudeCode"
Received: "/etc/claude-code"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/settings-sources.test.ts:10:46)
(fail) managed settings selects the platform folder and refuses an unsupported platform [1.53ms]
(pass) managed settings refuses unvalidated files and the governed remote copy [89.58ms]
(pass) settings sources include the supplied user, managed, project and local directories [82.02ms]

 2 pass
 1 fail
 7 expect() calls
Ran 3 tests across 1 file. [214.00ms]
```

395-darwin-map-verified.log, SHA-256 9becc6c3916be0d6d17ea73526c49e7e087a6f4a2a030e6cd77b5e800eee4c5f

```text
committed 7cf332b08569ef5a5c710e4f7d341af49f49f74d20d21b27c3705a8c526bfd23 apps/madbridge/src/tui/live/managed-settings.ts
restored 7cf332b08569ef5a5c710e4f7d341af49f49f74d20d21b27c3705a8c526bfd23 apps/madbridge/src/tui/live/managed-settings.ts
git status --porcelain for the restored path is empty
```

### R5 remote copy

Diff with trailing whitespace removed. 397-remote-copy-diff.log, SHA-256 f059583d3cd29ab4978079c81694094f0e84a7228b8eec0ade2bc5607dd438c9

```diff
diff --git a/apps/madbridge/src/tui/live/settings-sources.ts b/apps/madbridge/src/tui/live/settings-sources.ts
index d29737c..1cc9d7e 100644
--- a/apps/madbridge/src/tui/live/settings-sources.ts
+++ b/apps/madbridge/src/tui/live/settings-sources.ts
@@ -28,7 +28,7 @@ export function settingsSources(workingDirectory: string, configFolder: string,
     }
   } catch { return { ok: false, cause: "managed_settings_unvalidated_source" }; }
   try {
-    if (present(join(configFolder, "remote-settings.json"))) return { ok: false, cause: "managed_settings_remote_copy" };
+    if (false && present(join(configFolder, "remote-settings.json"))) return { ok: false, cause: "managed_settings_remote_copy" };
   } catch { return { ok: false, cause: "managed_settings_unvalidated_source" }; }
   return { ok: true, paths: [
     join(configFolder, "settings.json"), join(folder, "managed-settings.json"),
```

400-remote-copy-test.log, SHA-256 4a23b853a81522ce6c48903ba2c079a03ad7f48ad31c27fcffbe27d8faed9d17

```text
bun test v1.4.2 (744846f84)

test/phase3b/settings-sources.test.ts:
(pass) managed settings selects the platform folder and refuses an unsupported platform [85.06ms]
31 |       writeFileSync(path, "{}");
32 |       expect(check()).toEqual({ ok: false, cause: "managed_settings_unvalidated_source" });
33 |       rmSync(path);
34 |     }
35 |     writeFileSync(join(f.config, "remote-settings.json"), "{}");
36 |     expect(check()).toEqual({ ok: false, cause: "managed_settings_remote_copy" });
                         ^
error: expect(received).toEqual(expected)

  {
-   "cause": "managed_settings_remote_copy",
-   "ok": false,
+   "ok": true,
+   "paths": [
+     "/Users/michaeldaley/.madbridge-m1-OrwCc8/config/settings.json",
+     "/Users/michaeldaley/.madbridge-m1-OrwCc8/managed/managed-settings.json",
+     "/Users/michaeldaley/.madbridge-m1-OrwCc8/work/.claude/settings.json",
+     "/Users/michaeldaley/.madbridge-m1-OrwCc8/work/.claude/settings.local.json",
+   ],
  }

- Expected  - 2
+ Received  + 7

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/settings-sources.test.ts:36:21)
(fail) managed settings refuses unvalidated files and the governed remote copy [92.43ms]
(pass) settings sources include the supplied user, managed, project and local directories [82.72ms]

 2 pass
 1 fail
 11 expect() calls
Ran 3 tests across 1 file. [279.00ms]
```

403-remote-copy-verified.log, SHA-256 368c6e2fe56955af8bba44c2ed13e61a39399edf45c983fac6f3deeff5a60070

```text
committed d4a6e7d785fd82d3a31420783f1dd309ac137837c66f020a0c90b96d665ffbf9 apps/madbridge/src/tui/live/settings-sources.ts
restored d4a6e7d785fd82d3a31420783f1dd309ac137837c66f020a0c90b96d665ffbf9 apps/madbridge/src/tui/live/settings-sources.ts
git status --porcelain for the restored path is empty
```

### R5 local settings path

Diff with trailing whitespace removed. 405-local-path-diff.log, SHA-256 70e01e52ea7ea88eda454d2ec40bfd3868cfa8501ff4c03fd331272da69410a1

```diff
diff --git a/apps/madbridge/src/tui/live/settings-sources.ts b/apps/madbridge/src/tui/live/settings-sources.ts
index d29737c..5718d4a 100644
--- a/apps/madbridge/src/tui/live/settings-sources.ts
+++ b/apps/madbridge/src/tui/live/settings-sources.ts
@@ -32,6 +32,6 @@ export function settingsSources(workingDirectory: string, configFolder: string,
   } catch { return { ok: false, cause: "managed_settings_unvalidated_source" }; }
   return { ok: true, paths: [
     join(configFolder, "settings.json"), join(folder, "managed-settings.json"),
-    join(workingDirectory, ".claude", "settings.json"), join(workingDirectory, ".claude", "settings.local.json"),
+    join(workingDirectory, ".claude", "settings.json"),
   ] };
 }
```

408-local-path-test.log, SHA-256 06ffc04ae63ced672a51942b8b6eb69384fb5df2211a7a486fdf62a445698eb7

```text
bun test v1.4.2 (744846f84)

test/phase3b/settings-sources.test.ts:
(pass) managed settings selects the platform folder and refuses an unsupported platform [87.28ms]
(pass) managed settings refuses unvalidated files and the governed remote copy [80.73ms]
40 | test("settings sources include the supplied user, managed, project and local directories", () => {
41 |   const f = offlineStart();
42 |   try {
43 |     const sources = settingsSources(f.work, f.config, f.managed);
44 |     expect(sources.ok).toBe(true);
45 |     if (sources.ok) expect(sources.paths).toEqual([join(f.config, "settings.json"), join(f.managed, "managed-settings.json"),
                                               ^
error: expect(received).toEqual(expected)

  [
    "/Users/michaeldaley/.madbridge-m1-kqHqIv/config/settings.json",
    "/Users/michaeldaley/.madbridge-m1-kqHqIv/managed/managed-settings.json",
    "/Users/michaeldaley/.madbridge-m1-kqHqIv/work/.claude/settings.json",
-   "/Users/michaeldaley/.madbridge-m1-kqHqIv/work/.claude/settings.local.json",
  ]

- Expected  - 1
+ Received  + 0

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/settings-sources.test.ts:45:43)
(fail) settings sources include the supplied user, managed, project and local directories [81.76ms]

 2 pass
 1 fail
 11 expect() calls
Ran 3 tests across 1 file. [269.00ms]
```

411-local-path-verified.log, SHA-256 2fbdb093582e1298565bd30c3a65ac9d54cc2216914181f32deb19a56d4de868

```text
committed d4a6e7d785fd82d3a31420783f1dd309ac137837c66f020a0c90b96d665ffbf9 apps/madbridge/src/tui/live/settings-sources.ts
restored d4a6e7d785fd82d3a31420783f1dd309ac137837c66f020a0c90b96d665ffbf9 apps/madbridge/src/tui/live/settings-sources.ts
git status --porcelain for the restored path is empty
```

### R6 admitted updater value

Diff with trailing whitespace removed. 425-updater-diff.log, SHA-256 4c1e90386e57c457ec0a3cda9c9dc95156d8aee0598864e15989735a25e4a01a

```diff
diff --git a/packages/supervisor/src/preflight.ts b/packages/supervisor/src/preflight.ts
index 2edb02c..29a1f6d 100644
--- a/packages/supervisor/src/preflight.ts
+++ b/packages/supervisor/src/preflight.ts
@@ -105,7 +105,7 @@ function validateEnvironment(input: PreflightInput, registrations: readonly Adap
       switch (key) {
         case "env":
           return object(value) && Object.entries(value).every(([name, setting]) =>
-            name === "DISABLE_AUTOUPDATER" ? setting === "1" :
+            name === "DISABLE_AUTOUPDATER" ? setting === "0" :
               allowed.has(name) && typeof setting === "string" && env[name] === setting);
         case "permissions":
           return object(value) && Object.keys(value).length === 2 && value.defaultMode === "dontAsk" &&
```

428-updater-test.log, SHA-256 319f0ef2586eee93ae4470af18f7e9b3725f1f8c64da882f704fca97f8b757d9

```text
bun test v1.4.2 (744846f84)

packages/supervisor/test/preflight.test.ts:
(pass) preflight fails with envelope_invalid [84.91ms]
(pass) preflight fails with cardinality [66.90ms]
(pass) preflight fails with repository_fingerprint [93.62ms]
(pass) preflight canonicalizes a symlink-named worktree and preserves the same-repository check [584.60ms]
(pass) preflight fails with repository_fingerprint when the envelope names another checkout or commit [997.52ms]
(pass) preflight fails with repository_fingerprint when the repository root and the worktree belong to different repositories [344.69ms]
(pass) preflight fails with executable_unresolved [156.13ms]
(pass) preflight fails with identity_mismatch [174.71ms]
(pass) preflight fails with identity_mismatch when the independence domain differs from the registration [393.39ms]
(pass) preflight fails with auth_not_ready [629.64ms]
(pass) preflight fails with pair_ineligible [155.04ms]
(pass) preflight threads its fixture registration resolver through pair eligibility [196.39ms]
(pass) public preflight rejects fixture dependencies before and after a test-seam call [365.38ms]
(pass) fixture preflight keeps pair policy and registration overrides local to each call [227.93ms]
(pass) preflight fails with storage_root_invalid [195.39ms]
(pass) preflight fails with host_capability_missing [206.50ms]
(pass) preflight fails with capability_record_stale [199.72ms]
(pass) preflight fails with home_mismatch [147.85ms]
(pass) temporary path recording sees files a child creates and removes before returning [269.89ms]
(pass) the returned plan's repository fingerprint is frozen [245.34ms]
(pass) preflight creates nothing [480.76ms]
(pass) probe environment equals launch environment [210.97ms]
(pass) a cached attestation is not reused across sessions [279.49ms]
(pass) a surface without an actual-session identity primitive is ineligible [220.03ms]
(pass) missing TERM fails preflight as auth_not_ready [108.06ms]
(pass) missing TMPDIR fails preflight as auth_not_ready [106.21ms]
(pass) a caught MissingRequiredVariableError maps to auth_not_ready [106.87ms]
(pass) the auth probe enforces the 5,000 ms execution deadline [5693.53ms]
(pass) the auth probe escalates SIGTERM to SIGKILL within the forced-cleanup budget [5683.27ms]
(pass) the auth probe reaps the child successfully [210.69ms]
(pass) cleanup-budget exhaustion fails closed as auth_not_ready [6148.03ms]
362 |         autoMemoryEnabled: false, disableAllHooks: true, disableClaudeAiConnectors: true, effortLevel: "high",
363 |         modelSettings: entries(7, i => ({ effortLevel: i % 2 ? "xhigh" : "high" })), agentPushNotifEnabled: true,
364 |         inputNeededNotifEnabled: true, autoCompactEnabled: true, verbose: true, editorMode: "normal", theme: "light-daltonized",
365 |         ...(host === "linux" ? { model: "claude-fable-5-2" } : {}),
366 |       });
367 |       expect(result.ok ? "pass" : result.failure).toBe("pass");
                                                        ^
error: expect(received).toBe(expected)

Expected: "pass"
Received: "auth_not_ready"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/supervisor/test/preflight.test.ts:367:51)
(fail) preflight accepts the governed settings and each allowed setting value [156.90ms]
395 |       { agentPushNotifEnabled: "true" }, { inputNeededNotifEnabled: 0 }, { autoCompactEnabled: null },
396 |       { editorMode: "emacs" }, { theme: "a".repeat(65) }, { theme: "abc_def" }, { theme: 1 }, { theme: "abc\n" },
397 |     ];
398 |     for (const setting of cases) {
399 |       const value = await f.run(setting);
400 |       expect(value.ok ? "unexpected success" : value.failure).toBe("auth_not_ready");
                                                                    ^
error: expect(received).toBe(expected)

Expected: "auth_not_ready"
Received: "unexpected success"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/supervisor/test/preflight.test.ts:400:63)
(fail) preflight rejects every unlisted settings control and invalid value shape [207.66ms]

2 tests failed:
(fail) preflight accepts the governed settings and each allowed setting value [156.90ms]
(fail) preflight rejects every unlisted settings control and invalid value shape [207.66ms]

 31 pass
 2 fail
 373 expect() calls
Ran 33 tests across 1 file. [25.39s]
```

431-updater-verified.log, SHA-256 59f88a6926c23fbf8e51b5ce16ff94662aefdba20be11dcacee1ea3469a9b43a

```text
committed 7021477b7ba80671ef457892af84a69170f4ba36300e60568372b19c595851f5 packages/supervisor/src/preflight.ts
restored 7021477b7ba80671ef457892af84a69170f4ba36300e60568372b19c595851f5 packages/supervisor/src/preflight.ts
git status --porcelain for the restored path is empty
```

### R6 unlisted settings key

Diff with trailing whitespace removed. 433-extra-setting-diff.log, SHA-256 716fcb2c66046ebb068fc745f541c1c51f221237df60d77b21448031bcd2907e

```diff
diff --git a/packages/supervisor/src/preflight.ts b/packages/supervisor/src/preflight.ts
index 2edb02c..e739795 100644
--- a/packages/supervisor/src/preflight.ts
+++ b/packages/supervisor/src/preflight.ts
@@ -122,7 +122,7 @@ function validateEnvironment(input: PreflightInput, registrations: readonly Adap
         case "verbose": return typeof value === "boolean";
         case "editorMode": return value === "normal" || value === "vim";
         case "theme": return typeof value === "string" && value.length <= 64 && !/[^a-zA-Z0-9-]/.test(value);
-        default: return false;
+        default: return key === "unlisted";
       }
     }
     for (const path of input.settingsSources) {
```

455-extra-setting-test.log, SHA-256 62c746dd2aaed6ddc04de196f18568ddbef66f2fb82b4fe37d6d0f735e69f2df

```text
bun test v1.4.2 (744846f84)

packages/supervisor/test/preflight.test.ts:
(pass) preflight fails with envelope_invalid [84.03ms]
(pass) preflight fails with cardinality [67.55ms]
(pass) preflight fails with repository_fingerprint [88.22ms]
(pass) preflight canonicalizes a symlink-named worktree and preserves the same-repository check [547.50ms]
(pass) preflight fails with repository_fingerprint when the envelope names another checkout or commit [1164.09ms]
(pass) preflight fails with repository_fingerprint when the repository root and the worktree belong to different repositories [424.63ms]
(pass) preflight fails with executable_unresolved [154.00ms]
(pass) preflight fails with identity_mismatch [228.00ms]
(pass) preflight fails with identity_mismatch when the independence domain differs from the registration [618.88ms]
(pass) preflight fails with auth_not_ready [662.07ms]
(pass) preflight fails with pair_ineligible [196.24ms]
(pass) preflight threads its fixture registration resolver through pair eligibility [265.22ms]
(pass) public preflight rejects fixture dependencies before and after a test-seam call [450.77ms]
(pass) fixture preflight keeps pair policy and registration overrides local to each call [248.88ms]
(pass) preflight fails with storage_root_invalid [318.82ms]
(pass) preflight fails with host_capability_missing [297.87ms]
(pass) preflight fails with capability_record_stale [289.12ms]
(pass) preflight fails with home_mismatch [154.45ms]
(pass) temporary path recording sees files a child creates and removes before returning [274.65ms]
(pass) the returned plan's repository fingerprint is frozen [557.41ms]
(pass) preflight creates nothing [596.46ms]
(pass) probe environment equals launch environment [263.60ms]
(pass) a cached attestation is not reused across sessions [349.52ms]
(pass) a surface without an actual-session identity primitive is ineligible [235.05ms]
(pass) missing TERM fails preflight as auth_not_ready [104.64ms]
(pass) missing TMPDIR fails preflight as auth_not_ready [104.57ms]
(pass) a caught MissingRequiredVariableError maps to auth_not_ready [103.72ms]
(pass) the auth probe enforces the 5,000 ms execution deadline [5707.22ms]
(pass) the auth probe escalates SIGTERM to SIGKILL within the forced-cleanup budget [5707.74ms]
(pass) the auth probe reaps the child successfully [310.92ms]
(pass) cleanup-budget exhaustion fails closed as auth_not_ready [6165.15ms]
(pass) preflight accepts the governed settings and each allowed setting value [584.65ms]
395 |       { agentPushNotifEnabled: "true" }, { inputNeededNotifEnabled: 0 }, { autoCompactEnabled: null },
396 |       { editorMode: "emacs" }, { theme: "a".repeat(65) }, { theme: "abc_def" }, { theme: 1 }, { theme: "abc\n" },
397 |     ];
398 |     for (const setting of cases) {
399 |       const value = await f.run(setting);
400 |       expect(value.ok ? "unexpected success" : value.failure).toBe("auth_not_ready");
                                                                    ^
error: expect(received).toBe(expected)

Expected: "auth_not_ready"
Received: "unexpected success"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/supervisor/test/preflight.test.ts:400:63)
(fail) preflight rejects every unlisted settings control and invalid value shape [120.95ms]

1 tests failed:
(fail) preflight rejects every unlisted settings control and invalid value shape [120.95ms]

 32 pass
 1 fail
 384 expect() calls
Ran 33 tests across 1 file. [27.48s]
```

458-extra-setting-verified.log, SHA-256 4b9ce236c8b96ee6e35b9ce5c96bd649db9f3e41199705134f15fd8d9e562387

```text
committed 7021477b7ba80671ef457892af84a69170f4ba36300e60568372b19c595851f5 packages/supervisor/src/preflight.ts
restored 7021477b7ba80671ef457892af84a69170f4ba36300e60568372b19c595851f5 packages/supervisor/src/preflight.ts
git status --porcelain for the restored path is empty
```

### Addendum 2 unread input

Diff with trailing whitespace removed. 593-break-host-echo-diff.log, SHA-256 1b50eb9e18ff7b1668dc4e62e46b2cdaeaefe30d68eb3d3eb82f46956054ffb6

```diff
diff --git a/packages/pty-host/src/terminal.ts b/packages/pty-host/src/terminal.ts
index 9009665..786b29f 100644
--- a/packages/pty-host/src/terminal.ts
+++ b/packages/pty-host/src/terminal.ts
@@ -76,7 +76,6 @@ export function spawnGoverned(
       }
     },
   });
-  terminal.localFlags &= ~8; // ECHO on macOS and Linux.
   const child = Bun.spawn([path, ...argv], {
     terminal,
     detached: true,
```

596-break-unread-test.log, SHA-256 a8c09d6fcb4d2bcf50a4a5dab607dd071278b7042dcb3e79a10ec3617ad3fae6

```text
bun test v1.4.2 (744846f84)

test/phase3b/pty-input-echo.test.ts:
42 |         } else if (fact.kind === "exited") {
43 |           exitCode = fact.code;
44 |           host.closeStdin();
45 |         }
46 |       }
47 |       expect(output).toBe("received\r\n");
                          ^
error: expect(received).toBe(expected)

- "received
+ "synthetic input
+ received
  "

- Expected  - 1
+ Received  + 2

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/pty-input-echo.test.ts:47:22)
(fail) the PTY host does not echo a line written before the child reads it [181.39ms]

 0 pass
 1 fail
 1 expect() calls
Ran 1 test across 1 file. [200.00ms]
```

603-verify-host-restore.log, SHA-256 92154a009171bc6b9883b8a78aff1e3937c9328047227ee4fa8b112aef7ac7e4

```text
committed 18d4acdd270d9c36b6d7a30748609eb6ccffef59b2adb359543e46575f76784f packages/pty-host/src/terminal.ts
restored 18d4acdd270d9c36b6d7a30748609eb6ccffef59b2adb359543e46575f76784f packages/pty-host/src/terminal.ts
git status --porcelain for the restored path is empty
```

### Addendum 2 lifecycle output

Diff with trailing whitespace removed. 593-break-host-echo-diff.log, SHA-256 1b50eb9e18ff7b1668dc4e62e46b2cdaeaefe30d68eb3d3eb82f46956054ffb6

```diff
diff --git a/packages/pty-host/src/terminal.ts b/packages/pty-host/src/terminal.ts
index 9009665..786b29f 100644
--- a/packages/pty-host/src/terminal.ts
+++ b/packages/pty-host/src/terminal.ts
@@ -76,7 +76,6 @@ export function spawnGoverned(
       }
     },
   });
-  terminal.localFlags &= ~8; // ECHO on macOS and Linux.
   const child = Bun.spawn([path, ...argv], {
     terminal,
     detached: true,
```

598-break-lifecycle-test.log, SHA-256 f6b0343ad407b5b91467f653197b7e64b339d5ab0679f1bcebbaebbf09d7328b

```text
bun test v1.4.2 (744846f84)

packages/pty-host/test/main-guard.test.ts:
(pass) direct invocation without a control channel fails before PTY creation [19.06ms]
(pass) a command-line executable path confers no launch authority [17.99ms]
(pass) an ambient MADV_ variable confers no launch authority [18.06ms]
(pass) the first frame must be a launch frame [18.40ms]
(pass) an artifact hash mismatch fails closed with no child created [18.31ms]
330 |     expect(kinds.filter((k) => k === kind)).toHaveLength(1);
331 |   }
332 |
333 |   const acks = facts.filter((f) => f.kind === "ack");
334 |   expect(acks.map((f) => f.ofKind).sort()).toEqual(["input", "resize", "terminate"]);
335 |   expect(outputText(facts)).toBe("ping\r\n");
                                  ^
error: expect(received).toBe(expected)

  "ping
+ ping
  "

- Expected  - 0
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/pty-host/test/main-guard.test.ts:335:29)
(fail) a valid session lifecycle emits every fact in order exactly once, with no truncation [21.52ms]
(pass) natural child exit without a terminate command publishes an exact marker, drained, and exited exactly once [27.59ms]
(pass) a second launch frame is rejected, not ignored, and never creates another child [20.08ms]
(pass) a malformed steady-state frame is diagnosed, fails non-zero, and closes the session exactly once [31.70ms]
(pass) early child output cannot precede launched and ready, and is required, not merely allowed [28.34ms]
(pass) RED (Task 41): await_pty path must not force-close the PTY master before natural ptyClosed settlement — the confirmed Linux data-loss defect [6.00ms]
(pass) clean PTY closure: child exit alone cannot emit drained; output before closure is retained; closure precedes drained; drained precedes exited [0.27ms]
(pass) PTY closure EIO after child exit is normal join success (Linux close representation), drained then exited [0.61ms]
(pass) PTY closure timeout: a never-settling ptyClosed fails closed within an injected bound, no drained, no exited [41.58ms]
(pass) post-closure callback: an output callback after markClosed() is recorded as an invariant failure, not silently accepted or dropped, and emits no late output fact [0.13ms]
(pass) drain correctness: a large, spaced-out shutdown tail fully arrives before drained, which precedes exited [792.81ms]
(pass) PTY closes first, child.exited resolves more than two event-loop turns later: normal lifecycle succeeds without false containment [2.17ms]
(pass) PTY EIO (Linux normal-close representation) then child exit: join succeeds, no automatic live-child failure [0.60ms]
(pass) PTY fails while child is authoritatively still alive: containment exactly once, reader closes, non-zero diagnostic, no drained/exited, no unhandled rejection, no real PID signaled [5008.07ms]
(pass) unexpected clean PTY closure while child authoritatively alive: contained exactly once, no drained/exited, no real PID signaled [5007.44ms]
(pass) a code-less generic SIGKILL failure propagates: fail-closed, no silent success [2005.58ms]
(pass) steady-state child-exit-first lifecycle is unchanged: no containment signal, drained only after clean PTY closure, then exited [1.62ms]
(pass) production probe: reaped Bun child fields mean not running [0.23ms]
(pass) production probe: kill(0) success with non-zombie process is running; ESRCH is not running [0.42ms]
(pass) production probe: EPERM, EACCES, and unknown kill(0) errors fail closed as running [0.19ms]
(pass) production probe: Linux /proc stat zombie parsing handles command names with parentheses [0.10ms]
(pass) production probe: macOS ps zombie states including Z+ are recognized [0.06ms]
(pass) production probe EPERM on PTY-first path contains once (fail closed), never successful join [0.72ms]

1 tests failed:
(fail) a valid session lifecycle emits every fact in order exactly once, with no truncation [21.52ms]

 27 pass
 1 fail
 701 expect() calls
Ran 28 tests across 1 file. [13.10s]
```

603-verify-host-restore.log, SHA-256 92154a009171bc6b9883b8a78aff1e3937c9328047227ee4fa8b112aef7ac7e4

```text
committed 18d4acdd270d9c36b6d7a30748609eb6ccffef59b2adb359543e46575f76784f packages/pty-host/src/terminal.ts
restored 18d4acdd270d9c36b6d7a30748609eb6ccffef59b2adb359543e46575f76784f packages/pty-host/src/terminal.ts
git status --porcelain for the restored path is empty
```

### R7 present

Diff with trailing whitespace removed. 641-break-present-diff.log, SHA-256 59a240015c36d2888c32f7aba49b5beb56bfbf4e721fe60b3f66b4b668d1da16

```diff
diff --git a/apps/madbridge/src/tui/live/composition.ts b/apps/madbridge/src/tui/live/composition.ts
index 49a5092..9579ad7 100644
--- a/apps/madbridge/src/tui/live/composition.ts
+++ b/apps/madbridge/src/tui/live/composition.ts
@@ -81,7 +81,7 @@ export async function composeLiveSession(start: Start): Promise<Result> {
       await close();
       return failed("activate");
     }
-    try { await start.present(built.state.client); }
+    try { void built.state.client; }
     catch { await close(); return failed("present"); }
     return { exitCode: 0, close };
   } finally {
```

644-break-present-test.log, SHA-256 e22b162aeb89eacccd8e473de4c183b00a243c139240f8b34c9e5ac89a92a25f

```text
bun test v1.4.2 (744846f84)

test/phase3b/composition.test.ts:
3 |
4 | test("both stand-ins pass probes and attestation before present", async () => {
5 |   const result = await runOfflineScenario("healthy");
6 |   expect(result.detail).toBe("");
7 |   expect(result.code).toBe(0);
8 |   expect(result.activated).toBe(true);
                               ^
error: expect(received).toBe(expected)

Expected: true
Received: false

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/composition.test.ts:8:28)
(fail) both stand-ins pass probes and attestation before present [532.39ms]
(pass) a failed health barrier exits nonzero naming the component [266.15ms]
(pass) a second attester invocation refuses the fourth call before the child receives it [817.76ms]
(pass) composition refuses disallowed user, managed, project and local settings before launch [485.25ms]
(pass) startup cancellation closes the subscription and ends the stand-in group [334.73ms]
56 |
57 | test("monitor failures after activation durably interrupt with the registered reason", async () => {
58 |   for (const [mode, reason] of [["fallback", "identity_mismatch"], ["madv-auth", "authentication_expired"]] as const) {
59 |     const result = await runOfflineScenario(mode);
60 |     expect(result.detail).toBe("");
61 |     expect(result.activated).toBe(true);
                                  ^
error: expect(received).toBe(expected)

Expected: true
Received: false

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/composition.test.ts:61:30)
(fail) monitor failures after activation durably interrupt with the registered reason [303.69ms]

 4 pass
 2 fail
 39 expect() calls
Ran 6 tests across 1 file. [2.76s]
```

646-verify-present.log, SHA-256 fd7cd45cd86700f3921d72cd713fdd99dee400f38cc837f9484bf0ab877f3d50

```text
committed e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
restored e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
git status --porcelain for the restored path is empty
```

### R7 component failure status

Diff with trailing whitespace removed. 648-break-barrier-diff.log, SHA-256 6e31e3182452db33748db46f0e4ee7501d3946ce673c82001ff544235dc2c435

```diff
diff --git a/apps/madbridge/src/tui/live/composition.ts b/apps/madbridge/src/tui/live/composition.ts
index 49a5092..87d9e74 100644
--- a/apps/madbridge/src/tui/live/composition.ts
+++ b/apps/madbridge/src/tui/live/composition.ts
@@ -73,6 +73,7 @@ export async function composeLiveSession(start: Start): Promise<Result> {
       signal: controller.signal, attesterFor: createStartAttesters() });
     if (!built.ok) {
       await rollbackBuild(built.partialState);
+      if (built.failedStep === "storage") return { exitCode: 0, close: async () => {} };
       return failed(built.failedStep, built.detail);
     }
     let closing: Promise<void> | undefined;
```

651-break-barrier-test.log, SHA-256 4a7e1f348349e3c385c999c32542cbb9ff9c24ba9b50ce7e84233a3de252b7dd

```text
bun test v1.4.2 (744846f84)

test/phase3b/composition.test.ts:
(pass) both stand-ins pass probes and attestation before present [324.59ms]
18 |   }
19 | }, 45_000);
20 |
21 | test("a failed health barrier exits nonzero naming the component", async () => {
22 |   const result = await runOfflineScenario("barrier");
23 |   expect(result.code).toBe(1);
                           ^
error: expect(received).toBe(expected)

Expected: 1
Received: 0

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/composition.test.ts:23:23)
(fail) a failed health barrier exits nonzero naming the component [240.58ms]
(pass) a second attester invocation refuses the fourth call before the child receives it [699.91ms]
(pass) composition refuses disallowed user, managed, project and local settings before launch [487.33ms]
(pass) startup cancellation closes the subscription and ends the stand-in group [329.51ms]
(pass) monitor failures after activation durably interrupt with the registered reason [1006.78ms]

 5 pass
 1 fail
 64 expect() calls
Ran 6 tests across 1 file. [3.11s]
```

653-verify-barrier.log, SHA-256 dad090b09fccbd790bb554354fce199086836bbc94310a7abb45e7d4c0972832

```text
committed e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
restored e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
git status --porcelain for the restored path is empty
```

### R7 fourth call

Diff with trailing whitespace removed. 655-break-budget-diff.log, SHA-256 66919ebafb10482dc3f68d9f720720a006ac9991b010b074dbda63a01b030b09

```diff
diff --git a/apps/madbridge/src/tui/live/composition.ts b/apps/madbridge/src/tui/live/composition.ts
index 49a5092..6147a67 100644
--- a/apps/madbridge/src/tui/live/composition.ts
+++ b/apps/madbridge/src/tui/live/composition.ts
@@ -25,7 +25,7 @@ function failed(component: string, detail: string = component): Result {
 function writeBudget(): () => boolean {
   let calls = 2;
   return () => {
-    if (calls >= 3) return false;
+    if (calls >= 4) return false;
     calls++;
     return true;
   };
```

658-break-budget-test.log, SHA-256 0249aa02ed6103f6d0649a00b44b1d1296a76f36132ddcddce380793e07898b6

```text
bun test v1.4.2 (744846f84)

test/phase3b/composition.test.ts:
(pass) both stand-ins pass probes and attestation before present [439.55ms]
(pass) a failed health barrier exits nonzero naming the component [316.78ms]
27 | }, 45_000);
28 |
29 | test("a second attester invocation refuses the fourth call before the child receives it", async () => {
30 |   for (const surface of ["claude-code", "madv-surface"]) {
31 |     const result = await repeatInstalledAttester(surface);
32 |     expect(result.detail).toContain("surface=" + surface + " cause=attestation_budget_exhausted");
                               ^
error: expect(received).toContain(expected)

Expected to contain: "surface=claude-code cause=attestation_budget_exhausted"
Received: "unexpected success"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/composition.test.ts:32:27)
(fail) a second attester invocation refuses the fourth call before the child receives it [361.85ms]
(pass) composition refuses disallowed user, managed, project and local settings before launch [484.56ms]
(pass) startup cancellation closes the subscription and ends the stand-in group [352.23ms]
(pass) monitor failures after activation durably interrupt with the registered reason [1178.59ms]

 5 pass
 1 fail
 62 expect() calls
Ran 6 tests across 1 file. [3.15s]
```

660-verify-budget.log, SHA-256 79131a7c844dc310f454aa24ea277a3073aa10639b95db387cc94d3079d26c99

```text
committed e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
restored e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
git status --porcelain for the restored path is empty
```

### R7 missing local settings source

Diff with trailing whitespace removed. 662-break-settings-diff.log, SHA-256 04dfcaafa5cc879d9bfdd461132c5f6bf387647cec76bd9d13869a0cc911ea40

```diff
diff --git a/apps/madbridge/src/tui/live/composition.ts b/apps/madbridge/src/tui/live/composition.ts
index 49a5092..3aa877c 100644
--- a/apps/madbridge/src/tui/live/composition.ts
+++ b/apps/madbridge/src/tui/live/composition.ts
@@ -67,7 +67,7 @@ export async function composeLiveSession(start: Start): Promise<Result> {

   try {
     const preflight = await runPurePreflight({ ...start.preflight, envelope: { ...envelope },
-      settingsSources: sources.paths, signal: controller.signal });
+      settingsSources: sources.paths.slice(0, 3), signal: controller.signal });
     if (!preflight.ok) return failed("preflight", preflight.failure);
     const built = await runLiveTransactionalBuild({ sessionId: crypto.randomUUID(), envelope, plan: preflight.plan,
       signal: controller.signal, attesterFor: createStartAttesters() });
```

665-break-settings-test.log, SHA-256 2f218b65355bf500f0f4ce2ba76dda9025b81e25cde4ad99ec6cdb936c6056dc

```text
bun test v1.4.2 (744846f84)

test/phase3b/composition.test.ts:
(pass) both stand-ins pass probes and attestation before present [348.25ms]
(pass) a failed health barrier exits nonzero naming the component [313.78ms]
(pass) a second attester invocation refuses the fourth call before the child receives it [791.01ms]
36 | }, 90_000);
37 |
38 | test("composition refuses disallowed user, managed, project and local settings before launch", async () => {
39 |   for (const location of ["user", "managed", "project", "local"] as const) {
40 |     const result = await runOfflineScenario(location);
41 |     expect(result.code).toBe(1);
                             ^
error: expect(received).toBe(expected)

Expected: 1
Received: 0

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/composition.test.ts:41:25)
(fail) composition refuses disallowed user, managed, project and local settings before launch [709.03ms]
(pass) startup cancellation closes the subscription and ends the stand-in group [396.97ms]
(pass) monitor failures after activation durably interrupt with the registered reason [1116.09ms]

 5 pass
 1 fail
 63 expect() calls
Ran 6 tests across 1 file. [3.69s]
```

667-verify-settings.log, SHA-256 3da20117b9aa67b58d7298509ba1d8f81cdc90f140d29fccb9f5f5dd45382b13

```text
committed e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
restored e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
git status --porcelain for the restored path is empty
```

### R7 foreground cancellation

Diff with trailing whitespace removed. 669-break-cancel-diff.log, SHA-256 596c3d306e7ac37cafd66c2378b48c1d213ed2f2d5ade7e880a6a8a5a275eabe

```diff
diff --git a/apps/madbridge/src/tui/live/composition.ts b/apps/madbridge/src/tui/live/composition.ts
index 49a5092..3fd72c6 100644
--- a/apps/madbridge/src/tui/live/composition.ts
+++ b/apps/madbridge/src/tui/live/composition.ts
@@ -60,7 +60,7 @@ export async function composeLiveSession(start: Start): Promise<Result> {
   const controller = new AbortController();
   const abort = () => controller.abort();
   const caller = start.preflight.signal;
-  caller.addEventListener("abort", abort, { once: true });
+  void caller;
   process.once("SIGINT", abort);
   process.once("SIGTERM", abort);
   if (caller.aborted) abort();
```

672-break-cancel-test.log, SHA-256 d18cb55c49646d8f1ea4cbfdb65f03f297350140cec45e4fddb8bb02cda5d0cb

```text
bun test v1.4.2 (744846f84)

test/phase3b/composition.test.ts:
(pass) both stand-ins pass probes and attestation before present [382.38ms]
(pass) a failed health barrier exits nonzero naming the component [293.70ms]
(pass) a second attester invocation refuses the fourth call before the child receives it [770.96ms]
(pass) composition refuses disallowed user, managed, project and local settings before launch [486.84ms]
46 |   }
47 | }, 45_000);
48 |
49 | test("startup cancellation closes the subscription and ends the stand-in group", async () => {
50 |   const result = await runOfflineScenario("cancel");
51 |   expect(result.detail).toContain("surface=claude-code cause=attestation_cancelled");
                             ^
error: expect(received).toContain(expected)

Expected to contain: "surface=claude-code cause=attestation_cancelled"
Received: "step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=attestation_deadline"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/composition.test.ts:51:25)
(fail) startup cancellation closes the subscription and ends the stand-in group [30351.16ms]
(pass) monitor failures after activation durably interrupt with the registered reason [1098.04ms]

 5 pass
 1 fail
 64 expect() calls
Ran 6 tests across 1 file. [33.41s]
```

674-verify-cancel.log, SHA-256 f063fe590fcc4d83b4aacf1497e82f6df77676e1d7c19b7ee74c6f3007522ba9

```text
committed e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
restored e8379412980ca24b54fa92c675cee658ac5f61a6dce5bec88fb407315728694c apps/madbridge/src/tui/live/composition.ts
git status --porcelain for the restored path is empty
```

### R7 active monitor interruption

Diff with trailing whitespace removed. 676-break-monitor-diff.log, SHA-256 22651aa9a92176c911dff50f7f2c12d725801b531ab71a9dfcaf4b921d13794d

```diff
diff --git a/packages/supervisor/src/build.ts b/packages/supervisor/src/build.ts
index 94f7887..6c1f8dc 100644
--- a/packages/supervisor/src/build.ts
+++ b/packages/supervisor/src/build.ts
@@ -643,7 +643,7 @@ async function executeBuild(
       const reason = cause === "auth_failed" ? "authentication_expired"
         : cause === "provider_error" || cause === "endpoint_refused" ? "adapter_failure" : "identity_mismatch";
       const phase = currentBroker.snapshotProjectionInput().lifecycle.phase;
-      if (phase === "active" || phase === "paused") {
+      if (phase === "paused") {
         void currentBroker.interrupt(reason, surface + ": " + cause, "high", sources.nextEventId(), null, executionId)
           .catch(() => { for (const host of hosts) host.handle.closeStdin(); });
       }
```

679-break-monitor-test.log, SHA-256 6c60e6e220c55e29cbe0f168852baae2e3cfa47b4c14b4e2925bb645ab94c2e5

```text
bun test v1.4.2 (744846f84)

test/phase3b/composition.test.ts:
(pass) both stand-ins pass probes and attestation before present [374.40ms]
(pass) a failed health barrier exits nonzero naming the component [301.91ms]
(pass) a second attester invocation refuses the fourth call before the child receives it [765.57ms]
(pass) composition refuses disallowed user, managed, project and local settings before launch [477.06ms]
(pass) startup cancellation closes the subscription and ends the stand-in group [374.42ms]
55 | }, 45_000);
56 |
57 | test("monitor failures after activation durably interrupt with the registered reason", async () => {
58 |   for (const [mode, reason] of [["fallback", "identity_mismatch"], ["madv-auth", "authentication_expired"]] as const) {
59 |     const result = await runOfflineScenario(mode);
60 |     expect(result.detail).toBe("");
                               ^
error: expect(received).toBe(expected)

Expected: ""
Received: "present"

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/composition.test.ts:60:27)
(fail) monitor failures after activation durably interrupt with the registered reason [5356.65ms]

 5 pass
 1 fail
 58 expect() calls
Ran 6 tests across 1 file. [7.67s]
```

681-verify-monitor.log, SHA-256 5aa598c6cbe0a9f2da2a99c904eac121fe377566431f623bffa00ffbb166ff38

```text
committed 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d packages/supervisor/src/build.ts
restored 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d packages/supervisor/src/build.ts
git status --porcelain for the restored path is empty
```

### R8 response id precedence

Diff with trailing whitespace removed. 709-break-precedence-diff.log, SHA-256 483ddfcf61561ca650d0994fd2bbd6949de90a043515048dc4af6cd02852c51f

```diff
diff --git a/packages/adapter-madv-surface/src/index.ts b/packages/adapter-madv-surface/src/index.ts
index c75e0db..6491d9b 100644
--- a/packages/adapter-madv-surface/src/index.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -178,10 +178,12 @@ export class MadvSurfaceParser {
     } else if (value.type === "model_response") {
       if (this.state !== "waiting" && !(this.state === "tools" && this.tools.size === 0)) { this.fail("identity_mismatch", "event_order"); return; }
       if (typeof value.response_model !== "string" || value.response_model.length === 0) { this.fail("identity_unavailable", "model_field_absent"); return; }
+      if (typeof value.response_id !== "string" || value.response_id.length === 0) {
+        this.fail("identity_mismatch", "response_predicate"); return;
+      }
       if (/claude|anthropic/i.test(value.response_model)) { this.fail("model_refused", "anthropic_model"); return; }
       if (!/^minimax[-_]/i.test(value.response_model)) { this.fail("domain_unresolved", "unknown_family"); return; }
       if (value.response_model !== this.context.model
-        || typeof value.response_id !== "string" || value.response_id.length === 0
         || value.response_independence_domain !== this.context.independenceDomain
         || value.provider !== this.context.provider || value.profile !== "minimax"
         || value.endpoint_host !== "api.minimax.io" || value.tls_verified_host !== "api.minimax.io") {
```

712-break-precedence-test.log, SHA-256 a579f1a0b6f73ae454e4ec543fe3fb7e4d62ec7ea9a1e1a9718348c953a5cd30

```text
bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/response-precedence.test.ts:
12 |       response_independence_domain: "minimax", tls_verified_host: "api.minimax.io" };
13 |     const stream = JSON.stringify(init) + "\n" + JSON.stringify(response) + "\n";
14 |     const result = parseMadvIdentity(stream, model, ["0.1.2"]);
15 |     return result.ok ? "accepted" : result.cause;
16 |   });
17 |   expect(outcomes).toEqual(["model_refused", "domain_unresolved"]);
                        ^
error: expect(received).toEqual(expected)

  [
-   "model_refused",
-   "domain_unresolved",
+   "identity_mismatch",
+   "identity_mismatch",
  ]

- Expected  - 2
+ Received  + 2

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/adapter-madv-surface/test/response-precedence.test.ts:17:20)
(fail) refused and unknown model families precede a missing response id [1.25ms]

 0 pass
 1 fail
 1 expect() calls
Ran 1 test across 1 file. [13.00ms]
```

714-verify-precedence.log, SHA-256 39db7a25077b2ac401db8768e7551d9edb9cb43d610cef2337debdcae6d361b1

```text
committed c3a4fcf9370dc3b6408d665d4b5006b311433c85e1adced552f6b1926e40082c packages/adapter-madv-surface/src/index.ts
restored c3a4fcf9370dc3b6408d665d4b5006b311433c85e1adced552f6b1926e40082c packages/adapter-madv-surface/src/index.ts
git status --porcelain for the restored path is empty
```

### R8 required authentication variable

Diff with trailing whitespace removed. 716-break-required-diff.log, SHA-256 9fc742ad0aa15fb10ca5cfd716a92007c2c3eec64cdb7ffb37a62e59a03af049

```diff
diff --git a/packages/supervisor/src/environment.ts b/packages/supervisor/src/environment.ts
index 0bb4168..8967ec6 100644
--- a/packages/supervisor/src/environment.ts
+++ b/packages/supervisor/src/environment.ts
@@ -20,7 +20,7 @@ const allowlists: Readonly<Record<string, EnvironmentAllowlistV1>> = Object.free
       { name: "SHELL", required: true, secret: false },
       { name: "TERM", required: true, secret: false },
       { name: "TMPDIR", required: true, secret: false },
-      { name: "MINIMAX_API_KEY", required: true, secret: true },
+      { name: "MINIMAX_API_KEY", required: false, secret: true },
       { name: "LANG", required: false, secret: false },
       { name: "LC_ALL", required: false, secret: false },
       { name: "LC_CTYPE", required: false, secret: false },
```

719-break-required-test.log, SHA-256 a973b5a341a1a166ca9e9fc70782ef794e90053627321a398743ea9eda461e12

```text
bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-allowlist.test.ts:
(pass) madv-surface-v1 selects exactly the B6 variable set [0.18ms]
21 |   for (const name of names) {
22 |     const remaining = { ...synthetic };
23 |     delete remaining[name];
24 |     if (required.includes(name)) {
25 |       expect(() => buildAllowlistedEnvironment(registration, remaining))
26 |         .toThrow("Missing required environment variable " + name + " for madv-surface-v1");
              ^
error: expect(received).toThrow(expected)

Expected substring: "Missing required environment variable MINIMAX_API_KEY for madv-surface-v1"

Received function did not throw
Received value: {
  HOME: "offline-value-HOME.",
  PATH: "offline-value-PATH.",
  SHELL: "offline-value-SHELL.",
  TERM: "offline-value-TERM.",
  TMPDIR: "offline-value-TMPDIR.",
  LANG: "offline-value-LANG.",
  LC_ALL: "offline-value-LC_ALL.",
  LC_CTYPE: "offline-value-LC_CTYPE.",
  USER: "offline-value-USER.",
}

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/packages/supervisor/test/madv-allowlist.test.ts:26:10)
(fail) madv allowlist pins the required and secret attribute of every variable [0.58ms]

 1 pass
 1 fail
 8 expect() calls
Ran 2 tests across 1 file. [12.00ms]
```

721-verify-required.log, SHA-256 52894c23f7729a2162e225822baef7ac378c4b0488d29a917d3c6350be3d1057

```text
committed 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb packages/supervisor/src/environment.ts
restored 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb packages/supervisor/src/environment.ts
git status --porcelain for the restored path is empty
```

### R8 application seam import

Diff with trailing whitespace removed. 723-break-import-diff.log, SHA-256 35fca757df0d9b79d6dfde33f1fdc448261fcd2f7270551bc8df4a6d1cc209bd

```diff
diff --git a/apps/madbridge/src/tui/live/stand-in-import-break.ts b/apps/madbridge/src/tui/live/stand-in-import-break.ts
new file mode 100644
index 0000000..ef8a1df
--- /dev/null
+++ b/apps/madbridge/src/tui/live/stand-in-import-break.ts
@@ -0,0 +1 @@
+import { runTransactionalBuildWithDependencies } from "../../../../../packages/supervisor/src/build";
```

726-break-import-test.log, SHA-256 f7349f99c50011559e841972b9664cf7d4db505d01a35fcfd88545c6566b54fe

```text
bun test v1.4.2 (744846f84)

test/phase3b/separation.test.ts:
41 |   for (const path of appSources(apps)) {
42 |     const text = readFileSync(path, "utf8");
43 |     if (!text.includes("WithDependencies") && !text.includes("supervisor/src/")) continue;
44 |     if (usesSeam(ts.createSourceFile(path, text, ts.ScriptTarget.Latest))) imports.push(path);
45 |   }
46 |   expect(imports).toEqual([]);
                       ^
error: expect(received).toEqual(expected)

- []
+ [
+   "/Users/michaeldaley/builds/m1-r1/tui/apps/madbridge/src/tui/live/stand-in-import-break.ts",
+ ]

- Expected  - 1
+ Received  + 3

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/separation.test.ts:46:19)
(fail) application code imports neither internal supervisor seam [22.71ms]
(pass) the original public build still fails closed without an attester [675.82ms]

 1 pass
 1 fail
 6 expect() calls
Ran 2 tests across 1 file. [825.00ms]
```

728-verify-import.log, SHA-256 90ea6bbf8566d11ad2b3c4357433304b8300abcf4b4cf09f4790a074fd87e08e

```text
absent apps/madbridge/src/tui/live/stand-in-import-break.ts
git status is empty
```

### R8 missing legacy attester

Diff with trailing whitespace removed. 730-break-legacy-diff.log, SHA-256 0803734f2415e2a8856b5cd57696ed99f5213dd0dca0b6a8d1c9f9e68a9949f5

```diff
diff --git a/packages/supervisor/src/build.ts b/packages/supervisor/src/build.ts
index 94f7887..31552aa 100644
--- a/packages/supervisor/src/build.ts
+++ b/packages/supervisor/src/build.ts
@@ -1009,6 +1009,7 @@ async function executeBuild(
               reportFailure(host.executionId, execution.surface, reason);
               return failAt(step, "reattestation_failed", currentExecutionIds);
             };
+            if (!live && reg !== undefined && typeof attester !== "function") continue;
             if (reg === undefined || typeof attester !== "function") {
               return refuse(execution.surface === "madv-surface" ? "identity_unavailable" : "attestation_missing");
             }
```

733-break-legacy-test.log, SHA-256 2a14ee25365b5264be8ca2ad784c2d8ddb8d1d912930bec9661c842b94aef4df

```text
bun test v1.4.2 (744846f84)

test/phase3b/separation.test.ts:
(pass) application code imports neither internal supervisor seam [23.90ms]
51 |   try {
52 |     const result = await runTransactionalBuild({
53 |       sessionId: "offline-no-attester", envelope: fixture.envelope, plan: fixture.plan,
54 |     });
55 |     try {
56 |       expect(result.ok).toBe(false);
                             ^
error: expect(received).toBe(expected)

Expected: false
Received: true

      at <anonymous> (/Users/michaeldaley/builds/m1-r1/tui/test/phase3b/separation.test.ts:56:25)
(fail) the original public build still fails closed without an attester [116.09ms]

 1 pass
 1 fail
 2 expect() calls
Ran 2 tests across 1 file. [264.00ms]
```

735-verify-legacy.log, SHA-256 5d4bf1493b463da20284154ddc898234ad2bd109360118da036b5c6a987c6114

```text
committed 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d packages/supervisor/src/build.ts
restored 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d packages/supervisor/src/build.ts
git status --porcelain for the restored path is empty
```

### Offline transcripts

Both evidence entry points used the production composition. Healthy runs: 748-evidence-healthy.log, SHA-256 fbab5290c64f53287802189e4ded27aea28019a871d00ffa751d8937aad60561. Failure and fallback runs: 751-evidence-failures.log, SHA-256 5dbe984af49955c02ca150a9bd42dbdf6afbba4d90ebabdcb450defdd9826b47. Script digests: 758-evidence-digests.log, SHA-256 e31f21897a79cba5dc49c49d9517704acacd5cdd78491444dfd6aa4b3d9884fb. Source manifest SHA-256 `b074b13998eca4c583d8e59ac4303c643ea6f652da1066364bb30a81919b2587`. Packet SHA-256 `3dc677145aabdfb10446d3b505575d6690ca3b08fa07057dd108c4343b7f5d28`.

```text
5c8321b34c5f0b7b659e8ab33a237b316dbc5d5d0db754cdf1236f403d083af9  attestation-failure.txt
b76e91e35c62d816011f970775f1fc3b90920806965d30e1189c4eb1748e2c26  barrier-failure.txt
40cc9f0c803ebd300986e12b0cdbce5032e7b622f45bfc585a04c2b42889de72  fallback.txt
ac5c60ff7016f0be0903b8cb5beccfc28d156e2f604a29551f475983cd19504f  healthy-claude-code.txt
2a078ee78a47a06d853057c8d27200d1eeadb9ca489b50ae57750080376c5f73  healthy-madv-surface.txt
```

The PTY host still chooses the child's working directory, and other readable files there are outside the environment allowlist. The TUI uses the relative supervisor and madv-surface adapter source imports required by B16. The host disables terminal echo before spawn. Whether a real surface enables it again remains unverified offline.

### Full run

Runtime, frozen install, typecheck, fresh runtime, logged wait and bare test ran in order. The lockfile matched the base before and after at SHA-256 a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830. The compiler printed nothing. 775-full-suite.log, SHA-256 e7d912fcb2dc582f2893b9ceaef10ef1ba375d3f0feb928f547550362733df60.

- 765-full-runtime.log, SHA-256 52c15d60d95d705d1731dcce3126e7e19fd0293739e4d80a4544469a0eab617d
- 766-full-lock-before.log, SHA-256 1432d96378b2828b971bdb5ae9ea1e5b641acd079ed7813ad768e5cf8a821576
- 767-full-install.log, SHA-256 f07ec9d6e4e02a62fe5012252fb3a53e494988199468af226474ae23d94e72aa
- 768-full-lock-after.log, SHA-256 1432d96378b2828b971bdb5ae9ea1e5b641acd079ed7813ad768e5cf8a821576
- 769-full-install-state.log, SHA-256 21764d781540503d12ad2d27f9edd1c7465f2d62cd90e978017d28df773818b7
- 770-full-restore-install-mode.log, SHA-256 e052fcf7d3dc25c181aa621c6e28d71c4c34e753c7c4f0ab73365c2019c2319a
- 771-full-clean.log, SHA-256 bf7dae0d2a1042364d560f89088d900f26b3c6d6287ded6db7fb72d38afad260
- 772-full-typecheck.log, SHA-256 764f372007f65422d036346061a5c0eb6a05e4d71e01765d050bf00426207a6b
- 773-full-suite-runtime.log, SHA-256 d30b545eb28f623e3bd16cb82e5bf2a1544ea0f327e9b8a9887f3ee4cd0ac622
- 774-full-suite-load.log, SHA-256 799af491cfbd163d10b3f46a36572ac558b9d0916f33dafb1486c99e3d9191f7
- 775-full-suite.log, SHA-256 e7d912fcb2dc582f2893b9ceaef10ef1ba375d3f0feb928f547550362733df60

```text
 2078 pass
 0 fail
 27981 expect() calls
Ran 2078 tests across 160 files. [260.69s]
```

No additional listing run was necessary. Full result list: 788-full-test-list.log, SHA-256 4bfd4435ff6f71ca87be0fd8cd124903c2702f0f396d1c1678196207f3ed57a8. Comparison against the recorded base list: 789-full-comparison.log, SHA-256 1f4eabcd4cea9f6619524dce37feb35cae654dcb43bedc89822610aa8c3544a4.

```text
Every one of 2048 base tests passed at the same file and full name.
Tests: 2048 + 30 = 2078; files: 151 + 9 = 160.
Base source: 064-resumed-baseline.log SHA-256 36590a0c31beb1f2f612d9aeb2d712783ffb63f63d5bb6fe470a817a5ceabfdf
Head source: 775-full-suite.log SHA-256 e7d912fcb2dc582f2893b9ceaef10ef1ba375d3f0feb928f547550362733df60
packages/adapter-claude-code/test/live.test.ts | Claude encodes one stream-json user line | pass
packages/adapter-claude-code/test/live.test.ts | Claude hands a partial line to its monitor and interrupts on fallback or model drift | pass
packages/adapter-claude-code/test/live.test.ts | Claude keeps the result deadline and closes on cancellation | pass
packages/adapter-claude-code/test/live.test.ts | Claude rejects a tool call or a third round-trip | pass
packages/adapter-claude-code/test/live.test.ts | Claude rejects malformed, missing, duplicate and echoed events | pass
packages/adapter-claude-code/test/live.test.ts | Claude subscribes first and accepts only complete firstParty identity evidence | pass
packages/adapter-madv-surface/test/live.test.ts | madv encodes no_tools only on the attestation message | pass
packages/adapter-madv-surface/test/live.test.ts | madv preserves a later partial event and checks later responses | pass
packages/adapter-madv-surface/test/live.test.ts | madv rejects attestation tools and extra round-trips by their typed cause | pass
packages/adapter-madv-surface/test/live.test.ts | madv requires init, model response, assistant and success in order | pass
packages/adapter-madv-surface/test/live.test.ts | madv waits for result through its deadline and closes on cancellation | pass
packages/adapter-madv-surface/test/response-precedence.test.ts | refused and unknown model families precede a missing response id | pass
packages/supervisor/test/live-port.test.ts | a continuous failure before activation fails reattestation for its surface | pass
packages/supervisor/test/live-port.test.ts | the live port passes the session and signal and rejects untrusted failure detail | pass
packages/supervisor/test/madv-allowlist.test.ts | madv allowlist pins the required and secret attribute of every variable | pass
packages/supervisor/test/preflight.test.ts | preflight accepts the governed settings and each allowed setting value | pass
packages/supervisor/test/preflight.test.ts | preflight rejects every unlisted settings control and invalid value shape | pass
test/phase3b/composition.test.ts | a failed health barrier exits nonzero naming the component | pass
test/phase3b/composition.test.ts | a second attester invocation refuses the fourth call before the child receives it | pass
test/phase3b/composition.test.ts | both stand-ins pass probes and attestation before present | pass
test/phase3b/composition.test.ts | composition refuses disallowed user, managed, project and local settings before launch | pass
test/phase3b/composition.test.ts | monitor failures after activation durably interrupt with the registered reason | pass
test/phase3b/composition.test.ts | startup cancellation closes the subscription and ends the stand-in group | pass
test/phase3b/detectors.test.ts | registration detectors identify auth expiry and attestation failures by surface | pass
test/phase3b/pty-input-echo.test.ts | the PTY host does not echo a line written before the child reads it | pass
test/phase3b/separation.test.ts | application code imports neither internal supervisor seam | pass
test/phase3b/separation.test.ts | the original public build still fails closed without an attester | pass
test/phase3b/settings-sources.test.ts | managed settings refuses unvalidated files and the governed remote copy | pass
test/phase3b/settings-sources.test.ts | managed settings selects the platform folder and refuses an unsupported platform | pass
test/phase3b/settings-sources.test.ts | settings sources include the supplied user, managed, project and local directories | pass
```

Changed paths: 791-full-changed-paths.log, SHA-256 ce04eea0004caa694e633de819f90047cf61780a88bc54a35ed1cbbf18146726. The path, whitespace, pin, lifecycle-test, protected-file and repository cleanliness checks are recorded through 797-full-untracked.log, SHA-256 51cd51ff6099a96e85f812354e14dd5a6602dd8411e642bb854efc38ea73aa41.

```text
apps/madbridge/src/tui/live/composition.ts
apps/madbridge/src/tui/live/managed-settings.ts
apps/madbridge/src/tui/live/settings-sources.ts
docs/verification/phase-3b-m1-build-log.md
docs/verification/phase-3b-m1-evidence.md
packages/adapter-claude-code/src/detectors.ts
packages/adapter-claude-code/src/index.ts
packages/adapter-claude-code/src/live.ts
packages/adapter-claude-code/test/live.test.ts
packages/adapter-madv-surface/src/detectors.ts
packages/adapter-madv-surface/src/index.ts
packages/adapter-madv-surface/src/live.ts
packages/adapter-madv-surface/test/live.test.ts
packages/adapter-madv-surface/test/response-precedence.test.ts
packages/pty-host/src/terminal.ts
packages/pty-host/test/main-guard.test.ts
packages/supervisor/src/build.ts
packages/supervisor/src/index.ts
packages/supervisor/src/preflight.ts
packages/supervisor/test/live-port.test.ts
packages/supervisor/test/madv-allowlist.test.ts
packages/supervisor/test/preflight.test.ts
scripts/phase3b/failures.ts
scripts/phase3b/healthy-starts.ts
scripts/phase3b/transcript.ts
test/phase3a/harness-separation.test.ts
test/phase3b/composition.test.ts
test/phase3b/detectors.test.ts
test/phase3b/offline.ts
test/phase3b/preflight-input.ts
test/phase3b/pty-input-echo.test.ts
test/phase3b/scenarios.ts
test/phase3b/separation.test.ts
test/phase3b/settings-sources.test.ts
test/phase3b/stand-in.ts
test/phase3b/wire-facts.ts
```

### Declarations and outstanding Founder work

No live call was made, no real surface was run, no real key was used and no Founder configuration folder was read. No capability record was written or renewed outside a disposable storage root created by a test or evidence script. No request left the host other than the permitted package downloads of bun install --frozen-lockfile. The M1 entry is reachable only from offline tests and evidence scripts.

The Founder still checks the session record and runs B24 from fresh clones on both certification hosts. B25 reserves the guarded push and draft pull request for the Founder. Independent review, hosted verification and all live runs remain outstanding. All builder breaks were exercised.

### Run and command receipts

The table gives the command as identified by its source log, the recorded uptime, UTC times for Bun, exit status and SHA-256. Each test and evidence command follows its numbered load receipt. A wait with several readings gives the first and last; its log contains them all. The first runtime halt invalidated runs 033, 040 and 042. The Founder removed 124. The final report records commands made after this closing text, including the log-only commit and its gates.

| Log | Command | Uptime | Start and end UTC | Exit | SHA-256 |
| --- | --- | --- | --- | --- | --- |
| 065-health.log | rg -n 'HealthBarrier\|healthBarrier\|health barrier\|present\(' tui/packages tui/apps/madbridge/src/tui tui/test/phase3a/runtime-harness.ts -g '*.ts' -g '!*.test.ts' | 7:27  3 users, load averages: 3.12 2.16 2.00 | — | 1 | 10eef9b47c7484a6b3be6f3dd60ef65462fc3fc0b0cb6509bd2025da96d661c3 |
| 066-m1-design.log | rg -n -A12 -B3 'M1 —\|M1:\|Authentication.expiry detector\|authentication.expiry detector\|Phase 3A §2.1\|attestation prompt' tui/docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md tui/docs/decisions/DEC-20261108-04-phase-3b-standing-commission.md | 7:27  3 users, load averages: 3.12 2.16 2.00 | — | 0 | 0c73b79a30ea51c34d301c61e3a2d8ba248e14703b98679ddc6cd7d03854fdaf |
| 067-host-protocol.log | rg -n -C 5 'kind: "ready"\|kind: "launched"\|frame.kind === "resize"\|type HostFactFrame' tui/packages/pty-host/src/main.ts tui/packages/pty-host/src/frames.ts | 7:27  3 users, load averages: 3.12 2.16 2.00 | — | 0 | 437ad8139fa349e2dfce7e02f1bc3f3e1d38f9f760c098548726076a1662f4f8 |
| 068-file-layout.log | rg --files tui/packages/supervisor/src tui/packages/adapter-claude-code/src tui/packages/adapter-madv-surface/src tui/packages/broker/src \| sort | 7:27  3 users, load averages: 3.12 2.16 2.00 | — | 0 | b5c7dc168e901378980636b24ebc2037bb3480d7cf175a7da653675896ae307a |
| 069-settings.log | git -C tui show HEAD:docs/decisions/DEC-20261119-02-managed-settings-branch.md \| sed -n '/^B2\./,/^## Part C/p' | 7:27  3 users, load averages: 3.12 2.16 2.00 | — | 0 | 0375b3823a0f1acc631d81a8441273764160e2b0edca12d01c444c84a06ac3a4 |
| 070-detector-registration.log | rg -n -C 5 'auth_failure_detection' tui/packages/protocol/src/adapter-registry.ts | 7:27  3 users, load averages: 3.12 2.16 2.00 | — | 0 | bbdab59651f1da041609ec99a4abc6cab8be5b67968415790c9345548b9b2458 |
| 071-barrier.log | rg -in 'barrier\|healthcheck\|health.check' tui/packages tui/apps tui/test/phase3a -g '*.ts' -g '*.tsx' \| rg -i 'barrier\|healthcheck' \| head -180 | 7:27  3 users, load averages: 3.27 2.22 2.02 | — | 0 | d70052975e83ae72d262f1ea1f8bcfbd75a089cbf0d54ee22cba3ffa24121980 |
| 072-spec-section.log | rg -n -A76 '^###? 2\.1' tui/docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md \| head -110 | 7:27  3 users, load averages: 3.27 2.22 2.02 | — | 0 | e380a540389dec0786165a6cffbdfe9a76ac89d6184ebb7baae320740abc8946 |
| 073-registration-and-launch.log | sed -n '590,840p;1042,1190p' tui/packages/supervisor/src/build.ts | 7:27  3 users, load averages: 3.27 2.22 2.02 | — | 0 | 90f9b5710d840d169d261dc5b9bc137ca913687882eb47bab363aa9a8402ce55 |
| 074-budget-and-git.log | sed -n '18,55p' logs/026-seam-references.log | 7:27  3 users, load averages: 3.27 2.22 2.02 | — | 0 | 1c47e685ec7acb60cccc8f41979b286c9757edb3bd0d6a5875cdfe5d8e26a50c |
| 075-base-list.log | python3 - <<'PY' | 7:33  3 users, load averages: 2.67 2.90 2.47 | — | 0 | 501aae2c5064e2f3e0b761685485ede9a89d75c35db6946dc94ff95d6c243a63 |
| 076-base-receipt.log | shasum -a 256 logs/064-resumed-baseline.log && git -C tui status --porcelain --untracked-files=all | 7:33  3 users, load averages: 2.67 2.90 2.47 | — | 0 | 9f01d4a3c031798e18eae4a93191dab19aa282899255651b1561d8df1be60e5c |
| 077-settings-and-cwd.log | rg -n -C 5 'configuration.source\|settings\.json\|CLAUDE_CONFIG_DIR' tui/docs/decisions/PLAN-OPEN-2-environment-allowlists.md \| tail -105 | 7:34  3 users, load averages: 2.20 2.77 2.44 | — | 0 | 1cec5131a551f1fe7b68c1d5e83d60f51dd1f4f9a390fb99a119f60c993f5a4b |
| 078-input-guards.log | sed -n '1,130p' tui/test/phase3a/harness-separation.test.ts | 7:34  3 users, load averages: 2.20 2.77 2.44 | — | 0 | 5923bfb5137b9f3ff5d63b995eb60691c182c9c5039f02033ff0f03db8429909 |
| 079-broker-and-barrier.log | rg -n -C 3 'async interrupt\(\|interrupt\(' tui/packages/broker/src/runtime-broker.ts | 7:34  3 users, load averages: 2.20 2.77 2.44 | — | 0 | cb8f1ae9b71d537cbd8f8e1a3bbe0061daf5f41488c9b0d55e89e0f2984bfc93 |
| 080-storage-limits.log | rg -n -C 3 'validateStorageRoot\(\|realpathSync\(\|available.*platform\|observedHostFacts\|make.*Record' tui/packages/supervisor/test/madv-preflight-support.ts tui/packages/storage/src/root.ts | 7:34  3 users, load averages: 2.20 2.77 2.44 | — | 0 | 06a2e3d142e82e40a733ced32f8240cfb411ef1d93332216e558cbdeb44e4fdf |
| 081-composition-import-rules.log | rg -n -C 3 'packages/supervisor\|@madventures/supervisor\|packages/broker\|@madventures/broker\|ADAPTER_REGISTRY\.get\|PTY host\|pty-host' tui/test/phase3a/architecture-phase3a.test.ts \| tail -185 | 7:34  3 users, load averages: 2.50 2.81 2.45 | — | 0 | d7b694796816d53e6b9b663a08e60e28947a2f82f431e17f93a31f2e4caec11f |
| 082-record-fixtures.log | rg -n 'putCapabilityRecord\|writeCapabilityRecord\|storeCapabilityRecord' tui/packages/storage/src tui/test/phase3a/runtime-harness.ts | 7:34  3 users, load averages: 2.50 2.81 2.45 | — | 0 | 9b13b4922d0df6f32aeb9d9502a9c135e82c49b817416a7e394ca2255c83975d |
| 083-spec-constraints.log | rg -n -A12 '\*\*Authentication\|auth_failure_detection\|per-response\|fallback\|Evidence precedence' tui/docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md \| head -100 | 7:34  3 users, load averages: 2.50 2.81 2.45 | — | 0 | f9aa0b1b90a5a96b9447cfa8b2bfc9d4b26655a28b6073e907f27ea25ad7bea4 |
| 084-probe-path.log | git -C tui show HEAD:packages/supervisor/src/attestation.ts | 7:34  3 users, load averages: 2.19 2.74 2.43 | — | 0 | 6c4b755aeb8349f8c20f8b7d829ac7393b7432838b6c0ff536d7b6eaa97ba7ee |
| 085-allowlist.log | git -C tui show HEAD:packages/supervisor/src/environment.ts | 7:34  3 users, load averages: 2.19 2.74 2.43 | — | 0 | 5a9d814dee933d4e8ad6a0f2b14babb4272645dacb5036713516bed19677b1ae |
| 086-storage-files.log | rg --files tui/packages/storage/src | 7:34  3 users, load averages: 2.19 2.74 2.43 | — | 0 | e9420f0484c69a34a877e159a5307d25951d264baa893ef191adc9370fc5fe6c |
| 087-base-preflight-import.log | sed -n 865,902p tui/test/phase3a/evidence-pipeline.test.ts | 7:34  3 users, load averages: 2.19 2.74 2.43 | — | 0 | a5f2f4752716d6a7c1b4c3c3bf2a1c7946fb3f90bd2941363a20051eed6d23f1 |
| 088-opening.log | python3 - <<'PY' | 7:36  3 users, load averages: 2.13 2.53 2.39 | — | 0 | 7369a8eb9731c10fbc340b7048e22e13eca5528baaa4b5b30285e31e0c6ef138 |
| 089-message-opening.log | cat > /private/tmp/m1-r1-IH7Fxlbw/message-01.txt <<'END' | 7:37  3 users, load averages: 2.09 2.50 2.38 | — | 0 | ffb6ca115cf0a22f40a0ad2c30df24872fda18010d5ec036106277c6236fc4f0 |
| 090-stage-opening.log | git add docs/verification/phase-3b-m1-build-log.md | 7:37  3 users, load averages: 1.92 2.46 2.37 | — | 0 | 0df8c12f43543d8db27ca86fca45ab2b24f95d4de0a895b8a222874f7e327e63 |
| 091-check-opening.log | git diff --cached --check | 7:37  3 users, load averages: 1.92 2.46 2.37 | — | 0 | 87725610dfa210de0cebe7317aa1c35597f41a83cdd00aa07a4e63cce321f6c1 |
| 092-commit-opening.log | git commit -F /private/tmp/m1-r1-IH7Fxlbw/message-01.txt | 7:37  3 users, load averages: 1.92 2.46 2.37 | — | 0 | 315c9cc644e1007dff57d7429a1aa0bbd1c395d1588979eecc16ddd54950c6ff |
| 093-opening-sha.log | git log -1 '--format=%H %P %s' | 7:37  3 users, load averages: 1.92 2.46 2.37 | — | 0 | 01a0d234c222e160f1d6b3b1db080b44f4b702e235ef10f035e7b55b5f2a0499 |
| 094-storage-root.log | cat tui/packages/storage/src/storage-root.ts tui/packages/storage/src/session-storage.ts | 7:37  3 users, load averages: 1.89 2.40 2.35 | — | 0 | 652838afae4a22fdb8ca663669b9a784ffa2cf1e112b6c519aa32e23d9e37b7d |
| 095-fixture-build.log | sed -n 1,285p tui/packages/supervisor/test/build-rollback.test.ts | 7:37  3 users, load averages: 1.89 2.40 2.35 | — | 0 | d0b90ab30bc72ed1399ae8e24f0006b63ad81098b05f62e4d456f75d383b061d |
| 096-runtime-contract.log | sed -n 324,371p tui/packages/broker/src/runtime-broker.ts | 7:37  3 users, load averages: 1.89 2.40 2.35 | — | 0 | 08cc5b46c24f4fcbea7d7c5f4de9b01aacaa30dc4bc0e3be1e8da9daeebf0fae |
| 097-option-types.log | cat tui/tsconfig.json tui/packages/supervisor/tsconfig.json | 7:37  3 users, load averages: 1.89 2.40 2.35 | — | 1 | 9f20d95d8e7c1a935b712cedbf01c8b770544aad0999f0298b1b5be352e8c207 |
| 098-edit-port.log | python3 - <<'PY' | 7:38  3 users, load averages: 8.78 4.05 2.95 | — | 0 | 37b5648ac40165e04482dd1980d3e5ba040f473011bd7e8ad75ffa3e1bf46239 |
| 099-port-tests.log | mkdir -p tui/test/phase3b && | 7:39  3 users, load averages: 5.05 3.76 2.90 | — | 0 | 7e47ef32fa6725f903937cb474b794cd39c7d1a3fd039b9eaab7c1530fe668c9 |
| 100-r1-runtime.log | command -v bun; command -v bunx; shasum -a 256 /Users/michaeldaley/.bun/bin/bun; bun --version; bun -e 'process.stdout.write(Bun.revision)' | 7:39  up 1 day, 23:07, 3 users, load averages: 3.82 3.56 2.85 | Mon Nov 23 12:39:39 UTC 2026 / Mon Nov 23 12:39:39 UTC 2026 | 0 | cfe607f7a57fff088f66870972ae3f76c7f49c57db762e7c19e1e72cee6af564 |
| 101-r1-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 7:40  up 1 day, 23:07, 3 users, load averages: 2.95 3.37 2.81 to 7:41  up 1 day, 23:09, 3 users, load averages: 1.59 2.82 2.65 | — | 0 | 4bf3115b02ffe41f6371610b4c92f72be60e46b4ce28c9420d1212935e8f2f97 |
| 102-r1-port.log | bun test packages/supervisor/test/live-port.test.ts | 7:41  up 1 day, 23:09, 3 users, load averages: 1.59 2.82 2.65 | Mon Nov 23 12:41:47 UTC 2026 / Mon Nov 23 12:41:47 UTC 2026 | 1 | 384f14862159f105d58fc4b39fa588242df4ab331af0437f67537b5c9e564fe0 |
| 103-subscription-test.log | rg -n -A50 'an abandoned facts\|a parked subscriber' tui/packages/broker/test/pty-host-supervisor.test.ts | 7:40  3 users, load averages: 2.50 3.25 2.78 | — | 0 | 420c13cd619d06fa250f87744f56915d1b39c73b803c4fba74fa1214b6d8bbd3 |
| 104-event-fields.log | rg -n 'model_usage_since_last_result\|canonicalModel\|permission_denials\|num_turns' tui/docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md tui/packages/adapter-claude-code -g '!*.jsonl' | 7:40  3 users, load averages: 2.50 3.25 2.78 | — | 0 | 7a743dbe82d2975134e8d834d36ad5c893de5b46627c8cf35ce4c753a6e15b5e |
| 105-foundation.log | rg -n 'interface BuildInput\|class.*Capability\|scope.*allowed\|type LifecyclePhase' tui/packages/supervisor/src/build.ts tui/packages/ledger/src tui/packages/protocol/src/task-envelope.ts | 7:40  3 users, load averages: 2.50 3.25 2.78 | — | 0 | b09bafb040a25319dec6b99b0404c6d9d16c8d9e1519c514882145c0c60e14ca |
| 106-r1-correction.log | python3 - <<'PY' | 7:42  3 users, load averages: 1.47 2.69 2.61 | — | 0 | 3b616e51a5b7faa502f23966bc1ed1cd59280270d2928096b90e9be894442569 |
| 107-r1-retest-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 7:45  up 1 day, 23:12, 3 users, load averages: 2.43 2.43 2.50 to 7:47  up 1 day, 23:14, 3 users, load averages: 1.72 2.23 2.41 | — | 0 | e6d2d4931b08c7f98c1c3bd813fbd5576e8649bce488bca1d96c5f6d67dce5e5 |
| 108-r1-retest.log | bun test packages/supervisor/test/live-port.test.ts | 7:47  up 1 day, 23:14, 3 users, load averages: 1.72 2.23 2.41 | Mon Nov 23 12:47:14 UTC 2026 / Mon Nov 23 12:47:15 UTC 2026 | 0 | 005996ba5f6049b72bea2164bbdb0a421d6b12a2e30d15b1fac45cf97279fa98 |
| 109-adapter-package-files.log | cat tui/packages/adapter-claude-code/package.json tui/packages/adapter-madv-surface/package.json | 7:45  3 users, load averages: 2.33 2.40 2.49 | — | 0 | 9b40408b69353f1f57275363d963030c309f50d44bb95b576e436f78708f3dd6 |
| 110-surface-handoff.log | rg -n -A11 'B3\. \*\*The parser\|beginRequest\|response.*assistant\|Evidence timing' tui/docs/decisions/DEC-20261115-02-phase-3b-m0.md | 7:45  3 users, load averages: 2.33 2.40 2.49 | — | 1 | f626db0a5fb12b87f1094d9540895b64d2bb31e351aed7a1c6af823a5771ec1b |
| 111-broker-phase.log | sed -n 34,50p tui/packages/ledger/src/rebuild.ts | 7:45  3 users, load averages: 2.33 2.40 2.49 | — | 0 | 74f2faedea7e7f86f52de7541b5563dfb6d9cb2f5bd8868b9a70d908435078af |
| 112-r1-message.log | cat > /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh <<'SH' | 7:47  3 users, load averages: 1.61 2.19 2.40 | — | 0 | 13fd9981f85875d480ebe07677cad2989a973b194c3a1304d345577d170f515e |
| 113-r1-typecheck.log | bunx tsc --noEmit | 7:47  up 1 day, 23:15, 3 users, load averages: 1.74 2.17 2.39 | Mon Nov 23 12:47:45 UTC 2026 / Mon Nov 23 12:47:48 UTC 2026 | 0 | bee222926173c7cb47cbcd1499463538a6f26f30b21a70edc61ba8a91e3e2165 |
| 114-r1-message-check.log | zsh /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh /private/tmp/m1-r1-IH7Fxlbw/message-02.txt | 7:47  3 users, load averages: 1.70 2.15 2.37 | — | 0 | d81ffe66ea31521e05886f9282a63ee1bd8586babeea32b42b79af87bb93b813 |
| 115-r1-stage.log | git add packages/supervisor/src/build.ts packages/supervisor/src/index.ts packages/supervisor/test/live-port.test.ts test/phase3a/harness-separation.test.ts test/phase3b/offline.ts | 7:47  3 users, load averages: 1.70 2.15 2.37 | — | 0 | 172b81a9bc7814330c9b42f010fb75dfda967b0e041ec67e4df5992d96ce7a51 |
| 116-r1-staged-check.log | git diff --cached --check | 7:47  3 users, load averages: 1.70 2.15 2.37 | — | 0 | 2c16c62a8427900cd523b19ea52db53c71a9ca411b5b40ceadb8b826b21198cd |
| 117-r1-pin.log | git diff --cached -- test/phase3a/harness-separation.test.ts | 7:47  3 users, load averages: 1.70 2.15 2.37 | — | 0 | 722a1e6b703c71e45bce26e6a89191eafd7790de43e3860b0bb15042d8c4d413 |
| 118-r1-commit.log | git commit -F /private/tmp/m1-r1-IH7Fxlbw/message-02.txt | 7:48  3 users, load averages: 1.65 2.13 2.37 | — | 0 | 0b5f642fb1c4307d1c3029f73e0eedab1305afc36be590e5a7956dac3b8c6d68 |
| 119-r1-revision.log | git log -1 '--format=%H %P %s' | 7:48  3 users, load averages: 1.65 2.13 2.37 | — | 0 | 3312881080acc1fd83508eab36c84563d893a5ae58b5b4d94e0ed2e2e029a1d6 |
| 120-break-untrusted-detail.log | python3 - <<'PY' | 7:48  3 users, load averages: 1.80 2.13 2.36 | — | 0 | 7a05c921b5e867fda9f5d094d0e47163d54eb60c84e6d1164c514c53bef1a528 |
| 121-break-detail-diff.log | git -C tui diff -- packages/supervisor/src/build.ts | 7:48  3 users, load averages: 1.80 2.13 2.36 | — | 0 | 85f9920356efc3fff664fa80611e9433303d803852f932e213dca3ff45bdbcea |
| 122-break-detail-runtime.log | command -v bun; command -v bunx; shasum -a 256 /Users/michaeldaley/.bun/bin/bun; bun --version; bun -e 'process.stdout.write(Bun.revision)' | 7:49  up 1 day, 23:17, 3 users, load averages: 1.91 2.07 2.31 | Mon Nov 23 12:49:52 UTC 2026 / Mon Nov 23 12:49:53 UTC 2026 | 0 | d654c1cdc5ea059b9ef9040ed54db33d3f85d411a385fb490046fa0d7a686d67 |
| 123-break-detail-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 7:50  up 1 day, 23:17, 3 users, load averages: 1.96 2.06 2.30 | — | 0 | be42b174d17f52ea3c12943cdb57ea11e1a2d4d4217b8399af89f8e69b837c1b |
| 125-read-addendum.log | cat prompt/DEC-20261123-01-addendum-1-environment-values-in-logs.md | 8:22  3 users, load averages: 3.42 3.08 2.67 | — | 0 | ca4181c5c5bb8737337405a4edc5b6c07f473f2a1ada282bf4b3717f7f50b730 |
| 126-resume-manifest.log | (cd prompt && shasum -a 256 -c SHA256.txt) | 8:22  3 users, load averages: 2.97 3.00 2.64 | — | 0 | eeb8506f067d587772854b2fabf52168b801d317f47728040b75a585df83f9fd |
| 127-resume-files.log | ls -A prompt && cat prompt/SHA256.txt | 8:22  3 users, load averages: 2.97 3.00 2.64 | — | 0 | e95e3c4dfac2041c83080322f82a4cbad9934d39a0aadd6760e16f4d9224a77a |
| 128-version.log | /Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version | 8:22  3 users, load averages: 2.97 3.00 2.64 | — | 0 | bccc2ab1cbeeea4e93ac4ed9169d99fdb690344bbbc342248d6cae03d308bb7b |
| 129-revision.log | git -C tui branch --show-current && git -C tui rev-parse HEAD | 8:22  3 users, load averages: 2.97 3.00 2.64 | — | 0 | 8db8aa8ffb59cb4ea3850336e531b86f31898a2bd315907a7bb98e5ba74c8a52 |
| 130-deleted-log.log | test ! -e logs/124-break-detail-test.log | 8:22  3 users, load averages: 2.97 3.00 2.64 | — | 0 | fb7669c22cb4acb2a0ae433f356dad8a237386251b6ec657352f1738d0035bda |
| 131-reports.log | ls -A pr && shasum -a 256 pr/m1-halt-1-report.md | 8:22  3 users, load averages: 2.97 3.00 2.64 | — | 0 | 3d2da6bd2028bb2bd4e70b88946b6bd5f6966e37b4eec8cb77f84a01198cc060 |
| 132-check-break.log | git -C tui diff -- packages/supervisor/src/build.ts | 8:22  3 users, load averages: 2.73 2.95 2.63 | — | 0 | 1a15c93413c3f2e219b8d61c65a23cf931727ab1644df575976c9497da36d60e |
| 133-tree.log | git -C tui status --porcelain | 8:22  3 users, load averages: 2.73 2.95 2.63 | — | 0 | d2dff9fe89654816c3b0c266503fa0c174a3883fdb253b1a7578690ce0fadbd9 |
| 134-restore-port.log | git checkout -- packages/supervisor/src/build.ts | 8:23  3 users, load averages: 2.17 2.80 2.58 | — | 0 | 9e70474d550b32ce6eed878b95c22a793d1bae3e3c9fbe83fbc5a1ce7a82735c |
| 135-restored-status.log | git status --porcelain -- packages/supervisor/src/build.ts | 8:23  3 users, load averages: 2.17 2.80 2.58 | — | 0 | 6b67fd7da623ea39eaeeadd8b40509e50c72e01cf7c90424480d578e6ad1d2d6 |
| 136-restored-digest.log | shasum -a 256 packages/supervisor/src/build.ts | 8:23  3 users, load averages: 2.17 2.80 2.58 | — | 0 | e1c7679bf5b2f0754ff2ef534a6f696879e84322881637941f6bfdd1bf451873 |
| 137-audit-files.log | git diff --name-only 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD | 8:23  3 users, load averages: 2.17 2.80 2.58 | — | 0 | dc0ac07913ccc672929ceba65595b6f7b9b1478a0ce51fa2a7609017e328e303 |
| 138-audit-test-sources.log | cat packages/supervisor/test/live-port.test.ts test/phase3b/offline.ts | 8:23  3 users, load averages: 2.17 2.80 2.58 | — | 0 | 1132f0c399eb94400a2960a124dedc21463cc7172bc4bf4fb3e58c6480ad65f4 |
| 139-test-output-fix.log | python3 - | 8:23  3 users, load averages: 2.31 2.81 2.59 | — | 0 | 3f869c12b9eb7d7e890a93f9d31c300da0f63332947549616c09b07cb0668b7e |
| 140-fix-runtime.log | command -v bun; command -v bunx; shasum -a 256 /Users/michaeldaley/.bun/bin/bun; bun --version; bun -e 'process.stdout.write(Bun.revision)' | 8:24  up 1 day, 23:51, 3 users, load averages: 21.57 7.74 4.40 | Mon Nov 23 13:24:01 UTC 2026 / Mon Nov 23 13:24:01 UTC 2026 | 0 | 4126d7510097897f81b8035104db923c27b337e89e2265f47c5c3d6cf87f3039 |
| 141-fix-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 8:34  up 2 days, 2 mins, 3 users, load averages: 2.23 3.05 3.50 to 8:48  up 2 days, 16 mins, 3 users, load averages: 1.90 3.99 3.85 | — | 0 | b02094d87334a8e2e6c33ea0c75dc29f4ab58d79260fed4c77a86b1147c132ee |
| 142-fix-test.log | bun test packages/supervisor/test/live-port.test.ts | 8:48  up 2 days, 16 mins, 3 users, load averages: 1.90 3.99 3.85 | Mon Nov 23 13:48:24 UTC 2026 / Mon Nov 23 13:48:26 UTC 2026 | 0 | 3612a3b2cc006cd676bd53e0128a37db6339fffbdc0e23fd45106a659df49b63 |
| 143-prepare-fix-message.log | python3 - | 8:35  3 users, load averages: 2.31 2.99 3.46 | — | 0 | 00cdc13780fe0adbe1561a15016744c3d23bbb8d9fc01f81b969ac811c0113af |
| 144-create-break-tools.log | python3 - | 8:36  3 users, load averages: 2.07 2.84 3.38 | — | 0 | e8589589ab80694ab954da21e59fea23574fded75e8fc44957bcd5772d9fdc68 |
| 145-test-self-fix-diff.log | git -C tui diff -- packages/supervisor/test/live-port.test.ts | 8:38  3 users, load averages: 4.05 3.08 3.37 | — | 0 | d8244bbe239c2d4ac931a32843221e45ab0406a4d65c55503f4c716cbc79868f |
| 146-fix-trailers.log | zsh /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh /private/tmp/m1-r1-IH7Fxlbw/message-fix-output.txt | 8:38  3 users, load averages: 4.05 3.08 3.37 | — | 0 | 2ea8b955385e07f5c84a9ddc3f30d2e0a8953b58da4728da54fc70e3d10e47e4 |
| 147-audit-separation-change.log | git -C tui diff 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD -- test/phase3a/harness-separation.test.ts | 8:38  3 users, load averages: 4.05 3.08 3.37 | — | 0 | cf5ac5dc8dd85b6715c71c0ca1725aea26a920019e078fd97ca37b3249d598d4 |
| 148-repeat-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/supervisor/src/build.ts '    ?? (surface === "madv-surface" ? "identity_mismatch" : "attestation_malformed");' '    ?? String(reported);' | 8:48  3 users, load averages: 1.92 3.92 3.83 | — | 0 | 6b7c88a0af95fab36e4fb7de82e6fdad6b50402f8855ac2389a7bcdd4b3d544b |
| 149-repeat-break-diff.log | git -C tui diff -- packages/supervisor/src/build.ts | 8:48  3 users, load averages: 1.92 3.92 3.83 | — | 0 | ea2a1cd4b916d95a8e4dd59701d5f4b6fc7c2ee197d27191e1d1d0c425036170 |
| 150-break-runtime.log | command -v bun; command -v bunx; shasum -a 256 /Users/michaeldaley/.bun/bin/bun; bun --version; bun -e 'process.stdout.write(Bun.revision)' | 10:10  up 2 days,  1:38, 3 users, load averages: 2.88 2.10 2.22 | Mon Nov 23 15:10:32 UTC 2026 / Mon Nov 23 15:10:33 UTC 2026 | 0 | 8c51b9cad94773ceaf4e6424a411dddcf37c048ecf22a2ba0bcccd1286b1fc65 |
| 151-break-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 10:11  up 2 days,  1:39, 3 users, load averages: 2.76 2.18 2.25 to 10:14  up 2 days,  1:41, 3 users, load averages: 1.90 2.17 2.24 | — | 0 | a07c47b48e8caca7c1ef4179b7554d1d2800dd5d6ab8c341d3d85a92853841c8 |
| 152-break-test.log | bun test packages/supervisor/test/live-port.test.ts | 10:14  up 2 days,  1:41, 3 users, load averages: 1.90 2.17 2.24 | Mon Nov 23 15:14:01 UTC 2026 / Mon Nov 23 15:14:03 UTC 2026 | 1 | 7d9d45506b5712682a1511ecc707c7ea15c1965afef67797f2f80bbbb86125af |
| 153-break-receipt.log | shasum -a 256 logs/152-break-test.log | 10:14  3 users, load averages: 1.76 2.13 2.22 | — | 0 | 2f54f7799c82d5d9957c9096391f874744180240d5ff26a27a685361d813e3f0 |
| 154-restore-repeat.log | git checkout -- packages/supervisor/src/build.ts | 10:14  3 users, load averages: 1.76 2.13 2.22 | — | 0 | 8a93216a453dab27e03ccd4bd568a315f13073b14fe652f7d4a8bdff0fa2a280 |
| 155-verify-repeat.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/supervisor/src/build.ts | 10:14  3 users, load averages: 1.76 2.13 2.22 | — | 0 | 4d8e9f7063a6e6b05aa86776edf3754f16f82db932974f2760b0931c0a64ae1d |
| 156-stage-self-fix.log | git add packages/supervisor/test/live-port.test.ts | 10:14  3 users, load averages: 1.76 2.13 2.22 | — | 0 | fa4843323e94577babcc540447ee0305eaebe10885b189add79c2e239cb8b22b |
| 157-check-self-fix.log | git diff --cached --check | 10:14  3 users, load averages: 1.76 2.13 2.22 | — | 0 | 31efaa0990534dfb36f432b3fd6188a4237bcae1669f9986629d60aab2eca276 |
| 158-commit-self-fix.log | git commit -F /private/tmp/m1-r1-IH7Fxlbw/message-fix-output.txt | 10:14  3 users, load averages: 1.76 2.13 2.22 | — | 0 | 8bbf3468674734b2aa2210348e062c16a917a4c0e8882eb7e58d674a3c772be5 |
| 159-self-fix-sha.log | git log -1 '--format=%H %P %s' | 10:14  3 users, load averages: 1.76 2.13 2.22 | — | 0 | 4b473599c4256d18fa571d7478308ffe64822757c5f399ecb715a1a125021da0 |
| 160-break-monitor.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/supervisor/src/build.ts 'const notifyFailure = (reason: string) => reportFailure(host.executionId, execution.surface, reason);' 'const notifyFailure = (_reason: string) => {};' | 10:14  3 users, load averages: 2.22 2.21 2.25 | — | 0 | d6d379f615a146d4436452d9a5123302b616b2d6eceb8a101aa7f52a73949479 |
| 161-break-monitor-diff.log | git -C tui diff -- packages/supervisor/src/build.ts | 10:14  3 users, load averages: 2.22 2.21 2.25 | — | 0 | d9590e77ffd7f13e56dd85a58a4994992f3493a3ba2831ac7b44122f5f274d49 |
| 162-monitor-runtime.log | command -v bun; command -v bunx; shasum -a 256 /Users/michaeldaley/.bun/bin/bun; bun --version; bun -e 'process.stdout.write(Bun.revision)' | 10:21  up 2 days,  1:48, 3 users, load averages: 2.24 2.19 2.21 | Mon Nov 23 15:21:06 UTC 2026 / Mon Nov 23 15:21:06 UTC 2026 | 0 | 60843d69bd16d1acbc32cd8092599c83a6df0784381005c37832a883b59deb52 |
| 163-monitor-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 10:24  up 2 days,  1:51, 3 users, load averages: 1.95 2.16 2.19 | — | 0 | 60ea356a2cb03e4a5feb3c391ae87518ae15d282bf1e3c653bba8397dc2ceca8 |
| 164-monitor-test.log | bun test packages/supervisor/test/live-port.test.ts | 10:24  up 2 days,  1:51, 3 users, load averages: 1.95 2.16 2.19 | Mon Nov 23 15:24:00 UTC 2026 / Mon Nov 23 15:24:01 UTC 2026 | 1 | f7704054d61a75fb801b59618fa584664ef6730554932cf0514199c06c654a12 |
| 165-monitor-receipt.log | shasum -a 256 logs/164-monitor-test.log | 10:24  3 users, load averages: 1.96 2.15 2.19 | — | 0 | 21a06d01270da7ba8fd515123962b03b25461a0d5439a704735f9932387d909a |
| 166-monitor-restore.log | git checkout -- packages/supervisor/src/build.ts | 10:24  3 users, load averages: 1.96 2.15 2.19 | — | 0 | 2ed7ec0a4ee07825bce42756f82bc3a971e5c4adfd9fa9f5edcb0727ace64461 |
| 167-monitor-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/supervisor/src/build.ts | 10:24  3 users, load averages: 1.96 2.15 2.19 | — | 0 | 03d25b7c4a606aa8338ca27dce3e667ec53005143b23bdbf5a88ce9e4d18050d |
| 168-claude-attester.log | cat | 10:25  3 users, load averages: 2.39 2.26 2.23 | — | 0 | 5be2da96999311bfa9ed7a4fc6cca0d3449b77c6e513663575e9e36554b4ff2f |
| 169-write-claude-reader.log | python3 - | 10:25  3 users, load averages: 2.19 2.22 2.22 | — | 0 | 45e2e34c4a2356d1a3d002101a1e995195ba3363896a3cac11573afd3a0615b0 |
| 170-claude-tests.log | cat > tui/test/phase3b/wire-facts.ts <<'TS' | 10:26  3 users, load averages: 2.07 2.16 2.19 | — | 0 | 04f5aeca0201df869e11f449aade842aa8ffacb7867c7d0fbe2cad3cf9803363 |
| 171-claude-monitor-cases.log | python3 - | 10:26  3 users, load averages: 2.34 2.21 2.21 | — | 0 | 7dc86472884e3426ce4d10cd6186b7a48f7c515691aa28937af89b0ca1eebb68 |
| 172-r2-runtime.log | command -v bun; command -v bunx; shasum -a 256 /Users/michaeldaley/.bun/bin/bun; bun --version; bun -e 'process.stdout.write(Bun.revision)' | 10:34  up 2 days,  2:01, 3 users, load averages: 1.63 2.06 2.13 | Mon Nov 23 15:34:16 UTC 2026 / Mon Nov 23 15:34:17 UTC 2026 | 0 | 7e37dcc62294f9a18f20a0061fde58f672200f73dec2860e4c0e75d06e39b94b |
| 173-r2-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 10:35  up 2 days,  2:02, 3 users, load averages: 1.93 2.08 2.13 | — | 0 | a3d7522a21aab3b6b01d5158246e8514a66e6c0fe5cf9dc8c81c51f68d2ac556 |
| 174-r2-test.log | bun test packages/adapter-claude-code/test/live.test.ts | 10:35  up 2 days,  2:02, 3 users, load averages: 1.93 2.08 2.13 | Mon Nov 23 15:35:07 UTC 2026 / Mon Nov 23 15:35:37 UTC 2026 | 0 | 0d108994681a602993b8a77d4937f272621e145a83abe790bd6ccee0b4c6fa51 |
| 175-r2-message.log | python3 - | 10:35  3 users, load averages: 1.74 2.01 2.10 | — | 0 | b6efbf7e590059ece2f36012a136828ce6d06948c22b69308106a080411c2d89 |
| 176-r2-message-check.log | zsh /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh /private/tmp/m1-r1-IH7Fxlbw/message-r2.txt | 10:36  3 users, load averages: 1.85 2.03 2.10 | — | 0 | b255ee4547dcc21bb8ea9e14742dcc9ba0b0423b1de66c897947e7c002bd957f |
| 177-r2-stage.log | git add packages/adapter-claude-code/src/index.ts packages/adapter-claude-code/src/live.ts packages/adapter-claude-code/test/live.test.ts test/phase3b/wire-facts.ts | 10:36  3 users, load averages: 1.85 2.03 2.10 | — | 0 | d511520f62a8c0140cd6d5ea24b1a180dff2f7cd1ad0a847f8125e4f984ec3f6 |
| 178-r2-check.log | git diff --cached --check | 10:36  3 users, load averages: 1.85 2.03 2.10 | — | 0 | 5cfc96848be0f284fc122e2ea39862d756a4d0fbbea231d84b8d5fbcfc82258d |
| 179-r2-commit.log | git commit -F /private/tmp/m1-r1-IH7Fxlbw/message-r2.txt | 10:36  3 users, load averages: 2.04 2.06 2.11 | — | 0 | 69289a0d93aae61e781e84925d12b468fc18b0757ccf1ac6aa0b8c2308392d21 |
| 180-r2-sha.log | git log -1 '--format=%H %P %s' | 10:36  3 users, load averages: 2.04 2.06 2.11 | — | 0 | 3e8f94c85d495c0329980730176e9e28486a8cff29acdfc53d9c96e8a041fa80 |
| 181-encoder-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/adapter-claude-code/src/live.ts 'message: { role: "user", content: text }' 'message: { role: "user", content: "changed" }' | 10:37  3 users, load averages: 1.86 2.00 2.08 | — | 0 | f5c5347367352bbac18c791fa2f9e8c947e291aebbd64388986f32ed2e171592 |
| 182-encoder-diff.log | git -C tui diff -- packages/adapter-claude-code/src/live.ts | 10:37  3 users, load averages: 1.86 2.00 2.08 | — | 0 | 612cad54423f7cc4214c32a1dc1cf73e76427fa6de12b85fee039c90e4b65788 |
| 183-encoder-runtime.log | command -v bun; command -v bunx; shasum -a 256 /Users/michaeldaley/.bun/bin/bun; bun --version; bun -e 'process.stdout.write(Bun.revision)' | 11:04  up 2 days,  2:32, 3 users, load averages: 1.53 1.72 1.76 | Mon Nov 23 16:04:31 UTC 2026 / Mon Nov 23 16:04:32 UTC 2026 | 0 | 1cb1de3fd194315816ef99afcfc462a64cf66e8d629c8e6d0f9447a250a67a3c |
| 184-encoder-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 11:04  up 2 days,  2:32, 3 users, load averages: 1.53 1.72 1.76 | — | 0 | 374c26fcb5786f313d24ea1b61e499425ca0fc888717b69d7252807bf7412b78 |
| 185-encoder-test.log | bun test packages/adapter-claude-code/test/live.test.ts | 11:04  up 2 days,  2:32, 3 users, load averages: 1.53 1.72 1.76 | Mon Nov 23 16:04:34 UTC 2026 / Mon Nov 23 16:05:04 UTC 2026 | 1 | 7c2146f45e5e90b02be40a3693815f871cbee87f2e1a8d14e2cac8f7b7d9603f |
| 186-encoder-receipt.log | shasum -a 256 logs/185-encoder-test.log | 11:05  3 users, load averages: 1.73 1.76 1.77 | — | 0 | 0e25927757621bec0a55d36fc055ee8e85186eeed2a3211af553c299e5ce58eb |
| 187-encoder-restore.log | git checkout -- packages/adapter-claude-code/src/live.ts | 11:05  3 users, load averages: 1.73 1.76 1.77 | — | 0 | d8b99d13a57087649f5b59e61f78000becf380877584beb2f140bed73f061f3a |
| 188-encoder-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/adapter-claude-code/src/live.ts | 11:05  3 users, load averages: 1.73 1.76 1.77 | — | 0 | 25238bac7f38ed50210db27723267046817f99f21ea0e1208f35fcb36fe158d7 |
| 189-provider-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/adapter-claude-code/src/live.ts 'usage.provider === "firstParty"' 'typeof usage.provider === "string"' | 11:05  3 users, load averages: 1.73 1.76 1.77 | — | 0 | a24f4c9b0b6786e9dcb66a61bbd305cf695e49d62c9e6b6024e14e32ee0569ec |
| 190-provider-diff.log | git -C tui diff -- packages/adapter-claude-code/src/live.ts | 11:05  3 users, load averages: 1.83 1.78 1.78 | — | 0 | 3268b7a0e9cf34df123c9ba001ced75a5c6e275eaf9fbc97e5315bf6b9846a5f |
| 191-provider-runtime.log | command -v bun; command -v bunx; shasum -a 256 /Users/michaeldaley/.bun/bin/bun; bun --version; bun -e 'process.stdout.write(Bun.revision)' | 11:05  up 2 days,  2:33, 3 users, load averages: 1.79 1.77 1.77 | Mon Nov 23 16:05:43 UTC 2026 / Mon Nov 23 16:05:44 UTC 2026 | 0 | 976b1a79fc44106fb158534473274d48f92b0115058b942ea3cbb8380b644541 |
| 192-provider-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 11:05  up 2 days,  2:33, 3 users, load averages: 1.79 1.77 1.77 | — | 0 | 6e5a68a2a2ea15d634ebc8b434f7023c003695f9435eb74edfc4f273e342fd6f |
| 193-provider-test.log | bun test packages/adapter-claude-code/test/live.test.ts | 11:05  up 2 days,  2:33, 3 users, load averages: 1.79 1.77 1.77 | Mon Nov 23 16:05:45 UTC 2026 / Mon Nov 23 16:06:15 UTC 2026 | 1 | 8fd80090fd1520948978c07407cb4920d19d776f936249c9b529f13b6ed82343 |
| 194-provider-receipt.log | shasum -a 256 logs/193-provider-test.log | 11:06  3 users, load averages: 1.62 1.73 1.76 | — | 0 | 9ea0a590615ce7aafe84f38b6badcf81c3f3d4fbffb6f8c8a4edc1c5d06f527f |
| 195-provider-restore.log | git checkout -- packages/adapter-claude-code/src/live.ts | 11:06  3 users, load averages: 1.62 1.73 1.76 | — | 0 | e0716fa8f7b5829ec9c8d06bbe9dba6e9af808eb2c522dc3865cffeb25bc92f2 |
| 196-provider-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/adapter-claude-code/src/live.ts | 11:06  3 users, load averages: 1.62 1.73 1.76 | — | 0 | 2dbaf61ce8c78a775bb9e1eea8c768eaae7be96834e5b8c0025a1000807ea617 |
| 197-echo-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/adapter-claude-code/src/live.ts 'if (!nonempty(event.session_id)) return "attestation_malformed";' 'if (event.type === "user") return; | 11:06  3 users, load averages: 1.57 1.72 1.75 | — | 0 | 19ac13a403c9388b553c6759ba8df51be824dc90ce22c4f9c0525564b0df96c3 |
| 198-echo-diff.log | git -C tui diff -- packages/adapter-claude-code/src/live.ts | 11:06  3 users, load averages: 1.57 1.72 1.75 | — | 0 | b591a4abbe04eeca870858e286d897682a1ec93ca9ca4def66119edc80ffaa94 |
| 199-echo-runtime.log | command -v bun; command -v bunx; shasum -a 256 /Users/michaeldaley/.bun/bin/bun; bun --version; bun -e 'process.stdout.write(Bun.revision)' | 11:07  up 2 days,  2:35, 3 users, load averages: 1.58 1.68 1.73 | Mon Nov 23 16:07:33 UTC 2026 / Mon Nov 23 16:07:33 UTC 2026 | 0 | 22510f2ad4a84865fb2dd309754889c7550288f5b2c80f8f5b4c8cde02e0f2f4 |
| 200-echo-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 11:19  up 2 days,  2:46, 3 users, load averages: 1.08 1.54 1.66 | — | 0 | 6a12f0f0ddf91ce1919812dd8828e4337f17c9882d7a4c935c3609720fdf2a9f |
| 201-echo-test.log | bun test packages/adapter-claude-code/test/live.test.ts | 11:19  up 2 days,  2:46, 3 users, load averages: 1.08 1.54 1.66 | Mon Nov 23 16:19:01 UTC 2026 / Mon Nov 23 16:19:31 UTC 2026 | 1 | c5abb6b1ca639cf363ebdecc1f9efbb304c58a378fb2d36b59bfc974b596582a |
| 202-echo-receipt.log | shasum -a 256 logs/201-echo-test.log | 11:19  3 users, load averages: 1.37 1.56 1.67 | — | 0 | b6726cc9c2c9ba12585240c89b9c50fec0024b1a1af73bfaf9aa59a21ecf174d |
| 203-echo-restore.log | git checkout -- packages/adapter-claude-code/src/live.ts | 11:19  3 users, load averages: 1.37 1.56 1.67 | — | 0 | 58354940903bcf352296bb2692298731e4ae39ac005e1cb7c4138e35c9dbd630 |
| 204-echo-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/adapter-claude-code/src/live.ts | 11:19  3 users, load averages: 1.37 1.56 1.67 | — | 0 | ea66052a07c581ba59eaec2b09bd5061a5a16ef7a9c6850752b181cc592960d4 |
| 205-rounds-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/adapter-claude-code/src/live.ts 'event.num_turns + this.retries > 2' 'event.num_turns + this.retries > 3' | 11:19  3 users, load averages: 1.37 1.56 1.67 | — | 0 | 79e6cabb738a7bcf79a19af73486582fd3212da63fa337d48c40abab58db52a6 |
| 206-rounds-diff.log | git -C tui diff -- packages/adapter-claude-code/src/live.ts | 11:19  3 users, load averages: 1.37 1.56 1.67 | — | 0 | 886a00f19ef033b86d7a3b7beea8515203598c539f480707571acdaa37b33522 |
| 207-rounds-runtime.log | command -v bun; command -v bunx; shasum -a 256 /Users/michaeldaley/.bun/bin/bun; bun --version; bun -e 'process.stdout.write(Bun.revision)' | 12:00  up 2 days,  3:28, 3 users, load averages: 2.54 2.25 2.10 | Mon Nov 23 17:00:46 UTC 2026 / Mon Nov 23 17:00:46 UTC 2026 | 0 | 7960bf890aa274f1678e144958d0de463a918c483598284e3c6c66cd6d9de0a8 |
| 208-rounds-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 12:00  up 2 days,  3:28, 3 users, load averages: 2.54 2.25 2.10 to 12:07  up 2 days,  3:34, 3 users, load averages: 1.67 4.31 3.72 | — | 0 | bde797b4f834d1d1176b213a0f8a84606ba462fd51621a361b2d7277404e91f5 |
| 209-rounds-test.log | bun test packages/adapter-claude-code/test/live.test.ts | 12:07  up 2 days,  3:34, 3 users, load averages: 1.67 4.31 3.72 | Mon Nov 23 17:07:18 UTC 2026 / Mon Nov 23 17:07:48 UTC 2026 | 1 | e7331d3f4d7da841240cf28d1f53f91db79977fbeeb18d61d444edf22a9ba075 |
| 210-rounds-receipt.log | shasum -a 256 logs/209-rounds-test.log | 12:07  3 users, load averages: 1.67 4.04 3.64 | — | 0 | 7ba92824994c38447eedb1a603a5c7c82560298552a81065431e81c9f58359db |
| 211-rounds-restore.log | git checkout -- packages/adapter-claude-code/src/live.ts | 12:07  3 users, load averages: 1.67 4.04 3.64 | — | 0 | 071fc3f8b42a036e50608166627aaf65a987396e3fc962211f4118b703567d16 |
| 212-rounds-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/adapter-claude-code/src/live.ts | 12:07  3 users, load averages: 1.67 4.04 3.64 | — | 0 | 6ba4e39424b49d6816d7a4dc474bb2657637da53e07f1114d0dc815014310b82 |
| 213-result-time-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/adapter-claude-code/src/live.ts 'const cause = reader.push(fact.bytes);' 'if (new TextDecoder().decode(fact.bytes).includes('\''"type":"assistant"'\'')) { clearTimeout(timer); deadline = Infinity; } | 12:07  3 users, load averages: 1.67 4.04 3.64 | — | 0 | ad636f040688251a0b8da7a7620c81313326d718bd1509615396cc9953fc6206 |
| 214-result-time-diff.log | git -C tui diff -- packages/adapter-claude-code/src/live.ts | 12:07  3 users, load averages: 1.94 4.05 3.65 | — | 0 | f1e7a57ec1cc04cb471747a10f32e46b81fcb3b73fd25fd6e61c1695cb8e9f26 |
| 215-result-time-runtime.log | command -v bun; command -v bunx; shasum -a 256 /Users/michaeldaley/.bun/bin/bun; bun --version; bun -e 'process.stdout.write(Bun.revision)' | 12:09  up 2 days,  3:36, 3 users, load averages: 3.36 3.93 3.63 | Mon Nov 23 17:09:22 UTC 2026 / Mon Nov 23 17:09:22 UTC 2026 | 0 | d57994ad959715c9e9558a9a7a03aadcaaf94a2f1c6c90444e1ab619b137cf03 |
| 216-result-time-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 12:09  up 2 days,  3:36, 3 users, load averages: 3.36 3.93 3.63 to 12:16  up 2 days,  3:43, 3 users, load averages: 1.92 2.69 3.12 | — | 0 | d2f59f5a71c9ffd52ecb3eaf25b0229d3e0d84ad30151266aba655a059c8d89a |
| 217-result-time-test.log | bun test packages/adapter-claude-code/test/live.test.ts | 12:16  up 2 days,  3:43, 3 users, load averages: 1.92 2.69 3.12 | Mon Nov 23 17:16:24 UTC 2026 / Mon Nov 23 17:16:54 UTC 2026 | 1 | bc7e6a4f917a689fa6c20614fa295568c06f75083b426fcfd346322ca5f48bea |
| 218-result-time-receipt.log | shasum -a 256 logs/217-result-time-test.log | 12:16  3 users, load averages: 1.75 2.58 3.07 | — | 0 | bc26fc0dff6e5f9d86a4f318a1411ce4c71e44dd27ebd93aa58d11426b57a175 |
| 219-result-time-restore.log | git checkout -- packages/adapter-claude-code/src/live.ts | 12:16  3 users, load averages: 1.75 2.58 3.07 | — | 0 | bf3c5c3f2921d681cf6ec470532456ae1d41b6d4662651e5c8e57f6362584c8d |
| 220-result-time-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/adapter-claude-code/src/live.ts | 12:16  3 users, load averages: 1.75 2.58 3.07 | — | 0 | 3eae840a274efed4086003e34b54c78e706ab223fc6b70f17660fff44f100fe1 |
| 221-partial-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/adapter-claude-code/src/live.ts 'this.complete = true; | 12:16  3 users, load averages: 1.75 2.58 3.07 | — | 0 | dbf0911b297e09c2a6ce163c63c4f275c871f4f7a72a3dacd705e8fe2d956b5e |
| 222-partial-diff.log | git -C tui diff -- packages/adapter-claude-code/src/live.ts | 12:16  3 users, load averages: 1.75 2.58 3.07 | — | 0 | bfe6f1cadac9424d881dc58ac7f62d71f8338ecb7f10ab54fa5d62eae03c5da6 |
| 223-partial-runtime.log | command -v bun; command -v bunx; shasum -a 256 /Users/michaeldaley/.bun/bin/bun; bun --version; bun -e 'process.stdout.write(Bun.revision)' | 12:19  up 2 days,  3:46, 3 users, load averages: 1.77 2.26 2.86 | Mon Nov 23 17:19:19 UTC 2026 / Mon Nov 23 17:19:20 UTC 2026 | 0 | bc50f2aef45f5cadee0e39782d2451c5ebbd4dafe45ae0c6cd5cf3619e34818f |
| 224-partial-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 12:19  up 2 days,  3:46, 3 users, load averages: 1.77 2.26 2.86 | — | 0 | c8ca7239d2948bfc58143aed2ca717971a0bdbb4da944fd01f77cbd56436c30e |
| 225-partial-test.log | bun test packages/adapter-claude-code/test/live.test.ts | 12:19  up 2 days,  3:46, 3 users, load averages: 1.77 2.26 2.86 | Mon Nov 23 17:19:22 UTC 2026 / Mon Nov 23 17:19:52 UTC 2026 | 1 | 7d2af7e4295b95302369441e51b731bfe4f2052a86a43893bd4c6b4cbb2758e5 |
| 226-partial-receipt.log | shasum -a 256 logs/225-partial-test.log | 12:19  3 users, load averages: 2.09 2.29 2.85 | — | 0 | 1c561143de51cfd84fc78138d2a4fcc3ae4b6fad96a8edb73c7b8ad0213043fb |
| 227-partial-restore.log | git checkout -- packages/adapter-claude-code/src/live.ts | 12:19  3 users, load averages: 2.09 2.29 2.85 | — | 0 | f74336f9c715ae015f68a19794371b55dfbeb5c9b9955ad548eb288f490dcfe8 |
| 228-partial-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/adapter-claude-code/src/live.ts | 12:19  3 users, load averages: 2.09 2.29 2.85 | — | 0 | ce961864bd663ffcdf85465a06c2497e9bd0c07c48988e17393c5c394edca06a |
| 229-fallback-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/adapter-claude-code/src/live.ts 'event.subtype === "model_refusal_fallback") return "identity_mismatch";' 'event.subtype === "model_refusal_fallback") return;' | 12:19  3 users, load averages: 2.09 2.29 2.85 | — | 0 | 6bb96f8eda400af800bbefb55b3f37d27900820e0f2bf4cdbd7c4622204bd352 |
| 230-fallback-diff.log | git -C tui diff -- packages/adapter-claude-code/src/live.ts | 12:19  3 users, load averages: 2.09 2.29 2.85 | — | 0 | 49724513fa4d6e27b8c1da113d9dd09c84d244227162c59a18ca45a20a3200b6 |
| 231-fallback-runtime.log | command -v bun; command -v bunx; shasum -a 256 /Users/michaeldaley/.bun/bin/bun; bun --version; bun -e 'process.stdout.write(Bun.revision)' | 12:19  up 2 days,  3:47, 3 users, load averages: 2.01 2.26 2.83 | Mon Nov 23 17:19:54 UTC 2026 / Mon Nov 23 17:19:54 UTC 2026 | 0 | b4b44c1fc543c70444aa4827ef9a23c8b768a8f8b7be679cef7269845f8f3450 |
| 232-fallback-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 12:19  up 2 days,  3:47, 3 users, load averages: 2.01 2.26 2.83 to 12:20  up 2 days,  3:48, 3 users, load averages: 1.60 2.14 2.77 | — | 0 | 8eeee8d65d2ac9badade2b43b054fa11351cedcc4f8be941f3a9bd59a5f8e54b |
| 233-fallback-test.log | bun test packages/adapter-claude-code/test/live.test.ts | 12:20  up 2 days,  3:48, 3 users, load averages: 1.60 2.14 2.77 | Mon Nov 23 17:20:26 UTC 2026 / Mon Nov 23 17:20:56 UTC 2026 | 1 | d3f22ef7035acdfbc4e79ff2ad2853faf9ec1bd924902697efe6bbd2677657d7 |
| 234-fallback-receipt.log | shasum -a 256 logs/233-fallback-test.log | 12:22  3 users, load averages: 1.90 2.04 2.65 | — | 0 | 2dabeefea395b6537bf5b692a3e52b1369575fd73fe6eff13fabac6b891440fb |
| 235-fallback-restore.log | git checkout -- packages/adapter-claude-code/src/live.ts | 12:22  3 users, load averages: 1.90 2.04 2.65 | — | 0 | bf03310e7fe88a602b8b64a82152a35458eb3554d01a277e4713fa701c255aa9 |
| 236-fallback-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/adapter-claude-code/src/live.ts | 12:22  3 users, load averages: 1.90 2.04 2.65 | — | 0 | 5f7fd02465cca2f219e2eb1ff2590540d7ec554f5e0e6815239a30c287f49948 |
| 237-madv-parser.log | cat tui/packages/adapter-madv-surface/src/index.ts | 12:22  3 users, load averages: 1.94 2.04 2.64 | — | 0 | fba539ce7a5cfd8e4f9e238f47dbef65d9afd148598e41c399ca8c71d488d5a1 |
| 238-madv-plan.log | tail -n 98 tui/docs/verification/phase-3b-m1-build-log.md | 12:22  3 users, load averages: 1.94 2.04 2.64 | — | 0 | 6ed95045df1a989d9905c5e0121117a616d3f4c3c57b94f1fc0ff150c55d5d2d |
| 239-madv-act.log | sed -n '/^### B17\./,/^### B18\./p' tui/docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md | 12:22  3 users, load averages: 1.94 2.04 2.64 | — | 0 | a91a70b1f14b6b772eec64d8df21aa9efd0adaeb3d526cbfe581cb47af8f122c |
| 240-claude-wire.log | cat tui/packages/adapter-claude-code/src/live.ts tui/test/phase3b/wire-facts.ts | 12:22  3 users, load averages: 1.94 2.04 2.64 | — | 0 | 24a741e737a24124ab5b7a361f21777110f49c0aef6b8b42a55eb4dac0125a55 |
| 241-r3-terms.log | rg -n 'B17\.\|B21\.\|result.*deadline\|beginRequest\|case of.*madv-surface\|second form\|parser.s' tui/docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md | 12:22  3 users, load averages: 1.87 2.02 2.63 | — | 0 | 31ac8bf4600867de7f69e515a1548275dd0e5590eda27d3e98fb30446a6b7ca5 |
| 242-r3-detail.log | sed -n '/^### R3 /,/^### R5 /p' tui/docs/verification/phase-3b-m1-build-log.md | 12:22  3 users, load averages: 1.87 2.02 2.63 | — | 0 | fad5e15e83b10f98dcc9d960e482cba50a43da8a75e0a4cf28bd81580cf39cd2 |
| 243-r3-input.log | rg -n -A30 'interface LiveReattestationInput\|type LiveReattestationInput\|kind: "exited"' tui/packages/supervisor/src/build.ts tui/packages/broker/src/pty-host-supervisor.ts | 12:22  3 users, load averages: 1.87 2.02 2.63 | — | 0 | fe827b600fdec83cd3643543e3e2c9f7319f92aa9b7b21f4a9f7511826f03aa4 |
| 244-madv-criteria.log | sed -n '125,133p;148,170p' tui/docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md | 12:22  3 users, load averages: 1.88 2.02 2.62 | — | 0 | 559da6324b189897f6f22e81f96cb9315b0334952732557d0a2d18e3283cf6b7 |
| 246-r3-fixtures.log | ls -R tui/packages/adapter-madv-surface/test | 12:22  3 users, load averages: 1.88 2.02 2.62 | — | 0 | 67897c873a0b2754f7c6811106f466a22612442697fb7d04fcf5ca1e828c197b |
| 247-fact-types.log | rg -n -A8 'kind: "exited"\|kind: "drained"\|interface BuildSurfaceRegistration\|registration\.independence' tui/packages | 12:22  3 users, load averages: 1.81 2.00 2.61 | — | 0 | 73f69710e58730c7b4d49bd3ed29a5bb514aadabdd75faeeb753716fa0c90a20 |
| 248-registration.log | rg -n -A32 'interface AdapterRegistrationV1\|type AdapterRegistrationV1' tui/packages | 12:22  3 users, load averages: 1.68 1.97 2.60 | — | 0 | 4f50bd2e06c9262e0b110b01627d2e434a08f17e835be9a98e143541897f5393 |
| 249-build-handover.log | sed -n 910,1080p tui/packages/supervisor/src/build.ts | 12:22  3 users, load averages: 1.68 1.97 2.60 | — | 0 | a8e3e4bbe3b7562300b6931792795dfb1b031b796fc158dc39c67453e1b5ad1a |
| 250-r3-parser-edit.log | python3 - | 12:23  3 users, load averages: 2.14 2.05 2.61 | — | 0 | 8ef58c8a7bf4d281a1447b99da1fadd7196e205febf964a6c157afa654def91d |
| 251-r3-attester.log | python3 - | 12:23  3 users, load averages: 1.92 2.01 2.57 | — | 0 | 3b8c09f968b6b4e21e1d225fadb4d0818b5e0616f64565d93fc3b79b5c156be1 |
| 252-r3-runtime.log | command -v bun, command -v bunx, shasum -a 256, bun --version, Bun.revision | 12:33  up 2 days, 4 hrs, 3 users, load averages: 1.75 1.68 2.10 | Mon Nov 23 17:33:15 UTC 2026 / Mon Nov 23 17:33:16 UTC 2026 | 0 | a8d9a6d745e02d5e7910952c35b6ee4a7102de325e5702bfb77d251b743be713 |
| 253-r3-tests.log | python3 - | 12:33  3 users, load averages: 1.86 1.72 2.09 | — | 0 | 95e77f50f1211249fdc0472480a2f29f878127b76609904d214c6d7badc0cbde |
| 254-r3-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 12:44  up 2 days,  4:12, 3 users, load averages: 1.74 1.91 2.05 | — | 0 | 07b68c5c854285f2a0be631b6701b856bf6fc6c8be133979c3433234a5da5c58 |
| 255-r3-test.log | bun test packages/adapter-madv-surface/test/live.test.ts | 12:44  up 2 days,  4:12, 3 users, load averages: 1.74 1.91 2.05 | Mon Nov 23 17:44:46 UTC 2026 / Mon Nov 23 17:45:16 UTC 2026 | 0 | a4a4426276a40de16009c326f877a9ca3e36ae4eac1ca44e0b61efb4fb9408d9 |
| 256-settings-terms.log | sed -n '104,117p;134,149p' tui/docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md | 12:44  3 users, load averages: 2.23 2.01 2.08 | — | 0 | 1dc4929cd9d7663235d32336ed9fc36dc0ab4b8f18dd8e9232e17fb0a781c79b |
| 257-governed-settings.log | cat tui/docs/decisions/DEC-20261119-02-managed-settings-branch.md | 12:44  3 users, load averages: 2.23 2.01 2.08 | — | 0 | 8e65623e40b2dda2577891feb16c4e27f8214cdd455d257f3babb4ccf1b1cabf |
| 258-planned-remaining.log | sed -n '/^### R5 /,/^### R9 /p' tui/docs/verification/phase-3b-m1-build-log.md | 12:44  3 users, load averages: 2.23 2.01 2.08 | — | 0 | 2cc3a7e5cf310555ad528c3928171c28457e187945473f2b032935f671122809 |
| 259-commit-tools.log | cat /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh /private/tmp/m1-r1-IH7Fxlbw/log.zsh | 12:45  3 users, load averages: 2.20 2.01 2.08 | — | 0 | dc17db61b6e50097f05552de8523ef098ca1e2bb677b42e706b894b4dbc3b5df |
| 260-r3-whitespace.log | git -C tui diff --check | 12:45  3 users, load averages: 2.20 2.01 2.08 | — | 0 | 5a3a50b166f11cabdeffd0c84ccff1b0466af67623b382d4e2b3bcfd83b001dd |
| 261-r3-message.log | python3 - | 12:45  3 users, load averages: 2.15 2.01 2.08 | — | 0 | b1673c37239c0fe3bca5050679995b1f038bb5015a7c835363a15fd96f81ef01 |
| 262-r3-trailers.log | zsh /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh /private/tmp/m1-r1-IH7Fxlbw/r3-message.txt | 12:45  3 users, load averages: 2.15 2.01 2.08 | — | 0 | b0f4c3c05fc8a0882756c681466c5d80ed1265fab15ab41c9debc0a8869d6431 |
| 263-r3-receipt.log | shasum -a 256 logs/255-r3-test.log | 12:45  3 users, load averages: 2.13 2.01 2.08 | — | 0 | 49db861b98d756e2342b5085a7d23cb0dde49de976bea8cf8f4ea38291d05878 |
| 264-r3-stage.log | git add packages/adapter-madv-surface/src/index.ts packages/adapter-madv-surface/src/live.ts packages/adapter-madv-surface/test/live.test.ts | 12:45  3 users, load averages: 2.13 2.01 2.08 | — | 0 | 7fce309a476e05f669c3d06635853992cb2c91512713f2b5376a8078e1590b5a |
| 265-r3-commit.log | git commit -F /private/tmp/m1-r1-IH7Fxlbw/r3-message.txt | 12:45  3 users, load averages: 2.13 2.01 2.08 | — | 0 | ac019d5b818edcce46da56733563298662145c73fa2c8ca21032b506a9dadead |
| 266-r3-head.log | git rev-parse HEAD | 12:45  3 users, load averages: 2.13 2.01 2.08 | — | 0 | 4669ce6762d03367dd293996ae23c5f1a621c3ff724988f5312339ac9069bb6a |
| 267-first-write-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/adapter-madv-surface/src/live.ts 'write(encodeAttestationInput(PROMPT))' 'write(encodeUserInput(PROMPT))' | 12:46  3 users, load averages: 1.68 1.92 2.05 | — | 0 | 02cb085d80f0f70464d2f01d07b922980e63fc41a258a53962d0edc5977105d4 |
| 268-first-write-diff.log | git -C tui diff -- packages/adapter-madv-surface/src/live.ts | 12:46  3 users, load averages: 1.68 1.92 2.05 | — | 0 | b9fe77ab045ad452083918929f6177bdbaf4461d95f62979402bf3bbf4b7c3d9 |
| 269-first-write-runtime.log | command -v bun and bunx, Bun SHA-256, version and revision | 12:46  up 2 days,  4:13, 3 users, load averages: 1.38 1.84 2.01 | Mon Nov 23 17:46:20 UTC 2026 / Mon Nov 23 17:46:20 UTC 2026 | 0 | 70c1d7e562119f0e2864fe335e26904874e723ed1b6bfb6e69cdbb39d57d23e7 |
| 270-first-write-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 12:46  up 2 days,  4:13, 3 users, load averages: 1.38 1.84 2.01 | — | 0 | 428c480f2f87d3e4b31b40d99766e4893c7a9ce38fbf6a75022df978f0ccf052 |
| 271-first-write-test.log | bun test packages/adapter-madv-surface/test/live.test.ts | 12:46  up 2 days,  4:13, 3 users, load averages: 1.38 1.84 2.01 | Mon Nov 23 17:46:22 UTC 2026 / Mon Nov 23 17:46:53 UTC 2026 | 1 | 1f1865b602f2af451c318d0784d4fc749c9168839cbb489690009b367adc2e57 |
| 272-first-write-receipt.log | shasum -a 256 logs/271-first-write-test.log | 12:46  3 users, load averages: 1.84 1.89 2.02 | — | 0 | 2d72f260318062bc092b83bae089e5ba58bb0e99926e87a7507eb2c6f35f7ea8 |
| 273-first-write-restore.log | git checkout -- packages/adapter-madv-surface/src/live.ts | 12:46  3 users, load averages: 1.84 1.89 2.02 | — | 0 | bb9f0467b3efc92c5375cf49b50bacbaef7ebf12f43c2389cbd1893f1b1f78d7 |
| 274-first-write-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/adapter-madv-surface/src/live.ts | 12:46  3 users, load averages: 1.84 1.89 2.02 | — | 0 | d8d21e3d46ac052065fbf2cb941c008871fc5ba25a8c61c7f961f51b5ab70863 |
| 275-assistant-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/adapter-madv-surface/src/index.ts 'if (attesting && !this.assistantSeen)' 'if (false && attesting && !this.assistantSeen)' | 12:46  3 users, load averages: 1.84 1.89 2.02 | — | 0 | 1e6e3550e22579c981f4129b0af554613fc824f80bb66e52d6422137ad4cfb14 |
| 276-assistant-diff.log | git -C tui diff -- packages/adapter-madv-surface/src/index.ts | 12:46  3 users, load averages: 1.77 1.88 2.02 | — | 0 | fcdcdb4202fbe813323e89954a9fabab92c957f864c6545d9df6b1b169981317 |
| 277-assistant-runtime.log | command -v bun and bunx, Bun SHA-256, version and revision | 12:46  up 2 days,  4:14, 3 users, load averages: 1.77 1.88 2.02 | Mon Nov 23 17:46:54 UTC 2026 / Mon Nov 23 17:46:55 UTC 2026 | 0 | aedd4e4397114c2e408db040131dee86476858808b53ec1bca34896096b0e3ab |
| 278-assistant-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 12:46  up 2 days,  4:14, 3 users, load averages: 1.71 1.86 2.01 | — | 0 | c999a47a4a692d99ef45fffd3915da2f6ea4f900285b3f2e5e58925ba8993b49 |
| 279-assistant-test.log | bun test packages/adapter-madv-surface/test/live.test.ts | 12:46  up 2 days,  4:14, 3 users, load averages: 1.71 1.86 2.01 | Mon Nov 23 17:46:58 UTC 2026 / Mon Nov 23 17:47:29 UTC 2026 | 1 | f5a849cb736a45a89be896c534521b965864d9f0436000bf064223795f1d0961 |
| 280-assistant-receipt.log | shasum -a 256 logs/279-assistant-test.log | 12:47  3 users, load averages: 1.54 1.81 1.99 | — | 0 | 36d70af383094d2cb2a73b78e70132d278694cd5c73e0634918d1a162773c599 |
| 281-assistant-restore.log | git checkout -- packages/adapter-madv-surface/src/index.ts | 12:47  3 users, load averages: 1.54 1.81 1.99 | — | 0 | 20bf7d8da804752d96438db4e8871f4f077093dbbf0eb266d57a587766d248d7 |
| 282-assistant-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/adapter-madv-surface/src/index.ts | 12:47  3 users, load averages: 1.54 1.81 1.99 | — | 0 | 03a4b224117daadb72bfbe7cb38b2a16c696e20a62ed1b163b5658217b37003e |
| 283-extra-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/adapter-madv-surface/src/index.ts 'attesting && value.type === "model_response" && this.responses > 0' 'attesting && value.type === "model_response" && this.responses > 1' | 12:47  3 users, load averages: 1.54 1.81 1.99 | — | 0 | 1f3394d31c0a410211e452524b9b2816be4435004a9d9c7d3d1bf3cd0d72dbab |
| 284-extra-diff.log | git -C tui diff -- packages/adapter-madv-surface/src/index.ts | 12:47  3 users, load averages: 1.54 1.81 1.99 | — | 0 | a4095aebe39b0e341fd418e14718a58907ee5980725b9e45e65fd8b7810dbcf3 |
| 285-extra-runtime.log | command -v bun and bunx, Bun SHA-256, version and revision | 12:47  up 2 days,  4:15, 3 users, load averages: 1.36 1.75 1.96 | Mon Nov 23 17:47:45 UTC 2026 / Mon Nov 23 17:47:45 UTC 2026 | 0 | 8064fdcdda3bfe7f0c6fbfe4def4415bc84a640855dee871ab45e2881eb6ae37 |
| 286-extra-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 12:48  up 2 days,  4:16, 3 users, load averages: 1.75 1.80 1.97 | — | 0 | 4823baa36f6122ab60a0fcbd421f6afa369694f0217e1a1f9b3ae21a58aac242 |
| 287-extra-test.log | bun test packages/adapter-madv-surface/test/live.test.ts | 12:48  up 2 days,  4:16, 3 users, load averages: 1.75 1.80 1.97 | Mon Nov 23 17:48:25 UTC 2026 / Mon Nov 23 17:48:56 UTC 2026 | 1 | d357cb89491f8903f834c0438f827c9d0cbdc09723b99d6b9a7406ed9bcd29e3 |
| 288-extra-receipt.log | shasum -a 256 logs/287-extra-test.log | 12:48  3 users, load averages: 2.06 1.86 1.99 | — | 0 | 101f69de23d56cd75e8bd9186b67bd847feb6ecafcb4b068793e3ce66c0880ee |
| 289-extra-restore.log | git checkout -- packages/adapter-madv-surface/src/index.ts | 12:48  3 users, load averages: 2.06 1.86 1.99 | — | 0 | 88945dde00b2bc9635c884533dbbf600c668f719471346d829f15701c2899b59 |
| 290-extra-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/adapter-madv-surface/src/index.ts | 12:48  3 users, load averages: 2.06 1.86 1.99 | — | 0 | c2e8677d04778ec82a22b99dda1ff8ba74f09136978da991931afb9ba5224047 |
| 291-result-time-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/adapter-madv-surface/src/live.ts 'if (fact.kind === "output" && fact.bytes) inspect(parser.push(fact.bytes));' 'if (fact.kind === "output" && fact.bytes) { const result = parser.push(fact.bytes); inspect(result); if (result.ok && result.modelResponses) clearTimeout(timer); }' | 12:48  3 users, load averages: 2.06 1.86 1.99 | — | 0 | c2736beffb9ff68de6adfd1808092c8a4552bb16fcd93f88697d9ff8360f4c0b |
| 292-result-time-diff.log | git -C tui diff -- packages/adapter-madv-surface/src/live.ts | 12:48  3 users, load averages: 2.06 1.86 1.99 | — | 0 | fcbd7da7e4a1625297a9884a1c42b3756865a8092c94f0e9f0eaae40c0f41498 |
| 293-result-time-runtime.log | command -v bun and bunx, Bun SHA-256, version and revision | 12:48  up 2 days,  4:16, 3 users, load averages: 2.06 1.86 1.99 | Mon Nov 23 17:48:58 UTC 2026 / Mon Nov 23 17:48:58 UTC 2026 | 0 | 06891f0023eb4cd3bb539aa1809bf906a5f551c5f2ef0bb6653bd6dc277d00f2 |
| 294-result-time-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 12:48  up 2 days,  4:16, 3 users, load averages: 1.97 1.85 1.98 | — | 0 | cac72bb49a690d8c337507f3835a506a8846edc7c8db781eb8527a7fe7e78e2f |
| 295-result-time-test.log | bun test packages/adapter-madv-surface/test/live.test.ts | 12:48  up 2 days,  4:16, 3 users, load averages: 1.97 1.85 1.98 | Mon Nov 23 17:48:59 UTC 2026 / Mon Nov 23 17:49:31 UTC 2026 | 1 | 9d2724a8e4e18488afb6cfd89a728670f964b9248e28cd9762ad9146f930382b |
| 296-result-time-receipt.log | shasum -a 256 logs/295-result-time-test.log | 12:49  3 users, load averages: 1.95 1.85 1.97 | — | 0 | 822854419a29086f9e7da67de4b825961e6aee72f664b1ed6453987a4f81233a |
| 297-result-time-restore.log | git checkout -- packages/adapter-madv-surface/src/live.ts | 12:49  3 users, load averages: 1.95 1.85 1.97 | — | 0 | d6a9ac927b49ce57265c40057484008d4eaad45b4b6929e2d1df6aa054895b05 |
| 298-result-time-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/adapter-madv-surface/src/live.ts | 12:49  3 users, load averages: 1.95 1.85 1.97 | — | 0 | c3337b943a640d45d04918c01218c0ce49863195eeba921c28bd760bcf5f2e54 |
| 299-later-line-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/adapter-madv-surface/src/index.ts 'this.context.onAttested?.(this.version);' 'this.buffer = ""; this.context.onAttested?.(this.version);' | 12:49  3 users, load averages: 1.95 1.85 1.97 | — | 0 | 93fd4fe7b3a751c3e5d20702fa7aa411d922542ebc9bebaf92879a7128f7c052 |
| 300-later-line-diff.log | git -C tui diff -- packages/adapter-madv-surface/src/index.ts | 12:49  3 users, load averages: 1.95 1.85 1.97 | — | 0 | 25ae031dac4200f750fde30d2724d14890a496fca2f63ee865a72d4448d1333f |
| 301-later-line-runtime.log | command -v bun and bunx, Bun SHA-256, version and revision | 13:38  up 2 days,  5:06, 3 users, load averages: 1.75 1.53 1.69 | Mon Nov 23 18:38:37 UTC 2026 / Mon Nov 23 18:38:37 UTC 2026 | 0 | b9f5be991d774479b630e02d3ec4e114e981286574cb77c6d289c4c1d5da635f |
| 302-later-line-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 13:38  up 2 days,  5:06, 3 users, load averages: 1.75 1.53 1.69 | — | 0 | 774555ca640420894e5311851289eceab20ae76feed0059763cdafdfb1ed56c8 |
| 303-later-line-test.log | bun test packages/adapter-madv-surface/test/live.test.ts | 13:38  up 2 days,  5:06, 3 users, load averages: 1.75 1.53 1.69 | Mon Nov 23 18:38:39 UTC 2026 / Mon Nov 23 18:39:09 UTC 2026 | 1 | b7fd5b1a2f67810450c2658259082dcd1b31cec6166dd829499b0839f37f25a6 |
| 304-later-line-receipt.log | shasum -a 256 logs/303-later-line-test.log | 13:39  3 users, load averages: 1.53 1.49 1.67 | — | 0 | ba8e9d8e2f2eafd2e5b50e8303efcb247d7317747e5c96ff60d4bc5e61c4df90 |
| 305-later-line-restore.log | git checkout -- packages/adapter-madv-surface/src/index.ts | 13:39  3 users, load averages: 1.53 1.49 1.67 | — | 0 | e5975aab7f0aa97543f7f59da8ca38d3c42ab6dfa2fdf27bfe4a079d86f01736 |
| 306-later-line-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/adapter-madv-surface/src/index.ts | 13:39  3 users, load averages: 1.53 1.49 1.67 | — | 0 | 627761fa2797e6f39567f27931ac1e6857279ebfdf39760e4725d6cba0ca8fbf |
| 307-preflight-input.log | cat tui/packages/supervisor/src/preflight.ts | 12:46  3 users, load averages: 1.35 1.83 2.01 | — | 0 | 12fb143c1d9ea44e54bf3ed3070058c81247138bcd65d237107d5c403d904a74 |
| 308-offline-sources.log | cat tui/test/phase3b/offline.ts | 12:46  3 users, load averages: 1.35 1.83 2.01 | — | 0 | ba75d77a9b5d3166527bd79a8d9da9504db746b89cf97140219c9e25b75750e0 |
| 309-adapter-settings.log | sed -n 42,80p tui/docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md | 12:46  3 users, load averages: 1.35 1.83 2.01 | — | 0 | 495431efa510a697abfeab4c9b3137ecc020f39d4e2133a565c5fa494d9a6c34 |
| 310-build-exits.log | rg -n -A28 'function reportFailure\|interface BuildInput\|function failAt\|function.*activate\|phase === .active' tui/packages/supervisor/src/build.ts | 12:46  3 users, load averages: 1.37 1.82 2.00 | — | 0 | e2e1bed9cd683dca88ab5e3e2184ee132bf2446c0442836b4cdd5b174396a62b |
| 311-port-tests.log | cat tui/packages/supervisor/test/live-port.test.ts | 12:46  3 users, load averages: 1.37 1.82 2.00 | — | 0 | a7433a5d7270d276a391ac9d74e0ac04db7e28520fcc3a1c84856880754f127c |
| 312-standin-records.log | cat logs/082-record-fixtures.log | 12:46  3 users, load averages: 1.37 1.82 2.00 | — | 0 | 0bf5fa0edf7fc7ff17f48d324942590f933691d45c7461432e655c96fb555acd |
| 313-app-scans.log | sed -n 510,630p tui/test/phase3a/architecture-phase3a.test.ts | 12:46  3 users, load averages: 1.39 1.81 1.99 | — | 0 | d6165bebf5e8453909193987e8d1f2b0a7a20d80a643e576b0c84bdfbb28af73 |
| 314-record-primitives.log | rg -A70 '^export function fixtureCapabilityRecord\|^function fixtureCapabilityRecord\|^export function writeCapabilityRecord' tui/test/phase3a/runtime-harness.ts tui/packages/storage/src/capability-store.ts | 12:46  3 users, load averages: 1.39 1.81 1.99 | — | 0 | 34767b3ba14c2f8e380a066df8a22bfa2e9f9655bbb1a939b8754b5704708a36 |
| 315-probe-differences.log | cat tui/packages/supervisor/src/attestation.ts | 12:46  3 users, load averages: 1.39 1.81 1.99 | — | 0 | 3a4a40551511fc3c5914edd96ee81d900475b0ded33f74cf1d451e9df4b97a11 |
| 316-leaf-deps.log | sed -n 850,930p tui/test/phase3a/evidence-pipeline.test.ts | 12:46  3 users, load averages: 1.77 1.88 2.02 | — | 0 | dd7cfa7b7cacdee9df2c078ae851a979e79a90c2413cd81d32d8dde3f78d5a15 |
| 317-reused-record.log | rg -n fixtureCapabilityRecord tui/test/phase3a | 12:46  3 users, load averages: 1.77 1.88 2.02 | — | 0 | bd97a74b7ff1ff6c521bae4b3a01f64a72c53cae1f4b441441d08cbeeea51f8e |
| 318-ready-process.log | rg -n -A20 'adapter_ready\|ready\|setRawMode' tui/packages/pty-host/src/main.ts | 12:46  3 users, load averages: 1.77 1.88 2.02 | — | 0 | 3b6ba5bee0ada76c0551a289dd842b4686e8fbf48894f41f04464e39a35d3167 |
| 319-terminal-mode.log | cat tui/packages/pty-host/src/terminal.ts | 12:47  3 users, load averages: 1.73 1.86 2.01 | — | 0 | 9d993404af99ed9555e8d5e242efb9ef83ddd6b1daac4e29ec67ba98ccdae25a |
| 320-record-builder.log | sed -n 50,108p tui/test/phase3a/fixture-adapters.ts | 12:47  3 users, load averages: 1.73 1.86 2.01 | — | 0 | 620a7654129d491f155ece90036e8aa545693da17e25a992441e46359e82df40 |
| 321-interruption.log | sed -n '590,659p;1100,1225p' tui/packages/supervisor/src/build.ts | 12:47  3 users, load averages: 1.73 1.86 2.01 | — | 0 | f26c3c3a9bf8a6e37f5ab934f108ec0285257118332e8f1fb0be651f7c758374 |
| 322-health-pieces.log | cat logs/065-health.log logs/071-barrier.log | 12:47  3 users, load averages: 1.70 1.85 2.00 | — | 0 | ab117d05578041ec098851fb216a17a5bb4c4ceec26857c9b7b23c1cd4d8131a |
| 323-freshness.log | rg -n -A38 'interface ObservedSurfaceFacts\|function.*resh' tui/packages/protocol/src/capability-record.ts | 12:47  3 users, load averages: 1.70 1.85 2.00 | — | 0 | 83acc395be8d8bce30291e7c4091fd3dc2c8a7fef3fe99291dcd3ac5f3a66717 |
| 324-live-mode-api.log | cat tui/packages/adapter-claude-code/src/index.ts tui/packages/supervisor/src/index.ts | 12:48  3 users, load averages: 1.86 1.82 1.97 | — | 0 | e7db353668c34cb525568e08e79872a4cb352aaa9757a34a2888f53326ed1037 |
| 325-test-restrictions.log | sed -n 188,211p tui/packages/supervisor/test/preflight.test.ts | 12:48  3 users, load averages: 1.86 1.82 1.97 | — | 0 | 8cdbd07ce0b8d02cd613a193ea36a8b7a14581536f824561bc2422b6915b9179 |
| 326-detector-definitions.log | rg -n 'auth_failure_detection\|identity_mismatch\|authentication_expired' tui/docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md | 12:48  3 users, load averages: 1.86 1.82 1.97 | — | 0 | e2425d2761c6dcd3af11670d5e38df53a932d2485b10d999dedd451bf4af41da |
| 327-log-layout.log | sed -n 1,95p tui/docs/verification/phase-3b-m1-build-log.md | 12:48  3 users, load averages: 1.80 1.81 1.97 | — | 0 | 3a7ac83d4253a68162596420879a905c5a6081d2ad8be6f481d78fc9edd39a2f |
| 328-scratch-assets.log | ls /private/tmp/m1-r1-IH7Fxlbw | 12:48  3 users, load averages: 1.80 1.81 1.97 | — | 0 | d8e7a08b1e92717cc5ed46c68a91cbed02f88cc587ebd7dcddf1d829a2bb00c7 |
| 329-attribution-contract.log | rg -n -A14 'prbody\|usage\|base_sha\|GITHUB_BASE_REF\|pr\)' tui/.github/scripts/attribution-shape-check.sh | 12:48  3 users, load averages: 1.80 1.81 1.97 | — | 0 | 70a30ab247ad8c3608a03e4587b8cba7f6aa40de8ca4b4b1409f268d4e20a565 |
| 330-output-boundary.log | cat prompt/DEC-20261123-01-addendum-1-environment-values-in-logs.md | 13:38  3 users, load averages: 1.61 1.50 1.68 | — | 0 | 2be791b9f18041c9cd8b014db5fb6a9fd390cb6f42b5107328096a4fe9d404b5 |
| 331-detectors.log | python3 - | 13:39  3 users, load averages: 1.84 1.59 1.70 | — | 0 | cdac152afd95521d3ec84e15a5421e30c955403d938558d9dc81e20e09bb4d82 |
| 332-detector-tests.log | python3 - | 13:40  3 users, load averages: 2.73 1.80 1.77 | — | 0 | f8b4e1606fa38ddeceaeca03b60b3e41a9c36c31967fa1708b53a1a1271a552f |
| 333-r4-runtime.log | Bun runtime check | 13:40  up 2 days,  5:08, 3 users, load averages: 2.83 1.91 1.81 | Mon Nov 23 18:40:40 UTC 2026 / Mon Nov 23 18:40:41 UTC 2026 | 0 | 8238b9e6a5866d027ef9ea4d581f755cf9b1f5661af04d4ec1aacf52529cb898 |
| 334-r4-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 13:40  up 2 days,  5:08, 3 users, load averages: 2.69 1.89 1.80 to 13:42  up 2 days,  5:10, 3 users, load averages: 1.57 1.77 1.77 | — | 0 | e4dadf03466c94aeb4ad27cffb0ea92bab7e2c143b9163896455dd6bb534fa06 |
| 335-r4-detectors.log | bun test test/phase3b/detectors.test.ts | 13:42  up 2 days,  5:10, 3 users, load averages: 1.57 1.77 1.77 | Mon Nov 23 18:42:48 UTC 2026 / Mon Nov 23 18:42:48 UTC 2026 | 0 | 61b0a307d24a5f7d83639a6878f18d0b179e54f9c2f851be40a4927377379623 |
| 336-r4-madv-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 13:43  up 2 days,  5:10, 3 users, load averages: 1.52 1.75 1.76 | — | 0 | 9e03e8bddc9fff15f835a126f258ae009509e62118641dc850d9bee40b18fb20 |
| 337-r4-madv.log | bun test packages/adapter-madv-surface/test/live.test.ts | 13:43  up 2 days,  5:10, 3 users, load averages: 1.52 1.75 1.76 | Mon Nov 23 18:43:03 UTC 2026 / Mon Nov 23 18:43:34 UTC 2026 | 0 | 662721e35185201aa8b83194629dda2c1b65b332f48ce2a85d51d84030551030 |
| 338-r4-types.log | bunx tsc --noEmit | 13:46  up 2 days,  5:14, 3 users, load averages: 1.17 1.46 1.62 | Mon Nov 23 18:46:53 UTC 2026 / Mon Nov 23 18:46:56 UTC 2026 | 2 | 63bd4019ff0edc278327fc4ebabb99513254a71b8f915c68b0852f6699da4f61 |
| 339-r4-message.log | python3 - | 13:40  3 users, load averages: 2.69 1.89 1.80 | — | 0 | ed63185732b3b45c927fb7c2f4a99abb226277eee382361c68e59848241f6ba2 |
| 340-r4-trailers.log | zsh /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh /private/tmp/m1-r1-IH7Fxlbw/r4-message.txt | 13:40  3 users, load averages: 2.69 1.89 1.80 | — | see log | d39dbd9c7a4941ea2b2a84f76a1f317991b6a3aaefa1469e47ae26235b5a9b4f |
| 341-shorten-r4.log | python3 - | 13:40  3 users, load averages: 2.50 1.88 1.80 | — | 0 | 6d11dd38c9955202e04d2cac10832e27bdbba3b1f69f65f2008ee0b487ea52c6 |
| 342-r4-trailers.log | zsh /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh /private/tmp/m1-r1-IH7Fxlbw/r4-message.txt | 13:40  3 users, load averages: 2.50 1.88 1.80 | — | 0 | 680fbece66638eac2d46f692c49369dd259824d280eb92bc4b72f7d11e72a2a9 |
| 343-source-rules.log | rg -n -i 'settings\.json\|settings\.local\|configuration.source invariant\|--settings' tui/docs/decisions/PLAN-OPEN-2-environment-allowlists.md | 13:43  3 users, load averages: 1.61 1.76 1.76 | — | 0 | fab82ec40c4a475be6e58a96cd24c08488442dfdb1a6d73d4cba78fd6e1f84a1 |
| 344-index-contract.log | sed -n 590,657p tui/packages/supervisor/test/build-rollback.test.ts | 13:46  3 users, load averages: 1.32 1.49 1.63 | — | 0 | 811861b66f5bb4dfa8c79d9f744a85004980a2d10ee38684ca70558582ace23a |
| 345-compile-fix-input.log | sed -n 1,35p tui/packages/adapter-claude-code/test/live.test.ts | 13:47  3 users, load averages: 1.65 1.55 1.65 | — | 0 | 031d4fe9a0a6f03e7d5e807a4e5928ee3bd52b506886a97160a0263e50e04eb4 |
| 346-all-claude-cases.log | sed -n 36,129p tui/packages/adapter-claude-code/test/live.test.ts | 13:47  3 users, load averages: 1.83 1.59 1.67 | — | 0 | f235ef7e4697e8c7be460af8e7535a3b8348dcc595dea4743d2d2f04d424f2be |
| 347-r4-type-fixes.log | python3 - | 13:47  3 users, load averages: 1.79 1.59 1.66 | — | 0 | 5ec5f6953115daa20b7c2028dc71625217b8beb7ac4e984fe49bbf5e0520e820 |
| 348-new-r4-trailers.log | zsh /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh /private/tmp/m1-r1-IH7Fxlbw/r4-message.txt | 13:47  3 users, load averages: 1.79 1.59 1.66 | — | 0 | a66b44145029e6e3da0ae1f1f07ca992aa67d5a4291c35820f064a5e9011fee6 |
| 349-r4-types-fixed.log | bunx tsc --noEmit | 13:47  up 2 days,  5:15, 3 users, load averages: 1.78 1.60 1.67 | Mon Nov 23 18:47:44 UTC 2026 / Mon Nov 23 18:47:47 UTC 2026 | 0 | 1182c4660950a3f938d8da45d7c0dd462d73dac62e2fdfba3736b06ed4cbd6df |
| 350-r4-cases-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 13:48  up 2 days,  5:15, 3 users, load averages: 1.87 1.64 1.68 | — | 0 | 51dc854d333fc2016cbbcc7b3245ae237ddd61958ab6293503b8e57c1b5802dc |
| 351-r4-cases.log | bun test test/phase3b/detectors.test.ts packages/adapter-claude-code/test/live.test.ts packages/adapter-madv-surface/test/live.test.ts | 13:48  up 2 days,  5:15, 3 users, load averages: 1.87 1.64 1.68 | Mon Nov 23 18:48:16 UTC 2026 / Mon Nov 23 18:49:16 UTC 2026 | 0 | a3bb149f19fae4a8f9f603a87177758eee49ef2f4d0f31023923e99794cf7788 |
| 352-composition-spec.log | rg -n -i -A14 'health barrier\|^###? 2\.(6\|7)\|foreground process' tui/docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md | 13:47  3 users, load averages: 1.72 1.59 1.66 | — | 0 | c335adc1475a9f0819412e61df3aa63f0cd257c0d442c9cca878b72501e76473 |
| 353-r4-stage.log | git add packages/adapter-claude-code/src packages/adapter-claude-code/test/live.test.ts packages/adapter-madv-surface/src packages/adapter-madv-surface/test/live.test.ts test/phase3b/detectors.test.ts | 13:49  3 users, load averages: 1.57 1.56 1.64 | — | 0 | 16187c1f3857446056c49d04c85b3c8fc874ee1c6ec4bb84e34b406e68eab8d7 |
| 354-r4-commit.log | git commit -F /private/tmp/m1-r1-IH7Fxlbw/r4-message.txt | 13:49  3 users, load averages: 1.57 1.56 1.64 | — | 0 | 8fc4c3d97d627cc50bddb8b62b939575193fa4a520e022fd8c1147fb1341c5a3 |
| 355-r4-head.log | git rev-parse HEAD | 13:49  3 users, load averages: 1.57 1.56 1.64 | — | 0 | 432630f67838fc7e9164123001d93fc5d07d4c0792a8c35d2d5661ca3aaa38ee |
| 356-detector-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/adapter-claude-code/src/detectors.ts 'rules.includes("system/api_retry.error:" + event.error)' 'false && rules.includes("system/api_retry.error:" + event.error)' | 13:49  3 users, load averages: 2.21 1.71 1.69 | — | 0 | b2eea5e7d1951fdf1a099a2d473d449dc73ebc9cf817a5d215b83880515f6a04 |
| 357-detector-diff.log | git -C tui diff -- packages/adapter-claude-code/src/detectors.ts | 13:49  3 users, load averages: 2.21 1.71 1.69 | — | 0 | b8947d270891508313511671c5f9c0c0cf597f90a2152cf8388c823efccb887e |
| 358-detector-runtime.log | Bun runtime check | 13:57  up 2 days,  5:25, 3 users, load averages: 4.55 3.37 2.38 | Mon Nov 23 18:57:59 UTC 2026 / Mon Nov 23 18:57:59 UTC 2026 | 0 | 2b0141687273b281a1a4d8a4a44559a16e00c3dd1cdce620a58433a9a3e56b94 |
| 359-detector-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 13:58  up 2 days,  5:25, 3 users, load averages: 4.02 3.32 2.37 to 14:13  up 2 days,  5:41, 3 users, load averages: 1.81 4.90 4.65 | — | 0 | d1805217b5de19bca245f6325d2266d29f1a2f5bfff7bd75f6a9b19353a344b9 |
| 360-detector-test.log | bun test test/phase3b/detectors.test.ts | 14:13  up 2 days,  5:41, 3 users, load averages: 1.81 4.90 4.65 | Mon Nov 23 19:13:42 UTC 2026 / Mon Nov 23 19:13:42 UTC 2026 | 1 | 4df44e1c40002c9c379178bad59ed2b8648707c5a1b17c3e46d8f230a7e75e47 |
| 361-detector-receipt.log | shasum -a 256 logs/360-detector-test.log | 14:13  3 users, load averages: 1.81 4.90 4.65 | — | 0 | 156409d3310bf4bd8066ad4f10d650c33115c1cfd05ca816cee43d68bb2f87e8 |
| 362-detector-restore.log | git checkout -- packages/adapter-claude-code/src/detectors.ts | 14:13  3 users, load averages: 1.81 4.90 4.65 | — | 0 | 20f85ded0757c1f9ad34fc6362754dc92e838f1383393e507b518dc7d4703e5b |
| 363-detector-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/adapter-claude-code/src/detectors.ts | 14:13  3 users, load averages: 1.81 4.90 4.65 | — | 0 | 3d54384c4227845cea75b463e9457344f3d81cad286b3d32b6f89a932f8ed671 |
| 364-client-stops.log | rg -n -A40 '^export interface (BrokerClient\|InProcessBrokerClient)\|founderClose\(' tui/packages/broker/src/client.ts tui/packages/broker/src/in-process-client.ts tui/packages/broker/src/runtime-broker.ts | 13:59  3 users, load averages: 3.80 3.38 2.48 | — | 0 | 0f3b59d4a2c6d49a5bcdd8108f6336aa547ee999227a36a9ac39f020dd072144 |
| 365-architecture-package-boundaries.log | rg -n 'adapter-madv-surface/src/index.ts\|adapter-claude-code/src/index.ts\|adapter-madv-surface/src/\*\|only.*import\|node:fs' tui/packages/adapter-madv-surface/test tui/test/phase3a/harness-separation.test.ts | 13:59  3 users, load averages: 3.80 3.38 2.48 | — | 0 | 507f0956f92bd4d89b3c4bab22be5bfee36ef6412602ec8741a95e97f7b566fe |
| 366-closure-scan.log | sed -n '15,93p;170,242p' tui/test/phase3a/harness-separation.test.ts | 14:01  3 users, load averages: 3.47 3.28 2.56 | — | 0 | 107d740d20b7590c507c5683a637ed9a516cc2cd69b64b2c9f1d351e3612b631 |
| 367-scan-roots.log | sed -n '8,16p;244,299p' tui/test/phase3a/harness-separation.test.ts | 14:01  3 users, load averages: 3.43 3.28 2.56 | — | 0 | 9737d59b712be22b83d7969cfefdee5ca86090c0e63f503d6ab7488f3fce5593 |
| 368-host-launch.log | sed -n 327,412p tui/packages/broker/src/pty-host-supervisor.ts | 14:05  3 users, load averages: 2.90 3.32 2.74 | — | 0 | 500a048d0815d626e7189a27c0f7a6a4cd14c97c0f0b28fa2b9e0ff866915c7f |
| 369-ledger-formats.log | head -n 12 logs/075-base-list.log logs/097-option-types.log logs/117-r1-pin.log logs/174-r2-test.log | 14:09  3 users, load averages: 6.05 8.19 5.45 | — | 0 | 46660f187fb06cc3863871084d779c88d84b4ce0fdc6a800f0c9052516283e67 |
| 370-prepare-ledger.log | python3 - | 14:10  3 users, load averages: 5.19 7.85 5.40 | — | 0 | 15a284109100430dc141f4deb7efca3d882f8d34be885942c8ed5bd5a7ca002a |
| 371-verify-list-reader.log | python3 - | 14:10  3 users, load averages: 5.10 7.78 5.39 | — | 0 | e3b43fbcd0c202eeb729f58c5db2b076d67d6eed4204f9cbcb7733c11665c03a |
| 372-r4-wait-state.log | tail -4 logs/359-detector-load.log | 14:10  3 users, load averages: 4.77 7.67 5.36 to 14:10  up 2 days,  5:37, 3 users, load averages: 5.38 7.93 5.41 | — | 0 | ffda52d0302d39ab2ed13fc90f3478bf2b46dad498077fd3d72f158a35b1d947 |
| 373-break-inventory.log | ls logs | 14:10  3 users, load averages: 4.55 7.58 5.34 | — | 0 | 1ade7b0711f5943501d8fd949433b86ab2748b761337e8789acd613f5ee538e3 |
| 374-break-book.log | python3 - | 14:10  3 users, load averages: 3.76 7.20 5.26 | — | 0 | 24b3bb598497df9b3382c9affb80a57e783be1663e6829b74374055854db823b |
| 375-verify-break-book.log | python3 - | 14:11  3 users, load averages: 3.46 7.08 5.23 | — | 0 | ab4dbf7fd68f0b69423126c46015ea556ca9da1f4f4f23dd205de4ba8954ccd7 |
| 376-settings-sources.log | python3 - | 14:14  3 users, load averages: 2.11 4.72 4.59 | — | 0 | 641e8a019cedc9e22484ca88857b6973e2dd870a829091dc742787827aedf535 |
| 377-r5-runtime.log | Bun runtime check | 14:36  up 2 days,  6:03, 3 users, load averages: 2.61 2.35 2.78 | Mon Nov 23 19:36:17 UTC 2026 / Mon Nov 23 19:36:17 UTC 2026 | 0 | a0e001a7003ea31fa435e0910ffb5d52b31d4f9bb10f72297184729973fab8c9 |
| 378-r5-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 14:36  up 2 days,  6:03, 3 users, load averages: 2.56 2.35 2.78 to 14:46  up 2 days,  6:14, 3 users, load averages: 1.94 2.89 3.06 | — | 0 | 1d651ab75175896f14a8cf2b66881814615f8411806cac293ca96a258a8240ff |
| 379-r5-test.log | bun test test/phase3b/settings-sources.test.ts | 14:46  up 2 days,  6:14, 3 users, load averages: 1.94 2.89 3.06 | Mon Nov 23 19:46:49 UTC 2026 / Mon Nov 23 19:46:50 UTC 2026 | 0 | 14b297ed23bba1cc9f449c729adaa255216916429147305e488065f9e3c7fdb4 |
| 380-r5-message.log | python3 - | 14:36  3 users, load averages: 3.32 2.51 2.83 | — | 0 | 3390e865426693eb7a0447415bc593f2dc272ae2b033040ed8e298c643424bcc |
| 381-r5-trailers.log | zsh /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh /private/tmp/m1-r1-IH7Fxlbw/r5-message.txt | 14:36  3 users, load averages: 3.32 2.51 2.83 | — | 0 | 5597b6eb273bc46d2b38ef5ce2cc5414226122e7db56eda6bf2c4e8eedf000ba |
| 382-record-parse-rules.log | sed -n 270,400p tui/packages/protocol/src/capability-record.ts | 14:37  3 users, load averages: 2.26 2.34 2.74 | — | 0 | 00b560e6033d903770f68ab32f79794a7e18c50c0db0320d5009092cce50f678 |
| 383-settings-wait-state.log | tail -4 logs/378-r5-load.log | 14:43  3 users, load averages: 3.50 3.76 3.34 to 14:42  up 2 days,  6:10, 3 users, load averages: 3.87 3.83 3.35 | — | 0 | 530f403fdbb6262f994aec61fdfc40d354fd441d59e998c2955270ddb6c29a15 |
| 384-existing-terminal-observations.log | rg -n -i 'echoes\|echoed\|terminal echo\|setRawMode\|stty' tui/test/phase3a tui/packages/pty-host/test tui/packages/broker/test | 14:44  3 users, load averages: 2.27 3.37 3.24 | — | 0 | 5e05066c2b63efdd335d61221dd1f9974ddc0c998c86dbe88b79ef66d5243a95 |
| 385-r5-stage.log | git add apps/madbridge/src/tui/live/managed-settings.ts apps/madbridge/src/tui/live/settings-sources.ts test/phase3b/settings-sources.test.ts | 14:46  3 users, load averages: 1.87 2.86 3.05 | — | 0 | add7e9d1fb4be040c488680d6dd3ccbd5f617865a62f667d8454e2ff9207b780 |
| 386-r5-commit.log | git commit -F /private/tmp/m1-r1-IH7Fxlbw/r5-message.txt | 14:46  3 users, load averages: 1.87 2.86 3.05 | — | 0 | 2b8258b51bb2480b8fd4ddfabb5fec442c3427fbb1f87550c5674a1dbacaedc6 |
| 387-r5-head.log | git rev-parse HEAD | 14:46  3 users, load averages: 1.87 2.86 3.05 | — | 0 | aa00502cc37215015d06f779ea385a5605a9d880ddbee3a47980447734135b6f |
| 388-darwin-map-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py apps/madbridge/src/tui/live/managed-settings.ts 'return "/Library/Application Support/ClaudeCode"' 'return "/etc/claude-code"' | 14:47  3 users, load averages: 1.79 2.77 3.01 | — | 0 | 94588dfe413e0b1e8aaa906ae20e4cc9dd42366ffb8406383f59ee235219c53e |
| 389-darwin-map-diff.log | git -C tui diff -- apps/madbridge/src/tui/live/managed-settings.ts | 14:47  3 users, load averages: 1.79 2.77 3.01 | — | 0 | 81c0f96ad9c2bc4fd4ae9f0e9b0820c4202e2f6ba7ca124c78020ba0bd4d1af0 |
| 390-darwin-map-runtime.log | Bun runtime check | 15:54  up 2 days,  7:21, 3 users, load averages: 2.95 2.68 2.61 | Mon Nov 23 20:54:05 UTC 2026 / Mon Nov 23 20:54:06 UTC 2026 | 0 | b4855938147fce5e0c0f81a146eb1a4a58abcfc9b8787922f5b2b022cd88893a |
| 391-darwin-map-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 15:54  up 2 days,  7:21, 3 users, load averages: 2.71 2.63 2.59 to 15:57  up 2 days,  7:24, 3 users, load averages: 1.89 2.33 2.47 | — | 0 | b0e82dcda0ac39977e4968e518b728e94e709ec20e294b168e584cf540001cbe |
| 392-darwin-map-test.log | bun test test/phase3b/settings-sources.test.ts | 15:57  up 2 days,  7:24, 3 users, load averages: 1.89 2.33 2.47 | Mon Nov 23 20:57:07 UTC 2026 / Mon Nov 23 20:57:08 UTC 2026 | 1 | 644be97f0b079dac742330fdeb5711f43dea5d668c756343334af6ee7258b842 |
| 393-darwin-map-receipt.log | shasum -a 256 logs/392-darwin-map-test.log | 15:57  3 users, load averages: 1.82 2.31 2.46 | — | 0 | 84c70e66481d94ee6722d01f569fb529676b451c11b3d0092da439856cac72a0 |
| 394-darwin-map-restore.log | git checkout -- apps/madbridge/src/tui/live/managed-settings.ts | 15:57  3 users, load averages: 1.82 2.31 2.46 | — | 0 | aad48b46884c74e3301f51c1ae5e4f1ba43f25470166820c0d258baea9438234 |
| 395-darwin-map-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py apps/madbridge/src/tui/live/managed-settings.ts | 15:57  3 users, load averages: 1.82 2.31 2.46 | — | 0 | 9becc6c3916be0d6d17ea73526c49e7e087a6f4a2a030e6cd77b5e800eee4c5f |
| 396-remote-copy-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py apps/madbridge/src/tui/live/settings-sources.ts 'if (present(join(configFolder, "remote-settings.json")))' 'if (false && present(join(configFolder, "remote-settings.json")))' | 15:57  3 users, load averages: 1.82 2.31 2.46 | — | 0 | 090e23c4bb966595cb45abd71d6ec22d4f82c03ce8fc1de34f0a02a34d3edf3f |
| 397-remote-copy-diff.log | git -C tui diff -- apps/madbridge/src/tui/live/settings-sources.ts | 15:57  3 users, load averages: 1.82 2.31 2.46 | — | 0 | f059583d3cd29ab4978079c81694094f0e84a7228b8eec0ade2bc5607dd438c9 |
| 398-remote-copy-runtime.log | Bun runtime check | 15:57  up 2 days,  7:25, 3 users, load averages: 1.66 2.24 2.43 | Mon Nov 23 20:57:31 UTC 2026 / Mon Nov 23 20:57:32 UTC 2026 | 0 | ea9254ec1c537ecb31cd35c866b9b82120d4750907d289badfe1d647bfff8535 |
| 399-remote-copy-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 15:57  up 2 days,  7:25, 3 users, load averages: 1.85 2.27 2.44 | — | 0 | 664f8ec668ed6a27f3f9e68e45781e0fedb84de6001abc1ee7e847a897ec7dde |
| 400-remote-copy-test.log | bun test test/phase3b/settings-sources.test.ts | 15:57  up 2 days,  7:25, 3 users, load averages: 1.85 2.27 2.44 | Mon Nov 23 20:57:33 UTC 2026 / Mon Nov 23 20:57:34 UTC 2026 | 1 | 4a23b853a81522ce6c48903ba2c079a03ad7f48ad31c27fcffbe27d8faed9d17 |
| 401-remote-copy-receipt.log | shasum -a 256 logs/400-remote-copy-test.log | 15:57  3 users, load averages: 1.85 2.27 2.44 | — | 0 | bc476f9c2f40990d34c24797f660a07734114a07f0d76565348b35aa94481819 |
| 402-remote-copy-restore.log | git checkout -- apps/madbridge/src/tui/live/settings-sources.ts | 15:57  3 users, load averages: 1.85 2.27 2.44 | — | 0 | b576a3eca60593a816e6cc69899e5016bbae6ffa531d5d40b2da982b537be0eb |
| 403-remote-copy-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py apps/madbridge/src/tui/live/settings-sources.ts | 15:57  3 users, load averages: 1.85 2.27 2.44 | — | 0 | 368c6e2fe56955af8bba44c2ed13e61a39399edf45c983fac6f3deeff5a60070 |
| 404-local-path-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py apps/madbridge/src/tui/live/settings-sources.ts ', join(workingDirectory, ".claude", "settings.local.json")' '' | 15:57  3 users, load averages: 1.85 2.27 2.44 | — | 0 | d58a0539da51f2b5dd432d6a61c5cf544cb0ae13cbe5fe78485af98f3c78897e |
| 405-local-path-diff.log | git -C tui diff -- apps/madbridge/src/tui/live/settings-sources.ts | 15:57  3 users, load averages: 1.85 2.27 2.44 | — | 0 | 70e01e52ea7ea88eda454d2ec40bfd3868cfa8501ff4c03fd331272da69410a1 |
| 406-local-path-runtime.log | Bun runtime check | 15:57  up 2 days,  7:25, 3 users, load averages: 1.85 2.27 2.44 | Mon Nov 23 20:57:35 UTC 2026 / Mon Nov 23 20:57:36 UTC 2026 | 0 | 9b0e6ed7824abac042728e0a498ed5379116171271060f2edbc73965ba377162 |
| 407-local-path-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 15:57  up 2 days,  7:25, 3 users, load averages: 1.85 2.27 2.44 | — | 0 | 664f8ec668ed6a27f3f9e68e45781e0fedb84de6001abc1ee7e847a897ec7dde |
| 408-local-path-test.log | bun test test/phase3b/settings-sources.test.ts | 15:57  up 2 days,  7:25, 3 users, load averages: 1.85 2.27 2.44 | Mon Nov 23 20:57:37 UTC 2026 / Mon Nov 23 20:57:38 UTC 2026 | 1 | 06ffc04ae63ced672a51942b8b6eb69384fb5df2211a7a486fdf62a445698eb7 |
| 409-local-path-receipt.log | shasum -a 256 logs/408-local-path-test.log | 15:57  3 users, load averages: 2.42 2.38 2.48 | — | 0 | f9f221833ee94760576d0c648147c60fcfe9befeb09bb8c31faee696880ee4c6 |
| 410-local-path-restore.log | git checkout -- apps/madbridge/src/tui/live/settings-sources.ts | 15:57  3 users, load averages: 2.42 2.38 2.48 | — | 0 | e46d1f4755e02c8ded7d3e58ed661a2e5923880923e71e2b3b2d6abb2cc5bd73 |
| 411-local-path-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py apps/madbridge/src/tui/live/settings-sources.ts | 15:57  3 users, load averages: 2.42 2.38 2.48 | — | 0 | 2fbdb093582e1298565bd30c3a65ac9d54cc2216914181f32deb19a56d4de868 |
| 412-r6-validator.log | python3 - | 15:58  3 users, load averages: 1.85 2.24 2.42 | — | 0 | 8bc1e3e69d53a87fc90987115650e141a67e814c31fb74539317dd54f4692a12 |
| 413-r6-fixture.log | python3 - | 15:58  3 users, load averages: 1.45 2.13 2.38 | — | 0 | 43ab327c8e096c32f5133b5269344f65a6eea711e9acc41bb44ebb555523d4a0 |
| 414-r6-tests.log | python3 - | 15:59  3 users, load averages: 1.23 2.00 2.32 | — | 0 | b705cdf75a5a9b5968e54245a247033f5fb563b262f14dbb8e430c7ba5a1c8a0 |
| 415-r6-runtime.log | Bun runtime check | 16:00  up 2 days,  7:28, 3 users, load averages: 1.36 1.84 2.22 | Mon Nov 23 21:00:52 UTC 2026 / Mon Nov 23 21:00:53 UTC 2026 | 0 | e6ba477bf8aba7e85b1f7a6bc4d67331fb002ac222b083569f5f376153675d4b |
| 416-r6-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 16:01  up 2 days,  7:28, 3 users, load averages: 1.31 1.81 2.21 | — | 0 | 92f0fe32875d852e28b6e0ef6e09077543b37af0d5949a8b14a570444decaebe |
| 417-r6-test.log | bun test packages/supervisor/test/preflight.test.ts | 16:01  up 2 days,  7:28, 3 users, load averages: 1.31 1.81 2.21 | Mon Nov 23 21:01:03 UTC 2026 / Mon Nov 23 21:01:30 UTC 2026 | 0 | bf281e116dbd14cdfa0269e131c13dd611aae49f4f695321c3f4cf3823dc8529 |
| 418-r6-types.log | bunx tsc --noEmit | 16:02  up 2 days,  7:29, 3 users, load averages: 1.75 1.89 2.21 | Mon Nov 23 21:02:10 UTC 2026 / Mon Nov 23 21:02:14 UTC 2026 | 0 | 0b744786f9a112a41b234c5018c8a8df095891c9bf2f8b111a3e3f3e5e4d0df6 |
| 419-r6-message.log | python3 - | 16:01  3 users, load averages: 1.52 1.85 2.22 | — | 0 | 58cb21fd8a3194aca925ba352db8eca553c4c33cd6dd59bbff894b3d2946411f |
| 420-r6-trailers.log | zsh /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh /private/tmp/m1-r1-IH7Fxlbw/r6-message.txt | 16:01  3 users, load averages: 1.52 1.85 2.22 | — | 0 | ae7db96f80fb434c55237ad188e4809d5b0756ca8977727b727000de2829a386 |
| 421-r6-stage.log | git add packages/supervisor/src/preflight.ts packages/supervisor/test/preflight.test.ts test/phase3b/preflight-input.ts | 16:02  3 users, load averages: 1.77 1.89 2.21 | — | 0 | c25fad1150b5aadab4b2b08382c6f77b1731faf37af7654ef84701520a237e05 |
| 422-r6-commit.log | git commit -F /private/tmp/m1-r1-IH7Fxlbw/r6-message.txt | 16:02  3 users, load averages: 1.77 1.89 2.21 | — | 0 | 60960c665207bb811d1acd05c9b3e9c2f6c36f3530928d0b31aca0e7f35f2673 |
| 423-r6-head.log | git rev-parse HEAD | 16:02  3 users, load averages: 1.77 1.89 2.21 | — | 0 | 3f852d042e9fba0cca527bd3d291bca10c982435cdff2b7460d0b36f8537f09d |
| 424-updater-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/supervisor/src/preflight.ts 'setting === "1"' 'setting === "0"' | 16:02  3 users, load averages: 2.59 2.08 2.26 | — | 0 | 7c6dbe97ceea1b31c0f129aecea603b261804a865024ae63fdf15df15ac1ad82 |
| 425-updater-diff.log | git -C tui diff -- packages/supervisor/src/preflight.ts | 16:02  3 users, load averages: 2.59 2.08 2.26 | — | 0 | 4c1e90386e57c457ec0a3cda9c9dc95156d8aee0598864e15989735a25e4a01a |
| 426-updater-runtime.log | Bun runtime check | 16:17  up 2 days,  7:45, 3 users, load averages: 2.01 2.57 2.47 | Mon Nov 23 21:17:52 UTC 2026 / Mon Nov 23 21:17:53 UTC 2026 | 0 | 35c3ea553325c1fa54e06ea7628bc1ae511a073fccbf497dceb9c77b7e8ad937 |
| 427-updater-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 16:17  up 2 days,  7:45, 3 users, load averages: 2.09 2.57 2.47 to 16:23  up 2 days,  7:51, 3 users, load averages: 1.99 2.53 2.49 | — | 0 | 97297652f824e49632a77d43e2464b568e425ac7760253909d6afa34e1ef23c5 |
| 428-updater-test.log | bun test packages/supervisor/test/preflight.test.ts | 16:23  up 2 days,  7:51, 3 users, load averages: 1.99 2.53 2.49 | Mon Nov 23 21:23:24 UTC 2026 / Mon Nov 23 21:23:50 UTC 2026 | 1 | 319f0ef2586eee93ae4470af18f7e9b3725f1f8c64da882f704fca97f8b757d9 |
| 429-updater-receipt.log | shasum -a 256 logs/428-updater-test.log | 16:23  3 users, load averages: 1.76 2.44 2.46 | — | 0 | 7b78301d0596c2f41c3efceab15345470de78501f83b43fa8aec9d5d153af11a |
| 430-updater-restore.log | git checkout -- packages/supervisor/src/preflight.ts | 16:23  3 users, load averages: 1.76 2.44 2.46 | — | 0 | 01668de45559df2c5c09dc80c074129bc62e9639a7b475eac5e86cecbf13b29f |
| 431-updater-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/supervisor/src/preflight.ts | 16:23  3 users, load averages: 1.76 2.44 2.46 | — | 0 | 59f88a6926c23fbf8e51b5ce16ff94662aefdba20be11dcacee1ea3469a9b43a |
| 432-extra-setting-break.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/supervisor/src/preflight.ts 'default: return false;' 'default: return key === "unlisted";' | 16:23  3 users, load averages: 1.76 2.44 2.46 | — | 0 | e9795787933fc2aa6925e4fb3883f8517699797804667ef94029f32e7b53dcba |
| 433-extra-setting-diff.log | git -C tui diff -- packages/supervisor/src/preflight.ts | 16:23  3 users, load averages: 1.76 2.44 2.46 | — | 0 | 716fcb2c66046ebb068fc745f541c1c51f221237df60d77b21448031bcd2907e |
| 434-extra-setting-runtime.log | Bun runtime check | 17:08  up 2 days,  8:35, 3 users, load averages: 4.02 4.37 3.38 | Mon Nov 23 22:08:10 UTC 2026 / Mon Nov 23 22:08:11 UTC 2026 | 0 | 23b7b0a86002d016113c89bf27fc1af6654eb4aefd2bdeab1f90e9ac17c9aa0a |
| 435-extra-setting-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 17:08  up 2 days,  8:35, 3 users, load averages: 3.78 4.31 3.37 to 17:28  up 2 days,  8:55, 3 users, load averages: 7.40 8.61 7.41 | — | 75 | 2021cc764b051dc3b1aa4590fb5320ffb96646e5de1c641e056c1ff84479fd14 |
| 440-snapshot-incidents.log | rg -n -A35 '^export interface (BrokerSnapshot\|ActiveIncident\|BrokerClient)\|reasonCode\|activeIncident' tui/packages/broker/src/client.ts | 16:18  3 users, load averages: 2.16 2.58 2.48 | — | 0 | 94a28cb131c5f845a6a80f97ffccc6460b5437275fd8b5ee9ba1b63eaeddd413 |
| 441-broker-interrupt.log | rg -n -A45 'async interrupt\(' tui/packages/broker/src/runtime-broker.ts | 16:18  3 users, load averages: 2.16 2.58 2.48 | — | 0 | eebad7637e33aa91e0a15b525963c8255e34d88feb4cefe54f5f307b86910eee |
| 442-pty-sends.log | rg -n -A20 'case "pty_input"\|writeInput\|ptyInput\|host\.handle\.send\(' tui/packages/supervisor/src/build.ts tui/packages/broker/src/in-process-client.ts | 16:18  3 users, load averages: 2.16 2.58 2.48 | — | 1 | f303919e8009d08df03fec0e4dd063c6bc3f19c53032b87db7fd06e80b2fc20f |
| 443-host-join.log | sed -n 65,102p tui/packages/broker/src/pty-host-supervisor.ts | 16:18  3 users, load averages: 2.21 2.58 2.48 | — | 0 | fb0e79d45f7b90606915a10466d5e8c422b5ca2e981c3f690c24ee63101e219c |
| 444-broker-client-projection.log | rg -n -A30 'function snapshots\|async function\* snapshots\|interface IncidentSnapshot\|interface LedgerEntrySnapshot' tui/packages/broker/src/in-process-client.ts tui/packages/broker/src/client.ts | 16:18  3 users, load averages: 2.21 2.58 2.48 | — | 0 | b8ca409f2ca3c9efb86decfe795e9f3737df0d5fa093d846e15db7498c295e32 |
| 445-build-cleanup.log | rg -n -A40 'makeBrokerDeps\|async function terminateBuilt\|function make.*Terminat\|rollbackBuild\(' tui/packages/supervisor/src/build.ts | 16:18  3 users, load averages: 1.95 2.51 2.45 | — | 0 | c2e3fd866c7e3099007553201b6abd2cac54d8a12637f0bbcca6c3ff766161d8 |
| 446-app-imports.log | cat tui/apps/madbridge/package.json tui/packages/broker/src/index.ts | 16:18  3 users, load averages: 2.19 2.55 2.47 | — | 0 | 9ee08c3b77b45a37be46a76d68f40c2827397e10d078588975713e364fa29a31 |
| 447-storage-component.log | rg -A44 '^export function createSessionStorage' tui/packages/storage/src | 16:18  3 users, load averages: 2.16 2.53 2.46 | — | 0 | 515e1bc969aabc1858bdcc9f0e4b6fe84c5128287ee9df8c130232ebd34d6c39 |
| 448-input-acks.log | rg -n 'ofKind\|kind: "ack"' tui/packages/pty-host/src/main.ts tui/packages/pty-host/src/frames.ts | 16:18  3 users, load averages: 2.21 2.53 2.46 | — | 0 | 4987e82fd2e45eac4ab02403b3ae3bb2e5861d9013b12b586ec939c8e8bf3c8f |
| 449-ledger-access.log | rg -n 'ledgerPath =\|new Ledger\(\|^  [a-zA-Z]+\(' tui/packages/supervisor/src/build.ts tui/packages/ledger/src/ledger.ts | 16:21  3 users, load averages: 2.85 2.68 2.53 | — | 0 | 06eb6e0f59477d67003b57fc3750f696eb11b59736d2046b8b4b9a2add805f02 |
| 450-registered-flags.log | sed -n 35,145p tui/packages/protocol/src/adapter-registry.ts | 16:21  3 users, load averages: 2.57 2.63 2.51 | — | 0 | 87ddb6bcdfee335160482d6909e46bbdaa71b5893f5668c84198d3688229edd5 |
| 451-composition-boundaries.log | cat logs/081-composition-import-rules.log | 16:22  3 users, load averages: 2.98 2.75 2.56 | — | 0 | 116174d508715628ade3dbc864e6824fca0f8bdba7b60ec30620c7fefab2c319 |
| 452-extra-setting-wait.log | tail -3 logs/435-extra-setting-load.log | 17:14  3 users, load averages: 6.52 6.06 4.52 to 17:13  up 2 days,  8:41, 3 users, load averages: 6.73 6.05 4.47 | — | 0 | c767bf2f9ed9aa25157192cb4073c79f3fb505f025ad5f5a6cb71fa005498133 |
| 453-wait-readings.log | awk 'NR==2{first=$0} END{print first;print $0}' logs/435-extra-setting-load.log | 17:19  3 users, load averages: 21.42 11.00 6.92 to 17:19  up 2 days,  8:47, 3 users, load averages: 20.94 10.73 6.80 | — | 0 | bd4dbd08728eedcebd7eaae841e4b200688f6991f10fc2f0fada2be0677fd320 |
| 454-extra-setting-load-repeat.log | uptime every 30 seconds until the one-minute load is below 2.0 | 18:02  up 2 days,  9:30, 4 users, load averages: 2.38 2.78 4.10 to 18:04  up 2 days,  9:32, 4 users, load averages: 1.98 2.56 3.88 | — | 0 | 8b83f98862e43270ef2e760b3acac906c056fac4ed50929b3e1a8a83a696271b |
| 455-extra-setting-test.log | bun test packages/supervisor/test/preflight.test.ts | 18:04  up 2 days,  9:32, 4 users, load averages: 1.98 2.56 3.88 | Mon Nov 23 23:04:30 UTC 2026 / Mon Nov 23 23:04:57 UTC 2026 | 1 | 62c746dd2aaed6ddc04de196f18568ddbef66f2fb82b4fe37d6d0f735e69f2df |
| 456-extra-setting-receipt.log | shasum -a 256 logs/455-extra-setting-test.log | 18:05  4 users, load averages: 3.03 2.75 3.90 | — | 0 | 56bb9272ea3c22324284a873f911e3d96d86653a399aac1230bcab4823c4bf76 |
| 457-extra-setting-restore.log | git checkout -- packages/supervisor/src/preflight.ts | 18:05  4 users, load averages: 3.03 2.75 3.90 | — | 0 | e405661d0452de62028578faafbfb56c26aeec417b487ce8973d88215449c3af |
| 458-extra-setting-verified.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/supervisor/src/preflight.ts | 18:05  4 users, load averages: 3.03 2.75 3.90 | — | 0 | 4b9ce236c8b96ee6e35b9ce5c96bd649db9f3e41199705134f15fd8d9e562387 |
| 459-composition.log | python3 - | 18:05  4 users, load averages: 3.19 2.80 3.87 | — | 0 | fbf679153990838f6623f71f4086c55d588b07ec7812b08cdaf720bd0cd08434 |
| 460-offline-standin.log | python3 - | 18:06  4 users, load averages: 3.37 2.88 3.87 | — | 0 | e9e231a15972027fe0a3f53e95b3dd3fc88c3b244b74a877047383002e63cff4 |
| 461-scenarios.log | python3 - | 18:06  4 users, load averages: 2.97 2.83 3.80 | — | 0 | 4685188b265637cda41a9b059f80aca3ed6bca23b48937d0e1f28eb126926091 |
| 462-composition-tests.log | python3 - | 18:07  4 users, load averages: 3.60 2.99 3.83 | — | 0 | 20a25ac4c795b3937ec6be837f11b5cf578a8ec29331db153a984e49fb261e5b |
| 463-r7-runtime.log | Bun runtime check | 18:08  up 2 days,  9:36, 3 users, load averages: 3.52 3.23 3.84 | Mon Nov 23 23:08:37 UTC 2026 / Mon Nov 23 23:08:37 UTC 2026 | 0 | ee81cafffd145f282db56af05c72813242fa5eca02c04f17ae89a8079d362f12 |
| 464-r7-types.log | bunx tsc --noEmit | 18:08  up 2 days,  9:36, 3 users, load averages: 4.04 3.34 3.88 | Mon Nov 23 23:08:38 UTC 2026 / Mon Nov 23 23:08:42 UTC 2026 | 0 | a897cab47600962d3c30cd3ca75c538a3ae90ba7ebb45aeab6c989264b8d4958 |
| 465-r7-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 18:08  up 2 days,  9:36, 3 users, load averages: 3.87 3.32 3.87 to 18:28  up 2 days,  9:56, 3 users, load averages: 2.17 3.41 3.98 | — | 75 | 73168897a1836441808fa47ea0b3f4946995f6d02edeb5edf8f9ff2e7c690d48 |
| 467-pr-shape-input.log | sed -n 225,310p tui/.github/scripts/attribution-shape-check.sh | 18:09  3 users, load averages: 3.44 3.25 3.83 | — | 0 | 9b303dc6d27ff6eb93fafbb3b47618eaef679e6ec5eb64d16e2d99666638fa70 |
| 468-r4-r6-break-evidence.log | python3 - | 18:10  3 users, load averages: 2.75 3.11 3.73 | — | 0 | e0c18c432d6ec7214ca8d0315a7941b6ad59d391fa491c06af913f28de3b1882 |
| 469-closed-client.log | sed -n '86,110p;399,426p' tui/packages/broker/src/in-process-client.ts | 18:11  3 users, load averages: 2.72 3.03 3.64 | — | 0 | a590d9d1a0b040fdc6df71106dd612d63ec35af04dcf5119e672c4e8a4009e62 |
| 470-r7-wait.log | awk 'NR==2{first=$0} END{print first; print $0}' logs/465-r7-load.log | 18:27  3 users, load averages: 2.88 3.81 4.17 to 18:26  up 2 days,  9:54, 3 users, load averages: 3.32 3.97 4.23 | — | 0 | 4ba60a398d09ed1d8a0d59d5d28cb6f31b13817f71caa14b9668e1988832a5fc |
| 471-r7-load-repeat.log | uptime every 30 seconds until two consecutive one-minute readings are below 2.0 | 19:08  up 2 days, 10:35, 3 users, load averages: 2.15 2.15 2.63 to 19:11  up 2 days, 10:39, 2 users, load averages: 1.62 1.99 2.46 | — | 0 | 51606ce8accf78ae7294a2cfd9fc1828459f100f40281ce9517ea42ac9a70e4c |
| 472-r7-composition.log | bun test test/phase3b/composition.test.ts | 19:11  up 2 days, 10:39, 2 users, load averages: 1.62 1.99 2.46 | Tue Nov 24 00:11:54 UTC 2026 / Tue Nov 24 00:11:55 UTC 2026 | 1 | 8c5459c2c1e09ab96f3734540b8ad1ccf99db3fe4b6d8114ef4f9ea98169a340 |
| 473-r7-message.log | python3 - | 19:09  3 users, load averages: 2.17 2.15 2.58 | — | 0 | 73258a612947ad8e3740f3c6c22b8133ede96b655037e1914cdc2b6175eadf0d |
| 474-r7-trailers.log | zsh /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh /private/tmp/m1-r1-IH7Fxlbw/r7-message.txt | 19:09  3 users, load averages: 2.17 2.15 2.58 | — | 0 | 02f3f01ff4bfaf06c777135379a9332d06f2cf3a2d75d7ac598941529df27f18 |
| 475-fresh-test-envelope.log | python3 - | 19:12  2 users, load averages: 1.96 2.05 2.47 | — | 0 | 0e296ed03ccbba303686b32653ddf7df034e5647264f8e5f4380cddb9a34a06b |
| 476-r7-expiry-trailers.log | zsh /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh /private/tmp/m1-r1-IH7Fxlbw/r7-message.txt | 19:12  2 users, load averages: 1.96 2.05 2.47 | — | 0 | 602c969f152e263f216506fe97a54893b73abaaa9d90d50e761adf7ed752e0e8 |
| 477-composition-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 19:12  up 2 days, 10:40, 2 users, load averages: 2.04 2.06 2.45 to 19:13  up 2 days, 10:40, 2 users, load averages: 1.70 1.97 2.41 | — | 0 | f1cf2aa4cc6aea012e70b799c267f4d001f264e7fdbbeccc9cf100f20cef8b76 |
| 478-composition-retest.log | bun test test/phase3b/composition.test.ts | 19:13  up 2 days, 10:40, 2 users, load averages: 1.70 1.97 2.41 | Tue Nov 24 00:13:24 UTC 2026 / Tue Nov 24 00:13:28 UTC 2026 | 1 | 333b22d8f796847764115addaad45f820e2c21fa1641aab8146f8a178b6da4f4 |
| 479-check-date-context.log | rg -n 2026-11-24T tui/test tui/packages tui/apps -g '*.ts' -g '*.tsx' | 19:12  2 users, load averages: 2.03 2.06 2.45 | — | 1 | f3360c6ad8dc62e122cb4389ab14022cf015786a35781bafe3846fe88acb9aca |
| 480-standin-traces.log | cat tui/packages/adapter-claude-code/src/live.ts | 19:14  2 users, load averages: 1.52 1.87 2.33 | — | 0 | 1b868ea68b250b1bb3b2d951dabca40032c2b5f888d816101b052525d4fa1476 |
| 481-ready-signals.log | rg -n -i 'before.*input\|first.*input\|echo\|raw mode\|setRawMode\|ready' tui/docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md tui/packages/pty-host/src/terminal.ts tui/test/phase3a/fixture-adapters.ts | 19:14  2 users, load averages: 1.52 1.87 2.33 | — | 0 | 90ed6ba43b6d0bbc28e456a58c9fe12e373bbc61f2cd010d5d8a4ec8d063e5a5 |
| 482-terminal-standin.log | python3 - | 19:15  2 users, load averages: 1.73 1.86 2.30 | — | 0 | bb5740b15c891f2184519a39031913fee7d1abca0ee8054060209905b9af6eab |
| 483-standin-bootstrap.log | sed -n 9,33p tui/test/phase3b/scenarios.ts | 19:15  2 users, load averages: 1.67 1.84 2.29 | — | 0 | 50eb8e729bc0ba44e287d6db8129fc512ce6bab3077c41479e399e012dbeca44 |
| 484-bootstrap-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 19:15  up 2 days, 10:43, 2 users, load averages: 1.71 1.84 2.28 | — | 0 | e6177b1c31e8023f8a8648b8e60d61137a23dabcb9bb03d073f7ae2ddd60f5dc |
| 485-bootstrap-test.log | bun test test/phase3b/composition.test.ts | 19:15  up 2 days, 10:43, 2 users, load averages: 1.71 1.84 2.28 | Tue Nov 24 00:15:56 UTC 2026 / Tue Nov 24 00:15:59 UTC 2026 | 1 | fe9321c5f103632aac2c50e3ff6c7d52a5e7bb8f38f4142beef053b8abbe0c16 |
| 486-observe-wire.log | python3 - | 19:16  2 users, load averages: 1.46 1.77 2.24 | — | 0 | 1ba3cffa5e3607f1716301528e1d89abe9acfea0530766f14cacc039685f1a22 |
| 487-wire-load.log | uptime every 30 seconds until the one-minute load is below 2.0 | 19:24  up 2 days, 10:51, 2 users, load averages: 2.32 2.11 2.18 to 19:24  up 2 days, 10:52, 2 users, load averages: 1.81 2.02 2.14 | — | 0 | fd176c3d15e08b778a84183281ebd7bd5fe0183ff3387abaac17a6e092a1555b |
| 488-wire-classification.log | bun test test/phase3b/composition.test.ts -t "a second attester invocation" | 19:24  up 2 days, 10:52, 2 users, load averages: 1.81 2.02 2.14 | Tue Nov 24 00:24:37 UTC 2026 / Tue Nov 24 00:24:38 UTC 2026 | 1 | 243098c8752897de10961d27818816b9f0633e75c9d252666837ef0a23b168f6 |
| 489-host-readiness-lines.log | sed -n '786,822{=;p;}' tui/packages/pty-host/src/main.ts | 19:28  2 users, load averages: 1.34 1.75 2.00 | — | 0 | e1496522201d4b89d1c4e28597b35a6492ff54297248ddad7f94f58b088ab8d7 |
| 490-pty-creation-lines.log | sed -n '56,86{=;p;}' tui/packages/pty-host/src/terminal.ts | 19:28  2 users, load averages: 1.34 1.75 2.00 | — | 0 | ce89e745788f560e27d51f67515b7a3f6384655af476832851b2357609a8fac6 |
| 491-available-reports.log | ls -A pr | 19:28  2 users, load averages: 1.34 1.75 2.00 | — | 0 | 604d1871bd15a6eb21b61ce0aa2444ebc1f68a97de3956342a26b8ce06ff90d7 |
| 492-check-transport-path.log | rg -n -A20 'export interface PtyHostHandle\|export type HostCommandFrame' tui/packages/broker/src/pty-host-supervisor.ts tui/packages/broker/src/pty-host-protocol.ts | 19:28  2 users, load averages: 1.34 1.75 2.00 | — | 0 | ff38c8360a60dfee864be9819a6dc8a5fa32c139398d36bdb02935477015151a |
| 493-r7-diagnosis-inputs.log | ls -l logs/488-wire-classification.log logs/489-host-readiness-lines.log logs/490-pty-creation-lines.log logs/491-available-reports.log logs/492-check-transport-path.log pr/ | 19:29  2 users, load averages: 1.04 1.55 1.90 | — | 0 | 484bb307fa27ff9a48b30d0979375e4690b3bc47d992c3a440c13a3cb1083950 |
| 494-r7-composition.log | cat tui/apps/madbridge/src/tui/live/composition.ts | 19:30  2 users, load averages: 1.03 1.54 1.90 | — | 0 | 71b48b295de4d293f7a929e45915ad71c8a6858fc88390bb1778599a06f96f74 |
| 495-r7-scenarios.log | cat /private/tmp/m1-r1-IH7Fxlbw/before-wire-observation.ts | 19:30  2 users, load averages: 1.03 1.54 1.90 | — | 0 | d687ba03c9b7d79a3f46a4c4f9d66f8f5f94c9060839386f67575fed452f49ce |
| 496-r7-stand-in.log | cat tui/test/phase3b/stand-in.ts | 19:30  2 users, load averages: 1.03 1.54 1.90 | — | 0 | 14ae498d0fe9eb7139aa790f73a1d4b2fe888f54c0b93ad9da9399dad6db615d |
| 497-r7-rulings.log | cat logs/492-check-transport-path.log | 19:30  2 users, load averages: 1.03 1.54 1.90 | — | 0 | fa2b4b2400f4448ebec01f242974842c6f7b4de77aeffd6f1261674e42682f83 |
| 498-check-r7-authority.log | rg -n -A11 '^B1[67]\.\|^B2[1256]\.' tui/docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md | 19:30  2 users, load averages: 1.03 1.53 1.89 | — | 0 | 41b020d8178d9458414317304c5cb89a40a6d843fe6be215fe4ee639d0eccd4c |
| 499-echo-rule.log | sed -n 129,134p tui/docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md | 19:30  2 users, load averages: 2.07 1.73 1.96 | — | 0 | 5870b97bf4c52a46eeefddfdbcc5a9f1d644411e874fbd5b8df1a258159e510a |
| 500-readiness-facts.log | cat logs/489-host-readiness-lines.log logs/490-pty-creation-lines.log | 19:30  2 users, load averages: 2.07 1.73 1.96 | — | 0 | cadb1e138349c3b0bb185e628e97a4260bad3cff4cd431da05908c4f13f2c6d5 |
| 501-build-order.log | rg -n 'launched\|ready\|reattest\|bind\|operation\|launchHost' tui/packages/supervisor/src/build.ts | 19:30  2 users, load averages: 2.07 1.73 1.96 | — | 0 | ee8d23a1996e2cfa6f9a7570d385e4d291b173aee4201d64aeb0e34546a76f29 |
| 502-classification.log | cat logs/488-wire-classification.log | 19:30  2 users, load averages: 2.07 1.73 1.96 | — | 0 | 64ecdc1fd2bee580144c307f21bc0629062ef0a5141db65d3f0604b54b94bf6d |
| 503-offline-setup.log | cat tui/test/phase3b/offline.ts | 19:30  2 users, load averages: 1.82 1.69 1.94 | — | 0 | 28918b54e003ddd5dd5c964d42226c5f01f0b80122708b1b49a0476a9427438e |
| 504-wire-observation-diff.log | diff -u /private/tmp/m1-r1-IH7Fxlbw/before-wire-observation.ts tui/test/phase3b/scenarios.ts | 19:30  2 users, load averages: 1.82 1.69 1.94 | — | 1 | 51dc314f96d7ef296cb5e6977e99808b729f927a1b6587aaa41cf6f1251a9249 |
| 505-check-repository-state.log | git -C tui status -sb | 19:30  2 users, load averages: 1.82 1.69 1.94 | — | 0 | e072f1c47b10d950774b63ebde6482617359e6af4be2194289957ba24d6a9ed5 |
| 506-r7-tests.log | cat logs/485-bootstrap-test.log | 19:30  2 users, load averages: 1.82 1.69 1.94 | — | 0 | e8410a77d414af06b68ceee1e8cd32f3b818907ffff55f6e8d7d63989c8f4a6b |
| 507-restore-offline-scenario.log | cp /private/tmp/m1-r1-IH7Fxlbw/before-wire-observation.ts tui/test/phase3b/scenarios.ts | 19:30  2 users, load averages: 2.00 1.73 1.95 | — | 0 | b9fad46107bd6e275fa83b9728a656baa2ddeff70911c8167ac0cf0903b725b7 |
| 508-verify-diagnostic-restore.log | shasum -a 256 tui/test/phase3b/scenarios.ts /private/tmp/m1-r1-IH7Fxlbw/before-wire-observation.ts | 19:30  2 users, load averages: 2.00 1.74 1.95 | — | 0 | 19d3efcbd760706b9862bf4425f734117b6de02c92bc0302908994c6b2f65750 |
| 509-halt-commits.log | git -C tui log '--format=%H %P %s' 75aec139d503cbe1d34d0c6f3ac5bd514339570e..HEAD | 19:30  2 users, load averages: 2.00 1.74 1.95 | — | 0 | 2f29d8d87ee70db1f58f1aa455e409e33bf0b0cd1594850f9fafbe627931cea1 |
| 510-halt-source-digests.log | shasum -a 256 logs/417-r6-test.log logs/418-r6-types.log logs/454-extra-setting-load-repeat.log logs/455-extra-setting-test.log logs/458-extra-setting-verified.log logs/464-r7-types.log logs/471-r7-load-repeat.log logs/472-r7-composition.log logs/478-composition-retest.log logs/485-bootstrap-test.log logs/488-wire-classification.log logs/489-host-readiness-lines.log logs/490-pty-creation-lines.log logs/492-check-transport-path.log logs/499-echo-rule.log tui/docs/verification/phase-3b-m1-build-log.md tui/apps/madbridge/src/tui/live/composition.ts tui/test/phase3b/composition.test.ts tui/test/phase3b/offline.ts tui/test/phase3b/scenarios.ts tui/test/phase3b/stand-in.ts | 19:30  2 users, load averages: 2.00 1.74 1.95 | — | 0 | 45ad2f1a8a463abacdbcfdf99a24c0715f292ad15047a84f0c7b0f45cba91dba |
| 511-verify-transport-untouched.log | git -C tui diff --exit-code 75aec139d503cbe1d34d0c6f3ac5bd514339570e -- packages/pty-host packages/broker | 19:30  2 users, load averages: 2.00 1.74 1.95 | — | 0 | 263a62b7e480a4d5b93e7a1ec8e098dcb2388969c5f7d92452dd028c08d0d66a |
| 512-check-load-results.log | cat logs/454-extra-setting-load-repeat.log logs/471-r7-load-repeat.log | 19:30  2 users, load averages: 2.00 1.74 1.95 to 19:11  up 2 days, 10:39, 2 users, load averages: 1.62 1.99 2.46 | — | 0 | 513ee7b9f68ad07b8da44170d540ad77b707e6257be6a13efdf48e753169900d |
| 513-inspect-log-format.log | cat /private/tmp/m1-r1-IH7Fxlbw/log.zsh | 19:30  2 users, load averages: 2.00 1.75 1.95 | — | 0 | 4502cbe8afcc3b7a71f00ed9dc952a90b60c47e5ce7cd01c977494bea1724f01 |
| 514-check-r6-restoration.log | cat logs/458-extra-setting-verified.log | 19:30  2 users, load averages: 2.00 1.75 1.95 | — | 0 | e5c9ff55c89579e5fcbeb877997c9034070442080dbc07d83581f3d4995e5675 |
| 515-halt-pin-details.log | cat logs/117-r1-pin.log | 19:30  2 users, load averages: 2.00 1.75 1.95 | — | 0 | 1416fb15ab478729ef67b1ef05785650eba2270e057498847ef417a350240786 |
| 516-check-prior-deviations.log | rg -n -i 'does not count\|do not count\|invalidated\|1\.4\.5\|log 042\|log 040' tui/docs/verification/phase-3b-m1-build-log.md | 19:30  2 users, load averages: 2.00 1.75 1.95 | — | 0 | 4a3ae071b90916ca5d27de7d36ed6b2345a40e44a535db9441ed3e76b3ace116 |
| 517-check-evidence-at-halt.log | ls -A evidence | 19:30  2 users, load averages: 2.00 1.75 1.95 | — | 0 | 18082aebae09fb2ceff857cae924ec1b1bbc1398e12aca9236be7ac299f3719b |
| 518-pre-halt-log-digests.log | shasum -a 256 logs/001-governed-version.log logs/002-pwd.log logs/003-branch.log logs/004-head.log logs/005-git-name.log logs/006-git-email.log logs/007-runtime.log logs/008-commission.log logs/009-base-state.log logs/010-folders.log logs/011-prompt.log logs/012-deliverable.log logs/013-rollback.log logs/014-index.log logs/015-authority-verification.log logs/016-project-instructions.log logs/017-standing-rules.log logs/018-grounds.log logs/019-preflight-lines.log logs/020-entry.log logs/021-scratch.log logs/022-build-base.log logs/023-adapters.log logs/024-related.log logs/025-architecture.log logs/026-seam-references.log logs/027-tui-and-host.log logs/028-precondition-imports.log logs/029-host-and-model.log logs/030-transport.log logs/031-baseline-hash.log logs/032-logging-helper.log logs/033-baseline-install.log logs/034-locked.log logs/035-install-state.log logs/036-import-lines.log logs/037-transport-context.log logs/038-restore-install-mode.log logs/039-restored-state.log logs/040-baseline-types.log logs/041-check-helpers.log logs/042-baseline-runtime.log logs/043-report-source.log logs/044-halt-report.log logs/045-prompt-check.log logs/046-prompt-files.log logs/047-governed-version.log logs/048-head.log logs/049-clean.log logs/050-halt-report.log logs/051-runtime-log.log logs/052-evidence-dir.log logs/053-remove-dependencies.log logs/054-resumed-runtime.log logs/055-lock-before.log logs/056-resumed-install.log logs/057-lock-after.log logs/058-install-diff.log logs/059-restore-mode.log logs/060-clean.log logs/061-resumed-types.log logs/062-pre-suite-runtime.log logs/063-baseline-load.log logs/064-resumed-baseline.log logs/065-health.log logs/066-m1-design.log logs/067-host-protocol.log logs/068-file-layout.log logs/069-settings.log logs/070-detector-registration.log logs/071-barrier.log logs/072-spec-section.log logs/073-registration-and-launch.log logs/074-budget-and-git.log logs/075-base-list.log logs/076-base-receipt.log logs/077-settings-and-cwd.log logs/078-input-guards.log logs/079-broker-and-barrier.log logs/080-storage-limits.log logs/081-composition-import-rules.log logs/082-record-fixtures.log logs/083-spec-constraints.log logs/084-probe-path.log logs/085-allowlist.log logs/086-storage-files.log logs/087-base-preflight-import.log logs/088-opening.log logs/089-message-opening.log logs/090-stage-opening.log logs/091-check-opening.log logs/092-commit-opening.log logs/093-opening-sha.log logs/094-storage-root.log logs/095-fixture-build.log logs/096-runtime-contract.log logs/097-option-types.log logs/098-edit-port.log logs/099-port-tests.log logs/100-r1-runtime.log logs/101-r1-load.log logs/102-r1-port.log logs/103-subscription-test.log logs/104-event-fields.log logs/105-foundation.log logs/106-r1-correction.log logs/107-r1-retest-load.log logs/108-r1-retest.log logs/109-adapter-package-files.log logs/110-surface-handoff.log logs/111-broker-phase.log logs/112-r1-message.log logs/113-r1-typecheck.log logs/114-r1-message-check.log logs/115-r1-stage.log logs/116-r1-staged-check.log logs/117-r1-pin.log logs/118-r1-commit.log logs/119-r1-revision.log logs/120-break-untrusted-detail.log logs/121-break-detail-diff.log logs/122-break-detail-runtime.log logs/123-break-detail-load.log logs/125-read-addendum.log logs/126-resume-manifest.log logs/127-resume-files.log logs/128-version.log logs/129-revision.log logs/130-deleted-log.log logs/131-reports.log logs/132-check-break.log logs/133-tree.log logs/134-restore-port.log logs/135-restored-status.log logs/136-restored-digest.log logs/137-audit-files.log logs/138-audit-test-sources.log logs/139-test-output-fix.log logs/140-fix-runtime.log logs/141-fix-load.log logs/142-fix-test.log logs/143-prepare-fix-message.log logs/144-create-break-tools.log logs/145-test-self-fix-diff.log logs/146-fix-trailers.log logs/147-audit-separation-change.log logs/148-repeat-break.log logs/149-repeat-break-diff.log logs/150-break-runtime.log logs/151-break-load.log logs/152-break-test.log logs/153-break-receipt.log logs/154-restore-repeat.log logs/155-verify-repeat.log logs/156-stage-self-fix.log logs/157-check-self-fix.log logs/158-commit-self-fix.log logs/159-self-fix-sha.log logs/160-break-monitor.log logs/161-break-monitor-diff.log logs/162-monitor-runtime.log logs/163-monitor-load.log logs/164-monitor-test.log logs/165-monitor-receipt.log logs/166-monitor-restore.log logs/167-monitor-verified.log logs/168-claude-attester.log logs/169-write-claude-reader.log logs/170-claude-tests.log logs/171-claude-monitor-cases.log logs/172-r2-runtime.log logs/173-r2-load.log logs/174-r2-test.log logs/175-r2-message.log logs/176-r2-message-check.log logs/177-r2-stage.log logs/178-r2-check.log logs/179-r2-commit.log logs/180-r2-sha.log logs/181-encoder-break.log logs/182-encoder-diff.log logs/183-encoder-runtime.log logs/184-encoder-load.log logs/185-encoder-test.log logs/186-encoder-receipt.log logs/187-encoder-restore.log logs/188-encoder-verified.log logs/189-provider-break.log logs/190-provider-diff.log logs/191-provider-runtime.log logs/192-provider-load.log logs/193-provider-test.log logs/194-provider-receipt.log logs/195-provider-restore.log logs/196-provider-verified.log logs/197-echo-break.log logs/198-echo-diff.log logs/199-echo-runtime.log logs/200-echo-load.log logs/201-echo-test.log logs/202-echo-receipt.log logs/203-echo-restore.log logs/204-echo-verified.log logs/205-rounds-break.log logs/206-rounds-diff.log logs/207-rounds-runtime.log logs/208-rounds-load.log logs/209-rounds-test.log logs/210-rounds-receipt.log logs/211-rounds-restore.log logs/212-rounds-verified.log logs/213-result-time-break.log logs/214-result-time-diff.log logs/215-result-time-runtime.log logs/216-result-time-load.log logs/217-result-time-test.log logs/218-result-time-receipt.log logs/219-result-time-restore.log logs/220-result-time-verified.log logs/221-partial-break.log logs/222-partial-diff.log logs/223-partial-runtime.log logs/224-partial-load.log logs/225-partial-test.log logs/226-partial-receipt.log logs/227-partial-restore.log logs/228-partial-verified.log logs/229-fallback-break.log logs/230-fallback-diff.log logs/231-fallback-runtime.log logs/232-fallback-load.log logs/233-fallback-test.log logs/234-fallback-receipt.log logs/235-fallback-restore.log logs/236-fallback-verified.log logs/237-madv-parser.log logs/238-madv-plan.log logs/239-madv-act.log logs/240-claude-wire.log logs/241-r3-terms.log logs/242-r3-detail.log logs/243-r3-input.log logs/244-madv-criteria.log logs/246-r3-fixtures.log logs/247-fact-types.log logs/248-registration.log logs/249-build-handover.log logs/250-r3-parser-edit.log logs/251-r3-attester.log logs/252-r3-runtime.log logs/253-r3-tests.log logs/254-r3-load.log logs/255-r3-test.log logs/256-settings-terms.log logs/257-governed-settings.log logs/258-planned-remaining.log logs/259-commit-tools.log logs/260-r3-whitespace.log logs/261-r3-message.log logs/262-r3-trailers.log logs/263-r3-receipt.log logs/264-r3-stage.log logs/265-r3-commit.log logs/266-r3-head.log logs/267-first-write-break.log logs/268-first-write-diff.log logs/269-first-write-runtime.log logs/270-first-write-load.log logs/271-first-write-test.log logs/272-first-write-receipt.log logs/273-first-write-restore.log logs/274-first-write-verified.log logs/275-assistant-break.log logs/276-assistant-diff.log logs/277-assistant-runtime.log logs/278-assistant-load.log logs/279-assistant-test.log logs/280-assistant-receipt.log logs/281-assistant-restore.log logs/282-assistant-verified.log logs/283-extra-break.log logs/284-extra-diff.log logs/285-extra-runtime.log logs/286-extra-load.log logs/287-extra-test.log logs/288-extra-receipt.log logs/289-extra-restore.log logs/290-extra-verified.log logs/291-result-time-break.log logs/292-result-time-diff.log logs/293-result-time-runtime.log logs/294-result-time-load.log logs/295-result-time-test.log logs/296-result-time-receipt.log logs/297-result-time-restore.log logs/298-result-time-verified.log logs/299-later-line-break.log logs/300-later-line-diff.log logs/301-later-line-runtime.log logs/302-later-line-load.log logs/303-later-line-test.log logs/304-later-line-receipt.log logs/305-later-line-restore.log logs/306-later-line-verified.log logs/307-preflight-input.log logs/308-offline-sources.log logs/309-adapter-settings.log logs/310-build-exits.log logs/311-port-tests.log logs/312-standin-records.log logs/313-app-scans.log logs/314-record-primitives.log logs/315-probe-differences.log logs/316-leaf-deps.log logs/317-reused-record.log logs/318-ready-process.log logs/319-terminal-mode.log logs/320-record-builder.log logs/321-interruption.log logs/322-health-pieces.log logs/323-freshness.log logs/324-live-mode-api.log logs/325-test-restrictions.log logs/326-detector-definitions.log logs/327-log-layout.log logs/328-scratch-assets.log logs/329-attribution-contract.log logs/330-output-boundary.log logs/331-detectors.log logs/332-detector-tests.log logs/333-r4-runtime.log logs/334-r4-load.log logs/335-r4-detectors.log logs/336-r4-madv-load.log logs/337-r4-madv.log logs/338-r4-types.log logs/339-r4-message.log logs/340-r4-trailers.log logs/341-shorten-r4.log logs/342-r4-trailers.log logs/343-source-rules.log logs/344-index-contract.log logs/345-compile-fix-input.log logs/346-all-claude-cases.log logs/347-r4-type-fixes.log logs/348-new-r4-trailers.log logs/349-r4-types-fixed.log logs/350-r4-cases-load.log logs/351-r4-cases.log logs/352-composition-spec.log logs/353-r4-stage.log logs/354-r4-commit.log logs/355-r4-head.log logs/356-detector-break.log logs/357-detector-diff.log logs/358-detector-runtime.log logs/359-detector-load.log logs/360-detector-test.log logs/361-detector-receipt.log logs/362-detector-restore.log logs/363-detector-verified.log logs/364-client-stops.log logs/365-architecture-package-boundaries.log logs/366-closure-scan.log logs/367-scan-roots.log logs/368-host-launch.log logs/369-ledger-formats.log logs/370-prepare-ledger.log logs/371-verify-list-reader.log logs/372-r4-wait-state.log logs/373-break-inventory.log logs/374-break-book.log logs/375-verify-break-book.log logs/376-settings-sources.log logs/377-r5-runtime.log logs/378-r5-load.log logs/379-r5-test.log logs/380-r5-message.log logs/381-r5-trailers.log logs/382-record-parse-rules.log logs/383-settings-wait-state.log logs/384-existing-terminal-observations.log logs/385-r5-stage.log logs/386-r5-commit.log logs/387-r5-head.log logs/388-darwin-map-break.log logs/389-darwin-map-diff.log logs/390-darwin-map-runtime.log logs/391-darwin-map-load.log logs/392-darwin-map-test.log logs/393-darwin-map-receipt.log logs/394-darwin-map-restore.log logs/395-darwin-map-verified.log logs/396-remote-copy-break.log logs/397-remote-copy-diff.log logs/398-remote-copy-runtime.log logs/399-remote-copy-load.log logs/400-remote-copy-test.log logs/401-remote-copy-receipt.log logs/402-remote-copy-restore.log logs/403-remote-copy-verified.log logs/404-local-path-break.log logs/405-local-path-diff.log logs/406-local-path-runtime.log logs/407-local-path-load.log logs/408-local-path-test.log logs/409-local-path-receipt.log logs/410-local-path-restore.log logs/411-local-path-verified.log logs/412-r6-validator.log logs/413-r6-fixture.log logs/414-r6-tests.log logs/415-r6-runtime.log logs/416-r6-load.log logs/417-r6-test.log logs/418-r6-types.log logs/419-r6-message.log logs/420-r6-trailers.log logs/421-r6-stage.log logs/422-r6-commit.log logs/423-r6-head.log logs/424-updater-break.log logs/425-updater-diff.log logs/426-updater-runtime.log logs/427-updater-load.log logs/428-updater-test.log logs/429-updater-receipt.log logs/430-updater-restore.log logs/431-updater-verified.log logs/432-extra-setting-break.log logs/433-extra-setting-diff.log logs/434-extra-setting-runtime.log logs/435-extra-setting-load.log logs/440-snapshot-incidents.log logs/441-broker-interrupt.log logs/442-pty-sends.log logs/443-host-join.log logs/444-broker-client-projection.log logs/445-build-cleanup.log logs/446-app-imports.log logs/447-storage-component.log logs/448-input-acks.log logs/449-ledger-access.log logs/450-registered-flags.log logs/451-composition-boundaries.log logs/452-extra-setting-wait.log logs/453-wait-readings.log logs/454-extra-setting-load-repeat.log logs/455-extra-setting-test.log logs/456-extra-setting-receipt.log logs/457-extra-setting-restore.log logs/458-extra-setting-verified.log logs/459-composition.log logs/460-offline-standin.log logs/461-scenarios.log logs/462-composition-tests.log logs/463-r7-runtime.log logs/464-r7-types.log logs/465-r7-load.log logs/467-pr-shape-input.log logs/468-r4-r6-break-evidence.log logs/469-closed-client.log logs/470-r7-wait.log logs/471-r7-load-repeat.log logs/472-r7-composition.log logs/473-r7-message.log logs/474-r7-trailers.log logs/475-fresh-test-envelope.log logs/476-r7-expiry-trailers.log logs/477-composition-load.log logs/478-composition-retest.log logs/479-check-date-context.log logs/480-standin-traces.log logs/481-ready-signals.log logs/482-terminal-standin.log logs/483-standin-bootstrap.log logs/484-bootstrap-load.log logs/485-bootstrap-test.log logs/486-observe-wire.log logs/487-wire-load.log logs/488-wire-classification.log logs/489-host-readiness-lines.log logs/490-pty-creation-lines.log logs/491-available-reports.log logs/492-check-transport-path.log logs/493-r7-diagnosis-inputs.log logs/494-r7-composition.log logs/495-r7-scenarios.log logs/496-r7-stand-in.log logs/497-r7-rulings.log logs/498-check-r7-authority.log logs/499-echo-rule.log logs/500-readiness-facts.log logs/501-build-order.log logs/502-classification.log logs/503-offline-setup.log logs/504-wire-observation-diff.log logs/505-check-repository-state.log logs/506-r7-tests.log logs/507-restore-offline-scenario.log logs/508-verify-diagnostic-restore.log logs/509-halt-commits.log logs/510-halt-source-digests.log logs/511-verify-transport-untouched.log logs/512-check-load-results.log logs/513-inspect-log-format.log logs/514-check-r6-restoration.log logs/515-halt-pin-details.log logs/516-check-prior-deviations.log logs/517-check-evidence-at-halt.log | 19:31  2 users, load averages: 1.77 1.71 1.93 | — | 0 | 5da3ccf17e8946ab7091f41a23986813af44bebec60a352de1ca88a8dce31878 |
| 519-write-halt-report.log | tee pr/m1-report.md | 19:32  2 users, load averages: 2.16 1.82 1.96 | — | 0 | bb65e318c8b6a9c5f8a5f8d244bb4048b626710e5386c12b42df9ec79e0af00e |
| 520-verify-halt-report-shape.log | awk 'index($0,"[") \|\| index($0,"]") \|\| $0 == "---" \|\| /[ \t]$/ { bad++ } END { print "report shape violations", bad+0; exit !!bad }' pr/m1-report.md | 19:32  2 users, load averages: 1.90 1.77 1.94 | — | 0 | ee312e3f7c2bbe23a95d486ce492665822207e34cd5066a41b9dfd4f7629cc3b |
| 521-halt-report-sha.log | shasum -a 256 pr/m1-report.md | 19:32  2 users, load averages: 1.90 1.77 1.94 | — | 0 | ef7394f11be2ba05ec3d3ab433f0c12ae5cdab3827440d4d1afa0362597a159f |
| 522-halt-worktree.log | git -C tui status --porcelain --untracked-files=all | 19:32  2 users, load averages: 1.90 1.77 1.94 | — | 0 | fd5ea3ebb46f080f4c431a90ef5b832b39aa9b6c7893427f9ca53ddd5f12dc08 |
| 523-read-pty-echo-addendum.log | cat prompt/DEC-20261123-01-addendum-2-pty-echo.md | 21:33  2 users, load averages: 2.40 2.57 2.55 | — | 0 | 9ba90939cc7a51f575c90996b9edb6ec808569a1a11713b84aa351fe17c05cda |
| 524-resume-prompt-digests.log | shasum -a 256 -c SHA256.txt | 21:34  2 users, load averages: 2.53 2.59 2.56 | — | 0 | aae4cbf2f26abdbae676cfd0f51a3c86f779885d347eb46646fec9286835d3d4 |
| 525-resume-prompt-list.log | ls prompt | 21:34  2 users, load averages: 2.53 2.59 2.56 | — | 0 | b0f26951748f424674e1bc8e13cbf1d8a5f9ef5808b184f907dcc53efe97cbf5 |
| 526-resume-governed-version.log | /Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version | 21:34  2 users, load averages: 2.45 2.57 2.55 | — | 0 | b1b01afc16459d31513974f5b86b13f905651b3a95039406ceded644b90e4b8f |
| 527-resume-branch.log | git -C tui branch --show-current | 21:34  2 users, load averages: 2.45 2.57 2.55 | — | 0 | b33b6293e1c60e6a88c669243e2fd1a550fee6e92db38082b6242d24b7f9da1e |
| 528-resume-head.log | git -C tui rev-parse HEAD | 21:34  2 users, load averages: 2.45 2.57 2.55 | — | 0 | d7144bca3b486239c2de299325740d2c410b9cfafbb573d7f5f87ed699a7c8a8 |
| 529-resume-paths.log | git -C tui status --porcelain --untracked-files=all | 21:34  2 users, load averages: 2.45 2.57 2.55 | — | 0 | bdd12a3aa9718a97eb28880593883ecdb90100373ec7beaf465f65f8edac15bc |
| 530-resume-working-digests.log | shasum -a 256 tui/apps/madbridge/src/tui/live/composition.ts tui/test/phase3b/composition.test.ts tui/test/phase3b/offline.ts tui/test/phase3b/scenarios.ts tui/test/phase3b/stand-in.ts | 21:34  2 users, load averages: 2.45 2.57 2.55 | — | 0 | 4213c5926d622714ed21ca337cdd7872f7af825bf47ef354b70b2be806ce9af4 |
| 531-resume-pr-dir.log | ls -A pr | 21:34  2 users, load averages: 2.45 2.57 2.55 | — | 0 | 9d68b37986954c06992811b538068f1700a0dfd13a8f02440f7a137c991118d3 |
| 532-resume-report-digests.log | shasum -a 256 pr/m1-halt-1-report.md pr/m1-halt-3-report.md | 21:34  2 users, load averages: 2.45 2.57 2.55 | — | 0 | abeab3c4983d06cb47b03fc4501b5508649205df437771017f2dfcabd039edcc |
| 533-resume-prompt-manifest.log | cat prompt/SHA256.txt | 21:34  2 users, load averages: 2.45 2.57 2.55 | — | 0 | f38a90b111b62e0c988cd425a1bcbfe78639ccba323dc550af2e23f8e87178f3 |
| 534-echo-terminal.log | cat tui/packages/pty-host/src/terminal.ts | 21:34  2 users, load averages: 2.42 2.56 2.55 | — | 0 | 520e275525a3e1ca651e13b2f654e5fe9abf52c3f5ff302853792e2f9da5aff0 |
| 535-echo-lifecycle.log | sed -n 250,345p tui/packages/pty-host/test/main-guard.test.ts | 21:34  2 users, load averages: 2.42 2.56 2.55 | — | 0 | 4fe0ad297df3688882571c1fb85651601b91b6022c5d1ef50f7eab28662233bb |
| 536-echo-test-files.log | rg --files tui/packages/pty-host/test | 21:34  2 users, load averages: 2.42 2.56 2.55 | — | 0 | 89fdd82b33c1b1e4ea1a187a3ec6d958415c8d1855d562507d80187ab597af24 |
| 537-echo-spike.log | sed -n 618,644p tui/test/phase3a/spike/bun-terminal-spike.ts | 21:34  2 users, load averages: 2.42 2.56 2.55 | — | 0 | 696c502918a18688601d76e32cc0bbcb10d0b0113001803571fbc32c2238a877 |
| 538-echo-scratch.log | ls /private/tmp/m1-r1-IH7Fxlbw | 21:34  2 users, load averages: 2.42 2.56 2.55 | — | 0 | eb1d0d12ef54556412d45df99011dea17fc18b82362832b2ae46ddc1b1c4d9d2 |
| 539-echo-test-runtime.log | cat logs/463-r7-runtime.log | 21:34  2 users, load averages: 2.42 2.56 2.55 | — | 0 | 3f3fbd7b3b6289edb45f800fb74fe1a16645e88896bb8c29ecaff4e41e3359ce |
| 540-pty-cleanup.log | rg -n -C4 'ptyClosed\|terminal\.close\(' tui/packages/pty-host/src/main.ts tui/packages/pty-host/src/signals.ts | 21:34  2 users, load averages: 2.09 2.49 2.52 | — | 0 | c2cdc811912436ed0a03fd4497750ee9ec0902ded6a9f657d37e2c0b91229244 |
| 541-build-helper.log | cat /private/tmp/m1-r1-IH7Fxlbw/wait.zsh /private/tmp/m1-r1-IH7Fxlbw/runtime.zsh | 21:34  2 users, load averages: 2.09 2.49 2.52 | — | 0 | 95b79c72f5429409996e20e211fb1b1a57dc73dd8af23b3647e0152bfa818025 |
| 542-phase3b-test-pattern.log | cat tui/test/phase3b/preflight-input.ts | 21:34  2 users, load averages: 2.09 2.49 2.52 | — | 0 | 27031ad92898182e20c3750b9ca10029c0956a870be1728b93782bdea0a770cd |
| 543-retained-choices.log | tail -70 tui/docs/verification/phase-3b-m1-build-log.md | 21:34  2 users, load averages: 2.09 2.49 2.52 | — | 0 | 7c02de329854bb20ec1c533558c4490d2f1bd277b220c16a06ee538dacb7aa39 |
| 544-diagnostic-requirement.log | cat prompt/DEC-20261123-01-addendum-1-environment-values-in-logs.md | 21:34  2 users, load averages: 2.00 2.45 2.51 | — | 0 | e2a08c8a51df8543005831752a5bc43cb152a381516f65f77d2d0699af733a78 |
| 545-existing-host-test-usage.log | sed -n 1,176p tui/packages/broker/test/pty-host-supervisor.test.ts | 21:34  2 users, load averages: 1.77 2.38 2.48 | — | 0 | ce244c74873862a86e6c8b26c16b6d6e37990f0de217035570d0b3272c42aa63 |
| 546-apply-authorized-echo.log | patch -p1 -d tui | 21:35  2 users, load averages: 1.49 2.27 2.44 | — | 0 | 4c219a3cc66a5d1601e6f4f7db6d08885d6840a3f1af355ffc0b87c9713524c9 |
| 547-verify-ready-write-protocol.log | rg -n -C3 'export function spawnPtyHost\|case "input"\|ofKind: "input"\|pty_read_error\|kind: "exited"' tui/packages/pty-host/src/main.ts tui/packages/broker/src/pty-host-supervisor.ts | 21:35  2 users, load averages: 1.75 2.27 2.43 | — | 0 | 9aa88c1243ae1ba0290f8edb34b26daabfcff800055c3139ab3455c9e5bce0d6 |
| 548-create-echo-test.log | tee tui/test/phase3b/pty-input-echo.test.ts | 21:35  2 users, load averages: 1.92 2.29 2.44 | — | 0 | daa6d83d6b96c3e4980df7e8921024dcfa1e9a1019635c59fd7b6df6af2aedd4 |
| 549-echo-runtime.log | runtime_check | 21:47  up 2 days, 13:15, 2 users, load averages: 3.01 6.82 5.77 | Tue Nov 24 02:47:30 UTC 2026 / Tue Nov 24 02:47:30 UTC 2026 | 0 | 7a41f31b4cd7946cb9c250fa18c405e490ea7032eae27c1b24c422f8d104b8f8 |
| 550-confirm-addendum-diff.log | git -C tui diff -- packages/pty-host/src/terminal.ts packages/pty-host/test/main-guard.test.ts | 21:47  2 users, load averages: 3.09 6.78 5.76 | — | 0 | ebc957d1b7eb5e0deac07553c4ce59db08ab885a927bca00b1ab2f6ec03b9593 |
| 551-commit-check-rules.log | cat /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh | 21:47  2 users, load averages: 3.09 6.78 5.76 | — | 0 | a874d12d983c8a3bba70ae6c52e3cebf6d993f8b4867f2125db4a380bea5eb22 |
| 552-current-record-helpers.log | cat /private/tmp/m1-r1-IH7Fxlbw/logbook.py | 21:47  2 users, load averages: 3.09 6.78 5.76 | — | 0 | 7003e865f148f4637fd9bca88bd2fe201111d053bc85d3d342133ed386fc3085 |
| 553-pty-echo-load.log | zsh /private/tmp/m1-r1-IH7Fxlbw/wait.zsh | 21:47  2 users, load averages: 3.08 6.65 5.73 to 22:07  2 users, load averages: 20.98 8.52 6.99 | — | 75 | 0cdcae13edd3e98c06a346fe577a6ae2798b6232892ef8b9db439f20f1edaf2e |
| 554-draft-echo-message.log | tee /private/tmp/m1-r1-IH7Fxlbw/message-pty-echo.txt | 21:47  2 users, load averages: 3.22 6.56 5.71 | — | 0 | e5b0bf24ed5089f6a0bb53581c38c15bcf79fef8582649fde5d575b4493809c9 |
| 555-verify-echo-message.log | zsh /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh /private/tmp/m1-r1-IH7Fxlbw/message-pty-echo.txt | 21:48  2 users, load averages: 3.10 6.37 5.65 | — | 0 | 57039679f67d7678b59ee018bd9507101bbf25986f06e2a5ec65c0e12faef014 |
| 556-read-task-detail.log | rg -n -A28 '^## Task detail' tui/docs/verification/phase-3b-m1-build-log.md | 21:51  2 users, load averages: 4.58 5.57 5.44 | — | 0 | dfdf7e15fd2af7cf1c1e9337c5305080a86e2075698c0fa6953e749f7f70e3ad |
| 557-read-standing-rules.log | cat tui/docs/decisions/DEC-20261023-01-standing-build-rules.md | 21:51  2 users, load averages: 4.58 5.57 5.44 | — | 0 | 1194f3cd9bea9601c5ef194eec19dd3ddda620a16da69995f0b2af940fad6551 |
| 558-read-attribution-usage.log | rg -n -C2 'usage\|prbody\|commit-list\|BASE_SHA\|HEAD_SHA' tui/.github/scripts/attribution-shape-check.sh | 21:51  2 users, load averages: 4.58 5.57 5.44 | — | 0 | 13bdd078374c3d5ff490d5dd407ab12c93bb1b7ed848223a3514cb8e9e7706ed |
| 559-pty-echo-load-repeat.log | zsh /private/tmp/m1-r1-IH7Fxlbw/wait.zsh | 22:35  2 users, load averages: 7.55 5.07 6.01 to 22:39  2 users, load averages: 1.63 3.47 5.06 | — | 0 | 9aeff7740ec51b2c4a2b786d561844474343cb6ea22bfef4e42e153141c578bb |
| 560-pty-env.log | bun test packages/pty-host/test/environment.test.ts | 22:40  up 2 days, 14:08, 2 users, load averages: 1.41 3.04 4.78 | Tue Nov 24 03:40:44 UTC 2026 / Tue Nov 24 03:40:44 UTC 2026 | 0 | a0e39e78e22a1c3e16ece57c2ce6dfe8c5d55d855c909715d51d4c0a6a2079a9 |
| 561-early-fire-load.log | zsh /private/tmp/m1-r1-IH7Fxlbw/wait.zsh | 22:41  2 users, load averages: 1.29 2.87 4.67 to 22:41  2 users, load averages: 1.29 2.87 4.67 | — | 0 | eea250e8472385b4c86fc80fe4eebe1666fdd214e78d760b667023e2436b8b79 |
| 562-early-fire.log | bun test packages/pty-host/test/eof-timer-early-fire.test.ts | 22:41  up 2 days, 14:08, 2 users, load averages: 1.29 2.87 4.67 | Tue Nov 24 03:41:12 UTC 2026 / Tue Nov 24 03:41:17 UTC 2026 | 0 | aec01a413cc9d8378cd329f7844575bbd22bb4930a0244b247f2366b04cccd7d |
| 563-eof-timer-load.log | zsh /private/tmp/m1-r1-IH7Fxlbw/wait.zsh | 22:41  2 users, load averages: 1.40 2.84 4.64 to 22:41  2 users, load averages: 1.40 2.84 4.64 | — | 0 | f98dd75da6ce2394cac7688df7d11205878a1eadb0bc959e45b0f4ae60d5e46c |
| 564-eof-timer.log | bun test packages/pty-host/test/eof-timer.test.ts | 22:41  up 2 days, 14:08, 2 users, load averages: 1.45 2.83 4.62 | Tue Nov 24 03:41:24 UTC 2026 / Tue Nov 24 03:41:35 UTC 2026 | 0 | 5223473c491905999234f91edfbc6f72f04880b9475fa61ae4260fa82f5d7168 |
| 565-frames-load.log | zsh /private/tmp/m1-r1-IH7Fxlbw/wait.zsh | 22:41  2 users, load averages: 1.68 2.83 4.60 to 22:41  2 users, load averages: 1.68 2.83 4.60 | — | 0 | 9329383637c8ebdef5666a5c55d26a9d4906a90926e0f40c8c13749471b5b441 |
| 566-frames.log | bun test packages/pty-host/test/frames.test.ts | 22:41  up 2 days, 14:09, 2 users, load averages: 1.68 2.83 4.60 | Tue Nov 24 03:41:37 UTC 2026 / Tue Nov 24 03:41:37 UTC 2026 | 0 | fb88559e3a2a7bbd87d6d8285d8442350572333d9ea2d60eade2d43d2b5d6b28 |
| 567-pty-launch-load.log | zsh /private/tmp/m1-r1-IH7Fxlbw/wait.zsh | 22:41  2 users, load averages: 1.68 2.83 4.60 to 22:41  2 users, load averages: 1.68 2.83 4.60 | — | 0 | 9329383637c8ebdef5666a5c55d26a9d4906a90926e0f40c8c13749471b5b441 |
| 568-pty-launch.log | bun test packages/pty-host/test/launch.test.ts | 22:41  up 2 days, 14:09, 2 users, load averages: 2.19 2.92 4.62 | Tue Nov 24 03:41:38 UTC 2026 / Tue Nov 24 03:41:38 UTC 2026 | 0 | 8284084ff3532985e807e8c33e02f7ed5499e6129b994ffbcab18751941fef82 |
| 569-main-guard-load.log | zsh /private/tmp/m1-r1-IH7Fxlbw/wait.zsh | 22:41  2 users, load averages: 2.19 2.92 4.62 to 22:42  2 users, load averages: 1.83 2.75 4.50 | — | 0 | d115d6f3a58e837180767319e12ed69249753b9a7572b28c4c4edc5ec5b6baaf |
| 570-main-guard.log | bun test packages/pty-host/test/main-guard.test.ts | 22:42  up 2 days, 14:09, 2 users, load averages: 1.77 2.72 4.48 | Tue Nov 24 03:42:16 UTC 2026 / Tue Nov 24 03:42:29 UTC 2026 | 0 | 0480717c5838c5c0ab7e2878faa1fcd11e96dc9a2e279c5cc43034265f4e2c4d |
| 571-signals-load.log | zsh /private/tmp/m1-r1-IH7Fxlbw/wait.zsh | 22:42  2 users, load averages: 2.11 2.75 4.46 to 22:42  2 users, load averages: 1.96 2.65 4.36 | — | 0 | 6844b31a0626424363ac1d5c2e0f3a556c92cb6871d6f96fa7868f08ea6b1ecb |
| 572-signals.log | bun test packages/pty-host/test/signals.test.ts | 22:46  up 2 days, 14:13, 2 users, load averages: 2.12 2.25 3.83 | Tue Nov 24 03:46:14 UTC 2026 / Tue Nov 24 03:46:16 UTC 2026 | 0 | c50980638dc393ead328b5ef57bdce4662d33a25491684052feff468b00d6f0b |
| 573-broker-host-load.log | zsh /private/tmp/m1-r1-IH7Fxlbw/wait.zsh | 22:46  2 users, load averages: 2.19 2.26 3.83 to 22:47  2 users, load averages: 1.76 2.12 3.67 | — | 0 | 1bf2b01b0f8922d312722c102c56391ee1ebd059060007d90661cd041125b21e |
| 574-broker-host.log | bun test packages/broker/test/pty-host-supervisor.test.ts | 22:49  up 2 days, 14:16, 2 users, load averages: 1.78 2.07 3.44 | Tue Nov 24 03:49:18 UTC 2026 / Tue Nov 24 03:49:31 UTC 2026 | 0 | 7630a8d2f96c042d9cdf4af965d64950f329acced5a24178d7bf5a20444c1a23 |
| 575-unread-input-load.log | zsh /private/tmp/m1-r1-IH7Fxlbw/wait.zsh | 22:49  2 users, load averages: 1.81 2.07 3.43 to 22:49  2 users, load averages: 1.81 2.07 3.43 | — | 0 | 8cfb2e22afba11c758ba0ce9c8409b7f6ebf99cd31ba344b0313da4bfee740cf |
| 576-unread-input.log | bun test test/phase3b/pty-input-echo.test.ts | 22:49  up 2 days, 14:17, 2 users, load averages: 1.74 2.05 3.41 | Tue Nov 24 03:49:33 UTC 2026 / Tue Nov 24 03:49:36 UTC 2026 | 1 | 9ef1996cadda37bda741e0f1b51da1776668dd2e55155f4a8d331b6f1b2cdf61 |
| 577-echo-shutdown.log | sed -n '422,463p;601,676p' tui/packages/pty-host/src/main.ts | 22:49  2 users, load averages: 1.73 2.03 3.38 | — | 0 | 132cb31ae93153045d8188260bb8d69572aac955675fc75950d2a4740d6bd928 |
| 578-read-echo-test.log | cat tui/test/phase3b/pty-input-echo.test.ts | 22:49  2 users, load averages: 1.73 2.03 3.38 | — | 0 | 31c281fc25945077f6fa550081c67d520fba5786d06a4f00e1f4b20d268437b2 |
| 579-echo-test-shutdown.log | patch -p1 -d tui | 22:50  2 users, load averages: 1.61 1.99 3.35 | — | 0 | 0bddee906313667b5bf8660097227b6fbfca479b2cedb8019d8f1e7343c86a53 |
| 580-echo-retest-load.log | zsh /private/tmp/m1-r1-IH7Fxlbw/wait.zsh | 22:50  2 users, load averages: 1.48 1.96 3.33 to 22:50  2 users, load averages: 1.48 1.96 3.33 | — | 0 | 6473fa780e3d3a917ea7f0ce4326bd0b41582eb33883e883a8c5975dc02ee958 |
| 581-echo-retest.log | bun test test/phase3b/pty-input-echo.test.ts | 22:50  up 2 days, 14:17, 2 users, load averages: 1.41 1.93 3.31 | Tue Nov 24 03:50:12 UTC 2026 / Tue Nov 24 03:50:12 UTC 2026 | 0 | d5a6ed5fc0e4558c20313d26fdc643394604051cf990afde95de3b3d59d2fe15 |
| 582-stage-host-echo.log | git add -- packages/pty-host/src/terminal.ts packages/pty-host/test/main-guard.test.ts test/phase3b/pty-input-echo.test.ts | 22:50  2 users, load averages: 1.41 1.93 3.31 | — | 0 | b42d3ded8149eaf7a78e31d5c8314ddd519424001ee76314f284681f7286c5bc |
| 583-staged-host-paths.log | git -C tui diff --cached --name-only | 22:50  2 users, load averages: 1.46 1.93 3.30 | — | 0 | 18e4130e122341acb86cb542c4fe0aa3f1af20fea46a72bb2cf5e6441cbdcce9 |
| 584-staged-host-check.log | git -C tui diff --cached --check | 22:50  2 users, load averages: 1.46 1.93 3.30 | — | 0 | ef1307ddf02425540f07e6831c1b7fa328dc400f72e2361605baf94c4c965dae |
| 585-commit-host-echo.log | git commit -F /private/tmp/m1-r1-IH7Fxlbw/message-pty-echo.txt | 22:50  2 users, load averages: 1.58 1.95 3.30 | — | 0 | b92ff406040eace0865993430c27843efd101f635a545b0a5cbc6ac3cee63c14 |
| 586-check-host-commit.log | git -C tui log -1 '--format=%H %P %s' | 22:50  2 users, load averages: 1.80 1.98 3.29 | — | 0 | b274ab1f6daa71a8abc0b9cdecef3df77df3df3e3c0602d0563ddd077431b579 |
| 587-host-commit-worktree.log | git -C tui status --porcelain --untracked-files=all | 22:50  2 users, load averages: 1.80 1.98 3.29 | — | 0 | aff9da51bd38cfa497dfdf4185605b228c1433627a2a836e8cf4d9d1750bf3b7 |
| 588-host-commit-r7-digests.log | shasum -a 256 tui/apps/madbridge/src/tui/live/composition.ts tui/test/phase3b/composition.test.ts tui/test/phase3b/offline.ts tui/test/phase3b/scenarios.ts tui/test/phase3b/stand-in.ts | 22:50  2 users, load averages: 1.80 1.98 3.29 | — | 0 | 28fb4ac5433b5305fbbe9790aba18141b477dac10e58141a6dca2fb725a2dd99 |
| 589-break-helper-usage.log | cat /private/tmp/m1-r1-IH7Fxlbw/break.py | 22:50  2 users, load averages: 1.80 1.98 3.29 | — | 0 | 2d05ca126992c785fc602472168b9cf738d937cc56f0e2133c90fbb6c36822a5 |
| 590-preserve-patch-backup.log | move_own_patch_backup | 22:50  2 users, load averages: 1.83 1.98 3.28 | — | 0 | 0f9d207390d9e760f5e42a58b0ac900b588118462c4b94afd6b39bd043c5ceac |
| 591-verified-postcommit-state.log | verify_r7 | 22:50  2 users, load averages: 1.92 2.00 3.27 | — | 0 | 729ab18c5e9a2bdf77db95e6167e1c7dabd04876f12a2ed57fecf18e97181524 |
| 592-break-host-echo.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/pty-host/src/terminal.ts '  terminal.localFlags &= ~8; // ECHO on macOS and Linux. | 22:50  2 users, load averages: 2.01 2.01 3.27 | — | 0 | 86dbbf0378489464a0a40c295ff82b3b2830c5b2f986453cc05b19bdab6c7824 |
| 593-break-host-echo-diff.log | git -C tui diff -- packages/pty-host/src/terminal.ts | 22:50  2 users, load averages: 2.01 2.01 3.27 | — | 0 | 1b50eb9e18ff7b1668dc4e62e46b2cdaeaefe30d68eb3d3eb82f46956054ffb6 |
| 594-break-host-echo-runtime.log | runtime_check | 22:54  up 2 days, 14:22, 2 users, load averages: 2.03 2.16 3.04 | Tue Nov 24 03:54:50 UTC 2026 / Tue Nov 24 03:54:51 UTC 2026 | 0 | a791741dca6d4374a20ad4b2e5bb9382f37b37e399d2aeda818837eaa9c528c0 |
| 595-break-unread-load.log | zsh /private/tmp/m1-r1-IH7Fxlbw/wait.zsh | 22:55  2 users, load averages: 2.24 2.20 3.03 to 22:55  2 users, load averages: 1.97 2.15 2.98 | — | 0 | 74bccad3a2edbcdd968c19ca882515f15a5058cdfd916cbc7ed3b7d885c69d25 |
| 596-break-unread-test.log | bun test test/phase3b/pty-input-echo.test.ts | 22:56  up 2 days, 14:23, 2 users, load averages: 1.64 2.05 2.92 | Tue Nov 24 03:56:15 UTC 2026 / Tue Nov 24 03:56:16 UTC 2026 | 1 | a8c09d6fcb4d2bcf50a4a5dab607dd071278b7042dcb3e79a10ec3617ad3fae6 |
| 597-break-lifecycle-load.log | zsh /private/tmp/m1-r1-IH7Fxlbw/wait.zsh | 22:56  2 users, load averages: 1.64 2.05 2.92 to 22:56  2 users, load averages: 1.64 2.05 2.92 | — | 0 | 99abaf09dcceceb3841af56c033b72d08ebccef0e5c292aa055787140aa1dae9 |
| 598-break-lifecycle-test.log | bun test packages/pty-host/test/main-guard.test.ts | 22:56  up 2 days, 14:23, 2 users, load averages: 1.91 2.10 2.93 | Tue Nov 24 03:56:19 UTC 2026 / Tue Nov 24 03:56:32 UTC 2026 | 1 | f6b0343ad407b5b91467f653197b7e64b339d5ab0679f1bcebbaebbf09d7328b |
| 599-stand-in-design.log | cat tui/test/phase3b/scenarios.ts tui/test/phase3b/stand-in.ts | 22:54  2 users, load averages: 2.35 2.22 3.06 | — | 0 | f44cef12b39a34a8fd3a4dc35a0a68159b8327b4c1b7dcd9c924db7e7af5cc83 |
| 600-r7-design-and-breaks.log | sed -n 726,760p tui/docs/verification/phase-3b-m1-build-log.md | 22:54  2 users, load averages: 2.35 2.22 3.06 | — | 0 | e331d6b0a48c27d69749e38cec4775a16c384c8c9e3b17ec0e02f6cfb5818f14 |
| 601-tests-r7.log | cat tui/test/phase3b/composition.test.ts | 22:54  2 users, load averages: 2.35 2.22 3.06 | — | 0 | beb495e67b15f2c664290e44d014b291a2ecda11bb29fcc7562d69988fa72300 |
| 602-restore-host-echo.log | git checkout -- packages/pty-host/src/terminal.ts | 22:56  2 users, load averages: 2.02 2.11 2.92 | — | 0 | 876650aba7409598f9ccbfc41c1b8e358e74d1ddfb9fac43e212e574249a3e95 |
| 603-verify-host-restore.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/pty-host/src/terminal.ts | 22:56  2 users, load averages: 2.02 2.11 2.92 | — | 0 | 92154a009171bc6b9883b8a78aff1e3937c9328047227ee4fa8b112aef7ac7e4 |
| 604-remove-stand-in-echo-workaround.log | python3 - | 22:56  2 users, load averages: 1.79 2.06 2.88 | — | 0 | 0b21626205acbbe9cac850d9de1fa4b4b719f26c3458b9b9a1ceff1aa0122e71 |
| 605-r7-resume-runtime.log | runtime_check | 22:57  up 2 days, 14:24, 2 users, load averages: 1.53 1.99 2.84 | Tue Nov 24 03:57:06 UTC 2026 / Tue Nov 24 03:57:07 UTC 2026 | 0 | 415f0c372eebfec68ae72efa41b778ad115b06416f8610ab5c858bba0b774d26 |
| 606-r7-composition-load.log | zsh /private/tmp/m1-r1-IH7Fxlbw/wait.zsh | 22:57  2 users, load averages: 1.55 1.97 2.82 to 22:57  2 users, load averages: 1.55 1.97 2.82 | — | 0 | 2f5036246ef1e0fecf60fc774685d6c66cf606e1b18c9f590cf58403d8e35d33 |
| 607-r7-composition.log | bun test test/phase3b/composition.test.ts | 22:57  up 2 days, 14:24, 2 users, load averages: 1.55 1.97 2.82 | Tue Nov 24 03:57:22 UTC 2026 / Tue Nov 24 03:57:26 UTC 2026 | 0 | 2b30b07050c37d2552471daed9506dcd87f66affa53c14d0568911a7f32dde0f |
| 608-claude-echo-load.log | zsh /private/tmp/m1-r1-IH7Fxlbw/wait.zsh | 22:57  2 users, load averages: 1.51 1.96 2.81 to 22:57  2 users, load averages: 1.51 1.96 2.81 | — | 0 | 89acf24c7fb77051c36e820243b7e2adf8f4e521b134b1d7c62a28f5ce990aa6 |
| 609-claude-echo.log | bun test packages/adapter-claude-code/test/live.test.ts | 22:57  up 2 days, 14:25, 2 users, load averages: 1.71 1.99 2.82 | Tue Nov 24 03:57:32 UTC 2026 / Tue Nov 24 03:58:02 UTC 2026 | 0 | 5c45b93517cc2f024b0eb1152d3088c1f8abfd6b1935d73347716c3758974454 |
| 610-madv-echo-load.log | zsh /private/tmp/m1-r1-IH7Fxlbw/wait.zsh | 22:58  2 users, load averages: 2.03 2.04 2.81 to 23:06  2 users, load averages: 1.83 3.08 3.19 | — | 0 | 0c0e972bb1d4d2e4dfa38eb2ccef2a7ebdae6a2f613aaf331bb4614025d66096 |
| 611-madv-echo.log | bun test packages/adapter-madv-surface/test/live.test.ts | 5:11  up 2 days, 20:39, 2 users, load averages: 4.17 2.46 1.95 | Tue Nov 24 10:11:48 UTC 2026 / Tue Nov 24 10:12:18 UTC 2026 | 0 | e337dda5d836a5970bf159b5ae94c2653254bc17079391326a51b08bd4b12851 |
| 612-r7-break-sites.log | rg -n -C3 'monitorFailure\|interrupt\(\|reportFailure\|monitorFailed\|\.abort\(' tui/packages/supervisor/src/build.ts | 22:58  2 users, load averages: 2.35 2.15 2.81 | — | 0 | 9ead8c465cbd3ce49e45b2c968d8655f50a6e55c061374463f6af23ad4a445eb |
| 613-r7-commit-message.log | cat /private/tmp/m1-r1-IH7Fxlbw/r7-message.txt | 22:58  2 users, load averages: 2.35 2.15 2.81 | — | 0 | c8e1ea6ed0c074f8ee099c70c263496baeac919eb01ef11bfd7cb804502853d3 |
| 614-echo-cases.log | rg -n -i -C2 'echo\|type: "user"' tui/packages/adapter-claude-code/test/live.test.ts tui/packages/adapter-madv-surface/test/live.test.ts | 22:58  2 users, load averages: 2.35 2.15 2.81 | — | 0 | 67a02b2aaafc4207dc2bdf4724503bd3aeeb1d7bbe0d28e4b88732c3ce82e654 |
| 615-r7-file-list.log | git -C tui status --porcelain --untracked-files=all | 22:58  2 users, load averages: 2.35 2.15 2.81 | — | 0 | c29d1e617e192b0f790e2385d708b77046686c376f7f1b217950265acaec3fcf |
| 616-check-madv-echo-input.log | cat tui/packages/adapter-madv-surface/test/live.test.ts | 22:58  2 users, load averages: 2.35 2.15 2.81 | — | 0 | e667c8cc7b54978ad318e79a357519100da2da655315f8a59a2db0e0dc5445f7 |
| 617-r7-settings-output.log | cat tui/apps/madbridge/src/tui/live/settings-sources.ts tui/apps/madbridge/src/tui/live/composition.ts | 22:58  2 users, load averages: 2.62 2.22 2.83 | — | 0 | 5d8470d068a9c16e69c210587d5489717a0f1145107ea870ced51ce794d4628a |
| 618-r7-barrier-definition.log | rg -n -C2 'health barrier\|Health barrier\|barrier' tui/docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md tui/docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md | 22:59  2 users, load averages: 2.27 2.16 2.80 | — | 0 | f0ba4e086e27c9b5f11083e6dff6060425739a07459763dd10aff60b02725b25 |
| 619-build-barrier.log | rg -n 'barrier\|BUILD_STEPS\|case "activate"\|failedStep' tui/packages/supervisor/src/build.ts | 22:59  2 users, load averages: 2.27 2.16 2.80 | — | 0 | cf63fb8a3129bf013ce1eb02f7ebceee658518e4e35d627211a7a35336b8d3e0 |
| 620-settings-proofs.log | rg -n 'settingsSources\|settings\.json\|managed-settings\.json' tui/test/phase3b/settings-sources.test.ts | 22:59  2 users, load averages: 2.27 2.16 2.80 | — | 0 | a64f6db571e9f590bfa13679d4fec852b6cea9f235c3292e2193d7bdeea8b11c |
| 621-health-contract.log | cat logs/071-barrier.log | 22:59  2 users, load averages: 2.24 2.16 2.79 | — | 0 | 8715006315729aee55165b48af39a21f3e0d5e9f3e7ba11b385ef9feac6401c6 |
| 622-cover-all-settings-through-composition.log | python3 - | 22:59  2 users, load averages: 2.40 2.19 2.79 | — | 0 | 665bf87a7a46e0d6989297e363cd8f3c8534366325fff32b9e8ad57292a0f34e |
| 623-advisory-requirements.log | sed -n 157,165p tui/docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md | 23:00  2 users, load averages: 2.27 2.21 2.75 | — | 0 | c276ba6433c5edceee275af585f7dd9fa94bae89fb08df4a94b5e273dd8697f5 |
| 624-allowlist-test.log | cat tui/packages/supervisor/test/madv-allowlist.test.ts | 23:00  2 users, load averages: 2.27 2.21 2.75 | — | 0 | 098da1dd4b1fdef62c8bb2fae3d505ce5bc1676d4f16f3349c43ed7a5589b958 |
| 625-adapter-parser-contract.log | rg -n -C6 'response_id\|domain_unresolved\|model_refused' tui/packages/adapter-madv-surface/src/index.ts | 23:00  2 users, load averages: 2.27 2.21 2.75 | — | 0 | 9c6f4933d1998d80717ac226492d99b580914330778127619b3b6328b270b388 |
| 626-legacy-port-test.log | sed -n 590,657p tui/packages/supervisor/test/build-rollback.test.ts | 23:00  2 users, load averages: 2.27 2.21 2.75 | — | 0 | ef61c18baa241f93363cfb03508be7bd86d0507c92e4e13cc1bf5d54d09ff0d4 |
| 627-allowlist-descriptor.log | rg -n -C9 MINIMAX_API_KEY tui/packages/supervisor/src/environment.ts | 23:00  2 users, load averages: 2.27 2.21 2.75 | — | 0 | 1c31e0e62db140a6767ec82d272de9e817705914caef6e6661cce5952cce1a0d |
| 628-allowlist-access.log | cat tui/packages/supervisor/src/environment.ts | 23:01  2 users, load averages: 2.04 2.16 2.72 | — | 0 | b2f15176c12bafd2799b7dcb0073d1b6b73df6f708c72c0e06a639ca4d43d001 |
| 629-write-suite-comparison.log | tee /private/tmp/m1-r1-IH7Fxlbw/compare-suites.py | 23:03  2 users, load averages: 3.70 3.99 3.48 | — | 0 | 3afd303e20a068339ae3103279c513f9d3613668fadbab3987f997aeef7bff6f |
| 630-r7-commit-width-and-attribution.log | zsh /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh /private/tmp/m1-r1-IH7Fxlbw/r7-message.txt | 23:03  2 users, load averages: 3.56 3.96 3.47 | — | 0 | 545f2d98710625e50fb803f7eb55a495ccab4a5e6c2daa5cd94c76299b247f45 |
| 631-settings-composition-load.log | wait_for_load | 7:14  up 2 days, 22:41, 2 users, load averages: 1.60 1.55 1.56 to 7:14  up 2 days, 22:41, 2 users, load averages: 1.60 1.55 1.56 | — | 0 | da82fd84eca6184074072b478fc65775d8326115503ee09f25ca37ae0129eb4b |
| 632-settings-composition.log | bun test test/phase3b/composition.test.ts | 7:14  up 2 days, 22:41, 2 users, load averages: 1.60 1.55 1.56 | Tue Nov 24 12:14:18 UTC 2026 / Tue Nov 24 12:14:23 UTC 2026 | 0 | a83c78d5018f76c36133fcd902f3c8a6a0971fb484887c28b8adb3e937e313dd |
| 633-r7-types.log | bunx tsc --noEmit | 7:16  up 2 days, 22:43, 2 users, load averages: 3.57 2.29 1.84 | Tue Nov 24 12:16:03 UTC 2026 / Tue Nov 24 12:16:06 UTC 2026 | 0 | f2b960828e55eae44b9ed798f6fc5c55d83ee4278d58e1671145b747814516c2 |
| 634-review-evidence-records.log | sed -n 136,150p tui/docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md | 7:14  2 users, load averages: 1.44 1.52 1.55 | — | 0 | 9e36a13ded53086d469faded6a25d99ce0d0bd077fcb2263923587d0146bf3e2 |
| 635-stage-r7.log | git add -- apps/madbridge/src/tui/live/composition.ts test/phase3b/composition.test.ts test/phase3b/offline.ts test/phase3b/scenarios.ts test/phase3b/stand-in.ts | 7:16  2 users, load averages: 3.32 2.28 1.84 | — | 0 | bc70e6603f249cde59c6ca80db127d11edab9ace3d66c86e56548513ece943dd |
| 636-r7-staged-check.log | git diff --cached --check | 7:16  2 users, load averages: 3.32 2.28 1.84 | — | 0 | f5c83aa0040950112cd64e66e963905026d3cfc5b2460f597b9b5407853240fe |
| 637-r7-staged-paths.log | git diff --cached --name-only | 7:16  2 users, load averages: 3.32 2.28 1.84 | — | 0 | e15592edea4d0934a859f6668172417865577dfc410b487607329dd42b8c6719 |
| 638-commit-r7.log | git commit -F /private/tmp/m1-r1-IH7Fxlbw/r7-message.txt | 7:16  2 users, load averages: 3.14 2.26 1.84 | — | 0 | f8322987830405ed6436d7a73752579627af17269fb36e2c5dd2a3bad5d78063 |
| 639-r7-identity.log | git log -1 '--format=%H %P %s' | 7:16  2 users, load averages: 3.14 2.26 1.84 | — | 0 | e8cabe695c0fcabfa02db4c4c1daa6d89f75fcdbda3bed548b7580999b3df114 |
| 640-break-present.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py apps/madbridge/src/tui/live/composition.ts 'await start.present(built.state.client);' 'void built.state.client;' | 7:16  2 users, load averages: 2.99 2.32 1.88 | — | 0 | dc04d66795d4a22cf78032641e08f0b15b26383a6199d755a0d16abdba64bd1d |
| 641-break-present-diff.log | git -C tui diff -- apps/madbridge/src/tui/live/composition.ts | 7:16  2 users, load averages: 2.99 2.32 1.88 | — | 0 | 59a240015c36d2888c32f7aba49b5beb56bfbf4e721fe60b3f66b4b668d1da16 |
| 642-break-present-runtime.log | runtime_check | 7:17  up 2 days, 22:44, 2 users, load averages: 2.82 2.33 1.89 | Tue Nov 24 12:17:18 UTC 2026 / Tue Nov 24 12:17:19 UTC 2026 | 0 | 71b38a967e9c451cd48ff27ec7d6e0b01e1a0e647b1018ce45f95c323345cd94 |
| 643-break-present-load.log | wait_for_load | 7:26  up 2 days, 22:54, 2 users, load averages: 1.90 1.94 1.89 to 7:26  up 2 days, 22:54, 2 users, load averages: 1.90 1.94 1.89 | — | 0 | 1a6db43d2736bb3c0d7c4fc8ee0041e112fe13a12e5f2a18c7d30e7cb8d9aa83 |
| 644-break-present-test.log | bun test test/phase3b/composition.test.ts | 7:26  up 2 days, 22:54, 2 users, load averages: 1.90 1.94 1.89 | Tue Nov 24 12:26:43 UTC 2026 / Tue Nov 24 12:26:46 UTC 2026 | 1 | e22b162aeb89eacccd8e473de4c183b00a243c139240f8b34c9e5ac89a92a25f |
| 645-restore-present.log | git checkout -- apps/madbridge/src/tui/live/composition.ts | 7:26  2 users, load averages: 2.07 1.98 1.90 | — | 0 | aa9db3a669a909ecff667950ac518abe6649ab59836769f47b00ea8cf6cb26fd |
| 646-verify-present.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py apps/madbridge/src/tui/live/composition.ts | 7:26  2 users, load averages: 2.07 1.98 1.90 | — | 0 | fd7cd45cd86700f3921d72cd713fdd99dee400f38cc837f9484bf0ab877f3d50 |
| 647-break-barrier.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py apps/madbridge/src/tui/live/composition.ts 'return failed(built.failedStep, built.detail);' 'if (built.failedStep === "storage") return { exitCode: 0, close: async () => {} }; | 7:26  2 users, load averages: 2.07 1.98 1.90 | — | 0 | b15c4248e6b5a65033dfed6b95161687dcfe52680aecc9208b38c5d6940f493f |
| 648-break-barrier-diff.log | git -C tui diff -- apps/madbridge/src/tui/live/composition.ts | 7:26  2 users, load averages: 2.07 1.98 1.90 | — | 0 | 6e31e3182452db33748db46f0e4ee7501d3946ce673c82001ff544235dc2c435 |
| 649-break-barrier-runtime.log | runtime_check | 7:27  up 2 days, 22:55, 2 users, load averages: 1.68 1.89 1.87 | Tue Nov 24 12:27:28 UTC 2026 / Tue Nov 24 12:27:28 UTC 2026 | 0 | 872a613a1e82fa40148170fce37daead1e4fcab7d08c32dc732ddd0f6053c3e3 |
| 650-break-barrier-load.log | wait_for_load | 7:27  up 2 days, 22:55, 2 users, load averages: 1.68 1.89 1.87 to 7:27  up 2 days, 22:55, 2 users, load averages: 1.68 1.89 1.87 | — | 0 | d2e819209963d0e9a05075109ed1c7206b72828f56f9fcc60f8740dc21ec7e58 |
| 651-break-barrier-test.log | bun test test/phase3b/composition.test.ts | 7:27  up 2 days, 22:55, 2 users, load averages: 2.02 1.95 1.89 | Tue Nov 24 12:27:30 UTC 2026 / Tue Nov 24 12:27:33 UTC 2026 | 1 | 4a7e1f348349e3c385c999c32542cbb9ff9c24ba9b50ce7e84233a3de252b7dd |
| 652-restore-barrier.log | git checkout -- apps/madbridge/src/tui/live/composition.ts | 7:27  2 users, load averages: 2.02 1.95 1.89 | — | 0 | 4ea8ccac4123da4c8ad218f7cb10fcb078ff8f4ecfca5674ba419d15d1c1b29f |
| 653-verify-barrier.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py apps/madbridge/src/tui/live/composition.ts | 7:27  2 users, load averages: 2.02 1.95 1.89 | — | 0 | dad090b09fccbd790bb554354fce199086836bbc94310a7abb45e7d4c0972832 |
| 654-break-budget.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py apps/madbridge/src/tui/live/composition.ts 'if (calls >= 3) return false;' 'if (calls >= 4) return false;' | 7:27  2 users, load averages: 2.02 1.95 1.89 | — | 0 | db9031b6d988b3a893ff1030a8c95490b8bce8404d8ce10b1a90f8f8329c524e |
| 655-break-budget-diff.log | git -C tui diff -- apps/madbridge/src/tui/live/composition.ts | 7:27  2 users, load averages: 2.02 1.95 1.89 | — | 0 | 66919ebafb10482dc3f68d9f720720a006ac9991b010b074dbda63a01b030b09 |
| 656-break-budget-runtime.log | runtime_check | 7:32  up 2 days, 23 hrs, 2 users, load averages: 2.55 2.62 2.23 | Tue Nov 24 12:32:38 UTC 2026 / Tue Nov 24 12:32:38 UTC 2026 | 0 | f6c129ccb78a3905e2f61b8b6f289a632c5caf693884752507578c87b5f74135 |
| 657-break-budget-load.log | wait_for_load | 7:33  up 2 days, 23 hrs, 2 users, load averages: 2.29 2.55 2.22 to 7:36  up 2 days, 23:04, 2 users, load averages: 1.97 2.94 2.53 | — | 0 | ae87398b33f3f6ea7edfc56f3119ace5cec922ceb25e7c4b283d513f8cfce641 |
| 658-break-budget-test.log | bun test test/phase3b/composition.test.ts | 7:36  up 2 days, 23:04, 2 users, load averages: 1.97 2.94 2.53 | Tue Nov 24 12:36:44 UTC 2026 / Tue Nov 24 12:36:47 UTC 2026 | 1 | 0249aa02ed6103f6d0649a00b44b1d1296a76f36132ddcddce380793e07898b6 |
| 659-restore-budget.log | git checkout -- apps/madbridge/src/tui/live/composition.ts | 7:36  2 users, load averages: 1.97 2.94 2.53 | — | 0 | dfeb584d6018d1d07f198510b6921f328de11d8c385fd17ed778b4d3af9e09d7 |
| 660-verify-budget.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py apps/madbridge/src/tui/live/composition.ts | 7:36  2 users, load averages: 1.97 2.94 2.53 | — | 0 | 79131a7c844dc310f454aa24ea277a3073aa10639b95db387cc94d3079d26c99 |
| 661-break-settings.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py apps/madbridge/src/tui/live/composition.ts 'settingsSources: sources.paths,' 'settingsSources: sources.paths.slice(0, 3),' | 7:36  2 users, load averages: 1.97 2.94 2.53 | — | 0 | eeaa670835c7f636184174f222f92ca753a20c287e69b6f7b5c573332acc0e0d |
| 662-break-settings-diff.log | git -C tui diff -- apps/madbridge/src/tui/live/composition.ts | 7:36  2 users, load averages: 2.13 2.96 2.54 | — | 0 | 04dfcaafa5cc879d9bfdd461132c5f6bf387647cec76bd9d13869a0cc911ea40 |
| 663-break-settings-runtime.log | runtime_check | 7:36  up 2 days, 23:04, 2 users, load averages: 2.13 2.96 2.54 | Tue Nov 24 12:36:50 UTC 2026 / Tue Nov 24 12:36:50 UTC 2026 | 0 | b6b0d0d43fa4e2c16129c70df9fd69e46e1b0379eaea28f9bf363bbf614a9931 |
| 664-break-settings-load.log | wait_for_load | 7:36  up 2 days, 23:04, 2 users, load averages: 2.12 2.94 2.53 to 7:37  up 2 days, 23:04, 2 users, load averages: 1.47 2.71 2.46 | — | 0 | 7d89c783a5ed7b49f2fa389e78e14c7edeca017a15b5019c452f9a7b5a5c878a |
| 665-break-settings-test.log | bun test test/phase3b/composition.test.ts | 7:37  up 2 days, 23:04, 2 users, load averages: 1.47 2.71 2.46 | Tue Nov 24 12:37:23 UTC 2026 / Tue Nov 24 12:37:27 UTC 2026 | 1 | 2f218b65355bf500f0f4ce2ba76dda9025b81e25cde4ad99ec6cdb936c6056dc |
| 666-restore-settings.log | git checkout -- apps/madbridge/src/tui/live/composition.ts | 7:37  2 users, load averages: 1.47 2.71 2.46 | — | 0 | 2db93711d2537c22eefde765777bf3651520f61f796b274688ad1a826a2cd43e |
| 667-verify-settings.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py apps/madbridge/src/tui/live/composition.ts | 7:37  2 users, load averages: 1.47 2.71 2.46 | — | 0 | 3da20117b9aa67b58d7298509ba1d8f81cdc90f140d29fccb9f5f5dd45382b13 |
| 668-break-cancel.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py apps/madbridge/src/tui/live/composition.ts 'caller.addEventListener("abort", abort, { once: true });' 'void caller;' | 7:37  2 users, load averages: 1.47 2.71 2.46 | — | 0 | 86a185e7d6d078660d95ef739792ef3914666d096365d37c9e040675829373db |
| 669-break-cancel-diff.log | git -C tui diff -- apps/madbridge/src/tui/live/composition.ts | 7:37  2 users, load averages: 1.47 2.71 2.46 | — | 0 | 596c3d306e7ac37cafd66c2378b48c1d213ed2f2d5ade7e880a6a8a5a275eabe |
| 670-break-cancel-runtime.log | runtime_check | 7:37  up 2 days, 23:05, 2 users, load averages: 1.50 2.59 2.43 | Tue Nov 24 12:37:56 UTC 2026 / Tue Nov 24 12:37:56 UTC 2026 | 0 | df51bfe1159080482b3a7e784e780f75da1f1fd5ad151b00b87b961289643af7 |
| 671-break-cancel-load.log | wait_for_load | 7:38  up 2 days, 23:05, 2 users, load averages: 1.38 2.55 2.41 to 7:38  up 2 days, 23:05, 2 users, load averages: 1.38 2.55 2.41 | — | 0 | 33d5e0ccbf195f2d8450630ac5fc56354d95008149825063023e11e702a10522 |
| 672-break-cancel-test.log | bun test test/phase3b/composition.test.ts | 7:38  up 2 days, 23:05, 2 users, load averages: 1.38 2.55 2.41 | Tue Nov 24 12:38:00 UTC 2026 / Tue Nov 24 12:38:34 UTC 2026 | 1 | d18cb55c49646d8f1ea4cbfdb65f03f297350140cec45e4fddb8bb02cda5d0cb |
| 673-restore-cancel.log | git checkout -- apps/madbridge/src/tui/live/composition.ts | 7:38  2 users, load averages: 1.94 2.55 2.42 | — | 0 | 04498f1d31f83ff2ce41830d8118dd5700010ad8874717e36ad7b9bd24e26314 |
| 674-verify-cancel.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py apps/madbridge/src/tui/live/composition.ts | 7:38  2 users, load averages: 1.94 2.55 2.42 | — | 0 | f063fe590fcc4d83b4aacf1497e82f6df77676e1d7c19b7ee74c6f3007522ba9 |
| 675-break-monitor.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/supervisor/src/build.ts 'if (phase === "active" \|\| phase === "paused") {' 'if (phase === "paused") {' | 7:38  2 users, load averages: 1.94 2.55 2.42 | — | 0 | 903a6cd1760938201e6fd9583f65526e1dcc120b19244c94bc9fb4d94c06fa45 |
| 676-break-monitor-diff.log | git -C tui diff -- packages/supervisor/src/build.ts | 7:38  2 users, load averages: 1.94 2.55 2.42 | — | 0 | 22651aa9a92176c911dff50f7f2c12d725801b531ab71a9dfcaf4b921d13794d |
| 677-break-monitor-runtime.log | runtime_check | 7:38  up 2 days, 23:06, 2 users, load averages: 1.94 2.55 2.42 | Tue Nov 24 12:38:36 UTC 2026 / Tue Nov 24 12:38:37 UTC 2026 | 0 | 89ae7c7aaa163657352fa52d429a5674b1f15700ca294041d7a20aeca5f8f80d |
| 678-break-monitor-load.log | wait_for_load | 7:38  up 2 days, 23:06, 2 users, load averages: 1.95 2.54 2.42 to 7:38  up 2 days, 23:06, 2 users, load averages: 1.95 2.54 2.42 | — | 0 | dcb8c0ac0ef0882cb465d76c7de77b1becfbab5972a2a222627e78b8d8835f07 |
| 679-break-monitor-test.log | bun test test/phase3b/composition.test.ts | 7:38  up 2 days, 23:06, 2 users, load averages: 1.95 2.54 2.42 | Tue Nov 24 12:38:39 UTC 2026 / Tue Nov 24 12:38:47 UTC 2026 | 1 | 6c60e6e220c55e29cbe0f168852baae2e3cfa47b4c14b4e2925bb645ab94c2e5 |
| 680-restore-monitor.log | git checkout -- packages/supervisor/src/build.ts | 7:38  2 users, load averages: 2.99 2.75 2.49 | — | 0 | f2c2e18f65475362fa025b105b7d911811a77c6365947b820918d6fce8071425 |
| 681-verify-monitor.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/supervisor/src/build.ts | 7:38  2 users, load averages: 2.99 2.75 2.49 | — | 0 | 5aa598c6cbe0a9f2da2a99c904eac121fe377566431f623bffa00ffbb166ff38 |
| 682-existing-parser-examples.log | rg -n -C3 'model_refused\|domain_unresolved' tui/packages/adapter-madv-surface/test -g '*.test.ts' | 7:32  2 users, load averages: 2.50 2.61 2.22 | — | 0 | 561756bdc7913b97cc31d2fe31f0f46774891f60728e3a17dac028c50926d432 |
| 683-existing-source-scans.log | rg -n -m5 'function (walk\|read.*Source)\|readdirSync\|Bun.Glob' tui/test/phase3a/harness-separation.test.ts tui/test/phase3a/architecture-phase3a.test.ts | 7:32  2 users, load averages: 2.50 2.61 2.22 | — | 0 | f27bbc91de0f1def4667df587d4f2465f6a8f1865d76896c6238427f4fed3afe |
| 684-legacy-failure-behavior.log | sed -n 980,1048p tui/packages/supervisor/src/build.ts | 7:32  2 users, load averages: 2.50 2.61 2.22 | — | 0 | 500785b9ec007b2d09cd7296d067d6ded566922a15925a3704403fba600fc238 |
| 685-parser-test-support.log | sed -n 1,31p tui/packages/adapter-madv-surface/test/parser.test.ts | 7:33  2 users, load averages: 3.39 2.77 2.30 | — | 0 | 4cf9344a1ba79c9133318527aef2df2f1250647a7f83468520162f492602f221 |
| 686-confirm-advisory-scope.log | rg -n '^B12\.\|^A8\.' tui/docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md | 7:39  2 users, load averages: 2.56 2.66 2.47 | — | 0 | bf87d3b4308973b840f833c63f5e2169ff67f6b13c09758b25a7d814e485cb99 |
| 687-add-precedence-test.log | tee tui/packages/adapter-madv-surface/test/response-precedence.test.ts | 7:39  2 users, load averages: 2.78 2.70 2.48 | — | 0 | e09df1f057884ca5cb116ab73119442d94a61b456fc3c8cdaf1c083ead4c5d96 |
| 688-add-allowlist-attributes.log | python3 - | 7:39  2 users, load averages: 2.82 2.72 2.49 | — | 0 | a0b019f999ff92d4eee3d49522959ff1c1a73bb6d94a7d5a92b031553645d711 |
| 689-add-separation-tests.log | tee tui/test/phase3b/separation.test.ts | 7:40  2 users, load averages: 2.78 2.71 2.49 | — | 0 | 043898a5036ed9605229ad61a29cb1a4facd1f6bb167d99ec134cb7c4807d9c4 |
| 690-r8-runtime.log | runtime_check | 7:40  up 2 days, 23:08, 2 users, load averages: 2.51 2.66 2.48 | Tue Nov 24 12:40:26 UTC 2026 / Tue Nov 24 12:40:27 UTC 2026 | 0 | 602ccecf81caf20e0c467493ee395533099604439ee00535ff96cc1d99b587e7 |
| 691-r8-typecheck.log | bunx tsc --noEmit | 7:40  up 2 days, 23:08, 2 users, load averages: 2.53 2.65 2.48 | Tue Nov 24 12:40:45 UTC 2026 / Tue Nov 24 12:40:48 UTC 2026 | 0 | c89c1932aab9faf7210c79480d2f7aa542643c25fe10a91b50d1ceaa0643e064 |
| 692-r8-precedence-load.log | wait_for_load | 7:42  up 2 days, 23:09, 2 users, load averages: 2.34 2.53 2.45 to 7:43  up 2 days, 23:10, 2 users, load averages: 1.82 2.35 2.39 | — | 0 | 680ef6e81c614fa54ba1d7b2c53e82c4a7c536c4f84f0b4185eb64352a373822 |
| 693-r8-precedence.log | bun test packages/adapter-madv-surface/test/response-precedence.test.ts | 7:43  up 2 days, 23:10, 2 users, load averages: 1.82 2.35 2.39 | Tue Nov 24 12:43:11 UTC 2026 / Tue Nov 24 12:43:11 UTC 2026 | 0 | 7df0a69e8582dfe3a95c89d50d4dfc7be7165d2b41db754a82f0e8449c7f6f08 |
| 694-r8-allowlist-load.log | wait_for_load | 7:43  up 2 days, 23:10, 2 users, load averages: 1.92 2.36 2.39 to 7:43  up 2 days, 23:10, 2 users, load averages: 1.92 2.36 2.39 | — | 0 | ff925a1fa7ec77b178227d1b9fc85123ba1ccd27e70af6b0f7ab435947c7f26a |
| 695-r8-allowlist.log | bun test packages/supervisor/test/madv-allowlist.test.ts | 7:43  up 2 days, 23:10, 2 users, load averages: 1.92 2.36 2.39 | Tue Nov 24 12:43:19 UTC 2026 / Tue Nov 24 12:43:19 UTC 2026 | 0 | 0aa831b4b9e339366314007c9c1e5850c7391b254928259ad80c88823b1aee9c |
| 696-r8-separation-load.log | wait_for_load | 7:44  up 2 days, 23:11, 2 users, load averages: 2.06 2.32 2.37 to 7:45  up 2 days, 23:13, 2 users, load averages: 1.94 2.25 2.34 | — | 0 | 4b9917ef25254af02d6fc435d91bf422d88750822357d825610fc0003d8b02fd |
| 697-r8-separation.log | bun test test/phase3b/separation.test.ts | 7:45  up 2 days, 23:13, 2 users, load averages: 1.94 2.25 2.34 | Tue Nov 24 12:45:33 UTC 2026 / Tue Nov 24 12:45:34 UTC 2026 | 0 | 9d1349f527675b9041dcdb79191ffeed4b36ffbbefb6444b9b2c3d9592438eb7 |
| 698-write-r8-message.log | tee /private/tmp/m1-r1-IH7Fxlbw/r8-message.txt | 7:40  2 users, load averages: 2.49 2.64 2.48 | — | 0 | 90fba77a2f18bf42a05fbcd07917b34aa66a1e21dcbde1ca8aa31ec23e00379c |
| 699-check-r8-message.log | zsh /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh /private/tmp/m1-r1-IH7Fxlbw/r8-message.txt | 7:40  2 users, load averages: 2.49 2.64 2.48 | — | 0 | afcd209bbde0bd7d07de22930678b46dc645e584c168c178e893fff685bde663 |
| 700-build-changes.log | git -C tui log --reverse '--format=%H %s' --name-only 75aec139d503cbe1d34d0c6f3ac5bd514339570e..HEAD | 7:45  2 users, load averages: 2.10 2.30 2.36 | — | 0 | e80f7df8bef362c4da7eb874adb6159bfd39faf0784e1594b29c23b0ef718008 |
| 701-r1-r6-self-fixes.log | rg -n -i 'self.fix\|fail\|error' logs/103-subscription-test.log logs/104-event-fields.log logs/105-foundation.log logs/109-adapter-package-files.log logs/112-r1-message.log logs/113-r1-typecheck.log logs/139-test-output-fix.log logs/143-prepare-fix-message.log logs/170-claude-tests.log logs/171-claude-monitor-cases.log logs/172-r2-runtime.log logs/249-build-handover.log logs/252-r3-runtime.log logs/253-r3-tests.log logs/323-freshness.log logs/332-detector-tests.log logs/338-r4-types.log logs/349-r4-types-fixed.log logs/370-prepare-ledger.log logs/372-r4-wait-state.log logs/373-break-inventory.log logs/415-r6-runtime.log logs/416-r6-load.log | 7:45  2 users, load averages: 2.10 2.30 2.36 | — | 0 | 8b1a8ac5e78a9f870bd15a4aac63c08b0f246a10e700225308e362bfcf3b7148 |
| 702-opening-headings.log | rg -n '^#' tui/docs/verification/phase-3b-m1-build-log.md | 7:45  2 users, load averages: 2.10 2.30 2.36 | — | 0 | bc5da5b8bf8386660ccb845c20f5bddc0b6a2b1fd74601cb799496edb0057054 |
| 703-stage-r8.log | git add -- packages/adapter-madv-surface/test/response-precedence.test.ts packages/supervisor/test/madv-allowlist.test.ts test/phase3b/separation.test.ts | 7:45  2 users, load averages: 1.86 2.23 2.33 | — | 0 | e9b3193cb0566924ec595df22ec95fa48932d3eecd97d54837ba10b56126f86a |
| 704-r8-staged-check.log | git diff --cached --check | 7:45  2 users, load averages: 1.86 2.23 2.33 | — | 0 | 9d2d3bef1436cb59e67a25025dfddd1219d5b876e667260891b7908c38d4f92e |
| 705-r8-paths.log | git diff --cached --name-only | 7:45  2 users, load averages: 1.86 2.23 2.33 | — | 0 | 9548d56abeab3f324545b220fd72b4babcc27124a94b21448a35a559a0ce53fb |
| 706-commit-r8.log | git commit -F /private/tmp/m1-r1-IH7Fxlbw/r8-message.txt | 7:45  2 users, load averages: 1.71 2.19 2.31 | — | 0 | bf17adbbdd427643bd9d5f795b5cc6f77cac1c02a8942287fb539d7f610d9289 |
| 707-r8-identity.log | git log -1 '--format=%H %P %s' | 7:45  2 users, load averages: 1.71 2.19 2.31 | — | 0 | b4c5b95600b1eb5fbd66f7b339a1c06cb8ca17f9fac77a78f4569817082d953a |
| 708-break-precedence.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/adapter-madv-surface/src/index.ts '      if (/claude\|anthropic/i.test(value.response_model)) { this.fail("model_refused", "anthropic_model"); return; } | 7:46  2 users, load averages: 1.94 2.19 2.31 | — | 0 | a84fc03cf7791f271a74d20192ccdb6e537c865f872b625ab311e6e3b2dcc9ac |
| 709-break-precedence-diff.log | git -C tui diff -- packages/adapter-madv-surface/src/index.ts | 7:46  2 users, load averages: 1.94 2.19 2.31 | — | 0 | 483ddfcf61561ca650d0994fd2bbd6949de90a043515048dc4af6cd02852c51f |
| 710-break-precedence-runtime.log | runtime_check | 7:46  up 2 days, 23:14, 2 users, load averages: 1.94 2.19 2.31 | Tue Nov 24 12:46:25 UTC 2026 / Tue Nov 24 12:46:25 UTC 2026 | 0 | 74a1535d770b995ed029513f8faa11d6326534e8d092cd563ec647e55062fe0c |
| 711-break-precedence-load.log | wait_for_load | 7:46  up 2 days, 23:14, 2 users, load averages: 2.03 2.21 2.31 to 7:46  up 2 days, 23:14, 2 users, load averages: 1.95 2.17 2.30 | — | 0 | c20d11207d10c96e6d518f6869bd0e36ebe0d2181f5caf661d0d4edf6e52d87b |
| 712-break-precedence-test.log | bun test packages/adapter-madv-surface/test/response-precedence.test.ts | 7:46  up 2 days, 23:14, 2 users, load averages: 1.95 2.17 2.30 | Tue Nov 24 12:46:57 UTC 2026 / Tue Nov 24 12:46:58 UTC 2026 | 1 | a579f1a0b6f73ae454e4ec543fe3fb7e4d62ec7ea9a1e1a9718348c953a5cd30 |
| 713-restore-precedence.log | git checkout -- packages/adapter-madv-surface/src/index.ts | 7:46  2 users, load averages: 1.95 2.17 2.30 | — | 0 | 822a419eca8ece93ca9617d4c761c46728dcfce7af35e2726d9fe1f4078f7284 |
| 714-verify-precedence.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/adapter-madv-surface/src/index.ts | 7:46  2 users, load averages: 1.95 2.17 2.30 | — | 0 | 39db7a25077b2ac401db8768e7551d9edb9cb43d610cef2337debdcae6d361b1 |
| 715-break-required.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/supervisor/src/environment.ts '{ name: "MINIMAX_API_KEY", required: true, secret: true }' '{ name: "MINIMAX_API_KEY", required: false, secret: true }' | 7:46  2 users, load averages: 1.95 2.17 2.30 | — | 0 | 7c2c86b81fb6192b21c59a8eceac12a7530d53e2728cb0d4aed7f3cbedbd3c5a |
| 716-break-required-diff.log | git -C tui diff -- packages/supervisor/src/environment.ts | 7:46  2 users, load averages: 1.95 2.17 2.30 | — | 0 | 9fc742ad0aa15fb10ca5cfd716a92007c2c3eec64cdb7ffb37a62e59a03af049 |
| 717-break-required-runtime.log | runtime_check | 7:47  up 2 days, 23:15, 2 users, load averages: 2.00 2.16 2.29 | Tue Nov 24 12:47:35 UTC 2026 / Tue Nov 24 12:47:36 UTC 2026 | 0 | 59732da52583715323041205f8331a118d08bb4da3833db8fda0808a631c7633 |
| 718-break-required-load.log | wait_for_load | 7:47  up 2 days, 23:15, 2 users, load averages: 2.16 2.19 2.30 to 7:49  up 2 days, 23:17, 2 users, load averages: 1.69 2.13 2.27 | — | 0 | 3865c74cb06e539ea86c7fb110a1f89760223daf314ee5da0418dd9d8af494dd |
| 719-break-required-test.log | bun test packages/supervisor/test/madv-allowlist.test.ts | 7:49  up 2 days, 23:17, 2 users, load averages: 1.69 2.13 2.27 | Tue Nov 24 12:49:38 UTC 2026 / Tue Nov 24 12:49:38 UTC 2026 | 1 | a973b5a341a1a166ca9e9fc70782ef794e90053627321a398743ea9eda461e12 |
| 720-restore-required.log | git checkout -- packages/supervisor/src/environment.ts | 7:49  2 users, load averages: 1.69 2.13 2.27 | — | 0 | c8e986221ab458d0bde9b902bba30de7707b4e7ccdd2d7780b1c405e0c8b0115 |
| 721-verify-required.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/supervisor/src/environment.ts | 7:49  2 users, load averages: 1.69 2.13 2.27 | — | 0 | 52894c23f7729a2162e225822baef7ac378c4b0488d29a917d3c6350be3d1057 |
| 722-break-import.log | create_break | 7:49  2 users, load averages: 1.69 2.13 2.27 | — | 0 | 7fbb4b85f4f2f502326751fc2c9cb1e33c2d4b55d7cab6f230c7fba69135ec58 |
| 723-break-import-diff.log | show_added | 7:49  2 users, load averages: 1.69 2.13 2.27 | — | 0 | 35fca757df0d9b79d6dfde33f1fdc448261fcd2f7270551bc8df4a6d1cc209bd |
| 724-break-import-runtime.log | runtime_check | 7:49  up 2 days, 23:17, 2 users, load averages: 1.52 2.07 2.24 | Tue Nov 24 12:49:53 UTC 2026 / Tue Nov 24 12:49:53 UTC 2026 | 0 | 0bc388d6eebe4f1181324ae4af35fc211d00aab7afcdbf5a2d03a1da6ed53ac6 |
| 725-break-import-load.log | wait_for_load | 7:50  up 2 days, 23:18, 2 users, load averages: 1.61 2.03 2.22 to 7:50  up 2 days, 23:18, 2 users, load averages: 1.61 2.03 2.22 | — | 0 | 2a9c5fd1083cc08f5276f246eaadd7913b8c2743702db95e12e8d4cfa200ac86 |
| 726-break-import-test.log | bun test test/phase3b/separation.test.ts | 7:50  up 2 days, 23:18, 2 users, load averages: 1.61 2.03 2.22 | Tue Nov 24 12:50:39 UTC 2026 / Tue Nov 24 12:50:40 UTC 2026 | 1 | f7349f99c50011559e841972b9664cf7d4db505d01a35fcfd88545c6566b54fe |
| 727-restore-import.log | mv tui/apps/madbridge/src/tui/live/stand-in-import-break.ts /private/tmp/m1-r1-IH7Fxlbw/r8-deliberate-app-import.ts | 7:50  2 users, load averages: 1.61 2.03 2.22 | — | 0 | 18c842c4e759ad40defe1d0bf2d1453fcd035326ca61350346e225738eac72a9 |
| 728-verify-import.log | verify_absence | 7:50  2 users, load averages: 1.61 2.03 2.22 | — | 0 | 90ea6bbf8566d11ad2b3c4357433304b8300abcf4b4cf09f4790a074fd87e08e |
| 729-break-legacy.log | python3 /private/tmp/m1-r1-IH7Fxlbw/break.py packages/supervisor/src/build.ts 'if (reg === undefined \|\| typeof attester !== "function") {' 'if (!live && reg !== undefined && typeof attester !== "function") continue; | 7:50  2 users, load averages: 1.61 2.03 2.22 | — | 0 | 50dc1ea731cb6a97d5f21e8885845e7ca58491749a1e94fb74e0670af754c1e0 |
| 730-break-legacy-diff.log | git -C tui diff -- packages/supervisor/src/build.ts | 7:50  2 users, load averages: 1.61 2.03 2.22 | — | 0 | 0803734f2415e2a8856b5cd57696ed99f5213dd0dca0b6a8d1c9f9e68a9949f5 |
| 731-break-legacy-runtime.log | runtime_check | 7:50  up 2 days, 23:18, 2 users, load averages: 1.56 2.01 2.21 | Tue Nov 24 12:50:43 UTC 2026 / Tue Nov 24 12:50:44 UTC 2026 | 0 | a35175f2e5cc8602c0f2c26c386dc0ebf39e3e2a7249d739658eae1b016effcb |
| 732-break-legacy-load.log | wait_for_load | 7:50  up 2 days, 23:18, 2 users, load averages: 1.56 2.01 2.21 to 7:50  up 2 days, 23:18, 2 users, load averages: 1.56 2.01 2.21 | — | 0 | b3c274cc99aba449e8fb5dc82c05a526c292f7ad0c22d6c82c8913db1c1990f0 |
| 733-break-legacy-test.log | bun test test/phase3b/separation.test.ts | 7:50  up 2 days, 23:18, 2 users, load averages: 1.60 2.01 2.21 | Tue Nov 24 12:50:47 UTC 2026 / Tue Nov 24 12:50:47 UTC 2026 | 1 | 2a14ee25365b5264be8ca2ad784c2d8ddb8d1d912930bec9661c842b94aef4df |
| 734-restore-legacy.log | git checkout -- packages/supervisor/src/build.ts | 7:50  2 users, load averages: 1.60 2.01 2.21 | — | 0 | 01d97477492350d23f87e176990ddb306d9b382991e7acabcb21aa7e345a2a1a |
| 735-verify-legacy.log | python3 /private/tmp/m1-r1-IH7Fxlbw/restore-check.py packages/supervisor/src/build.ts | 7:50  2 users, load averages: 1.60 2.01 2.21 | — | 0 | 5d4bf1493b463da20284154ddc898234ad2bd109360118da036b5c6a987c6114 |
| 736-nonzero-log-inventory.log | python3 - | 7:46  2 users, load averages: 2.10 2.22 2.32 | — | 0 | 05091da295c49b85c4a4cd3979e90e3c6972ce059b5703ff91ead2ba3a0af85b |
| 737-r1-edit-status.log | tail -16 logs/102-r1-port.log | 7:46  2 users, load averages: 1.93 2.18 2.30 | — | 0 | 5863d389931967dad3612472fda8d0f6af856e05f3684976785dd34d6c33bef5 |
| 738-commit-logchecks.log | rg --files logs -g '*message*' -g '*commit*' -g '*trailer*' -g '*width*' | 7:46  2 users, load averages: 1.93 2.18 2.30 | — | 0 | 996caf7927963fc744db69ef78919a9f705e27fa69d4e2d55f5ea65554c4d237 |
| 739-r3-r6-test-names.log | rg -n '^\(pass\)' logs/115-r1-stage.log logs/141-fix-load.log logs/174-r2-test.log logs/255-r3-test.log logs/351-r4-cases.log logs/379-r5-test.log logs/417-r6-test.log | 7:46  2 users, load averages: 1.93 2.18 2.30 | — | 0 | b2014c3526ae4e3e2a37733be8ebe3ad091d92dcb969691db31615271661042c |
| 740-extend-break-accounting.log | tee -a /private/tmp/m1-r1-IH7Fxlbw/logbook.py | 7:47  2 users, load averages: 2.75 2.32 2.34 | — | 0 | 56357d75636dc399e65fa39e03e4e68a22e16834ce9009630ce5a9ecd937fa6a |
| 741-committed-functions.log | git -C tui grep -n -E '^(export )?(async )?(function\|class\|const [a-zA-Z]+ = \()' HEAD -- apps/madbridge/src/tui/live packages/adapter-claude-code/src/detectors.ts packages/adapter-claude-code/src/live.ts packages/adapter-madv-surface/src/detectors.ts packages/adapter-madv-surface/src/live.ts packages/supervisor/src/preflight.ts | 7:48  2 users, load averages: 2.61 2.29 2.33 | — | 0 | 98817cabaa485f864dafa633b6a4347cd27c3669b6a3c417da4cd1a4e84386c7 |
| 742-create-evidence-script-dir.log | mkdir -p tui/scripts/phase3b | 7:51  2 users, load averages: 1.50 1.98 2.19 | — | 0 | 31cdd63dc2f41a8e3d7033c5397c6803127dc7a220695aeea47b84c1112049f7 |
| 743-add-transcript-writer.log | tee tui/scripts/phase3b/transcript.ts | 7:51  2 users, load averages: 1.56 1.96 2.18 | — | 0 | d016dadc2a0ed62a71db74385a99d6d989ad744730fc0972ac3fe37ba36ca82a |
| 744-add-healthy-evidence.log | tee tui/scripts/phase3b/healthy-starts.ts | 7:51  2 users, load averages: 1.56 1.96 2.18 | — | 0 | de824b44e090a71f707187454d67a14ff716daf643dc7a233a83d6b2a77b54b8 |
| 745-add-failure-evidence.log | tee tui/scripts/phase3b/failures.ts | 7:51  2 users, load averages: 1.56 1.96 2.18 | — | 0 | 949e188dd2b526762ff095210260244f0cc19adf7fa48d9381ce269d41c75a88 |
| 746-evidence-healthy-runtime.log | runtime_check | 7:52  up 2 days, 23:19, 2 users, load averages: 3.66 2.46 2.35 | Tue Nov 24 12:52:10 UTC 2026 / Tue Nov 24 12:52:10 UTC 2026 | 0 | d4f528e2912225051ad664e6dca5c3ace514c93eaebc8141fc8b22f5829eecb3 |
| 747-evidence-healthy-load.log | wait_for_load | 7:52  up 2 days, 23:19, 2 users, load averages: 3.44 2.44 2.35 to 7:53  up 2 days, 23:20, 2 users, load averages: 1.83 2.16 2.25 | — | 0 | 02524f41433adb6fdee2dc825593096dcc2d3218f261f929bef8cddc61c6a929 |
| 748-evidence-healthy.log | bun scripts/phase3b/healthy-starts.ts /Users/michaeldaley/builds/m1-r1/evidence | 7:53  up 2 days, 23:20, 2 users, load averages: 1.83 2.16 2.25 | Tue Nov 24 12:53:13 UTC 2026 / Tue Nov 24 12:53:14 UTC 2026 | 0 | fbab5290c64f53287802189e4ded27aea28019a871d00ffa751d8937aad60561 |
| 749-evidence-failures-runtime.log | runtime_check | 7:53  up 2 days, 23:20, 2 users, load averages: 1.83 2.16 2.25 | Tue Nov 24 12:53:16 UTC 2026 / Tue Nov 24 12:53:17 UTC 2026 | 0 | a26da0e85868b65219109e675e0b936555a749f377667c7128c55dc0d793d931 |
| 750-evidence-failures-load.log | wait_for_load | 7:53  up 2 days, 23:20, 2 users, load averages: 1.85 2.15 2.24 to 7:53  up 2 days, 23:20, 2 users, load averages: 1.85 2.15 2.24 | — | 0 | 2e1a9df51823f615714e1677ca34d9ccf710ee4642e634c4862c082d052c97e4 |
| 751-evidence-failures.log | bun scripts/phase3b/failures.ts /Users/michaeldaley/builds/m1-r1/evidence | 7:53  up 2 days, 23:20, 2 users, load averages: 1.85 2.15 2.24 | Tue Nov 24 12:53:19 UTC 2026 / Tue Nov 24 12:53:20 UTC 2026 | 0 | 5dbe984af49955c02ca150a9bd42dbdf6afbba4d90ebabdcb450defdd9826b47 |
| 752-complete-break-accounting.log | tee -a /private/tmp/m1-r1-IH7Fxlbw/logbook.py | 7:52  2 users, load averages: 3.25 2.41 2.34 | — | 0 | 078ce15dd73639dbec660a0785888fac7a6c0f3b2ea6cf382d74e740a8c3c26f |
| 753-r9-message.log | tee /private/tmp/m1-r1-IH7Fxlbw/r9-message.txt | 7:52  2 users, load averages: 3.25 2.41 2.34 | — | 0 | 2f354ff9a679c8d8d235c08ba2488615ac02821cd6e49a64254f8df2e93b62b6 |
| 754-r9-trailers.log | zsh /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh /private/tmp/m1-r1-IH7Fxlbw/r9-message.txt | 7:52  2 users, load averages: 3.25 2.41 2.34 | — | 0 | abc7361681301aad85735c7f86bbe19df629e70b126d5e914cca26ff66979583 |
| 755-evidence-manifest.log | make_manifest | 7:53  2 users, load averages: 1.94 2.17 2.25 | — | 0 | fa5173fa3c89617f5801dbdafad38afc40d78532c67f5900ef7bfb670a173ec8 |
| 756-verify-evidence.log | shasum -a 256 -c SHA256.txt | 7:53  2 users, load averages: 1.94 2.17 2.25 | — | 0 | ec9485b77611e7853300c9334f89d98defddda095971f3bd2b834a6a51daf0a3 |
| 757-read-transcripts.log | cat evidence/healthy-claude-code.txt evidence/healthy-madv-surface.txt evidence/barrier-failure.txt evidence/attestation-failure.txt evidence/fallback.txt | 7:53  2 users, load averages: 1.78 2.13 2.23 | — | 0 | 39cbb6cb659809a4db9a5092ad417831e55401740ee47d2e848ccbfe5affd653 |
| 758-evidence-digests.log | shasum -a 256 tui/scripts/phase3b/failures.ts tui/scripts/phase3b/healthy-starts.ts tui/scripts/phase3b/transcript.ts evidence/SHA256.txt logs/748-evidence-healthy.log logs/751-evidence-failures.log | 7:53  2 users, load averages: 1.78 2.13 2.23 | — | 0 | e31f21897a79cba5dc49c49d9517704acacd5cdd78491444dfd6aa4b3d9884fb |
| 759-write-evidence-packet.log | python3 - | 7:53  2 users, load averages: 2.28 2.22 2.26 | — | 0 | 57ed38d39ba1821c5221503fcdd80fdedccb99033c3b46101fefca23caab9419 |
| 760-stage-r9.log | git add -- scripts/phase3b/transcript.ts scripts/phase3b/healthy-starts.ts scripts/phase3b/failures.ts docs/verification/phase-3b-m1-evidence.md | 7:53  2 users, load averages: 2.10 2.18 2.25 | — | 0 | 929840235f3be5b7ac6e71b0b51009714979074b5fbb9ae4bac38b1a13d48aca |
| 761-r9-staged-check.log | git diff --cached --check | 7:53  2 users, load averages: 2.10 2.18 2.25 | — | 0 | e3f5fce0200c60acd834f2787d4d8ab6fda7133980ad85f9e89285372a014663 |
| 762-r9-paths.log | git diff --cached --name-only | 7:53  2 users, load averages: 2.10 2.18 2.25 | — | 0 | a1cdbaee47585196d6fe811045772f99c385610150acece94a377d68be0ef52a |
| 763-commit-r9.log | git commit -F /private/tmp/m1-r1-IH7Fxlbw/r9-message.txt | 7:54  2 users, load averages: 2.09 2.18 2.25 | — | 0 | 3f1ebe33f76a88901ed3c5ca4f1e4ee5636ccd41e061babaaf14a8b2cba4c43e |
| 764-r9-identity.log | git log -1 '--format=%H %P %s' | 7:54  2 users, load averages: 2.09 2.18 2.25 | — | 0 | 5018d71e69fc235cb8053aae78e3b0411c4f23e63a59d5cc980d0ac0348d24ef |
| 765-full-runtime.log | runtime_check | 7:55  up 2 days, 23:22, 2 users, load averages: 1.18 1.88 2.13 | Tue Nov 24 12:55:13 UTC 2026 / Tue Nov 24 12:55:14 UTC 2026 | 0 | 52c15d60d95d705d1731dcce3126e7e19fd0293739e4d80a4544469a0eab617d |
| 766-full-lock-before.log | check_lock | 7:55  2 users, load averages: 1.18 1.88 2.13 | — | 0 | 1432d96378b2828b971bdb5ae9ea1e5b641acd079ed7813ad768e5cf8a821576 |
| 767-full-install.log | bun install --frozen-lockfile | 7:55  up 2 days, 23:22, 2 users, load averages: 1.18 1.88 2.13 | Tue Nov 24 12:55:18 UTC 2026 / Tue Nov 24 12:55:18 UTC 2026 | 0 | f07ec9d6e4e02a62fe5012252fb3a53e494988199468af226474ae23d94e72aa |
| 768-full-lock-after.log | check_lock | 7:55  2 users, load averages: 1.18 1.88 2.13 | — | 0 | 1432d96378b2828b971bdb5ae9ea1e5b641acd079ed7813ad768e5cf8a821576 |
| 769-full-install-state.log | git -C tui diff --summary | 7:55  2 users, load averages: 1.18 1.88 2.13 | — | 0 | 21764d781540503d12ad2d27f9edd1c7465f2d62cd90e978017d28df773818b7 |
| 770-full-restore-install-mode.log | git checkout -- packages/founder-act/src/main.ts | 7:55  2 users, load averages: 1.18 1.88 2.13 | — | 0 | e052fcf7d3dc25c181aa621c6e28d71c4c34e753c7c4f0ab73365c2019c2319a |
| 771-full-clean.log | check_clean | 7:55  2 users, load averages: 1.18 1.88 2.13 | — | 0 | bf7dae0d2a1042364d560f89088d900f26b3c6d6287ded6db7fb72d38afad260 |
| 772-full-typecheck.log | bunx tsc --noEmit | 7:55  up 2 days, 23:22, 2 users, load averages: 1.24 1.88 2.13 | Tue Nov 24 12:55:20 UTC 2026 / Tue Nov 24 12:55:23 UTC 2026 | 0 | 764f372007f65422d036346061a5c0eb6a05e4d71e01765d050bf00426207a6b |
| 773-full-suite-runtime.log | runtime_check | 7:55  up 2 days, 23:22, 2 users, load averages: 1.22 1.87 2.12 | Tue Nov 24 12:55:24 UTC 2026 / Tue Nov 24 12:55:24 UTC 2026 | 0 | d30b545eb28f623e3bd16cb82e5bf2a1544ea0f327e9b8a9887f3ee4cd0ac622 |
| 774-full-suite-load.log | wait_for_load | 7:55  up 2 days, 23:23, 2 users, load averages: 1.22 1.87 2.12 to 7:55  up 2 days, 23:23, 2 users, load averages: 1.22 1.87 2.12 | — | 0 | 799af491cfbd163d10b3f46a36572ac558b9d0916f33dafb1486c99e3d9191f7 |
| 775-full-suite.log | bun test | 7:55  up 2 days, 23:23, 2 users, load averages: 1.22 1.87 2.12 | Tue Nov 24 12:55:27 UTC 2026 / Tue Nov 24 12:59:48 UTC 2026 | 0 | e7d912fcb2dc582f2893b9ceaef10ef1ba375d3f0feb928f547550362733df60 |
| 776-baseline-list-procedure.log | sed -n 655,677p tui/docs/verification/phase-3b-m1-build-log.md | 7:55  2 users, load averages: 1.88 1.97 2.15 | — | 0 | b46a7c4d2092ec50b9da5e9ed3c45d615b91490320906ffe2fbdf29aa33b34a6 |
| 777-write-record-mappings.log | tee /private/tmp/m1-r1-IH7Fxlbw/reportlib.py | 7:56  2 users, load averages: 2.06 1.99 2.15 | — | 0 | 3555f23b5bf2369b4338717e4075a6e7ca2906f44a62726491c9bfdfa19c31d0 |
| 778-prepare-deviation-record.log | tee -a /private/tmp/m1-r1-IH7Fxlbw/reportlib.py | 7:57  2 users, load averages: 1.62 1.88 2.10 | — | 0 | d62377742f247221a8bf89e5a472b55439d0b3c4ad606e27c944444dc287c7e1 |
| 779-check-test-map-sources.log | cat logs/142-fix-test.log logs/090-stage-opening.log logs/771-full-clean.log | 7:57  2 users, load averages: 1.52 1.85 2.08 | — | 0 | 0beb12fadb243fdc53a137ad23c2f664204aa8df3dcc7df107a7745315190143 |
| 780-original-message-receipts.log | head -16 logs/089-message-opening.log logs/091-check-opening.log logs/114-r1-message-check.log logs/146-fix-trailers.log logs/176-r2-message-check.log logs/262-r3-trailers.log logs/348-new-r4-trailers.log logs/381-r5-trailers.log logs/420-r6-trailers.log | 7:57  2 users, load averages: 1.48 1.84 2.08 | — | 0 | ba2f9e9bdbc7139c2f5469235567bc094e0d1463414f65f0762aad1a98bd6d53 |
| 781-verify-accounting-inputs.log | python3 - | 7:57  2 users, load averages: 1.23 1.77 2.05 | — | 0 | 0770c333d161c76e7c7e39c5ca9e6cac64ff4cabd0d05e3dc3e522fa3d7f6694 |
| 782-identity-source.log | sed -n 1,26p tui/docs/verification/phase-3b-m1-build-log.md | 7:58  2 users, load averages: 1.11 1.72 2.03 | — | 0 | b5645954855917613e755271e27420a048563a74ae600a02cedcbe5880bcf449 |
| 783-base-list-format.log | head -10 logs/075-base-list.log | 7:58  2 users, load averages: 1.11 1.71 2.02 | — | 0 | efc496844a89087f27c931cbcf0b86490b203cd610ef2c8a04696bc07b195117 |
| 784-base-list-record-layout.log | sed -n 10,25p logs/075-base-list.log | 7:58  2 users, load averages: 1.10 1.70 2.02 | — | 0 | 692ef927225599170db6c36dec8a0c6b3b4ac13a0c48849d24f02482cdd011de |
| 785-write-suite-list-reader.log | tee /private/tmp/m1-r1-IH7Fxlbw/list-suite.py | 7:58  2 users, load averages: 1.31 1.73 2.02 | — | 0 | d453359408e6cdbe06c86facd0ea6934e90f608109c6bd50c6959fc8dc951a4e |
| 786-draft-record-renderer.log | tee /private/tmp/m1-r1-IH7Fxlbw/close-log.py | 7:59  2 users, load averages: 1.59 1.74 2.00 | — | 0 | 160a96be536fa69a2559be7f826a7eabed3c39ef6d44637d3926ce99208a8a77 |
| 787-check-renderer.log | python3 - | 7:59  2 users, load averages: 1.55 1.72 1.98 | — | 0 | 614a386d779bf10b0b44ee0121a97758d1820d2c532f308e4b13d7a506007ad8 |
| 788-full-test-list.log | python3 /private/tmp/m1-r1-IH7Fxlbw/list-suite.py 775 | 8:00  2 users, load averages: 1.54 1.71 1.98 | — | 0 | 4bfd4435ff6f71ca87be0fd8cd124903c2702f0f396d1c1678196207f3ed57a8 |
| 789-full-comparison.log | python3 /private/tmp/m1-r1-IH7Fxlbw/compare-suites.py 775 | 8:00  2 users, load averages: 1.54 1.71 1.98 | — | 0 | 1f4eabcd4cea9f6619524dce37feb35cae654dcb43bedc89822610aa8c3544a4 |
| 790-full-diff-check.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --check 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD | 8:00  2 users, load averages: 1.60 1.72 1.98 | — | 0 | db0fa1f0428f5c0270cd048a7c1b8aa37d25dbc8396db922174c67a88939ab14 |
| 791-full-changed-paths.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --name-only 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD | 8:00  2 users, load averages: 1.60 1.72 1.98 | — | 0 | ce04eea0004caa694e633de819f90047cf61780a88bc54a35ed1cbbf18146726 |
| 792-full-pin-diff.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD -- test/phase3a/harness-separation.test.ts | 8:00  2 users, load averages: 1.60 1.72 1.98 | — | 0 | e778b43e2f3cd1866dc7656be112a9c8488f020d4b16f429321eae8145900ac9 |
| 793-full-pty-test-diff.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD -- packages/pty-host/test/main-guard.test.ts | 8:00  2 users, load averages: 1.60 1.72 1.98 | — | 0 | 7db1983937a5af6d28a8c7044b2ab5214099959564b75a42df429553e0e52529 |
| 794-full-protected.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --stat 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD -- package.json bun.lock apps/madbridge/package.json apps/madbridge/src/tui/main.tsx apps/madbridge/src/commands/start.ts apps/madbridge/src/cli.ts packages/protocol packages/supervisor/src/attestation.ts packages/supervisor/src/environment.ts packages/supervisor/test/build-rollback.test.ts packages/adapter-madv-surface/test/fixtures test/phase3a/runtime-harness.ts test/phase3a/fixture-adapters.ts | 8:00  2 users, load averages: 1.60 1.72 1.98 | — | 0 | bbc48f09f57a56e2aeb857c0ee90ac30fe01b777198d4e5f4a28e6ab79dcfdf1 |
| 795-full-manifests.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui diff --stat 75aec139d503cbe1d34d0c6f3ac5bd514339570e HEAD -- '*package.json' '*tsconfig*' bun.lock | 8:00  2 users, load averages: 1.60 1.72 1.98 | — | 0 | 503fb7119eb31c7478a08527aa9e60679cb1c17d13d81e3c990a3ef04d9fca15 |
| 796-full-status.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui status -sb | 8:00  2 users, load averages: 1.60 1.72 1.98 | — | 0 | 91ba334081bf29010def86f7a5ce24086b855f3585ce0929adde80b568985c72 |
| 797-full-untracked.log | env GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git -C tui ls-files --others --exclude-standard | 8:00  2 users, load averages: 1.60 1.72 1.98 | — | 0 | 51cd51ff6099a96e85f812354e14dd5a6602dd8411e642bb854efc38ea73aa41 |
| 798-close-message.log | tee /private/tmp/m1-r1-IH7Fxlbw/close-message.txt | 8:00  2 users, load averages: 1.56 1.70 1.97 | — | 0 | 64efe84e879c7d1be1d011ba9d91e56ec7c0bc3b1748fb783456970c0a71cde7 |
| 799-close-message-check.log | zsh /private/tmp/m1-r1-IH7Fxlbw/check-message.zsh /private/tmp/m1-r1-IH7Fxlbw/close-message.txt | 8:00  2 users, load averages: 1.56 1.70 1.97 | — | 0 | de21518f49b2076a5a0d1d8d0eb6775feb899a556ab61b0e235d6f1d8d3d87e8 |
| 800-check-report-sources.log | python3 - | 8:00  2 users, load averages: 2.03 1.80 2.00 | — | 0 | e9f48a40a964366b9b62d1170bf6fe1c6f8fcc094067145da2faf83db1a38f7a |
| 801-finalize-closing-renderer.log | python3 - | 8:01  2 users, load averages: 2.00 1.81 2.00 | — | 0 | 6632289e7d018d69a151fe2d06fda9f338fd89717d77c8f7ec22fe41aed12a3d |
