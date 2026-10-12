# Bun.Terminal Spike Report — Founder's Ubuntu PC

`DEC-20261011-02` B5 host-authored report. Generated on this host on 2026-10-11T23:09:58Z by the
run script (SHA-256 `7fa843bc930207253c8e438051d1afb23517e29895d6bb59f71cb73d4626240c`, operator: Founder), exclusively from this host's own
retained run evidence listed at the end; the script writes no report if any item of B4 falls short,
and wrote this report only because none did. This is not a Task 39 report.

Candidate SHA: 0184a80d5ddefcfa89a97f8634234f4e59d1b3ae
Branch: main (fresh clone at `/home/michaeldaley/madventures-tui-ubuntu-spike-run`, detached at `origin/main`)
Worktree state: clean after clone, clean after install once the mode restore in the note below was applied, and clean at the end; `git diff -- bun.lock package.json` empty
Bun path: /home/michaeldaley/.bun/bin/bun
Bun version: 1.4.2
Bun revision: 744846f844374847c902b5e7fd59b4342a51ef99
Bun binary SHA-256: a83d263767d839e4d2649ca8e35d07159c7afc99afdc96d731ced29e056dda0c
Architecture: x86_64
Distribution: Ubuntu 26.04.1 LTS
Kernel: 7.0.0-38-generic
TERM: xterm-ghostty
Shell: /bin/bash
Node on PATH: /usr/bin/node
Note: `bun install` turned `packages/founder-act/src/main.ts` to mode 100755; the run restored 100644 (DEC-20261011-02 B4 item 2).

## Exact commands

1. git clone https://github.com/MADVenturesLLC/madventures-tui.git <worktree>
2. git checkout --detach origin/main
3. bun install --frozen-lockfile
4. environment capture (`uname -m`, `uname -r`, `PRETTY_NAME` from `/etc/os-release`, `command -v bun`, `bun --version`, `Bun.revision`, `sha256sum <bun>`, `$TERM`, `$SHELL`, `command -v node`)
5. `bun test test/phase3a` — run 1 of three consecutive runs
6. `bun test test/phase3a` — run 2 of three consecutive runs
7. `bun test test/phase3a` — run 3 of three consecutive runs
8. `bunx tsc --noEmit`
9. `bun test` (full suite, once)
10. diagnostics of DEC-20261011-02 B3, items 1 to 6
11. `git status --porcelain`

## Runs and complete counts

Run 1: 60 pass / 0 fail / 597 expect() calls — Ran 60 tests across 3 files. [16.83s]
Run 2: 60 pass / 0 fail / 597 expect() calls — Ran 60 tests across 3 files. [16.73s]
Run 3: 60 pass / 0 fail / 597 expect() calls — Ran 60 tests across 3 files. [16.83s]

Three consecutive complete passing runs; no retries.

## Each criterion and measured timing (verbatim, per run)

[spike] host=linux/x64 bun=1.4.2
[spike] pty_tty_allocation=9ms(pass) exact_binary_io=1ms(pass) resize_propagation=3ms(pass) process_group_and_signals=9ms(pass) child_and_grandchild_termination=11ms(pass) two_ptys_plus_adapter_no_leak=1ms(pass) supervisor_exit_modes=2047ms(pass) lifeline_eof=32ms(pass) pty_host_death=38ms(pass) sigstop_wedged_direct_pgid=274ms(pass) child_ignores_sigterm=711ms(pass) clean_exit_reporting=2039ms(pass) measured_timing=2047ms(pass)

[spike] host=linux/x64 bun=1.4.2
[spike] pty_tty_allocation=9ms(pass) exact_binary_io=1ms(pass) resize_propagation=4ms(pass) process_group_and_signals=9ms(pass) child_and_grandchild_termination=11ms(pass) two_ptys_plus_adapter_no_leak=1ms(pass) supervisor_exit_modes=2044ms(pass) lifeline_eof=32ms(pass) pty_host_death=37ms(pass) sigstop_wedged_direct_pgid=273ms(pass) child_ignores_sigterm=711ms(pass) clean_exit_reporting=2040ms(pass) measured_timing=2044ms(pass)

[spike] host=linux/x64 bun=1.4.2
[spike] pty_tty_allocation=9ms(pass) exact_binary_io=1ms(pass) resize_propagation=2ms(pass) process_group_and_signals=9ms(pass) child_and_grandchild_termination=11ms(pass) two_ptys_plus_adapter_no_leak=1ms(pass) supervisor_exit_modes=2053ms(pass) lifeline_eof=27ms(pass) pty_host_death=39ms(pass) sigstop_wedged_direct_pgid=270ms(pass) child_ignores_sigterm=711ms(pass) clean_exit_reporting=2042ms(pass) measured_timing=2053ms(pass)

