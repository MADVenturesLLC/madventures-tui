# Phase 3B M3 build log

## Opening at the binding base

The local branch is `build/3b-m3-r1`. HEAD and the fetched origin/main both name
a7ceccbe96950b63646edc1dc6cc8590c957bf28, the binding base under B11.
Its first parent and ancestor is 2026cfd96ff34b6ebc44161479f23f105febc102.
Only docs/decisions/DEC-20261127-01-m2-records-and-m3.md and
docs/verification/phase-3a-correction-rounds.md differ. Log 008 records the clean
worktree, empty stash, and absence of the remote build branch. Log 009 records
the exact source inventories and the absence of both verification documents.
The Founder reported the three delivery directories empty at setup. Log 009 saw
only this session's numbered files in logs and empty evidence and pr directories.

The commission DEC-20261127-01 has SHA-256
78e2bed03efd2e466a224f4186971d06c51e7fb85e0b22f0db0e639cd99a4d97.
The prompt checksum verified at
ed699228da7e9924d7d175c89b0ca3d3accd1f1385b36e6cc41de9b0d8fbb1ca.
Log 011 verifies the 35 authority hashes, issued status and signatures. Log 012
reads the committed texts. The host reports Darwin arm64.

### Identity

Codex, based on OpenAI GPT-6. Exact model identifier and reasoning effort were
not shown. The assigned role is builder, actor session:codex/3b-m3-r1, execution
surface codex. The agent path is /root, mode Default. The harness reports
workspace-write and restricted network. The Founder reports on-request, in-person
review and no loaded MCP servers. A separate reviewer field was not shown.
The working directory is /Users/michaeldaley/builds/m3-r1. Git identity is
daley40-lab with 293512385+daley40-lab@users.noreply.github.com.

The visible functions were wait, request_user_input, request_user_input_async,
send_message_to_user_async and exec. Nested tools included apply_patch,
exec_command, write_stdin, clock__curr_time and the six names of Addendum 2 B4
across the nested inventory, deferred namespace and collaboration. Clock showed
sleep. Collaboration also showed followup_task, interrupt_agent, list_agents,
send_message and wait_agent. No other namespace was shown.

Governed CLI output in log 001

```text
WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0
```

Runtime output from log 007, verified again in log 026

```text
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99
```

### Committed source verification

The following quotes use base file line numbers. Gaps are marked. Log 014 also records the complete precondition selection.

apps/madbridge/src/tui/keyboard-router.ts

```text
258    const ptyData = resolvePtySequence(sequence, name, keyStr);
259    if (ptyData !== null) {
260      callbacks.onPtyWrite(ptyData);
```

packages/broker/src/command-legality.ts

```text
164    // Predicate 5 — active-writer identity. pty_input and pty_resize ONLY.
165    // pty_terminate is never gated here (mechanical fail-closed teardown must
166    // not be blockable by a non-writer). A current positive fencing token is
167    // necessary but not sufficient: an execution that exists but is not the
168    // active writer is refused here, whatever token it presents. A null
169    // activeWriterExecutionId fails this predicate for writer-only commands.
170    if (WRITER_ONLY_COMMAND_KINDS.has(kind)) {
171      const executionId = (command as { readonly executionId: string }).executionId;
172      if (snapshot.activeWriterExecutionId === null || executionId !== snapshot.activeWriterExecutionId) {
173        return { ok: false, error: "unauthorized", detail: "execution is not the active writer" };
174      }
```

packages/supervisor/src/build.ts

```text
23  import { invalidateToken, issueInitialToken } from "../../broker/src/fencing";
24  import { HOST_DEADLINES_MS, terminateChildGroup } from "../../pty-host/src/signals";
25  import {
26    createInProcessBrokerClient,
27    type InProcessBrokerClient,
28    type StampedBrokerSnapshot,
29  } from "../../broker/src/in-process-client";
30  import {
31    spawnPtyHost,
32    escalateWedgedHost,
33    type HostLaunchDescriptor,
34    type PtyHostHandle,
35  } from "../../broker/src/pty-host-supervisor";
36  import {
37    RuntimeBroker,
38    type GovernedProcessTerminator,
39    type LifecycleObservation,
40    type RuntimeBrokerDeps,
41    type RuntimeBrokerSources,
42  } from "../../broker/src/runtime-broker";
43  import { projectSnapshot } from "../../broker/src/snapshot";
44  import type { ExecutionSnapshot } from "../../broker/src/client";
(lines omitted)
460    const iterator = host.handle.facts()[Symbol.asyncIterator]();
(lines omitted)
643        const reason = cause === "auth_failed" ? "authentication_expired"
644          : cause === "child_exited" ? "child_failure"
645          : cause === "host_exited" ? "pty_host_failure"
646          : cause === "provider_error" || cause === "endpoint_refused" ? "adapter_failure" : "identity_mismatch";
(lines omitted)
870            client = createInProcessBrokerClient(brokerHandle, { kind: "founder_tui" });
(lines omitted)
1067              const adapterClient = createInProcessBrokerClient(brokerHandle, {
1068                kind: "execution",
1069                executionId: envelopeExecution.execution_id,
1070              });
(lines omitted)
1092            const issuedEvent = issueInitialToken(sessionId, envelope.initial_writer, {
1093              taskEnvelopeHash: envelope.envelope_hash,
1094              repositoryFingerprint: envelope.repository_fingerprint,
1095              previousEventHash: beforeHead,
1096              eventId: sources.nextEventId(),
1097              createdAt: sources.now(),
1098            });
```

packages/broker/src/in-process-client.ts

```text
268    function ingestOutputFrame(frame: OutputFrame): SequenceViolation | null {
269      const { sessionId, executionId, outputSeq, bytes } = frame;
270      const lastAccepted = outputSeqs.get(executionId) ?? 0;
271      const kind =
272        sessionId === broker.snapshotProjectionInput().lifecycle.sessionId
273          ? sequenceViolation(lastAccepted, outputSeq)
274          : "session_mismatch";
275      if (kind !== null) {
276        return { kind, stream: "output", lastAccepted, offered: outputSeq };
277      }
278      outputSeqs.set(executionId, outputSeq);
279      const queue = outputQueues.get(executionId) ?? [];
280      outputQueues.set(executionId, queue);
281      // Copied on ingest: the delivered frame's bytes is never the caller's array.
282      queue.push({ sessionId, executionId, outputSeq, bytes: new Uint8Array(bytes) });
283      for (const waiter of [...outputWaiters]) {
284        const delivered = waiter.executionId === executionId ? queue.shift() : undefined;
285        if (delivered !== undefined) {
286          waiter.settle({ done: false, value: delivered });
287        }
288      }
289      return null;
(lines omitted)
302    // output(executionId) does not end when its buffer is empty: it waits for the
303    // next frame and ends only when this client closes (DEC-20260929-01 B3).
304    function output(executionId: string): AsyncIterable<OutputFrame> {
305      return {
306        [Symbol.asyncIterator](): AsyncIterator<OutputFrame> {
307          const own = new Set<OutputWaiter>();
308          let finished = false;
309          return {
310            next(): Promise<IteratorResult<OutputFrame>> {
311              if (finished || closed) {
312                return Promise.resolve(iterationDone());
313              }
314              const queued = outputQueues.get(executionId)?.shift();
315              if (queued !== undefined) {
316                return Promise.resolve({ done: false, value: queued });
317              }
318              return new Promise((resolve) => {
319                const waiter: OutputWaiter = {
320                  executionId,
321                  settle: (result) => {
322                    outputWaiters.delete(waiter);
323                    own.delete(waiter);
324                    resolve(result);
325                  },
326                };
327                outputWaiters.add(waiter);
328                own.add(waiter);
329              });
330            },
331            return(): Promise<IteratorResult<OutputFrame>> {
332              finished = true;
333              for (const waiter of [...own]) {
334                waiter.settle(iterationDone());
335              }
336              return Promise.resolve(iterationDone());
337            },
338          };
339        },
340      };
(lines omitted)
343    async function request(command: BrokerCommand): Promise<BrokerResult> {
344      // Evaluate and dispatch the same values even when the caller supplies getters.
345      const captured = { ...command };
346      const commandId = captured.commandId;
347      const snapshot = projectSnapshot(broker.snapshotProjectionInput());
348      const legality = evaluateCommandLegality(captured, snapshot, evaluatedPrincipal);
349      if (!legality.ok) {
350        return { ok: false, commandId, error: legality.error, detail: legality.detail };
351      }
352      switch (captured.kind) {
353        case "session_pause":
354          await broker.pause(commandId);
355          break;
356        case "session_resume":
357          await broker.resume(commandId);
358          break;
359        case "session_close":
360          await broker.founderClose(commandId);
361          break;
362      }
363      return { ok: true, commandId, acceptedSnapshotSeq: deliveredSeq };
364    }
(lines omitted)
479  export function unsafeTestOnlyIngestOutputFrame(
480    client: InProcessBrokerClient,
481    executionId: string,
482    bytes: Uint8Array,
483  ): void {
484    seamsOf(client).ingestStamped(executionId, bytes);
485  }
(lines omitted)
496  export async function unsafeTestOnlyIngestRawOutputFrame(
497    client: InProcessBrokerClient,
498    frame: OutputFrame,
499  ): Promise<void> {
500    return seamsOf(client).ingestRaw(frame);
501  }
(lines omitted)
511  export async function unsafeTestOnlyOfferSnapshotSeq(
512    client: InProcessBrokerClient,
513    candidate: number,
514  ): Promise<void> {
515    return seamsOf(client).offerSnapshotSeq(candidate);
516  }
```

packages/broker/src/pty-host-supervisor.ts

