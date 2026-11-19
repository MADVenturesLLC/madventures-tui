DEC-20261115-02 ADDENDUM 5: the retired-id capture, the built-in plugin and the JSON array

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** how `DEC-20261115-02` B9 item 3 and its halt sentence read capture 07 of my MacBook; the rule of B8 item 3 and B15 item 2 that no call is repeated, once, for the Claude Code primitives on my MacBook; the record script of B7 item 1 as Addendum 4 B3 left it
> **Read with:** `DEC-20261115-02` and its Addenda 1 to 4; `DEC-20261103-02` Addendum 1, A3 and B6 item 12; Phase 3B design §2.6 item 1

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The MacBook investigation.** My guarded command ran the primitives of B8 item 3 and B15 item 2 once each into `/Users/michaeldaley/builds/m0-investigation-macbook`, whose `MANIFEST.sha256` has SHA-256 `130cddb479161a2f47b1365d662932f8f3574af3d3be24672a18bc0d0ab91e1f` and covers 142 files, none holding the key or a string of the pattern of Addendum 4 B1. Every check that decided whether the command went on passed. The summary the command printed at its end is wrong: macOS's bash 3.2.57 brace-expanded the jq filters inside its quoted command substitutions. My two read-only commands that followed checked the folder against its manifest and printed the facts of A2 to A5.

A2. **madv-surface.** Item 1 matched A4, `daf7ffe5922a3b538d69e6408d4c14c96978b17d16aca2cdeb57e7b6f1852024`, before and after, and item 2 printed `madv-surface 0.1.1`. Item 3 exited 0 with `loggedIn` true, `authMethod` `plan_key`, `verified` true and `verifyMethod` `read_only_endpoint`. Items 4 and 5, three runs, each exited 0 with `system/init`, `model_response`, `assistant` and `result/success`, and a `model_response` naming `MiniMax-M3.1-Flash`, maker and domain `minimax`, `tls_verified_host` `api.minimax.io`, `matches_requested` true. Item 6 requested `MiniMax-M3.1-Flash-Preview`; its one `model_response` names `MiniMax-M3.1-Flash`, with `matches_requested` false and `stop_reason` `tool_use`. The model then called `search` for the pattern `model`, which returned `no matches`, and `list_dir` on `.`, which returned nothing; the one-turn limit ended the run with `result/error_max_turns`, exit 1, no standard error and no system event other than `system/init`. At the release commit madv-surface confines those tools to the real path of the run's working directory (`src/tools.ts`, `confine`), which B8 item 2 made an empty directory.

A3. **What B9 and the script say of item 6.** B9 item 3 asks for a `model_response` whose `response_model` is `MiniMax-M3.1-Flash`, not the requested id; capture 07 holds one. The record script of Addendum 4 B3, `record/m0-record.ts`, SHA-256 `07e578dc1e416269854f4199b6dc6a445e4b941be3a39157fd364f1d0fedac56`, also requires capture 07 to exit 0, and would record madv-surface's identity as `fail`. B9's halt sentence, "any other item fails", could be read to reach item 6's exit status.

A4. **Claude Code.** Items 1 to 8 and 14 to 18 exited 0, and the launcher's path and SHA-256 `591bad397af64e89b14a52759cb628a6a1c9b0eabfbd21ae3388fe6a6103ab19`, the version `2.1.325` and the sign-in `claude.ai`, `firstParty`, `max` match A8. Captures 10 and 11, the second with the alias `fable`, were served by `claude-fable-5-2` in the assistant model and in `modelUsage`, with `canonicalModel` `claude-fable-5-2`, provider `firstParty` and positive output tokens, and no tool call. Every `system/init` of captures 09 to 13 shows `dontAsk`, no MCP server and no tool, and one plugin: name `cc-plugin-privacy`, path `builtin`, source `cc-plugin-privacy@builtin`. It is not among the six plugins that `DEC-20261103-02` Addendum 1 A3 step 3 turned off under 2.1.314, and 2.1.325 loads it in the governed configuration. `DEC-20261103-02` Addendum 1 B6 item 12 makes any plugin in those events a halt, and the record script refuses the Claude Code record on it.

