FOUNDER-ACT-20261119-MANAGED-SETTINGS-BRANCH: Claude Code's managed-settings folder added to the Phase 3A design §1.5 table for M1

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `11a9aa101bb448a5b14b6923fa25f6335f2db74d` (the merge of pull request 247)
> **Ratifies:** the patch with SHA-256 `17ce4400c1fb099facf55cc54674ee7128d8243475ab1896fe6a3016463ca645` (1,502 bytes) against `docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md`
> **Governs:** Phase 3B plan §5 item 14, as `DEC-20261108-01` B13 item 6 places it; `DEC-20261108-04` B4 item 2
> **Read with:** `DEC-20261013-01` A3 and B5; `DEC-20261010-02` B3; `DEC-20261108-04` B4 and C2; `DEC-20261115-02` B16 and its Addenda 5 and 6; `DEC-20261119-01` B9 and B11; `PLAN-OPEN-2`, its configuration-source and provider-routing invariants; Phase 3A design §1.5; Phase 3B plan §2 and §3 M1

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What earlier texts leave to this act.** `DEC-20261013-01` A3 records that Claude Code's managed-settings file sits at a different path on each operating system, which Phase 3A design §1.5 does not list as a permitted branch, and its B5 keeps that branch out of `preflight.ts`: the settings-source paths are inputs, and before the code that supplies the managed-settings path for each operating system is built, an act of mine adds that branch to the §1.5 table. Phase 3B plan §5 item 14 and §3 M1 put that code in M1, and `DEC-20261108-01` B13 item 6 has the act come before M1's act. `DEC-20261108-04` B4 item 2 makes it a precondition of M1, and `DEC-20261115-02` B16 and `DEC-20261119-01` B11 repeat it. This is that act.

A2. **Preflight today.** At the commit in the header, `PreflightInput.settingsSources` (line 26 of `packages/supervisor/src/preflight.ts`, git blob `43619191f47e3f9cdaefd8aa45cd436770690160`) is supplied by the caller. Lines 101 to 119 accept only absolute paths whose file name is `settings.json`, `settings.local.json` or `managed-settings.json`, skip a file that does not exist (line 105), and refuse a file holding any top-level key other than `env` (line 112) or any `env` key outside the allowlist or differing from the constructed environment. Line 98 requires `CLAUDE_CONFIG_DIR` to be `.claude-madventures-v5` in the installation's home. `PLAN-OPEN-2` requires every effective settings source to be validated: managed, command line, local, project and user.

A3. **Where Claude Code takes managed policy from.** The Claude Code documentation, its settings and managed-settings pages, read on 2026-11-19, and its public changelog say:
1. The managed-settings file is `/Library/Application Support/ClaudeCode/managed-settings.json` on macOS and `/etc/claude-code/managed-settings.json` on Linux. No environment variable or flag moves it.
2. The same folder may hold `managed-settings.d/`, whose files ending in `.json` and not beginning with a dot are merged after `managed-settings.json` in alphabetical order, and `managed-mcp.json`, which sets the MCP servers.
3. Two sources reach Claude Code without a file in that folder: server-managed settings, which a Team or Enterprise organization sets in the claude.ai admin console and Claude Code fetches at start and caches, and on macOS a configuration profile in the managed preferences domain `com.anthropic.claudecode`. Both rank above the folder. By default Claude Code uses the highest-ranked source that delivers any key and ignores the rest.
4. The changelog records the `managed-settings.d/` folder in a release before 2.1.325, the version the `claude-code` registration supports, and none of its entries for 2.1.326 to 2.1.328 moves these paths or adds a source of managed policy. The documentation describes the current release, not 2.1.325 by name.

A4. **My check of both hosts.** On 2026-11-19 I ran, in a plain terminal on each host, a read-only command that reports only whether each path exists and, for a folder, how many entries it holds, and that prints no file's content: SHA-256 `d6d7b707c6d9583502d624c957b94b4160aa4c2b15fccfb949420b01b2ec8f62`.
1. My MacBook, at 06:22:13 UTC: `/Library/Application Support/ClaudeCode` is absent, so no managed-settings file, drop-in or `managed-mcp.json` exists; no file of the domain `com.anthropic.claudecode` exists under `/Library/Managed Preferences`, for the machine or for my user, and no file there names anthropic; neither `~/.claude-madventures-v5` nor `~/.claude` holds `remote-settings.json` or any file whose name contains remote, policy or managed.
2. My Ubuntu PC, at 06:23:38 UTC: `/etc/claude-code` is absent; `~/.claude-madventures-v5` holds no `remote-settings.json` and no file whose name contains remote, policy or managed. My personal `~/.claude`, which no governed session reads, holds `remote-settings.json` and `remote-settings.json.synced-at` and three files whose names begin `policy-limits.json`. A second read-only command at 13:10:01 UTC, SHA-256 `abefe6974a2f9207add4439d299904e5a39a76a2bfb3bd0b7638c30d42d27c2c`, which prints key names and counts and no value, showed that `remote-settings.json` there is 2 bytes, an object with no keys, last changed at 23:20:53 UTC on 2026-11-18.

