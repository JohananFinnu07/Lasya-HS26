// Pure data builders for natural-looking greenery (no React here).
// Rotation convention: 0deg points up, 90deg points right, 180deg points down.

const rng = (a) => () => {
  a |= 0
  a = (a + 0x6d2b79f5) | 0
  let t = Math.imul(a ^ (a >>> 15), 1 | a)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}
const f = (n) => Math.round(n * 10) / 10
const circle = (x, y, r) => `M${f(x - r)} ${f(y)}a${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0Z`

/* ---------- leaves: slightly asymmetric, with a curved midrib ---------- */
export function leaf(len, wid, bend = 0, shade = 0) {
  const shape = `M0 0 C${f(-wid)} ${f(-len * 0.25)} ${f(-wid * 0.6 + bend * 0.6)} ${f(-len * 0.82)} ${f(bend)} ${f(-len)} C${f(wid * 0.7 + bend * 0.5)} ${f(-len * 0.8)} ${f(wid * 1.05)} ${f(-len * 0.25)} 0 0Z`
  const half = `M0 0 Q${f(bend * 0.15)} ${f(-len * 0.5)} ${f(bend)} ${f(-len)} C${f(wid * 0.7 + bend * 0.5)} ${f(-len * 0.8)} ${f(wid * 1.05)} ${f(-len * 0.25)} 0 0Z`
  const p1 = [bend * 0.15, -len * 0.5]
  const p2 = [bend, -len * 0.95]
  let veins = `M0 0 Q${f(p1[0])} ${f(p1[1])} ${f(p2[0])} ${f(p2[1])}`
  for (let k = 1; k <= 5; k++) {
    const t = 0.16 + k * 0.14
    const x = 2 * (1 - t) * t * p1[0] + t * t * p2[0]
    const y = 2 * (1 - t) * t * p1[1] + t * t * p2[1]
    const w = wid * (0.78 - t * 0.5)
    veins += `M${f(x)} ${f(y)}Q${f(x + w * 0.5)} ${f(y - len * 0.02)} ${f(x + w)} ${f(y - len * 0.11)}`
    veins += `M${f(x)} ${f(y)}Q${f(x - w * 0.5)} ${f(y - len * 0.02)} ${f(x - w * 0.9)} ${f(y - len * 0.1)}`
  }
  return { shape, half, veins, shade }
}

/* ---------- blossom: five soft petals (one merged path) ---------- */
export function blossomPath(rp = 4.4, r = 3.6) {
  let d = ''
  for (let i = 0; i < 5; i++) {
    const a = (i * 72 * Math.PI) / 180
    d += circle(Math.sin(a) * rp, -Math.cos(a) * rp, r)
  }
  return d
}

/* ---------- vine: curved stem, alternate leaves, side twigs, blossoms ---------- */
export function vine(seed = 1, len = 240, bend = 40, depth = 1) {
  const r = rng(seed)
  const P = [[0, 0], [bend * 0.2, -len * 0.33], [bend * 0.95, -len * 0.66], [bend * 0.4, -len]]
  const at = (t) => {
    const u = 1 - t
    return [0, 1].map((k) => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k])
  }
  const ang = (t) => {
    const u = 1 - t
    const d = [0, 1].map((k) => 3 * u * u * (P[1][k] - P[0][k]) + 6 * u * t * (P[2][k] - P[1][k]) + 3 * t * t * (P[3][k] - P[2][k]))
    return (Math.atan2(d[0], -d[1]) * 180) / Math.PI
  }
  const stem = `M0 0 C${f(P[1][0])} ${f(P[1][1])} ${f(P[2][0])} ${f(P[2][1])} ${f(P[3][0])} ${f(P[3][1])}`
  const leaves = []
  const twigs = []
  const blossoms = []
  const n = Math.max(5, Math.round(len / 24))
  for (let i = 1; i <= n; i++) {
    const t = 0.1 + (i / (n + 1)) * 0.88
    const [x, y] = at(t)
    const side = i % 2 ? 1 : -1
    const size = (1.15 - t * 0.62) * (0.9 + r() * 0.3)
    const l = 40 * size + 10
    leaves.push({ x, y, rot: ang(t) + side * (36 + r() * 26), ...leaf(l, l * 0.36, side * l * 0.12 * (r() - 0.2), (r() * 4) | 0) })
  }
  const [tx, ty] = at(1)
  leaves.push({ x: tx, y: ty, rot: ang(1), ...leaf(30, 11, 4, 1) })
  if (depth > 0) {
    ;[0.34, 0.58, 0.78].forEach((t, k) => {
      const [x, y] = at(t)
      const side = k % 2 ? -1 : 1
      const rot = ang(t) + side * (48 + r() * 18)
      const tl = len * (0.3 - t * 0.12)
      twigs.push({ x, y, rot, data: vine(seed * 7 + k + 3, tl, side * tl * 0.25, depth - 1) })
      if (k !== 1) {
        // blossom near the twig tip (position in parent space)
        const a = (rot * Math.PI) / 180
        blossoms.push({ x: x + Math.sin(a) * tl, y: y - Math.cos(a) * tl, s: 0.9 + r() * 0.5 })
      }
    })
  }
  if (depth === 1) blossoms.push({ x: tx, y: ty, s: 1.15 })
  return { stem, leaves, twigs, blossoms }
}

