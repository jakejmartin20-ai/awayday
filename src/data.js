// AWAY DAY — DUMMY DATA (Session 5)
//
// This file proves the SHAPE, nothing else. None of it is fact-checked and none
// of the fixtures are real. The real bakes replace the games generator at the
// bottom with explicit, tap-checkable rows, one file per league, once each
// league's official schedule is out.
//
// Three lists, kept separate on purpose:
//   1. TEAMS  — name, league, which city card it points at, venue
//   2. GAMES  — home team, away team, date
//   3. CITIES — the city cards, shared across both leagues AND both modes

export const LEAGUES = [
  { id: 'nfl', name: 'NFL', season: '2026 Season' },
  { id: 'nhl', name: 'NHL', season: '2026-27 Season' }
]

// --- 1. TEAMS ---------------------------------------------------------------
export const TEAMS = [
  { id: 'nfl-sea', league: 'nfl', name: 'Seattle Seahawks',    cityId: 'seattle',      venue: 'Lumen Field' },
  { id: 'nfl-den', league: 'nfl', name: 'Denver Broncos',      cityId: 'denver',       venue: 'Empower Field at Mile High' },
  { id: 'nfl-chi', league: 'nfl', name: 'Chicago Bears',       cityId: 'chicago',      venue: 'Soldier Field' },
  { id: 'nfl-no',  league: 'nfl', name: 'New Orleans Saints',  cityId: 'neworleans',   venue: 'Caesars Superdome' },
  { id: 'nfl-kc',  league: 'nfl', name: 'Kansas City Chiefs',  cityId: 'kansascity',   venue: 'Arrowhead Stadium' },
  { id: 'nfl-phi', league: 'nfl', name: 'Philadelphia Eagles', cityId: 'philadelphia', venue: 'Lincoln Financial Field' },
  { id: 'nfl-mia', league: 'nfl', name: 'Miami Dolphins',      cityId: 'miami',        venue: 'Hard Rock Stadium' },
  { id: 'nfl-buf', league: 'nfl', name: 'Buffalo Bills',       cityId: 'buffalo',      venue: 'Highmark Stadium' },
  { id: 'nfl-gb',  league: 'nfl', name: 'Green Bay Packers',   cityId: 'greenbay',     venue: 'Lambeau Field' },

  { id: 'nhl-sea', league: 'nhl', name: 'Seattle Kraken',        cityId: 'seattle',    venue: 'Climate Pledge Arena' },
  { id: 'nhl-col', league: 'nhl', name: 'Colorado Avalanche',    cityId: 'denver',     venue: 'Ball Arena' },
  { id: 'nhl-chi', league: 'nhl', name: 'Chicago Blackhawks',    cityId: 'chicago',    venue: 'United Center' },
  { id: 'nhl-nsh', league: 'nhl', name: 'Nashville Predators',   cityId: 'nashville',  venue: 'Bridgestone Arena' },
  { id: 'nhl-bos', league: 'nhl', name: 'Boston Bruins',         cityId: 'boston',     venue: 'TD Garden' },
  { id: 'nhl-pit', league: 'nhl', name: 'Pittsburgh Penguins',   cityId: 'pittsburgh', venue: 'PPG Paints Arena' },
  { id: 'nhl-min', league: 'nhl', name: 'Minnesota Wild',        cityId: 'stpaul',     venue: 'Xcel Energy Center' },
  { id: 'nhl-det', league: 'nhl', name: 'Detroit Red Wings',     cityId: 'detroit',    venue: 'Little Caesars Arena' },
  { id: 'nhl-vgk', league: 'nhl', name: 'Vegas Golden Knights',  cityId: 'lasvegas',   venue: 'T-Mobile Arena' }
]

