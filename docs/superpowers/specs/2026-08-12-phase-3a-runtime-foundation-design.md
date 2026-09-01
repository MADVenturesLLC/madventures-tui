# MADVentures TUI — Phase 3A Production Runtime Foundation

**Status:** Founder-approved architecture; contract corrections through N1–N3 and remaining F4. Founder review of this exact SHA is complete: approved at PR #9 head `c23cd46d501813185087c27cbe81fd89b9ee3a33`, merged as `aa16032c56fdf6c7105e99b1765ed9365d605bf4`. Confirmed by [`DEC-20260831-01`](../../decisions/DEC-20260831-01-phase-3a-authority-drift-reconciliation.md) clause 1 (2026-08-31) — the PR #9 SHAs above are stated there, not in clause 2 (which covers the plan, PR #10); the prior "pending Founder review" wording was stale metadata.\
**Date:** 2026-08-12  
**Repository:** `MADVenturesLLC/madventures-tui`  
**Baseline branch:** `main`  
**Baseline SHA:** `0b942771fc07e5eb05203b1d3d641d3e8ad101f1`  
**Corrects:** `203c310a0c4fdca74dbbc4622e91fafd4c7fe432` findings 1–12; `e60e8c87fa00096b4db2e003f94914e312b08a17` findings F1–F6; and `8564fcd1759c9b13216ada24873e6349666fcc2b` findings N1–N3 plus remaining F4\
**Required Phase 3A merge state:** runtime foundation present behind a mandatory live-start gate  
**Live-session certification:** deferred to Phase 3B

**Phase 2 functional baseline:** 714 pass, 0 fail, 2606 `expect()` calls,
35 files; TypeScript and `git diff --check` clean

## 0. Purpose, authority, and phase boundary

Phase 3A builds and verifies the production runtime foundation that will later
run two governed execution surfaces. It does not activate that runtime from the
production command line and does not certify any real provider pairing.

The phase exists to establish, under deterministic fixtures:

- a single fail-closed foreground lifecycle;
- a plain-data `BrokerClient` boundary;
- transactional startup and rollback;
- per-surface PTY containment;
- storage, capability, ledger, and evidence foundations;
- truthful production command placeholders; and
- adversarial verification on both Founder Macs.

The Founder is the final authority over scope, envelopes, pairing, builder
assignment, review findings, certification, and merge. The task envelope is an
authorization instrument, not a preference list. The runtime may never rewrite
that authorization by substituting a surface automatically.

This document is the complete Phase 3A design. It is not an implementation
plan. Implementation begins only after the Founder approves this written
specification and a separate implementation plan is written and approved.

### 0.1 Phase decomposition

- **Phase 3A — Production Runtime Foundation:** all foundations in this
  document, exercised through structurally test-only harnesses. Production
  `madbridge start` remains gated.
- **Phase 3B — Live TUI Integration and Certification:** connect the existing
  TUI to real snapshots, output frames, and typed actions; certify an eligible
  live pair; remove the production start gate through a reviewed certification
  event.
- **Phase 3C — Operational Pilot:** real governed pilot sessions, operational
  evidence, and release hardening.

## 1. Architecture and scope

### 1.1 Single foreground supervisor

Version 1 uses one foreground supervisor OS process. That process owns the
lifecycle of the broker, ledger, PTY hosts, adapters, and—after Phase 3B—the
TUI. It does not create, connect to, or depend on a background daemon.

The load-bearing lifecycle invariant is:

> Supervisor exit—clean exit, crash, or signal—terminates every governed child,
> invalidates the live fencing token, and closes the session fail-closed. No
> partial session persists.

The single process does not erase module boundaries. The TUI and adapters may
communicate with the broker only through one `BrokerClient` interface. The
boundary carries asynchronous, serializable-shaped plain data. No PTY file
descriptor, subprocess handle, ledger handle, policy object, or shared mutable
state crosses it.

The boundary is real if an in-process client can later be replaced with a
socket-backed client without changing TUI code. Phase 3A therefore defines the
client contract but explicitly defers daemon transport, wire-format
standardization, client authentication, daemon restart, discovery, and
multi-client support.

### 1.2 Generic identities, exactly two active surfaces

The runtime is generic over execution identities but strictly limited to two
active surfaces in Version 1. The existing protocol `ExecutionIdentity` remains
canonical and is evolved in Phase 3A as specified in Section 9.1. Each envelope
declares `executions: readonly ExecutionIdentity[]`. There is no `surfaces`
collection and no `SurfaceIdentity` type.

One named constraint, `MAX_ACTIVE_SURFACES_V1 = 2`, and one envelope validator
enforce `executions.length === MAX_ACTIVE_SURFACES_V1`. No other module may
encode cardinality.

Downstream supervisor, broker, ledger, lifeline, adapter, capability, and
evidence modules iterate over `executions`. They must not use paired tuple
types, `surfaceA`/`surfaceB` identifiers, or independent literal-two checks.
Pair-level validation still evaluates the complete requested pair for:

- provider disjointness;
- compatible roles;
- independent-review eligibility; and
- any envelope-specific pairing constraints.

An architecture test asserts the enumerable form of this rule:

- no two-tuple surface types outside the centralized validator;
- no `surfaceA`/`surfaceB`, `adapterA`/`adapterB`, or equivalent paired names;
- no literal cardinality check outside `MAX_ACTIVE_SURFACES_V1`; and
- downstream orchestration iterates over `executions`.

`PairConstraintsV1.allowed_surface_pairs` is a declared constraint value, not
an identity system. It is exempt from the no-two-tuple assertion by that exact
field name only. No other exemption exists beyond this and the documented TUI
exemption.

The test asserts these patterns; it does not claim to mathematically prove the
absence of all two-surface assumptions.

The TUI is deliberately exempt from that architecture test in Phase 3A. Its
Claude and Antigravity panes remain presentation-specific until Phase 3B
generalizes them into execution slots.

Lifting the cap later requires a new design for N-surface failure, review,
quorum, presentation, and substitution semantics. Phase 3A contains no dormant
N-surface orchestration paths.

### 1.3 Authority boundaries

The three exclusive PTY roles are:

1. The broker is the sole application module permitted to command PTY
   operations.
2. A per-child PTY host is the sole component permitted to hold that child's OS
   PTY descriptor.
3. The TUI and adapters reach a governed PTY only through `BrokerClient`.

The broker intentionally does not hold raw PTY descriptors. It holds only an
anonymous control channel to each host. This strengthens the future daemon
boundary because PTY operations are message-shaped from the beginning.

The broker remains the sole owner of policy decisions, session state, fencing,
and durable ledger writes. PTY hosts report facts and perform mechanical
commands; they make no authorization or policy decisions and write nothing
durable.

### 1.4 Explicit exclusions

Phase 3A does not implement:

- production live startup;
- live TUI integration;
- daemon or socket transport;
- named runtime endpoints, PID files, or discovery state;
- automatic surface fallback or mid-session substitution;
- credential storage, login, refresh, or brokerage;
- N-surface orchestration;
- self-daemonizing hostile-child containment beyond process groups;
- session retention or archival automation; or
- Linux, Windows, or remote-host support.

## 2. Startup, attestation, and session lifecycle

### 2.1 Two-phase startup

Startup has a pure preflight phase followed by a transactional build phase.

#### Pure preflight

Pure preflight:

1. parses and validates the task envelope;
2. validates exactly two declared `ExecutionIdentity` records;
3. fingerprints the repository and worktree;
4. resolves each executable to an absolute path and hashes its artifact;
5. runs fresh non-mutating, non-interactive identity and auth-readiness probes;
6. validates exact provider and exact model against the envelope;
7. validates pair-level eligibility;
8. proposes and validates the storage root without creating it; and
9. validates host/platform capabilities required for the requested pair.

Preflight creates nothing in governed storage, the repository, ledger, or
session state. Provider CLI subprocesses may touch their own provider-owned
caches or state; Phase 3A neither relies on nor represents those effects as
governed writes.

Every probe runs under the exact same per-adapter allowlisted environment that
the PTY host and governed child will receive. Probe environment must equal
launch environment. No attestation result is reusable across sessions.

#### Transactional build

Only after preflight succeeds does the build phase:

1. create and revalidate the session storage transactionally;
2. open the ledger and append the session-open record;
3. construct the broker and `InProcessBrokerClient`;
4. create every anonymous lifeline/control channel;
5. launch and begin monitoring every PTY host;
6. instruct each host to re-hash its absolute executable immediately adjacent
   to `exec`, then launch that exact artifact in a new PTY/process group;
7. perform live-session re-attestation; absence of a passing primitive makes
   the surface ineligible for live use;
8. launch adapters;
9. append `fencing_token_issued`, then `session_activated`, and expose the
   first `active` snapshot only after both records are durable; and
10. in Phase 3B only, present the TUI after every required component is healthy.

Hash verification is per child and part of the launch path itself. No storage,
broker, or lifeline step is allowed between the final verification and that
child's `exec`.

Any build failure triggers mandatory rollback through the same containment
machinery used for live interruption. Every host, child, descendant process
group, adapter, broker subscription, and open resource already created is
closed. If a session-open ledger record exists, the broker appends a typed abort
record before closing whenever durable writing remains possible. No partial
session persists.

### 2.2 Machine-verifiable identity rubric

The identity rubric is fixed before any surface investigation:

**Passing evidence**

- a documented CLI or API primitive returning the resolved provider and exact
  model for the actual session; or
- structured per-session or per-response metadata naming the provider and
  exact model actually used.

**Failing evidence**

- configuration files;
- requested flags or environment values;
- marketing names or version banners;
- unstructured prose;
- behavioral inference;
- cached attestations; or
- any statement of requested intent rather than resolved fact.

A probe invocation and a governed session are different processes. To narrow
that TOCTOU gap, Phase 3A resolves and hashes the absolute executable during
preflight, and the host re-hashes the same path directly before `exec`.
The live process re-attests through a passing actual-session primitive; absence
or mismatch fails closed. A binary that truthfully attests one identity during
the probe and lies during the governed session remains a
documented residual; the system does not claim to solve malicious-provider
misrepresentation.

### 2.3 Capability matrix and surface investigations

Antigravity is investigated first because the planned live pairing depends on
it. The investigation records every primitive tried, including CLI version,
binary path and hash, host facts, exact commands, structured modes, session
metadata, logs, and sanitized results. A failed result is still a required
evidence document.

