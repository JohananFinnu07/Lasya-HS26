import { motion } from 'framer-motion'
import { Corner, Wreath } from './Botanicals'
import Reveal, { ease } from './Reveal'
import Divider from './Divider'
import { event } from '../data/content'

export default function EventDetails() {
  return (
    <section id="details" data-tone="teal" className="relative overflow-hidden px-6 py-32 text-center md:py-44">
      <Corner pos="tl" className="w-[44vw] max-w-[300px]" />
      <Corner pos="br" className="w-[48vw] max-w-[330px]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="pointer-events-none absolute left-1/2 top-[34%] w-[130%] max-w-[780px] -translate-x-1/2 -translate-y-1/2 opacity-60" aria-hidden="true">
          <Wreath />
        </div>

        <div className="relative">
          <motion.p
            className="font-display text-lg text-goldsoft md:text-xl"
            initial={{ opacity: 0, letterSpacing: '1.2em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.6em' }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, ease }}
          >
            MONDAY
          </motion.p>

          <div className="overflow-hidden">
            <motion.p
              className="foil font-display text-[clamp(8rem,34vw,17rem)] leading-[1]"
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease, delay: 0.2 }}
            >
              {event.day}
            </motion.p>
          </div>

          <Reveal delay={0.5} className="mt-2">
            <div className="flex items-center justify-center gap-5 md:gap-8">
              <span className="h-px w-10 bg-gold md:w-24" />
              <div className="font-display text-lg tracking-[0.55em] md:text-2xl">
                <p>OCTOBER</p>
                <p className="mt-2">{event.year}</p>
              </div>
              <span className="h-px w-10 bg-gold md:w-24" />
            </div>
          </Reveal>

          <Reveal delay={0.7} className="mt-12">
            <p className="font-display text-4xl tracking-[0.2em] text-goldsoft md:text-5xl">{event.time}</p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative mt-16">
          <Divider className="mb-10" />
          <p className="mx-auto max-w-md font-serif text-2xl italic leading-snug text-cream md:text-3xl">{event.tagline}</p>
          <div className="mt-12">
            <p className="font-display text-base tracking-[0.5em] text-goldsoft">LUNCH</p>
            <p className="mt-2 font-display text-2xl md:text-3xl">{event.lunch}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
