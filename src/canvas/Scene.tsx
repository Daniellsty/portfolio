import { Canvas } from '@react-three/fiber'
import { useEffect } from 'react'
import { projects } from '../data/portfolio'
import { getCoverTexture } from '../lib/coverTexture'
import { START_CAMERA } from '../scroll/rig'
import { useUiStore } from '../store/uiStore'
import { CameraRig } from './CameraRig'
import { Lights } from './Lights'
import { Room } from './Room'

function SceneContent() {
  const setLoaded = useUiStore((s) => s.setLoaded)

  useEffect(() => {
    projects.forEach((project) => getCoverTexture(project.id))
    const timer = setTimeout(() => setLoaded(true), 250)
    return () => clearTimeout(timer)
  }, [setLoaded])

  return (
    <>
      <color attach="background" args={['#6b6288']} />
      <fog attach="fog" args={['#6b6288', 8, 18]} />
      <Lights />
      <Room />
      <CameraRig />
    </>
  )
}

export function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{
        fov: 48,
        near: 0.1,
        far: 60,
        position: [START_CAMERA.x, START_CAMERA.y, START_CAMERA.z],
      }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'auto' }}
      onWheel={(event) => {
        window.scrollBy({ top: event.deltaY, left: 0, behavior: 'instant' })
      }}
    >
      <SceneContent />
    </Canvas>
  )
}
