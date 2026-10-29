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
