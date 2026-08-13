# Phase 3A — Preliminary Antigravity Evidence Pass (Task 60)

**Status:** Complete, corrected. Verdict: **FAIL** against the §2.2 identity rubric.
**Task:** 60 (Stage 0, the only task outside M1–M26), rubric §7.2 milestone 1
**Plan authority:** `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` at
`1b46856a646266d3c7eb9882cc74f0c5f9f4cfb5`
**Implementation base:** `70c6a2359feb88cc4e3cc21301e18221313f6f8e`
**Evaluation dates:** initial pass 2026-08-13T00:29Z–00:34Z; correction round 1 re-probe
2026-08-13T01:05Z–01:18Z; correction round 2 re-capture 2026-08-13T04:47Z (UTC)
**Executed by:** Claude Opus 5 (provisional implementer) for the initial pass and
correction round 1; Hermes (local model `deepseek-v4-flash`) for correction round 2,
per Founder reassignment of the correction author.

> **This is a preliminary evidence pass, not the formal surface investigation.**
> It produces **no machine-readable capability record**. Task 56 (M25) remains the formal
> Antigravity investigation and repeats this work through the M15/M16 tooling. Per plan §9.3,
> Task 56 **must not** reuse this pass's attestation as fresh session evidence.
> This document confers no eligibility on any surface.

## 0. Correction history — what changed and why

### Round 1 (documented in `dd92efa` → `cd70391`)

The first committed version of this document (`dd92efa`) reached the correct **FAIL** verdict by
overstated reasoning. Two claims were false as written:

| Claim in `dd92efa` | Status | Reality |
| --- | --- | --- |
| "no event or field carries a model or provider identifier" | **FALSE** | `stream-json`'s `init` event **does** carry `"model"` when `--model` is supplied explicitly (§5.8, Case B). |
| "The requested model is not echoed at all" | **FALSE as generalized** | True for `--output-format=json` (Case C), false for `--output-format=stream-json` (Case B). |

**Root cause.** The original pass tested `--model` against `--output-format=json` only, observed no
model field, and generalized that result to all structured modes. It never ran `--model` together with
`stream-json` — the one combination that does surface the field. A negative result from one mode was
reported as a property of the CLI.

**A second method defect, self-identified during correction round 1.** The original probe harness printed
`exit=${PIPESTATUS[0]}` from a `zsh` shell. `zsh` uses lowercase `pipestatus` with 1-based indexing, so
that expression expanded to empty on every probe. **Every exit status in `dd92efa` was blank and
therefore unverified.** Statuses were re-captured with `cmd < /dev/null > file 2>&1; ec=$?`, which is
shell-portable and reliable.

### Round 2 (this revision)

The review of `cd70391` identified three remaining defects, all corrected here:

1. **Remaining output elisions.** §5.2 of `cd70391` reproduced `agy help`, `agy agents --help`,
   `agy help agent`, and `agy help models` only as "byte-identical… not reproduced" markers, and §5.3
   truncated the `agy models` list with a `[list truncated for length]` marker. The instruction for this
   round requires every command's output in full, including repeated identical outputs. All eight help
   commands and the complete model catalog are now reproduced verbatim (§5.2, §5.3).
2. **Unverified config-probe exit status.** §9 row 12 recorded `agy config get model` as "non-zero
   (TTY error)" — an inference from its error text, not an observed status. The instruction for this
   round required re-capture with `$?` read immediately. The observed status is **0**: the CLI prints the
   bubbletea TTY error and still exits zero. Row 12 and §5.5 are corrected to the observed value.
3. **Overclaimed request-echo semantics.** §7 of `cd70391` stated as fact that `init.model` "is an echo
   of requested intent, not resolved fact". The evidence supports only the narrower statements set out in
   Work 3 and §7 of this revision: conditional presence is *consistent with* a request echo but does not
   prove whether the field represents requested intent, resolved session selection, or both. §7 is
   rewritten to the evidence-supported form; the FAIL verdict is unchanged.

The overall verdict is unchanged — **FAIL** — on the narrow, evidence-supported grounds in §7.

## 1. Authorization basis

