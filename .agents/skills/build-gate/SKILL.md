---
name: build-gate
description: >
  Use when preparing to push, open a PR, or declare a build/merge complete in
  the madventures-tui repo (or any repo with a matching profile). Runs a
  fail-closed, exact-SHA-locked gate set (typecheck, test, clean-tree,
  origin-identity) and validates that a review record matches the frozen target
  with an independent approver — blocks approval on drift, self-approval,
  skipped gates, or unresolved critical/major findings. Evolved from the
  discarded "Argus Hybrid" ChatGPT component; executes inside the build loop on
  CV5/Hermes/Codex, never in a separate chat surface.
---

# build-gate

OS-owned, fail-closed build gate for `madventures-tui`. Evolved from the
"Argus Hybrid" review pipeline after its ChatGPT Custom GPT component was
discarded (standing directive: ChatGPT is out of the AI loop). It runs as a
**coding skill inside the agents' real environment** so the exact-SHA drift
lock actually holds — it cannot drift the way a separate chat-surface GPT
would.

## What it guarantees

1. **Exact-SHA freeze lock** — locks the full 40-char commit SHA at review time.
   Any later review record whose `target_ref` differs is rejected (drift).
2. **Origin identity match** — HTTPS and SSH remotes normalize to
   `owner/repo` and must match the frozen identity.
3. **No self-approval** — the freeze actor cannot also be the approver.
   Independence is bound to `freeze.actor`, not a caller-supplied `record.actor`.
4. **Fail-closed** — a record is `valid` only when every check passes. There is
   no soft "warn but allow" path.
5. **Skipped-gate + unresolved-finding guards** — missing gate coverage or an
   unresolved Critical/Major finding blocks approval.

## Scripts (stdlib-only Python 3.11+, no dependencies)

- `scripts/freeze_target.py` — lock the target SHA, origin identity, profile
  hash. Emits a freeze manifest JSON.
- `scripts/run_gates.py` — verify the current clean checkout still matches the
  freeze, then execute every gate; exits 1 on execution-context drift or any
  failed/skipped gate.
- `scripts/validate_record.py` — fail-closed validation of a review record
  against a freeze manifest; exits 0 only when valid and `verdict=approved`.

## Library (`scripts/build_gate/`)

- `types.py` — dataclasses + `Severity`/`Verdict` enums.
- `engine.py` — `load_profile`, `discover_gates`, `run_all_gates`
  (honors `required_env` and `conditional_on` skips).
- `freeze.py` — `freeze_target`, `normalize_origin` (HTTPS + SSH).
- `validate.py` — `validate_record`, `load_and_validate`.

## Profiles (`profiles/`)

- `madventures-tui.json` — gates: clean-tree, `bunx tsc --noEmit`,
  `bun test` (conditional on typecheck), origin-identity assertion.

## Usage (inside the build loop)

```bash
# Write gate artifacts outside the repository so MTUI-CLEAN-TREE stays honest.
OUT="$(mktemp -d)"
SKILL=".agents/skills/build-gate"

# 1. Freeze the target (records the locked SHA + origin identity)
python3 "$SKILL/scripts/freeze_target.py" \
  --profile "$SKILL/profiles/madventures-tui.json" --cwd . \
  --actor hermes --model hy3 --provider nous --session-id S1 --surface cv5 \
  --out "$OUT/freeze.json"

# 2. Run the gates (fail-closed: requires the exact clean frozen checkout)
python3 "$SKILL/scripts/run_gates.py" \
  --profile "$SKILL/profiles/madventures-tui.json" --freeze "$OUT/freeze.json" \
  --cwd . --out "$OUT/results.json"

# 3. Assemble a review record from the gate results, then validate it.
#    Exit 0 only when the record is valid and verdict=approved.
python3 "$SKILL/scripts/validate_record.py" --record "$OUT/record.json" --freeze "$OUT/freeze.json"
```

## Promotion gate (Candidate → Controlling)

The skill ships as a **Candidate** reviewer per `validation/pressure-scenarios.md`.
It becomes *controlling* only after **3 consecutive blind rounds** in which no
forbidden approval occurs (drift, self-approval, unresolved critical/major, or
skipped-gate approval). Any forbidden approval resets the counter.

## Integration with the OS PR flow

Wire this into `github-pr-workflow` / `founder-os-contribution-workflow` as a
**pre-flight** step before opening a PR, and as the deterministic contract the
OS-owned Codex tester (TUI's `codex 5.6 sol`) binds its verdict to. The gate
logic changes only through the same PR governance as the code it protects — it
is never a floating global.

## Notes

- No API keys, credentials, or production DB URLs are read or emitted. The
  `bun test` gate uses the repo's existing test DB config; never point
  `TEST_DATABASE_URL` at production.
- This skill replaces the ChatGPT Custom GPT that Argus Hybrid proposed. There
  is no GPT component, by design.
