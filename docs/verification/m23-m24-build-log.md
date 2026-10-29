# M23 and M24 build log

## Task 51 — supervisor-death scenarios

Built on: `189c2c12fb0147909f0b8fdc550affca92e70156`.

Authority: DEC-20261028-02 B2, B3, B7, B8 and B10; plan Task 51; DEC-20261023-01 Part B. This section precedes its commit. Its commit identity is recorded by the next task and the final report, avoiding a self-referential commit hash.

Changed files:

- `test/phase3a/adversarial/supervisor-death.test.ts`: six named scenarios, real PID polling, durable-prefix checks and production next-start completion.
- `test/phase3a/runtime-harness.ts`: child supervisor, retained disposable storage, observed exit receipt and bounded shutdown.
- `test/phase3a/adversarial/supervisor-entry.ts`: conditional B3 entry script, needed to run the harness in a killable supervisor process.
- `docs/verification/m23-m24-build-log.md`: this record.

### Preconditions and D1

`git fetch origin main` exited 0. HEAD and origin/main both equal the binding base; their changed-path list was empty. The initial tree was clean. The new build log and adversarial directory were absent. All eight pinned authority hashes matched, including a second comparison using `shasum -a 256`. The six acts carry ISSUED status and the Michael Daley signature.

Host: Darwin 27.0.0 arm64. User from `id -un`: michaeldaley. Runtime checks before D1, before its bare suite, and before Task 51 all matched Bun 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, binary SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5; bunx is a symbolic link to that Bun. Settings were not changed.

Founder answer to precondition 5, verbatim:

> Host quieted as far as I can. Visible apps: Finder, Claude, cmux. Hermes processes: 0. Load averages: 1.62 2.49 2.50. Continue.

Founder correction, verbatim:

> Correction to my answer to precondition 5: besides the visible apps, cmux was also running two other agent sessions, a Codex session (fos-412-review) and a Qwen Code session; I have now stopped both. Host quieted. Load averages: 1.99 2.45 2.48. Continue.

`bun.lock` remained SHA-256 34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0. Install changed only the allowed mode of packages/founder-act/src/main.ts from 100644 to 100755; `chmod 644 packages/founder-act/src/main.ts` restored it.

### Commands, outcomes and full-output logs

All Bun commands used the required per-command runtime prefix. Log paths below are relative to `/Users/michaeldaley/builds/m23-m24-r1-pr/logs/`. No log was overwritten.

| Step | Command | Exit | Full-output log | SHA-256 |
| --- | --- | ---: | --- | --- |
| D1 | `bun install --frozen-lockfile` | 0 | `d1-install-run1.log` | `5e7a72e5106fcd1e79127a912a7a0502b53c1c44abe3f68cc3415d86837f09d4` |
| D1 | `bunx tsc --noEmit` | 0 | `d1-typecheck-run1.log` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| D1 | `bun test test/phase3a` | 0 | `d1-phase3a-run1.log` | `3a77980ffd41b2c8350db98d9a0c263540970aa9628add02b9bbf7356f790ba8` |
| D1 | `bun test apps/madbridge` | 0 | `d1-madbridge-run1.log` | `327604307dc6bda65a663f81f75122b3f38c76920b3dcd8666dd7ed7e1f497bf` |
| D1 | `bun test test/acceptance` | 0 | `d1-acceptance-run1.log` | `17db507c685ab62d32928b510c6db0a71e092f4a468a8eed9a764569a742b752` |
| D1 | `bun test` | 0 | `d1-full-run1.log` | `0ac99683c3ca98f53a1dcd083d459be51315e45b6f5d21eb5bcfb741849aff80` |
| 51.2 | `bun test test/phase3a/adversarial/supervisor-death.test.ts -t "supervisor SIGKILL terminates every governed child and leaves no typed terminal prefix"` | 1 | `task51-step2-run1.log` | `a5d254c10ef30df59678dc3250e4bf27e5801303d2af5445c297c5a813302fdf` |
| 51.4 | `bun test test/phase3a/adversarial/supervisor-death.test.ts` | 1 | `task51-step4-run1.log` | `ea217d6262150057400b89e8cd078d21295dc950c7664a845de4f56736d7c916` |
| 51 self-fix | `bunx tsc --noEmit` | 0 | `task51-self-fix-typecheck-run1.log` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| 51.4 | `bun test test/phase3a/adversarial/supervisor-death.test.ts` | 0 | `task51-step4-run2.log` | `d18b9320d184634b90f6ff1623203152fbc19b55a3ce5797ab7c172bb7f0c5bb` |
| 51 review fix | `bunx tsc --noEmit` | 0 | `task51-review-fix-typecheck-run1.log` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| 51 review fix | `bunx tsc --noEmit` | 0 | `task51-review-fix-typecheck-run2.log` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| 51.4 | `bun test test/phase3a/adversarial/supervisor-death.test.ts` | 0 | `task51-step4-run3.log` | `48c18ff79251de2a4505f9f056c5262efe8f99697c6b2e7d190c3cef48ac6b98` |
| 51 break | `bun test test/phase3a/adversarial/supervisor-death.test.ts` | 1 | `task51-break-run1.log` | `c8efd704292d72a93fc0023c3694f5abd3c3d4eda13812072812ca115e79053f` |
| 51.5 | `bunx tsc --noEmit` | 0 | `task51-step5-typecheck-run1.log` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| 51.5 | `bun test test/phase3a` | 0 | `task51-step5-phase3a-run1.log` | `dd420f78ffc17d095b464a20c426fcb431b52a23152d12645d4eb76e1b0dc550` |

