# Bun.Terminal Dual-Host Spike Report — Intel iMac

Task 39 §6.5 host-authored report. Generated on this host on 2026-08-22T04:23:35Z by the
Task 39 report generator (operator: Founder), exclusively from this host's own
retained run evidence listed at the end; the generator fail-closes on any
missing evidence, non-empty status, lockfile drift, test failure, or criteria
shortfall, and wrote this report only because none occurred.

Candidate SHA: 56435bfe61978abed2cbcdb9b6c4e52550dc222d
Branch: claude/new-session-iy03t7 (host worktree detached at the candidate)
Worktree state: clean at every capture — `git status --porcelain` empty before install, after install, and after all runs; `git diff -- bun.lock package.json` empty
Bun path: /Users/michaeldaley/.bun/bin/bun
Bun version: 1.3.14
Bun binary SHA-256: ea2f223e94bb2f4bf3050895113c3cf346438f6fa0501c8532284e063f72f7a0
Architecture: x86_64
macOS: 13.7.8 (build 22H730)
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

Run 1: 29 pass / 0 fail / 161 expect() calls — Ran 29 tests across 2 files. [13.72s]
Run 2: 29 pass / 0 fail / 161 expect() calls — Ran 29 tests across 2 files. [13.77s]
Run 3: 29 pass / 0 fail / 161 expect() calls — Ran 29 tests across 2 files. [14.23s]

Three consecutive complete passing runs; no retries.

## Each criterion and measured timing (verbatim, per run)

[spike] host=darwin/x64 bun=1.3.14
[spike] pty_tty_allocation=9ms(pass) exact_binary_io=0ms(pass) resize_propagation=14ms(pass) process_group_and_signals=43ms(pass) child_and_grandchild_termination=38ms(pass) two_ptys_plus_adapter_no_leak=0ms(pass) supervisor_exit_modes=2124ms(pass) lifeline_eof=88ms(pass) pty_host_death=81ms(pass) sigstop_wedged_direct_pgid=292ms(pass) child_ignores_sigterm=748ms(pass) clean_exit_reporting=2078ms(pass) measured_timing=2124ms(pass)

[spike] host=darwin/x64 bun=1.3.14
[spike] pty_tty_allocation=3ms(pass) exact_binary_io=1ms(pass) resize_propagation=2ms(pass) process_group_and_signals=37ms(pass) child_and_grandchild_termination=38ms(pass) two_ptys_plus_adapter_no_leak=1ms(pass) supervisor_exit_modes=2132ms(pass) lifeline_eof=87ms(pass) pty_host_death=109ms(pass) sigstop_wedged_direct_pgid=290ms(pass) child_ignores_sigterm=739ms(pass) clean_exit_reporting=2106ms(pass) measured_timing=2132ms(pass)

[spike] host=darwin/x64 bun=1.3.14
[spike] pty_tty_allocation=7ms(pass) exact_binary_io=1ms(pass) resize_propagation=2ms(pass) process_group_and_signals=40ms(pass) child_and_grandchild_termination=76ms(pass) two_ptys_plus_adapter_no_leak=0ms(pass) supervisor_exit_modes=2129ms(pass) lifeline_eof=92ms(pass) pty_host_death=101ms(pass) sigstop_wedged_direct_pgid=292ms(pass) child_ignores_sigterm=738ms(pass) clean_exit_reporting=2108ms(pass) measured_timing=2129ms(pass)

All thirteen criteria pass in each run; measured timings are the `<criterion>=<ms>` values above, against the §9.8 deadline table (ack 250 ms, escalation 500 ms, responsive-child grace 2000 ms, outer bound 5000 ms).

## Typecheck

`bunx tsc --noEmit`: (no output — zero TypeScript errors)

## Failures, retries, warnings, residual risks

Failures: none (0 fail in every run; no [spike] FAIL block). Retries: none — runs 1–3 ran consecutively in one session.
Warnings: none found in the run logs.
Residual risks: none observed in this host's retained evidence beyond what the sections above record.

## Retained source evidence on this host (`~/m17-task39-evidence-imac-20260822T042333Z`)

- `env.txt` SHA-256 `c6cb6babb84f46674a5896ceb95327169db1a73fb2197aa83c6ba737c118854e`
- `install.txt` SHA-256 `6749cc516bb2371d663176b14347a01ab87a665d44daabc9f705c0a8a6d65235`
- `run-1.txt` SHA-256 `d94c0d5a0e882f3efe3c3b4ff21162bcf5a5a2e72a470721ce7202a346a02ed7`
- `run-2.txt` SHA-256 `91616d2240f402e65fcfcba96997588ccbe934c0cdb62373e67d1c20a4f1fbff`
- `run-3.txt` SHA-256 `512545b75e06527c9ade979129f3e233291e46adcd13843d4cf8839b726b0ad9`
- `typecheck.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `status-before.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `status-after-install.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `lockdiff.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `status-final.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
Report SHA-256: 480b0f96f7bddf4b2a8272774a44a23e3bb11f97521d16f72fa21744836d10de
