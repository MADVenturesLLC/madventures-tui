# Phase 3A Runtime Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` only after the Founder separately approves this plan’s exact SHA and authorizes implementation.

**Goal:** Build and fixture-verify the Phase 3A runtime foundation while production live startup remains structurally unavailable.

**Architecture:** One foreground supervisor uses an in-process `BrokerClient`, append-only lifecycle truth, per-child PTY hosts with anonymous lifelines, validated host-owned storage, and a structurally test-only runtime harness. Phase 3A does not activate a real live session or connect the production TUI.

**Source baseline:** `SOURCE_BASELINE_SHA` = `aa16032c56fdf6c7105e99b1765ed9365d605bf4` — the immutable comparison baseline. See §0A for the distinction from `IMPLEMENTATION_BASE_SHA`, the commit implementation actually starts from.

**Authority:** The approved Phase 3A specification and `DEC-20260812-01`.

**Implementation status:** Plan APPROVED — Founder approval occurred at PR #10 head `1b46856a646266d3c7eb9882cc74f0c5f9f4cfb5`, merged as `70c6a2359feb88cc4e3cc21301e18221313f6f8e`. Confirmed by [`DEC-20260831-01`](../../decisions/DEC-20260831-01-phase-3a-authority-drift-reconciliation.md) clause 2 (2026-08-31); the prior "NOT AUTHORIZED" wording was stale metadata. Plan approval is **not** blanket implementation authority — each task still requires separate Founder authorization at its own exact base SHA (see the gating in the paragraph below).

**Approval status:** CONDITIONAL. All 60 tasks are specified and reviewable now. **Plan approval alone starts nothing.** Three gates must be satisfied before any task begins: Tier-2 approval of the exact plan SHA, Founder approval of that exact SHA, and separate Founder authorization of the specific task. The Stage 0 execution path contains 8 tasks (Task 60, Tasks 1–5, and the M17 dual-host spike, 38–39), but Stage 0 membership is **not** simultaneous eligibility — only **Task 60 and Task 1** are initially eligible, and only after `IMPLEMENTATION_BASE_SHA` is recorded per §0A. The other six unlock through their own written preconditions, in order. The remaining 52 tasks are additionally blocked behind Tasks 6, 34, 35, and 37 — which need the five `PLAN-OPEN-*` Founder rulings in §1A — and behind the M17 gate. `PLAN-OPEN-1` alone unblocks 28 of the 52. See §13.9 for the staged execution map.

---

## Plan provenance and verified baseline facts

| Fact | Verified value | How verified |
| --- | --- | --- |
| Branch | `design-phase-3a-runtime-foundation-plan` | `git branch --show-current` |
| HEAD **at plan authoring** | `aa16032c56fdf6c7105e99b1765ed9365d605bf4` | `git rev-parse HEAD` |
| Worktree | clean | `git status -sb` |
| Suite | 714 pass, 0 fail, 2606 `expect()`, 35 files | `bun test` |
| TypeScript | clean (exit 0) | `bunx tsc --noEmit` |
| Whitespace | clean | `git diff --check` |
| Plan-authoring host | `x86_64`, macOS 13.7.8 build 22H730, Bun 1.3.14 | `uname -m`, `sw_vers`, `bun --version` |

Every path in this plan was confirmed against the live tree at that SHA. No path or interface is quoted from memory.

---

## 0A. Execution base semantics

This plan was authored at one commit and will be executed from a different one. Those are two distinct SHAs and the plan names them separately. Conflating them is what made an earlier revision of Task 1 unexecutable — it required `HEAD` to equal the authoring baseline, which stops being true the moment the plan itself is committed.

| Name | Value | Role |
| --- | --- | --- |
| `SOURCE_BASELINE_SHA` | `aa16032c56fdf6c7105e99b1765ed9365d605bf4` — **fixed, immutable** | The comparison baseline for every Phase 3A diff, regression check, file-map claim, and suite-floor measurement. Every `git diff` in §12 compares against this. It never changes. |
| `IMPLEMENTATION_BASE_SHA` | `70c6a2359feb88cc4e3cc21301e18221313f6f8e` — Founder-recorded, per [`DEC-20260831-01`](../../decisions/DEC-20260831-01-phase-3a-authority-drift-reconciliation.md) clause 2 (2026-08-31). | The exact clean commit the implementation branch starts from: the PR #10 merge commit that added this plan on top of `SOURCE_BASELINE_SHA`. Verified an ancestor of `main`. |

**`IMPLEMENTATION_BASE_SHA` is now recorded above.** It is the PR #10 merge commit (docs-only: this plan file, added on top of `SOURCE_BASELINE_SHA`), per the Founder's 2026-08-31 ruling. This is a pre-execution bookkeeping record, not itself a task authorization — Task 1 and every downstream task still require their own separate Founder authorization per the gates in the paragraph above and in §0A below.

It is **not** a `PLAN-OPEN-*` item. The five `PLAN-OPEN-*` items are authority-bearing *architecture* values reserved to the Founder. This is a pre-execution *bookkeeping* record: the Founder writes down which commit implementation starts from. It gates Task 1 and therefore everything downstream, but it settles no design question and needs no architectural review.

**Required before Task 1 may begin:**

1. The Founder records the exact `IMPLEMENTATION_BASE_SHA` and approves it explicitly.
2. The implementation worktree is clean and `HEAD` equals that SHA.
3. The range `SOURCE_BASELINE_SHA..IMPLEMENTATION_BASE_SHA` is verified to contain **only approved documentation changes** — no production source, test, manifest, or lockfile change:
   ```bash
   git diff --name-only "$SOURCE_BASELINE_SHA".."$IMPLEMENTATION_BASE_SHA"
   # every path must be under docs/ ; any packages/, apps/, test/, *.json, or bun.lock entry fails this check
   ```
4. Task 1 has its own separate Founder authorization under the per-task rule in §5.

If the range check surfaces any non-documentation change, **stop under §10 condition 2** — the live repository has diverged from the tree this plan was written against, and the file map's presence/absence claims in §13.4 can no longer be trusted without re-verification.

---

## 1. Global constraints

These are binding for every milestone. They are copied from the approved specification; where this plan and the specification could be read differently, the specification and `DEC-20260812-01` control.

1. **Exactly two active executions through one centralized cardinality constraint.** One named constant `MAX_ACTIVE_SURFACES_V1 = 2` and one envelope validator enforce `executions.length === MAX_ACTIVE_SURFACES_V1`. No other module may encode cardinality (spec §1.2).
2. **Canonical `ExecutionIdentity[]`.** The existing protocol `ExecutionIdentity` is the canonical envelope and runtime identity, evolved per §9.1. There is no `surfaces` collection and no `SurfaceIdentity` type. No `surfaceA`/`surfaceB`, `adapterA`/`adapterB`, or paired tuple types outside the centralized validator. `PairConstraintsV1.allowed_surface_pairs` is exempt by that exact field name only; the TUI is exempt in Phase 3A (spec §§1.2, 9.1).
3. **One foreground supervisor.** One OS process owns the broker, ledger, PTY hosts, and adapters. No daemon is created, connected to, or depended on (spec §1.1).
4. **Supervisor exit kills every governed process fail-closed.** Clean exit, crash, or signal terminates every governed child, invalidates the live fencing token, and closes the session. No partial session persists (spec §1.1).
5. **`BrokerClient` is the only TUI/adapter boundary.** It carries asynchronous, serializable-shaped plain data. No PTY descriptor, subprocess handle, ledger handle, policy object, callback carrying mutable state, or shared mutable state crosses it (spec §§1.1, 4.1).
6. **No daemon, socket transport, `broker.sock`, named runtime endpoint, or hidden production path.** `BrokerSocket` stays dormant scaffolding; `MADV_RUNTIME_DIR` stays quarantined; no named runtime endpoint is created in Phase 3A (spec §§1.4, 4.4).
7. **Production `madbridge start` remains gated.** Exit status `78`, stable error `live_runtime_not_certified`, exact human and JSON output per §4.2, no filesystem inspection, no runtime import, no bypass flag, environment variable, debug branch, dynamic import, or alternate argument path.
8. **The fixture harness is structurally unreachable from production.** The only harness entry is `test/phase3a/runtime-harness.ts`. No source under `apps/` or a published package index may import or dynamically resolve it (spec §9.11).
9. **No automatic or mid-session surface substitution.** Substitution is prohibited and structurally impossible: any surface failure invalidates the token and ends the session before a successor envelope can be authorized (spec §2.4).
10. **Founder-selected startup re-authorization only.** No alternative is preselected, no one-keystroke confirmation exists, selection is a distinct typed Founder authorization, the Founder issues a new envelope naming the exact replacement identity, the complete pair is revalidated, and the next session receives a new fencing token (spec §2.4).
11. **Append-only single ledger chain.** Phase 3A extends the existing `bun:sqlite` append-only hash-chained ledger. No second session database, parallel event store, or authority-bearing second chain (spec §9.6).
12. **One lifecycle reducer for live apply and replay.** The canonical reducer is `packages/ledger/src/rebuild.ts:reduceLedgerEvent`. The broker calls that exact function after each successful append/transaction; `packages/broker/src/reconciliation.ts` delegates to it. Neither may maintain a second transition table, synthesize first activity into `active`, or mutate lifecycle state ad hoc (spec §§9.6, 9.14.2).
13. **No fabricated execution identity.** Broker lifecycle truth uses `SessionLifecycleEventV1` with `actor: "madbridge"`. No `BridgeEventV1` is minted with a fabricated sender (spec §9.6).
14. **No partial session persists.** Any build failure triggers mandatory rollback through the same containment machinery used for live interruption (spec §2.1).
15. **Host-owned authentication and per-adapter allowlisted environments.** Identity probes, auth-readiness probes, PTY hosts, and governed children receive the same exact allowlisted environment; four-way equality and the absence of every non-allowlisted ambient variable are asserted (spec §5.4).
16. **No credential custody.** The supervisor does not store, copy, refresh, broker, or initiate login flows. Secret-marked values are redacted from diagnostics, errors, environment reports, and evidence; names may be recorded, values may not (spec §§5.4, 9.12).
17. **Application Support storage with passwd-resolved home and `MADV_STORAGE_DIR`.** Root is `<passwd-home>/Library/Application Support/MADVentures/madventures-tui/`. Default home is `getpwuid(getuid())`, not `$HOME`; a divergent `$HOME` is a typed preflight failure. `MADV_STORAGE_DIR` is the only override and passes the same validator. Phase 3A does not create `runtime/` (spec §§5.1, 5.2).
18. **Ledger-write failure interrupts the whole session.** A mid-session append failure triggers typed interruption `ledger_write_failed` and terminates the session; if the interruption cannot be persisted, next-start reconciliation records the unclean closure (spec §5.3).
19. **Bun.Terminal spike before production PTY-host construction.** The pre-written candidate is `Bun.Terminal`. The spike must prove every §3.6 criterion before the production PTY host is built (spec §§3.6, 9.7).
20. **Both Intel and Apple Silicon macOS verification.** The same reviewed commit is tested independently on the Founder iMac and MacBook. Both signed-off, checksummed reports must pass before merge (spec §§3.6, 6.5).
21. **No native dependency, FFI alternative, pipe fallback, or design weakening without a new Founder-approved amendment.** FFI `posix_openpt`, `node-pty`, another native dependency, or a pipe fallback is not an implementation choice (spec §9.7).
22. **TUI live integration and start-gate removal remain Phase 3B.** Gate removal is a certification event citing dual-host reports, a live-pair certification, TUI integration evidence, and production acceptance plus negative-control results (spec §§0.1, 4.2, 6.9).
23. **Test count cannot shrink.** The suite must not regress below 714 tests, 2606 `expect()` calls, and 35 files. Phase 3A-required coverage increases the suite rather than replacing it (spec §6.8.1).
24. **No skipped or disabled required tests.** No required or existing test is skipped, disabled, filtered, quarantined, marked `.only`, or otherwise excluded without an explicit Founder-visible disposition (spec §6.8.1).
25. **No implementation milestone may silently change the approved architecture.** Material scope expansion requires a stop and Founder approval before implementation; implementing first and disclosing afterward is a qualification failure (spec §7.4).

---

## 1A. Open authority items requiring Founder ratification

The approved specification fixes the architecture completely, but it deliberately reserves certain **values** to the Founder. This plan does not invent them. Each item below blocks completion of its owning milestone. The implementer must stop at the named checkpoint and obtain a written Founder ruling.

| ID | Open item | Specification basis | Blocks |
| --- | --- | --- | --- |
| `PLAN-OPEN-1` | Exact production entries of `packages/protocol/src/adapter-registry.ts`: which `SurfaceId` values are registered, and for each — authorized executable name, supported versions, identity probe configuration, auth-readiness probe configuration, required non-interactive launch flags, environment allowlist reference, normalized `independence_domain`, normalized `organization_id`. | §9.1 names the registry, its exact path, its field set, and that it is a “closed, Founder-approved, compile-time map”. It does not name the values. | M2 |
| `PLAN-OPEN-2` | Exact per-adapter environment allowlist variable **names** and which are `secret: true`. | §5.4 names the schema field and the redaction rule. It does not enumerate variables. | M16 |
| `PLAN-OPEN-3` | Capability-record expiration horizon value. | §2.3 says records “become stale … when their configured time horizon expires”; §5.5 requires an “expiration horizon” field. No duration is given. | M15 |
| `PLAN-OPEN-4` | Disposition of `node-pty@^1.1.0`, declared in `packages/broker/package.json:11` and present in `bun.lock:72,157`, but **not installed** (`node_modules/node-pty` absent) and **not imported anywhere** in the tree. §9.7 forbids `node-pty` as an implementation choice. Plan default: remove the declaration and the lockfile entry. This edits a manifest and a lockfile. | §9.7, §7.4 (“adding a dependency … or materially expanding the approved file or module set”). | M14 |
| `PLAN-OPEN-6` | Removal of root `package.json` scripts `"broker": "bun run packages/broker/src/broker.ts"` and `"mcp": "bun run packages/broker/src/mcp-server.ts"`, which are operator-reachable entry points into modules §9.10 quarantines. Plan default: remove both. This changes a stable script surface. | §§4.4, 9.10, 7.4. | M14 |

**Rule:** the implementer may build every slot, type, test, and validator these items feed, but may not populate a `FOUNDER-RATIFICATION-REQUIRED` value or execute the manifest edits in `PLAN-OPEN-4` / `PLAN-OPEN-6` until the ruling exists. Proceeding without a ruling is unapproved material scope expansion under §7.4.

**Identifier note.** Five open items remain: `PLAN-OPEN-1`, `-2`, `-3`, `-4`, and `-6`. A sixth item, `PLAN-OPEN-5`, was withdrawn — see the settled TUI disposition below. The surviving identifiers are **not** renumbered, so that every prior review verdict and correction-round entry referring to them by number stays accurate.

### 1A.1 Settled scope — TUI (formerly `PLAN-OPEN-5`)

> Phase 3A does not modify `apps/madbridge/src/tui/**` or its presentation tests. The local TUI `reconciling` label remains untouched until Phase 3B.

This is not an open question and never required a Founder ruling. The approved specification already settles it: §0.1 defers live TUI integration to Phase 3B; §1.2 deliberately exempts the presentation-specific TUI and leaves pane generalization to Phase 3B; and this plan's own §3.5 already lists every TUI source and test file in the explicitly-untouched set. Raising it as an open item was an error in an earlier revision of this plan, not a genuine ambiguity. Recording it as settled removes a gate that never existed and is a scope correction derived from the approved specification — **not** a new Phase 3A TUI authorization.

---

## 2. Existing-state disposition map

Dispositions: **retain** (unchanged, still production), **modify**, **replace** (behavior intentionally changed; tests replaced not skipped), **quarantine** (kept in tree, unreachable from production and harness startup graphs), **retire from production** (public export removed), **move to test fixture**, **untouched** (explicitly out of Phase 3A scope).

### 2.1 Named specification treatments

| Existing item | Confirmed path | Phase 3A disposition | Owning milestone |
| --- | --- | --- | --- |
| `BrokerSocket`, `MADV_RUNTIME_DIR`, `MADV_SOCKET_PATH` | `packages/broker/src/socket.ts` | **Quarantine.** Dormant historical scaffolding. Absent from every production and harness startup graph. May create no path during the 3A suite except inside its explicit isolated legacy unit test. | M14 |
| Public socket exports | `packages/broker/src/index.ts:4` | **Retire from production.** Remove the re-export so no consumer reaches `BrokerSocket`, `MADV_RUNTIME_DIR`, or `MADV_SOCKET_PATH` through `@madventures/broker`. | M14 |
| `BrokerSocket` inside `createInMemoryBrokerForTest()` | `packages/broker/src/broker.ts:9,44,52,53,63` | **Replace.** Remove the socket import, `runtimeDir`/`socketPath` fields, and `socket.stop()` side effect. Fixture retained only after all socket edges are severed. | M14 |
| `createInMemoryBrokerForTest()` and its legacy tests | `packages/broker/src/broker.ts:40`; consumers at `packages/broker/test/{broker,socket,mcp-contract}.test.ts`, `test/acceptance/{two-way-collaboration,ownership-transfer,interruption-recovery}.test.ts` | **Modify + preserve coverage.** Behavioral coverage preserved by adapting the fixture; it does not certify the Phase 3A runtime. Suite floor remains binding. | M14 |
| Pipe-based `PtyManager` | `packages/broker/src/pty-manager.ts`; exported at `packages/broker/src/index.ts:9-10`; used at `apps/madbridge/test/pty-focus.test.tsx:10,16,195,206,218` | **Retire from production + move to test fixture.** Public export removed. It is pipe-based (`Bun.spawn` with `stdin/stdout/stderr: "pipe"`, `resize()` is a no-op) and cannot satisfy PTY containment. The minimum byte-routing fake moves under test fixtures, may not spawn a real process, and is not called a PTY. | M14 |
| MCP server / tool catalog | `packages/broker/src/mcp-server.ts`; exported at `packages/broker/src/index.ts:5-6`; imported at `packages/broker/src/broker.ts:7` | **Quarantine.** Removed from Phase 3A production and harness startup graphs. Its schema test (`packages/broker/test/mcp-contract.test.ts`) remains a legacy protocol test. Not the `BrokerClient` or PTY-host transport. | M14 |
| Adapter `mcp-config.ts` and `unix://madbridge.sock` previews | `packages/adapter-claude-code/src/mcp-config.ts`, `packages/adapter-antigravity/src/mcp-config.ts`; `unix://madbridge.sock` literals at `packages/adapter-claude-code/src/adapter.ts:73` and `packages/adapter-antigravity/src/adapter.ts:67` | **Quarantine.** Removed from adapter launch/readiness paths. They must not write provider config or advertise a nonexistent socket. Any future MCP activation is Phase 3B. | M14 |
| Current adapter `launch()` methods | `packages/adapter-claude-code/src/adapter.ts:80-97`, `packages/adapter-antigravity/src/adapter.ts:74-87` | **Replace.** Not used for Phase 3A child ownership; replaced by broker-authorized PTY-host launch descriptors. The random pseudo-PID (`Math.floor(Math.random() * 100000) + 1`) is test data, never a launch fact. Attestation and config-independent logic that passes the new adapter contract is retained. | M19, M20 |
| Session machine `interrupted` / `reconciling` transitions | `packages/broker/src/session-machine.ts:11-18,36-44,51-53,64-73` | **Replace.** `interrupted` is terminal-bound; `"reconciling"` removed from the Phase 3A surface; `resume` legal only from `paused`. Existing tests replaced, not skipped. | M8 |
| Ledger rebuild | `packages/ledger/src/rebuild.ts` (`SessionStateKind` includes `"reconciling"` at line 22; first-activity synthesis at lines 198-203; resume token increment at line 219) | **Replace.** Becomes the home of the single canonical `reduceLedgerEvent`. First-activity synthesis removed. `session_resumed` does not increment the token. Unknown lifecycle types fail live apply and replay. Existing tests replaced, not skipped. | M5, M7 |
| Broker reconciliation | `packages/broker/src/reconciliation.ts` (duplicate `rebuildBrokerState` at lines 119-237; duplicate transition table via `transitionSession`; `resumeSession` at lines 399-459 issuing a random token at line 451) | **Replace.** Delegates to `reduceLedgerEvent`. No duplicate `resumeSession` or rebuild transition table remains. Next-start prefix completion per §9.5 replaces same-session resume-after-interrupt. Existing tests replaced, not skipped. | M7 |
| Repo-local `init` | `apps/madbridge/src/commands/init.ts` (`APPROVED_DIRS` at lines 10-16 creating `.madv-runtime/**`; config write at line 91; backups at lines 77-83) | **Replace.** Becomes an optional host-storage initializer using the §5 validator: previews root, `sessions/`, `capability/` only; creates them `0700` only after Founder confirmation; writes no repository-local config, backup, `.madv-runtime`, session directory, ledger, artifact, or evidence file. Existing `.madv-runtime` data is legacy user data — not deleted, migrated, or treated as live. | M12 |
| CLI live-session commands | `apps/madbridge/src/commands/{start,status,pause,resume,close}.ts` (all four control commands read `MADV_SOCKET_PATH` and `existsSync`) | **Replace.** `start` becomes the certified gate (§4.2). `status`/`pause`/`resume`/`close` become truthful placeholders (§4.3) that perform no socket, PID, filesystem, ledger, or discovery probing. | M13 |
| CLI help text | `apps/madbridge/src/cli.ts:36-54` (claims “start … launch a governed session”, “status Read broker snapshot”, etc.) | **Replace.** Help must state that `start` is present but live runtime is not certified; `status`/`pause`/`resume`/`close` are reserved external-control names; `doctor`, `init`, `verify-ledger`, `export-evidence` retain scoped responsibilities. | M13 |
| Phase 2 `cli.test.ts` session-command assertions | `apps/madbridge/test/cli.test.ts:126-243` | **Replace.** `start`/`status`/`pause`/`resume`/`close` assertions and the two `init` `.madv-runtime` assertions are intentionally updated to the §4.2/§4.3/§9.9 contracts. Counts toward no-test-count-regression via replacement tests. | M12, M13 |
| Phase 2 `interrupted → reconciling → active` tests | `packages/broker/test/session-machine.test.ts:8-10,32-40,75-77`; `packages/broker/test/reconciliation.test.ts:436-513,516-670`; `packages/ledger/test/rebuild.test.ts:62-78,120-140`; `test/acceptance/interruption-recovery.test.ts:319-364,532` | **Replace.** Updated to Phase 3A interrupt-and-closure semantics. Replaced, not skipped. | M5, M7, M8 |
| TUI files | `apps/madbridge/src/tui/**` (all 18 source files), `apps/madbridge/test/tui-*.test.tsx` (4 files, 274 tests) | **Untouched in Phase 3A.** Presentation-specific Claude/Antigravity panes remain until Phase 3B generalizes them into execution slots. `apps/madbridge/src/tui/types.ts` keeps its local presentation `BrokerSnapshot` and `"reconciling"` label until Phase 3B — settled scope per §1A.1, not an open item. | — |
| `apps/madbridge/test/pty-focus.test.tsx` | 13 tests; 5 touch `PtyManager` directly | **Modify.** Retarget the 5 `PtyManager` tests onto the relocated test fixture; the 8 focus/keyboard tests are untouched. | M14 |
| Ledger core | `packages/ledger/src/{ledger,hash-chain,schema}.ts` | **Modify.** `Ledger.append()` evolves from `BridgeEventV1` to `LedgerEventV1`; an atomic multi-append transaction is added on the same chain, sequence, canonical JSON, previous hash, event hash, and chain head. `SCHEMA_SQL` may add indexes or typed projections only as named in §3 below. | M6 |
| Protocol core | `packages/protocol/src/{task-envelope,events}.ts` | **Modify.** `ExecutionRole` `"reviewer"` → `"independent-reviewer"`; `surface` `CliSurface` → `SurfaceId`; `independence_domain` added; `pair_constraints` added to `TaskEnvelopeV1` and the parser known-key set; `CliSurface`/`KNOWN_SURFACES` retired as admission authority. Parsers, types, fixtures, adapters, and tests migrate together; no compatibility coercion. | M2, M3 |
| `packages/policy/**`, `packages/artifact-store/**` | 7 source + 4 test files | **Untouched.** No Phase 3A requirement touches path/command/egress/review policy or the artifact store. | — |
| `packages/protocol/src/{canonical-json,crypto,ids,wire}.ts` | — | **Retain.** Reused unchanged by lifecycle events, capability records, and the ledger. | — |
| `packages/broker/src/{ownership-machine,credentials}.ts` | — | **Retain.** Ownership union is the existing Phase 2 closed union, unmodified (§9.4). Credentials remain legacy in-memory fixture support only. | — |
| `apps/madbridge/src/commands/{doctor,verify-ledger,export-evidence}.ts` | — | **Modify (scoped).** `doctor` retains its responsibilities unchanged. `verify-ledger` and `export-evidence` change only their default path resolution from `.madv-runtime/**` to the validated storage root, and must consume fixture-produced sessions. | M22 |
| `test/architecture-boundaries.test.ts` | 9 tests | **Modify.** Existing 9 assertions retained; Phase 3A assertions added in a new sibling file so the legacy guard stays independently readable. | M1, M14 |
| `test/acceptance/disposable-repo.ts`, `test/adapter-parity.shared.ts`, `packages/ledger/test/fixtures.ts` | — | **Modify.** Fixture data migrates with the identity schema (`role: "reviewer"` → `"independent-reviewer"`, `surface` normalization, `independence_domain`, `pair_constraints`). `adapter-parity.shared.ts:146,153,170` drops the `prepareConfigPreview` parity cases when `mcp-config` is quarantined. | M2, M14 |

### 2.2 Phase 2 expectations intentionally replaced (§9.9 named list)

| Legacy assertion | Location | Replaced by |
| --- | --- | --- |
| `start` preflight/no-broker behavior | `apps/madbridge/test/cli.test.ts:126-154` | Gate contract tests (M13) |
| `status`/`pause`/`resume`/`close` nonzero-on-missing-socket | `apps/madbridge/test/cli.test.ts:156-186` | Placeholder contract tests (M13) |
| `init` creates `.madv-runtime` | `apps/madbridge/test/cli.test.ts:204-243` | Host-storage initializer tests (M12) |
| Help text claiming `start` launches a session | `apps/madbridge/src/cli.ts:44` | Help truth test (M13) |
| Socket-file existence as broker liveness | `packages/broker/test/socket.test.ts:9-23` | Isolated legacy socket unit test + architecture dormancy assertions (M14) |
| `interrupted → reconciling → active` recovery | `packages/broker/test/session-machine.test.ts`, `reconciliation.test.ts`, `packages/ledger/test/rebuild.test.ts`, `test/acceptance/interruption-recovery.test.ts` | Terminal-bound interruption + next-start prefix completion (M5, M7, M8) |

---

## 3. Exact file map

Paths marked **(spec-pinned)** are named normatively by the approved specification and may not be relocated. All other paths are this plan’s approved module set; changing them is material scope expansion under §7.4.

### 3.1 Created

| Path | Single responsibility | Milestone |
| --- | --- | --- |
| `packages/protocol/src/normalization.ts` | The two pinned normalization functions: `normalizeIndependenceDomain` (NFKC → trim → ASCII lowercase → non-alphanumeric runs to one hyphen → `^[a-z][a-z0-9-]{1,63}$`) and `normalizeIdentifier` for provider/`organization_id` (NFKC → trim → ASCII lowercase → `^[a-z0-9][a-z0-9._-]{0,63}$`). No alias table, no marketing-name inference. | M2 |
| `packages/protocol/src/surface-id.ts` | The `SurfaceId` branded type and its syntactic validator `^[a-z][a-z0-9-]{1,63}$`. Accepting a string syntactically does not make it eligible. | M2 |
| `packages/protocol/src/adapter-registry.ts` **(spec-pinned, §9.1)** | The closed, Founder-approved, compile-time admission map keyed by `SurfaceId`. Sole admission source. Values gated by `PLAN-OPEN-1`. | M2 |
| `packages/protocol/src/pair-constraints.ts` | `MAX_ACTIVE_SURFACES_V1 = 2`, `PairConstraintsV1`, the canonical unordered-sorted-pair algorithm, and the nine §9.2 pair-eligibility rules. The sole cardinality authority. | M3 |
| `packages/protocol/src/lifecycle-events.ts` | `SessionLifecycleEventTypeV1` (exactly twelve), `InterruptionReasonCodeV1`, `PublishedIncidentPayloadV1`, `SessionInterruptedPayloadV1`, `FounderCommandPayloadV1`, `SessionTerminalPayloadV1`, `LifecyclePayloadByTypeV1`, `SessionLifecycleEventV1`, `LedgerEventV1`, and `parseSessionLifecycleEvent`. | M4 |
| `packages/protocol/src/capability-record.ts` | `CapabilityRecordV1` schema (§5.5 fields), parser, and freshness/staleness evaluation against binary hash, CLI version, host, and horizon. | M15 |
| `packages/storage/package.json` | Workspace manifest for the storage package. | M11 |
| `packages/storage/src/index.ts` | Public exports of the storage package. | M11 |
| `packages/storage/src/home.ts` | Passwd home resolution via `os.userInfo().homedir` (POSIX `getpwuid`) and the typed `$HOME`-divergence failure. | M11 |
| `packages/storage/src/storage-root.ts` | The single storage-root validator (absolute, outside repo/worktree, symlink-free components, UID-owned, no group/other access, `realpath`-stable, writable local path) plus default-root construction and `MADV_STORAGE_DIR` override. Pure validation creates nothing. | M11 |
| `packages/storage/src/session-storage.ts` | Transactional session-directory creation (`sessions/<session-id>/{ledger,artifacts,sanitized-evidence}`, mode `0700`), post-create revalidation, and bounded rollback anchored on `session_open`. | M11 |
| `packages/storage/src/capability-store.ts` | Capability-record persistence at `capability/<surface>/<timestamp>-<binary-hash-prefix>.json` using normalized surface identifiers. Never deleted by startup rollback. | M15 |
| `packages/broker/src/client.ts` | The closed `BrokerClient` contract: `ClientPrincipal`, `BrokerCommand`, `BrokerErrorCode`, `BrokerResult`, `BrokerSnapshot`, `ExecutionSnapshot`, `OutputFrame`, and the §9.4 supporting snapshot interfaces. Types only. | M9 |
| `packages/broker/src/command-legality.ts` | The pinned §9.3 command error matrix as one decision function. Sole authority for `session_not_writable` vs `incident_active`. | M9 |
| `packages/broker/src/publish-legality.ts` | `PublishableCollaborationEventTypeV1`, the publish phase/incident matrix, and the fixed validation precedence (schema → principal/identity → reserved legacy type → phase/incident). | M10 |
| `packages/broker/src/fencing.ts` | Fencing-token issuance, transfer increment, invalidation, and `(session_id, fencing_token)` uniqueness. No cross-session monotonicity. | M8 |
| `packages/broker/src/runtime-broker.ts` | The Phase 3A broker: sole owner of policy decisions, session state, fencing, and durable ledger writes. Calls `reduceLedgerEvent` after each successful append/transaction. Sole writer of host command descriptors. | M8, M10 |
| `packages/broker/src/in-process-client.ts` | `InProcessBrokerClient` bound at construction to an immutable `ClientPrincipal`; snapshot and output streams; sequence-invariant enforcement. | M10 |
| `packages/broker/src/next-start-reconciliation.ts` | The §9.5 durable-prefix completion table and the typed impossible-order reconciliation failure. Delegates all state derivation to `reduceLedgerEvent`. | M7 |
| `packages/broker/src/pty-host-protocol.ts` | The private framed command/fact codec shared by broker and host. Distinguishes broker command frames from child-input byte frames; raw passthrough prohibited; unknown or malformed frames fail closed. | M18 |
| `packages/broker/src/pty-host-supervisor.ts` | Host spawn with lifeline read end inherited at birth, close-on-exec write-end ownership, duplicate-descriptor closure, host-exit monitoring, the §9.8 deadline clock, and the host-bypassing direct-PGID escalation ladder. | M18, M19 |
| `packages/pty-host/package.json` | Workspace manifest for the private PTY-host package. | M18 |
| `packages/pty-host/src/main.ts` **(spec-pinned, §9.7)** | `madv-pty-host` entry point. Requires the inherited private control channel and one validated launch frame; direct invocation without that channel fails before PTY or child creation. Imports no broker, ledger, adapter, TUI, policy, protocol-authority, or storage code. | M18 |
| `packages/pty-host/src/frames.ts` | Host-side frame encode/decode. Mirror of `pty-host-protocol.ts` with no application imports. | M18 |
| `packages/pty-host/src/terminal.ts` | The `Bun.Terminal` PTY/TTY allocation, exact byte I/O, and resize primitive. | M18 |
| `packages/pty-host/src/launch.ts` | Adjacent-to-`exec` artifact re-hash and child launch in a new PTY/session/process group; reports host PID, child PID, child PGID, identity, readiness. | M19 |
| `packages/pty-host/src/signals.ts` | The bounded termination ladder: `SIGTERM` to the child process group, the §9.8 responsive-host grace, then `SIGKILL`; and lifeline-EOF-triggered termination. | M19 |
| `packages/supervisor/package.json` | Workspace manifest for the supervisor package. | M20 |
| `packages/supervisor/src/index.ts` | Public exports of the supervisor package. | M20 |
| `packages/supervisor/src/preflight.ts` | The nine pure-preflight steps (§2.1). Creates nothing in governed storage, the repository, ledger, or session state. | M20 |
| `packages/supervisor/src/environment.ts` | Per-adapter allowlisted environment assembly and secret redaction. Sole producer of the environment given to probes, auth checks, PTY hosts, and children. | M16 |
| `packages/supervisor/src/attestation.ts` | Fresh non-mutating, non-interactive identity and auth-readiness probes, and live-session re-attestation. Absence of a passing actual-session primitive makes the surface ineligible. | M20 |
| `packages/supervisor/src/build.ts` | The ten-step transactional build (§2.1) and mandatory rollback through the same containment machinery used for live interruption. | M21 |
| `test/phase3a/runtime-harness.ts` **(spec-pinned, §9.11)** | The only Phase 3A runtime harness entry. Accepts only controlled fixture adapters and disposable validated storage roots. Registers fixture-only surface IDs. Cannot admit a real provider surface or remove the production `start` gate. | M22 |
| `test/phase3a/fixture-adapters.ts` | Deterministic fixture adapters and fixture surface registrations, valid only inside the harness. | M22 |
| `test/phase3a/negative-control.ts` | The single bounded negative-control implementation used by §8.3 and §12.2: depth-6, symlink-safe, passwd-resolved `broker.sock` and `runtime/` audit over the storage root, the fixed literal quarantined legacy path, and the worktree. Exits `1` on any hit. Written in Bun so both Macs run identical semantics with no shell-portability surface. | M14 |
| `test/phase3a/spike/bun-terminal-spike.ts` | The dual-host `Bun.Terminal` capability spike primitive exercising every §3.6 criterion with monotonic-clock timings. | M17 |

**New test files created** (all under existing test roots; each is named in §5 with its owning task):

`packages/protocol/test/{normalization,surface-id,adapter-registry,pair-constraints,lifecycle-events,capability-record}.test.ts` ·
`packages/ledger/test/{reduce-ledger-event,lifecycle-append}.test.ts` ·
`packages/broker/test/{fencing,command-legality,broker-client-contract,in-process-client,publish-legality,incident-atomicity,next-start-reconciliation,pty-host-protocol,pty-host-supervisor}.test.ts` ·
`packages/storage/test/{home,storage-root,session-storage,capability-store}.test.ts` ·
`packages/pty-host/test/{frames,main-guard,launch,signals}.test.ts` ·
`packages/supervisor/test/{preflight,environment,attestation,build-rollback}.test.ts` ·
`apps/madbridge/test/{cli-gate,cli-placeholders,init-storage}.test.ts` ·
`test/phase3a/architecture-phase3a.test.ts` ·
`test/phase3a/{harness-separation,harness-lifecycle,harness-rollback,environment-equality,evidence-pipeline}.test.ts` ·
`test/phase3a/spike/{bun-terminal-spike,bun-terminal-spike-reports}.test.ts` ·
`test/phase3a/adversarial/{supervisor-death,descriptor-hygiene,process-group,wedged-host,sequence-invariants,ledger-failure,attestation-drift,auth-expiry,cleanup-residuals}.test.ts`

**Evidence documents created** (human-readable, committed under `docs/`; the runtime never writes into the governed repository, §5.5):

`docs/verification/2026-08-12-bun-terminal-spike-imac.md` ·
`docs/verification/2026-08-12-bun-terminal-spike-macbook.md` ·
`docs/verification/2026-08-12-phase-3a-dual-host-imac.md` ·
`docs/verification/2026-08-12-phase-3a-dual-host-macbook.md` ·
`docs/verification/phase-3a-antigravity-preliminary.md` (Task 60 / Stage 0 / rubric milestone 1 — preliminary human-readable evidence only, no capability record) ·
`docs/verification/2026-08-12-antigravity-surface-investigation.md` ·
`docs/verification/2026-08-12-surface-investigation-<surface>.md` (one per Founder-approved alternative) ·
`docs/verification/phase-3a-correction-rounds.md` (Founder-visible running log, §7.3)

### 3.2 Modified

