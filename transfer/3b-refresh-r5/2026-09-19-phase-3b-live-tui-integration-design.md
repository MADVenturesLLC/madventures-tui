# Phase 3B — Live TUI Integration and Certification: Design Specification

Status: **DRAFT, revision 5 (2026-11-08) — awaiting Founder approval.** This
document authorizes no implementation (Phase 3A design §8: "No implementation is
authorized by this document alone"). Implementation begins only after the
Founder approves this specification **and** the implementation plan
(`docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md`) by a
signed act that names the SHA-256 of both, and then only slice by slice.

Obeys: `docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md`
(the "3A design"). Phase 3B is defined there (§0.1): *connect the existing TUI
to real snapshots, output frames, and typed actions; certify an eligible live
pair; remove the production start gate through a reviewed certification event.*
The §6.9 gate-removal evidence list is binding and is the scope of record. Where
this document and the 3A design conflict, the 3A design wins and the conflict is
escalated to the Founder.

## 0A. Ratification history

### 0A.1 Commission (2026-09-19, verbatim)

> "For Phase 3B: authorize the written design spec and implementation plan
> only, drafted by the GLM build, no wiring and no gate edits. The plan must
> name exact base SHAs per slice, include the M26 dual-host reports as the
> first evidence track, define the suite-count floor and where it's proven,
> carry the §7.7/§7.8 qualification record for GLM, and end at the exact-SHA
> Tier-2 verdict plus my authorization. Present it for my approval before any
> execution."

### 0A.2 Pair choice (2026-11-06)

In the drafting conversation of 2026-11-06 the Founder answered the plan's open
item on the eligible pair: "yes, Claude Code plus madv-surface, start the 3B
refresh." That answer commissioned revision 2. It becomes a ruling only when
the Founder's approval act states it.

### 0A.3 What revision 2 changed

Revision 1 (2026-09-19, folded 2026-09-21) was drafted against `main` at
`a0cbecbefe31a470008acf4e22dec49f750e3261`. Since then:

1. Phase 3A M26 ran. The two host certification reports are on `main`
   (`docs/verification/2026-08-12-phase-3a-host-certification-macbook.md` and
   `…-ubuntu.md`, both at candidate commit
   `ffcecaf9dbb6b2de3b406e475825137ddfe726b7`, merged in pull request 225).
   Task 59 merged at `a7dbc7def0cd67568b2765c894ff91894707801c` (pull request
   228) under `DEC-20261106-02`, the Phase 3A final merge review, and
   `DEC-20261107-01` records Phase 3A as merged, not certified.
   Evidence Track 0 is therefore no longer work of this phase; it is an input.
2. The certification hosts are the Founder's MacBook and Ubuntu PC (3A design
   §1.5, `DEC-20261013-04`), not two Macs.
3. The live pair is Claude Code plus madv-surface (§0A.2). Antigravity cannot be
   that second member: 3A design §9.13 makes it ineligible for a live pair
   because it has no machine-verifiable identity primitive for the actual
   session.
4. The builders and reviewers in use are those named by each Founder act, not a
   GLM build on ZCode CLI.
5. Phase 3A acts carry named items to "the first Phase 3B act". The plan (§2D)
   places each one.

### 0A.4 Review of revision 2 and the Founder's drafting choices (2026-11-07)

An independent review of revision 2, by a Codex session whose model is not made
by Anthropic, returned CHANGES REQUIRED with nine blocking and five advisory
findings (report SHA-256
`e0be01385fa25b19a5b3903aa282f3983c593aab4f58858fdbe8a3bc095de3dc`). The
Founder's command checked its 65 quoted blocks against their files and its 120
logs against their hashes, and every check passed. Revision 3 answers each
finding; the plan's §0C maps them.

In the drafting conversation of 2026-11-07 the Founder chose, for this
revision: the `minimax` profile of madv-surface (§1.1 item 1); a separate early
slice that amends the capability record for Linux before any Linux record is
written (plan slice H2); and no approval workflow in Phase 3B (§1.2). Each
becomes a ruling only when the Founder's approval act states it. The
certification route of §5 is the drafting assistant's answer to the review's
finding on gate-removal order.

### 0A.5 Review of revision 3 (2026-11-08)

