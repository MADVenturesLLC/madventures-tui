# Phase 3A — Preliminary Antigravity Evidence Pass (Task 60)

**Status:** Complete, corrected. Verdict: **FAIL** against the §2.2 identity rubric.
**Task:** 60 (Stage 0, the only task outside M1–M26), rubric §7.2 milestone 1
**Plan authority:** `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` at
`1b46856a646266d3c7eb9882cc74f0c5f9f4cfb5`
**Implementation base:** `70c6a2359feb88cc4e3cc21301e18221313f6f8e`
**Evaluation dates:** initial pass 2026-08-13T00:29Z–00:34Z; correction round 1 re-probe
2026-08-13T01:05Z–01:18Z (UTC)
**Executed by:** Claude Opus 5 (provisional implementer)

> **This is a preliminary evidence pass, not the formal surface investigation.**
> It produces **no machine-readable capability record**. Task 56 (M25) remains the formal
> Antigravity investigation and repeats this work through the M15/M16 tooling. Per plan §9.3,
> Task 56 **must not** reuse this pass's attestation as fresh session evidence.
> This document confers no eligibility on any surface.

## 0. Correction round 1 — what changed and why

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

**A second method defect, self-identified during this correction.** The original probe harness printed
`exit=${PIPESTATUS[0]}` from a `zsh` shell. `zsh` uses lowercase `pipestatus` with 1-based indexing, so
that expression expanded to empty on every probe. **Every exit status in `dd92efa` was blank and
therefore unverified.** All statuses in this document were re-captured with
`cmd < /dev/null > file 2>&1; ec=$?`, which is shell-portable and reliable.

The verdict is unchanged — **FAIL** — but it now rests on the narrower, defensible ground set out in §7.

## 1. Authorization basis

| Gate | Status | Evidence |
| --- | --- | --- |
| Tier-2 approval of the exact plan SHA | Asserted | PR #10 body: "Independent Tier-2 plan review: APPROVE at the exact head SHA" (`1b46856…`) |
| Founder approval of that SHA | Asserted | PR #10 body: "Founder approval: this plan SHA is approved"; merged as `70c6a23` |
| Separate Founder authorization of Task 60 | **Explicit** | PR #10 comment, `decivantiq` @ 2026-08-13T00:27:21Z |
| `IMPLEMENTATION_BASE_SHA` recorded | **Explicit** | Same comment: `70c6a2359feb88cc4e3cc21301e18221313f6f8e` |
| Correction round 1 authorization | **Explicit** | Founder-accepted REQUEST CHANGES review; Task 60 only, one follow-up commit |

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
correction round 1.

## 3. Binary under investigation

| Field | Value |
| --- | --- |
| Surface | `antigravity` |
| Executable | `agy` |
| Absolute path | `/Users/michaeldaley/.local/bin/agy` (not a symlink) |
| SHA-256 | `a3e9175bfc15656a70e87ed5df627c2691da3dee88acf69ae0601e5ecf146c48` |
| CLI version | `1.1.12` |

Hash and version re-verified identical before correction round 1, so the initial and corrected
observations describe the same artifact.

## 4. The rubric applied (specification §2.2, unmodified)

**Passing evidence — either of:**

- **P1** — a documented CLI or API primitive returning the resolved provider and exact model **for the actual session**; or
- **P2** — structured per-session or per-response metadata naming the provider and exact model **actually used**.

**Failing evidence — any of:** configuration files; **requested flags or environment values**; marketing
names or version banners; unstructured prose; behavioral inference; cached attestations; any statement of
requested intent rather than resolved fact.

The rubric was fixed before probing began and was not edited during, after, or during the correction.

## 5. Primitives probed

Every command below was executed exactly as shown, with stdin redirected from `/dev/null`, output
captured to a file, and the exit status read from `$?` immediately after. Outputs are verbatim except
where elision is explicitly marked.

### 5.1 `agy --version < /dev/null`

```text
1.1.12
```

**exit=0.** **Rubric: FAIL** — version banner; explicitly listed failing evidence.

### 5.2 Complete documented command surface

#### `agy --help < /dev/null` — exit=0, 34 lines

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

#### `agy help < /dev/null` — exit=0, 34 lines

Byte-identical to `agy --help` (verified with `diff -q`). Not reproduced.

#### `agy models --help < /dev/null` — exit=0, 7 lines

```text
Usage: agy models [flags]

List available models

Flags:
  -h      Show help
  --help  Show help
```

`agy help models < /dev/null` — exit=0 — is byte-identical (verified with `diff -q`).

#### `agy agent --help < /dev/null` — exit=0, 7 lines

```text
Usage: agy agent [flags]

List available agents

Flags:
  -h      Show help
  --help  Show help
```

#### `agy agents --help < /dev/null` — exit=0, 7 lines

Byte-identical to `agy agent --help`, including the `Usage: agy agent` line — confirming `agents` is an
alias. Not reproduced.

**Rubric: FAIL for P1.** The complete documented surface is above. No subcommand or flag reports the
resolved provider or model for the actual session. There is no `whoami`, `session`, `status`, `config`,
or equivalent. The absence is documented from raw output, not inferred.

