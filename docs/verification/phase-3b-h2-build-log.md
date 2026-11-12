# Phase 3B H2 build log

## Opening: binding state and commission

Main when work began: 9115b63d97cef972f6bdfb0da0c0ee5931d10bf0.
Branch: build/3b-h2-r1. Binding base and first commit parent:
a7251235f94dcc4a3149b638a1acdac69236a26d, the merge of H1.
No fetch was made. The commission is DEC-20261108-04 B5, B8 and C1,
read with Addendum 1 and DEC-20261112-02. DEC-20261112-03 is H2's
act of record. Its B1 confirms the preflight-caller rulings at this base;
H2 changes none of those callers. Its B3 alone fixes repository paths.
Preflight blobs: ced2364d85c0117563533e6dc419575f06a09161 for
packages/supervisor/src/preflight.ts and
182285abde26fae13f9403dba676349608a61265 for
packages/supervisor/test/preflight.test.ts.

## Identity and runtime

Harness Codex; model label GPT-6, made by OpenAI. Exact model identifier
and reasoning effort are not shown and are not machine-verifiable.
Primary agent /root; collaboration mode Default; assigned builder;
Actor-Id session:codex/3b-h2-r1; execution surface codex.
Sandbox workspace-write; approval on-request; network restricted;
approvals reviewer not shown. Shell zsh, date shown 2026-11-12,
timezone America/New_York. No MCP server is shown loaded; the Founder
confirmed none. No additional namespace or web, image generation/editing,
or goal tool is shown.

Inventory: functions with wait, request_user_input, request_user_input_async
and exec; inside exec, apply_patch, exec_command, write_stdin and
clock__curr_time, plus the six names of Addendum 2 B4 where applicable.
clock exposes sleep. collaboration exposes followup_task, interrupt_agent,
list_agents, send_message and wait_agent, plus the six names of Addendum 2
B4 where applicable. The deferred namespace is included in the six names
of Addendum 2 B4; individual deferred tools are not shown. No barred tool
has been called, and no exec input contains one of the six names of
Addendum 2 B4. The Founder's later session-record check supplies the CLI
version, model and effort recorded for each turn under DEC-20261112-02 B2.

Git identity: daley40-lab,
293512385+daley40-lab@users.noreply.github.com.
The governed CLI version output (007, repeated at resume in 091) was:

~~~~~~~~
WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0
~~~~~~~~

Certification runtime: /Users/michaeldaley/.bun/bin/bun, version 1.4.2,
revision 744846f844374847c902b5e7fd59b4342a51ef99, SHA-256
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5.
bunx resolves to /Users/michaeldaley/.bun/bin/bunx.
Checks 006, 063, 074 and 099 each match; their complete output and hashes
are recorded below. Every Bun command is escalated from its first run,
with the Founder approving that command, and begins with the prescribed
per-command PATH export. No host setting changes.

## Preconditions and baseline

1. Main is exactly the required commit. Both ancestor checks passed.
   Its changed paths from the binding base are docs-only, none in B3.
   HEAD and branch match, the worktree was clean, and the stash was empty.
   The build log did not exist and pr was empty. The initial logs-directory
   emptiness was not checked before creating the session logs; the later
   census contained only this session's logs. This is disclosed below.
2. All 21 authority hashes match; every decision record is ISSUED and
   carries the Founder's signature. The prompt manifest passes from its
   own directory; the failed root-directory attempts are retained.
3. The record/store source and export lines are quoted below. The caller
   census matches the five expected files, including the indirect fixture
   call in runtime-harness.ts. No caller is changed.
4. Both pre-act macOS capability records exist; report hashes and their
   record lines follow below. Only test fixtures will read these bytes.
5. uname -sm returned Darwin arm64.
6. The baseline ran once and passed. Under the signed resume it stands
   and is not repeated. bun.lock stayed byte-identical, SHA-256
   34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0.
   Install changed only the executable bit on founder-act/src/main.ts;
   git checkout restored it, as directed, in logs 065 through 069.
   That restoration is not a finding.

Main changed paths:

~~~~~~~~
docs/decisions/DEC-20261108-03-addendum-1-gate-order.md
docs/decisions/DEC-20261108-03-addendum-10-second-verdict.md
docs/decisions/DEC-20261108-03-addendum-11-governed-build.md
docs/decisions/DEC-20261108-03-addendum-2-codex-harness.md
docs/decisions/DEC-20261108-03-addendum-3-image-tool.md
docs/decisions/DEC-20261108-03-addendum-4-sandbox-halt.md
docs/decisions/DEC-20261108-03-addendum-5-own-work.md
docs/decisions/DEC-20261108-03-addendum-6-names-in-text.md
docs/decisions/DEC-20261108-03-addendum-7-quarantine-limit.md
docs/decisions/DEC-20261108-03-addendum-8-gate-repeat.md
docs/decisions/DEC-20261108-03-addendum-9-first-verdict.md
docs/decisions/DEC-20261112-01-h1-records-and-merge.md
docs/decisions/DEC-20261112-02-model-record.md
docs/decisions/DEC-20261112-03-h2-record.md
docs/verification/phase-3a-correction-rounds.md
~~~~~~~~

Authority checks:

~~~~~~~~
d373235e424bd7fbe4c1c5b1c5f4954eb1b02165db4e1365d9cfa1533aa93b29 docs/decisions/DEC-20261108-04-phase-3b-standing-commission.md MATCH
ISSUED and Founder signature present
90e2f541fd0a232390ca0554067a2de8b37f15c933016eafe40ebde2cd2eff17 docs/decisions/DEC-20261108-04-addendum-1-corrections.md MATCH
ISSUED and Founder signature present
e5198f697c3c5484d778160fc3a38dfa1366e58d9403d792b25a4100e46756b8 docs/decisions/DEC-20261112-03-h2-record.md MATCH
ISSUED and Founder signature present
3151cb9e178e918f0c07f5a4eb9931fa9d529debedf0ad4d91f5999844883da7 docs/decisions/DEC-20261112-02-model-record.md MATCH
ISSUED and Founder signature present
e04b54065b0f0bb465b2d14e14a39f3b31f9cb34a874f6f8210a7d7e74a8c1c1 docs/decisions/DEC-20261108-03-addendum-2-codex-harness.md MATCH
ISSUED and Founder signature present
f2a0ef1063379902935760d9517b68d532cabf6e24699cdebb789681f78ce15e docs/decisions/DEC-20261108-03-addendum-3-image-tool.md MATCH
ISSUED and Founder signature present
e817470aea6be2c176d4ae75856fd793ef982bd28c9eb793df9c9038a5c1dfbc docs/decisions/DEC-20261108-03-addendum-4-sandbox-halt.md MATCH
ISSUED and Founder signature present
e86e94a62c7067e4656114afe1713c1478814ffe446d1ffcc8b788accfc3ff3d docs/decisions/DEC-20261108-03-addendum-5-own-work.md MATCH
ISSUED and Founder signature present
24cef0ed5c968aa80ada586e473526d0f4f0b1de1331eba1d5a35051b1254ac9 docs/decisions/DEC-20261108-03-addendum-6-names-in-text.md MATCH
ISSUED and Founder signature present
d90d48718bc4ea6056af6f011f797a78eddcfd14e7111f15f823085c4388bca0 docs/decisions/DEC-20261108-03-addendum-10-second-verdict.md MATCH
ISSUED and Founder signature present
e2d28cbd12485e9025c928403eb7beead9552ee378b023ddf5bc9e18febe00df docs/decisions/DEC-20261108-03-addendum-11-governed-build.md MATCH
ISSUED and Founder signature present
38ec4066f5c9487547befc81e00b80b69126d9140f1e66c0a8dcb35e5fe815ef docs/decisions/DEC-20261108-02-phase-3b-builder-qualification.md MATCH
ISSUED and Founder signature present
319ba65b340696d66a655e21f648fed742a9c38bcbb1d876776abc27a27a9738 docs/decisions/DEC-20261108-01-phase-3b-approval.md MATCH
ISSUED and Founder signature present
04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550 docs/decisions/DEC-20261102-02-hardening-builds.md MATCH
ISSUED and Founder signature present
bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5 docs/decisions/DEC-20261023-01-standing-build-rules.md MATCH
ISSUED and Founder signature present
249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7 docs/decisions/DEC-20261013-03-tests-4-6-ruling.md MATCH
ISSUED and Founder signature present
011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5 docs/decisions/DEC-20261104-02-hardening-f-and-task58.md MATCH
ISSUED and Founder signature present
cae5ac6b59618507f6ff3ef0f4d2cd5bca1909f328023248db8d234c4098b5a1 docs/decisions/DEC-20261010-02-linux-host-scope.md MATCH
ISSUED and Founder signature present
a48bf5457bf17cf5d554e541c5bb3609efacf6ad170ad6e56950b829a4269ccc docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md MATCH
a6af30015f743740794d89e12cfc2af07433ead70433b739725c2728a89fc69d docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md MATCH
0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca AGENTS.md MATCH
~~~~~~~~

Record at the binding base, numbered source:

~~~~~~~~
     1	// packages/protocol/src/capability-record.ts
     2	// Capability record V1: a dated observation of one surface's CLI, binary and
     3	// host, never a standing authorization (spec sections 2.3, 5.5 and 9.1;
     4	// PLAN-OPEN-3). Pure: no I/O, no clock, no record creation. The caller
     5	// supplies `now`, and the registry is read only through lookupRegistration.
     6	// Inspecting the input is itself untrusted work: B3 of act
     7	// FOUNDER-ACT-20261005-TASK35-CORRECTION requires every exception raised
     8	// while parseCapabilityRecord reads its input to leave as a
     9	// CapabilityRecordError of kind `schema` naming the container. B3 of act
    10	// FOUNDER-ACT-20261007-TASK35-SECOND-CORRECTION makes that hold by
    11	// construction: the whole parse runs inside one boundary, which lets through
    12	// only the rejection the parse raised itself, recognized by identity. B5 of
    13	// DEC-20261008-01 confines that identity and container to the current call.
    14
    15	import { lookupRegistration } from "./adapter-registry";
    16	import { parseSurfaceId, type SurfaceId } from "./surface-id";
    17	import { KNOWN_ROLES, type ExecutionRole } from "./task-envelope";
    18
    19	export interface CapabilityRecordV1 {
    20	  readonly surface: SurfaceId;
    21	  readonly provider: string;
    22	  readonly requested_model: string;
    23	  readonly role_eligibility: readonly ExecutionRole[];
    24	  readonly independence_domain: string;
    25	  readonly organization_id: string;
    26	  readonly cli_version: string;
    27	  readonly binary_path: string;
    28	  readonly binary_sha256: string;
    29	  readonly evaluated_at: string;
    30	  readonly expires_at: string;
    31	  readonly host: {
    32	    readonly arch: string;
    33	    readonly macos_version: string;
    34	    readonly macos_build: string;
    35	    readonly bun_version: string;
    36	    readonly bun_path: string;
    37	    readonly bun_sha256: string;
    38	    readonly term: string;
    39	    readonly shell: string;
    40	  };
    41	  readonly identity_attestation: {
    42	    readonly result: "pass" | "fail";
    43	    readonly primitive: string;
    44	    readonly sanitized_facts: string;
    45	  };
    46	  readonly auth_readiness: { readonly result: "pass" | "fail" | "no_primitive"; readonly primitive: string | null };
    47	  readonly pty: { readonly result: "pass" | "fail"; readonly observed_ms: Record<string, number> };
    48	  readonly independent_review_eligible: boolean;
    49	  readonly limitations: readonly string[];
    50	  readonly overall: "pass" | "fail";
    51	  readonly redaction_rules_applied: readonly string[];
    52	}
    53
    54	/** What a caller observed about the surface now. PLAN-OPEN-3 compares these and nothing else. */
    55	export interface ObservedSurfaceFacts {
    56	  readonly cli_version: string;
    57	  readonly binary_sha256: string;
    58	  readonly host: CapabilityRecordV1["host"];
    59	}
    60
    61	export type StalenessReason = "binary_hash_changed" | "cli_version_changed" | "host_changed" | "horizon_expired";
    62
    63	type CapabilityRecordErrorKind = "schema" | "unregistered_surface" | "registration_mismatch" | "timestamp" | "invalid_now";
    64
    65	/**
    66	 * Every rejection. It carries the kind and the offending field name only,
    67	 * never the input or any record content. Every `field` is a name from this
    68	 * module's schema, so an unknown key is reported by its container.
    69	 */
    70	export class CapabilityRecordError extends Error {
    71	  constructor(
    72	    public readonly kind: CapabilityRecordErrorKind,
    73	    public readonly field: string,
    74	  ) {
    75	    super(`capability record rejected: ${kind} (${field})`);
    76	    this.name = "CapabilityRecordError";
    77	  }
    78	}
    79
    80	// PLAN-OPEN-3: exactly 30 × 24 × 60 × 60 × 1000 milliseconds.
    81	const HORIZON_MS = 30 * 24 * 60 * 60 * 1000;
    82	const SHA256_HEX = /^[0-9a-f]{64}$/;
    83
    84	const RECORD_FIELDS = [
    85	  "surface",
    86	  "provider",
    87	  "requested_model",
    88	  "role_eligibility",
    89	  "independence_domain",
    90	  "organization_id",
    91	  "cli_version",
    92	  "binary_path",
    93	  "binary_sha256",
    94	  "evaluated_at",
    95	  "expires_at",
    96	  "host",
    97	  "identity_attestation",
    98	  "auth_readiness",
    99	  "pty",
   100	  "independent_review_eligible",
   101	  "limitations",
   102	  "overall",
   103	  "redaction_rules_applied",
   104	] as const;
   105	const HOST_FIELDS = [
   106	  "arch",
   107	  "macos_version",
   108	  "macos_build",
   109	  "bun_version",
   110	  "bun_path",
   111	  "bun_sha256",
   112	  "term",
   113	  "shell",
   114	] as const;
   115	const IDENTITY_ATTESTATION_FIELDS = ["result", "primitive", "sanitized_facts"] as const;
   116	const AUTH_READINESS_FIELDS = ["result", "primitive"] as const;
   117	const PTY_FIELDS = ["result", "observed_ms"] as const;
   118	const PASS_FAIL = ["pass", "fail"] as const;
   119	const AUTH_RESULTS = ["pass", "fail", "no_primitive"] as const;
   120
   121	function reject(kind: CapabilityRecordErrorKind, field: string): never {
   122	  throw new CapabilityRecordError(kind, field);
   123	}
   124
   125	/**
   126	 * PLAN-OPEN-3 timestamp rule: a string whose parsed value is finite, checked
   127	 * before toISOString() can throw, and whose toISOString() is the identical
   128	 * canonical UTC string.
   129	 */
   130	function canonicalTimestampMs(
   131	  value: unknown,
   132	  kind: "timestamp" | "invalid_now",
   133	  field: string,
   134	  raise: typeof reject = reject,
   135	): number {
   136	  if (typeof value !== "string") return raise(kind, field);
   137	  const ms = new Date(value).getTime();
   138	  if (!Number.isFinite(ms)) raise(kind, field);
   139	  if (new Date(ms).toISOString() !== value) raise(kind, field);
   140	  return ms;
   141	}
   142
   143	function deepFreeze<T>(value: T): T {
   144	  if (typeof value === "object" && value !== null) {
   145	    for (const nested of Object.values(value)) deepFreeze(nested);
   146	    Object.freeze(value);
   147	  }
   148	  return value;
   149	}
   150
   151	/**
   152	 * Accepts only the exact shape and returns a deeply frozen copy of `raw`.
   153	 * Each call owns its rejection identity and inspected container. No input
   154	 * callback or other exported call can reach or change that state.
   155	 */
   156	export function parseCapabilityRecord(raw: Record<string, unknown>): CapabilityRecordV1 {
   157	  let inspecting = "record";
   158	  let raised: CapabilityRecordError | undefined;
   159
   160	  function reject(kind: CapabilityRecordErrorKind, field: string): never {
   161	    const error = new CapabilityRecordError(kind, field);
   162	    raised = error;
   163	    throw error;
   164	  }
   165
   166	  function probe<T>(container: string, read: () => T): T {
   167	    inspecting = container;
   168	    return read();
   169	  }
   170
   171	  function isPlainObject(value: unknown, container: string): value is object {
   172	    if (typeof value !== "object" || value === null) return false;
   173	    if (probe(container, () => Array.isArray(value))) return false;
   174	    const prototype: unknown = probe(container, () => Object.getPrototypeOf(value));
   175	    return prototype === Object.prototype || prototype === null;
   176	  }
   177
   178	  /** Requires an array. Its length and elements are still read defensively. */
   179	  function readArray(value: unknown, container: string): readonly unknown[] {
   180	    if (!probe(container, () => Array.isArray(value))) return reject("schema", container);
   181	    return value as readonly unknown[];
   182	  }
   183
   184	  /** Reads an own data property once, so no caller getter runs and no later read can differ. */
   185	  function ownDataValue(source: object, key: string, field: string, container: string): unknown {
   186	    const descriptor = probe(container, () => Object.getOwnPropertyDescriptor(source, key));
   187	    if (descriptor === undefined || !("value" in descriptor)) return reject("schema", field);
   188	    return descriptor.value;
   189	  }
   190
   191	  /** Snapshots a plain object whose own key set must be exactly `keys`. */
   192	  function readClosed<K extends string>(
   193	    value: unknown,
   194	    path: string,
   195	    keys: readonly K[],
   196	  ): Record<K, unknown> {
   197	    const container = path === "" ? "record" : path;
   198	    if (!isPlainObject(value, container)) return reject("schema", container);
   199	    const own = probe(container, () => Reflect.ownKeys(value));
   200	    const snapshot = {} as Record<K, unknown>;
   201	    for (const key of keys) {
   202	      const field = path === "" ? key : `${path}.${key}`;
   203	      if (!own.includes(key)) reject("schema", field);
   204	      snapshot[key] = ownDataValue(value, key, field, container);
   205	    }
   206	    // Every expected key is present and own keys are unique, so any surplus is
   207	    // an unknown key. It is named by its container, never by the key itself.
   208	    if (own.length !== keys.length) reject("schema", container);
   209	    return snapshot;
   210	  }
   211
   212	  function readString(value: unknown, field: string): string {
   213	    if (typeof value !== "string" || value.length === 0) return reject("schema", field);
   214	    return value;
   215	  }
   216
   217	  function readEnum<T extends string>(value: unknown, field: string, allowed: readonly T[]): T {
   218	    if (typeof value !== "string" || !(allowed as readonly string[]).includes(value)) return reject("schema", field);
   219	    return value as T;
   220	  }
   221
   222	  function readStringList(value: unknown, field: string): string[] {
   223	    const array = readArray(value, field);
   224	    const list: string[] = [];
   225	    for (let index = 0; probe(field, () => index < array.length); index++) {
   226	      list.push(readString(ownDataValue(array, String(index), field, field), field));
   227	    }
   228	    return list;
   229	  }
   230
   231	  function readRoles(value: unknown): ExecutionRole[] {
   232	    const field = "role_eligibility";
   233	    const array = readArray(value, field);
   234	    const roles: ExecutionRole[] = [];
   235	    for (let index = 0; probe(field, () => index < array.length); index++) {
   236	      const role = readEnum(ownDataValue(array, String(index), field, field), field, KNOWN_ROLES);
   237	      if (roles.includes(role)) reject("schema", field);
   238	      roles.push(role);
   239	    }
   240	    return roles;
   241	  }
   242
   243	  function readObservedMs(value: unknown): Record<string, number> {
   244	    const field = "pty.observed_ms";
   245	    if (!isPlainObject(value, field)) return reject("schema", field);
   246	    const entries: [string, number][] = [];
   247	    for (const key of probe(field, () => Reflect.ownKeys(value))) {
   248	      if (typeof key !== "string" || key.length === 0) reject("schema", field);
   249	      const ms = ownDataValue(value, key, field, field);
   250	      if (typeof ms !== "number" || !Number.isFinite(ms) || ms < 0) reject("schema", field);
   251	      entries.push([key, ms]);
   252	    }
   253	    // fromEntries defines own properties, so a "__proto__" key stays data.
   254	    return Object.fromEntries(entries);
   255	  }
   256
   257	  function readSurface(value: unknown): SurfaceId {
   258	    const text = readString(value, "surface");
   259	    try {
   260	      return parseSurfaceId(text);
   261	    } catch {
   262	      return reject("schema", "surface");
   263	    }
   264	  }
   265
   266	  try {
   267	    return readRecord(raw);
   268	  } catch (thrown) {
   269	    if (raised !== undefined && thrown === raised) throw thrown;
   270	    return reject("schema", inspecting);
   271	  }
   272
   273	  function readRecord(raw: Record<string, unknown>): CapabilityRecordV1 {
   274	    const record = readClosed(raw, "", RECORD_FIELDS);
   275
   276	    // PLAN-OPEN-3: both stored timestamps and their exact 30-day relation are
   277	    // settled before anything else reads them.
   278	    const evaluatedMs = canonicalTimestampMs(record.evaluated_at, "timestamp", "evaluated_at", reject);
   279	    const expiresMs = canonicalTimestampMs(record.expires_at, "timestamp", "expires_at", reject);
   280	    if (expiresMs - evaluatedMs !== HORIZON_MS) reject("timestamp", "expires_at");
   281
   282	    const surface = readSurface(record.surface);
   283	    const registration = lookupRegistration(surface);
   284	    if (registration === undefined) return reject("unregistered_surface", "surface");
   285
   286	    // Spec section 9.1: these are copied from the registration, so they must
   287	    // equal its values exactly.
   288	    const provider = readString(record.provider, "provider");
   289	    if (provider !== registration.provider) reject("registration_mismatch", "provider");
   290	    const organizationId = readString(record.organization_id, "organization_id");
   291	    if (organizationId !== registration.organization_id) reject("registration_mismatch", "organization_id");
   292	    const independenceDomain = readString(record.independence_domain, "independence_domain");
   293	    if (independenceDomain !== registration.independence_domain) {
   294	      reject("registration_mismatch", "independence_domain");
   295	    }
   296
   297	    const binarySha256 = readString(record.binary_sha256, "binary_sha256");
   298	    if (!SHA256_HEX.test(binarySha256)) reject("schema", "binary_sha256");
   299
   300	    const host = readClosed(record.host, "host", HOST_FIELDS);
   301	    const identity = readClosed(record.identity_attestation, "identity_attestation", IDENTITY_ATTESTATION_FIELDS);
   302	    if (typeof identity.sanitized_facts !== "string") reject("schema", "identity_attestation.sanitized_facts");
   303	    const auth = readClosed(record.auth_readiness, "auth_readiness", AUTH_READINESS_FIELDS);
   304	    const pty = readClosed(record.pty, "pty", PTY_FIELDS);
   305	    if (typeof record.independent_review_eligible !== "boolean") reject("schema", "independent_review_eligible");
   306
   307	    return deepFreeze({
   308	      surface,
   309	      provider,
   310	      requested_model: readString(record.requested_model, "requested_model"),
   311	      role_eligibility: readRoles(record.role_eligibility),
   312	      independence_domain: independenceDomain,
   313	      organization_id: organizationId,
   314	      cli_version: readString(record.cli_version, "cli_version"),
   315	      binary_path: readString(record.binary_path, "binary_path"),
   316	      binary_sha256: binarySha256,
   317	      evaluated_at: new Date(evaluatedMs).toISOString(),
   318	      expires_at: new Date(expiresMs).toISOString(),
   319	      host: {
   320	        arch: readString(host.arch, "host.arch"),
   321	        macos_version: readString(host.macos_version, "host.macos_version"),
   322	        macos_build: readString(host.macos_build, "host.macos_build"),
   323	        bun_version: readString(host.bun_version, "host.bun_version"),
   324	        bun_path: readString(host.bun_path, "host.bun_path"),
   325	        bun_sha256: readString(host.bun_sha256, "host.bun_sha256"),
   326	        term: readString(host.term, "host.term"),
   327	        shell: readString(host.shell, "host.shell"),
   328	      },
   329	      identity_attestation: {
   330	        result: readEnum(identity.result, "identity_attestation.result", PASS_FAIL),
   331	        primitive: readString(identity.primitive, "identity_attestation.primitive"),
   332	        sanitized_facts: identity.sanitized_facts as string,
   333	      },
   334	      auth_readiness: {
   335	        result: readEnum(auth.result, "auth_readiness.result", AUTH_RESULTS),
   336	        primitive: auth.primitive === null ? null : readString(auth.primitive, "auth_readiness.primitive"),
   337	      },
   338	      pty: {
   339	        result: readEnum(pty.result, "pty.result", PASS_FAIL),
   340	        observed_ms: readObservedMs(pty.observed_ms),
   341	      },
   342	      independent_review_eligible: record.independent_review_eligible as boolean,
   343	      limitations: readStringList(record.limitations, "limitations"),
   344	      overall: readEnum(record.overall, "overall", PASS_FAIL),
   345	      redaction_rules_applied: readStringList(record.redaction_rules_applied, "redaction_rules_applied"),
   346	    });
   347	  }
   348
   349	}
   350
   351	function stale(reason: StalenessReason): { readonly fresh: false; readonly reason: StalenessReason } {
   352	  return Object.freeze({ fresh: false, reason } as const);
   353	}
   354
   355	/**
   356	 * The sole staleness evaluator. `now` is validated first; then the first
   357	 * failure in PLAN-OPEN-3's fixed order is returned. There is no fifth reason.
   358	 */
   359	export function evaluateCapabilityFreshness(
   360	  record: CapabilityRecordV1,
   361	  now: string,
   362	  observed: ObservedSurfaceFacts,
   363	): { readonly fresh: true } | { readonly fresh: false; readonly reason: StalenessReason } {
   364	  const nowMs = canonicalTimestampMs(now, "invalid_now", "now");
   365	  if (record.binary_sha256 !== observed.binary_sha256) return stale("binary_hash_changed");
   366	  if (record.cli_version !== observed.cli_version) return stale("cli_version_changed");
   367	  for (const field of HOST_FIELDS) {
   368	    if (record.host[field] !== observed.host[field]) return stale("host_changed");
   369	  }
   370	  // Stale when now >= expires_at, with no grace period. Written as "not
   371	  // strictly before" so a record built without the parser whose expires_at
   372	  // does not parse reads as expired, never fresh.
   373	  if (!(nowMs < new Date(record.expires_at).getTime())) return stale("horizon_expired");
   374	  return Object.freeze({ fresh: true } as const);
   375	}
   376
   377	/**
   378	 * `${evaluated_at}-${binary_sha256.slice(0, 12)}.json`. The surface is the
   379	 * directory (spec section 5.1), not part of the name.
   380	 */
   381	export function capabilityRecordFilename(record: CapabilityRecordV1): string {
   382	  // The parser already guarantees both. They are checked again so a record
   383	  // built without the parser can never put a path separator into the name.
   384	  const evaluatedAt = record.evaluated_at;
   385	  const binarySha256 = record.binary_sha256;
   386	  canonicalTimestampMs(evaluatedAt, "timestamp", "evaluated_at");
   387	  if (typeof binarySha256 !== "string" || !SHA256_HEX.test(binarySha256)) {
   388	    reject("schema", "binary_sha256");
   389	  }
   390	  return `${evaluatedAt}-${binarySha256.slice(0, 12)}.json`;
   391	}
