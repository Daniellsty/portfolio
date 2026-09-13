import { useEffect, useState } from 'react'
import { COPY, PROJECT_IMAGES } from '../../data/portfolio'
import { preloadImages } from '../../lib/preload'
import { NATURE_WALLPAPER_URL } from '../../lib/skillsTexture'
import { useUiStore } from '../../store/uiStore'

export function Loader() {
  const isLoaded = useUiStore((s) => s.isLoaded)
  const isEnterClicked = useUiStore((s) => s.isEnterClicked)
  const setEnterClicked = useUiStore((s) => s.setEnterClicked)
  const [percent, setPercent] = useState(0)
  const [assetsReady, setAssetsReady] = useState(false)

  useEffect(() => {
    preloadImages([...PROJECT_IMAGES, NATURE_WALLPAPER_URL], (progress) => {
      setPercent(Math.round(progress * 100))
    }).then(() => setAssetsReady(true))
  }, [])

  const ready = isLoaded && assetsReady

  if (isEnterClicked) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#6b6288]">
      <p className="mb-10 text-5xl font-light text-white">{ready ? '100%' : `${percent}%`}</p>
      <button
        type="button"
        disabled={!ready}
        onClick={() => setEnterClicked(true)}
        className="rounded-full border border-white/50 px-12 py-3 text-sm tracking-[0.35em] text-white uppercase disabled:opacity-40"
      >
        {COPY.enter}
      </button>
    </div>
  )
}