| Path | Change | Milestone |
| --- | --- | --- |
| `packages/protocol/src/task-envelope.ts` | `ExecutionRole` `"reviewer"` → `"independent-reviewer"`; `ExecutionIdentity.surface` → `SurfaceId`; add `independence_domain`; add `pair_constraints` to `TaskEnvelopeV1` and `KNOWN_TOP_LEVEL_KEYS`; retire `CliSurface`/`KNOWN_SURFACES` as admission authority; delegate cardinality to `MAX_ACTIVE_SURFACES_V1` and pair validation to `pair-constraints.ts`. | M2, M3 |
| `packages/protocol/src/index.ts` | Export the new modules; stop exporting `CliSurface`/`KNOWN_SURFACES` as admission authority. | M2, M3, M4, M15 |
| `packages/ledger/src/rebuild.ts` **(spec-pinned, §9.6)** | Replace `rebuildBrokerState`’s ad-hoc switch with the single canonical `reduceLedgerEvent`. Remove `"reconciling"` from `SessionStateKind`, remove first-activity synthesis, remove the resume token increment. Typed failures for unknown types, impossible ordering, mismatched incident IDs, and invalid phase preconditions. | M5 |
| `packages/ledger/src/ledger.ts` | `append()` evolves `BridgeEventV1` → `LedgerEventV1`; add `appendMany()` performing a single `BEGIN IMMEDIATE` transaction over an ordered batch on the same chain. | M6 |
| `packages/ledger/src/schema.ts` | Add the named index `idx_events_created_at` only. No authority-bearing second chain. | M6 |
| `packages/ledger/src/index.ts` | Export `reduceLedgerEvent` and its state type; keep `rebuildState`. | M5, M6 |
| `packages/broker/src/session-machine.ts` | Phase 3A semantics: `interrupted` terminal-bound, `"reconciling"` removed, `resume` legal only from `paused`, `closing` reachable from `active` (Founder) and `interrupted` (interruption). | M8 |
| `packages/broker/src/reconciliation.ts` **(spec-pinned, §9.6)** | Delete the duplicate `rebuildBrokerState` and `resumeSession`; delegate to `reduceLedgerEvent`; retain repository reconciliation; route prefix completion to `next-start-reconciliation.ts`. | M7 |
| `packages/broker/src/broker.ts` | Sever socket and MCP imports and the `runtimeDir`/`socketPath`/`mcpTools` fields from `createInMemoryBrokerForTest()`. | M14 |
| `packages/broker/src/index.ts` | Remove socket, MCP, and `PtyManager` exports; add the Phase 3A client, broker, fencing, legality, and PTY-host-supervisor exports. | M9, M10, M14, M18 |
| `packages/broker/package.json` | Remove the `node-pty` dependency (**`PLAN-OPEN-4`**). | M14 |
| `packages/adapter-claude-code/src/adapter.ts`, `packages/adapter-antigravity/src/adapter.ts` | Remove `prepareConfigPreview` and the `unix://madbridge.sock` literal from the adapter contract and launch/readiness paths; replace `launch()` with the broker-authorized launch-descriptor contract; retain attestation. | M14, M19 |
| `packages/adapter-claude-code/src/index.ts`, `packages/adapter-antigravity/src/index.ts` | Stop re-exporting `prepareConfigPreview`. | M14 |
| `packages/adapter-*/src/attestation.ts` | `role` union `"reviewer"` → `"independent-reviewer"`; return the normalized `independence_domain` from the registry. | M2 |
| `apps/madbridge/src/cli.ts` | Replace `HELP_TEXT` with the §9.9 truthful help. | M13 |
| `apps/madbridge/src/commands/start.ts` | Replace entirely with the §4.2 gate: exit `78`, exact text, exact JSON, no filesystem inspection, no runtime import. | M13 |
| `apps/madbridge/src/commands/{status,pause,resume,close}.ts` | Replace with the §4.3 placeholders: exit `69`, `external_control_unavailable`, exact text and JSON, no probing, no `@madventures/broker` import. | M13 |
| `apps/madbridge/src/commands/init.ts` | Replace with the §9.9 host-storage initializer. | M12 |
| `apps/madbridge/src/commands/verify-ledger.ts`, `export-evidence.ts` | Default path resolution moves from `.madv-runtime/**` to the validated storage root; must consume fixture-produced sessions. | M22 |
| `apps/madbridge/test/cli.test.ts` | Replace the §9.9-named legacy assertions (lines 126-186, 204-243). | M12, M13 |
| `apps/madbridge/test/pty-focus.test.tsx` | Retarget the 5 `PtyManager` cases onto the relocated fixture. | M14 |
| `packages/broker/test/{broker,socket,mcp-contract}.test.ts` | Adapt to the severed fixture; `socket.test.ts` becomes the explicit isolated legacy unit test. | M14 |
| `packages/broker/test/{session-machine,reconciliation}.test.ts`, `packages/ledger/test/rebuild.test.ts`, `test/acceptance/interruption-recovery.test.ts` | Replace `interrupted → reconciling → active` expectations. | M5, M7, M8 |
| `packages/ledger/test/fixtures.ts`, `test/acceptance/disposable-repo.ts`, `test/adapter-parity.shared.ts`, `packages/protocol/test/task-envelope.test.ts` | Migrate fixture identity data with the schema; drop `prepareConfigPreview` parity cases. | M2, M3, M14 |
| `test/architecture-boundaries.test.ts` | Add the storage/PTY-host/supervisor package roots to `readProductionSource()` so new packages are covered by the existing single-definition guards. | M1 |
| `tsconfig.json` | Add `paths` entries for `@madventures/storage`, `@madventures/pty-host`, `@madventures/supervisor`. | M11, M18, M20 |
| `package.json` | Remove the `broker` and `mcp` scripts (**`PLAN-OPEN-6`**); add `test:phase3a`, `test:arch`, `test:adversarial`, `verify:phase3a`. | M14, M25 |
| `bun.lock` | Regenerated by removing `node-pty` (**`PLAN-OPEN-4`**). | M14 |
| `apps/madbridge/package.json` | Add `@madventures/storage` and `@madventures/supervisor` workspace dependencies. | M11, M20 |

### 3.3 Removed

No file is deleted in Phase 3A. §9.10 defines dormancy as *unreachable from production and the Phase 3A harness, not deleted history*. `socket.ts`, `mcp-server.ts`, `pty-manager.ts`, and both `mcp-config.ts` files remain in the tree with their exports and startup-graph edges severed.

### 3.4 Moved

| From | To | Rationale |
| --- | --- | --- |
| Byte-routing behavior of `packages/broker/src/pty-manager.ts` | `test/phase3a/fixture-adapters.ts` (fake byte router) | §9.10: the minimum fake moves under test fixtures, may not spawn a real process, and is not called a PTY. The original file stays in tree, dormant and unexported. |

### 3.5 Explicitly preserved untouched

`apps/madbridge/src/tui/**` (18 files) · `apps/madbridge/test/tui-projection.test.tsx` · `apps/madbridge/test/tui-truth-safety.test.tsx` · `apps/madbridge/test/tui-governance-surfaces.test.tsx` · `apps/madbridge/test/tui-writers-stage.test.tsx` · `packages/policy/**` · `packages/artifact-store/**` · `packages/protocol/src/{canonical-json,crypto,ids,wire}.ts` · `packages/broker/src/{ownership-machine,credentials}.ts` · `packages/ledger/src/hash-chain.ts` · `apps/madbridge/src/commands/doctor.ts` · `apps/madbridge/src/commands/types.ts` · `docs/superpowers/specs/**` · `docs/decisions/**` · `docs/superpowers/plans/2026-08-08-madventures-tui-v1.md` · `README.md` · `docs/STATUS.md` · `.gitignore`

---

## 4. Milestone sequence

Twenty-six milestones. The ordering is derived from the actual dependency graph subject to two specification-imposed orderings: the `Bun.Terminal` spike must precede production PTY-host construction (§§3.6, 9.7), and surface investigations must be able to run and fail without stopping foundation work (§§2.3, 6.6). Pure protocol contracts come first because every later layer consumes their types; the PTY stack comes after the client/storage contracts because the host launch descriptor is defined by the broker contract and its environment by the storage/allowlist layer.

> **Founder deviation ruling (2026-08-12):** rubric §7.2 places surface investigations at milestone 1. The formal machine-readable investigations remain at M25 because their required records depend on M15/M16 tooling, itself gated on `PLAN-OPEN-2` and `PLAN-OPEN-3`. The Stage 0 preliminary Antigravity evidence pass (Task 60) preserves specification §2.3's requirement that Antigravity is investigated first and the locked cheapest-moment principle. This ruling accepts the M25 placement of the formal investigations on that basis.

**Stage 0 execution path.** Stage 0 is the earliest-reachable *path* through the plan, not a set of simultaneously eligible tasks. It contains eight tasks, of which **only Task 60 is outside M1–M26**; the other seven keep their milestone membership. Stage 0 adds no twenty-seventh plan milestone — the plan still has exactly twenty-six.

| Task | Deliverable | Milestone | Rubric §7.2 milestone | Unlocks when |
| --- | --- | --- | --- | --- |
| **60** | Preliminary Antigravity evidence pass — human-readable report only | **outside M1–M26** | 1 | immediately, after the three gates and `IMPLEMENTATION_BASE_SHA` (§0A) |
| 1 | Suite floor and no-silent-skip guard | M1 | 9 | immediately, after the three gates and `IMPLEMENTATION_BASE_SHA` (§0A) |
| 2 | Production-source scan covers every package | M1 | 9 | after Task 1 commits |
| 3 | Normalization algorithms | M2 | 3 | after M1 is reviewed |
| 4 | Branded `SurfaceId` | M2 | 3 | after Task 3 commits |
| 5 | `ExecutionIdentity` migration | M2 | 3 | after Task 4 commits |
| 38 | `Bun.Terminal` spike primitive | M17 | 2 | after M1 is reviewed |
| 39 | Two checksummed dual-host spike reports | M17 | 2 | after Task 38 commits **and** the same candidate has run on both Founder Macs |

Tasks 38–39 depend on M1 — they are early, not dependency-free. Only Task 60 has no technical precondition at all.

| # | Milestone | Rubric §7.2 milestone | Depends on | Reviewable deliverable |
| --- | --- | --- | --- | --- |
| M1 | Baseline characterization and architecture guards | 9 | — | Pinned baseline counts; guards extended to future package roots |
| M2 | Canonical identity, `SurfaceId`, normalization, adapter registry | 3 | M1 | Sole admission source; identity schema migrated |
| M3 | Cardinality, `PairConstraintsV1`, pair eligibility, envelope admission | 3 | M2 | Sole cardinality authority; §9.2 rules |
| M4 | Lifecycle-event types and payload validation | 3 | M2 | Twelve closed lifecycle types with typed payloads |
| M5 | The single `reduceLedgerEvent` | 8 | M4 | One reducer for live apply and replay |
| M6 | `LedgerEventV1` append and atomic multi-append | 8 | M4, M5 | One chain, transactional incident pair |
| M7 | Rebuild and next-start prefix reconciliation | 8 | M5, M6 | §9.5 prefix table; duplicate logic deleted |
| M8 | Fencing-token issuance, activation, pause/resume, interruption, closing, closure | 8 | M5, M6, M7 | Full durable lifecycle orders |
| M9 | Closed `BrokerCommand` / `BrokerResult` / snapshot / output-frame contracts | 7 | M3, M4, M8 | §§9.3–9.4 types and the pinned error matrix |
| M10 | `InProcessBrokerClient`, publish legality, incident atomicity | 7 | M9 | Bound principal; atomic incident pair |
| M11 | Storage-root resolution, validation, permissions, rollback, retention | 4 | M1 | One validator, no relaxed test path |
| M12 | `init` replacement | 4, 9 | M11 | Host-storage initializer |
| M13 | CLI placeholders, live-start gate, help truth | 9 | M1 | Exact text, JSON, exit codes |
| M14 | Socket / MCP / pipe-PTY quarantine and architecture enforcement | 9 | M13 | Dormancy proven structurally |
| M15 | Capability records and surface-investigation tooling | 4, 1 | M2, M11 | Dated observations, not whitelists |
| M16 | Per-adapter environment allowlists and secret redaction | 4 | M2, M15 | One environment producer |
| M17 | `Bun.Terminal` PTY spike (dual-host gate) | 2 | M1 | Both host reports; **gate for M18** |
| M18 | `madv-pty-host` framing and closed operation set | 5 | M9, M16, M17 | Private codec; import-graph isolation |
| M19 | Process-group containment, host launch facts, wedged-host escalation | 5 | M18 | Gap-free launch; direct-PGID path |
| M20 | Foreground supervisor pure preflight | 6 | M3, M11, M15, M16 | Creates nothing |
| M21 | Transactional build and rollback | 6 | M8, M10, M19, M20 | No partial session |
| M22 | Structurally test-only runtime harness and fixture adapters | 10 | M14, M21 | Sole harness entry, unreachable from production |
| M23 | Adversarial process scenarios | 10 | M22 | All nineteen §6.4 scenarios |
| M24 | Fixture-driven `verify-ledger` and `export-evidence` | 10 | M22 | Production tools consume fixture output |
| M25 | Antigravity and alternative-surface investigations | 1 | M15, M16 | Dated records, pass or fail |
| M26 | Dual-host certification evidence and final merge gate | 2, 10 | M23, M24, M25 | Both checksummed reports; gate still closed |

**Gate note:** M17 is a hard gate. If any §3.6 criterion fails on either Founder Mac, M18–M19, M21, and M23 stop and the phase escalates under §10. FFI, `node-pty`, another native dependency, and any pipe fallback are not available responses.

---

## 5. Tasks

**Execution rules for every task below.**

- Steps are checkboxes. Do not tick a step you did not run.
- Focused commands use `bun test <exact-file> -t "<exact test name>"`. Bun matches `-t` against the full concatenated `describe`/`test` name.
- “Verify the required RED failure” means the test fails **for the named reason**. A test that fails for a different reason (typo, wrong import, syntax error) has not established the invariant — fix the test, do not proceed.
- Step 7 stages only the files listed under **Files**. `git add -A` is prohibited.
- Step 8 halts. Do not begin the next task until the Founder authorizes it. Per-task authorization is deliberate Founder policy for Phase 3A — stricter than rubric §7.2's per-milestone minimum — and is not a plan error.
- No task may add a dependency, create `broker.sock`, weaken the start gate, or touch `docs/superpowers/specs/**` or `docs/decisions/**`.

---

### Stage 0 early deliverable — Task 60 (the only task outside M1–M26)

#### Task 60: Preliminary Antigravity evidence pass

**Requirement coverage:**
- §2.3 (Antigravity is investigated first because the planned live pairing depends on it; the investigation records every primitive tried, including CLI version, binary path and hash, host facts, exact commands, structured modes, session metadata, logs, and sanitized results; a failed result is still a required evidence document)
- §2.2 (the fixed passing and failing evidence rubric, applied unchanged)
- §9.13 (no configured model string, flag, provider file, or marketing output can substitute for an actual-session primitive)
- Rubric §7.2 milestone **1** (surface identity and auth investigations)

**Files:**
- Create: `docs/verification/phase-3a-antigravity-preliminary.md` — **the only file this task touches.**

**Interfaces:**
- Consumes: the installed `agy` CLI and the already-approved §2.2 identity rubric. Nothing from this plan's own module set.
- Produces: no code interface. One human-readable evidence document.

**Preconditions:**
- **Technical:** none. This task needs only the installed `agy` CLI and the §2.2 rubric, which is fixed before any investigation begins and may not be edited to accommodate a result.
- **Authorization:** the plan's exact SHA has passed Tier-2 review, the Founder has approved that SHA, **and** the Founder has separately authorized Task 60 under the per-task rule in §5. "No technical precondition" is not permission to start it now.

**Relationship to Task 56.** This is a *preliminary* pass. It produces **no machine-readable capability record**. Task 56 (M25) remains the formal Antigravity investigation: it repeats the probing through the M15/M16 tooling and produces the durable `CapabilityRecordV1` plus the formal report. Task 56 must **not** reuse this task's attestation as fresh session evidence — §2.1 forbids reusing an attestation across sessions, and §2.3 makes capability records dated observations tied to a binary hash, CLI version, and host.

**Evidence-only exception.** This task changes no source and no test, so it has no RED step. That is a deliberate, recorded exception to the TDD structure used by every other task in this plan (see §13.5) — not an omission, and not a licence to skip RED anywhere a production file is touched.

- [ ] Step 1: Confirm authorization in writing — the approved plan SHA, the Founder's approval of that SHA, and the Founder's separate authorization of Task 60. If any of the three is absent, stop under §10 condition 1.
- [ ] Step 2: Record host and binary facts before probing: `uname -m`, `sw_vers`, `bun --version`, `which agy`, `shasum -a 256 "$(which agy)"`, `agy --version`, `printf '%s\n' "$TERM" "$SHELL"`.
- [ ] Step 3: Probe every documented `agy` primitive that could return the resolved provider and exact model **for the actual session**, recording the exact command line and sanitized output for each — pass or fail. Include the existing `agy config get model` probe used at `packages/adapter-antigravity/src/attestation.ts:41` and record it explicitly as **failing evidence** under §2.2, because it reads configuration rather than resolved fact.
- [ ] Step 4: For each result, name the exact §2.2 rubric clause it passes or fails against. Do not edit the rubric. Do not infer identity from prose, banners, flags, or configuration.
- [ ] Step 5: Write `docs/verification/phase-3a-antigravity-preliminary.md` containing every primitive attempted, exact commands, sanitized outputs, CLI version, absolute binary path and SHA-256, host facts, and the per-result rubric clause. At the Phase 3A baseline the expected outcome is **fail** on §2.2's "a documented CLI or API primitive returning the resolved provider and exact model for the actual session"; a passing result is a new, reviewable finding requiring its own Founder ruling. Pass or fail, the document is the deliverable.
- [ ] Step 6: Inspect the diff and verify scope — exactly one new file, no source, no test, no manifest, no capability record, and no credential or secret material in the report.
- [ ] Step 7: Commit `docs/verification/phase-3a-antigravity-preliminary.md` with the exact message: `docs(verification): record preliminary Antigravity evidence`
- [ ] Step 8: Stop for Founder review of the investigation verdict. Do not begin another task without separate authorization.

---

### Milestone M1 — Baseline characterization and architecture guards

#### Task 1: Pin the Phase 2 baseline as an executable floor

**Requirement coverage:**
- §6.8.1 (suite must not regress below 714 tests / 2606 `expect()` / 35 files; no silent skips)
- §7.2 (report exact counts per milestone)

**Files:**
- Create: `test/phase3a/architecture-phase3a.test.ts`
- Preserve: `test/architecture-boundaries.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `describe("Phase 3A baseline floor")` containing `test("no source file marks a test .only")` and `test("no required test file uses test.skip or describe.skip without a disposition marker")`. The disposition marker is the exact comment `// FOUNDER-DISPOSITION:` on the line above the skip.

**Preconditions:**
- The Founder has recorded and explicitly approved `IMPLEMENTATION_BASE_SHA` (§0A).
- `HEAD === IMPLEMENTATION_BASE_SHA` and the worktree is clean.
- The docs-only baseline-range check passes: `git diff --name-only "$SOURCE_BASELINE_SHA".."$IMPLEMENTATION_BASE_SHA"` lists only paths under `docs/`.
- Task 1 has its own separate Founder authorization (§5 per-task rule).
- **Not** `HEAD === SOURCE_BASELINE_SHA`. That is the comparison baseline, not the execution base, and it stopped being `HEAD` the moment this plan was committed.

- [ ] Step 1: Write the named failing test — in `test/phase3a/architecture-phase3a.test.ts`, add `test("no required test file uses test.skip or describe.skip without a disposition marker")`, which walks `packages/**/test`, `apps/**/test`, and `test/**`, greps for `test.skip(`, `describe.skip(`, `it.skip(`, `test.only(`, `describe.only(`, `it.only(`, and asserts every hit is preceded by `// FOUNDER-DISPOSITION:`.
- [ ] Step 2: Run `bun test test/phase3a/architecture-phase3a.test.ts -t "no required test file uses test.skip or describe.skip without a disposition marker"` — expected RED: `Cannot find module 'test/phase3a/architecture-phase3a.test.ts'` is not the failure; the file exists, so the expected RED is the assertion failing only if a skip already exists. If the tree is already clean the test passes on creation, which is **not** an acceptable RED. Therefore first add a temporary `test.skip("temp-red", () => {})` to `test/phase3a/architecture-phase3a.test.ts` itself and confirm the guard reports it.
- [ ] Step 3: Implement the minimum authorized behavior — remove the temporary `test.skip`; the guard is the implementation.
- [ ] Step 4: Run `bun test test/phase3a/architecture-phase3a.test.ts -t "no required test file uses test.skip or describe.skip without a disposition marker"` — expected GREEN: 1 pass. Invariant established: **no required coverage can be silently disabled anywhere in the tree.**
- [ ] Step 5: Run `bun test` (full) and record `pass/fail/expect()/files`; run `bunx tsc --noEmit`.
- [ ] Step 6: Inspect `git diff` and verify exactly one new file.
- [ ] Step 7: Commit `test/phase3a/architecture-phase3a.test.ts` with message: `test(phase3a): pin no-silent-skip floor for the Phase 3A suite`
- [ ] Step 8: Stop for the M1 review checkpoint.

#### Task 2: Extend the production-source guard to the future package roots

**Requirement coverage:**
- §6.2 (architecture assertions cover production source)
- §1.3 (authority boundaries)

**Files:**
- Modify: `test/architecture-boundaries.test.ts`

**Interfaces:**
- Consumes: `readProductionSource()` at `test/architecture-boundaries.test.ts:32-42`, which currently scans only `["packages", "apps"]` and skips `/test/` and `/node_modules/`.
- Produces: no signature change. `readProductionSource()` continues to scan `packages` and `apps`, which already covers the new `packages/storage`, `packages/pty-host`, and `packages/supervisor` roots by construction. Add `test("production source scan covers every workspace package")` asserting that the scanned file list contains at least one file from every directory listed in the root `package.json` `workspaces` globs.

**Preconditions:**
- Task 1 committed.

- [ ] Step 1: Write the named failing test — add `test("production source scan covers every workspace package")` to `test/architecture-boundaries.test.ts`, asserting that for each entry of `readdirSync("packages")` there is at least one scanned file whose path starts with `packages/<entry>/src`.
- [ ] Step 2: Run `bun test test/architecture-boundaries.test.ts -t "production source scan covers every workspace package"` — expected RED: the helper is file-scoped and not exported; the test cannot reach it. Failure message names the undefined reference.
- [ ] Step 3: Implement the minimum authorized behavior — export `listSourceFiles` and `readProductionSourceFiles(): string[]` from the test module’s top scope so the new assertion can enumerate paths, leaving `readProductionSource()` semantics unchanged.
- [ ] Step 4: Run the same focused command — expected GREEN: 1 pass. Invariant established: **every workspace package created later in this plan is automatically inside the architecture guard’s scan.**
- [ ] Step 5: Run `bun test test/architecture-boundaries.test.ts` (10 pass expected) and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm no production file changed.
- [ ] Step 7: Commit `test/architecture-boundaries.test.ts` with message: `test(arch): scan every workspace package root in the production-source guard`
- [ ] Step 8: Stop for the M1 review checkpoint.

---

### Milestone M2 — Canonical identity, `SurfaceId`, normalization, adapter registry

> **`PLAN-OPEN-1` blocks Task 6.** Tasks 3–5 may proceed; Task 6 requires the Founder ruling.

#### Task 3: Pin the two normalization algorithms

**Requirement coverage:**
- §9.1 (`independence_domain` normalization; provider/`organization_id` normalization; no alias table or marketing-name inference)
- §9.14.5 (Normalization correction)

