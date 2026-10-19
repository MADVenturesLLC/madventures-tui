// apps/madv-agent/src/tui/components/PromptInput.tsx
// The prompt row: a single-line input. Enter submits; Ctrl+C exits (handled
// by the App keyboard route). Presentation only.
//
// Submit is wired through InputRenderableEvents.ENTER (the renderable's own
// event API via ref) rather than the onSubmit JSX prop, whose type intersects
// with @types/react's DOM input onSubmit and cannot be satisfied directly.

import { useEffect, useRef } from "react";
import { InputRenderable, InputRenderableEvents } from "@opentui/core";

export function PromptInput(props: {
  onSubmit: (value: string) => void;
  disabled: boolean;
}) {
  const inputRef = useRef<InputRenderable | null>(null);
  const onSubmitRef = useRef(props);
  onSubmitRef.current = props;

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const handler = () => {
      const value = input.value;
      const current = onSubmitRef.current;
      if (!current.disabled && value.trim().length > 0) {
        input.value = "";
        current.onSubmit(value);
      }
    };
    input.on(InputRenderableEvents.ENTER, handler);
    return () => {
      input.off(InputRenderableEvents.ENTER, handler);
    };
  }, [inputRef.current]);

  return (
    <box
      style={{
        height: 3,
        border: true,
        borderColor: props.disabled ? "#555555" : "#4a9eff",
        paddingLeft: 1,
        paddingRight: 1,
      }}
    >
      <input
        ref={(instance: InputRenderable | null) => {
          inputRef.current = instance;
        }}
        focused={!props.disabled}
        placeholder={
          props.disabled
            ? "(waiting for the model…)"
            : "type a message · enter to send · ctrl+c to exit"
        }
      />
    </box>
  );
}
