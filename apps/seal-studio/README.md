# Seal Studio v0

`bun run seal-studio` → http://localhost:5183 — compose a FounderAct draft,
watch its integrity hash (`act_sha256`) settle live as you type, then seal it
through the two-step ritual (declare Founder + hold). Seals write only to
`.mad/founder-acts/` (gitignored), through the real `@mad/founder-act` core,
content-addressed like the CLI. Integrity hash only — never claims a
signature. Chat is not authorization; the sealed file is the act.
