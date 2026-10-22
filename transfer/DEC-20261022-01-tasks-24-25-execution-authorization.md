FOUNDER-ACT-20261022-TASKS-24-25-EXECUTION-AUTHORIZATION: publish legality with ingestion of accepted events, and the atomic published-incident pair

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `3dc42f8b687fbd41cca45456f127e66114ce212c`
> **Binding base:** for each task, the `origin/main` commit its builder prompt names, which must contain this act and, for Task 25, the merge of Task 24
> **Read with:** `AGENTS.md`; spec §§9.3, 9.4, 9.6, 9.15.3 and 9.15.4; plan §4, §5 Tasks 24 and 25 and the M10 questions (i) to (iii) that follow Task 25, and §11.3; `DEC-20260924-03` B1 and B3; `DEC-20260926-01` C4; `DEC-20261015-05` B1 to B6; `DEC-20261020-01` B1 and B5; `DEC-20261021-01` B3 and B4

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What was checked.** The drafting assistant read, at the commit in the header, spec §§9.3, 9.4 and 9.6; plan §4, Tasks 24 and 25 and the three M10 questions after Task 25; `packages/broker/src/in-process-client.ts`, `runtime-broker.ts`, `snapshot.ts` and `client.ts`; `packages/broker/test/in-process-client.test.ts`; `packages/protocol/src/events.ts` and `lifecycle-events.ts`; `packages/ledger/src/ledger.ts` and `rebuild.ts`; and the acts in the header. It ran no test.

A2. **The order.** `DEC-20261020-01` B1 places Task 24, then Task 25, after the build of `DEC-20261016-01`, which merged as `3dc42f8b687fbd41cca45456f127e66114ce212c`. `DEC-20260924-03` B3 places both after M21 and before M22. `DEC-20261015-05` B1 lets one act cover both.

A3. **Facts at the header commit.**

1. `InProcessBrokerClient.publish()` returns `unauthorized` for every event, citing `DEC-20260926-01` C4.
2. `Ledger.append` accepts any `LedgerEventV1`, which includes `BridgeEventV1`, and `reduceLedgerEvent` returns the state unchanged for a record not authored by `madbridge`.
3. `projectSnapshot` gives `executions` from supplied launch facts or `null`; `pendingApprovals` as the empty array, because no event can create a pending approval; and `pendingTransfers`, `verification` and `review` as `null`, meaning not produced.
4. `PublishedIncidentPayloadV1` has exactly `incident_id`, `reason` and `severity`, and `INTERRUPTION_REASON_CODES` includes `execution_reported_incident`.
5. Plan Task 24 names thirteen tests and expects fourteen to pass.
6. `in-process-client.test.ts` calls `publish()` with a malformed event from the Founder principal and asserts only that its results are fresh and equal across clients.

A4. **What stays open.** Item 4a of my merge authorization of pull request 183 still requires a same-repository check before any act authorizes a caller of preflight. The symlinked-worktree test and the shared-directory listing of `preflight creates nothing` also remain for a later act. Neither task here calls preflight, so none of these is ruled here.

A5. **The drafting assistant.** It drafted this act and the acts it amends from `DEC-20261016-01` on. None of that is an independent review.

## Part B: Founder rulings

B1. **One act, two tasks.** This act authorizes Task 24 and then Task 25, under `DEC-20261015-05` B1. Each starts only from a builder prompt I sign naming its binding base and this act, lands as its own pull request with its own Tier-2 review and merge authorization, and Task 25 starts only after Task 24 has merged.

B2. **Publish legality, order and identity (Task 24).** `evaluatePublishLegality(event, snapshot, principal)` decides in this order, and no other:

1. **Schema.** The event must parse with `parseBridgeEvent` from a structured clone of the input. A published `incident` must also carry a payload with exactly the three keys of `PublishedIncidentPayloadV1`: non-empty string `incident_id` and `reason`, and `severity` one of `low`, `medium` or `high`. Any failure is `invalid_command`.
2. **Principal and identity.** A `founder_tui` principal publishing any event is `unauthorized`. An execution principal whose bound id differs from `event.sender_execution_id` is `unauthorized`. `event.session_id` differing from the snapshot's `sessionId` is `session_mismatch`. With `executions` null the result is `invariant_failure`, with detail `executions not produced by the snapshot`. A sender absent from `executions` is `execution_not_found`. `sender_role`, `sender_surface`, `sender_model` or `sender_provider` differing from that execution's identity, `task_envelope_hash` differing from the snapshot's `taskEnvelopeHash`, or `repository_fingerprint` not deep-equal to the snapshot's `repositoryFingerprint`, is `identity_mismatch`.
3. **Reserved legacy type.** `pause`, `resume` and `session_close` are `unauthorized` in every phase.
4. **Phase, incident and readiness.** The six-row `publish()` matrix of spec §9.3 applies as written. A sender whose state is not `ready`, in a phase and incident state that would otherwise be legal, is `invariant_failure`, as spec §9.3 predicate 6 rules for writer-only commands.
5. **References.** This step runs only for events the earlier steps accept, so an incident or phase failure always masks it. Under B4, an `action_accept` or `action_reject` is `approval_not_pending`, and an `ownership_accept` or `ownership_reject` is `invariant_failure`. Every other type references nothing and needs no pending approval.

