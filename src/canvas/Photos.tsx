import { Text, useTexture } from '@react-three/drei'
import { useMemo, useState } from 'react'
import { projects } from '../data/portfolio'
import { getCoverTexture } from '../lib/coverTexture'
import { getSkillsTexture, NATURE_WALLPAPER_URL } from '../lib/skillsTexture'
import { useUiStore } from '../store/uiStore'

const WALL_X = -3.17
const ROT: [number, number, number] = [0, Math.PI / 2, 0]

/** Puzzle collage — tighter gaps, still no overlap */
const FRAMES: Array<{
  id: (typeof projects)[number]['id']
  y: number
  z: number
  w: number
  h: number
}> = [
  { id: 'island', y: 3.3, z: -1.28, w: 0.94, h: 0.62 },
  { id: 'gems', y: 3.32, z: -0.24, w: 0.74, h: 0.74 },
  { id: 'store', y: 3.24, z: 0.62, w: 0.44, h: 0.92 },
  { id: 'character', y: 2.4, z: -1.36, w: 0.5, h: 0.66 },
  { id: 'home', y: 2.42, z: -0.38, w: 1.1, h: 0.66 },
  { id: 'office', y: 2.44, z: 0.62, w: 0.48, h: 0.32 },
  { id: 'globe', y: 1.96, z: 0.62, w: 0.42, h: 0.38 },
  { id: 'football', y: 1.72, z: -0.72, w: 0.92, h: 0.5 },
]

function FramedPhoto({
  id,
  position,
  width,
  height,
}: {
  id: (typeof projects)[number]['id']
  position: [number, number, number]
  width: number
  height: number
}) {
  const map = useMemo(() => getCoverTexture(id), [id])
  const openProject = useUiStore((s) => s.openProject)
  const [hovered, setHovered] = useState(false)
  const project = projects.find((item) => item.id === id)

  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      <mesh>
        <boxGeometry args={[width + 0.08, height + 0.08, 0.045]} />
        <meshStandardMaterial color="#fafafa" roughness={0.28} />
      </mesh>
      <mesh
        position={[0, 0, 0.028]}
        onClick={(event) => {
          event.stopPropagation()
          if (project) openProject(project)
        }}
        onPointerOver={(event) => {
          event.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
        scale={hovered ? 1.015 : 1}
      >
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
    </group>
  )
}

export function WallPhotos() {
  return (
    <group>
      <Text
        position={[-3.05, 4.05, -0.2]}
        rotation={ROT}
        fontSize={0.26}
        color="#e8c547"
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
        letterSpacing={0.02}
      >
        My Work
      </Text>

      {FRAMES.map((item) => (
        <FramedPhoto
          key={item.id}
          id={item.id}
          position={[WALL_X, item.y, item.z]}
          width={item.w}
          height={item.h}
        />
      ))}
    </group>
  )
}

export function MonitorScreen() {
  const wallpaper = useTexture(NATURE_WALLPAPER_URL)
  const map = useMemo(() => {
    const image = wallpaper.image as CanvasImageSource
    return getSkillsTexture(image)
  }, [wallpaper])

  // Ultrawide modern panel — slightly smaller
  return (
    <mesh>
      <planeGeometry args={[1.3, 0.56]} />
      <meshBasicMaterial key={map.uuid} map={map} toneMapped={false} />
    </mesh>
  )
}
