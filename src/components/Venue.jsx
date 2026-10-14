import { useState } from 'react'
import { motion } from 'framer-motion'
import { Corner, Sprig } from './Botanicals'
import Reveal from './Reveal'
import Divider from './Divider'
import { venue } from '../data/content'

const btn = 'rounded-full border border-gold bg-ink/30 px-8 py-3.5 font-display text-sm tracking-[0.3em] text-cream backdrop-blur-sm transition-colors duration-700 hover:bg-gold hover:text-ink'

function Pin() {
  return (
    <div className="relative mx-auto h-24 w-24">
      {[0, 0.9, 1.8].map((d) => (
        <span key={d} className="absolute bottom-1 left-1/2 -translate-x-1/2">
          <motion.span
            className="block h-10 w-10 rounded-full border border-gold"
            style={{ scaleY: 0.45 }}
            animate={{ scale: [0.4, 2.6], opacity: [0.8, 0] }}
            transition={{ duration: 2.8, delay: 1 + d, repeat: Infinity, ease: 'easeOut' }}
          />
        </span>
      ))}
      <motion.svg
        viewBox="0 0 24 32"
        className="absolute inset-x-0 top-0 mx-auto h-20 w-16 text-gold"
        fill="rgba(226,169,28,0.18)"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ y: -140, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 70, damping: 11, delay: 0.2 }}
        aria-hidden="true"
      >
        <path d="M12 30C12 30 3 19.5 3 12.5a9 9 0 0 1 18 0C21 19.5 12 30 12 30Z" />
        <circle cx="12" cy="12.5" r="3.2" fill="currentColor" stroke="none" />
      </motion.svg>
    </div>
  )
}

export default function Venue() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${venue.name}, ${venue.lines.join(' ')}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section id="venue" data-tone="olive" className="relative overflow-hidden px-6 py-32 text-center md:py-40">
      <Corner pos="tl" className="w-[46vw] max-w-[320px]" />
      <Corner pos="br" className="w-[50vw] max-w-[340px]" />
      <Sprig seed={51} className="pointer-events-none absolute -right-4 top-[12%] w-28 opacity-80 md:w-44" />

      <div className="relative z-10 mx-auto max-w-xl">
        <Pin />
        <Reveal delay={0.15} className="mt-4">
          <p className="font-display text-base tracking-[0.55em] text-goldsoft">VENUE</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-6">
          <h2 className="font-display text-[clamp(2.2rem,7vw,3.8rem)] leading-tight">{venue.name}</h2>
        </Reveal>
        <Reveal delay={0.45} className="mt-8">
          <Divider className="mb-8" width="w-12" />
          <address className="font-serif text-2xl not-italic leading-relaxed text-cream/90 md:text-3xl">
            {venue.lines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </address>
        </Reveal>
        <Reveal delay={0.6} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={venue.mapsUrl} target="_blank" rel="noopener noreferrer" className={btn}>
            VIEW LOCATION
          </a>
          <button type="button" onClick={copy} className={btn} aria-live="polite">
            {copied ? 'ADDRESS COPIED' : 'COPY ADDRESS'}
          </button>
        </Reveal>
      </div>
    </section>
  )
}
