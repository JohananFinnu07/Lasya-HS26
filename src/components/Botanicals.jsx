import { memo } from 'react'
import { motion } from 'framer-motion'
import { COMPOSITIONS, LEAF_FILLS, blossomPath, cloud, euca, leaf, vine } from './botanicalData'

/* Natural-looking greenery: veined leaves, flowering vines, eucalyptus and baby's-breath. */

/** Gradients used by every botanical. Rendered once in App. */
export function BotanicalDefs() {
  const grads = [
    ['lf1', '#3f5a32', '#6f8f4f', '#a5bf78'],
    ['lf2', '#35502d', '#5b7c42', '#8fae67'],
    ['lf3', '#55713f', '#86a35f', '#bcd08c'],
    ['lf4', '#2d4528', '#4a6a39', '#7d9c58'],
  ]
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {grads.map(([id, a, b, c]) => (
          <linearGradient key={id} id={id} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor={a} />
            <stop offset="0.55" stopColor={b} />
            <stop offset="1" stopColor={c} />
          </linearGradient>
        ))}
        <linearGradient id="eu" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b4c9b0" />
          <stop offset="1" stopColor="#7f9c86" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const cache = new Map()
const memoData = (key, fn) => {
  if (!cache.has(key)) cache.set(key, fn())
  return cache.get(key)
}

function Leaf({ l, x = 0, y = 0, rot = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d={l.shape} fill={LEAF_FILLS[l.shade]} stroke="#223a20" strokeOpacity="0.35" strokeWidth="0.7" />
      <path d={l.half} fill="#06130a" fillOpacity="0.16" />
      <path d={l.veins} stroke="#fff" strokeOpacity="0.3" strokeWidth="0.7" fill="none" />
    </g>
  )
}

function Blossom({ b }) {
  return (
    <g transform={`translate(${b.x} ${b.y}) scale(${b.s})`}>
      <path d={blossomPath()} fill="#FFFDF5" stroke="#d9cfae" strokeWidth="0.5" />
      <circle r="2.2" fill="#E2B94A" />
    </g>
  )
}

function VineR({ v }) {
  return (
    <>
      <path d={v.stem} stroke="#4f6b3d" strokeWidth="2" fill="none" strokeLinecap="round" />
      {v.twigs.map((t, i) => (
        <g key={i} transform={`translate(${t.x} ${t.y}) rotate(${t.rot})`}>
          <VineR v={t.data} />
        </g>
      ))}
      {v.leaves.map((l, i) => (
        <Leaf key={i} l={l} x={l.x} y={l.y} rot={l.rot} />
      ))}
      {v.blossoms.map((b, i) => (
        <Blossom key={i} b={b} />
      ))}
    </>
  )
}

function Cloud({ seed, len }) {
  const c = memoData(`cloud${seed}-${len}`, () => cloud(seed, len))
  return (
    <>
      <path d={c.stems} stroke="#6f8a52" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d={c.fine} stroke="#8fa66b" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <path d={c.buds} fill="#c9d6a4" />
      <path d={c.flowers} fill="#FFFDF5" />
    </>
  )
}

function Euca({ seed, len }) {
  const e = memoData(`eu${seed}-${len}`, () => euca(seed, len))
  return (
    <>
      <path d={e.stem} stroke="#6f8a74" strokeWidth="1.2" fill="none" />
      {e.leaves.map((l, i) => (
        <ellipse
          key={i}
          cx={l.x}
          cy={l.y}
          rx={l.rx}
          ry={l.ry}
          fill="url(#eu)"
          fillOpacity="0.9"
          stroke="#5f7a66"
          strokeOpacity="0.5"
          strokeWidth="0.6"
          transform={`rotate(${l.rot} ${l.x} ${l.y}) translate(${l.side * l.rx * 0.9} 0)`}
        />
      ))}
    </>
  )
}

function Piece({ it, off }) {
  return (
    <g transform={`rotate(${it.rot})`}>
      {it.t === 'vine' && <VineR v={memoData(`vine${it.seed + off}-${it.len}`, () => vine(it.seed + off, it.len, it.bend, 1))} />}
      {it.t === 'leaf' && <Leaf l={memoData(`leaf${it.len}-${it.wid}-${it.bend}-${it.shade}`, () => leaf(it.len, it.wid, it.bend, it.shade))} />}
      {it.t === 'cloud' && <Cloud seed={it.seed + off} len={it.len} />}
      {it.t === 'euca' && <Euca seed={it.seed + off} len={it.len} />}
    </g>
  )
}

/** Greenery tucked into a corner. pos: 'tl' | 'tr' | 'bl' | 'br'. variant changes the plant shapes. */
export const Corner = memo(function Corner({ pos = 'tl', className = 'w-[60vw] max-w-[400px]', sway = true, variant = 0 }) {
  const top = pos[0] === 't'
  const flip = pos[1] === 'r'
  const comp = COMPOSITIONS[top ? 'hang' : 'rise']
  const off = variant * 100
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute z-[2] ${top ? '-top-3' : '-bottom-3'} ${flip ? '-right-3' : '-left-3'} ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2.4 }}
    >
      <div className={flip ? '-scale-x-100' : ''}>
        <motion.svg
          viewBox={top ? '-20 -20 420 420' : '-20 -400 420 420'}
          className="block w-full overflow-visible"
          style={{ transformOrigin: top ? '5% 5%' : '5% 95%' }}
          animate={sway ? { rotate: [0, 1.4, 0] } : undefined}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          {comp.map((it, i) => (
            <Piece key={i} it={it} off={off} />
          ))}
        </motion.svg>
      </div>
    </motion.div>
  )
})

