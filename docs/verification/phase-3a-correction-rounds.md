# Phase 3A — Correction-Round Record

**Task:** 60 (Stage 0, the only task outside M1–M26)
**Rubric §7.2 milestone:** 1
**Authority:** plan §11.3 (`docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` at
`1b46856a646266d3c7eb9882cc74f0c5f9f4cfb5`), applied verbatim.
**Implementation base:** `70c6a2359feb88cc4e3cc21301e18221313f6f8e`

This file is the running correction-round log required by plan §11.3. It is written when a verdict
occurs and is never reconstructed at qualification time. It records every review verdict under both its
plan milestone (Task 60) and rubric milestone (1); the reassignment trigger evaluates the
rubric-milestone total.

## Round 1

- **Verdict target:** `dd92efadf8256169470109d378ac1c016505e2a7`
- **Reviewer:** Antigravity Tier-2 (per plan §11.3, countable verdicts come from either Plato/Codex
  pre-commit review or Gemini Antigravity Tier-2 review)
- **Findings:** incomplete raw help evidence and inaccurate universal P2 claim
  - §5.2 help outputs partially reproduced as "byte-identical" markers rather than in full;
  - §5.3 model list truncated;
  - the universal claim "no event or field carries a model or provider identifier" was false as written
    — `stream-json`'s `init` carries `model` when `--model` is supplied explicitly;
  - exit statuses captured under a defective `zsh` harness (`${PIPESTATUS[0]}` expands empty in zsh)
    were blank and therefore unverified.
- **Resolution:** correction round 1 implemented by Claude Opus 5 (provisional implementer), committed
  as `cd703916be04ddc56f6cab95368b92b7a4fb6b66` (docs only).

## Round 2

- **Verdict target:** `cd703916be04ddc56f6cab95368b92b7a4fb6b66`
- **Reviewer:** Antigravity Tier-2 (per plan §11.3)
- **Findings:** remaining output elisions, unverified config-probe exit status, and overclaimed
  request-echo semantics
  - §5.2 of `cd70391` still elided `agy help`, `agy agents --help`, `agy help agent`, `agy help models`
    as "byte-identical… not reproduced", and §5.3 truncated the model catalog — every command's output
    must be reproduced in full, including repeated identical outputs;
  - `agy config get model`'s exit status was recorded as "non-zero" by inference from its error text
    without observation — the observed status is **0**;
  - §7 of `cd70391` claimed as proven that `init.model` "is an echo of requested intent, not resolved
    fact" — the evidence supports only conditional presence consistent with an echo, not proof of echo
    semantics, and no documented contract establishes `init.model` as exact-model actual-use
    attestation.
- **Resolution:** correction round 2 implemented by Hermes (local model `deepseek-v4-flash`), per
  Founder reassignment of the correction author (see below), committed as a docs-only commit on
  `evidence/phase-3a-antigravity-preliminary` (exact SHA verifiable in repository history).

## Current count

- **Round 1:** 1 (rubric milestone 1)
- **Round 2:** 2 (rubric milestone 1)
- **Total:** **2** of 2 (the §7.3 two-round budget for rubric milestone 1)

## Accounting notes (per plan §11.3)

- **Plan-authoring reviews do not count.** Reviews of the implementation-plan document
  (`1b46856…`/`70c6a23…`) before implementation authorization are plan-authoring history, not
  implementation correction rounds. The rubric-milestone counter began at zero with the first verdict
  on implemented milestone work (`dd92efa…`).
- **Implementing the existing round-2 verdict does not create round 3.** Round 2 was one review verdict
  for milestone 1 identifying substantive defects; all substantive findings in that verdict count as one
  round. The round-2 implementation (this revision) is not itself a countable verdict.
- **Task 1 and every other task remain unauthorized and unstarted.** This record covers Task 60 only.
  Nothing here authorizes any other Phase 3A task.
- **Founder reassigned the correction author from Opus 5 to Hermes before the automatic "more than two
  rounds" trigger.** Per plan §11.3, reassignment is *required* at more than two correction rounds on
  one milestone; here the Founder reassigned the correction author before that trigger, and sound
  artifacts remain preserved: the prior evidence document (`cd70391`) and this record remain intact in
  the repository's history. Per plan §11.4, the same builder rubric applies to any Founder-authorized
  successor builder from the moment of reassignment; sound code is preserved if reassignment occurs.

## Verification

No timestamps, reviewer identities, or verdict links are invented in this record beyond the commit SHAs
and reviewer role recorded above, which are verifiable in the repository history and the review
trail.

---

# Phase 3A Task 5 — Correction-Round Record

**Task:** 5
**Plan milestone:** M2
**Rubric §7.2 milestone:** 3
**Authority:** Founder Task 5 correction-round-1 authorization for the signed-envelope hash contract.
This section is appended after the Task 60 record. The earlier Task 5 scope reconciliation remains an
authority-boundary ruling under plan §10 item 17 and does not count as a correction round.

## Round 1

