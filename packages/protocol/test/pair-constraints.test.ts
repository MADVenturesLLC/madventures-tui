// packages/protocol/test/pair-constraints.test.ts
// Active-surface cardinality, PairConstraintsV1 parsing, and pair eligibility.

import { expect, test } from "bun:test";
import { sha256CanonicalSync } from "../src/canonical-json";
import {
  assertActiveSurfaceCardinality,
  canonicalPairKey,
  CardinalityError,
  evaluatePairEligibility,
  evaluatePairEligibilityWithDependencies,
  parsePairConstraints,
  PairConstraintsError,
  type PairConstraintsV1,
  type PairEligibilityFailure,
} from "../src/pair-constraints";
import { parseSurfaceId, type SurfaceId } from "../src/surface-id";
import { parseTaskEnvelope, PROTOCOL_VERSION, type ExecutionIdentity } from "../src";
import * as protocol from "../src";
import { ADAPTER_REGISTRY, type AdapterRegistrationV1 } from "../src/adapter-registry";

// ─── Fixtures ───

function builderExecution(overrides: Partial<ExecutionIdentity> = {}): ExecutionIdentity {
  return {
    execution_id: "exec-builder",
    role: "builder",
    surface: parseSurfaceId("claude-code"),
    model: "claude-sonnet-4",
    provider: "anthropic",
    independence_domain: "anthropic",
    effort: "high",
    ...overrides,
  };
}

function reviewerExecution(overrides: Partial<ExecutionIdentity> = {}): ExecutionIdentity {
  return {
    execution_id: "exec-reviewer",
    role: "independent-reviewer",
    surface: parseSurfaceId("antigravity"),
    model: "gemini-2.5-pro",
    provider: "google",
    independence_domain: "google",
    effort: "medium",
    ...overrides,
  };
}

// ─── Task 7: cardinality ───

test("one execution and three executions are both rejected by the single constraint", () => {
  // Arrange
  const one: readonly ExecutionIdentity[] = [builderExecution()];
  const two: readonly ExecutionIdentity[] = [builderExecution(), reviewerExecution()];
  const three: readonly ExecutionIdentity[] = [
    builderExecution(),
    reviewerExecution(),
    builderExecution({ execution_id: "exec-third", role: "observer" }),
  ];

  // Act / Assert — the same named constraint rejects both under- and over-count.
  expect(() => assertActiveSurfaceCardinality(one)).toThrow(CardinalityError);
  expect(() => assertActiveSurfaceCardinality(three)).toThrow(CardinalityError);
  expect(() => assertActiveSurfaceCardinality(two)).not.toThrow();
});

// ─── Task 8: PairConstraintsV1 ───

function strictConstraints(): Record<string, unknown> {
  return {
    required_roles: ["builder", "independent-reviewer"],
    require_distinct_providers: true,
    require_distinct_independence_domains: true,
    prohibit_self_review: true,
  };
}

/** A parseable envelope carrying the two fixture executions and strict constraints. */
function envelopeWithConstraints(
  constraints: Record<string, unknown>,
  executions: readonly ExecutionIdentity[] = [builderExecution(), reviewerExecution()],
): Record<string, unknown> {
  const env: Record<string, unknown> = {
    protocol_version: PROTOCOL_VERSION,
    task_id: "task-pair-001",
    authorization_reference: "FOUNDER-20260903-01",
    repository: "/repo",
    branch: "feature",
    worktree: "/repo-wt",
    repository_fingerprint: {
      kind: "commit",
      sha256: "a".repeat(64),
      git_sha: "b".repeat(40),
    },
    executions: executions.map((e) => ({ ...e })),
    initial_writer: executions[0]?.execution_id,
    scope: {
      allowedReadPaths: ["src/**"],
      allowedWritePaths: ["src/**"],
      allowedCommandCategories: ["read", "write", "test"],
      allowedArtifactCategories: ["code", "diff", "test-result"],
      maxArtifactSizeBytes: 1048576,
      dataClass: "internal",
      allowedEgressDestinations: [],
    },
    pair_constraints: constraints,
    expires_at: "2099-12-31T23:59:59Z",
    created_at: "2026-09-03T16:00:00.000Z",
  };
  const toSign = { ...env };
  delete toSign["envelope_hash"];
  env["envelope_hash"] = sha256CanonicalSync(toSign);
  return env;
}

