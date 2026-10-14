import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Sprig } from './Botanicals'
import { found } from '../data/photos'

const N = Math.max(6, found.length)
const photos = Array.from({ length: N }, (_, i) => found[i] || null)
const GLOWS = ['#E2A91C', '#A9BC8A', '#F2CF6B', '#7F9A5A', '#F6F1E4', '#B88A1F']

function Placeholder({ i }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-end overflow-hidden pb-6" style={{ background: 'radial-gradient(ellipse at 50% 30%, #3b5d50, #15231e 75%)' }}>
      <div className="absolute left-1/2 top-[8%] h-[62%] w-[70%] -translate-x-1/2 rounded-t-[999px] border border-gold/70" />
      <Sprig seed={70 + i} len={110} className="absolute -bottom-2 left-1/2 w-[85%] -translate-x-1/2 opacity-90" />
      <span className="relative font-script text-5xl text-cream">Lasya</span>
      <span className="relative mt-1 font-display text-[10px] tracking-[0.4em] text-goldsoft">PHOTOGRAPH {String(i + 1).padStart(2, '0')}</span>
    </div>
  )
}

function Card({ i, src, progress }) {
  const s = (i - 1) / N
  const e = i / N
  const next = (i + 1) / N
  const tilt = (i % 2 ? 1 : -1) * (2 + (i % 3))
  const y = useTransform(progress, [s, e], ['115vh', '0vh'])
  const x = useTransform(progress, [s, e], [i % 2 ? '30vw' : '-30vw', '0vw'])
  const rotate = useTransform(progress, [s, e, next, next + 1 / N], [(i % 2 ? 1 : -1) * 24, tilt, tilt * 1.6, tilt * 2.4])
  const scale = useTransform(progress, [s, e, next, next + 1 / N], [0.8, 1, 0.92, 0.85])
  const opacity = useTransform(progress, [s, s + 0.4 / N, next + 1 / N, next + 1.8 / N], [0, 1, 1, 0])
  const blur = useTransform(progress, [e, next + 0.5 / N], ['blur(0px)', 'blur(5px)'])
  const reveal = useTransform(progress, [s + 0.25 / N, e - 0.05 / N], ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'])
  const zoom = useTransform(progress, [s, e], [1.35, 1])

  return (
    <motion.figure
      className="absolute left-1/2 top-1/2 m-0 -ml-[min(42vw,29svh)] -mt-[min(52.5vw,36svh)]"
      style={{ y, x, rotate, scale, opacity, filter: blur, zIndex: i, willChange: 'transform' }}
    >
      <div className="bg-ivory p-3 pb-4 md:p-4 md:pb-5" style={{ boxShadow: '0 40px 80px -30px rgba(0,0,0,0.9)', width: 'min(84vw, 58svh)', border: '1px solid #E2A91C' }}>
        <div className="relative aspect-[4/5] overflow-hidden bg-forest">
          <motion.div className="absolute inset-0" style={{ clipPath: reveal }}>
            {src ? (
              <motion.img src={src} alt={`Talari Lasya, photograph ${i + 1}`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" style={{ scale: zoom }} />
            ) : (
              <Placeholder i={i} />
            )}
          </motion.div>
        </div>
        <p className="mt-2 text-center font-script text-3xl text-deep md:text-4xl">Lasya</p>
      </div>
    </motion.figure>
  )
}

export default function Gallery() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setIdx(Math.min(N - 1, Math.max(0, Math.round(v * N)))))
  const hint = useTransform(scrollYProgress, [0, 0.06], [1, 0])
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1])
  const glow = useTransform(scrollYProgress, Array.from({ length: N }, (_, i) => i / (N - 1)), Array.from({ length: N }, (_, i) => GLOWS[i % GLOWS.length]))

  if (reduce) {
    return (
      <section id="gallery" data-tone="gallery" className="relative px-5 py-28 text-center">
        <p className="font-script text-6xl text-cream">Lasya</p>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-3">
          {photos.map((src, i) => (
            <div key={i} className="relative aspect-[4/5] overflow-hidden border border-gold bg-forest">
              {src ? <img src={src} alt={`Talari Lasya, photograph ${i + 1}`} loading="lazy" className="h-full w-full object-cover" /> : <Placeholder i={i} />}
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="gallery" data-tone="gallery" ref={ref} className="relative" style={{ height: `${(N + 1) * 100}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl" style={{ backgroundColor: glow }} />

        <div className="absolute inset-x-0 top-20 z-[40] text-center md:top-24">
          <p className="font-script text-5xl leading-none text-cream md:text-6xl">Lasya</p>
        </div>

        {photos.map((src, i) => (
          <Card key={i} i={i} src={src} progress={scrollYProgress} />
        ))}

        <div className="absolute bottom-5 left-0 right-0 z-[40] flex flex-col items-center gap-2 font-display text-sm text-cream/85 md:bottom-7">
          <motion.p style={{ opacity: hint }} className="font-serif text-base italic">Keep scrolling, one photograph at a time</motion.p>
          <p className="tracking-[0.4em]" aria-live="polite">
            {String(idx + 1).padStart(2, '0')} <span className="text-gold">/</span> {String(N).padStart(2, '0')}
          </p>
        </div>

        <div className="absolute bottom-24 right-4 top-32 z-[40] w-px bg-cream/20 md:right-8" aria-hidden="true">
          <motion.div className="h-full w-px origin-top bg-gold" style={{ scaleY: bar }} />
        </div>
      </div>
    </section>
  )
}
