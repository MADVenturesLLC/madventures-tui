# Phase 3A — Preliminary Antigravity Evidence Pass (Task 60)

**Status:** Complete. Verdict: **FAIL** against the §2.2 identity rubric.
**Task:** 60 (Stage 0, the only task outside M1–M26), rubric §7.2 milestone 1
**Plan authority:** `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` at
`1b46856a646266d3c7eb9882cc74f0c5f9f4cfb5`
**Implementation base:** `70c6a2359feb88cc4e3cc21301e18221313f6f8e`
**Evaluation date:** 2026-08-13T00:29Z – 2026-08-13T00:34Z (UTC)
**Executed by:** Claude Opus 5 (provisional implementer)

> **This is a preliminary evidence pass, not the formal surface investigation.**
> It produces **no machine-readable capability record**. Task 56 (M25) remains the formal
> Antigravity investigation and repeats this work through the M15/M16 tooling. Per plan §9.3,
> Task 56 **must not** reuse this pass's attestation as fresh session evidence.
> This document confers no eligibility on any surface.

## 1. Authorization basis

| Gate | Status | Evidence |
| --- | --- | --- |
| Tier-2 approval of the exact plan SHA | Asserted | PR #10 body: "Independent Tier-2 plan review: APPROVE at the exact head SHA" (`1b46856…`) |
| Founder approval of that SHA | Asserted | PR #10 body: "Founder approval: this plan SHA is approved"; merged as `70c6a23` |
| Separate Founder authorization of Task 60 | **Explicit** | PR #10 comment, `decivantiq` @ 2026-08-13T00:27:21Z: "I authorize Opus 5 to execute Task 60 only, exactly as specified in the approved Phase 3A implementation plan. No other task is authorized." |
| `IMPLEMENTATION_BASE_SHA` recorded | **Explicit** | Same comment: "I approve IMPLEMENTATION_BASE_SHA `70c6a2359feb88cc4e3cc21301e18221313f6f8e` for Phase 3A." |

**Disclosure.** The implementer did not independently observe the Tier-2 verdict document; gates 1 and 2
rest on the PR #10 body and the Founder's authorization. Recorded here so a later reviewer can confirm
the provenance rather than infer it.

## 2. Host facts

| Field | Value |
| --- | --- |
| Architecture | `x86_64` |
| macOS | 13.7.8, build 22H730 |
| Bun version | 1.3.14 |
| Bun path | `/Users/michaeldaley/.bun/bin/bun` |
| Bun SHA-256 | `ea2f223e94bb2f4bf3050895113c3cf346438f6fa0501c8532284e063f72f7a0` |
| `TERM` | `xterm-256color` |
| `SHELL` | `/bin/zsh` |

This is the Founder iMac profile of specification §3.6.

## 3. Binary under investigation

| Field | Value |
| --- | --- |
| Surface | `antigravity` |
| Executable | `agy` |
| Absolute path | `/Users/michaeldaley/.local/bin/agy` |
| Resolved real path | `/Users/michaeldaley/.local/bin/agy` (not a symlink) |
| SHA-256 | `a3e9175bfc15656a70e87ed5df627c2691da3dee88acf69ae0601e5ecf146c48` |
| CLI version | `1.1.12` |

## 4. The rubric applied (specification §2.2, unmodified)

**Passing evidence — either of:**

- **P1** — a documented CLI or API primitive returning the resolved provider and exact model **for the actual session**; or
- **P2** — structured per-session or per-response metadata naming the provider and exact model **actually used**.

**Failing evidence — any of:** configuration files; requested flags or environment values; marketing names
or version banners; unstructured prose; behavioral inference; cached attestations; any statement of
requested intent rather than resolved fact.

The rubric was fixed before probing began and was not edited during or after it.

## 5. Primitives probed

Every command was run non-interactively with stdin redirected from `/dev/null`. No repository file was
written by any probe. Outputs below are verbatim except where truncated for length, which is marked.

### 5.1 `agy --version`

```text
1.1.12
```

**Rubric:** **FAIL** — version banner. Explicitly listed as failing evidence ("marketing names or version banners").

### 5.2 `agy --help` / `agy help`

Full flag and subcommand list captured. Available subcommands:
`agent`, `agents`, `changelog`, `help`, `install`, `models`, `plugin`, `plugins`, `update`.

Grep of the complete help text for `whoami`, `session info`, `current model`, `resolved`, `identity`,
`provider`:

```text
NO identity/provider/session-info primitive documented
```

**Rubric:** **FAIL** — no documented primitive exists that could satisfy **P1**. This is the decisive
negative finding for P1: the absence is documented, not inferred.

### 5.3 `agy models`

