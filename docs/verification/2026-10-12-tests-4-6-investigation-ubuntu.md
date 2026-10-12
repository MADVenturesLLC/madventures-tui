# Tests 4 to 6 Investigation Report — Founder's Ubuntu PC

`DEC-20261012-02` B3 host-authored report, read with item 3 of the merge authorization for PR #139. Generated on this host on 2026-10-12T10:01:02Z
by the run script (SHA-256 `ab868ad7c35dc5af03e0f9e09ba0d0626b60cec847c7a3b5c0e69f15ca21d86f`, operator: Founder), exclusively from this host's own retained run evidence listed at the end.
Test results are recorded, not judged.

Candidate SHA: 95783dade386d3042f1209b051e8eea1504516dc
Branch: main (fresh clone at `/home/michaeldaley/madventures-tui-b7-run`, detached at `origin/main`)
Note: `bun install` turned `packages/founder-act/src/main.ts` to mode 100755; the run restored 100644 (DEC-20261011-02 B4 item 2).

## Runtimes

| Field | Stock | Custodied |
| --- | --- | --- |
| path | `/home/michaeldaley/.bun/bin/bun` | `/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun` |
| version | `1.4.2` | `1.4.1` |
| revision | `744846f844374847c902b5e7fd59b4342a51ef99` | `69cb78c9097cebd3bdb832d9fff8b7d23abce09e` |
| sha256 | `a83d263767d839e4d2649ca8e35d07159c7afc99afdc96d731ced29e056dda0c` | `0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb` |

Custody source: `MADVenturesLLC/os-governed-artifacts` tag `intake/bun-pr40304-69cb78c9097cebd3bdb832d9fff8b7d23abce09e/v1`, commit `3b5775a57da95ad6446e68036746b6308a0d5904`; `MANIFEST.sha256` verified (5 of 5 entries OK); binary extracted from `bun-linux-x64.zip` and called by full path only.

## Upstream facts (GitHub API, read-only)

- pr_title: `spawn: fire the Terminal exit callback when a detached child of an existing terminal exits`
- pr_state: `open`
- pr_merged: `False`
- pr_merge_commit: `None`
- anchor: `69cb78c9097cebd3bdb832d9fff8b7d23abce09e`
- release_tag: `bun-v1.4.2`
- release_published_at: `2026-09-05T05:55:48Z`
- release_commit: `744846f844374847c902b5e7fd59b4342a51ef99`
- release_contains_anchor: `no`
- stock_revision_contains_anchor: `no`

## Tests 4 to 6 run alone

| Runtime | Test | Run | Exit | Pass | Fail | Summary |
| --- | --- | --- | --- | --- | --- | --- |
| stock | 4 | 1 | 1 | 0 | 1 | Ran 1 test across 1 file. [21.00ms] |
| stock | 4 | 2 | 1 | 0 | 1 | Ran 1 test across 1 file. [20.00ms] |
| stock | 4 | 3 | 1 | 0 | 1 | Ran 1 test across 1 file. [20.00ms] |
| stock | 5 | 1 | 1 | 0 | 1 | Ran 1 test across 1 file. [4.01s] |
| stock | 5 | 2 | 1 | 0 | 1 | Ran 1 test across 1 file. [4.01s] |
| stock | 5 | 3 | 1 | 0 | 1 | Ran 1 test across 1 file. [4.01s] |
| stock | 6 | 1 | 1 | 0 | 1 | Ran 1 test across 1 file. [4.02s] |
| stock | 6 | 2 | 1 | 0 | 1 | Ran 1 test across 1 file. [4.02s] |
| stock | 6 | 3 | 1 | 0 | 1 | Ran 1 test across 1 file. [4.02s] |
| custodied | 4 | 1 | 1 | 0 | 1 | Ran 1 test across 1 file. [24.00ms] |
| custodied | 4 | 2 | 1 | 0 | 1 | Ran 1 test across 1 file. [20.00ms] |
| custodied | 4 | 3 | 1 | 0 | 1 | Ran 1 test across 1 file. [20.00ms] |
| custodied | 5 | 1 | 1 | 0 | 1 | Ran 1 test across 1 file. [4.01s] |
| custodied | 5 | 2 | 1 | 0 | 1 | Ran 1 test across 1 file. [4.01s] |
| custodied | 5 | 3 | 1 | 0 | 1 | Ran 1 test across 1 file. [4.01s] |
| custodied | 6 | 1 | 1 | 0 | 1 | Ran 1 test across 1 file. [4.03s] |
| custodied | 6 | 2 | 1 | 0 | 1 | Ran 1 test across 1 file. [4.02s] |
| custodied | 6 | 3 | 1 | 0 | 1 | Ran 1 test across 1 file. [4.02s] |

## Custodied runtime: phase3a and full suite

`bun test test/phase3a`: exit 0, 60 pass / 0 fail / 597 expect() calls — Ran 60 tests across 3 files. [17.79s]

[spike] host=linux/x64 bun=1.4.1
[spike] pty_tty_allocation=11ms(pass) exact_binary_io=1ms(pass) resize_propagation=4ms(pass) process_group_and_signals=9ms(pass) child_and_grandchild_termination=11ms(pass) two_ptys_plus_adapter_no_leak=1ms(pass) supervisor_exit_modes=2046ms(pass) lifeline_eof=33ms(pass) pty_host_death=38ms(pass) sigstop_wedged_direct_pgid=267ms(pass) child_ignores_sigterm=711ms(pass) clean_exit_reporting=2036ms(pass) measured_timing=2046ms(pass)

`bun test` (full suite): exit 1, 1580 pass / 3 fail / 13851 expect() calls — Ran 1583 tests across 98 files. [79.04s]

Failing tests:

