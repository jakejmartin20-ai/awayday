// ---------------------------------------------------------------------------
// AWAY DAY — DATA
// ---------------------------------------------------------------------------
// Three lists, exactly as specced:
//   1. CITIES — the city cards (shared by both leagues AND both modes)
//   2. TEAMS  — team -> league, home city, venue
//   3. GAMES  — home team, away team, date, and THE TOWN THE GAME IS PLAYED IN
//
// NFL 2026 IS REAL. Baked from the published 272-game regular season.
// NHL TEAMS and GAMES are NOT here yet — the schedule releases 16 July 2026.
// Never bake a guess. But the 15 NHL city cards and the arena captions ARE here,
// written ahead of the bake (S11, S12). They are inert until games reach them.
//
// ---------------------------------------------------------------------------
// THE SLATE RULE — every game NOT PLAYED IN YOUR OWN TOWN.
// ---------------------------------------------------------------------------
// Not "away games". Two reasons the old rule was wrong, both found in the real
// 2026 data:
//
//   1. The Chargers and the Rams share SoFi Stadium. Under "away games", the
//      Chargers' visit to the Rams is a slice on the wheel reading LOS ANGELES
//      — fate sending a Chargers fan to their own ground. A slice you cannot
//      win, same fault as three CHICAGOs, different coat.
//
//   2. Nine games in 2026 are abroad, and in some of them a team is the
//      designated HOME side while playing four thousand miles from home. The
//      Saints "host" Pittsburgh in PARIS. The Jaguars "host" twice in LONDON.
//      Under "away games" those are invisible — the best away day on the board,
//      hidden by a technicality on a team sheet.
//
// So: a game is on your slate if the town it is played in is not your town.
// The venue decides the town. Never the home team, and never the league's
// home/away flag — that flag says "Home" for Eagles at Jaguars, played at
// Tottenham Hotspur Stadium in London.
// ---------------------------------------------------------------------------

