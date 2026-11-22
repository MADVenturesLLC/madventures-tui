# Phase 3B M0 admission build log

## Phase 1 opening

Starting main and branch parent 0678bd4412d5aaed963ae20f101959bd92f79811. Binding base 403a9f536539b96115aa44ab82436fe55d95b739. Branch build/3b-m0-admission-r1. DEC-20261121-02 SHA-256 141ee53275999ba3f31a0b1f66bed93ffb7a80d6f3527cbff31b3885ead44dfe. Signed Addendum 1 SHA-256 b6b9563ed1a2e154b4ef3b4d9ffe7666e6fd9870d82b87486f772d65f7f167aa.

### Identity and runtime

Governed Codex, OpenAI GPT-6. The exact model identifier, effort, service tier and session ID were not shown. The agent was /root in Default collaboration mode, role builder, actor session:codex/3b-m0-admission-r1, execution surface codex. The host context named zsh, 2026-11-21 and America/New_York. The filesystem was workspace-write with restricted network. The Founder identified approval as on-request and reported an empty MCP server list. A separate approval policy value and reviewer ID were not displayed.

The visible functions were wait, request_user_input, request_user_input_async, send_message_to_user_async and exec. The nested catalog included apply_patch, exec_command, write_stdin, clock__curr_time and the six names of Addendum 2 B4. The clock namespace exposed sleep. The collaboration namespace exposed followup_task, interrupt_agent, list_agents, send_message and wait_agent, in addition to its member among the six names of Addendum 2 B4. The deferred harness namespace exposed create_thread, create_worktree, fork_thread, get_worktree_creation_status, list_archived_threads, list_threads, list_worktrees, read_thread, send_message_to_thread, set_thread_archived, set_thread_title and wait_threads. The additional top-level function send_message_to_user_async was reported and unused. The model record of DEC-20261112-02 B2 awaits the Founder's check.


001-cli-version.log · SHA-256 4177ccbd71226a743f8d562eb04ac791599205ce83fb0fb082893afec986f2f0

````text
WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0
````



002-pwd.log · SHA-256 3864d27a8fab651bcd096138b30ad1867954e5e304058c8da8b2734e7803152c

````text
/Users/michaeldaley/builds/m0-admission-r1
````



003-branch.log · SHA-256 77bdd0280762ef1210e7749764b23c132e2072c50f29429de5e86f15ca9241a8

````text
build/3b-m0-admission-r1
````



004-head.log · SHA-256 c87499956ae798a0d175f72a2d70fd8fb66fac270ba10f155403c1fb15ffe815

````text
0678bd4412d5aaed963ae20f101959bd92f79811
````



005-user-name.log · SHA-256 c8236b701e2cd8fa2f88faf7997e82486acb0f9547d104f6e0b70b7b7e77ce62

````text
daley40-lab
````



006-user-email.log · SHA-256 4249d689e095e6781ce42f7c27ed6d2cfb1162ff72c3da3f379702664c737285

````text
293512385+daley40-lab@users.noreply.github.com
````



007-runtime.log · SHA-256 1f36c92027e3092358d7bc85c5322dbf1b0fab0bbfcdc3213e05ea438322c425

````text
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
````


### Preconditions

1. The cached origin/main has the binding base as its first parent and ancestor. The only changed path is the admission act. The working tree and stash were empty. The remote branch and the three proposed repository paths were absent. The Founder supplied empty output directories. The inventory showed only this session’s new logs, and empty pr and record directories.


015-ancestry.log · SHA-256 58b5c2f4eb1128b0f6f4a38c012d9512dd805adbc1af1ca6a62be543b498d740

````text
0678bd4412d5aaed963ae20f101959bd92f79811
403a9f536539b96115aa44ab82436fe55d95b739
docs/decisions/DEC-20261121-02-madv-surface-admission.md
````


016-checkout.log · SHA-256 7e77d470cddad0a1c5f2fa4ab319339fbf9bb66466c0bba2ccb3cd328c302c39

2. All 40 authority digests matched. The issued acts bear Michael Daley’s signature. The supplied input manifest and the export’s hashes and path coverage passed.


019-authority-check.log · SHA-256 a5986336fafb9c789b3816f2d64dc10663d22625027ac3104e9287f3926cd8e4

````text
docs/decisions/DEC-20261121-02-madv-surface-admission.md 141ee53275999ba3f31a0b1f66bed93ffb7a80d6f3527cbff31b3885ead44dfe OK
  > **Status:** ISSUED
  — Michael Daley
prompt/DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md b6b9563ed1a2e154b4ef3b4d9ffe7666e6fd9870d82b87486f772d65f7f167aa OK
  > **Status:** ISSUED
  — Michael Daley
prompt/m0-record-r3.ts b9ba9bdadf0ca0b5e792ad78fc46f9212d763ad7455fb122343756be2e6fb593 OK
docs/decisions/DEC-20261115-02-phase-3b-m0.md 5d8bd4a446d8b3120bddbc34dc11a5fdf83e3a07d9efcd04fbd7b8efdad8d22b OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261115-02-addendum-1-m0-paths-and-tests.md 31576960c18a4c9607fca2785e54146df5f740af45b4437dc7f13890abaeca42 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261115-02-addendum-3-phase-1-record-check.md 24f76dbb631d6058e81ccff93d3c9fecb11521b5a876c687ec0da1ee0f9e0a23 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261115-02-addendum-5-retired-id-plugin-and-json.md 666a82b2229272111f4d01b79c6ffba401a53f5236ae50f7f7c6a4b3651cd9ac OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261115-02-addendum-7-ubuntu-identity-run-and-deferral.md f6ed06f7d4f98e8155dfedbcf190eff938caddfabd848c2ecb489f595c7591fb OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261119-01-m0-records-and-merge.md 7076137d68f013705d8872eaf573cb13ee17319b9074bc20248d02a2d6316df2 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261119-03-madv-surface-0.1.2-release.md 6823c07f50567a62abee020de693e192cc43ff47a75871e5bfad5bd16e671d9b OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261121-01-madv-surface-0.1.2-records.md b0b81b4eeb505ee3926fbfb85ff6272c52abf9d89934205bc5633c8fa7bdffbf OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-04-phase-3b-standing-commission.md d373235e424bd7fbe4c1c5b1c5f4954eb1b02165db4e1365d9cfa1533aa93b29 OK
  > **Status:** ISSUED
      — Michael Daley, Date: 2026-11-08
docs/decisions/DEC-20261108-04-addendum-1-corrections.md 90e2f541fd0a232390ca0554067a2de8b37f15c933016eafe40ebde2cd2eff17 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-01-phase-3b-approval.md 319ba65b340696d66a655e21f648fed742a9c38bcbb1d876776abc27a27a9738 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261114-01-madv-surface-release.md 6bffc2c18927b90f4b5042f312947e5d39853ca53404a58a51b4602eb45652b8 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261112-02-model-record.md 3151cb9e178e918f0c07f5a4eb9931fa9d529debedf0ad4d91f5999844883da7 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-03-addendum-2-codex-harness.md e04b54065b0f0bb465b2d14e14a39f3b31f9cb34a874f6f8210a7d7e74a8c1c1 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-03-addendum-3-image-tool.md f2a0ef1063379902935760d9517b68d532cabf6e24699cdebb789681f78ce15e OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-03-addendum-4-sandbox-halt.md e817470aea6be2c176d4ae75856fd793ef982bd28c9eb793df9c9038a5c1dfbc OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-03-addendum-5-own-work.md e86e94a62c7067e4656114afe1713c1478814ffe446d1ffcc8b788accfc3ff3d OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-03-addendum-6-names-in-text.md 24cef0ed5c968aa80ada586e473526d0f4f0b1de1331eba1d5a35051b1254ac9 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-03-addendum-10-second-verdict.md d90d48718bc4ea6056af6f011f797a78eddcfd14e7111f15f823085c4388bca0 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-03-addendum-11-governed-build.md e2d28cbd12485e9025c928403eb7beead9552ee378b023ddf5bc9e18febe00df OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261112-03-addendum-2-gate-repeat.md 829248f1e2557ddbcfd33d6456f7056bfce73a008791cb88caa9660a5d979d29 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-03-phase-3b-h1.md 10cdc674ce746568c963aa2c5c34c95a69d9960ea469438b044bfb5fe4b9e9de OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261113-01-h2-records-and-merge.md 41e27eafc24a2eef238c080d1374b90fbe22d609f4ef5cbb66e07cccb5b347a5 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261108-02-phase-3b-builder-qualification.md 38ec4066f5c9487547befc81e00b80b69126d9140f1e66c0a8dcb35e5fe815ef OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261102-02-hardening-builds.md 04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261023-01-standing-build-rules.md bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261013-03-tests-4-6-ruling.md 249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261104-02-hardening-f-and-task58.md 011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261015-03-m20-checkpoint-closure.md e4148fde243d15508513fbf22b58584c519d1d842ca7fefb016d266bf6f08f61 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261020-01-phase-3a-order-and-records.md e5299202a83ad37e11fd619231422b41fc43779308531b62ae6a5cf06ee3c6b7 OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/DEC-20261027-01-m22-execution-authorization.md 86f1374492a833ce87ebdf81293c59e8805c547d8bc29e1aa682b17a769bcd8b OK
  > **Status:** ISSUED
  — Michael Daley
docs/decisions/PLAN-OPEN-2-environment-allowlists.md b60676aa47b216c36d9080c884650943cdac93dd12109d2864ebcf0eb6887d8c OK
docs/decisions/PLAN-OPEN-3-capability-horizon.md cca3061b91ffc9eb231003f5e5d7c20230f47cf8c2378f6f1241d57309618562 OK
docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md a48bf5457bf17cf5d554e541c5bb3609efacf6ad170ad6e56950b829a4269ccc OK
docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md da8f4c8c35f617898368b340d710188686c9dc9faf2b23c4a6b284c1bb4d93fc OK
docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md 472f3179c20f7f41c0e3feb5a65842bf3774cf6df01e8684a3ea86dcd811bce0 OK
AGENTS.md 0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca OK
items 40 hash mismatches 0
````



013-prompt-digests.log · SHA-256 c1072cb93c48fbc96feeef0ebecaaa2d7a08ab4fc5d94f706a1cc4c6e57d45b6

````text
builder-prompt-m0-admission-codex-macbook.md: OK
DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md: OK
m0-record-r3.ts: OK
````



014-release-digests.log · SHA-256 6d2d9887291fe0fdaa51417d51153055f45a2c05a5279b240595ca7c4d73fba3

````text
README.md: OK
docs/build-log-0.1.1.md: OK
docs/build-log-0.1.2.md: OK
docs/provider-fields.md: OK
docs/registration-proposal.md: OK
docs/samples/README.md: OK
docs/samples/anthropic-model-refused-opencode-go.jsonl: OK
docs/samples/domain-unresolved-ollama.jsonl: OK
docs/samples/refused-host-non-plan-kimi.jsonl: OK
docs/samples/refused-host-redirect-qwen.jsonl: OK
docs/samples/require-model-mismatch-minimax.jsonl: OK
docs/samples/reviewer-turn-mistral.jsonl: OK
docs/samples/reviewer-turn-ollama.jsonl: OK
docs/samples/reviewer-turn-opencode-go.jsonl: OK
docs/samples/reviewer-turn-zai.jsonl: OK
src/agent.ts: OK
src/auth.ts: OK
src/authstatus.ts: OK
src/build.ts: OK
src/cli.ts: OK
src/domain.ts: OK
src/errors.ts: OK
src/events.ts: OK
src/http.ts: OK
src/main.ts: OK
src/profiles.ts: OK
src/redact.ts: OK
src/tools.ts: OK
src/version.ts: OK
src/wire/anthropic.ts: OK
src/wire/index.ts: OK
src/wire/ollama.ts: OK
src/wire/openai.ts: OK
src/wire/types.ts: OK
````


3. Base code and release evidence follow with their source line numbers.

packages/protocol/src/adapter-registry.ts


023-registration.log · SHA-256 41d5e4bdc0e084c3bb88208f650370b6f9393796ef9ea3222758cb2472ec33d3

````text
    78	const MADV_SURFACE_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
    79	  surface: parseSurfaceId("madv-surface"),
    80	  executable_name: "madv-surface",
    81	  provider: "minimax",
    82	  supported_versions: ["0.1.1"],
    83	  identity_probe: {
    84	    argv: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--profile", "minimax", "--require-model", "--role", "reviewer", "--no-session-persistence", "--max-turns", "1"],
    85	    parse: "json",
    86	  },
    87	  auth_readiness_probe: { argv: ["auth", "status", "--profile", "minimax"], parse: "json" },
    88	  non_interactive_flags: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--profile", "minimax", "--require-model", "--role", "reviewer", "--no-session-persistence"],
    89	  environment_allowlist_ref: "madv-surface-v1",
    90	  independence_domain: "minimax",
    91	  organization_id: "minimax",
    92	  auth_failure_detection: [
    93	    "auth_status_exit_code:1",
    94	    "auth_status.verified:false",
    95	    "system/auth_failed",
    96	    "exit_code:5",
    97	  ],
    98	  limitations: [
    99	    "A provider that misreports its own model remains a limitation.",
   100	    "What the provider retains is the provider's.",
   101	    "Both probes are live calls on the M Plan at every start.",
   102	  ],
   103	});
````


packages/adapter-madv-surface/src/index.ts


021-implementation.log · SHA-256 d9a39819f960941ac7c8d6faf5c45d6781858b8a8160168c6fcd5eaf0992eaa3

````text
     6	export interface MadvContext {
     7	  readonly executionId: string;
     8	  readonly sessionId: string;
     9	  readonly model: string;
    10	  readonly supportedVersions: readonly string[];
    11	  readonly provider: string;
    12	  readonly independenceDomain: string;
    13	}
(lines omitted)
    85	  constructor(context: MadvContext, private readonly now: () => number = () => performance.now()) {
    86	    this.context = Object.freeze({ ...context, supportedVersions: Object.freeze([...context.supportedVersions]) });
    87	    this.sentAt = now();
    88	  }
(lines omitted)
   106	  push(chunk: string | Uint8Array): MadvResult {
   107	    if (this.finished) { this.fail("identity_mismatch", "event_after_exit"); return this.snapshot(); }
   108	    this.checkDeadline();
   109	    try {
   110	      this.buffer += typeof chunk === "string" ? chunk : this.decoder.decode(chunk, { stream: true });
   111	      let newline: number;
   112	      while ((newline = this.buffer.indexOf("\n")) >= 0) {
   113	        const line = this.buffer.slice(0, newline); this.buffer = this.buffer.slice(newline + 1);
   114	        if (line.trim()) this.line(line);
   115	      }
   116	      // The largest release tool-result event is capped at 100 KB.
   117	      if (this.buffer.length > 262_144) this.fail("identity_mismatch", "oversized_event");
   118	    } catch { this.fail("identity_mismatch", "malformed_stream"); }
   119	    return this.snapshot();
   120	  }
(lines omitted)
   137	    if (this.state === "init") {
   138	      // B3 item 4: evaluate the first-init predicates in their stated order.
   139	      if (value.type !== "system" || value.subtype !== "init"
   140	        || value.surface !== "madv-surface"
   141	        || typeof value.surface_version !== "string" || !this.context.supportedVersions.includes(value.surface_version)
   142	        || value.profile !== "minimax" || value.provider !== this.context.provider
   143	        || value.endpoint_host !== "api.minimax.io" || value.requested_model !== this.context.model) {
   144	        this.fail("identity_mismatch", "init_predicate"); return;
   145	      }
   146	      this.wireSession = value.session_id; this.state = "waiting";
   147	    } else if (value.type === "model_response") {
   148	      if (this.state !== "waiting" && !(this.state === "tools" && this.tools.size === 0)) { this.fail("identity_mismatch", "event_order"); return; }
   149	      if (typeof value.response_model !== "string" || value.response_model.length === 0) { this.fail("identity_unavailable", "model_field_absent"); return; }
   150	      if (/(?:^|[/:.])claude|anthropic/i.test(value.response_model)) { this.fail("model_refused", "anthropic_model"); return; }
   151	      if (!/^minimax[-_]/i.test(value.response_model)) { this.fail("domain_unresolved", "unknown_family"); return; }
   152	      if (value.response_model !== this.context.model
   153	        || value.response_independence_domain !== this.context.independenceDomain
   154	        || value.provider !== this.context.provider || value.profile !== "minimax"
   155	        || value.endpoint_host !== "api.minimax.io" || value.tls_verified_host !== "api.minimax.io") {
   156	        this.fail("identity_mismatch", "response_predicate"); return;
   157	      }
   158	      this.responses++; this.waitingForEvidence = false; this.state = "response"; this.assistantSeen = false;
(lines omitted)
   179	  finish(exitCode: number, signal: string | number | null = null): MadvResult {
   180	    if (!this.finished) {
   181	      try { this.buffer += this.decoder.decode(); } catch { this.fail("identity_mismatch", "malformed_stream"); }
   182	      if (this.buffer.trim()) this.line(this.buffer);
   183	      this.buffer = ""; this.checkDeadline(); this.finished = true;
   184	      if (signal !== null) this.fail("provider_error", "signal");
   185	      switch (exitCode) {
   186	        case 0: break;
   187	        case 5: this.fail("auth_failed", "exit"); break;
   188	        case 6: this.fail("endpoint_refused", "exit"); break;
   189	        case 1: this.fail("provider_error", "exit"); break;
   190	        case 3: this.fail("identity_unavailable", "exit"); break;
   191	        case 7: if (this.failed?.cause !== "domain_unresolved") this.fail("model_refused", "exit"); break;
   192	        case 4: this.fail("identity_mismatch", "exit"); break;
   193	        default: this.fail("provider_error", "unknown_exit");
   194	      }
   195	      if (!this.failed && (this.responses === 0 || this.waitingForEvidence)) this.fail("identity_unavailable", "model_response_missing");
   196	      if (!this.failed && this.tools.size !== 0) this.fail("identity_mismatch", "event_order");
   197	    }
   198	    return this.snapshot();
   199	  }
   200	}
   201	export function parseMadvIdentity(output: string, model: string, supportedVersions: readonly string[], exitCode = 0, signal: string | number | null = null): MadvResult {
   202	  const parser = new MadvSurfaceParser({ executionId: "identity-probe", sessionId: "preflight", model, supportedVersions, provider: "minimax", independenceDomain: "minimax" });
   203	  parser.push(output);
   204	  return parser.finish(exitCode, signal);
   205	}
   206	export function parseMadvAuthReadiness(output: string, exitCode = 0, signal: string | number | null = null): MadvResult {
   207	  const context = { executionId: "auth-probe", sessionId: "preflight" };
   208	  try {
   209	    const value: unknown = JSON.parse(output);
   210	    if (exitCode !== 0 || signal !== null || !object(value)
   211	      || value.loggedIn !== true || value.authMethod !== "plan_key" || value.profile !== "minimax"
   212	      || value.provider !== "minimax" || value.endpointHost !== "api.minimax.io"
   213	      || value.verified !== true || value.verifyMethod !== "read_only_endpoint") return failure(context, "auth_failed", "auth_predicate");
   214	    return Object.freeze({ ok: true, events: Object.freeze([]), modelResponses: 0 });
   215	  } catch { return failure(context, "auth_failed", "auth_predicate"); }
   216	}
````


packages/supervisor/src/attestation.ts


024-supervisor.log · SHA-256 30918564b96df34280772f4ec8ebdc39feb917c3ee30cdb4cd3d29c235f08222

````text
    47	const EXECUTION_MS = 5_000;
    48	const CLEANUP_MS = 1_000;
    49	const GRACE_MS = 500;
    50	const STREAM_LIMIT = 65_536;
(lines omitted)
    90	  const madv = request.registration?.surface === "madv-surface";
    91	  const executionMs = madv ? 30_000 : EXECUTION_MS;
(lines omitted)
   155	      const cleanupStart = rt.now();
   156	      const end = Math.min(cleanupStart + CLEANUP_MS, started + executionMs + CLEANUP_MS);
   157	      if (!exitObserved) { try { process.kill("SIGTERM"); } catch { streamFailure = true; } }
   158	      let completion = await deadline(reaped, Math.min(cleanupStart + GRACE_MS, end));
   159	      if (completion !== "reaped") {
   160	        if (!exitObserved) { try { process.kill("SIGKILL"); } catch { streamFailure = true; } }
   161	        completion = await deadline(reaped, end);
   162	      }
   163	      clean = reason === "identity" && completion === "reaped" && rt.now() <= end;
   164	    }
   165	    if (!clean || request.signal.aborted || streamFailure || oversized || !exitObserved || exitCode !== 0 || signal !== null) return result(false);
(lines omitted)
   168	    const accepted = madv
   169	      ? request.kind === "identity"
   170	        ? parseMadvIdentity(output, request.model, request.supportedVersions).ok
   171	        : parseMadvAuthReadiness(output).ok
   172	      : request.kind === "identity"
   173	        ? parseIdentity(output, request.model, request.supportedVersions)
````


packages/supervisor/src/environment.ts


025-env.log · SHA-256 c568c2fec014e2c5fdbaac2989ddbeb8edd2f77665f84af2bda2616139193023

````text
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
````


packages/adapter-madv-surface/test/recorded.test.ts


022-recorded-tests.log · SHA-256 9baa8e3f96d13323540edf913728b90382738a675dab7c9bf119028987bd3a42

````text
     1	import { expect, spyOn, test } from "bun:test";
     2	import { readFileSync } from "node:fs";
     3	import { parseMadvAuthReadiness, parseMadvIdentity } from "../src/index";
     4
     5	// These are the Founder's sanitized recorded bytes, not synthetic streams.
     6	// SANITIZE.txt replaced UUID-shaped session_id values only: MacBook stdout
     7	// 04/05/06/07 has 4/4/4/7 replacements; Ubuntu has 4/7/4/4.
     8	// Capture 03, every stderr and every status has zero replacements.
     9	// No replaced UUID is recovered, and no fixture is normalized for admission.
    10	const model = "MiniMax-M3.1-Flash";
    11	const retired = "MiniMax-M3.1-Flash-Preview";
    12	function fixture(host: string, capture: string) {
    13	  const root = new URL("./fixtures/recorded/" + host + "/", import.meta.url);
    14	  const read = (suffix: string) => readFileSync(new URL(capture + "." + suffix, root), "utf8");
    15	  const fields = new Map(read("status").trimEnd().split("\n").map(line => {
    16	    const equals = line.indexOf("=");
    17	    return [line.slice(0, equals), line.slice(equals + 1)];
    18	  }));
    19	  expect(fields.get("timed_out")).toBe("no");
    20	  expect(read("stderr")).toBe("");
    21	  const exit = Number(fields.get("exit"));
    22	  const signal = fields.get("signal") === "none" ? null : fields.get("signal")!;
    23	  return { output: read("stdout"), exit, signal };
    24	}
    25
    26	for (const host of ["macbook", "ubuntu"]) {
    27	  test(host + " 03 recorded auth-readiness passes", () => {
    28	    const f = fixture(host, "03");
    29	    expect(parseMadvAuthReadiness(f.output, f.exit, f.signal).ok).toBe(true);
    30	  });
    31	}
    32	for (const [host, capture] of [
    33	  ["macbook", "04"], ["macbook", "05"], ["macbook", "06"],
    34	  ["ubuntu", "04"], ["ubuntu", "06"],
    35	]) {
    36	  test(host + " " + capture + " recorded identity passes for MiniMax-M3.1-Flash", () => {
    37	    const f = fixture(host!, capture!);
    38	    expect(parseMadvIdentity(f.output, model, ["0.1.1"], f.exit, f.signal).ok).toBe(true);
    39	  });
    40	}
    41	test("ubuntu 05 recorded identity fails closed with provider_error", () => {
    42	  const f = fixture("ubuntu", "05");
    43	  const result = parseMadvIdentity(f.output, model, ["0.1.1"], f.exit, f.signal);
    44	  expect(result.ok).toBe(false);
    45	  if (result.ok) throw new Error("failed identity was admitted");
    46	  expect(result.cause).toBe("provider_error");
    47	  expect(result.interrupt).toBe("whole_session");
    48	  expect(result.retry).toBe(false);
    49	});
    50
    51	for (const host of ["macbook", "ubuntu"]) {
    52	  for (const requested of [retired, model]) {
    53	    const cause = host === "macbook" ? "provider_error" : "identity_mismatch";
    54	    test(host + " 07 fails closed with " + cause + " for " + requested + " while reporting MiniMax-M3.1-Flash", () => {
    55	      const f = fixture(host, "07");
    56	      const observed = new Array<string>();
    57	      const originalParse = JSON.parse;
    58	      // Failure results intentionally expose no event payload. Observe the
    59	      // values decoded by the adapter without changing or accepting them.
    60	      // Restore this observation seam even when an assertion fails.
    61	      const observer = spyOn(JSON, "parse").mockImplementation((...args: Parameters<typeof JSON.parse>) => {
    62	        const event = originalParse(...args);
    63	        if (event?.type === "model_response") observed.push(event.response_model);
    64	        return event;
    65	      });
    66	      let result: ReturnType<typeof parseMadvIdentity>;
    67	      try {
    68	        result = parseMadvIdentity(f.output, requested, ["0.1.1"], f.exit, f.signal);
    69	      } finally {
    70	        observer.mockRestore();
    71	      }
    72	      expect(result.ok).toBe(false);
    73	      if (result.ok) throw new Error("retired-id stream was admitted");
    74	      expect(result.cause).toBe(cause);
    75	      expect(result.interrupt).toBe("whole_session");
    76	      expect(result.retry).toBe(false);
    77	      expect(observed).toEqual([model]);
    78	    });
    79	  }
    80	}
````


Base test lines


026-base-tests.log · SHA-256 e6c6bef4bbd3384766c0185bca6a74468db03d25d6c397791f01b9935a9969b2

