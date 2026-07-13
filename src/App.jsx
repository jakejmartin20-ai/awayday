import { useState } from 'react'
import { Header, Strip, Kicker, Loud } from './Frame'
import { LEAGUES, teamsByLeague, awayGamesFor, teamById, fmtDate } from './data'
import Wheel from './Wheel'
import Result from './Result'

export default function App() {
  const [step, setStep] = useState('mode')
  const [league, setLeague] = useState(null)
  const [team, setTeam] = useState(null)
  const [game, setGame] = useState(null)

  const games = team ? awayGamesFor(team.id) : []

  // 1 — MODE PICKER
  if (step === 'mode') {
    return (
      <div className="app">
        <Header />
        <Strip left="Choose Your Fate" />
        <Kicker>Two ways in</Kicker>

        <button className="mode-card mode-loud" onClick={() => setStep('league')}>
          <div className="mode-title skew">Team Away Day</div>
          <div className="mode-rule" />
          <div className="mode-line">Follow a team. Spin their away slate.</div>
        </button>

        <button className="mode-card mode-quiet" disabled>
          <span className="soon-chip skew">Soon</span>
          <div className="mode-title skew">Traveler&rsquo;s Dart</div>
          <div className="mode-rule" />
          <div className="mode-line">Pick your dates. Throw at the map.</div>
        </button>
      </div>
    )
  }

  // 2 — LEAGUE PICKER
  if (step === 'league') {
    return (
      <div className="app">
        <Header onBack={() => setStep('mode')} />
        <Strip left="Team Away Day" right="Step 1 of 3" />
        <Kicker>Pick a league</Kicker>

        {LEAGUES.map((l) => (
          <button
            key={l.id}
            className={`league-bar league-${l.id}`}
            onClick={() => {
              setLeague(l)
              setStep('team')
            }}
          >
            <span>
              <div className="league-name skew">{l.name}</div>
              <div className="league-season">{l.season}</div>
            </span>
            <span className="league-arrow skew">&rarr;</span>
          </button>
        ))}

        <div className="hairline" />
        <div className="note">NBA joins when its schedule drops.</div>
      </div>
    )
  }

  // 3 — TEAM PICKER
  if (step === 'team') {
    return (
      <div className="app">
        <Header onBack={() => setStep('league')} />
        <Strip left={`${league.name} · Team Away Day`} right="Step 2 of 3" />
        <Kicker>Pick your team</Kicker>

        {teamsByLeague(league.id).map((t, i) => (
          <button
            key={t.id}
            className="team-row"
            style={{ borderLeftColor: i % 2 ? '#1B3A5C' : '#C8102E' }}
            onClick={() => {
              setTeam(t)
              setStep('slate')
            }}
          >
            <span className="team-name skew">{t.name}</span>
            <span className="chev skew">&rsaquo;</span>
          </button>
        ))}
      </div>
    )
  }

  // 4 — AWAY SLATE
  if (step === 'slate') {
    return (
      <div className="app">
        <Header onBack={() => setStep('team')} />
        <Strip left={team.name} right={`${games.length} Games`} />
        <Kicker>Your away slate</Kicker>

        {games.map((g, i) => (
          <div className="slate-row" key={g.id}>
            <span className="num-chip skew">{String(i + 1).padStart(2, '0')}</span>
            <span className="slate-opp skew">at {teamById(g.homeTeamId).name}</span>
            <span className="slate-date">{fmtDate(g.date)}</span>
          </div>
        ))}

        <div className="spacer" />
        <div className="note">Every one of these is a slice on the wheel.</div>
        <Loud onClick={() => setStep('wheel')}>Spin</Loud>
      </div>
    )
  }

  // 5 — THE WHEEL
  if (step === 'wheel') {
    return (
      <Wheel
        team={team}
        games={games}
        onBack={() => setStep('slate')}
        onSeeTrip={(g) => {
          setGame(g)
          setStep('result')
        }}
      />
    )
  }

  // 6 — THE RESULT
  return (
    <Result
      team={team}
      game={game}
      index={games.findIndex((g) => g.id === game.id)}
      total={games.length}
      onBack={() => setStep('wheel')}
      onSpinAgain={() => setStep('wheel')}
    />
  )
}
