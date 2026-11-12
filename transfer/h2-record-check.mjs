// The check of the Founder of DEC-20261108-03 Addendum 2 B4, as its Addenda 6 B1 and B3 and 10 B6
// and DEC-20261112-02 B2 and B5 read it, over the governed session records of one slice folder.
// Usage: bun h2-record-check.mjs selftest TYPESCRIPT_DIR FOLDER WORKDIR
//        bun h2-record-check.mjs check TYPESCRIPT_DIR FOLDER SESSIONS_DIR
// It prints file names, times, counts, tool names and turn settings, and never an argument,
// a command, an output or a message.
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from "node:fs";
import { join, basename } from "node:path";
import { createRequire } from "node:module";

const [mode, tsDir, FOLDER, DIR] = process.argv.slice(2);
const ts = createRequire(import.meta.url)(tsDir);
const NAMES = ["read_mcp_resource", "list_mcp_resource_templates", "list_mcp_resources", "view_image", "codex_tui", "spawn_agent"];
const NAME_RE = new RegExp(NAMES.join("|"), "g");
const BARE_RE = new RegExp("^[A-Za-z0-9_.$]*(" + NAMES.join("|") + ")[A-Za-z0-9_.$]*$");
const TOP_OK = new Set(["exec", "wait", "sleep", "request_user_input", "request_user_input_async"]);
const OPENAI_RE = /^(gpt-|o[0-9]|codex-)/;
// DEC-20261112-03 Addendum 1 B2: the one read-only turn the check passes, and only with no call in it.
const ALLOW = { record: "rollout-2026-11-12T11-37-48-01a1d09f-6162-7dd1-ad17-ac8ce4e01efe.jsonl", ts: "2026-11-12T21:56:35.893Z", model: "gpt-6.1-sol", effort: "xhigh" };
const K = ts.SyntaxKind;
const TEXT_KINDS = new Set([K.StringLiteral, K.NoSubstitutionTemplateLiteral, K.TemplateHead, K.TemplateMiddle, K.TemplateTail, K.RegularExpressionLiteral, K.JsxText]);

function parse(src) {
  const tries = [["cell.ts", ts.ScriptKind.TS, false], ["cell.js", ts.ScriptKind.JS, false], ["cell.ts", ts.ScriptKind.TS, true]];
  for (const [name, kind, wrap] of tries) {
    const text = wrap ? "(async () => {\n" + src + "\n})();\n" : src;
    const sf = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, kind);
    if ((sf.parseDiagnostics || []).length === 0) return { sf, text };
  }
  return null;
}

// Where an occurrence of a name lies: "text" (a string, template or regular-expression literal),
// "comment", "bare" (a literal that is nothing but a tool-like name), or a stop.
function place(sf, p) {
  let node = sf;
  for (;;) {
    const next = node.getChildren(sf).find(c => c.pos <= p && p < c.end);
    if (!next) break;
    node = next;
  }
  if (node.kind >= K.FirstJSDocNode && node.kind <= K.LastJSDocNode) return "comment";
  if (p < node.getStart(sf)) return "comment";
  if (TEXT_KINDS.has(node.kind)) return BARE_RE.test(String(node.text).trim()) ? "bare" : "text";
  if (node.kind === K.Identifier || node.kind === K.PrivateIdentifier) return "identifier";
  return "unplaced";
}

function analyseExec(src) {
  const parsed = parse(src);
  if (!parsed) return { stop: "an exec input that does not parse" };
  const { sf, text } = parsed;
  const callees = new Map();
  const walk = node => {
    if (node.kind === K.CallExpression) {
      const e = node.expression;
      let n = "(computed)";
      if (ts.isIdentifier(e)) n = e.text;
      else if (ts.isPropertyAccessExpression(e)) n = e.name.text;
      else if (ts.isElementAccessExpression(e) && ts.isStringLiteralLike(e.argumentExpression)) n = e.argumentExpression.text;
      callees.set(n, (callees.get(n) || 0) + 1);
    }
    ts.forEachChild(node, walk);
  };
  walk(sf);
  let textCount = 0;
  const stops = [];
  for (const m of text.matchAll(NAME_RE)) {
    const where = place(sf, m.index);
    if (where === "text" || where === "comment") textCount++;
    else stops.push(m[0] + " as " + (where === "bare" ? "a literal holding a tool name alone" : where === "identifier" ? "a name in code, a call or a reference" : "a token the check cannot place as text"));
  }
  return { callees, textCount, stops };
}