// 1. CITY CARDS -------------------------------------------------------------
// city + state · lat/lng (also plots Mode 2's deal-map pins) · ~3 facts · 2-3 things to do
// The town is the place you would book a hotel in. The venue is named
// separately on the result screen — so Gillette Stadium sits under BOSTON,
// MetLife under NEW YORK, AT&T under DALLAS.
export const CITIES = {
  phoenix: {
    city: 'Phoenix', state: 'Arizona', lat: 33.4484, lng: -112.0740,
    facts: [
      'It is the hottest big city in the United States.',
      'The saguaro cactus grows wild in the Sonoran Desert and nowhere else on earth.',
      'The Grand Canyon is a three-and-a-half-hour drive north.'
    ],
    todo: ['Camelback Mountain at dawn', 'The Desert Botanical Garden', 'Old Town Scottsdale after dark']
  },
  atlanta: {
    city: 'Atlanta', state: 'Georgia', lat: 33.7490, lng: -84.3880,
    facts: [
      'Coca-Cola was mixed in a pharmacy here in 1886.',
      'Its airport is the busiest in the world.',
      'Martin Luther King Jr was born, preached and is buried on Auburn Avenue.'
    ],
    todo: ['The King Center on Auburn Avenue', 'The BeltLine on foot or a bike', 'Ponce City Market']
  },
  baltimore: {
    city: 'Baltimore', state: 'Maryland', lat: 39.2904, lng: -76.6122,
    facts: [
      'The Star-Spangled Banner was written about the shelling of Fort McHenry here.',
      'Edgar Allan Poe lived, died and is buried in the city.',
      'The row houses have marble front steps — scrubbing them was a point of pride.'
    ],
    todo: ['Crab and a mallet at Lexington Market', 'Fort McHenry', 'Fell\u2019s Point on the water']
  },
  buffalo: {
    city: 'Buffalo', state: 'New York', lat: 42.8864, lng: -78.8784,
    facts: [
      'The chicken wing was invented here at the Anchor Bar in 1964.',
      'Niagara Falls is twenty minutes north.',
      'The grain elevators on the waterfront were the first of their kind anywhere.'
    ],
    todo: ['Silo City and the grain elevators', 'Niagara Falls from the quiet side', 'A wing crawl through Elmwood Village']
  },
  charlotte: {
    city: 'Charlotte', state: 'North Carolina', lat: 35.2271, lng: -80.8431,
    facts: [
      'America\u2019s first gold rush started nearby, fifty years before California\u2019s.',
      'It is the second-largest banking centre in the United States.',
      'The Blue Ridge Mountains are ninety minutes west.'
    ],
    todo: ['The U.S. National Whitewater Center', 'NoDa for the breweries', 'The Blue Ridge Parkway, if you have a car']
  },
  chicago: {
    city: 'Chicago', state: 'Illinois', lat: 41.8781, lng: -87.6298,
    facts: [
      'The world\u2019s first skyscraper went up here in 1885.',
      'The river was reversed by engineering in 1900, and is dyed green every March.',
      'The nickname is about windy politicians, not the weather.'
    ],
    todo: ['The architecture boat tour', 'The Green Mill jazz lounge', 'Deep dish, once, so you can say you did']
  },
  cincinnati: {
    city: 'Cincinnati', state: 'Ohio', lat: 39.1031, lng: -84.5120,
    facts: [
      'It fielded the first fully professional baseball team, in 1869.',
      'The chilli here is served on spaghetti, and it has cinnamon in it.',
      'The Roebling Bridge over the Ohio was the prototype for Brooklyn\u2019s.'
    ],
    todo: ['Findlay Market', 'Over-the-Rhine on foot', 'Walk the Roebling Bridge at night']
  },
  cleveland: {
    city: 'Cleveland', state: 'Ohio', lat: 41.4993, lng: -81.6944,
    facts: [
      'The Rock and Roll Hall of Fame is here because the phrase was coined by a local DJ.',
      'The river caught fire so often it helped start the environmental movement.',
      'It sits on a Great Lake big enough to have a horizon.'
    ],
    todo: ['The Rock and Roll Hall of Fame', 'The West Side Market', 'The Cleveland Museum of Art — free, always']
  },
  dallas: {
    city: 'Dallas', state: 'Texas', lat: 32.7767, lng: -96.7970,
    facts: [
      'The integrated circuit was invented here in 1958.',
      'The frozen margarita machine was built in a Dallas kitchen.',
      'It has more restaurants per head than New York City.'
    ],
    todo: ['Deep Ellum for live music', 'The Sixth Floor Museum', 'Barbecue out in Lockhart, if you have the car']
  },
  denver: {
    city: 'Denver', state: 'Colorado', lat: 39.7392, lng: -104.9903,
    facts: [
      'Exactly one mile above sea level — the marker is the 13th step of the Capitol.',
      'The thin air makes a baseball carry about nine per cent further.',
      'The Rockies rise straight out of the plains an hour west.'
    ],
    todo: ['Red Rocks, even with no gig on', 'A drink in Union Station', 'Larimer Square after dark']
  },
  detroit: {
    city: 'Detroit', state: 'Michigan', lat: 42.3314, lng: -83.0458,
    facts: [
      'Motown was recorded in a house on West Grand Boulevard.',
      'It is the only major US city where you look SOUTH to reach Canada.',
      'The first mile of paved road anywhere was laid here in 1909.'
    ],
    todo: ['The Motown Museum', 'Eastern Market on a Saturday', 'The Guardian Building lobby']
  },
  greenbay: {
    city: 'Green Bay', state: 'Wisconsin', lat: 44.5133, lng: -88.0158,
    facts: [
      'The smallest city in the NFL, by a distance.',
      'The football club is owned by its supporters — the only one in American sport.',
      'It sits on a bay of Lake Michigan and freezes solid in winter.'
    ],
    todo: ['Walk round Lambeau, game or no game', 'A Friday fish fry, which is the law here', 'The Bay Beach Wildlife Sanctuary']
  },
  houston: {
    city: 'Houston', state: 'Texas', lat: 29.7604, lng: -95.3698,
    facts: [
      '\u201cHouston\u201d was the first word spoken from the surface of the moon.',
      'It is the most ethnically diverse big city in America.',
      'There is no zoning code, so anything can be built next to anything.'
    ],
    todo: ['Space Center Houston', 'The Rothko Chapel', 'Viet-Cajun crawfish, if it is the season']
  },
  indianapolis: {
    city: 'Indianapolis', state: 'Indiana', lat: 39.7684, lng: -86.1581,
    facts: [
      'The Motor Speedway holds 250,000 people — the largest sports venue on earth.',
      'The old racetrack was surfaced with 3.2 million bricks, and one yard of them remains.',
      'It has more war memorials than any US city except Washington.'
    ],
    todo: ['Kiss the bricks at the Speedway', 'The Cultural Trail on a bike', 'Mass Ave for dinner']
  },
  jacksonville: {
    city: 'Jacksonville', state: 'Florida', lat: 30.3322, lng: -81.6557,
    facts: [
      'By land area it is the largest city in the lower 48 states.',
      'It has more shoreline than any other city in Florida.',
      'The St Johns is one of the few rivers in America that flows north.'
    ],
    todo: ['The beaches at Neptune and Atlantic', 'Kayak the St Johns', 'The Cummer Museum gardens']
  },
  kansascity: {
    city: 'Kansas City', state: 'Missouri', lat: 39.0997, lng: -94.5786,
    facts: [
      'It has more boulevards than Paris and more fountains than any city but Rome.',
      'Charlie Parker grew up here, and bebop grew up with him.',
      'The barbecue is burnt ends, and the argument about them is endless.'
    ],
    todo: ['The American Jazz Museum in 18th & Vine', 'Burnt ends at a joint with a queue', 'The Nelson-Atkins Museum lawn']
  },
  lasvegas: {
    city: 'Las Vegas', state: 'Nevada', lat: 36.1699, lng: -115.1398,
    facts: [
      'The Strip is not actually in Las Vegas — it sits just outside the city limits.',
      'Red Rock Canyon is twenty minutes from the casinos.',
      'The city was founded in 1905, which makes it younger than most of its hotels look.'
    ],
    todo: ['Red Rock Canyon in the morning', 'Fremont Street, for the old Vegas', 'The Neon Museum boneyard']
  },
  losangeles: {
    city: 'Los Angeles', state: 'California', lat: 34.0522, lng: -118.2437,
    facts: [
      'It is built on top of an active oil field — the derricks are still pumping.',
      'There are more museums here than in any other US city.',
      'The Hollywood sign originally read HOLLYWOODLAND, and it was an advert for houses.'
    ],
    todo: ['Griffith Observatory at sunset', 'Grand Central Market', 'The Pacific Coast Highway, north']
  },
  miami: {
    city: 'Miami', state: 'Florida', lat: 25.7617, lng: -80.1918,
    facts: [
      'It is the only major US city founded by a woman — Julia Tuttle.',
      'More than half the population was born outside the United States.',
      'The Art Deco district on South Beach is the largest anywhere.'
    ],
    todo: ['The Art Deco district on foot', 'Little Havana and Calle Ocho', 'The Everglades, an hour west']
  },
  minneapolis: {
    city: 'Minneapolis', state: 'Minnesota', lat: 44.9778, lng: -93.2650,
    facts: [
      'There are more lakes inside the city limits than neighbourhoods.',
      'A skyway system lets you cross the whole downtown without going outside.',
      'Prince recorded most of Purple Rain a few miles from downtown.'
    ],
    todo: ['First Avenue', 'The Stone Arch Bridge at sunset', 'Cycling the Chain of Lakes']
  },
  boston: {
    city: 'Boston', state: 'Massachusetts', lat: 42.3601, lng: -71.0589,
    facts: [
      'The Common, laid out in 1634, is the oldest public park in America.',
      'The subway was the first in the United States.',
      'Half the city is landfill — the Back Bay was literally a bay.'
    ],
    todo: ['The Freedom Trail, all of it', 'Oysters in the North End', 'The Isabella Stewart Gardner Museum']
  },
  neworleans: {
    city: 'New Orleans', state: 'Louisiana', lat: 29.9511, lng: -90.0715,
    facts: [
      'Much of the city sits below sea level, held back by levees.',
      'Jazz was born here, around 1900.',
      'Streetcars have run on St Charles Avenue since 1835.'
    ],
    todo: ['A brass band in the Marigny', 'Beignets at Caf\u00e9 du Monde', 'The Garden District on foot']
  },
  newyork: {
    city: 'New York', state: 'New York', lat: 40.7128, lng: -74.0060,
    facts: [
      'More than 800 languages are spoken here — the most linguistically diverse city on earth.',
      'The subway runs 24 hours a day, and always has.',
      'Central Park is entirely man-made, down to the last rock.'
    ],
    todo: ['Walk the Brooklyn Bridge at dawn', 'A slice, standing up, folded', 'The Village for jazz after midnight']
  },
  philadelphia: {
    city: 'Philadelphia', state: 'Pennsylvania', lat: 39.9526, lng: -75.1652,
    facts: [
      'It was the capital of the United States before Washington existed.',
      'It has more public murals than any other city in America.',
      'The cheesesteak argument has been running since 1930 and will not be settled.'
    ],
    todo: ['Reading Terminal Market', 'The Barnes Foundation', 'The steps, obviously']
  },
  pittsburgh: {
    city: 'Pittsburgh', state: 'Pennsylvania', lat: 40.4406, lng: -79.9959,
    facts: [
      'Three rivers meet at a point in the middle of town.',
      'It has 446 bridges — more than Venice.',
      'The city was built on steel and now runs on robotics labs.'
    ],
    todo: ['The Duquesne Incline at dusk', 'The Andy Warhol Museum', 'A sandwich with the chips inside it at Primanti Bros']
  },
  seattle: {
    city: 'Seattle', state: 'Washington', lat: 47.6062, lng: -122.3321,
    facts: [
      'It gets less rain per year than New York. It just rains slowly.',
      'The first Starbucks opened at Pike Place in 1971.',
      'Mount Rainier is sixty miles away and still dominates the skyline.'
    ],
    todo: ['Pike Place early, before the crowds', 'The ferry to Bainbridge and back', 'Discovery Park for the Sound']
  },
  sanfrancisco: {
    city: 'San Francisco', state: 'California', lat: 37.7749, lng: -122.4194,
    facts: [
      'The fog has a name. It is Karl.',
      'The cable cars are the last manually operated system in the world.',
      'The city sits on 43 hills, and the steepest streets hit a 31 per cent grade.'
    ],
    todo: ['The Ferry Building on a market day', 'Ride a cable car standing on the running board', 'Golden Gate Park end to end']
  },
  tampa: {
    city: 'Tampa', state: 'Florida', lat: 27.9506, lng: -82.4572,
    facts: [
      'Ybor City was once the cigar capital of the world.',
      'The Cuban sandwich was invented here, not in Cuba.',
      'Wild chickens roam Ybor and are protected by city ordinance.'
    ],
    todo: ['Ybor City and its street chickens', 'The Riverwalk', 'A day out on Clearwater Beach']
  },
  nashville: {
    city: 'Nashville', state: 'Tennessee', lat: 36.1627, lng: -86.7816,
    facts: [
      'There is free live music on Broadway every single day of the year.',
      'It holds a full-size replica of the Parthenon, built in 1897.',
      'More songs are written here per day than anywhere on earth.'
    ],
    todo: ['The Ryman Auditorium', 'Hot chicken, at your own risk', 'The honky-tonks on Lower Broadway']
  },
  washington: {
    city: 'Washington', state: 'District of Columbia', lat: 38.9072, lng: -77.0369,
    facts: [
      'Every Smithsonian museum is free, forever, by act of Congress.',
      'No building may rise above the width of the street it faces, so there are no towers.',
      'The city was carved out of Maryland and Virginia and belongs to neither.'
    ],
    todo: ['The Smithsonian, any of it, free', 'The memorials after dark', 'U Street for the music']
  },

  // --- The nine international games. Same card shape, same everything. ---
  london: {
    city: 'London', state: 'United Kingdom', lat: 51.5074, lng: -0.1278,
    facts: [
      'The Underground is the oldest metro in the world, opened in 1863.',
      'There are more than 3,000 pubs inside the city.',
      'It has been continuously inhabited since the Romans founded it in AD 47.'
    ],
    todo: ['A proper pub, on a proper afternoon', 'Borough Market', 'The South Bank, walked end to end']
  },
  paris: {
    city: 'Paris', state: 'France', lat: 48.8566, lng: 2.3522,
    facts: [
      'The Eiffel Tower was built as a temporary exhibit and was supposed to be torn down.',
      'There are more than 400 parks and gardens inside the city.',
      'The catacombs beneath it hold the bones of six million people.'
    ],
    todo: ['A morning in the Marais', 'P\u00e8re Lachaise cemetery', 'A long lunch, and no plan after it']
  },
  madrid: {
    city: 'Madrid', state: 'Spain', lat: 40.4168, lng: -3.7038,
    facts: [
      'It is the highest capital city in Europe.',
      'Dinner does not start until ten at night, and nobody is in a hurry.',
      'The Prado holds one of the greatest painting collections on earth.'
    ],
    todo: ['The Prado', 'A crawl through the tapas bars of La Latina', 'El Retiro park on a Sunday']
  },
  munich: {
    city: 'Munich', state: 'Germany', lat: 48.1351, lng: 11.5820,
    facts: [
      'The beer gardens are legally allowed to let you bring your own food.',
      'There is a standing wave in the English Garden that people surf, all year.',
      'The Alps are an hour south by train.'
    ],
    todo: ['A beer garden in the English Garden', 'Watch the surfers on the Eisbach', 'A day trip into the Alps']
  },
  rio: {
    city: 'Rio de Janeiro', state: 'Brazil', lat: -22.9068, lng: -43.1729,
    facts: [
      'It sits inside the largest urban forest in the world.',
      'The name means \u201cJanuary River\u201d — the explorers thought the bay was a river mouth.',
      'The Maracan\u00e3 once held nearly 200,000 people for a World Cup final.'
    ],
    todo: ['Sugarloaf by cable car at sunset', 'Ipanema, early', 'The Selar\u00f3n Steps']
  },
  melbourne: {
    city: 'Melbourne', state: 'Australia', lat: -37.8136, lng: 144.9631,
    facts: [
      'The laneways are full of bars you cannot find without being told.',
      'The Melbourne Cricket Ground holds 100,000 and is the largest stadium in the southern hemisphere.',
      'The coffee culture here is taken more seriously than in Italy, and they will tell you so.'
    ],
    todo: ['The laneway bars, with a local', 'The Queen Victoria Market', 'The Great Ocean Road, if you have the days']
  },
  mexicocity: {
    city: 'Mexico City', state: 'Mexico', lat: 19.4326, lng: -99.1332,
    facts: [
      'It is built on a drained lake bed, and is sinking about 20 inches a year.',
      'It has more museums than almost any city on earth.',
      'The Aztec capital of Tenochtitlan is still down there, under the cathedral.'
    ],
    todo: ['Teotihuac\u00e1n and the pyramids', 'Tacos al pastor, on the street, late', 'Frida Kahlo\u2019s house in Coyoac\u00e1n']
  },

  // --- NHL CITY CARDS (S11) --------------------------------------------------
  // Written ahead of the NHL bake. Thirteen towns the NFL never visits.
  // Buffalo is NOT here: the Bills already gave us that card in S8.
  // Columbus IS here: the Blue Jackets play in a town the NFL does not go to,
  // and it was missing from every list until we checked the data.
  //
  // Not new cards, by the "town is where you'd book a hotel" rule:
  //   Sunrise FL (Panthers)  -> miami, 30 miles     [same case as Foxborough]
  //   St Paul MN (Wild)      -> minneapolis
  //   Newark NJ (Devils)     -> newyork
  //   Elmont NY (Islanders)  -> newyork
  //   Kanata ON (Senators)   -> ottawa, below
  // ---------------------------------------------------------------------------

  toronto: {
    city: 'Toronto', state: 'Ontario, Canada', lat: 43.6532, lng: -79.3832,
    facts: [
      'The CN Tower was the tallest free-standing structure on earth for over thirty years.',
      'More than half the people who live here were born outside Canada.',
      'Insulin was discovered at the university here in 1921.'
    ],
    todo: ['Kensington Market on a Sunday', 'St Lawrence Market', 'The islands by ferry, for the skyline back']
  },
  montreal: {
    city: 'Montreal', state: 'Quebec, Canada', lat: 45.5019, lng: -73.5674,
    facts: [
      'It is the largest French-speaking city in the Americas.',
      'A network of tunnels runs for miles under downtown, so you can cross the city in winter without going outside.',
      'The bagels are boiled in honey water and baked over a wood fire, and people will argue about the bakery for hours.'
    ],
    todo: ['Mount Royal at golden hour', 'Smoked meat at a counter in the Plateau', 'Old Montreal on foot']
  },
  ottawa: {
    city: 'Ottawa', state: 'Ontario, Canada', lat: 45.4215, lng: -75.6972,
    facts: [
      'The Rideau Canal freezes over every winter into the largest skating rink in the world.',
      'It became the capital because Queen Victoria chose it as a compromise between Toronto and Quebec City.',
      'The Parliament buildings burned down in 1916 and were rebuilt in the same Gothic style.'
    ],
    todo: ['Skate the Rideau Canal, if the ice is in', 'The National Gallery, and the giant spider outside it', 'ByWard Market']
  },
  winnipeg: {
    city: 'Winnipeg', state: 'Manitoba, Canada', lat: 49.8951, lng: -97.1384,
    facts: [
      'It sits closer to the geographic centre of North America than any other big city.',
      'Winnie the Pooh is named after a bear from here, taken to London Zoo by a Canadian soldier.',
      'Its winters are among the coldest of any major city on earth, and the place carries on regardless.'
    ],
    todo: ['The Forks, where the two rivers meet', 'The Canadian Museum for Human Rights', 'The old warehouses of the Exchange District']
  },
  calgary: {
    city: 'Calgary', state: 'Alberta, Canada', lat: 51.0447, lng: -114.0719,
    facts: [
      'The Rocky Mountains begin about an hour west, and Banff is barely further.',
      'The Stampede every July turns the entire city into a rodeo for ten days.',
      'A warm wind called the chinook can lift the temperature twenty degrees in an afternoon.'
    ],
    todo: ['Banff and Lake Louise, if you can spare the day', 'The Calgary Tower', 'Stephen Avenue after the game']
  },
  edmonton: {
    city: 'Edmonton', state: 'Alberta, Canada', lat: 53.5461, lng: -113.4938,
    facts: [
      'Its river valley is the largest stretch of urban parkland in North America.',
      'West Edmonton Mall was the biggest shopping centre in the world for two decades, and has a rollercoaster and a wave pool inside it.',
      'It is the northernmost big city on the continent.'
    ],
    todo: ['The river valley trails', 'Whyte Avenue in Old Strathcona', 'West Edmonton Mall, once, out of sheer disbelief']
  },
  vancouver: {
    city: 'Vancouver', state: 'British Columbia, Canada', lat: 49.2827, lng: -123.1207,
    facts: [
      'You can ski in the mountains and stand on a beach the same afternoon.',
      'Stanley Park is bigger than Central Park, and most of it is rainforest.',
      'It rains a great deal, and everybody goes outside anyway.'
    ],
    todo: ['The seawall around Stanley Park', 'Granville Island market', 'Grouse Mountain, for the view back over the city']
  },
  columbus: {
    city: 'Columbus', state: 'Ohio', lat: 39.9612, lng: -82.9988,
    facts: [
      'It is the biggest city in Ohio, which surprises almost everybody.',
      'Ohio State has one of the largest campuses in the country, and the whole place fills up on autumn Saturdays.',
      'German Village, just south of downtown, is thirty-odd streets of brick houses built by 19th-century settlers.'
    ],
    todo: ['German Village and the Book Loft', 'The Short North for food and galleries', 'The Scioto Mile along the river']
  },
  raleigh: {
    city: 'Raleigh', state: 'North Carolina', lat: 35.7796, lng: -78.6382,
    facts: [
      'It is one corner of the Research Triangle, with Durham and Chapel Hill.',
      'They call it the City of Oaks, and the streets are shaded by them.',
      'The state museums downtown are free to walk into.'
    ],
    todo: ['The North Carolina Museum of Art and its outdoor park', 'Eastern Carolina barbecue, vinegar not tomato', 'The bars on Glenwood South']
  },
  stlouis: {
    city: 'St. Louis', state: 'Missouri', lat: 38.6270, lng: -90.1994,
    facts: [
      'The Gateway Arch is 630 feet tall, and you ride to the top in a tiny pod.',
      'It held the World\u2019s Fair and the Olympics in the same year, 1904.',
      'Toasted ravioli was invented here, reportedly by accident.'
    ],
    todo: ['The top of the Gateway Arch', 'The City Museum, a converted shoe factory unlike anywhere else', 'Frozen custard at Ted Drewes']
  },
  saltlakecity: {
    city: 'Salt Lake City', state: 'Utah', lat: 40.7608, lng: -111.8910,
    facts: [
      'The Great Salt Lake is saltier than the ocean, and you float in it.',
      'The street grid is counted outward from Temple Square, so an address tells you exactly where you are standing.',
      'Five national parks sit within a day\u2019s drive.'
    ],
    todo: ['Temple Square', 'A drive up one of the Wasatch canyons', 'Skiing, if the season is with you']
  },
  sanjose: {
    city: 'San Jose', state: 'California', lat: 37.3382, lng: -121.8863,
    facts: [
      'It is the capital of Silicon Valley, and larger than San Francisco.',
      'The Winchester Mystery House was built without stopping for 38 years, and has staircases that go nowhere.',
      'It gets around 300 days of sunshine a year.'
    ],
    todo: ['The Winchester Mystery House', 'The Tech Interactive downtown', 'Dinner on Santana Row']
  },
  anaheim: {
    city: 'Anaheim', state: 'California', lat: 33.8366, lng: -117.9143,
    facts: [
      'Disneyland opened here in 1955, and the city grew up around it.',
      'It was founded by German winemakers, and the name means home by the Santa Ana river.',
      'Huntington Beach and Newport are twenty minutes down the road.'
    ],
    todo: ['Disneyland, if anyone will admit to wanting to', 'The Packing District for food', 'Huntington Beach at sunset']
  },

  // --- THE NHL GOES ABROAD IN 2026-27 (S12) --------------------------------
  // Two Global Series, four clubs, two towns none of them live in. Under the
  // slate rule these land on FOUR wheels: Carolina and Seattle both get
  // HELSINKI; Chicago and Ottawa both get DUSSELDORF. Written before the bake
  // so that fate cannot land on a blank screen.
  helsinki: {
    city: 'Helsinki', state: 'Finland', lat: 60.1699, lng: 24.9384,
    facts: [
      'Suomenlinna, the sea fortress spread across six islands in the harbour, has stood since the 1700s and is a UNESCO World Heritage Site.',
      'The Rock Church was blasted straight out of the granite in 1969. It has no bells - the ringing is played through loudspeakers.',
      'Finnish sauna culture is on the UNESCO heritage list, and the public saunas here sit right on the water, so you go from the steam straight into the Baltic.'
    ],
    todo: ['The ferry to Suomenlinna, fifteen minutes from the market square', 'A seafront sauna, then the sea', 'Temppeliaukio, the church cut into rock']
  },
  dusseldorf: {
    city: 'Düsseldorf', state: 'Germany', lat: 51.2277, lng: 6.7735,
    facts: [
      'The old town crams more than 250 bars into half a square kilometre, which is why they call it the longest bar in the world.',
      'Altbier is the local drink - dark, copper, top-fermented, brewed here since the 1800s and almost nowhere else.',
      'It has the largest Japanese community in Germany, centred on Immermannstrasse, where the ramen counters are the real thing.'
    ],
    todo: ['The Altstadt on foot, one Alt at a time', 'Immermannstrasse for ramen', 'The Rhine promenade at sunset']
  }
}

