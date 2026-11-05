STEP: fix the findings of the first review of madv-surface pull request 1, and one more found while this prompt was drafted. Paste this as the first message of a new Claude Code session that the Founder started on the Ubuntu PC inside the existing clone /home/michaeldaley/builds/madventures-surface, with claude.ai connectors turned off and no MCP server loaded.

ROLE
You are the builder of the fix round of madv-surface, working as a Claude Code session. You work only in the clone /home/michaeldaley/builds/madventures-surface. You make no change to, and read nothing in, MADVenturesLLC/madventures-tui or any other repository or clone on this host. You continue on the existing branch build/v0.1, whose draft pull request is MADVenturesLLC/madventures-surface#1, and commit there. You push nothing and make no GitHub call: the Founder pushes and updates the pull request. You use no skill and no plugin.

FIRST: YOUR IDENTITY REPORT, BEFORE ANY OTHER STEP
In your first reply, report as your harness shows them: the harness name and version; the model; every MCP server and plugin loaded; every additional working directory; and whether any user-level instructions or memory from earlier sessions were loaded, by file name only. Then run pwd, uname -sm, git remote -v, git log --oneline -7, git status --porcelain, git branch --show-current, git rev-parse HEAD, git config user.name, command -v bun, bun --version and openssl version, which are part of this report. A field your harness does not show is recorded as not shown and is not a stop.
Stop and report FOUNDER_DECISION_REQUIRED if:
- the harness is not Claude Code;
- any MCP server is loaded;
- the working directory is not /home/michaeldaley/builds/madventures-surface;
- the branch is not build/v0.1, or HEAD is not 71f3fdde5ddd1f55c2ece5de1d569f79cc970b48;
- the working tree is not clean;
- bun is not on PATH, or bun --version is not 1.4.2.
User-level instructions or memory written for other projects do not apply here, except their security rules, which you follow. Read nothing under ~/.secrets, ~/.ssh, ~/.config, ~/.claude, ~/.claude-madventures-v5, ~/.codex, ~/.codex-governed, ~/.hermes, ~/.local/state, ~/ubuntu-b7-custody, or any other folder under ~/builds. Run no command that prints an environment variable, a token or a key, or lists processes.

READ FIRST
Before you change anything, read README.md, docs/provider-fields.md, docs/registration-proposal.md, every file under src/, and every file under test/. The existing design stays: pinned hosts, refused redirects, fail-closed identity, per-model domains, redaction, path confinement and the event contract. Change only what this prompt asks.

WHY
A review of pull request 1 at 71f3fdde5ddd1f55c2ece5de1d569f79cc970b48, run on the Founder's MacBook, returned FAIL. Its report is not available to you; each finding is stated below with what it found, where, and what this round must do. The reviewer's breaks and defeat attempts are named where they matter, because the evidence below asks you to repeat them.

WHAT TO FIX
1. Tests never leave the host.
   - The review found that three tests run the program with a synthetic key and no MADV_SURFACE_TEST_ENDPOINT: test/authstatus.test.ts:112, test/new-profiles.test.ts:399 and test/endpoint.test.ts:75. With the sk-ant- key refusal removed from src/auth.ts, they sent requests to api.z.ai and ollama.com.
   - In a test build, the program refuses any request whose endpoint is not the loopback test override: system/endpoint_refused, code test_build_requires_loopback, exit 6, before any connection. A release build is unchanged.
   - Those three tests set the override to a loopback mock and assert that it received no request.
   - runCli in test/helpers.ts throws before starting a run that meets all four conditions: it is not a test build; it sets any profile's key variable; it has non-empty stdin; and it does not set the override. This covers both env and exactEnv. The two release-binary runs in test/binary.test.ts that hold a key with empty stdin stay as they are.