function isTopOk(p) {
  const ns = String(p.namespace || "");
  const name = String(p.name || "");
  const stripped = name.replace(/^(functions|clock)(\.|__)/, "");
  if (p.type !== "function_call" && p.type !== "custom_tool_call") return false;
  if (ns !== "" && ns !== "functions" && ns !== "clock") return false;
  if (/collaboration|codex_tui/.test(name)) return false;
  return TOP_OK.has(stripped);
}

// Checks one record already read as JSON lines. Returns printable lines and stop reasons.
function checkRecord(label, items) {
  const out = [], stops = [];
  const meta = items.find(x => x.type === "session_meta");
  if (!meta) return { out: [label + ": no session_meta"], stops: [label + ": no session_meta"], skip: false };
  const mp = meta.payload || {};
  out.push(label + ": started " + (mp.timestamp || meta.timestamp || "-") + ", cli_version " + mp.cli_version + ", folder " + mp.cwd);
  if (mp.cli_version !== "0.167.0") stops.push(label + ": cli_version " + mp.cli_version + ", not 0.167.0 (Addendum 10 B6)");
  const users = items.filter(x => x.type === "event_msg" && x.payload && x.payload.type === "user_message").length;
  out.push("  user messages: " + users);
  const events = new Map();
  for (const x of items) if (x.type === "event_msg" && x.payload) { const k = String(x.payload.type); events.set(k, (events.get(k) || 0) + 1); }
  out.push("  event types: " + ([...events].map(([k, v]) => v + " " + k).sort().join("; ") || "none"));
  for (const k of events.keys()) if (/mcp_tool_call|collab|spawn|image|web_search/.test(k)) stops.push(label + ": an event of type " + k + ", which may record a barred call");
  const turns = items.filter(x => x.type === "turn_context");
  const allCalls = items.filter(x => x.type === "response_item" && x.payload && /call$/.test(String(x.payload.type || "")));
  turns.forEach((t, ti) => {
    const p = t.payload || {};
    const sp = p.sandbox_policy && typeof p.sandbox_policy === "object" ? p.sandbox_policy : {};
    out.push("  turn " + (t.timestamp || "-") + " | model " + p.model + " | effort " + p.effort + " | approval " + p.approval_policy + " | approvals reviewer " + p.approvals_reviewer + " | sandbox " + sp.type + " | network access " + sp.network_access + " | folder " + p.cwd);
    if (p.approval_policy !== "on-request") stops.push(label + " turn " + t.timestamp + ": approval " + p.approval_policy);
    if (p.approvals_reviewer !== "user") stops.push(label + " turn " + t.timestamp + ": approvals reviewer " + p.approvals_reviewer);
    const sandboxOk = sp.type === "workspace-write" && sp.network_access === false;
    let allowed = false;
    if (!sandboxOk && label === ALLOW.record && t.timestamp === ALLOW.ts && sp.type === "read-only" && sp.network_access == null && p.model === ALLOW.model && p.effort === ALLOW.effort) {
      const end = ti + 1 < turns.length ? turns[ti + 1].timestamp : null;
      const inside = allCalls.filter(c => c.timestamp >= t.timestamp && (end === null || c.timestamp < end)).length;
      out.push("    the read-only turn of DEC-20261112-03 Addendum 1 A2; calls in it: " + inside);
      if (inside === 0) allowed = true;
      else stops.push(label + " turn " + t.timestamp + ": the read-only turn of DEC-20261112-03 Addendum 1 has " + inside + " calls in it");
    }
    if (!sandboxOk && !allowed) stops.push(label + " turn " + t.timestamp + ": sandbox " + sp.type + ", network access " + sp.network_access);
    if (p.cwd !== FOLDER) stops.push(label + " turn " + t.timestamp + ": folder " + p.cwd);
    if (!OPENAI_RE.test(String(p.model || ""))) stops.push(label + " turn " + t.timestamp + ": model " + p.model + " is not shown as a model made by OpenAI (DEC-20261112-02 B2 item 4)");
  });
  const calls = allCalls;
  if (calls.length > 0 && turns.length === 0) stops.push(label + ": calls but no turn record");
  const tally = new Map();
  const callees = new Map();
  let execs = 0, textTotal = 0;
  for (const c of calls) {
    const p = c.payload;
    const key = p.type + " " + (p.namespace ? p.namespace + "." : "") + p.name;
    tally.set(key, (tally.get(key) || 0) + 1);
    if (!isTopOk(p)) { stops.push(label + " " + c.timestamp + ": a barred top-level call, " + key); continue; }
    if (String(p.name).replace(/^(functions)(\.|__)/, "") === "exec") {
      if (p.type !== "custom_tool_call" || typeof p.input !== "string") { stops.push(label + " " + c.timestamp + ": an exec call of a shape the check does not know"); continue; }
      execs++;
      const a = analyseExec(p.input);
      if (a.stop) { stops.push(label + " " + c.timestamp + ": " + a.stop); continue; }
      textTotal += a.textCount;
      for (const [n, v] of a.callees) callees.set(n, (callees.get(n) || 0) + v);
      for (const s of a.stops) stops.push(label + " " + c.timestamp + ": inside exec, " + s);
    }
  }
  out.push("  top-level calls: " + ([...tally].map(([k, v]) => v + " " + k).sort().join("; ") || "none"));
  out.push("  exec calls: " + execs + "; names of Addendum 2 B4 placed as text inside exec: " + textTotal);
  out.push("  calls inside exec, by called name: " + ([...callees].map(([k, v]) => v + " " + k).sort().join("; ") || "none"));
  if (execs > 0 && !callees.has("exec_command")) stops.push(label + ": the check recognized no call of exec_command inside exec; it may not read this record format, so send this output to the drafting assistant");
  return { out, stops, skip: false };
}

