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

## Completion: implementation and evidence

The opening above is unchanged byte for byte. This completion records
R1-R8 at implementation head b0463c0d239af0e600423e4958721f0b11c25014,
the three implementation-history commits, all six deliberate breaks,
the failed first gate attempt and the one Founder-authorized full repeat.

### Changes by file and function

packages/protocol/src/capability-record.ts adds MacOSCapabilityHostV1 and
LinuxCapabilityHostV1, the Linux closed field set, readLinuxHost and the
input-key selection within readClosed. Linux host keys are exactly
os_name, os_version, kernel_release, reported_model and adapter_registration.
Existing binary_sha256, cli_version and evaluated_at carry executable hash,
executable version and canonical UTC observation time/zone. The registration
reference must equal the record's registered surface key. requested_model
remains distinct from the reported model. Existing registration cross-checks,
defensive parsing and deep freezing remain.

evaluateCapabilityFreshness retains invalid-now validation and the order
binary_hash_changed, cli_version_changed, host_changed, horizon_expired.
Linux OS name/version/kernel mismatches each return host_changed; binary
and CLI drift retain their respective reasons. Linux retains the exact
30-day horizon. Cross-OS facts and missing comparison facts fail closed.
macOS retains all eight original host comparisons and its original shape.

capabilityRecordFilename leaves macOS names unchanged and adds Linux names
with the full binary SHA-256 and a canonical SHA-256 of OS name/version/kernel.
This lets equal-time records for distinct hosts and full hashes coexist.
Only deterministic hashing of supplied data is added; no I/O, ambient clock,
environment or running-host read is added to the pure record module.

packages/storage/src/capability-store.ts extends canonical filename recognition
in readCapabilityRecords without changing its safety checks or descending
timestamp/filename order. matchesObservedHost and CapabilitySelectionOptions
let latestFreshRecord choose the newest host/surface/full-binary tuple,
then evaluate freshness without falling back to an older stale successor.
Linux uses tuple selection by default. Existing macOS calls preserve the
latest-surface-only refusal that an existing assertion pins. The new
explicit by_host option enables tuple selection for macOS too; the new
invocation case is tested. writeCapabilityRecord retains exclusive wx
creation and never overwrites, renames or removes a record.

The two index files each add one type-export statement only. The two new
test files add 18 protocol and 13 storage tests. Both existing capability
test files, every caller, preflight, bun.lock and every manifest remain
unchanged. The only documentation change is this build log.

### Test-to-requirement table

The final column states the DEC-20261108-04 B5 claim each test proves.

| File | Test name | Requirement | B5 claim |

| --- | --- | --- | --- |

| packages/protocol/test/linux-capability-record.test.ts | Linux host fields are exactly B5 facts and parsed records are frozen | R1, R2 | exact host facts and registration |

| packages/protocol/test/linux-capability-record.test.ts | Linux operating-system name mismatch is stale | R3, R7 a | stale Linux record refusal |

| packages/protocol/test/linux-capability-record.test.ts | Linux operating-system version mismatch is stale | R3, R7 a | stale Linux record refusal |

| packages/protocol/test/linux-capability-record.test.ts | Linux kernel release mismatch is stale | R3, R7 a | stale Linux record refusal |

| packages/protocol/test/linux-capability-record.test.ts | Linux executable SHA-256 mismatch is stale | R3, R7 a | stale Linux record refusal |

| packages/protocol/test/linux-capability-record.test.ts | Linux executable version mismatch is stale | R3, R4, R7 e | freshness with preserved section 2.3 checks |

| packages/protocol/test/linux-capability-record.test.ts | Linux freshness expires at the exact 30-day horizon | R3, R4, R7 e | freshness with preserved section 2.3 checks |

| packages/protocol/test/linux-capability-record.test.ts | macOS records are stale against Linux observed facts | R3, R7 f | host mismatch refusal |

| packages/protocol/test/linux-capability-record.test.ts | Linux records are stale against macOS observed facts | R3, R7 f | host mismatch refusal |

| packages/protocol/test/linux-capability-record.test.ts | incomplete observed host facts fail closed for either operating system | R3, R6 | missing host facts fail closed |

| packages/protocol/test/linux-capability-record.test.ts | mixed macOS and Linux host fields are rejected | R2, R7 d | closed host shapes |

| packages/protocol/test/linux-capability-record.test.ts | Linux records reject every macOS host field with any value | R2, R7 d | closed host shapes |

| packages/protocol/test/linux-capability-record.test.ts | Linux host fields reject missing, empty and non-string values | R1, R2 | exact host facts and registration |

| packages/protocol/test/linux-capability-record.test.ts | Linux adapter registration must match the record's registered surface | R1, R2 | exact host facts and registration |

| packages/protocol/test/linux-capability-record.test.ts | Linux reported model is recorded independently of the requested model | R1, R2 | exact host facts and registration |

| packages/protocol/test/linux-capability-record.test.ts | Linux filenames distinguish hosts without changing macOS filenames | R2, R4 | tuple selection and macOS compatibility |

| packages/protocol/test/linux-capability-record.test.ts | the pre-act Antigravity macOS record retains parsing freshness and filename | R2, R4, R7 c | pre-act macOS compatibility |

| packages/protocol/test/linux-capability-record.test.ts | capability record production reads no running host or ambient clock | R6, R8 | pure record without host observation |

| packages/storage/test/linux-capability-store.test.ts | Linux selection refuses an operating-system name mismatch | R3, R7 a | stale Linux record refusal |

| packages/storage/test/linux-capability-store.test.ts | Linux selection refuses an operating-system version mismatch | R3, R7 a | stale Linux record refusal |

| packages/storage/test/linux-capability-store.test.ts | Linux selection refuses a kernel release mismatch | R3, R7 a | stale Linux record refusal |

| packages/storage/test/linux-capability-store.test.ts | Linux selection refuses an executable SHA-256 mismatch | R3, R7 a | stale Linux record refusal |

| packages/storage/test/linux-capability-store.test.ts | superseded Linux records remain byte for byte and newer is selected | R4, R7 b | retained records and exclusive append |

| packages/storage/test/linux-capability-store.test.ts | pre-act macOS bytes read back unchanged with original filename and freshness | R2, R4, R7 c | pre-act macOS compatibility |

| packages/storage/test/linux-capability-store.test.ts | Linux selection is scoped to host surface and full executable hash | R2, R4 | tuple selection and macOS compatibility |

| packages/storage/test/linux-capability-store.test.ts | a newer Linux CLI mismatch does not fall back to a superseded record | R3, R4, R7 e | freshness with preserved section 2.3 checks |

| packages/storage/test/linux-capability-store.test.ts | Linux selection refuses records at their horizon and on CLI version drift | R3, R4, R7 e | freshness with preserved section 2.3 checks |

| packages/storage/test/linux-capability-store.test.ts | store selection refuses records of the other operating system | R3, R7 f | host mismatch refusal |

| packages/storage/test/linux-capability-store.test.ts | mixed and macOS-bearing Linux records are rejected before store creation | R2, R7 d | closed host shapes |

| packages/storage/test/linux-capability-store.test.ts | macOS default refusal is preserved while explicit host selection isolates records | R2, R4 | tuple selection and macOS compatibility |

| packages/storage/test/linux-capability-store.test.ts | existing macOS stores retain bytes filenames and descending read order | R2, R4 | tuple selection and macOS compatibility |

### Deliberate breaks and restored files

All six diffs below are quoted with trailing whitespace removed from each
line; the named raw log is unchanged. Each no-index diff exited 1. Each
targeted file ran alone, and only the named target failed. Before every
break a copy was made and hashed in the disposable directory. Every restore
copied it back, proved equal SHA-256 and silent cmp exit 0, and matched the
exact pre-break porcelain path status.

All five protocol copies restored SHA-256
1beaca6ed23530b7adb7cdd1cd07b44f2a389a236c2b688ed87cee917eba868d.
The later type-only self-fix changed no runtime comparison or parse behavior
that those breaks targeted. The committed protocol source is SHA-256
7638855c01309b1336283800faaad0f001fcc0bf6cc2fc20e9e912eb49a8dd62.
The storage restore and committed source have SHA-256
d81ba19a418daa253a94bbe9d17558abdfa8d44021f879f70dc26bd2a0569778.

OS name:

115-diff-os-name.log; SHA-256 315f65905243babb930e83650f4be19bf4c0f40a5f73f1a042822617fe009ea8

