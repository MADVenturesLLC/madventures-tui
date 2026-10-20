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
 * Unattended runs (an orchestrator driving a build with no human at the
 * terminal) must not borrow the Founder's authority. This approver grants, but
 * every event it writes says who really granted it, so a transcript can never
 * be mistaken for the Founder's approval.
 */
export function orchestratorApprover(by = "orchestrator(unattended)"): Approver {
  return async (req) => ({
    granted: true,
    by,
    reason: `unattended run — ${req.tool} granted by ${by}, not by the Founder`,
  });
}

/**
 * The first real run recorded `answered "]y"` and DENIED a command the Founder
 * had approved: a paste or an escape sequence left residue around the letter,
 * and an exact-match against "y" then read his yes as a no. A gate that turns a
 * human's approval into a refusal is a defect, not a safety property — so
 * normalise first: drop CSI sequences, bracketed-paste markers and anything
 * that is not a letter, then accept the whole word.
 *
 * Deliberately NOT fuzzy: the letters must be exactly "y" or "yes". `yess`,
 * `ny` and `ya` are refused, and the raw text is always recorded in the event so
 * a denial can be audited.
 */
export function normaliseApprovalAnswer(raw: string): { answer: string; residue: boolean } {
  // Terminal control sequences, then anything that is not A-Za-z.
  //
  // OSC is terminated by BEL *or* by ST ("ESC \") — the first version handled
  // only BEL, so `ESC ] 0 ; x ST y` kept its payload and could read as a
  // different answer than the human typed. Both terminators are handled now,
  // and an unterminated OSC is dropped to the end of the line rather than
  // leaving its body in the answer.
  const stripped = raw
    // OSC … BEL | OSC … ST
    .replace(/\u001b\][^\u0007\u001b]*(?:\u0007|\u001b\\)/g, "")
    // an OSC with no terminator: drop the rest
    .replace(/\u001b\].*$/g, "")
    // CSI (incl. bracketed paste markers)
    .replace(/\u001b\[[0-9;?]*[ -/]*[@-~]/g, "")
    // any remaining two-character escape
    .replace(/\u001b[@-Z\\-_]/g, "")
    .replace(/\u001b/g, "");
  const answer = stripped.toLowerCase().replace(/[^a-z]/g, "");
  return { answer, residue: answer !== raw.trim().toLowerCase() };
}

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

  // ONE interface for the life of the approver. Creating one per request looks
  // harmless until stdin is a pipe: the first interface consumes the buffered
  // lines and every later request sees EOF, which fails closed on a stream the
  // caller did answer. Answers are queued so a piped "y\ny\ny" works.
  const queue: string[] = [];
  const waiters: Array<(line: string) => void> = [];
  let closed = false;
  const rl = createInterface({ input, output, terminal: false });
  rl.on("line", (line) => {
    const waiter = waiters.shift();
    // The RAW line is what a human typed, and the audit trail records it. An
    // earlier version lowercased and trimmed here, so every reason string
    // claimed to quote the human and actually quoted a normalised copy.
    if (waiter === undefined) queue.push(line);
    else waiter(line);
  });
  rl.on("close", () => {
    closed = true;
    while (waiters.length > 0) {
      const w = waiters.shift();
      w?.("");
    }
  });

  const nextAnswer = (): Promise<string> => {
    const buffered = queue.shift();
    if (buffered !== undefined) return Promise.resolve(buffered);
    if (closed) return Promise.resolve("");
    return new Promise<string>((resolve) => waiters.push(resolve));
  };

  return async (req) => {
    output.write(
      `\n── approval required ─────────────────────────────\n` +
        `  tool:    ${sanitizeForDisplay(req.tool, 80)} (${req.kind})\n` +
        `  action:  ${sanitizeForDisplay(req.summary)}\n` +
        `  detail:  ${sanitizeForDisplay(req.detail)}\n` +
        `  approve? [y/N] `,
    );
    const raw = await nextAnswer();
    const { answer, residue } = normaliseApprovalAnswer(raw);
    const granted = AFFIRMATIVE.has(answer);
    const reason = granted
      ? residue
        ? `answered "${raw}" — read as "${answer}" (escape/paste residue ignored)`
        : undefined
      : answer === "" || raw === ""
        ? "no answer — refused (fails closed)"
        : `answered "${raw}"`;
    return {
      granted,
      by: "founder(terminal)",
      ...(reason === undefined ? {} : { reason }),
    };
  };
}

/**
 * N4: model output and tool summaries go to the terminal too. A delta carrying
 * ESC sequences can move the cursor, recolour text or erase the line the human
 * is reading; sanitise before writing, keeping only newline and tab.
 */
export function sanitizeStream(text: string): string {
  let out = "";
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 0;
    if (ch === "\n" || ch === "\t") {
      out += ch;
    } else if (code >= 0x20 && code <= 0x7e) {
      out += ch;
    } else if (code <= 0xff) {
      out += `\\x${code.toString(16).padStart(2, "0")}`;
    } else {
      out += `\\u${code.toString(16).padStart(4, "0")}`;
    }
  }
  return out;
}

/** Render the request as the single line that goes into the event stream. */
export function summarizeApproval(req: ApprovalRequest): string {
  return `${sanitizeForDisplay(req.tool, 80)}: ${sanitizeForDisplay(req.summary)}`;
}
