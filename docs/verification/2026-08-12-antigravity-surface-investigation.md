# Formal Antigravity Surface Investigation (Phase 3A Task 56 / M25)

- **Date:** `2026-10-16`
- **Governing authorizations:**
  - `FOUNDER-ACT-20261016-TASK56-HELP-SCOPE-CORRECTION` (`docs/decisions/DEC-20261016-05-task56-help-scope-correction.md`, SHA-256 `50f095f71f50dab1f4107b336b575557cd78585bffa7ca6db83fd4aa728b73f4`)
  - `FOUNDER-ACT-20261016-TASK56-REINVESTIGATION` (`docs/decisions/DEC-20261016-04-task56-reinvestigation.md`, SHA-256 `4d2463904697d740852982640e1b1829a6bdbaab138de817dc7eaf041d9bf168`)
  - `FOUNDER-ACT-20261016-TASK56-CORRECTION` (`docs/decisions/DEC-20261016-03-task56-correction.md`, SHA-256 `28b4288c94c0ca6c85975f80cdeaade7443790195bcbd32a02e6eafbd384a655`)
  - `FOUNDER-ACT-20261015-TASK56-EXECUTION-AUTHORIZATION` (`docs/decisions/DEC-20261015-04-task56-antigravity-investigation.md`, SHA-256 `1c9b9ca5ebdac214494d0ea7e5e2c0b9f493c53dfbc6ca7ff28e329dc95c2602`)
- **Binding base commit:** `be996b1fd7ccbc1f5fdee914b1e9de31020b8461` (parent of Round 1 commit `9302c8247cfad2b14cfded49ef382ce85bf0760a` on `build/m25-task56-r1`)
- **Investigated surface:** `antigravity` (`/Users/michaeldaley/.local/bin/agy`)
- **Relationship to Task 60 (`DEC-20261016-03` B4 item 3; `DEC-20261016-04` B6):** `docs/verification/phase-3a-antigravity-preliminary.md` is historical Stage 0 evidence that recorded `agy 1.1.12`, whereas `ANTIGRAVITY_REGISTRATION.supported_versions` in `packages/protocol/src/adapter-registry.ts` is `["1.1.13"]`, Task 56 Round 1 at commit `9302c8247cfad2b14cfded49ef382ce85bf0760a` observed `agy 1.3.6`, and the current binary observed on host in Task 56 Round 2 is `agy 1.4.0`. Per spec §§2.1 and 2.3, plan §9.3, and `DEC-20261015-04` A3, the Task 60 preliminary attestation is not reused; every observation and the `CapabilityRecordV1` in this report were produced fresh on the Founder MacBook against `agy 1.4.0`.

---

## 1. Host, runtime, and binary facts (plan §9.3; DEC-20261016-05 B3, B7; DEC-20261016-04 B3, B4, B5, B8; DEC-20261015-04 B3, B5, B6, B12)

| Field | Observed value |
| --- | --- |
| Surface (`surface`) | `antigravity` |
| Provider (`provider`, copied from `ANTIGRAVITY_REGISTRATION`) | `google` |
| Independence domain (`independence_domain`, copied from `ANTIGRAVITY_REGISTRATION`) | `google` |
| Organization ID (`organization_id`, copied from `ANTIGRAVITY_REGISTRATION`) | `google` |
| Requested model (`requested_model`, `DEC-20261016-04` B4 / `DEC-20261015-04` B5) | `gemini-4-argon-high` |
| Adapter registry `supported_versions` (`packages/protocol/src/adapter-registry.ts`) | `["1.1.13"]` |
| Historical Task 60 preliminary report CLI version (`docs/verification/phase-3a-antigravity-preliminary.md`) | `1.1.12` |
| Superseded Round 1 CLI version at `9302c8247cfad2b14cfded49ef382ce85bf0760a` | `1.3.6` |
| Current observed CLI version (`cli_version`) | `1.4.0` |
| Absolute binary path (`binary_path`, via `command -v agy`, probe `00a_pre_which`) | `/Users/michaeldaley/.local/bin/agy` |
| Binary SHA-256 before investigation (`shasum -a 256 /Users/michaeldaley/.local/bin/agy`, probe `00b_pre_shasum`) | `a4502aaf310b2fd6eb657fcfec2fcc31a690fbbd0c2d14c8eefbb556409024ce` |
| Binary `--version` before investigation (probe `00c_pre_version`) | `1.4.0` (exit `0`, stdout `6` bytes, stderr `0` bytes) |
| Binary path after investigation (`command -v agy`, probe `09a_post_which`) | `/Users/michaeldaley/.local/bin/agy` |
| Binary SHA-256 after investigation (`shasum -a 256 /Users/michaeldaley/.local/bin/agy`, probe `09b_post_shasum`) | `a4502aaf310b2fd6eb657fcfec2fcc31a690fbbd0c2d14c8eefbb556409024ce` |
| Binary `--version` after investigation (probe `09c_post_version`) | `1.4.0` (exit `0`, stdout `6` bytes, stderr `0` bytes) |
| Host architecture (`uname -sm` / `host.arch`) | `Darwin arm64` (`arm64`) |
| macOS version (`sw_vers -productVersion` / `host.macos_version`) | `27.0.1` |
| macOS build (`sw_vers -buildVersion` / `host.macos_build`) | `26A434` |
| Bun version (`host.bun_version`) | `1.4.2` (revision `744846f844374847c902b5e7fd59b4342a51ef99`) |
| Bun executable path (`host.bun_path`) | `/Users/michaeldaley/.bun/bin/bun` |
| Bun executable SHA-256 (`host.bun_sha256`) | `35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5` |
| Terminal (`host.term`) | `dumb` |
| Shell (`host.shell`) | `/bin/zsh` |
| Evaluated timestamp (`evaluated_at`) | `2026-10-16T20:43:50.078Z` |
| Expiration horizon (`expires_at`, 30 days per `PLAN-OPEN-3`) | `2026-11-15T20:43:50.078Z` |

---

## 2. Fixed identity and auth-readiness rubrics (spec §§2.2, 2.3, 5.4, 9.13; plan §9.2; DEC-20261015-04 B2, B4)

The identity rubric (spec §2.2, plan §9.2) and auth-readiness rule (spec §5.4, `DEC-20261015-04` B4) were fixed before the investigation and applied unchanged:

- **Passing identity evidence (either one required):**
  1. `a documented CLI or API primitive returning the resolved provider and exact model for the actual session`; or
  2. `structured per-session or per-response metadata naming the provider and exact model actually used`.
- **Failing identity evidence (all of these):** configuration files; requested flags or environment values; marketing names or version banners; unstructured prose; behavioral inference; cached attestations; any statement of requested intent rather than resolved fact. Neither `agy config get model` nor `init.model` (nor any `--model` flag or requested-model echo) is accepted as identity evidence under spec §2.2.
- **Auth-readiness rule (`DEC-20261015-04` B4):** the builder signs in to nothing, signs out of nothing, and changes no account state; `auth_readiness.result` is `no_primitive` with `primitive: null` unless the binary's help output documents a non-mutating, non-interactive primitive for checking authentication state.

---

## 3. Round 1 supersession, binary replacement, and the first Round 2 stop (DEC-20261016-04 A1, A2, B2, B6; DEC-20261016-05 A1–A4, B2, B3, B6)

### 3.1 Round 1 binary, commit, and superseded capability record (`DEC-20261016-04` A1, A2, B2, B6)

- **Round 1 investigation:** Task 56 Round 1 investigated the binary `/Users/michaeldaley/.local/bin/agy` at CLI version `1.3.6` and SHA-256 `827ba22b4aa33557614a57aac2cc13f386e17db6b802febd3932226906ac05ab`. Those Round 1 captures remain in git history at commit `9302c8247cfad2b14cfded49ef382ce85bf0760a` on branch `build/m25-task56-r1` (and the Round 1 Codex review is recorded at `/Users/michaeldaley/task56-r2-input/codex-review-r1.md`, SHA-256 `91b5e64a4e912bbfeb85762bc5ceeac970dc16eecda5054b8ca64d32f09c1b2b`).
- **Superseded capability record:** The Round 1 stored capability record `2026-10-16T03:11:04.805Z-827ba22b4aa3.json` at `/Users/michaeldaley/Library/Application Support/MADVentures/madventures-tui/capability/antigravity/2026-10-16T03:11:04.805Z-827ba22b4aa3.json` (SHA-256 `704f23d9b6d82834bc23bd84e3ee4a58dcb7732e200ce5b74a3ad24a19982cbb`) is superseded under `DEC-20261016-04` B2 and remains untouched on disk at that exact SHA-256 as the historical record of the `1.3.6` (`827ba22b4aa33557614a57aac2cc13f386e17db6b802febd3932226906ac05ab`) binary.
- **Facts of `DEC-20261016-04` A1 and A2:**
  - Two Antigravity sessions started from the Round 2 builder prompt under `DEC-20261016-03` and stopped before any commit, each reporting `FOUNDER_DECISION_REQUIRED`: the first stopped immediately at its identity report because `/Users/michaeldaley` and `/Users/michaeldaley/MADVenturesOPs` were attached as extra workspaces; the second verified the acts, Round 1 review, superseded record, baseline, and RED test failure, then found that `/Users/michaeldaley/.local/bin/agy` hashed to `a4502aaf310b2fd6eb657fcfec2fcc31a690fbbd0c2d14c8eefbb556409024ce` rather than `827ba22b4aa33557614a57aac2cc13f386e17db6b802febd3932226906ac05ab` and stopped without invoking the binary.
  - On the Founder MacBook, `/Users/michaeldaley/.local/bin/agy` is a regular file (not a symbolic link) of `185,665,248` bytes, created `2026-10-16T09:14:39-04:00` and last modified `2026-10-16T09:14:40-04:00`, with SHA-256 `a4502aaf310b2fd6eb657fcfec2fcc31a690fbbd0c2d14c8eefbb556409024ce` (now observed in this investigation to report version `1.4.0`).
  - No copy of the `827ba22b4aa33557614a57aac2cc13f386e17db6b802febd3932226906ac05ab` binary was found under `~/.local` or `~/Library/Caches`.
  - The replacement coincided with the start of the first Round 2 session; that the binary updated itself when that session started is an inference from the timing, not an established fact.

