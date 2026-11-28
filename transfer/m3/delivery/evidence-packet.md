# Phase 3B M3 offline evidence

DEC-20261127-01 B20. The script `scripts/phase3b/m3-evidence.tsx` produced six source transcripts outside the repository. Its SHA-256 is caa2f176190f15777296c51052574113c15c4652e727246087e1f5093dcb14e8. Run 475 used the pinned Bun runtime after load wait 474. The transcript manifest SHA-256 is 7ac98c8586885f90346b8f6f57b0dae3bd7150e21a64c9bf8d2b419fd533aa8d.

## Ordered output — offline

Source `ordered-frames.jsonl` · SHA-256 95fc7b003e4c0f7f37d49cfe4059912c29da8f65d743f34711e5b3090b173e08. The real PTY host ran transport-stand-in.ts for each execution. The first frame follows handover.

| Surface | Session | Execution | Sequence | Bytes in decimal |
| --- | --- | --- | --- | --- |
| claude-code | offline-transport | builder | 1 | 32 9 |
| claude-code | offline-transport | builder | 2 | 32 32 9 |
| madv-surface | offline-transport | reviewer | 1 | 32 9 |
| madv-surface | offline-transport | reviewer | 2 | 32 32 9 |

## Host acknowledgement and child receipt — offline

Source `transport.jsonl` · SHA-256 88074b94589e5a8e4f02315dee6b39415b47b67453dff34700f094df08261a32. The transport stand-in recorded bytes and the dimensions of its own terminal. The observer stopped and resumed only its spawned host.

- claude-code received 72 bytes and dimensions 73 × 19. Input and resize each registered a wait before the write and completed after the host resumed. Decoded child bytes, followed by LF: `{"type":"user","message":{"role":"user","content":"offline transport"}}`.
- madv-surface received 72 bytes and dimensions 73 × 19. Input and resize each registered a wait before the write and completed after the host resumed. Decoded child bytes, followed by LF: `{"type":"user","message":{"role":"user","content":"offline transport"}}`.

## Submitted line through App — offline

Source `usable-input.jsonl` · SHA-256 0652a2392cd280b7a9cad4f7a25a250bec24442cb1c2ae9aa0da32f03a30a0fb. The focused pane submitted the line proof. The controlled transport stand-in replied through the production dispatch and output path. Excerpts use the rendered field, with border padding removed.

| Active writer | Focused surface | Input requests | Focused / other child receipts | Rendered excerpt |
| --- | --- | --- | --- | --- |
| claude-code | claude-code | 1 | 1 / 0 | `"offlineReply":"proof"` |
| claude-code | madv-surface | 1 | 0 / 0 | `UNAUTHORIZED` |
| madv-surface | madv-surface | 1 | 1 / 0 | `"offlineReply":"proof"` |
| madv-surface | claude-code | 1 | 0 / 0 | `UNAUTHORIZED` |

## Pane retention — offline

Source `retention.jsonl` · SHA-256 5a7071c7cae02b652bb9eb055666f19a443c53b7d2a32bc1d89753d5d4647ad6. Recorded synthetic CRLF, LF, partial-line and single-line byte streams. Counts show the state at the limit and after the next addition.

| Limit | Point | Received frames | Received bytes | Retained frames | Retained bytes |
| --- | --- | --- | --- | --- | --- |
| lines | At limit | 10001 | 20003 | 10001 | 20003 |
| lines | After addition | 10002 | 20007 | 10000 | 20002 |
| bytes | At limit | 2 | 2097152 | 2 | 2097152 |
| bytes | After addition | 3 | 2097155 | 2 | 2097152 |

## Authority after stream end — offline

Source `ended-streams.jsonl` · SHA-256 e77adb00dfc5f961aed1bbe6a43e9fbabaae2f9dc45f870592b919b9cb280eba. The subscribe adapter read a scripted client with owned authority, writer builder and synthetic fencing token 17. Each stream produced an ended projection after its second read.

### Failed read

