# DEC-20261016-05 — Help-probe scope correction and authorization for completion of Antigravity re-investigation

Act identifier: `FOUNDER-ACT-20261016-TASK56-HELP-SCOPE-CORRECTION`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The re-investigation stop under `DEC-20261016-04`.** Under `DEC-20261016-04`, a builder session on the Antigravity surface on my MacBook (`session:antigravity/m25-task56-r2`) initiated the re-investigation of the replaced binary `/Users/michaeldaley/.local/bin/agy` (SHA-256 `a4502aaf310b2fd6eb657fcfec2fcc31a690fbbd0c2d14c8eefbb556409024ce`, version `1.4.0`) in `/Users/michaeldaley/madventures-tui-m25-task56-r1`. It verified the preconditions and baseline tests, then executed the Step 3 probe sequence. In that sequence, following `DEC-20261016-04` B3 and the minimum list of `DEC-20261016-03` B3:
- Top-level help forms `agy --help`, `agy -h`, and `agy help` ran (all exited 0 and printed usage to stderr).
- Subcommand help forms ran across the twelve subcommands listed in `agy --help` (`agent`, `agents`, `changelog`, `help`, `install`, `mcp`, `mic-serve`, `models`, `plugin`, `plugins`, `remote-control`, `update`).
- Twelve help forms across `mcp add`, `mcp remove`, `mcp enable`, and `mcp disable` ran (`--help`, `-h`, and `help mcp <subcommand>`), plus three forms for `mcp list`. All exited 0 and printed usage without modifying state.
- Eight help forms across `remote-control start`, `remote-control status`, and `remote-control stop` ran (`--help`, `-h`, and `help remote-control <subcommand>`). All exited 0 and printed usage without registering, starting, or stopping any daemon.
- For nested `plugin` and `plugins` subcommands, the documented safe help forms `agy help plugin <nested>`, `agy plugin help <nested>`, `agy help plugins <nested>`, and `agy plugins help <nested>` ran across all nested subcommands (`list`, `import`, `install`, `uninstall`, `enable`, `disable`, `validate`). All exited 0, printed plugin usage (557 bytes), and modified no file or state.
- However, when attempting per-subcommand `--help` and `-h` flags on nested plugin subcommands, `agy plugin uninstall --help`, `agy plugin uninstall -h`, `agy plugins uninstall --help`, and `agy plugins uninstall -h` parsed `--help` and `-h` as positional arguments (the name of the plugin to uninstall). The binary invoked `plugins.(*Manager).Uninstall` with argument `"--help"` and `"-h"`. Because no plugin with those names existed, it rewrote `~/.gemini/config/import_manifest.json` at `11:25:59` (206 bytes) and printed `Uninstalled plugin "--help"` and `Uninstalled plugin "-h"`.
- Under the explicit stop condition of `DEC-20261016-04` B3 ("If any help command, instead of printing help, performs an operation or changes any file, configuration or account state, the builder stops at once and reports what it printed"), the builder halted and reported `FOUNDER_DECISION_REQUIRED`.
- The stop report was saved at `/Users/michaeldaley/task56-r2-input/builder-stop-r2-reinvestigation.txt` (SHA-256 `949be70ec95ba91e0500f352306a084861b87d7b246069c0af049bd3a6f04c87`).
- From session record only, the builder listed in execution order all 140 Step 3 commands executed before halting, with their exit status, stdout, and stderr. That record was saved at `/Users/michaeldaley/task56-r2-input/builder-step3-commands-r2.txt` (SHA-256 `a0ab3bba19c2dcb0da4f2e95e89c7d9b5a33bfc63e5cf804fb4afd471f9449d5`).
- The builder restored its working directory and exited cleanly without committing.

