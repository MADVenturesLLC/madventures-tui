# Phase 3B M2 build log

## Commission and builder

Local origin/main, branch base and initial HEAD were c383353885abb526a5471ef764be3cffc558a6ff. Its first parent was b091b668af7db6142c5afeff16a628080885f63b. The branch is build/3b-m2-r1. DEC-20261125-01 B13 binds this build to the merge of pull request 255. The commission has SHA-256 3a6259589ad33fd82f207560ca81b138516b4ce967e38523ec592b35c4cce3ac.

The harness is Codex, model OpenAI GPT-6. The exact model identifier, effort, session ID and approvals reviewer were not shown. The assigned role is builder, actor session:codex/3b-m2-r1, execution surface codex. The harness showed /root in Default collaboration mode, workspace-write and restricted network access. The Founder reported on-request approval and no loaded MCP server. The supplied working directory was /Users/michaeldaley/builds/m2-r1, shell zsh, date 2026-11-25 and time zone America/New_York. Git identity was daley40-lab with 293512385+daley40-lab@users.noreply.github.com.

The inventory included functions.wait, request_user_input, request_user_input_async, send_message_to_user_async and exec. Inside exec it included apply_patch, exec_command, write_stdin and clock__curr_time. It also showed clock.sleep, collaboration.followup_task, interrupt_agent, list_agents, send_message and wait_agent, and the six names of Addendum 2 B4. Individual members of the deferred namespace were not initially displayed.

001-governed-version.log · 70de60425ca2312fb1a68e0ce2f9736235bec3b4b8f350a07e48c16fe4cd40f4

```text
WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0
```

## Preconditions

1. Log 010 verified the clean binding base, ancestor, first parent, five documentation-only changes, remote branches, directory inventories and initial absence of the M2 documents. The only numbered logs in the inventory had just been written by this session. Logs 071 and 072 reconfirmed HEAD, branch, clean index, worktree and empty stash on resume.

010-seat.log · c581ae69339ae82de6e1c4834b55609d983f8d09d232a4529c3886b1e0236977

```text
c383353885abb526a5471ef764be3cffc558a6ff
b091b668af7db6142c5afeff16a628080885f63b
docs/decisions/DEC-20261123-01-addendum-1-environment-values-in-logs.md
docs/decisions/DEC-20261123-01-addendum-2-pty-echo.md
docs/decisions/DEC-20261123-01-addendum-3-first-verdict.md
docs/decisions/DEC-20261125-01-m1-records-and-m2.md
docs/verification/phase-3a-correction-rounds.md
```

2. All authority blobs were read from HEAD and verified. Each governing decision and addendum was issued and signed by Michael Daley. The following table gives blob SHA-256 and source path.

SHA-256 | Source
:-- | :--
3a6259589ad33fd82f207560ca81b138516b4ce967e38523ec592b35c4cce3ac | docs/decisions/DEC-20261125-01-m1-records-and-m2.md
e0f08199567641f47eba567ac0653bfc8f1ed9315b3ddfca8074d535b294cb8e | docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md
5cd930a3f2dbb8f3a85c63cfba5ed95f8088418ee132e89872d57e63fad75666 | docs/decisions/DEC-20261123-01-addendum-1-environment-values-in-logs.md
f524cb055c363c57dbcaf25dc037645989d453a942f3ce120c7083735e6cc52c | docs/decisions/DEC-20261123-01-addendum-2-pty-echo.md
b7ff8171407289c4b4db9be9c76dfa049fdd8b0fe4f80076613f9aa6b48e43f7 | docs/decisions/DEC-20261123-01-addendum-3-first-verdict.md
d373235e424bd7fbe4c1c5b1c5f4954eb1b02165db4e1365d9cfa1533aa93b29 | docs/decisions/DEC-20261108-04-phase-3b-standing-commission.md
90e2f541fd0a232390ca0554067a2de8b37f15c933016eafe40ebde2cd2eff17 | docs/decisions/DEC-20261108-04-addendum-1-corrections.md
319ba65b340696d66a655e21f648fed742a9c38bcbb1d876776abc27a27a9738 | docs/decisions/DEC-20261108-01-phase-3b-approval.md
863f0b7bff5e7cc662bfc43084120d6fff39af07daa3117521bc85f887b8d3c9 | docs/decisions/DEC-20261016-02-task46-correction.md
fa0d114dbe3a37db38a7538e9a5c33da42755a47250d7ae4069233043c6ac85e | docs/decisions/DEC-20261024-01-separation-pin-rule.md
3151cb9e178e918f0c07f5a4eb9931fa9d529debedf0ad4d91f5999844883da7 | docs/decisions/DEC-20261112-02-model-record.md
38ec4066f5c9487547befc81e00b80b69126d9140f1e66c0a8dcb35e5fe815ef | docs/decisions/DEC-20261108-02-phase-3b-builder-qualification.md
e04b54065b0f0bb465b2d14e14a39f3b31f9cb34a874f6f8210a7d7e74a8c1c1 | docs/decisions/DEC-20261108-03-addendum-2-codex-harness.md
f2a0ef1063379902935760d9517b68d532cabf6e24699cdebb789681f78ce15e | docs/decisions/DEC-20261108-03-addendum-3-image-tool.md
e817470aea6be2c176d4ae75856fd793ef982bd28c9eb793df9c9038a5c1dfbc | docs/decisions/DEC-20261108-03-addendum-4-sandbox-halt.md
e86e94a62c7067e4656114afe1713c1478814ffe446d1ffcc8b788accfc3ff3d | docs/decisions/DEC-20261108-03-addendum-5-own-work.md
24cef0ed5c968aa80ada586e473526d0f4f0b1de1331eba1d5a35051b1254ac9 | docs/decisions/DEC-20261108-03-addendum-6-names-in-text.md
d90d48718bc4ea6056af6f011f797a78eddcfd14e7111f15f823085c4388bca0 | docs/decisions/DEC-20261108-03-addendum-10-second-verdict.md
e2d28cbd12485e9025c928403eb7beead9552ee378b023ddf5bc9e18febe00df | docs/decisions/DEC-20261108-03-addendum-11-governed-build.md
829248f1e2557ddbcfd33d6456f7056bfce73a008791cb88caa9660a5d979d29 | docs/decisions/DEC-20261112-03-addendum-2-gate-repeat.md
10cdc674ce746568c963aa2c5c34c95a69d9960ea469438b044bfb5fe4b9e9de | docs/decisions/DEC-20261108-03-phase-3b-h1.md
41e27eafc24a2eef238c080d1374b90fbe22d609f4ef5cbb66e07cccb5b347a5 | docs/decisions/DEC-20261113-01-h2-records-and-merge.md
04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550 | docs/decisions/DEC-20261102-02-hardening-builds.md
bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5 | docs/decisions/DEC-20261023-01-standing-build-rules.md
249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7 | docs/decisions/DEC-20261013-03-tests-4-6-ruling.md
011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5 | docs/decisions/DEC-20261104-02-hardening-f-and-task58.md
6bffc2c18927b90f4b5042f312947e5d39853ca53404a58a51b4602eb45652b8 | docs/decisions/DEC-20261114-01-madv-surface-release.md
5d8bd4a446d8b3120bddbc34dc11a5fdf83e3a07d9efcd04fbd7b8efdad8d22b | docs/decisions/DEC-20261115-02-phase-3b-m0.md
24f76dbb631d6058e81ccff93d3c9fecb11521b5a876c687ec0da1ee0f9e0a23 | docs/decisions/DEC-20261115-02-addendum-3-phase-1-record-check.md
a48bf5457bf17cf5d554e541c5bb3609efacf6ad170ad6e56950b829a4269ccc | docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md
da8f4c8c35f617898368b340d710188686c9dc9faf2b23c4a6b284c1bb4d93fc | docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md
472f3179c20f7f41c0e3feb5a65842bf3774cf6df01e8684a3ea86dcd811bce0 | docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md
0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca | AGENTS.md

The original builder prompt has SHA-256 92540f1a8ff60f3a2bc68e9c4b9cdbcc121f967c2273791e61eddb8e7b8e4945. Both prompt-manifest entries verified on resume.

3. The numbered source excerpts below establish the broker, TUI, monitor and separation contracts at the binding base. The source fingerprint is required. The first resume ruling resolves B16 item 3 and the B19 table in favor of validating that required source shape. Logs 048 through 055 and 064 contain the source reads. The A10 blob checks are in log 076. Repeated fields of the independent room projection and fixture initializers in log 064 do not read the client projection. Source line numbers are at the base.

048-broker-interface.log · ed106e7ff5388e18bee719e7dd8ee809842e6a25790ae2479c406359e16050ff

```text
packages/broker/src/client.ts
   106	/** The client-facing broker session projection (spec section 9.4). */
   107	export interface BrokerSnapshot {
   108	  readonly sessionId: string;
   109	  readonly snapshotSeq: number | null;
   110	  readonly connected: boolean | null;
   111	  readonly phase:
   112	    | "starting"
   113	    | "active"
   114	    | "paused"
   115	    | "interrupted"
   116	    | "closing"
   117	    | "closed";
   118	  readonly taskEnvelopeHash: string;
   119	  readonly task: TaskEnvelopeV1 | null;
   120	  readonly repositoryFingerprint: RepositoryFingerprint;
   121	  readonly executions: readonly ExecutionSnapshot[] | null;
   122	  readonly activeWriterExecutionId: string | null;
   123	  readonly fencingToken: number | null;
   124	  readonly tokenState: "not_issued" | "valid" | "invalidated";
   125	  readonly pendingApprovals: readonly PendingApprovalSnapshot[];
   126	  readonly pendingTransfers: readonly PendingTransferSnapshot[] | null;
   127	  readonly permissionSummary: PermissionSummarySnapshot | null;
   128	  // Existing Phase 2 broker ownership-state type, declared in
   129	  // packages/broker/src/ownership-machine.ts. Consumed, never redeclared.
   130	  readonly ownershipState: OwnershipState | null;
   131	  readonly verification: VerificationSnapshot | null;
   132	  readonly review: ReviewSnapshot | null;
   133	  readonly incident: IncidentSnapshot | null;
   134	  readonly eventLog: readonly LedgerEntrySnapshot[];
   135	  readonly queueDepth: number | null;
   136	  readonly ledgerSeq: number;
   137	}
   138
   139	/** Launch facts for one execution of the session (spec section 9.4). */
   140	export interface ExecutionSnapshot {
   141	  readonly identity: ExecutionIdentity;
   142	  readonly state:
   143	    | "declared"
   144	    | "host-starting"
   145	    | "launching"
   146	    | "attesting"
   147	    | "ready"
   148	    | "exited"
   149	    | "failed";
   150	  readonly hostPid: number | null;
   151	  readonly childPid: number | null;
   152	  readonly processGroupId: number | null;
   153	  readonly executablePath: string;
   154	  readonly executableSha256: string;
   155	  readonly exitCode: number | null;
   156	  readonly exitSignal: string | null;
   157	}
(lines omitted)
   167	/** A pending approval as projected to the client (spec section 9.4). */
   168	export interface PendingApprovalSnapshot {
   169	  readonly id: string;
   170	  readonly type: string;
   171	  readonly actor: string;
   172	  readonly taskId: string;
   173	  readonly repositoryFingerprint: RepositoryFingerprint;
   174	  readonly scope: string;
   175	  readonly timestamp: string;
   176	  readonly state: "pending" | "approved" | "rejected" | "expired";
   177	}
(lines omitted)
   227	export interface LedgerEntrySnapshot {
   228	  readonly seq: number;
   229	  readonly type: string;
   230	  readonly actor: string;
   231	  readonly fencingToken: number | null;
   232	  readonly hash: string;
   233	  readonly timestamp: string;
   234	}
   235
   236	/** The in-process client boundary (spec section 9.3). close() releases only this client's subscriptions. */
   237	export interface BrokerClient {
   238	  getSnapshot(): Promise<BrokerSnapshot>;
   239	  snapshots(): AsyncIterable<BrokerSnapshot>;
   240	  output(executionId: string): AsyncIterable<OutputFrame>;
   241	  request(command: BrokerCommand): Promise<BrokerResult>;
   242	  publish(event: BridgeEventV1): Promise<BrokerResult>;
   243	  close(): Promise<void>;
   244	}
packages/broker/src/ownership-machine.ts
     9	export type OwnershipState =
    10	  | { kind: "free" }
    11	  | { kind: "owned"; executionId: string; worktreeId: string; fencingToken: number; repositoryFingerprint: RepositoryFingerprint }
    12	  | { kind: "transfer-requested"; executionId: string; worktreeId: string; fencingToken: number; transferTo: string; repositoryFingerprint: RepositoryFingerprint }
    13	  | { kind: "sender-released"; executionId: string; worktreeId: string; fencingToken: number; transferTo: string; repositoryFingerprint: RepositoryFingerprint }
    14	  | { kind: "rejected"; executionId: string; worktreeId: string; fencingToken: number; reason: string };
packages/broker/src/in-process-client.ts
   249	  function nextStampedSnapshot(): StampedBrokerSnapshot | Promise<never> {
   250	    const projected = projectSnapshot(broker.snapshotProjectionInput());
   251	    const violation = admitSnapshotSeq(deliveredSeq + 1);
   252	    if (violation !== null) {
   253	      return raise(violation);
   254	    }
   255	    return { ...projected, snapshotSeq: deliveredSeq, connected: !closed };
   256	  }
(lines omitted)
   292	  async function getSnapshot(): Promise<StampedBrokerSnapshot> {
   293	    return nextStampedSnapshot();
   294	  }
   295
   296	  async function* snapshots(): AsyncGenerator<StampedBrokerSnapshot> {
   297	    while (!closed) {
   298	      yield nextStampedSnapshot();
   299	    }
   300	  }
(lines omitted)
   390	  async function close(): Promise<void> {
   391	    // Releases only this client's own iterators and buffers. The bound
   392	    // RuntimeBroker, its ledger, and its session are never touched here.
   393	    closed = true;
   394	    outputQueues.clear();
   395	    outputSeqs.clear();
   396	    for (const waiter of [...outputWaiters]) {
   397	      waiter.settle(iterationDone());
   398	    }
   399	  }
```