~~~~~~~~

Store at the binding base, numbered source:

~~~~~~~~
     1	import { closeSync, constants, fstatSync, mkdirSync, openSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
     2	import { basename, join } from "node:path";
     3	import {
     4	  capabilityRecordFilename,
     5	  evaluateCapabilityFreshness,
     6	  parseCapabilityRecord,
     7	  parseSurfaceId,
     8	  type CapabilityRecordV1,
     9	  type ObservedSurfaceFacts,
    10	  type SurfaceId,
    11	} from "@madventures/protocol";
    12	import { validateStorageRoot } from "./storage-root";
    13
    14	export class CapabilityStoreError extends Error {
    15	  constructor(
    16	    public readonly kind: "invalid_root" | "exists" | "unsafe_entry" | "malformed_record" | "surface_mismatch" | "filename_mismatch",
    17	    public readonly entry: string,
    18	  ) {
    19	    super(`capability store rejected: ${kind} (${entry})`);
    20	    this.name = "CapabilityStoreError";
    21	  }
    22	}
    23
    24	function validatePath(path: string, repositoryRoot: string, worktree: string): void {
    25	  try {
    26	    if (validateStorageRoot(path, repositoryRoot, worktree).ok) return;
    27	  } catch {
    28	    // Filesystem failures have the same content-free invalid-root boundary.
    29	  }
    30	  throw new CapabilityStoreError("invalid_root", basename(path));
    31	}
    32
    33	export function writeCapabilityRecord(
    34	  root: string,
    35	  repositoryRoot: string,
    36	  worktree: string,
    37	  record: CapabilityRecordV1,
    38	): string {
    39	  const parsed = parseCapabilityRecord(record as unknown as Record<string, unknown>);
    40	  const directory = join(root, "capability", parsed.surface);
    41	  validatePath(root, repositoryRoot, worktree);
    42	  validatePath(directory, repositoryRoot, worktree);
    43	  try {
    44	    mkdirSync(directory, { recursive: true, mode: 0o700 });
    45	  } catch {
    46	    throw new CapabilityStoreError("invalid_root", basename(directory));
    47	  }
    48	  validatePath(root, repositoryRoot, worktree);
    49	  validatePath(directory, repositoryRoot, worktree);
    50	  const entry = capabilityRecordFilename(parsed);
    51	  const file = join(directory, entry);
    52	  try {
    53	    writeFileSync(file, `${JSON.stringify(parsed)}\n`, { flag: "wx", mode: 0o600 });
    54	  } catch (error) {
    55	    throw new CapabilityStoreError((error as NodeJS.ErrnoException).code === "EEXIST" ? "exists" : "invalid_root", entry);
    56	  }
    57	  return file;
    58	}
    59
    60	export function readCapabilityRecords(
    61	  root: string,
    62	  repositoryRoot: string,
    63	  worktree: string,
    64	  surface: SurfaceId,
    65	): ReadonlyArray<CapabilityRecordV1> {
    66	  const parsedSurface = parseSurfaceId(surface);
    67	  const directory = join(root, "capability", parsedSurface);
    68	  validatePath(root, repositoryRoot, worktree);
    69	  validatePath(directory, repositoryRoot, worktree);
    70	  let entries: string[];
    71	  try {
    72	    entries = readdirSync(directory);
    73	  } catch (error) {
    74	    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    75	    throw new CapabilityStoreError("invalid_root", basename(directory));
    76	  }
    77	  const records: { entry: string; record: CapabilityRecordV1 }[] = [];
    78	  for (const entry of entries) {
    79	    const match = /^((?:\d{4}|[+-]\d{6})-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)-[0-9a-f]{12}\.json$/.exec(entry);
    80	    const timestamp = match?.[1];
    81	    const ms = timestamp === undefined ? NaN : Date.parse(timestamp);
    82	    if (!Number.isFinite(ms) || new Date(ms).toISOString() !== timestamp) {
    83	      throw new CapabilityStoreError("unsafe_entry", entry);
    84	    }
    85	    let fd: number;
    86	    try {
    87	      // No symlink following or FIFO blocking between enumeration and inspection.
    88	      fd = openSync(join(directory, entry), constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
    89	    } catch {
    90	      throw new CapabilityStoreError("unsafe_entry", entry);
    91	    }
    92	    let content: string;
    93	    try {
    94	      if (!fstatSync(fd).isFile()) throw new CapabilityStoreError("unsafe_entry", entry);
    95	      content = readFileSync(fd, "utf8");
    96	    } catch {
    97	      throw new CapabilityStoreError("unsafe_entry", entry);
    98	    } finally {
    99	      closeSync(fd);
   100	    }
   101	    let record: CapabilityRecordV1;
   102	    try {
   103	      record = parseCapabilityRecord(JSON.parse(content));
   104	    } catch {
   105	      throw new CapabilityStoreError("malformed_record", entry);
   106	    }
   107	    if (record.surface !== parsedSurface) throw new CapabilityStoreError("surface_mismatch", entry);
   108	    if (capabilityRecordFilename(record) !== entry) throw new CapabilityStoreError("filename_mismatch", entry);
   109	    records.push({ entry, record });
   110	  }
   111	  records.sort((a, b) => Date.parse(b.record.evaluated_at) - Date.parse(a.record.evaluated_at)
   112	    || (a.entry < b.entry ? 1 : a.entry > b.entry ? -1 : 0));
   113	  return records.map(({ record }) => record);
   114	}
   115
   116	export function latestFreshRecord(
   117	  root: string,
   118	  repositoryRoot: string,
   119	  worktree: string,
   120	  surface: SurfaceId,
   121	  now: string,
   122	  observed: ObservedSurfaceFacts,
   123	): CapabilityRecordV1 | null {
   124	  const latest = readCapabilityRecords(root, repositoryRoot, worktree, surface)[0];
   125	  if (latest === undefined) return null;
   126	  return evaluateCapabilityFreshness(latest, now, observed).fresh ? latest : null;
   127	}
~~~~~~~~

Export lines at the binding base:

~~~~~~~~
HEAD:packages/protocol/src/index.ts:65:} from "./capability-record";
HEAD:packages/protocol/src/index.ts:74:} from "./capability-record";
HEAD:packages/storage/src/index.ts:18:} from "./capability-store";
~~~~~~~~