`BrokerResult.commandId` equals `event.event_id` on every path, including a schema failure where `event_id` is readable; where it is not, `commandId` is the empty string. `detail` names only the failing step and code, never event content.

B3. **Ingestion of accepted ordinary events (Task 24; plan question i).** `RuntimeBroker` gains one method, `publish(event: BridgeEventV1): Promise<BrokerResult>`. It appends the accepted event with one `Ledger.append`, folds it through `reduceLedgerEvent`, publishes exactly one snapshot, and returns `ok: true` with that snapshot's `snapshotSeq` as `acceptedSnapshotSeq`. A failed append returns `ledger_write_failed` and publishes no snapshot. `InProcessBrokerClient.publish()` calls `evaluatePublishLegality` against the current snapshot and the bound principal, and calls `RuntimeBroker.publish` only for an accepted ordinary event. `verification`, `review` and `pendingTransfers` stay `null`: their fold is not authorized here and needs a later act, which also rules how ownership events are ingested.

B4. **References while nothing is produced (plan question ii).** `pendingApprovals` is the empty array by D9.2, so no published event can reference a pending approval: `action_accept` and `action_reject` fail with `approval_not_pending`. `pendingTransfers` is not produced, so `ownership_accept` and `ownership_reject` fail closed with `invariant_failure`, detail `pendingTransfers not produced by the snapshot`, and never with an ownership error that would assert a fact the snapshot did not produce. `ownership_request` and `ownership_release` reference no request. When a later act folds approvals or transfers, it rules the reference field and replaces these limbs.

B5. **Incidents before Task 25.** In Task 24, a published `incident` that passes steps 1 to 4 is not appended. `InProcessBrokerClient.publish()` returns `invariant_failure` with detail `incident publication not wired` and changes nothing. Task 25 replaces that limb.

B6. **`DEC-20260926-01` C4.** C4 is read to permit `InProcessBrokerClient.publish()` to reach `RuntimeBroker.publish` under B3 and `RuntimeBroker.publishIncident` under B7. Both stay reachable only through an in-process client the supervisor constructs with a bound principal. Nothing else in C4 changes: no socket, endpoint, daemon, subscription API or production output producer is authorized.

B7. **The atomic incident pair (Task 25).** `RuntimeBroker.publishIncident(event: BridgeEventV1): Promise<BrokerResult>` builds the derived `session_interrupted` record. Its payload copies `incident_id`, `reason` and `severity`, sets `source_event_id` to the event's `event_id`, `reported_by_execution_id` to its `sender_execution_id`, and the reason code to `execution_reported_incident`. The method calls `Ledger.appendMany` exactly once, with the event and then the derived record, folds both rows, and publishes exactly one snapshot afterwards, in phase `interrupted`. It then runs the existing invalidation, closing and closed sequence, and returns `ok: true` only after the `session_interrupted` row is durable and the published phase is `interrupted`. A failed `appendMany` returns `ledger_write_failed`, appends nothing and publishes nothing. `InProcessBrokerClient.publish()` routes an incident that passes B2 steps 1 to 4 to `publishIncident`. Supervisor-originated interruptions keep both source fields `null`.

B8. **Tests (Task 24).** `packages/broker/test/publish-legality.test.ts` holds exactly seventeen tests:

- the thirteen plan Task 24 names, the six `publish row:` tests named for their rows;
- `an accepted ordinary event is appended once and published in exactly one snapshot`;
- `an ownership_accept fails closed while pendingTransfers is not produced`;
- `a legal published incident fails closed until its atomic path exists`;
- `a founder principal publishing any event is unauthorized`.

Plan Task 24's "14 pass" is read as seventeen. No other test file changes, and every existing broker test passes unchanged.

