import { useEffect, useRef, useState } from 'react'
import { MotionConfig, useReducedMotion } from 'framer-motion'
import IntroEnvelope from './components/IntroEnvelope'
import GoldDust from './components/GoldDust'
import Cursor from './components/Cursor'
import NavPill from './components/NavPill'
import { BotanicalDefs } from './components/Botanicals'
import MusicButton from './components/MusicButton'
import Hero from './components/Hero'
import BibleVerse from './components/BibleVerse'
import Invitation from './components/Invitation'
import EventDetails from './components/EventDetails'
import Countdown from './components/Countdown'
import Venue from './components/Venue'
import Family from './components/Family'
import TeluguInvitation from './components/TeluguInvitation'
import Gallery from './components/Gallery'
import InvitationCard from './components/InvitationCard'
import Rsvp from './components/Rsvp'
import Finale from './components/Finale'
import Footer from './components/Footer'

const TONES = ['ink', 'forest', 'moss', 'teal', 'pine', 'olive', 'gallery', 'night']

/** Fixed colour layers that cross-fade as each section reaches the middle of the screen. */
function Backdrop() {
  const [tone, setTone] = useState('ink')
  useEffect(() => {
    const els = document.querySelectorAll('[data-tone]')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setTone(e.target.dataset.tone)),
      { rootMargin: '-50% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <div aria-hidden="true">
      {TONES.map((t) => (
        <div key={t} className={`tone tone-${t}`} style={{ opacity: tone === t ? 1 : 0 }} />
      ))}
    </div>
  )
}

// Personalised links: https://your-link/?to=Ravi%20Uncle
const guest = (() => {
  if (typeof window === 'undefined') return ''
  return (new URLSearchParams(window.location.search).get('to') || '').trim().slice(0, 40)
})()

export default function App() {
  // closed → opening (envelope animates) → open (cover fades, page revealed)
  const [stage, setStage] = useState('closed')
  const reduce = useReducedMotion()
  const timer = useRef(null)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = stage === 'open' ? '' : 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [stage])

  const openInvitation = () => {
    if (stage !== 'closed') return
    setStage('opening')
    timer.current = setTimeout(() => setStage('open'), reduce ? 500 : 2900)
  }
  useEffect(() => () => clearTimeout(timer.current), [])

  const started = stage !== 'closed'
  const ready = stage === 'open'

  return (
    <MotionConfig reducedMotion="user">
      <Backdrop />
      <BotanicalDefs />

      <IntroEnvelope stage={stage} onOpen={openInvitation} guest={guest} />
      <GoldDust active={started} />
      <Cursor />
      <NavPill visible={ready} />
      <MusicButton visible={ready} />

      <main className="relative z-10">
        <Hero ready={ready} />
        <BibleVerse />
        <Invitation />
        <EventDetails />
        <Countdown />
        <Venue />
        <Family />
        <TeluguInvitation />
        <Gallery />
        <InvitationCard />
        <Rsvp guest={guest} />
        <Finale />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </MotionConfig>
  )
}
