"""Tests for the gate execution engine (skips, conditionals, evidence bounding)."""
import shlex
import sys
import time
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "scripts"))

from build_gate.engine import (  # noqa: E402
    EVIDENCE_HEAD_CHARS,
    EVIDENCE_MAX_CHARS,
    EVIDENCE_TRUNCATION_MARKER,
    any_failed,
    bound_evidence,
    discover_gates,
    run_all_gates,
)
from build_gate.types import GateResult  # noqa: E402


class TestEngine(unittest.TestCase):
    def _profile(self, **overrides):
        base = {
            "profile": "t",
            "gates": [
                {"id": "G1", "command": "true", "required_env": ["REQUIRED_VAR"]},
                {"id": "G2", "command": "true", "conditional_on": "G1"},
                {"id": "G3", "command": "false"},
            ],
        }
        base.update(overrides)
        return base

    def test_required_env_skip(self):
        profile = self._profile()
        results = run_all_gates(profile, ".", env={})
        self.assertTrue(results["G1"].skipped)
        self.assertIn("REQUIRED_VAR", results["G1"].skip_reason)

    def test_required_env_present_runs(self):
        profile = self._profile()
        results = run_all_gates(profile, ".", env={"REQUIRED_VAR": "1"})
        self.assertFalse(results["G1"].skipped)
        self.assertTrue(results["G1"].passed)

    def test_conditional_on_skipped_when_dep_missing(self):
        # Without REQUIRED_VAR, G1 is skipped -> G2 conditional not satisfied.
        profile = self._profile()
        results = run_all_gates(profile, ".", env={})
        self.assertTrue(results["G2"].skipped)

    def test_conditional_on_runs_when_dep_passes(self):
        profile = self._profile()
        results = run_all_gates(profile, ".", env={"REQUIRED_VAR": "1"})
        self.assertFalse(results["G2"].skipped)
        self.assertTrue(results["G2"].passed)

    def test_failing_gate_reported(self):
        profile = self._profile()
        results = run_all_gates(profile, ".", env={"REQUIRED_VAR": "1"})
        self.assertFalse(results["G3"].passed)
        self.assertEqual(results["G3"].exit_code, 1)

    def test_required_env_skip_fails_command_decision(self):
        profile = self._profile()
        results = run_all_gates(profile, ".", env={})
        self.assertTrue(results["G1"].skipped)
        self.assertTrue(any_failed(results))

    def test_timeout_is_a_failed_gate(self):
        started = time.monotonic()
        profile = self._profile(
            gates=[
                {
                    "id": "SLOW",
                    "command": (
                        f"{shlex.quote(sys.executable)} -c 'import time; time.sleep(1)' & wait"
                    ),
                    "timeout_seconds": 0.01,
                }
            ]
        )

        result = run_all_gates(profile, ".")["SLOW"]

        self.assertFalse(result.passed)
        self.assertEqual(result.exit_code, -1)
        self.assertIn("timed out", result.evidence)
        self.assertLess(time.monotonic() - started, 0.5)

    def test_command_receives_supplied_environment(self):
        profile = self._profile(
            gates=[
                {
                    "id": "ENV",
                    "command": (
                        f"{shlex.quote(sys.executable)} -c "
                        "'import os, sys; sys.exit(os.getenv(\"GATE_ENV\") != \"set\")'"
                    ),
                }
            ]
        )

        result = run_all_gates(profile, ".", env={"GATE_ENV": "set"})["ENV"]

        self.assertTrue(result.passed, result.evidence)

    def test_nonzero_success_exit_codes_are_rejected(self):
        profile = self._profile(
            gates=[{"id": "CUSTOM", "command": "false", "pass_exit_codes": [1]}]
        )

        with self.assertRaisesRegex(ValueError, "pass_exit_codes"):
            discover_gates(profile)

    def test_gate_id_and_command_must_be_non_empty_strings(self):
        for gate in (
            {"id": "", "command": "true"},
            {"id": "BAD", "command": None},
        ):
            with self.subTest(gate=gate):
                with self.assertRaisesRegex(ValueError, "non-empty string"):
                    discover_gates(self._profile(gates=[gate]))

    def test_duplicate_gate_ids_are_rejected(self):
        profile = self._profile(
            gates=[
                {"id": "DUP", "command": "false"},
                {"id": "DUP", "command": "true"},
            ]
        )

        with self.assertRaisesRegex(ValueError, "duplicate gate id"):
            discover_gates(profile)


