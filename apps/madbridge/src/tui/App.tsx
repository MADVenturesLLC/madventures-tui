import type {} from "@opentui/react"
import { TextAttributes } from "@opentui/core"
import React from "react"

export function App() {
  return (
    <box border={true} borderStyle="rounded" paddingLeft={1} paddingRight={1}>
      <text fg="green" attributes={TextAttributes.BOLD}>
        MADVentures TUI
      </text>
    </box>
  )
}

export default App