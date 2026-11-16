# Phase 3B M0 build log

## Opening: binding and authority

Phase 1 is offline under DEC-20261115-02 B2-B7 and B15 item 1.
Main when work began: c0c0c31f1489de0378f8ce0726238b4e9603a84c.
Branch: build/3b-m0-r1.
Binding base: 0825a1e349ca5ea6427eea5f2de79dff234dc8f7.
Actor: session:codex/3b-m0-r1; role builder; execution surface codex.
Commission SHA-256:
5d8bd4a446d8b3120bddbc34dc11a5fdf83e3a07d9efcd04fbd7b8efdad8d22b.
Addendum 1 SHA-256:
31576960c18a4c9607fca2785e54146df5f740af45b4437dc7f13890abaeca42.
Addendum 2 SHA-256:
a6512b4ad4cadb10f014256922bd09efd4d1eb9d65d0a8e4c91102f4f4ca60a0.
First resume message SHA-256:
41ea2ae2e3d45842c77d8594040d866050ddd2334f1f9a38c47ff7a74bd11536.
Builder prompt SHA-256:
286664ccb06fc164d7c939dba2f3fa3498793bdb84e0ee9ea51f986855f88824.

## Identity

The initial message reported harness Codex and model label GPT-6, made by
OpenAI. Exact model snapshot, effort, session identifier, session-metadata
CLI version and approvals reviewer were not shown. These are reported
labels, not machine-verifiable resolved model IDs. The Founder will check
the session record under DEC-20261112-02 B2 and B5.
Agent task identifier /root; collaboration mode Default; shell zsh;
date initially shown 2026-11-15; time zone America/New_York.
Sandbox workspace-write; approval on-request; network restricted.
No MCP server shown, and the Founder confirmed none loaded.
The resume turn again showed workspace-write and on-request.

Visible names: functions with wait, request_user_input,
request_user_input_async and exec; inside exec apply_patch, exec_command,
write_stdin, clock__curr_time and the six names of Addendum 2 B4 where
applicable; clock with sleep; collaboration with followup_task,
interrupt_agent, list_agents, send_message, wait_agent and the six names
of Addendum 2 B4 where applicable. The deferred namespace is represented
by the six names of Addendum 2 B4; its tools are not individually shown.
No extra namespace, web, image-generation/editing or goal tool was shown.
No barred tool was called. No exec input contained the six names of
Addendum 2 B4. No memory lookup or earlier session record was read.

The governed build printed, verbatim:

```text
WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0
```

The command exited 0. The same warning and final version line appeared
in resume log 066. No PATH alias or host setting was changed.
Git identity: daley40-lab,
293512385+daley40-lab@users.noreply.github.com.
pwd was /Users/michaeldaley/builds/m0-r1.

Runtime checks 007, 068 and 085 passed: bun and bunx resolved under
/Users/michaeldaley/.bun/bin; Bun 1.4.2; revision
744846f844374847c902b5e7fd59b4342a51ef99; executable SHA-256
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5.
Each Bun command was escalated from its first run, with its own approval.

## Preconditions and the upheld halt

Precondition 1 passed: origin/main matched the SHA above, the base was its
ancestor, the branch/base/identity matched, the clone was clean and had no
stash, and both the new package and M0 build log were absent.
logs contained only this session's logs when examined; initial emptiness
preceded the first required log and was not independently measured.
pr and record were empty. The main/base changed paths were:
- docs/decisions/DEC-20261112-03-addendum-1-resumed-session.md
- docs/decisions/DEC-20261112-03-addendum-2-gate-repeat.md
- docs/decisions/DEC-20261113-01-h2-records-and-merge.md
- docs/decisions/DEC-20261114-01-madv-surface-release.md
- docs/decisions/DEC-20261114-02-minimax-plan-terms.md
- docs/decisions/DEC-20261115-01-madv-surface-0.1.1-records.md
- docs/decisions/DEC-20261115-02-phase-3b-m0.md
- docs/verification/2026-11-15-madv-surface-0.1.1-release.md
- docs/verification/phase-3a-correction-rounds.md

Precondition 2 passed. Every AUTHORITY hash matched the supplied value;
the listed acts and addenda carry ISSUED status and the Founder's
signature. Both supplied manifests passed. Resume checks 063-068 found
exactly the five required prompt files, all four manifest entries passed,
the addendum hash matched, the clone was still clean at the base with no
stash, record was empty, and pr held only the renamed halt report.
The reference's actual input/event/exit contract is compatible with the
commission. Its registration-proposal.md is explicitly an unapplied
proposal, not the admitted registration; its suggested policy values are
not used in place of B2-B6.

The first halt was an authorization gap found before the baseline:
environment.test.ts:138 expected no rule after the newly required helper
would supply the secret canary. No test was run to claim that failure.
The Founder upheld the halt and supplied Addendum 2.
Preserved report: pr/m0-phase1-halt-1-report.md, SHA-256
4fef47b6a4f9c26e142347967f4e01b80758162e4fd0f6e6f2e3f79a36f44be4.
No implementation or commit preceded the halt.

Addendum 2 B1 permits only the expected rule at
packages/supervisor/test/environment.test.ts:138 in
"redaction reports which rules ran": secret-value:MINIMAX_API_KEY for
madv-surface-v1 and none for the other two registrations.
Its B2 permits only 2.1.296 -> 2.1.325 at base lines 32, 67, 85 and 327 of
packages/supervisor/test/preflight.test.ts. These are shared fixture
version values, including fixtureWithUnregisteredSurfaces and hang.
The tests directly pinned to registry admission include
"preflight fails with pair_ineligible" and
"a surface without an actual-session identity primitive is ineligible".
Line 176 in "preflight fails with identity_mismatch" stays byte-identical.
The complete table of affected tests and final lines follows in Phase 1.

Precondition 3 passed after completion in log 069. The numbered source
quotes below show the registry interface, both entries and ENTRIES;
both allowlists and resolveAllowlist; the entire attestation contract,
constants, first-init wake and parser choice; preflight's two probes,
launch vector, admission-presence guard and Claude settings branch;
supervisor dependencies, root workspaces and tsconfig paths.
They also include the tests/lines cited by Addendum 1 A1 and the
dependency/path facts of A2. No described source-text difference was found.

Precondition 4 passed: the three blobs are
ced2364d85c0117563533e6dc419575f06a09161 (preflight.ts),
182285abde26fae13f9403dba676349608a61265 (its test), and
8e63d73f723c3fa7eea2e300c3e378e107957b0b (runtime-harness.ts).
Log 057 quotes preflight lines 143, 192, 193, test line 298 and harness
line 14 with their numbers. Their bytes and effect are protected.

Precondition 5 passed on completion in log 069: relevant supervisor
attestation importers/symbol users are its own module, preflight.ts,
their two tests and test/phase3a/evidence-pipeline.test.ts.
The logged grep also lists unrelated adapters' own attestation imports,
which do not import the supervisor module.
Precondition 6 passed: Darwin arm64.

The following blocks are complete, contiguous logs, including command
headers and exit statuses. They do not join nonadjacent source lines;
where the command selected separate source ranges, the numbered output
itself identifies their original positions.

Source log: logs/054-base-registry-environment-manifests.log

```text
git -C tui show HEAD:packages/protocol/src/adapter-registry.ts | nl -ba
 git -C tui show HEAD:packages/supervisor/src/environment.ts | nl -ba
 git -C tui show HEAD:packages/supervisor/package.json | nl -ba
 git -C tui show HEAD:tsconfig.json | nl -ba
 git -C tui show HEAD:package.json | nl -ba
23:49  1 user, load averages: 2.30 5.97 11.49
     1	// packages/protocol/src/adapter-registry.ts
     2	// The closed, Founder-approved, compile-time adapter registry — the sole
     3	// production admission source for surfaces. Admission reads only this
     4	// registry (spec §9.1); no other production module contains a
     5	// surface-admission list (packages/policy/** excluded by documented
     6	// disposition, Q4 of the Task 6 architecture contract).
     7
     8	import { parseSurfaceId, type SurfaceId } from "./surface-id";
     9	import { normalizeIdentifier, normalizeIndependenceDomain } from "./normalization";
    10
    11	export interface AdapterRegistrationV1 {
    12	  readonly surface: SurfaceId;
    13	  readonly executable_name: string;
    14	  readonly provider: string;
    15	  readonly supported_versions: readonly string[];
    16	  readonly identity_probe: { readonly argv: readonly string[]; readonly parse: "json" | "kv" };
    17	  readonly auth_readiness_probe: { readonly argv: readonly string[]; readonly parse: "json" | "kv" } | null;
    18	  readonly non_interactive_flags: readonly string[];
    19	  readonly environment_allowlist_ref: string;
    20	  readonly independence_domain: string;
    21	  readonly organization_id: string;
    22	  readonly auth_failure_detection: readonly string[];
    23	  readonly limitations: readonly string[];
    24	}
    25
    26	function deepFreeze<T>(value: T): Readonly<T> {
    27	  if (value !== null && typeof value === "object") {
    28	    Object.freeze(value);
    29	    for (const nested of Object.values(value as Record<string, unknown>)) {
    30	      deepFreeze(nested);
    31	    }
    32	  }
    33	  return value;
    34	}
    35
    36	const CLAUDE_CODE_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
    37	  surface: parseSurfaceId("claude-code"),
    38	  executable_name: "madbridge-claude-v5",
    39	  provider: "anthropic",
    40	  supported_versions: ["2.1.296"],
    41	  identity_probe: {
    42	    argv: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--verbose", "--no-session-persistence"],
    43	    parse: "json",
    44	  },
    45	  auth_readiness_probe: { argv: ["auth", "status"], parse: "json" },
    46	  non_interactive_flags: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--verbose", "--no-session-persistence"],
    47	  environment_allowlist_ref: "claude-code-v1",
    48	  independence_domain: "anthropic",
    49	  organization_id: "anthropic",
    50	  auth_failure_detection: [
    51	    "auth_status_exit_code:1",
    52	    "system/api_retry.error:authentication_failed",
    53	    "system/api_retry.error:oauth_org_not_allowed",
    54	  ],
    55	  limitations: [
    56	    "fable is requested intent only; live eligibility requires exact equality with system/init.model",
    57	  ],
    58	});
    59
    60	const ANTIGRAVITY_REGISTRATION: AdapterRegistrationV1 = deepFreeze({
    61	  surface: parseSurfaceId("antigravity"),
    62	  executable_name: "agy",
    63	  provider: "google",
    64	  supported_versions: ["1.1.13"],
    65	  identity_probe: { argv: ["config", "get", "model"], parse: "kv" },
    66	  auth_readiness_probe: null,
    67	  non_interactive_flags: [],
    68	  environment_allowlist_ref: "antigravity-v1",
    69	  independence_domain: "google",
    70	  organization_id: "google",
    71	  auth_failure_detection: [],
    72	  limitations: [
    73	    "configuration-only identity evidence — no actual-session identity primitive exists",
    74	    "no documented non-mutating non-interactive auth-readiness primitive",
    75	  ],
    76	});
    77
    78	const ENTRIES: readonly (readonly [SurfaceId, AdapterRegistrationV1])[] = [
    79	  [parseSurfaceId("claude-code"), CLAUDE_CODE_REGISTRATION],
    80	  [parseSurfaceId("antigravity"), ANTIGRAVITY_REGISTRATION],
    81	];
    82
    83	for (const [, entry] of ENTRIES) {
    84	  if (normalizeIdentifier(entry.provider) !== entry.provider) {
    85	    throw new Error(`adapter-registry: provider is not canonically normalized: ${entry.provider}`);
    86	  }
    87	  if (normalizeIdentifier(entry.organization_id) !== entry.organization_id) {
    88	    throw new Error(`adapter-registry: organization_id is not canonically normalized: ${entry.organization_id}`);
    89	  }
    90	  if (normalizeIndependenceDomain(entry.independence_domain) !== entry.independence_domain) {
    91	    throw new Error(`adapter-registry: independence_domain is not canonically normalized: ${entry.independence_domain}`);
    92	  }
    93	}
    94
    95	// Module-private backing store. Never exported; never mutated after this line.
    96	const mutableRegistry = new Map<SurfaceId, AdapterRegistrationV1>(ENTRIES);
    97
    98	function freezeRegistryFacade(
    99	  source: Map<SurfaceId, AdapterRegistrationV1>,
   100	): ReadonlyMap<SurfaceId, AdapterRegistrationV1> {
   101	  const facade: ReadonlyMap<SurfaceId, AdapterRegistrationV1> = {
   102	    get: (key) => source.get(key),
   103	    has: (key) => source.has(key),
   104	    entries: () => source.entries(),
   105	    keys: () => source.keys(),
   106	    values: () => source.values(),
   107	    forEach: (callbackfn, thisArg?) => {
   108	      // Never delegate source.forEach directly: Map.prototype.forEach passes the
   109	      // backing Map to the callback as its third argument. Always substitute the
   110	      // frozen facade so no callback can ever capture a mutable Map reference.
   111	      source.forEach((value, key) => callbackfn.call(thisArg, value, key, facade));
   112	    },
   113	    [Symbol.iterator]: () => source[Symbol.iterator](),
   114	    get size() {
   115	      return source.size;
   116	    },
   117	  };
   118	  return Object.freeze(facade);
   119	}
   120
   121	export const ADAPTER_REGISTRY: ReadonlyMap<SurfaceId, AdapterRegistrationV1> =
   122	  freezeRegistryFacade(mutableRegistry);
   123
   124	export function lookupRegistration(surface: SurfaceId): AdapterRegistrationV1 | undefined {
   125	  return ADAPTER_REGISTRY.get(surface);
   126	}
     1	import type { AdapterRegistrationV1 } from "@madventures/protocol";
     2
     3	export interface EnvironmentAllowlistV1 {
     4	  readonly ref: string;
     5	  readonly variables: readonly {
     6	    readonly name: string;
     7	    readonly secret: boolean;
     8	    readonly required: boolean;
     9	  }[];
    10	}
    11
    12	// PLAN-OPEN-2, as bound by DEC-20261010-03 B1. No installation validation
    13	// occurs here; the caller supplies an already eligible ambient environment.
    14	const allowlists: Readonly<Record<string, EnvironmentAllowlistV1>> = Object.freeze({
    15	  "claude-code-v1": Object.freeze({
    16	    ref: "claude-code-v1",
    17	    variables: Object.freeze([
    18	      { name: "HOME", required: true, secret: false },
    19	      { name: "PATH", required: true, secret: false },
    20	      { name: "SHELL", required: true, secret: false },
    21	      { name: "TERM", required: true, secret: false },
    22	      { name: "TMPDIR", required: true, secret: false },
    23	      { name: "CLAUDE_CONFIG_DIR", required: true, secret: false },
    24	      { name: "LANG", required: false, secret: false },
    25	      { name: "LC_ALL", required: false, secret: false },
    26	      { name: "LC_CTYPE", required: false, secret: false },
    27	      { name: "USER", required: false, secret: false },
    28	    ].map(variable => Object.freeze(variable))),
    29	  }),
    30	  "antigravity-v1": Object.freeze({
    31	    ref: "antigravity-v1",
    32	    variables: Object.freeze([
    33	      { name: "HOME", required: true, secret: false },
    34	      { name: "PATH", required: true, secret: false },
    35	      { name: "SHELL", required: true, secret: false },
    36	      { name: "TERM", required: true, secret: false },
    37	      { name: "TMPDIR", required: true, secret: false },
    38	      { name: "LANG", required: false, secret: false },
    39	      { name: "LC_ALL", required: false, secret: false },
    40	      { name: "LC_CTYPE", required: false, secret: false },
    41	      { name: "USER", required: false, secret: false },
    42	    ].map(variable => Object.freeze(variable))),
    43	  }),
    44	});
    45
    46	export class MissingRequiredVariableError extends Error {
    47	  constructor(readonly variableName: string, readonly ref: string) {
    48	    super(`Missing required environment variable ${variableName} for ${ref}`);
    49	    this.name = "MissingRequiredVariableError";
    50	  }
    51	}
    52
    53	export class UnknownEnvironmentAllowlistError extends Error {
    54	  constructor(readonly ref: string) {
    55	    super(`Unknown environment allowlist ${ref}`);
    56	    this.name = "UnknownEnvironmentAllowlistError";
    57	  }
    58	}
    59
    60	function resolveAllowlist(registration: AdapterRegistrationV1): EnvironmentAllowlistV1 {
    61	  const ref = registration.environment_allowlist_ref;
    62	  if (!Object.hasOwn(allowlists, ref)) throw new UnknownEnvironmentAllowlistError(ref);
    63	  return allowlists[ref]!;
    64	}
    65
    66	// B5 test-only entry point. Not exported from the package index.
    67	export function buildEnvironmentFromAllowlist(
    68	  allowlist: EnvironmentAllowlistV1,
    69	  ambient: NodeJS.ProcessEnv,
    70	): Readonly<Record<string, string>> {
    71	  const result: Record<string, string> = {};
    72	  for (const variable of allowlist.variables) {
    73	    const value = ambient[variable.name];
    74	    if (typeof value === "string") {
    75	      result[variable.name] = value;
    76	    } else if (variable.required) {
    77	      throw new MissingRequiredVariableError(variable.name, allowlist.ref);
    78	    }
    79	  }
    80	  return Object.freeze(result);
    81	}
    82
    83	// B5 test-only entry point. Values exist only in this call's local rules;
    84	// returned diagnostics contain text and rule names, never rule values.
    85	export function redactWithAllowlist(
    86	  text: string,
    87	  environment: Readonly<Record<string, string>>,
    88	  allowlist: EnvironmentAllowlistV1,
    89	): { readonly text: string; readonly rulesApplied: readonly string[] } {
    90	  const rules = [];
    91	  for (const variable of allowlist.variables) {
    92	    if (!variable.secret) continue;
    93	    const value = environment[variable.name];
    94	    if (typeof value === "string" && value.length > 0) {
    95	      rules.push({ name: variable.name, value });
    96	    }
    97	  }
    98	  const rulesApplied = rules.map(rule => `secret-value:${rule.name}`);
    99	  rules.sort((a, b) => b.value.length - a.value.length);
   100	  for (const rule of rules) {
   101	    text = text.split(rule.value).join(`<redacted:${rule.name}>`);
   102	  }
   103	  return { text, rulesApplied };
   104	}
   105
   106	export function buildAllowlistedEnvironment(
   107	  registration: AdapterRegistrationV1,
   108	  ambient: NodeJS.ProcessEnv,
   109	): Readonly<Record<string, string>> {
   110	  return buildEnvironmentFromAllowlist(resolveAllowlist(registration), ambient);
   111	}
   112
   113	export function redact(
   114	  text: string,
   115	  environment: Readonly<Record<string, string>>,
   116	  registration: AdapterRegistrationV1,
   117	): { readonly text: string; readonly rulesApplied: readonly string[] } {
   118	  return redactWithAllowlist(text, environment, resolveAllowlist(registration));
   119	}
     1	{
     2	  "name": "@madventures/supervisor",
     3	  "version": "0.1.0",
     4	  "type": "module",
     5	  "private": true,
     6	  "dependencies": {
     7	    "@madventures/protocol": "workspace:*",
     8	    "@madventures/storage": "workspace:*"
     9	  }
    10	}
     1	{
     2	  "compilerOptions": {
     3	    "lib": ["ESNext"],
     4	    "target": "ES2022",
     5	    "module": "ESNext",
     6	    "moduleDetection": "force",
     7	    "jsx": "react-jsx",
     8	    "jsxImportSource": "@opentui/react",
     9	    "allowJs": true,
    10	    "moduleResolution": "bundler",
    11	    "allowImportingTsExtensions": false,
    12	    "verbatimModuleSyntax": true,
    13	    "noEmit": true,
    14	    "strict": true,
    15	    "skipLibCheck": true,
    16	    "noFallthroughCasesInSwitch": true,
    17	    "noUncheckedIndexedAccess": true,
    18	    "exactOptionalPropertyTypes": true,
    19	    "noImplicitOverride": true,
    20	    "noUnusedLocals": false,
    21	    "noUnusedParameters": false,
    22	    "noPropertyAccessFromIndexSignature": false,
    23	    "paths": {
    24	      "@mad/claim-boundary": ["./packages/claim-boundary/src/index.ts"],
    25	      "@mad/build-memory": ["./packages/build-memory/src/index.ts"],
    26	      "@mad/single-verdict": ["./packages/single-verdict/src/index.ts"],
    27	      "@mad/founder-act": ["./packages/founder-act/src/index.ts"],
    28	      "@madventures/protocol": ["./packages/protocol/src/index.ts"],
    29	      "@madventures/policy": ["./packages/policy/src/index.ts"],
    30	      "@madventures/ledger": ["./packages/ledger/src/index.ts"],
    31	      "@madventures/artifact-store": ["./packages/artifact-store/src/index.ts"],
    32	      "@madventures/broker": ["./packages/broker/src/index.ts"],
    33	      "@madventures/adapter-claude-code": ["./packages/adapter-claude-code/src/index.ts"],
    34	      "@madventures/adapter-antigravity": ["./packages/adapter-antigravity/src/index.ts"],
    35	      "@madventures/pty-host": ["./packages/pty-host/src/index.ts"],
    36	      "@madventures/storage": ["./packages/storage/src/index.ts"],
    37	      "@madventures/supervisor": ["./packages/supervisor/src/index.ts"]
    38	    }
    39	  },
    40	  "exclude": ["apps/projector-mc", "apps/seal-studio"]
    41	}     1	{
     2	  "name": "madventures-tui",
     3	  "version": "0.1.0",
     4	  "type": "module",
     5	  "private": true,
     6	  "workspaces": ["apps/*", "packages/*"],
     7	  "scripts": {
     8	    "dev": "bun run --watch apps/madbridge/src/tui/App.tsx",
     9	    "build": "tsc --noEmit",
    10	    "typecheck": "bunx tsc --noEmit",
    11	    "test": "bun test",
    12	    "verify": "bunx tsc --noEmit && bunx tsc --noEmit -p apps/projector-mc && bunx tsc --noEmit -p apps/seal-studio && bun test",
    13	    "projector": "bun run --cwd apps/projector-mc dev",
    14	    "projector:build": "bun run --cwd apps/projector-mc build",
    15	    "seal-studio": "bun run --cwd apps/seal-studio dev",
    16	    "seal-studio:build": "bun run --cwd apps/seal-studio build",
    17	    "madv-tui": "bun run apps/madbridge/src/cli.ts",
    18	    "test:tui-chaos": "bun packages/tui-chaos/src/cli.ts run",
    19	    "preflight": "bun packages/preflight/src/cli.ts",
    20	    "founder-act": "bun packages/founder-act/src/main.ts",
    21	    "honesty-compile": "bun packages/honesty-compiler/src/cli.ts",
    22	    "test:arch": "bun test test/architecture-boundaries.test.ts test/phase3a/architecture-phase3a.test.ts",
    23	    "test:phase3a": "bun test test/phase3a",
    24	    "test:adversarial": "bun test test/phase3a/adversarial",
    25	    "verify:phase3a": "bun run typecheck && bun run test:arch && bun run test:phase3a && bun run test:adversarial"
    26	  },
    27	  "trustedDependencies": [
    28	    "node-pty"
    29	  ],
    30	  "devDependencies": {
    31	    "@types/bun": "latest",
    32	    "@types/react": "^19.2.18",
    33	    "@types/react-test-renderer": "^19.1.0",
    34	    "react-test-renderer": "^19.2.8"
    35	  },
    36	  "peerDependencies": {
    37	    "typescript": "^5"
    38	  },
    39	  "dependencies": {
    40	    "@opentui/core": "^0.5.1",
    41	    "@opentui/react": "^0.5.1",
    42	    "react": "^19.2.6"
    43	  }
    44	}

exit_status=0
```

Source log: logs/055-base-attestation.log

```text
git -C tui show HEAD:packages/supervisor/src/attestation.ts | nl -ba
23:49  1 user, load averages: 2.30 5.97 11.49
     1	// DEC-20261013-01 B3 and DEC-20261014-02 B2. Probe output is local to
     2	// this invocation and never leaves the metadata-only result boundary.
     3	export const IDENTITY_PROBE_INPUT = '{"type":"user","message":{"role":"user","content":"Report session initialization."}}\n';
     4
     5	export interface ProbeRequest {
     6	  executablePath: string;
     7	  arguments: readonly string[];
     8	  environment: Readonly<Record<string, string>>;
     9	  stdin: string;
    10	  signal: AbortSignal;
    11	  kind: "identity" | "auth";
    12	  model: string;
    13	  supportedVersions: readonly string[];
    14	}
    15
    16	export interface ProbeProcess {
    17	  readonly stdout: ReadableStream<Uint8Array>;
    18	  readonly stderr: ReadableStream<Uint8Array>;
    19	  readonly exited: Promise<number>;
    20	  readonly signalCode?: string | number | null;
    21	  kill(signal: "SIGTERM" | "SIGKILL"): void;
    22	}
    23
    24	// Module-level dependency seam for deterministic tests. Not exposed by the
    25	// package index, and never supplied by a preflight caller.
    26	export interface ProbeRuntime {
    27	  spawn(request: ProbeRequest): ProbeProcess;
    28	  now(): number;
    29	  parseAuth(output: string): boolean;
    30	}
    31
    32	export interface ProbeDiagnostic {
    33	  readonly result: "pass" | "auth_not_ready" | "identity_mismatch";
    34	  readonly primitive: "auth status" | "system/init";
    35	  readonly exitCode: number | null;
    36	  readonly signal: string | number | null;
    37	  readonly stdoutBytes: number;
    38	  readonly stderrBytes: number;
    39	}
    40	export interface ProbeResult { readonly ok: boolean; readonly diagnostic: ProbeDiagnostic }
    41
    42	const EXECUTION_MS = 5_000;
    43	const CLEANUP_MS = 1_000;
    44	const GRACE_MS = 500;
    45	const STREAM_LIMIT = 65_536;
    46
    47	export function parseAuthReadiness(output: string): boolean {
    48	  try {
    49	    const v: unknown = JSON.parse(output);
    50	    if (v === null || typeof v !== "object" || Array.isArray(v)) return false;
    51	    const p = v as Record<string, unknown>;
    52	    return p.loggedIn === true && p.authMethod === "claude.ai"
    53	      && p.apiProvider === "firstParty" && p.subscriptionType === "max";
    54	  } catch { return false; }
    55	}
    56
    57	function firstInit(output: string): Record<string, unknown> | undefined {
    58	  for (const line of output.split("\n")) {
    59	    if (line.trim() === "") continue;
    60	    try {
    61	      const event = JSON.parse(line);
    62	      if (event?.type === "system" && event?.subtype === "init") return event;
    63	    } catch { /* A non-init line is not identity evidence. */ }
    64	  }
    65	  return undefined;
    66	}
    67
    68	export function parseIdentity(output: string, model: string, versions: readonly string[]): boolean {
    69	  const event = firstInit(output);
    70	  return event !== undefined && event.model === model
    71	    && typeof event.claude_code_version === "string"
    72	    && versions.includes(event.claude_code_version);
    73	}
    74
    75	const runtime: ProbeRuntime = {
    76	  now: () => performance.now(),
    77	  parseAuth: parseAuthReadiness,
    78	  spawn: req => Bun.spawn([req.executablePath, ...req.arguments], {
    79	    env: req.environment, stdin: new Blob([req.stdin]), stdout: "pipe", stderr: "pipe",
    80	  }),
    81	};
    82
    83	export async function runBoundedProbe(request: ProbeRequest, overrides: Partial<ProbeRuntime> = {}): Promise<ProbeResult> {
    84	  const rt = { ...runtime, ...overrides };
    85	  const started = rt.now();
    86	  let stdoutBytes = 0, stderrBytes = 0;
    87	  let exitCode: number | null = null;
    88	  let signal: string | number | null = null;
    89	  let output = "";
    90	  let process: ProbeProcess | undefined;
    91	  let exitObserved = false;
    92	  let streamFailure = false;
    93	  let oversized = false;
    94	  const timers = new Set<ReturnType<typeof setTimeout>>();
    95	  const readers: { cancel(): Promise<void> }[] = [];
    96	  let wake!: (reason: "cancel" | "overflow" | "identity") => void;
    97	  const interrupted = new Promise<"cancel" | "overflow" | "identity">(resolve => { wake = resolve; });
    98	  const abort = () => wake("cancel");
    99	  function result(ok: boolean): ProbeResult {
   100	    return Object.freeze({ ok, diagnostic: Object.freeze({
   101	      result: ok ? "pass" : request.kind === "identity" ? "identity_mismatch" : "auth_not_ready",
   102	      primitive: request.kind === "identity" ? "system/init" : "auth status",
   103	      exitCode, signal, stdoutBytes, stderrBytes,
   104	    }) });
   105	  }
   106	  function deadline<T>(promise: Promise<T>, end: number): Promise<T | "deadline"> {
   107	    return new Promise(resolve => {
   108	      const timer = setTimeout(() => { timers.delete(timer); resolve("deadline"); }, Math.max(0, end - rt.now()));
   109	      timers.add(timer);
   110	      promise.then(value => { clearTimeout(timer); timers.delete(timer); resolve(value); }, () => {
   111	        clearTimeout(timer); timers.delete(timer); streamFailure = true; resolve("deadline");
   112	      });
   113	    });
   114	  }
   115	  async function consume(stream: ReadableStream<Uint8Array>, name: "stdout" | "stderr") {
   116	    const reader = stream.getReader(); readers.push(reader);
   117	    const decoder = new TextDecoder();
   118	    try {
   119	      while (true) {
   120	        const { value, done } = await reader.read();
   121	        if (done) break;
   122	        if (name === "stdout") stdoutBytes += value.byteLength; else stderrBytes += value.byteLength;
   123	        const count = name === "stdout" ? stdoutBytes : stderrBytes;
   124	        if (count > STREAM_LIMIT) { oversized = true; wake("overflow"); continue; }
   125	        if (name === "stdout") {
   126	          output += decoder.decode(value, { stream: true });
   127	          // Detect only the event boundary while streaming. Identity field
   128	          // validation, like auth parsing, happens after exit and reaping.
   129	          if (request.kind === "identity" && firstInit(output) !== undefined) wake("identity");
   130	        }
   131	      }
   132	      if (name === "stdout") output += decoder.decode();
   133	    } catch { streamFailure = true; wake("overflow"); }
   134	    finally { reader.releaseLock(); }
   135	  }
   136	  try {
   137	    if (request.signal.aborted) return result(false);
   138	    request.signal.addEventListener("abort", abort, { once: true });
   139	    if (request.signal.aborted) return result(false);
   140	    try { process = rt.spawn(request); } catch { return result(false); }
   141	    const observedExit = process.exited.then(code => {
   142	      exitObserved = true; exitCode = code; signal = process?.signalCode ?? null;
   143	    });
   144	    const reaped = Promise.all([observedExit, consume(process.stdout, "stdout"), consume(process.stderr, "stderr")]).then(() => "reaped" as const);
   145	    const reason = await deadline(Promise.race([reaped, interrupted]), started + EXECUTION_MS);
   146	    let clean = reason === "reaped" && rt.now() - started <= EXECUTION_MS;
   147	    if (reason !== "reaped") {
   148	      const cleanupStart = rt.now();
   149	      const end = Math.min(cleanupStart + CLEANUP_MS, started + EXECUTION_MS + CLEANUP_MS);
   150	      if (!exitObserved) { try { process.kill("SIGTERM"); } catch { streamFailure = true; } }
   151	      let completion = await deadline(reaped, Math.min(cleanupStart + GRACE_MS, end));
   152	      if (completion !== "reaped") {
   153	        if (!exitObserved) { try { process.kill("SIGKILL"); } catch { streamFailure = true; } }
   154	        completion = await deadline(reaped, end);
   155	      }
   156	      clean = reason === "identity" && completion === "reaped" && rt.now() <= end;
   157	    }
   158	    if (!clean || request.signal.aborted || streamFailure || oversized || !exitObserved || exitCode !== 0 || signal !== null) return result(false);
   159	    // No output parser is reached before the subprocess's exit promise and
   160	    // both stream drains have settled inside the relevant monotonic budget.
   161	    const accepted = request.kind === "identity"
   162	      ? parseIdentity(output, request.model, request.supportedVersions)
   163	      : rt.parseAuth(output);
   164	    return result(accepted);
   165	  } catch { return result(false); }
   166	  finally {
   167	    request.signal.removeEventListener("abort", abort);
   168	    for (const timer of timers) clearTimeout(timer);
   169	    for (const reader of readers) { try { await reader.cancel(); } catch { /* released reader */ } }
   170	  }
   171	}

exit_status=0
```

