# Hardening F build log

Authority: DEC-20261104-02 B3, as Addendum 1 to DEC-20261104-02 (SHA-256
`eb5bee7bf4c0c6564b0653ab89029fa32a1c7adc2566137ccf8a92835c965723`) amends
its item 2 and its gates and halts, DEC-20261104-01 B7, DEC-20261103-01 B4,
DEC-20261102-02 B4, DEC-20261013-03 B2 item 2 and B4, and DEC-20261023-01
Part B. Builder: session:claude-code/hardening-f-r1, role builder,
execution surface claude-code, on the Founder's Ubuntu PC. No GitHub
operation, MCP server, other agent, subagent, skill, plugin, memory lookup
or host installation was used. The only network commands were
`git fetch origin main` and `bun install --frozen-lockfile`.

Logs are under `/home/michaeldaley/builds/hardening-f-r1-pr/logs/` on the
Ubuntu PC, one file per run, each named for its step and run. Each run's
combined output went through `tee` into its log. The `uptime` reading
taken immediately before each run is in `uptime-readings.txt` in the same
folder (SHA-256
`73d0e422854806559e754038c810574ec18c4ab10d3845956d1ed09b249809af`) and was
printed in the session before the run. Exit statuses are those of the
command itself. Before each log was hashed, a count-only scan for
credential-shaped strings ran over it; every count was 0.

## The item

DEC-20261104-02 B3 item 2, as Addendum 1 B2 amends it, in
`packages/pty-host/test/signals.test.ts` only:

- "termination_started is emitted within 500 ms" prints one line,
  `signals termination_started_ms=<elapsed>`, after `elapsed` is measured
  and before the assertions on it.
- "a child ignoring SIGTERM is SIGKILLed after the 2 s grace" records, as
  the new constant `started`, the time on `performance.now()` from `t0` to
  the return of its existing wait for `termination_started`. After `total`
  is measured and before the assertions on it, it prints one line,
  `signals sigterm_ignored termination_started_ms=<started> exited_ms=<total> grace_ms=<grace>`,
  where `<grace>` is `<total>` less `<started>`.
- Each value is printed with `toFixed(2)`. No assertion, timeout, wait or
  other behavior changes, and the host's `grace_waited` is not used
  (Addendum 1 B1).

Built on commit `03e9efec79eaeacb0ff185e2d84cf94a14aa46e6`, the merge of
pull request 223.

Files changed:

- `packages/pty-host/test/signals.test.ts`
- `docs/verification/hardening-f-build-log.md` (new, this file)

## Preconditions

Working directory `/home/michaeldaley/builds/madventures-tui-hardening-f-r1`,
branch `build/hardening-f-r1`, HEAD and fetched `origin/main` both
`03e9efec79eaeacb0ff185e2d84cf94a14aa46e6`, so no path changed between
them. The tree was clean and this log did not exist. Git identity
`daley40-lab`, `293512385+daley40-lab@users.noreply.github.com`.
`uname -sm` prints `Linux x86_64`.

Every authority file has the SHA-256 the builder prompt gives:
Addendum 1 to DEC-20261104-02, read from the read-only copy at
`/home/michaeldaley/builds/hardening-f-r1-pr/DEC-20261104-02-addendum-1-grace-interval.md`,
`eb5bee7bf4c0c6564b0653ab89029fa32a1c7adc2566137ccf8a92835c965723`; and on
`origin/main` DEC-20261104-02
`011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5`,
DEC-20261104-01 `db58159e4802a1839e126a0fbffbbc1a53c1db73faddcb3e1efb982bc23e0240`,
DEC-20261103-01 `43dc423e060b0e7ae04a0e7a0c302a5e38497cc212d704a5a37421d78aa1dd3a`,
DEC-20261102-02 `04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550`,
DEC-20261013-03 `249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7`,
DEC-20261023-01 `bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5`,
the plan `400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2`
and `AGENTS.md` `0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca`.
Each act and the addendum has Status ISSUED and the Founder's signature.

At the base, in `packages/pty-host/test/signals.test.ts`:

- "termination_started is emitted within 500 ms" is lines 196 to 210; it
  measures `elapsed` at line 203 and asserts it at line 205;
- "a child ignoring SIGTERM is SIGKILLed after the 2 s grace" is lines 213
  to 247; its wait for `termination_started` is line 227, it measures
  `total` at line 229 and asserts it at lines 241 and 242;
