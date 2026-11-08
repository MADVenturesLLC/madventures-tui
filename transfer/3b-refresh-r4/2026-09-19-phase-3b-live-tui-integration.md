# Phase 3B — Live TUI Integration and Certification: Implementation Plan

Status: **DRAFT, revision 4 (2026-11-08) — awaiting Founder approval of BOTH this
plan and the design spec**
(`docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md`,
revision 4). Per the 3A design §8, no implementation is authorized by the spec
alone. Nothing in this plan executes before the Founder approves both documents
by a signed act naming the SHA-256 of each, and then each slice starts only on
its own act.

Obeys: the 3B design (revision 4), the 3A design (§1.5, §2.1, §2.2, §2.3, §3.6,
§4.2, §4.3, §5.4 to §5.6, §6.9, §7, §9.1, §9.2, §9.8, §9.13), and the §6.9
gate-removal evidence list. Scope of record = the §6.9 list plus the one surface
admission of 3B design §1.1 item 1 and the Linux capability-record amendment it
requires; this plan adds no other scope.

## Plan provenance and baseline

- Revision 1 was drafted against `main` at
  `a0cbecbefe31a470008acf4e22dec49f750e3261` (suite 1385 pass across 84 files).
  Its facts are superseded as 3B design §0A.3 lists.
- Revision 2 was drafted against `main` at
  `9b377bb365c6ba416c5b5fd9b504a6f9a194a74e` (the merge of pull request 227,
  which filed `DEC-20261106-01`), while Phase 3A Task 59 was being built, and
  updated after Phase 3A's final merge.
- Revision 3 answers the independent review of revision 2 (3B design §0A.4;
  §0C below) against `main` at `5be1a586b4a4bb7cc09dfc6239b66b518cf9a23c`, the
  merge of pull request 229, which filed `DEC-20261106-02` and
  `DEC-20261107-01`.
- Revision 4 answers the second review, of revision 3 (3B design §0A.5; §0C
  below), against the same `main`.
- **Phase 3A's final merge is `a7dbc7def0cd67568b2765c894ff91894707801c`,** the
  merge of pull request 228 (Task 59) on 2026-11-07 under `DEC-20261106-02` B7,
  the final merge review that `DEC-20261106-01` B11 calls for. `DEC-20261107-01`
  records it as a merge, not a certification, and closes M26.
- **The binding base of Phase 3B is that merge, or a later `main` commit whose
  changes since it are docs only.** The approval act of this plan names it by
  SHA.
- The TUI console (seats, ModelBar/ModelPicker, Poseidon HUD, decision
  surfaces) is merged and live in fixture mode.
- The runtime foundation is Phase 3A-complete behind the `start` gate
  (`apps/madbridge/src/commands/start.ts` exits 78
  `live_runtime_not_certified`).
- `BrokerClient` boundary at `packages/broker/src/client.ts`
  (snapshot/output/request/publish/close; closed command and error sets). The
  production snapshot produces `pendingApprovals` as the empty array, and the
  in-process client dispatches only `session_pause`, `session_resume` and
  `session_close`.
- `packages/protocol/src/adapter-registry.ts` registers `claude-code`
  (provider `anthropic`, independence domain `anthropic`) and `antigravity`
  (provider `google`, independence domain `google`). Antigravity is ineligible
  for a live pair under 3A §9.13. Neither registration has a production live
  attester; the build fails re-attestation for a registration without one.
- The production probe parsers in `packages/supervisor/src/attestation.ts` read
  Claude Code's auth status fields and its first `system/init` event only.
- The capability record's host fields in
  `packages/protocol/src/capability-record.ts` are macOS fields, and
  `DEC-20261010-02` B5 allows no capability record on Linux until a separate
  task act amends the record.
- madv-surface 0.1.0 is merged on `main` of `MADVenturesLLC/madventures-surface`
  at `d259cb5f9797101868391a0e4e81fc3a40ad3ea4` (tree identical to
  `270981400324c684abc1a5c0e837c8d8a3b20cf7`). It has made no real provider
  call. Its second independent review (round 2) is void: the report quotes code,
  diffs and tool output that are not in the reviewed commit or in its own logs.
  Two of its findings were reproduced against the real code by the drafting
  assistant and go to madv-surface's own follow-up build: no test catches a
  change that truncates `read_file` or `list_dir` output before redaction, and
  some Claude ids are refused only by the unknown-family rule rather than the
  Anthropic rule.

