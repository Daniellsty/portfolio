import { COPY } from '../../data/portfolio'

/** Soft hint only — My Work itself is the 3D wall + camera */
export function WorkGallery() {
  return (
    <div
      data-layer="work"
      className="hud-layer pointer-events-none fixed bottom-10 left-1/2 z-30 -translate-x-1/2"
    >
      <p className="text-sm text-white/85">{COPY.tapProject}</p>
    </div>
  )
}
