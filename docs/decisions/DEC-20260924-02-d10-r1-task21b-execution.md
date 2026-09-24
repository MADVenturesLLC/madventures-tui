Founder Decision D10-R1: Task 21b Execution Authorization (replaces D10)

> **Status: ISSUED,
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Binding base:** `origin/main` = `4477bf824892f2e3311843e33f163bc52ac9e5fe`
> (tree `f04c6f432551ff97b81c6ad268cb9a473e61f275`), verified 2026-09-24 by fresh `git fetch`.
> B2 (PR 91, merge `c3c7d9fe2103…`, 2026-09-20) landed the D9 contract amendment (`ce724c2`)
> and records (`62967bf`), both in `ea079827..4477bf8`. No governing file below, nothing
> under `packages/ledger/src/`, and not `packages/broker/src/runtime-broker.ts` has changed
> between `c3c7d9fe` and `4477bf8` (`git diff c3c7d9f 4477bf8 -- <paths>` is empty).
> **Governing files at this base (sha256):**
> - `packages/broker/src/client.ts` `8fd3801e79a1ace282152005983eb0fc5a3accbb9e6174c9f5390232033d43b7`
> - `packages/broker/src/command-legality.ts` `d5f2bb874d65547acf65c31dc197f431018edf95e033063729f2e15cedd3f808`
> - `packages/broker/test/command-legality.test.ts` `d2d497a65d7609a2bd2265ea2e10c970d211f1b1a3e4ad1d7e63decdd3e5a2d8`
> - `docs/decisions/PLAN-OPEN-7-snapshot-projection-sources.md` `44e9ec0530ff048f0fe509098004860f87f39062351fc332cd8bc93c980f2ff8`
> - `docs/decisions/PLAN-OPEN-approval-record.md` `ef35eb392799dc44aca339c69779a4ea86dd515ddb35663dc481b05cd162373b`
> - plan `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` `e4a46c496c8f618887af7b41bf0daed20342b190fef043772a3972e710db5e39`
> - spec `docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md` `565f8530def41cf467e328b2d1082f64b932378063e9e16e5524676633c171ca`

***

Founder Decision D10-R1 — Task 21b execution authorization

Repository: MADVenturesLLC/madventures-tui
Date: 2026-09-24

I, Michael Daley, Founder of MAD Ventures and Founder OS, rule as follows.

## Part A — Withdrawal of D10

A0. `ISSUED-FOUNDER-D10-TASK21B-EXECUTION-4477bf8.md` (sha256
    `1418e394766744917134f3342f3100687dcf2ac1929343688e651d2f962fd9da`, status line dated
    2026-09-24T01:20Z) is WITHDRAWN in its entirety, before any execution under it, and is
    replaced by this instrument. It is kept unedited as a record. Reasons: its A1 requires a
    type (`RuntimeBrokerProvenance`) that its A2 forbids importing, and misplaces `LedgerRow`;
    it places writer recovery outside the projector with no rule for an invalidated token;
    it binds no builder; its banner calls PR 91 the only milestone-advancing merge since
    `ea079827` (PRs 93 and 94 are M14 merges); and its closing `Role-Id: founder` line is not
    a valid Role-Id. Nothing may be executed, cited, or filed as authority under it.

## Part B — Rulings (discharge D8 Projection Contract Requirement items 1-7)

B0. **Procedure.** D8 (`DEC-20260916-01`) requires items 1-7 to be defined in the plan or
    spec and reviewed before Task 21b is authorized. I discharge them by this instrument
    instead. The independent review of the Task 21b PR reviews this contract and its code
    together. Where the plan or spec text conflicts with this act, this act governs until
    they are conformed. To the extent FOUNDER-RULING-20260923-M10-START (rev 4) was issued,
    its item 5 and items 9(a), 9(b), 9(c), 9(d) and 9(g) are superseded by this act. Its
    Part C docs PR still proceeds for items 9(e), 9(f), 9(h), the instrument filings,
    conforming the Task 21b block to this act, and filing this act and the withdrawn D10.

