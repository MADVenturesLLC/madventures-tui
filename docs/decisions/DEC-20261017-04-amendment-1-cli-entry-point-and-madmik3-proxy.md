# DEC-20261017-04 — Amendment 1: the entry point is a CLI, and the custodian is `madmik3 proxy`

Act identifier: `FOUNDER-ACT-20261018-DEC-20261017-04-AMENDMENT-1`

**Status:** ISSUED — filed 2026-10-18
**Repository:** `MADVenturesLLC/madventures-tui`
**Amends:** `DEC-20261017-04` (`FOUNDER-ACT-20261017-NATIVE-AGENT-V0`), merged on `main` as
`227ae15a205b5197a95ca605e0f1cd97d0f345ac` (PR #165) — **clauses B3 and B4 only**.
**Provenance:** the Founder's signed instrument is the custody file
`decisions/DRAFT-AMENDMENT-1-DEC-20261017-04-cli-entry-point-and-madmik3-proxy-2026-10-18.md`
(sha256 `cd5175fd6e71246ac9d2dc01e530d1ec86bbaea8e01aa5fc2ef440bdd0d512e1`), filed on the Founder's
instruction of 2026-10-18. Transcribed here verbatim, per the pattern of `DEC-20260918-01`.

I, Michael Daley, Founder of MAD Ventures, rule as follows.

======================================================================
AUTHORITY AND SUBJECT
======================================================================

Amends:    `DEC-20261017-04` (act `FOUNDER-ACT-20261017-NATIVE-AGENT-V0`), merged on
           `MADVenturesLLC/madventures-tui` `main` as `227ae15a205b5197a95ca605e0f1cd97d0f345ac`
           (PR #165). **Clauses B3 and B4 only.**
Basis:     the Founder's decisions of 2026-10-18, taken on the orchestrator's stated recommendations:
             1. the product's entry point is a **standalone CLI** he launches, not a pane inside
                MadBridge;
             2. the credential custodian is a **`madmik3 proxy` subcommand**, not an external
                loopback proxy and not a broker-side model-invocation operation.
Effect:    on filing, B3 and B4 read as amended below; every other clause of `DEC-20261017-04`
           stands untouched, including B1 (a new app, not an execution surface), B2 (the name
           `madv-agent`), B5 (ceremony), B6 (sequencing), B7 (authorship) and B8 (implementer).

======================================================================
CLAUSE A1 — B3 AMENDED: THE CUSTODIAN IS `madmik3 proxy`
======================================================================

B3's **shape (i)** (broker model invocation, with a new grant type and a new broker operation) is not
taken. B3's fallback was an external loopback proxy; this amendment refines it:

**The native agent obtains model access through a `madmik3 proxy` subcommand.** `madmik3` holds the
provider credential and runs a loopback endpoint on `127.0.0.1`; the agent sends model requests to that
endpoint and receives the stream. The agent process must never receive, read, log or store a provider key.

Boundaries, stated so they cannot be assumed away later:

  - **One new subcommand. No protocol change.** No new grant type, no new broker operation, no change to
    the broker's `/v1/execute` semantics, no change to `github.repo.read`. The proxy is a process the
    user starts, not a privileged route the agent calls.
  - **Custody stays in one place.** The process holding the key is `madmik3`, which is what makes
    "credentials live in one place" true again rather than a slogan.
  - **v0 scope:** one provider, chat-completion shape only — unchanged from B3.
  - **This is a bounded `madmik3` change and needs its own authorization.** It is the one exception to
    the Founder's "no `madmik3` upgrade" direction of 2026-10-18; that direction is superseded **to the
    extent of this single subcommand and nothing further**. Building it requires its own small
    authorization under `madmik3`'s own process, before any agent stage depends on it.
  - **B3's hard line is unchanged and absolute:** no live key inside the agent process, ever.

Reasons recorded, so the choice survives its author: the broker operation was the largest and riskiest
change in the estate and would have been built before any consumer existed to test it against; a third
external proxy would have split custody and left `madmik3` decorative. One subcommand gets `madmik3`
load-bearing at the smallest increment, and the proxy's contract becomes the evidence base for a broker
operation later, if that is ever wanted.

======================================================================
CLAUSE A2 — B4 AMENDED: A CLI ENTRY POINT, NOT A PANE
======================================================================

B4's "one pane beside the external adapters" is replaced by **one CLI entry point**:

**The native agent ships as a standalone interactive CLI/TUI at `apps/madv-agent`, launched like
`opencode` or `hermes --tui`** — its own entry point, its own session model with resume, its own
full-screen interaction surface. The **MadBridge pane is a later adapter, not part of v0**, and no v0
milestone may depend on MadBridge's UI work.

Everything else in B4 is unchanged: streaming chat with one provider; the four tools (read file, write
file, search, shell) each evaluated by `packages/policy` before execution and recorded in
`packages/ledger`; approval prompts for writes and shell; one resumable session per project directory;
and every exclusion still stands (no multiple providers, no mid-session switching, no vision or audio, no
subagents, no third-party MCP, no worktrees, no remote sessions, no sharing, no plugins, no GitHub write
authority, no cosmetic work).

Reasons recorded: the Founder's daily surfaces are terminal CLIs, so a pane inside an application he does
not launch would be dead on arrival; a CLI can be exercised headlessly in CI, which makes v0's acceptance
checkable without a TUI harness.

======================================================================
CLAUSE A3 — A VENUE FINDING, RECORDED RATHER THAN RE-RULED
======================================================================

B7 says the spec and plan are *"authored by this repository's architect role under its own process."*
On 2026-10-18 the orchestrator interpreted that as the Build Room's `br-architect` seat and stopped when
it could not be reached — correctly, but for the wrong reason. **The Build Room is a different product
with its own governance; its architect does not author `madventures-tui` documents.** An iMac profile
named `br-architect` was created in the attempt; it is **misnamed, must not be used for this work, and is
to be renamed or removed.**

B7 itself is not amended here. What B7's phrase refers to — this repository's own role or process for
authoring a specification — remains a Founder decision, and no substitute seat may be used before it is
ruled.

======================================================================
ISSUANCE
======================================================================

Filed by the Founder, Michael Daley, on ____________________.
Drafted by `cos-orchestrator` on 2026-10-18 from the Founder's approved recommendations of the same day.
Drafting this text authorizes and signs nothing.
