ADDENDUM 1 TO DEC-20261103-02: the Task 57 halt ruled, the governed configuration corrected, and one second run of B4 authorized

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261103-02`, filed at `c11afdc7ce399aaac71766884c4036bb4b77bddd`, SHA-256 `387a6604ecba3b84d06d40586875f8d005876a89eb6a6f7a03beb4fccc3d1442`
> **Builder prompt it continues:** SHA-256 `c3e664d2f3ffb24ae2238d646b24936e7634bc604fa6e0988568e9361dacd6ca`
> **Read with:** `DEC-20261103-02` B2 item 4, B4, B6, B7, B11, B12, D1, E2, E5 and Part G; `DEC-20261023-01` Part B

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The halt.** The builder `session:codex/m25-task57-r1`, on `build/m25-task57-r1` at the binding base `c11afdc7ce399aaac71766884c4036bb4b77bddd`, ran the eighteen commands of B4 once, from the runner with SHA-256 `d30568129345850395e99be487d88d054eeaafb9c2d724f6dd9a99b34c43983e`. Every command exited 0 within its limit, and the launcher checks before and after matched the pre-check. It then halted under B12 item 4:
1. The stdout of item 10, SHA-256 `9c17db5e4800159d6b2ce293aba0c40d3a85c629f41c60d2ae50068f79359e77`, 531,855 bytes, shows two Bash tool calls of the launcher's session and their results.
2. The stdout of item 11, SHA-256 `0656dbf1e95c4a65e770e302c14c85f2c24522aad435af8148ee492a5eeadc5b`, 536,303 bytes, shows four.
3. Those commands read `/Users/michaeldaley/madventures-tui-build-task38-r1`, which both sessions had as an additional directory, and attempted to read memory.
4. Item 12 reported 21 connected MCP servers in the launcher's session.

No record, report, commit or pull request file was written. `test/phase3a/evidence-pipeline.test.ts` carries 232 appended lines holding the three tests of B8, every earlier byte unchanged, SHA-256 `08065e742b241ba5578dbe141154c85bc974a2b717db82c19dc8f8bf838ec3bf`. Test 1's RED is recorded, log SHA-256 `ead45f008509b3a13aa056d352fd59aa6bcdb7be4812eb3448e1576996c3265c`. The runner's log has SHA-256 `097867b5b1007d3eb96ff7f2d1356a04fb53333a31ac550d3e4e75cf0a6531e6`. The builder broke no rule of the act.

A2. **The cause.** On 2026-11-04 I inspected the governed directory `/Users/michaeldaley/.claude-madventures-v5`, printing names, rules and counts only. Its `settings.json`, SHA-256 `d0d47bdbb7ba3538a3544b00825de50c36ed326653ddab80619a678cd3d837c6`, set:
1. `permissions.defaultMode` to `auto`, under which the session approves its own tool calls;
2. thirteen allow rules left from Task 38: twelve for Bash commands and one for edits under `/Users/michaeldaley/task-38-*`;
3. `/Users/michaeldaley/madventures-tui-build-task38-r1` as an additional directory;
4. the plugin `codex@openai-codex` enabled.

It did not turn off the claude.ai connectors, hooks or automatic memory. The directory holds 14 memory folders and 49 skills. No MCP server is configured in `settings.json` or in `.claude.json`. The launcher passes no flag: its line 90 passes only the arguments it receives.

A3. **My changes.** On 2026-11-04 I changed `settings.json` in three steps, each backed up first and each followed by one check run in the environment of B4, from an empty directory, sending one request:
1. **Step 1**, backup `settings.json.bak-20261104-task57`, result SHA-256 `28d473d57ab8313234d0b6ff43ea097c4a4dc8701b74413450dc7709c455126b`:
   - permission mode `dontAsk`;
   - Bash, Edit, Write, NotebookEdit, Read, Glob, Grep, WebFetch, WebSearch, Agent, Task and Skill denied;
   - no allow rule and no additional directory;
   - every listed plugin off;
   - claude.ai connectors, hooks and automatic memory off;
   - the `autoMode` and `extraKnownMarketplaces` settings removed;
   - `DISABLE_AUTOUPDATER` kept at `1`, as B2 item 4 requires.

   Its check still listed fifteen tools, six plugins and the plugin MCP server `plugin:foundation:foundation`, with status `needs-auth`.
2. **Step 2**, backup `settings.json.bak-20261104-task57-step2`, result SHA-256 `b8ec5e47a14808b376c57c038334dc1e2b519d9aa0794a402f9c4f4687fb3aec`: those fifteen tools denied, namely CronCreate, CronDelete, CronList, DesignSync, EnterWorktree, ExitWorktree, ListAgents, PushNotification, RemoteTrigger, ReportFindings, ScheduleWakeup, SendMessage, TaskStop, ToolSearch and Workflow; and the installed plugin and the synced plugin folder turned off. Its check listed no tool, but the same six plugins and MCP server.
3. **Step 3**, backup `settings.json.bak-20261104-task57-step3`, result SHA-256 `2da01c9de7202a90e51ced9d2b7715a7e9c247453e5b438db0045a5fd0bf0c10`: the six plugins, security-guidance, vpai, foundation, cc-plugin-agents-md, cc-plugin-telemetry and cc-plugin-plugin-authoring, turned off by name under every marketplace name the directory knows and under `synced`, `inline`, `builtin`, `bundled` and `claude-plugins-official`.

After step 3 the check showed permission mode `dontAsk`, API key source `none`, no MCP server, no plugin, no tool, no tool call, and the result `ok`. It still lists 192 skills; with no tool, none can be invoked. The launcher's SHA-256 stayed `6cb4ba9225161ffe303dd42f40d796752c200135a171052cbfa0a8934cc1cbb4` and its version `2.1.314`, and no check run changed `settings.json`.

A4. **The drafting assistant.** It drafted this addendum and wrote the commands of A2 and A3 and of Part D. None of that is an independent review.

## Part B: Founder rulings

B1. **The halt.** The halt was correct under B12 item 4. The captures of the first run are not evidence for the record, the verdict or the report beyond the facts of A1. They stay in the builder's scratch root, are not committed, posted or quoted, and are deleted with that scratch root after the pull request merges.

B2. **The configuration.** The configuration of the governed directory is mine to set; Part G bars only an agent from changing it. The changes of A3 stand. Until the record of B6 is written, `settings.json` keeps the SHA-256 `2da01c9de7202a90e51ced9d2b7715a7e9c247453e5b438db0045a5fd0bf0c10`, and I change neither it, the launcher, nor any plugin.

B3. **The new pre-check.** Part D quotes the pre-check of D1 that I ran again on 2026-11-04 with step 2 in place, and the check run with step 3 in place. Only `enabledPlugins` differs between the two settings files, which leaves the launcher, its version and its sign-in unchanged. Part D stands as the pre-check of D1 for the second run.

B4. **One second run of B4.** I authorize the builder of A1 to run the commands of B4 once more, in the same session, branch and clone, at the same binding base, with the same `M` and `A`, and in the same environment. It uses a new empty working directory and a new capture directory inside the same scratch root. It may reuse the runner with only its output paths changed; it shows the changed runner in full and records its SHA-256 before running it. While those commands run, no other Claude Code session runs on my MacBook. No further run of B4 is authorized.

B5. **What stands.** The baseline of D2, the 232 appended lines of A1 and test 1's RED stand. The build continues from B6 with the captures of the second run only.

B6. **Halts added to B12.** B12 item 9 means the builder's own session. B12 gains two items, and the list stays closed:
12. a `system/init` event of items 9 to 11 shows a permission mode other than `dontAsk`, any MCP server, any plugin, or any tool;
13. any capture of items 9 to 13 shows a tool call by the launcher's session, whatever the tool.

If the second run halts, Task 57 halts for my ruling.

B7. **The report.** Besides what B7 of the act requires, the report has a section on the first run. It states the facts of A1, the cause of A2 and the changes of A3, with the SHA-256 of `settings.json` before and after them. It quotes nothing from the first run's captures. The record and the verdict rest on the second run only.

B8. **Reads.** B11 is unchanged. The builder reads nothing under `/Users/michaeldaley/.claude-madventures-v5`. When I run the command of E2, it also prints the SHA-256 of `settings.json`, which must equal the one B2 names.

B9. **Counting and filing.** These are new Founder rulings, which plan §11.3 does not count. The halt is not a review verdict and adds no round. No checkpoint closes. This addendum binds from my signature. The docs-only pull request that files the next act I sign files it unchanged in `docs/decisions/`.

## Part C: The builder's next steps

C1. Verify this addendum's SHA-256 against the one I give you. Confirm that HEAD is still `c11afdc7ce399aaac71766884c4036bb4b77bddd` on `build/m25-task57-r1`, that `test/phase3a/evidence-pipeline.test.ts` still has the SHA-256 of A1, that the runner of A1 still has its SHA-256, and that the runtime checks of the builder prompt still pass. Stop and report if any differs.

C2. Compare Part D with the pre-check of the builder prompt: `L`, `R`, its SHA-256 and the version must match. Stop and report if they differ.

C3. Run B4 once more as B4 of this addendum says. Then apply B12 items 1 to 13. If none applies, continue from B6 of the act to E3, as the act and the builder prompt say.

C4. Your final report adds the SHA-256 of the second runner and of each capture of the second run, and states that the first run's captures were neither used nor quoted.

## Part D: The pre-check of B3

D1. The pre-check of D1, run with step 2 in place, from its launcher section on:

```text
=== launcher facts
-rwxr-xr-x@ 1 michaeldaley  staff  3869 Oct  8 06:24 /Users/michaeldaley/.local/bin/madbridge-claude-v5
realpath: /Users/michaeldaley/.local/bin/madbridge-claude-v5
/Users/michaeldaley/.local/bin/madbridge-claude-v5: POSIX shell script text executable, Unicode text, UTF-8 text
sha256: 6cb4ba9225161ffe303dd42f40d796752c200135a171052cbfa0a8934cc1cbb4
claude realpath: /Users/michaeldaley/.local/share/claude/versions/2.1.314
launcher is not the same file as ~/.local/bin/claude
passwd shell: /bin/zsh
account name: michaeldaley
=== in the seven-variable environment of DEC-20261103-02 B4, from an empty folder
version: 2.1.314 (Claude Code)
{"loggedIn":true,"authMethod":"claude.ai","apiProvider":"firstParty","subscriptionType":"max","configDirectory":"/Users/michaeldaley/.claude-madventures-v5"}
Auto-updates: disabled (set by env: DISABLE_AUTOUPDATER)
Auto-update channel: latest
```

D2. The check run with step 3 in place:

```text
settings.json sha256: 2da01c9de7202a90e51ced9d2b7715a7e9c247453e5b438db0045a5fd0bf0c10
plugins enabled: 0
=== check run: one short request on the subscription
exit code: 0
{"permissionMode":"dontAsk","apiKeySource":"none","claude_code_version":"2.1.314","mcp_servers":[],"plugins":[],"skills":192,"tools":[]}
tool calls: 0
{"is_error":false,"num_turns":1,"result":"ok"}
stderr lines: 0
settings.json unchanged by the run: yes
STEP3_DONE
```

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-04

Actor-Id: founder