test("an envelope without pair_constraints fails parsing", () => {
  // Arrange — an otherwise valid envelope with the required field removed.
  const env = envelopeWithConstraints(strictConstraints());
  delete env["pair_constraints"];
  const toSign = { ...env };
  delete toSign["envelope_hash"];
  env["envelope_hash"] = sha256CanonicalSync(toSign);

  // Act / Assert — there is no default-constraints path.
  expect(() => parseTaskEnvelope(env)).toThrow("missing pair_constraints");
});

test("reversed duplicate allowed pairs are a parse failure", () => {
  // Arrange
  const constraints = strictConstraints();
  constraints["allowed_surface_pairs"] = [
    ["claude-code", "antigravity"],
    ["antigravity", "claude-code"],
  ];

  // Act / Assert — [a,b] and [b,a] are the same unordered pair, so listing both
  // is a duplicate, not two entries.
  expect(() => parsePairConstraints(constraints)).toThrow(PairConstraintsError);
});

test("allowed pair matching ignores envelope execution order", () => {
  // Arrange — the same pair, listed once, with the executions in both orders.
  const constraints = strictConstraints();
  constraints["allowed_surface_pairs"] = [["antigravity", "claude-code"]];
  const forward = envelopeWithConstraints({ ...constraints }, [
    builderExecution(),
    reviewerExecution(),
  ]);
  const reversed = envelopeWithConstraints({ ...constraints }, [
    reviewerExecution(),
    builderExecution(),
  ]);

  // Act / Assert — order is irrelevant to both the key and the parse result.
  expect(canonicalPairKey(parseSurfaceId("claude-code"), parseSurfaceId("antigravity"))).toBe(
    canonicalPairKey(parseSurfaceId("antigravity"), parseSurfaceId("claude-code")),
  );
  expect(() => parseTaskEnvelope(forward)).not.toThrow();
  expect(() => parseTaskEnvelope(reversed)).not.toThrow();
});

test("allowed_surface_pairs cannot weaken a global rule", () => {
  // Arrange — both executions share a provider, and the pair is explicitly
  // listed as allowed.
  const constraints = strictConstraints();
  constraints["allowed_surface_pairs"] = [["claude-code", "antigravity"]];
  const env = envelopeWithConstraints(constraints, [
    builderExecution(),
    reviewerExecution({ provider: "anthropic" }),
  ]);

  // Act / Assert — listing the pair narrows eligibility; it never exempts the
  // pair from a global rule the envelope itself declares.
  expect(() => parseTaskEnvelope(env)).toThrow("providers are not distinct");
});

// ─── Parser-level self-review and allowed-pair typing ───

test("an envelope whose executions share a surface fails parsing", () => {
  // Arrange — distinct execution ids, roles, providers, and independence
  // domains. Only the surface is shared, so every other rule passes and the
  // self-review rule is the one under test.
  const env = envelopeWithConstraints(strictConstraints(), [
    builderExecution(),
    reviewerExecution({
      surface: parseSurfaceId("claude-code"),
      provider: "google",
      independence_domain: "google",
    }),
  ]);

  // Act / Assert — a surface cannot review its own output. The parser must
  // agree with evaluatePairEligibility, which classifies this as self_review.
  expect(() => parseTaskEnvelope(env)).toThrow("an execution cannot review its own output");
});

test("non-string allowed pair entries are a parse failure", () => {
  // Arrange — values that would become syntactically valid surface ids if
  // coerced with String(): true -> "true", null -> "null".
  const constraints = strictConstraints();
  constraints["allowed_surface_pairs"] = [[true, null]];

  // Act / Assert — ids must already be strings; coercion is not admission.
  expect(() => parsePairConstraints(constraints)).toThrow(PairConstraintsError);
});

// ─── Task 9: the nine pair-eligibility rules ───

const STRICT = parsePairConstraints(strictConstraints());

/** Distinct organizations, so rule 6 passes unless a test says otherwise. */
function distinctOrganizations(): ReadonlyMap<SurfaceId, string> {
  return new Map<SurfaceId, string>([
    [parseSurfaceId("claude-code"), "anthropic"],
    [parseSurfaceId("antigravity"), "google"],
  ]);
}

function evaluate(
  executions: readonly ExecutionIdentity[],
  constraints: PairConstraintsV1 = STRICT,
  organizations: ReadonlyMap<SurfaceId, string> = distinctOrganizations(),
) {
  return evaluatePairEligibility(executions, constraints, organizations);
}

function failureOf(result: ReturnType<typeof evaluate>): string {
  return result.ok ? "<eligible>" : result.failure;
}

