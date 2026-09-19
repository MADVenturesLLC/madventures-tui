# Phase 3B — Live TUI Integration and Certification: Design Specification

Status: **DRAFT — awaiting Founder approval.** This document authorizes no
implementation (Phase 3A design §8: "No implementation is authorized by this
document alone"). Implementation begins only after the Founder approves this
specification **and** the separate implementation plan
(`docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md`).

Obeys: `docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md`
(the "3A design"). Phase 3B is defined there (§0.1): *connect the existing TUI
to real snapshots, output frames, and typed actions; certify an eligible live
pair; remove the production start gate through a reviewed certification event.*
The §6.9 gate-removal evidence list is binding and is the scope of record.

Commission: Founder instruction, 2026-09-19 ("Option A, but narrower and
honest about what 'authorize' means… authorize its written spec + 
implementation plan first"). The narrow ruling is adopted: this document and
the plan are the authorized deliverable; nothing else.

## 0A. Founder ratification (2026-09-19, verbatim) and its consequences

> "For Phase 3B: authorize the written design spec and implementation plan
> only, drafted by the GLM build, no wiring and no gate edits. The plan must
> name exact base SHAs per slice, include the M26 dual-host reports as the
> first evidence track, define the suite-count floor and where it's proven,
> carry the §7.7/§7.8 qualification record for GLM, and end at the exact-SHA
> Tier-2 verdict plus my authorization. Present it for my approval before any
> execution."

Consequences adopted into this spec and the plan:

1. **No wiring, no gate edits** — this document and the plan are the
   authorized deliverable; every implementation milestone in the plan is
   separately gated (per-slice Founder "go").
2. **Evidence Track 0 is the execution of 3A M26** — the dual-host Phase 3A
   reports do not yet exist (verified: `docs/verification/` carries M17
   dual-host spike reports only; `test/phase3a/evidence-pipeline.test.ts` is
   absent). Track 0 executes 3A plan M26 Tasks 58–59 exactly as written
   there, producing both checksummed reports at one SHA with the gate still
   closed.
3. **Suite-count floor** — defined in the plan (§ suite-count floor) and
   proven per slice in CI Verify (ubuntu + macOS) plus a local full `bun test`
   record.
4. **§7.7/§7.8 qualification record for GLM** — carried in the plan in the
   §7.8 format. Per §7.7, qualification is NOT self-asserted: 3A completion
   (including M26) is a precondition, Gemini Antigravity reviews the exact
   candidate SHA, and the Founder explicitly qualifies the builder.
5. **Terminal conditions** — exact-SHA Tier-2 verdict plus Founder
   authorization; presented for approval before any execution.

## 0. Purpose, authority, and phase boundary

Phase 3B connects the already-landed Phase 3A runtime foundation to the
already-landed Founder TUI console (seats, model surface, Poseidon HUD —
merged in #82/#86), then certifies the whole through the §6.9 evidence set.
It does **not** design new authority, new pairing rules, new surfaces, or a
second session. Where this document and the 3A design conflict, the 3A design
wins and the conflict is escalated to the Founder.

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

1. **Live composition:** the certified foreground process composes the
   existing runtime foundation and, after the existing health barrier passes,
   presents the TUI (3A §202: "in Phase 3B only, present the TUI after every
   required component is healthy"). Composition is via the existing
   `BrokerClient` boundary (`packages/broker/src/client.ts`) — the TUI
   receives the closed interface, not runtime internals.
2. **Snapshot projection:** fold `BrokerSnapshot` (client type) into the TUI's
   existing `BrokerSnapshot` projection (`apps/madbridge/src/tui/types.ts`)
   with an explicit, tested mapping. Unavailable/absent fields render as the
   established honest words (UNKNOWN / — / STREAM ENDED), never invented.
3. **Ordered output frames:** the per-execution `output(executionId)`
   `AsyncIterable<OutputFrame>` feeds the Claude/Antigravity pane buffers with
   a documented bounded-retention rule (ring buffer; the cap is an evidence
   item, not a silent drop).
4. **Typed actions:** keyboard → `pty_input` (focused surface only, through
   the unchanged `keyboard-router` PTY path), resize → `pty_resize`,
   Alt+Y/N → `approval_resolve` (through the unchanged 7-condition
   `validateApprovalResolution`), and session controls (`session_pause`,
   `session_resume`, `session_close`) as certified TUI governance controls —
   the 3A §4.3 external-control placeholders direct operators to exactly
   these.
5. **Seat posture ↔ launch metadata:** the seats' pinned model profile is
   passed to the runtime as **launch-request metadata only**. Pair eligibility
   and the task envelope govern the actual assignment; the seat posture can
   never override eligibility. The ModelBar keeps its honest "preference, not
   a claim about the running model" semantics.
6. **Certification evidence** per §6.9, collected as run artifacts (§4).
7. **Gate-removal certification commit:** replaces the `start` placeholder,
   with an architecture test asserting the 3A gate deliberately changed in the
   same commit (3A §4.2), citing the full §6.9 set.

### 1.2 Out of scope

- Phase 3C operational pilot, release hardening, multi-session, background
  daemon, remote attach.
- New provider pairings beyond the eligible pair; any change to pair
  eligibility, constraints, fencing, ownership, or legality logic.
- New dependencies without Founder ratification.
- Any activation path other than the certified foreground `start`.

### 1.3 Real-world exposure (disclosed, not hidden)

After gate removal, `madbridge start` launches **real governed sessions**:
real provider spend, real agent processes on the Founder machine, real
approvals surfacing on the DecisionStrip. The certification evidence runs are
themselves live sessions.

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
map field-for-field; absent client facts map to the honest words. The mapper
is total and throws on unknown shapes (fail closed), matching the
truth-safety doctrine.

### 2.3 Output frames and retention

`output(executionId)` frames append to per-pane buffers in arrival order. The
buffer is a bounded ring (cap: a named line/byte constant in the plan);
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

## 3. Certification and evidence (maps 1:1 to §6.9)

| §6.9 item | Artifact |
| --- | --- |
| passing dual-host Phase 3A reports | **Evidence Track 0 — EXECUTED FIRST** (the reports do not yet exist; 3A M26 Tasks 58–59 run at one SHA on both Founder Macs, producing both checksummed reports; see plan §2A) |
| fresh live-pair capability and attestation record | live-pair run record (capability + attestation) |
| TUI integration evidence | recorded session: real snapshots, ordered frames, typed actions |
| production startup/shutdown/interruption/negative-control evidence | scripted runs with packets: healthy start → clean close; interruption path; negative controls (inert keys, incident precedence, stale fencing) |
| no boundary bypass | architecture tests + Tier-2 review |
| exact-SHA Tier-2 verdict and Founder authorization | Tier-2 review pinning the certification commit SHA |

## 4. Negative controls (mandatory, fail-closed)

1. Alt+Y/N inert outside Governance focus (unchanged guard).
2. Decision surface disarms on incident; IncidentBand takes precedence.
3. `approval_resolve` on expired/duplicate approval fails closed.
4. Health barrier failure → no TUI, named component, nonzero exit.
5. Input to a non-writable surface → `session_not_writable`, rendered honestly.
6. Catalog/seat surfaces remain LOCAL posture: they emit no runtime actions.

## 5. Gate removal

The certification commit replaces the `start` placeholder with the certified
composition and includes, in the same commit: the architecture test asserting
the 3A gate deliberately changed, the §6.9 evidence citations, and the exact
certification SHA for the Tier-2 verdict. Until that commit merges, every
production entry keeps the 3A behavior.

## 6. Completion criteria

Phase 3B is complete when the certification commit, carrying the full §6.9
evidence set and an exact-SHA Tier-2 verdict, is merged by the Founder. Until
then, no live session is certified, and `start` remains gated.
