// apps/madv-agent/src/approval.tsx
// The approval gate. Every tool call that `needsApproval` is put to a human
// before it runs, one invocation at a time — there is no "always allow" in N3
// (design §5), and a denial is a recorded event, not a silent skip.
//
// This file is the SEAM, not the pane. The gate is enforced here and tested
// headlessly; the interactive dialog that plugs into the TUI is N4's work
// (`src/tui/**` is outside this stage's closed file list). The terminal
// approver below is what the CLI path uses, and it is a real approver: it
// blocks, it reads the answer, and it refuses on anything that is not y/yes.

import { createInterface } from "node:readline";

export interface ApprovalRequest {
  tool: string;
  kind: "read" | "write" | "execute";
  summary: string;
  detail: string;
}

export interface ApprovalDecision {
  granted: boolean;
  /** Who or what decided — recorded in the event stream. */
  by: string;
  /** Why, when denied. */
  reason?: string;
}

export type Approver = (req: ApprovalRequest) => Promise<ApprovalDecision>;

/** Approves everything. Tests only — never wire this into a product path. */
export function staticApprover(granted: boolean, by = "static(test)"): Approver {
  return async (req) => ({
    granted,
    by,
    ...(granted ? {} : { reason: "denied by static approver" }),
  });
}

/** Approves or denies in list order — lets a test script a conversation. */
export function scriptedApprover(answers: boolean[], by = "scripted(test)"): Approver {
  let i = 0;
  return async (req) => {
    const granted = answers[i++] ?? false;
    return { granted, by, ...(granted ? {} : { reason: `denied (${req.tool})` }) };
  };
}

const AFFIRMATIVE = new Set(["y", "yes"]);

/**
 * B4: a tool argument is attacker-influenced text. Control characters in it
 * (newlines, carriage returns, escapes) can repaint the approval prompt and
 * show the human something other than the action that will run. Sanitise
 * before display: keep printable ASCII, escape everything else and cap it.
 */
export function sanitizeForDisplay(text: string, limit = 400): string {
  // R3: allow-list printable ASCII. Escaping "control characters" is not enough:
  // bidi overrides (U+202E), line/paragraph separators (U+2028/9), zero-width
  // joiners and other format characters can reorder or hide the text of a
  // consent prompt without being control codes. Anything outside 0x20–0x7E is
  // escaped, so the prompt can only ever show what the action contains.
  let out = "";
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 0;
    if (code >= 0x20 && code <= 0x7e) {
      out += ch;
    } else if (code <= 0xff) {
      out += `\\x${code.toString(16).padStart(2, "0")}`;
    } else {
      out += `\\u${code.toString(16).padStart(4, "0")}`;
    }
    if (out.length > limit) break;
  }
  return out.length > limit ? `${out.slice(0, limit)}…` : out;
}

/**
 * Ask on the terminal. Defaults to DENY on empty input, EOF, or anything that
 * is not an explicit yes — the gate fails closed.
 */
export function terminalApprover(opts?: {
  input?: NodeJS.ReadableStream;
  output?: NodeJS.WritableStream;
}): Approver {
  const input = opts?.input ?? process.stdin;
  const output = opts?.output ?? process.stdout;
  return async (req) => {
    output.write(
      `\n── approval required ─────────────────────────────\n` +
        `  tool:    ${sanitizeForDisplay(req.tool, 80)} (${req.kind})\n` +
        `  action:  ${sanitizeForDisplay(req.summary)}\n` +
        `  detail:  ${sanitizeForDisplay(req.detail)}\n` +
        `  approve? [y/N] `,
    );
    const rl = createInterface({ input, output, terminal: false });
    try {
      const answer = await new Promise<string>((resolve) => {
        let settled = false;
        rl.once("line", (line) => {
          settled = true;
          resolve(line.trim().toLowerCase());
        });
        rl.once("close", () => {
          if (!settled) resolve("");
        });
      });
      const granted = AFFIRMATIVE.has(answer);
      return {
        granted,
        by: "founder(terminal)",
        ...(granted ? {} : { reason: answer === "" ? "no answer — refused (fails closed)" : `answered "${answer}"` }),
      };
    } finally {
      rl.close();
    }
  };
}

/** Render the request as the single line that goes into the event stream. */
export function summarizeApproval(req: ApprovalRequest): string {
  return `${sanitizeForDisplay(req.tool, 80)}: ${sanitizeForDisplay(req.summary)}`;
}