Codex, Grok, Cursor, Claude, and other Founder-approved surfaces may be
investigated as startup re-authorization alternatives. No single surface's
failure ends the runtime-foundation work. Phase 3A continues under controlled
fixtures, behind the production gate.

Machine-readable capability records are dated attestations, not whitelists.
They become stale when the CLI version or binary hash changes, when the host
changes, or when their configured time horizon expires. A matrix record only
makes a surface eligible to be presented as an alternative; a real session
must repeat the full fresh preflight.

### 2.4 Founder-selected startup re-authorization

If a requested surface fails preflight, the system stops. It may present
evidence-backed eligible alternatives, but:

- no alternative is preselected;
- there is no one-keystroke confirmation;
- selection is a distinct typed Founder authorization;
- the Founder issues a new envelope naming the exact replacement identity;
- the complete pair is revalidated; and
- the next session receives a new fencing token.

The system never substitutes based on failure order. Mid-session substitution
is prohibited and structurally impossible: any surface failure invalidates the
current token and ends the entire session before a successor envelope can be
authorized.

### 2.5 Live failure semantics

Any of the following interrupts the entire session:

- child, adapter, or PTY-host failure;
- host command deadline expiry;
- authentication expiry;
- identity or model mismatch;
- output or snapshot sequence invariant failure;
- ledger write failure;
- broker invariant failure; or
- containment failure.

The broker performs interruption as one durable, ordered lifecycle sequence
when writing remains possible: `session_interrupted` records the typed incident,
`fencing_token_invalidated` makes the token unusable,
`session_closing` records terminal intent, and `session_closed` records
completed closure with `closure_kind: "interruption"`. Governed process-group
termination occurs after `session_closing` and before `session_closed`; client
streams close with the terminal transition. `interrupted` is terminal-bound;
no command can return that session to `active`. Recovery requires next-start
reconciliation and a new Founder-authorized envelope. `session_resume` is
legal only for `paused` sessions and is not interrupt recovery.

When durable writing is impossible—such as disk failure or supervisor
`SIGKILL`—next-start reconciliation is the record of last resort. If no typed
terminal prefix was durable, it appends `session_unclean_closure`. If a typed
interruption or closing prefix was durable, it completes that exact prefix
under Section 9.5 instead of adding a second closure kind. Reconciliation is a
next-start activity, never an in-session phase.

## 3. PTY host and fail-closed containment

### 3.1 Minimal per-child PTY host

Each governed execution surface runs under a minimal, standalone PTY host. The
host is not an application service and has no policy. Its closed operation set
is:

- launch exactly one preauthorized executable;
- accept exact input bytes;
- emit exact output bytes;
- resize the PTY;
- report launch, readiness, drain, and exit facts; and
- terminate the child process group with `SIGTERM`, a bounded grace period,
  then `SIGKILL`.

The host may not execute a replacement program, mutate the authorized
environment, pass descriptors, make policy decisions, write the ledger, or
write evidence. It imports no broker, ledger, adapter, TUI, policy,
protocol-authority, or storage code. An import-graph architecture test enforces
that boundary.

### 3.2 Command stream and lifeline

The supervisor process holds the sole write end of each host's inherited stdin.
Within that OS process, only the broker module writes command frames to it.
Host stdin is simultaneously:

- its private framed command stream; and
- its death lifeline, because EOF means the supervisor is gone or has
  deliberately revoked the child.

Framing distinguishes broker commands from child-input byte frames; raw
passthrough is prohibited. Host stdout carries framed launch facts, exact PTY
output bytes, and exit facts. These are anonymous inherited stdio descriptors,
not named endpoints. Nothing listens, and no socket or filesystem path is
created.

The supervisor is the sole owner of every write end, each marked
close-on-exec. No sibling host, governed child, or adapter may inherit another
host's write end. This file-descriptor hygiene is tested with two PTYs plus an
adapter, because a single-child test cannot detect a leaked sibling descriptor.

The host and governed child both receive the same per-adapter allowlisted
environment used during probes. The host passes only that environment to the
child.

### 3.3 Gap-free launch ordering

The launch order is fixed:

1. The supervisor creates the anonymous channel.
2. It spawns the PTY host with the lifeline read end inherited at birth and an
   allowlisted environment.
3. It closes every unintended duplicate descriptor and monitors host exit.
4. The host receives the authorized absolute path, expected hash, arguments,
   environment, and identity.
5. Directly before `exec`, the host verifies the artifact hash.
6. The host creates the PTY/session/process group and launches the child.
7. The host reports host PID, child PID, child PGID, identity, and readiness.
8. The broker begins normal input, output, resize, and termination commands.

The child cannot exist before its death-watch. The supervisor treats host exit
as governed-child death and interrupts the whole session.

### 3.4 Termination and wedged-host escalation

Normal termination uses this bounded ladder:

1. Broker sends a typed terminate command.
2. Host sends `SIGTERM` to the child process group.
3. Host waits the Section 9.8 responsive-host child grace.
4. Host sends `SIGKILL` to any surviving process group and reports exit.

Deliberately closing one host's stdin is a second, simpler per-child kill
switch. EOF requires the host to terminate its child process group.

A host may be wedged and stop reading commands or EOF. Therefore launch facts
must include child PID and PGID, and the supervisor has a host-bypassing path:

1. send terminate;
2. close host stdin;
3. wait the bounded host-response deadline;
4. directly `SIGKILL` the reported child PGID;
5. `SIGKILL` the host; and
6. interrupt the whole session.

Host unresponsiveness past the deadline is host failure. The direct PGID path
is mandatory and is verified by `SIGSTOP`-wedging a fixture host.

### 3.5 Honest containment claim and residuals

Phase 3A claims process-group containment, not hostile-process containment. A
descendant that calls `setsid()` can escape its original process group. macOS
does not provide Linux cgroups or PID namespaces, and the governed processes
are selected adapters rather than arbitrary hostile programs.

The documented residual is simultaneous external `SIGKILL` of both supervisor
and PTY host before either can execute cleanup. This is acceptable for Version
1 and must not be misrepresented as impossible.

### 3.6 Bun Terminal capability spike

The PTY design is gated by a rubric-first Bun capability spike. No pipe-based
fallback is allowed. Failure stops the PTY implementation and produces an
evidence report for evaluating alternatives.

The same reviewed spike commit must pass on:

| Host | Architecture | macOS | Build | Bun | TERM | Shell |
| --- | --- | --- | --- | --- | --- | --- |
| Founder's iMac | `x86_64` | 13.7.8 | 22H730 | 1.3.14 | `xterm-256color` | `/bin/zsh` |
| Founder's MacBook | `arm64` | 26.6.1 | 25G76 | 1.3.14 | `xterm-256color` | `/bin/zsh` |

The spike must demonstrate:

- PTY/TTY allocation;
- exact binary input and output;
- resize propagation;
- process-group creation and signal delivery;
- child and grandchild termination;
- two PTYs plus an adapter without write-end leakage;
- supervisor clean exit, crash, signal, and `SIGKILL`;
- deliberate lifeline EOF;
- PTY-host death;
- a host wedged with `SIGSTOP`, cleared through the direct PGID path;
- a child that ignores `SIGTERM`;
- clean exit reporting; and
- measured timing against the fixed deadlines.

Timing is measured against the sole deadline table in Section 9.8. Reports
record observed values rather than merely saying “pass.”

One adaptive TUI will later run on both hosts. Machine-specific UI forks are
out of scope.

## 4. BrokerClient, command surface, and production gates

### 4.1 Client contract

The normative `BrokerClient` contract — every command variant, result, error
code, snapshot field, output frame, and event-publishing path — is defined
solely in Sections 9.3–9.4. This section states only the boundary rules. Where
any prose elsewhere summarizes the contract, Section 9 prevails. No second copy
of the interface may appear anywhere in this instrument.

The boundary carries asynchronous, serializable-shaped plain data. No PTY file
descriptor, subprocess handle, ledger handle, policy object, callback carrying
mutable state, or other shared mutable state crosses it. The in-process client
must remain replaceable later with a socket-backed client without changing TUI
code. Daemon transport, wire-format standardization, client authentication,
daemon restart, discovery, and multi-client support remain deferred.

Snapshots are state projections; PTY throughput uses the separate ordered byte
stream. `snapshotSeq` is monotonic per session. `outputSeq` is monotonic per
session and execution. Session mismatch, duplicate, regression, or gap is a
typed invariant failure. In the in-process client, an unexplained gap
interrupts the session rather than being hidden. Replay and reconnect are
deferred with the external transport.

Input and resize bind to `sessionId`, `executionId`, and the current fencing
token so stale clients cannot write.

`BrokerClient.close()` releases only that client's subscriptions and resources.
It does not terminate the governed session. Session termination is a separate
typed broker command with its own authorization.

The PTY-host frame protocol is private infrastructure and is not the future
public daemon protocol.

### 4.2 Production `start` gate

Throughout Phase 3A, production `madbridge start` contains no path to the live
runtime. It exits with status `78` and stable error
`live_runtime_not_certified`.

Human output is exactly:

```text
Live runtime not certified. Phase 3A runtime foundation is present; live startup requires Phase 3B certification.
```

JSON mode returns this exact shape and values:

```json
{"ok":false,"error":"live_runtime_not_certified","hint":"Phase 3A runtime foundation is present; live startup requires Phase 3B certification."}
```

The command performs no filesystem inspection and imports no runtime module.
There is no hidden flag, environment variable, debug branch, dynamic import, or
alternate argument path to bypass the gate.

Fixture and capability tests use a separate test-only harness entry point that
directly imports the runtime foundation. The production binary never imports
that harness, statically or dynamically. An architecture test pins this
structural separation.

Gate removal is a Phase 3B certification event, not an incidental edit. The
reviewed change must cite:

- both dual-host PTY reports;
- a passing live-pair certification;
- live TUI integration evidence; and
- production acceptance and negative-control results.

A test asserting the Phase 3A gate is deliberately changed in the same reviewed
certification commit.

### 4.3 External-control placeholders

Production `status`, `pause`, `resume`, and `close` remain recognized command
names but expose no external control plane. Each exits nonzero with stable error
`external_control_unavailable` and status `69`, performs no socket, PID,
filesystem, ledger, or discovery probing, and instructs the operator to use
certified TUI governance controls.

Human output for `status`, `pause`, and `resume` is exactly:

```text
External control unavailable. Use the certified TUI governance controls.
```

Their JSON mode uses this exact shape and values:

```json
{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls."}
```

