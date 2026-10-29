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
