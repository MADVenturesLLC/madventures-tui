FOUNDER-ACT-20261016-TASK46-CORRECTION: the Task 46 round 1 verdict accepted, and one correction commit authorized on pull request 155

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `be996b1fd7ccbc1f5fdee914b1e9de31020b8461`
> **Head corrected:** `2acdab6ab0930ecb5e280088a957157da904ee22`, pull request 155, branch `build/m21-task46-r1`
> **Read with:** `DEC-20261014-03` (SHA-256 `494386cd2f946f2399e610a2b10b7d9f340f18edda4b38e75468a20afa0ce8e3`) with items 3a and 3b of my merge authorization of pull request 153 and item 3b of my merge authorization of pull request 154; `DEC-20261014-01` (SHA-256 `f1f2bd610b444103bb16c3c2ce48f15be186b428bdb6c5e1e56c1b98f55338cd`); `DEC-20261015-05` (SHA-256 `7cecc6c1d08a2a199bc12b1677e77641fd6b9757df2f17351602e58bebd19e43`); `DEC-20261013-03` (SHA-256 `249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7`) B2 and B4; plan Task 46; spec §§2.1 and 3.3

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The verdict.** Under `DEC-20261014-03` E4, a fresh Codex session on my Ubuntu PC, under reviewer id `codex`, reviewed `2acdab6ab0930ecb5e280088a957157da904ee22` and returned FAIL with four substantive findings. Its report is posted on pull request 155 as comment 6207017331. That comment carries the report without the header lines that name the reviewer id, the head and the verdict; this act records them as E5 of that act requires: reviewer id `codex`, head `2acdab6ab0930ecb5e280088a957157da904ee22`, verdict FAIL. It found items 2 to 6 of E4 passing and item 1 failing.

A2. **The findings.**

1. The `lifelines` member creates placeholder records whose close action is not yet bound, while the anonymous lifeline, the host and the child launch are all created by one call of `spawnPtyHost` in the `hosts` member. A failure injected at `children` returns a partial state with no child records although every launch was already instructed.
2. An exception thrown by a caller-supplied observer after a durable record changes the result: after `session_activated` the build returns `activation_failed` with an active snapshot and omits the activation from its resources; after `fencing_token_issued` the token is missing from the resources list; and one thrown at `storage` rejects the promise with no result at all.
3. `detail` copies raw text from a failing attester and from a thrown exception, where `DEC-20261014-03` B2 requires metadata only.
4. The exported function is `runTransactionalBuild(input)` with caller-supplied registration, host spawner, broker sources, process terminator and observers, where plan Task 46 declares `runTransactionalBuild(plan, injectFailureAt?)`.

The reviewer also showed that removing the provider comparison from `reattest` leaves all four tests passing.

A3. **What is mine.** Findings 1 and 4 rest partly on gaps in `DEC-20261014-03`, which the drafting assistant drafted. B1 of that act maps spec §2.1 steps 4, 5 and 6 to separate members without noting that the existing `spawnPtyHost` creates the lifeline, starts the host and sends the launch in one call. The plan's signature carries neither the envelope nor the session id that the build needs. Findings 2 and 3 are defects of the build.

A4. **The hosts.** The MacBook's Antigravity slot is held by Task 56 under `DEC-20261015-04` B11, so the correction runs on my Ubuntu PC.

A5. **The drafting assistant.** It drafted this act after reading the report, `packages/supervisor/src/build.ts` at the head, `spawnPtyHost` in `packages/broker/src/pty-host-supervisor.ts`, the test seam of `packages/supervisor/src/preflight.ts`, and spec §§2.1 and 3.3, at the commits in the header. None of that is an independent review.

## Part B: Founder rulings

B1. **The verdict and the count.** I accept the FAIL verdict of A1. Under `DEC-20261014-03` B10 and `DEC-20261014-01` B2 it is round 1 for the new builder under rubric milestone 6.

B2. **Steps and resources (finding 1).** `spawnPtyHost` is not changed. `DEC-20261014-03` B1 is read as follows. The `lifelines` member validates and prepares each execution's launch descriptor and records no resource. The anonymous lifeline of spec §2.1 step 4 is created inside `spawnPtyHost`, immediately before its host, which keeps the order spec §3.3 requires. The `hosts` member calls `spawnPtyHost` once per execution and, at that moment, records in `PartialBuildState`, in creation order, the lifeline, the host and the instructed child launch. The `children` member waits for each child's launched and ready facts and records its pid and process group. No record names a resource that does not exist, and every created resource is recorded when it is created.