- **Verdict target:** `43300d438daf845821c7336a5a4e27cf12d45471`
- **Reviewer:** Plato/Codex pre-merge verification
- **Finding:** normalization mutated a successfully verified signed envelope, leaving returned contents
  inconsistent with `envelope_hash`
- **Resolution:** fail-closed rejection of noncanonical wire domains plus the two named regression
  tests, implemented in the same follow-up commit as this record; exact SHA is verifiable from history
- **Current Task 5 count:** 1 of 2
- **Task 6 remains unauthorized.**

## Round 2

- **Verdict target:** `41d213b65b249ae9773f5efc5c8a6bdb66896f4c`
- **Reviewer:** Plato/Codex pre-merge verification of CodeRabbit's corrected-SHA feedback
- **Findings in the single verdict:**
  - canonical hash regression test did not directly compare returned hash to the pre-parse signed hash;
  - the `rejects unknown surface` name misclassified malformed syntax, while CodeRabbit's proposed valid-unknown rejection would improperly introduce Task 6 eligibility into Task 5
- **Resolution:** preserve both pre-parse-hash and recomputation assertions; rename the malformed-syntax test; add the syntactically valid unregistered-surface schema-layer test
- **Resolution implemented in the same follow-up commit; exact SHA is verifiable from history**
- **Current Task 5 count:** 2 of 2
- **No reassignment trigger yet; plan requires reassignment only at more than two rounds**
- **Task 6 remains unauthorized.**

# Phase 3A M19 Task 42 — Bounded Scope Clarification Record

**Date:** 2026-08-28
**Founder ruling:** Michael Daley (Founder implementation authorization for M19 Tasks 42–44, bound to M19 section SHA-256 `411500a3fad1b8107c52f7c8591381d7d825ee9379194c7edc14484d7d39f61b`; pre-implementation Tier-2 verdict `PASS-WITH-ADVISORIES`, artifact SHA-256 `1b22f3fb1a4927b2d9a1ba65f6b305ca2451dba5e713254f260d6cc070deba5a`; approved implementation base `7001409894c3757b2c77b307c2758ca15b3a064d`).
**Implementation branch:** `build/m19-tasks42-44-r1` @ `7001409894c3757b2c77b307c2758ca15b3a064d`

## Conflict recorded

Task 42's plan file list (plan §5, lines 2070–2077) omits `packages/pty-host/test/main-guard.test.ts`, but Task 42 Step 3 wires `verifyAndLaunch` hash verification into `packages/pty-host/src/main.ts` (in the list), and Step 5 requires `bun test packages/pty-host packages/broker` green. The M18 `main-guard.test.ts` launches real children (`/bin/cat`, `/bin/sh`) with fake `sha256` values (`"a".repeat(64)` … `"f".repeat(64)`, `"0".repeat(64)` at lines 260, 315, 353, 365, 394, 428, 787). With verification live, those fixtures fail with `ArtifactHashMismatch` before `ready`, breaking the lifecycle tests. Plan rule 24 forbids skipping or disabling required tests.

## Founder ruling (verbatim direction)

> Stop Task 42 before modifying the tests. The plan's Task 42 production integration and full-suite-green requirement conflict with the omission of main-guard.test.ts from the file list. Treat this as a bounded scope clarification: add packages/pty-host/test/main-guard.test.ts to Task 42's test scope. Keep verifyAndLaunch wired into main.ts; do not defer integration. Update successful launch fixtures to use a real executable and computed matching SHA-256. Preserve negative mismatch tests and assert fail-closed behavior with no child created. Do not skip tests or weaken production hash verification. Record the clarification before editing, then rerun Task 42 RED→GREEN, the full pty-host suite, broker suite, and typecheck. Stop at the Task 42 checkpoint.

## Scope effect

- **Added to Task 42 test scope:** `packages/pty-host/test/main-guard.test.ts` (modify — real executable + computed SHA-256 for successful-launch fixtures; negative mismatch tests preserved).
- **Unchanged:** Task 42 production files (`launch.ts`, `main.ts`, `pty-host-supervisor.ts`, broker `index.ts`), new test files (`launch.test.ts`, `pty-host-supervisor.test.ts`), Task 43/44 scope, adapter `launch()` deferral to M20, and all non-authorizations in the Founder's M19 authorization.
- **No test is skipped, disabled, or weakened.** Production hash verification is not weakened.

## 2026-08-28 — M19 Task 42, independent review round 1 (REQUEST CHANGES → remediation)

**Review verdict:** REQUEST CHANGES on PR #35 head `eb7a02d96be5dfd8239d776285eb33a914242386`. Two blocking findings, one major.

**Accepted findings (validated against spec):**
1. BLOCKING — lifeline descriptor contract not implemented: `spawnPtyHost` used ordinary `stdin: "pipe"` with no explicit close-on-exec write-end ownership marking, no duplicate-descriptor closure, and no EOF-as-death observability proof. §3.2 (sole write-end ownership, close-on-exec) and §3.3 step 2–3 require the descriptor-level lifeline.
2. BLOCKING — `test("the child is created after the lifeline is established")` was synthetic: the ordering signal was inserted by the test itself, not observed from a real supervisor→host→child pipe. Tautology confirmed.
3. MAJOR — `env: { ...process.env }` violates §3.2/§5.4 host passes only the allowlisted environment; ambient inheritance is prohibited.