All thirteen criteria pass in each run; measured timings are the `<criterion>=<ms>` values above, against the §9.8 deadline table (ack 250 ms, escalation 500 ms, responsive-child grace 2000 ms, outer bound 5000 ms).

## Typecheck

`bunx tsc --noEmit`: (no output — zero TypeScript errors)

## Full suite under DEC-20261011-02 B2

1580 pass / 3 fail / 13849 expect() calls — Ran 1583 tests across 98 files. [81.53s]

Every failure is an open test of DEC-20261011-02 A2, failing as A2 records:

- governed-child environment forwarding: exact key-set equality with the launch-frame env, ambient canary absent (C7 evidence 7) — the child environment lacked MADV_FIXTURE_MARKER
- natural child exit without a terminate command publishes an exact marker, drained, and exited exactly once — the observation timed out at 4,000 ms
- early child output cannot precede launched and ready, and is required, not merely allowed — the observation timed out at 4,000 ms

Open tests of A2 that passed in this run (recorded, not a stop):

- F1/F2: real run — mixed selection (governance_focus + ansi_flood) > packet records the flags the run actually used and references existing casts
- F1/F2: real run — excluding governance_focus > single ansi_flood run references its own cast, never a nonexistent one
- F1/F2: real run — ordinary fixture-only scenario > layout_resize-only run records only the base fixture flag

## Diagnostics of DEC-20261011-02 B3 (verbatim)

1. `command -v node`, and `node --version` if found

```text
/usr/bin/node
v22.22.1
```

2. `bun packages/tui-chaos/src/cli.ts run --scenarios layout_resize --out /tmp/ubuntu-spike-harness-e3dmhzo0 --json`

```text
exit 0
standard error:
(empty)
```

3. `readlink -f /usr/bin/awk` and its version line

```text
/usr/bin/mawk
mawk 1.3.4 20260129
```

4. the test 4 fixture's Linux awk program under `env -i PATH=/usr/bin:/bin MADV_FIXTURE_MARKER=1`, reading `/proc/self/environ`

```text
exit 0
@@MADV_ENVKEYS PATH,MADV_FIXTURE_MARKER,@@
```

5. `readlink -f /bin/sh`

```text
/usr/bin/dash
```

6.1 `bun test packages/broker/test/pty-host-supervisor.test.ts -t <escaped name>` for: governed-child environment forwarding: exact key-set equality with the launch-frame env, ambient canary absent (C7 evidence 7)

```text
exit 1
bun test v1.4.2 (744846f84)

packages/broker/test/pty-host-supervisor.test.ts:
1353 |     // ENVIRON is the raw inherited environment, so every observed key must
1354 |     // come from descriptor.env. An empty env fails against a non-empty
1355 |     // allowlist by construction.
1356 |     const observedKeys = [...new Set((markerPayload as string).split(",").filter((k) => k.length > 0))].sort();
1357 |     const expectedKeys = [...new Set(Object.keys(allowlisted))].sort();
1358 |     expect(observedKeys).toEqual(expectedKeys);
                                ^
error: expect(received).toEqual(expected)

  [
-   "MADV_FIXTURE_MARKER",
    "PATH",
  ]

- Expected  - 1
+ Received  + 0

      at <anonymous> (/home/michaeldaley/madventures-tui-ubuntu-spike-run/packages/broker/test/pty-host-supervisor.test.ts:1358:26)
(fail) governed-child environment forwarding: exact key-set equality with the launch-frame env, ambient canary absent (C7 evidence 7) [15.46ms]

 0 pass
 26 filtered out
 1 fail
 3 expect() calls
Ran 1 test across 1 file. [23.00ms]
```

6.2 `bun test packages/pty-host/test/main-guard.test.ts -t <escaped name>` for: natural child exit without a terminate command publishes an exact marker, drained, and exited exactly once

```text
exit 1
bun test v1.4.2 (744846f84)

packages/pty-host/test/main-guard.test.ts:
155 |   async function waitForCondition(check: () => boolean, timeoutMs: number): Promise<void> {
156 |     const deadlineAt = performance.now() + timeoutMs;
157 |     while (!check()) {
158 |       const remaining = deadlineAt - performance.now();
159 |       if (remaining <= 0) {
160 |         throw new Error(`condition not observed within ${timeoutMs}ms`);
                        ^
error: condition not observed within 4000ms
      at waitForCondition (/home/michaeldaley/madventures-tui-ubuntu-spike-run/packages/pty-host/test/main-guard.test.ts:160:19)
      at async waitForFact (/home/michaeldaley/madventures-tui-ubuntu-spike-run/packages/pty-host/test/main-guard.test.ts:170:11)
      at async <anonymous> (/home/michaeldaley/madventures-tui-ubuntu-spike-run/packages/pty-host/test/main-guard.test.ts:362:14)
(fail) natural child exit without a terminate command publishes an exact marker, drained, and exited exactly once [4002.43ms]

 0 pass
 27 filtered out
 1 fail
Ran 1 test across 1 file. [4.01s]
```