B1. **Input contract (item 1).** `snapshot.ts` exports one function,
    `projectSnapshot(input: SnapshotProjectionInput): BrokerSnapshot`, where
    `SnapshotProjectionInput` is declared in `snapshot.ts` as:

        SnapshotProjectionInput {
          readonly lifecycle: LifecycleState;          // type from @madventures/ledger
          readonly ledgerRows: readonly LedgerRow[];   // type from @madventures/ledger
          readonly provenance: {
            readonly taskEnvelopeHash: string;
            readonly repositoryFingerprint: RepositoryFingerprint; // type from @madventures/protocol
          };
        }

    `ledgerRows` is the ledger's `readAfter(0)` output, in ascending sequence order. There
    is no other input: no clock, cache, registry, randomness, handle, ambient read, or
    process state. The caller (Task 22) supplies the input. The projector never reads
    broker state itself.

B2. **Imports.** The plan's "import nothing but ./client" is relaxed to this extent only.
    Value (runtime) imports: `./client` only. Type-only imports: `LifecycleState` and
    `LedgerRow` from `@madventures/ledger`, and `RepositoryFingerprint` (plus any
    event-vocabulary type needed to type `SnapshotProjectionInput`) from
    `@madventures/protocol`. Nothing from `./runtime-broker`, `./ownership-machine`,
    `./command-legality`, or `apps/**`. `BrokerSnapshot` is consumed from `./client` and
    never redeclared.

B3. **Field sources (item 2).** As ruled by D9, D9-A1, D9-A2, and D9.2:
    - `phase`, `fencingToken`, `tokenState`, `incident` from `lifecycle`.
    - `taskEnvelopeHash`, `repositoryFingerprint` from `provenance`.
    - `sessionId` from `lifecycle.sessionId`; `null` there is a refusal (B5).
    - `ledgerSeq` = the `sequence` of the last row.
    - `eventLog`: one `LedgerEntrySnapshot` per row, in order. `seq` ← `row.sequence`;
      `hash` ← `row.event_hash`; `timestamp` ← `row.created_at`; `type` ← the parsed
      `event_json`'s `event_type`. For a lifecycle row: `actor` ← its `actor`, and
      `fencingToken` ← its `fencing_token`. For a BridgeEventV1 row: `actor` ←
      `sender_execution_id`, and `fencingToken` ← `null` (a BridgeEventV1 carries no
      token).
    - `activeWriterExecutionId` is derived by the projector from `ledgerRows`: the
      `payload.writer_execution_id` of the latest `fencing_token_issued` row whose envelope
      `fencing_token` equals `lifecycle.fencingToken`, and only when `lifecycle.tokenState`
      is `"valid"`. In every other case it is `null`. It is never inferred from any other
      source.
    - `null` for: `snapshotSeq`, `connected`, `task`, `permissionSummary`, `executions`,
      `ownershipState`, `queueDepth`, `pendingTransfers`, `verification`, `review`.
    - `pendingApprovals` = `[]`. No event in either closed vocabulary can create a pending
      approval (D9.2 / FIELD-SOURCE row 17), so the empty collection is the truthful
      projection, not a default. The type is unchanged, and no source machinery is built.
      Any future task that defines an approval-request record type updates this
      projection in the same task.
    The projector never synthesizes, defaults, or fabricates a value.

B4. **Snapshot sequence (item 3).** The projector emits `snapshotSeq: null` and never
    manufactures a sequence. Task 22 stamps it.

B5. **Fail-closed (item 4).** The projector throws `SnapshotProjectionRefused`, a typed
    error declared in `snapshot.ts` carrying a closed `reason` union, when:
    `lifecycle.sessionId` is `null`; `ledgerRows` is empty; row sequences are not strictly
    contiguous and ascending; or any row's `event_json` does not parse to an object with
    an `event_type` string. It never returns a partial or synthesized snapshot.

B6. **Read-only and determinism (item 5).** Equal input projected twice is deep-equal and
    mutates nothing. The same input gives the same result or refusal on every call.
    Projection authority is not state authority.

## Part C — Authorized files and scope (item 6)

C1. Exactly two paths:
    - Create `packages/broker/src/snapshot.ts`
    - Create `packages/broker/test/snapshot.test.ts`
C2. No other file changes. Specifically untouched: `client.ts`, `command-legality.ts`,
    `runtime-broker.ts`, `ownership-machine.ts`, `packages/broker/src/index.ts`, the
    ledger, `apps/madbridge/src/tui/**`, and all docs. `projectSnapshot` is not exported
    from the package index; Task 22 wires it.
