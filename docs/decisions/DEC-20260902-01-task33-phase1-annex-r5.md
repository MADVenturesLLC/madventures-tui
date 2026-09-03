Task 33 Authorization Packet — Revision 5 (DRAFT — unsigned; Founder issuance required)

Repository: MADVenturesLLC/madventures-tui
Prepared: 2026-09-02 (read-only; PR #39 untouched; no implementation begun)

Revision 5 incorporates the 2026-09-02 drafting corrections pending Founder issuance: item
15(d) narrowed to a single sanctioned exception (`mcp-contract.test.ts -> ../src/mcp-server`;
the socket exception is owned by 15(b)); all authority references relabeled from "Founder
ruling"/"Founder instructions" to "drafting corrections pending Founder issuance"; and the
title corrected to Revision 5 (the title defect originated in revision 3 and propagated
through revision 4). It supersedes revision 4
(`DRAFT-founder-auth-m13-task33-r1-20260902-r4.md`, SHA-256
`11355376a0107f7ffafe2fd261fdbc2e2f27c3c5363200e798e6602e93aa3185`), revision 3
(`8816b20316472c7e69b39a31683545220292e82bf652fb13e4fe0d80dfcc778b`), revision 2
(`656cba4802d0df98932ce53615a319934d1bf7612f5438473ef95db3a529459d`), and revision 1
(`bf0e7e7234a7c116d0cbe4fc9a96a2a0c736bb1afe267f0ee9fecbd76b8a134e`); all four are retained
byte-identical as the superseded record. Status: DRAFT — proposed Founder scope rule,
pending Founder review and formal issuance.
Packet SHA-256: not embedded (self-reference rule); the external identity is recorded in the
custody record at issuance, and the Phase 2 act names that digest.

## 1. Live state at preparation time

- `origin/main`: `136aeacd1d31a390ef3bee8ff5d6526b59d2c30e` (unchanged since 2026-09-01).
- PR #39 `build/m13-tasks30-32-r1`: OPEN, DRAFT, `mergeStateStatus` BLOCKED (unmerged by design).
  Head `52a4e47d88cbc4342bd088cfc4fb001ff86d5ec8`; three commits, first-commit parent
  `136aeacd…`; every commit and the PR body carry
  `Role-Id: builder / Actor-Id: session:claude-code/m13-tasks30-32-r1 / Execution-Surface: claude-code`.
- Baseline at `52a4e47d…` (Bun 1.3.14, macOS 26): **863 pass / 0 fail / 50 files**, stable
  across three independent measurement runs. `expect()` call counts are NOT stable across
  runs at a single head: observed 3,929 / 3,932 / 3,935 (PR #39's record reports 3,932).
  This packet binds the stable invariants — 863 pass, 0 fail, 50 files — and does not bind
  any `expect()` total. The plan's "714/2606/35" (Task 33 Step 5) is stale; the Builder
  measures and reports live values and must not fall below 863 pass / 50 files.

## 2. Part A — Waiver status (already granted, no new ruling needed)

The M13 chain authorization (issued text per Founder; custody draft `923a1dbc4ed1448c4830849d50de7f07e5fd883ffd6e9dcf288002daa812cd72`)
Part A ¶3 waived the "M12 reviewed" and "M13 reviewed" milestone preconditions for the named
chain Task 30 → Task 31 → Task 32 → Task 33 → Task 34. Task 33's plan precondition
"M13 reviewed" is therefore satisfied once M13 is committed, without a new waiver act.

## 3. Part B — Execution authorization: **Task 33** (two-phase; base bound at Phase 2)

### 3.1 Delivery topology — EXPLICITLY CHOSEN: sequential, base bound after PR #39 merges
(Confirmed sound; drafting corrections pending Founder issuance.)

- Phase 1 is this packet: it authorizes Task 33's scope, method, outcomes, delivery, and
  attribution. It binds NO execution base and authorizes NO branch creation.
- Phase 2 is a separate, short Founder act issued only after PR #39 has merged: it names the
  exact post-merge `main` SHA, re-confirms the Section-3.2 hashes (re-derived at that SHA),
  adopts this packet by its SHA-256 digest, and restates the builder binding. The Phase 2 act
  is the execution authority; this packet is its scope annex and never authority alone.
- The stacked-PR alternative (branching Task 33 from `build/m13-tasks30-32-r1`) is
  expressly NOT chosen: PR #39 is a draft; its merge method (squash vs merge vs rebase) is
  undetermined at this time, and any of those would invalidate a stacked-base binding.
  Binding the base after the merge to whatever exact SHA `main` becomes removes these failure
  modes and renders the Task 33 PR diff exactly Task 33's own files. Phase 2 re-validation
  holds even if #39 is squash- or rebase-merged.

### 3.2 Governing text

- Plan Task 33 section (plan `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`,
  lines 1492–1528, 3,879 bytes): SHA-256 `190fca6fc557f4fa488533e40f873de5b46e2de5b82062ef48a4cbf383aade52`.
  Re-derived at the Phase 2 base before the first edit; mismatch = stop and report.
- Full plan: SHA-256 `14e913fa1833753b7c92031b5c7f44d2e0b54b63d8f879d8859c2858a2e267f8`.
- Unblocked note: PLAN-OPEN-4 and PLAN-OPEN-6 block Task 34 (manifest and root-script
  edits), not Task 33. Task 33 touches no manifest, lockfile, CI, or root script.

### 3.3 Quarantine invariant (controlling; per DEC-20260812-01; 2026-09-02 drafting corrections pending Founder issuance)

Dormant modules (`socket.ts`, `mcp-server.ts`, `pty-manager.ts`, both `mcp-config.ts`) are
unreachable from every production AND harness graph. The ONLY sanctioned productions/harness
edges into them are the two dedicated contract tests, which are not "harness reachability"
but the invariant's own guards: the rewritten `packages/broker/test/socket.test.ts`
(imports `../src/socket` directly, path-shape only) and
`packages/broker/test/mcp-contract.test.ts` (imports `../src/mcp-server` directly, the
planned catalog contract test). No other harness or production file may import any dormant
module. In particular, adapter and acceptance harness tests MUST NOT import
`mcp-config`/`mcp-server`; their preview and tool-list assertions are REMOVED in accordance
with the drafting corrections pending Founder issuance.

### 3.4 File scope

Modify (all verified present at the base; each entry is the minimum authorized edit):

1. `packages/broker/src/index.ts` — remove the socket, MCP, and PtyManager export lines
   (`BrokerSocket`, `MADV_RUNTIME_DIR`, `MADV_SOCKET_PATH`, `MCP_TOOLS`, `McpServer`,
   `McpToolDef`, `PtyManager`, `createPtyManager`, and the five PTY types). The
   `pty-host-supervisor` exports (lines 25–26) ARE NOT quarantined and survive.
2. `packages/broker/src/broker.ts` — remove the `./socket` and `./mcp-server` imports
   (lines 7–9) and the `runtimeDir`, `socketPath`, `mcpTools` fields from `InMemoryBroker`
   and `createInMemoryBrokerForTest()`.
3. `packages/adapter-claude-code/src/adapter.ts` — delete `prepareConfigPreview` from the
   contract and implementation; delete the `unix://madbridge.sock` literal.
4. `packages/adapter-claude-code/src/index.ts` — remove the `prepareConfigPreview` re-export.
5. `packages/adapter-antigravity/src/adapter.ts` — same as 3 (contract, implementation, literal).
6. `packages/adapter-antigravity/src/index.ts` — remove the re-export.
7. `packages/broker/test/socket.test.ts` — rewrite as the explicit isolated legacy unit test
   importing `../src/socket` directly, asserting only path-shape behavior, creating no
   socket, no longer importing `createInMemoryBrokerForTest`. (Sanctioned exception, 3.3.)
8. `packages/broker/test/broker.test.ts` — in scope per plan; verified to contain zero
   references to the removed fields, so an edit may be a no-op; confirm and report.
9. `packages/broker/test/mcp-contract.test.ts` — rewrite to import `MCP_TOOLS`/`McpServer`
   directly from `../src/mcp-server`, asserting the 16-tool allowlist contract; it becomes
   the catalog contract test. (Sanctioned exception, 3.3.)
10. `apps/madbridge/test/pty-focus.test.tsx` — retarget the five `PtyManager` cases to the
    fixture byte router (`createFakeByteRouter`), importing it — not `pty-manager.ts`,
    which stays dormant.
11. `packages/adapter-claude-code/test/integration.test.ts` — REMOVE the
    `prepareConfigPreview()` call, the `preview.backupPath` assertion, and the
    "config write" absence assertion (all preview-context). No import of `mcp-config`.
    (2026-09-02 drafting corrections pending Founder issuance.)
12. `packages/adapter-antigravity/test/integration.test.ts` — REMOVE the
    `prepareConfigPreview()` call and the `preview.backupPath` assertion. No import of
    `mcp-config`. (2026-09-02 drafting corrections pending Founder issuance.)
13. `test/adapter-parity.shared.ts` — REMOVE the two preview tests
    ("prepareConfigPreview does not mutate live config", "backup path is returned and
    restorable"). No import of `mcp-config`. (2026-09-02 drafting corrections pending
    Founder issuance.)
14. `test/acceptance/two-way-collaboration.test.ts` — REMOVE the `describe("absence of
    arbitrary shell/filesystem MCP tools")` block and its two tests (lines 329–354),
    which consume `broker.mcpTools`. No import of `mcp-server`. (2026-09-02 drafting
    corrections pending Founder issuance.)

Create (no alternative):
15. `test/phase3a/architecture-phase3a.test.ts` — ADD to this existing file the three
    Step-1 tests that mandate the quarantine, plus the mandatory fourth architecture test
    (15(d)): (a) "the broker package index exports no socket, MCP, or PtyManager symbol"
    (asserts absence from the `@madventures/broker` module namespace — enforcement of 3.3,
    not reachability); (b) "no production or harness file imports socket.ts" (only the
    rewritten `packages/broker/test/socket.test.ts` matches — this test owns the socket
    exception); (c) "no production file constructs a unix:// URL"; (d) "no production or
    harness file imports mcp-server, pty-manager, or either mcp-config, with a single
    sanctioned exception" — a production-and-harness import scan over the four dormant
    modules (`packages/broker/src/mcp-server.ts`, `packages/broker/src/pty-manager.ts`,
    `packages/adapter-claude-code/src/mcp-config.ts`,
    `packages/adapter-antigravity/src/mcp-config.ts`) permitting EXACTLY one sanctioned
    edge: `packages/broker/test/mcp-contract.test.ts -> ../src/mcp-server` (catalog
    contract test). Any import of `mcp-server`, `pty-manager`, or either `mcp-config` into
    a production or harness file other than that single sanctioned edge fails the test;
    with the item-1..6 removals, `socket` retains no production import at all and its only
    harness edge is the sanctioned `socket.test.ts` (owned by 15(b)). This file is omitted
    from the plan's Files list but its edits are mandated by plan Step 1; the Steps govern.
    No alternative applies; the tests are the invariant's enforcement.
16. `test/phase3a/fixture-adapters.ts` — NEW file exporting
    `createFakeByteRouter(): { write(id: string, bytes: Uint8Array): void; onData(id: string, cb: (b: Uint8Array) => void): void }`;
    no process spawn, not named a PTY.

Preserve (must remain present and byte-level untouched, no deletion):
- `packages/broker/src/socket.ts`, `packages/broker/src/mcp-server.ts`,
  `packages/broker/src/pty-manager.ts`, `packages/adapter-claude-code/src/mcp-config.ts`,
  `packages/adapter-antigravity/src/mcp-config.ts`.

(No file is added to scope beyond this list; items 11–14 are mandatory-removal edits
carrying no import of the modules they displace.)

### 3.5 Method

Follow plan Steps 1–7 in order, test-first: write the named failing tests (which will also
fail because items 11–14 still reference the dying surface — that RED is the expected
harness breakage, not a test defect); capture the RED output verbatim; implement the minimum
authorized behavior (including items 11–14 removals); capture GREEN. Exactly one commit on
branch `build/m13-task33-r1` (created from the Phase 2 base), subject exactly:
`refactor!: quarantine socket, MCP, and pipe-PTY scaffolding from production reach`
containing only the files listed in 3.4. Plan checkboxes are not edited.

### 3.6 Required outcomes

- `bunx tsc --noEmit` exit 0.
- Focused: `bun test test/phase3a/architecture-phase3a.test.ts` green, including the four
  new Step-1 tests (15(a)–15(d)); rewritten `socket.test.ts` and `mcp-contract.test.ts` green; the four
  harness files (11–14) compile and pass with their removals; adapter integration suites
  green without any `prepareConfigPreview` reference; acceptance suite green without
  `broker.mcpTools`.
- Full suite: `bun test` — 863 pass / 0 fail / 50 files at minimum. `expect()` totals are
  not bound (Section 1: nondeterministic across runs at a single head).
- `git diff --check` clean.
- Structural invariants (asserted by 15): `@madventures/broker` module namespace contains
  none of the eight quarantined names; no production or harness file outside
  `packages/broker/test/socket.test.ts` imports `socket.ts`; no production source matches
  `unix://`; no file in the Preserve list was deleted or modified; `InMemoryBroker` exposes
  no `runtimeDir`/`socketPath`/`mcpTools`; `pty-host-supervisor` exports intact; no harness
  file except the two sanctioned contract tests imports `socket`, `mcp-server`,
  `pty-manager`, or `mcp-config`.

### 3.7 Delivery

Push `build/m13-task33-r1` and open a DRAFT pull request against `main` — only after Phase 2
has named the post-merge base; plan Step 8 (stop at the M14 review checkpoint) is satisfied
by stopping after the draft PR is open. Report: the full 40-char commit SHA and subject, PR
number, measured counts (focused and full), verbatim RED output from Step 2, and the
Section-3.2 hash re-derivation at the Phase 2 base. Then stop. No merge, no
ready-for-review transition, no thread resolution.

### 3.8 Builder binding and attribution

I authorize `session:claude-code/m13-task33-r1` on registered execution surface
`claude-code` (FounderOS `04-agents/execution-surface-registry.md`), launched through the
`madbridge-claude-v5` gateway from a fresh checkout of the Phase 2 base, to perform Task 33
as `Role-Id: builder`. Hermes remains the neutral orchestrator: it may dispatch, monitor,
independently verify, and report, and may not author any implementation commit. Commits and
the PR body carry exactly:

    Role-Id: builder
    Actor-Id: session:claude-code/m13-task33-r1
    Execution-Surface: claude-code

Tier-2 review of the resulting head is performed by a non-Anthropic seat (Codex or Gemini),
named in the later merge-review act.

## 4. Part C — Not authorized by this act

Task 34 or any other task; creation of any branch or PR before Phase 2 binds a base; any
stacked PR based on `build/m13-tasks30-32-r1`; any merge; marking the PR ready for review;
resolving review threads; edits to `docs/**`, `.github/**`, CI, branch protection,
rulesets, CODEOWNERS; any manifest, lockfile, or root-script change (all Task 34); deleting
or otherwise altering the five Preserve files; any change under `apps/madbridge/src/tui/**`;
modifying, moving, deleting, ignoring, or committing the six known untracked working-tree
paths; closing issue #18; beginning M20 or Phase 4.

## 5. Stop conditions

Return `FOUNDER_DECISION_REQUIRED` and make no further change if: PR #39 is not merged when
Phase 2 is drafted; the Phase 2 base is any SHA other than the exact post-merge `main`;
any hash in 3.2 does not re-derive at the Phase 2 base; a plan step requires a file outside
the 3.4 list; a RED step does not fail for the reason the plan states; a governing text
conflicts with this act; any required tool, seat, or environment cannot be verified.

## 6. Void clause

Any change to the base, scope, commit subject, or governing-text identities voids this
authorization in its entirety, including if PR #39's branch head or merge method changes the
post-merge `main` in a way that fails Section-3.2 re-derivation; a fresh act is required.

## 7. Phase 2 act mechanics (for Founder issuance after PR #39 merges)

One short Founder act, in the Founder's own words, containing: (a) the exact post-merge
`main` SHA; (b) re-confirmation of Section-3.2 hash identities at that SHA; (c) adoption of
this packet by its SHA-256 digest — the digest recorded in the custody record at issuance of
this revision, which the Phase 2 act names explicitly; (d) a restated builder binding per
3.8. Nothing in this packet substitutes for that act.
