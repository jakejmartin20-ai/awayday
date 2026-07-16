import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Header, Strip, Kicker } from './Frame'
import { BORDERS } from './borders'

// ---------------------------------------------------------------------------
// AWAY DAY — THE DEAL-MAP  (Mode 2. Mocked and approved, S18.)
//
// Nine ANONYMOUS pins drop on a real map of wherever fate has just dealt. A
// beat. Then the pins lift, the map dies underneath them, and they fly into a
// ring — and the ring IS the wheel's rim. The names appear only as the wheel
// forms (S4 — withhold the payoff).
//
// THERE IS NO BUTTON ON THIS SCREEN. The commitment was made on the date screen
// — "I'm free that weekend, go" — and fate now runs unbroken to the result.
// A button you were always going to press is a fake decision (S18).
// ---------------------------------------------------------------------------

// THE MAP AND THE WHEEL SHARE ONE COORDINATE SPACE. These four numbers are the
// wheel's, read out of Wheel.jsx — a pin sitting on Toledo has to be able to
// fly to the centre of slice four and land exactly on the rim.
const R = 150, CX = 165, CY = 165
const VB_W = 330, VB_H = 345

const TILE = 256
const PAD = 46                       // px of breathing room round the pins

const DROP_DELAY = 380               // before the first pin
const DROP_STEP = 120                // fate counts them out, one at a time
const BEAT = 700                     // long enough to read the shape of the deal
const LIFT = 700                     // pins to the rim, map dying under them

// --- WEB MERCATOR. Six lines. No library, no key, nothing in the bundle. ----
function project(lat, lng, z) {
  const ws = TILE * Math.pow(2, z)
  const s = Math.sin((lat * Math.PI) / 180)
  return {
    x: ((lng + 180) / 360) * ws,
    y: (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * ws
  }
}

// ---------------------------------------------------------------------------
// 🔴 THE ANTIMERIDIAN.
// Seattle is at −122°. Melbourne is at +145°. Take the min and the max and you
// get a 267° box — A MAP OF AFRICA, with two pins clinging to opposite edges.
// The real hop is 127°, across the Pacific.
//
// The correct window is the COMPLEMENT OF THE LARGEST EMPTY GAP on the circle
// of longitude. It is a no-op for every all-American deal, so it costs nothing
// and it is always right.
//
// ⭐ A BOUNDING BOX CAN BE PERFECTLY CORRECT AND BE THE WRONG HALF OF THE EARTH.
// Mode 2's pool is domestic, so this never fires today — but Jacksonville is the
// one Mode 1 club that fires the deal, and its slate has LONDON on it twice.
// ---------------------------------------------------------------------------
function lngWindow(lngs) {
  const s = [...new Set(lngs)].sort((a, b) => a - b)
  if (s.length === 1) return { west: s[0], east: s[0] }
  let best = -1, wi = 0
  for (let i = 0; i < s.length; i++) {
    const gap = (((s[(i + 1) % s.length] - s[i]) % 360) + 360) % 360
    if (gap > best) { best = gap; wi = (i + 1) % s.length }
  }
  const west = s[wi]
  let east = s[(wi - 1 + s.length) % s.length]
  while (east < west) east += 360
  return { west, east }
}

// Fit the deal into the stage. The map is DIFFERENT EVERY DEAL — that is the
// point. Nine towns in Ohio and it is a map of Ohio.
function frame(towns, W, H) {
  const { west, east } = lngWindow(towns.map(t => t.lng))
  const lats = towns.map(t => t.lat)
  const north = Math.max(...lats), south = Math.min(...lats)
  const usableW = Math.max(40, W - PAD * 2)
  const usableH = Math.max(40, H - PAD * 2)

  for (let z = 12; z >= 0; z--) {
    const a = project(north, west, z)
    const b = project(south, east, z)
    if (b.x - a.x <= usableW && b.y - a.y <= usableH) {
      return { z, originX: (a.x + b.x) / 2 - W / 2, originY: (a.y + b.y) / 2 - H / 2 }
    }
  }
  const a = project(north, west, 0), b = project(south, east, 0)
  return { z: 0, originX: (a.x + b.x) / 2 - W / 2, originY: (a.y + b.y) / 2 - H / 2 }
}

// ---------------------------------------------------------------------------
// THE MAP LAYS ITS OWN TILES.
//
// The result screen's OSM iframe CANNOT carry the pins: it fits your bbox with
// Leaflet, which snaps to an integer zoom and then shows you MORE ground than
// you asked for — and does not tell you how much. Pins positioned by maths over
// a frame that quietly re-framed itself land in the wrong place, AND IT WOULD
// LOOK ALMOST RIGHT, WHICH IS WORSE (S18).
//
// Tiles we place ourselves. The projection is then ours, and the pin maths and
// the map maths are the same maths. ~9 tiles a deal. Attribution is required
// and is below the map.
// ---------------------------------------------------------------------------
function tilesFor(view, W, H) {
  const { z, originX, originY } = view
  const max = Math.pow(2, z)
  const out = []
  for (let ty = Math.floor(originY / TILE); ty <= Math.floor((originY + H) / TILE); ty++) {
    if (ty < 0 || ty >= max) continue
    for (let tx = Math.floor(originX / TILE); tx <= Math.floor((originX + W) / TILE); tx++) {
      const wrapped = ((tx % max) + max) % max     // the world repeats sideways
      out.push({
        key: `${z}/${tx}/${ty}`,
        src: `https://tile.openstreetmap.org/${z}/${wrapped}/${ty}.png`,
        left: tx * TILE - originX,
        top: ty * TILE - originY
      })
    }
  }
  return out
}

function pinXY(town, view, W) {
  const p = project(town.lat, town.lng, view.z)
  const ws = TILE * Math.pow(2, view.z)
  let x = p.x - view.originX
  while (x < -ws / 2) x += ws                      // keep the pin on the copy of
  while (x > ws * 1.5) x -= ws                     // the world we are looking at
  if (x < 0 && x + ws < W) x += ws
  return { x, y: p.y - view.originY }
}

// Border rings -> one SVG path, projected with the SAME maths as the tiles and
// pins so the lines sit exactly on the coastlines. Rings fully off the stage are
// skipped so the path stays short. Soft state lines and hard country lines are
// two separate paths (drawn with different weight), built the same way.
function pathFor(rings, view, W, H) {
  let d = ''
  for (const ring of rings) {
    let minx = 1e18, miny = 1e18, maxx = -1e18, maxy = -1e18
    const pr = ring.map(([lng, lat]) => {
      const p = project(lat, lng, view.z)
      const x = p.x - view.originX, y = p.y - view.originY
      if (x < minx) minx = x; if (x > maxx) maxx = x
      if (y < miny) miny = y; if (y > maxy) maxy = y
      return [x, y]
    })
    if (maxx < -20 || minx > W + 20 || maxy < -20 || miny > H + 20) continue
    pr.forEach(([x, y], i) => { d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1) })
  }
  return d
}