| Gate | Status | Evidence |
| --- | --- | --- |
| Tier-2 approval of the exact plan SHA | Asserted | PR #10 body: "Independent Tier-2 plan review: APPROVE at the exact head SHA" (`1b46856…`) |
| Founder approval of that SHA | Asserted | PR #10 body: "Founder approval: this plan SHA is approved"; merged as `70c6a23` |
| Separate Founder authorization of Task 60 | **Explicit** | PR #10 comment, `decivantiq` @ 2026-08-13T00:27:21Z |
| `IMPLEMENTATION_BASE_SHA` recorded | **Explicit** | Same comment: `70c6a2359feb88cc4e3cc21301e18221313f6f8e` |
| Correction round 1 authorization | **Explicit** | Founder-accepted REQUEST CHANGES review; Task 60 only, one follow-up commit |
| Correction round 2 authorization | **Explicit** | Founder-authorized correction-round-2 instruction to Hermes (local model `deepseek-v4-flash`); Task 60 only. Founder reassigned the correction author from Opus 5 to Hermes before the automatic "more than two rounds" trigger. Implementing the already-issued round-2 verdict does not create round 3. |

**Disclosure.** The implementer did not independently observe the Tier-2 verdict document; gates 1 and 2
rest on the PR #10 body and the Founder's authorization.

## 2. Host facts

| Field | Value |
| --- | --- |
| Architecture | `x86_64` |
| macOS | 13.7.8, build 22H730 |
| Bun version / path | 1.3.14 — `/Users/michaeldaley/.bun/bin/bun` |
| Bun SHA-256 | `ea2f223e94bb2f4bf3050895113c3cf346438f6fa0501c8532284e063f72f7a0` |
| `TERM` / `SHELL` | `xterm-256color` / `/bin/zsh` |

Founder iMac profile of specification §3.6. Host facts were re-confirmed unchanged at the start of
correction round 2 (`uname -m` = `x86_64`; `sw_vers` = 13.7.8/22H730).

## 3. Binary under investigation

| Field | Value |
| --- | --- |
| Surface | `antigravity` |
| Executable | `agy` |
| Absolute path | `/Users/michaeldaley/.local/bin/agy` (not a symlink) |
| SHA-256 | `a3e9175bfc15656a70e87ed5df627c2691da3dee88acf69ae0601e5ecf146c48` |
| CLI version | `1.1.12` |

Hash and version re-verified identical before correction round 2, so the initial and corrected
observations describe the same artifact.

## 4. The rubric applied (specification §2.2, unmodified)

**Passing evidence — either of:**

- **P1** — a documented CLI or API primitive returning the resolved provider and exact model **for the actual session**; or
- **P2** — structured per-session or per-response metadata naming the provider and exact model **actually used**.

**Failing evidence — any of:** configuration files; **requested flags or environment values**; marketing
names or version banners; unstructured prose; behavioral inference; cached attestations; any statement of
requested intent rather than resolved fact.

The rubric was fixed before probing began and was not edited during, after, or during either correction.

## 5. Primitives probed

Every command below was executed exactly as shown, with stdin redirected from `/dev/null`, output
captured, and the exit status read from `$?` immediately after. In correction round 2, stdout and stderr
were captured to separate files so each stream is attributed exactly. Outputs are verbatim in full; no
output has been replaced with a summary, a "same as above" marker, a line count, or a truncation marker.

### 5.1 `agy --version < /dev/null`

```text
1.1.12
```

**exit=0.** stdout: `1.1.12\n` (7 bytes). stderr: empty. **Rubric: FAIL** — version banner; explicitly
listed failing evidence.

### 5.2 Complete documented command surface

All eight help commands below exit **0**. Every output is reproduced in full, including outputs that are
byte-identical to a preceding command. Note: all eight help texts were emitted on **stderr** (fd 2);
stdout was empty in every case. `agy --help`, `agy help`, `agy models --help`, `agy help models`,
`agy agent --help`, `agy agents --help`, and `agy help agent` were each executed with
`< /dev/null` and their exit status read from `$?`.

#### `agy --help < /dev/null` — exit=0

