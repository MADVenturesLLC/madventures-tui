# Phase 3B M1 offline evidence

Both healthy starts reached the foreground presentation callback after both stand-ins completed their probes and live-session attestation. The storage obstruction and the wrong model each stopped the start. A fallback after activation produced a durable interruption.

The entry points in `scripts/phase3b/healthy-starts.ts` and `scripts/phase3b/failures.ts` invoked the production composition with disposable directories, synthetic capability records and local executables. Each healthy transcript represents a separate start of the pair. The labels below identify the surface under observation. The source transcripts are in the builder workspace under `evidence/`. Its `SHA256.txt` has SHA-256 `b074b13998eca4c583d8e59ac4303c643ea6f652da1066364bb30a81919b2587`.

## Healthy Claude Code

Offline. Stand-in: madbridge-claude-v5. Source `healthy-claude-code.txt`, SHA-256 `ac5c60ff7016f0be0903b8cb5beccfc28d156e2f604a29551f475983cd19504f`.

```text
claude-code identity probe
claude-code auth probe
madv-surface identity probe
madv-surface auth probe
madv-surface launch
claude-code launch
claude-code attestation write
claude-code result success
madv-surface attestation write no_tools=true
madv-surface result success
present active
exit 0
```

## Healthy madv-surface

Offline. Stand-in: madv-surface. Source `healthy-madv-surface.txt`, SHA-256 `2a078ee78a47a06d853057c8d27200d1eeadb9ca489b50ae57750080376c5f73`.

```text
madv-surface identity probe
madv-surface auth probe
madv-surface launch
(lines omitted)
madv-surface attestation write no_tools=true
madv-surface result success
present active
exit 0
```

## Storage barrier failure

Offline. Stand-in: madbridge-claude-v5 and madv-surface. Source `barrier-failure.txt`, SHA-256 `b76e91e35c62d816011f970775f1fc3b90920806965d30e1189c4eb1748e2c26`.

```text
claude-code identity probe
claude-code auth probe
madv-surface identity probe
madv-surface auth probe
exit 1 storage step=storage failure=storage_failed
```

## Wrong Claude Code model

Offline. Stand-in: madbridge-claude-v5. Source `attestation-failure.txt`, SHA-256 `5c8321b34c5f0b7b659e8ab33a237b316dbc5d5d0db754cdf1236f403d083af9`.

```text
claude-code launch
(lines omitted)
claude-code attestation write
exit 1 reattest step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=identity_mismatch
```

## Claude Code fallback after activation

Offline. Stand-in: madbridge-claude-v5. Source `fallback.txt`, SHA-256 `40cc9f0c803ebd300986e12b0cdbce5032e7b622f45bfc585a04c2b42889de72`.

```text
present active
claude-code model_refusal_fallback
session_interrupted identity_mismatch
exit 0
```

The final fallback line records the return code of the composed start. The earlier `session_interrupted` line comes from the persisted ledger after activation.

## Limits of the evidence

- **Working directory.** Composition checks the supplied configuration files and the project and local settings in the supplied child working directory. The PTY host chooses its working directory. The child can read files accessible there in addition to the allowlisted environment it receives. The offline runs used disposable folders.
- **Package imports.** The composition reaches the supervisor and madv-surface adapter through relative source imports. They remain undeclared dependencies of the TUI package under DEC-20261123-01 B16.
- **Terminal echo.** The PTY host clears its local `ECHO` bit before the child starts. Whether a real surface turns echo back on is unestablished offline. Both attesters reject an echoed input line. DEC-20261123-01 Addendum 2 has SHA-256 `f524cb055c363c57dbcaf25dc037645989d453a942f3ce120c7083735e6cc52c`.
- **Scope.** The outcomes cover local stand-ins, synthetic identity evidence and disposable records. Provider authentication, model responses from a live service and certification on both hosts remain for their authorized runs.
