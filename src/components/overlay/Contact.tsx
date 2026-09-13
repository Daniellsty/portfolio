import { COPY } from '../../data/portfolio'

export function Contact() {
  return (
    <section
      data-layer="contact"
      className="hud-layer pointer-events-none fixed inset-0 z-20 flex items-end justify-center pb-28"
    >
      <p className="text-sm text-white/80 md:text-base">{COPY.phoneHint}</p>
    </section>
  )
}