```text
Usage of agy:
  --add-dir                       Add a directory to the workspace (repeatable) (default [])
  --agent                         Agent for the current CLI session
  -c                              Short alias for --continue
  --continue                      Continue the most recent conversation
  --conversation                  Resume a previous conversation by ID
  --dangerously-skip-permissions  Auto-approve all tool permission requests without prompting
  --disable-slash-commands        Disable slash command and skill expansion in print mode
  --effort                        Reasoning effort for the current CLI session (low|medium|high)
  -i                              Short alias for --prompt-interactive
  --json-schema                   Optional JSON schema string or path to a schema file to enforce structured output (for stream-json, only applicable to the final result)
  --log-file                      Override CLI log file path
  --mode                          Set the agent execution mode for this session (accept-edits, plan)
  --model                         Model for the current CLI session
  --new-project                   Create a new project for this session
  --output-format                 Output format for print mode (text, json, stream-json) (default text)
  -p                              Short alias for --print
  --print                         Run a single prompt non-interactively and print the response
  --print-timeout                 Timeout for print mode wait (default 5m0s)
  --project                       Project ID for the current CLI session
  --prompt                        Alias for --print
  --prompt-interactive            Run an initial prompt interactively and continue the session
  --sandbox                       Run in a sandbox with terminal restrictions enabled

Available subcommands:
  agent           List available agents
  agents          List available agents
  changelog       Show changelog and release notes
  help            Show help for subcommands
  install         Configure environment paths and shell settings
  models          List available models
  plugin          Manage plugins (install, uninstall, list, enable, disable)
  plugins         Alias for plugin
  update          Update CLI
```

#### `agy help < /dev/null` — exit=0

Byte-for-byte identical to `agy --help` output above (verified with `diff -q`), reproduced in full per
the round-2 instruction:

```text
Usage of agy:
  --add-dir                       Add a directory to the workspace (repeatable) (default [])
  --agent                         Agent for the current CLI session
  -c                              Short alias for --continue
  --continue                      Continue the most recent conversation
  --conversation                  Resume a previous conversation by ID
  --dangerously-skip-permissions  Auto-approve all tool permission requests without prompting
  --disable-slash-commands        Disable slash command and skill expansion in print mode
  --effort                        Reasoning effort for the current CLI session (low|medium|high)
  -i                              Short alias for --prompt-interactive
  --json-schema                   Optional JSON schema string or path to a schema file to enforce structured output (for stream-json, only applicable to the final result)
  --log-file                      Override CLI log file path
  --mode                          Set the agent execution mode for this session (accept-edits, plan)
  --model                         Model for the current CLI session
  --new-project                   Create a new project for this session
  --output-format                 Output format for print mode (text, json, stream-json) (default text)
  -p                              Short alias for --print
  --print                         Run a single prompt non-interactively and print the response
  --print-timeout                 Timeout for print mode wait (default 5m0s)
  --project                       Project ID for the current CLI session
  --prompt                        Alias for --print
  --prompt-interactive            Run an initial prompt interactively and continue the session
  --sandbox                       Run in a sandbox with terminal restrictions enabled

Available subcommands:
  agent           List available agents
  agents          List available agents
  changelog       Show changelog and release notes
  help            Show help for subcommands
  install         Configure environment paths and shell settings
  models          List available models
  plugin          Manage plugins (install, uninstall, list, enable, disable)
  plugins         Alias for plugin
  update          Update CLI
```

#### `agy models --help < /dev/null` — exit=0

```text
Usage: agy models [flags]

List available models

Flags:
  -h      Show help
  --help  Show help
```

#### `agy help models < /dev/null` — exit=0

Byte-for-byte identical to `agy models --help` output above (verified with `diff -q`), reproduced in
full:

```text
Usage: agy models [flags]

List available models

Flags:
  -h      Show help
  --help  Show help
```

#### `agy agent --help < /dev/null` — exit=0

```text
Usage: agy agent [flags]

List available agents

Flags:
  -h      Show help
  --help  Show help
```

#### `agy agents --help < /dev/null` — exit=0

Byte-for-byte identical to `agy agent --help` output above, including the `Usage: agy agent` line —
confirming `agents` is an alias (verified with `diff -q`). Reproduced in full:

```text
Usage: agy agent [flags]

List available agents

Flags:
  -h      Show help
  --help  Show help
```

#### `agy help agent < /dev/null` — exit=0

Byte-for-byte identical to `agy agent --help` output above (verified with `diff -q`). Reproduced in full:

```text
Usage: agy agent [flags]

List available agents

Flags:
  -h      Show help
  --help  Show help
```

**Rubric: FAIL for P1.** The complete documented surface is above. No subcommand or flag reports the
resolved provider or model for the actual session. There is no `whoami`, `session`, `status`, `config`,
or equivalent. The absence is documented from raw output, not inferred.

### 5.3 `agy models < /dev/null` — exit=0

