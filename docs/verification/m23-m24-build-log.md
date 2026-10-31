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

## Task 52 — descriptor hygiene and process groups

Built on Task 51 commit: `75b76ff4edf781a8b28d9c305aed78a8c09358d0`, parent `189c2c12fb0147909f0b8fdc550affca92e70156`.

Changed files: runtime-harness.ts, adversarial/descriptor-hygiene.test.ts, adversarial/process-group.test.ts, and this build log, all under the authorized test and documentation roots.

### Commands, outcomes and full-output logs

Every Bun command used the required runtime prefix. The full runtime check before the first Task 52 test matched every pinned value. Logs are under the same external log directory as Task 51.

| Step | Command | Exit | Full-output log | SHA-256 |
| --- | --- | ---: | --- | --- |
| 52.2 | `bun test test/phase3a/adversarial/descriptor-hygiene.test.ts -t "with two PTY hosts and an adapter, no process holds a sibling's lifeline write end"` | 1 | `task52-step2-run1.log` | `5497b89cb4123d7e965f061aaf8dd74ca8ad6f2abdbe9c1c237ce3ef679c4be0` |
| 52.4 | `bun test test/phase3a/adversarial/descriptor-hygiene.test.ts test/phase3a/adversarial/process-group.test.ts` | 1 | `task52-step4-run1.log` | `ca644c72bd44236733b1457e41300c4d0587559947330117bbc25f8e0bd7be76` |
| 52 self-fix | `bunx tsc --noEmit` | 2 | `task52-self-fix-typecheck-run1.log` | `206552d7b2a7335bdd290fff6ac5688869561e282d8fca40870acbf5fbaf8fa4` |
| 52.4 diagnostic | `bun test test/phase3a/adversarial/descriptor-hygiene.test.ts test/phase3a/adversarial/process-group.test.ts` | 1 | `task52-step4-run2.log` | `fc5a4e04b194a97b59500868362e453434d27ea7d47ed09e714d3ce7e8ad9ae8` |
| 52 self-fix | `bunx tsc --noEmit` | 0 | `task52-self-fix-typecheck-run2.log` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| 52.4 | `bun test test/phase3a/adversarial/descriptor-hygiene.test.ts test/phase3a/adversarial/process-group.test.ts` | 1 | `task52-step4-run3.log` | `bd0aa3fbaf6719aa371b75fe94d4b4bf0927c8bad25584c55b7be5ee85307235` |
| 52 descriptor behavior probe | `bun test test/phase3a/adversarial/descriptor-hygiene.test.ts` | 1 | `task52-descriptor-probe-run1.log` | `880fa75f08d3eca310294edd0ebc8bb40ef24f56fb817be76b8eba240663e2ec` |
| 52 self-fix | `bunx tsc --noEmit` | 0 | `task52-self-fix-typecheck-run3.log` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| 52.4 | `bun test test/phase3a/adversarial/descriptor-hygiene.test.ts test/phase3a/adversarial/process-group.test.ts` | 0 | `task52-step4-run4.log` | `f127c14e201fd3d44ae47332f6828f85b801b9723483ba25c5521eade33e79be` |
| 52 break | `bun test test/phase3a/adversarial/process-group.test.ts` | 1 | `task52-break-run1.log` | `c70fe3a3ad3970f463ef5a9fe9757236130e507fa18ec998ea623355c765bf68` |
| 52.5 | `bunx tsc --noEmit` | 0 | `task52-step5-typecheck-run1.log` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| 52.5 | `bun test test/phase3a` | 0 | `task52-step5-phase3a-run1.log` | `210516e0b704eb59c86fcfd950e4055586a646d1b630a92ba91bd8ba1caa288d` |

Run summaries and uptime readings, copied from logs:

`task52-step2-run1.log`:

```text
23:27  up 3 days, 14:36, 4 users, load averages: 1.16 1.40 1.82
 0 pass
 1 filtered out
 1 fail
 2 expect() calls
Ran 1 test across 1 file. [566.00ms]
```

`task52-step4-run1.log`:

```text
23:29  up 3 days, 14:37, 4 users, load averages: 1.18 1.38 1.78
 4 pass
 3 fail
 71 expect() calls
Ran 7 tests across 2 files. [2.98s]
```

`task52-self-fix-typecheck-run1.log`:

```text
No output; exit 2.
```

`task52-step4-run2.log`:

```text
23:31  up 3 days, 14:40, 4 users, load averages: 1.48 1.47 1.75
 6 pass
 1 fail
 80 expect() calls
Ran 7 tests across 2 files. [5.93s]
```

`task52-self-fix-typecheck-run2.log`:

```text
No output; exit 0.
```

`task52-step4-run3.log`:

```text
23:32  up 3 days, 14:41, 4 users, load averages: 1.95 1.61 1.77
 6 pass
 1 fail
 75 expect() calls
Ran 7 tests across 2 files. [5.06s]
```

`task52-descriptor-probe-run1.log`:

```text
23:34  up 3 days, 14:43, 4 users, load averages: 1.34 1.50 1.71
 1 pass
 1 fail
 35 expect() calls
Ran 2 tests across 1 file. [1099.00ms]
```

`task52-self-fix-typecheck-run3.log`:

```text
No output; exit 0.
```

`task52-step4-run4.log`:

```text
23:35  up 3 days, 14:44, 4 users, load averages: 1.04 1.36 1.64
 7 pass
 0 fail
 89 expect() calls
Ran 7 tests across 2 files. [4.90s]
```

`task52-break-run1.log`:

```text
23:36  up 3 days, 14:45, 4 users, load averages: 1.35 1.40 1.64
 4 pass
 1 fail
 32 expect() calls
Ran 5 tests across 1 file. [8.53s]
```

`task52-step5-typecheck-run1.log`:

```text
No output; exit 0.
```

`task52-step5-phase3a-run1.log`:

```text
23:37  up 3 days, 14:46, 4 users, load averages: 1.71 1.47 1.65
 104 pass
 0 fail
 2138 expect() calls
Ran 104 tests across 11 files. [35.99s]
```

### Tests, RED and file counts

Seven exact plan names: two descriptor-hygiene tests and five process-group tests. Step 4 run 4 had 7 pass and 0 fail; Step 5 repeated every one in a Phase 3A suite with 104 pass and 0 fail. They cover section 6.4 scenarios 5 through 9 and the explicit section 3.5 setsid residual.

RED ran exactly one test with one filtered out. Failure lines, verbatim:

```text
error: the harness has no concurrent fixture adapter process

Received: null
```

### Deliberate break

The break omitted the host-kill injection while leaving the host-stream observer intact. The full harness diff was printed before the unfiltered five-test process-group file. Four passed and the host-exit test failed. This demonstrates that fixture interruption depends on observed host loss rather than an unconditional injected interruption.

Failing assertion and values, verbatim:

```text
78 |     expect(snapshot.phase).toBe("closed");
error: expect(received).toBe(expected)

Expected: "closed"
Received: "active"
```

Restored file SHA-256 values matched their pre-break values:

- runtime-harness.ts: 05a3847b2542d29803010007239ab8fedd3df27777c01751357cc356cb3c2ea1
- descriptor-hygiene.test.ts: c1021e9aced8f0d023cb828c049f1e7cc4b6aa6753858ab64ec59ca965aa13f2
- process-group.test.ts: 9d6db02acfe48c4a27bb6e69febc23aa4c9489d73ba0540f586a2583c993d359

Observed Task 52 timings and residual summary from the restored Step 5 suite:

```text
ignore_SIGTERM: final_death_ms=2040.33
lifeline_EOF: final_death_ms=177.07
host_exit: final_death_ms=193.30
setsid_residual: recorded_count=1 group_containment=false
```

### B4, B5, narrower readings and self-fixes

1. B4: no real inherited lifeline write endpoint was found. packages/broker/src/pty-host-supervisor.ts remains byte-identical. Its working directory was not changed.
2. B5: only the descriptor test ran lsof, on the supervisor, two hosts, two governed children and the auxiliary fixture adapter recorded by the harness. It parsed descriptor numbers, types, device/inode identifiers, and hexadecimal peer identifiers only. It ignored file and socket path names. The session itself ran no process or descriptor listing. Linux uses the permitted recorded-PID fd directory branch but was not run on this MacBook.
3. Narrower reading: the binding base already has two hosts. RED therefore pins the missing concurrent fixture-adapter process, rather than pretending the second host was absent. Scenario startup adds the auxiliary fixture adapter without adding an execution or altering default harness sessions.
4. The first own GREEN run failed three checks: TERM-ignore duration Expected >= 2000, Received 27.595500000000015; EOF host death Expected false, Received true; descriptor type Expected "PIPE", Received "". The fixture-ready marker is now awaited before measuring TERM handling, EOF waits for both host and group, and the parser handles actual field delimiters and type casing.
5. Self-fix typecheck run 1 failed with readonly-array conversion errors and an optional regex-capture assignment error. The new tests now import the implemented typed helpers directly instead of keeping RED-only reflective fallback interfaces, and validate the matched capture. The complete failure output is in its unchanged log. Run 2 passed.
6. The next runtime run had six pass and one fail: Expected "PIPE", Received "UNIX". This is Bun's anonymous stdin socketpair on macOS, not a named runtime endpoint. The test supports both observed anonymous descriptor types without weakening the no-alias assertion.
7. Run 3 and the diagnostic behavior probe failed the non-vacuity owner check: Expected > 0, Received 0. The probe printed only permitted descriptor metadata and showed that lsof's selected D field did not provide anonymous endpoint device identifiers. Selecting d as well established both endpoint identities and their supervisor owner. The no-alias and positive-owner assertions remain. Diagnostic prints were then removed. No unchanged failed run was repeated to obtain a pass.
8. Step 4 run 2 started after the preceding self-fix typecheck had failed. It is retained as diagnostic evidence, not a passing gate. Subsequent verification restarted with a passing typecheck and the full files.
9. Required host code reviews found a causality gap: the original host-exit timer both killed and directly interrupted. The timer now only kills; an independent host-fact-stream observer derives interruption. The deliberate break confirms this correction. Reviews remain non-binding advice, not the act's Tier-2 verdict. Both subagents were interrupted after completion.
10. The setsid fixture uses the existing Bun detached-spawn behavior, already described as calling setsid in the spike source. Its descendant was still alive after governed group termination, recorded as one setsid_escape residual, and separately killed during final fixture cleanup. This is an explicit containment limitation, not hostile-process containment.
11. All changes and self-fixes stayed within the task's authorized test files and harness. No conditional production path or fixture-adapters.ts change was used.

### Result

RED failed for the absent adapter; Step 4 had 7 pass and 0 fail; the causal break failed; restored Step 5 typecheck exited 0 and Phase 3A had 104 pass and 0 fail. `git diff --check` exited 0. The current commit identity is recorded by the next section and final report. No B9 halt occurred.

## Task 53 — resumed by session:codex/m23-m24-r2

Built on Task 52 commit `226f6aee99013cfaa31511f498772cfa2eab4dd3`, parent `75b76ff4edf781a8b28d9c305aed78a8c09358d0`, whose parent is binding base `189c2c12fb0147909f0b8fdc550affca92e70156`.

This section precedes the Task 53 commit. Its full commit identity is recorded by Task 54 and the final report, avoiding self-reference. Changed paths: runtime-harness.ts; new adversarial/wedged-host.test.ts and adversarial/sequence-invariants.test.ts; the three existing adversarial files named by Addendum 6; and this build log. No production path changed.

### Resume identity, authority and custody

Harness Codex; model shown GPT-6; sandbox shown danger-full-access; filesystem unrestricted; network enabled; approval policy not shown. Settings were not changed. Agent-creation tools are available; this session started no agent. Memory context was supplied; no hook output was supplied and no memory or earlier-session transcript files were read. Source discovery used in-clone reads, as the prompt forbids MCP servers. The host review-agent instructions are waived by Addenda 3 and 4; no agent is required or permitted for this build.

Working directory `/Users/michaeldaley/builds/madventures-tui-m23-m24-r1`, branch `build/m23-m24-r1`, and the ancestry above matched. Initial status, verbatim:

```text
 M test/phase3a/runtime-harness.ts
?? test/phase3a/adversarial/sequence-invariants.test.ts
?? test/phase3a/adversarial/wedged-host.test.ts
```

The leftovers were saved under `/Users/michaeldaley/builds/m23-m24-r1-pr/r1-task53-leftover/`, then the tracked path restored and exactly the copied untracked files deleted, under Addendum 4 item 3. Status became empty. Their contents were not read or adapted; Task 53 was written fresh from plan Step 1. Saved-file SHA-256 values, confirmed with shasum:

| Saved path relative to the archive | SHA-256 |
| --- | --- |
| status.txt | 90fa307750565e02bb110ccb2f14dcb75047266a639dd75cc31b6402cb8f9889 |
| tracked.patch | 4e1fc51e87d7baf4106d49da9161c8e7e1f0e1f6997cdefd2a9fd97e129666c8 |
| test/phase3a/adversarial/sequence-invariants.test.ts | 100295f89610bd87449cc2813f79d97ec00950eb0808fb4de11f1fd279956a5a |
| test/phase3a/adversarial/wedged-host.test.ts | 0e6e2e89730297f5ac0b7035a9d724ffbac73d9d92c6aef9ae121cc09ad80aa3 |

`git fetch origin main` exited 0. origin/main is exactly the binding base, and the upstream changed-path list is empty. All eight authority documents matched the prompt's hashes on origin/main and were read before the first edit; the six acts are ISSUED and signed Michael Daley. The initial Python hash comparison and archive hashes were reverified using the required macOS shasum command. Host from uname: Darwin 27.0.0 arm64; user from id -un: michaeldaley.

Every runtime check so far matched `/Users/michaeldaley/.bun/bin/bun`, bunx at `/Users/michaeldaley/.bun/bin/bunx` symlinked to that Bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, binary SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Checks occurred at identity, before the resume install, before Addendum 5's escalated run, before Addendum 6's break, and before Task 53 RED. Each Bun command set the required PATH inside its own command. bun.lock remains 34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0. Install changed only the permitted main.ts executable bit; chmod 644 restored it before further work.

Founder answer to precondition 5, verbatim:

> Host quieted as far as I can. Visible apps: Finder, Claude, cmux, app_mode_loader, Kimi Code. Hermes processes: 0. Load averages: 1.90 1.77 2.09. Continue

The answer arrived after the first resume suite; running that suite before the answer is recorded as a deviation. No process-listing command was run by this session.

### Addenda and earlier-session record

These are SHA-256 values of the exact supplied addendum bodies, from their ADDENDUM heading through their final sentence, UTF-8 with LF and one final newline, computed using shasum on stdin. They are not claims about an unseen signed filesystem artifact.

| Addendum | SHA-256 |
| --- | --- |
| 1 | 1dd90f6dba570a0bf071b195514878a37a34e458252ccb46d9c831d711683939 |
| 2 | d369bac9b0f3a25880f87c04683b5a00bb1a66816674de19b53487875eca5cfe |
| 3 | cc2ce8bb08d4f1cc0a4b5b899c633e0a0f68da641ceeb25ba24c029fdb628927 |
| 4 | 1a3b056cd6b1e47f0d3d8e8b663796f069fbe0f664574f17ddf1ad6e5738431f |
| 5 | 6bb9938c2f2ae29b9c9295a6440f84d20b4ec887dbdcee01e3ae4ac10cd4cc3e |
| 6 | ba48aa146bbc5efe26ec3e9ca3fedae64f3f260735f69bd316a8ed90a30074e2 |

Agents used in Tasks 51 and 52: session:codex/m23-m24-r1 started task51_test_review and task51_typescript_review against the builder prompt, under host code-review and TypeScript-review instructions that Addendum 3 waives. As far as the carried record states, they were asked to review the in-clone Task 51/52 changes for test reach and TypeScript/code correctness. Their exact requests and transcripts were not kept. Both are completed and interrupted. No message beginning "Do not use subagents" reached that session. This record is carried from Addendum 4, not inferred from transcripts. Agent advice is not review evidence; the changes stand on the tests, gates and the later Tier-2 review.

The previous builder wrote each change itself. The agent-derived hunks were verified with git show:

* In 75b76ff4edf781a8b28d9c305aed78a8c09358d0, runtime-harness.ts's exit function bounds proc.exited with Promise.race and HOST_DEADLINES_MS.outerBound, clears its timer in finally, and returns exitCode and signalCode. The bounded-wait finding came from task51_test_review. The returned exit outcomes and per-mode assertions came from task51_typescript_review. supervisor-death.test.ts asserts exitCode 0 for clean/SIGTERM, nonzero for crash/SIGKILL, and signalCode SIGKILL only for SIGKILL. The nullable exitCode accommodates observed Bun behavior without weakening the signal assertion.
* In 226f6aee99013cfaa31511f498772cfa2eab4dd3, runtime-harness.ts starts a separate observer of hosts[0].handle.facts(), waits for it to end, and only then calls interrupt("pty_host_failure") if not closing. The timer itself only kills the host. This task51_test_review finding corrects host-exit causality. The unchanged commits retain their r1 trailers.

Earlier Task 53 halt, carried verbatim in substance by Addendum 4: test "a SIGSTOPped host is cleared through the direct PGID path" asserted `expect(data.observedMs.pgidKillAttemptedMs).toBeGreaterThanOrEqual(250)` and received 249.82662499999992, state S3, ackWindowEndedMs 249.6094579999999. Its log is `/Users/michaeldaley/builds/m23-m24-r1-pr/logs/task53-step4-run1.log`, SHA-256 de8d9c062faca74c2fbcd3947d15bcebb58360f7f1da9d2ceec3794b7001f6e0. The old assertion and old files were not reused. New Task 53 deadline lower bounds are 249 ms under Addendum 1, with S3, no terminate acknowledgement, no termination_started fact, closeStdinCalled true, no prior exit, ordered PGID/host kills, and printed observed values. Upper kill-initiation bounds remain exactly 500 ms and death exactly 5000 ms. Production's timer may fire before its monotonic deadline; re-arming production is deferred to the next act authorizing packages/broker.

### Resume EPERM halts and authorized correction

The first resume suite and Addendum 5's escalated suite both failed the same Task 52 test, "deliberate lifeline EOF terminates that child's process group only", at process-group.test.ts:7 and :61. Failure lines, verbatim:

```text
SystemError: kill() failed: EPERM: Operation not permitted
 syscall: "kill",
   errno: 1,
    code: "EPERM"

      at alive (/Users/michaeldaley/builds/madventures-tui-m23-m24-r1/test/phase3a/adversarial/process-group.test.ts:7:17)
      at <anonymous> (/Users/michaeldaley/builds/madventures-tui-m23-m24-r1/test/phase3a/adversarial/process-group.test.ts:61:13)
```

Both runs had 103 pass, 1 fail, 2133 expect calls across 104 tests and 11 files, and exited 1. These were B9 item 4 / Addendum 4 item 4c and Addendum 5 item 3 halts respectively. No code was changed to resolve either until Addendum 6 authorized it. The operation was signal-0 liveness probing of a recorded process/group, not descriptor listing, sockets or file access. Addendum 6 supersedes Addendum 5 item 2's sandbox attribution: the escalated failure shows this was not a sandbox effect.

The escalation request asked, verbatim:

> Approve running this build’s test commands outside the sandbox for the rest of session session:codex/m23-m24-r2, as Addendum 5 §3 requires?

