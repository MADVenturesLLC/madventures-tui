// Bound the rate of projection reads for each live TUI subscription.
export const SNAPSHOT_INTERVAL_MS = 100;

export function waitForSnapshotTick(signal: AbortSignal): Promise<void> {
  if (signal.aborted) return Promise.resolve();
  return new Promise(resolve => {
    function finish(): void {
      clearTimeout(timer);
      signal.removeEventListener("abort", finish);
      resolve();
    }
    const timer = setTimeout(finish, SNAPSHOT_INTERVAL_MS);
    signal.addEventListener("abort", finish, { once: true });
  });
}
