import { useEffect, useRef } from 'react'

/** Very soft drifting gold particles on a canvas. */
export default function GoldDust({ active }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w = 0
    let h = 0
    let raf
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const count = w < 640 ? 26 : 46
    const parts = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.7,
      vy: 0.08 + Math.random() * 0.22,
      sway: Math.random() * Math.PI * 2,
      speed: 0.002 + Math.random() * 0.004,
      a: 0.25 + Math.random() * 0.5,
    }))

    const tick = (time) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        p.y -= p.vy
        p.x += Math.sin(time * p.speed + p.sway) * 0.16
        if (p.y < -10) {
          p.y = h + 10
          p.x = Math.random() * w
        }
        const pulse = 0.55 + 0.45 * Math.sin(time * 0.0012 + p.sway)
        const alpha = p.a * pulse
        ctx.beginPath()
        ctx.fillStyle = `rgba(203,170,100,${alpha * 0.18})`
        ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.fillStyle = `rgba(214,184,116,${alpha})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [active])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[65] h-full w-full transition-opacity duration-[3000ms]"
      style={{ opacity: active ? 1 : 0 }}
    />
  )
}