Source log: logs/056-base-preflight.log

```text
git -C tui show HEAD:packages/supervisor/src/preflight.ts | nl -ba
23:49  1 user, load averages: 2.11 5.81 11.37
     1	import { accessSync, constants, readFileSync, realpathSync, statSync, type Stats } from "node:fs";
     2	import { userInfo } from "node:os";
     3	import { basename, isAbsolute, join, resolve, sep } from "node:path";
     4	import {
     5	  ADAPTER_REGISTRY, CardinalityError, assertActiveSurfaceCardinality,
     6	  parseTaskEnvelope,
     7	  type AdapterRegistrationV1, type CapabilityRecordV1, type ObservedSurfaceFacts,
     8	  type SurfaceId,
     9	} from "@madventures/protocol";
    10	import { evaluatePairEligibilityWithDependencies } from "../../protocol/src/pair-constraints";
    11	import { latestFreshRecord, proposeStorageRoot, validateStorageRoot } from "@madventures/storage";
    12	import { buildAllowlistedEnvironment, MissingRequiredVariableError } from "./environment";
    13	import { IDENTITY_PROBE_INPUT, runBoundedProbe } from "./attestation";
    14
    15	export type PreflightFailure =
    16	  | "envelope_invalid" | "cardinality" | "repository_fingerprint" | "executable_unresolved"
    17	  | "identity_mismatch" | "auth_not_ready" | "pair_ineligible" | "storage_root_invalid"
    18	  | "host_capability_missing" | "capability_record_stale" | "home_mismatch";
    19	export interface PreflightInput {
    20	  envelope: Record<string, unknown>;
    21	  repositoryRoot: string;
    22	  worktree: string;
    23	  ambient: Record<string, string | undefined>;
    24	  installation: { installation_uid: number; passwd_home: string; approved_path: string; claude_config_dir?: string };
    25	  invocationArguments: readonly string[];
    26	  settingsSources: readonly string[];
    27	  storageRootOverride?: string;
    28	  hostCapabilities: { pty: boolean; processGroups: boolean; termination: boolean; timing: boolean };
    29	  observedHostFacts: Readonly<Partial<Record<SurfaceId, ObservedSurfaceFacts>>>;
    30	  now: string;
    31	  signal: AbortSignal;
    32	}
    33	export interface LaunchExecution {
    34	  readonly surface: SurfaceId;
    35	  readonly executablePath: string;
    36	  readonly artifactSha256: string;
    37	  readonly arguments: readonly string[];
    38	  readonly environment: Readonly<Record<string, string>>;
    39	}
    40	export interface LaunchPlan {
    41	  readonly executions: readonly LaunchExecution[];
    42	  readonly repositoryFingerprint: { readonly root: string; readonly worktree: string; readonly head: string; readonly statusSha256: string };
    43	  readonly storageRoot: string;
    44	}
    45	export interface PreflightOk { readonly ok: true; readonly plan: LaunchPlan }
    46	export type PreflightResult = PreflightOk | { readonly ok: false; readonly failure: PreflightFailure; readonly detail: string };
    47
    48	// Deterministic module-only test seam; production callers cannot replace the
    49	// closed registry, filesystem view, environment constructor, or probes.
    50	export interface PreflightDependencies {
    51	  realpath(path: string): string;
    52	  stat(path: string): Stats;
    53	  registration(surface: SurfaceId): AdapterRegistrationV1 | undefined;
    54	  buildEnvironment: typeof buildAllowlistedEnvironment;
    55	  probe: typeof runBoundedProbe;
    56	  freshRecord: typeof latestFreshRecord;
    57	}
    58	const dependencies: PreflightDependencies = {
    59	  realpath: realpathSync, stat: statSync, registration: s => ADAPTER_REGISTRY.get(s),
    60	  buildEnvironment: buildAllowlistedEnvironment, probe: runBoundedProbe, freshRecord: latestFreshRecord,
    61	};
    62	const fail = (failure: PreflightFailure): PreflightResult => ({ ok: false, failure, detail: failure });
    63	const hash = (bytes: string | Uint8Array) => new Bun.CryptoHasher("sha256").update(bytes).digest("hex");
    64	const inside = (path: string, root: string) => path === root || path.startsWith(root.endsWith(sep) ? root : root + sep);
    65
    66	function fingerprint(root: string, worktree: string, d: PreflightDependencies): LaunchPlan["repositoryFingerprint"] {
    67	  const canonicalRoot = d.realpath(root) as string;
    68	  const canonicalWorktree = d.realpath(worktree) as string;
    69	  function git(args: string[]): Buffer {
    70	    const p = Bun.spawnSync(["git", "--no-optional-locks", "-C", canonicalWorktree, ...args], { stdout: "pipe", stderr: "pipe" });
    71	    if (p.exitCode !== 0) throw new Error("git failure");
    72	    return p.stdout;
    73	  }
    74	  if (git(["rev-parse", "--is-inside-work-tree"]).toString().trim() !== "true") throw new Error("not worktree");
    75	  const head = git(["rev-parse", "--verify", "HEAD"]).toString().trim();
    76	  if (!/^[0-9a-f]{40}$/.test(head)) throw new Error("unresolved HEAD");
    77	  // Also establish that the supplied repository root names a git tree.
    78	  const check = Bun.spawnSync(["git", "--no-optional-locks", "-C", canonicalRoot, "rev-parse", "--is-inside-work-tree"], { stdout: "pipe", stderr: "pipe" });
    79	  if (check.exitCode !== 0 || check.stdout.toString().trim() !== "true") throw new Error("not repository");
    80	  return Object.freeze({ root: canonicalRoot, worktree: canonicalWorktree, head, statusSha256: hash(git(["status", "--porcelain=v1", "-z"])) });
    81	}
    82
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
   123
   124	export async function runPurePreflight(input: PreflightInput): Promise<PreflightResult> {
   125	  return runPurePreflightWithDependencies(input, {});
   126	}
   127
   128	// Not exported from the package index. Uses the identical production steps.
   129	export async function runPurePreflightWithDependencies(input: PreflightInput, overrides: Partial<PreflightDependencies>): Promise<PreflightResult> {
   130	  const d = { ...dependencies, ...overrides };
   131	  let envelope;
   132	  try { envelope = parseTaskEnvelope(structuredClone(input.envelope)); }
   133	  catch (error) { return fail(error instanceof CardinalityError ? "cardinality" : "envelope_invalid"); }
   134	  try { assertActiveSurfaceCardinality(envelope.executions); } catch { return fail("cardinality"); }
   135	  let repo;
   136	  try {
   137	    repo = fingerprint(input.repositoryRoot, input.worktree, d);
   138	    const repository = d.realpath(envelope.repository);
   139	    const common = Bun.spawnSync(["git", "--no-optional-locks", "-C", repo.root, "rev-parse", "--path-format=absolute", "--git-common-dir"], { stdout: "pipe", stderr: "pipe" });
   140	    const worktreeCommon = Bun.spawnSync(["git", "--no-optional-locks", "-C", repo.worktree, "rev-parse", "--path-format=absolute", "--git-common-dir"], { stdout: "pipe", stderr: "pipe" });
   141	    if (common.exitCode !== 0 || worktreeCommon.exitCode !== 0) return fail("repository_fingerprint");
   142	    const commonPath = d.realpath(common.stdout.toString().trim());
   143	    if (commonPath !== d.realpath(worktreeCommon.stdout.toString().trim())) return fail("repository_fingerprint");
   144	    if (repository !== repo.root && repository !== commonPath) return fail("repository_fingerprint");
   145	    if (d.realpath(envelope.worktree) !== repo.worktree || envelope.repository_fingerprint.git_sha !== repo.head) return fail("repository_fingerprint");
   146	  } catch { return fail("repository_fingerprint"); }
   147	  if (input.ambient.HOME === undefined || input.ambient.HOME !== input.installation.passwd_home) return fail("home_mismatch");
   148	  const registrations = envelope.executions.map(e => d.registration(e.surface));
   149	  // Unknown registrations cannot supply an approved executable or environment.
   150	  if (registrations.some(r => r === undefined)) return fail("executable_unresolved");
   151	  const admitted = registrations as AdapterRegistrationV1[];
   152	  try { if (!validateEnvironment(input, admitted, d)) return fail("auth_not_ready"); }
   153	  catch { return fail("auth_not_ready"); }
   154	  const resolved: { path: string; sha256: string }[] = [];
   155	  try {
   156	    for (const reg of admitted) {
   157	      let found: string | undefined;
   158	      for (const entry of input.installation.approved_path.split(":")) {
   159	        const candidate = join(entry, reg.executable_name);
   160	        try {
   161	          const path = d.realpath(candidate) as string;
   162	          if (!isAbsolute(path) || !d.stat(path).isFile()) continue;
   163	          accessSync(path, constants.X_OK); found = path; break;
   164	        } catch { /* Search only the approved PATH. */ }
   165	      }
   166	      if (found === undefined) return fail("executable_unresolved");
   167	      resolved.push({ path: found, sha256: hash(readFileSync(found)) });
   168	    }
   169	  } catch { return fail("executable_unresolved"); }
   170	  const launches: LaunchExecution[] = [];
   171	  for (const [index, execution] of envelope.executions.entries()) {
   172	    const registration = admitted[index]!;
   173	    if (registration.identity_probe.parse !== "json" || registration.auth_readiness_probe === null) return fail("pair_ineligible");
   174	    let environment;
   175	    try { environment = d.buildEnvironment(registration, input.ambient); }
   176	    catch (error) {
   177	      if (error instanceof MissingRequiredVariableError) return fail("auth_not_ready");
   178	      return fail("auth_not_ready");
   179	    }
   180	    const executable = resolved[index]!;
   181	    const request = { executablePath: executable.path, environment, model: execution.model, supportedVersions: registration.supported_versions, signal: input.signal };
   182	    try {
   183	      if (!(await d.probe({ ...request, arguments: [...registration.identity_probe.argv, "--model", execution.model], stdin: IDENTITY_PROBE_INPUT, kind: "identity" })).ok) return fail("identity_mismatch");
   184	    } catch { return fail("identity_mismatch"); }
   185	    try {
   186	      if (!(await d.probe({ ...request, arguments: registration.auth_readiness_probe.argv, stdin: "", kind: "auth" })).ok) return fail("auth_not_ready");
   187	    } catch { return fail("auth_not_ready"); }
   188	    launches.push(Object.freeze({ surface: execution.surface, executablePath: executable.path, artifactSha256: executable.sha256,
   189	      arguments: Object.freeze([...registration.non_interactive_flags, "--model", execution.model]), environment }));
   190	  }
   191	  for (const [index, execution] of envelope.executions.entries()) {
   192	    if (execution.provider !== admitted[index]!.provider
   193	      || execution.independence_domain !== admitted[index]!.independence_domain) return fail("identity_mismatch");
   194	  }
   195	  const organizations = new Map(admitted.map(r => [r.surface, r.organization_id] as const));
   196	  if (!evaluatePairEligibilityWithDependencies(envelope.executions, envelope.pair_constraints, organizations, {
   197	    registration: d.registration,
   198	  }).ok) return fail("pair_ineligible");
   199	  let storageRoot: string;
   200	  try {
   201	    storageRoot = proposeStorageRoot(input.storageRootOverride === undefined ? {} : { MADV_STORAGE_DIR: input.storageRootOverride }, repo.root, repo.worktree);
   202	    if (!isAbsolute(storageRoot) || resolve(storageRoot) !== storageRoot) return fail("storage_root_invalid");
   203	    if (!validateStorageRoot(storageRoot, repo.root, repo.worktree).ok) return fail("storage_root_invalid");
   204	  } catch { return fail("storage_root_invalid"); }
   205	  if (!input.hostCapabilities.pty || !input.hostCapabilities.processGroups || !input.hostCapabilities.termination || !input.hostCapabilities.timing) return fail("host_capability_missing");
   206	  try {
   207	    for (const [index, execution] of envelope.executions.entries()) {
   208	      const supplied = input.observedHostFacts[execution.surface];
   209	      const observed = supplied === undefined ? undefined : { ...supplied, binary_sha256: resolved[index]!.sha256 };
   210	      const record: CapabilityRecordV1 | null = d.freshRecord(storageRoot, repo.root, repo.worktree, execution.surface, input.now, observed!);
   211	      if (record === null || record.overall !== "pass" || record.requested_model !== execution.model || !record.role_eligibility.includes(execution.role)
   212	        || (execution.role === "independent-reviewer" && !record.independent_review_eligible)) return fail("capability_record_stale");
   213	    }
   214	  } catch { return fail("capability_record_stale"); }
   215	  return { ok: true, plan: Object.freeze({ executions: Object.freeze(launches), repositoryFingerprint: repo, storageRoot }) };
   216	}

exit_status=0
```

Source log: logs/057-base-blobs-importers-and-addendum-lines.log

