import { useState } from 'react'
import { Corner, Sprig } from './Botanicals'
import Reveal from './Reveal'
import { rsvp } from '../data/content'

const field =
  'w-full rounded-none border-0 border-b border-gold/70 bg-transparent px-1 py-3 font-serif text-2xl text-cream placeholder:text-cream/40 focus:border-goldsoft focus:outline-none'
const btn =
  'rounded-full border border-gold bg-ink/30 px-8 py-3.5 font-display text-sm tracking-[0.3em] text-cream backdrop-blur-sm transition-colors duration-700 hover:bg-gold hover:text-ink'

export default function Rsvp({ guest = '' }) {
  const [name, setName] = useState(guest)
  const [guests, setGuests] = useState(2)
  const [coming, setComing] = useState(true)
  const [note, setNote] = useState('')
  const [friend, setFriend] = useState('')
  const [copied, setCopied] = useState('')

  const base = typeof window === 'undefined' ? '' : `${window.location.origin}${window.location.pathname}`
  const friendLink = friend.trim() ? `${base}?to=${encodeURIComponent(friend.trim())}` : base

  const waUrl = (text) => `https://wa.me/${rsvp.whatsapp}?text=${encodeURIComponent(text)}`

  const sendRsvp = () => {
    const text =
      `Hello! This is ${name.trim() || 'a guest'}. ` +
      (coming
        ? `We will joyfully attend Lasya's Half Saree Ceremony on 26 October 2026 at 9:30 AM. Number of guests: ${guests}.`
        : `We are sorry we cannot attend Lasya's Half Saree Ceremony, but we are sending our love and blessings.`) +
      (note.trim() ? `\n\nOur blessing: ${note.trim()}` : '')
    window.open(waUrl(text), '_blank', 'noopener')
  }

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(''), 2200)
    } catch {
      /* clipboard unavailable */
    }
  }

  const share = async () => {
    const data = { title: "Talari Lasya's Half Saree Ceremony", text: 'You are warmly invited to Lasya\u2019s Half Saree Ceremony on 26 October 2026.', url: friendLink }
    if (navigator.share) {
      try {
        await navigator.share(data)
        return
      } catch {
        return
      }
    }
    copy(friendLink, 'share')
  }

  return (
    <section id="rsvp" data-tone="pine" className="relative overflow-hidden px-6 py-28 text-center md:py-40">
      <Corner pos="tl" className="w-[44vw] max-w-[300px]" />
      <Corner pos="br" className="w-[48vw] max-w-[330px]" />
      <Sprig seed={81} className="pointer-events-none absolute -right-4 top-[8%] w-28 opacity-80 md:w-44" />

      <div className="relative z-10 mx-auto max-w-xl">
        <Reveal>
          <h2 className="font-serif text-[clamp(2.2rem,6.4vw,3.6rem)] italic text-cream">Will you join us?</h2>
          <p className="mx-auto mt-4 max-w-sm font-serif text-xl text-cream/80">Let the family know you are coming, or send your blessings from afar.</p>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 text-left">
          <label className="block">
            <span className="font-display text-sm tracking-[0.3em] text-goldsoft">YOUR NAME</span>
            <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" autoComplete="name" />
          </label>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
            <div role="group" aria-label="Attendance" className="flex overflow-hidden rounded-full border border-gold">
              {[
                [true, 'Joyfully attending'],
                [false, 'Sending blessings'],
              ].map(([v, label]) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={coming === v}
                  onClick={() => setComing(v)}
                  className={`px-5 py-3 font-display text-base transition-colors duration-500 ${coming === v ? 'bg-gold text-ink' : 'bg-ink/30 text-cream'}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {coming && (
              <div className="flex items-center gap-4 font-display text-xl">
                <span className="text-sm tracking-[0.3em] text-goldsoft">GUESTS</span>
                <button type="button" aria-label="Fewer guests" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="h-10 w-10 rounded-full border border-gold bg-ink/30 text-cream">−</button>
                <span className="w-6 text-center" aria-live="polite">{guests}</span>
                <button type="button" aria-label="More guests" onClick={() => setGuests((g) => Math.min(12, g + 1))} className="h-10 w-10 rounded-full border border-gold bg-ink/30 text-cream">+</button>
              </div>
            )}
          </div>

          <label className="mt-8 block">
            <span className="font-display text-sm tracking-[0.3em] text-goldsoft">A BLESSING FOR LASYA (OPTIONAL)</span>
            <textarea className={`${field} resize-none`} rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Write a few words" />
          </label>

          <div className="mt-10 text-center">
            <button type="button" onClick={sendRsvp} className={btn}>SEND ON WHATSAPP</button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-24 border-t border-gold/50 pt-14">
          <h3 className="font-serif text-3xl italic text-cream md:text-4xl">Share with someone dear</h3>
          <label className="mt-6 block text-left">
            <span className="font-display text-sm tracking-[0.3em] text-goldsoft">THEIR NAME (OPTIONAL)</span>
            <input className={field} value={friend} onChange={(e) => setFriend(e.target.value)} placeholder="The cover will greet them by name" />
          </label>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button type="button" onClick={share} className={btn}>SHARE INVITATION</button>
            <button type="button" onClick={() => copy(friendLink, 'link')} className={btn} aria-live="polite">
              {copied === 'link' || copied === 'share' ? 'LINK COPIED' : 'COPY LINK'}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
