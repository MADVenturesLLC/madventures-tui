"""CLI exit-code contract for validate_record.py."""
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPTS = HERE.parent / "scripts"
sys.path.insert(0, str(SCRIPTS))

from test_validate import base_freeze, base_record  # noqa: E402


class TestValidateRecordCli(unittest.TestCase):
    def _write(self, directory: Path, record, freeze) -> tuple[Path, Path]:
        rec_path = directory / "record.json"
        freeze_path = directory / "freeze.json"
        rec_path.write_text(json.dumps(record.to_dict()) + "\n", encoding="utf-8")
        freeze_path.write_text(json.dumps(freeze.to_dict()) + "\n", encoding="utf-8")
        return rec_path, freeze_path

    def _run(self, rec_path: Path, freeze_path: Path) -> subprocess.CompletedProcess:
        return subprocess.run(
            [
                sys.executable,
                str(SCRIPTS / "validate_record.py"),
                "--record",
                str(rec_path),
                "--freeze",
                str(freeze_path),
            ],
            capture_output=True,
            text=True,
            check=False,
        )

    def test_approved_clean_exits_zero(self):
        with tempfile.TemporaryDirectory() as d:
            rec, freeze = self._write(Path(d), base_record(), base_freeze())
            proc = self._run(rec, freeze)
            self.assertEqual(proc.returncode, 0, proc.stdout + proc.stderr)

    def test_valid_needs_changes_exits_one(self):
        rec = base_record(
            verdict="needs_changes",
            approved_by="",
            gate_results={
                "MTUI-TYPECHECK": {"passed": False, "evidence": "tsc err", "exit_code": 2},
                "MTUI-TEST": {"passed": True, "evidence": "ok", "exit_code": 0},
            },
        )
        with tempfile.TemporaryDirectory() as d:
            rec_path, freeze_path = self._write(Path(d), rec, base_freeze())
            proc = self._run(rec_path, freeze_path)
            self.assertEqual(proc.returncode, 1, proc.stdout + proc.stderr)
            payload = json.loads(proc.stdout)
            self.assertTrue(payload["valid"], payload)


if __name__ == "__main__":
    unittest.main()