function readItems(path) {
  return readFileSync(path, "utf8").split("\n").filter(l => l.trim() !== "").map((l, i) => {
    try { return JSON.parse(l); } catch { throw new Error(basename(path) + " line " + (i + 1) + " is not JSON"); }
  });
}

function listRecords(dir) {
  const found = [];
  const go = d => { for (const e of readdirSync(d).sort()) { const f = join(d, e); if (statSync(f).isDirectory()) go(f); else if (/^rollout-.*\.jsonl$/.test(e)) found.push(f); } };
  go(dir);
  return found;
}

// Synthetic records for the self-test of Addendum 6 B3 and DEC-20261112-02 B5.
function synth(cells, opts = {}) {
  const t0 = "2026-11-12T20:00:00.000Z";
  const items = [
    { timestamp: t0, type: "session_meta", payload: { timestamp: t0, cwd: FOLDER, cli_version: opts.cli || "0.167.0", originator: "codex-tui" } },
    { timestamp: t0, type: "event_msg", payload: { type: "user_message" } },
    { timestamp: t0, type: "turn_context", payload: Object.assign({ cwd: FOLDER, model: "gpt-6.1-sol", effort: "xhigh", approval_policy: "on-request", approvals_reviewer: "user", sandbox_policy: { type: "workspace-write", network_access: false } }, opts.turn || {}) },
  ];
  let i = 0;
  for (const c of cells) {
    i++;
    const ts0 = "2026-11-12T20:00:" + String(i).padStart(2, "0") + ".000Z";
    if (typeof c === "string") items.push({ timestamp: ts0, type: "response_item", payload: { type: "custom_tool_call", name: "exec", input: c } });
    else items.push({ timestamp: ts0, type: "response_item", payload: Object.assign({ type: "function_call", arguments: "{}" }, c) });
  }
  return items;
}

