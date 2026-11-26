// Counts, in the exec inputs of the one governed record of FOLDER, the calls of eval, Function,
// load and store, the occurrences of the six names, and the inputs that do not parse, with whether
// the recorded output of each such input holds a SyntaxError. It prints times and counts only.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, basename } from "node:path";
import { createRequire } from "node:module";
const [tsDir, FOLDER, DIR] = process.argv.slice(2);
const ts = createRequire(import.meta.url)(tsDir);
const SIX = ["read_mcp_resource", "list_mcp_resource_templates", "list_mcp_resources", "view_image", "codex_tui", "spawn_agent"];
const files = [];
const go = d => { for (const e of readdirSync(d).sort()) { const f = join(d, e); if (statSync(f).isDirectory()) go(f); else if (/^rollout-.*\.jsonl$/.test(e)) files.push(f); } };
go(DIR);
const recs = [];
for (const f of files) {
  const items = readFileSync(f, "utf8").split("\n").filter(l => l.trim() !== "").map(l => JSON.parse(l));
  const m = items.find(x => x.type === "session_meta");
  if (m && m.payload && m.payload.cwd === FOLDER) recs.push([f, items]);
}
console.log("records: " + recs.length);
if (recs.length !== 1) { console.log("B4_STOP: not exactly one record"); process.exit(1); }
const [file, items] = recs[0];
console.log("record: " + basename(file));
const execs = items.filter(x => x.type === "response_item" && x.payload && x.payload.type === "custom_tool_call" && String(x.payload.name).replace(/^functions(\.|__)/, "") === "exec" && typeof x.payload.input === "string");
const outputs = new Map();
for (const x of items) if (x.type === "response_item" && x.payload && /output$/.test(String(x.payload.type || "")) && x.payload.call_id) outputs.set(x.payload.call_id, typeof x.payload.output === "string" ? x.payload.output : JSON.stringify(x.payload.output));
function parse(src) {
  const tries = [["cell.ts", ts.ScriptKind.TS, false], ["cell.js", ts.ScriptKind.JS, false], ["cell.ts", ts.ScriptKind.TS, true]];
  for (const [name, kind, wrap] of tries) {
    const text = wrap ? "(async () => {\n" + src + "\n})();\n" : src;
    const sf = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, kind);
    if ((sf.parseDiagnostics || []).length === 0) return sf;
  }
  return null;
}
const tot = { eval: 0, Function: 0, load: 0, store: 0, computed: 0 };
let six = 0, bad = 0;
const unparsed = [];
for (const x of execs) {
  const src = x.payload.input;
  let n6 = 0;
  for (const n of SIX) n6 += src.split(n).length - 1;
  six += n6;
  const sf = parse(src);
  if (!sf) { const out = outputs.get(x.payload.call_id) || ""; unparsed.push(x.timestamp); console.log("exec input that does not parse at " + x.timestamp + ": " + src.length + " characters; occurrences of the six names in it: " + n6 + "; its recorded output holds a SyntaxError: " + (out.includes("SyntaxError") ? "yes" : "no")); if (!out.includes("SyntaxError") || n6 > 0) bad++; continue; }
  const walk = n => {
    if (ts.isCallExpression(n) || ts.isNewExpression(n)) {
      const e = n.expression;
      let name = "(computed)";
      if (ts.isIdentifier(e)) name = e.text;
      else if (ts.isPropertyAccessExpression(e)) name = e.name.text;
      else if (ts.isElementAccessExpression(e) && ts.isStringLiteralLike(e.argumentExpression)) name = e.argumentExpression.text;
      if (name === "(computed)") tot.computed++;
      else if (Object.prototype.hasOwnProperty.call(tot, name)) tot[name]++;
    }
    ts.forEachChild(n, walk);
  };
  walk(sf);
}
console.log("exec inputs: " + execs.length + "; not parsed: " + unparsed.length + "; occurrences of the six names, as any substring, in all of them: " + six + "; calls of eval " + tot.eval + ", Function " + tot.Function + ", load " + tot.load + ", store " + tot.store + "; calls through a computed callee " + tot.computed);
if (six > 0 || unparsed.length > 1 || tot.eval + tot.Function + tot.load + tot.store > 0) bad++;
console.log(bad === 0 ? "B4_OK" : "B4_STOP");
process.exit(bad === 0 ? 0 : 1);
