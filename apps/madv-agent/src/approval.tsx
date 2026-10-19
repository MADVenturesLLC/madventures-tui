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
        `  tool:    ${req.tool} (${req.kind})\n` +
        `  action:  ${req.summary}\n` +
        `  detail:  ${req.detail}\n` +
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
  return `${req.tool}: ${req.summary}`;
}