A second independent review, of revision 3, by a fresh Codex session, returned
CHANGES REQUIRED with four blocking and two advisory findings (report SHA-256
`b139a50a1f986da62b768d1d99cff01469425cfa31a85ae822c874e8d701819f`). The
reviewer declared its own report void under the brief's logging rule, because
one command's output escaped its log; it is not an approving or a counting
review. The drafting assistant checked the factual basis of each blocking
finding against the files, and revision 4 answers all six; the plan's §0C maps
them. A fresh review of revision 4 follows.

### 0A.6 Review of revision 4 (2026-11-08)

A third independent review, of revision 4, by a fresh Codex session, returned
CHANGES REQUIRED with two blocking and three advisory findings (report SHA-256
`2cb169a93bc0946ef5cf9a143ad13e35c25587670ff977594367a53b8a2ef52b`). It
reported no command output outside its logs, and the Founder's command checked
its quoted blocks against their files and its 57 logs against their hashes,
and every check passed. Its blocking findings concern the
plan's rulings on carried items and the citations owed by acts that authorize a
caller of preflight; it found the admission, attestation, integrity and
certification design sound. Revision 5 answers all five findings; the plan's
§0C maps them.

## 0. Purpose, authority, and phase boundary

Phase 3B connects the Phase 3A runtime foundation to the Founder TUI console
(seats, model surface, Poseidon HUD), admits one second surface for the live
pair, and certifies the whole through the §6.9 evidence set.

It designs no new authority, pairing rule, fencing rule, ownership rule or
second session. The one new surface it admits is madv-surface (§1.1 item 1),
under the 3A design's own admission rules (§9.1, §9.2, §9.13); nothing in those
rules changes.

Non-negotiable boundaries preserved from Phase 3A:

- Single foreground supervisor; no daemon, no background service (3A §1.1).
- Presentation-only TUI: it projects canonical state and sends typed actions;
  it never mints authority, tokens, identity, or eligibility.
- Pair eligibility, pair constraints, fencing, command legality, ledger
  durability, and storage boundaries are consumed, never modified.
- The production `start` gate stands on `main` until the certification
  candidate merges (§5).
- Honest status everywhere: unavailable states render as explicit words; the
  TUI never fabricates a writer, model, liveness, or approval state.

## 1. Scope

### 1.1 In scope

1. **Second-surface admission (madv-surface, `minimax` profile).** madv-surface
   (`MADVenturesLLC/madventures-surface`) is an agent CLI that calls only
   flat-fee subscription plan endpoints of providers other than Anthropic and
   emits, for every successful provider response that names a model, the model
   the server reports, the server's response id, and the host the TLS layer
   verified. Its admission is:
   - one Founder-approved registration in
     `packages/protocol/src/adapter-registry.ts`, in the form of the
     `PLAN-OPEN-1` values: surface id, executable name, supported version,
     identity and auth-readiness probes, non-interactive flags, environment
     allowlist reference, provider, `independence_domain` and `organization_id`;
   - the registration pins the `minimax` profile, whose family table holds one
     family (model ids beginning `minimax-` or `minimax_`, case-insensitive;
     maker and independence domain `minimax`), so that
     its provider, independence domain and organization are single static
     values as 3A §9.1 requires. Profiles whose tables name several makers
     (`qwen`, `ollama`, `opencode-go` and `mistral`) are not registered;
   - one environment allowlist in the `PLAN-OPEN-2` form: the variable names
     the launch passes, the profile's key variable marked `secret: true`;
   - one adapter package, `packages/adapter-madv-surface`, built on the same
     contracts as `packages/adapter-claude-code`, with the production probe
     parsers, launch descriptor and live attester of §2.6;
   - a fresh surface investigation under 3A §2.2 and §2.3 that must establish
     whether the profile's per-response metadata reports the model actually
     used (§2.6 item 1). Admission is conditional on that result. A capability
     record is written for the exact binary hash, version, host and horizon on
     each certification host, on Linux only after the record is amended for
     Linux (plan slice H2, `DEC-20261010-02` B5).

   Antigravity stays registered and stays ineligible under 3A §9.13. Its
   registration is not changed by this phase.