049-tui-entry.log · 6c87b4c851c63cbd35764ce2f1d8bcb7b5c5d3ea28979b9a38d94fc040223204

```text
apps/madbridge/src/tui/types.ts
    71	/** Color states for approval — explicit text for every color state. */
    72	export type ApprovalColorState =
    73	  | { kind: "pending"; text: "PENDING — awaiting Founder decision" }
    74	  | { kind: "approved"; text: "APPROVED — Founder authorized" }
    75	  | { kind: "rejected"; text: "REJECTED — Founder denied" }
    76	  | { kind: "expired"; text: "EXPIRED — decision window elapsed" };
(lines omitted)
    92	/** Immutable broker snapshot for TUI consumption. */
    93	export interface BrokerSnapshot {
    94	  readonly connected: boolean;
    95	  readonly sessionState:
    96	    | "starting"
    97	    | "active"
    98	    | "paused"
    99	    | "interrupted"
   100	    | "reconciling"
   101	    | "closing"
   102	    | "closed";
   103	  readonly ownershipState:
   104	    | "free"
   105	    | "owned"
   106	    | "transfer-requested"
   107	    | "sender-released"
   108	    | "receiver-validating"
   109	    | "rejected";
   110	  readonly activeWriter: string | null;
   111	  readonly fencingToken: number;
   112	  readonly task: TaskEnvelopeV1 | null;
   113	  readonly executions: readonly ExecutionIdentity[];
   114	  readonly repositoryFingerprint: RepositoryFingerprint | null;
   115	  readonly pendingApprovals: readonly PendingApproval[];
   116	  readonly pendingTransfers: readonly PendingTransfer[];
   117	  readonly permissionSummary: PermissionSummary;
   118	  readonly transferPhase: string | null;
   119	  readonly verificationStatus: VerificationStatus | null;
   120	  readonly reviewStatus: ReviewStatus | null;
   121	  readonly incident: IncidentRecord | null;
   122	  readonly eventLog: readonly LedgerEntryProjection[];
   123	  readonly queueDepth: number;
   124	}
   125
   126	export interface PendingApproval {
   127	  readonly id: string;
   128	  readonly type: string;
   129	  readonly actor: string;
   130	  readonly taskId: string;
   131	  readonly repositoryFingerprint: RepositoryFingerprint;
   132	  readonly scope: string;
   133	  readonly timestamp: string;
   134	  readonly colorState: ApprovalColorState;
   135	}
(lines omitted)
   175	export interface LedgerEntryProjection {
   176	  readonly seq: number;
   177	  readonly type: string;
   178	  readonly actor: string;
   179	  readonly fencingToken: number;
   180	  readonly hash: string;
   181	  readonly timestamp: string;
   182	}
apps/madbridge/src/tui/App.tsx
   116	  subscribe?: (listener: (snapshot: BrokerSnapshot) => void) => () => void;
apps/madbridge/src/tui/hooks/useBrokerState.ts
    10	export interface BrokerStateHook {
    11	  readonly state: BrokerSnapshot | null;
    12	  readonly connected: boolean;
    13	  readonly subscribe: (listener: (snapshot: BrokerSnapshot) => void) => () => void;
    14	}
    15
    16	/**
    17	 * useBrokerState subscribes to immutable broker snapshots.
    18	 * The broker owns all authority — this hook only reads state for rendering.
    19	 */
    20	export function useBrokerState(
    21	  externalSubscribe?: (listener: (snapshot: BrokerSnapshot) => void) => () => void,
    22	): BrokerStateHook {
    23	  const [state, setState] = useState<BrokerSnapshot | null>(null);
    24	  const [connected, setConnected] = useState(false);
    25	  const unsubscribeRef = useRef<(() => void) | null>(null);
    26
    27	  useEffect(() => {
    28	    if (!externalSubscribe) {
    29	      // No broker connection configured — render shell only
    30	      return;
    31	    }
    32
    33	    const unsubscribe = externalSubscribe((snapshot: BrokerSnapshot) => {
    34	      setState(snapshot);
    35	      setConnected(snapshot.connected);
    36	    });
    37	    unsubscribeRef.current = unsubscribe;
    38
    39	    return () => {
    40	      if (unsubscribeRef.current) {
    41	        unsubscribeRef.current();
    42	        unsubscribeRef.current = null;
    43	      }
    44	    };
    45	  }, [externalSubscribe]);
apps/madbridge/src/tui/main.tsx
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

050-tui-readers.log · 706e894edc328a1a2bb67336122d7d2a974a3fc8ee21e6ca53cde5dd884121de

```text
apps/madbridge/src/tui/components/StatusBar.tsx
    30	  connected: boolean;
(lines omitted)
    44	    connected,
(lines omitted)
    71	  connected: boolean;
(lines omitted)
   106	  const connToken = input.connected ? "CONNECTED" : "NOT CONNECTED";
(lines omitted)
   132	  const connCompact = input.connected ? "CONN" : "NOCONN";