```text
Fetching available models...
gemini-3.6-flash-high	Gemini 3.6 Flash (High)
gemini-3.6-flash-medium	Gemini 3.6 Flash (Medium)
gemini-3.6-flash-low	Gemini 3.6 Flash (Low)
gemini-3.5-flash-high	Gemini 3.5 Flash (High)
gemini-3.5-flash-medium	Gemini 3.5 Flash (Medium)
gemini-3.1-pro-high	Gemini 3.1 Pro (High)
gemini-3.1-pro-low	Gemini 3.1 Pro (Low)
claude-sonnet-4-6	Claude Sonnet 4.6 (Thinking)
claude-opus-4-6-thinking	Claude Opus 4.6 (Thinking)
gpt-oss-120b-medium	GPT-OSS 120B (Medium)
[truncated]
```

**Rubric:** **FAIL** — this is a **catalog of available models**, not a statement of what the actual
session resolved to. It is the same class of evidence as a configuration file. It also demonstrates that
`agy` fronts multiple providers (Google, Anthropic, OpenAI-derived), which makes resolved-identity
attestation *more* necessary, not less.

### 5.4 `agy agents` and `agy agent`

```text
(empty output, both)
```

**Rubric:** **FAIL** — no output; supplies no identity fact.

### 5.5 `agy config get model` — the probe used by the current adapter

This is the exact primitive invoked at `packages/adapter-antigravity/src/attestation.ts:41`.

```text
CLI error: bubbletea: error opening TTY: bubbletea: could not open TTY:
open /dev/tty: device not configured
```

**Rubric:** **FAIL**, and doubly so:

1. **`config` is not a subcommand of `agy` 1.1.12.** It does not appear in the subcommand list. The
   argument falls through to the interactive TUI, which then fails for lack of a TTY.