stdout (the model list, 503 bytes) and stderr (the `Fetching...` progress line, 29 bytes) were captured
separately. Complete output, no truncation:

stderr:

```text
Fetching available models...
```

stdout:

```text
gemini-3.6-flash-high	Gemini 3.6 Flash (High)
gemini-3.6-flash-medium	Gemini 3.6 Flash (Medium)
gemini-3.6-flash-low	Gemini 3.6 Flash (Low)
gemini-3.5-flash-high	Gemini 3.5 Flash (High)
gemini-3.5-flash-medium	Gemini 3.5 Flash (Medium)
gemini-3.5-flash-low	Gemini 3.5 Flash (Low)
gemini-3.1-pro-high	Gemini 3.1 Pro (High)
gemini-3.1-pro-low	Gemini 3.1 Pro (Low)
claude-sonnet-4-6	Claude Sonnet 4.6 (Thinking)
claude-opus-4-6-thinking	Claude Opus 4.6 (Thinking)
gpt-oss-120b-medium	GPT-OSS 120B (Medium)
```

**Rubric: FAIL** — a **catalog of available models**, not what the session resolved to; the same class of
evidence as a configuration file. It also establishes that `agy` fronts at least three provider families
(Google, Anthropic, OpenAI-derived), which makes resolved-identity attestation more necessary, not less.

`gemini-3.1-pro-low` is present in this list (line 8), so the model used in §5.8 Case B remains accepted
by the installed binary.

### 5.4 `agy agent < /dev/null` and `agy agents < /dev/null`

Both produced **no output** on stdout or stderr, and both exited **0**.

**Rubric: FAIL** — supplies no identity fact.

### 5.5 `agy config get model < /dev/null` — the probe used by the current adapter

The exact primitive invoked at `packages/adapter-antigravity/src/attestation.ts:41`.

Complete stdout (109 bytes; stderr empty):

```text
CLI error: bubbletea: error opening TTY: bubbletea: could not open TTY: open /dev/tty: device not configured
```

**exit=0** — the observed status, read from `$?` immediately after execution during correction round 2.
(Previous revisions inferred a non-zero status from the error text without observing it; the observed
status is zero.)

**Rubric: FAIL**, doubly:

1. **`config` is not a subcommand of `agy` 1.1.12** — it does not appear in §5.2's subcommand list. The
   argument falls through to the interactive TUI, which fails for lack of a TTY — and the CLI reports
   that failure on stdout with exit status 0.
2. Even if it worked, `config get model` reads **configuration** — failing evidence under §2.2, and
   explicitly rejected by §9.13.

**Independent defect for the M2/M14 adapter work:** the shipped attestation path targets a nonexistent
subcommand and would attempt an interactive TTY inside a probe that must be non-interactive. The exit
status of the failing path is also zero, so the current adapter code could not distinguish this failure
from success by status alone.

### 5.6 Flag-parsing note (not evidence)

An initial attempt used space-separated flags:

```text
agy --print --output-format json --print-timeout 90s 'Reply with exactly: ok'
```

The CLI absorbed `--output-format` into the **prompt text** and answered a question about the string
rather than emitting JSON. The `=` form was used thereafter. This is recorded as a usage note so a later
reader does not mistake it for evidence that JSON support is absent. JSON support exists.

### 5.7 Structured output — `--output-format=json` (captured in earlier rounds; not re-run)

Both cases used the identical deterministic prompt and both start **live, billed provider sessions**.
These two commands were executed and captured in the initial pass and correction round 1; correction
round 2 did not re-run them (only the two §5.8 stream probes are re-run this round).

#### Case C-default: `agy --output-format=json --print-timeout=90s --print='Reply with exactly: ok' < /dev/null`

**exit=0.** Starts a **live, billed provider session.**

```json
{"conversation_id":"a8d29cac-e169-4728-8ffa-29dc98c4c8c1","status":"SUCCESS","response":"ok\n","duration_seconds":1.497165,"num_turns":1,"usage":{"input_tokens":15475,"output_tokens":62,"thinking_tokens":58,"cache_read_tokens":8151,"total_tokens":15537}}
```

#### Case C: `agy --model=gemini-3.1-pro-low --output-format=json --print-timeout=90s --print='Reply with exactly: ok' < /dev/null`

**exit=0.** Starts a **live, billed provider session.**

