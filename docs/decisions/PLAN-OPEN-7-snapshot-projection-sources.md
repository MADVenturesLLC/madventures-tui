# PLAN-OPEN-7 — `BrokerSnapshot` Snapshot-Projection Sources

**Status:** OPEN — awaiting Founder ratification
**Raised:** 2026-09-16, by mt-architect
**Authorized as a new ratification by:** the Founder instrument *D8 durable transcription +
D9.2 disposition + docs-correction authorization*, issued 2026-09-16 at `main` @
`beb83f4b7e7abc7725457a5440e236269cb2035d` (tree
`f5363e9ebfdee590bcf45e5084cb777b468cb4e6`).
**Blocks:** Task 21b implementation; Task 22.
**Precedent:** `PLAN-OPEN-1` … `PLAN-OPEN-6`. `PLAN-OPEN-5` was withdrawn and the surviving
identifiers were deliberately not renumbered, so `-7` is free and non-colliding.

## Why this item exists

D8 requires that, before Task 21b implementation may be authorized, the controlling plan/spec
define "the authoritative source for every required `BrokerSnapshot` field/group", and grants
no Builder discretion to invent missing projection sources.

That requirement is **not dischargeable at the D8 base**. Of the 21 `BrokerSnapshot` members,
8 have a ready authoritative source, 5 need a Founder ruling despite an existing source, 7 have
no source anywhere in the tree at the base on which Task 21b would be authorized, and 1 is
deferred by D9.2 and is therefore not one of the unresolved values here — accounting: 8 ready +
5 ruling-needed + 7 no-source + 1 deferred (D9.2) = 21. The field-by-field mapping is recorded
as the FIELD-SOURCE TABLE in the Task 21b block of
`docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`.

This item carries the unresolved **values**. It does not carry `pendingApprovals`, which is
disposed of separately by D9.2 (deferred from Task 21b) and cannot be reserved here: §1A
reserves values, and no value can make a non-existent record type projectable.

## The open values

| # | Open value | Recommendation recorded for the Founder |
| --- | --- | --- |
| (a) | **Scope.** Does Task 21b project all 21 members, or a defined sourceable subset — and if a subset, what does the contract do about members that are absent? `BrokerSnapshot` has no "unavailable" representation today. | If the full contract is required, Task 21b cannot precede M20 and Task 22 must move with it. If a subset, the contract must state which members are present when, or the projection must return a distinguishable partial — a contract-level change requiring a Founder ruling. |
| (b) | **`queueDepth` and `connected` semantics.** Each has exactly one reference in the specification — the field declaration itself — and none in the plan. | `connected` describes *this client's* subscription, so it belongs to `InProcessBrokerClient` (Task 22) and should be excluded from a pure broker-state projector. `queueDepth` needs an explicit definition or removal; a number with no defined meaning cannot be projected truthfully. |
| (c) | **`ownershipState`.** The Phase 2 ownership machine has no live call site — `transitionOwnership` and `assertCurrentWriter` are called only from tests. | Defer projection. Wiring the machine into the runtime is its own authority-bearing task (ownership transitions are named in plan stop condition 11). |
| (d) | **`snapshotSeq` sequencing.** Contested: `RuntimeBroker` carries an M8 per-lifecycle counter whose own source annotates it "not the M9 snapshot contract", while §4.1 and the plan pin M9 `snapshotSeq` as per-published-snapshot starting at 1. Two similarly named counters exist and one is documented as not being the other. | The M9 per-published-snapshot sequence belongs to the client (Task 22; the "Pinned plan decisions" paragraph of the Task 22 block, plan line 1531 at this head, pins "starts at 1, +1 per published snapshot"). The projector must not manufacture it. |
| (e) | **`task`, `permissionSummary`, `executions`.** Requires broker-side **retention** of the task envelope and execution identities, which does not exist — provenance keeps only the envelope hash, and launch facts are produced at M18/M19 while Task 21b sits in M10. | Defer projection, and record envelope-retention as a named precondition of whichever task first needs those members. Retaining the envelope is a broker-state decision, not a projector decision. |

Additionally noted for the Founder: inserting Task 21b does not itself resolve the field gaps,
because Task 21b sits inside M10 while the sources for `task`, `permissionSummary`, and
`executions` live at M18/M19/M20. The snapshot contract (M9) was declared ahead of the state it
projects. This is a milestone-ordering fact, not a reason to reject D8.

