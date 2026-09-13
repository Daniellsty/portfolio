import { ScrollHint } from '../ui/ScrollHint'
import { About } from './About'
import { Contact } from './Contact'
import { HeroWallText } from './HeroWallText'
import { WorkGallery } from './WorkGallery'

export function Overlay() {
  return (
    <div id="hud" data-section="0">
      <HeroWallText />
      <About />
      <Contact />
      <ScrollHint />
      <WorkGallery />
    </div>
  )
}