```json
{"conversation_id":"d7eb7e3b-c644-4b27-b613-fca1a746890f","status":"SUCCESS","response":"ok\n","duration_seconds":4.449038,"num_turns":1,"usage":{"input_tokens":14925,"output_tokens":286,"thinking_tokens":281,"cache_read_tokens":8124,"total_tokens":15211}}
```

**Observation:** the `json` format carries **no `model` field even when `--model` is explicitly
supplied**, and no `provider` field in either case. Verified by
`grep -aoE '"(model|provider)":"[^"]*"'` returning nothing.

### 5.8 Structured output — `--output-format=stream-json` (the corrected finding; re-captured in full this round)

Both cases used the identical deterministic prompt and both start **live, billed provider sessions.**
Each command's stdout was captured in full; stderr was empty for both. Each stream consists of **7
events** in order: `init`, five `step_update`, `result`. Every event is reproduced below exactly as
emitted (one JSON object per line), including the complete `tools` array — no elision. The `tools` array
is byte-identical between the two cases (56 tool names); it is reproduced in full in both cases per the
round-2 instruction.

#### Case A — no `--model`

Command:

```text
agy --output-format=stream-json --print-timeout=90s --print='Reply with exactly: ok' < /dev/null
```

**exit=0.** Starts a **live, billed provider session.** stderr: empty. Event 1 (`init`):

```json
{"event":"init","conversation_id":"85de9b7c-1c7f-461b-85c1-d83a66d3a9cb","init":{"cwd":"/tmp/phase3a-r2","tools":["ask_permission","ask_question","browser_click_element","browser_drag_pixel_to_pixel","browser_get_dom","browser_get_network_request","browser_input","browser_list_network_requests","browser_mouse_down","browser_mouse_up","browser_move_mouse","browser_press_key","browser_refresh_page","browser_resize_window","browser_scroll","browser_scroll_dom","browser_select_option","browser_subagent","call_mcp_tool","capture_browser_console_logs","capture_browser_screenshot","click_browser_pixel","command_status","define_subagent","delete_knowledge","execute_browser_javascript","find_by_name","finish","generate_image","grep_search","invoke_subagent","list_browser_pages","list_dir","list_permissions","list_resources","manage_inbox","manage_subagents","manage_task","multi_replace_file_content","notebook_edit","notebook_execution","open_browser_url","read_browser_page","read_resource","read_url_content","replace_file_content","run_command","schedule","search_web","sed_file","send_command_input","send_message","view_file","wait","wait_5_seconds","write_to_file"],"permission_mode":"request-review"}}
```

Events 2–6 (`step_update` ×5):

```json
{"event":"step_update","step_update":{"conversation_id":"85de9b7c-1c7f-461b-85c1-d83a66d3a9cb","step_index":0,"state":"DONE","step_type":"user_input"}}
{"event":"step_update","step_update":{"conversation_id":"85de9b7c-1c7f-461b-85c1-d83a66d3a9cb","step_index":1,"state":"DONE","step_type":"unknown","duration_seconds":0.001318}}
{"event":"step_update","step_update":{"conversation_id":"85de9b7c-1c7f-461b-85c1-d83a66d3a9cb","step_index":2,"state":"ACTIVE","step_type":"agent_response","text_delta":"ok"}}
{"event":"step_update","step_update":{"conversation_id":"85de9b7c-1c7f-461b-85c1-d83a66d3a9cb","step_index":2,"state":"DONE","step_type":"agent_response","text_delta":"\n","duration_seconds":1.940774,"usage":{"input_tokens":23536,"output_tokens":21,"thinking_tokens":20,"cache_read_tokens":0,"total_tokens":23557}}}
{"event":"step_update","step_update":{"conversation_id":"85de9b7c-1c7f-461b-85c1-d83a66d3a9cb","step_index":3,"state":"DONE","step_type":"checkpoint","duration_seconds":0.472741,"usage":{"input_tokens":97,"output_tokens":5,"thinking_tokens":0,"cache_read_tokens":0,"total_tokens":102}}}
```

Event 7 (`result`):

```json
{"event":"result","result":{"conversation_id":"85de9b7c-1c7f-461b-85c1-d83a66d3a9cb","status":"SUCCESS","response":"ok\n","duration_seconds":2.520718,"num_turns":1,"usage":{"input_tokens":23633,"output_tokens":26,"thinking_tokens":20,"cache_read_tokens":0,"total_tokens":23659}}}
```