```text
53  const HOST_ENTRY = "packages/pty-host/src/main.ts";
(lines omitted)
89  const subscriberCounts = new WeakMap<PtyHostHandle, () => number>();
90
91  export function subscriberCountForTest(handle: PtyHostHandle): number {
92    return subscriberCounts.get(handle)?.() ?? 0;
93  }
94
(lines omitted)
102  const waiterCounts = new WeakMap<PtyHostHandle, () => number>();
103
104  export function waiterCountForTest(handle: PtyHostHandle): number {
105    return waiterCounts.get(handle)?.() ?? 0;
106  }
107
(lines omitted)
119   */
120  const closeStdinCounts = new WeakMap<PtyHostHandle, () => number>();
121
122  export function closeStdinCallCountForTest(handle: PtyHostHandle): number {
123    return closeStdinCounts.get(handle)?.() ?? 0;
124  }
125
(lines omitted)
134   */
135  const terminateSendCounts = new WeakMap<PtyHostHandle, () => number>();
136
137  export function terminateSendCountForTest(handle: PtyHostHandle): number {
138    return terminateSendCounts.get(handle)?.() ?? 0;
139  }
140
(lines omitted)
201  }
202
203  /** Test-only observation of the phase. Module-private; not on the barrel. */
204  export function escalationPhaseForTest(handle: PtyHostHandle): EscalationPhase {
205    return escalationRecords.get(handle)?.phase ?? "none";
206  }
207
(lines omitted)
225  interface PendingAck {
226    /** The command whose acknowledgement is awaited. */
227    readonly ofKind: HostCommandFrame["kind"];
228    /** Settled with true on a matching ack, false on any terminal path. */
229    readonly settle: (acked: boolean) => void;
230    /** Resolves once, on the first settle. */
231    readonly promise: Promise<boolean>;
232    settled: boolean;
233  }
234
235  /** Registers/looks up the pending acknowledgement owned by a handle. */
236  const pendingAcks = new WeakMap<PtyHostHandle, PendingAck>();
237
238  /** Registers/looks up the supervisor-internal ack notifier for a handle. */
239  const ackNotifiers = new WeakMap<PtyHostHandle, (frame: HostFactFrame) => void>();
240
241  /**
242   * Test-only observability: whether a pending acknowledgement record is
243   * currently registered for a handle. Off the public contract and off the
244   * barrel. Proves requirement 3/4 — that no stale acknowledgement state
245   * survives a terminal path and can satisfy a later escalation.
246   */
247  const pendingAckProbes = new WeakMap<PtyHostHandle, () => boolean>();
248
249  export function pendingAckRegisteredForTest(handle: PtyHostHandle): boolean {
250    return pendingAckProbes.get(handle)?.() ?? false;
(lines omitted)
316  async function* factStream(proc: Bun.Subprocess): AsyncGenerator<HostFactFrame> {
317    const stdout = proc.stdout;
318    if (stdout === undefined || typeof stdout === "number") {
319      // stdout was not piped — the host cannot produce facts. This is a
320      // supervisor construction error, not a runtime condition.
321      throw new Error("pty-host supervisor: host stdout is not a stream");
322    }
323    const reader = stdout.getReader();
324    let buffer: Uint8Array<ArrayBuffer> = new Uint8Array(0);
325    try {
326      for (;;) {
327        const { done, value } = await reader.read();
328        if (done) break;
329        buffer = concatBytes(buffer, new Uint8Array(value));
330        for (;;) {
331          const decoded = decodeFact(buffer);
332          if (decoded === null) break;
333          yield decoded.frame;
334          buffer = buffer.subarray(decoded.consumed);
335        }
336      }
337    } finally {
338      reader.releaseLock();
339    }
340  }
(lines omitted)
364    const proc = Bun.spawn([BUN_EXECUTABLE, "--no-env-file", HOST_ENTRY], {
365      cwd: REPO_ROOT,
366      stdin: "pipe",
367      stdout: "pipe",
368      stderr: "pipe",
369      // Allowlisted environment ONLY — ambient inheritance is prohibited.
370      env: { ...descriptor.env },
371    });
(lines omitted)
519      // Production acknowledgement path (Greptile P1 remediation): every
520      // decoded host fact flows through this single pump, so settling the
521      // pending acknowledgement here means `escalateWedgedHost` observes the
522      // REAL host response — not an injected test signal. The notifier is
523      // registered at handle construction below.
524      ackNotify?.(frame);
(lines omitted)
657        if (queue.closed) {
658          if (pumpError !== null) throw pumpError;
659          return;
(lines omitted)
690        if (wake && queue.items.length === 0) {
691          if (pumpError !== null) throw pumpError;
692          return;
693        }
(lines omitted)
744    ackNotify = (frame: HostFactFrame): void => {
745      const pending = pendingAcks.get(handle);
746      if (pending === undefined || pending.settled) return;
747      const isMatchingAck = frame.kind === "ack" && frame.ofKind === pending.ofKind;
748      const isTerminationFirstFact = pending.ofKind === "terminate" && frame.kind === "termination_started";
749      if (isMatchingAck || isTerminationFirstFact) pending.settle(true);
750    };
751    pendingAckProbes.set(handle, () => {
752      const p = pendingAcks.get(handle);
(lines omitted)
883   * Timing (packet C3): `t_command` — the moment the terminate command is
884   * issued — is the SOLE anchor. The 250 ms acknowledgement period consumes
885   * the same absolute 500 ms hard-kill budget; there is no second grace
886   * window. Both kill attempts begin no later than `t_command + 500 ms`.
```

packages/broker/src/pty-host-protocol.ts

```text
33  export class MalformedFrameError extends Error {
(lines omitted)
36      this.name = "MalformedFrameError";
(lines omitted)
109      throw new MalformedFrameError("payload is not valid UTF-8");
(lines omitted)
114      throw new MalformedFrameError("payload is not valid JSON");
(lines omitted)
148          throw new MalformedFrameError("malformed launch payload");
(lines omitted)
157          throw new MalformedFrameError("malformed resize payload");
(lines omitted)
162        if (payload.byteLength !== 0) throw new MalformedFrameError("terminate carries no payload");
(lines omitted)
186  function decodeFactPayload(kind: HostFactFrame["kind"], payload: Uint8Array): HostFactFrame {
(lines omitted)
191          throw new MalformedFrameError("malformed launched payload");
(lines omitted)
196        if (payload.byteLength !== 0) throw new MalformedFrameError("ready carries no payload");
(lines omitted)
201          throw new MalformedFrameError("malformed ack payload");
(lines omitted)
208        if (payload.byteLength !== 0) throw new MalformedFrameError("termination_started carries no payload");
(lines omitted)
211        if (payload.byteLength !== 0) throw new MalformedFrameError("drained carries no payload");
(lines omitted)
216          throw new MalformedFrameError("malformed exited payload");
(lines omitted)
225    if (length > MAX_FRAME_BYTES) throw new MalformedFrameError(`frame exceeds MAX_FRAME_BYTES (${MAX_FRAME_BYTES})`);
(lines omitted)
236    if (length < 1) throw new MalformedFrameError("frame length must include at least the kind tag");
237    if (length > MAX_FRAME_BYTES) throw new MalformedFrameError(`frame exceeds MAX_FRAME_BYTES (${MAX_FRAME_BYTES})`);
(lines omitted)
253    if (kind === null) throw new MalformedFrameError(`unknown command tag ${decoded.tag}`);
(lines omitted)
261  export function decodeFact(buf: Uint8Array): { readonly frame: HostFactFrame; readonly consumed: number } | null {
(lines omitted)
265    if (kind === null) throw new MalformedFrameError(`unknown fact tag ${decoded.tag}`);
266    return { frame: decodeFactPayload(kind, decoded.payload), consumed: decoded.consumed };
```

packages/pty-host/src/main.ts

```text
739      } else if (frame.kind === "input" || frame.kind === "resize") {
740        // A terminal write/resize failure must not escape the steady-state
741        // loop: an unguarded throw would propagate out of runSteadyState and
742        // out of main, skipping close() — no drained, no exited, and no
743        // containment SIGTERM, so the child process group could survive.
744        // Fail closed instead: diagnose, mark the exit code, contain the
745        // child, and complete the session shutdown exactly once.
746        try {
747          if (frame.kind === "input") session.terminal.write(frame.bytes);
748          else session.terminal.resize(frame.cols, frame.rows);
749        } catch (err) {
750          const detail = err instanceof Error ? err.message : String(err);
751          process.stderr.write(`pty-host: terminal ${frame.kind} failed: ${detail}; containing the child\n`);
752          process.exitCode = 1;
753          await close({ announce: false, signal: true });
754          return;
755        }
756        emit({ kind: "ack", ofKind: frame.kind });
757      } else if (frame.kind === "terminate") {
```

packages/adapter-claude-code/src/live.ts

```text
6  export function encodeUserInput(text: string): string {
7    return JSON.stringify({ type: "user", message: { role: "user", content: text } }) + "\n";
8  }
(lines omitted)
122        if (!this.complete) {
123          this.complete = true;
124          this.passed();
125        }
(lines omitted)
149    const reader = new ClaudeReader(input, () => {
150      if (performance.now() >= deadline) { stop("attestation_deadline"); return; }
151      clearTimeout(timer);
152      resolve({ ok: true, evidenceKind: "actual_session", provider: "anthropic", model: input.model, cliVersion: reader.version });
153    });
154    async function consume(): Promise<void> {
155      try {
156        for await (const fact of input.host.handle.facts()) {
157          if (failed) break;
158          if (!reader.complete && performance.now() >= deadline) { stop("attestation_deadline"); break; }
159          if (fact.kind === "output" && fact.bytes) {
160            const cause = reader.push(fact.bytes);
161            if (cause) stop(cause);
162          } else if (reader.complete && fact.kind === "exited") {
163            stop(reader.finish() ?? "child_exited");
164          } else if (!reader.complete && (fact.kind === "exited" || fact.kind === "drained")) {
165            stop(reader.finish() ?? "attestation_missing");
166          }
167          if (failed) break;
168        }
169        if (!failed) stop(reader.complete ? "host_exited" : reader.finish() ?? "attestation_missing");
170      } catch { stop("attestation_malformed"); }
171      finally {
```

packages/adapter-madv-surface/src/index.ts

```text
55  export function encodeUserInput(text: string): string {
56    return JSON.stringify({ type: "user", message: { role: "user", content: text } }) + "\n";
57  }
```

packages/adapter-madv-surface/src/live.ts

```text
44      onAttested(version) {
45        if (performance.now() >= deadline) { stop("attestation_deadline"); return; }
46        clearTimeout(timer);
47        ready = true;
48        resolve({ ok: true, evidenceKind: "actual_session", provider: input.registration.provider,
49          model: input.model, cliVersion: version, sendUserInput });
50      },
(lines omitted)
59    function sendUserInput(text: string): boolean {
60      if (closed || !ready || failure) return false;
61      inspect(parser.beginRequest());
62      if (failure) return false;
63      clearTimeout(timer);
64      timer = setTimeout(() => inspect(parser.checkDeadline()), EVIDENCE_DEADLINE_MS);
65      try { write(encodeUserInput(text)); } catch { stop("provider_error"); }
66      return !failure;
67    }
68    async function consume(): Promise<void> {
69      try {
70        for await (const fact of input.host.handle.facts()) {
71          if (failure) break;
72          if (!ready && performance.now() >= deadline) { stop("attestation_deadline"); break; }
73          if (fact.kind === "output" && fact.bytes) inspect(parser.push(fact.bytes));
74          if (fact.kind === "exited") {
75            const handedOver = ready;
76            const exitCode = fact.code ?? 1;
77            const result = parser.finish(exitCode, fact.signal ?? null);
78            const detection = detectMadvFailure(input.registration.auth_failure_detection, { kind: "child_exit", exitCode });
79            if (detection && !parser.attestationFailure) stop(detection.cause, detection.reason);
80            else inspect(result);
81            if (handedOver && !failure) stop("child_exited");
82            return;
83          }
84          if (failure) break;
85        }
86        if (!failure) {
87          if (ready) stop("host_exited");
88          else inspect(parser.finish(0));
89        }
90      } catch { stop("identity_mismatch", "malformed_stream"); }
91      finally {
```

test/phase3b/child-end.ts

```text
72              const verdict = await attestMadvSession({ ...input, reportFailure(cause) {
73                input.reportFailure(cause);
74                reported = true;
75              } });
76              if (verdict.ok) {
77                send = verdict.sendUserInput;
78                if (before) {
```

packages/supervisor/test/build.test.ts

```text
57        executionId: "builder", fencingToken: active.fencingToken!, bytes: new Uint8Array([0, 27, 255]),
58      };
59      expect((await session.client.request(write)).ok).toBe(true);
60      expect((await session.client.request({
61        kind: "session_pause", commandId: "prereq-pause", sessionId: active.sessionId, reason: "test",
62      })).ok).toBe(true);
63      const paused = await session.client.getSnapshot();
64      expect(paused.phase).toBe("paused");
65      expect(paused.fencingToken).toBe(active.fencingToken);
66      expect((await session.client.request(write)).ok).toBe(false);
67      expect((await session.client.request({
```

test/phase3a/runtime-harness.ts

