# DEC-20261017-04 — Native agent v0: new app authorization, credential shape and sequencing

Act identifier: `FOUNDER-ACT-20261017-NATIVE-AGENT-V0`

**Provenance.** Drafted by `cos-orchestrator` from the Founder's own decisions of 2026-10-17, and filed
on the Founder's instruction of the same date. Custody draft:
`decisions/DRAFT-DEC-20261017-03-native-agent-v0-for-founder-filing.md` (sha256
`2f0914adc8fd2a662cf3a11ca0f77b029a453e9c432cfb45d711bc40c0c03ae5`). Companion drafting material,
neither of which is approved by this act: `DRAFT-PLAN-madbridge-native-agent-v0-2026-10-17.md` (sha256
`c6f007244b19974c37a54152be86212419e25a76eeaad556a4d514dfa2dbd98e`) and
`DRAFT-DECISIONS-madbridge-native-agent-v0-2026-10-17.md` (sha256
`5ffa129e75408e3538f2f3fe02da2be974aa422715eded1a7eaf29711ab26f2a`). Filing this act authorizes the
direction of Part B and nothing in those drafts by implication.

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **Founder direction.** On 2026-10-17 the Founder stated that he wants **his own agent CLI/TUI**, in
the lineage of OpenCode, Hermes CLI and OMP — not another interface onto Hermes — and chose to build it
**inside this repository** as a *native agent* beside the Claude Code and Antigravity adapters, in
TypeScript, reusing the policy engine as the permission system, the ledger as the evidence store and
the TUI panes as the interface. He subsequently ruled that it is implemented as a **separate
application within this repository**, not as an amendment to MadBridge's own identity, and that its
implementation is **sequenced behind Task 56's current round**.

A2. **The standing identity rule this touches.** `AGENTS.md` carries, from `DEC-20260820-01` clause 3:
*"MadBridge is an orchestration framework, not a coding execution surface. The TUI is an interface.
Never register or describe MadBridge as an execution surface."* An agent that writes files and runs
commands **is** an execution surface. The Founder's direction therefore could not be executed without
a ruling that resolves the collision. This act is that ruling — and it resolves it by separation
(B1), not by amendment.

A3. **What already exists in this repository (verified by inspection, not assumed).** `packages/policy`
(scope, path allow-list, model identity, review-independence checks), `packages/ledger` (append-only
SQLite, hash-chain integrity, deterministic rebuild), `packages/artifact-store`, `packages/protocol`,
`packages/broker`, and in the TUI `apps/madbridge/src/tui/`: `ApprovalDialog.tsx`, `SeatBar.tsx`,
`ModelBar.tsx`, `ModelPicker.tsx`, `hooks/useSeatState.ts`, `agent-identity.ts`, `PaneTabs.tsx` and an
existing keyboard router. **A seat system and a model picker are already present**: what does not exist
anywhere in the estate is a model client, an agent loop, and tools.

A4. **The credential question, as it stands today.** The distinguishing property of the proposed agent
is that the agent process never holds a provider credential or a GitHub token. The `madmik3` broker on
this host is the intended custodian. Its state was verified on 2026-10-17, not assumed: it is
`launchd`-supervised on `127.0.0.1:14932`, authenticated as the **agent** account `daley40-lab`
(id 293512385) rather than the Founder's owner account, and two agent seats read the private repository
`MADVenturesLLC/madmik3` through it with **no token in their environments or configurations**. On the
same day its status path was hardened — a per-process identity cache and an O(1) metadata comparison
replacing a whole-file hash per request — and merged at `5fa5faf7`. **Its operation surface remains
`github.repo.read` only**: brokering a *model* invocation is new work on the credential surface of this
estate, and is scoped as such in B3 and in stage N1.

A5. **Role constraints and the live queue that bounds this act.** Under `AGENTS.md`, the Founder
authorizes and reviews, the `builder` role implements, and Hermes is a neutral orchestrator only —
never Architect and never Builder; if a required Architect seat is unavailable the correct output is
`FOUNDER_DECISION_REQUIRED`, never a substitution. Separately, this repository is mid-cycle on Task 56:
`DEC-20261017-01` (Round 4 review correction) and `DEC-20261017-02` (builder reassignment and Round 5
authorization, assigning Codex CLI as successor builder for `session:codex/m25-task56-r5`) were both
filed on 2026-10-17, and **no Round 5 closure record exists**. B6 therefore sequences this work behind
that round.