`init` keys: `cwd`, `permission_mode`, `tools` (56 names). **No `model` field anywhere in the stream** —
verified across all 7 events.

#### Case B — explicit `--model=gemini-3.1-pro-low`

Command:

```text
agy --model=gemini-3.1-pro-low --output-format=stream-json --print-timeout=90s --print='Reply with exactly: ok' < /dev/null
```

**exit=0.** Starts a **live, billed provider session.** stderr: empty. Event 1 (`init`):

```json
{"event":"init","conversation_id":"de84921c-3dbb-46c5-beab-403c6b8e9b9c","init":{"model":"gemini-3.1-pro-low","cwd":"/tmp/phase3a-r2","tools":["ask_permission","ask_question","browser_click_element","browser_drag_pixel_to_pixel","browser_get_dom","browser_get_network_request","browser_input","browser_list_network_requests","browser_mouse_down","browser_mouse_up","browser_move_mouse","browser_press_key","browser_refresh_page","browser_resize_window","browser_scroll","browser_scroll_dom","browser_select_option","browser_subagent","call_mcp_tool","capture_browser_console_logs","capture_browser_screenshot","click_browser_pixel","command_status","define_subagent","delete_knowledge","execute_browser_javascript","find_by_name","finish","generate_image","grep_search","invoke_subagent","list_browser_pages","list_dir","list_permissions","list_resources","manage_inbox","manage_subagents","manage_task","multi_replace_file_content","notebook_edit","notebook_execution","open_browser_url","read_browser_page","read_resource","read_url_content","replace_file_content","run_command","schedule","search_web","sed_file","send_command_input","send_message","view_file","wait","wait_5_seconds","write_to_file"],"permission_mode":"request-review"}}
```

Events 2–6 (`step_update` ×5):

```json
{"event":"step_update","step_update":{"conversation_id":"de84921c-3dbb-46c5-beab-403c6b8e9b9c","step_index":0,"state":"DONE","step_type":"user_input"}}
{"event":"step_update","step_update":{"conversation_id":"de84921c-3dbb-46c5-beab-403c6b8e9b9c","step_index":1,"state":"DONE","step_type":"unknown","duration_seconds":0.00514}}
{"event":"step_update","step_update":{"conversation_id":"de84921c-3dbb-46c5-beab-403c6b8e9b9c","step_index":2,"state":"DONE","step_type":"unknown","duration_seconds":0.004413}}
{"event":"step_update","step_update":{"conversation_id":"de84921c-3dbb-46c5-beab-403c6b8e9b9c","step_index":3,"state":"DONE","step_type":"agent_response","text_delta":"ok\n","duration_seconds":3.692047,"usage":{"input_tokens":22948,"output_tokens":279,"thinking_tokens":278,"cache_read_tokens":0,"total_tokens":23227}}}
{"event":"step_update","step_update":{"conversation_id":"de84921c-3dbb-46c5-beab-403c6b8e9b9c","step_index":4,"state":"DONE","step_type":"checkpoint","duration_seconds":0.447425,"usage":{"input_tokens":97,"output_tokens":4,"thinking_tokens":0,"cache_read_tokens":0,"total_tokens":101}}}
```

Event 7 (`result`):

```json
{"event":"result","result":{"conversation_id":"de84921c-3dbb-46c5-beab-403c6b8e9b9c","status":"SUCCESS","response":"ok\n","duration_seconds":4.818852,"num_turns":1,"usage":{"input_tokens":23045,"output_tokens":283,"thinking_tokens":278,"cache_read_tokens":0,"total_tokens":23328}}}
```

`init` keys: `cwd`, **`model`**, `permission_mode`, `tools` (56 names). The `model` value is exactly the
string passed to `--model`. It appears in the `init` event only; the `result` event carries no `model`.

#### Presence matrix

| Case | Format | `--model` supplied | `model` field | `provider` field |
| --- | --- | --- | --- | --- |
| A | `stream-json` | no | **absent** | absent |
| B | `stream-json` | yes | **present in `init`** | absent |
| C-default | `json` | no | absent | absent |
| C | `json` | yes | **absent** | absent |

#### What the evidence establishes (and does not establish)

The evidence in this section establishes exactly the following, and no more:

1. **Without `--model`, the selected model is not disclosed.** Case A's stream carries no model field in
   any of its 7 events, despite the session necessarily resolving to *some* model.