The harness executed that require_escalated request; no separate textual approval response was exposed. Addendum 6 item 5 explicitly confirms "under the approval you already hold". No verbatim approval response is fabricated. The first resume run used default execution. Every test run after Addendum 5, including all runs under Addendum 6 and Task 53, requested require_escalated under that approval. The phrase "every test run of this session" in Addendum 6's recording instruction is recorded with this chronology, not applied retroactively to the earlier run.

Spike evidence at test/phase3a/spike/bun-terminal-spike.ts:258-261 states:

```text
/** Process state via ps; empty when the pid is gone. A zombie is dead: its
 *  reaping parent has already received the exit. Signaling a zombie-only
 *  group returns EPERM on macOS (observed live), so zombies are never
 *  counted as signalable — F13-class hazard, designed around (Q3). */
```

Under Addendum 6, the alive helpers in runtime-harness.ts, supervisor-death.test.ts, descriptor-hygiene.test.ts and process-group.test.ts now count EPERM and return false for it, return false for ESRCH, return true on success, and rethrow every other error. Existing assertions stay. A read-only counter accessor lets test afterAll hooks print the harness count without changing the exact stdout/stderr of the existing isolated harness test. Production's EPERM-as-alive behavior is unchanged.

The Addendum 6 break temporarily omitted the grandchild scenario's interrupt, so the recorded governed processes were still live when gone() checked them. The full affected file ran without a filter; exactly "a grandchild in the governed process group is terminated" failed, 4 pass and 1 fail. Assertion, verbatim:

```text
19 |   for (const pid of [...data.hostPids, ...data.childPids, ...data.descendantPids]) expect(alive(pid)).toBe(false);
error: expect(received).toBe(expected)

Expected: false
Received: true
```

The break was restored and these hashes matched the pre-break files: runtime-harness.ts f717bceaf7b696d31cbe7cf5f6c8df262f2d7163e495993a9db36b81e37fe5c9; supervisor-death.test.ts abda233ffd61564f64f853f8d1ceb738823250f2505b6b50a89f0b5f64c927d3; descriptor-hygiene.test.ts 379073827b3cf37ce49d2c49958a283feae1525aa6d021a0be8f4b18d7a8d6ef; process-group.test.ts e2c06b00029ba2173f40b33b20c65f7a7b6c59350eb6e84a2ec63e451c36a423. The changed-tests resume suite then passed 104/104, with every helper's EPERM count printed as 0. No unchanged failed suite was rerun to obtain a pass.

### Commands and logs so far

Log folder: `/Users/michaeldaley/builds/m23-m24-r1-pr/logs/`. All output is full and uncompressed. Exit 88 below is a load-gate stop before a test command was started, not a test run.

| Command / step | Exit | Log | SHA-256 |
| --- | ---: | --- | --- |
| resume bun install --frozen-lockfile | 0 | r2-resume-install-run1.log | bbb04956f08397c0ce19dc36a629f4df2a5ddd3829aea96811a33be8bc6baf9e |
| resume bunx tsc --noEmit | 0 | r2-resume-typecheck-run1.log | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |
| resume bun test test/phase3a | 1 | r2-resume-phase3a-run1.log | 04d9e7225744ff471feb2fe32211e79032769f6287516b9ef9bb9603d1c4e781 |
| Addendum 5 bun test test/phase3a | 1 | r2-resume-phase3a-escalated-run1.log | aba12a8390f82b047cd4d47b08883f91b27978bba77cf6add070d8f2244e9226 |
| Addendum 6 break: bun test test/phase3a/adversarial/process-group.test.ts | 1 | r2-addendum6-break-run1.log | fae12dff40e28efdd228a156f220dbd711785580984c3a8a6be8dae07d82d10d |
| Addendum 6 bun test test/phase3a | 0 | r2-addendum6-phase3a-run1.log | 015d5fb7815b7c31bf0bc787e6efd83cae94c3539732add5e9142b280e0544fe |
| Task 53 RED: bun test test/phase3a/adversarial/wedged-host.test.ts -t "a SIGSTOPped host is cleared through the direct PGID path" | 1 | r2-task53-step2-run1.log | 853621c5c893fdfa5504ab2967c0d4e240bb7c917c55879aa4ed34bfd55c91d4 |
| Task 53 bunx tsc --noEmit | 0 | r2-task53-step3-typecheck-run1.log | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |
| Task 53 bun test test/phase3a/adversarial/wedged-host.test.ts test/phase3a/adversarial/sequence-invariants.test.ts | 0 | r2-task53-step4-run1.log | 0f6065aadf349687f6c39556c73e275404a73f84a25186127cde8456a2911acd |
| Task 53 break precheck; no test started | 88 | r2-task53-break-run1.log | b6bd73c071bd15318bb1eea7bf39887fc6b18a0790c6c1731941f892fdd07233 |

Task 53 RED ran exactly one test, four filtered out. It failed with `error: InvalidHarnessOptions` at requestedSurfaces runtime-harness.ts:97 because wedgeHostAfter was not an accepted option. No Task 53 implementation preceded that run. Typecheck then passed; Step 4 ran all five tests in each new file, 10 pass and 0 fail, 184 expect calls. Every deadline case printed the complete production escalation outcome and had S3, 0 terminate acknowledgements and no termination_started fact. The three PGID kill observations were 249.9035829999999, 249.45583299999998 and 249.29641700000002 ms. Host kill observations were 249.9091659999999, 249.46112500000004 and 249.3018750000001 ms. Every lower bound met the 249 ms reading and every upper bound stayed exact.

Task 53's planned break turns only an output gap into the next valid sequence. Its first precheck saw load 13.41 4.32 2.71 and started no test; the change was restored to db1a4b1118dfcf1867d65f4ec263814623a892e787a404364b648c39cb2d490d before waiting for the Founder to quiet the host. Other restored hashes: wedged-host.test.ts ce60b3774cb8efbc973da22eed2f5ef7461957d6ee79d2e32a3afe57983a3045; sequence-invariants.test.ts 3fd0db56664f4dff7bf814de075ed65424cdcf106179896e084e991d7e354932.

Founder response to that load hold, verbatim:

```text
load 2.17, waiting
Host quieted as far as I can. Visible apps: Finder, Claude, cmux, app_mode_loader, Google Chrome, Kimi Code, Antigravity, ChatGPT. Hermes processes: 0. Load averages: 1.90 2.15 2.29. Host ready.
```

The resume state check confirmed the same head, branch and source hashes. Its live uptime was `12:30  up 4 days,  3:39, 8 users, load averages: 2.20 2.20 2.30`. No test was started. A new host-quieting request was made under the load gate.

Narrower reading: malformed and unknown serialized facts are injected at the harness receive boundary through the production decodeFact codec, whose typed rejection causes the harness's typed session interruption. No host executable or production file is replaced. Sequence anomalies use the existing private client test seams inside the harness. Neither injection seam, a publisher nor any broker/ledger object is returned to tests. The exported fault report is a frozen defensive copy of data only.

### Task 53 restored break and final task gates

The Founder answered the second load hold, verbatim: `1. Host ready.` The immediate test precheck was below 2.0. Task 53's break then changed only the output gap's offered sequence from last + 2 to last + 1. The complete five-test sequence file ran without a filter. It failed exactly "an output sequence gap interrupts the session" and "every timing assertion reports observed values, not just pass"; duplicate, regression and snapshot-gap checks still passed. Both failing assertions were:

```text
28 |     expect(data.errorName).toBe("SequenceInvariantError");
error: expect(received).toBe(expected)

Expected: "SequenceInvariantError"
Received: null
```

The full harness diff was printed in the break log before the run. The break was restored before gates. Verified restored hashes matched their pre-break values: runtime-harness.ts db1a4b1118dfcf1867d65f4ec263814623a892e787a404364b648c39cb2d490d; wedged-host.test.ts ce60b3774cb8efbc973da22eed2f5ef7461957d6ee79d2e32a3afe57983a3045; sequence-invariants.test.ts 3fd0db56664f4dff7bf814de075ed65424cdcf106179896e084e991d7e354932. No break is committed.

| Command / step | Exit | Log | SHA-256 |
| --- | ---: | --- | --- |
| Task 53 break: bun test test/phase3a/adversarial/sequence-invariants.test.ts | 1 | r2-task53-break-run2.log | 511bc1b4118ea15e30d3d2faf3c3d17d36905c9ce02bbe49f0d3d8499f9a1bca |
| Task 53 Step 5 bunx tsc --noEmit | 0 | r2-task53-step5-typecheck-run1.log | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |
| Task 53 Step 5 bun test test/phase3a packages/broker | 0 | r2-task53-step5-phase3a-broker-run1.log | 66349e947c76d3dd71eee14a61d45c5118d31eba4b3790c2428f93b6b5876b2b |

Uptime and summary lines for the resume and Task 53 runs, copied from the corresponding logs:

```text
r2-resume-phase3a-run1.log
10:35  up 4 days,  1:44, 7 users, load averages: 1.54 1.61 2.23
 103 pass
 1 fail
 2133 expect() calls
Ran 104 tests across 11 files. [46.42s]
r2-resume-phase3a-escalated-run1.log
10:47  up 4 days,  1:56, 8 users, load averages: 1.51 1.68 1.94
 103 pass
 1 fail
 2133 expect() calls
Ran 104 tests across 11 files. [46.95s]
r2-addendum6-break-run1.log
10:55  up 4 days,  2:04, 8 users, load averages: 1.57 1.62 1.80
 4 pass
 1 fail
 34 expect() calls
Ran 5 tests across 1 file. [5.46s]
r2-addendum6-phase3a-run1.log
10:55  up 4 days,  2:04, 8 users, load averages: 1.32 1.57 1.77
 104 pass
 0 fail
 2138 expect() calls
Ran 104 tests across 11 files. [48.15s]
r2-task53-step2-run1.log
10:57  up 4 days,  2:06, 8 users, load averages: 1.98 1.69 1.79
 0 pass
 4 filtered out
 1 fail
Ran 1 test across 1 file. [19.00ms]
r2-task53-step4-run1.log
10:59  up 4 days,  2:08, 8 users, load averages: 1.93 1.68 1.77
 10 pass
 0 fail
 184 expect() calls
Ran 10 tests across 2 files. [6.49s]
r2-task53-break-run2.log
12:32  up 4 days,  3:41, 8 users, load averages: 1.46 1.91 2.17
 3 pass
 2 fail
 49 expect() calls
Ran 5 tests across 1 file. [12.39s]
r2-task53-step5-phase3a-broker-run1.log
12:33  up 4 days,  3:42, 8 users, load averages: 1.34 1.84 2.13
 414 pass
 0 fail
 5003 expect() calls
Ran 414 tests across 29 files. [58.45s]
```

In the restored Step 5 suite, the new timing tests printed these complete timing observations and causal facts:

```text
host_fault {"detectedMs":251.77404199999728,"deathMs":274.3442500000019,"escalation":{"reason":"pty_host_failure","state":"S3","escalated":true,"closeStdinCalled":true,"sessionInterruptionRequired":true,"pgidKillAttempted":true,"hostKillAttempted":true,"unnecessaryHostExitConfirmed":false,"killOrder":["pgid","host"],"observedMs":{"terminateSentMs":0.024041999997280072,"ackWindowEndedMs":249.60245900000155,"stdinClosedMs":249.6165420000034,"classifiedMs":249.64300000000367,"pgidKillAttemptedMs":249.67741699999897,"hostKillAttemptedMs":249.687417000001,"escalatedMs":249.6883749999979}},"terminateAcks":0,"terminationStarted":false,"errorName":null,"sequenceKind":null}
host_fault {"detectedMs":251.7771670000002,"deathMs":273.95991700000013,"escalation":{"reason":"pty_host_failure","state":"S3","escalated":true,"closeStdinCalled":true,"sessionInterruptionRequired":true,"pgidKillAttempted":true,"hostKillAttempted":true,"unnecessaryHostExitConfirmed":false,"killOrder":["pgid","host"],"observedMs":{"terminateSentMs":0.02070899999671383,"ackWindowEndedMs":249.65149999999994,"stdinClosedMs":249.6631669999988,"classifiedMs":249.67929199999344,"pgidKillAttemptedMs":249.70175000000017,"hostKillAttemptedMs":249.7094169999982,"escalatedMs":249.70999999999913}},"terminateAcks":0,"terminationStarted":false,"errorName":null,"sequenceKind":null}
host_fault {"detectedMs":251.6617499999993,"deathMs":274.36124999999447,"escalation":{"reason":"pty_host_failure","state":"S3","escalated":true,"closeStdinCalled":true,"sessionInterruptionRequired":true,"pgidKillAttempted":true,"hostKillAttempted":true,"unnecessaryHostExitConfirmed":false,"killOrder":["pgid","host"],"observedMs":{"terminateSentMs":0.022333000000799075,"ackWindowEndedMs":249.69225000000006,"stdinClosedMs":249.7073750000054,"classifiedMs":249.72150000000693,"pgidKillAttemptedMs":249.74629200000345,"hostKillAttemptedMs":249.75400000000081,"escalatedMs":249.7546250000014}},"terminateAcks":0,"terminationStarted":false,"errorName":null,"sequenceKind":null}
host_fault {"detectedMs":1.973041999997804,"deathMs":24.894541999994544,"escalation":null,"terminateAcks":1,"terminationStarted":true,"errorName":"MalformedFrameError","sequenceKind":null}
host_fault {"detectedMs":1.3315419999998994,"deathMs":24.32395899999392,"escalation":null,"terminateAcks":1,"terminationStarted":true,"errorName":"MalformedFrameError","sequenceKind":null}
sequence_fault {"detectedMs":2.0167920000021695,"deathMs":25.6036249999961,"escalation":null,"terminateAcks":1,"terminationStarted":true,"errorName":"SequenceInvariantError","sequenceKind":"duplicate"}
sequence_fault {"detectedMs":2.32341599999927,"deathMs":25.421000000002095,"escalation":null,"terminateAcks":1,"terminationStarted":true,"errorName":"SequenceInvariantError","sequenceKind":"regression"}
sequence_fault {"detectedMs":1.9752499999958673,"deathMs":24.610374999996566,"escalation":null,"terminateAcks":1,"terminationStarted":true,"errorName":"SequenceInvariantError","sequenceKind":"gap"}
sequence_fault {"detectedMs":1.9816670000000158,"deathMs":25.270542000005662,"escalation":null,"terminateAcks":1,"terminationStarted":true,"errorName":"SequenceInvariantError","sequenceKind":"gap"}
sequence_fault {"detectedMs":2.086583000003884,"deathMs":25.272375000000466,"escalation":null,"terminateAcks":1,"terminationStarted":true,"errorName":"SequenceInvariantError","sequenceKind":"gap"}
```

Result: five tests per new file; the required RED and a non-vacuous break; restored typecheck exit 0; required combined suite 414 pass and 0 fail; no production changes. git diff --check and the exact-path and credential-shape scans passed before staging. The staged diff is checked again before commit. No self-fix of a failed new Task 53 GREEN run was needed. The resume failures, Addendum 6 correction and two load holds above are the deviations carried by this task.

## Task 54 — ledger, attestation, auth and residual scenarios

Built on Task 53 commit `2871fbc5c36db98176593bb4d81d1016da8bbc3e`, parent `226f6aee99013cfaa31511f498772cfa2eab4dd3`. This section precedes the Task 54 commit; Task 55 records that commit's identity. Changed files are runtime-harness.ts, the four new adversarial files named by Task 54, and this build log. No production file changed.

### Deviations: scope halt and Addendum 7

Before Task 54 Step 1, the session halted under DEC-20261028-02 B9 item 1 and plan section 10 item 1. Addendum 6 item 4's sentence "that commit is the only one to touch these files again" could either pin all four files touched by the liveness correction, including runtime-harness.ts, or allow the later harness changes required by Task 54 Step 3. No Task 54 edit or test occurred before the ruling.

Addendum 7 rules that the restriction concerns the corrected liveness helpers and the placement of their correction in Task 53's commit, not the containing files. It expressly permits the remaining tasks and final gates to change B3 paths as their plan steps require, including runtime-harness.ts. Its supplied text, from ADDENDUM heading through the final sentence, UTF-8 with LF and one final newline, has SHA-256 `51b9a6c8e74e142091cdb6bc73394e2012aaa8c2a9c975b544e8c63a0878b83e`, computed with shasum on stdin. No claim is made about an unseen signed filesystem artifact.

After the ruling the branch/head matched, the tree was clean, and Task 54 began at Step 1. All four named files were written before the RED command. The corrected harness liveness helper was compared byte for byte with Task 53 and is unchanged. The three earlier adversarial files have not been touched again.

### RED and implementation readings

Task 54 RED ran exactly one test, with one filtered out. The test's missing-switch fallback starts the default harness and exercises successful real pause/resume appends so that RED has the plan's required cause, rather than failing only on option validation. The fallback is reached only when the option is absent; it cannot turn a missing-switch regression green. Every required assertion remains. Required failure, verbatim:

```text
32 |     expect(snapshot.phase).toBe("closed");
error: expect(received).toBe(expected)

Expected: "closed"
Received: "active"
```

The runtime check before RED again matched the pinned Bun path, bunx symlink, binary SHA-256, version and revision. No host setting or runtime changed. Every Task 54 check requests require_escalated under the existing Founder approval.

Implementation is confined to runtime-harness.ts and the four new test files. fixture-adapters.ts is not needed: the harness can alter only the generated fixture sources. Production remains unchanged.

Narrower fixture readings: failLedgerAppendAfter selects one failing append or persistent failure; SQLite PRAGMA query_only supplies a real SQLITE_READONLY failure on the build's existing connection. Changing directory modes alone would not make that already-open connection reliably refuse writes. The harness restores write capability before a transient interruption, but keeps the persistent case unrecordable until the test closes it and performs production next-start reconciliation. It records no fabricated terminal prefix. Auth expiry and model mismatch arrive as synthetic fixture-child output and the harness requests the existing typed interruptions; no production monitor or new production routing is claimed. mismatchAttestationAfter is the additional fixture switch needed for the separately named mismatch test. swapBinaryBeforeExec changes the generated executable after preflight while retaining the original launch hash; failSecondSurfaceLaunch supplies an incorrect second descriptor hash so the first child's real launch is observed before failure.

The resource census retains only internal references to fixture-owned resources and returns frozen copied data. It records host/child/group identities from launched facts and specific anonymous descriptor identities from the test process, checks the original ledger instance is closed, and reads any retained ledger without writes to count still-valid durable tokens. It also tracks the parent-side child-supervisor resources and every session started through this module. No broker, ledger or publishing callback is returned to a test; no process-listing command is run by the builder.

### Commands and logs so far

Logs remain under `/Users/michaeldaley/builds/m23-m24-r1-pr/logs/`; no existing log is overwritten.

| Command / step | Exit | Log | SHA-256 |
| --- | ---: | --- | --- |
| Task 54 RED: bun test test/phase3a/adversarial/ledger-failure.test.ts -t "a mid-session append failure interrupts with ledger_write_failed" | 1 | r2-task54-step2-run1.log | e7b8b4e64fafe874ffcf277a312ce0261006b3d5c0d60e1a5efdad9350be6562 |
| Task 54 Step 3 bunx tsc --noEmit | 0 | r2-task54-step3-typecheck-run1.log | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |
| Task 54 Step 4 load precheck; no test started | 88 | r2-task54-step4-run1.log | 5091b14df6115a60455be714b5e4d99965c008b2641d2de3fd00b6fbb0c5166c |