Human output for `close` is exactly:

```text
External control unavailable. Use the certified TUI governance controls. If the TUI is unresponsive during an incident, terminate the foreground supervisor process; supervisor exit terminates all governed children fail-closed.
```

Its JSON mode uses:

```json
{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls. If the TUI is unresponsive during an incident, terminate the foreground supervisor process; supervisor exit terminates all governed children fail-closed."}
```

Acceptance tests pin exact human output, JSON shape, and nonzero exit status.
Architecture tests assert these command modules do not import socket paths or
probe the filesystem.

`doctor`, `init`, `verify-ledger`, and `export-evidence` retain their existing
responsibilities. `verify-ledger` and `export-evidence` must work on session
storage generated by the fixture harness before any live session is certified.

### 4.4 Socket dormancy

`BrokerSocket` remains source-tree scaffolding only. It is absent from every
production and harness startup graph. Neither path imports or instantiates it,
and neither creates `broker.sock`.

`MADV_RUNTIME_DIR` remains quarantined with the dormant socket code and is not
reused. Phase 3A storage uses only `MADV_STORAGE_DIR`. Architecture tests assert
the absence of `BrokerSocket`, `socket.ts`, `MADV_SOCKET_PATH`, and
`MADV_RUNTIME_DIR` edges from production and harness runtime graphs.

No named runtime endpoint is created in Phase 3A.

## 5. Storage, authentication, capability evidence, and retention

### 5.1 Storage tree

The host-owned storage root is:

```text
<passwd-home>/Library/Application Support/MADVentures/madventures-tui/
  sessions/
    <session-id>/
      ledger/
      artifacts/
      sanitized-evidence/
  capability/
    <surface>/
      <timestamp>-<binary-hash-prefix>.json
```

Phase 3A does not create `runtime/`. That directory is deferred until a future
certified transport or discovery feature has a defined occupant.

Session IDs are system-generated, collision-resistant, and filesystem-safe.
Capability paths use normalized surface identifiers and cannot be selected by
untrusted display names.

### 5.2 Home resolution and storage validation

The default home is the authenticated user's passwd entry from
`getpwuid(getuid())`, not `$HOME`. If `$HOME` is present and does not resolve to
the passwd home, preflight fails with a typed home-mismatch error.

`MADV_STORAGE_DIR` is the only override. Default and override pass through the
same validator. A valid root is:

- absolute;
- outside the governed repository and worktree;
- free of symlink path components;
- owned by the current UID;
- inaccessible to group and others;
- stable under `realpath`; and
- on a writable local path supported by Phase 3A.

Pure preflight validates a proposed path without creating it. Transactional
build creates missing directories with mode `0700`, then revalidates ownership,
mode, symlinks, and `realpath` before opening the ledger. Failure rolls the build
back.

Tests use disposable `mkdtemp` roots under the macOS per-user private temporary
tree and exercise the same production validator. There is no relaxed test path.

### 5.3 Ledger durability

The broker owns all ledger writes. A mid-session append failure means the
runtime can no longer truthfully account for its actions, so it triggers typed
interruption `ledger_write_failed` and terminates the whole session. If even the
interruption cannot be persisted, next-start reconciliation records the unclean
closure.

PTY hosts and adapters write no durable session truth directly.

### 5.4 Host-owned authentication and allowlisted environments

Phase 3A does not become a credential-management system. Provider
authentication remains installed and owned by the host user. The supervisor
does not store, copy, refresh, broker, or initiate login flows.

Each adapter's versioned configuration lives only in the Founder-approved
adapter registration named in Section 9.1. That registration is the sole
admission source and includes:

- authorized executable name and supported versions;
- identity and auth-readiness probe configuration;
- required non-interactive launch flags;
- an exact child-environment allowlist reference;
- which allowed variables are `secret: true`;
- `independence_domain` and `organization_id`;
- authentication-failure detection; and
- capability and review limitations.

Forwarding is not custody. A secret-bearing provider variable may be forwarded
from the ambient host into an allowlisted child. MADVentures runtime code does
not intentionally log, persist, or export its value. Secret-marked values are
redacted from diagnostic output, errors, environment reports, and evidence.
Variable names may be recorded; values may not.

Identity probes, auth-readiness probes, PTY hosts, and governed children receive
the same exact allowlisted environment. An acceptance fixture dumps each
environment and asserts four-way equality and the absence of every ambient
variable not on the allowlist.

Adapters use non-interactive modes where supported. A governed session never
hosts an intentional interactive login. If credentials expire and the CLI
attempts to prompt, the adapter detects the auth failure, interrupts the whole
session with `authentication_expired`, and requires external reauthentication,
a new envelope, and a new session.

A surface without a documented, non-mutating, non-interactive auth-readiness
primitive receives that result in its capability record; no waiver is inferred.

### 5.5 Capability and investigation records

Machine-readable capability records live under
`<storage-root>/capability/<surface>/`. Each records:

- surface, provider, requested exact model, and role eligibility;
- `independence_domain` and `organization_id`, copied from the adapter
  registration at investigation time;
- CLI version, absolute binary path, and binary hash;
- evaluation date and expiration horizon;
- host architecture, macOS version/build, Bun version/path/hash, `TERM`, and
  shell;
- identity-attestation result and raw sanitized facts;
- auth-readiness result;
- PTY, process-group, termination, and timing results;
- independent-review eligibility and known limitations;
- overall pass/fail; and
- the redaction rules applied.

Human-readable investigation and spike reports may additionally be committed
under repository `docs/`. The runtime never writes into the governed repository.

Capability evidence is a dated observation, not a standing authorization or
whitelist.

### 5.6 Evidence and redaction limits

The system never intentionally collects or records authentication flows or
credentials of its own doing. Sanitized exports apply best-effort redaction for
known token patterns and exact allowlisted secret values and record which rules
ran.

PTY snapshots necessarily contain provider-controlled output. An agent or
provider may print a secret despite the supervisor's rules. Agent-printed
secrets are a documented residual; Phase 3A does not claim exhaustive
secret-free evidence.

### 5.7 Retention

Retention, archival, export lifecycle, and Founder-authorized deletion policy
are deferred. Phase 3A never automatically deletes session or capability
storage. Unbounded growth is an explicit evidence-preservation decision, not an
omission.

## 6. Verification, certification, review, and builder qualification

### 6.1 Layer 1 — pure and property tests

Pure tests cover:

- envelope parsing and exact two-surface cardinality;
- `ExecutionIdentity` completeness and uniqueness;
- pair eligibility, role compatibility, and provider independence;
- executable resolution and hashing;
- capability freshness and staleness;
- passwd-home resolution and typed `$HOME` divergence failure;
- default and override storage validation;
- environment allowlisting and redaction;
- session, snapshot, output, and fencing-token binding;
- monotonic snapshot and output sequences;
- stable typed error taxonomy; and
- PTY-host frame parsing.

Property and adversarial cases include empty, duplicate, reordered, stale,
oversized, malformed, unknown, regressed, and out-of-session values. Malformed
or unknown command frames fail closed.

### 6.2 Layer 2 — architecture assertions

Architecture tests assert:

- the single centralized cardinality constraint and enumerable absence of
  two-ness elsewhere;
- the documented TUI exemption, the `PairConstraintsV1.allowed_surface_pairs`
  field-name exemption, and no broader exemption;
- TUI/adapters reach PTYs only through `BrokerClient`;
- PTY hosts import no application authority or persistence modules;
- production `start` cannot statically or dynamically reach the harness/runtime;
- placeholder commands perform no discovery or filesystem probing;
- socket scaffolding is absent from production and harness startup graphs;
- no `broker.sock` creation path is reachable;
- broker-exclusive writes to host command descriptors; and
- PTY hosts and adapters cannot write the ledger.

These tests assert specific import, naming, cardinality, and call-graph patterns.
They do not claim formal proof.

### 6.3 Layer 3 — deterministic fixture runtime

The structurally test-only harness exercises the real runtime foundation with
controlled provider fixtures. It verifies:

- pure preflight creates no governed state;
- transactional storage and ledger creation;
- `InProcessBrokerClient` snapshots and output streams;
- exact bytes, resize, typed commands, and fencing;
- monotonic sequencing and invariant failures;
- injected failure after every transactional build step;
- complete rollback with no partial session;
- clean close and typed interruption;
- reconciliation after unrecordable termination;
- ledger verification and sanitized evidence export;
- four-way environment equality across probes, auth checks, hosts, and
  governed children; and
- production `verify-ledger` and `export-evidence` consuming fixture output.

Every build step has a deterministic injected-failure point. Tests assert both
the typed result and absence of residual processes, descriptors, open session
records, or live fencing tokens.

### 6.4 Layer 4 — adversarial process tests

Adversarial tests cover at least:

1. supervisor clean exit;
2. supervisor ordinary signal;
3. supervisor crash;
4. supervisor `SIGKILL`;
5. two PTY hosts plus an adapter to expose descriptor leakage;
6. governed child and grandchild termination;
7. deliberate lifeline EOF;
8. child ignoring `SIGTERM`;
9. PTY-host exit;
10. host wedged with `SIGSTOP` and direct PGID cleanup;
11. host unresponsive to command frames;
12. malformed and unknown host frames;
13. snapshot/output duplicate, regression, and gap;
14. ledger append failure;
15. mid-session authentication expiry;
16. live attestation mismatch;
17. executable replacement between preflight and exec;
18. first surface launched followed by second-surface launch failure; and
19. cleanup verification that no child, descendant, host, descriptor, open
    ledger session, or live token remains.

Each timing test reports observed detection, `SIGTERM`, escalation, and final
death times. Passing requires the Section 9.8 deadlines. The Layer 4 `SIGSTOP`
scenario asserts the no-grace path: an unresponsive or `SIGSTOP` host does not
earn the responsive-host child grace.

### 6.5 Layer 5 — dual-host certification evidence

The same reviewed commit is tested independently on the Founder iMac and
MacBook. Each signed-off report records:

- candidate commit SHA and branch;
- clean/dirty worktree state and exact changed files;
- Bun executable path, version, and hash;
- architecture, macOS version/build, `TERM`, and shell;
- exact commands and complete counts;
- each spike criterion and measured timing;
- failures, retries, warnings, and residual risks; and
- report checksum.

Both reports must pass before Phase 3A merge. Machine-specific code branches or
UI forks are not an acceptable substitute.

### 6.6 Surface investigations