### Sources bound by this plan

| Source | Location | Role |
| --- | --- | --- |
| Phase 3A design | `docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md` | Governs the boundary, startup order (§2.1), admission (§9.1, §9.2, §9.13), the §6.9 list, and the builder rubric and qualification (§7.2, §7.3, §7.7, §7.8) |
| Phase 3A plan | `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` | §11.3 correction-round accounting |
| Host certification reports | `docs/verification/2026-08-12-phase-3a-host-certification-macbook.md`, `…-ubuntu.md` | §6.9 item 1 |
| Task 59 evidence | `docs/verification/2026-08-12-phase-3a-merge-gate.md` | Phase 3A limitations and carried items |
| Broker client contract | `packages/broker/src/client.ts` | Closed snapshot/output/request/publish/close boundary |
| TUI projection type | `apps/madbridge/src/tui/types.ts` | Presentation projection, not the broker contract |
| Production start gate | `apps/madbridge/src/commands/start.ts` | Changed only in the M6 candidate |
| Adapter registry | `packages/protocol/src/adapter-registry.ts` | Sole admission source; one entry added in M0 |
| Capability record | `packages/protocol/src/capability-record.ts` | Amended for Linux in H2 |
| madv-surface | `MADVenturesLLC/madventures-surface` | The second surface; built and reviewed in its own repository |

New Phase 3B evidence belongs in `docs/verification/` as sanitized,
human-readable packets. Raw run artifacts remain outside the repository and are
cited by run identifier and SHA-256.

## 0A. Execution semantics

The pattern Phase 3A established under its acts continues:

1. **One act per slice.** Each slice starts on a Founder act that names its
   binding base (the merge commit of the prior slice, except M7, which works at
   the M6 candidate's head), its builder and branch, the only paths it may
   change, its gates, its closed list of halts, its review, and how its
   verdicts count.
2. **Builders.** A fresh builder session (Claude Code on the Ubuntu PC or Codex
   on the MacBook, as the act names) with no MCP server, the git identity
   `daley40-lab`, and no GitHub call. The Founder's guarded commands carry the
   branch, push it, open the draft pull request, mark it ready after a posted
   Tier-2 PASS at its exact head, and merge it.
3. **Merges.** Each slice is a plan task: its pull request merges only by a
   Founder merge authorization naming its exact head (`DEC-20261104-01` B10
   item 3). Changes under `docs/decisions/` merge by a Founder act naming the
   exact head (`AGENTS.md`, as `DEC-20261031-01` amended it). The M6 candidate
   merges only on the route of 3B design §5, in M7.
4. **Runtimes and hosts.** Bun as `DEC-20261013-03` fixes it per host; the
   certification hosts of 3A design §1.5.
5. **Hermes.** As `DEC-20261102-02` B5: no governed session loads it, and it is
   stopped while the Founder's guarded commands for this repository run.
6. **Live calls.** Only M0's investigation and M7's runs at the candidate head
   make real provider calls, each on a Founder act that names every call
   (probes, attestation prompts, prompts of the run), the subscription that
   pays for it, and the billing guard. H1, H2 and M1 to M6 are offline: their
   evidence comes from tests and from controlled stand-in executables, and is
   labelled offline. An offline transcript is never presented as a live
   production run.

## 0B. Ratification history

The commission of 2026-09-19, the pair choice of 2026-11-06 and the drafting
choices of 2026-11-07 are recorded in the 3B design §0A. Revision 2 replaced
revision 1's Track 0 (now done), its host pair (now the MacBook and the Ubuntu
PC), its builder record (now per slice), and its open pair (now Claude Code plus
madv-surface, to be ruled by the approval act).

## 0C. What revisions 3 and 4 change, by review finding

Revision 3, for the review of revision 2:

| Finding | Change |
| --- | --- |
| F1 Linux capability record | New slice H2 amends the record for Linux before M0; M0 writes the Ubuntu record only after H2 |
| F2 identity evidence | 3B design §2.6 item 1: admission is conditional on M0 showing the response model field is resolved fact; otherwise a halt |
| F3 production probes and attestation | M0 adds production probe parsers and the launch descriptor; M1 adds production live attesters for both surfaces |
| F4 Claude Code fallback carry | §2D item 12, placed in M1, with negative control 8 of 3B design §4 |
| F5 Mistral | The `minimax` profile is chosen; `mistral` is listed with the multi-maker profiles |
| F6 approval source | Approvals are outside Phase 3B (3B design §1.2); M4 is session controls only |
| F7 certification order | 3B design §5: one unmerged candidate, both hosts and the Tier-2 verdict at its exact head, then the merge |
| F8 offline evidence | §0A item 6 |
| F9 exit precedence | 3B design §2.6 item 2 |
| F10 startup order | 3B design §2.1 follows 3A §2.1 |
| F11 pane inventory | §2 lists the comment in `ClaudePane.tsx` |
| F12 qualification and rubric | §2C and §5 items 9 and 10 |
| F13 usable input | 3B design §2.4 and M3: the adapter's input encoder, and a submitted line that produces an attested response |
| F14 transcript and secret evidence | 3B design §1.3 and §2.6 item 4: `--no-session-persistence`, provider retention recorded, a synthetic canary |

Revision 4, for the review of revision 3:

| Finding | Change |
| --- | --- |
| F1 snapshot projection | 3B design §2.2 separates produced members (`connected`, `executions`) from members not produced; M2 maps executions and may change the projection type |
| F2 HTTP exit precedence | 3B design §2.6 item 2: 401 or 403 exits 5, a redirect exits 6, other HTTP and parse failures exit 1; M0 tests each path |
| F3 spike-report citations | 3B design §3 row 2 and §5 item 3; M6 cites the three spike reports of 3A §3.6 |
| F4 preflight-caller rulings | §2D item 13 |
| F5 organization and Claude Code version | §5 items 1 and 13 |
| F6 attestation handoff and budget | M0 builds the input encoder that M1's attester uses; M1 names the events, deadlines and handoff; §5 item 11 sets the per-start budget |

## 1. Global constraints

1. File scope per slice is the disposition map of §2, narrowed by the slice's
   act; anything outside requires a Founder amendment.
2. The `start` placeholder is touched ONLY in the M6 candidate.
3. No new dependency without a Founder ruling naming it.
4. Every slice lands with tests green and its evidence recorded as a sanitized
   human-readable packet under `docs/verification/` (3A §5.5: the runtime
   never writes into the governed repository; source transcripts are retained
   as submitted evidence, not committed).
5. Honest-status doctrine applies to every new surface: no invented state.
6. No live provider call outside a slice act that names it (§0A item 6).
7. No production bypass: no flag, variable or alternate path reaches a
   certified composition from `main` before the candidate merges.
8. A slice that finds a governed child waiting on an approval or a prompt that
   Phase 3B gives no path to answer halts for the Founder.

## 2. Existing-state disposition map

- **Preserved untouched:** broker authority modules (session-machine,
  ownership-machine, fencing, command-legality, ledger, storage), the snapshot's
  approval and transfer production, the pair eligibility and constraint logic
  of `packages/protocol/src/pair-constraints.ts`, the values of the
  `claude-code` and `antigravity` registrations, `packages/adapter-antigravity`,
  the 3A harnesses, and the Phase 3A test corpus except where a slice act
  names a test it must update.
- **Modified (expected; each slice act names its exact paths):**
  - `test/phase3a/architecture-phase3a.test.ts` and the test-only harness
    (§2D items 8 to 11, H1); `test/phase3a/evidence-pipeline.test.ts` (§2D
    item 7, H1); `apps/madv-agent/src/proxy.ts` (§2D item 6, H1).
  - `packages/protocol/src/capability-record.ts`, the capability store in
    `packages/storage/` and their tests, for the Linux host fields (H2).
  - `packages/protocol/src/adapter-registry.ts` — one `madv-surface`
    registration (M0).
  - `packages/supervisor/src/environment.ts` — one environment allowlist,
    `madv-surface-v1` (M0).
  - `packages/supervisor/src/attestation.ts` and
    `packages/supervisor/src/preflight.ts` — production identity and
    auth-readiness parsers dispatched by registration, keeping Claude Code's
    as they are (M0).
  - `packages/adapter-claude-code` — its per-response model check, live
    attester and input encoder (M1).
  - Architecture tests whose admission, cardinality or quarantine scans
    enumerate registered surfaces (M0), only to admit the new entry.
  - `apps/madbridge/src/tui/main.tsx` (composition, M1).
  - `apps/madbridge/src/tui/App.tsx` (client wiring props, M2–M4; the second
    surface pane, M3).
  - The TUI files that name the second pane, today under
    `apps/madbridge/src/tui/`: `App.tsx`, `main.tsx`, `types.ts`,
    `keybindings.ts`, `keyboard-router.ts`, `hooks/useKeyboard.ts`,
    `panes/AntigravityPane.tsx`, `panes/GovernancePane.tsx`,
    `components/DockStrip.tsx`, `components/PaneTabs.tsx` and
    `components/agent-identity.ts`, and the comment that names
    `AntigravityPane` in `panes/ClaudePane.tsx` — only to make the second pane
    the madv-surface pane (M3). The routing logic of `keyboard-router.ts` is
    reused, and its PTY emit becomes the `pty_input` source.
  - `apps/madbridge/src/commands/start.ts` (the M6 candidate ONLY).