**Files:**
- Create: `packages/protocol/src/normalization.ts`
- Test: `packages/protocol/test/normalization.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  ```ts
  export function normalizeIndependenceDomain(raw: string): string; // throws NormalizationError
  export function normalizeIdentifier(raw: string): string;         // throws NormalizationError
  export class NormalizationError extends Error {
    constructor(public readonly kind: "independence_domain" | "identifier", public readonly input: string);
  }
  ```
  `normalizeIndependenceDomain`: NFKC → trim → ASCII lowercase → replace runs of non-alphanumeric characters with one hyphen → must match `^[a-z][a-z0-9-]{1,63}$`.
  `normalizeIdentifier`: NFKC → trim → ASCII lowercase → must match `^[a-z0-9][a-z0-9._-]{0,63}$` (no hyphen-collapsing step).

**Preconditions:**
- M1 reviewed.

- [ ] Step 1: Write the named failing test — in `packages/protocol/test/normalization.test.ts`, add `test("independence domain collapses non-alphanumeric runs to a single hyphen")` asserting `normalizeIndependenceDomain("Anthropic  __ Research") === "anthropic-research"`, and `test("identifier normalization does not collapse separators")` asserting `normalizeIdentifier("Anthropic.Inc_1") === "anthropic.inc_1"`, and `test("identifier normalization rejects a leading hyphen")` asserting `normalizeIdentifier("-anthropic")` throws `NormalizationError`.
- [ ] Step 2: Run `bun test packages/protocol/test/normalization.test.ts` — expected RED: `Cannot find module "../src/normalization"`.
- [ ] Step 3: Implement the minimum authorized behavior — create `packages/protocol/src/normalization.ts` with exactly the two functions and the error class above. Use `String.prototype.normalize("NFKC")`. Do not add an alias table.
- [ ] Step 4: Run `bun test packages/protocol/test/normalization.test.ts` — expected GREEN: 3 pass. Invariant established: **identifier equality is decided by one pinned algorithm, never by inference.**
- [ ] Step 5: Run `bun test packages/protocol` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm two files.
- [ ] Step 7: Commit `packages/protocol/src/normalization.ts packages/protocol/test/normalization.test.ts` with message: `feat(protocol): pin independence-domain and identifier normalization`
- [ ] Step 8: Stop for the M2 review checkpoint.

#### Task 4: Introduce the branded `SurfaceId`

**Requirement coverage:**
- §9.1 (`SurfaceId` brand; `^[a-z][a-z0-9-]{1,63}$`; syntactic acceptance is not eligibility; `CliSurface`/`KNOWN_SURFACES` retired as admission authority)

**Files:**
- Create: `packages/protocol/src/surface-id.ts`
- Test: `packages/protocol/test/surface-id.test.ts`

**Interfaces:**
- Consumes: `normalizeIndependenceDomain` is *not* used here; surface IDs use their own regex.
- Produces:
  ```ts
  export type SurfaceId = string & { readonly __brand: "SurfaceId" };
  export const SURFACE_ID_PATTERN: RegExp; // /^[a-z][a-z0-9-]{1,63}$/
  export function parseSurfaceId(raw: string): SurfaceId; // throws InvalidSurfaceIdError
  export function isSurfaceIdSyntax(raw: string): boolean;
  export class InvalidSurfaceIdError extends Error {}
  ```

**Preconditions:**
- Task 3 committed.

- [ ] Step 1: Write the named failing test — add `test("a syntactically valid surface id is not thereby eligible")` asserting `parseSurfaceId("totally-made-up")` returns a value **and** that `packages/protocol/src/surface-id.ts` exports no eligibility predicate (assert `Object.keys(module)` contains no key matching `/eligib/i`); and `test("surface id rejects uppercase, leading digit, and 65 characters")` asserting all three throw `InvalidSurfaceIdError`.
- [ ] Step 2: Run `bun test packages/protocol/test/surface-id.test.ts` — expected RED: `Cannot find module "../src/surface-id"`.
- [ ] Step 3: Implement the minimum authorized behavior — create the module with exactly the four exports above.
- [ ] Step 4: Run the same command — expected GREEN: 2 pass. Invariant established: **syntax and eligibility are separate; the type system cannot admit a surface.**
- [ ] Step 5: Run `bun test packages/protocol` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; two files.
- [ ] Step 7: Commit `packages/protocol/src/surface-id.ts packages/protocol/test/surface-id.test.ts` with message: `feat(protocol): add branded SurfaceId with syntax-only validation`
- [ ] Step 8: Stop for the M2 review checkpoint.

#### Task 5: Migrate `ExecutionIdentity` to the §9.1 schema

**Requirement coverage:**
- §9.1 (`role` includes `"independent-reviewer"`; `surface: SurfaceId`; `independence_domain` required; parsers, types, fixtures, adapters, and tests migrate together; no compatibility coercion)

**Files:**
- Modify: `packages/protocol/src/task-envelope.ts`
- Modify: `packages/protocol/src/index.ts`
- Modify: `packages/protocol/test/task-envelope.test.ts`
- Modify: `packages/ledger/test/fixtures.ts`
- Modify: `packages/adapter-claude-code/src/attestation.ts`
- Modify: `packages/adapter-antigravity/src/attestation.ts`
- Modify: `test/adapter-parity.shared.ts`
- Test: `packages/protocol/test/task-envelope.test.ts`

**Interfaces:**
- Consumes: `parseSurfaceId`, `normalizeIndependenceDomain`.
- Produces:
  ```ts
  export type ExecutionRole = "builder" | "independent-reviewer" | "observer";
  export interface ExecutionIdentity {
    readonly execution_id: string;
    readonly role: ExecutionRole;
    readonly surface: SurfaceId;
    readonly model: string;
    readonly provider: string;
    readonly independence_domain: string;
    readonly effort: Effort;
  }
  ```
  `KNOWN_ROLES` becomes `["builder", "independent-reviewer", "observer"]`.

**Preconditions:**
- Tasks 3–4 committed.

- [ ] Step 1: Write the named failing test — in `packages/protocol/test/task-envelope.test.ts` add `test("legacy role reviewer is rejected without coercion")` asserting an envelope whose execution carries `role: "reviewer"` throws `unknown role: reviewer`, and `test("an execution without independence_domain is rejected")` asserting the parser throws `missing independence_domain`.
- [ ] Step 2: Run `bun test packages/protocol/test/task-envelope.test.ts -t "legacy role reviewer is rejected without coercion"` — expected RED: no throw; `"reviewer"` is currently accepted by `KNOWN_ROLES` at `packages/protocol/src/task-envelope.ts:20`.
- [ ] Step 3: Implement the minimum authorized behavior — change `ExecutionRole` and `KNOWN_ROLES`; add the `independence_domain` field and its `normalizeIndependenceDomain` validation; change `surface` validation from `KNOWN_SURFACES.includes(...)` at line 180 to `parseSurfaceId(...)`; update the two adapter attestation role unions and both fixture files. Add **no** legacy alias.
- [ ] Step 4: Run `bun test packages/protocol/test/task-envelope.test.ts` — expected GREEN: 38 pass (36 existing + 2 new). Invariant established: **there is exactly one identity schema and no silent legacy mapping.**
- [ ] Step 5: Run `bun test` (full) and `bunx tsc --noEmit`. Every fixture consuming `role: "reviewer"` must be migrated in this task; a red full suite here means the migration is incomplete.
- [ ] Step 6: Inspect the diff; confirm no adapter `launch()` or CLI file changed.
- [ ] Step 7: Commit the listed files with message: `feat(protocol)!: migrate ExecutionIdentity to the Phase 3A canonical schema`
- [ ] Step 8: Stop for the M2 review checkpoint.

#### Task 6: Create the closed adapter registry as the sole admission source

**Requirement coverage:**
- §9.1 (registry path, field set, sole admission source, architecture test asserting no other admission source; fixture surfaces register only through the harness path)
- §5.4 (registration is the sole admission source and lists the eight required fields)

**Files:**
- Create: `packages/protocol/src/adapter-registry.ts`
- Test: `packages/protocol/test/adapter-registry.test.ts`
- Test: `test/phase3a/architecture-phase3a.test.ts`

**Interfaces:**
- Consumes: `SurfaceId`, `normalizeIdentifier`, `normalizeIndependenceDomain`.
- Produces:
  ```ts
  export interface AdapterRegistrationV1 {
    readonly surface: SurfaceId;
    readonly executable_name: string;
    readonly supported_versions: readonly string[];
    readonly identity_probe: { readonly argv: readonly string[]; readonly parse: "json" | "kv" };
    readonly auth_readiness_probe: { readonly argv: readonly string[]; readonly parse: "json" | "kv" } | null;
    readonly non_interactive_flags: readonly string[];
    readonly environment_allowlist_ref: string;
    readonly independence_domain: string;
    readonly organization_id: string;
    readonly auth_failure_detection: readonly string[];
    readonly limitations: readonly string[];
  }
  export const ADAPTER_REGISTRY: ReadonlyMap<SurfaceId, AdapterRegistrationV1>;
  export function lookupRegistration(surface: SurfaceId): AdapterRegistrationV1 | undefined;
  ```

**Preconditions:**
- Task 5 committed. **`PLAN-OPEN-1` ruling received in writing.** Without it, stop here and escalate under §10.

- [ ] Step 1: Write the named failing test — in `packages/protocol/test/adapter-registry.test.ts` add `test("registry values are stored already normalized")` asserting every entry’s `independence_domain` equals `normalizeIndependenceDomain(entry.independence_domain)` and `organization_id` equals `normalizeIdentifier(entry.organization_id)`; and in `test/phase3a/architecture-phase3a.test.ts` add `test("adapter-registry.ts is the only production admission source")` asserting that no production file outside `packages/protocol/src/adapter-registry.ts` contains a literal surface-admission list (grep for `KNOWN_SURFACES`, `allowedSurfaces`, `SUPPORTED_SURFACES`).
- [ ] Step 2: Run `bun test packages/protocol/test/adapter-registry.test.ts` — expected RED: `Cannot find module "../src/adapter-registry"`. Then run `bun test test/phase3a/architecture-phase3a.test.ts -t "adapter-registry.ts is the only production admission source"` — expected RED: `KNOWN_SURFACES` is still exported from `packages/protocol/src/task-envelope.ts:21` and re-exported at `packages/protocol/src/index.ts:24`.
- [ ] Step 3: Implement the minimum authorized behavior — create the registry with **exactly the Founder-ratified entries** from `PLAN-OPEN-1`; delete `KNOWN_SURFACES` and the `CliSurface` admission export from `task-envelope.ts` and `index.ts`.
- [ ] Step 4: Run both focused commands — expected GREEN: registry test passes; architecture test passes. Invariant established: **admission reads one closed, Founder-approved map and nothing else.**
- [ ] Step 5: Run `bun test` (full) and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm no fixture surface ID entered the production registry.
- [ ] Step 7: Commit the listed files with message: `feat(protocol): add the closed Founder-approved adapter registry`
- [ ] Step 8: Stop for the M2 review checkpoint.

---

### Milestone M3 — Cardinality, `PairConstraintsV1`, pair eligibility

#### Task 7: Centralize cardinality in `MAX_ACTIVE_SURFACES_V1`

**Requirement coverage:**
- §1.2 (one named constraint and one envelope validator; no literal cardinality check elsewhere; no `surfaceA`/`surfaceB` names; downstream iterates `executions`)
- §6.2 (architecture assertion of the enumerable form)

**Files:**
- Create: `packages/protocol/src/pair-constraints.ts`
- Modify: `packages/protocol/src/task-envelope.ts`
- Test: `packages/protocol/test/pair-constraints.test.ts`
- Test: `test/phase3a/architecture-phase3a.test.ts`

**Interfaces:**
- Consumes: `ExecutionIdentity`, `SurfaceId`.
- Produces:
  ```ts
  export const MAX_ACTIVE_SURFACES_V1 = 2 as const;
  export function assertActiveSurfaceCardinality(executions: readonly ExecutionIdentity[]): void; // throws CardinalityError
  export class CardinalityError extends Error {}
  ```

**Preconditions:**
- M2 reviewed.

- [ ] Step 1: Write the named failing test — in `packages/protocol/test/pair-constraints.test.ts` add `test("one execution and three executions are both rejected by the single constraint")`; in `test/phase3a/architecture-phase3a.test.ts` add `test("no production module encodes surface cardinality outside MAX_ACTIVE_SURFACES_V1")` scanning production source (excluding `packages/protocol/src/pair-constraints.ts` and `apps/madbridge/src/tui/**`) for `/surfaceA|surfaceB|adapterA|adapterB/` and for `/executions\.length\s*===\s*2|executions\.length\s*!==\s*2/`.
- [ ] Step 2: Run `bun test packages/protocol/test/pair-constraints.test.ts -t "one execution and three executions are both rejected by the single constraint"` — expected RED: `Cannot find module "../src/pair-constraints"`. Run the architecture test — expected RED is **not** guaranteed (the current tree has no such literal), so first confirm the guard catches a seeded violation by temporarily adding `const _x = executions.length === 2;` to `packages/protocol/src/task-envelope.ts`, observing the failure, then reverting it.
- [ ] Step 3: Implement the minimum authorized behavior — create `pair-constraints.ts` with the constant and assertion; in `task-envelope.ts` replace the `executions.length === 0` check at line 159 with `assertActiveSurfaceCardinality(executions)`.
- [ ] Step 4: Run both commands — expected GREEN. Invariant established: **exactly one module knows the number two.**
- [ ] Step 5: Run `bun test packages/protocol test/phase3a` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm the TUI exemption was not widened.
- [ ] Step 7: Commit the listed files with message: `feat(protocol): centralize active-surface cardinality in MAX_ACTIVE_SURFACES_V1`
- [ ] Step 8: Stop for the M3 review checkpoint.

#### Task 8: Add `PairConstraintsV1` as a required envelope field with canonical unordered matching

**Requirement coverage:**
- §9.2 (required field, typed parse failure without it, no default-constraints path, no Founder bypass field, canonical unordered sorted-pair matching, duplicate and reversed-duplicate entries are parse failures, no positional interpretation)
- §9.14.3 (Pair matching correction)

**Files:**
- Modify: `packages/protocol/src/pair-constraints.ts`
- Modify: `packages/protocol/src/task-envelope.ts`
- Test: `packages/protocol/test/pair-constraints.test.ts`

**Interfaces:**
- Consumes: `MAX_ACTIVE_SURFACES_V1`, `parseSurfaceId`.
- Produces:
  ```ts
  export interface PairConstraintsV1 {
    readonly required_roles: readonly ["builder", "independent-reviewer"];
    readonly require_distinct_providers: true;
    readonly require_distinct_independence_domains: true;
    readonly prohibit_self_review: true;
    readonly allowed_surface_pairs?: readonly (readonly [SurfaceId, SurfaceId])[];
  }
  export function canonicalPairKey(a: SurfaceId, b: SurfaceId): string; // sorted by normalized code points, joined "\u0000"
  export function parsePairConstraints(raw: unknown): PairConstraintsV1; // throws PairConstraintsError
  export class PairConstraintsError extends Error {}
  ```

**Preconditions:**
- Task 7 committed.

- [ ] Step 1: Write the named failing test — add `test("an envelope without pair_constraints fails parsing")`; `test("reversed duplicate allowed pairs are a parse failure")` asserting `[["a","b"],["b","a"]]` throws; `test("allowed pair matching ignores envelope execution order")` asserting the same envelope parses with executions in either order; and `test("allowed_surface_pairs cannot weaken a global rule")` asserting an envelope whose pair shares a provider still fails even when that pair is listed.
- [ ] Step 2: Run `bun test packages/protocol/test/pair-constraints.test.ts -t "an envelope without pair_constraints fails parsing"` — expected RED: `parseTaskEnvelope` currently accepts the envelope; `pair_constraints` is not in `KNOWN_TOP_LEVEL_KEYS` at `packages/protocol/src/task-envelope.ts:67-72`, so an envelope carrying it fails with `unknown field: pair_constraints` while an envelope omitting it succeeds — the inverse of the requirement.
- [ ] Step 3: Implement the minimum authorized behavior — add `pair_constraints` to `KNOWN_TOP_LEVEL_KEYS` and `TaskEnvelopeV1`; call `parsePairConstraints` from `parseTaskEnvelope`; implement `canonicalPairKey` as sort-then-join on normalized IDs; reject duplicate and reversed-duplicate entries and pairs whose two IDs are equal. Add no bypass field.
- [ ] Step 4: Run `bun test packages/protocol/test/pair-constraints.test.ts` — expected GREEN: 5 pass. Invariant established: **pair matching is order-independent and constraints can only narrow, never widen.**
- [ ] Step 5: Run `bun test` (full) and `bunx tsc --noEmit`. Every envelope fixture in the tree must gain `pair_constraints` in this task.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit the listed files with message: `feat(protocol)!: require PairConstraintsV1 with canonical unordered pair matching`
- [ ] Step 8: Stop for the M3 review checkpoint.

#### Task 9: Enforce the nine pair-eligibility rules

**Requirement coverage:**
- §9.2 rules 1–9 (distinct execution IDs; exactly one builder and one independent reviewer; `observer` not active in a V1 live pair; distinct normalized providers; distinct normalized independence domains; no common review control via equal `independence_domain` or equal `organization_id`; reviewer is not the builder and cannot approve its own output; both surfaces individually admitted; envelope constraints at least as strict)

**Files:**
- Modify: `packages/protocol/src/pair-constraints.ts`
- Test: `packages/protocol/test/pair-constraints.test.ts`

**Interfaces:**
- Consumes: `ADAPTER_REGISTRY`, `CapabilityRecordV1` is **not** consumed here (capability freshness is checked at preflight, M20).
- Produces:
  ```ts
  export type PairEligibilityFailure =
    | "duplicate_execution_id" | "role_composition" | "observer_not_active"
    | "provider_not_distinct" | "independence_domain_not_distinct"
    | "common_review_control" | "self_review" | "surface_not_admitted"
    | "envelope_constraint_weaker";
  export function evaluatePairEligibility(
    executions: readonly ExecutionIdentity[],
    constraints: PairConstraintsV1,
    organizationIdBySurface: ReadonlyMap<SurfaceId, string>,
  ): { readonly ok: true } | { readonly ok: false; readonly failure: PairEligibilityFailure };
  ```

**Preconditions:**
- Task 8 committed; `PLAN-OPEN-1` ruling in force.

- [ ] Step 1: Write the named failing test — add one test per failure code, each named exactly `test("pair eligibility rejects <failure code>")`, plus `test("pair eligibility accepts a distinct builder and independent reviewer")`.
- [ ] Step 2: Run `bun test packages/protocol/test/pair-constraints.test.ts -t "pair eligibility rejects common_review_control"` — expected RED: `evaluatePairEligibility is not a function`.
- [ ] Step 3: Implement the minimum authorized behavior — implement the nine rules in the listed order so the first failure is deterministic; compare providers and independence domains through the M2 normalizers only.
- [ ] Step 4: Run `bun test packages/protocol/test/pair-constraints.test.ts` — expected GREEN: 15 pass. Invariant established: **a pair is eligible only when every one of the nine rules holds, and equal `organization_id` alone defeats it.**
- [ ] Step 5: Run `bun test packages/protocol` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit the listed files with message: `feat(protocol): enforce the nine Phase 3A pair-eligibility rules`
- [ ] Step 8: Stop for the M3 review checkpoint.

---

### Milestone M4 — Lifecycle-event types and payload validation

#### Task 10: Define the twelve closed lifecycle event types

**Requirement coverage:**
- §9.6 (`SessionLifecycleEventTypeV1` is exactly twelve values; `InterruptionReasonCodeV1`; typed payload map; `LedgerEventV1` union; `actor: "madbridge"`; no fabricated sender)

**Files:**
- Create: `packages/protocol/src/lifecycle-events.ts`
- Modify: `packages/protocol/src/index.ts`
- Test: `packages/protocol/test/lifecycle-events.test.ts`

**Interfaces:**
- Consumes: `PROTOCOL_VERSION`, `RepositoryFingerprint`, `BridgeEventV1`.
- Produces: exactly the type declarations quoted in §9.6 of the specification — `SessionLifecycleEventTypeV1`, `InterruptionReasonCodeV1`, `PublishedIncidentPayloadV1`, `SessionInterruptedPayloadV1`, `FounderCommandPayloadV1`, `SessionTerminalPayloadV1`, `LifecyclePayloadByTypeV1`, `SessionLifecycleEventBaseV1<K>`, `SessionLifecycleEventV1`, `LedgerEventV1`.

**Preconditions:**
- M3 reviewed.

- [ ] Step 1: Write the named failing test — add `test("the lifecycle event type union has exactly twelve members")` asserting a runtime `SESSION_LIFECYCLE_EVENT_TYPES` tuple has length 12 and equals the §9.6 list in order; and `test("the interruption reason union has exactly twelve members")` for `InterruptionReasonCodeV1`.
- [ ] Step 2: Run `bun test packages/protocol/test/lifecycle-events.test.ts` — expected RED: `Cannot find module "../src/lifecycle-events"`.
- [ ] Step 3: Implement the minimum authorized behavior — declare the types and the two `as const` tuples the tests read. No parser yet.
- [ ] Step 4: Run the same command — expected GREEN: 2 pass. Invariant established: **the lifecycle vocabulary is closed and enumerable at runtime.**
- [ ] Step 5: Run `bun test packages/protocol` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm no `BridgeEventV1` type changed.
- [ ] Step 7: Commit the listed files with message: `feat(protocol): declare the closed Phase 3A lifecycle event vocabulary`
- [ ] Step 8: Stop for the M4 review checkpoint.

#### Task 11: Implement lifecycle payload validation with deterministic precedence

**Requirement coverage:**
- §9.6 (`session_interrupted.reason_code` non-null and payload matching `SessionInterruptedPayloadV1`; interruption-kind terminal records carry the same incident ID and reason code; Founder-kind terminals use `reason_code: null`; `session_activated.execution_ids` equals the complete envelope set, order irrelevant, duplicates invalid; unknown types are typed failures with no silent default branch)

**Files:**
- Modify: `packages/protocol/src/lifecycle-events.ts`
- Test: `packages/protocol/test/lifecycle-events.test.ts`

**Interfaces:**
- Consumes: the Task 10 types.
- Produces:
  ```ts
  export type LifecycleValidationFailure =
    | "unknown_event_type" | "unknown_field" | "missing_reason_code"
    | "payload_shape" | "incident_id_mismatch" | "reason_code_mismatch"
    | "execution_set_mismatch" | "duplicate_execution_id" | "actor_not_madbridge";
  export function parseSessionLifecycleEvent(
    raw: Record<string, unknown>,
    context: { readonly envelopeExecutionIds: readonly string[]; readonly openIncidentId: string | null; readonly openReasonCode: InterruptionReasonCodeV1 | null },
  ): SessionLifecycleEventV1; // throws LifecycleValidationError carrying a LifecycleValidationFailure
  export class LifecycleValidationError extends Error { readonly failure: LifecycleValidationFailure }
  ```
  Precedence order (fixed): `unknown_event_type` → `unknown_field` → `actor_not_madbridge` → `payload_shape` → `missing_reason_code` → `execution_set_mismatch` / `duplicate_execution_id` → `incident_id_mismatch` → `reason_code_mismatch`.

**Preconditions:**
- Task 10 committed.

- [ ] Step 1: Write the named failing test — add `test("session_interrupted without a reason code fails with missing_reason_code")`; `test("interruption-kind session_closed carrying a different incident id fails with incident_id_mismatch")`; `test("session_activated with a partial execution set fails with execution_set_mismatch")`; `test("session_activated with a duplicated execution id fails with duplicate_execution_id")`; `test("a lifecycle record with actor other than madbridge fails with actor_not_madbridge")`; `test("an unknown lifecycle type fails with unknown_event_type and not a default branch")`; `test("validation precedence prefers unknown_event_type over payload_shape")`.
- [ ] Step 2: Run `bun test packages/protocol/test/lifecycle-events.test.ts -t "session_interrupted without a reason code fails with missing_reason_code"` — expected RED: `parseSessionLifecycleEvent is not a function`.
- [ ] Step 3: Implement the minimum authorized behavior — implement the validator with the fixed precedence and no `default:` fallthrough that returns a value.
- [ ] Step 4: Run `bun test packages/protocol/test/lifecycle-events.test.ts` — expected GREEN: 9 pass. Invariant established: **every lifecycle record is either exactly well-formed or a typed failure, decided in one fixed order.**
- [ ] Step 5: Run `bun test packages/protocol` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit the listed files with message: `feat(protocol): validate lifecycle payloads with deterministic precedence`
- [ ] Step 8: Stop for the M4 review checkpoint.

---

### Milestone M5 — The single `reduceLedgerEvent`

#### Task 12: Replace the rebuild transition table with `reduceLedgerEvent`

**Requirement coverage:**
- §9.6 (normative reducer mapping table, all twelve rows; canonical location `packages/ledger/src/rebuild.ts:reduceLedgerEvent`; no normal `BridgeEventV1` changes phase, incident, or fencing state)
- §9.15.1 (N1 — `session_activated` exclusively produces initial `active`; `session_resumed` produces pause-recovery `active`; `session_closing` exclusively produces `closing`; no first-activity synthesis)
- §9.4 (`"reconciling"` is not a Phase 3A phase)

**Files:**
- Modify: `packages/ledger/src/rebuild.ts`
- Modify: `packages/ledger/src/index.ts`
- Test: `packages/ledger/test/reduce-ledger-event.test.ts`
- Modify: `packages/ledger/test/rebuild.test.ts`

**Interfaces:**
- Consumes: `SessionLifecycleEventV1`, `LedgerEventV1`, `InterruptionReasonCodeV1`.
- Produces:
  ```ts
  export type LifecyclePhase = "starting" | "active" | "paused" | "interrupted" | "closing" | "closed";
  export type TokenState = "not_issued" | "valid" | "invalidated";
  export interface LifecycleState {
    readonly sessionId: string | null;
    readonly phase: LifecyclePhase;
    readonly fencingToken: number | null;
    readonly tokenState: TokenState;
    readonly tokenUsable: boolean;
    readonly incident: { readonly id: string; readonly reason: string; readonly timestamp: string; readonly severity: "low" | "medium" | "high" } | null;
    readonly reasonCode: InterruptionReasonCodeV1 | null;
    readonly readyExecutionIds: readonly string[];
    readonly closureKind: "founder" | "interruption" | "abort" | "unclean" | null;
  }
  export const INITIAL_LIFECYCLE_STATE: LifecycleState;
  export function reduceLedgerEvent(state: LifecycleState, event: LedgerEventV1): LifecycleState; // throws ReducerError
  export class ReducerError extends Error { readonly kind: "unknown_lifecycle_type" | "impossible_order" | "incident_id_mismatch" | "invalid_phase_precondition" }
  ```

**Preconditions:**
- M4 reviewed.

- [ ] Step 1: Write the named failing test — in `packages/ledger/test/reduce-ledger-event.test.ts` add one test per §9.6 table row named `test("reducer row: <event type>")`, plus `test("a normal BridgeEventV1 does not change phase, incident, or fencing state")`; `test("first activity does not synthesize active")`; `test("session_closed before session_closing throws impossible_order")`; `test("reconciling is not a reachable phase")` asserting no reachable state has `phase === "reconciling"` (the union no longer contains it).
- [ ] Step 2: Run `bun test packages/ledger/test/reduce-ledger-event.test.ts -t "first activity does not synthesize active"` — expected RED: `reduceLedgerEvent is not a function`. Then run `bun test packages/ledger/test/rebuild.test.ts -t "rebuildBrokerState reconstructs from normal events"` and record it as currently GREEN — it asserts the synthesis behavior at `packages/ledger/src/rebuild.ts:198-203` that this task deletes.
- [ ] Step 3: Implement the minimum authorized behavior — add `reduceLedgerEvent` implementing all twelve rows; delete `"reconciling"` from `SessionStateKind`; delete the `MachineEvent` table, `transitionSession`, `tryTransition`, and the first-activity synthesis; reimplement `rebuildBrokerState` as a fold of `reduceLedgerEvent` over the rows; export the new symbols from `packages/ledger/src/index.ts`.
- [ ] Step 4: Run `bun test packages/ledger/test/reduce-ledger-event.test.ts` — expected GREEN: 16 pass. Invariant established: **one function decides every lifecycle transition, and nothing infers `active` from ordinary traffic.**
- [ ] Step 5: Rewrite the four replaced cases in `packages/ledger/test/rebuild.test.ts` (lines 35-47, 62-78, 120-140, and the `reconciling` comment at 133) to the Phase 3A semantics, then run `bun test packages/ledger` — expected 25 pass (14 replaced/retained + 16 new, minus overlap; record the exact number) — and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm `packages/broker/src/reconciliation.ts` is untouched in this task.
- [ ] Step 7: Commit the listed files with message: `feat(ledger)!: replace the rebuild transition table with the single reduceLedgerEvent`
- [ ] Step 8: Stop for the M5 review checkpoint.

---

### Milestone M6 — `LedgerEventV1` append and atomic multi-append

#### Task 13: Widen `Ledger.append()` to `LedgerEventV1`

**Requirement coverage:**
- §9.6 (both union members use the existing `events` table, sequence, canonical JSON, previous hash, event hash, and chain head; `Ledger.append()` evolves from `BridgeEventV1` to `LedgerEventV1`)

**Files:**
- Modify: `packages/ledger/src/ledger.ts`
- Test: `packages/ledger/test/lifecycle-append.test.ts`

**Interfaces:**
- Consumes: `LedgerEventV1`.
- Produces: `append(event: LedgerEventV1): LedgerRow` — signature widened, chain semantics unchanged.

**Preconditions:**
- M5 reviewed.

- [ ] Step 1: Write the named failing test — add `test("a lifecycle record appends onto the same chain as a bridge event")` appending one `BridgeEventV1` then one `session_open`, asserting `verify().valid === true`, `count === 2`, and that row 2’s `previous_hash` equals row 1’s `event_hash`.
- [ ] Step 2: Run `bun test packages/ledger/test/lifecycle-append.test.ts -t "a lifecycle record appends onto the same chain as a bridge event"` — expected RED: TypeScript rejects the lifecycle record because `append` is typed `BridgeEventV1` at `packages/ledger/src/ledger.ts:35`; at runtime the test fails on the missing `payload_hash` field the canonical JSON path expects.
- [ ] Step 3: Implement the minimum authorized behavior — change the parameter type to `LedgerEventV1`; keep `canonicalJson`, `computeEventHash`, sequence allocation, and the `BEGIN IMMEDIATE` transaction exactly as they are.
- [ ] Step 4: Run the same command — expected GREEN: 1 pass. Invariant established: **there is one chain and lifecycle truth lives on it.**
- [ ] Step 5: Run `bun test packages/ledger` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm no second database or table was added.
- [ ] Step 7: Commit the listed files with message: `feat(ledger): widen append to LedgerEventV1 on the single chain`
- [ ] Step 8: Stop for the M6 review checkpoint.

#### Task 14: Add `appendMany()` for the atomic incident pair

**Requirement coverage:**
- §9.6 (the incident pair uses an atomic multi-append transaction on the same chain; no snapshot or callback between the two appends)
- §9.3 (the broker atomically appends the original `BridgeEventV1` plus its derived `session_interrupted`)

**Files:**
- Modify: `packages/ledger/src/ledger.ts`
- Modify: `packages/ledger/src/schema.ts`
- Test: `packages/ledger/test/lifecycle-append.test.ts`

**Interfaces:**
- Consumes: `LedgerEventV1`.
- Produces: `appendMany(events: readonly LedgerEventV1[]): readonly LedgerRow[]` — one `BEGIN IMMEDIATE`, ordered inserts chaining within the batch, one `chain_head` update, `ROLLBACK` on any failure. Also adds `CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);` to `SCHEMA_SQL`.

**Preconditions:**
- Task 13 committed.

- [ ] Step 1: Write the named failing test — add `test("appendMany writes both records or neither")` asserting that a batch whose second record duplicates an existing `event_id` leaves `count` and `head` exactly as they were before the call; and `test("appendMany chains hashes within the batch")` asserting row N+1’s `previous_hash` equals row N’s `event_hash`.
- [ ] Step 2: Run `bun test packages/ledger/test/lifecycle-append.test.ts -t "appendMany writes both records or neither"` — expected RED: `ledger.appendMany is not a function`.
- [ ] Step 3: Implement the minimum authorized behavior — implement `appendMany` with a single transaction, in-batch hash chaining, and `ROLLBACK` on any error; add the one named index.
- [ ] Step 4: Run `bun test packages/ledger/test/lifecycle-append.test.ts` — expected GREEN: 3 pass. Invariant established: **an incident and its derived lifecycle record are indivisible.**
- [ ] Step 5: Run `bun test packages/ledger` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm only the one named index was added to the schema.
- [ ] Step 7: Commit the listed files with message: `feat(ledger): add atomic multi-append for the incident pair`
- [ ] Step 8: Stop for the M6 review checkpoint.

---

### Milestone M7 — Rebuild and next-start prefix reconciliation

#### Task 15: Delete the duplicate broker reducer and delegate to `reduceLedgerEvent`

**Requirement coverage:**
- §9.6 (`packages/broker/src/reconciliation.ts` delegates to the canonical reducer; no duplicate `resumeSession` or rebuild transition table remains; `session_resumed` does not increment the token)
- §9.10 (named replacement row for rebuild/reconciliation)
- §9.14.2 (Single reducer correction)

**Files:**
- Modify: `packages/broker/src/reconciliation.ts`
- Modify: `packages/broker/src/index.ts`
- Modify: `packages/broker/test/reconciliation.test.ts`
- Test: `test/phase3a/architecture-phase3a.test.ts`

**Interfaces:**
- Consumes: `reduceLedgerEvent`, `LifecycleState`, `INITIAL_LIFECYCLE_STATE`.
- Produces: `rebuildBrokerState(rows: readonly LedgerRow[]): LifecycleState & { count: number; lastEventHash: string; events: LedgerRow[] }` implemented **only** as a fold. `resumeSession`, the local `RebuiltBrokerState`, and the local `transitionSession` import are removed. `interruptSession` and `reconcileRepository` are retained.

**Preconditions:**
- M6 reviewed.

- [ ] Step 1: Write the named failing test — in `test/phase3a/architecture-phase3a.test.ts` add `test("only one production module defines a lifecycle transition table")` asserting `readProductionSource()` contains exactly one occurrence of `export function reduceLedgerEvent` and **zero** occurrences of `export function resumeSession`; in `packages/broker/test/reconciliation.test.ts` add `test("session_resumed does not increment the fencing token")`.
- [ ] Step 2: Run `bun test test/phase3a/architecture-phase3a.test.ts -t "only one production module defines a lifecycle transition table"` — expected RED: `resumeSession` is exported at `packages/broker/src/reconciliation.ts:399` and re-exported at `packages/broker/src/index.ts:11`.
- [ ] Step 3: Implement the minimum authorized behavior — delete `rebuildBrokerState`’s body (lines 119-237) and `resumeSession` (lines 399-459) from `reconciliation.ts`; reimplement `rebuildBrokerState` as `rows.reduce(reduceLedgerEvent, INITIAL_LIFECYCLE_STATE)` plus the row metadata; drop `resumeSession` from `packages/broker/src/index.ts:11` and its type export at line 21.
- [ ] Step 4: Run both focused commands — expected GREEN. Invariant established: **the broker cannot disagree with replay, because it has no second table.**
- [ ] Step 5: Rewrite the replaced cases in `packages/broker/test/reconciliation.test.ts` (lines 436-513 `resumeSession` block, 516-670 `rebuildBrokerState` block) and in `test/acceptance/interruption-recovery.test.ts` (lines 319-364, 532); run `bun test packages/broker test/acceptance` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm `interruptSession` and `reconcileRepository` still exist.
- [ ] Step 7: Commit the listed files with message: `refactor(broker)!: delegate all lifecycle derivation to reduceLedgerEvent`
- [ ] Step 8: Stop for the M7 review checkpoint.

#### Task 16: Implement the §9.5 next-start prefix completion table

**Requirement coverage:**
- §9.5 (all six prefix rows; prefix completion reuses the original incident ID and reason code; never invokes Founder `session_close`; impossible durable order is a typed reconciliation error; `session_unclean_closure` only when no typed terminal prefix exists)
- §2.5 (reconciliation is a next-start activity, never an in-session phase)
- §9.3 (`reconciliation_required` is produced only by next-start)

**Files:**
- Create: `packages/broker/src/next-start-reconciliation.ts`
- Modify: `packages/broker/src/index.ts`
- Test: `packages/broker/test/next-start-reconciliation.test.ts`

**Interfaces:**
- Consumes: `reduceLedgerEvent`, `Ledger.appendMany`, `SessionLifecycleEventV1`.
- Produces:
  ```ts
  export type PrefixKind =
    | "open_no_activation" | "interrupted_only" | "interrupted_invalidated"
    | "interruption_through_closing" | "founder_close_at_closing" | "no_typed_terminal";
  export function classifyDurablePrefix(state: LifecycleState): PrefixKind | "complete";
  export function planPrefixCompletion(state: LifecycleState, ctx: PrefixContext): readonly SessionLifecycleEventV1[];
  export class ReconciliationOrderError extends Error {} // impossible durable order
  ```

**Preconditions:**
- Task 15 committed.

- [ ] Step 1: Write the named failing test — add one test per row named exactly `test("prefix completion: <row name>")` for all six rows; plus `test("prefix completion reuses the original incident id and reason code")`; `test("prefix completion never emits a Founder session_close")` asserting no planned record has `closure_kind: "founder"` when the prefix kind is an interruption; `test("session_closed preceding session_closing throws ReconciliationOrderError")`; `test("session_unclean_closure is not appended after a completed typed interruption sequence")`.
- [ ] Step 2: Run `bun test packages/broker/test/next-start-reconciliation.test.ts -t "prefix completion: interrupted_only"` — expected RED: `Cannot find module "../src/next-start-reconciliation"`.
- [ ] Step 3: Implement the minimum authorized behavior — implement `classifyDurablePrefix` and `planPrefixCompletion` exactly per the §9.5 table; emit records in the required order; carry the original incident ID and reason code.
- [ ] Step 4: Run `bun test packages/broker/test/next-start-reconciliation.test.ts` — expected GREEN: 10 pass. Invariant established: **every durable prefix has exactly one deterministic completion, and closure kinds are never doubled.**
- [ ] Step 5: Run `bun test packages/broker` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit the listed files with message: `feat(broker): implement next-start durable prefix completion`
- [ ] Step 8: Stop for the M7 review checkpoint.

---

### Milestone M8 — Fencing-token lifecycle

#### Task 17: Replace the session machine with Phase 3A semantics

**Requirement coverage:**
- §9.10 (named replacement: `interrupted` is terminal-bound, `"reconciling"` removed, `resume` legal only from `paused`)
- §2.5 (`interrupted` is terminal-bound; no command returns a session to `active`)
- §9.4 (`closing` only from `session_closing`; `closed` only from `session_closed`, `session_abort`, or `session_unclean_closure`)

**Files:**
- Modify: `packages/broker/src/session-machine.ts`
- Modify: `packages/broker/test/session-machine.test.ts`

**Interfaces:**
- Consumes: `LifecyclePhase`.
- Produces: `SessionState` loses `{ kind: "reconciling" }`; `SessionEvent` loses `{ type: "reconcile" }`; `TRANSITIONS` becomes `starting → {start, interrupt, abort}`, `active → {pause, interrupt, close}`, `paused → {resume, interrupt}`, `interrupted → {close}`, `closing → {complete}`, `closed → {}`.

**Preconditions:**
- M7 reviewed.

- [ ] Step 1: Write the named failing test — replace `test("interrupted transitions to reconciling")` (line 32) with `test("interrupted cannot transition to reconciling")`; replace `test("reconciling transitions to active")` (line 37) with `test("interrupted can only transition to closing")`; keep `test("interrupted cannot return directly to active")` but change the expected message from `reconciliation_required` to `invalid transition: interrupted -> resume`.
- [ ] Step 2: Run `bun test packages/broker/test/session-machine.test.ts -t "interrupted cannot transition to reconciling"` — expected RED: the transition currently succeeds and returns `{ kind: "reconciling" }` (`packages/broker/src/session-machine.ts:71-72`).
- [ ] Step 3: Implement the minimum authorized behavior — remove the `reconciling` state and `reconcile` event; restrict `interrupted` to `close`; add `abort` from `starting`.
- [ ] Step 4: Run `bun test packages/broker/test/session-machine.test.ts` — expected GREEN: 15 pass (all replaced in place). Invariant established: **no path returns an interrupted session to `active`.**
- [ ] Step 5: Run `bun test packages/broker` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm the TUI `reconciling` label was not touched (settled scope, §1A.1).
- [ ] Step 7: Commit the listed files with message: `feat(broker)!: make interruption terminal-bound and remove the reconciling phase`
- [ ] Step 8: Stop for the M8 review checkpoint.

#### Task 18: Implement fencing-token issuance, transfer, and invalidation

**Requirement coverage:**
- §9.5 (no token during preflight or initial `starting`; initial token value `1`; issuance then activation; reducer leaves `starting` after the first record; every ownership transfer increments and appends a new `fencing_token_issued`; uniqueness key `(session_id, fencing_token)`; pause neither invalidates nor increments; interrupt and close both invalidate; no in-session re-issue after interruption; a successor session begins again at `1`; cross-session monotonicity not required)

**Files:**
- Create: `packages/broker/src/fencing.ts`
- Test: `packages/broker/test/fencing.test.ts`

**Interfaces:**
- Consumes: `LifecycleState`, `SessionLifecycleEventV1`.
- Produces:
  ```ts
  export const INITIAL_FENCING_TOKEN = 1 as const;
  export function issueInitialToken(sessionId: string, writerExecutionId: string): SessionLifecycleEventV1;   // fencing_token_issued, value 1
  export function issueTransferToken(state: LifecycleState, writerExecutionId: string): SessionLifecycleEventV1; // value = current + 1
  export function invalidateToken(state: LifecycleState, reason: "interruption" | "founder_close" | "rollback", incidentId: string | null): SessionLifecycleEventV1;
  export function tokenKey(sessionId: string, token: number): string; // `${sessionId}\u0000${token}`
  ```

**Preconditions:**
- Task 17 committed.

- [ ] Step 1: Write the named failing test — add `test("the initial token is exactly 1")`; `test("pause neither invalidates nor increments the token")`; `test("an ownership transfer increments the token and appends fencing_token_issued")`; `test("no token can be re-issued after interruption")` asserting `issueTransferToken` throws when `phase === "interrupted"`; `test("a successor session begins again at 1")`.
- [ ] Step 2: Run `bun test packages/broker/test/fencing.test.ts -t "the initial token is exactly 1"` — expected RED: `Cannot find module "../src/fencing"`.
- [ ] Step 3: Implement the minimum authorized behavior — implement the four functions with the stated preconditions. Do **not** reuse the legacy random token (`crypto.getRandomValues` at `packages/broker/src/reconciliation.ts:451`), which this plan deleted in Task 15.
- [ ] Step 4: Run `bun test packages/broker/test/fencing.test.ts` — expected GREEN: 5 pass. Invariant established: **token value is derived, never random, and interruption is a one-way door.**
- [ ] Step 5: Run `bun test packages/broker` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit the listed files with message: `feat(broker): implement deterministic fencing-token issuance and invalidation`
- [ ] Step 8: Stop for the M8 review checkpoint.

#### Task 19: Pin the two durable lifecycle orders and the activation barrier

**Requirement coverage:**
- §2.5 (interruption sequence `session_interrupted → fencing_token_invalidated → session_closing → session_closed`; governed process-group termination after `session_closing` and before `session_closed`; client streams close with the terminal transition)
- §9.5 (Founder-close order `session_closing → fencing_token_invalidated → session_closed`; `session_closed` appended only after governed processes are gone; the first `active` snapshot only after both startup records are durable; if activation append fails after issuance, rollback appends `fencing_token_invalidated` and `session_abort` and no `active` snapshot is ever exposed)

**Files:**
- Create: `packages/broker/src/runtime-broker.ts`
- Test: `packages/broker/test/fencing.test.ts`

**Interfaces:**
- Consumes: `fencing.ts`, `reduceLedgerEvent`, `Ledger.appendMany`.
- Produces:
  ```ts
  export class RuntimeBroker {
    activate(writerExecutionId: string, readyExecutionIds: readonly string[]): Promise<void>;
    interrupt(reason: InterruptionReasonCodeV1, detail: string, incidentId: string, sourceEventId: string | null, reportedBy: string | null): Promise<void>;
    founderClose(commandId: string, reason: string): Promise<void>;
    readonly snapshotSeq: number;
  }
  ```

**Preconditions:**
- Task 18 committed.

- [ ] Step 1: Write the named failing test — add `test("startup appends fencing_token_issued then session_activated in that order")`; `test("no active snapshot is exposed until both startup records are durable")` asserting the observed snapshot sequence contains no `phase === "active"` entry whose `ledgerSeq` precedes the activation row; `test("interruption appends the four records in the specified order")`; `test("Founder close appends closing, invalidation, then closed")`; `test("a failed activation append rolls back to fencing_token_invalidated then session_abort with no active snapshot")`.
- [ ] Step 2: Run `bun test packages/broker/test/fencing.test.ts -t "interruption appends the four records in the specified order"` — expected RED: `Cannot find module "../src/runtime-broker"`.
- [ ] Step 3: Implement the minimum authorized behavior — implement the three methods, appending through `Ledger.append`/`appendMany` and folding each result through `reduceLedgerEvent` before publishing any snapshot.
- [ ] Step 4: Run `bun test packages/broker/test/fencing.test.ts` — expected GREEN: 10 pass. Invariant established: **durable order is the observable order, and no `active` state is ever visible before it is durable.**
- [ ] Step 5: Run `bun test packages/broker packages/ledger` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit the listed files with message: `feat(broker): pin the durable interruption and Founder-close lifecycle orders`
- [ ] Step 8: Stop for the M8 review checkpoint.

---

### Milestone M9 — Closed `BrokerCommand` / `BrokerResult` / snapshot / output contracts

#### Task 20: Declare the closed client contract

**Requirement coverage:**
- §9.3 (`ClientPrincipal`, `BrokerClient`, the seven `BrokerCommand` variants, the fourteen `BrokerErrorCode` values, `BrokerResult`; `executionId` is the identity key and `surfaceId` is not a parallel key; every command carries `commandId` and `sessionId`; `BrokerResult.detail` is sanitized)
- §9.4 (the complete minimum snapshot contract, `ExecutionSnapshot`, `OutputFrame`, and the six supporting snapshot interfaces; `ownershipState` is the existing Phase 2 closed union with no `transferPhase` field)
- §4.1 (`close()` releases only that client’s subscriptions and does not terminate the session)

**Files:**
- Create: `packages/broker/src/client.ts`
- Modify: `packages/broker/src/index.ts`
- Test: `packages/broker/test/broker-client-contract.test.ts`

**Interfaces:**
- Consumes: `TaskEnvelopeV1`, `ExecutionIdentity`, `RepositoryFingerprint`, `BridgeEventV1`.
- Produces: exactly the declarations quoted in §§9.3–9.4 of the specification, plus runtime tuples `BROKER_COMMAND_KINDS` (7 members) and `BROKER_ERROR_CODES` (14 members) so the closure is assertable.

**Preconditions:**
- M8 reviewed.

- [ ] Step 1: Write the named failing test — add `test("the command union has exactly seven kinds")`; `test("the error code union has exactly fourteen values")`; `test("the snapshot contract exposes no transferPhase field")` asserting a constructed `BrokerSnapshot` literal is rejected by `tsc` when it carries `transferPhase` (assert via a `// @ts-expect-error` line that must compile clean); `test("output frames key on executionId and never on surfaceId")` asserting `OutputFrame` has no `surfaceId` key.
- [ ] Step 2: Run `bun test packages/broker/test/broker-client-contract.test.ts` — expected RED: `Cannot find module "../src/client"`.
- [ ] Step 3: Implement the minimum authorized behavior — create `client.ts` with the type declarations and the two runtime tuples. Types only; no implementation.
- [ ] Step 4: Run the same command — expected GREEN: 4 pass. Invariant established: **the client boundary is a closed, enumerable, plain-data contract with no parallel identity key.**
- [ ] Step 5: Run `bun test packages/broker` and `bunx tsc --noEmit` (the `@ts-expect-error` assertion is verified by `tsc`, not by `bun test`).
- [ ] Step 6: Inspect the diff; confirm no PTY descriptor, subprocess handle, or ledger handle appears in any exported type.
- [ ] Step 7: Commit the listed files with message: `feat(broker): declare the closed BrokerClient command and snapshot contract`
- [ ] Step 8: Stop for the M9 review checkpoint.

#### Task 21: Implement the pinned command legality matrix

**Requirement coverage:**
- §9.3 (the ten-row command error matrix; `pty_input`/`pty_resize` require active + ready + no incident + current token; `pty_terminate` legal in starting/active/paused/interrupted/closing and never after `closed`; `session_resume` legal only from `paused`; `session_pause` and `session_close` legal only from `active` with no incident; observation remains available during `interrupted`/`closing`/`closed`)
- §9.14.4 (PTY legality correction), §9.14.6 (Interrupted errors correction)

**Files:**
- Create: `packages/broker/src/command-legality.ts`
- Test: `packages/broker/test/command-legality.test.ts`

**Interfaces:**
- Consumes: `BrokerCommand`, `BrokerSnapshot`, `BrokerErrorCode`.
- Produces:
  ```ts
  export function evaluateCommandLegality(
    command: BrokerCommand,
    snapshot: BrokerSnapshot,
    principal: ClientPrincipal,
  ): { readonly ok: true } | { readonly ok: false; readonly error: BrokerErrorCode; readonly detail: string };
  ```

**Preconditions:**
- Task 20 committed.

- [ ] Step 1: Write the named failing test — add one test per matrix row, named exactly `test("legality row: <command family> in <state> yields <error>")`, covering all ten rows; plus `test("a paused session retains its token but rejects pty_input with session_not_writable")`; `test("pty_terminate is legal during interrupted and closing but not after closed")`; `test("an execution principal cannot issue a Founder governance command")` expecting `unauthorized`; `test("a stale fencing token yields stale_fencing_token, not session_not_writable")`.
- [ ] Step 2: Run `bun test packages/broker/test/command-legality.test.ts -t "legality row: session_pause in active + incident yields incident_active"` — expected RED: `evaluateCommandLegality is not a function`.
- [ ] Step 3: Implement the minimum authorized behavior — implement the matrix with a fixed evaluation order: principal authorization → session identity → execution existence → phase/incident → token → dimensions. No or-choices; every branch returns an exact code.
- [ ] Step 4: Run `bun test packages/broker/test/command-legality.test.ts` — expected GREEN: 14 pass. Invariant established: **every rejection carries exactly one pinned code determined by exact phase and incident state.**
- [ ] Step 5: Run `bun test packages/broker` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit the listed files with message: `feat(broker): implement the pinned command legality matrix`
- [ ] Step 8: Stop for the M9 review checkpoint.

---

### Milestone M10 — `InProcessBrokerClient`, publish legality, incident atomicity

#### Task 22: Implement `InProcessBrokerClient` with an immutable bound principal

**Requirement coverage:**
- §9.3 (the supervisor constructs each in-process client already bound to an immutable principal; callers cannot declare or change their own principal)
- §4.1 (snapshots are state projections; PTY throughput uses the separate ordered byte stream; `snapshotSeq` monotonic per session; `outputSeq` monotonic per session and execution; mismatch, duplicate, regression, or gap is a typed invariant failure and an unexplained gap interrupts the session; input and resize bind to `sessionId`, `executionId`, and the current token; `close()` releases only that client)

**Files:**
- Create: `packages/broker/src/in-process-client.ts`
- Modify: `packages/broker/src/index.ts`
- Test: `packages/broker/test/in-process-client.test.ts`

**Interfaces:**
- Consumes: `BrokerClient`, `evaluateCommandLegality`, `RuntimeBroker`.
- Produces:
  ```ts
  export function createInProcessBrokerClient(broker: RuntimeBroker, principal: ClientPrincipal): BrokerClient;
  ```
  Pinned plan decisions (consistent with §4.1 “monotonic”, which the specification does not further constrain): `snapshotSeq` increments by exactly 1 per published snapshot starting at 1; `outputSeq` increments by exactly 1 per frame per execution starting at 1; for commands that append no ledger record, `acceptedSnapshotSeq` is the current `snapshotSeq` at acceptance.

**Preconditions:**
- M9 reviewed.

- [ ] Step 1: Write the named failing test — add `test("the bound principal cannot be changed by the caller")` asserting the returned object exposes no principal setter and that mutating a passed-in principal object after construction does not change authorization outcomes; `test("snapshotSeq is strictly increasing by one")`; `test("outputSeq is per execution and strictly increasing by one")`; `test("close releases only this client and does not terminate the session")` asserting the broker phase is unchanged after `close()`; `test("a command carrying a foreign sessionId fails with session_mismatch")`.
- [ ] Step 2: Run `bun test packages/broker/test/in-process-client.test.ts -t "the bound principal cannot be changed by the caller"` — expected RED: `Cannot find module "../src/in-process-client"`.
- [ ] Step 3: Implement the minimum authorized behavior — implement the factory, deep-freezing the principal at construction; route every `request()` through `evaluateCommandLegality`; implement `snapshots()` and `output()` as async iterables over per-client subscription buffers.
- [ ] Step 4: Run `bun test packages/broker/test/in-process-client.test.ts` — expected GREEN: 5 pass. Invariant established: **a client’s authority is fixed at construction and its streams are strictly ordered.**
- [ ] Step 5: Run `bun test packages/broker` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm no descriptor, handle, or mutable shared object crosses the returned interface.
- [ ] Step 7: Commit the listed files with message: `feat(broker): implement InProcessBrokerClient with an immutable bound principal`
- [ ] Step 8: Stop for the M10 review checkpoint.

#### Task 23: Enforce sequence invariants as typed interruptions

**Requirement coverage:**
- §4.1 (session mismatch, duplicate, regression, or gap is a typed invariant failure; in the in-process client an unexplained gap interrupts the session rather than being hidden)
- §9.6 (`output_sequence_invariant_failed`, `snapshot_sequence_invariant_failed` reason codes)

**Files:**
- Modify: `packages/broker/src/in-process-client.ts`
- Test: `packages/broker/test/in-process-client.test.ts`

**Interfaces:**
- Consumes: `RuntimeBroker.interrupt`.
- Produces: `class SequenceInvariantError extends Error { readonly kind: "session_mismatch" | "duplicate" | "regression" | "gap"; readonly stream: "snapshot" | "output" }`, raised and converted to a session interruption with reason code `snapshot_sequence_invariant_failed` or `output_sequence_invariant_failed`.

**Preconditions:**
- Task 22 committed.

- [ ] Step 1: Write the named failing test — add `test("an output sequence gap interrupts the session with output_sequence_invariant_failed")`; `test("a snapshot sequence regression interrupts the session with snapshot_sequence_invariant_failed")`; `test("a duplicate output sequence is not silently dropped")`; `test("an output frame carrying a foreign sessionId interrupts the session")`.
- [ ] Step 2: Run `bun test packages/broker/test/in-process-client.test.ts -t "an output sequence gap interrupts the session with output_sequence_invariant_failed"` — expected RED: the injected gap is currently delivered to the consumer unchanged and no interruption is recorded.
- [ ] Step 3: Implement the minimum authorized behavior — track the last accepted sequence per stream; on any violation raise `SequenceInvariantError` and call `RuntimeBroker.interrupt` with the matching reason code before the frame is delivered.
- [ ] Step 4: Run `bun test packages/broker/test/in-process-client.test.ts` — expected GREEN: 9 pass. Invariant established: **a sequencing anomaly ends the session; it is never hidden from the consumer.**
- [ ] Step 5: Run `bun test packages/broker` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit the listed files with message: `feat(broker): interrupt the session on snapshot and output sequence violations`
- [ ] Step 8: Stop for the M10 review checkpoint.

#### Task 24: Implement `publish()` legality with fixed precedence

**Requirement coverage:**
- §9.3 (`PublishableCollaborationEventTypeV1` eleven members; the six-row publish matrix; the fixed validation order schema → principal/identity → reserved legacy governance type → phase/incident; legacy execution-authored `pause`/`resume`/`session_close` rejected with `unauthorized`; unknown or malformed returns `invalid_command`; `BrokerResult.commandId` equals `event.event_id`; a published event referencing a pending approval or ownership request is independently validated as still pending, unresolved, bound to the requested ID, and not masked by an incident; ordinary collaboration events require no unrelated pending approval)
- §9.15.4 (remaining F4)

**Files:**
- Create: `packages/broker/src/publish-legality.ts`
- Modify: `packages/broker/src/in-process-client.ts`
- Test: `packages/broker/test/publish-legality.test.ts`

**Interfaces:**
- Consumes: `BridgeEventV1`, `BrokerSnapshot`, `ClientPrincipal`, `BrokerErrorCode`.
- Produces:
  ```ts
  export const PUBLISHABLE_COLLABORATION_EVENT_TYPES: readonly PublishableCollaborationEventTypeV1[]; // 11 members
  export const RESERVED_LEGACY_GOVERNANCE_EVENT_TYPES: readonly ["pause", "resume", "session_close"];
  export function evaluatePublishLegality(
    event: BridgeEventV1, snapshot: BrokerSnapshot, principal: ClientPrincipal,
  ): { readonly ok: true } | { readonly ok: false; readonly error: BrokerErrorCode; readonly detail: string };
  ```

**Preconditions:**
- Task 23 committed.

- [ ] Step 1: Write the named failing test — add one test per matrix row named `test("publish row: <family> in <state> yields <error>")` (6 rows); plus `test("a legacy execution-authored pause is rejected with unauthorized in every phase")` iterating all six phases; `test("a malformed incident in a closed session is invalid_command, not session_not_writable")`; `test("a valid incident in a closed session is session_not_writable")`; `test("an execution principal publishing another execution's sender id is unauthorized")`; `test("an ordinary collaboration event does not require a pending approval")`; `test("an action_accept referencing a resolved approval fails with approval_not_pending")`; `test("BrokerResult.commandId equals event.event_id for publish")`.
- [ ] Step 2: Run `bun test packages/broker/test/publish-legality.test.ts -t "a malformed incident in a closed session is invalid_command, not session_not_writable"` — expected RED: `Cannot find module "../src/publish-legality"`.
- [ ] Step 3: Implement the minimum authorized behavior — implement the four-stage precedence exactly as written in §9.3, then the phase/incident matrix; wire `BrokerClient.publish()` in `in-process-client.ts` to it.
- [ ] Step 4: Run `bun test packages/broker/test/publish-legality.test.ts` — expected GREEN: 14 pass. Invariant established: **publication legality is decided in one fixed order, and lifecycle changes can never originate from an execution-authored event.**
- [ ] Step 5: Run `bun test packages/broker` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit the listed files with message: `feat(broker): enforce publish legality with fixed validation precedence`
- [ ] Step 8: Stop for the M10 review checkpoint.

#### Task 25: Make the published-incident pair atomic

**Requirement coverage:**
- §9.3 (a published `incident` is a fail-closed control trigger accepted only from a bound `ready` execution while `active` or `paused`; the broker validates `PublishedIncidentPayloadV1` and atomically appends the original `BridgeEventV1` plus its derived `session_interrupted`; no snapshot or callback between the two appends; the reducer applies only `session_interrupted`, so an `active + incident` snapshot cannot be emitted; the accepted result returns only after the lifecycle record is durable and the phase is `interrupted`; the broker then completes the mandatory invalidation/closing/closed sequence)
- §9.6 (`source_event_id` and `reported_by_execution_id` must equal the originating event’s IDs; supervisor-originated interruptions set both to `null`; `IncidentSnapshot` is derived only from `session_interrupted`)
- §9.15.3 (N3)

**Files:**
- Modify: `packages/broker/src/runtime-broker.ts`
- Test: `packages/broker/test/incident-atomicity.test.ts`

**Interfaces:**
- Consumes: `Ledger.appendMany`, `parseSessionLifecycleEvent`, `evaluatePublishLegality`.
- Produces: `RuntimeBroker.publishIncident(event: BridgeEventV1): Promise<BrokerResult>` performing exactly one `appendMany([sourceEvent, derivedInterrupted])`.

**Preconditions:**
- Task 24 committed.

- [ ] Step 1: Write the named failing test — add `test("no snapshot is emitted between the source incident and the derived lifecycle record")` recording every published snapshot and asserting none has `phase === "active"` with a non-null `incident`; `test("the derived record copies source_event_id and reported_by_execution_id from the originating event")`; `test("a supervisor-originated interruption sets both source fields to null")`; `test("the accepted result is returned only after the phase is interrupted")`; `test("the mandatory invalidation, closing, and closed records follow the incident pair")`.
- [ ] Step 2: Run `bun test packages/broker/test/incident-atomicity.test.ts -t "no snapshot is emitted between the source incident and the derived lifecycle record"` — expected RED: `broker.publishIncident is not a function`.
- [ ] Step 3: Implement the minimum authorized behavior — implement `publishIncident` to build the derived record, call `appendMany` once, fold both rows through `reduceLedgerEvent`, publish exactly one snapshot afterwards, and then run the invalidation/closing/closed sequence from Task 19.
- [ ] Step 4: Run `bun test packages/broker/test/incident-atomicity.test.ts` — expected GREEN: 5 pass. Invariant established: **`active + incident` is unobservable, because the pair is one transaction and one snapshot.**
- [ ] Step 5: Run `bun test packages/broker packages/ledger` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm exactly one `appendMany` call site for the incident path.
- [ ] Step 7: Commit the listed files with message: `feat(broker): append the published-incident pair atomically`
- [ ] Step 8: Stop for the M10 review checkpoint.

---

### Milestone M11 — Storage root resolution, validation, permissions, rollback, retention

#### Task 26: Resolve the passwd home and fail closed on `$HOME` divergence

**Requirement coverage:**
- §5.2 (default home is the authenticated user’s passwd entry from `getpwuid(getuid())`, not `$HOME`; if `$HOME` is present and does not resolve to the passwd home, preflight fails with a typed home-mismatch error)

**Files:**
- Create: `packages/storage/package.json`
- Create: `packages/storage/src/home.ts`
- Create: `packages/storage/src/index.ts`
- Modify: `tsconfig.json`
- Test: `packages/storage/test/home.test.ts`

**Interfaces:**
- Consumes: `os.userInfo()` (POSIX `getpwuid_r`) and `fs.realpathSync`.
- Produces:
  ```ts
  export function resolvePasswdHome(): string;                 // realpath of os.userInfo().homedir
  export function assertHomeConsistency(env: NodeJS.ProcessEnv): void; // throws HomeMismatchError
  export class HomeMismatchError extends Error { readonly passwdHome: string; readonly envHome: string }
  ```

**Preconditions:**
- M10 reviewed. `packages/storage` does not yet exist.

- [ ] Step 1: Write the named failing test — add `test("a $HOME that does not resolve to the passwd home is a typed failure")` passing `{ HOME: "/tmp" }` and expecting `HomeMismatchError`; `test("an absent $HOME is accepted and the passwd home is used")`; `test("a $HOME that is a symlink resolving to the passwd home is accepted")`.
- [ ] Step 2: Run `bun test packages/storage/test/home.test.ts` — expected RED: `Cannot find module "../src/home"` (the package does not exist).
- [ ] Step 3: Implement the minimum authorized behavior — create the package manifest, `home.ts`, `index.ts`, and the `@madventures/storage` `paths` entry in `tsconfig.json`. Compare via `realpathSync` on both sides.
- [ ] Step 4: Run `bun test packages/storage/test/home.test.ts` — expected GREEN: 3 pass. Invariant established: **storage location is derived from the authenticated identity, not from a mutable environment variable.**
- [ ] Step 5: Run `bun test` (full) and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm four files.
- [ ] Step 7: Commit the listed files with message: `feat(storage): resolve the passwd home and fail closed on $HOME divergence`
- [ ] Step 8: Stop for the M11 review checkpoint.

#### Task 27: Implement the single storage-root validator

**Requirement coverage:**
- §5.1 (root path shape; `sessions/`, `capability/`; no `runtime/`)
- §5.2 (`MADV_STORAGE_DIR` is the only override; default and override pass the same validator; the seven validity conditions; pure preflight validates a proposed path without creating it; tests use disposable `mkdtemp` roots under the macOS per-user private temporary tree and exercise the same production validator; there is no relaxed test path)
- §4.4 (`MADV_RUNTIME_DIR` is not reused)

**Files:**
- Create: `packages/storage/src/storage-root.ts`
- Modify: `packages/storage/src/index.ts`
- Test: `packages/storage/test/storage-root.test.ts`

**Interfaces:**
- Consumes: `resolvePasswdHome`, `assertHomeConsistency`.
- Produces:
  ```ts
  export type StorageRootFailure =
    | "not_absolute" | "inside_repository" | "symlink_component" | "not_owned_by_uid"
    | "group_or_other_accessible" | "realpath_unstable" | "not_writable_local";
  export function proposeStorageRoot(env: NodeJS.ProcessEnv, repositoryRoot: string, worktree: string): string;
  export function validateStorageRoot(path: string, repositoryRoot: string, worktree: string): { readonly ok: true } | { readonly ok: false; readonly failure: StorageRootFailure };
  export const STORAGE_SUBDIRECTORIES: readonly ["sessions", "capability"];
  ```

**Preconditions:**
- Task 26 committed.

- [ ] Step 1: Write the named failing test — add one test per failure code named `test("storage root rejects <failure code>")` (7 tests, using `mkdtempSync` roots under `os.tmpdir()`, `symlinkSync`, and `chmodSync(0o750)`); plus `test("the default root is <passwd-home>/Library/Application Support/MADVentures/madventures-tui")`; `test("MADV_STORAGE_DIR is the only override and uses the same validator")`; `test("MADV_RUNTIME_DIR is ignored by storage resolution")`; `test("validation creates nothing")` asserting the proposed path still does not exist after validation; `test("runtime/ is not part of the Phase 3A subdirectory set")`.
- [ ] Step 2: Run `bun test packages/storage/test/storage-root.test.ts -t "storage root rejects symlink_component"` — expected RED: `Cannot find module "../src/storage-root"`.
- [ ] Step 3: Implement the minimum authorized behavior — implement `proposeStorageRoot` and `validateStorageRoot` with the seven checks in the listed order, using `lstatSync` per path component for the symlink check, `statSync().uid === process.getuid()`, `(mode & 0o077) === 0`, and `realpathSync` stability.
- [ ] Step 4: Run `bun test packages/storage/test/storage-root.test.ts` — expected GREEN: 12 pass. Invariant established: **one validator governs both the default and the override, and validation is side-effect free.**
- [ ] Step 5: Run `bun test packages/storage` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm no relaxed test-only branch exists in the validator.
- [ ] Step 7: Commit the listed files with message: `feat(storage): implement the single storage-root validator`
- [ ] Step 8: Stop for the M11 review checkpoint.

#### Task 28: Implement transactional session storage with bounded rollback

**Requirement coverage:**
- §5.2 (transactional build creates missing directories with mode `0700`, then revalidates ownership, mode, symlinks, and `realpath` before opening the ledger; failure rolls the build back)
- §9.6 (`session_open` is the durable boundary: before it a newly created session directory may be removed; after it the directory persists and receives `session_abort`; capability records are never deleted by startup rollback)
- §5.7 (Phase 3A never automatically deletes session or capability storage)

**Files:**
- Create: `packages/storage/src/session-storage.ts`
- Modify: `packages/storage/src/index.ts`
- Test: `packages/storage/test/session-storage.test.ts`

**Interfaces:**
- Consumes: `validateStorageRoot`.
- Produces:
  ```ts
  export interface SessionStorage {
    readonly root: string; readonly sessionDir: string;
    readonly ledgerDir: string; readonly artifactsDir: string; readonly sanitizedEvidenceDir: string;
  }
  export function createSessionStorage(root: string, sessionId: string, repositoryRoot: string, worktree: string): SessionStorage; // creates 0700 then revalidates
  export function rollbackSessionStorage(storage: SessionStorage, sessionOpenDurable: boolean): "removed" | "retained";
  ```
  `rollbackSessionStorage` removes **only** `storage.sessionDir` and only when `sessionOpenDurable === false`; it never touches `root`, `sessions/`, or `capability/`.

**Preconditions:**
- Task 27 committed.

- [ ] Step 1: Write the named failing test — add `test("session directories are created 0700 and revalidated")`; `test("rollback before session_open removes only the session directory")` asserting `capability/` and sibling session directories survive; `test("rollback after session_open retains the directory")`; `test("rollback never targets the storage root")` asserting the function throws if `sessionDir === root`; `test("a session id containing a path separator is rejected")`.
- [ ] Step 2: Run `bun test packages/storage/test/session-storage.test.ts -t "rollback before session_open removes only the session directory"` — expected RED: `Cannot find module "../src/session-storage"`.
- [ ] Step 3: Implement the minimum authorized behavior — implement both functions; assert the session ID is filesystem-safe (`^[A-Za-z0-9_-]{1,128}$`) before path construction; bound the removal target to `sessionDir` with an explicit prefix check against `root/sessions/`.
- [ ] Step 4: Run `bun test packages/storage/test/session-storage.test.ts` — expected GREEN: 5 pass. Invariant established: **every destructive rollback has a bounded, prefix-checked target and stops at the `session_open` boundary.**
- [ ] Step 5: Run `bun test packages/storage` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm no automatic retention or deletion policy was added.
- [ ] Step 7: Commit the listed files with message: `feat(storage): add transactional session storage with bounded rollback`
- [ ] Step 8: Stop for the M11 review checkpoint.

---

### Milestone M12 — `init` replacement

#### Task 29: Replace repo-local `init` with the host-storage initializer

**Requirement coverage:**
- §9.9 (`init` resolves passwd home, validates `$HOME` consistency, previews the default root or `MADV_STORAGE_DIR` override, previews only root/`sessions/`/`capability/`, creates them `0700` only after Founder confirmation, writes no repository-local config, backup, `.madv-runtime`, session directory, ledger, artifact, or evidence file, and is not required for transactional startup; existing `.madv-runtime` data is legacy user data that is not deleted, migrated, or treated as live)

**Files:**
- Modify: `apps/madbridge/src/commands/init.ts`
- Modify: `apps/madbridge/package.json`
- Test: `apps/madbridge/test/init-storage.test.ts`
- Modify: `apps/madbridge/test/cli.test.ts`

**Interfaces:**
- Consumes: `resolvePasswdHome`, `assertHomeConsistency`, `proposeStorageRoot`, `validateStorageRoot`, `STORAGE_SUBDIRECTORIES`.
- Produces: `initCommand` returning JSON `{ ok, preview: { root, subdirectories }, applied }`; text preview naming the same three paths.

**Preconditions:**
- M11 reviewed.

- [ ] Step 1: Write the named failing test — in `apps/madbridge/test/init-storage.test.ts` add `test("init writes nothing inside the repository")` running `init --yes` with `MADV_STORAGE_DIR` set to a `mkdtemp` root and asserting `readdirSync(cwd)` is byte-identical before and after; `test("init previews exactly the root, sessions, and capability directories")`; `test("init creates the three directories with mode 0700")`; `test("init does not create runtime/")`; `test("init does not delete or migrate an existing .madv-runtime")`; `test("declined init creates nothing")`.
- [ ] Step 2: Run `bun test apps/madbridge/test/init-storage.test.ts -t "init writes nothing inside the repository"` — expected RED: `init` creates `.madv-runtime/{,sessions,ledger,artifacts,backups}` and `config.json` in `cwd` (`apps/madbridge/src/commands/init.ts:10-16,68-91`).
- [ ] Step 3: Implement the minimum authorized behavior — replace `APPROVED_DIRS`, `buildPreview`, and the config/backup writes with storage-root preview and creation; add `@madventures/storage` to `apps/madbridge/package.json`.
- [ ] Step 4: Run `bun test apps/madbridge/test/init-storage.test.ts` — expected GREEN: 6 pass. Invariant established: **`init` never writes into the governed repository.**
- [ ] Step 5: Replace the three legacy `init` cases in `apps/madbridge/test/cli.test.ts:204-243`; run `bun test apps/madbridge` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm no migration or deletion code path exists.
- [ ] Step 7: Commit the listed files with message: `feat(cli)!: replace repo-local init with the host-storage initializer`
- [ ] Step 8: Stop for the M12 review checkpoint.

---

### Milestone M13 — CLI placeholders, live-start gate, help truth

#### Task 30: Replace `start` with the certified gate

**Requirement coverage:**
- §4.2 (exit status `78`; stable error `live_runtime_not_certified`; the exact human line; the exact JSON shape and values; no filesystem inspection; no runtime module import; no hidden flag, environment variable, debug branch, dynamic import, or alternate argument path)

**Files:**
- Modify: `apps/madbridge/src/commands/start.ts`
- Test: `apps/madbridge/test/cli-gate.test.ts`
- Modify: `apps/madbridge/test/cli.test.ts`

**Interfaces:**
- Consumes: `CommandFlags`, `CommandContext`, `CommandResult` from `apps/madbridge/src/commands/types.ts` — unchanged.
- Produces: `startCommand` returning `exitCode: 78` and, in JSON mode, exactly
  `{"ok":false,"error":"live_runtime_not_certified","hint":"Phase 3A runtime foundation is present; live startup requires Phase 3B certification."}`;
  in text mode exactly
  `Live runtime not certified. Phase 3A runtime foundation is present; live startup requires Phase 3B certification.`

**Preconditions:**
- M12 reviewed.

- [ ] Step 1: Write the named failing test — in `apps/madbridge/test/cli-gate.test.ts` add `test("start exits 78 with the exact human line")` asserting byte equality; `test("start --json emits the exact object and key order")` asserting `result.stdout` equals the exact JSON string; `test("start ignores every flag and argument")` iterating `--envelope x`, `--force`, `--dev`, `--live`, `--json --envelope x`, and a positional argument, asserting identical output each time; `test("start performs no filesystem read")` asserting a `mkdtemp` cwd is unchanged and that no envelope path is stat-ed (assert by passing `--envelope` pointing at a path whose parent directory is mode `0000`, which would throw if probed); `test("start.ts imports no runtime module")` asserting the source text matches no `@madventures/(broker|ledger|storage|supervisor|pty-host)` and no `import(`.
- [ ] Step 2: Run `bun test apps/madbridge/test/cli-gate.test.ts -t "start exits 78 with the exact human line"` — expected RED: `startCommand` returns exit `1` with `preflight failed:` text (`apps/madbridge/src/commands/start.ts:106-127`).
- [ ] Step 3: Implement the minimum authorized behavior — replace the whole file with a constant-returning function. Delete the `fs`, `path`, and `@madventures/protocol` imports.
- [ ] Step 4: Run `bun test apps/madbridge/test/cli-gate.test.ts` — expected GREEN: 5 pass. Invariant established: **`start` is a constant; there is no input that reaches a runtime.**
- [ ] Step 5: Replace `apps/madbridge/test/cli.test.ts:126-154`; run `bun test apps/madbridge` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm `start.ts` has zero imports other than the local `types` module.
- [ ] Step 7: Commit the listed files with message: `feat(cli)!: gate production start with live_runtime_not_certified`
- [ ] Step 8: Stop for the M13 review checkpoint.

#### Task 31: Replace `status`, `pause`, `resume`, and `close` with truthful placeholders

**Requirement coverage:**
- §4.3 (recognized names, no external control plane, exit `69`, stable error `external_control_unavailable`, no socket/PID/filesystem/ledger/discovery probing, the exact shared human line for `status`/`pause`/`resume`, the exact longer human line for `close`, both exact JSON shapes; architecture tests assert these modules do not import socket paths or probe the filesystem)

**Files:**
- Modify: `apps/madbridge/src/commands/status.ts`
- Modify: `apps/madbridge/src/commands/pause.ts`
- Modify: `apps/madbridge/src/commands/resume.ts`
- Modify: `apps/madbridge/src/commands/close.ts`
- Test: `apps/madbridge/test/cli-placeholders.test.ts`
- Modify: `apps/madbridge/test/cli.test.ts`

**Interfaces:**
- Consumes: `CommandFlags`, `CommandContext`, `CommandResult` — unchanged.
- Produces: each command returns `exitCode: 69`; `status`/`pause`/`resume` return the exact text `External control unavailable. Use the certified TUI governance controls.` and JSON `{"ok":false,"error":"external_control_unavailable","hint":"Use the certified TUI governance controls."}`; `close` returns the exact text `External control unavailable. Use the certified TUI governance controls. If the TUI is unresponsive during an incident, terminate the foreground supervisor process; supervisor exit terminates all governed children fail-closed.` and the matching JSON hint.

**Preconditions:**
- Task 30 committed.

- [ ] Step 1: Write the named failing test — add `test("<cmd> exits 69 with the exact human line")` for each of the four commands (4 tests, byte equality); `test("<cmd> --json emits the exact object")` for each (4 tests); `test("close carries the supervisor-termination sentence and the other three do not")`; `test("no placeholder command imports @madventures/broker")` asserting the four source files match no `@madventures/broker`; `test("no placeholder command touches the filesystem")` asserting the four source files match no `existsSync|readFileSync|statSync|readdirSync|process.env.MADV_`.
- [ ] Step 2: Run `bun test apps/madbridge/test/cli-placeholders.test.ts -t "status exits 69 with the exact human line"` — expected RED: `statusCommand` returns exit `1` with `no broker running (socket not found: …)` (`apps/madbridge/src/commands/status.ts:19-36`).
- [ ] Step 3: Implement the minimum authorized behavior — replace all four files with constant-returning functions; delete the `fs`, `path`, and `@madventures/broker` imports from each.
- [ ] Step 4: Run `bun test apps/madbridge/test/cli-placeholders.test.ts` — expected GREEN: 11 pass. Invariant established: **the external-control names exist and are truthful; none of them can observe runtime state.**
- [ ] Step 5: Replace `apps/madbridge/test/cli.test.ts:156-186`; run `bun test apps/madbridge` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm four files now import only `./types`.
- [ ] Step 7: Commit the listed files with message: `feat(cli)!: replace external-control commands with truthful placeholders`
- [ ] Step 8: Stop for the M13 review checkpoint.

#### Task 32: Make the help text truthful

**Requirement coverage:**
- §9.9 (help must state that `start` is present but live runtime is not certified; `status`/`pause`/`resume`/`close` are reserved external-control names; `doctor`, `init`, `verify-ledger`, and `export-evidence` retain their scoped responsibilities; help text claiming `start` launches a session and help or JSON claiming socket-backed external control are intentionally replaced)

**Files:**
- Modify: `apps/madbridge/src/cli.ts`
- Test: `apps/madbridge/test/cli-gate.test.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `HELP_TEXT` whose command lines read exactly:
  `init              Preview and create the host storage root (no repository writes)`;
  `doctor            Read-only environment health checks`;
  `start             Present but not certified — live startup requires Phase 3B`;
  `status            Reserved external-control name — no external control plane`;
  `pause             Reserved external-control name — no external control plane`;
  `resume            Reserved external-control name — no external control plane`;
  `close             Reserved external-control name — no external control plane`;
  `verify-ledger     Perform complete-chain verification`;
  `export-evidence   Write sanitized evidence package`.

**Preconditions:**
- Task 31 committed.

- [ ] Step 1: Write the named failing test — add `test("help does not claim start launches a session")` asserting `--help` stdout matches no `/launch a governed session/i`; `test("help names the four reserved external-control commands")` asserting all four lines are present verbatim; `test("help mentions no socket, broker daemon, or runtime directory")` asserting no match for `/socket|daemon|\.madv-runtime|broker\.sock/i`.
- [ ] Step 2: Run `bun test apps/madbridge/test/cli-gate.test.ts -t "help does not claim start launches a session"` — expected RED: `HELP_TEXT` contains `start             Validate preflight and launch a governed session` (`apps/madbridge/src/cli.ts:44`).
- [ ] Step 3: Implement the minimum authorized behavior — replace the nine command lines in `HELP_TEXT`. The command set and dispatch table are unchanged.
- [ ] Step 4: Run `bun test apps/madbridge/test/cli-gate.test.ts` — expected GREEN: 8 pass. Invariant established: **the operator-visible description matches the shipped behavior.**
- [ ] Step 5: Run `bun test apps/madbridge` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm `COMMANDS` still contains exactly the nine names.
- [ ] Step 7: Commit the listed files with message: `docs(cli): make help text match the Phase 3A gate and placeholders`
- [ ] Step 8: Stop for the M13 review checkpoint.

---

### Milestone M14 — Socket / MCP / pipe-PTY quarantine and architecture enforcement

> **`PLAN-OPEN-4` blocks Task 34’s manifest edit. `PLAN-OPEN-6` blocks Task 34’s script removal. No TUI file is touched in this milestone or anywhere in Phase 3A — settled scope, §1A.1.**

#### Task 33: Sever socket, MCP, and `PtyManager` from production reach

**Requirement coverage:**
- §9.10 (retain `socket.ts` as dormant scaffolding with its direct isolated unit test only; remove the public re-export and every production/harness import; remove `BrokerSocket` from `createInMemoryBrokerForTest()`; remove the `packages/broker/src/index.ts` socket exports; retire `pty-manager.ts` from production and remove its public export; move the minimum byte-routing fake under test fixtures; quarantine the MCP tool catalog and both adapter `mcp-config` previews)
- §4.4 (socket dormancy; `MADV_RUNTIME_DIR` not reused)

**Files:**
- Modify: `packages/broker/src/index.ts`
- Modify: `packages/broker/src/broker.ts`
- Modify: `packages/adapter-claude-code/src/adapter.ts`
- Modify: `packages/adapter-claude-code/src/index.ts`
- Modify: `packages/adapter-antigravity/src/adapter.ts`
- Modify: `packages/adapter-antigravity/src/index.ts`
- Modify: `packages/broker/test/socket.test.ts`
- Modify: `packages/broker/test/broker.test.ts`
- Modify: `packages/broker/test/mcp-contract.test.ts`
- Modify: `apps/madbridge/test/pty-focus.test.tsx`
- Modify: `test/adapter-parity.shared.ts`
- Create: `test/phase3a/fixture-adapters.ts`
- Preserve: `packages/broker/src/socket.ts`, `packages/broker/src/mcp-server.ts`, `packages/broker/src/pty-manager.ts`, `packages/adapter-*/src/mcp-config.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `packages/broker/src/index.ts` no longer exports `BrokerSocket`, `MADV_RUNTIME_DIR`, `MADV_SOCKET_PATH`, `MCP_TOOLS`, `McpServer`, `McpToolDef`, `PtyManager`, `createPtyManager`, or the PTY types. `InMemoryBroker` loses `runtimeDir`, `socketPath`, and `mcpTools`. `test/phase3a/fixture-adapters.ts` exports `createFakeByteRouter(): { write(id: string, bytes: Uint8Array): void; onData(id: string, cb: (b: Uint8Array) => void): void }` — no process spawn, not named a PTY.

