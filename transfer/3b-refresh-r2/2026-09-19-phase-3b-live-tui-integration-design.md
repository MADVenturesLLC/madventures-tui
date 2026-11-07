# Phase 3B — Live TUI Integration and Certification: Design Specification

Status: **DRAFT, revision 2 (2026-11-06) — awaiting Founder approval.** This
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
refresh." That answer commissioned this revision. It becomes a ruling only when
the Founder's approval act states it.

### 0A.3 What revision 2 changes

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
4. The builders and reviewers in use are those named by each Founder act (Claude
   Code and Codex builder sessions; Gemini on Antigravity as Tier-2 reviewer),
   not a GLM build on ZCode CLI.
5. Phase 3A acts carry named items to "the first Phase 3B act". The plan (§2D)
   places each one.

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
- The production `start` gate stands until the certification commit (§5).
- Honest status everywhere: unavailable states render as explicit words; the
  TUI never fabricates a writer, model, liveness, or approval state.

## 1. Scope

### 1.1 In scope

1. **Second-surface admission (madv-surface).** madv-surface
   (`MADVenturesLLC/madventures-surface`) is an agent CLI that calls only
   flat-fee subscription plan endpoints of providers other than Anthropic and
   emits, for every provider response, the model the server reports, the
   server's response id, and the host the TLS layer verified. Its admission is:
   - one Founder-approved registration in
     `packages/protocol/src/adapter-registry.ts`, in the form of the
     `PLAN-OPEN-1` values: surface id, executable name, supported version,
     identity and auth-readiness probes, non-interactive flags, environment
     allowlist reference, provider, `independence_domain` and `organization_id`;
   - the registration pins **one** madv-surface profile and **one** model
     family, so that its provider, independence domain and organization are
     single static values as 3A §9.1 requires. Profiles that serve several
     makers are not registered;
   - one environment allowlist in the `PLAN-OPEN-2` form: the variable names
     the launch passes, the profile's key variable marked `secret: true`;
   - one adapter package, `packages/adapter-madv-surface`, built on the same
     contracts as `packages/adapter-claude-code`;
   - a fresh surface investigation under 3A §2.2 and §2.3 whose passing
     evidence is madv-surface's per-response `model_response` metadata, and a
     capability record for the exact binary hash, version, host and horizon.

   Antigravity stays registered and stays ineligible under 3A §9.13. Its
   registration is not changed by this phase.