### 5.3 `agy models < /dev/null` — exit=0

```text
Fetching available models...
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
[list truncated for length]
```

**Rubric: FAIL** — a **catalog of available models**, not what the session resolved to; the same class of
evidence as a configuration file. It also establishes that `agy` fronts at least three provider families
(Google, Anthropic, OpenAI-derived), which makes resolved-identity attestation more necessary, not less.

`gemini-3.1-pro-low` was re-confirmed present in this list before correction round 1, so the model used
in §5.8 Case B remains accepted by the installed binary.

### 5.4 `agy agent < /dev/null` and `agy agents < /dev/null`

```text
(no output, both)
```

**exit=0** both. **Rubric: FAIL** — supplies no identity fact.

### 5.5 `agy config get model < /dev/null` — the probe used by the current adapter

The exact primitive invoked at `packages/adapter-antigravity/src/attestation.ts:41`.

```text
CLI error: bubbletea: error opening TTY: bubbletea: could not open TTY:
open /dev/tty: device not configured
```

**Rubric: FAIL**, doubly:

1. **`config` is not a subcommand of `agy` 1.1.12** — it does not appear in §5.2's subcommand list. The
   argument falls through to the interactive TUI, which fails for lack of a TTY.
2. Even if it worked, `config get model` reads **configuration** — failing evidence under §2.2, and
   explicitly rejected by §9.13.

**Independent defect for the M2/M14 adapter work:** the shipped attestation path targets a nonexistent
subcommand and would attempt an interactive TTY inside a probe that must be non-interactive.

### 5.6 Flag-parsing note (not evidence)

An initial attempt used space-separated flags:

```text
agy --print --output-format json --print-timeout 90s 'Reply with exactly: ok'
```

The CLI absorbed `--output-format` into the **prompt text** and answered a question about the string
rather than emitting JSON. The `=` form was used thereafter. This is recorded as a usage note so a later
reader does not mistake it for evidence that JSON support is absent. JSON support exists.

### 5.7 Structured output — `--output-format=json`

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

### 5.8 Structured output — `--output-format=stream-json` (the corrected finding)

Both cases used the identical deterministic prompt and both start **live, billed provider sessions.**

#### Case A — no `--model`

```text
agy --output-format=stream-json --print-timeout=90s --print='Reply with exactly: ok' < /dev/null
```

**exit=0**, 7 events: `init`, `step_update` ×5, `result`.

```json
{
  "event": "init",
  "conversation_id": "d6b9f466-8d4d-4b93-adbe-9bdb0b6df587",
  "init": {
    "cwd": "/Users/michaeldaley/madventures-tui",
    "tools": "[56 tool names elided]",
    "permission_mode": "request-review"
  }
}
```

`init` keys: `cwd`, `permission_mode`, `tools`. Terminal event:

```json
{"event":"result","result":{"conversation_id":"d6b9f466-8d4d-4b93-adbe-9bdb0b6df587","status":"SUCCESS","response":"ok\n","duration_seconds":1.397322,"num_turns":1,"usage":{"input_tokens":15475,"output_tokens":56,"thinking_tokens":52,"cache_read_tokens":8151,"total_tokens":15531}}}
```

**No `model` field anywhere in the stream.** Verified across all 7 events.

#### Case B — explicit `--model=gemini-3.1-pro-low`

```text
agy --model=gemini-3.1-pro-low --output-format=stream-json --print-timeout=90s --print='Reply with exactly: ok' < /dev/null
```

**exit=0**, 7 events: `init`, `step_update` ×5, `result`.

```json
{
  "event": "init",
  "conversation_id": "8496f224-bc2d-4cd6-897a-9435b3cdf053",
  "init": {
    "model": "gemini-3.1-pro-low",
    "cwd": "/Users/michaeldaley/madventures-tui",
    "tools": "[56 tool names elided]",
    "permission_mode": "request-review"
  }
}
```

`init` keys: `cwd`, **`model`**, `permission_mode`, `tools`. The `model` value is exactly the string
passed to `--model`. It appears in the `init` event only; the `result` event carries no `model`.

#### Presence matrix

| Case | Format | `--model` supplied | `model` field | `provider` field |
| --- | --- | --- | --- | --- |
| A | `stream-json` | no | **absent** | absent |
| B | `stream-json` | yes | **present in `init`** | absent |
| C-default | `json` | no | absent | absent |
| C | `json` | yes | **absent** | absent |

**Rubric: FAIL for P2**, on three independent grounds:

1. **The field is an echo of requested intent, not resolved fact.** §2.2 explicitly lists "requested
   flags or environment values" as failing evidence. The value returned is byte-identical to the flag
   supplied.
2. **Its presence is conditional on the input.** Case A and Case B differ only in whether `--model` was
   passed, and the field appears only in Case B. A field that materializes only when the caller supplies
   it is reporting the caller's request back, not the runtime's resolution. Had it been a resolution
   report, Case A — which certainly resolved to *some* model — would have carried it.