```text
318    // A private disposable home child also satisfies the shared-/tmp exclusion on Linux.
319    const root = mkdtempSync(join(realpathSync(user.homedir), ".madbridge-task48-"));
(lines omitted)
580      Object.defineProperty(client, "request", {
581        value: async (command: Parameters<BrokerClient["request"]>[0]) => {
582          const captured = { ...command };
583          if (captured.kind === "pty_input" && captured.bytes instanceof Uint8Array) captured.bytes = captured.bytes.slice();
584          const accepted = await underlying.request(captured);
585          if (!accepted.ok) return accepted;
586          if (captured.kind === "pty_input" || captured.kind === "pty_resize") {
587            const host = state!.hosts.find(host => host.executionId === captured.executionId);
588            if (host === undefined) throw new Error("FixtureWriterHostMissing");
589            host.handle.send(captured.kind === "pty_input" ? { kind: "input", bytes: captured.bytes }
590              : { kind: "resize", cols: captured.cols, rows: captured.rows });
(lines omitted)
623            } else if (options.wedgeHostAfter !== undefined) {
624              const host = state!.hosts[0]!, child = state!.children[0]!;
625              process.kill(host.hostPid, "SIGSTOP");
626              const outcome = await escalateWedgedHost(host.handle, child.pgid!, host.hostPid);
(lines omitted)
639            } else if (options.emitMalformedFrame !== undefined) {
640              // Inject raw fact bytes at the harness receive boundary through the production codec.
641              const bytes = options.emitMalformedFrame === "unknown"
642                ? new Uint8Array([0, 0, 0, 1, 255]) : new Uint8Array([0, 0, 0, 2, 1, 1]);
643              try { decodeFact(bytes); }
644              catch (error) {
645                if (!(error instanceof MalformedFrameError)) throw error;
646                faultReport.errorName = error.name;
647                faultReport.detectedMs = performance.now() - faultStarted;
648                await interrupt("pty_host_failure");
649              }
```

apps/madbridge/src/tui/components/agent-identity.ts

```text
83   * Truthfulness: a writer claim is only valid while the session is connected
84   * AND not interrupted AND no incident is active.
85   *   - `connected === false` → no current writer (retained data is historical)
86   *   - `sessionState === "interrupted"` → writing is frozen; the retained
87   *     token is incident evidence, not live authority
88   *   - `incident !== null` → an incident takes precedence; no writer claim
89   *
90   * The caller should render a `STREAM ENDED` / `WRITING FROZEN` /
91   * `SESSION INTERRUPTED` word instead. The retained token may still be
92   * displayed as incident evidence — just not as an active writer badge.
(lines omitted)
99    if (!state.connected) return false;
(lines omitted)
129  export function livenessWord(state: BrokerSnapshot | null): string {
130    if (!state) return "STREAM ENDED";
131    if (state.connected === null) return "UNKNOWN";
132    if (!state.connected) return "STREAM ENDED";
133    if (state.sessionState === "interrupted") return "WRITING FROZEN";
134    if (state.incident !== null) return "WRITING FROZEN";
135    return "LIVE";
```

apps/madbridge/src/tui/components/StatusBar.tsx

```text
43    const line = buildStatusLine({
44      connected,
45      sessionWord: state?.sessionState ?? "—",
46      ownerWord: describeOwner(state),
47      pendingCount: state?.pendingApprovals?.length ?? 0,
48      // Finding 2 fix: use the actual latest projected ledger sequence (max
(lines omitted)
106    const connToken = input.connected === null ? "UNKNOWN" : input.connected ? "CONNECTED" : "NOT CONNECTED";
(lines omitted)
347  function describeOwner(state: BrokerSnapshot | null): string {
348    if (!state) return "none";
349    const o = state.ownershipState;
350    const w = state.activeWriter;
351    const tok = state.fencingToken;
352    const suffix = tok === null ? " (token —)" : tok > 0 ? " #" + String(tok) : " (token none)";
353    switch (o) {
354      case null:
355        return "UNKNOWN";
356      case "free":
357        return "free";
358      case "owned":
359        return (w ?? "unknown") + suffix;
360      case "transfer-requested":
361        return "transfer-req" + suffix;
362      case "sender-released":
363        return "released" + suffix;
364      case "receiver-validating":
365        return "validating";
366      case "rejected":
367        return "rejected";
368    }
369  }
```

apps/madbridge/src/tui/live/subscribe.ts

```text
17            const snapshot = await client.getSnapshot();
18            if (signal.aborted) return;
19            next = clientSnapshotToProjection(snapshot);
20          } catch {
21            if (last && !signal.aborted) listener({ ...last, connected: false });
22            return;
23          }
24
25          const closed = next.connected === false;
26          if (closed || !isDeepStrictEqual(last, next)) {
27            last = next;
28            listener(next);
29          }
30          if (closed || signal.aborted) return;
31          await waitForSnapshotTick(signal);
32        }
33      }
34
35      // A listener that throws also ends its own subscription.
36      void read().catch(() => controller.abort());
37      return () => controller.abort();
```

apps/madbridge/src/tui/App.tsx

```text
114  interface AppProps {
115    /** External subscribe function to receive immutable broker snapshots. */
116    subscribe?: (listener: (snapshot: BrokerSnapshot) => void) => () => void;
117    /** PTY write callback — bytes go to the focused PTY. */
118    onPtyWrite?: (data: string) => void;
119    /** Approval resolution callback — sends typed event to broker. */
120    onApprovalResolve?: (event: ApprovalRequestEvent) => void;
121    /** Quit callback. */
122    onQuit?: () => void;
123    /** Fixture mode — permanently labels the view as fixture data. */
124    fixture?: boolean;
125    /** OMP catalog loader override (tests inject a deterministic stub; the
126     * production default shells out to the public `omp models ls --json`
127     * CLI once at mount). LOCAL UI data only. */
128    catalogLoader?: typeof loadOmpCatalog;
129  }
130
131  export function App({ subscribe, onPtyWrite, onApprovalResolve, onQuit, fixture = false, catalogLoader }: AppProps) {
(lines omitted)
163    const handlePtyWrite = useCallback((data: string) => {
164      onPtyWrite?.(data);
165    }, [onPtyWrite]);
(lines omitted)
313          onPtyWrite: handlePtyWrite,
```

apps/madbridge/test/tui-governance-surfaces.test.tsx

```text
481    test("15. Bare terminal bytes still reach the PTY byte-identically", async () => {
482      const ptyWrites: string[] = [];
483      const subscribe = makeSubscribe(makeSnapshot());
484      const setup = await testRender(
485        <App subscribe={subscribe} onPtyWrite={(d) => ptyWrites.push(d)} />,
486        { width: 120, height: 34 },
487      );
488      try {
489        // Bare 'a' should pass through to PTY
490        setup.mockInput.pressKey("a");
491        await setup.flush();
492        expect(ptyWrites).toEqual(["a"]);
493      } finally {
494        setup.renderer.destroy();
495      }
496    });
497
498    test("16. Seat keys are the default Alt+1/2/3; pane focus moved to Alt+4/5", () => {
(lines omitted)
974    test("43. No timer, animation, spinner, or timeline mechanism is introduced", () => {
975      // Re-use the Phase 1 static-source scan. This test fails if any forbidden
976      // timer/animation mechanism is added under src/tui/.
977      const { existsSync, readFileSync, readdirSync } = require("node:fs");
978      const { join } = require("node:path");
979      function listSourceFiles(dir: string): string[] {
980        if (!existsSync(dir)) return [];
981        const results: string[] = [];
982        for (const entry of readdirSync(dir, { withFileTypes: true })) {
983          const fullPath = join(dir, entry.name);
984          if (entry.isDirectory()) {
985            results.push(...listSourceFiles(fullPath));
986          } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
987            results.push(fullPath);
988          }
989        }
990        return results;
991      }
992      const tuiDir = join(process.cwd(), "apps/madbridge/src/tui");
993      const files = listSourceFiles(tuiDir);
994      expect(files.length).toBeGreaterThan(0);
995      const forbidden = [
996        /\bsetTimeout\b/,
997        /\bsetInterval\b/,
998        /\brequestAnimationFrame\b/,
999        /\bclearTimeout\b/,
1000        /\bclearInterval\b/,
1001        /from\s+["'].*spinner/i,
1002        /from\s+["'].*animate/i,
1003        /from\s+["'].*marquee/i,
1004      ];
1005      for (const file of files) {
1006        const source = readFileSync(file, "utf8");
1007        for (const pattern of forbidden) {
1008          if (pattern.test(source)) {
1009            throw new Error(`Forbidden pattern ${String(pattern)} found in ${file}`);
1010          }
1011        }
1012      }
1013    });
```

apps/madbridge/test/pty-focus.test.tsx

```text
61      // Updated per Founder commission GLM-20260918-FOUNDER-TUI-SEATS:
62      // Alt+1/2/3 are seat keys; antigravity moved to Alt+4, events to Alt+5.
63      // alt+1 IS a global action (terminal-deliverable Alt+digit)
64      expect(isGlobalAction("alt+1", bindings)).toBe(true);
65      expect(isGlobalAction("alt+2", bindings)).toBe(true);
66      expect(isGlobalAction("alt+3", bindings)).toBe(true);
67      expect(isGlobalAction("alt+4", bindings)).toBe(true);
68      expect(isGlobalAction("alt+5", bindings)).toBe(true);
(lines omitted)
73      // resolveKey returns the action for alt+ prefixed keys
74      expect(resolveKey("alt+1", bindings)).toBe("seat-builder");
75      expect(resolveKey("alt+2", bindings)).toBe("seat-architect");
76      expect(resolveKey("alt+3", bindings)).toBe("seat-operator");
77      expect(resolveKey("alt+4", bindings)).toBe("focus-antigravity");
78      expect(resolveKey("alt+5", bindings)).toBe("focus-events");
```

test/phase3a/harness-separation.test.ts

```text
16  const ROUTER_IMPORTER = "apps/madbridge/test/pty-focus.test.tsx";
(lines omitted)
20  // Drift requires review; these are expression exceptions, never file exclusions.
21  const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> = {
22    [ROUTER_IMPORTER]: { sha256: "2faefe54d7c9be2051bce621629203072515263d58bc69b31bd2fe927faedb01" },
23    "packages/protocol/src/adapter-registry.ts": {
24      sha256: "6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4", call: "source[Symbol.iterator]()",
25    },
26    "packages/protocol/src/lifecycle-events.ts": {
27      sha256: "9210012a505848a7379ab7b9cf9d840f33197de58f85b23c359653760479c603", call: "PAYLOAD_SHAPE[knownType](payload)",
28    },
29    "packages/supervisor/src/build.ts": {
30      sha256: "0b329d97e88a13bd58902fe7dd1afe971d52c61bbf310862230465fd1fdd3553", call: "host.handle.facts()[Symbol.asyncIterator]()",
31    },
32  };
```

apps/madbridge/test/tui-writers-stage.test.tsx

```text
968  describe("12. No new timer, animation, or timeline imports exist under src/tui/", () => {
969    function listSourceFiles(dir: string): string[] {
970      if (!existsSync(dir)) return [];
971      const results: string[] = [];
972      for (const entry of readdirSync(dir, { withFileTypes: true })) {
973        const fullPath = join(dir, entry.name);
974        if (entry.isDirectory()) {
975          results.push(...listSourceFiles(fullPath));
976        } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
977          results.push(fullPath);
978        }
979      }
980      return results;
981    }
982
983    test("no setTimeout/setInterval/requestAnimationFrame/spinner imports", () => {
984      const tuiDir = join(process.cwd(), "apps/madbridge/src/tui");
985      const files = listSourceFiles(tuiDir);
986      expect(files.length).toBeGreaterThan(0);
987
988      const forbidden = [
989        /\bsetTimeout\b/,
990        /\bsetInterval\b/,
991        /\brequestAnimationFrame\b/,
992        /\bclearTimeout\b/,
993        /\bclearInterval\b/,
994        // Animation/spinner libraries
995        /from\s+["'].*spinner/i,
996        /from\s+["'].*animate/i,
997        /from\s+["'].*marquee/i,
998      ];
999
1000      for (const file of files) {
1001        const source = readFileSync(file, "utf8");
1002        for (const pattern of forbidden) {
1003          if (pattern.test(source)) {
1004            // tslint:disable-next-line: no-console
1005            throw new Error(`Forbidden pattern ${String(pattern)} found in ${file}`);
1006          }
1007        }
1008      }
1009    });
1010  });
```