Each real-surface investigation applies the same pre-written identity and auth
rubrics. A passing record is not a live authorization. A failing investigation
must still produce:

- a durable machine-readable failed capability record;
- a human-readable evidence report;
- exact primitives attempted and sanitized outputs;
- CLI version, path, binary hash, host, and date; and
- the precise rubric clause not met.

The failing surface is excluded from the candidate pair. The fixture-tested
Phase 3A foundation may still merge behind the production start gate.

Antigravity's role as an investigated execution surface is independent from
Gemini Antigravity's Tier-2 reviewer role. Failure of the `agy` CLI attestation
does not disqualify the reviewer or block review of the foundation.

### 6.7 Review workflow and single-writer discipline

The provisional Phase 3A roles are:

- **Primary implementer:** Claude Opus 5, subject to the qualification rubric
  below;
- **Continuity and pre-commit reviewer:** Plato/Codex;
- **Independent Tier-2 reviewer:** Gemini Antigravity, reviewing an exact SHA;
- **Bounded correction implementer:** GLM-5.2 only when separately authorized;
- **Alternative primary implementer:** Grok 4.5 or another Founder-authorized
  builder if reassignment is required; and
- **Final authority:** Founder Mike.

One primary implementer owns a milestone at a time. Reviewers do not silently
rewrite the implementation. Every review verdict pins an exact commit SHA.
Nothing is committed, pushed, opened as a PR, or merged without the Founder's
corresponding authorization.

### 6.8 Phase 3A merge gate

Phase 3A may merge only when all of the following are true:

1. The full automated suite passes without regression below the Phase 2
   baseline of 714 tests, 2606 `expect()` calls, and 35 files; Phase 3A-required
   coverage increases the suite rather than replacing it. No required or
   existing test is skipped, disabled, filtered, quarantined, marked `.only`,
   or otherwise excluded without an explicit Founder-visible disposition.
2. Pure, architecture, fixture, adversarial, and dual-host layers pass.
3. The iMac report passes and is checksummed.
4. The MacBook report passes and is checksummed.
5. Both reports identify the same candidate commit.
6. TypeScript is clean.
7. `git diff --check` is clean.
8. Fixture-generated ledgers pass production `verify-ledger`.
9. Fixture-generated evidence passes production `export-evidence` and
    sanitization checks.
10. Every warning and review finding has an explicit disposition.
11. Gemini Antigravity issues an approving Tier-2 verdict for the exact
    candidate SHA.
12. Production `start` still returns `live_runtime_not_certified`.
13. Production `start` is structurally unable to reach the runtime or harness.
14. External-control placeholders return their stable typed errors and inspect
    no runtime state.
15. No production or harness path creates `broker.sock`.
16. No residual child, descendant, PTY host, descriptor, open session record,
    or valid fencing token remains after tests.
17. Founder Mike approves the exact candidate SHA and authorizes merge.

Phase 3A's observable production behavior must match reality: the runtime
foundation exists, but live startup is not certified.

### 6.9 Phase 3B gate-removal evidence

Phase 3B may replace the `start` placeholder only in a certification change
that cites:

- passing dual-host Phase 3A reports;
- a fresh live-pair capability and attestation record;
- TUI integration with real snapshots, ordered output frames, and typed
  actions;
- production startup, shutdown, interruption, and negative-control evidence;
- no bypass of pair eligibility, fencing, storage, environment, or authority
  boundaries; and
- an exact-SHA Tier-2 verdict and Founder authorization.

## 7. Builder qualification rubric

### 7.1 Purpose and applicability

Builder qualification governs who may remain primary implementer and who earns
eligibility for Phase 3B. It does not determine whether otherwise sound code is
discarded. If a builder is reassigned, existing code receives a separate
Founder-approved technical assessment.

The rubric is builder-generic. The same milestones, budgets, and disqualifiers
apply to Claude Opus 5 and to any successor primary implementer—including
Grok 4.5, GLM-5.2, or another Founder-authorized builder—from the moment of
reassignment.

### 7.2 Required milestones

1. Surface identity and auth investigations
2. Dual-host Bun PTY capability spike
3. Contracts and pure preflight
4. Storage, capability records, and evidence foundations
5. PTY-host protocol and containment
6. Transactional supervisor startup and rollback
7. `InProcessBrokerClient`
8. Ledger interruption and reconciliation
9. CLI placeholders, live-start gate, and architecture boundaries
10. Fixture and adversarial verification

For every milestone, the primary implementer must:

- write required failing tests before production changes;
- stay within the approved milestone scope;
- run fresh targeted tests, the full suite, TypeScript, and diff checks;
- report exact files, counts, failures, warnings, and residual risks; and
- stop without commit, push, PR, or merge until the Founder authorizes the next
  action.

### 7.3 Correction-round accounting

A correction round is one review verdict for one milestone that identifies one
or more substantive defects requiring implementation or required-test changes.
All substantive findings in the same verdict count as one round.

Countable verdicts may come from either Plato/Codex pre-commit review or Gemini
Antigravity Tier-2 review. Each verdict can add at most one round to that
milestone. The running count is recorded in a Founder-visible log when the
verdict occurs; it is never reconstructed at qualification time.

The following do not count as correction rounds:

- a new Founder ruling made after the milestone implementation;
- a host-specific finding impossible to observe on the builder's execution
  host before the required dual-host run;
- a reviewer-requested voluntary supplementary test that confirms behavior
  already correct and already covered as required; or
- editorial clarification that does not change behavior or required evidence.

Absence of a test required by the milestone or Section 6 is substantive
incompleteness and does count. Labeling required coverage as “supplementary” is
not permitted.

### 7.4 Material scope expansion

Before implementing any material expansion, the builder must stop and obtain
Founder approval. Material expansion includes:

- changing an authority-bearing module beyond the approved plan;
- adding a dependency, native bridge, daemon, socket, listener, discovery
  mechanism, credential facility, or external transport;
- weakening or replacing PTY containment;
- adding any production path around the `start` gate;
- changing stable CLI names, errors, exit codes, JSON shapes, storage roots,
  environment policy, or evidence boundaries;
- changing cardinality or pair-eligibility semantics;
- introducing machine-specific production behavior;
- changing the broker/TUI/adapter authority boundary; or
- materially expanding the approved file or module set.

Implementing first and disclosing afterward is a qualification failure, even
if the code is technically sound.

### 7.5 Milestone statuses

Each milestone receives one status:

- **Pass:** accepted without a substantive correction round.
- **Pass after correction:** accepted within the correction budget.
- **Reassign:** the builder no longer owns the milestone or phase.
- **Stop:** a safety or evidence failure blocks further implementation pending
  Founder ruling.

### 7.6 Reassignment and disqualifiers

Reassignment is required when any of the following occurs:

- more than two correction rounds on one milestone;
- the same substantive defect recurs after a claimed correction;
- unapproved material scope expansion;
- fabricated, suppressed, selectively omitted, or weakened evidence;
- replacement of fail-closed behavior with fallback or fail-open behavior;
- bypass of startup gating, socket dormancy, environment isolation, fencing, or
  authority boundaries;
- overwrite of Founder/user work;
- destructive or unauthorized Git actions;
- an unapproved major rewrite; or
- a critical trust-boundary defect attributable to the implementation.

New Founder rulings and genuinely host-unobservable findings do not
retroactively disqualify a builder, but the resulting work must still be
completed and verified.

### 7.7 Phase 3B qualification

A builder is qualified for Phase 3B only if:

- all Phase 3A milestones pass or pass after correction;
- no milestone exceeds two correction rounds;
- no disqualifier occurs;
- both Founder hosts pass the same reviewed SHA;
- all findings and warnings have explicit dispositions;
- Gemini Antigravity reviews the exact candidate SHA;
- the Founder explicitly qualifies the builder; and
- the Phase 3B work does not silently drift from this design.

Successful Phase 3A merge does not automatically qualify a builder for Phase
3B.

### 7.8 Founder-visible qualification record

The final record contains:

```text
Builder qualification: <pass | fail | reassigned>
Phase evaluated: 3A
Builder: <builder name>
Exact resolved model ID: <machine-verifiable model identifier>
Execution surface and version: <surface name and exact version>
Evaluation date: <ISO-8601 date/time>
Candidate SHA: <full commit SHA>
Correction rounds by milestone: <running log and totals>
Material deviations: <none or exact Founder-approved deviations>
Independent review: <reviewer, verdict, exact SHA>
Founder ruling: <qualification decision and date>
```

## 8. Completion criteria

Phase 3A is complete when the merge gate passes and the Founder merges the exact
approved SHA. Completion means the production runtime foundation is present,
verified through fixtures on both Founder Macs, and honestly gated. It does not
mean a real two-surface session is certified, deployed, activated, or available
from `madbridge start`.

The next authorized activity after Founder approval of this written spec is a
separate implementation plan. No implementation is authorized by this document
alone.

## 9. Binding contract and legacy-disposition addendum

This addendum closes the contract gaps found during written-spec review,
including findings 1–12 against SHA
`203c310a0c4fdca74dbbc4622e91fafd4c7fe432`. It is binding with Sections 0–8
and controls if an earlier sentence can be read two ways. It does not reopen
the approved architecture.

The supersession authority for legacy V1 conflicts is
[`DEC-20260812-01`](../../decisions/DEC-20260812-01-phase-3a-runtime-foundation-supersession.md).
This specification and that decision record form one review instrument. Neither
authorizes implementation without a separately approved implementation plan.

### 9.1 Canonical identity and envelope admission

Phase 3A does not create a second identity system. The existing protocol
`ExecutionIdentity` is the canonical envelope and runtime identity. The
architecture terms map to these canonical fields:

| Architecture term | Canonical `ExecutionIdentity` field |
| --- | --- |
| `surface` | `surface` |
| `provider` | `provider` |
| `exactModel` | `model` |
| `executionId` | `execution_id` |
| `role` | `role` |

Phase 3A evolves the existing snake-case schema rather than introducing a
parallel camel-case schema:

```ts
type SurfaceId = string & { readonly __brand: "SurfaceId" };

interface ExecutionIdentity {
  readonly execution_id: string;
  readonly role: "builder" | "independent-reviewer" | "observer";
  readonly surface: SurfaceId;
  readonly model: string;
  readonly provider: string;
  readonly independence_domain: string;
  readonly effort: "low" | "medium" | "high";
}
```