~~~~~~~~
diff --git a/private/tmp/3b-h2-resume-rlms2sz7/os_name-before.ts b/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts
index a3e7b6a..0d0ab27 100644
--- a/private/tmp/3b-h2-resume-rlms2sz7/os_name-before.ts
+++ b/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts
@@ -413,7 +413,7 @@ export function evaluateCapabilityFreshness(
   if (record.host.os_name !== undefined) {
     if (observed.host.os_name === undefined) return stale("host_changed");
     for (const field of LINUX_FRESHNESS_FIELDS) {
-      if (record.host[field] !== observed.host[field]) return stale("host_changed");
+      if (field !== "os_name" && record.host[field] !== observed.host[field]) return stale("host_changed");
     }
   } else {
     if (observed.host.os_name !== undefined) return stale("host_changed");
~~~~~~~~

116-fail-os-name.log; SHA-256 f32ab8de514f5af4a87d32ceb583a64692f4e3df9a43357f2bbedfc1a4955384

~~~~~~~~
bun test v1.4.2 (744846f84)

packages/protocol/test/linux-capability-record.test.ts:
(pass) Linux host fields are exactly B5 facts and parsed records are frozen [0.56ms]
71 | });
72 |
73 | test("Linux operating-system name mismatch is stale", () => {
74 |   const value = record();
75 |   const facts = { ...observed(value), host: { ...linuxHost, os_name: "Debian" } };
76 |   expect(evaluateCapabilityFreshness(value, value.evaluated_at, facts)).toEqual({ fresh: false, reason: "host_changed" });
                                                                             ^
error: expect(received).toEqual(expected)

  {
-   "fresh": false,
-   "reason": "host_changed",
+   "fresh": true,
  }

- Expected  - 2
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/test/linux-capability-record.test.ts:76:73)
(fail) Linux operating-system name mismatch is stale [0.45ms]
(pass) Linux operating-system version mismatch is stale [0.07ms]
(pass) Linux kernel release mismatch is stale [0.04ms]
(pass) Linux executable SHA-256 mismatch is stale [0.04ms]
(pass) Linux executable version mismatch is stale [0.08ms]
(pass) Linux freshness expires at the exact 30-day horizon [0.18ms]
(pass) macOS records are stale against Linux observed facts [0.05ms]
(pass) Linux records are stale against macOS observed facts [0.03ms]
(pass) mixed macOS and Linux host fields are rejected [0.06ms]
(pass) Linux records reject every macOS host field with any value [0.44ms]
(pass) Linux host fields reject missing, empty and non-string values [0.30ms]
(pass) Linux adapter registration must match the record's registered surface [0.07ms]
(pass) Linux reported model is recorded independently of the requested model [0.03ms]
(pass) Linux filenames distinguish hosts without changing macOS filenames [0.42ms]
(pass) the pre-act Antigravity macOS record retains parsing freshness and filename [0.72ms]
(pass) capability record production reads no running host or ambient clock [0.13ms]

 16 pass
 1 fail
 118 expect() calls
Ran 17 tests across 1 file. [20.00ms]
~~~~~~~~

117-restore-os-name.log; SHA-256 84c13666f9ad8ba69f5fdf006b74ab18545e2414f9fc16ec68e6a2071ef45399

~~~~~~~~
1beaca6ed23530b7adb7cdd1cd07b44f2a389a236c2b688ed87cee917eba868d  /private/tmp/3b-h2-resume-rlms2sz7/os_name-before.ts
1beaca6ed23530b7adb7cdd1cd07b44f2a389a236c2b688ed87cee917eba868d  /Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts
COMMAND: cmp saved-copy restored-file
cmp EXIT STATUS: 0
Path status after restore:
 M packages/protocol/src/capability-record.ts
Path status equals its exact pre-break output.
~~~~~~~~

OS version:

119-diff-os-version.log; SHA-256 2b4fa4773861c39a75fb85086948805ac5c57b0d6523478702904d8fbf5df956

~~~~~~~~
diff --git a/private/tmp/3b-h2-resume-rlms2sz7/os_version-before.ts b/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts
index a3e7b6a..d5ee5e0 100644
--- a/private/tmp/3b-h2-resume-rlms2sz7/os_version-before.ts
+++ b/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts
@@ -413,7 +413,7 @@ export function evaluateCapabilityFreshness(
   if (record.host.os_name !== undefined) {
     if (observed.host.os_name === undefined) return stale("host_changed");
     for (const field of LINUX_FRESHNESS_FIELDS) {
-      if (record.host[field] !== observed.host[field]) return stale("host_changed");
+      if (field !== "os_version" && record.host[field] !== observed.host[field]) return stale("host_changed");
     }
   } else {
     if (observed.host.os_name !== undefined) return stale("host_changed");
~~~~~~~~

120-fail-os-version.log; SHA-256 b1d881343da6429c3aa586c7af9a88074309273a86e8b13b7447a4703f1de629

~~~~~~~~
bun test v1.4.2 (744846f84)

packages/protocol/test/linux-capability-record.test.ts:
(pass) Linux host fields are exactly B5 facts and parsed records are frozen [0.79ms]
(pass) Linux operating-system name mismatch is stale [0.20ms]
77 | });
78 |
79 | test("Linux operating-system version mismatch is stale", () => {
80 |   const value = record();
81 |   const facts = { ...observed(value), host: { ...linuxHost, os_version: "26.10" } };
82 |   expect(evaluateCapabilityFreshness(value, value.evaluated_at, facts)).toEqual({ fresh: false, reason: "host_changed" });
                                                                             ^
error: expect(received).toEqual(expected)

  {
-   "fresh": false,
-   "reason": "host_changed",
+   "fresh": true,
  }

- Expected  - 2
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/test/linux-capability-record.test.ts:82:73)
(fail) Linux operating-system version mismatch is stale [0.35ms]
(pass) Linux kernel release mismatch is stale [0.05ms]
(pass) Linux executable SHA-256 mismatch is stale [0.04ms]
(pass) Linux executable version mismatch is stale [0.11ms]
(pass) Linux freshness expires at the exact 30-day horizon [0.19ms]
(pass) macOS records are stale against Linux observed facts [0.11ms]
(pass) Linux records are stale against macOS observed facts [0.04ms]
(pass) mixed macOS and Linux host fields are rejected [0.10ms]
(pass) Linux records reject every macOS host field with any value [0.58ms]
(pass) Linux host fields reject missing, empty and non-string values [0.39ms]
(pass) Linux adapter registration must match the record's registered surface [0.10ms]
(pass) Linux reported model is recorded independently of the requested model [0.04ms]
(pass) Linux filenames distinguish hosts without changing macOS filenames [0.44ms]
(pass) the pre-act Antigravity macOS record retains parsing freshness and filename [0.95ms]
(pass) capability record production reads no running host or ambient clock [0.16ms]

 16 pass
 1 fail
 118 expect() calls
Ran 17 tests across 1 file. [25.00ms]
~~~~~~~~

121-restore-os-version.log; SHA-256 9470dbb1c3c5727f515f45a8ffffa9fd0f416fb39110206b477882293d74a60f

~~~~~~~~
1beaca6ed23530b7adb7cdd1cd07b44f2a389a236c2b688ed87cee917eba868d  /private/tmp/3b-h2-resume-rlms2sz7/os_version-before.ts
1beaca6ed23530b7adb7cdd1cd07b44f2a389a236c2b688ed87cee917eba868d  /Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts
COMMAND: cmp saved-copy restored-file
cmp EXIT STATUS: 0
Path status after restore:
 M packages/protocol/src/capability-record.ts
Path status equals its exact pre-break output.
~~~~~~~~

Kernel release:

123-diff-kernel.log; SHA-256 d0972858ddce6488fbf3eaa953b9770c106690193e93cfe4326b3a65ff5cf378

~~~~~~~~
diff --git a/private/tmp/3b-h2-resume-rlms2sz7/kernel_release-before.ts b/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts
index a3e7b6a..15331a8 100644
--- a/private/tmp/3b-h2-resume-rlms2sz7/kernel_release-before.ts
+++ b/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts
@@ -413,7 +413,7 @@ export function evaluateCapabilityFreshness(
   if (record.host.os_name !== undefined) {
     if (observed.host.os_name === undefined) return stale("host_changed");
     for (const field of LINUX_FRESHNESS_FIELDS) {
-      if (record.host[field] !== observed.host[field]) return stale("host_changed");
+      if (field !== "kernel_release" && record.host[field] !== observed.host[field]) return stale("host_changed");
     }
   } else {
     if (observed.host.os_name !== undefined) return stale("host_changed");
~~~~~~~~

124-fail-kernel.log; SHA-256 fef3b5e802d3c982c1732d1894f24481ec3f56480f1b53eaa0df483d6bcd1ac1

~~~~~~~~
bun test v1.4.2 (744846f84)

packages/protocol/test/linux-capability-record.test.ts:
(pass) Linux host fields are exactly B5 facts and parsed records are frozen [0.57ms]
(pass) Linux operating-system name mismatch is stale [0.15ms]
(pass) Linux operating-system version mismatch is stale [0.05ms]
83 | });
84 |
85 | test("Linux kernel release mismatch is stale", () => {
86 |   const value = record();
87 |   const facts = { ...observed(value), host: { ...linuxHost, kernel_release: "7.0.1-fixture" } };
88 |   expect(evaluateCapabilityFreshness(value, value.evaluated_at, facts)).toEqual({ fresh: false, reason: "host_changed" });
                                                                             ^
error: expect(received).toEqual(expected)

  {
-   "fresh": false,
-   "reason": "host_changed",
+   "fresh": true,
  }

- Expected  - 2
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/test/linux-capability-record.test.ts:88:73)
(fail) Linux kernel release mismatch is stale [0.57ms]
(pass) Linux executable SHA-256 mismatch is stale [0.13ms]
(pass) Linux executable version mismatch is stale [0.06ms]
(pass) Linux freshness expires at the exact 30-day horizon [0.22ms]
(pass) macOS records are stale against Linux observed facts [0.04ms]
(pass) Linux records are stale against macOS observed facts [0.03ms]
(pass) mixed macOS and Linux host fields are rejected [0.07ms]
(pass) Linux records reject every macOS host field with any value [0.56ms]
(pass) Linux host fields reject missing, empty and non-string values [0.32ms]
(pass) Linux adapter registration must match the record's registered surface [0.07ms]
(pass) Linux reported model is recorded independently of the requested model [0.03ms]
(pass) Linux filenames distinguish hosts without changing macOS filenames [0.51ms]
(pass) the pre-act Antigravity macOS record retains parsing freshness and filename [1.22ms]
(pass) capability record production reads no running host or ambient clock [0.28ms]

 16 pass
 1 fail
 118 expect() calls
Ran 17 tests across 1 file. [29.00ms]
~~~~~~~~

125-restore-kernel.log; SHA-256 3804df481730d598133cdfabcd9f8d54617c42cee58fa8697b24c8af2f2e43d5

~~~~~~~~
1beaca6ed23530b7adb7cdd1cd07b44f2a389a236c2b688ed87cee917eba868d  /private/tmp/3b-h2-resume-rlms2sz7/kernel_release-before.ts
1beaca6ed23530b7adb7cdd1cd07b44f2a389a236c2b688ed87cee917eba868d  /Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts
COMMAND: cmp saved-copy restored-file
cmp EXIT STATUS: 0
Path status after restore:
 M packages/protocol/src/capability-record.ts
Path status equals its exact pre-break output.
~~~~~~~~

Executable SHA-256:

127-diff-binary.log; SHA-256 a8ca7778cef8cb6fea6eff8322b18aa6a89cf0009d1e2527b219136c7fbdc3d0

~~~~~~~~
diff --git a/private/tmp/3b-h2-resume-rlms2sz7/binary-before.ts b/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts
index a3e7b6a..23038f4 100644
--- a/private/tmp/3b-h2-resume-rlms2sz7/binary-before.ts
+++ b/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts
@@ -408,7 +408,7 @@ export function evaluateCapabilityFreshness(
   observed: ObservedSurfaceFacts,
 ): { readonly fresh: true } | { readonly fresh: false; readonly reason: StalenessReason } {
   const nowMs = canonicalTimestampMs(now, "invalid_now", "now");
-  if (record.binary_sha256 !== observed.binary_sha256) return stale("binary_hash_changed");
+  if (record.host.os_name === undefined && record.binary_sha256 !== observed.binary_sha256) return stale("binary_hash_changed");
   if (record.cli_version !== observed.cli_version) return stale("cli_version_changed");
   if (record.host.os_name !== undefined) {
     if (observed.host.os_name === undefined) return stale("host_changed");
~~~~~~~~

128-fail-binary.log; SHA-256 aa16baf346313bda9fe8e35c3f4cd7998ca605ca352a99ab638b0986eafc7c71

~~~~~~~~
bun test v1.4.2 (744846f84)

packages/protocol/test/linux-capability-record.test.ts:
(pass) Linux host fields are exactly B5 facts and parsed records are frozen [0.71ms]
(pass) Linux operating-system name mismatch is stale [0.18ms]
(pass) Linux operating-system version mismatch is stale [0.07ms]
(pass) Linux kernel release mismatch is stale [0.04ms]
89 | });
90 |
91 | test("Linux executable SHA-256 mismatch is stale", () => {
92 |   const value = record();
93 |   const facts = { ...observed(value), binary_sha256: "c".repeat(64) };
94 |   expect(evaluateCapabilityFreshness(value, value.evaluated_at, facts)).toEqual({ fresh: false, reason: "binary_hash_changed" });
                                                                             ^
error: expect(received).toEqual(expected)

  {
-   "fresh": false,
-   "reason": "binary_hash_changed",
+   "fresh": true,
  }

- Expected  - 2
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/test/linux-capability-record.test.ts:94:73)
(fail) Linux executable SHA-256 mismatch is stale [0.34ms]
(pass) Linux executable version mismatch is stale [0.08ms]
(pass) Linux freshness expires at the exact 30-day horizon [0.24ms]
(pass) macOS records are stale against Linux observed facts [0.07ms]
(pass) Linux records are stale against macOS observed facts [0.04ms]
(pass) mixed macOS and Linux host fields are rejected [0.07ms]
(pass) Linux records reject every macOS host field with any value [0.58ms]
(pass) Linux host fields reject missing, empty and non-string values [0.38ms]
(pass) Linux adapter registration must match the record's registered surface [0.09ms]
(pass) Linux reported model is recorded independently of the requested model [0.05ms]
(pass) Linux filenames distinguish hosts without changing macOS filenames [0.42ms]
(pass) the pre-act Antigravity macOS record retains parsing freshness and filename [1.05ms]
(pass) capability record production reads no running host or ambient clock [0.29ms]

 16 pass
 1 fail
 118 expect() calls
Ran 17 tests across 1 file. [27.00ms]
~~~~~~~~

129-restore-binary.log; SHA-256 b6bf9aec30ff04e042420939d2ee7ac4cda219a6a94f63b74a0ecb7d02cf22cf

~~~~~~~~
1beaca6ed23530b7adb7cdd1cd07b44f2a389a236c2b688ed87cee917eba868d  /private/tmp/3b-h2-resume-rlms2sz7/binary-before.ts
1beaca6ed23530b7adb7cdd1cd07b44f2a389a236c2b688ed87cee917eba868d  /Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts
COMMAND: cmp saved-copy restored-file
cmp EXIT STATUS: 0
Path status after restore:
 M packages/protocol/src/capability-record.ts
Path status equals its exact pre-break output.
~~~~~~~~

Historical macOS parse:

131-diff-macos.log; SHA-256 3781417799b7bbe9ec232a9c23879592eaa2e58f900d62cd7010e85d55dda0a6

~~~~~~~~
diff --git a/private/tmp/3b-h2-resume-rlms2sz7/macos-before.ts b/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts
index a3e7b6a..b144e5f 100644
--- a/private/tmp/3b-h2-resume-rlms2sz7/macos-before.ts
+++ b/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts
@@ -365,7 +365,7 @@ export function parseCapabilityRecord(raw: Record<string, unknown>): CapabilityR
       host: Object.hasOwn(host, "os_name") ? readLinuxHost(host, surface) : {
         arch: readString(host.arch, "host.arch"),
         macos_version: readString(host.macos_version, "host.macos_version"),
-        macos_build: readString(host.macos_build, "host.macos_build"),
+        macos_build: readString(host.macos_build, "host.macos_build") + "-broken",
         bun_version: readString(host.bun_version, "host.bun_version"),
         bun_path: readString(host.bun_path, "host.bun_path"),
         bun_sha256: readString(host.bun_sha256, "host.bun_sha256"),
~~~~~~~~

132-fail-macos.log; SHA-256 ee4a16d0778531c4547197df43aba4f1394002ac1a53eb049b47498abb3ae83a

~~~~~~~~
bun test v1.4.2 (744846f84)

packages/protocol/test/linux-capability-record.test.ts:
(pass) Linux host fields are exactly B5 facts and parsed records are frozen [0.81ms]
(pass) Linux operating-system name mismatch is stale [0.17ms]
(pass) Linux operating-system version mismatch is stale [0.07ms]
(pass) Linux kernel release mismatch is stale [0.04ms]
(pass) Linux executable SHA-256 mismatch is stale [0.04ms]
(pass) Linux executable version mismatch is stale [0.05ms]
(pass) Linux freshness expires at the exact 30-day horizon [0.23ms]
(pass) macOS records are stale against Linux observed facts [0.09ms]
(pass) Linux records are stale against macOS observed facts [0.03ms]
(pass) mixed macOS and Linux host fields are rejected [0.06ms]
(pass) Linux records reject every macOS host field with any value [0.48ms]
(pass) Linux host fields reject missing, empty and non-string values [0.32ms]
(pass) Linux adapter registration must match the record's registered surface [0.08ms]
(pass) Linux reported model is recorded independently of the requested model [0.03ms]
(pass) Linux filenames distinguish hosts without changing macOS filenames [0.35ms]
187 |   const section = report.toString().split("## Capability record")[1]!;
188 |   const bytes = section.match(/```json\n([^\n]+)\n```/)![1]! + "\n";
189 |   expect(createHash("sha256").update(bytes).digest("hex")).toBe("0b7e9d47a31d4e9439ad1846f949f57518defcebfe3ef6ab0dbbfa98673ee983");
190 |   const original = JSON.parse(bytes);
191 |   const value = parseCapabilityRecord(original);
192 |   expect(value).toStrictEqual(original);
                      ^
error: expect(received).toStrictEqual(expected)

@@ -11,11 +11,11 @@
    "host": {
      "arch": "arm64",
      "bun_path": "/Users/michaeldaley/.bun/bin/bun",
      "bun_sha256": "35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5",
      "bun_version": "1.4.2",
-     "macos_build": "26A434",
+     "macos_build": "26A434-broken",
      "macos_version": "27.0.1",
      "shell": "/bin/zsh",
      "term": "dumb",
    },
    "identity_attestation": {

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/test/linux-capability-record.test.ts:192:17)
(fail) the pre-act Antigravity macOS record retains parsing freshness and filename [1.13ms]
(pass) capability record production reads no running host or ambient clock [0.15ms]

 16 pass
 1 fail
 115 expect() calls
Ran 17 tests across 1 file. [32.00ms]
~~~~~~~~

133-restore-macos.log; SHA-256 60a6dc4b4c25961fa6eee4660db37a7e96fb8edf56709c56e0372b658df0a721

~~~~~~~~
1beaca6ed23530b7adb7cdd1cd07b44f2a389a236c2b688ed87cee917eba868d  /private/tmp/3b-h2-resume-rlms2sz7/macos-before.ts
1beaca6ed23530b7adb7cdd1cd07b44f2a389a236c2b688ed87cee917eba868d  /Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts
COMMAND: cmp saved-copy restored-file
cmp EXIT STATUS: 0
Path status after restore:
 M packages/protocol/src/capability-record.ts
Path status equals its exact pre-break output.
~~~~~~~~

Superseded-record retention:

151-diff-retention.log; SHA-256 3214d6f4b6e54dba3b6206cb4ea80b5fb993dd1753641adeed7c48aa16239dd8

~~~~~~~~
diff --git a/private/tmp/3b-h2-resume-rlms2sz7/retention-before.ts b/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts
index 33fc2d3..f7ad6c3 100644
--- a/private/tmp/3b-h2-resume-rlms2sz7/retention-before.ts
+++ b/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts
@@ -50,7 +50,7 @@ export function writeCapabilityRecord(
   const entry = capabilityRecordFilename(parsed);
   const file = join(directory, entry);
   try {
-    writeFileSync(file, `${JSON.stringify(parsed)}\n`, { flag: "wx", mode: 0o600 });
+    writeFileSync(file, `${JSON.stringify(parsed)}\n`, { flag: "w", mode: 0o600 });
   } catch (error) {
     throw new CapabilityStoreError((error as NodeJS.ErrnoException).code === "EEXIST" ? "exists" : "invalid_root", entry);
   }
~~~~~~~~

166-fail-retention.log; SHA-256 793d32e7f8b4acbc5d867ac2b08027373a6873c349eac9bd9ac4e18143d4eb3f

~~~~~~~~
bun test v1.4.2 (744846f84)

packages/storage/test/linux-capability-store.test.ts:
(pass) Linux selection refuses an operating-system name mismatch [3.28ms]
(pass) Linux selection refuses an operating-system version mismatch [1.80ms]
(pass) Linux selection refuses a kernel release mismatch [1.31ms]
(pass) Linux selection refuses an executable SHA-256 mismatch [1.09ms]
 95 |   expect(newPath).not.toBe(oldPath);
 96 |   expect(fs.readdirSync(join(root, "capability", older.surface)).sort()).toEqual([basename(oldPath), basename(newPath)].sort());
 97 |   expect(readCapabilityRecords(root, REPO, WORKTREE, older.surface)).toEqual([newer, older]);
 98 |   expect(select(root, older)).toEqual(newer);
 99 |   const changedOld = record({ overall: "fail", limitations: ["fixture collision attempt"] });
100 |   expect(() => write(root, changedOld)).toThrow(CapabilityStoreError);
                                              ^
error: expect(received).toThrow(expected)

Expected constructor: CapabilityStoreError

Received function did not throw
Received value: "/private/var/folders/x7/q4cptd9d25l_jjks9ms4j5000000gn/T/h2-capability-store-1D0Xz9/capability/claude-code/2026-09-01T00:00:00.000Z-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-linux-99434be27c9b423e1a6d3d8765806c6eb758c3feb504f099aa68a3f1d2ea2cbf.json"

      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:100:41)
      at withRoot (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:29:9)
(fail) superseded Linux records remain byte for byte and newer is selected [2.73ms]
(pass) pre-act macOS bytes read back unchanged with original filename and freshness [2.02ms]
(pass) Linux selection is scoped to host surface and full executable hash [5.08ms]
(pass) a newer Linux CLI mismatch does not fall back to a superseded record [2.16ms]
(pass) Linux selection refuses records at their horizon and on CLI version drift [3.76ms]
(pass) store selection refuses records of the other operating system [7.06ms]
(pass) mixed and macOS-bearing Linux records are rejected before store creation [0.53ms]
(pass) macOS default refusal is preserved while explicit host selection isolates records [2.49ms]
(pass) existing macOS stores retain bytes filenames and descending read order [1.83ms]

 12 pass
 1 fail
 50 expect() calls
Ran 13 tests across 1 file. [54.00ms]
~~~~~~~~

167-restore-retention.log; SHA-256 586b8571669ad6ba3cb034f3d3b53832cccd2be128fddd1813692443c10fd63a

~~~~~~~~
d81ba19a418daa253a94bbe9d17558abdfa8d44021f879f70dc26bd2a0569778  /private/tmp/3b-h2-resume-rlms2sz7/retention-before.ts
d81ba19a418daa253a94bbe9d17558abdfa8d44021f879f70dc26bd2a0569778  /Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts
COMMAND: cmp saved-copy restored-file
cmp EXIT STATUS: 0
Path status after restore:
 M packages/storage/src/capability-store.ts
Path status equals its exact pre-break output.
~~~~~~~~

### Test-before-production runs and self-fix

The planned RED run 112 failed 11 new protocol tests against the old parser;
148 failed 10 new storage tests against the old filename reader/selector.
The planned production changes made them pass. Both full outputs are retained
below; no failed unchanged code was rerun to obtain a pass.

112-protocol-red.log; SHA-256 7b82ef7648bb2a47bfd56577e7abeae84618d5daabc30be618f8fb3e7982c9ee

~~~~~~~~
bun test v1.4.2 (744846f84)

packages/protocol/test/linux-capability-record.test.ts:
264 |   }
265 |
266 |   try {
267 |     return readRecord(raw);
268 |   } catch (thrown) {
269 |     if (raised !== undefined && thrown === raised) throw thrown;
                                                               ^
CapabilityRecordError: capability record rejected: schema (host.arch)
      at parseCapabilityRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts:269:58)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/test/linux-capability-record.test.ts:60:18)
(fail) Linux host fields are exactly B5 facts and parsed records are frozen [0.58ms]
264 |   }
265 |
266 |   try {
267 |     return readRecord(raw);
268 |   } catch (thrown) {
269 |     if (raised !== undefined && thrown === raised) throw thrown;
                                                               ^
CapabilityRecordError: capability record rejected: schema (host.arch)
      at parseCapabilityRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts:269:58)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/test/linux-capability-record.test.ts:74:17)
(fail) Linux operating-system name mismatch is stale [0.14ms]
264 |   }
265 |
266 |   try {
267 |     return readRecord(raw);
268 |   } catch (thrown) {
269 |     if (raised !== undefined && thrown === raised) throw thrown;
                                                               ^
CapabilityRecordError: capability record rejected: schema (host.arch)
      at parseCapabilityRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts:269:58)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/test/linux-capability-record.test.ts:80:17)