2. **Live composition:** the certified foreground process composes the
   existing runtime foundation and, after the existing health barrier passes,
   presents the TUI (3A §202: "in Phase 3B only, present the TUI after every
   required component is healthy"). Composition is via the existing
   `BrokerClient` boundary (`packages/broker/src/client.ts`) — the TUI
   receives the closed interface, not runtime internals.
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
5. **Typed actions:** keyboard → `pty_input` (focused surface only, through
   the `keyboard-router` PTY path), resize → `pty_resize`, Alt+Y/N →
   `approval_resolve` (through the unchanged 7-condition
   `validateApprovalResolution`), and session controls (`session_pause`,
   `session_resume`, `session_close`) as certified TUI governance controls —
   the 3A §4.3 external-control placeholders direct operators to exactly
   these. Production routing of `pty_input` and `pty_resize` to the PTY host,
   which Phase 3A left to this phase, is part of this item, with the
   acknowledgement deadline of 3A §9.8.
6. **Seat posture ↔ launch metadata:** the seats' pinned model profile is
   passed to the runtime as **launch-request metadata only**. Pair eligibility
   and the task envelope govern the actual assignment; the seat posture can
   never override eligibility. The ModelBar keeps its honest "preference, not
   a claim about the running model" semantics.
7. **Certification evidence** per §6.9, collected as run artifacts (§3).
8. **Gate-removal certification commit:** replaces the `start` placeholder,
   with an architecture test asserting the 3A gate deliberately changed in the
   same commit (3A §4.2), citing the full §6.9 set.

### 1.2 Out of scope

- Phase 3C operational pilot, release hardening, multi-session, background
  daemon, remote attach.
- Any surface other than madv-surface; any second madv-surface profile; any
  change to pair eligibility, constraints, fencing, ownership, or legality
  logic.
- Changes to madv-surface's own behavior made from this repository. madv-surface
  is built and reviewed in its own repository; this phase admits one pinned,
  reviewed release of it (§2.6).
- New dependencies without Founder ratification.
- Any activation path other than the certified foreground `start`.

### 1.3 Real-world exposure (disclosed, not hidden)

After gate removal, `madbridge start` launches **real governed sessions**:
real agent processes on a Founder host, real approvals surfacing on the
DecisionStrip, and real provider calls. The surface investigation of §1.1
item 1 and the certification evidence runs are themselves live calls.

Billing: every live call goes through a flat-fee subscription — Claude Code on
the Founder's Claude subscription, and madv-surface on the plan of its one
registered profile. madv-surface pins that plan's host and base path and refuses
every other host; for profiles whose host also serves pay-per-token use, the
billing guard is an account setting the Founder holds, which the program
records and cannot check. No API-key spend outside a subscription is in scope.

Plan terms: each provider's plan states which clients may use it. The registered
profile is chosen only after its clauses are read from the provider's own pages
and recorded with the registration (plan §5).

## 2. Integration design

### 2.1 Composition and health barrier

`madbridge start` (certified form) composes: ledger → storage → capability →
session/ownership machines → PTY hosts → adapters → `BrokerClient`. The TUI
presents only after the existing health barrier reports every required
component healthy; a failed barrier exits fail-closed with the component
named. No new lifecycle order is introduced — orders are the 3A durable
orders (M8 Task 19).

### 2.2 Snapshot projection rules

One pure mapper, `clientSnapshotToProjection`, with a pinned test table:
connected/sessionState/ownership/activeWriter/fencingToken/pending approvals/
transfers/permission summary/verification/review/incident/eventLog/queueDepth
map field-for-field; absent client facts map to the honest words.
`BrokerSnapshot` members ruled by `PLAN-OPEN-7` / D9 project `null` meaning
*not produced* (D9 Part A: sourceable subset; `connected`, `queueDepth`,
`ownershipState`, `task`, `permissionSummary`, `executions` deferred). The
mapper passes a ruled-absent `null` through as honest absence; it throws only
on an unknown *shape* (fail closed), matching the truth-safety doctrine.
`PLAN-OPEN-7`'s identifier remains OPEN; its values are ruled and binding.

### 2.3 Output frames and retention

`output(executionId)` frames append to per-pane buffers in arrival order. The
buffer is a bounded ring (cap: a named line/byte constant ruled in the plan);
overflow drops the OLDEST content and the drop is observable in the evidence
packet (frame count in vs. retained). Ordering is the stream's order; no
reordering, no coalescing.

### 2.4 Input ownership and typed actions

Keyboard routing is the existing `routeKeyEvent` path: global actions resolve
as shipped; PTY-bound bytes emit `pty_input` for the FOCUSED surface only.
Resize emits `pty_resize`. Alt+Y/N emit `approval_resolve` only through the
unchanged 7-condition guard (fail-closed on incident, non-governance focus,
expired/duplicate — all preserved). Session controls are explicit operator
verbs behind a confirm surface, not stray keys.

### 2.5 Fencing and legality

Every typed action carries the runtime-issued fencing context. The TUI renders
`stale_fencing_token` / `session_not_writable` / `incident_active` results as
honest status words; it never retries authority-bearing commands
automatically.

### 2.6 madv-surface identity, attestation and integrity

1. **Identity primitive.** madv-surface's passing evidence under 3A §2.2 is its
   structured per-response metadata: the `model_response` event, emitted after
   every provider response and before any tool runs, carrying
   `response_model` copied from the server's own field, `response_id`,
   `tls_verified_host`, and `response_maker` and
   `response_independence_domain` resolved from `response_model` alone.
   `system/init` and requested-model fields are requested intent and are
   failing evidence.
2. **Live attestation.** In a governed session the adapter launches
   madv-surface with the registered profile, the envelope's exact model and
   `--require-model`, so that any response naming another model, or resolving
   to another independence domain, ends the process with exit 4 before any
   tool runs. The adapter compares every `model_response` with the envelope:
   `response_model` equals the envelope model, `response_independence_domain`
   and the profile's provider equal the registered values, and
   `tls_verified_host` equals the profile's pinned host. Any difference, a
   missing `model_response`, or exit 3, 4, 5, 6 or 7 is a typed fail-closed
   result in the runtime, never a retry.
3. **Integrity of the admitted build.** The registration's supported version
   and the capability record's binary hash name one release build of
   madv-surface, built from one commit of its repository that has passed a
   review the Founder accepts. A different binary hash or version fails
   admission as 3A §9.1 requires.
4. **Secrets.** The profile's key reaches madv-surface only through its
   environment allowlist entry marked `secret: true`. madv-surface refuses keys
   beginning `sk-ant-` and every Anthropic model; the runtime does not rely on
   that refusal for pair eligibility, which 3A §9.2 decides from the
   registrations.

## 3. Certification and evidence (maps 1:1 to §6.9)

| §6.9 item | Artifact |
| --- | --- |
| passing Phase 3A certification reports from both hosts of §1.5 | the two reports already on `main` (§0A.3 item 1), cited by path and Report SHA-256, with the Phase 3A final merge review of `DEC-20261106-01` B11 |
| fresh live-pair capability and attestation record | capability records for `claude-code` and `madv-surface` on the certifying host, and a live-pair run record whose attestation shows each surface's resolved identity from passing evidence (§2.6 for madv-surface) |
| TUI integration evidence | recorded session: real snapshots, ordered frames, typed actions |
| production startup/shutdown/interruption/negative-control evidence | scripted runs with packets: healthy start → clean close; interruption path; negative controls (§4) |
| no boundary bypass | architecture tests + Tier-2 review |
| exact-SHA Tier-2 verdict and Founder authorization | Tier-2 review pinning the certification commit SHA |

## 4. Negative controls (mandatory, fail-closed)

1. Alt+Y/N inert outside Governance focus (unchanged guard).
2. Decision surface disarms on incident; IncidentBand takes precedence.
3. `approval_resolve` on expired/duplicate approval fails closed.
4. Health barrier failure → no TUI, named component, nonzero exit.
5. Input to a non-writable surface → `session_not_writable`, rendered honestly.
6. Catalog/seat surfaces remain LOCAL posture: they emit no runtime actions.
7. A madv-surface response naming another model, or resolving to another
   independence domain, ends that execution fail-closed before any tool runs,
   and the runtime records it as an identity failure (§2.6 item 2).
8. A madv-surface binary whose hash or version differs from its capability
   record is not admitted.
9. An envelope pairing two surfaces that share a provider, independence domain
   or organization fails eligibility (3A §9.2), including an envelope that
   names Antigravity as the second member (3A §9.13).

## 5. Gate removal

The certification commit replaces the `start` placeholder with the certified
composition and includes, in the same commit: the architecture test asserting
the 3A gate deliberately changed and the §6.9 evidence citations. The
resulting commit SHA is recorded in the final Tier-2 verdict and the Founder
authorization — a commit cannot contain its own final SHA. Until that commit
merges, every production entry keeps the 3A behavior.

## 6. Completion criteria

Phase 3B is complete when the certification commit, carrying the full §6.9
evidence set and an exact-SHA Tier-2 verdict, is merged by the Founder. Until
then, no live session is certified, and `start` remains gated.