/** A single standalone sprig of baby's-breath with a few leaves, growing upward. */
export const Sprig = memo(function Sprig({ seed = 3, len = 150, className = 'w-40', style }) {
  const l1 = memoData('sprigleaf1', () => leaf(46, 16, 6, 0))
  const l2 = memoData('sprigleaf2', () => leaf(40, 14, -6, 3))
  return (
    <svg viewBox="-170 -190 340 200" className={className} style={style} aria-hidden="true">
      <Cloud seed={seed} len={len} />
      <Leaf l={l1} rot={-48} />
      <Leaf l={l2} rot={52} />
    </svg>
  )
})

/** A low bank of baby's-breath and leaves along an edge (rotate-180 to hang from the top). Fades at its roots. */
export const Bloom = memo(function Bloom({ className = 'w-full' }) {
  const spots = [
    [70, -8, 1.0, 21],
    [180, 10, 0.85, 22],
    [300, -4, 1.1, 23],
    [420, 8, 0.9, 24],
    [530, -10, 1.0, 25],
  ]
  const a = memoData('bloomleaf1', () => leaf(60, 20, 8, 1))
  const b = memoData('bloomleaf2', () => leaf(52, 18, -8, 3))
  const mask = 'linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)'
  return (
    <motion.svg
      viewBox="0 -10 600 170"
      className={className}
      style={{ WebkitMaskImage: mask, maskImage: mask }}
      aria-hidden="true"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    >
      {spots.map(([x, rot, s, seed]) => (
        <g key={seed} transform={`translate(${x} 165) rotate(${rot}) scale(${s})`}>
          <Cloud seed={seed} len={92} />
          <Leaf l={a} rot={-42} />
          <Leaf l={b} rot={44} />
        </g>
      ))}
    </motion.svg>
  )
})

/** Ring of leaves and blossoms, slowly turning. Used behind the date. */
export const Wreath = memo(function Wreath({ className = '', spin = true }) {
  const n = 22
  const leaves = [0, 1, 2, 3].map((k) => memoData(`wl${k}`, () => leaf(86 + k * 6, 24, k % 2 ? 8 : -8, k)))
  return (
    <motion.svg
      viewBox="-260 -260 520 520"
      className={className}
      aria-hidden="true"
      animate={spin ? { rotate: 360 } : undefined}
      transition={{ duration: 160, repeat: Infinity, ease: 'linear' }}
    >
      <circle r="150" fill="none" stroke="#e2a91c" strokeOpacity="0.4" strokeWidth="0.8" />
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`rotate(${(i * 360) / n}) translate(0 -150)`}>
          <Leaf l={leaves[i % 4]} rot={i % 2 ? 26 : -26} />
          {i % 3 === 0 && <Blossom b={{ x: i % 2 ? -16 : 16, y: -8, s: 1.1 }} />}
        </g>
      ))}
    </motion.svg>
  )
})