(fail) Linux operating-system version mismatch is stale [0.10ms]
264 |   }
265 |
266 |   try {
267 |     return readRecord(raw);
268 |   } catch (thrown) {
269 |     if (raised !== undefined && thrown === raised) throw thrown;
                                                               ^
CapabilityRecordError: capability record rejected: schema (host.arch)
      at parseCapabilityRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts:269:58)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/test/linux-capability-record.test.ts:86:17)
(fail) Linux kernel release mismatch is stale [0.06ms]
264 |   }
265 |
266 |   try {
267 |     return readRecord(raw);
268 |   } catch (thrown) {
269 |     if (raised !== undefined && thrown === raised) throw thrown;
                                                               ^
CapabilityRecordError: capability record rejected: schema (host.arch)
      at parseCapabilityRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts:269:58)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/test/linux-capability-record.test.ts:92:17)
(fail) Linux executable SHA-256 mismatch is stale [0.07ms]
264 |   }
265 |
266 |   try {
267 |     return readRecord(raw);
268 |   } catch (thrown) {
269 |     if (raised !== undefined && thrown === raised) throw thrown;
                                                               ^
CapabilityRecordError: capability record rejected: schema (host.arch)
      at parseCapabilityRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts:269:58)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/test/linux-capability-record.test.ts:98:17)
(fail) Linux executable version mismatch is stale [0.06ms]
264 |   }
265 |
266 |   try {
267 |     return readRecord(raw);
268 |   } catch (thrown) {
269 |     if (raised !== undefined && thrown === raised) throw thrown;
                                                               ^
CapabilityRecordError: capability record rejected: schema (host.arch)
      at parseCapabilityRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts:269:58)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/test/linux-capability-record.test.ts:104:17)
(fail) Linux freshness expires at the exact 30-day horizon [0.06ms]
(pass) macOS records are stale against Linux observed facts [0.25ms]
264 |   }
265 |
266 |   try {
267 |     return readRecord(raw);
268 |   } catch (thrown) {
269 |     if (raised !== undefined && thrown === raised) throw thrown;
                                                               ^
CapabilityRecordError: capability record rejected: schema (host.arch)
      at parseCapabilityRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts:269:58)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/test/linux-capability-record.test.ts:119:17)
(fail) Linux records are stale against macOS observed facts [0.08ms]
(pass) mixed macOS and Linux host fields are rejected [0.07ms]
(pass) Linux records reject every macOS host field with any value [0.53ms]
(pass) Linux host fields reject missing, empty and non-string values [0.22ms]
150 |   try {
151 |     parseCapabilityRecord(raw({ host: { ...linuxHost, adapter_registration: other.surface } }));
152 |     throw new Error("expected registration rejection");
153 |   } catch (error) {
154 |     expect(error).toBeInstanceOf(CapabilityRecordError);
155 |     expect((error as CapabilityRecordError).kind).toBe("registration_mismatch");
                                                        ^
error: expect(received).toBe(expected)

Expected: "registration_mismatch"
Received: "schema"

      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/test/linux-capability-record.test.ts:155:51)
(fail) Linux adapter registration must match the record's registered surface [0.27ms]
264 |   }
265 |
266 |   try {
267 |     return readRecord(raw);
268 |   } catch (thrown) {
269 |     if (raised !== undefined && thrown === raised) throw thrown;
                                                               ^
CapabilityRecordError: capability record rejected: schema (host.arch)
      at parseCapabilityRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts:269:58)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/test/linux-capability-record.test.ts:161:17)
(fail) Linux reported model is recorded independently of the requested model [0.06ms]
264 |   }
265 |
266 |   try {
267 |     return readRecord(raw);
268 |   } catch (thrown) {
269 |     if (raised !== undefined && thrown === raised) throw thrown;
                                                               ^
CapabilityRecordError: capability record rejected: schema (host.arch)
      at parseCapabilityRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts:269:58)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/protocol/test/linux-capability-record.test.ts:169:17)
(fail) Linux filenames distinguish hosts without changing macOS filenames [0.07ms]
(pass) the pre-act Antigravity macOS record retains parsing freshness and filename [0.85ms]
(pass) capability record production reads no running host or ambient clock [0.13ms]

 6 pass
 11 fail
 90 expect() calls
Ran 17 tests across 1 file. [29.00ms]
~~~~~~~~

148-storage-red.log; SHA-256 5a9eaaf341da497dd6f5ec655f5abbbbe3b908a7065f0fb3f80bdb83a68155ad

~~~~~~~~
bun test v1.4.2 (744846f84)

packages/storage/test/linux-capability-store.test.ts:
78 |   for (const entry of entries) {
79 |     const match = /^((?:\d{4}|[+-]\d{6})-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)-[0-9a-f]{12}\.json$/.exec(entry);
80 |     const timestamp = match?.[1];
81 |     const ms = timestamp === undefined ? NaN : Date.parse(timestamp);
82 |     if (!Number.isFinite(ms) || new Date(ms).toISOString() !== timestamp) {
83 |       throw new CapabilityStoreError("unsafe_entry", entry);
                                                               ^
CapabilityStoreError: capability store rejected: unsafe_entry (2026-09-01T00:00:00.000Z-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-linux-99434be27c9b423e1a6d3d8765806c6eb758c3feb504f099aa68a3f1d2ea2cbf.json)
      at readCapabilityRecords (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts:83:59)
      at latestFreshRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts:124:18)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:67:10)
      at withRoot (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:29:9)
(fail) Linux selection refuses an operating-system name mismatch [3.49ms]
78 |   for (const entry of entries) {
79 |     const match = /^((?:\d{4}|[+-]\d{6})-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)-[0-9a-f]{12}\.json$/.exec(entry);
80 |     const timestamp = match?.[1];
81 |     const ms = timestamp === undefined ? NaN : Date.parse(timestamp);
82 |     if (!Number.isFinite(ms) || new Date(ms).toISOString() !== timestamp) {
83 |       throw new CapabilityStoreError("unsafe_entry", entry);
                                                               ^
CapabilityStoreError: capability store rejected: unsafe_entry (2026-09-01T00:00:00.000Z-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-linux-99434be27c9b423e1a6d3d8765806c6eb758c3feb504f099aa68a3f1d2ea2cbf.json)
      at readCapabilityRecords (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts:83:59)
      at latestFreshRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts:124:18)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:73:10)
      at withRoot (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:29:9)
(fail) Linux selection refuses an operating-system version mismatch [1.16ms]
78 |   for (const entry of entries) {
79 |     const match = /^((?:\d{4}|[+-]\d{6})-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)-[0-9a-f]{12}\.json$/.exec(entry);
80 |     const timestamp = match?.[1];
81 |     const ms = timestamp === undefined ? NaN : Date.parse(timestamp);
82 |     if (!Number.isFinite(ms) || new Date(ms).toISOString() !== timestamp) {
83 |       throw new CapabilityStoreError("unsafe_entry", entry);
                                                               ^
CapabilityStoreError: capability store rejected: unsafe_entry (2026-09-01T00:00:00.000Z-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-linux-99434be27c9b423e1a6d3d8765806c6eb758c3feb504f099aa68a3f1d2ea2cbf.json)
      at readCapabilityRecords (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts:83:59)
      at latestFreshRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts:124:18)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:79:10)
      at withRoot (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:29:9)
(fail) Linux selection refuses a kernel release mismatch [1.25ms]
78 |   for (const entry of entries) {
79 |     const match = /^((?:\d{4}|[+-]\d{6})-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)-[0-9a-f]{12}\.json$/.exec(entry);
80 |     const timestamp = match?.[1];
81 |     const ms = timestamp === undefined ? NaN : Date.parse(timestamp);
82 |     if (!Number.isFinite(ms) || new Date(ms).toISOString() !== timestamp) {
83 |       throw new CapabilityStoreError("unsafe_entry", entry);
                                                               ^
CapabilityStoreError: capability store rejected: unsafe_entry (2026-09-01T00:00:00.000Z-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-linux-99434be27c9b423e1a6d3d8765806c6eb758c3feb504f099aa68a3f1d2ea2cbf.json)
      at readCapabilityRecords (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts:83:59)
      at latestFreshRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts:124:18)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:85:10)
      at withRoot (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:29:9)
