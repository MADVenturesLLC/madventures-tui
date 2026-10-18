# madv-agent v0 — surface design (one page)

**Repository:** `MADVenturesLLC/madventures-tui` · **Authority:** `DEC-20261017-04` + Amendment 1 + Amendment 2 · **Ratification:** Founder, 2026-10-18

**Status:** RATIFIED by the Founder, Michael Daley, on 2026-10-18 — ratified at sha256 024a0f18b10aa897cefad7a9485f76756d24c41246e5689c56a3fe7c154c10f2 of the draft, with the body unchanged. Filed in the repository as `docs/design/madv-agent-v0-surface.md`.
**Authority:** `DEC-20261017-04` (native agent v0) as amended by Amendment 1 (CLI entry point;
`madmik3 proxy` custodian). This note resolves **B7** under the Founder's ruling of 2026-10-18: the
orchestrator drafts, the Founder ratifies, and independent verification applies to **N1's code**, not
to this page.

## 1. What it is
An interactive agent CLI/TUI the Founder launches, in the lineage of `opencode` and `hermes --tui`,
governed by this estate's policy engine and ledger, whose **model access is custodied by `madmik3`** so
that no long-lived provider key ever exists in the agent's environment.

## 2. Invocation and surface
- `madv-agent` — full-screen TUI in the current project directory.
- `madv-agent --resume <id>` — resume a session; `--resume` alone lists the project's sessions.
- **Layout:** transcript (user, assistant, tool lines) above; prompt input below; a status line carrying
  session id · model · project dir · policy state · ledger tail hash.
- The MadBridge pane is **not** part of v0 (Amendment 1, A2).

## 3. Session model
- One session per project directory, stored under `.madv-agent/sessions/<id>/events.jsonl` (append-only).
- Every turn appends: user message, model response envelope, each tool proposal, each approval decision,
  each execution result — the same events that seed the ledger, so a session is replayable.
- Context compaction at a configurable token budget, recorded as an event (never silent).
- `--resume` reconstructs transcript + pending state from events alone; no separate mutable snapshot.

## 4. Turn loop
1. User input → **policy precheck** (`packages/policy`): scope, path allow-list, tool legality.
2. Model request → **`madmik3 proxy`** on loopback, streamed (SSE), one provider, chat-completion shape.
3. Stream rendered live; tool calls rendered as **pending** rows, not executed.
4. **Approval** for writes and shell via the existing `ApprovalDialog` pattern; refusal or timeout is an
   event and a visible row, never a silent skip.
5. Execution → **policy re-check at use time** (the path checked is the path used), then run.
6. **Ledger record** per tool call (`packages/ledger`): args hash, outcome, exit status, duration,
   approval reference, session id.
7. Loop continues until the model stops calling tools or the user interrupts.

## 5. Tools (v0 — exactly four)
| Tool | Policy check | Ledger record |
| :--- | :--- | :--- |
| `read_file` | path inside allow-list; size cap | path, bytes, hash |
| `write_file` | allow-list + approval required | path, bytes, hash, approval id |
| `search` | allow-list root; result cap | pattern, root, hits |
| `shell` | allow-list cwd; approval required | command hash, exit code, duration, approval id |

No fifth tool in v0. Adding one is a new ruling, not a plan detail.

## 6. Credential path (the property that must hold)
- `madmik3 proxy` holds the provider key and serves `127.0.0.1`; the agent holds only a base URL.
- The agent's environment and configuration contain **no provider key and no GitHub token**.
- Proxy unavailable ⇒ **explicit refusal**, never a fallback to a key and never a silent degrade.
- One provider, chat-completion shape only; no tool-calling inside the proxy; no mid-session switching.

## 7. Acceptance — checkable by a third party
A scripted session that: reads a file, proposes a write, is **approved**, writes it, runs a test command,
and exits. Then: (a) `packages/ledger` verifies the whole session against its hash chain; (b) a scan of
the agent process's environment and configuration finds **no provider key and no GitHub token**; (c) the
session replays from `events.jsonl` alone.

## 8. Out of scope for v0
Everything B4 excludes, unchanged: multiple providers, mid-session switching, vision, audio, subagents,
third-party MCP consumption, worktrees, remote sessions, sharing, plugins, GitHub write authority, and
all cosmetic work.

## 9. Open authority items (not resolved here)
- **B8:** the implementing seat and its independent verifier for N1 — Founder's naming when sequencing allows.
- **F1:** any change to `packages/policy`, `packages/ledger`, `packages/broker` or `packages/protocol`
  beyond what B3–B4 require, including whatever the `madmik3 proxy` needs to expose to the agent.
- The `madmik3 proxy` subcommand itself is authorized by the Founder but **not yet specified**; it needs
  its own scope and gates before N1 depends on it.

## 10. What this note does not claim
It claims no code, no milestone, no verification, and no test run. It is one page of surface decisions for
the Founder to ratify or amend before N1 is authorized.
