#!/usr/bin/env bun
// packages/founder-act/src/main.ts
// Bin bootstrap for `mad-founder-act`. Implementation lives in src/cli.ts
// (runCli). Exit codes: 0 ok, 1 verify failed, 2 usage/tooling error.

import { runCli } from "./cli";

if (import.meta.main) {
  process.exit(await runCli(process.argv.slice(2)));
}