A2. **Inspection of host state.** Read-only inspection of my MacBook after the stop confirmed:
- All 17 plugin directories in `~/.gemini/config/plugins/` remain intact and were not modified (last modified `Oct 15 05:38`).
- `~/.gemini/config/config.json`, `mcp_config.json`, and `~/.gemini/antigravity-cli/settings.json` were not modified.
- `~/.gemini/config/import_manifest.json` was rewritten at `11:25:59` (206 bytes), retaining its single existing `last30days-skill` import intact.
- No daemon or LaunchAgent was registered or launched for `remote-control`.
- The binary `/Users/michaeldaley/.local/bin/agy` is unchanged at SHA-256 `a4502aaf310b2fd6eb657fcfec2fcc31a690fbbd0c2d14c8eefbb556409024ce`.

A3. **The defect in `DEC-20261016-03` and `DEC-20261016-04`.** `DEC-20261016-03` B3 item 3 and `DEC-20261016-04` B3 prescribed running `--help` and `-h` on every nested subcommand, assuming they were safe help flags. On `agy 1.4.0`, nested subcommands under `plugin` and `plugins` treat non-flag arguments and unrecognized flags as positional targets (plugin names). Prescribing `--help` and `-h` on state-mutating subcommands that do not define them was a drafting defect in those acts.

A4. **The two evidence records.** The two saved records `/Users/michaeldaley/task56-r2-input/builder-stop-r2-reinvestigation.txt` (SHA-256 `949be70ec95ba91e0500f352306a084861b87d7b246069c0af049bd3a6f04c87`) and `/Users/michaeldaley/task56-r2-input/builder-step3-commands-r2.txt` (SHA-256 `a0ab3bba19c2dcb0da4f2e95e89c7d9b5a33bfc63e5cf804fb4afd471f9449d5`) provide definitive evidence of `agy 1.4.0` CLI behavior on macOS, showing which help forms exist, which nested forms print help safely, and how unrecognized arguments are handled.

A5. **Drafting record (`DEC-20261015-05` B7).** These rulings were checked against `DEC-20261015-04` Parts B to F, `DEC-20261016-03` Parts B to F, `DEC-20261016-04` Parts B to G, `DEC-20261014-01` B1, B2, B4 and B7, `DEC-20261015-05` B3, B4 and B7, `DEC-20261016-01` A3 and B4, `DEC-20261016-02` B9, `DEC-20261013-03` B2 item 1, plan Task 56 and sections 9.3, 9.4 and 11.3, spec §§2.2, 5.1, 5.2, 5.6, 6.6 and 9.13, the two saved evidence records of A4, and host file metadata read without running the binary. None of that is an independent review.

## Part B: Founder rulings

B1. **No round.** Under plan §11.3, this stop was caused by a defect in the prompt and decision specifications, not a builder defect or review finding. Rubric milestone 1 stays at round 1 for the new builder. The Actor-Id of `DEC-20261016-04` B8 (`session:antigravity/m25-task56-r2`) passes to the fresh session that builds under this act.

B2. **Evidence of truth from the stop and session records.** The stop report `/Users/michaeldaley/task56-r2-input/builder-stop-r2-reinvestigation.txt` (`949be70ec95ba91e0500f352306a084861b87d7b246069c0af049bd3a6f04c87`) and the complete command log `/Users/michaeldaley/task56-r2-input/builder-step3-commands-r2.txt` (`a0ab3bba19c2dcb0da4f2e95e89c7d9b5a33bfc63e5cf804fb4afd471f9449d5`) are ratified as records of evidence for the behavior of `agy 1.4.0` (`a4502aaf310b2fd6eb657fcfec2fcc31a690fbbd0c2d14c8eefbb556409024ce`). They prove that:
1. `agy mcp <subcommand> --help`, `-h`, and `help mcp <subcommand>` print help and do not modify state;
2. `agy remote-control <subcommand> --help`, `-h`, and `help remote-control <subcommand>` print help and do not register, start, or stop daemons;
3. `agy help plugin <nested>`, `agy plugin help <nested>`, `agy help plugins <nested>`, and `agy plugins help <nested>` print plugin help safely without modifying state;
4. `agy plugin <subcommand>` and `agy plugins <subcommand>` do not support per-subcommand `--help` or `-h` flags; passing `--help` or `-h` treats them as positional arguments and invokes state-mutating handlers (e.g. `Uninstall`).

