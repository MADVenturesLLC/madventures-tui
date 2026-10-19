# N3 — the four tools, the boundary, and the approval gate

Stage N3 of `madv-agent` v0, under `ISSUED-FOUNDER-madv-agent-N3-AUTHORIZATION-r1`
(sha256 `f675ee8550cbfd4c0329479e156ae3e40a0879797f1c09e6a2707c4493d06181`), and the boundary rule recorded in
`DEC-20261017-04` Amendment 3.

## The four tools

| Tool | Kind | Approval | What it does |
| :--- | :--- | :--- | :--- |
| `read_file` | read | no | Reads one file inside the project root, capped at 200 000 chars. |
| `search` | read | no | Regular-expression search across the project, skipping `.git`, `.madv-agent`, `node_modules`, `dist`, `build`, `.next`; capped at 200 hits over 4 000 files. |
| `write_file` | write | **yes** | Writes one file inside the project root, creating parent directories that are themselves inside the root. |
| `shell` | execute | **yes** | Runs an **argv array** with cwd pinned to the project root, a 20 s timeout, a 256 KiB buffer and a 16 000-char event cap. |

### What `shell` is, stated precisely

`shell` runs an **argv array** and refuses to invoke a **shell interpreter**: it resolves `argv[0]` (through
PATH for bare names, against the project directory for relative ones), then refuses anything whose *resolved*
basename is `sh`, `bash`, `zsh`, `dash`, `ksh`, `ksh93`, `mksh`, `fish`, `csh`, `tcsh`, `nu`, `xonsh`,
`elvish`, `yash` or `ash`, plus any argv containing `-c`. A symlink is **resolved, not refused** — `/usr/bin/sh`
is itself a symlink on macOS — and it is the resolution target that decides.

**That is a name-based rule, and it does not prevent code execution.** Measured on this head:
`bun -e '…'`, `node -e`, `perl -e`, `awk 'BEGIN{system(…)}'`, `find -exec`, a Makefile, and any program that
spawns what it likes are all still expressible as argv. (`python3 -c '…'` is *refused* — by the `-c` rule, not
by anything specific to Python.) The rule stops the *casual* `sh -c "<string>"` path and the obvious aliases; it
is a guard-rail, not a sandbox.

**`shell` runs with this user's authority.** It can therefore create, modify or delete anything the user can,
including `.madv-agent/sessions/**` and `.git/**`. The **hard write-deny is a `write_file` rule** — it stops
the *agent's file tool* from forging its own audit stream or editing git internals; it does not constrain a
program that `shell` runs, and the docs said otherwise until an independent verifier called it.

**The control for `shell` is the approval**, one invocation at a time, showing the exact argv. If confinement
is wanted — a sandbox that restricts what the child can touch — that is a separate design stage, not a
property of this one.

## The boundary

Every path goes through `src/policy.ts` at **use time** — immediately before the operation, never reusing an
earlier decision:

1. **Containment** is delegated to `@madventures/policy` (`assertWithinAllowedPath`), which does textual
   rejection of `..` and absolute escapes, an `lstat` walk rejecting any symlink component, and realpath
   containment against the project root.
2. **Hard write-deny — a `write_file` rule.** `write_file` refuses `.madv-agent/**` and `.git/**`, so the
   agent's own file tool cannot forge the stream that records it or edit git internals. This constrains
   `write_file` only: `shell` runs with the user's authority and can write those paths (see above). The
   boundary is a rule about the file tool, not about the machine.
3. **Use-time re-check**: the resolved path is `lstat`ed again, and a path that is a symlink at that moment is
   refused.

**Residual, named rather than hidden.** Reads and writes open with `O_NOFOLLOW`, so a leaf swapped for a
symlink between the check and the syscall is refused by the kernel (`ELOOP`) rather than followed. A **hard
link** inside the root to a file outside it is indistinguishable by path — the same inode is reachable by a
name that is genuinely inside the project — so the boundary cannot see it; only ownership or MAC would. And
what remains open besides that is the **parent-directory race**: if a directory *above* the leaf is replaced with a symlink
between our resolution and the `open(2)`, the open can land outside the root — closing that needs
`openat(2)`-style directory-fd walking, which N3 does not do. The window is narrow and inside one process,
and it is stated here instead of being described as closed.

