import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { useUiStore } from '../store/uiStore'
import { resetRig, rig } from './rig'
import { CAMERA_KEYS } from './sections.config'

gsap.registerPlugin(ScrollTrigger)

function applyHud(progress: number, hud: number) {
  const root = document.getElementById('hud')
  const bar = document.getElementById('scroll-bar')
  if (bar) bar.style.transform = `scaleX(${progress})`
  if (!root) return

  root.dataset.section = String(hud)
  root.style.setProperty('--gallery', String(rig.galleryOpacity))
  root.style.setProperty('--hero', String(rig.heroOpacity))
  root.style.setProperty('--room', String(rig.roomOpacity))
}

export function ScrollController() {
  const isEnterClicked = useUiStore((s) => s.isEnterClicked)
  const isModalOpen = Boolean(useUiStore((s) => s.selectedProject))
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (!isEnterClicked) return

    resetRig()
    applyHud(0, 0)
    window.scrollTo(0, 0)

    let ctx: gsap.Context | null = null
    let cancelled = false

    const start = () => {
      if (cancelled) return

      ctx = gsap.context(() => {
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: '#scroll-root',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.75,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              rig.progress = self.progress
              const current =
                [...CAMERA_KEYS].reverse().find((key) => self.progress >= key.t) ?? CAMERA_KEYS[0]
              rig.activeSection = current.hud
              rig.sceneMode = current.sceneMode
              applyHud(self.progress, current.hud)
            },
          },
        })

        scrollTriggerRef.current = timeline.scrollTrigger ?? null

        CAMERA_KEYS.slice(1).forEach((key, index) => {
          const previous = CAMERA_KEYS[index]
          const duration = key.t - previous.t

          timeline.to(
            rig.camera,
            { x: key.camera.x, y: key.camera.y, z: key.camera.z, duration },
            previous.t,
          )
          timeline.to(
            rig.lookAt,
            { x: key.lookAt.x, y: key.lookAt.y, z: key.lookAt.z, duration },
            previous.t,
          )
          timeline.to(
            rig,
            {
              roomOpacity: key.roomOpacity,
              galleryOpacity: key.galleryOpacity,
              heroOpacity: key.heroOpacity,
              duration,
            },
            previous.t,
          )
        })
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())
    }

    const timer = window.setTimeout(start, 60)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      ctx?.revert()
      scrollTriggerRef.current = null
    }
  }, [isEnterClicked])

  useEffect(() => {
    const trigger = scrollTriggerRef.current
    if (!trigger) return
    if (isModalOpen) trigger.disable(false)
    else trigger.enable(false)
  }, [isModalOpen])

  return null
}