**Remediation probes (both via real process experiments):**
- Parent-death test (layered harness): child with plain stdin pipe observed `STDIN-EOF at 780 ms` after supervisor SIGKILL — stdin-pipe-as-lifeline EOF detection works at the descriptor level.
- Bun `ipc` channel also detects parent death but is NOT the spec mechanism; not used.
- Extra-fd `stdio` arrays in `Bun.spawn` proved unreliable (`EBADF` via posix_spawn); lifeline stays on stdin as §3.2 mandates.

**Remediation scope (same Task 42, new commit on the same branch):**
- `spawnPtyHost` implements the §3.2 descriptor contract explicitly: the supervisor holds the sole write end of the host's inherited stdin pipe (a `FileSink` owned only by the supervisor), never leaks that fd to any other process (close-on-exec hygiene by construction — no duplicate references exist), closes unintended duplicates, and passes ONLY `descriptor.env` as the host's environment (§3.2/§5.4 allowlisted environment; no ambient inheritance).
- Ordering test rewritten to observe the REAL pipeline: supervisor spawns host; host script records `lifeline_checked` after its first stdin readiness observation and before child spawn; test asserts `lifeline_established` < `hash` < `exec` from real stream events.

## 2026-08-28 — M19 Task 42, Founder approval at exact head (advisory accepted)

**Founder disposition:** Task 42 APPROVED at exact head `6dc79e6d9d872e4f52fa28b81794b924c09fcbd2`, subject to the recorded Tier-2 verdict (`PASS-WITH-ADVISORIES`, artifact `tier2-m19-t42-remediation-6dc79e6.txt`, SHA-256 `9cc67b95d2c2d6d1cbe76f93a82eb96f03e02a341ac7ad60457426035edcf901`) and the advisory disposition below.

**Advisory disposition (Founder-ruled):** the round-2 advisory (redundant `stdinSink.flush()` after `stdinSink.end()` in `closeStdin`, `packages/broker/src/pty-host-supervisor.ts`) is ACCEPTED for Task 42. Recorded as theoretical redundancy under `FileSink` semantics; no failure was observed. No new head was created; the reviewed commit is unmodified. The advisory is not re-proposed for Task 42.

**Explicit non-authorizations (Founder, verbatim scope):** this approval does not authorize Task 43, Task 44, PR merge, or any Phase 4 work.

**Task 42 gate state:** implementation approved; PR #35 remains draft and unmerged; per-task Step 8 checkpoint for Task 43 awaits separate Founder authorization.

## 2026-08-28 — M19 Tasks 42+43 combined Tier-2 review and Founder advisory disposition

**Review verdict:** PASS-WITH-ADVISORIES at head `f157d1369b612bff0ae9721a54d7f817cbd64c1b` (gemini-3.1-pro-high, combined Task 42+43 review; artifact `tier2-m19-t42-t43-f157d136.txt`, SHA-256 `5bf91b7b2541aafb0349fc7641c86174a19508b68452f1ea7de553711d526052`). No blocking or major findings; no required Founder decision points.

**Founder disposition (2026-08-28):**
1. Advisory 1 (main.ts injected-seam SIGKILL ESRCH race) — FIX in one narrowly scoped follow-up commit, preserving fail-closed semantics and existing tests. Implemented: ESRCH swallowed (group already gone = desired terminal state), all other errno codes propagate.
2. Advisory 2 (unused `emit` parameter in `onLifelineEof` signature) — ACCEPTED without change. The parameter is retained for interface symmetry with `terminateChildGroup`; recorded here as the disposition of record.

**Correction round 2 (same date):** the first remediation commit `df19365` inverted the filter (positive-match throw swallowed code-less errors). Fresh Tier-2 review returned FAIL with one Major (artifact `tier2-m19-advisory-df19365-FAIL.txt`, SHA-256 `bf400cef666bc965baf408ff79031382d05da758c09b948d5fd13d0aef529074`). Founder correction authorization 2026-08-28: explicit allow-list implemented (swallow ONLY code === "ESRCH"; re-throw EPERM, code-less Errors, null, primitives, other codes). New regression test added: a code-less generic SIGKILL failure must propagate (runSteadyState rejects with the exact error) and containment stays fail-closed (no drained/exited facts). Prior FAIL verdict carried no weight; the new head requires fresh Tier-2 review.

## 2026-08-29 — M19 Tasks 42+43 CodeRabbit round: 13-comment triage and remediation

**CodeRabbit verdict on the Task 42+43 surface:** CHANGES_REQUESTED — 13 actionable comments (1 Critical, 4 Major, 8 Minor) + 6 nitpicks, at PR #35 head `ed85c184` (later docs-only commit `0bf77142` — verified docs-only child, source surface byte-identical — rebind approved by Founder).