`independence_domain` is a string matching `^[a-z][a-z0-9-]{1,63}$`.
Its normalization is Unicode NFKC, trim, ASCII lowercase, and replacement of
runs of non-alphanumeric characters with one hyphen; the normalized result
must match that regular expression or parsing fails. Provider and
`organization_id` values use a separate exact normalization function:
Unicode NFKC, trim, ASCII lowercase, and validation against
`^[a-z0-9][a-z0-9._-]{0,63}$`. No alias table or marketing-name inference is
performed. The adapter registration stores the canonical normalized provider,
`organization_id`, and `independence_domain`; the envelope provider and
independence domain MUST equal the registered values, and any mismatch is the
typed preflight failure `identity_mismatch`. Capability records copy those
canonical values and fail admission if they disagree with the registration.

`CliSurface = "claude-code" | "antigravity"` and `KNOWN_SURFACES` are retired
as admission authority. A `SurfaceId` is a normalized lowercase identifier
matching `^[a-z][a-z0-9-]{1,63}$`; accepting the string syntactically does not
make it eligible.

The registration authority is `packages/protocol/src/adapter-registry.ts` — a
closed, Founder-approved, compile-time map keyed by `SurfaceId`. Values include
authorized executable name and supported versions, identity and auth-readiness
probe configuration, non-interactive launch flags, environment allowlist
reference, `independence_domain`, and `organization_id`. Admission reads only
this registry. An architecture test asserts no other admission source exists.
Fixture surfaces register through the test-only harness path, never in the
production registry.

A production envelope admits a surface only when all of these are true:

- a Founder-approved adapter registration exists for the exact `SurfaceId` in
  `packages/protocol/src/adapter-registry.ts`;
- a fresh passing capability record exists for the current binary hash, CLI
  version, host, and time horizon;
- the envelope explicitly names its surface, provider, exact model, execution
  ID, role, independence domain, and effort;
- the envelope `independence_domain` equals the registered value for that
  `SurfaceId`; and
- the requested two-surface pair passes Section 9.2.

Fixture-only surface IDs are registered only inside
`test/phase3a/runtime-harness.ts`. They are invalid in production envelopes and
cannot be reached from the production CLI.

The envelope schema change is Phase 3A scope. Parsers, types, fixtures, adapters,
and tests migrate together; no compatibility coercion silently maps unknown
legacy values.

### 9.2 Exact two-surface pair eligibility

A Version 1 live pair is eligible only when:

1. the envelope contains exactly two executions with distinct execution IDs;
2. it contains exactly one `builder` and one `independent-reviewer`;
3. `observer` is not an active role in a Version 1 live pair;
4. the normalized providers differ;
5. the normalized `independence_domain` values differ;
6. the two executions do not share common review control, defined as equal
   `independence_domain` or equal `organization_id` on their capability
   records;
7. the independent reviewer is not the builder, did not produce the artifact
   under review, and cannot approve its own output;
8. both surfaces are individually admitted under Section 9.1; and
9. every envelope constraint is at least as strict as these global rules.

`PairConstraintsV1` is a required field of the envelope. An envelope without
it fails parsing with a typed error. There is no default-constraints path.

```ts
interface PairConstraintsV1 {
  readonly required_roles: readonly ["builder", "independent-reviewer"];
  readonly require_distinct_providers: true;
  readonly require_distinct_independence_domains: true;
  readonly prohibit_self_review: true;
  readonly allowed_surface_pairs?: readonly (
    readonly [SurfaceId, SurfaceId]
  )[];
}

interface TaskEnvelopeV1 {
  readonly protocol_version: typeof PROTOCOL_VERSION;
  readonly task_id: string;
  readonly authorization_reference: string;
  readonly repository: string;
  readonly branch: string;
  readonly worktree: string;
  readonly repository_fingerprint: RepositoryFingerprint;
  readonly executions: readonly ExecutionIdentity[];
  readonly initial_writer: string;
  readonly scope: TaskScope;
  readonly pair_constraints: PairConstraintsV1;
  readonly expires_at: string;
  readonly created_at: string;
  readonly envelope_hash: string;
}
```

`pair_constraints` joins the parser's known-key set. `allowed_surface_pairs`,
when present inside the object, narrows eligibility. It cannot override or
weaken a global rule. There is no Founder bypass field. A future exception
requires a new design and decision record, not an envelope value.

Matching is order-independent and uses a single canonical algorithm:
normalize both IDs, sort the two IDs lexicographically by their normalized
code points, and compare the resulting pair as an unordered set. The envelope
execution order is irrelevant. Each allowed pair must contain exactly two
distinct IDs; duplicate entries and reversed duplicates are parse failures.
Admission canonicalizes the requested `executions` pair and requires exact
membership in the canonical allowed-pair set. No positional
`executions[0]`/`executions[1]` interpretation is permitted.

### 9.3 Closed BrokerClient command and result contract

The identity key for client operations is `executionId`, not display surface
name. `output(executionId)` is the final signature. `surfaceId` is not used as a
parallel key. Every command includes a unique `commandId` and `sessionId`.

The supervisor constructs each in-process client already bound to an immutable
principal; callers cannot declare or change their own principal:

```ts
type ClientPrincipal =
  | { readonly kind: "founder_tui" }
  | { readonly kind: "execution"; readonly executionId: string };

interface BrokerClient {
  getSnapshot(): Promise<BrokerSnapshot>;
  snapshots(): AsyncIterable<BrokerSnapshot>;
  output(executionId: string): AsyncIterable<OutputFrame>;
  request(command: BrokerCommand): Promise<BrokerResult>;
  publish(event: BridgeEventV1): Promise<BrokerResult>;
  close(): Promise<void>;
}
```

The Founder TUI principal may request PTY input, resize, termination, and the
four governance actions below. An execution principal may call `publish()` only
when `event.sender_execution_id` equals its bound execution ID and every event
identity field matches the canonical envelope. It cannot issue Founder
governance commands. `publish()` is how adapters remain behind `BrokerClient`
without converting `BridgeEventV1` into a second command schema.

For `publish()`, `BrokerResult.commandId` equals `event.event_id`. When a
published event references a pending approval or ownership request, the broker
independently validates that exact referenced record is still pending,
unresolved, bound to the requested ID, and not masked by an incident. Ordinary
collaboration events do not require an unrelated pending approval. The existing
TUI governance-focus guard remains mandatory in Phase 3B; broker validation is
additional and does not replace it.

```ts
type BrokerCommand =
  | {
      readonly kind: "pty_input";
      readonly commandId: string;
      readonly sessionId: string;
      readonly executionId: string;
      readonly fencingToken: number;
      readonly bytes: Uint8Array;
    }
  | {
      readonly kind: "pty_resize";
      readonly commandId: string;
      readonly sessionId: string;
      readonly executionId: string;
      readonly fencingToken: number;
      readonly cols: number;
      readonly rows: number;
    }
  | {
      readonly kind: "pty_terminate";
      readonly commandId: string;
      readonly sessionId: string;
      readonly executionId: string;
      readonly reason: "founder_request" | "session_interrupt" | "rollback";
    }
  | {
      readonly kind: "approval_resolve";
      readonly commandId: string;
      readonly sessionId: string;
      readonly approvalId: string;
      readonly decision: "accept" | "reject";
    }
  | {
      readonly kind: "session_pause";
      readonly commandId: string;
      readonly sessionId: string;
      readonly reason: string;
    }
  | {
      readonly kind: "session_resume";
      readonly commandId: string;
      readonly sessionId: string;
    }
  | {
      readonly kind: "session_close";
      readonly commandId: string;
      readonly sessionId: string;
      readonly reason: string;
    };

type BrokerErrorCode =
  | "invalid_command"
  | "unauthorized"
  | "session_mismatch"
  | "execution_not_found"
  | "identity_mismatch"
  | "stale_fencing_token"
  | "session_not_writable"
  | "invalid_dimensions"
  | "approval_not_pending"
  | "incident_active"
  | "reconciliation_required"
  | "host_unavailable"
  | "ledger_write_failed"
  | "invariant_failure";

type BrokerResult =
  | {
      readonly ok: true;
      readonly commandId: string;
      readonly acceptedSnapshotSeq: number;
    }
  | {
      readonly ok: false;
      readonly commandId: string;
      readonly error: BrokerErrorCode;
      readonly detail: string;
    };
```

`pty_input` and `pty_resize` are legal only when the session phase is
`active`, the incident is null, the target execution state is `ready`, and
the exact current positive fencing token is supplied. In `starting`,
`paused`, `interrupted`, `closing`, or `closed`, they fail with
`session_not_writable`; an `active` snapshot carrying a non-null incident is
an invariant-visible incident state and fails with `incident_active`. A paused
session therefore retains its token for later pause-resume but cannot accept
PTY input or resize.

`pty_terminate` is the mechanical fail-closed command. It is legal during
`starting`, `active`, `paused`, and `interrupted` (and during
`closing` for cleanup), but never after `closed`; a closed session returns
`session_not_writable`. Terminating one required surface interrupts the whole
session.

`approval_resolve`, `session_pause`, `session_resume`, and
`session_close` are the complete Phase 3A governance command set and are
fixture-tested. Phase 3B wires the existing TUI to these variants; it does not
add an unreviewed command variant. Ownership requests and collaboration events
from execution surfaces remain typed `BridgeEventV1` inputs validated by the
broker; they are not `BrokerClient` commands.

`session_resume` is pause-recovery only: it is legal only when
`phase === "paused"`, with no reconciliation or approval fields. From every
other phase, including `interrupted`, it returns `session_not_writable`.
Pause does not invalidate the fencing token; resume does not increment it.
There is no same-session interrupt-recovery command.

`session_pause` is legal only from `active` with no incident;
`session_close` is legal only from `active` with no incident. If either is
requested while an active snapshot has a non-null incident, it returns
`incident_active`; from every non-active phase it returns
`session_not_writable`. During `interrupted`, `closing`, or `closed`,
observation (`getSnapshot`, `snapshots`, `output`) remains available.

The command error policy is therefore pinned, not an or-choice:

| Command family | Legal state | Failure state | Error |
| --- | --- | --- | --- |
| `pty_input`, `pty_resize` | active + ready + no incident + current token | any non-active phase | `session_not_writable` |
| `pty_input`, `pty_resize` | same | active + incident | `incident_active` |
| `pty_terminate` | starting/active/paused/interrupted/closing | closed | `session_not_writable` |
| `approval_resolve` | active + no incident | active + incident | `incident_active` |
| `approval_resolve` | active + no incident | any non-active phase | `session_not_writable` |
| `session_pause` | active + no incident | active + incident | `incident_active` |
| `session_pause` | active + no incident | any other phase | `session_not_writable` |
| `session_resume` | paused | any other phase | `session_not_writable` |
| `session_close` | active + no incident | active + incident | `incident_active` |
| `session_close` | active + no incident | any other phase | `session_not_writable` |

