"""Integration test for freeze_target in a real temporary git repo."""
import json
import subprocess
import tempfile
import unittest
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "scripts"))

from build_gate.freeze import freeze_target  # noqa: E402


def _git(cwd: Path, args: list[str]):
    subprocess.run(["git", *args], cwd=str(cwd), check=True,
                   capture_output=True, text=True)


class TestFreezeTarget(unittest.TestCase):
    def test_freeze_in_real_repo(self):
        with tempfile.TemporaryDirectory() as d:
            repo = Path(d)
            _git(repo, ["init", "-q"])
            _git(repo, ["config", "user.email", "t@t.t"])
            _git(repo, ["config", "user.name", "t"])
            _git(repo, ["config", "commit.gpgsign", "false"])
            _git(repo, ["remote", "add", "origin", "git@github.com:MADVenturesLLC/madventures-tui.git"])
            (repo / "f.txt").write_text("x")
            _git(repo, ["add", "f.txt"])
            _git(repo, ["commit", "-q", "-m", "init"])

            profile = {"profile": "madventures-tui",
                       "target": {"origin_identity": "MADVenturesLLC/madventures-tui"},
                       "gates": []}
            pf = repo / "profile.json"
            pf.write_text(json.dumps(profile))

            m = freeze_target(pf, repo, actor="hermes", model="hy3",
                              provider="nous", session_id="S1", surface="cv5")
            self.assertEqual(len(m.target_ref), 40)
            self.assertEqual(m.origin_identity, "madventuresllc/madventures-tui")
            self.assertEqual(m.profile_sha256,
                             __import__("hashlib").sha256(pf.read_bytes()).hexdigest())

    def test_origin_mismatch_raises(self):
        with tempfile.TemporaryDirectory() as d:
            repo = Path(d)
            _git(repo, ["init", "-q"])
            _git(repo, ["config", "user.email", "t@t.t"])
            _git(repo, ["config", "user.name", "t"])
            _git(repo, ["config", "commit.gpgsign", "false"])
            _git(repo, ["remote", "add", "origin", "git@github.com:SomeoneElse/other.git"])
            (repo / "f.txt").write_text("x")
            _git(repo, ["add", "f.txt"])
            _git(repo, ["commit", "-q", "-m", "init"])
            profile = {"profile": "madventures-tui",
                       "target": {"origin_identity": "MADVenturesLLC/madventures-tui"},
                       "gates": []}
            pf = repo / "profile.json"
            pf.write_text(json.dumps(profile))
            with self.assertRaises(RuntimeError):
                freeze_target(pf, repo, actor="a", model="m", provider="p",
                              session_id="S", surface="s")

    def test_ssh_uri_origin_is_accepted(self):
        with tempfile.TemporaryDirectory() as d:
            repo = Path(d)
            _git(repo, ["init", "-q"])
            _git(repo, ["config", "user.email", "t@t.t"])
            _git(repo, ["config", "user.name", "t"])
            _git(repo, ["config", "commit.gpgsign", "false"])
            _git(
                repo,
                ["remote", "add", "origin", "ssh://git@github.com/MADVenturesLLC/madventures-tui.git"],
            )
            (repo / "f.txt").write_text("x")
            _git(repo, ["add", "f.txt"])
            _git(repo, ["commit", "-q", "-m", "init"])
            profile = {
                "profile": "madventures-tui",
                "target": {"origin_identity": "MADVenturesLLC/madventures-tui"},
                "gates": [],
            }
            pf = repo / "profile.json"
            pf.write_text(json.dumps(profile))
            m = freeze_target(
                pf, repo, actor="hermes", model="hy3",
                provider="nous", session_id="S1", surface="cv5",
            )
            self.assertEqual(m.origin_host, "github.com")
            self.assertEqual(m.origin_identity, "madventuresllc/madventures-tui")


if __name__ == "__main__":
    unittest.main()
