import { Header, Strip, Kicker, Loud, Quiet } from './Frame'

// ---------------------------------------------------------------------------
// AWAY DAY — THE RESULT SCREEN
// A trip-inspiration card, not a logistics sheet. Deliberately absent:
// kickoff time, travel distance, nearest airport.
//
// The map is a free OpenStreetMap embed. NOTHING may be overlaid on it —
// OSM's attribution has to stay visible.
// ---------------------------------------------------------------------------

function osmUrl(lat, lng) {
  const d = 0.06
  const bbox = [lng - d, lat - d / 2, lng + d, lat + d / 2].join(',')
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`
}

export default function Result({ game, title, onSpinAgain, onBack }) {
  const share = async () => {
    // The fixture line reads for both modes: "AT THE BEARS" in Mode 1, "IOWA
    // CUBS AT TOLEDO MUD HENS" in Mode 2. The result screen cannot tell them
    // apart, and that is the point.
    const text = `AWAY DAY — fate picked ${game.city.toUpperCase()}. ${game.fixture}, ${game.date}. ${game.venue}. Wherever it lands, that's the trip.`
    try {
      if (navigator.share) await navigator.share({ title: 'Away Day', text })
      else await navigator.clipboard.writeText(text)
    } catch (e) { /* the user backed out of the share sheet — nothing to do */ }
  }

  return (
    <>
      <Header onBack={onBack} />
      <Strip left={title} right="The trip" />

      <div className="pad">
        <Kicker>Fate picked</Kicker>
        <div className="result-city">{game.city}</div>
        <div className="result-state">{game.stateCode}</div>

        <div className="map-card">
          <iframe
            title={`Map of ${game.city}`}
            className="map"
            src={osmUrl(game.lat, game.lng)}
            loading="lazy"
          />
        </div>

        <div className="lower-third">
          <span className="lt-left">
            {game.games.length === 1 ? game.fixture : `${game.games.length} games on`}
          </span>
          <span className="lt-right">
            {game.games.length === 1
              ? game.date
              : `${game.games[0].date} \u2013 ${game.games[game.games.length - 1].date}`}
          </span>
        </div>

        {/* 🔴 S20. WHAT'S ON. The wheel deals a TOWN, and a town is rarely one
            game — in a Thursday-to-Monday window, sixty-eight towns out of
            eighty-one have three or more. They were being thrown away by a coin
            flip. Every one of them is here now, by the day, and YOU choose. */}
        <div className="section">
          <div className="section-head section-head--gold">
            What’s on
          </div>
          {[...new Set(game.games.map(g => g.iso))].map(iso => (
            <div className="on-day" key={iso}>
              <div className="on-date">{game.games.find(g => g.iso === iso).date}</div>
              {game.games.filter(g => g.iso === iso).map((g, i) => (
                <div className="on-row" key={i}>
                  <span className="on-league">{g.league}</span>
                  <span className="on-body">
                    <span className="on-fixture">{g.fixture}</span>
                    <span className="on-venue">{g.venue}</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="section">
          <div className="section-head section-head--scarlet">The town</div>
          {game.facts.map((f, i) => (
            <p className="fact" key={i}>{f}</p>
          ))}
        </div>

        <div className="section">
          <div className="section-head section-head--navy">While you’re there</div>
          {game.todo.map((t, i) => (
            <div className="todo" key={i}>
              <span className="todo-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="todo-text">{t}</span>
            </div>
          ))}
        </div>

        <div className="landing">
          <Loud onClick={share}>Share the trip</Loud>
          <Quiet onClick={onSpinAgain}>Spin again</Quiet>
        </div>
      </div>
    </>
  )
}
