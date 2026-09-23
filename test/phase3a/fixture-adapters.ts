// test/phase3a/fixture-adapters.ts
// Task 33 (D3-A): the minimum byte-routing fake standing in for PtyManager
// in apps/madbridge/test/pty-focus.test.tsx. Exactly two methods; no
// process spawn; not named a PTY; registers no test itself.

export function createFakeByteRouter(): {
  write(id: string, bytes: Uint8Array): void;
  onData(id: string, cb: (b: Uint8Array) => void): void;
} {
  const receivers = new Map<string, (b: Uint8Array) => void>();

  return {
    write(id: string, bytes: Uint8Array): void {
      const cb = receivers.get(id);
      if (cb) cb(bytes);
    },
    onData(id: string, cb: (b: Uint8Array) => void): void {
      receivers.set(id, cb);
    },
  };
}
