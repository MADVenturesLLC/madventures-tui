# DEC-20260918-01 — Founder Decision D9: BrokerSnapshot Projection Sources (closes PLAN-OPEN-7)

**Status:** ISSUED — signed 2026-09-19T01:16Z; amended by D9-A1 and D9-A2
**Repository:** `MADVenturesLLC/madventures-tui`
**Ruling head at time of issuance:** `origin/main` @
`a8ecdc8a80559ca5e0ccfd169b65f653b0c7668c` (tree
`a9343ee1d38fe0b199d2ab513e88c88722b6489b`), the PR 81 merge commit.
**Provenance:** Delivered directly by the Founder (Michael Daley) as the
signed instrument `m9/ISSUED-FOUNDER-D9-SNAPSHOT-SOURCES-a8ecdc8a.md`
(sha256 `55a8b16ae92cfba9aeea8cff65fb2b2117e30bbff1a0357723ef54b76927a44a`).
Transcribed verbatim into repository-local, citable provenance per the
pattern established by
[`DEC-20260916-01`](DEC-20260916-01-task21b-snapshot-producer.md).

**Amendments — read before relying on any value in the ruling below.** The
ruling is transcribed **verbatim** and therefore still carries the values D9
carried when it was signed. Three of them have since been amended, and the
amending instrument governs. The ruling text is not edited, because editing a
signed instrument's transcription is the custody defect D9-A1 Part C1 exists to
correct.

| Ruling text below | Amended to | By |
|---|---|---|
| Item 9: Task 21's tests "must stay **21/21** GREEN" | **22/22** — D9-A1 adds exactly one test. A regression in any of the original 21 remains a stop, not a fix | D9-A2 Part B1 |
| Item 18: branch from `a8ecdc8a80559ca5e0ccfd169b65f653b0c7668c` | `ea079827a585f8fd6d628f5f65faaea03af6df99` (tree `e3d5f476872b47afd40a363d58d90f8daace1fca`), every governing file byte-identical at both commits | D9-A2 Part A1 |
| Item 18: "does NOT authorize … any change to … `command-legality.ts`" | Superseded **as to the two files D9-A1 Part A names** — `command-legality.ts` and `command-legality.test.ts`. Item 9 ruled the behaviour while item 18 barred the file that implements it; D9-A1 exists to resolve that | D9-A1 Part A |

Item 9's substantive ruling is **unchanged** and governs: a writer-only command
against an unresolvable target is `invariant_failure`, and `pty_terminate`
remains ungated. Only the count limb moved.

## Ruling (verbatim)

  # ISSUED — Founder Decision D9: `BrokerSnapshot` Projection Sources (closes `PLAN-OPEN-7`)
