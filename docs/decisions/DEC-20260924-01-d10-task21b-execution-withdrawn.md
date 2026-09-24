# ISSUED — Founder Decision D10: Task 21b Execution Authorization (BrokerSnapshot Production Projection)

> **Status: ISSUED — signed 2026-09-24T01:20Z by Michael Daley (Actor-Id: founder); execution authorized per this instrument.**
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Binding base:** `origin/main` = `4477bf824892f2e3311843e33f163bc52ac9e5fe`
> (tree `f04c6f432551ff97b81c6ad268cb9a473e61f275`), verified 2026-09-24 by
> fresh `git fetch`. Post-B2 main: PR 91 (`B2: BrokerSnapshot nullable
> projection contract (D9 Part B) and records`, merge `c3c7d9fe`, merged
> 2026-09-20) is the only milestone-advancing merge since the D9-A2 pin
> `ea079827`; the D9 contract amendment commit `ce724c2` is in the range
> `ea079827..4477bf8` and the records commit `62967bf` is in the same range.
> **Governing files at this base (sha256):**
> - `packages/broker/src/client.ts` `8fd3801e79a1ace282152005983eb0fc5a3accbb9e6174c9f5390232033d43b7`
> - `packages/broker/src/command-legality.ts` `d5f2bb874d65547acf65c31dc197f431018edf95e033063729f2e15cedd3f808`
> - `packages/broker/test/command-legality.test.ts` `d2d497a65d7609a2bd2265ea2e10c970d211f1b1a3e4ad1d7e63decdd3e5a2d8`
> - `docs/decisions/PLAN-OPEN-7-snapshot-projection-sources.md` `44e9ec0530ff048f0fe509098004860f87f39062351fc332cd8bc93c980f2ff8`
> - `docs/decisions/PLAN-OPEN-approval-record.md` `ef35eb392799dc44aca339c69779a4ea86dd515ddb35663dc481b05cd162373b`
> - plan `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` `e4a46c496c8f618887af7b41bf0daed20342b190fef043772a3972e710db5e39`
> - spec `docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md` `565f8530def41cf467e328b2d1082f64b932378063e9e16e5524676633c171ca`
>
> **Predecessor pins are historic, not controlling:** D8 pinned `beb83f4b`
> (docs-restage commission), D9 pinned `a8ecdc8a`, D9-A2 re-pinned to
> `ea079827` for the B2 publication. B2 merged; the Task 21b implementation
> base is re-pinned here to `4477bf8` on the evidence above. Every field of
> the `BrokerSnapshot` contract named in D9 Part B and the PLAN-OPEN-7
> rulings is present at this base in its ruled shape.

---

Founder Decision D10 — Task 21b execution authorization

Repository: MADVenturesLLC/madventures-tui
Date: 2026-09-24

I, Michael Daley, Founder of MAD Ventures and Founder OS, authorize and rule as follows.

## Part A — Rulings (closes the remaining Projection Contract Requirement items)

A1. **The production projection input contract (item 1) is ruled.** `snapshot.ts`
    exports one projection function, `projectSnapshot`, taking a single explicit,
    readonly parameter object declared in `snapshot.ts` as `SnapshotProjectionInput`:

    ```text
    SnapshotProjectionInput {
      lifecycle: LifecycleState;
      ledgerRows: readonly LedgerRow[];
      provenance: RuntimeBrokerProvenance;
      recoveredActiveWriterExecutionId: string | null;
    }
    ```

    - `LifecycleState` and `LedgerRow` are the types declared in
      `packages/ledger/src/rebuild.ts`; `ledgerRows` is the ledger's
      `readAfter(0)` output. `RuntimeBrokerProvenance` is the type declared in
      the broker package carrying `taskEnvelopeHash` and
      `repositoryFingerprint`.
    - `recoveredActiveWriterExecutionId` MAY be recovered by the builder from
      the durable `fencing_token_issued.writer_execution_id` on the chain per
      D9 item 7; if no such record exists it is `null`. It is never inferred.
    - The projector takes no other input: no clock, cache, registry, random,
      handle, ambient read, or process state.

A2. **The plan's `import nothing but ./client` constraint is relaxed to this
    extent only (item 1 structural collision).** `snapshot.ts` may take
    **type-only** imports of `LifecycleState` and `LedgerRow` from
    `packages/ledger/src/rebuild.ts` and of the event-vocabulary types needed
    to type `SnapshotProjectionInput`; runtime/value imports remain limited to
    `./client`. `RuntimeBroker` is never imported (Task 22 owns that wiring).
    `BrokerSnapshot` is consumed from `./client` and never redeclared.

