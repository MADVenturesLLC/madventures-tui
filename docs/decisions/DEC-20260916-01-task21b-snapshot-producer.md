# DEC-20260916-01 — Task 21b BrokerSnapshot Production Projection

**Status:** RATIFIED (Founder, 2026-09-16)
**Repository:** `MADVenturesLLC/madventures-tui`
**Ruling head at time of issuance:** `main` @ `beb83f4b7e7abc7725457a5440e236269cb2035d`
**Provenance:** Delivered directly by the Founder (Michael Daley) as a written ruling in
session, 2026-09-16, titled "FOUNDER DECISION D8 — BrokerSnapshot Producer". Transcribed
verbatim into repository-local, citable provenance per the pattern established by
[`PLAN-OPEN-approval-record.md`](PLAN-OPEN-approval-record.md) and
[`DEC-20260831-01`](DEC-20260831-01-phase-3a-authority-drift-reconciliation.md).

## Ruling (verbatim)

  # FOUNDER DECISION D8 — BrokerSnapshot Producer

**Base:** `madventures-tui origin/main beb83f4b7e7abc7725457a5440e236269cb2035d` (or successor explicitly named at issuance)

**Finding:** No existing plan task produces a real `BrokerSnapshot`. This has been established exhaustively across Tasks 19/20/21/24/59 and the §3.1 file map.

## RULING

**Option (b) — APPROVED.**

### New production module

`packages/broker/src/snapshot.ts`

### New bounded task

Insert a new task between Task 21 and Task 22:

`Task 21b — BrokerSnapshot Production Projection`

Task 21b owns the **pure production projection of authoritative broker state into the Task 20 `BrokerSnapshot` contract** declared in:

`packages/broker/src/client.ts`

It never projects to, imports, aliases, or treats the legacy TUI `BrokerSnapshot` type as authoritative.

## Authority Boundary

`snapshot.ts` is a **pure/read-only projector**.

It may consume authoritative broker/runtime state supplied through an explicitly defined input contract.

It does NOT own or perform:

- lifecycle transitions;
- ownership transitions;
- fencing-token issuance or invalidation;
- Ledger mutation;
- command execution;
- process/PTY authority;
- durable storage;
- independent mutable state.

It must not reconstruct authoritative broker state from:

- TUI state;
- test fixtures;
- independent mutable caches;
- fabricated defaults.

**Projection authority is not state authority.**

## Projection Contract Requirement

Before Task 21b implementation may be authorized, the controlling plan/spec must define:

1. the exact production projection input contract;
2. the authoritative source for every required `BrokerSnapshot` field/group;
3. snapshot-sequence treatment;
4. fail-closed behavior when required authoritative state is unavailable;
5. read-only/determinism requirements;
6. Task 21b's exact implementation and test paths;
7. Task 21b's RED→GREEN verification contract.

No Builder discretion is granted to invent missing projection sources.

## Plan Correction

Correct the controlling plan/spec, including as applicable:

- §3.1 file map;
- Task Files;
- milestone dependency graph;
- §6.2;
- Task 21b contract;
- Task 22 preconditions.

Task 22 must depend upon the real Task 21b production projection.

A fixture-only `getSnapshot()` path is insufficient for Task 22 completion.

## Dependency Intent

The intended architecture is:

`Task 20 — BrokerSnapshot contract`

→ `Task 21 — command legality`

and

`Task 20 — BrokerSnapshot contract`

→ `Task 21b — production snapshot projection`

then:

`Task 21 + Task 21b`

→ `Task 22 — in-process BrokerClient integration`

The plan correction must determine whether Task 21 and Task 21b may proceed independently after Task 20 while preserving these Task 22 dependencies.

## Explicit Dispositions

**REJECT Option (d):** Task 22 must not ship a hollow fixture-backed `getSnapshot()` while no production `BrokerSnapshot` producer exists.

**REJECT silent Option (a):** no existing task is silently reinterpreted as already owning projection.

**DECLINE Option (c):** do not create overlapping Task 22/Task 25 ownership of `runtime-broker.ts` merely to close D8.

Task 25 retains its existing atomicity responsibility.

## Authorization

This act authorizes **docs-only plan/spec correction** necessary to encode D8.

It does NOT authorize implementation of:

- Task 21;
- Task 21b;
- Task 22.

Task 21b implementation requires a separate Founder exact-base implementation authorization after its contract, paths, tests, and projection-source mapping are independently reviewed and landed.

## Non-Authorities

This act does NOT authorize:

- product source changes;
- Task 21 implementation;
- Task 21b implementation;
- Task 22 implementation;
- M9 checkpoint issuance;
- merge of any broker-client/product candidate;
- reopening M8.

**— Michael Daley**

## Repository-recorded context (NOT part of the ruling)

The findings below are **analysis by mt-architect**, not Founder findings. They are recorded
here as the motivation for D9 and D9.2 and do not carry Founder authority.

- **Eight non-nullable `BrokerSnapshot` members have no authoritative source at the D8 base**
  (`beb83f4b`): `task`, `permissionSummary`, `executions`, `pendingApprovals`,
  `pendingTransfers`, `ownershipState`, `queueDepth`, `connected`. A pure projector must
  therefore either fabricate them or fail to typecheck, and D8 forbids the former. Five more
  members need a ruling despite an existing source: `sessionId` (null-handling), `snapshotSeq`
  (sequencing ownership), `activeWriterExecutionId` (recovery from the durable chain), plus the
  nullable `verification` and `review`, whose producer arrives only with `publish()` ingestion.
  Accounting: 8 ready + 5 ruling-needed + 8 no-source = 21.
- **The `pendingApprovals` vocabulary gap.** Neither closed event vocabulary contains an event
  that creates a pending approval. `EVENT_TYPES` (`packages/protocol/src/events.ts`) has no
  approval member, and `SESSION_LIFECYCLE_EVENT_TYPES`
  (`packages/protocol/src/lifecycle-events.ts`) contains only `approval_resolved`, whose
  semantics are to remove a matching pending approval (specification line 1902). The contract
  nonetheless presumes pending approvals exist: `BrokerCommand.approval_resolve` carries an
  `approvalId`, and the error union carries `approval_not_pending`. This is a specification
  gap, not a scheduling one, which is why it is disposed of by D9.2 rather than reserved under
  `PLAN-OPEN-7`.
- **`ownershipState` has no live producer.** `transitionOwnership` and `assertCurrentWriter`
  are called only from unit and acceptance tests; no production call site exists anywhere in
  the tree.
- The full field-by-field analysis is `TASK21B-D8-CORRECTION-ANALYSIS-beb83f4b.md`
  (sha256 `0f2b4eb8fb533a80de6b91b628863c0d5b8ba56ed8cfbb20006484d61e5ca6e7`), an artifact
  outside the repository.