(lines omitted)
   273	const NO_TOKEN_MARKER = " T:none";
   274
   275	export function abbreviateWriter(ownerWord: string, maxLen: number): string {
   276	  // maxLen is a display-width budget, not a UTF-16 length.
   277	  // Explicit no-token state: keep the marker attached to the writer ID with a
   278	  // single space, and preserve the marker the same way an issued "#N" token is
   279	  // preserved — the ID yields budget first.
   280	  const noTokenMatch = /^(.*?)\s*\(token\s+none\)\s*$/i.exec(ownerWord);
   281	  if (noTokenMatch) {
   282	    const id = (noTokenMatch[1] ?? "").replace(/\s+/g, "");
   283	    if (displayWidth(id) + displayWidth(NO_TOKEN_MARKER) <= maxLen) return id + NO_TOKEN_MARKER;
   284	    const idBudget = maxLen - displayWidth(NO_TOKEN_MARKER);
   285	    // Marker alone exceeds the budget — keep the marker, drop the ID.
   286	    if (idBudget <= 0) return NO_TOKEN_MARKER.trimStart().slice(0, maxLen);
   287	    return sliceByDisplayWidth(id, idBudget) + NO_TOKEN_MARKER;
   288	  }
(lines omitted)
   346	function describeOwner(state: BrokerSnapshot | null): string {
   347	  if (!state) return "none";
   348	  const o = state.ownershipState;
   349	  const w = state.activeWriter;
   350	  const tok = state.fencingToken;
   351	  const hasToken = tok > 0;
   352	  switch (o) {
   353	    case "free":
   354	      return "free";
   355	    case "owned":
   356	      if (hasToken) return (w ?? "unknown") + " #" + String(tok);
   357	      return (w ?? "unknown") + " (token none)";
   358	    case "transfer-requested":
   359	      if (hasToken) return "transfer-req #" + String(tok);
   360	      return "transfer-req (token none)";
   361	    case "sender-released":
   362	      if (hasToken) return "released #" + String(tok);
   363	      return "released (token none)";
   364	    case "receiver-validating":
   365	      return "validating";
   366	    case "rejected":
   367	      return "rejected";
   368	  }
   369	}
apps/madbridge/src/tui/panes/GovernancePane.tsx
    51	  if (!state || !state.connected) {
    52	    return (
    53	      <box flexGrow={1} flexDirection="column" borderStyle="single" borderColor={active ? POSEIDON.accent : POSEIDON.uiBorder} overflow="hidden">
    54	        <text>{fit("GOVERNANCE | NOT CONNECTED")}</text>
    55	        <text>{fit("No current permissions, verification, or review.")}</text>
    56	      </box>
    57	    );
    58	  }
    59
    60	  // Safe accessors — resolve identities by surface.
    61	  const cl = state.executions?.find((e) => e.surface === "claude-code");
    62	  const agy = state.executions?.find((e) => e.surface === "antigravity");
    63	  const perms = state.permissionSummary;
    64	  const verification = state.verificationStatus;
    65	  const review = state.reviewStatus;
    66	  const transfer = state.pendingTransfers?.[0] ?? null;
    67
    68	  // Render empty allowed lists as "none", not healthy/active/unknown.
    69	  const readPaths = perms?.allowedReadPaths?.length ? perms.allowedReadPaths.join(", ") : "none";
    70	  const writePaths = perms?.allowedWritePaths?.length ? perms.allowedWritePaths.join(", ") : "none";
    71	  const cmdCats = perms?.allowedCommandCategories?.length ? perms.allowedCommandCategories.join(", ") : "none";
    72	  const egress = perms?.allowedEgressDestinations?.length ? perms.allowedEgressDestinations.join(", ") : "none";
    73	  const dataClass = perms?.dataClass ?? "—";
    74
    75	  // Build all rows as plain strings — each will be truncated to fit.
    76	  const rows: string[] = [];
    77	  rows.push("GOVERNANCE");
    78	  rows.push("Task ID: " + (state.task?.task_id ?? "—") + " | Repo: " + (state.task?.repository ?? "—"));
    79	  rows.push("Fingerprint: " + (state.repositoryFingerprint ? state.repositoryFingerprint.git_sha.slice(0, 12) : "—"));
    80	  rows.push("Claude: " + (cl?.execution_id ?? "—"));
    81	  rows.push("Antigravity: " + (agy?.execution_id ?? "—"));
    82	  rows.push("Writer: " + (state.activeWriter ?? "—") + " | Token: " + String(state.fencingToken) + " | Ownership: " + state.ownershipState);
    83	  rows.push("Read: " + readPaths + " | Write: " + writePaths);
    84	  rows.push("Commands: " + cmdCats + " | Egress: " + egress + " | Data class: " + dataClass);
    85	  rows.push("Transfer phase: " + (state.transferPhase ?? "none") + " | Pending transfers: " + String(state.pendingTransfers?.length ?? 0));
    86	  if (transfer) {
    87	    rows.push("Transfer: " + transfer.from + " → " + transfer.to + " | tok#" + String(transfer.fencingToken) + " | " + transfer.reason);
    88	    // Provenance timestamp on its own row so the label survives narrow-width
    89	    // truncation instead of being cut off behind a long reason.
    90	    rows.push("Transfer at: " + stamp(transfer.timestamp));
    91	  }
apps/madbridge/src/tui/components/agent-identity.ts
    53	  const found = state.executions?.find((e) => e.surface === surface);
(lines omitted)
    99	  if (!state.connected) return false;
(lines omitted)
   111	export function writerToken(state: BrokerSnapshot | null, surface: AgentSurface): number | null {
   112	  if (!isActiveWriter(state, surface)) return null;
   113	  return state!.fencingToken;
   114	}
(lines omitted)
   131	  if (!state.connected) return "STREAM ENDED";
apps/madbridge/src/tui/components/IncidentBand.tsx
    49	  const token = state?.fencingToken ?? 0;
    50
    51	  // Truth boundary: a fencing token is only real evidence when one was
    52	  // actually issued (tokens are 1-based). A missing/zero token must never be
    53	  // presented as an issued token that was invalidated — that would fabricate
    54	  // authority history. Render an honest fallback instead.
    55	  const tokenClause = token > 0
    56	    ? "token #" + String(token) + " invalidated"
    57	    : "no issued token to invalidate";
apps/madbridge/src/tui/panes/ClaudePane.tsx
    36	  const tok = writerToken(state, surface);
    37	  const live = livenessWord(state);
    38
    39	  // Build the header line truthfully.
    40	  const headerParts: string[] = ["CLAUDE CODE"];
    41	  if (active) headerParts.push("FOCUSED");
    42	  if (writer && tok !== null) {
    43	    headerParts.push("WRITER tok#" + String(tok));
apps/madbridge/src/tui/panes/AntigravityPane.tsx
    38	  const tok = writerToken(state, surface);
    39	  const live = livenessWord(state);
    40
    41	  const headerParts: string[] = ["ANTIGRAVITY"];
    42	  if (active) headerParts.push("FOCUSED");
    43	  if (writer && tok !== null) {
    44	    headerParts.push("WRITER tok#" + String(tok));
apps/madbridge/src/tui/components/DockStrip.tsx
    84	  } else if (isActiveWriter(state, surface)) {
    85	    const tok = writerToken(state, surface);
    86	    fields.push("WRITER tok#" + String(tok));
apps/madbridge/src/tui/components/EventLog.tsx
    37	          <text fg={POSEIDON.cobalt}>tok:{entry.fencingToken}</text>
```

051-supervisor.log · e166bae6a7e0942df07a930dcc657491710fd2e7e0c4946c253a3d610b1f93f6

```text
packages/supervisor/src/index.ts
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
    12	export { BUILD_STEPS, runTransactionalBuild, runLiveTransactionalBuild, rollbackBuild } from "./build";
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
    23	  LiveBuildInput,
    24	  LiveReattestationInput,
    25	  LiveSurfaceAttester,
    26	  LiveReattestationRecord,
    27	  LiveReattestationResult,
    28	  PartialBuildState,
    29	  RollbackOutcome,
    30	} from "./build";
packages/supervisor/src/build.ts
   146	// Use only build-owned literals in ledger and caller-visible detail.
   147	function liveFailureCause(surface: SurfaceId, reported: unknown): string {
   148	  const shared = ["auth_failed", "identity_mismatch", "attestation_deadline", "attestation_cancelled",
   149	    "attestation_tool_call", "attestation_round_trips", "attestation_budget_exhausted"];
   150	  const specific = surface === "madv-surface"
   151	    ? ["endpoint_refused", "provider_error", "identity_unavailable", "model_refused", "domain_unresolved"]
   152	    : ["attestation_missing", "attestation_malformed", "attestation_duplicate"];
   153	  return shared.find(item => item === reported) ?? specific.find(item => item === reported)
   154	    ?? (surface === "madv-surface" ? "identity_mismatch" : "attestation_malformed");
   155	}
(lines omitted)
   317	      for await (const fact of host.handle.facts()) {
(lines omitted)
   460	  const iterator = host.handle.facts()[Symbol.asyncIterator]();
(lines omitted)
   553	export async function runTransactionalBuild(input: BuildInput): Promise<BuildResult> {
   554	  return executeBuild(publicBuildInput(input), {});
   555	}
   556
   557	export function runLiveTransactionalBuild(input: LiveBuildInput): Promise<BuildResult> {
   558	  return executeBuild(publicBuildInput(input), {}, { signal: input.signal, attesterFor: input.attesterFor });
   559	}
   560
   561	function publicBuildInput(input: BuildInput): BuildInput {
   562	  return input !== null && typeof input === "object"
   563	      ? {
   564	          sessionId: input.sessionId,
   565	          envelope: input.envelope,
   566	          plan: input.plan,
   567	          ...(input.injectFailureAt !== undefined ? { injectFailureAt: input.injectFailureAt } : {}),
   568	        }
   569	      : ({} as BuildInput);
   570	}
(lines omitted)
   638	  const reportFailure = (executionId: string, surface: SurfaceId, reported: unknown) => {
   639	    if (!live || firstFailure) return;
   640	    const cause = liveFailureCause(surface, reported);
   641	    firstFailure = { executionId, surface, cause };
   642	    if (sessionActivatedRow !== null && currentBroker !== null) {
   643	      const reason = cause === "auth_failed" ? "authentication_expired"
   644	        : cause === "provider_error" || cause === "endpoint_refused" ? "adapter_failure" : "identity_mismatch";
   645	      const phase = currentBroker.snapshotProjectionInput().lifecycle.phase;
   646	      if (phase === "active" || phase === "paused") {
   647	        void currentBroker.interrupt(reason, surface + ": " + cause, "high", sources.nextEventId(), null, executionId)
   648	          .catch(() => { for (const host of hosts) host.handle.closeStdin(); });
   649	      }
   650	    }
   651	    if (attesting && sessionActivatedRow === null) {
   652	      // A silent host's fact reader can be parked in next(). Start the normal
   653	      // rollback now so it can settle while the attester closes its reader.
   654	      unwindState = snapshotPartialState();
   655	      void rollbackBuild(unwindState).catch(() => { /* The caller joins this same rollback. */ });
   656	    }
   657	    stopAttesters.abort();
   658	  };
(lines omitted)
   706	  const failAt = (
   707	    step: BuildStep,
   708	    failure: BuildFailureCode,
   709	    executionIds: readonly string[] = [],
   710	  ): BuildResult => {
   711	    // Freeze the primary failure before cancelling any other observer.
   712	    const first = firstFailure;
   713	    const detail = first
   714	      ? formatFailureDetail("reattest", "reattestation_failed", [first.executionId]) +
   715	        " surface=" + first.surface + " cause=" + first.cause
   716	      : formatFailureDetail(step, failure, executionIds);
   717	    if (live) stopAttesters.abort();
   718	    return Object.freeze({
   719	      ok: false as const, failedStep: first ? "reattest" : step,
   720	      failure: first ? "reattestation_failed" : failure, detail, partialState: unwindState ?? snapshotPartialState(),
   721	    });
   722	  };
(lines omitted)
   730	    if (firstFailure) return failAt("reattest", "reattestation_failed");
(lines omitted)
  1032	            if (firstFailure) return failAt(step, "reattestation_failed", currentExecutionIds);
(lines omitted)
  1122	          const { state: beforeState, head: beforeHead } = replayLedgerState(ledger);
  1123	          const beforeSnapshot = await client.getSnapshot();
  1124	          // No await separates this last monitor check from durable activation.
  1125	          if (firstFailure) return failAt("reattest", "reattestation_failed");
```

052-monitors.log · 0951dbd36a595fe1d5c59349536a9f507a4dd5a33dce3142cbdd3329de26d152

```text
packages/adapter-claude-code/src/live.ts
    65	  finish(): Cause | undefined {
    66	    try {
    67	      this.tail += this.decoder.decode();
    68	      if (this.tail.length) return this.event(JSON.parse(this.tail));
    69	    } catch { return "attestation_malformed"; }
    70	  }
(lines omitted)
   154	  async function consume(): Promise<void> {
   155	    try {
   156	      for await (const fact of input.host.handle.facts()) {
   157	        if (failed) break;
   158	        if (!reader.complete && performance.now() >= deadline) { stop("attestation_deadline"); break; }
   159	        if (fact.kind === "output" && fact.bytes) {
   160	          const cause = reader.push(fact.bytes);
   161	          if (cause) stop(cause);
   162	        } else if (fact.kind === "exited" || fact.kind === "drained") {
   163	          stop(reader.finish() ?? "attestation_missing");
   164	        }
   165	        if (failed) break;
   166	      }
   167	      if (!failed) stop(reader.finish() ?? "attestation_missing");
   168	    } catch { stop("attestation_malformed"); }
   169	    finally {
   170	      clearTimeout(timer);
   171	      input.signal.removeEventListener("abort", abort);
   172	      const cause = failed ?? "attestation_missing";
   173	      resolve({ ok: false, surface: "claude-code", cause, reason: cause });
   174	    }
   175	  }
   176	  input.signal.addEventListener("abort", abort, { once: true });
   177	  void consume();
packages/adapter-madv-surface/src/live.ts
    44	    onAttested(version) {
    45	      if (performance.now() >= deadline) { stop("attestation_deadline"); return; }
    46	      clearTimeout(timer);
    47	      ready = true;
    48	      resolve({ ok: true, evidenceKind: "actual_session", provider: input.registration.provider,
    49	        model: input.model, cliVersion: version, sendUserInput });
    50	    },
(lines omitted)
    68	  async function consume(): Promise<void> {
    69	    try {
    70	      for await (const fact of input.host.handle.facts()) {
    71	        if (failure) break;
    72	        if (!ready && performance.now() >= deadline) { stop("attestation_deadline"); break; }
    73	        if (fact.kind === "output" && fact.bytes) inspect(parser.push(fact.bytes));
    74	        if (fact.kind === "exited") {
    75	          const exitCode = fact.code ?? 1;
    76	          const result = parser.finish(exitCode, fact.signal ?? null);
    77	          const detection = detectMadvFailure(input.registration.auth_failure_detection, { kind: "child_exit", exitCode });
    78	          if (detection && !parser.attestationFailure) stop(detection.cause, detection.reason);
    79	          else inspect(result);
    80	          break;
    81	        }
    82	        if (failure) break;
    83	      }
    84	      if (!failure) inspect(parser.finish(0));
    85	    } catch { stop("identity_mismatch", "malformed_stream"); }
    86	    finally {
    87	      closed = true;
    88	      clearTimeout(timer);
    89	      input.signal.removeEventListener("abort", abort);
    90	      if (failure) resolve(failure);
    91	      else if (!ready) resolve({ ok: false, surface: "madv-surface", cause: "identity_unavailable",
    92	        reason: "identity_unavailable", parserReason: "result_missing" });
    93	    }
    94	  }
    95	  input.signal.addEventListener("abort", abort, { once: true });
    96	  void consume();
packages/adapter-madv-surface/src/index.ts
   217	  finish(exitCode: number, signal: string | number | null = null): MadvResult {
   218	    if (!this.finished) {
   219	      try { this.buffer += this.decoder.decode(); } catch { this.fail("identity_mismatch", "malformed_stream"); }
   220	      if (this.buffer.trim()) this.line(this.buffer);
   221	      this.buffer = ""; this.checkDeadline(); this.finished = true;
   222	      if (signal !== null) this.fail("provider_error", "signal");
   223	      switch (exitCode) {
   224	        case 0: break;
   225	        case 5: this.fail("auth_failed", "exit"); break;
   226	        case 6: this.fail("endpoint_refused", "exit"); break;
   227	        case 1: this.fail("provider_error", "exit"); break;
   228	        case 3: this.fail("identity_unavailable", "exit"); break;
   229	        case 7: if (this.failed?.cause !== "domain_unresolved") this.fail("model_refused", "exit"); break;
   230	        case 4: this.fail("identity_mismatch", "exit"); break;
   231	        default: this.fail("provider_error", "unknown_exit");
   232	      }
   233	      if (!this.failed && (this.responses === 0 || this.waitingForEvidence)) this.fail("identity_unavailable", "model_response_missing");
   234	      if (!this.failed && this.context.onAttested && !this.attested) this.fail("identity_unavailable", "result_missing");
   235	      if (!this.failed && this.tools.size !== 0) this.fail("identity_mismatch", "event_order");
   236	    }
   237	    return this.snapshot();
   238	  }
packages/protocol/src/lifecycle-events.ts
    35	/** The twelve interruption reason codes, in specification order. */
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
    50
    51	export type InterruptionReasonCodeV1 = typeof INTERRUPTION_REASON_CODES[number];
packages/broker/src/runtime-broker.ts
   330	  async interrupt(
   331	    reason: InterruptionReasonCodeV1,
   332	    detail: string,
   333	    severity: InterruptionSeverity,
   334	    incidentId: string,
   335	    sourceEventId: string | null,
   336	    reportedBy: string | null,
   337	  ): Promise<void> {
   338	    this.persist(
   339	      this.record(
   340	        "session_interrupted",
   341	        {
   342	          incident_id: incidentId,
   343	          reason: detail,
   344	          severity,
   345	          source_event_id: sourceEventId,
   346	          reported_by_execution_id: reportedBy,
   347	        },
   348	        reason,
   349	      ),
   350	    );
   351	    this.persist(invalidateToken(this.state, "interruption", incidentId, this.fencingContext()));
   352	    const terminal = { closure_kind: "interruption", incident_id: incidentId, reason_code: reason } as const;
   353	    this.persist(this.record("session_closing", terminal, reason));
   354	    await this.deps.terminateGovernedProcesses();
   355	    this.persist(this.record("session_closed", terminal, reason));
   356	  }
(lines omitted)
   364	  async founderClose(commandId: string): Promise<void> {
   365	    const terminal = {
   366	      command_id: commandId,
   367	      authorized_by: "founder",
   368	      closure_kind: "founder",
   369	      incident_id: null,
   370	    } as const;
   371	    this.persist(this.record("session_closing", terminal, null));
   372	    this.persist(invalidateToken(this.state, "founder_close", null, this.fencingContext()));
   373	    await this.deps.terminateGovernedProcesses();
   374	    this.persist(this.record("session_closed", terminal, null));
   375	  }
```

053-composition.log · 874a35195f2d0fc6f9baa379152bba7aef3f441c1acd13be8f2f1c2e8e471599

```text
apps/madbridge/src/tui/live/composition.ts
     1	import type { BrokerClient } from "@madventures/broker";
     2	import { parseTaskEnvelope, type TaskEnvelopeV1 } from "@madventures/protocol";
     3	import { attestClaudeSession } from "@madventures/adapter-claude-code";
     4	import { attestMadvSession } from "../../../../../packages/adapter-madv-surface/src/index";
     5	import { rollbackBuild, runLiveTransactionalBuild, runPurePreflight, type LiveBuildInput,
     6	  type PartialBuildState, type PreflightInput } from "../../../../../packages/supervisor/src/index";
     7	import { settingsSources } from "./settings-sources";
     8
     9	interface Start {
    10	  envelope: TaskEnvelopeV1;
    11	  preflight: Omit<PreflightInput, "envelope" | "settingsSources">;
    12	  workingDirectory: string;
    13	  configFolder: string;
    14	  managedFolder?: string;
    15	  present(client: BrokerClient): void | Promise<void>;
    16	}
    17	type Result = { exitCode: 0; close(): Promise<void> } | { exitCode: 1; component: string; detail: string };
    18
    19	function failed(component: string, detail: string = component): Result {
    20	  return { exitCode: 1, component, detail };
    21	}
    22
    23	// The registered identity and auth probes have both passed when the build
    24	// asks for an attester. Count each subsequent write before sending its frame.
    25	function writeBudget(): () => boolean {
    26	  let calls = 2;
    27	  return () => {
    28	    if (calls >= 3) return false;
    29	    calls++;
    30	    return true;
    31	  };
    32	}
    33
    34	export function createStartAttesters(): LiveBuildInput["attesterFor"] {
    35	  const claudeBudget = writeBudget(), madvBudget = writeBudget();
    36	  return surface => {
    37	    if (surface === "claude-code") return input => attestClaudeSession(input, claudeBudget);
    38	    if (surface === "madv-surface") return input => attestMadvSession(input, madvBudget);
    39	    return undefined;
    40	  };
    41	}
    42
    43	async function closeActive(state: PartialBuildState): Promise<void> {
    44	  const phase = (await state.client!.getSnapshot()).phase;
    45	  if (phase === "active" || phase === "paused") await state.broker!.founderClose(crypto.randomUUID());
    46	  for (const host of state.hosts) {
    47	    for await (const _ of host.handle.facts()) { /* Wait for host exit before releasing the ledger. */ }
    48	  }
    49	  for (const adapter of state.adapters) await adapter.disconnect();
    50	  await state.client!.close();
    51	  state.ledger!.close();
    52	}
    53
    54	export async function composeLiveSession(start: Start): Promise<Result> {
    55	  const sources = settingsSources(start.workingDirectory, start.configFolder, start.managedFolder, process.platform);
    56	  if (!sources.ok) return failed(sources.cause);
    57	  let envelope: TaskEnvelopeV1;
    58	  try { envelope = parseTaskEnvelope(structuredClone({ ...start.envelope })); }
    59	  catch { return failed("preflight", "envelope_invalid"); }
    60	  const controller = new AbortController();
    61	  const abort = () => controller.abort();
    62	  const caller = start.preflight.signal;
    63	  caller.addEventListener("abort", abort, { once: true });
    64	  process.once("SIGINT", abort);
    65	  process.once("SIGTERM", abort);
    66	  if (caller.aborted) abort();
    67
    68	  try {
    69	    const preflight = await runPurePreflight({ ...start.preflight, envelope: { ...envelope },
    70	      settingsSources: sources.paths, signal: controller.signal });
    71	    if (!preflight.ok) return failed("preflight", preflight.failure);
    72	    const built = await runLiveTransactionalBuild({ sessionId: crypto.randomUUID(), envelope, plan: preflight.plan,
    73	      signal: controller.signal, attesterFor: createStartAttesters() });
    74	    if (!built.ok) {
    75	      await rollbackBuild(built.partialState);
    76	      return failed(built.failedStep, built.detail);
    77	    }
    78	    let closing: Promise<void> | undefined;
    79	    const close = () => closing ??= closeActive(built.state);
    80	    if (!built.state.client || built.snapshot.phase !== "active") {
    81	      await close();
    82	      return failed("activate");
    83	    }
    84	    try { await start.present(built.state.client); }
    85	    catch { await close(); return failed("present"); }
    86	    return { exitCode: 0, close };
    87	  } finally {
    88	    caller.removeEventListener("abort", abort);
    89	    process.removeListener("SIGINT", abort);
    90	    process.removeListener("SIGTERM", abort);
    91	  }
    92	}
```

054-separation-scans.log · 1a6ae3751ea9b30dddae74181d52f902e32dc813ddef02f24830531c3fc6f0f9

```text
test/phase3a/harness-separation.test.ts
    16	const ROUTER_IMPORTER = "apps/madbridge/test/pty-focus.test.tsx";
(lines omitted)
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
    30	    sha256: "50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d", call: "host.handle.facts()[Symbol.asyncIterator]()",
    31	  },
    32	};
apps/madbridge/test/tui-writers-stage.test.tsx
   968	describe("12. No new timer, animation, or timeline imports exist under src/tui/", () => {
   969	  function listSourceFiles(dir: string): string[] {
   970	    if (!existsSync(dir)) return [];
   971	    const results: string[] = [];
   972	    for (const entry of readdirSync(dir, { withFileTypes: true })) {
   973	      const fullPath = join(dir, entry.name);
   974	      if (entry.isDirectory()) {
   975	        results.push(...listSourceFiles(fullPath));
   976	      } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
   977	        results.push(fullPath);
   978	      }
   979	    }
   980	    return results;
   981	  }
   982
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
  1009	  });
  1010	});
