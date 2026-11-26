# Phase 3B M2 offline evidence

## Recorded session and scripted frames

Two private stand-ins completed the installed Claude and madv probes and attesters. The composition handed its active client to the recorder. The recorder used that client for every sample, called the composition’s Founder close, and replayed the saved JSON through the projection mapper and App. The catalog used fixed offline input.

Offline producer `scripts/phase3b/recorded-frames.tsx` SHA-256 `4301d19bde8cfe6bacbef86b5eea06dbc1117aefce96a7a736c56cf01832e7c4`. Stand-ins `test/phase3b/stand-in.ts` and `test/phase3b/end-stand-in.ts`, SHA-256 `19b8a75ee36c15fe47500824c53aef2cf604ee0f1058413cd854356e36dfab37` and `418ef7a4facaf8e555a7ca2e5dd5fd07c84cdb2f29ff21c9239d710aa13b4872`.

Offline source `healthy-stream.json` SHA-256 `8e55858042910e820e5e0c96755ee8af7086fe68c7b0d946c16ec9250f280106`.

| Client sequence | Phase | Connected | Ledger sequence |
|---:|---|---|---:|
| 3 | active | true | 3 |
| 5 | active | true | 3 |
| 6 | closing | true | 5 |
| 7 | closed | true | 6 |

Founder close completed. The recorder observed `post-close snapshot read rejected`. The sequence gap includes the composition’s own read at the start of close.

Offline rendered source `healthy-frames.txt` SHA-256 `2a513fad65db1a3c2c2ee5ba1632c7fa90abad2c443a83cbb5dba0432ee65ced`. Frame excerpts below omit the surrounding border and padding.

Offline snapshot 3 | builder

~~~text
CONNECTED | session active | writer UNKNOWN | pending 0 | focus CLAUDE | seat BUILDER (APPLY) | ledger #3
~~~

Offline snapshot 3 | governance

~~~text
Transfer phase: none | Pending transfers: —
(lines omitted)
CONNECTED | session active | writer UNKNOWN | pending 0 | focus GOVERNANCE | seat OPERATOR (READ) | ledger #3
~~~

Offline snapshot 3 | events

~~~text
#3 session_activated madbridge tok:1 092b1d842ecf
(lines omitted)
#1 session_open madbridge tok:— c12f459a28f7
(lines omitted)
CONNECTED | session active | writer UNKNOWN | pending 0 | focus EVENTS | seat OPERATOR (READ) | ledger #3
~~~

Offline snapshot 5 | builder

~~~text
CONNECTED | session active | writer UNKNOWN | pending 0 | focus CLAUDE | seat BUILDER (APPLY) | ledger #3
~~~

Offline snapshot 5 | governance

~~~text
Transfer phase: none | Pending transfers: —
(lines omitted)
CONNECTED | session active | writer UNKNOWN | pending 0 | focus GOVERNANCE | seat OPERATOR (READ) | ledger #3
~~~

Offline snapshot 5 | events

~~~text
#3 session_activated madbridge tok:1 092b1d842ecf
(lines omitted)
#1 session_open madbridge tok:— c12f459a28f7
(lines omitted)
CONNECTED | session active | writer UNKNOWN | pending 0 | focus EVENTS | seat OPERATOR (READ) | ledger #3
~~~

Offline snapshot 6 | builder

~~~text
CONNECTED | session closing | writer UNKNOWN | pending 0 | focus CLAUDE | seat BUILDER (APPLY) | ledger #5
~~~

Offline snapshot 6 | governance

~~~text
Transfer phase: none | Pending transfers: —
(lines omitted)
CONNECTED | session closing | writer UNKNOWN | pending 0 | focus GOVERNANCE | seat OPERATOR (READ) | ledger #5
~~~

Offline snapshot 6 | events

~~~text
#3 session_activated madbridge tok:1 092b1d842ecf
(lines omitted)
#1 session_open madbridge tok:— c12f459a28f7
(lines omitted)
CONNECTED | session closing | writer UNKNOWN | pending 0 | focus EVENTS | seat OPERATOR (READ) | ledger #5
~~~

Offline snapshot 7 | builder

~~~text
CONNECTED | session closed | writer UNKNOWN | pending 0 | focus CLAUDE | seat BUILDER (APPLY) | ledger #6
~~~

Offline snapshot 7 | governance

~~~text
Transfer phase: none | Pending transfers: —
(lines omitted)
CONNECTED | session closed | writer UNKNOWN | pending 0 | focus GOVERNANCE | seat OPERATOR (READ) | ledger #6
~~~

Offline snapshot 7 | events

~~~text
#6 session_closed madbridge tok:1 0f0a90e4795c
(lines omitted)
#3 session_activated madbridge tok:1 092b1d842ecf
(lines omitted)
#1 session_open madbridge tok:— c12f459a28f7
(lines omitted)
CONNECTED | session closed | writer UNKNOWN | pending 0 | focus EVENTS | seat OPERATOR (READ) | ledger #6
~~~

## Offline child and host endings

Producer `scripts/phase3b/child-ends.ts` SHA-256 `59625f68a04135bdba7302ee7bf3fdd9ba0e9bc98e28caa945e758e7e35ee768`. Each transcript comes from a separate disposable build with the same two stand-ins. The pre-activation observations quote the build’s failure detail. Post-activation observations come from the durable ledger. The pending request and open tool used the active madv attester’s input port.

Offline claude-code · active session · clean exit. `claude-code-active-clean-exit.txt` SHA-256 `85ea52c0f9a029bc59f8788d78f94a540ed5747ef7e8a485b92d74312c90eb3e`.

~~~text
      "reason": "child_failure",
      "detail": "claude-code: child_exited"
(lines omitted)
  "closed": "interruption"
~~~

