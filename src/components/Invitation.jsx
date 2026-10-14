import { motion } from 'framer-motion'
import { Corner, Sprig } from './Botanicals'
import Divider from './Divider'
import { Stagger, Item, ease } from './Reveal'
import { invitation, event } from '../data/content'

export default function Invitation() {
  return (
    <section id="invitation" data-tone="moss" className="relative overflow-hidden px-5 py-28 md:py-40" style={{ perspective: 1800 }}>
      <Corner pos="tr" className="w-[50vw] max-w-[360px]" />
      <Corner pos="bl" className="w-[54vw] max-w-[380px]" />
      <Sprig seed={41} className="pointer-events-none absolute -left-4 top-[12%] w-28 opacity-80 md:w-44" />

      <motion.div
        className="relative z-10 mx-auto max-w-2xl bg-ivory px-6 py-16 text-center text-deep md:px-16 md:py-24"
        style={{ transformOrigin: 'top center', boxShadow: '0 50px 90px -40px rgba(0,0,0,0.8)', border: '1px solid rgba(226,169,28,0.7)' }}
        initial={{ opacity: 0, rotateX: -22, y: 40 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.9, ease }}
      >
        <div className="pointer-events-none absolute inset-3 border border-gold/50 md:inset-4" />
        <Stagger gap={0.45} delay={0.5} amount={0.1}>
          <Item>
            <p className="font-serif text-2xl italic text-goldmuted md:text-3xl">Talari’s</p>
            <h2 className="mt-1 font-display text-[clamp(1.7rem,5vw,2.6rem)] leading-tight">Half Saree Ceremony Invitation</h2>
          </Item>
          <Item className="mt-8">
            <Divider />
          </Item>
          <Item className="mt-10">
            <p className="font-serif text-lg italic text-deep/70 md:text-xl">{invitation.blessingsLabel}</p>
            <p className="mt-2 font-display text-xl md:text-2xl">{invitation.blessingsFrom}</p>
          </Item>
          <Item className="mt-10">
            <p className="mx-auto max-w-md font-serif text-xl leading-relaxed text-deep/85 md:text-2xl">{invitation.message}</p>
          </Item>
          <Item className="mt-14">
            <p className="font-script text-[clamp(3rem,10vw,4.6rem)] leading-tight">{event.celebrant}’s</p>
            <p className="mt-2 font-display text-lg tracking-[0.34em] text-goldmuted md:text-2xl">HALF SAREE CEREMONY</p>
          </Item>
        </Stagger>
      </motion.div>
    </section>
  )
}
