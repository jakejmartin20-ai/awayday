// ---------------------------------------------------------------------------
// AWAY DAY — STANDING FURNITURE
// Every screen is built out of these five pieces. Change them here, change the
// whole broadcast.
// ---------------------------------------------------------------------------

export function Header({ onBack }) {
  return (
    <div className="header">
      {onBack
        ? <button className="back" onClick={onBack} aria-label="Back">&#8592;</button>
        : <span className="back back--empty" aria-hidden="true" />}
      <span className="wordmark">Away Day</span>
      <span className="wordmark-bar" />
    </div>
  )
}

export function Strip({ left, right }) {
  return (
    <div className="strip">
      <span className="strip-left">{left}</span>
      <span className="strip-right">{right}</span>
    </div>
  )
}

export function Kicker({ children }) {
  return <div className="kicker">{children}</div>
}

export function Loud({ children, onClick, disabled }) {
  return (
    <button className="btn btn--loud" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export function Quiet({ children, onClick, disabled }) {
  return (
    <button className="btn btn--quiet" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