Run summaries and uptime readings, copied from their logs:

`d1-install-run1.log`:

```text
51 packages installed [141.00ms]
```

`d1-typecheck-run1.log`:

```text
No output; exit 0.
```

`d1-phase3a-run1.log`:

```text
23:05  up 3 days, 14:14, 5 users, load averages: 3.14 2.98 2.64
 91 pass
 0 fail
 1823 expect() calls
Ran 91 tests across 8 files. [28.97s]
```

`d1-madbridge-run1.log`:

```text
23:06  up 3 days, 14:15, 5 users, load averages: 2.70 2.89 2.62
 518 pass
 0 fail
 2299 expect() calls
Ran 518 tests across 15 files. [8.17s]
```

`d1-acceptance-run1.log`:

```text
23:06  up 3 days, 14:15, 5 users, load averages: 2.37 2.81 2.59
 87 pass
 0 fail
 214 expect() calls
Ran 87 tests across 4 files. [402.00ms]
```

`d1-full-run1.log`:

```text
23:09  up 3 days, 14:18, 5 users, load averages: 2.00 2.47 2.49
 1825 pass
 0 fail
 17484 expect() calls
Ran 1825 tests across 126 files. [147.22s]
```

`task51-step2-run1.log`:

```text
23:15  up 3 days, 14:24, 4 users, load averages: 1.39 2.21 2.39
 0 pass
 5 filtered out
 1 fail
 1 expect() calls
Ran 1 test across 1 file. [20.00ms]
```

`task51-step4-run1.log`:

```text
23:15  up 3 days, 14:24, 4 users, load averages: 1.85 2.24 2.39
 1 pass
 5 fail
 127 expect() calls
Ran 6 tests across 1 file. [2.33s]
```

`task51-self-fix-typecheck-run1.log`:

```text
No output; exit 0.
```

`task51-step4-run2.log`:

```text
23:16  up 3 days, 14:25, 4 users, load averages: 1.88 2.20 2.37
 6 pass
 0 fail
 208 expect() calls
Ran 6 tests across 1 file. [3.13s]
```

`task51-review-fix-typecheck-run1.log`:

```text
No output; exit 0.
```

`task51-review-fix-typecheck-run2.log`:

```text
No output; exit 0.
```

`task51-step4-run3.log`:

```text
23:19  up 3 days, 14:28, 4 users, load averages: 1.53 1.84 2.18
 6 pass
 0 fail
 226 expect() calls
Ran 6 tests across 1 file. [3.06s]
```

`task51-break-run1.log`:

```text
23:19  up 3 days, 14:28, 4 users, load averages: 1.24 1.74 2.14
 3 pass
 3 fail
 182 expect() calls
Ran 6 tests across 1 file. [3.18s]
```

`task51-step5-typecheck-run1.log`:

```text
No output; exit 0.
```

`task51-step5-phase3a-run1.log`:

```text
23:20  up 3 days, 14:29, 4 users, load averages: 1.72 1.78 2.13
 97 pass
 0 fail
 2049 expect() calls
Ran 97 tests across 9 files. [31.31s]
```

### Tests and required RED

