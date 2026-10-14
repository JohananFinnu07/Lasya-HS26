import { motion } from 'framer-motion'
import { ease } from './Reveal'

export default function Divider({ className = '', width = 'w-16 md:w-24' }) {
  return (
    <motion.div
      className={`flex items-center justify-center gap-4 ${className}`}
      aria-hidden="true"
      initial={{ opacity: 0, scaleX: 0.4 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.6, ease }}
    >
      <span className={`h-px ${width} bg-gradient-to-r from-transparent to-gold/70`} />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold/80" />
      <span className={`h-px ${width} bg-gradient-to-l from-transparent to-gold/70`} />
    </motion.div>
  )
}