test/phase3a/architecture-phase3a.test.ts

```text
541  function findRegisteredSurfaceCollectionsInSource(sourceText: string, fileName: string): number[] {
542    const sourceFile = ts.createSourceFile(
543      fileName,
544      sourceText,
545      ts.ScriptTarget.Latest,
546      /* setParentNodes */ true,
547      scriptKindFor(fileName),
548    );
549    const lineNumbers: number[] = [];
550
551    const visit = (node: ts.Node): void => {
552      const elements =
553        mapInitializerKeyElements(node) ??
554        collectionInitializerElements(node) ??
555        mutableCollectionWriteArguments(node);
556      if (elements) {
557        const carriesRegisteredSurface = elements.some((el) => {
558          const unwrapped = unwrapTransparentExpression(el);
559          return (
560            ts.isStringLiteralLike(unwrapped) &&
561            REGISTERED_SURFACE_IDS.has((unwrapped as ts.StringLiteralLike).text)
562          );
563        });
564        if (carriesRegisteredSurface) {
565          const start = node.getStart(sourceFile);
566          lineNumbers.push(sourceFile.getLineAndCharacterOfPosition(start).line + 1);
567        }
568      }
569      node.forEachChild(visit);
570    };
571    visit(sourceFile);
572    return lineNumbers;
573  }
574
575  /**
576   * Scan production source under a repository root for surface-admission
577   * collections outside the sanctioned adapter registry, excluding the
578   * untouched packages/policy/ package. Detection is the union of two
579   * strategies: the legacy identifier-name pattern (KNOWN_SURFACES,
580   * allowedSurfaces, SUPPORTED_SURFACES) and syntax-aware detection of any
581   * collection carrying a registered SurfaceId value — by initializer or by
582   * mutable write — whatever its name. Fails closed if packages/ or apps/ is
583   * absent.
584   */
585  function scanAdmissionSources(root: string): AdmissionViolation[] {
586    if (!existsSync(join(root, "packages")) || !existsSync(join(root, "apps"))) {
587      throw new Error(
588        `Phase 3A admission-source scan: required packages/ and apps/ roots not found under ${root}`,
589      );
590    }
591    const violations: AdmissionViolation[] = [];
592    for (const file of enumerateProductionFiles(root)) {
593      const rel = toPortablePath(relative(root, file));
594      if (rel === ADAPTER_REGISTRY_PATH) continue;
595      if (rel.startsWith("packages/policy/")) continue;
596
597      const sourceText = readFileSync(file, "utf8");
598      const lines = sourceText.split(/\r?\n/);
599      const flaggedLines = new Set<number>();
600      lines.forEach((lineText, idx) => {
601        if (ADMISSION_LIST_PATTERN.test(lineText)) {
602          flaggedLines.add(idx + 1);
603        }
604      });
605      for (const lineNumber of findRegisteredSurfaceCollectionsInSource(sourceText, rel)) {
606        flaggedLines.add(lineNumber);
607      }
608
609      for (const lineNumber of [...flaggedLines].sort((a, b) => a - b)) {
610        violations.push({ file: rel, line: lineNumber, text: lines[lineNumber - 1]!.trim() });
611      }
612    }
613    return violations.sort((a, b) =>
614      a.file === b.file ? a.line - b.line : a.file < b.file ? -1 : 1,
615    );
616  }
617
618  describe("Phase 3A admission authority", () => {
619    test("adapter-registry.ts is the only production admission source", () => {
620      const violations = scanAdmissionSources(REPO_ROOT);
621      expect(violations.map(reportAdmission)).toEqual([]);
622    });
(lines omitted)
1780  describe("Task 34: no broker.sock path is reachable", () => {
1781    // 15s test budget: the plan's 5,000 ms deadline belongs to EACH child,
1782    // and this test launches two children in sequence (CLI + TUI).
1783    test("launching every production entry point in bounded isolated processes creates no broker.sock", async () => {
1784      // ── CLI path: `start --json` must fail closed with the exact gate body.
1785      await runEntryPath({
1786        args: ["apps/madbridge/src/cli.ts", "start", "--json"],
1787        assertOutcome: assertCliOutcome,
1788      });
1789
1790      // ── TUI path (default production form, no --fixture): readiness is the
1791      // StatusBar's honest disconnected word. DEVIATION FROM PLAN LITERAL
1792      // (disclosed): Step 1 names wide-form "NOT CONNECTED"; at this base the
1793      // piped renderer emits the medium-format token "NOCONN" (same fact,
1794      // same buildStatusLine path), empirically probed at the task base.
1795      // The TUI is terminated by the runner (SIGTERM/SIGKILL discipline);
1796      // those are expected cleanup outcomes, not unexpected signals.
1797      await runEntryPath({
1798        args: ["apps/madbridge/src/tui/main.tsx"],
1799        readiness: (out) => out.includes("NOCONN"),
1800        assertOutcome: (r) => expect(tuiPathFailures(r)).toEqual([]),
1801      });
1802    }, 15_000);
(lines omitted)
1994  const CHILD_ENV = { PATH: process.env.PATH ?? "" };
1995  const TUI_READY = (out: Buffer): boolean => out.includes("NOCONN");
```

test/phase3b/separation.test.ts

```text
1  import { expect, test } from "bun:test";
2  import { readdirSync, readFileSync } from "node:fs";
3  import { join } from "node:path";
4  import ts from "typescript";
5  import { runTransactionalBuild } from "../../packages/supervisor/src/index";
6  import { closeOfflineBuild, offlineStart } from "./offline";
7
8  const apps = join(import.meta.dir, "../../apps");
9  const seams = new Set(["runTransactionalBuildWithDependencies", "runPurePreflightWithDependencies"]);
10  const internalModule = /(?:^|\/)supervisor\/src\/(?:build|preflight)(?:\.[cm]?[jt]s)?$/;
11
12  function* appSources(directory: string): Generator<string> {
13    for (const entry of readdirSync(directory, { withFileTypes: true })) {
14      const path = join(directory, entry.name);
15      if (entry.isDirectory() && entry.name !== "node_modules") yield* appSources(path);
16      if (entry.isFile() && /\.[cm]?[jt]sx?$/.test(entry.name)) yield path;
17    }
18  }
19
20  function usesSeam(node: ts.Node): boolean {
21    if (ts.isImportSpecifier(node) || ts.isExportSpecifier(node)) {
22      return seams.has((node.propertyName ?? node.name).text);
23    }
24    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)
25        && internalModule.test(node.moduleSpecifier.text) && node.importClause?.namedBindings
26        && ts.isNamespaceImport(node.importClause.namedBindings)) return true;
27    if (ts.isExportDeclaration(node) && !node.exportClause && node.moduleSpecifier
28        && ts.isStringLiteral(node.moduleSpecifier) && internalModule.test(node.moduleSpecifier.text)) return true;
29    if (ts.isPropertyAccessExpression(node) && seams.has(node.name.text)) return true;
30    if (ts.isElementAccessExpression(node) && ts.isStringLiteral(node.argumentExpression)
31        && seams.has(node.argumentExpression.text)) return true;
32    if (ts.isBindingElement(node)) {
33      const key = node.propertyName ?? node.name;
34      if ((ts.isIdentifier(key) || ts.isStringLiteral(key)) && seams.has(key.text)) return true;
35    }
36    return ts.forEachChild(node, child => usesSeam(child) || undefined) === true;
37  }
38
39  test("application code imports neither internal supervisor seam", () => {
40    const imports: string[] = [];
41    for (const path of appSources(apps)) {
42      const text = readFileSync(path, "utf8");
43      if (!text.includes("WithDependencies") && !text.includes("supervisor/src/")) continue;
44      if (usesSeam(ts.createSourceFile(path, text, ts.ScriptTarget.Latest))) imports.push(path);
45    }
46    expect(imports).toEqual([]);
47  });
48
49  test("the original public build still fails closed without an attester", async () => {
50    const fixture = offlineStart();
51    try {
52      const result = await runTransactionalBuild({
53        sessionId: "offline-no-attester", envelope: fixture.envelope, plan: fixture.plan,
54      });
55      try {
56        expect(result.ok).toBe(false);
57        if (!result.ok) {
58          expect(result.failedStep).toBe("reattest");
59          expect(result.failure).toBe("reattestation_failed");
60          expect(result.detail).toBe("step=reattest execution=builder failure=reattestation_failed");
61          expect(result.partialState.completedSteps).not.toContain("activate");
62        }
63      } finally { await closeOfflineBuild(result); }
64    } finally { fixture.dispose(); }
65  }, 15000);
```

Second-pane references at the base, including the stable action

