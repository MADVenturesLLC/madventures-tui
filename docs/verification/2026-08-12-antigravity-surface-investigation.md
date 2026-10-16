# Formal Antigravity Surface Investigation (Phase 3A Task 56 / M25)

- **Date:** `2026-10-16`
- **Governing authorization:** `FOUNDER-ACT-20261015-TASK56-EXECUTION-AUTHORIZATION` (`docs/decisions/DEC-20261015-04-task56-antigravity-investigation.md`, SHA-256 `1c9b9ca5ebdac214494d0ea7e5e2c0b9f493c53dfbc6ca7ff28e329dc95c2602`)
- **Binding base commit:** `be996b1fd7ccbc1f5fdee914b1e9de31020b8461` (`build/m25-task56-r1`)
- **Investigated surface:** `antigravity` (`/Users/michaeldaley/.local/bin/agy`)
- **Relationship to Task 60:** `docs/verification/phase-3a-antigravity-preliminary.md` is historical Stage 0 evidence captured on the Founder iMac against `agy 1.1.13`. Per spec §§2.1 and 2.3, plan §9.3, and `DEC-20261015-04` A3, its attestation is not reused; every observation and the `CapabilityRecordV1` in this report were produced fresh on the Founder MacBook.

---

## 1. Host, runtime, and binary facts (plan §9.3; DEC-20261015-04 B3, B5, B6, B12)

| Field | Observed value |
| --- | --- |
| Surface (`surface`) | `antigravity` |
| Provider (`provider`, copied from `ANTIGRAVITY_REGISTRATION`) | `google` |
| Independence domain (`independence_domain`, copied from `ANTIGRAVITY_REGISTRATION`) | `google` |
| Organization ID (`organization_id`, copied from `ANTIGRAVITY_REGISTRATION`) | `google` |
| Requested model (`requested_model`, `DEC-20261015-04` B5) | `gemini-4-argon-high` |
| Adapter registry `supported_versions` (`packages/protocol/src/adapter-registry.ts`) | `["1.1.13"]` |
| Observed CLI version (`cli_version`) | `1.3.6` |
| Absolute binary path (`binary_path`, via `command -v agy`) | `/Users/michaeldaley/.local/bin/agy` |
| Binary SHA-256 before investigation (`shasum -a 256 /Users/michaeldaley/.local/bin/agy`) | `827ba22b4aa33557614a57aac2cc13f386e17db6b802febd3932226906ac05ab` |
| Binary `--version` before investigation | `1.3.6` (exit `0`, stderr `0` bytes) |
| Binary SHA-256 after investigation (`shasum -a 256 /Users/michaeldaley/.local/bin/agy`) | `827ba22b4aa33557614a57aac2cc13f386e17db6b802febd3932226906ac05ab` |
| Binary `--version` after investigation | `1.3.6` (exit `0`, stderr `0` bytes) |
| Host architecture (`uname -sm` / `host.arch`) | `Darwin arm64` (`arm64`) |
| macOS version (`sw_vers -productVersion` / `host.macos_version`) | `27.0.1` |
| macOS build (`sw_vers -buildVersion` / `host.macos_build`) | `26A434` |
| Bun version (`host.bun_version`) | `1.4.2` (revision `744846f844374847c902b5e7fd59b4342a51ef99`) |
| Bun executable path (`host.bun_path`) | `/Users/michaeldaley/.bun/bin/bun` |
| Bun executable SHA-256 (`host.bun_sha256`) | `35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5` |
| Terminal (`host.term`) | `dumb` |
| Shell (`host.shell`) | `/bin/zsh` |
| Evaluated timestamp (`evaluated_at`) | `2026-10-16T03:11:04.805Z` |
| Expiration horizon (`expires_at`, 30 days per `PLAN-OPEN-3`) | `2026-11-15T03:11:04.805Z` |

---

## 2. Fixed identity and auth-readiness rubrics (spec §§2.2, 2.3, 5.4, 9.13; plan §9.2; DEC-20261015-04 B2, B4)

