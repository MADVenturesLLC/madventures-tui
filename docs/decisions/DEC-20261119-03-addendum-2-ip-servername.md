DEC-20261119-03 ADDENDUM 2: the TLS server name of an IP-address endpoint in madv-surface 0.1.2

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`, for work in `MADVenturesLLC/madventures-surface`
> **Amends:** `DEC-20261119-03` B1, by one change to `src/http.ts`, and the tests and breaks of its item 5 that answer `DEC-20261115-01` B4 item 3
> **Read with:** `DEC-20261119-03` A4, B1, B3, B5 and B8, and its Addendum 1; `DEC-20261115-01` A6 item 3 and B4 item 3; `DEC-20261023-01` Part B

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The halt.** The builder session `session:codex/surface-0.1.2-r1` halted at S3 of its builder prompt with three commits on `build/v0.1.2`, the last `14adb2bb55721cccbbc4f3f71e2e6bd6fddd3d51`, and four paths of S3 uncommitted: its test in `test/tls.test.ts`, and a certificate under `test/fixtures/tls/` with its key and a paragraph of that folder's `README.md`. The certificate is signed by the test certificate authority of that folder, names `127.0.0.1` and `::1`, is valid from 2026-11-20 to 2076-03-02, and has SHA-256 `092c5c2fd1b331279fbc4121adc2bb7cff09981c3a6492e7618d221d4e808a22`. Against a mock at `127.0.0.1` the new test completed no reviewer turn: the run emitted `system/internal_error`, naming the address as a TLS server name that is not permitted (log 248). Against the IPv6 loopback address `::1`, written in brackets in its URL, it emitted `system/provider_error` with code `network_error`, whose cause the run does not show (log 263). The six existing tests of `test/tls.test.ts` passed in every run. The builder halted, as its prompt requires when the second name cannot be verified without a change to `src/http.ts`. Its manifest of logs 001 to 267, log 268, has SHA-256 `d836de2c7e5012203c29c4cc2bf8d53deec52108a85fdd65a68e956d61275e57`.

A2. **The cause.** At the base, `src/http.ts` has SHA-256 `57ccbb58289f4d7cc20557a93a6a2e6dd5a5773eb7ebe023c86eafc8252dfd67`. Its line 238 sets the TLS server name of every HTTPS request to the endpoint's host. RFC 6066 section 3 does not permit an IP address as a server name, and Bun refuses one before it connects. Its line 44 admits as a test endpoint only `localhost`, `127.0.0.1` and `::1`, the last with or without brackets, so the second name of S3 can only be an IP address. Production endpoints are the profiles' DNS names (line 73).

A3. **The drafting assistant.** A Claude Code session drafted S3 of the builder prompt without checking how `src/http.ts` names the server; that is its error, not the builder's. It then ran, in its own container under Bun 1.4.4, which is not the certified runtime, a request to `127.0.0.1` with a test certificate authority: with that address as the server name, the request threw before connecting; with no server name, the identity check received `127.0.0.1`, a certificate naming that address was accepted, and a certificate naming only `localhost` was refused because the address is not among its names. It drafted this addendum. None of that is evidence of the build or an independent review.

## Part B: Founder rulings

B1. **The change.** `DEC-20261119-03` B1 gains item 9: in `src/http.ts`, the options of the HTTPS request set `servername` only when the endpoint's host is not an IP address, as `isIP` of `node:net` reports it, and set none when it is, with the import it needs. Nothing else in `src/http.ts` changes: the trusted certificate authorities, the `checkServerIdentity` function, its comparison of the verified host with the endpoint's host, its call of `tls.checkServerIdentity`, its record of the verified host, the loopback set and the endpoint rules stay as they are. A request to a DNS name is made exactly as before.

B2. **The tests.** In `test/tls.test.ts`, each named for what it proves:
1. the test of S3: a reviewer turn against a mock at `127.0.0.1` serving the certificate of A1, under the trusted test certificate authority, completes, and every `model_response` carries `127.0.0.1` as `tls_verified_host`;
2. a test that a reviewer turn against a mock at `127.0.0.1` serving `test/fixtures/tls/localhost.pem`, which names only `localhost`, under the trusted test certificate authority, is refused as the existing refusal tests of that file are: exit 1, `system/provider_error` with code `network_error` and host `127.0.0.1`, a `result` with `is_error` true, no `model_response`, no tool event, and no HTTP request at the mock.
Before the change of B1, the builder runs the file alone against unchanged `src/http.ts` and records that both tests fail. After it, every test of the file passes.

B3. **The breaks.** Break 4 of S3, as the builder prompt says: the test of B2 item 1 fails, and the test of `localhost` still passes. Break 8: in the working tree only, make `checkServerIdentity` return no error without calling `tls.checkServerIdentity` when the host is an IP address; the test of B2 item 2 fails. Each is shown, run and restored as THE WORK of the builder prompt says. Item 4 of resume message 2 applies to break 8 as it applies to breaks 1, 2 and 7: if the builder declines it, it records that in one line and continues, and I make it at its last commit before the push.

B4. **Paths and commit.** Gate 7 and the halts of the builder prompt admit `src/http.ts` for the change of B1 alone; any other change to it, or to any other file under `src/` that the builder prompt does not allow, halts the build. The fourth commit carries `src/http.ts` with the four paths of S3, and its body names B1 item 9 and this addendum.

B5. **IPv6.** This addendum changes nothing for an endpoint at the IPv6 loopback address `::1` and adds no test of one. The builder records the result of log 263 as it is. That endpoint is carried to the next act that changes madv-surface.

B6. **Review and record.** The review of `DEC-20261119-03` B5 covers B1 item 9 and its tests, and its review prompt names this addendum. The completion of the build log and the pull request description record A1 in short, this addendum by its SHA-256, the change, the tests and the breaks.

B7. **Counting and filing.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it and is filed unchanged, with Addendum 1, with the act that records the build under `DEC-20261119-03` B9. Nothing else in `DEC-20261119-03` or its Addendum 1 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-20

Actor-Id: founder