A3. **Field sources.** The projector emits, per the FIELD-SOURCE TABLE as ruled
    by D9, D9-A1, D9-A2, and D9.2: rows 1–8 from the sources the table names;
    `sessionId` from `LifecycleState.sessionId` — a `null` there is a projection
    failure (A4), never a `sessionId: null` snapshot; `activeWriterExecutionId`
    per A1; `snapshotSeq`, `connected`, `task`, `permissionSummary`,
    `executions`, `ownershipState`, `queueDepth`, `pendingTransfers` as `null`
    (D9 items 2–5 and the eighth row); `verification` and `review` as `null`
    (D9 item 8). **`pendingApprovals` projects `[]`** — no event in the closed
    vocabulary creates a pending approval (D9.2 / row 17), so the truthful
    projection is the empty collection; the type is unchanged and no source
    machinery is built for it. The projector never synthesises, defaults, or
    fabricates a value.

A4. **Fail-closed behavior (item 4).** When required authoritative state is
    unavailable — `LifecycleState.sessionId` is `null`, or any required input
    member is absent — the projector refuses by throwing a typed failure
    `SnapshotProjectionRefused` declared in `snapshot.ts`. It never emits a
    snapshot with a synthesized value.

A5. **Read-only / determinism (item 5).** As the Task 21b block states:
    projecting equal input twice is deep-equal and mutates nothing; the same
    input yields the same verdict on every call; no cache, clock, registry,
    randomness, or handle; projection authority is not state authority.

## Part B — Authorized files and scope

B1. Exactly two paths are authorized:
    - Create `packages/broker/src/snapshot.ts`
    - Create `packages/broker/test/snapshot.test.ts`

B2. No other file in `packages/**` or `apps/**` changes. `client.ts`,
    `command-legality.ts`, `runtime-broker.ts`, `ownership-machine.ts`, the
    ledger, `apps/madbridge/src/tui/**`, and all docs stay untouched.

B3. `snapshot.ts` carries no lifecycle, ownership, fencing, ledger-mutation,
    command, PTY, durable-storage, or independent-mutable-state authority; it
    does not reconstruct state from TUI state, test fixtures, mutable caches,
    or fabricated defaults; it never imports, aliases, or treats the legacy TUI
    `BrokerSnapshot` (`apps/madbridge/src/tui/types.ts`) as authoritative.

## Part C — Verification contract

C1. The five shape-only tests, RED → GREEN, in the named order (Task 21b
    Step 1, verbatim test titles):
    1. `test("the projection module exists and exports the projection function")`
    2. `test("the projection is pure: repeated projection of equal input is deep-equal and mutates nothing")`
    3. `test("the module imports nothing beyond ./client")` — read as amended by
       A2: no runtime import beyond `./client`; type-only imports as A2.
    4. `test("projection is deterministic: the same input yields the same verdict on every call")`
    5. `test("projection fails closed when required authoritative state is unavailable")`
       asserting the refusal shape, not a synthesized value.
    Each file takes a runtime/value import of `projectSnapshot`; a type-only
    import the runtime can elide fails the RED proof (Step 2).

C2. Step 2 RED proof: `bun test packages/broker/test/snapshot.test.ts -t "the projection module exists and exports the projection function"`
    — expected `Cannot find module "../src/snapshot"`.

C3. Step 4 GREEN: `bun test packages/broker/test/snapshot.test.ts` — 5 pass,
    invariant: pure, deterministic, fails closed, never synthesizes.

C4. Step 5: `bun test packages/broker` and `bunx tsc --noEmit` both exit 0.
    Before the first edit, the **unmodified** authorized base must give
    `bunx tsc --noEmit` exit 0 and the full broker suite green; the measured
    suite count at that base is recorded in the report before any change
    (D9-A3 B4 pattern). A base that is not green before the change cannot show
    that the change is what broke it. Any regression is a **stop**, not a fix.

C5. Step 6 diff inspection: exactly two paths; no lifecycle/ownership/fencing/
    ledger/command/PTY/storage authority; no TUI/fixture/cache/fabricated
    source; `BrokerSnapshot` not redeclared.

C6. Step 7: one commit, message exactly
    `feat(broker): add the BrokerSnapshot production projection`.

C7. Step 8: **stop for the M10 review checkpoint.** No merge, no further
    milestone work, without a separate Founder act.

## Part D — Boundaries

D1. This act authorizes Task 21b only. It does NOT authorize Task 22
    (`InProcessBrokerClient`), the M9 checkpoint, `publish()` ingestion,
    `connected`/`snapshotSeq` production (Task 22 owns both), or any change to
    `runtime-broker.ts`, `ownership-machine.ts`, `command-legality.ts`, the
    ledger, or `apps/madbridge/src/tui/**`.

D2. Merge of the Task 21b PR is a separate Founder act naming the exact head
    SHA, after independent review at that head, required checks green
    (`Verify`, `Verify (macOS)`, `code-review`), and threads resolved.

D3. D9-A3 and D9-A4 remain NOT ISSUED, NOT IN FORCE and are not relied on by
    this act; this instrument carries its own base-pin checks (banner) and
    behavioral control (C4).

D4. Stop conditions from the controlling plan and repository rules apply
    unmodified.

## Part E — Signature

Signed:

— Michael Daley

Date: 2026-09-24T01:20Z
Actor-Id: founder

---

Role-Id: founder (instrument authored on Founder instruction; issued 2026-09-24 per Founder instruction to sign and file)