B9. **Tests (Task 25).** `packages/broker/test/incident-atomicity.test.ts` holds exactly the five tests plan Task 25 names. In `publish-legality.test.ts`, the test `a legal published incident fails closed until its atomic path exists` is replaced by `a legal published incident takes the atomic incident path`, so that file still holds seventeen. Nothing else in that file changes.

B10. **Builder, reviewer, host.**

- **Builder:** for each task, a fresh Codex CLI session on my MacBook, with Actor-Id `session:codex/m10-task24-r1` or `session:codex/m10-task25-r1`. It works in its own clone at the binding base and uses the macOS certification runtime of `DEC-20261013-03` B2 item 1 under the PATH rule of the M20 corrections builder prompt.
- **Reviewer:** a fresh Gemini 4 session on the Antigravity surface on my MacBook, reviewer id `antigravity`, which has seen no material of that task.
- **Host:** no known-failure set and no timing exception applies on the MacBook. The limits of item 3a of my merge authorization of pull request 153 bind both sessions; each may send to its own provider, through its own surface, what its harness sends while it works.
- **Identity reports:** record a model or setting the harness does not show as not shown, as addendum 1 of the M20 corrections builder prompt ruled.

B11. **Counting.** A substantive finding counts under rubric milestone 7, as plan §11.3 and §4 assign M10, for that task's builder. Each task's rounds are counted separately.

## Part C: Scope

C1. **Task 24.** One commit that changes exactly `packages/broker/src/publish-legality.ts` (new), `packages/broker/src/in-process-client.ts`, `packages/broker/src/runtime-broker.ts` and `packages/broker/test/publish-legality.test.ts` (new). In `runtime-broker.ts` it adds only the `publish` method of B3. Every other path stays byte-identical, including `bun.lock` and every manifest.

C2. **Task 25.** One commit that changes exactly `packages/broker/src/runtime-broker.ts`, `packages/broker/src/in-process-client.ts`, `packages/broker/test/incident-atomicity.test.ts` (new) and `packages/broker/test/publish-legality.test.ts`, the last only as B9 allows. In `runtime-broker.ts` it adds only `publishIncident` and what B7 requires of it. Every other path stays byte-identical.

## Part D: Verification

D1. **Baseline, each task:** `bun install --frozen-lockfile`, `bunx tsc --noEmit`, `bun test packages/broker` and bare `bun test`, each once, in the foreground, with `uptime` recorded before each test run, all verbatim.

D2. **RED and breaks, each task:** the plan's named RED run, verbatim. Then one deliberate break per required behavior, each failing a named test and restored with its file's SHA-256 confirmed:

- **Task 24:** each step of B2's order, B3's single append, each limb of B4, and B5.
- **Task 25:** a second append call, a snapshot between the two rows, the copied source fields, and the return before `interrupted`.

D3. **Final, each task:**

- `tsc` exits 0;
- the task's test file shows exactly the count B8 or B9 gives;
- `bun test packages/broker`, and for Task 25 also `bun test packages/ledger`, show 0 fail;
- bare `bun test` shows 0 fail;
- for Task 25, the incident path has exactly one `appendMany` call site;
- `git diff --check` is clean;
- the changed paths are exactly that task's C1 or C2.

## Part E: Builder binding and review

E1. **Commits.** Each commit takes plan Task 24's or Task 25's commit subject. Its message and the pull request description end with these three trailers, for that task's Actor-Id, and no line after them:

```text
Role-Id: builder
Actor-Id: session:codex/m10-task24-r1
Execution-Surface: codex
```

E2. **No GitHub calls.** The builder makes none. I push the branch, open the draft pull request and post the verdict.

E3. **Review.** PASS only if all of these hold, and the reviewer reproduces D3 and at least two breaks of D2, and tries to defeat the tests:

- **Task 24:** B2 to B6 and B8 hold.
- **Task 25:** B7 and B9 hold, and no snapshot with phase `active` and a non-null incident can be observed.
- **Paths:** the changed paths are exactly that task's.

## Part F: Not authorized

- Any fold of `verification`, `review`, `pendingTransfers` or `pendingApprovals`; any ingestion of ownership events beyond B3's append; any new snapshot member.
- Any socket, endpoint, daemon, subscription API or other path to `publish` than the in-process client.
- Any caller of preflight, Task 49, M22 work, or any change outside C1 and C2, including the plan, the spec and every decision record.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-22

Actor-Id: founder