```text
git -C tui rev-parse HEAD:packages/supervisor/src/preflight.ts HEAD:packages/supervisor/test/preflight.test.ts HEAD:test/phase3a/runtime-harness.ts
 git -C tui show HEAD:packages/supervisor/src/preflight.ts | nl -ba | sed -n '143p;192,193p'
 git -C tui show HEAD:packages/supervisor/test/preflight.test.ts | nl -ba | sed -n '298p'
 git -C tui show HEAD:test/phase3a/runtime-harness.ts | nl -ba | sed -n '14p'
 git -C tui grep -n -E 'runBoundedProbe|parseIdentity|parseAuthReadiness|IDENTITY_PROBE_INPUT|supervisor/src/attestation|["\x27].*attestation["\x27]' HEAD -- '*.ts'
 git -C tui show HEAD:packages/protocol/test/adapter-registry.test.ts | nl -ba
 git -C tui show HEAD:packages/supervisor/test/environment.test.ts | nl -ba
 git -C tui show HEAD:test/phase3a/evidence-pipeline.test.ts | nl -ba | sed -n '830,850p'
 git -C tui show HEAD:test/phase3a/harness-separation.test.ts | nl -ba | sed -n '1,36p'
 rg --files packages/adapter-claude-code reference/madv-surface
23:49  1 user, load averages: 2.11 5.81 11.37
ced2364d85c0117563533e6dc419575f06a09161
182285abde26fae13f9403dba676349608a61265
8e63d73f723c3fa7eea2e300c3e378e107957b0b
   143	    if (commonPath !== d.realpath(worktreeCommon.stdout.toString().trim())) return fail("repository_fingerprint");
   192	    if (execution.provider !== admitted[index]!.provider
   193	      || execution.independence_domain !== admitted[index]!.independence_domain) return fail("identity_mismatch");
   298	test("the returned plan's repository fingerprint is frozen", async () => {
    14	import { runPurePreflightWithDependencies } from "../../packages/supervisor/src/preflight";
HEAD:packages/adapter-antigravity/src/adapter.ts:7:import { attestAntigravity, ModelIdentityUnverifiable } from "./attestation";
HEAD:packages/adapter-antigravity/src/index.ts:10:export { attestAntigravity } from "./attestation";
HEAD:packages/adapter-antigravity/test/attestation.test.ts:3:import { attestAntigravity, ModelIdentityUnverifiable } from "../src/attestation";
HEAD:packages/adapter-claude-code/src/adapter.ts:8:import { attestClaudeCode, ModelIdentityUnverifiable } from "./attestation";
HEAD:packages/adapter-claude-code/src/index.ts:10:export { attestClaudeCode, ModelIdentityUnverifiable } from "./attestation";
HEAD:packages/adapter-claude-code/test/attestation.test.ts:3:import { attestClaudeCode, ModelIdentityUnverifiable } from "../src/attestation";
HEAD:packages/claim-boundary/src/index.ts:47:  "attestation",
HEAD:packages/claim-boundary/src/index.ts:70:  attested: "attestation",
HEAD:packages/claim-boundary/test/claim-boundary.test.ts:49:      "preparation", "dispatch", "execution", "attestation", "verification", "review", "ci", "merge",
HEAD:packages/honesty-compiler/test/honesty-compiler.test.ts:93:          not_evidence_of: ["attestation", "verification", "review", "ci", "merge"],
HEAD:packages/honesty-compiler/test/honesty-compiler.test.ts:181:          not_evidence_of: ["attestation", "verification", "review", "ci", "merge"],
HEAD:packages/honesty-compiler/test/honesty-compiler.test.ts:278:            not_evidence_of: ["attestation", "verification", "review", "ci", "merge"],
HEAD:packages/preflight/test/preflight.test.ts:190:        not_evidence_of: ["attestation", "verification", "review", "ci", "merge"],
HEAD:packages/protocol/src/capability-record.ts:127:  "identity_attestation",
HEAD:packages/protocol/src/capability-record.ts:351:    const identity = readClosed(record.identity_attestation, "identity_attestation", IDENTITY_ATTESTATION_FIELDS);
HEAD:packages/protocol/test/capability-record.test.ts:341:    ...(rawRecord()["identity_attestation"] as Record<string, unknown>),
HEAD:packages/supervisor/src/attestation.ts:3:export const IDENTITY_PROBE_INPUT = '{"type":"user","message":{"role":"user","content":"Report session initialization."}}\n';
HEAD:packages/supervisor/src/attestation.ts:47:export function parseAuthReadiness(output: string): boolean {
HEAD:packages/supervisor/src/attestation.ts:68:export function parseIdentity(output: string, model: string, versions: readonly string[]): boolean {
HEAD:packages/supervisor/src/attestation.ts:77:  parseAuth: parseAuthReadiness,
HEAD:packages/supervisor/src/attestation.ts:83:export async function runBoundedProbe(request: ProbeRequest, overrides: Partial<ProbeRuntime> = {}): Promise<ProbeResult> {
HEAD:packages/supervisor/src/attestation.ts:162:      ? parseIdentity(output, request.model, request.supportedVersions)
HEAD:packages/supervisor/src/preflight.ts:13:import { IDENTITY_PROBE_INPUT, runBoundedProbe } from "./attestation";
HEAD:packages/supervisor/src/preflight.ts:55:  probe: typeof runBoundedProbe;
HEAD:packages/supervisor/src/preflight.ts:60:  buildEnvironment: buildAllowlistedEnvironment, probe: runBoundedProbe, freshRecord: latestFreshRecord,
HEAD:packages/supervisor/src/preflight.ts:183:      if (!(await d.probe({ ...request, arguments: [...registration.identity_probe.argv, "--model", execution.model], stdin: IDENTITY_PROBE_INPUT, kind: "identity" })).ok) return fail("identity_mismatch");
HEAD:packages/supervisor/test/attestation.test.ts:5:import { IDENTITY_PROBE_INPUT, runBoundedProbe as executeProbe, type ProbeRequest, type ProbeRuntime, type ProbeResult, parseIdentity, parseAuthReadiness } from "../src/attestation";
HEAD:packages/supervisor/test/attestation.test.ts:23:async function runBoundedProbe(req: ProbeRequest, rt: Partial<ProbeRuntime> = {}): Promise<ProbeResult> {
HEAD:packages/supervisor/test/attestation.test.ts:34:  return {executablePath,arguments:[],environment:Object.freeze({}),signal:new AbortController().signal,stdin:kind==="identity"?IDENTITY_PROBE_INPUT:"",kind,model:"exact",supportedVersions:["2.1.296"]};
HEAD:packages/supervisor/test/attestation.test.ts:43:  const r=await runBoundedProbe(req);expect(r.ok).toBe(true);
HEAD:packages/supervisor/test/attestation.test.ts:45:test("identity rejects a model mismatch",async()=>{expect((await runBoundedProbe(request("console.log(JSON.stringify({type:'system',subtype:'init',model:'exact-alias',claude_code_version:'2.1.296'}));","identity"))).ok).toBe(false);});
HEAD:packages/supervisor/test/attestation.test.ts:46:test("identity rejects a missing system/init event",async()=>{expect((await runBoundedProbe(request("console.log(JSON.stringify({type:'result',model:'exact'}));","identity"))).ok).toBe(false);});
HEAD:packages/supervisor/test/attestation.test.ts:47:test("identity rejects an unsupported CLI version",async()=>{expect((await runBoundedProbe(request("console.log(JSON.stringify({type:'system',subtype:'init',model:'exact',claude_code_version:'2.1.233'}));","identity"))).ok).toBe(false);});
HEAD:packages/supervisor/test/attestation.test.ts:49:  expect(parseIdentity('{"type":"system","subtype":"init","model":"wrong","claude_code_version":"2.1.296"}\n{"type":"system","subtype":"init","model":"exact","claude_code_version":"2.1.296"}',"exact",["2.1.296"])).toBe(false);
HEAD:packages/supervisor/test/attestation.test.ts:50:  const req=request(`const input=await Bun.stdin.text();if(input!==${JSON.stringify(IDENTITY_PROBE_INPUT)})process.exit(1);console.log(JSON.stringify({type:'system',subtype:'init',model:'exact',claude_code_version:'2.1.296'}));`,"identity");expect((await runBoundedProbe(req)).ok).toBe(true);
HEAD:packages/supervisor/test/attestation.test.ts:55:  expect((await runBoundedProbe(req,{spawn:wrappedSpawn(signals)})).ok).toBe(true);expect(signals).toEqual(["SIGTERM"]);
HEAD:packages/supervisor/test/attestation.test.ts:57:test("successful bounded execution",async()=>{expect((await runBoundedProbe(request(passSource))).ok).toBe(true);});
HEAD:packages/supervisor/test/attestation.test.ts:58:test("spawn failure is bounded and fail closed",async()=>{const req=request(passSource);rmSync(req.executablePath);expect((await runBoundedProbe(req)).ok).toBe(false);});
HEAD:packages/supervisor/test/attestation.test.ts:59:test("pre-spawn cancellation starts no child",async()=>{const req=request(passSource);const c=new AbortController();c.abort();req.signal=c.signal;let spawned=0;expect((await runBoundedProbe(req,{spawn:r=>{spawned++;return wrappedSpawn([])(r);}})).ok).toBe(false);expect(spawned).toBe(0);});
HEAD:packages/supervisor/test/attestation.test.ts:63:  expect((await runBoundedProbe(req,{spawn})).ok).toBe(false);expect(signals).toEqual(["SIGTERM","SIGKILL"]);expect(ended).toBe(true);
HEAD:packages/supervisor/test/attestation.test.ts:65:test("signal termination fails closed",async()=>{expect((await runBoundedProbe(request("process.kill(process.pid,'SIGTERM');"))).ok).toBe(false);});
HEAD:packages/supervisor/test/attestation.test.ts:66:test("stdout overflow fails closed",async()=>{expect((await runBoundedProbe(request("process.stdout.write('x'.repeat(65537));"))).ok).toBe(false);});
HEAD:packages/supervisor/test/attestation.test.ts:67:test("stderr overflow fails closed",async()=>{expect((await runBoundedProbe(request(passSource+"process.stderr.write('x'.repeat(65537));"))).ok).toBe(false);});
HEAD:packages/supervisor/test/attestation.test.ts:70:  const r=await runBoundedProbe(request(source));expect(r.ok).toBe(true);expect(r.diagnostic.stdoutBytes).toBe(65536);expect(r.diagnostic.stderrBytes).toBe(65536);
HEAD:packages/supervisor/test/attestation.test.ts:75:  expect((await runBoundedProbe(req,{spawn,now:()=>performance.now()+offset})).ok).toBe(false);
HEAD:packages/supervisor/test/attestation.test.ts:79:  try{const start=performance.now();expect((await runBoundedProbe(req,{spawn:wrappedSpawn(signals)})).ok).toBe(false);expect(performance.now()-start).toBeLessThan(6100);expect(signals).toEqual(["SIGTERM","SIGKILL"]);}finally{Date.now=old;}
HEAD:packages/supervisor/test/attestation.test.ts:84:  const start=performance.now();expect((await runBoundedProbe(req,{spawn})).ok).toBe(false);expect(signals).toEqual(["SIGTERM","SIGKILL"]);expect(times[1]!-times[0]!).toBeLessThan(550);expect(times[1]!-times[0]!).toBeGreaterThan(450);expect(performance.now()-start).toBeLessThan(1200);
HEAD:packages/supervisor/test/attestation.test.ts:90:  expect((await runBoundedProbe(req,{spawn})).ok).toBe(false);expect(performance.now()-start).toBeLessThan(1150);expect(signals).toEqual(["SIGTERM","SIGKILL"]);
HEAD:packages/supervisor/test/attestation.test.ts:96:  expect((await runBoundedProbe(req,{spawn,parseAuth:text=>{expect(reaped).toBe(true);parsed=true;return parseAuthReadiness(text);}})).ok).toBe(true);expect(parsed).toBe(true);
HEAD:packages/supervisor/test/attestation.test.ts:97:  parsed=false;expect((await runBoundedProbe(request(passSource+"process.exit(1);"),{parseAuth:text=>{parsed=true;return parseAuthReadiness(text);}})).ok).toBe(false);expect(parsed).toBe(false);
HEAD:packages/supervisor/test/attestation.test.ts:101:  for(const value of cases){const text=typeof value==="string"?value:JSON.stringify(value);expect((await runBoundedProbe(request(`console.log(${JSON.stringify(text)});`))).ok).toBe(false);}
HEAD:packages/supervisor/test/attestation.test.ts:105:  for(const source of cases){const r=await runBoundedProbe(request(source));expect(Object.keys(r).sort()).toEqual(["diagnostic","ok"]);expect(Object.keys(r.diagnostic).sort()).toEqual(["exitCode","primitive","result","signal","stderrBytes","stdoutBytes"]);expect(JSON.stringify(r)).not.toContain("RAW-PRIVATE-CANARY");}
HEAD:packages/supervisor/test/attestation.test.ts:106:  for(const mode of ["spawn","cancel","timeout","cleanup"]){const req=request(idle);const c=new AbortController();req.signal=c.signal;if(mode==="spawn")rmSync(req.executablePath);if(mode==="cancel")c.abort();let offset=0;const spawn:ProbeRuntime["spawn"]=r=>{const p=wrappedSpawn([],mode==="cleanup"?700:0)(r);afterHandlerReady(r,()=>{offset=5001;c.abort();});return p;};const r=await runBoundedProbe(req,{spawn,now:()=>performance.now()+offset});expect(Object.keys(r.diagnostic).sort()).toEqual(["exitCode","primitive","result","signal","stderrBytes","stdoutBytes"]);expect(JSON.stringify(r)).not.toContain("RAW-PRIVATE-CANARY");}
HEAD:packages/supervisor/test/preflight.test.ts:8:import { runBoundedProbe } from "../src/attestation";
HEAD:packages/supervisor/test/preflight.test.ts:62:    probe: req => runBoundedProbe(req, {spawn: request => { const p=Bun.spawn([request.executablePath,...request.arguments], {env:request.environment,stdin:new Blob([request.stdin]),stdout:"pipe",stderr:"pipe"}); children.push(p as any); return p; }}),
HEAD:packages/supervisor/test/preflight.test.ts:317:  const r = await f.run({ buildEnvironment: (reg,env) => { builds++; return buildAllowlistedEnvironment(reg,env); }, probe: async req => { seen.push(req.environment); return runBoundedProbe(req); } });
HEAD:packages/supervisor/test/preflight.test.ts:321:test("a cached attestation is not reused across sessions", async () => { const f = fixture(); let count=0; const probe: PreflightDependencies["probe"] = async req => { count++; return runBoundedProbe(req); }; expect((await f.run({probe})).ok).toBe(true); const first=count; expect(first).toBe(4); expect((await f.run({probe})).ok).toBe(true); expect(count).toBe(first*2); });
HEAD:packages/supervisor/test/preflight.test.ts:322:test("a surface without an actual-session identity primitive is ineligible", async () => { const f = fixture(); let count=0; await failure(f,"pair_ineligible",{registration:s=>ADAPTER_REGISTRY.get(s),probe:async req=>{count++;return runBoundedProbe(req);}}); expect(count).toBe(2); expect((await runPurePreflight(f.input)).ok).toBe(false); });
HEAD:packages/supervisor/test/preflight.test.ts:329:test("the auth probe escalates SIGTERM to SIGKILL within the forced-cleanup budget", async () => {const f=fixture();hang(f);const signals:string[]=[];await failure(f,"auth_not_ready",{probe:req=>runBoundedProbe(req,{spawn:request=>{const p=Bun.spawn([request.executablePath,...request.arguments],{env:request.environment,stdin:new Blob([request.stdin]),stdout:"pipe",stderr:"pipe"});children.push(p as any);return {...p,stdout:p.stdout,stderr:p.stderr,exited:p.exited,kill:s=>{if(request.kind==="auth")signals.push(s);p.kill(s as any);}};}})});expect(signals).toEqual(["SIGTERM","SIGKILL"]);},10000);
HEAD:packages/supervisor/test/preflight.test.ts:330:test("the auth probe reaps the child successfully", async () => {const f=fixture();let reaped=0;const r=await f.run({probe:req=>runBoundedProbe(req,{spawn:request=>{const p=Bun.spawn([request.executablePath,...request.arguments],{env:request.environment,stdin:new Blob([request.stdin]),stdout:"pipe",stderr:"pipe"});children.push(p as any);return {stdout:p.stdout,stderr:p.stderr,exited:p.exited.then(code=>{reaped++;return code;}),kill:s=>p.kill(s as any)};}})});expect(r.ok).toBe(true);expect(reaped).toBe(4);});
HEAD:packages/supervisor/test/preflight.test.ts:331:test("cleanup-budget exhaustion fails closed as auth_not_ready", async () => {const f=fixture();hang(f);await failure(f,"auth_not_ready",{probe:req=>runBoundedProbe(req,{spawn:request=>{const p=Bun.spawn([request.executablePath,...request.arguments],{env:request.environment,stdin:new Blob([request.stdin]),stdout:"pipe",stderr:"pipe"});children.push(p as any);return {stdout:p.stdout,stderr:p.stderr,exited:request.arguments.includes("auth")?p.exited.then(async code=>{await Bun.sleep(700);return code;}):p.exited,kill:s=>p.kill(s as any)};}})});},10000);
HEAD:test/acceptance/interruption-recovery.test.ts:325:describe("restart and re-attestation", () => {
HEAD:test/phase3a/evidence-pipeline.test.ts:756:import { parseAuthReadiness } from "../../packages/supervisor/src/attestation";
HEAD:test/phase3a/evidence-pipeline.test.ts:831:      result: at(8).exit === 0 && parseAuthReadiness(at(8).stdout) ? "pass" : "fail",
HEAD:test/phase3a/evidence-pipeline.test.ts:888:    "./attestation": { IDENTITY_PROBE_INPUT: "synthetic input", runBoundedProbe: probe },
     1	// packages/protocol/test/adapter-registry.test.ts
     2	// Tests for the closed, Founder-approved adapter registry — the sole
     3	// production admission source (Task 6).
     4
     5	import { expect, test } from "bun:test";
     6	import {
     7	  ADAPTER_REGISTRY,
     8	  lookupRegistration,
     9	  type AdapterRegistrationV1,
    10	} from "../src/adapter-registry";
    11	import { parseSurfaceId } from "../src/surface-id";
    12	import { normalizeIdentifier, normalizeIndependenceDomain } from "../src/normalization";
    13
    14	const CLAUDE_CODE_REGISTRATION: AdapterRegistrationV1 = {
    15	  surface: parseSurfaceId("claude-code"),
    16	  executable_name: "madbridge-claude-v5",
    17	  provider: "anthropic",
    18	  supported_versions: ["2.1.296"],
    19	  identity_probe: {
    20	    argv: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--verbose", "--no-session-persistence"],
    21	    parse: "json",
    22	  },
    23	  auth_readiness_probe: { argv: ["auth", "status"], parse: "json" },
    24	  non_interactive_flags: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--verbose", "--no-session-persistence"],
    25	  environment_allowlist_ref: "claude-code-v1",
    26	  independence_domain: "anthropic",
    27	  organization_id: "anthropic",
    28	  auth_failure_detection: [
    29	    "auth_status_exit_code:1",
    30	    "system/api_retry.error:authentication_failed",
    31	    "system/api_retry.error:oauth_org_not_allowed",
    32	  ],
    33	  limitations: [
    34	    "fable is requested intent only; live eligibility requires exact equality with system/init.model",
    35	  ],
    36	};
    37
    38	const ANTIGRAVITY_REGISTRATION: AdapterRegistrationV1 = {
    39	  surface: parseSurfaceId("antigravity"),
    40	  executable_name: "agy",
    41	  provider: "google",
    42	  supported_versions: ["1.1.13"],
    43	  identity_probe: { argv: ["config", "get", "model"], parse: "kv" },
    44	  auth_readiness_probe: null,
    45	  non_interactive_flags: [],
    46	  environment_allowlist_ref: "antigravity-v1",
    47	  independence_domain: "google",
    48	  organization_id: "google",
    49	  auth_failure_detection: [],
    50	  limitations: [
    51	    "configuration-only identity evidence — no actual-session identity primitive exists",
    52	    "no documented non-mutating non-interactive auth-readiness primitive",
    53	  ],
    54	};
    55
    56	test("registry values are stored already normalized", () => {
    57	  for (const entry of ADAPTER_REGISTRY.values()) {
    58	    expect(entry.independence_domain).toBe(normalizeIndependenceDomain(entry.independence_domain));
    59	    expect(entry.organization_id).toBe(normalizeIdentifier(entry.organization_id));
    60	    expect(entry.provider).toBe(normalizeIdentifier(entry.provider));
    61	  }
    62	});
    63
    64	test("the registry contains exactly the two Founder-ratified surfaces", () => {
    65	  expect(ADAPTER_REGISTRY.size).toBe(2);
    66	  expect(new Set(ADAPTER_REGISTRY.keys())).toEqual(
    67	    new Set([parseSurfaceId("claude-code"), parseSurfaceId("antigravity")]),
    68	  );
    69	});
    70
    71	test("claude-code registration matches the PLAN-OPEN-1 ruling field for field", () => {
    72	  expect(ADAPTER_REGISTRY.get(parseSurfaceId("claude-code"))).toEqual(CLAUDE_CODE_REGISTRATION);
    73	});
    74
    75	test("antigravity registration matches the PLAN-OPEN-1 ruling field for field", () => {
    76	  expect(ADAPTER_REGISTRY.get(parseSurfaceId("antigravity"))).toEqual(ANTIGRAVITY_REGISTRATION);
    77	});
    78
    79	test("registry entries and the registry are deeply frozen", () => {
    80	  expect(Object.isFrozen(ADAPTER_REGISTRY)).toBe(true);
    81	  for (const entry of ADAPTER_REGISTRY.values()) {
    82	    expect(Object.isFrozen(entry)).toBe(true);
    83	    expect(Object.isFrozen(entry.identity_probe)).toBe(true);
    84	    expect(Object.isFrozen(entry.identity_probe.argv)).toBe(true);
    85	    expect(Object.isFrozen(entry.supported_versions)).toBe(true);
    86	    expect(Object.isFrozen(entry.non_interactive_flags)).toBe(true);
    87	    expect(Object.isFrozen(entry.auth_failure_detection)).toBe(true);
    88	    expect(Object.isFrozen(entry.limitations)).toBe(true);
    89	    if (entry.auth_readiness_probe !== null) {
    90	      expect(Object.isFrozen(entry.auth_readiness_probe)).toBe(true);
    91	      expect(Object.isFrozen(entry.auth_readiness_probe.argv)).toBe(true);
    92	    }
    93	    expect(() => {
    94	      (entry as { executable_name: string }).executable_name = "tampered";
    95	    }).toThrow(TypeError);
    96	  }
    97	});
    98
    99	test("lookupRegistration returns the ratified entry and undefined for a syntactically valid unregistered surface", () => {
   100	  const claudeCode = parseSurfaceId("claude-code");
   101	  const fromLookup = lookupRegistration(claudeCode);
   102	  const fromIteration = ADAPTER_REGISTRY.get(claudeCode);
   103	  expect(fromLookup).toBe(fromIteration);
   104	  expect(fromLookup).toBeDefined();
   105
   106	  expect(lookupRegistration(parseSurfaceId("totally-made-up"))).toBeUndefined();
   107	});
   108
   109	test("registry membership cannot be mutated at runtime", () => {
   110	  const probe = ADAPTER_REGISTRY as unknown as Record<string, unknown>;
   111	  expect(probe.set).toBeUndefined();
   112	  expect(probe.delete).toBeUndefined();
   113	  expect(probe.clear).toBeUndefined();
   114
   115	  expect(() => {
   116	    (probe as { set: unknown }).set = () => undefined;
   117	  }).toThrow(TypeError);
   118
   119	  ADAPTER_REGISTRY.forEach((_value, _key, map) => {
   120	    expect(Object.isFrozen(map)).toBe(true);
   121	    expect((map as unknown as Record<string, unknown>).set).toBeUndefined();
   122	  });
   123
   124	  expect(ADAPTER_REGISTRY.size).toBe(2);
   125	  const sortedKeys: string[] = [...ADAPTER_REGISTRY.keys()].map(String).sort();
   126	  expect(sortedKeys).toEqual(["antigravity", "claude-code"]);
   127	});
     1	import { expect, test } from "bun:test";
     2	import { ADAPTER_REGISTRY, type AdapterRegistrationV1 } from "@madventures/protocol";
     3	import {
     4	  buildAllowlistedEnvironment,
     5	  buildEnvironmentFromAllowlist,
     6	  redact,
     7	  redactWithAllowlist,
     8	  MissingRequiredVariableError,
     9	  UnknownEnvironmentAllowlistError,
    10	  type EnvironmentAllowlistV1,
    11	} from "../src/environment";
    12
    13	const registrations = [...ADAPTER_REGISTRY.values()];
    14	const commonRequired = ["HOME", "PATH", "SHELL", "TERM", "TMPDIR"];
    15	const optional = ["LANG", "LC_ALL", "LC_CTYPE", "USER"];
    16	const excluded = [
    17	  "ANTHROPIC_API_KEY", "ANTHROPIC_AUTH_TOKEN", "ANTHROPIC_BASE_URL",
    18	  "CLAUDE_CODE_OAUTH_TOKEN", "ANTHROPIC_MODEL", "CLAUDE_CODE_SUBAGENT_MODEL",
    19	  "GH_TOKEN", "GITHUB_TOKEN", "SSH_AUTH_SOCK", "MADV_STORAGE_DIR",
    20	  "MADV_SESSION_ID", "MADV_EXECUTION_ID", "MADV_RUNTIME_DIR", "MADV_SOCKET_PATH",
    21	];
    22	function requiredNames(registration: AdapterRegistrationV1): string[] {
    23	  return registration.environment_allowlist_ref === "claude-code-v1"
    24	    ? [...commonRequired, "CLAUDE_CONFIG_DIR"] : [...commonRequired];
    25	}
    26	function ambientFor(registration: AdapterRegistrationV1): Record<string, string> {
    27	  return Object.fromEntries(requiredNames(registration).map(name => [name, `fixture:${name}`]));
    28	}
    29	const secretFixture: EnvironmentAllowlistV1 = {
    30	  ref: "test-only",
    31	  variables: [
    32	    { name: "SHORT", required: true, secret: true },
    33	    { name: "LONG", required: true, secret: true },
    34	    { name: "UNMATCHED", required: false, secret: true },
    35	    { name: "EMPTY", required: false, secret: true },
    36	    { name: "ABSENT", required: false, secret: true },
    37	    { name: "VISIBLE", required: false, secret: false },
    38	  ],
    39	};
    40	const secretEnvironment = {
    41	  SHORT: "abc", LONG: "prefix-abc-suffix", UNMATCHED: "unseen-value",
    42	  EMPTY: "", VISIBLE: "public-text",
    43	};
    44
    45	test("no ambient variable outside the allowlist survives", () => {
    46	  expect(registrations).toHaveLength(2);
    47	  for (const registration of registrations) {
    48	    const ambient = ambientFor(registration);
    49	    for (const name of [...excluded, "MADV_SECRET_LEAK"]) ambient[name] = "1";
    50	    // Ambient insertion order differs from allowlist order.
    51	    const reversed = Object.fromEntries(Object.entries({ ...ambient, USER: "fixture-user", LANG: "fixture-lang" }).reverse());
    52	    const result = buildAllowlistedEnvironment(registration, reversed);
    53	    expect(result).toEqual({ ...ambientFor(registration), LANG: "fixture-lang", USER: "fixture-user" });
    54	    for (const name of [...excluded, "MADV_SECRET_LEAK"]) expect(Object.hasOwn(result, name)).toBe(false);
    55	    expect(result.LANG).toBe("fixture-lang");
    56	    expect(Object.hasOwn(result, "LC_ALL")).toBe(false);
    57	    expect(Object.hasOwn(result, "LC_CTYPE")).toBe(false);
    58	    expect(Object.keys(result)).toEqual([...requiredNames(registration), "LANG", "USER"]);
    59	    const allOptional = { ...ambientFor(registration), ...Object.fromEntries(optional.map(name => [name, name])) };
    60	    expect(Object.keys(buildAllowlistedEnvironment(registration, allOptional))).toEqual([...requiredNames(registration), ...optional]);
    61	    let reads = 0;
    62	    Object.defineProperty(allOptional, "HOME", { get: () => { reads++; return "read-once"; } });
    63	    expect(buildAllowlistedEnvironment(registration, allOptional).HOME).toBe("read-once");
    64	    expect(reads).toBe(1);
    65	    const other = registrations.find(entry => entry !== registration)!;
    66	    const referenceOnly = { ...registration, environment_allowlist_ref: other.environment_allowlist_ref };
    67	    expect(buildAllowlistedEnvironment(referenceOnly, ambientFor(other))).toEqual(ambientFor(other));
    68	  }
    69	});
    70
    71	test("a missing required allowlisted variable is a typed failure", () => {
    72	  for (const registration of registrations) {
    73	    for (const name of requiredNames(registration)) {
    74	      for (const missing of [undefined, null, 42, { sentinel: "private-value" }]) {
    75	        const planted = Object.fromEntries(requiredNames(registration).map(key => [key, `distinctive-ambient-${key}-8f41c2`]));
    76	        const ambient = { ...planted, [name]: missing } as NodeJS.ProcessEnv;
    77	        let caught: unknown;
    78	        try { buildAllowlistedEnvironment(registration, ambient); } catch (error) { caught = error; }
    79	        expect(caught).toBeInstanceOf(MissingRequiredVariableError);
    80	        const error = caught as MissingRequiredVariableError;
    81	        expect(error.variableName).toBe(name);
    82	        expect(error.ref).toBe(registration.environment_allowlist_ref);
    83	        expect(error.message).toContain(name);
    84	        expect(Object.keys(error).sort()).toEqual(["name", "ref", "variableName"]);
    85	        const representations = [
    86	          ...Reflect.ownKeys(error).map(key => {
    87	            const value = Reflect.get(error, key);
    88	            return `${String(value)} ${JSON.stringify(value)}`;
    89	          }),
    90	          error.message, error.stack ?? "", String(error), JSON.stringify(error),
    91	        ];
    92	        for (const value of [...Object.values(planted), "private-value"]) {
    93	          for (const representation of representations) expect(representation).not.toContain(value);
    94	        }
    95	      }
    96	    }
    97	    const unknown = { ...registration, environment_allowlist_ref: "unknown-reference" };
    98	    const planted = Object.fromEntries(requiredNames(registration).map(key => [key, `distinctive-ambient-${key}-8f41c2`]));
    99	    for (const invoke of [
   100	      () => buildAllowlistedEnvironment(unknown, planted),
   101	      () => redact("diagnostic", planted, unknown),
   102	    ]) {
   103	      let caught: unknown;
   104	      try { invoke(); } catch (error) { caught = error; }
   105	      expect(caught).toBeInstanceOf(UnknownEnvironmentAllowlistError);
   106	      const error = caught as UnknownEnvironmentAllowlistError;
   107	      expect(error.ref).toBe("unknown-reference");
   108	      expect(Object.keys(error).sort()).toEqual(["name", "ref"]);
   109	      const representations = [
   110	        ...Reflect.ownKeys(error).map(key => {
   111	          const value = Reflect.get(error, key);
   112	          return `${String(value)} ${JSON.stringify(value)}`;
   113	        }),
   114	        error.message, error.stack ?? "", String(error), JSON.stringify(error),
   115	      ];
   116	      for (const value of Object.values(planted)) {
   117	        for (const representation of representations) expect(representation).not.toContain(value);
   118	      }
   119	    }
   120	  }
   121	});
   122
   123	test("secret-marked values are redacted from diagnostics while their names are retained", () => {
   124	  const environment = buildEnvironmentFromAllowlist(secretFixture, secretEnvironment);
   125	  const text = "prefix-abc-suffix / abc / prefix-abc-suffix / abc / public-text";
   126	  const result = redactWithAllowlist(text, environment, secretFixture);
   127	  expect(result.text).toBe("<redacted:LONG> / <redacted:SHORT> / <redacted:LONG> / <redacted:SHORT> / public-text");
   128	  for (const fragment of ["abc", "prefix-", "-suffix"]) expect(result.text).not.toContain(fragment);
   129	  expect(Object.keys(result).sort()).toEqual(["rulesApplied", "text"]);
   130	  expect(JSON.stringify(result)).not.toContain("unseen-value");
   131	});
   132
   133	test("redaction reports which rules ran", () => {
   134	  const expected = ["secret-value:SHORT", "secret-value:LONG", "secret-value:UNMATCHED"];
   135	  expect(redactWithAllowlist("prefix-abc-suffix abc", secretEnvironment, secretFixture).rulesApplied).toEqual(expected);
   136	  expect(redactWithAllowlist("no match here", secretEnvironment, secretFixture)).toEqual({ text: "no match here", rulesApplied: expected });
   137	  for (const registration of registrations) {
   138	    expect(redact("fixture:HOME", ambientFor(registration), registration)).toEqual({ text: "fixture:HOME", rulesApplied: [] });
   139	  }
   140	});
   141
   142	test("the same registration produces byte-identical environments on repeated calls", () => {
   143	  for (const registration of registrations) {
   144	    const ambient = { ...ambientFor(registration), LANG: "fixture-lang", MADV_SECRET_LEAK: "1" };
   145	    const before = JSON.stringify(ambient);
   146	    const first = buildAllowlistedEnvironment(registration, ambient);
   147	    const second = buildAllowlistedEnvironment(registration, ambient);
   148	    expect(JSON.stringify(first)).toBe(JSON.stringify(second));
   149	    expect(first).not.toBe(second);
   150	    expect(first).not.toBe(ambient);
   151	    expect(JSON.stringify(ambient)).toBe(before);
   152	    expect(Object.isFrozen(first)).toBe(true);
   153	    expect(Object.isFrozen(second)).toBe(true);
   154	  }
   155	});
   830	      primitive: "madbridge-claude-v5 auth status",
   831	      result: at(8).exit === 0 && parseAuthReadiness(at(8).stdout) ? "pass" : "fail",
   832	    });
   833	    const overall = record.identity_attestation.result === "pass" && record.auth_readiness.result === "pass" ? "pass" : "fail";
   834	    expect(record.overall).toBe(overall);
   835	    expect(record.role_eligibility).toEqual(overall === "pass" ? ["builder", "independent-reviewer"] : []);
   836	    expect(record.independent_review_eligible).toBe(overall === "pass");
   837	    expect(record.pty).toEqual({ result: "fail", observed_ms: {} });
   838	    expect(record.limitations.some(value => value.includes("4.2") && value.includes("no governed session")
   839	      && value.includes("PTY") && value.includes("process-group") && value.includes("termination") && value.includes("timing"))).toBe(true);
   840	    if (!registration.supported_versions.includes(record.cli_version)) {
   841	      expect(record.limitations.some(value => value.includes(record.cli_version)
   842	        && registration.supported_versions.every(version => value.includes(version)))).toBe(true);
   843	    }
   844	    if (!at(3).stdout.includes("Mach-O")) {
   845	      expect(record.limitations.some(value => value.includes("binary_sha256") && value.includes("launcher")
   846	        && value.includes("program"))).toBe(true);
   847	    }
   848	    if (record.identity_attestation.result === "pass") {
   849	      expect(inits(10).some(init => init.model === record.requested_model)).toBe(true);
   850	    }
     1	import { expect, test } from "bun:test";
     2	import { spawn } from "node:child_process";
     3	import { existsSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync } from "node:fs";
     4	import { tmpdir, userInfo } from "node:os";
     5	import { dirname, join, relative } from "node:path";
     6	import { fileURLToPath } from "node:url";
     7	import * as ts from "typescript";
     8	import { ADAPTER_REGISTRY, parseSurfaceId } from "@madventures/protocol";
     9	import { validateStorageRoot } from "@madventures/storage";
    10	import * as harness from "./runtime-harness";
    11	import { createFakeByteRouter } from "./fixture-adapters";
    12
    13	const ROOT = realpathSync(join(dirname(fileURLToPath(import.meta.url)), "../.."));
    14	const MARKER = /runtime-harness|phase3a/i;
    15	const digest = (source: string): string => new Bun.CryptoHasher("sha256").update(source).digest("hex");
    16	const ROUTER_IMPORTER = "apps/madbridge/test/pty-focus.test.tsx";
    17	const ROUTER_TARGET = "../../../test/phase3a/fixture-adapters";
    18
    19	// Exact-byte exceptions approved in the Task 48 supplement (SHA-256 1a89df93b328362159825b3c3c8e1d578924763dc94c5e0d5791991096ed136d).
    20	// Drift requires review; these are expression exceptions, never file exclusions.
    21	const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> = {
    22	  [ROUTER_IMPORTER]: { sha256: "2faefe54d7c9be2051bce621629203072515263d58bc69b31bd2fe927faedb01" },
    23	  "packages/protocol/src/adapter-registry.ts": {
    24	    sha256: "3129d3cead6312e4cb90eb6832e6a46597f3d352254021d5929b82ec651f4566", call: "source[Symbol.iterator]()",
    25	  },
    26	  "packages/protocol/src/lifecycle-events.ts": {
    27	    sha256: "9210012a505848a7379ab7b9cf9d840f33197de58f85b23c359653760479c603", call: "PAYLOAD_SHAPE[knownType](payload)",
    28	  },
    29	  "packages/supervisor/src/build.ts": {
    30	    sha256: "6008c0bab23f1bde66af3744c4731203f509f2890015b853ea6e50d6c4f4c44a", call: "host.handle.facts()[Symbol.asyncIterator]()",
    31	  },
    32	};
    33
    34	type Reason = "static-import" | "command-dispatch" | "control-flow-gate" | "dynamic-import"
    35	  | "dynamic-import-unresolvable" | "environment-gate" | "path-construction"
    36	  | "computed-dispatch-unresolvable" | "exception-drift" | "syntax-error";
rg: packages/adapter-claude-code: No such file or directory (os error 2)
reference/madv-surface/src/build.ts
reference/madv-surface/src/auth.ts
reference/madv-surface/src/version.ts
reference/madv-surface/src/domain.ts
reference/madv-surface/src/events.ts
reference/madv-surface/src/tools.ts
reference/madv-surface/src/authstatus.ts
reference/madv-surface/src/cli.ts
reference/madv-surface/src/redact.ts
reference/madv-surface/src/agent.ts
reference/madv-surface/src/http.ts
reference/madv-surface/src/errors.ts
reference/madv-surface/src/wire/index.ts
reference/madv-surface/src/wire/types.ts
reference/madv-surface/src/wire/openai.ts
reference/madv-surface/src/wire/anthropic.ts
reference/madv-surface/src/wire/ollama.ts
reference/madv-surface/src/main.ts
reference/madv-surface/src/profiles.ts
reference/madv-surface/README.md
reference/madv-surface/docs/registration-proposal.md
reference/madv-surface/docs/samples/reviewer-turn-ollama.jsonl
reference/madv-surface/docs/samples/require-model-mismatch-minimax.jsonl
reference/madv-surface/docs/samples/anthropic-model-refused-opencode-go.jsonl
reference/madv-surface/docs/samples/domain-unresolved-ollama.jsonl
reference/madv-surface/docs/samples/reviewer-turn-mistral.jsonl
reference/madv-surface/docs/samples/README.md
reference/madv-surface/docs/samples/reviewer-turn-zai.jsonl
reference/madv-surface/docs/samples/reviewer-turn-opencode-go.jsonl
reference/madv-surface/docs/samples/refused-host-redirect-qwen.jsonl
reference/madv-surface/docs/samples/refused-host-non-plan-kimi.jsonl
reference/madv-surface/docs/build-log-0.1.1.md
reference/madv-surface/docs/provider-fields.md
reference/madv-surface/SHA256.txt

exit_status=2
```

Source log: logs/069-complete-source-preconditions.log

