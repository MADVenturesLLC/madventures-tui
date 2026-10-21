// apps/madv-agent/src/tui/components/ApprovalDialog.tsx
// N4: the approval question, inside the pane.
//
// N3 shipped the gate but not the dialog, so the chat refused everything that
// needed approval. This renders the same four fields the terminal prompt shows
// (tool, kind, action, detail) — sanitised, because a tool argument is
// model-authored text — and states the answer keys. It has no "allow once and
// remember" affordance on purpose: approval is per invocation.

import { TextAttributes } from "@opentui/core";
import type { ApprovalRequest } from "../../approval";
import { sanitizeForDisplay } from "../../approval";

export function ApprovalDialog(props: { request: ApprovalRequest }) {
  const { request } = props;
  return (
    <box
      title=" approval required "
      borderStyle="rounded"
      borderColor="#5fd7d7"
      flexDirection="column"
      paddingLeft={1}
      paddingRight={1}
    >
      <text>
        <span fg="#5fd7d7" attributes={TextAttributes.BOLD}>
          {sanitizeForDisplay(request.tool, 80)}
        </span>
        {` (${sanitizeForDisplay(request.kind, 24)})`}
      </text>
      <text>{`  action: ${sanitizeForDisplay(request.summary, 200)}`}</text>
      <text>{`  detail: ${sanitizeForDisplay(request.detail, 400)}`}</text>
      <text attributes={TextAttributes.DIM}>
        {"  [y] approve   [n] deny   (other keys are ignored)"}
      </text>
    </box>
  );
}