```text
HEAD:apps/madbridge/src/tui/App.tsx:19:// Claude, Antigravity, and Events focus are ALL inert.
HEAD:apps/madbridge/src/tui/App.tsx:28:import { AntigravityPane } from "./panes/AntigravityPane";
HEAD:apps/madbridge/src/tui/App.tsx:76:  antigravityOutput: string;
HEAD:apps/madbridge/src/tui/App.tsx:86:  | { type: "pty-output"; pane: "claude" | "antigravity"; data: string };
HEAD:apps/madbridge/src/tui/App.tsx:109:      return { ...state, antigravityOutput: state.antigravityOutput + action.data };
HEAD:apps/madbridge/src/tui/App.tsx:145:    antigravityOutput: "",
HEAD:apps/madbridge/src/tui/App.tsx:341:  // The docked agent is whichever of Claude/Antigravity is NOT focused.
HEAD:apps/madbridge/src/tui/App.tsx:345:  const antigravityFocused = ui.focus === "antigravity";
HEAD:apps/madbridge/src/tui/App.tsx:411:            {antigravityFocused && (
HEAD:apps/madbridge/src/tui/App.tsx:412:              <AntigravityPane active={true} state={state} ptyOutput={ui.antigravityOutput} />
HEAD:apps/madbridge/src/tui/App.tsx:423:              // Antigravity is focused → Claude is docked.
HEAD:apps/madbridge/src/tui/App.tsx:426:            {!antigravityFocused && !governanceFocused && !eventsFocused && (
HEAD:apps/madbridge/src/tui/App.tsx:427:              // Claude is focused → Antigravity is docked.
HEAD:apps/madbridge/src/tui/App.tsx:428:              <DockStrip surface="antigravity" state={state} ptyOutput={ui.antigravityOutput} />
HEAD:apps/madbridge/src/tui/App.tsx:434:                <DockStrip surface="antigravity" state={state} ptyOutput={ui.antigravityOutput} />
HEAD:apps/madbridge/src/tui/App.tsx:441:                <DockStrip surface="antigravity" state={state} ptyOutput={ui.antigravityOutput} />
HEAD:apps/madbridge/src/tui/App.tsx:452:            {antigravityFocused && (
HEAD:apps/madbridge/src/tui/App.tsx:453:              <AntigravityPane active={true} state={state} ptyOutput={ui.antigravityOutput} />
HEAD:apps/madbridge/src/tui/components/DockStrip.tsx:48://   1. agent identity            (ANTIGRAVITY / CLAUDE CODE)
HEAD:apps/madbridge/src/tui/components/PaneTabs.tsx:26:  { target: "antigravity", label: "AGY" },
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:14:export type AgentSurface = CliSurface; // "claude-code" | "antigravity"
HEAD:apps/madbridge/src/tui/components/agent-identity.ts:40:  return surface === "claude-code" ? "CLAUDE CODE" : "ANTIGRAVITY";
HEAD:apps/madbridge/src/tui/hooks/useKeyboard.ts:38:        case "focus-antigravity":
HEAD:apps/madbridge/src/tui/hooks/useKeyboard.ts:39:          opts.onFocusChange("antigravity");
HEAD:apps/madbridge/src/tui/keybindings.ts:4:// Override via FOUNDER_TUI_KEYS env var: "alt+1:focus-claude,alt+2:focus-antigravity,..."
HEAD:apps/madbridge/src/tui/keybindings.ts:13:// Alt+4 (antigravity) and Alt+5 (events); "focus-claude" and
HEAD:apps/madbridge/src/tui/keybindings.ts:23:  | "focus-antigravity"
HEAD:apps/madbridge/src/tui/keybindings.ts:40:  { key: "alt+4", action: "focus-antigravity" },
HEAD:apps/madbridge/src/tui/keyboard-router.ts:84: * 3. focus === "governance" (Claude, Antigravity, Events are ALL inert)
HEAD:apps/madbridge/src/tui/keyboard-router.ts:101:  // 3. Only governance focus authorizes — Claude, Antigravity, Events
HEAD:apps/madbridge/src/tui/keyboard-router.ts:165:      case "focus-antigravity":
HEAD:apps/madbridge/src/tui/keyboard-router.ts:166:        callbacks.onFocusChange("antigravity");
HEAD:apps/madbridge/src/tui/keyboard-router.ts:167:        return { ...state, focus: "antigravity" };
HEAD:apps/madbridge/src/tui/main.tsx:41:  const antigravity: ExecutionIdentity = {
HEAD:apps/madbridge/src/tui/main.tsx:42:    execution_id: "exec-antigravity",
HEAD:apps/madbridge/src/tui/main.tsx:44:    surface: parseSurfaceId("antigravity"),
HEAD:apps/madbridge/src/tui/main.tsx:59:    executions: [claude, antigravity],
HEAD:apps/madbridge/src/tui/main.tsx:88:    executions: [claude, antigravity],
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:1:// apps/madbridge/src/tui/panes/AntigravityPane.tsx
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:2:// Antigravity stage pane — projects the Antigravity execution surface.
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:5://   - "ANTIGRAVITY" label
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:7://   - "WRITER tok#N" only when Antigravity's execution_id === state.activeWriter
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:14:// Antigravity used border={true}).
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:27:export interface AntigravityPaneProps {
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:33:export function AntigravityPane({ active, state, ptyOutput }: AntigravityPaneProps) {
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:34:  const surface = "antigravity" as const;
HEAD:apps/madbridge/src/tui/panes/AntigravityPane.tsx:41:  const headerParts: string[] = ["ANTIGRAVITY"];
HEAD:apps/madbridge/src/tui/panes/ClaudePane.tsx:12:// Border: borderStyle="single" consistently (matches AntigravityPane).
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:62:  const agy = state.executions?.find((e) => e.surface === "antigravity");
HEAD:apps/madbridge/src/tui/panes/GovernancePane.tsx:81:  rows.push("Antigravity: " + (agy?.execution_id ?? "—"));
HEAD:apps/madbridge/src/tui/types.ts:13:export type FocusTarget = "claude" | "antigravity" | "governance" | "events";
HEAD:apps/madbridge/src/tui/keybindings.ts:4:// Override via FOUNDER_TUI_KEYS env var: "alt+1:focus-claude,alt+2:focus-antigravity,..."
HEAD:apps/madbridge/src/tui/keybindings.ts:13:// Alt+4 (antigravity) and Alt+5 (events); "focus-claude" and
HEAD:apps/madbridge/src/tui/keybindings.ts:23:  | "focus-antigravity"
HEAD:apps/madbridge/src/tui/keybindings.ts:40:  { key: "alt+4", action: "focus-antigravity" },
HEAD:apps/madbridge/test/pty-focus.test.tsx:62:    // Alt+1/2/3 are seat keys; antigravity moved to Alt+4, events to Alt+5.
HEAD:apps/madbridge/test/pty-focus.test.tsx:67:    expect(isGlobalAction("alt+4", bindings)).toBe(true);
HEAD:apps/madbridge/test/pty-focus.test.tsx:77:    expect(resolveKey("alt+4", bindings)).toBe("focus-antigravity");
HEAD:apps/madbridge/test/pty-focus.test.tsx:86:    process.env.FOUNDER_TUI_KEYS = "alt+a:focus-claude,alt+s:focus-antigravity";
HEAD:apps/madbridge/test/pty-focus.test.tsx:90:    expect(resolveKey("alt+s", bindings)).toBe("focus-antigravity");
```

The two source pins match line 30 and line 22 respectively

```text
0b329d97e88a13bd58902fe7dd1afe971d52c61bbf310862230465fd1fdd3553  packages/supervisor/src/build.ts
2faefe54d7c9be2051bce621629203072515263d58bc69b31bd2fe927faedb01  apps/madbridge/test/pty-focus.test.tsx
```

The A10 blobs for runtime-harness.ts, preflight.ts and preflight.test.ts are respectively 8e63d73f723c3fa7eea2e300c3e378e107957b0b, 2edb02c049dea7b65e5d546bdac35b0933eeb95b and 67f95abdcf8fa75f8c296bc8cbf4fb5e378ce214.

Precondition 4. Logs 016, 035 and 043 show the supervisor imports, live-module imports, callers and test seam names. Application imports of the supervisor entry point occur in live/composition.ts and live/subscribe.ts. Application call matches for the composer and subscriber are their definitions. Production has no importer of either broker module's test seams.

```text
HEAD:apps/madbridge/src/tui/live/composition.ts:6:  type PartialBuildState, type PreflightInput } from "../../../../../packages/supervisor/src/index";
HEAD:apps/madbridge/src/tui/live/subscribe.ts:3:import { waitForSnapshotTick } from "../../../../../packages/supervisor/src/index";
HEAD:packages/adapter-madv-surface/test/exit-causes.test.ts:7:import { runLiveTransactionalBuild, runPurePreflight } from "../../supervisor/src/index";
HEAD:test/phase3b/child-end.ts:6:import { runLiveTransactionalBuild, runPurePreflight } from "../../packages/supervisor/src/index";
HEAD:test/phase3b/offline.ts:5:import { rollbackBuild, type BuildResult, type LaunchPlan } from "../../packages/supervisor/src/index";
HEAD:test/phase3b/preflight-input.ts:5:import type { PreflightInput } from "../../packages/supervisor/src/index";
HEAD:test/phase3b/scenarios.ts:5:import { runPurePreflight, runLiveTransactionalBuild } from "../../packages/supervisor/src/index";
HEAD:test/phase3b/separation.test.ts:5:import { runTransactionalBuild } from "../../packages/supervisor/src/index";
HEAD:apps/madbridge/src/tui/live/composition.ts:7:import { settingsSources } from "./settings-sources";
HEAD:apps/madbridge/src/tui/live/settings-sources.ts:3:import { managedSettingsDirectory } from "./managed-settings";
HEAD:apps/madbridge/src/tui/live/subscribe.ts:5:import { clientSnapshotToProjection } from "./projection";
HEAD:scripts/phase3b/recorded-frames.tsx:8:import { composeLiveSession } from "../../apps/madbridge/src/tui/live/composition";
HEAD:scripts/phase3b/recorded-frames.tsx:9:import { clientSnapshotToProjection } from "../../apps/madbridge/src/tui/live/projection";
HEAD:test/phase3b/child-end.ts:5:import { createStartAttesters, composeLiveSession } from "../../apps/madbridge/src/tui/live/composition";
HEAD:test/phase3b/projection.test.ts:4:import { clientSnapshotToProjection as project } from "../../apps/madbridge/src/tui/live/projection";
HEAD:test/phase3b/scenarios.ts:4:import { composeLiveSession, createStartAttesters } from "../../apps/madbridge/src/tui/live/composition";
HEAD:test/phase3b/settings-sources.test.ts:4:import { managedSettingsDirectory } from "../../apps/madbridge/src/tui/live/managed-settings";
HEAD:test/phase3b/settings-sources.test.ts:5:import { settingsSources } from "../../apps/madbridge/src/tui/live/settings-sources";
HEAD:test/phase3b/subscribe.test.ts:3:import { subscribeToClient } from "../../apps/madbridge/src/tui/live/subscribe";
HEAD:apps/madbridge/src/tui/live/composition.ts:54:export async function composeLiveSession(start: Start): Promise<Result> {
HEAD:apps/madbridge/src/tui/live/subscribe.ts:7:export function subscribeToClient(client: BrokerClient) {
HEAD:scripts/phase3b/recorded-frames.tsx:17:    const outcome = await composeLiveSession({ ...f.start, async present(presented) {
HEAD:test/phase3b/child-end.ts:91:      const built = await composeLiveSession({ ...f.start, present: client => observeActive(client) });
HEAD:test/phase3b/scenarios.ts:58:      outcome = await composeLiveSession({ envelope: f.envelope, preflight: { ...f.input, signal: controller.signal },
HEAD:test/phase3b/scenarios.ts:124:    const starting = composeLiveSession({
HEAD:test/phase3b/subscribe.test.ts:44:  const off = subscribeToClient(source.client)(frame => { seen.push(frame); });
HEAD:test/phase3b/subscribe.test.ts:62:    const off = subscribeToClient(source.client)(frame => { seen.push(frame); });
HEAD:test/phase3b/subscribe.test.ts:78:    const off = subscribeToClient(source.client)(frame => { seen.push(frame); });
HEAD:test/phase3b/subscribe.test.ts:90:  const off = subscribeToClient(source.client)(frame => { seen.push(frame); });
HEAD:test/phase3b/subscribe.test.ts:99:  const stop = subscribeToClient(parked.client)(frame => { late.push(frame); });
```

```text
HEAD:packages/supervisor/test/build-rollback.test.ts:34:import * as supervisorIndex from "../src/index";
HEAD:packages/supervisor/test/live-port.test.ts:2:import { runLiveTransactionalBuild, type LiveReattestationInput } from "../src/index";
HEAD:packages/supervisor/test/snapshot-timer.test.ts:3:import { waitForSnapshotTick } from "../src/index";
(lines omitted)
HEAD:tsconfig.json:38:      "@madventures/supervisor": ["./packages/supervisor/src/index.ts"]
```

### Baseline

Log 023 installed 51 packages. Log 024 verified the lockfile at
a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830
before and after installation and restored the executable bit on
packages/founder-act/src/main.ts. The tree was clean. Log 025 completed
the no-emit type check with no diagnostic. Log 027 released the suite
at load 1.93. Log 031 began with load 1.67. Log 045 lists each test,
its full name and its result. All 2139 tests across 168 files passed.

```text
 2139 pass
 0 fail
 28427 expect() calls
Ran 2139 tests across 168 files. [279.25s]
```

## Task detail before implementation

### R1. Live output producer

Use a live-founder-only factory in in-process-client.ts, imported directly by
build.ts alone. Return the ordinary client and a private frame delivery
function separately to the build. Leave the generic public constructor and
package exports available to existing callers. Share the client's frame
admission and awaited interruption implementation with the raw test seam.
The build binds a per-execution callback carrying the session and the next
sequence, starting at one. The two adapters deliver output only after parser
consumption through their existing fact loops. The unit of a host fact is its
read, with attestation and monitor state observed at the handover. Keep one
parser, its partial line and its subscription. Exercise a mixed read explicitly.

Use a new test/phase3b/transport.ts helper and transport-stand-in.ts. Start
with the disposable M1 fixture, change its envelope's initial writer and
recompute its canonical hash. Install the authorized probe and stand-in
launchers in its private bin, with home-child storage and TMPDIR. Use real
production preflight, live build, host, attesters and client. Sequence tests
use a recorded fact observer only as an independent witness. Subsequent
requirements reuse this harness. No attestation message becomes pane output.