> **Status: ISSUED — signed 2026-09-19T01:16Z; amended by D9-A1**
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Binding base at preparation:** `origin/main` = `a8ecdc8a80559ca5e0ccfd169b65f653b0c7668c`
> (tree `a9343ee1d38fe0b199d2ab513e88c88722b6489b`), the PR 81 merge commit. Verified 2026-09-18
> by fresh `git fetch`. Governing files at this base:
> - `packages/broker/src/client.ts` sha256 `4c48911ced583475c9ecedeef33b2fb674dab4ef33dfbbe393bfff5264f86735`
> - `docs/decisions/PLAN-OPEN-7-snapshot-projection-sources.md` sha256 `6e63f7ac42dfe0d01d37c9be8c85c5902ce04602cbeca0f5726edafda4554eb6`
> - `docs/decisions/PLAN-OPEN-approval-record.md` sha256 `03d065e7df8f80e5bf5bf4edf59059eee7484112b546968e6fbef78571471aae`
> - plan sha256 `85b8c372162f523e5618869b581c8b3183c5ae403c67d874747a89618221656e`
> - spec sha256 `85b121dc3f1ecb2809b13df29340994c9afd0084afd47284a778b89d5ce87907`
>
> **Provenance of the values.** Every ruling in Part A was stated by the Founder in the Hermes
> brief of 2026-09-16 ("D9: SUBSET + contract amend — unsourced fields become `T | null` ('not
> produced'); pendingApprovals deferred (no M4/M5/M6 reopen); connected = Task 22; queueDepth
> null until defined; ownershipState deferred; snapshotSeq = Task 22 M9 sequence;
> task/permissionSummary/executions deferred; sessionId null → projection failure;
> activeWriterExecutionId may recover from fencing_token_issued else null; verification/review
> null until publish()"). This instrument transcribes those rulings against the 21 members as
> declared at the base and resolves one collision (item 9) the brief predates. Nothing else is
> added.

---

Founder Decision D9 — `BrokerSnapshot` snapshot-projection sources

Repository: MADVenturesLLC/madventures-tui
Date: 2026-09-18

I, Michael Daley, Founder of MAD Ventures and Founder OS, rule as follows.

## Part A — The ruling (closes `PLAN-OPEN-7` items (a)–(e))

1. **(a) Scope — SUBSET.** Task 21b projects the *sourceable subset* of the Task 20
   `BrokerSnapshot` contract. Every member that has no authoritative source at the Task 21b
   base is projected as **`null`, meaning "not produced"** — never fabricated, never defaulted.
   The contract is amended so that those members are typed `T | null` (Part B). A `null` is a
   truthful statement that the projector had no source; it is not an error and not a
   placeholder.

2. **(b) `connected`** describes this client's subscription and is a property of
   `InProcessBrokerClient`, not of broker state. Task 21b projects `connected: null`; Task 22
   sets it. **`queueDepth`** has no definition; Task 21b projects `null` until a later ruling
   defines it.

3. **(c) `ownershipState` — DEFERRED.** The Phase 2 ownership machine has no live call site.
   Task 21b projects `null`. Wiring the machine is its own authority-bearing task.

4. **(d) `snapshotSeq`** is the M9 per-published-snapshot sequence (starts at 1, +1 per
   published snapshot) and belongs to the client (Task 22). Task 21b projects `null`; the
   projector never manufactures a sequence. The M8 per-lifecycle counter in `RuntimeBroker`
   is not this value.

5. **(e) `task`, `permissionSummary`, `executions` — DEFERRED.** Broker-side retention of
   the task envelope and execution identities does not exist at M10. Task 21b projects
   `null` for each; envelope retention is recorded as a named precondition of whichever
   task first needs these members.

6. **`sessionId`** — `LifecycleState.sessionId` is `string | null`. A `null` there is a
   **projection failure** (fail closed: the projector refuses, it does not emit a snapshot
   with `sessionId: null`). The contract type stays `string`.

7. **`activeWriterExecutionId`** — the projector MAY recover it from the durable
   `fencing_token_issued.writer_execution_id` on the chain; if no such record exists it
   projects `null`. It is never inferred from any other source. (Type already `string | null`.)

8. **`verification`, `review`** — `null` until `publish()` ingestion lands (Task 24). (Types
   already nullable.)

9. **Collision resolved — `executions` and Task 21.** Task 21's `command-legality.ts` (landed
   at `0f047461…`) reads `snapshot.executions` and `snapshot.activeWriterExecutionId` for its
   readiness limb (clause A). Under item 5 the projector emits `executions: null` at M10.
   Ruling: `evaluateCommandLegality` treats `executions: null` exactly as it treats an
   execution that cannot be resolved — the clause A / clause B stop already pinned in the
   Task 21 block: a writer-only command against an unresolvable target is `invariant_failure`;
   `pty_terminate` remains ungated. This is the existing behaviour, not new behaviour; the
   type change makes it explicit. Task 21's tests are re-run at the B2 head and must stay
   21/21 GREEN with `tsc` exit 0; if they do not, that is a **stop**, not a fix.

10. **`pendingApprovals`** is not in this ruling. It is disposed of by D9.2 (deferred from
    Task 21b; type unchanged; no M4/M5/M6 reopen) and stays as `DEC-20260916-01` records it.

11. **Members with a ready source** (rows 1–8 of the FIELD-SOURCE TABLE: `phase`,
    `taskEnvelopeHash`, `repositoryFingerprint`, `fencingToken`, `tokenState`, `incident`,
    `eventLog`, `ledgerSeq`) are projected from the sources the table names. Types unchanged.