B3. **Help-probe scope correction (modifying `DEC-20261015-04` B3, `DEC-20261016-03` B3, and `DEC-20261016-04` B3).** The help-probe set to be executed in Step 3 is strictly restricted to forms that this binary's own help output explicitly documents and that do not execute operations:
1. Top-level help forms: `agy --help`, `agy -h`, and `agy help` (as documented by `agy`). Run `agy -help` only if explicitly documented.
2. Subcommand help forms: For each of the twelve subcommands listed in `agy --help` (`agent`, `agents`, `changelog`, `help`, `install`, `mcp`, `mic-serve`, `models`, `plugin`, `plugins`, `remote-control`, `update`):
   - run `agy help <subcommand>` (as documented by `agy help`);
   - run `agy <subcommand> --help` and `agy <subcommand> -h` where the subcommand's help output explicitly documents those flags (note: for `help`, `agy help --help` fails with `unknown subcommand: --help`, so subcommands that do not accept flags must only be probed with their documented syntax);
   - undocumented help forms must not be executed and are recorded as skipped.
3. Nested help forms:
   - For `mcp`: `agy mcp <subcommand> --help`, `agy mcp <subcommand> -h`, and `agy help mcp <subcommand>` for `add`, `remove`, `list`, `enable`, `disable` (all documented by `agy mcp` usage).
   - For `remote-control`: `agy remote-control <subcommand> --help`, `agy remote-control <subcommand> -h`, and `agy help remote-control <subcommand>` for `start`, `status`, `stop` (all documented by `agy remote-control` usage).
   - For `plugin` and `plugins`:
     - Preserved safe help forms: `agy help plugin <nested>`, `agy plugin help <nested>`, `agy help plugins <nested>`, and `agy plugins help <nested>` for each nested subcommand (`list`, `import`, `install`, `uninstall`, `enable`, `disable`, `validate`) are preserved and run, subject to B4.
     - Prohibited positional forms: The builder must not run any command passing `--help`, `-h`, or `-help` as arguments to nested `plugin` or `plugins` subcommands (e.g. `agy plugin uninstall --help`). The report and tests cite the saved stop records as established evidence that those flags are treated as positional arguments and do not exist as help flags on `agy 1.4.0`.

B4. **Per-command stop rule.** The builder must inspect stdout, stderr, and exit status, and verify that no file or config was modified, after each command before running any subsequent command. If any command performs an unexpected operation or modifies state, the builder stops immediately.

B5. **Authorization to complete Task 56 re-investigation.** The builder (`session:antigravity/m25-task56-r2`) is authorized to complete the Task 56 re-investigation on `build/m25-task56-r1` at `9302c8247cfad2b14cfded49ef382ce85bf0760a` under `DEC-20261016-04` as amended by this act.

B6. **Report and tests alignment.** The report (`docs/verification/2026-08-12-antigravity-surface-investigation.md`) and tests (`test/phase3a/evidence-pipeline.test.ts`) shall be updated to reflect the corrected help set derived under B3.

B7. **Builder, host, runtime and egress (`DEC-20261016-04` B8).** The builder is a fresh Gemini 4 session on the Antigravity surface on my MacBook, with Actor-Id `session:antigravity/m25-task56-r2`, under `DEC-20261014-01` B1 and B7, whose only active workspace and command working directory is `/Users/michaeldaley/madventures-tui-m25-task56-r1`, on branch `build/m25-task56-r1` at `9302c8247cfad2b14cfded49ef382ce85bf0760a`. It runs every test with the macOS certification runtime of `DEC-20261013-03` B2 item 1 (`/Users/michaeldaley/.bun/bin/bun`, version `1.4.2`, revision `744846f844374847c902b5e7fd59b4342a51ef99`, SHA-256 `35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5`). All limits and egress rules of `DEC-20261016-04` B8 apply in full. While the investigation runs, no other Antigravity session is used on my MacBook, including the drafting assistant's, and no other builder, review or test session runs there.