### 3.2 First Round 2 re-investigation stop under `DEC-20261016-04` and help-scope correction under `DEC-20261016-05` (`DEC-20261016-05` A1–A4, B2, B3)

- **What happened in the first `DEC-20261016-04` session:** When the first re-investigation session under `DEC-20261016-04` executed the nested help probes prescribed by `DEC-20261016-03` B3 item 3 and `DEC-20261016-04` B3, `agy plugin uninstall --help`, `agy plugin uninstall -h`, `agy plugins uninstall --help`, and `agy plugins uninstall -h` did not print help. Instead, `agy 1.4.0` parsed `--help` and `-h` as positional `<name>` arguments to `plugins.(*Manager).Uninstall`, printed `Uninstalled plugin "--help"` and `Uninstalled plugin "-h"`, and rewrote `~/.gemini/config/import_manifest.json` at `11:25:59` (`206` bytes, retaining its single existing `last30days-skill` import intact, while leaving all 17 plugin directories in `~/.gemini/config/plugins/`, `~/.gemini/config/config.json`, `mcp_config.json`, and `~/.gemini/antigravity-cli/settings.json` unmodified). Under the stop rule of `DEC-20261016-04` B3, that session halted, restored the working tree, and left without committing.
- **Ratified evidence records (`DEC-20261016-05` A4, B2):**
  1. `/Users/michaeldaley/task56-r2-input/builder-stop-r2-reinvestigation.txt` (SHA-256 `949be70ec95ba91e0500f352306a084861b87d7b246069c0af049bd3a6f04c87`) — the builder stop report recording the `plugin uninstall` / `plugins uninstall` positional-argument mutation and `import_manifest.json` rewrite.
  2. `/Users/michaeldaley/task56-r2-input/builder-step3-commands-r2.txt` (SHA-256 `a0ab3bba19c2dcb0da4f2e95e89c7d9b5a33bfc63e5cf804fb4afd471f9449d5`) — the complete 140-command Step 3 execution log from that session, proving how `agy 1.4.0` handles top-level, subcommand, and nested help forms across `mcp`, `remote-control`, `plugin`, and `plugins`.

---

## 4. Primitives attempted and verbatim outputs (plan §9.3; DEC-20261016-05 B3, B4, B6; DEC-20261016-04 B3, B6; DEC-20261015-04 B3, B4, B5, B8)

Every command below (92 total captures: 3 pre-investigation binary checks, 1 `--version` probe, 79 help probes in the `DEC-20261016-05` B3 help set, 1 `models` probe, 1 `config get model` probe, 4 structured output probes, and 3 post-investigation binary checks) was executed once with stdin redirected from `/dev/null`, stdout and stderr captured to separate files under the single disposable scratch root, and the exit status read from `$?` immediately after completion. Under `DEC-20261016-05` B4, stdout, stderr, exit status, binary SHA-256, and repository status were inspected after each command before running the next command.

### 4.1 Pre-investigation `command -v agy` (`00a_pre_which`)

- **Command:** `command -v agy < /dev/null`
- **Exit status:** `0`
- **Stdout (35 bytes):**
```text
/Users/michaeldaley/.local/bin/agy
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Pre-investigation binary path resolution check (`DEC-20261016-05` B3; `DEC-20261016-04` B3). Resolves `agy` on the normal `PATH` to `/Users/michaeldaley/.local/bin/agy`.

### 4.2 Pre-investigation `shasum -a 256 /Users/michaeldaley/.local/bin/agy` (`00b_pre_shasum`)

- **Command:** `shasum -a 256 /Users/michaeldaley/.local/bin/agy < /dev/null`
- **Exit status:** `0`
- **Stdout (101 bytes):**
```text
a4502aaf310b2fd6eb657fcfec2fcc31a690fbbd0c2d14c8eefbb556409024ce  /Users/michaeldaley/.local/bin/agy
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Pre-investigation binary SHA-256 check (`DEC-20261016-05` B3; `DEC-20261016-04` B3). Records SHA-256 `a4502aaf310b2fd6eb657fcfec2fcc31a690fbbd0c2d14c8eefbb556409024ce` before the first probe.

### 4.3 Pre-investigation `agy --version` (`00c_pre_version`)

- **Command:** `/Users/michaeldaley/.local/bin/agy --version < /dev/null`
- **Exit status:** `0`
- **Stdout (6 bytes):**
```text
1.4.0
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Pre-investigation version check (`DEC-20261016-05` B3; `DEC-20261016-04` B3). Confirms CLI version `1.4.0` before the first probe; version banner only, not session identity evidence under spec §2.2.

### 4.4 B3 item 1: `agy --version` (`01_version`)

- **Command:** `/Users/michaeldaley/.local/bin/agy --version < /dev/null`
- **Exit status:** `0`
- **Stdout (6 bytes):**
```text
1.4.0
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Failing evidence under spec §2.2 (version banner `1.4.0` only; does not report resolved provider or exact model for an actual session).

### 4.5 B3 item 2 (top-level help 1/3): `agy --help` (`02_01_top_help_long`)

- **Command:** `/Users/michaeldaley/.local/bin/agy --help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (2907 bytes):**
```text
Usage of agy:
  --add-dir                       Add a directory to the workspace (repeatable) (default [])
  --agent                         Agent for the current CLI session
  -c                              Short alias for --continue
  --continue                      Continue the most recent conversation
  --conversation                  Resume a previous conversation by ID
  --dangerously-skip-permissions  Auto-approve all tool permission requests without prompting
  --disable-slash-commands        Disable slash command and skill expansion in print mode
  --effort                        Reasoning effort for the current CLI session (low|medium|high|xhigh|max)
  -i                              Short alias for --prompt-interactive
  --input-format                  Input format for print mode (text, stream-json). stream-json reads one NDJSON message per line from stdin and runs a turn for each; it requires --output-format stream-json (default text)
  --json-schema                   Optional JSON schema string or path to a schema file to enforce structured output (for stream-json, only applicable to the final result)
  --log-file                      Override CLI log file path
  --mode                          Set the agent execution mode for this session (accept-edits, auto, plan)
  --model                         Model for the current CLI session
  --new-project                   Create a new project for this session
  --output-format                 Output format for print mode (text, json, stream-json) (default text)
  -p                              Short alias for --print
  --print                         Run a single prompt non-interactively and print the response
  --print-timeout                 Optional time limit for print mode; 0 waits until the turn completes (default 0s)
  --project                       Project ID or project name for the current CLI session
  --prompt                        Alias for --print
  --prompt-interactive            Run an initial prompt interactively and continue the session
  --remote-control                Create a remote connection for the CLI session on start up
  --sandbox                       Run in a sandbox with terminal restrictions enabled

Available subcommands:
  agent           List available agents
  agents          List available agents
  changelog       Show changelog and release notes
  help            Show help for subcommands
  install         Configure environment paths and shell settings
  mcp             Manage MCP servers (add, remove, list, enable, disable)
  mic-serve       Serve this machine's microphone to a CLI on another host
  models          List available models
  plugin          Manage plugins (install, uninstall, list, enable, disable)
  plugins         Alias for plugin
  remote-control  Manage the remote-control background daemon (start, status, stop)
  update          Update CLI
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 1). Lists 24 top-level flags and 12 subcommands (`agent`, `agents`, `changelog`, `help`, `install`, `mcp`, `mic-serve`, `models`, `plugin`, `plugins`, `remote-control`, `update`). Documents no `config` subcommand, no actual-session identity primitive, and no auth/status primitive.

### 4.6 B3 item 2 (top-level help 2/3): `agy -h` (`02_02_top_help_short`)

