// packages/tui-chaos/src/screen.ts
// Terminal screen model: raw PTY byte stream -> cell grid.
//
// Uses the public @xterm/headless Terminal as the ANSI/VT parser and buffer
// (no private OpenTUI internals, no renderer hacks). Produces:
//   - text grid (rows trimmed of trailing blank cells)
//   - color signature per row (fg/bg indices where set) — "colors if available"
//   - cursor position
//   - a stable sha256 over the normalized grid (golden-fixture compatible)
//
// xterm's write() parses asynchronously; snapshot() therefore goes through a
// write callback so a snapshot is always taken after the feed has been parsed.

import { Terminal } from "@xterm/headless";
import { createHash } from "node:crypto";

export interface ScreenSnapshot {
  cols: number;
  rows: number;
  /** One string per terminal row, trailing whitespace trimmed. */
  lines: string[];
  /** Per-row color signature (fg/bg codes), aligned with `lines`. */
  colorLines: string[];
  cursor: { x: number; y: number };
  /** sha256 of the normalized grid text (rows joined with \n). */
  hash: string;
  /** sha256 of grid text + color signatures. */
  colorHash: string;
}

export class Screen {
  private term: Terminal;
  private pending: Array<{ data: string; cb: () => void }> = [];
  private inFlight = 0;

  constructor(
    public cols: number,
    public rows: number,
  ) {
    this.term = new Terminal({
      cols,
      rows,
      allowProposedApi: true,
    });
  }

  /** Feed raw PTY output. The returned promise resolves after xterm parses it. */
  write(data: string): Promise<void> {
    // Count every submitted chunk as in-flight until ITS OWN parser callback
    // fires — overlapping write() calls each increment, each callback
    // decrements, so drained == zero in-flight/pending parser writes even
    // when several chunks are queued inside xterm at once.
    this.inFlight++;
    return new Promise<void>((resolve) => {
      this.term.write(data, () => {
        this.inFlight--;
        resolve();
      });
    });
  }

  /** Wait until every queued write has been parsed by the parser. */
  async flush(): Promise<void> {
    // Correctness does not depend on assumed xterm write serialization:
    // inFlight counts every write() still awaiting its own parser callback,
    // so flush() returns only when the last queued chunk has parsed.
    while (this.inFlight > 0) {
      await new Promise<void>((r) => setTimeout(r, 5));
    }
  }

  resize(cols: number, rows: number): void {
    this.cols = cols;
    this.rows = rows;
    this.term.resize(cols, rows);
  }

  snapshot(): ScreenSnapshot {
    const buf = this.term.buffer.active;
    const lines: string[] = [];
    const colorLines: string[] = [];
    for (let y = 0; y < this.rows; y++) {
      const line = buf.getLine(y);
      if (!line) {
        lines.push("");
        colorLines.push("");
        continue;
      }
      let text = line.translateToString(true);
      // Color signature: walk cells up to the last non-space char and record
      // fg/bg codes where they differ from the default. Kept compact so the
      // signature is diffable and storable in goldens.
      let lastNonSpace = -1;
      for (let x = 0; x < this.cols; x++) {
        const cell = line.getCell(x);
        if (!cell) break;
        const ch = cell.getChars();
        if (ch.length > 0 && ch !== " ") lastNonSpace = x;
      }
      const colorParts: string[] = [];
      for (let x = 0; x <= lastNonSpace; x++) {
        const cell = line.getCell(x);
        if (!cell) break;
        if (cell.isFgDefault() && cell.isBgDefault()) continue;
        const fg = cell.isFgDefault() ? "-" : cell.isFgRGB() ? `r${cell.getFgColor()}` : `p${cell.getFgColor()}`;
        const bg = cell.isBgDefault() ? "-" : cell.isBgRGB() ? `R${cell.getBgColor()}` : `P${cell.getBgColor()}`;
        colorParts.push(`${x}:${fg}/${bg}`);
      }
      lines.push(text);
      colorLines.push(colorParts.join(","));
    }
    const gridText = lines.join("\n");
    const colorText = colorLines.join("\n");
    return {
      cols: this.cols,
      rows: this.rows,
      lines,
      colorLines,
      cursor: { x: buf.cursorX, y: buf.cursorY },
      hash: createHash("sha256").update(gridText, "utf8").digest("hex"),
      colorHash: createHash("sha256").update(gridText + "\x00" + colorText, "utf8").digest("hex"),
    };
  }

  /** Full grid text — used for artifacts and golden fixtures. */
  gridText(): string {
    return this.snapshot().lines.join("\n");
  }
}

/**
 * Poll the screen until a predicate holds or the timeout elapses.
 * Returns true when the predicate held. Never throws — timeouts are the
 * caller's failure signal so the harness can capture the last grid state.
 */
export async function waitFor(
  screen: Screen,
  predicate: (snap: ScreenSnapshot) => boolean,
  timeoutMs: number,
  pollMs = 50,
): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    await screen.flush();
    if (predicate(screen.snapshot())) return true;
    if (Date.now() >= deadline) return false;
    await new Promise<void>((r) => setTimeout(r, pollMs));
  }
}
