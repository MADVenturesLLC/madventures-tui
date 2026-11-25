export interface WireFact { kind: string; bytes?: Uint8Array; code?: number | null; signal?: string | null }

// A silent stream stays parked until a fact arrives or the owner ends the
// stand-in, just as the production rollback settles the host's fact pump.
export function wireFacts() {
  const facts: WireFact[] = [];
  let wake: (() => void) | undefined;
  let ended = false;
  let opened = 0, closed = 0;
  const writes: string[] = [];
  const failures: string[] = [];
  const controller = new AbortController();
  function push(fact: WireFact) { facts.push(fact); wake?.(); }
  function end() { ended = true; wake?.(); }
  async function* stream() {
    opened++;
    try {
      for (;;) {
        const fact = facts.shift();
        if (fact) { yield fact; continue; }
        if (ended) return;
        await new Promise<void>(resolve => { wake = resolve; });
      }
    } finally { wake = undefined; closed++; }
  }
  return {
    signal: controller.signal, controller, writes, failures,
    get opened() { return opened; }, get closed() { return closed; },
    host: { handle: { facts: stream, send(frame: { kind: "input"; bytes: Uint8Array }) {
      if (!opened || closed) throw new Error("stand-in write without a live subscription");
      writes.push(new TextDecoder().decode(frame.bytes));
    } } },
    reportFailure(cause: string) { failures.push(cause); end(); },
    push, end,
    text(text: string) { push({ kind: "output", bytes: new TextEncoder().encode(text) }); },
    events(...events: unknown[]) { push({ kind: "output", bytes: new TextEncoder().encode(events.map(e => JSON.stringify(e) + "\n").join("")) }); },
  };
}