```text
r2-task54-step2-run1.log
14:14  up 4 days,  5:22, 7 users, load averages: 1.80 2.05 1.91
 0 pass
 1 filtered out
 1 fail
 5 expect() calls
Ran 1 test across 1 file. [5.71s]
r2-task54-step4-run1.log
14:17  up 4 days,  5:26, 7 users, load averages: 2.18 1.75 1.78
```

The Step 4 load guard started no test and asked the Founder to quiet the host. No rerun of an unchanged failed test is involved in this wait.

Founder answer to the Task 54 load hold, verbatim:

> Host quieted as far as I can. Visible apps: Finder, cmux, Antigravity, Claude. Hermes processes: 0. Load averages: 1.95 2.13 2.02. Host ready.

The immediate reading had risen to 2.12, so run2 also started no test. The received readiness answer remained the answer to this hold while the session waited for a fresh reading below 2.0. A later reading was 1.76, and run3's immediate reading was 1.62. No cutoff was waived.

| Command / step | Exit | Log | SHA-256 |
| --- | ---: | --- | --- |
| Task 54 Step 4 load precheck; no test started | 88 | r2-task54-step4-run2.log | af1de748c3343bdf2176ffa1414abad416381ab184ec7ba3b2ab4343ad25b299 |
| Task 54 Step 4 all four files, no filter | 0 | r2-task54-step4-run3.log | e25c8acbe2339b033c5ed6bf18c00df4c9bc4c52a87993a5adc54fd25477c39e |
| Task 54 strengthened-census bunx tsc --noEmit | 0 | r2-task54-cohort-typecheck-run1.log | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |

```text
r2-task54-step4-run2.log
14:29  up 4 days,  5:38, 7 users, load averages: 2.12 2.16 2.04
r2-task54-step4-run3.log
14:30  up 4 days,  5:39, 7 users, load averages: 1.62 2.02 1.99
 8 pass
 0 fail
 73 expect() calls
Ran 8 tests across 4 files. [7.23s]
```

That passing run proved real SQLITE_READONLY and ledger_write_failed for both ledger cases, a durable identity_mismatch after the child's drift marker, authentication_expired after the child's auth marker, refusal of resume, new session/envelope recovery, both startup failures, and a zero-residual census of the fixtures recorded to that point. It also showed Bun ran cleanup-residuals.test.ts first despite the command's argument order.

Before treating that census as final, the new census test was strengthened to own a bounded cohort of setsid, wedged-host, malformed-frame, output-gap, ledger, auth and identity fixtures, plus all four child-supervisor exit modes. It then checks the cumulative resource census, including a governed grandchild. This avoids relying on test-file discovery order. Its own new enclosing test timeout became 30 seconds for the cohort; every normative per-scenario deadline remains 5000 ms, with exact 500 ms kill-initiation upper bounds and Addendum 1's 249 ms lower bounds where applicable. No existing test timeout or assertion changed. The eight required names and count remain unchanged. Typecheck passed after this strengthening. A fresh pre-run reading of 3.10 2.34 2.11 caused another quiet-host request; the strengthened tests have not run yet.

### Strengthened GREEN, deliberate break and Step 5

The Founder replied `ready`. The next immediate reading was 1.36 1.52 1.56, and the strengthened four-file check ran without filtering: 8 pass, 0 fail, 98 expect calls. Each of ledger-failure.test.ts, attestation-drift.test.ts, auth-expiry.test.ts and cleanup-residuals.test.ts holds exactly two passing named tests. Its owned-cohort census covered 13 recorded runs, 26 hosts, 25 children and 68 distinct anonymous descriptor identities; every live/open count was zero.

The deliberate break changed only the injected PRAGMA from query_only ON to OFF, allowing the append to succeed. The full harness diff was shown before the complete unfiltered ledger-failure.test.ts run. Both named tests failed, 0 pass and 2 fail. Failing assertions, verbatim:

```text
32 |     expect(snapshot.phase).toBe("closed");
error: expect(received).toBe(expected)

Expected: "closed"
Received: "active"

49 |     expect(harness.fixtureFaultReport(session).publicationError).toBe("ledger_write_failed");
error: expect(received).toBe(expected)

Expected: "ledger_write_failed"
Received: null
```

The PRAGMA was restored before gates. Restored SHA-256 values matched the pre-break files:

| File | SHA-256 |
| --- | --- |
| runtime-harness.ts | 74515ab0a1bb8ee6cc8a615fc03bc3ee519ffed871e24d84324beecd2759b675 |
| adversarial/ledger-failure.test.ts | ccb122f27206ab2f2f46d4e9c746ceac53cb76378e111a6734402c108788a42c |
| adversarial/attestation-drift.test.ts | 3ef846a0819e59a17f2d0afe1598e6b2987432bff8f2dc5b212a7d8f19fb714b |
| adversarial/auth-expiry.test.ts | e73e49d495ab51e4ac7b3ef54fc95212989db0798f34af596cfbfb087b828d18 |
| adversarial/cleanup-residuals.test.ts | f7584d63b1ef10d66565a82c9851ae534a4f3236a815d5b548f6426ae60dd82f |

| Command / step | Exit | Log | SHA-256 |
| --- | ---: | --- | --- |
| Task 54 Step 4 all four files, no filter | 0 | r2-task54-step4-run4.log | 7a0b3d8df7acfafcbc12b06ec7485d2c7557285034b766fffc9b8723234fad90 |
| Task 54 break: bun test test/phase3a/adversarial/ledger-failure.test.ts | 1 | r2-task54-break-run1.log | 03f5411785f7a7df4e63f4ab65bc34952fd4386dc11c84d738488be3c9a44640 |
| Task 54 Step 5 bunx tsc --noEmit | 0 | r2-task54-step5-typecheck-run1.log | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |
| Task 54 Step 5 bare bun test | 0 | r2-task54-step5-full-run1.log | 12a78db71cac745680c091d085e19632ebbf2c8fa6de29bc72659d470c4ca8e0 |

The full runtime check immediately before the bare suite matched every pinned value. No runtime or host setting changed. Summary and uptime lines:

```text
r2-task54-step4-run4.log
14:57  up 4 days,  6:06, 8 users, load averages: 1.36 1.52 1.56
 8 pass
 0 fail
 98 expect() calls
Ran 8 tests across 4 files. [12.03s]
r2-task54-break-run1.log
14:58  up 4 days,  6:07, 8 users, load averages: 1.27 1.48 1.54
 0 pass
 2 fail
 6 expect() calls
Ran 2 tests across 1 file. [6.01s]
r2-task54-step5-full-run1.log
14:59  up 4 days,  6:08, 8 users, load averages: 1.95 1.65 1.60
 1856 pass
 0 fail
 18079 expect() calls
Ran 1856 tests across 135 files. [196.22s]
```

During the load hold the Founder separately requested a hash-only check of `/Users/michaeldaley/tier2-136/FOUNDER-ACT-20261029-BR-PLANNER-READINESS-signed.txt`. shasum confirmed `0c8efcd9ea746966437a997595253b7f8d89360fb0128cc962570ec9ed381f65`. This read of a specifically supplied file was explicitly requested; its contents were not read or used as M23/M24 authority.

No failed Task 54 GREEN run required self-fixing. The census strengthening above answered observed file order and retained all required assertions. All Task 54 runs used require_escalated. The corrected liveness helpers remain unchanged. There is no conditional fixture-adapters.ts or production-path change. No break is committed. Observed timings from the restored full suite follow, copied from its full-output log:

```text
second_surface_failure final_death_ms=739.6315409999806
census_fault {"detectedMs":255.71812499998487,"deathMs":282.3183330000029,"escalation":{"reason":"pty_host_failure","state":"S3","escalated":true,"closeStdinCalled":true,"sessionInterruptionRequired":true,"pgidKillAttempted":true,"hostKillAttempted":true,"unnecessaryHostExitConfirmed":false,"killOrder":["pgid","host"],"observedMs":{"terminateSentMs":0.01770799999940209,"ackWindowEndedMs":249.1380000000063,"stdinClosedMs":249.16304200000013,"classifiedMs":249.20454200002132,"pgidKillAttemptedMs":249.27158300002338,"hostKillAttemptedMs":249.28804200000013,"escalatedMs":249.29283300001407}},"terminateAcks":0,"terminationStarted":false,"errorName":null,"sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":false,"reportedModel":null}
census_fault {"detectedMs":2.3838329999998678,"deathMs":25.977582999999868,"escalation":null,"terminateAcks":1,"terminationStarted":true,"errorName":"MalformedFrameError","sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":false,"reportedModel":null}
census_fault {"detectedMs":2.344167000002926,"deathMs":25.289125000010245,"escalation":null,"terminateAcks":1,"terminationStarted":true,"errorName":"SequenceInvariantError","sequenceKind":"gap","publicationError":null,"sqliteCode":null,"authExpired":false,"reportedModel":null}
census_fault {"detectedMs":2.569374999991851,"deathMs":25.956832999974722,"escalation":null,"terminateAcks":1,"terminationStarted":true,"errorName":null,"sequenceKind":null,"publicationError":"ledger_write_failed","sqliteCode":"SQLITE_READONLY","authExpired":false,"reportedModel":null}
census_fault {"detectedMs":3.1547089999949094,"deathMs":27.997042000002693,"escalation":null,"terminateAcks":1,"terminationStarted":true,"errorName":null,"sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":true,"reportedModel":null}
census_fault {"detectedMs":2.1066249999857973,"deathMs":25.490958000009414,"escalation":null,"terminateAcks":1,"terminationStarted":true,"errorName":null,"sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":false,"reportedModel":"fixture-drifted-model"}
census_supervisor clean final_death_ms=31.66799999997602
census_supervisor SIGTERM final_death_ms=30.80337499998859
census_supervisor crash final_death_ms=16.40420799999265
census_supervisor SIGKILL final_death_ms=25.411499999987427
residual_census final_death_ms=29.15079099999275 {"recordedRuns":52,"recordedHosts":90,"recordedChildren":89,"recordedDescriptors":238,"livePids":[],"liveGroups":[],"openDescriptors":[],"openLedgers":0,"openSessions":0,"liveTokens":0,"swappedBinaryExecuted":false}
attestation_drift {"detectedMs":3.0441249999857973,"deathMs":27.400124999985565,"escalation":null,"terminateAcks":1,"terminationStarted":true,"errorName":null,"sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":false,"reportedModel":"fixture-drifted-model"}
adjacent_rehash final_death_ms=438.09633299999405
auth_expiry {"detectedMs":2.7130409999808762,"deathMs":25.713999999978114,"escalation":null,"terminateAcks":1,"terminationStarted":true,"errorName":null,"sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":true,"reportedModel":null}
auth_expiry {"detectedMs":1.9947920000122394,"deathMs":25.59350000001723,"escalation":null,"terminateAcks":1,"terminationStarted":true,"errorName":null,"sequenceKind":null,"publicationError":null,"sqliteCode":null,"authExpired":true,"reportedModel":null}
ledger_failure {"detectedMs":1.8133749999979045,"deathMs":24.925542000011774,"escalation":null,"terminateAcks":1,"terminationStarted":true,"errorName":null,"sequenceKind":null,"publicationError":"ledger_write_failed","sqliteCode":"SQLITE_READONLY","authExpired":false,"reportedModel":null}
unrecordable_ledger {"detectedMs":0,"deathMs":22.40391599998111,"escalation":null,"terminateAcks":1,"terminationStarted":true,"errorName":null,"sequenceKind":null,"publicationError":"ledger_write_failed","sqliteCode":"SQLITE_READONLY","authExpired":false,"reportedModel":null}
```


## Task 55 — fixture-driven evidence commands

Built on Task 54 commit `8d7a9a7c970d930e6808de4622507163aca70688`, parent `2871fbc5c36db98176593bb4d81d1016da8bbc3e`. This section precedes its own commit; the final report records that commit. Actor-Id for this task is session:codex/m23-m24-r2.

Changed paths: apps/madbridge/src/commands/verify-ledger.ts and export-evidence.ts; test/phase3a/evidence-pipeline.test.ts; test/phase3a/runtime-harness.ts; the four B6 argument lists in test/acceptance/evidence-manifest.test.ts; and this log.

### RED and implementation readings

All five exact Step 1 names were written before any other Task 55 change. The RED filter escaped the period in .madv-runtime and ran exactly one test, with seven filtered out. A valid empty legacy ledger was seeded, so the old default returned success and failed the required missing-session assertion. The failing assertion was:

```text
548 |     expect(result.exitCode).toBe(1);
error: expect(received).toBe(expected)

Expected: 1
Received: 0
```

The runtime check before RED matched every pinned value, including the Bun executable, bunx link, binary SHA-256, version and revision. No settings changed. All Task 55 test commands request require_escalated under the existing Founder approval.

The two commands now share storage-root/session resolution, use the existing pure validator, require --session unless --ledger is explicit, and preserve explicit relative or absolute paths. Default export output is the session's sanitized-evidence directory. Session identifiers use the existing createSessionStorage character and length restriction.

Narrower reading: the plan interface names ledger.db, but the binding transactional build actually writes ledger.sqlite3 at packages/supervisor/src/build.ts:701. Spec section 4.3 and Task 55 require consuming that actual fixture output, and spec section 5.1 pins the directory layout. The commands therefore consume the existing ledger.sqlite3 without changing the storage writer, ledger semantics or any production path beyond the two authorized files. The earlier Task 51 self-fix records this same existing filename.

B6 item 1: only four CLI argument lists changed in evidence-manifest.test.ts, naming the same existing or missing ledger and artifact paths explicitly. Every assertion remains; the missing-ledger case still expects a nonzero exit. The full diff was shown and a four-list-only comparison passed.

B6 item 2: exact-value redaction reuses the pure environment redactor and the registered allowlists. It accesses an exporting-process variable only after its allowlist marks it secret; at this base none is marked. The synthetic marker is passed to generated fixture output through its allowlisted fixture environment. The fixture adapter's own bound client records the observed output as an ordinary message. A read-only ledger check proves the marker arrived before export. The export function receives the synthetic allowlist/environment only through its optional test-only parameter, with no CLI argument. Every exported file is checked for absence, and manifest.json records the exact-value pass and its applied rule. String values are sanitized before JSON serialization, retaining valid JSON for metacharacters. No real credential variable was read or printed.

The harness change is required fixture evidence wiring under B3 and Addendum 7; it adds no returned publishing function, broker or ledger. The Task 54 ledger-fault message construction is reused without changing fault behavior. The corrected liveness helper is byte-identical to Task 54 HEAD; the three earlier adversarial files remain unchanged in this task.

Step 6 inspection: neither command imports a start, host, runtime constructor or fixture harness. The shared environment module imports only a protocol type and defines pure allowlist/redaction functions; no runtime is instantiated by this import. B4's conditional broker fix and fixture-adapters.ts remain unused.

### Self-fix, GREEN and deliberate break

The supplementary Step 3 typecheck found four new test-context errors: three calls omitted runCli's required second argument, and the fourth context omitted stdin. The log contains TS2554 at evidence-pipeline.test.ts:489, :499 and :532, and TS2345 at :547. The numeric exit receipt was not retained across context compaction; its failure diagnostics and full log were preserved. Under DEC-20261023-01 B4, the four new calls now supply stdin and cwd. This does not change the RED's old-default failure cause. Verification restarted with the corrected typecheck, which exited 0.

Step 4 ran both changed test files in full: evidence-pipeline.test.ts has 8 pass and 0 fail, comprising its three earlier tests and five added names; evidence-manifest.test.ts has 9 pass and 0 fail. No assertion was removed.

The deliberate break omitted applying the test-only exact-value redactor's returned text. The complete export-evidence.ts diff was shown before an unfiltered full evidence-pipeline.test.ts run. Exactly "exported evidence contains no allowlisted secret value" failed; seven tests passed. Its assertion failed at evidence-pipeline.test.ts:522:

```text
expect(readFileSync(join(output.outputDir, file), "utf8")).not.toContain(marker)
error: expect(received).not.toContain(expected)
```

The synthetic marker remained in ledger-sanitized.json. Its value is omitted from this build log; the unchanged full-output log contains only fixture evidence. The break was restored before gates. Restored SHA-256 values match the pre-break files:

| File | SHA-256 |
| --- | --- |
| apps/madbridge/src/commands/export-evidence.ts | ea07d8954693b56d052bfe74a0023c60572c256e3628b5502f4d60a88849f071 |
| apps/madbridge/src/commands/verify-ledger.ts | 5c9e3e9eb008fbc7f7e11510c95c9487127136a3a633a652ed3fb157d27b7731 |
| test/phase3a/runtime-harness.ts | 534246a73de52247a4ce020bb7624f7dcd100f3952667022c748fbfcfee52add |
| test/phase3a/evidence-pipeline.test.ts | 300fc49f0f2b9f8f6db3d872efd132824e26e3b58530625d1b18cd37493d1cff |
| test/acceptance/evidence-manifest.test.ts | 0ffd1041994ac2c7a08fd1f26d62cec15e8f97c8855c54d92b56349da11aac32 |

### Commands and full-output logs

Logs are relative to /Users/michaeldaley/builds/m23-m24-r1-pr/logs/.

| Command / step | Exit | Log | SHA-256 |
| --- | ---: | --- | --- |
| Task 55 RED: bun test test/phase3a/evidence-pipeline.test.ts -t 'verify-ledger no longer defaults to \.madv-runtime' | 1 | r2-task55-step2-run1.log | 63067b7f55c308b9a41e73ba83eefda344421405b68949277f0067e43c39428e |
| Supplementary Step 3 bunx tsc --noEmit | failed; numeric receipt unavailable | r2-task55-step3-typecheck-run1.log | fbe0244235a1b1e769e70b2df88443d7eae275d189405843f0fba0adb330ad04 |
| Corrected Step 3 bunx tsc --noEmit | 0 | r2-task55-step3-typecheck-run2.log | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |
| Step 4 bun test test/phase3a/evidence-pipeline.test.ts | 0 | r2-task55-step4-evidence-run1.log | 20d4359221b5410a7c2e149e887a27143ca9f2d4ed06ce7543030cc64da87545 |
| Step 4 bun test test/acceptance/evidence-manifest.test.ts | 0 | r2-task55-step4-acceptance-run1.log | 0205dfca64081f59f221316a5994fdaf34839f2621bfb35f058601653b4ff289 |
| Deliberate break: bun test test/phase3a/evidence-pipeline.test.ts | 1 | r2-task55-break-run1.log | dc9d0d1a3da17b862fd347c76b4656ee546986d4497d24a3b2f6306edae3699b |
| Restored Step 5 bunx tsc --noEmit | 0 | r2-task55-step5-typecheck-run1.log | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |

The full-suite load hold began at first load 3.17. The Founder answered, verbatim:

> Host quieted as far as I can. Visible apps: Finder, cmux, Antigravity, Claude. Hermes processes: 0. Load averages: 1.95 2.02 1.86. Host ready.

