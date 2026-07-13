import { Header, Strip, Kicker, Loud, Quiet } from './Frame'
import { teamById, cityForGame, fmtDate } from './data'

export default function Result({ team, game, index, total, onBack, onSpinAgain }) {
  const opp = teamById(game.homeTeamId)
  const city = cityForGame(game)

  // Free OpenStreetMap embed — no key, no account, no bill.
  const d = 0.06
  const bbox = [city.lon - d * 1.6, city.lat - d, city.lon + d * 1.6, city.lat + d].join('%2C')
  const mapSrc =
    `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${city.lat}%2C${city.lon}`

  const share = async () => {
    const text = `Fate picked ${city.city}. ${team.name} at ${opp.name}, ${fmtDate(game.date)}. — Away Day`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Away Day', text })
      } else {
        await navigator.clipboard.writeText(text)
        alert('Copied to clipboard')
      }
    } catch (e) {
      // share sheet dismissed — nothing to do
    }
  }

  return (
    <div className="app">
      <Header onBack={onBack} />
      <Strip left={`${team.name} · Your Away Day`} right={`Game ${index + 1} / ${total}`} />

      <Kicker>Fate picked</Kicker>
      <div className="result-city">
        <span className="skew">{city.city}</span>
      </div>
      <div className="result-state">{city.state}</div>

      <div className="map-cut">
        <iframe title={`Map of ${city.city}`} src={mapSrc} loading="lazy" />
        <div className="venue-chip skew">{opp.venue}</div>
      </div>

      <div className="lower-third">
        <span className="lt-label skew">at {opp.name}</span>
        <span className="lt-date">{fmtDate(game.date)}</span>
      </div>

      <div className="section-head">
        <div className="accent accent-scarlet" />
        <div className="section-title skew">The Town</div>
      </div>
      {city.facts.map((f, i) => (
        <div className="fact" key={i}>
          {f}
        </div>
      ))}

      <div className="section-head">
        <div className="accent accent-navy" />
        <div className="section-title skew">While You&rsquo;re There</div>
      </div>
      {city.todo.map((t, i) => (
        <div className="todo" key={i}>
          <span className="todo-num">{String(i + 1).padStart(2, '0')}</span>
          <span className="todo-text">{t}</span>
        </div>
      ))}

      <Loud onClick={share}>Share the trip</Loud>
      <Quiet onClick={onSpinAgain}>Spin again</Quiet>
    </div>
  )
}
