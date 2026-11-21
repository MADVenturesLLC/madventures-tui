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