- **Created:** `packages/adapter-madv-surface/` (M0, with its input encoder;
  its live attester in M1); `apps/madbridge/src/tui/live/`
  (composition, client adapter, projection mapper, retention buffer, line
  buffer); evidence scripts under `scripts/phase3b/`; architecture tests under
  `test/phase3b/`; evidence packets under `docs/verification/`.
- **Removed:** nothing.

## 2A. Slice map

| Slice | Deliverable | Binding base | Evidence |
| --- | --- | --- | --- |
| H1 | The small items Phase 3A carried to the first Phase 3B act (§2D items 5 to 11) | the binding base of Phase 3B | build log |
| H2 | The capability record amended for Linux (`DEC-20261010-02` B5) | merge of H1 | build log |
| M0 | madv-surface admission: registration, allowlist, probe parsers, launch descriptor, adapter, investigation, capability records on both hosts | merge of H2 | investigation packet |
| M1 | Live composition, health barrier, production live attesters for both surfaces, §2D items 3, 4 and 12 | merge of M0 | Track 1 (offline) |
| M2 | Snapshot projection | merge of M1 | Track 2 (offline) |
| M3 | Ordered output frames, input ownership and encoding, production `pty_input`/`pty_resize` routing (§2D item 1), the madv-surface pane | merge of M2 | Track 2 (offline) |
| M4 | Session controls; approval commands fail closed | merge of M3 | Track 2 (offline) |
| M5 | Negative controls (3B design §4, with §2D items 2, 3 and 12) | merge of M4 | Track 3 (offline) |
| M6 | The certification candidate, not merged | a branch from the merge of M5 | Track 4 (the candidate commit) |
| M7 | Runs on both hosts, exact-SHA Tier-2 verdict and Founder authorization at the candidate head; merge; filing of the run packets | the M6 candidate head | Track 5 |

Rule: each slice's binding base is pinned in its act before work begins and
never re-based silently. Any re-base is a Founder-approved amendment.

M0 depends on H2 and on a reviewed madv-surface release (§5 item 3). H1 and H2
do not depend on the release and may run while it is prepared.

## 2B. Suite-count floor and where it is proven

- **Floor:** the full, unfiltered root `bun test` counts recorded at Task 59's
  head on both certification hosts (`DEC-20261106-01` B5 item 6 and B8). The
  final merge review records them in `DEC-20261106-02` B6 item 1: 1914 pass and
  0 fail across 140 files on both hosts. The approval act of this plan states
  the numbers it binds.
- The floor ratchets: each slice's own tests raise it; it never lowers. A slice
  that lands with fewer passing tests than the floor does not land.
- Proven in two places per slice: (1) Verify and Verify (macOS) green on the
  slice's pull request; (2) the local full-suite summary lines
  (`<n> pass`, `<n> fail`, `Ran <n> tests across <m> files`) in the slice's
  evidence, from a run in a terminal that is not a Claude Code session, so that
  per-test lines are printed.

## 2C. Builders, reviewers and counting

- Each slice act names its builder session and its Tier-2 reviewer. The 3A
  design's builder rubric (§7.2 required milestones, §7.3 correction-round
  accounting) and the 3A plan's §11.3 apply to Phase 3B verdicts; the
  correction-round log continues, and the approval act maps each 3B slice to
  its rubric milestone (§5 item 9).
- Builder qualification under 3A design §7.7, recorded in the form of §7.8, is
  not self-asserted, and a change of builder does not waive it. The approval
  act rules which qualification record Phase 3B keeps, for which builder, and
  what becomes of the GLM record the commission named (§5 item 9). A different
  qualification rule would be an explicit amendment of 3A design §7.7.
