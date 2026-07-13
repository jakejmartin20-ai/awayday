// ---------------------------------------------------------------------------
// AWAY DAY — DATA
// ---------------------------------------------------------------------------
// Three lists, exactly as specced:
//   1. CITIES — the city cards (shared by both leagues AND both modes)
//   2. TEAMS  — team -> league, home city, venue
//   3. GAMES  — home team, away team, date  (here: generated dummy fixtures)
//
// EVERYTHING BELOW IS DUMMY DATA. It exists to prove the shape end to end.
// The real bakes replace CITIES / TEAMS / the fixture list — nothing else in
// the app has to change.
//
// NFL teams get a 9-game away slate  -> 9 or fewer, so NO DEAL, straight to the wheel.
// NHL teams get a 41-game away slate -> the deal fires.
// ---------------------------------------------------------------------------

// 1. CITY CARDS -------------------------------------------------------------
// city + state · lat/lng (also plots Mode 2's deal-map pins) · ~3 facts · 2-3 things to do
export const CITIES = {
  buffalo: {
    city: 'Buffalo', state: 'New York', lat: 42.8864, lng: -78.8784,
    facts: [
      'The chicken wing was invented here in 1964, at the Anchor Bar on Main Street.',
      'It sits at the top of the Niagara River — the falls are twenty minutes north.',
      'Grain elevators on the waterfront were the first of their kind anywhere.'
    ],
    todo: ['Silo City — grain elevators you can climb', 'Niagara Falls, from the quiet side', 'A wing crawl through Elmwood Village']
  },
  pittsburgh: {
    city: 'Pittsburgh', state: 'Pennsylvania', lat: 40.4406, lng: -79.9959,
    facts: [
      'Three rivers meet at a point in the middle of town.',
      'It has more bridges than Venice — 446 of them.',
      'The city was built on steel and now runs on robotics labs.'
    ],
    todo: ['The Duquesne Incline at dusk', 'The Andy Warhol Museum', 'A sandwich with the fries inside it at Primanti Bros']
  },
  denver: {
    city: 'Denver', state: 'Colorado', lat: 39.7392, lng: -104.9903,
    facts: [
      'Exactly one mile above sea level — the 13th step of the Capitol is the marker.',
      'The thin air makes a baseball fly about 9% further.',
      'It has more breweries per head than almost anywhere in America.'
    ],
    todo: ['Red Rocks — go even without a gig on', 'Union Station for a drink', 'Larimer Square after dark']
  },
  nashville: {
    city: 'Nashville', state: 'Tennessee', lat: 36.1627, lng: -86.7816,
    facts: [
      'There is live music on Broadway every day of the year, for free.',
      'It holds a full-size replica of the Parthenon, built in 1897.',
      'More songs are written here per day than anywhere on earth.'
    ],
    todo: ['The Ryman Auditorium', 'Hot chicken at Prince’s', 'Honky-tonks on Lower Broadway']
  },
  neworleans: {
    city: 'New Orleans', state: 'Louisiana', lat: 29.9511, lng: -90.0715,
    facts: [
      'The city sits below sea level, held back by levees.',
      'Jazz was born here, in Storyville, around 1900.',
      'Streetcars have run on St Charles Avenue since 1835.'
    ],
    todo: ['A brass band in the Marigny', 'Beignets at Café du Monde', 'The Garden District on foot']
  },
  chicago: {
    city: 'Chicago', state: 'Illinois', lat: 41.8781, lng: -87.6298,
    facts: [
      'The first skyscraper in the world went up here in 1885.',
      'The river is dyed green every March, and it runs backwards by design.',
      'The nickname is about windy politicians, not weather.'
    ],
    todo: ['The Chicago Architecture river cruise', 'Green Mill jazz lounge', 'Deep dish, once, so you can say you did']
  },
  minneapolis: {
    city: 'Minneapolis', state: 'Minnesota', lat: 44.9778, lng: -93.2650,
    facts: [
      'There are more lakes inside the city limits than there are neighbourhoods.',
      'A five-mile skyway lets you cross downtown without ever going outside.',
      'Prince recorded most of Purple Rain a few miles from downtown.'
    ],
    todo: ['First Avenue', 'The Stone Arch Bridge at sunset', 'Cycling the Chain of Lakes']
  },
  seattle: {
    city: 'Seattle', state: 'Washington', lat: 47.6062, lng: -122.3321,
    facts: [
      'It rains less here per year than in New York — it just rains slowly.',
      'The first Starbucks opened at Pike Place in 1971.',
      'Mount Rainier is 60 miles away and still dominates the skyline.'
    ],
    todo: ['Pike Place Market early, before the crowds', 'A ferry to Bainbridge and back', 'Discovery Park for the Sound']
  },
  boston: {
    city: 'Boston', state: 'Massachusetts', lat: 42.3601, lng: -71.0589,
    facts: [
      'The oldest public park in America is here — the Common, 1634.',
      'The subway was the first in the United States.',
      'Half the city is landfill; the Back Bay was literally a bay.'
    ],
    todo: ['The Freedom Trail, all of it', 'Oysters in the North End', 'The Isabella Stewart Gardner Museum']
  },
  detroit: {
    city: 'Detroit', state: 'Michigan', lat: 42.3314, lng: -83.0458,
    facts: [
      'Motown was recorded in a house on West Grand Boulevard.',
      'It is the only major US city where you look SOUTH to Canada.',
      'The first mile of paved road in the world was laid here in 1909.'
    ],
    todo: ['The Motown Museum', 'Eastern Market on a Saturday', 'The Guardian Building lobby']
  },
  philadelphia: {
    city: 'Philadelphia', state: 'Pennsylvania', lat: 39.9526, lng: -75.1652,
    facts: [
      'It was the capital of the United States before Washington existed.',
      'The city has more murals than any other in America.',
      'The cheesesteak argument has been running since 1930.'
    ],
    todo: ['Reading Terminal Market', 'The Barnes Foundation', 'The steps, obviously']
  },
  phoenix: {
    city: 'Phoenix', state: 'Arizona', lat: 33.4484, lng: -112.0740,
    facts: [
      'It is the hottest big city in the United States.',
      'The Sonoran Desert around it is the only place saguaro cactus grow wild.',
      'The Grand Canyon is a three-hour drive north.'
    ],
    todo: ['Camelback Mountain at dawn', 'The Desert Botanical Garden', 'Old Town Scottsdale']
  },
  dallas: {
    city: 'Dallas', state: 'Texas', lat: 32.7767, lng: -96.7970,
    facts: [
      'The integrated circuit was invented here in 1958.',
      'It has more restaurants per head than New York City.',
      'The frozen margarita machine was built in a Dallas kitchen.'
    ],
    todo: ['Deep Ellum for live music', 'The Sixth Floor Museum', 'Barbecue in Lockhart, if you have the car']
  },
  tampa: {
    city: 'Tampa', state: 'Florida', lat: 27.9506, lng: -82.4572,
    facts: [
      'Ybor City was the cigar capital of the world.',
      'The Cuban sandwich was invented here, not in Cuba.',
      'It sits on the largest open-water estuary in Florida.'
    ],
    todo: ['Ybor City and its street chickens', 'The Riverwalk', 'A day on Clearwater Beach']
  },
  stlouis: {
    city: 'St Louis', state: 'Missouri', lat: 38.6270, lng: -90.1994,
    facts: [
      'The Gateway Arch is the tallest man-made monument in the country.',
      'The 1904 World’s Fair happened here, and so, allegedly, did the ice cream cone.',
      'Forest Park is larger than Central Park.'
    ],
    todo: ['Ride to the top of the Arch', 'The City Museum — it is not a museum', 'Forest Park on foot']
  }
}