A6. **Drafting record.** These rulings were drafted against the Founder's decisions of 2026-10-17 and
against this repository's `AGENTS.md`, `docs/STATUS.md`, `docs/decisions/`, and a read-only inspection of
`apps/` and `packages/`; and against the broker state recorded in A4 and the queue state recorded in A5.
No test, gate, ledger or capability artefact was executed in drafting, and none of this constitutes an
independent review.

## Part B: Founder rulings

B1. **A new app, not an execution surface.** A native agent is authorized as a **new application inside
this repository** (`apps/<name>`, the name chosen in B2), with its own entry point, its own
documentation and its own test surface. **`DEC-20260820-01` clause 3 is not amended.** MadBridge retains
its declared identity as an orchestration framework over Claude Code and Antigravity; the native agent
is a separate product that shares the repository's packages by ordinary intra-repository import. Any
future act that would describe *MadBridge* as an execution surface remains prohibited.

B2. **Name.** The new app's name is a Founder choice, not a drafting one. Candidates offered:
`madv-agent`, `madagent`, `bridge-agent`. Until the Founder rules, this act refers to it as **the native
agent** and its directory as `apps/<name>`, and no directory of that name may be created.

B3. **Credential shape.** The native agent obtains model access by **brokered invocation**: it sends the
model request to the `madmik3` broker, which holds the provider credential and performs the call,
streaming the result back. The agent process must never receive, read, log or store a provider key.
Scope for v0 is **one provider and the chat-completion shape only**; tool-calling inside the broker,
multiple providers, and key delegation to the agent are expressly not authorized. If the broker work
proves too large for v0, the Founder may rule a loopback provider proxy instead — but never a live key
inside the agent process.

B4. **v0 scope.** Authorized: streaming chat with one provider; four tools (read file, write file,
search, shell) each evaluated by `packages/policy` before execution and recorded in `packages/ledger`;
approval prompts for writes and shell through the existing `ApprovalDialog`; one resumable session per
project directory; one pane beside the external adapters. Not authorized in v0: multiple providers,
model switching mid-session, vision or audio, subagents, third-party MCP consumption, worktrees, remote
sessions, sharing, plugins, any GitHub write authority, and all cosmetic work.

B5. **Ceremony.** Product stages are authorized under a **lighter cycle**: one authorization, one build
pass, one independent verification and one merge gate per stage. The full instrument, closed-list,
mutation-proof and evidence cycle is reserved for any stage that touches the credential path — which for
v0 is stage N1, where B3's brokered invocation is built.

B6. **Sequencing.** Implementation is **sequenced behind Task 56's current correction round**. No build
of the native agent may be dispatched while that round is live, so that the two governed queues do not
compete for the same reviewer or the same ledger. Filing this act does not clear that gate; only a
Round 5 closure record does.

B7. **Authored by the repository's own roles.** A specification and an implementation plan for the
native agent are to be **authored by this repository's architect role under its own process**, taking
the Founder-approved direction of this act and the drafting input of
`DRAFT-PLAN-madbridge-native-agent-v0-2026-10-17.md` as material — not as an approved plan. That spec
and plan must settle the file map, the milestone sequence and the open authority items in this
repository's usual form. Hermes orchestrates; it does not author the spec or implement the build.

B8. **The implementer.** The implementing seat and its independent verifier for stage N1 are named by
the Founder under this repository's rules when B6's sequencing clears them. No substitution of a model
or a seat is authorized by this act.

## Part C: Scope and filing

C1. This act changes only `docs/decisions/` — it authorizes no code, no test, no adapter, no manifest
and no configuration change, and it modifies no file in `apps/` or `packages/`.

C2. Filing was the Founder's act, performed on 2026-10-17. Drafting this text authorized nothing, and
the drafting seat signed nothing.

## Part D: Verification

D1. An independent reviewer verifies only that this act does not contradict a standing decision it has
not expressly addressed. The reviewer is not required to test code, because this act creates none.

## Part E: Binding

E1. Binding on the builder role for the native agent only, and only for the scope of B4.

## Part F: Not authorized

F1. No amendment to `DEC-20260820-01` clause 3. No change to the Claude Code or Antigravity adapters. No
change to `packages/policy`, `packages/ledger`, `packages/broker` or `packages/protocol` beyond what B3
and B4 require, and any such change needs its own ruling. No credential read, write or test by stage
code. No merge by an agent. No dispatch while Task 56's Round 5 remains without a closure record (B6).
No directory `apps/<name>` created before the Founder rules B2.

## Part G: Signature

Filed by Michael Daley, Founder of MAD Ventures, on 2026-10-17. Draft prepared by `cos-orchestrator` on
the same date.