### R2. Buffer and App

Add apps/madbridge/src/tui/live/retention.ts. Keep frame boundaries and owned
bytes, evict oldest bytes/lines first, including a partial oldest frame where
needed. A retained frame has surviving bytes (or an empty frame marker).
Count CRLF once even across frames, lone CR and LF each once, and a nonempty
unterminated tail once. Keep independent cumulative and retained frame/byte
counts, with named limits of 10000 lines and 2097152 bytes. In App.tsx
subscribe once per bound execution to output, guard disposal and render from
independent retention buffers. Supply the raw client and projected snapshot
subscription as props. Only tests and the evidence script bind a client.
Keep the existing output path when absent. Show retained content in the dock
when a client supplies it. Use a scripted interleaved client to test routing.

### R3. Host dispatch

Extend the live-only constructor with dispatch to a build-owned bridge per
execution. Serialize input and resize for that execution. Check legality at
dispatch, copy mutable input bytes and use the current live host. Leave the
execution principals and unbridged clients on the baseline request path.
Reuse the production pending-ack registry, decoded-fact notifier, lifecycle
watch, monotonic clock and existing direct containment logic. In
pty-host-supervisor.ts register the kind before the write, arm a 250 ms
deadline and carry the original command timestamp into bypass containment.
Never restart a terminate acknowledgement window on an expired input or resize.
Start direct group and host kills within 500 ms. Interrupt with pty_host_failure.
Use the named existing 5-second outer bound in observation. In madv-surface
live.ts add a byte sender next to the text sender. It begins a parser request
and starts its evidence deadline before sending. Carry that callback privately
in the live build. Keep the text sender usable by child-end.ts. The extra
production timers are the command acknowledgement deadline in the supervisor
and the sender's evidence deadline in the adapter.

### R4. Line input

Add apps/madbridge/src/tui/live/line-buffer.ts. It imports the two encoders
by relative path from packages/adapter-claude-code/src/live.ts and
packages/adapter-madv-surface/src/index.ts. In App.tsx preserve the existing
keyboard router, consume focused-pane edits and submit one encoded line per
Enter. Empty buffers and nonsurface focus send nothing. Read the client snapshot
at submit, look up the focused surface's execution, and send one request with
session id, execution id and token. Display NO TOKEN for absence. For refusals
display the upper-case error code with spaces in place of underscores, including
STALE FENCING TOKEN, SESSION NOT WRITABLE, INCIDENT ACTIVE, UNAUTHORIZED,
INVALID DIMENSIONS, HOST UNAVAILABLE, INVALID COMMAND, SESSION MISMATCH,
EXECUTION NOT FOUND and INVARIANT FAILURE. Apply the same rule to the other
broker refusal codes. No automatic retries. Report actual content size from
each pane's layout callback. Cache last sent dimensions per execution.
Use a recording client for key and resize tests, a scripted refusing client
for the words, and the real client and child through App for usable input.

### R5. Second pane

Keep panes/AntigravityPane.tsx at its path and rename its exported component
MadvSurfacePane. Existing test/phase3b/absence.test.tsx imports it. Retain
Alt+4 and focus-antigravity. Use MADV-SURFACE for the stage and dock and MADV
for the tab. Change only the second pane's identity, labels, focus and bindings
in the enumerated presentation files. Preserve execution ids as opaque values,
including those provided by old tests. Preserve all base test and suite names.

### R6. Liveness and review findings

StatusBar.describeOwner and GovernancePane's writer/ownership presentation
use STREAM ENDED for a false connection. Audit both stages, DockStrip and their
shared agent-identity helper, which already use livenessWord. The projection,
subscriber, pacing helper and incident-evidence treatment stay as recorded.
EventLog rows are historical events. Exercise failed reads and closed clients
separately using subscribeToClient with a scripted snapshot reader. Cover
null and true, all token readers under both transfer kinds, and the actual
pacing promise settling before the interval after unsubscribe.

### R7. Malformed facts

Add unsafeTestOnlyInjectHostOutput in pty-host-supervisor.ts, off the barrel.
Connect its handle-keyed weak-map entry to the same byte accumulator before
decodeFact, preserving ordering with production reads and the existing pump
error path. Distinguish malformed payload and unknown tag, both surfaces,
after activation. Observe the monitor's actual failure report, interruption
row and client output. Never synthesize an interruption or replace the host.

### R8. Offline evidence

Write scripts/phase3b/m3-evidence.tsx using the shared test observations. Write
the ordered frames, acknowledged transport, usable input, both retention
limits, ended-stream presentations and malformed-frame observations under
evidence, hash them, and quote sanitized excerpts in the verification packet.
List the relative source imports of the line buffer and of all new test and
evidence modules alongside the pre-existing composition, subscribe and
export-evidence imports. Report that real surfaces have neither delivered a
frame nor received a line in M3.

### Existing tests

Under the pin exception, update only line 30 of
test/phase3a/harness-separation.test.ts with each build.ts change (R1 and R3).
The only allowed computed call remains host.handle.facts() followed by its
existing async-iterator invocation. The pinned focus test stays at its base
digest. Under the second-pane exception, replace the component/fixture
surface and its shown words at the applicable sites listed below. Leave test
titles, approval actors, model names, role values, key-action strings and
unrelated fixture evidence intact. For a B7 assertion requiring a previously
current writer only when disconnected, replace that expectation with the
liveness word and retain the assertion. Test 15 retains its original body.