(fail) Linux selection refuses an executable SHA-256 mismatch [1.24ms]
78 |   for (const entry of entries) {
79 |     const match = /^((?:\d{4}|[+-]\d{6})-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)-[0-9a-f]{12}\.json$/.exec(entry);
80 |     const timestamp = match?.[1];
81 |     const ms = timestamp === undefined ? NaN : Date.parse(timestamp);
82 |     if (!Number.isFinite(ms) || new Date(ms).toISOString() !== timestamp) {
83 |       throw new CapabilityStoreError("unsafe_entry", entry);
                                                               ^
CapabilityStoreError: capability store rejected: unsafe_entry (2026-09-02T00:00:00.000Z-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-linux-99434be27c9b423e1a6d3d8765806c6eb758c3feb504f099aa68a3f1d2ea2cbf.json)
      at readCapabilityRecords (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts:83:59)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:97:10)
      at withRoot (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:29:9)
(fail) superseded Linux records remain byte for byte and newer is selected [1.64ms]
(pass) pre-act macOS bytes read back unchanged with original filename and freshness [2.06ms]
78 |   for (const entry of entries) {
79 |     const match = /^((?:\d{4}|[+-]\d{6})-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)-[0-9a-f]{12}\.json$/.exec(entry);
80 |     const timestamp = match?.[1];
81 |     const ms = timestamp === undefined ? NaN : Date.parse(timestamp);
82 |     if (!Number.isFinite(ms) || new Date(ms).toISOString() !== timestamp) {
83 |       throw new CapabilityStoreError("unsafe_entry", entry);
                                                               ^
CapabilityStoreError: capability store rejected: unsafe_entry (2026-09-01T00:00:00.000Z-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-linux-5f38f5560b49919d613ba969a707712371b9caa8d0ca51b1b42c92c1d2f4f288.json)
      at readCapabilityRecords (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts:83:59)
      at latestFreshRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts:124:18)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:139:38)
      at withRoot (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:29:9)
(fail) Linux selection is scoped to host surface and full executable hash [3.04ms]
78 |   for (const entry of entries) {
79 |     const match = /^((?:\d{4}|[+-]\d{6})-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)-[0-9a-f]{12}\.json$/.exec(entry);
80 |     const timestamp = match?.[1];
81 |     const ms = timestamp === undefined ? NaN : Date.parse(timestamp);
82 |     if (!Number.isFinite(ms) || new Date(ms).toISOString() !== timestamp) {
83 |       throw new CapabilityStoreError("unsafe_entry", entry);
                                                               ^
CapabilityStoreError: capability store rejected: unsafe_entry (2026-09-02T00:00:00.000Z-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-linux-99434be27c9b423e1a6d3d8765806c6eb758c3feb504f099aa68a3f1d2ea2cbf.json)
      at readCapabilityRecords (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts:83:59)
      at latestFreshRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts:124:18)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:149:10)
      at withRoot (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:29:9)
(fail) a newer Linux CLI mismatch does not fall back to a superseded record [1.28ms]
78 |   for (const entry of entries) {
79 |     const match = /^((?:\d{4}|[+-]\d{6})-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)-[0-9a-f]{12}\.json$/.exec(entry);
80 |     const timestamp = match?.[1];
81 |     const ms = timestamp === undefined ? NaN : Date.parse(timestamp);
82 |     if (!Number.isFinite(ms) || new Date(ms).toISOString() !== timestamp) {
83 |       throw new CapabilityStoreError("unsafe_entry", entry);
                                                               ^
CapabilityStoreError: capability store rejected: unsafe_entry (2026-09-01T00:00:00.000Z-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-linux-99434be27c9b423e1a6d3d8765806c6eb758c3feb504f099aa68a3f1d2ea2cbf.json)
      at readCapabilityRecords (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts:83:59)
      at latestFreshRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts:124:18)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:157:10)
      at withRoot (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:29:9)
(fail) Linux selection refuses records at their horizon and on CLI version drift [1.40ms]
78 |   for (const entry of entries) {
79 |     const match = /^((?:\d{4}|[+-]\d{6})-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)-[0-9a-f]{12}\.json$/.exec(entry);
80 |     const timestamp = match?.[1];
81 |     const ms = timestamp === undefined ? NaN : Date.parse(timestamp);
82 |     if (!Number.isFinite(ms) || new Date(ms).toISOString() !== timestamp) {
83 |       throw new CapabilityStoreError("unsafe_entry", entry);
                                                               ^
CapabilityStoreError: capability store rejected: unsafe_entry (2026-09-01T00:00:00.000Z-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-linux-99434be27c9b423e1a6d3d8765806c6eb758c3feb504f099aa68a3f1d2ea2cbf.json)
      at readCapabilityRecords (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts:83:59)
      at latestFreshRecord (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts:124:18)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:166:14)
      at withRoot (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:29:9)
      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:164:5)
(fail) store selection refuses records of the other operating system [1.92ms]
(pass) mixed and macOS-bearing Linux records are rejected before store creation [0.47ms]
180 |   const newer = record({ host: macHost, binary_sha256: "f".repeat(64), evaluated_at: "2026-09-02T00:00:00.000Z", expires_at: "2026-10-02T00:00:00.000Z" });
181 |   write(root, older);
182 |   write(root, newer);
183 |   expect(select(root, older)).toBeNull();
184 |   expect(select(root, newer)).toEqual(newer);
185 |   expect(latestFreshRecord(root, REPO, WORKTREE, older.surface, NOW, observed(older), { by_host: true })).toEqual(older);
                                                                                                                ^
error: expect(received).toEqual(expected)

- {
-   "auth_readiness": {
-     "primitive": null,
-     "result": "no_primitive",
-   },
-   "binary_path": "/fixture/bin/surface",
-   "binary_sha256": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
-   "cli_version": "2.1.296",
-   "evaluated_at": "2026-09-01T00:00:00.000Z",
-   "expires_at": "2026-10-01T00:00:00.000Z",
-   "host": {
-     "arch": "arm64",
-     "bun_path": "/fixture/bin/bun",
-     "bun_sha256": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
-     "bun_version": "1.4.2",
-     "macos_build": "24A335",
-     "macos_version": "15.0",
-     "shell": "/bin/zsh",
-     "term": "xterm-256color",
-   },
-   "identity_attestation": {
-     "primitive": "fixture-response-model",
-     "result": "pass",
-     "sanitized_facts": "",
-   },
-   "independence_domain": "anthropic",
-   "independent_review_eligible": true,
-   "limitations": [],
-   "organization_id": "anthropic",
-   "overall": "pass",
-   "provider": "anthropic",
-   "pty": {
-     "observed_ms": {},
-     "result": "pass",
-   },
-   "redaction_rules_applied": [],
-   "requested_model": "fixture-requested-model",
-   "role_eligibility": [
-     "builder",
-   ],
-   "surface": "claude-code",
- }
+ null

- Expected  - 42
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:185:107)
      at withRoot (/Users/michaeldaley/builds/h2-r1/tui/packages/storage/test/linux-capability-store.test.ts:29:9)
(fail) macOS default refusal is preserved while explicit host selection isolates records [2.54ms]
(pass) existing macOS stores retain bytes filenames and descending read order [2.02ms]

 3 pass
 10 fail
 25 expect() calls
Ran 13 tests across 1 file. [47.00ms]
~~~~~~~~

The additional self-fix under DEC-20261023-01 B4 was typecheck 135.
The new observed-host union type rejected existing test spreads at lines
186 and 205; two new toBe assertions also passed unknown values to typed
string matchers. This was a compiler failure from uncommitted API types
inside authorized test paths, not an existing runtime assertion failure.
The fix changed only ObservedSurfaceFacts to represent missing comparison
facts and the two new assertions to explicit expected strings. It added
incomplete observed host facts fail closed for either operating system.
No existing assertion changed. Verification restarted with typecheck 136
and protocol 137, both passing; later gates also passed.
The complete diagnostics, with trailing whitespace removed, follow:

135-protocol-typecheck.log; SHA-256 70f0de32faf42880460c55462826b40f6a7c4a9a68799c7e3a8ca244f675cbe5

~~~~~~~~
packages/protocol/test/capability-record.test.ts(186,5): error TS2375: Type '{ arch: string; macos_version: string; macos_build: string; bun_version: string; bun_path: string; bun_sha256: string; term: string; shell: string; os_name?: never; os_version?: never; kernel_release?: never; reported_model?: never; adapter_registration?: never; } | { ...; }' is not assignable to type 'MacOSCapabilityHostV1 | LinuxCapabilityHostV1' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Type '{ arch: string; os_name: string; os_version: string; kernel_release: string; reported_model: string; adapter_registration: SurfaceId; macos_version?: never; macos_build?: never; bun_version?: never; bun_path?: never; bun_sha256?: never; term?: never; shell?: never; }' is not assignable to type 'MacOSCapabilityHostV1 | LinuxCapabilityHostV1' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
    Type '{ arch: string; os_name: string; os_version: string; kernel_release: string; reported_model: string; adapter_registration: SurfaceId; macos_version?: never; macos_build?: never; bun_version?: never; bun_path?: never; bun_sha256?: never; term?: never; shell?: never; }' is not assignable to type 'MacOSCapabilityHostV1'.
      Property 'macos_version' is optional in type '{ arch: string; os_name: string; os_version: string; kernel_release: string; reported_model: string; adapter_registration: SurfaceId; macos_version?: never; macos_build?: never; ... 4 more ...; shell?: never; }' but required in type 'MacOSCapabilityHostV1'.
packages/protocol/test/capability-record.test.ts(205,5): error TS2375: Type '{ shell: string; arch: string; macos_version: string; macos_build: string; bun_version: string; bun_path: string; bun_sha256: string; term: string; os_name?: never; os_version?: never; kernel_release?: never; reported_model?: never; adapter_registration?: never; } | { ...; }' is not assignable to type 'MacOSCapabilityHostV1 | LinuxCapabilityHostV1' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Type '{ shell: string; os_name: string; os_version: string; kernel_release: string; reported_model: string; adapter_registration: SurfaceId; arch?: never; macos_version?: never; macos_build?: never; bun_version?: never; bun_path?: never; bun_sha256?: never; term?: never; }' is not assignable to type 'MacOSCapabilityHostV1 | LinuxCapabilityHostV1' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
    Type '{ shell: string; os_name: string; os_version: string; kernel_release: string; reported_model: string; adapter_registration: SurfaceId; arch?: never; macos_version?: never; macos_build?: never; bun_version?: never; bun_path?: never; bun_sha256?: never; term?: never; }' is not assignable to type 'MacOSCapabilityHostV1'.
      Property 'arch' is optional in type '{ shell: string; os_name: string; os_version: string; kernel_release: string; reported_model: string; adapter_registration: SurfaceId; arch?: never; macos_version?: never; macos_build?: never; bun_version?: never; bun_path?: never; bun_sha256?: never; term?: never; }' but required in type 'MacOSCapabilityHostV1'.
packages/protocol/test/linux-capability-record.test.ts(68,37): error TS2769: No overload matches this call.
  Overload 1 of 2, '(expected: string): void', gave the following error.
    Argument of type 'unknown' is not assignable to parameter of type 'string'.
  Overload 2 of 2, '(expected: string): void', gave the following error.
    Argument of type 'unknown' is not assignable to parameter of type 'string'.
packages/protocol/test/linux-capability-record.test.ts(69,35): error TS2769: No overload matches this call.
  Overload 1 of 2, '(expected: string): void', gave the following error.
    Argument of type 'unknown' is not assignable to parameter of type 'string'.
  Overload 2 of 2, '(expected: string): void', gave the following error.
    Argument of type 'unknown' is not assignable to parameter of type 'string'.
~~~~~~~~

Changes to the opening task detail: the observed-facts typing correction
and the additional fail-closed test raised the protocol addition from 17
to 18. Supplemental pre-commit typechecks 135/136 and 169 verified public
API compatibility. The production design, six breaks and authorized paths
otherwise stayed as planned. The signed resumptions and load wait below
also amend the execution detail as their texts direct.

### Third stop and signed resumption

After log 151 the pending retention test call was aborted and the harness
showed read-only. The builder reported it and made no call in that turn.
DEC-20261112-03 Addendum 1 accepts that one turn as a material deviation
of the Founder's environment. Its SHA-256 is
830e3508dcdd8536f11f6549b81ab06224686374b0b785262cccdaad59c96b50.
The third signed resume has SHA-256
b0c536196cc9b2fa47b461de2528f32f60f5e0c46d7674fc95a9f6bc263ed499.
Logs 152 through 165 passed the state, prompt and runtime checks; 166
was the retention break's first test run, and 167 restored it.

Addendum 1 A1 separately records the initial session turns' model
gpt-6.1-sol, effort xhigh, approvals reviewer user and CLI version 0.167.0.
Those are facts recorded by the signed act, not a machine-verifiable
resolved model ID checked by the builder. The Founder's final record
check still follows and covers every later turn under the stated exception.

### First required gate attempt and fourth stop

At implementation head b0463c0d239af0e600423e4958721f0b11c25014,
runtime, typecheck, protocol, storage, evidence pipeline and Phase 3A gates
passed in order. Bare bun test, log 187, began at first load average 5.88
and failed an existing out-of-scope assertion at
test/phase3a/adversarial/ledger-failure.test.ts:50. Its test name is
an unrecordable interruption is completed by next-start reconciliation.
It expected no live PID and received two. The builder let the run finish,
did not modify or rerun it, and halted with a clean worktree.
The failed run remains unchanged; it is not a known failure or a verdict.
Its summary lines are quoted verbatim:

187-gate-full.log; SHA-256 131824f50b8fb71f613fe0e270f405d7de63706ad44c707de33437c9854537b2

~~~~~~~~
COMMAND: bun test
17:49  up 18 days,  9:58, 5 users, load averages: 5.88 6.96 7.22
 1944 pass
 1 fail
 24055 expect() calls
Ran 1945 tests across 142 files. [225.01s]
EXIT STATUS: 1
~~~~~~~~

The gate halt report is pr/h2-gate-halt-report.md, SHA-256
40fab2d685edd793f2400d29bb2244aa5949d12eb88d7142d369bfe861b74e55;
its manifest is pr/h2-gate-halt-log-manifest.sha256, SHA-256
404d8e26bcb5d394f3bab3ce3e2f091ef40a6e91ae19a578b663ee3a9cf303a4.
They and the first halt's two files remain unchanged, are not deliverables,
and preserve every raw log. Log 194 records the gate halt report assembly.

DEC-20261112-03 Addendum 2, SHA-256
829248f1e2557ddbcfd33d6456f7056bfce73a008791cb88caa9660a5d979d29,
authorizes exactly one complete gate repeat. The fourth resume message has
SHA-256 3dc07de560ced2b71bbfbc9c2c1f37ea57e29ab9353dd0a808093001bf073b74.
The prompt manifest, state, artifact and runtime checks in 195 through 206
passed before the repeated gates began.

In short, Addendum 2 A1 records the failed gate above. A2 records that the
failed test and harness are unchanged, that this fixture supplies records
from memory and exercises neither the changed store nor freshness logic,
and that the same file passed in the preceding Phase 3A run; its cause
remains unestablished. A3 records the Founder's count-only discovery of
shells left by another project's tests and Hermes processes, with load
averages 5.96, 7.06 and 7.33. These are signed-act facts; the builder
performed no process inspection. B6 carries this test with the other
named timing tests to the hardening act before M6.

### Authorized repeat: waits, first readings and results

Each repeated command ran once, in order, after its separately logged
30-second load sampling wait reached below 2.0. Any expired wait and
renewed wait are retained in the inventory. Runtime checks matched.
Every repeated typecheck/test exited 0.

| Command | Successful wait and SHA-256 | Last wait reading with time | Run first uptime/load reading | Run log and SHA-256 |

| --- | --- | --- | --- | --- |

| COMMAND: bunx tsc --noEmit | 219-wait-typecheck-again-2.log; SHA-256 0f1a977c4171bf1f032202c4211eec247a7b7b145479ac8247a328e194b22646 | 2026-11-13T00:20:08+00:00 elapsed_seconds=0.01 one_minute_load=1.18 uptime=19:20  up 18 days, 11:29, 1 user, load averages: 1.18 1.72 3.09 | 19:20  up 18 days, 11:29, 1 user, load averages: 1.18 1.72 3.09 | 220-repeat-gate-typecheck.log; SHA-256 9116a02a2336230c065aeb65a5de7ec42a10973a9d643e862cb64e02c4ec7db7 |

