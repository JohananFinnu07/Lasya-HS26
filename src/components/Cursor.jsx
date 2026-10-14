import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/** Soft gold ring that trails the pointer. Desktop (fine pointer) only. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 140, damping: 22, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHover(!!e.target.closest?.('a, button, [role="button"]'))
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90]" style={{ x: sx, y: sy }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/70"
          animate={{ width: hover ? 56 : 30, height: hover ? 56 : 30, backgroundColor: hover ? 'rgba(176,144,80,0.08)' : 'rgba(176,144,80,0)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
      <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90]" style={{ x, y }}>
        <div className="-translate-x-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-gold" />
      </motion.div>
    </>
  )
}
