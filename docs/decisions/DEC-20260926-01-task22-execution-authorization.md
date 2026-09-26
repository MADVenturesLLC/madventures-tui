FOUNDER-ACT-20260926-TASK22-EXECUTION: Task 22 execution authorization

> **Status:** ISSUED  
> **Repository:** `MADVenturesLLC/madventures-tui`  
> **Binding base:** `origin/main` = `b38be8a8662b437d510b30f4477bcee3d7961999`  
> **Binding tree:** `8c01076e9ed12fa6cfb0c4668a62036c2de9211f`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A — Basis

A1. Task 22’s two technical preconditions are satisfied at the binding base:

- M9 is reviewed under `DEC-20260925-01`, B1.
- Task 21b’s production projection is landed under `DEC-20260924-02` (D10-R1).

A2. No existing Founder act authorizes Task 22 at this base. This act is the required per-task authorization.

A3. This act governs Task 22 where its terms conflict with the Phase 3A plan. It does not close `PLAN-OPEN-7`, modify its text, or authorize any later task.

## Part B — Founder rulings

B1. **Stamped snapshot type.** Task 22 creates and exports `StampedBrokerSnapshot` from `packages/broker/src/in-process-client.ts`. It narrows only the delivered snapshot fields:

```ts
type StampedBrokerSnapshot =
  Omit<BrokerSnapshot, "snapshotSeq" | "connected"> & {
    readonly snapshotSeq: number;
    readonly connected: boolean;
  };
```

`packages/broker/src/client.ts` remains byte-identical. The in-process client’s `snapshots()` delivers `StampedBrokerSnapshot`; it is structurally compatible with the existing `BrokerClient` contract. `snapshotSeq` starts at `1` and increases by exactly one for every delivered snapshot. `connected` is `true` for every delivered snapshot before client closure.

B2. **PLAN-OPEN-7.** `PLAN-OPEN-7` remains OPEN. Its remaining open identifier does not gate Task 22: its Task 22-relevant values are ruled, and Task 21b is landed. This act does not close the identifier or authorize any task beyond Task 22.

B3. **Full-chain assertion.** The Task 22 accessor supplies the complete ledger chain starting at sequence `1`. The assertion belongs inside `test("snapshotSeq is strictly increasing by one")`; Task 22 retains exactly five named tests and requires no plan edit.

B4. **Delivery seam.**

- `RuntimeBroker.snapshotProjectionInput()` is Task 22’s one permitted read-only `RuntimeBroker` method. It returns the D10-R1 `SnapshotProjectionInput` from authoritative broker state and mutates nothing.
- `snapshots()` uses that accessor and `projectSnapshot()` to create each client-owned stamped snapshot on demand. It creates no broker subscriber registry, callback, socket, daemon, cache, or second broker authority.
- `output(executionId)` exposes a per-client, per-execution async buffer. Until a separately authorized production `OutputFrame` producer exists, production code does not insert frames into it.
- Task 22 may export one explicitly test-only, non-authority output-ingest helper from `in-process-client.ts`. It only inserts supplied test frames into that client’s own buffer; it does not write the ledger, mutate `RuntimeBroker`, invoke a process, or become a production delivery API.

B5. **Independent review substitute.** Before the Task 22 PR leaves draft, an independent non-authoring Codex review must inspect the exact final head for:

1. the B1 stamped-type boundary;
2. the B4 no-new-authority boundary;
3. immutable principal handling;
4. client closure isolation;
5. sequence and foreign-session refusal behavior.

Its result must be recorded on the PR. Required repository checks remain separate and must be green.

## Part C — Authorized scope

C1. The Builder may change exactly four paths:

1. Create `packages/broker/src/in-process-client.ts`
2. Modify `packages/broker/src/index.ts`
3. Modify `packages/broker/src/runtime-broker.ts`
4. Create `packages/broker/test/in-process-client.test.ts`

C2. The Builder may:

- export `createInProcessBrokerClient(broker, principal)`;
- bind and deep-freeze the client principal at construction;
- route every `request()` through `evaluateCommandLegality`;
- use `projectSnapshot()` only through `snapshotProjectionInput()`;
- implement client-local snapshot and output async iterables;
- export the factory and stamped type from `index.ts`, without exporting `RuntimeBroker`.

C3. The Builder must not change `client.ts`, `snapshot.ts`, the ledger, ownership or command-legality code, manifests, lockfiles, CI, specs, plans, decision records, or `apps/madbridge/src/tui/**`.

C4. No dependency, socket, named runtime endpoint, daemon, production output producer, or authority-bearing subscription API is authorized.

## Part D — Verification

D1. Before the first edit, re-fetch and stop unless `origin/main` equals the binding base and tree.

D2. Before and after implementation:

```bash
bunx tsc --noEmit
bun test packages/broker
```

The base is `252 pass`, `0 fail`, `13 files`. The final broker suite must be `257 pass`, `0 fail`, `14 files`.

D3. Write these five tests before implementation:

1. `test("the bound principal cannot be changed by the caller")`
2. `test("snapshotSeq is strictly increasing by one")`
3. `test("outputSeq is per execution and strictly increasing by one")`
4. `test("close releases only this client and does not terminate the session")`
5. `test("a command carrying a foreign sessionId fails with session_mismatch")`

D4. After writing the tests, run:

```bash
bun test packages/broker/test/in-process-client.test.ts -t "the bound principal cannot be changed by the caller"
```

The required RED proof is `Cannot find module "../src/in-process-client"`.

D5. The final focused suite must show exactly five passing tests. `git diff --check` must be clean. The changed-path list must contain exactly C1’s four paths.

## Part E — Builder binding and delivery

E1. Assign:

```text
Role-Id: builder
Actor-Id: session:claude-code/m10-task22-build-r1
Execution-Surface: claude-code
```

E2. Branch `build/m10-task22-r1` from the binding base in a clean, isolated worktree. Do not use `pr90` or any retained worktree.

E3. Make one commit:

```text
feat(broker): implement InProcessBrokerClient with an immutable bound principal
```

The commit and PR body end with the E1 attribution trailers.

E4. Open a DRAFT PR against `main`. Report the full commit SHA, PR number, verbatim RED proof, before/after suite counts, focused test result, diff stat, required-check state, and independent-review result.

E5. Stop at the M10 review checkpoint. This act does not authorize merge, deployment, later Task 23 work, or any production `OutputFrame` producer.

## Part F — Signature

Signed:

— Michael Daley

Date: 2026-09-26

Actor-Id: founder