// 2. TEAMS ------------------------------------------------------------------
export const LEAGUES = [
  { id: 'nfl', name: 'NFL', note: 'The 2026 season' },
  { id: 'nhl', name: 'NHL', note: 'The 2026-27 season' }
]

export const TEAMS = [
  // NFL — 10 teams, so each has a 9-game away slate. No deal.
  { id: 'nfl-buf', league: 'nfl', name: 'Buffalo', cityId: 'buffalo', venue: 'Highmark Stadium' },
  { id: 'nfl-pit', league: 'nfl', name: 'Pittsburgh', cityId: 'pittsburgh', venue: 'Acrisure Stadium' },
  { id: 'nfl-den', league: 'nfl', name: 'Denver', cityId: 'denver', venue: 'Empower Field' },
  { id: 'nfl-nsh', league: 'nfl', name: 'Nashville', cityId: 'nashville', venue: 'Nissan Stadium' },
  { id: 'nfl-nor', league: 'nfl', name: 'New Orleans', cityId: 'neworleans', venue: 'Caesars Superdome' },
  { id: 'nfl-chi', league: 'nfl', name: 'Chicago', cityId: 'chicago', venue: 'Soldier Field' },
  { id: 'nfl-min', league: 'nfl', name: 'Minnesota', cityId: 'minneapolis', venue: 'U.S. Bank Stadium' },
  { id: 'nfl-sea', league: 'nfl', name: 'Seattle', cityId: 'seattle', venue: 'Lumen Field' },
  { id: 'nfl-phi', league: 'nfl', name: 'Philadelphia', cityId: 'philadelphia', venue: 'Lincoln Financial Field' },
  { id: 'nfl-dal', league: 'nfl', name: 'Dallas', cityId: 'dallas', venue: 'AT&T Stadium' },

  // NHL — 12 teams, each with a 41-game away slate. The deal fires.
  { id: 'nhl-buf', league: 'nhl', name: 'Buffalo', cityId: 'buffalo', venue: 'KeyBank Center' },
  { id: 'nhl-pit', league: 'nhl', name: 'Pittsburgh', cityId: 'pittsburgh', venue: 'PPG Paints Arena' },
  { id: 'nhl-col', league: 'nhl', name: 'Colorado', cityId: 'denver', venue: 'Ball Arena' },
  { id: 'nhl-nsh', league: 'nhl', name: 'Nashville', cityId: 'nashville', venue: 'Bridgestone Arena' },
  { id: 'nhl-chi', league: 'nhl', name: 'Chicago', cityId: 'chicago', venue: 'United Center' },
  { id: 'nhl-min', league: 'nhl', name: 'Minnesota', cityId: 'minneapolis', venue: 'Xcel Energy Center' },
  { id: 'nhl-sea', league: 'nhl', name: 'Seattle', cityId: 'seattle', venue: 'Climate Pledge Arena' },
  { id: 'nhl-bos', league: 'nhl', name: 'Boston', cityId: 'boston', venue: 'TD Garden' },
  { id: 'nhl-det', league: 'nhl', name: 'Detroit', cityId: 'detroit', venue: 'Little Caesars Arena' },
  { id: 'nhl-phi', league: 'nhl', name: 'Philadelphia', cityId: 'philadelphia', venue: 'Wells Fargo Center' },
  { id: 'nhl-tbl', league: 'nhl', name: 'Tampa Bay', cityId: 'tampa', venue: 'Amalie Arena' },
  { id: 'nhl-stl', league: 'nhl', name: 'St Louis', cityId: 'stlouis', venue: 'Enterprise Center' },
  { id: 'nhl-ari', league: 'nhl', name: 'Arizona', cityId: 'phoenix', venue: 'Mullett Arena' },
  { id: 'nhl-dal', league: 'nhl', name: 'Dallas', cityId: 'dallas', venue: 'American Airlines Center' },
  { id: 'nhl-nor', league: 'nhl', name: 'New Orleans', cityId: 'neworleans', venue: 'Smoothie King Center' }
]

