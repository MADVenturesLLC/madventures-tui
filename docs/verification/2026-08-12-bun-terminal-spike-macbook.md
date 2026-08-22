# Bun.Terminal Dual-Host Spike Report — Apple Silicon MacBook

Task 39 §6.5 host-authored report. Generated on this host on 2026-08-22T04:19:08Z by the
Task 39 report generator (operator: Founder), exclusively from this host's own
retained run evidence listed at the end; the generator fail-closes on any
missing evidence, non-empty status, lockfile drift, test failure, or criteria
shortfall, and wrote this report only because none occurred.

Candidate SHA: 56435bfe61978abed2cbcdb9b6c4e52550dc222d
Branch: claude/new-session-iy03t7 (host worktree detached at the candidate)
Worktree state: clean at every capture — `git status --porcelain` empty before install, after install, and after all runs; `git diff -- bun.lock package.json` empty
Bun path: /Users/michaeldaley/.bun/bin/bun
Bun version: 1.3.14
Bun binary SHA-256: e0c90ec15d33363e6b70713d56bc3b2c7585c17f40a0fe0f8fd9305901d4e233
Architecture: arm64
macOS: 26.6.1 (build 25G76)
TERM: xterm-256color
Shell: /bin/zsh

## Exact commands

1. `git worktree add --detach <worktree> 56435bfe61978abed2cbcdb9b6c4e52550dc222d`
2. environment capture (`uname -m`, `sw_vers`, `command -v bun`, `bun --version`, `shasum -a 256 <bun>`, `$TERM`, `$SHELL`, `git rev-parse HEAD`)
3. `git status --porcelain`
4. `bun install --frozen-lockfile`
5. `git status --porcelain` and `git diff -- bun.lock package.json`
6. `bun test test/phase3a` — three consecutive runs
7. `bunx tsc --noEmit`
8. `git status --porcelain`

## Runs and complete counts

Run 1: 29 pass / 0 fail / 161 expect() calls — Ran 29 tests across 2 files. [9.73s]
Run 2: 29 pass / 0 fail / 161 expect() calls — Ran 29 tests across 2 files. [9.61s]
Run 3: 29 pass / 0 fail / 161 expect() calls — Ran 29 tests across 2 files. [9.53s]

Three consecutive complete passing runs; no retries.

## Each criterion and measured timing (verbatim, per run)

[spike] host=darwin/arm64 bun=1.3.14
[spike] pty_tty_allocation=3ms(pass) exact_binary_io=1ms(pass) resize_propagation=2ms(pass) process_group_and_signals=27ms(pass) child_and_grandchild_termination=20ms(pass) two_ptys_plus_adapter_no_leak=0ms(pass) supervisor_exit_modes=2078ms(pass) lifeline_eof=50ms(pass) pty_host_death=48ms(pass) sigstop_wedged_direct_pgid=300ms(pass) child_ignores_sigterm=724ms(pass) clean_exit_reporting=2072ms(pass) measured_timing=2078ms(pass)

[spike] host=darwin/arm64 bun=1.3.14
[spike] pty_tty_allocation=3ms(pass) exact_binary_io=1ms(pass) resize_propagation=3ms(pass) process_group_and_signals=22ms(pass) child_and_grandchild_termination=21ms(pass) two_ptys_plus_adapter_no_leak=0ms(pass) supervisor_exit_modes=2074ms(pass) lifeline_eof=52ms(pass) pty_host_death=47ms(pass) sigstop_wedged_direct_pgid=296ms(pass) child_ignores_sigterm=722ms(pass) clean_exit_reporting=2058ms(pass) measured_timing=2074ms(pass)

[spike] host=darwin/arm64 bun=1.3.14
[spike] pty_tty_allocation=2ms(pass) exact_binary_io=1ms(pass) resize_propagation=3ms(pass) process_group_and_signals=23ms(pass) child_and_grandchild_termination=20ms(pass) two_ptys_plus_adapter_no_leak=0ms(pass) supervisor_exit_modes=2072ms(pass) lifeline_eof=48ms(pass) pty_host_death=48ms(pass) sigstop_wedged_direct_pgid=293ms(pass) child_ignores_sigterm=722ms(pass) clean_exit_reporting=2070ms(pass) measured_timing=2072ms(pass)

All thirteen criteria pass in each run; measured timings are the `<criterion>=<ms>` values above, against the §9.8 deadline table (ack 250 ms, escalation 500 ms, responsive-child grace 2000 ms, outer bound 5000 ms).

## Typecheck

`bunx tsc --noEmit`: (no output — zero TypeScript errors)

## Failures, retries, warnings, residual risks

Failures: none (0 fail in every run; no [spike] FAIL block). Retries: none — runs 1–3 ran consecutively in one session.
Warnings: none found in the run logs.
Residual risks: none observed in this host's retained evidence beyond what the sections above record.

## Retained source evidence on this host (`~/m17-task39-evidence-macbook-20260822T041906Z`)

- `env.txt` SHA-256 `d1ed7ee996e33eae3ffb5a0c329157ef44ff5cecbdd55f204384b372b30385fc`
- `install.txt` SHA-256 `1b0b39128f1a0a7869b571f28f25a9b2caffb78abd149dc1cbd2f527070b843d`
- `run-1.txt` SHA-256 `febeb46b17b65270c8a5c9a343c5fced26825b84f9ad2ebbf25a0e447bbf62b6`
- `run-2.txt` SHA-256 `eec38eda12f5fad2fbfaa8e7a1004aaa064c4f180beb025ff0a5090a41176774`
- `run-3.txt` SHA-256 `8ac4b35e4349fc91e8130edb8afb8e356be354b9f4a3f4e50febdd51cf6d268c`
- `typecheck.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `status-before.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `status-after-install.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `lockdiff.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `status-final.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
Report SHA-256: 5f22615409a0c878c077360502effbcce59904cdef376e894a14085de344bb04