**Founder dispositions (2026-08-29):**
- CR-1 (launch.ts TOCTOU between hashFile and Bun.spawn, Critical): ACCEPTED as the documented §2.2 residual — "a binary that truthfully attests one identity during the probe and lies during the governed session remains a documented residual; the system does not claim to solve malicious-provider misrepresentation." No code change; the plan's adjacent-to-exec re-hash is the ratified mitigation. Descriptor-bound execution would need a PLAN-OPEN amendment.
- CR-7 (env-allowlist test asserts a tautology, Minor): DEFERRED to Task 44 with explicit scope record — direct host-environment observation stays with the Task 44 fixture harness per the earlier Founder scoping; the tautological assertion and its scope note remain as-is in this round.
- OPEN-1 (drain correctness vs §9.8 grace SIGKILL, deterministic Verify (macOS) CI failure): FIX the fixture while preserving all 50-line and drained/exited assertions. Root cause verified empirically: one `sleep 0.01` process spawn per tail line takes ~60 ms on CI, so the 50-line tail raced the 2 s SIGKILL and lines 31-49 died in the PTY buffer. Fixture now spaces lines with in-shell sleeps (no process spawn per line), completing well inside the grace; every line, the final marker, and all drain-predicate assertions are unchanged.

**Remediated in this round (Founding-authorized bounded scope):**
- CR-2: supervisor send/closeStdin EPIPE guard (host-death terminal state; non-EPIPE propagates).
- CR-3: single stdout pump at spawn time; facts() returns subscriber views of one shared queue; reportedPgid recorded pump-side (killPgid no longer stream-consumption-dependent; repeated facts() calls safe).
- CR-3a: EOF-path child-exit wait bounded by the §9.8 outer bound; expiry fails closed (diagnostic, non-zero, no success facts).
- CR-3b: EOF-path ptySettled flag fixed — the prior Promise.race against Promise.resolve() always settled immediately, dead-coding the await_pty join; now a settlement flag on the live ptyClosed promise selects the ptyPath.
- CR-5: supervisor lifeline test updated to the Task 43 EOF contract (stream ends after child termination; no termination_started on EOF).
- CR-6: test cleanup uses the supervisor's killPgid containment primitive (no orphaned child groups).
- CR-8: grace_waited measured from the SIGTERM (grace actually consumed), not function entry.
- CR-9: realKillCalls counter replaced by a kill recorder asserting every real kill targets a NEGATIVE pid; vacuous >= 0 bound removed.
- CR-10: SIGKILL rung asserted directly (signal === "SIGKILL", code null) instead of the permissive disjunction.
- CR-11: grandchild test waits for the GC_READY marker before terminate (no vacuous pass on a missing grandchild).
- CR-4 (test strictness informational note): no code change required, per Founder.

## 2026-08-29 — M19 Task 42+43 Tier-2 FAIL round: three blocking findings corrected

**Review verdict:** FAIL at `4d2d14b` (artifact `tier2-m19-remediation-4d2d14b-FAIL.txt`, SHA-256 `703dc1c14ec11bea8297f2039a185146ebfcdadac78aedf22d7e16516239ce54`) — three Blocking findings in the CodeRabbit-remediation batch's new code. Founder correction authorization 2026-08-29 (correcting commit on top, allowed files: supervisor/src+test, pty-host main/src+test, correction log).

**Findings → fixes:**
1. BLOCKING (supervisor pump): late facts() subscribers hung in the 5-minute safety net — queue.closed never set post-settlement — AND no history replay, so late subscribers missed `launched` (killPgid blind). Fix: a bounded global history (cap 256) records every fact at the pump; facts() takes a subscribe-time atomic snapshot (settled + error + history) — post-settlement subscribers replay history and terminate immediately; pre-settlement subscribers attach to the live queue. `launched` remains available to killPgid regardless of consumption.
2. BLOCKING (main.ts EOF race): the deadline race's losing IIFE threw into a settled promise 5 s after clean containment — an unhandled rejection that could crash the host. Fix: a settlement-aware deadline — shared settled flag, clearTimeout on any settle path, the timer's throw is a no-op after settlement, and child.exited rejection paths are race-guarded identically.
3. New regression tests prove each finding: (a) late subscriber replays history and receives `launched`; (b) post-settlement subscriber terminates immediately (no 5-min hang); (c) killPgid works with facts() never consumed (launched history feeds it); (d) the EOF deadline timer fires no unhandled rejection after clean containment (verified across the full 5 s window).

**Verification at the corrected head:** new regression tests pass; signals 5/5; packages/pty-host+broker 132 pass / 0 fail (two consecutive runs); tsc exit 0. Prior FAIL carried no weight.

## 2026-08-29 — M19 Task 42+43 Tier-2 FAIL round 6: subscription race corrected

**Review verdict:** FAIL at `9bcf015` (artifact `tier2-m19-correction-9bcf015-FAIL.txt`, SHA-256 `c7e4b3de3dd0d241aff6384e101f4baeae66026223c5770453313cdb0cd2b80c`) — 1 Blocking + 2 Major in the pump subscription strategy. The EOF-timer fix (round-4 finding 3) was VERIFIED remediated; four regression tests confirmed genuine.