## Part B — Contract amendment (`packages/broker/src/client.ts`)

12. In `export interface BrokerSnapshot`, and nowhere else, change exactly these seven
    member types:

    | Member | From | To |
    |---|---|---|
    | `snapshotSeq` | `number` | `number \| null` |
    | `connected` | `boolean` | `boolean \| null` |
    | `task` | `TaskEnvelopeV1` | `TaskEnvelopeV1 \| null` |
    | `executions` | `readonly ExecutionSnapshot[]` | `readonly ExecutionSnapshot[] \| null` |
    | `permissionSummary` | `PermissionSummarySnapshot` | `PermissionSummarySnapshot \| null` |
    | `ownershipState` | `OwnershipState` | `OwnershipState \| null` |
    | `queueDepth` | `number` | `number \| null` |

    Unchanged: `sessionId: string` (item 6), `activeWriterExecutionId: string | null`,
    `fencingToken: number | null`, `verification`/`review`/`incident` (already nullable),
    `pendingApprovals` (D9.2), `pendingTransfers` (row 18 stays `FOUNDER-RATIFICATION-REQUIRED`
    → **ruled here: `null` until `publish()` ingestion, Task 24** — add to the table above as
    the eighth row: `pendingTransfers` → `readonly PendingTransferSnapshot[] | null`), and
    every ready-source member in item 11.

13. **No other type, interface, function, or file in `packages/**` or `apps/**` changes.**
    Where the amended types break a compile in `packages/broker/test/broker-client-contract.test.ts`,
    the fixture is updated to the narrowest change that restores `tsc` exit 0 (a `null` or an
    existing value; never a new invented value). The legacy TUI `BrokerSnapshot` in
    `apps/madbridge/src/tui/types.ts` is a different type and is not touched.

## Part C — Records (docs)

14. `docs/decisions/PLAN-OPEN-7-snapshot-projection-sources.md`: status → **RATIFIED (D9,
    2026-09-18)**; each of (a)–(e) gets its ruling from Part A appended in a "Ruling" column
    or section; the "Rule (plan §1A, unchanged)" and non-authorities sections stay.
15. `docs/decisions/PLAN-OPEN-approval-record.md`: PLAN-OPEN-7 scope row → ruled; add
    **Revision 6.1 — D9 ruling (2026-09-18)** to the approval lineage, recorded in Founder
    authorization artifact #18 per the standing convention (the Founder posts that record
    on #18 before merge authorization).
16. Plan FIELD-SOURCE TABLE (Task 21b block): every `FOUNDER-RATIFICATION-REQUIRED` status
    → the ruled value (`null (D9)`, `projection failure (D9)`, `recover-or-null (D9)`, etc.).
    Task 21b precondition "D9 values ruled — currently UNMET" → "**ruled (D9, 2026-09-18)**".
    §1A `PLAN-OPEN-7` row → ruled. Spec §9.4: one paragraph recording the `T | null`
    "not produced" semantics beneath the D9.2 paragraph. Count fields (six open items → five)
    corrected where they appear.
17. New `docs/decisions/DEC-20260918-01-d9-snapshot-projection-sources.md` carrying this
    instrument verbatim, same pattern as `DEC-20260916-01`.

## Part D — Boundaries

18. This act authorizes the **B2 publication only**: the type amendment in Part B and the
    records in Part C, as one PR on a branch from `a8ecdc8a80559ca5e0ccfd169b65f653b0c7668c`.
    It does NOT authorize Task 21b implementation (that is D10, a separate exact-base act
    after B2 merges), Task 22, the M9 checkpoint, any `snapshot.ts`, or any change to
    `runtime-broker.ts`, `ownership-machine.ts`, `command-legality.ts`, or the ledger.
19. Merge of B2 is a separate Founder act naming the exact head SHA, after independent
    review at that head, required checks green, and threads resolved.
20. Stop conditions apply unmodified.

## Part E — Signature

Signed:

— Michael Daley

Date: 2026-09-19T01:16Z
Actor-Id: founder