**Preconditions:**
- M13 reviewed.

- [ ] Step 1: Write the named failing test — in `test/phase3a/architecture-phase3a.test.ts` add `test("the broker package index exports no socket, MCP, or PtyManager symbol")` asserting the module namespace of `@madventures/broker` contains none of those eight names; `test("no production or harness file imports socket.ts")` asserting only `packages/broker/test/socket.test.ts` matches `from ".*socket"`; `test("no production file constructs a unix:// URL")` asserting production source matches no `unix://`.
- [ ] Step 2: Run `bun test test/phase3a/architecture-phase3a.test.ts -t "the broker package index exports no socket, MCP, or PtyManager symbol"` — expected RED: all eight are exported at `packages/broker/src/index.ts:4,5,6,9,10`.
- [ ] Step 3: Implement the minimum authorized behavior — delete those export lines; delete the socket and MCP imports and the three fields from `broker.ts`; delete `prepareConfigPreview` from both adapters’ contracts and their `unix://madbridge.sock` literals; create the fake byte router; retarget the 5 `PtyManager` cases in `pty-focus.test.tsx` and the 3 `prepareConfigPreview` cases in `adapter-parity.shared.ts`; rewrite `socket.test.ts` as the explicit isolated legacy unit test importing `../src/socket` directly and asserting only path-shape behavior without creating a socket.
- [ ] Step 4: Run `bun test test/phase3a/architecture-phase3a.test.ts` — expected GREEN. Invariant established: **the dormant modules exist in history but are unreachable from every production and harness graph.**
- [ ] Step 5: Run `bun test` (full) and `bunx tsc --noEmit`. Record the new counts; they must not fall below 714/2606/35.
- [ ] Step 6: Inspect the diff; confirm no file was deleted.
- [ ] Step 7: Commit the listed files with message: `refactor!: quarantine socket, MCP, and pipe-PTY scaffolding from production reach`
- [ ] Step 8: Stop for the M14 review checkpoint.

#### Task 34: Prove no `broker.sock` path is reachable and remove the dead native dependency

**Requirement coverage:**
- §6.2 (no `broker.sock` creation path is reachable; socket scaffolding absent from production and harness startup graphs)
- §6.8.15 (no production or harness path creates `broker.sock`)
- §9.7 (`node-pty` is not an implementation choice)

