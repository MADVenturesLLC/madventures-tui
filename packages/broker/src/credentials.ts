// packages/broker/src/credentials.ts
// Short-lived per-execution credentials.

export interface Credential {
  readonly credentialPath: string;
  readonly fencingToken: number;
  readonly executionId: string;
}

export function validateCredential(
  credential: Credential,
  expectedExecutionId: string,
  expectedFencingToken: number,
): boolean {
  if (credential.executionId !== expectedExecutionId) return false;
  if (credential.fencingToken !== expectedFencingToken) return false;
  if (credential.credentialPath.length === 0) return false;
  return true;
}

export function createCredential(executionId: string, fencingToken: number): Credential {
  return {
    credentialPath: `/tmp/madv-cred-${executionId}-${fencingToken}`,
    fencingToken,
    executionId,
  };
}