File count: six named tests in supervisor-death.test.ts. Step 4 run 3: 6 pass, 0 fail. Restored Step 5 suite includes all six, with 97 pass, 0 fail overall.

The six names are the six names in plan Task 51 Step 1. They pin spec section 6.4 scenarios 1 through 4, next-start unclean closure, and cumulative no-survivor verification. Every recorded host, child and process group is checked.

RED ran exactly one test, with five filtered out. Required failure, verbatim:

```text
error: the harness has no spawned supervisor entry point for a killable session

Expected: "function"
Received: "undefined"
```

### Deliberate break and restoration

The break replaced the requested SIGKILL delivery with SIGTERM, while keeping the requested scenario unchanged. The full harness diff was printed before the unfiltered six-test run in task51-break-run1.log. It failed three named tests: the SIGKILL scenario, next-start reconciliation after SIGKILL, and cumulative no-survivor verification. The first three scenarios passed.

Failing assertion, verbatim:

```text
42 |     else expect(outcome.exitCode).not.toBe(0);
error: expect(received).not.toBe(expected)

Expected: not 0
```

Restored SHA-256 values, checked immediately after restoring the break:

- runtime-harness.ts: 71dc49968ac151f4c279eba4e2390ccd6c908302a3b44f9ae5744d38477578ee
- supervisor-entry.ts: 06887b38c43cfac39ac5799043a8ebb9895f75eeee18e1a032c8623857ac94ca
- supervisor-death.test.ts: c367c626e1e69cb5b7e38a15d1ce73c6518a1b54cacb58a3c8c8dcb6e7a71fa1

Those matched the pre-break values. A subsequent type-only correction admitted the observed null exitCode for SIGKILL; Step 5 was run on that final version. No deliberate break is committed.

Observed Task 51 timings in the restored Step 5 suite, copied verbatim:

```text
supervisor clean: exit=0 signal=null final_death_ms=30.30
supervisor SIGTERM: exit=0 signal=null final_death_ms=29.62
supervisor crash: exit=1 signal=null final_death_ms=15.61
supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=13.58
supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=13.61
supervisor clean: exit=0 signal=null final_death_ms=30.70
supervisor SIGTERM: exit=0 signal=null final_death_ms=30.55
supervisor crash: exit=1 signal=null final_death_ms=15.86
supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=25.74
```

### Deviations and self-fixes

1. Initial authority comparison used Python hashing; all eight were then reverified using the required macOS shasum command.
2. D1 bare suite launched after a preceding load reading of 1.57, but the reading captured immediately at launch was 2.00. The command should have waited. The run was preserved without rerunning unchanged. Later gated commands enforce the boundary before launch.
3. Higher-priority host instructions required code-review and TypeScript-review subagents despite the prompt prohibition. They reviewed in-clone source only and were interrupted after completion. Their advice is not claimed as the act's independent Tier-2 verdict. The TypeScript agent reported a canonical typecheck without a supplied durable log; it is not used as gate evidence. All claimed gates below are the builder's logged runs.
4. The conditional supervisor-entry.ts path was required for the child supervisor. retainStorage preserves only disposable fixture storage for post-exit inspection; default session cleanup and the existing four returned enumerable session keys remain unchanged.
5. Two pre-RED token-state assertions were corrected from invalid to canonical invalidated. No test run had occurred.
6. First Step 4 self-fix under DEC-20261023-01 B4: the new test opened ledger.db, creating an empty database, while build.ts:701 writes ledger.sqlite3. Failure lines, verbatim: Expected: "closed"; Received: "starting" and Expected: "active"; Received: "starting". The test now asserts that the actual ledger exists before opening it. Required assertions remain. Verification restarted with typecheck, then the whole changed test file.
7. Review-driven fixes bound the supervisor exit wait at the existing outer bound, preserve timeout as failure so finally cleanup runs, and return observed exit status and signal for assertions. Bun 1.4.2 reports null exitCode with SIGKILL; its receipt type now admits that value and the exact signal is asserted. Verification restarted after each change; final typecheck and Step 5 passed.
8. This section cannot include the hash of its own containing commit. The next task section and final report record it, following the prompt's explicit self-reference rule.

### Result

RED established the named missing capability. The deliberate break failed required tests. Typecheck exited 0; Phase 3A had 97 pass and 0 fail. `git diff --check` exited 0. Only the four named Task 51 paths are staged for this task. No production file changed. No B9 halt occurred; load-gate waits were answered by the Founder.