The next reading was 1.82. The first full-suite command stopped before any test because its extra guard incorrectly required bunx's symlink target to be the relative word bun. The actual link points to /Users/michaeldaley/.bun/bin/bun, the required executable, and all runtime values matched. This was the session's command-guard error, not a runtime difference or a failed test. The guard was corrected to accept that observed absolute target; no setting changed. The next unique log preserved the complete matched runtime check, an immediate 1.79 load reading, and the bare test run.

| Command / step | Exit | Log | SHA-256 |
| --- | ---: | --- | --- |
| Step 5 extra symlink guard; no test started | 91 | r2-task55-step5-full-run1.log | 6d5f77e9c789660b0b03388c68805d18978cf4bf8d79928af243be1c89b3c6a3 |
| Step 5 pinned runtime check and bare bun test | 0 | r2-task55-step5-full-run2.log | 35439cda1b745a5c8721246c7a1de4cb5d3124d832bd5f10ade23d3dc263a1ca |

Uptime and summary lines, copied from the complete logs:

```text
r2-task55-step2-run1.log
15:05  up 4 days,  6:14, 8 users, load averages: 1.28 1.57 1.58
 0 pass
 7 filtered out
 1 fail
 1 expect() calls
Ran 1 test across 1 file. [32.00ms]
r2-task55-step4-evidence-run1.log
15:12  up 4 days,  6:21, 8 users, load averages: 4.07 2.24 1.80
 8 pass
 0 fail
 685 expect() calls
Ran 8 tests across 1 file. [1.99s]
r2-task55-step4-acceptance-run1.log
15:12  up 4 days,  6:21, 8 users, load averages: 3.52 2.19 1.79
 9 pass
 0 fail
 36 expect() calls
Ran 9 tests across 1 file. [45.00ms]
r2-task55-break-run1.log
15:13  up 4 days,  6:22, 8 users, load averages: 3.17 2.20 1.80
 7 pass
 1 fail
 682 expect() calls
Ran 8 tests across 1 file. [1.93s]
r2-task55-step5-full-run2.log
15:29  up 4 days,  6:38, 8 users, load averages: 1.79 1.96 1.84
 1861 pass
 0 fail
 18107 expect() calls
Ran 1861 tests across 135 files. [195.51s]
```

The evidence/acceptance file checks above are not bare or adversarial-suite runs; the 2.0 cutoff does not apply to those particular file commands. Their uptime is retained. The full suite ran only after the required answer and fresh below-cutoff reading. No unchanged failed test was rerun to obtain a pass.

Result: five added named tests, eight passing in the evidence file including all three earlier tests, nine passing in the authorized acceptance file, a causally failing deliberate break with exact restoration hashes, required typecheck exit 0 and bare suite 1861 pass/0 fail. The extra precheck and lost supplementary numeric receipt are disclosed above. No B9 halt occurred during Task 55. No break is committed. The final ordered gates follow this task's commit and are recorded in the PR description and final report; the five-commit limit precludes appending a sixth committed log section for them.

Pre-commit checks: git diff --check and git diff --cached --check exited 0 after removing one trailing blank line in this documentation section. Explicit-path staging contains only the six Task 55 paths. The staged credential-shape scan and exact-path check passed. The commit message is checked for 72-character lines and exactly the three final attribution trailers before git commit -F -. No hook output has been supplied.

## Correction round 1

Performed by session:codex/m23-m24-r3, role builder, execution surface codex, under DEC-20261028-02 B8 and B12 and builder Addendum 8. Parent: 03b31247374cba31fc70f5fa64e018b1b62ec651. This section cannot contain its own commit SHA; the final report and pr-body-r2.md record it and the ordered gates at that exact head after this commit. No earlier commit is amended.

### Authority, identity and preconditions

Addendum 8: /Users/michaeldaley/builds/m23-m24-r1-pr/prompt-r3/builder-addendum-m23-m24-8-correction-r1.md, SHA-256 b882d84e060411b3aefa16613a5d023f7696739fdbc5e8d972b75be131ccd45f. The main prompt and all eight addenda were read. Authority document hashes all match the prompt. DEC-20261028-02 is 0eedf3e448fd999694a082267fbf5990083ad00afbe6dfb91ec9e823b5f26c82. No review report or GitHub page was read; the FAIL and three substantive findings are the Founder's report in Addendum 8 item 4, not an independent finding or verdict issued by this builder.

Harness Codex; shown model GPT-6, exact served variant not shown. Filesystem sandbox unrestricted, danger-full-access; approval policy not shown. No hook output supplied. Agent-start tools and their role names were reported in the session; no agent, subagent, external reviewer or helper agent was started. Addendum 3's waiver controls the conflicting host instructions to use reviewer agents. Prior-session memory context was supplied and consulted during discovery before the prompt files were located and read; this is a deviation, not correction authority. The Founder later directed no further prior-session memory use; none was read after that instruction.

Working directory /Users/michaeldaley/builds/madventures-tui-m23-m24-r1, branch build/m23-m24-r1, initially clean at the parent above. git fetch origin main build/m23-m24-r1 exited 0. Fetched origin/main is exactly 189c2c12fb0147909f0b8fdc550affca92e70156 and origin/build/m23-m24-r1 is exactly the parent. The runtime check matched command paths /Users/michaeldaley/.bun/bin/bun and bunx; bunx resolves by symlink to that same Bun; version 1.4.2; revision 744846f844374847c902b5e7fd59b4342a51ef99; executable SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. No runtime or host setting changed. Every Bun command puts that directory first on PATH within its own shell.

The Founder supplied the host report and unrestricted-test approval verbatim:

> Visible apps: Finder, cmux, Claude, Google Chrome, Messages, ChatGPT, Antigravity, Hermes. Hermes processes: 3. Load averages: 3.54 3.21 2.61. I approve running this build's test commands outside the sandbox for the rest of this session, as under Addendum 5. From here on use no memory of earlier sessions, and record under Deviations that prior-session memory was consulted during discovery before the prompt files were read.

No test or correction edit ran while that host condition was pending. The session paused under DEC-20261028-01 B5 because Hermes was reported running, and under the host-readiness requirement. The current uptime was 8:34, load averages 3.10 3.14 2.60. The Founder then supplied, verbatim:

> Hermes stopped and host quieted as far as I can. Visible apps: Finder, cmux, Claude, Google Chrome, Messages, ChatGPT, Antigravity. Hermes processes: 0. Load averages: 1.77 2.34 2.43. Host ready

All correction tests run in the current unrestricted environment under that approval. No process listing, credential access or GitHub API call was made. Dependency installation exited 0 with no dependency changes. It changed only the executable bit of packages/founder-act/src/main.ts; the prompt-authorized restore to 100644 was performed, with zero content change. The tree was clean again before baseline testing. bun.lock stays byte-identical at 34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0.

### Files and corrections

- test/phase3a/adversarial/wedged-host.test.ts: the exact required SIGSTOP test now includes the existing governed grandchild and asserts its death before teardown. A separate host-death calibration proves that this member survives host death alone. Every original timing assertion remains. An AggregateError preserves the containment assertion alongside any cleanup error, rather than allowing teardown to mask it.
- test/phase3a/runtime-harness.ts: record the durable session identity, phase and token state from read-only SQLite replay before storage deletion, and refresh from any ledger still on disk. The census counts these records and exposes copied durableSessions. Child-supervisor disposal checks recorded groups as well as PIDs and completes crash/SIGKILL prefixes through the existing production next-start reconciliation before deleting their evidence; ordinary close does not reconcile away a missing founderClose. Synthetic fixture output is published internally with nested property keys as well as values for the key-redaction tests. No publication authority is returned to tests.
- test/phase3a/adversarial/cleanup-residuals.test.ts: add a check that a deleted session leaves durable closed/invalidated evidence; preserve the original all-zero resource assertions.
- apps/madbridge/src/commands/export-evidence.ts: recursively apply the existing known-pattern and exact-value passes to strings in object keys, values and arrays, then serialize valid JSON. This is the only lasting production change in this correction.
- test/phase3a/evidence-pipeline.test.ts: add exact-allowlisted and known-pattern key cases, including nested arrays, nested keys and escaped characters, checking fixture-produced raw input, every exported file, parsed output and manifest rules. docs/verification/m23-m24-build-log.md appends this record. No conditional fixture-adapters.ts change is needed.

### RED, breaks, restoration and counts

The first PGID log was prematurely named RED: it is a passing one-test calibration, proving the existing grandchild survives host death. It is retained as such, not claimed as a failed regression test. Because production's direct PGID path is already correct and the defect is missing causal coverage, the required containment RED uses the prescribed S3-only skip at the binding parent with the strengthened test. Exactly one test failed. Teardown initially masked the assertion with FixtureContainmentIncomplete and a lifecycle error; the test-only error aggregation preserves both failures. This is the only self-fix of the correction tests and it weakens no assertion.

The complete six-test wedged-host file then passed. The deliberate break skipped both process.kill(-pgid, SIGKILL) and handle.killPgid only in S3, leaving every other state unchanged; the complete diff was shown before the run. The unfiltered file showed 5 pass, 1 fail, including this assertion:

```text
error: the recorded governed descendant must be gone within the outer bound
Expected: false
Received: true
```

The broker file was restored byte-for-byte to SHA-256 9ba986edb28133e2f7a177f95280b2088b8bd5051e80ba58794dc0555a5a8bb7; the corrected test is fe46ed9c7277e0b3e2e52083f93deb06497931bbb39b7968fd811d1b6823b0a9. No broker change is committed. In the healthy corrected run the first S3 case reported detectedMs 255.06633299999993, deathMs 281.033083, ackWindowEndedMs 249.38158300000003, pgidKillAttemptedMs 249.89749999999998 and hostKillAttemptedMs 249.92566700000003. The independent calibration reported host_dead_ms 106.17904099999998 and descendant_alive true.

The census RED selected exactly one test and failed because durableSessions was undefined after deletion. With the correction, the complete file passed 3 tests. The deliberate break added the retainStorage condition to founderClose, omitting it for non-retained sessions, and its full diff was shown. The unfiltered file showed 1 pass, 2 fail. Durable evidence was active/valid instead of closed/invalidated, and the original residual assertion failed:

```text
expect(data.openSessions).toBe(0)
Expected: 0
Received: 3
```

The printed census also had liveTokens 3 while PIDs, groups, descriptors and ledgers were all zero. This demonstrates the durable residual cannot be hidden by deleting storage or setting the harness closed flag. Restored harness SHA-256 at this point was ad6455f30c5f798023008f88fd1e12c768d4bec06d9f75a8fc01b43831022995; cleanup-residuals.test.ts is 3b3112f316f63ab1b98029c2d7ea953b6dd18125c3417278611e411b26d0aec7. The later authorized synthetic-key fixture change makes the final harness hash 738f228ba4ad27dfdd3bffe291912e070c998833d9be43f00c4a384a5b91f1c8.

Each key-redaction RED selected exactly one new test while export-evidence.ts was still byte-identical to the parent. The exact-value case failed the parsed payload comparison because nested keys retained the escaped synthetic marker; the pattern case failed the exported-file absence assertion. After the recursive correction, all 10 evidence-file tests passed, including all 8 earlier tests. The deliberate break removed only key sanitization, leaving value sanitization intact; the full diff was shown. The unfiltered file showed 7 pass, 3 fail: the earlier exact-value test and both new nested-key tests. Assertions were expect(text).not.toContain(marker) and the expected redacted-key payload equality. All leaked values in these controlled logs are synthetic fixture data authorized by the prompt, not real credentials. The production file was restored to a9e0540d90a5a42233b98a36e8aaee41d895597d1b2b42d9e47376dd27eda2f2; evidence-pipeline.test.ts is 7c7ee8acbbbd97c72c3d74372f2d4909640efa06bb7921d2a68622ce9a8905a2.

### Commands and full-output logs

All logs below are new files under /Users/michaeldaley/builds/m23-m24-r1-pr/logs/. Exit receipts were captured from the command side of tee. Every test run records uptime first. Adversarial file runs also guarded the 2.0 load threshold. The evidence-file break's first load was 2.12; the cutoff governs bare and adversarial runs, not that focused evidence file. No failed run was retried unchanged to obtain a pass.

| Command or step | Exit | Result | Log | SHA-256 |
| --- | ---: | --- | --- | --- |
| bun install --frozen-lockfile | 0 | no dependency changes | r3-pre-install-run1.log | 8cfcc25e41f6768800f6a6186a2a56739c35fc9c806b0c17b59f822545846b2e |
| baseline bunx tsc --noEmit | 0 | clean | r3-pre-typecheck-run1.log | 77fa2145977817e2c92da0fb7409b6d116bd89721859bab65675fe333a6e9eb6 |
| baseline bun test test/phase3a | 0 | 127 pass, 0 fail, 2447 expects, 17 files | r3-pre-phase3a-run1.log | ac89329727f5bbf4cfac03421a4c2b5dd85f2be78fbab7e98960c6f7c419782a |
| host-death calibration, one test | 0 | 1 pass, 0 fail; not RED | r3-pgid-red-run1.log | f9c0e2492b7041147ab6ac43b1ea452d84ca39517798c005b46610bb59c22150 |
| S3 PGID-skip RED, exact required test | 1 | 0 pass, 1 fail | r3-pgid-red-s3-skip-run1.log | a61ec70e807bc82ccebc35364cf3a5bf84c4702cf4e0c3965f661b0dce6ceab3 |
| bun test test/phase3a/adversarial/wedged-host.test.ts | 0 | 6 pass, 0 fail | r3-pgid-green-run1.log | 22363a1e21e877332de3acb4c55b953e158fa946979f83fce67ccb39b0641f11 |
| S3 PGID-skip break, unfiltered wedged-host file | 1 | 5 pass, 1 fail | r3-pgid-break-s3-skip-run1.log | 959efbf5afcd326f28ef6b83aeb441d0d2b73e3eb06b8f8917cbf654ba93c35b |
| durable census RED, one new test | 1 | 0 pass, 1 fail | r3-census-red-run1.log | ac051d10c1f2e7b614c166a7bf5532a5e8a623d281b457763ec1ff8f6dc4d915 |
| census bunx tsc --noEmit | 0 | clean | r3-census-typecheck-run1.log | 1fb3e4c19bf619916a13848374462c3895674d76c932656e1f1f8fff4a0ad7c7 |
| bun test test/phase3a/adversarial/cleanup-residuals.test.ts | 0 | 3 pass, 0 fail | r3-census-green-run1.log | 8b6b3f9b3368824c4ccc2959b1d8dab9ccb53c24b129ca292be03b7853d5e500 |
| founderClose-skip break, unfiltered cleanup-residuals file | 1 | 1 pass, 2 fail | r3-census-break-founder-close-run1.log | 339d77820e0dd25bcb8175bfecf690ef8701a25b8da707a3c26256695b0cdc2a |
| exact-key RED, one new test | 1 | 0 pass, 1 fail | r3-exact-key-red-run1.log | affab5e9df3dc8f4938278c1dfa5aab0273d9348b0d60912893c3b25b71ecb50 |
| pattern-key RED, one new test | 1 | 0 pass, 1 fail | r3-pattern-key-red-run1.log | 95a8fe4f18567821223850a3620e76f65e597a4cc800b83cbe291747576d5912 |
| bun test test/phase3a/evidence-pipeline.test.ts | 0 | 10 pass, 0 fail | r3-key-redaction-green-run1.log | 90c15a7a1c302ceb39848f6e2f03443773b7f34c268664f65d9de6461e25b685 |
| key-sanitization removal, unfiltered evidence file | 1 | 7 pass, 3 fail | r3-key-redaction-break-run1.log | 50e9430e134a3b4ced5df1b7c6b680366f139909f473a79942553fa37a772a0c |
| restored pre-commit bunx tsc --noEmit | 0 | clean | r3-precommit-typecheck-run1.log | e89baf31b7495feb3d90408a08fc993b492b928336a1dc4894e623a595cf0188 |

### Deviations, held items and final-head handoff

Prior-session memory was consulted during discovery before the prompt files were read, as directed to be recorded by the Founder. Other discovery reads included the Founder's local governance rules, RTK instructions and filename searches outside the clone before the packet was found. No prior-session memory was used after the Founder's explicit instruction above. The passing calibration was misnamed RED and is retained honestly; the actual coverage RED uses the prescribed S3 fault because the production path already works. The first mutant failure's teardown masked its assertion; preserving both errors fixed the test reporting, and the subsequent unfiltered break displays the required assertion. No other self-fix occurred. Child-supervisor fixture disposal now completes its deliberately unclean durable prefixes through existing next-start reconciliation so their deletion cannot conceal open sessions or valid tokens; normal close still exposes the prescribed founderClose omission. These are test-harness changes only, within B3. No corrected signal-0 helper was changed.

The three advisory findings remain unchanged: a silent but running host; manifest_hash not covering redaction_rules_applied; and the earlier build log's lost exit-code receipt. Nothing in an earlier log is rewritten. No new dependency, fixture-adapters.ts change, production containment change, gate change, governance change, push or other GitHub operation occurred.

The Hermes/readiness hold above is a prerequisite pause under DEC-20261028-01 B5, not a failed test or a waived B9 condition. No correction-stage B9 halt occurred. The final ordered gates will run at the correction commit, with full logs, uptimes, exact hashes and observed timings recorded in pr-body-r2.md and the final report. This keeps the correction to one commit without claiming a self-referential commit SHA or post-commit results inside its own committed record.

## Correction round 2

Performed by session:codex/m23-m24-r4, role builder, execution surface codex, under DEC-20261028-02 B8 and B12, builder Addendum 9 and the Founder's subsequent Addendum 10. Parent: c4526065216ac86a0c10c1bbcba13b04e36486de. This section cannot contain its own commit SHA. The commit is the single round-2 correction; no previous commit is amended, rebased, squashed or reordered.

### Authority, identity and preconditions

The ten read-only prompt-r4 packet files were hashed before they were read, and all ten matched the Founder-supplied SHA-256 values. The builder prompt and Addenda 1 through 9 were read in full, in order. Addendum 9 is 9d3920b5ef20dcd61e5768b944ef42b899b29cc2cc6472cf043e2d78a6346a53. Addendum 10 was supplied directly in this session; its verbatim pasted text, encoded as UTF-8 with LF line endings and one terminal LF, hashes to b7dcd8db74013a84c4e5c6ea24c454ae1949126c0b39aa49333df91055ba98f9 via shasum -a 256 on standard input. This is a hash of the recorded text, not an assertion that a separate signed file exists.

The Founder reports and accepts an Antigravity Tier-2 FAIL at the parent: three substantive and two advisory findings, with the prior three findings corrected. That is the reported verdict and authority for this correction, not an independent verdict issued by this builder. Addendum 9 rules that rubric milestone 10 has two correction rounds; a further substantive FAIL requires reassignment. No review report or GitHub page was read.

Harness: Codex; shown model GPT-6, exact served variant not shown. Filesystem access is unrestricted, danger-full-access; network enabled; approval policy not shown. Agent-start tools and every offered role name were reported; no agent, subagent or helper agent was started. No separate hook output was supplied. The harness supplied memory context, but this session used no earlier-session memory and read no memory files. Addendum 3 controls the waived host review-agent instructions.

Working directory /Users/michaeldaley/builds/madventures-tui-m23-m24-r1; branch build/m23-m24-r1; initial tree clean at the parent. git fetch origin main build/m23-m24-r1 exited 0; origin/main is 189c2c12fb0147909f0b8fdc550affca92e70156 and origin/build/m23-m24-r1 equals the parent. All eight AUTHORITY hashes matched origin/main; the six acts are ISSUED and carry Michael Daley's signature. The specified plan sections and in-clone source were read before correction edits. No graph/MCP service was used because the builder prompt explicitly prohibits it.