| COMMAND: bun test packages/protocol | 221-wait-protocol.log; SHA-256 1c4f659d72a28560719a33e9e1444cabb946f2899b540dd87acfef0021a38677 | 2026-11-13T00:20:39+00:00 elapsed_seconds=0.01 one_minute_load=1.30 uptime=19:20  up 18 days, 11:29, 1 user, load averages: 1.30 1.71 3.04 | 19:20  up 18 days, 11:29, 1 user, load averages: 1.30 1.71 3.04 | 222-repeat-gate-protocol.log; SHA-256 200e8bed5d0649c07ed23007bcb2586e7769294bdca11af45b5d6206d8728cfe |

| COMMAND: bun test packages/storage | 223-wait-storage.log; SHA-256 56f7a89f87e7abd7c86e2a61615cfe682b1973cf8dbe7e6269d039cd64369815 | 2026-11-13T00:20:50+00:00 elapsed_seconds=0.01 one_minute_load=1.40 uptime=19:20  up 18 days, 11:29, 1 user, load averages: 1.40 1.72 3.03 | 19:20  up 18 days, 11:29, 1 user, load averages: 1.40 1.72 3.03 | 224-repeat-gate-storage.log; SHA-256 369bece235ab324ccf0f8b737934a8170fc16aab1321fe8400926b9c32b65cfe |

| COMMAND: bun test test/phase3a/evidence-pipeline.test.ts | 225-wait-evidence.log; SHA-256 35e6591d13915f2e2dd145f66cf1eae2f7a79e363f2a9e8146b5a00d756edf8a | 2026-11-13T00:20:59+00:00 elapsed_seconds=0.01 one_minute_load=1.41 uptime=19:20  up 18 days, 11:29, 1 user, load averages: 1.41 1.71 3.01 | 19:20  up 18 days, 11:29, 1 user, load averages: 1.41 1.71 3.01 | 226-repeat-gate-evidence.log; SHA-256 355035fd542301833d12cb306793e16daaf2887d11ce587b56a97d705ec737df |

| COMMAND: bun test test/phase3a | 227-wait-phase3a.log; SHA-256 6fb18d7fdb3199e56ebbd7b13d7ff2891754084648ada4708ef11555f1a58a35 | 2026-11-13T00:21:24+00:00 elapsed_seconds=0.01 one_minute_load=1.14 uptime=19:21  up 18 days, 11:30, 1 user, load averages: 1.14 1.62 2.94 | 19:21  up 18 days, 11:30, 1 user, load averages: 1.14 1.62 2.94 | 228-repeat-gate-phase3a.log; SHA-256 d012621e7d6e87b6a0bc0cbf631a129f396dbfaf8ee4749d5003e7c5bb84501f |

| COMMAND: bun test | 229-wait-full.log; SHA-256 54c30315ceac31fa4fee6d8d82c5b20890ab7f7dbb15a151bafe153977c19bfa | 2026-11-13T00:22:32+00:00 elapsed_seconds=0.01 one_minute_load=1.86 uptime=19:22  1 user, load averages: 1.86 1.74 2.88 | 19:22  up 18 days, 11:31, 1 user, load averages: 1.74 1.72 2.85 | 231-repeat-gate-full.log; SHA-256 c35daf427d127250eb4aacba0392a6dcf748c09c20c2b0ee8e541b1f99c4e892 |

208-repeat-gate-runtime.log; SHA-256 30231588988477436a83a59bc3a5159fd241dbeeec7528bb3ff411b4c929cc76

~~~~~~~~
COMMAND: certification runtime check before repeated gates
18:10  up 18 days, 10:19, 5 users, load averages: 7.13 7.54 7.51
EXIT STATUS: 0
~~~~~~~~

220-repeat-gate-typecheck.log; SHA-256 9116a02a2336230c065aeb65a5de7ec42a10973a9d643e862cb64e02c4ec7db7

~~~~~~~~
COMMAND: bunx tsc --noEmit
19:20  up 18 days, 11:29, 1 user, load averages: 1.18 1.72 3.09
EXIT STATUS: 0
~~~~~~~~

222-repeat-gate-protocol.log; SHA-256 200e8bed5d0649c07ed23007bcb2586e7769294bdca11af45b5d6206d8728cfe

~~~~~~~~
COMMAND: bun test packages/protocol
19:20  up 18 days, 11:29, 1 user, load averages: 1.30 1.71 3.04
 167 pass
 0 fail
 1673 expect() calls
Ran 167 tests across 12 files. [45.00ms]
EXIT STATUS: 0
~~~~~~~~

224-repeat-gate-storage.log; SHA-256 369bece235ab324ccf0f8b737934a8170fc16aab1321fe8400926b9c32b65cfe

~~~~~~~~
COMMAND: bun test packages/storage
19:20  up 18 days, 11:29, 1 user, load averages: 1.40 1.72 3.03
 43 pass
 0 fail
 286 expect() calls
Ran 43 tests across 5 files. [74.00ms]
EXIT STATUS: 0
~~~~~~~~

226-repeat-gate-evidence.log; SHA-256 355035fd542301833d12cb306793e16daaf2887d11ce587b56a97d705ec737df

~~~~~~~~
COMMAND: bun test test/phase3a/evidence-pipeline.test.ts
19:20  up 18 days, 11:29, 1 user, load averages: 1.41 1.71 3.01
 36 pass
 0 fail
 6169 expect() calls
Ran 36 tests across 1 file. [7.80s]
EXIT STATUS: 0
~~~~~~~~

228-repeat-gate-phase3a.log; SHA-256 d012621e7d6e87b6a0bc0cbf631a129f396dbfaf8ee4749d5003e7c5bb84501f

~~~~~~~~
COMMAND: bun test test/phase3a
19:21  up 18 days, 11:30, 1 user, load averages: 1.14 1.62 2.94
 168 pass
 0 fail
 8085 expect() calls
Ran 168 tests across 18 files. [62.86s]
EXIT STATUS: 0
~~~~~~~~

230-repeat-runtime-before-full.log; SHA-256 87736448209c845da98daedf215ef7ed69731fec74eb419694b2b8975a62f306

~~~~~~~~
COMMAND: certification runtime check before repeated bare bun test
19:22  up 18 days, 11:31, 1 user, load averages: 1.89 1.75 2.87
EXIT STATUS: 0
~~~~~~~~

231-repeat-gate-full.log; SHA-256 c35daf427d127250eb4aacba0392a6dcf748c09c20c2b0ee8e541b1f99c4e892

~~~~~~~~
COMMAND: bun test
19:22  up 18 days, 11:31, 1 user, load averages: 1.74 1.72 2.85
 1945 pass
 0 fail
 24066 expect() calls
Ran 1945 tests across 142 files. [197.08s]
EXIT STATUS: 0
~~~~~~~~

Floor arithmetic from actual Ran counts: 1945 - 1914 = 31; (167 - 149) + (43 - 30) = 18 + 13 = 31. Files: 142 - 140 = 2, equal to the two new test files.

The repeated full-suite summary is the gate result used for this slice.
The first failed gate remains part of its evidence and is not suppressed.

### Commits completed before this documentation commit


~~~~~~~~
764e3df5c616ff04043bb3d4fd72682bdbd35c4d
a7251235f94dcc4a3149b638a1acdac69236a26d
docs(verification): open the H2 build log with its task detail
9cc055c3c4d643672fefe2b4c5d0ef78eb2572bd
764e3df5c616ff04043bb3d4fd72682bdbd35c4d
feat(protocol): add the Linux capability record
b0463c0d239af0e600423e4958721f0b11c25014
9cc055c3c4d643672fefe2b4c5d0ef78eb2572bd
feat(storage): select capability records by host, surface and binary
~~~~~~~~

### C1 declarations, limitations and deviations

No live provider call was made. No builder command wrote a capability
record; all test record writes were static/synthetic fixtures inside the
temporary directories their tests created and removed. No host observation
for a capability record was made. No platform-specific installation input
needed a branch. No running-operating-system branch was added in either
production file. This MacBook runs no Linux operating-system branch;
tests exercised synthetic Linux record data through pure logic.

The Founder's runs at the final head on the MacBook and Ubuntu PC under
DEC-20261108-04 B9 and plan section 2B, the Founder's session-record check,
CI and independent review follow the push and are recorded in the PR and
review. The builder ran no Linux certification, live certification, GitHub
operation, push, independent review or merge.

Deviations retained: the first version command omitted tee and was repeated
unchanged in 007; initial logs-directory emptiness was not checked before
writing logs; the initial prompt checksum folder was corrected in 047;
the first two stops and signed corrections recorded in the opening; the
read-only stop and accepted environment deviation under Addendum 1; the
one typecheck self-fix; and the first full-suite gate failure, halt and
authorized repeat under Addendum 2. These are not correction-round verdicts.
The frozen-install executable-bit restoration remains not a finding.

The repository build-gate skill was read and its exact-SHA, clean-tree and
fail-closed principles applied through this slice's prescribed checks.
Its detached-worktree wrappers were not run: the signed H2 prompt fixes the
gate commands/order, and no skill-generated approval or review is claimed.

The last gates run after this file is committed and are recorded in the
final report and the pull request description. Completion assembly,
commit-finalization and subsequent attribution commands are also recorded
there with their logs, since their results postdate this file's assembly.

### Complete post-baseline command inventory available at assembly

Every completed command since the baseline is listed below with command,
uptime, exit status and full log SHA-256. Raw logs are never edited.
All quoted diffs and output above have only trailing whitespace removed.

