import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

const PETALS = ['#FFFDF5', '#F6F1E4', '#DDE6A8', '#A9BC8A', '#F2CF6B', '#FFFFFF', '#CFE0B0', '#F7E7B0']
const GOLDS = ['#F7DC85', '#E2A91C', '#FFF1BD', '#C99A2E']
const rand = (a, b) => a + Math.random() * (b - a)

/** Petal showers and gold sparks. Call ref.petals / ref.sparks / ref.rain. Only animates while particles exist. */
const FxCanvas = forwardRef(function FxCanvas({ className = '' }, ref) {
  const canvas = useRef(null)
  const parts = useRef([])
  const raf = useRef(0)
  const dims = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const c = canvas.current
    const resize = () => {
      const r = c.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      dims.current = { w: r.width, h: r.height }
      c.width = r.width * dpr
      c.height = r.height * dpr
      c.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const loop = () => {
    const ctx = canvas.current?.getContext('2d')
    if (!ctx) return
    const { w, h } = dims.current
    ctx.clearRect(0, 0, w, h)
    parts.current = parts.current.filter((p) => p.life > 0 && p.y < h + 40)
    for (const p of parts.current) {
      p.life -= 1
      if (p.kind === 'petal') {
        p.vy = Math.min(p.vy + 0.035, 2.4)
        p.vx *= 0.992
        p.x += p.vx + Math.sin(p.life * 0.05 + p.sway) * 0.5
        p.y += p.vy
        p.rot += p.vr
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = Math.min(1, p.life / 40) * 0.92
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.ellipse(0, 0, p.w, p.h * (0.55 + 0.45 * Math.abs(Math.sin(p.life * 0.06 + p.sway))), 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      } else {
        p.vy += 0.05
        p.vx *= 0.986
        p.vy *= 0.986
        const px = p.x
        const py = p.y
        p.x += p.vx
        p.y += p.vy
        ctx.globalAlpha = Math.max(0, p.life / 70)
        ctx.strokeStyle = p.color
        ctx.lineWidth = p.r
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }
    }
    ctx.globalAlpha = 1
    raf.current = parts.current.length ? requestAnimationFrame(loop) : 0
  }
  const kick = () => {
    if (!raf.current) raf.current = requestAnimationFrame(loop)
  }

  useImperativeHandle(ref, () => ({
    petals(x, y, n = 40) {
      for (let i = 0; i < n; i++) {
        const a = rand(-Math.PI, 0)
        const s = rand(1, 6)
        parts.current.push({ kind: 'petal', x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, rot: rand(0, 6), vr: rand(-0.06, 0.06), w: rand(5, 11), h: rand(8, 15), color: PETALS[(Math.random() * PETALS.length) | 0], sway: rand(0, 6), life: rand(200, 360) })
      }
      kick()
    },
    rain(n = 80) {
      const { w } = dims.current
      for (let i = 0; i < n; i++) {
        parts.current.push({ kind: 'petal', x: rand(0, w), y: rand(-300, -10), vx: rand(-0.4, 0.4), vy: rand(0.4, 1.4), rot: rand(0, 6), vr: rand(-0.04, 0.04), w: rand(5, 10), h: rand(8, 14), color: PETALS[(Math.random() * PETALS.length) | 0], sway: rand(0, 6), life: rand(320, 560) })
      }
      kick()
    },
    sparks(x, y, n = 60) {
      for (let i = 0; i < n; i++) {
        const a = rand(0, Math.PI * 2)
        const s = rand(1.5, 7.5)
        parts.current.push({ kind: 'spark', x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, r: rand(1, 2.4), color: GOLDS[(Math.random() * GOLDS.length) | 0], life: rand(45, 80) })
      }
      kick()
    },
  }))

  return <canvas ref={canvas} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
})

export default FxCanvas