Host: Darwin 27.0.0 arm64; user michaeldaley. All runtime checks matched /Users/michaeldaley/.bun/bin/bun and bunx, with bunx a symbolic link to that same Bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99, executable SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. Every Bun command prepends that directory to PATH in its own shell. No host runtime, profile or setting changed.

The Founder supplied precondition 5 verbatim:

> Visible apps: Finder, cmux, Claude, Antigravity, Perplexity, Google Chrome, Serato DJ Pro, Messages. Hermes processes: 0. Load averages: 1.06 1.08 1.14.

The Founder approved the session's test execution verbatim:

> I approve running this build test commands outside the sandbox for the rest of this session.

All test commands ran in the unrestricted environment under that approval. Uptime was recorded before every run. Addendum 9 replaces the earlier load gate: no pause for load, and no unchanged rerun of a timing failure at first load 2.0 or more. No such timing assertion failed. The prescribed successful baseline had 131 passing tests, 0 failures and 2483 assertions across 17 files; tsc and installation exited 0. Installation changed only the allowed executable mode of packages/founder-act/src/main.ts; it was restored to 100644 with no content change. bun.lock stayed byte-identical at 34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0.

### Changes and test reach

apps/madbridge/src/commands/export-evidence.ts is the sole lasting production change. Exact-value redaction runs on the original string before known patterns can consume a prefix, for keys and values at every nesting level. Colliding sanitized keys receive deterministic numeric suffixes until unique, preserving every value even when an input key already uses a generated-looking suffix. Rule labels are added when the passes actually execute rather than unconditionally claiming rules on an empty event set. Registered production allowlists remain the only production source of exact values.

test/phase3a/evidence-pipeline.test.ts adds the token-prefixed synthetic marker in both keys and values, asserting absence of the full marker and its formerly leaked suffix in every output file, parseable JSON, the exact nested redacted payload, and only the available secret rule. A missing synthetic allowlist variable contributes no rule. A collision case checks all four values, valid parsed output, no marker, and identical bytes on repeated export. Four CLI cases prove each command rejects a relative invalid storage root and an inconsistent synthetic HOME, returns exit 1 with its error, creates no requested export and leaves the entire fixture storage file listing unchanged. Each uses an explicit existing fixture ledger so deleting validation reaches a valid ledger rather than merely failing ledger lookup. All ten prior evidence tests stay, for a total of 16.

test/phase3a/adversarial/supervisor-entry.ts writes a fixed witness only from the actual SIGTERM handler, before graceful close. runtime-harness.ts returns the captured synthetic child-supervisor stderr without returning publication authority. supervisor-death.test.ts requires that witness for SIGTERM and empty stderr for clean mode; crash requires the uncaught synthetic exception diagnostic and stack plus an active durable prefix with no session_closing. The six existing scenario names and all earlier containment assertions remain.

runtime-harness.ts reuses the existing non-detached grandchild fixture for lifeline-eof and records its PID before scheduling EOF. process-group.test.ts requires the extra member alive before EOF and gone afterward, with the existing peer group still alive, and explicitly checks the printed monotonic death duration against 5000 ms. No signal-0 liveness helper was changed. The added collision fixture payload is plain, string-valued synthetic JSON validated with the existing closed options parser; it traverses fixture stdout and the harness-internal bound publication client. No publisher, broker or ledger handle is returned to a test. fixture-adapters.ts does not change.

### RED checks, self-fixes and narrower readings

The prefix RED fails on the leaked _FIXTURE_SUFFIX. Collision RED run 1 failed for InvalidHarnessOptions because the new fixture payload option was absent from the closed options parser; this is preserved as a setup error, not claimed as the required RED. The parser was updated to admit and validate only the test's synthetic string payload. Collision RED run 2 then failed for the required 4-versus-3 key count before the exporter changed.

SIGTERM RED fails because the original handler produces no signal-specific witness. The crash and storage behaviors already exist in production; their defects are missing causal tests. Their REDs therefore use exactly the review substitutions at the binding parent with the new tests: graceful close plus exit(1), and omission of all HOME/storage validation. Each filtered RED ran exactly one test and failed for the named reason. The affected files were restored immediately with SHA-256 checks. This narrower causal-coverage reading follows Addendum 9 items 7b, 7c and 8 and the preceding correction's treatment of already-correct production containment.

The lifeline RED fails because the original scenario records zero independent members. The new full evidence run initially failed four assertions expecting the export directory not to exist; transactional fixture storage already creates that directory. The tests were corrected to name a fresh rejected-export child path and keep the before/after recursive storage listing assertion. This changes only the test setup, preserving the required no-export claim. The changed file then passed all 16 tests; supervisor-death passed 6 and process-group passed 5 before the later explicit death-bound assertion. No failed run was rerun unchanged to obtain a pass.

### Review mutations and restorations

Each mutation diff was shown before its run. Every item-8 break ran its affected test file unfiltered and full; its source was then restored and the SHA-256 confirmed. S3-only and all-state omission skip both the direct PGID syscall and handle.killPgid, leaving the rest of production unchanged. Both fail on the independent recorded descendant remaining alive, with the existing AggregateError preserving teardown failures. The all-state variant also fails calibration teardown.

Skipping founderClose for non-retained sessions fails both durable residual tests: phase/token remain active/valid, and openSessions and liveTokens are 3 despite no live PIDs, groups, descriptors or open ledger handles. Removing key sanitization fails five evidence tests. Substituting clean for SIGTERM fails the signal witness; substituting graceful close plus exit(1) for crash fails the uncaught diagnostic. Removing all storage/HOME checks fails all four CLI rejection tests with Expected: 1, Received: 0. Restoring known-pattern-first order fails the prefix probe on the leaked suffix. Removing collision suffixing fails Expected length: 4, Received length: 3.

### Halt and Addendum 10 disposition

At Addendum 9 item 8, the killGroup-only leader-signal mutation unexpectedly passed all five process-group tests with 43 assertions. Log r4-break-lifeline-leader-only-run1.log has SHA-256 f4de488b26c46727ac1b8496da1a27869a40796f2b646579d216e7ddbe8ebc64 and first load 2.48. No timing assertion failed; the deliberate break failed to prove reach. The session halted under DEC-20261028-02 B9 item 1 and the repository's mutation stop condition, restored packages/pty-host/src/signals.ts to c5d2814420dc7d431a28cb7ef03229304daf5896bd50e9630268ba3d637fa90e, made no commit, and left the correction tree intact.

The Founder issued Addendum 10, whose text hash is recorded above. It treats the original finding as advisory, retains the independent-member scenario, withdraws the killGroup-only failure requirement, and permits continuation from the collision mutation. No combined or additional lifeline mutation was run.

VERIFIED by source inspection: lifeline EOF reaches killGroup. packages/pty-host/src/main.ts:622 calls onLifelineEof without seam overrides; packages/pty-host/src/signals.ts:189 selects the default signal seam, line 87 delegates to killGroup, and lines 193 and 205 request group SIGTERM and SIGKILL. After the child exits, the same EOF branch invokes close with signal:true at main.ts:716. That enters terminateChildGroup at main.ts:360 through the separately supplied seam at lines 365 to 379: SIGTERM uses sigtermProcessGroup at main.ts:178 to 180, and SIGKILL calls process.kill(-pgid, SIGKILL) at line 379. The production entry calls runSteadyState at main.ts:811, whose default signal callback is set at line 520 and passed into makeSessionCloser at line 523. These redundant production paths explain why changing only killGroup is masked. This paragraph is code inspection, not a new runtime trace or mutation claim.

The resumed collision mutation failed the required 4-versus-3 assertion, with 15 passing and 1 failing test. The exporter was restored to aee7ea77660c42b37a662d0300d9c1ae2e1cfb12bd315cd6190f010fa530167e.

### Limitations and scope

Production still redacts no exact environment value until a registered allowlist marks one secret. Existing best-effort known-pattern limitations remain. A silent but running host, manifest_hash not covering redaction_rules_applied, and the earlier build log's lost exit-code receipt remain unchanged under Addendum 8; no old evidence is rewritten. The setsid escape remains explicitly documented and separately cleaned. No production containment, lifecycle, storage validation, gate, governance, dependency, timeout or manifest changes beyond the authorized exporter correction were made. Temporary review mutations are all restored. No host installation, credential access, process listing, GitHub operation, push, live runtime certification, merge or deployment occurred.

### Addendum 11: unknown-source test exclusion and hunk audit

While the session was halted, a test named "lifeline EOF default seams terminate an independent detached group member" appeared at line 86 of test/phase3a/adversarial/process-group.test.ts. This session did not write it. Its source remains unknown; the Founder states that Syncthing does not touch /Users/michaeldaley/builds and that no other session or app was writing this clone. Those statements do not establish this test's source.

Under Addendum 11, stat before removal reported Modified: 2026-10-30 16:33:34 -0400, epoch 1793392414. This is the file's modification time, not proof of the time or author of the unknown insertion. The entire git diff, including the dedicated import hunk and the full test-bearing hunk, was reported before removal.

The named custody artifact /Users/michaeldaley/builds/m23-m24-r1-pr/logs/r4-foreign-test-hunk.patch already existed, with stat Modified: 2026-10-30 17:13:03 -0400, epoch 1793394783. An exclusive-create attempt failed with FileExistsError; its Python process exited 1 while the surrounding shell, which then hashed the existing file, exited 0. No artifact was overwritten. A comparison then verified that this existing artifact is byte-for-byte the full test-bearing git diff hunk, with its git header. It contains the adjacent session-authored changes as part of that mixed hunk; it is not a patch intended to revert those known changes. SHA-256: 6df151d90719f017c312d8131a67552c260140204b2e3fc8c5c4d1f0eb122421.

Only the unknown test block and its two dedicated imports were removed: spawn from node:child_process, and HOST_DEADLINES_MS/onLifelineEof from the signals module. Every adjacent session-authored lifeline assertion remains. The removed test is absent from the candidate tree and no build commit contains it; this was checked by a bounded git log -S over the branch's commits. Its executed 34-test partial final run is retained as superseded evidence, not as a gate for this candidate.

The complete remaining unstaged diff was audited against this session's own apply_patch records and test/mutation logs, not earlier-session memory. Item 2d result: every remaining changed hunk is traced to this session; no further unknown-source hunk remains.

| Path | Session-authored hunks and own record |
| --- | --- |
| apps/madbridge/src/commands/export-evidence.ts | Three hunks: exact-first ordering, unique collision suffixes, and rule recording. The correction patch, REDs and full-file reverse-order/key/collision breaks record each. |
| test/phase3a/runtime-harness.ts | Fixture payload type and closed validation, generated fixture stdout, internal payload publication, the two lifeline descendant branches, and captured stderr type/return. The session's setup patches, lifeline RED and restored mutation receipts trace all hunks. |
| test/phase3a/adversarial/supervisor-death.test.ts | Exit-result type, mode-specific witness/uncaught-error assertions, and durable crash-prefix assertions. The session's first regression patch and SIGTERM/crash substitution logs trace all three. |
| test/phase3a/adversarial/supervisor-entry.ts | SIGTERM-handler witness only, from the session's correction patch and crash-break restoration. |
| test/phase3a/evidence-pipeline.test.ts | Fixture helper extension and six regressions, from the session's regression/setup patches, option-parser self-fix and fresh export-path self-fix; full-file logs preserve all ten prior tests. |
| test/phase3a/adversarial/process-group.test.ts | One hunk: independent-member before/after assertions, captured death duration and explicit 5000 ms assertion. The initial session regression patch and post-Addendum-10 strengthening trace it. |

This session's own lifeline scenario already reuses a non-detached governed descendant whose only termination source in the scenario is group signalling; it asserts that member alive before EOF and gone afterward within the explicit monotonic outer bound, with the peer group still alive. The fixture source gives that descendant no parent-exit cleanup hook or PTY ownership. No foreign default-seam test is needed or retained. Addendum 11 item 3 and Addendum 10 item 2a require no additional RED for this advisory scenario; no new lifeline mutation or RED was run after those rulings.

Addendum 11's verbatim pasted text, UTF-8 with LF line endings and one terminal LF, hashes to 90b5f2e60a484b87683d12116425c7b1a02f4f45f528bdc7e9e625c37b788656 via shasum -a 256 on standard input. Its preserved text follows below; no separate on-disk signed packet is asserted.

### Restarted final gates

The earlier r4-final-tsc-run1 and r4-final-adversarial-run1 sequence is superseded: the latter included the unknown-source test and passed 34, so it cannot attest this 33-test candidate. Addendum 11 requires the final gates from the beginning after removal. No failed test was rerun unchanged. The restarted ordered gates below all passed; no timing assertion failed even when the recorded first load was at least 2.0.

Final tests ran on the working tree over parent c4526065216ac86a0c10c1bbcba13b04e36486de, before this single correction commit, in the order Addendum 11 item 4 then Addendum 9 items 10 to 13 specify. They are not mislabeled as post-commit runs. All six gated source files were SHA-256 checked unchanged afterward, and the commit's contents are checked against these hashes. The only subsequent repository write is this append-only verification record. Three adversarial runs each passed 33 tests, 0 fail, 627 assertions across nine files. Phase 3A passed 137 across 17 files; MadBridge 518 across 15; acceptance 87 across four; bare bun test passed 1871, 0 fail, 18202 assertions across 135 files in 177.23 seconds. The immediate pre-bare runtime check matched every pinned value.

The exact branch path set is the 16 authorized B3 paths. This correction changes the six audited source/test paths plus this build log. The sole conditional path remains the original supervisor-entry.ts, required to run a killable isolated supervisor; neither fixture-adapters.ts nor the conditional broker production fix was used. Both git diff --check and the bounded path/hash/exclusion checks passed.

| Ordered gate | Result | Uptime before run | Log | SHA-256 |
| --- | --- | --- | --- | --- |
| bunx tsc --noEmit | exit 0 |  1:55  up 5 days, 17:04, 12 users, load averages: 2.11 2.33 1.90 | r4-final-add11-tsc-run1.log | 2aab5d80e81cc4bee9d8b1ef9310c51b17d25b79863e9d0f7a6027a7655c2476 |
| bun test test/phase3a/adversarial | 33 pass, 0 fail; 627 assertions |  1:55  up 5 days, 17:04, 12 users, load averages: 2.02 2.31 1.90 | r4-final-add11-adversarial-run1.log | 35e05048e823e326787e8f30994d3695200c12b06e869104bfe88c8cac4e54d3 |
| bun test test/phase3a/adversarial | 33 pass, 0 fail; 627 assertions |  1:56  up 5 days, 17:05, 12 users, load averages: 3.89 2.75 2.07 | r4-final-add11-adversarial-run2.log | a39c3660a10e5364d9ae34883af9f0ec2330b0809b1106961a63ffc7f400d05c |
| bun test test/phase3a/adversarial | 33 pass, 0 fail; 627 assertions |  1:56  up 5 days, 17:05, 12 users, load averages: 5.36 3.23 2.27 | r4-final-add11-adversarial-run3.log | 6080b0d598038f3473618f0ba11522b8ba66d29dc6a799e9091aabc79d2c012a |
| bun test test/phase3a | 137 pass, 0 fail; 2541 assertions |  1:57  up 5 days, 17:06, 12 users, load averages: 6.06 3.63 2.45 | r4-final-add11-phase3a-run1.log | 8df88d2e3bdc211554789da03c4d25b652ffc49a24b13b7de6dbc9eae9508aff |
| bun test apps/madbridge | 518 pass, 0 fail; 2299 assertions |  1:58  up 5 days, 17:07, 12 users, load averages: 7.96 4.79 2.99 | r4-final-add11-madbridge-run1.log | 93d7986fbc54954eb422e30d16c8d584636717a31c10a2374fd7226886a387b4 |
| bun test test/acceptance | 87 pass, 0 fail; 214 assertions |  1:58  up 5 days, 17:07, 12 users, load averages: 7.63 4.83 3.02 | r4-final-add11-acceptance-run1.log | b6805d24cdcabd7958bb1d70772a4a82ac833e51206cadafb8be12b684bcf8de |
| command -v bun; command -v bunx; ls -l bunx; shasum -a 256 bun; bun --version; bun -e 'process.stdout.write(Bun.revision)' | exit 0 | not a test | r4-final-add11-runtime-run1.log | 6d5f77e9c789660b0b03388c68805d18978cf4bf8d79928af243be1c89b3c6a3 |
| bun test | 1871 pass, 0 fail; 18202 assertions |  1:59  up 5 days, 17:08, 12 users, load averages: 7.28 4.90 3.08 | r4-final-add11-full-run1.log | 396ce83ae169692836ebeb82f81cfb898ebbb6e19ad0468a38892654d9c2618e |
| git diff --check 189c2c12fb0147909f0b8fdc550affca92e70156; exact scope, source hash and foreign-test exclusion checks | exit 0 | not a test | r4-final-add11-scope-run1.log | a8d65e198480114371cb1ccfec81e46a5f7466e3cca3d1f5769fda8b2f101619 |

### Every run: command, outcome and full-output log

All log files below are under /Users/michaeldaley/builds/m23-m24-r1-pr/logs/. Every test command prepends the pinned Bun directory to PATH in its own shell and pipes complete stdout/stderr through tee. Tool display excerpts do not truncate the stored files. Exit statuses are captured from the command side of the pipe using pipefail; no earlier receipt is rewritten.