apps/madbridge/test/tui-governance-surfaces.test.tsx
   974	  test("43. No timer, animation, spinner, or timeline mechanism is introduced", () => {
   975	    // Re-use the Phase 1 static-source scan. This test fails if any forbidden
   976	    // timer/animation mechanism is added under src/tui/.
   977	    const { existsSync, readFileSync, readdirSync } = require("node:fs");
   978	    const { join } = require("node:path");
   979	    function listSourceFiles(dir: string): string[] {
   980	      if (!existsSync(dir)) return [];
   981	      const results: string[] = [];
   982	      for (const entry of readdirSync(dir, { withFileTypes: true })) {
   983	        const fullPath = join(dir, entry.name);
   984	        if (entry.isDirectory()) {
   985	          results.push(...listSourceFiles(fullPath));
   986	        } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
   987	          results.push(fullPath);
   988	        }
   989	      }
   990	      return results;
   991	    }
   992	    const tuiDir = join(process.cwd(), "apps/madbridge/src/tui");
   993	    const files = listSourceFiles(tuiDir);
   994	    expect(files.length).toBeGreaterThan(0);
   995	    const forbidden = [
   996	      /\bsetTimeout\b/,
   997	      /\bsetInterval\b/,
   998	      /\brequestAnimationFrame\b/,
   999	      /\bclearTimeout\b/,
  1000	      /\bclearInterval\b/,
  1001	      /from\s+["'].*spinner/i,
  1002	      /from\s+["'].*animate/i,
  1003	      /from\s+["'].*marquee/i,
  1004	    ];
  1005	    for (const file of files) {
  1006	      const source = readFileSync(file, "utf8");
  1007	      for (const pattern of forbidden) {
  1008	        if (pattern.test(source)) {
  1009	          throw new Error(`Forbidden pattern ${String(pattern)} found in ${file}`);
  1010	        }
  1011	      }
  1012	    }
  1013	  });
test/phase3a/architecture-phase3a.test.ts
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
   561	          REGISTERED_SURFACE_IDS.has((unwrapped as ts.StringLiteralLike).text)
   562	        );
   563	      });
   564	      if (carriesRegisteredSurface) {
   565	        const start = node.getStart(sourceFile);
   566	        lineNumbers.push(sourceFile.getLineAndCharacterOfPosition(start).line + 1);
   567	      }
   568	    }
   569	    node.forEachChild(visit);
   570	  };
   571	  visit(sourceFile);
   572	  return lineNumbers;
   573	}
   574
   575	/**
   576	 * Scan production source under a repository root for surface-admission
   577	 * collections outside the sanctioned adapter registry, excluding the
   578	 * untouched packages/policy/ package. Detection is the union of two
   579	 * strategies: the legacy identifier-name pattern (KNOWN_SURFACES,
   580	 * allowedSurfaces, SUPPORTED_SURFACES) and syntax-aware detection of any
   581	 * collection carrying a registered SurfaceId value — by initializer or by
   582	 * mutable write — whatever its name. Fails closed if packages/ or apps/ is
   583	 * absent.
   584	 */
   585	function scanAdmissionSources(root: string): AdmissionViolation[] {
   586	  if (!existsSync(join(root, "packages")) || !existsSync(join(root, "apps"))) {
   587	    throw new Error(
   588	      `Phase 3A admission-source scan: required packages/ and apps/ roots not found under ${root}`,
   589	    );
   590	  }
   591	  const violations: AdmissionViolation[] = [];
   592	  for (const file of enumerateProductionFiles(root)) {
   593	    const rel = toPortablePath(relative(root, file));
   594	    if (rel === ADAPTER_REGISTRY_PATH) continue;
   595	    if (rel.startsWith("packages/policy/")) continue;
   596
   597	    const sourceText = readFileSync(file, "utf8");
   598	    const lines = sourceText.split(/\r?\n/);
   599	    const flaggedLines = new Set<number>();
   600	    lines.forEach((lineText, idx) => {
   601	      if (ADMISSION_LIST_PATTERN.test(lineText)) {
   602	        flaggedLines.add(idx + 1);
   603	      }
   604	    });
   605	    for (const lineNumber of findRegisteredSurfaceCollectionsInSource(sourceText, rel)) {
   606	      flaggedLines.add(lineNumber);
   607	    }
   608
   609	    for (const lineNumber of [...flaggedLines].sort((a, b) => a - b)) {
   610	      violations.push({ file: rel, line: lineNumber, text: lines[lineNumber - 1]!.trim() });
   611	    }
   612	  }
   613	  return violations.sort((a, b) =>
   614	    a.file === b.file ? a.line - b.line : a.file < b.file ? -1 : 1,
   615	  );
   616	}
   617
   618	describe("Phase 3A admission authority", () => {
   619	  test("adapter-registry.ts is the only production admission source", () => {
   620	    const violations = scanAdmissionSources(REPO_ROOT);
   621	    expect(violations.map(reportAdmission)).toEqual([]);
   622	  });
(lines omitted)
  1780	describe("Task 34: no broker.sock path is reachable", () => {
  1781	  // 15s test budget: the plan's 5,000 ms deadline belongs to EACH child,
  1782	  // and this test launches two children in sequence (CLI + TUI).
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
  1802	  }, 15_000);
(lines omitted)
  2562	  test("merge gate item 15: no production or harness path creates broker.sock", async () => {
  2563	    // The dormant socket module, the only code that binds broker.sock, has
  2564	    // no production or harness importer.
  2565	    expect(findModuleSpecifierImporters(REPO_ROOT, "socket")).toEqual(["packages/broker/test/socket.test.ts"]);
  2566
  2567	    // Both production entry points, in bounded isolated processes, create no
  2568	    // broker.sock at the legacy path or under MADV_RUNTIME_DIR.
  2569	    await runEntryPath({ args: [CLI_ENTRY, "start", "--json"], assertOutcome: assertCliOutcome });
  2570	    await runEntryPath({
  2571	      args: ["apps/madbridge/src/tui/main.tsx"],
  2572	      readiness: TUI_READY,
  2573	      assertOutcome: (r) => expect(tuiPathFailures(r)).toEqual([]),
  2574	    });
  2575
  2576	    // A fixture session through the test-only harness creates none under its
  2577	    // own storage, the legacy root or the worktree, while active or after close.
  2578	    const sockets = (fixtureRoot: string): string[] =>
  2579	      [fixtureRoot, dirname(LEGACY_SOCKET), REPO_ROOT].flatMap((root) => {
  2580	        const result = sweep(root);
  2581	        expect(result.errors, "broker.sock sweep errors under " + root).toEqual([]);
  2582	        return result.matches;
  2583	      });
  2584	    const session = await mergeGateHarness.startFixtureSession();
  2585	    const fixtureRoot = dirname(session.storage.root);
  2586	    let whileActive: string[] = [];
  2587	    try {
  2588	      expect((await session.client.getSnapshot()).phase).toBe("active");
  2589	      whileActive = sockets(fixtureRoot);
  2590	    } finally {
  2591	      await session.close();
  2592	    }
  2593	    expect({ whileActive, afterClose: sockets(fixtureRoot), fixtureRootRemoved: !existsSync(fixtureRoot) }).toEqual({
  2594	      whileActive: [],
  2595	      afterClose: [],
  2596	      fixtureRootRemoved: true,
  2597	    });
  2598	  }, 30_000);
test/phase3b/separation.test.ts
     1	import { expect, test } from "bun:test";
     2	import { readdirSync, readFileSync } from "node:fs";
     3	import { join } from "node:path";
     4	import ts from "typescript";
     5	import { runTransactionalBuild } from "../../packages/supervisor/src/index";
     6	import { closeOfflineBuild, offlineStart } from "./offline";
     7
     8	const apps = join(import.meta.dir, "../../apps");
     9	const seams = new Set(["runTransactionalBuildWithDependencies", "runPurePreflightWithDependencies"]);
    10	const internalModule = /(?:^|\/)supervisor\/src\/(?:build|preflight)(?:\.[cm]?[jt]s)?$/;
    11
    12	function* appSources(directory: string): Generator<string> {
    13	  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    14	    const path = join(directory, entry.name);
    15	    if (entry.isDirectory() && entry.name !== "node_modules") yield* appSources(path);
    16	    if (entry.isFile() && /\.[cm]?[jt]sx?$/.test(entry.name)) yield path;
    17	  }
    18	}
    19
    20	function usesSeam(node: ts.Node): boolean {
    21	  if (ts.isImportSpecifier(node) || ts.isExportSpecifier(node)) {
    22	    return seams.has((node.propertyName ?? node.name).text);
    23	  }
    24	  if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)
    25	      && internalModule.test(node.moduleSpecifier.text) && node.importClause?.namedBindings
    26	      && ts.isNamespaceImport(node.importClause.namedBindings)) return true;
    27	  if (ts.isExportDeclaration(node) && !node.exportClause && node.moduleSpecifier
    28	      && ts.isStringLiteral(node.moduleSpecifier) && internalModule.test(node.moduleSpecifier.text)) return true;
    29	  if (ts.isPropertyAccessExpression(node) && seams.has(node.name.text)) return true;
    30	  if (ts.isElementAccessExpression(node) && ts.isStringLiteral(node.argumentExpression)
    31	      && seams.has(node.argumentExpression.text)) return true;
    32	  if (ts.isBindingElement(node)) {
    33	    const key = node.propertyName ?? node.name;
    34	    if ((ts.isIdentifier(key) || ts.isStringLiteral(key)) && seams.has(key.text)) return true;
    35	  }
    36	  return ts.forEachChild(node, child => usesSeam(child) || undefined) === true;
    37	}
    38
    39	test("application code imports neither internal supervisor seam", () => {
    40	  const imports: string[] = [];
    41	  for (const path of appSources(apps)) {
    42	    const text = readFileSync(path, "utf8");
    43	    if (!text.includes("WithDependencies") && !text.includes("supervisor/src/")) continue;
    44	    if (usesSeam(ts.createSourceFile(path, text, ts.ScriptTarget.Latest))) imports.push(path);
    45	  }
    46	  expect(imports).toEqual([]);
    47	});
    48
    49	test("the original public build still fails closed without an attester", async () => {
    50	  const fixture = offlineStart();
    51	  try {
    52	    const result = await runTransactionalBuild({
    53	      sessionId: "offline-no-attester", envelope: fixture.envelope, plan: fixture.plan,
    54	    });
    55	    try {
    56	      expect(result.ok).toBe(false);
    57	      if (!result.ok) {
    58	        expect(result.failedStep).toBe("reattest");
    59	        expect(result.failure).toBe("reattestation_failed");
    60	        expect(result.detail).toBe("step=reattest execution=builder failure=reattestation_failed");
    61	        expect(result.partialState.completedSteps).not.toContain("activate");
    62	      }
    63	    } finally { await closeOfflineBuild(result); }
    64	  } finally { fixture.dispose(); }
    65	}, 15000);