test("pair eligibility rejects duplicate_execution_id", () => {
  const result = evaluate([
    builderExecution({ execution_id: "same-id" }),
    reviewerExecution({ execution_id: "same-id" }),
  ]);
  expect(failureOf(result)).toBe("duplicate_execution_id");
});

test("pair eligibility rejects role_composition", () => {
  const result = evaluate([
    builderExecution(),
    reviewerExecution({ role: "builder" }),
  ]);
  expect(failureOf(result)).toBe("role_composition");
});

test("pair eligibility rejects observer_not_active", () => {
  const result = evaluate([
    builderExecution(),
    reviewerExecution({ role: "observer" }),
  ]);
  expect(failureOf(result)).toBe("observer_not_active");
});

test("pair eligibility rejects provider_not_distinct", () => {
  const result = evaluate([
    builderExecution(),
    reviewerExecution({ provider: "anthropic" }),
  ]);
  expect(failureOf(result)).toBe("provider_not_distinct");
});

test("pair eligibility rejects independence_domain_not_distinct", () => {
  const result = evaluate([
    builderExecution({ independence_domain: "shared-domain" }),
    reviewerExecution({ independence_domain: "shared-domain" }),
  ]);
  expect(failureOf(result)).toBe("independence_domain_not_distinct");
});

test("pair eligibility rejects common_review_control", () => {
  // Providers and independence domains are distinct; only the organization is
  // shared. Equal organization_id alone must defeat the pair.
  const sharedOrganization = new Map<SurfaceId, string>([
    [parseSurfaceId("claude-code"), "one-parent"],
    [parseSurfaceId("antigravity"), "one-parent"],
  ]);
  const result = evaluate([builderExecution(), reviewerExecution()], STRICT, sharedOrganization);
  expect(failureOf(result)).toBe("common_review_control");
});

test("pair eligibility rejects self_review", () => {
  // A surface cannot review its own output, even as a separate execution with
  // a distinct id, provider, domain, and organization.
  const sameSurface = new Map<SurfaceId, string>([[parseSurfaceId("claude-code"), "anthropic"]]);
  const result = evaluate(
    [
      builderExecution(),
      reviewerExecution({ surface: parseSurfaceId("claude-code"), provider: "google" }),
    ],
    STRICT,
    sameSurface,
  );
  expect(failureOf(result)).toBe("self_review");
});

test("pair eligibility rejects surface_not_admitted", () => {
  // Syntactically valid, but absent from the closed adapter registry.
  const result = evaluate([
    builderExecution(),
    reviewerExecution({ surface: parseSurfaceId("unregistered-surface") }),
  ]);
  expect(failureOf(result)).toBe("surface_not_admitted");
});

test("pair eligibility rejects envelope_constraint_weaker", () => {
  // A constraints value that never passed parsePairConstraints, so it can carry
  // a weakened flag. Eligibility must reject it rather than honor it.
  const weakened = {
    ...STRICT,
    require_distinct_providers: false,
  } as unknown as PairConstraintsV1;
  const result = evaluate([builderExecution(), reviewerExecution()], weakened);
  expect(failureOf(result)).toBe("envelope_constraint_weaker");
});

test("pair eligibility accepts a distinct builder and independent reviewer", () => {
  const result = evaluate([builderExecution(), reviewerExecution()]);
  expect(result.ok).toBe(true);
});

function fixturePair() {
  const executions = [
    builderExecution({ surface: parseSurfaceId("pair-seam-builder"), provider: "fixture-builder-provider", independence_domain: "fixture-builder-domain" }),
    reviewerExecution({ surface: parseSurfaceId("pair-seam-reviewer"), provider: "fixture-reviewer-provider", independence_domain: "fixture-reviewer-domain" }),
  ] as const;
  const registrations = new Map<SurfaceId, AdapterRegistrationV1>(executions.map(execution => [execution.surface, {
    surface: execution.surface, executable_name: execution.surface,
    provider: execution.provider, independence_domain: execution.independence_domain,
    organization_id: execution.provider, supported_versions: ["1.0.0"],
    identity_probe: { argv: [], parse: "json" }, auth_readiness_probe: null,
    non_interactive_flags: [], environment_allowlist_ref: "antigravity-v1",
    auth_failure_detection: [], limitations: ["Controlled pair-admission regression."],
  }]));
  const registration = (surface: SurfaceId) => registrations.get(surface);
  const run = (pair: readonly ExecutionIdentity[] = executions, constraints = STRICT, organizations: ReadonlyMap<SurfaceId, string> = new Map()) =>
    evaluatePairEligibilityWithDependencies(pair, constraints, organizations, { registration });
  return { executions, registrations, registration, run };
}