- the file contains `console.` 0 times.

In `packages/pty-host/src/signals.ts`, read and not changed,
`terminateChildGroup` emits `termination_started` at line 132, sends
SIGTERM to the group at line 138 and sets `graceWaited` at line 159.

Runtime check (`command -v bun`, `sha256sum` of it, `bun --version` and
`Bun.revision`, under the per-command `PATH` of DEC-20261013-03 B4): every
check returned `/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun`,
SHA-256 `0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb`,
version `1.4.1`, revision `69cb78c9097cebd3bdb832d9fff8b7d23abce09e`. It
ran before the baseline, at the start of the final gates (before the first
run of the changed test file), and before each final bare `bun test`.
Every runtime-check log has SHA-256
`cd0d411abc4e3a50d355cbd5e14a4474843027b827c5df9bdff5cbdc0f51f326`.

`bun.lock` SHA-256 before install, after install and after every later
run: `34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0`.
Install set the executable bit on `packages/founder-act/src/main.ts`;
`git checkout` restored it once. That is not a finding.

## Baseline

Each once, in the foreground, at the base:

| Log | Command | Load (1 min) | Exit | Result | Log SHA-256 |
| --- | --- | --- | --- | --- | --- |
| baseline-00-runtime-check | runtime check | 0.28 | 0 | matches | `cd0d411abc4e3a50d355cbd5e14a4474843027b827c5df9bdff5cbdc0f51f326` |
| baseline-01-bun-install | `bun install --frozen-lockfile` | 0.24 | 0 | 53 packages, `bun.lock` unchanged | `841e4b99372e1141f5f86bcaf71d76871ef251c8b5417b79f7c1c9c38382199e` |
| baseline-02-tsc | `bun x tsc --noEmit` | 0.28 | 0 | no output | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| baseline-03-pty-host | `bun test packages/pty-host` | 0.25 | 0 | 50 pass, 0 fail, 817 expect() calls, 7 files | `c2108859855505da6744bcba7cb96c2afffeafeecf9c87f7b5ee0534c389e7d1` |
| baseline-04-bun-test-full | bare `bun test` | 0.24 | 0 | 1902 pass, 0 fail, 20153 expect() calls, 140 files | `3e8428054b9fab55bb8a20ea6105d6e8d963c0cd2a3d5460ef93aef754b96a3a` |

No baseline run failed, and no error stopped a suite.

## The change

In `packages/pty-host/test/signals.test.ts` only, five added lines and
nothing else:

```text
@@ test("termination_started is emitted within 500 ms"
     const elapsed = performance.now() - t0;
+    console.log(`signals termination_started_ms=${elapsed.toFixed(2)}`);
     expect(ts.kind).toBe("termination_started");
@@ test("a child ignoring SIGTERM is SIGKILLed after the 2 s grace"
     await s.waitForFact((f) => f.kind === "termination_started", 2000);
+    const started = performance.now() - t0;
     const exited = await s.waitForFact((f) => f.kind === "exited", 8000);
     const total = performance.now() - t0;
+    console.log(
+      `signals sigterm_ignored termination_started_ms=${started.toFixed(2)} exited_ms=${total.toFixed(2)} grace_ms=${(total - started).toFixed(2)}`,
+    );
```

Each line is printed before every assertion of its test. No new test was
added: the change adds output and changes no assertion, as DEC-20261104-02
B3 item 2 says.

## Final gates (DEC-20261104-02 B3 item 4, with Addendum 1 B3)

Each once, in order, in the foreground, after the change:

