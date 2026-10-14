import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Cross from './Cross'
import { Bloom, Corner } from './Botanicals'
import { found } from '../data/photos'
import { ease } from './Reveal'

const cover = found[0]

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yPhoto = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const scalePhoto = useTransform(scrollYProgress, [0, 1], [1.02, 1.18])
  const yText = useTransform(scrollYProgress, [0, 1], [0, -110])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section id="home" data-tone="ink" ref={ref} className="relative h-[100svh] min-h-[560px] overflow-hidden text-cream">
      {/* full-bleed cover photo (or an elegant stand-in until a photo is added) */}
      <motion.div className="absolute inset-0" style={{ y: yPhoto, scale: scalePhoto }}>
        {cover ? (
          <img src={cover} alt="Talari Lasya" fetchpriority="high" className="h-full w-full object-cover object-top" />
        ) : (
          <div
            className="flex h-full w-full items-start justify-center pt-[24svh]"
            style={{ background: 'radial-gradient(ellipse at 50% 30%, #35574b 0%, #16241f 60%, #0b1311 100%)' }}
          >
            <span className="font-script text-[clamp(14rem,60vw,34rem)] leading-none text-cream/[0.06]" aria-hidden="true">
              L
            </span>
          </div>
        )}
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(14,23,21,0.55) 0%, rgba(14,23,21,0) 24%, rgba(14,23,21,0) 42%, rgba(14,23,21,0.88) 80%, #0e1715 100%)',
        }}
      />

      {/* gold rounded frame that fades away toward the bottom */}
      <div className="absolute left-1/2 top-[13svh] z-[3] w-[min(84vw,540px)] -translate-x-1/2">
        <motion.div
          className="h-[56svh] rounded-t-[2.6rem] rounded-b-2xl border border-gold"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom,#000 62%,transparent 96%)', maskImage: 'linear-gradient(to bottom,#000 62%,transparent 96%)' }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 2, delay: ready ? 0.2 : 0, ease }}
        />
      </div>

      <Corner pos="tl" className="w-[62vw] max-w-[420px]" />
      <Corner pos="tr" className="w-[62vw] max-w-[420px]" variant={1} />
      <Corner pos="bl" className="w-[50vw] max-w-[360px]" />
      <Corner pos="br" className="w-[50vw] max-w-[360px]" variant={1} />
      <div className="pointer-events-none absolute -bottom-4 left-1/2 z-[2] w-[min(70vw,460px)] -translate-x-1/2">
        <Bloom />
      </div>

      <motion.div style={{ y: yText, opacity: fade }} className="absolute inset-x-0 bottom-[9svh] z-[5] flex flex-col items-center px-4 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 1.6, delay: ready ? 0.6 : 0 }}>
          <Cross size={18} className="mx-auto text-gold" />
        </motion.div>
        <motion.p
          className="mt-3 font-display text-lg tracking-[0.06em] text-cream md:text-xl"
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 1.6, delay: ready ? 0.9 : 0, ease }}
        >
          Talari’s Half Saree Ceremony
        </motion.p>

        <h1 className="sr-only">Talari Lasya’s Half Saree Ceremony</h1>
        <motion.p
          aria-hidden="true"
          className="px-6 font-script text-[clamp(4.4rem,21vw,9.5rem)] leading-[0.98] text-white"
          style={{ textShadow: '0 6px 28px rgba(0,0,0,0.55)' }}
          initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
          animate={ready ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : { clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
          transition={{ duration: 2.6, delay: ready ? 1.2 : 0, ease }}
        >
          Talari Lasya
        </motion.p>

        <motion.div
          className="mt-1 flex w-full max-w-[520px] items-center justify-center gap-4 font-display text-xl tracking-[0.1em] md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1.8, delay: ready ? 2.6 : 0 }}
        >
          <span className="h-px flex-1 bg-gold" />
          26/10/2026
          <span className="h-px flex-1 bg-gold" />
        </motion.div>
        <motion.p
          className="mt-3 font-display text-sm tracking-[0.35em] text-goldsoft"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1.8, delay: ready ? 2.9 : 0 }}
        >
          9:30 AM
        </motion.p>
        <motion.a
          href="#blessing"
          aria-label="Scroll to explore"
          className="mt-3 text-gold"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1.6, delay: ready ? 3.4 : 0 }}
        >
          <motion.span className="block" aria-hidden="true" animate={{ y: [0, 6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            ↓
          </motion.span>
        </motion.a>
      </motion.div>

    </section>
  )
}
