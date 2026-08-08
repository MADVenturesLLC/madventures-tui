// permissions/engine.ts
// F6: Expanded permission engine.
// Enforces: roles/models, repository/worktree, paths, command categories,
// data class, egress, expiration, authorization reference, fencing tokens.
//
// No action is authorized without ALL checks passing.

import type {
  CliId,
  ActorIdentity,
  TaskEnvelope,
  TaskScope,
  OwnershipState,
  SessionState,
  CommandCategory,
  DataClass,
  FencingToken,
} from "../shared/types";
import type { OwnershipMachine } from "../broker/ownership-machine";
import type { SessionMachine } from "../broker/session-machine";

export interface AuthzResult {
  allowed: boolean;
  reason?: string;
  deniedBy?: PermissionCheck;
}

export type PermissionCheck =
  | "ownership"
  | "fencing-token"
  | "session-active"
  | "task-scope"
  | "path-allowed"
  | "command-category"
  | "data-class"
  | "egress"
  | "expiration"
  | "authz-ref"
  | "role-model";

// Role → allowed command categories
const ROLE_CATEGORIES: Record<string, CommandCategory[]> = {
  "founder": ["read", "write", "build", "test", "git", "shell", "network"],
  "architect": ["read", "write", "build", "test", "git"],
  "reviewer": ["read", "test"],
  "observer": ["read"],
};

// Model → max data class allowed
const MODEL_DATA_CLASS: Record<string, DataClass> = {
  "claude-sonnet-4": "confidential",
  "claude-opus-4": "restricted",
  "gemini-2.5-pro": "confidential",
  "gemini-2.5-flash": "internal",
};

const DATA_CLASS_RANK: Record<DataClass, number> = {
  "public": 0,
  "internal": 1,
  "confidential": 2,
  "restricted": 3,
};

export class PermissionEngine {
  constructor(
    private ownership: OwnershipMachine,
    private sessions: SessionMachine,
  ) {}

  /**
   * Full authorization check for an action.
   * Every check must pass. First failure short-circuits.
   */
  authorize(
    actor: ActorIdentity,
    task: TaskEnvelope,
    action: {
      command: CommandCategory;
      path?: string;
      egress?: boolean;
      dataClass?: DataClass;
    },
    fencingToken: FencingToken,
  ): AuthzResult {
    // 1. Fencing token — reject stale owners
    if (!this.ownership.validateToken(fencingToken)) {
      return {
        allowed: false,
        reason: `Stale fencing token ${fencingToken}, current is ${this.ownership.token}`,
        deniedBy: "fencing-token",
      };
    }

    // 2. Ownership — actor must be the current holder
    const ownership = this.ownership.current;
    if (ownership.status !== "owned" || ownership.holder !== actor.cli) {
      return {
        allowed: false,
        reason: `Not the current owner (status: ${ownership.status}, holder: ${ownership.holder ?? "none"})`,
        deniedBy: "ownership",
      };
    }

    // 3. Session must be active
    const session = this.sessions.get(actor.cli);
    if (session.status !== "active") {
      return {
        allowed: false,
        reason: `Session is ${session.status}, must be active`,
        deniedBy: "session-active",
      };
    }

    // 4. Task scope — command category must be in scope
    if (!task.scope.commandCategories.includes(action.command)) {
      return {
        allowed: false,
        reason: `Command category "${action.command}" not in task scope: ${task.scope.commandCategories.join(", ")}`,
        deniedBy: "command-category",
      };
    }

    // 5. Path check — if a path is specified, must be within allowed scope
    if (action.path) {
      if (!this.isPathAllowed(action.path, task.scope.paths, task.worktree)) {
        return {
          allowed: false,
          reason: `Path "${action.path}" not in allowed paths for this task`,
          deniedBy: "path-allowed",
        };
      }
    }

    // 6. Data class — actor's model must be cleared for this data class
    if (action.dataClass) {
      const modelMax = MODEL_DATA_CLASS[actor.model] ?? "public";
      if (DATA_CLASS_RANK[action.dataClass] > DATA_CLASS_RANK[modelMax]) {
        return {
          allowed: false,
          reason: `Model ${actor.model} can handle ${modelMax}, action requires ${action.dataClass}`,
          deniedBy: "data-class",
        };
      }
    }

    // 7. Egress — must be explicitly allowed in task scope
    if (action.egress && !task.scope.egressAllowed) {
      return {
        allowed: false,
        reason: "Network egress not allowed in this task scope",
        deniedBy: "egress",
      };
    }

    // 8. Expiration — task must not be expired
    if (task.scope.expiresAt !== null && Date.now() > task.scope.expiresAt) {
      return {
        allowed: false,
        reason: `Task expired at ${new Date(task.scope.expiresAt).toISOString()}`,
        deniedBy: "expiration",
      };
    }

    // 9. Authorization reference — actor's authzRef must permit the command
    const allowedCategories = ROLE_CATEGORIES[actor.authzRef];
    if (!allowedCategories || !allowedCategories.includes(action.command)) {
      return {
        allowed: false,
        reason: `Authorization ref "${actor.authzRef}" does not permit "${action.command}"`,
        deniedBy: "authz-ref",
      };
    }

    // 10. Role/model consistency — model must be in the known registry
    if (!(actor.model in MODEL_DATA_CLASS)) {
      return {
        allowed: false,
        reason: `Unknown model "${actor.model}" — not in permission registry`,
        deniedBy: "role-model",
      };
    }

    return { allowed: true };
  }

