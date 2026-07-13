// AWAY DAY — the standing furniture. Every screen is built out of these.

export function Header({ onBack }) {
  return (
    <div className="header">
      {onBack && (
        <button className="back" onClick={onBack} aria-label="Back">
          ←
        </button>
      )}
      <div className="wordmark skew">Away Day</div>
      <div className="wordmark-bar" />
    </div>
  )
}

export function Strip({ left, right }) {
  return (
    <div className="strip">
      <span>{left}</span>
      {right && <span className="strip-right">{right}</span>}
    </div>
  )
}

export function Kicker({ children }) {
  return <div className="kicker">{children}</div>
}

export function Loud({ children, onClick, disabled }) {
  return (
    <button className="btn btn-loud" onClick={onClick} disabled={disabled}>
      <span className="skew">{children}</span>
    </button>
  )
}

export function Quiet({ children, onClick, disabled }) {
  return (
    <button className="btn btn-quiet" onClick={onClick} disabled={disabled}>
      <span className="skew">{children}</span>
    </button>
  )
}