The identity rubric (spec §2.2, plan §9.2) and auth-readiness rule (spec §5.4, `DEC-20261015-04` B4) were fixed before the investigation and applied unchanged:

- **Passing identity evidence (either one required):**
  1. `a documented CLI or API primitive returning the resolved provider and exact model for the actual session`; or
  2. `structured per-session or per-response metadata naming the provider and exact model actually used`.
- **Failing identity evidence (all of these):** configuration files; requested flags or environment values; marketing names or version banners; unstructured prose; behavioral inference; cached attestations; any statement of requested intent rather than resolved fact.
- **Auth-readiness rule (`DEC-20261015-04` B4):** the builder signs in to nothing, signs out of nothing, and changes no account state; `auth_readiness.result` is `no_primitive` with `primitive: null` unless the binary's help output documents a non-mutating, non-interactive primitive for checking authentication state.

---

## 3. Primitives attempted and verbatim outputs (plan §9.3; DEC-20261015-04 B3, B4, B8)

Every command below was executed once with stdin redirected from `/dev/null`, stdout and stderr captured to separate files under the disposable scratch root, and the exit status read from `$?` immediately after completion.

### 3.0 Pre-investigation binary `--version` check

- **Command:** `/Users/michaeldaley/.local/bin/agy --version < /dev/null`
- **Exit status:** `0`
- **Stdout (6 bytes):**
```text
1.3.6
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Pre-investigation version check (B3). Confirms CLI version `1.3.6` prior to running the B3 primitive sequence; version banner only, not session identity evidence under spec §2.2.

### 3.1 B3 item 1: `agy --version`

- **Command:** `/Users/michaeldaley/.local/bin/agy --version < /dev/null`
- **Exit status:** `0`
- **Stdout (6 bytes):**
```text
1.3.6
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Failing evidence under spec §2.2 (version banner only; does not report resolved provider or exact model for an actual session).

### 3.2.1 B3 item 2: `agy --help`

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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Lists 24 top-level flags and 12 subcommands (`agent`, `agents`, `changelog`, `help`, `install`, `mcp`, `mic-serve`, `models`, `plugin`, `plugins`, `remote-control`, `update`). Documents `--output-format` (`text`, `json`, `stream-json`), `--print` / `-p`, and `--model`. Documents no `config` subcommand, no actual-session identity primitive, and no auth/status primitive.

### 3.2.2 B3 item 2: `agy -help`

- **Command:** `/Users/michaeldaley/.local/bin/agy -help < /dev/null`
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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Byte-identical stderr and exit status to `agy --help`.

### 3.2.3 B3 item 2: `agy help`

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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Byte-identical stderr and exit status to `agy --help`.

### 3.2.agent.a `agy help agent`

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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Documents the `agent` subcommand surface; does not return resolved provider or exact model for an actual session.

### 3.2.agent.b `agy agent --help`

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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Identical help output and exit status to `agy help agent`; does not return resolved provider or exact model for an actual session.

### 3.2.agents.a `agy help agents`

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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Documents the `agents` subcommand surface; does not return resolved provider or exact model for an actual session.

### 3.2.agents.b `agy agents --help`

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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Identical help output and exit status to `agy help agents`; does not return resolved provider or exact model for an actual session.

### 3.2.changelog.a `agy help changelog`

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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Documents the `changelog` subcommand surface; does not return resolved provider or exact model for an actual session.

### 3.2.changelog.b `agy changelog --help`

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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Identical help output and exit status to `agy help changelog`; does not return resolved provider or exact model for an actual session.

### 3.2.help.a `agy help help`

- **Command:** `/Users/michaeldaley/.local/bin/agy help help < /dev/null`
- **Exit status:** `1`
- **Stdout (0 bytes):**
```text
```
- **Stderr (34 bytes):**
```text
Error: unknown subcommand: --help
```
- **Rubric evaluation:** Documentation probe only (B3 item 2). Documents the `help` subcommand surface; does not return resolved provider or exact model for an actual session.

### 3.2.help.b `agy help --help`