export default function DealMap({ games, title, poolTowns, onRim, onBack, onHome }) {
  const stage = useRef(null)
  const timers = useRef([])
  const [box, setBox] = useState(null)             // { W, H, view, tiles, pins }
  const [phase, setPhase] = useState('cold')       // cold | drop | rim

  // The stage has to be measured, not assumed — the pin maths is in real pixels.
  useLayoutEffect(() => {
    const el = stage.current
    if (!el) return
    const W = el.clientWidth, H = el.clientHeight
    const view = frame(games, W, H)
    setBox({
      W, H, view,
      tiles: tilesFor(view, W, H),
      pins: games.map(g => pinXY(g, view, W)),
      stateD: pathFor(BORDERS.states, view, W, H),
      countryD: pathFor(BORDERS.countries, view, W, H)
    })
  }, [games])

  useEffect(() => {
    if (!box) return
    const at = (ms, fn) => timers.current.push(setTimeout(fn, ms))
    requestAnimationFrame(() => setPhase('drop'))
    const dropped = DROP_DELAY + games.length * DROP_STEP
    at(dropped + BEAT, () => setPhase('rim'))
    at(dropped + BEAT + LIFT, onRim)
    return () => { timers.current.forEach(clearTimeout); timers.current = [] }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box])

  const n = games.length
  const rim = (i) => {
    const mid = i * (360 / n) + 180 / n            // the centre of its slice
    const a = ((mid - 90) * Math.PI) / 180
    return {
      x: (CX + R * Math.cos(a)) * (box.W / VB_W),
      y: (CY + R * Math.sin(a)) * (box.H / VB_H)
    }
  }

  return (
    <>
      <Header onBack={onBack} onHome={onHome} />
      <Strip left={title} right={`${poolTowns} towns in play`} />

      <div className="pad">
        <Kicker>{phase === 'rim' ? 'Fate picks one' : 'Fate is dealing'}</Kicker>

        <div className="stage" ref={stage}>
          <div className={`dealmap ${box && phase !== 'rim' ? 'on' : ''}`}>
            <div className="tiles">
              {box && box.tiles.map(t => (
                <img key={t.key} src={t.src} alt="" style={{ left: t.left, top: t.top }} />
              ))}
            </div>
            {box && (
              <svg className="borders" width={box.W} height={box.H} viewBox={`0 0 ${box.W} ${box.H}`}>
                <path className="b-state" d={box.stateD} />
                <path className="b-country" d={box.countryD} />
              </svg>
            )}
            <div className="attrib">
              &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>
            </div>
          </div>

          {/* NINE PINS. NO NAMES. An anonymous near-miss is just movement (S6) —
              so the names are withheld until the wheel forms. */}
          {box && games.map((g, i) => {
            const p = box.pins[i]
            const t = phase === 'rim' ? rim(i) : null
            const style = {
              left: p.x,
              top: p.y,
              transition: phase === 'rim'
                ? 'transform .85s cubic-bezier(.6,.02,.2,1), opacity .3s ease .55s'
                : `transform .34s cubic-bezier(.34,1.56,.64,1) ${DROP_DELAY + i * DROP_STEP}ms, opacity .18s ease ${DROP_DELAY + i * DROP_STEP}ms`,
              transform: phase === 'cold' ? 'translateY(-34px) scale(.7)'
                : phase === 'drop' ? 'translateY(0) scale(1)'
                  : `translate(${t.x - p.x}px, ${t.y - p.y}px) scale(.85)`,
              opacity: phase === 'drop' ? 1 : 0
            }
            return <div className="pin" key={g.id} style={style}><i /></div>
          })}
        </div>

        <div className="ticker">&nbsp;</div>
      </div>
    </>
  )
}