// --- 3. CITY CARDS ----------------------------------------------------------
export const CITIES = {
  seattle: {
    city: 'Seattle', state: 'Washington', lat: 47.6062, lon: -122.3321,
    facts: [
      'Ringed by water and mountains — Puget Sound on one side, Mount Rainier looming on the other.',
      'The modern coffeehouse habit was exported to the world from here.',
      'It rains less per year than New York. It just spreads it out.'
    ],
    todo: [
      'Pike Place Market early, before the crowds land.',
      'The ferry to Bainbridge Island — cheapest good view in America.',
      'A pint in Ballard, which is basically a brewery district with houses in it.'
    ]
  },
  denver: {
    city: 'Denver', state: 'Colorado', lat: 39.7392, lon: -104.9903,
    facts: [
      'Exactly one mile above sea level. The 13th step of the Capitol says so.',
      'The Rockies sit on the western horizon like a wall.',
      'Thin air: the beer hits harder, and so does the walk uphill.'
    ],
    todo: [
      'Red Rocks — go even if nobody is playing.',
      'RiNo for street art and taprooms.',
      'A day up into the mountains if you have one spare.'
    ]
  },
  chicago: {
    city: 'Chicago', state: 'Illinois', lat: 41.8781, lon: -87.6298,
    facts: [
      'The skyline was invented here — the first steel-framed skyscraper went up in 1885.',
      'The lakefront runs for miles, with beaches in the middle of the city.',
      'The river gets dyed green once a year, for reasons nobody can fully justify.'
    ],
    todo: [
      'An architecture boat tour down the river.',
      'Deep dish once, thin tavern-style twice.',
      'A blues bar with no sign on the door.'
    ]
  },
  neworleans: {
    city: 'New Orleans', state: 'Louisiana', lat: 29.9511, lon: -90.0715,
    facts: [
      'Jazz was born here, and the city has never fully stopped playing it.',
      'Below sea level, held back by levees and stubbornness.',
      'The French Quarter is mostly Spanish architecture, which annoys everyone who learns it.'
    ],
    todo: [
      'Frenchmen Street for live music, not Bourbon.',
      'Beignets at 2am, powdered sugar everywhere.',
      'The streetcar out along St Charles Avenue.'
    ]
  },
  kansascity: {
    city: 'Kansas City', state: 'Missouri', lat: 39.0997, lon: -94.5786,
    facts: [
      'Claims more fountains than any city outside Rome.',
      'Barbecue here means burnt ends, and it is a serious matter.',
      'It sits across two states and argues about which one counts.'
    ],
    todo: [
      'A barbecue pilgrimage. Pick one, queue anyway.',
      'The Nelson-Atkins museum, and the giant shuttlecocks on the lawn.',
      'The Crossroads district after dark.'
    ]
  },
  philadelphia: {
    city: 'Philadelphia', state: 'Pennsylvania', lat: 39.9526, lon: -75.1652,
    facts: [
      'The Declaration of Independence was signed here in 1776.',
      'The cheesesteak argument is real, and you will be asked to pick a side.',
      'The art museum steps are a tourist attraction because of a boxing film.'
    ],
    todo: [
      'Reading Terminal Market for lunch.',
      'Independence Hall and the Liberty Bell.',
      'A dive bar in Fishtown afterwards.'
    ]
  },
  miami: {
    city: 'Miami', state: 'Florida', lat: 25.7617, lon: -80.1918,
    facts: [
      'More Art Deco buildings in one district than anywhere on earth.',
      'Spanish is spoken as widely as English.',
      'It is closer to Havana than it is to Orlando.'
    ],
    todo: [
      'Cuban coffee and a walk through Little Havana.',
      'South Beach at sunrise, when it belongs to nobody.',
      'Wynwood for the murals.'
    ]
  },
  buffalo: {
    city: 'Buffalo', state: 'New York', lat: 42.8864, lon: -78.8784,
    facts: [
      'The chicken wing was invented here in 1964, in a bar, late at night.',
      'Niagara Falls is twenty minutes up the road.',
      'The winters are a personality trait.'
    ],
    todo: [
      'The Falls. Cross to the Canadian side if you have a passport.',
      'Wings at the Anchor Bar, out of sheer obligation.',
      'The Albright-Knox for a serious modern art collection.'
    ]
  },
  greenbay: {
    city: 'Green Bay', state: 'Wisconsin', lat: 44.5133, lon: -88.0133,
    facts: [
      'The smallest city in the NFL, by a long way.',
      'The team is owned by its own supporters — no billionaire, just shareholders.',
      'Cheese is not a joke here. Do not make the joke.'
    ],
    todo: [
      'Lambeau Field, even on a day with no game.',
      'A supper club: brandy old fashioned, then a fish fry.',
      'The bay itself, which most visitors never bother to look at.'
    ]
  },
  nashville: {
    city: 'Nashville', state: 'Tennessee', lat: 36.1627, lon: -86.7816,
    facts: [
      'Music City: the recording industry built half of it.',
      'There is a full-scale replica of the Parthenon in a public park.',
      'Hot chicken is a local invention and a genuine hazard.'
    ],
    todo: [
      'A honky-tonk crawl down Broadway.',
      'The Ryman Auditorium, the room where it all happened.',
      'Hot chicken — order one heat level below your ego.'
    ]
  },
  boston: {
    city: 'Boston', state: 'Massachusetts', lat: 42.3601, lon: -71.0589,
    facts: [
      'The Common, dating to 1634, is the oldest public park in the country.',
      'The city is small enough to cross on foot in an afternoon.',
      'The accent is not a put-on.'
    ],
    todo: [
      'The Freedom Trail — a red line painted on the pavement. Follow it.',
      'Oysters and a beer in the North End.',
      'Harvard Yard, across the river.'
    ]
  },
  pittsburgh: {
    city: 'Pittsburgh', state: 'Pennsylvania', lat: 40.4406, lon: -79.9959,
    facts: [
      'Built where three rivers meet, and stitched together by more than 400 bridges.',
      'It was a steel town. The rebuild into a tech-and-medicine city is the local pride.',
      'They put the chips inside the sandwich here. All of them.'
    ],
    todo: [
      'The Duquesne Incline, for the view over the point.',
      'The Andy Warhol Museum — he was a local boy.',
      'A sandwich at Primanti Bros, chips and all.'
    ]
  },
  stpaul: {
    city: 'Saint Paul', state: 'Minnesota', lat: 44.9537, lon: -93.0900,
    facts: [
      'The quieter twin. Minneapolis is across the river.',
      'The Mississippi starts small up here and runs right past downtown.',
      'It gets properly, unarguably cold.'
    ],
    todo: [
      'Skyway-hopping between buildings if the weather turns.',
      'Grand Avenue, for food and dive bars with good beer lists.',
      'Cross the river and do the Minneapolis lakes.'
    ]
  },
  detroit: {
    city: 'Detroit', state: 'Michigan', lat: 42.3314, lon: -83.0458,
    facts: [
      'The car was mass-produced here, and Motown was recorded here.',
      'Canada is to the south. Look at a map — it is genuinely true.',
      'The downtown revival is one of the great American comeback stories.'
    ],
    todo: [
      'The Motown Museum, in the actual house.',
      'Eastern Market on a Saturday.',
      'A coney dog, from whichever of the two rival shops you get told to.'
    ]
  },
  lasvegas: {
    city: 'Las Vegas', state: 'Nevada', lat: 36.1699, lon: -115.1398,
    facts: [
      'The whole thing sits in the middle of the Mojave Desert.',
      'The Strip is not actually inside the city limits.',
      'Red Rock Canyon is twenty minutes from the neon.'
    ],
    todo: [
      'Fremont Street for old Vegas, not the Strip.',
      'A drive out to Red Rock in the morning.',
      'One sensible night, one silly one.'
    ]
  }
}