- **Command:** `/Users/michaeldaley/.local/bin/agy help --help < /dev/null`
- **Exit status:** `1`
- **Stdout (0 bytes):**
```text
```
- **Stderr (34 bytes):**
```text
Error: unknown subcommand: --help
```
- **Rubric evaluation:** Documentation probe only (B3 item 2). Identical help output and exit status to `agy help help`; does not return resolved provider or exact model for an actual session.

### 3.2.install.a `agy help install`

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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Documents the `install` subcommand surface; does not return resolved provider or exact model for an actual session.

### 3.2.install.b `agy install --help`

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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Identical help output and exit status to `agy help install`; does not return resolved provider or exact model for an actual session.

### 3.2.mcp.a `agy help mcp`

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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Documents the `mcp` subcommand surface; does not return resolved provider or exact model for an actual session.

### 3.2.mcp.b `agy mcp --help`

- **Command:** `/Users/michaeldaley/.local/bin/agy mcp --help < /dev/null`
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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Identical help output and exit status to `agy help mcp`; does not return resolved provider or exact model for an actual session.

### 3.2.mic-serve.a `agy help mic-serve`

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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Documents the `mic-serve` subcommand surface; does not return resolved provider or exact model for an actual session.

### 3.2.mic-serve.b `agy mic-serve --help`

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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Identical help output and exit status to `agy help mic-serve`; does not return resolved provider or exact model for an actual session.

### 3.2.models.a `agy help models`

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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Documents the `models` subcommand surface; does not return resolved provider or exact model for an actual session.

### 3.2.models.b `agy models --help`

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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Identical help output and exit status to `agy help models`; does not return resolved provider or exact model for an actual session.

### 3.2.plugin.a `agy help plugin`

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugin < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (501 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path]        Validate a plugin
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (B3 item 2). Documents the `plugin` subcommand surface; does not return resolved provider or exact model for an actual session.

### 3.2.plugin.b `agy plugin --help`

- **Command:** `/Users/michaeldaley/.local/bin/agy plugin --help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (501 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path]        Validate a plugin
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (B3 item 2). Identical help output and exit status to `agy help plugin`; does not return resolved provider or exact model for an actual session.

### 3.2.plugins.a `agy help plugins`

- **Command:** `/Users/michaeldaley/.local/bin/agy help plugins < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (501 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path]        Validate a plugin
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (B3 item 2). Documents the `plugins` subcommand surface; does not return resolved provider or exact model for an actual session.

### 3.2.plugins.b `agy plugins --help`

- **Command:** `/Users/michaeldaley/.local/bin/agy plugins --help < /dev/null`
- **Exit status:** `0`
- **Stdout (0 bytes):**
```text
```
- **Stderr (501 bytes):**
```text
Usage: agy plugin <command> [arguments]

Commands:
  list [--json]          List installed plugins
  import [source]        Import plugins from gemini or claude
  install <target>       Install a plugin (supports plugin[@marketplace])
  uninstall <name>       Uninstall a plugin
  enable <name>          Enable a plugin
  disable <name>         Disable a plugin
  validate [path]        Validate a plugin
  link <mp> <target>     Generate link to a marketplace
  help                   Show this help
```
- **Rubric evaluation:** Documentation probe only (B3 item 2). Identical help output and exit status to `agy help plugins`; does not return resolved provider or exact model for an actual session.

### 3.2.remote-control.a `agy help remote-control`

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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Documents the `remote-control` subcommand surface; does not return resolved provider or exact model for an actual session.

### 3.2.remote-control.b `agy remote-control --help`

- **Command:** `/Users/michaeldaley/.local/bin/agy remote-control --help < /dev/null`
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
- **Rubric evaluation:** Documentation probe only (B3 item 2). Identical help output and exit status to `agy help remote-control`; does not return resolved provider or exact model for an actual session.

### 3.2.update.a `agy help update`

- **Command:** `/Users/michaeldaley/.local/bin/agy help update < /dev/null`
- **Exit status:** `2`
- **Stdout (0 bytes):**
```text
```
- **Stderr (17 bytes):**
```text
Usage of update:
```
- **Rubric evaluation:** Documentation probe only (B3 item 2). Documents the `update` subcommand surface; does not return resolved provider or exact model for an actual session.

