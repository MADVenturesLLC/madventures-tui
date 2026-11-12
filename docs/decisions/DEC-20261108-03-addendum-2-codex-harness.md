FOUNDER-ACT-20261108-PHASE-3B-H1 ADDENDUM 2: the governed Codex harness for H1, and the check of its tool calls

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261108-03` B6 items 2 and 5, B9 item 6 and B13 item 2, as below
> **Read with:** `DEC-20261108-03` B6, B9, B13 and its Addendum 1; `DEC-20261108-02` B4; `DEC-20261103-01` B3; `DEC-20261102-02` A3 and B5

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The halt.** H1's first builder session, started through `/Users/michaeldaley/builds/codex-governed` from `/Users/michaeldaley/builds/h1-r1`, reported harness Codex, model GPT-6 by OpenAI with its variant not shown, sandbox `workspace-write` and approval `on-request`, and that its harness exposed a deferred namespace `mcp__codex_tui`. It halted under `DEC-20261108-03` B9 item 6 before it ran any command. No file changed.

A2. **The governed configuration.** `codex-governed --version` printed `codex-cli 0.167.0`. `codex-governed mcp list` printed that no MCP server is configured, and the governed configuration holds no `mcp_servers` entry. A probe session in the empty folder `/Users/michaeldaley/builds/codex-tool-probe`, read-only and making no call, listed the namespaces `functions`, `clock`, `image_gen`, `web`, `collaboration` and the deferred `mcp__codex_tui`, and goal tools inside `exec`.

A3. **The hardening.** I backed up the governed configuration, turned off the features `multi_agent`, `image_generation`, `goals`, `browser_use`, `browser_use_external`, `browser_use_full_cdp_access`, `in_app_browser`, `skill_mcp_dependency_install`, `tool_suggest` and `in_app_local_automation`, and set `web_search = "disabled"`. `codex-governed features list` then showed those ten and `multi_agent_v2` false, and `collaboration_modes` listed as removed and true. A second probe listed `functions`, `clock`, `collaboration` and the deferred `mcp__codex_tui`; `web`, `image_gen` and the goal tools were gone. Codex 0.167.0 offers no switch that removes `collaboration` or `mcp__codex_tui`, and what `mcp__codex_tui` holds cannot be listed without a call.

A4. **The check.** Each governed session leaves its record under `/Users/michaeldaley/.codex-governed/sessions`, with the folder it started in. A test session in the probe folder ran `pwd` once. A count-only command found three sessions started in that folder: one with one top-level call, `custom_tool_call exec`, holding `exec_command` and `pwd` once each, and two with no call. The command prints file names, call types and names, and counts of named tools inside `exec`, and no argument, command, output or message.

A5. **The drafting assistant.** A Claude Code session proposed the hardening and the check, and drafted this addendum. It could not learn what `mcp__codex_tui` holds. None of that is an independent review.

## Part B: Founder rulings

B1. **The harness.** H1's builder runs under Codex 0.167.0 with the governed configuration of A3. That configuration joins the launch of `DEC-20261103-01` B3 for every governed Codex session in this repository until I rule otherwise. A builder session whose `codex --version` is not `codex-cli 0.167.0` stops.

B2. **The two namespaces.** `collaboration` and the deferred `mcp__codex_tui` are part of the Codex 0.167.0 harness, not MCP servers the session loads, and their presence alone is not a halt under `DEC-20261108-03` B9 item 6. A session that shows any namespace other than `functions`, `clock`, `collaboration` and `mcp__codex_tui`, or a web, image or goal tool, stops.

B3. **What the builder calls.** Only `exec`, with `exec_command`, `write_stdin`, `apply_patch` and `clock__curr_time` inside it; `wait`; `sleep`; and `request_user_input` or `request_user_input_async`. It calls no tool of `collaboration` or `mcp__codex_tui`, and none of `list_mcp_resource_templates`, `list_mcp_resources`, `read_mcp_resource` or `view_image`. Its identity report lists every namespace and tool name its harness shows, and its final report says whether it called any tool this item bars.

B4. **The check.** After the builder's final report and before the review, my command runs the check of A4 over every session record whose starting folder is `/Users/michaeldaley/builds/h1-r1`, including the halted session of A1. Every top-level call must be a call of `exec`, `wait`, `sleep`, `request_user_input` or `request_user_input_async`, none in `collaboration` or `mcp__codex_tui`; and inside `exec`, the counts of `read_mcp_resource`, `list_mcp_resources`, `list_mcp_resource_templates`, `view_image`, `codex_tui` and `spawn_agent` must each be 0. Otherwise H1 halts for my ruling. The review prompt quotes the check's output, and `DEC-20261108-03` B13 item 2 is read to require it before the review starts.

B5. **The first session.** The halted session of A1 is not a round and made no change. The next session keeps the Actor-Id, branch, clone and folders of `DEC-20261108-03` B6 item 1, under a builder prompt I sign that names this addendum. `logs/` and `pr/` stay empty until it starts.

B6. **Counting and filing.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it and is filed unchanged with the act that records H1's merge, with Addendum 1. Nothing else in `DEC-20261108-03` or its Addendum 1 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-09

Actor-Id: founder
