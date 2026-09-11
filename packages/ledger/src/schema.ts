// packages/ledger/src/schema.ts
// SQLite schema for the ledger.

export const GENESIS_HASH = "0".repeat(64);

export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS events (
  sequence INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id TEXT UNIQUE NOT NULL,
  event_json TEXT NOT NULL,
  previous_hash TEXT NOT NULL,
  event_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS chain_head (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  sequence INTEGER NOT NULL,
  hash TEXT NOT NULL
);

INSERT OR IGNORE INTO chain_head (id, sequence, hash) VALUES (1, 0, '${GENESIS_HASH}');

CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);
`;