### 3.2.update.b `agy update --help`

- **Command:** `/Users/michaeldaley/.local/bin/agy update --help < /dev/null`
- **Exit status:** `2`
- **Stdout (0 bytes):**
```text
```
- **Stderr (17 bytes):**
```text
Usage of update:
```
- **Rubric evaluation:** Documentation probe only (B3 item 2). Identical help output and exit status to `agy help update`; does not return resolved provider or exact model for an actual session.

### 3.3 B3 item 3: `agy models`

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
- **Rubric evaluation:** Failing evidence under spec §2.2. Lists the 13 catalog models available to the surface (including `gemini-4-argon-high\tGemini 4 Argon (High)`, satisfying B5), but reports catalog availability only and does not attest which provider or exact model served an actual session.

### 3.4 B3 item 4: `agy config get model`

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
- **Rubric evaluation:** Failing evidence under spec §2.2 and plan §9.4. Registered at `packages/protocol/src/adapter-registry.ts:65` and `packages/adapter-antigravity/src/attestation.ts:41`; on `agy 1.3.6` it exits with status `2` because `config` is not a valid subcommand (`Error: unexpected argument "config".`). Even on versions where a config read exists, plan §9.4 classes it as configuration-only failing evidence.

### 3.5.1 B3 item 5 (`json` output mode without `--model`)

- **Command:** `/Users/michaeldaley/.local/bin/agy --print 'Reply with the single word ok.' --output-format json < /dev/null`
- **Exit status:** `0`
- **Stdout (255 bytes):**
```text
{"conversation_id":"32a4dd66-f23f-4f4b-90c8-7d8a76d89cff","status":"SUCCESS","response":"ok\n","duration_seconds":22.329264,"num_turns":1,"usage":{"input_tokens":49849,"output_tokens":162,"thinking_tokens":157,"cache_read_tokens":0,"total_tokens":50011}}
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Failing evidence under spec §2.2. The single JSON response object contains only `conversation_id`, `status`, `response`, `duration_seconds`, `num_turns`, and `usage`; it omits both `provider` and `model` (`structured per-session or per-response metadata naming the provider and exact model actually used` is not met).

### 3.5.2 B3 item 5 (`json` output mode with `--model gemini-4-argon-high`)

- **Command:** `/Users/michaeldaley/.local/bin/agy --print 'Reply with the single word ok.' --output-format json --model gemini-4-argon-high < /dev/null`
- **Exit status:** `0`
- **Stdout (262 bytes):**
```text
{"conversation_id":"b133bef2-22c0-47d2-9894-f7ddc6dce434","status":"SUCCESS","response":"ok\n","duration_seconds":14.728383000000001,"num_turns":1,"usage":{"input_tokens":49842,"output_tokens":49,"thinking_tokens":44,"cache_read_tokens":0,"total_tokens":49891}}
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Failing evidence under spec §2.2. Even when `--model gemini-4-argon-high` is explicitly supplied, the `--output-format json` response object contains only `conversation_id`, `status`, `response`, `duration_seconds`, `num_turns`, and `usage`, with no `provider` or `model` field.

### 3.5.3 B3 item 5 (`stream-json` output mode without `--model`)

