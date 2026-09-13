import { COPY } from '../../data/portfolio'

export function About() {
  return (
    <section
      data-layer="about"
      className="hud-layer pointer-events-none fixed inset-0 z-20 flex items-center justify-center px-6"
    >
      <div className="max-w-xl text-center">
        <p className="text-lg leading-relaxed text-white/90 md:text-2xl">{COPY.hobbiesMovies}</p>
        <p className="mt-8 text-lg leading-relaxed text-white/90 md:text-2xl">{COPY.hobbiesGames}</p>
      </div>
    </section>
  )
}
