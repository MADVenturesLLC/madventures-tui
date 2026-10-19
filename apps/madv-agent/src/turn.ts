// apps/madv-agent/src/turn.ts
// One N1 turn became an N3 turn loop: user message event → streamed model call
// through the proxy → (tool calls: recorded, authorised at use time, approved,
// executed, recorded) → next call → assistant message event. Deltas are
// surfaced live through onDelta as they arrive.
//
// D4 (N1): a stream that fails mid-flight (malformed SSE frame, error status)
// is recorded as a stream_error event — never as a successful reply.
//
// N3: a tool call is recorded BEFORE it is authorised, the approval decision is
// recorded BEFORE it is acted on, and the result is recorded whether it ran,
// failed or was refused. A replay therefore shows refusals, not just the calls
// that happened to succeed.

import {
  EventWriter,
  readEvents,
  reconstructTranscript,
  type SessionEvent,
} from "./events";
import { streamChatCompletion, type StreamResult } from "./model-client";
import { ProxyRequestError } from "./proxy-error";
import { PolicyRefusal } from "./policy";
import { TOOL_PROTOCOL_PROMPT, parseToolCalls, toolByName, type ToolOutcome } from "./tools";
import type { Approver, ApprovalDecision, ApprovalRequest } from "./approval";

export interface TurnDeps {
  /** The proxy base URL — the only model endpoint the agent will call. */
  proxyUrl: string;
  /** Called live per delta, in arrival order (renders the stream). */
  onDelta?: (delta: string) => void;
  /** Project root. Tools are unavailable when this is not supplied. */
  projectDir?: string;
  /** The approval gate. When absent, every approval-needing call is REFUSED. */
  approver?: Approver;
  /** Called for each tool event so a UI can render it live. */
  onToolEvent?: (event: { type: string; tool: string; summary: string; granted?: boolean }) => void;
  fetchImpl?: (url: string, init?: RequestInit) => Promise<Response>;
  signal?: AbortSignal;
  /** Bound on model→tool→model rounds. Default 6. */
  maxRounds?: number;
}

export interface TurnResult extends StreamResult {
  userEvent: SessionEvent;
  assistantEvent: SessionEvent;
  /** How many tool calls were attempted (any outcome) in this turn. */
  toolCalls?: number;
}

/** Fail closed: with no approver wired, nothing that needs approval runs. */
const denyAllApprover: Approver = async (req: ApprovalRequest): Promise<ApprovalDecision> => ({
  granted: false,
  by: "no-approver",
  reason: `refused: no approver is configured, so ${req.tool} cannot be approved`,
});

function recordToolResult(
  writer: EventWriter,
  tool: string,
  outcome: ToolOutcome,
  status: "ok" | "denied" | "refused" | "error",
): void {
  writer.append("tool_result", {
    tool,
    status,
    ok: outcome.ok,
    summary: outcome.summary,
    output: outcome.output ?? "",
  });
}

/**
 * Run one user turn, including any tool rounds it triggers. The request history
 * is reconstructed from the session's events alone, so a resumed session and a
 * live one see the same conversation — refusals included.
 */
