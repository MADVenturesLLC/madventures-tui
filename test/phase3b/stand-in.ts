import { appendFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";

// Installed as a script in a private bin directory by the offline scenarios.
if (import.meta.main) {
  const executable = process.argv[1]!.replace(/\.ts$/, "");
  const root = dirname(dirname(executable));
  process.chdir(join(root, "work"));
  process.on("SIGTERM", () => process.exit(0));
  const claude = basename(executable) === "madbridge-claude-v5";
  const surface = claude ? "claude-code" : "madv-surface";
  const record = (s: string) => appendFileSync(join(root, "trace"), surface + " " + s + "\n");
  const emit = (...events: unknown[]) => writeFileSync(1, events.map(e => JSON.stringify(e) + "\n").join(""));
  const mode = readFileSync(join(root, "scenario"), "utf8");
  const model = process.argv[process.argv.indexOf("--model") + 1];
  const stamp = { session_id: "synthetic-wire", ts: "2026-11-23T00:00:00.000Z" };
  const identity = { provider: "minimax", profile: "minimax", endpoint_host: "api.minimax.io" };
  const init = claude ? { ...stamp, type: "system", subtype: "init", model, claude_code_version: "2.1.325" }
    : { ...stamp, ...identity, type: "system", subtype: "init", surface, surface_version: "0.1.2", requested_model: model, tools: [] };
  const response = { ...stamp, ...identity, type: "model_response", response_model: model,
    response_id: "synthetic-response", response_independence_domain: "minimax", tls_verified_host: "api.minimax.io" };
  const assistant = claude ? { ...stamp, type: "assistant", message: { id: "offline-response", model, content: [{ type: "text", text: model }] } }
    : { ...stamp, type: "assistant", response_model: model };
  const result = { ...stamp, type: "result", subtype: "success", is_error: false, num_turns: 1,
    modelUsage: { [model ?? "offline"]: { canonicalModel: model, provider: "firstParty" } } };
  const prompt = "Reply with your model identifier and nothing else.";
  if (process.argv.includes("auth")) {
    record("auth probe");
    emit(claude ? { loggedIn: true, authMethod: "claude.ai", apiProvider: "firstParty", subscriptionType: "max" }
      : { loggedIn: true, authMethod: "plan_key", profile: "minimax", provider: "minimax", endpointHost: "api.minimax.io",
          verified: true, verifyMethod: "read_only_endpoint" });
  } else if (!process.stdin.isTTY) {
    const input = JSON.parse(readFileSync(0, "utf8"));
    if (input.message.content !== (claude ? "Report session initialization." : prompt) || input.no_tools !== undefined) process.exit(2);
    record("identity probe");
    if (claude) emit(init); else emit(init, response, assistant, result);
  } else {
    record("launch");
    let tail = "", count = 0;
    process.stdin.setEncoding("utf8");
    function accept(chunk: string) {
      tail += chunk;
      let end: number;
      while ((end = tail.indexOf("\n")) >= 0) {
        const frame = JSON.parse(tail.slice(0, end));
        tail = tail.slice(end + 1);
        count++;
        if (count > 1) { record("extra write"); continue; }
        if (frame.message.content !== prompt || (claude ? frame.no_tools !== undefined : frame.no_tools !== true)) process.exit(3);
        record(claude ? "attestation write" : "attestation write no_tools=true");
        if (mode === "cancel" && claude) continue;
        if (mode === "attestation" && claude) { emit({ ...init, model: "wrong-synthetic-model" }); continue; }
        if (claude) emit(init, assistant, result); else emit(init, response, assistant, result);
        record("result success");
        if ((mode === "fallback" && claude) || (mode === "madv-auth" && !claude)) {
          const timer = setInterval(() => {
            if (!existsSync(join(root, "release-monitor"))) return;
            clearInterval(timer);
            const subtype = claude ? "model_refusal_fallback" : "auth_failed";
            record(subtype);
            emit({ ...stamp, type: "system", subtype });
          }, 5);
        }
      }
    }
    process.stdin.on("data", accept);
    process.stdin.resume();
  }
}