The `publish()` path has its own closed event/phase contract:

```ts
type PublishableCollaborationEventTypeV1 =
  | "message"
  | "action_request"
  | "action_accept"
  | "action_reject"
  | "artifact_publish"
  | "ownership_request"
  | "ownership_release"
  | "ownership_accept"
  | "ownership_reject"
  | "verification_result"
  | "review_verdict";
```

A normal collaboration event is accepted only in `active`, with no incident,
from a bound execution whose snapshot state is `ready`. In `starting`,
`paused`, `interrupted`, `closing`, or `closed`, it returns
`session_not_writable`. An active state with a non-null incident returns
`incident_active` and is itself handled as an invariant-triggered
interruption.

A published `incident` is a fail-closed control trigger, not ordinary
collaboration. It is accepted only from a bound, `ready` execution while the
session is `active` or `paused`. The broker validates `PublishedIncidentPayloadV1`
from Section 9.6 and atomically appends the original
`BridgeEventV1` plus its derived `session_interrupted` lifecycle record.
There is no snapshot or callback between those two appends. The reducer applies
only `session_interrupted` to lifecycle state, so an `active + incident`
snapshot cannot be emitted. The accepted `BrokerResult` is returned only after
the lifecycle record is durable and the snapshot phase is `interrupted`.
The broker then completes the mandatory invalidation/closing/closed sequence.

Legacy execution-authored `pause`, `resume`, and `session_close`
`BridgeEventV1` values are rejected by `publish()` with `unauthorized`;
only Founder `BrokerCommand` variants may cause those lifecycle changes.
A published `incident` outside `active` or `paused`, any normal event
outside `active`, and every publish during `interrupted`, `closing`, or
`closed` returns `session_not_writable`. If phase is still `active` or
`paused` but an incident is already non-null, the request returns
`incident_active`; after the first incident has transitioned the phase to
`interrupted`, a later incident returns `session_not_writable`. Unknown
event types or malformed incident payloads return `invalid_command`.

| `publish()` event family | Legal state | Failure state | Error |
| --- | --- | --- | --- |
| normal collaboration set above | active + ready + no incident | any non-active phase | `session_not_writable` |
| normal collaboration set above | active + ready + no incident | active + incident | `incident_active` |
| `incident` | active/paused + ready + no incident | starting/interrupted/closing/closed | `session_not_writable` |
| `incident` | active/paused + ready + no incident | active/paused + existing incident | `incident_active` |
| legacy `pause`/`resume`/`session_close` | none | every phase | `unauthorized` |
| unknown or malformed event | none | every phase | `invalid_command` |

When multiple failures apply, `publish()` validates in this fixed order:
schema/event type (`invalid_command`), bound principal and event identity
(`unauthorized`, `session_mismatch`, or `identity_mismatch`), reserved
legacy governance type (`unauthorized`), then phase/incident state. Thus a
malformed incident in a closed session is `invalid_command`, while a valid
incident in a closed session is `session_not_writable`.

`reconciliation_required` is produced only by next-start when a prior
session's required unclean-closure records have not yet been appended. Founder
`session_resume` never produces it.

Every unknown variant or unknown field fails with `invalid_command`; there is no
default coercion. `BrokerResult.detail` is sanitized and must not contain a
secret-marked environment value.

### 9.4 Required snapshot and output fields

The complete minimum snapshot contract is:

```ts
interface BrokerSnapshot {
  readonly sessionId: string;
  readonly snapshotSeq: number;
  readonly connected: boolean;
  readonly phase:
    | "starting"
    | "active"
    | "paused"
    | "interrupted"
    | "closing"
    | "closed";
  readonly taskEnvelopeHash: string;
  readonly task: TaskEnvelopeV1;
  readonly repositoryFingerprint: RepositoryFingerprint;
  readonly executions: readonly ExecutionSnapshot[];
  readonly activeWriterExecutionId: string | null;
  readonly fencingToken: number | null;
  readonly tokenState: "not_issued" | "valid" | "invalidated";
  readonly pendingApprovals: readonly PendingApprovalSnapshot[];
  readonly pendingTransfers: readonly PendingTransferSnapshot[];
  readonly permissionSummary: PermissionSummarySnapshot;
  readonly ownershipState: OwnershipState;
  readonly verification: VerificationSnapshot | null;
  readonly review: ReviewSnapshot | null;
  readonly incident: IncidentSnapshot | null;
  readonly eventLog: readonly LedgerEntrySnapshot[];
  readonly queueDepth: number;
  readonly ledgerSeq: number;
}

interface ExecutionSnapshot {
  readonly identity: ExecutionIdentity;
  readonly state:
    | "declared"
    | "host-starting"
    | "launching"
    | "attesting"
    | "ready"
    | "exited"
    | "failed";
  readonly hostPid: number | null;
  readonly childPid: number | null;
  readonly processGroupId: number | null;
  readonly executablePath: string;
  readonly executableSha256: string;
  readonly exitCode: number | null;
  readonly exitSignal: string | null;
}

interface OutputFrame {
  readonly sessionId: string;
  readonly executionId: string;
  readonly outputSeq: number;
  readonly bytes: Uint8Array;
}

interface PendingApprovalSnapshot {
  readonly id: string;
  readonly type: string;
  readonly actor: string;
  readonly taskId: string;
  readonly repositoryFingerprint: RepositoryFingerprint;
  readonly scope: string;
  readonly timestamp: string;
  readonly state: "pending" | "approved" | "rejected" | "expired";
}

interface PendingTransferSnapshot {
  readonly id: string;
  readonly from: string;
  readonly to: string;
  readonly reason: string;
  readonly fencingToken: number;
  readonly timestamp: string;
}

interface PermissionSummarySnapshot {
  readonly allowedReadPaths: readonly string[];
  readonly allowedWritePaths: readonly string[];
  readonly allowedCommandCategories: readonly string[];
  readonly allowedEgressDestinations: readonly string[];
  readonly dataClass: string;
}

interface VerificationSnapshot {
  readonly result: "pass" | "fail" | "warning" | "pending";
  readonly detail: string;
  readonly verifiedBy: string;
  readonly timestamp: string;
}

interface ReviewSnapshot {
  readonly decision:
    | "approved"
    | "changes-requested"
    | "rejected"
    | "pending";
  readonly comments: string;
  readonly reviewedBy: string;
  readonly timestamp: string;
}

interface IncidentSnapshot {
  readonly id: string;
  readonly reason: string;
  readonly timestamp: string;
  readonly severity: "low" | "medium" | "high";
}

interface LedgerEntrySnapshot {
  readonly seq: number;
  readonly type: string;
  readonly actor: string;
  readonly fencingToken: number | null;
  readonly hash: string;
  readonly timestamp: string;
}
```

`phase === "active"` is produced only by reducing `session_activated` at
initial startup or `session_resumed` from `paused`. `phase ===
"interrupted"` is transient and terminal-bound. The reducer reaches
`closing` only from `session_closing` and reaches `closed` only from
`session_closed`, `session_abort`, or `session_unclean_closure`. No
governance command is accepted during `interrupted` or `closing`.
`"reconciling"` is not a Phase 3A command or snapshot phase.

```ts
type OwnershipState =
  | "free"
  | "owned"
  | "transfer-requested"
  | "sender-released"
  | "receiver-validating"
  | "rejected";
```

`ownershipState` is the existing Phase 2 closed union, unmodified. There is no
`transferPhase` field. Any display label is derived by the consumer from
`ownershipState`.

These projections deliberately preserve the Phase 2 truth fields while adding
session identity, sequencing, launch facts, and explicit token state. They are
immutable plain data produced from ledger/broker truth, not terminal prose.

### 9.5 Fencing-token issuance, activation, and invalidation

No fencing token exists during pure preflight or initial transactional
`starting`. `fencingToken` is `null` and `tokenState` is `not_issued`.

The initial token is issued only after both PTY hosts and children are launched,
their identities are attested, required adapters are ready, and the broker is
prepared to activate the complete pair. Startup appends exactly:

1. `fencing_token_issued` with value `1`; then
2. `session_activated` naming the complete ready execution set.

The reducer leaves phase `starting` after the first record and changes it to
`active` only when it reduces the second. The first `active` snapshot is
published only after both records are durable. If token issuance fails, no
token becomes valid. If activation append fails after token issuance, rollback
appends `fencing_token_invalidated` and `session_abort`; no `active`
snapshot is ever exposed.

Every ownership transfer increments the token and appends a new
`fencing_token_issued` event before the successor writer may send bytes. A
transfer-time issuance changes the token but does not change phase.

Fencing tokens are scoped to one `session_id`; the uniqueness key is
`(session_id, fencing_token)`. Pause does not invalidate or increment the
token. Interrupt and close both make it unusable and append
`fencing_token_invalidated`. No in-session re-issue exists after interruption.
A successor session begins again at value `1`; cross-session monotonicity is
not required.

Token invalidation does not itself imply a single phase. A valid replay may
contain an invalidated token only in `interrupted`, `closing`, or `closed`.
It is invalid in `starting`, `active`, or `paused`, except for the
recognized incomplete-start rollback prefix described below. The reducer never
infers closure merely from token state.

For interruption, the in-memory token becomes unusable before the broker
attempts the durable sequence. The durable order is
`session_interrupted → fencing_token_invalidated → session_closing →
session_closed`. For Founder close, the durable order is
`session_closing → fencing_token_invalidated → session_closed`.
`session_closed` is appended only after governed processes are gone.

Next-start reconciliation completes durable prefixes deterministically:

| Durable prior tail | Required next-start completion |
| --- | --- |
| `session_open` with no activation | append `session_abort`; if a token was issued, append `fencing_token_invalidated` first |
| `session_interrupted` only | append `fencing_token_invalidated` when a valid token existed, then `session_closing`, then `session_closed` |
| `session_interrupted → fencing_token_invalidated` | append `session_closing`, then `session_closed` |
| interruption prefix through `session_closing` | verify no governed process remains, then append `session_closed` |
| Founder-close prefix at `session_closing` | append missing `fencing_token_invalidated`, verify no governed process remains, then append `session_closed` |
| open/active prior session with no typed interruption or closing record | append missing invalidation, then `session_unclean_closure` |