| Log | Command | Uptime before command | Exit | SHA-256 |
| --- | --- | --- | --- | --- |
| 076-scratch-directory.log | COMMAND: python3 -c import\ tempfile\;\ print\(tempfile.mkdtemp\(prefix=\"3b-h2-r1-\",dir=\"/private/tmp\"\)\) | 13:00  4 users, load averages: 10.15 7.61 6.15 | 0 | ffc9a1962d8bee2f99ea1e335788dd09e7f41b0268b2cfef5abea3d50b31fdf6 |
| 077-local-instructions.log | COMMAND: rg --files --hidden -g AGENTS.md -g SKILL.md tui | 13:00  4 users, load averages: 10.15 7.61 6.15 | 0 | 71b733f01a7361422d12e6afaa1f8dd7fcba26580fa014e23834ce5da708a77b |
| 078-protocol-index.log | COMMAND: git -C tui show HEAD:packages/protocol/src/index.ts | 13:00  4 users, load averages: 10.15 7.61 6.15 | 0 | b34604eb28640f0f1fb59868c28bda1a5d2d92ad874d6bc05cc9d7870f555451 |
| 079-storage-index.log | COMMAND: git -C tui show HEAD:packages/storage/src/index.ts | 13:00  4 users, load averages: 10.15 7.61 6.15 | 0 | ac50934f486c29cf052c39ab649791804521c980559a8340c67911893227c41d |
| 080-baseline-final-state.log | COMMAND: git -C tui status -sb | 13:00  4 users, load averages: 10.15 7.61 6.15 | 0 | ee78e317aa6646b00bda1259f3d99d75ecb765c7426f4498694587f5af287050 |
| 081-lock-final-baseline.log | COMMAND: shasum -a 256 tui/bun.lock | 13:00  4 users, load averages: 10.15 7.61 6.15 | 0 | fee34bb1b49b416bf10149a04baed6dad9ac19ad06cff8182815452cb341840b |
| 082-halt-status.log | COMMAND: git -C tui status -sb | 13:02  4 users, load averages: 15.13 11.63 8.11 | 0 | f9f653675df01611b00435e79a70ee07e0f91f609d0022973a4b9cc26b79ce13 |
| 083-halt-untracked.log | COMMAND: git -C tui ls-files --others --exclude-standard | 13:02  4 users, load averages: 15.13 11.63 8.11 | 0 | 22d9244c9640c6874bcb80b7968c937f2652734cee6ebd3d09ba9f18ede896fc |
| 084-halt-head.log | COMMAND: git -C tui rev-parse HEAD | 13:02  4 users, load averages: 15.13 11.63 8.11 | 0 | c5d6d9b2bef055d50937f6931908db3390c333025ed299279ea2cadc27f923d8 |
| 085-halt-diff.log | COMMAND: git -C tui diff --stat a7251235f94dcc4a3149b638a1acdac69236a26d | 13:02  4 users, load averages: 15.13 11.63 8.11 | 0 | dcc047b40c174382a5ba0931e0c243b9e8dbc345ff43a554222e95f5e73ec38c |
| 086-halt-report.log | COMMAND: write H2 halt report and completed-log manifest from session logs | 13:04  4 users, load averages: 10.59 11.18 8.30 | 0 | f9025ec3f1610266b7d024ff714e6c41d0d6235584c1fffe1f71ee56f12ec75e |
| 087-resume-prompt-check.log | COMMAND: shasum -a 256 -c prompt/SHA256.txt | 13:38  4 users, load averages: 7.97 6.50 6.67 | 1 | d4536d178d913b2fd45e0e6b166659700a4023518e7069e1ff20d4e1581bf242 |
| 088-resume-prompt-check.log | COMMAND: sh -c cd\ prompt\ \&\&\ shasum\ -a\ 256\ -c\ SHA256.txt | 14:05  4 users, load averages: 12.01 9.53 8.13 | 0 | 767685aa701700a15dff256efbbc297df92012d3e5c2a731a26fa1661a59e0dd |
| 089-resume-prompt-list.log | COMMAND: ls prompt | 14:05  4 users, load averages: 12.01 9.53 8.13 | 0 | 6c7bc526cf45fb0443813c5f77786cd924b08aa1a71a95387de33444620f7298 |
| 090-resume-prompt-hashes.log | COMMAND: cat prompt/SHA256.txt | 14:05  4 users, load averages: 12.01 9.53 8.13 | 0 | da775d449f9eb42aee9745be16ad28f4b366fc03845374ce0b32320997b38ede |
| 091-resume-version.log | COMMAND: /Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version | 14:05  4 users, load averages: 11.99 9.61 8.18 | 0 | b6c4f6321173e720f47a2d24690b93028f137f85da6e3fc6f72e8b772e053397 |
| 092-resume-head.log | COMMAND: git -C tui rev-parse HEAD | 14:05  4 users, load averages: 11.99 9.61 8.18 | 0 | 5ec322025167e9505979f05118413060a53a681794cb78c7525857119325ae7c |
| 093-resume-branch.log | COMMAND: git -C tui branch --show-current | 14:05  4 users, load averages: 11.99 9.61 8.18 | 0 | 3f7ba44771e10c1abeda92e248c732d88ae5f002fe8b03a482ce495f2a2f8655 |
| 094-resume-status.log | COMMAND: git -C tui status -sb | 14:05  4 users, load averages: 11.99 9.61 8.18 | 0 | 852a173abe2c6f4b7c378422b6c63acb440237b6a9fb2d07af8be605a929fbb0 |
| 095-resume-stash.log | COMMAND: git -C tui stash list | 14:05  4 users, load averages: 11.99 9.61 8.18 | 0 | 66b9d2e8eb3ed067117fffea6d4820c67f58c6305ca8859646fc95066ef11022 |
| 096-resume-pr-list.log | COMMAND: ls pr | 14:05  4 users, load averages: 11.99 9.61 8.18 | 0 | 7f96ce01bd84abe04ba5d1e9fd7e1af7e8e1bcbd0237f0c7e695b17936583605 |
| 097-resume-halt-hashes.log | COMMAND: shasum -a 256 pr/h2-halt-report.md pr/h2-halt-log-manifest.sha256 | 14:05  4 users, load averages: 11.99 9.61 8.18 | 0 | 068188dc7f1e9436153495aa1fc66656f3b25cb61a89c447dea7089aeee8a515 |
| 098-resume-log-check.log | COMMAND: sh -c cd\ logs\ \&\&\ shasum\ -a\ 256\ -c\ ../pr/h2-halt-log-manifest.sha256 | 14:05  4 users, load averages: 11.99 9.61 8.18 | 0 | 54f270537d7d1e3894f659f5311b6493ff626cc1e3b757f49d969d8579ab71cf |
| 099-resume-runtime.log | COMMAND: certification runtime check on second resume | 14:06  up 18 days,  6:14, 4 users, load averages: 10.77 9.43 8.13 | 0 | 3d5984fcd85a983a2ca2c4d18571da167e416f67c12b486b4e0c9c75d38d5b42 |
| 100-resume-scratch.log | COMMAND: python3 -c import\ tempfile\;\ print\(tempfile.mkdtemp\(prefix=\"3b-h2-resume-\",dir=\"/private/tmp\"\)\) | 14:09  4 users, load averages: 9.12 9.25 8.36 | 0 | 9b1b3f5c557033a409399d8664ed07a10b9143c8dda612d2b29d9647f85b1e0d |
| 101-contributing.log | COMMAND: git -C tui show HEAD:CONTRIBUTING.md | 14:09  4 users, load averages: 9.12 9.25 8.36 | 0 | d9936aefd32c38c5391a3d7669fe735151062962aece75bd5da88804e4d85fad |
| 102-open-build-log.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/open-log.py | 14:12  4 users, load averages: 9.99 9.26 8.47 | 0 | da37d080f50aac89384560db757611c5be5b9f78d7e151a963ae7bd0582272fa |
| 103-opening-diff-check.log | COMMAND: git -C tui diff --check | 14:12  4 users, load averages: 9.99 9.26 8.47 | 0 | 0734424f3cf514bcefb75404fb517c3bbe05f56102ca62637204ee9b365c9021 |
| 104-opening-stat.log | COMMAND: git -C tui status -sb | 14:12  4 users, load averages: 9.99 9.26 8.47 | 0 | d1c2f03bfc84bd65e5133b2c093f253a5e950c6e6331a921d456f45470e89270 |
| 105-opening-message-attribution.log | COMMAND: grep -nE \^\(Role-Id\\|Role-Id-Secondary\\|Actor-Id\\|Execution-Surface\): /private/tmp/3b-h2-resume-rlms2sz7/commit-1.txt | 14:12  4 users, load averages: 9.99 9.26 8.47 | 0 | ad346670e5e96661db67272544b03720d5bc06ce3a6e31d716b46f329fe0f5d7 |
| 106-stage-opening.log | COMMAND: git -C tui add docs/verification/phase-3b-h2-build-log.md | 14:21  up 18 days,  6:30, 4 users, load averages: 10.60 9.57 9.09 | 0 | add0789d419b9b8601e0fb3cb09255babadd99628b9028263fe31fd0ea48df54 |
| 107-opening-staged-check.log | COMMAND: git -C tui diff --cached --check | 14:22  4 users, load averages: 11.23 9.80 9.18 | 0 | 55dbb2a85cc4c30efc3bb100f3ff16dd4d9cf43a31ef456ff2bb1ea1076cbca4 |
| 108-opening-secret-scan.log | COMMAND: python3 -c import\ re,\ subprocess,\ sys$'\n'text=subprocess.run\(\[\"git\",\"-C\",\"tui\",\"diff\",\"--cached\",\"-U0\"\],check=True,capture_output=True,text=True\).stdout$'\n'values=re.compile\(r\"BEGIN\ \(\?:RSA\ \\|OPENSSH\ \)\?PRIVATE\\|AKIA\[0-9A-Z\]\{16\}\\|gh\[pousr\]_\[A-Za-z0-9\]\{20,\}\\|github_pat_\[A-Za-z0-9_\]\{20,\}\\|sk-\[A-Za-z0-9-\]\{20,\}\\|xox\[baprs\]-\[A-Za-z0-9-\]\{10,\}\\|glpat-\[A-Za-z0-9_-\]\{20,\}\"\)$'\n'if\ values.search\(text\):$'\n'\ print\(\"STOP:\ staged\ credential-shaped\ value\ detected\;\ content\ suppressed\"\)\;\ sys.exit\(1\)$'\n'policy=re.compile\(r\"password\\|secret\\|api\[_-\]\?key\\|token\",re.I\)$'\n'hits=\[line\ for\ line\ in\ text.splitlines\(\)\ if\ policy.search\(line\)\]$'\n'print\(\"Credential-shaped\ values:\ 0\"\)$'\n'print\(\"Policy-word\ hits:\",len\(hits\)\)$'\n'for\ line\ in\ hits:\ print\(line\)$'\n'print\(\"Classification:\ schema/redaction\ field\ names,\ historical\ sanitized\ facts,\ or\ governance\ prose\;\ no\ credential\ value.\"\) | 14:22  4 users, load averages: 11.23 9.80 9.18 | 0 | 2a5fc8ebbe1448bf70fd9f8a1329e3993807754119652d8939389f62002b02f1 |
| 109-commit-opening.log | COMMAND: git -C tui commit -F /private/tmp/3b-h2-resume-rlms2sz7/commit-1.txt | 14:29  up 18 days,  6:38, 4 users, load averages: 5.89 7.21 8.13 | 0 | e5445745596451e218c97fded3f4adbd017389927c9a48c75315454563cb59f8 |
| 110-opening-commit-identity.log | COMMAND: git -C tui log -1 --format=fuller --format=%H%n%P%n%B | 14:30  4 users, load averages: 8.15 7.72 8.25 | 0 | 3735ae85856cbc600144371a24d7473cb44c005bdfe52f9cac8d188d3a39e72b |
| 111-runtime-protocol-task.log | COMMAND: certification runtime check before protocol task tests | 14:35  up 18 days,  6:44, 4 users, load averages: 5.14 6.48 7.57 | 0 | e1e15a238c081e285571648094d13826dc22c683e813140d453bb738ca9943d8 |
| 112-protocol-red.log | COMMAND: bun test packages/protocol/test/linux-capability-record.test.ts | 15:18  up 18 days,  7:27, 4 users, load averages: 7.50 7.18 7.46 | 1 | 7b82ef7648bb2a47bfd56577e7abeae84618d5daabc30be618f8fb3e7982c9ee |
| 113-protocol-implemented.log | COMMAND: bun test packages/protocol/test/linux-capability-record.test.ts | 15:22  up 18 days,  7:31, 4 users, load averages: 7.30 7.34 7.47 | 0 | 77c0fb4736dc81509154db2df4231899e84323d656c426e5587bb9e1e6e1a836 |
| 114-break-os-name.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/break.py prepare os_name | 15:23  4 users, load averages: 17.25 9.49 8.23 | 0 | 6c9d68aaf2f554fef6a18a21807f4cdd98a42cad12fea21122137d3d65346b1b |
| 115-diff-os-name.log | COMMAND: git -C tui diff --no-index /private/tmp/3b-h2-resume-rlms2sz7/os_name-before.ts /Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts | 15:23  4 users, load averages: 17.25 9.49 8.23 | 1 | 315f65905243babb930e83650f4be19bf4c0f40a5f73f1a042822617fe009ea8 |
| 116-fail-os-name.log | COMMAND: bun test packages/protocol/test/linux-capability-record.test.ts | 15:25  up 18 days,  7:34, 4 users, load averages: 6.50 8.08 7.85 | 1 | f32ab8de514f5af4a87d32ceb583a64692f4e3df9a43357f2bbedfc1a4955384 |
| 117-restore-os-name.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/break.py restore os_name | 15:25  4 users, load averages: 7.11 8.16 7.88 | 0 | 84c13666f9ad8ba69f5fdf006b74ab18545e2414f9fc16ec68e6a2071ef45399 |
| 118-break-os-version.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/break.py prepare os_version | 15:25  4 users, load averages: 7.11 8.16 7.88 | 0 | db912b2e7c610990499ec6eda079a74d3566a0fba7d32fa54de4ed5ab0dc5a72 |
| 119-diff-os-version.log | COMMAND: git -C tui diff --no-index /private/tmp/3b-h2-resume-rlms2sz7/os_version-before.ts /Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts | 15:25  4 users, load averages: 7.11 8.16 7.88 | 1 | 2b4fa4773861c39a75fb85086948805ac5c57b0d6523478702904d8fbf5df956 |
| 120-fail-os-version.log | COMMAND: bun test packages/protocol/test/linux-capability-record.test.ts | 15:28  up 18 days,  7:37, 4 users, load averages: 5.49 7.36 7.61 | 1 | b1d881343da6429c3aa586c7af9a88074309273a86e8b13b7447a4703f1de629 |
| 121-restore-os-version.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/break.py restore os_version | 15:28  4 users, load averages: 5.33 7.27 7.57 | 0 | 9470dbb1c3c5727f515f45a8ffffa9fd0f416fb39110206b477882293d74a60f |
| 122-break-kernel.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/break.py prepare kernel_release | 15:28  4 users, load averages: 5.23 7.21 7.55 | 0 | 8fc6a356cb0a1399b181214214ee3d50ae70347996d9325993727de1acf0a362 |
| 123-diff-kernel.log | COMMAND: git -C tui diff --no-index /private/tmp/3b-h2-resume-rlms2sz7/kernel_release-before.ts /Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts | 15:28  4 users, load averages: 5.23 7.21 7.55 | 1 | d0972858ddce6488fbf3eaa953b9770c106690193e93cfe4326b3a65ff5cf378 |
| 124-fail-kernel.log | COMMAND: bun test packages/protocol/test/linux-capability-record.test.ts | 15:35  up 18 days,  7:44, 4 users, load averages: 15.55 9.86 8.52 | 1 | fef3b5e802d3c982c1732d1894f24481ec3f56480f1b53eaa0df483d6bcd1ac1 |
| 125-restore-kernel.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/break.py restore kernel_release | 15:35  4 users, load averages: 15.19 9.88 8.54 | 0 | 3804df481730d598133cdfabcd9f8d54617c42cee58fa8697b24c8af2f2e43d5 |
| 126-break-binary.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/break.py prepare binary | 15:35  4 users, load averages: 15.19 9.88 8.54 | 0 | 1c15fdc2c2dcea8478c5dab40cb4ebaac3abbf90ff84399afb9b6dccd2d3d565 |
| 127-diff-binary.log | COMMAND: git -C tui diff --no-index /private/tmp/3b-h2-resume-rlms2sz7/binary-before.ts /Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts | 15:35  4 users, load averages: 15.19 9.88 8.54 | 1 | a8ca7778cef8cb6fea6eff8322b18aa6a89cf0009d1e2527b219136c7fbdc3d0 |
| 128-fail-binary.log | COMMAND: bun test packages/protocol/test/linux-capability-record.test.ts | 15:38  up 18 days,  7:46, 4 users, load averages: 8.31 8.92 8.33 | 1 | aa16baf346313bda9fe8e35c3f4cd7998ca605ca352a99ab638b0986eafc7c71 |
| 129-restore-binary.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/break.py restore binary | 15:38  4 users, load averages: 8.00 8.84 8.31 | 0 | b6bf9aec30ff04e042420939d2ee7ac4cda219a6a94f63b74a0ecb7d02cf22cf |
| 130-break-macos.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/break.py prepare macos | 15:38  4 users, load averages: 8.00 8.84 8.31 | 0 | 6ed81223c59b3e498deddeba6f4a9a0edc9e886c92c4126a03f49745c1eacf35 |
| 131-diff-macos.log | COMMAND: git -C tui diff --no-index /private/tmp/3b-h2-resume-rlms2sz7/macos-before.ts /Users/michaeldaley/builds/h2-r1/tui/packages/protocol/src/capability-record.ts | 15:38  4 users, load averages: 8.00 8.84 8.31 | 1 | 3781417799b7bbe9ec232a9c23879592eaa2e58f900d62cd7010e85d55dda0a6 |
| 132-fail-macos.log | COMMAND: bun test packages/protocol/test/linux-capability-record.test.ts | 15:47  up 18 days,  7:56, 4 users, load averages: 12.23 9.77 8.73 | 1 | ee4a16d0778531c4547197df43aba4f1394002ac1a53eb049b47498abb3ae83a |
| 133-restore-macos.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/break.py restore macos | 15:47  4 users, load averages: 12.61 9.89 8.78 | 0 | 60a6dc4b4c25961fa6eee4660db37a7e96fb8edf56709c56e0372b658df0a721 |
| 134-protocol-package.log | COMMAND: bun test packages/protocol | 16:06  up 18 days,  8:15, 4 users, load averages: 8.58 8.59 8.68 | 0 | c31dba72b55b7b0ce02925ac3f05a061fe3de6f4dffb4053e4eb60c1b259a57c |
| 135-protocol-typecheck.log | COMMAND: bunx tsc --noEmit | 16:13  up 18 days,  8:22, 4 users, load averages: 7.83 8.59 8.65 | 2 | 70f0de32faf42880460c55462826b40f6a7c4a9a68799c7e3a8ca244f675cbe5 |
| 136-protocol-typecheck-fixed.log | COMMAND: bunx tsc --noEmit | 16:22  up 18 days,  8:31, 4 users, load averages: 7.34 8.08 8.41 | 0 | e5f99202ad5ff7da44f94bb3b54ac81a7b1052dc02e7cffb158a47a827fc3cd4 |
| 137-protocol-package-fixed.log | COMMAND: bun test packages/protocol | 16:47  up 18 days,  8:56, 4 users, load averages: 11.94 11.22 9.35 | 0 | 18b2f22e2128cf85818ea5f6974a2bdd922a8788eac0c349c2a0bc24cf705e0a |
| 138-protocol-diff.log | COMMAND: git -C tui diff -- packages/protocol/src/capability-record.ts packages/protocol/src/index.ts | 16:48  4 users, load averages: 9.18 10.61 9.22 | 0 | 56d8fbb594279895a4a3d1e886cc57abb245cc5208547f9fb0267d50f8f18ddd |
| 139-protocol-diff-check.log | COMMAND: git -C tui diff --check | 16:48  4 users, load averages: 9.18 10.61 9.22 | 0 | f6fe8f450b058fbb9b4f35a58f5f30da8024f227869aaa618592208f8a29e651 |
| 140-protocol-message.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/prepare-commit.py 2 | 16:48  4 users, load averages: 9.18 10.61 9.22 | 0 | 783ac2a1d021cebd4a17ca4a056c1907e621585c1c594db5ad123e947f48e6b3 |
| 141-protocol-attribution.log | COMMAND: grep -nE \^\(Role-Id\\|Role-Id-Secondary\\|Actor-Id\\|Execution-Surface\): /private/tmp/3b-h2-resume-rlms2sz7/commit-2.txt | 16:48  4 users, load averages: 9.18 10.61 9.22 | 0 | 7e9d59dbeb7c7753a34c210c76db3ab3aea6cf19755e814a848341d78e6ff126 |
| 142-stage-protocol.log | COMMAND: git -C tui add packages/protocol/src/capability-record.ts packages/protocol/src/index.ts packages/protocol/test/linux-capability-record.test.ts | 16:52  up 18 days,  9:01, 4 users, load averages: 11.34 11.77 10.10 | 0 | bc25a8f0c53065fe182dbeb7f11581755a3a1541308964bb492d17c836751fe4 |
| 143-protocol-secret-scan.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/secret-scan.py | 16:52  4 users, load averages: 10.65 11.61 10.06 | 0 | fb16695948d27703e64964eb2bc75230fa4a7a771ef02617ffadf65e7321752d |
| 144-protocol-staged-check.log | COMMAND: git -C tui diff --cached --check | 16:52  4 users, load averages: 10.65 11.61 10.06 | 0 | d38027fab57c46bd0b1ea41fbd29a40a8581fe7eda692f8fe4ab5043b3117151 |
| 145-commit-protocol.log | COMMAND: git -C tui commit -F /private/tmp/3b-h2-resume-rlms2sz7/commit-2.txt | 16:52  up 18 days,  9:01, 4 users, load averages: 11.66 11.79 10.15 | 0 | 9ac69df3b6a885d18b6d7980ea137ce11fce668446eb9dd62f3fea04628f446a |
| 146-protocol-commit-identity.log | COMMAND: git -C tui log -1 --format=%H%n%P%n%B | 16:54  5 users, load averages: 12.94 12.81 10.79 | 0 | 85a962440e3f97da15350b370768c59dcbda83f0c57e7d1c5644e1591400e002 |
| 147-runtime-storage-task.log | COMMAND: certification runtime check before storage task tests | 16:55  up 18 days,  9:04, 5 users, load averages: 10.76 12.28 10.67 | 0 | 9061d3453701614a7f15cb3e1ce1f54fe2f6747707ed519490c6ed9ce77ed76b |
| 148-storage-red.log | COMMAND: bun test packages/storage/test/linux-capability-store.test.ts | 16:55  up 18 days,  9:04, 5 users, load averages: 9.72 12.00 10.59 | 1 | 5a9eaaf341da497dd6f5ec655f5abbbbe3b908a7065f0fb3f80bdb83a68155ad |
| 149-storage-implemented.log | COMMAND: bun test packages/storage/test/linux-capability-store.test.ts | 16:55  up 18 days,  9:04, 5 users, load averages: 10.84 12.00 10.64 | 0 | 45d3bebfc66892fc3b641ec34b8ad7280bcb2bcb6f24fcb4e8941ef77851c10e |
| 150-break-retention.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/break.py prepare retention | 16:56  5 users, load averages: 12.66 12.35 10.78 | 0 | e7882940c9227908c4a55d44ff32d5a101c7c0209b844552dbf7e4257ccfcc64 |
| 151-diff-retention.log | COMMAND: git -C tui diff --no-index /private/tmp/3b-h2-resume-rlms2sz7/retention-before.ts /Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts | 16:56  5 users, load averages: 12.66 12.35 10.78 | 1 | 3214d6f4b6e54dba3b6206cb4ea80b5fb993dd1753641adeed7c48aa16239dd8 |
| 152-third-resume-prompt-check.log | COMMAND: sh -c cd\ prompt\ \&\&\ shasum\ -a\ 256\ -c\ SHA256.txt | 17:18  5 users, load averages: 13.12 10.36 9.61 | 0 | 109725a344ba44ef85a0a4ce1e1b71d606517a3104c7a055513300b21eec5e68 |
| 153-third-resume-prompt-list.log | COMMAND: ls prompt | 17:18  5 users, load averages: 13.12 10.36 9.61 | 0 | 90f9bcf65d5a15119ea936bbf538c7a9fdc6c2c5811eecf267b1b66160545fcf |
| 154-third-resume-addendum.log | COMMAND: cat prompt/DEC-20261112-03-addendum-1-resumed-session.md | 17:18  5 users, load averages: 13.12 10.36 9.61 | 0 | 10093023c74ccdfdd40b5e7b031202e26eef98542192b6c741f1051845d9cab9 |
| 155-third-resume-hashes.log | COMMAND: cat prompt/SHA256.txt | 17:18  5 users, load averages: 13.12 10.36 9.61 | 0 | fe9aa45b5cc65e7d9d82758462ca463618e97b96d118d2351a8fec9270e90e54 |
| 156-third-resume-version.log | COMMAND: /Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version | 17:18  5 users, load averages: 12.44 10.32 9.61 | 0 | b1c82f012f26d275044896497b321b9700a0cb62cd3e9c1a1ded39cade86a767 |
| 157-third-resume-ancestry.log | COMMAND: git -C tui rev-parse HEAD HEAD\^ HEAD\^\^ | 17:18  5 users, load averages: 12.44 10.32 9.61 | 0 | 41349609dfd44b256c0d89b153010e5e7ffcee3eb0533b989e9559fe078cc03c |
| 158-third-resume-branch.log | COMMAND: git -C tui branch --show-current | 17:18  5 users, load averages: 12.44 10.32 9.61 | 0 | bbe959f2c5423bedaa10105ac70c403b96a260bebd058599c459ccf36cc6f3e9 |
| 159-third-resume-status.log | COMMAND: git -C tui status --porcelain --untracked-files=all | 17:18  5 users, load averages: 12.44 10.32 9.61 | 0 | 83f5948bbc08c52001ae5ce88fa19ff2b4850d926f92b6923c1036e0851a6672 |
| 160-third-resume-stash.log | COMMAND: git -C tui stash list | 17:18  5 users, load averages: 12.44 10.32 9.61 | 0 | df3f829fa6e839251637456839cb5b442083b0331f425026e22d57de18ef713d |
| 161-third-resume-copy-hash.log | COMMAND: shasum -a 256 /private/tmp/3b-h2-resume-rlms2sz7/retention-before.ts | 17:18  5 users, load averages: 12.44 10.32 9.61 | 0 | 2d5e974104c5fd7ed234fbc20597a55d5fdb19befdd75ab2e629f73bf91dfea5 |
| 162-third-resume-break-diff.log | COMMAND: git -C tui diff --no-index /private/tmp/3b-h2-resume-rlms2sz7/retention-before.ts /Users/michaeldaley/builds/h2-r1/tui/packages/storage/src/capability-store.ts | 17:18  5 users, load averages: 12.44 10.32 9.61 | 1 | 363e37d98499b21611d431a14767f82f21af302b487361dc712e6cf66206418b |
| 163-third-resume-pr-list.log | COMMAND: ls pr | 17:18  5 users, load averages: 12.32 10.33 9.61 | 0 | 9931a0d5810606cccff5d121f58efc5e1ab6986498f6bd507eea0ac481aeed4b |
| 164-third-resume-pr-hashes.log | COMMAND: shasum -a 256 pr/h2-halt-report.md pr/h2-halt-log-manifest.sha256 | 17:18  5 users, load averages: 12.32 10.33 9.61 | 0 | f5d309d2efdb88cda7290be1e6920b2a761d7b8625a304c1cf8a0832719fc03f |
| 165-third-resume-runtime.log | COMMAND: certification runtime check on third resume | 17:19  up 18 days,  9:28, 5 users, load averages: 9.92 9.92 9.48 | 0 | e8e7445bde281e4dd654aba6d3f719111c555dfbe0939ee05f7bc7c156a012c4 |
| 166-fail-retention.log | COMMAND: bun test packages/storage/test/linux-capability-store.test.ts | 17:19  up 18 days,  9:28, 5 users, load averages: 9.95 9.92 9.49 | 1 | 793d32e7f8b4acbc5d867ac2b08027373a6873c349eac9bd9ac4e18143d4eb3f |
| 167-restore-retention.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/break.py restore retention | 17:19  5 users, load averages: 9.79 9.89 9.48 | 0 | 586b8571669ad6ba3cb034f3d3b53832cccd2be128fddd1813692443c10fd63a |
| 168-storage-package.log | COMMAND: bun test packages/storage | 17:24  up 18 days,  9:33, 5 users, load averages: 6.55 7.33 8.42 | 0 | 0611f93ba72ea5928c4536f68a9f4324b3bf21e275949f4394b41f6de130596a |
| 169-storage-typecheck.log | COMMAND: bunx tsc --noEmit | 17:24  up 18 days,  9:33, 5 users, load averages: 8.19 7.62 8.50 | 0 | aff4e775125c65fe42acd38045c50a73551b225287ff4381ec59b9327120b159 |
| 170-storage-diff.log | COMMAND: git -C tui diff -- packages/storage/src/capability-store.ts packages/storage/src/index.ts | 17:25  5 users, load averages: 6.65 7.27 8.33 | 0 | 1620532888166ec882b794e6f54e6a464f85806f9ab3a30f5d5b6e355a203454 |
| 171-storage-scope.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/scope-check.py | 17:25  5 users, load averages: 6.65 7.27 8.33 | 0 | 506c2eafa8166af5b2848d3ef93e233aa4e2aaa782e9c67be9942e3ae1d02af7 |
| 172-storage-message.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/prepare-commit.py 3 | 17:25  5 users, load averages: 6.65 7.27 8.33 | 0 | f25f49d882e837d62eb1b7f3fcaeedbde263d200dd69a841b49fb84dbe851a27 |
| 173-storage-attribution.log | COMMAND: grep -nE \^\(Role-Id\\|Role-Id-Secondary\\|Actor-Id\\|Execution-Surface\): /private/tmp/3b-h2-resume-rlms2sz7/commit-3.txt | 17:25  5 users, load averages: 6.65 7.27 8.33 | 0 | 607f2e818d5aae9178d0feaaed597e92fa435ee8893a7183283cff64b370d07f |
| 174-build-gate-skill.log | COMMAND: cat tui/.agents/skills/build-gate/SKILL.md | 17:25  5 users, load averages: 6.12 7.15 8.28 | 0 | 5d8f5745383780aeb7f14848be6c1ed8bcd0dcc59a4bf1aacf43e9b0c9d5a89b |
| 175-stage-storage.log | COMMAND: git -C tui add packages/storage/src/capability-store.ts packages/storage/src/index.ts packages/storage/test/linux-capability-store.test.ts | 17:29  up 18 days,  9:38, 5 users, load averages: 7.91 7.16 7.91 | 0 | fb8ab3063e3dc8e21f45cf8e536aab2a1d562203e8fdc4d5c49e9ce9d9d2b5be |
| 176-storage-secret-scan.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/secret-scan.py | 17:30  5 users, load averages: 7.92 7.17 7.91 | 0 | ee6038242b9374bca9c0f199b9c6c3861f211135f8932a1a33226295a8a7be32 |
| 177-storage-staged-check.log | COMMAND: git -C tui diff --cached --check | 17:30  5 users, load averages: 7.92 7.17 7.91 | 0 | 90c536c514c860251cad7726a482a356160b1e919b1e67c9bb8e4ba324fac6ef |
| 178-commit-storage.log | COMMAND: git -C tui commit -F /private/tmp/3b-h2-resume-rlms2sz7/commit-3.txt | 17:30  up 18 days,  9:39, 5 users, load averages: 9.41 7.54 8.02 | 0 | 9ccc90b7cfe3142231b7e4a473d644a35ddbad2f4e5bc3e012dea2ec87207e3f |
| 179-storage-commit-identity.log | COMMAND: git -C tui log -1 --format=%H%n%P%n%B | 17:30  5 users, load averages: 9.41 7.54 8.02 | 0 | 4937ed582a73ae75ba5366b087980b833d2089c05dbd867cafa704c26cfede33 |
| 180-gate-runtime.log | COMMAND: certification runtime check before first gate | 17:30  up 18 days,  9:39, 5 users, load averages: 8.07 7.33 7.94 | 0 | 88459fab45c3002c18d976f417039ae5ef02e8a4a69371bea2acf8fee2a33d0a |
| 181-gate-typecheck.log | COMMAND: bunx tsc --noEmit | 17:34  up 18 days,  9:43, 5 users, load averages: 4.80 6.14 7.29 | 0 | 60119e97f5453f831f0473553130ebb5390689b1b9ede46d81f08e183103a6b4 |
| 182-gate-protocol.log | COMMAND: bun test packages/protocol | 17:38  up 18 days,  9:47, 5 users, load averages: 5.81 6.08 6.99 | 0 | 41bdbc21ebf2a1789611f97fe429e385a160a56ead5a86d82edbb59cfe58ac27 |
| 183-gate-storage.log | COMMAND: bun test packages/storage | 17:42  up 18 days,  9:50, 5 users, load averages: 8.30 7.66 7.49 | 0 | 7c0177685d15e9800d5f174bac4bbe07b440730fb97d735fd31398d47cf5f480 |
| 184-gate-evidence.log | COMMAND: bun test test/phase3a/evidence-pipeline.test.ts | 17:42  up 18 days,  9:51, 5 users, load averages: 7.45 7.49 7.43 | 0 | 75728cc0488e2b430e759269e6daad6e8f97eddf2c69ae07dafff01f43d292bc |
| 185-gate-phase3a.log | COMMAND: bun test test/phase3a | 17:45  up 18 days,  9:54, 5 users, load averages: 8.90 7.75 7.53 | 0 | e151574976b3bb76f20a88e145a99ece6ee77820f0a957126ab0259ff327dd73 |
| 186-gate-runtime-before-full.log | COMMAND: certification runtime check immediately before gate bare bun test | 17:48  up 18 days,  9:57, 5 users, load averages: 9.28 7.60 7.45 | 0 | f1ca269598368f20d8cc1da9450022485de003865fe8ec3344a98c3175194de5 |
| 187-gate-full.log | COMMAND: bun test | 17:49  up 18 days,  9:58, 5 users, load averages: 5.88 6.96 7.22 | 1 | 131824f50b8fb71f613fe0e270f405d7de63706ad44c707de33437c9854537b2 |
| 188-gate-halt-status.log | COMMAND: git -C tui status -sb | 17:54  5 users, load averages: 7.58 7.85 7.61 | 0 | bc5aac0620d9c5dc4ff1da20486b0541a1dd0033a29a0f727a3df9286b2c7193 |
| 189-gate-halt-commits.log | COMMAND: git -C tui log --reverse --format=%H%n%P%n%B a7251235f94dcc4a3149b638a1acdac69236a26d..HEAD | 17:54  5 users, load averages: 7.58 7.85 7.61 | 0 | 8e4fbfa8c18d1aa7140d71fb2e0b80ea7d1a885534f28fb74fa63c24cbdb92f4 |
| 190-gate-halt-stat.log | COMMAND: git -C tui diff --stat a7251235f94dcc4a3149b638a1acdac69236a26d | 17:54  5 users, load averages: 7.58 7.85 7.61 | 0 | e32befabe3e3e5b962ce1011dd8811b43048bbeb665ac08ea6029fad32a3059d |
| 191-gate-halt-code-diff.log | COMMAND: git -C tui diff a7251235f94dcc4a3149b638a1acdac69236a26d -- packages/protocol/src/capability-record.ts packages/protocol/src/index.ts packages/protocol/test/linux-capability-record.test.ts packages/storage/src/capability-store.ts packages/storage/src/index.ts packages/storage/test/linux-capability-store.test.ts | 17:54  5 users, load averages: 7.58 7.85 7.61 | 0 | c366d25b97c5856930a6220ceff6074001a195ca3d7f0de06da6ebadc6ef4c7a |
| 192-gate-halt-file-hashes.log | COMMAND: shasum -a 256 tui/packages/protocol/src/capability-record.ts tui/packages/storage/src/capability-store.ts tui/docs/verification/phase-3b-h2-build-log.md pr/h2-halt-report.md pr/h2-halt-log-manifest.sha256 | 17:54  5 users, load averages: 7.58 7.85 7.61 | 0 | 19081fa496e17f70722d1eb704ac99cccc8c01be3d17c0797b5f8c8a2c332163 |
| 193-gate-halt-untracked.log | COMMAND: git -C tui ls-files --others --exclude-standard | 17:54  5 users, load averages: 7.58 7.85 7.61 | 0 | dadc518a6ca08b86a350b10c9a917d773bc9bda19fc5341b0f4a72434f4eefaf |
| 194-gate-halt-report.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/gate-halt-report.py | 17:57  5 users, load averages: 5.96 7.06 7.33 | 0 | 6e46179052f9b6f45f97ca973ce3ec9bdc56e1b5b866480d5017a7a40c3bdd53 |
| 195-fourth-resume-prompt-check.log | COMMAND: sh -c cd\ prompt\ \&\&\ shasum\ -a\ 256\ -c\ SHA256.txt | 18:05  5 users, load averages: 8.99 8.04 7.59 | 0 | acee3bd456dfa3b9a79f25505b94a1cbdea7908a2dbc74c8801011486ad54c2d |
| 196-fourth-resume-prompt-list.log | COMMAND: ls prompt | 18:05  5 users, load averages: 8.99 8.04 7.59 | 0 | 45cd7f6b206240ea42ae0a5511a6d9bfe2c482a31e024e2b64e44fd84f3b4135 |
| 197-fourth-resume-addendum.log | COMMAND: cat prompt/DEC-20261112-03-addendum-2-gate-repeat.md | 18:05  5 users, load averages: 8.99 8.04 7.59 | 0 | 69b8448bfc7afbca4fbd49924b15a33c079b8727bf71f425c06ac3476d868691 |
| 198-fourth-resume-hashes.log | COMMAND: cat prompt/SHA256.txt | 18:05  5 users, load averages: 8.99 8.04 7.59 | 0 | 4b51f56326ace083d1e55102150848b392f83b40768f38736f2f7f25f3d21504 |
| 199-fourth-resume-version.log | COMMAND: /Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version | 18:06  5 users, load averages: 9.42 8.29 7.71 | 0 | bf98eec8917a173c7816f96877c05edd639da74c3d0dfec2193193b800e832bb |
| 200-fourth-resume-ancestry.log | COMMAND: git -C tui rev-parse HEAD HEAD\^ HEAD\^\^ HEAD\^\^\^ | 18:06  5 users, load averages: 9.42 8.29 7.71 | 0 | 479ddac3e68d07f9d4bb20deb02b8ae5fdc7d97ab25d46ae93196255691fe4fc |
| 201-fourth-resume-branch.log | COMMAND: git -C tui branch --show-current | 18:06  5 users, load averages: 9.42 8.29 7.71 | 0 | c2fbacfdf63eb90ed69e56edb3d7f59731f930e6da565299c0f76b909ef54532 |
| 202-fourth-resume-status.log | COMMAND: git -C tui status --porcelain --untracked-files=all | 18:06  5 users, load averages: 9.42 8.29 7.71 | 0 | 4cd7347874fbb03330a241358b254d3c2ed56d4b627f9bb052c992d7cbbfdc93 |
| 203-fourth-resume-stash.log | COMMAND: git -C tui stash list | 18:06  5 users, load averages: 9.42 8.29 7.71 | 0 | 1097f41699338787de45b4bfad53a1a6a8c8aca2e4645a92ecb5c090ab31c83c |
| 204-fourth-resume-pr-list.log | COMMAND: ls pr | 18:06  5 users, load averages: 9.42 8.29 7.71 | 0 | afc10f22ad2007675cc0453ed24a05df7849c9174acfe0b3e71dce3cfe3468ff |
| 205-fourth-resume-pr-hashes.log | COMMAND: shasum -a 256 pr/h2-halt-report.md pr/h2-halt-log-manifest.sha256 pr/h2-gate-halt-report.md pr/h2-gate-halt-log-manifest.sha256 | 18:06  5 users, load averages: 9.42 8.29 7.71 | 0 | 060f6edb68184dfadab36ea1b69e84f7c6c000727dd79081631da3ee1da8c39b |
| 206-fourth-resume-runtime.log | COMMAND: certification runtime check on fourth resume | 18:08  up 18 days, 10:17, 5 users, load averages: 7.24 7.97 7.66 | 0 | 95e99afd6e37653a3c5da8a632d18ce7d327fd8b6719724929a1da3020f12edc |
| 207-create-wait-scripts.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/make-waits.py | 18:09  5 users, load averages: 6.59 7.70 7.57 | 0 | 772b7700c89335d60229c27dad7ac3503c1d3e5406ef8d61bf309f51e173a94b |
| 208-repeat-gate-runtime.log | COMMAND: certification runtime check before repeated gates | 18:10  up 18 days, 10:19, 5 users, load averages: 7.13 7.54 7.51 | 0 | 30231588988477436a83a59bc3a5159fd241dbeeec7528bb3ff411b4c929cc76 |
| 209-wait-typecheck.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/wait-typecheck.py | 18:10  5 users, load averages: 7.30 7.57 7.52 | 75 | 03e218297291f105739f0f6f14a7d0453162f470812b453056d157cd641659d1 |
| 210-attribution-script-read.log | COMMAND: cat tui/.github/scripts/attribution-shape-check.sh | 18:10  5 users, load averages: 6.85 7.46 7.48 | 0 | 196e654fcbb2b5df3c43f4346c21836cf82729583f2c23ffe2beb945b36b9e53 |
| 211-attribution-body-mode-read.log | COMMAND: sed -n 330,465p tui/.github/scripts/attribution-shape-check.sh | 18:11  5 users, load averages: 6.03 7.18 7.38 | 0 | c0e4985248a1db9c854d4ec145493866c43a057af1def56767c8a0f747053b34 |
| 212-wait-typecheck-again.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/wait-typecheck.py | 18:31  up 18 days, 10:40, 1 user, load averages: 5.14 5.46 6.25 | 75 | bf3acc14c8ddbb3f75547245263a5e3609212b99bc90a2040d51b0a4af4b6103 |
| 214-review-completion-helpers.log | COMMAND: sed -n 1,260p /private/tmp/3b-h2-resume-rlms2sz7/complete-log.py | 18:40  1 user, load averages: 6.10 6.10 6.22 | 0 | 06e6f1c6a84986071e9ae8a0df45e8bf009acad01d92e1ee5809822bdbe2868f |
| 215-review-pr-helper.log | COMMAND: sed -n 1,280p /private/tmp/3b-h2-resume-rlms2sz7/prepare-pr.py | 18:40  1 user, load averages: 6.73 6.23 6.27 | 0 | b778cc86a34d3a5d7c0691a1ef9fa36f1a97b4b482cdb88a96c4ce9a52df0916 |
| 216-review-final-report-helper.log | COMMAND: sed -n 1,250p /private/tmp/3b-h2-resume-rlms2sz7/final-report.py | 18:41  1 user, load averages: 6.06 5.94 6.14 | 0 | a1b2a32a59346e26e31fdc4b48a074799711a5c81adf90fd8bddba2c45be7c70 |
| 217-review-evidence-helper.log | COMMAND: sed -n 1,230p /private/tmp/3b-h2-resume-rlms2sz7/evidence.py | 18:42  1 user, load averages: 4.14 5.46 5.96 | 0 | 1dd10d989039daa951f68e9b5153909c4ee1569a65bfd7f2f2b0be250e458d38 |
| 218-review-test-mapping.log | COMMAND: python3 -c import\ sys\;\ sys.path.insert\(0,\ \"/private/tmp/3b-h2-resume-rlms2sz7\"\)\;\ from\ evidence\ import\ test_rows\;\ print\(\"\\n\".join\(\"\ \\|\ \".join\(row\)\ for\ row\ in\ test_rows\(\)\)\) | 18:47  1 user, load averages: 5.27 5.65 5.91 | 0 | c10575339bbbfbdb2ee360bb9f7aa2cf1d1325e39023f8a53c0ac1a0c0dbdc1f |
| 219-wait-typecheck-again-2.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/wait-typecheck.py | 19:20  up 18 days, 11:29, 1 user, load averages: 1.18 1.72 3.09 | 0 | 0f1a977c4171bf1f032202c4211eec247a7b7b145479ac8247a328e194b22646 |
| 220-repeat-gate-typecheck.log | COMMAND: bunx tsc --noEmit | 19:20  up 18 days, 11:29, 1 user, load averages: 1.18 1.72 3.09 | 0 | 9116a02a2336230c065aeb65a5de7ec42a10973a9d643e862cb64e02c4ec7db7 |
| 221-wait-protocol.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/wait-protocol.py | 19:20  up 18 days, 11:29, 1 user, load averages: 1.30 1.71 3.04 | 0 | 1c4f659d72a28560719a33e9e1444cabb946f2899b540dd87acfef0021a38677 |
| 222-repeat-gate-protocol.log | COMMAND: bun test packages/protocol | 19:20  up 18 days, 11:29, 1 user, load averages: 1.30 1.71 3.04 | 0 | 200e8bed5d0649c07ed23007bcb2586e7769294bdca11af45b5d6206d8728cfe |
| 223-wait-storage.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/wait-storage.py | 19:20  up 18 days, 11:29, 1 user, load averages: 1.40 1.72 3.03 | 0 | 56f7a89f87e7abd7c86e2a61615cfe682b1973cf8dbe7e6269d039cd64369815 |
| 224-repeat-gate-storage.log | COMMAND: bun test packages/storage | 19:20  up 18 days, 11:29, 1 user, load averages: 1.40 1.72 3.03 | 0 | 369bece235ab324ccf0f8b737934a8170fc16aab1321fe8400926b9c32b65cfe |
| 225-wait-evidence.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/wait-evidence.py | 19:20  up 18 days, 11:29, 1 user, load averages: 1.41 1.71 3.01 | 0 | 35e6591d13915f2e2dd145f66cf1eae2f7a79e363f2a9e8146b5a00d756edf8a |
| 226-repeat-gate-evidence.log | COMMAND: bun test test/phase3a/evidence-pipeline.test.ts | 19:20  up 18 days, 11:29, 1 user, load averages: 1.41 1.71 3.01 | 0 | 355035fd542301833d12cb306793e16daaf2887d11ce587b56a97d705ec737df |
| 227-wait-phase3a.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/wait-phase3a.py | 19:21  up 18 days, 11:30, 1 user, load averages: 1.14 1.62 2.94 | 0 | 6fb18d7fdb3199e56ebbd7b13d7ff2891754084648ada4708ef11555f1a58a35 |
| 228-repeat-gate-phase3a.log | COMMAND: bun test test/phase3a | 19:21  up 18 days, 11:30, 1 user, load averages: 1.14 1.62 2.94 | 0 | d012621e7d6e87b6a0bc0cbf631a129f396dbfaf8ee4749d5003e7c5bb84501f |
| 229-wait-full.log | COMMAND: python3 /private/tmp/3b-h2-resume-rlms2sz7/wait-full.py | 19:22  1 user, load averages: 1.86 1.74 2.88 | 0 | 54c30315ceac31fa4fee6d8d82c5b20890ab7f7dbb15a151bafe153977c19bfa |
| 230-repeat-runtime-before-full.log | COMMAND: certification runtime check before repeated bare bun test | 19:22  up 18 days, 11:31, 1 user, load averages: 1.89 1.75 2.87 | 0 | 87736448209c845da98daedf215ef7ed69731fec74eb419694b2b8975a62f306 |
| 231-repeat-gate-full.log | COMMAND: bun test | 19:22  up 18 days, 11:31, 1 user, load averages: 1.74 1.72 2.85 | 0 | c35daf427d127250eb4aacba0392a6dcf748c09c20c2b0ee8e541b1f99c4e892 |

111-runtime-protocol-task.log; SHA-256 e1e15a238c081e285571648094d13826dc22c683e813140d453bb738ca9943d8

~~~~~~~~
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
~~~~~~~~

147-runtime-storage-task.log; SHA-256 9061d3453701614a7f15cb3e1ce1f54fe2f6747707ed519490c6ed9ce77ed76b

~~~~~~~~
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
~~~~~~~~

165-third-resume-runtime.log; SHA-256 e8e7445bde281e4dd654aba6d3f719111c555dfbe0939ee05f7bc7c156a012c4

~~~~~~~~
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
~~~~~~~~

180-gate-runtime.log; SHA-256 88459fab45c3002c18d976f417039ae5ef02e8a4a69371bea2acf8fee2a33d0a

~~~~~~~~
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
~~~~~~~~

186-gate-runtime-before-full.log; SHA-256 f1ca269598368f20d8cc1da9450022485de003865fe8ec3344a98c3175194de5

~~~~~~~~
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
~~~~~~~~

206-fourth-resume-runtime.log; SHA-256 95e99afd6e37653a3c5da8a632d18ce7d327fd8b6719724929a1da3020f12edc

~~~~~~~~
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
~~~~~~~~

208-repeat-gate-runtime.log; SHA-256 30231588988477436a83a59bc3a5159fd241dbeeec7528bb3ff411b4c929cc76

~~~~~~~~
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
~~~~~~~~

230-repeat-runtime-before-full.log; SHA-256 87736448209c845da98daedf215ef7ed69731fec74eb419694b2b8975a62f306

~~~~~~~~
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
~~~~~~~~
