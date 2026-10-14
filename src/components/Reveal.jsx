import { motion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

/** Slow fade-up when scrolled into view. */
export default function Reveal({
  as = 'div',
  delay = 0,
  y = 28,
  duration = 1.2,
  amount = 0.2,
  className = '',
  children,
  ...rest
}) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: '0px 0px -6% 0px' }}
      transition={{ duration, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Parent that reveals its <Item> children one after another. */
export function Stagger({ children, className = '', delay = 0, gap = 0.35, amount = 0.2 }) {
  return (
    <motion.div
      className={className}
      initial="hide"
      whileInView="show"
      viewport={{ once: true, amount, margin: '0px 0px -6% 0px' }}
      variants={{ hide: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  )
}

export function Item({ children, className = '', y = 24, duration = 1.3 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hide: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration, ease } },
      }}
    >
      {children}
    </motion.div>
  )
}

/** Word-by-word masked text reveal. */
export function TextReveal({ text, as = 'p', className = '', delay = 0, stagger = 0.1 }) {
  const Tag = motion[as] || motion.p
  const words = text.split(' ')
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hide"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ hide: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hide: { y: '110%', opacity: 0, filter: 'blur(10px)' },
                show: { y: '0%', opacity: 1, filter: 'blur(0px)', transition: { duration: 1.5, ease } },
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