2. **With `--model`, `init.model` appears and equals the requested string.** Case B's `init` event
   carries `"model":"gemini-3.1-pro-low"` — byte-identical to the flag value.
3. **That conditional behavior is consistent with a request echo, but it does not prove whether the
   field represents requested intent, resolved session selection, or both.** The evidence cannot
   distinguish these; no claim of proof in either direction is made.
4. **No documented contract establishes `init.model` as exact-model actual-use attestation.** No event
   contract, schema, or documentation for `stream-json` or its `init` event was found in the plan
   (`docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`), the specification
   (`docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md`), or the v1 plan
   (`docs/superpowers/plans/2026-08-08-madventures-tui-v1.md`). Per the round-2 instruction, had such a
   primitive or event contract been found, this pass would have stopped and reported it as a new
   Founder-reviewable finding before changing the verdict. It was not found.
5. **`provider` is absent from every captured structured output** — both stream cases, both json cases,
   and every event within them — and this independently defeats P2, which requires provider **plus**
   exact model actually used.

**Rubric: FAIL for P2** on the two grounds above that are independently sufficient: no provider field
exists in any captured output (ground 5), and no documented contract establishes `init.model` as an
actual-use attestation (ground 4). The conditional presence of the field is consistent with a request
echo, but this pass does not claim the echo interpretation as proven; it is not needed for the verdict.

### 5.9 Deliberately not attempted

**Asking the model to self-report its identity** (e.g. `agy --print='What model are you?'`) was **not**
performed. §2.2 lists behavioral inference and unstructured prose as failing evidence, so such a probe
cannot produce a passing result, and recording it invites a later reader to mistake it for attestation.
The omission is intentional.

## 6. Auth-readiness

`agy` completed live sessions during probing (§§5.7–5.8), demonstrating the host user's credentials are
installed and valid at this date. However:

- **No documented non-mutating, non-interactive auth-readiness primitive exists.** Nothing in §5.2's
  surface reports credential state without starting a session.
- The only means of confirming auth was to **run an actual billed session**, which is not a readiness
  probe.

**Auth-readiness result: `no_primitive`.** Per §5.4 of the specification, no waiver is inferred.

## 7. Verdict

**Overall: FAIL.** Unchanged from `dd92efa` and `cd70391`; the supporting reasoning is narrowed and
corrected.

| Criterion | Result | Precise clause not met |
| --- | --- | --- |
| **P1** — documented primitive returning resolved provider + exact model for the actual session | **FAIL** | No such primitive exists in `agy` 1.1.12. Complete documented surface captured in §5.2; nothing reports resolved session identity. |
| **P2** — structured metadata naming provider + exact model actually used | **FAIL** | Structured metadata exists and is well-formed. `stream-json`'s `init` carries `model` only when `--model` is explicitly supplied (§5.8 Case B), equal to the requested string; without `--model`, no mode discloses the model selected for the session. No documented contract establishes `init.model` as an exact-model actual-use attestation, and **no `provider` field exists in any captured mode or event** — the provider half of P2 is unsatisfiable regardless of how `init.model` is interpreted. |
| Auth-readiness | `no_primitive` | No documented non-mutating, non-interactive readiness primitive (§6). |

This confirms specification §9.13: **Antigravity remains ineligible for a live pair.**

The precise shape of the gap matters for later work. It is **not** that `agy` lacks machine-readable
output — it has two structured modes, and one of them has a `model` field. It is that:

- the field appears only when the caller supplies `--model`, equal to the supplied string, and no
  documented contract establishes it as resolved actual-use identity; and
- no provider identifier exists at all.

A future `agy` version could close this by emitting the resolved model unconditionally — including when
no `--model` is passed — together with a provider identifier, and documenting the field as
actual-use. That, not the presence of a `model` key, is what P2 requires.

`agy` also fronts models from at least three provider families (§5.3). Under specification §9.2, pair
eligibility requires distinct providers and distinct independence domains. A surface that may resolve to
Anthropic, Google, or an OpenAI-derived model without disclosing which cannot be assessed for provider
independence — so the missing provider fact defeats §9.2 as well as §2.2.

## 8. Consequences and non-consequences

**This document does:**