export async function runTurn(
  writer: EventWriter,
  userText: string,
  deps: TurnDeps,
): Promise<TurnResult> {
  const userEvent = writer.append("user_message", { content: userText });
  const maxRounds = deps.maxRounds ?? 6;
  const approver = deps.approver ?? denyAllApprover;
  let toolCalls = 0;
  let lastAssistant: SessionEvent | undefined;
  let lastStream: StreamResult | undefined;

  for (let round = 0; round < maxRounds; round++) {
    const history = reconstructTranscript(readEvents(writer.filePath));
    const messages = [
      { role: "system" as const, content: TOOL_PROTOCOL_PROMPT },
      ...history.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    const streamOpts: Parameters<typeof streamChatCompletion>[0] = {
      proxyUrl: deps.proxyUrl,
      messages,
    };
    if (deps.fetchImpl !== undefined) streamOpts.fetchImpl = deps.fetchImpl;
    if (deps.signal !== undefined) streamOpts.signal = deps.signal;

    let streamed = 0;
    let result: StreamResult;
    try {
      result = await streamChatCompletion({
        ...streamOpts,
        onDelta: (delta) => {
          streamed += delta.length;
          deps.onDelta?.(delta);
        },
      });
    } catch (err) {
      // D4: the failed turn is an error EVENT in the stream — a partial or
      // empty reply is never recorded as an assistant_message.
      if (err instanceof ProxyRequestError) {
        writer.append("stream_error", {
          reason: err.message.slice(0, 500),
          streamed_chars: streamed,
          recorded_as: "error",
        });
      }
      throw err;
    }

    const assistantEvent = writer.append("assistant_message", {
      content: result.content,
      model: result.model,
    });
    lastAssistant = assistantEvent;
    lastStream = result;

    const calls = parseToolCalls(result.content);
    if (calls.length === 0) {
      return { ...result, userEvent, assistantEvent, toolCalls };
    }

    for (const call of calls) {
      toolCalls += 1;
      writer.append("tool_call", { tool: call.tool, args: call.args });
      deps.onToolEvent?.({
        type: "tool_call",
        tool: call.tool,
        summary: JSON.stringify(call.args).slice(0, 200),
      });

      const def = toolByName(call.tool);
      if (def === undefined) {
        const outcome: ToolOutcome = { ok: false, summary: `refused: unknown tool ${call.tool}` };
        recordToolResult(writer, call.tool, outcome, "refused");
        deps.onToolEvent?.({ type: "tool_result", tool: call.tool, summary: outcome.summary });
        continue;
      }

      if (deps.projectDir === undefined) {
        const outcome: ToolOutcome = {
          ok: false,
          summary: "refused: this session has no project directory, so no tool can run",
        };
        recordToolResult(writer, call.tool, outcome, "refused");
        deps.onToolEvent?.({ type: "tool_result", tool: call.tool, summary: outcome.summary });
        continue;
      }

      if (def.needsApproval) {
        const req: ApprovalRequest = {
          tool: def.name,
          kind: def.kind,
          summary: def.describe(call.args),
          detail: JSON.stringify(call.args).slice(0, 800),
        };
        const decision = await approver(req);
        writer.append("approval", {
          tool: def.name,
          summary: req.summary,
          granted: decision.granted,
          by: decision.by,
          ...(decision.reason === undefined ? {} : { reason: decision.reason }),
        });
        deps.onToolEvent?.({
          type: "approval",
          tool: def.name,
          summary: req.summary,
          granted: decision.granted,
        });
        if (!decision.granted) {
          const outcome: ToolOutcome = {
            ok: false,
            summary: `denied by ${decision.by}: ${decision.reason ?? "no reason given"}`,
          };
          recordToolResult(writer, def.name, outcome, "denied");
          deps.onToolEvent?.({ type: "tool_result", tool: def.name, summary: outcome.summary });
          continue;
        }
      }

      try {
        const outcome = def.run(call.args, { projectDir: deps.projectDir });
        recordToolResult(writer, def.name, outcome, outcome.ok ? "ok" : "error");
        deps.onToolEvent?.({ type: "tool_result", tool: def.name, summary: outcome.summary });
      } catch (err) {
        const refused = err instanceof PolicyRefusal;
        const outcome: ToolOutcome = {
          ok: false,
          summary: refused
            ? (err as PolicyRefusal).reason
            : `error: ${err instanceof Error ? err.message : String(err)}`,
        };
        recordToolResult(writer, def.name, outcome, refused ? "refused" : "error");
        deps.onToolEvent?.({ type: "tool_result", tool: def.name, summary: outcome.summary });
      }
    }
  }

  // Round budget exhausted: the last assistant message stands, and the fact
  // that the loop stopped is recorded rather than hidden.
  writer.append("stream_error", {
    reason: `tool round budget exhausted (${maxRounds} rounds) — stopping`,
    recorded_as: "error",
  });
  if (lastAssistant === undefined || lastStream === undefined) {
    throw new Error("turn produced no assistant message");
  }
  return { ...lastStream, userEvent, assistantEvent: lastAssistant, toolCalls };
}