// 2. TEAMS ------------------------------------------------------------------
export const LEAGUES = [
  { id: 'nfl', name: 'NFL', note: 'The 2026 season' }
]

export const TEAMS = [
  { id: 'ARI', league: 'nfl', name: 'Arizona Cardinals', cityId: 'phoenix', venue: 'State Farm Stadium' },
  { id: 'ATL', league: 'nfl', name: 'Atlanta Falcons', cityId: 'atlanta', venue: 'Mercedes-Benz Stadium' },
  { id: 'BAL', league: 'nfl', name: 'Baltimore Ravens', cityId: 'baltimore', venue: 'M&T Bank Stadium' },
  { id: 'BUF', league: 'nfl', name: 'Buffalo Bills', cityId: 'buffalo', venue: 'Highmark Stadium' },
  { id: 'CAR', league: 'nfl', name: 'Carolina Panthers', cityId: 'charlotte', venue: 'Bank of America Stadium' },
  { id: 'CHI', league: 'nfl', name: 'Chicago Bears', cityId: 'chicago', venue: 'Soldier Field' },
  { id: 'CIN', league: 'nfl', name: 'Cincinnati Bengals', cityId: 'cincinnati', venue: 'Paycor Stadium' },
  { id: 'CLE', league: 'nfl', name: 'Cleveland Browns', cityId: 'cleveland', venue: 'Huntington Bank Field' },
  { id: 'DAL', league: 'nfl', name: 'Dallas Cowboys', cityId: 'dallas', venue: 'AT&T Stadium' },
  { id: 'DEN', league: 'nfl', name: 'Denver Broncos', cityId: 'denver', venue: 'Empower Field at Mile High' },
  { id: 'DET', league: 'nfl', name: 'Detroit Lions', cityId: 'detroit', venue: 'Ford Field' },
  { id: 'GB', league: 'nfl', name: 'Green Bay Packers', cityId: 'greenbay', venue: 'Lambeau Field' },
  { id: 'HOU', league: 'nfl', name: 'Houston Texans', cityId: 'houston', venue: 'Reliant Stadium' },
  { id: 'IND', league: 'nfl', name: 'Indianapolis Colts', cityId: 'indianapolis', venue: 'Lucas Oil Stadium' },
  { id: 'JAX', league: 'nfl', name: 'Jacksonville Jaguars', cityId: 'jacksonville', venue: 'EverBank Stadium' },
  { id: 'KC', league: 'nfl', name: 'Kansas City Chiefs', cityId: 'kansascity', venue: 'Arrowhead Stadium' },
  { id: 'LAC', league: 'nfl', name: 'Los Angeles Chargers', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { id: 'LA', league: 'nfl', name: 'Los Angeles Rams', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { id: 'LV', league: 'nfl', name: 'Las Vegas Raiders', cityId: 'lasvegas', venue: 'Allegiant Stadium' },
  { id: 'MIA', league: 'nfl', name: 'Miami Dolphins', cityId: 'miami', venue: 'Hard Rock Stadium' },
  { id: 'MIN', league: 'nfl', name: 'Minnesota Vikings', cityId: 'minneapolis', venue: 'U.S. Bank Stadium' },
  { id: 'NE', league: 'nfl', name: 'New England Patriots', cityId: 'boston', venue: 'Gillette Stadium' },
  { id: 'NO', league: 'nfl', name: 'New Orleans Saints', cityId: 'neworleans', venue: 'Caesars Superdome' },
  { id: 'NYG', league: 'nfl', name: 'New York Giants', cityId: 'newyork', venue: 'MetLife Stadium' },
  { id: 'NYJ', league: 'nfl', name: 'New York Jets', cityId: 'newyork', venue: 'MetLife Stadium' },
  { id: 'PHI', league: 'nfl', name: 'Philadelphia Eagles', cityId: 'philadelphia', venue: 'Lincoln Financial Field' },
  { id: 'PIT', league: 'nfl', name: 'Pittsburgh Steelers', cityId: 'pittsburgh', venue: 'Acrisure Stadium' },
  { id: 'SEA', league: 'nfl', name: 'Seattle Seahawks', cityId: 'seattle', venue: 'Lumen Field' },
  { id: 'SF', league: 'nfl', name: 'San Francisco 49ers', cityId: 'sanfrancisco', venue: 'Levi\u2019s Stadium' },
  { id: 'TB', league: 'nfl', name: 'Tampa Bay Buccaneers', cityId: 'tampa', venue: 'Raymond James Stadium' },
  { id: 'TEN', league: 'nfl', name: 'Tennessee Titans', cityId: 'nashville', venue: 'Nissan Stadium' },
  { id: 'WAS', league: 'nfl', name: 'Washington Commanders', cityId: 'washington', venue: 'Northwest Stadium' }
]

export const teamsInLeague = (leagueId) => TEAMS.filter(t => t.league === leagueId)
export const teamById = (id) => TEAMS.find(t => t.id === id)

// 3. GAMES ------------------------------------------------------------------
// The real, published 2026 NFL regular season. All 272 games.
// cityId + venue are THE TOWN AND GROUND THE GAME IS ACTUALLY PLAYED IN — which
// for nine of these is not the home team's town at all.
export const GAMES = [
  { home: 'SEA', away: 'NE', date: '2026-09-09', cityId: 'seattle', venue: 'Lumen Field' },
  { home: 'LA', away: 'SF', date: '2026-09-10', cityId: 'melbourne', venue: 'Melbourne Cricket Ground' },
  { home: 'CAR', away: 'CHI', date: '2026-09-13', cityId: 'charlotte', venue: 'Bank of America Stadium' },
  { home: 'CIN', away: 'TB', date: '2026-09-13', cityId: 'cincinnati', venue: 'Paycor Stadium' },
  { home: 'DET', away: 'NO', date: '2026-09-13', cityId: 'detroit', venue: 'Ford Field' },
  { home: 'HOU', away: 'BUF', date: '2026-09-13', cityId: 'houston', venue: 'Reliant Stadium' },
  { home: 'IND', away: 'BAL', date: '2026-09-13', cityId: 'indianapolis', venue: 'Lucas Oil Stadium' },
  { home: 'JAX', away: 'CLE', date: '2026-09-13', cityId: 'jacksonville', venue: 'EverBank Stadium' },
  { home: 'LAC', away: 'ARI', date: '2026-09-13', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { home: 'LV', away: 'MIA', date: '2026-09-13', cityId: 'lasvegas', venue: 'Allegiant Stadium' },
  { home: 'MIN', away: 'GB', date: '2026-09-13', cityId: 'minneapolis', venue: 'U.S. Bank Stadium' },
  { home: 'NYG', away: 'DAL', date: '2026-09-13', cityId: 'newyork', venue: 'MetLife Stadium' },
  { home: 'PHI', away: 'WAS', date: '2026-09-13', cityId: 'philadelphia', venue: 'Lincoln Financial Field' },
  { home: 'PIT', away: 'ATL', date: '2026-09-13', cityId: 'pittsburgh', venue: 'Acrisure Stadium' },
  { home: 'TEN', away: 'NYJ', date: '2026-09-13', cityId: 'nashville', venue: 'Nissan Stadium' },
  { home: 'KC', away: 'DEN', date: '2026-09-14', cityId: 'kansascity', venue: 'Arrowhead Stadium' },
  { home: 'BUF', away: 'DET', date: '2026-09-17', cityId: 'buffalo', venue: 'Highmark Stadium' },
  { home: 'ARI', away: 'SEA', date: '2026-09-20', cityId: 'phoenix', venue: 'State Farm Stadium' },
  { home: 'ATL', away: 'CAR', date: '2026-09-20', cityId: 'atlanta', venue: 'Mercedes-Benz Stadium' },
  { home: 'BAL', away: 'NO', date: '2026-09-20', cityId: 'baltimore', venue: 'M&T Bank Stadium' },
  { home: 'CHI', away: 'MIN', date: '2026-09-20', cityId: 'chicago', venue: 'Soldier Field' },
  { home: 'DAL', away: 'WAS', date: '2026-09-20', cityId: 'dallas', venue: 'AT&T Stadium' },
  { home: 'DEN', away: 'JAX', date: '2026-09-20', cityId: 'denver', venue: 'Empower Field at Mile High' },
  { home: 'HOU', away: 'CIN', date: '2026-09-20', cityId: 'houston', venue: 'Reliant Stadium' },
  { home: 'KC', away: 'IND', date: '2026-09-20', cityId: 'kansascity', venue: 'Arrowhead Stadium' },
  { home: 'LAC', away: 'LV', date: '2026-09-20', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { home: 'NE', away: 'PIT', date: '2026-09-20', cityId: 'boston', venue: 'Gillette Stadium' },
  { home: 'NYJ', away: 'GB', date: '2026-09-20', cityId: 'newyork', venue: 'MetLife Stadium' },
  { home: 'SF', away: 'MIA', date: '2026-09-20', cityId: 'sanfrancisco', venue: 'Levi’s Stadium' },
  { home: 'TB', away: 'CLE', date: '2026-09-20', cityId: 'tampa', venue: 'Raymond James Stadium' },
  { home: 'TEN', away: 'PHI', date: '2026-09-20', cityId: 'nashville', venue: 'Nissan Stadium' },
  { home: 'LA', away: 'NYG', date: '2026-09-21', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { home: 'GB', away: 'ATL', date: '2026-09-24', cityId: 'greenbay', venue: 'Lambeau Field' },
  { home: 'BUF', away: 'LAC', date: '2026-09-27', cityId: 'buffalo', venue: 'Highmark Stadium' },
  { home: 'CLE', away: 'CAR', date: '2026-09-27', cityId: 'cleveland', venue: 'Huntington Bank Field' },
  { home: 'DAL', away: 'BAL', date: '2026-09-27', cityId: 'rio', venue: 'Maracanã' },
  { home: 'DEN', away: 'LA', date: '2026-09-27', cityId: 'denver', venue: 'Empower Field at Mile High' },
  { home: 'DET', away: 'NYJ', date: '2026-09-27', cityId: 'detroit', venue: 'Ford Field' },
  { home: 'IND', away: 'HOU', date: '2026-09-27', cityId: 'indianapolis', venue: 'Lucas Oil Stadium' },
  { home: 'JAX', away: 'NE', date: '2026-09-27', cityId: 'jacksonville', venue: 'EverBank Stadium' },
  { home: 'MIA', away: 'KC', date: '2026-09-27', cityId: 'miami', venue: 'Hard Rock Stadium' },
  { home: 'NO', away: 'LV', date: '2026-09-27', cityId: 'neworleans', venue: 'Caesars Superdome' },
  { home: 'NYG', away: 'TEN', date: '2026-09-27', cityId: 'newyork', venue: 'MetLife Stadium' },
  { home: 'PIT', away: 'CIN', date: '2026-09-27', cityId: 'pittsburgh', venue: 'Acrisure Stadium' },
  { home: 'SF', away: 'ARI', date: '2026-09-27', cityId: 'sanfrancisco', venue: 'Levi’s Stadium' },
  { home: 'TB', away: 'MIN', date: '2026-09-27', cityId: 'tampa', venue: 'Raymond James Stadium' },
  { home: 'WAS', away: 'SEA', date: '2026-09-27', cityId: 'washington', venue: 'Northwest Stadium' },
  { home: 'CHI', away: 'PHI', date: '2026-09-28', cityId: 'chicago', venue: 'Soldier Field' },
  { home: 'CLE', away: 'PIT', date: '2026-10-01', cityId: 'cleveland', venue: 'Huntington Bank Field' },
  { home: 'BAL', away: 'TEN', date: '2026-10-04', cityId: 'baltimore', venue: 'M&T Bank Stadium' },
  { home: 'BUF', away: 'NE', date: '2026-10-04', cityId: 'buffalo', venue: 'Highmark Stadium' },
  { home: 'CAR', away: 'DET', date: '2026-10-04', cityId: 'charlotte', venue: 'Bank of America Stadium' },
  { home: 'CHI', away: 'NYJ', date: '2026-10-04', cityId: 'chicago', venue: 'Soldier Field' },
  { home: 'CIN', away: 'JAX', date: '2026-10-04', cityId: 'cincinnati', venue: 'Paycor Stadium' },
  { home: 'HOU', away: 'DAL', date: '2026-10-04', cityId: 'houston', venue: 'Reliant Stadium' },
  { home: 'LV', away: 'KC', date: '2026-10-04', cityId: 'lasvegas', venue: 'Allegiant Stadium' },
  { home: 'MIN', away: 'MIA', date: '2026-10-04', cityId: 'minneapolis', venue: 'U.S. Bank Stadium' },
  { home: 'NYG', away: 'ARI', date: '2026-10-04', cityId: 'newyork', venue: 'MetLife Stadium' },
  { home: 'PHI', away: 'LA', date: '2026-10-04', cityId: 'philadelphia', venue: 'Lincoln Financial Field' },
  { home: 'SEA', away: 'LAC', date: '2026-10-04', cityId: 'seattle', venue: 'Lumen Field' },
  { home: 'SF', away: 'DEN', date: '2026-10-04', cityId: 'sanfrancisco', venue: 'Levi’s Stadium' },
  { home: 'TB', away: 'GB', date: '2026-10-04', cityId: 'tampa', venue: 'Raymond James Stadium' },
  { home: 'WAS', away: 'IND', date: '2026-10-04', cityId: 'london', venue: 'Tottenham Hotspur Stadium' },
  { home: 'NO', away: 'ATL', date: '2026-10-05', cityId: 'neworleans', venue: 'Caesars Superdome' },
  { home: 'DAL', away: 'TB', date: '2026-10-08', cityId: 'dallas', venue: 'AT&T Stadium' },
  { home: 'ARI', away: 'DET', date: '2026-10-11', cityId: 'phoenix', venue: 'State Farm Stadium' },
  { home: 'ATL', away: 'BAL', date: '2026-10-11', cityId: 'atlanta', venue: 'Mercedes-Benz Stadium' },
  { home: 'GB', away: 'CHI', date: '2026-10-11', cityId: 'greenbay', venue: 'Lambeau Field' },
  { home: 'JAX', away: 'PHI', date: '2026-10-11', cityId: 'london', venue: 'Tottenham Hotspur Stadium' },
  { home: 'LAC', away: 'DEN', date: '2026-10-11', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { home: 'MIA', away: 'CIN', date: '2026-10-11', cityId: 'miami', venue: 'Hard Rock Stadium' },
  { home: 'NE', away: 'LV', date: '2026-10-11', cityId: 'boston', venue: 'Gillette Stadium' },
  { home: 'NO', away: 'MIN', date: '2026-10-11', cityId: 'neworleans', venue: 'Caesars Superdome' },
  { home: 'NYJ', away: 'CLE', date: '2026-10-11', cityId: 'newyork', venue: 'MetLife Stadium' },
  { home: 'PIT', away: 'IND', date: '2026-10-11', cityId: 'pittsburgh', venue: 'Acrisure Stadium' },
  { home: 'SEA', away: 'SF', date: '2026-10-11', cityId: 'seattle', venue: 'Lumen Field' },
  { home: 'TEN', away: 'HOU', date: '2026-10-11', cityId: 'nashville', venue: 'Nissan Stadium' },
  { home: 'WAS', away: 'NYG', date: '2026-10-11', cityId: 'washington', venue: 'Northwest Stadium' },
  { home: 'LA', away: 'BUF', date: '2026-10-12', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { home: 'DEN', away: 'SEA', date: '2026-10-15', cityId: 'denver', venue: 'Empower Field at Mile High' },
  { home: 'ATL', away: 'CHI', date: '2026-10-18', cityId: 'atlanta', venue: 'Mercedes-Benz Stadium' },
  { home: 'CLE', away: 'BAL', date: '2026-10-18', cityId: 'cleveland', venue: 'Huntington Bank Field' },
  { home: 'GB', away: 'DAL', date: '2026-10-18', cityId: 'greenbay', venue: 'Lambeau Field' },
  { home: 'IND', away: 'TEN', date: '2026-10-18', cityId: 'indianapolis', venue: 'Lucas Oil Stadium' },
  { home: 'JAX', away: 'HOU', date: '2026-10-18', cityId: 'london', venue: 'Wembley Stadium' },
  { home: 'KC', away: 'LAC', date: '2026-10-18', cityId: 'kansascity', venue: 'Arrowhead Stadium' },
  { home: 'LA', away: 'ARI', date: '2026-10-18', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { home: 'LV', away: 'BUF', date: '2026-10-18', cityId: 'lasvegas', venue: 'Allegiant Stadium' },
  { home: 'NE', away: 'NYJ', date: '2026-10-18', cityId: 'boston', venue: 'Gillette Stadium' },
  { home: 'NYG', away: 'NO', date: '2026-10-18', cityId: 'newyork', venue: 'MetLife Stadium' },
  { home: 'PHI', away: 'CAR', date: '2026-10-18', cityId: 'philadelphia', venue: 'Lincoln Financial Field' },
  { home: 'TB', away: 'PIT', date: '2026-10-18', cityId: 'tampa', venue: 'Raymond James Stadium' },
  { home: 'SF', away: 'WAS', date: '2026-10-19', cityId: 'sanfrancisco', venue: 'Levi’s Stadium' },
  { home: 'CHI', away: 'NE', date: '2026-10-22', cityId: 'chicago', venue: 'Soldier Field' },
  { home: 'ARI', away: 'DEN', date: '2026-10-25', cityId: 'phoenix', venue: 'State Farm Stadium' },
  { home: 'ATL', away: 'SF', date: '2026-10-25', cityId: 'atlanta', venue: 'Mercedes-Benz Stadium' },
  { home: 'BAL', away: 'CIN', date: '2026-10-25', cityId: 'baltimore', venue: 'M&T Bank Stadium' },
  { home: 'CAR', away: 'TB', date: '2026-10-25', cityId: 'charlotte', venue: 'Bank of America Stadium' },
  { home: 'DET', away: 'GB', date: '2026-10-25', cityId: 'detroit', venue: 'Ford Field' },
  { home: 'HOU', away: 'NYG', date: '2026-10-25', cityId: 'houston', venue: 'Reliant Stadium' },
  { home: 'LV', away: 'LA', date: '2026-10-25', cityId: 'lasvegas', venue: 'Allegiant Stadium' },
  { home: 'MIN', away: 'IND', date: '2026-10-25', cityId: 'minneapolis', venue: 'U.S. Bank Stadium' },
  { home: 'NO', away: 'PIT', date: '2026-10-25', cityId: 'paris', venue: 'Stade de France' },
  { home: 'NYJ', away: 'MIA', date: '2026-10-25', cityId: 'newyork', venue: 'MetLife Stadium' },
  { home: 'SEA', away: 'KC', date: '2026-10-25', cityId: 'seattle', venue: 'Lumen Field' },
  { home: 'TEN', away: 'CLE', date: '2026-10-25', cityId: 'nashville', venue: 'Nissan Stadium' },
  { home: 'PHI', away: 'DAL', date: '2026-10-26', cityId: 'philadelphia', venue: 'Lincoln Financial Field' },
  { home: 'GB', away: 'CAR', date: '2026-10-29', cityId: 'greenbay', venue: 'Lambeau Field' },
  { home: 'BUF', away: 'BAL', date: '2026-11-01', cityId: 'buffalo', venue: 'Highmark Stadium' },
  { home: 'CIN', away: 'TEN', date: '2026-11-01', cityId: 'cincinnati', venue: 'Paycor Stadium' },
  { home: 'DAL', away: 'ARI', date: '2026-11-01', cityId: 'dallas', venue: 'AT&T Stadium' },
  { home: 'DEN', away: 'KC', date: '2026-11-01', cityId: 'denver', venue: 'Empower Field at Mile High' },
  { home: 'DET', away: 'MIN', date: '2026-11-01', cityId: 'detroit', venue: 'Ford Field' },
  { home: 'JAX', away: 'IND', date: '2026-11-01', cityId: 'jacksonville', venue: 'EverBank Stadium' },
  { home: 'LA', away: 'LAC', date: '2026-11-01', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { home: 'MIA', away: 'NE', date: '2026-11-01', cityId: 'miami', venue: 'Hard Rock Stadium' },
  { home: 'NYJ', away: 'LV', date: '2026-11-01', cityId: 'newyork', venue: 'MetLife Stadium' },
  { home: 'PIT', away: 'CLE', date: '2026-11-01', cityId: 'pittsburgh', venue: 'Acrisure Stadium' },
  { home: 'TB', away: 'ATL', date: '2026-11-01', cityId: 'tampa', venue: 'Raymond James Stadium' },
  { home: 'WAS', away: 'PHI', date: '2026-11-01', cityId: 'washington', venue: 'Northwest Stadium' },
  { home: 'SEA', away: 'CHI', date: '2026-11-02', cityId: 'seattle', venue: 'Lumen Field' },
  { home: 'BAL', away: 'JAX', date: '2026-11-05', cityId: 'baltimore', venue: 'M&T Bank Stadium' },
  { home: 'ATL', away: 'CIN', date: '2026-11-08', cityId: 'madrid', venue: 'Santiago Bernabéu' },
  { home: 'CAR', away: 'DEN', date: '2026-11-08', cityId: 'charlotte', venue: 'Bank of America Stadium' },
  { home: 'CHI', away: 'TB', date: '2026-11-08', cityId: 'chicago', venue: 'Soldier Field' },
  { home: 'IND', away: 'DAL', date: '2026-11-08', cityId: 'indianapolis', venue: 'Lucas Oil Stadium' },
  { home: 'KC', away: 'NYJ', date: '2026-11-08', cityId: 'kansascity', venue: 'Arrowhead Stadium' },
  { home: 'LAC', away: 'HOU', date: '2026-11-08', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { home: 'MIA', away: 'DET', date: '2026-11-08', cityId: 'miami', venue: 'Hard Rock Stadium' },
  { home: 'NE', away: 'GB', date: '2026-11-08', cityId: 'boston', venue: 'Gillette Stadium' },
  { home: 'NO', away: 'CLE', date: '2026-11-08', cityId: 'neworleans', venue: 'Caesars Superdome' },
  { home: 'PHI', away: 'NYG', date: '2026-11-08', cityId: 'philadelphia', venue: 'Lincoln Financial Field' },
  { home: 'SEA', away: 'ARI', date: '2026-11-08', cityId: 'seattle', venue: 'Lumen Field' },
  { home: 'SF', away: 'LV', date: '2026-11-08', cityId: 'sanfrancisco', venue: 'Levi’s Stadium' },
  { home: 'WAS', away: 'LA', date: '2026-11-08', cityId: 'washington', venue: 'Northwest Stadium' },
  { home: 'MIN', away: 'BUF', date: '2026-11-09', cityId: 'minneapolis', venue: 'U.S. Bank Stadium' },
  { home: 'NYG', away: 'WAS', date: '2026-11-12', cityId: 'newyork', venue: 'MetLife Stadium' },
  { home: 'ARI', away: 'LA', date: '2026-11-15', cityId: 'phoenix', venue: 'State Farm Stadium' },
  { home: 'ATL', away: 'KC', date: '2026-11-15', cityId: 'atlanta', venue: 'Mercedes-Benz Stadium' },
  { home: 'CIN', away: 'PIT', date: '2026-11-15', cityId: 'cincinnati', venue: 'Paycor Stadium' },
  { home: 'CLE', away: 'HOU', date: '2026-11-15', cityId: 'cleveland', venue: 'Huntington Bank Field' },
  { home: 'DAL', away: 'SF', date: '2026-11-15', cityId: 'dallas', venue: 'AT&T Stadium' },
  { home: 'DET', away: 'NE', date: '2026-11-15', cityId: 'munich', venue: 'Allianz Arena' },
  { home: 'GB', away: 'MIN', date: '2026-11-15', cityId: 'greenbay', venue: 'Lambeau Field' },
  { home: 'IND', away: 'MIA', date: '2026-11-15', cityId: 'indianapolis', venue: 'Lucas Oil Stadium' },
  { home: 'LV', away: 'SEA', date: '2026-11-15', cityId: 'lasvegas', venue: 'Allegiant Stadium' },
  { home: 'NO', away: 'CAR', date: '2026-11-15', cityId: 'neworleans', venue: 'Caesars Superdome' },
  { home: 'NYJ', away: 'BUF', date: '2026-11-15', cityId: 'newyork', venue: 'MetLife Stadium' },
  { home: 'TEN', away: 'JAX', date: '2026-11-15', cityId: 'nashville', venue: 'Nissan Stadium' },
  { home: 'BAL', away: 'LAC', date: '2026-11-16', cityId: 'baltimore', venue: 'M&T Bank Stadium' },
  { home: 'HOU', away: 'IND', date: '2026-11-19', cityId: 'houston', venue: 'Reliant Stadium' },
  { home: 'BUF', away: 'MIA', date: '2026-11-22', cityId: 'buffalo', venue: 'Highmark Stadium' },
  { home: 'CAR', away: 'BAL', date: '2026-11-22', cityId: 'charlotte', venue: 'Bank of America Stadium' },
  { home: 'CHI', away: 'NO', date: '2026-11-22', cityId: 'chicago', venue: 'Soldier Field' },
  { home: 'DAL', away: 'TEN', date: '2026-11-22', cityId: 'dallas', venue: 'AT&T Stadium' },
  { home: 'DEN', away: 'LV', date: '2026-11-22', cityId: 'denver', venue: 'Empower Field at Mile High' },
  { home: 'DET', away: 'TB', date: '2026-11-22', cityId: 'detroit', venue: 'Ford Field' },
  { home: 'KC', away: 'ARI', date: '2026-11-22', cityId: 'kansascity', venue: 'Arrowhead Stadium' },
  { home: 'LAC', away: 'NYJ', date: '2026-11-22', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { home: 'NYG', away: 'JAX', date: '2026-11-22', cityId: 'newyork', venue: 'MetLife Stadium' },
  { home: 'PHI', away: 'PIT', date: '2026-11-22', cityId: 'philadelphia', venue: 'Lincoln Financial Field' },
  { home: 'SF', away: 'MIN', date: '2026-11-22', cityId: 'mexicocity', venue: 'Estadio Azteca' },
  { home: 'WAS', away: 'CIN', date: '2026-11-23', cityId: 'washington', venue: 'Northwest Stadium' },
  { home: 'LA', away: 'GB', date: '2026-11-25', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { home: 'BUF', away: 'KC', date: '2026-11-26', cityId: 'buffalo', venue: 'Highmark Stadium' },
  { home: 'DAL', away: 'PHI', date: '2026-11-26', cityId: 'dallas', venue: 'AT&T Stadium' },
  { home: 'DET', away: 'CHI', date: '2026-11-26', cityId: 'detroit', venue: 'Ford Field' },
  { home: 'PIT', away: 'DEN', date: '2026-11-27', cityId: 'pittsburgh', venue: 'Acrisure Stadium' },
  { home: 'ARI', away: 'WAS', date: '2026-11-29', cityId: 'phoenix', venue: 'State Farm Stadium' },
  { home: 'CIN', away: 'NO', date: '2026-11-29', cityId: 'cincinnati', venue: 'Paycor Stadium' },
  { home: 'CLE', away: 'LV', date: '2026-11-29', cityId: 'cleveland', venue: 'Huntington Bank Field' },
  { home: 'HOU', away: 'BAL', date: '2026-11-29', cityId: 'houston', venue: 'Reliant Stadium' },
  { home: 'IND', away: 'NYG', date: '2026-11-29', cityId: 'indianapolis', venue: 'Lucas Oil Stadium' },
  { home: 'JAX', away: 'TEN', date: '2026-11-29', cityId: 'jacksonville', venue: 'EverBank Stadium' },
  { home: 'LAC', away: 'NE', date: '2026-11-29', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { home: 'MIA', away: 'NYJ', date: '2026-11-29', cityId: 'miami', venue: 'Hard Rock Stadium' },
  { home: 'MIN', away: 'ATL', date: '2026-11-29', cityId: 'minneapolis', venue: 'U.S. Bank Stadium' },
  { home: 'SF', away: 'SEA', date: '2026-11-29', cityId: 'sanfrancisco', venue: 'Levi’s Stadium' },
  { home: 'TB', away: 'CAR', date: '2026-11-30', cityId: 'tampa', venue: 'Raymond James Stadium' },
  { home: 'LA', away: 'KC', date: '2026-12-03', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { home: 'ARI', away: 'PHI', date: '2026-12-06', cityId: 'phoenix', venue: 'State Farm Stadium' },
  { home: 'ATL', away: 'DET', date: '2026-12-06', cityId: 'atlanta', venue: 'Mercedes-Benz Stadium' },
  { home: 'CHI', away: 'JAX', date: '2026-12-06', cityId: 'chicago', venue: 'Soldier Field' },
  { home: 'CLE', away: 'CIN', date: '2026-12-06', cityId: 'cleveland', venue: 'Huntington Bank Field' },
  { home: 'DEN', away: 'MIA', date: '2026-12-06', cityId: 'denver', venue: 'Empower Field at Mile High' },
  { home: 'MIN', away: 'CAR', date: '2026-12-06', cityId: 'minneapolis', venue: 'U.S. Bank Stadium' },
  { home: 'NE', away: 'BUF', date: '2026-12-06', cityId: 'boston', venue: 'Gillette Stadium' },
  { home: 'NO', away: 'GB', date: '2026-12-06', cityId: 'neworleans', venue: 'Caesars Superdome' },
  { home: 'NYG', away: 'SF', date: '2026-12-06', cityId: 'newyork', venue: 'MetLife Stadium' },
  { home: 'PIT', away: 'HOU', date: '2026-12-06', cityId: 'pittsburgh', venue: 'Acrisure Stadium' },
  { home: 'TB', away: 'LAC', date: '2026-12-06', cityId: 'tampa', venue: 'Raymond James Stadium' },
  { home: 'TEN', away: 'WAS', date: '2026-12-06', cityId: 'nashville', venue: 'Nissan Stadium' },
  { home: 'SEA', away: 'DAL', date: '2026-12-07', cityId: 'seattle', venue: 'Lumen Field' },
  { home: 'NE', away: 'MIN', date: '2026-12-10', cityId: 'boston', venue: 'Gillette Stadium' },
  { home: 'BAL', away: 'TB', date: '2026-12-13', cityId: 'baltimore', venue: 'M&T Bank Stadium' },
  { home: 'CAR', away: 'NO', date: '2026-12-13', cityId: 'charlotte', venue: 'Bank of America Stadium' },
  { home: 'CIN', away: 'KC', date: '2026-12-13', cityId: 'cincinnati', venue: 'Paycor Stadium' },
  { home: 'CLE', away: 'ATL', date: '2026-12-13', cityId: 'cleveland', venue: 'Huntington Bank Field' },
  { home: 'DET', away: 'TEN', date: '2026-12-13', cityId: 'detroit', venue: 'Ford Field' },
  { home: 'GB', away: 'BUF', date: '2026-12-13', cityId: 'greenbay', venue: 'Lambeau Field' },
  { home: 'LV', away: 'LAC', date: '2026-12-13', cityId: 'lasvegas', venue: 'Allegiant Stadium' },
  { home: 'MIA', away: 'CHI', date: '2026-12-13', cityId: 'miami', venue: 'Hard Rock Stadium' },
  { home: 'NYJ', away: 'DEN', date: '2026-12-13', cityId: 'newyork', venue: 'MetLife Stadium' },
  { home: 'PHI', away: 'IND', date: '2026-12-13', cityId: 'philadelphia', venue: 'Lincoln Financial Field' },
  { home: 'SEA', away: 'NYG', date: '2026-12-13', cityId: 'seattle', venue: 'Lumen Field' },
  { home: 'SF', away: 'LA', date: '2026-12-13', cityId: 'sanfrancisco', venue: 'Levi’s Stadium' },
  { home: 'WAS', away: 'HOU', date: '2026-12-13', cityId: 'washington', venue: 'Northwest Stadium' },
  { home: 'JAX', away: 'PIT', date: '2026-12-14', cityId: 'jacksonville', venue: 'EverBank Stadium' },
  { home: 'LAC', away: 'SF', date: '2026-12-17', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { home: 'BUF', away: 'CHI', date: '2026-12-19', cityId: 'buffalo', venue: 'Highmark Stadium' },
  { home: 'PHI', away: 'SEA', date: '2026-12-19', cityId: 'philadelphia', venue: 'Lincoln Financial Field' },
  { home: 'ARI', away: 'NYJ', date: '2026-12-20', cityId: 'phoenix', venue: 'State Farm Stadium' },
  { home: 'CAR', away: 'CIN', date: '2026-12-20', cityId: 'charlotte', venue: 'Bank of America Stadium' },
  { home: 'GB', away: 'MIA', date: '2026-12-20', cityId: 'greenbay', venue: 'Lambeau Field' },
  { home: 'HOU', away: 'JAX', date: '2026-12-20', cityId: 'houston', venue: 'Reliant Stadium' },
  { home: 'LA', away: 'DAL', date: '2026-12-20', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { home: 'LV', away: 'DEN', date: '2026-12-20', cityId: 'lasvegas', venue: 'Allegiant Stadium' },
  { home: 'MIN', away: 'DET', date: '2026-12-20', cityId: 'minneapolis', venue: 'U.S. Bank Stadium' },
  { home: 'NYG', away: 'CLE', date: '2026-12-20', cityId: 'newyork', venue: 'MetLife Stadium' },
  { home: 'PIT', away: 'BAL', date: '2026-12-20', cityId: 'pittsburgh', venue: 'Acrisure Stadium' },
  { home: 'TB', away: 'NO', date: '2026-12-20', cityId: 'tampa', venue: 'Raymond James Stadium' },
  { home: 'TEN', away: 'IND', date: '2026-12-20', cityId: 'nashville', venue: 'Nissan Stadium' },
  { home: 'WAS', away: 'ATL', date: '2026-12-20', cityId: 'washington', venue: 'Northwest Stadium' },
  { home: 'KC', away: 'NE', date: '2026-12-21', cityId: 'kansascity', venue: 'Arrowhead Stadium' },
  { home: 'PHI', away: 'HOU', date: '2026-12-24', cityId: 'philadelphia', venue: 'Lincoln Financial Field' },
  { home: 'CHI', away: 'GB', date: '2026-12-25', cityId: 'chicago', venue: 'Soldier Field' },
  { home: 'DEN', away: 'BUF', date: '2026-12-25', cityId: 'denver', venue: 'Empower Field at Mile High' },
  { home: 'SEA', away: 'LA', date: '2026-12-25', cityId: 'seattle', venue: 'Lumen Field' },
  { home: 'ATL', away: 'TB', date: '2026-12-27', cityId: 'atlanta', venue: 'Mercedes-Benz Stadium' },
  { home: 'BAL', away: 'CLE', date: '2026-12-27', cityId: 'baltimore', venue: 'M&T Bank Stadium' },
  { home: 'DAL', away: 'JAX', date: '2026-12-27', cityId: 'dallas', venue: 'AT&T Stadium' },
  { home: 'IND', away: 'CIN', date: '2026-12-27', cityId: 'indianapolis', venue: 'Lucas Oil Stadium' },
  { home: 'KC', away: 'SF', date: '2026-12-27', cityId: 'kansascity', venue: 'Arrowhead Stadium' },
  { home: 'LV', away: 'TEN', date: '2026-12-27', cityId: 'lasvegas', venue: 'Allegiant Stadium' },
  { home: 'MIA', away: 'LAC', date: '2026-12-27', cityId: 'miami', venue: 'Hard Rock Stadium' },
  { home: 'MIN', away: 'WAS', date: '2026-12-27', cityId: 'minneapolis', venue: 'U.S. Bank Stadium' },
  { home: 'NO', away: 'ARI', date: '2026-12-27', cityId: 'neworleans', venue: 'Caesars Superdome' },
  { home: 'NYJ', away: 'NE', date: '2026-12-27', cityId: 'newyork', venue: 'MetLife Stadium' },
  { home: 'PIT', away: 'CAR', date: '2026-12-27', cityId: 'pittsburgh', venue: 'Acrisure Stadium' },
  { home: 'DET', away: 'NYG', date: '2026-12-28', cityId: 'detroit', venue: 'Ford Field' },
  { home: 'CIN', away: 'BAL', date: '2026-12-31', cityId: 'cincinnati', venue: 'Paycor Stadium' },
  { home: 'ARI', away: 'LV', date: '2027-01-03', cityId: 'phoenix', venue: 'State Farm Stadium' },
  { home: 'ATL', away: 'NO', date: '2027-01-03', cityId: 'atlanta', venue: 'Mercedes-Benz Stadium' },
  { home: 'CAR', away: 'SEA', date: '2027-01-03', cityId: 'charlotte', venue: 'Bank of America Stadium' },
  { home: 'CHI', away: 'DET', date: '2027-01-03', cityId: 'chicago', venue: 'Soldier Field' },
  { home: 'CLE', away: 'IND', date: '2027-01-03', cityId: 'cleveland', venue: 'Huntington Bank Field' },
  { home: 'DAL', away: 'NYG', date: '2027-01-03', cityId: 'dallas', venue: 'AT&T Stadium' },
  { home: 'JAX', away: 'WAS', date: '2027-01-03', cityId: 'jacksonville', venue: 'EverBank Stadium' },
  { home: 'LAC', away: 'KC', date: '2027-01-03', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { home: 'MIA', away: 'BUF', date: '2027-01-03', cityId: 'miami', venue: 'Hard Rock Stadium' },
  { home: 'NE', away: 'DEN', date: '2027-01-03', cityId: 'boston', venue: 'Gillette Stadium' },
  { home: 'NYJ', away: 'MIN', date: '2027-01-03', cityId: 'newyork', venue: 'MetLife Stadium' },
  { home: 'SF', away: 'PHI', date: '2027-01-03', cityId: 'sanfrancisco', venue: 'Levi’s Stadium' },
  { home: 'TB', away: 'LA', date: '2027-01-03', cityId: 'tampa', venue: 'Raymond James Stadium' },
  { home: 'TEN', away: 'PIT', date: '2027-01-03', cityId: 'nashville', venue: 'Nissan Stadium' },
  { home: 'GB', away: 'HOU', date: '2027-01-04', cityId: 'greenbay', venue: 'Lambeau Field' },
  { home: 'ARI', away: 'SF', date: '2027-01-10', cityId: 'phoenix', venue: 'State Farm Stadium' },
  { home: 'BAL', away: 'PIT', date: '2027-01-10', cityId: 'baltimore', venue: 'M&T Bank Stadium' },
  { home: 'BUF', away: 'NYJ', date: '2027-01-10', cityId: 'buffalo', venue: 'Highmark Stadium' },
  { home: 'CAR', away: 'ATL', date: '2027-01-10', cityId: 'charlotte', venue: 'Bank of America Stadium' },
  { home: 'CIN', away: 'CLE', date: '2027-01-10', cityId: 'cincinnati', venue: 'Paycor Stadium' },
  { home: 'DEN', away: 'LAC', date: '2027-01-10', cityId: 'denver', venue: 'Empower Field at Mile High' },
  { home: 'GB', away: 'DET', date: '2027-01-10', cityId: 'greenbay', venue: 'Lambeau Field' },
  { home: 'HOU', away: 'TEN', date: '2027-01-10', cityId: 'houston', venue: 'Reliant Stadium' },
  { home: 'IND', away: 'JAX', date: '2027-01-10', cityId: 'indianapolis', venue: 'Lucas Oil Stadium' },
  { home: 'KC', away: 'LV', date: '2027-01-10', cityId: 'kansascity', venue: 'Arrowhead Stadium' },
  { home: 'LA', away: 'SEA', date: '2027-01-10', cityId: 'losangeles', venue: 'SoFi Stadium' },
  { home: 'MIN', away: 'CHI', date: '2027-01-10', cityId: 'minneapolis', venue: 'U.S. Bank Stadium' },
  { home: 'NE', away: 'MIA', date: '2027-01-10', cityId: 'boston', venue: 'Gillette Stadium' },
  { home: 'NO', away: 'TB', date: '2027-01-10', cityId: 'neworleans', venue: 'Caesars Superdome' },
  { home: 'NYG', away: 'PHI', date: '2027-01-10', cityId: 'newyork', venue: 'MetLife Stadium' },
  { home: 'WAS', away: 'DAL', date: '2027-01-10', cityId: 'washington', venue: 'Northwest Stadium' }
]

// ---------------------------------------------------------------------------
// WHERE THE GROUND ACTUALLY IS
// ---------------------------------------------------------------------------
// The map lands on the TOWN, because the town is the trip. But nine of these
// grounds are not in the town on the card — Gillette is 28 miles from Boston,
// Levi's is 40 from San Francisco, MetLife is in another state. A group books a
// hotel downtown and finds out on the Saturday.
//
// So: if the ground is somewhere other than the town, the venue caption says
// where, and how far. If it IS in the town — Lambeau, Wembley, the Superdome —
// the caption stays plain. The line only shows up where you'd want it.
const VENUE_NOTES = {
  'Gillette Stadium': 'Foxborough, 28 miles',
  'Levi\u2019s Stadium': 'Santa Clara, 40 miles',
  'AT&T Stadium': 'Arlington, 20 miles',
  'Hard Rock Stadium': 'Miami Gardens, 16 miles',
  'State Farm Stadium': 'Glendale, 13 miles',
  'Highmark Stadium': 'Orchard Park, 11 miles',
  'SoFi Stadium': 'Inglewood, 10 miles',
  'Northwest Stadium': 'Landover, 10 miles',
  'MetLife Stadium': 'East Rutherford, New Jersey, 9 miles',
  'Stade de France': 'Saint-Denis, 6 miles',

  // NHL (S11) - the arenas that aren't in the town on the card.
  'Amerant Bank Arena': 'Sunrise, 30 miles',
  'Grand Casino Arena': 'St Paul, 11 miles',
  'Prudential Center': 'Newark, New Jersey, 9 miles',
  'UBS Arena': 'Elmont, 19 miles',
  'Canadian Tire Centre': 'Kanata, 15 miles'
}

const venueLine = (venue) => VENUE_NOTES[venue] ? `${venue} \u00b7 ${VENUE_NOTES[venue]}` : venue

// ---------------------------------------------------------------------------
// THE SLATE — every game not played in your own town.
// ---------------------------------------------------------------------------
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

function fmt(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  return `${DAYS[dt.getDay()]} ${String(d).padStart(2, '0')} ${MONTHS[m - 1]}`
}

const today = () => new Date().toISOString().slice(0, 10)

export function awaySlate(teamId) {
  const team = teamById(teamId)
  if (!team) return []
  const now = today()

  return GAMES
    // your games...
    .filter(g => g.home === teamId || g.away === teamId)
    // ...that are NOT in your town. This is the whole rule.
    .filter(g => g.cityId !== team.cityId)
    // already-played games are excluded (locked, Session 1)
    .filter(g => g.date >= now)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((g) => {
      const oppId = g.home === teamId ? g.away : g.home
      const opp = teamById(oppId)
      const card = CITIES[g.cityId]
      return {
        id: `${teamId}-${g.date}-${g.cityId}`,
        opponent: opp ? opp.name : oppId,
        venue: venueLine(g.venue),
        cityId: g.cityId,
        city: card.city,
        state: card.state,
        lat: card.lat,
        lng: card.lng,
        facts: card.facts,
        todo: card.todo,
        date: fmt(g.date)
      }
    })
}

// TOWNS --------------------------------------------------------------------
// THE WHEEL'S UNIT IS THE TOWN, NOT THE FIXTURE.
// A slate can visit the same city twice — the Cardinals and the Chiefs both
// play in Los Angeles twice; the Browns are in New York twice; the Jaguars are
// in London twice. Two identical slices would break the wheel: you could not
// tell which one won, and a near-miss on a town you were also going to hit
// anyway is not a near-miss at all.
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