C3. `snapshot.ts` carries no lifecycle, ownership, fencing, ledger-mutation, command, PTY,
    durable-storage, or independent-mutable-state authority. It does not reconstruct
    state from TUI state, test fixtures, mutable caches, or fabricated defaults. It never
    imports, aliases, or treats the legacy TUI `BrokerSnapshot`
    (`apps/madbridge/src/tui/types.ts`) as authoritative.

## Part D — Verification contract (item 7)

D1. Eight tests, RED then GREEN, in this order. Titles 1-5 are the plan's, verbatim:
    1. `test("the projection module exists and exports the projection function")`
    2. `test("the projection is pure: repeated projection of equal input is deep-equal and mutates nothing")`
    3. `test("the module imports nothing beyond ./client")` — asserts the B2 rule: no value
       import other than `./client`; type-only imports only as B2 lists.
    4. `test("projection is deterministic: the same input yields the same verdict on every call")`
    5. `test("projection fails closed when required authoritative state is unavailable")` —
       asserts `SnapshotProjectionRefused` and its `reason` for each B5 case, never a
       synthesized value.
    6. `test("activeWriterExecutionId is recovered only from the latest fencing_token_issued matching a valid token")`
    7. `test("activeWriterExecutionId is null when the token is invalidated or no matching issuance exists")`
    8. `test("pendingApprovals projects the empty collection and every D9-null member projects null")`
    The test file takes a runtime (value) import of `projectSnapshot`. A type-only import
    that the runtime can elide does not count as the RED proof.
D2. RED proof: `bun test packages/broker/test/snapshot.test.ts -t "the projection module exists and exports the projection function"`
    — expected `Cannot find module "../src/snapshot"`. Capture verbatim.
D3. GREEN: `bun test packages/broker/test/snapshot.test.ts` gives 8 pass.
D4. Before the first edit, on the unmodified base: `bunx tsc --noEmit` exits 0, and
    `bun test packages/broker` is run and its measured counts are recorded in the report.
    After the change: `bunx tsc --noEmit` exits 0, and `bun test packages/broker` shows
    the base counts plus exactly 8 new passes and 0 fails. Any regression is a stop, not
    a fix.
D5. Diff inspection: exactly two paths; no authority listed in C3; `BrokerSnapshot` not
    redeclared; `git diff --check` clean.
D6. One commit, message exactly `feat(broker): add the BrokerSnapshot production projection`,
    ending with the Part F trailers.
D7. Stop for the M10 review checkpoint.

## Part E — Boundaries

E1. Task 21b only. Not authorized: Task 22, the M9 checkpoint, `publish()` ingestion,
    producing `connected` or `snapshotSeq`, the package-index export, or any change to
    `runtime-broker.ts`, `ownership-machine.ts`, `command-legality.ts`, the ledger, or
    `apps/madbridge/src/tui/**`.
E2. Merge of the Task 21b PR is a separate Founder act naming the exact head SHA, after
    independent non-authoring review at that head, with `Verify`, `Verify (macOS)`,
    `code-review`, and `attribution-shape` green and threads resolved.
E3. This instrument and the withdrawn D10 are filed verbatim in the repository by the M10
    docs PR, not by the Task 21b PR.
E4. Stop conditions from the plan and the repository rules apply unmodified. In addition,
    stop and report if origin/main is not the binding base at branch time, if any
    governing hash does not re-derive, or if any step needs a file outside C1.
E5. Void: any change to the base, scope, test contract, or commit sequence voids this act.

## Part F — Builder binding and delivery

F1. I assign `Role-Id: builder`, `Actor-Id: session:claude-code/m10-t21b-build-r1`, on
    surface `claude-code`. The commit and PR body carry exactly:
        Role-Id: builder
        Actor-Id: session:claude-code/m10-t21b-build-r1
        Execution-Surface: claude-code
F2. Branch `build/m10-task21b-r1` from the binding base. Open a DRAFT PR against `main`;
    set the PR body last, after the review bots have posted, with the trailers as the
    final lines and no `---` line in the body. Report the commit SHA, the PR number, the
    D2 RED output verbatim, the D4 before and after counts, and the diff stat. Then stop.

## Part G — Signature

Signed:

— Michael Daley

Date: 2026-09-23 22:11 PM EDT
Actor-Id: founder