- governed-child environment forwarding: exact key-set equality with the launch-frame env, ambient canary absent (C7 evidence 7)
- natural child exit without a terminate command publishes an exact marker, drained, and exited exactly once
- early child output cannot precede launched and ready, and is required, not merely allowed

## Exact commands

1. git clone https://github.com/MADVenturesLLC/madventures-tui.git <worktree>
2. git checkout --detach origin/main
3. bun install --frozen-lockfile (stock runtime)
4. stock runtime identity (path, --version, Bun.revision, SHA-256)
5. gh repo clone MADVenturesLLC/os-governed-artifacts <custody> -- --depth 1 --branch intake/bun-pr40304-69cb78c9097cebd3bdb832d9fff8b7d23abce09e/v1
6. sha256sum -c MANIFEST.sha256 (in the custody directory)
7. extract bun-linux-x64.zip into <custody>/qrt
8. custodied runtime identity (path, --version, Bun.revision, SHA-256)
9. upstream facts from the GitHub API (oven-sh/bun pull 40304, release 1.4.2, compare)
10. tests 4, 5 and 6 alone, 3 times each with the stock runtime, then 3 times each with the custodied runtime
11. custodied `bun test test/phase3a`
12. custodied `bun test` (full suite)
13. `git status --porcelain`

## Retained source evidence on this host (`/home/michaeldaley/ubuntu-b7-evidence`)

- `clone.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `custodied-full-suite.txt` SHA-256 `b12663908b25ffed1b08579c22617ea7ec1145541e33aa265f513fa0789fa5f2`
- `custodied-phase3a.txt` SHA-256 `e213bfc5de03a93395158519be86394dfd7a9f42a901135d528d9ae686de7930`
- `custody-clone.txt` SHA-256 `3210de08c7d147c4e7e477c601c6dfb6a9364156ab0542d69edba90c441755ff`
- `custody-manifest.txt` SHA-256 `c721d96ade864e3976bc6434a0d60dfeb71f46017b6465991abff8bbcd2af6e0`
- `install.txt` SHA-256 `10db030adb38e396079fd74bddb580e771d5676278a7bee3faca636fe882c78e`
- `run-start.txt` SHA-256 `a96e509de75b81c375c9fde6f2eba4b3de14abb8cab1290162fdd8d6ee9727f2`
- `runtimes.txt` SHA-256 `c3dc6fac105db3a8abcd4f46a48787121e8195432acacd1e86068c7429d4d7e6`
- `status-after-install.txt` SHA-256 `3955bb1ba4c194b057881b6fa0b570996de5c14d6d133dad8711a94b218f7491`
- `status-final.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `test4-custodied-1.txt` SHA-256 `c4f33847a766ff4c8bc453b498db6372f3bf8fc24ed06325a8daf5c9c816cf66`
- `test4-custodied-2.txt` SHA-256 `2fd1d41db201f6e198f2245004cd9bab324c3de96b4bec5ab858624544763974`
- `test4-custodied-3.txt` SHA-256 `08016f2e357d0421ff090822f45867514cb9fd02c4d0a41319f1a0cb3cc16d5d`
- `test4-stock-1.txt` SHA-256 `9deee7612a204086a07d8eb40666dd0ff628883d8cece2f822af86c36b9c1130`
- `test4-stock-2.txt` SHA-256 `d465504381274bf9d46b99e989c6a3480f4233ef15062f89bfc073cc9706ec7c`
- `test4-stock-3.txt` SHA-256 `7288c8f883e8799073b006e527ce0ebaa3b52266ace67ef47b54a2e55755f90c`
- `test5-custodied-1.txt` SHA-256 `dbe6688eb659930e9d3e59ad305dccc3eb5ec10fa761ec90ab971c232e0a66e7`
- `test5-custodied-2.txt` SHA-256 `cd080a42ac6d566caa092ee79209ef8c5246437646458de847e443b3a3a4c14b`
- `test5-custodied-3.txt` SHA-256 `0a14524827c9993d792cfa23c066d83b1d4403a65b0d0789e2caff07c60ff943`
- `test5-stock-1.txt` SHA-256 `8e097345811981685cc5e654e1c0865c68c6665cc43bad5e2de5301848abe0fe`
- `test5-stock-2.txt` SHA-256 `0c34ce6d745f486b3397234f3824e04f7764597c0ad1268991d1e1b2ac80e670`
- `test5-stock-3.txt` SHA-256 `6fbeb505395ac467b648dc57fcd83b90edcc11565e5f89aa0c9804338de1e17c`
- `test6-custodied-1.txt` SHA-256 `0ad269955a6c3921bea97b7ecd74188fbd2a82e1805de7fa3d36e3f44a5563ff`
- `test6-custodied-2.txt` SHA-256 `1905b828f6245291072e166df5aa6bf54022527ba33cadf9985a81e82ef3fa27`
- `test6-custodied-3.txt` SHA-256 `67ab2d212e027beb813251a01f6f4d02fa940dac13cf779a7fb7fd0ee5020839`
- `test6-stock-1.txt` SHA-256 `fd18f1849e9de37a794578e437cdbe1c0a0804cd1a59a232ca389bab415eabd1`
- `test6-stock-2.txt` SHA-256 `17c7fd6681f2054e015f42a657e7c329da81c92aecce53aa80425788bae6eeab`
- `test6-stock-3.txt` SHA-256 `ea83d01c5520875cb25ec7a43f23ae5b154a0667905c8b6e6f4a8391093015e6`
- `upstream.txt` SHA-256 `f8912d02ba96774103c3acd44b5d176a87e92317a8754e531d85d868a267e177`
Report SHA-256: 3c3c5b89d4a180787aff6f41783931aa3e1dc1acd14d9fd3e85e65a21653e449