const CALL = "await tools.exec_command({ cmd: \"pwd\" });\n";
function selftest() {
  const cases = [];
  // Text that names each tool: in a double-quoted string, a template literal, a line comment,
  // a block comment, a JSDoc comment and a regular expression, beside real calls of allowed tools.
  const textCell = CALL + NAMES.map(n => "// note: " + n + " is not called\n/* " + n + " stays text */\n/** " + n + " */\nawait tools.exec_command({ cmd: \"printf %s \\\"the tool " + n + " is barred\\\"\" });\nconst s" + n.length + " = `listing " + n + " and mcp__" + n + " here`;\nconst r" + n.length + " = /" + n + " x/;\n").join("") + "await tools.write_stdin({ session_id: 1, chars: \"\" });\n";
  cases.push(["text naming each tool passes", synth([textCell, { name: "wait" }, { namespace: "clock", name: "sleep" }, { name: "request_user_input" }]), true]);
  cases.push(["a benign event passes", synth([CALL]).concat([{ timestamp: "2026-11-12T20:01:00.000Z", type: "event_msg", payload: { type: "exec_command_begin" } }]), true]);
  cases.push(["an event of an MCP tool call", synth([CALL]).concat([{ timestamp: "2026-11-12T20:01:00.000Z", type: "event_msg", payload: { type: "mcp_tool_call_begin" } }]), false]);
  cases.push(["an event of a collaboration agent", synth([CALL]).concat([{ timestamp: "2026-11-12T20:01:00.000Z", type: "event_msg", payload: { type: "collab_agent_spawn_begin" } }]), false]);
  cases.push(["a template with an expression passes", synth([CALL + "const x = 1;\nconst t = `a ${x} view_image b ${x + 1} spawn_agent c`;\n"]), true]);
  for (const n of NAMES) {
    const called = n === "codex_tui" ? "mcp__codex_tui" : n;
    const forms = n === "codex_tui"
      ? [CALL + "await tools.mcp__codex_tui.anything({});\n", CALL + "await mcp__codex_tui__anything({});\n", CALL + "await tools[\"mcp__codex_tui\"].anything({});\n", CALL + "await tools.call(\"mcp__codex_tui__anything\", {});\n", CALL + "const ns = tools.mcp__codex_tui;\nawait ns.anything({});\n"]
      : [CALL + "await tools." + n + "({});\n", CALL + "await " + n + "({});\n", CALL + "await tools[\"" + n + "\"]({});\n", CALL + "await tools.call(\"" + n + "\", {});\n", CALL + "const f = tools." + n + ";\nawait f({});\n"];
    forms.forEach((f, j) => cases.push(["a call of " + called + " inside exec, form " + (j + 1), synth([f]), false]));
    cases.push(["a top-level call of " + called, synth([n === "codex_tui" ? { namespace: "mcp__codex_tui", name: "anything" } : { name: n }]), false]);
    cases.push(["a top-level call of " + called + " by a joined name", synth([n === "codex_tui" ? { name: "mcp__codex_tui__anything" } : { name: "functions." + n }]), false]);
  }
  cases.push(["a top-level call in collaboration", synth([{ namespace: "collaboration", name: "send_message" }]), false]);
  cases.push(["a top-level tool outside the allowed five", synth([{ name: "web_search" }]), false]);
  cases.push(["an exec input that does not parse", synth([CALL + "await tools.exec_command({ cmd: \"x\" ;\n"]), false]);
  cases.push(["cli_version 0.167.2", synth([CALL], { cli: "0.167.2" }), false]);
  cases.push(["approval never", synth([CALL], { turn: { approval_policy: "never" } }), false]);
  cases.push(["approvals reviewer other than user", synth([CALL], { turn: { approvals_reviewer: "auto" } }), false]);
  cases.push(["sandbox read-only", synth([CALL], { turn: { sandbox_policy: { type: "read-only" } } }), false]);
  cases.push(["network access on", synth([CALL], { turn: { sandbox_policy: { type: "workspace-write", network_access: true } } }), false]);
  cases.push(["another folder", synth([CALL], { turn: { cwd: "/tmp/elsewhere" } }), false]);
  cases.push(["a model not shown as made by OpenAI", synth([CALL], { turn: { model: "claude-opus" } }), false]);
  cases.push(["exec without a recognized exec_command call", synth(["const a = 1;\n"]), false]);
  const turnAt = (ts, sandbox, extra) => ({ timestamp: ts, type: "turn_context", payload: Object.assign({ cwd: FOLDER, model: "gpt-6.1-sol", effort: "xhigh", approval_policy: "on-request", approvals_reviewer: "user", sandbox_policy: sandbox }, extra || {}) });
  const execAt = ts => ({ timestamp: ts, type: "response_item", payload: { type: "custom_tool_call", name: "exec", input: CALL } });
  const meta = { timestamp: "2026-11-12T16:38:04.887Z", type: "session_meta", payload: { timestamp: "2026-11-12T16:38:04.887Z", cwd: FOLDER, cli_version: "0.167.0" } };
  const ww = { type: "workspace-write", network_access: false };
  const ro = { type: "read-only" };
  const resumed = [meta, turnAt("2026-11-12T19:05:33.065Z", ww), execAt("2026-11-12T21:56:07.555Z"), turnAt(ALLOW.ts, ro)];
  cases.push(["the read-only turn of Addendum 1 A2 with no call passes", resumed, true, ALLOW.record]);
  cases.push(["that turn, then a workspace-write turn with calls, passes", resumed.concat([turnAt("2026-11-12T23:00:00.000Z", ww), execAt("2026-11-12T23:00:01.000Z")]), true, ALLOW.record]);
  cases.push(["a call inside that turn", resumed.concat([execAt("2026-11-12T21:56:40.000Z")]), false, ALLOW.record]);
  cases.push(["a call inside that turn before a later turn", resumed.concat([execAt("2026-11-12T21:56:40.000Z"), turnAt("2026-11-12T23:00:00.000Z", ww)]), false, ALLOW.record]);
  cases.push(["a read-only turn at another time", [meta, turnAt("2026-11-12T19:05:33.065Z", ww), execAt("2026-11-12T21:56:07.555Z"), turnAt("2026-11-12T21:56:35.894Z", ro)], false, ALLOW.record]);
  cases.push(["that turn in another record", resumed, false, "rollout-2026-11-12T11-37-48-other.jsonl"]);
  cases.push(["that turn with network access on", [meta, turnAt("2026-11-12T19:05:33.065Z", ww), execAt("2026-11-12T21:56:07.555Z"), turnAt(ALLOW.ts, { type: "read-only", network_access: true })], false, ALLOW.record]);
  cases.push(["that turn with another approval", [meta, turnAt("2026-11-12T19:05:33.065Z", ww), execAt("2026-11-12T21:56:07.555Z"), turnAt(ALLOW.ts, ro, { approval_policy: "never" })], false, ALLOW.record]);
  let failed = 0;
  cases.forEach(([name, items, shouldPass, fileName], idx) => {
    const sub = join(DIR, "case-" + String(idx).padStart(2, "0"));
    mkdirSync(sub, { recursive: true });
    const path = join(sub, fileName || "rollout-selftest-" + String(idx).padStart(2, "0") + ".jsonl");
    writeFileSync(path, items.map(x => JSON.stringify(x)).join("\n") + "\n");
    const r = checkRecord(basename(path), readItems(path));
    const passed = r.stops.length === 0;
    const ok = passed === shouldPass;
    if (!ok) failed++;
    console.log((ok ? "as expected" : "NOT AS EXPECTED") + " | " + (passed ? "passes" : "stops ") + " | " + name + (passed ? "" : " | first reason: " + r.stops[0].replace(/^rollout-[^ ]*\.jsonl ?/, "")));
  });
  console.log("self-test cases: " + cases.length + "; not as expected: " + failed);
  if (failed > 0) { console.log("SELFTEST_FAILED"); process.exit(1); }
  console.log("SELFTEST_OK");
}

function check() {
  const records = [];
  for (const f of listRecords(DIR)) {
    const items = readItems(f);
    const meta = items.find(x => x.type === "session_meta");
    if (meta && meta.payload && meta.payload.cwd === FOLDER) records.push([f, items]);
  }
  console.log("records whose starting folder is " + FOLDER + ": " + records.length);
  if (records.length === 0) { console.log("CHECK_STOP: no record"); process.exit(1); }
  const stops = [];
  for (const [f, items] of records) {
    const r = checkRecord(basename(f), items);
    r.out.forEach(l => console.log(l));
    stops.push(...r.stops);
  }
  if (stops.length > 0) { stops.forEach(s => console.log("STOP REASON: " + s)); console.log("CHECK_STOP"); process.exit(1); }
  console.log("CHECK_OK");
}

if (mode === "selftest") { mkdirSync(DIR, { recursive: true }); selftest(); }
else if (mode === "check") check();
else { console.log("usage: selftest|check TYPESCRIPT_DIR FOLDER DIR"); process.exit(2); }