- **Command:** `/Users/michaeldaley/.local/bin/agy --print 'Reply with the single word ok.' --output-format stream-json < /dev/null`
- **Exit status:** `0`
- **Stdout (2435 bytes):**
```text
{"event":"init","conversation_id":"3622543f-2b66-4293-8b5e-05a3b18efa54","init":{"cwd":"/Users/michaeldaley/madventures-tui-m25-task56-r1","tools":["ask_custom_permission","ask_permission","ask_question","browser_click_element","browser_drag_pixel_to_pixel","browser_get_dom","browser_get_network_request","browser_input","browser_list_network_requests","browser_mouse_down","browser_mouse_up","browser_move_mouse","browser_press_key","browser_refresh_page","browser_resize_window","browser_scroll","browser_scroll_dom","browser_select_option","browser_subagent","call_mcp_tool","capture_browser_console_logs","capture_browser_screenshot","click_browser_pixel","command_status","define_subagent","delete_knowledge","execute_browser_javascript","find_by_name","finish","generate_image","grep_search","invoke_subagent","list_browser_pages","list_dir","list_permissions","list_plugin_accounts","list_resources","manage_inbox","manage_subagents","manage_task","multi_replace_file_content","notebook_edit","notebook_execution","open_browser_url","read_browser_page","read_resource","read_url_content","replace_file_content","run_command","run_workflow","schedule","search_marketplace","search_web","sed_file","send_command_input","send_message","view_file","wait","wait_5_seconds","write_to_file"],"permission_mode":"always-proceed"}}
{"event":"step_update","step_update":{"conversation_id":"3622543f-2b66-4293-8b5e-05a3b18efa54","step_index":0,"state":"DONE","step_type":"user_input"}}
{"event":"step_update","step_update":{"conversation_id":"3622543f-2b66-4293-8b5e-05a3b18efa54","step_index":1,"state":"DONE","step_type":"unknown","duration_seconds":0.000203}}
{"event":"step_update","step_update":{"conversation_id":"3622543f-2b66-4293-8b5e-05a3b18efa54","step_index":2,"state":"ACTIVE","step_type":"agent_response","text_delta":"ok"}}
{"event":"step_update","step_update":{"conversation_id":"3622543f-2b66-4293-8b5e-05a3b18efa54","step_index":2,"state":"DONE","step_type":"agent_response","text_delta":"\n","duration_seconds":6.78447,"usage":{"input_tokens":49851,"output_tokens":155,"thinking_tokens":150,"cache_read_tokens":0,"total_tokens":50006}}}
{"event":"result","result":{"conversation_id":"3622543f-2b66-4293-8b5e-05a3b18efa54","status":"SUCCESS","response":"ok\n","duration_seconds":16.894967,"num_turns":1,"usage":{"input_tokens":49851,"output_tokens":155,"thinking_tokens":150,"cache_read_tokens":0,"total_tokens":50006}}}
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Failing evidence under spec §2.2. Emits `init`, `step_update` (`user_input`, `unknown`, `agent_response`), and `result` NDJSON events. When `--model` is omitted on the command line, `init` contains only `cwd`, `tools`, and `permission_mode` (no `model` field at all), and neither `step_update` nor `result` carries a `provider` or `model` field.

### 3.5.4 B3 item 5 (`stream-json` output mode with `--model gemini-4-argon-high`)

- **Command:** `/Users/michaeldaley/.local/bin/agy --print 'Reply with the single word ok.' --output-format stream-json --model gemini-4-argon-high < /dev/null`
- **Exit status:** `0`
- **Stdout (2467 bytes):**
```text
{"event":"init","conversation_id":"aab4715b-3f14-4918-b710-95d97f686400","init":{"model":"gemini-4-argon-high","cwd":"/Users/michaeldaley/madventures-tui-m25-task56-r1","tools":["ask_custom_permission","ask_permission","ask_question","browser_click_element","browser_drag_pixel_to_pixel","browser_get_dom","browser_get_network_request","browser_input","browser_list_network_requests","browser_mouse_down","browser_mouse_up","browser_move_mouse","browser_press_key","browser_refresh_page","browser_resize_window","browser_scroll","browser_scroll_dom","browser_select_option","browser_subagent","call_mcp_tool","capture_browser_console_logs","capture_browser_screenshot","click_browser_pixel","command_status","define_subagent","delete_knowledge","execute_browser_javascript","find_by_name","finish","generate_image","grep_search","invoke_subagent","list_browser_pages","list_dir","list_permissions","list_plugin_accounts","list_resources","manage_inbox","manage_subagents","manage_task","multi_replace_file_content","notebook_edit","notebook_execution","open_browser_url","read_browser_page","read_resource","read_url_content","replace_file_content","run_command","run_workflow","schedule","search_marketplace","search_web","sed_file","send_command_input","send_message","view_file","wait","wait_5_seconds","write_to_file"],"permission_mode":"always-proceed"}}
{"event":"step_update","step_update":{"conversation_id":"aab4715b-3f14-4918-b710-95d97f686400","step_index":0,"state":"DONE","step_type":"user_input"}}
{"event":"step_update","step_update":{"conversation_id":"aab4715b-3f14-4918-b710-95d97f686400","step_index":1,"state":"DONE","step_type":"unknown","duration_seconds":0.000093}}
{"event":"step_update","step_update":{"conversation_id":"aab4715b-3f14-4918-b710-95d97f686400","step_index":2,"state":"ACTIVE","step_type":"agent_response","text_delta":"ok"}}
{"event":"step_update","step_update":{"conversation_id":"aab4715b-3f14-4918-b710-95d97f686400","step_index":2,"state":"DONE","step_type":"agent_response","text_delta":"\n","duration_seconds":16.343728,"usage":{"input_tokens":49851,"output_tokens":139,"thinking_tokens":134,"cache_read_tokens":0,"total_tokens":49990}}}
{"event":"result","result":{"conversation_id":"aab4715b-3f14-4918-b710-95d97f686400","status":"SUCCESS","response":"ok\n","duration_seconds":26.287122,"num_turns":1,"usage":{"input_tokens":49851,"output_tokens":139,"thinking_tokens":134,"cache_read_tokens":0,"total_tokens":49990}}}
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Failing evidence under spec §2.2 and plan §9.2. The `init` event includes `"model":"gemini-4-argon-high"` before any turn runs, whereas `05c` (without `--model`) omits `init.model` entirely, proving `init.model` is a conditional echo of the CLI `--model` flag rather than provider-verified execution identity. Neither `step_update` nor `result` carries a `provider` or `model` field.