**Founder correction authorization 2026-08-29:** synchronous subscription attach + no-loss replay + settlement broadcast + launched pin; three new regression tests required.

**Findings → fixes (all in supervisor.ts):**
1. BLOCKING race-to-hang + 2. MAJOR async-gap data loss: the subscribe-to-subscribers attachment now happens SYNCHRONOUSLY at generator start, BEFORE yielding the backlog — facts the pump enqueues during backlog replay are queued into the live subscriber (no loss), and pump settlement reaches the queue via the normal finally broadcast (no hang). Backlog replay skips facts already fanned into the live queue (dedupe via attach-time snapshot of queue.items).
3. MAJOR launched eviction: the first launched fact is PINNED against history-cap trimming — when the cap triggers, the trim start never passes the pinned launched index, so late replay always includes it (bounded memory preserved; cap still 256 with half-trim).

**New regression tests (3):** settlement during backlog replay reaches the subscriber without hanging (real pipe, closeStdin raced against replay); facts enqueued during replay are not lost (10 resize acks asserted while replay yields); launched survives history pressure and is replayed to late subscribers with the real pgid (noisy child forcing the cap).

**Also corrected during this round (test fixture only):** the settlement-during-replay test originally used /bin/cat — its EOF path ends via the PTY-unsettled 3 s fail-closed join (verified: 'PTY did not close within 3000ms'), a separate concern from the subscription race; fixture switched to /bin/sh + foreground sleep whose PTY settles promptly, isolating the subscription-race assertion. The /bin/cat 3 s join remains an observable behavior for the wedged/EOF surfaces Task 44 covers.

**Verification at the corrected head:** 3 new regressions pass; supervisor suite 9/9; pty-host+broker full suites green (132+ tests); tsc exit 0. Prior FAIL carried no weight; new head requires fresh Tier-2 review.

## 2026-08-29 — M19 Task 42+43 Tier-2 review round 7: EOF-path PTY settlement race corrected

**Review status at `2345e70`:** Tier-2 review not yet dispatched for the round-6 head. Independent re-verification at `2345e70` uncovered a pre-existing production EOF-path defect in the cross-test/full-suite runs the round-6 commit message claimed as "135 pass / 0 fail". The Builder's verification report was inaccurate: eof-timer.test.ts and signals.test.ts "lifeline EOF terminates the child process group without a terminate command" intermittently fail under full-suite runs. The handoff (HANDOFF-m19-t42-43-state-20260829.md) flagged this as the ONE OPEN ISSUE for diagnosis before Task 43 is declared verified.

