import { useEffect, useMemo, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import Cross from './Cross'
import FxCanvas from './FxCanvas'

const ease = [0.22, 1, 0.36, 1]
const RING = 'TALARI LASYA   ◆   HALF SAREE CEREMONY   ◆   26 OCTOBER 2026   ◆   '

function Curtain({ side, x }) {
  const left = side === 'left'
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-y-0 z-30 w-1/2"
      style={{
        x,
        [left ? 'left' : 'right']: 0,
        background:
          'repeating-linear-gradient(90deg, rgba(0,0,0,0.28) 0 2px, rgba(255,255,255,0.05) 2px 20px, transparent 20px 44px), linear-gradient(180deg,#0f3d31,#1f6b55 50%,#0f3d31)',
        boxShadow: left ? '12px 0 40px rgba(0,0,0,0.5)' : '-12px 0 40px rgba(0,0,0,0.5)',
      }}
    >
      <div className={`absolute inset-y-0 w-1 bg-gradient-to-b from-goldsoft via-gold to-goldsoft ${left ? 'right-0' : 'left-0'}`} />
    </motion.div>
  )
}

function MarqueeRow({ reverse, skew, className = '' }) {
  const word = (k) => (
    <div key={k} className="flex shrink-0 items-center gap-10 pr-10">
      {['Thank you', 'Thank you', 'Thank you', 'Thank you'].map((t, i) => (
        <span key={i} className="outline-text whitespace-nowrap font-serif text-[clamp(3.5rem,13vw,8rem)] italic leading-none">
          {t}
        </span>
      ))}
    </div>
  )
  return (
    <motion.div style={{ skewX: skew }} className={`absolute left-0 right-0 overflow-hidden ${className}`} aria-hidden="true">
      <motion.div className="flex w-max" animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }} transition={{ duration: 36, ease: 'linear', repeat: Infinity }}>
        {word(1)}
        {word(2)}
      </motion.div>
    </motion.div>
  )
}

