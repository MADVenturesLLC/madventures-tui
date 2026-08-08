// src/index.tsx — TUI entry point
import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { App } from "./tui/App";

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
