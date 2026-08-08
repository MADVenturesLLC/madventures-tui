// src/tui/components/ApprovalDialog.tsx
import { TextAttributes } from "@opentui/core";
import type { ApprovalRequest } from "../../shared/types";

interface Props {
  request: ApprovalRequest;
  onAccept: () => void;
  onReject: () => void;
}

export function ApprovalDialog({ request }: Props) {
  return (
    <box
      position="absolute"
      top="30%"
      left="20%"
      width="60%"
      borderStyle="double"
      borderColor="yellow"
      flexDirection="column"
      paddingLeft={2}
      paddingRight={2}
      paddingTop={1}
      paddingBottom={1}
    >
      <text fg="yellow" attributes={TextAttributes.BOLD}>
        Approval Required: {request.type.toUpperCase()}
      </text>
      <box paddingTop={1} paddingBottom={1}>
        <text>{request.detail}</text>
      </box>
      <box paddingTop={1}>
        <text fg="gray">Requested by: {request.requestedBy}</text>
      </box>
      <box paddingTop={1}>
        <text fg="green">[Y] Accept</text>
        <text>  </text>
        <text fg="red">[N] Reject</text>
      </box>
    </box>
  );
}