2. Search output when the working directory is reached through a symbolic link.
   - On the MacBook, where /tmp is a link to /private/tmp, test/tools.test.ts:103 fails: search prints paths relative to ctx.cwd, not to the real working directory (src/tools.ts:258; the same pattern is at src/tools.ts:214).
   - Every path a tool prints is relative to ctx.realCwd. Check every use of ctx.cwd in src/tools.ts.
   - Add a test that runs the tool tests' search case with cwd set to a symbolic link to a temporary directory, so the fault shows on Linux too.
3. Dangling symbolic links.
   - The review found that confine walks up with existsSync, which is false for a link whose target is missing. A write through a dangling file link is refused only by the lstat check at src/tools.ts:276; with that line removed, write_file wrote a file outside the working directory. A write to dangling-dir/sub/x.txt failed only because Bun.write could not create the missing target.
   - confine refuses any path that passes through a symbolic link whose target does not exist, using lstat while it walks up. Keep the check at line 276.
   - Add tests for read_file, list_dir, search, write_file, edit_file and run_command (cwd and a path-form program), through a dangling file link and through a dangling directory link with further segments. Each is refused, and nothing is created outside the working directory.
4. The base path is pinned.
   - The review found that assertAllowedUrl (src/http.ts:62) checks only the protocol, host and port. A profile's basePath is not used by any check, so changing it changed nothing that a test saw.
   - The endpoint carries the profile's base path. Every request path, after URL normalization, equals the base path or lies under it. Otherwise: system/endpoint_refused, code path_not_allowed, exit 6, before any connection. This applies under the test override too.
   - Add a profile-table test that pins each profile's host, base path, chat path and verify method and path to the values docs/provider-fields.md cites, and checks that every request path lies under the base path.
   - Add tests that refuse a path outside the base path and a path whose dot segments normalize outside it.
5. The TLS host check is tested.
   - No test makes a TLS connection. The review replaced checkServerIdentity with one that always passes and set rejectUnauthorized to false, and no test failed.
   - Add a loopback HTTPS mock server.
   - A test build trusts an extra certificate authority named by MADV_SURFACE_TEST_CA, a path to a PEM file. A release build refuses that variable's presence like the endpoint override: system/endpoint_refused, code test_ca_not_permitted, exit 6. Add a release-binary test for that refusal.
   - Fixtures, made once with openssl and committed under test/fixtures/tls/ with a README naming them test-only, valid to at least 2075:
     - a test certificate authority;
     - a certificate for localhost and one for another name, both signed by that authority;
     - a self-signed certificate for localhost.
     These private keys are test fixtures for loopback names, not credentials.
   - Tests:
     - the localhost certificate under the trusted authority completes a reviewer turn;
     - the other-name certificate is refused before any tool runs;
     - the self-signed certificate is refused before any tool runs.
     Keep the exit code and event the existing contract gives these failures, and state them in your report.
6. run_command: program confinement and the time limit.
   - The review found that the path-form program check and the 120-second limit are untested. Removing both left all 73 tests passing.
   - Found while this prompt was drafted: the limit does not bound a command whose child keeps stdout or stderr open. Only the direct child is killed, and the call waits for the pipes to close. In a copy of src/tools.ts at 71f3fdde with the limit set to 1 second, under Bun 1.4.4 on Linux:
     - ["sleep","6"] returned after 1,022 ms;
     - ["sh","-c","sleep 6; echo done"] returned after 6,003 ms, and its sleep outlived the call;
     - spawning with Bun.spawn's detached option and killing the group with process.kill(-pid, "SIGKILL") returned after about 1,000 ms and killed the grandchild.
   - Each command runs in its own process group. On timeout, the whole group is killed, and the tool returns within the limit plus a small margin. When the program exits, any process it left in its group is killed, so no command outlives its tool call.
   - The limit stays 120 seconds. It becomes a ToolContext field that only tests set; it is not a flag or an environment variable.
   - Add tests:
     - an absolute program path outside cwd, a relative ../ program path, and a link inside cwd to a program outside are each refused;
     - with a short limit, ["sleep","30"] and ["sh","-c","sleep 30; echo done"] each return within the limit plus a small margin and are reported as killed;
     - the grandchild is gone. Show this from its pid, which the command writes to a file in cwd, without listing processes; allow for the brief delay before an orphan is reaped.
