import { afterEach, expect, test } from "bun:test";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { IDENTITY_PROBE_INPUT, runBoundedProbe as executeProbe, type ProbeRequest, type ProbeRuntime, type ProbeResult, parseIdentity, parseAuthReadiness } from "../src/attestation";

const roots:string[]=[];
const children: Bun.Subprocess[]=[];
const readiness: Promise<void>[]=[];
afterEach(async()=>{try{await Promise.all(readiness.splice(0));}finally{for(const p of children.splice(0)){try{p.kill("SIGKILL");}catch{}await p.exited;}for(const root of roots.splice(0))rmSync(root,{recursive:true,force:true});}});
function afterHandlerReady(req: ProbeRequest, abort: () => void): void {
  const pending = (async () => {
    const marker = join(dirname(req.executablePath), "handler-ready");
    const deadline = performance.now() + 1000;
    try {
      while (!existsSync(marker) && performance.now() < deadline) await Bun.sleep(1);
      expect(existsSync(marker)).toBe(true);
    } finally { abort(); }
  })();
  void pending.catch(() => {}); // afterEach reports readiness failures after cleanup.
  readiness.push(pending);
}
async function runBoundedProbe(req: ProbeRequest, rt: Partial<ProbeRuntime> = {}): Promise<ProbeResult> {
  const r=await executeProbe(req,{spawn:wrappedSpawn([]),...rt});
  expect(Object.keys(r).sort()).toEqual(["diagnostic","ok"]);
  expect(Object.keys(r.diagnostic).sort()).toEqual(["exitCode","primitive","result","signal","stderrBytes","stdoutBytes"]);
  expect(JSON.stringify(r)).not.toContain("RAW-PRIVATE-CANARY");
  return r;
}
const auth={loggedIn:true,authMethod:"claude.ai",apiProvider:"firstParty",subscriptionType:"max",email:"RAW-PRIVATE-CANARY",orgId:"RAW-PRIVATE-CANARY",orgName:"RAW-PRIVATE-CANARY"};
function request(source:string,kind:"identity"|"auth"="auth"):ProbeRequest {
  const root=mkdtempSync(join(tmpdir(),"task45-probe-"));roots.push(root);
  const executablePath=join(root,"fixture");writeFileSync(executablePath,`#!${process.execPath}\n${kind==="identity"?'process.on("SIGTERM",()=>process.exit(0));':""}${source}\n`,{mode:0o700});
  return {executablePath,arguments:[],environment:Object.freeze({}),signal:new AbortController().signal,stdin:kind==="identity"?IDENTITY_PROBE_INPUT:"",kind,model:"exact",supportedVersions:["2.1.296"]};
}
const passSource=`console.log(${JSON.stringify(JSON.stringify(auth))});`;
const idle="process.on('SIGTERM',()=>{}); require('node:fs').writeFileSync(new URL('./handler-ready',import.meta.url),'ready'); console.log('READY'); setInterval(()=>{},100);";
function wrappedSpawn(record:string[],delay=0):ProbeRuntime["spawn"] {
  return req=>{const p=Bun.spawn([req.executablePath,...req.arguments],{env:req.environment,stdin:new Blob([req.stdin]),stdout:"pipe",stderr:"pipe"});children.push(p);return {stdout:p.stdout,stderr:p.stderr,exited:p.exited.then(async code=>{if(delay)await Bun.sleep(delay);return code;}),kill:signal=>{record.push(signal);p.kill(signal as any);}};};
}
test("identity accepts an exact model and supported CLI version",async()=>{
  const req=request("console.log(JSON.stringify({type:'system',subtype:'init',model:'exact',claude_code_version:'2.1.296'}));","identity");
  const r=await runBoundedProbe(req);expect(r.ok).toBe(true);
});
test("identity rejects a model mismatch",async()=>{expect((await runBoundedProbe(request("console.log(JSON.stringify({type:'system',subtype:'init',model:'exact-alias',claude_code_version:'2.1.296'}));","identity"))).ok).toBe(false);});
test("identity rejects a missing system/init event",async()=>{expect((await runBoundedProbe(request("console.log(JSON.stringify({type:'result',model:'exact'}));","identity"))).ok).toBe(false);});
test("identity rejects an unsupported CLI version",async()=>{expect((await runBoundedProbe(request("console.log(JSON.stringify({type:'system',subtype:'init',model:'exact',claude_code_version:'2.1.233'}));","identity"))).ok).toBe(false);});
test("identity uses only the first system/init event and fixed stdin",async()=>{
  expect(parseIdentity('{"type":"system","subtype":"init","model":"wrong","claude_code_version":"2.1.296"}\n{"type":"system","subtype":"init","model":"exact","claude_code_version":"2.1.296"}',"exact",["2.1.296"])).toBe(false);
  const req=request(`const input=await Bun.stdin.text();if(input!==${JSON.stringify(IDENTITY_PROBE_INPUT)})process.exit(1);console.log(JSON.stringify({type:'system',subtype:'init',model:'exact',claude_code_version:'2.1.296'}));`,"identity");expect((await runBoundedProbe(req)).ok).toBe(true);
});
test("identity ends a continuing session through bounded cleanup",async()=>{
  const signals:string[]=[];
  const req=request("process.on('SIGTERM',()=>process.exit(0));console.log(JSON.stringify({type:'system',subtype:'init',model:'exact',claude_code_version:'2.1.296'}));setInterval(()=>{},100);","identity");
  expect((await runBoundedProbe(req,{spawn:wrappedSpawn(signals)})).ok).toBe(true);expect(signals).toEqual(["SIGTERM"]);
});
test("successful bounded execution",async()=>{expect((await runBoundedProbe(request(passSource))).ok).toBe(true);});
test("spawn failure is bounded and fail closed",async()=>{const req=request(passSource);rmSync(req.executablePath);expect((await runBoundedProbe(req)).ok).toBe(false);});
test("pre-spawn cancellation starts no child",async()=>{const req=request(passSource);const c=new AbortController();c.abort();req.signal=c.signal;let spawned=0;expect((await runBoundedProbe(req,{spawn:r=>{spawned++;return wrappedSpawn([])(r);}})).ok).toBe(false);expect(spawned).toBe(0);});
test("post-spawn cancellation reaps within the cleanup budget",async()=>{
  const req=request(idle);const c=new AbortController();req.signal=c.signal;const signals:string[]=[];let ended=false;
  const spawn:ProbeRuntime["spawn"]=r=>{const p=wrappedSpawn(signals)(r);afterHandlerReady(r,()=>c.abort());return {...p,exited:p.exited.then(code=>{ended=true;return code;})};};
  expect((await runBoundedProbe(req,{spawn})).ok).toBe(false);expect(signals).toEqual(["SIGTERM","SIGKILL"]);expect(ended).toBe(true);
});
test("signal termination fails closed",async()=>{expect((await runBoundedProbe(request("process.kill(process.pid,'SIGTERM');"))).ok).toBe(false);});
test("stdout overflow fails closed",async()=>{expect((await runBoundedProbe(request("process.stdout.write('x'.repeat(65537));"))).ok).toBe(false);});
test("stderr overflow fails closed",async()=>{expect((await runBoundedProbe(request(passSource+"process.stderr.write('x'.repeat(65537));"))).ok).toBe(false);});
test("exactly 65,536 bytes on either stream is permitted",async()=>{
  const output=JSON.stringify(auth);const source=`process.stdout.write(${JSON.stringify(output)}+' '.repeat(65536-${output.length}));process.stderr.write('x'.repeat(65536));`;
  const r=await runBoundedProbe(request(source));expect(r.ok).toBe(true);expect(r.diagnostic.stdoutBytes).toBe(65536);expect(r.diagnostic.stderrBytes).toBe(65536);
});
test("execution deadline includes normal reaping",async()=>{
  const req=request(passSource);let offset=0;
  const spawn:ProbeRuntime["spawn"]=r=>{const p=wrappedSpawn([])(r);return {...p,exited:p.exited.then(code=>{offset=5001;return code;})};};
  expect((await runBoundedProbe(req,{spawn,now:()=>performance.now()+offset})).ok).toBe(false);
});
test("timeout uses a monotonic clock and forced SIGKILL",async()=>{
  const req=request(idle);const signals:string[]=[];const old=Date.now;Date.now=()=>{throw new Error("wall clock forbidden");};
  try{const start=performance.now();expect((await runBoundedProbe(req,{spawn:wrappedSpawn(signals)})).ok).toBe(false);expect(performance.now()-start).toBeLessThan(6100);expect(signals).toEqual(["SIGTERM","SIGKILL"]);}finally{Date.now=old;}
},10000);
test("forced cleanup accounts for grace escalation and reaping",async()=>{
  const req=request(idle);const c=new AbortController();req.signal=c.signal;const times:number[]=[];const signals:string[]=[];
  const spawn:ProbeRuntime["spawn"]=r=>{const p=wrappedSpawn(signals)(r);afterHandlerReady(r,()=>c.abort());return {...p,kill:s=>{times.push(performance.now());p.kill(s);}};};
  const start=performance.now();expect((await runBoundedProbe(req,{spawn})).ok).toBe(false);expect(signals).toEqual(["SIGTERM","SIGKILL"]);expect(times[1]!-times[0]!).toBeLessThan(550);expect(times[1]!-times[0]!).toBeGreaterThan(450);expect(performance.now()-start).toBeLessThan(1200);
});
test("cleanup budget exhaustion fails closed",async()=>{
  const req=request(idle);const c=new AbortController();req.signal=c.signal;const signals:string[]=[];
  let readyAtAbort=false,start=0;const abort=c.abort.bind(c);c.abort=()=>{readyAtAbort=existsSync(join(dirname(req.executablePath),"handler-ready"));start=performance.now();abort();};
  const spawn:ProbeRuntime["spawn"]=r=>{const p=wrappedSpawn(signals,700)(r);afterHandlerReady(r,()=>c.abort());return p;};
  expect((await runBoundedProbe(req,{spawn})).ok).toBe(false);expect(performance.now()-start).toBeLessThan(1150);expect(signals).toEqual(["SIGTERM","SIGKILL"]);
  expect(readyAtAbort).toBe(true);
});
test("auth parsing occurs only after clean exit and reaping",async()=>{
  let reaped=false,parsed=false;const req=request(passSource);
  const spawn:ProbeRuntime["spawn"]=r=>{const p=wrappedSpawn([])(r);return {...p,exited:p.exited.then(async code=>{await Bun.sleep(30);reaped=true;return code;})};};
  expect((await runBoundedProbe(req,{spawn,parseAuth:text=>{expect(reaped).toBe(true);parsed=true;return parseAuthReadiness(text);}})).ok).toBe(true);expect(parsed).toBe(true);
  parsed=false;expect((await runBoundedProbe(request(passSource+"process.exit(1);"),{parseAuth:text=>{parsed=true;return parseAuthReadiness(text);}})).ok).toBe(false);expect(parsed).toBe(false);
});
test("malformed JSON and every incorrect auth predicate fail closed",async()=>{
  const cases:unknown[]=["malformed",null,[],{},...Object.keys(auth).filter(k=>!['email','orgId','orgName'].includes(k)).flatMap(key=>{const missing={...auth} as Record<string,unknown>;delete missing[key];return [missing,{...auth,[key]:false},{...auth,[key]:"wrong"}];})];
  for(const value of cases){const text=typeof value==="string"?value:JSON.stringify(value);expect((await runBoundedProbe(request(`console.log(${JSON.stringify(text)});`))).ok).toBe(false);}
},10000);
test("diagnostics contain only metadata on success and every failure",async()=>{
  const cases=[passSource,"console.log('RAW-PRIVATE-CANARY');",passSource+"process.exit(1);","process.stderr.write('RAW-PRIVATE-CANARY');process.kill(process.pid,'SIGTERM');","process.stdout.write('RAW-PRIVATE-CANARY'.repeat(5000));","process.stderr.write('RAW-PRIVATE-CANARY'.repeat(5000));"];
  for(const source of cases){const r=await runBoundedProbe(request(source));expect(Object.keys(r).sort()).toEqual(["diagnostic","ok"]);expect(Object.keys(r.diagnostic).sort()).toEqual(["exitCode","primitive","result","signal","stderrBytes","stdoutBytes"]);expect(JSON.stringify(r)).not.toContain("RAW-PRIVATE-CANARY");}
  for(const mode of ["spawn","cancel","timeout","cleanup"]){const req=request(idle);const c=new AbortController();req.signal=c.signal;if(mode==="spawn")rmSync(req.executablePath);if(mode==="cancel")c.abort();let offset=0;const spawn:ProbeRuntime["spawn"]=r=>{const p=wrappedSpawn([],mode==="cleanup"?700:0)(r);afterHandlerReady(r,()=>{offset=5001;c.abort();});return p;};const r=await runBoundedProbe(req,{spawn,now:()=>performance.now()+offset});expect(Object.keys(r.diagnostic).sort()).toEqual(["exitCode","primitive","result","signal","stderrBytes","stdoutBytes"]);expect(JSON.stringify(r)).not.toContain("RAW-PRIVATE-CANARY");}
},10000);
