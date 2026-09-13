import { COPY } from '../../data/portfolio'

function MouseIcon() {
  return (
    <svg viewBox="0 0 24 36" fill="none" className="h-7 w-5 text-white/90">
      <rect x="1" y="1" width="22" height="34" rx="11" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="8" x2="12" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function ScrollHint() {
  return (
    <div
      data-layer="hint-home"
      className="hud-layer pointer-events-none fixed bottom-10 left-1/2 z-40 -translate-x-1/2"
    >
      <div className="flex items-center gap-3 rounded-full border border-white/25 bg-black/25 px-5 py-2.5">
        <MouseIcon />
        <span className="text-sm text-white/90">{COPY.scrollExplore}</span>
      </div>
    </div>
  )
}
