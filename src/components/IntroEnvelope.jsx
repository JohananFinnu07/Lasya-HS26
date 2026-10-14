import { AnimatePresence, motion } from 'framer-motion'
import Cross from './Cross'
import Envelope from './Envelope'
import { Corner } from './Botanicals'

const ease = [0.22, 1, 0.36, 1]

export default function IntroEnvelope({ stage, onOpen, guest }) {
  const opened = stage !== 'closed'

  return (
    <AnimatePresence>
      {stage !== 'open' && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden px-6"
          style={{ background: 'radial-gradient(ellipse at 50% 28%, #25403a 0%, #0b1311 72%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease }}
          role="dialog"
          aria-label="Invitation cover"
        >
          <Corner pos="tl" className="w-[46vw] max-w-[300px]" />
          <Corner pos="tr" className="w-[46vw] max-w-[300px]" />
          <Corner pos="bl" className="w-[50vw] max-w-[340px]" />
          <Corner pos="br" className="w-[50vw] max-w-[340px]" />

          <motion.div
            className="relative z-10 flex flex-col items-center text-center text-cream"
            animate={{ opacity: opened ? 0 : 1, y: opened ? -16 : 0 }}
            transition={{ duration: 1, ease }}
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.2 }}>
              <Cross size={20} className="text-gold" />
            </motion.div>
            <motion.p
              className="mt-4 font-display text-lg tracking-[0.12em] text-cream/90"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, delay: 0.5, ease }}
            >
              Talari’s Half Saree Ceremony
            </motion.p>
            <motion.p
              className="px-4 font-script text-[5.2rem] leading-[1.1] text-white sm:text-[7rem]"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.9, ease }}
            >
              Lasya
            </motion.p>
            <motion.div
              className="flex items-center gap-4 font-display text-lg tracking-[0.1em] text-cream"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.8, delay: 1.3 }}
            >
              <span className="h-px w-10 bg-gold" />
              26/10/2026
              <span className="h-px w-10 bg-gold" />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative z-10 mt-8 w-full"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 1.5, ease }}
          >
            <Envelope open={opened} onToggle={onOpen} label="Open invitation" width="min(78vw, 400px, 57svh)">
              <div className="relative flex h-full flex-col items-center justify-center text-center text-deep">
                <Cross size={11} className="text-goldmuted" />
                <p className="mt-[1.6cqw] font-serif italic" style={{ fontSize: '4.8cqw' }}>
                  Talari’s
                </p>
                <p className="font-script leading-none" style={{ fontSize: '13cqw' }}>
                  Lasya
                </p>
                <p className="font-display tracking-[0.2em]" style={{ fontSize: '3cqw' }}>
                  26/10/2026
                </p>
              </div>
            </Envelope>
          </motion.div>

          {guest && (
            <motion.p
              className="relative z-10 mt-6 font-serif text-lg italic text-goldsoft"
              initial={{ opacity: 0 }}
              animate={{ opacity: opened ? 0 : 1 }}
              transition={{ duration: 1.4, delay: opened ? 0 : 2 }}
            >
              Invitation for {guest}
            </motion.p>
          )}

          <motion.button
            type="button"
            onClick={onOpen}
            disabled={opened}
            className={`group relative z-10 font-display text-[15px] tracking-[0.34em] text-cream ${guest ? 'mt-4' : 'mt-9'}`}
            animate={{ opacity: opened ? 0 : 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1.2, delay: opened ? 0 : 2.1 }}
          >
            <span className="px-1">OPEN INVITATION</span>
            <span className="mx-auto mt-2 block h-px w-full origin-center scale-x-50 bg-gold transition-transform duration-700 group-hover:scale-x-100" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
