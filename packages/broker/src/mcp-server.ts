// packages/broker/src/mcp-server.ts
// MCP server tool definitions. Exposes exactly the 16 allowed bridge tools.

export interface McpToolDef {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

const MCP_TOOLS: McpToolDef[] = [
  { name: "bridge.session.status", description: "Get current session status", inputSchema: {} },
  { name: "bridge.inbox.list", description: "List messages in inbox", inputSchema: {} },
  { name: "bridge.inbox.acknowledge", description: "Acknowledge receipt of a message", inputSchema: { properties: { messageId: { type: "string" } }, required: ["messageId"] } },
  { name: "bridge.message.send", description: "Send a typed message to the other CLI", inputSchema: { properties: { to: { type: "string" }, content: { type: "string" } }, required: ["to", "content"] } },
  { name: "bridge.action.request", description: "Request a typed action from the other CLI", inputSchema: { properties: { action: { type: "string" }, target: { type: "string" } }, required: ["action", "target"] } },
  { name: "bridge.action.respond", description: "Accept or reject a requested action", inputSchema: { properties: { requestId: { type: "string" }, decision: { type: "string", enum: ["accept", "reject"] } }, required: ["requestId", "decision"] } },
  { name: "bridge.artifact.publish", description: "Publish an artifact for inspection", inputSchema: { properties: { type: { type: "string" }, hash: { type: "string" }, taskId: { type: "string" } }, required: ["type", "hash", "taskId"] } },
  { name: "bridge.artifact.inspect", description: "Inspect a published artifact", inputSchema: { properties: { artifactId: { type: "string" } }, required: ["artifactId"] } },
  { name: "bridge.ownership.request", description: "Request ownership transfer", inputSchema: { properties: { to: { type: "string" }, reason: { type: "string" } }, required: ["to", "reason"] } },
  { name: "bridge.ownership.release", description: "Release ownership voluntarily", inputSchema: { properties: { fencingToken: { type: "number" } }, required: ["fencingToken"] } },
  { name: "bridge.ownership.accept", description: "Accept an incoming ownership transfer", inputSchema: { properties: { transferId: { type: "string" } }, required: ["transferId"] } },
  { name: "bridge.ownership.reject", description: "Reject an incoming ownership transfer", inputSchema: { properties: { transferId: { type: "string" }, reason: { type: "string" } }, required: ["transferId", "reason"] } },
  { name: "bridge.verification.record", description: "Submit a verification record", inputSchema: { properties: { taskId: { type: "string" }, what: { type: "string" }, result: { type: "string", enum: ["pass", "fail", "warning"] } }, required: ["taskId", "what", "result"] } },
  { name: "bridge.review.record", description: "Submit a review verdict for an artifact", inputSchema: { properties: { artifactId: { type: "string" }, decision: { type: "string", enum: ["approved", "changes-requested", "rejected"] }, comments: { type: "string" } }, required: ["artifactId", "decision", "comments"] } },
  { name: "bridge.session.pause", description: "Request governed pause", inputSchema: { properties: { reason: { type: "string" } }, required: ["reason"] } },
  { name: "bridge.session.close", description: "Request governed closure", inputSchema: { properties: { summary: { type: "string" } }, required: ["summary"] } },
];

export { MCP_TOOLS };

export class McpServer {
  get tools(): McpToolDef[] {
    return MCP_TOOLS;
  }

  listTools(): McpToolDef[] {
    return MCP_TOOLS;
  }
}