## Rulings (D9, 2026-09-18)

D9 (`DEC-20260918-01-d9-snapshot-projection-sources.md`, signed 2026-09-19T01:16Z, transcribing
the instrument `m9/ISSUED-FOUNDER-D9-SNAPSHOT-SOURCES-a8ecdc8a.md` sha256
`55a8b16ae92cfba9aeea8cff65fb2b2117e30bbff1a0357723ef54b76927a44a`) rules each open value below.
Its Part A is the authority; this section records the rulings against the items they answer.

**The identifier stays OPEN, and that is deliberate.** D9's own title reads "closes
`PLAN-OPEN-7`" and its Part C item 14 directs this status to `RATIFIED`. The later Consolidated
B2 Execution Authorization rules otherwise at its §D2: `PLAN-OPEN-7` "remains open (it is not
among the five)", and remaining open "is a deliberate instruction — B2 changes the contract it
reserves; it does not close it." The Founder confirmed that reading on 2026-09-20. So the
**values** below are ruled and binding; the **identifier** is not discharged, because B2 lands
only the contract amendment and the records, never the Task 21b projection the item reserves.
Closing it is a later act.

| # | Ruling (D9 Part A) |
| --- | --- |
| (a) | **SUBSET.** Task 21b projects the *sourceable subset*. Every member with no authoritative source at the Task 21b base is projected as **`null`, meaning "not produced"** — never fabricated, never defaulted. The contract is amended so those members are typed `T \| null` (D9 Part B item 12). A `null` is a truthful statement that the projector had no source; it is not an error and not a placeholder. |
| (b) | **`connected`** describes this client's subscription and is a property of `InProcessBrokerClient`, not of broker state: Task 21b projects `connected: null`, and Task 22 sets it. **`queueDepth`** has no definition; Task 21b projects `null` until a later ruling defines it. |
| (c) | **`ownershipState` — DEFERRED.** The Phase 2 ownership machine has no live call site. Task 21b projects `null`. Wiring the machine is its own authority-bearing task. |
| (d) | **`snapshotSeq`** is the M9 per-published-snapshot sequence (starts at 1, +1 per published snapshot) and belongs to the client (Task 22). Task 21b projects `null`; the projector never manufactures a sequence. The M8 per-lifecycle counter in `RuntimeBroker` is **not** this value. |
| (e) | **`task`, `permissionSummary`, `executions` — DEFERRED.** Broker-side retention of the task envelope and execution identities does not exist at M10. Task 21b projects `null` for each; envelope retention is recorded as a named precondition of whichever task first needs these members. |

Rulings D9 makes on members outside (a)–(e), recorded here because they bear on the same
contract: `sessionId` stays typed `string` and a null `LifecycleState.sessionId` is a
**projection failure** (fail closed — the projector refuses rather than emitting
`sessionId: null`); `activeWriterExecutionId` MAY be recovered from the durable
`fencing_token_issued.writer_execution_id` on the chain and is `null` when no such record
exists, never inferred from any other source; `verification` and `review` stay `null` until
`publish()` ingestion lands at Task 24; `pendingTransfers` is `null` until the same point and is
the eighth member of the Part B item 12 amendment; and `pendingApprovals` is **not** ruled here,
remaining as D9.2 and `DEC-20260916-01` record it.

`executions: null` and command legality are ruled at D9 Part A item 9 and corrected by D9-A1:
`evaluateCommandLegality` refuses a **writer-only** command (`pty_input`, `pty_resize`) against a
null collection with `invariant_failure`, and **`pty_terminate` remains ungated**. That carve-out
is load-bearing — mechanical fail-closed teardown must not become blockable by a missing
projection.

## Rule (plan §1A, unchanged)

The implementer may build every slot, type, test, and validator these items feed, but may not
populate a `FOUNDER-RATIFICATION-REQUIRED` value until the ruling exists. Proceeding without a
ruling is unplanned and fails closed.

This item authorizes no implementation. Task 21b remains unauthorized until both its contract
is landed and a separate Founder implementation authorization is issued naming an exact base.

## Non-authorities

Raising this item does not authorize: Task 21, Task 21b, or Task 22 implementation; any product
source, test, manifest, lockfile, or CI change; M9 checkpoint issuance; merge of any candidate;
reopening M8; or defining the approval-request record type.
