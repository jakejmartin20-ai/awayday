import { useEffect, useRef, useState } from 'react'
import { Header, Strip, Kicker, Loud, Quiet } from './Frame'

// ---------------------------------------------------------------------------
// AWAY DAY — THE WHEEL
// The only moving part in the app.
//
// It is handed a small, fixed set of games (nine, or the whole slate if the
// slate was already nine or fewer). It knows nothing about the deal.
// ---------------------------------------------------------------------------

const R = 150            // wheel radius
const CX = 165           // centre
const CY = 165
const HUB = 34           // hub radius
// S18: 5500 -> 4000. Tuned against the deal-map, where the wheel is no longer
// something you TAP — the map deals, the pins fly to the rim, and it spins on
// its own. 5.5s of wheel on top of 3.4s of map is nine seconds of hands-off
// animation, and the third run is the one that tells the truth.
//
// ONE NUMBER FOR BOTH MODES. The app has ONE MOVING PART (S6) — it does not
// get two timings. So this shortens Mode 1's wheel too, and Mode 1 gets
// re-tapped because of it.
//
// ⚠️ DO NOT CUT IT FURTHER WITHOUT WATCHING THE END. The easing is heavy on
// purpose (1 - (1-t)^4) so the needle CRAWLS as it settles, ticking past two
// or three towns barely moving. That crawl IS the near-miss, and the near-miss
// is the drama (S6). Below 4s it stops fighting to settle and just stops.
const SPIN_MS = 4000     // heavy ease-out, ~4 seconds
const PALETTE = ['scarlet', 'charcoal', 'gold', 'navy']

const FILL = {
  scarlet: '#C8102E',
  charcoal: '#1C1C1C',
  gold: '#D9A441',
  navy: '#1B3A5C'
}

// Colour the slices so NO TWO NEIGHBOURS MATCH — including across the wrap,
// where slice 9 sits back beside slice 1. Works for any slice count.
function sliceColours(n) {
  const out = []
  for (let i = 0; i < n; i++) {
    let c = PALETTE[i % PALETTE.length]
    const prev = out[i - 1]
    const last = i === n - 1
    if (c === prev || (last && c === out[0])) {
      c = PALETTE.find(x => x !== prev && !(last && x === out[0])) || c
    }
    out.push(c)
  }
  return out
}

// A wedge, in degrees clockwise from the top.
function wedgePath(from, to) {
  const a = (deg) => {
    const r = ((deg - 90) * Math.PI) / 180
    return [CX + R * Math.cos(r), CY + R * Math.sin(r)]
  }
  const [x1, y1] = a(from)
  const [x2, y2] = a(to)
  const big = to - from > 180 ? 1 : 0
  return `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${big} 1 ${x2} ${y2} Z`
}

const easeOut = (t) => 1 - Math.pow(1 - t, 4) // heavy — it hangs at the end

// AUTO (S18, Mode 2). The deal-map already gave you the beat, and the pins have
// just become this rim. Landing on a static wheel and being asked to press a
// button you were always going to press is dead air — A BUTTON YOU WERE ALWAYS
// GOING TO PRESS IS A FAKE DECISION. The commitment lives on the DATE screen
// now, and fate runs unbroken from there to the result.
//
// Both modes auto-spin now: the CTA on the previous screen (Wildcard's deal-map,
// Team Away Day's slate "Spin") IS the spin, so the wheel settles for a beat and
// goes on its own — no second tap. The Spin button below is a fallback only.
const AUTO_MS = 260

