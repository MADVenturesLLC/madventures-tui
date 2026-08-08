// packages/adapter-claude-code/test/parity.test.ts
import { runAdapterParity, makeFakeShell, type FakeShell } from "../../../test/adapter-parity.shared";
import { ClaudeCodeAdapter } from "../src/adapter";

function factory(shell: FakeShell): import("../../../test/adapter-parity.shared").AdapterV1 {
  return new ClaudeCodeAdapter(shell as any);
}

runAdapterParity("claude-code", factory);