export default function Finale() {
  const ref = useRef(null)
  const stage = useRef(null)
  const fx = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { amount: 0.1 })
  const [revealed, setRevealed] = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const leftX = useTransform(scrollYProgress, [0.05, 0.36], ['0%', '-104%'])
  const rightX = useTransform(scrollYProgress, [0.05, 0.36], ['0%', '104%'])
  const hint = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const zoom = useTransform(scrollYProgress, [0.3, 1], [0.92, 1.04])

  const { scrollY } = useScroll()
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 })
  const skew = useTransform(vel, [-3000, 0, 3000], [14, 0, -14])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v > 0.3 && !revealed) setRevealed(true)
  })
  useEffect(() => {
    if (reduce && inView) setRevealed(true)
  }, [reduce, inView])

  const size = () => {
    const r = stage.current?.getBoundingClientRect()
    return { w: r?.width || window.innerWidth, h: r?.height || window.innerHeight }
  }

  useEffect(() => {
    if (!revealed || reduce) return
    const { w, h } = size()
    fx.current?.rain(90)
    const timers = [
      setTimeout(() => fx.current?.sparks(w * 0.5, h * 0.38, 90), 600),
      setTimeout(() => fx.current?.sparks(w * 0.22, h * 0.3, 60), 1100),
      setTimeout(() => fx.current?.sparks(w * 0.78, h * 0.3, 60), 1500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [revealed, reduce])

  const stars = useMemo(
    () => Array.from({ length: 70 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, s: 1 + Math.random() * 2.4, d: Math.random() * 6, t: 2.5 + Math.random() * 4 })),
    []
  )

  const burstHere = (e) => {
    const r = stage.current.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    fx.current?.sparks(x, y, 55)
    fx.current?.petals(x, y, 16)
  }
  const shower = () => {
    const { w, h } = size()
    fx.current?.rain(100)
    fx.current?.petals(w * 0.2, h * 0.85, 40)
    fx.current?.petals(w * 0.8, h * 0.85, 40)
    fx.current?.sparks(w * 0.5, h * 0.4, 80)
  }

  return (
    <section id="finale" data-tone="night" ref={ref} className="relative" style={{ height: reduce ? '100svh' : '320svh' }}>
      <div ref={stage} onPointerDown={burstHere} className="sticky top-0 h-[100svh] touch-pan-y overflow-hidden text-cream">
        {/* stars */}
        {stars.map((s) => (
          <span
            key={s.id}
            aria-hidden="true"
            className="absolute rounded-full bg-goldsoft"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animation: `twinkle ${s.t}s ease-in-out ${s.d}s infinite` }}
          />
        ))}
        <div className="pointer-events-none absolute left-1/2 top-[44%] h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(169,188,138,0.32), rgba(226,169,28,0.12) 45%, transparent 70%)', animation: 'glowpulse 6s ease-in-out infinite' }} />

        <MarqueeRow skew={skew} className="top-[3%]" />
        <MarqueeRow skew={skew} reverse className="bottom-[3%]" />

        {/* rotating ring of text */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[min(120vw,820px)] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={revealed ? { opacity: 0.8, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 2.4, ease }}
          >
            <motion.svg viewBox="0 0 400 400" animate={{ rotate: 360 }} transition={{ duration: 90, ease: 'linear', repeat: Infinity }}>
              <defs>
                <path id="finale-ring" d="M200 200 m -170 0 a 170 170 0 1 1 340 0 a 170 170 0 1 1 -340 0" />
              </defs>
              <text fill="#F2CF6B" fontSize="14.5" letterSpacing="3.2" style={{ fontFamily: 'Marcellus, serif' }}>
                <textPath href="#finale-ring">{RING}</textPath>
              </text>
            </motion.svg>
          </motion.div>
        </div>

        <FxCanvas ref={fx} className="z-20" />

        {/* content */}
        <motion.div style={{ scale: reduce ? 1 : zoom }} className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 1.6, ease }}
            className="relative"
          >
            <div className="absolute inset-0 -m-8 rounded-full bg-goldsoft/30 blur-2xl" aria-hidden="true" />
            <Cross size={26} className="relative text-goldsoft" />
          </motion.div>

          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.6, delay: 0.4, ease }}
          >
            <p className="font-serif text-xl italic text-sage md:text-3xl">With Love,</p>
            <p className="font-display text-2xl md:text-3xl">Talari Family</p>
          </motion.div>

          <p className="sr-only">Talari Lasya</p>
          <div className="mt-1 flex" aria-hidden="true">
            {'Lasya'.split('').map((ch, i) => (
              <motion.span
                key={i}
                className="foil inline-block px-[0.02em] font-script text-[clamp(6.5rem,30vw,15rem)] leading-[1.05]"
                initial={{ opacity: 0, y: 110, rotate: i % 2 ? 14 : -14, scale: 0.5, filter: 'blur(14px)' }}
                animate={revealed ? { opacity: 1, y: 0, rotate: 0, scale: 1, filter: 'blur(0px)' } : {}}
                transition={{ type: 'spring', stiffness: 70, damping: 13, delay: 0.9 + i * 0.16 }}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.8, delay: 2.2, ease }}
          >
            <p className="font-display text-base tracking-[0.34em] text-goldsoft md:text-xl">26 OCTOBER 2026</p>
            <p className="mx-auto mt-5 max-w-sm font-display text-lg leading-relaxed text-cream/90 md:text-xl">
              We look forward to celebrating this beautiful day with you and your blessings.
            </p>
            <p className="mt-5 font-serif text-lg italic text-sage md:text-xl">Thank you for being part of our celebration.</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                shower()
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="mt-7 rounded-full border border-goldsoft/70 bg-white/5 px-8 py-3.5 font-display text-sm tracking-[0.32em] text-cream backdrop-blur-sm transition-colors duration-700 hover:bg-goldsoft hover:text-ink"
            >
              SHOWER BLESSINGS
            </button>
          </motion.div>
        </motion.div>

        {/* curtains */}
        {!reduce && (
          <>
            <Curtain side="left" x={leftX} />
            <Curtain side="right" x={rightX} />
            <div className="absolute inset-x-0 top-0 z-40 h-2 bg-gradient-to-r from-gold via-goldsoft to-gold" aria-hidden="true" />
            <motion.p
              style={{ opacity: hint }}
              className="pointer-events-none absolute inset-x-0 top-1/2 z-40 -translate-y-1/2 text-center font-serif text-2xl italic text-cream"
              aria-hidden="true"
            >
              One last blessing…
            </motion.p>
          </>
        )}
      </div>
    </section>
  )
}
