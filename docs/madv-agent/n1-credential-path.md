# madv-agent N1 — the credential path

Stage N1 of madv-agent v0 (`ISSUED-FOUNDER-madv-agent-N1-AUTHORIZATION-r1`).
One page: how to run it, what it scrubs, what it refuses.

## How to run it

From the repository root (the app is `apps/madv-agent`, workspace `@madventures/madv-agent`):

```sh
# Full-screen TUI in the current project directory
bun run apps/madv-agent/src/cli.ts

# TUI in a specific project
bun run apps/madv-agent/src/cli.ts --project /path/to/project

# One scripted headless turn (the acceptance path)
bun run apps/madv-agent/src/cli.ts --prompt "hello" --project /path/to/project

# List this project's sessions
bun run apps/madv-agent/src/cli.ts --resume --project /path/to/project

# Resume a session — the transcript is rebuilt from events alone
bun run apps/madv-agent/src/cli.ts --resume <session-id> --project /path/to/project
```

The model endpoint is `MADV_AGENT_PROXY_URL` (default `http://127.0.0.1:14933`).
That URL is the ONLY credential-adjacent configuration the agent holds. The
`madmik3 proxy` (custodian, merged `67a1b85`) holds the provider key.

## What it scrubs

At entry — before the TUI renders and before any network call — the process
environment is reduced to an allowlist (`apps/madv-agent/src/scrub.ts`,
`ENV_ALLOWLIST`): runtime basics, terminal capabilities, XDG dirs,
`SSH_AUTH_SOCK`, and `MADV_AGENT_PROXY_URL`. Everything else is dropped,
including by rule (even if added to the allowlist):

- every `*_API_KEY`
- `GH_TOKEN` and `GITHUB_TOKEN`
- proxy variables: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY`
  and lowercase forms

The dropped NAMES (never values) are recorded as the session's `env_scrub`
event in `.madv-agent/sessions/<id>/events.jsonl`.

## The hash chain — how to verify it from outside

Each line of `events.jsonl` is one JSON object
`{seq, ts, type, payload, prev_hash, hash}`. The stored `hash` is the sha256
hex digest of `JSON.stringify({payload, prev_hash, seq, ts, type})` — the
five fields with keys inserted in alphabetical order (payload, prev_hash,
seq, ts, type), JSON.stringify's compact separators, no whitespace — and the
`prev_hash` of seq 1 is sixty-four `0` characters. To verify: for every line
in order, recompute that digest and compare it to the stored `hash`, and
check each line's `prev_hash` equals the previous line's `hash`. An
independent verifier living in `apps/madv-agent/test/chain-verifiability.test.ts`
fails on any mutated byte or re-ordered event.

## What it refuses

- **A second concurrent instance in the same project.** The lock file
  `.madv-agent/lock` (holder pid inside) makes the second start refuse with
  exit code 3. A lock left by a dead process is stale and is reclaimed.
- **A non-loopback proxy URL.** `MADV_AGENT_PROXY_URL` pointing anywhere but
  `127.0.0.1` / `localhost` / `[::1]` is refused at startup (exit code 2).
  Plain HTTP loopback only.
- **An unreachable proxy.** If the madmik3 proxy does not answer, the agent
  fails with an explicit refusal that names the proxy URL (exit code 5 in
  `--prompt` mode). Never a fallback, never a silent degrade: this agent
  holds no provider key and will not use one.
- **A broken stream.** A malformed SSE frame from the proxy is an error, not
  a partial reply: the turn is recorded as a `stream_error` event in the
  session's chain and surfaced on stderr with exit code 6 in `--prompt` mode.
  A partial reply is never recorded as an `assistant_message`.
- **A tampered event stream.** `--resume <id>` verifies the session's hash
  chain first; a broken chain — or an empty/truncated one, which is not a
  chain at all — refuses to resume (exit code 4).

## What N1 does not do

No tools, no approval dialogs, no policy or ledger package calls, no model
switching, one provider, no MadBridge pane. Sessions beyond
create/resume/list are N4.