export const teamsInLeague = (leagueId) => TEAMS.filter(t => t.league === leagueId)
export const teamById = (id) => TEAMS.find(t => t.id === id)

// 3. GAMES ------------------------------------------------------------------
// DUMMY fixture generator. The real bake ships a plain list of
// { home, away, date } rows and this function just reads it instead.

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

function fmt(d) {
  return `${DAYS[d.getDay()]} ${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()]}`
}

// How many away games a league plays. This is the whole reason the deal exists.
const AWAY_GAMES = { nfl: 9, nhl: 41 }

// Every away game a team has left to play. Home team supplies city + venue.
export function awaySlate(teamId) {
  const team = teamById(teamId)
  if (!team) return []

  const opponents = teamsInLeague(team.league).filter(t => t.id !== team.id)
  const count = AWAY_GAMES[team.league] || opponents.length

  const start = new Date(2026, 8, 12) // 12 Sept 2026
  const step = team.league === 'nfl' ? 7 : 3 // NFL weekly, NHL every few days

  const games = []
  for (let i = 0; i < count; i++) {
    const home = opponents[i % opponents.length]
    const card = CITIES[home.cityId]
    const date = new Date(start)
    date.setDate(start.getDate() + i * step)
    games.push({
      id: `${teamId}-away-${i}`,
      opponent: home.name,
      venue: home.venue,
      cityId: home.cityId,
      city: card.city,
      state: card.state,
      lat: card.lat,
      lng: card.lng,
      facts: card.facts,
      todo: card.todo,
      date: fmt(date)
    })
  }
  return games
}

// TOWNS --------------------------------------------------------------------
// THE WHEEL'S UNIT IS THE TOWN, NOT THE FIXTURE.
// A 41-game away slate visits a city more than once — an NHL team plays at the
// same rink twice. Two identical slices would break the wheel: you couldn't
// tell which one won, and a near-miss on a town you were also going to hit
// anyway isn't a near-miss at all.
//
// So the slate is grouped into towns. Each town is ONE candidate, however many
// games it holds. Every town on the slate has exactly the same shot as every
// other — and if fate lands on a town with two dates, it takes one of them.
export function townsFromSlate(games) {
  const byCity = new Map()
  games.forEach(g => {
    if (!byCity.has(g.cityId)) byCity.set(g.cityId, [])
    byCity.get(g.cityId).push(g)
  })
  return [...byCity.values()] // an array of towns; each town is its list of games
}

// The wheel's fixed slice count. The deal exists to feed it exactly this many.
export const SLICES = 9