B8. **The review (`DEC-20261016-04` B9).** A fresh Codex session on my MacBook that has seen no Task 56 material reviews the new head in its own clone with the macOS certification runtime of `DEC-20261013-03` B2 item 1, under reviewer id `codex`, on the terms of `DEC-20261016-04` B9 as read with this act, and also reports whether each ruling of this act holds. It does not run `agy`. A substantive finding is round 2 for the new builder under rubric milestone 1.

B9. **Order on the MacBook (`DEC-20261016-04` B10).** This build and its review run one session at a time, before or after the Task 46 correction build and its review as I direct in the builder prompts, and never at the same time as either. `DEC-20261016-02` B9 and `DEC-20261016-01` B9 are unchanged.

## Part C: Scope

C1. One commit on `build/m25-task56-r1`, on top of `9302c8247cfad2b14cfded49ef382ce85bf0760a`, that changes exactly `docs/verification/2026-08-12-antigravity-surface-investigation.md` and `test/phase3a/evidence-pipeline.test.ts`. Every other path stays byte-identical to `be996b1fd7ccbc1f5fdee914b1e9de31020b8461`, including `bun.lock`, every manifest, the adapter registry and `packages/adapter-antigravity`.

C2. Outside the clone, the builder writes only the new record of `DEC-20261016-04` B5, its scratch files, and the pull request description at `/Users/michaeldaley/task56-r1-pr/pr-body-r2.md`.

## Part D: Verification

D1. The identity report of `DEC-20261014-01` B7 first, then the baseline of `DEC-20261015-04` D2, recorded verbatim with `uname -sm`, the user and the session's sandbox setting.

D2. The strengthened tests written first and their RED failure against the round 1 report recorded verbatim, under `DEC-20261015-04` D3.

D3. One deliberate break for each of the three tests and for each assertion of `DEC-20261016-03` B4 item 2 as amended by B3 and B6 of this act, each with the test that failed, restored after each with its file's SHA-256 confirmed. No break is committed.

D4. The final checks of `DEC-20261015-04` D4, with the new record's SHA-256 equal to the one the report records, and the superseded record still at `704f23d9b6d82834bc23bd84e3ee4a58dcb7732e200ce5b74a3ad24a19982cbb`.

D5. The pull request description maps `DEC-20261015-04` B2 to B9, `DEC-20261016-04` B2 to B7, and B2 to B6 of this act to the report section or assertion that pins each, and to the commit SHA.

## Part E: Builder binding

E1. The commit subject is `fix(verification): re-run the Antigravity surface investigation on the replaced binary after review round 1`, and the commit message and the pull request description end with these three trailers:

```text
Role-Id: builder
Actor-Id: session:antigravity/m25-task56-r2
Execution-Surface: antigravity
```

E2. The builder makes no GitHub call. Before pushing, I run a command on my MacBook that prints the SHA-256 of the new record file, and it must equal the one the report records. I push the commit to `build/m25-task56-r1` without force and replace the description of pull request 157.

## Part F: Not authorized

- Running any command of the form `agy plugin <sub> --help`, `agy plugin <sub> -h`, `agy plugins <sub> --help`, or `agy plugins <sub> -h`.
- Any install, restore, update or downgrade of `agy`, including `agy update` and `agy install`, any sign-in, sign-out or configuration change, and any live or governed session of a real surface.
- Deleting, moving or modifying the superseded record `2026-10-16T03:11:04.805Z-827ba22b4aa3.json` (`704f23d9b6d82834bc23bd84e3ee4a58dcb7732e200ce5b74a3ad24a19982cbb`), or writing any record other than the new record under `DEC-20261016-04` B5.
- Writing a passing record, or any capability record on Linux.
- Any change outside C1.
- Leaving draft or merging pull request 157 before the review of B8 passes.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-16

Actor-Id: founder