Direct callers:

~~~~~~~~
HEAD:packages/supervisor/src/preflight.ts:7:  type AdapterRegistrationV1, type CapabilityRecordV1, type ObservedSurfaceFacts,
HEAD:packages/supervisor/src/preflight.ts:11:import { latestFreshRecord, proposeStorageRoot, validateStorageRoot } from "@madventures/storage";
HEAD:packages/supervisor/src/preflight.ts:29:  observedHostFacts: Readonly<Partial<Record<SurfaceId, ObservedSurfaceFacts>>>;
HEAD:packages/supervisor/src/preflight.ts:56:  freshRecord: typeof latestFreshRecord;
HEAD:packages/supervisor/src/preflight.ts:60:  buildEnvironment: buildAllowlistedEnvironment, probe: runBoundedProbe, freshRecord: latestFreshRecord,
HEAD:packages/supervisor/src/preflight.ts:210:      const record: CapabilityRecordV1 | null = d.freshRecord(storageRoot, repo.root, repo.worktree, execution.surface, input.now, observed!);
HEAD:packages/supervisor/test/build-rollback.test.ts:9:  parseCapabilityRecord,
HEAD:packages/supervisor/test/build-rollback.test.ts:17:import { writeCapabilityRecord } from "@madventures/storage";
HEAD:packages/supervisor/test/build-rollback.test.ts:858:  const record = parseCapabilityRecord({
HEAD:packages/supervisor/test/build-rollback.test.ts:875:  const path = writeCapabilityRecord(f.plan.storageRoot, f.envelope.repository, f.envelope.worktree, record);
HEAD:test/phase3a/evidence-pipeline.test.ts:12:  capabilityRecordFilename,
HEAD:test/phase3a/evidence-pipeline.test.ts:13:  evaluateCapabilityFreshness,
HEAD:test/phase3a/evidence-pipeline.test.ts:15:  parseCapabilityRecord,
HEAD:test/phase3a/evidence-pipeline.test.ts:235:  const record = parseCapabilityRecord(raw);
HEAD:test/phase3a/evidence-pipeline.test.ts:286:    evaluateCapabilityFreshness(record, record.evaluated_at, {
HEAD:test/phase3a/evidence-pipeline.test.ts:300:  const record = parseCapabilityRecord(JSON.parse(blockBytes) as Record<string, unknown>);
HEAD:test/phase3a/evidence-pipeline.test.ts:308:  expect(recordedFilename).toBe(capabilityRecordFilename(record));
HEAD:test/phase3a/evidence-pipeline.test.ts:412:  const record = parseCapabilityRecord(JSON.parse(blocks[0]!) as Record<string, unknown>);
HEAD:test/phase3a/evidence-pipeline.test.ts:795:    const record = parseCapabilityRecord(JSON.parse(block));
HEAD:test/phase3a/evidence-pipeline.test.ts:802:    expect(section.recordedFilename).toBe(capabilityRecordFilename(record));
HEAD:test/phase3a/evidence-pipeline.test.ts:886:      latestFreshRecord: () => { calls.push("record"); return record; } },
HEAD:test/phase3a/evidence-pipeline.test.ts:923:    const names = new Set(["readCapabilityRecords", "latestFreshRecord"]);
HEAD:test/phase3a/evidence-pipeline.test.ts:935:  expect([...callers].sort()).toEqual(["packages/storage/src/capability-store.ts", "packages/supervisor/src/preflight.ts"]);
HEAD:test/phase3a/fixture-adapters.ts:5:import type { AdapterRegistrationV1, CapabilityRecordV1 } from "@madventures/protocol";
HEAD:test/phase3a/fixture-adapters.ts:63:): CapabilityRecordV1 {
~~~~~~~~

Indirect fixture caller:

~~~~~~~~
HEAD:test/phase3a/runtime-harness.ts:23:import { fixtureCapabilityRecord, fixtureExecutableSource } from "./fixture-adapters";
HEAD:test/phase3a/runtime-harness.ts:422:      return [execution.surface, fixtureCapabilityRecord(registration, execution.model, path, hash(readFileSync(path)), now)];
~~~~~~~~

Reports: SHA-256 values and recorded macOS record lines:

~~~~~~~~
docs/verification/2026-08-12-surface-investigation-claude-code.md
c4262667e234ac0e69c7c46a0fafd82b44fa10e475ee6d9a1414a04be944ef4b  -
2169: ## Capability record
2170:
2171: - **Stored record path:** `/Users/michaeldaley/Library/Application Support/MADVentures/madventures-tui/capability/claude-code/2026-11-04T01:05:48.052Z-6cb4ba922516.json`
2172: - **Stored record filename:** `2026-11-04T01:05:48.052Z-6cb4ba922516.json`
2173: - **Stored record SHA-256:** `ea79da9420c08ad9a4286d1aa2b5a590a869c96d2a23074466495157cdf449c0`
2174:
2175: ```json
2176: {"surface":"claude-code","provider":"anthropic","requested_model":"claude-fable-5-1","role_eligibility":["builder","independent-reviewer"],"independence_domain":"anthropic","organization_id":"anthropic","cli_version":"2.1.314","binary_path":"/Users/michaeldaley/.local/bin/madbridge-claude-v5","binary_sha256":"6cb4ba9225161ffe303dd42f40d796752c200135a171052cbfa0a8934cc1cbb4","evaluated_at":"2026-11-04T01:05:48.052Z","expires_at":"2026-12-04T01:05:48.052Z","host":{"arch":"arm64","macos_version":"27.0.1","macos_build":"26A434","bun_version":"1.4.2","bun_path":"/Users/michaeldaley/.bun/bin/bun","bun_sha256":"35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5","term":"xterm-256color","shell":"/bin/zsh"},"identity_attestation":{"result":"pass","primitive":"madbridge-claude-v5 --print --input-format stream-json --output-format stream-json --verbose --no-session-persistence --model claude-fable-5-1","sanitized_facts":"Clause 1, \"a documented CLI or API primitive returning the resolved provider and exact model for the actual session\": not established by the help in items 6 and 7; neither documents a same-session resolved-identity query. Item 8 is a separate auth process and supplies no session identity evidence. Clause 2, \"structured per-session or per-response metadata naming the provider and exact model actually used\": met. Item 10 result.modelUsage[\"claude-fable-5-1\"] reports canonicalModel \"claude-fable-5-1\", provider \"firstParty\", and positive outputTokens; its assistant message.model is \"claude-fable-5-1\". Item 11 requests alias \"fable\" but reports canonicalModel and assistant message.model \"claude-fable-5-1\", so the exact ID is not merely an echo of the flag. Items 9 and 12 report canonicalModel \"claude-sonnet-5-5\" without a requested model. The observed provider label is \"firstParty\"; provider \"anthropic\" in this record is copied from the registration as B6 item 1 requires, not substituted for that emitted label. Item 13 demonstrates why initialization alone is insufficient: system/init.model is \"claude-fable-5-1\", but system/model_refusal_fallback names \"claude-opus-4-8\", the assistant message.model is \"claude-opus-4-8\", and result.modelUsage reports both canonical IDs and provider \"firstParty\". This substitution is a limitation, not evidence that Fable produced the final response. No configured model, flag, banner, assistant prose, registration value or separate process is used as passing evidence."},"auth_readiness":{"result":"pass","primitive":"madbridge-claude-v5 auth status"},"pty":{"result":"fail","observed_ms":{}},"independent_review_eligible":true,"limitations":["no governed session of the real binary ran because spec section 4.2 keeps production start closed in Phase 3A; PTY, process-group, termination and timing results are not established","observed CLI version 2.1.314 is not in supported_versions [2.1.296]; the registration is unchanged and fresh preflight rejects the unsupported version","binary_sha256 pins the POSIX shell launcher, not the program it starts; R is not a Mach-O executable","item 13 automatically substituted claude-opus-4-8 after a refusal despite requesting claude-fable-5-1; system/init alone does not attest the final response model and a live session must reject substitution","item 11 emitted an incomplete Bash invocation as assistant text, withheld by a safety classifier; no structured tool call or tool result occurred","identity passing evidence uses the emitted provider label firstParty, without interpreting registration metadata or auth status as session evidence","this dated passing record authorizes no live execution, does not certify the configured surface, and cannot override fresh preflight or the Phase 3A production gate"],"overall":"pass","redaction_rules_applied":["email-addresses","json-account-identifiers","token-patterns"]}
2177: ```
2178:
2179: ## 8. Provenance, expiration and halt audit
2180:
2181: The record was built at `2026-11-04T01:05:48.052Z` and expires at
2182: `2026-12-04T01:05:48.052Z`, exactly 30 continuous days later under PLAN-OPEN-3.
2183: It parsed before the Founder approved the write, then was written once using
2184: `writeCapabilityRecord` and the default root proposed with an empty environment
2185: argument, with no MADV_STORAGE_DIR override. The root derives from the passwd
2186: home; the store creates the surface directory mode 0700 and record mode 0600.
2187: The canonical JSON block above, followed by its final newline, is byte-for-byte
2188: the stored file. There was no retry of that write.
2189:
2190: B12 audit after the second run: only the two C1 paths change; L/R/hash/version
2191: match before and after and match the pre-check; every init in items 9–11
2192: reports 2.1.314; no output establishes a shell command run, a prohibited file
2193: write, sign-in/out, install/update or configuration change; only B4 ran L;
2194: the three redaction rules sufficed; parser and store accepted the record;
2195: baseline tests passed; no builder MCP server loaded; runtime and base match.
2196: Under Addendum 1 B6, items 9–11 have dontAsk, empty tools, MCP servers and
2197: plugins, and items 9–13 have no structured tool call or result. Item 11's
2198: incomplete Bash invocation is text in an assistant message; the subsequent
2199: synthetic safety notice says unfinished calls did not run. No tool dispatch
2200: or result event exists. This is reported as a limitation, not as a shell run.
2201: Item 13's model substitution is recorded in full and is not a listed halt.
2202:
2203: First-run captures are excluded from the record, verdict and command captures
2204: above. The first-run historical section uses only the facts of the signed
2205: addendum. No configuration, adapter, supported version, rubric or production
2206: path changed. No real governed session, live certification, TUI connection,
2207: Task 58/59, GitHub operation, push or merge was performed by the builder.
2208:
2209: ## 9. Second runner provenance
2210:
2211: Runner SHA-256: `3c066859d348ce36c4094a6ce626066f255195a71c5a7114505d71812d849b04`.
2212: Runner log SHA-256: `19da71e7a3898419cdbd8b706bcdb0458beb899a87f548a86fd5cee453829b41`.
2213: The runner was shown in full before Founder approval. It differs from the
2214: first runner only in paths for the new working directory, capture files,
2215: exclusive marker and results file. Its source remains in the scratch root as
2216: `runner-2.ts`; the exact argument vectors, stdin and environment it used are
2217: reproduced above, together with every captured output byte.
docs/verification/2026-08-12-antigravity-surface-investigation.md
843ec841002370d033947ac45c1b2891da12ff059fea706732eda02a4f5c4d2c  -
2211: ## Capability record
2212:
2213: - **Stored record path:** `/Users/michaeldaley/Library/Application Support/MADVentures/madventures-tui/capability/antigravity/2026-10-16T20:43:50.078Z-a4502aaf310b.json`
2214: - **Stored record filename:** `2026-10-16T20:43:50.078Z-a4502aaf310b.json`
2215: - **Stored record SHA-256:** `0b7e9d47a31d4e9439ad1846f949f57518defcebfe3ef6ab0dbbfa98673ee983`
2216:
2217: ```json
2218: {"surface":"antigravity","provider":"google","requested_model":"gemini-4-argon-high","role_eligibility":[],"independence_domain":"google","organization_id":"google","cli_version":"1.4.0","binary_path":"/Users/michaeldaley/.local/bin/agy","binary_sha256":"a4502aaf310b2fd6eb657fcfec2fcc31a690fbbd0c2d14c8eefbb556409024ce","evaluated_at":"2026-10-16T20:43:50.078Z","expires_at":"2026-11-15T20:43:50.078Z","host":{"arch":"arm64","macos_version":"27.0.1","macos_build":"26A434","bun_version":"1.4.2","bun_path":"/Users/michaeldaley/.bun/bin/bun","bun_sha256":"35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5","term":"dumb","shell":"/bin/zsh"},"identity_attestation":{"result":"fail","primitive":"agy config get model","sanitized_facts":"Spec section 2.2 requires either a documented CLI or API primitive returning the resolved provider and exact model for the actual session, or structured per-session or per-response metadata naming the provider and exact model actually used. Neither clause is met on agy 1.4.0: 'agy config get model' exits with code 2 ('Error: unexpected argument \"config\".'); '--output-format json' (with and without '--model gemini-4-argon-high') emits only conversation_id, status, response, duration_seconds, num_turns and usage with no provider or model field; and '--output-format stream-json' omits init.model when '--model' is not supplied and includes init.model when '--model gemini-4-argon-high' is supplied while omitting provider in all cases and omitting both provider and model from step_update and result events (whether init.model is a flag echo or a conditionally emitted resolved model cannot be proven from CLI output alone and fails spec section 2.2 either way)."},"auth_readiness":{"result":"no_primitive","primitive":null},"pty":{"result":"fail","observed_ms":{}},"independent_review_eligible":false,"limitations":["configuration-only identity evidence — no actual-session identity primitive exists","no documented non-mutating non-interactive auth-readiness primitive","no governed session of the real binary ran, because spec section 9.13 forbids a live session of a surface without a verified identity primitive","observed CLI version 1.4.0 differs from ANTIGRAVITY_REGISTRATION.supported_versions [\"1.1.13\"] in packages/protocol/src/adapter-registry.ts","agy config get model exited with status 2 ('Error: unexpected argument \"config\".') because agy 1.4.0 has no config subcommand","stream-json init.model appears when --model is supplied and is absent when --model is omitted, provider is absent in all cases, and whether init.model is a flag echo or a conditionally emitted resolved model cannot be proven from CLI output alone and fails spec section 2.2 either way"],"overall":"fail","redaction_rules_applied":["spec-5.6-token-patterns","spec-5.6-account-identifiers","spec-5.6-email-addresses"]}
2219: ```
~~~~~~~~

The five callers are packages/supervisor/src/preflight.ts, packages/supervisor/test/build-rollback.test.ts, test/phase3a/evidence-pipeline.test.ts, test/phase3a/fixture-adapters.ts and test/phase3a/runtime-harness.ts. There is no difference from the drafting list.

064-baseline-install.log; SHA-256 8f3c328b6f67f21bf191c79c22f39035f59bde3faa086cf12ebab6b32b027f79

~~~~~~~~
COMMAND: bun install --frozen-lockfile
12:12  up 18 days,  4:21, 5 users, load averages: 6.49 7.24 7.10
bun install v1.4.2 (744846f84)
51 packages installed [132.00ms]
EXIT STATUS: 0
~~~~~~~~

070-baseline-typecheck.log; SHA-256 925490acacd672184296b733d5126b231a4073e290f39678f3c67d6a54730930

~~~~~~~~
COMMAND: bunx tsc --noEmit
12:16  up 18 days,  4:25, 5 users, load averages: 5.64 6.29 6.70
EXIT STATUS: 0
~~~~~~~~

071-baseline-protocol.log; SHA-256 47950136587d0bbbc499f0fee61cdb22f2f879868300e87aed815bd8f720d1c4

~~~~~~~~
COMMAND: bun test packages/protocol
12:17  up 18 days,  4:26, 4 users, load averages: 6.76 6.52 6.77
 149 pass
 0 fail
 1551 expect() calls
Ran 149 tests across 11 files. [38.00ms]
EXIT STATUS: 0
~~~~~~~~

072-baseline-storage.log; SHA-256 14ea0237cd12fed7bb74aab6e659f1c3581516b71c86cd299f40e4cb5978be6c

~~~~~~~~
COMMAND: bun test packages/storage
12:53  up 18 days,  5:02, 4 users, load averages: 8.25 5.47 5.16
 30 pass
 0 fail
 233 expect() calls
Ran 30 tests across 4 files. [45.00ms]
EXIT STATUS: 0
~~~~~~~~

073-baseline-evidence.log; SHA-256 7fcd1f5c960ae92bac36be99adccd406807b56fefcd6b3221cb3cf5e24411606

~~~~~~~~
COMMAND: bun test test/phase3a/evidence-pipeline.test.ts
12:54  up 18 days,  5:03, 4 users, load averages: 6.72 5.40 5.15
 36 pass
 0 fail
 6169 expect() calls
Ran 36 tests across 1 file. [6.47s]
EXIT STATUS: 0
~~~~~~~~

075-baseline-full.log; SHA-256 b112cf822442b42c838a61a4591a5e2e3462b993ed388821cae6c7368c45a13f

~~~~~~~~
COMMAND: bun test
12:56  up 18 days,  5:05, 4 users, load averages: 7.28 5.95 5.38
 1914 pass
 0 fail
 23889 expect() calls
Ran 1914 tests across 140 files. [186.31s]
EXIT STATUS: 0
~~~~~~~~

## Stops, signed resumptions and opening deviations

The first halt preceded every repository edit and commit. It identified
the incompatible requirement for empty path status while restoring an
uncommitted H2 version before its feature commit. Its report is
pr/h2-halt-report.md, SHA-256
8fabb6b5a2f4c95b46cc9315dbc4d56e84ea5f82e0baf7b4ddb4c3bdce4522dd;
its manifest is pr/h2-halt-log-manifest.sha256, SHA-256
5515fa6bb7ce6f138a8dc222f26d38a261e9e2067af7e70ca6e73b7cc53b0208.
They remain unchanged and are not deliverables. Log 086 records that halt.

The Founder upheld the halt and corrected the break-restoration proof in
prompt/resume-h2-1-break-restore.md, SHA-256
4c5e03d21b743769334af175f4e400c9ee2d93bc7ebb2c0a368a5bc73b08b4ed.
Its root-directory manifest check failed at log 087, producing the second
stop without a repository edit or commit. The Founder upheld that stop
and corrected the checksum folder in
prompt/resume-h2-2-checksum-folder.md, SHA-256
88c0afdeb42dfb522e7e874c2eb4fc44504ceac5e7da522596d40b2b4b0b3863.
The builder prompt's SHA-256 is
ebcbfe9c313d5778721e3c90fe66f78f3faeac1e321419dd7e558969ae4b58be.
Logs 088 through 099 pass all resume checks, including all 85 manifest
entries and the runtime. Neither stop repeats the baseline.

The three original deviations remain disclosed: the first version command
was not piped to tee and was repeated with identical output in log 007;
initial logs-directory emptiness was not checked before writing logs;
and the first prompt checksum attempt used the wrong directory, then
passed after correction (046 and 047). No code/test self-fix occurred
before this opening.

The corrected break procedure copies the production file before each
break into the disposable directory and logs the copy's SHA-256 and path
status. git diff --no-index shows the deliberate change and exits 1.
The targeted test file of the commit in progress runs alone and fails
for its named reason. Copy-back then proves matching SHA-256, silent
cmp exit 0, and precisely the same porcelain path status as before the
break. No feature commit precedes its breaks.

## Task-level detail under B8: R1 through R8

R1. In capability-record.ts, add MacOSCapabilityHostV1 and
LinuxCapabilityHostV1 types. The macOS type has its original eight keys;
the Linux host has exactly os_name, os_version, kernel_release,
reported_model and adapter_registration. Opposite-host keys may be typed
as optional never for existing TypeScript consumers, but are never
serialized or accepted by the closed parser. Operating-system name and
version map to host.os_name and host.os_version; kernel release to
host.kernel_release; executable SHA-256 and version reuse binary_sha256
and cli_version; model actually reported maps to host.reported_model,
distinct from requested_model; observation time and zone reuse evaluated_at
in canonical UTC with Z; adapter registration maps to
host.adapter_registration, required to equal the record surface's registry
key, with existing provider/domain/organization cross-checks preserved.
No executable/time duplicates or runtime host facts are added. expires_at
retains exactly 30 continuous days. parseCapabilityRecord keeps its single
per-call defensive rejection boundary and frozen-copy behavior.

R2. The old HOST_FIELDS and macOS parser construction, field order,
freshness comparisons and filename format remain intact. A closed Linux
field set is selected from the input's own host keys, never the running
host. Any mixture, including any macOS key with undefined or null on a
Linux record, fails closed. The pre-act Antigravity record is taken byte
for byte from its report, SHA-256
843ec841002370d033947ac45c1b2891da12ff059fea706732eda02a4f5c4d2c.

R3. evaluateCapabilityFreshness retains its order: invalid now rejection,
binary_hash_changed, cli_version_changed, host_changed, horizon_expired.
Linux OS name, OS version and kernel release each produce host_changed;
executable SHA-256 produces binary_hash_changed. A cross-OS comparison
produces host_changed when hash and CLI version match. Linux CLI drift
and the exact expiry instant remain stale. Linux model/registration are
recorded facts, not extra freshness predicates. macOS's original eight
host comparisons remain unchanged.

R4. writeCapabilityRecord remains exclusive creation with wx; no overwrite,
rename or removal is introduced. Linux capabilityRecordFilename includes
the full executable SHA-256 and a deterministic SHA-256 of the three Linux
host identity fields, so equal-time observations for distinct hosts and
binary hashes can coexist. macOS filenames remain unchanged.
readCapabilityRecords accepts both canonical formats, keeps validation
and descending timestamp/filename order, and retains every record.
latestFreshRecord defaults to host/surface/full-binary selection for Linux.
For an explicit host-scoped query on either host, add the optional
CapabilitySelectionOptions with by_host: true. Choose the newest matching
tuple first, then evaluate freshness, without falling back to an older
record for CLI drift or expiry. With its existing arguments on a macOS
store, latestFreshRecord keeps the original latest-surface-only behavior:
a newer different-binary record still makes a query for an older binary
return null. Existing tests expressly pin that refusal. The newly added
by_host option can return the older matching tuple; this new invocation
case is proved explicitly without changing the old assertion. No existing
caller changes, and no new runtime export is needed.

R5. Add only export statements or names within existing export statements
for the two protocol host types and the storage selection-options type.
No other index line changes. The signed first resume defines export lines
to include names added inside an existing relevant export statement.

R6. capability-record.ts remains pure, with caller-supplied now and only
deterministic input computation. A local pure canonical SHA-256 helper may
derive the Linux host filename identity. No I/O, ambient clock, environment,
process.platform or node:os is introduced. The store branches on supplied
record/observed fields only. No platform-specific installation input needs
a branch, and no closed design section 1.5 branch is added.

R7. Add only two named test files, preserving every existing test and
assertion: packages/protocol/test/linux-capability-record.test.ts and
packages/storage/test/linux-capability-store.test.ts. Tests are written
before the production change. All writes are fixtures inside temporary
directories created and removed by their own tests. The historical record
is static prerecorded evidence used as a fixture, never a fresh host
observation. Required tests and breaks are enumerated below.

R8. Offline only. No live provider call, no capability record written by
a builder command, no record outside a test's temporary directory, and
no observation of this host for a capability record. The MacBook runs no
Linux branch. Founder runs on both certification hosts and the session
record check follow the push and are recorded in the PR and review.

### Planned protocol tests (one test per named claim)

- Linux host fields are exactly B5 facts and parsed records are frozen.
- Linux operating-system name mismatch is stale.
- Linux operating-system version mismatch is stale.
- Linux kernel release mismatch is stale.
- Linux executable SHA-256 mismatch is stale.
- Linux executable version mismatch is stale.
- Linux freshness expires at the exact 30-day horizon.
- macOS records are stale against Linux observed facts.
- Linux records are stale against macOS observed facts.
- mixed macOS and Linux host fields are rejected.
- Linux records reject every macOS host field with any value.
- Linux host fields reject missing, empty and non-string values.
- Linux adapter registration must match the record's registered surface.
- Linux reported model is recorded independently of the requested model.
- Linux filenames distinguish hosts without changing macOS filenames.
- the pre-act Antigravity macOS record retains parsing freshness and filename.
- capability record production reads no running host or ambient clock.

### Planned storage tests (one test per named claim)

- Linux selection refuses an operating-system name mismatch.
- Linux selection refuses an operating-system version mismatch.
- Linux selection refuses a kernel release mismatch.
- Linux selection refuses an executable SHA-256 mismatch.
- superseded Linux records remain byte for byte and newer is selected.
- pre-act macOS bytes read back unchanged with original filename and freshness.
- Linux selection is scoped to host surface and full executable hash.
- a newer Linux CLI mismatch does not fall back to a superseded record.
- Linux selection refuses records at their horizon and on CLI version drift.
- store selection refuses records of the other operating system.
- mixed and macOS-bearing Linux records are rejected before store creation.
- macOS default refusal is preserved while explicit host selection isolates records.
- existing macOS stores retain bytes filenames and descending read order.

The four Linux mismatch tests in each file prove R7 a and B5 refusal.
The superseded test proves R7 b and B5 retention. The two historical tests
prove R7 c and B5 macOS compatibility. The closed-shape tests prove R7 d;
CLI/horizon tests prove R7 e; cross-OS tests prove R7 f. The remaining
tests cover R1, R2, R4 and R6 and the constraints those requirements add.

### Planned six deliberate breaks

In the protocol commit in progress, bypass one Linux host comparison at a
time for os_name, os_version and kernel_release; bypass the binary comparison
for Linux alone; and corrupt the parsed macOS build field to make the
historical macOS byte/parse test fail. Run only linux-capability-record.test.ts
for each break. Restore and prove equality after each. These are the four
R7 a breaks and the R7 c break.

In the storage commit in progress, change exclusive creation from wx to w.
The superseded-record test attempts a changed duplicate write after adding
the newer record and requires collision rejection plus unchanged bytes.
Run only linux-capability-store.test.ts, then restore and prove equality.
This is the R7 b break. All deliberate writes remain inside test-owned
temporary directories, including under the break.

### Commit and gate order

This opening is commit 1 alone, parent the binding base. Protocol tests,
production, type exports, five breaks and bun test packages/protocol form
commit 2. Storage tests, production, type export, retention break and
bun test packages/storage form commit 3. Then the prescribed runtime,
typecheck, protocol, storage, evidence pipeline, Phase 3A, runtime and bare
full-suite gates run once each in order. The floor arithmetic uses actual
Ran counts: full-suite increase equals protocol increase plus storage
increase; file increase equals the two added test files. Completion appends
below this opening without changing its lines and forms commit 4 alone.
The final six git gates run after that commit with global/system config
disabled and are recorded in the final report and saved PR description.

## Opening evidence inventory

All quoted lines above have trailing spaces and tabs removed. No quoted
diff exists at opening. Raw logs are retained unchanged. Every completed
command through log 101 is listed below with its own uptime, exit status
and full log SHA-256. Long authority/read commands are identified by their
log; their exact command remains its first line.

| Log | Uptime immediately before command | Exit | SHA-256 |

| --- | --- | --- | --- |

| 001-pwd.log | 11:39  5 users, load averages: 4.96 6.31 6.52 | 0 | 618875bbaa725667090cf47936f45b5720a1fcf4b4f70d677312a83256c431d8 |

| 002-branch.log | 11:39  5 users, load averages: 4.96 6.31 6.52 | 0 | febfe1678e1ac33c3095361997d7f6e740232551724871b9a93503b1eb972831 |

| 003-head.log | 11:39  5 users, load averages: 4.96 6.31 6.52 | 0 | d25fd4c53dfce9fae7070cc56130cc1dd975fe7836c140af647fed2a3d057839 |

| 004-git-name.log | 11:39  5 users, load averages: 4.96 6.31 6.52 | 0 | 4a78ac7a54b2de00042c902c1756c411e1ef49a54f2bd20d28017dc109de8495 |

| 005-git-email.log | 11:39  5 users, load averages: 4.96 6.31 6.52 | 0 | c6c43cf6a6b4e0903f50f34e618c184186bd79e1f1278d32912a50c8922b14b2 |

| 006-runtime-initial.log | 11:53  up 18 days,  4:02, 5 users, load averages: 5.48 7.27 7.23 | 0 | b84aa44704b348c491dee1cab78d55b46063434cf937c3958a000234730f802f |

| 007-version-logged.log | 11:53  5 users, load averages: 5.76 7.18 7.20 | 0 | 2b968533ea23b82476e8da42ba1bde3ea0dcab6acc8ecaf25e4409576b6b065e |

| 008-agents.log | 11:53  5 users, load averages: 5.76 7.18 7.20 | 0 | bd457ea8d855001a9848ca98fba30f925ac6c61a58c0729713488a3313e5bf86 |

| 009-standing-commission.log | 11:53  5 users, load averages: 5.76 7.18 7.20 | 0 | 0dcbc0459f60fc291fe4b1ea4ab98f81b2788d002b52a8489cba01f69f09fbc6 |

| 010-commission-corrections.log | 11:53  5 users, load averages: 5.76 7.18 7.20 | 0 | 825edc653aa826c25cbdb88790ed512f9bf0eb8c07787d1959312ae2fcc9b561 |

| 011-h2-record.log | 11:53  5 users, load averages: 5.76 7.18 7.20 | 0 | d13f97a2e2eb7fb615eff834fb958b99f3f8844256e4b69a85807a3b01601441 |

| 012-model-record.log | 11:53  5 users, load averages: 5.76 7.18 7.20 | 0 | 37a61adf5080a705a8a28a2998cbbc9ddc2477d03513a7764e8751232251ea56 |

| 013-commission-full.log | 11:53  5 users, load averages: 5.49 7.08 7.16 | 0 | ef1a01128e7ec9168eea2ebc2467ced182ef2aa7224eb4bea7f71de5d69d8e2b |

| 014-harness-addendum.log | 11:53  5 users, load averages: 6.44 7.22 7.21 | 0 | 2b47b542bad908c6c33ede1916245f408ed4c185f6b63a74f7df7cd0121d4ef3 |

| 015-image-addendum.log | 11:53  5 users, load averages: 6.44 7.22 7.21 | 0 | 5df1269329b27b5177d3c0cfd19351b37f4d5e8015b4dbc239986b8b59ae9763 |

| 016-sandbox-addendum.log | 11:53  5 users, load averages: 6.44 7.22 7.21 | 0 | 5bd7e010b59b136a105e2110a41d6e1b74631ed1d6e93abdf9a9d9bbe0a2455d |

| 017-own-work-addendum.log | 11:53  5 users, load averages: 6.44 7.22 7.21 | 0 | bb57c311af6d7829bbd4f74658c64832ef987e59e8f3e8eecee80ff88806ecf4 |

| 018-names-addendum.log | 11:53  5 users, load averages: 6.44 7.22 7.21 | 0 | b9fb895bad8b05c63ddf969333f07f75135b666259dd16c12f5954ae76555fa4 |

| 019-second-verdict.log | 11:54  5 users, load averages: 6.69 7.25 7.22 | 0 | ea112b80ff46f7dfb8d14eeebfdae1cba116c43df9df49405147ba75702a1e51 |

| 020-governed-build.log | 11:54  5 users, load averages: 6.69 7.25 7.22 | 0 | 44cc452f40a2dbe70af2635622cc9f642e3ba599ff180ce588c6938ec65b6c6b |

| 021-qualification.log | 11:54  5 users, load averages: 6.69 7.25 7.22 | 0 | 3433ebcee2009f56aa40bfe8d5c29cb690baa61a5adfc95cf2ecb89c129db78b |

| 022-authority-hashes.log | 11:54  5 users, load averages: 5.04 6.78 7.05 | 0 | 2781859599b3792c496a1062d6a07e2915dd4c417540103458b8341742c69049 |

| 023-main.log | 11:54  5 users, load averages: 5.04 6.78 7.05 | 0 | 948dd95bbfecfead203dd8c45e80025fc1ce1bda2f9284017a097f7e40a2dd7b |

| 024-main-descendant.log | 11:54  5 users, load averages: 5.04 6.78 7.05 | 0 | 36c6b11eb4f487280f62b19deb56ee370acd6b91200e187b40ca21664c29dab6 |

| 025-base-ancestor.log | 11:54  5 users, load averages: 5.04 6.78 7.05 | 0 | d040f01a51c6abe0077697824c8c52ae42556e10727aaa1c7b7b467bcfd527ff |

| 026-main-paths.log | 11:54  5 users, load averages: 5.04 6.78 7.05 | 0 | 29882ce869d2bdeb998f2cf4baa022b4b854764b3ebcfa845791295db0242b19 |

| 027-initial-status.log | 11:54  5 users, load averages: 5.04 6.78 7.05 | 0 | 4f8401522ff4278f60bcf1e4d050234d64722e56396df927b5bdb36791ad48e7 |

| 028-stash.log | 11:54  5 users, load averages: 5.04 6.78 7.05 | 0 | bce7669295d59468f7010953f0f0a0e065740f336f50378fc9ad2176efbda648 |

| 029-prompt-files.log | 11:54  5 users, load averages: 5.04 6.78 7.05 | 0 | b747b0773c51f948e038456d2235a4c0fb21d9676e13df5ef1d7a689058ec783 |

| 030-host.log | 11:54  5 users, load averages: 5.04 6.78 7.05 | 0 | b0695732e8ad0dcdf29874ee42d99069f3204cebc8888f791825b0f89296982a |

| 031-phase-approval.log | 11:54  5 users, load averages: 5.26 6.77 7.05 | 0 | f980d429a5dec53ef1d9d33183ee397d0c87182c3e6285ad149e86c2378c2891 |

| 032-hardening-rules.log | 11:54  5 users, load averages: 5.26 6.77 7.05 | 0 | 436bf1584f08cc67a0d38b683aef0046314e4b129432bb168023872ce2c4ea23 |

| 033-standing-rules.log | 11:54  5 users, load averages: 5.26 6.77 7.05 | 0 | 5ab5d3336ea44f046c7e8141c860f7a240d7fc8a9a6d2584fc69c90247665d8a |

| 034-hardening-full.log | 11:55  5 users, load averages: 4.76 6.61 6.99 | 0 | 257ec4d926f069f68ad1de6dcf97e9dec6d304b09436e857ce454ba7d187827c |

| 035-runtime-ruling.log | 11:55  5 users, load averages: 4.76 6.61 6.99 | 0 | 4ca91c6a1c9dca33855be53e3b07a2f10a2cb78ef7537d375ffcbb41100f6e9a |

| 036-linux-scope.log | 11:55  5 users, load averages: 4.76 6.61 6.99 | 0 | 1f39b8e1a5a0396dc8e2abd49d6daa37ea3922789deb6f53b0be725b22bc99dd |

| 037-hardening-f.log | 11:55  5 users, load averages: 5.10 6.62 6.99 | 0 | d2ba94cb10e868b7e271b6118fc6117ab311d026a8319e4f58a22154d356a6f7 |

| 038-phase3b-plan.log | 11:55  5 users, load averages: 5.10 6.62 6.99 | 0 | dd900b3964676c18b1b81b31153adf44f298bc1c9fac1413e8267d8bcb9ac1af |

| 039-plan-first-half.log | 11:55  5 users, load averages: 5.73 6.73 7.02 | 0 | f1c37146637040eb046bbd4749942cad9a5b50f411f3538784d5ddcdf4bd225c |

| 040-phase3a-design.log | 11:55  5 users, load averages: 6.43 6.84 7.06 | 0 | 44c5ddba47b9d29452ee283428a49bbd80cfa8a7f921fc08298dbdbfa59fa1ab |

| 041-design-middle-a.log | 11:55  5 users, load averages: 5.75 6.68 7.00 | 0 | 6e69c42e29a7bd244936b37748f4231a9624d8d135f1415f39775e9b26991e0e |

| 042-design-middle-b.log | 11:55  5 users, load averages: 5.48 6.59 6.96 | 0 | 14b8d1eb50c213fe9c2cfa01ed8f5fc991fa34cb701d6bc5d75657a944e46f5a |

| 043-design-middle-c.log | 11:55  5 users, load averages: 5.44 6.56 6.95 | 0 | 33b33016c874094829c889caceab7a68db9b62239cba29e4379955dcec0ae34b |

| 044-design-middle-d.log | 11:56  5 users, load averages: 5.17 6.49 6.92 | 0 | b66303e77adc8e8eff6d0e8a3e8ee99b3c83565e3b9bcfd0a74f7798f8150448 |

| 045-design-middle-e.log | 11:56  5 users, load averages: 5.55 6.54 6.94 | 0 | f1cce0fc9ee5bab178c9f23a44bfac357155d1b11c86032c9e5b19d0ca786f6e |

| 046-prompt-check.log | 11:56  5 users, load averages: 5.55 6.54 6.94 | 1 | 7fa8b182189f6c87b7752c41d82016be1d9bfd75ed29f231d3c4f6d13d1876e7 |

| 047-prompt-check-corrected.log | 11:56  5 users, load averages: 4.86 6.34 6.86 | 0 | a3c409a5fee23f2b38bfe32bc73ec101c89ad2d81b72021a4a391337a2b26d1c |

| 048-design-overlap.log | 11:56  5 users, load averages: 4.95 6.33 6.85 | 0 | 2f58b6a5c1047cb3433bc92e33d17d57c6bdb1671b8a167c66e42b3c91cf0a54 |

| 049-record-source.log | 11:56  5 users, load averages: 4.95 6.33 6.85 | 0 | 039b06a9c0b2082863bf56dac2a7da9a89145ac8ca34f05222a86f5ab15b3f66 |

| 050-store-source.log | 11:56  5 users, load averages: 4.95 6.33 6.85 | 0 | b6b8010d4504025e20a47f1101464587e7252a2ed18429e38c4efb9aef416cc8 |

| 051-record-tests.log | 11:56  5 users, load averages: 5.03 6.33 6.85 | 0 | 77ee16767a944e94d7c8de8684aedafa0b97fbff059a0d412d5493a30a0fe6d7 |

| 052-store-tests.log | 11:56  5 users, load averages: 5.03 6.33 6.85 | 0 | 8706792bdffef0cef97b1148de0f099901d30db9c1c3a8a11498404248797b7c |

| 053-index-exports.log | 11:57  5 users, load averages: 4.97 6.07 6.72 | 0 | 66ab501a940879d746434738fb0d183a4003ab328338debaec1a9b9e647de27d |

| 054-callers.log | 11:57  5 users, load averages: 4.97 6.07 6.72 | 0 | 5d8dd4abf235a7ca1e7d0c0af26d10e1b22b090960908a34e61504c8af7e86c9 |

| 055-preflight-blobs.log | 11:57  5 users, load averages: 4.97 6.07 6.72 | 0 | add84ceae2271fcff0dd549470fac37269d3edce5328d773cb4ae1f830b64610 |

| 056-reports.log | 11:57  5 users, load averages: 4.97 6.07 6.72 | 0 | e4f50bbd6696e590c6d29eca9c4630c304908f7bd0882e12f2bbf320215d649a |

| 057-antigravity-report.log | 11:57  5 users, load averages: 4.97 6.07 6.72 | 0 | 4a6fb8b4ffe4b364d3b5f48470257d3ff7ede675e94b8906655c8913610e54a1 |

| 058-record-test-overlap.log | 11:58  5 users, load averages: 6.17 6.23 6.73 | 0 | 75d097a7ea509b4f1cd6f6a0b6201ed14e539449146666afb07b9d6cabcde6f0 |

| 059-runtime-harness-callers.log | 11:58  5 users, load averages: 6.17 6.23 6.73 | 0 | 7d714211f567b9a522955bbf156d3ca31286cfcf0d2d1c42d4e401b17e8338b8 |

| 060-initial-artifacts.log | 11:58  5 users, load averages: 6.17 6.23 6.73 | 0 | 5dbad2d700f2683622afd4682dca00f79d361a764bd956dc25ba9740ff29da80 |

| 061-report-records-and-hashes.log | 11:58  5 users, load averages: 6.17 6.23 6.73 | 0 | c1b93cc4ff1f79d8b37605d8bd4caef926ec213e6c59d0bdfa6cbe508a634530 |

| 062-lock-baseline.log | 11:58  5 users, load averages: 6.48 6.31 6.75 | 0 | 66c3c08f9d4fd14d64aedcbb3e7b827a9aee697f12862812a930e257a8965e3b |

| 063-runtime-before-baseline.log | 12:12  up 18 days,  4:20, 5 users, load averages: 6.37 7.27 7.10 | 0 | 78d875739d054d114d5e158b360f46a604c0913061ddb9b6249a2f5585557352 |

| 064-baseline-install.log | 12:12  up 18 days,  4:21, 5 users, load averages: 6.49 7.24 7.10 | 0 | 8f3c328b6f67f21bf191c79c22f39035f59bde3faa086cf12ebab6b32b027f79 |

| 065-post-install-status.log | 12:12  5 users, load averages: 6.41 7.20 7.08 | 0 | fd6eed8855f75a2a534a4211741ac971ebdf3a95e2b99e70cbd25cfe7319624a |

| 066-post-install-diff.log | 12:12  5 users, load averages: 6.41 7.20 7.08 | 0 | 88c698c4f5f45ca96818e6c0a7bc4d0531412e866eeead5cfb4779f0919314ff |

| 067-post-install-lock.log | 12:12  5 users, load averages: 6.41 7.20 7.08 | 0 | 4e3f890d7b4e8e79bf2542e8cfabb8b18ef500d28258adaaba126f50fc2b1f0b |

| 068-install-mode-restore.log | 12:12  5 users, load averages: 6.22 7.15 7.06 | 0 | 452039f9253b44acc72e6988d6bd682d74e7410d0fcb9a547106ab2d3ecac027 |

| 069-after-mode-restore.log | 12:12  5 users, load averages: 6.22 7.15 7.06 | 0 | 41549198213b75ba44738359cf0e419fa23d9bd4aae3bc71a01c769c705f14ea |

| 070-baseline-typecheck.log | 12:16  up 18 days,  4:25, 5 users, load averages: 5.64 6.29 6.70 | 0 | 925490acacd672184296b733d5126b231a4073e290f39678f3c67d6a54730930 |

| 071-baseline-protocol.log | 12:17  up 18 days,  4:26, 4 users, load averages: 6.76 6.52 6.77 | 0 | 47950136587d0bbbc499f0fee61cdb22f2f879868300e87aed815bd8f720d1c4 |

| 072-baseline-storage.log | 12:53  up 18 days,  5:02, 4 users, load averages: 8.25 5.47 5.16 | 0 | 14ea0237cd12fed7bb74aab6e659f1c3581516b71c86cd299f40e4cb5978be6c |

| 073-baseline-evidence.log | 12:54  up 18 days,  5:03, 4 users, load averages: 6.72 5.40 5.15 | 0 | 7fcd1f5c960ae92bac36be99adccd406807b56fefcd6b3221cb3cf5e24411606 |

| 074-runtime-before-baseline-full.log | 12:55  up 18 days,  5:04, 4 users, load averages: 5.30 5.26 5.11 | 0 | 016b4f3d7775137ac882f8e59a591e84ffc7c39089dc42d37b3d428d2a3760bc |

| 075-baseline-full.log | 12:56  up 18 days,  5:05, 4 users, load averages: 7.28 5.95 5.38 | 0 | b112cf822442b42c838a61a4591a5e2e3462b993ed388821cae6c7368c45a13f |

| 076-scratch-directory.log | 13:00  4 users, load averages: 10.15 7.61 6.15 | 0 | ffc9a1962d8bee2f99ea1e335788dd09e7f41b0268b2cfef5abea3d50b31fdf6 |

| 077-local-instructions.log | 13:00  4 users, load averages: 10.15 7.61 6.15 | 0 | 71b733f01a7361422d12e6afaa1f8dd7fcba26580fa014e23834ce5da708a77b |

| 078-protocol-index.log | 13:00  4 users, load averages: 10.15 7.61 6.15 | 0 | b34604eb28640f0f1fb59868c28bda1a5d2d92ad874d6bc05cc9d7870f555451 |

| 079-storage-index.log | 13:00  4 users, load averages: 10.15 7.61 6.15 | 0 | ac50934f486c29cf052c39ab649791804521c980559a8340c67911893227c41d |

| 080-baseline-final-state.log | 13:00  4 users, load averages: 10.15 7.61 6.15 | 0 | ee78e317aa6646b00bda1259f3d99d75ecb765c7426f4498694587f5af287050 |

| 081-lock-final-baseline.log | 13:00  4 users, load averages: 10.15 7.61 6.15 | 0 | fee34bb1b49b416bf10149a04baed6dad9ac19ad06cff8182815452cb341840b |

| 082-halt-status.log | 13:02  4 users, load averages: 15.13 11.63 8.11 | 0 | f9f653675df01611b00435e79a70ee07e0f91f609d0022973a4b9cc26b79ce13 |

| 083-halt-untracked.log | 13:02  4 users, load averages: 15.13 11.63 8.11 | 0 | 22d9244c9640c6874bcb80b7968c937f2652734cee6ebd3d09ba9f18ede896fc |

| 084-halt-head.log | 13:02  4 users, load averages: 15.13 11.63 8.11 | 0 | c5d6d9b2bef055d50937f6931908db3390c333025ed299279ea2cadc27f923d8 |

| 085-halt-diff.log | 13:02  4 users, load averages: 15.13 11.63 8.11 | 0 | dcc047b40c174382a5ba0931e0c243b9e8dbc345ff43a554222e95f5e73ec38c |

| 086-halt-report.log | 13:04  4 users, load averages: 10.59 11.18 8.30 | 0 | f9025ec3f1610266b7d024ff714e6c41d0d6235584c1fffe1f71ee56f12ec75e |

| 087-resume-prompt-check.log | 13:38  4 users, load averages: 7.97 6.50 6.67 | 1 | d4536d178d913b2fd45e0e6b166659700a4023518e7069e1ff20d4e1581bf242 |

| 088-resume-prompt-check.log | 14:05  4 users, load averages: 12.01 9.53 8.13 | 0 | 767685aa701700a15dff256efbbc297df92012d3e5c2a731a26fa1661a59e0dd |

| 089-resume-prompt-list.log | 14:05  4 users, load averages: 12.01 9.53 8.13 | 0 | 6c7bc526cf45fb0443813c5f77786cd924b08aa1a71a95387de33444620f7298 |

| 090-resume-prompt-hashes.log | 14:05  4 users, load averages: 12.01 9.53 8.13 | 0 | da775d449f9eb42aee9745be16ad28f4b366fc03845374ce0b32320997b38ede |

| 091-resume-version.log | 14:05  4 users, load averages: 11.99 9.61 8.18 | 0 | b6c4f6321173e720f47a2d24690b93028f137f85da6e3fc6f72e8b772e053397 |

| 092-resume-head.log | 14:05  4 users, load averages: 11.99 9.61 8.18 | 0 | 5ec322025167e9505979f05118413060a53a681794cb78c7525857119325ae7c |

| 093-resume-branch.log | 14:05  4 users, load averages: 11.99 9.61 8.18 | 0 | 3f7ba44771e10c1abeda92e248c732d88ae5f002fe8b03a482ce495f2a2f8655 |

| 094-resume-status.log | 14:05  4 users, load averages: 11.99 9.61 8.18 | 0 | 852a173abe2c6f4b7c378422b6c63acb440237b6a9fb2d07af8be605a929fbb0 |

| 095-resume-stash.log | 14:05  4 users, load averages: 11.99 9.61 8.18 | 0 | 66b9d2e8eb3ed067117fffea6d4820c67f58c6305ca8859646fc95066ef11022 |

| 096-resume-pr-list.log | 14:05  4 users, load averages: 11.99 9.61 8.18 | 0 | 7f96ce01bd84abe04ba5d1e9fd7e1af7e8e1bcbd0237f0c7e695b17936583605 |

| 097-resume-halt-hashes.log | 14:05  4 users, load averages: 11.99 9.61 8.18 | 0 | 068188dc7f1e9436153495aa1fc66656f3b25cb61a89c447dea7089aeee8a515 |

| 098-resume-log-check.log | 14:05  4 users, load averages: 11.99 9.61 8.18 | 0 | 54f270537d7d1e3894f659f5311b6493ff626cc1e3b757f49d969d8579ab71cf |

| 099-resume-runtime.log | 14:06  up 18 days,  6:14, 4 users, load averages: 10.77 9.43 8.13 | 0 | 3d5984fcd85a983a2ca2c4d18571da167e416f67c12b486b4e0c9c75d38d5b42 |

| 100-resume-scratch.log | 14:09  4 users, load averages: 9.12 9.25 8.36 | 0 | 9b1b3f5c557033a409399d8664ed07a10b9143c8dda612d2b29d9647f85b1e0d |

| 101-contributing.log | 14:09  4 users, load averages: 9.12 9.25 8.36 | 0 | d9936aefd32c38c5391a3d7669fe735151062962aece75bd5da88804e4d85fad |

006-runtime-initial.log complete runtime output:

~~~~~~~~
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
~~~~~~~~

063-runtime-before-baseline.log complete runtime output:

~~~~~~~~
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
~~~~~~~~

074-runtime-before-baseline-full.log complete runtime output:

~~~~~~~~
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
~~~~~~~~

099-resume-runtime.log complete runtime output:

~~~~~~~~
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
~~~~~~~~