  /**
   * Check if a path is within the allowed set.
   * Paths are globs relative to the worktree root.
   */
  private isPathAllowed(path: string, allowedPaths: string[], worktree: string): boolean {
    // Normalize — remove worktree prefix if present
    const normalized = path.startsWith(worktree)
      ? path.slice(worktree.length).replace(/^\//, "")
      : path;

    for (const pattern of allowedPaths) {
      if (this.matchGlob(normalized, pattern)) return true;
    }
    return false;
  }

  /**
   * Simple glob matching: * matches any chars except /, ** matches anything.
   */
  private matchGlob(path: string, pattern: string): boolean {
    // Convert glob to regex
    const regexStr = pattern
      .replace(/\*\*/g, "<<<GLOBSTAR>>>")
      .replace(/\*/g, "[^/]*")
      .replace(/<<<GLOBSTAR>>>/g, ".*")
      .replace(/\?/g, "[^/]");
    const regex = new RegExp(`^${regexStr}$`);
    return regex.test(path);
  }

  // ── Transfer-specific checks ──

  canRequestTransfer(actor: ActorIdentity, token: FencingToken): AuthzResult {
    if (!this.ownership.validateToken(token)) {
      return { allowed: false, reason: "Stale fencing token", deniedBy: "fencing-token" };
    }
    const ownership = this.ownership.current;
    if (ownership.status !== "owned" || ownership.holder !== actor.cli) {
      return { allowed: false, reason: "Not the current owner", deniedBy: "ownership" };
    }
    return { allowed: true };
  }

  canAcceptTransfer(actor: ActorIdentity): AuthzResult {
    const ownership = this.ownership.current;
    if (ownership.status !== "sender-released") {
      return { allowed: false, reason: `No transfer pending (status: ${ownership.status})`, deniedBy: "ownership" };
    }
    if (ownership.transferTo !== actor.cli) {
      return { allowed: false, reason: `Transfer targeted at ${ownership.transferTo}, not ${actor.cli}`, deniedBy: "ownership" };
    }
    return { allowed: true };
  }

  canAttest(actor: ActorIdentity): AuthzResult {
    const ownership = this.ownership.current;
    const session = this.sessions.get(actor.cli);

    // Can attest during receiver-validating (transfer) or reconciling (resume after pause)
    if (ownership.status === "sender-released" && ownership.transferTo === actor.cli) {
      return { allowed: true };
    }
    if (session.status === "reconciling" && ownership.holder === actor.cli) {
      return { allowed: true };
    }
    return {
      allowed: false,
      reason: `Attestation not applicable (ownership: ${ownership.status}, session: ${session.status})`,
      deniedBy: "ownership",
    };
  }

  canReleaseOwnership(actor: ActorIdentity, token: FencingToken): AuthzResult {
    if (!this.ownership.validateToken(token)) {
      return { allowed: false, reason: "Stale fencing token", deniedBy: "fencing-token" };
    }
    if (this.ownership.current.status !== "owned" || this.ownership.current.holder !== actor.cli) {
      return { allowed: false, reason: "Not the current owner", deniedBy: "ownership" };
    }
    return { allowed: true };
  }
}