test("fixture pair admission is isolated from public eligibility and package exports", () => {
  const f = fixturePair(), before = [...ADAPTER_REGISTRY];
  const denied = { ok: false, failure: "surface_not_admitted" } as const;
  expect(evaluatePairEligibility(f.executions, STRICT, new Map())).toEqual(denied);
  expect(f.run()).toEqual({ ok: true });
  expect(Reflect.apply(evaluatePairEligibility, undefined, [f.executions, STRICT, new Map(), { registration: f.registration }])).toEqual(denied);
  expect(protocol.evaluatePairEligibility(f.executions, STRICT, new Map())).toEqual(denied);
  expect(evaluatePairEligibilityWithDependencies(f.executions, STRICT, new Map(), { registration: () => undefined })).toEqual(denied);
  expect(f.run()).toEqual({ ok: true });
  expect([...ADAPTER_REGISTRY]).toEqual(before);
  for (const execution of f.executions) expect(ADAPTER_REGISTRY.has(execution.surface)).toBe(false);
  expect(Object.keys(protocol)).not.toContain("evaluatePairEligibilityWithDependencies");
});

test("the fixture resolver preserves pair rejection rules and their precedence", () => {
  const f = fixturePair(), [builder, reviewer] = f.executions;
  const cases: readonly (readonly [PairEligibilityFailure, Partial<ExecutionIdentity>])[] = [
    ["duplicate_execution_id", { execution_id: builder.execution_id, role: "observer" }],
    ["observer_not_active", { role: "observer", provider: builder.provider }],
    ["role_composition", { role: "builder" }],
    ["provider_not_distinct", { provider: ` ${builder.provider.toUpperCase()} `, independence_domain: builder.independence_domain }],
    ["independence_domain_not_distinct", { independence_domain: builder.independence_domain.toUpperCase().replaceAll("-", " ") }],
    ["self_review", { surface: builder.surface }],
    ["surface_not_admitted", { surface: parseSurfaceId("missing-fixture") }],
  ];
  for (const [failure, overrides] of cases) {
    expect(f.run([builder, { ...reviewer, ...overrides }])).toEqual({ ok: false, failure });
  }
  expect(() => f.run([builder])).toThrow(CardinalityError);
  expect(() => f.run([builder, reviewer, builder])).toThrow(CardinalityError);
  for (const change of [
    { require_distinct_providers: false }, { require_distinct_independence_domains: false },
    { prohibit_self_review: false }, { required_roles: ["builder", "builder"] },
  ]) {
    const constraints = { ...STRICT, ...change } as unknown as PairConstraintsV1;
    expect(f.run(f.executions, constraints)).toEqual({ ok: false, failure: "envelope_constraint_weaker" });
    expect(f.run([builder, { ...reviewer, surface: parseSurfaceId("missing-fixture") }], constraints))
      .toEqual({ ok: false, failure: "surface_not_admitted" });
  }
  const original = f.registrations.get(reviewer.surface)!;
  f.registrations.set(reviewer.surface, { ...original, organization_id: ` ${builder.provider.toUpperCase()} ` });
  expect(f.run()).toEqual({ ok: false, failure: "common_review_control" });
  expect(f.run([builder, { ...reviewer, surface: builder.surface }])).toEqual({ ok: false, failure: "self_review" });
  const supplied = new Map([[reviewer.surface, "separate-fixture-organization"]]);
  expect(f.run(f.executions, STRICT, supplied)).toEqual({ ok: true });
});

test("fixture allowed pairs narrow eligibility without weakening any rule", () => {
  const f = fixturePair(), [builder, reviewer] = f.executions;
  const constraints: PairConstraintsV1 = { ...STRICT, allowed_surface_pairs: [[reviewer.surface, builder.surface]] };
  expect(f.run(f.executions, constraints)).toEqual({ ok: true });
  expect(f.run([reviewer, builder], constraints)).toEqual({ ok: true });
  expect(f.run(f.executions, { ...STRICT, allowed_surface_pairs: [] })).toEqual({ ok: false, failure: "surface_not_admitted" });
  expect(f.run(f.executions, { ...STRICT, allowed_surface_pairs: [[builder.surface, parseSurfaceId("other-fixture")]] }))
    .toEqual({ ok: false, failure: "surface_not_admitted" });
  expect(f.run([builder, { ...reviewer, provider: builder.provider }], constraints)).toEqual({ ok: false, failure: "provider_not_distinct" });
});
