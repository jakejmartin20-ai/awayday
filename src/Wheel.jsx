import { useEffect, useRef, useState } from 'react'
import { Header, Strip, Kicker, Loud, Quiet } from './Frame'
import { teamById, cityForGame, fmtDate } from './data'

const SLICE_COLORS = ['#C8102E', '#1C1C1C', '#D9A441', '#1B3A5C']
const R = 100
const DURATION = 5500 // ~5.5 seconds, heavy ease-out. Locked Session 2.

// Label runs RADIALLY — from near the hub out to the rim, along the slice's
// centreline. That gives even PHILADELPHIA the full length of the slice.
const LABEL_OUTER = 94
const LABEL_INNER = 30

const pt = (deg, r) => {
  const rad = (deg * Math.PI) / 180
  return [r * Math.sin(rad), -r * Math.cos(rad)]
}

export default function Wheel({ team, games, onBack, onSeeTrip }) {
  const n = games.length
  const slice = 360 / n

  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [winner, setWinner] = useState(null)
  const [ticker, setTicker] = useState('')
  const [needle, setNeedle] = useState(0)

  const raf = useRef(null)
  const lastIdx = useRef(-1)

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  // Which slice is under the needle right now, and how far through it we are.
  const idxUnder = (rot) => {
    const a = (((360 - (rot % 360)) % 360) + 360) % 360
    return Math.floor(a / slice) % n
  }
  const phaseUnder = (rot) => {
    const a = (((360 - (rot % 360)) % 360) + 360) % 360
    return (a % slice) / slice
  }

  const spin = () => {
    if (spinning) return
    setWinner(null)
    setSpinning(true)
    lastIdx.current = -1

    const target = Math.floor(Math.random() * n)
    const jitter = (Math.random() - 0.5) * (slice - 8)
    const desired = (360 - ((target + 0.5) * slice + jitter) + 720) % 360
    const start = rotation
    const startMod = ((start % 360) + 360) % 360
    const end = start + 360 * 5 + ((desired - startMod + 360) % 360)

    const t0 = performance.now()
    let prev = start
    const ease = (p) => 1 - Math.pow(1 - p, 4)

    const stepFrame = (now) => {
      const p = Math.min(1, (now - t0) / DURATION)
      const rot = start + (end - start) * ease(p)

      // Needle deflection scales with speed, so the ticking dies away as it slows.
      const speed = Math.abs(rot - prev)
      prev = rot
      const deflect = Math.min(15, speed * 0.75)
      setNeedle(deflect * Math.sin(phaseUnder(rot) * Math.PI * 2))
      setRotation(rot)

      const i = idxUnder(rot)
      if (i !== lastIdx.current) {
        lastIdx.current = i
        setTicker(cityForGame(games[i]).city)
      }

      if (p < 1) {
        raf.current = requestAnimationFrame(stepFrame)
      } else {
        setNeedle(0)
        setTicker('')
        setWinner(target)
        setSpinning(false)
      }
    }
    raf.current = requestAnimationFrame(stepFrame)
  }

  const wonGame = winner === null ? null : games[winner]
  const wonCity = wonGame ? cityForGame(wonGame) : null
  const wonOpp = wonGame ? teamById(wonGame.homeTeamId) : null

  return (
    <div className="app">
      <Header onBack={onBack} />
      <Strip left={team.name} right={`${n} Slices`} />
      <Kicker>
        {spinning ? 'Fate is deciding' : winner === null ? 'Spin the wheel' : 'Fate picked'}
      </Kicker>

      <div className="wheel-wrap">
        <svg className="wheel-svg" viewBox="-112 -122 224 234" role="img" aria-label="Away game wheel">
          <g transform={`rotate(${rotation})`}>
            {games.map((g, i) => {
              const a0 = i * slice
              const a1 = a0 + slice
              const [x0, y0] = pt(a0, R)
              const [x1, y1] = pt(a1, R)
              const large = slice > 180 ? 1 : 0
              const mid = a0 + slice / 2
              // Right half of the wheel reads outward; left half reads inward,
              // so no label is ever upside down.
              const leftHalf = mid > 180
              return (
                <g key={g.id}>
                  <path
                    d={`M 0 0 L ${x0} ${y0} A ${R} ${R} 0 ${large} 1 ${x1} ${y1} Z`}
                    fill={SLICE_COLORS[i % SLICE_COLORS.length]}
                    stroke="#EFE7D6"
                    strokeWidth="1.5"
                  />
                  <g transform={`rotate(${mid})`}>
                    <text
                      className="slice-label"
                      fill="#EFE7D6"
                      dominantBaseline="middle"
                      transform={leftHalf ? 'rotate(90) skewX(-10)' : 'rotate(-90) skewX(-10)'}
                      x={leftHalf ? -LABEL_OUTER : LABEL_OUTER}
                      textAnchor={leftHalf ? 'start' : 'end'}
                      textLength={LABEL_OUTER - LABEL_INNER}
                      lengthAdjust="spacingAndGlyphs"
                    >
                      {cityForGame(g).city}
                    </text>
                  </g>
                </g>
              )
            })}

            {winner !== null &&
              (() => {
                const a0 = winner * slice
                const a1 = a0 + slice
                const [x0, y0] = pt(a0, R)
                const [x1, y1] = pt(a1, R)
                const large = slice > 180 ? 1 : 0
                return (
                  <path
                    d={`M 0 0 L ${x0} ${y0} A ${R} ${R} 0 ${large} 1 ${x1} ${y1} Z`}
                    fill="none"
                    stroke="#EFE7D6"
                    strokeWidth="5"
                  />
                )
              })()}
          </g>

          {/* hub — plain cream disc. It caps the eight slice points and says nothing.
              No monogram, and no scarlet line: it read as an object, not furniture. */}
          <circle cx="0" cy="0" r="17" fill="#EFE7D6" stroke="#1C1C1C" strokeWidth="2" />

          {/* needle — fixed at the top, flicks as slices pass under it */}
          <g transform={`rotate(${needle})`}>
            <polygon points="0,-88 -9,-115 9,-115" fill="#1C1C1C" />
          </g>
        </svg>
      </div>

      <div className="ticker">{ticker}</div>

      {wonGame ? (
        <>
          <div className="landing-city">
            <span className="skew">{wonCity.city}</span>
          </div>
          <div className="lower-third">
            <span className="lt-label skew">at {wonOpp.name}</span>
            <span className="lt-date">{fmtDate(wonGame.date)}</span>
          </div>
          <Loud onClick={() => onSeeTrip(wonGame)}>See the trip</Loud>
          <Quiet onClick={spin} disabled={spinning}>
            Spin again
          </Quiet>
        </>
      ) : (
        <Loud onClick={spin} disabled={spinning}>
          {spinning ? 'Spinning…' : 'Spin'}
        </Loud>
      )}
    </div>
  )
}
