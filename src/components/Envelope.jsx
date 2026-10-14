import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Cross from './Cross'

const slide = [0.22, 1, 0.36, 1]

/**
 * Envelope with an opening flap and a card that slides upward.
 * Children are rendered on the card. Sizes inside use cqw units
 * (relative to the envelope width) so the card text scales with it.
 */
export default function Envelope({ open, onToggle, children, label, className = '', width = 'min(86vw, 460px)' }) {
  const [flapBehind, setFlapBehind] = useState(false)

  useEffect(() => {
    if (!open) {
      setFlapBehind(false)
      return
    }
    const t = setTimeout(() => setFlapBehind(true), 650)
    return () => clearTimeout(t)
  }, [open])

  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle?.()
    }
  }

  return (
    <div className={className} style={{ perspective: 1500 }}>
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        aria-pressed={open}
        onClick={onToggle}
        onKeyDown={onKey}
        className={`relative mx-auto cursor-pointer select-none transition-transform duration-700 ease-out ${open ? '' : 'hover:-translate-y-1'}`}
        style={{ width, aspectRatio: '3 / 2', containerType: 'inline-size' }}
      >
        {/* back */}
        <div
          className="absolute inset-0 rounded-[2px]"
          style={{
            background: 'linear-gradient(160deg,#E6DDC2,#D4C8A3)',
            boxShadow: '0 30px 60px -28px rgba(0,0,0,0.65)',
          }}
        />

        {/* card */}
        <motion.div
          className="absolute z-10 overflow-hidden bg-cream"
          style={{
            left: '5%',
            right: '5%',
            top: '6%',
            height: '88%',
            boxShadow: '0 1px 0 rgba(176,144,80,0.35) inset, 0 12px 30px -16px rgba(58,40,29,0.35)',
            border: '1px solid rgba(176,144,80,0.35)',
          }}
          animate={{ y: open ? '-70%' : '0%' }}
          transition={{ duration: 1.5, delay: open ? 0.55 : 0, ease: slide }}
        >
          <div className="pointer-events-none absolute inset-[2.2cqw] border border-gold/30" />
          {children}
        </motion.div>

        {/* front pocket */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            clipPath: 'polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)',
            background: 'linear-gradient(160deg,#F8F2E2,#E7DCBF)',
          }}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M0 0L150 112L300 0M0 200L150 112L300 200"
              fill="none"
              stroke="#E2A91C"
              strokeOpacity="0.35"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* flap */}
        <motion.div
          className="absolute inset-x-0 top-0"
          style={{ height: '56%', transformOrigin: 'top', transformStyle: 'preserve-3d', zIndex: flapBehind ? 5 : 30 }}
          animate={{ rotateX: open ? 180 : 0 }}
          transition={{ duration: 1.1, ease: slide }}
        >
          <div
            className="absolute inset-0"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background: 'linear-gradient(180deg,#FCF8EE,#EFE6CF)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background: 'linear-gradient(0deg,#CBBD96,#BCAC82)',
              transform: 'rotateX(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          />
        </motion.div>

        {/* seal */}
        <div className="pointer-events-none absolute left-1/2 top-[56%] z-40 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="flex items-center justify-center rounded-full text-ink"
            style={{
              width: '11cqw',
              height: '11cqw',
              background: 'radial-gradient(circle at 35% 30%,#F7DC85,#B88A1F)',
              boxShadow: '0 6px 14px -6px rgba(58,40,29,0.5)',
            }}
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.6 }}
          >
            <Cross size={14} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
