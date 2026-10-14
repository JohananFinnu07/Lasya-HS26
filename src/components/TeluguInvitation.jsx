import { motion } from 'framer-motion'
import Cross from './Cross'
import { Corner, Sprig } from './Botanicals'
import { ease } from './Reveal'
import { teluguInvitation } from '../data/telugu'

const styles = {
  heading: 'text-[clamp(1.6rem,5.2vw,2.4rem)] font-medium leading-[1.8] mt-2',
  name: 'text-[clamp(1.9rem,6vw,2.9rem)] font-semibold leading-[1.7] mt-3',
  body: 'text-[clamp(1.1rem,3.6vw,1.45rem)] leading-[2] text-deep/80',
  detail: 'text-[clamp(1.15rem,3.8vw,1.55rem)] font-medium leading-[2]',
  small: 'text-[clamp(1rem,3.2vw,1.2rem)] leading-[1.9] text-deep/80',
}

export default function TeluguInvitation() {
  const { lines } = teluguInvitation
  const hasContent = lines.length > 0

  return (
    <section
      id="telugu"
      data-tone="moss"
      className="relative overflow-hidden px-5 py-28 md:py-40"
      style={{ perspective: 2200 }}
    >
      <Corner pos="tr" className="w-[42vw] max-w-[290px]" />
      <Corner pos="bl" className="w-[46vw] max-w-[320px]" />
      <Sprig seed={61} className="pointer-events-none absolute -left-4 top-[10%] w-28 opacity-80 md:w-44" />

      <motion.div
        className="relative z-10 mx-auto max-w-xl bg-ivory px-6 py-16 text-center text-deep md:px-14 md:py-20"
        style={{
          transformOrigin: 'left center',
          boxShadow: '0 40px 80px -40px rgba(0,0,0,0.8)',
          border: '1px solid rgba(226,169,28,0.7)',
        }}
        initial={{ opacity: 0, rotateY: -28, x: -30 }}
        whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 2, ease }}
      >
        <div className="pointer-events-none absolute inset-3 border border-gold/50 md:inset-4" />
        <Cross size={20} className="mx-auto text-goldmuted" />

        {hasContent ? (
          <div lang="te" className="mt-8 font-telugu">
            {lines.map((line, i) => {
              if (line.style === 'gap') return <div key={i} className="h-6" aria-hidden="true" />
              return (
                <motion.p
                  key={i}
                  className={styles[line.style] || styles.body}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1.3, ease }}
                >
                  {line.text}
                </motion.p>
              )
            })}
          </div>
        ) : (
          <div className="mt-8 font-display text-deep/80">
            <p className="text-2xl italic">Telugu invitation</p>
            <p className="mx-auto mt-4 max-w-xs text-base leading-relaxed text-deep/80">
              Add the exact text from the printed Telugu card in <code className="text-sm">src/data/telugu.js</code>{' '}
              and it will appear here.
            </p>
          </div>
        )}
      </motion.div>
    </section>
  )
}