class TestEvidenceBounding(unittest.TestCase):
    """Stored evidence stays bounded but keeps the tail, where test runners
    report failure identity and aggregate counts."""

    LONG = EVIDENCE_MAX_CHARS * 3
    TRAILING_IDENTITY = "(fail) synthetic > TRAILING_FAILURE_MARKER [1.0ms]"
    TRAILING_SUMMARY = " 1 fail"

    def _long_output(self) -> str:
        lines = [f"(pass) synthetic > earlier passing case {i} [0.1ms]" for i in range(400)]
        body = "\n".join(lines)
        self.assertGreater(len(body), self.LONG)
        return body

    def _runner_gate(self, gate_id: str, exit_code: int) -> dict:
        # Synthetic runner: 400 passing lines, then a failure block and a
        # summary at the tail. Deterministic; no product test involved.
        script = (
            "import sys\n"
            "for i in range(400): print(f'(pass) synthetic > earlier passing case {i} [0.1ms]')\n"
            "print('error: expect(received).toBe(expected)')\n"
            f"print({self.TRAILING_IDENTITY!r})\n"
            "print(' 400 pass')\n"
            f"print({self.TRAILING_SUMMARY!r})\n"
            "print('Ran 401 tests across 1 file.')\n"
            f"sys.exit({exit_code})\n"
        )
        return {
            "id": gate_id,
            "command": f"{shlex.quote(sys.executable)} -c {shlex.quote(script)}",
        }

    def test_short_output_is_stored_unchanged(self):
        short = "bun test v1.0.0\n 12 pass\n 0 fail"
        self.assertEqual(bound_evidence(short), short)
        self.assertEqual(bound_evidence(""), "")
        exact = "x" * EVIDENCE_MAX_CHARS
        self.assertEqual(bound_evidence(exact), exact)

    def test_short_output_round_trips_through_a_gate(self):
        profile = {
            "profile": "t",
            "gates": [{"id": "SHORT", "command": "printf 'alpha\\nbeta\\n'"}],
        }
        result = run_all_gates(profile, ".")["SHORT"]
        self.assertEqual(result.evidence, "alpha\nbeta")
        self.assertNotIn(EVIDENCE_TRUNCATION_MARKER.split(":")[0], result.evidence)

    def test_long_output_is_bounded(self):
        out = self._long_output()
        bounded = bound_evidence(out)
        self.assertLessEqual(len(bounded), EVIDENCE_MAX_CHARS)
        self.assertLess(len(bounded), len(out))

    def test_long_output_preserves_head_context(self):
        out = self._long_output()
        self.assertTrue(bound_evidence(out).startswith(out[:EVIDENCE_HEAD_CHARS]))

    def test_long_output_preserves_trailing_failure_marker(self):
        out = self._long_output() + "\n" + self.TRAILING_IDENTITY + "\n" + self.TRAILING_SUMMARY
        bounded = bound_evidence(out)
        self.assertIn(self.TRAILING_IDENTITY, bounded)
        self.assertTrue(bounded.endswith(self.TRAILING_SUMMARY))

    def test_truncation_marker_is_explicit_and_accounts_for_omitted_chars(self):
        out = self._long_output()
        bounded = bound_evidence(out)
        marker_prefix = EVIDENCE_TRUNCATION_MARKER.split("{")[0]
        self.assertEqual(bounded.count(marker_prefix), 1)
        head, _, rest = bounded.partition(marker_prefix)
        self.assertEqual(head, out[:EVIDENCE_HEAD_CHARS])
        marker_rest, _, tail = rest.partition("] ...\n")
        omitted = int(marker_rest.split(" ")[0])
        self.assertEqual(len(head) + omitted + len(tail), len(out))
        self.assertTrue(out.endswith(tail))

    def test_timeout_prefix_survives_bounding(self):
        out = "timed out after 5 seconds\n" + self._long_output()
        self.assertTrue(bound_evidence(out).startswith("timed out after 5 seconds\n"))

    def test_bounding_is_deterministic(self):
        out = self._long_output()
        self.assertEqual(bound_evidence(out), bound_evidence(out))
        profile = {"profile": "t", "gates": [self._runner_gate("RED", 1)]}
        first = run_all_gates(profile, ".")["RED"]
        second = run_all_gates(profile, ".")["RED"]
        self.assertEqual(first.evidence, second.evidence)

    def test_long_failing_gate_keeps_exit_code_and_tail_identity(self):
        profile = {"profile": "t", "gates": [self._runner_gate("RED", 1)]}
        result = run_all_gates(profile, ".")["RED"]
        self.assertFalse(result.passed)
        self.assertEqual(result.exit_code, 1)
        self.assertTrue(any_failed({"RED": result}))
        self.assertLessEqual(len(result.evidence), EVIDENCE_MAX_CHARS)
        self.assertIn(self.TRAILING_IDENTITY, result.evidence)
        self.assertIn(self.TRAILING_SUMMARY, result.evidence)
        self.assertIn("Ran 401 tests across 1 file.", result.evidence)
        self.assertTrue(result.evidence.startswith("(pass) synthetic > earlier passing case 0"))

    def test_long_passing_gate_stays_passed_and_bounded(self):
        profile = {"profile": "t", "gates": [self._runner_gate("GREEN", 0)]}
        result = run_all_gates(profile, ".")["GREEN"]
        self.assertTrue(result.passed)
        self.assertEqual(result.exit_code, 0)
        self.assertLessEqual(len(result.evidence), EVIDENCE_MAX_CHARS)
        self.assertIn("Ran 401 tests across 1 file.", result.evidence)

    def test_result_schema_is_unchanged(self):
        self.assertEqual(
            list(GateResult.__dataclass_fields__),
            ["gate_id", "passed", "evidence", "exit_code", "skipped", "skip_reason"],
        )


if __name__ == "__main__":
    unittest.main()