B3. **The interface (finding 4).** The function the package index exports is `runTransactionalBuild(input)`, where `input` holds exactly `sessionId`, `envelope`, `plan` and the optional `injectFailureAt`. Plan Task 46's signature is read as this one, because the plan's form cannot carry the envelope and the session id. The adapter registration, host spawner, broker sources, process terminator and observers are not part of that input. Production uses `ADAPTER_REGISTRY`, `spawnPtyHost` and the default sources. Tests reach the others only through a second function in `build.ts` that the package index does not export, as `runPurePreflightWithDependencies` does in `preflight.ts`, and that runs the identical steps.

B4. **Observers and results (finding 2).** No exception from an observer or other seam changes the build's result or loses state. The build never rejects: every failure returns the result of `DEC-20261014-03` B2 with its partial state. Once `session_activated` is durable the build returns success. `resources` records the `fencing_token_issued` and `session_activated` records when each is appended.

B5. **Metadata-only detail (finding 3).** `detail` names only the step, the failure code and execution ids. It never contains text taken from an attester, an exception, a host, a child or the environment.

B6. **Tests.** `build-rollback.test.ts` keeps exactly the four tests plan Task 46 names. Their assertions are extended so that each of B2 to B5 is pinned and removing the provider comparison from `reattest` makes a test fail. The pull request description's D5 table maps each of B2 to B6 to the assertion that pins it.

B7. **The builder.** The builder is a fresh Gemini 4 session on the Antigravity surface on my Ubuntu PC, with Actor-Id `session:antigravity/m21-task46-r2`, under `DEC-20261014-01` B1 and B7, in a fresh clone of `build/m21-task46-r1` at the head corrected. Its only active workspace is that clone. It runs every test with the custodied runtime of `DEC-20261013-03` B2 item 2 under that act's B4; on that host the known-failure set applies as item 3b of my merge authorization of pull request 154 reads it. Item 3a of my merge authorization of pull request 153 limits what it reads, prints, runs and sends, as it limits `DEC-20261014-03` B9.

B8. **The description.** The builder saves a new pull request description covering both commits. It records the signed SHA-256 of addendum 1 to the Task 46 builder prompt as `37d84da591a0e8db691b868bbfe6b2d66fc44ccac1ae01d315828f532b9ecf73`, in place of the hash of the text as pasted. I replace the description of pull request 155 with it after pushing.

B9. **Order on the PC.** The build of `DEC-20261016-01` starts only after the review of this correction has ended, and no two test sessions run on the PC at once.

B10. **The review.** A fresh Codex session on my Ubuntu PC that has seen no Task 46 material reviews the corrected head under reviewer id `codex`, on the terms of `DEC-20261014-03` E4, and also reports whether each of B2 to B6 holds. A substantive finding is round 2.

## Part C: Scope

C1. One commit on `build/m21-task46-r1`, on top of the head corrected, that changes only the three paths of `DEC-20261014-03` C1. Every other path stays byte-identical, including `bun.lock`, every manifest and `packages/broker`.

## Part D: Verification

D1. The baseline and final checks of `DEC-20261014-03` D2 and D4, run on the PC with the custodied runtime, recorded verbatim.

D2. One deliberate break for each of B2 to B6, each failing a named test, restored with its file's SHA-256 confirmed; and the provider comparison removed, failing a test, and restored.

D3. A check that the package index exports no function taking a registration, spawner, sources, terminator or observer.

## Part E: Builder binding

E1. The commit subject is `fix(supervisor): correct the transactional build after review round 1`, and the commit message and the new description end with these three trailers:

```text
Role-Id: builder
Actor-Id: session:antigravity/m21-task46-r2
Execution-Surface: antigravity
```

E2. The builder makes no GitHub call. I push the commit to `build/m21-task46-r1` without force and replace the pull request description.

## Part F: Not authorized

- Any change to `spawnPtyHost` or any path outside C1.
- Task 47 rollback, any caller of `runTransactionalBuild`, and any live attester for a real surface.
- Leaving draft before the review of B10 passes.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-16

Actor-Id: founder