3. **No provider field exists in any case.** P2 requires provider **and** exact model. Provider is absent
   from all four cases, so P2 cannot be satisfied even if the model field were accepted.

**No P2 pass is claimed.** Neither the help text (§5.2) nor any observed event contract establishes that
`init.model` is a resolved actual-use attestation rather than a restatement of the request. Per the
correction instruction, had such evidence been found, this pass would have stopped and reported it as a
new finding rather than adjusting the verdict unilaterally. It was not found.

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

**Overall: FAIL.** Unchanged from `dd92efa`; the supporting reasoning is narrowed and corrected.

| Criterion | Result | Precise clause not met |
| --- | --- | --- |
| **P1** — documented primitive returning resolved provider + exact model for the actual session | **FAIL** | No such primitive exists in `agy` 1.1.12. Complete documented surface captured in §5.2; nothing reports resolved session identity. |
| **P2** — structured metadata naming provider + exact model actually used | **FAIL** | Structured metadata exists and is well-formed. `stream-json`'s `init` carries `model` **only when `--model` is explicitly supplied** (§5.8 Case B) — requested intent, explicitly failing evidence under §2.2. Without `--model`, no mode discloses the model selected for the session. **No provider field exists in any mode**, so the provider half of P2 is unsatisfiable regardless. |
| Auth-readiness | `no_primitive` | No documented non-mutating, non-interactive readiness primitive (§6). |

This confirms specification §9.13: **Antigravity remains ineligible for a live pair.**

The precise shape of the gap matters for later work. It is **not** that `agy` lacks machine-readable
output — it has two structured modes, and one of them has a `model` field. It is that:

- the field reflects the caller's request rather than the runtime's resolution, and
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
- surface an independent defect in `packages/adapter-antigravity/src/attestation.ts:41` for M2/M14.

**This document does not:**

- create a machine-readable capability record — Task 56 (M25) does that;
- confer eligibility on Antigravity or any other surface;
- exclude Antigravity from Phase 3A fixture work, which continues behind the production `start` gate;
- disqualify Gemini Antigravity as the Tier-2 **reviewer** — per §6.6 that role is independent of the
  `agy` CLI's attestation capability;
- authorize any further task. Task 60 was authorized alone; Task 1 remains unauthorized.

**Residual.** A binary that attests truthfully during a probe and differently during a governed session
remains a documented residual under §2.2. Nothing here narrows it.

## 9. Reproduction

Every command as actually executed. `exit` is the observed status. **billed** marks commands that start
a live, billed provider session.

| # | Command (exact) | exit | billed |
| --- | --- | --- | --- |
| 1 | `agy --version < /dev/null` | 0 | no |
| 2 | `agy --help < /dev/null` | 0 | no |
| 3 | `agy help < /dev/null` | 0 | no |
| 4 | `agy models --help < /dev/null` | 0 | no |
| 5 | `agy help models < /dev/null` | 0 | no |
| 6 | `agy agent --help < /dev/null` | 0 | no |
| 7 | `agy agents --help < /dev/null` | 0 | no |
| 8 | `agy help agent < /dev/null` | 0 | no |
| 9 | `agy models < /dev/null` | 0 | no (network fetch) |
| 10 | `agy agent < /dev/null` | 0 | no |
| 11 | `agy agents < /dev/null` | 0 | no |
| 12 | `agy config get model < /dev/null` | non-zero (TTY error) | no |
| 13 | `agy --output-format=json --print-timeout=90s --print='Reply with exactly: ok' < /dev/null` | 0 | **yes** |
| 14 | `agy --model=gemini-3.1-pro-low --output-format=json --print-timeout=90s --print='Reply with exactly: ok' < /dev/null` | 0 | **yes** |
| 15 | `agy --output-format=stream-json --print-timeout=90s --print='Reply with exactly: ok' < /dev/null` | 0 | **yes** |
| 16 | `agy --model=gemini-3.1-pro-low --output-format=stream-json --print-timeout=90s --print='Reply with exactly: ok' < /dev/null` | 0 | **yes** |

Command 12's exit status is recorded as non-zero from its error output. It was captured in the initial
pass under the defective harness described in §0 and was not re-executed during correction round 1,
because re-running it would add no information: the subcommand does not exist in §5.2's surface. A later
formal investigation should re-capture its exact status.

Capture method for all re-run commands: `cmd < /dev/null > file 2>&1; ec=$?`.

Results are binary-hash- and version-specific. They are valid only for `agy` 1.1.12 at SHA-256
`a3e9175bfc15656a70e87ed5df627c2691da3dee88acf69ae0601e5ecf146c48` on the host in §2, as of the
evaluation dates. Any change to binary hash, CLI version, or host invalidates them.

## 10. Redaction

No credential, token, cookie, API key, or secret-marked environment value was collected, displayed, or
recorded. No probe read or emitted environment variables. `conversation_id` values are retained as
session identifiers and carry no credential material. The `cwd` value is a local repository path,
retained verbatim as part of the observed `init` event. The 56-element `tools` array is elided by count
only, for length; it contains no secret material.
