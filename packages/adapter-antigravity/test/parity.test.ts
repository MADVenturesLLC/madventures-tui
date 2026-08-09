// packages/adapter-antigravity/test/parity.test.ts
import { runAdapterParity, makeFakeShell, type FakeShell } from "../../../test/adapter-parity.shared";
import { AntigravityAdapter } from "../src/adapter";

function factory(shell: FakeShell): import("../../../test/adapter-parity.shared").AdapterV1 {
  return new AntigravityAdapter(shell as any);
}

runAdapterParity("antigravity", factory);