- status — `NOT CONNECTED | session active | writer STREAM ENDED | pending 0 | focus CLAUDE | ledger #0`
- compact — `NOCONN | S:active | W:STREAM ENDED | P:0 | F:CLAUDE | L:#0`
- governance — `Writer / Token / Ownership: STREAM ENDED`
- claude — `CLAUDE CODE | FOCUSED | STREAM ENDED | builder | builder-model`
- madv — `MADV-SURFACE | FOCUSED | STREAM ENDED | independent-reviewer | reviewer-model`
- claudeDock — `CLAUDE CODE | docked | STREAM ENDED | builder | builder-model | 0 buffered`
- madvDock — `MADV-SURFACE | docked | STREAM ENDED | independent-reviewer | reviewer-model | 0 buffered`

### Closed client

- status — `NOT CONNECTED | session closed | writer STREAM ENDED | pending 0 | focus CLAUDE | ledger #0`
- compact — `NOCONN | S:closed | W:STREAM ENDED | P:0 | F:CLAUDE | L:#0`
- governance — `Writer / Token / Ownership: STREAM ENDED`
- claude — `CLAUDE CODE | FOCUSED | STREAM ENDED | builder | builder-model`
- madv — `MADV-SURFACE | FOCUSED | STREAM ENDED | independent-reviewer | reviewer-model`
- claudeDock — `CLAUDE CODE | docked | STREAM ENDED | builder | builder-model | 0 buffered`
- madvDock — `MADV-SURFACE | docked | STREAM ENDED | independent-reviewer | reviewer-model | 0 buffered`


## Malformed host facts — offline

Source `malformed-frames.jsonl` · SHA-256 bf16c337ee4dfd0f4ba085d0ebe81b5442093b6f689d7fec300de9e9f78c732f. The real host drove transport-stand-in.ts. Each injection followed activation and a valid control frame. The decoder exceptions and monitor failure causes were observed directly. The madv-surface parser reason was identified at the executed catch site because its post-handover callback exposes only the cause.

| Surface | Fault | Decoder error | Monitor | Parser reason | Interruption | Client bytes |
| --- | --- | --- | --- | --- | --- | --- |
| claude-code | payload | MalformedFrameError: ready carries no payload | claude-code attestation_malformed | — | identity_mismatch | 32 9 |
| claude-code | unknown | MalformedFrameError: unknown fact tag 255 | claude-code attestation_malformed | — | identity_mismatch | 32 9 |
| madv-surface | payload | MalformedFrameError: ready carries no payload | madv-surface identity_mismatch | malformed_stream | identity_mismatch | 32 9 |
| madv-surface | unknown | MalformedFrameError: unknown fact tag 255 | madv-surface identity_mismatch | malformed_stream | identity_mismatch | 32 9 |

## Limitations

No frame of a real surface has yet been delivered. No real surface has yet received a line. All host exchanges above used disposable stand-ins. The byte injector accepts only the two complete invalid Phase 3A records and queues one at a clean decoder boundary.

The application package does not declare the source dependencies imported by relative path. The base includes supervisor source imports in `apps/madbridge/src/tui/live/composition.ts`, `apps/madbridge/src/tui/live/subscribe.ts` and `apps/madbridge/src/commands/export-evidence.ts`. Composition also imports `packages/adapter-madv-surface/src`. The M3 files below reference package sources by relative path.

- `apps/madbridge/src/tui/live/line-buffer.ts` — `packages/adapter-claude-code/src/live`, `packages/adapter-madv-surface/src/index`.
- `test/phase3b/dispatch-observation.ts` — `packages/adapter-claude-code/src/live`, `packages/adapter-madv-surface/src/index`, `packages/broker/src/pty-host-supervisor`.
- `test/phase3b/dispatch.test.ts` — `packages/broker/src/pty-host-supervisor`.
- `test/phase3b/line-input.test.tsx` — `packages/broker/src/client`.
- `test/phase3b/malformed-observation.ts` — `packages/adapter-madv-surface/src/live.ts`, `packages/broker/src/pty-host-protocol`, `packages/broker/src/pty-host-supervisor`, `packages/supervisor/src/index`.
- `test/phase3b/pacing-settlement.test.ts` — `packages/supervisor/src/index`, `packages/supervisor/src/snapshot-timer`.
- `test/phase3b/producer.test.ts` — `packages/broker/src/in-process-client`.
- `test/phase3b/transport.ts` — `packages/supervisor/src/index`.
- `test/phase3b/unbridged.ts` — `packages/supervisor/src/build`.
