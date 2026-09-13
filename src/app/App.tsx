import { Scene } from '../canvas/Scene'
import { Overlay } from '../components/overlay/Overlay'
import { Loader } from '../components/ui/Loader'
import { ProjectModal } from '../components/ui/ProjectModal'
import { ScrollProgress } from '../components/ui/ScrollProgress'
import { SocialSidebar } from '../components/ui/SocialSidebar'
import { SCROLL_PAGES } from '../scroll/sections.config'
import { ScrollController } from '../scroll/ScrollController'
import { useUiStore } from '../store/uiStore'
import { Providers } from './providers'

export default function App() {
  const isEnterClicked = useUiStore((s) => s.isEnterClicked)

  return (
    <Providers enabled={isEnterClicked}>
      <Loader />

      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {isEnterClicked && (
        <>
          <Overlay />
          <ScrollProgress />
          <SocialSidebar />
        </>
      )}

      <div id="scroll-root" className="pointer-events-none relative z-10">
        {Array.from({ length: SCROLL_PAGES }).map((_, i) => (
          <div key={i} className="h-screen" aria-hidden="true" />
        ))}
      </div>

      <ScrollController />
      <ProjectModal />
    </Providers>
  )
}