**Files:**
- Create: `test/phase3a/negative-control.ts`
- Modify: `packages/broker/package.json` (**`PLAN-OPEN-4`**)
- Modify: `bun.lock` (**`PLAN-OPEN-4`**)
- Modify: `package.json` (**`PLAN-OPEN-6`**)
- Modify: `README.md`
- Test: `test/phase3a/architecture-phase3a.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: no source interface change. Root scripts `broker` and `mcp` are removed; `test:phase3a`, `test:arch`, `test:adversarial`, and `verify:phase3a` are added.

**Preconditions:**
- Task 33 committed. **`PLAN-OPEN-4` and `PLAN-OPEN-6` rulings received in writing.** Without both, stop and escalate under §10.

- [ ] Step 1: Write the named failing test — add `test("launching every production entry point in bounded isolated processes creates no broker.sock")`. The CLI and TUI follow separate lifecycle contracts. Each CLI and TUI child is launched with its own distinct disposable `MADV_RUNTIME_DIR`, and every `broker.sock`-absence assertion in this test checks both `<MADV_RUNTIME_DIR>/broker.sock` and the fixed `/tmp/madv-broker-runtime/broker.sock` path at every assertion point — before launch, at applicable readiness, after exit or termination, and after every child-process failure or termination/reaping outcome; removal of the disposable `MADV_RUNTIME_DIR` and other fixture-directory cleanup occurs only after the final socket-absence assertions. Each child uses a `5,000` millisecond deadline, measured with a monotonic clock from successful spawn until the CLI exits or TUI readiness is observed; `65,536`-byte stdout and stderr limits that apply throughout the child lifetime; and ignored stdin. On timeout, output overflow, or any other failure while a spawned child remains alive, the test sends SIGTERM, waits no more than `500` milliseconds, sends SIGKILL if the child remains alive, and always awaits and reaps the child before returning. CLI path: launch `apps/madbridge/src/cli.ts start --json`, assert `/tmp/madv-broker-runtime/broker.sock` is `false` immediately before launch, await and reap its normal exit, require exit code `78` and stdout, ignoring exactly one trailing newline, byte-equal to `{"ok":false,"error":"live_runtime_not_certified","hint":"Phase 3A runtime foundation is present; live startup requires Phase 3B certification."}`, and assert `/tmp/madv-broker-runtime/broker.sock` is `false` after exit; any spawn failure, signal termination, timeout, stdout or stderr overflow, unexpected exit code or output, or cleanup/reaping failure fails the CLI path; the CLI has no readiness checkpoint and is not terminated by the test after a successful normal exit. Default production TUI path: launch `apps/madbridge/src/tui/main.tsx` without `--fixture`, assert `/tmp/madv-broker-runtime/broker.sock` is `false` before launch, require captured stdout containing `NOT CONNECTED`, assert `/tmp/madv-broker-runtime/broker.sock` is `false` at that readiness point, perform test-controlled SIGTERM, wait no more than `500` milliseconds, send SIGKILL if necessary, await and reap the child, and assert `/tmp/madv-broker-runtime/broker.sock` is `false` after termination; early exit, signal termination before readiness, missing readiness by the deadline, stdout or stderr overflow, spawn failure, or cleanup/reaping failure fails the TUI path; test-controlled SIGTERM, and SIGKILL after the specified grace when required, are expected cleanup outcomes and must not be classified as unexpected signals; `test("no workspace or root manifest declares a native PTY dependency and the lockfile carries no resolved native PTY entry")` asserting no `package.json` under `packages/`, `apps/`, or the repository root matches `node-pty` or `node-addon-api` in any dependency-bearing section (`dependencies`, `devDependencies`, `peerDependencies`, or `optionalDependencies`), and `bun.lock` contains no resolved `node-pty` entry, no resolved `node-addon-api` entry, and no `@madventures/broker` workspace dependency edge for `node-pty`; `test("root package.json exposes no quarantined script key")` asserting the root `package.json` `scripts` object contains no key named `broker` or `mcp`, regardless of that script's value or command wrapping; `test("the negative control detects a seeded broker.sock and exits 1")` creating a real unix socket named `broker.sock` inside a disposable `MADV_STORAGE_DIR` and asserting the script names it and exits `1`; `test("the negative control respects its depth bound")` using two isolated disposable `MADV_STORAGE_DIR` roots — root A seeds a `broker.sock` at exactly the maximum scanned depth 6 and asserts the script names it and exits `1`; root B seeds a `broker.sock` at depth 7 only and asserts the script does not name it and exits `0`; `test("the negative control never reads MADV_RUNTIME_DIR")` setting that variable to a seeded directory and asserting the script ignores it and audits the fixed literal path instead.
- [ ] Step 2: Run `bun test test/phase3a/architecture-phase3a.test.ts -t "no workspace or root manifest declares a native PTY dependency and the lockfile carries no resolved native PTY entry"` — expected RED: `packages/broker/package.json:11` declares `"node-pty": "^1.1.0"`, and `bun.lock` carries the resolved `node-pty@1.1.0` and `node-addon-api@7.1.1` entries and the `@madventures/broker` workspace dependency edge for `node-pty`. Run the script test — expected RED: root `package.json` declares `"broker"` and `"mcp"`.
- [ ] Step 3: Implement the minimum authorized behavior — create `test/phase3a/negative-control.ts` (depth bound 6, `isSymbolicLink()` entries skipped without following, passwd home via `os.userInfo().homedir`, `MADV_STORAGE_DIR` override, fixed literal `/tmp/madv-broker-runtime`, per-root match counts, `process.exit(1)` on any hit); remove the `node-pty` dependency line; run `bun install` to regenerate `bun.lock`. The regeneration must remove the broker workspace dependency edge for `node-pty`, the resolved `node-pty@1.1.0` entry, and the resolved `node-addon-api` entry when no remaining workspace dependency requires it. At baseline `e68e57b19d9b601a832caa884518d978b1d895ab`, `node-addon-api` exists solely through `node-pty` and therefore must be removed. No package is added; remove the two root scripts and add the four new ones.

Delete the two broker-daemon lines from `README.md`'s Bash command block
(lines 59–60 at the plan baseline):

```bash
# Broker daemon
bun run broker
```

Do not insert replacement prose inside the code fence. The surrounding
block remains a valid Bash code block.
- [ ] Step 4: Run all six focused tests — expected GREEN: 6 pass. Invariant established: **no named endpoint can be created, no native PTY dependency is declared, and the negative control provably detects a violation rather than only reporting clean.**
- [ ] Step 5: Run `bun test` (full) and `bunx tsc --noEmit`; run `git diff bun.lock` and confirm the diff is a pure removal.
- [ ] Step 6: Inspect the diff; confirm `bun.lock` gained no entry.
- [ ] Step 7: Commit `packages/broker/package.json bun.lock package.json README.md test/phase3a/negative-control.ts test/phase3a/architecture-phase3a.test.ts` with message: `chore!: remove the unused node-pty declaration and quarantined run scripts`
- [ ] Step 8: Stop for the M14 review checkpoint.

---

### Milestone M15 — Capability records and surface-investigation tooling

> **`PLAN-OPEN-3` blocks Task 35’s horizon value.**

#### Task 35: Define the capability record and its staleness rules

**Requirement coverage:**
- §5.5 (the thirteen recorded fields; normalized surface identifiers; paths cannot be selected by untrusted display names; capability evidence is a dated observation, not a standing authorization or whitelist)
- §2.3 (records become stale when the CLI version or binary hash changes, when the host changes, or when the configured horizon expires; a record only makes a surface eligible to be *presented*, and a real session must repeat the full fresh preflight)
- §9.1 (capability records copy the canonical normalized provider, `organization_id`, and `independence_domain` and fail admission if they disagree with the registration)

**Files:**
- Create: `packages/protocol/src/capability-record.ts`
- Modify: `packages/protocol/src/index.ts`
- Test: `packages/protocol/test/capability-record.test.ts`

**Interfaces:**
- Consumes: `SurfaceId`, `normalizeIdentifier`, `normalizeIndependenceDomain`, `ADAPTER_REGISTRY`.
- Produces:
  ```ts
  export interface CapabilityRecordV1 {
    readonly surface: SurfaceId; readonly provider: string; readonly requested_model: string;
    readonly role_eligibility: readonly ExecutionRole[];
    readonly independence_domain: string; readonly organization_id: string;
    readonly cli_version: string; readonly binary_path: string; readonly binary_sha256: string;
    readonly evaluated_at: string; readonly expires_at: string;
    readonly host: { readonly arch: string; readonly macos_version: string; readonly macos_build: string;
                     readonly bun_version: string; readonly bun_path: string; readonly bun_sha256: string;
                     readonly term: string; readonly shell: string };
    readonly identity_attestation: { readonly result: "pass" | "fail"; readonly primitive: string; readonly sanitized_facts: string };
    readonly auth_readiness: { readonly result: "pass" | "fail" | "no_primitive"; readonly primitive: string | null };
    readonly pty: { readonly result: "pass" | "fail"; readonly observed_ms: Record<string, number> };
    readonly independent_review_eligible: boolean; readonly limitations: readonly string[];
    readonly overall: "pass" | "fail";
    readonly redaction_rules_applied: readonly string[];
  }
  export function parseCapabilityRecord(raw: Record<string, unknown>): CapabilityRecordV1;
  export type StalenessReason = "binary_hash_changed" | "cli_version_changed" | "host_changed" | "horizon_expired";
  export function evaluateCapabilityFreshness(record: CapabilityRecordV1, now: string, observed: ObservedSurfaceFacts): { readonly fresh: true } | { readonly fresh: false; readonly reason: StalenessReason };
  export function capabilityRecordFilename(record: CapabilityRecordV1): string; // `${evaluated_at}-${binary_sha256.slice(0,12)}.json`
  ```

**Preconditions:**
- M14 reviewed. **`PLAN-OPEN-3` ruling received** for the default horizon used when an investigation does not state one.

- [ ] Step 1: Write the named failing test — add one test per staleness reason named `test("capability freshness fails on <reason>")` (4 tests); `test("a record whose independence_domain disagrees with the registration fails admission")`; `test("a record whose organization_id disagrees with the registration fails admission")`; `test("a passing record is not a live authorization")` asserting the module exports no function whose name matches `/authoriz|certif|admit/i`; `test("the capability filename is derived from the normalized surface and binary hash, never a display name")`; `test("parseCapabilityRecord rejects a malformed or nonfinite evaluated_at or expires_at")`; `test("parseCapabilityRecord requires exact canonical UTC toISOString() round-trip equality")`; `test("expires_at must equal evaluated_at plus exactly 30 days")`; `test("evaluateCapabilityFreshness rejects an invalid now value")`.
- [ ] Step 2: Run `bun test packages/protocol/test/capability-record.test.ts -t "capability freshness fails on binary_hash_changed"` — expected RED: `Cannot find module "../src/capability-record"`.
- [ ] Step 3: Implement the minimum authorized behavior — implement the parser with strict stored-timestamp parsing (canonical UTC round-trip and finite-value validation before `toISOString()`), the four staleness checks in the listed order with no fifth reason, the exact 30-day relationship, invalid-`now` rejection, the registration cross-check, and the filename derivation.
- [ ] Step 4: Run `bun test packages/protocol/test/capability-record.test.ts` — expected GREEN: 12 pass. Invariant established: **a capability record is a dated observation whose only power is to make a surface presentable.**
- [ ] Step 5: Run `bun test packages/protocol` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit the listed files with message: `feat(protocol): define dated capability records with explicit staleness rules`
- [ ] Step 8: Stop for the M15 review checkpoint.

#### Task 36: Persist capability records under the validated storage root

**Requirement coverage:**
- §5.1 (`capability/<surface>/<timestamp>-<binary-hash-prefix>.json`; capability paths use normalized surface identifiers and cannot be selected by untrusted display names)
- §5.5 (machine-readable capability records live under `<storage-root>/capability/<surface>/`; the runtime never writes into the governed repository)
- §9.6 (capability records are never deleted by startup rollback)

**Files:**
- Create: `packages/storage/src/capability-store.ts`
- Modify: `packages/storage/src/index.ts`
- Test: `packages/storage/test/capability-store.test.ts`

**Interfaces:**
- Consumes: `validateStorageRoot`, `CapabilityRecordV1`, `capabilityRecordFilename`, `parseSurfaceId`.
- Produces:
  ```ts
  export function writeCapabilityRecord(root: string, record: CapabilityRecordV1): string;    // returns absolute path
  export function readCapabilityRecords(root: string, surface: SurfaceId): readonly CapabilityRecordV1[];
  export function latestFreshRecord(root: string, surface: SurfaceId, now: string, observed: ObservedSurfaceFacts): CapabilityRecordV1 | null;
  ```

**Preconditions:**
- Task 35 committed.

- [ ] Step 1: Write the named failing test — add `test("a record is written under capability/<surface>/ with mode 0700 directories and 0600 file")`; `test("a surface id containing a path separator is rejected before path construction")` asserting `writeCapabilityRecord` throws for `"a/../../b"`; `test("capability records survive session rollback")` calling `rollbackSessionStorage` with `sessionOpenDurable: false` and asserting the record file still exists; `test("a failing record is persisted, not discarded")`; `test("the runtime never writes into the repository")` asserting the returned path does not start with the repository root; `test("equal evaluated_at values select deterministically by descending canonical filename")`; `test("an existing canonical filename is rejected (exclusive-create collision)")` asserting `writeCapabilityRecord` fails closed without overwriting.
- [ ] Step 2: Run `bun test packages/storage/test/capability-store.test.ts -t "a record is written under capability/<surface>/ with mode 0700 directories and 0600 file"` — expected RED: `Cannot find module "../src/capability-store"`.
- [ ] Step 3: Implement the minimum authorized behavior — implement the three functions; validate the surface ID through `parseSurfaceId` before any path join; create directories `0700` and files `0600` with exclusive creation (fail closed on an existing canonical filename, no overwrite, no check-then-write race); select among equal `evaluated_at` values by descending canonical-filename lexical order.
- [ ] Step 4: Run `bun test packages/storage/test/capability-store.test.ts` — expected GREEN: 7 pass. Invariant established: **evidence is preserved unconditionally and its path is never attacker-chosen.**
- [ ] Step 5: Run `bun test packages/storage packages/protocol` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm no deletion path exists in the capability store.
- [ ] Step 7: Commit the listed files with message: `feat(storage): persist capability records under the validated root`
- [ ] Step 8: Stop for the M15 review checkpoint.

---

### Milestone M16 — Per-adapter environment allowlists and secret redaction

> **`PLAN-OPEN-2` blocks Task 37’s allowlist contents.**

#### Task 37: Build the single allowlisted-environment producer

**Requirement coverage:**
- §5.4 (each adapter’s versioned configuration lives only in the Founder-approved registration; an exact child-environment allowlist reference; which allowed variables are `secret: true`; identity probes, auth-readiness probes, PTY hosts, and governed children receive the same exact allowlisted environment; forwarding is not custody)
- §9.12 (the enforceable claim: secret-marked values are forwarded only to their authorized host and child; runtime code does not intentionally log, persist, or export their values; tests may not claim application code is physically incapable of reading its own process environment)

**Files:**
- Create: `packages/supervisor/package.json`
- Create: `packages/supervisor/src/environment.ts`
- Create: `packages/supervisor/src/index.ts`
- Modify: `tsconfig.json`
- Test: `packages/supervisor/test/environment.test.ts`

**Interfaces:**
- Consumes: `ADAPTER_REGISTRY`, `AdapterRegistrationV1.environment_allowlist_ref`.
- Produces:
  ```ts
  export interface EnvironmentAllowlistV1 {
    readonly ref: string;
    readonly variables: readonly { readonly name: string; readonly secret: boolean; readonly required: boolean }[];
  }
  export function buildAllowlistedEnvironment(registration: AdapterRegistrationV1, ambient: NodeJS.ProcessEnv): Readonly<Record<string, string>>; // throws MissingRequiredVariableError
  export function redact(text: string, environment: Readonly<Record<string, string>>, registration: AdapterRegistrationV1): { readonly text: string; readonly rulesApplied: readonly string[] };
  ```

**Preconditions:**
- M15 reviewed. **`PLAN-OPEN-2` ruling received in writing.**

- [ ] Step 1: Write the named failing test — add `test("no ambient variable outside the allowlist survives")` seeding `ambient` with `MADV_SECRET_LEAK=1` and asserting the result has no such key; `test("a missing required allowlisted variable is a typed failure")`; `test("secret-marked values are redacted from diagnostics while their names are retained")`; `test("redaction reports which rules ran")`; `test("the same registration produces byte-identical environments on repeated calls")`.
- [ ] Step 2: Run `bun test packages/supervisor/test/environment.test.ts` — expected RED: `Cannot find module "../src/environment"` (the package does not exist).
- [ ] Step 3: Implement the minimum authorized behavior — create the package manifest, `environment.ts`, `index.ts`, and the `@madventures/supervisor` `paths` entry; implement the two functions with the Founder-ratified allowlists.
- [ ] Step 4: Run `bun test packages/supervisor/test/environment.test.ts` — expected GREEN: 5 pass. Invariant established: **exactly one function produces the environment every governed process sees, and secret values never enter diagnostic text.**
- [ ] Step 5: Run `bun test` (full) and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm no test asserts that code cannot read `process.env`.
- [ ] Step 7: Commit the listed files with message: `feat(supervisor): build allowlisted environments with secret redaction`
- [ ] Step 8: Stop for the M16 review checkpoint.

---

### Milestone M17 — `Bun.Terminal` PTY spike (dual-host gate)

#### Task 38: Build the spike primitive covering every §3.6 criterion

> **Completion lane AUTHORIZED 2026-08-21 (Founder).** Steps 1–4 landed at
> `df8c920`. Steps 5 and 8 were open; the Founder authorized completing them on
> both Macs, scoped exactly as follows and no wider:
>
> - **A dedicated detached worktree per host** at the candidate SHA. The
>   existing checkout is not detached, stashed, or cleaned — an earlier draft of
>   the lane said to stash untracked `.claude*` files and move the working
>   checkout, which risked user files the lane has no business handling.
> - **`bun install --frozen-lockfile`, and the network access it requires**,
>   named explicitly because a fresh worktree carries no `node_modules` and an
>   unnamed automatic install would resolve versions nobody authorized. Both
>   `git status --porcelain` and `git diff -- bun.lock package.json` must come
>   back empty afterwards; a change to either means the tested tree is no longer
>   the candidate.
> - Dual-host spike run, full suite, and `bunx tsc --noEmit` on both hosts.
> - **A hard stop at the Step 8 M17 checkpoint. Nothing from Task 39.**
>
> `bun --version` must match across hosts. The Bun executable **hash** must not
> be compared across hosts — the Intel and Apple Silicon binaries are different
> builds and hash differently at the same version, so each host records its own
> as an identity field rather than as an equality check.

> **M17 Step-8 checkpoint evidence verified PASS — 2026-08-22** (Founder-
> submitted dual-host evidence; verification and filing per the Founder's
> 2026-08-22 direction). Corrected candidate
> `56435bfe61978abed2cbcdb9b6c4e52550dc222d` ran three consecutive
> full-suite runs on each Founder Mac — Apple Silicon MacBook (arm64,
> macOS 26.6.1) and Intel iMac (x86_64, macOS 13.7.8), Bun 1.3.14 on
> both — with all thirteen §3.6 criteria passing in all six runs,
> `761 pass / 0 fail` each, and the corrected `exact_binary_io`
> evaluator passing under the Step-8 ruling (write-return short counts
> are telemetry only; eventual length and byte equality exact; the
> drain callback neither required nor relied upon on Bun 1.3.14). Host
> evidence records, each carrying its source-transcript filename and
> SHA-256: `docs/verification/2026-08-22-m17-step8-dualhost-macbook.md`
> and `docs/verification/2026-08-22-m17-step8-dualhost-imac.md`.
> Status, in the Founder's 2026-08-22 status-language correction
> vocabulary:
>
> - M17 Step 8 validation: **PASS**
> - Task 39 unlock precondition: **SATISFIED** ("the same candidate has
>   run on both Founder Macs", at this candidate)
> - Task 39 execution: **COMPLETE** (2026-08-22, executed Steps 1–8 in
>   plan order under the Founder's same-day authorization)
> - Task 39 §6.5 host reports: **FILED** — host-authored, filed
>   byte-identically at their reserved paths (commit
>   `test(phase3a): assert dual-host spike reports, and publish them`)
> - **M17: PASSED on both hosts** at candidate
>   `56435bfe61978abed2cbcdb9b6c4e52550dc222d`
>
> **Task 39 execution record (2026-08-22).** Step 1 test written; Step 2
> RED observed (ENOENT, no spike output). Step 3 ran on each Founder Mac
> in a fresh detached worktree at the candidate: three consecutive
> passing `bun test test/phase3a` runs per host — 29 pass / 0 fail /
> 161 expect() each, all thirteen §3.6 criteria passing in every run —
> with `bunx tsc --noEmit` silent and every `git status --porcelain`
> and `git diff -- bun.lock package.json` capture empty (pinned by the
> empty-input SHA-256 in each report's evidence list). Reports were
> generated and checksummed on their own hosts from that host's retained
> evidence. Step 4 GREEN (1 pass); Step 5 green on the aggregator
> (30 pass / 0 fail incl. the report test; tsc clean; the spike also
> passed 13/13 on the aggregator's linux/x64 container — an
> environmental observation, not host evidence). Step 6 admission gate,
> per report, all four conditions PASS: exact authorized candidate SHA;
> internal checksum recomputed (`macbook`
> `5f22615409a0c878c077360502effbcce59904cdef376e894a14085de344bb04`,
> `imac`
> `480b0f96f7bddf4b2a8272774a44a23e3bb11f97521d16f72fa21744836d10de`);
> §6.5 field groups present and conforming; host origination verified —
> each transcript's on-host generator output prints the whole-file
> SHA-256 that the filed bytes still hash to (`macbook`
> `7722932a9d158ef25293dbac89da3c3aa039a571be100fe938a682c149182916`,
> `imac`
> `7d09d3dbd35f4a55ec74702c63a6258fca079c75bb4fa93b4c5e55c56e449e95`),
> and every report criteria line appears verbatim in its transcript.
> Source transcripts retained as submitted evidence, not committed:
> `MACBOOKTASK39.txt` SHA-256
> `c35aba184759386534a5594293345595cfb6e5d0cbef9c19eb8466398f56c31b`,
> `IMACTASK39.txt` SHA-256
> `f177151a1b20fda3befa4b5e72b6454112f34b33a13d692a8581f9ff872653c7`.
> Aggregation base check run plan-verbatim: PASS, base contains
> `138463b`. This record authorizes nothing further: no production
> adapter, PR, merge, release, Bun upgrade, unrelated correction, or
> later milestone.

**Requirement coverage:**
- §3.6 (the thirteen spike demonstrations; timing measured against the §9.8 table; reports record observed values rather than merely saying “pass”)
- §9.7 (the pre-written candidate is `Bun.Terminal`; FFI `posix_openpt`, `node-pty`, another native dependency, or a pipe fallback is not an implementation choice)
- §9.8 (the sole normative deadline table; monotonic clock)

**Files:**
- Create: `test/phase3a/spike/bun-terminal-spike.ts`
- Test: `test/phase3a/spike/bun-terminal-spike.test.ts`

**Interfaces:**
- Consumes: `Bun.Terminal`, `process.kill`, `performance.now()`.
- Produces:
  ```ts
  // Exactly the thirteen §3.6 demonstrations, one member per specification bullet.
  // The specification's bullet list is the authoritative count; four bullets carry
  // multiple sub-assertions, which are asserted and reported individually inside
  // their member's `subAssertions` map without changing the criterion count.
  export type SpikeCriterion =
    | "pty_tty_allocation"              // PTY/TTY allocation
    | "exact_binary_io"                 // exact binary input and output
    | "resize_propagation"              // resize propagation
    | "process_group_and_signals"       // process-group creation AND signal delivery
    | "child_and_grandchild_termination"// child AND grandchild termination
    | "two_ptys_plus_adapter_no_leak"   // two PTYs plus an adapter without write-end leakage
    | "supervisor_exit_modes"           // supervisor clean exit, crash, signal, AND SIGKILL
    | "lifeline_eof"                    // deliberate lifeline EOF
    | "pty_host_death"                  // PTY-host death
    | "sigstop_wedged_direct_pgid"      // host wedged with SIGSTOP, cleared via direct PGID
    | "child_ignores_sigterm"           // a child that ignores SIGTERM
    | "clean_exit_reporting"            // clean exit reporting
    | "measured_timing";                // measured timing against the §9.8 deadlines
  export const SPIKE_CRITERIA: readonly SpikeCriterion[]; // length === 13
  export interface SpikeResult {
    readonly criterion: SpikeCriterion;
    readonly pass: boolean;
    readonly observedMs: number;
    readonly detail: string;
    /** Individually asserted and individually reported sub-assertions for the four
     *  compound §3.6 bullets. A criterion passes only when every entry is true. */
    readonly subAssertions: Readonly<Record<string, boolean>>;
  }
  export async function runSpike(): Promise<readonly SpikeResult[]>;
  export const DEADLINES_MS: { readonly ack: 250; readonly escalation: 500; readonly responsiveChildGrace: 2000; readonly outerBound: 5000 };
  ```

**Preconditions:**
- **M1 reviewed only.** The spike is a standalone `Bun.Terminal` capability probe: it constructs no envelope, registry, storage root, or allowlisted environment, so it depends on nothing from M2–M16 and matches the M17 row of the §4 milestone table. This is deliberate — the spike is the one gate that can stop the phase outright, so it must be reachable on day one rather than after thirty-seven tasks of investment.
- This task must run on **both** Founder Macs before M18 begins.

- [ ] Step 1: Write the named failing test — in `test/phase3a/spike/bun-terminal-spike.test.ts` add `test("the spike covers exactly the thirteen specification demonstrations")` asserting `SPIKE_CRITERIA.length === 13` and that `runSpike()` returns one result per member with a finite `observedMs`; `test("every compound criterion reports each sub-assertion individually")` asserting the four compound members carry a non-empty `subAssertions` map and that a criterion is `pass: true` only when every entry is true; `test("host acknowledgement is within 250 ms")`; `test("all governed processes are gone within 5000 ms")`; `test("a SIGSTOP-wedged host earns no child grace")` asserting the observed escalation start is ≤ 500 ms and no 2000 ms grace elapsed; `test("two PTYs plus an adapter leak no write end")`.
- [ ] Step 2: Run `bun test test/phase3a/spike/bun-terminal-spike.test.ts` — expected RED: `Cannot find module "./bun-terminal-spike"`.
- [ ] Step 3: Implement the minimum authorized behavior — implement `runSpike` using `Bun.Terminal` only, measuring every duration with `performance.now()`. If any criterion cannot be implemented with `Bun.Terminal`, **stop and escalate under §10** — do not substitute an FFI, native, or pipe path.
- [ ] Step 4: Run `bun test test/phase3a/spike/bun-terminal-spike.test.ts` — expected GREEN: 6 pass with all **thirteen** criteria reporting `pass: true` and every sub-assertion true. Invariant established: **`Bun.Terminal` demonstrably satisfies every containment and timing requirement the production host will rely on.**
- [ ] Step 5: Run the same command on the second Founder Mac; run `bun test` (full) and `bunx tsc --noEmit` on both.
- [ ] Step 6: Inspect the diff; confirm no production file changed and no dependency was added.
- [ ] Step 7: Commit the listed files with message: `test(phase3a): add the dual-host Bun.Terminal capability spike`
- [ ] Step 8: Stop for the M17 review checkpoint.

#### Task 39: Publish the two checksummed spike reports

**Requirement coverage:**
- §3.6 (the same reviewed spike commit must pass on both hosts; reports record observed values)
- §6.5 (each signed-off report records the candidate SHA and branch, clean/dirty worktree state and exact changed files, Bun path/version/hash, architecture, macOS version/build, `TERM`, shell, exact commands and complete counts, each criterion and measured timing, failures/retries/warnings/residual risks, and the report checksum)

**Files:**
- Create: `docs/verification/2026-08-12-bun-terminal-spike-imac.md`
- Create: `docs/verification/2026-08-12-bun-terminal-spike-macbook.md`
- Test: `test/phase3a/spike/bun-terminal-spike-reports.test.ts`

> **Amended 2026-08-21 (Founder ruling, Option A).** Step 1 has always required
> a report-existence test, but this list did not permit a Task 39 test file and
> Step 6 required a documents-only diff. The task was therefore impossible to
> satisfy as written: any commit containing Step 1's test would fail Step 6,
> and an operator reaching that step had to choose which ratified step to
> disobey. Three places are amended together — this list, Step 6, and Step 7's
> commit message. Amending Step 6 alone would have left the contradiction alive
> in the other two.
>
> **Isolation correction 2026-08-21.** The Task 39 assertion lives in the
> dedicated `bun-terminal-spike-reports.test.ts`, which reads report files only
> and must not import `./bun-terminal-spike` or invoke `runSpike()`. Task 38's
> `bun-terminal-spike.test.ts` executes `await runSpike()` at module scope, and
> Bun evaluates that module before applying `-t`; putting the report assertion
> there would run the full host spike on the aggregator before report
> validation. This separation changes no report requirement or host-run ruling.

**Interfaces:**
- Consumes: the `SpikeResult[]` output of Task 38.
- Produces: two Markdown reports with identical section structure and a trailing `Report SHA-256: <hex>` line computed over the report body excluding that line.

**Preconditions:**
- Task 38 committed and run on both hosts at the same SHA.
- Task 38 has passed its M17 review checkpoint (Step 8) with Founder sign-off.

> **Aggregation base, ruled 2026-08-21 (Founder).** The host worktrees are
> detached at the candidate SHA and cannot host this commit — a commit made
> there would not descend from merged `main`. The aggregator therefore fetches
> and branches from **`origin/main` as freshly verified at commit time**, and
> confirms the base descends from the merge commit that landed the candidate
> before committing anything:
>
> ```bash
> git fetch origin
> git worktree add ~/m17-task39 -b <task-39-branch> origin/main
> cd ~/m17-task39
> if git merge-base --is-ancestor 138463b HEAD; then
>   printf '%s\n' 'PASS: aggregation base contains candidate merge commit 138463b'
> else
>   printf '%s\n' 'ERROR: aggregation base does not contain candidate merge commit 138463b' >&2
>   exit 1
> fi
> ```
>
> Fresh `origin/main` rather than a pinned base, so the branch picks up anything
> merged in the meantime and does not need a catch-up merge before it can land.
> The exact base SHA is recorded in the resulting PR rather than fixed here.
>
> **The reports still cite the candidate SHA as the tested commit**, and that is
> not a contradiction: `Candidate SHA:` records what was *executed*, the branch
> base records where the evidence is *filed*. Conflating the two is what forced
> the reports toward a detached worktree in the first place.

> **Aggregation admission gate, ruled 2026-08-21 (Founder). Fail-closed.**
> Before either host report may be filed as valid evidence, the aggregator must
> **independently** verify all four:
>
> 1. **`Candidate SHA:` exactly matches the authorized candidate revision.**
>    (Recorded for this lane at Task 38's completion-lane authorization above.)
> 2. **The report checksum recomputes to its declared SHA-256.**
> 3. **Every required §6.5 report field group is present and conforms to the
>    report contract.**
> 4. **The report is host-originated.** The aggregator may validate and file it,
>    but **must not edit, complete, normalize, or substitute it.**
>
> A report failing any check is **`NOT_FILEABLE`**. Preserve it unchanged as
> rejected evidence and record the failed condition **outside the report**, in
> the Task 39 PR description or a review note that identifies the report and
> failed gate. Do not annotate the host-authored report itself. It **does not
> satisfy Task 39** and **cannot be repaired by inference or aggregation**. See
> stop condition 18.
>
> **Scope of this ruling, as issued:** it adds no new host run, changes no
> candidate, and grants no implementation or merge authority.
>
> This closes the gap a review raised against the previous revision: the earlier
> text said the aggregator must not rewrite a host report, but never said what
> the aggregator must *check* before filing one. "Must not rewrite" alone
> protects the integrity of a report nobody validated.

- [ ] Step 1: Write the named failing test — create `test/phase3a/spike/bun-terminal-spike-reports.test.ts` with `test("both dual-host spike reports exist, name the same SHA, and carry a checksum")` reading both files, asserting each contains `Candidate SHA:` with the same value and a `Report SHA-256:` line, and that the two `Architecture:` values are `x86_64` and `arm64`. The file may import test and filesystem/checksum utilities only; it must not import `./bun-terminal-spike` or invoke `runSpike()`.
- [ ] Step 2: Run `bun test test/phase3a/spike/bun-terminal-spike-reports.test.ts -t "both dual-host spike reports exist, name the same SHA, and carry a checksum"` — expected RED: neither report file exists (`ENOENT`), with no spike process started and no `[spike]` output.
- [ ] Step 3: Implement the minimum authorized behavior — run the spike on each host and write the two reports with the §6.5 fields and observed timings. Do not write a report for a host you did not run.

> **Disposition 2026-08-21 (Founder ruling): Step 3 requires its own host runs.**
> The question raised was whether the Task 38 runs could satisfy this step,
> which would have saved two spike runs. Ruled: they do not. Task 39 runs the
> spike on each host and reports **those** observations, so each report carries
> its own observed values rather than restating Task 38's. This is the literal
> reading of the step, and the cost — two additional runs — is accepted.
>
> **Authorship, and what a checksum establishes.** Each host-bound operator
> authors and checksums its own report on the host it ran. A later aggregator
> may verify and commit both, but must not rewrite either: a checksum
> recomputed by someone who did not run the host establishes nothing about the
> run. Note that a `Report SHA-256:` line proves **byte integrity only** — it
> carries no evidence of operator identity, so "signed" overstates what the
> lane produces unless a signing mechanism is introduced.
>
> **Renamed accordingly (Founder direction, 2026-08-21).** This task and its §4
> row now read "checksummed", not "signed". Quotations of spec §§3.6 and 6.5
> elsewhere in this plan still read "signed-off" and are deliberately left
> verbatim: the specification's wording is not this plan's to edit, and
> silently restating an approved document in different words would be the
> larger error. Where the two differ, the specification governs and this plan
> describes only what the lane actually produces.
- [ ] Step 4: Run the same command — expected GREEN: 1 pass. Invariant established: **cross-host certification is evidenced by two independent reports at one SHA, never inferred from one machine.**
- [ ] Step 5: Run `bun test test/phase3a` and `bunx tsc --noEmit`.
- [ ] Step 6: Run the **aggregation admission gate** above against each host report — candidate SHA, checksum recomputation, §6.5 field-group conformance, host origination — and record the outcome per report. Any `NOT_FILEABLE` report halts the task under stop condition 18; do not proceed to Step 7. Then inspect the diff; confirm only the two reports and `test/phase3a/spike/bun-terminal-spike-reports.test.ts` changed. *(Admission gate added 2026-08-21, Founder ruling. File list amended 2026-08-21, Founder ruling — Option A; previously "only the two documents changed", which Step 1 makes impossible.)*
- [ ] Step 7: Commit the two reports and the report-validation test with message: `test(phase3a): assert dual-host spike reports, and publish them` *(Amended 2026-08-21, Founder ruling — Option A. Previously `docs(verification): publish dual-host Bun.Terminal spike reports`, which described a documents-only commit this task does not produce.)*
- [ ] Step 8: Stop for the M17 gate review. **If either report fails any criterion, M18–M19, M21, and M23 do not begin.**

---

### Milestone M18 — `madv-pty-host` framing and closed operation set

#### Task 40: Implement the private frame codec

**Requirement coverage:**
- §3.2 (framing distinguishes broker commands from child-input byte frames; raw passthrough is prohibited; host stdout carries framed launch facts, exact PTY output bytes, and exit facts)
- §6.1 (PTY-host frame parsing; malformed or unknown command frames fail closed)
- §4.1 (the PTY-host frame protocol is private infrastructure and is not the future public daemon protocol)

**Files:**
- Create: `packages/pty-host/package.json`
- Create: `packages/pty-host/src/frames.ts`
- Create: `packages/broker/src/pty-host-protocol.ts`
- Modify: `tsconfig.json`
- Test: `packages/pty-host/test/frames.test.ts`
- Test: `packages/broker/test/pty-host-protocol.test.ts`

**Interfaces:**
- Consumes: nothing (no application imports permitted on the host side).
- Produces:
  ```ts
  export type HostCommandFrame =
    | { readonly kind: "launch"; readonly path: string; readonly sha256: string; readonly argv: readonly string[]; readonly env: Readonly<Record<string, string>>; readonly executionId: string }
    | { readonly kind: "input"; readonly bytes: Uint8Array }
    | { readonly kind: "resize"; readonly cols: number; readonly rows: number }
    | { readonly kind: "terminate" };
  export type HostFactFrame =
    | { readonly kind: "launched"; readonly hostPid: number; readonly childPid: number; readonly pgid: number; readonly executionId: string }
    | { readonly kind: "ready" }
    | { readonly kind: "ack"; readonly ofKind: HostCommandFrame["kind"] }
    | { readonly kind: "output"; readonly bytes: Uint8Array }
    | { readonly kind: "termination_started" }
    | { readonly kind: "drained" }
    | { readonly kind: "exited"; readonly code: number | null; readonly signal: string | null };
  export function encodeCommand(f: HostCommandFrame): Uint8Array;
  export function decodeCommand(buf: Uint8Array): { readonly frame: HostCommandFrame; readonly consumed: number } | null;
  export function encodeFact(f: HostFactFrame): Uint8Array;
  export function decodeFact(buf: Uint8Array): { readonly frame: HostFactFrame; readonly consumed: number } | null;
  export class MalformedFrameError extends Error {}
  ```
  Wire format: 4-byte big-endian length, 1-byte kind tag, payload. Unknown tags and truncated or oversized frames throw `MalformedFrameError`.

**Preconditions:**
- M17 gate passed on both hosts.

- [ ] Step 1: Write the named failing test — add `test("an unknown command tag fails closed with MalformedFrameError")`; `test("a truncated length prefix returns null rather than a partial frame")`; `test("input bytes round-trip exactly, including 0x00 and 0xFF")`; `test("a raw unframed byte stream is rejected")`; `test("an oversized frame is rejected")`; and in the broker test `test("broker and host codecs agree on every frame kind")` round-tripping all eleven kinds across both modules.
- [ ] Step 2: Run `bun test packages/pty-host/test/frames.test.ts` — expected RED: `Cannot find module "../src/frames"` (the package does not exist).
- [ ] Step 3: Implement the minimum authorized behavior — create the manifest, both codec modules, and the `@madventures/pty-host` `paths` entry. The host codec imports nothing from the workspace.
- [ ] Step 4: Run both test files — expected GREEN: 6 pass. Invariant established: **command and byte streams are distinguishable, and anything unrecognized fails closed.**
- [ ] Step 5: Run `bun test packages/pty-host packages/broker` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm `packages/pty-host/src/frames.ts` has zero workspace imports.
- [ ] Step 7: Commit the listed files with message: `feat(pty-host): add the private framed command and fact codec`
- [ ] Step 8: Stop for the M18 review checkpoint.

#### Task 41: Implement `madv-pty-host` with a closed operation set and no launch authority

**Requirement coverage:**
- §3.1 (the six permitted operations; the host may not execute a replacement program, mutate the authorized environment, pass descriptors, make policy decisions, write the ledger, or write evidence; it imports no broker, ledger, adapter, TUI, policy, protocol-authority, or storage code; an import-graph architecture test enforces the boundary)
- §9.7 (`madv-pty-host` is invoked only by the supervisor; not a `madbridge`/`madv-tui` subcommand; not listed in operator help; not a session-start entry point; it accepts no executable path or launch authority from ordinary command-line flags or ambient environment; it requires the inherited private control channel and one validated launch frame; direct invocation without that channel fails before PTY or child creation)

**Files:**
- Create: `packages/pty-host/src/main.ts`
- Create: `packages/pty-host/src/terminal.ts`
- Test: `packages/pty-host/test/main-guard.test.ts`
- Test: `test/phase3a/architecture-phase3a.test.ts`

**Interfaces:**
- Consumes: `frames.ts`, `Bun.Terminal`.
- Produces: an executable entry that reads framed commands from inherited stdin, writes framed facts to inherited stdout, and exits non-zero with `no_control_channel` when stdin is a TTY or when the first frame is not a valid `launch`.

**Preconditions:**
- Task 40 committed.

- [ ] Step 1: Write the named failing test — add `test("direct invocation without a control channel fails before PTY creation")` spawning `bun packages/pty-host/src/main.ts --path /bin/echo` with stdin inherited from a TTY-less pipe carrying no frame, asserting non-zero exit, stderr containing `no_control_channel`, and that no child process was created; `test("a command-line executable path confers no launch authority")` asserting `--path /bin/sh` is ignored; `test("an ambient MADV_ variable confers no launch authority")`; `test("the first frame must be a launch frame")`; and in `test/phase3a/architecture-phase3a.test.ts` add `test("the pty-host package imports no application authority module")` asserting no file under `packages/pty-host/src` matches `@madventures/(broker|ledger|policy|storage|artifact-store|adapter-)` or `packages/(broker|ledger|policy|storage)`.
- [ ] Step 2: Run `bun test packages/pty-host/test/main-guard.test.ts -t "direct invocation without a control channel fails before PTY creation"` — expected RED: `Cannot find module "packages/pty-host/src/main.ts"`.
- [ ] Step 3: Implement the minimum authorized behavior — implement `main.ts` to validate the control channel first, then accept exactly one `launch` frame, then the four steady-state commands. Ignore `process.argv` beyond the program name and read no `MADV_` variable.
- [ ] Step 4: Run both test files — expected GREEN: 5 pass. Invariant established: **the host has no independent authority; without the supervisor’s channel it cannot create a PTY or a child.**
- [ ] Step 5: Run `bun test packages/pty-host test/phase3a` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm `madv-pty-host` appears in no CLI command table or help text.
- [ ] Step 7: Commit the listed files with message: `feat(pty-host): add madv-pty-host with a closed operation set and no ambient authority`
- [ ] Step 8: Stop for the M18 review checkpoint.

---

### Milestone M19 — Process-group containment, host launch facts, wedged-host escalation

#### Task 42: Implement gap-free launch with adjacent-to-`exec` re-hash

**Requirement coverage:**
- §3.3 (the eight-step fixed launch order; the child cannot exist before its death-watch; the supervisor treats host exit as governed-child death and interrupts the whole session)
- §2.1 (hash verification is per child and part of the launch path itself; no storage, broker, or lifeline step is allowed between the final verification and that child’s `exec`)
- §2.2 (the host re-hashes the same absolute path directly before `exec`)

**Files:**
- Create: `packages/pty-host/src/launch.ts`
- Modify: `packages/pty-host/src/main.ts`
- Create: `packages/broker/src/pty-host-supervisor.ts`
- Modify: `packages/broker/src/index.ts`
- Test: `packages/pty-host/test/launch.test.ts`
- Test: `packages/broker/test/pty-host-supervisor.test.ts`

**Interfaces:**
- Consumes: `HostCommandFrame`, `HostFactFrame`, `Bun.Terminal`.
- Produces:
  ```ts
  // pty-host side
  export function verifyAndLaunch(frame: Extract<HostCommandFrame, { kind: "launch" }>): { hostPid: number; childPid: number; pgid: number }; // throws ArtifactHashMismatch
  // broker side
  export function spawnPtyHost(descriptor: HostLaunchDescriptor): PtyHostHandle; // lifeline read end inherited at birth; write end close-on-exec and supervisor-owned
  export interface PtyHostHandle { readonly hostPid: number; send(f: HostCommandFrame): void; facts(): AsyncIterable<HostFactFrame>; closeStdin(): void; killPgid(): void; }
  ```

**Preconditions:**
- M18 reviewed.

- [ ] Step 1: Write the named failing test — add `test("the artifact is re-hashed immediately before exec")` replacing the binary between descriptor construction and the launch frame and asserting `ArtifactHashMismatch` with no child created; `test("no storage, broker, or lifeline call occurs between verification and exec")` asserting the ordered call trace contains exactly `hash` then `exec`; `test("launch facts report host pid, child pid, and child pgid")`; `test("the child is created after the lifeline is established")` asserting the host observes stdin EOF-readiness before spawning; `test("host exit interrupts the whole session")`.
- [ ] Step 2: Run `bun test packages/pty-host/test/launch.test.ts -t "the artifact is re-hashed immediately before exec"` — expected RED: `Cannot find module "../src/launch"`.
- [ ] Step 3: Implement the minimum authorized behavior — implement `verifyAndLaunch` with `setsid`-equivalent process-group creation via `Bun.Terminal`, hashing the absolute path immediately before spawn; implement `spawnPtyHost` inheriting the lifeline read end at birth, marking the write end close-on-exec, closing every unintended duplicate, and monitoring host exit.
- [ ] Step 4: Run both test files — expected GREEN: 5 pass. Invariant established: **the TOCTOU window is one syscall wide and no child exists outside a death-watch.**
- [ ] Step 5: Run `bun test packages/pty-host packages/broker` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit the listed files with message: `feat(pty-host): implement gap-free launch with adjacent-to-exec artifact re-hash`
- [ ] Step 8: Stop for the M19 review checkpoint.

#### Task 43: Implement the bounded termination ladder and lifeline EOF

**Requirement coverage:**
- §3.4 (normal termination ladder: typed terminate command → `SIGTERM` to the child process group → the §9.8 responsive-host child grace → `SIGKILL` to any survivor and report exit; deliberately closing one host’s stdin is a second per-child kill switch and EOF requires the host to terminate its child process group)
- §9.8 (250 ms acknowledgement; `termination_started` within 500 ms; 2 s responsive-host grace; 5 s outer bound; monotonic clock)

**Files:**
- Create: `packages/pty-host/src/signals.ts`
- Modify: `packages/pty-host/src/main.ts`
- Test: `packages/pty-host/test/signals.test.ts`

**Interfaces:**
- Consumes: `process.kill(-pgid, signal)`, `performance.now()`.
- Produces:
  ```ts
  export const HOST_DEADLINES_MS: { readonly ack: 250; readonly terminationStarted: 500; readonly responsiveChildGrace: 2000; readonly outerBound: 5000 };
  export async function terminateChildGroup(pgid: number, emit: (f: HostFactFrame) => void): Promise<{ readonly observedMs: Record<string, number> }>;
  export function onLifelineEof(pgid: number, emit: (f: HostFactFrame) => void): void;
  ```

**Preconditions:**
- Task 42 committed.

- [ ] Step 1: Write the named failing test — add `test("termination_started is emitted within 500 ms")`; `test("a child ignoring SIGTERM is SIGKILLed after the 2 s grace")` asserting observed grace ≥ 2000 ms and total ≤ 5000 ms; `test("lifeline EOF terminates the child process group without a terminate command")`; `test("all deadlines are measured on a monotonic clock")` asserting the implementation reads `performance.now()` and never `Date.now()`; `test("a grandchild in the same process group is terminated")`.
- [ ] Step 2: Run `bun test packages/pty-host/test/signals.test.ts -t "lifeline EOF terminates the child process group without a terminate command"` — expected RED: `Cannot find module "../src/signals"`.
- [ ] Step 3: Implement the minimum authorized behavior — implement the ladder and the EOF handler, signalling the negative PGID and recording every observed duration.
- [ ] Step 4: Run `bun test packages/pty-host/test/signals.test.ts` — expected GREEN: 5 pass. Invariant established: **there are two independent kill switches and both complete inside the normative deadlines.**
- [ ] Step 5: Run `bun test packages/pty-host` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm no `Date.now()` appears in the deadline path.
- [ ] Step 7: Commit the listed files with message: `feat(pty-host): implement the bounded termination ladder and lifeline EOF kill switch`
- [ ] Step 8: Stop for the M19 review checkpoint.

#### Task 44: Implement the host-bypassing direct-PGID escalation

**Requirement coverage:**
- §3.4 (a wedged host stops reading commands or EOF; launch facts must include child PID and PGID; the six-step host-bypassing path; host unresponsiveness past the deadline is host failure; the direct PGID path is mandatory and is verified by `SIGSTOP`-wedging a fixture host)
- §9.8 (if the 250 ms acknowledgement deadline expires, the supervisor closes host stdin and starts the escalation ladder; direct PGID kill and host kill must be initiated no later than 500 ms after the original command; an unresponsive or `SIGSTOP` host does not earn an additional grace period)
- §6.4.10 (Layer 4 `SIGSTOP` scenario asserts the no-grace path)

**Files:**
- Modify: `packages/broker/src/pty-host-supervisor.ts`
- Test: `packages/broker/test/pty-host-supervisor.test.ts`

**Interfaces:**
- Consumes: `PtyHostHandle`, `HOST_DEADLINES_MS`.
- Produces: `escalateWedgedHost(handle: PtyHostHandle, pgid: number, hostPid: number): Promise<{ readonly observedMs: Record<string, number> }>` executing exactly: send terminate → close host stdin → wait the bounded host-response deadline → `SIGKILL` the reported child PGID → `SIGKILL` the host → interrupt the whole session.

**Preconditions:**
- Task 43 committed.

- [ ] Step 1: Write the named failing test — add `test("a SIGSTOPped host is bypassed via the reported child PGID")` `SIGSTOP`-ing a fixture host and asserting the child dies; `test("a wedged host earns no 2 s child grace")` asserting the observed interval between the terminate command and the direct `SIGKILL` is ≤ 500 ms; `test("escalation kills the host after the child group")` asserting the ordered signal trace; `test("host unresponsiveness is recorded as pty_host_failure")` asserting the interruption reason code; `test("every governed process is gone within 5000 ms")`.
- [ ] Step 2: Run `bun test packages/broker/test/pty-host-supervisor.test.ts -t "a wedged host earns no 2 s child grace"` — expected RED: `escalateWedgedHost is not a function`.
- [ ] Step 3: Implement the minimum authorized behavior — implement the six ordered steps with monotonic timing; do not apply the responsive-host grace on this path.
- [ ] Step 4: Run `bun test packages/broker/test/pty-host-supervisor.test.ts` — expected GREEN: 10 pass. Invariant established: **a wedged host cannot keep a governed child alive, and it earns no extra time by being unresponsive.**
- [ ] Step 5: Run `bun test packages/broker packages/pty-host` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit the listed files with message: `feat(broker): add the mandatory host-bypassing direct-PGID escalation path`
- [ ] Step 8: Stop for the M19 review checkpoint.

---

### Milestone M20 — Foreground supervisor pure preflight

#### Task 45: Implement the nine pure-preflight steps

**Requirement coverage:**
- §2.1 (the nine pure-preflight steps in order; preflight creates nothing in governed storage, the repository, ledger, or session state; every probe runs under the exact same per-adapter allowlisted environment the PTY host and governed child will receive; probe environment must equal launch environment; no attestation result is reusable across sessions)
- §2.2 (passing and failing evidence; the residual is documented, not solved)
- §9.13 (a surface without a machine-verifiable primitive for the actual session is ineligible for a live pair; at the Phase 3A baseline the existing Antigravity adapter fails closed)

**Files:**
- Create: `packages/supervisor/src/preflight.ts`
- Create: `packages/supervisor/src/attestation.ts`
- Modify: `packages/supervisor/src/index.ts`
- Test: `packages/supervisor/test/preflight.test.ts`
- Test: `packages/supervisor/test/attestation.test.ts`

**Interfaces:**
- Consumes: `parseTaskEnvelope`, `assertActiveSurfaceCardinality`, `evaluatePairEligibility`, `latestFreshRecord`, `proposeStorageRoot`, `validateStorageRoot`, `buildAllowlistedEnvironment`, `ADAPTER_REGISTRY`.
- Produces:
  ```ts
  export type PreflightFailure =
    | "envelope_invalid" | "cardinality" | "repository_fingerprint" | "executable_unresolved"
    | "identity_mismatch" | "auth_not_ready" | "pair_ineligible" | "storage_root_invalid"
    | "host_capability_missing" | "capability_record_stale" | "home_mismatch";
  export interface PreflightOk { readonly ok: true; readonly plan: LaunchPlan }
  export function runPurePreflight(input: PreflightInput): PreflightOk | { readonly ok: false; readonly failure: PreflightFailure; readonly detail: string };
  ```

**Preconditions:**
- M16 and M19 reviewed.

- [ ] Step 1: Write the named failing test — add one test per failure code named `test("preflight fails with <failure code>")` (11 tests); plus `test("preflight creates nothing")` snapshotting the storage root, repository, and `os.tmpdir()` before and after and asserting byte-identical listings; `test("probe environment equals launch environment")` asserting the environment recorded during probing is deeply equal to `plan.environment`; `test("a cached attestation is not reused across sessions")` asserting two consecutive preflights each invoke the probe; `test("a surface without an actual-session identity primitive is ineligible")`; `test("missing TERM fails preflight as auth_not_ready")`; `test("missing TMPDIR fails preflight as auth_not_ready")`; `test("a caught MissingRequiredVariableError maps to auth_not_ready")`; `test("the auth probe enforces the 5,000 ms execution deadline")`; `test("the auth probe escalates SIGTERM to SIGKILL within the forced-cleanup budget")`; `test("the auth probe reaps the child successfully")`; `test("cleanup-budget exhaustion fails closed as auth_not_ready")`.
- [ ] Step 2: Run `bun test packages/supervisor/test/preflight.test.ts -t "preflight creates nothing"` — expected RED: `Cannot find module "../src/preflight"`.
- [ ] Step 3: Implement the minimum authorized behavior — implement the nine steps in specification order, returning at the first failure; validate every environment-independent ambient and configuration input (installation UID and passwd home, `HOME`, `CLAUDE_CONFIG_DIR`, `PATH`, `SHELL`, `TERM`, `TMPDIR`, effective settings sources, and absence of `apiKeyHelper` and `--settings`) before calling `buildAllowlistedEnvironment`, and catch a `MissingRequiredVariableError` as a fail-closed `auth_not_ready` fallback; hash executables with `Bun.CryptoHasher`; construct the allowlisted environment exactly once; after construction, run the identity probe and the auth-readiness probe using that exact constructed environment, reuse that same environment object byte-for-byte across the identity probe, auth probe, PTY host, and governed child, and permit no governed launch until both probes succeed, preserving `identity_mismatch` for identity-probe failure and `auth_not_ready` for auth-readiness failure; enforce the auth-probe execution deadline (`5_000` ms), the forced-cleanup budget (at most `1_000` additional ms: `SIGTERM` grace of no more than the first `500` ms, then `SIGKILL` with no more than the remaining `500` ms to observe and reap termination), and the `6_000` ms maximum total elapsed time, failing closed as `auth_not_ready` on cleanup or reaping failure and never launching after cleanup-budget exhaustion.
- [ ] Step 4: Run `bun test packages/supervisor/test/preflight.test.ts` — expected GREEN: 22 pass. Invariant established: **preflight is a pure function of the environment; a failed start leaves no trace.**
- [ ] Step 5: Run `bun test packages/supervisor` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm no `mkdirSync`, `writeFileSync`, or `new Ledger(` appears in `preflight.ts`.
- [ ] Step 7: Commit the listed files with message: `feat(supervisor): implement pure preflight with no governed side effects`
- [ ] Step 8: Stop for the M20 review checkpoint.

---

### Milestone M21 — Transactional build and rollback

#### Task 46: Implement the ten-step transactional build

**Requirement coverage:**
- §2.1 (the ten build steps in order; the first `active` snapshot only after both records are durable; step 10 is Phase 3B only)
- §9.5 (startup appends exactly `fencing_token_issued` value `1`, then `session_activated`)

**Files:**
- Create: `packages/supervisor/src/build.ts`
- Modify: `packages/supervisor/src/index.ts`
- Test: `packages/supervisor/test/build-rollback.test.ts`

**Interfaces:**
- Consumes: `LaunchPlan`, `createSessionStorage`, `Ledger`, `RuntimeBroker`, `createInProcessBrokerClient`, `spawnPtyHost`.
- Produces:
  ```ts
  export const BUILD_STEPS: readonly ["storage", "ledger_open", "session_open", "broker", "client", "lifelines", "hosts", "children", "reattest", "adapters", "issue_token", "activate"];
  export async function runTransactionalBuild(plan: LaunchPlan, injectFailureAt?: typeof BUILD_STEPS[number]): Promise<BuildResult>;
  ```
  No TUI step exists in Phase 3A.

**Preconditions:**
- M20 reviewed.

- [ ] Step 1: Write the named failing test — add `test("the build executes the twelve steps in the specified order")` asserting the recorded trace; `test("no active snapshot is exposed before both startup records are durable")`; `test("the build exposes no TUI step in Phase 3A")` asserting `BUILD_STEPS` contains no `"tui"` member; `test("re-attestation failure before activation prevents any active snapshot")`.
- [ ] Step 2: Run `bun test packages/supervisor/test/build-rollback.test.ts -t "the build executes the twelve steps in the specified order"` — expected RED: `Cannot find module "../src/build"`.
- [ ] Step 3: Implement the minimum authorized behavior — implement the ordered build, appending `session_open` immediately after opening the ledger and issuing the token only after every host, child, attestation, and adapter is ready.
- [ ] Step 4: Run `bun test packages/supervisor/test/build-rollback.test.ts` — expected GREEN: 4 pass. Invariant established: **activation is the last durable act of startup, not the first.**
- [ ] Step 5: Run `bun test packages/supervisor packages/broker` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit the listed files with message: `feat(supervisor): implement the ordered transactional build`
- [ ] Step 8: Stop for the M21 review checkpoint.

#### Task 47: Implement mandatory rollback after every build step

**Requirement coverage:**
- §2.1 (any build failure triggers mandatory rollback through the same containment machinery used for live interruption; every host, child, descendant process group, adapter, broker subscription, and open resource already created is closed; if a session-open ledger record exists, the broker appends a typed abort record before closing whenever durable writing remains possible; no partial session persists)
- §6.3 (every build step has a deterministic injected-failure point; tests assert both the typed result and the absence of residual processes, descriptors, open session records, or live fencing tokens)
- §9.6 (`session_open` is the durable rollback boundary; capability records are never deleted by startup rollback)

**Files:**
- Modify: `packages/supervisor/src/build.ts`
- Test: `packages/supervisor/test/build-rollback.test.ts`

**Interfaces:**
- Consumes: `rollbackSessionStorage`, `escalateWedgedHost`, `invalidateToken`, `RuntimeBroker`.
- Produces: `rollbackBuild(state: PartialBuildState): Promise<RollbackOutcome>` where `RollbackOutcome` records `{ hostsKilled, childrenKilled, descriptorsClosed, sessionDirRemoved, abortAppended }`.

**Preconditions:**
- Task 46 committed.

- [ ] Step 1: Write the named failing test — add one test per build step named `test("rollback after step <step> leaves no partial session")` (12 tests), each asserting a typed failure result, zero surviving child or host processes, zero open descriptors beyond the baseline, no live fencing token, and — for steps at or after `session_open` — exactly one `session_abort` record; plus `test("rollback before session_open removes the session directory")`; `test("rollback never deletes a capability record")`; `test("rollback uses the same containment path as live interruption")` asserting the same `escalateWedgedHost`/termination-ladder call sites are exercised.
- [ ] Step 2: Run `bun test packages/supervisor/test/build-rollback.test.ts -t "rollback after step hosts leaves no partial session"` — expected RED: `rollbackBuild is not a function`; the injected failure leaves the spawned fixture host alive.
- [ ] Step 3: Implement the minimum authorized behavior — implement `rollbackBuild` unwinding in reverse creation order and reusing the interruption containment path; append `fencing_token_invalidated` then `session_abort` when a token was issued and `session_open` is durable.
- [ ] Step 4: Run `bun test packages/supervisor/test/build-rollback.test.ts` — expected GREEN: 19 pass. Invariant established: **there is no build step whose failure can leave a governed process, descriptor, open session record, or valid token behind.**
- [ ] Step 5: Run `bun test packages/supervisor packages/broker packages/storage` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm the rollback removal target is prefix-checked against `root/sessions/`.
- [ ] Step 7: Commit the listed files with message: `feat(supervisor): add mandatory rollback with no partial session at any build step`
- [ ] Step 8: Stop for the M21 review checkpoint.

---

### Milestone M22 — Structurally test-only runtime harness and fixture adapters

#### Task 48: Create the sole harness entry and prove production cannot reach it

**Requirement coverage:**
- §9.11 (the only Phase 3A runtime harness entry is `test/phase3a/runtime-harness.ts`; test files may import it directly; no source under `apps/` or a published package index may import or dynamically resolve it; the harness accepts only controlled fixture adapters and disposable validated storage roots; it cannot admit a real provider surface or remove the production `start` gate; architecture tests search static imports, dynamic imports, filesystem path construction, command dispatch, environment switches, and argument parsing for alternate reachability)
- §4.2 (fixture and capability tests use a separate test-only harness entry point; the production binary never imports it statically or dynamically; an architecture test pins this structural separation)
- §9.1 (fixture-only surface IDs are registered only inside `test/phase3a/runtime-harness.ts`, are invalid in production envelopes, and cannot be reached from the production CLI)

**Files:**
- Create: `test/phase3a/runtime-harness.ts`
- Modify: `test/phase3a/fixture-adapters.ts`
- Test: `test/phase3a/harness-separation.test.ts`

**Interfaces:**
- Consumes: `runPurePreflight`, `runTransactionalBuild`, `createInProcessBrokerClient`, `createSessionStorage`, `ADAPTER_REGISTRY`.
- Produces:
  ```ts
  export const FIXTURE_SURFACE_IDS: readonly SurfaceId[];             // declared only here
  export const FIXTURE_REGISTRY: ReadonlyMap<SurfaceId, AdapterRegistrationV1>; // merged with ADAPTER_REGISTRY only inside the harness
  export interface HarnessSession { readonly client: BrokerClient; readonly storage: SessionStorage; close(): Promise<void> }
  export async function startFixtureSession(options: HarnessOptions): Promise<HarnessSession>;
  ```
  The harness throws `RealSurfaceRejected` if any requested surface is not in `FIXTURE_SURFACE_IDS`, and exposes no function that alters the production gate.

**Preconditions:**
- M14 and M21 reviewed.

- [ ] Step 1: Write the named failing test — in `test/phase3a/harness-separation.test.ts` add `test("no file under apps/ or packages/*/src statically imports, command-dispatches to, or argument-gates runtime-harness")` implementing a fail-closed structural analyzer using the TypeScript compiler API (`import * as ts from "typescript"`, already used by `test/phase3a/architecture-phase3a.test.ts`) that parses every `.ts` and `.tsx` file under `apps/` and `packages/*/src/` via `ts.createSourceFile` with `setParentNodes: true` and covers §9.11 forms (a), (d), and (f) in a two-phase AST traversal: phase 1 builds three maps from syntax alone — an import-alias map from `ts.ImportDeclaration` nodes mapping `element.name.text` (local) to `element.propertyName.text` (original) and `moduleSpecifier.text` (module), including `ts.NamespaceImport` entries mapping the local name to the module with `original: "*"`; a const map from `const x = "literal"` declarations mapping identifier name to string value; and a method-alias map from `const x = obj.method` declarations mapping identifier name to object and method; phase 2 detects: (a) static imports — every `ts.ImportDeclaration` and `ts.ExportDeclaration` whose module specifier is a string literal containing `runtime-harness`, `phase3a`, or `test/phase3a`; (d) command dispatch — the closed inventory is Node `child_process` (`spawn`, `spawnSync`, `exec`, `execSync`, `execFile`, `execFileSync`, `fork`) and Bun (`Bun.spawn`, `Bun.spawnSync`) and Bun Shell (`$` tagged templates imported or aliased from `"bun"`); detection covers `ts.PropertyAccessExpression` when the object is a known `child_process` namespace (via import-alias map, including `import * as cp from "node:child_process"; cp.spawn(...)`), aliased calls where the import-alias map entry has `original` equal to one of those names and `module` containing `child_process`, method-aliased calls where the method-alias map entry has `method` equal to one of those names, bare identifier calls to any dispatch method with no import alias (fail-closed: flagged when markers are detected in resolved arguments), `Bun.spawn` and `Bun.spawnSync` when the object identifier is `Bun` and any argument contains markers (recursing through `ArrayLiteralExpression` elements and `ObjectLiteralExpression` properties including the Bun object-form `cmd: [...]`), and `Bun Shell $` tagged templates via `ts.TaggedTemplateExpression` when the tag is an `ts.Identifier` whose import-alias map entry has `module === "bun"`, or a bare `$` (fail-closed), and the template (including `ts.NoSubstitutionTemplateLiteral` via `rawText` and `ts.TemplateExpression` via `head.text` + `templateSpans`) contains markers; (f) fail-closed control-flow gates — every `ts.IfStatement`, `ts.ConditionalExpression`, and `ts.SwitchStatement` whose body or branch text contains the markers is flagged regardless of the condition, plus standalone `ts.BinaryExpression` with `AmpersandAmpersandToken`, `BarBarToken`, or `QuestionQuestionToken` whose text contains the markers (e.g. `enabled && require("test/phase3a/runtime-harness")`), regardless of whether it is a child of an `if` or ternary; the test includes seeded positive fixtures for static import, aliased spawn from import, method-aliased spawn, bare `spawn` with const-resolved marker, namespace-aliased `cp.spawn`, `Bun.spawn` with array containing marker, `Bun.spawnSync` with object-form `cmd` containing marker, Bun Shell `$` tagged template with marker, switch with test-tree body, `if` with `&&` gate and `argv` condition, `if` with `||` gate, destructured `process.env` variable gate, standalone `&&` with forbidden sink, standalone `||` with forbidden sink, and standalone `??` with forbidden sink, plus a negative fixture for ordinary `Bun.spawn` without markers; `test("no production file uses a dynamic import or environment-gated route to the test tree")` using the same fail-closed structural analyzer to cover §9.11 forms (b) and (e): (b) dynamic imports — every node where `ts.isImportCall(node)` is true (the module specifier is in `node.arguments[0]`, not `node.expression`) and every `ts.CallExpression` whose callee is an `ts.Identifier` named `require`, where the argument is a string literal or const-resolvable identifier whose value contains the markers, and any `import()` or `require()` whose argument is not a string literal and not a const is flagged as `dynamic-import-unresolvable` (fail-closed); (e) environment-gated routes — every `ts.IfStatement`, `ts.ConditionalExpression`, and `ts.SwitchStatement` whose condition or body references `process.env`, a destructured `process.env` variable, or an `env` property, and whose body contains the markers, is flagged; the test includes seeded positive fixtures for dynamic `import()`, `require()`, `import()` with non-literal argument (fail-closed), and destructured `process.env` variable gating a test-tree body, plus a negative fixture for `require("react")`; `test("no production file constructs a filesystem path into the test tree")` using the same fail-closed structural analyzer to cover §9.11 form (c) with five sub-forms: (i) `path.join` and `path.resolve` via `ts.PropertyAccessExpression` where `expression.name.text` is `join` or `resolve` and any argument contains the markers (including const-resolved identifiers); (ii) aliased `join` or `resolve` from import declarations — any `ts.CallExpression` whose callee is an `ts.Identifier` whose import-alias map entry has `original` equal to `join` or `resolve` and `module` containing `path`; (iii) method aliases — any `ts.CallExpression` whose callee is an `ts.Identifier` whose method-alias map entry has `method` equal to `join` or `resolve` (e.g. `const buildPath = path.join; buildPath("test/...")`); (iv) computed property calls via `ts.ElementAccessExpression` where `argumentExpression` is a string literal `join` or `resolve` and any call argument contains the markers, and any `ts.ElementAccessExpression` call whose `argumentExpression` is not a string literal is flagged as `computed-dispatch-unresolvable` (fail-closed); (v) string concatenation via `ts.BinaryExpression` with `operatorToken.kind === ts.SyntaxKind.PlusToken` and template expressions via `ts.isTemplateExpression` where any part contains the markers; the test includes seeded positive fixtures for `path.join`, `path.resolve`, aliased `join` from import, method-aliased `path.join`, computed property with string-literal element access, computed property with variable element access (fail-closed), string concatenation, template expression, namespace import (`import * as path`), and a const variable holding a marker passed to a path-construction call, plus a negative fixture for `path.join("src", "App.tsx")`; `test("the harness rejects a real registered surface")` expecting `RealSurfaceRejected`; `test("the harness exposes no gate-removal function")` asserting no export name matches `/gate|certif|enable.*start/i`; `test("fixture surface ids are absent from the production registry")`; `test("running the fixture harness in an isolated process creates no broker.sock")` which assigns a disposable validated `MADV_RUNTIME_DIR`, records `existsSync` of both `<MADV_RUNTIME_DIR>/broker.sock` and `/tmp/madv-broker-runtime/broker.sock` as `false` before launch, spawns a bounded isolated `bun` child process (5,000 ms wall timeout; 65,536-byte stdout and stderr caps; stdin ignored; SIGTERM then 500 ms grace then SIGKILL) with `MADV_RUNTIME_DIR` set to that disposable directory, that imports the actual `test/phase3a/runtime-harness.ts`, calls and awaits `startFixtureSession()` (fixture-only surface ID, disposable validated storage root), immediately verifies both `<MADV_RUNTIME_DIR>/broker.sock` and `/tmp/madv-broker-runtime/broker.sock` are absent and emits `HARNESS_STARTED_NO_SOCKET`, awaits `close()`, verifies both socket paths remain absent and emits `HARNESS_CLOSED_NO_SOCKET`, and exits `0`; the parent reaps the child and requires both exact sentinels, exit code `0`, and asserts both `<MADV_RUNTIME_DIR>/broker.sock` and `/tmp/madv-broker-runtime/broker.sock` are `false` before launch, after the child exit, and after every child-process failure or termination/reaping outcome; removal of the disposable `MADV_RUNTIME_DIR` and other fixture-directory cleanup occurs only after the final socket-absence assertions; any missing sentinel, failed socket assertion, spawn failure, nonzero exit, unexpected signal, timeout, output overflow, or cleanup failure fails the test.
- [ ] Step 2: Run `bun test test/phase3a/harness-separation.test.ts -t "the harness rejects a real registered surface"` — expected RED: `Cannot find module "./runtime-harness"`.
- [ ] Step 3: Implement the minimum authorized behavior — create the harness with fixture surface registration, disposable `mkdtemp` roots passed through the production `validateStorageRoot`, and the `RealSurfaceRejected` guard.
- [ ] Step 4: Run `bun test test/phase3a/harness-separation.test.ts` — expected GREEN: 7 pass. Invariant established: **the runtime remains reachable only from tests, by construction and by a fail-closed AST-verified structural analyzer covering all six §9.11 reachability forms (static imports, dynamic imports, filesystem path construction, command dispatch, environment switches, and argument parsing) plus standalone logical gates, with const, method-alias, and namespace-import resolution and seeded positive fixtures for every evasion class, and actual fixture-harness execution creates no `broker.sock`.**
- [ ] Step 5: Run `bun test` (full) and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm `apps/madbridge/src/**` is unchanged.
- [ ] Step 7: Commit the listed files with message: `test(phase3a): add the sole test-only runtime harness with structural separation guards`
- [ ] Step 8: Stop for the M22 review checkpoint.

#### Task 49: Exercise the full fixture lifecycle through `BrokerClient`

**Requirement coverage:**
- §6.3 (pure preflight creates no governed state; transactional storage and ledger creation; `InProcessBrokerClient` snapshots and output streams; exact bytes, resize, typed commands, and fencing; monotonic sequencing and invariant failures; clean close and typed interruption; reconciliation after unrecordable termination)

**Files:**
- Test: `test/phase3a/harness-lifecycle.test.ts`
- Test: `test/phase3a/harness-rollback.test.ts`

**Interfaces:**
- Consumes: `startFixtureSession`, `BrokerClient`.
- Produces: no production interface. Test-only assertions.

**Preconditions:**
- Task 48 committed.

- [ ] Step 1: Write the named failing test — in `harness-lifecycle.test.ts` add `test("a fixture session reaches active with a valid token and two ready executions")`; `test("exact bytes written through pty_input are echoed on the output stream")` using a byte string containing `0x00`, `0x1b`, and `0xFF`; `test("pty_resize propagates the exact cols and rows to the child")`; `test("session_pause then session_resume returns to active without changing the token")`; `test("Founder session_close produces closing, invalidation, then closed")`; `test("a typed interruption ends the session and closes client streams")`. In `harness-rollback.test.ts` add `test("injected failure at every build step leaves no residual process")` parameterized over `BUILD_STEPS`.
- [ ] Step 2: Run `bun test test/phase3a/harness-lifecycle.test.ts -t "exact bytes written through pty_input are echoed on the output stream"` — expected RED: the fixture adapter has no echo behavior; the output stream yields nothing and the test times out on its first frame.
- [ ] Step 3: Implement the minimum authorized behavior — add the deterministic echo, resize-report, and controlled-exit behaviors to `test/phase3a/fixture-adapters.ts`. No production file changes in this task.
- [ ] Step 4: Run both test files — expected GREEN: 18 pass. Invariant established: **the real runtime foundation performs a complete governed lifecycle under deterministic fixtures.**
- [ ] Step 5: Run `bun test` (full) and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm only test files changed.
- [ ] Step 7: Commit the listed files with message: `test(phase3a): exercise the full fixture lifecycle through BrokerClient`
- [ ] Step 8: Stop for the M22 review checkpoint.

#### Task 50: Assert four-way environment equality

**Requirement coverage:**
- §5.4 (an acceptance fixture dumps each environment and asserts four-way equality and the absence of every ambient variable not on the allowlist)
- §6.3 (four-way environment equality across probes, auth checks, hosts, and governed children)

**Files:**
- Test: `test/phase3a/environment-equality.test.ts`

**Interfaces:**
- Consumes: `startFixtureSession`, `buildAllowlistedEnvironment`.
- Produces: no production interface.

**Preconditions:**
- Task 49 committed.

- [ ] Step 1: Write the named failing test — add `test("the identity probe, auth probe, PTY host, and governed child receive byte-identical environments")` comparing four captured `Record<string,string>` dumps with `toEqual`; `test("no ambient variable outside the allowlist reaches any of the four")` seeding `MADV_AMBIENT_LEAK`, `AWS_SECRET_ACCESS_KEY`, and `GITHUB_TOKEN` into the parent process and asserting none appears; `test("a secret-marked value never appears in any diagnostic, error, or evidence artifact produced by the session")`.
- [ ] Step 2: Run `bun test test/phase3a/environment-equality.test.ts -t "the identity probe, auth probe, PTY host, and governed child receive byte-identical environments"` — expected RED: the fixture adapter does not yet dump its environment, so only two of the four captures exist and `toEqual` fails on `undefined`.
- [ ] Step 3: Implement the minimum authorized behavior — add environment dumping to the fixture adapter and the fixture child. No production file changes.
- [ ] Step 4: Run `bun test test/phase3a/environment-equality.test.ts` — expected GREEN: 3 pass. Invariant established: **one environment, produced once, reaches all four consumers, and nothing ambient rides along.**
- [ ] Step 5: Run `bun test test/phase3a packages/supervisor` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit `test/phase3a/environment-equality.test.ts test/phase3a/fixture-adapters.ts` with message: `test(phase3a): assert four-way environment equality and ambient isolation`
- [ ] Step 8: Stop for the M22 review checkpoint.

---

### Milestone M23 — Adversarial process scenarios

#### Task 51: Supervisor-death scenarios

**Requirement coverage:**
- §6.4 scenarios 1–4 (clean exit, ordinary signal, crash, `SIGKILL`)
- §1.1 (supervisor exit terminates every governed child, invalidates the token, closes the session fail-closed)
- §2.5 / §9.5 (when durable writing is impossible, next-start reconciliation appends `session_unclean_closure`)

**Files:**
- Test: `test/phase3a/adversarial/supervisor-death.test.ts`

**Interfaces:**
- Consumes: `startFixtureSession` run in a spawned child supervisor process so the parent can kill it.
- Produces: no production interface.

**Preconditions:**
- M22 reviewed.

- [ ] Step 1: Write the named failing test — add `test("supervisor clean exit terminates every governed child")`; `test("supervisor SIGTERM terminates every governed child")`; `test("supervisor crash terminates every governed child")`; `test("supervisor SIGKILL terminates every governed child and leaves no typed terminal prefix")`; `test("next-start reconciliation appends session_unclean_closure after SIGKILL")`; `test("no governed process survives any supervisor-death scenario")` polling `process.kill(pid, 0)` for every recorded child and host PID.
- [ ] Step 2: Run `bun test test/phase3a/adversarial/supervisor-death.test.ts -t "supervisor SIGKILL terminates every governed child and leaves no typed terminal prefix"` — expected RED: the spawned supervisor entry point does not exist in the harness; the test cannot start a killable session.
- [ ] Step 3: Implement the minimum authorized behavior — add `startFixtureSessionInChildProcess()` to `test/phase3a/runtime-harness.ts`, which spawns a supervisor subprocess and returns its PID plus the recorded governed PIDs. No production file changes.
- [ ] Step 4: Run the file — expected GREEN: 6 pass. Invariant established: **there is no way to kill the supervisor that leaves a governed process alive.**
- [ ] Step 5: Run `bun test test/phase3a` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit the listed files with message: `test(phase3a): add adversarial supervisor-death containment scenarios`
- [ ] Step 8: Stop for the M23 review checkpoint.

#### Task 52: Descriptor hygiene and process-group scenarios

**Requirement coverage:**
- §6.4 scenarios 5–9 (two PTY hosts plus an adapter to expose descriptor leakage; governed child and grandchild termination; deliberate lifeline EOF; child ignoring `SIGTERM`; PTY-host exit)
- §3.2 (the supervisor is the sole owner of every write end, each close-on-exec; no sibling host, governed child, or adapter may inherit another host’s write end; tested with two PTYs plus an adapter because a single-child test cannot detect a leaked sibling descriptor)
- §3.5 (process-group containment is claimed; hostile-process containment is not)

**Files:**
- Test: `test/phase3a/adversarial/descriptor-hygiene.test.ts`
- Test: `test/phase3a/adversarial/process-group.test.ts`

**Interfaces:**
- Consumes: `startFixtureSession` with two governed executions plus one adapter.
- Produces: no production interface.

**Preconditions:**
- Task 51 committed.

- [ ] Step 1: Write the named failing test — in `descriptor-hygiene.test.ts` add `test("with two PTY hosts and an adapter, no process holds a sibling's lifeline write end")` enumerating each child’s open descriptors via `lsof -p <pid>` and asserting no overlap with another host’s write-end inode; `test("closing host A's stdin does not affect host B")`. In `process-group.test.ts` add `test("a grandchild in the governed process group is terminated")`; `test("a child that ignores SIGTERM is SIGKILLed within the outer bound")`; `test("deliberate lifeline EOF terminates that child's process group only")`; `test("PTY-host exit interrupts the whole session with pty_host_failure")`; `test("a descendant that calls setsid is documented as escaping, not silently claimed contained")` asserting the residual is recorded in the report rather than asserted away.
- [ ] Step 2: Run `bun test test/phase3a/adversarial/descriptor-hygiene.test.ts -t "with two PTY hosts and an adapter, no process holds a sibling's lifeline write end"` — expected RED: the harness starts only one host; the second host and the adapter do not exist, so the enumeration has nothing to compare.
- [ ] Step 3: Implement the minimum authorized behavior — extend the harness to start two governed executions plus one fixture adapter concurrently. No production file changes unless the descriptor test reveals a real leak, in which case fix `spawnPtyHost`’s close-on-exec handling in `packages/broker/src/pty-host-supervisor.ts`.
- [ ] Step 4: Run both files — expected GREEN: 7 pass. Invariant established: **no sibling can write another child’s lifeline, and containment claims match what is actually demonstrated.**
- [ ] Step 5: Run `bun test test/phase3a` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit the listed files with message: `test(phase3a): add descriptor-hygiene and process-group containment scenarios`
- [ ] Step 8: Stop for the M23 review checkpoint.

#### Task 53: Wedged-host, frame, and sequence scenarios

**Requirement coverage:**
- §6.4 scenarios 10–13 (host wedged with `SIGSTOP` and direct PGID cleanup; host unresponsive to command frames; malformed and unknown host frames; snapshot/output duplicate, regression, and gap)
- §9.8 (observed detection, `SIGTERM`, escalation, and final death times reported against the deadline table)

**Files:**
- Test: `test/phase3a/adversarial/wedged-host.test.ts`
- Test: `test/phase3a/adversarial/sequence-invariants.test.ts`

**Interfaces:**
- Consumes: `startFixtureSession`, `escalateWedgedHost`.
- Produces: no production interface.

**Preconditions:**
- Task 52 committed.

- [ ] Step 1: Write the named failing test — in `wedged-host.test.ts` add `test("a SIGSTOPped host is cleared through the direct PGID path")` reporting observed detection, escalation, and death times; `test("a host that never acknowledges a command is treated as host failure at 250 ms")`; `test("a wedged host receives no responsive-host grace")`; `test("malformed host frames fail closed and interrupt the session")`; `test("unknown host frame tags fail closed")`. In `sequence-invariants.test.ts` add `test("a duplicate output sequence interrupts the session")`; `test("an output sequence regression interrupts the session")`; `test("an output sequence gap interrupts the session")`; `test("a snapshot sequence gap interrupts the session")`; `test("every timing assertion reports observed values, not just pass")`.
- [ ] Step 2: Run `bun test test/phase3a/adversarial/wedged-host.test.ts -t "a SIGSTOPped host is cleared through the direct PGID path"` — expected RED: the harness has no fault-injection switch to `SIGSTOP` a fixture host mid-command.
- [ ] Step 3: Implement the minimum authorized behavior — add fault-injection options (`wedgeHostAfter`, `emitMalformedFrame`, `skewOutputSeq`, `skewSnapshotSeq`) to `test/phase3a/runtime-harness.ts`. No production file changes.
- [ ] Step 4: Run both files — expected GREEN: 10 pass with observed millisecond values printed. Invariant established: **every host-side and stream-side anomaly ends the session inside the normative deadlines.**
- [ ] Step 5: Run `bun test test/phase3a packages/broker` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit the listed files with message: `test(phase3a): add wedged-host, malformed-frame, and sequence-invariant scenarios`
- [ ] Step 8: Stop for the M23 review checkpoint.

#### Task 54: Ledger, attestation, auth, and residual scenarios

**Requirement coverage:**
- §6.4 scenarios 14–19 (ledger append failure; mid-session authentication expiry; live attestation mismatch; executable replacement between preflight and exec; first surface launched followed by second-surface launch failure; cleanup verification that no child, descendant, host, descriptor, open ledger session, or live token remains)
- §5.3 (ledger append failure interrupts with `ledger_write_failed`)
- §5.4 (auth failure interrupts with `authentication_expired` and requires external reauthentication, a new envelope, and a new session)

**Files:**
- Test: `test/phase3a/adversarial/ledger-failure.test.ts`
- Test: `test/phase3a/adversarial/attestation-drift.test.ts`
- Test: `test/phase3a/adversarial/auth-expiry.test.ts`
- Test: `test/phase3a/adversarial/cleanup-residuals.test.ts`

**Interfaces:**
- Consumes: `startFixtureSession` with a read-only ledger directory, a swappable fixture binary, and an auth-expiry trigger.
- Produces: no production interface.

**Preconditions:**
- Task 53 committed.

- [ ] Step 1: Write the named failing test — in `ledger-failure.test.ts` add `test("a mid-session append failure interrupts with ledger_write_failed")` and `test("an unrecordable interruption is completed by next-start reconciliation")`. In `attestation-drift.test.ts` add `test("live attestation mismatch interrupts the session with identity_mismatch")` and `test("replacing the executable between preflight and exec is caught by the adjacent re-hash")`. In `auth-expiry.test.ts` add `test("mid-session authentication expiry interrupts with authentication_expired")` and `test("recovery requires a new envelope and a new session, not a resume")` asserting `session_resume` returns `session_not_writable`. In `cleanup-residuals.test.ts` add `test("the first surface is torn down when the second surface fails to launch")` and `test("no child, descendant, host, descriptor, open ledger session, or live fencing token remains after the adversarial suite")`.
- [ ] Step 2: Run `bun test test/phase3a/adversarial/ledger-failure.test.ts -t "a mid-session append failure interrupts with ledger_write_failed"` — expected RED: the harness cannot make the ledger fail mid-session; the append succeeds and the session stays `active`.
- [ ] Step 3: Implement the minimum authorized behavior — add `failLedgerAppendAfter`, `swapBinaryBeforeExec`, `expireAuthAfter`, and `failSecondSurfaceLaunch` fault switches to the harness. No production file changes.
- [ ] Step 4: Run all four files — expected GREEN: 8 pass. Invariant established: **every §2.5 interruption trigger is demonstrated, and the suite leaves nothing behind.**
- [ ] Step 5: Run `bun test` (full) and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff.
- [ ] Step 7: Commit the listed files with message: `test(phase3a): add ledger, attestation, auth-expiry, and residual-cleanup scenarios`
- [ ] Step 8: Stop for the M23 review checkpoint.

---

### Milestone M24 — Fixture-driven `verify-ledger` and `export-evidence`

#### Task 55: Point `verify-ledger` and `export-evidence` at the validated storage root

**Requirement coverage:**
- §4.3 (`verify-ledger` and `export-evidence` must work on session storage generated by the fixture harness before any live session is certified)
- §6.3 (production `verify-ledger` and `export-evidence` consuming fixture output)
- §6.8.8–9 (fixture-generated ledgers pass production `verify-ledger`; fixture-generated evidence passes production `export-evidence` and sanitization checks)
- §5.6 (sanitized exports apply best-effort redaction for known token patterns and exact allowlisted secret values and record which rules ran)

**Files:**
- Modify: `apps/madbridge/src/commands/verify-ledger.ts`
- Modify: `apps/madbridge/src/commands/export-evidence.ts`
- Test: `test/phase3a/evidence-pipeline.test.ts`

**Interfaces:**
- Consumes: `proposeStorageRoot`, `validateStorageRoot`.
- Produces: default ledger path becomes `<storage-root>/sessions/<session-id>/ledger/ledger.db` selected by a required `--session` flag; `--ledger` continues to accept an explicit path. `export-evidence` writes into `<session-dir>/sanitized-evidence/` by default and adds `redaction_rules_applied` to `manifest.json`.

**Preconditions:**
- M23 reviewed.

- [ ] Step 1: Write the named failing test — add `test("production verify-ledger validates a fixture-produced ledger")` starting a fixture session, closing it, and running `runCli(["verify-ledger","--session",id,"--json"])` expecting exit 0 and `valid: true`; `test("production export-evidence consumes a fixture-produced session")` expecting exit 0; `test("exported evidence contains no allowlisted secret value")` seeding a known secret into the fixture environment and asserting its absence from every exported file; `test("the manifest records which redaction rules ran")`; `test("verify-ledger no longer defaults to .madv-runtime")`.
- [ ] Step 2: Run `bun test test/phase3a/evidence-pipeline.test.ts -t "verify-ledger no longer defaults to .madv-runtime"` — expected RED: the default path is `join(ctx.cwd, ".madv-runtime", "ledger", "ledger.db")` (`apps/madbridge/src/commands/verify-ledger.ts:18`) and the same literal appears at `export-evidence.ts:48,51,54`.
- [ ] Step 3: Implement the minimum authorized behavior — replace the default path resolution in both commands with storage-root resolution and a `--session` flag; add `redaction_rules_applied` to the manifest and the exact-secret-value redaction pass alongside the existing `SECRET_PATTERNS`.
- [ ] Step 4: Run `bun test test/phase3a/evidence-pipeline.test.ts` — expected GREEN: 5 pass. Invariant established: **the production evidence tools are proven against real fixture output before any live session exists.**
- [ ] Step 5: Run `bun test` (full) and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm the two commands did not gain a runtime import.
- [ ] Step 7: Commit the listed files with message: `feat(cli): resolve evidence commands against the validated storage root`
- [ ] Step 8: Stop for the M24 review checkpoint.

---

### Milestone M25 — Antigravity and alternative-surface investigations

#### Task 56: Investigate Antigravity against the pre-written rubric

**Requirement coverage:**
- §2.3 (Antigravity is investigated first because the planned live pairing depends on it; the investigation records every primitive tried, including CLI version, binary path and hash, host facts, exact commands, structured modes, session metadata, logs, and sanitized results; a failed result is still a required evidence document)
- §2.2 (the fixed passing and failing evidence rubric)
- §6.6 (a failing investigation must still produce a durable machine-readable failed capability record, a human-readable evidence report, exact primitives attempted and sanitized outputs, CLI version/path/binary hash/host/date, and the precise rubric clause not met; the failing surface is excluded from the candidate pair; the foundation may still merge behind the gate)
- §9.13 (Antigravity remains ineligible until a fresh investigation produces passing evidence; no configured model string, flag, provider file, or marketing output can substitute)

**Files:**
- Create: `docs/verification/2026-08-12-antigravity-surface-investigation.md`
- Test: `test/phase3a/evidence-pipeline.test.ts`

**Interfaces:**
- Consumes: `parseCapabilityRecord`, `writeCapabilityRecord`, `evaluateCapabilityFreshness`.
- Produces: one persisted `CapabilityRecordV1` for `antigravity` (pass or fail) plus the human-readable report.

**Preconditions:**
- M15 and M16 reviewed. The rubric is fixed **before** the investigation begins and may not be edited during it.

- [ ] Step 1: Write the named failing test — add `test("an Antigravity capability record exists and states an explicit overall verdict")` reading the capability store for `antigravity` and asserting exactly one record whose `overall` is `"pass"` or `"fail"` and whose `identity_attestation.primitive` names the exact command attempted; `test("a failing investigation still persists a record and a report")`; `test("no configured model string is accepted as identity evidence")` asserting the record’s `identity_attestation.sanitized_facts` does not cite `config get model` as passing evidence.
- [ ] Step 2: Run `bun test test/phase3a/evidence-pipeline.test.ts -t "an Antigravity capability record exists and states an explicit overall verdict"` — expected RED: no capability record exists for `antigravity`; `readCapabilityRecords` returns an empty array.
- [ ] Step 3: Implement the minimum authorized behavior — run the investigation on the Founder host, attempting each documented `agy` primitive; record CLI version, absolute binary path, `sha256`, host facts, exact commands, and sanitized outputs; write the capability record and the report. Do **not** edit the rubric to accommodate a result. At the Phase 3A baseline the expected outcome is `overall: "fail"` on the §2.2 clause “a documented CLI or API primitive returning the resolved provider and exact model for the actual session”; a passing result would be a new, reviewable finding.
- [ ] Step 4: Run the focused command — expected GREEN: 3 pass. Invariant established: **the investigation produces durable evidence whether it passes or fails, and a failure does not stop the foundation.**
- [ ] Step 5: Run `bun test test/phase3a packages/protocol packages/storage` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm no secret or credential material entered the report.
- [ ] Step 7: Commit `docs/verification/2026-08-12-antigravity-surface-investigation.md test/phase3a/evidence-pipeline.test.ts` with message: `docs(verification): record the Antigravity surface investigation under the fixed rubric`
- [ ] Step 8: Stop for the M25 review checkpoint.

#### Task 57: Record controlled investigations for Founder-approved alternatives

**Requirement coverage:**
- §2.3 (Codex, Grok, Cursor, Claude, and other Founder-approved surfaces may be investigated as startup re-authorization alternatives; no single surface’s failure ends the runtime-foundation work; Phase 3A continues under controlled fixtures behind the production gate)
- §2.4 (no alternative is preselected; there is no one-keystroke confirmation; selection is a distinct typed Founder authorization requiring a new envelope)
- §6.6 (the same pre-written rubrics apply; a passing record is not a live authorization)

**Files:**
- Create: `docs/verification/2026-08-12-surface-investigation-<surface>.md` (one per Founder-approved alternative)
- Test: `test/phase3a/evidence-pipeline.test.ts`

**Interfaces:**
- Consumes: the same capability-record pipeline as Task 56.
- Produces: one persisted record and report per investigated surface.

**Preconditions:**
- Task 56 committed. The Founder has named which alternatives are approved for investigation. Investigating an unnamed surface is unapproved scope expansion.

- [ ] Step 1: Write the named failing test — add `test("every investigated surface has both a capability record and a committed report")` deriving the surface list from the report filenames and asserting a matching record exists for each; `test("no capability record is treated as a live authorization")` asserting no code path reads a capability record to bypass preflight; `test("no alternative is marked preselected or default")` asserting no record or report contains a `preselected`, `default`, or `fallback` field.
- [ ] Step 2: Run `bun test test/phase3a/evidence-pipeline.test.ts -t "every investigated surface has both a capability record and a committed report"` — expected RED: report files exist for zero alternatives while the Founder-approved list is non-empty, so the derived list and the record set disagree.
- [ ] Step 3: Implement the minimum authorized behavior — run each approved investigation and write its record and report. Investigate nothing outside the Founder’s list.
- [ ] Step 4: Run the focused command — expected GREEN: 3 pass. Invariant established: **alternatives are documented observations only; nothing in the tree can promote one automatically.**
- [ ] Step 5: Run `bun test test/phase3a` and `bunx tsc --noEmit`.
- [ ] Step 6: Inspect the diff; confirm no adapter registry entry was added as a side effect.
- [ ] Step 7: Commit the report files and the test with message: `docs(verification): record Founder-approved alternative surface investigations`
- [ ] Step 8: Stop for the M25 review checkpoint.

---

### Milestone M26 — Dual-host certification evidence and final merge gate

#### Task 58: Produce both dual-host Phase 3A reports at one SHA

**Requirement coverage:**
- §6.5 (the same reviewed commit is tested independently on both Founder Macs; each signed-off report records the eight listed field groups; both reports must pass before merge; machine-specific code branches or UI forks are not an acceptable substitute)
- §6.8.3–5 (iMac report passes and is checksummed; MacBook report passes and is checksummed; both identify the same candidate commit)
- §9.8 (all deadlines are reported as observed durations in dual-host evidence)

**Files:**
- Create: `docs/verification/2026-08-12-phase-3a-dual-host-imac.md`
- Create: `docs/verification/2026-08-12-phase-3a-dual-host-macbook.md`
- Test: `test/phase3a/evidence-pipeline.test.ts`

**Interfaces:**
- Consumes: the observed timings emitted by M23’s adversarial suite.
- Produces: two reports with identical structure and a trailing `Report SHA-256:` line.

**Preconditions:**
- M25 reviewed; the candidate commit is fixed and identical on both hosts; both worktrees are clean.

- [ ] Step 1: Write the named failing test — add `test("both dual-host Phase 3A reports name the same candidate SHA")`; `test("both reports record architecture, macOS version and build, Bun path, version and hash, TERM, and shell")`; `test("both reports record complete suite counts, not filtered counts")` asserting each contains a `Ran <n> tests across <m> files` line; `test("both reports record observed timings for every deadline")`; `test("both reports record worktree cleanliness and exact changed files")`; `test("both reports carry a checksum")`.
- [ ] Step 2: Run `bun test test/phase3a/evidence-pipeline.test.ts -t "both dual-host Phase 3A reports name the same candidate SHA"` — expected RED: neither report exists (`ENOENT`).
- [ ] Step 3: Implement the minimum authorized behavior — on each host, at the identical candidate SHA, run the §12 command set and write the report from the actual output. Do not transcribe results from the other host.
- [ ] Step 4: Run the focused command on both hosts — expected GREEN: 6 pass. Invariant established: **cross-host certification rests on two independent runs of one commit.**
- [ ] Step 5: Run `bun test` (full) and `bunx tsc --noEmit` on both hosts.
- [ ] Step 6: Inspect the diff; confirm only the two reports changed and no machine-specific source branch was introduced.
- [ ] Step 7: Commit the two reports with message: `docs(verification): publish dual-host Phase 3A certification reports`
- [ ] Step 8: Stop for the M26 review checkpoint.

#### Task 59: Verify the merge gate with the production gate still closed

**Requirement coverage:**
- §6.8 (all seventeen merge-gate items)
- §4.2 (production `start` still returns `live_runtime_not_certified` and is structurally unable to reach the runtime or harness)
- §6.9 (Phase 3B gate-removal evidence is not produced here)

**Files:**
- Test: `test/phase3a/architecture-phase3a.test.ts`
- Create: `docs/verification/phase-3a-correction-rounds.md`

**Interfaces:**
- Consumes: every guard built in M1, M14, M22.
- Produces: a single `describe("Phase 3A merge gate")` block whose assertions correspond one-to-one with the §6.8 items that are machine-checkable (items 1, 2, 6, 7, 8, 9, 12, 13, 14, 15, 16). Items 3, 4, 5, 10, 11, and 17 are human and reviewer verdicts recorded in the reports.

**Preconditions:**
- Task 58 committed on both hosts.

- [ ] Step 1: Write the named failing test — add `test("merge gate item 12: production start still returns live_runtime_not_certified")`; `test("merge gate item 13: production start is structurally unable to reach the runtime or harness")`; `test("merge gate item 14: external-control placeholders return their stable typed errors and inspect no runtime state")`; `test("merge gate item 15: no production or harness path creates broker.sock")`; `test("merge gate item 16: no residual child, descendant, PTY host, descriptor, open session record, or valid token remains after tests")`; `test("merge gate item 1: the suite has not regressed below the Phase 2 floor")` asserting the recorded counts are ≥ 714 / 2606 / 35.
- [ ] Step 2: Run `bun test test/phase3a/architecture-phase3a.test.ts -t "merge gate item 1: the suite has not regressed below the Phase 2 floor"` — expected RED: the floor constants are not yet declared in the test file; the assertion references an undefined baseline.
- [ ] Step 3: Implement the minimum authorized behavior — declare `PHASE_2_FLOOR = { tests: 714, expects: 2606, files: 35 }` and implement the six assertions. Create the correction-round log with the §7.3 running record.
- [ ] Step 4: Run the file — expected GREEN. Invariant established: **the merge gate is machine-checked wherever it can be, and the production gate is proven closed at merge time.**
- [ ] Step 5: Run `bun test` (full), `bunx tsc --noEmit`, `git diff --check "$SOURCE_BASELINE_SHA"` (§0A; `aa16032c56fdf6c7105e99b1765ed9365d605bf4`), `git status -sb`, and `git ls-files --others --exclude-standard` on both hosts.
- [ ] Step 6: Inspect the complete diff against the baseline SHA and verify every changed file appears in §3.
- [ ] Step 7: Commit the listed files with message: `test(phase3a): assert the machine-checkable Phase 3A merge-gate items`
- [ ] Step 8: Stop for the final Founder merge review. **Do not merge. Do not remove the start gate.**

---

## 6. Contract traceability

Format: **Specification requirement → planned task → production file → test/evidence → failure behavior → review checkpoint.**

### 6.1 Sections 0–3

| Requirement | Task | Production file | Test / evidence | Failure behavior | Checkpoint |
| --- | --- | --- | --- | --- | --- |
| §1.1 single foreground supervisor; supervisor exit kills all | 46, 47, 51 | `packages/supervisor/src/build.ts` | `test/phase3a/adversarial/supervisor-death.test.ts` | every governed child terminated; token invalidated; session closed | M21, M23 |
| §1.1 `BrokerClient` is the only boundary; plain data only | 20, 22 | `packages/broker/src/client.ts`, `in-process-client.ts` | `packages/broker/test/broker-client-contract.test.ts` | type-level rejection; no handle crosses | M9, M10 |
| §1.2 one centralized cardinality constraint | 7 | `packages/protocol/src/pair-constraints.ts` | `packages/protocol/test/pair-constraints.test.ts`, `test/phase3a/architecture-phase3a.test.ts` | `CardinalityError`; architecture test fails on any other literal two | M3 |
| §1.2 no paired tuple types or `surfaceA`/`surfaceB` names | 7 | — (guard only) | `test/phase3a/architecture-phase3a.test.ts` | architecture assertion failure | M3 |
| §1.2 TUI and `allowed_surface_pairs` exemptions only | 7 | — | same | assertion fails if a third exemption appears | M3 |
| §1.3 broker is the sole PTY-command module; host holds the descriptor | 41, 42 | `packages/pty-host/src/main.ts`, `packages/broker/src/pty-host-supervisor.ts` | `test/phase3a/architecture-phase3a.test.ts` import-graph test | host import of any authority module fails the build gate | M18 |
| §1.4 exclusions (no daemon, socket, named endpoint, fallback, credentials) | 33, 34 | `packages/broker/src/index.ts` | `test/phase3a/architecture-phase3a.test.ts` | export/import assertion failure | M14 |
| §2.1 pure preflight creates nothing | 45 | `packages/supervisor/src/preflight.ts` | `packages/supervisor/test/preflight.test.ts` | typed `PreflightFailure`; no filesystem delta | M20 |
| §2.1 transactional build order | 46 | `packages/supervisor/src/build.ts` | `packages/supervisor/test/build-rollback.test.ts` | ordered trace mismatch fails | M21 |
| §2.1 hash verification adjacent to `exec` | 42 | `packages/pty-host/src/launch.ts` | `packages/pty-host/test/launch.test.ts` | `ArtifactHashMismatch`; no child created | M19 |
| §2.1 mandatory rollback; no partial session | 47 | `packages/supervisor/src/build.ts` | `packages/supervisor/test/build-rollback.test.ts`, `test/phase3a/harness-rollback.test.ts` | typed failure + zero residuals + `session_abort` | M21, M22 |
| §2.2 machine-verifiable identity rubric — preliminary pass | **60** | none (evidence only) | `docs/verification/phase-3a-antigravity-preliminary.md` | rubric clause named per result; no capability record produced | Stage 0 |
| §2.2 machine-verifiable identity rubric — formal | 45, 56 | `packages/supervisor/src/attestation.ts` | `docs/verification/2026-08-12-antigravity-surface-investigation.md` + durable `CapabilityRecordV1` | `identity_mismatch`; surface ineligible | M20, M25 |
| §2.3 Antigravity investigated first | **60** | none (evidence only) | `docs/verification/phase-3a-antigravity-preliminary.md` | failed result is still a required evidence document | Stage 0 |
| §2.3 capability matrix; dated attestations | 35, 36 | `packages/protocol/src/capability-record.ts`, `packages/storage/src/capability-store.ts` | `packages/protocol/test/capability-record.test.ts` | typed staleness reason | M15 |
| §2.4 Founder-selected re-authorization; no preselection | 57 | — (absence is the contract) | `test/phase3a/evidence-pipeline.test.ts` | assertion fails if any default/fallback field exists | M25 |
| §2.5 interruption interrupts the whole session | 25, 54 | `packages/broker/src/runtime-broker.ts` | `test/phase3a/adversarial/*.test.ts` | four-record durable sequence | M10, M23 |
| §2.5 `interrupted` is terminal-bound | 17 | `packages/broker/src/session-machine.ts` | `packages/broker/test/session-machine.test.ts` | `invalid transition: interrupted -> resume` | M8 |
| §2.5 unrecordable termination → next-start reconciliation | 16, 51 | `packages/broker/src/next-start-reconciliation.ts` | `packages/broker/test/next-start-reconciliation.test.ts` | `session_unclean_closure` appended | M7, M23 |
| §3.1 closed host operation set; no policy, ledger, or evidence writes | 41 | `packages/pty-host/src/main.ts` | `packages/pty-host/test/main-guard.test.ts` | `no_control_channel`; import-graph failure | M18 |
| §3.2 framed command stream doubling as lifeline; sole write-end ownership | 40, 42, 52 | `packages/pty-host/src/frames.ts`, `packages/broker/src/pty-host-supervisor.ts` | `test/phase3a/adversarial/descriptor-hygiene.test.ts` | `MalformedFrameError`; leaked-descriptor assertion | M18, M23 |
| §3.3 gap-free launch ordering | 42 | `packages/pty-host/src/launch.ts` | `packages/pty-host/test/launch.test.ts` | ordered-trace assertion failure | M19 |
| §3.4 bounded termination ladder; wedged-host direct PGID | 43, 44, 53 | `packages/pty-host/src/signals.ts`, `packages/broker/src/pty-host-supervisor.ts` | `test/phase3a/adversarial/wedged-host.test.ts` | `pty_host_failure`; direct `SIGKILL` of the reported PGID | M19, M23 |
| §3.5 honest containment claim; `setsid` residual documented | 52 | — | `test/phase3a/adversarial/process-group.test.ts` + dual-host reports | residual recorded, never asserted away | M23, M26 |
| §3.6 Bun spike, thirteen criteria, both hosts | 38, 39 | `test/phase3a/spike/bun-terminal-spike.ts` | both spike reports | **phase stops**; no FFI/native/pipe substitute | M17 |

### 6.2 Sections 4–6

| Requirement | Task | Production file | Test / evidence | Failure behavior | Checkpoint |
| --- | --- | --- | --- | --- | --- |
| §4.1 snapshot/output sequence invariants | 23, 53 | `packages/broker/src/in-process-client.ts` | `packages/broker/test/in-process-client.test.ts`, `test/phase3a/adversarial/sequence-invariants.test.ts` | typed interruption, never hidden | M10, M23 |
| §4.1 input/resize bind to session, execution, and token | 21 | `packages/broker/src/command-legality.ts` | `packages/broker/test/command-legality.test.ts` | `stale_fencing_token` / `session_mismatch` | M9 |
| §4.1 `close()` releases only that client | 22 | `packages/broker/src/in-process-client.ts` | `packages/broker/test/in-process-client.test.ts` | phase unchanged after `close()` | M10 |
| §4.2 production `start` gate | 30 | `apps/madbridge/src/commands/start.ts` | `apps/madbridge/test/cli-gate.test.ts` | exit `78`, exact text and JSON | M13 |
| §4.2 harness structurally unreachable from production | 48 | — | `test/phase3a/harness-separation.test.ts` | import-graph assertion failure | M22 |
| §4.3 external-control placeholders | 31 | `apps/madbridge/src/commands/{status,pause,resume,close}.ts` | `apps/madbridge/test/cli-placeholders.test.ts` | exit `69`, exact text and JSON | M13 |
| §4.3 `verify-ledger`/`export-evidence` work on fixture storage | 55 | `apps/madbridge/src/commands/{verify-ledger,export-evidence}.ts` | `test/phase3a/evidence-pipeline.test.ts` | nonzero exit on invalid chain | M24 |
| §4.4 socket dormancy; no `broker.sock`; `MADV_RUNTIME_DIR` quarantined | 33, 34 | `packages/broker/src/index.ts` | `test/phase3a/architecture-phase3a.test.ts` | export/creation assertion failure | M14 |
| §5.1 storage tree; no `runtime/` | 27, 28 | `packages/storage/src/{storage-root,session-storage}.ts` | `packages/storage/test/*.test.ts` | typed `StorageRootFailure` | M11 |
| §5.2 passwd home; `$HOME` divergence; single validator | 26, 27 | `packages/storage/src/{home,storage-root}.ts` | `packages/storage/test/{home,storage-root}.test.ts` | `HomeMismatchError`; typed failure | M11 |
| §5.3 ledger-write failure interrupts | 54 | `packages/broker/src/runtime-broker.ts` | `test/phase3a/adversarial/ledger-failure.test.ts` | `ledger_write_failed` interruption | M23 |
| §5.4 host-owned auth; four-way environment equality; no custody | 37, 50 | `packages/supervisor/src/environment.ts` | `test/phase3a/environment-equality.test.ts` | missing-variable failure; ambient leak assertion | M16, M22 |
| §5.4 auth expiry interrupts | 54 | `packages/supervisor/src/attestation.ts` | `test/phase3a/adversarial/auth-expiry.test.ts` | `authentication_expired`; new envelope required | M23 |
| §5.5 capability record fields and location | 35, 36 | `packages/protocol/src/capability-record.ts`, `packages/storage/src/capability-store.ts` | `packages/storage/test/capability-store.test.ts` | parse failure; path rejection | M15 |
| §5.6 redaction limits; agent-printed residual documented | 55 | `apps/madbridge/src/commands/export-evidence.ts` | `test/phase3a/evidence-pipeline.test.ts` | secret found in export fails the test | M24 |
| §5.7 no automatic deletion | 28, 36 | `packages/storage/src/{session-storage,capability-store}.ts` | `packages/storage/test/*.test.ts` | any deletion path fails the test | M11, M15 |
| §6.1 pure and property tests | 3–11, 15–21, 26–28, 35, 37, 40 | — | all package test suites | RED-first per task | M2–M18 |
| §6.2 architecture assertions (ten bullets) | 2, 6, 7, 15, 33, 34, 41, 48, 59 | — | `test/phase3a/architecture-phase3a.test.ts` | assertion failure blocks the milestone | M1–M26 |
| §6.3 deterministic fixture runtime (twelve bullets) | 48–50, 55 | — | `test/phase3a/harness-*.test.ts`, `evidence-pipeline.test.ts` | typed result plus zero residuals | M22, M24 |
| §6.4 adversarial process tests (nineteen scenarios) | 51–54 | — | `test/phase3a/adversarial/**` | observed timings vs §9.8 deadlines | M23 |
| §6.5 dual-host certification evidence | 58 | — | both `docs/verification/2026-08-12-phase-3a-dual-host-*.md` | missing or divergent SHA blocks merge | M26 |
| §6.6 surface investigations — preliminary | **60** | — | `docs/verification/phase-3a-antigravity-preliminary.md` | preliminary only; does not satisfy §6.6's record requirement | Stage 0 |
| §6.6 surface investigations — formal | 56, 57 | — | investigation reports + capability records | failing surface excluded; foundation still merges | M25 |
| §6.7 single-writer review workflow | §11 | — | `docs/verification/phase-3a-correction-rounds.md` | verdicts pin exact SHAs | every checkpoint |
| §6.8 merge gate (17 items) | 59 | — | `test/phase3a/architecture-phase3a.test.ts` + reports | any item false blocks merge | M26 |
| §6.9 Phase 3B gate-removal evidence | — | — | **out of scope** | any attempt is a stop condition | — |

### 6.3 Sections 7–9 and the named lifecycle records

| Requirement | Task | Production file | Test / evidence | Failure behavior | Checkpoint |
| --- | --- | --- | --- | --- | --- |
| §7 builder qualification rubric | §11 | — | `docs/verification/phase-3a-correction-rounds.md` | reassignment triggers per §7.6 | every checkpoint |
| §9.1 canonical identity, normalization, registry | 3–6 | `packages/protocol/src/{normalization,surface-id,adapter-registry,task-envelope}.ts` | `packages/protocol/test/*.test.ts` | `identity_mismatch`; parse failure | M2 |
| §9.2 pair eligibility and canonical matching | 8, 9 | `packages/protocol/src/pair-constraints.ts` | `packages/protocol/test/pair-constraints.test.ts` | typed `PairEligibilityFailure` | M3 |
| §9.3 closed command/result contract and error matrix | 20, 21 | `packages/broker/src/{client,command-legality}.ts` | `packages/broker/test/{broker-client-contract,command-legality}.test.ts` | exact pinned error code | M9 |
| §9.4 snapshot and output fields | 20, 22 | `packages/broker/src/client.ts` | `packages/broker/test/broker-client-contract.test.ts` | `tsc` rejection of extra/missing fields | M9, M10 |
| §9.5 fencing lifecycle and prefix table | 16, 18, 19 | `packages/broker/src/{fencing,runtime-broker,next-start-reconciliation}.ts` | `packages/broker/test/{fencing,next-start-reconciliation}.test.ts` | `ReconciliationOrderError` | M7, M8 |
| §9.6 single reducer, typed lifecycle, atomic pair | 10–14, 25 | `packages/protocol/src/lifecycle-events.ts`, `packages/ledger/src/{rebuild,ledger}.ts` | `packages/ledger/test/*.test.ts`, `packages/broker/test/incident-atomicity.test.ts` | `ReducerError`; transaction rollback | M4–M6, M10 |
| §9.7 `madv-pty-host` artifact and Bun spike primitive | 38, 41 | `packages/pty-host/src/main.ts` | `packages/pty-host/test/main-guard.test.ts` | `no_control_channel`; spike gate | M17, M18 |
| §9.8 fixed deadlines | 43, 44, 53 | `packages/pty-host/src/signals.ts` | `test/phase3a/adversarial/wedged-host.test.ts` | deadline exceeded fails the test | M19, M23 |
| §9.9 `init` and CLI truth surface | 29–32 | `apps/madbridge/src/commands/init.ts`, `cli.ts` | `apps/madbridge/test/{init-storage,cli-gate,cli-placeholders}.test.ts` | repository write fails the test | M12, M13 |
| §9.10 legacy disposition (twelve rows) | 33, 34 | `packages/broker/src/index.ts` and adapters | `test/phase3a/architecture-phase3a.test.ts` | export/import assertion failure | M14 |
| §9.11 harness entry and production separation | 48 | — | `test/phase3a/harness-separation.test.ts` | import-graph assertion failure | M22 |
| §9.12 secret-environment wording | 37, 50 | `packages/supervisor/src/environment.ts` | `test/phase3a/environment-equality.test.ts` | secret in diagnostics fails the test | M16, M22 |
| §9.13 live attestation eligibility | 45, 56 (preliminary signal from **60**) | `packages/supervisor/src/attestation.ts` | Antigravity investigation; Task 60's preliminary report is an early indicator only and confers no eligibility | surface ineligible for a live pair | Stage 0, M20, M25 |
| §9.14 F1–F6 corrections | 16, 15, 8, 21, 3, 21 | as listed above | as listed above | as listed above | M3, M7, M9 |
| §9.15 N1–N3 and remaining F4 | 12, 16, 25, 24 | `packages/ledger/src/rebuild.ts`, `packages/broker/src/{next-start-reconciliation,runtime-broker,publish-legality}.ts` | corresponding test files | typed failures | M5, M7, M10 |

### 6.4 Named lifecycle records and behaviors

| Item | Task | Production file | Test | Failure behavior | Checkpoint |
| --- | --- | --- | --- | --- | --- |
| `session_open` | 12, 14, 46 | `packages/ledger/src/rebuild.ts`, `packages/supervisor/src/build.ts` | `reduce-ledger-event.test.ts` row test; `build-rollback.test.ts` | rollback boundary; before it the directory may be removed | M5, M21 |
| `fencing_token_issued` | 12, 18, 19 | `packages/broker/src/fencing.ts` | `fencing.test.ts` | value `1` initially; `+1` per transfer; phase unchanged | M8 |
| `session_activated` | 12, 19 | `packages/broker/src/runtime-broker.ts` | `fencing.test.ts` | requires `starting`, valid token, complete ready set | M8 |
| `session_paused` | 12, 21 | `packages/ledger/src/rebuild.ts` | `reduce-ledger-event.test.ts` | requires `active`; token unchanged | M5 |
| `session_resumed` | 12, 17, 21 | `packages/ledger/src/rebuild.ts` | `reduce-ledger-event.test.ts`, `session-machine.test.ts` | requires `paused`; no token increment | M5, M8 |
| `session_interrupted` | 11, 12, 25 | `packages/protocol/src/lifecycle-events.ts` | `lifecycle-events.test.ts`, `incident-atomicity.test.ts` | non-null reason code; typed payload; phase `interrupted` | M4, M10 |
| `fencing_token_invalidated` | 12, 18 | `packages/broker/src/fencing.ts` | `fencing.test.ts` | requires a recognized prefix; never infers phase | M8 |
| `session_closing` | 12, 19 | `packages/broker/src/runtime-broker.ts` | `fencing.test.ts` | `active` (Founder) or `interrupted` (interruption) only | M8 |
| `session_closed` | 12, 19 | `packages/broker/src/runtime-broker.ts` | `fencing.test.ts` | requires `closing` and matching closure kind and incident ID | M8 |
| `session_abort` | 12, 47 | `packages/supervisor/src/build.ts` | `build-rollback.test.ts` | requires incomplete `starting` | M21 |
| `session_unclean_closure` | 16, 51 | `packages/broker/src/next-start-reconciliation.ts` | `next-start-reconciliation.test.ts`, `supervisor-death.test.ts` | only when no typed terminal prefix exists | M7, M23 |
| `approval_resolved` | 12, 21 | `packages/ledger/src/rebuild.ts` | `reduce-ledger-event.test.ts`, `command-legality.test.ts` | requires `active`; removes the matching pending approval | M5, M9 |
| publish-event legality | 24 | `packages/broker/src/publish-legality.ts` | `publish-legality.test.ts` | six-row matrix with fixed precedence | M10 |
| incident atomicity | 25 | `packages/broker/src/runtime-broker.ts` | `incident-atomicity.test.ts` | one transaction; no intervening snapshot | M10 |
| deterministic validation precedence | 11, 24 | `packages/protocol/src/lifecycle-events.ts`, `packages/broker/src/publish-legality.ts` | `lifecycle-events.test.ts`, `publish-legality.test.ts` | first matching stage wins | M4, M10 |
| recognized partial-prefix completion | 16 | `packages/broker/src/next-start-reconciliation.ts` | `next-start-reconciliation.test.ts` | six-row table | M7 |
| impossible-order failure | 12, 16 | `packages/ledger/src/rebuild.ts` | `reduce-ledger-event.test.ts` | `ReducerError("impossible_order")` | M5, M7 |
| snapshot and output sequence invariants | 22, 23 | `packages/broker/src/in-process-client.ts` | `in-process-client.test.ts` | typed interruption | M10 |
| PTY input/resize/terminate fencing | 21 | `packages/broker/src/command-legality.ts` | `command-legality.test.ts` | `session_not_writable` / `incident_active` / `stale_fencing_token` | M9 |
| ledger-write failure | 54 | `packages/broker/src/runtime-broker.ts` | `ledger-failure.test.ts` | `ledger_write_failed` | M23 |
| auth expiry | 54 | `packages/supervisor/src/attestation.ts` | `auth-expiry.test.ts` | `authentication_expired` | M23 |
| host failure | 44, 53 | `packages/broker/src/pty-host-supervisor.ts` | `wedged-host.test.ts` | `pty_host_failure` | M19, M23 |
| supervisor death | 51 | `packages/supervisor/src/build.ts` | `supervisor-death.test.ts` | all children die; unclean closure recorded next start | M23 |
| fixture-only startup | 48 | — | `harness-separation.test.ts` | `RealSurfaceRejected` | M22 |
| production gate truthfulness | 30, 59 | `apps/madbridge/src/commands/start.ts` | `cli-gate.test.ts`, merge-gate block | exit `78` with the exact payload | M13, M26 |

---

## 7. Adversarial verification

Every scenario below names the exact file, the exact test name, and the fixture it needs. All timing assertions use `performance.now()` and report observed durations; none may assert only “pass”.

| # | Scenario | File | Exact test name | Fixture required |
| --- | --- | --- | --- | --- |
| 1 | Supervisor clean exit | `test/phase3a/adversarial/supervisor-death.test.ts` | `supervisor clean exit terminates every governed child` | `startFixtureSessionInChildProcess` |
| 2 | Supervisor ordinary signal | same | `supervisor SIGTERM terminates every governed child` | same |
| 3 | Supervisor crash | same | `supervisor crash terminates every governed child` | fixture that throws after activation |
| 4 | Supervisor `SIGKILL` | same | `supervisor SIGKILL terminates every governed child and leaves no typed terminal prefix` | same |
| 5 | Two governed PTYs plus an adapter; no inherited lifeline writer leaks | `test/phase3a/adversarial/descriptor-hygiene.test.ts` | `with two PTY hosts and an adapter, no process holds a sibling's lifeline write end` | two-execution + one-adapter harness; `lsof` enumeration |
| 6 | Descendant process-group termination | `test/phase3a/adversarial/process-group.test.ts` | `a grandchild in the governed process group is terminated` | fixture child that forks a grandchild |
| 7 | Wrapper/host death | same | `PTY-host exit interrupts the whole session with pty_host_failure` | fixture host that exits after `ready` |
| 8 | Deliberate lifeline EOF | same | `deliberate lifeline EOF terminates that child's process group only` | two-host harness |
| 9 | Child ignores `SIGTERM` | same | `a child that ignores SIGTERM is SIGKILLed within the outer bound` | fixture child trapping `SIGTERM` |
| 10 | `SIGSTOP` wedged-host direct-PGID escalation | `test/phase3a/adversarial/wedged-host.test.ts` | `a SIGSTOPped host is cleared through the direct PGID path` | `wedgeHostAfter` fault switch |
| 11 | Bounded deadlines on a monotonic clock with observed timings | same | `a wedged host earns no responsive-host grace` · `every governed process is gone within 5000 ms` | monotonic timing harness |
| 12 | PTY resize propagation | `test/phase3a/harness-lifecycle.test.ts` | `pty_resize propagates the exact cols and rows to the child` | fixture child reporting `TIOCGWINSZ` |
| 13 | Ordered output frames | same | `exact bytes written through pty_input are echoed on the output stream` | echo fixture adapter |
| 14 | Output sequence gaps | `test/phase3a/adversarial/sequence-invariants.test.ts` | `an output sequence gap interrupts the session` | `skewOutputSeq` fault switch |
| 15 | Snapshot sequence gaps | same | `a snapshot sequence gap interrupts the session` | `skewSnapshotSeq` fault switch |
| 16 | Stale session / surface / execution / token writes | `packages/broker/test/command-legality.test.ts` | `legality row: pty_input in any non-active phase yields session_not_writable` · `a stale fencing token yields stale_fencing_token, not session_not_writable` · `a command carrying a foreign sessionId fails with session_mismatch` (in `in-process-client.test.ts`) | none |
| 17 | Binary replacement between preflight and exec | `test/phase3a/adversarial/attestation-drift.test.ts` | `replacing the executable between preflight and exec is caught by the adjacent re-hash` | `swapBinaryBeforeExec` fault switch |
| 18 | Attestation mismatch | same | `live attestation mismatch interrupts the session with identity_mismatch` | fixture reporting a different model at re-attestation |
| 19 | Auth-readiness failure and mid-session expiry | `test/phase3a/adversarial/auth-expiry.test.ts` | `mid-session authentication expiry interrupts with authentication_expired` · (preflight case) `preflight fails with auth_not_ready` in `packages/supervisor/test/preflight.test.ts` | `expireAuthAfter` fault switch |
| 20 | Environment equality across probes, auth checks, PTY hosts, children | `test/phase3a/environment-equality.test.ts` | `the identity probe, auth probe, PTY host, and governed child receive byte-identical environments` | four-way environment dump |
| 21 | Ambient-environment leakage | same | `no ambient variable outside the allowlist reaches any of the four` | seeded ambient variables |
| 22 | `$HOME` versus passwd-home divergence | `packages/storage/test/home.test.ts` | `a $HOME that does not resolve to the passwd home is a typed failure` | none |
| 23 | Symlink, ownership, mode, in-repository storage rejection | `packages/storage/test/storage-root.test.ts` | `storage root rejects symlink_component` · `storage root rejects not_owned_by_uid` · `storage root rejects group_or_other_accessible` · `storage root rejects inside_repository` | `mkdtemp` + `symlinkSync` + `chmodSync` |
| 24 | Disk / ledger write failure | `test/phase3a/adversarial/ledger-failure.test.ts` | `a mid-session append failure interrupts with ledger_write_failed` | `failLedgerAppendAfter` fault switch |
| 25 | Rollback before and after `session_open` | `packages/supervisor/test/build-rollback.test.ts` | `rollback before session_open removes the session directory` · `rollback after step session_open leaves no partial session` | injected failure per build step |
| 26 | Interruption and Founder-close prefix recovery | `packages/broker/test/next-start-reconciliation.test.ts` | `prefix completion: interrupted_only` · `prefix completion: interruption_through_closing` · `prefix completion: founder_close_at_closing` | durable-prefix fixtures |
| 27 | Malformed and unauthorized publication | `packages/broker/test/publish-legality.test.ts` | `a malformed incident in a closed session is invalid_command, not session_not_writable` · `an execution principal publishing another execution's sender id is unauthorized` | none |
| 28 | Legacy execution pause/resume/close rejection | same | `a legacy execution-authored pause is rejected with unauthorized in every phase` | none |
| 29 | Socket / start / harness structural-reachability violations | `test/phase3a/architecture-phase3a.test.ts` and `test/phase3a/harness-separation.test.ts` | `no production or harness file imports socket.ts` · `start.ts imports no runtime module` (in `cli-gate.test.ts`) · `no file under apps/ or packages/*/src statically imports, command-dispatches to, or argument-gates runtime-harness` | source scan and fail-closed AST structural scan |
| 30 | Production-start bypass attempts | `apps/madbridge/test/cli-gate.test.ts` | `start ignores every flag and argument` | flag/argument matrix |
| 31 | No hidden environment or argument flag | same + `packages/pty-host/test/main-guard.test.ts` | `start performs no filesystem read` · `an ambient MADV_ variable confers no launch authority` | seeded `MADV_*` variables |
| 32 | Test-count and skipped-test checks | `test/phase3a/architecture-phase3a.test.ts` | `no required test file uses test.skip or describe.skip without a disposition marker` · `merge gate item 1: the suite has not regressed below the Phase 2 floor` | source scan |
| 33 | Second-surface launch failure after the first is up | `test/phase3a/adversarial/cleanup-residuals.test.ts` | `the first surface is torn down when the second surface fails to launch` | `failSecondSurfaceLaunch` fault switch |
| 34 | Global residual sweep | same | `no child, descendant, host, descriptor, open ledger session, or live fencing token remains after the adversarial suite` | PID and descriptor census |

---

## 8. Dual-host verification

Both procedures run the **same commit**, on a **clean worktree**, at the **same SHA**. Neither host may transcribe the other’s numbers. A single-host run certifies nothing.

### 8.1 Host A — Founder iMac

```text
Architecture: x86_64
macOS: 13.7.8
Bun: 1.3.14
TERM: xterm-256color
Shell: /bin/zsh
```

### 8.2 Host B — Founder MacBook

```text
Architecture: arm64
macOS: 26.6.1
Bun: 1.3.14
TERM: xterm-256color
Shell: /bin/zsh
```

### 8.3 Identical required commands (run in this order on each host)

```bash
# 0. Environment and identity capture
uname -m
sw_vers
bun --version
which bun
shasum -a 256 "$(which bun)"
printf '%s\n' "$TERM"
printf '%s\n' "$SHELL"

# 1. Repository state capture. All diffs compare against SOURCE_BASELINE_SHA (§0A),
#    never against IMPLEMENTATION_BASE_SHA — the baseline is what the file map and
#    the 714/2606/35 suite floor were measured against.
SOURCE_BASELINE_SHA=aa16032c56fdf6c7105e99b1765ed9365d605bf4
git rev-parse HEAD
git branch --show-current
git status -sb
git ls-files --others --exclude-standard
git diff --name-only "$SOURCE_BASELINE_SHA"

# 2. Static verification
bunx tsc --noEmit
git diff --check "$SOURCE_BASELINE_SHA"

# 3. Complete suite (unfiltered — this is the number that goes in the report)
bun test

# 4. Layered verification
bun test test/architecture-boundaries.test.ts test/phase3a/architecture-phase3a.test.ts
bun test test/phase3a/harness-separation.test.ts
bun test test/phase3a/spike
bun test test/phase3a/adversarial
bun test packages/pty-host packages/supervisor packages/storage
bun test packages/protocol packages/ledger packages/broker
bun test apps/madbridge

# 5. Production-surface acceptance
bun apps/madbridge/src/cli.ts start --json; echo "exit=$?"
bun apps/madbridge/src/cli.ts status --json; echo "exit=$?"
bun apps/madbridge/src/cli.ts pause --json; echo "exit=$?"
bun apps/madbridge/src/cli.ts resume --json; echo "exit=$?"
bun apps/madbridge/src/cli.ts close --json; echo "exit=$?"
bun apps/madbridge/src/cli.ts --help

# 6. Negative controls. Implemented in Bun rather than shell `find`, so the check
#    is one implementation with identical semantics on both target Macs and carries
#    no shell-portability surface at all. It resolves the passwd home exactly as
#    §5.2 requires — $HOME is never trusted here, since trusting it would contradict
#    the very invariant this plan enforces — bounds the walk to depth 6, never
#    follows symlinks, prints per-root match counts rather than relying on an exit
#    status that would be 0 either way, and exits 1 on any hit.
bun test/phase3a/negative-control.ts; echo "negative_control_exit=$?"   # expect 0

# 7. Residual sweep — report a count, not an exit status.
echo "pty_host_processes=$(pgrep -f madv-pty-host | wc -l | tr -d ' ')"   # expect 0

# 8. Report checksum over the report BODY ONLY — every line before the
#    trailing "Report SHA-256:" line, so the checksum never hashes itself.
HOST=imac        # Host A. On Host B use: HOST=macbook
REPORT="docs/verification/2026-08-12-phase-3a-dual-host-$HOST.md"
awk '/^Report SHA-256:/{exit} {print}' "$REPORT" | shasum -a 256
```

**`test/phase3a/negative-control.ts`** (created in M14, Task 34) is the single implementation of this check. It walks three roots to a depth bound of 6: the resolved storage root (`MADV_STORAGE_DIR` override or the passwd-home default), the **fixed literal** quarantined legacy path `/tmp/madv-broker-runtime`, and the repository worktree. For each it prints `broker_sock_matches[<root>]=<n>`, names every hit, checks that `<storage-root>/runtime` is absent per §5.1, and exits `1` if anything is found.

**Why the legacy path is a literal.** The script does **not** read `MADV_RUNTIME_DIR`. That variable is quarantined by §4.4 and production storage resolution ignores it entirely; reading it even in a verification script would imply it remains active configuration. The literal `/tmp/madv-broker-runtime` is audited only as the historical default of the dormant `packages/broker/src/socket.ts:6-7` scaffolding, and the script labels it as such.

**Scope of the negative control.** It asserts that no `broker.sock` exists under those three roots. It deliberately does **not** claim "no socket anywhere on the machine" — that is broader than the §4.4 invariant, is unverifiable without an unbounded root scan, and would silently swallow permission errors. The structural guarantee that no such path is *reachable* is carried by the architecture tests in Task 34, not by this filesystem sweep.

### 8.4 Expected evidence artifacts

| Artifact | Host A | Host B |
| --- | --- | --- |
| `docs/verification/2026-08-12-bun-terminal-spike-imac.md` | required | — |
| `docs/verification/2026-08-12-bun-terminal-spike-macbook.md` | — | required |
| `docs/verification/2026-08-12-phase-3a-dual-host-imac.md` | required | — |
| `docs/verification/2026-08-12-phase-3a-dual-host-macbook.md` | — | required |

### 8.5 Required timing measurements (recorded as observed milliseconds, per §9.8)

| Measurement | Bound | Recorded from |
| --- | --- | --- |
| Host acknowledgement of any command | ≤ 250 ms | `wedged-host.test.ts`, spike criterion `exact_io` |
| `termination_started` after terminate | ≤ 500 ms | `signals.test.ts` |
| Escalation initiation after missed ack or lifeline loss | ≤ 500 ms | `wedged-host.test.ts` |
| Responsive-host child grace | 2000 ms (applies only after a responsive host confirms `SIGTERM`) | `signals.test.ts` |
| Unresponsive / `SIGSTOP` host grace | **none** — direct PGID path | `wedged-host.test.ts` |
| All governed processes gone | ≤ 5000 ms | `cleanup-residuals.test.ts` |

### 8.6 Capability-record fields to capture on each host

`surface` · `provider` · `requested_model` · `role_eligibility` · `independence_domain` · `organization_id` · `cli_version` · `binary_path` · `binary_sha256` · `evaluated_at` · `expires_at` · `host.{arch, macos_version, macos_build, bun_version, bun_path, bun_sha256, term, shell}` · `identity_attestation.{result, primitive, sanitized_facts}` · `auth_readiness.{result, primitive}` · `pty.{result, observed_ms}` · `independent_review_eligible` · `limitations` · `overall` · `redaction_rules_applied`

### 8.7 Report contents (both hosts, identical structure)

1. Candidate commit SHA and branch
2. Clean/dirty worktree state and the exact output of `git status -sb`, `git ls-files --others --exclude-standard`, and `git diff --name-only <baseline>`
3. Bun executable path, version, and SHA-256
4. Architecture, macOS version and build, `TERM`, shell
5. Every command from §8.3 with its complete, unfiltered output counts
6. Each of the thirteen spike criteria — with every sub-assertion of the four compound criteria listed individually — and each adversarial criterion, with measured timings in milliseconds
7. Failures, retries, warnings, and residual risks — including the §3.5 `setsid` residual and the §5.6 agent-printed-secret residual, both stated as known and unsolved
8. `Report SHA-256: <hex>` as the final line, computed over the body above it

### 8.8 Pass/fail criteria

**Pass** requires all of: identical candidate SHA on both reports; clean worktree on both; `bun test` complete-suite counts ≥ 714 / 2606 / 35 with 0 failures; `bunx tsc --noEmit` exit 0; `git diff --check` clean; every spike and adversarial criterion `pass: true` within its §9.8 bound; all five production commands returning their exact gated payloads and exit codes (`78` for `start`, `69` for the four placeholders); zero `broker.sock` found; zero residual `madv-pty-host` processes; both reports checksummed.

**Fail** on any of the above — and specifically: a divergent SHA between reports, a filtered test invocation used as the suite count, a missing observed timing, a machine-specific source branch introduced to make one host pass, or a report written for a host that was not actually run.

### 8.9 What must stop the phase rather than be weakened

- A `Bun.Terminal` criterion failing on either host. **Do not** substitute FFI `posix_openpt`, `node-pty`, another native dependency, or a pipe fallback. Stop, write the evidence report, and escalate for a Founder-approved design amendment (§9.7).
- A deadline in §9.8 that cannot be met. **Do not** raise the number. Stop and escalate.
- Process-group containment that cannot be demonstrated. **Do not** narrow the claim silently. Stop and escalate.
- A dual-host divergence that could be “fixed” by a machine-specific branch. §6.5 forbids that substitute. Stop and escalate.

---

## 9. Surface investigations

### 9.1 Order and authority

Antigravity is investigated **first** (§2.3), because the planned live pairing depends on it. The identity rubric (§2.2) and the auth-readiness rubric (§5.4) are fixed **before** the first investigation begins and may not be edited during or after it to accommodate a result. Editing a rubric mid-investigation is a §7.4 material scope expansion and a §7.6 evidence disqualifier.

### 9.2 The machine-verifiable identity rubric applied to every surface

**Passing evidence (either one):**
- a documented CLI or API primitive returning the resolved provider and exact model **for the actual session**; or
- structured per-session or per-response metadata naming the provider and exact model **actually used**.

**Failing evidence (all of these):** configuration files; requested flags or environment values; marketing names or version banners; unstructured prose; behavioral inference; cached attestations; any statement of requested intent rather than resolved fact.

### 9.3 Required record for every investigated surface, pass or fail

**Scope of this rule.** It governs **formal** investigations — Tasks 56 and 57. **Task 60 is a preliminary evidence pass and is expressly outside it:** Task 60 produces a human-readable report only, creates no capability record, and confers no eligibility on any surface. Task 56 remains the formal Antigravity investigation and **must not reuse Task 60's attestation as fresh session evidence** — §2.1 forbids reusing an attestation across sessions, and §2.3 ties every capability record to a specific binary hash, CLI version, host, and date. Task 60 satisfies specification §2.3's "investigated first" ordering; it does not satisfy §6.6's record requirement.

Every **formal** investigation — including a failing one — produces both a machine-readable `CapabilityRecordV1` under `<storage-root>/capability/<surface>/` and a human-readable report under `docs/verification/`, containing:

- exact CLI version, absolute binary path, and binary SHA-256;
- host architecture, macOS version and build, Bun version/path/hash, `TERM`, shell;
- every primitive attempted, with the exact command line and sanitized output;
- structured modes tried and session metadata observed;
- the identity-attestation verdict and, on failure, **the precise rubric clause not met**;
- the auth-readiness verdict, including `no_primitive` where none is documented;
- evaluation date and expiration horizon;
- `independence_domain` and `organization_id` copied from the adapter registration at investigation time;
- independent-review eligibility and known limitations;
- overall pass/fail and the redaction rules applied.

### 9.4 Antigravity

Expected baseline outcome per §9.13: `overall: "fail"`, because no qualifying exact-model primitive for the actual session has been established. The existing adapter’s `agy config get model` probe (`packages/adapter-antigravity/src/attestation.ts:41`) reads a **configuration** value and is failing evidence under §2.2 — it may be recorded as an attempted primitive but never as a pass. A passing result would be a new, reviewable finding requiring its own Founder ruling.

Antigravity’s role as an investigated execution surface is independent from Gemini Antigravity’s Tier-2 reviewer role (§6.6). Failure of the `agy` CLI attestation does not disqualify the reviewer or block review of the foundation.

### 9.5 Founder-approved alternatives

Claude, Codex, Grok, Cursor, and any other surface the Founder names may receive a controlled investigation record under the identical rubric. Investigating a surface the Founder has not named is unapproved scope expansion.

### 9.6 Enforced properties

| Property | How this plan enforces it |
| --- | --- |
| Capability records are dated observations, not whitelists | `evaluateCapabilityFreshness` (Task 35) requires binary hash, CLI version, host, and horizon to still match; `test("a passing record is not a live authorization")` asserts the module exports no authorization function |
| Exact CLI version, binary path, binary hash, architecture, OS, and evidence commands are recorded | `CapabilityRecordV1` required fields; parser rejects a record missing any of them (Task 35) |
| Config strings and requested flags do not prove resolved identity | `test("no configured model string is accepted as identity evidence")` (Task 56) |
| No machine-verifiable actual-session model primitive ⇒ ineligible for a live pair | `runPurePreflight` returns `identity_mismatch`; `test("a surface without an actual-session identity primitive is ineligible")` (Task 45) |
| Fixture work may continue behind the production gate | M22–M24 depend on fixture surfaces only; `test("the harness rejects a real registered surface")` (Task 48) |
| Alternatives require a new Founder-authorized envelope | No code path promotes a capability record into an envelope; `evaluatePairEligibility` reads only the envelope (Task 9) |
| No preselection or automatic fallback | `test("no alternative is marked preselected or default")` (Task 57) |
| No mid-session substitution | Structurally impossible: any surface failure invalidates the token and drives the terminal-bound interruption sequence (Tasks 17, 19, 25); `session_resume` is legal only from `paused` (Task 21) |

---

## 10. ⛔ STOP CONDITIONS — read before every task

**If any condition below occurs, stop immediately. Do not improvise, do not work around it, do not "fix it and mention it later." Report the evidence and await a new Founder ruling.**

Implementing first and disclosing afterward is a qualification failure under §7.4 **even if the code is technically sound**.

| # | Stop condition | Required response |
| --- | --- | --- |
| 1 | An **authority-bearing ambiguity** — any question whose answer would change authorization, lifecycle truth, fencing, storage, containment, transport, identity, ledger semantics, or the production gate | Halt the task. Quote the exact specification sentences that conflict or are silent. Await the ruling. |
| 2 | A **contradiction between the approved specification and the live repository** | Halt. Record both the specification citation and the exact `file:line`. Do not choose a side. |
| 3 | An **unplanned production file** — a file not listed in §3 needs to be created or modified | Halt. Name the file and the requirement forcing it. This is material scope expansion (§7.4). |
| 4 | A **new external or native dependency** would be needed | Halt. §9.7 and §7.4 forbid it. FFI, `node-pty`, and any native bridge are not available. |
| 5 | **`Bun.Terminal` fails any §3.6 criterion on either Founder Mac** | Halt M18, M19, M21, M23. Write the evidence report with observed values. Escalate for a design amendment. No pipe fallback. |
| 6 | **Process-group containment cannot be satisfied** | Halt. Do not silently narrow the claim in §3.5. |
| 7 | A request or temptation to **weaken the start gate or harness separation** | Halt. §§4.2, 9.11, 6.9. Gate removal is a Phase 3B certification event. |
| 8 | A **required test cannot first fail for the expected reason** | Halt. A test that passes on creation, or fails for an unrelated reason, has established nothing. Fix the test; if it still cannot go RED, the requirement may already be violated or misunderstood — escalate. |
| 9 | **Test-count regression** below 714 tests / 2606 `expect()` / 35 files | Halt. §6.8.1. Restore coverage before proceeding. |
| 10 | **Skipped or disabled required coverage** — any `.skip`, `.only`, filter, quarantine, rename out of discovery, or weakened assertion without an explicit Founder-visible disposition | Halt. §6.8.1. |
| 11 | An **unreviewed change to identity, pair eligibility, lifecycle, fencing, ledger, storage, or containment semantics** would be required | Halt. §7.4. |
| 12 | **Credentials or secret material would enter evidence**, a diagnostic, an error message, a log, or a committed report | Halt immediately. Do not commit. Purge, then escalate. §§5.4, 5.6, 9.12. |
| 13 | **The required durable evidence cannot be produced** — a report, capability record, timing measurement, or checksum cannot be generated honestly | Halt. Never fabricate, estimate, or transcribe another host's result. §7.6 treats fabricated, suppressed, selectively omitted, or weakened evidence as a disqualifier. |
| 14 | **More than two active surfaces** would exist at any moment | Halt. §1.2. |
| 15 | Any need to **alter the approved specification or `DEC-20260812-01`** | Halt. Neither document is editable by the implementer. |
| 16 | A **`PLAN-OPEN-*` value is needed and no Founder ruling exists** | Halt at that task's precondition. §1A. |
| 17 | A reviewer verdict would require **changing an authority boundary** rather than fixing an implementation defect | Halt. Route to the Founder as a design question, not a correction round. |
| 18 | A host report is **`NOT_FILEABLE`** — it fails the Task 39 aggregation admission gate on candidate SHA, checksum recomputation, §6.5 field-group conformance, or host origination | Halt Task 39. Preserve the report **unchanged** as rejected evidence. Record the report identity and failed condition **outside the report**, in the Task 39 PR description or a review note. Do not edit, annotate, complete, normalize, or substitute the report, and do not repair it by inference or aggregation. Founder ruling 2026-08-21. |

**Escalation format.** Every stop produces: the exact task and step; the specification citations; the live-repository `file:line` evidence; the observed command output verbatim; the two or more readings if it is an ambiguity; and an explicit statement that no code was written to resolve it.

---

## 11. Commit and review strategy

**No commit in this plan is created now.** These are proposals for the authorized implementer.

### 11.1 Per-commit requirements

Every proposed commit in §5 carries: the exact files to stage (Step 7 lists them; `git add -A` is prohibited), the exact commit message, the focused tests (Step 4), the broader checks (Step 5), and the reviewer checkpoint (Step 8).

### 11.2 Commit ledger

| Milestone | Tasks | Commits | Reviewer checkpoint |
| --- | --- | --- | --- |
| **Task 60 (the only task outside M1–M26)** | **60** | **1** | **Founder review of the investigation verdict** |
| M1 | 1–2 | 2 | Plato/Codex pre-commit |
| M2 | 3–6 | 4 | Plato/Codex; Founder ruling on `PLAN-OPEN-1` before Task 6 |
| M3 | 7–9 | 3 | Plato/Codex |
| M4 | 10–11 | 2 | Plato/Codex |
| M5 | 12 | 1 | Plato/Codex + Tier-2 (reducer is authority-bearing) |
| M6 | 13–14 | 2 | Plato/Codex |
| M7 | 15–16 | 2 | Plato/Codex + Tier-2 (prefix table is authority-bearing) |
| M8 | 17–19 | 3 | Plato/Codex + Tier-2 (fencing is authority-bearing) |
| M9 | 20–21 | 2 | Plato/Codex |
| M10 | 22–25 | 4 | Plato/Codex + Tier-2 (incident atomicity is authority-bearing) |
| M11 | 26–28 | 3 | Plato/Codex |
| M12 | 29 | 1 | Plato/Codex |
| M13 | 30–32 | 3 | Plato/Codex + Tier-2 (the gate is authority-bearing) |
| M14 | 33–34 | 2 | Plato/Codex; Founder rulings on `PLAN-OPEN-4` and `PLAN-OPEN-6` before Task 34 |
| M15 | 35–36 | 2 | Plato/Codex; Founder ruling on `PLAN-OPEN-3` before Task 35 |
| M16 | 37 | 1 | Plato/Codex; Founder ruling on `PLAN-OPEN-2` before Task 37 |
| M17 | 38–39 | 2 | **Founder gate review** — both hosts |
| M18 | 40–41 | 2 | Plato/Codex |
| M19 | 42–44 | 3 | Plato/Codex + Tier-2 (containment is authority-bearing) |
| M20 | 45 | 1 | Plato/Codex |
| M21 | 46–47 | 2 | Plato/Codex + Tier-2 (rollback is authority-bearing) |
| M22 | 48–50 | 3 | Plato/Codex + Tier-2 (harness separation is authority-bearing) |
| M23 | 51–54 | 4 | Plato/Codex |
| M24 | 55 | 1 | Plato/Codex |
| M25 | 56–57 | 2 | Founder review of investigation verdicts |
| M26 | 58–59 | 2 | **Founder merge review + Tier-2 exact-SHA verdict** |
| | **60 tasks** | **60 commits** | |

### 11.3 Correction-round accounting (§7.3, applied verbatim)

- A **correction round** is one review verdict for one milestone identifying one or more substantive defects requiring implementation or required-test changes. **All substantive findings in the same verdict count as one round.**
- Countable verdicts come from **either** Plato/Codex pre-commit review **or** Gemini Antigravity Tier-2 review. **Each verdict can add at most one round to that milestone.**
- The running count is recorded in `docs/verification/phase-3a-correction-rounds.md` **when the verdict occurs**. It is never reconstructed at qualification time.
- **Denominator (Founder ruling, 2026-08-12):** "one milestone" in the two-round budget and the reassignment trigger means one **rubric §7.2 milestone** as mapped by the §4 table's "Rubric §7.2 milestone" column. Correction rounds on plan milestones sharing a rubric milestone (for example, M5–M8 → rubric milestone 8) accumulate against a single budget of two. The log at `docs/verification/phase-3a-correction-rounds.md` records every verdict under both its plan milestone and rubric milestone; the reassignment trigger evaluates the rubric-milestone total.
- One verdict that contains multiple substantive findings in the same rubric milestone adds one round to that rubric milestone. A verdict that contains substantive findings in more than one rubric milestone adds one round to each affected rubric milestone.
- Reviews of the implementation-plan document before implementation authorization are plan-authoring history, not implementation correction rounds. The rubric-milestone counters begin with verdicts on implemented milestone work; they are currently zero.
- **Does not count:** a new Founder ruling made after the milestone implementation; a host-specific finding impossible to observe on the builder's execution host before the required dual-host run; a reviewer-requested voluntary supplementary test that confirms behavior already correct and already covered as required; editorial clarification that does not change behavior or required evidence.
- **Does count:** absence of a test required by the milestone or by §6 — that is **substantive incompleteness**. Labeling required coverage as "supplementary" is not permitted.
- **Reassignment is required** at more than two correction rounds on one milestone, or on any §7.6 disqualifier.

### 11.4 Builder status

- **Claude Opus 5 remains provisional** as primary implementer, subject to the §7 rubric in full.
- **The same rubric applies to any Founder-authorized successor builder** — Grok 4.5, GLM-5.2, or another — from the moment of reassignment. The milestones, budgets, and disqualifiers are builder-generic.
- **Sound code is preserved if reassignment occurs.** Builder qualification governs who may remain primary implementer; it does not determine whether otherwise sound code is discarded. Existing code receives a separate Founder-approved technical assessment (§7.1).
- One primary implementer owns one milestone at a time. Reviewers do not silently rewrite the implementation. Every review verdict pins an exact commit SHA. Nothing is committed, pushed, opened as a PR, or merged without the Founder's corresponding authorization (§6.7).
- Merge-gate item 11 requires an **approving** Tier-2 verdict for the exact candidate SHA. `REQUEST_CHANGES`, rejection, an inconclusive verdict, or a review of another SHA does not satisfy the gate (§9.16).

---

## 12. Final verification commands

Run these on **both** Founder Macs at the candidate SHA, on a clean worktree.

### 12.1 Pinned baseline commands

```bash
# Diffs compare against SOURCE_BASELINE_SHA (§0A), never IMPLEMENTATION_BASE_SHA.
SOURCE_BASELINE_SHA=aa16032c56fdf6c7105e99b1765ed9365d605bf4
bun test
bunx tsc --noEmit
git diff --check "$SOURCE_BASELINE_SHA"
git status -sb
git ls-files --others --exclude-standard
```

### 12.2 Repository-specific commands

```bash
# Workspace / package-scoped
bun test packages/protocol
bun test packages/ledger
bun test packages/broker
bun test packages/storage
bun test packages/pty-host
bun test packages/supervisor
bun test packages/policy
bun test packages/artifact-store
bun test packages/adapter-claude-code packages/adapter-antigravity
bun test apps/madbridge

# Architecture and separation
bun test test/architecture-boundaries.test.ts
bun test test/phase3a/architecture-phase3a.test.ts
bun test test/phase3a/harness-separation.test.ts

# Ledger and lifecycle
bun test packages/ledger/test/reduce-ledger-event.test.ts
bun test packages/ledger/test/lifecycle-append.test.ts
bun test packages/broker/test/next-start-reconciliation.test.ts
bun test packages/broker/test/fencing.test.ts
bun test packages/broker/test/incident-atomicity.test.ts

# Client contract
bun test packages/broker/test/broker-client-contract.test.ts
bun test packages/broker/test/command-legality.test.ts
bun test packages/broker/test/publish-legality.test.ts
bun test packages/broker/test/in-process-client.test.ts

# Storage
bun test packages/storage/test/home.test.ts
bun test packages/storage/test/storage-root.test.ts
bun test packages/storage/test/session-storage.test.ts
bun test packages/storage/test/capability-store.test.ts

# PTY host and supervisor
bun test packages/pty-host/test/frames.test.ts
bun test packages/pty-host/test/main-guard.test.ts
bun test packages/pty-host/test/launch.test.ts
bun test packages/pty-host/test/signals.test.ts
bun test packages/broker/test/pty-host-protocol.test.ts
bun test packages/broker/test/pty-host-supervisor.test.ts
bun test packages/supervisor/test/preflight.test.ts
bun test packages/supervisor/test/environment.test.ts
bun test packages/supervisor/test/attestation.test.ts
bun test packages/supervisor/test/build-rollback.test.ts

# CLI surface
bun test apps/madbridge/test/cli.test.ts
bun test apps/madbridge/test/cli-gate.test.ts
bun test apps/madbridge/test/cli-placeholders.test.ts
bun test apps/madbridge/test/init-storage.test.ts
bun test apps/madbridge/test/doctor.test.ts

# Fixture harness, spike, adversarial, evidence
bun test test/phase3a/harness-lifecycle.test.ts
bun test test/phase3a/harness-rollback.test.ts
bun test test/phase3a/environment-equality.test.ts
bun test test/phase3a/evidence-pipeline.test.ts
bun test test/phase3a/spike
bun test test/phase3a/adversarial

# Legacy acceptance (must still pass)
bun test test/acceptance

# Production-surface acceptance
bun apps/madbridge/src/cli.ts start --json; echo "exit=$?"   # expect 78
bun apps/madbridge/src/cli.ts status --json; echo "exit=$?"  # expect 69
bun apps/madbridge/src/cli.ts pause --json; echo "exit=$?"   # expect 69
bun apps/madbridge/src/cli.ts resume --json; echo "exit=$?"  # expect 69
bun apps/madbridge/src/cli.ts close --json; echo "exit=$?"   # expect 69

# Negative controls — one Bun implementation, identical on both Macs.
# Bounded to depth 6, symlink-safe, passwd-resolved, count-reporting, exits 1 on any hit.
bun test/phase3a/negative-control.ts; echo "negative_control_exit=$?"     # expect 0
echo "pty_host_processes=$(pgrep -f madv-pty-host | wc -l | tr -d ' ')"   # expect 0

# Package scripts (added in Task 34)
bun run typecheck
bun run test:arch
bun run test:phase3a
bun run test:adversarial
bun run verify:phase3a
```

### 12.3 Reporting rules

- **The final full-suite result must come from the bare `bun test` invocation in §12.1.** A count taken from any filtered, path-scoped, or `-t`-filtered run is not the suite result and may not be reported as one.
- The reported counts are the four values Bun prints: `<n> pass`, `<n> fail`, `<n> expect() calls`, `Ran <n> tests across <n> files`.
- No required test may be skipped, disabled, renamed out of discovery, filtered, quarantined, marked `.only`, or replaced with a weaker assertion without an explicit Founder-visible disposition recorded in `docs/verification/phase-3a-correction-rounds.md`.
- Both dual-host reports must quote their own `bun test` output. Copying the other host's numbers is an evidence disqualifier under §7.6.

---

## 13. Plan self-review

Performed against this document before publication.

### 13.1 Specification section → task coverage

| Section | Covered by |
| --- | --- |
| §0 purpose, authority, phase boundary | Header, §1, §4 gate note, §10.7 |
| §0.1 phase decomposition | §1.22, §4 (no Phase 3B task exists) |
| §1.1 supervisor and boundary | Tasks 20, 22, 46, 47, 51 |
| §1.2 generic identities, exactly two | Tasks 5, 7, 8, 9 |
| §1.3 authority boundaries | Tasks 41, 42 |
| §1.4 exclusions | Tasks 33, 34, 48 |
| §2.1 two-phase startup | Tasks 45, 46, 47 |
| §2.2 identity rubric | Tasks **60** (preliminary), 45, 56 (formal) |
| §2.3 capability matrix and investigations | Tasks **60** (investigated-first ordering), 35, 36, 56, 57 |
| §2.4 Founder-selected re-authorization | Task 57, §9.6 |
| §2.5 live failure semantics | Tasks 17, 19, 25, 51–54 |
| §3.1–3.5 PTY host and containment | Tasks 40–44, 52, 53 |
| §3.6 Bun spike | Tasks 38, 39 |
| §4.1 client contract | Tasks 20–23 |
| §4.2 start gate | Tasks 30, 48, 59 |
| §4.3 placeholders | Tasks 31, 55 |
| §4.4 socket dormancy | Tasks 33, 34 |
| §5.1–5.2 storage | Tasks 26, 27, 28 |
| §5.3 ledger durability | Task 54 |
| §5.4 auth and environments | Tasks 37, 50, 54 |
| §5.5 capability records | Tasks 35, 36 |
| §5.6 evidence and redaction | Task 55 |
| §5.7 retention | Tasks 28, 36 |
| §6.1 Layer 1 | Tasks 3–11, 15–21, 26–28, 35, 37, 40 |
| §6.2 Layer 2 | Tasks 2, 6, 7, 15, 33, 34, 41, 48, 59 |
| §6.3 Layer 3 | Tasks 48–50, 55 |
| §6.4 Layer 4 | Tasks 51–54 |
| §6.5 Layer 5 | Task 58 |
| §6.6 surface investigations | Tasks 56, 57 (Task **60** is preliminary and does not satisfy §6.6) |
| §6.7 review workflow | §11 |
| §6.8 merge gate | Task 59, §12 |
| §6.9 Phase 3B evidence | Deliberately uncovered — out of scope; §10.7 makes any attempt a stop condition |
| §7.1–7.8 builder qualification | §11.3, §11.4 |
| §8 completion criteria | Task 59, §12.3 |
| §9.1–9.16 binding addendum | Tasks 3–6, 8, 9, 10–14, 16, 18–21, 24, 25, 29–34, 38, 41, 43, 44, 48, 50, 56, **60** (§9.13 preliminary signal); §6.3 |

**Result: every normative section is covered by at least one task, except §6.9, which is explicitly out of Phase 3A scope and is guarded by stop condition 7.**

### 13.2 Placeholder scan

Searched this document for `TODO`, `TBD`, `FIXME`, `as needed`, `similar to`, `and so on`, `etc.`, `update as needed`, and `add tests`.

**Result: none present.** The only deliberately unfilled values are the five `PLAN-OPEN-*` items in §1A (`-1`, `-2`, `-3`, `-4`, `-6`), each of which is named, scoped, assigned to a blocking precondition on a specific task, and reserved to the Founder by the specification itself. `<surface>` and `<host>` in filenames are documented placeholders expanded per investigated surface and per host.

### 13.3 Interface consistency

Every type and function name is used identically across §3, §5, §6, and §12: `MAX_ACTIVE_SURFACES_V1`, `SurfaceId`, `normalizeIndependenceDomain`, `normalizeIdentifier`, `ADAPTER_REGISTRY`, `AdapterRegistrationV1`, `PairConstraintsV1`, `canonicalPairKey`, `evaluatePairEligibility`, `SessionLifecycleEventV1`, `LedgerEventV1`, `parseSessionLifecycleEvent`, `reduceLedgerEvent`, `LifecycleState`, `INITIAL_LIFECYCLE_STATE`, `appendMany`, `classifyDurablePrefix`, `planPrefixCompletion`, `issueInitialToken`, `issueTransferToken`, `invalidateToken`, `RuntimeBroker`, `BrokerClient`, `BrokerCommand`, `BrokerResult`, `BrokerSnapshot`, `OutputFrame`, `ClientPrincipal`, `evaluateCommandLegality`, `evaluatePublishLegality`, `createInProcessBrokerClient`, `resolvePasswdHome`, `assertHomeConsistency`, `proposeStorageRoot`, `validateStorageRoot`, `createSessionStorage`, `rollbackSessionStorage`, `CapabilityRecordV1`, `evaluateCapabilityFreshness`, `writeCapabilityRecord`, `buildAllowlistedEnvironment`, `HostCommandFrame`, `HostFactFrame`, `spawnPtyHost`, `verifyAndLaunch`, `terminateChildGroup`, `escalateWedgedHost`, `runPurePreflight`, `runTransactionalBuild`, `rollbackBuild`, `startFixtureSession`.

**Result: consistent.** `BrokerSnapshot` intentionally exists twice in the tree — the new `packages/broker/src/client.ts` type (§9.4 authority) and the untouched presentation type at `apps/madbridge/src/tui/types.ts:37`. They share no import edge in Phase 3A; the TUI is not wired to the broker until Phase 3B. This is recorded rather than hidden.

### 13.4 File existence

Every path marked **Modify**, **Preserve**, or **Test (existing)** in §3 was confirmed present at `SOURCE_BASELINE_SHA` (`aa16032`). Every path marked **Create** was confirmed **absent** at that SHA. These presence and absence claims hold for `IMPLEMENTATION_BASE_SHA` only if the §0A docs-only range check passes; that check is what makes them transferable. The four spec-pinned paths — `packages/protocol/src/adapter-registry.ts`, `packages/ledger/src/rebuild.ts`, `packages/broker/src/reconciliation.ts`, `packages/pty-host/src/main.ts`, `test/phase3a/runtime-harness.ts` — are used exactly as the specification names them.

### 13.5 RED test per production change

Every task that changes a production file (Tasks 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 40, 41, 42, 43, 44, 45, 46, 47, 55) carries a Step 1 named failing test and a Step 2 with the exact command and the expected RED reason. Tasks 1, 2, 4, 38, 39, 48–54, 56–59 are test-, harness-, or evidence-only and still carry a named RED. **Task 1 explicitly handles the case where the guard would otherwise pass on creation** by seeding and observing a violation first.

**Recorded evidence-only exception — Task 60.** Task 60 is the single task in this plan with **no RED step**. It creates exactly one file, `docs/verification/phase-3a-antigravity-preliminary.md`, changes no source and no test, and its deliverable is an observation of an external CLI rather than a behavior this repository implements. Writing a failing test to "cover" it would be fabricated ceremony, not verification, and this plan does not manufacture RED steps to preserve an appearance of uniformity. The exception is recorded here so it is visible to review rather than discovered as an omission. It extends to no other task: every task that touches a production file carries a genuine RED that must fail for its named reason.

### 13.6 Bounded destructive and rollback operations

| Operation | Bound |
| --- | --- |
| `rollbackSessionStorage` | removes only `storage.sessionDir`, prefix-checked against `root/sessions/`, and only when `session_open` is not durable (Task 28) |
| `rollbackBuild` | unwinds only resources created in this build, in reverse order (Task 47) |
| `terminateChildGroup` | signals only the reported child PGID (Task 43) |
| `escalateWedgedHost` | `SIGKILL`s only the reported child PGID and the reported host PID (Task 44) |
| Capability records | never deleted by any path (Tasks 28, 36) |
| `.madv-runtime` legacy data | never deleted or migrated (Task 29) |
| Repository files | never written by the runtime (Tasks 29, 36) |

### 13.7 Structural guarantees

- **Socket dormancy is structural:** the public export is removed (Task 33) and asserted absent (Tasks 33, 34), and no production or harness file may import `socket.ts`.
- **Production-start gating is structural:** `start.ts` becomes a constant with zero runtime imports (Task 30), asserted by source scan and by an exhaustive flag/argument matrix (Task 30) and by the merge-gate block (Task 59).
- **Harness separation is structural:** static imports, dynamic imports, path construction, command dispatch, environment switches, and argument parsing are all scanned (Task 48).

### 13.8 Absence checks

- **No Phase 3B TUI activation.** `BUILD_STEPS` contains no `"tui"` member and Task 46 asserts it. No task modifies `apps/madbridge/src/tui/**`.
- **No automatic substitution.** No code path promotes a capability record into an envelope; Task 57 asserts no `preselected`, `default`, or `fallback` field exists; mid-session substitution is structurally impossible because interruption is terminal-bound (Tasks 17, 19, 25).
- **No policy invention.** Every value that would constitute policy is either quoted from the specification or listed in §1A as a Founder ruling with a blocking precondition.

### 13.9 Self-review verdict

**CONDITIONAL PASS — NOT READY FOR UNCONDITIONAL FOUNDER APPROVAL.**

The plan divides into two portions, and only one of them is reviewable today.

**Reviewability and eligibility are different questions.** All 60 tasks are *specified* well enough to review. Far fewer are *eligible to start*, because the five open items sit at milestone boundaries and milestone-level preconditions propagate downstream. An earlier revision of this section claimed "54 of 59 executable" and "M1–M13 and M17–M26 can run" — that was wrong. It counted tasks whose own *content* is ungated while ignoring that their preconditions name a **reviewed milestone**, and a milestone cannot be reviewed while one of its tasks is blocked. The corrected accounting is the staged map below.

**No task starts on plan approval.** Approval of this document is one of three required gates, never a start signal:

1. Tier-2 approval of the exact plan SHA;
2. Founder approval of that exact SHA; and
3. separate Founder authorization for the specific task, per the per-task rule in §5.

> Stage 0 tasks require no additional `PLAN-OPEN-*` ruling, but none may start until the exact-SHA plan is approved and the Founder separately authorizes that specific task.

A fourth precondition applies to every task in the plan: `IMPLEMENTATION_BASE_SHA` must be recorded and approved, and the §0A docs-only range check must pass. Until that happens, nothing is eligible.

| Portion | Status |
| --- | --- |
| **Specified and reviewable** — all 60 tasks | **Pass.** Complete, self-consistent, RED-first (with the Task 60 evidence-only exception recorded in §13.5), traceable. Tier-2 may review the whole document now. |
| **Stage 0 execution path, no `PLAN-OPEN-*` ruling required** — 8 tasks | **Path open; not simultaneously eligible.** Only Task 60 and Task 1 are *initially* eligible after the three gates and §0A. Tasks 2–5 and 38–39 unlock through their own written preconditions, in order. |
| **Gated** — 52 tasks, additionally blocked behind Tasks 6, 34, 35, 37 and the M17 dual-host gate | **Not eligible.** Specified down to interfaces and tests, but blocked on rulings or on an upstream gate. |

**Stage 0 membership is not eligibility.** Being in Stage 0 means a task needs no `PLAN-OPEN-*` ruling — nothing more. The unlock order inside Stage 0 is: Task 60 and Task 1 first (independently of each other); Task 2 after Task 1 commits; Task 3 and Task 38 after M1 is reviewed; Task 4 after Task 3; Task 5 after Task 4; Task 39 after Task 38 commits and the same candidate has run on both Founder Macs. An implementer who reads "8 Stage 0 tasks" as "8 tasks I may start now" would begin Tasks 2–5 or 38–39 before their preconditions hold.

#### Staged execution map

Every stage below is additionally subject to the three gates above. "Unblocked by" names only the *extra* `PLAN-OPEN-*` ruling or upstream gate a stage needs beyond them.

| Stage | Additionally unblocked by | Tasks | Count |
| --- | --- | --- | --- |
| **0 — post-authorization / no additional `PLAN-OPEN` ruling** | nothing beyond the three gates and §0A — but sequenced internally, not simultaneous | **Task 60** (outside M1–M26) and **Task 1** (M1) are initially eligible; then Task 2 (M1) → M1 review → Tasks 3 and 38 → Task 4 → Task 5 (M2) and Task 39 (M17) | 8 |
| **1** | `PLAN-OPEN-1` | Task 6 → M2 review completes → M3 (7–9), M4 (10–11), M5 (12), M6 (13–14), M7 (15–16), M8 (17–19), M9 (20–21), M10 (22–25), M11 (26–28), M12 (29), M13 (30–32), M14 Task 33 | 28 |
| **2** | `PLAN-OPEN-4`, `PLAN-OPEN-6` | Task 34 → M14 review completes | 1 |
| **3** | `PLAN-OPEN-3` | Tasks 35–36 → M15 review completes | 2 |
| **4** | `PLAN-OPEN-2` | Task 37 → M16 review completes | 1 |
| **5** | Stages 1–4 **and** the M17 dual-host gate passing on both Macs | M18 (40–41), M19 (42–44), M20 (45), M21 (46–47), M22 (48–50), M23 (51–54), M24 (55), M25 (56–57), M26 (58–59) | 20 |
| | | **Total** | **60** |

**Why the spike is in Stage 0.** M17 is the only milestone that can stop the phase outright, and beyond M1 it depends on nothing but `Bun.Terminal` and a test directory. Placing it early means a `Bun.Terminal` failure surfaces before any of the five rulings are needed and before thirty-seven tasks of investment — which is the whole point of a rubric-first spike. A prior revision of Task 38 listed "M16 reviewed" as its precondition, contradicting the M17 row of the §4 milestone table and manufacturing a false dependency on `PLAN-OPEN-2`. Corrected: **M1 only** — which is a real dependency, not none. Tasks 38–39 remain M17 members and are not "outside the milestone chain".

**Why Task 60 is in Stage 0.** Specification §2.3 requires Antigravity to be investigated first, and the formal investigation (Task 56) cannot run until M15/M16 tooling exists behind `PLAN-OPEN-2` and `PLAN-OPEN-3`. The preliminary evidence pass has no technical precondition at all — it is the one task in the plan with none — so it satisfies the "investigated first" ordering at the cheapest possible moment without producing a capability record it is not entitled to produce. It is also the only task outside M1–M26. See the Founder deviation ruling in §4.

**Critical-path consequence.** `PLAN-OPEN-1` alone unblocks 28 of the 52 gated tasks — more than every other ruling combined. If the rulings arrive serially, that one first.

**Why this is not an unconditional pass.** Four of the five open items bear directly on authorization semantics:

- `PLAN-OPEN-1` (adapter-registry entries) determines **identity and admission**;
- `PLAN-OPEN-2` (environment allowlists and secret markings) determines **what crosses the process boundary**;
- `PLAN-OPEN-3` (capability horizon) determines **when attestation evidence goes stale**;
- `PLAN-OPEN-4` (`node-pty` removal) touches a **manifest and lockfile** and resolves a live contradiction with §9.7.

A verdict of "Pass" over unresolved values of that kind would misrepresent the plan's readiness. The correct characterization is: **architecturally complete, executably specified, and conditionally approvable — pending five recorded Founder rulings.**

**Consequences for review sequencing.**

1. Tier-2 review may proceed now over the **whole** document — every task is specified. The verdict should record that approval opens only the Stage 0 path, makes only Task 60 and Task 1 initially eligible, and starts nothing.
2. The four ruled tasks require a second, narrow review **after** the Founder rulings are recorded, because the ruled values themselves are authority-bearing and were not reviewed in round one.
3. Founder approval of the plan SHA is **not** sufficient to start Tasks 6, 34, 35, or 37. Each additionally requires its own `PLAN-OPEN-*` ruling in writing, exactly as stop condition 16 requires.
4. With the plan approved, `IMPLEMENTATION_BASE_SHA` recorded, and no `PLAN-OPEN-*` rulings yet, the reachable work is the **Stage 0 path (8 tasks)** — entered at Task 60 and Task 1, advancing only as each written precondition is met, and each task still requiring its own Founder authorization. Work then halts at the M2 review boundary. It does not proceed into M3–M13; those preconditions are unsatisfied until Task 6 completes.
5. The implementer must not treat an ungated task as eligible merely because its own content needs no ruling, nor because it appears in Stage 0. Three questions bind, and all three must be yes: is its stated **precondition** — usually "M*n* reviewed" or "Task *n* committed" — satisfied; is `IMPLEMENTATION_BASE_SHA` recorded and the §0A range check passing; and has the Founder authorized that specific task.