### 3.6 B3 item 6: Other non-mutating commands reporting model, provider, or session of a run

None. Inspection of the full `agy --help` output and all twelve subcommand help outputs in §3.2 confirms that `agy 1.3.6` documents no other non-mutating command or flag that reports the resolved model, provider, or session metadata of a run.

### 3.7 B4: Auth-readiness primitive check

None documented. Inspection of `agy --help` and all twelve subcommand help outputs in §3.2 confirms that `agy 1.3.6` documents no `auth`, `login`, `logout`, `status`, or `whoami` subcommand or flag for querying account authentication readiness (`remote-control status` reports only the local remote-control background daemon state). Per `DEC-20261015-04` B4, no sign-in, sign-out, or account mutation was performed, and `auth_readiness` is recorded as `{ "result": "no_primitive", "primitive": null }`.

### 3.8 Post-investigation binary `--version` check

- **Command:** `/Users/michaeldaley/.local/bin/agy --version < /dev/null`
- **Exit status:** `0`
- **Stdout (6 bytes):**
```text
1.3.6
```
- **Stderr (0 bytes):**
```text
```
- **Rubric evaluation:** Post-investigation version check (B3). Confirms CLI version remained `1.3.6` and binary SHA-256 remained `827ba22b4aa33557614a57aac2cc13f386e17db6b802febd3932226906ac05ab` after all B3 primitives completed.

---

## 4. Rubric evaluation, verdicts, and redaction accounting (plan §9.3; DEC-20261015-04 B6, B8)

- **Identity attestation verdict (`identity_attestation`):**
  - `result`: `"fail"`
  - `primitive`: `"agy config get model"`
  - **Precise rubric clauses not met (spec §2.2 / plan §9.2):**
    1. `a documented CLI or API primitive returning the resolved provider and exact model for the actual session` — not met (`agy config get model` exits `2` with `Error: unexpected argument "config".`, and no other CLI subcommand or flag returns resolved session identity).
    2. `structured per-session or per-response metadata naming the provider and exact model actually used` — not met (`--output-format json` emits no `provider` or `model` field; `--output-format stream-json` omits `init.model` unless `--model` is passed on the CLI and emits no `provider` or `model` field in `step_update` or `result`).