```text
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:42:  surface: "claude-code" | "antigravity",
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:67:    executions: [makeExecution("claude-code"), makeExecution("antigravity")],
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:97:    actor: "antigravity",
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:114:    executions: [makeExecution("claude-code"), makeExecution("antigravity")],
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:131:      { seq: 2, type: "action_request", actor: "exec-antigravity", fencingToken: 2, hash: "def456", timestamp: "2026-08-08T12:05:00Z" },
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:170:    // antigravity is Alt+4 and events is Alt+5.
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:173:      antigravity: "4",
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:322:      expect(evt.actor).toBe("antigravity");
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:393:    process.env.FOUNDER_TUI_KEYS = "alt+1:focus-claude,alt+2:focus-antigravity,alt+3:focus-governance,alt+4:focus-events,alt+o:accept-approval,alt+x:reject-approval,alt+q:quit";
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:434:  test("12. Visible strip + Antigravity focus → inert", async () => {
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:437:    const setup = await renderApp(snapshot, 120, 34, "antigravity", {
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:501:    // Alt+1..4 pane-focus map moved: antigravity → Alt+4, events → Alt+5.
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:508:    expect(resolveKey("alt+4", bindings)).toBe("focus-antigravity");
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:808:      reviewStatus: { decision: "approved", comments: "LGTM", reviewedBy: "exec-antigravity", timestamp: "2026-08-08T12:35:00Z" },
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:816:      expect(frame).toContain("exec-antigravity");
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:825:      pendingTransfers: [{ id: "t1", from: "exec-claude-code", to: "exec-antigravity", reason: "handoff", fencingToken: 3, timestamp: "2026-08-08T12:20:00Z" }],
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:833:      expect(frame).toContain("exec-antigravity");
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:877:      expect(frame).toContain("ANTIGRAVITY");
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:898:    const setup = await renderApp(makeSnapshot({ activeWriter: "exec-claude-code", fencingToken: 3 }), 80, 24, "antigravity");
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:1049:    const setup = await renderApp(snapshot, 120, 34, "antigravity");
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:1086:    for (const focus of ["claude", "antigravity", "governance", "events"] as FocusTarget[]) {
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:1211:        reviewedBy: "exec-antigravity-with-very-long-name",
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:1231:        { execution_id: "exec-antigravity-gemini-pro-20250811-long-id", role: "independent-reviewer", surface: parseSurfaceId("antigravity"), model: "gemini-2.5-pro", provider: "google", independence_domain: "fixture-review-control", effort: "medium" },
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:1239:      expect(frame).toContain("Antigravity:");
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:1296:        actor: "exec-antigravity",
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:1358:        actor: "exec-antigravity",
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:1373:      // Actor field must be visible (compact label is fine, e.g. A:exec-antigravity)
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:1374:      expect(frame).toContain("exec-antigravity");
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:1394:        actor: "exec-antigravity-long-name",
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:1429:        actor: "exec-antigravity",
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:1480:    to: "exec-antigravity",
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:1496:    reviewedBy: "exec-antigravity",
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:1510:      expect(frame).toContain("exec-antigravity");
HEAD:apps/madbridge/test/tui-governance-surfaces.test.tsx:1544:      expect(frame).toContain("exec-antigravity");
HEAD:apps/madbridge/test/tui-truth-safety.test.tsx:70:        actor: "antigravity",
HEAD:apps/madbridge/test/tui-truth-safety.test.tsx:92:      { seq: 2, type: "action_request", actor: "exec-antigravity", fencingToken: 2, hash: "def456", timestamp: "2026-08-08T12:05:00Z" },
HEAD:apps/madbridge/test/tui-truth-safety.test.tsx:107:    actor: "antigravity",
HEAD:apps/madbridge/test/tui-truth-safety.test.tsx:540:      state: makeRouterState("antigravity"), snapshot: null, callbacks: cbs, bindings,
HEAD:apps/madbridge/test/tui-truth-safety.test.tsx:588:  test("Alt+Y from Antigravity focus emits nothing (no dialog)", () => {
HEAD:apps/madbridge/test/tui-truth-safety.test.tsx:592:      state: makeRouterState("antigravity"), snapshot: makeConnectedSnapshot(), callbacks: cbs, bindings,
HEAD:apps/madbridge/test/tui-truth-safety.test.tsx:636:  test("visible dialog + Antigravity focus emits nothing", () => {
HEAD:apps/madbridge/test/tui-truth-safety.test.tsx:640:      state: makeRouterState("antigravity", true, "approval-001"),
HEAD:apps/madbridge/test/tui-truth-safety.test.tsx:792:  test("validateApprovalResolution returns null for Antigravity focus", () => {
HEAD:apps/madbridge/test/tui-truth-safety.test.tsx:793:    const state = makeRouterState("antigravity", true, "approval-001");
HEAD:apps/madbridge/test/tui-truth-safety.test.tsx:908:    // Alt+1/2/3 switch seats; antigravity moved to Alt+4, events to Alt+5.
HEAD:apps/madbridge/test/tui-truth-safety.test.tsx:921:    expect(resolveKey(alt4, bindings)).toBe("focus-antigravity");
HEAD:apps/madbridge/test/tui-truth-safety.test.tsx:1124:  const focuses = ["CLAUDE", "ANTIGRAVITY", "GOVERNANCE", "EVENTS"];
HEAD:apps/madbridge/test/tui-truth-safety.test.tsx:1238:  test("visible dialog + Antigravity focus cannot resolve", async () => {
HEAD:apps/madbridge/test/tui-truth-safety.test.tsx:1251:      setup.mockInput.pressKey("4", { meta: true }); // Alt+4 = focus-antigravity
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:35:  surface: "claude-code" | "antigravity",
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:60:    executions: [makeExecution("claude-code"), makeExecution("antigravity")],
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:91:    executions: [makeExecution("claude-code"), makeExecution("antigravity")],
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:108:      { seq: 2, type: "action_request", actor: "exec-antigravity", fencingToken: 2, hash: "def456", timestamp: "2026-08-08T12:05:00Z" },
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:157:    // antigravity is Alt+4 and events is Alt+5.
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:160:      antigravity: "4",
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:176:  test("Claude focused produces a full-width Claude stage and an Antigravity dock", async () => {
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:183:      // Antigravity appears as a dock strip
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:184:      expect(frame).toContain("ANTIGRAVITY");
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:195:describe("2. Wide mode (120×34) Antigravity focus: reversed stage and dock", () => {
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:196:  test("Antigravity focused produces a full-width Antigravity stage and a Claude dock", async () => {
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:197:    const setup = await renderApp(makeSnapshot(), 120, 34, "antigravity");
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:201:      // Antigravity stage is visible
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:202:      expect(frame).toContain("ANTIGRAVITY");
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:217:  test("Antigravity focused while Claude remains WRITER tok#3", async () => {
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:218:    // activeWriter is exec-claude-code, focus is antigravity
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:219:    const setup = await renderApp(makeSnapshot(), 120, 34, "antigravity");
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:223:      // Antigravity is FOCUSED (stage)
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:234:    // Start with Claude as writer, Antigravity focused
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:253:      // Focus Antigravity
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:258:      // Claude dock has WRITER, Antigravity stage does not have WRITER badge
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:263:      // Now change activeWriter to exec-antigravity
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:265:        activeWriter: "exec-antigravity",
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:299:  test("Antigravity header shows reviewer role and gemini-2.5-pro model", async () => {
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:300:    const setup = await renderApp(makeSnapshot(), 120, 34, "antigravity");
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:413:      <DockStrip surface="antigravity" state={snapshot} ptyOutput={"line1\nline2\nline3\n"} />,
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:429:      <DockStrip surface="antigravity" state={snapshot} ptyOutput="" />,
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:445:      <DockStrip surface="antigravity" state={snapshot} ptyOutput="" />,
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:451:      expect(frame).toContain("ANTIGRAVITY");
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:461:    // Antigravity is docked AND is the active writer
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:462:    const snapshot = makeSnapshot({ activeWriter: "exec-antigravity", fencingToken: 7 });
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:464:      <DockStrip surface="antigravity" state={snapshot} ptyOutput="" />,
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:478:    // Claude is the writer, Antigravity is docked
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:481:      <DockStrip surface="antigravity" state={snapshot} ptyOutput="" />,
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:509:        { execution_id: "exec-antigravity", role: "independent-reviewer", surface: parseSurfaceId("antigravity"), model: "gemini-2.5-pro", provider: "google", independence_domain: "fixture-review-control", effort: "medium" },
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:517:    // Antigravity docked; Claude is still the retained activeWriter
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:519:      <DockStrip surface="antigravity" state={snapshot} ptyOutput={"alpha\nbeta\n"} />,
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:538:      <DockStrip surface="antigravity" state={snapshot} ptyOutput={"alpha\nbeta\n"} />,
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:558:    // Antigravity is docked AND is the retained activeWriter, but disconnected
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:560:      activeWriter: "exec-antigravity",
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:564:      <DockStrip surface="antigravity" state={snapshot} ptyOutput={"one\ntwo\nthree\n"} />,
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:625:  test("80 cols: Antigravity focused while Claude remains writer → Claude dock shows WRITER on one row", async () => {
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:626:    // Scenario: Antigravity is the stage (focused), Claude is docked, and
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:653:  test("80 cols: Claude docked while Antigravity is writer fits one row", async () => {
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:655:      activeWriter: "exec-antigravity",
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:678:  test("80 cols: Antigravity docked while Antigravity is writer fits one row", async () => {
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:680:      activeWriter: "exec-antigravity",
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:684:      <DockStrip surface="antigravity" state={snapshot} ptyOutput={"one\ntwo\n"} />,
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:692:      expect(rows[0]).toContain("ANTIGRAVITY");
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:702:      const line = buildDockLine("antigravity", makeSnapshot({ activeWriter: "exec-claude-code", fencingToken: 3 }), "alpha\nbeta\n", w);
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:714:      "antigravity",
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:718:          { ...makeExecution("antigravity"), model: cjkModel },
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:725:    expect(line).toContain("ANTIGRAVITY");
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:743:          { ...makeExecution("antigravity"), model: "gemini-2.5-pro" },
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:755:    const line = buildDockLine("antigravity", makeSnapshot(), "x\n", 80);
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:756:    expect(line).toContain("ANTIGRAVITY");
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:782:  test("Antigravity focused: AGY carries the * marker", async () => {
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:783:    const setup = await renderApp(makeSnapshot(), 60, 24, "antigravity");
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:798:    for (const focus of ["claude", "antigravity", "governance", "events"] as FocusTarget[]) {
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:832:  test("Antigravity focused: Antigravity visible, Claude stage absent", async () => {
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:833:    const setup = await renderApp(makeSnapshot(), 60, 24, "antigravity");
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:837:      expect(frame).toContain("ANTIGRAVITY");
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:942:  test("narrow Antigravity focused: identical frames", async () => {
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:944:    const setup1 = await renderApp(snapshot, 60, 24, "antigravity");
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:953:    const setup2 = await renderApp(snapshot, 60, 24, "antigravity");
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1038:    const setup = await renderApp(makeSnapshot(), 80, 24, "antigravity");
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1053:  test("Antigravity focused, Claude docked (writer): dock on one row", async () => {
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1056:      80, 24, "antigravity",
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1070:  test("Claude focused, Antigravity docked (writer): dock on one row", async () => {
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1072:      makeSnapshot({ activeWriter: "exec-antigravity", fencingToken: 5 }),
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1079:      const dockRows = rows.filter((r) => r.includes("ANTIGRAVITY") && r.includes("docked"));
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1088:  test("Antigravity focused while Claude is writer: AGY line has FOCUSED, Claude line has WRITER tok#3", async () => {
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1091:      120, 34, "antigravity",
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1097:      // The Antigravity (stage) line contains FOCUSED
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1098:      const agyLine = rows.find((r) => r.includes("ANTIGRAVITY"));
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1112:  test("reversed: after activeWriter changes, Claude line has FOCUSED (no WRITER), Antigravity dock has WRITER tok#9", async () => {
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1113:    // Claude focused, Antigravity is the writer
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1115:      makeSnapshot({ activeWriter: "exec-antigravity", fencingToken: 9 }),
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1122:      // Claude (stage) has FOCUSED but is NOT the writer (Antigravity is)
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1127:      // Antigravity (dock) has WRITER tok#9 but is NOT focused
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1128:      const agyDock = rows.find((r) => r.includes("ANTIGRAVITY") && r.includes("docked"));
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1156:  test("Antigravity focused → AGY* (exact)", async () => {
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1157:    const setup = await renderApp(makeSnapshot(), 60, 24, "antigravity");
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1288:      activeWriter: "exec-antigravity",
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1292:      <DockStrip surface="antigravity" state={snapshot} ptyOutput={"a\nb\nc\nd\n"} />,
HEAD:test/phase3b/absence.test.tsx:10:import { AntigravityPane } from "../../apps/madbridge/src/tui/panes/AntigravityPane";
HEAD:test/phase3b/absence.test.tsx:55:  for (const surface of ["claude-code", "antigravity"] as const) {
HEAD:test/phase3b/absence.test.tsx:56:    const Pane = surface === "claude-code" ? ClaudePane : AntigravityPane;
HEAD:test/phase3b/absence.test.tsx:68:  expect(governance).toContain("Antigravity: —");
HEAD:test/phase3b/absence.test.tsx:75:  for (const surface of ["claude-code", "antigravity"] as const) {
HEAD:test/phase3b/absence.test.tsx:76:    const Pane = surface === "claude-code" ? ClaudePane : AntigravityPane;
HEAD:test/phase3b/absence.test.tsx:83:  for (const surface of ["claude-code", "antigravity"] as const) {
HEAD:test/phase3b/absence.test.tsx:87:    const Pane = surface === "claude-code" ? ClaudePane : AntigravityPane;
(lines omitted)
HEAD:apps/madbridge/test/tui-truth-safety.test.tsx:208:    const line = buildStatusLine({ ...baseInput, connected: false, width: 80 });
(lines omitted)
HEAD:apps/madbridge/test/tui-truth-safety.test.tsx:213:    const line = buildStatusLine({ ...baseInput, connected: false, width: 120 });
(lines omitted)
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:503:      connected: false,
(lines omitted)
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1250:      connected: false,
(lines omitted)
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1270:      connected: false,
(lines omitted)
HEAD:apps/madbridge/test/tui-writers-stage.test.tsx:1287:      connected: false,
```

### Tests and deliberate breaks by requirement

All new test files below are in test/phase3b. Each named test covers all cases
listed for it; a break is checked with its own file. Live tests use the
corresponding writer envelope for each surface.

| Commit | B18 | File and test | Deliberate break |
| --- | --- | --- | --- |
| R1 | 3 | producer.test.ts — the live producer delivers contiguous monitor facts for each execution and excludes attestation | Start outputSeq at zero. Deliver attestation output. |
| R1 | 3 | producer.test.ts — a refused output sequence interrupts the live session | Bypass the shared sequence check for a gap. |
| R1 and R7 | 4 | m3-separation.test.ts — production imports no private broker test seam | Plant a production import of the test frame producer, then of the host injection seam. |
| R2 | 1 | retention.test.tsx — interleaved output reaches each pane and dock in host order | Swap execution streams. Reverse two same-execution frames. |
| R2 | 2 | retention.test.tsx — the line cap drops oldest content and counts received and retained frames and bytes | Raise the line cap. Drop newest content. |
| R2 | 2 | retention.test.tsx — the byte cap retains the newest bytes including a partial frame | Raise the byte cap. Omit a retained count update. |
| R3 | 6 | dispatch.test.ts — both host commands reach the child and wait for the matching ack | Return success before the acknowledgement. |
| R3 | 6 | dispatch.test.ts — a missed acknowledgement contains the stopped host and interrupts the session | Suppress deadline escalation. |
| R3 | 6 | dispatch.test.ts — execution clients and the original build have no host bridge | Install a bridge on an execution client. Make an unbridged request write. |
| R3 | 7 | dispatch.test.ts — the madv byte sender begins a checked request and refuses a closed monitor | Skip beginRequest. Accept a closed sender. |
| R4 | 5 | line-input.test.tsx — only Enter submits one encoded focused line and other focus sends nothing | Send before Enter. Send an empty line. |
| R4 | 5 | line-input.test.tsx — only the active focused writer resizes at a changed pane size | Resize the nonwriter. |
| R4 | 6, 8 | usable-input.test.tsx — each submitted stream-json line produces a checked stand-in response in its pane | Send raw text. |
| R4 | 6 | usable-input.test.tsx — a nonwriter submission is unauthorized in its pane and never reaches the child | Display acceptance for the refusal. |
| R4 | 9 | line-input.test.tsx — each refusal is shown once without retry and no token sends nothing | Retry a refusal. Render a refusal as success. |
| R5 | 10 | madv-pane.test.tsx — Alt+4 focuses the madv-surface execution | Focus Claude or display its execution in the second pane. |
| R6 | 11 | ended-stream.test.tsx — failed and closed streams replace current authority in every reader | Present the retained writer as current. |
| R6 | 13 | ended-stream.test.tsx — transfer-requested and sender-released show a null token as absence | Render null as #0 during transfer. |
| R6 | 14 | pacing-settlement.test.ts — unsubscribe settles the pending pacing wait before its deadline | Leave the pacing wait pending. |
| R7 | 12 | malformed-host.test.ts — malformed payloads and unknown tags interrupt each live monitor without client bytes | Discard the injected input before decodeFact. Deliver malformed bytes to the client. |

### Source reads and baseline log receipts

The first uptime reading below is the one-minute load. The full reading,
command and status are in each log. UTC timestamps are included when logged.
Logs 015, 019, 036 and 041 include unsuccessful searches; 016 corrected
the quoting of the first importer search. The other three found no match at
the last search or a CLI-to-TUI search; subsequent logs record their independent
checks. Two unparsed orchestration inputs started no command and used no number.