- **Command:** `/Users/michaeldaley/.local/bin/agy -h < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (2907 bytes):**
```text
Usage of agy:
  --add-dir                       Add a directory to the workspace (repeatable) (default [])
  --agent                         Agent for the current CLI session
  -c                              Short alias for --continue
  --continue                      Continue the most recent conversation
  --conversation                  Resume a previous conversation by ID
  --dangerously-skip-permissions  Auto-approve all tool permission requests without prompting
  --disable-slash-commands        Disable slash command and skill expansion in print mode
  --effort                        Reasoning effort for the current CLI session (low|medium|high|xhigh|max)
  -i                              Short alias for --prompt-interactive
  --input-format                  Input format for print mode (text, stream-json). stream-json reads one NDJSON message per line from stdin and runs a turn for each; it requires --output-format stream-json (default text)
  --json-schema                   Optional JSON schema string or path to a schema file to enforce structured output (for stream-json, only applicable to the final result)
  --log-file                      Override CLI log file path
  --mode                          Set the agent execution mode for this session (accept-edits, auto, plan)
  --model                         Model for the current CLI session
  --new-project                   Create a new project for this session
  --output-format                 Output format for print mode (text, json, stream-json) (default text)
  -p                              Short alias for --print
  --print                         Run a single prompt non-interactively and print the response
  --print-timeout                 Optional time limit for print mode; 0 waits until the turn completes (default 0s)
  --project                       Project ID or project name for the current CLI session
  --prompt                        Alias for --print
  --prompt-interactive            Run an initial prompt interactively and continue the session
  --remote-control                Create a remote connection for the CLI session on start up
  --sandbox                       Run in a sandbox with terminal restrictions enabled

Available subcommands:
  agent           List available agents
  agents          List available agents
  changelog       Show changelog and release notes
  help            Show help for subcommands
  install         Configure environment paths and shell settings
  mcp             Manage MCP servers (add, remove, list, enable, disable)
  mic-serve       Serve this machine's microphone to a CLI on another host
  models          List available models
  plugin          Manage plugins (install, uninstall, list, enable, disable)
  plugins         Alias for plugin
  remote-control  Manage the remote-control background daemon (start, status, stop)
  update          Update CLI
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 1). Byte-identical usage output (2907 bytes on stderr) and exit status `0` to `agy --help`.

