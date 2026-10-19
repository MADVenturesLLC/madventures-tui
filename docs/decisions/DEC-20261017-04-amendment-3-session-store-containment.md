# DEC-20261017-04 — Amendment 3: session-store containment (F1 ruling)

**Status:** FILED — in force from filing (2026-10-19).
**Amends:** `DEC-20261017-04-native-agent-v0-new-app-authorization.md`, alongside
Amendment 1 (`DEC-20261017-04-amendment-1-cli-entry-point-and-madmik3-proxy.md`) and
Amendment 2 (`DEC-20261017-04-amendment-2-b7-design-authorship.md`).

## Part A — Basis

A0. During verification of stage N1 the independent verifier asked which containment rule governs the session
    store, because the stage's instrument did not state one. The Founder ruled on it in session on
    2026-10-19, and the ruling was implemented and verified in N1 before it was written down. This amendment
    records it, because a rule that lives only in a session transcript cannot govern the stages after it.

## Part B — Ruling

B1. **The session store is contained by the project root.** `madv-agent` resolves the project directory and
    the session store (`.madv-agent/sessions`), following symlinks. If the resolved store does not lie inside
    the resolved project directory, the agent **refuses to start** and names both paths. It does not warn,
    relocate or degrade.

B2. **The reason, so the rule can be applied to new cases.** `events.jsonl` is the evidence of what the agent
    did in *that* project. A store that lives outside the project makes the evidence indistinguishable from
    no evidence, and it breaks the assumption the N3 tool allow-list will make when it treats the project
    root as the boundary of what may be read and written.

B3. **Symlinks within the root are permitted.** A store symlinked to a directory that is still inside the
    project is accepted; only leaving the root is refused. This keeps a legitimate layout (sessions in a
    project-local `store/`) working without opening the general case.

B4. **Resume resolves to its own file, exactly.** On `--resume`, the session must resolve to
    `<resolved store>/<id>/events.jsonl` and nothing else. A symlinked session directory, or a symlinked
    `events.jsonl`, is refused rather than followed — otherwise one session could be made to read another
    session's chain, or a file outside the store.

B5. **Applied to new sessions too.** The containment check runs before a new session writes anything, not
    only on resume.

## Part C — Consequences

C1. **N3 inherits this as its boundary rule.** The tool allow-list treats the project root as the permitted
    region; a store that escaped it would sit outside that region and be invisible to the policy check.

C2. **Two N1 observations are accepted as-is and carried to N3** (Founder decision, 2026-10-19): a refusal to
    start exits 1 through the fatal path, and that path can leave the lock behind. The stale lock is
    self-healing — the dead-holder reclaim clears it on the next start — so it is an annoyance, not a hazard,
    and the fix belongs where refusal paths multiply.

C3. This amendment does not amend `DEC-20260820-01` clause 3, does not change the v0 scope of
    `DEC-20261017-04`, and does not authorise any N2–N6 work by itself.

---

Filed by the Founder, Michael Daley, on 2026-10-19.
Drafted by `cos-orchestrator` from the Founder's ruling of the same date.