| Log | Command | Exit | Summary | SHA-256 |
| --- | --- | --- | --- | --- |
| r4-precondition-install-run1.log | bun install --frozen-lockfile | 0 | no test summary | 08d9da9fbb927d6510cd2c30254cbfc224591b8f68649464bfa6a2fbe4664e31 |
| r4-precondition-tsc-run1.log | bunx tsc --noEmit | 0 | no test summary | d06db2da096198dade9c1d17c99684493da4241dc6f4fac8115dcb1249d2958f |
| r4-precondition-phase3a-run1.log | bun test test/phase3a | 0 | 131 pass, 0 fail; 2483 assertions | 1a861fd490569879683a269ac487060f64476ddeb04ccfd14a1410620b78f05f |
| r4-red-prefixed-run1.log | bun test test/phase3a/evidence-pipeline.test.ts -t 'token-prefixed allowlisted secrets leave no suffix in exported keys or values' | 1 | 0 pass, 1 fail; 10 assertions | 6328d83cdf9fc6b7d92062e5f4089a49f9fd8e2073db2783938df4c95d899356 |
| r4-red-collision-run1.log | bun test test/phase3a/evidence-pipeline.test.ts -t 'colliding redacted keys retain every value deterministically' | 1 | 0 pass, 1 fail; not printed assertions | b56e83fc42f837f2753953a84cd437a0cbfcb52107b8a011bd1d21dbc1dc4712 |
| r4-red-collision-run2.log | bun test test/phase3a/evidence-pipeline.test.ts -t '^colliding redacted keys retain every value deterministically$' | 1 | 0 pass, 1 fail; 5 assertions | bee185ddc60e459c53ad7bf7f9625220be4f6b9671966659453376488701adf7 |
| r4-red-sigterm-run1.log | bun test test/phase3a/adversarial/supervisor-death.test.ts -t '^supervisor SIGTERM terminates every governed child$' | 1 | 0 pass, 1 fail; 12 assertions | 609b2603c96e6bfc069f556419a05e972aaef39a13585ee352a8183487291fbf |
| r4-red-lifeline-run1.log | bun test test/phase3a/adversarial/process-group.test.ts -t "^deliberate lifeline EOF terminates that child's process group only$" | 1 | 0 pass, 1 fail; 1 assertions | ba5f8a316c264182c2bd997222018b006014e3e6fd05b918fffc3d09d3f9c3c0 |
| r4-red-crash-substitution-run1.log | bun test test/phase3a/adversarial/supervisor-death.test.ts -t '^supervisor crash terminates every governed child$' | 1 | 0 pass, 1 fail; 12 assertions | 1f34d9892d79f187b42a0dbe0783ef7a7e6b76315d78d2dfe335be0a7e76a237 |
| r4-red-verify-root-run1.log | bun test test/phase3a/evidence-pipeline.test.ts -t '^verify-ledger rejects an invalid storage root without exporting$' | 1 | 0 pass, 1 fail; 2 assertions | f9b084f41aac8117581f080929a13d2fd2aec9db4017b39369dd3b40af1269cf |
| r4-red-verify-home-run1.log | bun test test/phase3a/evidence-pipeline.test.ts -t '^verify-ledger rejects an inconsistent HOME without exporting$' | 1 | 0 pass, 1 fail; 2 assertions | f60dc96865e2c04f311f85cf5d394e452872be2641c5d1aaf97a39c7132745a0 |
| r4-red-export-root-run1.log | bun test test/phase3a/evidence-pipeline.test.ts -t '^export-evidence rejects an invalid storage root without exporting$' | 1 | 0 pass, 1 fail; 2 assertions | 95ceea98fd824b195cd158e2409960a51e381cb423c86cad6938b76195fd184b |
| r4-red-export-home-run1.log | bun test test/phase3a/evidence-pipeline.test.ts -t '^export-evidence rejects an inconsistent HOME without exporting$' | 1 | 0 pass, 1 fail; 2 assertions | 3a6da9b6ed2057b8cb3f3fda9357af80e85e56b37adcc1e9313f30874dcb6a03 |
| r4-corrections-tsc-run1.log | bunx tsc --noEmit | 0 | no test summary | 88fb73cfd8f69490bbc137c7cb8231d31a81f8f757b73d8742523999089c7dd3 |
| r4-green-evidence-run1.log | bun test test/phase3a/evidence-pipeline.test.ts | 1 | 12 pass, 4 fail; 745 assertions | 20ede587e0e4f7ef3eb27b56a6fd5ba74457e11ee60fb3b5105e8e8faeb6691d |
| r4-green-evidence-run2.log | bun test test/phase3a/evidence-pipeline.test.ts | 0 | 16 pass, 0 fail; 749 assertions | 2745796ece4857746d786b503d7d16ef0a7687a77c81bb8c022be00eb9d80867 |
| r4-green-supervisor-run1.log | bun test test/phase3a/adversarial/supervisor-death.test.ts | 0 | 6 pass, 0 fail; 238 assertions | 214b0203f089f793480526ee399ec2f9e825eab7f84aee5fd49ba8481b0cba34 |
| r4-green-process-group-run1.log | bun test test/phase3a/adversarial/process-group.test.ts | 0 | 5 pass, 0 fail; 43 assertions | f9301e0cbac96473d11e975e9ab10fb4b70dfc4e6815b2ff2887a932f4ceb738 |
| r4-break-pgid-s3-run1.log | bun test test/phase3a/adversarial/wedged-host.test.ts | 1 | 5 pass, 1 fail; 90 assertions | 746339ccdedb343d0bc05dcaf8a25ff054a5705f8eb10c80a88f03e3ceb002f6 |
| r4-break-pgid-all-run1.log | bun test test/phase3a/adversarial/wedged-host.test.ts | 1 | 4 pass, 2 fail; 90 assertions | d635b6e9da708b4967e8bc9c975f2019e27d4f43d1132283aaa085abf366d12b |
| r4-break-founder-close-run1.log | bun test test/phase3a/adversarial/cleanup-residuals.test.ts | 1 | 1 pass, 2 fail; 50 assertions | 2afc7feebe52142922d05a54a204620de12ad074aba60092142f4bd65e7939c4 |
| r4-break-key-sanitization-run1.log | bun test test/phase3a/evidence-pipeline.test.ts | 1 | 11 pass, 5 fail; 738 assertions | 79ac9c787451d590a0b1c267a3e9cf0386f5a6712b46391989a6e4886bd3a1d5 |
| r4-break-sigterm-clean-run1.log | bun test test/phase3a/adversarial/supervisor-death.test.ts | 1 | 4 pass, 2 fail; 158 assertions | a3363741c0f1e5799809d20a9999144b23442e32dee679fdc77ad1b313f75e2b |
| r4-break-crash-clean-run1.log | bun test test/phase3a/adversarial/supervisor-death.test.ts | 1 | 4 pass, 2 fail; 183 assertions | d639fc8c7be3590ecff8f2352786d32598d35dd2597d17ecf1db6ac27583af15 |
| r4-break-storage-checks-run1.log | bun test test/phase3a/evidence-pipeline.test.ts | 1 | 12 pass, 4 fail; 737 assertions | 85726f4eb37fc55d641fb683df96017b74c13b80c578c393eca3e0baadb0c3a8 |
| r4-break-prefixed-order-run1.log | bun test test/phase3a/evidence-pipeline.test.ts | 1 | 15 pass, 1 fail; 746 assertions | e14a18754ec9a1f725cc1da1adfe3a0952d275ba13a7d0828655f6b6f0b79029 |
| r4-break-lifeline-leader-only-run1.log | bun test test/phase3a/adversarial/process-group.test.ts | 0 | 5 pass, 0 fail; 43 assertions | f4de488b26c46727ac1b8496da1a27869a40796f2b646579d216e7ddbe8ebc64 |
| r4-break-key-collision-run1.log | bun test test/phase3a/evidence-pipeline.test.ts | 1 | 15 pass, 1 fail; 745 assertions | 43d0cc42c051bc2733d72fa1d42f26507f989032340eb1f3da98497ac8d65c42 |
| r4-final-tsc-run1.log | bunx tsc --noEmit | 0 | no test summary | 9d87d53aded29966fa4cafa9207d7f10cc4f8302baa26dd06c39b84ffb804a69 |
| r4-final-adversarial-run1.log | bun test test/phase3a/adversarial | 0 | 34 pass, 0 fail; 634 assertions | 17591c44d08e74bd5c519f128dea4c5e0a14f886c2d95634a3442b0b1214f2d0 |
| r4-final-add11-adversarial-run2.log | bun test test/phase3a/adversarial | 0 | 33 pass, 0 fail; 627 assertions | a39c3660a10e5364d9ae34883af9f0ec2330b0809b1106961a63ffc7f400d05c |
| r4-final-add11-adversarial-run3.log | bun test test/phase3a/adversarial | 0 | 33 pass, 0 fail; 627 assertions | 6080b0d598038f3473618f0ba11522b8ba66d29dc6a799e9091aabc79d2c012a |
| r4-final-add11-phase3a-run1.log | bun test test/phase3a | 0 | 137 pass, 0 fail; 2541 assertions | 8df88d2e3bdc211554789da03c4d25b652ffc49a24b13b7de6dbc9eae9508aff |
| r4-final-add11-madbridge-run1.log | bun test apps/madbridge | 0 | 518 pass, 0 fail; 2299 assertions | 93d7986fbc54954eb422e30d16c8d584636717a31c10a2374fd7226886a387b4 |
| r4-final-add11-acceptance-run1.log | bun test test/acceptance | 0 | 87 pass, 0 fail; 214 assertions | b6805d24cdcabd7958bb1d70772a4a82ac833e51206cadafb8be12b684bcf8de |
| r4-final-add11-tsc-run1.log | bunx tsc --noEmit | 0 | no test summary | 2aab5d80e81cc4bee9d8b1ef9310c51b17d25b79863e9d0f7a6027a7655c2476 |
| r4-final-add11-adversarial-run1.log | bun test test/phase3a/adversarial | 0 | 33 pass, 0 fail; 627 assertions | 35e05048e823e326787e8f30994d3695200c12b06e869104bfe88c8cac4e54d3 |
| r4-final-add11-runtime-run1.log | command -v bun; command -v bunx; ls -l bunx; shasum -a 256 bun; bun --version; bun -e 'process.stdout.write(Bun.revision)' | 0 | no test summary | 6d5f77e9c789660b0b03388c68805d18978cf4bf8d79928af243be1c89b3c6a3 |
| r4-final-add11-full-run1.log | bun test | 0 | 1871 pass, 0 fail; 18202 assertions | 396ce83ae169692836ebeb82f81cfb898ebbb6e19ad0468a38892654d9c2618e |
| r4-final-add11-scope-run1.log | git diff --check 189c2c12fb0147909f0b8fdc550affca92e70156; exact scope, source hash and foreign-test exclusion checks | 0 | no test summary | a8d65e198480114371cb1ccfec81e46a5f7466e3cca3d1f5769fda8b2f101619 |

### Uptime before each test run

r4-precondition-install-run1.log: 15:08  up 5 days,  6:17, 11 users, load averages: 2.44 2.64 1.94

r4-precondition-tsc-run1.log: 15:08  up 5 days,  6:17, 11 users, load averages: 2.33 2.61 1.94

r4-precondition-phase3a-run1.log: 15:08  up 5 days,  6:17, 11 users, load averages: 2.22 2.59 1.93

r4-red-prefixed-run1.log: 15:11  up 5 days,  6:19, 11 users, load averages: 3.10 2.81 2.11

r4-red-collision-run1.log: 15:11  up 5 days,  6:19, 11 users, load averages: 3.10 2.81 2.11

r4-red-collision-run2.log: 15:11  up 5 days,  6:20, 11 users, load averages: 2.37 2.66 2.08

r4-red-sigterm-run1.log: 15:11  up 5 days,  6:19, 11 users, load averages: 3.09 2.81 2.11

r4-red-lifeline-run1.log: 15:11  up 5 days,  6:19, 11 users, load averages: 3.09 2.81 2.11

r4-red-crash-substitution-run1.log: 15:11  up 5 days,  6:20, 11 users, load averages: 2.39 2.66 2.08

r4-red-verify-root-run1.log: 15:11  up 5 days,  6:20, 11 users, load averages: 4.95 3.21 2.28

r4-red-verify-home-run1.log: 15:11  up 5 days,  6:20, 11 users, load averages: 4.95 3.21 2.28

r4-red-export-root-run1.log: 15:11  up 5 days,  6:20, 11 users, load averages: 4.95 3.21 2.28

r4-red-export-home-run1.log: 15:11  up 5 days,  6:20, 11 users, load averages: 4.95 3.21 2.28

r4-corrections-tsc-run1.log: 15:12  up 5 days,  6:21, 11 users, load averages: 4.54 3.24 2.32

r4-green-evidence-run1.log: 15:12  up 5 days,  6:21, 11 users, load averages: 4.21 3.21 2.32

r4-green-evidence-run2.log: 15:12  up 5 days,  6:21, 11 users, load averages: 3.87 3.18 2.32

r4-green-supervisor-run1.log: 15:12  up 5 days,  6:21, 11 users, load averages: 3.96 3.21 2.34

r4-green-process-group-run1.log: 15:12  up 5 days,  6:21, 11 users, load averages: 3.96 3.21 2.34

r4-break-pgid-s3-run1.log: 15:13  up 5 days,  6:22, 11 users, load averages: 2.43 2.90 2.29

r4-break-pgid-all-run1.log: 15:13  up 5 days,  6:22, 11 users, load averages: 2.13 2.82 2.27

r4-break-founder-close-run1.log: 15:14  up 5 days,  6:23, 11 users, load averages: 2.18 2.78 2.27

r4-break-key-sanitization-run1.log: 15:14  up 5 days,  6:23, 11 users, load averages: 2.32 2.79 2.27

r4-break-sigterm-clean-run1.log: 15:14  up 5 days,  6:23, 11 users, load averages: 1.81 2.65 2.23

r4-break-crash-clean-run1.log: 15:14  up 5 days,  6:23, 11 users, load averages: 1.98 2.67 2.24

r4-break-storage-checks-run1.log: 15:14  up 5 days,  6:23, 11 users, load averages: 1.97 2.64 2.24

r4-break-prefixed-order-run1.log: 15:15  up 5 days,  6:23, 11 users, load averages: 1.97 2.63 2.24

r4-break-lifeline-leader-only-run1.log: 15:15  up 5 days,  6:24, 11 users, load averages: 2.48 2.71 2.27

r4-break-key-collision-run1.log: 16:33  up 5 days,  7:41, 11 users, load averages: 4.24 3.74 3.58

r4-final-tsc-run1.log: 16:33  up 5 days,  7:42, 11 users, load averages: 3.63 3.66 3.56

r4-final-adversarial-run1.log: 16:33  up 5 days,  7:42, 11 users, load averages: 3.66 3.67 3.56

r4-final-add11-adversarial-run2.log:  1:56  up 5 days, 17:05, 12 users, load averages: 3.89 2.75 2.07

r4-final-add11-adversarial-run3.log:  1:56  up 5 days, 17:05, 12 users, load averages: 5.36 3.23 2.27

r4-final-add11-phase3a-run1.log:  1:57  up 5 days, 17:06, 12 users, load averages: 6.06 3.63 2.45

r4-final-add11-madbridge-run1.log:  1:58  up 5 days, 17:07, 12 users, load averages: 7.96 4.79 2.99

r4-final-add11-acceptance-run1.log:  1:58  up 5 days, 17:07, 12 users, load averages: 7.63 4.83 3.02

r4-final-add11-tsc-run1.log:  1:55  up 5 days, 17:04, 12 users, load averages: 2.11 2.33 1.90

r4-final-add11-adversarial-run1.log:  1:55  up 5 days, 17:04, 12 users, load averages: 2.02 2.31 1.90

r4-final-add11-full-run1.log:  1:59  up 5 days, 17:08, 12 users, load averages: 7.28 4.90 3.08


### Failure lines retained verbatim

r4-red-prefixed-run1.log

```text
(fail) token-prefixed allowlisted secrets leave no suffix in exported keys or values [312.71ms]
```

r4-red-collision-run1.log

```text
(fail) colliding redacted keys retain every value deterministically [1.49ms]
```

r4-red-collision-run2.log

```text
(fail) colliding redacted keys retain every value deterministically [432.66ms]
```

r4-red-sigterm-run1.log

```text
(fail) supervisor SIGTERM terminates every governed child [394.81ms]
```

r4-red-lifeline-run1.log

```text
(fail) deliberate lifeline EOF terminates that child's process group only [272.23ms]
```

r4-red-crash-substitution-run1.log

```text
(fail) supervisor crash terminates every governed child [498.48ms]
```

r4-red-verify-root-run1.log

```text
(fail) verify-ledger rejects an invalid storage root without exporting [281.51ms]
```

r4-red-verify-home-run1.log

```text
(fail) verify-ledger rejects an inconsistent HOME without exporting [349.38ms]
```

r4-red-export-root-run1.log

```text
(fail) export-evidence rejects an invalid storage root without exporting [282.41ms]
```

r4-red-export-home-run1.log

```text
(fail) export-evidence rejects an inconsistent HOME without exporting [295.72ms]
```

r4-green-evidence-run1.log

```text
(fail) verify-ledger rejects an invalid storage root without exporting [257.61ms]
(fail) verify-ledger rejects an inconsistent HOME without exporting [285.22ms]
(fail) export-evidence rejects an invalid storage root without exporting [243.38ms]
(fail) export-evidence rejects an inconsistent HOME without exporting [292.96ms]
```

r4-break-pgid-s3-run1.log

```text
(fail) a SIGSTOPped host is cleared through the direct PGID path [6170.72ms]
```

r4-break-pgid-all-run1.log

```text
(fail) a SIGSTOPped host is cleared through the direct PGID path [6105.23ms]
(fail) the wedged-host descendant survives host death without a direct PGID kill [5882.65ms]
```

r4-break-founder-close-run1.log

```text
(fail) the residual census retains durable closure and token evidence after storage deletion [288.90ms]
(fail) no child, descendant, host, descriptor, open ledger session, or live fencing token remains after the adversarial suite [4836.61ms]
```

r4-break-key-sanitization-run1.log

```text
(fail) exported evidence contains no allowlisted secret value [366.72ms]
(fail) exported evidence redacts a allowlisted secret in nested property keys [301.97ms]
(fail) exported evidence redacts a known token pattern in nested property keys [300.23ms]
(fail) token-prefixed allowlisted secrets leave no suffix in exported keys or values [295.18ms]
(fail) colliding redacted keys retain every value deterministically [332.08ms]
```

r4-break-sigterm-clean-run1.log

```text
(fail) supervisor SIGTERM terminates every governed child [421.39ms]
(fail) no governed process survives any supervisor-death scenario [703.60ms]
```

r4-break-crash-clean-run1.log

```text
(fail) supervisor crash terminates every governed child [339.61ms]
(fail) no governed process survives any supervisor-death scenario [1162.52ms]
```

r4-break-storage-checks-run1.log

```text
(fail) verify-ledger rejects an invalid storage root without exporting [341.39ms]
(fail) verify-ledger rejects an inconsistent HOME without exporting [268.42ms]
(fail) export-evidence rejects an invalid storage root without exporting [315.52ms]
(fail) export-evidence rejects an inconsistent HOME without exporting [274.31ms]
```

r4-break-prefixed-order-run1.log

```text
(fail) token-prefixed allowlisted secrets leave no suffix in exported keys or values [296.59ms]
```

r4-break-key-collision-run1.log

```text
(fail) colliding redacted keys retain every value deterministically [352.15ms]
```

The unfiltered breaks' assertion excerpts are:

```text
error: the recorded governed descendant must be gone within the outer bound
Expected: false
Received: true

expect(data.openSessions).toBe(0)
Expected: 0
Received: 3

error: SIGTERM must reach its signal handler

error: crash must report the uncaught synthetic exception
Expected to contain: "error: Synthetic supervisor crash"
Received: ""

expect(result.exitCode).toBe(1)
Expected: 1
Received: 0

Expected to not contain: "_FIXTURE_SUFFIX"

expect(Object.keys(payload)).toHaveLength(4)
Expected length: 4
Received length: 3
```

The full diagnostics, synthetic fixture values and stack frames are in the unmodified logs, rather than copied wholesale into this record.

### Per-break restored file SHA-256

r4-break-pgid-s3-run1.log, exit 1:

- packages/broker/src/pty-host-supervisor.ts: 9ba986edb28133e2f7a177f95280b2088b8bd5051e80ba58794dc0555a5a8bb7

r4-break-pgid-all-run1.log, exit 1:

- packages/broker/src/pty-host-supervisor.ts: 9ba986edb28133e2f7a177f95280b2088b8bd5051e80ba58794dc0555a5a8bb7

r4-break-founder-close-run1.log, exit 1:

- test/phase3a/runtime-harness.ts: 9a90ef8b3e357b7f89c0f2d9ba9ecddb6c9d2e707b7160065004422df7d39d10

r4-break-key-sanitization-run1.log, exit 1:

- apps/madbridge/src/commands/export-evidence.ts: aee7ea77660c42b37a662d0300d9c1ae2e1cfb12bd315cd6190f010fa530167e

r4-break-sigterm-clean-run1.log, exit 1:

- test/phase3a/runtime-harness.ts: 9a90ef8b3e357b7f89c0f2d9ba9ecddb6c9d2e707b7160065004422df7d39d10

r4-break-crash-clean-run1.log, exit 1:

- test/phase3a/adversarial/supervisor-entry.ts: f4a772df7801fe4abf4a6e186019b30d04edb9ecb2d54e83cc20f342b5530f06

r4-break-storage-checks-run1.log, exit 1:

- apps/madbridge/src/commands/verify-ledger.ts: 5c9e3e9eb008fbc7f7e11510c95c9487127136a3a633a652ed3fb157d27b7731
- apps/madbridge/src/commands/export-evidence.ts: aee7ea77660c42b37a662d0300d9c1ae2e1cfb12bd315cd6190f010fa530167e

r4-break-prefixed-order-run1.log, exit 1:

- apps/madbridge/src/commands/export-evidence.ts: aee7ea77660c42b37a662d0300d9c1ae2e1cfb12bd315cd6190f010fa530167e

r4-break-lifeline-leader-only-run1.log, exit 0 — withdrawn requirement under Addendum 10; caused the recorded halt:

- packages/pty-host/src/signals.ts: c5d2814420dc7d431a28cb7ef03229304daf5896bd50e9630268ba3d637fa90e

r4-break-key-collision-run1.log, exit 1:

- apps/madbridge/src/commands/export-evidence.ts: aee7ea77660c42b37a662d0300d9c1ae2e1cfb12bd315cd6190f010fa530167e


### Observed final-gate milliseconds

D=detectedMs; X=deathMs; T=terminateSentMs; A=ackWindowEndedMs; C=stdinClosedMs; Q=classifiedMs; P=pgidKillAttemptedMs; H=hostKillAttemptedMs; E=escalatedMs. These are the literal decimal strings printed by tests, in output order; all values are milliseconds. Other labels retain their printed names.

r4-final-add11-adversarial-run1.log

| Printed observation |
| --- |
| ignore_SIGTERM: final_death_ms=2032.26 |
| lifeline_EOF: final_death_ms=173.10 |
| host_exit: final_death_ms=188.13 |
| supervisor clean: exit=0 signal=null final_death_ms=30.18 |
| supervisor SIGTERM: exit=0 signal=null final_death_ms=30.79 |
| supervisor crash: exit=1 signal=null final_death_ms=16.68 |
| supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=24.13 |
| supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=23.21 |
| supervisor clean: exit=0 signal=null final_death_ms=31.59 |
| supervisor SIGTERM: exit=0 signal=null final_death_ms=30.93 |
| supervisor crash: exit=1 signal=null final_death_ms=25.66 |
| supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=25.25 |
| second_surface_failure final_death_ms=547.1453750000001 |
| census_fault D=251.3369590000002 X=274.65083400000003 T=0.03879199999937555 A=249.34283399999913 C=249.35829199999898 Q=249.3733339999999 P=249.39820899999904 H=249.40670899999895 E=249.40683399999944 |
| census_fault D=8.241874999999709 X=32.31412499999897 |
| census_fault D=2.2091249999994034 X=25.611457999999402 |
| census_fault D=3.929334000000381 X=27.629084000000148 |
| census_fault D=2.053749999999127 X=25.23895799999991 |
| census_fault D=2.0391660000004777 X=25.341207999999824 |
| census_supervisor clean final_death_ms=41.50908400000117 |
| census_supervisor SIGTERM final_death_ms=33.979959000000235 |
| census_supervisor crash final_death_ms=34.03041699999994 |
| census_supervisor SIGKILL final_death_ms=22.464084000001094 |
| residual_census final_death_ms=30.72345900000073 |
| attestation_drift D=1.5999580000006972 X=24.538582999999562 |
| adjacent_rehash final_death_ms=347.05045900000005 |
| host_fault D=251.51379199999792 X=275.0986249999987 T=0.02729199999885168 A=249.6262089999982 C=249.6396249999998 Q=249.65129199999865 P=249.69670899999983 H=249.70529199999874 E=249.70550000000003 |
| wedged_descendant_calibration host_dead_ms=107.48937500000102 descendant_alive=true |
| host_fault D=254.7328750000015 X=278.64779199999975 T=0.030249999999796273 A=249.8025000000016 C=249.82404099999985 Q=249.8439580000013 P=249.8634579999998 H=249.87229099999968 E=249.8735830000005 |
| host_fault D=251.7717909999992 X=274.65979100000186 T=0.024750000000494765 A=249.45187500000247 C=249.46933300000092 Q=249.48708299999998 P=249.50900000000183 H=249.5138330000009 E=249.5141250000015 |
| host_fault D=2.1950830000023416 X=26.00304099999994 |
| host_fault D=1.991375000001426 X=26.69499999999971 |
| auth_expiry D=1.8225419999980659 X=24.879832999999053 |
| auth_expiry D=2.041958000001614 X=24.73058300000048 |
| sequence_fault D=1.955167000000074 X=26.614667000001646 |
| sequence_fault D=2.5069169999987935 X=26.724709000001894 |
| sequence_fault D=2.152541999999812 X=25.546916999999667 |
| sequence_fault D=1.9565409999995609 X=25.36999999999898 |
| sequence_fault D=2.096958000001905 X=25.516417000002548 |
| ledger_failure D=2.360958000001119 X=26.37287500000093 |
| unrecordable_ledger D=0 X=23.09758299999885 |

r4-final-add11-adversarial-run2.log

| Printed observation |
| --- |
| ignore_SIGTERM: final_death_ms=2030.47 |
| lifeline_EOF: final_death_ms=174.20 |
| host_exit: final_death_ms=188.06 |
| supervisor clean: exit=0 signal=null final_death_ms=31.44 |
| supervisor SIGTERM: exit=0 signal=null final_death_ms=34.67 |
| supervisor crash: exit=1 signal=null final_death_ms=14.69 |
| supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=12.59 |
| supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=22.79 |
| supervisor clean: exit=0 signal=null final_death_ms=32.55 |
| supervisor SIGTERM: exit=0 signal=null final_death_ms=31.03 |
| supervisor crash: exit=1 signal=null final_death_ms=25.64 |
| supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=26.88 |
| second_surface_failure final_death_ms=507.2835409999998 |
| census_fault D=251.29362500000025 X=274.2428340000006 T=0.03345900000022084 A=249.325499999999 C=249.34037499999977 Q=249.35662500000035 P=249.37674999999945 H=249.38600000000042 E=249.38687500000015 |
| census_fault D=2.0788750000010623 X=25.282875000000786 |
| census_fault D=2.970041000000492 X=27.88995799999975 |
| census_fault D=3.1512080000011338 X=27.082125000000815 |
| census_fault D=2.014666999999463 X=25.213999999999942 |
| census_fault D=1.795125000000553 X=25.21574999999939 |
| census_supervisor clean final_death_ms=32.5640829999993 |
| census_supervisor SIGTERM final_death_ms=32.87845799999923 |
| census_supervisor crash final_death_ms=28.829750000000786 |
| census_supervisor SIGKILL final_death_ms=30.86595800000032 |
| residual_census final_death_ms=27.691666000000623 |
| attestation_drift D=1.7113750000007713 X=24.45854099999997 |
| adjacent_rehash final_death_ms=264.50091599999905 |
| host_fault D=252.16233300000022 X=275.8546669999996 T=0.04104200000074343 A=249.69029200000114 C=249.7028330000012 Q=249.725292000001 P=249.76833299999998 H=249.77662500000042 E=249.77700000000004 |
| wedged_descendant_calibration host_dead_ms=105.99754199999916 descendant_alive=true |
| host_fault D=253.14070900000297 X=277.8858340000006 T=0.027249999999185093 A=251.1335829999989 C=251.15674999999828 Q=251.1735000000008 P=251.19437499999913 H=251.20316599999933 E=251.20449999999983 |
| host_fault D=251.37424999999712 X=274.3472079999992 T=0.06962500000008731 A=249.62937500000044 C=249.64254100000107 Q=249.65066600000137 P=249.66891599999872 H=249.67250000000058 E=249.67275000000154 |
| host_fault D=2.0071659999994154 X=25.018332999999984 |
| host_fault D=2.171666999998706 X=25.57562499999767 |
| auth_expiry D=2.1565000000009604 X=25.2522080000017 |
| auth_expiry D=1.6696249999986321 X=24.25066599999991 |
| sequence_fault D=2.3500419999982114 X=28.151624999998603 |
| sequence_fault D=2.9489159999975527 X=27.813749999997526 |
| sequence_fault D=2.226582999999664 X=25.95050000000265 |
| sequence_fault D=2.1066659999996773 X=25.32945800000016 |
| sequence_fault D=2.1531250000007276 X=25.892916000000696 |
| ledger_failure D=2.317750000001979 X=25.375542000001587 |
| unrecordable_ledger D=0 X=22.565624999999272 |

r4-final-add11-adversarial-run3.log

| Printed observation |
| --- |
| ignore_SIGTERM: final_death_ms=2024.62 |
| lifeline_EOF: final_death_ms=173.78 |
| host_exit: final_death_ms=189.12 |
| supervisor clean: exit=0 signal=null final_death_ms=31.05 |
| supervisor SIGTERM: exit=0 signal=null final_death_ms=31.25 |
| supervisor crash: exit=1 signal=null final_death_ms=32.46 |
| supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=24.07 |
| supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=23.34 |
| supervisor clean: exit=0 signal=null final_death_ms=30.89 |
| supervisor SIGTERM: exit=0 signal=null final_death_ms=30.35 |
| supervisor crash: exit=1 signal=null final_death_ms=14.53 |
| supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=24.25 |
| second_surface_failure final_death_ms=562.7687920000008 |
| census_fault D=251.45995799999946 X=274.3303329999999 T=0.04045899999982794 A=249.44974999999977 C=249.46383400000013 Q=249.4741669999985 P=249.49729200000002 H=249.50616699999955 E=249.50624999999854 |
| census_fault D=2.1900000000005093 X=25.097209000001385 |
| census_fault D=2.740916999999172 X=25.67712500000016 |
| census_fault D=2.9648329999999987 X=26.467249999999694 |
| census_fault D=1.7481250000000728 X=24.737750000000233 |
| census_fault D=2.6093330000003334 X=29.003499999998894 |
| census_supervisor clean final_death_ms=34.03270899999916 |
| census_supervisor SIGTERM final_death_ms=32.80841699999837 |
| census_supervisor crash final_death_ms=17.567250000000058 |
| census_supervisor SIGKILL final_death_ms=26.45441700000083 |
| residual_census final_death_ms=27.322167000000263 |
| attestation_drift D=2.173957999999402 X=25.574290999998993 |
| adjacent_rehash final_death_ms=262.2774999999983 |
| host_fault D=251.2903750000005 X=274.8650830000006 T=0.021875000000363798 A=249.0749169999999 C=249.08991700000115 Q=249.1057920000003 P=249.14508300000125 H=249.152250000001 E=249.15237499999967 |
| wedged_descendant_calibration host_dead_ms=105.46916699999929 descendant_alive=true |
| host_fault D=253.49625000000015 X=277.8553329999995 T=0.03033300000242889 A=249.77862500000265 C=249.79933300000266 Q=249.81533300000228 P=249.83516600000075 H=249.84420800000225 E=249.84583300000304 |
| host_fault D=253.11558300000252 X=276.7294580000016 T=0.027375000001484295 A=249.6103750000002 C=249.62304100000256 Q=249.6349160000027 P=249.65716600000087 H=249.66237499999988 E=249.6627499999995 |
| host_fault D=2.184499999999389 X=26.063500000000204 |
| host_fault D=2.3704580000012356 X=25.64654100000189 |
| auth_expiry D=1.9697089999972377 X=25.59454199999891 |
| auth_expiry D=2.2377080000005662 X=25.293667000001733 |
| sequence_fault D=3.015083999998751 X=28.675999999999476 |
| sequence_fault D=3.2160000000003492 X=28.107499999998254 |
| sequence_fault D=2.4795410000006086 X=26.687582999998995 |
| sequence_fault D=2.10320800000045 X=25.65666699999929 |
| sequence_fault D=2.189083000001119 X=25.478916000000027 |
| ledger_failure D=2.315416000001278 X=25.689791000000696 |
| unrecordable_ledger D=0 X=22.234458999999333 |

r4-final-add11-phase3a-run1.log

| Printed observation |
| --- |
| ignore_SIGTERM: final_death_ms=2033.91 |
| lifeline_EOF: final_death_ms=173.75 |
| host_exit: final_death_ms=189.08 |
| supervisor clean: exit=0 signal=null final_death_ms=30.65 |
| supervisor SIGTERM: exit=0 signal=null final_death_ms=37.36 |
| supervisor crash: exit=1 signal=null final_death_ms=24.71 |
| supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=22.88 |
| supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=22.80 |
| supervisor clean: exit=0 signal=null final_death_ms=29.83 |
| supervisor SIGTERM: exit=0 signal=null final_death_ms=29.46 |
| supervisor crash: exit=1 signal=null final_death_ms=14.56 |
| supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=25.98 |
| second_surface_failure final_death_ms=594.164084 |
| census_fault D=252.6684580000001 X=276.49779200000194 T=0.028333999995084014 A=249.61204199999338 C=249.6264169999995 Q=249.64087499999732 P=249.6641249999957 H=249.67091699999582 E=249.6714589999974 |
| census_fault D=2.4923330000019632 X=26.229583000000275 |
| census_fault D=2.4573329999984708 X=26.186416999997164 |
| census_fault D=3.2436670000024606 X=28.588917000000947 |
| census_fault D=1.7438340000007884 X=26.222125000000233 |
| census_fault D=2.1145829999950365 X=25.862499999995634 |
| census_supervisor clean final_death_ms=33.529209000000264 |
| census_supervisor SIGTERM final_death_ms=32.91662499999802 |
| census_supervisor crash final_death_ms=29.43779199999699 |
| census_supervisor SIGKILL final_death_ms=26.864125000000058 |
| residual_census final_death_ms=27.719958000001498 |
| attestation_drift D=1.931165999994846 X=25.355290999999852 |
| adjacent_rehash final_death_ms=329.4946659999987 |
| host_fault D=251.92199999999866 X=275.67854200000147 T=0.025750000000698492 A=249.41662499999802 C=249.4307090000002 Q=249.4473749999961 P=249.48129199999676 H=249.4872499999983 E=249.48791699999856 |
| wedged_descendant_calibration host_dead_ms=106.57362500000454 descendant_alive=true |
| host_fault D=255.43679200000042 X=282.08933300000353 T=0.018917000001238193 A=249.3507080000054 C=249.3715830000001 Q=249.38700000000244 P=249.42320800000016 H=249.43387500000244 E=249.43475000000035 |
| host_fault D=251.69954100000177 X=275.0720829999991 T=0.029458000004524365 A=249.54979100000492 C=249.56695800000307 Q=249.59316599999875 P=249.65554100000008 H=249.66395800000464 E=249.66525000000547 |
| host_fault D=2.0557079999998678 X=25.039958000001207 |
| host_fault D=2.0620830000043497 X=25.21337499999936 |
| auth_expiry D=1.8251249999957508 X=25.336166000000958 |
| auth_expiry D=1.3852499999993597 X=24.120958999999857 |
| sequence_fault D=2.706208000003244 X=27.174207999996725 |
| sequence_fault D=2.2917080000042915 X=25.571125000002212 |
| sequence_fault D=2.0095839999994496 X=25.035209000001487 |
| sequence_fault D=2.065999999998894 X=25.290124999999534 |
| sequence_fault D=2.425250000000233 X=25.607624999996915 |
| ledger_failure D=2.5756249999976717 X=25.91466699999728 |
| unrecordable_ledger D=0 X=21.374958000000333 |
| [spike] pty_tty_allocation=3ms(pass) exact_binary_io=0ms(pass) resize_propagation=6ms(pass) process_group_and_signals=36ms(pass) child_and_grandchild_termination=30ms(pass) two_ptys_plus_adapter_no_leak=0ms(pass) supervisor_exit_modes=2209ms(pass) lifeline_eof=78ms(pass) pty_host_death=71ms(pass) sigstop_wedged_direct_pgid=292ms(pass) child_ignores_sigterm=731ms(pass) clean_exit_reporting=2066ms(pass) measured_timing=2209ms(pass) |

r4-final-add11-full-run1.log

| Printed observation |
| --- |
| ignore_SIGTERM: final_death_ms=2032.76 |
| lifeline_EOF: final_death_ms=173.45 |
| host_exit: final_death_ms=189.14 |
| supervisor clean: exit=0 signal=null final_death_ms=29.89 |
| supervisor SIGTERM: exit=0 signal=null final_death_ms=47.78 |
| supervisor crash: exit=1 signal=null final_death_ms=25.89 |
| supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=23.64 |
| supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=22.91 |
| supervisor clean: exit=0 signal=null final_death_ms=30.63 |
| supervisor SIGTERM: exit=0 signal=null final_death_ms=31.30 |
| supervisor crash: exit=1 signal=null final_death_ms=14.42 |
| supervisor SIGKILL: exit=null signal=SIGKILL final_death_ms=23.70 |
| second_surface_failure final_death_ms=587.5917080000218 |
| census_fault D=252.1710829999938 X=274.9303749999963 T=0.025292000005720183 A=249.39566700000432 C=249.40699999997742 Q=249.41962499998044 P=249.44349999999395 H=249.4488339999807 E=249.44933400000446 |
| census_fault D=2.5372089999727905 X=25.8452919999836 |
| census_fault D=2.42987500000163 X=25.802332999999635 |
| census_fault D=2.651125000003958 X=26.490790999989258 |
| census_fault D=1.9544580000219867 X=28.436750000022585 |
| census_fault D=1.9269579999963753 X=25.710874999989755 |
| census_supervisor clean final_death_ms=32.91112499998417 |
| census_supervisor SIGTERM final_death_ms=33.086292000021785 |
| census_supervisor crash final_death_ms=28.922916999988956 |
| census_supervisor SIGKILL final_death_ms=27.110166999977082 |
| residual_census final_death_ms=27.56424999999581 |
| attestation_drift D=2.1885830000101123 X=25.49654200000805 |
| adjacent_rehash final_death_ms=334.3038330000127 |
| host_fault D=251.76399999999558 X=275.2761670000036 T=0.030208000011043623 A=249.42883300001267 C=249.4392499999958 Q=249.453125 P=249.49225000001024 H=249.49904200001038 E=249.4991250000021 |
| wedged_descendant_calibration host_dead_ms=105.1054170000134 descendant_alive=true |
| host_fault D=251.4153750000114 X=274.0627080000122 T=0.02395900001283735 A=249.3570840000175 C=249.3672920000099 Q=249.38770900000236 P=249.40425000002142 H=249.4079170000041 E=249.40950000000885 |
| host_fault D=251.79925000001094 X=274.772209000017 T=0.04045800000312738 A=249.41987500002142 C=249.43450000000303 Q=249.44479200002388 P=249.4663330000185 H=249.4708329999994 E=249.4709580000199 |
| host_fault D=2.2412079999921843 X=25.534416000009514 |
| host_fault D=1.6176659999764524 X=24.87533299997449 |
| auth_expiry D=1.9845830000122078 X=25.358625000022585 |
| auth_expiry D=1.921875 X=25.43620799999917 |
| sequence_fault D=1.9678340000100434 X=25.408625000010943 |
| sequence_fault D=2.616875000006985 X=27.53633400000399 |
| sequence_fault D=2.3836670000164304 X=25.519375000003492 |
| sequence_fault D=2.1869580000056885 X=25.806207999994513 |
| sequence_fault D=2.400999999983469 X=25.87041699999827 |
| ledger_failure D=3.1781250000058208 X=26.759084000019357 |
| unrecordable_ledger D=0 X=22.4517090000154 |
| [spike] pty_tty_allocation=3ms(pass) exact_binary_io=0ms(pass) resize_propagation=3ms(pass) process_group_and_signals=38ms(pass) child_and_grandchild_termination=31ms(pass) two_ptys_plus_adapter_no_leak=0ms(pass) supervisor_exit_modes=2110ms(pass) lifeline_eof=70ms(pass) pty_host_death=67ms(pass) sigstop_wedged_direct_pgid=286ms(pass) child_ignores_sigterm=731ms(pass) clean_exit_reporting=2076ms(pass) measured_timing=2110ms(pass) |