### 4.7 B3 item 2 (top-level help 3/3): `agy help` (`02_03_top_help_sub`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (2907 bytes):**
```text
Usage of agy:
  --add-dir                       Add a directory to the workspace (repeatable) (default [])
  --agent                         Agent for the current CLI session
  -c                              Short alias for --continue
  --continue                      Continue the most recent conversation
  --conversation                  Resume a previous conversation by ID
  --dangerously-skip-permissions  Auto-approve all tool permission requests without prompting
  --disable-slash-commands        Disable slash command and skill expansion in print mode
  --effort                        Reasoning effort for the current CLI session (low|medium|high|xhigh|max)
  -i                              Short alias for --prompt-interactive
  --input-format                  Input format for print mode (text, stream-json). stream-json reads one NDJSON message per line from stdin and runs a turn for each; it requires --output-format stream-json (default text)
  --json-schema                   Optional JSON schema string or path to a schema file to enforce structured output (for stream-json, only applicable to the final result)
  --log-file                      Override CLI log file path
  --mode                          Set the agent execution mode for this session (accept-edits, auto, plan)
  --model                         Model for the current CLI session
  --new-project                   Create a new project for this session
  --output-format                 Output format for print mode (text, json, stream-json) (default text)
  -p                              Short alias for --print
  --print                         Run a single prompt non-interactively and print the response
  --print-timeout                 Optional time limit for print mode; 0 waits until the turn completes (default 0s)
  --project                       Project ID or project name for the current CLI session
  --prompt                        Alias for --print
  --prompt-interactive            Run an initial prompt interactively and continue the session
  --remote-control                Create a remote connection for the CLI session on start up
  --sandbox                       Run in a sandbox with terminal restrictions enabled

Available subcommands:
  agent           List available agents
  agents          List available agents
  changelog       Show changelog and release notes
  help            Show help for subcommands
  install         Configure environment paths and shell settings
  mcp             Manage MCP servers (add, remove, list, enable, disable)
  mic-serve       Serve this machine's microphone to a CLI on another host
  models          List available models
  plugin          Manage plugins (install, uninstall, list, enable, disable)
  plugins         Alias for plugin
  remote-control  Manage the remote-control background daemon (start, status, stop)
  update          Update CLI
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 1). Byte-identical usage output (2907 bytes on stderr) and exit status `0` to `agy --help`.

### 4.8 B3 item 2 (subcommand help): `agy help agent` (`02_04_sub_agent_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help agent < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (96 bytes):**
```text
Usage: agy agent [flags]

List available agents

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.9 B3 item 2 (subcommand help): `agy agent --help` (`02_05_sub_agent_long`)

- **Command:** `/Users/michaeldaley/.local/bin/agy agent --help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (96 bytes):**
```text
Usage: agy agent [flags]

List available agents

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.10 B3 item 2 (subcommand help): `agy agent -h` (`02_06_sub_agent_short`)

- **Command:** `/Users/michaeldaley/.local/bin/agy agent -h < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (96 bytes):**
```text
Usage: agy agent [flags]

List available agents

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.11 B3 item 2 (subcommand help): `agy help agents` (`02_07_sub_agents_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help agents < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (96 bytes):**
```text
Usage: agy agent [flags]

List available agents

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.12 B3 item 2 (subcommand help): `agy agents --help` (`02_08_sub_agents_long`)

- **Command:** `/Users/michaeldaley/.local/bin/agy agents --help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (96 bytes):**
```text
Usage: agy agent [flags]

List available agents

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.13 B3 item 2 (subcommand help): `agy agents -h` (`02_09_sub_agents_short`)

- **Command:** `/Users/michaeldaley/.local/bin/agy agents -h < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (96 bytes):**
```text
Usage: agy agent [flags]

List available agents

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.14 B3 item 2 (subcommand help): `agy help changelog` (`02_10_sub_changelog_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help changelog < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (111 bytes):**
```text
Usage: agy changelog [flags]

Show changelog and release notes

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.15 B3 item 2 (subcommand help): `agy changelog --help` (`02_11_sub_changelog_long`)

- **Command:** `/Users/michaeldaley/.local/bin/agy changelog --help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (111 bytes):**
```text
Usage: agy changelog [flags]

Show changelog and release notes

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.16 B3 item 2 (subcommand help): `agy changelog -h` (`02_12_sub_changelog_short`)

- **Command:** `/Users/michaeldaley/.local/bin/agy changelog -h < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (111 bytes):**
```text
Usage: agy changelog [flags]

Show changelog and release notes

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.17 B3 item 2 (subcommand help): `agy help help` (`02_13_sub_help_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help help < /dev/null`
- **Exit status:** `1`
- **Stdout (0 bytes):**
```text
```
- **Stderr (34 bytes):**
```text
Error: unknown subcommand: --help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.18 B3 item 2 (subcommand help): `agy help install` (`02_14_sub_install_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help install < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (314 bytes):**
```text
Usage: agy install [flags]

Configure environment paths and shell settings

Flags:
  --dir           Custom directory target to configure PATH for
  -h              Show help
  --help          Show help
  --skip-aliases  Bypasses shell profile alias purging
  --skip-path     Bypasses shell profile PATH appending
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.19 B3 item 2 (subcommand help): `agy install --help` (`02_15_sub_install_long`)

- **Command:** `/Users/michaeldaley/.local/bin/agy install --help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (314 bytes):**
```text
Usage: agy install [flags]

Configure environment paths and shell settings

Flags:
  --dir           Custom directory target to configure PATH for
  -h              Show help
  --help          Show help
  --skip-aliases  Bypasses shell profile alias purging
  --skip-path     Bypasses shell profile PATH appending
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.20 B3 item 2 (subcommand help): `agy install -h` (`02_16_sub_install_short`)

- **Command:** `/Users/michaeldaley/.local/bin/agy install -h < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (314 bytes):**
```text
Usage: agy install [flags]

Configure environment paths and shell settings

Flags:
  --dir           Custom directory target to configure PATH for
  -h              Show help
  --help          Show help
  --skip-aliases  Bypasses shell profile alias purging
  --skip-path     Bypasses shell profile PATH appending
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.21 B3 item 2 (subcommand help): `agy help mcp` (`02_17_sub_mcp_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help mcp < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (350 bytes):**
```text
Usage: agy mcp <subcommand> [flags] [args]

Available subcommands:
  add      Add or update an MCP server configuration
  remove   Remove an MCP server configuration
  list     List all configured MCP servers
  enable   Enable an MCP server
  disable  Disable an MCP server

Run "agy mcp <subcommand> --help" for flags, argument rules, and examples.
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.22 B3 item 2 (subcommand help): `agy help mic-serve` (`02_18_sub_mic_serve_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help mic-serve < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (212 bytes):**
```text
Usage: agy mic-serve [flags]

Serve this machine's microphone to a CLI on another host

Flags:
  --addr  Address to listen on; keep it on loopback (default 127.0.0.1:4713)
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.23 B3 item 2 (subcommand help): `agy mic-serve --help` (`02_19_sub_mic_serve_long`)

- **Command:** `/Users/michaeldaley/.local/bin/agy mic-serve --help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (212 bytes):**
```text
Usage: agy mic-serve [flags]

Serve this machine's microphone to a CLI on another host

Flags:
  --addr  Address to listen on; keep it on loopback (default 127.0.0.1:4713)
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.24 B3 item 2 (subcommand help): `agy mic-serve -h` (`02_20_sub_mic_serve_short`)

- **Command:** `/Users/michaeldaley/.local/bin/agy mic-serve -h < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (212 bytes):**
```text
Usage: agy mic-serve [flags]

Serve this machine's microphone to a CLI on another host

Flags:
  --addr  Address to listen on; keep it on loopback (default 127.0.0.1:4713)
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.25 B3 item 2 (subcommand help): `agy help models` (`02_21_sub_models_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help models < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (97 bytes):**
```text
Usage: agy models [flags]

List available models

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.26 B3 item 2 (subcommand help): `agy models --help` (`02_22_sub_models_long`)

- **Command:** `/Users/michaeldaley/.local/bin/agy models --help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (97 bytes):**
```text
Usage: agy models [flags]

List available models

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.27 B3 item 2 (subcommand help): `agy models -h` (`02_23_sub_models_short`)

- **Command:** `/Users/michaeldaley/.local/bin/agy models -h < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (97 bytes):**
```text
Usage: agy models [flags]

List available models

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.28 B3 item 2 (subcommand help): `agy help plugin` (`02_24_sub_plugin_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugin < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.29 B3 item 2 (subcommand help): `agy help plugins` (`02_25_sub_plugins_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugins < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.30 B3 item 2 (subcommand help): `agy help remote-control` (`02_26_sub_remote_control_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help remote-control < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (257 bytes):**
```text
Usage: agy remote-control <subcommand>

Available subcommands:
  start    Register and start the remote-control daemon
  status   Show the daemon's status
  stop     Stop the daemon and unregister it

Run "agy remote-control <subcommand> --help" for flags.
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.31 B3 item 2 (subcommand help): `agy help update` (`02_27_sub_update_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help update < /dev/null`
- **Exit status:** `2`
- **Stdout (0 bytes):**
```text
```
- **Stderr (17 bytes):**
```text
Usage of update:
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 2). Documents subcommand usage without executing any session or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.32 B3 item 2 (nested subcommand help): `agy mcp add --help` (`03_01_mcp_add_long`)

- **Command:** `/Users/michaeldaley/.local/bin/agy mcp add --help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (1156 bytes):**
```text
Usage: agy mcp add [flags] <name> <commandOrUrl> [args...]

Add or update an MCP server configuration

Flags:
  -H        Short alias for --header (default [])
  -e        Short alias for --env (default [])
  --env     Environment variable KEY=value (repeatable) (default [])
  -h        Show help
  --header  HTTP header Key: Value (repeatable) (default [])
  --help    Show help
  -t        Short alias for --type (default stdio)
  --type    Server type: 'stdio' or 'http' (default stdio)

Arguments:
  <name>          Unique name for the server.
  <commandOrUrl>  Executable for a stdio server, or the URL for an http server.
  [args...]       Arguments passed to the stdio command.

Notes:
  Flags must come before <name>; a flag placed after it is rejected.
  http/https URLs are detected automatically, so --type is usually unnecessary.
  Use -- before the command to pass a command or args that begin with '-'.

Examples:
  agy mcp add fs npx -y @modelcontextprotocol/server-filesystem /work
  agy mcp add --header "Authorization: Bearer TOKEN" api https://example.com/mcp
  agy mcp add --env GITHUB_TOKEN=xxx gh -- docker run -i ghcr.io/github/mcp
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.33 B3 item 2 (nested subcommand help): `agy mcp add -h` (`03_02_mcp_add_short`)

- **Command:** `/Users/michaeldaley/.local/bin/agy mcp add -h < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (1156 bytes):**
```text
Usage: agy mcp add [flags] <name> <commandOrUrl> [args...]

Add or update an MCP server configuration

Flags:
  -H        Short alias for --header (default [])
  -e        Short alias for --env (default [])
  --env     Environment variable KEY=value (repeatable) (default [])
  -h        Show help
  --header  HTTP header Key: Value (repeatable) (default [])
  --help    Show help
  -t        Short alias for --type (default stdio)
  --type    Server type: 'stdio' or 'http' (default stdio)

Arguments:
  <name>          Unique name for the server.
  <commandOrUrl>  Executable for a stdio server, or the URL for an http server.
  [args...]       Arguments passed to the stdio command.

Notes:
  Flags must come before <name>; a flag placed after it is rejected.
  http/https URLs are detected automatically, so --type is usually unnecessary.
  Use -- before the command to pass a command or args that begin with '-'.

Examples:
  agy mcp add fs npx -y @modelcontextprotocol/server-filesystem /work
  agy mcp add --header "Authorization: Bearer TOKEN" api https://example.com/mcp
  agy mcp add --env GITHUB_TOKEN=xxx gh -- docker run -i ghcr.io/github/mcp
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.34 B3 item 2 (nested subcommand help): `agy help mcp add` (`03_03_mcp_add_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help mcp add < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (350 bytes):**
```text
Usage: agy mcp <subcommand> [flags] [args]

Available subcommands:
  add      Add or update an MCP server configuration
  remove   Remove an MCP server configuration
  list     List all configured MCP servers
  enable   Enable an MCP server
  disable  Disable an MCP server

Run "agy mcp <subcommand> --help" for flags, argument rules, and examples.
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.35 B3 item 2 (nested subcommand help): `agy mcp remove --help` (`03_04_mcp_remove_long`)

- **Command:** `/Users/michaeldaley/.local/bin/agy mcp remove --help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (121 bytes):**
```text
Usage: agy mcp remove <name> [flags]

Remove an MCP server configuration

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.36 B3 item 2 (nested subcommand help): `agy mcp remove -h` (`03_05_mcp_remove_short`)

- **Command:** `/Users/michaeldaley/.local/bin/agy mcp remove -h < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (121 bytes):**
```text
Usage: agy mcp remove <name> [flags]

Remove an MCP server configuration

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.37 B3 item 2 (nested subcommand help): `agy help mcp remove` (`03_06_mcp_remove_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help mcp remove < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (350 bytes):**
```text
Usage: agy mcp <subcommand> [flags] [args]

Available subcommands:
  add      Add or update an MCP server configuration
  remove   Remove an MCP server configuration
  list     List all configured MCP servers
  enable   Enable an MCP server
  disable  Disable an MCP server

Run "agy mcp <subcommand> --help" for flags, argument rules, and examples.
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.38 B3 item 2 (nested subcommand help): `agy mcp list --help` (`03_07_mcp_list_long`)

- **Command:** `/Users/michaeldaley/.local/bin/agy mcp list --help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (109 bytes):**
```text
Usage: agy mcp list [flags]

List all configured MCP servers

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.39 B3 item 2 (nested subcommand help): `agy mcp list -h` (`03_08_mcp_list_short`)

- **Command:** `/Users/michaeldaley/.local/bin/agy mcp list -h < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (109 bytes):**
```text
Usage: agy mcp list [flags]

List all configured MCP servers

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.40 B3 item 2 (nested subcommand help): `agy help mcp list` (`03_09_mcp_list_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help mcp list < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (350 bytes):**
```text
Usage: agy mcp <subcommand> [flags] [args]

Available subcommands:
  add      Add or update an MCP server configuration
  remove   Remove an MCP server configuration
  list     List all configured MCP servers
  enable   Enable an MCP server
  disable  Disable an MCP server

Run "agy mcp <subcommand> --help" for flags, argument rules, and examples.
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.41 B3 item 2 (nested subcommand help): `agy mcp enable --help` (`03_10_mcp_enable_long`)

- **Command:** `/Users/michaeldaley/.local/bin/agy mcp enable --help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (107 bytes):**
```text
Usage: agy mcp enable <name> [flags]

Enable an MCP server

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.42 B3 item 2 (nested subcommand help): `agy mcp enable -h` (`03_11_mcp_enable_short`)

- **Command:** `/Users/michaeldaley/.local/bin/agy mcp enable -h < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (107 bytes):**
```text
Usage: agy mcp enable <name> [flags]

Enable an MCP server

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.43 B3 item 2 (nested subcommand help): `agy help mcp enable` (`03_12_mcp_enable_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help mcp enable < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (350 bytes):**
```text
Usage: agy mcp <subcommand> [flags] [args]

Available subcommands:
  add      Add or update an MCP server configuration
  remove   Remove an MCP server configuration
  list     List all configured MCP servers
  enable   Enable an MCP server
  disable  Disable an MCP server

Run "agy mcp <subcommand> --help" for flags, argument rules, and examples.
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.44 B3 item 2 (nested subcommand help): `agy mcp disable --help` (`03_13_mcp_disable_long`)

- **Command:** `/Users/michaeldaley/.local/bin/agy mcp disable --help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (109 bytes):**
```text
Usage: agy mcp disable <name> [flags]

Disable an MCP server

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.45 B3 item 2 (nested subcommand help): `agy mcp disable -h` (`03_14_mcp_disable_short`)

- **Command:** `/Users/michaeldaley/.local/bin/agy mcp disable -h < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (109 bytes):**
```text
Usage: agy mcp disable <name> [flags]

Disable an MCP server

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.46 B3 item 2 (nested subcommand help): `agy help mcp disable` (`03_15_mcp_disable_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help mcp disable < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (350 bytes):**
```text
Usage: agy mcp <subcommand> [flags] [args]

Available subcommands:
  add      Add or update an MCP server configuration
  remove   Remove an MCP server configuration
  list     List all configured MCP servers
  enable   Enable an MCP server
  disable  Disable an MCP server

Run "agy mcp <subcommand> --help" for flags, argument rules, and examples.
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.47 B3 item 2 (nested subcommand help): `agy remote-control start --help` (`03_16_rc_start_long`)

- **Command:** `/Users/michaeldaley/.local/bin/agy remote-control start --help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (302 bytes):**
```text
Usage: agy remote-control start [flags]

Register and start the remote-control daemon

Flags:
  -h         Show help
  --help     Show help
  --name     Set this machine's instance name shown in Remote Control
  --session  Register the daemon login-scoped (stops at logout) instead of starting at boot
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.48 B3 item 2 (nested subcommand help): `agy remote-control start -h` (`03_17_rc_start_short`)

- **Command:** `/Users/michaeldaley/.local/bin/agy remote-control start -h < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (302 bytes):**
```text
Usage: agy remote-control start [flags]

Register and start the remote-control daemon

Flags:
  -h         Show help
  --help     Show help
  --name     Set this machine's instance name shown in Remote Control
  --session  Register the daemon login-scoped (stops at logout) instead of starting at boot
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.49 B3 item 2 (nested subcommand help): `agy help remote-control start` (`03_18_rc_start_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help remote-control start < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (257 bytes):**
```text
Usage: agy remote-control <subcommand>

Available subcommands:
  start    Register and start the remote-control daemon
  status   Show the daemon's status
  stop     Stop the daemon and unregister it

Run "agy remote-control <subcommand> --help" for flags.
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.50 B3 item 2 (nested subcommand help): `agy remote-control status --help` (`03_19_rc_status_long`)

- **Command:** `/Users/michaeldaley/.local/bin/agy remote-control status --help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (115 bytes):**
```text
Usage: agy remote-control status [flags]

Show the daemon's status

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.51 B3 item 2 (nested subcommand help): `agy remote-control status -h` (`03_20_rc_status_short`)

- **Command:** `/Users/michaeldaley/.local/bin/agy remote-control status -h < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (115 bytes):**
```text
Usage: agy remote-control status [flags]

Show the daemon's status

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.52 B3 item 2 (nested subcommand help): `agy help remote-control status` (`03_21_rc_status_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help remote-control status < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (257 bytes):**
```text
Usage: agy remote-control <subcommand>

Available subcommands:
  start    Register and start the remote-control daemon
  status   Show the daemon's status
  stop     Stop the daemon and unregister it

Run "agy remote-control <subcommand> --help" for flags.
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.53 B3 item 2 (nested subcommand help): `agy remote-control stop --help` (`03_22_rc_stop_long`)

- **Command:** `/Users/michaeldaley/.local/bin/agy remote-control stop --help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (122 bytes):**
```text
Usage: agy remote-control stop [flags]

Stop the daemon and unregister it

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.54 B3 item 2 (nested subcommand help): `agy remote-control stop -h` (`03_23_rc_stop_short`)

- **Command:** `/Users/michaeldaley/.local/bin/agy remote-control stop -h < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (122 bytes):**
```text
Usage: agy remote-control stop [flags]

Stop the daemon and unregister it

Flags:
  -h      Show help
  --help  Show help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.55 B3 item 2 (nested subcommand help): `agy help remote-control stop` (`03_24_rc_stop_help`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help remote-control stop < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (257 bytes):**
```text
Usage: agy remote-control <subcommand>

Available subcommands:
  start    Register and start the remote-control daemon
  status   Show the daemon's status
  stop     Stop the daemon and unregister it

Run "agy remote-control <subcommand> --help" for flags.
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.56 B3 item 2 (nested subcommand help): `agy help plugin list` (`03_25_plugin_list_help1`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugin list < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.57 B3 item 2 (nested subcommand help): `agy plugin help list` (`03_26_plugin_list_help2`)

- **Command:** `/Users/michaeldaley/.local/bin/agy plugin help list < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.58 B3 item 2 (nested subcommand help): `agy help plugins list` (`03_27_plugins_list_help1`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugins list < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.59 B3 item 2 (nested subcommand help): `agy plugins help list` (`03_28_plugins_list_help2`)

- **Command:** `/Users/michaeldaley/.local/bin/agy plugins help list < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.60 B3 item 2 (nested subcommand help): `agy help plugin import` (`03_29_plugin_import_help1`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugin import < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.61 B3 item 2 (nested subcommand help): `agy plugin help import` (`03_30_plugin_import_help2`)

- **Command:** `/Users/michaeldaley/.local/bin/agy plugin help import < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.62 B3 item 2 (nested subcommand help): `agy help plugins import` (`03_31_plugins_import_help1`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugins import < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.63 B3 item 2 (nested subcommand help): `agy plugins help import` (`03_32_plugins_import_help2`)

- **Command:** `/Users/michaeldaley/.local/bin/agy plugins help import < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.64 B3 item 2 (nested subcommand help): `agy help plugin install` (`03_33_plugin_install_help1`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugin install < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.65 B3 item 2 (nested subcommand help): `agy plugin help install` (`03_34_plugin_install_help2`)

- **Command:** `/Users/michaeldaley/.local/bin/agy plugin help install < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.66 B3 item 2 (nested subcommand help): `agy help plugins install` (`03_35_plugins_install_help1`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugins install < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.67 B3 item 2 (nested subcommand help): `agy plugins help install` (`03_36_plugins_install_help2`)

- **Command:** `/Users/michaeldaley/.local/bin/agy plugins help install < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.68 B3 item 2 (nested subcommand help): `agy help plugin uninstall` (`03_37_plugin_uninstall_help1`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugin uninstall < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.69 B3 item 2 (nested subcommand help): `agy plugin help uninstall` (`03_38_plugin_uninstall_help2`)

- **Command:** `/Users/michaeldaley/.local/bin/agy plugin help uninstall < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.70 B3 item 2 (nested subcommand help): `agy help plugins uninstall` (`03_39_plugins_uninstall_help1`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugins uninstall < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.71 B3 item 2 (nested subcommand help): `agy plugins help uninstall` (`03_40_plugins_uninstall_help2`)

- **Command:** `/Users/michaeldaley/.local/bin/agy plugins help uninstall < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.72 B3 item 2 (nested subcommand help): `agy help plugin enable` (`03_41_plugin_enable_help1`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugin enable < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.73 B3 item 2 (nested subcommand help): `agy plugin help enable` (`03_42_plugin_enable_help2`)

- **Command:** `/Users/michaeldaley/.local/bin/agy plugin help enable < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.74 B3 item 2 (nested subcommand help): `agy help plugins enable` (`03_43_plugins_enable_help1`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugins enable < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.75 B3 item 2 (nested subcommand help): `agy plugins help enable` (`03_44_plugins_enable_help2`)

- **Command:** `/Users/michaeldaley/.local/bin/agy plugins help enable < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.76 B3 item 2 (nested subcommand help): `agy help plugin disable` (`03_45_plugin_disable_help1`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugin disable < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.77 B3 item 2 (nested subcommand help): `agy plugin help disable` (`03_46_plugin_disable_help2`)

- **Command:** `/Users/michaeldaley/.local/bin/agy plugin help disable < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.78 B3 item 2 (nested subcommand help): `agy help plugins disable` (`03_47_plugins_disable_help1`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugins disable < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.79 B3 item 2 (nested subcommand help): `agy plugins help disable` (`03_48_plugins_disable_help2`)

- **Command:** `/Users/michaeldaley/.local/bin/agy plugins help disable < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.80 B3 item 2 (nested subcommand help): `agy help plugin validate` (`03_49_plugin_validate_help1`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugin validate < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.81 B3 item 2 (nested subcommand help): `agy plugin help validate` (`03_50_plugin_validate_help2`)

- **Command:** `/Users/michaeldaley/.local/bin/agy plugin help validate < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.82 B3 item 2 (nested subcommand help): `agy help plugins validate` (`03_51_plugins_validate_help1`)

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugins validate < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.83 B3 item 2 (nested subcommand help): `agy plugins help validate` (`03_52_plugins_validate_help2`)

- **Command:** `/Users/michaeldaley/.local/bin/agy plugins help validate < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (557 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path] [--strict] [--json]
                         Check a plugin's manifest and files
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (`DEC-20261016-05` B3 item 3). Documents nested subcommand usage without executing any operation or mutating host state; does not return resolved provider or exact model for an actual session.

### 4.84 B3 item 3: `agy models` (`04_models`)

- **Command:** `/Users/michaeldaley/.local/bin/agy models < /dev/null`
- **Exit status:** `0`
- **Stdout (590 bytes):**
```text
gemini-4-argon-medium	Gemini 4 Argon (Medium)
gemini-4-argon-high	Gemini 4 Argon (High)
gemini-4-argon-low	Gemini 4 Argon (Low)
gemini-3.8-flash-high	Gemini 3.8 Flash (High)
gemini-3.8-flash-medium	Gemini 3.8 Flash (Medium)
gemini-3.8-flash-low	Gemini 3.8 Flash (Low)
claude-opus-5-5-low	Claude Opus 5.5 (Low)
claude-opus-5-5-medium	Claude Opus 5.5 (Medium)
claude-opus-5-5-high	Claude Opus 5.5 (High)
claude-sonnet-5-5-low	Claude Sonnet 5.5 (Low)
claude-sonnet-5-5-medium	Claude Sonnet 5.5 (Medium)
claude-sonnet-5-5-high	Claude Sonnet 5.5 (High)
gpt-oss-120b-medium	GPT-OSS 120B (Medium)
```
- **Stderr (29 bytes):**
```text
Fetching available models...
```
- **Rubric evaluation:** Failing evidence under spec §2.2. Lists the 13 catalog models available to the surface (including `gemini-4-argon-high\tGemini 4 Argon (High)`, satisfying `DEC-20261016-04` B4 and `DEC-20261015-04` B5), but reports catalog availability only and does not attest which provider or exact model served an actual session.

### 4.85 B3 item 4: `agy config get model` (`05_config_get_model`)

- **Command:** `/Users/michaeldaley/.local/bin/agy config get model < /dev/null`
- **Exit status:** `2`
- **Stdout (0 bytes):**
```text
```
- **Stderr (153 bytes):**
```text
Error: unexpected argument "config".
Prompts are read only from -p/--print, -i/--prompt-interactive, or stdin, so this argument would have been ignored.
```
- **Rubric evaluation:** Failing evidence under spec §2.2 and plan §9.4. Registered at `packages/protocol/src/adapter-registry.ts:65` and `packages/adapter-antigravity/src/attestation.ts:41`; on `agy 1.4.0` it exits with status `2` because `config` is not a valid subcommand (`Error: unexpected argument "config".`). Even on versions where a config read exists, neither `config get model` nor any configuration read is accepted under spec §2.2.

### 4.86 B3 item 5 (structured output 1/4): `-p 'Reply with the single word ok.' --output-format json` (`06_01_json_default`)

- **Command:** `/Users/michaeldaley/.local/bin/agy -p 'Reply with the single word ok.' --output-format json < /dev/null`
- **Exit status:** `0`
- **Stdout (253 bytes):**
```text
{"conversation_id":"8164b7b4-2a2e-4ca6-ac82-be6257f825ec","status":"SUCCESS","response":"ok\n","duration_seconds":30.669021,"num_turns":1,"usage":{"input_tokens":50112,"output_tokens":95,"thinking_tokens":90,"cache_read_tokens":0,"total_tokens":50207}}
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Failing evidence under spec §2.2. The single JSON response object contains only `conversation_id`, `status`, `response`, `duration_seconds`, `num_turns`, and `usage`; both `provider` and `model` are absent (`structured per-session or per-response metadata naming the provider and exact model actually used` is not met).

### 4.87 B3 item 5 (structured output 2/4): `-p 'Reply with the single word ok.' --output-format json --model gemini-4-argon-high` (`06_02_json_model`)

- **Command:** `/Users/michaeldaley/.local/bin/agy -p 'Reply with the single word ok.' --output-format json --model gemini-4-argon-high < /dev/null`
- **Exit status:** `0`
- **Stdout (253 bytes):**
```text
{"conversation_id":"374c6485-5164-445c-8cf6-db3f06a30df5","status":"SUCCESS","response":"ok\n","duration_seconds":27.607336,"num_turns":1,"usage":{"input_tokens":50114,"output_tokens":77,"thinking_tokens":72,"cache_read_tokens":0,"total_tokens":50191}}
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Failing evidence under spec §2.2. Even when `--model gemini-4-argon-high` is supplied, the `--output-format json` response object contains only `conversation_id`, `status`, `response`, `duration_seconds`, `num_turns`, and `usage`, with both `provider` and `model` absent.

### 4.88 B3 item 5 (structured output 3/4): `-p 'Reply with the single word ok.' --output-format stream-json` (`06_03_stream_json_default`)

- **Command:** `/Users/michaeldaley/.local/bin/agy -p 'Reply with the single word ok.' --output-format stream-json < /dev/null`
- **Exit status:** `0`
- **Stdout (2432 bytes):**
```text
{"event":"init","conversation_id":"8387dbf0-ec3c-4e37-9173-d873323f1036","init":{"cwd":"/Users/michaeldaley/madventures-tui-m25-task56-r1","tools":["ask_custom_permission","ask_permission","ask_question","browser_click_element","browser_drag_pixel_to_pixel","browser_get_dom","browser_get_network_request","browser_input","browser_list_network_requests","browser_mouse_down","browser_mouse_up","browser_move_mouse","browser_press_key","browser_refresh_page","browser_resize_window","browser_scroll","browser_scroll_dom","browser_select_option","browser_subagent","call_mcp_tool","capture_browser_console_logs","capture_browser_screenshot","click_browser_pixel","command_status","define_subagent","delete_knowledge","execute_browser_javascript","find_by_name","finish","generate_image","grep_search","invoke_subagent","list_browser_pages","list_dir","list_permissions","list_plugin_accounts","list_resources","manage_inbox","manage_subagents","manage_task","multi_replace_file_content","notebook_edit","notebook_execution","open_browser_url","read_browser_page","read_resource","read_url_content","replace_file_content","run_command","run_workflow","schedule","search_marketplace","search_web","sed_file","send_command_input","send_message","view_file","wait","wait_5_seconds","write_to_file"],"permission_mode":"always-proceed"}}
{"event":"step_update","step_update":{"conversation_id":"8387dbf0-ec3c-4e37-9173-d873323f1036","step_index":0,"state":"DONE","step_type":"user_input"}}
{"event":"step_update","step_update":{"conversation_id":"8387dbf0-ec3c-4e37-9173-d873323f1036","step_index":1,"state":"DONE","step_type":"unknown","duration_seconds":0.000127}}
{"event":"step_update","step_update":{"conversation_id":"8387dbf0-ec3c-4e37-9173-d873323f1036","step_index":2,"state":"ACTIVE","step_type":"agent_response","text_delta":"ok"}}
{"event":"step_update","step_update":{"conversation_id":"8387dbf0-ec3c-4e37-9173-d873323f1036","step_index":2,"state":"DONE","step_type":"agent_response","text_delta":"\n","duration_seconds":6.170532,"usage":{"input_tokens":50114,"output_tokens":54,"thinking_tokens":49,"cache_read_tokens":0,"total_tokens":50168}}}
{"event":"result","result":{"conversation_id":"8387dbf0-ec3c-4e37-9173-d873323f1036","status":"SUCCESS","response":"ok\n","duration_seconds":25.678612,"num_turns":1,"usage":{"input_tokens":50114,"output_tokens":54,"thinking_tokens":49,"cache_read_tokens":0,"total_tokens":50168}}}
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Failing evidence under spec §2.2 (`DEC-20261016-03` B4 item 1; `DEC-20261016-04` B6). Emits `init`, `step_update` (`user_input`, `unknown`, `agent_response`), and `result` NDJSON events. When `--model` is omitted on the command line, `init.model` is absent (`init` contains only `cwd`, `tools`, and `permission_mode`), `provider` is absent in all events, and `step_update` and `result` carry neither `provider` nor `model`.

### 4.89 B3 item 5 (structured output 4/4): `-p 'Reply with the single word ok.' --output-format stream-json --model gemini-4-argon-high` (`06_04_stream_json_model`)

- **Command:** `/Users/michaeldaley/.local/bin/agy -p 'Reply with the single word ok.' --output-format stream-json --model gemini-4-argon-high < /dev/null`
- **Exit status:** `0`
- **Stdout (2462 bytes):**
```text
{"event":"init","conversation_id":"d526de61-3c5c-41ba-8922-a75b15056f07","init":{"model":"gemini-4-argon-high","cwd":"/Users/michaeldaley/madventures-tui-m25-task56-r1","tools":["ask_custom_permission","ask_permission","ask_question","browser_click_element","browser_drag_pixel_to_pixel","browser_get_dom","browser_get_network_request","browser_input","browser_list_network_requests","browser_mouse_down","browser_mouse_up","browser_move_mouse","browser_press_key","browser_refresh_page","browser_resize_window","browser_scroll","browser_scroll_dom","browser_select_option","browser_subagent","call_mcp_tool","capture_browser_console_logs","capture_browser_screenshot","click_browser_pixel","command_status","define_subagent","delete_knowledge","execute_browser_javascript","find_by_name","finish","generate_image","grep_search","invoke_subagent","list_browser_pages","list_dir","list_permissions","list_plugin_accounts","list_resources","manage_inbox","manage_subagents","manage_task","multi_replace_file_content","notebook_edit","notebook_execution","open_browser_url","read_browser_page","read_resource","read_url_content","replace_file_content","run_command","run_workflow","schedule","search_marketplace","search_web","sed_file","send_command_input","send_message","view_file","wait","wait_5_seconds","write_to_file"],"permission_mode":"always-proceed"}}
{"event":"step_update","step_update":{"conversation_id":"d526de61-3c5c-41ba-8922-a75b15056f07","step_index":0,"state":"DONE","step_type":"user_input"}}
{"event":"step_update","step_update":{"conversation_id":"d526de61-3c5c-41ba-8922-a75b15056f07","step_index":1,"state":"DONE","step_type":"unknown","duration_seconds":0.000518}}
{"event":"step_update","step_update":{"conversation_id":"d526de61-3c5c-41ba-8922-a75b15056f07","step_index":2,"state":"ACTIVE","step_type":"agent_response","text_delta":"ok"}}
{"event":"step_update","step_update":{"conversation_id":"d526de61-3c5c-41ba-8922-a75b15056f07","step_index":2,"state":"DONE","step_type":"agent_response","text_delta":"\n","duration_seconds":6.154418,"usage":{"input_tokens":50115,"output_tokens":71,"thinking_tokens":66,"cache_read_tokens":0,"total_tokens":50186}}}
{"event":"result","result":{"conversation_id":"d526de61-3c5c-41ba-8922-a75b15056f07","status":"SUCCESS","response":"ok\n","duration_seconds":27.034524,"num_turns":1,"usage":{"input_tokens":50115,"output_tokens":71,"thinking_tokens":66,"cache_read_tokens":0,"total_tokens":50186}}}
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Failing evidence under spec §2.2 (`DEC-20261016-03` B4 item 1; `DEC-20261016-04` B6). Strictly as shown by comparing this capture with `06_03_stream_json_default`: `init.model` (`"gemini-4-argon-high"`) appears when `--model` is supplied and is absent when `--model` is omitted, `provider` is absent in all cases, `step_update` and `result` carry neither `provider` nor `model`, and whether `init.model` is a flag echo or a conditionally emitted resolved model cannot be proven from CLI output alone and fails spec §2.2 either way.

### 4.90 Post-investigation `command -v agy` (`09a_post_which`)

- **Command:** `command -v agy < /dev/null`
- **Exit status:** `0`
- **Stdout (35 bytes):**
```text
/Users/michaeldaley/.local/bin/agy
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Post-investigation binary path resolution check (`DEC-20261016-05` B3; `DEC-20261016-04` B3; `DEC-20261015-04` B5). Matches pre-investigation path `/Users/michaeldaley/.local/bin/agy`.

### 4.91 Post-investigation `shasum -a 256 /Users/michaeldaley/.local/bin/agy` (`09b_post_shasum`)

- **Command:** `shasum -a 256 /Users/michaeldaley/.local/bin/agy < /dev/null`
- **Exit status:** `0`
- **Stdout (101 bytes):**
```text
a4502aaf310b2fd6eb657fcfec2fcc31a690fbbd0c2d14c8eefbb556409024ce  /Users/michaeldaley/.local/bin/agy
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Post-investigation binary SHA-256 check (`DEC-20261016-05` B3; `DEC-20261016-04` B3; `DEC-20261015-04` B5). Matches pre-investigation SHA-256 `a4502aaf310b2fd6eb657fcfec2fcc31a690fbbd0c2d14c8eefbb556409024ce`.

### 4.92 Post-investigation `agy --version` (`09c_post_version`)

- **Command:** `/Users/michaeldaley/.local/bin/agy --version < /dev/null`
- **Exit status:** `0`
- **Stdout (6 bytes):**
```text
1.4.0
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Post-investigation version check (`DEC-20261016-05` B3; `DEC-20261016-04` B3; `DEC-20261015-04` B5). Matches pre-investigation version `1.4.0`.

---

### 4.93 Undocumented and prohibited help forms recorded as skipped (`DEC-20261016-05` B2, B3, Part F)

Under `DEC-20261016-05` B3, help probes are restricted to forms explicitly documented by `agy 1.4.0`'s own help output that do not execute operations. The following forms were not executed in this run and are recorded as skipped, citing the ratified evidence records `/Users/michaeldaley/task56-r2-input/builder-stop-r2-reinvestigation.txt` (SHA-256 `949be70ec95ba91e0500f352306a084861b87d7b246069c0af049bd3a6f04c87`) and `/Users/michaeldaley/task56-r2-input/builder-step3-commands-r2.txt` (SHA-256 `a0ab3bba19c2dcb0da4f2e95e89c7d9b5a33bfc63e5cf804fb4afd471f9449d5`):

1. **Top-level undocumented single-dash form (`1` form):** `agy -help` — not documented in `agy --help` (`DEC-20261016-05` B3 item 1).
2. **Subcommand undocumented flag forms (`24` forms across the 12 top-level subcommands):**
   - For the 6 subcommands whose `agy help <subcommand>` output documents no `Flags:` section (`help`, `mcp`, `plugin`, `plugins`, `remote-control`, `update`): `--help`, `-h`, and `-help` (`18` forms) are undocumented and skipped under `DEC-20261016-05` B3 item 2 (as documented in `/Users/michaeldaley/task56-r2-input/builder-step3-commands-r2.txt`, `agy help --help`, `agy help -h`, and `agy help -help` fail with exit `1` and `Error: unknown subcommand: --help` / `-h` / `-help`).
   - For the 6 subcommands whose `agy help <subcommand>` output documents only `-h` and `--help` under `Flags:` (`agent`, `agents`, `changelog`, `install`, `mic-serve`, `models`): single-dash `-help` (`6` forms) is not documented under `Flags:` and is skipped under `DEC-20261016-05` B3 item 2.
3. **Nested `mcp` and `remote-control` undocumented forms (`16` forms):**
   - For `mcp` (`add`, `remove`, `list`, `enable`, `disable`): `agy mcp <subcommand> -help` and `agy mcp help <subcommand>` (`10` forms) are not documented by `agy help mcp` (which instructs `Run "agy mcp <subcommand> --help"`, while `agy mcp <subcommand> --help` documents only `-h` and `--help` under `Flags:`, and `agy mcp help <subcommand>` fails with `Unknown mcp subcommand: help` in `builder-step3-commands-r2.txt`).
   - For `remote-control` (`start`, `status`, `stop`): `agy remote-control <subcommand> -help` and `agy remote-control help <subcommand>` (`6` forms) are not documented by `agy help remote-control` (which instructs `Run "agy remote-control <subcommand> --help"`, while `agy remote-control <subcommand> --help` documents only `-h` and `--help` under `Flags:`, and `agy remote-control help <subcommand>` fails with `Unknown remote-control subcommand: help` in `builder-step3-commands-r2.txt`).
4. **Prohibited positional flag forms on nested `plugin` and `plugins` subcommands (`42` forms, `DEC-20261016-05` B2 item 4, B3 item 3, Part F):**
   - `agy plugin <nested> --help`, `agy plugin <nested> -h`, `agy plugin <nested> -help`, `agy plugins <nested> --help`, `agy plugins <nested> -h`, and `agy plugins <nested> -help` across all 7 nested commands (`list`, `import`, `install`, `uninstall`, `enable`, `disable`, `validate`) — `42` forms total.
   - As proven by `/Users/michaeldaley/task56-r2-input/builder-stop-r2-reinvestigation.txt` (`949be70ec95ba91e0500f352306a084861b87d7b246069c0af049bd3a6f04c87`) and `/Users/michaeldaley/task56-r2-input/builder-step3-commands-r2.txt` (`a0ab3bba19c2dcb0da4f2e95e89c7d9b5a33bfc63e5cf804fb4afd471f9449d5`), `agy plugin` and `agy plugins` have no per-subcommand `--help`, `-h`, or `-help` flags; passing those flags dispatches the nested subcommand with the flag string as its positional `<target>` / `<name>` / `[source]` / `[path]` argument (causing `install` to fail with a marketplace installation error, `import` to fail with `unknown source`, `uninstall` to rewrite `~/.gemini/config/import_manifest.json` and print `Uninstalled plugin "--help"`, `enable`/`disable` to fail with `not found`, `validate` to fail with `stat --help: no such file or directory`, and `list` to ignore unknown arguments and list installed plugins).

### 4.94 B3 item 6: `--status`, `--account`, `--whoami`, and other non-mutating commands reporting model, provider, or session of a run

- `--status`, `--account`, and `--whoami` are not listed in `agy --help` or in any subcommand help output; per `DEC-20261015-04` B3 item 6, they are recorded as skipped and were not executed.
- Inspection of `agy --help` and all 79 captured help outputs in §§4.5–4.83 confirms that `agy 1.4.0` documents no other non-mutating command or flag that reports the resolved provider, exact model, or session identity of a run.

### 4.95 B4: Auth-readiness primitive check

None documented. Inspection of `agy --help` and all 79 captured help outputs in §§4.5–4.83 confirms that `agy 1.4.0` documents no `auth`, `login`, `logout`, `status`, or `whoami` subcommand or flag for querying account authentication readiness (`remote-control status` reports only the local remote-control background daemon state). Per `DEC-20261015-04` B4, no sign-in, sign-out, or account mutation was performed, and `auth_readiness` is recorded as `{ "result": "no_primitive", "primitive": null }`.

### 4.96 B3 item 7: Every flag and subcommand in `agy --help` and what it controls

From the help text captured in §4.5 (`02_01_top_help_long`), the subcommand and nested help captures in §§4.8–4.83, and the outputs of §§4.84–4.89 (`04_models`, `05_config_get_model`, `06_01`–`06_04`), every top-level flag and subcommand in `agy --help` controls the following:

| Top-level flag / subcommand | What it controls (from `agy --help` and B3 item 1–6 outputs) |
| --- | --- |
| `--add-dir` | Repeatable flag (default `[]`) that adds a directory to the workspace for the CLI session. Does not report session identity or auth state. |
| `--agent` | Selects the agent for the current CLI session (prohibited in B3 probes). Does not report session identity or auth state. |
| `-c` | Short alias for `--continue` (prohibited in B3 probes). |
| `--continue` | Continues the most recent conversation (prohibited in B3 probes). |
| `--conversation` | Resumes a previous conversation by ID (prohibited in B3 probes). |
| `--dangerously-skip-permissions` | Auto-approves all tool permission requests without prompting (prohibited in B3 probes). |
| `--disable-slash-commands` | Disables slash command and skill expansion in print mode. |
| `--effort` | Sets reasoning effort for the current CLI session (`low|medium|high|xhigh|max`). |
| `-i` | Short alias for `--prompt-interactive`. |
| `--input-format` | Sets input format for print mode (`text`, `stream-json`; default `text`). `stream-json` reads one NDJSON message per line from stdin and requires `--output-format stream-json`. |
| `--json-schema` | Supplies an optional JSON schema string or file path to enforce structured output on the response (for `stream-json`, only applicable to the final result). |
| `--log-file` | Overrides the CLI log file path. |
| `--mode` | Sets the agent execution mode for the session (`accept-edits`, `auto`, `plan`). |
| `--model` | Requests a model for the current CLI session. As shown in §§4.86–4.89 (`06_01`–`06_04`), passing `--model gemini-4-argon-high` does not cause `--output-format json` to emit any `model` or `provider` field, and in `--output-format stream-json` `init.model` appears when `--model` is supplied and is absent when `--model` is omitted while `provider` is absent in all cases. Under spec §2.2, neither `--model` nor `init.model` is accepted as identity evidence. |
| `--new-project` | Creates a new project for the current CLI session. |
| `--output-format` | Sets the output format for print mode (`text`, `json`, `stream-json`; default `text`). Tested in §§4.86–4.89 (`06_01`–`06_04`): `json` emits a single object with `conversation_id`, `status`, `response`, `duration_seconds`, `num_turns`, and `usage`; `stream-json` emits `init`, `step_update`, and `result` NDJSON lines; neither mode emits `provider`. |
| `-p` | Short alias for `--print`; runs a single prompt non-interactively and prints the response (used in §§4.86–4.89). |
| `--print` | Runs a single prompt non-interactively and prints the response. |
| `--print-timeout` | Optional time limit for print mode (`0s` default waits until the turn completes). |
| `--project` | Specifies the project ID or project name for the current CLI session. |
| `--prompt` | Alias for `--print`. |
| `--prompt-interactive` | Runs an initial prompt interactively and continues the session. |
| `--remote-control` | Creates a remote connection for the CLI session on startup. |
| `--sandbox` | Runs the session in a sandbox with terminal restrictions enabled. |
| Subcommand `agent` / `agents` | Lists available agents (`-h` / `--help` show help). |
| Subcommand `changelog` | Shows CLI changelog and release notes (`-h` / `--help` show help). |
| Subcommand `help` | Shows help for subcommands (`agy help <subcommand>`). |
| Subcommand `install` | Configures environment paths and shell settings (`--dir`, `--skip-aliases`, `--skip-path`, `-h`, `--help`). Not executed per `DEC-20261016-05` Part F. |
| Subcommand `mcp` | Manages MCP server configurations via nested subcommands `add`, `remove`, `list`, `enable`, and `disable`. |
| Subcommand `mic-serve` | Serves the local machine's microphone to a CLI on another host (`--addr`, `-h`, `--help`). |
| Subcommand `models` | Lists available models in the catalog (captured in §4.84, `04_models`). |
| Subcommand `plugin` / `plugins` | Manages plugins via nested commands `list`, `import`, `install`, `uninstall`, `enable`, `disable`, `validate`, `link`, and `help`. |
| Subcommand `remote-control` | Manages the remote-control background daemon via nested subcommands `start`, `status`, and `stop`. |
| Subcommand `update` | Updates the CLI binary. Not executed per `DEC-20261016-05` Part F. |

---

## 5. Rubric evaluation, verdicts, and redaction accounting (plan §9.3; DEC-20261016-05 B6; DEC-20261016-04 B5, B6; DEC-20261016-03 B4 item 1; DEC-20261015-04 B6, B8)

- **Identity attestation verdict (`identity_attestation`):**
  - `result`: `"fail"`
  - `primitive`: `"agy config get model"`
  - **Precise rubric clauses not met (spec §2.2 / plan §9.2):**
    1. `a documented CLI or API primitive returning the resolved provider and exact model for the actual session` — not met (`agy config get model` exits with code `2` and `Error: unexpected argument "config".`, and no other CLI subcommand or flag returns resolved session identity).
    2. `structured per-session or per-response metadata naming the provider and exact model actually used` — not met (`--output-format json` with and without `--model gemini-4-argon-high` emits only `conversation_id`, `status`, `response`, `duration_seconds`, `num_turns`, and `usage` with no `provider` or `model` field; in `--output-format stream-json`, `init.model` appears when `--model` is supplied and is absent when `--model` is omitted, `provider` is absent in all cases, `step_update` and `result` carry neither `provider` nor `model`, and whether `init.model` is a flag echo or a conditionally emitted resolved model cannot be proven from CLI output alone and fails spec §2.2 either way).
  - Neither `config get model` nor `init.model` (nor any requested-model echo) is accepted as identity evidence under spec §2.2.
- **Auth-readiness verdict (`auth_readiness`):** `{ "result": "no_primitive", "primitive": null }`.
- **PTY and governed-session verdict (`pty`):** `{ "result": "fail", "observed_ms": {} }`. No governed session of the real binary ran, because spec §9.13 forbids a live session of a surface without a verified identity primitive.
- **Role and independent-review eligibility:** `role_eligibility: []`, `independent_review_eligible: false`.
- **Version difference against `ANTIGRAVITY_REGISTRATION`:** Observed binary version is `1.4.0`, whereas `ANTIGRAVITY_REGISTRATION.supported_versions` in `packages/protocol/src/adapter-registry.ts` is `["1.1.13"]` (and `docs/verification/phase-3a-antigravity-preliminary.md` recorded `1.1.12`, while superseded Round 1 recorded `1.3.6`).
- **Overall verdict (`overall`):** `"fail"`. Antigravity remains ineligible for governed execution in Phase 3A (spec §§2.3, 6.6, 9.13).
- **Redaction accounting (spec §5.6; `DEC-20261015-04` B8; `DEC-20261016-04` B6):**
  - Rules applied (`redaction_rules_applied`): `["spec-5.6-token-patterns", "spec-5.6-account-identifiers", "spec-5.6-email-addresses"]`.
  - In-place redactions performed: `0` (none of the 184 captured stdout or stderr streams across the 92 probes contained a token pattern, account identifier, or email address).

---

## Capability record

- **Stored record path:** `/Users/michaeldaley/Library/Application Support/MADVentures/madventures-tui/capability/antigravity/2026-10-16T20:43:50.078Z-a4502aaf310b.json`
- **Stored record filename:** `2026-10-16T20:43:50.078Z-a4502aaf310b.json`
- **Stored record SHA-256:** `0b7e9d47a31d4e9439ad1846f949f57518defcebfe3ef6ab0dbbfa98673ee983`

```json
{"surface":"antigravity","provider":"google","requested_model":"gemini-4-argon-high","role_eligibility":[],"independence_domain":"google","organization_id":"google","cli_version":"1.4.0","binary_path":"/Users/michaeldaley/.local/bin/agy","binary_sha256":"a4502aaf310b2fd6eb657fcfec2fcc31a690fbbd0c2d14c8eefbb556409024ce","evaluated_at":"2026-10-16T20:43:50.078Z","expires_at":"2026-11-15T20:43:50.078Z","host":{"arch":"arm64","macos_version":"27.0.1","macos_build":"26A434","bun_version":"1.4.2","bun_path":"/Users/michaeldaley/.bun/bin/bun","bun_sha256":"35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5","term":"dumb","shell":"/bin/zsh"},"identity_attestation":{"result":"fail","primitive":"agy config get model","sanitized_facts":"Spec section 2.2 requires either a documented CLI or API primitive returning the resolved provider and exact model for the actual session, or structured per-session or per-response metadata naming the provider and exact model actually used. Neither clause is met on agy 1.4.0: 'agy config get model' exits with code 2 ('Error: unexpected argument \"config\".'); '--output-format json' (with and without '--model gemini-4-argon-high') emits only conversation_id, status, response, duration_seconds, num_turns and usage with no provider or model field; and '--output-format stream-json' omits init.model when '--model' is not supplied and includes init.model when '--model gemini-4-argon-high' is supplied while omitting provider in all cases and omitting both provider and model from step_update and result events (whether init.model is a flag echo or a conditionally emitted resolved model cannot be proven from CLI output alone and fails spec section 2.2 either way)."},"auth_readiness":{"result":"no_primitive","primitive":null},"pty":{"result":"fail","observed_ms":{}},"independent_review_eligible":false,"limitations":["configuration-only identity evidence — no actual-session identity primitive exists","no documented non-mutating non-interactive auth-readiness primitive","no governed session of the real binary ran, because spec section 9.13 forbids a live session of a surface without a verified identity primitive","observed CLI version 1.4.0 differs from ANTIGRAVITY_REGISTRATION.supported_versions [\"1.1.13\"] in packages/protocol/src/adapter-registry.ts","agy config get model exited with status 2 ('Error: unexpected argument \"config\".') because agy 1.4.0 has no config subcommand","stream-json init.model appears when --model is supplied and is absent when --model is omitted, provider is absent in all cases, and whether init.model is a flag echo or a conditionally emitted resolved model cannot be proven from CLI output alone and fails spec section 2.2 either way"],"overall":"fail","redaction_rules_applied":["spec-5.6-token-patterns","spec-5.6-account-identifiers","spec-5.6-email-addresses"]}
```