Prefix completion reuses the original incident ID and reason code and never
invokes Founder `session_close`. If the durable order is impossible—for
example, `session_closed` precedes `session_closing`—replay fails with a
typed reconciliation error. `session_unclean_closure` is used only when no
typed interruption/closing prefix exists; it is not appended after a completed
typed interruption sequence.

### 9.6 Existing ledger, typed lifecycle events, and one reducer

Phase 3A extends the existing `bun:sqlite` append-only hash-chained ledger. It
does not create a second session database or a parallel event store.

Execution collaboration remains `BridgeEventV1`. Broker lifecycle truth uses
a second closed protocol record in the same ledger—not a fabricated execution
identity:

```ts
type SessionLifecycleEventTypeV1 =
  | "session_open"
  | "session_abort"
  | "session_unclean_closure"
  | "session_activated"
  | "session_paused"
  | "session_resumed"
  | "session_closing"
  | "session_closed"
  | "session_interrupted"
  | "approval_resolved"
  | "fencing_token_issued"
  | "fencing_token_invalidated";

type InterruptionReasonCodeV1 =
  | "child_failure"
  | "adapter_failure"
  | "pty_host_failure"
  | "host_command_deadline_expired"
  | "authentication_expired"
  | "identity_mismatch"
  | "output_sequence_invariant_failed"
  | "snapshot_sequence_invariant_failed"
  | "ledger_write_failed"
  | "broker_invariant_failed"
  | "containment_failed"
  | "execution_reported_incident";

interface PublishedIncidentPayloadV1 {
  readonly incident_id: string;
  readonly reason: string;
  readonly severity: "low" | "medium" | "high";
}

interface SessionInterruptedPayloadV1 extends PublishedIncidentPayloadV1 {
  readonly source_event_id: string | null;
  readonly reported_by_execution_id: string | null;
}

type LifecyclePayloadByTypeV1 = {
  readonly session_open: {
    readonly authorization_reference: string;
    readonly execution_ids: readonly string[];
  };
  readonly session_abort: { readonly abort_reason: string };
  readonly session_unclean_closure: {
    readonly detected_at_startup: true;
    readonly last_durable_event_id: string | null;
  };
  readonly session_activated: {
    readonly execution_ids: readonly string[];
    readonly readiness_snapshot_seq: number;
  };
  readonly session_paused: FounderCommandPayloadV1;
  readonly session_resumed: FounderCommandPayloadV1;
  readonly session_closing: SessionTerminalPayloadV1;
  readonly session_closed: SessionTerminalPayloadV1;
  readonly session_interrupted: SessionInterruptedPayloadV1;
  readonly approval_resolved: FounderCommandPayloadV1 & {
    readonly approval_id: string;
    readonly resolution: "approved" | "rejected";
  };
  readonly fencing_token_issued: {
    readonly writer_execution_id: string;
  };
  readonly fencing_token_invalidated: {
    readonly invalidation_reason:
      | "interruption"
      | "founder_close"
      | "rollback";
    readonly incident_id: string | null;
  };
};

interface FounderCommandPayloadV1 {
  readonly command_id: string;
  readonly authorized_by: "founder";
}

type SessionTerminalPayloadV1 =
  | (FounderCommandPayloadV1 & {
      readonly closure_kind: "founder";
      readonly incident_id: null;
    })
  | {
      readonly closure_kind: "interruption";
      readonly incident_id: string;
      readonly reason_code: InterruptionReasonCodeV1;
    };

type SessionLifecycleEventBaseV1<K extends SessionLifecycleEventTypeV1> = {
  readonly protocol_version: typeof PROTOCOL_VERSION;
  readonly event_id: string;
  readonly session_id: string;
  readonly event_type: K;
  readonly actor: "madbridge";
  readonly task_envelope_hash: string;
  readonly repository_fingerprint: RepositoryFingerprint;
  readonly fencing_token: number | null;
  readonly reason_code: K extends "session_interrupted"
    ? InterruptionReasonCodeV1
    : string | null;
  readonly created_at: string;
  readonly previous_event_hash: string;
};

type SessionLifecycleEventV1 = {
  [K in SessionLifecycleEventTypeV1]:
    SessionLifecycleEventBaseV1<K> & {
      readonly payload: LifecyclePayloadByTypeV1[K];
    };
}[SessionLifecycleEventTypeV1];

type LedgerEventV1 = BridgeEventV1 | SessionLifecycleEventV1;
```

The lifecycle event set is exactly those twelve values. The validator requires
`session_interrupted.reason_code` to be non-null and requires its payload to
match `SessionInterruptedPayloadV1`. Interruption-kind
`session_closing`/`session_closed` records must carry the same incident ID
and reason code as that `session_interrupted`; their top-level
`reason_code` equals the terminal payload reason code. Founder-kind terminal
records use `reason_code: null`. `session_activated.execution_ids` must
equal the complete set of envelope execution IDs; order is irrelevant and
duplicates are invalid. No `BridgeEventV1` is minted with a fabricated sender.

`IncidentSnapshot` is derived only from `session_interrupted`:

- `id = payload.incident_id`;
- `reason = payload.reason`;
- `timestamp = event.created_at`; and
- `severity = payload.severity`.

The optional originating `BridgeEventV1 incident` is evidence of who reported
the problem; it does not populate `IncidentSnapshot` and does not mutate
lifecycle state. Its event ID and sender execution ID must equal
`source_event_id` and `reported_by_execution_id` in the derived lifecycle
payload. Supervisor-originated interruptions set both fields to `null`.

The broker appends each lifecycle record and receives its ledger sequence
before exposing the resulting state in any snapshot. For a published execution
incident, the source `BridgeEventV1` and derived `session_interrupted` record
are one SQLite transaction, and no snapshot is exposed between them.
`BrokerResult.acceptedSnapshotSeq` follows the durable lifecycle append. A
failed append is `ledger_write_failed` and still triggers mechanical teardown.

Normative `reduceLedgerEvent` mapping:

| Lifecycle event | Reducer precondition and effect |
| --- | --- |
| `session_open` | create session; phase `starting`; token `not_issued`/`null` |
| `fencing_token_issued` | require initial `starting` or active ownership transfer; set token/value valid; do not change phase |
| `session_activated` | require `starting`, valid token, and complete ready execution set; phase `active` |
| `session_paused` | require `active`; phase `paused`; token unchanged |
| `session_resumed` | require `paused`; phase `active`; token unchanged |
| `approval_resolved` | require `active`; remove matching pending approval; record resolution |
| `session_interrupted` | require `active` or `paused`; populate incident exactly as above; phase `interrupted`; token unusable in memory |
| `fencing_token_invalidated` | require recognized rollback/interrupt/close prefix; set token `invalidated` and unusable; do not infer phase |
| `session_closing` | require `active` for Founder close or `interrupted` for interruption; phase `closing`; token unusable |
| `session_abort` | require incomplete `starting`; phase `closed` (aborted); token unusable |
| `session_closed` | require `closing` and matching closure kind/incident ID; phase `closed`; token unusable |
| `session_unclean_closure` | require next-start detection with no typed terminal prefix; phase `closed` (unclean); token unusable |

No normal `BridgeEventV1` changes phase, incident, or fencing state. A
published execution `incident` is paired atomically with
`session_interrupted`; only the lifecycle member changes state. Legacy
execution-authored `pause`, `resume`, and `session_close` are rejected by
the Phase 3A `publish()` contract and remain historical data only.

Live application and replay are single-sourced. The canonical reducer is
`packages/ledger/src/rebuild.ts:reduceLedgerEvent`; the broker calls that exact
function after each successful append/transaction, and
`packages/broker/src/reconciliation.ts` delegates to it. Neither broker module
may maintain a second transition table, synthesize first activity into
`active`, or mutate lifecycle state ad hoc.

Unknown lifecycle types, impossible ordering, mismatched incident IDs, and
invalid phase preconditions are typed reconciliation failures in both live
apply and replay; there is no silent default branch.

Both union members use the existing `events` table, sequence, canonical JSON,
previous hash, event hash, and chain head. `Ledger.append()` evolves from
`BridgeEventV1` to `LedgerEventV1`; the incident pair uses an atomic
multi-append transaction on that same chain. Schema migration may add indexes
or typed projections only if the implementation plan names them; it may not
create an authority-bearing second chain.

`session_open` is the durable boundary for rollback and retention:

- before `session_open`, a newly created session directory may be removed;
- after `session_open`, the directory persists and receives
  `session_abort` for incomplete startup when writing remains possible; and
- capability records are never deleted by startup rollback.

Next-start reconciliation follows the prefix table in Section 9.5. It completes
a recognized typed interruption/closing prefix with the missing lifecycle
records. It uses `session_unclean_closure` only when no typed terminal prefix
exists. Nothing calls Founder `session_close` during reconciliation.

### 9.7 PTY-host production artifact and spike primitive

The private internal PTY executable is named `madv-pty-host`, with source entry
point `packages/pty-host/src/main.ts`. It is installed or invoked only by the
supervisor process and is not a `madbridge`/`madv-tui` subcommand, not listed in
operator help, and not a session-start entry point.

`madv-pty-host` cannot construct a broker, ledger, adapter set, task envelope,
or TUI. It accepts no executable path or launch authority from ordinary command
line flags or ambient environment. It requires the inherited private control
channel and one validated launch frame from the broker module. Direct invocation
without that channel fails before PTY or child creation.

The pre-written Bun spike candidate is `Bun.Terminal`, using its macOS PTY
implementation. The spike must prove every Section 3.6 criterion before the
production PTY host is built. FFI `posix_openpt`, `node-pty`, another native
dependency, or a pipe fallback is not an implementation choice. Any alternative
requires a stop, a written evidence report, and a new Founder-approved design
amendment.

### 9.8 Fixed PTY-host response deadlines

This table is the sole normative deadline table. Sections 3.6 and 6.4 measure
against it and do not restate independent numbers.

| Bound | Value |
| --- | --- |
| Host acknowledgement of any command, or first command-specific fact | 250 ms |
| Escalation initiation after missed acknowledgement or lifeline loss | 500 ms |
| Child grace after a **responsive** host confirms `SIGTERM` | 2 s |
| Unresponsive or `SIGSTOP` host | no grace; direct PGID path |
| Outer bound: all governed processes gone | 5 s |