**Empirical failure baseline (independent re-verification at `2345e70`, eof-timer.test.ts alone, fixture `/bin/sh -c "echo EOF_TIMER_READY; sleep 300"`):**
- 10 isolated runs of `bun test packages/pty-host/test/eof-timer.test.ts`: 9 pass (5667 ms) / 1 fail (15635 ms) — ~10% failure rate.
- Diagnostic trace of the failure (host stderr): `pty-host: pty closure failure: PTY did not close within 3000ms`; final fact kinds = `launched,ready` only (no `drained`/`exited`); host.exitCode = 1.
- 3 consecutive runs of `bun test packages/pty-host packages/broker` (the handoff's "full suite"): 135 pass / 0 fail in 3 runs but with intermittent noise (one in-suite drain-correctness flake is pre-existing and unaffected by this fix; eof-timer itself flipped on the order of `bun test eof-timer.test.ts signals.test.ts` vs `bun test signals.test.ts eof-timer.test.ts` — eof-timer first ⇒ both fail; signals first ⇒ both pass, deterministically reproducible).

**Root cause (microtask-ordering race):** The EOF-path close call (`packages/pty-host/src/main.ts:682` pre-fix) passed `signal: false`, relying on natural PTY settlement via `session.ptyClosed`. The host's `ptySettledNow` flag (lines 673-682) is updated by `session.ptyClosed.then(...)` — a microtask. The flag check uses `await new Promise((res) => setTimeout(res, 0))` (one macrotask) to give the `ptyClosed.then` callback a chance to fire before the close() call. The failure mode: `ptyClosed` settles strictly AFTER `child.exited` because `Bun.Terminal`'s `exit` callback is observed strictly after every `data` callback the PTY will ever deliver (`packages/pty-host/src/terminal.ts:38-44`). When the race goes the other way, the host takes the `ptyPath === "await_pty"` branch (lines 419-462) where `signal: false` means lines 436-442 do NOT execute the explicit `session.terminal.close()`. The host waits 3 s for `ptyClosed` to settle naturally, hits `PtyClosureTimeoutError`, fails closed with stderr `pty-host: pty closure failure: PTY did not close within 3000ms`, and returns WITHOUT emitting `drained`/`exited`. That is the production EOF-path defect the handoff suspected.

**Fix (one-line semantic change, `packages/pty-host/src/main.ts:682`):**
- Before: `await close({ announce: false, signal: false, ptyPath: ptySettledNow ? "pty_already_settled_success" : "await_pty" })`
- After: `await close({ announce: false, signal: true, ptyPath: ptySettledNow ? "pty_already_settled_success" : "await_pty" })`

**Why this is correct and minimal:**
1. The child was already signaled by `onLifelineEof(session.pgid, emit)` at line 606, so re-entering `terminateChildGroup` is safe — the seam's `kill(-pgid, "SIGTERM")` against the dead group throws `ESRCH`, which the explicit allow-list (the df19365/ed85c18 corrected seam at lines 367-378) swallows. Everything else still propagates (fail-closed semantics preserved; no blanket catches introduced).
2. `emitStarted: opts.announce` (line 350) is `false` here, so no `termination_started` is emitted. Containment stays silent on EOF — the rule that `termination_started` publishes ONLY on the explicit terminate-command path is preserved.
3. No `ack` is emitted because `opts.announce === false`. The rule that no termination acknowledgment fires on containment paths is preserved.
4. The critical effect: `opts.signal === true` enters the `if (opts.signal)` branch at lines 436-442 and explicitly calls `session.terminal.close()`, which deterministically forces master-side PTY settlement, resolving `ptyClosed` immediately. The 3 s `awaitPtyClosure` race becomes a no-op because the PTY has already settled (or settles within one macrotask after `terminal.close()`).
5. Scope: only the EOF path is touched. The natural-child-exit path (line 574 `close({ signal: false })`) is unchanged — it correctly relies on natural settlement for unforced exits, preserving the data-integrity guarantee that the host never discards last output through a force-close.
6. §9.8 deadlines (250/500/2000/5000) unchanged; monotonic clock only; negative-PGID signaling preserved across all containment rungs.
7. **No test assertions weakened, skipped, filtered, or edited.** Existing eof-timer test (and all 44 pty-host tests, 8 broker tests, 3 supervisor tests) pass unchanged.

**Empirical baseline at the corrected head:**
- `bun test packages/pty-host/test/eof-timer.test.ts` alone, 10 consecutive runs: 10 pass (5645-5668 ms each, deterministic; no flakes observed).
- `bun test packages/pty-host/test/eof-timer.test.ts packages/pty-host/test/signals.test.ts`, 3 consecutive runs: 6 pass / 0 fail every run (eof-timer first, signals second — the previously-failing order).
- `bun test packages/pty-host`, 3 consecutive runs: 44 pass / 0 fail every run.
- `bun test packages/pty-host packages/broker`, 3 consecutive runs: **135 pass / 0 fail every run** (the handoff's full-suite invariant is now satisfied across 3 consecutive runs).
- Diagnostic trace at the corrected head: `[pty-host-diag: EOF-path close ptySettledNow=true]` consistently; final fact kinds = `launched,ready,output,drained,exited`; host.exitCode = 0.

**Authorization:** Founder correction authorization 2026-08-29 (verbal, in-chat) authorized a single round-7 commit on top of exact parent `2345e703c6bc9968b8fb2f54018956ee91c8fcf6`, allowed files: `packages/pty-host/src/main.ts` and `docs/verification/phase-3a-correction-rounds.md`. Production correction: change EOF-path close `signal: false` to `signal: true`; preserve `announce: false`; preserve silent EOF containment; preserve the explicit ESRCH allow-list; do not alter §9.8 deadlines or natural-child-exit behavior. Correction record must document the 10% failure baseline, the microtask-ordering race, the `ptySettledNow`/`await_pty` interaction, the one-line fix, and the three consecutive 135/135 full-suite runs.

**Required next steps:** fresh Tier-2 review at the new head (round-7 commit) BEFORE any push. Round-6's Tier-2 review has NOT been dispatched; the round-7 head will require fresh review covering the EOF-path change with the same brief convention (exact head/tree/parent + M19 section SHA `411500a3fad1b8107c52f7c8591381d7d825ee9379194c7edc14484d7d39f61b` + full diff; prior verdicts never carry). Push, PR #35 thread resolution, CodeRabbit re-review, and merge authorization at exact SHA all require separate explicit Founder authorization. Task 44 remains unauthorized.

## 2026-08-29 — M19 Task 43 round 8: CodeRabbit findings remediation + T12 bounded fail-closed proof

**Scope (Founder authorization 2026-08-29, in-chat):** fold all round-8 CodeRabbit/Tier-2 observations into one revision on top of parent `97c98f2983a33cff925d5750b7142a5675b4cf31`. Allowed files: `packages/broker/src/pty-host-supervisor.ts`, `packages/broker/test/pty-host-supervisor.test.ts`, `packages/pty-host/src/main.ts`, `packages/pty-host/test/eof-timer.test.ts`, `packages/pty-host/test/main-guard.test.ts`, `docs/verification/2026-08-28-wf17-ground-truth-security-controls.md`, this correction log. Commit/push/PR edits/Task 44 explicitly out of scope until post-Tier-2.

**Findings → fixes:**
1. **CR-7 (supervisor history growth without bound):** the `launched` pin lived INSIDE `history`; a trim that would evict it reset `start` to the pinned index, so `history.slice(0)` kept everything — unbounded growth on every session. Fix: the pinned fact moves to a separate `pinnedLaunchedFact` variable that is never trimmed; `history` now trims unconditionally at the cap; late-subscriber backlog construction prepends the pinned fact when it is no longer inside the tail. New regression `history is bounded by the cap regardless of how many facts the pump emits` drives 1024 resize-ack facts and asserts the late replay is the bounded tail (≤400 observed), with `launched` still present.
2. **T12 (EOF fail-closed timeout could still await an unbounded reaper):** `makeSessionCloser` gained an `awaitChildExit?: boolean` option (default `true` — all existing paths unchanged); the EOF §9.8 timeout call site passes `awaitChildExit: false`, so the fail-closed join completes from already-known child lifecycle fields + PTY settlement + frameReader close without re-awaiting `session.child.exited`.
3. **T12 semantic verification (Founder directive 2026-08-29: bounded FAIL-CLOSED containment, not bounded completion):** proven with a real-process fixture in `eof-timer.test.ts`. A real `spawnGoverned` child (`sh` ignoring SIGTERM) in a real detached process group runs the real §3.4 ladder (SIGTERM → 2 s grace → real SIGKILL at ~2 s); ONLY the reaper observation is stalled (a Proxy over the real child whose `exited` never settles) — empirically the deepest reachable harness, since SIGKILL is untrappable and the detached direct child is always in the signaled group, so no real child can survive the ladder past the 5 s bound. Asserted: (1) `runSteadyState` returns with elapsed ≥ 4.5 s and < 7 s (the real deadline elapsed — no short-circuit); (2) no `drained`/`exited` lifecycle frames on the fact channel (decoded through the real wire codec; `output` frames may legitimately arrive); (3) stderr carries `lifeline-EOF containment incomplete` / `failing closed` and `process.exitCode === 1`; (4) the REAL governed group is gone — signal-0 `kill(-pgid, 0)` probe reaches ESRCH within 2 s (no `ps -p`, no patched cleanup kills). A control test observes the pre-T12 failure mode directly: with default `awaitChildExit: true` the closer stays pending on a stalled reaper past 400 ms and never reaches its join phase; with `false` the same seam completes immediately.
4. **CR-10/CR-13/T10 (test cleanup hardening, broker suite):** all eight `process.kill(handle.hostPid, "SIGKILL")` cleanup sites in `pty-host-supervisor.test.ts` are guarded — a host that already exited naturally throws ESRCH from a bare kill and would replace the real test result. `eof-timer.test.ts` cleanup hardened: host declared outside `try`, bounded `finally` (close stdin, 2 s settlement wait, SIGKILL host, negative-pgid SIGKILL group). `main-guard.test.ts` drain-correctness fixture timings reduced (per-line sleep 0.015→0.003, foreground sleep 1→0.3): ~330 ms per run against a multi-second grace budget (10/10 previously flaking at 2–2.5 s → 10/10 green).
5. **T11 (test-honesty in `a facts() subscriber created after pump settlement terminates immediately`):** the blanket `catch { lateErrored = err }` is replaced by discrimination — only recognizable pump stream errors (`kill`/`stream`/`EPIPE`/`terminated`/`End of file`) are recorded for the final assertion; the self-thrown hang detectors and any other real failure re-throw so the test fails with its true cause. (Empirically the SIGKILLed pump normally ends cleanly via `done`; the error path is genuine but narrow.)
6. **T5/T6/T7 (WF-17 ground-truth doc):** title date disambiguated (recorded 2026-08-28; Founder check run 2026-08-29T02:15:58Z); command blocks labelled ```sh; the captured-output block (which embeds inner triple fences) is wrapped in 4-backtick outer fences so the embedded record renders intact.

**Verification:** supervisor suite 10/10 (incl. new bounded-tail regression); eof-timer 3/3 (incl. the two new T12 tests); pty-host full suite green ×3; broker full suites green ×3; `main-guard -t "drain correctness"` 10/10 ≈330 ms; project `tsc` exit 0.

**Next steps:** fresh Tier-2 review at the round-8 head BEFORE any push (prior verdicts never carry). Push, PR #35 thread resolution, CodeRabbit re-review, merge authorization at exact SHA, and Task 44 all require separate explicit Founder authorization.

## 2026-08-29 — M19 Task 43 round 9: post-settlement replay defect (Greptile T6) fixed

**Review status at `96f2a1aba574d27d3f3f3e636ffc2afb251057b6`:** round-8 Tier-2 PASS (artifact `tier2-m19-t42-t43-96f2a1a-PASS.txt`, SHA-256 `e541240f5129a2919f532ce454c56d920eb09b643fae67d8aab7dc31b68dc273`), pushed to `build/m19-tasks42-44-r1`, PR #35 readied; fresh CodeRabbit review on the head returned COMMENTED with two Trivial nitpicks (N1 vacuous-pass risk in the bounded-history test; N2 dead `settle` helper). Read-only adjudication of the seven unresolved threads then confirmed a genuine defect raised by Greptile P1 at this head: **T6 — closed queue skips fact replay**.

**Defect (VERIFIED by direct probe before fixing):** in `facts()`, a subscriber created after pump settlement attaches its queue with `closed: true`, and the backlog loop's per-frame `if (queue.closed) break` aborted replay immediately — the late subscriber received an EMPTY stream (observed: 0 frames while history held `launched` + `ready`). This contradicts the round-4/round-6 replay contract stated in the code itself. The existing post-settlement test accepted either outcome (immediate done OR replay) and could not fail on it.

**Fix (Founder round-9 authorization 2026-08-29, T6 only + optional N1/N2):** the per-frame `closed` break is removed — the backlog is a static snapshot captured at synchronous attach, so replaying it cannot race the live stream; `closed` gates only the live-wait phase, preserving every other path byte-for-byte. Post-settlement subscribers now replay the complete captured backlog and then terminate immediately (round-4 finding-1 contract preserved). New regression test `a post-settlement subscriber replays the pinned launched fact before terminating (T6 regression)` asserts first value `launched`, fast termination, no duplicate replay; **genuineness verified by mutation check: with the src fix stashed the test FAILS; restored it passes.** Folded: **N1** — bounded-history test lower bound `count > 0` → `count > 100` (empirically replay lands at ~253, 5/5 stable probes; prevents vacuous pass if the cap is never exercised); **N2** — removed the never-called `settle` helper in the EOF deadline race (all three sites already inline the identical body; behavior unchanged).

**Verification at the round-9 head:** supervisor suite 11/11 (incl. the new T6 regression); combined `bun test packages/pty-host packages/broker` 139 pass / 0 fail × 3 consecutive runs (138 + the new regression); `bun run typecheck` exit 0. Scope: three code files — `packages/broker/src/pty-host-supervisor.ts` (+8/−1), `packages/broker/test/pty-host-supervisor.test.ts` (T6 regression + N1), `packages/pty-host/src/main.ts` (N2, dead-code removal only) — plus this log (four files total). No thread replies/resolutions, no push, no merge, no Task 44 work.

**Next steps:** fresh Tier-2 review at the round-9 head BEFORE any push (prior verdicts never carry). Threads T1/T2/T3/T4/T5/T7 dispositions and replies remain pending Founder direction; push, CodeRabbit re-review, thread resolution, merge authorization at exact SHA each require separate explicit Founder authorization.

## 2026-08-29 — M19 Task 43 round 10: abandoned-subscriber queue retention fixed (T7-CR)

**Review status at `1bd9679344dee239e26bb001187d31554a8182ba`:** round-9 Tier-2 PASS (artifact `tier2-m19-t42-t43-1bd9679-PASS.txt`, SHA-256 `6e5c66d9e7dd230f9649f8cd3fdfb673af150628b5a1609afb5df608373be98b`), pushed; fresh CodeRabbit review on the head (id 5059051610, CHANGES_REQUESTED) posted two actionable comments: a Major (T7-CR) and a doc nit (T6-CR). Read-only adjudication verified T7-CR as a genuine defect: `facts()` never removed its queue from `subscribers`, so a consumer that stopped iterating after `launched` left an unbounded `queue.items` accumulating every later fact — broker memory growth for a long-running host. Founder round-10 authorization 2026-08-29: fix T7-CR, fold the T6-CR wording fix, do not touch launch TOCTOU / Task 44 env scope / unrelated code; stderr pipe recorded as a separate follow-up risk (no drain change in this round).

**Fix:** the `facts()` generator body is wrapped in `try`/`finally`; the finally removes the queue from `subscribers`, marks it closed, settles and clears its waiters (no dangling 5-minute-net waiter). `enqueue()` defensively skips closed queues. A read-only `subscriberCount()` accessor was added to `PtyHostHandle` (test-observability seam; no consumer behavior change). New regression `an abandoned facts() iterator removes its subscriber queue (T7-CR regression)` asserts: 0 → attach on first next() → 1 → `iterator.return()` → 0, and stays 0 after further host output; **genuineness verified by mutation check: with the src fix stashed the test FAILS (queue retained); restored it passes.** T6-CR: round-9 log wording corrected to "three code files … plus this log (four files total)".

**Verification at the round-10 head:** supervisor suite 12/12 (incl. the new T7 regression); combined `bun test packages/pty-host packages/broker` 140 pass / 0 fail × 3 consecutive runs (139 + the new regression); `bun run typecheck` exit 0. Scope: three code files — `packages/broker/src/pty-host-supervisor.ts` (try/finally + closed-skip + subscriberCount), `packages/broker/test/pty-host-supervisor.test.ts` (T7 regression), `docs/verification/phase-3a-correction-rounds.md` (T6-CR wording + this record). No thread replies/resolutions, no push, no merge, no Task 44 work.

**Next steps:** fresh Tier-2 review at the round-10 head BEFORE any push (prior verdicts never carry). Threads T1/T2/T3/T4/T5 dispositions and replies remain pending Founder direction; stderr-pipe backpressure recorded as a separate follow-up risk; push, CodeRabbit re-review, thread resolution, merge authorization at exact SHA each require separate explicit Founder authorization.