```

055-existing-tests.log · 050ffde93f8aef58155d3ab9023a42063bf92106c2b4b8c23f2d05ca377ee5da

```text
packages/supervisor/test/build-rollback.test.ts
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
packages/adapter-madv-surface/test/live.test.ts
    37	test("madv encodes no_tools only on the attestation message", async () => {
    38	  const message = "synthetic";
    39	  expect(encodeUserInput(message)).toBe('{"type":"user","message":{"role":"user","content":"synthetic"}}\n');
    40	  expect(encodeAttestationInput(message)).toBe('{"type":"user","message":{"role":"user","content":"synthetic"},"no_tools":true}\n');
    41	  const { wire, verdict } = start();
    42	  expect(wire.opened).toBe(1);
    43	  expect(wire.writes).toEqual(['{"type":"user","message":{"role":"user","content":"Reply with your model identifier and nothing else."},"no_tools":true}\n']);
    44	  wire.events(...approved);
    45	  const answer = await verdict;
    46	  expect(answer.ok).toBe(true);
    47	  if (answer.ok) expect(answer.sendUserInput(message)).toBe(true);
    48	  expect(wire.writes[1]).toBe(encodeUserInput(message));
    49	  wire.events(response, assistant, result);
    50	  wire.end();
    51	  while (!wire.closed) await Bun.sleep(1);
    52	  expect(wire.failures).toEqual([]);
    53	});
test/phase3a/runtime-harness.ts
   318	  // A private disposable home child also satisfies the shared-/tmp exclusion on Linux.
   319	  const root = mkdtempSync(join(realpathSync(user.homedir), ".madbridge-task48-"));