| Log | Command | Load (1 min) | Exit | Result | Log SHA-256 |
| --- | --- | --- | --- | --- | --- |
| final-01-runtime-check | runtime check | 0.16 | 0 | matches | `cd0d411abc4e3a50d355cbd5e14a4474843027b827c5df9bdff5cbdc0f51f326` |
| final-02-tsc | `bun x tsc --noEmit` | 0.16 | 0 | no output | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| final-03-signals-run1 | `bun test packages/pty-host/test/signals.test.ts` | 0.21 | 0 | 5 pass, 0 fail, both lines | `8f8b9a6f3271a76e5bd4c11b7ac1a4704c76f70e62d58576d4b24f4759ba288d` |
| final-03-signals-run2 | `bun test packages/pty-host/test/signals.test.ts` | 0.25 | 0 | 5 pass, 0 fail, both lines | `e2924198baa15123a929e2cf5dc05f5c74649e9f142bae91207ea995cce5896a` |
| final-03-signals-run3 | `bun test packages/pty-host/test/signals.test.ts` | 0.23 | 0 | 5 pass, 0 fail, both lines | `be00957424ef75ed3ea6cbee9d6886e45e20ca79e3e0ea293c3bc4a393f99a6d` |
| final-03-signals-run4 | `bun test packages/pty-host/test/signals.test.ts` | 0.22 | 0 | 5 pass, 0 fail, both lines | `a952d1c0985325eb1de7527c81576e494425f6554f4b0e3298f1917e7fe01303` |
| final-03-signals-run5 | `bun test packages/pty-host/test/signals.test.ts` | 0.20 | 0 | 5 pass, 0 fail, both lines | `29cb8658001dfab81e37c6e787d057fb99dd2fb69532589a3b93b44f6ea12d11` |
| final-04-pty-host | `bun test packages/pty-host` | 0.24 | 0 | 50 pass, 0 fail, 819 expect() calls, 7 files | `f8477b46451a3346d021b152fbb6b17d75d01a83eeede8b4db72ce709f267e49` |
| final-05-phase3a | `bun test test/phase3a` | 0.50 | 0 | 156 pass, 0 fail, 4315 expect() calls, 18 files | `98cd1334679cf17b56847595181dd7ec99d82241c4c48d41d662da0f3f13eb9f` |
| final-06-runtime-check-before-full-run1 | runtime check | 0.50 | 0 | matches | `cd0d411abc4e3a50d355cbd5e14a4474843027b827c5df9bdff5cbdc0f51f326` |
| final-07-bun-test-full-run1 | bare `bun test` | 0.50 | 0 | 1902 pass, 0 fail, 20152 expect() calls, 140 files | `f7b6e66b44b2d064639b91b6388a16819be73bf7f6ee1a4bfb074f6e1c20036b` |
| final-06-runtime-check-before-full-run2 | runtime check | 0.30 | 0 | matches | `cd0d411abc4e3a50d355cbd5e14a4474843027b827c5df9bdff5cbdc0f51f326` |
| final-07-bun-test-full-run2 | bare `bun test` | 0.30 | 0 | 1902 pass, 0 fail, 20154 expect() calls, 140 files | `b9f759d7cb3a2aeba40f46c054983d1feb9d889ee4a450fc0efaba2d358c4469` |
| final-06-runtime-check-before-full-run3 | runtime check | 0.46 | 0 | matches | `cd0d411abc4e3a50d355cbd5e14a4474843027b827c5df9bdff5cbdc0f51f326` |
| final-07-bun-test-full-run3 | bare `bun test` | 0.46 | 0 | 1902 pass, 0 fail, 20152 expect() calls, 140 files | `bed83891464b87b7a60052adf0cd9f098afdddf6e1edf3116bc878bd0f2da783` |
| final-08-diff-check | `git diff --check 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6` | 0.15 | 0 | no output | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| final-09-diff-name-only | `git diff --name-only 03e9efec79eaeacb0ff185e2d84cf94a14aa46e6` | 0.15 | 0 | `packages/pty-host/test/signals.test.ts` | `360a463262a1824be2d546ee86f4d2218896251e0622be5249a3b71eeb56018f` |

Every test run ended with zero failures. The first load average of every
run was below 2.0. Log final-09 lists only
`packages/pty-host/test/signals.test.ts`, a path of DEC-20261104-02 B3
item 3; this log was written after the gates and is the other path of
that item.

## The five runs of the changed test file

Both printed lines, quoted from each log:

Run 1, log `final-03-signals-run1.log`, SHA-256
`8f8b9a6f3271a76e5bd4c11b7ac1a4704c76f70e62d58576d4b24f4759ba288d`:

```text
signals termination_started_ms=20.09
signals sigterm_ignored termination_started_ms=0.48 exited_ms=2023.38 grace_ms=2022.89
```

Run 2, log `final-03-signals-run2.log`, SHA-256
`e2924198baa15123a929e2cf5dc05f5c74649e9f142bae91207ea995cce5896a`:

```text
signals termination_started_ms=20.17
signals sigterm_ignored termination_started_ms=0.49 exited_ms=2025.09 grace_ms=2024.59
```