/* ---------- baby's-breath cloud: fine stems, fluffy clusters of tiny flowers ---------- */
export function cloud(seed = 1, len = 140) {
  const r = rng(seed)
  let stems = ''
  let fine = ''
  let flowers = ''
  let buds = ''
  const grow = (x, y, a, l, depth) => {
    const x2 = x + Math.sin(a) * l
    const y2 = y - Math.cos(a) * l
    const bow = (r() - 0.5) * l * 0.45
    const cx = (x + x2) / 2 + Math.cos(a) * bow
    const cy = (y + y2) / 2 + Math.sin(a) * bow
    const seg = `M${f(x)} ${f(y)}Q${f(cx)} ${f(cy)} ${f(x2)} ${f(y2)}`
    if (depth >= 2) stems += seg
    else fine += seg
    if (depth === 0) {
      const k = 4 + ((r() * 3) | 0)
      for (let i = 0; i < k; i++) {
        const fx = x2 + (r() - 0.5) * 17
        const fy = y2 + (r() - 0.5) * 17
        const fr = 1.8 + r() * 2.4
        if (r() < 0.22) buds += circle(fx, fy, fr * 0.55)
        else {
          flowers += circle(fx, fy, fr)
        }
      }
      return
    }
    const n = 2 + (r() < 0.35 ? 1 : 0)
    for (let i = 0; i < n; i++) {
      grow(x2, y2, a + (i - (n - 1) / 2) * 0.62 + (r() - 0.5) * 0.35, l * (0.55 + r() * 0.2), depth - 1)
    }
  }
  for (let i = 0; i < 3; i++) grow(0, 0, (i - 1) * 0.42 + (r() - 0.5) * 0.2, len * (0.8 + r() * 0.25), 2)
  return { stems, fine, flowers, buds }
}

/* ---------- eucalyptus: dusty round leaves on a thin stem ---------- */
export function euca(seed = 1, len = 160) {
  const r = rng(seed)
  const c = [(r() - 0.5) * 60, -len * 0.5]
  const e = [(r() - 0.3) * 50, -len]
  const stem = `M0 0Q${f(c[0])} ${f(c[1])} ${f(e[0])} ${f(e[1])}`
  const leaves = []
  for (let i = 1; i <= 8; i++) {
    const t = i / 9
    const u = 1 - t
    const x = 2 * u * t * c[0] + t * t * e[0]
    const y = 2 * u * t * c[1] + t * t * e[1]
    const side = i % 2 ? 1 : -1
    const s = 1.1 - t * 0.5
    leaves.push({ x, y, rx: (7 + r() * 4) * s, ry: (9 + r() * 4) * s, rot: side * (45 + r() * 25), side })
  }
  return { stem, leaves }
}

/* ---------- how each corner is composed (origin = the corner itself) ---------- */
export const COMPOSITIONS = {
  hang: [
    { t: 'vine', rot: 112, len: 300, bend: -50, seed: 3 },
    { t: 'vine', rot: 160, len: 290, bend: 55, seed: 8 },
    { t: 'euca', rot: 138, len: 170, seed: 4 },
    { t: 'cloud', rot: 132, len: 140, seed: 5 },
    { t: 'cloud', rot: 96, len: 120, seed: 6 },
    { t: 'cloud', rot: 172, len: 115, seed: 12 },
    { t: 'leaf', rot: 108, len: 150, wid: 52, bend: 30, shade: 2 },
    { t: 'leaf', rot: 150, len: 190, wid: 64, bend: -22, shade: 0 },
    { t: 'leaf', rot: 128, len: 170, wid: 58, bend: 26, shade: 1 },
  ],
  rise: [
    { t: 'vine', rot: 20, len: 300, bend: 46, seed: 14 },
    { t: 'vine', rot: 68, len: 270, bend: -40, seed: 19 },
    { t: 'euca', rot: 44, len: 160, seed: 21 },
    { t: 'cloud', rot: 40, len: 140, seed: 23 },
    { t: 'cloud', rot: 78, len: 120, seed: 24 },
    { t: 'cloud', rot: 8, len: 115, seed: 25 },
    { t: 'leaf', rot: 62, len: 150, wid: 52, bend: -28, shade: 2 },
    { t: 'leaf', rot: 14, len: 190, wid: 62, bend: 24, shade: 0 },
    { t: 'leaf', rot: 38, len: 172, wid: 58, bend: -20, shade: 3 },
  ],
}

export const LEAF_FILLS = ['url(#lf1)', 'url(#lf2)', 'url(#lf3)', 'url(#lf4)']