// --- 2. GAMES (DUMMY) -------------------------------------------------------
// Every team plays away at every other team in its league, which gives each team
// an 8-game away slate — 8 slices on the wheel. The real bake replaces this
// generator with explicit rows.
function buildDummyGames() {
  const games = []
  LEAGUES.forEach((l) => {
    const teams = TEAMS.filter((t) => t.league === l.id)
    const startISO = l.id === 'nfl' ? '2026-09-13' : '2026-10-08'
    const stepDays = l.id === 'nfl' ? 7 : 5
    teams.forEach((away) => {
      let n = 0
      teams.forEach((home) => {
        if (home.id === away.id) return
        const d = new Date(startISO + 'T12:00:00')
        d.setDate(d.getDate() + n * stepDays + (n % 3))
        games.push({
          id: away.id + '-at-' + home.id,
          league: l.id,
          homeTeamId: home.id,
          awayTeamId: away.id,
          date: d.toISOString().slice(0, 10)
        })
        n++
      })
    })
  })
  return games
}

export const GAMES = buildDummyGames()

// --- joins & helpers --------------------------------------------------------
export const teamById = (id) => TEAMS.find((t) => t.id === id)
export const cityById = (id) => CITIES[id]

export const teamsByLeague = (leagueId) =>
  TEAMS.filter((t) => t.league === leagueId).sort((a, b) => a.name.localeCompare(b.name))

// Away games only. Already-played excluded. Soonest first.
export function awayGamesFor(teamId) {
  const today = new Date().toISOString().slice(0, 10)
  return GAMES
    .filter((g) => g.awayTeamId === teamId && g.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function cityForGame(game) {
  return cityById(teamById(game.homeTeamId).cityId)
}

export function fmtDate(iso) {
  const d = new Date(iso + 'T12:00:00')
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${days[d.getDay()]} ${d.getDate()} ${mon[d.getMonth()]}`
}
