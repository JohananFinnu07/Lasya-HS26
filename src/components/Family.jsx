import { motion } from 'framer-motion'
import { Bloom, Corner } from './Botanicals'
import Reveal, { ease } from './Reveal'
import Divider from './Divider'
import { hosts, compliments } from '../data/content'

const slide = (dir, delay = 0) => ({
  initial: { opacity: 0, x: dir * 70 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 1.5, delay, ease },
})

export default function Family() {
  return (
    <section id="family" data-tone="forest" className="relative overflow-hidden px-6 pb-28 pt-0 text-center md:pb-36">
      <div className="pointer-events-none mx-auto w-[min(96vw,700px)] rotate-180 opacity-90">
        <Bloom />
      </div>
      <Corner pos="bl" className="w-[44vw] max-w-[300px]" />
      <Corner pos="br" className="w-[44vw] max-w-[300px]" />

      <div className="relative z-10 mx-auto -mt-6 max-w-2xl">
        <Reveal>
          <h2 className="font-serif text-[clamp(2.2rem,6.4vw,3.6rem)] italic text-cream">With Love &amp; Blessings</h2>
        </Reveal>

        <div className="mt-14">
          {hosts.map((h, i) => (
            <div key={h}>
              <motion.p className="font-display text-xl leading-snug md:text-3xl" {...slide(i % 2 ? 1 : -1)}>
                {h}
              </motion.p>
              {i < hosts.length - 1 && <Divider className="my-8" width="w-10" />}
            </div>
          ))}
        </div>

        <Reveal className="mt-20">
          <Divider className="mb-12" width="w-24" />
          <p className="font-serif text-xl italic text-goldsoft md:text-2xl">{compliments.label}</p>
        </Reveal>
        <div className="mt-8 space-y-3">
          {compliments.people.map((p, i) => (
            <motion.p key={p.role} className="font-display text-xl md:text-2xl" {...slide(i % 2 ? 1 : -1, 0.1)}>
              <span className="text-goldsoft">{p.role}:</span> {p.name}
            </motion.p>
          ))}
          <Reveal delay={0.2} className="pt-3">
            <p className="font-serif text-2xl italic text-cream/80">{compliments.closing}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