(lines omitted)
   682	      if (options.processScenario === "lifeline-eof" || options.processScenario === "host-exit") {
   683	        if (options.processScenario === "host-exit") {
   684	          faultWork = (async () => {
   685	            for await (const _ of state!.hosts[0]!.handle.facts()) { /* observe the actual host stream ending */ }
   686	            clearTimeout(faultTimer);
   687	            if (closing === undefined) await interrupt("pty_host_failure");
   688	          })();
   689	          void faultWork.catch(() => {}); // close propagates monitoring failures after cleanup.
   690	        }
```

064-reader-lines.log · d2e7f11912de76a45d6f564c49540a0a41e9595cbbc347f865e4ad6c82ae7f0a

```text
HEAD:apps/madbridge/src/tui/App.tsx:132:  const { state, connected } = useBrokerState(subscribe);
HEAD:apps/madbridge/src/tui/App.tsx:488:      <StatusBar state={state} connected={connected} focus={ui.focus} seat={ui.seat} />
HEAD:apps/madbridge/src/tui/components/DockStrip.tsx:57:// disconnected) and is rendered at priority 3 so the user always sees the
HEAD:apps/madbridge/src/tui/components/DockStrip.tsx:58:// disconnected word before role/model.
HEAD:apps/madbridge/src/tui/components/DockStrip.tsx:80:    // No current-writer claim while not live (disconnected, interrupted,
HEAD:apps/madbridge/src/tui/components/EventLog.tsx:37:          <text fg={POSEIDON.cobalt}>tok:{entry.fencingToken}</text>
HEAD:apps/madbridge/src/tui/components/IncidentBand.tsx:49:  const token = state?.fencingToken ?? 0;
HEAD:apps/madbridge/src/tui/components/ModelBar.tsx:7://   - It is NOT a claim about what any broker-connected agent is running —
HEAD:apps/madbridge/src/tui/components/RoomStatusBand.tsx:40:      {projection.executions.map((execution) => (
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:30:  connected: boolean;
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:39:export function StatusBar({ state, connected, focus, seat, widthOverride }: Props) {
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:44:    connected,
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:71:  connected: boolean;
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:106:  const connToken = input.connected ? "CONNECTED" : "NOT CONNECTED";
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:132:  const connCompact = input.connected ? "CONN" : "NOCONN";
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:338: * Fencing tokens are 1-based. When fencingToken <= 0, no token has been
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:348:  const o = state.ownershipState;
HEAD:apps/madbridge/src/tui/components/StatusBar.tsx:350:  const tok = state.fencingToken;
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:53:  const found = state.executions?.find((e) => e.surface === surface);
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:83: * Truthfulness: a writer claim is only valid while the session is connected
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:85: *   - `connected === false` → no current writer (retained data is historical)
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:99:  if (!state.connected) return false;
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:113:  return state!.fencingToken;
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:119: * - connected AND active AND no incident → "LIVE"
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:122: * - connected === false                  → "STREAM ENDED"
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:131:  if (!state.connected) return "STREAM ENDED";
HEAD:apps/madbridge/src/tui/hooks/useBrokerState.ts:12:  readonly connected: boolean;
HEAD:apps/madbridge/src/tui/hooks/useBrokerState.ts:24:  const [connected, setConnected] = useState(false);
HEAD:apps/madbridge/src/tui/hooks/useBrokerState.ts:35:      setConnected(snapshot.connected);
HEAD:apps/madbridge/src/tui/hooks/useBrokerState.ts:55:  return { state, connected, subscribe };
HEAD:apps/madbridge/src/tui/hooks/useSeatState.ts:12://     is NOT a claim about what any broker-connected agent is running (the
HEAD:apps/madbridge/src/tui/main.tsx:59:    executions: [claude, antigravity],
HEAD:apps/madbridge/src/tui/main.tsx:82:    connected: true,
HEAD:apps/madbridge/src/tui/main.tsx:84:    ownershipState: "owned",
HEAD:apps/madbridge/src/tui/main.tsx:86:    fencingToken: 3,
HEAD:apps/madbridge/src/tui/main.tsx:88:    executions: [claude, antigravity],
HEAD:apps/madbridge/src/tui/main.tsx:91:    pendingTransfers: [],
HEAD:apps/madbridge/src/tui/main.tsx:92:    permissionSummary: {
HEAD:apps/madbridge/src/tui/main.tsx:113:        fencingToken: 1,
HEAD:apps/madbridge/src/tui/main.tsx:121:        fencingToken: 1,
HEAD:apps/madbridge/src/tui/main.tsx:129:        fencingToken: 3,
HEAD:apps/madbridge/src/tui/main.tsx:134:    queueDepth: 0,
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:46:    // No current-writer claim while not live (disconnected, interrupted,
HEAD:apps/madbridge/src/tui/panes/ClaudePane.tsx:45:    // No current-writer claim while not live (disconnected, interrupted,
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:7://   - Disconnected shows "GOVERNANCE | NOT CONNECTED" and does not project
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:51:  if (!state || !state.connected) {
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:61:  const cl = state.executions?.find((e) => e.surface === "claude-code");
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:62:  const agy = state.executions?.find((e) => e.surface === "antigravity");
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:63:  const perms = state.permissionSummary;
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:66:  const transfer = state.pendingTransfers?.[0] ?? null;
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:82:  rows.push("Writer: " + (state.activeWriter ?? "—") + " | Token: " + String(state.fencingToken) + " | Ownership: " + state.ownershipState);
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:85:  rows.push("Transfer phase: " + (state.transferPhase ?? "none") + " | Pending transfers: " + String(state.pendingTransfers?.length ?? 0));
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:87:    rows.push("Transfer: " + transfer.from + " → " + transfer.to + " | tok#" + String(transfer.fencingToken) + " | " + transfer.reason);
HEAD:apps/madbridge/src/tui/room/client.ts:201:    if (this.socket !== null) throw new RoomAttachError("already_connected", "connect() called twice");
HEAD:apps/madbridge/src/tui/room/client.ts:372:      return Promise.reject(new RoomAttachError("not_connected", "connect() before requesting"));
HEAD:apps/madbridge/src/tui/room/projection.ts:77:  readonly executions: readonly RoomExecutionFact[];
HEAD:apps/madbridge/src/tui/room/projection.ts:100:    executions: snapshot.executions,
HEAD:apps/madbridge/src/tui/room/projection.ts:106:  return snapshot.executions.some((execution) => execution.state === "RUNNING");
HEAD:apps/madbridge/src/tui/room/projection.ts:110:  return snapshot.executions.some((execution) => execution.state === "EXITED" || execution.state === "FAILED_CLOSED");
HEAD:apps/madbridge/src/tui/types.ts:94:  readonly connected: boolean;
HEAD:apps/madbridge/src/tui/types.ts:103:  readonly ownershipState:
HEAD:apps/madbridge/src/tui/types.ts:111:  readonly fencingToken: number;
HEAD:apps/madbridge/src/tui/types.ts:113:  readonly executions: readonly ExecutionIdentity[];
HEAD:apps/madbridge/src/tui/types.ts:116:  readonly pendingTransfers: readonly PendingTransfer[];
HEAD:apps/madbridge/src/tui/types.ts:117:  readonly permissionSummary: PermissionSummary;
HEAD:apps/madbridge/src/tui/types.ts:123:  readonly queueDepth: number;
HEAD:apps/madbridge/src/tui/types.ts:142:  readonly fencingToken: number;
HEAD:apps/madbridge/src/tui/types.ts:179:  readonly fencingToken: number;
```

4. The following import inventory includes relative imports resolved from their source directories. No application code outside the live directory imports the supervisor or calls the composition. The final two hashes verify the build.ts and pty-focus.test.tsx pins.

077-imports-at-base.log · 825f0aef19473118e44934a836df3381e0f0532c47031252032ddf62f0af5b0f

```text
apps/madbridge/src/tui/live/composition.ts:6: type PartialBuildState, type PreflightInput } from "../../../../../packages/supervisor/src/index";
apps/madbridge/src/tui/live/composition.ts:7: import { settingsSources } from "./settings-sources";
apps/madbridge/src/tui/live/settings-sources.ts:3: import { managedSettingsDirectory } from "./managed-settings";
packages/supervisor/test/build-rollback.test.ts:34: import * as supervisorIndex from "../src/index";
packages/supervisor/test/live-port.test.ts:2: import { runLiveTransactionalBuild, type LiveReattestationInput } from "../src/index";
test/phase3b/offline.ts:5: import { rollbackBuild, type BuildResult, type LaunchPlan } from "../../packages/supervisor/src/index";
test/phase3b/preflight-input.ts:5: import type { PreflightInput } from "../../packages/supervisor/src/index";
test/phase3b/scenarios.ts:4: import { composeLiveSession, createStartAttesters } from "../../apps/madbridge/src/tui/live/composition";
test/phase3b/scenarios.ts:5: import { runPurePreflight, runLiveTransactionalBuild } from "../../packages/supervisor/src/index";
test/phase3b/separation.test.ts:5: import { runTransactionalBuild } from "../../packages/supervisor/src/index";
test/phase3b/settings-sources.test.ts:4: import { managedSettingsDirectory } from "../../apps/madbridge/src/tui/live/managed-settings";
test/phase3b/settings-sources.test.ts:5: import { settingsSources } from "../../apps/madbridge/src/tui/live/settings-sources";
HEAD:apps/madbridge/src/tui/live/composition.ts:54:export async function composeLiveSession(start: Start): Promise<Result> {
HEAD:test/phase3b/scenarios.ts:4:import { composeLiveSession, createStartAttesters } from "../../apps/madbridge/src/tui/live/composition";
HEAD:test/phase3b/scenarios.ts:58:      outcome = await composeLiveSession({ envelope: f.envelope, preflight: { ...f.input, signal: controller.signal },
HEAD:test/phase3b/scenarios.ts:124:    const starting = composeLiveSession({
50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d  -
2faefe54d7c9be2051bce621629203072515263d58bc69b31bd2fe927faedb01  -
Darwin arm64
a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock
```

5. The host reported Darwin arm64. The Bun runtime checks follow.

007-runtime.log · 41a8d908b63d68298ae92171a43c21f718e2625c92234db7aac6d750a9bf51fb

```text
Thu Nov 26 03:49:54 UTC 2026
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
Thu Nov 26 03:49:54 UTC 2026
```

079-baseline-runtime.log · fd3e50fb92bc6e959e792f4d30d6f381eb6e60885c96fc1ecbe41d6724f214bd

```text
Thu Nov 26 04:30:17 UTC 2026
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
Thu Nov 26 04:30:17 UTC 2026
```

083-baseline-suite-runtime.log · f19afc9afa8084b72b01fe555f241fc5f2fe827c1409adafd79e1f1e335df7f8

```text
Thu Nov 26 04:36:03 UTC 2026
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
Thu Nov 26 04:36:03 UTC 2026
```

6. Baseline measurements follow. The frozen install restored dependencies. Its sole tracked mode change was restored after a blob-identity check in log 081. The lockfile had SHA-256 a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830 both before and after install. The worktree was clean and the compiler emitted no diagnostics.

080-baseline-install.log · dfff58d8e669af6ddb43bb7585517432ec325ac4b2b558ce8e850d296eb4652f

```text
Thu Nov 26 04:31:56 UTC 2026
bun install v1.4.2 (744846f84)

+ @types/bun@1.4.2
+ @types/react@19.3.0
+ @types/react-test-renderer@19.3.0
+ react-test-renderer@19.3.0
+ @opentui/core@0.5.11
+ @opentui/react@0.5.11
+ react@19.3.0
+ typescript@5.9.3

51 packages installed [155.00ms]
Thu Nov 26 04:31:56 UTC 2026
```

082-baseline-tsc.log · 98de6eca7f8645dc86596d7107a79a973a2301fc903fa5116d1f1bb63ba3ae5a

```text
Thu Nov 26 04:34:01 UTC 2026
Thu Nov 26 04:34:04 UTC 2026
```

084-baseline-load.log · 7c4a9a92625a22a6ea7d89505faf4b48f26452bb3df3002191a151e707778a98

```text
23:36  1 user, load averages: 2.98 3.75 3.54
23:36  1 user, load averages: 2.46 3.57 3.48
23:37  1 user, load averages: 2.46 3.45 3.44
23:37  1 user, load averages: 2.03 3.25 3.37
23:38  1 user, load averages: 1.81 3.08 3.30
```

094-baseline-suite.log · 192ad8a8e6e530f6da923a659d6c35709f0249fb262bb9e4d607c44dd08d03be

```text
Thu Nov 26 04:40:54 UTC 2026
(lines omitted)
 2089 pass
 0 fail
 28015 expect() calls
Ran 2089 tests across 160 files. [253.87s]
Thu Nov 26 04:45:08 UTC 2026
```

Base test list, file, full Bun name and result, with timings omitted: 099-base-list.log · 2a81b900ac0c3c678c6a7beb4b064e95e6794400e7b28aa92ee24359a8d88a3b.

## Deviations at opening

The first halt was upheld before any repository edit. The Founder renamed the record pr/m2-halt-1-report.md, SHA-256 f142dce9b2aa8e0ffe5702ede8deebbbcdf63a1ef2022d230d82172e82c541bb. Its receipt was 067-halt-report.log · eadbcf61ed99cd20ec86b1eb049a972ec3847aa96f84a11e038de0aa1e1373b3. The first resume message has SHA-256 f9f431738c29b2fea9b485d779fb9f4540c70d4553e55e3ee999dd6425eda3d0. Its item 2 limits null and empty cases to those admitted by the source type. Each of phase, repositoryFingerprint, tokenState and ledgerSeq is tested present, and its missing and null forms are both rejected. The halt adds no correction round.

B19 item 6 is observed from the first snapshot in present at activation through Founder close. The composition returns no earlier client and closes its ledger immediately after its client. The transcript records the final read outcome.

## Task detail before implementation

Each item below is one implementation commit, in order. All inputs are synthetic or come from the disposable stand-ins. The App subscription type already supplies an unsubscribe function and accepts the TUI projection. App.tsx needs no change.

### R1 — B16 and B19 items 3 and 4

Widen only the eight specified fields in types.ts. Carry a three-valued connected through useBrokerState and StatusBar. Initial connected stays false. Use UNKNOWN for null connection in full and compact status, pane headers, governance and dock. Use UNKNOWN for unknown ownership, role and model. Governance uses — for absent execution IDs, token, permission lists, data class and pending-transfer count. A present empty list retains its existing wording or count. Display — for a null token in EventLog, writer tokens and IncidentBand. StatusBar preserves the null token marker at compact widths and retains its existing zero-token behavior. Keep queueDepth unrendered.

The renderer files are components/StatusBar.tsx, agent-identity.ts, DockStrip.tsx, IncidentBand.tsx, EventLog.tsx, panes/GovernancePane.tsx, ClaudePane.tsx and AntigravityPane.tsx under apps/madbridge/src/tui/. Only narrow existing tests where the compiler identifies a nullable read. Use test/phase3b/absence.test.tsx with actual character frames. Its tests are “governance distinguishes unknown transfers and permissions from empty collections”, “a null connection is unknown in bars, panes and docks”, “absent execution and ownership facts stay absent and queue depth stays hidden” and “a null token stays absent in writer, incident and session_open frames”. Break the null transfer count to 0 and null permissions to none, null connection to the connected word, null ownership to owned, and the ledger token to a bare tok:. The tests also cover both surfaces' writer headers and dock strips.

### R2 — B15, B16 and B19 items 1 and 2

Add clientSnapshotToProjection in live/projection.ts. Validate shape with fixed member paths and fixed fault descriptions. Check required and optional nested fields, discriminants and arrays without imposing envelope authorization or hash validity. Read sequence, token state, session ID, ledger sequence and task hash only for shape. Copy execution identities in order, translate approval states to their exact text, project ownership by kind and preserve the remaining governed data. Use no clock or I/O.

The first resume ruling governs the table. Null is valid only where the source type admits it. Exercise empty non-null arrays and strings, all phases, ownership kinds, token states and approval states, and read-only members independently of the projection. Fingerprints need kind, sha256 and git_sha, plus a string base_git_sha when present. Tests in test/phase3b/projection.test.ts are “the pinned table maps every broker member and declared phase and ownership kind” and “the mapper rejects unknown shapes without disclosing supplied values”. The latter includes null and missing phase, repositoryFingerprint, tokenState and ledgerSeq, and each invalid fingerprint case from the ruling. Break sender-released to owned and remove a declared-set check.

### R3 — B17

Add packages/supervisor/src/snapshot-timer.ts and named exports in src/index.ts. A cancellable wait uses a named interval of 100 ms. This bounds polling to ten reads per second per subscription while keeping interaction latency short. Clear the pending timer and detach the abort listener on settlement. The focused test in packages/supervisor/test/snapshot-timer.test.ts is “the snapshot wait paces reads and settles promptly on cancellation”. Break its interval or cancellation. R4 exercises the same timer through the subscription.

### R4 — B17 and B19 item 5

Add live/subscribe.ts. Fetch the first snapshot immediately with getSnapshot, compare projected data structurally, then wait before each further read. A closed client supplies its final snapshot through getSnapshot. A failed read or mapping supplies one disconnected copy of the last projection if one exists. Unsubscription cancels pacing and suppresses any in-flight delivery. Never close the shared client from an unsubscribe. No timer in the TUI and no wiring into an app entry point.

Use test/phase3b/subscribe.test.ts with controlled clients. Test “subscription gives the first, changed and closed projections exactly once”, “mapping and read failures end delivery from the last projection”, “a first failure gives no projection” and “unsubscribe cancels pacing and suppresses in-flight delivery”. Break duplicate suppression, delivery of the final closed snapshot, stopping on mapper failure, first-failure delivery and the unsubscribe guard.

### R5 — B8, B18 and B19 item 7

Extend the live build cause allowlist and interrupt mapping in supervisor/src/build.ts. Keep the phase guard and non-live behavior. Change only supervised post-handover outcomes in the two adapters' live.ts. On exit, retain any parser, reader or registered cause, otherwise report child_exited. Bare end after handover reports host_exited. Ignore a drained fact alone after handover. Preserve pre-handover behavior. Repin only line 30 of harness-separation in the same commit. Update the existing madv encoding test's expected end cause at line 52.

Use new stand-in and scenario helpers under test/phase3b/ for real offline preflight, build, monitor and ledger observations. Use an explicit verdict barrier when necessary and the real post-activation sendUserInput for an unanswered request. Use a synthetic stream only for drained alone because the production host emits it immediately before exit. For Founder close invoke the composition's own close on an active session and inspect the durable ledger. Test each surface before activation for child and host exit and after activation for clean child exit, host EOF and its parser-specific cases. Include clean and malformed partial Claude exits, nonzero or signal without a partial Claude line, madv clean exit, pending response, nonzero code, partial line and open tool. Name parameterized build tests by surface, timing, event and expected cause or reason in test/phase3b/child-end.test.ts. Name the drain test for each monitor and the close test for the absence of an interruption. Share offline observations with R7, writing any test transcripts only to disposable directories.

Break the child_failure mapping, both EOF reports, each drain guard, exit-cause retention, pre-activation failure propagation and the Founder-close phase guard. Compare actual failure detail or durable interruption rows, including the absence of the row after Founder close. Capture all results and restore each change separately.

### R6 — B5 and B19 items 8 and 9

Use new tests in packages/adapter-claude-code/test/retry.test.ts and packages/adapter-madv-surface/test/exit-causes.test.ts with the real registered rules and synthetic wire facts. Test “an unregistered api_retry error preserves attestation and the active monitor” and “the madv attester preserves exit causes before and after handover”. Exercise every mapped nonzero exit code, an unlisted code and a signal, with code zero's healthy exit covered in R5 and attestation behavior checked here. Break the Claude detector to classify any retry as auth_failed and suppress one madv code at parser handoff.

### R7 — B19 item 6 and B21

Add recorded-stream and child-end evidence entry points under scripts/phase3b/. For the healthy composition take actual client snapshots from present through Founder close, record how the stream ends, then replay them through the mapper and subscription contract for scripted character frames. Keep the raw observations outside the repository. Test “the healthy offline client's recorded stream renders activation through Founder close” in test/phase3b/recorded-frames.test.tsx. Break the frame projection of activation. Reuse R5's build cases for the child-end transcripts. Put labelled, sanitized excerpts and source hashes in docs/verification/phase-3b-m2-evidence.md.

The evidence starts at activation because present is the first client handoff. A final ledger read can fail after close. No pre-activation or disconnected snapshot will be fabricated. The packet will record the real-surface limitation, execution-exit limitation and the adapter's relative supervisor import. These scripts have no route from the CLI.

The R5 parameterized test names use “SURFACE before activation reports CAUSE” for each surface and child_exited or host_exited. After activation they use “SURFACE CASE records REASON”. The cases are clean exit and host end on both surfaces, Claude nonzero exit, signalled exit and malformed partial line, and madv nonzero exit, pending request, open tool and malformed partial line. Their reasons are respectively child_failure, pty_host_failure, child_failure, child_failure, identity_mismatch, adapter_failure for a provider-error nonzero exit, identity_mismatch for missing response evidence, and identity_mismatch for the last two parser failures. The remaining names are “SURFACE drained alone leaves the monitor active” for both surfaces and “Founder close on the active composition records no interruption”. The child mapping break serves both clean exits and the Claude unclassified exits. Each EOF break serves that surface's host-end tests. Drain breaks serve the two drain tests. Exit-cause breaks serve the retained-cause cases. The phase guard break serves Founder close. Each test observes its own expected outcome at the build unless the required fact is drained alone.

## Opening command records

The numbered logs hold the full commands and output. These rows give the first uptime reading, UTC bounds when logged, exit status and file SHA-256. The wait for run 094 is log 084. Logs 056 and 059 used source-search patterns corrected in 061, 063 and 064. Log 060's supplemental plan search had no match.

Log | Uptime | UTC bounds | Exit | SHA-256
:-- | :-- | :-- | --: | :--
001-governed-version.log | 22:49  1 user, load averages: 3.09 5.14 6.40 | — | 0 | 70de60425ca2312fb1a68e0ce2f9736235bec3b4b8f350a07e48c16fe4cd40f4
002-directory.log | 22:49  1 user, load averages: 2.62 4.97 6.32 | — | 0 | 304f3cf57e29d1abbffa56766418e0aeb6d653e32475b79df0e1e583574fe7d9
003-branch.log | 22:49  1 user, load averages: 2.62 4.97 6.32 | — | 0 | c450b39b42e8a14c4b87f1ebabaffdbfbf2622bd03d902d9acdb74fdf89bb388
004-head.log | 22:49  1 user, load averages: 2.62 4.97 6.32 | — | 0 | 93411a1e2ea410d854f3626a7e43788dd81b53aa106a491c2643b48595151ead
005-git-name.log | 22:49  1 user, load averages: 2.62 4.97 6.32 | — | 0 | 0afec6c17de7dda3d14fb34b6fe6f247a4d77a6dc99a011ff1ecff706de5f4e2
006-git-email.log | 22:49  1 user, load averages: 2.62 4.97 6.32 | — | 0 | 1175a4dadf8496624d772a01c29b87c85e96fa6f386d50f753c67cefbf6424a3
007-runtime.log | 22:49  up 4 days, 14:17, 1 user, load averages: 2.10 4.69 6.19 | Thu Nov 26 03:49:54 UTC 2026 to Thu Nov 26 03:49:54 UTC 2026 | 0 | 41a8d908b63d68298ae92171a43c21f718e2625c92234db7aac6d750a9bf51fb
008-commission.log | 22:50  1 user, load averages: 2.29 4.57 6.11 | — | 0 | b2bc267958c99751e7d02e2e090fd430486aea2f62e550e37c56fe01ecba9ddc
009-commission-hash.log | 22:50  1 user, load averages: 2.29 4.57 6.11 | — | 0 | 641f8ad9f34bd085d523e5f7dc09bca0cfd453f204fe2573245bb72022f3308f
010-seat.log | 22:50  1 user, load averages: 2.29 4.57 6.11 | — | 0 | c581ae69339ae82de6e1c4834b55609d983f8d09d232a4529c3886b1e0236977
011-prompt-manifest.log | 22:50  1 user, load averages: 2.29 4.57 6.11 | — | 0 | 58219d291809501883bf915289dd3d304fd2943e65fd97947d65bf50b7c2fd86
012-commission-requirements.log | 22:50  1 user, load averages: 2.18 4.51 6.08 | — | 0 | fa3cbbf00a45d4dfb2cbc331d89d0ea5a80045b40b6855272c7eca2152ea95db
013-broker-types.log | 22:50  1 user, load averages: 2.18 4.51 6.08 | — | 0 | 3887b09d5754f05cb9dbedef3741ce10d9ac68815e9a0dfe937c5c4de7d5aa79
014-projection-types.log | 22:50  1 user, load averages: 2.18 4.51 6.08 | — | 0 | b2cd26d12c44f394d541fa1aff62a0a58d697128c4615efc412b6c750d6d4e5e
015-repository-instructions.log | 22:50  1 user, load averages: 2.18 4.51 6.08 | — | 0 | 298e38a31e0e43f0e622c8c69bc3085f4988050ef793d6c992996a70ae9f9c9f
016-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 517dc63b3b2d38156a61b293c5e36206b017b43f8d571ec958f095cf83360f73
017-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | b30be4711e159e4382537c601731690f76123bd656bb98542974ecaeb7eed7e7
018-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 90a51f66c14713588ee5275d77c1be73dd8ae17b58183da6b7829969097a6bcb
019-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 61134462ed91f0bd2bc8317accb61f5d07e8061772cbae7107c4127050798d7d
020-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | b679f9a13935eb9002639c2e8d463253baff5b7af5e46645f21414534da88067
021-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | a647114d1c89630b20ebe55dc1e2b254820b69ac0a0e055faefb99c57b39c518
022-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 44bfbd384056ae8e3bd709d81788abe7b5aa2a9c3888c9cabcf928ab0f718ee1
023-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 615314d6b67ed8c7ee0d3ec6ab3197b1e4affae28e776ca1a2eb89b772f2c0a5
024-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 577c72814de419ca362be0840eca34a867902465472d7f76c249a4a0fa0efe5b
025-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 40827bc170dcbf6143b6c86a514110310456d3886ad0e7c7e33cfb86bbd72fd7
026-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | cffe894b49edfe02356972da933f46dfa930d8e9e6cc2635766eb7690860039b
027-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 94b0495cd6a3685323a3360e6310bda8171cc3832b426b228ab31a582394db0d
028-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 00f0d0c6a3a62dfec852972884f48190dc56e47a78b3d9e71d37b60846d7364c
029-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | e796c2a196517deb768c37474b51b750d252478ae0b2958b384cd971965e2781
030-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 66a0bb14d7b0142075279db82c841b4c3ef7d9fe7c9f3a4b0d6f8d156ea478a3
031-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | b5c5c582bc4568e24096c0cb050b5c71f6b02ac9de8777e947cba677399d683e
032-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 3c1d613ae50e5f8c23f89b13d57df58d2299fd5853463f8556c50a52737db884
033-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 91ea0ef1558ebc4a4895e7183a0e3833427149786bcaf66d845ac8f9386f38eb
034-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 6dc13d35b5076f46a803cc2a6022e68f5ee45240809e135b1ca8d420455a86ce
035-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 7d97304dedf1f60186cce88637480b7803485e236788059c9bc2655f100c20ef
036-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 4739288048882b91c34b07d5b3446ecaae82ac9047eb5235e650a20843581948
037-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 8809daeae61ce22b463d91f7a8fa61c231917ad2d86eeb24b34b514b5e6f8638
038-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 255be9bb29bfbf4cfe7b472ace4f2dc3208dd0ccda26a115e753adc098d30216
039-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 9efcdecbd9c57b100e6e1eb3356c1fa45af5563c146ed9406ab566ec47ed9722
040-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 65d8efb74ec1eb9474dd68107b2bbc1f82c5d5b6b65081dd11d2d751e9db21c0
041-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | fd48d7baabf8da3353bc4d7d95a43ad5a08401b68f36680b5683779cf4ac2cb7
042-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 8712cc4137dbc45e190eec61bc8dac11222c5fcbd7f2f00cea3edffb23b7311e
043-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | e05587f152296c8067eb718c43fb357caa680b563ba1a70132064a3864e884ca
044-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 125d45cd38fa570ddd33cb5c7c2ae98bb09b5672643c98d26e6d07272737aee4
045-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | d7590e6e9ce074800cab52f55354adf673b91dc48193feee60d659b6f43f191b
046-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 4bebd5f01c1730151c36f22e376888ce70e38d614d1617faccb2d7186dc84b43
047-authority.log | 22:51  1 user, load averages: 1.73 4.04 5.82 | — | 0 | 1c7f2d50127ca5ddf3f45c89df1e0875d8b4eda84f635c5ab716ce3b0cc5b2ac
048-broker-interface.log | 22:51  1 user, load averages: 1.94 3.83 5.67 | — | 0 | ed106e7ff5388e18bee719e7dd8ee809842e6a25790ae2479c406359e16050ff
049-tui-entry.log | 22:51  1 user, load averages: 1.94 3.83 5.67 | — | 0 | 6c87b4c851c63cbd35764ce2f1d8bcb7b5c5d3ea28979b9a38d94fc040223204
050-tui-readers.log | 22:51  1 user, load averages: 1.94 3.83 5.67 | — | 0 | 706e894edc328a1a2bb67336122d7d2a974a3fc8ee21e6ca53cde5dd884121de
051-supervisor.log | 22:51  1 user, load averages: 1.94 3.83 5.67 | — | 0 | e166bae6a7e0942df07a930dcc657491710fd2e7e0c4946c253a3d610b1f93f6
052-monitors.log | 22:51  1 user, load averages: 1.94 3.83 5.67 | — | 0 | 0951dbd36a595fe1d5c59349536a9f507a4dd5a33dce3142cbdd3329de26d152
053-composition.log | 22:51  1 user, load averages: 1.94 3.83 5.67 | — | 0 | 874a35195f2d0fc6f9baa379152bba7aef3f441c1acd13be8f2f1c2e8e471599
054-separation-scans.log | 22:51  1 user, load averages: 1.94 3.83 5.67 | — | 0 | 1a6ae3751ea9b30dddae74181d52f902e32dc813ddef02f24830531c3fc6f0f9
055-existing-tests.log | 22:51  1 user, load averages: 1.94 3.83 5.67 | — | 0 | 050ffde93f8aef58155d3ab9023a42063bf92106c2b4b8c23f2d05ca377ee5da
056-reader-search.log | 22:51  1 user, load averages: 1.94 3.83 5.67 | — | 1 | c931b3d175c9bf6017b30074e5c9cf297611825f39d165e777eeb0e6c5f3b92d
057-imports.log | 22:51  1 user, load averages: 1.94 3.83 5.67 | — | 0 | 2953cd6fb7901908833ebc54df1dabcfdf2a2d21547c6e3e2e48951b02b03560
058-base-behavior.log | 22:51  1 user, load averages: 1.94 3.83 5.67 | — | 0 | e61f1dbbcc0fe0de4d5799d6b0056b4b74695ff137c4000de0352e24259c4c93
059-fingerprint-shape.log | 22:52  1 user, load averages: 1.88 3.69 5.58 | — | 1 | 2e14dd5d0abd6e5b6f063fc3ee5acab93467cd8099d8f6a103eb064a256f4a73
060-commission-mapping.log | 22:52  1 user, load averages: 1.88 3.69 5.58 | — | 1 | 5a1593f5069d16007118336fef80d8de6448dbd1527e55d4644a2d724e6ab27f
061-fingerprint-contract.log | 22:52  1 user, load averages: 1.74 3.60 5.52 | — | 0 | cdc7cc5733c05a99873df07d0c910aaae295af3e5bbfbaa888c9c54e688c7f1a
062-pacenote.log | 22:52  1 user, load averages: 1.74 3.60 5.52 | — | 0 | bbfaf016bc6a55b330186b2c559efe49fd202340b02f8af9c01e2e23f3a8a9c5
063-fingerprint-evidence.log | 22:52  1 user, load averages: 1.65 3.49 5.45 | — | 0 | 86ed8790c471c7cd0f33f0f3c81d04648eb19d182bddfa47fac2e350f01b9d3b
064-reader-lines.log | 22:52  1 user, load averages: 1.65 3.49 5.45 | — | 0 | d2e7f11912de76a45d6f564c49540a0a41e9595cbbc347f865e4ad6c82ae7f0a
065-separation-details.log | 22:52  1 user, load averages: 1.65 3.49 5.45 | — | 0 | 3228c361bc7d3b51b0c21143d8f06687bc281a0ae4d335806093961381177e76
066-halt-state.log | 22:53  1 user, load averages: 1.81 3.35 5.33 | — | 0 | c771e879b57679be270cbdc2c708b1b71c25039cdcfa7a6b0d95d8898abaac43
067-halt-report.log | 22:54  1 user, load averages: 2.08 3.16 5.12 | — | 0 | eadbcf61ed99cd20ec86b1eb049a972ec3847aa96f84a11e038de0aa1e1373b3
068-resume-manifest.log | 23:29  1 user, load averages: 3.14 3.26 3.28 | — | 0 | cd51988afad6178adf39c54c0e3a08da208c1db6ca440676f33eb605ee559b2f
069-resume-prompt.log | 23:29  1 user, load averages: 3.14 3.26 3.28 | — | 0 | 0584232884a94bdb090bd869fa9b285635d5059e8fbf285b79ab12dd85eb5d7b
070-resume-version.log | 23:29  1 user, load averages: 3.14 3.26 3.28 | — | 0 | 4d4d3a1c52695c931d922ff6b0c8e48e75897f1a524c1c734e6bdf2eb8e751b7
071-resume-head.log | 23:29  1 user, load averages: 3.14 3.26 3.28 | — | 0 | 05c11b8eb551d602c0f2bee289fe1facc29350b0e4447a71d33db378d73f7056
072-resume-clean.log | 23:29  1 user, load averages: 3.14 3.26 3.28 | — | 0 | 29402313532c2d30ad8bfa0d6cfba92384009e3674ea6261775790034fcb101f
073-resume-report.log | 23:29  1 user, load averages: 3.14 3.26 3.28 | — | 0 | a718a02bc827daef48e01f9b12d737f56cfc6a78c1f0559a3f09e009167237de
074-resume-receipt.log | 23:29  1 user, load averages: 3.14 3.26 3.28 | — | 0 | 7c1f32eeb79103b33ba7d441c02b04503f018b9680e673bc7828ec91dbf08e04
075-resume-evidence.log | 23:29  1 user, load averages: 3.14 3.26 3.28 | — | 0 | 99a40295abbc8fdd04c5494dece74700709018693882c890ec8d82325d533d55
076-precondition-three.log | 23:29  1 user, load averages: 2.61 3.13 3.23 | — | 0 | 725bd7fbc44b0fcdfa3d4da62ef50e54351633cc0249c620ef6c7f4a43faf0a3
077-imports-at-base.log | 23:29  1 user, load averages: 2.61 3.13 3.23 | — | 0 | 825f0aef19473118e44934a836df3381e0f0532c47031252032ddf62f0af5b0f
078-baseline-rules.log | 23:29  1 user, load averages: 2.61 3.13 3.23 | — | 0 | dc5d9f0bcdf06217bb90f50197bf58929dc1dc5c4295c895b90e57cfb48e9c95
079-baseline-runtime.log | 23:30  up 4 days, 14:57, 1 user, load averages: 2.42 3.05 3.20 | Thu Nov 26 04:30:17 UTC 2026 to Thu Nov 26 04:30:17 UTC 2026 | 0 | fd3e50fb92bc6e959e792f4d30d6f381eb6e60885c96fc1ecbe41d6724f214bd
080-baseline-install.log | 23:31  up 4 days, 14:59, 1 user, load averages: 2.97 3.30 3.30 | Thu Nov 26 04:31:56 UTC 2026 to Thu Nov 26 04:31:56 UTC 2026 | 0 | dfff58d8e669af6ddb43bb7585517432ec325ac4b2b558ce8e850d296eb4652f
081-baseline-worktree.log | 23:32  1 user, load averages: 2.68 3.22 3.27 | — | 0 | d164eb9d12124a70b3004928ae36457d7cfcefe8b922f454d8d2b5201831c84c
082-baseline-tsc.log | 23:34  up 4 days, 15:01, 1 user, load averages: 6.78 4.29 3.66 | Thu Nov 26 04:34:01 UTC 2026 to Thu Nov 26 04:34:04 UTC 2026 | 0 | 98de6eca7f8645dc86596d7107a79a973a2301fc903fa5116d1f1bb63ba3ae5a
083-baseline-suite-runtime.log | 23:36  up 4 days, 15:03, 1 user, load averages: 3.24 3.82 3.56 | Thu Nov 26 04:36:03 UTC 2026 to Thu Nov 26 04:36:03 UTC 2026 | 0 | f19afc9afa8084b72b01fe555f241fc5f2fe827c1409adafd79e1f1e335df7f8
084-baseline-load.log | 23:36  1 user, load averages: 2.98 3.75 3.54 | — | 0 | 7c4a9a92625a22a6ea7d89505faf4b48f26452bb3df3002191a151e707778a98
085-render-design.log | 23:36  1 user, load averages: 2.96 3.72 3.53 | — | 0 | 82bbe6ae8b65073e9c9fe66077f2a52d470dab0cd5bff4b95f3a96471c31c5f5
086-mapper-design.log | 23:36  1 user, load averages: 2.96 3.72 3.53 | — | 0 | 6b145a9f513384b45b73f9386819b1b9d786dc7bc9a4f445a27860f4ca5436a9
087-offline-design.log | 23:36  1 user, load averages: 2.96 3.72 3.53 | — | 0 | 0737271a47c885bbee14f08fd125cb2618944f2295ad5b2cae7bc8214f730487
088-render-harness.log | 23:36  1 user, load averages: 2.21 3.46 3.44 | — | 0 | 47d4b85c660d732994c1d75a3ef8ba9f1c5ff57c2f306023d990c31ba5d24ec8
089-host-facts.log | 23:36  1 user, load averages: 2.21 3.46 3.44 | — | 0 | ff3556d3df52746054b074a931f03da46541871963c121d976619cd0fd60ce47
090-temp.log | 23:36  1 user, load averages: 2.21 3.46 3.44 | — | 0 | ee4c4bae0cdfa3f6211c30d29db9daf3cebb47f6abd82c0c737fda3fda298f59
091-test-design.log | 23:37  1 user, load averages: 2.24 3.37 3.41 | — | 0 | 74fad2f2ffb21fdd5bdeec7e828d7d6403b0d99f0b8b3985902c8b59a9d62898
092-log-helper.log | 23:37  1 user, load averages: 2.11 3.24 3.36 | — | 0 | 8615a19a8bd1dbf1de764959d2c0e9324cc6813a44503ade544f1eaf03f7dfad
093-task-detail-draft.log | 23:38  1 user, load averages: 1.82 2.94 3.24 | Thu Nov 26 04:38:40 UTC 2026 to Thu Nov 26 04:38:40 UTC 2026 | 0 | e5f50fca127cacda77d9fd263c5a7007a64fc4510c174896fe74d0d3add046c0
094-baseline-suite.log | 23:40  up 4 days, 15:08, 1 user, load averages: 3.17 2.97 3.20 | Thu Nov 26 04:40:54 UTC 2026 to Thu Nov 26 04:45:08 UTC 2026 | 0 | 192ad8a8e6e530f6da923a659d6c35709f0249fb262bb9e4d607c44dd08d03be
095-listing-tool.log | 23:41  1 user, load averages: 3.90 3.17 3.26 | Thu Nov 26 04:41:27 UTC 2026 to Thu Nov 26 04:41:27 UTC 2026 | 0 | e21cba88abc72d5b158a84b3915b22d76847e50db15165c2e80bd783dec14ff4
096-commit-check-tool.log | 23:41  1 user, load averages: 3.73 3.16 3.25 | Thu Nov 26 04:41:40 UTC 2026 to Thu Nov 26 04:41:40 UTC 2026 | 0 | d555bd95ea7a6e6e0445e4b5ce62b5d0cff4da1918e0f915de34d9add2f4e069
097-opening-tool.log | 23:42  1 user, load averages: 3.00 3.07 3.22 | Thu Nov 26 04:42:27 UTC 2026 to Thu Nov 26 04:42:27 UTC 2026 | 0 | 556989972e46853974e5b1c33592449077d945138a8213f017913394558424c9
098-opening-message.log | 23:42  1 user, load averages: 2.46 2.94 3.17 | Thu Nov 26 04:42:58 UTC 2026 to Thu Nov 26 04:42:58 UTC 2026 | 0 | d391ab92eba987ea958ec4fbaa325ee17c1998fc0fe55aa15aff914e7c53cb78
099-base-list.log | 23:45  1 user, load averages: 2.56 2.77 3.06 | Thu Nov 26 04:45:15 UTC 2026 to Thu Nov 26 04:45:15 UTC 2026 | 0 | 2a81b900ac0c3c678c6a7beb4b064e95e6794400e7b28aa92ee24359a8d88a3b