7. Kimi Code model ids.
   - The kimi profile's rule /^kimi[-_]/i (src/profiles.ts:60) refuses the plan's documented ids.
   - The Kimi Code page https://www.kimi.com/code/docs/en/, read on 2026-11-05, says "Both protocols accept the following 6 model IDs": k3.1-pro, k3.1-pro-highspeed, k3, k3-256k, kimi-for-coding, and kimi-for-coding-highspeed.
   - docs/provider-fields.md:80 cites kimi-k3.1-pro and kimi-k3 from the platform Messages reference, which documents the pay-per-token platform, not the plan.
   - Change only the kimi profile's rule so it accepts the six ids and the kimi- forms. Add no bare k-number rule to a host that serves several makers.
   - Correct the docs and the kimi model choices in test/helpers.ts.
   - Test each of the six ids, both when requested and when returned.
8. The Qwen Coding Plan serves several makers.
   - https://www.alibabacloud.com/help/en/model-studio/coding-plan says "Coding Plan gives you access to models including Qwen, GLM, Kimi, and MiniMax". On 2026-11-05 it named glm-5, kimi-k2.5 and MiniMax-M2.5.
   - The qwen profile's table holds Alibaba only, so those models are refused as unknown_family, and docs/provider-fields.md:153 says the host serves Qwen models only.
   - Give the qwen profile one family per maker the page lists, with each maker cited, and correct the docs.
   - Test that each family resolves to its maker. Test that a returned model from a different maker than the requested one fails closed: system/identity_mismatch, exit 4, no tool run.
9. A refused model carries no maker.
   - For any refused requested model (anthropic_model, alias_model or unknown_family), system/init carries requested_maker and requested_independence_domain as null.
   - Today a refused mistral -latest id gets "mistral". Add a test.
10. Redact before truncating.
    - Each cap that reaches an output can cut the key and leave a prefix the exact-match redactor misses: READ_CAP and COMMAND_OUTPUT_CAP in src/tools.ts, and TOOL_RESULT_EVENT_CAP at src/agent.ts:335.
    - Redact before every truncation that reaches stdout, stderr or the transcript.
    - Test with a fresh canary key placed across each cap boundary. No substring of 8 or more characters of the key may appear in stdout, stderr or the transcript.
11. Family tables against the current documents.
    - Re-read the current model lists for ollama, opencode-go and mistral and update their tables. The review reported:
      - gpt-oss:120b and gpt-oss:20b on https://ollama.com/pricing;
      - further models on https://opencode.ai/docs/go/;
      - Mistral models the rule does not match (Shieldstral 1.0, Timestral 1.0 and Mathstral 7B);
      - mistral-large-2512, the tests' mistral model, marked deprecated.
    - Record each page and the date you read it.
    - A model whose maker you cannot cite stays out of the table and goes in your report.
    - Tests and samples use models the current documents list.
12. Keep every other behavior. The version stays 0.1.0.

BILLING RULE (absolute)
No profile may use an Anthropic endpoint or key, and no request may name an Anthropic model. The program reads only the profile's key variable. Each profile pins its host and base path and refuses any other host, including through a redirect. Use no real key and make no real API call.

HOW YOU WORK
- Command rules:
  - Run no command that waits for input, no watch mode, and no server that outlives its command.
  - Give every bun test run a per-test timeout.
  - Do not install, upgrade or download Bun or any toolchain or system package, and edit nothing outside the clone other than Bun's own package cache and temporary folders. Add no dependency.
