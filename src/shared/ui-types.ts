// shared/ui-types.ts
// Types shared between TUI components — kept separate from domain types
// so the broker/permission layer never imports UI concepts.

export type FocusTarget = "claude" | "antigravity" | "governance" | "events";