- Tier-2 verdicts are posted only after the Founder's command has checked the
  report against its own logs and against the reviewed head: every quoted log
  excerpt must appear in that log, every quoted source line must appear in the
  file at the head, and every listed log must match its SHA-256. A report that
  fails any check is not posted and is not a verdict.

## 2D. Items Phase 3A carried to Phase 3B

Each item below was carried by a signed Phase 3A act. The act that authorizes
the slice named here rules on it.

1. **Production `pty_input`/`pty_resize` routing** — `DEC-20261102-01` B2,
   items 2 and 11, with the acknowledgement deadline of 3A §9.8 → **M3**.
2. **End-to-end malformed-frame scenario through a production receive path** —
   `DEC-20261102-01` B2, item 14 → test in **M3**, evidence in **M5**.
3. **Production detectors for authentication expiry and attestation failure**,
   which Phase 3A exercises only through the harness — `DEC-20261102-01` B2,
   item 15 → detectors in **M1** (from each adapter's registered
   `auth_failure_detection` and, for madv-surface, its exit codes and identity
   events), evidence in **M5**.
4. **What a governed child reads from its own working directory is not the
   environment the host gives it** — `DEC-20261102-04` B2 item 1 (pull
   request 211, comment 4445549038), "with the adapter launch work" → **M1**,
   and the M0 adapter is built to the same launch rule.
5. **`export-evidence.ts` imports `packages/supervisor/src` by a relative path
   without a declared package dependency** — `DEC-20261102-01` B3 item 2
   (item 16). Declaring it changes a manifest and `bun.lock` → **H1**, only on
   a Founder dependency ruling (§5 item 6); otherwise it stays as it is.
6. **The blank line at the end of `apps/madv-agent/src/proxy.ts`** — Addendum 3
   B5 to `DEC-20261104-02` → **H1**.
7. **Tightening the six Task 58 tests** in
   `test/phase3a/evidence-pipeline.test.ts` — Addendum 4 B3 to
   `DEC-20261104-02`: an operating-system version in the operating-system
   line; a failure count of zero and a complete-suite floor in the suite-count
   test; `grace_ms`, `termination_started_ms` and `exited_ms` in the grace row;
   and the same changed-file list in both reports at one candidate commit →
   **H1**.
8. **Item 16's residual census detects a fixture ledger left open before its
   storage is removed** — `DEC-20261106-02` B2, the advisory finding of Task
   59's Tier-2 review: if the test-only harness skips closing a fixture
   session's ledger, all six merge-gate tests still pass → **H1**.
9. **Item 13's check covers the whole module set the shipped entry point loads
   for `start`**, and finds there no file of the broker, the PTY host or the
   supervisor's runtime, and nothing of the harness — `DEC-20261106-02` B5
   item 1 (pull request 228, comment 4497468572) → **H1**. The M6 candidate
   then changes the item 12 and 13 tests as 3A design §4.2 requires.
10. **Item 15's importer check resolves each specifier, or normalizes its last
    segment, before comparing it** — `DEC-20261106-02` B5 item 1 (comment
    4497468630) → **H1**.
11. **Item 15's test fails when a sweep reports an error** — `DEC-20261106-02`
    B5 item 1 (comment 4497468674) → **H1**.
12. **Live attestation for `claude-code` checks the model of every response,
    and a fallback to another model ends the session as an identity mismatch**,
    before any governed Claude Code session runs live — `DEC-20261104-01` B4
    → production live attester and per-response check in **M1**, offline
    negative control in **M5**, live evidence at the candidate head in **M7**.
    The `claude-code` registration's values do not change.
13. **Every act that authorizes a caller of preflight cites the rulings that
    govern preflight callers** — `DEC-20261020-01` B2 (no further use of
    preflight until the change of `DEC-20261016-01` B1 and the binding of B3
    are on `main`, and every such later act cites `DEC-20261015-03` B5 items 2
    and 3 and that B2), and item 4a of the Founder's merge authorization of
    pull request 183, as `DEC-20261027-01` A3 states it (preflight fails with
    `repository_fingerprint` when the git common directory of the repository
    root differs from that of the worktree) → the act of each slice that adds
    or runs a caller of preflight: M0 if its tests or investigation run
    preflight, M1 for the production caller, and M7 for the runs at the
    candidate head. Each such act cites those rulings and confirms the
    prerequisite changes are in its binding base; M0 keeps the
    `repository_fingerprint` checks unchanged when it changes probe dispatch.