export default function Wheel({ games, title, dealt, auto, onResult, onSpinAgain, onDealAgain, onBack, onHome }) {
  const n = games.length
  const step = 360 / n
  const colours = sliceColours(n)

  const [rot, setRot] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [winner, setWinner] = useState(null)
  const [ticker, setTicker] = useState('')
  const [flick, setFlick] = useState(0)

  const raf = useRef(0)
  const rotRef = useRef(0)
  const passing = useRef(-1)

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  // Auto-spin: a beat for the rim to settle into a wheel, then fate goes.
  useEffect(() => {
    if (!auto) return
    const t = setTimeout(() => spin(), AUTO_MS)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto])

  // Which slice is sitting under the needle right now?
  const underNeedle = (r) => {
    const local = (360 - (r % 360) + 360) % 360
    return Math.floor(local / step) % n
  }

  const spin = () => {
    if (spinning) return
    setWinner(null)
    setSpinning(true)

    const pick = Math.floor(Math.random() * n)
    const centre = pick * step + step / 2
    const from = rotRef.current
    const landing = (360 - ((from + centre) % 360) + 360) % 360
    const target = from + 360 * 6 + landing

    const t0 = performance.now()
    let prev = from

    const frame = (now) => {
      const t = Math.min((now - t0) / SPIN_MS, 1)
      const r = from + (target - from) * easeOut(t)

      // Needle deflection scales with speed, and it ticks on every slice edge.
      const speed = r - prev
      prev = r
      const idx = underNeedle(r)
      if (idx !== passing.current) {
        passing.current = idx
        setTicker(`${games[idx].city}${games[idx].sliceCode ? ' \u00b7 ' + games[idx].sliceCode : ''}`)
        setFlick(Math.min(14, speed * 0.5))
      } else {
        setFlick(f => f * 0.82)
      }

      rotRef.current = r
      setRot(r)

      if (t < 1) {
        raf.current = requestAnimationFrame(frame)
      } else {
        setFlick(0)
        setTicker('')
        setSpinning(false)
        setWinner(pick)
      }
    }
    raf.current = requestAnimationFrame(frame)
  }

  const win = winner === null ? null : games[winner]

  return (
    <>
      <Header onBack={spinning ? undefined : onBack} onHome={spinning ? undefined : onHome} />
      <Strip left={title} right={`${n} TOWNS ON THE WHEEL`} />

      <div className="pad">
        <Kicker>{win ? 'Fate picked' : spinning ? 'Fate is deciding' : 'Spin it'}</Kicker>

        <div className="wheel-wrap">
          <svg viewBox="0 0 330 345" className="wheel" role="img" aria-label="The wheel">
            <g transform={`rotate(${rot} ${CX} ${CY})`}>
              {games.map((g, i) => {
                const from = i * step
                const to = from + step
                const mid = from + step / 2
                const angle = mid - 90                      // maths angle, degrees
                const norm = ((angle % 360) + 360) % 360
                const flip = norm > 90 && norm < 270         // would read upside-down
                const rr = R - 12
                const rad = (angle * Math.PI) / 180
                const lx = CX + rr * Math.cos(rad)
                const ly = CY + rr * Math.sin(rad)
                const c = colours[i]
                return (
                  <g key={g.id}>
                    <path d={wedgePath(from, to)} fill={FILL[c]} stroke="#EFE7D6" strokeWidth="1" />
                    <text
                      className="slice-label"
                      x={lx}
                      y={ly}
                      fill={c === 'gold' ? '#1C1C1C' : '#EFE7D6'}
                      textAnchor={flip ? 'start' : 'end'}
                      dominantBaseline="middle"
                      transform={`rotate(${flip ? angle + 180 : angle} ${lx} ${ly})`}
                      style={{ fontSize: (g.city.length + g.sliceCode.length) > 15 ? 8 : 9 }}
                    >
                      {g.city.toUpperCase()}
                      {g.sliceCode && (
                        <tspan className="slice-state" dx="3">{g.sliceCode}</tspan>
                      )}
                    </text>
                  </g>
                )
              })}
            </g>

            {/* The winner's outline is drawn OVER everything — never inside the
                wedge, or its neighbours paint on top of it. */}
            {winner !== null && (
              <g transform={`rotate(${rot} ${CX} ${CY})`} pointerEvents="none">
                <path
                  d={wedgePath(winner * step, winner * step + step)}
                  fill="none"
                  stroke="#EFE7D6"
                  strokeWidth="6"
                  strokeLinejoin="round"
                />
                <path
                  d={wedgePath(winner * step, winner * step + step)}
                  fill="none"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </g>
            )}

            {/* Hub — a plain cream disc. It says nothing at all. */}
            <circle cx={CX} cy={CY} r={HUB} fill="#EFE7D6" stroke="#1C1C1C" strokeWidth="3" />

            {/* Needle, fixed at the top, flicking as slices pass. */}
            <g transform={`rotate(${flick} ${CX} 18)`}>
              <path d={`M ${CX - 11} 6 L ${CX + 11} 6 L ${CX} 34 Z`} fill="#1C1C1C" />
            </g>
          </svg>
        </div>

        <div className="ticker">{ticker || '\u00A0'}</div>

        {win ? (
          <div className="landing">
            <div className="landing-city">{win.city}</div>
            <div className="landing-state">{win.stateCode}</div>
            {/* 🔴 S20. The wheel deals a TOWN, and a town is rarely one game.
                Naming a single fixture here was the last place the app still
                pretended otherwise. */}
            <div className="lower-third">
              <span className="lt-left">
                {win.games.length === 1 ? win.fixture : `${win.games.length} games on`}
              </span>
              <span className="lt-right">
                {win.games.length === 1
                  ? win.date
                  : `${win.games[0].date} \u2013 ${win.games[win.games.length - 1].date}`}
              </span>
            </div>
            <Loud onClick={() => onResult(win)}>See the trip</Loud>
            <Quiet onClick={() => { setWinner(null); onSpinAgain && onSpinAgain(); spin() }}>Spin again</Quiet>
            {dealt && <Quiet onClick={onDealAgain}>Deal again</Quiet>}
          </div>
        ) : auto ? (
          // No button. The previous screen had it.
          <div className="landing" />
        ) : (
          <div className="landing">
            <Loud onClick={spin} disabled={spinning}>{spinning ? 'Spinning' : 'Spin'}</Loud>
          </div>
        )}
      </div>
    </>
  )
}