Run 3, log `final-03-signals-run3.log`, SHA-256
`be00957424ef75ed3ea6cbee9d6886e45e20ca79e3e0ea293c3bc4a393f99a6d`:

```text
signals termination_started_ms=20.09
signals sigterm_ignored termination_started_ms=0.52 exited_ms=2021.47 grace_ms=2020.95
```

Run 4, log `final-03-signals-run4.log`, SHA-256
`a952d1c0985325eb1de7527c81576e494425f6554f4b0e3298f1917e7fe01303`:

```text
signals termination_started_ms=20.20
signals sigterm_ignored termination_started_ms=0.48 exited_ms=2020.67 grace_ms=2020.20
```

Run 5, log `final-03-signals-run5.log`, SHA-256
`29cb8658001dfab81e37c6e787d057fb99dd2fb69532589a3b93b44f6ea12d11`:

```text
signals termination_started_ms=0.53
signals sigterm_ignored termination_started_ms=0.45 exited_ms=2023.22 grace_ms=2022.77
```

`grace_ms` by run: 2022.89, 2024.59, 2020.95, 2020.20 and 2022.77. None is
below 2000, so the halt of Addendum 1 B3 did not occur. Every
`termination_started_ms` is below 500.

The same two lines were also printed in the other runs that include the
file:

- `final-04-pty-host.log`: `termination_started_ms=20.18`; then
  `termination_started_ms=0.41 exited_ms=2023.47 grace_ms=2023.05`.
- `final-07-bun-test-full-run1.log`: `termination_started_ms=20.08`; then
  `termination_started_ms=0.45 exited_ms=2021.22 grace_ms=2020.77`.
- `final-07-bun-test-full-run2.log`: `termination_started_ms=20.16`; then
  `termination_started_ms=0.63 exited_ms=2024.46 grace_ms=2023.84`.
- `final-07-bun-test-full-run3.log`: `termination_started_ms=20.10`; then
  `termination_started_ms=0.46 exited_ms=2028.38 grace_ms=2027.91`.

## Observations

- The expect() count of `bun test packages/pty-host` was 817 at the
  baseline and 819 in the final gate, and the bare suite's was 20153,
  20152, 20154 and 20152. `signals.test.ts` made 13 expect() calls in each
  of its five runs. `packages/pty-host/test/main-guard.test.ts` lines 1126
  to 1128 assert once per observed kill, and its comment calls that count
  "a grace-race detail", so the total varies from run to run. This build
  does not change that file.

## Deviations

None from the acts or the builder prompt. How two instructions were read:

1. The prompt orders a runtime check before each final bare `bun test`,
   and its gate list orders "the runtime check again" before the three
   bare runs. Both were met: logs final-06 run1 to run3, with no test run
   between the three bare runs.
2. `git diff --check` and `git diff --name-only` against the base ran as
   gates before this log existed (logs final-08 and final-09). They were
   run again after the commit so that they also cover this file; those
   results are in the pull request description and the builder's final
   report, not here, since this file cannot record a check of itself.

## Limitations

- The printed values are what the test observes on its own clock, through
  its own fact waits, not the host's own measurements. Each wait resolves
  either when the stdout reader wakes it or on its 20 ms re-check
  (`signals.test.ts` lines 85 to 89 and 111 to 135). Reading that code, a
  wake that does not satisfy a waiter removes it from the wake list, after
  which only the 20 ms re-check satisfies it. That is the likely reason
  test 1 printed about 20 ms in four of five runs and 0.53 ms in one; no
  run here demonstrates it. The same latency can enter `started` and
  `exited` in test 2, so `grace_ms` carries up to about 20 ms of test-side
  observation latency at each end.
- `grace_ms` runs from the moment the test sees `termination_started`,
  which the host emits just before it sends SIGTERM (Addendum 1 B2), to
  the moment the test sees `exited`. The host's `grace_waited` is not
  printed (Addendum 1 B1).
- No assertion checks `grace_ms`; the change adds none. The bound of
  Addendum 1 B3 was checked by reading the five gate logs above.

## Not run

- This host does not run the macOS branch of any test; Verify (macOS)
  does.
- Verify, Verify (macOS) and code-review on GitHub, and the Tier-2 review
  of DEC-20261104-02 B3 item 5.

## Halts

None.