## The approval gate

`src/approval.tsx` defines the `Approver` seam and two implementations: a terminal approver that blocks and
fails closed on anything that is not an explicit `y`/`yes`, and scripted/static approvers for tests.

- **Per invocation.** There is no "always allow" in N3. Two identical writes produce two approval events.
- **Fails closed.** With no approver wired, anything needing approval is refused with
  `refused: no approver is configured`.
- **Denials are recorded.** A denied call appends `approval {granted:false}` and `tool_result {status:"denied"}`
  and is returned to the model as a refusal, so the next turn knows.

**Not in N3:** the interactive TUI dialog. The gate is enforced through the injectable seam and the terminal
approver; `src/tui/**` is outside this stage's closed list, so wiring the dialog into the pane is N4's work.
In TUI mode reads work and anything needing approval is refused until then — no silent auto-approve.

## The event stream

Three event types were added (with the Founder's authorisation of 2026-10-19):

| Event | When | Payload |
| :--- | :--- | :--- |
| `tool_call` | before authorisation | `{tool, args}` |
| `approval` | before the call is acted on | `{tool, summary, granted, by, reason?}` |
| `tool_result` | after the attempt, whatever happened | `{tool, status: ok\|denied\|refused\|error, ok, summary, output}` |

Replay reconstructs the conversation from these events alone, so a resumed session sees its own refusals and
does not re-ask for what was already denied.

## Acceptance and how it is proven

| Criterion | Test |
| :--- | :--- |
| reads bounded by the root | `test/policy-boundary.test.ts` — traversal, absolute escape, symlink out |
| writes bounded; stream not forgeable | same file — `.madv-agent/**`, `.git/**` refused inside the root |
| path checked is path used | same file — TOCTOU: authorised, swapped to a symlink, refused at use |
| approval per invocation; denial recorded | `test/tools-approval-replay.test.ts` |
| `shell` is argv, pinned and bounded | same file — `sh -c` refused, plain argv runs |
| replay reproduces refusals | same file — denied and refused calls visible in the transcript |

Each of these carries a mutation proof in the stage's build report: with the check removed, the named test
fails.

### Terminal output is not trusted either

Model-authored text reaches the terminal in two more places besides the approval prompt: the **streamed
deltas** and the **tool-event lines**. Both are sanitised (`sanitizeStream` keeps newline and tab, escapes
everything else), because an ESC sequence in a delta can move the cursor, recolour text or erase the line the
human is reading — and a human reading a redrawn terminal is not giving informed consent.

### Bypasses found in verification, now regressions

`test/tools-bypass-regressions.test.ts` holds four tests that **fail on the first N3 head** (`3890ef2`):

| | Bypass | Fix |
| :--- | :--- | :--- |
| B1 | `search` walked with `stat()` and followed symlinks out of the root | `lstat` per entry, skip symlinks, plus realpath containment per file. Measured: removing the `lstat`/skip layer **fails** the test; removing only the realpath layer does **not** (the walk already refuses to descend), so the realpath check is defence in depth for forms the walk does not cover, not the primary control |
| B2 | the write-deny compared the first segment case-sensitively, so `.GIT/hooks/…` addressed `.git/hooks/…` on this filesystem | compare case-insensitively |
| B3 | `shell` judged `argv[0]` by basename, so a symlink named `tool` pointing at `/bin/sh` ran a shell | resolve `argv[0]`; refuse a symlink and refuse anything that resolves to a shell |
| B4 | the approval prompt printed raw argument text, so control characters could repaint it | `sanitizeForDisplay`: escape control characters, cap length; the recorded event carries what the human was shown |
