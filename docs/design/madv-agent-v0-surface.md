# madv-agent v0 — surface design (one page) — revision 2

**Repository:** `MADVenturesLLC/madventures-tui` · **Authority:** `DEC-20261017-04` + Amendment 1 + Amendment 2 · **Status:** revised after independent advisor review; awaiting Founder re-ratification. Revision 1 was ratified 2026-10-18 at sha256 `024a0f18b10aa897cefad7a9…` and is superseded.

**Status:** REVISED — awaiting Founder re-ratification. Supersedes revision 1 (ratified 2026-10-18 at
sha256 `024a0f18b10aa897cefad7a9…`). Revision 2 folds in seven findings from an independent advisor
review; the disposition of each is recorded in
`decisions/RECORD-madv-agent-v0-design-advisor-disposition-2026-10-18.md`.
**Authority:** `DEC-20261017-04` as amended by Amendment 1 (CLI entry point; `madmik3 proxy` custodian)
and Amendment 2 (orchestrator drafts, Founder ratifies).

## 1. What it is
An interactive agent CLI/TUI the Founder launches, in the lineage of `opencode` and `hermes --tui`,
governed by this estate's policy engine and ledger, whose **model access is custodied by `madmik3`** so
that no long-lived provider key ever exists in the agent's environment.

## 2. Invocation and surface
- `madv-agent` — full-screen TUI in the current project directory.
- `madv-agent --resume <id>` — resume; `--resume` alone lists this project's sessions.
- **Session cardinality:** exactly **one active session per project directory at a time**; completed
  sessions accumulate as history and remain resumable. A **lock file** (`.madv-agent/lock`) makes a
  second concurrent instance in the same project refuse to start, so two processes can never write one
  event stream.
- **Layout:** transcript above; prompt below; status line: session · model · project dir · policy state ·
  ledger tail hash.

## 3. Session model — one store, no second log
- `.madv-agent/sessions/<id>/events.jsonl` is **the** append-only, hash-chained record of the session.
  There is **no second store**: the ledger view is **derived from these events** (each event carries its
  predecessor hash), and the status line's ledger tail hash is the hash of the last event. One writer,
  one file, no two-phase commit to invent.
- Appended per turn: user message, model envelope, each tool **proposal** (with its pre-image hash),
  each approval decision, each execution result.
- `--resume` reconstructs transcript and pending state **from events alone**; there is no mutable
  snapshot file.
- **Crash recovery:** an approval event with **no** matching execution result reconstructs as
  **interrupted/aborted** — never silently re-executed, and its row is shown as interrupted.
- Context compaction is an **event** (with the budget that triggered it), never a silent truncation.

## 4. Turn loop
1. User input → **policy precheck** (`packages/policy`): scope, allow-list, tool legality.
2. Model request → **`madmik3 proxy`** on loopback, streamed; one provider, chat-completion shape.
3. Stream rendered live; tool calls rendered as **pending** rows, never executed.
4. **Approval** for writes and shell via the existing `ApprovalDialog` pattern; refusal or timeout is an
   event and a visible row, never a silent skip.
5. **Use-time re-check** — *the path checked is the path used*: resolve the target with `realpath`
   immediately before execution, re-apply the allow-list to the **resolved** path, and for
   `write_file` verify the **pre-image hash** still matches the one recorded at proposal time. A
   mismatch aborts the write as an event; the approval never covers a different byte range than the one
   shown.
6. **Ledger entry** appended to the session's event stream: args hash, outcome, exit status, duration,
   approval reference, and for `write_file` both pre-image and post-image hashes.
7. Loop continues until the model stops calling tools or the user interrupts.

## 5. Tools (v0 — exactly four)
| Tool | Policy check | Ledger record |
| :--- | :--- | :--- |
| `read_file` | resolved path inside allow-list; size cap | path, bytes, hash |
| `write_file` | resolved path inside allow-list **+ approval** + pre-image hash match | path, bytes, pre-image hash, post-image hash, approval id |
| `search` | allow-list root; result cap | pattern, root, hits |
| `shell` | allow-list cwd **+ approval**; command shown verbatim | command hash, exit code, duration, approval id |

**Hard denials, never overridable by approval:** `write_file` and `shell` may not target
`.madv-agent/**` (the audit trail) or `.git/**`, even inside an allow-listed project root. Path checks
run on the `realpath`-resolved target, so a symlink cannot walk out of the allow-list. A request
targeting either tree is refused as an event.

No fifth tool in v0. Adding one is a new ruling, not a plan detail.

## 6. Credential path (the property that must hold)
- `madmik3 proxy` holds the provider key and serves `127.0.0.1`; the agent holds **only a base URL** and
  never reads a provider key from its environment or configuration.
- **Environment scrubbing at entry:** the agent starts with an **allowlist** of environment variables
  and drops everything else — including `GH_TOKEN`, `GITHUB_TOKEN`, any `*_API_KEY`, and proxy
  variables — before it renders or calls anything. The same scrub applies to the environment inherited
  by every `shell` invocation. The scrub is recorded as a session event (names dropped, never values).
- **Proxy unavailable ⇒ explicit refusal**, never a fallback to a key and never a silent degrade.
- **Wording precision:** one provider, chat-completion shape only. **No tool *execution* inside the
  proxy** — tool schemas and `tool_calls` deltas pass through as data, because the model produces them;
  what the proxy never does is run a tool. No mid-session switching.

## 7. Acceptance — checkable by a third party
A scripted session that: reads a file, proposes a write, is **approved**, writes it, runs a test command,
and exits. Then:
- **(a)** the session's event stream verifies against its own hash chain, and the ledger view derived
  from it matches;
- **(b)** a scan of the agent process's environment **after scrubbing** and of its configuration finds
  **no provider key and no GitHub token** — run from a shell that *does* export `GH_TOKEN`, so the
  scrub itself is what is being proved;
- **(c)** the session replays from `events.jsonl` alone, transcript and pending state identical;
- **(d)** an approved-but-unexecuted tool call is shown as **interrupted** after a kill and is not
  re-executed on resume.

## 8. Out of scope for v0
Everything B4 excludes, unchanged: multiple providers, mid-session switching, vision, audio, subagents,
third-party MCP consumption, worktrees, remote sessions, sharing, plugins, GitHub write authority, and
all cosmetic work. The MadBridge pane is a later adapter.

## 9. Open authority items (not resolved here)
- **B8:** the implementing seat and its independent verifier for N1.
- **F1:** any change to `packages/policy`, `packages/ledger`, `packages/broker` or `packages/protocol`.
- The `madmik3 proxy` subcommand is authorized but **not yet specified**; it carries its own scope and
  gates (`CANDIDATE-ISSUED-FOUNDER-madmik3-PROXY-AUTHORIZATION-r1.md`).

## 10. What this note does not claim
No code, no milestone, no verification, no test run. It is one page of surface decisions for the Founder
to ratify or amend before N1 is authorized.