### Verbatim Addendum 10 text for the recorded text hash

```text
ADDENDUM 10 TO THE M23-M24 BUILDER PROMPT: the lifeline mutation. Paste this into the Codex session session:codex/m23-m24-r4, which halted at Addendum 9, item 8. It is signed by the Founder and is part of the builder prompt, with Addenda 1 to 9.

Your halt was correct. I rule as follows.

1. The facts as you reported them. With killGroup in packages/pty-host/src/signals.ts changed to signal the process instead of the group, deliberate lifeline EOF terminates that child's process group only still passed, and the file restored to SHA-256 c5d2814420dc7d431a28cb7ef03229304daf5896bd50e9630268ba3d637fa90e. The second review, which you cannot read, reported that production reaches the lifeline-EOF group by more than one path, so that a change to killGroup alone is masked, and that packages/pty-host/test/signals.test.ts failed only when the lifeline-EOF path in packages/pty-host/src/main.ts was changed as well.
2. The reading. The finding of Addendum 9, item 6d, is advisory. A scenario test that runs the whole stack cannot be required to fail for a change that another production path covers, and production does not change for this finding. So:
   a. Item 7d is met by a lifeline-EOF scenario with a governed group member that outlives the child's own death unless the group is signalled, and a test that asserts that member is gone within the bound. Keep that test if you have made it; make it if you have not. It need not fail when only killGroup is changed.
   b. Item 8 no longer requires the killGroup check. Before you go on, report in one paragraph whether the lifeline-EOF scenario reaches killGroup at all, citing file and line, and which other production paths terminate the group there. Read code only for this; do not change production, and run no extra mutation.
3. Then continue item 8 from the colliding redacted keys, and then items 9 to 13, as Addendum 9 says.
4. Record. Under Deviations, in the build log's Correction round 2 section, and under Limitations in pr-body-r3.md: this halt, the failed check's log and its SHA-256, your paragraph of item 2b, that the lifeline-EOF group is covered by redundant production paths, and this addendum by its SHA-256.

Everything else in the builder prompt and Addenda 1 to 9 is unchanged.
```

### Verbatim Addendum 11 text for the recorded text hash

```text
ADDENDUM 11 TO THE M23-M24 BUILDER PROMPT: the test you did not write. Paste this into the Codex session session:codex/m23-m24-r4. It is signed by the Founder and is part of the builder prompt, with Addenda 1 to 10.

Your question was right to ask. I rule as follows.

1. The facts as you reported them. A test at line 86 of test/phase3a/adversarial/process-group.test.ts appeared in the working tree while this session was halted, and this session did not write it. Syncthing does not touch /Users/michaeldaley/builds. Its source is not established.
2. Exclude it. Before any other step:
   a. Report the test's name, its full hunk from git diff, and the modification time of the file from stat.
   b. Save that hunk as /Users/michaeldaley/builds/m23-m24-r1-pr/logs/r4-foreign-test-hunk.patch and report its SHA-256.
   c. Remove exactly that hunk, and nothing else, from the working tree.
   d. For every other changed hunk in the working tree, say whether this session wrote it, from your own records and logs. If any hunk cannot be traced to this session, stop and report it; do not remove it.
3. Addendum 10, item 2a, then applies as written: if your own work holds no lifeline-EOF test with a group member that only a group signal clears, write one yourself. For that test a RED run is not required, because Addendum 10 rules that it need not fail when only killGroup changes; record that.
4. The tree has changed since your final gates began, so run the final gates of DEC-20261028-02 B7 again from the start, in full and in order, under Addendum 9, item 5. Then items 10 to 13 of Addendum 9.
5. Record. Under Deviations, in the build log's Correction round 2 section, and in pr-body-r3.md: that a test of unknown source appeared in the working tree while the session was halted; its name; the saved hunk by its SHA-256; that it was removed and is in no commit; your item 2d result; and this addendum by its SHA-256.

Everything else in the builder prompt and Addenda 1 to 10 is unchanged.
```

### Description-size disposition

The full replacement description was first assembled in session state and measured 67,206 characters before any file write, above the 60,000-byte limit. Under Addendum 9 item 11, earlier per-run tables, associated run receipts and redundant RED/GREEN/self-fix summaries were shortened to pointers to this unchanged historical build-log prefix and the unchanged pr-body-r2.md, SHA-256 3a7f1c8abedee2d68b35de97bb490c58270f124578e9d8245056deaa6df7ef3b. The prior what/why, path-purpose and test-requirement maps, actual agent provenance/hunks, authority hashes and limitations remain. The new round-2 log hashes and all 207 printed timing observations remain in the new description and this record. This is an editorial narrower reading of the size rule, not a change to evidence or authority. Square brackets around the spike label are omitted in the description only to satisfy its zero-square-bracket constraint; every observed numeric string is unchanged. No existing artifact or earlier log was overwritten.

## Linux continuous-integration correction

Performed by session:codex/m23-m24-r4, role builder, execution surface codex, under builder Addendum 12. Parent: 4a6a67d3d5cc8c001e2d5a46dc153a3ad567f5ff. One commit is authorized for this CI failure only. The containing commit is identified in pr-body-r4.md and the final report, not self-referenced here.

### Authority and supplied failure

The Founder supplied Addendum 12 directly in this session. Its exact pasted text, UTF-8/LF with one terminal LF, hashes via shasum -a 256 on standard input to 2b9d08a3cb078056b723ae2f692ad329ec9a79bc96e50fd6657118679eaaa1ba. The text is preserved verbatim below; no separate on-disk signed file is asserted.

As reported in that addendum, Verify on ubuntu-24.04 failed at 03b31247374cba31fc70f5fa64e018b1b62ec651, c4526065216ac86a0c10c1bbcba13b04e36486de and the parent, with 1870 passing tests and one failing descriptor-hygiene scenario, because an entry closed between readdirSync and readlinkSync. No GitHub call or CI-log fetch was made; the supplied addendum is the evidence for those CI facts. The Founder rules that this is CI failure, not a review verdict, and adds no correction round under plan section 11.3.

The directory and branch matched the prompt, the initial tree was clean, and HEAD matched the required parent. The same builder seat continues. No agent was started, no earlier-session memory was used and no memory file was read. The prior unrestricted-test approval continues. No dependency, runtime, host setting, credential or production file changed.

### Item 2b: bounded source inspection

At the parent, test/phase3a/adversarial/descriptor-hygiene.test.ts:20 to 24 lists /proc/PID/fd and reads each numeric entry by readlinkSync; line 22 is the failing path. In the corrected file, the listing is line 23, readlinkSync line 26, ENOENT-only handling lines 27 to 30 and per-process count line 36.

test/phase3a/runtime-harness.ts:173 to 181 is different: line 175 lists /proc/self/fd on Linux or /dev/fd on macOS, but line 177 calls fstatSync on the numeric descriptor instead of reading a /proc entry path. Line 179 already skips EBADF for a descriptor closed before fstat and rethrows other errors. It therefore has no matching readlink-of-listed-entry pattern and remains byte-identical at 9a90ef8b3e357b7f89c0f2d9ba9ecddb6c9d2e707b7160065004422df7d39d10.

The other Task 51 to 55 adversarial files, fixture-adapters.ts, evidence-pipeline.test.ts, the B6 acceptance file, both evidence command files and the conditional broker path contain no other matching /proc listing-then-entry-read loop. The evidence tests list their owned export/storage files, not /proc entries. Source searches used filenames and line numbers; no process or descriptor listing was run directly by this session.

### Change and preserved behavior

Only the Linux branch of descriptors() changes. Each readlinkSync ENOENT increments closedDuringListing and returns an empty entry result. Every other readlink error rethrows, and readdirSync failures also propagate. The finally block prints descriptor_listing pid and closed_ENOENT_count for each attempted process listing, including when another error aborts it; no descriptor target text is printed. Numeric filtering, pipe/inode parsing and every assertion stay.

The entire suffix beginning with the macOS platform assertion, including the macOS branch and both test bodies, was compared byte-for-byte with the parent and is unchanged. The prefix before the Linux branch is also byte-identical. The corrected test-file SHA-256 is a48a3fe4580b8c4654d5de1da25ad2725b88e76065ab69a88ef623153bdd244b.

No RED run and no deliberate break was performed or required, expressly under Addendum 12 item 3. No new test, skipped test, changed timeout or weakened assertion was introduced.

### Local verification and limits

All required commands ran once, in the prescribed order, in the foreground with the complete output piped through tee to new, non-overwritten logs. Every test run recorded uptime. Addendum 9 item 5 controls load: no load pause, and no unchanged rerun of a timing failure at first load at least 2.0. No run or timing assertion failed.

All runtime checks matched /Users/michaeldaley/.bun/bin/bun and bunx, the symbolic link to that Bun, version 1.4.2, revision 744846f844374847c902b5e7fd59b4342a51ef99 and executable SHA-256 35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5. The immediate pre-bare check is in r4-linux-runtime-run1.log. bun.lock remained 34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0.

| Command | Result | Uptime / load before run | Log under /Users/michaeldaley/builds/m23-m24-r1-pr/logs/ | SHA-256 |
| --- | --- | --- | --- | --- |
| bunx tsc --noEmit | exit 0 |  6:57  up 5 days, 22:06, 12 users, load averages: 3.51 4.25 4.30 | r4-linux-tsc-run1.log | 3490ccdd55053664bcde7dc8e4d8bea55e80fae0016d92cf8b132822f64d3519 |
| bun test test/phase3a/adversarial/descriptor-hygiene.test.ts | 2 pass, 0 fail; 49 assertions; Ran 2 tests across 1 file. [1270.00ms] |  6:57  up 5 days, 22:06, 12 users, load averages: 3.95 4.33 4.33 | r4-linux-descriptor-run1.log | 362f620c3b9e04d4df9049abff10e11fd7826ecc27af6a56e07bf27ead9f02c7 |
| bun test test/phase3a | 137 pass, 0 fail; 2541 assertions; Ran 137 tests across 17 files. [56.30s] |  6:57  up 5 days, 22:06, 12 users, load averages: 3.95 4.33 4.33 | r4-linux-phase3a-run1.log | a54f7fef695c5eabd7c34f30864412db0ab3c98ef24bdcda70ae4408413c33d5 |
| Pinned runtime check immediately before bare bun test | exit 0 | not a test | r4-linux-runtime-run1.log | 6d5f77e9c789660b0b03388c68805d18978cf4bf8d79928af243be1c89b3c6a3 |
| bun test | 1871 pass, 0 fail; 18204 assertions; Ran 1871 tests across 135 files. [177.11s] |  6:59  up 5 days, 22:07, 12 users, load averages: 4.52 4.42 4.36 | r4-linux-full-run1.log | 56637736425c48baa6f1133d9a733e926d5a1712fbd82a4282037f3b1084e763 |


These are macOS results. The changed Linux branch was not executed on this MacBook. Its verification remains the GitHub Actions Linux run after the Founder pushes, which the Founder checks. No Linux pass, new Tier-2 verdict, merge readiness or live runtime certification is claimed.

### Exact source diff

```diff
diff --git a/test/phase3a/adversarial/descriptor-hygiene.test.ts b/test/phase3a/adversarial/descriptor-hygiene.test.ts
index f6adae5..5e6e418 100644
--- a/test/phase3a/adversarial/descriptor-hygiene.test.ts
+++ b/test/phase3a/adversarial/descriptor-hygiene.test.ts
@@ -17,11 +17,25 @@ function alive(pid: number): boolean {
 }
 function descriptors(pid: number, recorded: readonly number[]): Descriptor[] {
   expect(recorded.includes(pid)).toBe(true);
-  if (process.platform === "linux") return readdirSync(`/proc/${pid}/fd`).flatMap(fd => {
-    if (!/^\d+$/.test(fd)) return [];
-    const match = /^pipe:\[(\d+)\]$/.exec(readlinkSync(`/proc/${pid}/fd/${fd}`));
-    return match ? [{ fd: Number(fd), type: "PIPE", inode: match[1]! }] : [];
-  });
+  if (process.platform === "linux") {
+    let closedDuringListing = 0;
+    try {
+      return readdirSync(`/proc/${pid}/fd`).flatMap(fd => {
+        if (!/^\d+$/.test(fd)) return [];
+        let target: string;
+        try { target = readlinkSync(`/proc/${pid}/fd/${fd}`); }
+        catch (error) {
+          if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
+          closedDuringListing += 1;
+          return [];
+        }
+        const match = /^pipe:\[(\d+)\]$/.exec(target);
+        return match ? [{ fd: Number(fd), type: "PIPE", inode: match[1]! }] : [];
+      });
+    } finally {
+      console.log(`descriptor_listing pid=${pid} closed_ENOENT_count=${closedDuringListing}`);
+    }
+  }
   expect(process.platform).toBe("darwin");
   const result = Bun.spawnSync(["lsof", "-nP", "-a", "-p", String(pid), "-FftdDin"], { stdout: "pipe", stderr: "pipe" });
   expect(result.exitCode).toBe(0);
```

### Description and deviations

pr-body-r4.md is based on the unchanged pr-body-r3.md, SHA-256 c685e73aaf97fbfce10f87a6d702d064bad29ab35c80e9cad6fe117e6e52a312, with a Linux continuous-integration correction section and this seat's final trailers. One historical round-2 timing table is shortened to a pointer to this committed historical record and that pinned prior description to stay below 60000 bytes, under the continuing description-size rule. Earlier numbers and logs are not rewritten. This is description-only condensation; there is no implementation or verification deviation.

The correction changes only test/phase3a/adversarial/descriptor-hygiene.test.ts and this build log. All production files, the harness, package files and assertions stay unchanged. Attribution checks and final custody occur after this commit and are reported in the new description/final report without changing the containing commit.

### Verbatim Addendum 12 text

```text
ADDENDUM 12 TO THE M23-M24 BUILDER PROMPT: the Linux descriptor listing. Paste this into the Codex session session:codex/m23-m24-r4, open in /Users/michaeldaley/builds/madventures-tui-m23-m24-r1. It is signed by the Founder and is part of the builder prompt, with Addenda 1 to 11.

1. The facts. The required check Verify, on ubuntu-24.04 in GitHub Actions, failed at 03b31247374cba31fc70f5fa64e018b1b62ec651, c4526065216ac86a0c10c1bbcba13b04e36486de and 4a6a67d3d5cc8c001e2d5a46dc153a3ad567f5ff, each time in with two PTY hosts and an adapter, no process holds a sibling's lifeline write end. In the Linux branch of descriptors() in test/phase3a/adversarial/descriptor-hygiene.test.ts, readlinkSync of an entry that readdirSync had just listed under /proc/PID/fd threw ENOENT, at line 22 of the file at 4a6a67d3d5cc8c001e2d5a46dc153a3ad567f5ff; one run read /proc/2771/fd/20. Every other test passed there: 1,870 pass, 1 fail. The macOS branch passes. This is a continuous-integration failure, not a review verdict, so it adds no correction round under plan section 11.3.
2. My ruling. I authorize one more commit, for this failure only.
   a. In the Linux branch of descriptors() in test/phase3a/adversarial/descriptor-hygiene.test.ts, an entry that readlinkSync reports as ENOENT is a descriptor that closed between the listing and the read: skip it and count it. Any other error still fails. Print the count for each listed process. Keep every assertion, and leave the macOS branch unchanged.
   b. Read test/phase3a/runtime-harness.ts near line 168 and any other place in the files of Tasks 51 to 55 that lists /proc entries and then reads each one. Where the same pattern exists, apply the same rule; where it does not, say so.
   c. Change no other file, except docs/verification/m23-m24-build-log.md, and no production file.
3. Verification, under the prompt's TEST OUTPUT rules and Addendum 9, item 5, with new log names that overwrite no existing log. This MacBook cannot run the Linux branch, so the Linux run in GitHub Actions after the push is its verification, which the Founder checks. Here: show git diff; bunx tsc --noEmit; bun test test/phase3a/adversarial/descriptor-hygiene.test.ts; bun test test/phase3a; and bare bun test, each with 0 fail; git diff --check; and git diff --name-only 4a6a67d3d5cc8c001e2d5a46dc153a3ad567f5ff, which lists only the paths of item 2. No RED run and no deliberate break is required for this commit; record that.
4. The commit. One commit on top of 4a6a67d3d5cc8c001e2d5a46dc153a3ad567f5ff, with the subject fix(phase3a): skip descriptors closed during the Linux listing, a body that names this addendum and the failure, and the trailers of your seat. Append a section Linux continuous-integration correction to docs/verification/m23-m24-build-log.md in the same commit.
5. The description. Save a full new description as /Users/michaeldaley/builds/m23-m24-r1-pr/pr-body-r4.md: pr-body-r3.md with a section Linux continuous-integration correction. Keep it under 60,000 bytes, with zero square brackets, zero bare three-hyphen lines, and the three trailers of your seat as its final paragraph. Run attribution-shape-check.sh in pr mode on the branch and in prbody mode on pr-body-r4.md.
6. Final report: the facts of item 2b with file and line; the git diff; each run with its counts, load reading and log SHA-256; the commit's full SHA and parent; the SHA-256 of pr-body-r4.md and of the build log; both attribution results; deviations, or the word none; and the single next decision for the Founder: push the commit without force and replace the pull request description.

Everything else in the builder prompt and Addenda 1 to 11 is unchanged.
```

### Final local scope receipt

After the required tests, git diff --check exited 0. git diff --name-only 4a6a67d3d5cc8c001e2d5a46dc153a3ad567f5ff listed exactly test/phase3a/adversarial/descriptor-hygiene.test.ts and docs/verification/m23-m24-build-log.md. The original macOS/test suffix and pre-Linux prefix were checked byte-identical, the gated Linux test file hash remained a48a3fe4580b8c4654d5de1da25ad2725b88e76065ab69a88ef623153bdd244b, and the harness and lock hashes remained unchanged. Log r4-linux-scope-run1.log, exit 0, SHA-256 84bd5e60b7f259b772ce657a6a01a624d5756a783fd0e022c0c43e9734b250ff. No implementation or verification deviation occurred.