- **Auth-readiness verdict (`auth_readiness`):** `{ "result": "no_primitive", "primitive": null }`.
- **PTY and governed-session verdict (`pty`):** `{ "result": "fail", "observed_ms": {} }`. No governed session of the real binary ran, because spec §9.13 forbids a live session of a surface without a verified identity primitive.
- **Role and independent-review eligibility:** `role_eligibility: []`, `independent_review_eligible: false`.
- **Version difference against `ANTIGRAVITY_REGISTRATION`:** Observed binary version is `1.3.6`, whereas `ANTIGRAVITY_REGISTRATION.supported_versions` in `packages/protocol/src/adapter-registry.ts` is `["1.1.13"]`.
- **Overall verdict (`overall`):** `"fail"`. Antigravity remains ineligible for governed execution in Phase 3A (spec §§2.3, 6.6, 9.13).
- **Redaction accounting (spec §5.6; `DEC-20261015-04` B8):**
  - Rules applied (`redaction_rules_applied`): `["spec-5.6-token-patterns", "spec-5.6-account-identifiers", "spec-5.6-email-addresses"]`.
  - In-place redactions performed: `0` (none of the captured stdout or stderr streams contained a token pattern, account identifier, or email address).

---

## Capability record

- **Stored record path:** `/Users/michaeldaley/Library/Application Support/MADVentures/madventures-tui/capability/antigravity/2026-10-16T03:11:04.805Z-827ba22b4aa3.json`
- **Stored record filename:** `2026-10-16T03:11:04.805Z-827ba22b4aa3.json`
- **Stored record SHA-256:** `704f23d9b6d82834bc23bd84e3ee4a58dcb7732e200ce5b74a3ad24a19982cbb`

```json
{"surface":"antigravity","provider":"google","requested_model":"gemini-4-argon-high","role_eligibility":[],"independence_domain":"google","organization_id":"google","cli_version":"1.3.6","binary_path":"/Users/michaeldaley/.local/bin/agy","binary_sha256":"827ba22b4aa33557614a57aac2cc13f386e17db6b802febd3932226906ac05ab","evaluated_at":"2026-10-16T03:11:04.805Z","expires_at":"2026-11-15T03:11:04.805Z","host":{"arch":"arm64","macos_version":"27.0.1","macos_build":"26A434","bun_version":"1.4.2","bun_path":"/Users/michaeldaley/.bun/bin/bun","bun_sha256":"35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5","term":"dumb","shell":"/bin/zsh"},"identity_attestation":{"result":"fail","primitive":"agy config get model","sanitized_facts":"Spec section 2.2 requires either a documented CLI or API primitive returning the resolved provider and exact model for the actual session, or structured per-session or per-response metadata naming the provider and exact model actually used. Neither clause is met on agy 1.3.6: 'agy config get model' exits with code 2 ('Error: unexpected argument \"config\".'); '--output-format json' (with and without '--model gemini-4-argon-high') emits only conversation_id, status, response, duration_seconds, num_turns and usage with no provider or model field; and '--output-format stream-json' omits init.model when '--model' is not supplied and emits init.model only as a pre-turn CLI flag echo when '--model gemini-4-argon-high' is supplied, while step_update and result events carry no provider or model field."},"auth_readiness":{"result":"no_primitive","primitive":null},"pty":{"result":"fail","observed_ms":{}},"independent_review_eligible":false,"limitations":["configuration-only identity evidence — no actual-session identity primitive exists","no documented non-mutating non-interactive auth-readiness primitive","no governed session of the real binary ran, because spec section 9.13 forbids a live session of a surface without a verified identity primitive","observed CLI version 1.3.6 differs from ANTIGRAVITY_REGISTRATION.supported_versions [\"1.1.13\"] in packages/protocol/src/adapter-registry.ts","agy config get model exited with status 2 ('Error: unexpected argument \"config\".') because agy 1.3.6 has no config subcommand","stream-json init.model is present only when --model is passed on the command line (CLI flag echo) and is absent from default-model stream-json init, step_update, result and json output modes"],"overall":"fail","redaction_rules_applied":["spec-5.6-token-patterns","spec-5.6-account-identifiers","spec-5.6-email-addresses"]}
```
