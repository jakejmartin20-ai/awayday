import { useEffect, useRef, useState } from 'react'
import { Header, Strip, Kicker, Loud } from './Frame'
import {
  LEAGUES, SLICES, teamsInLeague, teamById, awaySlate, townsFromSlate,
  dateBounds, rangeLabel, rangeSlate, townsInRange
} from './data'
import Wheel from './Wheel'
import DealMap from './DealMap'
import Result from './Result'

// ---------------------------------------------------------------------------
// AWAY DAY
// Narrow the pool -> fate deals nine towns -> fate picks one -> the result.
//
// One state machine, no router. TWO WAYS IN, one ending:
//
//   MODE 1  mode -> league -> team -> slate  -> wheel (you tap) -> result
//   MODE 2  mode ->                   dates  -> deal-map -> wheel (auto) -> result
//
// The wheel and the result screen cannot tell the two modes apart. They are
// handed the same game object either way, and that is the whole architecture.
// ---------------------------------------------------------------------------

const SHUFFLE_MS = 1300   // fast and mechanical. If it lingers, it steals from the spin.
const PICK_MS = 130       // one row goes scarlet every 130ms
const HANDOFF_MS = 550    // beat after the last card leaves, then the wheel

const shuffled = (arr) => {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const oneOf = (arr) => arr[Math.floor(Math.random() * arr.length)]

// THE DEAL, in one line. Nine TOWNS, never nine fixtures — a town with two games
// on is one candidate, and fate takes one of its dates on the way out (S7).
const dealNine = (games) => shuffled(townsFromSlate(games)).slice(0, SLICES).map(oneOf)

// ---------------------------------------------------------------------------
// 1. MODE PICKER
// ---------------------------------------------------------------------------
function ModePicker({ onTeam, onOpenRoad }) {
  return (
    <>
      <Header />
      <Strip left="Choose your fate" right="" />
      <div className="pad">
        <Kicker>Two ways in</Kicker>

        <button className="card card--loud" onClick={onTeam}>
          <span className="card-title">Team Away Day</span>
          <span className="card-sub">Follow your team. Fate picks the away game.</span>
        </button>

        <button className="card card--loud" onClick={onOpenRoad}>
          <span className="card-title">Open Road</span>
          <span className="card-sub">Put in your free dates. Land somewhere you’d never have picked.</span>
        </button>
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// 2. LEAGUE PICKER — MODE 1 ONLY.
// MiLB, MLS and the USLs are MODE 2 ONLY. They carry `mode2Only: true` and are
// filtered out here. NFL and NHL carry no such key, so nothing shipped changes
// and the NHL bake needs no edit at all.
// ---------------------------------------------------------------------------
function LeaguePicker({ onPick, onBack }) {
  const leagues = LEAGUES.filter(l => l.mode2Only !== true)
  return (
    <>
      <Header onBack={onBack} />
      <Strip left="Team Away Day" right="Step 1 of 3" />
      <div className="pad">
        <Kicker>Pick a league</Kicker>

        {leagues.map(l => (
          <button key={l.id} className={`league league--${l.id}`} onClick={() => onPick(l.id)}>
            <span className="league-name">{l.name}</span>
            <span className="league-note">{l.note}</span>
          </button>
        ))}

        <p className="note">NHL joins on 16 July, when its schedule drops. NBA follows in August.</p>
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// 3. TEAM PICKER — a plain list. No club marks anywhere.
// ---------------------------------------------------------------------------
function TeamPicker({ leagueId, onPick, onBack }) {
  const league = LEAGUES.find(l => l.id === leagueId)
  const teams = teamsInLeague(leagueId)
  return (
    <>
      <Header onBack={onBack} />
      <Strip left={league.name} right="Step 2 of 3" />
      <div className="pad">
        <Kicker>Pick your team</Kicker>
        <div className="team-list">
          {teams.map(t => (
            <button key={t.id} className={`team-row team-row--${leagueId}`} onClick={() => onPick(t.id)}>
              <span className="team-name">{t.name}</span>
              <span className="chev">&#8250;</span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// 4. AWAY SLATE — and THE DEAL  (Mode 1)
// ---------------------------------------------------------------------------
function Slate({ team, games, autoDeal, onDealt, onBack }) {
  const towns = townsFromSlate(games)
  const needsDeal = towns.length > SLICES

  const [order, setOrder] = useState(games)
  const [phase, setPhase] = useState('idle')   // idle | shuffle | picking
  const [flash, setFlash] = useState(-1)
  const [picked, setPicked] = useState([])

  const timers = useRef([])
  const started = useRef(false)

  const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = [] }
  useEffect(() => () => clearAll(), [])

  const deal = () => {
    if (phase !== 'idle') return
    if (!needsDeal) { onDealt(towns.map(t => t[0]), false); return }

    setPhase('shuffle')

    const shuffleTick = () => {
      setOrder(o => shuffled(o))
      setFlash(Math.floor(Math.random() * Math.min(8, games.length)))
    }
    let t = 0
    while (t < SHUFFLE_MS) {
      timers.current.push(setTimeout(shuffleTick, t))
      t += 90
    }

    timers.current.push(setTimeout(() => {
      setFlash(-1)
      setPhase('picking')
      const nine = dealNine(games)

      nine.forEach((g, i) => {
        timers.current.push(setTimeout(() => {
          setOrder(o => [g, ...o.filter(x => x.id !== g.id)])
          setPicked(p => [...p, g.id])
        }, i * PICK_MS))
      })

      timers.current.push(setTimeout(() => onDealt(nine, true), SLICES * PICK_MS + HANDOFF_MS))
    }, SHUFFLE_MS))
  }

  useEffect(() => {
    if (autoDeal && !started.current) {
      started.current = true
      timers.current.push(setTimeout(deal, 300))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDeal])

  const busy = phase !== 'idle'
  const stripRight = phase === 'picking' ? `${SLICES} TOWNS ON THE WHEEL` : `${games.length} GAMES`
  const line = needsDeal
    ? `Fate deals nine of these ${towns.length} towns onto the wheel.`
    : 'Every one of these is a slice on the wheel.'

  return (
    <>
      <Header onBack={busy ? undefined : onBack} />
      <Strip left={team.name} right={stripRight} />

      <div className="pad">
        <Kicker>Your away slate</Kicker>
        <p className="note note--tight">{line}</p>

        <div className={`slate ${busy ? 'slate--busy' : ''}`}>
          {order.map((g, i) => {
            const isPicked = picked.includes(g.id)
            const isFlash = phase === 'shuffle' && i === flash
            return (
              <div
                key={g.id}
                className={`slate-row ${isPicked ? 'slate-row--picked' : ''} ${isFlash ? 'slate-row--flash' : ''}`}
              >
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="opp">{g.opponent}</span>
                <span className="when">{g.date}</span>
              </div>
            )
          })}
        </div>

        <div className="landing">
          <Loud onClick={deal} disabled={busy}>
            {busy ? 'Dealing' : needsDeal ? 'Deal the wheel' : 'Spin'}
          </Loud>
        </div>
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// 5. THE DATE PICKER  (Mode 2)
//
// 🔴 S20. YOU PICK A WINDOW, NOT A WEEKEND.
// The old screen listed fourteen weekends with a town-count beside each. Two
// things were wrong with it, and Jake found both.
//
//   1. IT IS A TRAVELLER FRAMING A TRIP. You might be away Thursday to Monday,
//      three months from now. "A weekend is its Saturday" was a rule written for
//      the machine, and it threw away every midweek game in the file.
//
//   2. THE COUNTS INVITED YOU TO SHOP. Eight of the fourteen rows read 58-60 and
//      were indistinguishable; the number only became legible as it FELL. So the
//      one thing the screen actually said was "the later weekends are worse" — a
//      scoreboard that ranked your own calendar. Telling you the odds before the
//      spin is the opposite of a roulette wheel (S4).
//
// So: no counts. The count survives, but it does exactly one job — IT GATES THE
// BUTTON. Nine slices need nine towns, and SPIN_MS/SLICES are the one moving
// part; we do not touch them. If the window cannot fill the wheel, the button is
// dead and says so. It never tells you how close you were.
//
// AND THIS SCREEN STILL CARRIES THE COMMITMENT. One loud button — and from here
// fate runs unbroken through the map, the rim and the wheel without asking you
// anything again.
// ---------------------------------------------------------------------------
const monthsBetween = (min, max) => {
  const out = []
  let [y, m] = [Number(min.slice(0, 4)), Number(min.slice(5, 7))]
  const [ey, em] = [Number(max.slice(0, 4)), Number(max.slice(5, 7))]
  while (y < ey || (y === ey && m <= em)) {
    out.push([y, m])
    m += 1
    if (m > 12) { m = 1; y += 1 }
  }
  return out
}

const iso = (y, m, d) =>
  `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`

function Month({ y, m, min, max, from, to, onPick }) {
  const first = new Date(y, m - 1, 1).getDay()          // 0 = Sunday
  const days = new Date(y, m, 0).getDate()
  const cells = []
  for (let i = 0; i < first; i++) cells.push(null)
  for (let d = 1; d <= days; d++) cells.push(d)

  return (
    <div className="cal-month">
      <div className="cal-name">{MONTH_NAMES[m - 1]} {y}</div>
      <div className="cal-grid">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={`h${i}`} className="cal-head">{d}</div>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <div key={`b${i}`} className="cal-blank" />
          const day = iso(y, m, d)
          const off = day < min || day > max
          const on = day === from || day === to
          const between = from && to && day > from && day < to
          return (
            <button
              key={day}
              className={`cal-day${off ? ' cal-day--off' : ''}${on ? ' cal-day--on' : ''}${between ? ' cal-day--in' : ''}`}
              disabled={off}
              onClick={() => onPick(day)}
            >
              {d}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const MONTH_NAMES = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']

function DatePicker({ onGo, onBack }) {
  const { min, max } = dateBounds()
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)

  // ONE TAP IS A ONE-DAY TRIP. A second tap forward extends it; a second tap
  // backward starts again. There is no mode, no "now pick the end date" state,
  // and no way to be left holding half a range.
  const pick = (day) => {
    if (!from || !to || day <= from) { setFrom(day); setTo(day); return }
    setTo(day)
  }

  const towns = from && to ? townsInRange(from, to) : 0
  const ready = towns >= SLICES

  const label = !from
    ? 'Pick your dates'
    : ready ? 'I\u2019m free \u2014 deal it'
            : 'Fate needs more room'

  return (
    <>
      <Header onBack={onBack} />
      <Strip left="Open Road" right="Pick your dates" />

      <div className="pad">
        <Kicker>When are you free?</Kicker>
        <p className="note note--tight">Fate picks the town. Wherever it lands — that’s the trip.</p>

        <div className="cal">
          {monthsBetween(min, max).map(([y, m]) => (
            <Month
              key={`${y}-${m}`}
              y={y} m={m} min={min} max={max}
              from={from} to={to} onPick={pick}
            />
          ))}
        </div>

        <div className="landing">
          {from && <div className="cal-chosen">{rangeLabel(from, to)}</div>}
          {from && !ready && (
            <p className="note note--tight">Nothing much is on. Widen your dates.</p>
          )}
          <Loud onClick={() => onGo(from, to)} disabled={!ready}>{label}</Loud>
        </div>
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// THE STATE MACHINE
// ---------------------------------------------------------------------------
export default function App() {
  const [screen, setScreen] = useState('mode')
  const [mode, setMode] = useState(null)          // 'team' | 'road'
  const [leagueId, setLeagueId] = useState(null)
  const [teamId, setTeamId] = useState(null)
  const [range, setRange] = useState(null)       // { from, to } — Mode 2's window
  const [slate, setSlate] = useState([])
  const [wheelGames, setWheelGames] = useState([])
  const [dealt, setDealt] = useState(false)
  const [autoDeal, setAutoDeal] = useState(false)
  const [dealNonce, setDealNonce] = useState(0)
  const [game, setGame] = useState(null)

  // Every screen opens at the top (S9).
  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [screen])

  const team = teamId ? teamById(teamId) : null
  const road = mode === 'road'

  // The strip's left-hand word, and the result screen's. In Mode 1 it is who you
  // follow; in Mode 2 there is no team — it is the weekend you gave away.
  const title = road
    ? (range ? rangeLabel(range.from, range.to) : 'Open Road')
    : (team ? team.name : '')
  const poolTowns = road ? townsFromSlate(slate).length : 0

  const pickTeam = (id) => {
    setTeamId(id)
    setSlate(awaySlate(id))
    setAutoDeal(false)
    setScreen('slate')
  }

  const onDealt = (nine, didDeal) => {
    setWheelGames(nine)
    setDealt(didDeal)
    setScreen('wheel')
  }

  // MODE 2's deal. No shuffling pile to watch — the MAP is the deal.
  const dealRange = (from, to) => {
    const games = rangeSlate(from, to)
    setRange({ from, to })
    setSlate(games)
    setWheelGames(dealNine(games))
    setDealt(true)
    setDealNonce(n => n + 1)
    setScreen('dealmap')
  }

  // DEAL AGAIN. Mode 1 goes back to the pile; Mode 2 goes back to the map.
  const dealAgain = () => {
    if (road) { dealRange(range.from, range.to); return }
    setAutoDeal(true)
    setDealNonce(n => n + 1)
    setScreen('slate')
  }

  return (
    <div className="app">
      {screen === 'mode' && (
        <ModePicker
          onTeam={() => { setMode('team'); setScreen('league') }}
          onOpenRoad={() => { setMode('road'); setScreen('dates') }}
        />
      )}

      {screen === 'league' && (
        <LeaguePicker
          onPick={(id) => { setLeagueId(id); setScreen('team') }}
          onBack={() => setScreen('mode')}
        />
      )}

      {screen === 'team' && (
        <TeamPicker leagueId={leagueId} onPick={pickTeam} onBack={() => setScreen('league')} />
      )}

      {screen === 'dates' && (
        <DatePicker onGo={dealRange} onBack={() => setScreen('mode')} />
      )}

      {screen === 'slate' && team && (
        <Slate
          key={`${teamId}-${dealNonce}`}
          team={team}
          games={slate}
          autoDeal={autoDeal}
          onDealt={onDealt}
          onBack={() => setScreen('team')}
        />
      )}

      {screen === 'dealmap' && (
        <DealMap
          key={`${range?.from}-${range?.to}-${dealNonce}`}
          games={wheelGames}
          title={title}
          poolTowns={poolTowns}
          onRim={() => setScreen('wheel')}
          onBack={() => setScreen('dates')}
        />
      )}

      {screen === 'wheel' && (
        <Wheel
          key={wheelGames.map(g => g.id).join('|')}
          games={wheelGames}
          title={title}
          dealt={dealt}
          auto={road}
          onResult={(g) => { setGame(g); setScreen('result') }}
          onDealAgain={dealAgain}
          onBack={() => {
            if (road) { setScreen('dates'); return }
            setAutoDeal(false)
            setScreen('slate')
          }}
        />
      )}

      {screen === 'result' && game && (
        <Result
          game={game}
          title={title}
          onSpinAgain={() => setScreen('wheel')}
          onBack={() => setScreen('wheel')}
        />
      )}
    </div>
  )
}
