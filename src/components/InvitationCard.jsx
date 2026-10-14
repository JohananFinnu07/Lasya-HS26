import { useState } from 'react'
import Cross from './Cross'
import Envelope from './Envelope'
import Reveal from './Reveal'
import { Corner } from './Botanicals'

export default function InvitationCard() {
  const [open, setOpen] = useState(false)

  return (
    <section id="card" data-tone="teal" className="relative overflow-hidden px-5 pb-28 pt-24 text-center md:pb-40">
      <Corner pos="tl" className="w-[42vw] max-w-[290px]" />
      <Corner pos="br" className="w-[46vw] max-w-[310px]" />

      <Reveal className="relative mb-6">
        <p className="font-serif text-xl italic text-cream/85">Tap the envelope to open</p>
      </Reveal>

      <Reveal delay={0.2} className="relative pt-[34vw] sm:pt-40 md:pt-44">
        <Envelope open={open} onToggle={() => setOpen((o) => !o)} label={open ? 'Close the invitation card' : 'Open the invitation card'}>
          <div className="relative flex h-full flex-col items-center text-center text-deep" style={{ paddingTop: '4.5cqw' }}>
            <Cross size={12} className="text-goldmuted" />
            <p className="mt-[1.4cqw] font-serif italic text-goldmuted" style={{ fontSize: '5.4cqw' }}>Talari’s</p>
            <p className="font-display font-medium tracking-[0.3em]" style={{ fontSize: '3cqw' }}>HALF SAREE CEREMONY</p>
            <p className="font-display tracking-[0.4em] text-deep/70" style={{ fontSize: '2.4cqw', marginTop: '0.6cqw' }}>INVITATION</p>
            <span className="my-[2.4cqw] block h-px w-[14cqw] bg-gold" />
            <p className="font-script leading-none" style={{ fontSize: '11cqw' }}>Lasya</p>
            <p className="font-display tracking-[0.2em] text-deep/80" style={{ fontSize: '2.8cqw', marginTop: '1.2cqw' }}>26/10/2026</p>
            <div className="mb-[3cqw] mt-auto flex flex-col items-center justify-center rounded-full border border-gold" style={{ width: '15cqw', height: '15cqw' }}>
              <span className="font-script leading-none" style={{ fontSize: '5cqw' }}>Lasya</span>
              <span className="font-display tracking-[0.12em] text-deep/80" style={{ fontSize: '1.4cqw', marginTop: '0.5cqw' }}>HALF SAREE</span>
              <span className="font-display tracking-[0.12em] text-deep/80" style={{ fontSize: '1.4cqw' }}>CEREMONY</span>
            </div>
          </div>
        </Envelope>
      </Reveal>
    </section>
  )
}