A5. **The drafting assistant.** A Claude Code session wrote both commands, read the documentation through a subagent and the changelog itself, and drafted this act and the patch, which it applied to a clean checkout of the commit in the header. None of that is an independent review.

## Part B: Founder rulings

B1. **The branch.** Phase 3A design §1.5 gains row 8: `apps/madbridge/src/tui/live/managed-settings.ts`, `managedSettingsDirectory`, built in Phase 3B M1; on macOS `/Library/Application Support/ClaudeCode`, on Linux `/etc/claude-code`; production. I ratify the patch in the header, which adds that row and changes nothing else in the design. It takes effect when it is on `main` together with this act. The design's SHA-256 is `a6af30015f743740794d89e12cfc2af07433ead70433b739725c2728a89fc69d` before the patch and `472f3179c20f7f41c0e3feb5a65842bf3774cf6df01e8684a3ea86dcd811bce0` after it.

B2. **The function.** `managedSettingsDirectory` takes one argument, an operating-system name in the form of `process.platform`, and returns `/Library/Application Support/ClaudeCode` for `darwin`, `/etc/claude-code` for `linux`, and no folder for any other value. It reads no file, no environment variable and nothing that identifies the host. The production caller passes `process.platform`. No other production code names either folder, and `preflight.ts` keeps no operating-system branch (`DEC-20261013-01` B5).

B3. **The caller.** In M1 the production caller:
1. stops before preflight when the function returns no folder;
2. passes the folder's `managed-settings.json` to preflight among the settings sources, with the other sources `PLAN-OPEN-2` names; a file that does not exist is skipped by preflight as A2 records;
3. stops before preflight when the folder's `managed-settings.d` holds any file whose name ends in `.json` and does not begin with a dot, or when the folder's `managed-mcp.json` exists, because Claude Code reads them and preflight does not validate them.
Each stop names its cause and launches nothing. The checks of item 3 take the folder as an argument, so that their tests use a disposable folder and never the real ones. M1's act names the failure each stop reports.

B4. **Sources preflight does not see.** Server-managed settings and the macOS configuration profile of A3 item 3 reach Claude Code without a file that preflight reads, and either would replace the folder's policy. This act does not make preflight validate them.
1. My check of A4 found neither for the governed configuration on either host.
2. Before M1's act and before each certification run, my guarded run of the command of A4 on each host must show: the managed folder absent, or holding nothing that B3 item 3 refuses; on my MacBook, no file of the domain `com.anthropic.claudecode` and no managed-preference file naming anthropic; and no `remote-settings.json` in `~/.claude-madventures-v5`. Otherwise the run stops for my ruling.
3. M1's act rules whether the production caller or preflight also refuses a start when the governed configuration holds a server-managed copy.
4. The copy in my personal `~/.claude` on the Ubuntu PC is recorded and is outside this act: preflight requires `CLAUDE_CONFIG_DIR` to be `~/.claude-madventures-v5` (A2).

B5. **Tests and exercise.** M1's build tests the function with `darwin`, `linux` and another value, and calls it with `process.platform` to check the folder for the operating system the test runs on, so that Verify and Verify (macOS) exercise each branch on its own operating system, as §1.5 requires. Certification exercises it on both hosts.

B6. **Carried to M1's act.** Preflight refuses a settings source that holds any top-level key other than `env` (A2). The governed `settings.json` in `~/.claude-madventures-v5` holds other keys on both hosts: the plugin settings of `DEC-20261115-02` Addendum 5 B2 and Addendum 6 B2, and on my Ubuntu PC the default model of Addendum 6 B3. Once M1's caller passes that file, as `PLAN-OPEN-2` requires, every start would fail as `auth_not_ready`. M1's act rules how that is resolved. This act changes neither the validator nor those files.

B7. **`DEC-20261108-04` B4 item 2.** It is met when this act and its patch are on `main`. M1 still waits for B4 item 3, as `DEC-20261119-01` B9 rules, and starts only on its own act.

B8. **Counting.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This act takes effect when I sign it.

B9. **What this does not open.** This act authorizes no build, no live call and no change to the `start` gate. The function, its caller and its tests are built in M1 under M1's act. It changes no earlier ruling, `PLAN-OPEN-2` or the plan.

## Part C: Filing

C1. One docs-only pull request, made by a Claude Code filing session under a filing prompt I sign, adds this act unchanged as `docs/decisions/DEC-20261119-02-managed-settings-branch.md` and applies the patch of the header, and changes nothing else. The pull request touches `docs/decisions/`, so under `AGENTS.md`, as `DEC-20261031-01` amended it, it merges only by an act of mine naming its exact head.

## Part D: Not authorized

- Any change to code, a test, a workflow, `bun.lock`, a manifest, `AGENTS.md`, the plan, `PLAN-OPEN-2` or an earlier decision record, and any change to the design beyond row 8.
- Any change to preflight or its settings validator, or to the governed or personal configuration on either host.
- Any build, any live call, and any change to the `start` gate.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-19

Actor-Id: founder
