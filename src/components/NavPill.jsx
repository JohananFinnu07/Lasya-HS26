import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks } from '../data/content'

/** Gold-edged pill with a dropdown of sections, like the reference design. */
export default function NavPill({ visible }) {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const box = useRef(null)

  useEffect(() => {
    if (!visible) return
    const els = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [visible])

  useEffect(() => {
    if (!open) return
    const away = (e) => !box.current?.contains(e.target) && setOpen(false)
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', away)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', away)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  return (
    // The outer wrapper does the centring, so the entrance animation below can never knock it off-centre.
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.div
        ref={box}
        className="w-full max-w-[320px]"
        initial={{ opacity: 0, y: -16 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 1.4, delay: visible ? 1.2 : 0, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: visible ? 'auto' : 'none' }}
      >
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-3 rounded-full border border-gold bg-ink/55 px-5 py-3 font-display text-[1.05rem] text-cream shadow-[0_0_22px_rgba(226,169,28,0.25)] backdrop-blur-md"
        >
          <span className="flex-1 text-center">Half Saree Ceremony</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.5 }} className="text-[12px] text-gold" aria-hidden="true">
            ▼
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              className="mt-2 overflow-hidden rounded-3xl border border-gold/60 bg-ink/92 py-2 backdrop-blur-xl"
              initial={{ opacity: 0, y: -8, scaleY: 0.92 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.92 }}
              style={{ transformOrigin: 'top' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {navLinks.map((l) => (
                <li key={l.id} role="option" aria-selected={active === l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between px-6 py-3 font-display text-lg transition-colors duration-500 ${active === l.id ? 'text-goldsoft' : 'text-cream/85 hover:text-goldsoft'}`}
                  >
                    {l.label}
                    {active === l.id && <span className="h-1.5 w-1.5 rotate-45 bg-gold" />}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
