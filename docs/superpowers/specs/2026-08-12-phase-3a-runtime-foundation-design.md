# MADVentures TUI — Phase 3A Production Runtime Foundation

**Status:** Founder-approved design; pending Founder review of this assembled written specification  
**Date:** 2026-08-12  
**Repository:** `MADVenturesLLC/madventures-tui`  
**Baseline branch:** `main`  
**Baseline SHA:** `0b942771fc07e5eb05203b1d3d641d3e8ad101f1`  
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
active surfaces in Version 1. Each envelope declares a collection of:

```ts
interface SurfaceIdentity {
  surface: string;
  provider: string;
  exactModel: string;
  executionId: string;
  role: string;
}
```

One named constraint, `MAX_ACTIVE_SURFACES_V1 = 2`, and one envelope validator
enforce `surfaces.length === MAX_ACTIVE_SURFACES_V1`. No other module may
encode cardinality.

Downstream supervisor, broker, ledger, lifeline, adapter, capability, and
evidence modules iterate over `SurfaceIdentity[]`. They must not use paired
tuple types, `surfaceA`/`surfaceB` identifiers, or independent literal-two
checks. Pair-level validation still evaluates the complete requested pair for:

- provider disjointness;
- compatible roles;
- independent-review eligibility; and
- any envelope-specific pairing constraints.

An architecture test asserts the enumerable form of this rule:

- no two-tuple surface types outside the centralized validator;
- no `surfaceA`/`surfaceB`, `adapterA`/`adapterB`, or equivalent paired names;
- no literal cardinality check outside `MAX_ACTIVE_SURFACES_V1`; and
- downstream orchestration iterates over the collection.

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
2. validates exactly two declared `SurfaceIdentity` records;
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
7. perform live-session re-attestation where the CLI exposes a passing
   primitive;
8. launch adapters; and
9. in Phase 3B only, present the TUI after every required component is healthy.

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
Where possible, the live process re-attests. A binary that truthfully attests
one identity during the probe and lies during the governed session remains a
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

The broker invalidates the fencing token, appends a typed incident and closure
when durable writing remains possible, terminates all governed process groups,
and closes every client stream. Recovery requires reconciliation and a new
Founder-authorized envelope.

When durable writing is impossible—such as disk failure or supervisor
`SIGKILL`—the next startup's ledger reconciliation detects and records an
unclean closure. Reconciliation is the record of last resort.

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
3. Host waits at most two seconds.
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

Termination initiation must be observed within 500 ms of lifeline loss, the
grace period is two seconds, and all governed processes must be gone within
five seconds. Reports record observed values rather than merely saying “pass.”

One adaptive TUI will later run on both hosts. Machine-specific UI forks are
out of scope.

## 4. BrokerClient, command surface, and production gates

### 4.1 Client contract

The Phase 3A contract is:

```ts
interface BrokerClient {
  getSnapshot(): Promise<BrokerSnapshot>;
  snapshots(): AsyncIterable<BrokerSnapshot>;
  output(surfaceId: string): AsyncIterable<OutputFrame>;
  request(command: BrokerCommand): Promise<BrokerResult>;
  close(): Promise<void>;
}

interface BrokerSnapshot {
  sessionId: string;
  snapshotSeq: number;
  // Remaining state is immutable plain data.
}

interface OutputFrame {
  sessionId: string;
  surfaceId: string;
  outputSeq: number;
  bytes: Uint8Array;
}
```

Snapshots are state projections; PTY throughput uses the separate ordered byte
stream. `snapshotSeq` is monotonic per session. `outputSeq` is monotonic per
session and surface. Session mismatch, duplicate, regression, or gap is a typed
invariant failure. In the in-process client, an unexplained gap interrupts the
session rather than being hidden. Replay and reconnect are deferred with the
external transport.

`BrokerCommand` is a closed discriminated union. It includes exact-byte input,
resize, typed governance actions, and authorized session close. Input and
resize bind to `sessionId`, `surfaceId`, execution identity, and the current
fencing token so stale clients cannot write.

`BrokerClient.close()` releases only that client's subscriptions and resources.
It does not terminate the governed session. Session termination is a separate
typed broker command with its own authorization.

No raw handle, process object, ledger object, callback carrying mutable state,
or policy implementation crosses this boundary. The PTY-host frame protocol is
private infrastructure and is not the future public daemon protocol.

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

Each adapter has a versioned configuration defining:

- authorized executable and supported versions;
- identity and auth-readiness probes;
- required non-interactive launch flags;
- an exact child-environment allowlist;
- which allowed variables are `secret: true`;
- authentication-failure detection; and
- capability and review limitations.

Forwarding is not custody. A secret-bearing provider variable may be forwarded
from the ambient host into an allowlisted child without the supervisor
intentionally reading, logging, or persisting its value. Secret-marked values
are redacted from diagnostic output, errors, environment reports, and evidence.
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
- `SurfaceIdentity` completeness and uniqueness;
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
- the documented TUI exemption and no broader exemption;
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
death times. Passing requires termination initiation within 500 ms, a two-second
grace period, and complete removal within five seconds.

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
11. Gemini Antigravity issues a Tier-2 verdict for the exact candidate SHA.
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