6.3 `bun test packages/pty-host/test/main-guard.test.ts -t <escaped name>` for: early child output cannot precede launched and ready, and is required, not merely allowed

```text
exit 1
bun test v1.4.2 (744846f84)

packages/pty-host/test/main-guard.test.ts:
155 |   async function waitForCondition(check: () => boolean, timeoutMs: number): Promise<void> {
156 |     const deadlineAt = performance.now() + timeoutMs;
157 |     while (!check()) {
158 |       const remaining = deadlineAt - performance.now();
159 |       if (remaining <= 0) {
160 |         throw new Error(`condition not observed within ${timeoutMs}ms`);
                        ^
error: condition not observed within 4000ms
      at waitForCondition (/home/michaeldaley/madventures-tui-ubuntu-spike-run/packages/pty-host/test/main-guard.test.ts:160:19)
      at async waitForFact (/home/michaeldaley/madventures-tui-ubuntu-spike-run/packages/pty-host/test/main-guard.test.ts:170:11)
      at async <anonymous> (/home/michaeldaley/madventures-tui-ubuntu-spike-run/packages/pty-host/test/main-guard.test.ts:482:14)
(fail) early child output cannot precede launched and ready, and is required, not merely allowed [4013.60ms]

 0 pass
 27 filtered out
 1 fail
 3 expect() calls
Ran 1 test across 1 file. [4.02s]
```

## Failures, retries, warnings, residual risks

Failures: none in the phase3a runs or the typecheck; the full suite failed only as recorded above. Retries: none.
Residual risks: the open tests of DEC-20261011-02 A2 remain open; this report does not close any of them.

## Retained source evidence on this host (`/home/michaeldaley/ubuntu-spike-evidence`)

- `clone.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `diag-2-harness-stderr.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `diag-2-harness-stdout.txt` SHA-256 `fbb151b13a2bb5ffbf8e2931ea2517b3051eedf53fb85d460263b6e3c1ea4f17`
- `diag-6-1.txt` SHA-256 `113b9f3009865783048cb2ac62be7e2ccc69fc5ae53a4b6aa98c07d6785623e4`
- `diag-6-2.txt` SHA-256 `ea6b1c087cb060c48f2b7ff9e7bcf6b2c5521f2029dbe1e9b24b954ef824f0ee`
- `diag-6-3.txt` SHA-256 `58faab43d0b966c3509a1b68db7241c52f61721edcb94750659374da26345b9d`
- `diagnostics.txt` SHA-256 `0c68edb6477ddbbb9dbe9332b1aa67616aab1be5dbd4be848ffc20de0e23a179`
- `env.txt` SHA-256 `4b943b4b53ecb05d0abdc7a1e17ba1c6bf01e0768969ab248bf51c924f2d3c0d`
- `full-suite.txt` SHA-256 `beb6b13a913bf3b9258cbf8da58846df1b9943068c5a9eb6f3764061a1abd620`
- `install.txt` SHA-256 `700dc755d20b1f3a66069b87c668fb0dae0b1594bc8b0ffb30366dea96d67744`
- `lockdiff.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `mode-restored.txt` SHA-256 `73cb579f330d455e82b7729fb2477ec25356205c914e53361d199f68163c71a9`
- `node-before-install.txt` SHA-256 `9eb111a28bec5aa688a6bb09ff3645089b344a4ffe2e339fdcfab3d5401519dd`
- `run-1.txt` SHA-256 `9c262fa958b5c03c5503b7bdc49c4afb222b2dc70254969c476baf6b3d5e0a57`
- `run-2.txt` SHA-256 `332ddf9c8721010c6daff593351ac14e02ff97082dfdfa073f07733966b1c8df`
- `run-3.txt` SHA-256 `1b8cd1c065d54b29085db5e43900d9e7139f521c62cbd298af0a97f75bc175e6`
- `run-start.txt` SHA-256 `edc1a930fc765375dd0b0c6183b9bfcbd39f8d2a81d14ee81b0be4593007edc9`
- `status-after-install.txt` SHA-256 `3955bb1ba4c194b057881b6fa0b570996de5c14d6d133dad8711a94b218f7491`
- `status-after-restore.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `status-before.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `status-final.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `typecheck.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
Report SHA-256: 2106e3371468b97318dc34d7d88220ccaba8597664caf997f786358dac265cf9