Offline claude-code · active session · host end. `claude-code-active-host-end.txt` SHA-256 `b5453b27d1dc0c64f9b454f4ccfa5dcfeb59aa22be2110093a5213dff21b05ef`.

~~~text
      "reason": "pty_host_failure",
      "detail": "claude-code: host_exited"
(lines omitted)
  "closed": "interruption"
~~~

Offline claude-code · active session · malformed partial line. `claude-code-active-malformed-partial-line.txt` SHA-256 `f8ba6ad96e1e00e809a4e991089d55a474b590316d4cc5f3bafdfd5885bc776c`.

~~~text
      "reason": "identity_mismatch",
      "detail": "claude-code: attestation_malformed"
(lines omitted)
  "closed": "interruption"
~~~

Offline claude-code · active session · nonzero exit. `claude-code-active-nonzero-exit.txt` SHA-256 `f412edfecc374149721accd5cbc3b32a4b97dcf932251770e74b377f6b1b2fea`.

~~~text
      "reason": "child_failure",
      "detail": "claude-code: child_exited"
(lines omitted)
  "closed": "interruption"
~~~

Offline claude-code · active session · signalled exit. `claude-code-active-signalled-exit.txt` SHA-256 `f8a19a0dc5acbd4e34e46b977eea5ab2f72facf6ea793d88282cdb5aa9d67035`.

~~~text
      "reason": "child_failure",
      "detail": "claude-code: child_exited"
(lines omitted)
  "closed": "interruption"
~~~

Offline claude-code · before activation · clean exit. `claude-code-before-child_exited.txt` SHA-256 `5c0119604c5221993935dbaccef510524a7a34553b742ff3e86ca77d37ffb9ba`.

~~~text
  "detail": "step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=child_exited",
~~~

Offline claude-code · before activation · host end. `claude-code-before-host_exited.txt` SHA-256 `dee92b5960e1d59ea5e1dc93402c94138d395125d83c2a8c45e4d2876ee4c532`.

~~~text
  "detail": "step=reattest execution=builder failure=reattestation_failed surface=claude-code cause=host_exited",
~~~

Offline claude-code · active session · Founder close. `founder-close.txt` SHA-256 `1edc68b62e292530c88502e07e8dd3fa2e71c315b5fda009a6e9639c8da8cceb`.

~~~text
  "interrupted": [],
  "closed": "founder"
~~~

Offline madv-surface · active session · clean exit. `madv-surface-active-clean-exit.txt` SHA-256 `af7501471fd2909beb4e086458eea1104d0ea4da758383d4c0032555c8dec5a3`.

~~~text
      "reason": "child_failure",
      "detail": "madv-surface: child_exited"
(lines omitted)
  "closed": "interruption"
~~~

Offline madv-surface · active session · host end. `madv-surface-active-host-end.txt` SHA-256 `36c23c4f218e0d713e702193a0fad7c9b86140165479edd3fffba21c41307b28`.

~~~text
      "reason": "pty_host_failure",
      "detail": "madv-surface: host_exited"
(lines omitted)
  "closed": "interruption"
~~~

Offline madv-surface · active session · malformed partial line. `madv-surface-active-malformed-partial-line.txt` SHA-256 `25a05e6b553e2324eee4df383778fbc85edfcf6268500682184e4291d8c875c6`.

~~~text
      "reason": "identity_mismatch",
      "detail": "madv-surface: identity_mismatch"
(lines omitted)
  "closed": "interruption"
~~~

Offline madv-surface · active session · nonzero exit. `madv-surface-active-nonzero-exit.txt` SHA-256 `b13f8b5206ba664af4b2c2c3917eff9c9ff5de4a08e68e317f4d4061873dd076`.

~~~text
      "reason": "adapter_failure",
      "detail": "madv-surface: provider_error"
(lines omitted)
  "closed": "interruption"
~~~

Offline madv-surface · active session · open tool. `madv-surface-active-open-tool.txt` SHA-256 `82a316a09e19419d0a354830b663ff1a10174d89c1bbafdd1d828b1e514a9bbf`.

~~~text
      "reason": "identity_mismatch",
      "detail": "madv-surface: identity_mismatch"
(lines omitted)
  "closed": "interruption"
~~~

Offline madv-surface · active session · pending request. `madv-surface-active-pending-request.txt` SHA-256 `b702d4a796109f47e625bb1be8ba5b5e2370fc2bbdd1593d113e1b147415575b`.

~~~text
      "reason": "identity_mismatch",
      "detail": "madv-surface: identity_unavailable"
(lines omitted)
  "closed": "interruption"
~~~

Offline madv-surface · before activation · clean exit. `madv-surface-before-child_exited.txt` SHA-256 `cfd7422ce5dd89774124ac5e5af151fa1f16eeaee5bd4e9a15f86113a862554c`.

~~~text
  "detail": "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=child_exited",
~~~

Offline madv-surface · before activation · host end. `madv-surface-before-host_exited.txt` SHA-256 `07255e98b19e63fe8743510b2e5a82788fce872b5a1d3d595292a094a761514a`.

~~~text
  "detail": "step=reattest execution=reviewer failure=reattestation_failed surface=madv-surface cause=host_exited",
~~~

A drained fact alone was exercised on each synthetic monitor stream. The real host emits its drain immediately before its exit fact.

## Limits

No snapshot of a real surface has yet been projected. No caller holds the client before activation, so the recording starts with the activated session. B8 item 5 leaves an execution’s exit and exit code out of its snapshot. The subscribe adapter imports the supervisor by relative path, the undeclared dependency recorded in plan §2D item 5.

Offline source manifest `SHA256.txt` SHA-256 `5b262e643fee404f1ca88f922bec3e8e308d44bc287ab5104266aa6833e24e31`.