Items 8 to 11 tighten the Phase 3A merge-gate block in
`test/phase3a/architecture-phase3a.test.ts` and, for item 8, the test-only
harness. None changes a production file.

The stated limitations of Phase 3A that are not carried (`DEC-20261102-01` B3
items 1 and 4, Addendum 3 B5's whitespace errors) stay limitations; the Task 59
evidence quotes them.

## 3. Slice sequence

### H1 — Carried Phase 3A items

- §2D items 6 to 11, and item 5 if the Founder rules a dependency.
- Each tightening of items 8 to 11 must fail under a break of what it checks
  and pass at H1's head; the merge-gate block must still hold every §6.8 item
  it held at Phase 3A's final merge.
- The six tests of item 7 must still pass on both reports as they are on
  `main`; a tightening that a report on `main` cannot meet halts for the
  Founder, since the reports are signed evidence and are not edited.
- Evidence: build log.

### H2 — The capability record for Linux

- The separate task act that `DEC-20261010-02` B5 requires. It names the Linux
  host fields, how freshness compares them, how the store keeps them, and the
  tests. macOS records keep their fields and stay valid; no macOS field is
  filled with a Linux placeholder.
- If a platform-specific installation input needs a branch, the act first
  states the 3A design §1.5 amendment that allows it.
- No live call; no capability record is written in this slice.
- Evidence: build log.

### M0 — madv-surface admission

- **Prerequisites (Founder):** the profile (`minimax`), model and role of §5
  item 1; the plan-terms ruling of §5 item 2; a reviewed madv-surface release
  (§5 item 3); the identity probe of §5 item 12.
- **Registration:** one `AdapterRegistrationV1` for surface `madv-surface`:
  executable name, the reviewed release version, identity probe and
  auth-readiness probe (`auth status --profile minimax`), the non-interactive
  flags, environment allowlist reference `madv-surface-v1`, and provider
  `minimax`, independence domain `minimax` and the organization the approval
  act names, as single static values.
- **Launch descriptor and pins:** the PTY host launches madv-surface; the
  adapter does not start a subprocess itself. Launch and probes pin the same
  profile, the envelope's exact model, `--require-model`, the role mapping
  (independent-reviewer to `--role reviewer`) and `--no-session-persistence`,
  as far as each command takes them. An unsupported profile, family or role
  fails in preflight, before any governed work.
- **Probe parsers:** production identity and auth-readiness parsers for
  madv-surface, dispatched by registration in `attestation.ts` and
  `preflight.ts`, keeping the bounded probe cleanup and four-way environment
  equality of 3A §5.4. Claude Code's parsers stay as they are. No test-only
  seam is used as the production mechanism.
- **Adapter:** `packages/adapter-madv-surface`, on the contracts of
  `packages/adapter-claude-code`: parse the event stream, attach each event to
  its execution and session, enforce event order and the missing-evidence
  deadline, apply the exit precedence of 3B design §2.6 item 2, and send every
  identity or auth failure to whole-session interruption. Its input encoder
  turns one text into one stream-json user message; M1's attester uses it.
  One parser serves the identity probe, the startup attestation and the checks
  of every later response.
- **Investigation:** a surface investigation under 3A §2.2 and §2.3, on the
  MacBook and, after H2, on the Ubuntu PC, with live calls named by the slice
  act. It establishes whether the `minimax` response model field reports the
  model actually used (3B design §2.6 item 1), including a request for an id
  MiniMax documents as served by another model, and records the primitive and
  its limits. It rejects echoes, aliases and unresolved evidence. If resolved
  identity is not shown, it halts admission for the Founder. Otherwise it
  writes a capability record for the exact binary hash on each host.
- **Tests (offline):** registration and allowlist tests; parser tests; adapter
  tests against recorded event streams, including every exit of the precedence
  (HTTP 401 and 403, a redirect, other HTTP and parse failures, a missing
  model field, an Anthropic or unnamed family, a model or domain mismatch) with
  its typed cause, and the deadline; four-way environment equality with a synthetic secret
  canary; architecture tests updated only to admit the entry; 3B design §4
  negative controls 7, 9 and 10 at unit level.
- Evidence: investigation packet with both hosts' capability records.

### M1 — Live composition, health barrier and live attesters (no TUI change)

- Compose the runtime foundation in one foreground process through the
  existing factory pieces, in the order of 3A §2.1, with the `claude-code` and
  `madv-surface` adapters; wire the existing health barrier to a `present`
  callback.
- Production live attesters for both surfaces, attached at composition: each
  sends one fixed, bounded attestation prompt to the governed child through
  its input before activation, waits for the response within a stated
  deadline, and checks its reported model against the envelope; the
  `claude-code` adapter checks the model of every later response (§2D item
  12). A failure interrupts the session before or after activation.
- The act names, for each surface, the response events and field paths the
  attester reads; how a missing, malformed or duplicate event fails; the
  monotonic deadline and the cleanup on cancellation; how the startup parse
  hands over to continuous monitoring without losing a buffered event; and how
  the attestation prompt's tool use and provider round-trips are limited, with
  the call count of §5 item 11 enforced. madv-surface's `--max-turns` counts
  provider round-trips per user message, so one prompt can be several calls.
- `packages/adapter-claude-code` has no input encoder today; M1 adds one of the
  same form, which its attester uses and M3 reuses.
- The preflight-caller rulings of §2D item 13.
- §2D items 3 and 4.
- Fail-closed: barrier failure exits nonzero naming the component.
- Evidence (offline, controlled stand-in executables): startup transcript
  (healthy), barrier-failure transcript (named component, nonzero),
  attestation-failure and fallback transcripts.

### M2 — Snapshot projection

- `clientSnapshotToProjection` mapper + pinned test table, following 3B design
  §2.2: `connected` and `executions` preserved when present, each
  `ExecutionSnapshot` mapped to the TUI's execution identity by the mapping
  the act specifies, and the members not produced passed through as honest
  absence. The act may allow the change to `apps/madbridge/src/tui/types.ts`
  that lets the projection represent a `null` `executions`.
- `App` receives live snapshots via the existing `subscribe` prop; pane
  headers, status bar, decision visibility all driven by real state.
- Evidence (offline): recorded snapshot stream → rendered frames (scripted).

### M3 — Ordered output frames and input ownership

- Per-execution `output()` → bounded pane buffers (ring; overflow-oldest,
  observable); the focused pane's line buffer and the adapter's input encoder
  built in M0 (and the `claude-code` encoder built in M1) → `pty_input` for the
  focused surface; resize → `pty_resize`, routed in
  production to the PTY host within the 3A §9.8 acknowledgement deadline (§2D
  item 1). Fencing results render as honest status words.
- The second surface pane becomes the madv-surface pane (§2 modified list).
- The malformed-frame test of §2D item 2.
- Evidence (offline): ordered-frame transcript; transport transcript (bytes
  reach the PTY host); usable-input transcript (a submitted line, encoded as
  one stream-json user message, produces a response from a controlled
  stand-in).

### M4 — Session controls

- Session controls (`pause/resume/close`) as confirmed operator verbs
  rendering `session_*` results honestly; ledger entries appear in the Event
  Log pane.
- Alt+Y/N stay behind the unchanged guard and fail closed with
  `approval_not_pending`, rendered honestly; no approval source is added.
- Evidence (offline): pause/resume/close transcripts; the fail-closed approval
  transcript.

### M5 — Negative controls

- The 3B design §4 negative-control suite, scripted through the composed
  runtime with controlled stand-ins, with packets, and the evidence of §2D
  items 2, 3 and 12.
- No production `start` runs in this slice.
- Evidence (offline): sanitized packet under `docs/verification/`; raw
  artifacts external.

### M6 — The certification candidate

- One commit on a branch from the merge of M5: replace the `start` placeholder
  with the certified composition; the same commit asserts the 3A gate
  deliberately changed (architecture test), changing the item 12 and 13
  merge-gate tests as 3A §4.2 requires.
- The commit cites by path the §6.9 evidence that exists before it and the
  three host spike reports of 3A §3.6 that 3A §4.2 requires (3B design §3 row
  2), and names the procedure of 3B design §5 for the evidence its own head
  produces.
- Its pull request stays a draft and is not merged in this slice.

### M7 — Runs at the candidate head, Tier-2 verdict, authorization and merge

- On both certification hosts, from a fresh clone of the candidate's exact
  head, under an act naming every live call and citing the rulings of §2D item
  13: startup to clean close, the
  interruption path, the production negative controls, and fresh live-pair
  capability and attestation records, including §2D item 12's live evidence.
- Raw artifacts stay outside the repository and are named by SHA-256.
- Exact-SHA Tier-2 verdict at the candidate head, then the Founder's
  authorization naming that head and the artifacts, then the merge. Any change
  to the candidate makes a new head, and every run and the review repeat.
- After the merge, a docs-only pull request files the sanitized run packets,
  and the Founder's records act enters them. These are the plan's end state;
  nothing else follows inside Phase 3B.

## 4. Tasks

Each slice decomposes into tasks in execution order, each with its own
acceptance test and evidence artifact. Task-level detail is written at slice
start, in the slice's act and builder prompt, so it reflects the code that
exists.

## 5. Open items requiring Founder rulings

The approval act rules items 1, 2, 4, 7, 9, 10 and 13, and states when the
others are ruled.

1. **The madv-surface profile, model and role.** The pair is Claude Code plus
   madv-surface (3B design §0A.2). The registration needs one profile whose
   models come from one maker. Of madv-surface's profiles, `zai` (zhipu),
   `kimi` (moonshot) and `minimax` (minimax) have one family each; `qwen`,
   `ollama`, `opencode-go` and `mistral` name several makers and cannot be
   registered with one independence domain. The Founder chose `minimax` on
   2026-11-07, provisional on M0's investigation. Moonshot documents that
   Kimi's response model echoes the request, which is why `kimi` was not
   chosen. The model is one `MiniMax-` model the M Plan serves; the role is
   `independent-reviewer`, mapped to madv-surface's `--role reviewer`, unless
   the act rules `builder`. The registration's single static values are
   provider `minimax`, independence domain `minimax` and an `organization_id`
   the act names (proposed: `minimax`). The auth-readiness probe reads
   `GET /anthropic/v1/models`; MiniMax does not say whether plan keys may call
   it, and if they cannot, the probe changes to one minimal request. Either is
   a live call on the plan at every start.
2. **Plan terms for `minimax`**, read from MiniMax's own pages and recorded with
   the registration: no clause restricts clients; the M Plan "is designed for
   individual, interactive developer use"; "Pay-as-you-go is recommended for
   production use". The Founder rules whether governed sessions fit. The
   round-2 madv-surface review's quotes of those pages are not used.
3. **The madv-surface release.** Its follow-up build (the two reproduced test
   and rule gaps above, and its Bun-version-dependent TLS test), the review
   the Founder accepts for it, the release commit, and how its binary is built
   and hashed on each certification host.
4. **The bounded-retention cap constant** (line/byte budget) of 3B design §2.3.
5. **The host order** for M0's investigation and M7's runs, and the window
   between the hosts.
6. **Any dependency or file outside §2**, including the declaration of §2D
   item 5.
7. **The Tier-2 reviewer for Phase 3B**, and whether the checks of §2C are
   enough after a review on the same harness quoted code that did not exist.
8. **The Linux capability-record shape** of H2: its host fields and freshness
   rule, in H2's act.
9. **Builder qualification and rubric mapping:** which §7.8 record Phase 3B
   keeps and for which builder, what becomes of the GLM record the commission
   named, and the rubric milestone of each slice (3A design §7.2, §7.3, §7.7,
   §7.8; 3A plan §11.3).
10. **Approvals outside Phase 3B.** The Founder chose on 2026-11-07 that Phase
    3B adds no approval source; the approval act states it.
11. **The attestation prompts and the live-call budget per start:** the fixed
    text of each surface's attestation prompt, its deadline, the most provider
    round-trips and tool calls it may cause, and the calls every start makes;
    M1 enforces the budget.
12. **madv-surface's identity probe:** its argv, its parser, and whether it is
    a live call. Preflight validates the exact provider and model against the
    envelope (3A §2.1); for madv-surface the model actually used is known only
    from a response.
13. **The Claude Code version.** The `claude-code` registration supports
    2.1.296, and the M25 investigation recorded 2.1.314, which it does not
    support (`DEC-20261104-01` A2 item 2). The Founder chooses either a
    supported installation on both hosts, with fresh evidence for that exact
    artifact, or a separate amendment of the registration for another
    version, with its own investigation. No unsupported version qualifies
    meanwhile.

## 6. Explicitly not authorized by approval of this plan

- Execution of any slice. Each slice starts only on its own Founder act, and
  M6 executes only after H1, H2 and M0 to M5 are complete and their evidence
  cited.
- Any live provider call outside a slice act that names it.
- Any merge of the M6 candidate other than on the route of 3B design §5.
- Any production bypass of the gate, and any approval workflow.
- Any change to madv-surface's own repository from this one.
