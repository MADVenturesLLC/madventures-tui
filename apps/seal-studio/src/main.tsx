// apps/seal-studio/src/main.tsx
import { createRoot } from "react-dom/client";

import { App } from "./App";
import "./tokens.css";

const rootEl = document.getElementById("root");
if (rootEl === null) throw new Error("#root missing from index.html");
createRoot(rootEl).render(<App />);