2. Even had it worked, `config get model` reads **configuration** — explicitly failing evidence under
   §2.2, and explicitly rejected by §9.13 ("No configured model string, flag, provider file, or
   marketing output can substitute").

**This is a defect in the existing adapter**, independent of the rubric outcome: its attestation path
targets a subcommand that does not exist, and would attempt an interactive TTY inside what must be a
non-interactive probe. Recorded for the M2/M14 adapter work.

### 5.6 `agy --output-format=json --print-timeout=90s --print='Reply with exactly: ok'`

The decisive test for **P2**. Structured per-response metadata, verbatim:

```json
{"conversation_id":"a8d29cac-e169-4728-8ffa-29dc98c4c8c1","status":"SUCCESS","response":"ok\n","duration_seconds":1.497165,"num_turns":1,"usage":{"input_tokens":15475,"output_tokens":62,"thinking_tokens":58,"cache_read_tokens":8151,"total_tokens":15537}}
```

Fields present: `conversation_id`, `status`, `response`, `duration_seconds`, `num_turns`,
`usage{input_tokens, output_tokens, thinking_tokens, cache_read_tokens, total_tokens}`.

**Fields absent: `model`, `provider`, or any equivalent.**

**Rubric:** **FAIL** against **P2**. Structured per-response metadata exists and is well-formed, but it
names neither the provider nor the exact model actually used.

> **Flag-parsing note.** The first attempt used space-separated flags
> (`agy --print --output-format json …`). The CLI absorbed `--output-format` into the *prompt text* and
> answered a question about the string rather than emitting JSON. The `=` form was then used to give the
> CLI a fair test. The initial result is **not** counted as evidence of absent JSON support — JSON support
> exists; it simply carries no identity fields.

### 5.7 `agy --output-format=stream-json …`

Tested because a streaming `init` event is the most likely place for session metadata. Verbatim init
event, `tools` array truncated:

```json
{"event":"init","conversation_id":"ee8c70e9-a9cb-4ff2-be6c-352e2da5411f","init":{"cwd":"/Users/michaeldaley/madventures-tui","tools":["ask_permission","ask_question",...,"write_to_file"],"permission_mode":"request-review"}}
```

Subsequent events: `step_update` × 4 (`user_input`, `unknown`, `agent_response`, `checkpoint`) and a final
`result` event. Terminal event verbatim:

```json
{"event":"result","result":{"conversation_id":"ee8c70e9-a9cb-4ff2-be6c-352e2da5411f","status":"SUCCESS","response":"ok\n","duration_seconds":1.394647,"num_turns":1,"usage":{"input_tokens":15475,"output_tokens":29,"thinking_tokens":23,"cache_read_tokens":8151,"total_tokens":15504}}}
```

**Rubric:** **FAIL** against **P2**. The `init` event carries `cwd`, `tools`, and `permission_mode` —
no model, no provider. No event type in the stream carries an identity field.

### 5.8 `agy --model=gemini-3.1-pro-low --output-format=json …`

Tests whether an explicitly requested model is echoed back in the response metadata.

```json
{"conversation_id":"a4783c71-f0ec-48dc-a618-54fd2509a04e","status":"SUCCESS","response":"ok\n","duration_seconds":4.488597,"num_turns":1,"usage":{"input_tokens":23047,"output_tokens":277,"thinking_tokens":273,"cache_read_tokens":0,"total_tokens":23324}}
```

**Rubric:** **FAIL**. The requested model is not echoed at all. Even the weaker, already-failing form of
evidence — a restatement of requested intent — is unavailable. There is no field from which any model
identity could be read, resolved or requested.

### 5.9 Deliberately not attempted

**Asking the model to self-report its own identity** (e.g. `agy --print='What model are you?'`) was
**not** performed. §2.2 lists behavioral inference and unstructured prose as failing evidence, so such a
probe could not produce a passing result, and recording it risks a later reader mistaking it for
attestation. Its omission is intentional.

## 6. Auth-readiness

`agy` completed live sessions during probing (§§5.6–5.8), which demonstrates the host user's credentials
are installed and valid at this date. However:

- **No documented non-mutating, non-interactive auth-readiness primitive exists.** Nothing in the help
  text reports credential state without starting a billed session.
- The only means of confirming auth was to **run an actual session**, which is not a readiness *probe*.

**Auth-readiness result: `no_primitive`.** Per §5.4, "a surface without a documented, non-mutating,
non-interactive auth-readiness primitive receives that result in its capability record; no waiver is
inferred."

## 7. Verdict

**Overall: FAIL.**

| Criterion | Result | Precise clause not met |
| --- | --- | --- |
| **P1** — documented CLI/API primitive returning resolved provider + exact model for the actual session | **FAIL** | No such primitive exists in `agy` 1.1.12. The complete subcommand and flag surface was enumerated (§5.2); nothing reports resolved session identity. |
| **P2** — structured per-session/per-response metadata naming provider + exact model actually used | **FAIL** | Structured metadata exists in both `json` and `stream-json` forms and is well-formed, but **no event or field carries a model or provider identifier** (§§5.6–5.8). |
| Auth-readiness | `no_primitive` | No documented non-mutating, non-interactive readiness primitive (§6). |

This confirms the position already recorded in specification §9.13: **Antigravity remains ineligible for
a live pair.** The finding is stronger than a bare absence — `agy` demonstrably *has* a structured
machine-readable output channel, and that channel omits identity. So the gap is not "no structured
output to read from"; it is "the structured output does not carry the fact the rubric requires."

`agy` also fronts models from at least three providers (§5.3). Under specification §9.2, provider
disjointness and independence-domain distinctness are pair-eligibility requirements. A surface that can
resolve to Anthropic, Google, or an OpenAI-derived model without disclosing which cannot be assessed for
provider independence at all — so the missing identity primitive defeats §9.2 as well as §2.2.

## 8. Consequences and non-consequences

**This document does:**

- satisfy specification §2.3's requirement that Antigravity is investigated first;
- record a failed result as a required evidence document, per §2.3 and §6.6;
- surface an independent defect in `packages/adapter-antigravity/src/attestation.ts:41` for the M2/M14 work.

**This document does not:**

- create a machine-readable capability record — Task 56 (M25) does that;
- confer eligibility on Antigravity or any other surface;
- exclude Antigravity from Phase 3A fixture work, which continues behind the production `start` gate;
- disqualify Gemini Antigravity as the Tier-2 **reviewer** — per §6.6 that role is independent of the
  `agy` CLI's attestation capability, and failure here does not affect it;
- authorize any further task. Task 60 was authorized alone.

**Residual.** A binary that attests truthfully during a probe and differently during a governed session
remains a documented residual under §2.2. Nothing here narrows it.

## 9. Reproduction

```bash
agy --version
agy --help
agy models
agy agents
agy config get model                                                  # expect: not a subcommand
agy --output-format=json --print-timeout=90s --print='Reply with exactly: ok'
agy --output-format=stream-json --print-timeout=90s --print='Reply with exactly: ok'
agy --model=gemini-3.1-pro-low --output-format=json --print-timeout=90s --print='Reply with exactly: ok'
```

Results are binary-hash- and version-specific. They are valid only for `agy` 1.1.12 at SHA-256
`a3e9175bfc15656a70e87ed5df627c2691da3dee88acf69ae0601e5ecf146c48` on the host in §2, as of the
evaluation date. Any change to the binary hash, CLI version, or host invalidates them.

## 10. Redaction

No credential, token, API key, or secret-marked environment value was collected, displayed, or recorded.
No probe read or emitted environment variables. `conversation_id` values are retained as session
identifiers and carry no credential material. The `cwd` value in §5.7 is a local repository path, retained
verbatim because it is part of the observed init event.
