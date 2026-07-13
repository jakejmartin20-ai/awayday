import { useEffect, useRef, useState } from 'react'
import { Header, Strip, Kicker, Loud, Quiet } from './Frame'
import { LEAGUES, TEAMS, SLICES, teamsInLeague, teamById, awaySlate, townsFromSlate } from './data'
import Wheel from './Wheel'
import Result from './Result'

// ---------------------------------------------------------------------------
// AWAY DAY
// Narrow the pool -> fate deals nine -> fate picks one -> the result screen.
//
// One state machine, no router. Screens:
//   mode -> league -> team -> slate -> wheel -> result
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

// ---------------------------------------------------------------------------
// 1. MODE PICKER
// ---------------------------------------------------------------------------
function ModePicker({ onPick }) {
  return (
    <>
      <Header />
      <Strip left="Choose your fate" right="" />
      <div className="pad">
        <Kicker>Two ways in</Kicker>

        <button className="card card--loud" onClick={onPick}>
          <span className="card-title">Team Away Day</span>
          <span className="card-sub">Follow your team. Fate picks the away game.</span>
        </button>

        <button className="card card--quiet" disabled>
          <span className="card-title">
            Open Road
            <span className="chip">Soon</span>
          </span>
          <span className="card-sub">Put in your free dates. Land somewhere you’d never have picked.</span>
        </button>
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// 2. LEAGUE PICKER
// ---------------------------------------------------------------------------
function LeaguePicker({ onPick, onBack }) {
  return (
    <>
      <Header onBack={onBack} />
      <Strip left="Team Away Day" right="Step 1 of 3" />
      <div className="pad">
        <Kicker>Pick a league</Kicker>

        {LEAGUES.map(l => (
          <button
            key={l.id}
            className={`league league--${l.id}`}
            onClick={() => onPick(l.id)}
          >
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
            <button
              key={t.id}
              className={`team-row team-row--${leagueId}`}
              onClick={() => onPick(t.id)}
            >
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
// 4. AWAY SLATE — and THE DEAL
//
// THE DEAL DEALS TOWNS, NOT FIXTURES. A slate can visit the same city twice —
// the Chiefs are in Los Angeles twice, the Jaguars are in London twice. Each
// city is one candidate on the wheel, never two slices with the same name.
// If fate deals a town that holds two dates, it takes one of them on the way out.
//
// 9 towns or fewer: no deal. The button reads SPIN, every town is a slice.
// More than 9 towns: the pile shuffles, nine rows go scarlet one at a time and
// fly out, and those nine towns become the wheel.
// ---------------------------------------------------------------------------
const oneOf = (arr) => arr[Math.floor(Math.random() * arr.length)]

function Slate({ team, games, autoDeal, onDealt, onBack }) {
  const towns = townsFromSlate(games)
  const needsDeal = towns.length > SLICES

  const [order, setOrder] = useState(games)
  const [phase, setPhase] = useState('idle')   // idle | shuffle | picking
  const [flash, setFlash] = useState(-1)
  const [picked, setPicked] = useState([])     // ids, in the order fate took them

  const timers = useRef([])
  const started = useRef(false)

  const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = [] }
  useEffect(() => () => clearAll(), [])

  const deal = () => {
    if (phase !== 'idle') return

    // Nothing to deal — every town on the slate already fits on the wheel.
    if (!needsDeal) { onDealt(towns.map(t => t[0]), false); return }

    setPhase('shuffle')

    // The shuffle: fast, mechanical, rows flashing gold.
    const shuffleTick = () => {
      setOrder(o => shuffled(o))
      setFlash(Math.floor(Math.random() * Math.min(8, games.length)))
    }
    let t = 0
    while (t < SHUFFLE_MS) {
      timers.current.push(setTimeout(shuffleTick, t))
      t += 90
    }

    // Then fate takes nine.
    timers.current.push(setTimeout(() => {
      setFlash(-1)
      setPhase('picking')
      // Nine distinct towns. One date each, chosen by fate.
      const nine = shuffled(towns).slice(0, SLICES).map(oneOf)

      nine.forEach((g, i) => {
        timers.current.push(setTimeout(() => {
          // Pull the chosen game to the top of the pile, then it goes scarlet
          // and flies out. Always at the top, so it always happens where you
          // are looking.
          setOrder(o => [g, ...o.filter(x => x.id !== g.id)])
          setPicked(p => [...p, g.id])
        }, i * PICK_MS))
      })

      timers.current.push(setTimeout(
        () => onDealt(nine, true),
        SLICES * PICK_MS + HANDOFF_MS
      ))
    }, SHUFFLE_MS))
  }

  // DEAL AGAIN comes straight back here and throws immediately.
  useEffect(() => {
    if (autoDeal && !started.current) {
      started.current = true
      timers.current.push(setTimeout(deal, 300))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDeal])

  const busy = phase !== 'idle'
  const stripRight = phase === 'picking'
    ? `${SLICES} TOWNS ON THE WHEEL`
    : `${games.length} GAMES`

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
// THE STATE MACHINE
// ---------------------------------------------------------------------------
export default function App() {
  const [screen, setScreen] = useState('mode')
  const [leagueId, setLeagueId] = useState(null)
  const [teamId, setTeamId] = useState(null)
  const [slate, setSlate] = useState([])
  const [wheelGames, setWheelGames] = useState([])
  const [dealt, setDealt] = useState(false)     // did a deal actually happen?
  const [autoDeal, setAutoDeal] = useState(false)
  const [dealNonce, setDealNonce] = useState(0)
  const [game, setGame] = useState(null)

  const team = teamId ? teamById(teamId) : null

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

  // Fresh nine from the full slate.
  const dealAgain = () => {
    setAutoDeal(true)
    setDealNonce(n => n + 1)
    setScreen('slate')
  }

  return (
    <div className="app">
      {screen === 'mode' && (
        <ModePicker onPick={() => setScreen('league')} />
      )}

      {screen === 'league' && (
        <LeaguePicker
          onPick={(id) => { setLeagueId(id); setScreen('team') }}
          onBack={() => setScreen('mode')}
        />
      )}

      {screen === 'team' && (
        <TeamPicker
          leagueId={leagueId}
          onPick={pickTeam}
          onBack={() => setScreen('league')}
        />
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

      {screen === 'wheel' && (
        <Wheel
          key={wheelGames.map(g => g.id).join('|')}
          games={wheelGames}
          teamName={team.name}
          dealt={dealt}
          onResult={(g) => { setGame(g); setScreen('result') }}
          onDealAgain={dealAgain}
          onBack={() => { setAutoDeal(false); setScreen('slate') }}
        />
      )}

      {screen === 'result' && game && (
        <Result
          game={game}
          teamName={team.name}
          onSpinAgain={() => setScreen('wheel')}
          onBack={() => setScreen('wheel')}
        />
      )}
    </div>
  )
}