````text
HEAD:packages/adapter-madv-surface/test/parser.test.ts:5:const context = { executionId: "execution", sessionId: "governed-session", model, supportedVersions: ["0.1.1"], provider: "minimax", independenceDomain: "minimax" };
HEAD:packages/adapter-madv-surface/test/parser.test.ts:7:const init = (change: Record<string, unknown> = {}) => ({ ...stamp, type: "system", subtype: "init", surface: "madv-surface", surface_version: "0.1.1", binary_sha256: "a".repeat(64), profile: "minimax", provider: "minimax", endpoint_host: "api.minimax.io", requested_model: model, role: "reviewer", tools: [], ...change });
HEAD:packages/adapter-madv-surface/test/parser.test.ts:53:    for (const value of [undefined, null, 42, "wrong"]) expect(parseMadvIdentity(wire(init({ [field]: value }), response()), model, ["0.1.1"]).ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:58:    for (const value of [undefined, null, 42, field === "response_model" ? "MiniMax-other" : "wrong"]) expect(parseMadvIdentity(wire(init(), response({ [field]: value })), model, ["0.1.1"]).ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:73:  expect(parseMadvIdentity(wire(init()), model, ["0.1.1"]).ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:74:  expect(parseMadvIdentity(wire(init(), response()), model, ["0.1.1"], 1).ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:75:  expect(parseMadvIdentity(wire(init(), response()), model, ["0.1.1"], 0, "SIGTERM").ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:76:  expect(parseMadvIdentity(wire(init(), response()), model, ["0.1.1"]).ok).toBe(true);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:111:  expect(parseMadvIdentity(wire(...example.events), model, ["0.1.1"]).ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:130:  expect(parseMadvIdentity(wire(init(), response()) + "{broken\n", model, ["0.1.1"]).ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:134:    const result = parseMadvIdentity(wire(init(), response()), model, ["0.1.1"], exit);
HEAD:packages/adapter-madv-surface/test/recorded.test.ts:38:    expect(parseMadvIdentity(f.output, model, ["0.1.1"], f.exit, f.signal).ok).toBe(true);
HEAD:packages/adapter-madv-surface/test/recorded.test.ts:43:  const result = parseMadvIdentity(f.output, model, ["0.1.1"], f.exit, f.signal);
HEAD:packages/adapter-madv-surface/test/recorded.test.ts:68:        result = parseMadvIdentity(f.output, requested, ["0.1.1"], f.exit, f.signal);
HEAD:packages/protocol/test/adapter-registry.test.ts:43:  identity_probe: { argv: ["config", "get", "model"], parse: "kv" },
HEAD:packages/protocol/test/adapter-registry.test.ts:84:    expect(Object.isFrozen(entry.identity_probe.argv)).toBe(true);
HEAD:packages/protocol/test/adapter-registry.test.ts:132:    provider: "minimax", supported_versions: ["0.1.1"],
HEAD:packages/protocol/test/adapter-registry.test.ts:134:      argv: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--profile", "minimax", "--require-model", "--role", "reviewer", "--no-session-persistence", "--max-turns", "1"],
HEAD:packages/protocol/test/pair-constraints.test.ts:332:    identity_probe: { argv: [], parse: "json" }, auth_readiness_probe: null,
HEAD:packages/supervisor/test/madv-preflight-support.ts:15:    supported_versions: ["0.1.1"], environment_allowlist_ref: "madv-surface-v1",
HEAD:packages/supervisor/test/madv-preflight.test.ts:47:  expect(madv[0]!.arguments).toEqual([...f.reg.identity_probe.argv, "--model", MODEL]);
HEAD:packages/supervisor/test/madv-preflight.test.ts:63:  f.input.observedHostFacts = { [f.reg.surface]: { binary_sha256: digest, cli_version: "0.1.1", host } };
HEAD:packages/supervisor/test/madv-preflight.test.ts:65:    requested_model: MODEL, cli_version: "0.1.1", binary_path: join(f.bin, f.reg.executable_name), binary_sha256: digest,
HEAD:packages/supervisor/test/madv-probes.test.ts:9:const init = { ...stamp, type: "system", subtype: "init", surface: "madv-surface", surface_version: "0.1.1", binary_sha256: "a".repeat(64), role: "reviewer", tools: [], profile: "minimax", provider: "minimax", endpoint_host: "api.minimax.io", requested_model: model };
HEAD:packages/supervisor/test/madv-probes.test.ts:14:  return { executablePath: "/controlled-not-run", arguments: kind === "identity" ? [...registration.identity_probe.argv, "--model", model] : registration.auth_readiness_probe!.argv,
HEAD:packages/supervisor/test/preflight.test.ts:67:      return { ...r, identity_probe: { argv: [], parse: "json" }, auth_readiness_probe: { argv: ["auth", "status"], parse: "json" }, non_interactive_flags: [], supported_versions: ["2.1.325"] } as AdapterRegistrationV1;
HEAD:packages/supervisor/test/preflight.test.ts:86:    identity_probe: { argv: [], parse: "json" }, auth_readiness_probe: { argv: ["auth", "status"], parse: "json" },
HEAD:test/phase3a/evidence-pipeline.test.ts:827:      `madbridge-claude-v5 ${registration.identity_probe.argv.join(" ")} --model ${record.requested_model}`,
HEAD:test/phase3a/harness-separation.test.ts:431:    expect(Object.isFrozen(registration.identity_probe.argv)).toBe(true);
HEAD:test/phase3a/runtime-harness.ts:51:  identity_probe: { argv: [], parse: "json" as const },
````


Release reference


029-release-behavior.log · SHA-256 3d71d78d017f91e732eee940d47d2a807322a324c5d0dc37862735c4a6baaa1a

````text
reference/madv-surface/src/agent.ts:166:    tools: tools.map((t) => t.name),
reference/madv-surface/src/agent.ts:224:      tools: messageTools,
reference/madv-surface/src/agent.ts:320:        throw new SurfaceError("provider_error", "unexpected_tool_call");
reference/madv-surface/README.md:13:- Pass `--no-tools` with either role for a text-only run. The initial tool list is empty and every request tells the model to answer in text. Combining it with `--allow-shell` is a usage error (exit 2).
reference/madv-surface/README.md:15:- A tool call in response to a request that offered no tools ends the run before dispatch. The surface emits `system/provider_error` with code `unexpected_tool_call`, writes an error result, and exits 1.
reference/madv-surface/README.md:132:    [--require-model [<model>]] [--max-turns N] [--no-tools | --allow-shell] \
reference/madv-surface/README.md:149:| `--no-tools` | Offer no tools for any message. Valid with either role and incompatible with `--allow-shell`. |
reference/madv-surface/src/cli.ts:34:      [--require-model [<model>]] [--max-turns N] [--no-tools | --allow-shell] \\
reference/madv-surface/src/cli.ts:74:  --no-tools                Offer no tools and answer in text. Valid with either role.
reference/madv-surface/src/cli.ts:141:      case "--no-tools":
reference/madv-surface/src/cli.ts:174:  if (noTools && allowShell) throw new UsageError("--no-tools cannot be combined with --allow-shell");
````


Manifest header. The table has 30 data rows.


030-fixture-manifest.log · SHA-256 27921c929f74105c664835676c6353a40d0665e35682007ef8be6aacad875b70

````text
fixture	sha256	evidence_path	json-account-identifiers	email-addresses	token-patterns	uuid
````


4. Each manifest row passed the byte check. The walk found exactly the indexed paths.


032-fixture-check.log · SHA-256 42f75db7be9474025ca77ff257c1f7c26aa5be690274502716c07daab40c7f45

````text
macbook/03.stdout: OK
macbook/03.stderr: OK
macbook/03.status: OK
macbook/04.stdout: OK
macbook/04.stderr: OK
macbook/04.status: OK
macbook/05.stdout: OK
macbook/05.stderr: OK
macbook/05.status: OK
macbook/06.stdout: OK
macbook/06.stderr: OK
macbook/06.status: OK
macbook/07.stdout: OK
macbook/07.stderr: OK
macbook/07.status: OK
ubuntu/03.stdout: OK
ubuntu/03.stderr: OK
ubuntu/03.status: OK
ubuntu/04.stdout: OK
ubuntu/04.stderr: OK
ubuntu/04.status: OK
ubuntu/05.stdout: OK
ubuntu/05.stderr: OK
ubuntu/05.status: OK
ubuntu/06.stdout: OK
ubuntu/06.stderr: OK
ubuntu/06.status: OK
ubuntu/07.stdout: OK
ubuntu/07.stderr: OK
ubuntu/07.status: OK
30 manifest rows
````


5. Source imports, symbol uses and the three calls in the M0 record reader follow. The repository-wide search in 044-all-callers.log · SHA-256 254f8fefd7b1f7cc5f421542e2b1b309c6fa0aca4132119d23f6620d09b497e5 also covers documentation.


033-consumers.log · SHA-256 cfa29d8391740c3d84b48b0b4fe96cfa73f635930a508e1594a2334f8435246c

````text
HEAD:bun.lock:105:    "packages/adapter-madv-surface": {
HEAD:bun.lock:106:      "name": "@madventures/adapter-madv-surface",
HEAD:bun.lock:207:        "@madventures/adapter-madv-surface": "workspace:*",
HEAD:bun.lock:300:    "@madventures/adapter-madv-surface": ["@madventures/adapter-madv-surface@workspace:packages/adapter-madv-surface"],
HEAD:packages/adapter-madv-surface/package.json:2:  "name": "@madventures/adapter-madv-surface",
HEAD:packages/adapter-madv-surface/src/index.ts:49:export function encodeUserInput(text: string): string {
HEAD:packages/adapter-madv-surface/src/index.ts:69:export class MadvSurfaceParser {
HEAD:packages/adapter-madv-surface/src/index.ts:201:export function parseMadvIdentity(output: string, model: string, supportedVersions: readonly string[], exitCode = 0, signal: string | number | null = null): MadvResult {
HEAD:packages/adapter-madv-surface/src/index.ts:202:  const parser = new MadvSurfaceParser({ executionId: "identity-probe", sessionId: "preflight", model, supportedVersions, provider: "minimax", independenceDomain: "minimax" });
HEAD:packages/adapter-madv-surface/src/index.ts:206:export function parseMadvAuthReadiness(output: string, exitCode = 0, signal: string | number | null = null): MadvResult {
HEAD:packages/adapter-madv-surface/test/parser.test.ts:2:import { encodeUserInput, MadvSurfaceParser, parseMadvIdentity, parseMadvAuthReadiness, type MadvFailureCause } from "../src/index";
HEAD:packages/adapter-madv-surface/test/parser.test.ts:15:    const encoded = encodeUserInput(text);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:21:  const parser = new MadvSurfaceParser(context);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:43:  const parser = new MadvSurfaceParser(context); parser.push(wire(init(), ...example.events));
HEAD:packages/adapter-madv-surface/test/parser.test.ts:53:    for (const value of [undefined, null, 42, "wrong"]) expect(parseMadvIdentity(wire(init({ [field]: value }), response()), model, ["0.1.1"]).ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:58:    for (const value of [undefined, null, 42, field === "response_model" ? "MiniMax-other" : "wrong"]) expect(parseMadvIdentity(wire(init(), response({ [field]: value })), model, ["0.1.1"]).ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:62:  for (const value of [undefined, null, false, 42, "wrong"]) expect(parseMadvAuthReadiness(JSON.stringify({ ...auth, [field]: value })).ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:65:  expect(parseMadvAuthReadiness(JSON.stringify({ ...auth, extra: "not-evidence" })).ok).toBe(true);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:68:  for (const text of ["", "null", "[]", "{}", "not-json", JSON.stringify(auth) + "\n" + JSON.stringify(auth)]) expect(parseMadvAuthReadiness(text).ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:69:  expect(parseMadvAuthReadiness(JSON.stringify(auth), 1).ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:70:  expect(parseMadvAuthReadiness(JSON.stringify(auth), 0, "SIGTERM").ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:73:  expect(parseMadvIdentity(wire(init()), model, ["0.1.1"]).ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:74:  expect(parseMadvIdentity(wire(init(), response()), model, ["0.1.1"], 1).ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:75:  expect(parseMadvIdentity(wire(init(), response()), model, ["0.1.1"], 0, "SIGTERM").ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:76:  expect(parseMadvIdentity(wire(init(), response()), model, ["0.1.1"]).ok).toBe(true);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:79:  let now = 0; const parser = new MadvSurfaceParser(context, () => now);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:86:  let now = 0; const parser = new MadvSurfaceParser(context, () => now);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:92:  const parser = new MadvSurfaceParser(context);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:111:  expect(parseMadvIdentity(wire(...example.events), model, ["0.1.1"]).ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:114:  const parser = new MadvSurfaceParser(context);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:120:  const parser = new MadvSurfaceParser(context);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:126:  const parser = new MadvSurfaceParser(context);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:130:  expect(parseMadvIdentity(wire(init(), response()) + "{broken\n", model, ["0.1.1"]).ok).toBe(false);
HEAD:packages/adapter-madv-surface/test/parser.test.ts:134:    const result = parseMadvIdentity(wire(init(), response()), model, ["0.1.1"], exit);
HEAD:packages/adapter-madv-surface/test/recorded.test.ts:3:import { parseMadvAuthReadiness, parseMadvIdentity } from "../src/index";
HEAD:packages/adapter-madv-surface/test/recorded.test.ts:29:    expect(parseMadvAuthReadiness(f.output, f.exit, f.signal).ok).toBe(true);
HEAD:packages/adapter-madv-surface/test/recorded.test.ts:38:    expect(parseMadvIdentity(f.output, model, ["0.1.1"], f.exit, f.signal).ok).toBe(true);
HEAD:packages/adapter-madv-surface/test/recorded.test.ts:43:  const result = parseMadvIdentity(f.output, model, ["0.1.1"], f.exit, f.signal);
HEAD:packages/adapter-madv-surface/test/recorded.test.ts:66:      let result: ReturnType<typeof parseMadvIdentity>;
HEAD:packages/adapter-madv-surface/test/recorded.test.ts:68:        result = parseMadvIdentity(f.output, requested, ["0.1.1"], f.exit, f.signal);
HEAD:packages/supervisor/package.json:7:    "@madventures/adapter-madv-surface": "workspace:*",
HEAD:packages/supervisor/src/attestation.ts:2:import { encodeUserInput, parseMadvIdentity, parseMadvAuthReadiness } from "@madventures/adapter-madv-surface";
HEAD:packages/supervisor/src/attestation.ts:7:export const MADV_IDENTITY_PROBE_INPUT = encodeUserInput("Reply with your model identifier and nothing else.");
HEAD:packages/supervisor/src/attestation.ts:170:        ? parseMadvIdentity(output, request.model, request.supportedVersions).ok
HEAD:packages/supervisor/src/attestation.ts:171:        : parseMadvAuthReadiness(output).ok
HEAD:packages/supervisor/test/madv-preflight.test.ts:6:import { encodeUserInput } from "@madventures/adapter-madv-surface";
HEAD:packages/supervisor/test/madv-preflight.test.ts:48:  expect(madv[0]!.stdin).toBe(encodeUserInput("Reply with your model identifier and nothing else."));
HEAD:packages/supervisor/test/madv-probes.test.ts:3:import { encodeUserInput } from "@madventures/adapter-madv-surface";
HEAD:packages/supervisor/test/madv-probes.test.ts:15:    environment: Object.freeze({}), stdin: kind === "auth" ? "" : surface === "madv-surface" ? encodeUserInput("Reply with your model identifier and nothing else.") : IDENTITY_PROBE_INPUT,
HEAD:tsconfig.json:35:      "@madventures/adapter-madv-surface": ["./packages/adapter-madv-surface/src/index.ts"],
168:    auth = check("capture 03 auth parser", clean(3) && adapter.parseMadvAuthReadiness(get(3).stdout, get(3).exit, get(3).signal).ok);
169:    const input = adapter.encodeUserInput("Reply with your model identifier and nothing else.");
174:      const accepted = check("capture " + n + " identity parser", clean(n) && adapter.parseMadvIdentity(get(n).stdout, model, registration.supported_versions, get(n).exit, get(n).signal).ok);
````


6. Host architecture


017-host.log · SHA-256 3f21e453d4eb497d8e6419ad7e9553e77f06fbc3570b7d5551d921845383f9fb

````text
Darwin arm64
````


7. Frozen baseline


035-base-lock.log · SHA-256 338f056f0f3693e0f0e9776e5e3c06ed72c034ebbd27cd90fb7e82551026cd9a

````text
a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock
````



047-baseline-runtime.log · SHA-256 7e64125fca3d2b20f594b5a030934b58927d5cf304b05add00f69035816a27f8

````text
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
````



048-baseline-install.log · SHA-256 4aa8521e67c060aeffba46a9333e7920deee70d2fe645badf918e03fb631a1f9

````text
bun install v1.4.2 (744846f84)

+ @types/bun@1.4.2
+ @types/react@19.3.0
+ @types/react-test-renderer@19.3.0
+ react-test-renderer@19.3.0
+ @opentui/core@0.5.11
+ @opentui/react@0.5.11
+ react@19.3.0
+ typescript@5.9.3

51 packages installed [159.00ms]
````



049-baseline-lock.log · SHA-256 75edbd4be13626f07c47ee8918de90a81baddc78fe2692b0cfdd9663f8eec390

````text
a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock
````



050-install-tree.log · SHA-256 048ee6a5d17fd305fe35bb75793dd9e35dc91da296510c4bf16fa021786ca7b6

````text
 mode change 100644 => 100755 packages/founder-act/src/main.ts
````



052-restore-install-mode.log · SHA-256 1e5f05198ff7991bbc4193848f57d7fac603eba2ba3b2decd3bf7d95449ab97e

````text

````



053-restored-install-status.log · SHA-256 f40927db56752d939f2edb5650adc0feced72d35e9391b045e2074613590da7f

````text

````



054-baseline-typecheck.log · SHA-256 c3e574a48e6317385c4073746305410ea654d419e684c518986f0932b2a7eb8f

````text

````



055-baseline-suite-runtime.log · SHA-256 8a8698a19fad5f5ece629af1e0e9cbdbb59868e02dad42f46b2cb5bbcaa93520

````text
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
````



056-baseline-wait.log · SHA-256 09d5641b26801da98f8e8b0757712ea01d71b746f894e7482e7b7589841bc82c

````text
14:40  8 users, load averages: 1.36 1.55 1.99
````



057-baseline-suite.log · SHA-256 4d249629ce62ce478b4d581332645acee24271f00fe97e104e8096e03c17b39d

````text
 2027 pass
 0 fail
 27336 expect() calls
Ran 2027 tests across 147 files. [184.07s]
````


Bun printed every individual result. The timing-free base list is 071-base-list.log · SHA-256 40c337b7b22cebbc7dff8783392e36a7e7670b3c805f0a7ab2081be52a2c4a52.

### Task detail

### R1 · registration and pinned callers

Change supported_versions and identity_probe.argv in packages/protocol/src/adapter-registry.ts. Add “madv-surface 0.1.2 reserves --no-tools for the identity probe” to packages/protocol/test/adapter-registry.test.ts. Spell out the eleven launch arguments independently. Check the version, both vectors and the absence of --no-tools from launch. Run the existing registry, madv-probes and madv-preflight tests against the new registration. Update only the version or argument values that cause an existing assertion to fail. Break 1 removes the probe flag. Break 2 adds it to launch.

### R2 · probe and launch evidence

In packages/adapter-madv-surface/src/index.ts, use an optional boolean on MadvContext. This passes the production parseMadvIdentity caller's intent into the shared state machine while preserving the constructor and function signatures. The probe sets it in its own code. A launch uses the existing default. Check the init tool array after the existing init predicates. Require a non-empty response_id with the response predicates, after the model, Anthropic and family checks. Match claude or anthropic anywhere, case-insensitively.

Append three cases to packages/adapter-madv-surface/test/parser.test.ts, reusing its synthetic stream builders. Their names are “identity requires an empty tool array while a governed launch accepts tools”, “probe and launch require a non-empty string response_id on every response” and “Claude and Anthropic ids are refused before family resolution”. Collect the causes for all six ids in one assertion. In recorded.test.ts exercise both parser entry points for MacBook 04, 05 and 06 and Ubuntu 04 and 06, preserving version 0.1.1. Use the name “HOST NN recorded tools fail probe identity and pass a governed launch”. Check the other captures against the parser's existing cause precedence. Breaks 3–7 disable the probe guard, apply it to launches, accept missing response_id, restore the old Anthropic expression and remove the anthropic alternative.

### R3 · supervisor behavior and fixture integrity

Add packages/supervisor/test/madv-intervals.test.ts with “madv-surface identity keeps 500 ms grace and 1000 ms cleanup” and the corresponding auth case. Control the probe clock and spawned process through ProbeRuntime. Observe SIGTERM, SIGKILL and completion against fake timer deadlines. Add “madv-surface-v1 selects exactly the B6 variable set” in packages/supervisor/test/madv-allowlist.test.ts. Supply a synthetic value for every variable the selector asks for, including any new name, then compare the selected keys as a set. Add “recorded manifest covers every fixture and matches its SHA-256” in packages/adapter-madv-surface/test/fixture-integrity.test.ts. Walk the recorded directory, compare relative paths in both directions, reject duplicate manifest rows and hash each file's original bytes. Phase 1 covers M0's folder.

Breaks 8 and 9 shorten only the madv-surface timing budgets. Break 10 adds an optional variable to its list. The earlier probe and environment files run separately under their breaks. Break 11 is declined under B4. Both existing environment suites already assert that LC_CTYPE survives when supplied, so they cannot pass the requested removal. Break 12 is declined under B4. With the new init predicate, Ubuntu 05 fails identity at init, its ordinary result event is ignored after failure, and exit 1 supplies provider_error. Changing exit to 0 removes that cause, so the existing recorded test cannot pass under the break. The Founder retains both breaks at the final commit.

### R4 · scratch record reader

Copy the supplied M0 script to record/m0-admission-record.ts. Replace only the madv-surface path, both release hashes and the two version pins. Delete only the one-turn exception, its auxiliary checks and its limitation. Require a clean exit for capture 07. Compare the full source and unified diff. Run eight synthetic MacBook folders using the head's registration, with no write option. Check a passing folder, unexpected_tool_call, the retired turn-limit exception, a retired-model echo, tools in capture 04, the old version, the old hash and a manifest mismatch. The last three must exit with a refusal. The first four negative identity cases must print failed identity and overall results.

### Command record through the opening


| Log and command | Load reading | Exit | SHA-256 |
| --- | --- | --- | --- |
| 001-cli-version.log · /Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version | 14:31  8 users, load averages: 1.60 2.55 2.55 | 0 | 4177ccbd71226a743f8d562eb04ac791599205ce83fb0fb082893afec986f2f0 |
| 002-pwd.log · pwd | 14:31  8 users, load averages: 1.47 2.51 2.53 | 0 | 3864d27a8fab651bcd096138b30ad1867954e5e304058c8da8b2734e7803152c |
| 003-branch.log · git -C tui branch --show-current | 14:31  8 users, load averages: 1.47 2.51 2.53 | 0 | 77bdd0280762ef1210e7749764b23c132e2072c50f29429de5e86f15ca9241a8 |
| 004-head.log · git -C tui rev-parse HEAD | 14:31  8 users, load averages: 1.47 2.51 2.53 | 0 | c87499956ae798a0d175f72a2d70fd8fb66fac270ba10f155403c1fb15ffe815 |
| 005-user-name.log · git -C tui config user.name | 14:31  8 users, load averages: 1.47 2.51 2.53 | 0 | c8236b701e2cd8fa2f88faf7997e82486acb0f9547d104f6e0b70b7b7e77ce62 |
| 006-user-email.log · git -C tui config user.email | 14:31  8 users, load averages: 1.47 2.51 2.53 | 0 | 4249d689e095e6781ce42f7c27ed6d2cfb1162ff72c3da3f379702664c737285 |
| 007-runtime.log · command -v bun && command -v bunx && shasum -a 256 "$(command -v bun)" && bun --version && bun -e 'process.stdout.write(Bun.revision)' | 14:31  up  5:59, 8 users, load averages: 1.46 2.47 2.52 | 0 | 1f36c92027e3092358d7bc85c5322dbf1b0fab0bbfcdc3213e05ea438322c425 |
| 008-commission.log · git -C tui show HEAD:docs/decisions/DEC-20261121-02-madv-surface-admission.md | 14:32  8 users, load averages: 1.73 2.46 2.51 | 0 | ead286517b3af6aea954c31ba44684e9f8cfcfd6ed88ba7f4bd449690945af67 |
| 009-addendum.log · cat prompt/DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md | 14:32  8 users, load averages: 1.73 2.46 2.51 | 0 | a79427959011449823dd674ffa4fa24e7151068012892e2f0841061525aeaa10 |
| 010-manifests.log · cat prompt/SHA256.txt reference/madv-surface/SHA256.txt | 14:32  8 users, load averages: 1.73 2.46 2.51 | 0 | 1dd031a2faea261714651de5e04a160fe3fbf70d574b5460006bd9f5355c28ca |
| 011-agents.log · git -C tui show HEAD:AGENTS.md | 14:32  8 users, load averages: 1.73 2.46 2.51 | 0 | 7a4c448ac180653aef5aa2a8d12f85ad73183b08d7a24c5c22fa8832c221796c |
| 012-authority-inventory.log · git -C tui ls-tree -r --name-only HEAD docs/decisions docs/superpowers \| rg 'DEC-202611(21\|19\|15\|14\|13\|12\|08)\|DEC-2026110(2-02\|4-02)\|DEC-202610(13-03\|15-03\|20-01\|23-01\|27-01)\|PLAN-OPEN-[23]-\|2026-(08-12-phase-3a-runtime-foundation-design\|09-19-phase-3b-live-tui-integration)' | 14:32  8 users, load averages: 1.62 2.38 2.48 | 0 | 3abdc92a5640a821bd9b9827bcedbd7aadf2b3be967f1cf2e2b3c5d22843292d |
| 013-prompt-digests.log · (cd prompt && shasum -a 256 -c SHA256.txt) | 14:32  8 users, load averages: 1.62 2.38 2.48 | 0 | c1072cb93c48fbc96feeef0ebecaaa2d7a08ab4fc5d94f706a1cc4c6e57d45b6 |
| 014-release-digests.log · (cd reference/madv-surface && shasum -a 256 -c SHA256.txt && diff -u <(cut -c 67- SHA256.txt \| sort) <(rg --hidden --files --no-ignore -g '!SHA256.txt' \| sort)) | 14:32  8 users, load averages: 1.62 2.38 2.48 | 0 | 6d2d9887291fe0fdaa51417d51153055f45a2c05a5279b240595ca7c4d73fba3 |
| 015-ancestry.log · git -C tui rev-parse origin/main origin/main^1 && git -C tui merge-base --is-ancestor 403a9f536539b96115aa44ab82436fe55d95b739 origin/main && git -C tui diff --name-only 403a9f536539b96115aa44ab82436fe55d95b739 origin/main | 14:32  8 users, load averages: 1.62 2.38 2.48 | 0 | 58b5c2f4eb1128b0f6f4a38c012d9512dd805adbc1af1ca6a62be543b498d740 |
| 016-checkout.log · git -C tui status --porcelain=v1 && git -C tui stash list && git -C tui branch -r && test ! -e tui/docs/verification/phase-3b-m0-admission-build-log.md && test ! -e tui/docs/verification/phase-3b-m0-admission-investigation.md && test ! -e tui/packages/adapter-madv-surface/test/fixtures/recorded-0.1.2 && ls -A pr record && ls -A logs | 14:32  8 users, load averages: 1.62 2.38 2.48 | 0 | 7e77d470cddad0a1c5f2fa4ab319339fbf9bb66466c0bba2ccb3cd328c302c39 |
| 017-host.log · uname -sm | 14:32  8 users, load averages: 1.62 2.38 2.48 | 0 | 3f21e453d4eb497d8e6419ad7e9553e77f06fbc3570b7d5551d921845383f9fb |
| 018-evidence-headers.log · rg -n '^AUTHORITY\|^1\. docs/decisions\|^2\. prompt\|^11\. These\|^18\. The Phase\|^19\. AGENTS\|^PRECONDITIONS' prompt/builder-prompt-m0-admission-codex-macbook.md | 14:32  8 users, load averages: 1.62 2.38 2.48 | 0 | 91ba271a48aff05684acff8992b7014bfd739014f6c01f2d642597af9e27142c |
| 019-authority-check.log · python3 - <<'PY' | 14:32  8 users, load averages: 1.56 2.33 2.46 | 0 | a5986336fafb9c789b3816f2d64dc10663d22625027ac3104e9287f3926cd8e4 |
| 020-record-source.log · cat -n prompt/m0-record-r3.ts | 14:32  8 users, load averages: 1.56 2.33 2.46 | 0 | 5d69752e5a6ba6f287949b06cc832d88a2dea227e68b04b3c50c168a5a3b3c9c |
| 021-implementation.log · git -C tui show HEAD:packages/adapter-madv-surface/src/index.ts \| nl -ba | 14:32  8 users, load averages: 1.56 2.33 2.46 | 0 | d9a39819f960941ac7c8d6faf5c45d6781858b8a8160168c6fcd5eaf0992eaa3 |
| 022-recorded-tests.log · git -C tui show HEAD:packages/adapter-madv-surface/test/recorded.test.ts \| nl -ba | 14:32  8 users, load averages: 1.56 2.33 2.46 | 0 | 9baa8e3f96d13323540edf913728b90382738a675dab7c9bf119028987bd3a42 |
| 023-registration.log · git -C tui show HEAD:packages/protocol/src/adapter-registry.ts \| nl -ba \| sed -n '78,103p' | 14:33  8 users, load averages: 1.25 2.21 2.41 | 0 | 41d5e4bdc0e084c3bb88208f650370b6f9393796ef9ea3222758cb2472ec33d3 |
| 024-supervisor.log · git -C tui show HEAD:packages/supervisor/src/attestation.ts \| nl -ba | 14:33  8 users, load averages: 1.25 2.21 2.41 | 0 | 30918564b96df34280772f4ec8ebdc39feb917c3ee30cdb4cd3d29c235f08222 |
| 025-env.log · git -C tui show HEAD:packages/supervisor/src/environment.ts \| nl -ba \| sed -n '1,65p' | 14:33  8 users, load averages: 1.25 2.21 2.41 | 0 | c568c2fec014e2c5fdbaac2989ddbeb8edd2f77665f84af2bda2616139193023 |
| 026-base-tests.log · git -C tui grep -n -E '0\.1\.1\|identity_probe.{0,24}(args\|argv)\|--max-turns' HEAD -- ':(glob)**/test/**/*.ts' ':(glob)test/**/*.ts' | 14:33  8 users, load averages: 1.25 2.21 2.41 | 0 | e6c6bef4bbd3384766c0185bca6a74468db03d25d6c397791f01b9935a9969b2 |
| 027-existing-probes.log · git -C tui show HEAD:packages/supervisor/test/madv-probes.test.ts \| nl -ba | 14:33  8 users, load averages: 1.25 2.21 2.41 | 0 | 23e0974e647106b113affeedc9d0409755cf3bccc5dba04a14a33209c2a83692 |
| 028-existing-parser.log · git -C tui show HEAD:packages/adapter-madv-surface/test/parser.test.ts \| nl -ba | 14:33  8 users, load averages: 1.25 2.21 2.41 | 0 | 3351429bf0b964711581ac2d1799c11c62a7e5bac0f8433ce5988a850c9a0a6d |
| 029-release-behavior.log · rg -n -- '--no-tools\|unexpected_tool_call\|tools:\|tools .*system/init' reference/madv-surface/README.md reference/madv-surface/src/agent.ts reference/madv-surface/src/cli.ts reference/madv-surface/docs/provider-fields.md | 14:33  8 users, load averages: 1.25 2.21 2.41 | 0 | 3d71d78d017f91e732eee940d47d2a807322a324c5d0dc37862735c4a6baaa1a |
| 030-fixture-manifest.log · git -C tui show HEAD:packages/adapter-madv-surface/test/fixtures/recorded/manifest.tsv | 14:33  8 users, load averages: 1.25 2.21 2.41 | 0 | 27921c929f74105c664835676c6353a40d0665e35682007ef8be6aacad875b70 |
| 031-record-logic.log · sed -n '163,208p;257,318p' prompt/m0-record-r3.ts | 14:33  8 users, load averages: 1.25 2.21 2.41 | 0 | 7053d13d21b9be4e0c4e9f6ef772589cb7f65bcab39933b3f4e2da0bd3258624 |
| 032-fixture-check.log · (cd tui/packages/adapter-madv-surface/test/fixtures/recorded && awk -F '\t' 'NR>1{print $2"  "$1}' manifest.tsv \| shasum -a 256 -c - && diff -u <(tail -n +2 manifest.tsv \| cut -f 1 \| sort) <(rg --files --hidden --no-ignore -g '!manifest.tsv' \| sort) && awk 'END{print NR-1, "manifest rows"}' manifest.tsv) | 14:33  8 users, load averages: 1.32 2.12 2.38 | 0 | 42f75db7be9474025ca77ff257c1f7c26aa5be690274502716c07daab40c7f45 |
| 033-consumers.log · git -C tui grep -n -E '(@madventures/adapter-madv-surface\|packages/adapter-madv-surface\|MadvSurfaceParser\|parseMadvIdentity\|parseMadvAuthReadiness\|encodeUserInput)' HEAD -- ':!docs' && rg -n 'MadvSurfaceParser\|parseMadvIdentity\|parseMadvAuthReadiness\|encodeUserInput' prompt/m0-record-r3.ts | 14:33  8 users, load averages: 1.32 2.12 2.38 | 0 | cfa29d8391740c3d84b48b0b4fe96cfa73f635930a508e1594a2334f8435246c |
| 034-standing-rules.log · git -C tui show HEAD:docs/decisions/DEC-20261023-01-standing-build-rules.md | 14:33  8 users, load averages: 1.32 2.12 2.38 | 0 | b6a6bbfdfdae3392809dd74a2d4c167f3c411c523e4bfb6a74a09a8e926a5a55 |
| 035-base-lock.log · shasum -a 256 tui/bun.lock | 14:33  8 users, load averages: 1.32 2.12 2.38 | 0 | 338f056f0f3693e0f0e9776e5e3c06ed72c034ebbd27cd90fb7e82551026cd9a |
| 036-scratch.log · mktemp -d /private/tmp/m0-admission-r1.XXXXXXXX | 14:33  8 users, load averages: 1.32 2.12 2.38 | 0 | 983584f7283f767c03c81d36c660d09d4f59a46b694324f607960b80d868f79e |
| 037-governed-settings.log · for rul in 2-codex-harness 3-image-tool 4-sandbox-halt 5-own-work 6-names-in-text 10-second-verdict 11-governed-build; do git -C tui show "HEAD:docs/decisions/DEC-20261108-03-addendum-$rul.md" \| sed -E 's/(list\|read\|view\|spawn)_[a-z_]+\|mcp__[a-z_]+/the six names of Addendum 2 B4/g' \|\| exit 1; done | 14:33  8 users, load averages: 1.32 2.12 2.38 | 0 | 9a8cb29e39bcf00069388615c0eb29aa7fbf6aa53b255d477631e2aeffe2f43b |
| 038-probe-findings.log · git -C tui show HEAD:docs/decisions/DEC-20261119-01-m0-records-and-merge.md \| sed -n '/^A7\./,/^A8\./p' | 14:33  8 users, load averages: 1.32 2.12 2.38 | 0 | 0e4d4c080eb09ea28df65f059580e3a24c40d4039735e97376ee78d44fded106 |
| 039-review-inputs.log · git -C tui show HEAD:docs/decisions/DEC-20261108-03-phase-3b-h1.md \| rg -A8 '^B10\.' | 14:33  8 users, load averages: 1.32 2.12 2.38 | 0 | ae2192e7e817201e93733082e92049044d0dc175183c38b83fc617affa5af029 |
| 040-allowlist-tests.log · git -C tui show HEAD:packages/supervisor/test/environment.test.ts \| nl -ba | 14:34  8 users, load averages: 1.44 2.08 2.35 | 0 | 5f1f4d75068d9eaa110d8d0799ca158247e9ac6e7a888878f465a7abd146daaa |
| 041-other-allowlist-tests.log · rg -l 'LC_CTYPE\|madv-surface-v1' tui/packages/supervisor/test && cat logs/036-scratch.log && cat logs/035-base-lock.log | 14:34  8 users, load averages: 1.44 2.08 2.35 | 0 | f7aaf455001f2dc15d69b491d142785694f1a74fab783759d4cb9c0a66e5bc3d |
| 042-review-behavior.log · git -C tui show HEAD:packages/supervisor/src/attestation.ts \| sed -n '25,179p' | 14:34  8 users, load averages: 1.44 2.08 2.35 | 0 | e457fb0e805f04131c8d38c4799dcaa373ff0d2282656ec9dd16ab9d75aec671 |
| 043-command-helpers.log · Create the command logging, runtime verification and load-wait functions in the disposable directory | 14:34  8 users, load averages: 1.48 2.02 2.32 | 0 | 098e2142f7a07f9dac8491414cd415eaf97e54d417bfc2d92bdc71934edd1b24 |
| 044-all-callers.log · git -C tui grep -n -E 'from ["\x27][^"\x27]*(/adapter-madv-surface)\|MadvSurfaceParser\|parseMadvIdentity\|parseMadvAuthReadiness\|encodeUserInput' HEAD \| sed -E 's/(list\|read\|view\|spawn)_(mcp_[a-z_]+\|image\|agent)\|([a-z]+__)?codex_[a-z]{3}/the six names of Addendum 2 B4/g' | 14:34  8 users, load averages: 1.85 2.08 2.34 | 0 | 254f8fefd7b1f7cc5f421542e2b1b309c6fa0aca4132119d23f6620d09b497e5 |
| 045-governing-detail.log · git -C tui show HEAD:docs/decisions/DEC-20261115-02-phase-3b-m0.md \| sed -n '/^B2\./,/^B7\./p' | 14:34  8 users, load averages: 1.85 2.08 2.34 | 0 | b427434222c96c90c81d9ef03f71a4595e9b3ff5da7ee8f2b31c58d5c94c33ed |
| 046-reference-implementation.log · rg -n '^#\|--no-tools\|system/init\|unexpected_tool_call\|response_id\|error_max_turns\|stderr\|exit code' reference/madv-surface/README.md reference/madv-surface/docs/provider-fields.md | 14:34  8 users, load averages: 1.85 2.08 2.34 | 0 | 166d7e015e5140cdce8956a6e7815261f63fdf8d8fb43f3ae97ae495852cabd4 |
| 047-baseline-runtime.log · runtime_check | 14:38  up  6:05, 8 users, load averages: 1.41 1.75 2.14 | 0 | 7e64125fca3d2b20f594b5a030934b58927d5cf304b05add00f69035816a27f8 |
| 048-baseline-install.log · bun install --frozen-lockfile | 14:40  up  6:07, 8 users, load averages: 0.98 1.49 1.98 | 0 | 4aa8521e67c060aeffba46a9333e7920deee70d2fe645badf918e03fb631a1f9 |
| 049-baseline-lock.log · shasum -a 256 tui/bun.lock | 14:40  8 users, load averages: 1.06 1.50 1.98 | 0 | 75edbd4be13626f07c47ee8918de90a81baddc78fe2692b0cfdd9663f8eec390 |
| 050-install-tree.log · git -C tui diff --summary | 14:40  8 users, load averages: 1.06 1.50 1.98 | 0 | 048ee6a5d17fd305fe35bb75793dd9e35dc91da296510c4bf16fa021786ca7b6 |
| 051-install-status.log · git -C tui status --short | 14:40  8 users, load averages: 1.06 1.50 1.98 | 0 | 72215e080157497ad58049ef9297d7be98ec0593afef01630cbe19c9fe85d7cc |
| 052-restore-install-mode.log · git -C tui checkout -- packages/founder-act/src/main.ts | 14:40  8 users, load averages: 1.37 1.56 2.00 | 0 | 1e5f05198ff7991bbc4193848f57d7fac603eba2ba3b2decd3bf7d95449ab97e |
| 053-restored-install-status.log · git -C tui status --short | 14:40  8 users, load averages: 1.37 1.56 2.00 | 0 | f40927db56752d939f2edb5650adc0feced72d35e9391b045e2074613590da7f |
| 054-baseline-typecheck.log · bunx tsc --noEmit | 14:40  up  6:08, 8 users, load averages: 1.34 1.55 1.99 | 0 | c3e574a48e6317385c4073746305410ea654d419e684c518986f0932b2a7eb8f |
| 055-baseline-suite-runtime.log · runtime_check | 14:40  up  6:08, 8 users, load averages: 1.36 1.55 1.99 | 0 | 8a8698a19fad5f5ece629af1e0e9cbdbb59868e02dad42f46b2cb5bbcaa93520 |
| 056-baseline-wait.log · load_wait | 14:40  8 users, load averages: 1.36 1.55 1.99 | 0 | 09d5641b26801da98f8e8b0757712ea01d71b746f894e7482e7b7589841bc82c |
| 057-baseline-suite.log · bun test | 14:40  up  6:08, 8 users, load averages: 1.50 1.57 1.99 | 0 | 4d249629ce62ce478b4d581332645acee24271f00fe97e104e8096e03c17b39d |
| 058-task-design-inputs.log · git -C tui show HEAD:packages/supervisor/test/madv-environment.test.ts | 14:41  8 users, load averages: 1.73 1.62 2.00 | 0 | 2dfe7a3f07984c8ce4c1123a63e53a2a9bedca04cfbaa1939bdb8987fc1d8d46 |
| 059-runtime-test-api.log · git -C tui grep -n -E useFakeTimers\|advanceTimersByTime\|runAllTimers HEAD -- *.test.ts | 14:41  8 users, load averages: 1.73 1.62 2.00 | 0 | 0acb6d5500d1218b5cc8ed3351ba0f60471e8245a57bd0e79341114585056ab1 |
| 060-fixture-selection.log · git -C tui show HEAD:packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.status | 14:41  8 users, load averages: 1.73 1.62 2.00 | 0 | 030a07d69ae6e8f12d5dfd5cf356ae1c4753f3a362829e94d5820afa8811a1c3 |
| 061-registered-test.log · git -C tui show HEAD:packages/protocol/test/adapter-registry.test.ts | 14:41  8 users, load averages: 1.73 1.62 2.00 | 0 | 3b279b30892160a9d3eb4dbfb542e3476a9265b9e1dde8b8cfdedc15425e305d |
| 062-test-locations.log · rg -n ^test\(\|^export function\|^export const tui/packages/supervisor/test/madv-preflight.test.ts tui/packages/supervisor/src/environment.ts | 14:41  8 users, load averages: 1.88 1.66 2.01 | 0 | b7a54337108fe5892f8ea960ff4278541be8d7fa2950af1b272fa2539ca71070 |
| 063-interval-base-test.log · git -C tui show HEAD:packages/supervisor/test/attestation.test.ts | 14:41  8 users, load averages: 1.88 1.66 2.01 | 0 | e9ff6b6469eccdf98a4257c64b573c82a6fe18881b4e5dad68061cbff0ba2389 |
| 064-reference-scope.log · rg -n A4\.\|B6\.\|B12\.\|scope\|FROZEN\|deferred tui/docs/decisions/DEC-20261115-02-phase-3b-m0.md | 14:41  8 users, load averages: 1.88 1.66 2.01 | 0 | f31edcd1325006013cb22f882b86ab0837f441e9b1e88a5614e203bec08deef3 |
| 065-allowlist-implementation.log · sed -n 66,143p tui/packages/supervisor/src/environment.ts | 14:41  5 users, load averages: 1.97 1.68 2.01 | 0 | b0a13e43659e1485384c59cb734ae1ed19745373b3df2b686754297e98aaa2cd |
| 066-record-emission.log · sed -n 256,320p prompt/m0-record-r3.ts | 14:41  5 users, load averages: 1.97 1.68 2.01 | 0 | d536e9031b92be592e8376efc1cdb13ea1849d974fb264f8361995b15c2d3d08 |
| 067-preflight-pin-test.log · sed -n 55,80p tui/packages/supervisor/test/madv-preflight.test.ts | 14:41  5 users, load averages: 1.97 1.68 2.01 | 0 | 400b3eaf6b82110a5e3c066bda4602d59968ad14c5d1a1a4a97e59ea42b76283 |
| 068-progress-count.log · rg -c ^\((fail\|skip\|todo)\) logs/057-baseline-suite.log | 14:41  4 users, load averages: 1.54 1.60 1.98 | 1 | 3f2edb5aa246b0904f56eb09cb2867f8d094eb679baa7d2f5bf603fc966f608c |
| 069-build-test-list.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/tests.py | 14:42  4 users, load averages: 2.28 1.75 2.02 | 0 | 4df83c38ffd2ec4bbb4fd63b749b443670a5353093c0369102c3219f4f4a3c3f |
| 070-evidence-writer.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/evidence.py | 14:43  4 users, load averages: 2.22 1.78 2.01 | 0 | c6aee3fd97606e11a9ef5d9476bcf9667b0931cd8cccaee46f9d6647fd50f5d4 |
| 071-base-list.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/tests.py logs/057-baseline-suite.log | 14:44  4 users, load averages: 2.61 1.96 2.06 | 0 | 40c337b7b22cebbc7dff8783392e36a7e7670b3c805f0a7ab2081be52a2c4a52 |
| 072-commit-tools.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/commit-tools.zsh | 14:43  4 users, load averages: 2.56 1.91 2.04 | 0 | c0313bbdd68d5c6cc1b9b6a9ccff7d838bd461ce83da1aa00e6df5843259c144 |


## Phase 1 completion

Implementation and complete offline verification at 6ebfc3060be33279fa3567563b6b0c8d48122b1c. The final documentation commit appends this section to the opening.

R1 changed MADV_SURFACE_REGISTRATION in packages/protocol/src/adapter-registry.ts. The version is 0.1.2 and the identity vector adds --no-tools immediately before --max-turns 1. Only the two required pins in packages/protocol/test/adapter-registry.test.ts and the init version at packages/supervisor/test/madv-probes.test.ts line 9 changed in existing registration coverage.

R2 changed MadvContext, MadvSurfaceParser.line and parseMadvIdentity in packages/adapter-madv-surface/src/index.ts. A module-private symbol selects the optional context predicate at the probe caller. The first init must then have an empty tools array. Both entry points apply the non-empty string response_id predicate after the model, Anthropic and family checks. The refusal expression is /claude|anthropic/i. The production parser signatures are preserved. New tests were appended to packages/adapter-madv-surface/test/parser.test.ts. In recorded.test.ts the import and five permitted cases now check both parser entry points. Ubuntu 05 and both 07 captures kept their original expected causes. Addendum 1 B1 and B4 govern those changes, SHA-256 b6b9563ed1a2e154b4ef3b4d9ffe7666e6fd9870d82b87486f772d65f7f167aa.

R3 added madv-intervals.test.ts and madv-allowlist.test.ts under packages/supervisor/test, and fixture-integrity.test.ts under packages/adapter-madv-surface/test. The interval tests observe SIGTERM, SIGKILL and stream cancellation against the injected clock. The environment test supplies a value for any requested variable and compares the selected key set. The manifest test compares both path inventories, rejects duplicate or malformed rows and hashes every fixture byte. The tests use the unchanged production runner and environment selector.

R4 copied the M0 reader outside the clone. The madv-surface binary path, hashes, version and version-output pins were updated. Capture 07 now requires clean exit, and its old one-turn exception and corresponding limitation were removed. The Claude Code branch, refusal paths and output format were preserved.

### New and changed tests

| File | Bun test name | Change | Ruling |
| --- | --- | --- | --- |
| packages/protocol/test/adapter-registry.test.ts | madv-surface registration matches DEC-20261115-02 field for field | Existing · changed version and probe argv | B2 and B4.1, B5.3 pin exception |
| packages/protocol/test/adapter-registry.test.ts | madv-surface 0.1.2 reserves --no-tools for the identity probe | Added | B2 and B4.1 |
| packages/supervisor/test/madv-probes.test.ts | madv-surface identity continues beyond init to natural exit | Existing · shared init pin at line 9 | B2 and B5.3 pin exception |
| packages/supervisor/test/madv-probes.test.ts | registration chooses 30 seconds beside Claude's 5 seconds | Existing · shared init pin at line 9 | B2 and B5.3 pin exception |
| packages/supervisor/test/madv-probes.test.ts | madv-surface identity failures map to identity_mismatch | Existing · shared init pin at line 9 | B2 and B5.3 pin exception |
| packages/supervisor/test/madv-probes.test.ts | madv-surface keeps both raw stream limits and metadata-only diagnostics | Existing · shared init pin at line 9 | B2 and B5.3 pin exception |
| packages/adapter-madv-surface/test/recorded.test.ts | macbook 04 recorded tools fail probe identity and pass a governed launch | Existing · renamed and checks both entry points | B4.2 and Addendum 1 B1 |
| packages/adapter-madv-surface/test/recorded.test.ts | macbook 05 recorded tools fail probe identity and pass a governed launch | Existing · renamed and checks both entry points | B4.2 and Addendum 1 B1 |
| packages/adapter-madv-surface/test/recorded.test.ts | macbook 06 recorded tools fail probe identity and pass a governed launch | Existing · renamed and checks both entry points | B4.2 and Addendum 1 B1 |
| packages/adapter-madv-surface/test/recorded.test.ts | ubuntu 04 recorded tools fail probe identity and pass a governed launch | Existing · renamed and checks both entry points | B4.2 and Addendum 1 B1 |
| packages/adapter-madv-surface/test/recorded.test.ts | ubuntu 06 recorded tools fail probe identity and pass a governed launch | Existing · renamed and checks both entry points | B4.2 and Addendum 1 B1 |
| packages/adapter-madv-surface/test/parser.test.ts | identity requires an empty tool array while a governed launch accepts tools | Added | B3, B4.2 |
| packages/adapter-madv-surface/test/parser.test.ts | probe and launch require a non-empty string response_id on every response | Added | B3, B4.3 |
| packages/adapter-madv-surface/test/parser.test.ts | Claude and Anthropic ids are refused before family resolution | Added | B3, B4.4 and Addendum 1 B2 |
| packages/supervisor/test/madv-intervals.test.ts | madv-surface identity keeps 500 ms grace and 1000 ms cleanup | Added | B4.5, DEC-20261119-01 A7.1 |
| packages/supervisor/test/madv-intervals.test.ts | madv-surface auth keeps 500 ms grace and 1000 ms cleanup | Added | B4.5, DEC-20261119-01 A7.1 |
| packages/supervisor/test/madv-allowlist.test.ts | madv-surface-v1 selects exactly the B6 variable set | Added | B4.6, DEC-20261119-01 A7.2 |
| packages/adapter-madv-surface/test/fixture-integrity.test.ts | recorded manifest covers every fixture and matches its SHA-256 | Added | B4.7, DEC-20261119-01 A7.3 |
| test/phase3a/harness-separation.test.ts | no file under apps/ or packages/*/src statically imports, command-dispatches to, or argument-gates runtime-harness | Existing · shared SHA-256 at line 24 | Addendum 2 B1 and B2 |
| test/phase3a/harness-separation.test.ts | no production file uses a dynamic import or environment-gated route to the test tree | Existing · shared SHA-256 at line 24 | Addendum 2 B1 and B2 |
| test/phase3a/harness-separation.test.ts | no production file constructs a filesystem path into the test tree | Existing · shared SHA-256 at line 24 | Addendum 2 B1 and B2 |

### Halt and first resumption

The Founder upheld the stop at log 253. He reported that installing two tools outside this build replaced the binary at /Users/michaeldaley/.bun/bin/bun with Bun 1.4.5, revision a7733435cf40429e3b35c36072769df2052b80f1, SHA-256 e2984124f1514e1e6bbda20adedbf07a02c443c6a5828853a15c7c7abf78e19f. Homebrew’s Bun changed at 01:32:07 UTC and his shell profile at 01:33:49 UTC on 2026-11-22. He stopped his programs and at 02:51:56 UTC moved the displaced binary to /Users/michaeldaley/bun-displaced-1.4.5-20261122T025156Z and restored Bun 1.4.2 from the published release. Its zip SHA-256 was 90987a3a16d7db556d886ac3d551e7b6d3edf0a1cf43acaed622e8676be1d12f. Bunx continued to link to the restored runtime. No builder command ran the displaced binary by path or changed the Founder’s profile or Homebrew installation.

The last passing check before the halt was log 244. The only later Bun commands preceding log 253 were the frozen install in log 246 and the typecheck in log 252. Both are excluded because the runtime under which they ran is uncertain. Log 253 exited on the unexpected digest before invoking Bun. Earlier runs stand under resume item 4.

The signed first resume message has SHA-256 be1771c3d03b5dfa225b808c21591d0bac519d08073cdc80b5d0dbe41ffd41e5. The original prompt has SHA-256 abf0766764f3587d9dd3de096749c2aa6249fc55cd455c3563e22c4744f300d2 at transfer commit 7c90de1501453f359a688be8439efd327abb3302, as the Founder identified it. The renamed halt report has SHA-256 c8e9327cbba2a9cf716bc6661f8ac4279bca7a80322904f71df1b146acb62fe1. The log of the failed runtime check has SHA-256 235cb6ddea4d8b0dc42cc82febe211aafc94cdc0d0e4af89f04ecf3135e8aba4. The resumed sandbox was workspace-write. The session was launched on-request and used per-command approvals. The restored runtime check at log 279 found the expected path, SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5, version 1.4.2 and revision 744846f844374847c902b5e7fd59b4342a51ef99.

Resume item 5 corrected the instruction on earlier R3 tests. Their actual results under a break are recorded. Breaks 11 and 12 were made and restored after the fourth commit at f73b5649afff86b558978cb76d09132bc0a7396a, out of the original order. This supersedes the two declines in the opening. All twelve breaks were made. Log 301 removed all node_modules directories under tui before the fresh frozen install. Git status remained clean.

logs/253-repeat-suite-runtime.log · SHA-256 235cb6ddea4d8b0dc42cc82febe211aafc94cdc0d0e4af89f04ecf3135e8aba4

````text
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
e2984124f1514e1e6bbda20adedbf07a02c443c6a5828853a15c7c7abf78e19f  /Users/michaeldaley/.bun/bin/bun
````

logs/279-resume-runtime.log · SHA-256 a4422a0f0b9a491bdddf69fb386c398154457a3b3a924469851418520dccdc8c

````text
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
````

logs/301-remove-node-modules.log · SHA-256 b05720f7fa0564f627551f37d81b335a3ca97e7f2f62784082977437a4bb3dd3

````text
Removing tui/node_modules
Removing tui/packages/honesty-compiler/node_modules
Removing tui/packages/ledger/node_modules
Removing tui/packages/broker/node_modules
Removing tui/packages/adapter-claude-code/node_modules
Removing tui/packages/artifact-store/node_modules
Removing tui/packages/storage/node_modules
Removing tui/packages/tui-chaos/node_modules
Removing tui/packages/single-verdict/node_modules
Removing tui/packages/adapter-antigravity/node_modules
Removing tui/packages/policy/node_modules
Removing tui/packages/supervisor/node_modules
Removing tui/packages/preflight/node_modules
Removing tui/apps/seal-studio/node_modules
Removing tui/apps/madv-agent/node_modules
Removing tui/apps/madbridge/node_modules
Removing tui/apps/projector-mc/node_modules
All dependency directories removed.
````

logs/302-after-removal-tree.log · SHA-256 32da89ff3cf0e91285e4f357c8b0b204803762fd80808e606c5314e943716582

````text

````

### Deliberate breaks

#### Break 1

Removing --no-tools from the probe shortened its required argument vector.

Diff quoted with trailing whitespace removed on each line.

logs/109-break-1-diff.log · SHA-256 1a9bfaae38b31ebd02a7ada50c4a360c947ab6851c8c5b50fe16bec90e8ff573

````text
diff --git a/packages/protocol/src/adapter-registry.ts b/packages/protocol/src/adapter-registry.ts
index 28effbc..3515d3f 100644
--- a/packages/protocol/src/adapter-registry.ts
+++ b/packages/protocol/src/adapter-registry.ts
@@ -81,7 +81,7 @@ const MADV_SURFACE_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
   provider: "minimax",
   supported_versions: ["0.1.2"],
   identity_probe: {
-    argv: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--profile", "minimax", "--require-model", "--role", "reviewer", "--no-session-persistence", "--no-tools", "--max-turns", "1"],
+    argv: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--profile", "minimax", "--require-model", "--role", "reviewer", "--no-session-persistence", "--max-turns", "1"],
     parse: "json",
   },
   auth_readiness_probe: { argv: ["auth", "status", "--profile", "minimax"], parse: "json" },
````


Named guard and all other cases in its file

logs/112-break-1-tests.log · SHA-256 f1b0fe1cd6de4c6661e3ddd87471772e79090f9d94a74c3d3cbcefbb7be93952

````text
bun test v1.4.2 (744846f84)

packages/protocol/test/adapter-registry.test.ts:
(pass) registry values are stored already normalized [0.31ms]
(pass) the registry contains exactly the three Founder-ratified surfaces [2.02ms]
(pass) claude-code registration matches the PLAN-OPEN-1 ruling field for field [0.24ms]
(pass) antigravity registration matches the PLAN-OPEN-1 ruling field for field [0.01ms]
(pass) registry entries and the registry are deeply frozen [2.45ms]
(pass) lookupRegistration returns the ratified entry and undefined for a syntactically valid unregistered surface [0.25ms]
(pass) registry membership cannot be mutated at runtime [2.75ms]
125 |   const sortedKeys: string[] = [...ADAPTER_REGISTRY.keys()].map(String).sort();
126 |   expect(sortedKeys).toEqual(["antigravity", "claude-code", "madv-surface"]);
127 | });
128 |
129 | test("madv-surface registration matches DEC-20261115-02 field for field", () => {
130 |   expect(ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))).toEqual({
                                                                     ^
error: expect(received).toEqual(expected)

  {
    "auth_failure_detection": [
      "auth_status_exit_code:1",
      "auth_status.verified:false",
      "system/auth_failed",
      "exit_code:5",
    ],
    "auth_readiness_probe": {
      "argv": [
        "auth",
        "status",
        "--profile",
        "minimax",
      ],
      "parse": "json",
    },
    "environment_allowlist_ref": "madv-surface-v1",
    "executable_name": "madv-surface",
    "identity_probe": {
      "argv": [
        "--print",
        "--input-format",
        "stream-json",
        "--output-format",
        "stream-json",
        "--profile",
        "minimax",
        "--require-model",
        "--role",
        "reviewer",
        "--no-session-persistence",
-       "--no-tools",
        "--max-turns",
        "1",
      ],
      "parse": "json",
    },
    "independence_domain": "minimax",
    "limitations": [
      "A provider that misreports its own model remains a limitation.",
      "What the provider retains is the provider's.",
      "Both probes are live calls on the M Plan at every start.",
    ],
    "non_interactive_flags": [
      "--print",
      "--input-format",
      "stream-json",
      "--output-format",
      "stream-json",
      "--profile",
      "minimax",
      "--require-model",
      "--role",
      "reviewer",
      "--no-session-persistence",
    ],
    "organization_id": "minimax",
    "provider": "minimax",
    "supported_versions": [
      "0.1.2",
    ],
    "surface": "madv-surface",
  }

- Expected  - 1
+ Received  + 0

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/protocol/test/adapter-registry.test.ts:130:64)
(fail) madv-surface registration matches DEC-20261115-02 field for field [5.78ms]
153 |     "--profile", "minimax", "--require-model", "--role", "reviewer", "--no-session-persistence",
154 |   ];
155 |   expect(entry.supported_versions).toEqual(["0.1.2"]);
156 |   expect(entry.non_interactive_flags).toEqual(launch);
157 |   expect(entry.non_interactive_flags).not.toContain("--no-tools");
158 |   expect(entry.identity_probe.argv).toEqual([...launch, "--no-tools", "--max-turns", "1"]);
                                          ^
error: expect(received).toEqual(expected)

  [
    "--print",
    "--input-format",
    "stream-json",
    "--output-format",
    "stream-json",
    "--profile",
    "minimax",
    "--require-model",
    "--role",
    "reviewer",
    "--no-session-persistence",
-   "--no-tools",
    "--max-turns",
    "1",
  ]

- Expected  - 1
+ Received  + 0

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/protocol/test/adapter-registry.test.ts:158:37)
(fail) madv-surface 0.1.2 reserves --no-tools for the identity probe [0.16ms]

 7 pass
 2 fail
 62 expect() calls
Ran 9 tests across 1 file. [68.00ms]
````


Restore and byte comparison

logs/114-break-1-restore.log · SHA-256 d16bcc0cf9fb1298e71e9f38024e81999e7fcafb5ae0896ca75508edd24a9d8f

````text
6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  tui/packages/protocol/src/adapter-registry.ts
6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  -
````


logs/123-registration-proof.log · SHA-256 15308c2beb230f6f76900150cdd634d38c786c5492e020d00d740d7ecae2dfbc

````text
git status --porcelain -- packages/protocol/src/adapter-registry.ts

HEAD 6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  - 6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  tui/packages/protocol/src/adapter-registry.ts
````

#### Break 2

Adding --no-tools to launch changed the eleven fixed arguments.

Diff quoted with trailing whitespace removed on each line.

logs/115-break-2-diff.log · SHA-256 5e7f3053b5a2e60da8dc97073f50b0fcc6af7ec70d5dc23a22216cb579bc423a

````text
diff --git a/packages/protocol/src/adapter-registry.ts b/packages/protocol/src/adapter-registry.ts
index 28effbc..5676f2d 100644
--- a/packages/protocol/src/adapter-registry.ts
+++ b/packages/protocol/src/adapter-registry.ts
@@ -85,7 +85,7 @@ const MADV_SURFACE_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
     parse: "json",
   },
   auth_readiness_probe: { argv: ["auth", "status", "--profile", "minimax"], parse: "json" },
-  non_interactive_flags: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--profile", "minimax", "--require-model", "--role", "reviewer", "--no-session-persistence"],
+  non_interactive_flags: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--profile", "minimax", "--require-model", "--role", "reviewer", "--no-session-persistence", "--no-tools"],
   environment_allowlist_ref: "madv-surface-v1",
   independence_domain: "minimax",
   organization_id: "minimax",
````


Named guard and all other cases in its file

logs/118-break-2-tests.log · SHA-256 e09635e00f056a9bd028c79ea7d9e8ee9c37743b34e848b19a63deef722b3ff2

````text
bun test v1.4.2 (744846f84)

packages/protocol/test/adapter-registry.test.ts:
(pass) registry values are stored already normalized [0.28ms]
(pass) the registry contains exactly the three Founder-ratified surfaces [2.33ms]
(pass) claude-code registration matches the PLAN-OPEN-1 ruling field for field [0.42ms]
(pass) antigravity registration matches the PLAN-OPEN-1 ruling field for field [0.03ms]
(pass) registry entries and the registry are deeply frozen [2.22ms]
(pass) lookupRegistration returns the ratified entry and undefined for a syntactically valid unregistered surface [0.22ms]
(pass) registry membership cannot be mutated at runtime [2.71ms]
125 |   const sortedKeys: string[] = [...ADAPTER_REGISTRY.keys()].map(String).sort();
126 |   expect(sortedKeys).toEqual(["antigravity", "claude-code", "madv-surface"]);
127 | });
128 |
129 | test("madv-surface registration matches DEC-20261115-02 field for field", () => {
130 |   expect(ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))).toEqual({
                                                                     ^
error: expect(received).toEqual(expected)

  {
    "auth_failure_detection": [
      "auth_status_exit_code:1",
      "auth_status.verified:false",
      "system/auth_failed",
      "exit_code:5",
    ],
    "auth_readiness_probe": {
      "argv": [
        "auth",
        "status",
        "--profile",
        "minimax",
      ],
      "parse": "json",
    },
    "environment_allowlist_ref": "madv-surface-v1",
    "executable_name": "madv-surface",
    "identity_probe": {
      "argv": [
        "--print",
        "--input-format",
        "stream-json",
        "--output-format",
        "stream-json",
        "--profile",
        "minimax",
        "--require-model",
        "--role",
        "reviewer",
        "--no-session-persistence",
        "--no-tools",
        "--max-turns",
        "1",
      ],
      "parse": "json",
    },
    "independence_domain": "minimax",
    "limitations": [
      "A provider that misreports its own model remains a limitation.",
      "What the provider retains is the provider's.",
      "Both probes are live calls on the M Plan at every start.",
    ],
    "non_interactive_flags": [
      "--print",
      "--input-format",
      "stream-json",
      "--output-format",
      "stream-json",
      "--profile",
      "minimax",
      "--require-model",
      "--role",
      "reviewer",
      "--no-session-persistence",
+     "--no-tools",
    ],
    "organization_id": "minimax",
    "provider": "minimax",
    "supported_versions": [
      "0.1.2",
    ],
    "surface": "madv-surface",
  }

- Expected  - 0
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/protocol/test/adapter-registry.test.ts:130:64)
(fail) madv-surface registration matches DEC-20261115-02 field for field [6.68ms]
151 |   const launch = [
152 |     "--print", "--input-format", "stream-json", "--output-format", "stream-json",
153 |     "--profile", "minimax", "--require-model", "--role", "reviewer", "--no-session-persistence",
154 |   ];
155 |   expect(entry.supported_versions).toEqual(["0.1.2"]);
156 |   expect(entry.non_interactive_flags).toEqual(launch);
                                            ^
error: expect(received).toEqual(expected)

  [
    "--print",
    "--input-format",
    "stream-json",
    "--output-format",
    "stream-json",
    "--profile",
    "minimax",
    "--require-model",
    "--role",
    "reviewer",
    "--no-session-persistence",
+   "--no-tools",
  ]

- Expected  - 0
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/protocol/test/adapter-registry.test.ts:156:39)
(fail) madv-surface 0.1.2 reserves --no-tools for the identity probe [0.09ms]

 7 pass
 2 fail
 60 expect() calls
Ran 9 tests across 1 file. [65.00ms]
````


Restore and byte comparison

logs/120-break-2-restore.log · SHA-256 24890aa40811ec4cc17423cb045aa6783208485678a34b887b4cac9d8bcd1141

````text
6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  tui/packages/protocol/src/adapter-registry.ts
6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  -
````


logs/123-registration-proof.log · SHA-256 15308c2beb230f6f76900150cdd634d38c786c5492e020d00d740d7ecae2dfbc

````text
git status --porcelain -- packages/protocol/src/adapter-registry.ts

HEAD 6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  - 6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4  tui/packages/protocol/src/adapter-registry.ts
````

#### Break 3

Disabling the probe predicate let an init with tools pass.

Diff quoted with trailing whitespace removed on each line.

logs/140-break-3-diff.log · SHA-256 45229ff474852fced53c4171036995986c19d36d1ed4b4a3df28becbc1fb38e7

````text
diff --git a/packages/adapter-madv-surface/src/index.ts b/packages/adapter-madv-surface/src/index.ts
index b825596..1066741 100644
--- a/packages/adapter-madv-surface/src/index.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -205,7 +205,7 @@ export class MadvSurfaceParser {
   }
 }
 export function parseMadvIdentity(output: string, model: string, supportedVersions: readonly string[], exitCode = 0, signal: string | number | null = null): MadvResult {
-  const parser = new MadvSurfaceParser({ [identityProbe]: true, executionId: "identity-probe", sessionId: "preflight", model, supportedVersions, provider: "minimax", independenceDomain: "minimax" });
+  const parser = new MadvSurfaceParser({ [identityProbe]: false, executionId: "identity-probe", sessionId: "preflight", model, supportedVersions, provider: "minimax", independenceDomain: "minimax" });
   parser.push(output);
   return parser.finish(exitCode, signal);
 }
````


Named guard and all other cases in its file

logs/143-break-3-tests.log · SHA-256 2b385f5538064cbfc0e9b9491fc15fd843f910950a4a1baaab2c6f851502be1c

````text
bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/parser.test.ts:
(pass) input encoder preserves one text in one newline-terminated user message [0.23ms]
(pass) valid identity evidence binds execution and session [0.77ms]
(pass) failure precedence: HTTP 401 [0.10ms]
(pass) failure precedence: HTTP 403 [0.04ms]
(pass) failure precedence: redirect [0.02ms]
(pass) failure precedence: HTTP error [0.01ms]
(pass) failure precedence: invalid body [0.01ms]
(pass) failure precedence: absent model [0.02ms]
(pass) failure precedence: Anthropic model [0.02ms]
(pass) failure precedence: unnamed family [0.02ms]
(pass) failure precedence: model mismatch [0.01ms]
(pass) failure precedence: domain mismatch [0.01ms]
(pass) identity rejects init surface [0.12ms]
(pass) identity rejects init surface_version [0.04ms]
(pass) identity rejects init profile [0.04ms]
(pass) identity rejects init provider [0.04ms]
(pass) identity rejects init endpoint_host [0.06ms]
(pass) identity rejects init requested_model [0.05ms]
(pass) identity rejects response response_model [0.24ms]
(pass) identity rejects response response_independence_domain [0.15ms]
(pass) identity rejects response tls_verified_host [0.10ms]
(pass) identity rejects response provider [0.04ms]
(pass) identity rejects response profile [0.04ms]
(pass) identity rejects response endpoint_host [0.04ms]
(pass) auth rejects loggedIn [0.07ms]
(pass) auth rejects authMethod
(pass) auth rejects profile
(pass) auth rejects provider
(pass) auth rejects endpointHost
(pass) auth rejects verified
(pass) auth rejects verifyMethod
(pass) auth accepts exactly the passing predicate and ignores additive metadata [0.01ms]
(pass) auth rejects malformed shape, nonzero exit and signal [0.14ms]
(pass) identity requires a model response and clean zero exit [0.11ms]
(pass) missing evidence fails at the 30-second deadline [0.09ms]
(pass) a new request starts its own evidence deadline without a second parser [0.10ms]
(pass) exit without evidence for a later request fails closed [0.07ms]
(pass) event order rejects missing init [0.02ms]
(pass) event order rejects duplicate init [0.04ms]
(pass) event order rejects out-of-session event [0.01ms]
(pass) event order rejects assistant before response [0.01ms]
(pass) event order rejects tool before response [0.01ms]
(pass) event order rejects unmatched tool result [0.01ms]
(pass) event order rejects response before pending tool result [0.02ms]
(pass) event order rejects duplicate tool id [0.02ms]
(pass) event order rejects result before response
(pass) a fail-closed event after valid evidence still interrupts [0.04ms]
(pass) every later response is checked before its tools [0.06ms]
(pass) stream chunks preserve UTF-8 and malformed JSON fails closed [1.25ms]
(pass) exit precedence fails closed without relying on an emitted event [0.11ms]
137 | });
138 |
139 | test("identity requires an empty tool array while a governed launch accepts tools", () => {
140 |   for (const tools of [["read_file"], undefined, null, "", {}]) {
141 |     const output = wire(init({ tools }), response());
142 |     expect(parseMadvIdentity(output, model, context.supportedVersions)).toMatchObject({
                                                                              ^
error: expect(received).toMatchObject(expected)

  {
-   "cause": "identity_mismatch",
-   "ok": false,
-   "reason": "init_tools",
+   "events": [
+     {
+       "event": {
+         "binary_sha256": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
+         "endpoint_host": "api.minimax.io",
+         "profile": "minimax",
+         "provider": "minimax",
+         "requested_model": "MiniMax-M3.1-Flash",
+         "role": "reviewer",
+         "session_id": "wire-session",
+         "subtype": "init",
+         "surface": "madv-surface",
+         "surface_version": "0.1.1",
+         "tools": [
+           "read_file",
+         ],
+         "ts": "2026-11-15T00:00:00.000Z",
+         "type": "system",
+       },
+       "executionId": "identity-probe",
+       "sessionId": "preflight",
+     },
+     {
+       "event": {
+         "endpoint_host": "api.minimax.io",
+         "profile": "minimax",
+         "provider": "minimax",
+         "response_id": "response",
+         "response_independence_domain": "minimax",
+         "response_maker": "minimax",
+         "response_model": "MiniMax-M3.1-Flash",
+         "session_id": "wire-session",
+         "tls_verified_host": "api.minimax.io",
+         "ts": "2026-11-15T00:00:00.000Z",
+         "type": "model_response",
+       },
+       "executionId": "identity-probe",
+       "sessionId": "preflight",
+     },
+   ],
+   "modelResponses": 1,
+   "ok": true,
  }

- Expected  - 3
+ Received  + 42

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/adapter-madv-surface/test/parser.test.ts:142:73)
(fail) identity requires an empty tool array while a governed launch accepts tools [0.83ms]
(pass) probe and launch require a non-empty string response_id on every response [0.18ms]
(pass) Claude and Anthropic ids are refused before family resolution [0.10ms]

1 tests failed:
(fail) identity requires an empty tool array while a governed launch accepts tools [0.83ms]

 52 pass
 1 fail
 237 expect() calls
Ran 53 tests across 1 file. [17.00ms]
````


Restore and byte comparison

logs/145-break-3-restore.log · SHA-256 ae238cbd4b26788e19e9973698ecfcfd351c9fe672a250cccff344fcd65103a8

````text
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  -
````


logs/171-parser-proof.log · SHA-256 78272ad12db3b211dc818decfd8e5960dd2d94f78a2234ccbbca6c8aa45a1c5b

````text
git status --porcelain -- packages/adapter-madv-surface/src/index.ts

HEAD 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  - 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
````

#### Break 4

Applying the predicate to all callers rejected a governed launch with tools.

Diff quoted with trailing whitespace removed on each line.

logs/146-break-4-diff.log · SHA-256 161ccda8215a088607264736a40058b9d982a58dc9fac3392c6998432d38543a

````text
diff --git a/packages/adapter-madv-surface/src/index.ts b/packages/adapter-madv-surface/src/index.ts
index b825596..13e3510 100644
--- a/packages/adapter-madv-surface/src/index.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -145,7 +145,7 @@ export class MadvSurfaceParser {
         || value.endpoint_host !== "api.minimax.io" || value.requested_model !== this.context.model) {
         this.fail("identity_mismatch", "init_predicate"); return;
       }
-      if (this.context[identityProbe] && (!Array.isArray(value.tools) || value.tools.length !== 0)) {
+      if (true && (!Array.isArray(value.tools) || value.tools.length !== 0)) {
         this.fail("identity_mismatch", "init_tools"); return;
       }
       this.wireSession = value.session_id; this.state = "waiting";
````


Named guard and all other cases in its file

logs/149-break-4-tests.log · SHA-256 bf8c0f0ffa462fa86add45e5a4e27800092b8c05ee9323c9b2c93435866cef56

````text
bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/parser.test.ts:
(pass) input encoder preserves one text in one newline-terminated user message [0.15ms]
(pass) valid identity evidence binds execution and session [0.74ms]
(pass) failure precedence: HTTP 401 [0.10ms]
(pass) failure precedence: HTTP 403 [0.04ms]
(pass) failure precedence: redirect [0.02ms]
(pass) failure precedence: HTTP error [0.01ms]
(pass) failure precedence: invalid body [0.01ms]
(pass) failure precedence: absent model [0.02ms]
(pass) failure precedence: Anthropic model [0.02ms]
(pass) failure precedence: unnamed family [0.02ms]
(pass) failure precedence: model mismatch [0.02ms]
(pass) failure precedence: domain mismatch [0.01ms]
(pass) identity rejects init surface [0.13ms]
(pass) identity rejects init surface_version [0.04ms]
(pass) identity rejects init profile [0.04ms]
(pass) identity rejects init provider [0.04ms]
(pass) identity rejects init endpoint_host [0.06ms]
(pass) identity rejects init requested_model [0.05ms]
(pass) identity rejects response response_model [0.12ms]
(pass) identity rejects response response_independence_domain [0.15ms]
(pass) identity rejects response tls_verified_host [0.05ms]
(pass) identity rejects response provider [0.04ms]
(pass) identity rejects response profile [0.04ms]
(pass) identity rejects response endpoint_host [0.04ms]
(pass) auth rejects loggedIn [0.07ms]
(pass) auth rejects authMethod
(pass) auth rejects profile
(pass) auth rejects provider
(pass) auth rejects endpointHost
(pass) auth rejects verified
(pass) auth rejects verifyMethod [0.02ms]
(pass) auth accepts exactly the passing predicate and ignores additive metadata [0.02ms]
(pass) auth rejects malformed shape, nonzero exit and signal [0.08ms]
(pass) identity requires a model response and clean zero exit [0.09ms]
(pass) missing evidence fails at the 30-second deadline [0.06ms]
(pass) a new request starts its own evidence deadline without a second parser [0.08ms]
(pass) exit without evidence for a later request fails closed [0.05ms]
(pass) event order rejects missing init [0.02ms]
(pass) event order rejects duplicate init [0.02ms]
(pass) event order rejects out-of-session event
(pass) event order rejects assistant before response
(pass) event order rejects tool before response [0.01ms]
(pass) event order rejects unmatched tool result [0.01ms]
(pass) event order rejects response before pending tool result [0.02ms]
(pass) event order rejects duplicate tool id [0.01ms]
(pass) event order rejects result before response
(pass) a fail-closed event after valid evidence still interrupts [0.03ms]
(pass) every later response is checked before its tools [0.06ms]
(pass) stream chunks preserve UTF-8 and malformed JSON fails closed [1.11ms]
(pass) exit precedence fails closed without relying on an emitted event [0.09ms]
144 |     });
145 |   }
146 |   expect(parseMadvIdentity(wire(init({ tools: [] }), response()), model, context.supportedVersions).ok).toBe(true);
147 |   const launch = new MadvSurfaceParser(context);
148 |   launch.push(wire(init({ tools: ["read_file"] }), response()));
149 |   expect(launch.finish(0).ok).toBe(true);
                                    ^
error: expect(received).toBe(expected)

Expected: true
Received: false

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/adapter-madv-surface/test/parser.test.ts:149:31)
(fail) identity requires an empty tool array while a governed launch accepts tools [0.32ms]
(pass) probe and launch require a non-empty string response_id on every response [0.16ms]
(pass) Claude and Anthropic ids are refused before family resolution [0.10ms]

1 tests failed:
(fail) identity requires an empty tool array while a governed launch accepts tools [0.32ms]

 52 pass
 1 fail
 243 expect() calls
Ran 53 tests across 1 file. [14.00ms]
````


Restore and byte comparison

logs/151-break-4-restore.log · SHA-256 663654d86cd76b987b56faebe2801b9d071ec885083e53988e1f81bdda5dc587

````text
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  -
````


logs/171-parser-proof.log · SHA-256 78272ad12db3b211dc818decfd8e5960dd2d94f78a2234ccbbca6c8aa45a1c5b

````text
git status --porcelain -- packages/adapter-madv-surface/src/index.ts

HEAD 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  - 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
````

#### Break 5

Accepting an absent response_id admitted a response without its required identifier.

Diff quoted with trailing whitespace removed on each line.

logs/152-break-5-diff.log · SHA-256 822f21b4ec0cfdbe545a334229099967b6e387957ba1fb5f2ccfcfd3bc704e7b

````text
diff --git a/packages/adapter-madv-surface/src/index.ts b/packages/adapter-madv-surface/src/index.ts
index b825596..25304dd 100644
--- a/packages/adapter-madv-surface/src/index.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -155,7 +155,7 @@ export class MadvSurfaceParser {
       if (/claude|anthropic/i.test(value.response_model)) { this.fail("model_refused", "anthropic_model"); return; }
       if (!/^minimax[-_]/i.test(value.response_model)) { this.fail("domain_unresolved", "unknown_family"); return; }
       if (value.response_model !== this.context.model
-        || typeof value.response_id !== "string" || value.response_id.length === 0
+        || (typeof value.response_id === "string" && value.response_id.length === 0)
         || value.response_independence_domain !== this.context.independenceDomain
         || value.provider !== this.context.provider || value.profile !== "minimax"
         || value.endpoint_host !== "api.minimax.io" || value.tls_verified_host !== "api.minimax.io") {
````


Named guard and all other cases in its file

logs/155-break-5-tests.log · SHA-256 cf0b0ca60e61019b2b7551927694b4829651b701acc1ce58d61dd6751b9bec35

````text
bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/parser.test.ts:
(pass) input encoder preserves one text in one newline-terminated user message [0.14ms]
(pass) valid identity evidence binds execution and session [0.71ms]
(pass) failure precedence: HTTP 401 [0.10ms]
(pass) failure precedence: HTTP 403 [0.04ms]
(pass) failure precedence: redirect [0.02ms]
(pass) failure precedence: HTTP error [0.01ms]
(pass) failure precedence: invalid body [0.01ms]
(pass) failure precedence: absent model [0.02ms]
(pass) failure precedence: Anthropic model [0.02ms]
(pass) failure precedence: unnamed family [0.02ms]
(pass) failure precedence: model mismatch [0.01ms]
(pass) failure precedence: domain mismatch [0.01ms]
(pass) identity rejects init surface [0.12ms]
(pass) identity rejects init surface_version [0.04ms]
(pass) identity rejects init profile [0.04ms]
(pass) identity rejects init provider [0.04ms]
(pass) identity rejects init endpoint_host [0.06ms]
(pass) identity rejects init requested_model [0.05ms]
(pass) identity rejects response response_model [0.20ms]
(pass) identity rejects response response_independence_domain [0.05ms]
(pass) identity rejects response tls_verified_host [0.05ms]
(pass) identity rejects response provider [0.04ms]
(pass) identity rejects response profile [0.25ms]
(pass) identity rejects response endpoint_host [0.06ms]
(pass) auth rejects loggedIn [0.18ms]
(pass) auth rejects authMethod
(pass) auth rejects profile
(pass) auth rejects provider
(pass) auth rejects endpointHost
(pass) auth rejects verified
(pass) auth rejects verifyMethod
(pass) auth accepts exactly the passing predicate and ignores additive metadata [0.01ms]
(pass) auth rejects malformed shape, nonzero exit and signal [0.08ms]
(pass) identity requires a model response and clean zero exit [0.10ms]
(pass) missing evidence fails at the 30-second deadline [0.06ms]
(pass) a new request starts its own evidence deadline without a second parser [0.08ms]
(pass) exit without evidence for a later request fails closed [0.06ms]
(pass) event order rejects missing init [0.02ms]
(pass) event order rejects duplicate init [0.02ms]
(pass) event order rejects out-of-session event
(pass) event order rejects assistant before response [0.01ms]
(pass) event order rejects tool before response [0.01ms]
(pass) event order rejects unmatched tool result
(pass) event order rejects response before pending tool result [0.02ms]
(pass) event order rejects duplicate tool id [0.02ms]
(pass) event order rejects result before response
(pass) a fail-closed event after valid evidence still interrupts [0.04ms]
(pass) every later response is checked before its tools [0.06ms]
(pass) stream chunks preserve UTF-8 and malformed JSON fails closed [1.09ms]
(pass) exit precedence fails closed without relying on an emitted event [0.09ms]
(pass) identity requires an empty tool array while a governed launch accepts tools [0.10ms]
152 | test("probe and launch require a non-empty string response_id on every response", () => {
153 |   for (const response_id of [undefined, "", null, 42]) {
154 |     const invalid = response({ response_id });
155 |     const output = wire(init(), invalid);
156 |     const mismatch = { ok: false, cause: "identity_mismatch", reason: "response_predicate" };
157 |     expect(parseMadvIdentity(output, model, context.supportedVersions)).toMatchObject(mismatch);
                                                                              ^
error: expect(received).toMatchObject(expected)

  {
-   "cause": "identity_mismatch",
-   "ok": false,
-   "reason": "response_predicate",
+   "events": [
+     {
+       "event": {
+         "binary_sha256": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
+         "endpoint_host": "api.minimax.io",
+         "profile": "minimax",
+         "provider": "minimax",
+         "requested_model": "MiniMax-M3.1-Flash",
+         "role": "reviewer",
+         "session_id": "wire-session",
+         "subtype": "init",
+         "surface": "madv-surface",
+         "surface_version": "0.1.1",
+         "tools": [],
+         "ts": "2026-11-15T00:00:00.000Z",
+         "type": "system",
+       },
+       "executionId": "identity-probe",
+       "sessionId": "preflight",
+     },
+     {
+       "event": {
+         "endpoint_host": "api.minimax.io",
+         "profile": "minimax",
+         "provider": "minimax",
+         "response_independence_domain": "minimax",
+         "response_maker": "minimax",
+         "response_model": "MiniMax-M3.1-Flash",
+         "session_id": "wire-session",
+         "tls_verified_host": "api.minimax.io",
+         "ts": "2026-11-15T00:00:00.000Z",
+         "type": "model_response",
+       },
+       "executionId": "identity-probe",
+       "sessionId": "preflight",
+     },
+   ],
+   "modelResponses": 1,
+   "ok": true,
  }

- Expected  - 3
+ Received  + 39

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/adapter-madv-surface/test/parser.test.ts:157:73)
(fail) probe and launch require a non-empty string response_id on every response [0.42ms]
(pass) Claude and Anthropic ids are refused before family resolution [0.09ms]

1 tests failed:
(fail) probe and launch require a non-empty string response_id on every response [0.42ms]

 52 pass
 1 fail
 228 expect() calls
Ran 53 tests across 1 file. [14.00ms]
````


Restore and byte comparison

logs/157-break-5-restore.log · SHA-256 697f9cec05d51d344bf3be1121f3d6876b3da874a2a6f21560d95eb0b13b4899

````text
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  -
````


logs/171-parser-proof.log · SHA-256 78272ad12db3b211dc818decfd8e5960dd2d94f78a2234ccbbca6c8aa45a1c5b

````text
git status --porcelain -- packages/adapter-madv-surface/src/index.ts

HEAD 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  - 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
````

#### Break 6

Restoring the old expression changed the cause for all five ids containing claude. The six-id comparison displays the changed entries together.

Diff quoted with trailing whitespace removed on each line.

logs/158-break-6-diff.log · SHA-256 eea99e0674e0e0b9082ee1ace5d107017b4d4d0de0a153902782c607263547f5

````text
diff --git a/packages/adapter-madv-surface/src/index.ts b/packages/adapter-madv-surface/src/index.ts
index b825596..f242513 100644
--- a/packages/adapter-madv-surface/src/index.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -152,7 +152,7 @@ export class MadvSurfaceParser {
     } else if (value.type === "model_response") {
       if (this.state !== "waiting" && !(this.state === "tools" && this.tools.size === 0)) { this.fail("identity_mismatch", "event_order"); return; }
       if (typeof value.response_model !== "string" || value.response_model.length === 0) { this.fail("identity_unavailable", "model_field_absent"); return; }
-      if (/claude|anthropic/i.test(value.response_model)) { this.fail("model_refused", "anthropic_model"); return; }
+      if (/(?:^|[/:.])claude|anthropic/i.test(value.response_model)) { this.fail("model_refused", "anthropic_model"); return; }
       if (!/^minimax[-_]/i.test(value.response_model)) { this.fail("domain_unresolved", "unknown_family"); return; }
       if (value.response_model !== this.context.model
         || typeof value.response_id !== "string" || value.response_id.length === 0
````


Named guard and all other cases in its file

logs/161-break-6-tests.log · SHA-256 ce916395de21825e415368597c1c95a5b8366996db8a649ae1719a3865e8af82

````text
bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/parser.test.ts:
(pass) input encoder preserves one text in one newline-terminated user message [0.14ms]
(pass) valid identity evidence binds execution and session [0.75ms]
(pass) failure precedence: HTTP 401 [0.10ms]
(pass) failure precedence: HTTP 403 [0.05ms]
(pass) failure precedence: redirect [0.02ms]
(pass) failure precedence: HTTP error [0.02ms]
(pass) failure precedence: invalid body [0.01ms]
(pass) failure precedence: absent model [0.02ms]
(pass) failure precedence: Anthropic model [0.02ms]
(pass) failure precedence: unnamed family [0.03ms]
(pass) failure precedence: model mismatch [0.01ms]
(pass) failure precedence: domain mismatch [0.01ms]
(pass) identity rejects init surface [0.12ms]
(pass) identity rejects init surface_version [0.04ms]
(pass) identity rejects init profile [0.04ms]
(pass) identity rejects init provider [0.04ms]
(pass) identity rejects init endpoint_host [0.06ms]
(pass) identity rejects init requested_model [0.05ms]
(pass) identity rejects response response_model [0.20ms]
(pass) identity rejects response response_independence_domain [0.05ms]
(pass) identity rejects response tls_verified_host [0.05ms]
(pass) identity rejects response provider [0.04ms]
(pass) identity rejects response profile [0.18ms]
(pass) identity rejects response endpoint_host [0.05ms]
(pass) auth rejects loggedIn [0.23ms]
(pass) auth rejects authMethod [0.01ms]
(pass) auth rejects profile
(pass) auth rejects provider
(pass) auth rejects endpointHost
(pass) auth rejects verified
(pass) auth rejects verifyMethod
(pass) auth accepts exactly the passing predicate and ignores additive metadata [0.01ms]
(pass) auth rejects malformed shape, nonzero exit and signal [0.08ms]
(pass) identity requires a model response and clean zero exit [0.12ms]
(pass) missing evidence fails at the 30-second deadline [0.07ms]
(pass) a new request starts its own evidence deadline without a second parser [0.08ms]
(pass) exit without evidence for a later request fails closed [0.05ms]
(pass) event order rejects missing init [0.02ms]
(pass) event order rejects duplicate init [0.02ms]
(pass) event order rejects out-of-session event [0.01ms]
(pass) event order rejects assistant before response [0.01ms]
(pass) event order rejects tool before response [0.01ms]
(pass) event order rejects unmatched tool result
(pass) event order rejects response before pending tool result [0.02ms]
(pass) event order rejects duplicate tool id [0.01ms]
(pass) event order rejects result before response
(pass) a fail-closed event after valid evidence still interrupts [0.03ms]
(pass) every later response is checked before its tools [0.06ms]
(pass) stream chunks preserve UTF-8 and malformed JSON fails closed [1.12ms]
(pass) exit precedence fails closed without relying on an emitted event [0.09ms]
(pass) identity requires an empty tool array while a governed launch accepts tools [0.10ms]
(pass) probe and launch require a non-empty string response_id on every response [0.15ms]
171 |   const ids = ["minimax-claude-x", "qwen-claude", "vendor_CLAUDE", "vendor+ClAuDe", "preclaudepost", "minimax-anthropic-x"];
172 |   const causes = ids.map(id => {
173 |     const result = parseMadvIdentity(wire(init(), response({ response_model: id })), model, context.supportedVersions);
174 |     return { id, cause: result.ok ? "accepted" : result.cause };
175 |   });
176 |   expect(causes).toEqual(ids.map(id => ({ id, cause: "model_refused" })));
                       ^
error: expect(received).toEqual(expected)

  [
    {
-     "cause": "model_refused",
+     "cause": "identity_mismatch",
      "id": "minimax-claude-x",
    },
    {
-     "cause": "model_refused",
+     "cause": "domain_unresolved",
      "id": "qwen-claude",
    },
    {
-     "cause": "model_refused",
+     "cause": "domain_unresolved",
      "id": "vendor_CLAUDE",
    },
    {
-     "cause": "model_refused",
+     "cause": "domain_unresolved",
      "id": "vendor+ClAuDe",
    },
    {
-     "cause": "model_refused",
+     "cause": "domain_unresolved",
      "id": "preclaudepost",
    },
    {
      "cause": "model_refused",
      "id": "minimax-anthropic-x",
    },
  ]

- Expected  - 5
+ Received  + 5

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/adapter-madv-surface/test/parser.test.ts:176:18)
(fail) Claude and Anthropic ids are refused before family resolution [0.38ms]

1 tests failed:
(fail) Claude and Anthropic ids are refused before family resolution [0.38ms]

 52 pass
 1 fail
 243 expect() calls
Ran 53 tests across 1 file. [14.00ms]
````


Restore and byte comparison

logs/163-break-6-restore.log · SHA-256 b1bcff7d9b9f2c071bd5efa5344ab312d02f864e5839294b63af28a8c5bdc0ee

````text
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  -
````


logs/171-parser-proof.log · SHA-256 78272ad12db3b211dc818decfd8e5960dd2d94f78a2234ccbbca6c8aa45a1c5b

````text
git status --porcelain -- packages/adapter-madv-surface/src/index.ts

HEAD 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  - 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
````

#### Break 7

Removing anthropic changed the cause for minimax-anthropic-x.

Diff quoted with trailing whitespace removed on each line.

logs/164-break-7-diff.log · SHA-256 d759d490e2a69849f732d3285dd00d5d1c6b6a5d26fa56937c63e8cc7b9f408e

````text
diff --git a/packages/adapter-madv-surface/src/index.ts b/packages/adapter-madv-surface/src/index.ts
index b825596..8b3f5e6 100644
--- a/packages/adapter-madv-surface/src/index.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -152,7 +152,7 @@ export class MadvSurfaceParser {
     } else if (value.type === "model_response") {
       if (this.state !== "waiting" && !(this.state === "tools" && this.tools.size === 0)) { this.fail("identity_mismatch", "event_order"); return; }
       if (typeof value.response_model !== "string" || value.response_model.length === 0) { this.fail("identity_unavailable", "model_field_absent"); return; }
-      if (/claude|anthropic/i.test(value.response_model)) { this.fail("model_refused", "anthropic_model"); return; }
+      if (/claude/i.test(value.response_model)) { this.fail("model_refused", "anthropic_model"); return; }
       if (!/^minimax[-_]/i.test(value.response_model)) { this.fail("domain_unresolved", "unknown_family"); return; }
       if (value.response_model !== this.context.model
         || typeof value.response_id !== "string" || value.response_id.length === 0
````


Named guard and all other cases in its file

logs/167-break-7-tests.log · SHA-256 1c54e0ce6b24402e05352454b9e55a3473b3a08367ebb453ed3154436071d657

````text
bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/parser.test.ts:
(pass) input encoder preserves one text in one newline-terminated user message [0.16ms]
(pass) valid identity evidence binds execution and session [0.76ms]
(pass) failure precedence: HTTP 401 [0.10ms]
(pass) failure precedence: HTTP 403 [0.04ms]
(pass) failure precedence: redirect [0.02ms]
(pass) failure precedence: HTTP error [0.01ms]
(pass) failure precedence: invalid body [0.01ms]
(pass) failure precedence: absent model [0.02ms]
(pass) failure precedence: Anthropic model [0.02ms]
(pass) failure precedence: unnamed family [0.02ms]
(pass) failure precedence: model mismatch [0.01ms]
(pass) failure precedence: domain mismatch [0.01ms]
(pass) identity rejects init surface [0.12ms]
(pass) identity rejects init surface_version [0.04ms]
(pass) identity rejects init profile [0.04ms]
(pass) identity rejects init provider [0.04ms]
(pass) identity rejects init endpoint_host [0.06ms]
(pass) identity rejects init requested_model [0.05ms]
(pass) identity rejects response response_model [0.20ms]
(pass) identity rejects response response_independence_domain [0.05ms]
(pass) identity rejects response tls_verified_host [0.05ms]
(pass) identity rejects response provider [0.04ms]
(pass) identity rejects response profile [0.15ms]
(pass) identity rejects response endpoint_host [0.04ms]
(pass) auth rejects loggedIn [0.06ms]
(pass) auth rejects authMethod
(pass) auth rejects profile
(pass) auth rejects provider [0.03ms]
(pass) auth rejects endpointHost
(pass) auth rejects verified [0.01ms]
(pass) auth rejects verifyMethod
(pass) auth accepts exactly the passing predicate and ignores additive metadata [0.02ms]
(pass) auth rejects malformed shape, nonzero exit and signal [0.09ms]
(pass) identity requires a model response and clean zero exit [0.17ms]
(pass) missing evidence fails at the 30-second deadline [0.07ms]
(pass) a new request starts its own evidence deadline without a second parser [0.06ms]
(pass) exit without evidence for a later request fails closed [0.06ms]
(pass) event order rejects missing init [0.02ms]
(pass) event order rejects duplicate init [0.02ms]
(pass) event order rejects out-of-session event [0.01ms]
(pass) event order rejects assistant before response [0.01ms]
(pass) event order rejects tool before response [0.01ms]
(pass) event order rejects unmatched tool result [0.01ms]
(pass) event order rejects response before pending tool result [0.04ms]
(pass) event order rejects duplicate tool id [0.02ms]
(pass) event order rejects result before response
(pass) a fail-closed event after valid evidence still interrupts [0.04ms]
(pass) every later response is checked before its tools [0.06ms]
(pass) stream chunks preserve UTF-8 and malformed JSON fails closed [1.10ms]
(pass) exit precedence fails closed without relying on an emitted event [0.09ms]
(pass) identity requires an empty tool array while a governed launch accepts tools [0.12ms]
(pass) probe and launch require a non-empty string response_id on every response [0.16ms]
171 |   const ids = ["minimax-claude-x", "qwen-claude", "vendor_CLAUDE", "vendor+ClAuDe", "preclaudepost", "minimax-anthropic-x"];
172 |   const causes = ids.map(id => {
173 |     const result = parseMadvIdentity(wire(init(), response({ response_model: id })), model, context.supportedVersions);
174 |     return { id, cause: result.ok ? "accepted" : result.cause };
175 |   });
176 |   expect(causes).toEqual(ids.map(id => ({ id, cause: "model_refused" })));
                       ^
error: expect(received).toEqual(expected)

  [
    {
      "cause": "model_refused",
      "id": "minimax-claude-x",
    },
    {
      "cause": "model_refused",
      "id": "qwen-claude",
    },
    {
      "cause": "model_refused",
      "id": "vendor_CLAUDE",
    },
    {
      "cause": "model_refused",
      "id": "vendor+ClAuDe",
    },
    {
      "cause": "model_refused",
      "id": "preclaudepost",
    },
    {
-     "cause": "model_refused",
+     "cause": "identity_mismatch",
      "id": "minimax-anthropic-x",
    },
  ]

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/adapter-madv-surface/test/parser.test.ts:176:18)
(fail) Claude and Anthropic ids are refused before family resolution [0.37ms]

1 tests failed:
(fail) Claude and Anthropic ids are refused before family resolution [0.37ms]

 52 pass
 1 fail
 243 expect() calls
Ran 53 tests across 1 file. [15.00ms]
````


Restore and byte comparison

logs/169-break-7-restore.log · SHA-256 1a172899a6196df44ed5f53603a471f02640b2fa471b99c2d19f1e9a0f277815

````text
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  -
````


logs/171-parser-proof.log · SHA-256 78272ad12db3b211dc818decfd8e5960dd2d94f78a2234ccbbca6c8aa45a1c5b

````text
git status --porcelain -- packages/adapter-madv-surface/src/index.ts

HEAD 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  - 6dfa533b55e3f899207ace447cdf40faf2349f632dbca82d50a83156f49279bc  tui/packages/adapter-madv-surface/src/index.ts
````

#### Break 8

At 999 ms both probes cancelled stream consumption one millisecond early. The earlier suites passed.

Diff quoted with trailing whitespace removed on each line.

logs/182-break-8-diff.log · SHA-256 47351dce6fc8564dc803f75f4a4238abd108134d1a614c0076bc652f478654dd

````text
diff --git a/packages/supervisor/src/attestation.ts b/packages/supervisor/src/attestation.ts
index 8397014..116dc79 100644
--- a/packages/supervisor/src/attestation.ts
+++ b/packages/supervisor/src/attestation.ts
@@ -153,7 +153,8 @@ export async function runBoundedProbe(request: ProbeRequest, overrides: Partial<
     let clean = reason === "reaped" && rt.now() - started <= executionMs;
     if (reason !== "reaped") {
       const cleanupStart = rt.now();
-      const end = Math.min(cleanupStart + CLEANUP_MS, started + executionMs + CLEANUP_MS);
+      const cleanupMs = madv ? 999 : CLEANUP_MS;
+      const end = Math.min(cleanupStart + cleanupMs, started + executionMs + cleanupMs);
       if (!exitObserved) { try { process.kill("SIGTERM"); } catch { streamFailure = true; } }
       let completion = await deadline(reaped, Math.min(cleanupStart + GRACE_MS, end));
       if (completion !== "reaped") {
````


Earlier tests under the break

logs/185-break-8-old.log · SHA-256 f0c76c1e2d15761fb7b0359e1aa819bbf0704740e756a201a5be4d5b60fce51e

````text
bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-probes.test.ts:
(pass) dispatch keeps Claude probes and input unchanged [1.68ms]
(pass) madv-surface identity continues beyond init to natural exit [11.69ms]
(pass) registration chooses 30 seconds beside Claude's 5 seconds [0.48ms]
(pass) madv-surface identity failures map to identity_mismatch [1.27ms]
(pass) madv-surface auth failures map to auth_not_ready [0.49ms]
(pass) madv-surface keeps both raw stream limits and metadata-only diagnostics [0.45ms]
(pass) madv-surface pre-spawn cancellation and spawn failure fail closed [0.11ms]
(pass) madv-surface cancellation retains bounded cleanup and reaping [500.91ms]

 8 pass
 0 fail
 124 expect() calls
Ran 8 tests across 1 file. [533.00ms]
````


Earlier tests under the break

logs/187-break-8-related.log · SHA-256 6669f04b5b96b5b8232b751f3164b234192f2db57d5e1d081f8f0bb31948cc49

````text
bun test v1.4.2 (744846f84)

packages/supervisor/test/attestation.test.ts:
(pass) identity accepts an exact model and supported CLI version [150.24ms]
(pass) identity rejects a model mismatch [75.33ms]
(pass) identity rejects a missing system/init event [86.60ms]
(pass) identity rejects an unsupported CLI version [93.03ms]
(pass) identity uses only the first system/init event and fixed stdin [92.83ms]
(pass) identity ends a continuing session through bounded cleanup [72.88ms]
(pass) successful bounded execution [73.99ms]
(pass) spawn failure is bounded and fail closed [1.21ms]
(pass) pre-spawn cancellation starts no child [0.98ms]
(pass) post-spawn cancellation reaps within the cleanup budget [590.74ms]
(pass) signal termination fails closed [87.47ms]
(pass) stdout overflow fails closed [84.76ms]
(pass) stderr overflow fails closed [204.46ms]
(pass) exactly 65,536 bytes on either stream is permitted [73.40ms]
(pass) execution deadline includes normal reaping [35.90ms]
(pass) timeout uses a monotonic clock and forced SIGKILL [5510.15ms]
(pass) forced cleanup accounts for grace escalation and reaping [575.83ms]
(pass) cleanup budget exhaustion fails closed [1074.38ms]
(pass) auth parsing occurs only after clean exit and reaping [134.07ms]
(pass) malformed JSON and every incorrect auth predicate fail closed [1277.35ms]
(pass) diagnostics contain only metadata on success and every failure [2001.78ms]

 21 pass
 0 fail
 224 expect() calls
Ran 21 tests across 1 file. [12.31s]
````


Named guard and all other cases in its file

logs/189-break-8-tests.log · SHA-256 a2ca45f3a9e590275784372db8c3f3b4b984be6859dcb3d5a2b3b865f54dc088

````text
bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-intervals.test.ts:
40 |       for (const delta of [499, 1, 499, 1]) {
41 |         jest.advanceTimersByTime(delta);
42 |         await Promise.resolve();
43 |       }
44 |       expect(signals).toEqual([["SIGTERM", 0], ["SIGKILL", 500]]);
45 |       expect(cleanupAt).toBe(1000);
                             ^
error: expect(received).toBe(expected)

Expected: 1000
Received: 999

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-intervals.test.ts:45:25)
(fail) madv-surface identity keeps 500 ms grace and 1000 ms cleanup [1.76ms]
40 |       for (const delta of [499, 1, 499, 1]) {
41 |         jest.advanceTimersByTime(delta);
42 |         await Promise.resolve();
43 |       }
44 |       expect(signals).toEqual([["SIGTERM", 0], ["SIGKILL", 500]]);
45 |       expect(cleanupAt).toBe(1000);
                             ^
error: expect(received).toBe(expected)

Expected: 1000
Received: 999

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-intervals.test.ts:45:25)
(fail) madv-surface auth keeps 500 ms grace and 1000 ms cleanup [0.14ms]

 0 pass
 2 fail
 4 expect() calls
Ran 2 tests across 1 file. [16.00ms]
````


Restore and byte comparison

logs/191-break-8-restore.log · SHA-256 f06dddd9ca9b389aca0bc8683ea4413041ff124bd3679414318b6800677ff9ec

````text
d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  tui/packages/supervisor/src/attestation.ts
d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  -
````


logs/222-interval-allowlist-proof.log · SHA-256 32c05c4b510e016729725add961b98654d393d91ef0ad35d5767ad81e49130cd

````text
git status --porcelain -- packages/supervisor/src/attestation.ts

HEAD d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  - d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  tui/packages/supervisor/src/attestation.ts
git status --porcelain -- packages/supervisor/src/environment.ts

HEAD 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  - 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  tui/packages/supervisor/src/environment.ts
````

#### Break 9

At 499 ms both probes sent SIGKILL one millisecond early. The earlier suites passed.

Diff quoted with trailing whitespace removed on each line.

logs/192-break-9-diff.log · SHA-256 9d666a8815f810044558a3b44f6bf1c6060c8540d9dbc87b106212131e61c1e9

````text
diff --git a/packages/supervisor/src/attestation.ts b/packages/supervisor/src/attestation.ts
index 8397014..ae66003 100644
--- a/packages/supervisor/src/attestation.ts
+++ b/packages/supervisor/src/attestation.ts
@@ -155,7 +155,7 @@ export async function runBoundedProbe(request: ProbeRequest, overrides: Partial<
       const cleanupStart = rt.now();
       const end = Math.min(cleanupStart + CLEANUP_MS, started + executionMs + CLEANUP_MS);
       if (!exitObserved) { try { process.kill("SIGTERM"); } catch { streamFailure = true; } }
-      let completion = await deadline(reaped, Math.min(cleanupStart + GRACE_MS, end));
+      let completion = await deadline(reaped, Math.min(cleanupStart + (madv ? 499 : GRACE_MS), end));
       if (completion !== "reaped") {
         if (!exitObserved) { try { process.kill("SIGKILL"); } catch { streamFailure = true; } }
         completion = await deadline(reaped, end);
````


Earlier tests under the break

logs/195-break-9-old.log · SHA-256 f97b1a064d46c856f046f7631ef177ca011d8b937f3a5805b9a7bb398847fa0b

````text
bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-probes.test.ts:
(pass) dispatch keeps Claude probes and input unchanged [1.67ms]
(pass) madv-surface identity continues beyond init to natural exit [11.72ms]
(pass) registration chooses 30 seconds beside Claude's 5 seconds [0.51ms]
(pass) madv-surface identity failures map to identity_mismatch [1.26ms]
(pass) madv-surface auth failures map to auth_not_ready [0.40ms]
(pass) madv-surface keeps both raw stream limits and metadata-only diagnostics [0.42ms]
(pass) madv-surface pre-spawn cancellation and spawn failure fail closed [0.11ms]
(pass) madv-surface cancellation retains bounded cleanup and reaping [499.62ms]

 8 pass
 0 fail
 124 expect() calls
Ran 8 tests across 1 file. [527.00ms]
````


Earlier tests under the break

logs/197-break-9-related.log · SHA-256 a88e60a6648e757d032532917b00b3ec694beb702e3bde1fb989a6ff979604f2

````text
bun test v1.4.2 (744846f84)

packages/supervisor/test/attestation.test.ts:
(pass) identity accepts an exact model and supported CLI version [136.57ms]
(pass) identity rejects a model mismatch [46.52ms]
(pass) identity rejects a missing system/init event [53.35ms]
(pass) identity rejects an unsupported CLI version [50.04ms]
(pass) identity uses only the first system/init event and fixed stdin [44.81ms]
(pass) identity ends a continuing session through bounded cleanup [151.59ms]
(pass) successful bounded execution [55.87ms]
(pass) spawn failure is bounded and fail closed [0.98ms]
(pass) pre-spawn cancellation starts no child [0.70ms]
(pass) post-spawn cancellation reaps within the cleanup budget [548.50ms]
(pass) signal termination fails closed [50.39ms]
(pass) stdout overflow fails closed [47.33ms]
(pass) stderr overflow fails closed [51.96ms]
(pass) exactly 65,536 bytes on either stream is permitted [44.45ms]
(pass) execution deadline includes normal reaping [39.55ms]
(pass) timeout uses a monotonic clock and forced SIGKILL [5508.30ms]
(pass) forced cleanup accounts for grace escalation and reaping [576.74ms]
(pass) cleanup budget exhaustion fails closed [1059.91ms]
(pass) auth parsing occurs only after clean exit and reaping [150.85ms]
(pass) malformed JSON and every incorrect auth predicate fail closed [846.01ms]
(pass) diagnostics contain only metadata on success and every failure [1815.11ms]

 21 pass
 0 fail
 224 expect() calls
Ran 21 tests across 1 file. [11.29s]
````


Named guard and all other cases in its file

logs/199-break-9-tests.log · SHA-256 2295efb3b43b147032434bd1685c30da47fbd1dbb9593005bf0a806c38c40181

````text
bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-intervals.test.ts:
39 |       // both deadlines before advancing the clock to the next boundary.
40 |       for (const delta of [499, 1, 499, 1]) {
41 |         jest.advanceTimersByTime(delta);
42 |         await Promise.resolve();
43 |       }
44 |       expect(signals).toEqual([["SIGTERM", 0], ["SIGKILL", 500]]);
                           ^
error: expect(received).toEqual(expected)

  [
    [
      "SIGTERM",
      0,
    ],
    [
      "SIGKILL",
-     500,
+     499,
    ],
  ]

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-intervals.test.ts:44:23)
(fail) madv-surface identity keeps 500 ms grace and 1000 ms cleanup [1.62ms]
39 |       // both deadlines before advancing the clock to the next boundary.
40 |       for (const delta of [499, 1, 499, 1]) {
41 |         jest.advanceTimersByTime(delta);
42 |         await Promise.resolve();
43 |       }
44 |       expect(signals).toEqual([["SIGTERM", 0], ["SIGKILL", 500]]);
                           ^
error: expect(received).toEqual(expected)

  [
    [
      "SIGTERM",
      0,
    ],
    [
      "SIGKILL",
-     500,
+     499,
    ],
  ]

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-intervals.test.ts:44:23)
(fail) madv-surface auth keeps 500 ms grace and 1000 ms cleanup [0.11ms]

 0 pass
 2 fail
 2 expect() calls
Ran 2 tests across 1 file. [12.00ms]
````


Restore and byte comparison

logs/201-break-9-restore.log · SHA-256 41552b53f210caefb677ce758f5e27aa2fe57a038c5eec4ea66d9a83a3d21450

````text
d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  tui/packages/supervisor/src/attestation.ts
d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  -
````


logs/222-interval-allowlist-proof.log · SHA-256 32c05c4b510e016729725add961b98654d393d91ef0ad35d5767ad81e49130cd

````text
git status --porcelain -- packages/supervisor/src/attestation.ts

HEAD d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  - d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  tui/packages/supervisor/src/attestation.ts
git status --porcelain -- packages/supervisor/src/environment.ts

HEAD 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  - 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  tui/packages/supervisor/src/environment.ts
````

#### Break 10

The production selector included the previously unknown optional variable supplied by the proxy. The earlier suites passed.

Diff quoted with trailing whitespace removed on each line.

logs/202-break-10-diff.log · SHA-256 104c854cd6130e6179bae6b6f00b9c432ef1845047674176a0b8f4d843c079b9

````text
diff --git a/packages/supervisor/src/environment.ts b/packages/supervisor/src/environment.ts
index 0bb4168..c6d086b 100644
--- a/packages/supervisor/src/environment.ts
+++ b/packages/supervisor/src/environment.ts
@@ -21,6 +21,7 @@ const allowlists: Readonly<Record<string, EnvironmentAllowlistV1>> = Object.free
       { name: "TERM", required: true, secret: false },
       { name: "TMPDIR", required: true, secret: false },
       { name: "MINIMAX_API_KEY", required: true, secret: true },
+      { name: "ADMISSION_BREAK_EXTRA", required: false, secret: false },
       { name: "LANG", required: false, secret: false },
       { name: "LC_ALL", required: false, secret: false },
       { name: "LC_CTYPE", required: false, secret: false },
````


Earlier tests under the break

logs/205-break-10-old.log · SHA-256 748e9cb434427063a5929783189c2d1ee036cd27d64ffad7c2261c4d89409c8b

````text
bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-environment.test.ts:
(pass) madv-surface-v1 has exactly the approved variables [0.24ms]
(pass) madv-surface-v1 requires exactly the six required variables [0.27ms]
(pass) madv-surface-v1 drops state, overrides and unlisted variables [0.05ms]
(pass) madv-surface redacts its synthetic canary [0.10ms]

 4 pass
 0 fail
 38 expect() calls
Ran 4 tests across 1 file. [14.00ms]
````


Earlier tests under the break

logs/207-break-10-related.log · SHA-256 32601307dae0fae5a12a3dee820c155c8b86544716b8174ce490b3af59d48adb

````text
bun test v1.4.2 (744846f84)

packages/supervisor/test/environment.test.ts:
(pass) no ambient variable outside the allowlist survives [0.42ms]
(pass) a missing required allowlisted variable is a typed failure [3.58ms]
(pass) secret-marked values are redacted from diagnostics while their names are retained [0.15ms]
(pass) redaction reports which rules ran [0.06ms]
(pass) the same registration produces byte-identical environments on repeated calls [0.08ms]

 5 pass
 0 fail
 7286 expect() calls
Ran 5 tests across 1 file. [15.00ms]
````


Named guard and all other cases in its file

logs/209-break-10-tests.log · SHA-256 322d5a22adf603162a9201c87ba8f658e20d63e9e3389dffc0cb539227630d0d

````text
bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-allowlist.test.ts:
 6 |   const registration = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;
 7 |   expect(registration.environment_allowlist_ref).toBe("madv-surface-v1");
 8 |   // Supply a synthetic value even for a name introduced after this test.
 9 |   const ambient = new Proxy({}, { get: () => "fixture" });
10 |   const approved = ["HOME", "PATH", "SHELL", "TERM", "TMPDIR", "MINIMAX_API_KEY", "LANG", "LC_ALL", "LC_CTYPE", "USER"];
11 |   expect(Object.keys(buildAllowlistedEnvironment(registration, ambient)).sort()).toEqual(approved.sort());
                                                                                      ^
error: expect(received).toEqual(expected)

  [
+   "ADMISSION_BREAK_EXTRA",
    "HOME",
    "LANG",
    "LC_ALL",
    "LC_CTYPE",
    "MINIMAX_API_KEY",
    "PATH",
    "SHELL",
    "TERM",
    "TMPDIR",
    "USER",
  ]

- Expected  - 0
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-allowlist.test.ts:11:82)
(fail) madv-surface-v1 selects exactly the B6 variable set [0.37ms]

 0 pass
 1 fail
 2 expect() calls
Ran 1 test across 1 file. [9.00ms]
````


Restore and byte comparison

logs/211-break-10-restore.log · SHA-256 5e1b3fa1727cad99ba5caa07c472b32ec0428ec7eb60b6d20a4c88848169ebad

````text
8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  tui/packages/supervisor/src/environment.ts
8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  -
````


logs/222-interval-allowlist-proof.log · SHA-256 32c05c4b510e016729725add961b98654d393d91ef0ad35d5767ad81e49130cd

````text
git status --porcelain -- packages/supervisor/src/attestation.ts

HEAD d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  - d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e  tui/packages/supervisor/src/attestation.ts
git status --porcelain -- packages/supervisor/src/environment.ts

HEAD 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  - 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  tui/packages/supervisor/src/environment.ts
````

#### Break 11

Removing LC_CTYPE changed the selected set. The existing madv-environment suite had two passes and two failures. The general environment suite had four passes and one failure.

Diff quoted with trailing whitespace removed on each line.

logs/281-break-11-diff.log · SHA-256 2cd3f65856229ba894443e83823d62589421a3edbe8722280b2b95b655880be4

````text
diff --git a/packages/supervisor/src/environment.ts b/packages/supervisor/src/environment.ts
index 0bb4168..ed0df32 100644
--- a/packages/supervisor/src/environment.ts
+++ b/packages/supervisor/src/environment.ts
@@ -23,7 +23,6 @@ const allowlists: Readonly<Record<string, EnvironmentAllowlistV1>> = Object.free
       { name: "MINIMAX_API_KEY", required: true, secret: true },
       { name: "LANG", required: false, secret: false },
       { name: "LC_ALL", required: false, secret: false },
-      { name: "LC_CTYPE", required: false, secret: false },
       { name: "USER", required: false, secret: false },
     ].map(variable => Object.freeze(variable))),
   }),
````


Earlier tests under the break

logs/284-break-11-old.log · SHA-256 060ef46ef8598e56c77054b9fb7ab0201c292d024728b8432b1caf630af6cf49

````text
bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-environment.test.ts:
 6 | const optional = ["LANG", "LC_ALL", "LC_CTYPE", "USER"];
 7 | const ambient = () => Object.fromEntries([...required, ...optional].map(name => [name, name === "MINIMAX_API_KEY" ? CANARY : "fixture:" + name]));
 8 |
 9 | test("madv-surface-v1 has exactly the approved variables", () => {
10 |   const values = ambient();
11 |   expect(Object.keys(buildAllowlistedEnvironment(madvRegistration(), values))).toEqual([...required, ...optional]);
                                                                                    ^
error: expect(received).toEqual(expected)

  [
    "HOME",
    "PATH",
    "SHELL",
    "TERM",
    "TMPDIR",
    "MINIMAX_API_KEY",
    "LANG",
    "LC_ALL",
-   "LC_CTYPE",
    "USER",
  ]

- Expected  - 1
+ Received  + 0

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-environment.test.ts:11:80)
(fail) madv-surface-v1 has exactly the approved variables [1.58ms]
(pass) madv-surface-v1 requires exactly the six required variables [0.52ms]
27 |   }
28 | });
29 | test("madv-surface-v1 drops state, overrides and unlisted variables", () => {
30 |   const values = { ...ambient(), XDG_STATE_HOME: "state", MADV_SURFACE_TEST_ENDPOINT: "endpoint", MADV_SURFACE_TEST_CA: "ca", UNLISTED: "extra" };
31 |   const result = buildAllowlistedEnvironment(madvRegistration(), values);
32 |   expect(result).toEqual(ambient());
                      ^
error: expect(received).toEqual(expected)

  {
    "HOME": "fixture:HOME",
    "LANG": "fixture:LANG",
    "LC_ALL": "fixture:LC_ALL",
-   "LC_CTYPE": "fixture:LC_CTYPE",
    "MINIMAX_API_KEY": "M0-SYNTHETIC-MINIMAX-CANARY",
    "PATH": "fixture:PATH",
    "SHELL": "fixture:SHELL",
    "TERM": "fixture:TERM",
    "TMPDIR": "fixture:TMPDIR",
    "USER": "fixture:USER",
  }

- Expected  - 1
+ Received  + 0

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-environment.test.ts:32:18)
(fail) madv-surface-v1 drops state, overrides and unlisted variables [0.28ms]
(pass) madv-surface redacts its synthetic canary [0.29ms]

 2 pass
 2 fail
 29 expect() calls
Ran 4 tests across 1 file. [20.00ms]
````


Earlier tests under the break

logs/286-break-11-related.log · SHA-256 620af0468d05576d56b8e400b9953d3af50a9d690d53333309f396d84d4abe26

````text
bun test v1.4.2 (744846f84)

packages/supervisor/test/environment.test.ts:
56 |     expect(result.LANG).toBe("fixture-lang");
57 |     expect(Object.hasOwn(result, "LC_ALL")).toBe(false);
58 |     expect(Object.hasOwn(result, "LC_CTYPE")).toBe(false);
59 |     expect(Object.keys(result)).toEqual([...requiredNames(registration), "LANG", "USER"]);
60 |     const allOptional = { ...ambientFor(registration), ...Object.fromEntries(optional.map(name => [name, name])) };
61 |     expect(Object.keys(buildAllowlistedEnvironment(registration, allOptional))).toEqual([...requiredNames(registration), ...optional]);
                                                                                     ^
error: expect(received).toEqual(expected)

  [
    "HOME",
    "PATH",
    "SHELL",
    "TERM",
    "TMPDIR",
    "MINIMAX_API_KEY",
    "LANG",
    "LC_ALL",
-   "LC_CTYPE",
    "USER",
  ]

- Expected  - 1
+ Received  + 0

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/environment.test.ts:61:81)
(fail) no ambient variable outside the allowlist survives [0.81ms]
(pass) a missing required allowlisted variable is a typed failure [3.97ms]
(pass) secret-marked values are redacted from diagnostics while their names are retained [0.67ms]
(pass) redaction reports which rules ran [0.19ms]
(pass) the same registration produces byte-identical environments on repeated calls [0.10ms]

 4 pass
 1 fail
 7283 expect() calls
Ran 5 tests across 1 file. [15.00ms]
````


Named guard and all other cases in its file

logs/288-break-11-tests.log · SHA-256 ef754c07f916cb00fc084ab952dcc8c0872b023d6636dcca2e115359365a04c4

````text
bun test v1.4.2 (744846f84)

packages/supervisor/test/madv-allowlist.test.ts:
 6 |   const registration = ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))!;
 7 |   expect(registration.environment_allowlist_ref).toBe("madv-surface-v1");
 8 |   // Supply a synthetic value even for a name introduced after this test.
 9 |   const ambient = new Proxy({}, { get: () => "fixture" });
10 |   const approved = ["HOME", "PATH", "SHELL", "TERM", "TMPDIR", "MINIMAX_API_KEY", "LANG", "LC_ALL", "LC_CTYPE", "USER"];
11 |   expect(Object.keys(buildAllowlistedEnvironment(registration, ambient)).sort()).toEqual(approved.sort());
                                                                                      ^
error: expect(received).toEqual(expected)

  [
    "HOME",
    "LANG",
    "LC_ALL",
-   "LC_CTYPE",
    "MINIMAX_API_KEY",
    "PATH",
    "SHELL",
    "TERM",
    "TMPDIR",
    "USER",
  ]

- Expected  - 1
+ Received  + 0

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-allowlist.test.ts:11:82)
(fail) madv-surface-v1 selects exactly the B6 variable set [0.47ms]

 0 pass
 1 fail
 2 expect() calls
Ran 1 test across 1 file. [11.00ms]
````


Restore and byte comparison

logs/290-break-11-restore.log · SHA-256 bc4e2ec145308569a99641c5dc61af003f91c99b1ec8d3ca2cda8b4006d59948

````text

````


logs/291-break-11-proof.log · SHA-256 5c5e39649d60a88a23b341b421c67871932c4fa851b2c68be31adc063f799d8d

````text
git status --porcelain -- packages/supervisor/src/environment.ts

HEAD 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  - 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb  tui/packages/supervisor/src/environment.ts
````

#### Break 12

Changing Ubuntu 05 to exit 0 changed the digest of its status bytes. The recorded suite had eleven passes and one failure. Its expected provider_error became identity_mismatch.

Diff quoted with trailing whitespace removed on each line.

logs/292-break-12-diff.log · SHA-256 3873db64baf06fa8924eaf10375c423cfa53a2078ead905f0b9b028b16a2e377

````text
diff --git a/packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.status b/packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.status
index 5e7da5a..9294713 100644
--- a/packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.status
+++ b/packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.status
@@ -1,3 +1,3 @@
-exit=1
+exit=0
 signal=none
 timed_out=no
````


Earlier tests under the break

logs/295-break-12-old.log · SHA-256 48b83d71082618eb91d42afb21bce95d1c7de907e4ac6897a602d21270b00a51

````text
bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/recorded.test.ts:
(pass) macbook 03 recorded auth-readiness passes [1.41ms]
(pass) ubuntu 03 recorded auth-readiness passes [0.42ms]
(pass) macbook 04 recorded tools fail probe identity and pass a governed launch [1.87ms]
(pass) macbook 05 recorded tools fail probe identity and pass a governed launch [0.28ms]
(pass) macbook 06 recorded tools fail probe identity and pass a governed launch [0.22ms]
(pass) ubuntu 04 recorded tools fail probe identity and pass a governed launch [0.21ms]
(pass) ubuntu 06 recorded tools fail probe identity and pass a governed launch [0.20ms]
49 | test("ubuntu 05 recorded identity fails closed with provider_error", () => {
50 |   const f = fixture("ubuntu", "05");
51 |   const result = parseMadvIdentity(f.output, model, ["0.1.1"], f.exit, f.signal);
52 |   expect(result.ok).toBe(false);
53 |   if (result.ok) throw new Error("failed identity was admitted");
54 |   expect(result.cause).toBe("provider_error");
                            ^
error: expect(received).toBe(expected)

Expected: "provider_error"
Received: "identity_mismatch"

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/adapter-madv-surface/test/recorded.test.ts:54:24)
(fail) ubuntu 05 recorded identity fails closed with provider_error [0.38ms]
(pass) macbook 07 fails closed with provider_error for MiniMax-M3.1-Flash-Preview while reporting MiniMax-M3.1-Flash [0.42ms]
(pass) macbook 07 fails closed with provider_error for MiniMax-M3.1-Flash while reporting MiniMax-M3.1-Flash [0.14ms]
(pass) ubuntu 07 fails closed with identity_mismatch for MiniMax-M3.1-Flash-Preview while reporting MiniMax-M3.1-Flash [0.20ms]
(pass) ubuntu 07 fails closed with identity_mismatch for MiniMax-M3.1-Flash while reporting MiniMax-M3.1-Flash [0.10ms]

 11 pass
 1 fail
 58 expect() calls
Ran 12 tests across 1 file. [15.00ms]
````


Named guard and all other cases in its file

logs/297-break-12-tests.log · SHA-256 fc8fc8157f11b69e5e8d31033957866680de89a2014a98f7446e17e01e296fd0

````text
bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/fixture-integrity.test.ts:
29 |     // Comparing the sorted arrays detects duplicates as well as omissions.
30 |     const files = filesUnder(root).filter(file => file !== "manifest.tsv").sort();
31 |     expect(entries.map(entry => entry.file).sort()).toEqual(files);
32 |     for (const { file, digest } of entries) {
33 |       const bytes = readFileSync(join(root, file));
34 |       expect({ file, digest: new Bun.CryptoHasher("sha256").update(bytes).digest("hex") }).toEqual({ file, digest });
                                                                                                ^
error: expect(received).toEqual(expected)

  {
-   "digest": "7eb7518924b7d3191c1000f8475f7f49162aa5e4fd9ebb68c070f2d0dfc443fc",
+   "digest": "e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7",
    "file": "ubuntu/05.status",
  }

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/adapter-madv-surface/test/fixture-integrity.test.ts:34:92)
(fail) recorded manifest covers every fixture and matches its SHA-256 [2.30ms]

 0 pass
 1 fail
 57 expect() calls
Ran 1 test across 1 file. [11.00ms]
````


Restore and byte comparison

logs/299-break-12-restore.log · SHA-256 7d8d0a3de90554e22a0178bc1c1bce51ff9e5aaab940f77637574082cfa0010d

````text

````


logs/300-break-12-proof.log · SHA-256 971be0ca201192375d9d57eabc5027d3fc548568a3d14f423f4607ffe2299684

````text
git status --porcelain -- packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.status

HEAD 7eb7518924b7d3191c1000f8475f7f49162aa5e4fd9ebb68c070f2d0dfc443fc  - 7eb7518924b7d3191c1000f8475f7f49162aa5e4fd9ebb68c070f2d0dfc443fc  tui/packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.status
````

### Runs and self-fixes

The first R1 pin run exposed four failures. Only the original registry expectation and the shared synthetic init version needed updates. All 24 focused tests then passed. The separate preflight record-version test already passed with 0.1.1, so its pins stayed. The R2 edit completed its two repository writes, then encountered an owner-read-only scratch mutation helper. Only that helper’s write permission and its private-symbol mutation strings were corrected. All 65 focused tests passed. The first full-run typecheck found TS2769 in the new manifest test. A separate self-fix commit validated the path and 64-digit digest before comparing bytes. The full run restarted from its first step. The later runtime halt and first resume determined which runs count. Frozen installs that changed the mode of packages/founder-act/src/main.ts were each followed by the specified checkout and a clean status check.

The initial tool report named the deferred namespace. Its individual tools became visible on catalog inspection and were then reported. One earlier raw authority-reading log, 037, retains a namespace suffix printed by the source. No exec input contained one of the six names of Addendum 2 B4. A baseline progress search had no matches. Exploratory timer-API lookups included an absent optional dependency directory and a no-match result. Neither was a test. Before the R1 and R2 commits each mutation was restored to the index, then the clean file was verified against the resulting commit. The opening described an optional boolean on MadvContext. R2 keyed that boolean with a module-private symbol so only the production identity-probe caller can select it. The R3 test observes stream cancellation at the cleanup deadline and SIGKILL at the grace deadline. The signed resumes determined the later heads for the full run and R4. Log 474 named an undefined scratch helper and exited 127 before examining the message. Log 475 used check_message from commit-tools.zsh and verified width, the trailer matches and the final paragraph before staging or committing.

The R1 pin run, with its original failures and all other cases, is below. The scratch-helper error and first full-run typecheck failure follow.

logs/087-r1-pins.log · SHA-256 86e6e532b38fa6aa11770ba5356d2d2f179c13c4a86aa358c56ff586f54b8169

````text
bun test v1.4.2 (744846f84)

packages/protocol/test/adapter-registry.test.ts:
(pass) registry values are stored already normalized [0.06ms]
(pass) the registry contains exactly the three Founder-ratified surfaces [0.22ms]
(pass) claude-code registration matches the PLAN-OPEN-1 ruling field for field [0.06ms]
(pass) antigravity registration matches the PLAN-OPEN-1 ruling field for field
(pass) registry entries and the registry are deeply frozen [0.41ms]
(pass) lookupRegistration returns the ratified entry and undefined for a syntactically valid unregistered surface [0.07ms]
(pass) registry membership cannot be mutated at runtime [0.55ms]
125 |   const sortedKeys: string[] = [...ADAPTER_REGISTRY.keys()].map(String).sort();
126 |   expect(sortedKeys).toEqual(["antigravity", "claude-code", "madv-surface"]);
127 | });
128 |
129 | test("madv-surface registration matches DEC-20261115-02 field for field", () => {
130 |   expect(ADAPTER_REGISTRY.get(parseSurfaceId("madv-surface"))).toEqual({
                                                                     ^
error: expect(received).toEqual(expected)

  {
    "auth_failure_detection": [
      "auth_status_exit_code:1",
      "auth_status.verified:false",
      "system/auth_failed",
      "exit_code:5",
    ],
    "auth_readiness_probe": {
      "argv": [
        "auth",
        "status",
        "--profile",
        "minimax",
      ],
      "parse": "json",
    },
    "environment_allowlist_ref": "madv-surface-v1",
    "executable_name": "madv-surface",
    "identity_probe": {
      "argv": [
        "--print",
        "--input-format",
        "stream-json",
        "--output-format",
        "stream-json",
        "--profile",
        "minimax",
        "--require-model",
        "--role",
        "reviewer",
        "--no-session-persistence",
+       "--no-tools",
        "--max-turns",
        "1",
      ],
      "parse": "json",
    },
    "independence_domain": "minimax",
    "limitations": [
      "A provider that misreports its own model remains a limitation.",
      "What the provider retains is the provider's.",
      "Both probes are live calls on the M Plan at every start.",
    ],
    "non_interactive_flags": [
      "--print",
      "--input-format",
      "stream-json",
      "--output-format",
      "stream-json",
      "--profile",
      "minimax",
      "--require-model",
      "--role",
      "reviewer",
      "--no-session-persistence",
    ],
    "organization_id": "minimax",
    "provider": "minimax",
    "supported_versions": [
-     "0.1.1",
+     "0.1.2",
    ],
    "surface": "madv-surface",
  }

- Expected  - 1
+ Received  + 2

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/protocol/test/adapter-registry.test.ts:130:64)
(fail) madv-surface registration matches DEC-20261115-02 field for field [1.33ms]
(pass) madv-surface 0.1.2 reserves --no-tools for the identity probe [0.04ms]

packages/supervisor/test/madv-probes.test.ts:
(pass) dispatch keeps Claude probes and input unchanged [3.00ms]
45 |     const stderr = new ReadableStream<Uint8Array>({ start(c) { errors = c; } });
46 |     const timer = setTimeout(() => { output.enqueue(new TextEncoder().encode(wire(response))); output.close(); errors.close(); resolve(0); }, 10);
47 |     return { stdout, stderr, exited, kill(signal) { killed.push(signal); clearTimeout(timer); output.close(); errors.close(); resolve(0); } };
48 |   };
49 |   const result = await runBoundedProbe(request(), { spawn });
50 |   expect(result.ok).toBe(true); expect(killed).toEqual([]);
                         ^
error: expect(received).toBe(expected)

Expected: true
Received: false

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-probes.test.ts:50:21)
(fail) madv-surface identity continues beyond init to natural exit [11.89ms]
52 | });
53 | test("registration chooses 30 seconds beside Claude's 5 seconds", async () => {
54 |   const madv = wire(init, response);
55 |   // Auth runs to exit; Claude identity deliberately wakes at its first init.
56 |   const claude = JSON.stringify({ loggedIn: true, authMethod: "claude.ai", apiProvider: "firstParty", subscriptionType: "max" });
57 |   expect((await runBoundedProbe(request(), complete(madv, { elapsed: 6_000 }))).ok).toBe(true);
                                                                                         ^
error: expect(received).toBe(expected)

Expected: true
Received: false

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-probes.test.ts:57:85)
(fail) registration chooses 30 seconds beside Claude's 5 seconds [0.31ms]
(pass) madv-surface identity failures map to identity_mismatch [1.54ms]
(pass) madv-surface auth failures map to auth_not_ready [0.86ms]
88 | test("madv-surface keeps both raw stream limits and metadata-only diagnostics", async () => {
89 |   const valid = wire(init, response);
90 |   for (const limit of [65_536, 65_537]) {
91 |     const stdout = valid + " ".repeat(limit - new TextEncoder().encode(valid).byteLength);
92 |     const result = await runBoundedProbe(request(), complete(stdout));
93 |     expect(result.ok).toBe(limit === 65_536); expect(result.diagnostic.stdoutBytes).toBe(limit);
                           ^
error: expect(received).toBe(expected)

Expected: true
Received: false

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/supervisor/test/madv-probes.test.ts:93:23)
(fail) madv-surface keeps both raw stream limits and metadata-only diagnostics [0.36ms]
(pass) madv-surface pre-spawn cancellation and spawn failure fail closed [0.50ms]
(pass) madv-surface cancellation retains bounded cleanup and reaping [501.26ms]

packages/supervisor/test/madv-preflight.test.ts:
(pass) missing MINIMAX_API_KEY maps to auth_not_ready before probes [133.43ms]
(pass) madv-surface reuses one allowlisted environment for four consumers [105.61ms]
(pass) madv-surface probes run exactly once with pinned arguments and input [107.98ms]
(pass) unsupported madv-surface roles fail before any probe [112.22ms]
(pass) madv-surface hash and version changes refuse the capability record [187.99ms]
(pass) real registry admits Claude with madv-surface and refuses shared review control [63.68ms]
(pass) real-registry Antigravity is refused before its probes [102.75ms]

 20 pass
 4 fail
 210 expect() calls
Ran 24 tests across 3 files. [1369.00ms]
````

logs/125-r2-parser-and-recordings.log · SHA-256 539e102dfeb21ae089ddedb9afa50ea4faecb855e97f43c24b66097d6ec7e9f4

````text
Traceback (most recent call last):
  File "<stdin>", line 27, in <module>
  File "/opt/homebrew/Cellar/python@3.15/3.15.2/Frameworks/Python.framework/Versions/3.15/lib/python3.15/pathlib/__init__.py", line 1008, in write_text
    with self.open(mode='w', encoding=encoding, errors=errors, newline=newline) as f:
         ~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/opt/homebrew/Cellar/python@3.15/3.15.2/Frameworks/Python.framework/Versions/3.15/lib/python3.15/pathlib/__init__.py", line 970, in open
    return io.open(self, mode, buffering, encoding, errors, newline)
           ~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
PermissionError: [Errno 13] Permission denied: '/private/tmp/m0-admission-r1.Eo5Hwr47/mutate.py'
````

logs/233-full-typecheck.log · SHA-256 96a941b7f78a28529fc921051ad5d7bdeb2d01de365d089863d983569423a876

````text
packages/adapter-madv-surface/test/fixture-integrity.test.ts(33,108): error TS2769: No overload matches this call.
  Overload 1 of 2, '(expected: { file: string; digest: string; }): void', gave the following error.
    Type 'string | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.
  Overload 2 of 2, '(expected: NoInfer<{ file: string; digest: string; }>): void', gave the following error.
    Type 'string | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.
````

### Full run after restoration

Each install recorded a before and after lockfile SHA-256. The mode restoration returned the tree to clean. The restarted, discarded runs are identified above.

logs/303-resumed-full-runtime.log · SHA-256 782189ca1e13644c2a8a456042bec98e23ee8bb91715d0ee10e090b9ccfa9459

````text
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
````

logs/304-resumed-full-lock-before.log · SHA-256 f8d8b269b46609dc6bbf6e8d37643ff949916c94d0b5d63dcadc706f41d5baef

````text
a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock
````

logs/305-resumed-full-install.log · SHA-256 01c96c262114bdc318cc20c999cac4c8cd47a89f4b5335add371bfdba0065271

````text
bun install v1.4.2 (744846f84)

+ @types/bun@1.4.2
+ @types/react@19.3.0
+ @types/react-test-renderer@19.3.0
+ react-test-renderer@19.3.0
+ @opentui/core@0.5.11
+ @opentui/react@0.5.11
+ react@19.3.0
+ typescript@5.9.3

51 packages installed [139.00ms]
````

logs/306-resumed-full-lock-after.log · SHA-256 f8d8b269b46609dc6bbf6e8d37643ff949916c94d0b5d63dcadc706f41d5baef

````text
a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock
````

logs/307-resumed-full-install-tree.log · SHA-256 17522c2c8c9ed02303cca966ab8d37a96d762d52e395b772f5b0c2188c602803

````text
 mode change 100644 => 100755 packages/founder-act/src/main.ts
````

logs/308-resumed-full-install-restore.log · SHA-256 c10cfe32aa880e98d7df26dff0367a92ba5f477af4a2ee7c2b156f174c076221

````text

````

logs/309-resumed-full-restored-tree.log · SHA-256 a726affa1ddd5a5df4fb5239fc40f8d51ce032d44e6a67f97716f61130cf2091

````text

````

logs/310-resumed-full-typecheck.log · SHA-256 7c754034fb51a0bf7fe229ce52c46f7ea08a6e03f04aee99592af6c186ad24ea

````text

````

logs/311-resumed-suite-runtime.log · SHA-256 4628b3e8cb4842a119bcc753e2b2859e129171d9eb29b51ec651b486dc3b25ed

````text
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
````

logs/312-resumed-suite-wait.log · SHA-256 5c224399104d323e1eb88919c5ffbf1faf1311947be927e9f916a2a5ebda384f

````text
22:12  up 13:40, 8 users, load averages: 6.59 3.57 2.51
22:13  up 13:40, 8 users, load averages: 4.78 3.42 2.49
22:13  up 13:41, 8 users, load averages: 5.52 3.70 2.62
22:14  up 13:41, 8 users, load averages: 4.89 3.71 2.66
22:14  up 13:42, 7 users, load averages: 3.52 3.49 2.61
22:15  up 13:42, 7 users, load averages: 2.93 3.35 2.59
22:15  up 13:43, 7 users, load averages: 2.80 3.27 2.58
22:16  up 13:43, 7 users, load averages: 2.40 3.12 2.55
22:16  up 13:44, 7 users, load averages: 2.40 3.06 2.55
22:17  up 13:44, 7 users, load averages: 2.48 3.02 2.55
22:17  up 13:45, 2 users, load averages: 5.05 3.64 2.80
22:18  up 13:45, 2 users, load averages: 3.78 3.48 2.77
22:18  up 13:46, 2 users, load averages: 2.98 3.30 2.73
22:19  up 13:46, 2 users, load averages: 2.36 3.11 2.68
22:19  up 13:47, 2 users, load averages: 2.16 2.99 2.65
22:20  up 13:47, 2 users, load averages: 2.15 2.91 2.63
22:20  up 13:48, 2 users, load averages: 1.69 2.73 2.57
````

logs/313-resumed-suite.log · SHA-256 c1fd97a268edc9789b6950d0ed8c0b60e25393beebd4d213c50fcf1e9f4c3840

````text
 2032 pass
 3 fail
 27347 expect() calls
Ran 2035 tests across 150 files. [183.06s]
````

### Deviations · second halt and digest commit

The second halt followed the full run at f73b5649afff86b558978cb76d09132bc0a7396a. Log 313, SHA-256 c1fd97a268edc9789b6950d0ed8c0b60e25393beebd4d213c50fcf1e9f4c3840, recorded 2032 pass and 3 fail across 150 files. All three failures reported exception-drift on the registry’s original whole-file pin. The eight new tests passed and every baseline case was present. The archived second halt report, pr/m0-admission-phase1-halt-2-report.md, has SHA-256 a527426c3fe481189e36e9bcbc5142c130bccfe9abecde1f42c5f6d96a51c6fd.

Signed Addendum 2 SHA-256 5dc0fddf411f8abce1e20df834ce21d0676b1fcd538fe12ad3d49a34ffa8be81 amends B5 item 3 for one line. The signed second resume message has SHA-256 eab2fbf86a415032716dd0cf56f01c9179994756f67f8b8bb8e21612e21534d7. Commit 6ebfc3060be33279fa3567563b6b0c8d48122b1c, parent f73b5649afff86b558978cb76d09132bc0a7396a, changes only the sha256 at line 24 of test/phase3a/harness-separation.test.ts. The base registry SHA-256 was fe5fd51a559890adf9e1d87a7d0c73d62e9500dbc0cfcda0f1da9ac9aa938453. The registry with the two B2 changes has SHA-256 6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4. The sole permitted call of Symbol.iterator on source is unchanged. The new scope applies to the pin alone. No break was repeated. The full run and R4 used the digest commit under this second resumption.

Complete registry and line-24 diffs. Trailing whitespace is removed from each quoted line.

logs/429-gate-registry.log · SHA-256 2319e04d371a807136fe0e8be8d48bbe67a5dec3f144d3fd48e994f6947e0785

````text
diff --git a/packages/protocol/src/adapter-registry.ts b/packages/protocol/src/adapter-registry.ts
index 7a2f298..28effbc 100644
--- a/packages/protocol/src/adapter-registry.ts
+++ b/packages/protocol/src/adapter-registry.ts
@@ -79,9 +79,9 @@ const MADV_SURFACE_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
   surface: parseSurfaceId("madv-surface"),
   executable_name: "madv-surface",
   provider: "minimax",
-  supported_versions: ["0.1.1"],
+  supported_versions: ["0.1.2"],
   identity_probe: {
-    argv: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--profile", "minimax", "--require-model", "--role", "reviewer", "--no-session-persistence", "--max-turns", "1"],
+    argv: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--profile", "minimax", "--require-model", "--role", "reviewer", "--no-session-persistence", "--no-tools", "--max-turns", "1"],
     parse: "json",
   },
   auth_readiness_probe: { argv: ["auth", "status", "--profile", "minimax"], parse: "json" },
````

logs/431-gate-pin.log · SHA-256 39ba7410991845bc6104cd33247f9848c7ff332751bb0957a8669490f6a3fdaf

````text
diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts
index bb7176a..d3221df 100644
--- a/test/phase3a/harness-separation.test.ts
+++ b/test/phase3a/harness-separation.test.ts
@@ -21,7 +21,7 @@ const ROUTER_TARGET = "../../../test/phase3a/fixture-adapters";
 const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> = {
   [ROUTER_IMPORTER]: { sha256: "2faefe54d7c9be2051bce621629203072515263d58bc69b31bd2fe927faedb01" },
   "packages/protocol/src/adapter-registry.ts": {
-    sha256: "fe5fd51a559890adf9e1d87a7d0c73d62e9500dbc0cfcda0f1da9ac9aa938453", call: "source[Symbol.iterator]()",
+    sha256: "6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4", call: "source[Symbol.iterator]()",
   },
   "packages/protocol/src/lifecycle-events.ts": {
     sha256: "9210012a505848a7379ab7b9cf9d840f33197de58f85b23c359653760479c603", call: "PAYLOAD_SHAPE[knownType](payload)",
````

logs/406-pin-head.log · SHA-256 9ce72f5a99651f3443f161551d390fc62bc896c4cb46f46b2e9ba692ca31b903

````text
6ebfc3060be33279fa3567563b6b0c8d48122b1c f73b5649afff86b558978cb76d09132bc0a7396a test(phase3a): pin the registry digest of the 0.1.2 admission
````

### Passing full run at the digest commit

logs/407-admission-full-runtime.log · SHA-256 02b1d6829a2c56abdcf1d5fe012ebcd548b685817d81265ce4f58544d742207d

````text
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
````

logs/408-admission-lock-before.log · SHA-256 c266d2b1d6e82ebde11c297cb512f7834166b17e56ba1f7f749912e6a4f6e3ed

````text
a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock
````

logs/409-admission-full-install.log · SHA-256 5f9ff617d229bd7caca25ad280e012625ba01adae11204540d083fbfa5f2dc6b

````text
bun install v1.4.2 (744846f84)

Checked 87 installs across 131 packages (no changes) [18.00ms]
````

logs/410-admission-lock-after.log · SHA-256 c266d2b1d6e82ebde11c297cb512f7834166b17e56ba1f7f749912e6a4f6e3ed

````text
a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock
````

logs/411-admission-install-mode.log · SHA-256 533359953b6ffb907e0d62109f357987db9e7b3195db68e9ab1c4bf648dd8ec0

````text
 mode change 100644 => 100755 packages/founder-act/src/main.ts
````

logs/412-admission-mode-restore.log · SHA-256 ce6d7b8ca27bb79068024c5a3640c83ae4cd6ecd15a30d28d5f96e04b3838944

````text

````

logs/413-admission-install-status.log · SHA-256 f9673a94f82e6e85e1d81dcb9a581892ee27665fa25b2adb0d6bf6db6e59157b

````text

````

logs/414-admission-typecheck.log · SHA-256 b3027ba168db2c06c77827086198cc44d21b9d558249750e6c8960ce80f42ba8

````text

````

logs/415-admission-suite-runtime.log · SHA-256 2fb9d5aca65ffe5bfb080923c64caa497acc82735873d15f983a15f417834f0f

````text
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
````

logs/416-admission-suite-wait.log · SHA-256 1a9d3c659ab698afd9a9e96f5719f950df2fff62b5c3493e5b7f6afa64d8f661

````text
23:06  up 14:34, 2 users, load averages: 2.28 2.40 2.82
23:07  up 14:34, 2 users, load averages: 1.94 2.30 2.77
````

logs/417-admission-suite.log · SHA-256 497402226fb2b70a4a472dacfceb0cba471a85a0185c9788f1ed3a53f2c9293b

````text
 2035 pass
 0 fail
 27439 expect() calls
Ran 2035 tests across 150 files. [187.76s]
````

logs/436-gate-harness-file.log · SHA-256 54d7dbbd17c6b427ed9927abd23b8c248c8bafc0afe1bdcc0a30fa2af9958ae6

````text
test/phase3a/harness-separation.test.ts	no file under apps/ or packages/*/src statically imports, command-dispatches to, or argument-gates runtime-harness	pass
test/phase3a/harness-separation.test.ts	no production file uses a dynamic import or environment-gated route to the test tree	pass
test/phase3a/harness-separation.test.ts	no production file constructs a filesystem path into the test tree	pass
test/phase3a/harness-separation.test.ts	the harness rejects a real registered surface	pass
test/phase3a/harness-separation.test.ts	the harness exposes no gate-removal function	pass
test/phase3a/harness-separation.test.ts	fixture surface ids are absent from the production registry	pass
test/phase3a/harness-separation.test.ts	running the fixture harness in an isolated process creates no broker.sock	pass
7 passing cases
````

The base list is logs/071-base-list.log · SHA-256 40c337b7b22cebbc7dff8783392e36a7e7670b3c805f0a7ab2081be52a2c4a52. The head list is logs/425-resumed-head-list.log · SHA-256 66077a0070554429f95041e7645c878016437eb0c1a980e45fb7a8a8a2621097. Both derive directly from individual Bun result lines. The multiset comparison preserves duplicates, file, name and pass result, with the five Addendum 1 renames.

logs/426-resumed-comparison.log · SHA-256 6735f6a264d40ad50e24f14f7d6ff52e408ead3a2823bb933e7a1e1c9dd08868

````text
recorded.test.ts rename macbook 04 recorded identity passes for MiniMax-M3.1-Flash => macbook 04 recorded tools fail probe identity and pass a governed launch
recorded.test.ts rename macbook 05 recorded identity passes for MiniMax-M3.1-Flash => macbook 05 recorded tools fail probe identity and pass a governed launch
recorded.test.ts rename macbook 06 recorded identity passes for MiniMax-M3.1-Flash => macbook 06 recorded tools fail probe identity and pass a governed launch
recorded.test.ts rename ubuntu 04 recorded identity passes for MiniMax-M3.1-Flash => ubuntu 04 recorded tools fail probe identity and pass a governed launch
recorded.test.ts rename ubuntu 06 recorded identity passes for MiniMax-M3.1-Flash => ubuntu 06 recorded tools fail probe identity and pass a governed launch
ADDED	packages/adapter-madv-surface/test/fixture-integrity.test.ts	recorded manifest covers every fixture and matches its SHA-256	pass
ADDED	packages/adapter-madv-surface/test/parser.test.ts	Claude and Anthropic ids are refused before family resolution	pass
ADDED	packages/adapter-madv-surface/test/parser.test.ts	identity requires an empty tool array while a governed launch accepts tools	pass
ADDED	packages/adapter-madv-surface/test/parser.test.ts	probe and launch require a non-empty string response_id on every response	pass
ADDED	packages/protocol/test/adapter-registry.test.ts	madv-surface 0.1.2 reserves --no-tools for the identity probe	pass
ADDED	packages/supervisor/test/madv-allowlist.test.ts	madv-surface-v1 selects exactly the B6 variable set	pass
ADDED	packages/supervisor/test/madv-intervals.test.ts	madv-surface auth keeps 500 ms grace and 1000 ms cleanup	pass
ADDED	packages/supervisor/test/madv-intervals.test.ts	madv-surface identity keeps 500 ms grace and 1000 ms cleanup	pass
ADDED FILE packages/adapter-madv-surface/test/fixture-integrity.test.ts
ADDED FILE packages/supervisor/test/madv-allowlist.test.ts
ADDED FILE packages/supervisor/test/madv-intervals.test.ts
2027 + 8 = 2035 tests
147 + 3 = 150 files
````

Full-run repository checks. Each git command used the required two configuration overrides.

logs/427-gate-diff-check.log · SHA-256 e18effca4c61d31940c375704a814e87a65d58e502de107182f40f5c7b9b042f

````text

````

logs/428-gate-paths.log · SHA-256 dca9b1bf8993b3dbc36b61eec0b7d89751163eb0fe6514970ded2562ddc6e321

````text
docs/verification/phase-3b-m0-admission-build-log.md
packages/adapter-madv-surface/src/index.ts
packages/adapter-madv-surface/test/fixture-integrity.test.ts
packages/adapter-madv-surface/test/parser.test.ts
packages/adapter-madv-surface/test/recorded.test.ts
packages/protocol/src/adapter-registry.ts
packages/protocol/test/adapter-registry.test.ts
packages/supervisor/test/madv-allowlist.test.ts
packages/supervisor/test/madv-intervals.test.ts
packages/supervisor/test/madv-probes.test.ts
test/phase3a/harness-separation.test.ts
````

Both diffs below have trailing whitespace removed on each quoted line.

logs/429-gate-registry.log · SHA-256 2319e04d371a807136fe0e8be8d48bbe67a5dec3f144d3fd48e994f6947e0785

````text
diff --git a/packages/protocol/src/adapter-registry.ts b/packages/protocol/src/adapter-registry.ts
index 7a2f298..28effbc 100644
--- a/packages/protocol/src/adapter-registry.ts
+++ b/packages/protocol/src/adapter-registry.ts
@@ -79,9 +79,9 @@ const MADV_SURFACE_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
   surface: parseSurfaceId("madv-surface"),
   executable_name: "madv-surface",
   provider: "minimax",
-  supported_versions: ["0.1.1"],
+  supported_versions: ["0.1.2"],
   identity_probe: {
-    argv: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--profile", "minimax", "--require-model", "--role", "reviewer", "--no-session-persistence", "--max-turns", "1"],
+    argv: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--profile", "minimax", "--require-model", "--role", "reviewer", "--no-session-persistence", "--no-tools", "--max-turns", "1"],
     parse: "json",
   },
   auth_readiness_probe: { argv: ["auth", "status", "--profile", "minimax"], parse: "json" },
````

logs/430-gate-recorded.log · SHA-256 bea2d435c759a01d453ae2f434125f76330ea32b316adea5d2966cd468590a45

````text
diff --git a/packages/adapter-madv-surface/test/recorded.test.ts b/packages/adapter-madv-surface/test/recorded.test.ts
index 93bff68..3cdaf8d 100644
--- a/packages/adapter-madv-surface/test/recorded.test.ts
+++ b/packages/adapter-madv-surface/test/recorded.test.ts
@@ -1,6 +1,6 @@
 import { expect, spyOn, test } from "bun:test";
 import { readFileSync } from "node:fs";
-import { parseMadvAuthReadiness, parseMadvIdentity } from "../src/index";
+import { MadvSurfaceParser, parseMadvAuthReadiness, parseMadvIdentity } from "../src/index";

 // These are the Founder's sanitized recorded bytes, not synthetic streams.
 // SANITIZE.txt replaced UUID-shaped session_id values only: MacBook stdout
@@ -33,9 +33,17 @@ for (const [host, capture] of [
   ["macbook", "04"], ["macbook", "05"], ["macbook", "06"],
   ["ubuntu", "04"], ["ubuntu", "06"],
 ]) {
-  test(host + " " + capture + " recorded identity passes for MiniMax-M3.1-Flash", () => {
+  test(host + " " + capture + " recorded tools fail probe identity and pass a governed launch", () => {
     const f = fixture(host!, capture!);
-    expect(parseMadvIdentity(f.output, model, ["0.1.1"], f.exit, f.signal).ok).toBe(true);
+    expect(parseMadvIdentity(f.output, model, ["0.1.1"], f.exit, f.signal)).toMatchObject({
+      ok: false, cause: "identity_mismatch", reason: "init_tools",
+    });
+    const launch = new MadvSurfaceParser({
+      executionId: "recorded-launch", sessionId: "recorded-session", model,
+      supportedVersions: ["0.1.1"], provider: "minimax", independenceDomain: "minimax",
+    });
+    launch.push(f.output);
+    expect(launch.finish(f.exit, f.signal).ok).toBe(true);
   });
 }
 test("ubuntu 05 recorded identity fails closed with provider_error", () => {
````

logs/432-gate-protected.log · SHA-256 ba8b32aa487f76cb6be5cbe399170f91ea1d56095802567c13eef81fe73e2dad

````text

````

logs/433-gate-status.log · SHA-256 5dee78cfc0420704a295145e2264056c06b6add25f732e23dfe9e934516a00ca

````text
## build/3b-m0-admission-r1
````

logs/434-gate-untracked.log · SHA-256 da1c0e08f61602e7dc2d1418c853f362c3a92a2b7be1f939995659ff2d49d51f

````text

````

logs/435-gate-scope.log · SHA-256 601525e3da93c5f9b933e12ad209bdf18f8e5f054147a89a8a435a91728125ed

````text
All 11 changed paths are within B5 item 3. Working tree and index clean.
````

### Record script

record/m0-admission-record.ts · SHA-256 c6d927b3b87e3ab10fa56709786fedd1f71ad5449bf2a5a037a137d94aece825. Supplied M0 source SHA-256 b9ba9bdadf0ca0b5e792ad78fc46f9212d763ad7455fb122343756be2e6fb593. The complete script and its diff are in logs/442-r4-source.log · SHA-256 31312de147cc7699f3e4ce99ea2a7ab825a0eae3c55526f0ce2665648c4691ad and logs/443-r4-diff.log · SHA-256 6ea1355382918888d20e67f01c32ba0351b68cf2ebdc001b79558fcf04b05408. The eight runs used synthetic captures and the dry-run invocation. The script did not run on Linux.

| Synthetic MacBook folder | Exit | Printed result or refusal | Full output |
| --- | --- | --- | --- |
| 1 | 0 | Identity pass, auth pass, overall pass | logs/452-r4-case-1.log · SHA-256 87df208b2734c94037e50dadb9909b5e6f63edc2a0ed9e76c88e7c7c8bb2a039 |
| 2 | 0 | Identity fail, auth pass, overall fail · capture 07 retired id resolves to current served model | logs/454-r4-case-2.log · SHA-256 b52c7698f84fbaa4020c65f80798bb6caa98f1233aaa82358f64740c23b874fa |
| 3 | 0 | Identity fail, auth pass, overall fail · capture 07 retired id resolves to current served model | logs/456-r4-case-3.log · SHA-256 be0cdfcfb7a321e97472423ca4ec645f03a23b23ce80b81b39cc53b02e147b28 |
| 4 | 0 | Identity fail, auth pass, overall fail · capture 07 retired id resolves to current served model | logs/458-r4-case-4.log · SHA-256 45f3abfc87d3a1e295a5dce5ebfb5cf2c9fdba8bbd44609fff27edfe58a85262 |
| 5 | 0 | Identity fail, auth pass, overall fail · capture 4 identity parser | logs/460-r4-case-5.log · SHA-256 d27277109e69c2e2f8d82e8910737327bcf230b6ac2c1742b93aa92b43f6e496 |
| 6 | 1 | REFUSED capture 2 version pin | logs/462-r4-case-6.log · SHA-256 3bb2c41698ed2e1cc7398c5ee2cb22f9ef2786bce070471485f6210bb957b53c |
| 7 | 1 | REFUSED capture 1 binary path and SHA-256 pin | logs/464-r4-case-7.log · SHA-256 ed5d81b756eee2aee3844626192d3b18f01560bcbf4c757a77274555bb853fbf |
| 8 | 1 | REFUSED manifest hash mismatch: madv-surface/04.stdout | logs/466-r4-case-8.log · SHA-256 340db8bfdfe863147b46731f43aea0e8431c6a0cfde5d1cb15c74e1256de1a23 |

### Declarations and pending work

No live call was made. No surface was run and no real key was used. No capability record was written. No request left the host other than any package downloads by bun install --frozen-lockfile.

Phase 1 ends before the Founder’s B7 investigation and B8 stored records. Phase 2’s new fixtures and packet, B10 gates, the Founder’s two-host runs, independent review and the Founder’s session-record check remain pending.

Addendum 2 authorized the one-line digest commit after the second halt. The first change to the opening task detail was the signed correction permitting earlier tests to fail under breaks 11 and 12. The runtime halt, excluded runs, full-run restart, corrective commit, timing of the two resumed breaks, scratch-helper repair and evidence-recording details are recorded above.

### Command evidence

Loads, exit statuses and SHA-256 values follow for logs through the preparation of this closing section. Final documentation and attribution commands are recorded in the Phase 1 report. The original logs preserve command output and diff whitespace.

| Wait | Command that followed |
| --- | --- |
| 056-baseline-wait.log | 057-baseline-suite.log |
| 086-r1-pin-wait.log | 087-r1-pins.log |
| 091-r1-wait.log | 092-r1-tests.log |
| 111-break-1-wait.log | 112-break-1-tests.log |
| 117-break-2-wait.log | 118-break-2-tests.log |
| 132-r2-wait.log | 133-r2-tests.log |
| 142-break-3-wait.log | 143-break-3-tests.log |
| 148-break-4-wait.log | 149-break-4-tests.log |
| 154-break-5-wait.log | 155-break-5-tests.log |
| 160-break-6-wait.log | 161-break-6-tests.log |
| 166-break-7-wait.log | 167-break-7-tests.log |
| 178-r3-wait.log | 179-r3-tests.log |
| 184-break-8-old-wait.log | 185-break-8-old.log |
| 186-break-8-related-wait.log | 187-break-8-related.log |
| 188-break-8-tests-wait.log | 189-break-8-tests.log |
| 194-break-9-old-wait.log | 195-break-9-old.log |
| 196-break-9-related-wait.log | 197-break-9-related.log |
| 198-break-9-tests-wait.log | 199-break-9-tests.log |
| 204-break-10-old-wait.log | 205-break-10-old.log |
| 206-break-10-related-wait.log | 207-break-10-related.log |
| 208-break-10-tests-wait.log | 209-break-10-tests.log |
| 283-break-11-old-wait.log | 284-break-11-old.log |
| 285-break-11-related-wait.log | 286-break-11-related.log |
| 287-break-11-tests-wait.log | 288-break-11-tests.log |
| 294-break-12-old-wait.log | 295-break-12-old.log |
| 296-break-12-tests-wait.log | 297-break-12-tests.log |
| 312-resumed-suite-wait.log | 313-resumed-suite.log |
| 416-admission-suite-wait.log | 417-admission-suite.log |
| 451-r4-1-wait.log | 452-r4-case-1.log |
| 453-r4-2-wait.log | 454-r4-case-2.log |
| 455-r4-3-wait.log | 456-r4-case-3.log |
| 457-r4-4-wait.log | 458-r4-case-4.log |
| 459-r4-5-wait.log | 460-r4-case-5.log |
| 461-r4-6-wait.log | 462-r4-case-6.log |
| 463-r4-7-wait.log | 464-r4-case-7.log |
| 465-r4-8-wait.log | 466-r4-case-8.log |

| Log and command | Load reading | Exit | SHA-256 |
| --- | --- | --- | --- |
| 073-timer-types.log · rg -n advanceTimersByTimeAsync\|advanceTimersByTime\(\|runAllTicks\|useFakeTimers\( tui/node_modules/@types/bun tui/node_modules/bun-types | 14:43  4 users, load averages: 2.72 1.96 2.06 | 2 | 1a01ecaf2926c2f096a3dd86b5822ad3944e094bfb58fe1153ed961ec5f2c148 |
| 074-record-fields.log · rg -n function proposeStorageRoot\|proposeStorageRoot\( tui/packages/storage/src | 14:43  4 users, load averages: 2.72 1.96 2.06 | 0 | a876499729f293b2b8ab622a846c74d1c3723f573864d5cdc6e02ad47d30674f |
| 075-baseline-tree.log · git -C tui status --porcelain | 14:44  4 users, load averages: 2.80 2.01 2.07 | 0 | b61ed51c2ced17a033a88aacc9e4e6e14ce0b13b194083aba17568ce7d6fafa5 |
| 076-open-log.log · python3 - /private/tmp/m0-admission-r1.Eo5Hwr47 | 14:44  4 users, load averages: 2.80 2.01 2.07 | 0 | 0701c7a1c93fe2578dc0b4aad9913b157b0143b7718ac1a3bb245705c3159f20 |
| 077-open-message.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/commit-1.txt | 14:44  4 users, load averages: 2.44 1.96 2.06 | 0 | 1ebf26370c334d5700bf12b78c8da3afd1505781b45ed6b9ad99f00acddba04f |
| 078-check-message-1.log · check_message /private/tmp/m0-admission-r1.Eo5Hwr47/commit-1.txt | 14:44  4 users, load averages: 2.44 1.96 2.06 | 0 | c61c6798d53c31e9fd1ced8b0eecf2a93ba75a3859cd0806bf8a04adaaef7a44 |
| 079-stage-opening.log · git -C tui add docs/verification/phase-3b-m0-admission-build-log.md | 14:44  4 users, load averages: 2.44 1.96 2.06 | 0 | 118ceb9d6a546ff396e3cd1175834a0068dd4b303ad79daa10de7ef48ee296fe |
| 080-opening-check.log · git -C tui diff --cached --check | 14:44  4 users, load averages: 2.44 1.96 2.06 | 0 | a596c13f7e37eccfab1e96844cb55a3d893dd108896f135910abbc2b1a4f8094 |
| 081-commit-opening.log · git commit -F /private/tmp/m0-admission-r1.Eo5Hwr47/commit-1.txt | 14:44  4 users, load averages: 2.32 1.94 2.05 | 0 | f5aff23958416b6e0800b90c65c32f050ab4c10cec69dfc6c90371ca203df0bf |
| 082-opening-head.log · git log -1 --format=%H %P %s | 14:44  4 users, load averages: 2.32 1.94 2.05 | 0 | 8d84c15c21bdec371064537e69e1abb5a89bcd58c9fcb8badd9c77130131c338 |
| 083-r1-change.log · python3 - | 14:44  4 users, load averages: 2.02 1.90 2.03 | 0 | 9c24a3bed742c8fd209ebc630e4fa4154576d81760b66e1b324fc141eaeabc31 |
| 084-r1-test.log · tee -a tui/packages/protocol/test/adapter-registry.test.ts | 14:44  4 users, load averages: 2.02 1.90 2.03 | 0 | 67425cfa23ce9245354816d0d7f7321ac8b7c08700eb39e360a8007801a5c0db |
| 085-r1-runtime.log · runtime_check | 17:07  up  8:34, 4 users, load averages: 6.44 2.67 1.95 | 0 | d9548863ffcec2cc41b4487b62439ba6957ecfa00628a467f1e6f4894e5b7234 |
| 086-r1-pin-wait.log · load_wait | 17:15  up  8:42, 4 users, load averages: 1.30 1.67 1.74 | 0 | 60d2e84e2d424f835b51b5c58e5a2f36d56432496ed750135c7f422b12a5b70a |
| 087-r1-pins.log · bun test packages/protocol/test/adapter-registry.test.ts packages/supervisor/test/madv-probes.test.ts packages/supervisor/test/madv-preflight.test.ts | 17:15  up  8:42, 4 users, load averages: 1.30 1.67 1.74 | 1 | 86e6e532b38fa6aa11770ba5356d2d2f179c13c4a86aa358c56ff586f54b8169 |
| 088-update-failed-pins.log · python3 - | 17:15  4 users, load averages: 1.31 1.65 1.73 | 0 | b61ad6fee88f314397784a8564c185c72f1b4b640928c6de3fda89139156e1e9 |
| 089-stage-registration.log · git -C tui add packages/protocol/src/adapter-registry.ts packages/protocol/test/adapter-registry.test.ts packages/supervisor/test/madv-probes.test.ts | 17:15  4 users, load averages: 1.31 1.65 1.73 | 0 | e587f7731afc0bf5fbb2e58461693162798624c697923ff775216fe106f3e0de |
| 090-check-registration.log · git -C tui diff --cached --check | 17:15  4 users, load averages: 1.31 1.65 1.73 | 0 | 3a9ff68d8772dd640ab70a23349f6c4eea7e05b173c7366f23b499aad2d4df77 |
| 091-r1-wait.log · load_wait | 17:16  up  8:44, 4 users, load averages: 5.38 2.64 2.09 | 0 | 95d47e143e2db1e48176335c76d4ea34b3899119f0c16abd5413578e62e15ef3 |
| 092-r1-tests.log · bun test packages/protocol/test/adapter-registry.test.ts packages/supervisor/test/madv-probes.test.ts packages/supervisor/test/madv-preflight.test.ts | 17:20  up  8:48, 4 users, load averages: 1.55 2.47 2.18 | 0 | 6884c6ca9db2738141f6dee8b8d00cef49162b500078ba67f08b4a7e58253f36 |
| 093-r1-message.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/commit-2.txt | 17:17  4 users, load averages: 5.17 2.77 2.15 | 0 | 5a649a6515674f058aa57296f5a4e03acbe9ba50b23c1a1e201cf1f3f17c3a0d |
| 094-check-message-2.log · check_message /private/tmp/m0-admission-r1.Eo5Hwr47/commit-2.txt | 17:17  4 users, load averages: 5.17 2.77 2.15 | 0 | 95f38f9fe8ffb853a560a4786008e400aaa5afd064e442f0223a18d5c1eb4f7e |
| 095-mutation-helper.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/mutate.py | 17:17  4 users, load averages: 5.17 2.77 2.15 | 0 | eb758594ef61ca7973ddfceb4c48276dafce051d1ca3b4511e2ea3136ea66d74 |
| 096-timer-api.log · rg --hidden --no-ignore -n -g *.d.ts advanceTimersByTimeAsync\|runAllTimersAsync tui/node_modules/.bun | 17:17  4 users, load averages: 5.12 2.88 2.20 | 1 | 108ddb37602c3f304900da2a0089c469291330da90aa8c9fe536f33ae0ab27d4 |
| 097-probe-teardown.log · sed -n 170,198p tui/packages/supervisor/src/attestation.ts | 17:17  4 users, load averages: 5.12 2.88 2.20 | 0 | 09ad4d27a24609ff550e6d6ae566c826a2b38419f6c7ed018a07ef30a1a481a4 |
| 098-prepare-break-record.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/breaks.zsh | 17:17  4 users, load averages: 3.99 2.77 2.17 | 0 | 70669506b5aa7ae1c7444d21dda002853eb2c01a3e88cc1e7528b504d99ce44a |
| 099-supplied-record-sections.log · sed -n 196,258p prompt/m0-record-r3.ts | 17:17  4 users, load averages: 3.67 2.73 2.16 | 0 | 5a2fdccb5b1b88699075d2e6338236f9092caafbede1aec2138dfb0ee082a2d4 |
| 100-reference-registration.log · cat reference/madv-surface/docs/registration-proposal.md | 17:17  4 users, load averages: 4.82 2.98 2.25 | 0 | 5b7310a81e2f8988235a70ee9b40ad866569e85dab43ea800884313679865b58 |
| 101-input-events.log · sed -n 145,245p reference/madv-surface/README.md | 17:17  4 users, load averages: 4.82 2.98 2.25 | 0 | 53c5c57c8ea6ffa20bf4c88279550721a13e447ce65b804b8055e042f381753c |
| 102-prepare-test-comparison.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/compare.py | 17:18  4 users, load averages: 3.71 2.89 2.24 | 0 | bf1daa3c3546bb93fb4195b510dfba0568f31fd3baae9695fbcec1c4fd6a5d44 |
| 103-break-evidence-reader.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/check-break.py | 17:18  4 users, load averages: 3.89 2.95 2.27 | 0 | d92c7918827558babd6f151b22ee0e60963c723aa1725be30840389c7981e6f5 |
| 104-attribution-pr-mode.log · sed -n /^  pr)/,/^  main)/p tui/.github/scripts/attribution-shape-check.sh | 17:19  4 users, load averages: 2.90 2.80 2.24 | 0 | ddaec6fce49cbb48750ec4a0fd31e193e8ceffee2e7e89129fec8cd305fbb178 |
| 105-report-diff-format.log · git -C tui diff --cached --stat | 17:19  4 users, load averages: 2.90 2.80 2.24 | 0 | 21b20c7749052a90433eae35e98dce6ac776674cef43b9cfd21b9e8758ce0eba |
| 106-source-format-check.log · python3 - | 17:19  4 users, load averages: 3.26 2.88 2.28 | 0 | 276eb242f42d1e7de47acc59e1de7bc068c40fd058b0c0c68e5d95ce2e1e5ade |
| 107-supplementary-rules.log · rg -n ^B[1-9]\.\|^Part D tui/docs/decisions/DEC-20261112-03-addendum-2-gate-repeat.md tui/docs/decisions/DEC-20261108-04-addendum-1-corrections.md | 17:19  4 users, load averages: 3.26 2.88 2.28 | 0 | a57b97a14ada472b243b2d071a63424f1e71f2bc8390cf5ef7b4b9f42fd091d9 |
| 108-document-report-functions.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/report_format.py | 17:20  4 users, load averages: 2.18 2.67 2.24 | 0 | 7e70201d4d730b96e7e06f8079ef0c9a2de9512288e4c6dc8c5a3efc9c0819b2 |
| 109-break-1-diff.log · start_break 1 | 17:21  4 users, load averages: 1.35 2.38 2.15 | 0 | 1a9bfaae38b31ebd02a7ada50c4a360c947ab6851c8c5b50fe16bec90e8ff573 |
| 110-break-1-runtime.log · runtime_check | 17:34  up  9:01, 4 users, load averages: 3.47 2.39 2.19 | 0 | 74140c43ba313761c284effc9d6b1b69548bbc33c6cd68e7a8ac7e77816d8dd7 |
| 111-break-1-wait.log · load_wait | 17:34  up  9:01, 4 users, load averages: 3.47 2.39 2.19 | 0 | 1f3125670d9635dea5a4e8a791377275357ef04e5e21b1f138070561434f1e2e |
| 112-break-1-tests.log · bun test packages/protocol/test/adapter-registry.test.ts | 17:36  up  9:03, 4 users, load averages: 1.92 2.26 2.16 | 1 | f1b0fe1cd6de4c6661e3ddd87471772e79090f9d94a74c3d3cbcefbb7be93952 |
| 113-break-1-observed.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/check-break.py 1 logs/112-break-1-tests.log | 17:36  4 users, load averages: 1.92 2.26 2.16 | 0 | 059098022265189320114a36096404e19370e080a8fc1e86bc05156661a99652 |
| 114-break-1-restore.log · restore_break 1 | 17:36  4 users, load averages: 1.92 2.26 2.16 | 0 | d16bcc0cf9fb1298e71e9f38024e81999e7fcafb5ae0896ca75508edd24a9d8f |
| 115-break-2-diff.log · start_break 2 | 17:36  4 users, load averages: 1.92 2.26 2.16 | 0 | 5e7f3053b5a2e60da8dc97073f50b0fcc6af7ec70d5dc23a22216cb579bc423a |
| 116-break-2-runtime.log · runtime_check | 18:30  up  9:58, 5 users, load averages: 2.59 2.58 2.65 | 0 | 470c9a715951bc2cd49afc441e9568e9d2499391c1abb3edd44d45e91ce2a0de |
| 117-break-2-wait.log · load_wait | 18:30  up  9:58, 5 users, load averages: 2.71 2.60 2.65 | 0 | e42d7ca8fb6eaa0d7886f2019a579b6d25d1f806c9d3ce6dd39ce2cdfc9d8103 |
| 118-break-2-tests.log · bun test packages/protocol/test/adapter-registry.test.ts | 18:32  up 10 hrs, 5 users, load averages: 1.39 2.26 2.52 | 1 | e09635e00f056a9bd028c79ea7d9e8ee9c37743b34e848b19a63deef722b3ff2 |
| 119-break-2-observed.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/check-break.py 2 logs/118-break-2-tests.log | 18:32  5 users, load averages: 1.39 2.26 2.52 | 0 | a9927edd29dcf8230c362b9e2c15ddc6551a33a0b346e3ddfb2943e194acf7af |
| 120-break-2-restore.log · restore_break 2 | 18:32  5 users, load averages: 1.39 2.26 2.52 | 0 | 24890aa40811ec4cc17423cb045aa6783208485678a34b887b4cac9d8bcd1141 |
| 121-r1-break-wait-status.log · ls -l logs/110-break-1-runtime.log logs/111-break-1-wait.log | 17:36  4 users, load averages: 1.92 2.26 2.16 | 0 | b5be2aeec47ea4ce20476562ab154f4d849ac1228bad280a47d0c3b1577a5b81 |
| 122-commit-registration.log · git commit -F /private/tmp/m0-admission-r1.Eo5Hwr47/commit-2.txt | 18:32  5 users, load averages: 1.35 2.24 2.51 | 0 | 65225091c4c491e45dd993430ec1253f5ee856335ea93d168cc749f51cff3089 |
| 123-registration-proof.log · verify_restore packages/protocol/src/adapter-registry.ts | 18:32  5 users, load averages: 1.35 2.24 2.51 | 0 | 15308c2beb230f6f76900150cdd634d38c786c5492e020d00d740d7ecae2dfbc |
| 124-registration-head.log · git -C tui log -1 --format=%H %P %s | 18:32  5 users, load averages: 1.35 2.24 2.51 | 0 | d7db802c844ede3393c47b70e5a66dd7e2e066fba700cf8e1499006f03c36ea4 |
| 125-r2-parser-and-recordings.log · python3 - | 18:33  5 users, load averages: 1.83 2.27 2.51 | 1 | 539e102dfeb21ae089ddedb9afa50ea4faecb855e97f43c24b66097d6ec7e9f4 |
| 126-r2-test.log · tee -a tui/packages/adapter-madv-surface/test/parser.test.ts | 18:33  5 users, load averages: 1.83 2.27 2.51 | 0 | cf7fddee4ac79377e587383aaa9594866c7d4128b83386c12b63a951f8b8fe40 |
| 127-r2-diff.log · git -C tui diff --check | 18:33  5 users, load averages: 1.83 2.27 2.51 | 0 | 8ef2cad7aeb1cfb1464ad5ac9d4fdbcbfd61e2f09be1d0db1e1aab3c31788521 |
| 128-mutation-helper-mode.log · stat -f %Sp %Su %N /private/tmp/m0-admission-r1.Eo5Hwr47/mutate.py | 18:33  5 users, load averages: 1.76 2.24 2.50 | 0 | c67ca2ff65a5a68197a8cc73797142f62f26a668718d14a1912d854ea5a0960e |
| 129-enable-scratch-write.log · chmod u+w /private/tmp/m0-admission-r1.Eo5Hwr47/mutate.py | 18:33  5 users, load averages: 1.62 2.21 2.48 | 0 | 4779d0ec848fe42d99b6231b0f6345db0f2d2acf735847c29e3375c9b1def7f3 |
| 130-align-breaks.log · python3 - /private/tmp/m0-admission-r1.Eo5Hwr47/mutate.py | 18:33  5 users, load averages: 1.62 2.21 2.48 | 0 | 2896421c9d9e7a8570bd3fe8deb295a8b9d0b29e95084ec556a002db4b7b133e |
| 131-r2-runtime.log · runtime_check | 19:30  up 10:58, 5 users, load averages: 6.85 4.38 2.88 | 0 | 37a7266d8af5cd59e1c4b892869536bc2912e6ff6e81cfd7963e5efab29e4b7e |
| 132-r2-wait.log · load_wait | 19:32  up 11 hrs, 5 users, load averages: 5.29 4.28 3.01 | 0 | 19228188ba36b3a749e4e0a26bc73910d959dbaed373148e707839e703b2d620 |
| 133-r2-tests.log · bun test packages/adapter-madv-surface/test/parser.test.ts packages/adapter-madv-surface/test/recorded.test.ts | 19:35  up 11:03, 5 users, load averages: 1.75 3.19 2.80 | 0 | e5fed9cd240ef34aa8e1291cc01533a9fc5f89f86a7e86998ebd08ccbb8dff52 |
| 134-r2-message.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/commit-3.txt | 19:32  5 users, load averages: 5.38 4.34 3.05 | 0 | caa762dd2b56d4d60bcbe38dd70bd6435d91d74cfdefd7e4c93f07ce909c29dc |
| 135-check-message-3.log · check_message /private/tmp/m0-admission-r1.Eo5Hwr47/commit-3.txt | 19:32  5 users, load averages: 5.38 4.34 3.05 | 0 | 5baec452fa85a3c66d0d261257e28ef58bb18c7f765e1344de2f6943e435842f |
| 136-r2-source-diff.log · git -C tui diff -- packages/adapter-madv-surface/src/index.ts packages/adapter-madv-surface/test/recorded.test.ts | 19:32  5 users, load averages: 5.38 4.34 3.05 | 0 | 6926ca91929f50bd1c2da398466be433170adc3f14112274305051153505635a |
| 137-prepare-change-table.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/change_table.py | 19:34  5 users, load averages: 3.10 3.77 2.95 | 0 | 11e34f13157c1bb77474787917ba130598f4cab3713e5a68abf7e4ba61a88f62 |
| 138-stage-parser.log · git -C tui add packages/adapter-madv-surface/src/index.ts packages/adapter-madv-surface/test/parser.test.ts packages/adapter-madv-surface/test/recorded.test.ts | 19:35  5 users, load averages: 1.69 3.15 2.79 | 0 | b5c6cff8678df3feb8c54c352dfd7f0b7d5c663e937ecb383a1ddeddc5a95402 |
| 139-check-parser.log · git -C tui diff --cached --check | 19:35  5 users, load averages: 1.69 3.15 2.79 | 0 | b6f208b8c0d491151f76495e9dce4de0950686586ec47bb50505416ecf2ff6cf |
| 140-break-3-diff.log · start_break 3 | 19:35  5 users, load averages: 1.68 3.08 2.77 | 0 | 45229ff474852fced53c4171036995986c19d36d1ed4b4a3df28becbc1fb38e7 |
| 141-break-3-runtime.log · runtime_check | 20:02  up 11:30, 7 users, load averages: 1.74 1.60 1.80 | 0 | 0ad35e2b3493ac82a40490baca1d4ed341c3531b1240e856b8ffaec4bf6fad03 |
| 142-break-3-wait.log · load_wait | 20:03  up 11:30, 7 users, load averages: 1.76 1.61 1.80 | 0 | 1e61a900221fc9e13b2668e991a943fba6f42b5a8bd3ceec336307c21bc030e6 |
| 143-break-3-tests.log · bun test packages/adapter-madv-surface/test/parser.test.ts | 20:03  up 11:30, 7 users, load averages: 1.76 1.61 1.80 | 1 | 2b385f5538064cbfc0e9b9491fc15fd843f910950a4a1baaab2c6f851502be1c |
| 144-break-3-observed.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/check-break.py 3 logs/143-break-3-tests.log | 20:03  7 users, load averages: 1.76 1.61 1.80 | 0 | 0b026f1b6d641fe9c33ae04f8bb291b020c16d407d23e6fdef18d8629ab47774 |
| 145-break-3-restore.log · restore_break 3 | 20:03  7 users, load averages: 1.76 1.61 1.80 | 0 | ae238cbd4b26788e19e9973698ecfcfd351c9fe672a250cccff344fcd65103a8 |
| 146-break-4-diff.log · start_break 4 | 20:03  7 users, load averages: 1.76 1.61 1.80 | 0 | 161ccda8215a088607264736a40058b9d982a58dc9fac3392c6998432d38543a |
| 147-break-4-runtime.log · runtime_check | 20:03  up 11:30, 7 users, load averages: 1.76 1.61 1.80 | 0 | f55dac7839cf59cd8183496ee8ae03be09ec9e9347c05650195bc0cb76d5e8d0 |
| 148-break-4-wait.log · load_wait | 20:03  up 11:30, 7 users, load averages: 1.76 1.61 1.80 | 0 | 1e61a900221fc9e13b2668e991a943fba6f42b5a8bd3ceec336307c21bc030e6 |
| 149-break-4-tests.log · bun test packages/adapter-madv-surface/test/parser.test.ts | 20:03  up 11:30, 7 users, load averages: 1.76 1.61 1.80 | 1 | bf8c0f0ffa462fa86add45e5a4e27800092b8c05ee9323c9b2c93435866cef56 |
| 150-break-4-observed.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/check-break.py 4 logs/149-break-4-tests.log | 20:03  7 users, load averages: 1.86 1.63 1.81 | 0 | 258ed1a1f6e24426ce4d1fe5a70881315b043fb6ccf5226b78b2f59b669d5f88 |
| 151-break-4-restore.log · restore_break 4 | 20:03  7 users, load averages: 1.86 1.63 1.81 | 0 | 663654d86cd76b987b56faebe2801b9d071ec885083e53988e1f81bdda5dc587 |
| 152-break-5-diff.log · start_break 5 | 20:03  7 users, load averages: 1.86 1.63 1.81 | 0 | 822f21b4ec0cfdbe545a334229099967b6e387957ba1fb5f2ccfcfd3bc704e7b |
| 153-break-5-runtime.log · runtime_check | 20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81 | 0 | 1d605e89a28f8ff471c6fb1a1241376c2d6c171a4392227f5fcf97294f8b9d46 |
| 154-break-5-wait.log · load_wait | 20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81 | 0 | 22ce5598b95ff41faa1745ae6936011d1b6cc65e6c0c8fb29866cacfc250dd9a |
| 155-break-5-tests.log · bun test packages/adapter-madv-surface/test/parser.test.ts | 20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81 | 1 | cf0b0ca60e61019b2b7551927694b4829651b701acc1ce58d61dd6751b9bec35 |
| 156-break-5-observed.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/check-break.py 5 logs/155-break-5-tests.log | 20:03  7 users, load averages: 1.86 1.63 1.81 | 0 | d7b2dfd31f506a313a4cdd0727616a1fd83f1c9bd5ea7054d503eb2a07a8d866 |
| 157-break-5-restore.log · restore_break 5 | 20:03  7 users, load averages: 1.86 1.63 1.81 | 0 | 697f9cec05d51d344bf3be1121f3d6876b3da874a2a6f21560d95eb0b13b4899 |
| 158-break-6-diff.log · start_break 6 | 20:03  7 users, load averages: 1.86 1.63 1.81 | 0 | eea99e0674e0e0b9082ee1ace5d107017b4d4d0de0a153902782c607263547f5 |
| 159-break-6-runtime.log · runtime_check | 20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81 | 0 | 1d605e89a28f8ff471c6fb1a1241376c2d6c171a4392227f5fcf97294f8b9d46 |
| 160-break-6-wait.log · load_wait | 20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81 | 0 | 22ce5598b95ff41faa1745ae6936011d1b6cc65e6c0c8fb29866cacfc250dd9a |
| 161-break-6-tests.log · bun test packages/adapter-madv-surface/test/parser.test.ts | 20:03  up 11:30, 7 users, load averages: 1.86 1.63 1.81 | 1 | ce916395de21825e415368597c1c95a5b8366996db8a649ae1719a3865e8af82 |
| 162-break-6-observed.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/check-break.py 6 logs/161-break-6-tests.log | 20:03  7 users, load averages: 1.71 1.60 1.80 | 0 | 15232e5f11d4c806ebeeb7390c428f67d42563f4f6b4a2fbd109c46dfb5bc8df |
| 163-break-6-restore.log · restore_break 6 | 20:03  7 users, load averages: 1.71 1.60 1.80 | 0 | b1bcff7d9b9f2c071bd5efa5344ab312d02f864e5839294b63af28a8c5bdc0ee |
| 164-break-7-diff.log · start_break 7 | 20:03  7 users, load averages: 1.71 1.60 1.80 | 0 | d759d490e2a69849f732d3285dd00d5d1c6b6a5d26fa56937c63e8cc7b9f408e |
| 165-break-7-runtime.log · runtime_check | 20:03  up 11:30, 7 users, load averages: 1.71 1.60 1.80 | 0 | 66c939f40129c1e86ff44498e903091b09c05b18f897881f8a8174d9b5241e26 |
| 166-break-7-wait.log · load_wait | 20:03  up 11:30, 7 users, load averages: 1.71 1.60 1.80 | 0 | 54271a000a40035f3ba8597d6deb182ed42fbf4b1d7eec40b520ad3b427c52c9 |
| 167-break-7-tests.log · bun test packages/adapter-madv-surface/test/parser.test.ts | 20:03  up 11:30, 7 users, load averages: 1.71 1.60 1.80 | 1 | 1c54e0ce6b24402e05352454b9e55a3473b3a08367ebb453ed3154436071d657 |
| 168-break-7-observed.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/check-break.py 7 logs/167-break-7-tests.log | 20:03  7 users, load averages: 1.71 1.60 1.80 | 0 | cf0dfebea61c0842a7871d8430af8fba6457b26d6a803dee4642b06dde96ea60 |
| 169-break-7-restore.log · restore_break 7 | 20:03  7 users, load averages: 1.71 1.60 1.80 | 0 | 1a172899a6196df44ed5f53603a471f02640b2fa471b99c2d19f1e9a0f277815 |
| 170-commit-parser.log · git commit -F /private/tmp/m0-admission-r1.Eo5Hwr47/commit-3.txt | 20:03  7 users, load averages: 1.66 1.59 1.79 | 0 | e1e3a7006f5dc34814c3ca385f7c89caf1cb31a474e9bb33cf8ab6e760700a8e |
| 171-parser-proof.log · verify_restore packages/adapter-madv-surface/src/index.ts | 20:03  7 users, load averages: 1.66 1.59 1.79 | 0 | 78272ad12db3b211dc818decfd8e5960dd2d94f78a2234ccbbca6c8aa45a1c5b |
| 172-parser-head.log · git -C tui log -1 --format=%H %P %s | 20:03  7 users, load averages: 1.66 1.59 1.79 | 0 | 2a586cde1e2b80e1aeb89e2dbd87228aa8df92793132669b1af6550846fc43b4 |
| 173-interval-tests.log · cp /dev/stdin tui/packages/supervisor/test/madv-intervals.test.ts | 20:03  7 users, load averages: 1.96 1.70 1.82 | 0 | 294b7ff0b7ab2070299124ea3c5aa791dd425da9a051ee7c225828facb76b1e0 |
| 174-allowlist-test.log · cp /dev/stdin tui/packages/supervisor/test/madv-allowlist.test.ts | 20:03  7 users, load averages: 1.96 1.70 1.82 | 0 | 4d7dd1c4dfdf74d25ec5ac5a1a77d0469ed6a09456f905a751a06c4ebd2480d5 |
| 175-fixture-integrity-test.log · cp /dev/stdin tui/packages/adapter-madv-surface/test/fixture-integrity.test.ts | 20:03  7 users, load averages: 1.96 1.70 1.82 | 0 | cc7840915e89b74d722b9501105cfa207396be82f38e2cb90bebe6ef1c80d295 |
| 176-r3-file-modes.log · chmod 644 tui/packages/supervisor/test/madv-intervals.test.ts tui/packages/supervisor/test/madv-allowlist.test.ts tui/packages/adapter-madv-surface/test/fixture-integrity.test.ts | 20:03  7 users, load averages: 1.96 1.70 1.82 | 0 | bd7032f0ac1e8fb38dc51e1fb80f11fa69ac44788ea6410f22a07f952fa7188e |
| 177-r3-runtime.log · runtime_check | 20:06  up 11:34, 8 users, load averages: 2.10 2.21 2.04 | 0 | 9174e6a2bfc15e679a1ccaf8b73fff0f35aa33e55c3affd18caaae8693fd4564 |
| 178-r3-wait.log · load_wait | 20:06  up 11:34, 8 users, load averages: 2.10 2.21 2.04 | 0 | 4448084f992665fb0dbbe6e8ba34110d0663b9d83fffee9c5d9c078df660872b |
| 179-r3-tests.log · bun test packages/supervisor/test/madv-intervals.test.ts packages/supervisor/test/madv-allowlist.test.ts packages/adapter-madv-surface/test/fixture-integrity.test.ts | 20:07  up 11:34, 8 users, load averages: 1.34 2.01 1.98 | 0 | 0a4da030510c9e98f923ed29e600421db265d30643f7fffa468dfb2ca560d1ef |
| 180-r3-message.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/commit-4.txt | 20:06  8 users, load averages: 1.77 2.14 2.02 | 0 | 9b135e3e6891063c15f8a33d95fbd30a1cd6e4076338f57d70aef69ce1ce308d |
| 181-check-message-4.log · check_message /private/tmp/m0-admission-r1.Eo5Hwr47/commit-4.txt | 20:06  8 users, load averages: 1.77 2.14 2.02 | 0 | c291200425782d0fdc15e0b5f13a621c69d9bb0b4d0047ba70320cc341273aca |
| 182-break-8-diff.log · start_break 8 | 20:07  8 users, load averages: 1.50 2.00 1.97 | 0 | 47351dce6fc8564dc803f75f4a4238abd108134d1a614c0076bc652f478654dd |
| 183-break-8-runtime.log · runtime_check | 20:09  up 11:37, 8 users, load averages: 1.41 1.91 1.94 | 0 | 7c841ee430321137bdf3b0aa777dda83434d60eec621d157e309aa8595244fc3 |
| 184-break-8-old-wait.log · load_wait | 20:09  up 11:37, 8 users, load averages: 1.30 1.88 1.93 | 0 | 4eaf8c50759979ff3a743e2b666824e53e62a0b2dc562e402cf8571a1e6946df |
| 185-break-8-old.log · bun test packages/supervisor/test/madv-probes.test.ts | 20:09  up 11:37, 8 users, load averages: 1.30 1.88 1.93 | 0 | f0c76c1e2d15761fb7b0359e1aa819bbf0704740e756a201a5be4d5b60fce51e |
| 186-break-8-related-wait.log · load_wait | 20:09  up 11:37, 8 users, load averages: 1.30 1.88 1.93 | 0 | 4eaf8c50759979ff3a743e2b666824e53e62a0b2dc562e402cf8571a1e6946df |
| 187-break-8-related.log · bun test packages/supervisor/test/attestation.test.ts | 20:09  up 11:37, 8 users, load averages: 1.30 1.88 1.93 | 0 | 6669f04b5b96b5b8232b751f3164b234192f2db57d5e1d081f8f0bb31948cc49 |
| 188-break-8-tests-wait.log · load_wait | 20:11  up 11:39, 8 users, load averages: 2.14 2.00 1.97 | 0 | ad4d8d8e30e4748fe101518a76253a9f86f9d4ba041e05bb0139bc2137d25d79 |
| 189-break-8-tests.log · bun test packages/supervisor/test/madv-intervals.test.ts | 20:13  up 11:41, 8 users, load averages: 1.64 1.91 1.94 | 1 | a2ca45f3a9e590275784372db8c3f3b4b984be6859dcb3d5a2b3b865f54dc088 |
| 190-break-8-observed.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/check-break.py 8 logs/189-break-8-tests.log | 20:13  8 users, load averages: 1.64 1.91 1.94 | 0 | c671808847fe8afb608b06fad0f07b350c623bb7f6cc8a6818ee49531b32e465 |
| 191-break-8-restore.log · restore_break 8 | 20:13  8 users, load averages: 1.64 1.91 1.94 | 0 | f06dddd9ca9b389aca0bc8683ea4413041ff124bd3679414318b6800677ff9ec |
| 192-break-9-diff.log · start_break 9 | 20:13  8 users, load averages: 1.64 1.91 1.94 | 0 | 9d666a8815f810044558a3b44f6bf1c6060c8540d9dbc87b106212131e61c1e9 |
| 193-break-9-runtime.log · runtime_check | 20:13  up 11:41, 8 users, load averages: 1.42 1.85 1.91 | 0 | 0980a76c72c4fdad856bbb462889e412c2b04d3da9bfd154dbc80e09d3bef454 |
| 194-break-9-old-wait.log · load_wait | 20:13  up 11:41, 8 users, load averages: 1.42 1.85 1.91 | 0 | 5f5d9edbfabc6ab53321acbfa3438fa3351c4b6a376875d6c45d0a5456b55920 |
| 195-break-9-old.log · bun test packages/supervisor/test/madv-probes.test.ts | 20:13  up 11:41, 8 users, load averages: 1.42 1.85 1.91 | 0 | f97b1a064d46c856f046f7631ef177ca011d8b937f3a5805b9a7bb398847fa0b |
| 196-break-9-related-wait.log · load_wait | 20:13  up 11:41, 8 users, load averages: 1.31 1.82 1.90 | 0 | ec006460cb279a96488c0bed8b894e163d402bbcd898fe00166ad5d0b79bf1b3 |
| 197-break-9-related.log · bun test packages/supervisor/test/attestation.test.ts | 20:13  up 11:41, 8 users, load averages: 1.31 1.82 1.90 | 0 | a88e60a6648e757d032532917b00b3ec694beb702e3bde1fb989a6ff979604f2 |
| 198-break-9-tests-wait.log · load_wait | 20:14  up 11:41, 8 users, load averages: 1.42 1.83 1.90 | 0 | af4d17c438d22081dfbaf3df8a05d7187f85937e637a736e6251e77a30b02ca8 |
| 199-break-9-tests.log · bun test packages/supervisor/test/madv-intervals.test.ts | 20:14  up 11:41, 8 users, load averages: 1.42 1.83 1.90 | 1 | 2295efb3b43b147032434bd1685c30da47fbd1dbb9593005bf0a806c38c40181 |
| 200-break-9-observed.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/check-break.py 9 logs/199-break-9-tests.log | 20:14  8 users, load averages: 1.42 1.83 1.90 | 0 | ca93058561d09f7e6b174540781b88bcf9661cd142adf9613eace7e08cf53515 |
| 201-break-9-restore.log · restore_break 9 | 20:14  8 users, load averages: 1.42 1.83 1.90 | 0 | 41552b53f210caefb677ce758f5e27aa2fe57a038c5eec4ea66d9a83a3d21450 |
| 202-break-10-diff.log · start_break 10 | 20:14  8 users, load averages: 1.42 1.83 1.90 | 0 | 104c854cd6130e6179bae6b6f00b9c432ef1845047674176a0b8f4d843c079b9 |
| 203-break-10-runtime.log · runtime_check | 20:14  up 11:41, 8 users, load averages: 1.30 1.79 1.89 | 0 | d05179b109195f64976d9be9f0fceb3d8e35fa1905f9ce344c25ec6647390eb1 |
| 204-break-10-old-wait.log · load_wait | 20:14  up 11:41, 8 users, load averages: 1.30 1.79 1.89 | 0 | 6089cb153333ba7fcf2302ebf2de6b8f26e455a7638a86081568d06ec8dce652 |
| 205-break-10-old.log · bun test packages/supervisor/test/madv-environment.test.ts | 20:14  up 11:41, 8 users, load averages: 1.30 1.79 1.89 | 0 | 748e9cb434427063a5929783189c2d1ee036cd27d64ffad7c2261c4d89409c8b |
| 206-break-10-related-wait.log · load_wait | 20:14  up 11:41, 8 users, load averages: 1.30 1.79 1.89 | 0 | 6089cb153333ba7fcf2302ebf2de6b8f26e455a7638a86081568d06ec8dce652 |
| 207-break-10-related.log · bun test packages/supervisor/test/environment.test.ts | 20:14  up 11:41, 8 users, load averages: 1.30 1.79 1.89 | 0 | 32601307dae0fae5a12a3dee820c155c8b86544716b8174ce490b3af59d48adb |
| 208-break-10-tests-wait.log · load_wait | 20:14  up 11:41, 8 users, load averages: 1.28 1.78 1.89 | 0 | cd1be2628503188099d7534eb251b3587d82fd42b0fb942bfa7379d00cc86196 |
| 209-break-10-tests.log · bun test packages/supervisor/test/madv-allowlist.test.ts | 20:14  up 11:41, 8 users, load averages: 1.28 1.78 1.89 | 1 | 322d5a22adf603162a9201c87ba8f658e20d63e9e3389dffc0cb539227630d0d |
| 210-break-10-observed.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/check-break.py 10 logs/209-break-10-tests.log | 20:14  8 users, load averages: 1.28 1.78 1.89 | 0 | 82c115805c4bbb2dfa95fe7a8d82dd16a6a16605996521f8b453c6ea0e346d21 |
| 211-break-10-restore.log · restore_break 10 | 20:14  8 users, load averages: 1.28 1.78 1.89 | 0 | 5e1b3fa1727cad99ba5caa07c472b32ec0428ec7eb60b6d20a4c88848169ebad |
| 212-inspect-record-host.log · sed -n 1,108p tui/packages/storage/src/storage-root.ts | 20:12  8 users, load averages: 1.99 1.98 1.96 | 0 | 98e3216a80309d7b9e098a37f0ff6aabdfd64ffd8fe3a66cae2ce5b8dc0e9291 |
| 213-release-sample-shape.log · sed -n 1,10p reference/madv-surface/docs/samples/reviewer-turn-zai.jsonl | 20:12  8 users, load averages: 1.99 1.98 1.96 | 0 | 605637801fd6222a0f1610f922ea16eae5723c40891dd8aa62476d1ed299073b |
| 214-release-error-shape.log · rg -n provider_error\|is_error: true\|num_turns:\|usage:\|systemEvent reference/madv-surface/src/agent.ts | 20:12  8 users, load averages: 1.99 1.98 1.96 | 0 | d8e68a9ac360a1cda7535a666d8de882e5b1c0d55985846224359b243a3ce7ba |
| 215-release-shapes.log · sed -n 152,175p;250,282p;325,362p reference/madv-surface/src/agent.ts | 20:12  8 users, load averages: 2.23 2.03 1.98 | 0 | d925bba993ae89f0ab4597bb02a5fa1dfc21324dca7df5133aefdf8099851408 |
| 216-release-auth-fields.log · rg -n loggedIn\|authMethod\|endpointHost\|verifyMethod\|verified\|provider: reference/madv-surface/src/authstatus.ts | 20:12  8 users, load averages: 2.23 2.03 1.98 | 0 | 03b1c263f9d24cd97df017ff4052349afc4ac2b639eb32032e95112545e44fc8 |
| 217-timer-restoration-proof.log · git -C tui status --short | 20:12  8 users, load averages: 2.23 2.03 1.98 | 0 | 5cc3f88bd7ff8a03470c68c2880595eee0468c844eb249e10103b37e7f7d5a7c |
| 218-prepare-full-checks.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/scope.py | 20:14  8 users, load averages: 1.30 1.79 1.89 | 0 | aa328254a3ca7aa3ce79ebbd397264c404a6e6ff431d88683f0e3d8aeda56220 |
| 219-stage-advisory-tests.log · git -C tui add packages/supervisor/test/madv-allowlist.test.ts packages/supervisor/test/madv-intervals.test.ts packages/adapter-madv-surface/test/fixture-integrity.test.ts | 20:14  8 users, load averages: 1.08 1.72 1.87 | 0 | 5d0d9f7b18c5b531e63e8065a1e5f02725cd9f59aa5836ea7f1ac82d02ee8457 |
| 220-check-advisory-files.log · git -C tui diff --cached --check | 20:14  8 users, load averages: 1.08 1.72 1.87 | 0 | c0d40e54d422d78a25d4b3bcf912d2eb0412773172827ba0b3642bb035463a5c |
| 221-check-advisory-paths.log · git -C tui diff --cached --name-only | 20:14  8 users, load averages: 1.08 1.72 1.87 | 0 | 0565f978cf1897f0d7e5166b681d84a0bcaaec960f1ad8ef4524e4004270805c |
| 222-interval-allowlist-proof.log · verify_restore packages/supervisor/src/attestation.ts packages/supervisor/src/environment.ts | 20:14  8 users, load averages: 1.08 1.72 1.87 | 0 | 32c05c4b510e016729725add961b98654d393d91ef0ad35d5767ad81e49130cd |
| 223-commit-advisory.log · git commit -F /private/tmp/m0-admission-r1.Eo5Hwr47/commit-4.txt | 20:14  8 users, load averages: 1.08 1.72 1.87 | 0 | 34b746ea9dac41b2902895e028602c4a19481e75ecb4de33f9cf78bbf0462d8d |
| 224-advisory-head.log · git -C tui log -1 --format=%H %P %s | 20:14  8 users, load averages: 1.08 1.72 1.87 | 0 | ec63fe8fdd940c043cf1370e7bd633c2859659cf9842d128118b6531a15cffb9 |
| 225-full-runtime.log · runtime_check | 20:15  up 11:42, 8 users, load averages: 1.16 1.66 1.83 | 0 | cbe4a08738ed8f0b29dff8d8a54da933890f411247fbeddbd966478c051c06c5 |
| 226-full-lock-before.log · shasum -a 256 tui/bun.lock | 20:15  8 users, load averages: 1.15 1.65 1.83 | 0 | 08eba044cd5e66c7164a64b03fdf0ab2dd3087ba61f14c11055dea0beb9b9001 |
| 227-full-install.log · bun install --frozen-lockfile | 20:15  up 11:42, 8 users, load averages: 1.13 1.64 1.82 | 0 | a4b431e495b4de010786f7d78ff2ad57aa3b442151eeae057e116145533ce5da |
| 228-full-lock-after.log · shasum -a 256 tui/bun.lock | 20:15  8 users, load averages: 1.28 1.66 1.83 | 0 | 0f248113de9ad3944d7d43ea3e2416b7b95dd05d587f87513f7bb021820c084c |
| 229-full-install-tree.log · git -C tui diff --summary | 20:15  8 users, load averages: 1.28 1.66 1.83 | 0 | 355e66abefad79f88dddf64b6a7d3ee54e3e0ccb427f1edead5fc65fc74112a6 |
| 230-full-install-status.log · git -C tui status --porcelain | 20:15  8 users, load averages: 1.28 1.66 1.83 | 0 | e9e420ffa95a44c19e38e686d66c5376db8e9d246d6431f6806e3df6aa78e6ad |
| 231-full-install-restore.log · git -C tui checkout -- packages/founder-act/src/main.ts | 20:15  8 users, load averages: 1.17 1.62 1.81 | 0 | 0a23501396f4a40610175ef53fa2c987b486742da3a8f2df39100a324da9e76b |
| 232-full-restored-tree.log · git -C tui status --porcelain | 20:15  8 users, load averages: 1.17 1.62 1.81 | 0 | 6d74df02108b1de519cc25f0136f4046dda3ebee7e703a30da779b76f5f87962 |
| 233-full-typecheck.log · bunx tsc --noEmit | 20:15  up 11:43, 8 users, load averages: 1.17 1.62 1.81 | 2 | 96a941b7f78a28529fc921051ad5d7bdeb2d01de365d089863d983569423a876 |
| 237-fix-manifest-row.log · python3 - | 20:15  8 users, load averages: 1.17 1.59 1.80 | 0 | 8b52ee94a6bc67e3671d1db7047712751a42c84b1b9951cc5a43447a9e1d817e |
| 238-fix-message.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/commit-fix.txt | 20:15  8 users, load averages: 1.17 1.59 1.80 | 0 | 10a937806e73e91beaa2d52c398c27bed06e3cb2ff7f0026b6e5e60d7ea77b8d |
| 239-check-message-fix.log · check_message /private/tmp/m0-admission-r1.Eo5Hwr47/commit-fix.txt | 20:15  8 users, load averages: 1.17 1.59 1.80 | 0 | 3e8a4359231f044ecc1bbe66512a316b0a1fb48c06f5d68333aaca3e06fba3a9 |
| 240-stage-row-fix.log · git -C tui add packages/adapter-madv-surface/test/fixture-integrity.test.ts | 20:15  8 users, load averages: 1.17 1.59 1.80 | 0 | 02084ab6c3725ceed6b728dd8ba22a9c88a85f251ece5bac7b8286219780355e |
| 241-check-fix.log · git -C tui diff --cached --check | 20:15  8 users, load averages: 1.17 1.59 1.80 | 0 | 9c391afd0d01d60f5a4cb887877236ac5a3e43164421d7769508717d40261edb |
| 242-commit-row-fix.log · git commit -F /private/tmp/m0-admission-r1.Eo5Hwr47/commit-fix.txt | 20:16  8 users, load averages: 1.29 1.60 1.80 | 0 | 1c347fc142341fdb03701d7661b00d184a28dd6e7c74df98c9555b3d5cedc632 |
| 243-fix-head.log · git -C tui log -1 --format=%H %P %s | 20:16  8 users, load averages: 1.29 1.60 1.80 | 0 | f5d5193400ec8afa5da0e5b23b7d06d19cd021f1b8ea68b9180b6530dcd161ef |
| 244-repeat-runtime.log · runtime_check | 20:20  up 11:48, 8 users, load averages: 1.88 1.77 1.82 | 0 | 7477bc0db407a1e1867a138ec101e200d5b384622ce47538ba06b57224ae9b86 |
| 245-repeat-lock-before.log · shasum -a 256 tui/bun.lock | 20:20  8 users, load averages: 1.88 1.77 1.82 | 0 | d24ddb7e34d23d4e979011863eb7a44c093982941acb6b9f0c84fe8c0cfd753f |
| 246-repeat-install.log · bun install --frozen-lockfile | 20:20  up 11:48, 8 users, load averages: 1.88 1.77 1.82 | 0 | a2eab7ff569ea80ba0453bac35cad9c586af3e1822e70d0bc486ce446b631e29 |
| 247-repeat-lock-after.log · shasum -a 256 tui/bun.lock | 20:20  8 users, load averages: 2.19 1.85 1.85 | 0 | 57aef6f09709014bd863b752cec3d5fa97a26ed95e8768adb9b23ebf6f798d5e |
| 248-repeat-install-tree.log · git -C tui diff --summary | 20:20  8 users, load averages: 2.19 1.85 1.85 | 0 | 01c712384d919bdd45fcd53f0622fe2c3f76860c3613008095c8051b5ee4c5ed |
| 249-repeat-install-status.log · git -C tui status --porcelain | 20:20  8 users, load averages: 2.19 1.85 1.85 | 0 | 5345c556358aee742afad91c92b8df7a4bb22151e8d507a1eab6a4251a715c98 |
| 250-repeat-install-restore.log · git -C tui checkout -- packages/founder-act/src/main.ts | 20:20  8 users, load averages: 2.19 1.85 1.85 | 0 | c420e83374a1a75030ceb56e51903ce37de5ad28d7a5c6c3870cdfb3acfd3407 |
| 251-repeat-restored-tree.log · git -C tui status --porcelain | 20:20  8 users, load averages: 2.19 1.85 1.85 | 0 | 6f2dec1021f88204da9ec972a3f3b9af478f43febbe24a9708591d238faea034 |
| 252-repeat-typecheck.log · bunx tsc --noEmit | 20:28  up 11:55, 8 users, load averages: 2.57 2.05 1.91 | 0 | d008b82c8f1abf8fc5822e964cd6605710466f836fa3cda15c3af2e0a6f0bd87 |
| 253-repeat-suite-runtime.log · runtime_check | 20:36  up 12:04, 8 users, load averages: 4.32 3.79 2.96 | 1 | 235cb6ddea4d8b0dc42cc82febe211aafc94cdc0d0e4af89f04ecf3135e8aba4 |
| 256-halt-state.log · git -C tui status -sb | 20:37  8 users, load averages: 3.24 3.58 2.91 | 0 | 3741f52bd58d8e9bc8233fbdddd5f12dc6251146ce319d1f202f16ec3b446e34 |
| 257-halt-commits.log · git -C tui log --reverse --format=%H %P %s 0678bd4412d5aaed963ae20f101959bd92f79811..HEAD | 20:37  8 users, load averages: 3.24 3.58 2.91 | 0 | 55e6b342ec65cb0c18728392446e2384d576563d69c477688ac849fa5cf5daa2 |
| 258-halt-stat.log · git -C tui diff --stat 0678bd4412d5aaed963ae20f101959bd92f79811 HEAD | 20:37  8 users, load averages: 3.24 3.58 2.91 | 0 | e6c9121fcd47a268d3a1082029b31a66e0811bd66134a95abd63c35398eb9442 |
| 259-halt-source-diff.log · git -C tui diff --no-color --full-index 0678bd4412d5aaed963ae20f101959bd92f79811 HEAD -- . :(exclude)docs/verification/phase-3b-m0-admission-build-log.md | 20:37  8 users, load averages: 3.24 3.58 2.91 | 0 | 9f9dcc0854558162d2a35faeef97c8967defc53a11880ddb60969f37b07cb021 |
| 260-halt-build-log.log · shasum -a 256 tui/docs/verification/phase-3b-m0-admission-build-log.md | 20:37  8 users, load averages: 3.24 3.58 2.91 | 0 | a3144dad1863d5d8f95adbc8cc4f6ec11832432d4e3802d592496cdb2d4e7539 |
| 261-halt-record-dir.log · ls -A record | 20:37  8 users, load averages: 3.24 3.58 2.91 | 0 | 26135908b3622f83b0b5bfa6411badb42f1e824b530c6684f8f0165f490e30f3 |
| 262-prepare-halt-report.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/halt.py | 20:38  8 users, load averages: 2.23 3.15 2.80 | 0 | 5dfaa661166103225053867a0eb3fa55e4e2c6ef9c87af83605c31f8ccfbb70b |
| 263-write-halt-report.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/halt.py | 20:38  8 users, load averages: 2.23 3.15 2.80 | 0 | 7bf80b501351b149a5f6377b1a0fcbb0e5fe4f46918d7afcbd3db2a28f6d20a6 |
| 264-halt-report-format.log · python3 - | 20:38  8 users, load averages: 2.32 3.13 2.80 | 0 | 1cb0b486b3d148f4fff8ee90f6233b7d581b04da0c11fb9646994b4c2de9b2ce |
| 265-halt-report-digests.log · shasum -a 256 pr/m0-admission-phase1-report.md logs/253-repeat-suite-runtime.log logs/057-baseline-suite.log logs/071-base-list.log logs/259-halt-source-diff.log logs/263-write-halt-report.log logs/264-halt-report-format.log | 20:38  8 users, load averages: 2.32 3.13 2.80 | 0 | d82d5d5f5b07d870474aaf98a48a3936f7319ea81a8410f0fb678fe796014fcf |
| 266-resume-manifest.log · (cd prompt && shasum -a 256 -c SHA256.txt) | 22:07  8 users, load averages: 3.42 2.27 1.95 | 0 | 10b1fc183549a602ae89eba21741a92a89c7f6fb00dab2c36b2c91a9af4a9ac8 |
| 267-resume-prompt-files.log · ls prompt | 22:08  8 users, load averages: 3.23 2.25 1.95 | 0 | be782ec2dcbeb3292cc02d70e95d0c694335d44f4f7f95f5b9326e818d283ac9 |
| 268-resume-hidden-check.log · ls -A prompt | 22:08  8 users, load averages: 3.23 2.25 1.95 | 0 | d3dd691a710677a02025bddaeb761139321999aa1fcd011bca7044fa9d9f31f2 |
| 269-resume-input-pins.log · cat prompt/SHA256.txt | 22:08  8 users, load averages: 3.23 2.25 1.95 | 0 | bdc8bfc6a980561f97c2fbfe2da4418381b905d5ae9dc60c58c67de2c98b489b |
| 270-resume-cli.log · /Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version | 22:08  8 users, load averages: 3.29 2.27 1.96 | 0 | 7a120e5c25a2df263ab31eae480a4c74d74057c656bdf629fc11acca712a1144 |
| 271-resume-head.log · git -C tui rev-parse HEAD | 22:08  8 users, load averages: 3.29 2.27 1.96 | 0 | f033bee7a569982b256403115c3ea1556a4c739ed4de3de9369b9d6460c02c80 |
| 272-resume-branch.log · git -C tui branch --show-current | 22:08  8 users, load averages: 3.29 2.27 1.96 | 0 | 9f614eecebfba81852d5ad64f0bff880849b48ea01974590f5392ce61f8538c7 |
| 273-resume-tree.log · git -C tui status --porcelain --untracked-files=all | 22:08  8 users, load averages: 3.29 2.27 1.96 | 0 | 9003cb3e1e21d302d7e734c078b8b75742025efbe1b1ffd44a8c0a64c341066c |
| 274-resume-stash.log · git -C tui stash list | 22:08  8 users, load averages: 3.29 2.27 1.96 | 0 | f7f3f37b81ea2e60be0cd3219db3f03fe03acecba6ec3282e5f3abdd21e9585d |
| 275-resume-pr.log · ls -A pr | 22:08  8 users, load averages: 3.29 2.27 1.96 | 0 | 6b03243989ace6d77183fc0b30fd48663a9c9a397b53288525c31eb7baa75891 |
| 276-resume-halt-report.log · shasum -a 256 pr/m0-admission-phase1-halt-1-report.md | 22:08  8 users, load averages: 3.29 2.27 1.96 | 0 | 84f6c27c22c3d3a2b098f3184c230f498ef5cb935982dcbb63ced00100b1c3b0 |
| 277-resume-halt-log.log · shasum -a 256 logs/253-repeat-suite-runtime.log | 22:08  8 users, load averages: 3.29 2.27 1.96 | 0 | fe9ff8810903263ff9829791db2fdb5897289978f540d079c3277c9118555ae3 |
| 278-resume-record-dir.log · ls -A record | 22:08  8 users, load averages: 3.29 2.27 1.96 | 0 | 0c552a24ca0202ae71b005a4a8d75a65fa7a91c1c5529a9ab17c966a70ac26c0 |
| 279-resume-runtime.log · runtime_check | 22:08  up 13:35, 8 users, load averages: 2.93 2.23 1.95 | 0 | a4422a0f0b9a491bdddf69fb386c398154457a3b3a924469851418520dccdc8c |
| 280-resume-break-helper.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/resume-breaks.py | 22:08  8 users, load averages: 2.85 2.25 1.96 | 0 | d6d158de34eaf5454d266fd395f3b5ce48cc79c92f92a2a3a13f7158f3496c7f |
| 281-break-11-diff.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/resume-breaks.py 11 change | 22:08  8 users, load averages: 2.85 2.25 1.96 | 0 | 2cd3f65856229ba894443e83823d62589421a3edbe8722280b2b95b655880be4 |
| 282-break-11-runtime.log · runtime_check | 22:09  up 13:36, 8 users, load averages: 2.15 2.14 1.93 | 0 | d472a3f5c936470b481aae92f6f5ffa6f1cea010de631d9d56929651f8e74bcd |
| 283-break-11-old-wait.log · load_wait | 22:09  up 13:36, 8 users, load averages: 1.98 2.10 1.92 | 0 | 45fe8757d9a29efdebeee5a028772cf3a5cbfadf7070f0ff7e55332bfda1a288 |
| 284-break-11-old.log · bun test packages/supervisor/test/madv-environment.test.ts | 22:09  up 13:36, 8 users, load averages: 1.98 2.10 1.92 | 1 | 060ef46ef8598e56c77054b9fb7ab0201c292d024728b8432b1caf630af6cf49 |
| 285-break-11-related-wait.log · load_wait | 22:09  up 13:36, 8 users, load averages: 1.98 2.10 1.92 | 0 | 45fe8757d9a29efdebeee5a028772cf3a5cbfadf7070f0ff7e55332bfda1a288 |
| 286-break-11-related.log · bun test packages/supervisor/test/environment.test.ts | 22:09  up 13:36, 8 users, load averages: 1.98 2.10 1.92 | 1 | 620af0468d05576d56b8e400b9953d3af50a9d690d53333309f396d84d4abe26 |
| 287-break-11-tests-wait.log · load_wait | 22:09  up 13:36, 8 users, load averages: 1.98 2.10 1.92 | 0 | 45fe8757d9a29efdebeee5a028772cf3a5cbfadf7070f0ff7e55332bfda1a288 |
| 288-break-11-tests.log · bun test packages/supervisor/test/madv-allowlist.test.ts | 22:09  up 13:36, 8 users, load averages: 1.98 2.10 1.92 | 1 | ef754c07f916cb00fc084ab952dcc8c0872b023d6636dcca2e115359365a04c4 |
| 289-break-11-observed.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/resume-breaks.py 11 verify logs/288-break-11-tests.log | 22:09  8 users, load averages: 1.98 2.10 1.92 | 0 | a7c50a900ca575174d1fafd1acd1d37121f09910e6f70962fbda409391fc62a9 |
| 290-break-11-restore.log · git -C tui checkout -- packages/supervisor/src/environment.ts | 22:09  8 users, load averages: 1.98 2.10 1.92 | 0 | bc4e2ec145308569a99641c5dc61af003f91c99b1ec8d3ca2cda8b4006d59948 |
| 291-break-11-proof.log · verify_restore packages/supervisor/src/environment.ts | 22:09  8 users, load averages: 1.98 2.10 1.92 | 0 | 5c5e39649d60a88a23b341b421c67871932c4fa851b2c68be31adc063f799d8d |
| 292-break-12-diff.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/resume-breaks.py 12 change | 22:09  8 users, load averages: 1.98 2.10 1.92 | 0 | 3873db64baf06fa8924eaf10375c423cfa53a2078ead905f0b9b028b16a2e377 |
| 293-break-12-runtime.log · runtime_check | 22:09  up 13:36, 8 users, load averages: 1.90 2.09 1.91 | 0 | f6f54c357698ffcf7cda5e24733d1771a6e6a5d6601a95b152c518cb669b5c47 |
| 294-break-12-old-wait.log · load_wait | 22:09  up 13:36, 8 users, load averages: 1.90 2.09 1.91 | 0 | 6fd684e9ccf901402c1569c03fc4c8717bfabe3f749b0695c5c5211ed36c3576 |
| 295-break-12-old.log · bun test packages/adapter-madv-surface/test/recorded.test.ts | 22:09  up 13:36, 8 users, load averages: 1.90 2.09 1.91 | 1 | 48b83d71082618eb91d42afb21bce95d1c7de907e4ac6897a602d21270b00a51 |
| 296-break-12-tests-wait.log · load_wait | 22:09  up 13:36, 8 users, load averages: 1.90 2.09 1.91 | 0 | 6fd684e9ccf901402c1569c03fc4c8717bfabe3f749b0695c5c5211ed36c3576 |
| 297-break-12-tests.log · bun test packages/adapter-madv-surface/test/fixture-integrity.test.ts | 22:09  up 13:36, 8 users, load averages: 1.90 2.09 1.91 | 1 | fc8fc8157f11b69e5e8d31033957866680de89a2014a98f7446e17e01e296fd0 |
| 298-break-12-observed.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/resume-breaks.py 12 verify logs/297-break-12-tests.log | 22:09  8 users, load averages: 1.90 2.09 1.91 | 0 | 7bfc458568135d3e1da9eba65bad09d5fba2d384bb1ca8966546b396b14efda9 |
| 299-break-12-restore.log · git -C tui checkout -- packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.status | 22:09  8 users, load averages: 1.90 2.09 1.91 | 0 | 7d8d0a3de90554e22a0178bc1c1bce51ff9e5aaab940f77637574082cfa0010d |
| 300-break-12-proof.log · verify_restore packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.status | 22:09  8 users, load averages: 1.90 2.09 1.91 | 0 | 971be0ca201192375d9d57eabc5027d3fc548568a3d14f423f4607ffe2299684 |
| 301-remove-node-modules.log · python3 - | 22:09  8 users, load averages: 1.62 2.02 1.89 | 0 | b05720f7fa0564f627551f37d81b335a3ca97e7f2f62784082977437a4bb3dd3 |
| 302-after-removal-tree.log · git -C tui status --porcelain --untracked-files=all | 22:09  8 users, load averages: 1.62 2.02 1.89 | 0 | 32da89ff3cf0e91285e4f357c8b0b204803762fd80808e606c5314e943716582 |
| 303-resumed-full-runtime.log · runtime_check | 22:12  up 13:40, 8 users, load averages: 7.40 3.56 2.48 | 0 | 782189ca1e13644c2a8a456042bec98e23ee8bb91715d0ee10e090b9ccfa9459 |
| 304-resumed-full-lock-before.log · shasum -a 256 tui/bun.lock | 22:12  8 users, load averages: 7.05 3.55 2.49 | 0 | f8d8b269b46609dc6bbf6e8d37643ff949916c94d0b5d63dcadc706f41d5baef |
| 305-resumed-full-install.log · bun install --frozen-lockfile | 22:12  up 13:40, 8 users, load averages: 7.05 3.55 2.49 | 0 | 01c96c262114bdc318cc20c999cac4c8cd47a89f4b5335add371bfdba0065271 |
| 306-resumed-full-lock-after.log · shasum -a 256 tui/bun.lock | 22:12  8 users, load averages: 7.05 3.55 2.49 | 0 | f8d8b269b46609dc6bbf6e8d37643ff949916c94d0b5d63dcadc706f41d5baef |
| 307-resumed-full-install-tree.log · git -C tui diff --summary | 22:12  8 users, load averages: 7.05 3.55 2.49 | 0 | 17522c2c8c9ed02303cca966ab8d37a96d762d52e395b772f5b0c2188c602803 |
| 308-resumed-full-install-restore.log · git -C tui checkout -- packages/founder-act/src/main.ts | 22:12  8 users, load averages: 7.05 3.55 2.49 | 0 | c10cfe32aa880e98d7df26dff0367a92ba5f477af4a2ee7c2b156f174c076221 |
| 309-resumed-full-restored-tree.log · git -C tui status --porcelain --untracked-files=all | 22:12  8 users, load averages: 7.05 3.55 2.49 | 0 | a726affa1ddd5a5df4fb5239fc40f8d51ce032d44e6a67f97716f61130cf2091 |
| 310-resumed-full-typecheck.log · bunx tsc --noEmit | 22:12  up 13:40, 8 users, load averages: 7.05 3.55 2.49 | 0 | 7c754034fb51a0bf7fe229ce52c46f7ea08a6e03f04aee99592af6c186ad24ea |
| 311-resumed-suite-runtime.log · runtime_check | 22:12  up 13:40, 8 users, load averages: 6.64 3.53 2.48 | 0 | 4628b3e8cb4842a119bcc753e2b2859e129171d9eb29b51ec651b486dc3b25ed |
| 312-resumed-suite-wait.log · load_wait | 22:12  up 13:40, 8 users, load averages: 6.59 3.57 2.51 | 0 | 5c224399104d323e1eb88919c5ffbf1faf1311947be927e9f916a2a5ebda384f |
| 313-resumed-suite.log · bun test | 22:20  up 13:48, 2 users, load averages: 1.69 2.73 2.57 | 1 | c1fd97a268edc9789b6950d0ed8c0b60e25393beebd4d213c50fcf1e9f4c3840 |
| 314-capture-shape.log · sed -n 1,7p tui/packages/adapter-madv-surface/test/fixtures/recorded/macbook/04.stdout | 22:12  8 users, load averages: 6.64 3.53 2.48 | 0 | cdc5b2a4e895d64855d62ef5c823e679024a425764a0afe13b82dbc8ae574a23 |
| 315-capture-auth.log · cat tui/packages/adapter-madv-surface/test/fixtures/recorded/macbook/03.stdout | 22:12  8 users, load averages: 6.64 3.53 2.48 | 0 | 53abbed38bd62e665faa55e8d7d559b0e8e21a3aa6b924426b6e5837a4127d2d |
| 316-evidence-util.log · cat /private/tmp/m0-admission-r1.Eo5Hwr47/report_format.py /private/tmp/m0-admission-r1.Eo5Hwr47/tests.py | 22:12  8 users, load averages: 6.64 3.53 2.48 | 0 | 3a5c174203e2fd2e35d9594a2236811449a81d4a2f8bba2782a5d5084b985ea7 |
| 317-prepare-phase1-evidence.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/completion_data.py | 22:13  8 users, load averages: 5.32 3.69 2.62 | 0 | 48af4505a61bb59c571c25bc208c7d25a300c9eeee70f90623c1ed4747f457e9 |
| 365-prepare-build-log-completion.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/append_phase1.py | 22:14  7 users, load averages: 3.52 3.49 2.61 | 0 | 8f05ae8de90d77eff2b415d337db594fa2d66ffc5076436ddd57233d879411ce |
| 366-evidence-log-names.log · python3 - /private/tmp/m0-admission-r1.Eo5Hwr47/append_phase1.py | 22:15  7 users, load averages: 2.77 3.31 2.58 | 0 | 7819e727c275bd839bbc5feda6467610634ddec576c4d4e4d6486f1ef62a2ef8 |
| 367-prepare-final-report.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/final_report.py | 22:16  7 users, load averages: 2.45 3.12 2.55 | 0 | e9367ef835c567af1886a4cf38febc7b4e909d6ffd60f8d1f46d6e72ed95ce4f |
| 368-closing-message.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/commit-5.txt | 22:16  7 users, load averages: 2.62 3.07 2.56 | 0 | 81b87f1466158a68ac27e9a0ff7a9ad664d466f35d845952f9d4c53ee2c83557 |
| 369-resumed-suite-failures.log · rg -n -B 18 -A 2 ^\(fail\) (no file under apps/ or packages/\|no production file) logs/313-resumed-suite.log | 22:23  2 users, load averages: 1.89 2.42 2.47 | 0 | 85e86ec00bce188f4f41dd5fb0ee996d41d9a6f3e411d69a1c48e1e3265195b3 |
| 370-harness-exception-source.log · git -C tui grep -n -E adapter-registry\|exception-drift\|digest\|sha256\|productionClean\|source\[Symbol.iterator\] HEAD -- test/phase3a/harness-separation.test.ts test/phase3a/*exception* | 22:23  2 users, load averages: 2.28 2.48 2.50 | 0 | 30195ad09e48c339e021bd0fc50767ed093163b3f6a356d566a08e57ca9bb8e5 |
| 371-registry-changes.log · git -C tui diff --full-index 0678bd4412d5aaed963ae20f101959bd92f79811 HEAD -- packages/protocol/src/adapter-registry.ts | 22:23  2 users, load averages: 2.28 2.48 2.50 | 0 | b1e45d9c993980c2a807bc88150698b797fe2a92a9f27202fb82fe6cbccb004b |
| 372-bound-files.log · git -C tui grep -n -E exception-drift\|source\[Symbol.iterator\]\(\) HEAD -- test packages :(exclude)*.md | 22:23  2 users, load averages: 2.28 2.48 2.50 | 0 | 5f47414003bb69cfb4be0c5994ab03a9a1fe2a529687eea422376d50c01234a7 |
| 373-base-registry-digest.log · git -C tui show 0678bd4412d5aaed963ae20f101959bd92f79811:packages/protocol/src/adapter-registry.ts \| shasum -a 256 | 22:24  2 users, load averages: 2.35 2.48 2.50 | 0 | dc9c30aaaf50e1261ab42384c3304053128786ce01401f1aaa7ffeeef889ea25 |
| 374-head-registry-digest.log · shasum -a 256 tui/packages/protocol/src/adapter-registry.ts | 22:24  2 users, load averages: 2.35 2.48 2.50 | 0 | d643e90cac8a65986c1daf296dedb686baab88685a9607558b4264ff167607bf |
| 375-second-halt-tree.log · git -C tui status -sb --untracked-files=all | 22:24  2 users, load averages: 2.35 2.48 2.50 | 0 | 82d281cb84493392ce4ea5d6ae74819d0374d7921db4ba2e088e04cc7f8abe6b |
| 376-second-halt-head.log · git -C tui rev-parse HEAD | 22:24  2 users, load averages: 2.35 2.48 2.50 | 0 | b5a08f658015ec435587102d4c0c873f0e3b1fc48068356463e0c7de23d268bc |
| 377-second-halt-record.log · ls -A record | 22:24  2 users, load averages: 2.35 2.48 2.50 | 0 | eedff898816739c10f171666fe0f518db568827ba220fcc3eee81037c4860b31 |
| 378-pin-rulings.log · git -C tui grep -n -E harness-separation\.test\.ts\|whole-file (SHA\|digest) HEAD -- docs/decisions/DEC-20261115-02-phase-3b-m0.md docs/decisions/DEC-20261115-02-addendum-*.md docs/decisions/DEC-20261121-02-madv-surface-admission.md | 22:24  2 users, load averages: 2.15 2.43 2.48 | 0 | 5b8b439181853aa2155b10e4278660d9eb7b78a07bf75bfbce1a5dcdbec01f8f |
| 379-second-halt-comparison.log · python3 - | 22:24  2 users, load averages: 2.15 2.43 2.48 | 0 | 7a3ade3995c02a50963e1396371ed1c0b78976f6151e49f91c92c5333e0fe18b |
| 380-prior-pin-authorization.log · sed -n 30,39p tui/docs/decisions/DEC-20261115-02-addendum-1-m0-paths-and-tests.md | 22:24  2 users, load averages: 2.21 2.44 2.48 | 0 | bdcec8a697e62d52e43ef94d618423eb2ff7577d93e672f896594a896ba63c9a |
| 381-second-halt-failure-block.log · sed -n 130,147p;285,314p;459,487p;638,658p;7276,7285p logs/313-resumed-suite.log | 22:24  2 users, load averages: 2.21 2.44 2.48 | 0 | b349dcd10899c718ac0794be69abdc3c532ec00095b0cff3d2110c6d8f441a10 |
| 382-write-second-halt-report.log · python3 - /private/tmp/m0-admission-r1.Eo5Hwr47 | 22:25  2 users, load averages: 1.61 2.22 2.39 | 0 | c9bc4c83286bb5cd43a71d9706c636248f5d646774228f4fdfec7b563fb2a2ac |
| 383-check-second-report.log · python3 - | 22:26  2 users, load averages: 1.84 2.24 2.40 | 0 | 06e5966024a0c4bff59641fd908f29e39eb044d7b42d3e1555b03d21debf339f |
| 384-second-halt-hashes.log · shasum -a 256 pr/m0-admission-phase1-report.md pr/m0-admission-phase1-halt-1-report.md logs/313-resumed-suite.log logs/379-second-halt-comparison.log logs/382-write-second-halt-report.log logs/383-check-second-report.log | 22:26  2 users, load averages: 1.84 2.24 2.40 | 0 | b33ea41f0ac795fb0f6ffe5703cff5bd106b3b57aefc9cf905584894184c2c6b |
| 385-second-resume-manifest.log · shasum -a 256 -c SHA256.txt | 23:04  2 users, load averages: 1.43 2.47 2.91 | 0 | 94889f7989ff6288f765b1dabd6436655adb21460c59cc0477e7cc522f95629e |
| 386-second-resume-files.log · ls prompt | 23:04  2 users, load averages: 1.43 2.47 2.91 | 0 | 804c5ff78cccec477a72a7301a0126f980f31ae7ae9a5f5c97383b2ba77d28ad |
| 387-second-resume-all-files.log · ls -A prompt | 23:04  2 users, load averages: 1.43 2.47 2.91 | 0 | 5b4a51ab0d952e66700576019d0de7b78de17195b2467e4dad5014ad074ca18b |
| 388-second-resume-hashes.log · cat prompt/SHA256.txt | 23:04  2 users, load averages: 1.43 2.47 2.91 | 0 | 6650fa4b683e53219d0fa87da77ba18035a8cdcb839c9de91539d156c6e5e5ae |
| 389-digest-addendum.log · cat prompt/DEC-20261121-02-addendum-2-registry-digest.md | 23:04  2 users, load averages: 1.43 2.47 2.91 | 0 | fad97a7367fea18e758ae1c66f9b543f91a7685e0a19b15f7b1686b692868a50 |
| 390-second-resume-governed-version.log · /Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version | 23:04  2 users, load averages: 1.29 2.40 2.88 | 0 | d69e98fd159d1a359effe1bc49f5042e7ade175ca18e0541b810844cb1ddbc02 |
| 391-second-resume-head.log · git -C tui rev-parse HEAD | 23:04  2 users, load averages: 1.29 2.40 2.88 | 0 | 9a550daa5f7068bb797cfc04cbfdf1e882256d942cb579c52520ba622b8f0431 |
| 392-second-resume-branch.log · git -C tui branch --show-current | 23:04  2 users, load averages: 1.29 2.40 2.88 | 0 | 1875a337f014d4f8dd34bf2a943585962f55ff41ffd16f61c7362a390a3557c0 |
| 393-second-resume-status.log · git -C tui status --porcelain --untracked-files=all | 23:04  2 users, load averages: 1.29 2.40 2.88 | 0 | 9c1e5ba33c4732a9a5cf79f894e6a19851ab1f86a1e28675f9cbf1a5e88b3b74 |
| 394-second-resume-stash.log · git -C tui stash list | 23:04  2 users, load averages: 1.29 2.40 2.88 | 0 | ba1c429dc282f05b8c068fda2fdd0632a29ed91364ae650b62f760e3d4340b62 |
| 395-second-resume-pr.log · ls -A pr | 23:04  2 users, load averages: 1.29 2.40 2.88 | 0 | b95690a313dfbe808355012d50ff832e68f410c97a6dba9c1589082d7890a25d |
| 396-second-resume-halt-reports.log · shasum -a 256 pr/m0-admission-phase1-halt-1-report.md pr/m0-admission-phase1-halt-2-report.md | 23:04  2 users, load averages: 1.29 2.40 2.88 | 0 | df5c4baee437debff003be6a1ded65d04f5bd46699d9911b3b879889949815ff |
| 397-second-resume-record.log · ls -A record | 23:04  2 users, load averages: 1.29 2.40 2.88 | 0 | 8eeea35617130760ebfb28172b49a5e3df8da437fb99fc74499662a03d6d767c |
| 398-second-resume-runtime.log · runtime_check | 23:05  up 14:33, 2 users, load averages: 1.83 2.36 2.83 | 0 | 4eb1d4e12f40edcbbf07b538dab4efb4cac6cb03e0e5dfb0ab03e405e10afddc |
| 399-update-registry-pin.log · python3 - | 23:05  2 users, load averages: 2.34 2.44 2.85 | 0 | eb759a4cef5bc384395e9f658005ae5d0d112753c137018b12d5928fc29c8e6a |
| 400-authorized-pin-diff.log · git -C tui diff --full-index -- test/phase3a/harness-separation.test.ts | 23:05  2 users, load averages: 2.34 2.44 2.85 | 0 | ecf22140aa59f4c3053ba6422f32cf5f059e9fca82c10b1482092a653c599cd9 |
| 401-pin-message.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/commit-pin.txt | 23:05  2 users, load averages: 2.34 2.44 2.85 | 0 | 104fa23e0b8ecb456227b49b90d7ba89b034537733f7de82ab7430cf395b65a1 |
| 402-check-message-pin.log · check_message /private/tmp/m0-admission-r1.Eo5Hwr47/commit-pin.txt | 23:05  2 users, load averages: 2.34 2.44 2.85 | 0 | c02668ab02c6a2c9deeb4424544d882f4248972a9b5e7498fb99b3116a3a65c2 |
| 403-stage-registry-pin.log · git -C tui add test/phase3a/harness-separation.test.ts | 23:05  2 users, load averages: 2.34 2.44 2.85 | 0 | 6dc7a20e755beab9839b9bec90edee39939ebdff4cc4ca12a739a4e7987da2dc |
| 404-check-registry-pin.log · git -C tui diff --cached --check | 23:05  2 users, load averages: 2.34 2.44 2.85 | 0 | f7dd77fd1770e3c807664167cb56923addda2d7dadafbd771912bcba797db09d |
| 405-commit-digest-pin.log · git commit -F /private/tmp/m0-admission-r1.Eo5Hwr47/commit-pin.txt | 23:06  2 users, load averages: 2.21 2.41 2.84 | 0 | d4efb17bc132b5fd27cba523059a5057db1e47d03c4f41e402df75fe214bb35f |
| 406-pin-head.log · git -C tui log -1 --format=%H %P %s | 23:06  2 users, load averages: 2.21 2.41 2.84 | 0 | 9ce72f5a99651f3443f161551d390fc62bc896c4cb46f46b2e9ba692ca31b903 |
| 407-admission-full-runtime.log · runtime_check | 23:06  up 14:34, 2 users, load averages: 2.25 2.40 2.82 | 0 | 02b1d6829a2c56abdcf1d5fe012ebcd548b685817d81265ce4f58544d742207d |
| 408-admission-lock-before.log · shasum -a 256 tui/bun.lock | 23:06  2 users, load averages: 2.25 2.40 2.82 | 0 | c266d2b1d6e82ebde11c297cb512f7834166b17e56ba1f7f749912e6a4f6e3ed |
| 409-admission-full-install.log · bun install --frozen-lockfile | 23:06  up 14:34, 2 users, load averages: 2.25 2.40 2.82 | 0 | 5f9ff617d229bd7caca25ad280e012625ba01adae11204540d083fbfa5f2dc6b |
| 410-admission-lock-after.log · shasum -a 256 tui/bun.lock | 23:06  2 users, load averages: 2.25 2.40 2.82 | 0 | c266d2b1d6e82ebde11c297cb512f7834166b17e56ba1f7f749912e6a4f6e3ed |
| 411-admission-install-mode.log · git -C tui diff --summary | 23:06  2 users, load averages: 2.25 2.40 2.82 | 0 | 533359953b6ffb907e0d62109f357987db9e7b3195db68e9ab1c4bf648dd8ec0 |
| 412-admission-mode-restore.log · git -C tui checkout -- packages/founder-act/src/main.ts | 23:06  2 users, load averages: 2.25 2.40 2.82 | 0 | ce6d7b8ca27bb79068024c5a3640c83ae4cd6ecd15a30d28d5f96e04b3838944 |
| 413-admission-install-status.log · git -C tui status --porcelain --untracked-files=all | 23:06  2 users, load averages: 2.25 2.40 2.82 | 0 | f9673a94f82e6e85e1d81dcb9a581892ee27665fa25b2adb0d6bf6db6e59157b |
| 414-admission-typecheck.log · bunx tsc --noEmit | 23:06  up 14:34, 2 users, load averages: 2.25 2.40 2.82 | 0 | b3027ba168db2c06c77827086198cc44d21b9d558249750e6c8960ce80f42ba8 |
| 415-admission-suite-runtime.log · runtime_check | 23:06  up 14:34, 2 users, load averages: 2.39 2.43 2.83 | 0 | 2fb9d5aca65ffe5bfb080923c64caa497acc82735873d15f983a15f417834f0f |
| 416-admission-suite-wait.log · load_wait | 23:06  up 14:34, 2 users, load averages: 2.28 2.40 2.82 | 0 | 1a9d3c659ab698afd9a9e96f5719f950df2fff62b5c3493e5b7f6afa64d8f661 |
| 417-admission-suite.log · bun test | 23:07  up 14:34, 2 users, load averages: 1.94 2.30 2.77 | 0 | 497402226fb2b70a4a472dacfceb0cba471a85a0185c9788f1ed3a53f2c9293b |
| 418-scope-evidence-helpers.log · cat /private/tmp/m0-admission-r1.Eo5Hwr47/scope.py /private/tmp/m0-admission-r1.Eo5Hwr47/append_phase1.py | 23:06  2 users, load averages: 2.39 2.43 2.83 | 0 | f48d5669f53b42beebd95d7497e5946aec86da433e755979850087949e571901 |
| 419-report-helper.log · cat /private/tmp/m0-admission-r1.Eo5Hwr47/final_report.py | 23:06  2 users, load averages: 2.39 2.43 2.83 | 0 | 405a378586cda3733bbc6a289449f40734d6f5c5a08fe1d5708ae6150a3b31b5 |
| 420-record-conditions.log · sed -n 85,205p;264,321p prompt/m0-record-r3.ts | 23:06  2 users, load averages: 2.39 2.43 2.83 | 0 | a042d2dec0905bc4619cb0100016fd542c03bd3ab201a11fce6b07f4bdcc3d39 |
| 421-align-completion-evidence.log · python3 - /private/tmp/m0-admission-r1.Eo5Hwr47 | 23:07  2 users, load averages: 1.73 2.24 2.74 | 0 | 0fec38fd5ac72788fe424f9dba0dff4a9c56cd7c45e6677f3fa5365f0f4f6edf |
| 422-update-closing-message.log · cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/commit-close.txt | 23:07  2 users, load averages: 1.88 2.24 2.72 | 0 | 0a28a4952682c024adaa44293b8556a30823a13e656e513357f72373e91e6c64 |
| 423-evidence-writers.log · cat /private/tmp/m0-admission-r1.Eo5Hwr47/append_phase1.py /private/tmp/m0-admission-r1.Eo5Hwr47/final_report.py | 23:09  2 users, load averages: 1.79 2.12 2.60 | 0 | 1c8851c04800ab230a1f87c50cbd9ad34ef92f78b2b67913a448aba35a3ec7e2 |
| 424-reader-authority.log · cat prompt/m0-record-r3.ts | 23:10  2 users, load averages: 1.81 2.11 2.59 | 0 | 7b925af8c23decbc6e9271130fad83cb7070c4ecfd47ea3e5d52dc451d11d701 |
| 425-resumed-head-list.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/tests.py logs/417-admission-suite.log | 23:10  2 users, load averages: 1.69 2.07 2.57 | 0 | 66077a0070554429f95041e7645c878016437eb0c1a980e45fb7a8a8a2621097 |
| 426-resumed-comparison.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/compare.py logs/057-baseline-suite.log logs/417-admission-suite.log | 23:10  2 users, load averages: 1.69 2.07 2.57 | 0 | 6735f6a264d40ad50e24f14f7d6ff52e408ead3a2823bb933e7a1e1c9dd08868 |
| 427-gate-diff-check.log · git -C tui diff --check 0678bd4412d5aaed963ae20f101959bd92f79811 HEAD | 23:10  2 users, load averages: 2.54 2.25 2.63 | 0 | e18effca4c61d31940c375704a814e87a65d58e502de107182f40f5c7b9b042f |
| 428-gate-paths.log · git -C tui diff --name-only 0678bd4412d5aaed963ae20f101959bd92f79811 HEAD | 23:10  2 users, load averages: 2.54 2.25 2.63 | 0 | dca9b1bf8993b3dbc36b61eec0b7d89751163eb0fe6514970ded2562ddc6e321 |
| 429-gate-registry.log · git -C tui diff 0678bd4412d5aaed963ae20f101959bd92f79811 HEAD -- packages/protocol/src/adapter-registry.ts | 23:10  2 users, load averages: 2.54 2.25 2.63 | 0 | 2319e04d371a807136fe0e8be8d48bbe67a5dec3f144d3fd48e994f6947e0785 |
| 430-gate-recorded.log · git -C tui diff 0678bd4412d5aaed963ae20f101959bd92f79811 HEAD -- packages/adapter-madv-surface/test/recorded.test.ts | 23:10  2 users, load averages: 2.54 2.25 2.63 | 0 | bea2d435c759a01d453ae2f434125f76330ea32b316adea5d2966cd468590a45 |
| 431-gate-pin.log · git -C tui diff 0678bd4412d5aaed963ae20f101959bd92f79811 HEAD -- test/phase3a/harness-separation.test.ts | 23:10  2 users, load averages: 2.54 2.25 2.63 | 0 | 39ba7410991845bc6104cd33247f9848c7ff332751bb0957a8669490f6a3fdaf |
| 432-gate-protected.log · git -C tui diff --stat 0678bd4412d5aaed963ae20f101959bd92f79811 HEAD -- packages/adapter-madv-surface/test/fixtures packages/supervisor/src package.json bun.lock | 23:10  2 users, load averages: 2.54 2.25 2.63 | 0 | ba8b32aa487f76cb6be5cbe399170f91ea1d56095802567c13eef81fe73e2dad |
| 433-gate-status.log · git -C tui status -sb | 23:10  2 users, load averages: 2.54 2.25 2.63 | 0 | 5dee78cfc0420704a295145e2264056c06b6add25f732e23dfe9e934516a00ca |
| 434-gate-untracked.log · git -C tui ls-files --others --exclude-standard | 23:10  2 users, load averages: 2.54 2.25 2.63 | 0 | da1c0e08f61602e7dc2d1418c853f362c3a92a2b7be1f939995659ff2d49d51f |
| 435-gate-scope.log · python3 /private/tmp/m0-admission-r1.Eo5Hwr47/scope.py | 23:10  2 users, load averages: 2.54 2.25 2.63 | 0 | 601525e3da93c5f9b933e12ad209bdf18f8e5f054147a89a8a435a91728125ed |
| 436-gate-harness-file.log · awk -F \t $1=="test/phase3a/harness-separation.test.ts"{print; count++; if($3!="pass")bad=1} END{print count,"passing cases"; exit (!count \|\| bad)} logs/425-resumed-head-list.log | 23:10  2 users, load averages: 2.54 2.25 2.63 | 0 | 54d7dbbd17c6b427ed9927abd23b8c248c8bafc0afe1bdcc0a30fa2af9958ae6 |
| 437-existing-test-diffs.log · git -C tui diff 0678bd4412d5aaed963ae20f101959bd92f79811 HEAD -- packages/protocol/test/adapter-registry.test.ts packages/supervisor/test/madv-probes.test.ts packages/adapter-madv-surface/test/recorded.test.ts test/phase3a/harness-separation.test.ts | 23:10  2 users, load averages: 2.54 2.25 2.63 | 0 | 3f823a2d292f8d0a7ca609fb6dccae2475bca5b16c4074f713c28ba9847fc110 |
| 438-r4-copy.log · cp prompt/m0-record-r3.ts record/m0-admission-record.ts | 23:10  2 users, load averages: 2.30 2.21 2.61 | 0 | 2019cc6f9f8b0c2b6fbfe0a4c4949003401342a34a554ee4dd39702f5aa70ade |
| 439-r4-edit.log · python3 - | 23:10  2 users, load averages: 2.30 2.21 2.61 | 0 | bdbbef646ed2acf354f280390f98782b2280ea91dc00e6bcc62360b6fc2cf570 |
| 440-r4-sha.log · shasum -a 256 record/m0-admission-record.ts | 23:10  2 users, load averages: 2.30 2.21 2.61 | 0 | e47778fd17038bddfb44e5331aa42a792404edb2955fd86db81a070a1c59c359 |
| 441-r4-shape.log · sed -n 1,210p logs/314-capture-shape.log | 23:10  2 users, load averages: 2.30 2.21 2.61 | 0 | c9ab906a684d39a0631fbb34453d2dae1d411c2df201704c55d322283ba1ae9c |
| 442-r4-source.log · cat record/m0-admission-record.ts | 23:10  2 users, load averages: 2.19 2.19 2.60 | 0 | 31312de147cc7699f3e4ce99ea2a7ab825a0eae3c55526f0ce2665648c4691ad |
| 443-r4-diff.log · diff -u prompt/m0-record-r3.ts record/m0-admission-record.ts | 23:10  2 users, load averages: 2.19 2.19 2.60 | 1 | 6ea1355382918888d20e67f01c32ba0351b68cf2ebdc001b79558fcf04b05408 |
| 444-reader-field-check.log · rg -n -A 5 unexpected_tool_call\|error_max_turns\|type: "tool_result"\|type: "tool_use"\|function encodeUserInput reference/madv-surface/src tui/packages/adapter-madv-surface/src/index.ts | 23:10  2 users, load averages: 2.02 2.15 2.59 | 0 | 8a1d2ea2dea5e2a68e7038da06611a2940424c9994d9f2dec969f97227e95127 |
| 445-reader-helper-inventory.log · ls /private/tmp/m0-admission-r1.Eo5Hwr47 | 23:10  2 users, load averages: 2.02 2.15 2.59 | 0 | 745a817bd87d3c3a84925f1cf43dd7b0d2753b446005fac6d39535212f78d66f |
| 446-error-shape.log · rg -n -C 3 error_during_execution\|subtype: err\|code: err\|subtype: failure\|exit_code: reference/madv-surface/src/agent.ts | 23:10  2 users, load averages: 1.86 2.11 2.57 | 0 | a3b246be17896d9e6cd5372bb46215b7e1c15523ce2e0f093f77625c55a2b8b5 |
| 447-log-behavior.log · cat /private/tmp/m0-admission-r1.Eo5Hwr47/commands.zsh | 23:10  2 users, load averages: 1.86 2.11 2.57 | 0 | ae7c66a90e66237436bde0e851b9e604114cf8c9c721206c4211dfdf0bb4457c |
| 448-r4-folders.log · python3 - /private/tmp/m0-admission-r1.Eo5Hwr47 | 23:11  2 users, load averages: 1.69 2.05 2.53 | 0 | 7222ebda3002674eeb7e0aeeb09cb6e8ab3c0aef24a574ae4428da922eacc609 |
| 449-r4-runtime.log · runtime_check | 23:12  up 14:39, 2 users, load averages: 1.57 1.98 2.48 | 0 | 99d2bd8262be5938a3c4442f1312a29890ec280f70261ad7a7a1c048ca9f1676 |
| 450-delivery-sources.log · cat /private/tmp/m0-admission-r1.Eo5Hwr47/completion_data.py /private/tmp/m0-admission-r1.Eo5Hwr47/evidence.py /private/tmp/m0-admission-r1.Eo5Hwr47/commit-tools.zsh /private/tmp/m0-admission-r1.Eo5Hwr47/commit-close.txt | 23:12  2 users, load averages: 1.40 1.93 2.46 | 0 | f3b207fb106aceafaad687fb62111965d63800efa6fe5444bc4896721187ab50 |
| 451-r4-1-wait.log · load_wait | 23:16  up 14:43, 2 users, load averages: 1.40 1.75 2.26 | 0 | 087768ea856c387a91c9c43226e24382348bb2be729401bf3b6dab32eb258c49 |
| 452-r4-case-1.log · bun record/m0-admission-record.ts --clone /Users/michaeldaley/builds/m0-admission-r1/tui --surface madv-surface --host macbook --investigation /private/tmp/m0-admission-r1.Eo5Hwr47/r4-1 | 23:16  up 14:43, 2 users, load averages: 1.40 1.75 2.26 | 0 | 87df208b2734c94037e50dadb9909b5e6f63edc2a0ed9e76c88e7c7c8bb2a039 |
| 453-r4-2-wait.log · load_wait | 23:16  up 14:43, 2 users, load averages: 1.45 1.75 2.25 | 0 | c3e5dc05cf645bcba8d5edfade3065507f1c297d2155ef0f8f266ac1b6dd7703 |
| 454-r4-case-2.log · bun record/m0-admission-record.ts --clone /Users/michaeldaley/builds/m0-admission-r1/tui --surface madv-surface --host macbook --investigation /private/tmp/m0-admission-r1.Eo5Hwr47/r4-2 | 23:16  up 14:43, 2 users, load averages: 1.45 1.75 2.25 | 0 | b52c7698f84fbaa4020c65f80798bb6caa98f1233aaa82358f64740c23b874fa |
| 455-r4-3-wait.log · load_wait | 23:16  up 14:43, 2 users, load averages: 1.45 1.75 2.25 | 0 | c3e5dc05cf645bcba8d5edfade3065507f1c297d2155ef0f8f266ac1b6dd7703 |
| 456-r4-case-3.log · bun record/m0-admission-record.ts --clone /Users/michaeldaley/builds/m0-admission-r1/tui --surface madv-surface --host macbook --investigation /private/tmp/m0-admission-r1.Eo5Hwr47/r4-3 | 23:16  up 14:43, 2 users, load averages: 1.45 1.75 2.25 | 0 | be0cdfcfb7a321e97472423ca4ec645f03a23b23ce80b81b39cc53b02e147b28 |
| 457-r4-4-wait.log · load_wait | 23:16  up 14:43, 2 users, load averages: 1.45 1.75 2.25 | 0 | c3e5dc05cf645bcba8d5edfade3065507f1c297d2155ef0f8f266ac1b6dd7703 |
| 458-r4-case-4.log · bun record/m0-admission-record.ts --clone /Users/michaeldaley/builds/m0-admission-r1/tui --surface madv-surface --host macbook --investigation /private/tmp/m0-admission-r1.Eo5Hwr47/r4-4 | 23:16  up 14:43, 2 users, load averages: 1.45 1.75 2.25 | 0 | 45f3abfc87d3a1e295a5dce5ebfb5cf2c9fdba8bbd44609fff27edfe58a85262 |
| 459-r4-5-wait.log · load_wait | 23:16  up 14:43, 2 users, load averages: 1.45 1.75 2.25 | 0 | c3e5dc05cf645bcba8d5edfade3065507f1c297d2155ef0f8f266ac1b6dd7703 |
| 460-r4-case-5.log · bun record/m0-admission-record.ts --clone /Users/michaeldaley/builds/m0-admission-r1/tui --surface madv-surface --host macbook --investigation /private/tmp/m0-admission-r1.Eo5Hwr47/r4-5 | 23:16  up 14:43, 2 users, load averages: 1.45 1.75 2.25 | 0 | d27277109e69c2e2f8d82e8910737327bcf230b6ac2c1742b93aa92b43f6e496 |
| 461-r4-6-wait.log · load_wait | 23:16  up 14:43, 2 users, load averages: 1.45 1.75 2.25 | 0 | c3e5dc05cf645bcba8d5edfade3065507f1c297d2155ef0f8f266ac1b6dd7703 |
| 462-r4-case-6.log · bun record/m0-admission-record.ts --clone /Users/michaeldaley/builds/m0-admission-r1/tui --surface madv-surface --host macbook --investigation /private/tmp/m0-admission-r1.Eo5Hwr47/r4-6 | 23:16  up 14:43, 2 users, load averages: 1.45 1.75 2.25 | 1 | 3bb2c41698ed2e1cc7398c5ee2cb22f9ef2786bce070471485f6210bb957b53c |
| 463-r4-7-wait.log · load_wait | 23:16  up 14:43, 2 users, load averages: 1.45 1.75 2.25 | 0 | c3e5dc05cf645bcba8d5edfade3065507f1c297d2155ef0f8f266ac1b6dd7703 |
| 464-r4-case-7.log · bun record/m0-admission-record.ts --clone /Users/michaeldaley/builds/m0-admission-r1/tui --surface madv-surface --host macbook --investigation /private/tmp/m0-admission-r1.Eo5Hwr47/r4-7 | 23:16  up 14:43, 2 users, load averages: 1.45 1.75 2.25 | 1 | ed5d81b756eee2aee3844626192d3b18f01560bcbf4c757a77274555bb853fbf |
| 465-r4-8-wait.log · load_wait | 23:16  up 14:43, 2 users, load averages: 1.50 1.76 2.25 | 0 | 3b975621073182061a0d470ef28770e16109d44f8ee8da11cab6707adf983cae |
| 466-r4-case-8.log · bun record/m0-admission-record.ts --clone /Users/michaeldaley/builds/m0-admission-r1/tui --surface madv-surface --host macbook --investigation /private/tmp/m0-admission-r1.Eo5Hwr47/r4-8 | 23:16  up 14:43, 2 users, load averages: 1.50 1.76 2.25 | 1 | 340db8bfdfe863147b46731f43aea0e8431c6a0cfde5d1cb15c74e1256de1a23 |
| 467-closing-authority.log · cat prompt/DEC-20261121-02-addendum-2-registry-digest.md | 23:16  2 users, load averages: 1.26 1.70 2.23 | 0 | ed84b78db794f508e3baa477e0296eb515739746bc1e41fa6e46895943817a1f |
| 468-report-format.log · cat /private/tmp/m0-admission-r1.Eo5Hwr47/report_format.py /private/tmp/m0-admission-r1.Eo5Hwr47/change_table.py | 23:16  2 users, load averages: 1.26 1.70 2.23 | 0 | 17b77ddb97f6c684a36adb7d8b47fd0d78602d072213a5941f1c56c20c80aebe |
| 469-attribution-usage.log · sed -n 1,145p tui/.github/scripts/attribution-shape-check.sh | 23:16  2 users, load averages: 1.26 1.70 2.23 | 0 | 5f5b5b5f2ad24853d63ffe947e0d80dff0a346c3a256bd5845f08b4308645f84 |
| 470-prior-evidence-files.log · ls logs | 23:16  2 users, load averages: 1.26 1.70 2.23 | 0 | 0c1f5274607c4fb743c8437f0542ec99fd209f3c600607bd88387b8e5a2940b1 |
| 471-attribution-invocation.log · rg -n -A 12 Usage:\|^  pr\)\|^if .*pr\|rev-list tui/.github/scripts/attribution-shape-check.sh | 23:16  2 users, load averages: 1.24 1.69 2.22 | 0 | a89921bd26e96402f32da96bcce9b653cea97b6bb8321a87ea54b05e8f0c1560 |
| 472-quote-inputs.log · python3 - /private/tmp/m0-admission-r1.Eo5Hwr47 | 23:16  2 users, load averages: 1.24 1.69 2.22 | 0 | ae279eab2be03c9b316b68a65092b6721d55320143f84794ec0e4826c9d07c04 |
| 473-completion-details.log · python3 - /private/tmp/m0-admission-r1.Eo5Hwr47 | 23:16  2 users, load averages: 1.09 1.62 2.18 | 0 | 5088c4457ff743f44e88b933882f710d46c84de98eee4952fcc5d4ebade6f5b0 |
| 474-check-message-5.log · check_closing_message | 23:16  2 users, load averages: 1.09 1.62 2.18 | 127 | b4c2dbcd5f178300795febf1328c8e96eeba5f884f377d651824914ab5634c3c |
| 475-closing-message-verified.log · check_message /private/tmp/m0-admission-r1.Eo5Hwr47/commit-close.txt | 23:16  2 users, load averages: 1.08 1.61 2.18 | 0 | 58c4ad13844745ce3e923ef72178a40e5746830af030fbc71df9625fdea2fcc7 |
| 476-record-command-correction.log · python3 - /private/tmp/m0-admission-r1.Eo5Hwr47 | 23:16  2 users, load averages: 1.08 1.61 2.18 | 0 | cbce14a57f84751cd45762ebe0b5735780282448c530cd7c506617c4caf3d5b3 |
