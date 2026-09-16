export function HelpOverlay(props: { onClose: () => void }) {
  return (
    <div className="center-overlay" onClick={props.onClose}>
      <div className="help-card panel" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Keyboard help">
        <span className="label">keyboard</span>
        <table>
          <tbody>
            <tr><td>j / ↓</td><td>next subject</td></tr>
            <tr><td>k / ↑</td><td>previous subject</td></tr>
            <tr><td>Enter</td><td>open evidence drawer</td></tr>
            <tr><td>Esc</td><td>close drawer / help</td></tr>
            <tr><td>f</td><td>cycle verdict filter</td></tr>
            <tr><td>r</td><td>cycle RoomStatus fixture scenario</td></tr>
            <tr><td>c</td><td>copy selected subject SHA</td></tr>
            <tr><td>?</td><td>toggle this help</td></tr>
          </tbody>
        </table>
        <p className="reason" style={{ marginTop: "16px" }}>
          Status color comes only from the verdict / memory tone maps. A green
          chip exists only where a verified verdict object and a VALID memory
          record exist behind it. RoomStatus chips obey the same rule: a
          completed phase renders green only with evidence refs, and an
          illegal record is shown as verifying with an IR_FAULT banner — never
          painted success.
        </p>
      </div>
    </div>
  );
}
