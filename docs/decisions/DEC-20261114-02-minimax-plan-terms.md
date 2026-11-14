FOUNDER-ACT-20261114-MINIMAX-PLAN-TERMS: whether governed sessions fit the MiniMax M Plan, and the limits they keep

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `cde513b79db1b236cce7e0f5cffecbe772e7b653` (the merge of pull request 239)
> **Governs:** Phase 3B plan §5 item 2, as `DEC-20261108-01` B6 places it
> **Read with:** `DEC-20261108-01` B4, B5 and B6; Phase 3B design §1.1, §1.2, §1.3 and §2.6; Phase 3B plan §3 M0 and §5 items 1, 2 and 12; `DEC-20261114-01`; `DEC-20261015-05` B3; `DEC-20261031-01`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What leaves this to me.** `DEC-20261108-01` B6 has me rule whether governed sessions fit the MiniMax M Plan's terms, from MiniMax's own pages, by an act that issues before M0's act, which cites it. Phase 3B plan §5 item 2 says the quotes of the void round-2 madv-surface review are not used. This is that act.

A2. **What a governed session is here.** madv-surface is admitted only through its `minimax` profile, with the model `MiniMax-M3.1-Flash` and the role `independent-reviewer` (`DEC-20261108-01` B4 and B5). After Phase 3B, `madbridge start` launches governed sessions in the foreground only; a background daemon and multi-session are left to Phase 3C (Phase 3B design §1.1 item 9 and §1.2). Every start makes live calls before any task runs: the auth-readiness probe and the attestation prompt (design §1.3 and §2.6 item 2). madv-surface sends its real User-Agent, does not present itself as another tool, and does not retry rate limits (its README at `d259cb5f9797101868391a0e4e81fc3a40ad3ea4`). M0's investigation and M7's runs make live calls that their acts name.

A3. **MiniMax's pages.** Read on 2026-11-14, on MiniMax's own site, by an agent of the drafting session:
1. `https://platform.minimax.io/docs/coding-plan/intro`, "Introduction": "is MiniMax’s subscription for individuals, giving you unified access to our flagship models"; "Get your M Plan API key, then connect models to Claude Code, Codex, Cursor, OpenCode, or other AI tools you already use."
2. `https://platform.minimax.io/docs/m-plan/faq.md`, "FAQ", under "What are the limits of M Plan? Is it suitable for production?": "M Plan is designed for individual, interactive developer use, with higher tiers offering higher usage limits." and "Pay-as-you-go is recommended for production use." The same page: "Any AI tool that supports the OpenAI-compatible or Anthropic-compatible protocol", "such as Claude Code, Codex, Cursor, OpenCode, Hermes Agent, and OpenClaw."; "Multi-step agent tasks send many requests in a row and call tools", "so they use more of your quota than a single question and answer."; "Keep it secure; do not share it or commit it to a code repository."; "Requests may be throttled when exceeded, typically recovering within about one minute."; "M Plan API keys are separate from standard pay-as-you-go API Keys and cannot be used interchangeably."
3. `https://platform.minimax.io/docs/m-plan/usage-rules.md`, "Usage": "For resources outside your plan or for production workloads, use a regular pay-as-you-go API Key."
4. `https://platform.minimax.io/docs/m-plan/other-tools.md`, "Other tools": "If your tool has no dedicated guide but accepts a custom Base URL and API Key, use the values below." It lists, among others, OpenHands and LangChain, with no restriction.
5. No page read restricts automated, programmatic or agentic use, or the clients that may use an M Plan key.
6. MiniMax's Terms of Service, at `https://platform.minimax.io/protocol/terms-of-service` and the other addresses tried, returned a title and no body text to the agent, so no clause of it is quoted here.

A4. **Facts for M0, not ruled here.** The plan's text model is M3.1 Flash, and `https://platform.minimax.io/docs/faq/models.md` lists `MiniMax-M3.1-Flash`. The Create Message reference describes the response field `model` as "Model ID used for this request", and the introduction says: "MiniMax-M3.1-Flash-Preview has been retired. Requests using the old name are now served by MiniMax-M3.1-Flash." No page read says whether an M Plan key may call `GET /anthropic/v1/models`.

A5. **The drafting assistant.** A Claude Code session had an agent read the pages of A3 and A4, and drafted this act. None of that is an independent review, and the ruling below is mine.

## Part B: Founder rulings

B1. **The ruling.** Governed sessions of Phase 3B fit the M Plan's terms, as A3 states them, within B2. They are use by one individual, me; they are interactive, foreground sessions I start and attend; and they are developer use, independent review of my own code. The plan admits any tool that speaks its Anthropic-compatible protocol and names agent tools among them, and no page read restricts automated or agentic use.

B2. **The limits.**
1. Only the key of my own M Plan subscription. It is not shared and never committed: it lives only in the environment madv-surface reads, and in no repository, log or evidence packet.
2. Only sessions I start in the foreground on my two certification hosts, for my own development, with madv-surface in the role of `DEC-20261108-01` B5; and the calls of M0's investigation and M7's runs, as their acts name them.
3. Never a pay-as-you-go key, and never a fallback to one. A throttle, an exhausted 5-hour or weekly window, or any other limit fails closed, with no retry.
4. No unattended, background, scheduled or multi-session use, no use for anyone else, no resale, and no use as a production service. Any of them, including what Phase 3B design §1.2 leaves to Phase 3C, needs a new ruling.
5. madv-surface keeps sending its own User-Agent and does not present itself as another tool.

B3. **The Terms of Service.** Before M0's act, I read MiniMax's Terms of Service myself, and M0's act records that I did, when, at which address, and that they hold no clause against B1 within B2. If they hold one, B1 yields: M0 does not start, and I rule again.

B4. **Change.** I read the pages of A3 again before M7's act and whenever MiniMax changes the M Plan. A change against B1 or B2 stops further governed use of madv-surface until I rule.

B5. **The probes.** This act does not rule the auth-readiness probe. Under Phase 3B plan §5 items 1 and 12, M0's act rules it and the identity probe, with A4.

B6. **What this does not open.** This act authorizes no live call and no purchase, starts no slice, and changes nothing in `DEC-20261108-01` B5. It changes no earlier ruling.

B7. **Filing.** One docs-only pull request, made by a Claude Code filing session under a filing prompt I sign, adds this act as `docs/decisions/DEC-20261114-02-minimax-plan-terms.md`, unchanged, alone or with `DEC-20261114-01`, before M0's act, and changes nothing else. It touches `docs/decisions/`, so under `AGENTS.md`, as `DEC-20261031-01` amended it, it merges only by an act of mine naming its exact head.

B8. **Counting.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This act takes effect when I sign it.

## Part D: Not authorized

- Any live provider call, any purchase or subscription, and any use of a pay-as-you-go key.
- Any change to code, tests, `bun.lock`, a manifest, the plan, the spec, `AGENTS.md` or an earlier decision record, except the filing of B7.
- Any slice, and any change to the `start` gate.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-14

Actor-Id: founder
