# PLAN-OPEN-6 — Root Script Removal

**Status:** APPROVED (Founder, 2026-08-15)
**Plan reference:** `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` §1A
**Blocks:** Task 34 (script removal)
**Repository:** `MADVenturesLLC/madventures-tui`

---

## Decision

Remove the root `package.json` scripts `"broker"` and `"mcp"` — operator-reachable entry points into modules §9.10 quarantines.

The approved plan separately requires adding four new script names. This PLAN-OPEN-6 ruling authorizes removal of `broker` and `mcp`; it does not independently ratify command bodies, and it does not authorize any file outside the root `package.json`.

## Removed

```json
"broker": "bun run packages/broker/src/broker.ts",
"mcp": "bun run packages/broker/src/mcp-server.ts"
```

## Added

The following four script names are approved by the plan:

- `test:phase3a`
- `test:arch`
- `test:adversarial`
- `verify:phase3a`

Command bodies are not specified or ratified by this ruling and must be defined and reviewed during Task 34.