A5. **Captures 12 and 13.** Under 2.1.325, `--print --output-format json` prints one JSON array of events, here `system/init`, `assistant`, `rate_limit_event` and `result/success`, not one object. The record script reads a capture as one object or as one object per line, finds no evidence in either, and refuses the Claude Code record on that too. Both captures were served by `claude-fable-5-2` with no tool call.

A6. **The drafting assistant.** It wrote my investigation and read-only commands and drafted this addendum. That is not an independent review.

## Part B: Founder rulings

B1. **Capture 07.** B9 item 3 is met on my MacBook: the server named the model that served the request, not the id requested. Item 6's exit 1 is the one-turn limit, reached after two read-only tool calls in an empty directory; it is not a failed item under B9's halt sentence. The record states it as a limitation.

B2. **The plugin.** The governed configuration is mine to set (`DEC-20261103-02` Addendum 1 B2). I turn `cc-plugin-privacy` off in `/Users/michaeldaley/.claude-madventures-v5/settings.json`, by name under the marketplace names of that addendum's A3 step 3, after a backup, and change nothing else. One check run, in the environment of B15 item 2, from an empty directory and sending one request, then shows its `system/init`. If that event shows a permission mode other than `dontAsk`, or any MCP server, plugin or tool, M0 halts for my ruling. The rule of `DEC-20261103-02` Addendum 1 B6 item 12 stands unchanged.

B3. **One second run of the Claude Code primitives on my MacBook.** After the check of B2 passes, my guarded command runs the primitives of B15 item 2, items 1 to 18 in their order, once more, under the same rules, into `/Users/michaeldaley/builds/m0-investigation-macbook-claude-r2` with its own `MANIFEST.sha256`. That is five live calls. The Claude Code captures of A1 stay in their folder as evidence of this halt only, and the MacBook's Claude Code record rests on the second run. No further run is authorized. The madv-surface captures of A1 stand, and its record rests on them.

B4. **The record script.** The builder changes `record/m0-record.ts` in two ways and no other:
1. capture 07 is resolved in a second form, the form of A2: exit 1, no signal, no timeout and empty standard error; in order, one `system/init` and one `model_response` with the fields the script checks now, then one or more pairs of `tool_use` and `tool_result` naming only `read_file`, `list_dir` or `search`, then one `result` with subtype `error_max_turns`, `is_error` true and `num_turns` 1, and no other event. When capture 07 resolves in that form, the record's limitations state that capture 07 ended at the one-turn limit after read-only tool calls and that its `model_response` is the resolution evidence. A capture 07 that exits 0 is judged as now;
2. the script also reads a capture's standard output that is one JSON array whose every item is an object, as its events in order.

B5. **How.** Under a resume message I sign, in its session, the builder makes the changes of B4, shows the changed script and its diff in full, runs again each synthetic run of item f of R6 and of Addendum 4 B3, and adds runs in which: capture 07 has the form of B4 item 1, which the script accepts; that form with a tool other than the three, with a system event other than `system/init`, or with a result other than `error_max_turns`, which it does not resolve; Claude Code captures 12 and 13 are JSON arrays, which it accepts; and a Claude Code `system/init` lists a plugin, which it still refuses. It halts with a report, makes no commit and changes nothing in its clone. Addendum 3 B4 applies.

B6. **Order.** B2 and B3 may run before or while the builder works under B5. My record runs of B10 and B15 item 3 on my MacBook use only the script of B5, after my check of it: the madv-surface record from the folder of A1, the Claude Code record from the folder of B3.

B7. **My Ubuntu PC.** Before B8 runs there, I set the permission mode, the tool denials and the plugin settings of its governed configuration to those of my MacBook's after B2, and one check run there, as in B2, must show `dontAsk` and no MCP server, plugin or tool, or M0 halts for my ruling.

B8. **The record.** M0's build log, in its Phase 2 part, and its pull request description record A1 to A5 in short, the script of B5 by its SHA-256, and this addendum by its SHA-256. The investigation packet of B11 quotes the outputs of my read-only commands, not the summary that A1 calls wrong.

B9. **Filing and counting.** This addendum takes effect when I sign it, and is filed unchanged with the act that records M0's merge, with Addenda 1 to 4. These are new Founder rulings, which Phase 3A plan §11.3 does not count. Nothing else in `DEC-20261115-02` or its Addenda 1 to 4 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-17

Actor-Id: founder