- satisfy specification §2.3's requirement that Antigravity is investigated first;
- record a failed result as a required evidence document, per §2.3 and §6.6;
- surface an independent defect in `packages/adapter-antigravity/src/attestation.ts:41` for M2/M14,
  including the newly observed exit-status-0 behavior of the failing path (§5.5).

**This document does not:**

- create a machine-readable capability record — Task 56 (M25) does that;
- confer eligibility on Antigravity or any other surface;
- exclude Antigravity from Phase 3A fixture work, which continues behind the production `start` gate;
- disqualify Gemini Antigravity as the Tier-2 **reviewer** — per §6.6 that role is independent of the
  `agy` CLI's attestation capability;
- authorize any further task. Task 60 was authorized alone; Task 1 and every other task remain
  unauthorized and unstarted.

**Residual.** A binary that attests truthfully during a probe and differently during a governed session
remains a documented residual under §2.2. Nothing here narrows it.

## 9. Reproduction

Every command as actually executed in correction round 2, or in the earlier round indicated. `exit` is
the observed status read from `$?`. **billed** marks commands that start a live, billed provider
session.

| # | Command (exact) | exit | billed | Round |
| --- | --- | --- | --- | --- |
| 1 | `agy --version < /dev/null` | 0 | no | 2 (re-captured) |
| 2 | `agy --help < /dev/null` | 0 | no | 2 (re-captured) |
| 3 | `agy help < /dev/null` | 0 | no | 2 (re-captured) |
| 4 | `agy models --help < /dev/null` | 0 | no | 2 (re-captured) |
| 5 | `agy help models < /dev/null` | 0 | no | 2 (re-captured) |
| 6 | `agy agent --help < /dev/null` | 0 | no | 2 (re-captured) |
| 7 | `agy agents --help < /dev/null` | 0 | no | 2 (re-captured) |
| 8 | `agy help agent < /dev/null` | 0 | no | 2 (re-captured) |
| 9 | `agy models < /dev/null` | 0 | no (network fetch) | 2 (re-captured) |
| 10 | `agy agent < /dev/null` | 0 | no | 2 (re-captured) |
| 11 | `agy agents < /dev/null` | 0 | no | 2 (re-captured) |
| 12 | `agy config get model < /dev/null` | **0** | no | 2 (re-captured; status previously unverified, see §5.5) |
| 13 | `agy --output-format=json --print-timeout=90s --print='Reply with exactly: ok' < /dev/null` | 0 | **yes** | 0 (historical, §5.7) |
| 14 | `agy --model=gemini-3.1-pro-low --output-format=json --print-timeout=90s --print='Reply with exactly: ok' < /dev/null` | 0 | **yes** | 0 (historical, §5.7) |
| 15 | `agy --output-format=stream-json --print-timeout=90s --print='Reply with exactly: ok' < /dev/null` | 0 | **yes** | 2 (re-captured, §5.8 Case A) |
| 16 | `agy --model=gemini-3.1-pro-low --output-format=stream-json --print-timeout=90s --print='Reply with exactly: ok' < /dev/null` | 0 | **yes** | 2 (re-captured, §5.8 Case B) |

Rows 1–12 and 15–16 were executed in correction round 2 with stdout and stderr captured to separate
files and the exit status read from `$?` immediately after each command. Rows 13–14 are historical
captures from the initial pass (round 0); they were not re-run in correction round 2 — only the two
authorized stream probes (rows 15–16) were re-run this round.

Results are binary-hash- and version-specific. They are valid only for `agy` 1.1.12 at SHA-256
`a3e9175bfc15656a70e87ed5df627c2691da3dee88acf69ae0601e5ecf146c48` on the host in §2, as of the
evaluation dates. Any change to binary hash, CLI version, or host invalidates them.

## 10. Redaction

No credential, token, cookie, API key, or secret-marked environment value was collected, displayed, or
recorded. No probe read or emitted environment variables. A scan of both stream captures for
secret-bearing patterns (`api[_-]?key`, `token`, `cookie`, `secret`, `authorization`, `bearer`,
`sk-…`, `AIza…`) matched only the `*_tokens` usage counters (e.g. `"input_tokens":23536`), which are
token counts, not credentials; no redaction was required and none was applied. `conversation_id` values
are retained as session identifiers and carry no credential material. The `cwd` value in the round-2
captures is `/tmp/phase3a-r2`, the capture working directory, retained verbatim as part of the observed
`init` event. The 56-element `tools` array is reproduced in full (§5.8); it contains no secret material.