- Write each item's tests first. Run them at 71f3fdde5ddd1f55c2ece5de1d569f79cc970b48's code, and record which fail before the fix and pass after.
- Web search and web fetch are allowed for provider documentation only. Cite every value you take from documentation, with its page and the date you read it, in docs/provider-fields.md.
- Commit rules:
  - Commit in small steps with clear messages; rewrite and amend no commit.
  - Commit messages, docs/samples and the pull request files name no Anthropic model. In code and tests, the family rule that recognizes Anthropic models is allowed.
  - Commit messages hold no model identifier other than the attribution trailer your harness adds by default.

BREAKS TO REPEAT AT YOUR FINAL HEAD
In the clone, apply each break below, run bun test with a per-test timeout, record the failing tests by name, then restore with git checkout -- src test and show git status --porcelain empty. Commit no break.
1. Remove the sk-ant- key refusal in src/auth.ts. The tests fail, and every request of a failing run went to a loopback mock or was refused with test_build_requires_loopback. Show which, per failing test.
2. In src/http.ts, set rejectUnauthorized to false and make checkServerIdentity always pass. In src/profiles.ts, change zai's basePath to /api/paas/v4. TLS tests and base-path tests fail.
3. In src/tools.ts, remove the lstat check at line 276, the path-form program check, and the timer. The run_command tests fail, and the dangling-link write is still refused by confine.
4. In src/tools.ts, change confine back to walking up with existsSync. The dangling-link tests fail.

DOCUMENTS
- README.md:
  - the test-build loopback rule;
  - path_not_allowed;
  - MADV_SURFACE_TEST_CA and test_ca_not_permitted;
  - the process-group kill;
  - the kimi and qwen model ids.
- docs/provider-fields.md:
  - the kimi and qwen corrections;
  - the updated family tables, each with its source and date.
- docs/registration-proposal.md: the family tables as they now stand. Document only.
- docs/samples/: regenerate any sample whose content changes, from the mock server.

PROHIBITED
- Any change to, or read of, MADVenturesLLC/madventures-tui or any repository, clone or folder under ~/builds other than this clone and the pull request folder below.
- Any Anthropic profile, endpoint, key or accepted model.
- Any real API call, real key, or credential in code, tests, fixtures or logs.
- Third-party runtime dependencies, telemetry, auto-update, MCP servers or plugins in the program.
- Rewriting or amending any existing commit; pushing; any GitHub call; merging; changing repository settings.
- Loading or using any MCP server, skill or plugin in your own session.

STOP AND REPORT (do not improvise) WHEN
- Bun.spawn's detached option does not put the command in its own process group on this host, or the group cannot be killed;
- Bun cannot be made to trust a test certificate authority in a test build alone, or openssl cannot make the fixtures;
- a plan's documentation cannot settle which ids it accepts or which maker made a model;
- a fix would change a release build's behavior other than as this prompt names;
- anything would require touching madventures-tui, installing a toolchain, or changing anything outside the clone.

ACCEPTANCE AND EVIDENCE
- bun test: all pass, with the count; bun x tsc --noEmit: clean.
- For each item from 1 to 10: the tests that failed before its fix and pass after.
- The four breaks: the failing tests by name, and the clean restore.
- bun build --compile: the binary, with its SHA-256 and --version output.
- New commits on build/v0.1 on top of 71f3fdde5ddd1f55c2ece5de1d569f79cc970b48.
- A replacement pull request title and description, covering the whole pull request, saved as PR_TITLE.md and PR_DESCRIPTION.md in a new folder /home/michaeldaley/builds/madventures-surface-pr-3.

FINAL REPORT
1. Harness and version, model, loaded MCP servers and plugins, additional working directories, working directory and host.
2. Branch, new commits with full SHAs, and the paths of the pull request files.
3. Test count, typecheck result, binary SHA-256 and version.
4. Per item 1 to 11: what changed, by file and line, and its tests, with before and after results.
5. The four breaks and their results.
6. The family tables as they now stand, per profile, with sources and dates; and any model left out for want of a cited maker.
7. Limitations and open questions.
8. Deviations from this prompt, or the word none.
9. The single next step for the Founder: bundle the new commits for the push.
