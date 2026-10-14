import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Corner } from './Botanicals'
import Reveal from './Reveal'
import { downloadIcs, googleCalendarUrl } from '../utils/calendar'

const TARGET = new Date('2026-10-26T09:30:00+05:30').getTime()
const END = new Date('2026-10-26T14:30:00+05:30').getTime()
const btn = 'rounded-full border border-gold bg-ink/30 px-8 py-3.5 font-display text-sm tracking-[0.3em] text-cream backdrop-blur-sm transition-colors duration-700 hover:bg-gold hover:text-ink'

function Ring({ value, max, label, color }) {
  const r = 52
  const c = 2 * Math.PI * r
  const frac = Math.max(0, Math.min(1, value / max))
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[clamp(5.2rem,21vw,8.5rem)] w-[clamp(5.2rem,21vw,8.5rem)]">
        <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r={r} fill="rgba(0,0,0,0.28)" stroke="rgba(246,241,228,0.12)" strokeWidth="4" />
          <motion.circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={c}
            animate={{ strokeDashoffset: c * (1 - frac) }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden font-display text-[clamp(1.7rem,7vw,2.8rem)] text-cream">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={value} initial={{ y: '-70%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '70%', opacity: 0 }} transition={{ duration: 0.5 }}>
              {String(value).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-3 font-display text-xs tracking-[0.4em] text-goldsoft md:text-sm">{label}</p>
    </div>
  )
}

export default function Countdown() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const diff = Math.max(0, TARGET - now)
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  const live = now >= TARGET && now <= END
  const over = now > END

  return (
    <section id="countdown" data-tone="pine" className="relative overflow-hidden px-6 py-28 text-center md:py-40">
      <Corner pos="tr" className="w-[42vw] max-w-[290px]" />
      <Corner pos="bl" className="w-[46vw] max-w-[320px]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal>
          <h2 className="font-serif text-[clamp(2rem,6vw,3.4rem)] italic text-cream">
            {over ? 'Thank you for celebrating with us' : live ? 'The celebration is happening now' : 'Counting down to the celebration'}
          </h2>
        </Reveal>

        {!over && !live && (
          <Reveal delay={0.2} className="mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <Ring value={d} max={90} label="DAYS" color="#E2A91C" />
            <Ring value={h} max={24} label="HOURS" color="#A9BC8A" />
            <Ring value={m} max={60} label="MINUTES" color="#F2CF6B" />
            <Ring value={s} max={60} label="SECONDS" color="#F6F1E4" />
          </Reveal>
        )}

        <Reveal delay={0.3} className="mt-16">
          <p className="font-serif text-xl italic text-cream/80">Save the date</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer" className={btn}>
              GOOGLE CALENDAR
            </a>
            <button type="button" onClick={downloadIcs} className={btn}>
              APPLE / OUTLOOK
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