001-governed-version.log — 13:30  1 user, load averages: 3.76 3.51 3.07 — exit status 0. SHA-256 fa773e41c5b0fd2c3dd07e474c25f88a69f90769ac1ddc8fc21ab5ccb72b8379.

002-pwd.log — 13:30  1 user, load averages: 3.58 3.48 3.06 — exit status 0. SHA-256 2714029ba79c6530b471fe4a2be29eaef8e42722d04940ef324e0c8cfb9c6944.

003-branch.log — 13:30  1 user, load averages: 3.58 3.48 3.06 — exit status 0. SHA-256 5b55a9203fe88e1de7fbd94c26c744100a3acb16d7568901661396d0b675db8e.

004-head.log — 13:30  1 user, load averages: 3.58 3.48 3.06 — exit status 0. SHA-256 56617146925cadce7cc36f869bf3c2d6af3c5f071c83b0a6c5ee65779e2187b3.

005-name.log — 13:30  1 user, load averages: 3.58 3.48 3.06 — exit status 0. SHA-256 6692310e65f01cb414f166dbf467b8fda9971a4ceb32dbe62c7be1c3ac1a9f53.

006-email.log — 13:30  1 user, load averages: 3.58 3.48 3.06 — exit status 0. SHA-256 075301411f66237af294cc7b4545ccc04b7ec95f69a062301a55bf021f1c0fe8.

007-runtime.log — 13:31  up 6 days,  4:59, 1 user, load averages: 2.48 3.21 2.99 — Fri Nov 27 18:31:39 UTC 2026 / Fri Nov 27 18:31:39 UTC 2026 — exit status 0. SHA-256 f322ede4f380200c8c74ceb3085a8de85c6ed56240ac1b817dc1177f29010997.

008-base.log — 13:31  1 user, load averages: 2.25 3.10 2.96 — exit status 0. SHA-256 c0b56cd9002ebac41d7ba30ed9b917b35572368dd91de82703f222eae5ec4c4a.

009-inventories.log — 13:31  1 user, load averages: 2.25 3.10 2.96 — exit status 0. SHA-256 5054526cb937e3c1ef2dfc74ec714607d592b89edee4fdbed590dbedbe9a8c60.

010-m3-act.log — 13:32  1 user, load averages: 2.23 3.08 2.95 — exit status 0. SHA-256 3f9f45cf6ccb7f474c224b8695826c89218330db3f55161d71eb375f962154a9.

011-authority-hashes.log — 13:33  1 user, load averages: 1.65 2.77 2.84 — exit status 0. SHA-256 84b061d32f6a2cb0bdb60143de6324b0ea3b24de0068666d89c372f77bda9f33.

012-authority-texts.log — 13:33  1 user, load averages: 1.76 2.76 2.84 — exit status 0. SHA-256 8ff0df231dc0fecb5e9f713b94f1b20564963706f2f999556c90295315b16bea.

013-commission-lines.log — 13:33  1 user, load averages: 1.64 2.71 2.82 — exit status 0. SHA-256 1e722c491543a8f709f9254cf885c74be15e6843549ac081d74067c3d37f8df2.

014-base-lines.log — 13:33  1 user, load averages: 1.72 2.66 2.80 — exit status 0. SHA-256 71dd2c5314bf3476003a2f6fc0c4a980af1706c63bf0e20d65b6404f84ed26e9.

015-imports.log — 13:33  1 user, load averages: 1.23 2.48 2.73 — exit status 1. SHA-256 6e4bf333254618dc0f8b3f772c4963819db1af6e6d733d5fdec653a7254391a4.

016-imports.log — 13:34  1 user, load averages: 1.27 2.45 2.72 — exit status 0. SHA-256 0e69bb82833903b724c7be8bc277c3de3f1832ca5e5af2dad6a56edb352bc164.

017-base-implementation.log — 13:34  1 user, load averages: 1.93 2.50 2.72 — exit status 0. SHA-256 1bfad3bdf759b6d341a0a6051bd8688901bff047ea92ea783aa7c214e5f2e6d7.

018-anchors.log — 13:34  1 user, load averages: 1.95 2.48 2.71 — exit status 0. SHA-256 8b0be6eb20d5626a7ab5506c9007faa188ee6d8b4246ff4d883ad292bdb0eae8.

019-dispatch-base.log — 13:34  1 user, load averages: 2.11 2.50 2.72 — exit status 1. SHA-256 6fa640ccc89e660ec91ff588e6a560539c7b0b03d9e28121340403f3c27e3652.

020-preflight-review.log — 13:35  1 user, load averages: 2.02 2.47 2.71 — exit status 0. SHA-256 357f32b88660f0a9f30dfd1dff1ea1aa7145815d3c9f93243f396f59990924c2.

021-snapshot-base.log — 13:35  1 user, load averages: 2.50 2.56 2.73 — exit status 0. SHA-256 f5fbd5c7abba90513e032255f00707e34e31c9cbd49a3582a04395066ed685e4.

022-writer-fixtures.log — 13:35  1 user, load averages: 2.35 2.52 2.72 — exit status 0. SHA-256 7f93c1e415c519b9fd39f0c3031ac2a7e8249f00efc56c4d6770fd4634f940d5.

023-baseline-install.log — 13:37  up 6 days,  5:05, 1 user, load averages: 2.48 2.54 2.70 — Fri Nov 27 18:37:28 UTC 2026 / Fri Nov 27 18:37:28 UTC 2026 — exit status 0. SHA-256 8aca2e29a721f36542ff9b3d51000b93d29b8747e1fa291bb5cc7161323b647d.

024-install-tree.log — 13:37  1 user, load averages: 2.48 2.54 2.70 — exit status 0. SHA-256 fa9c679c98c6e0c377d96077d60349392a22ab6cecb78e81cbfad5eb19727655.

025-baseline-typecheck.log — 13:37  up 6 days,  5:05, 1 user, load averages: 2.76 2.59 2.71 — Fri Nov 27 18:37:54 UTC 2026 / Fri Nov 27 18:37:58 UTC 2026 — exit status 0. SHA-256 ac89afc7e81ff3b6947156cb6e15ee3eb46b946b175395017cc04ad3a8011da1.

026-suite-runtime.log — 13:39  up 6 days,  5:07, 1 user, load averages: 2.48 2.53 2.67 — Fri Nov 27 18:39:28 UTC 2026 / Fri Nov 27 18:39:29 UTC 2026 — exit status 0. SHA-256 88c66db5be8d852be8bf7dd41a6aa1a0eb8eed75e830effee7d6ee5cfbf3c404.

027-baseline-wait.log — 13:39  1 user, load averages: 2.39 2.51 2.66 — Fri Nov 27 18:39:37 UTC 2026 / Fri Nov 27 18:40:07 UTC 2026 — exit status 0. SHA-256 4dffd18ee7885f28dcc502066dae49de78db9a8bd163dfe8628bde46139b47da.

028-task-design.log — 13:39  1 user, load averages: 2.34 2.50 2.65 —   1189	}exit status 0. SHA-256 c3b188d41ff8ccddf0664b934df5d219a9173d4a4cc6761ff99843dc259ff080.

029-handover.log — 13:40  1 user, load averages: 2.28 2.48 2.64 — exit status 0. SHA-256 6814278faa2342610f6986b87439dd5364749aac41fc2bbe8f90602a973c5261.

030-reader-base.log — 13:40  1 user, load averages: 1.93 2.40 2.61 — exit status 0. SHA-256 a8c7a828b861daa1e7c1f7d11649e12c288a1aca6dd90355bfb5111264dcc28b.

031-baseline-test.log — 13:40  up 6 days,  5:08, 1 user, load averages: 1.67 2.26 2.55 — Fri Nov 27 18:40:56 UTC 2026 / Fri Nov 27 18:45:35 UTC 2026 — exit status 0. SHA-256 77576fb28d74bc68227619d41f2f69ce3deb4565fc7b7f4633ea5df75c229431.

032-pane-design.log — 13:41  1 user, load averages: 1.82 2.26 2.54 — exit status 0. SHA-256 aaba5060e42a3f21891120fc18dc576f9b1170fa971a138e0c93d2169215c294.

033-reader-coverage.log — 13:41  1 user, load averages: 1.78 2.23 2.53 — exit status 0. SHA-256 efc3cb7645187de30408f28388f4509d4b43b99be9f5234eaf8951362f4d9368.

034-broker-design.log — 13:41  1 user, load averages: 1.97 2.26 2.54 — exit status 0. SHA-256 83d9a36fbeb201d2e89ba33515ff92ca95d3eabbfe410fba81f5704cd208a0ae.

035-separation-review.log — 13:41  1 user, load averages: 2.20 2.30 2.54 — exit status 0. SHA-256 0ee7e4807ba7e128fc1131467db449b1eb3353c6eff8d3314f1150c6f201f05d.

036-existing-readers.log — 13:42  1 user, load averages: 2.58 2.43 2.58 — exit status 1. SHA-256 27ef1c010d9c2b3a9641a57ddc3b86ba76272d2b588e92f0fa5ad242818689a4.

037-fixture-design.log — 13:42  1 user, load averages: 2.56 2.43 2.58 — exit status 0. SHA-256 5e971d5c5604c27ad2ba4997518bd899f4d70b3886fc75a517fe85bccb428b7f.

038-work-folder.log — 13:43  1 user, load averages: 3.21 2.59 2.63 — exit status 0. SHA-256 826fdf850f1a6a0abf24ca19644823a2859cb5612f9e34cf7ff9fc30f9412824.

039-teardown-sizing.log — 13:43  1 user, load averages: 3.55 2.72 2.68 — exit status 0. SHA-256 e2c29422b6d82639dd3bab0ed3b4bbaef9d40891841c745ee39177739aeee9fb.

040-focus-expectations.log — 13:43  1 user, load averages: 3.72 2.80 2.70 — exit status 0. SHA-256 a1b9446ceb1c1e7d049f537ce97eae5bb58aa8f414e3f5bab6712e8be761240f.

041-plan-clauses.log — 13:44  1 user, load averages: 3.11 2.72 2.67 — exit status 1. SHA-256 37501c75a8793cb80fea8ce90b859c1eea7ec2692d3c64186992ccfd5941f6e0.

042-admission-rules.log — 13:44  1 user, load averages: 3.01 2.71 2.67 — exit status 0. SHA-256 94493b8879a7f0ac19ced7784e6b968876b1bdd4e4b7022c56ead1c53eccb21d.

043-relative-imports.log — 13:45  1 user, load averages: 2.30 2.58 2.63 — exit status 0. SHA-256 669eb2b3f49cd89fd07bc5d85be779d2895f728398829155170a3ea341aae424.

044-presentation-rules.log — 13:45  1 user, load averages: 2.41 2.59 2.63 — exit status 0. SHA-256 33b4905fd7af2d942404a1d9b7353a39d8ce98e973374d8b46527859ea6cb3d0.

045-base-list.log — 13:45  1 user, load averages: 2.63 2.64 2.65 — exit status 0. SHA-256 97b0a672be6ef2657f92aa750eb8075bcf76167e0c7d562bd08763b211172a1a.

046-log-helper.log — 13:46  1 user, load averages: 1.95 2.45 2.58 — exit status 0. SHA-256 656045d7bbed052b842ba0e8103ac980c0087b9b63fe78314bf133a578e9fa8d.

047-base-test-sites.log — 13:46  1 user, load averages: 2.09 2.42 2.56 — exit status 0. SHA-256 7ce6f643439ab6e108f649fb20f7b66bc765661697e6ec1edd7024f089cb2988.