```text
git -C tui show HEAD:packages/protocol/test/adapter-registry.test.ts | nl -ba
 git -C tui show HEAD:packages/supervisor/test/preflight.test.ts | nl -ba | sed -n '1,90p;160,180p;310,335p'
 git -C tui grep -n -E 'runBoundedProbe|parseIdentity|parseAuthReadiness|IDENTITY_PROBE_INPUT|from .*attestation' HEAD -- '*.ts' '*.tsx'
 0:26  1 user, load averages: 4.88 2.63 3.15
     1	// packages/protocol/test/adapter-registry.test.ts
     2	// Tests for the closed, Founder-approved adapter registry — the sole
     3	// production admission source (Task 6).
     4
     5	import { expect, test } from "bun:test";
     6	import {
     7	  ADAPTER_REGISTRY,
     8	  lookupRegistration,
     9	  type AdapterRegistrationV1,
    10	} from "../src/adapter-registry";
    11	import { parseSurfaceId } from "../src/surface-id";
    12	import { normalizeIdentifier, normalizeIndependenceDomain } from "../src/normalization";
    13
    14	const CLAUDE_CODE_REGISTRATION: AdapterRegistrationV1 = {
    15	  surface: parseSurfaceId("claude-code"),
    16	  executable_name: "madbridge-claude-v5",
    17	  provider: "anthropic",
    18	  supported_versions: ["2.1.296"],
    19	  identity_probe: {
    20	    argv: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--verbose", "--no-session-persistence"],
    21	    parse: "json",
    22	  },
    23	  auth_readiness_probe: { argv: ["auth", "status"], parse: "json" },
    24	  non_interactive_flags: ["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--verbose", "--no-session-persistence"],
    25	  environment_allowlist_ref: "claude-code-v1",
    26	  independence_domain: "anthropic",
    27	  organization_id: "anthropic",
    28	  auth_failure_detection: [
    29	    "auth_status_exit_code:1",
    30	    "system/api_retry.error:authentication_failed",
    31	    "system/api_retry.error:oauth_org_not_allowed",
    32	  ],
    33	  limitations: [
    34	    "fable is requested intent only; live eligibility requires exact equality with system/init.model",
    35	  ],
    36	};
    37
    38	const ANTIGRAVITY_REGISTRATION: AdapterRegistrationV1 = {
    39	  surface: parseSurfaceId("antigravity"),
    40	  executable_name: "agy",
    41	  provider: "google",
    42	  supported_versions: ["1.1.13"],
    43	  identity_probe: { argv: ["config", "get", "model"], parse: "kv" },
    44	  auth_readiness_probe: null,
    45	  non_interactive_flags: [],
    46	  environment_allowlist_ref: "antigravity-v1",
    47	  independence_domain: "google",
    48	  organization_id: "google",
    49	  auth_failure_detection: [],
    50	  limitations: [
    51	    "configuration-only identity evidence — no actual-session identity primitive exists",
    52	    "no documented non-mutating non-interactive auth-readiness primitive",
    53	  ],
    54	};
    55
    56	test("registry values are stored already normalized", () => {
    57	  for (const entry of ADAPTER_REGISTRY.values()) {
    58	    expect(entry.independence_domain).toBe(normalizeIndependenceDomain(entry.independence_domain));
    59	    expect(entry.organization_id).toBe(normalizeIdentifier(entry.organization_id));
    60	    expect(entry.provider).toBe(normalizeIdentifier(entry.provider));
    61	  }
    62	});
    63
    64	test("the registry contains exactly the two Founder-ratified surfaces", () => {
    65	  expect(ADAPTER_REGISTRY.size).toBe(2);
    66	  expect(new Set(ADAPTER_REGISTRY.keys())).toEqual(
    67	    new Set([parseSurfaceId("claude-code"), parseSurfaceId("antigravity")]),
    68	  );
    69	});
    70
    71	test("claude-code registration matches the PLAN-OPEN-1 ruling field for field", () => {
    72	  expect(ADAPTER_REGISTRY.get(parseSurfaceId("claude-code"))).toEqual(CLAUDE_CODE_REGISTRATION);
    73	});
    74
    75	test("antigravity registration matches the PLAN-OPEN-1 ruling field for field", () => {
    76	  expect(ADAPTER_REGISTRY.get(parseSurfaceId("antigravity"))).toEqual(ANTIGRAVITY_REGISTRATION);
    77	});
    78
    79	test("registry entries and the registry are deeply frozen", () => {
    80	  expect(Object.isFrozen(ADAPTER_REGISTRY)).toBe(true);
    81	  for (const entry of ADAPTER_REGISTRY.values()) {
    82	    expect(Object.isFrozen(entry)).toBe(true);
    83	    expect(Object.isFrozen(entry.identity_probe)).toBe(true);
    84	    expect(Object.isFrozen(entry.identity_probe.argv)).toBe(true);
    85	    expect(Object.isFrozen(entry.supported_versions)).toBe(true);
    86	    expect(Object.isFrozen(entry.non_interactive_flags)).toBe(true);
    87	    expect(Object.isFrozen(entry.auth_failure_detection)).toBe(true);
    88	    expect(Object.isFrozen(entry.limitations)).toBe(true);
    89	    if (entry.auth_readiness_probe !== null) {
    90	      expect(Object.isFrozen(entry.auth_readiness_probe)).toBe(true);
    91	      expect(Object.isFrozen(entry.auth_readiness_probe.argv)).toBe(true);
    92	    }
    93	    expect(() => {
    94	      (entry as { executable_name: string }).executable_name = "tampered";
    95	    }).toThrow(TypeError);
    96	  }
    97	});
    98
    99	test("lookupRegistration returns the ratified entry and undefined for a syntactically valid unregistered surface", () => {
   100	  const claudeCode = parseSurfaceId("claude-code");
   101	  const fromLookup = lookupRegistration(claudeCode);
   102	  const fromIteration = ADAPTER_REGISTRY.get(claudeCode);
   103	  expect(fromLookup).toBe(fromIteration);
   104	  expect(fromLookup).toBeDefined();
   105
   106	  expect(lookupRegistration(parseSurfaceId("totally-made-up"))).toBeUndefined();
   107	});
   108
   109	test("registry membership cannot be mutated at runtime", () => {
   110	  const probe = ADAPTER_REGISTRY as unknown as Record<string, unknown>;
   111	  expect(probe.set).toBeUndefined();
   112	  expect(probe.delete).toBeUndefined();
   113	  expect(probe.clear).toBeUndefined();
   114
   115	  expect(() => {
   116	    (probe as { set: unknown }).set = () => undefined;
   117	  }).toThrow(TypeError);
   118
   119	  ADAPTER_REGISTRY.forEach((_value, _key, map) => {
   120	    expect(Object.isFrozen(map)).toBe(true);
   121	    expect((map as unknown as Record<string, unknown>).set).toBeUndefined();
   122	  });
   123
   124	  expect(ADAPTER_REGISTRY.size).toBe(2);
   125	  const sortedKeys: string[] = [...ADAPTER_REGISTRY.keys()].map(String).sort();
   126	  expect(sortedKeys).toEqual(["antigravity", "claude-code"]);
   127	});
     1	import { afterEach, expect, test } from "bun:test";
     2	import { chmodSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, statSync, symlinkSync, watch, writeFileSync } from "node:fs";
     3	import { tmpdir, userInfo } from "node:os";
     4	import { join } from "node:path";
     5	import { ADAPTER_REGISTRY, parseSurfaceId, sha256CanonicalSync, type AdapterRegistrationV1, type ExecutionIdentity, type SurfaceId } from "@madventures/protocol";
     6	import { MissingRequiredVariableError, buildAllowlistedEnvironment } from "../src/environment";
     7	import { runPurePreflight, runPurePreflightWithDependencies, type PreflightInput, type PreflightDependencies, type PreflightFailure } from "../src/preflight";
     8	import { runBoundedProbe } from "../src/attestation";
     9
    10	const roots: string[] = [];
    11	const children: Bun.Subprocess<"pipe", "pipe", "pipe">[] = [];
    12	afterEach(async () => { for (const child of children.splice(0)) { try { child.kill("SIGKILL"); } catch {} await child.exited; } for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true }); });
    13
    14	function fixture() {
    15	  const root = realpathSync(mkdtempSync(join(tmpdir(), "task45-preflight-")));
    16	  roots.push(root);
    17	  chmodSync(root, 0o700);
    18	  const repo = join(root, "repo");
    19	  mkdirSync(repo, { mode: 0o700 });
    20	  const git = (args: string[]) => {
    21	    const p = Bun.spawnSync(["git", "--no-optional-locks", "-C", repo, ...args], { stdout: "pipe", stderr: "pipe" });
    22	    expect(p.exitCode).toBe(0);
    23	    return p.stdout.toString().trim();
    24	  };
    25	  git(["init", "-q"]);
    26	  git(["-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "commit", "--allow-empty", "-qm", "fixture"]);
    27	  git(["worktree", "add", "--detach", "-q", join(root, "worktree")]);
    28	  const bin = join(root, "bin"); mkdirSync(bin, { mode: 0o700 });
    29	  const temp = join(root, "private-temp"); mkdirSync(temp, { mode: 0o700 });
    30	  const settings = join(root, "settings.json"); writeFileSync(settings, "{}");
    31	  const model = "fixture-exact-model";
    32	  const source = `#!${process.execPath}\nprocess.on('SIGTERM',()=>process.exit(0));if (process.argv.includes('auth')) console.log(JSON.stringify({loggedIn:true,authMethod:'claude.ai',apiProvider:'firstParty',subscriptionType:'max',email:'PRIVATE-PROBE-CANARY'})); else console.log(JSON.stringify({type:'system',subtype:'init',model:${JSON.stringify(model)},claude_code_version:'2.1.296'}));\n`;
    33	  for (const name of ["madbridge-claude-v5", "agy"]) writeFileSync(join(bin, name), source, { mode: 0o700 });
    34	  const u = userInfo();
    35	  const envelope: Record<string, unknown> = {
    36	    protocol_version: "madbridge-protocol/v1", task_id: "fixture", authorization_reference: "FIXTURE-ONLY",
    37	    repository: repo, worktree: join(root, "worktree"), branch: "fixture",
    38	    repository_fingerprint: { kind: "commit", git_sha: git(["rev-parse", "--verify", "HEAD"]), sha256: "b".repeat(64) },
    39	    executions: [
    40	      { execution_id: "builder", role: "builder", surface: "claude-code", model, provider: "anthropic", independence_domain: "anthropic", effort: "high" },
    41	      { execution_id: "reviewer", role: "independent-reviewer", surface: "antigravity", model, provider: "google", independence_domain: "google", effort: "high" },
    42	    ],
    43	    initial_writer: "builder", scope: { allowedReadPaths: ["src/**"], allowedWritePaths: ["src/**"], allowedCommandCategories: ["test"], allowedArtifactCategories: ["test-result"], maxArtifactSizeBytes: 1000, dataClass: "internal", allowedEgressDestinations: [] },
    44	    pair_constraints: { required_roles: ["builder", "independent-reviewer"], require_distinct_providers: true, require_distinct_independence_domains: true, prohibit_self_review: true },
    45	    expires_at: "2099-01-01T00:00:00.000Z", created_at: "2026-10-14T00:00:00.000Z",
    46	  };
    47	  const sign = () => { delete envelope.envelope_hash; envelope.envelope_hash = sha256CanonicalSync(envelope); };
    48	  sign();
    49	  const input: PreflightInput = {
    50	    envelope, repositoryRoot: repo, worktree: join(root, "worktree"),
    51	    ambient: { HOME: u.homedir, SHELL: u.shell ?? "", PATH: bin, TERM: "xterm-256color", TMPDIR: temp, CLAUDE_CONFIG_DIR: join(u.homedir, ".claude-madventures-v5"), GH_TOKEN: "DISCARD-CANARY" },
    52	    installation: { installation_uid: u.uid, passwd_home: u.homedir, approved_path: bin, claude_config_dir: join(u.homedir, ".claude-madventures-v5") },
    53	    invocationArguments: [], settingsSources: [settings], storageRootOverride: join(root, "storage"),
    54	    hostCapabilities: { pty: true, processGroups: true, termination: true, timing: true },
    55	    observedHostFacts: {}, now: "2026-10-14T00:00:00.000Z", signal: new AbortController().signal,
    56	  };
    57	  // Model an OS-provided private temporary directory in the filesystem view.
    58	  // Actual fixture files stay under os.tmpdir(); every production TMPDIR rule
    59	  // still runs, including the shared-root exclusion and the real mode/UID.
    60	  const privateName = "/fixture-private-temp";
    61	  const deps: Partial<PreflightDependencies> = {
    62	    probe: req => runBoundedProbe(req, {spawn: request => { const p=Bun.spawn([request.executablePath,...request.arguments], {env:request.environment,stdin:new Blob([request.stdin]),stdout:"pipe",stderr:"pipe"}); children.push(p as any); return p; }}),
    63	    realpath: path => path === temp ? privateName : require("node:fs").realpathSync(path),
    64	    stat: path => statSync(path === privateName ? temp : path),
    65	    registration: surface => {
    66	      const r = ADAPTER_REGISTRY.get(surface)!;
    67	      return { ...r, identity_probe: { argv: [], parse: "json" }, auth_readiness_probe: { argv: ["auth", "status"], parse: "json" }, non_interactive_flags: [], supported_versions: ["2.1.296"] } as AdapterRegistrationV1;
    68	    },
    69	    freshRecord: () => ({ overall: "pass", requested_model: model, role_eligibility: ["builder", "independent-reviewer"], independent_review_eligible: true }) as any,
    70	  };
    71	  return { root, repo, git, bin, temp, settings, model, input, envelope, sign, deps,
    72	    run: (extra: Partial<PreflightDependencies> = {}) => runPurePreflightWithDependencies(input, { ...deps, ...extra }) };
    73	}
    74
    75	function fixtureWithUnregisteredSurfaces() {
    76	  const f = fixture();
    77	  const executions: ExecutionIdentity[] = ["builder", "reviewer"].map((name, index) => ({
    78	    execution_id: name, role: index === 0 ? "builder" : "independent-reviewer",
    79	    surface: parseSurfaceId(`pair-seam-${name}`), model: f.model,
    80	    provider: `fixture-${name}-provider`, independence_domain: `fixture-${name}-domain`, effort: "high",
    81	  }));
    82	  const registrations = new Map<SurfaceId, AdapterRegistrationV1>(executions.map(execution => [execution.surface, {
    83	    surface: execution.surface, executable_name: execution.surface,
    84	    provider: execution.provider, independence_domain: execution.independence_domain,
    85	    organization_id: execution.provider, supported_versions: ["2.1.296"],
    86	    identity_probe: { argv: [], parse: "json" }, auth_readiness_probe: { argv: ["auth", "status"], parse: "json" },
    87	    non_interactive_flags: [], environment_allowlist_ref: "antigravity-v1",
    88	    auth_failure_detection: [], limitations: ["Controlled pair-admission regression."],
    89	  }]));
    90	  const executable = readFileSync(join(f.bin, "madbridge-claude-v5"));
   160	    await failure(f, "repository_fingerprint");
   161	    f.input.ambient.HOME = f.input.installation.passwd_home;
   162	  }
   163	});
   164	test("preflight fails with repository_fingerprint when the repository root and the worktree belong to different repositories", async () => {
   165	  const f = fixture(), other = fixture();
   166	  expect((await f.run()).ok).toBe(true);
   167	  expect(realpathSync(f.git(["rev-parse", "--path-format=absolute", "--git-common-dir"])))
   168	    .not.toBe(realpathSync(other.git(["rev-parse", "--path-format=absolute", "--git-common-dir"])));
   169	  f.input.worktree = other.input.worktree;
   170	  f.envelope.worktree = other.input.worktree;
   171	  (f.envelope.repository_fingerprint as Record<string, unknown>).git_sha = other.git(["rev-parse", "--verify", "HEAD"]);
   172	  f.sign();
   173	  await failure(f, "repository_fingerprint");
   174	});
   175	test("preflight fails with executable_unresolved", async () => { const f = fixture(); rmSync(join(f.bin, "agy")); await failure(f, "executable_unresolved"); chmodSync(join(f.bin, "madbridge-claude-v5"), 0o600); await failure(f, "executable_unresolved"); });
   176	test("preflight fails with identity_mismatch", async () => { const f = fixture(); writeFileSync(join(f.bin, "madbridge-claude-v5"), `#!${process.execPath}\nconsole.log('{"type":"system","subtype":"init","model":"other","claude_code_version":"2.1.296"}');\n`); await failure(f, "identity_mismatch"); });
   177	test("preflight fails with identity_mismatch when the independence domain differs from the registration", async () => {
   178	  for (const index of [0, 1]) {
   179	    const f = fixture();
   180	    (f.envelope.executions as Record<string, unknown>[])[index]!.independence_domain = "unexpected-domain";
   310	  const r = await f.run().finally(() => recorder.stop()); expect(r.ok).toBe(true);
   311	  expect([...recorder.paths]).toEqual([]);
   312	  expect(listing(f.root)).toEqual(before); expect(readdirSync(f.temp).sort()).toEqual(temporary);
   313	  if (r.ok) { expect(r.plan.repositoryFingerprint.statusSha256).toBe(new Bun.CryptoHasher("sha256").update(status.stdout).digest("hex")); expect(Object.isFrozen(r.plan)).toBe(true); expect(Object.isFrozen(r.plan.executions)).toBe(true); for (const e of r.plan.executions) { expect(Object.isFrozen(e)).toBe(true); expect(Object.isFrozen(e.arguments)).toBe(true); expect(Object.isFrozen(e.environment)).toBe(true); expect(e.artifactSha256).toBe(new Bun.CryptoHasher("sha256").update(readFileSync(e.executablePath)).digest("hex")); } }
   314	});
   315	test("probe environment equals launch environment", async () => {
   316	  const f = fixture(); let builds = 0; const seen: Readonly<Record<string,string>>[] = [];
   317	  const r = await f.run({ buildEnvironment: (reg,env) => { builds++; return buildAllowlistedEnvironment(reg,env); }, probe: async req => { seen.push(req.environment); return runBoundedProbe(req); } });
   318	  expect(r.ok).toBe(true); expect(builds).toBe((f.envelope.executions as unknown[]).length);
   319	  if (r.ok) for (let i=0;i<r.plan.executions.length;i++) { const env=r.plan.executions[i]!.environment; expect(seen[i*2]).toBe(env); expect(seen[i*2+1]).toBe(env); expect(env).not.toHaveProperty("GH_TOKEN"); }
   320	});
   321	test("a cached attestation is not reused across sessions", async () => { const f = fixture(); let count=0; const probe: PreflightDependencies["probe"] = async req => { count++; return runBoundedProbe(req); }; expect((await f.run({probe})).ok).toBe(true); const first=count; expect(first).toBe(4); expect((await f.run({probe})).ok).toBe(true); expect(count).toBe(first*2); });
   322	test("a surface without an actual-session identity primitive is ineligible", async () => { const f = fixture(); let count=0; await failure(f,"pair_ineligible",{registration:s=>ADAPTER_REGISTRY.get(s),probe:async req=>{count++;return runBoundedProbe(req);}}); expect(count).toBe(2); expect((await runPurePreflight(f.input)).ok).toBe(false); });
   323	test("missing TERM fails preflight as auth_not_ready", async () => {const f=fixture();delete f.input.ambient.TERM;await failure(f,"auth_not_ready");});
   324	test("missing TMPDIR fails preflight as auth_not_ready", async () => {const f=fixture();delete f.input.ambient.TMPDIR;await failure(f,"auth_not_ready");});
   325	test("a caught MissingRequiredVariableError maps to auth_not_ready", async () => {const f=fixture();await failure(f,"auth_not_ready",{buildEnvironment:()=>{throw new MissingRequiredVariableError("TERM","claude-code-v1");}});});
   326
   327	function hang(f: ReturnType<typeof fixture>) { writeFileSync(join(f.bin,"madbridge-claude-v5"), `#!${process.execPath}\nif(process.argv.includes('auth')){process.on('SIGTERM',()=>{});setInterval(()=>{},100);}else {process.on('SIGTERM',()=>process.exit(0));console.log(JSON.stringify({type:'system',subtype:'init',model:${JSON.stringify(f.model)},claude_code_version:'2.1.296'}));}\n`); }
   328	test("the auth probe enforces the 5,000 ms execution deadline", async () => { const f=fixture();hang(f);const start=performance.now();await failure(f,"auth_not_ready");const elapsed=performance.now()-start;expect(elapsed).toBeGreaterThanOrEqual(5000);expect(elapsed).toBeLessThan(6500); },10000);
   329	test("the auth probe escalates SIGTERM to SIGKILL within the forced-cleanup budget", async () => {const f=fixture();hang(f);const signals:string[]=[];await failure(f,"auth_not_ready",{probe:req=>runBoundedProbe(req,{spawn:request=>{const p=Bun.spawn([request.executablePath,...request.arguments],{env:request.environment,stdin:new Blob([request.stdin]),stdout:"pipe",stderr:"pipe"});children.push(p as any);return {...p,stdout:p.stdout,stderr:p.stderr,exited:p.exited,kill:s=>{if(request.kind==="auth")signals.push(s);p.kill(s as any);}};}})});expect(signals).toEqual(["SIGTERM","SIGKILL"]);},10000);
   330	test("the auth probe reaps the child successfully", async () => {const f=fixture();let reaped=0;const r=await f.run({probe:req=>runBoundedProbe(req,{spawn:request=>{const p=Bun.spawn([request.executablePath,...request.arguments],{env:request.environment,stdin:new Blob([request.stdin]),stdout:"pipe",stderr:"pipe"});children.push(p as any);return {stdout:p.stdout,stderr:p.stderr,exited:p.exited.then(code=>{reaped++;return code;}),kill:s=>p.kill(s as any)};}})});expect(r.ok).toBe(true);expect(reaped).toBe(4);});
   331	test("cleanup-budget exhaustion fails closed as auth_not_ready", async () => {const f=fixture();hang(f);await failure(f,"auth_not_ready",{probe:req=>runBoundedProbe(req,{spawn:request=>{const p=Bun.spawn([request.executablePath,...request.arguments],{env:request.environment,stdin:new Blob([request.stdin]),stdout:"pipe",stderr:"pipe"});children.push(p as any);return {stdout:p.stdout,stderr:p.stderr,exited:request.arguments.includes("auth")?p.exited.then(async code=>{await Bun.sleep(700);return code;}):p.exited,kill:s=>p.kill(s as any)};}})});},10000);
HEAD:packages/adapter-antigravity/src/adapter.ts:7:import { attestAntigravity, ModelIdentityUnverifiable } from "./attestation";
HEAD:packages/adapter-antigravity/src/index.ts:10:export { attestAntigravity } from "./attestation";
HEAD:packages/adapter-antigravity/test/attestation.test.ts:3:import { attestAntigravity, ModelIdentityUnverifiable } from "../src/attestation";
HEAD:packages/adapter-claude-code/src/adapter.ts:8:import { attestClaudeCode, ModelIdentityUnverifiable } from "./attestation";
HEAD:packages/adapter-claude-code/src/index.ts:10:export { attestClaudeCode, ModelIdentityUnverifiable } from "./attestation";
HEAD:packages/adapter-claude-code/test/attestation.test.ts:3:import { attestClaudeCode, ModelIdentityUnverifiable } from "../src/attestation";
HEAD:packages/supervisor/src/attestation.ts:3:export const IDENTITY_PROBE_INPUT = '{"type":"user","message":{"role":"user","content":"Report session initialization."}}\n';
HEAD:packages/supervisor/src/attestation.ts:47:export function parseAuthReadiness(output: string): boolean {
HEAD:packages/supervisor/src/attestation.ts:68:export function parseIdentity(output: string, model: string, versions: readonly string[]): boolean {
HEAD:packages/supervisor/src/attestation.ts:77:  parseAuth: parseAuthReadiness,
HEAD:packages/supervisor/src/attestation.ts:83:export async function runBoundedProbe(request: ProbeRequest, overrides: Partial<ProbeRuntime> = {}): Promise<ProbeResult> {
HEAD:packages/supervisor/src/attestation.ts:162:      ? parseIdentity(output, request.model, request.supportedVersions)
HEAD:packages/supervisor/src/preflight.ts:13:import { IDENTITY_PROBE_INPUT, runBoundedProbe } from "./attestation";
HEAD:packages/supervisor/src/preflight.ts:55:  probe: typeof runBoundedProbe;
HEAD:packages/supervisor/src/preflight.ts:60:  buildEnvironment: buildAllowlistedEnvironment, probe: runBoundedProbe, freshRecord: latestFreshRecord,
HEAD:packages/supervisor/src/preflight.ts:183:      if (!(await d.probe({ ...request, arguments: [...registration.identity_probe.argv, "--model", execution.model], stdin: IDENTITY_PROBE_INPUT, kind: "identity" })).ok) return fail("identity_mismatch");
HEAD:packages/supervisor/test/attestation.test.ts:5:import { IDENTITY_PROBE_INPUT, runBoundedProbe as executeProbe, type ProbeRequest, type ProbeRuntime, type ProbeResult, parseIdentity, parseAuthReadiness } from "../src/attestation";
HEAD:packages/supervisor/test/attestation.test.ts:23:async function runBoundedProbe(req: ProbeRequest, rt: Partial<ProbeRuntime> = {}): Promise<ProbeResult> {
HEAD:packages/supervisor/test/attestation.test.ts:34:  return {executablePath,arguments:[],environment:Object.freeze({}),signal:new AbortController().signal,stdin:kind==="identity"?IDENTITY_PROBE_INPUT:"",kind,model:"exact",supportedVersions:["2.1.296"]};
HEAD:packages/supervisor/test/attestation.test.ts:43:  const r=await runBoundedProbe(req);expect(r.ok).toBe(true);
HEAD:packages/supervisor/test/attestation.test.ts:45:test("identity rejects a model mismatch",async()=>{expect((await runBoundedProbe(request("console.log(JSON.stringify({type:'system',subtype:'init',model:'exact-alias',claude_code_version:'2.1.296'}));","identity"))).ok).toBe(false);});
HEAD:packages/supervisor/test/attestation.test.ts:46:test("identity rejects a missing system/init event",async()=>{expect((await runBoundedProbe(request("console.log(JSON.stringify({type:'result',model:'exact'}));","identity"))).ok).toBe(false);});
HEAD:packages/supervisor/test/attestation.test.ts:47:test("identity rejects an unsupported CLI version",async()=>{expect((await runBoundedProbe(request("console.log(JSON.stringify({type:'system',subtype:'init',model:'exact',claude_code_version:'2.1.233'}));","identity"))).ok).toBe(false);});
HEAD:packages/supervisor/test/attestation.test.ts:49:  expect(parseIdentity('{"type":"system","subtype":"init","model":"wrong","claude_code_version":"2.1.296"}\n{"type":"system","subtype":"init","model":"exact","claude_code_version":"2.1.296"}',"exact",["2.1.296"])).toBe(false);
HEAD:packages/supervisor/test/attestation.test.ts:50:  const req=request(`const input=await Bun.stdin.text();if(input!==${JSON.stringify(IDENTITY_PROBE_INPUT)})process.exit(1);console.log(JSON.stringify({type:'system',subtype:'init',model:'exact',claude_code_version:'2.1.296'}));`,"identity");expect((await runBoundedProbe(req)).ok).toBe(true);
HEAD:packages/supervisor/test/attestation.test.ts:55:  expect((await runBoundedProbe(req,{spawn:wrappedSpawn(signals)})).ok).toBe(true);expect(signals).toEqual(["SIGTERM"]);
HEAD:packages/supervisor/test/attestation.test.ts:57:test("successful bounded execution",async()=>{expect((await runBoundedProbe(request(passSource))).ok).toBe(true);});
HEAD:packages/supervisor/test/attestation.test.ts:58:test("spawn failure is bounded and fail closed",async()=>{const req=request(passSource);rmSync(req.executablePath);expect((await runBoundedProbe(req)).ok).toBe(false);});
HEAD:packages/supervisor/test/attestation.test.ts:59:test("pre-spawn cancellation starts no child",async()=>{const req=request(passSource);const c=new AbortController();c.abort();req.signal=c.signal;let spawned=0;expect((await runBoundedProbe(req,{spawn:r=>{spawned++;return wrappedSpawn([])(r);}})).ok).toBe(false);expect(spawned).toBe(0);});
HEAD:packages/supervisor/test/attestation.test.ts:63:  expect((await runBoundedProbe(req,{spawn})).ok).toBe(false);expect(signals).toEqual(["SIGTERM","SIGKILL"]);expect(ended).toBe(true);
HEAD:packages/supervisor/test/attestation.test.ts:65:test("signal termination fails closed",async()=>{expect((await runBoundedProbe(request("process.kill(process.pid,'SIGTERM');"))).ok).toBe(false);});
HEAD:packages/supervisor/test/attestation.test.ts:66:test("stdout overflow fails closed",async()=>{expect((await runBoundedProbe(request("process.stdout.write('x'.repeat(65537));"))).ok).toBe(false);});
HEAD:packages/supervisor/test/attestation.test.ts:67:test("stderr overflow fails closed",async()=>{expect((await runBoundedProbe(request(passSource+"process.stderr.write('x'.repeat(65537));"))).ok).toBe(false);});
HEAD:packages/supervisor/test/attestation.test.ts:70:  const r=await runBoundedProbe(request(source));expect(r.ok).toBe(true);expect(r.diagnostic.stdoutBytes).toBe(65536);expect(r.diagnostic.stderrBytes).toBe(65536);
HEAD:packages/supervisor/test/attestation.test.ts:75:  expect((await runBoundedProbe(req,{spawn,now:()=>performance.now()+offset})).ok).toBe(false);
HEAD:packages/supervisor/test/attestation.test.ts:79:  try{const start=performance.now();expect((await runBoundedProbe(req,{spawn:wrappedSpawn(signals)})).ok).toBe(false);expect(performance.now()-start).toBeLessThan(6100);expect(signals).toEqual(["SIGTERM","SIGKILL"]);}finally{Date.now=old;}
HEAD:packages/supervisor/test/attestation.test.ts:84:  const start=performance.now();expect((await runBoundedProbe(req,{spawn})).ok).toBe(false);expect(signals).toEqual(["SIGTERM","SIGKILL"]);expect(times[1]!-times[0]!).toBeLessThan(550);expect(times[1]!-times[0]!).toBeGreaterThan(450);expect(performance.now()-start).toBeLessThan(1200);
HEAD:packages/supervisor/test/attestation.test.ts:90:  expect((await runBoundedProbe(req,{spawn})).ok).toBe(false);expect(performance.now()-start).toBeLessThan(1150);expect(signals).toEqual(["SIGTERM","SIGKILL"]);
HEAD:packages/supervisor/test/attestation.test.ts:96:  expect((await runBoundedProbe(req,{spawn,parseAuth:text=>{expect(reaped).toBe(true);parsed=true;return parseAuthReadiness(text);}})).ok).toBe(true);expect(parsed).toBe(true);
HEAD:packages/supervisor/test/attestation.test.ts:97:  parsed=false;expect((await runBoundedProbe(request(passSource+"process.exit(1);"),{parseAuth:text=>{parsed=true;return parseAuthReadiness(text);}})).ok).toBe(false);expect(parsed).toBe(false);
HEAD:packages/supervisor/test/attestation.test.ts:101:  for(const value of cases){const text=typeof value==="string"?value:JSON.stringify(value);expect((await runBoundedProbe(request(`console.log(${JSON.stringify(text)});`))).ok).toBe(false);}
HEAD:packages/supervisor/test/attestation.test.ts:105:  for(const source of cases){const r=await runBoundedProbe(request(source));expect(Object.keys(r).sort()).toEqual(["diagnostic","ok"]);expect(Object.keys(r.diagnostic).sort()).toEqual(["exitCode","primitive","result","signal","stderrBytes","stdoutBytes"]);expect(JSON.stringify(r)).not.toContain("RAW-PRIVATE-CANARY");}
HEAD:packages/supervisor/test/attestation.test.ts:106:  for(const mode of ["spawn","cancel","timeout","cleanup"]){const req=request(idle);const c=new AbortController();req.signal=c.signal;if(mode==="spawn")rmSync(req.executablePath);if(mode==="cancel")c.abort();let offset=0;const spawn:ProbeRuntime["spawn"]=r=>{const p=wrappedSpawn([],mode==="cleanup"?700:0)(r);afterHandlerReady(r,()=>{offset=5001;c.abort();});return p;};const r=await runBoundedProbe(req,{spawn,now:()=>performance.now()+offset});expect(Object.keys(r.diagnostic).sort()).toEqual(["exitCode","primitive","result","signal","stderrBytes","stdoutBytes"]);expect(JSON.stringify(r)).not.toContain("RAW-PRIVATE-CANARY");}
HEAD:packages/supervisor/test/preflight.test.ts:8:import { runBoundedProbe } from "../src/attestation";
HEAD:packages/supervisor/test/preflight.test.ts:62:    probe: req => runBoundedProbe(req, {spawn: request => { const p=Bun.spawn([request.executablePath,...request.arguments], {env:request.environment,stdin:new Blob([request.stdin]),stdout:"pipe",stderr:"pipe"}); children.push(p as any); return p; }}),
HEAD:packages/supervisor/test/preflight.test.ts:317:  const r = await f.run({ buildEnvironment: (reg,env) => { builds++; return buildAllowlistedEnvironment(reg,env); }, probe: async req => { seen.push(req.environment); return runBoundedProbe(req); } });
HEAD:packages/supervisor/test/preflight.test.ts:321:test("a cached attestation is not reused across sessions", async () => { const f = fixture(); let count=0; const probe: PreflightDependencies["probe"] = async req => { count++; return runBoundedProbe(req); }; expect((await f.run({probe})).ok).toBe(true); const first=count; expect(first).toBe(4); expect((await f.run({probe})).ok).toBe(true); expect(count).toBe(first*2); });
HEAD:packages/supervisor/test/preflight.test.ts:322:test("a surface without an actual-session identity primitive is ineligible", async () => { const f = fixture(); let count=0; await failure(f,"pair_ineligible",{registration:s=>ADAPTER_REGISTRY.get(s),probe:async req=>{count++;return runBoundedProbe(req);}}); expect(count).toBe(2); expect((await runPurePreflight(f.input)).ok).toBe(false); });
HEAD:packages/supervisor/test/preflight.test.ts:329:test("the auth probe escalates SIGTERM to SIGKILL within the forced-cleanup budget", async () => {const f=fixture();hang(f);const signals:string[]=[];await failure(f,"auth_not_ready",{probe:req=>runBoundedProbe(req,{spawn:request=>{const p=Bun.spawn([request.executablePath,...request.arguments],{env:request.environment,stdin:new Blob([request.stdin]),stdout:"pipe",stderr:"pipe"});children.push(p as any);return {...p,stdout:p.stdout,stderr:p.stderr,exited:p.exited,kill:s=>{if(request.kind==="auth")signals.push(s);p.kill(s as any);}};}})});expect(signals).toEqual(["SIGTERM","SIGKILL"]);},10000);
HEAD:packages/supervisor/test/preflight.test.ts:330:test("the auth probe reaps the child successfully", async () => {const f=fixture();let reaped=0;const r=await f.run({probe:req=>runBoundedProbe(req,{spawn:request=>{const p=Bun.spawn([request.executablePath,...request.arguments],{env:request.environment,stdin:new Blob([request.stdin]),stdout:"pipe",stderr:"pipe"});children.push(p as any);return {stdout:p.stdout,stderr:p.stderr,exited:p.exited.then(code=>{reaped++;return code;}),kill:s=>p.kill(s as any)};}})});expect(r.ok).toBe(true);expect(reaped).toBe(4);});
HEAD:packages/supervisor/test/preflight.test.ts:331:test("cleanup-budget exhaustion fails closed as auth_not_ready", async () => {const f=fixture();hang(f);await failure(f,"auth_not_ready",{probe:req=>runBoundedProbe(req,{spawn:request=>{const p=Bun.spawn([request.executablePath,...request.arguments],{env:request.environment,stdin:new Blob([request.stdin]),stdout:"pipe",stderr:"pipe"});children.push(p as any);return {stdout:p.stdout,stderr:p.stderr,exited:request.arguments.includes("auth")?p.exited.then(async code=>{await Bun.sleep(700);return code;}):p.exited,kill:s=>p.kill(s as any)};}})});},10000);
HEAD:test/phase3a/evidence-pipeline.test.ts:756:import { parseAuthReadiness } from "../../packages/supervisor/src/attestation";
HEAD:test/phase3a/evidence-pipeline.test.ts:831:      result: at(8).exit === 0 && parseAuthReadiness(at(8).stdout) ? "pass" : "fail",
HEAD:test/phase3a/evidence-pipeline.test.ts:888:    "./attestation": { IDENTITY_PROBE_INPUT: "synthetic input", runBoundedProbe: probe },

exit_status=0
```

## Baseline

Precondition 7 passed, each command once, in order, in the foreground.
- Log 078: bun install --frozen-lockfile; uptime load 3.12, 2.59, 3.09;
  exit 0. It set only founder-act/src/main.ts's executable bit.
  Logs 079 and 081 show the change and its authorized checkout restore.
- Log 084: bunx tsc --noEmit; wait log 080 passed at 1.80; actual first
  uptime load 2.14, 2.11, 2.69 after approval; exit 0 and no command output.
- Runtime log 085 passed before the whole suite.
- Log 088: bare bun test; wait log 086 passed at 1.77; actual first
  uptime load 1.66, 2.15, 2.57; exit 0.
- bun.lock before and after:
  34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0.
  The clone was clean after the mode restore and after the suite.

Bun's summary lines, verbatim from log 088:

```text
 1945 pass
 0 fail
 24066 expect() calls
Ran 1945 tests across 142 files. [181.33s]

exit_status=0
```

Log 089 is the base list: every file, full Bun test name and result,
without timings, 1945 result lines across 142 files. No listing run was
needed. Its SHA-256:
21382c8716769763b4f076f899e47ef3a09704ebb05f1f9949ef027918f4ded5.
Baseline suite log SHA-256:
e58ac63a1953d83dc919a58d48f1e85d0efe916164f3f4c2d143a5b8124e5166.

## Opening evidence manifest

Each SHA-256 below was produced by shasum -a 256 in log 092. It covers
all completed logs before this opening, including each authority read,
each runtime check, the waits, the install restore and the base list.
The complete commands and uptime readings are in those immutable logs.
The Phase 1 appendix supplies later command evidence.

```text
5b6201f03599ae5d6e1c01fd8a2202ea36ad1a844ed58e03d8bb92dbe90214ee  logs/001-governed-version.log
c5e10cf848cc68a9a8d51cb9a29c216f3c6db0f3adde797f7baac9264dfd142d  logs/002-pwd.log
40a2aaebec4852fd122a32a66d1ae5bd53413b298d14e512d56537d0172f9d3a  logs/003-branch.log
20b6d11e9c14097bf43addcb6fce0724d1a9702dd33fab76bb03f750df145667  logs/004-head.log
8b2073c22e0eea52c4dc7e5336e20ec83dcf4852830a97667833da2da4d04e37  logs/005-git-name.log
e7e67d5f1c8324c671c1bfed4528cdbd3cb2948bef60a28847e3b3b4644a086e  logs/006-git-email.log
832fa84af43b8b1998ae233448b637a2094ae4d69652c5eeb2f965850741bc72  logs/007-runtime-check.log
171428209dfb6a358388f22d5b91fb48605e7f26c8fb051430a049ab57d3debc  logs/008-repository-preconditions.log
6c2d65a4a55fe4e6d921132d350757c64e53c279ffd502f50136b366b3db82cc  logs/009-manifests-and-instructions.log
0c6044380372327d1a8c0e7eec6f447606466940792a7b94a3f430cb1b280da6  logs/010-authority-agents.log
fdb6fce7ac628f0f41a88bf57964ae38f27f0a2fc23e3ab2d4f9a86f44be9264  logs/011-authority-m0.log
6f848840ff5d6589b1192895235b9cfc5bdad008afc4858d59e052b1eebd9583  logs/012-authority-m0-addendum.log
710a7e088c02a9d473d3993748b7a86ba0d4068b2c502c3736aa6588167118c3  logs/013-authority-hashes.log
4eb0fd41571f9f958560601954a469656ed78f8b7cbe1f18054e294149ff9640  logs/014-authority-12.log
b7d272c5d49db44de75cda07d8d3efc0c5a17383aa126a0c1153a4cbe55a5f05  logs/015-authority-13.log
1d56307024f8ef96bc9996dc6e9e503be18a292e0ff4e2a5fddfbef812c929b3  logs/016-authority-14.log
0f015a92084419a23cd206ffaae5067f4c6b07a5b598355454dbd3a8c1d5de5f  logs/017-authority-15.log
97acd4a2d359bc5cb932fb8df78bca837bd3ce8d54948fd6a6500d3b67824b73  logs/018-authority-16.log
8ff6e90acc65e9d267c05ad5c4ccf1f043f4486aa5f39ff6768a30e7892a4faf  logs/019-authority-17.log
8bb17f609510abbd7ef33cf8a10cb78517a1d07172b447d20651b6a450601772  logs/020-authority-18.log
edcff6e5110b23e23dd6827c253b39a8daeedfed4486a4c1cb745c926a375e1b  logs/021-authority-22.log
73303a4eb074915dcceb892624c40069fee44847a08fb52062a6a9b3c93098e6  logs/022-read-harness-authority.log
a76c56255bc78f5467079accd8960568c4faaa5e1026c3052e5d0d71a498439b  logs/023-read-governed-build-authority.log
3b8850e6ee6017003ca9038c38a703ec7a30d796ee54237a9f042bd8671e2136  logs/024-authority-model.log
04376cb2169ba554bfd80c7894c8888321f619d0d0b6a18605194b70014217fe  logs/025-authority-1.log
1cabfe8be7fd5e4f30433ca982e89660ef997621fdeb2ec60b9fe8a0bf892ef8  logs/026-authority-2.log
f1e521672a11889623b345fac3595a113f43f30a0b2406f7e5db8af04b9373f6  logs/027-authority-3.log
8c9c762d4fb4782e727a35d6137445eb3d3b5a2d39f168fa279b565bb39dd1ef  logs/028-authority-4.log
ac16692e00c5f7cb371406242c918f6d198435313bd53b636377a5a9d35fbb59  logs/029-authority-5.log
b55e1d093bf2c48f8f304e1db72700fe27969c1028b5e85df4f285a2964fe7fc  logs/030-authority-6.log
4b9c5f7c8555dfb3aa7068e72b82dc8db031906a754ccb8b904aaadcb3f4f092  logs/031-authority-7.log
8684c4d58a2df07659f03f73000446e877b88ebda7724456c74d77dc53105c04  logs/032-read-h2-authority.log
11b7f00332ad8af79341e9c65de631bb1659238c0fe0346d1372028d1131fcab  logs/033-authority-8.log
7a78c6930dcf0fb73a434fb61278374405eae4287e6398fff732ee9e60c9c9af  logs/034-authority-9.log
def17d9797e316b98a5432aecb29afb8937d5a5e4461a14589d5eea537cba7c3  logs/035-authority-10.log
01c7333e1dbeae140d7d115482e47dcd29cc978fd72586650eac8811aab21026  logs/036-authority-19.log
79d0de69af6e62b999cc776ee1899a7f54bd931cc4fdb3b9fd1772f836c3d813  logs/037-authority-20.log
7081e40bf1e2ee02a2ed3fda9dd8e07fb75737d1ae45ba63b54f9339100f4216  logs/038-authority-21.log
668f5d3ca3686ce9375bc6f782a14e1dae090288675514fa84205c0a232712fc  logs/039-authority-23.log
0c886759fe17a6f3f19087a93c0d02237a82a143146ec3ceba5703b6eace3cef  logs/040-authority-24.log
4fd5c3471f470f32d2fb0af069bc59736289f462734ede2b3480280c7a6186e6  logs/041-authority-25.log
de7f677c5378630efcb5c34d5b9d225259f19fd20e887156f98f9d7b38c09e1e  logs/042-authority-26.log
9adf307333d46e2637eddf08d2908444a907022c8c3694534c3bf20892dec33a  logs/043-authority-27.log
51281767cce93517a24cc5f92383edd153f53deed73b4dd211a416c4088e3fc0  logs/044-authority-28.log
69f251e3c6c711881f164efd9ed8e0e3f487afb3daa89de9e653ede5a4b528ad  logs/045-authority-29.log
463eb7b5d8f00dbfe38100d661ab04a95ec1f4ae08480170515ddf26d4fdec35  logs/046-authority-30.log
3eb4e3c8eec2b4e61fc0eb78761ffd494fdbe74650b8e514ba4914c70cef1697  logs/047-authority-32.log
00a55535dec92e8dda18796d14c486ec5dce4d33ec47ca0fea796b7fa8be8102  logs/048-authority-31.log
cf60ebf067460ffa18f7bf169c3bffbafc9ea48d03b360a1f6ad146053920dce  logs/049-authority-3a-design-1.log
c42559a304b81e5a710f8fc907506f462f8c1e7664175dd156d2f0e74fc0a98c  logs/050-authority-3a-design-2.log
ff973c765f14e9edbf0ee07c9040a7f7d6a9065509cb65b9ea24ff148e18dd27  logs/051-authority-3a-design-3.log
4888a18233283920a59d9bf894360231ee30196ef8daab9efa08fddd0ceb095a  logs/052-authority-3a-design-4.log
c17c550d98e0489a828dedfe8c73bfa0bbda2388ad91b2a0f3e365043c6a2aca  logs/053-authority-read-gaps.log
000f46b2234c2b83e6d658978df708c71e56d0ebfcb8b015ecd88c22955c510d  logs/054-base-registry-environment-manifests.log
14e86dd35c3d58e84d2e4ac23ac19a75ba1e7a0e1583de5039f4e6a147b25622  logs/055-base-attestation.log
254987ba02f2ce0c050b30636ab585269e7b8b62e73a349851c836b029ccfe41  logs/056-base-preflight.log
67c31d8c3831fe6c79da8efadea7da9ff45246f6760aa08679c72fefc299562d  logs/057-base-blobs-importers-and-addendum-lines.log
933ef925b56a492113aebbf0e633bd6d99bb62e28cc3bb70eb962901cb1e64b9  logs/058-halt-test-authorization-evidence.log
84ca2e303f80b7c290bb57deaad9816f11ab2a542c786bb6e41b14602714545e  logs/059-halt-evidence-hashes.log
fb00e32191b4f1b7353e088975977530f3b83f0e80a90c9db29a5af95b8cb54a  logs/060-halt-final-state.log
2d0145f46e191bd39e8be70f72acfb7bcc129aab9382dc35a733a74f4ed8bebe  logs/061-halt-state-hash.log
2acb4888b616fe4f10d3699442e9f25ccefe7667ef1165262bfd134b268e483f  logs/062-write-halt-report.log
765571e5897331ba21c278830b81992d02623461e53a9561d92555829f4965e3  logs/063-resume-prompt-manifest.log
9459178d749d8183afa72ddf5bf9a01ad3f281ac56c5b3f80b63891c2449fd72  logs/064-resume-prompt-files.log
32add55c83cb5dcfd2cad7ea5341f19f4692e6a125f40dc23892f9e77500e88b  logs/065-resume-addendum-2.log
56b4e0f0f4777f1ad35654a415741f68368e9a97607e9fa85b88906c689cefcb  logs/066-resume-governed-version.log
4406b0cd0074ae4736f322900ce3481f6cd1f33d8f41fe2c6148f1d50c32d718  logs/067-resume-repository-and-report.log
8b00ad088075f3ccc036d87b29870386eca12747843e6f2b7aeef757b6392cd8  logs/068-resume-runtime.log
7be113725a85ddd961a62b6644e880d93f0a9afe44a0769bc17efce5492c6cf1  logs/069-complete-source-preconditions.log
55d807efa47004c5911fc7562190b6f8fa5ca7035b86f2f8656aaffb4541f36a  logs/070-contract-file-inventory.log
4fc79678e318456f1926ac9feb7156105130da77b53f602df11472845318d58d  logs/071-claude-adapter-contracts.log
caaabef95f34f6b44813b6cdd928f6c7b9da782d90f3dbb8d44f56dcbce33add  logs/072-surface-event-input-exit-contracts.log
c0e5e451cef1d7c9bbe3eef3268c4974d6f463173fba90fbb89f30ee5e2d0318  logs/073-surface-documentation.log
6b5893d46edd5f96e1d0a272bb008fb39d65f97e4f22c7053d338cbb6b386fd8  logs/074-surface-flow-and-redaction.log
1594909f5e02aae4a3b4bbe36d9b56f985a748908a41ac65e2149fc4afdc07ea  logs/075-surface-agent-flow.log
2a131f1c557272e5e3418034cc34dca5a5b184c8ce72d14020c47be6be2b38cf  logs/076-scratch-root.log
7527d73129c66fd884602e4e6a2ffd41f98771507b435638ba4eab1c44d85310  logs/077-remaining-reference-and-baseline-lock.log
b0c1a9c58db30d352c4a0690fb2cf1a11da4bb8e07be4da4b62ccd6ddca4ce97  logs/078-baseline-install.log
0a772a67f61cc81cc68e5ee1bb9ac1b374b269051df09675937f5f3df3a61e4b  logs/079-baseline-install-state.log
7c0cd322645b824d330742eace963717f3518487440fbde8b07b4a0c27c28248  logs/080-baseline-typecheck-load.log
0f877433fc75fa99bea1ffb17edd8f1296e468a49d1d4634d729c1cb8ad52e2e  logs/081-baseline-restore-install-mode.log
fc791a6a7f808a10792e61210ba6b6c56626b60d9ad289ecf8c3341fa9255aa5  logs/082-record-and-attribution-contracts.log
9023c9591c24b09279770cc7f31d4c7d442640b517862c38686b27e6bd880ae2  logs/083-dispatch-and-record-integration-contracts.log
c4e3846cdb6a01135bc05117c1169a59a0f3114f6697df311be9e84b56061cc4  logs/084-baseline-typecheck.log
4243661b85e8566276fa784efe5807438c2e4a00083967bb0721fdf24d318e30  logs/085-baseline-suite-runtime.log
0e7dc26a25b0a1fede45ead15254dffce729180b10a80a6378f49a233c7500ed  logs/086-baseline-suite-load.log
b8cb895726ed8ba7b59a54ebb2fd264652a49e4aa856aae72a8dc2fe960b3a0a  logs/087-record-observation-fields.log
e58ac63a1953d83dc919a58d48f1e85d0efe916164f3f4c2d143a5b8124e5166  logs/088-baseline-suite.log
21382c8716769763b4f076f899e47ef3a09704ebb05f1f9949ef027918f4ded5  logs/089-baseline-test-list.log
f2cafe1aa372c7e858f87d0a1e4cd8102124a3086f53312d2a6b6807b11f8983  logs/090-baseline-final-state.log
6d77732de5870111e9ff3b4e844bdc71d3315f8af6f2cfca8e284b56123d5813  logs/091-draft-task-detail.log
```

## Task detail written before code or test changes

R1: change only supported_versions in CLAUDE_CODE_REGISTRATION to
2.1.325. Change the matching protocol test value and the preflight fixture
values at base lines 32, 67, 85 and 327, under Addendum 2 B2. Base line
176 and every existing attestation test retain their bytes.

R2: add MADV_SURFACE_REGISTRATION and its ENTRIES line after Antigravity.
Use exactly B2's static fields, ordered flags, auth conditions and three
limitations. No vector contains --allow-shell. Add the field-for-field
test "madv-surface registration matches DEC-20261115-02 field for field"
to packages/protocol/test/adapter-registry.test.ts. Admit the third entry
only where Addendum 1 B3 permits. Update the exact-byte exception hash,
and pin the historical Task 57 comparison to 2.1.296, as that addendum
requires. No root package.json change is needed.

R3: add only madv-surface-v1 to the private allowlists table in
packages/supervisor/src/environment.ts. Preserve construction, redaction
and all installation/TMPDIR checks. New tests in
packages/supervisor/test/madv-environment.test.ts cover:
- "madv-surface-v1 has exactly the approved variables"
- "madv-surface-v1 requires exactly the six required variables"
- "madv-surface-v1 drops state, overrides and unlisted variables"
- "madv-surface redacts its synthetic canary"
New preflight tests in packages/supervisor/test/madv-preflight.test.ts:
- "missing MINIMAX_API_KEY maps to auth_not_ready before probes"
- "madv-surface reuses one allowlisted environment for four consumers"
These tests use a local controlled registration until R2 installs the real
entry, and a test-only preflight dependency seam. Test helpers stay under
packages/supervisor/test, never in the protected Phase 3A fixtures.
The four consumers are the two probes and the environment supplied by the
launch plan for the PTY host and child; M1's actual launch wiring is deferred.
Use a synthetic canary with no provider-key prefix.
Break 5 adds XDG_STATE_HOME to the production allowlist, and the exact-list
and discard tests must reject it. Restore the production file byte-for-byte.

R4: create packages/adapter-madv-surface, private ESM version 0.1.0,
with only workspace dependencies, no supervisor dependency and no external
dependency. The package follows the Claude adapter's package/index/test
layout, execution identity binding and typed fail-closed identity contract.
It does not copy its legacy Shell, launch, random-PID, configuration-probe,
MCP notification or config-preview contracts: Phase 3A design 9.10 retires
those launch paths, and M0's PTY host owns launch. The new adapter starts
no process, runs no shell and writes no state.

Provide encodeUserInput, one JSON user message plus one newline.
Provide one incremental MadvSurfaceParser with bound execution/session
results, a stable wire session, exactly one first init, response-before-
assistant/tool order, matched tool-use/result order and checked responses.
Every model_response is checked against model, registered provider/domain
and api.minimax.io. Classify auth_failed, endpoint_refused, provider_error,
identity_unavailable, model_refused, domain_unresolved and identity_mismatch
in the design's precedence, including matching system events and exits.
Every failure returns whole-session interruption and retry false.
No startup attester, process start or session interruption wiring is built.

The deadline text of DEC-20261108-04 B6 is:
"Its deadline is 30 seconds from send."
The fixed text is "Reply with your model identifier and nothing else."
Expose an injected monotonic time boundary for missing model evidence,
and a new-request boundary for M1 to use without a second parser.
Build parseMadvIdentity and parseMadvAuthReadiness on the same typed
failure boundary; identity uses the stream parser and all B3 predicates
in order, auth checks every B4 field and clean exit.

New packages/adapter-madv-surface/test/parser.test.ts names its cases:
- "input encoder preserves one text in one newline-terminated user message"
- "valid identity evidence binds execution and session"
- "failure precedence: CASE" for HTTP 401, HTTP 403, redirect, HTTP error,
  invalid body, absent model, Anthropic model, unnamed family, model
  mismatch and domain mismatch
- "identity rejects init FIELD" for each B3 init predicate
- "identity rejects response FIELD" for each B3 response predicate
- "auth rejects FIELD" for each B4 field, plus malformed shape and exit
- "missing evidence fails at the 30-second deadline"
- "event order rejects CASE" for missing/duplicate init, out-of-session
  events, assistant/tool before response and unmatched tool results
- "a fail-closed event after valid evidence still interrupts"
- "every later response is checked before its tools"
Additional boundary tests may be added with their exact names recorded in
the Phase 1 table. Synthetic streams follow the release shape. No recorded
live stream is a Phase 1 fixture.
Break 1 removes response-model equality in production; its mismatch case
must fail. Restore the production file byte-for-byte.
Run the first non-frozen install only for the new workspace, and preserve
its complete lockfile diff.

R5: declare the adapter dependency in packages/supervisor/package.json,
add exactly its paths entry, and perform the second non-frozen install.
Preserve all four existing runner constants and Claude parsers/input.
Extend ProbeRequest with the registration, keeping existing callers valid.
Select the 30-second madv-surface limit and parsers from that registration;
the existing test-only runtime override cannot choose production dispatch.
Keep one bounded runner, stream bounds, abort, monotonic timing, cleanup,
exit/signal checks and metadata-only result shape.

preflight.ts keeps its current import boundary by getting the madv input
encoder through attestation.ts. This preserves the existing Task 57
in-memory dependency mock without changing that test.
Use the registration's identity vector plus --model/model, encoded fixed
text, natural exit and a 30-second limit. Auth gets its registered vector,
empty stdin and 30 seconds. Every identity/auth failure retains its existing
preflight failure code. The madv-surface role guard checks all executions
before any probe: pair_ineligible is the existing code because a role that
cannot map to the pinned reviewer launch is an unsupported pair member.
Keep probe order, admission-presence checks and the protected repository/
provider/domain lines byte-identical. Reuse the constructed environment.

Add packages/supervisor/test/madv-probes.test.ts for:
- "dispatch keeps Claude probes and input unchanged"
- "madv-surface identity continues beyond init to natural exit"
- "registration chooses 30 seconds beside Claude's 5 seconds"
- "madv-surface identity failures map to identity_mismatch"
- "madv-surface auth failures map to auth_not_ready"
- bounded cleanup, stream and cancellation cases for the new dispatch
Extend the new madv-preflight.test.ts with:
- "madv-surface probes run exactly once with pinned arguments and input"
- "unsupported madv-surface roles fail before any probe"
- "madv-surface hash and version changes refuse the capability record"
- eligible real-registry Claude/madv pairing and provider/domain/organization
  collision and Antigravity rejection cases.
The real registry proves the admitted pair; dependency seams isolate each
otherwise-unrepresentable collision without changing pair policy.
Breaks 2, 3 and 4 respectively end madv identity at init, reduce its limit
to five seconds, and remove its role guard. Each must fail its named file
alone, after a runtime check and load wait, then restore exact bytes.
Do not put registered surface IDs in production collection initializers.

R6: write record/m0-record.ts outside tui, uncommitted. Parse only the
specified CLI forms and verified manifest-covered captures under DIR.
Refuse secret/override environment presence, missing/uncovered/changed
files, forbidden token markers and a clone that is not a git work tree.
Import the selected clone's parsers, registry and record/storage code by
absolute path. Check binary and version pins before/after, every capture's
status/argv/stdin as appropriate, auth and actual response evidence.
The retired MiniMax ID must resolve to the current one; a request echo
fails identity. Claude evidence requires both M and alias captures'
assistant model and positive-output result model usage with emitted provider
firstParty and canonical model M, never init or auth as identity proof.
Print each check, the validated record, the proposed passwd-home storage
root and filename. Print only the explicitly required init safety fields
and tool-call counts for Claude. --write makes one store call only after
all validation and marker checks. This session never uses --write.

Gather macOS runtime/host facts through its schema. The Linux branch uses
only Linux schema fields; term/shell from the captured environment are
validated but cannot be invented as forbidden Linux record fields.
PTY stays fail with no observed timings. Compose overall, roles, expiry
and limitations exactly under B10 and B15 and Task 57 B6.
Synthetic runs: MiniMax pass; retired-ID echo fail; Claude pass; another
serving model fail; each environment/file/manifest/marker/worktree refusal.
Use one disposable scratch root. Linux is not run in this session.

Validation: runtime checks and logged waits as commissioned; focused
requirements and five restored breaks; full frozen install/typecheck/bare
suite at the fourth commit; preserve every base file/name/result, map only
the authorized registry-name change, and show exact count arithmetic.
The fifth commit appends Phase 1 evidence without changing this opening.
No investigation, live record, attester, start, Phase 2 fixture/packet,
B12 final gate, host certification or review is claimed by Phase 1.

Opening preparation note: the first whitespace check (log 093) found
trailing tabs on blank numbered-source lines copied from the logs.
Before the opening commit, log 094 removes trailing spaces/tabs from
these quotations. Source text, line numbers and complete logs remain
unchanged. The log's final exit 0 came from the last hash command, not
the earlier whitespace check; no commit followed that failed check.

## Phase 1: implementation and offline evidence


Code head: 6b456f468fc3a72894a8f39b8a07c86b9cf077b4. Opening prefix SHA-256: 0e00d512fa435ebeef494aa2453dd85f01f4941afdeae436b243735fa772386a. The opening's bytes and lines remain unchanged.


R1: CLAUDE_CODE_REGISTRATION.supported_versions is exactly 2.1.325. Only the expressly authorized expected-version and shared-fixture values change.

R2: MADV_SURFACE_REGISTRATION and its ENTRIES line add the single static B2 registration after Antigravity. Field-for-field testing checks every value; no argument vector adds shell permission.

R3: environment.ts adds madv-surface-v1, preserving construction, redaction and preflight installation/TMPDIR validation. New environment and preflight tests cover exact names, missing required variables, excluded state/override variables, canary redaction and one environment shared by both probes and the launch plan's host/child consumers. Actual M1 launch wiring remains deferred.

R4: the private ESM adapter has no dependencies or subprocess/shell/state behavior. encodeUserInput, MadvSurfaceParser, beginRequest, checkDeadline, finish, parseMadvIdentity and parseMadvAuthReadiness provide bound events, ordering, every-response checks, typed failure precedence, whole-session interruption with retry false and a 30-second missing-evidence deadline. It follows the Claude package layout, identity binding and typed failure contracts, while leaving legacy launch/configuration/MCP notification contracts behind as the opening task detail explains.

R5: supervisor dependency, tsconfig path and lockfile line connect the adapter. ProbeRequest carries registration; runBoundedProbe selects the madv parser, 30-second limit and natural exit from that registration. Claude parser/input/five-second constants and existing attestation tests remain unchanged. preflight keeps probe order, protected repository/provider/domain checks and launch arguments, and rejects unsupported madv roles before any probe using pair_ineligible.

R6: record/m0-record.ts is outside the clone and uncommitted. It validates manifest-covered captures, CLI/host/runtime/binary/version pins, allowlisted captured environment names, auth and actual response evidence; builds schema-accepted records; prints required Claude init facts/tool counts and passwd-home storage resolution; and gates its sole store call behind --write. Only synthetic no-write runs occurred, against fourth-commit code that the fifth documentation commit does not change. No Linux run occurred.


### Upheld halt and resumed rulings


The first halt before baseline was upheld by the Founder and resolved by Addendum 2 and the signed first resume. Halt report SHA-256 4fef47b6a4f9c26e142347967f4e01b80758162e4fd0f6e6f2e3f79a36f44be4; it remains pr/m0-phase1-halt-1-report.md.

Addendum 2 SHA-256 a6512b4ad4cadb10f014256922bd09efd4d1eb9d65d0a8e4c91102f4f4ca60a0. Resume SHA-256 41ea2ae2e3d45842c77d8594040d866050ddd2334f1f9a38c47ff7a74bd11536. Addendum 2 B1 authorizes environment.test.ts base line 138 in redaction reports which rules ran. B2 authorizes only version replacement at preflight.test.ts base lines 32, 67, 85 and 327; base line 176 and all other existing bytes remain. The table below names every affected test and shared helper.


### Added tests


| File | Full Bun test name | Requirement and ruling |
| --- | --- | --- |
| packages/adapter-madv-surface/test/parser.test.ts | a fail-closed event after valid evidence still interrupts | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | a new request starts its own evidence deadline without a second parser | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | auth accepts exactly the passing predicate and ignores additive metadata | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | auth rejects authMethod | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | auth rejects endpointHost | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | auth rejects loggedIn | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | auth rejects malformed shape, nonzero exit and signal | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | auth rejects profile | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | auth rejects provider | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | auth rejects verified | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | auth rejects verifyMethod | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | event order rejects assistant before response | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | event order rejects duplicate init | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | event order rejects duplicate tool id | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | event order rejects missing init | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | event order rejects out-of-session event | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | event order rejects response before pending tool result | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | event order rejects result before response | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | event order rejects tool before response | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | event order rejects unmatched tool result | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | every later response is checked before its tools | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | exit precedence fails closed without relying on an emitted event | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | exit without evidence for a later request fails closed | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | failure precedence: absent model | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | failure precedence: Anthropic model | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | failure precedence: domain mismatch | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | failure precedence: HTTP 401 | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | failure precedence: HTTP 403 | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | failure precedence: HTTP error | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | failure precedence: invalid body | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | failure precedence: model mismatch | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | failure precedence: redirect | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | failure precedence: unnamed family | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | identity rejects init endpoint_host | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | identity rejects init profile | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | identity rejects init provider | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | identity rejects init requested_model | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | identity rejects init surface | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | identity rejects init surface_version | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | identity rejects response endpoint_host | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | identity rejects response profile | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | identity rejects response provider | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | identity rejects response response_independence_domain | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | identity rejects response response_model | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | identity rejects response tls_verified_host | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | identity requires a model response and clean zero exit | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | input encoder preserves one text in one newline-terminated user message | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | missing evidence fails at the 30-second deadline | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | stream chunks preserve UTF-8 and malformed JSON fails closed | R4; B3-B4 and B7 item 1 |
| packages/adapter-madv-surface/test/parser.test.ts | valid identity evidence binds execution and session | R4; B3-B4 and B7 item 1 |
| packages/protocol/test/adapter-registry.test.ts | madv-surface registration matches DEC-20261115-02 field for field | R2; B2 |
| packages/supervisor/test/madv-environment.test.ts | madv-surface redacts its synthetic canary | R3; B6 |
| packages/supervisor/test/madv-environment.test.ts | madv-surface-v1 drops state, overrides and unlisted variables | R3; B6 |
| packages/supervisor/test/madv-environment.test.ts | madv-surface-v1 has exactly the approved variables | R3; B6 |
| packages/supervisor/test/madv-environment.test.ts | madv-surface-v1 requires exactly the six required variables | R3; B6 |
| packages/supervisor/test/madv-preflight.test.ts | madv-surface hash and version changes refuse the capability record | R5; B3-B5 and B7 item 1 |
| packages/supervisor/test/madv-preflight.test.ts | madv-surface probes run exactly once with pinned arguments and input | R5; B3-B5 and B7 item 1 |
| packages/supervisor/test/madv-preflight.test.ts | madv-surface reuses one allowlisted environment for four consumers | R3; B6 |
| packages/supervisor/test/madv-preflight.test.ts | missing MINIMAX_API_KEY maps to auth_not_ready before probes | R3; B6 |
| packages/supervisor/test/madv-preflight.test.ts | real registry admits Claude with madv-surface and refuses shared review control | R5; B3-B5 and B7 item 1 |
| packages/supervisor/test/madv-preflight.test.ts | real-registry Antigravity is refused before its probes | R5; B3-B5 and B7 item 1 |
| packages/supervisor/test/madv-preflight.test.ts | unsupported madv-surface roles fail before any probe | R5; B3-B5 and B7 item 1 |
| packages/supervisor/test/madv-probes.test.ts | dispatch keeps Claude probes and input unchanged | R5; B3-B5 and B7 item 1 |
| packages/supervisor/test/madv-probes.test.ts | madv-surface auth failures map to auth_not_ready | R5; B3-B5 and B7 item 1 |
| packages/supervisor/test/madv-probes.test.ts | madv-surface cancellation retains bounded cleanup and reaping | R5; B3-B5 and B7 item 1 |
| packages/supervisor/test/madv-probes.test.ts | madv-surface identity continues beyond init to natural exit | R5; B3-B5 and B7 item 1 |
| packages/supervisor/test/madv-probes.test.ts | madv-surface identity failures map to identity_mismatch | R5; B3-B5 and B7 item 1 |
| packages/supervisor/test/madv-probes.test.ts | madv-surface keeps both raw stream limits and metadata-only diagnostics | R5; B3-B5 and B7 item 1 |
| packages/supervisor/test/madv-probes.test.ts | madv-surface pre-spawn cancellation and spawn failure fail closed | R5; B3-B5 and B7 item 1 |
| packages/supervisor/test/madv-probes.test.ts | registration chooses 30 seconds beside Claude's 5 seconds | R5; B3-B5 and B7 item 1 |


### Existing tests and shared helpers changed


All line references here are binding-base lines. Each preflight test below retains its assertion bytes; its affected version values are in the shared fixture/hang helpers only. The complete authorized diff is logs/229-existing-test-final-diffs.log; SHA-256 593de0b5b8efa97541039f39c7ca5d3c19f9d0ccff989358719b23d9ceb82414.

| File | Test | Base lines and scope | Authority |
| --- | --- | --- | --- |
| packages/protocol/test/adapter-registry.test.ts | claude-code registration matches the PLAN-OPEN-1 ruling field for field | 18, shared expected registration | R1; EXISTING TESTS item 1; B15 item 1 |
| packages/protocol/test/adapter-registry.test.ts | the registry contains exactly the three Founder-ratified surfaces | 64-67; authorized rename | R2; Addendum 1 B3 item 1 |
| packages/protocol/test/adapter-registry.test.ts | registry membership cannot be mutated at runtime | 124-126 | R2; Addendum 1 B3 item 1 |
| packages/supervisor/test/environment.test.ts | no ambient variable outside the allowlist survives | 23-24 helper; 46 | R3/R2; Addendum 1 B3 item 2 |
| packages/supervisor/test/environment.test.ts | a missing required allowlisted variable is a typed failure | 23-24 helper | R3; Addendum 1 B3 item 2 |
| packages/supervisor/test/environment.test.ts | secret-marked values are redacted from diagnostics while their names are retained | 23-24 helper; existing assertions unchanged | R3; Addendum 1 B3 item 2 |
| packages/supervisor/test/environment.test.ts | redaction reports which rules ran | 23-24 helper; 138 | R3; Addendum 1 B3 item 2, extended by Addendum 2 B1 |
| packages/supervisor/test/environment.test.ts | the same registration produces byte-identical environments on repeated calls | 23-24 helper | R3; Addendum 1 B3 item 2 |
| test/phase3a/harness-separation.test.ts | no file under apps/ or packages/*/src statically imports, command-dispatches to, or argument-gates runtime-harness | 24; registry hash alone | R2; Addendum 1 B3 item 3 |
| test/phase3a/evidence-pipeline.test.ts | every investigated surface has both a capability record and a committed report | 840 and 842; historical 2.1.296 literal | R1/R2; Addendum 1 B3 item 4 |
| packages/supervisor/test/preflight.test.ts | preflight fails with envelope_invalid | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | preflight fails with cardinality | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | preflight fails with repository_fingerprint | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | preflight canonicalizes a symlink-named worktree and preserves the same-repository check | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | preflight fails with repository_fingerprint when the envelope names another checkout or commit | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | preflight fails with repository_fingerprint when the repository root and the worktree belong to different repositories | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | preflight fails with executable_unresolved | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | preflight fails with identity_mismatch | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | preflight fails with identity_mismatch when the independence domain differs from the registration | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | preflight fails with auth_not_ready | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | preflight fails with pair_ineligible | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | preflight threads its fixture registration resolver through pair eligibility | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | public preflight rejects fixture dependencies before and after a test-seam call | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | fixture preflight keeps pair policy and registration overrides local to each call | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | preflight fails with storage_root_invalid | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | preflight fails with host_capability_missing | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | preflight fails with capability_record_stale | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | preflight fails with home_mismatch | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | temporary path recording sees files a child creates and removes before returning | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | the returned plan's repository fingerprint is frozen | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | preflight creates nothing | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | probe environment equals launch environment | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | a cached attestation is not reused across sessions | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | a surface without an actual-session identity primitive is ineligible | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | missing TERM fails preflight as auth_not_ready | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | missing TMPDIR fails preflight as auth_not_ready | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | a caught MissingRequiredVariableError maps to auth_not_ready | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | the auth probe enforces the 5,000 ms execution deadline | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | the auth probe escalates SIGTERM to SIGKILL within the forced-cleanup budget | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | the auth probe reaps the child successfully | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |
| packages/supervisor/test/preflight.test.ts | cleanup-budget exhaustion fails closed as auth_not_ready | 32, 67, 85 shared helpers; 327 hang helper where used; test/assertion bytes unchanged | R1; Addendum 2 B2; version value alone |


### Required breaks and restores


Break 5: Adding XDG_STATE_HOME leaks an excluded ambient variable.
Runtime: logs/110-break-5-runtime.log; SHA-256 11ba93708c8b5111fa34d20387a364e4fb7864ca5825d51a6f6a2b37ea3ecfde
Wait: logs/111-break-5-load.log; SHA-256 669848e89bdbc93b38876a3fe93c790b65c1735930efba013ba61e6fbc622af8
Run: logs/112-break-5-test.log; SHA-256 49d07f655835a4d4e756745473273acee63afe27b1b1f0593c214ec502283b3d
 6:27  up  6:58, 1 user, load averages: 1.46 1.42 1.50
Diff, with trailing whitespace removed from every quoted line; logs/109-break-5-diff.log; SHA-256 c5db03871ccc06c5bf9b47c4387387fe4400fcda68ef583b6a1a2881d6633451
```diff
diff --git a/packages/supervisor/src/environment.ts b/packages/supervisor/src/environment.ts
index 58815fc..0d15489 100644
--- a/packages/supervisor/src/environment.ts
+++ b/packages/supervisor/src/environment.ts
@@ -12,6 +12,22 @@ export interface EnvironmentAllowlistV1 {
 // PLAN-OPEN-2, as bound by DEC-20261010-03 B1. No installation validation
 // occurs here; the caller supplies an already eligible ambient environment.
 const allowlists: Readonly<Record<string, EnvironmentAllowlistV1>> = Object.freeze({
+  "madv-surface-v1": Object.freeze({
+    ref: "madv-surface-v1",
+    variables: Object.freeze([
+      { name: "HOME", required: true, secret: false },
+      { name: "PATH", required: true, secret: false },
+      { name: "SHELL", required: true, secret: false },
+      { name: "TERM", required: true, secret: false },
+      { name: "TMPDIR", required: true, secret: false },
+      { name: "MINIMAX_API_KEY", required: true, secret: true },
+      { name: "XDG_STATE_HOME", required: false, secret: false },
+      { name: "LANG", required: false, secret: false },
+      { name: "LC_ALL", required: false, secret: false },
+      { name: "LC_CTYPE", required: false, secret: false },
+      { name: "USER", required: false, secret: false },
+    ].map(variable => Object.freeze(variable))),
+  }),
   "claude-code-v1": Object.freeze({
     ref: "claude-code-v1",
     variables: Object.freeze([
```
Failure excerpt, verbatim; gaps explicitly marked:
```text
31 |   const result = buildAllowlistedEnvironment(madvRegistration(), values);
32 |   expect(result).toEqual(ambient());
                      ^
error: expect(received).toEqual(expected)
(lines omitted)
(fail) madv-surface-v1 drops state, overrides and unlisted variables [0.86ms]
(lines omitted)
 3 pass
 1 fail
 34 expect() calls
Ran 4 tests across 1 file. [14.00ms]
```
Every test result in that file, without timings, derived from the cited run:
(pass) madv-surface-v1 has exactly the approved variables
(pass) madv-surface-v1 requires exactly the six required variables
(fail) madv-surface-v1 drops state, overrides and unlisted variables
(pass) madv-surface redacts its synthetic canary
Restore: logs/113-break-5-restore.log; SHA-256 20f2841df6a572b5e22a26c07700bf39031c001aa6bc854f989ae1248d9c55f4
Committed empty-status and equal-hash proof: logs/119-break-5-committed-restore-proof.log; SHA-256 5f0e4d73054062342b32ad3b5b63eeaf191fcc70c4ff53f0850625951e6ef1de
Restored and committed SHA-256: 8225434d5934ee6e218e317c1d6324a304b8de61e5c31b5929d8b8224d7310fb


Break 1: Removing response-model equality admits a different valid MiniMax model, including a later response.
Runtime: logs/130-break-1-runtime.log; SHA-256 de5671ba5ba537912bcd4d2c0bc0fa195af3bf09f462c629b5f3d61c9bac2899
Wait: logs/131-break-1-load.log; SHA-256 cdf9db8bf1366ad4dc67f43b5ba70e221d1142ec4b40d25ad9993fd18da68e08
Run: logs/132-break-1-test.log; SHA-256 8baaf66accae12f4199c30de40c90b2d323d15613ea76dae66e78a8be3dd8e2b
 8:24  up  8:55, 1 user, load averages: 1.38 2.59 2.46
Diff, with trailing whitespace removed from every quoted line; logs/129-break-1-diff.log; SHA-256 d200be4b9edc6718821f29f2615e6568251a9a1dfdc5fbde2e863ccb32ddf21a
```diff
diff --git a/private/tmp/m0-r1.devPEJ/r4-parser-before-break.ts b/packages/adapter-madv-surface/src/index.ts
index 37d289c..e075bd1 100644
--- a/private/tmp/m0-r1.devPEJ/r4-parser-before-break.ts
+++ b/packages/adapter-madv-surface/src/index.ts
@@ -149,8 +149,7 @@ export class MadvSurfaceParser {
       if (typeof value.response_model !== "string" || value.response_model.length === 0) { this.fail("identity_unavailable", "model_field_absent"); return; }
       if (/(?:^|[/:.])claude|anthropic/i.test(value.response_model)) { this.fail("model_refused", "anthropic_model"); return; }
       if (!/^minimax[-_]/i.test(value.response_model)) { this.fail("domain_unresolved", "unknown_family"); return; }
-      if (value.response_model !== this.context.model
-        || value.response_independence_domain !== this.context.independenceDomain
+      if (value.response_independence_domain !== this.context.independenceDomain
         || value.provider !== this.context.provider || value.profile !== "minimax"
         || value.endpoint_host !== "api.minimax.io" || value.tls_verified_host !== "api.minimax.io") {
         this.fail("identity_mismatch", "response_predicate"); return;
```
Failure excerpt, verbatim; gaps explicitly marked:
```text
56 | for (const field of ["response_model", "response_independence_domain", "tls_verified_host", "provider", "profile", "endpoint_host"]) {
57 |   test("identity rejects response " + field, () => {
58 |     for (const value of [undefined, null, 42, field === "response_model" ? "MiniMax-other" : "wrong"]) expect(parseMadvIdentity(wire(init(), response({ [field]: value })), model, ["0.1.1"]).ok).toBe(false);
                                                                                                                                                                                                       ^
error: expect(received).toBe(expected)

Expected: false
Received: true

      at <anonymous> (/Users/michaeldaley/builds/m0-r1/tui/packages/adapter-madv-surface/test/parser.test.ts:58:195)
(fail) identity rejects response response_model [1.61ms]
(pass) identity rejects response response_independence_domain [0.09ms]
(lines omitted)
(fail) identity rejects response response_model [1.61ms]
(lines omitted)
(fail) every later response is checked before its tools [0.15ms]
(lines omitted)
(fail) identity rejects response response_model [1.61ms]
(lines omitted)
(fail) every later response is checked before its tools [0.15ms]
(lines omitted)
 48 pass
 2 fail
 218 expect() calls
Ran 50 tests across 1 file. [17.00ms]
```
Every test result in that file, without timings, derived from the cited run:
(pass) input encoder preserves one text in one newline-terminated user message
(pass) valid identity evidence binds execution and session
(pass) failure precedence: HTTP 401
(pass) failure precedence: HTTP 403
(pass) failure precedence: redirect
(pass) failure precedence: HTTP error
(pass) failure precedence: invalid body
(pass) failure precedence: absent model
(pass) failure precedence: Anthropic model
(pass) failure precedence: unnamed family
(pass) failure precedence: model mismatch
(pass) failure precedence: domain mismatch
(pass) identity rejects init surface
(pass) identity rejects init surface_version
(pass) identity rejects init profile
(pass) identity rejects init provider
(pass) identity rejects init endpoint_host
(pass) identity rejects init requested_model
(fail) identity rejects response response_model
(pass) identity rejects response response_independence_domain
(pass) identity rejects response tls_verified_host
(pass) identity rejects response provider
(pass) identity rejects response profile
(pass) identity rejects response endpoint_host
(pass) auth rejects loggedIn
(pass) auth rejects authMethod
(pass) auth rejects profile
(pass) auth rejects provider
(pass) auth rejects endpointHost
(pass) auth rejects verified
(pass) auth rejects verifyMethod
(pass) auth accepts exactly the passing predicate and ignores additive metadata
(pass) auth rejects malformed shape, nonzero exit and signal
(pass) identity requires a model response and clean zero exit
(pass) missing evidence fails at the 30-second deadline
(pass) a new request starts its own evidence deadline without a second parser
(pass) exit without evidence for a later request fails closed
(pass) event order rejects missing init
(pass) event order rejects duplicate init
(pass) event order rejects out-of-session event
(pass) event order rejects assistant before response
(pass) event order rejects tool before response
(pass) event order rejects unmatched tool result
(pass) event order rejects response before pending tool result
(pass) event order rejects duplicate tool id
(pass) event order rejects result before response
(pass) a fail-closed event after valid evidence still interrupts
(fail) every later response is checked before its tools
(pass) stream chunks preserve UTF-8 and malformed JSON fails closed
(pass) exit precedence fails closed without relying on an emitted event
(fail) identity rejects response response_model
(fail) every later response is checked before its tools
Restore: logs/133-break-1-restore.log; SHA-256 7ed1f12af4f9b514bb7124ec3561daded263ce69794f45e1884b0f8c91c6bbe6
Committed empty-status and equal-hash proof: logs/141-break-1-committed-restore-proof.log; SHA-256 45db76bf3f8769f32f3bc1e4cc7c43f6c76b1d2b2e53b0883c11b2e77b773440
Restored and committed SHA-256: 3893b14275b823e82e5d6d43c486ef9b746d854d3e9de1fedbbfab813f2ceec6


Break 2: Waking at init prevents madv identity from reaching its own response and exit; it also wrongly accepts the injected over-budget identity case.
Runtime: logs/160-break-2-runtime.log; SHA-256 47d8bf82ad712c8bea4c8b4d2b4f9d4dd2bf02ab1f6a07fd77a6fed4bbdafc59
Wait: logs/161-break-2-wait.log; SHA-256 7bd33b9947c9ac9fa295a873f0ea6ea725b332cae496c9ad7a9babd6ed080d02
Run: logs/165-break-2-test.log; SHA-256 35b1586f66e569a8e5ff780b62a8c29225defe39af9db4b99c7767a365ee150f
10:32  up 11:03, 1 user, load averages: 4.67 2.16 1.67
Diff, with trailing whitespace removed from every quoted line; logs/159-break-2-diff.log; SHA-256 d54e2b102ee1c9c8f3e941334b4394e31849f46ad4c8ce464813437074d4e8c3
```diff
diff --git a/private/tmp/m0-r1.devPEJ/r5-attestation-before-break.ts b/packages/supervisor/src/attestation.ts
index 8397014..d263bf3 100644
--- a/private/tmp/m0-r1.devPEJ/r5-attestation-before-break.ts
+++ b/packages/supervisor/src/attestation.ts
@@ -133,7 +133,7 @@ export async function runBoundedProbe(request: ProbeRequest, overrides: Partial<
           output += decoder.decode(value, { stream: true });
           // Detect only the event boundary while streaming. Identity field
           // validation, like auth parsing, happens after exit and reaping.
-          if (request.kind === "identity" && !madv && firstInit(output) !== undefined) wake("identity");
+          if (request.kind === "identity" && firstInit(output) !== undefined) wake("identity");
         }
       }
       if (name === "stdout") output += decoder.decode();
```
Failure excerpt, verbatim; gaps explicitly marked:
```text
48 |   };
49 |   const result = await runBoundedProbe(request(), { spawn });
50 |   expect(result.ok).toBe(true); expect(killed).toEqual([]);
                         ^
error: expect(received).toBe(expected)

Expected: true
Received: false

      at <anonymous> (/Users/michaeldaley/builds/m0-r1/tui/packages/supervisor/test/madv-probes.test.ts:50:21)
(fail) madv-surface identity continues beyond init to natural exit [6.03ms]
56 |   const claude = JSON.stringify({ loggedIn: true, authMethod: "claude.ai", apiProvider: "firstParty", subscriptionType: "max" });
(lines omitted)
(fail) madv-surface identity continues beyond init to natural exit [6.03ms]
(lines omitted)
(fail) registration chooses 30 seconds beside Claude's 5 seconds [3.98ms]
(lines omitted)
 6 pass
 2 fail
 120 expect() calls
Ran 8 tests across 1 file. [584.00ms]
```
Every test result in that file, without timings, derived from the cited run:
(pass) dispatch keeps Claude probes and input unchanged
(fail) madv-surface identity continues beyond init to natural exit
(fail) registration chooses 30 seconds beside Claude's 5 seconds
(pass) madv-surface identity failures map to identity_mismatch
(pass) madv-surface auth failures map to auth_not_ready
(pass) madv-surface keeps both raw stream limits and metadata-only diagnostics
(pass) madv-surface pre-spawn cancellation and spawn failure fail closed
(pass) madv-surface cancellation retains bounded cleanup and reaping
Restore: logs/166-break-2-restore.log; SHA-256 16dc9d631ef26abc45ad8b67fa67fbefd2fdc7b40b43a732eae9f682914fc153
Committed empty-status and equal-hash proof: logs/187-commit-4-restore-proof.log; SHA-256 d163c0a07106286b2ee7396ae0908330f1244bc51287f32359918ef344dfc2ae
Restored and committed SHA-256: d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e


Break 3: A five-second madv limit rejects valid evidence at six seconds.
Runtime: logs/168-break-3-runtime.log; SHA-256 ec87da7ff01098bc2adfab819ef7a0942ff3016cfbd8c18683b0a6d5ec4ae74c
Wait: logs/169-break-3-wait.log; SHA-256 9df69887fc3f25d2b74b8f0d59ca1cd6e3cd2b38d4dddc8b953d0f8c5f990b1c
Run: logs/173-break-3-test.log; SHA-256 4832382d5366e6ffec88c3aec93d8898530391c2e3843f9e5b3ac22d3b5038c8
10:43  up 11:14, 1 user, load averages: 1.55 1.56 1.58
Diff, with trailing whitespace removed from every quoted line; logs/167-break-3-diff.log; SHA-256 1936120b4b8b47027908052ae4542d846a8d7a77e4ab92785ef53bc540a55d2a
```diff
diff --git a/private/tmp/m0-r1.devPEJ/r5-attestation-before-break.ts b/packages/supervisor/src/attestation.ts
index 8397014..3cc9a1c 100644
--- a/private/tmp/m0-r1.devPEJ/r5-attestation-before-break.ts
+++ b/packages/supervisor/src/attestation.ts
@@ -88,7 +88,7 @@ const runtime: ProbeRuntime = {
 export async function runBoundedProbe(request: ProbeRequest, overrides: Partial<ProbeRuntime> = {}): Promise<ProbeResult> {
   const rt = { ...runtime, ...overrides };
   const madv = request.registration?.surface === "madv-surface";
-  const executionMs = madv ? 30_000 : EXECUTION_MS;
+  const executionMs = madv ? 5_000 : EXECUTION_MS;
   const started = rt.now();
   let stdoutBytes = 0, stderrBytes = 0;
   let exitCode: number | null = null;
```
Failure excerpt, verbatim; gaps explicitly marked:
```text
55 |   // Auth runs to exit; Claude identity deliberately wakes at its first init.
56 |   const claude = JSON.stringify({ loggedIn: true, authMethod: "claude.ai", apiProvider: "firstParty", subscriptionType: "max" });
57 |   expect((await runBoundedProbe(request(), complete(madv, { elapsed: 6_000 }))).ok).toBe(true);
                                                                                         ^
error: expect(received).toBe(expected)

Expected: true
Received: false

      at <anonymous> (/Users/michaeldaley/builds/m0-r1/tui/packages/supervisor/test/madv-probes.test.ts:57:85)
(fail) registration chooses 30 seconds beside Claude's 5 seconds [4.23ms]
(pass) madv-surface identity failures map to identity_mismatch [3.45ms]
(lines omitted)
(fail) registration chooses 30 seconds beside Claude's 5 seconds [4.23ms]
(lines omitted)
 7 pass
 1 fail
 118 expect() calls
Ran 8 tests across 1 file. [586.00ms]
```
Every test result in that file, without timings, derived from the cited run:
(pass) dispatch keeps Claude probes and input unchanged
(pass) madv-surface identity continues beyond init to natural exit
(fail) registration chooses 30 seconds beside Claude's 5 seconds
(pass) madv-surface identity failures map to identity_mismatch
(pass) madv-surface auth failures map to auth_not_ready
(pass) madv-surface keeps both raw stream limits and metadata-only diagnostics
(pass) madv-surface pre-spawn cancellation and spawn failure fail closed
(pass) madv-surface cancellation retains bounded cleanup and reaping
Restore: logs/174-break-3-restore.log; SHA-256 df695ee8009f2280cd42337b60da0975d5b3c5257b097c57b84ebbb8477c0df2
Committed empty-status and equal-hash proof: logs/187-commit-4-restore-proof.log; SHA-256 d163c0a07106286b2ee7396ae0908330f1244bc51287f32359918ef344dfc2ae
Restored and committed SHA-256: d8a69d71cac8d2f008b9d65c0868146716aa1766aa82760c86753a516dd5287e


Break 4: Removing the role guard returns an admitted plan for an unsupported madv role.
Runtime: logs/176-break-4-runtime.log; SHA-256 19a6b22cd2ca7458984b0f4e2e3960e3150e9b2119bca52907319eec9ce6a592
Wait: logs/177-break-4-wait.log; SHA-256 4996ceeb4b424b8db08a12cc0d78b08b03dbfe6dcf95c679b0d959858e83c942
Run: logs/178-break-4-test.log; SHA-256 1a0fc4216cc51d8f8be9c66b5348035b32e000cd494b598cc21223cf377cf46e
10:44  up 11:14, 1 user, load averages: 1.65 1.58 1.59
Diff, with trailing whitespace removed from every quoted line; logs/175-break-4-diff.log; SHA-256 b2f5ab5911d52dce0e2a9da58291e0fde96dad106cae747bf2cbad6d270a37d8
```diff
diff --git a/private/tmp/m0-r1.devPEJ/r5-preflight-before-break.ts b/packages/supervisor/src/preflight.ts
index 4361919..266ee03 100644
--- a/private/tmp/m0-r1.devPEJ/r5-preflight-before-break.ts
+++ b/packages/supervisor/src/preflight.ts
@@ -149,9 +149,6 @@ export async function runPurePreflightWithDependencies(input: PreflightInput, ov
   // Unknown registrations cannot supply an approved executable or environment.
   if (registrations.some(r => r === undefined)) return fail("executable_unresolved");
   const admitted = registrations as AdapterRegistrationV1[];
-  for (const [index, execution] of envelope.executions.entries()) {
-    if (admitted[index]!.surface === "madv-surface" && execution.role !== "independent-reviewer") return fail("pair_ineligible");
-  }
   try { if (!validateEnvironment(input, admitted, d)) return fail("auth_not_ready"); }
   catch { return fail("auth_not_ready"); }
   const resolved: { path: string; sha256: string }[] = [];
```
Failure excerpt, verbatim; gaps explicitly marked:
```text
54 |   let probes = 0;
55 |   const result = await f.run({ probe: async request => { probes++; return f.deps.probe!(request); } });
56 |   expect(result).toEqual({ ok: false, failure: "pair_ineligible", detail: "pair_ineligible" });
                      ^
error: expect(received).toEqual(expected)

  {
-   "detail": "pair_ineligible",
-   "failure": "pair_ineligible",
-   "ok": false,
+   "ok": true,
+   "plan": {
(lines omitted)
(fail) unsupported madv-surface roles fail before any probe [106.25ms]
(lines omitted)
 6 pass
 1 fail
 40 expect() calls
Ran 7 tests across 1 file. [815.00ms]
```
Every test result in that file, without timings, derived from the cited run:
(pass) missing MINIMAX_API_KEY maps to auth_not_ready before probes
(pass) madv-surface reuses one allowlisted environment for four consumers
(pass) madv-surface probes run exactly once with pinned arguments and input
(fail) unsupported madv-surface roles fail before any probe
(pass) madv-surface hash and version changes refuse the capability record
(pass) real registry admits Claude with madv-surface and refuses shared review control
(pass) real-registry Antigravity is refused before its probes
Restore: logs/179-break-4-restore.log; SHA-256 d09e1336b0863116ad2afe90aec047cbbf4440b0208124f9cc6b6df261c5ca3b
Committed empty-status and equal-hash proof: logs/187-commit-4-restore-proof.log; SHA-256 d163c0a07106286b2ee7396ae0908330f1244bc51287f32359918ef344dfc2ae
Restored and committed SHA-256: 18756ff1120edee8a1fb04d057ec78334577d5a3dd816fb813da7b75d6c96a51



### The two lockfile diffs


Every quoted diff has trailing spaces and tabs removed from each line. The full original logs are unchanged.

logs/124-r4-lockfile-diff.log; SHA-256 89d0ab15b75c0c9082293b3635204f1b0a706d7f4093eee89b9a9bc4995f1d59

```diff
diff --git a/bun.lock b/bun.lock
index 88796f6..036b33d 100644
--- a/bun.lock
+++ b/bun.lock
@@ -102,6 +102,10 @@
         "@madventures/protocol": "workspace:*",
       },
     },
+    "packages/adapter-madv-surface": {
+      "name": "@madventures/adapter-madv-surface",
+      "version": "0.1.0",
+    },
     "packages/artifact-store": {
       "name": "@madventures/artifact-store",
       "version": "0.1.0",
@@ -292,6 +296,8 @@

     "@madventures/adapter-claude-code": ["@madventures/adapter-claude-code@workspace:packages/adapter-claude-code"],

+    "@madventures/adapter-madv-surface": ["@madventures/adapter-madv-surface@workspace:packages/adapter-madv-surface"],
+
     "@madventures/artifact-store": ["@madventures/artifact-store@workspace:packages/artifact-store"],

     "@madventures/broker": ["@madventures/broker@workspace:packages/broker"],
 mode change 100644 => 100755 packages/founder-act/src/main.ts
 M bun.lock
 M packages/founder-act/src/main.ts
?? packages/adapter-madv-surface/
```


logs/150-r5-lockfile-diff.log; SHA-256 11d384e89c51ca6e7db4a12cf4a4a1e95d59de297ce6aa998ee72737beb6be00

```diff
diff --git a/bun.lock b/bun.lock
index 036b33d..fef55ab 100644
--- a/bun.lock
+++ b/bun.lock
@@ -204,6 +204,7 @@
       "name": "@madventures/supervisor",
       "version": "0.1.0",
       "dependencies": {
+        "@madventures/adapter-madv-surface": "workspace:*",
         "@madventures/protocol": "workspace:*",
         "@madventures/storage": "workspace:*",
       },
 mode change 100644 => 100755 packages/founder-act/src/main.ts
 M bun.lock
 M packages/founder-act/src/main.ts
 M packages/protocol/src/adapter-registry.ts
 M packages/protocol/test/adapter-registry.test.ts
 M packages/supervisor/package.json
 M packages/supervisor/src/attestation.ts
 M packages/supervisor/src/preflight.ts
 M packages/supervisor/test/environment.test.ts
 M packages/supervisor/test/madv-preflight.test.ts
 M packages/supervisor/test/preflight.test.ts
 M test/phase3a/evidence-pipeline.test.ts
 M test/phase3a/harness-separation.test.ts
 M tsconfig.json
?? packages/supervisor/test/madv-probes.test.ts
```



### Preserved callers and read-only redaction evidence


logs/226-head-preservation-and-redaction.log; SHA-256 a05d0ea31af1decc2ff0b3464f7698e29d1ab4eba70a95bde915e13f12e94f4a

Read-only source excerpts below retain file/line labels. The source excerpt omits gaps explicitly.

```text
apps/madbridge/src/commands/export-evidence.ts
78-  const rules = new Set<string>();
79-  const exact = (text: string): string => {
80-    rules.add("known_token_patterns");
81-    rules.add("exact_allowlisted_secret_values");
82:    for (const registration of ADAPTER_REGISTRY.values()) {
83:      const result = redact(text, process.env as Readonly<Record<string, string>>, registration);
84-      text = result.text;
85-      for (const rule of result.rulesApplied) rules.add(rule);
86-    }
```


Base preflight/test/harness blobs: ced2364d85c0117563533e6dc419575f06a09161; 182285abde26fae13f9403dba676349608a61265; 8e63d73f723c3fa7eea2e300c3e378e107957b0b. Head blobs and the exact protected lines are in the same cited log:

```text
43619191f47e3f9cdaefd8aa45cd436770690160
f8f117aaf90d8b3218fbec4f0331563b036eae05
8e63d73f723c3fa7eea2e300c3e378e107957b0b
tui/packages/supervisor/src/preflight.ts:143:    if (commonPath !== d.realpath(worktreeCommon.stdout.toString().trim())) return fail("repository_fingerprint");
tui/packages/supervisor/src/preflight.ts:195:    if (execution.provider !== admitted[index]!.provider
tui/packages/supervisor/src/preflight.ts:196:      || execution.independence_domain !== admitted[index]!.independence_domain) return fail("identity_mismatch");
tui/packages/supervisor/test/preflight.test.ts:298:test("the returned plan's repository fingerprint is frozen", async () => {
tui/test/phase3a/runtime-harness.ts:14:import { runPurePreflightWithDependencies } from "../../packages/supervisor/src/preflight";
```



### Full Phase 1 run at the fourth commit


Frozen install: logs/189-full-frozen-install.log; SHA-256 89095224bd3bfe088bbeed0535547086e5a8d2ecc0514038fcb03bb54591085a; runtime logs/188-full-runtime-before-install.log; SHA-256 a75e088406776ed2f4a09f96621c7d8feb3f82037df0356ea76fb6b370747010. Lock SHA-256 before/after/commit: a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830. The known mode change and clean restore are logs/190-full-install-state.log; SHA-256 27e4231d605f900107262ba756bfd1ffd0c1fa6efb2a3559fbec3cbb4eeaecb1 and logs/191-full-install-mode-restore.log; SHA-256 49a87de42739d373a657c6a94b70422a6066ad5a4b632954df37f7443eca50f1.

Typecheck: logs/193-full-typecheck.log; SHA-256 803f95cd5b1ec54627c40f400bb5ca54a17e8de12fa4dd41f3d0b6e251faceaf; wait logs/192-full-typecheck-wait.log; SHA-256 2f95073f73a831ed8f623e2bedf0c6bffc9d40f3a8fbda664441bf38676f58ac. Exit 0; no compiler output.

Bare suite: logs/199-full-suite.log; SHA-256 ecb4ef94bf74b7d4f59865c72d8668cd2c813073d0f0207c920bbfb2fe19aeb1; runtime logs/194-full-runtime-before-suite.log; SHA-256 27d8d3d27509b1660849639fe9def6e1def885e0b850dea4043c78a56793c7a9; wait logs/195-full-suite-wait.log; SHA-256 d2d2eeb802adec4ef44d2c28e4af3e6d6461ac10a7df6f1d3237fe8062ede4c6.

```text
 2015 pass
 0 fail
 27280 expect() calls
Ran 2015 tests across 146 files. [180.63s]
```


Head list: logs/200-head-test-list.log; SHA-256 fad5e4ec9862cecca1d88acb7efdc7e70a1ea4d0e89896aa0d89ea5c4d5eb036; comparison: logs/201-full-test-comparison.log; SHA-256 c33675929fffb7f04935bcbf81f0b6f6977198c4538598b8a3f38dd8b7cb50be. No JUnit listing run was needed. Every base file/name/pass is retained with the authorized two-to-three registry-name mapping. No skipped or todo result occurred.

```text
BASE_TESTS=1945
HEAD_TESTS=2015
ADDED_TESTS=70
AUTHORIZED_NAME_MAPS=1
BASE_FILES=142
HEAD_FILES=146
ADDED_FILES=4
ARITHMETIC=1945+70=2015; 142+4=146
ALL_BASE_NAMES_AND_PASSES_PRESERVED=yes
```


Seventy added tests comprise four environment, seven madv preflight, eight probe, fifty parser and one registry test. Four added files are the environment, preflight, probe and parser test files. The 1945/142 floor is met.

Diff-check, changed paths, registry-only diff, status and untracked checks: logs/202-full-diff-check.log; SHA-256 e7ce0b8d659a475c1387b6fc30abff85ad9bc94ee6a051ed243671ba45a938f3
logs/203-full-changed-paths.log; SHA-256 60422b69101a787275272032550c108a9fcd64a5aed0e22a89e50cbbcac600e2
logs/204-full-registry-diff.log; SHA-256 38a59444c7de7125cbd25e1750fbbf36eb0856d272472f4daf35b67d87d90c6b
logs/205-full-status.log; SHA-256 04649fd7f4fcf46a35bb160b3447546dddec9950b2e796128d190226f50a7016
logs/206-full-untracked.log; SHA-256 1685cc849c0c24a4883a688a708e1e5855a4996ea6c3790c5ed1cf7f8b3e9cd0. Each used isolated Git configuration and exited zero; diff-check and untracked printed nothing.


### Record script


Path: /Users/michaeldaley/builds/m0-r1/record/m0-record.ts
SHA-256: de3ea7cc7ded52c5ab14eed40280d420ce375e9c56b12cfd838cf2010a5550dd
Full script shown in logs/244-record-script-final-source.log; SHA-256 e2717fc9c0841dfd9d573393e7138fdf4fa8aefac6d6e88b938b1e44728d70c3. It is not committed. Only the six-character marker appears in its one synthetic negative capture, verified as six bytes. Synthetic generator SHA-256 d1914c34b67b24da916118e7a3713e1f76437ce9d1646c0501456a670f9dbfd7.

| Run | Result | Wait log | Run log and SHA-256 |
| --- | --- | --- | --- |
| 218 | schema accepted; identity pass, auth pass, overall pass; exit 0 | logs/217-r6-madv-pass-wait.log; SHA-256 22bfd04e0814aea13aacca736c544750ad74535e40a8ee4699d6a24158202907 | logs/218-r6-madv-pass.log; SHA-256 1b488f7eb826fba7747352f81240a405824b47145203e476af7c4a18ba79556b |
| 220 | schema accepted; identity fail, auth pass, overall fail; exit 0 | logs/219-r6-madv-echo-wait.log; SHA-256 322aca90b0f354b792038a691f55215324ebdd85612101a67c4fb17b675cc7cc | logs/220-r6-madv-echo.log; SHA-256 6555fccd64369fd3dd34ba7f384dc043313f16dae93453ed4723c70617ab6bcd |
| 222 | schema accepted; identity pass, auth pass, overall pass; exit 0 | logs/221-r6-claude-pass-wait.log; SHA-256 be8406297313409b8da7a8ea45ca7e2666542533c56f501ec2ca137de0a96e8a | logs/222-r6-claude-pass.log; SHA-256 86979ad16e927995a6f92fff3b4378eb504f0f1e8eb35307b9d177bc833189c1 |
| 224 | schema accepted; identity fail, auth pass, overall fail; exit 0 | logs/223-r6-claude-wrong-model-wait.log; SHA-256 629d9dbea76959559c3d1bbfacdf2e081d2c6be49f072c8fe33182e66ff785f9 | logs/224-r6-claude-wrong-model.log; SHA-256 13e9df088bc1083d2f653e27b3f08d989dcdbd500e6376b210a46c7697726434 |
| 227 | REFUSED MINIMAX_API_KEY is set; exit 1 | logs/225-r6-key-set-wait.log; SHA-256 f426946582efafe8920dfb4150fdf8c6f0a4e20e1bbde304290dc65580e0db60 | logs/227-r6-key-set.log; SHA-256 f80696ca28780d12babbe4e6d9b0399bf35e30a0156f8d47c0c05fb91def6076 |
| 231 | REFUSED MADV_STORAGE_DIR is set; exit 1 | logs/228-r6-storage-set-wait.log; SHA-256 db523f84861ec26503cfc1a45801669640465b405f803ef79d50bf1982b6d871 | logs/231-r6-storage-set.log; SHA-256 952500574e8d61e96bcdac04d911f421cb94588b8f6ebf0730955146ab90c4ca |
| 233 | REFUSED missing or unsafe file: madv-surface/04.stdout; exit 1 | logs/232-r6-missing-file-wait.log; SHA-256 511e54d6b4d2065a8d0f424a3949164853a148d830fdc7050d1bbbf8e9871097 | logs/233-r6-missing-file.log; SHA-256 84ab06d7ff474bd4628ddbea0850c1b59489bf6612771974bd3d8ed371d11bd5 |
| 235 | REFUSED file not covered by manifest: madv-surface/04.stdout; exit 1 | logs/234-r6-uncovered-file-wait.log; SHA-256 79c51440b5ad23d881a9c14c8bd2c7c921e31c70a4b1aa2e9dada5690da09e1a | logs/235-r6-uncovered-file.log; SHA-256 68fd21abdc6d503d4efccd7e48587628edb780d3fda451e4d46570d58b3a274c |
| 237 | REFUSED manifest hash mismatch: madv-surface/04.stdout; exit 1 | logs/236-r6-changed-file-wait.log; SHA-256 f33505b0e80737c2adf191689b45314e6f6ae2ff649d2790e8b56f81df95e2ae | logs/237-r6-changed-file.log; SHA-256 35eeff90822091aa9fb78039bb3912d97e57c38e4333b0f54f76dfbd4835072e |
| 239 | REFUSED forbidden marker: madv-surface/03.stderr; exit 1 | logs/238-r6-marker-file-wait.log; SHA-256 c30f51e3f260d7bc1adbcd8ef70fc2b98019b3e9087f3d7f3ed6e46a156b9da8 | logs/239-r6-marker-file.log; SHA-256 f2bea18d6a0d919af4888d860bee83840ba6b11628fdfdc0079f2781e1e26b0e |
| 241 | REFUSED ROOT is not a git work tree; exit 1 | logs/240-r6-non-work-tree-wait.log; SHA-256 aebdeb0a14cdc5a0f00fe69f485a278d41e27564a62a3b2b33824cfce6dcccf7 | logs/241-r6-non-work-tree.log; SHA-256 b26fb669a2005eb9cd4229daca472e8cd0c79c1b7ad18cc3b4495f6668fa1234 |
| 243 | REFUSED missing MANIFEST.sha256; exit 1 | logs/242-r6-missing-manifest-wait.log; SHA-256 240497e018141598d1929582391c1177ff67767d9340bcd5d1e2a6ae3412fdab | logs/243-r6-missing-manifest.log; SHA-256 74f15bee521491c76fc5826790fefad27d869c8b6af35b951e986292993e46de |

All twelve runs omitted --write. No Linux run occurred. The no-write source and clean clone proof are logs/244-record-script-final-source.log; SHA-256 e2717fc9c0841dfd9d573393e7138fdf4fa8aefac6d6e88b938b1e44728d70c3.


### Task-detail refinements and self-fixes


The R4 boundary tests were expanded with malformed UTF-8/chunking, clean exit, exit precedence, per-request deadline and early-exit cases. Before Break 1, the mismatch tests were strengthened to use a different valid model with exit zero and to finish tool/result order, avoiding masking the break. The R5 injected-clock test uses Claude auth for a clean-exit five-second comparison because identity intentionally wakes at init. R6 derives the Linux reported model from response evidence and uses only Linux schema fields; captured TERM/SHELL remain validated inputs. There is no other task-scope change.

Own uncommitted self-fixes: R3 fixture failure in logs/102-r3-red.log; SHA-256 6ff64f8d90ec37af3bb7bfb2ee9a2ae67443c8f96c8a6c4fc7c99c6e49044484, corrected before logs/107-r3-green.log; SHA-256 77c382310200966d6b3c068166db60169fd1bc7a06b590fafde5ebcb7f929c33; R5 clock fixture failure in logs/153-r5-tests.log; SHA-256 13648ab9f6532ca6df5bffc08eaf7d263d61b4c8f20e2152aa0948eaed61742a, corrected before logs/157-r5-targeted.log; SHA-256 cd25727242682fea70d1aa7c084f502ff08ad69847bd63f0a42438dce0bf0057. No full-run failure or self-fix commit occurred.


### Command ledger since baseline


Each cited log begins with its complete command and uptime and ends with the invocation's exit status. This table records every invocation after baseline through closure; wait commands have their own entries, and the test/break/record sections map each test run to its wait. All log hashes were independently gathered by shasum -a 256 in log 247. No log was truncated, compressed, encoded or overwritten. Tool display truncation does not alter files.

| Command log, containing the full command and output | Uptime before invocation | Exit | SHA-256 |
| --- | --- | --- | --- |
| logs/090-baseline-final-state.log |  0:42  1 user, load averages: 2.85 2.39 2.56 | 0 | f2cafe1aa372c7e858f87d0a1e4cd8102124a3086f53312d2a6b6807b11f8983 |
| logs/091-draft-task-detail.log |  0:43  1 user, load averages: 1.70 2.15 2.46 | 0 | 6d77732de5870111e9ff3b4e844bdc71d3315f8af6f2cfca8e284b56123d5813 |
| logs/092-opening-log-manifest.log |  0:45  1 user, load averages: 1.38 1.93 2.34 | 0 | bec4c935bb091617b6ffcf0e9762afd366190a64152d079adbdb5988d9bbc2d8 |
| logs/093-write-build-log-opening.log |  0:45  1 user, load averages: 1.38 1.93 2.34 | 0 | 17aeb66827395ba4326146eac8a4bd8ef0671586f8688fa0190be239b258a6e9 |
| logs/094-fix-opening-quote-whitespace.log |  0:45  1 user, load averages: 1.73 1.94 2.32 | 0 | dcc3db05d01b0ea4e490caa9a002c57411c62cc9eefbdca66258a169074d0c5a |
| logs/095-check-commit-1-message.log |  0:45  1 user, load averages: 1.73 1.94 2.32 | 0 | a4377e9bcc9abaf4008adfd86af1a12ab7f32ec0b65fd1e50266050146ab6a98 |
| logs/096-stage-commit-1.log |  0:45  1 user, load averages: 1.73 1.94 2.32 | 0 | 977bc3862afe7a50cbd2496c71f40927efc798eea3bdb7def0abf6511519eda2 |
| logs/097-review-commit-1-staged-diff.log |  0:46  1 user, load averages: 1.61 1.91 2.30 | 0 | bd55ceecb0a847bb2deb12dd64e2d1f2480f8b185da5771fe29a1c62afba806f |
| logs/098-commit-1.log |  0:46  1 user, load averages: 1.61 1.91 2.30 | 0 | 831b82b40c49f5f3ae10ce857e7aa2ac8aef42ef726031143ca095eabf5840f2 |
| logs/099-write-r3-tests.log |  0:48  1 user, load averages: 1.66 1.81 2.20 | 0 | 34021716f35a3e8a14267222ee5bf60b30746e28fd9f0bd3bd313a9e431f6987 |
| logs/100-r3-runtime.log |  0:48  up  1:19, 1 user, load averages: 1.74 1.82 2.20 | 0 | 34f5460b1560020f5e97f951ac6fed21f8759125dd91b9696ba0c2047ca91c8a |
| logs/101-r3-red-load.log |  0:48  1 user, load averages: 1.74 1.82 2.20 | 0 | 759ae3477e9314c293cffd87bccb38f98d6117ee0fc3d46e6b20d6defb14673f |
| logs/102-r3-red.log |  0:48  up  1:19, 1 user, load averages: 1.68 1.81 2.19 | 1 | 6ff64f8d90ec37af3bb7bfb2ee9a2ae67443c8f96c8a6c4fc7c99c6e49044484 |
| logs/103-inspect-own-r3-envelope-failure.log |  0:49  1 user, load averages: 1.53 1.77 2.17 | 0 | 189db6ed886e6f225df6ea848009c2c639f718e843c3a13365624ad92ad14e05 |
| logs/104-inspect-own-r3-parser-constraints.log |  0:49  1 user, load averages: 1.45 1.74 2.15 | 0 | da042854066f880d43c68e195357f6673d5a13b91dafa64a6fdaf7be12324fe1 |
| logs/105-r3-production-change.log |  0:49  1 user, load averages: 1.63 1.76 2.15 | 0 | 39293a4a573337e5b0fba0189d6218e4687284e7cefca3474cd2e3c7c90b9e79 |
| logs/106-r3-green-load.log |  0:49  1 user, load averages: 1.63 1.76 2.15 | 0 | 72f95dd0565e3838e9f823db27b62aea22a55c5ee71167f339cfe00673b6737a |
| logs/107-r3-green.log |  6:25  up  6:55, 1 user, load averages: 1.63 1.48 1.54 | 0 | 77c382310200966d6b3c068166db60169fd1bc7a06b590fafde5ebcb7f929c33 |
| logs/108-break-5-save.log |  6:25  1 user, load averages: 1.51 1.46 1.53 | 0 | d56758570270c1fabc2279c4e5a36181774551c6f5a9e82c68372347581272b7 |
| logs/109-break-5-diff.log |  6:25  1 user, load averages: 1.51 1.46 1.53 | 0 | c5db03871ccc06c5bf9b47c4387387fe4400fcda68ef583b6a1a2881d6633451 |
| logs/110-break-5-runtime.log |  6:25  up  6:56, 1 user, load averages: 1.51 1.46 1.53 | 0 | 11ba93708c8b5111fa34d20387a364e4fb7864ca5825d51a6f6a2b37ea3ecfde |
| logs/111-break-5-load.log |  6:25  1 user, load averages: 1.51 1.46 1.53 | 0 | 669848e89bdbc93b38876a3fe93c790b65c1735930efba013ba61e6fbc622af8 |
| logs/112-break-5-test.log |  6:27  up  6:58, 1 user, load averages: 1.46 1.42 1.50 | 1 | 49d07f655835a4d4e756745473273acee63afe27b1b1f0593c214ec502283b3d |
| logs/113-break-5-restore.log |  6:27  1 user, load averages: 1.51 1.43 1.50 | 0 | 20f2841df6a572b5e22a26c07700bf39031c001aa6bc854f989ae1248d9c55f4 |
| logs/114-r3-typecheck-load.log |  6:27  1 user, load averages: 1.51 1.43 1.50 | 0 | a1b6c7d0b42d1bcde3235b90d9e3f294d2b24b458e5b4609fa464d9ba2d52d45 |
| logs/115-r3-typecheck.log |  6:27  up  6:58, 1 user, load averages: 1.51 1.43 1.50 | 0 | 57463e4b4aae46913f6ceb24b932e485c5937eca7bcb9e9459cbb5a006086a3a |
| logs/116-check-commit-2-message.log |  6:28  1 user, load averages: 1.31 1.39 1.48 | 0 | 663e332b82dc8932aa87d49142f905b8b7760daac2b947bffb8da0e8492f1a83 |
| logs/117-stage-and-review-commit-2.log |  6:28  1 user, load averages: 1.31 1.39 1.48 | 0 | 354e1cc82968f38e6370468079feab2811cdb2f3af4002a68605412a74d364a9 |
| logs/118-commit-2.log |  6:28  1 user, load averages: 1.31 1.39 1.48 | 0 | e773812fb118ab8f020f4428c190c4d77479a013a5ef247e7f5a45300956e4a4 |
| logs/119-break-5-committed-restore-proof.log |  6:28  1 user, load averages: 1.31 1.39 1.48 | 0 | 5f0e4d73054062342b32ad3b5b63eeaf191fcc70c4ff53f0850625951e6ef1de |
| logs/120-write-r4-tests.log |  6:30  1 user, load averages: 1.20 1.32 1.44 | 0 | c36151762b9f6bf58c29ee461b1544daef1f637bf046b7d2cdad5f6d041b20f3 |
| logs/121-write-r4-parser.log |  6:31  1 user, load averages: 1.27 1.33 1.43 | 0 | f69391347df330f24430ffd25b7d698807baf8c943010fcf22ddc54e33a24d8b |
| logs/122-r4-runtime.log |  7:56  up  8:27, 1 user, load averages: 5.66 4.21 2.79 | 0 | 00d430161216f80c967efcaa0281142b8d73467a47539ddf1503ce93d4bc5539 |
| logs/123-r4-workspace-install.log |  7:56  up  8:27, 1 user, load averages: 5.66 4.21 2.79 | 0 | 634920e71e742b1c20622a08993a28b468514315cfca0498fa4f7117344a3c35 |
| logs/124-r4-lockfile-diff.log |  7:57  1 user, load averages: 5.25 4.18 2.81 | 0 | 89d0ab15b75c0c9082293b3635204f1b0a706d7f4093eee89b9a9bc4995f1d59 |
| logs/125-r4-tests-load.log |  7:57  1 user, load averages: 5.25 4.18 2.81 | 0 | f39409a044a58524aeeb61b395ed2c2ed917a3d3e6a7aee0be14c423bacf4176 |
| logs/126-r4-install-mode-restore.log |  7:57  1 user, load averages: 3.78 3.96 2.80 | 0 | 2fa727b782856b935ecac22ef56b0c832875e4ca49ef1dd44cdaa817ca2bdc3b |
| logs/127-r4-tests.log |  8:19  up  8:50, 1 user, load averages: 2.08 2.03 2.14 | 0 | 4ac52b7d5f4c3e83a1d9647ced3aebc020ce266d9209e9f42b1afd0572f3be44 |
| logs/128-break-1-save.log |  8:20  1 user, load averages: 1.71 1.95 2.10 | 0 | 0dbc95c6c6d379079a9ceda382679f81067a7c641b18dc312e7ff2f0b5d0f7a8 |
| logs/129-break-1-diff.log |  8:20  1 user, load averages: 1.71 1.95 2.10 | 1 | d200be4b9edc6718821f29f2615e6568251a9a1dfdc5fbde2e863ccb32ddf21a |
| logs/130-break-1-runtime.log |  8:23  up  8:54, 1 user, load averages: 2.56 3.00 2.59 | 0 | de5671ba5ba537912bcd4d2c0bc0fa195af3bf09f462c629b5f3d61c9bac2899 |
| logs/131-break-1-load.log |  8:23  1 user, load averages: 2.56 3.00 2.59 | 0 | cdf9db8bf1366ad4dc67f43b5ba70e221d1142ec4b40d25ad9993fd18da68e08 |
| logs/132-break-1-test.log |  8:24  up  8:55, 1 user, load averages: 1.38 2.59 2.46 | 1 | 8baaf66accae12f4199c30de40c90b2d323d15613ea76dae66e78a8be3dd8e2b |
| logs/133-break-1-restore.log |  8:24  1 user, load averages: 1.33 2.54 2.44 | 0 | 7ed1f12af4f9b514bb7124ec3561daded263ce69794f45e1884b0f8c91c6bbe6 |
| logs/134-r4-typecheck-load.log |  8:24  1 user, load averages: 1.33 2.54 2.44 | 0 | e65357ee64c53e2851bc502423d8fd2f6456173918fababde624b098af1e2c0c |
| logs/135-r4-typecheck.log |  8:25  up  8:55, 1 user, load averages: 1.33 2.54 2.44 | 0 | 4c46b3d6a926410c4b1ab5d547b2c17b6de8a75d4582347b48f051bb08b44873 |
| logs/136-r4-restored-tests-load.log |  8:25  1 user, load averages: 1.54 2.44 2.41 | 0 | 24a1d050d8335d45046b3635d248ec24424ff44c825b2fca1f2d0654b9216555 |
| logs/137-r4-restored-tests.log |  8:26  up  8:56, 1 user, load averages: 1.18 2.29 2.36 | 0 | faea4502c9a515fa9e0a8b3d752b28e89eb91ff232f3aad593965d8086e927b8 |
| logs/138-check-commit-3-message.log |  8:26  1 user, load averages: 1.36 2.28 2.35 | 0 | eaac6d127a07b5e49ca0199001bec7c6ed1b79f2f7965993ea353303c6ec8b9f |
| logs/139-stage-and-review-commit-3.log |  8:26  1 user, load averages: 1.36 2.28 2.35 | 0 | bf00263c7f26411db674b88c3a4611c9ae58dd8bf806bc363605d852f327d6f0 |
| logs/140-commit-3.log |  8:26  1 user, load averages: 1.36 2.28 2.35 | 0 | 4f8bf32c9ecb1809ab5c80df302ed1fc9c171fdd71d7cc05a7a77c315a82bc01 |
| logs/141-break-1-committed-restore-proof.log |  8:26  1 user, load averages: 1.36 2.28 2.35 | 0 | 45db76bf3f8769f32f3bc1e4cc7c43f6c76b1d2b2e53b0883c11b2e77b773440 |
| logs/142-r5-pair-and-freshness-test-contracts.log |  8:27  1 user, load averages: 1.60 2.11 2.27 | 0 | b978a670a4da13d9aeab1551d32a659c2289cfb022e2181c49bb329433c6f502 |
| logs/143-r5-pair-evaluator-contract.log |  8:28  1 user, load averages: 1.59 2.09 2.26 | 0 | 0a9a3c4287c140a90b8b8f8da8b30c9da90ce8a0a2573fc145fccd11d223a24e |
| logs/144-write-r5-probe-tests.log |  8:30  1 user, load averages: 2.00 2.08 2.24 | 0 | 9e58ab713cdb7532ff2d9319b0a14dccb86136205dedd1b92c1c3c58e78b38a5 |
| logs/145-write-r2-registration-test.log |  8:31  1 user, load averages: 1.82 2.07 2.22 | 0 | 78f6d5ef0ab90aab0061cf9585083dfc76fbe6f81c6a22d9007d2ac9bea72a1f |
| logs/146-r5-authorized-existing-test-updates.log |  8:31  1 user, load averages: 1.85 2.05 2.21 | 0 | fa9ceebcdd33d9f73c3d0aeb4c64162b4c206cc49bd38d39a1559d9292625b11 |
| logs/147-r5-production-diff.log |  8:32  1 user, load averages: 1.78 2.00 2.18 | 0 | ad21f11924d92e70e83d01dcc6e95a5407721fe740c69a2d6bbfebfda98bf890 |
| logs/148-r5-runtime.log |  8:40  up  9:11, 1 user, load averages: 2.06 1.92 2.02 | 0 | eb155ac1922ba5ec9b220072f4a1cfd2e963f8814e67614684c024c01c6b4d1a |
| logs/149-r5-dependency-install.log |  8:40  up  9:11, 1 user, load averages: 2.06 1.92 2.02 | 0 | 057ea2288ebfbe8fc7ae09e876ef3fb02f6b6cb5271249ba82214c94a2e9d1d8 |
| logs/150-r5-lockfile-diff.log |  8:40  1 user, load averages: 1.75 1.85 2.00 | 0 | 11d384e89c51ca6e7db4a12cf4a4a1e95d59de297ce6aa998ee72737beb6be00 |
| logs/151-r5-install-mode-restore.log |  8:40  1 user, load averages: 1.75 1.85 2.00 | 0 | 02586ac9c47415d10c6b646c3d20d3ef3cd91c0a16c893df6cbc64eba9ab4129 |
| logs/152-r5-tests-load.log |  8:40  1 user, load averages: 1.75 1.85 2.00 | 0 | a1670a3048c7463a03fcedfd2dc0989a9da922ad8db93b5a00aa3e12f3a2cdc9 |
| logs/153-r5-tests.log |  8:40  up  9:11, 1 user, load averages: 1.46 1.78 1.97 | 1 | 13648ab9f6532ca6df5bffc08eaf7d263d61b4c8f20e2152aa0948eaed61742a |
| logs/154-r5-test-result.log |  8:45  1 user, load averages: 1.17 1.62 1.85 | 0 | 852f29016a5c3a820e4971d1f818e1d696df11ec4447935bd81e53e6f99e68d8 |
| logs/155-r5-clock-review.log |  8:45  1 user, load averages: 1.29 1.63 1.85 | 0 | f4f330c8d95b39d68402ad05f8989900125dc178cafb4fd8fd6295ffe770e6a8 |
| logs/156-r5-fixed-clock-wait.log |  8:45  1 user, load averages: 1.49 1.66 1.86 | 0 | 931c4a768a6f030990e4835ac960ed6ea900cec98f39012a9a7e20bee07821d0 |
| logs/157-r5-targeted.log |  8:48  up  9:19, 1 user, load averages: 1.82 1.67 1.82 | 0 | cd25727242682fea70d1aa7c084f502ff08ad69847bd63f0a42438dce0bf0057 |
| logs/158-r5-break-baselines.log |  8:49  1 user, load averages: 2.30 1.89 1.89 | 0 | 1e0475cf56faf6ba2687fa0d12593221b22250208dae16e50d7b4aebeb662d57 |
| logs/159-break-2-diff.log |  8:50  1 user, load averages: 2.18 1.87 1.88 | 1 | d54e2b102ee1c9c8f3e941334b4394e31849f46ad4c8ce464813437074d4e8c3 |
| logs/160-break-2-runtime.log |  8:59  up  9:30, 1 user, load averages: 1.42 1.43 1.61 | 0 | 47d8bf82ad712c8bea4c8b4d2b4f9d4dd2bf02ab1f6a07fd77a6fed4bbdafc59 |
| logs/161-break-2-wait.log |  9:00  1 user, load averages: 2.70 1.74 1.71 | 0 | 7bd33b9947c9ac9fa295a873f0ea6ea725b332cae496c9ad7a9babd6ed080d02 |
| logs/162-record-schema-review.log |  9:00  1 user, load averages: 2.77 1.88 1.77 | 0 | 57609f6be4dac3397fb8f2a871480d491e9d4f639318eaa030c9e6ece10702dd |
| logs/163-record-rulings-review.log |  9:01  1 user, load averages: 2.23 1.83 1.75 | 0 | 761e521722d3043aa6589fbc10d109457c8bb4d11996a3738341af2a25b481bb |
| logs/164-record-pins-review.log |  9:01  1 user, load averages: 2.18 1.83 1.75 | 0 | 9300fac6bd63dd4d4e5c76308cff3357e417b95da187ac59e0ded706d85e2798 |
| logs/165-break-2-test.log | 10:32  up 11:03, 1 user, load averages: 4.67 2.16 1.67 | 1 | 35b1586f66e569a8e5ff780b62a8c29225defe39af9db4b99c7767a365ee150f |
| logs/166-break-2-restore.log | 10:32  1 user, load averages: 4.07 2.15 1.67 | 0 | 16dc9d631ef26abc45ad8b67fa67fbefd2fdc7b40b43a732eae9f682914fc153 |
| logs/167-break-3-diff.log | 10:32  1 user, load averages: 4.07 2.15 1.67 | 1 | 1936120b4b8b47027908052ae4542d846a8d7a77e4ab92785ef53bc540a55d2a |
| logs/168-break-3-runtime.log | 10:32  up 11:03, 1 user, load averages: 3.90 2.15 1.67 | 0 | ec87da7ff01098bc2adfab819ef7a0942ff3016cfbd8c18683b0a6d5ec4ae74c |
| logs/169-break-3-wait.log | 10:32  1 user, load averages: 3.90 2.15 1.67 | 0 | 9df69887fc3f25d2b74b8f0d59ca1cd6e3cd2b38d4dddc8b953d0f8c5f990b1c |
| logs/170-r5-preflight-review.log | 10:32  1 user, load averages: 3.59 2.11 1.66 | 0 | 848ec20c308d094b61b7af8f88e185a4a1ebf3563f70c2d21a12dd952a886de8 |
| logs/171-record-evidence-review.log | 10:35  1 user, load averages: 2.22 2.15 1.74 | 0 | e5d1cdb0bbab6a1745bdf3ff4941863b64563937950a7aa74eddf5e825d830c5 |
| logs/172-identity-clause-review.log | 10:35  1 user, load averages: 2.01 2.11 1.74 | 0 | 88cc71f2e208d0cd64ea6356f15f3b41a1c155501269651ae03a348d9832235c |
| logs/173-break-3-test.log | 10:43  up 11:14, 1 user, load averages: 1.55 1.56 1.58 | 1 | 4832382d5366e6ffec88c3aec93d8898530391c2e3843f9e5b3ac22d3b5038c8 |
| logs/174-break-3-restore.log | 10:43  1 user, load averages: 1.62 1.57 1.59 | 0 | df695ee8009f2280cd42337b60da0975d5b3c5257b097c57b84ebbb8477c0df2 |
| logs/175-break-4-diff.log | 10:43  1 user, load averages: 1.49 1.55 1.58 | 1 | b2f5ab5911d52dce0e2a9da58291e0fde96dad106cae747bf2cbad6d270a37d8 |
| logs/176-break-4-runtime.log | 10:43  up 11:14, 1 user, load averages: 1.61 1.57 1.58 | 0 | 19a6b22cd2ca7458984b0f4e2e3960e3150e9b2119bca52907319eec9ce6a592 |
| logs/177-break-4-wait.log | 10:44  1 user, load averages: 1.61 1.57 1.58 | 0 | 4996ceeb4b424b8db08a12cc0d78b08b03dbfe6dcf95c679b0d959858e83c942 |
| logs/178-break-4-test.log | 10:44  up 11:14, 1 user, load averages: 1.65 1.58 1.59 | 1 | 1a0fc4216cc51d8f8be9c66b5348035b32e000cd494b598cc21223cf377cf46e |
| logs/179-break-4-restore.log | 10:44  1 user, load averages: 2.01 1.66 1.62 | 0 | d09e1336b0863116ad2afe90aec047cbbf4440b0208124f9cc6b6df261c5ca3b |
| logs/180-r5-typecheck-wait.log | 10:44  1 user, load averages: 2.01 1.66 1.62 | 0 | 43efec1200ab2bb00eba561b6cbb6c816e0bc23d9cea204b1b14521a29219d75 |
| logs/181-r5-commit-review.log | 10:45  1 user, load averages: 1.96 1.69 1.63 | 0 | 86b6a111932721c2c377110d31161f68ab88000db979e5409003c5b84b92b6c6 |
| logs/182-commit-4-message-check.log | 10:45  1 user, load averages: 1.96 1.76 1.66 | 0 | 23900afb4a156689e8e56f9bef0b583f14940a3d74d0077a718537f3b460e705 |
| logs/183-r5-typecheck.log | 10:48  up 11:18, 1 user, load averages: 1.55 1.69 1.64 | 0 | 25ef2f8261618f97df16f23116c9f6904bcb63e189379c9efc951ed7118425e9 |
| logs/184-commit-4-stage.log | 10:48  1 user, load averages: 1.99 1.78 1.68 | 0 | d897a485eb5cc6b1a199d90efc008b8a375e4604eb7bd09025ffbb3b0f7e6ded |
| logs/185-commit-4-staged-review.log | 10:48  1 user, load averages: 1.99 1.78 1.68 | 0 | 2a0a55aa3f63269111cc81e144d035aa3c4d90e9cdfdc92e9feba44d6bf69c1a |
| logs/186-commit-4.log | 10:48  1 user, load averages: 1.99 1.79 1.68 | 0 | 22cf0b992654a13c6427864e8e983293003a028becf5b8520bf62c24f9cc7893 |
| logs/187-commit-4-restore-proof.log | 10:48  1 user, load averages: 1.99 1.79 1.68 | 0 | d163c0a07106286b2ee7396ae0908330f1244bc51287f32359918ef344dfc2ae |
| logs/188-full-runtime-before-install.log | 11:49  up 12:19, 1 user, load averages: 1.68 1.79 1.89 | 0 | a75e088406776ed2f4a09f96621c7d8feb3f82037df0356ea76fb6b370747010 |
| logs/189-full-frozen-install.log | 11:54  up 12:25, 1 user, load averages: 1.92 1.66 1.78 | 0 | 89095224bd3bfe088bbeed0535547086e5a8d2ecc0514038fcb03bb54591085a |
| logs/190-full-install-state.log | 11:54  1 user, load averages: 1.92 1.67 1.78 | 0 | 27e4231d605f900107262ba756bfd1ffd0c1fa6efb2a3559fbec3cbb4eeaecb1 |
| logs/191-full-install-mode-restore.log | 11:54  1 user, load averages: 1.93 1.67 1.78 | 0 | 49a87de42739d373a657c6a94b70422a6066ad5a4b632954df37f7443eca50f1 |
| logs/192-full-typecheck-wait.log | 11:54  1 user, load averages: 1.93 1.67 1.78 | 0 | 2f95073f73a831ed8f623e2bedf0c6bffc9d40f3a8fbda664441bf38676f58ac |
| logs/193-full-typecheck.log | 12:27  up 12:58, 1 user, load averages: 2.81 1.68 1.61 | 0 | 803f95cd5b1ec54627c40f400bb5ca54a17e8de12fa4dd41f3d0b6e251faceaf |
| logs/194-full-runtime-before-suite.log | 12:28  up 12:58, 1 user, load averages: 3.17 1.85 1.67 | 0 | 27d8d3d27509b1660849639fe9def6e1def885e0b850dea4043c78a56793c7a9 |
| logs/195-full-suite-wait.log | 12:28  1 user, load averages: 3.17 1.85 1.67 | 0 | d2d2eeb802adec4ef44d2c28e4af3e6d6461ac10a7df6f1d3237fe8062ede4c6 |
| logs/196-full-comparison-preparation.log | 12:28  1 user, load averages: 3.00 1.85 1.67 | 0 | b79f5d0a0297e294800737cc92617c6aa95bf33aec3fbec902a2b97092eb0b79 |
| logs/197-base-list-path.log | 12:28  1 user, load averages: 2.85 1.86 1.68 | 0 | ce6c5657a4b8f0ed3ed44482d2ad98d1a4821dc1d8955faffdb930daf05e8cea |
| logs/198-base-list-command.log | 12:28  1 user, load averages: 2.56 1.83 1.67 | 0 | 9bfb82a97407dff4c6dcbbe85c9544dc46fedce1e243941314bb8e9e4a476856 |
| logs/199-full-suite.log | 12:29  up 13 hrs, 1 user, load averages: 1.71 1.70 1.63 | 0 | ecb4ef94bf74b7d4f59865c72d8668cd2c813073d0f0207c920bbfb2fe19aeb1 |
| logs/200-head-test-list.log | 12:32  1 user, load averages: 1.17 1.53 1.57 | 0 | fad5e4ec9862cecca1d88acb7efdc7e70a1ea4d0e89896aa0d89ea5c4d5eb036 |
| logs/201-full-test-comparison.log | 12:32  1 user, load averages: 1.36 1.53 1.57 | 0 | c33675929fffb7f04935bcbf81f0b6f6977198c4538598b8a3f38dd8b7cb50be |
| logs/202-full-diff-check.log | 12:33  1 user, load averages: 1.65 1.59 1.59 | 0 | e7ce0b8d659a475c1387b6fc30abff85ad9bc94ee6a051ed243671ba45a938f3 |
| logs/203-full-changed-paths.log | 12:33  1 user, load averages: 1.65 1.59 1.59 | 0 | 60422b69101a787275272032550c108a9fcd64a5aed0e22a89e50cbbcac600e2 |
| logs/204-full-registry-diff.log | 12:33  1 user, load averages: 1.65 1.59 1.59 | 0 | 38a59444c7de7125cbd25e1750fbbf36eb0856d272472f4daf35b67d87d90c6b |
| logs/205-full-status.log | 12:33  1 user, load averages: 1.65 1.59 1.59 | 0 | 04649fd7f4fcf46a35bb160b3447546dddec9950b2e796128d190226f50a7016 |
| logs/206-full-untracked.log | 12:33  1 user, load averages: 1.65 1.59 1.59 | 0 | 1685cc849c0c24a4883a688a708e1e5855a4996ea6c3790c5ed1cf7f8b3e9cd0 |
| logs/207-record-runtime-and-parser.log | 12:33  1 user, load averages: 1.80 1.62 1.60 | 0 | e26fff1684ee23030b68c5935d651ea27f04c669f0099e50067e752e126bc891 |
| logs/208-record-event-shape-review.log | 12:33  1 user, load averages: 1.60 1.59 1.59 | 0 | ce5ade2ea7a5623b65ad39b8e96fee9bcd0f9a6dec19b0fa58a7656c485f818f |
| logs/209-record-script-static-review.log | 12:36  1 user, load averages: 3.47 2.42 1.91 | 0 | 9b1ef52e52b2f4a110e782742c0b539586cbf8b5fc5de4b7f38886d31afdd611 |
| logs/210-record-environment-contract.log | 12:36  1 user, load averages: 3.27 2.39 1.91 | 0 | 2082789234c7a12813fcd4386d2e574895051e298af551444d991db04997c86c |
| logs/211-record-script-source.log | 12:38  1 user, load averages: 3.07 2.54 2.01 | 0 | 479e7bef6e502ca089711ca6ae8ebbb37940f5ba5bc2df5c08675aa449dca4ea |
| logs/212-record-linux-host-rule.log | 12:39  1 user, load averages: 2.27 2.41 1.99 | 0 | ee9d7267fe6b3cc6fadc1c3d5edae25967c9d0c54ce19afbcbaa852e9a6b3ce4 |
| logs/213-record-linux-fields.log | 12:39  1 user, load averages: 2.27 2.41 1.99 | 0 | ae02dbb0e9dd8f231f4b9ace58fed2c876b7696290cab2c7cd2581d0a0650368 |
| logs/214-record-linux-host-definition.log | 12:39  1 user, load averages: 2.09 2.37 1.98 | 0 | bc4a93aa9378f261ea851d77979da493933b80bcd64b14c2f5df15f7e2e39397 |
| logs/215-r6-runtime.log | 12:41  up 13:12, 1 user, load averages: 2.36 2.30 1.99 | 0 | 6a21b426c41a630ff63c2b06381eec10793a3d97940298c486a8b2a7028f9d59 |
| logs/216-r6-make-synthetic-captures.log | 12:44  up 13:15, 1 user, load averages: 1.35 1.81 1.84 | 0 | 234d9cc179063db68e17e1f15bef844ebe465b3a492de9968c6e86430b28074c |
| logs/217-r6-madv-pass-wait.log | 12:45  1 user, load averages: 1.16 1.74 1.81 | 0 | 22bfd04e0814aea13aacca736c544750ad74535e40a8ee4699d6a24158202907 |
| logs/218-r6-madv-pass.log | 12:47  up 13:18, 1 user, load averages: 1.41 1.68 1.78 | 0 | 1b488f7eb826fba7747352f81240a405824b47145203e476af7c4a18ba79556b |
| logs/219-r6-madv-echo-wait.log | 12:47  1 user, load averages: 1.24 1.63 1.76 | 0 | 322aca90b0f354b792038a691f55215324ebdd85612101a67c4fb17b675cc7cc |
| logs/220-r6-madv-echo.log | 12:48  up 13:18, 1 user, load averages: 1.26 1.60 1.75 | 0 | 6555fccd64369fd3dd34ba7f384dc043313f16dae93453ed4723c70617ab6bcd |
| logs/221-r6-claude-pass-wait.log | 12:48  1 user, load averages: 1.24 1.59 1.74 | 0 | be8406297313409b8da7a8ea45ca7e2666542533c56f501ec2ca137de0a96e8a |
| logs/222-r6-claude-pass.log | 12:48  up 13:19, 1 user, load averages: 1.24 1.59 1.74 | 0 | 86979ad16e927995a6f92fff3b4378eb504f0f1e8eb35307b9d177bc833189c1 |
| logs/223-r6-claude-wrong-model-wait.log | 12:48  1 user, load averages: 1.46 1.63 1.75 | 0 | 629d9dbea76959559c3d1bbfacdf2e081d2c6be49f072c8fe33182e66ff785f9 |
| logs/224-r6-claude-wrong-model.log | 14:10  up 14:41, 1 user, load averages: 1.77 1.60 1.57 | 0 | 13e9df088bc1083d2f653e27b3f08d989dcdbd500e6376b210a46c7697726434 |
| logs/225-r6-key-set-wait.log | 14:10  1 user, load averages: 2.43 1.76 1.63 | 0 | f426946582efafe8920dfb4150fdf8c6f0a4e20e1bbde304290dc65580e0db60 |
| logs/226-head-preservation-and-redaction.log | 14:14  1 user, load averages: 1.99 2.01 1.77 | 0 | a05d0ea31af1decc2ff0b3464f7698e29d1ab4eba70a95bde915e13f12e94f4a |
| logs/227-r6-key-set.log | 14:34  up 15:05, 1 user, load averages: 2.24 1.77 1.60 | 1 | f80696ca28780d12babbe4e6d9b0399bf35e30a0156f8d47c0c05fb91def6076 |
| logs/228-r6-storage-set-wait.log | 14:34  1 user, load averages: 2.27 1.79 1.61 | 0 | db523f84861ec26503cfc1a45801669640465b405f803ef79d50bf1982b6d871 |
| logs/229-existing-test-final-diffs.log | 14:35  1 user, load averages: 2.04 1.81 1.63 | 0 | 593de0b5b8efa97541039f39c7ca5d3c19f9d0ccff989358719b23d9ceb82414 |
| logs/230-complete-phase1-code-diff.log | 14:36  1 user, load averages: 2.34 1.94 1.68 | 0 | 1b6823c2ebfc89e7197595223d8f137b9f936339279260b52250cb34d721a262 |
| logs/231-r6-storage-set.log | 14:38  up 15:09, 1 user, load averages: 1.75 1.84 1.67 | 1 | 952500574e8d61e96bcdac04d911f421cb94588b8f6ebf0730955146ab90c4ca |
| logs/232-r6-missing-file-wait.log | 14:38  1 user, load averages: 1.72 1.83 1.67 | 0 | 511e54d6b4d2065a8d0f424a3949164853a148d830fdc7050d1bbbf8e9871097 |
| logs/233-r6-missing-file.log | 14:39  up 15:09, 1 user, load averages: 3.11 2.13 1.78 | 1 | 84ab06d7ff474bd4628ddbea0850c1b59489bf6612771974bd3d8ed371d11bd5 |
| logs/234-r6-uncovered-file-wait.log | 14:39  1 user, load averages: 3.08 2.19 1.81 | 0 | 79c51440b5ad23d881a9c14c8bd2c7c921e31c70a4b1aa2e9dada5690da09e1a |
| logs/235-r6-uncovered-file.log | 14:40  up 15:11, 1 user, load averages: 1.69 1.98 1.76 | 1 | 68fd21abdc6d503d4efccd7e48587628edb780d3fda451e4d46570d58b3a274c |
| logs/236-r6-changed-file-wait.log | 14:40  1 user, load averages: 1.71 1.98 1.76 | 0 | f33505b0e80737c2adf191689b45314e6f6ae2ff649d2790e8b56f81df95e2ae |
| logs/237-r6-changed-file.log | 14:52  up 15:22, 1 user, load averages: 1.13 1.33 1.48 | 1 | 35eeff90822091aa9fb78039bb3912d97e57c38e4333b0f54f76dfbd4835072e |
| logs/238-r6-marker-file-wait.log | 14:52  1 user, load averages: 1.18 1.33 1.48 | 0 | c30f51e3f260d7bc1adbcd8ef70fc2b98019b3e9087f3d7f3ed6e46a156b9da8 |
| logs/239-r6-marker-file.log | 14:52  up 15:23, 1 user, load averages: 1.09 1.31 1.47 | 1 | f2bea18d6a0d919af4888d860bee83840ba6b11628fdfdc0079f2781e1e26b0e |
| logs/240-r6-non-work-tree-wait.log | 14:52  1 user, load averages: 1.08 1.31 1.46 | 0 | aebdeb0a14cdc5a0f00fe69f485a278d41e27564a62a3b2b33824cfce6dcccf7 |
| logs/241-r6-non-work-tree.log | 14:56  up 15:26, 1 user, load averages: 1.28 1.14 1.34 | 1 | b26fb669a2005eb9cd4229daca472e8cd0c79c1b7ad18cc3b4495f6668fa1234 |
| logs/242-r6-missing-manifest-wait.log | 14:56  1 user, load averages: 1.18 1.12 1.33 | 0 | 240497e018141598d1929582391c1177ff67767d9340bcd5d1e2a6ae3412fdab |
| logs/243-r6-missing-manifest.log | 15:14  up 15:45, 1 user, load averages: 0.93 1.08 1.16 | 1 | 74f15bee521491c76fc5826790fefad27d869c8b6af35b951e986292993e46de |
| logs/244-record-script-final-source.log | 15:15  1 user, load averages: 0.85 1.04 1.14 | 0 | e2717fc9c0841dfd9d573393e7138fdf4fa8aefac6d6e88b938b1e44728d70c3 |
| logs/245-closure-evidence-index.log | 15:17  1 user, load averages: 0.60 0.92 1.07 | 0 | 93134cb60958ffaefe28f0066809277b0be21f41562e58bb8a966ffe86aedf45 |
| logs/246-opening-limitations-review.log | 15:17  1 user, load averages: 0.47 0.87 1.05 | 0 | c7644ac48faff3988282dad0c8a3ac63e3fd3b0643af67e2d12c45bfd6feacb1 |


### Declarations, limits and deviations


No live call was made. No surface was run. No real key was used. No capability record was written to storage; synthetic records were printed into command logs only. No request left the host other than the package downloads of bun install. No MCP server, agent, memory lookup, GitHub call, push or other network call was used.

The first halt before baseline was upheld by the Founder and resolved by Addendum 2 and the signed first resume. Halt report SHA-256 4fef47b6a4f9c26e142347967f4e01b80758162e4fd0f6e6f2e3f79a36f44be4; it remains pr/m0-phase1-halt-1-report.md.

Initial logs-directory emptiness was not independently measured before creating the first required command log; the opening records this limitation.

Incidental read/formatting errors were corrected: a wrong relative adapter path in log 057, wc given a directory in log 070, and the first head-list filename in log 196. Some read-only shell invocations group checks, so their final footer is the aggregate shell exit status; earlier component errors remain visible. No required test failure was hidden.

One orchestration evaluation had a syntax error before executing a command. It changed no file and was corrected before continuing.

The first opening whitespace check found trailing tabs on quoted blank source lines. They were removed before commit 1; log 093's compound invocation ended zero, but no commit followed that failed internal check.

R3's first RED also exposed an own synthetic envelope error: repository and worktree were equal. The new helper was corrected to use a separate worktree before the green run. No base assertion changed.

R5's first targeted run failed one own clock assertion because its Claude identity fixture woke at init. The new test was corrected to compare the clean-exit auth budget at 4,999 and 6,000 ms. Production Claude semantics were preserved.

Approval delays sometimes raised actual run load above the preceding successful wait. Both readings are retained. Every such non-deliberate run passed except the already described own uncommitted failures; all other tests in deliberate-break files passed.

Known frozen/non-frozen install executable-bit changes on founder-act main.ts were restored and logged each time, as expressly authorized.

All break restores were compared with saved pre-break bytes first; empty Git status and equality with committed bytes were then shown after the corresponding implementation commit, following the commissioned break-before-commit order.

This appendix's command ledger closes at log 246. Documentation packaging, commit 5 and final attribution/report checks occur afterward and are indexed in the saved final report.

Phase 1 did not perform the investigations or create live records under B8, B10 and B15 items 2-3; add Phase 2 recorded fixtures or packet; run the B12 gates at a Phase 2 head; perform the Founder's fresh-clone runs on both hosts; obtain independent review; push; or perform the Founder's session-record check. The final attribution-shape check follows commit 5 and is reported in pr/m0-phase1-report.md.

Packaging format correction before commit 5: the first appendix draft had
blank lines between table rows. Review caught this and joined those rows.
The opening remains byte-for-byte unchanged; no code or test changed.
