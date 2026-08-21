"""Unit tests for build_gate.types and origin normalization."""
import unittest
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "scripts"))

from build_gate.types import Severity, Verdict, FreezeManifest, ReviewRecord  # noqa: E402
from build_gate.freeze import normalize_origin  # noqa: E402


class TestSeverity(unittest.TestCase):
    def test_from_str_normalizes_case(self):
        self.assertEqual(Severity.from_str("CRITICAL"), Severity.CRITICAL)
        self.assertEqual(Severity.from_str("minor"), Severity.MINOR)

    def test_unknown_severity_raises(self):
        with self.assertRaises(ValueError):
            Severity.from_str("weird")


class TestVerdict(unittest.TestCase):
    def test_members(self):
        self.assertEqual({v.value for v in Verdict}, {"approved", "rejected", "needs_changes"})


class TestNormalizeOrigin(unittest.TestCase):
    def test_https(self):
        host, ident = normalize_origin("https://github.com/MADVenturesLLC/madventures-tui.git")
        self.assertEqual(host, "github.com")
        self.assertEqual(ident, "madventuresllc/madventures-tui")

    def test_ssh(self):
        host, ident = normalize_origin("git@github.com:MADVenturesLLC/madventures-tui.git")
        self.assertEqual(host, "github.com")
        self.assertEqual(ident, "madventuresllc/madventures-tui")

    def test_ssh_uri_with_userinfo(self):
        host, ident = normalize_origin(
            "ssh://git@github.com/MADVenturesLLC/madventures-tui.git"
        )
        self.assertEqual(host, "github.com")
        self.assertEqual(ident, "madventuresllc/madventures-tui")

    def test_case_insensitive_identity(self):
        _, a = normalize_origin("git@github.com:MADVENTURESLLC/MADVENTURES-TUI.GIT")
        _, b = normalize_origin("https://github.com/madventuresllc/madventures-tui.git")
        self.assertEqual(a, b)


class TestFreezeRoundTrip(unittest.TestCase):
    def test_to_from_dict(self):
        m = FreezeManifest(
            profile="p", target_ref="a" * 40, target_ref_short="aaaaaaa",
            origin_url="u", origin_host="h", origin_identity="o/r",
            actor="hermes", model="hy3", provider="nous", session_id="S",
            surface="cv5", frozen_at="2026-08-20T00:00:00+00:00",
            gates=["g1"], profile_sha256="deadbeef",
        )
        self.assertEqual(FreezeManifest.from_dict(m.to_dict()).target_ref, "a" * 40)


if __name__ == "__main__":
    unittest.main()
