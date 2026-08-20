import { expect, test } from "bun:test";
import {
  DEADLINES_MS,
  SPIKE_CRITERIA,
  runSpike,
  type SpikeCriterion,
  type SpikeResult,
} from "./bun-terminal-spike";

/**
 * Task 38 — the six named tests over the Bun.Terminal dual-host spike
 * (plan Task 38 Step 1, contract §8). One execution of runSpike() feeds all
 * six; each test verifies a different slice of the same observed run.
 */

const SPEC_SET: readonly SpikeCriterion[] = [
  "pty_tty_allocation",
  "exact_binary_io",
  "resize_propagation",
  "process_group_and_signals",
  "child_and_grandchild_termination",
  "two_ptys_plus_adapter_no_leak",
  "supervisor_exit_modes",
  "lifeline_eof",
  "pty_host_death",
  "sigstop_wedged_direct_pgid",
  "child_ignores_sigterm",
  "clean_exit_reporting",
  "measured_timing",
];

/** Q2: exactly these four members carry non-empty sub-assertion maps. */
const COMPOUND_KEYS: Readonly<Record<string, readonly string[]>> = {
  process_group_and_signals: [
    "pgid_equals_child_pid",
    "distinct_from_fixture_host_group",
    "distinct_from_driver_group",
    "sigterm_to_group_observed",
    "sigkill_to_group_clears_group",
  ],
  child_and_grandchild_termination: [
    "group_had_child_and_grandchild",
    "child_gone_after_group_signal",
    "grandchild_gone_after_group_signal",
    "within_outer_bound",
  ],
  two_ptys_plus_adapter_no_leak: [
    "adapter_holds_no_pty_descriptor",
    "closing_terminal_a_kills_only_its_reader",
    "terminal_b_independent_after_a_close",
    "adapter_unaffected_by_terminal_closures",
    "no_pty_descriptor_survives_cleanup",
  ],
  supervisor_exit_modes: [
    "clean_exit_ladder",
    "crash_sigabrt_orphans_detected_and_swept",
    "sigterm_handled_ladder_runs",
    "sigkill_orphans_detected_and_swept",
  ],
};

/** Contract §6: the WEDGE machine segment of the wedge result's detail. */
const WEDGE_RE =
  /^WEDGE ack_window_ms=(\d+) ack_seen=(true|false) escalation_start_ms=(\d+) group_clear_ms=(\d+) total_ms=(\d+) host_killed_after_group=(true|false)(?:\s|$)/;

/** Contract §6: the SWEEP machine segment of measured_timing's detail. */
const SWEEP_RE =
  /^SWEEP registry_live_after_cleanup=(\d+) decoy_spawned=(true|false) decoy_survived_cleanup=(true|false)(?:\s|$)/;

/** Killing scenarios, §7.4–§7.11: each must record a total within the outer bound. */
const KILLING: readonly SpikeCriterion[] = [
  "process_group_and_signals",
  "child_and_grandchild_termination",
  "two_ptys_plus_adapter_no_leak",
  "supervisor_exit_modes",
  "lifeline_eof",
  "pty_host_death",
  "sigstop_wedged_direct_pgid",
  "child_ignores_sigterm",
];

const results: readonly SpikeResult[] = await runSpike();

function resultFor(criterion: SpikeCriterion): SpikeResult {
  const found = results.find((r) => r.criterion === criterion);
  if (!found) throw new Error(`runSpike() returned no result for ${criterion}`);
  return found;
}

test("the spike covers exactly the thirteen specification demonstrations", () => {
  expect(SPIKE_CRITERIA.length).toBe(13);
  expect([...SPIKE_CRITERIA].sort()).toEqual([...SPEC_SET].sort());
  expect(results.length).toBe(SPIKE_CRITERIA.length);
  for (let i = 0; i < SPIKE_CRITERIA.length; i += 1) {
    const member = SPIKE_CRITERIA[i];
    if (!member) throw new Error(`SPIKE_CRITERIA[${i}] missing`);
    const r = results[i];
    if (!r) throw new Error(`results[${i}] missing`);
    expect(r.criterion).toBe(member);
    expect(Number.isFinite(r.observedMs)).toBe(true);
  }
});

test("every compound criterion reports each sub-assertion individually", () => {
  for (const r of results) {
    const keys = Object.keys(r.subAssertions);
    if (COMPOUND_KEYS[r.criterion]) {
      expect(keys.sort()).toEqual([...(COMPOUND_KEYS[r.criterion] as readonly string[])].sort());
      expect(Object.values(r.subAssertions).every(Boolean)).toBe(true);
      expect(r.pass).toBe(true);
    } else {
      expect(keys).toEqual([]);
      expect(r.subAssertions).toEqual({});
      expect(r.pass).toBe(true);
    }
  }
});

test("host acknowledgement is within 250 ms", () => {
  const binary = resultFor("exact_binary_io");
  expect(binary.observedMs).toBeLessThanOrEqual(DEADLINES_MS.ack);
  expect(binary.pass).toBe(true);
});

test("all governed processes are gone within 5000 ms", () => {
  for (const criterion of KILLING) {
    const r = resultFor(criterion);
    expect(Number.isFinite(r.observedMs)).toBe(true);
    expect(r.observedMs).toBeLessThanOrEqual(DEADLINES_MS.outerBound);
  }
  const sweep = resultFor("measured_timing").detail;
  const m = SWEEP_RE.exec(sweep);
  if (!m) throw new Error(`SWEEP segment missing or malformed: ${sweep.slice(0, 120)}`);
  expect(Number(m[1])).toBe(0);
  expect(m[2]).toBe("true");
  expect(m[3]).toBe("true");
});

test("a SIGSTOP-wedged host earns no child grace", () => {
  const wedge = resultFor("sigstop_wedged_direct_pgid").detail;
  const m = WEDGE_RE.exec(wedge);
  if (!m) throw new Error(`WEDGE segment missing or malformed: ${wedge.slice(0, 160)}`);
  expect(Number(m[1])).toBe(DEADLINES_MS.ack);
  expect(m[2]).toBe("false");
  expect(Number(m[3])).toBeLessThanOrEqual(DEADLINES_MS.escalation);
  expect(Number(m[5])).toBeLessThan(DEADLINES_MS.responsiveChildGrace);
  expect(m[6]).toBe("true");
  expect(Number.isFinite(Number(m[4]))).toBe(true);
});

test("two PTYs plus an adapter leak no write end", () => {
  const leak = resultFor("two_ptys_plus_adapter_no_leak");
  const sub = leak.subAssertions;
  expect(sub["adapter_holds_no_pty_descriptor"]).toBe(true);
  expect(sub["closing_terminal_a_kills_only_its_reader"]).toBe(true);
  expect(sub["terminal_b_independent_after_a_close"]).toBe(true);
  expect(sub["adapter_unaffected_by_terminal_closures"]).toBe(true);
  expect(sub["no_pty_descriptor_survives_cleanup"]).toBe(true);
});