2. **Live composition:** the certified foreground process composes the
   existing runtime foundation in the order of 3A §2.1 and, after the existing
   health barrier passes, presents the TUI (3A §2.1, transactional build step
   10: "in Phase 3B only, present the TUI after every required component is
   healthy"). Composition is via the existing `BrokerClient` boundary
   (`packages/broker/src/client.ts`) — the TUI receives the closed interface,
   not runtime internals.
3. **Snapshot projection:** fold `BrokerSnapshot` (client type) into the TUI's
   existing `BrokerSnapshot` projection (`apps/madbridge/src/tui/types.ts`)
   with an explicit, tested mapping. Unavailable/absent fields render as the
   established honest words (UNKNOWN / — / STREAM ENDED), never invented.
4. **Ordered output frames:** the per-execution `output(executionId)`
   `AsyncIterable<OutputFrame>` feeds the two surface panes, Claude Code and
   madv-surface, with a documented bounded-retention rule (ring buffer; the cap
   is an evidence item, not a silent drop). The TUI's second pane, today
   `AntigravityPane`, becomes the madv-surface pane; the plan names the change
   at slice start.
5. **Typed actions:** submitted input → `pty_input` for the focused surface
   only (§2.4), resize → `pty_resize`, and session controls (`session_pause`,
   `session_resume`, `session_close`) as certified TUI governance controls —
   the 3A §4.3 external-control placeholders direct operators to exactly
   these. Production routing of `pty_input` and `pty_resize` to the PTY host,
   which Phase 3A left to this phase, is part of this item, with the
   acknowledgement deadline of 3A §9.8. Alt+Y/N stay behind the unchanged
   7-condition `validateApprovalResolution` guard; because Phase 3B adds no
   approval source (§1.2), the snapshot's pending approvals stay empty and
   approval commands fail closed with `approval_not_pending`, as
   `DEC-20261022-01` B4 rules.
6. **Per-response attestation for both surfaces.** Before any governed Claude
   Code session runs live, attestation checks the model of every Claude Code
   response, and a fallback to another model ends the session as an identity
   mismatch (`DEC-20261104-01` B4). madv-surface's responses are checked the
   same way (§2.6 item 2).
7. **Seat posture ↔ launch metadata:** the seats' pinned model profile is
   passed to the runtime as **launch-request metadata only**. Pair eligibility
   and the task envelope govern the actual assignment; the seat posture can
   never override eligibility. The ModelBar keeps its honest "preference, not
   a claim about the running model" semantics.
8. **Certification evidence** per §6.9, collected as run artifacts (§3).
9. **Gate-removal certification candidate:** replaces the `start` placeholder,
   with an architecture test asserting the 3A gate deliberately changed in the
   same commit (3A §4.2), and merges only on the route of §5.

### 1.2 Out of scope

- Phase 3C operational pilot, release hardening, multi-session, background
  daemon, remote attach.
- An approval workflow: an authoritative source of approval requests, their
  durable projection and fold, and their resolution. A later Founder act may
  add one; it would rule the reference field and the ingestion limbs
  `DEC-20261022-01` B4 names.
- Any surface other than madv-surface; any madv-surface profile other than
  `minimax`; any change to pair eligibility, constraints, fencing, ownership,
  or legality logic.
- Changes to madv-surface's own behavior made from this repository. madv-surface
  is built and reviewed in its own repository; this phase admits one pinned,
  reviewed release of it (§2.6).
- New dependencies without Founder ratification.
- Any activation path other than the certified foreground `start`.

### 1.3 Real-world exposure (disclosed, not hidden)

After gate removal, `madbridge start` launches **real governed sessions**: real
agent processes on a Founder host and real provider calls. Every start makes
live calls before any task runs: each surface's auth-readiness probe, any
identity probe that calls the provider, and each surface's live attestation
prompt (§2.6 item 2, §2.7). The surface investigation of §1.1 item 1 and the
certification runs of §5 are themselves live calls. No other phase of the plan
makes a live call (plan §0A item 6).

Billing: every live call goes through a flat-fee subscription — Claude Code on
the Founder's Claude subscription, and madv-surface on the MiniMax M Plan.
madv-surface pins the plan's host `api.minimax.io` and base path `/anthropic`,
refuses every other host, and enforces the M Plan key prefix `sk-cp-`. MiniMax
documents that plan keys and pay-as-you-go keys share the host and that "Your
account balance is charged only when you use a pay-as-you-go API Key." The
program checks the prefix; it cannot check the account. No API-key spend
outside a subscription is in scope.

Plan terms: madv-surface's record of the M Plan quotes no clause that restricts
clients, and quotes that the plan "is designed for individual, interactive
developer use" and that "Pay-as-you-go is recommended for production use". The
Founder rules whether governed sessions fit those terms, from the provider's
own pages, before M0 (plan §5 item 2).

Retention: madv-surface launches with `--no-session-persistence`, so it writes
no transcript outside the working directory. What the provider retains is the
provider's and is recorded as a stated limitation.

## 2. Integration design

### 2.1 Composition and health barrier

The certified `madbridge start` runs the two phases of 3A §2.1 in their stated
order: pure preflight (envelope, the two execution identities, repository
fingerprint, executable hashes, fresh identity and auth-readiness probes, exact
provider and model, pair eligibility, storage proposal, host capabilities),
then the transactional build (storage, ledger, broker and `InProcessBrokerClient`,
lifeline and control channels, PTY hosts, the re-hash adjacent to `exec`, live
re-attestation, adapters, the durable `fencing_token_issued` and
`session_activated` records, and only then the TUI). The TUI presents only after
the existing health barrier reports every required component healthy; a failed
barrier exits fail-closed with the component named. No new lifecycle order is
introduced.

### 2.2 Snapshot projection rules

One pure mapper, `clientSnapshotToProjection`, with a pinned test table, maps
every member of the client's `BrokerSnapshot` field-for-field; absent client
facts map to the honest words. It distinguishes what the runtime produces at
the reviewed base from what it does not:

- **Produced:** `connected`, which the in-process client stamps on every
  snapshot (true until close), and `executions`, whose launch facts are retained
  and projected into the snapshot as `DEC-20261020-01` B5 rules. The mapper
  preserves both when present. Each `ExecutionSnapshot` maps to the TUI's
  execution identity by a mapping M2's act specifies. The TUI's `executions`
  member is today a non-nullable array, so M2 may change the projection type to
  represent a `null` honestly.
- **Not produced:** `task`, `pendingTransfers`, `permissionSummary`,
  `ownershipState`, `verification`, `review` and `queueDepth` are `null`
  (`PLAN-OPEN-7` / D9), and the mapper passes each through as honest absence.
  `pendingApprovals` is the empty array (D9.2), and the TUI renders it as no
  pending approval, never as a fabricated one.

The mapper throws only on an unknown *shape* (fail closed), matching the
truth-safety doctrine. `PLAN-OPEN-7`'s identifier remains OPEN; its values are
ruled and binding.

### 2.3 Output frames and retention

`output(executionId)` frames append to per-pane buffers in arrival order. The
buffer is a bounded ring (cap: a named line/byte constant ruled in the plan);
overflow drops the OLDEST content and the drop is observable in the evidence
packet (frame count in vs. retained). Ordering is the stream's order; no
reordering, no coalescing.

### 2.4 Input ownership and typed actions

Keyboard routing is the existing `routeKeyEvent` path: global actions resolve
as shipped. Both registrations launch their surface in stream-json input mode
(`--input-format stream-json`), so a governed child reads one JSON user message
per line, and bytes that are not one are ignored or rejected by the child. The
TUI therefore buffers the focused pane's typed line and, on submit, passes the
text to that surface's input encoder, which its adapter package supplies; the
encoder's bytes go out as one `pty_input` for the FOCUSED surface only. A byte
echo proves only transport; a submitted line that produces an attested response
proves usable input. Resize emits `pty_resize`. Alt+Y/N reach only the
unchanged 7-condition guard (fail-closed on incident, non-governance focus,
expired/duplicate — all preserved) and, with no approval source, fail closed
as §1.1 item 5 says. Session controls are explicit operator verbs behind a
confirm surface, not stray keys.

### 2.5 Fencing and legality

Every typed action carries the runtime-issued fencing context. The TUI renders
`stale_fencing_token` / `session_not_writable` / `incident_active` results as
honest status words; it never retries authority-bearing commands
automatically.

### 2.6 madv-surface identity, attestation and integrity

1. **Identity primitive, conditional.** madv-surface's candidate passing
   evidence under 3A §2.2 is its structured per-response metadata: the
   `model_response` event, which carries `response_model` copied from the
   server's own model field, `response_id`, `tls_verified_host`, and
   `response_maker` and `response_independence_domain` looked up from
   `response_model` in the profile's family table. It qualifies only if the
   M0 investigation shows that, for the `minimax` profile, the server's model
   field reports the model actually used, as documented resolved fact and not
   as the request echoed back. MiniMax documents the field as "Model ID used
   for this request", and documents that a retired id is now served by another
   model; the investigation checks such a case. A TLS-verified host, a
   response id and a family lookup do not turn an echo into resolved fact. If
   the investigation cannot show resolved identity, madv-surface is not
   admitted and Phase 3B halts for the Founder. `system/init` and
   requested-model fields are requested intent and are failing evidence. The
   residual 3A accepts, a provider that misreports its own model, stays a
   stated limitation.
2. **Live attestation and exit precedence.** In a governed session the PTY host
   launches madv-surface from a launch descriptor that pins `--print`,
   `--input-format stream-json`, `--output-format stream-json`,
   `--profile minimax`, `--model` with the envelope's exact model,
   `--require-model`, the role the registration maps (`--role reviewer` for an
   independent-reviewer execution) and `--no-session-persistence`. Before
   activation, the production live attester sends one fixed, bounded
   attestation prompt to the governed child through its input and waits, within
   a stated deadline, for its `model_response`; it accepts neither an init event
   nor a probe process's output. madv-surface's own checks then apply in this
   order, the first four with no `model_response`: an HTTP 401 or 403 exits 5
   (`auth_failed`); a redirect exits 6 (`endpoint_refused`); any other
   unsuccessful HTTP status, or a body that does not parse, exits 1
   (`provider_error`); a response with no model field exits 3
   (`identity_unavailable`); a response from an Anthropic model, or from a family the
   profile does not name, exits 7 (`model_refused`, `domain_unresolved`); a
   response naming a model other than the required one, or resolving to another
   independence domain, exits 4 (`identity_mismatch`). Each of those ends the
   process before any tool runs. The adapter separately compares every
   `model_response` with the envelope: `response_model` equals the envelope
   model, `response_independence_domain` and the profile's provider equal the
   registered values, and `tls_verified_host` equals `api.minimax.io`. Any
   difference, a missing `model_response` by the deadline, or exit 1, 3, 4, 5,
   6 or 7 is a typed fail-closed result that interrupts the whole session,
   never a retry. Unsupported profile or family combinations fail in preflight,
   before any governed work.
3. **Integrity of the admitted build.** The registration's supported version
   and the capability record's binary hash name one release build of
   madv-surface, built from one commit of its repository that has passed a
   review the Founder accepts. Admission keeps every 3A check: the host's
   actual artifact hash, its re-hash adjacent to `exec`, and the capability
   record's freshness on binary hash, CLI version, every host field and
   horizon. A matching version banner or a self-reported hash is not
   admission.
4. **Secrets.** The profile's key reaches madv-surface only through its
   environment allowlist entry marked `secret: true`; probes, the PTY host and
   the governed child receive the same exact environment (3A §5.4). A synthetic
   canary value, never a real key, exercises that path and the sanitized
   evidence export. madv-surface refuses keys beginning `sk-ant-` and every
   Anthropic model; the runtime does not rely on that refusal for pair
   eligibility, which 3A §9.2 decides from the registrations. Evidence
   redaction stays best-effort, and agent-printed secrets stay the documented
   residual of 3A §5.6.

### 2.7 Claude Code per-response attestation

Phase 3A registers no production live attester for any surface. Phase 3B adds
one for `claude-code` at composition, without changing the registration's
values: before activation it sends the same kind of fixed, bounded attestation
prompt and checks the model the response reports against the envelope; during
the session it checks the model of every Claude Code response, and a response
from another model ends the session as an identity mismatch
(`DEC-20261104-01` B4). The `system/init` event alone is not passing evidence
for live attestation.

## 3. Certification and evidence (maps 1:1 to §6.9, with the §4.2 citations)

| §6.9 item | Artifact |
| --- | --- |
| passing Phase 3A certification reports from both hosts of §1.5 | the two reports already on `main` (§0A.3 item 1), cited by path and Report SHA-256, with the Phase 3A final merge review `DEC-20261106-02` |
| the three host spike reports of 3A §3.6, which 3A §4.2 requires the gate-removal change to cite | `docs/verification/2026-08-12-bun-terminal-spike-imac.md`, `docs/verification/2026-08-12-bun-terminal-spike-macbook.md` and `docs/verification/2026-10-11-bun-terminal-spike-ubuntu.md`, cited by path |
| fresh live-pair capability and attestation record | capability records for `claude-code` and `madv-surface` on both hosts, and live-pair run records at the certification candidate's head whose attestation shows each surface's resolved identity from passing evidence (§2.6, §2.7) |
| TUI integration evidence | recorded sessions at the candidate head: real snapshots, ordered frames, typed actions (`pty_input`, `pty_resize`, session controls) |
| production startup/shutdown/interruption/negative-control evidence | scripted runs at the candidate head on both hosts: healthy start → clean close; interruption path; negative controls (§4) |
| no boundary bypass | architecture tests + Tier-2 review |
| exact-SHA Tier-2 verdict and Founder authorization | Tier-2 review pinning the candidate head, and the Founder's authorization naming that head |

## 4. Negative controls (mandatory, fail-closed)

1. Alt+Y/N inert outside Governance focus (unchanged guard).
2. Decision surface disarms on incident; IncidentBand takes precedence.
3. With no approval source, an approval command fails closed with
   `approval_not_pending`, and the TUI renders that result honestly.
4. Health barrier failure → no TUI, named component, nonzero exit.
5. Input to a non-writable surface → `session_not_writable`, rendered honestly.
6. Catalog/seat surfaces remain LOCAL posture: they emit no runtime actions.
7. A madv-surface response with no model field, from an Anthropic model, from a
   family the profile does not name, naming another model, or resolving to
   another independence domain ends that execution fail-closed before any tool
   runs, with the exit of §2.6 item 2, and the runtime interrupts the session
   as an identity failure.
8. A Claude Code response from a model other than the envelope's ends the
   session as an identity mismatch (§2.7).
9. A madv-surface binary whose hash or version differs from its capability
   record is not admitted.
10. An envelope pairing two surfaces that share a provider, independence domain
    or organization fails eligibility (3A §9.2), including an envelope that
    names Antigravity as the second member (3A §9.13).
11. A missing attestation response by its deadline interrupts the session
    before activation.
12. The synthetic secret canary of §2.6 item 4 appears in no sanitized
    evidence export.

## 5. Gate removal

The certification candidate is one commit, on a branch from the merge of the
last slice before it, that replaces the `start` placeholder with the certified
composition and includes, in the same commit, the architecture test asserting
the 3A gate deliberately changed (3A §4.2). It is not merged until every
condition below holds at its exact head.

1. **Exercising the candidate.** Its production `start` path is exercised only
   by building the candidate's exact head from a fresh clone on each
   certification host and running it there under a Founder act that names the
   runs and their live calls. `main` keeps the 3A behavior throughout. No flag,
   variable or alternate path is added to reach the certified path from `main`.
2. **Both hosts, one head.** The runs of §3 — startup to clean close, the
   interruption path, the production negative controls, and the fresh
   live-pair records — run on both certification hosts at that identical head.
3. **Evidence custody.** The candidate commit cites, by path, the evidence that
   exists before it (§3 rows 1 and 2, the capability records, and the earlier
   slices' packets). Evidence produced at its own head is kept outside the repository
   as raw artifacts and named by SHA-256 in the Tier-2 verdict and the
   Founder's authorization. A commit cannot contain its own final SHA, nor
   evidence of runs made at that SHA. After the merge, a docs-only pull request
   files the sanitized packets under `docs/verification/`.
4. **Any change rebinds.** Any change to the candidate makes a new head, and
   every run of item 2 and the Tier-2 review repeat at the new head.
5. **Merge.** The candidate merges only after an approving exact-SHA Tier-2
   verdict and the Founder's authorization at that head.

## 6. Completion criteria

Phase 3B's certification is complete when the certification candidate, carrying
the full §6.9 evidence set and an exact-SHA Tier-2 verdict, is merged by the
Founder at the head that evidence names. Until then, no live session is
certified, and `start` remains gated on `main`. Phase 3B closes afterwards,
when the docs-only pull request that files the sanitized run packets has merged
and the Founder's records act has entered them; that closure adds no evidence
the merge did not already require.