Every broker command frame requires a matching host acknowledgement or first
command-specific fact within 250 ms. For termination, the host must report
`termination_started` within 500 ms of the broker's command.

If the 250 ms acknowledgement deadline expires, the supervisor closes host
stdin and starts the host-bypassing escalation ladder. Direct PGID kill and
host kill must be initiated no later than 500 ms after the original command.
The two-second child grace applies only after a responsive host confirms
`SIGTERM`; an unresponsive or `SIGSTOP` host does not earn an additional
grace period. Every governed process must be gone within five seconds.

All deadlines use a monotonic clock and are reported as observed durations in
dual-host evidence.

### 9.9 `init` and CLI truth-surface disposition

Phase 3A replaces repo-local initialization. `init` becomes an optional
host-storage initializer using the Section 5 validator. It:

- resolves passwd home and validates `$HOME` consistency;
- previews the default root or `MADV_STORAGE_DIR` override;
- previews only the root, `sessions/`, and `capability/` directories;
- creates those directories as `0700` only after Founder confirmation;
- writes no repository-local config, backup, `.madv-runtime`, session
  directory, ledger, artifact, or evidence file; and
- is not required for transactional startup, which may create the same root
  through the same validator.

Current `.madv-runtime` data is legacy user data. Phase 3A does not delete,
migrate, or treat it as live automatically. A future migration requires a
separate Founder-authorized procedure.

The following legacy assertions are intentionally replaced and must be updated,
not skipped or hidden:

- Phase 2 `cli.test.ts` assertions for `start`, `status`, `pause`, `resume`, and
  `close`;
- `init` tests expecting `.madv-runtime` creation;
- help text claiming `start` launches a session;
- help text or JSON claiming socket-backed external control; and
- tests treating socket-file existence as broker liveness.

Help must state that `start` is present but live runtime is not certified;
`status`/`pause`/`resume`/`close` are reserved external-control names; and
`doctor`, `init`, `verify-ledger`, and `export-evidence` retain their scoped
responsibilities. Exact placeholder output remains Section 4 authority.

### 9.10 Legacy broker, socket, MCP, adapter, and PTY disposition

| Existing item | Phase 3A disposition |
| --- | --- |
| `packages/broker/src/socket.ts` and its direct unit test | Retain as dormant historical scaffolding and direct isolated test only. Remove public re-export and every production/harness import. It may create no path during the 3A suite except inside its explicit isolated legacy unit test. |
| `BrokerSocket` inside `createInMemoryBrokerForTest()` | Remove. The legacy fixture may remain only after all socket imports, runtime/socket fields, and side effects are severed. Rename it to make test-only status explicit if required by the implementation plan. |
| `packages/broker/src/index.ts` socket exports | Remove in 3A. Production consumers cannot reach `BrokerSocket`, `MADV_RUNTIME_DIR`, or `MADV_SOCKET_PATH` through `@madventures/broker`. |
| `packages/broker/src/pty-manager.ts` | Retire from production and remove its public export. It is pipe-based and cannot satisfy PTY containment. If Phase 2 focus tests need a byte-routing fake, move the minimum fake under test fixtures; it may not spawn a real process or be called a PTY. |
| `packages/broker/src/mcp-server.ts` tool catalog | Quarantine from Phase 3A production and harness startup graphs. Its schema tests may remain as legacy protocol tests. It is not the `BrokerClient` or PTY-host transport. Live agent-to-broker MCP transport requires Phase 3B certification. |
| Adapter `mcp-config.ts` and `unix://madbridge.sock` previews | Quarantine and remove from adapter launch/readiness paths. They must not write provider config or advertise a nonexistent socket. Any future MCP activation is Phase 3B scope with preview and Founder approval. |
| Current adapter `launch()` methods | Do not use for Phase 3A child ownership. They are replaced by broker-authorized PTY-host launch descriptors. Retain only attestation/config-independent logic that passes the new adapter contract. Random pseudo-PIDs are test data, never launch facts. |
| `createInMemoryBrokerForTest()` legacy tests | Preserve behavioral coverage by adapting the fixture or replacing it with narrower pure fixtures. They do not certify the Phase 3A runtime. The full suite floor remains binding. |
| `packages/broker/src/session-machine.ts` `interrupted` / `reconciling` transitions | Named replacement. Update to Phase 3A semantics: `interrupted` is terminal-bound; `"reconciling"` is removed from the Phase 3A surface; `resume` is legal only from `paused`. Existing tests are replaced, not silently skipped. |
| `packages/ledger/src/rebuild.ts` and `packages/broker/src/reconciliation.ts` | Named replacement. Both live apply and next-start replay delegate to the single Section 9.6 reducer; no duplicate `resumeSession` or rebuild transition table remains. `session_resumed` does not increment the token. Unknown lifecycle types fail live apply and replay. Existing tests are replaced, not silently skipped. |
| Phase 2 tests of `interrupted → reconciling → active` | Named replacement. Update to Phase 3A interrupt-and-closure semantics. Counts toward no-test-count-regression via replacement tests. |

The architecture test distinguishes a direct isolated legacy socket unit test
from a startup-graph import. Dormant means unreachable from production and the
Phase 3A harness, not deleted history.

### 9.11 Harness entry point and production separation

The only Phase 3A runtime harness entry is
`test/phase3a/runtime-harness.ts`. Test files may import it directly. No source
under `apps/` or a published package index may import or dynamically resolve it.

The harness accepts only controlled fixture adapters and disposable validated
storage roots. It cannot admit a real provider surface or remove the production
`start` gate. Architecture tests search static imports, dynamic imports,
filesystem path construction, command dispatch, environment switches, and
argument parsing for alternate reachability.

### 9.12 Secret-environment wording

Phase 3A does not claim a forwarded secret is unread. In Bun/JavaScript, an
allowlisted value is present in the process environment map. The enforceable
claim is:

> Secret-marked environment values are forwarded only to their authorized host
> and child. MADVentures runtime code does not intentionally log, persist, or
> export their values. Diagnostics and evidence apply the approved redaction
> rules.

The agent/provider-output residual in Section 5.6 remains. Tests may prove the
absence of intentional logging/persistence/export paths and successful
redaction; they may not claim that application code is physically incapable of
reading its own process environment.

### 9.13 Live attestation eligibility

The phrase “where the CLI exposes a passing primitive” does not waive live
re-attestation. A surface without a machine-verifiable primitive for the actual
session is ineligible for a live pair. It may be investigated and represented
by controlled fixtures, but it cannot be certified, presented as eligible, or
started live.

At the Phase 3A baseline, the existing Antigravity adapter fails closed because
no qualifying exact-model primitive has been established. Antigravity remains
ineligible until a fresh investigation produces passing evidence under Section
2.2. No configured model string, flag, provider file, or marketing output can
substitute.

### 9.14 F1–F6 contract corrections

This subsection is the authoritative correction index for the six findings closed
by this revision:

1. **Interrupt closure:** `session_interrupted`,
   `fencing_token_invalidated`, `session_closing`, and `session_closed` are
   the required ordered durable sequence; interruption is terminal-bound and
   requires a new envelope.
2. **Single reducer:** live broker application and next-start replay call the
   same `packages/ledger/src/rebuild.ts:reduceLedgerEvent`; broker
   reconciliation has no duplicate transition logic.
3. **Pair matching:** allowed pairs are canonicalized as unordered,
   lexicographically sorted normalized-ID pairs; envelope execution order never
   selects a different rule.
4. **PTY legality:** input/resize require active + ready + no incident + current
   token; termination is the only mechanical command admitted during teardown
   phases.
5. **Normalization:** provider and organization identifiers use the pinned NFKC,
   trim, ASCII-lowercase, validated algorithm; no aliases or inference.
6. **Interrupted errors:** the command matrix above assigns
   `session_not_writable` or `incident_active` by exact phase/incident state,
   with no unpinned alternative.

These corrections do not reopen the approved supervisor, socket dormancy,
two-surface, no-substitution, storage, PTY-host, or production-start-gate
architecture. They close authority-bearing contracts so the implementation plan
need not invent behavior.

### 9.15 N1–N3 and remaining F4 contract corrections

This revision closes the re-review findings against
`8564fcd1759c9b13216ada24873e6349666fcc2b`:

1. **N1 — replayable active and closing phases:** `session_activated`
   exclusively produces initial `active`; `session_resumed` produces
   pause-recovery `active`; and `session_closing` exclusively produces
   `closing`. No first-activity synthesis or ad-hoc mutation remains.
2. **N2 — durable prefix completion:** token invalidation is legal in
   `interrupted` as well as `closing`/`closed`; Section 9.5 defines exact
   next-start completion for every recognized startup, interruption, and close
   prefix.
3. **N3 — typed interruption:** `session_interrupted` has a closed reason-code
   union and typed payload, maps exactly to `IncidentSnapshot`, and a
   published execution incident is atomically paired with that lifecycle
   record so `active + incident` cannot be emitted.
4. **Remaining F4 — `publish()` legality:** the closed event set, phase
   conditions, incident handling, error precedence, and rejection of legacy
   execution pause/resume/close events are pinned in Section 9.3.

These corrections preserve the approved supervisor, socket dormancy,
two-surface, no-substitution, storage, PTY-host, and production-start-gate
architecture. They authorize no plan or implementation.

### 9.16 Approval semantics for review and planning

Merge-gate item 11 requires an **approving** Tier-2 verdict for the exact
candidate SHA. A `REQUEST_CHANGES`, rejection, inconclusive verdict, or review
of another SHA does not satisfy the gate.

This condition has been satisfied: the Founder approved this addendum and
`DEC-20260812-01` together, as one instrument, at PR #9 head
`c23cd46d501813185087c27cbe81fd89b9ee3a33` (merged as
`aa16032c56fdf6c7105e99b1765ed9365d605bf4`), confirmed by
[`DEC-20260831-01`](../../decisions/DEC-20260831-01-phase-3a-authority-drift-reconciliation.md)
clause 1 (2026-08-31). This section's NO-GO gate is not standing policy —
implementation planning proceeded (the Phase 3A implementation plan was
written and separately approved at PR #10; see `DEC-20260831-01` clause 2).
Implementation itself remains separately gated behind per-task Founder
authorization, per that plan.

> Original text, preserved verbatim: "This amended specification remains
> NO-GO for implementation planning until the Founder approves both this
> addendum and `DEC-20260812-01` as one instrument. After that approval, the
> next authorized action is to write the Phase 3A implementation plan.
> Implementation remains separately gated behind approval of that plan."
